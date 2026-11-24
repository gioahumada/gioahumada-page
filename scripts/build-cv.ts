// Compila el CV humano con Typst durante el build y lo deja como módulo para el endpoint /api/cv.
// El PDF queda dentro de la función serverless y no en /public, para que solo salga tras el captcha.
import { $typst, TypstSnippet } from "@myriaddreamin/typst.ts/contrib/snippet";
import fs from "node:fs";
import path from "node:path";
import { profile } from "../src/data/resume.ts";

const root = path.resolve(import.meta.dirname, "..");
const pub = (p: string) => path.join(root, "public", p);

$typst.setCompilerInitOptions({
  getModule: () =>
    fs.readFileSync(path.join(root, "node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm")),
});
$typst.use(
  TypstSnippet.disableDefaultFontAssets(),
  ...["Inter-Regular.ttf", "Inter-Medium.ttf", "Inter-SemiBold.ttf"].map((f) =>
    TypstSnippet.preloadFontData(new Uint8Array(fs.readFileSync(pub(`fonts/${f}`)))),
  ),
);

// Logos: id -> extensión (svg | png)
const logos: Record<string, string> = {};
for (const file of fs.readdirSync(pub("logos"))) {
  const { name, ext } = path.parse(file);
  if (ext !== ".svg" && ext !== ".png") continue;
  await $typst.mapShadow(`/logos/${file}`, new Uint8Array(fs.readFileSync(pub(`logos/${file}`))));
  logos[name] = ext.slice(1);
}

const pdf = await $typst.pdf({
  mainContent: fs.readFileSync(path.join(root, "src/typst/cv-human.typ"), "utf8"),
  inputs: { data: JSON.stringify(profile), logos: JSON.stringify(logos) },
});
if (!pdf) throw new Error("Typst no generó el PDF humano");

const out = path.join(root, "src/generated/cv-human.ts");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `// Generado por scripts/build-cv.ts. No editar.\nexport const cvHumanBase64 = "${Buffer.from(pdf).toString("base64")}";\n`);
console.log(`[cv] PDF humano generado (${(pdf.length / 1024).toFixed(0)} KB)`);

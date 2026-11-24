// Compila el CV ATS con Typst (WASM) en el navegador. Se importa de forma perezosa.
// El CV humano se entrega desde /api/cv, tras el captcha.
import atsSrc from "../typst/cv-ats.typ?raw";
import wasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url";

let ready: Promise<typeof import("@myriaddreamin/typst.ts/contrib/snippet")["$typst"]> | null = null;

function init() {
  ready ??= (async () => {
    const { $typst, TypstSnippet } = await import("@myriaddreamin/typst.ts/contrib/snippet");
    $typst.setCompilerInitOptions({ getModule: () => fetch(wasmUrl) });
    $typst.use(
      TypstSnippet.disableDefaultFontAssets(),
      ...[
        "lm/lmroman10-regular.otf",
        "lm/lmroman10-bold.otf",
        "lm/lmroman10-italic.otf",
        "lm/lmroman10-bolditalic.otf",
      ].map((f) => TypstSnippet.preloadFontFromUrl(`/fonts/${f}`)),
    );
    return $typst;
  })();
  return ready;
}

export async function buildAtsCv(): Promise<Blob> {
  const [$typst, data] = await Promise.all([
    init(),
    fetch("/resume.json").then((r) => r.text()),
  ]);
  const pdf = await $typst.pdf({ mainContent: atsSrc, inputs: { data } });
  if (!pdf) throw new Error("Typst no generó el PDF");
  return new Blob([pdf as BlobPart], { type: "application/pdf" });
}

// Versión humana. Tipografía y proporciones tomadas de global.css (Inter, 1px = 0.75pt):
// --text-title 1.5rem = 18pt, --text-heading 1rem = 12pt, --text-base 0.9375rem = 11.25pt, --text-xs 0.75rem = 9pt.
#let d = json(bytes(sys.inputs.data))
#let logos = json(bytes(sys.inputs.logos))
#let ink = rgb("#333333")      // --primary-color
#let muted = rgb("#777777")

#let text-title = 18pt
#let text-heading = 12pt
#let text-base = 11.25pt
#let text-xs = 9pt

#set page(width: 28cm, height: 21cm, margin: (x: 1.8cm, y: 1.8cm))
#set text(font: "Inter", size: text-base, fill: ink, lang: "es", hyphenate: false, weight: "regular")
#set par(leading: 0.55em, spacing: 0.5em)
#set document(title: d.name + " - CV", author: d.name)

#let link-of(c) = if "url" in c { link(c.url)[#c.text] } else { c.text }

// ---- Iconos (SVG en línea)
#let svg-fill(path) = bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"#333333\"><path d=\"" + path + "\"/></svg>")
#let icons = (
  linkedin: svg-fill("M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"),
  github: svg-fill("M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"),
  orcid: svg-fill("M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"),
  mail: bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#333333\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/></svg>"),
)

// ---- Arriba derecha: todo alineado a la derecha
#let photo-size = 1.1cm
#let flags = (
  cl: bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 3 2\"><rect width=\"3\" height=\"2\" fill=\"#ffffff\"/><rect y=\"1\" width=\"3\" height=\"1\" fill=\"#d52b1e\"/><rect width=\"1\" height=\"1\" fill=\"#0039a6\"/><polygon points=\"0.5000,0.2000 0.5674,0.4073 0.7853,0.4073 0.6090,0.5354 0.6763,0.7427 0.5000,0.6146 0.3237,0.7427 0.3910,0.5354 0.2147,0.4073 0.4326,0.4073\" fill=\"#ffffff\"/></svg>"),
  gb: bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#012169\"/><path d=\"M0,0 L60,40 M60,0 L0,40\" stroke=\"#ffffff\" stroke-width=\"6\"/><path d=\"M0,0 L60,40 M60,0 L0,40\" stroke=\"#c8102e\" stroke-width=\"3\"/><path d=\"M30,0 V40 M0,20 H60\" stroke=\"#ffffff\" stroke-width=\"10\"/><path d=\"M30,0 V40 M0,20 H60\" stroke=\"#c8102e\" stroke-width=\"6\"/></svg>"),
)
#let tech-icon(t) = bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"#1a1a1a\"><path d=\"" + t.path + "\"/></svg>")

#align(right)[
  #block(width: 12.5cm)[
    #set align(right)
    #grid(
      columns: (1fr, photo-size), column-gutter: 0.35cm, align: horizon,
      [
        #text(size: 20pt, weight: "semibold", tracking: -0.02em)[#d.name] \
        #text(size: text-base, fill: muted)[Ingeniería Informática]
      ],
      box(width: photo-size, height: photo-size, radius: 50%, clip: true, fill: luma(238))[
        #if d.photo in logos {
          image("/logos/" + d.photo + "." + logos.at(d.photo), width: 100%, height: 100%, fit: "cover")
        }
      ],
    )

    #v(0.3cm)
    #link("mailto:" + d.email)[#text(size: text-xs, fill: muted)[#d.email]]

    #v(0.25cm)
    #d.links.map(l => link(l.url)[
      #box(height: 0.45cm, baseline: 25%, image(icons.at(l.icon), height: 100%))
    ]).join(h(0.3cm))

    #v(0.4cm)
    #text(size: text-base)[#d.bio]

    #v(0.4cm)
    #text(size: text-base, weight: "medium")[#d.degree] \
    #text(size: text-xs, fill: muted)[#d.degreeSchool \ #d.degreePeriod]

    #v(0.3cm)
    #text(size: text-xs, fill: muted)[#d.spoken.map(l => [#l.text #h(0.12cm) #box(width: 0.5cm, height: 0.333cm, baseline: 20%, radius: 2pt, clip: true, stroke: 0.4pt + luma(200), image(flags.at(l.flag), width: 100%, height: 100%, fit: "cover", format: "svg"))]).join(h(0.5cm))]

    #v(0.45cm)
    #text(size: text-xs, fill: muted)[Tecnologías que manejo]
    #v(0.2cm)
    #grid(
      columns: (1.2cm,) * 10, align: right,
      ..d.stack.map(t => link(t.url)[#align(right)[
        #box(height: 0.55cm, image(tech-icon(t), height: 100%, format: "svg")) \
        #text(size: 5.5pt, fill: muted)[#t.name]
      ]]),
    )

  ]
]

// ---- Abajo izquierda: pirámide 1 + 2 + 3, sin cajas
#let col-w = 5.8cm
#let logo-size = 1.3cm
#let mark(id) = box(width: logo-size, height: logo-size)[
  #if id in logos {
    image("/logos/" + id + "." + logos.at(id), width: 100%, height: 100%, fit: "contain")
  } else {
    rect(width: 100%, height: 100%, radius: 3pt, fill: luma(238))
  }
]
#let item(h) = grid(
  columns: (logo-size, 1fr), column-gutter: 0.3cm, align: horizon,
  mark(h.logo),
  [
    #text(size: 10pt, weight: "medium")[#h.title] \
    #text(size: text-xs, fill: muted)[#h.role \ #h.period]
  ],
)
#let row(items) = grid(
  columns: (col-w,) * 3, column-gutter: 0.1cm,
  ..items.map(item),
)

#place(bottom + left)[
  #set align(top + left)
  #let hs = d.highlights
  #row(hs.slice(0, 1))
  #v(0.4cm)
  #row(hs.slice(1, 3))
  #v(0.4cm)
  #row(hs.slice(3, 6))
]

// Versión ATS: una columna, texto plano, estilo académico (Latin Modern).
#let d = json(bytes(sys.inputs.data))
#set page(paper: "a4", margin: (x: 1.25cm, y: 1.1cm))
#set text(font: "Latin Modern Roman", size: 9.5pt, lang: "es", hyphenate: false)
#set par(justify: true, leading: 0.5em, spacing: 0.5em)
#set list(marker: [•], indent: 0.9em, body-indent: 0.5em, spacing: 0.4em)
#set document(title: d.name + " - CV", author: d.name)

#let sec(t) = block(above: 1.05em, below: 0.45em, sticky: true)[
  #text(weight: "bold", size: 10.5pt)[#upper(t)]
  #v(-0.05em)
  #line(length: 100%, stroke: 0.5pt)
]

#let bullet(b) = if type(b) == str { b } else [*#b.lead* #b.text]

#let entry(e) = block(breakable: false, above: 0.7em, below: 0.25em)[
  #grid(columns: (1fr, auto), strong(e.org), strong(e.place))
  #grid(columns: (1fr, auto), e.role, emph(e.period))
  #if e.bullets.len() > 0 [
    #list(..e.bullets.map(bullet))
  ]
]

#let contact(row) = row.map(c => if "url" in c { link(c.url)[#c.text] } else { c.text }).join(h(1.2em))

#align(center)[
  #text(size: 20pt, weight: "bold")[#d.name]
  #v(-0.5em)
  #set text(size: 8.5pt)
  #for row in d.contact [#contact(row) \ ]
]

#v(0.6em)
*#d.summaryLead* #d.summary

#sec("Formación académica")
#for e in d.education { entry(e) }

#sec("Investigación")
#for e in d.research { entry(e) }

#sec("Publicaciones")
#for p in d.publications [
  *#p.authors* (#p.year). #emph(p.title) DOI: #p.doi
]

#sec("Ayudantías")
#for e in d.teaching { entry(e) }

#sec("Experiencia profesional y desarrollo aplicado")
#for e in d.experience { entry(e) }

#sec("Proyectos destacados")
#grid(
  columns: (auto, 1fr, 5.2cm), column-gutter: 0.8em, row-gutter: 0.65em,
  ..d.projects.map(p => (strong(p.name), p.desc, align(right, emph(p.tags)))).flatten(),
)

#sec("Idiomas")
#for l in d.languages [*#l.lang:* #l.text \ ]

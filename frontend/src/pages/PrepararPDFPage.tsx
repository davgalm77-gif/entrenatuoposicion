import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import {
  Document,
  Page,
  pdfjs
} from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString()

import DashboardLayout from "../layouts/DashboardLayout"

function PrepararPDFPage() {

  const { id } = useParams()

  const [temario,
    setTemario]
    = useState<any | null>(null)

  const [paginasSeleccionadas,
    setPaginasSeleccionadas]
    = useState<number[]>([])

    const [paginasEliminadas,
  setPaginasEliminadas]
  = useState<number[]>([])

  const [modoActivo,
    setModoActivo]
    = useState("eliminar")

    const [
  mostrarModalGuardado,
  setMostrarModalGuardado
] = useState(false)

  const [rangos,
    setRangos]
    = useState([
      {
        id: 1,
        desde: "",
        hasta: "",
      }
    ])

  useEffect(() => {

    const fetchTemario =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/Temarios/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        const data =
          await response.json()

          console.log(JSON.stringify(data))

        setTemario(data)
      }

    fetchTemario()

  }, [id])

  const paginasVisibles =
    Array.from({
      length:
        temario?.paginas || 0
    })
      .map((_, i) => i + 1)
      .filter((pagina) => {

        if (
          rangos.every(r =>
            r.desde === "" &&
            r.hasta === ""
          )
        ) {
          return true
        }

        return rangos.some(r => {

          const desde =
            Number(r.desde)

          const hasta =
            Number(r.hasta)

          if (
            !desde ||
            !hasta
          ) {
            return false
          }

          return (
            pagina >= desde &&
            pagina <= hasta
          )

        })

      })

      .filter(
  pagina =>
    !paginasEliminadas.includes(
      pagina
    )
)

  return (

    

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <button

  onClick={() => {

    window.location.href =
      "/temarios"

  }}

  className="h-11 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500 transition text-sm font-semibold"
>

  ← Volver

</button>

          <h1 className="text-3xl font-bold">
            Preparar PDF
          </h1>

          <p className="text-slate-400 mt-3">

            Limpia y prepara el PDF antes del procesamiento IA.

          </p>

        </div>

        {/* INFO PDF */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="text-violet-300 font-semibold text-xl">

            {temario?.nombre}

          </div>

          <div className="flex flex-wrap gap-3 mt-4">

            <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

              {temario?.paginas} páginas

            </div>

            <div className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-semibold">

              PDF pendiente de preparación

            </div>

          </div>

        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

          {/* IZQUIERDA */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Páginas del PDF
              </h2>

              <div className="text-sm text-violet-300 font-semibold">

                {paginasSeleccionadas.length} seleccionadas

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {paginasVisibles.map((paginaReal, index) => (

                <div
                  key={index}

                  onClick={() => {

                    if (
                      paginasSeleccionadas.includes(
                        paginaReal
                      )
                    ) {

                      setPaginasSeleccionadas(
                        paginasSeleccionadas.filter(
                          p => p !== paginaReal
                        )
                      )

                    } else {

                      setPaginasSeleccionadas([
                        ...paginasSeleccionadas,
                        paginaReal
                      ])

                    }

                  }}

                  className={`aspect-[3/4] rounded-2xl transition p-3 cursor-pointer border ${
                    paginasSeleccionadas.includes(
                      paginaReal
                    )
                      ? modoActivo === "eliminar"
                        ? "bg-red-500/20 border-red-500"
                        : "bg-cyan-500/20 border-cyan-500"

                      : `bg-slate-950 border-slate-800 ${
                          modoActivo === "eliminar"
                            ? "hover:border-red-500"
                            : "hover:border-cyan-500"
                        }`
                  }`}
                >

                  <div className="w-full h-full overflow-hidden rounded-xl border border-slate-700 bg-white flex items-center justify-center">

  <Document
  file={`${import.meta.env.VITE_API_URL}${temario?.archivoOriginalPath}`}
  loading="Cargando PDF..."
>

    <Page
      pageNumber={paginaReal}
      width={150}
      renderTextLayer={false}
      renderAnnotationLayer={false}
    />

  </Document>

</div>

                </div>

              ))}

            </div>

          </div>

          {/* DERECHA */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">

            <h2 className="text-2xl font-bold mb-6">
              Herramientas
            </h2>

            {/* BOTONES */}
            <div className="space-y-3">

              <button

                onClick={() =>
                  setModoActivo("eliminar")
                }

                className={`w-full h-12 rounded-xl border transition font-semibold ${
                  modoActivo === "eliminar"
                    ? "bg-red-500 text-white border-red-400"
                    : "bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400"
                }`}
              >

                Eliminar páginas

              </button>

              <button

                onClick={() =>
                  setModoActivo("extraer")
                }

                className={`w-full h-12 rounded-xl border transition font-semibold ${
                  modoActivo === "extraer"
                    ? "bg-cyan-500 text-black border-cyan-400"
                    : "bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300"
                }`}
              >

                Extraer páginas

              </button>

            </div>

            {/* SELECCION */}
            <div className="mt-8">

              <div className="text-sm font-semibold text-slate-400 mb-3">

                Selección

              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-violet-300 font-semibold">

                {paginasSeleccionadas.length} páginas seleccionadas

              </div>

            </div>

            {/* ACCIONES */}
            <div className="mt-8 space-y-3">

              <button
                onClick={() => {

                  setPaginasSeleccionadas(
                    paginasVisibles
                  )

                }}
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition text-sm font-semibold"
              >

                Seleccionar todas

              </button>

              <button
                onClick={() =>
                  setPaginasSeleccionadas([])
                }
                className="w-full h-11 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500 transition text-sm font-semibold"
              >

                Limpiar selección

              </button>

            </div>

            {/* RANGOS */}
            <div className="mt-8">

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-lg font-bold">
                  Rangos
                </h3>

                <button

                  onClick={() => {

                    setRangos([
                      ...rangos,
                      {
                        id: Date.now(),
                        desde: "",
                        hasta: "",
                      }
                    ])

                  }}

                  className="h-9 px-3 rounded-xl bg-violet-500 hover:bg-violet-400 transition text-black text-sm font-bold"
                >

                  Añadir

                </button>

              </div>

              <div className="space-y-4">

                {rangos.map((rango) => (

                  <div
  key={rango.id}
  className="bg-slate-950 border border-slate-800 rounded-2xl p-4"
>

  <div className="flex items-center justify-between mb-3">

    <div className="text-sm font-semibold text-slate-400">

    Bloque

    </div>

    <button

      onClick={() => {

        setRangos(
          rangos.filter(
            r => r.id !== rango.id
          )
        )

      }}

      className="text-red-400 hover:text-red-300 text-sm"
    >

      ✕

    </button>

  </div>

                    <div className="grid grid-cols-2 gap-3">

                      <input
                        type="number"

                        value={rango.desde}

                        onChange={(e) => {

                          setRangos(
                            rangos.map(r =>
                              r.id === rango.id
                                ? {
                                    ...r,
                                    desde: e.target.value
                                  }
                                : r
                            )
                          )

                        }}

                        placeholder="Desde"

                        className="h-11 rounded-xl bg-slate-900 border border-slate-800 px-4 text-sm"
                      />

                      <input
                        type="number"

                        value={rango.hasta}

                        onChange={(e) => {

                          setRangos(
                            rangos.map(r =>
                              r.id === rango.id
                                ? {
                                    ...r,
                                    hasta: e.target.value
                                  }
                                : r
                            )
                          )

                        }}

                        placeholder="Hasta"

                        className="h-11 rounded-xl bg-slate-900 border border-slate-800 px-4 text-sm"
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* ACCION FINAL */}
            {modoActivo !== "" &&
              paginasSeleccionadas.length > 0 && (

              <button

  onClick={async () => {

    if (
      modoActivo === "eliminar"
    ) {

      setPaginasEliminadas([
  ...new Set([
    ...paginasEliminadas,
    ...paginasSeleccionadas
  ])
])

      setPaginasSeleccionadas([])

      setModoActivo("extraer")

    }

    if (
  modoActivo === "extraer"
) {

  const token =
    localStorage.getItem(
      "token"
    )

  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Temarios/preparar-pdf`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({
          temarioId: Number(id),

          paginas:
            paginasVisibles
        })
      }
    )

  console.log(
    await response.text()
  )

  setMostrarModalGuardado(
  true
)

}

  }}

  className={`w-full h-14 rounded-2xl transition font-bold mt-8 ${
    modoActivo === "eliminar"

      ? "bg-red-500 hover:bg-red-400 text-white"

      : "bg-cyan-500 hover:bg-cyan-400 text-black"
  }`}
>

  {
    modoActivo === "eliminar"

      ? "Aplicar eliminación"

      : "Extraer PDF"
  }

</button>
              

            )}

            <div className="mt-4">

  <button

  onClick={async () => {

    const token =
      localStorage.getItem(
        "token"
      )

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Temarios/preparar-pdf`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({
          temarioId: Number(id),

          paginas:
            Array.from(
              {
                length:
                  temario?.paginas || 0
              },
              (_, i) => i + 1
            )
        })
      }
    )

    setMostrarModalGuardado(
  true
)

  }}

  className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition text-black font-bold mt-4"
>

  Usar PDF sin modificaciones

</button>

</div>

          </div>

        </div>

      </div>

      {mostrarModalGuardado && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md text-center">

      <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">

        <div className="text-4xl">
          ✓
        </div>

      </div>

      <h2 className="text-2xl font-bold text-emerald-300">

        PDF guardado

      </h2>

      <p className="text-slate-400 mt-4 leading-relaxed">

        El PDF preparado se ha añadido correctamente a tu biblioteca.

      </p>

      <button

        onClick={() => {

          window.location.href =
            "/temarios"

        }}

        className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition text-black font-bold mt-8"
      >

        Volver a biblioteca

      </button>

    </div>

  </div>

)}

    </DashboardLayout>

  )

}

export default PrepararPDFPage
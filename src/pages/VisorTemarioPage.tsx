import {
  useEffect,
  useState
} from "react"

import {
  useParams,
  useSearchParams
} from "react-router-dom"

import {
  Document,
  Page,
  pdfjs
} from "react-pdf"

import DashboardLayout from "../layouts/DashboardLayout"

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString()

function VisorTemarioPage() {

  const { id } = useParams()

  const [searchParams] =
  useSearchParams()

const from =
  searchParams.get("from")

  const [temario,
    setTemario]
    = useState<any | null>(null)

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

        setTemario(data)
      }

    fetchTemario()

  }, [id])

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto space-y-8 pb-20">

        {/* HEADER */}
        <div>

          <button

            onClick={() => {

  if (from === "temas") {

    window.location.href =
      `/temarios/${id}/temas`

  }
  else {

    window.location.href =
      "/temarios"

  }

}}

            className="h-11 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500 transition text-sm font-semibold"
          >

            ← Volver

          </button>

          <h1 className="text-3xl font-bold mt-5">

            {temario?.nombre}

          </h1>

          <div className="flex flex-wrap gap-3 mt-4">

            <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

              {temario?.paginas} páginas

            </div>

            {temario?.procesadoPDF && (

              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">

                PDF preparado

              </div>

            )}

            {temario?.procesadoIA && (

              <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-semibold">

                Procesado IA

              </div>

            )}

          </div>

        </div>

        {/* PDF */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex justify-center overflow-auto">

          {temario?.archivoOriginalPath && (

  <Document
    file={`${import.meta.env.VITE_API_URL}${temario.archivoOriginalPath}`}
    loading="Cargando PDF..."
  >

            {Array.from(
              {
                length:
                  temario?.paginas || 0
              },
              (_, i) => i + 1
            ).map((pagina) => (

              <div
                key={pagina}
                className="mb-10 last:mb-0"
              >

                <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white">

                  <Page
                    pageNumber={pagina}
                    width={900}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />

                </div>

                <div className="text-center text-sm text-slate-500 mt-3">

                  Página {pagina}

                </div>

              </div>

            ))}

          </Document>

)}

        </div>

      </div>

    </DashboardLayout>

  )

}

export default VisorTemarioPage
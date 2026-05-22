import {
  ArrowLeft
} from "lucide-react"

import {
  useEffect,
  useState,
  useRef
} from "react"

import {
  useParams
} from "react-router-dom"

import ReactMarkdown from "react-markdown"

import DashboardLayout from "../layouts/DashboardLayout"

function ResumenPage() {

  const { id } = useParams()

  const [
    resumen,
    setResumen
  ] = useState<any | null>(null)

  useEffect(() => {

    const fetchResumen =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/Temarios/resumenes/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        const data =
          await response.json()

        setResumen(data)

      }

    fetchResumen()

  }, [id])

  if (!resumen) {

    return null

  }

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto space-y-10 print:max-w-none print:w-full print:p-0">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4 print:hidden">

          <button

            onClick={() => {

              window.history.back()

            }}

            className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-semibold"
          >

            <ArrowLeft size={18} />

            Volver a apartados

          </button>

          <button

  onClick={async () => {

    const token =
      localStorage.getItem(
        "token"
      )

    const response =
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/Temarios/resumenes/${id}/pdf`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

    const blob =
      await response.blob()

    const url =
      window.URL.createObjectURL(
        blob
      )

    const enlace =
      document.createElement("a")

    enlace.href = url

    enlace.download =
      `${resumen.titulo}.pdf`

    document.body.appendChild(
      enlace
    )

    enlace.click()

    enlace.remove()

    window.URL.revokeObjectURL(
      url
    )

  }}
  

  className="h-11 px-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-sm font-bold"
>

  Descargar PDF

</button>

        </div>

        {/* HEADER */}
        <div className="space-y-5">

          <div className="flex flex-wrap gap-3">

          </div>

          <h1 className="text-3xl font-bold leading-tight">

            {resumen.titulo}

          </h1>

          <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">

            Resumen generado automáticamente mediante inteligencia artificial a partir del apartado seleccionado del temario.

          </p>

        </div>

        {/* DOCUMENTO */}
        <div

          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-10
            xl:p-14

            print:bg-white
            print:border-0
            print:rounded-none
            print:text-black
          "
        >

          <div className="max-w-4xl mx-auto">

            <div
              className="
                prose
                prose-invert
                prose-lg
                max-w-none

                prose-headings:text-white
                prose-headings:font-bold

                prose-h1:text-4xl
                prose-h1:mb-8

                prose-h2:text-3xl
                prose-h2:text-cyan-300
                prose-h2:mt-14
                prose-h2:mb-6

                prose-h3:text-2xl
                prose-h3:text-violet-300

                prose-p:text-slate-200
                prose-p:leading-relaxed

                prose-p:bg-slate-950/40
                prose-p:border
                prose-p:border-slate-800
                prose-p:rounded-2xl
                prose-p:p-5

                prose-strong:text-white

                prose-li:text-slate-300

                prose-ul:space-y-3

                prose-hr:hidden

                print:prose-black
                print:prose-p:text-black
                print:prose-headings:text-black
                print:prose-strong:text-black
                print:prose-p:border-slate-300
                print:prose-p:bg-white
              "
            >

              <div className="space-y-6">

  {(resumen?.contenido || "")
    .split(/\n\s*\n/)
    .filter(
      (bloque: string) =>
        bloque.trim() !== "" &&
        bloque.trim() !== "---"
    )
    .map(
      (
        bloque: string,
        index: number
      ) => (

        <div
          key={index}

          className="
            bg-slate-950/40
            border
            border-slate-800
            rounded-2xl
            p-6
          "
        >

          <ReactMarkdown>

  {bloque
    .replace(/---/g, "")}

</ReactMarkdown>

        </div>

      )
    )}

</div>

            </div>

          </div>

        </div>

      </div>
      

    </DashboardLayout>

  )
  

}


export default ResumenPage
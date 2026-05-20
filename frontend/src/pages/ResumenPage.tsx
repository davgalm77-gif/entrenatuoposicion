import {
  ArrowLeft
} from "lucide-react"
import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import ReactMarkdown from "react-markdown"

import DashboardLayout from "../layouts/DashboardLayout"

import { useRef } from "react"

import { useReactToPrint } from "react-to-print"

function ResumenPage() {

  const { id } = useParams()

  const [
  resumen,
  setResumen
] = useState<any | null>(null)

const printRef =
  useRef<HTMLDivElement>(null)

const handlePrint =
  useReactToPrint({
    contentRef: printRef,

    documentTitle:
      resumen?.titulo || "Resumen"
  })

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

        <div className="flex items-center justify-between gap-4 print:hidden">

  <button

    onClick={() => {

      window.history.back()

    }}

    className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-semibold"
  >

    <ArrowLeft size={18} />

    Volver a temas

  </button>

  <button

  onClick={handlePrint}

  className="h-11 px-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-sm font-bold"
>

  Imprimir

</button>

</div>

        {/* HEADER */}
        <div className="space-y-5">

          <div className="flex flex-wrap gap-3">

            <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

              {resumen.temas} {
  resumen.temas === 1
    ? "tema"
    : "temas"
}

            </div>

          </div>

          <h1 className="text-5xl font-bold leading-tight">

            {resumen.temas === 1
  ? "Resumen de 1 tema"
  : `Resumen de ${resumen.temas} temas`}

          </h1>

          <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">

            Resumen generado automáticamente mediante inteligencia artificial a partir de los temas seleccionados del temario.

          </p>

        </div>

        {/* DOCUMENTO */}
<div
  ref={printRef}

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

  <div className="max-w-3xl mx-auto">

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

    prose-p:text-slate-300
    prose-p:leading-relaxed

    prose-strong:text-white

    prose-li:text-slate-300

    prose-ul:space-y-3
  "
>

      <ReactMarkdown>

  {resumen?.contenido || ""}

</ReactMarkdown>

    </div>

  </div>

</div>

      </div>

    </DashboardLayout>

  )

}

export default ResumenPage
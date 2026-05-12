import { ReactNode } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  Upload,
  Scissors,
  Combine,
  FileText,
  Brain,
  Trash2,
  Pencil,
  Lock,
} from "lucide-react"

function ToolCard({
  titulo,
  descripcion,
  icono,
  color,
  disabled = false,
}: {
  titulo: string
  descripcion: string
  icono: React.ReactNode
  color: string
  disabled?: boolean
}) {

  return (

    <button
      disabled={disabled}
      className={`rounded-2xl p-6 text-left transition border ${
        disabled
          ? "bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed"
          : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:-translate-y-1"
      }`}
    >

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color}`}>

        {icono}

      </div>

      <h2 className="text-2xl font-bold mb-3">
        {titulo}
      </h2>

      <p className="text-slate-400 text-base leading-relaxed">
        {descripcion}
      </p>

    </button>

  )

}

function TemarioCard({
  nombre,
  procesado,
}: {
  nombre: string
  procesado: boolean
}) {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* IZQUIERDA */}
        <div className="flex items-start gap-4">

          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
            procesado
              ? "bg-violet-500/20"
              : "bg-slate-800"
          }`}>

            <FileText
              size={26}
              className={
                procesado
                  ? "text-violet-400"
                  : "text-slate-400"
              }
            />

          </div>

          <div>

            <h2 className="text-xl font-bold">
              {nombre}
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-3">

              {!procesado && (

                <div className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-semibold">

                  Sin procesar

                </div>

              )}

              {procesado && (

                <>
                  <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-semibold">

                    Procesado IA

                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

                    124 páginas

                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">

                    24 temas detectados

                  </div>
                </>

              )}

            </div>

          </div>

        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap gap-3">

          {!procesado && (

            <button className="h-11 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-xs font-bold flex items-center gap-2">

              <Brain size={16} />

              Procesar IA

            </button>

          )}

          {procesado ? (

            <button className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-xs font-semibold">

              Ver temas

            </button>

          ) : (

            <button
              disabled
              className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed flex items-center gap-2 text-xs font-semibold"
            >

              <Lock size={14} />

              Ver temas

            </button>

          )}

          <button className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-xs font-semibold flex items-center gap-2">

            <Pencil size={14} />

            Renombrar

          </button>

          <button className="h-11 px-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition text-xs font-semibold text-red-400 flex items-center gap-2">

            <Trash2 size={14} />

            Eliminar

          </button>

        </div>

      </div>

    </div>

  )

}

function TemariosPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-3xl font-bold">
            Temarios
          </h1>

          <p className="text-slate-400 text-base mt-3 leading-relaxed max-w-4xl">

            Sube PDFs, prepara tus temarios y procésalos con inteligencia artificial
            para detectar automáticamente temas y generar contenido.

          </p>

        </div>

        {/* HERRAMIENTAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* SUBIR */}
          <ToolCard
            titulo="Subir PDF"
            descripcion="Añade nuevos PDFs a tu biblioteca de temarios."
            color="bg-cyan-500/20"
            icono={
              <Upload
                size={28}
                className="text-cyan-400"
              />
            }
          />

          {/* DIVIDIR */}
          <ToolCard
            titulo="Dividir PDF"
            descripcion="Divide un temario en varios bloques independientes."
            color="bg-violet-500/20"
            icono={
              <Scissors
                size={28}
                className="text-violet-400"
              />
            }
          />

          {/* UNIR */}
          <ToolCard
            titulo="Unir PDFs"
            descripcion="Combina varios PDFs en un único temario preparado."
            color="bg-orange-500/20"
            icono={
              <Combine
                size={28}
                className="text-orange-400"
              />
            }
          />

        </div>

        {/* BIBLIOTECA */}
        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Biblioteca
            </h2>

            <div className="text-slate-400 text-sm">
              2 temarios
            </div>

          </div>

          {/* TEMARIO SIN PROCESAR */}
          <TemarioCard
            nombre="Temario_Policia_2026.pdf"
            procesado={false}
          />

          {/* TEMARIO PROCESADO */}
          <TemarioCard
            nombre="Constitución Española"
            procesado={true}
          />

        </div>

      </div>

    </DashboardLayout>

  )

}

export default TemariosPage
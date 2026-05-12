import DashboardLayout from "../layouts/DashboardLayout"

import {
  BookOpen,
  CheckCircle2,
  CalendarDays,
  PlayCircle,
  RotateCcw,
  Bookmark,
  Trash2,
  FileText,
  Repeat,
} from "lucide-react"

function InfoCard({
  titulo,
  valor,
  color,
}: {
  titulo: string
  valor: string
  color: string
}) {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">
        {titulo}
      </p>

      <h2 className={`text-3xl font-black ${color}`}>
        {valor}
      </h2>

    </div>

  )

}

function PlanEstudioPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-3xl font-bold">
            Plan de estudio
          </h1>

          <p className="text-slate-400 text-base mt-3 leading-relaxed max-w-4xl">

            Continúa tu planificación y controla el avance
            de tus sesiones de estudio.

          </p>

        </div>

        {/* RESUMEN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <InfoCard
            titulo="Sesión actual"
            valor="12 / 48"
            color="text-cyan-400"
          />

          <InfoCard
            titulo="Páginas restantes"
            valor="638"
            color="text-white"
          />

          <InfoCard
            titulo="Páginas por día"
            valor="16"
            color="text-orange-400"
          />

          <InfoCard
            titulo="Vuelta"
            valor="1 / 2"
            color="text-violet-400"
          />

        </div>

        {/* SESION ACTUAL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {/* TOP */}
          <div className="border-b border-slate-800 p-6">

            {/* TEMARIO */}
            <div className="flex items-center gap-3 mb-5">

              <BookOpen
                size={28}
                className="text-cyan-400"
              />

              <div>

                <h2 className="text-2xl font-bold">
                  Constitución Española
                </h2>

                <p className="text-slate-400 text-base mt-1">

                  Organización territorial del Estado

                </p>

              </div>

            </div>

            {/* INFO */}
            <div className="flex flex-wrap gap-3">

              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm">

                📖 Páginas 120 - 136

              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm font-semibold">

                Sin página guardada

              </div>

            </div>

          </div>

          {/* BOTONES */}
          <div className="p-6 space-y-4">

            {/* PRINCIPALES */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

              {/* CONTINUAR */}
              <button className="h-14 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-base font-black flex items-center justify-center gap-2">

                <PlayCircle size={20} />

                Continuar estudio

              </button>

              {/* FINALIZAR */}
              <button className="h-14 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition text-black text-base font-black flex items-center justify-center gap-2">

                <CheckCircle2 size={20} />

                Finalizar sesión

              </button>

            </div>

            {/* SECUNDARIOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

              {/* ABRIR PDF */}
              <button className="h-12 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-sm font-semibold flex items-center justify-center gap-2">

                <FileText size={18} />

                Abrir PDF

              </button>

              {/* GUARDAR PAGINA */}
              <button className="h-12 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-sm font-semibold flex items-center justify-center gap-2">

                <Bookmark size={18} />

                Guardar página

              </button>

              {/* REAJUSTAR */}
              <button className="h-12 rounded-xl bg-orange-500 hover:bg-orange-400 transition text-black text-sm font-black flex items-center justify-center gap-2">

                <RotateCcw size={18} />

                Reajustar plan

              </button>

              {/* ELIMINAR */}
              <button className="h-12 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition text-red-400 text-sm font-bold flex items-center justify-center gap-2">

                <Trash2 size={18} />

                Eliminar plan

              </button>

            </div>

          </div>

        </div>

        {/* INFO INFERIOR */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* PLANIFICACION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <CalendarDays
                size={24}
                className="text-violet-400"
              />

              <h2 className="text-2xl font-bold">
                Planificación
              </h2>

            </div>

            <div className="space-y-5">

              <div>

                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                  Inicio
                </p>

                <h3 className="text-xl font-bold">
                  10 Mayo 2026
                </h3>

              </div>

              <div>

                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                  Final estimado
                </p>

                <h3 className="text-xl font-bold">
                  10 Julio 2026
                </h3>

              </div>

              <div>

                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                  Días por semana
                </p>

                <h3 className="text-xl font-bold">
                  5 días
                </h3>

              </div>

            </div>

          </div>

          {/* ESTADO */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <Repeat
                size={24}
                className="text-orange-400"
              />

              <h2 className="text-2xl font-bold">
                Estado actual
              </h2>

            </div>

            <div className="space-y-5">

              <div>

                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                  Progreso general
                </p>

                <h3 className="text-xl font-bold text-emerald-400">
                  Vas adelantado
                </h3>

              </div>

              <div>

                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                  Estado de la sesión
                </p>

                <h3 className="text-xl font-bold text-orange-400">
                  En curso
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  )

}

export default PlanEstudioPage
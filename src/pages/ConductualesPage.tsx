import { ReactNode } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  UserRound,
  RefreshCcw,
  ShieldCheck,
  MessageSquare,
  IdCard,
} from "lucide-react"

function ConductualCard({
  titulo,
  descripcion,
  icono,
  color,
}: {
  titulo: string
  descripcion: string
  icono: ReactNode
  color: string
}) {

  return (

    <button className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 text-left transition hover:-translate-y-1">

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color}`}>

        {icono}

      </div>

      <h2 className="text-2xl font-bold mb-2">
        {titulo}
      </h2>

      <p className="text-slate-400 text-base leading-relaxed">
        {descripcion}
      </p>

    </button>

  )

}

function ConductualesPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-4xl font-bold">
            Pruebas conductuales
          </h1>

          <p className="text-slate-400 text-lg mt-3 leading-relaxed">
            Selecciona el tipo de prueba
            que deseas generar.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* RASGOS */}
          <ConductualCard
            titulo="Rasgos"
            descripcion="Evaluación de personalidad, comportamiento y tendencias generales."
            color="bg-cyan-500/20"
            icono={
              <UserRound
                size={28}
                className="text-cyan-400"
              />
            }
          />

          {/* INVERSAS */}
          <ConductualCard
            titulo="Inversas"
            descripcion="Preguntas inversas para validar coherencia y estabilidad de respuestas."
            color="bg-violet-500/20"
            icono={
              <RefreshCcw
                size={28}
                className="text-violet-400"
              />
            }
          />

          {/* CONTROL */}
          <ConductualCard
            titulo="Control"
            descripcion="Preguntas de control para detectar patrones inconsistentes."
            color="bg-orange-500/20"
            icono={
              <ShieldCheck
                size={28}
                className="text-orange-400"
              />
            }
          />

          {/* SITUACIONES */}
          <ConductualCard
            titulo="Situaciones"
            descripcion="Resolución de situaciones prácticas y toma de decisiones."
            color="bg-emerald-500/20"
            icono={
              <MessageSquare
                size={28}
                className="text-emerald-400"
              />
            }
          />

          {/* PERFIL */}
          <ConductualCard
            titulo="Perfil"
            descripcion="Análisis completo del perfil conductual y compatibilidad."
            color="bg-pink-500/20"
            icono={
              <IdCard
                size={28}
                className="text-pink-400"
              />
            }
          />

        </div>

      </div>

    </DashboardLayout>

  )

}

export default ConductualesPage
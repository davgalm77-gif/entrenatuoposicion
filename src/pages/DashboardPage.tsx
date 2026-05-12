import DashboardLayout from "../layouts/DashboardLayout"

import {
  Trophy,
  PenSquare,
  Flame,
  Zap,
  ArrowRight,
} from "lucide-react"

function DashboardPage() {

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* TITULO */}
        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 text-base mt-2">
            Bienvenido a tu panel de preparación.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          {/* CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-xs">
                  Progreso general
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  72%
                </h2>

              </div>

              <div className="bg-blue-500/20 p-3 rounded-xl">

                <Trophy
                  size={26}
                  className="text-blue-400"
                />

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-xs">
                  Tests realizados
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  148
                </h2>

              </div>

              <div className="bg-cyan-500/20 p-3 rounded-xl">

                <PenSquare
                  size={26}
                  className="text-cyan-400"
                />

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-xs">
                  Racha actual
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  12 días
                </h2>

              </div>

              <div className="bg-orange-500/20 p-3 rounded-xl">

                <Flame
                  size={26}
                  className="text-orange-400"
                />

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-xs">
                  Créditos restantes
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  5
                </h2>

              </div>

              <div className="bg-yellow-500/20 p-3 rounded-xl">

                <Zap
                  size={26}
                  className="text-yellow-400"
                />

              </div>

            </div>

          </div>

        </div>

        {/* BLOQUES */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* ACTIVIDAD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Actividad reciente
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between bg-slate-950 rounded-xl p-4">

                <div>

                  <p className="font-semibold text-base">
                    Test completado
                  </p>

                  <p className="text-slate-400 text-sm">
                    Psicotécnicos · Memoria
                  </p>

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500"
                />

              </div>

              <div className="flex items-center justify-between bg-slate-950 rounded-xl p-4">

                <div>

                  <p className="font-semibold text-base">
                    Nuevo resumen IA
                  </p>

                  <p className="text-slate-400 text-sm">
                    Tema 12 · Constitución
                  </p>

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500"
                />

              </div>

              <div className="flex items-center justify-between bg-slate-950 rounded-xl p-4">

                <div>

                  <p className="font-semibold text-base">
                    Simulacro realizado
                  </p>

                  <p className="text-slate-400 text-sm">
                    100 preguntas · 82%
                  </p>

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500"
                />

              </div>

            </div>

          </div>

          {/* CONTINUAR */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Continuar estudiando
            </h2>

            <div className="space-y-4">

              {/* ITEM */}
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">

                <p className="text-slate-400 text-xs mb-2">
                  Último tema
                </p>

                <h3 className="text-xl font-semibold">
                  Tema 12 · Constitución Española
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Continúa donde lo dejaste.
                </p>

              </div>

              {/* ITEM */}
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">

                <p className="text-slate-400 text-xs mb-2">
                  Último entrenamiento
                </p>

                <h3 className="text-xl font-semibold">
                  Psicotécnicos · Memoria
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Última puntuación: 82%
                </p>

              </div>

              {/* ITEM */}
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">

                <p className="text-slate-400 text-xs mb-2">
                  Última actividad IA
                </p>

                <h3 className="text-xl font-semibold">
                  Resumen generado
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Tema 8 · Derecho Administrativo
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default DashboardPage
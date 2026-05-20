import { ReactNode } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  Calculator,
  Sigma,
  Triangle,
  BookOpenText,
} from "lucide-react"

function MatematicasCard({
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

function MatematicasPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-4xl font-bold">
            Pruebas matemáticas
          </h1>

          <p className="text-slate-400 text-lg mt-3 leading-relaxed">
            Selecciona el tipo de prueba
            que deseas generar.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ARITMETICA */}
          <MatematicasCard
            titulo="Aritmética"
            descripcion="Operaciones básicas, porcentajes, fracciones y cálculo numérico."
            color="bg-cyan-500/20"
            icono={
              <Calculator
                size={28}
                className="text-cyan-400"
              />
            }
          />

          {/* ALGEBRA */}
          <MatematicasCard
            titulo="Álgebra"
            descripcion="Ecuaciones, expresiones algebraicas y razonamiento matemático."
            color="bg-violet-500/20"
            icono={
              <Sigma
                size={28}
                className="text-violet-400"
              />
            }
          />

          {/* GEOMETRIA */}
          <MatematicasCard
            titulo="Geometría"
            descripcion="Figuras, áreas, volúmenes y razonamiento espacial."
            color="bg-orange-500/20"
            icono={
              <Triangle
                size={28}
                className="text-orange-400"
              />
            }
          />

          {/* PROBLEMAS */}
          <MatematicasCard
            titulo="Problemas"
            descripcion="Resolución de problemas matemáticos y lógica aplicada."
            color="bg-emerald-500/20"
            icono={
              <BookOpenText
                size={28}
                className="text-emerald-400"
              />
            }
          />

        </div>

      </div>

    </DashboardLayout>

  )

}

export default MatematicasPage
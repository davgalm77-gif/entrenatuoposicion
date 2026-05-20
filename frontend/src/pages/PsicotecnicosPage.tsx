import { Link } from "react-router-dom"
import { ReactNode } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  Brain,
  Sigma,
  Shapes,
  BrainCircuit,
} from "lucide-react"

function PsicoCard({
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

    <div className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 text-left transition hover:-translate-y-1 cursor-pointer">

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color}`}>

        {icono}

      </div>

      <h2 className="text-2xl font-bold mb-2">
        {titulo}
      </h2>

      <p className="text-slate-400 text-base leading-relaxed">
        {descripcion}
      </p>

    </div>

  )

}

function PsicotecnicosPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-4xl font-bold">
            Pruebas psicotécnicas
          </h1>

          <p className="text-slate-400 text-lg mt-3 leading-relaxed">
            Selecciona el tipo de prueba
            que deseas generar.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* VERBALES */}
          <Link to="/verbal-test">

            <PsicoCard
              titulo="Verbales"
              descripcion="Sinónimos, antónimos, analogías, comprensión verbal y razonamiento lingüístico."
              color="bg-cyan-500/20"
              icono={
                <Brain
                  size={28}
                  className="text-cyan-400"
                />
              }
            />

          </Link>

          {/* NUMERICOS */}
          <PsicoCard
            titulo="Numéricos"
            descripcion="Operaciones, porcentajes, series numéricas y razonamiento matemático."
            color="bg-violet-500/20"
            icono={
              <Sigma
                size={28}
                className="text-violet-400"
              />
            }
          />

          {/* FIGURAS */}
          <Link to="/figuras-test">

            <PsicoCard
              titulo="Figuras"
              descripcion="Matrices, secuencias visuales, patrones y lógica abstracta."
              color="bg-orange-500/20"
              icono={
                <Shapes
                  size={28}
                  className="text-orange-400"
                />
              }
            />

          </Link>

          {/* MEMORIA */}
          <Link to="/retentiva-test">

          <PsicoCard
            titulo="Memoria"
            descripcion="Retención visual, matrices dinámicas y ejercicios de memoria."
            color="bg-emerald-500/20"
            icono={
              <BrainCircuit
                size={28}
                className="text-emerald-400"
              />
            }
          />

          </Link>

        </div>

      </div>

    </DashboardLayout>

  )

}

export default PsicotecnicosPage
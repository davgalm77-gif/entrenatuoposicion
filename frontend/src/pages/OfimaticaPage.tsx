import { ReactNode } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  FileText,
  Table2,
  Database,
  PresentationIcon,
  Monitor,
  Mail,
  Globe,
} from "lucide-react"

function OfimaticaCard({
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

function OfimaticaPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-4xl font-bold">
            Pruebas de ofimática
          </h1>

          <p className="text-slate-400 text-lg mt-3 leading-relaxed">
            Selecciona el tipo de prueba
            que deseas generar.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* WORD */}
          <OfimaticaCard
            titulo="Word"
            descripcion="Formato de documentos, estilos, tablas y herramientas de edición."
            color="bg-cyan-500/20"
            icono={
              <FileText
                size={28}
                className="text-cyan-400"
              />
            }
          />

          {/* EXCEL */}
          <OfimaticaCard
            titulo="Excel"
            descripcion="Fórmulas, funciones, gráficos y hojas de cálculo."
            color="bg-emerald-500/20"
            icono={
              <Table2
                size={28}
                className="text-emerald-400"
              />
            }
          />

          {/* ACCESS */}
          <OfimaticaCard
            titulo="Access"
            descripcion="Bases de datos, consultas, formularios e informes."
            color="bg-violet-500/20"
            icono={
              <Database
                size={28}
                className="text-violet-400"
              />
            }
          />

          {/* POWERPOINT */}
          <OfimaticaCard
            titulo="PowerPoint"
            descripcion="Presentaciones, diapositivas y herramientas visuales."
            color="bg-orange-500/20"
            icono={
              <PresentationIcon
                size={28}
                className="text-orange-400"
              />
            }
          />

          {/* WINDOWS */}
          <OfimaticaCard
            titulo="Windows"
            descripcion="Sistema operativo, configuración y herramientas básicas."
            color="bg-blue-500/20"
            icono={
              <Monitor
                size={28}
                className="text-blue-400"
              />
            }
          />

          {/* CORREO */}
          <OfimaticaCard
            titulo="Correo"
            descripcion="Gestión de email, bandejas, reglas y comunicación."
            color="bg-pink-500/20"
            icono={
              <Mail
                size={28}
                className="text-pink-400"
              />
            }
          />

          {/* INTERNET */}
          <OfimaticaCard
            titulo="Internet"
            descripcion="Navegación web, buscadores, seguridad y recursos online."
            color="bg-yellow-500/20"
            icono={
              <Globe
                size={28}
                className="text-yellow-400"
              />
            }
          />

        </div>

      </div>

    </DashboardLayout>

  )

}

export default OfimaticaPage
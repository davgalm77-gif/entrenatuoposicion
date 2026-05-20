import { ReactNode } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  Zap,
  FileText,
  PenSquare,
  Headphones,
} from "lucide-react"

function InfoCard({
  titulo,
  icono,
  color,
  children,
}: {
  titulo: string
  icono: ReactNode
  color: string
  children: ReactNode
}) {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center gap-4 mb-6">

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>

          {icono}

        </div>

        <h2 className="text-2xl font-bold">
          {titulo}
        </h2>

      </div>

      <div className="space-y-4">

        {children}

      </div>

    </div>

  )

}

function Linea({
  texto,
  valor,
}: {
  texto: string
  valor: string
}) {

  return (

    <div className="flex items-center justify-between gap-5 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">

      <span className="text-slate-300 text-base">
        {texto}
      </span>

      <span className="text-cyan-400 font-bold text-lg whitespace-nowrap">
        {valor}
      </span>

    </div>

  )

}

function PackCard({
  creditos,
  precio,
  destacado,
}: {
  creditos: string
  precio: string
  destacado?: boolean
}) {

  return (

    <button
      className={`rounded-2xl p-6 border transition text-left ${
        destacado
          ? "bg-cyan-500/10 border-cyan-500 hover:bg-cyan-500/20"
          : "bg-slate-900 border-slate-800 hover:bg-slate-800"
      }`}
    >

      <div className="flex items-center gap-3">

        <Zap
          size={22}
          className="text-yellow-400"
        />

        <span className="text-2xl font-bold">
          {creditos}
        </span>

      </div>

      <div className="mt-6 text-3xl font-black">
        {precio}
      </div>

    </button>

  )

}

function CreditosPage() {

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* EXAMENES */}
          <InfoCard
            titulo="Tests examen"
            color="bg-cyan-500/20"
            icono={
              <PenSquare
                size={28}
                className="text-cyan-400"
              />
            }
          >

            <Linea
              texto="Valor por bloque de examen"
              valor="0,50 créditos"
            />

            <Linea
              texto="Valor por cada 10 preguntas"
              valor="0,10 créditos"
            />

            <Linea
              texto="Listening"
              valor="+1 crédito"
            />

          </InfoCard>

          {/* PRACTICA */}
          <InfoCard
            titulo="Pruebas de práctica"
            color="bg-violet-500/20"
            icono={
              <FileText
                size={28}
                className="text-violet-400"
              />
            }
          >

            <Linea
              texto="20 preguntas de práctica"
              valor="0,20 créditos"
            />

          </InfoCard>

          {/* RESUMENES */}
          <InfoCard
            titulo="Resúmenes y podcast"
            color="bg-orange-500/20"
            icono={
              <Headphones
                size={28}
                className="text-orange-400"
              />
            }
          >

            <Linea
              texto="Resumen por tema"
              valor="0,10 créditos"
            />

            <Linea
              texto="Podcast por tema"
              valor="0,20 créditos"
            />

          </InfoCard>

        </div>

        {/* PACKS */}
        <div>

          <h2 className="text-3xl font-bold mb-6">
            Packs de créditos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <PackCard
              creditos="5 créditos"
              precio="1,99€"
            />

            <PackCard
              creditos="20 créditos"
              precio="4,99€"
              destacado
            />

            <PackCard
              creditos="50 créditos"
              precio="13,99€"
            />

          </div>

        </div>

      </div>

    </DashboardLayout>

  )

}

export default CreditosPage
import { useMemo, useState } from "react"

import { Input } from "../components/ui/input"

import DashboardLayout from "../layouts/DashboardLayout"

import {
  CalendarDays,
  BookOpen,
  Repeat,
  Clock3,
  Brain,
  FileText,
} from "lucide-react"

function SelectButton({
  texto,
  activo = false,
  onClick,
}: {
  texto: string
  activo?: boolean
  onClick?: () => void
}) {

  return (

    <button
      onClick={onClick}
      className={`h-12 px-5 rounded-xl border transition text-sm font-semibold ${
        activo
          ? "bg-cyan-500 text-black border-cyan-400"
          : "bg-slate-950 border-slate-800 hover:bg-slate-900"
      }`}
    >

      {texto}

    </button>

  )

}

function TemarioCard({
  nombre,
  paginas,
  seleccionado = false,
  onClick,
}: {
  nombre: string
  paginas: number
  seleccionado?: boolean
  onClick?: () => void
}) {

  return (

    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        seleccionado
          ? "bg-cyan-500/10 border-cyan-500"
          : "bg-slate-900 border-slate-800 hover:border-slate-700"
      }`}
    >

      <div className="flex items-start gap-4">

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          seleccionado
            ? "bg-cyan-500/20"
            : "bg-slate-800"
        }`}>

          <FileText
            size={24}
            className={
              seleccionado
                ? "text-cyan-400"
                : "text-slate-400"
            }
          />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            {nombre}
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            {paginas} páginas
          </p>

        </div>

      </div>

    </button>

  )

}

function ConfigurarPlanPage() {

  const [temariosSeleccionados, setTemariosSeleccionados] = useState<string[]>([
    "Constitución Española",
  ])

  const [duracionMeses, setDuracionMeses] = useState(2)

  const [duracionPersonalizada, setDuracionPersonalizada] = useState(false)

  const [diasPersonalizados, setDiasPersonalizados] = useState("45")

  const [diasSemana, setDiasSemana] = useState(5)

  const [vueltas, setVueltas] = useState(2)

  const temarios = [
    {
      nombre: "Constitución Española",
      paginas: 124,
    },
    {
      nombre: "Procedimiento Administrativo",
      paginas: 210,
    },
    {
      nombre: "Ley 39/2015",
      paginas: 98,
    },
    {
      nombre: "Prevención de riesgos",
      paginas: 76,
    },
  ]

  function toggleTemario(nombre: string) {

    setTemariosSeleccionados((prev) => {

      if (prev.includes(nombre)) {
        return prev.filter(t => t !== nombre)
      }

      return [...prev, nombre]

    })

  }

  const resumen = useMemo(() => {

    const seleccionados = temarios.filter(t =>
      temariosSeleccionados.includes(t.nombre)
    )

    const paginasTotales = seleccionados.reduce(
      (acc, t) => acc + t.paginas,
      0
    )

    const diasTotales = duracionPersonalizada
      ? Number(diasPersonalizados || 0)
      : duracionMeses * 30

    const diasDisponibles =
      Math.floor(diasTotales / 7) * diasSemana

    const paginasConVueltas = paginasTotales * vueltas

    const paginasPorBloque =
      diasDisponibles > 0
        ? Math.ceil(paginasConVueltas / diasDisponibles)
        : 0

    return {
      paginasTotales,
      diasDisponibles,
      paginasPorBloque,
    }

  }, [
    temariosSeleccionados,
    duracionMeses,
    duracionPersonalizada,
    diasPersonalizados,
    diasSemana,
    vueltas,
  ])

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-3xl font-bold">
            Configurar plan de estudio
          </h1>

          <p className="text-slate-400 text-base mt-3 leading-relaxed max-w-4xl">

            Configura automáticamente tu planificación personalizada
            seleccionando temarios, duración y ritmo de estudio.

          </p>

        </div>

        {/* TEMARIOS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <BookOpen
              size={24}
              className="text-cyan-400"
            />

            <h2 className="text-2xl font-bold">
              Seleccionar temarios
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {temarios.map((temario) => (

              <TemarioCard
                key={temario.nombre}
                nombre={temario.nombre}
                paginas={temario.paginas}
                seleccionado={temariosSeleccionados.includes(temario.nombre)}
                onClick={() => toggleTemario(temario.nombre)}
              />

            ))}

          </div>

        </div>

        {/* CONFIGURACION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* DURACION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <CalendarDays
                size={24}
                className="text-violet-400"
              />

              <h2 className="text-2xl font-bold">
                Duración
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              <SelectButton
                texto="1 mes"
                activo={duracionMeses === 1 && !duracionPersonalizada}
                onClick={() => {
                  setDuracionMeses(1)
                  setDuracionPersonalizada(false)
                }}
              />

              <SelectButton
                texto="2 meses"
                activo={duracionMeses === 2 && !duracionPersonalizada}
                onClick={() => {
                  setDuracionMeses(2)
                  setDuracionPersonalizada(false)
                }}
              />

              <SelectButton
                texto="3 meses"
                activo={duracionMeses === 3 && !duracionPersonalizada}
                onClick={() => {
                  setDuracionMeses(3)
                  setDuracionPersonalizada(false)
                }}
              />

              <SelectButton
                texto="Personalizado"
                activo={duracionPersonalizada}
                onClick={() => setDuracionPersonalizada(true)}
              />

              {duracionPersonalizada && (

                <div className="mt-4 w-full">

                  <Input
                    type="text"
                    value={diasPersonalizados}
                    onChange={(e) => {

                      const valor = e.target.value

                      if (/^\d*$/.test(valor)) {
                        setDiasPersonalizados(valor)
                      }

                    }}
                    placeholder="Número de días"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    className="h-12 bg-slate-950 border-slate-700 text-white rounded-xl"
                  />

                </div>

              )}

            </div>

          </div>

          {/* DIAS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <Clock3
                size={24}
                className="text-orange-400"
              />

              <h2 className="text-2xl font-bold">
                Días por semana
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              {[1, 2, 3, 4, 5, 6, 7].map((dia) => (

                <SelectButton
                  key={dia}
                  texto={String(dia)}
                  activo={diasSemana === dia}
                  onClick={() => setDiasSemana(dia)}
                />

              ))}

            </div>

          </div>

          {/* VUELTAS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <Repeat
                size={24}
                className="text-emerald-400"
              />

              <h2 className="text-2xl font-bold">
                Vueltas
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              {[1, 2, 3].map((vuelta) => (

                <SelectButton
                  key={vuelta}
                  texto={`${vuelta} vuelta${vuelta > 1 ? "s" : ""}`}
                  activo={vueltas === vuelta}
                  onClick={() => setVueltas(vuelta)}
                />

              ))}

            </div>

          </div>

        </div>

        {/* RESUMEN */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <Brain
              size={26}
              className="text-cyan-400"
            />

            <h2 className="text-2xl font-bold">
              Resumen automático
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

              <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
                Páginas totales
              </p>

              <h3 className="text-3xl font-black">
                {resumen.paginasTotales}
              </h3>

            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

              <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
                Días de estudio
              </p>

              <h3 className="text-3xl font-black">
                {resumen.diasDisponibles}
              </h3>

            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

              <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
                Páginas de estudio diario
              </p>

              <h3 className="text-3xl font-black text-cyan-400">
                {resumen.paginasPorBloque}
              </h3>

            </div>

          </div>

        </div>

        {/* BOTON */}
        <div className="flex justify-end">

          <button className="h-14 px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-base font-black">

            Generar plan de estudio

          </button>

        </div>

      </div>

    </DashboardLayout>

  )

}

export default ConfigurarPlanPage
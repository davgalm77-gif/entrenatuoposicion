import { useEffect, useState } from "react"

import {
  useNavigate
} from "react-router-dom"

import DashboardLayout from "../../layouts/DashboardLayout"

import {
  Brain,
  Trophy,
  CheckCircle2,
  XCircle
} from "lucide-react"

type Pregunta = {
  pregunta: string

  opciones: string[]

  correcta: string

  explicacion?: string
}

type ResultadoPregunta = {
  pregunta: Pregunta

  respuestaUsuario: string

  acertada: boolean
}

function VerbalTestPage() {

  const navigate =
    useNavigate()

  const [
    preguntas,
    setPreguntas
  ] = useState<Pregunta[]>([])

  const [
    resultados,
    setResultados
  ] = useState<
    ResultadoPregunta[]
  >([])

  const [
    index,
    setIndex
  ] = useState(0)

  const [
    cargando,
    setCargando
  ] = useState(true)

  const [
    finalizado,
    setFinalizado
  ] = useState(false)

  useEffect(() => {

    async function cargar() {

      try {

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/Psicotecnicos/verbal`,
            {
              method: "POST"
            }
          )

        const data =
          await response.json()

        alert(
`Prueba generada

Prompt tokens: ${data.promptTokens}

Completion tokens: ${data.completionTokens}

Total tokens: ${data.totalTokens}`
)

setPreguntas(
  data.preguntas
)

      }
      catch (error) {

        console.error(
          error
        )

      }
      finally {

        setCargando(
          false
        )

      }

    }

    cargar()

  }, [])

  function responder(
    letra: string
  ) {

    const actual =
      preguntas[index]

    const acertada =
      letra === actual.correcta

    const nuevoResultado:
      ResultadoPregunta = {

      pregunta: actual,

      respuestaUsuario:
        letra,

      acertada
    }

    setResultados(
      [
        ...resultados,
        nuevoResultado
      ]
    )

    const siguiente =
      index + 1

    if (
      siguiente >=
      preguntas.length
    ) {

      setFinalizado(
        true
      )

      return

    }

    setIndex(
      siguiente
    )

  }

  if (cargando) {

    return (

      <DashboardLayout>

        <div className="h-[60vh] flex items-center justify-center">

          <div className="text-center">

            <h1 className="text-2xl font-black text-white">

              Generando prueba...

            </h1>

            <p className="text-slate-400 text-sm mt-2">

              Preparando preguntas verbales

            </p>

          </div>

        </div>

      </DashboardLayout>

    )

  }

  if (
    preguntas.length === 0
  ) {

    return null

  }

  const preguntaActual =
    preguntas[index]

  const aciertos =
    resultados.filter(
      r => r.acertada
    ).length

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* TEST */}
        {!finalizado && (

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

            {/* IZQUIERDA */}
            <div className="xl:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

              {/* HEADER */}
              <div className="border-b border-slate-800 p-5 flex items-center justify-between flex-wrap gap-3">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain
                      size={30}
                      className="text-cyan-400"
                    />

                    <h1 className="text-3xl font-black text-white">

                      Verbal

                    </h1>

                  </div>

                  <p className="text-slate-400 text-sm mt-2">

                    Pregunta {index + 1} de {preguntas.length}

                  </p>

                </div>

              </div>

              {/* CONTENIDO */}
              <div className="p-8">

                {/* PREGUNTA */}
                <h2 className="text-2xl font-bold leading-relaxed whitespace-pre-line text-white">

                  {preguntaActual.pregunta}

                </h2>

                {/* RESPUESTAS */}
                <div className="mt-8 space-y-4">

                  {preguntaActual.opciones.map((o, i) => {

                    const letra =
                      String.fromCharCode(
                        65 + i
                      )

                    return (

                      <button
                        key={i}
                        onClick={() =>
                          responder(
                            letra
                          )
                        }
                        className="w-full text-left p-4 rounded-3xl bg-slate-950 border border-slate-800 hover:border-cyan-400 hover:bg-slate-900 transition"
                      >

                        <div className="flex items-start gap-4">

                          <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-black font-black text-lg flex items-center justify-center shrink-0">

                            {letra}

                          </div>

                          <p className="text-lg leading-relaxed text-white">

                            {o}

                          </p>

                        </div>

                      </button>

                    )

                  })}

                </div>

              </div>

            </div>

            {/* DERECHA */}
            <div className="space-y-4">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-6">

                  <Trophy
                    size={28}
                    className="text-yellow-400"
                  />

                  <h2 className="text-2xl font-bold text-white">

                    Progreso

                  </h2>

                </div>

                <div className="space-y-6">

                  <div>

                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">

                      Pregunta actual

                    </p>

                    <h3 className="text-4xl font-black text-cyan-400">

                      {index + 1}

                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">

                      Aciertos

                    </p>

                    <h3 className="text-4xl font-black text-emerald-400">

                      {aciertos}

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* RESULTADOS */}
        {finalizado && (

          <div className="space-y-4">

            {/* HEADER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

              <h1 className="text-2xl font-black text-white">

                Test finalizado

              </h1>

              <p className="text-slate-400 mt-2 text-sm">

                Has acertado{" "}

                <span className="text-emerald-400 font-black">

                  {aciertos}

                </span>

                {" "}de{" "}

                <span className="text-cyan-400 font-black">

                  {resultados.length}

                </span>

                {" "}preguntas

              </p>

            </div>

            {/* PREGUNTAS */}
            {resultados.map((r, i) => (

              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
              >

                {/* TOP */}
                <div className="p-4 border-b border-slate-800">

                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">

                    Pregunta {i + 1}

                  </p>

                  <h2 className="text-base font-black text-white leading-relaxed whitespace-pre-line">

                    {r.pregunta.pregunta}

                  </h2>

                </div>

                {/* RESPUESTAS */}
                <div className="p-4 space-y-2">

                  {r.pregunta.opciones.map((o, j) => {

                    const letra =
                      String.fromCharCode(
                        65 + j
                      )

                    const esCorrecta =
                      letra === r.pregunta.correcta

                    const esUsuario =
                      letra === r.respuestaUsuario

                    return (

                      <div
                        key={j}
                        className={`rounded-xl border p-3 flex items-center gap-3 ${
                          esCorrecta
                            ? "bg-emerald-500/10 border-emerald-500/20"
                            : esUsuario
                              ? "bg-red-500/10 border-red-500/20"
                              : "bg-slate-950 border-slate-800"
                        }`}
                      >

                        {/* LETRA */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 ${
                          esCorrecta
                            ? "bg-emerald-400 text-black"
                            : esUsuario
                              ? "bg-red-400 text-black"
                              : "bg-slate-700 text-white"
                        }`}>

                          {letra}

                        </div>

                        {/* TEXTO */}
                        <p className="text-sm font-medium text-white">

                          {o}

                        </p>

                        {/* TAGS */}
                        <div className="ml-auto flex gap-2 flex-wrap">

                          {esCorrecta && (

                            <div className="px-2 py-1 rounded-lg bg-emerald-400 text-black text-xs font-black">

                              Correcta

                            </div>

                          )}

                          {esUsuario && !esCorrecta && (

                            <div className="px-2 py-1 rounded-lg bg-red-400 text-black text-xs font-black">

                              Tu respuesta

                            </div>

                          )}

                        </div>

                      </div>

                    )

                  })}

                </div>

                {/* EXPLICACION */}
                {r.pregunta.explicacion && (

                  <div className="px-4 pb-4">

                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">

                      <p className="text-sm text-slate-300 leading-relaxed">

                        {r.pregunta.explicacion}

                      </p>

                    </div>

                  </div>

                )}

              </div>

            ))}

            {/* BOTON */}
            <div className="flex justify-center pt-6">

              <button
                onClick={() =>
             navigate(-1)
}
                className="flex-1 h-14 rounded-2xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-lg font-bold flex items-center justify-center text-white"
              >

                Volver

              </button>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  )

}

export default VerbalTestPage
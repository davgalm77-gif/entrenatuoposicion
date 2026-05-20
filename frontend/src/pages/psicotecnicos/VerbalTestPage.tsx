import { Link } from "react-router-dom"
import { useState } from "react"

import DashboardLayout from "../../layouts/DashboardLayout"

import {
  Brain,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react"

type Respuesta = {
  texto: string
  correcta: boolean
}

type Pregunta = {
  pregunta: string
  respuestas: Respuesta[]
}

const preguntas: Pregunta[] = [
  {
    pregunta:
      "¿Qué palabra completa correctamente la analogía?\n\nLibro es a leer como cuchillo es a...",
    respuestas: [
      {
        texto: "Cortar",
        correcta: true,
      },
      {
        texto: "Cocinar",
        correcta: false,
      },
      {
        texto: "Guardar",
        correcta: false,
      },
      {
        texto: "Pintar",
        correcta: false,
      },
    ],
  },

  {
    pregunta:
      "Selecciona la palabra que NO pertenece al grupo.",
    respuestas: [
      {
        texto: "Perro",
        correcta: false,
      },
      {
        texto: "Gato",
        correcta: false,
      },
      {
        texto: "Caballo",
        correcta: false,
      },
      {
        texto: "Martillo",
        correcta: true,
      },
    ],
  },

  {
    pregunta:
      "¿Qué palabra tiene un significado más parecido a “efímero”?",
    respuestas: [
      {
        texto: "Duradero",
        correcta: false,
      },
      {
        texto: "Temporal",
        correcta: true,
      },
      {
        texto: "Pesado",
        correcta: false,
      },
      {
        texto: "Constante",
        correcta: false,
      },
    ],
  },
]

function VerbalTestPage() {

  const [index, setIndex] = useState(0)

  const [aciertos, setAciertos] = useState(0)

  const [finalizado, setFinalizado] = useState(false)

  const preguntaActual = preguntas[index]

  function responder(correcta: boolean) {

    if (finalizado)
      return

    if (correcta) {

      setAciertos((a) => a + 1)

    }

    const siguiente = index + 1

    if (siguiente >= preguntas.length) {

      setFinalizado(true)

      return
    }

    setIndex(siguiente)

  }

  const porcentaje = Math.round(
    (aciertos / preguntas.length) * 100
  )

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {!finalizado && (

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

            {/* IZQUIERDA */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">

              {/* TOP */}
              <div className="border-b border-slate-800 p-6">

                <div className="flex items-center gap-4">

                  <Brain
                    size={32}
                    className="text-cyan-400"
                  />

                  <div>

                    <h1 className="text-3xl font-black">
                      Verbal
                    </h1>

                    <p className="text-slate-400 mt-1">

                      Pregunta {index + 1} de {preguntas.length}

                    </p>

                  </div>

                </div>

              </div>

              {/* CONTENIDO */}
              <div className="p-8">

                {/* PREGUNTA */}
                <h2 className="text-2xl font-bold leading-relaxed whitespace-pre-line">

                  {preguntaActual.pregunta}

                </h2>

                {/* RESPUESTAS */}
                <div className="mt-8 space-y-4">

                  {preguntaActual.respuestas.map((r, i) => (

                    <button
                      key={i}
                      onClick={() => responder(r.correcta)}
                      className="w-full text-left p-4 rounded-3xl bg-slate-950 border border-slate-800 hover:border-cyan-400 hover:bg-slate-900 transition"
                    >

                      <div className="flex items-start gap-4">

                        <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-black font-black text-lg flex items-center justify-center shrink-0">

                          {String.fromCharCode(65 + i)}

                        </div>

                        <p className="text-lg leading-relaxed">

                          {r.texto}

                        </p>

                      </div>

                    </button>

                  ))}

                </div>

              </div>

            </div>

            {/* DERECHA */}
            <div className="space-y-6">

              {/* PROGRESO */}
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">

                <div className="flex items-center gap-3 mb-6">

                  <Trophy
                    size={28}
                    className="text-yellow-400"
                  />

                  <h2 className="text-2xl font-bold">
                    Progreso
                  </h2>

                </div>

                <div className="space-y-6">

                  <div>

                    <p className="text-slate-500 text-sm uppercase tracking-widest mb-2">

                      Pregunta actual

                    </p>

                    <h3 className="text-4xl font-black text-cyan-400">

                      {index + 1}

                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm uppercase tracking-widest mb-2">

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

        {/* RESULTADO */}
        {finalizado && (

          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">

            {/* TOP */}
            <div className="p-8 border-b border-slate-800 text-center">

              <div className="w-24 h-24 rounded-full bg-cyan-500 mx-auto flex items-center justify-center">

                <Trophy
                  size={42}
                  className="text-black"
                />

              </div>

              <h1 className="text-5xl font-black mt-6">

                {porcentaje}%

              </h1>

              <p className="text-slate-400 text-xl mt-3">

                Prueba finalizada

              </p>

            </div>

            {/* STATS */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-center">

                <CheckCircle2
                  size={38}
                  className="text-emerald-400 mx-auto"
                />

                <h2 className="text-4xl font-black mt-4 text-emerald-400">

                  {aciertos}

                </h2>

                <p className="text-slate-400 text-lg mt-2">

                  Aciertos

                </p>

              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-center">

                <XCircle
                  size={38}
                  className="text-red-400 mx-auto"
                />

                <h2 className="text-4xl font-black mt-4 text-red-400">

                  {preguntas.length - aciertos}

                </h2>

                <p className="text-slate-400 text-lg mt-2">

                  Fallos

                </p>

              </div>

            </div>

            {/* BOTONES */}
            <div className="p-8 border-t border-slate-800 flex flex-col md:flex-row gap-4">

              <button
                onClick={() => {

                  setIndex(0)
                  setAciertos(0)
                  setFinalizado(false)

                }}
                className="flex-1 h-14 rounded-3xl bg-blue-600 hover:bg-blue-500 transition text-white text-lg font-black"
              >

                Generar nueva prueba

              </button>

              <Link
                to="/psicotecnicos"
                className="flex-1 h-14 rounded-3xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-lg font-bold flex items-center justify-center gap-3 text-white"
              >

                <ArrowLeft size={20} />

                Volver

              </Link>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  )

}

export default VerbalTestPage
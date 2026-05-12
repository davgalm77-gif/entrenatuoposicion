import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"

type Pregunta = {
  texto: string
  pregunta?: string
  opciones: string[]
  correcta: string
  explicacion?: string
}

type ResultadoPregunta = {
  pregunta: Pregunta
  ruta: string
  respuestaUsuario: string
  acertada: boolean
}

function FigurasPage() {

  const navigate = useNavigate()

  const [preguntas, setPreguntas] = useState<Pregunta[]>([])

  const [rutas, setRutas] = useState<string[]>([])

  const [resultados, setResultados] = useState<ResultadoPregunta[]>([])

  const [index, setIndex] = useState(0)

  const [cargando, setCargando] = useState(true)

  const [finalizado, setFinalizado] = useState(false)

  function esImagen(valor?: string) {

    if (!valor)
      return false

    return (
      valor.endsWith(".png") ||
      valor.endsWith(".jpg") ||
      valor.endsWith(".jpeg") ||
      valor.endsWith(".webp")
    )

  }

  // CARGAR
  useEffect(() => {

    async function cargar() {

      try {

        const res = await fetch("/Psicotecnicos/index.json")

        const todas: string[] = await res.json()

        const mezcladas = [...todas]
          .sort(() => Math.random() - 0.5)

        const preguntasTemp: Pregunta[] = []

        const rutasTemp: string[] = []

        for (const ruta of mezcladas) {

          // YA TENEMOS 20
          if (preguntasTemp.length >= 20)
            break

          try {

            const data = await fetch(
              `/Psicotecnicos/${ruta}/data.json`
            )

            if (!data.ok)
              continue

            const json = await data.json()

            if (
              !json ||
              !json.opciones ||
              !Array.isArray(json.opciones) ||
              json.opciones.length < 2
            ) {
              continue
            }

            preguntasTemp.push(json)

            rutasTemp.push(ruta)

          }
          catch {

          }

        }

        setPreguntas(preguntasTemp)

        setRutas(rutasTemp)

        setCargando(false)

      }
      catch (e) {

        console.error(e)

        setCargando(false)

      }

    }

    cargar()

  }, [])

  // RESPONDER
  function responder(letra: string) {

    const actual = preguntas[index]

    const acertada = letra === actual.correcta

    const nuevoResultado: ResultadoPregunta = {

      pregunta: actual,
      ruta: rutas[index],
      respuestaUsuario: letra,
      acertada

    }

    setResultados((prev) => [...prev, nuevoResultado])

    const siguiente = index + 1

    if (siguiente >= preguntas.length) {

      setFinalizado(true)

      return

    }

    setIndex(siguiente)

  }

  // LOADING
  if (cargando) {

    return (

      <DashboardLayout>

        <div className="h-[60vh] flex items-center justify-center">

          <div className="text-center">

            <h1 className="text-2xl font-black text-white">

              Generando prueba...

            </h1>

            <p className="text-slate-400 text-sm mt-2">

              Cargando ejercicios psicotécnicos

            </p>

          </div>

        </div>

      </DashboardLayout>

    )

  }

  const preguntaActual = preguntas[index]

  const rutaActual = rutas[index]

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* TEST */}
        {!finalizado && preguntaActual && (

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

            {/* IZQUIERDA */}
            <div className="xl:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

              {/* HEADER */}
              <div className="border-b border-slate-800 p-5 flex items-center justify-between flex-wrap gap-3">

                <div>

                  <h1 className="text-2xl font-black text-white">
                    Figuras
                  </h1>

                  <p className="text-slate-400 text-sm mt-1.5">

                    Pregunta {index + 1} de {preguntas.length}

                  </p>

                </div>

              </div>

              {/* CONTENIDO */}
              <div className="p-5">

                {/* TEXTO */}
                <h2 className="text-lg font-bold leading-relaxed mb-5 text-white">

                  {preguntaActual.texto}

                </h2>

                {/* PREGUNTA */}
                {preguntaActual.pregunta && (

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-6">

                    {esImagen(preguntaActual.pregunta) ? (

                      <div className="flex items-center">

                        <div className="bg-white rounded-xl border border-slate-300 p-3">

                          <img
                            src={`/Psicotecnicos/${rutaActual}/${preguntaActual.pregunta}`}
                            className="max-h-[150px] object-contain"
                          />

                        </div>

                      </div>

                    ) : (

                      <p className="text-white text-base leading-relaxed">

                        {preguntaActual.pregunta}

                      </p>

                    )}

                  </div>

                )}

                {/* RESPUESTAS */}
                <div className="space-y-3">

                  {preguntaActual.opciones.map((o, i) => {

                    const letra =
                      String.fromCharCode(65 + i)

                    return (

                      <button
                        key={o}
                        onClick={() => responder(letra)}
                        className="w-full bg-slate-950 hover:bg-slate-900 transition border border-slate-800 hover:border-cyan-400 rounded-2xl px-5 py-3"
                      >

                        <div className="flex items-center gap-4">

                          {/* LETRA */}
                          <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center text-black text-base font-black shrink-0">

                            {letra}

                          </div>

                          {/* CONTENIDO */}
                          {esImagen(o) ? (

                            <div className="bg-white rounded-lg border border-slate-300 w-[70px] h-[60px] flex items-center justify-center shrink-0">

                              <img
                                src={`/Psicotecnicos/${rutaActual}/${o}`}
                                className="max-h-[45px] max-w-[58px] object-contain"
                              />

                            </div>

                          ) : (

                            <p className="text-base font-bold text-white">

                              {o}

                            </p>

                          )}

                        </div>

                      </button>

                    )

                  })}

                </div>

              </div>

            </div>

            {/* DERECHA */}
            <div className="space-y-4">

              {/* PROGRESO */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <h2 className="text-lg font-bold mb-5 text-white">
                  Progreso
                </h2>

                <div className="space-y-5">

                  <div>

                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">

                      Pregunta actual

                    </p>

                    <h3 className="text-3xl font-black text-cyan-400">

                      {index + 1}

                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">

                      Aciertos

                    </p>

                    <h3 className="text-3xl font-black text-emerald-400">

                      {resultados.filter(r => r.acertada).length}

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
          {resultados.filter(r => r.acertada).length}
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

          <div>

            <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">

              Pregunta {i + 1}

            </p>

            <h2 className="text-base font-black text-white leading-relaxed">

              {r.pregunta.texto}

            </h2>

          </div>

        </div>

        {/* BODY */}
        <div className="p-4 space-y-4">

          {/* FIGURA / PREGUNTA */}
          {r.pregunta.pregunta && (

            <div>

              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">

                Pregunta

              </p>

              {esImagen(r.pregunta.pregunta) ? (

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">

                  <div className="bg-white rounded-xl border border-slate-300 p-2 inline-flex">

                    <img
                      src={`/Psicotecnicos/${r.ruta}/${r.pregunta.pregunta}`}
                      className="max-h-[110px] object-contain"
                    />

                  </div>

                </div>

              ) : (

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">

                  <p className="text-white text-sm leading-relaxed">

                    {r.pregunta.pregunta}

                  </p>

                </div>

              )}

            </div>

          )}

          {/* RESPUESTAS */}
          <div>

            <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">

              Respuestas

            </p>

            <div className="space-y-2">

              {r.pregunta.opciones.map((o, j) => {

                const letra =
                  String.fromCharCode(65 + j)

                const esCorrecta =
                  letra === r.pregunta.correcta

                const esUsuario =
                  letra === r.respuestaUsuario

                return (

                  <div
                    key={j}
                    className={`rounded-xl border p-2.5 flex items-center gap-3 ${
                      esCorrecta
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : esUsuario
                          ? "bg-red-500/10 border-red-500/20"
                          : "bg-slate-950 border-slate-800"
                    }`}
                  >

                    {/* LETRA */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[18px] font-black shrink-0 ${
                      esCorrecta
                        ? "bg-emerald-400 text-black"
                        : esUsuario
                          ? "bg-red-400 text-black"
                          : "bg-slate-700 text-white"
                    }`}>

                      {letra}

                    </div>

                    {/* CONTENIDO */}
                    {esImagen(o) ? (

                      <div className="bg-white rounded-lg border border-slate-300 w-[65px] h-[55px] flex items-center justify-center shrink-0">

                        <img
                          src={`/Psicotecnicos/${r.ruta}/${o}`}
                          className="max-h-[40px] max-w-[50px] object-contain"
                        />

                      </div>

                    ) : (

                      <p className="text-sm font-medium text-white">

                        {o}

                      </p>

                    )}

                    {/* TAGS */}
                    <div className="ml-auto flex gap-2 flex-wrap">

                      {esCorrecta && (

                        <div className="px-2 py-1 rounded-lg bg-emerald-400 text-black text-[14px] font-black">

                          Correcta

                        </div>

                      )}

                      {esUsuario && !esCorrecta && (

                        <div className="px-2 py-1 rounded-lg bg-red-400 text-black text-[14px] font-black">

                          Tu respuesta

                        </div>

                      )}

                    </div>

                  </div>

                )

              })}

            </div>

          </div>

          {/* EXPLICACION */}
          {r.pregunta.explicacion && (

            <div>

              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">

                Explicación

              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">

                <p className="text-sm text-slate-200 leading-relaxed">

                  {r.pregunta.explicacion}

                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    ))}

    <div className="flex justify-center pt-6">

      <button
        onClick={() =>
          navigate("/pruebas-psicotecnicas")
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

export default FigurasPage
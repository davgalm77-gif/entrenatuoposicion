import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"

type Respuesta = {
  texto: string
  esCorrecta?: boolean
  correcta?: boolean
}

type Pregunta = {
  texto: string
  respuestas: Respuesta[]
}

type CeldaMatriz = {
  fila: number
  columna: number
  imagen: string
}

const letras = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
]

const tipos = [
  "matriz",
  "lectura",
  "imagen",
] as const

function RetentivaTestPage() {

  const navigate = useNavigate()

  const [fase, setFase] =
    useState<
      "memoria" |
      "preguntas" |
      "resultado"
    >("memoria")

  const obtenerTipo = () => {

  const ultimo =
    Number(
      localStorage.getItem(
        "retentiva_tipo"
      ) || 0
    )

  return ultimo

}

const [tipoIndex] =
  useState(obtenerTipo())

const tipo =
  tipos[tipoIndex]

  const [preguntas, setPreguntas] =
    useState<Pregunta[]>([])

  const [preguntaIndex, setPreguntaIndex] =
    useState(0)

  const [aciertos, setAciertos] =
    useState(0)

  const [imagenesMatriz, setImagenesMatriz] =
    useState<string[]>([])

  const [celdasMatriz, setCeldasMatriz] =
    useState<CeldaMatriz[]>([])

  const [textoLectura, setTextoLectura] =
    useState("")

  const [imagenRetentiva, setImagenRetentiva] =
    useState("")

    const [respuestasUsuario, setRespuestasUsuario] =
  useState<number[]>([])

  useEffect(() => {

    const cargarImagenes = async () => {

      try {

        const response =
          await fetch("/Images/index.json")

        const data =
          await response.json()

        setImagenesMatriz(data)

      }
      catch (error) {

        console.error(
          "Error cargando imágenes",
          error
        )

      }

    }

    cargarImagenes()

  }, [])

  useEffect(() => {

    if (
      imagenesMatriz.length === 0
    ) {
      return
    }

    iniciarEjercicio()

  }, [imagenesMatriz, tipo])

  const iniciarEjercicio = async () => {

    setFase("memoria")

    if (tipo === "lectura") {

      const response =
        await fetch(
          "/Retentiva/Lecturas/index.json"
        )

      const data =
        await response.json()

      const carpeta =
        data[
        Math.floor(
          Math.random() * data.length
        )
        ]

      const texto =
        await fetch(
          `/Retentiva/Lecturas/${carpeta}/texto.txt`
        )

      const textoFinal =
        await texto.text()

      const preguntasJson =
        await fetch(
          `/Retentiva/Lecturas/${carpeta}/data.json`
        )

      const preguntasFinal =
        await preguntasJson.json()

      setTextoLectura(textoFinal)

      setPreguntas(
        preguntasFinal
          .preguntas
          .slice(0, 20)
      )

      setTimeout(() => {

        setFase("preguntas")

      }, 300000)

    }

    if (tipo === "imagen") {

      const response =
        await fetch(
          "/Retentiva/Imagenes/index.json"
        )

      const data =
        await response.json()

      const carpeta =
        data[
        Math.floor(
          Math.random() * data.length
        )
        ]

      setImagenRetentiva(
        `/Retentiva/Imagenes/${carpeta}/imagen.png`
      )

      const preguntasJson =
        await fetch(
          `/Retentiva/Imagenes/${carpeta}/data.json`
        )

      const preguntasFinal =
        await preguntasJson.json()

      setPreguntas(
        preguntasFinal
          .preguntas
          .slice(0, 20)
      )

      setTimeout(() => {

        setFase("preguntas")

      }, 180000)

    }

    if (tipo === "matriz") {

      const matriz =
        generarMatriz()

      setCeldasMatriz(matriz)

      const preguntasMatriz =
        generarPreguntasMatriz(
          matriz
        )

      setPreguntas(
        preguntasMatriz
      )

      setTimeout(() => {

        setFase("preguntas")

      }, 120000)

    }

  }

  function generarMatriz() {

    const celdas: CeldaMatriz[] = []

    const ocupadas =
      new Set<string>()

    const repetidos =
      [...imagenesMatriz]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)

    repetidos.forEach((img) => {

      const repeticiones =
        Math.floor(Math.random() * 2) + 2

      for (
        let i = 0;
        i < repeticiones;
        i++
      ) {

        let fila = 0
        let columna = 0
        let key = ""

        do {

          fila =
            Math.floor(
              Math.random() * 6
            )

          columna =
            Math.floor(
              Math.random() * 12
            )

          key =
            `${fila}-${columna}`

        }
        while (
          ocupadas.has(key)
        )

        ocupadas.add(key)

        celdas.push({
          fila,
          columna,
          imagen: img,
        })

      }

    })

    const restantes =
      imagenesMatriz.filter(
        x => !repetidos.includes(x)
      )

    restantes.forEach((img) => {

      if (Math.random() > 0.9)
        return

      let fila = 0
      let columna = 0
      let key = ""

      do {

        fila =
          Math.floor(
            Math.random() * 6
          )

        columna =
          Math.floor(
            Math.random() * 12
          )

        key =
          `${fila}-${columna}`

      }
      while (
        ocupadas.has(key)
      )

      ocupadas.add(key)

      celdas.push({
        fila,
        columna,
        imagen: img,
      })

    })

    return celdas

  }

  function generarPreguntasMatriz(
    celdas: CeldaMatriz[]
  ) {

    const preguntas: Pregunta[] = []

    const grupos =
      celdas.reduce((acc, celda) => {

        const nombre =
          celda.imagen
            .split("/")
            .pop()
            ?.replace(".png", "") || ""

        if (!acc[nombre]) {

          acc[nombre] = []

        }

        acc[nombre].push(celda)

        return acc

      }, {} as Record<string, CeldaMatriz[]>)

    Object.entries(grupos)
      .slice(0, 10)
      .forEach(([nombre, items]) => {

        const correcta =
          items.length

        const respuestas: Respuesta[] = [
          {
            texto:
              correcta.toString(),

            esCorrecta: true,
          },
        ]

        while (
          respuestas.length < 4
        ) {

          const valor =
            Math.max(
              0,
              correcta +
              Math.floor(
                Math.random() * 5
              ) - 2
            )

          if (
            respuestas.some(
              x =>
                x.texto ===
                valor.toString()
            )
          ) {
            continue
          }

          respuestas.push({
            texto:
              valor.toString(),

            esCorrecta: false,
          })

        }

        preguntas.push({
          texto:
            `¿Cuántas veces aparece "${nombre}" en la matriz?`,

          respuestas:
            respuestas.sort(
              () =>
                Math.random() - 0.5
            ),
        })

      })

      
    // =====================
    // FILAS
    // =====================

    celdas
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .forEach((celda) => {

        const nombre =
          celda.imagen
            .split("/")
            .pop()
            ?.replace(".png", "") || ""

        const correcta =
          (celda.fila + 1).toString()

        const respuestas: Respuesta[] = [
          {
            texto: correcta,
            esCorrecta: true,
          },
        ]

        while (
          respuestas.length < 4
        ) {

          const valor =
            (
              Math.floor(
                Math.random() * 6
              ) + 1
            ).toString()

          if (
            respuestas.some(
              x => x.texto === valor
            )
          ) {
            continue
          }

          respuestas.push({
            texto: valor,
            esCorrecta: false,
          })

        }

        preguntas.push({
          texto:
            `¿En qué fila aparece "${nombre}"?`,

          respuestas:
            respuestas.sort(
              () => Math.random() - 0.5
            ),
        })

      })

    // =====================
    // COLUMNAS
    // =====================

    celdas
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .forEach((celda) => {

        const nombre =
          celda.imagen
            .split("/")
            .pop()
            ?.replace(".png", "") || ""

        const correcta =
          letras[celda.columna]

        const respuestas: Respuesta[] = [
          {
            texto: correcta,
            esCorrecta: true,
          },
        ]

        while (
          respuestas.length < 4
        ) {

          const valor =
            letras[
              Math.floor(
                Math.random() * 12
              )
            ]

          if (
            respuestas.some(
              x => x.texto === valor
            )
          ) {
            continue
          }

          respuestas.push({
            texto: valor,
            esCorrecta: false,
          })

        }

        preguntas.push({
          texto:
            `¿En qué columna aparece "${nombre}"?`,

          respuestas:
            respuestas.sort(
              () => Math.random() - 0.5
            ),
        })

      })


    celdas
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .forEach((celda) => {

        const nombre =
          celda.imagen
            .split("/")
            .pop()
            ?.replace(".png", "") || ""

        const posicion =
          `${letras[celda.columna]}${celda.fila + 1}`

        const objetos =
          Object.keys(grupos)
            .filter(
              x => x !== nombre
            )
            .sort(
              () =>
                Math.random() - 0.5
            )
            .slice(0, 3)

        const respuestas: Respuesta[] = [
          {
            texto: nombre,
            esCorrecta: true,
          },
        ]

        objetos.forEach((obj) => {

          respuestas.push({
            texto: obj,
            esCorrecta: false,
          })

        })

        preguntas.push({
          texto:
            `¿Qué objeto había en ${posicion}?`,

          respuestas:
            respuestas.sort(
              () =>
                Math.random() - 0.5
            ),
        })

      })

    return preguntas
      .sort(() => Math.random() - 0.5)
      .slice(0, 20)

  }

  const responder = (
  indexRespuesta: number
) => {

  const pregunta =
    preguntas[preguntaIndex]

  const correcta =
  pregunta.respuestas[indexRespuesta]
    .esCorrecta ||
  pregunta.respuestas[indexRespuesta]
    .correcta

  setRespuestasUsuario(prev => [
    ...prev,
    indexRespuesta,
  ])

  if (correcta) {

    setAciertos(
      prev => prev + 1
    )

  }

  if (
  preguntaIndex >= 19
) {

  const siguiente =
    (tipoIndex + 1) %
    tipos.length

  localStorage.setItem(
    "retentiva_tipo",
    siguiente.toString()
  )

  setFase("resultado")

  return

}

  setPreguntaIndex(
    prev => prev + 1
  )

}

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto py-10">

        {fase === "memoria" && (

          <div className="space-y-8">

            <div className="text-center">

              <h1 className="text-3xl font-bold">

                {tipo === "lectura" &&
                  "Memoriza este texto durante 5 minutos"}

                {tipo === "imagen" &&
                  "Memoriza esta imagen durante 3 minutos"}

                {tipo === "matriz" &&
                  "Memoriza esta matriz durante 2 minutos"}

              </h1>

            </div>

            {tipo === "lectura" && (

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <p className="text-base text-slate-200 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">

                  {textoLectura}

                </p>

              </div>

            )}

            {tipo === "imagen" && (

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 w-fit mx-auto">

  <img
    src={imagenRetentiva}
    className="w-auto max-w-4xl max-h-[850px] rounded-2xl object-contain"
  />

</div>

            )}

            {tipo === "matriz" && (

  <div className="flex justify-center">

    <div className="bg-slate-900 border border-slate-800 rounded-2xl px-20 py-10 w-fit">

      <div className="flex items-start gap-4">

        {/* NUMEROS */}
        <div className="flex flex-col gap-[12px] pt-[63px]">

          {Array.from({ length: 6 }).map((_, i) => (

            <div
              key={i}
              className="w-[58px] h-[58px] flex items-center justify-center text-white font-black text-2xl"
            >

              {i + 1}

            </div>

          ))}

        </div>

        {/* MATRIZ */}
<div className="flex flex-col gap-3">

  {/* LETRAS */}
  <div className="grid grid-cols-12 gap-x-14 gap-y-5">

            {letras.map((letra) => (

              <div
                key={letra}
                className="w-[58px] h-[58px] flex items-center justify-center text-white font-black text-2xl"
              >

                {letra}

              </div>

            ))}

          </div>

          {/* CELDAS */}
          <div
  className="grid grid-cols-12 gap-x-14 gap-y-4"
  style={{
    gridAutoRows: "54px",
  }}
>

            {Array.from({ length: 72 }).map((_, index) => {

              const fila =
                Math.floor(index / 12)

              const columna =
                index % 12

              const celda =
                celdasMatriz.find(
                  x =>
                    x.fila === fila &&
                    x.columna === columna
                )

              return (

                <div
  key={index}
  className="w-[54px] h-[54px] bg-white border border-slate-300 rounded-lg flex items-center justify-center overflow-hidden p-1"
>

                  {celda && (

                    <img
  src={celda.imagen}
  className="w-[78%] h-[78%] object-contain"
/>

                  )}

                </div>

              )

            })}

          </div>

        </div>

      </div>

    </div>

  </div>

)}
          </div>

        )}

        {fase === "preguntas" && (

          <div className="space-y-8">

            <h2 className="text-3xl font-bold">

              Pregunta {
                preguntaIndex + 1
              } / 20

            </h2>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h3 className="text-2xl font-bold leading-relaxed">

                {
                  preguntas[
                    preguntaIndex
                  ]?.texto
                }

              </h3>

            </div>

            <div className="grid grid-cols-1 gap-4">

              {
                preguntas[
                  preguntaIndex
                ]?.respuestas.map(
                  (
                    respuesta,
                    index
                  ) => (

                    <button
  key={index}
  onClick={() =>
    responder(index)
  }
  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-6 text-left text-lg transition"
>

  {respuesta.texto}

</button>

                  )
                )
              }

            </div>

          </div>

        )}

        {fase === "resultado" && (

  <div className="space-y-8">

    <div className="text-center">

      <h1 className="text-6xl font-black">

        {aciertos} / 20

      </h1>

      <p className="text-slate-400 text-2xl mt-4">

        Resultado final

      </p>

    </div>

    <div className="space-y-5">

      {preguntas.map(
        (
          pregunta,
          preguntaIdx
        ) => {

          const respuestaUsuario =
            respuestasUsuario[preguntaIdx]

          return (

            <div
              key={preguntaIdx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >

              <div className="flex items-start justify-between gap-4 mb-5">

  <h3 className="text-xl font-bold">

    {preguntaIdx + 1}.
    {" "}
    {pregunta.texto}

  </h3>

  <div
    className={`px-3 py-1 rounded-xl text-[14px] font-black border shrink-0 ${
      pregunta.respuestas[
        respuestaUsuario
      ]?.esCorrecta ||
      pregunta.respuestas[
        respuestaUsuario
      ]?.correcta
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-red-500/10 text-red-400 border-red-500/20"
    }`}
  >

    {pregunta.respuestas[
      respuestaUsuario
    ]?.esCorrecta ||
    pregunta.respuestas[
      respuestaUsuario
    ]?.correcta
      ? "CORRECTA"
      : "INCORRECTA"}

  </div>

</div>

              <div className="space-y-3">

                {pregunta.respuestas.map(
                  (
                    respuesta,
                    respuestaIdx
                  ) => {

                    const seleccionada =
                      respuestaUsuario === respuestaIdx

                    return (

                      <div
                        key={respuestaIdx}
                        className={`rounded-xl p-4 border ${
                          respuesta.esCorrecta || respuesta.correcta
                            ? "bg-green-500/10 border-green-500"
                            : seleccionada
                              ? "bg-red-500/10 border-red-500"
                              : "bg-slate-950 border-slate-800"
                        }`}
                      >

                        {respuesta.texto}

                      </div>

                    )

                  }
                )}

              </div>

            </div>

          )

        }
      )}

    </div>

      <div className="flex justify-center pt-8">

      <button
        onClick={() =>
          navigate("/pruebas-psicotecnicas")
        }
        className="flex-1 h-16 rounded-3xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-xl font-bold flex items-center justify-center gap-3 text-white">
      

        Volver

      </button>

    </div>

  </div>

)}

      </div>

    </DashboardLayout>

  )

}

export default RetentivaTestPage
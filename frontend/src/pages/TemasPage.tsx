import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"

import {
  FileText,
  Headphones,
  Trash2
} from "lucide-react"

function TemasPage() {

  const { id } = useParams()

  const [
    temasSeleccionados,
    setTemasSeleccionados
  ] = useState<number[]>([])

  const [
    temario,
    setTemario
  ] = useState<any | null>(null)

  const [
  generandoPodcast,
  setGenerandoPodcast
] = useState<number | null>(null)

  const [
  resumenes,
  setResumenes
] = useState<any[]>([])

const [
  podcasts,
  setPodcasts
] = useState<any[]>([])

const [
  temas,
  setTemas
] = useState<any[]>([])

const [
  generandoResumen,
  setGenerandoResumen
] = useState(false)

  useEffect(() => {

  const fetchDatos =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        )

      const temarioResponse =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/Temarios/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      const temarioData =
        await temarioResponse.json()

      setTemario(
        temarioData
      )

      const resumenesResponse =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/Temarios/${id}/resumenes`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      const resumenesData =
        await resumenesResponse.json()

      setResumenes(
        resumenesData
      )

      const podcastsResponse =
  await fetch(
    `${import.meta.env.VITE_API_URL}/api/Temarios/${id}/podcasts`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

const podcastsData =
  await podcastsResponse.json()

setPodcasts(
  podcastsData
)

const temasResponse =
  await fetch(
    `${import.meta.env.VITE_API_URL}/api/Temarios/${id}/temas`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

const temasData =
  await temasResponse.json()

setTemas(
  temasData
)

    }

  fetchDatos()

}, [id])

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <h1 className="text-3xl font-bold">

             {temario?.nombre}

            </h1>

            <div className="flex flex-wrap gap-3 mt-4">

              <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

                {temario?.paginas} páginas

              </div>

              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">

                {temario?.temasDetectados} temas detectados

              </div>

            </div>

          </div>

          <div className="flex gap-3">

            <button

  onClick={() => {

    window.location.href =
  `/temarios/ver/${temario?.id}?from=temas`

  }}

  className="h-12 px-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500 transition text-sm font-semibold"
>

  Ver PDF

</button>

          </div>

        </div>

        {/* TEMAS */}
<div className="space-y-6">

  <div className="flex items-center justify-between">

    <h2 className="text-2xl font-bold text-violet-300">

      Temas detectados

    </h2>

    <div className="text-slate-400 text-sm">

      {temas.length} temas

    </div>

  </div>

  {/* ACCIONES */}
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

    <div className="text-sm text-violet-300 font-semibold">

      {temasSeleccionados.length} temas seleccionados

    </div>

    <button

    disabled={generandoResumen}

  onClick={async () => {

  if (
    temasSeleccionados.length === 0
  ) {
    return
  }

  try {

    setGenerandoResumen(true)

    const token =
      localStorage.getItem(
        "token"
      )

    const response =
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/Temarios/${id}/resumenes`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({

            temarioId: id,

            temasSeleccionados
          })
        }
      )

    const data =
      await response.json()

      alert(
`Resumen generado

Prompt tokens: ${data.promptTokens}

Completion tokens: ${data.completionTokens}

Total tokens: ${data.totalTokens}`
)

    const nuevoResumen = {

      id: data.id,

      titulo:
        temasSeleccionados.length === 1

          ? temas.find(
              t => t.id === temasSeleccionados[0]
            )?.titulo || "Resumen"

          : `Resumen de temas ${temas
              .filter(t =>
                temasSeleccionados.includes(t.id)
              )
              .map((t, index) => index + 1)
              .join(", ")}`,

      temas:
        data.numeroTemas,

      paginas:
        data.paginas,

      contenido:
        data.contenido
    }

    setResumenes([
      nuevoResumen,
      ...resumenes
    ])

    setTemasSeleccionados([])

  }
  finally {

    setGenerandoResumen(false)

  }

}}

  className="h-11 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 transition text-black text-sm font-bold shadow-lg shadow-cyan-500/10"
>

  {
  generandoResumen
    ? "Generando resumen..."
    : "Generar resumen"
}

</button>

  </div>

  {/* LISTADO */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

    {temas.map((tema, index) => {

  const temaId =
  Number(tema.id)

  return (

    <div
      key={tema.id}

      className={`rounded-2xl border transition-all duration-300 p-5 ${
        temasSeleccionados.includes(
          temaId
        )
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-slate-800 bg-slate-900 hover:border-slate-700"
      }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="space-y-3">

          <h3 className="text-lg font-bold leading-relaxed">

            {index + 1}. {tema.titulo}

          </h3>

        </div>

        <button

          onClick={() => {

            if (
              temasSeleccionados.includes(
                temaId
              )
            ) {
              setTemasSeleccionados(
                temasSeleccionados.filter(
                  t => t !== temaId
                )
              )
            }
            else {
              setTemasSeleccionados([
                ...temasSeleccionados,
                temaId
              ])
            }

          }}

          className={`w-6 h-6 rounded-full border-2 transition ${
            temasSeleccionados.includes(
              temaId
            )
              ? "bg-cyan-400 border-cyan-400"
              : "border-slate-600"
          }`}
        />

      </div>

    </div>

  )

})}

  </div>

<div className="h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

  {/* RESÚMENES */}
<div className="space-y-6">

  <div className="flex items-center justify-between">

    <h2 className="text-2xl font-bold text-cyan-300">

  Resúmenes generados

</h2>

<div className="text-slate-400 text-sm">

  {resumenes.length} {
    resumenes.length === 1
      ? "resumen"
      : "resúmenes"
  }

</div>

  </div>

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

  {resumenes.length === 0 && (

    <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

      <h3 className="text-2xl font-bold text-cyan-300">

        Todavía no hay resúmenes generados

      </h3>

      <p className="text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">

        Selecciona uno o varios temas y genera tu primer resumen mediante inteligencia artificial.

      </p>

    </div>

  )}

  {resumenes.map((resumen) => (

    <div
      key={resumen.id}

      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >

      <div className="flex items-start justify-between gap-4">

  <div>

    <h3 className="text-xl font-bold leading-relaxed">

      {resumen.titulo}

    </h3>

    <div className="flex flex-wrap gap-2 mt-4">

      <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-semibold">

        {resumen.temas} {
  resumen.temas === 1
    ? "tema"
    : "temas"
}

      </div>

    </div>

  </div>

  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">

    <FileText
      size={26}
      className="text-cyan-300"
    />

  </div>

</div>

      <p className="text-slate-400 text-sm leading-relaxed mt-5">

        Resumen generado automáticamente mediante IA a partir de los temas seleccionados del temario.

      </p>

      <div className="flex flex-wrap gap-3 mt-6">

        <button

  onClick={() => {

    window.location.href =
      `/resumenes/${resumen.id}`

  }}

  className="h-11 px-4 rounded-xl bg-violet-500 hover:bg-violet-400 transition text-black text-xs font-bold"
>

  Ver resumen

</button>

        <button

        disabled={
  generandoPodcast === resumen.id
}

  onClick={async () => {

    setGenerandoPodcast(
  resumen.id
)

  const token =
    localStorage.getItem(
      "token"
    )

  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Temarios/podcasts`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({
          resumenId:
            resumen.id
        })
      }
    )

  const data =
    await response.json()

  const nuevoPodcast = {

  id: data.id,

  titulo: data.titulo,

  guion: data.guion,

  audioUrl:
  data.audioUrl,

  duracion:
    data.duracion
}

  setPodcasts([
    nuevoPodcast,
    ...podcasts
  ])

  setGenerandoPodcast(
  null
)

}}

  className="h-11 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-xs font-bold"
>

  {
  generandoPodcast === resumen.id
    ? "Generando podcast..."
    : "Generar podcast"
}

</button>

<button


  onClick={async () => {

  const token =
    localStorage.getItem(
      "token"
    )

  await fetch(
    `${import.meta.env.VITE_API_URL}/api/Temarios/resumenes/${resumen.id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

  setResumenes(
    resumenes.filter(
      r => r.id !== resumen.id
    )
  )

}}

  className="h-11 px-4 rounded-xl bg-slate-950 border border-red-500/20 hover:bg-red-500/10 transition text-xs font-semibold text-red-400"
>

  Eliminar

</button>

      </div>

    </div>

  ))}

</div>

</div>

</div>

<div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

{/* PODCASTS */}

<div className="space-y-6">

  <div className="flex items-center justify-between">

    <h2 className="text-2xl font-bold text-orange-300">

  Podcasts generados

</h2>

<div className="text-slate-400 text-sm">

  {podcasts.length} {
    podcasts.length === 1
      ? "podcast"
      : "podcasts"
  }

</div>

  </div>

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

  {podcasts.length === 0 && (

    <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

      <h3 className="text-2xl font-bold text-orange-300">

        Todavía no hay podcasts generados

      </h3>

      <p className="text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">

        Genera podcasts automáticamente a partir de tus resúmenes IA para escuchar el contenido donde quieras.

      </p>

    </div>

  )}

  {podcasts.map((podcast) => (

    <div
      key={podcast.id}

      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >

      <div className="flex items-start justify-between gap-4">

  <div>

    <h3 className="text-xl font-bold">

      {podcast.titulo}

    </h3>

    <div className="flex flex-wrap gap-2 mt-4">

      <div className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-semibold">

        {podcast.duracion}

      </div>

    </div>

  </div>

  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">

    <Headphones
      size={26}
      className="text-orange-300"
    />

  </div>

</div>

      <p className="text-slate-400 text-sm leading-relaxed mt-5">

        Podcast generado automáticamente a partir de un resumen IA del temario.

      </p>

      <div className="mt-6 space-y-3">

  <div className="flex items-center justify-between text-xs text-slate-400">

    <span>{podcast.duracion}</span>

  </div>

</div>

      <div className="flex flex-wrap gap-3 mt-6">

        <audio
  controls
  className="w-full"
>
  <source
    src={`${import.meta.env.VITE_API_URL}${podcast.audioUrl}`}
    type="audio/mpeg"
  />
</audio>

        <button
  className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-xs font-semibold"
>

  Descargar MP3

</button>

<button

  onClick={async () => {

  const token =
    localStorage.getItem(
      "token"
    )

  await fetch(
    `${import.meta.env.VITE_API_URL}/api/Temarios/podcasts/${podcast.id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

  setPodcasts(
    podcasts.filter(
      p => p.id !== podcast.id
    )
  )

}}

  className="h-11 px-4 rounded-xl bg-slate-950 border border-red-500/20 hover:bg-red-500/10 transition text-xs font-semibold text-red-400"
>

  Eliminar

</button>

      </div>

    </div>

  ))}

</div>

</div>

      </div>

    </DashboardLayout>

  )

}

export default TemasPage
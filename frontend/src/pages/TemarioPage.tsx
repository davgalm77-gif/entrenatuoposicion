import {
  useEffect,
  useState,
  useRef
} from "react"
import DashboardLayout from "../layouts/DashboardLayout"

import {
  Upload,
  Scissors,
  Combine,
  FileText,
  Brain,
  Trash2,
  Pencil,
  Lock,
} from "lucide-react"

function ToolCard({
  titulo,
  descripcion,
  icono,
  color,
  disabled = false,
  onClick,
}: {
  titulo: string
  descripcion: string
  icono: React.ReactNode
  color: string
  disabled?: boolean
  onClick?: () => void
}) {

  return (

    <button
  onClick={onClick}
  disabled={disabled}
  className={`rounded-2xl p-6 text-left transition border ${
        disabled
          ? "bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed"
          : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:-translate-y-1"
      }`}
    >

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color}`}>

        {icono}

      </div>

      <h2 className="text-2xl font-bold mb-3">
        {titulo}
      </h2>

      <p className="text-slate-400 text-base leading-relaxed">
        {descripcion}
      </p>

    </button>

  )

}

function TemarioCard({
  abrirModalRenombrar,
  id,
  nombre,
  procesadoPDF,
  procesadoIA,
  paginas,
  temasDetectados,
}: {
  abrirModalRenombrar: (
  id: number,
  nombre: string
) => void
  id: number
  nombre: string
  procesadoPDF: boolean
  procesadoIA: boolean
  paginas: number
  temasDetectados: number
}) {

  const [procesandoIA, setProcesandoIA] =
  useState(false)

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* IZQUIERDA */}
        <div className="flex items-start gap-4">

          <button

  onClick={() => {

    window.location.href =
      `/temarios/ver/${id}`

  }}

  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition hover:scale-105 ${
    procesadoIA
      ? "bg-violet-500/20 hover:bg-violet-500/30"
      : "bg-slate-800 hover:bg-slate-700"
  }`}
>

  <FileText
    size={26}
    className={
      procesadoIA
        ? "text-violet-400"
        : "text-slate-400"
    }
  />

</button>

          <div>

            <h2 className="text-xl font-bold">
              {nombre}
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-3">

              {!procesadoPDF && !procesadoIA && (

  <>
    <div className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-semibold">

      PDF subido

    </div>

    <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

      {paginas} páginas

    </div>
  </>

)}

{procesadoPDF && !procesadoIA && (

  <>
    <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

      PDF preparado

    </div>

    <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-semibold">

      {paginas} páginas

    </div>
  </>

)}

              {procesadoIA && (

                <>
                  <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-semibold">

                    Procesado IA

                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold">

                   {paginas} páginas

                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">

                    {temasDetectados} temas detectados

                  </div>
                </>

              )}

            </div>

          </div>

        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap gap-3">

          {procesadoPDF && !procesadoIA && (

            <button

  onClick={async () => {

  try {
    
    setProcesandoIA(true)

    const token =
      localStorage.getItem(
        "token"
      )

    const response =
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/Temarios/${id}/procesar-ia`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

    if (!response.ok) {

  const errorText =
    await response.text()

  console.log(errorText)

  alert("Error procesando IA")

  return
}

const data =
  await response.json()

alert(
`Procesamiento IA completado

Prompt tokens: ${data.promptTokens}

Completion tokens: ${data.completionTokens}

Total tokens: ${data.totalTokens}`
)

window.location.reload()
    

    window.location.reload()

  }
  catch(error) {

  setProcesandoIA(false)

  console.log(error)

  alert("Error procesando IA")

}

}}

  className="h-11 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-xs font-bold flex items-center gap-2"
>

  <Brain size={16} />

  {procesandoIA
  ? "Procesando IA..."
  : "Procesar IA"}

</button>

          )}

          {procesadoIA   ? (

            <button

  onClick={() => {

    window.location.href =
      `/temarios/${id}/temas`

  }}

  className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-xs font-semibold"
>

  Ver temas

</button>

          ) : (

            <button
              disabled
              className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed flex items-center gap-2 text-xs font-semibold"
            >

              <Lock size={14} />

              Ver temas

            </button>

          )}

          <button

  onClick={() => {

   abrirModalRenombrar(
  id,
  nombre
)

  }}

  className="h-11 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition text-xs font-semibold flex items-center gap-2"
>

  <Pencil size={14} />

  Renombrar

</button>

          <button

  onClick={async () => {

    const token =
      localStorage.getItem(
        "token"
      )

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Temarios/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    window.location.reload()

  }}

  className="h-11 px-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition text-xs font-semibold text-red-400 flex items-center gap-2"
>

  <Trash2 size={14} />

  Eliminar

</button>

        </div>

      </div>

    </div>

  )

}

function TemariosPage() {

  const [mostrarModalPrepararPDF,
setMostrarModalPrepararPDF]
= useState(false)

const [
  mostrarModalUnirPDFs,
  setMostrarModalUnirPDFs
] = useState(false)

  const [temarios, setTemarios]
  = useState<any[]>([])

  const hayTemariosSinProcesar =
  temarios.some(
    t => !t.procesadoIA
  )

  const [
  nombreNuevoTemario,
  setNombreNuevoTemario
] = useState("")

  const [
  temariosSeleccionados,
  setTemariosSeleccionados
] = useState<number[]>([])

  const cantidadTemariosSinProcesar =
  temarios.filter(
    t => !t.procesadoPDF
  ).length

const puedeUnirPDFs =
  cantidadTemariosSinProcesar >= 2

  const [
  mostrarModalRenombrar,
  setMostrarModalRenombrar
] = useState(false)

const [
  temarioRenombrando,
  setTemarioRenombrando
] = useState<any | null>(null)

const [
  nuevoNombre,
  setNuevoNombre
] = useState("")

  const fileInputRef =
  useRef<HTMLInputElement>(null)
const subirPDF =
  async (
    event:
      React.ChangeEvent<HTMLInputElement>
  ) => {

    const archivo =
      event.target.files?.[0]

    if (!archivo) {
      return
    }

    const token =
      localStorage.getItem(
        "token"
      )

    const formData =
      new FormData()

    formData.append(
      "archivo",
      archivo
    )

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Temarios/upload`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`
        },

        body: formData
      }
    )

    window.location.reload()
}

  useEffect(() => {

  const fetchTemarios =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        )

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/Temarios`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      const data =
  await response.json()

console.log(data)

setTemarios(data)
    }

  fetchTemarios()

}, [])

const abrirModalRenombrar =
(
  id: number,
  nombre: string
) => {

  setTemarioRenombrando({
    id,
    nombre
  })

  setNuevoNombre(
    nombre
  )

  setMostrarModalRenombrar(
    true
  )

}

return (

    <>
<input
  type="file"
  accept=".pdf"

  ref={fileInputRef}

  onChange={subirPDF}

  className="hidden"
/>



    <DashboardLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-3xl font-bold">
            Temarios
          </h1>

          <p className="text-slate-400 text-base mt-3 leading-relaxed max-w-4xl">

            Sube PDFs, prepara tus temarios y procésalos con inteligencia artificial
            para detectar automáticamente temas y generar contenido.

          </p>

        </div>

        {/* HERRAMIENTAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* SUBIR */}
          <ToolCard
          onClick={() =>
          fileInputRef.current?.click()
}
            titulo="Subir PDF"
            descripcion="Añade nuevos PDFs a tu biblioteca de temarios."
            color="bg-cyan-500/20"
            icono={
              <Upload
                size={28}
                className="text-cyan-400"
              />
            }
          />

          {/* DIVIDIR */}
          <ToolCard
  disabled={!hayTemariosSinProcesar}

  onClick={() =>
    setMostrarModalPrepararPDF(true)
  }

  titulo="Preparar PDF"

  descripcion="Limpia, divide, extrae y prepara un PDF antes del procesamiento IA."

  color="bg-violet-500/20"

  icono={
    <FileText
      size={28}
      className="text-violet-400"
    />
  }
/>

          {/* UNIR */}
          <ToolCard
            disabled={!puedeUnirPDFs}

          onClick={() =>
          setMostrarModalUnirPDFs(true)
  }

            titulo="Unir PDFs"
            descripcion="Combina varios PDFs en un único temario preparado."
            color="bg-orange-500/20"
            icono={
              <Combine
                size={28}
                className="text-orange-400"
              />
            }
          />

        </div>

        {/* BIBLIOTECA */}
        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-violet-300">
              Biblioteca
            </h2>

            <div className="text-slate-400 text-sm">
              {temarios.length} temarios
            </div>

          </div>

          {temarios.length === 0 ? (

  <div className="col-span-full">

    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">

      <div className="w-20 h-20 rounded-3xl bg-violet-500/10 flex items-center justify-center mx-auto mb-6">

        <FileText
          size={40}
          className="text-violet-400"
        />

      </div>

      <h2 className="text-2xl font-bold mb-3">

        Tu biblioteca está vacía

      </h2>

      <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">

        Sube tu primer temario en PDF para empezar a prepararlo, procesarlo con IA y generar resúmenes y podcasts automáticamente.

      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">

          <div className="font-bold text-cyan-300">

            1. Subir PDF

          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">

            Añade uno o varios temarios a tu biblioteca.

          </p>

        </div>

        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">

          <div className="font-bold text-violet-300">

            2. Preparar o unirPDFs

          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">

            Limpia, divide o reorganiza páginas antes de la IA.

          </p>

        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">

          <div className="font-bold text-emerald-300">

            3. Procesar IA

          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">

            La IA detecta automáticamente temas y contenido.

          </p>

        </div>

        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">

          <div className="font-bold text-orange-300">

            4. Ver temas

          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">

            Accede a los temas para generar resúmenes y podcasts.

          </p>

        </div>

      </div>

    </div>

  </div>

) : (

  temarios
  .filter(t => !t.procesadoIA)
  .map((temario) => (

  <TemarioCard

  abrirModalRenombrar={
  abrirModalRenombrar
}

  id={temario.id}
  key={temario.id}

  nombre={temario.nombre}

  procesadoPDF={
    temario.procesadoPDF
  }

  procesadoIA={
    temario.procesadoIA
  }

  paginas={
    temario.paginas
  }

  temasDetectados={
    temario.temasDetectados
  }
/>

))
)}

{temarios.some(t => !t.procesadoIA) &&
 temarios.some(t => t.procesadoIA) && (

 <div className="relative my-10">

  <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

  <div className="absolute inset-0 flex items-center justify-center">

    <div className="px-4 bg-[#020817] text-xs font-bold uppercase tracking-[0.35em] text-violet-300">

      Procesados IA

    </div>

  </div>

</div>

  

)}

{temarios
  .filter(t => t.procesadoIA)
  .map((temario) => (

  <TemarioCard

    abrirModalRenombrar={
      abrirModalRenombrar
    }

    id={temario.id}
    key={temario.id}

    nombre={temario.nombre}

    procesadoPDF={
      temario.procesadoPDF
    }

    procesadoIA={
      temario.procesadoIA
    }

    paginas={
      temario.paginas
    }

    temasDetectados={
      temario.temasDetectados
    }

  />

))}

        </div>

      </div>

    </DashboardLayout>

    {mostrarModalPrepararPDF && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-2xl">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-violet-300">
          Preparar PDF
        </h2>

        <button
          onClick={() =>
            setMostrarModalPrepararPDF(false)
          }
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>

      </div>

      <div className="space-y-3">

        {temarios
          .filter(t => !t.procesadoPDF)
          .map((temario) => (

          <button
            key={temario.id}

            onClick={() => {

  setMostrarModalPrepararPDF(false)

window.location.href =
  `/temarios/preparar/${temario.id}`
}}

            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-violet-500 transition text-left"
          >

            <div className="font-semibold text-slate-200">
              {temario.nombre}
            </div>

            <div className="text-sm text-slate-400 mt-1">
              {temario.paginas} páginas
            </div>

          </button>

        ))}

      </div>

    </div>

  </div>

)}

{mostrarModalUnirPDFs && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-2xl">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-orange-300">
          Unir PDFs
        </h2>

        <button
          onClick={() =>
            setMostrarModalUnirPDFs(false)
          }

          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>

      </div>

      <div className="mb-5 text-sm text-slate-400">

        {temariosSeleccionados.length} PDFs seleccionados

      </div>

      <div className="space-y-3">

        {temarios
          .filter(t => !t.procesadoPDF)
          .map((temario) => (

            <button
              key={temario.id}

              onClick={() => {

                if (
                  temariosSeleccionados.includes(
                    temario.id
                  )
                ) {

                  setTemariosSeleccionados(
                    temariosSeleccionados.filter(
                      t => t !== temario.id
                    )
                  )

                }
                else {

                  setTemariosSeleccionados([
                    ...temariosSeleccionados,
                    temario.id
                  ])

                }

              }}

              className={`w-full p-4 rounded-2xl border transition text-left ${
                temariosSeleccionados.includes(
                  temario.id
                )
                  ? "bg-orange-500/10 border-orange-500"
                  : "bg-slate-950 border-slate-800 hover:border-orange-500"
              }`}
            >

              <div className="font-semibold text-slate-200">

                {temario.nombre}

              </div>

              <div className="text-sm text-slate-400 mt-1">

                {temario.paginas} páginas

              </div>

            </button>

        ))}

      </div>

      {temariosSeleccionados.length >= 2 && (

        <div className="mt-6 space-y-4">

          <input
            type="text"

            value={nombreNuevoTemario}

            onChange={(e) =>
              setNombreNuevoTemario(
                e.target.value
              )
            }

            placeholder="Nombre del nuevo temario"

            className="w-full h-14 rounded-2xl bg-slate-950 border border-slate-700 px-4 text-white placeholder:text-slate-500 text-base outline-none focus:border-orange-500"
          />

          <button

            disabled={!nombreNuevoTemario.trim()}

            onClick={async () => {

              try {

                const token =
                  localStorage.getItem(
                    "token"
                  )

                await fetch(
                  `${import.meta.env.VITE_API_URL}/api/Temarios/unir`,
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",

                      Authorization:
                        `Bearer ${token}`
                    },

                    body: JSON.stringify({
                      nombre:
                        nombreNuevoTemario,

                      temariosIds:
                        temariosSeleccionados
                    })
                  }
                )

                window.location.reload()

              }
              catch(error) {

                console.log(error)

              }

            }}

            className={`w-full h-14 rounded-2xl font-bold transition ${
              nombreNuevoTemario.trim()
                ? "bg-orange-500 hover:bg-orange-400 text-black"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >

            Unir PDFs

          </button>

        </div>

      )}

    </div>

  </div>

)}

{mostrarModalRenombrar && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-violet-300">
          Renombrar temario
        </h2>

        <button
          onClick={() =>
            setMostrarModalRenombrar(false)
          }
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>

      </div>

      <input
  type="text"

  value={nuevoNombre}

  onChange={(e) =>
    setNuevoNombre(
      e.target.value
    )
  }

  placeholder="Nombre del temario"

  className="w-full h-14 rounded-2xl bg-slate-950 border border-slate-700 px-4 text-white placeholder:text-slate-500 text-base outline-none focus:border-violet-500"
/>

      <button

  type="button"

  onClick={async () => {

    try {

      if (!temarioRenombrando) {
        return
      }

      const token =
        localStorage.getItem(
          "token"
        )

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/Temarios/${temarioRenombrando.id}/renombrar`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify(
            nuevoNombre
)
          }
        )

      if (response.ok) {

        setMostrarModalRenombrar(
          false
        )

        window.location.reload()

      }

    } catch (error) {

      console.log(error)

    }

  }}

  className="w-full h-14 rounded-2xl bg-violet-500 hover:bg-violet-400 transition text-black font-bold mt-6"
>

  Guardar nombre

</button>

    </div>

  </div>

)}

    </>

  )

}

export default TemariosPage
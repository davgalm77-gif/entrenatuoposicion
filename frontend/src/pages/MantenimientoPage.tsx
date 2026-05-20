import { useState } from "react"

import {
  Card,
  CardContent,
} from "../components/ui/card"

function MantenimientoPage() {

  const [openModal, setOpenModal] =
    useState(false)

  const [email, setEmail] =
    useState("")

  const [mensaje, setMensaje] =
    useState("")

  const [enviado, setEnviado] =
    useState(false)

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="px-6 py-24">

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl font-bold leading-tight max-w-4xl mx-auto">

            Prepara tu oposición
            <span className="text-blue-400">
              {" "}con inteligencia artificial
            </span>

          </h1>

          <p className="text-slate-400 text-3xl mt-8 max-w-2xl mx-auto leading-relaxed">

            Plataforma en desarrollo

          </p>

          <div className="mt-10 max-w-2xl mx-auto">

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">

              <h2 className="text-2xl font-semibold text-white mb-4">
                Ayúdanos a construir una mejor plataforma para opositores
              </h2>

              <p className="text-slate-400 leading-relaxed">

                Estamos desarrollando nuevas herramientas de estudio para oposiciones.

                <br /><br />

                Nos gustaría conocer qué funciones, tipos de ejercicios o herramientas
                te gustaría encontrar en la plataforma.

              </p>

              <button
                onClick={() =>
                  setOpenModal(true)
                }
                className="
                  mt-6
                  bg-cyan-500
                  hover:bg-cyan-600
                  transition-all
                  rounded-2xl
                  px-6 py-3
                  font-medium
                  text-slate-950
                "
              >
                💡 Enviar idea o sugerencia
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FUNCIONES */}
      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Card className="bg-slate-900 border-slate-800 text-white rounded-3xl">

            <CardContent className="p-8">

              <h3 className="text-2xl font-semibold mb-4">
                Estudio y planificación
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Organiza tus temarios y crea planes de estudio personalizados
                con seguimiento de progreso.
              </p>

            </CardContent>

          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white rounded-3xl">

            <CardContent className="p-8">

              <h3 className="text-2xl font-semibold mb-4">
                Tests de exámen
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Generación de tests personalizados y exámenes completos.
              </p>

            </CardContent>

          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white rounded-3xl">

            <CardContent className="p-8">

              <h3 className="text-2xl font-semibold mb-4">
                Psicotécnicos
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Realiza psicotécnicos de figuras, matrices,
                lógica, verbales y numéricos.
              </p>

            </CardContent>

          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white rounded-3xl">

            <CardContent className="p-8">

              <h3 className="text-2xl font-semibold mb-4">
                Herramientas inteligentes
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Resúmenes por temas y generación
                de audios tipo podcast.
              </p>

            </CardContent>

          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white rounded-3xl">

            <CardContent className="p-8">

              <h3 className="text-2xl font-semibold mb-4">
                Procesamiento de PDFs
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Divide, limpia y organiza temarios
                antes de procesarlos automáticamente.
              </p>

            </CardContent>

          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white rounded-3xl">

            <CardContent className="p-8">

              <h3 className="text-2xl font-semibold mb-4">
                Otras pruebas
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Entrenamiento de pruebas de ofimática,
                matemáticas y conductuales.
              </p>

            </CardContent>

          </Card>

        </div>

      </section>

      {/* MODAL SUGERENCIAS */}
      {
        openModal && (

          <div className="
            fixed inset-0
            overflow-y-auto
            bg-black/70
            backdrop-blur-sm
            flex items-center justify-center
            z-50
            px-6
          ">

            <div className="
              w-full max-w-2xl
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-8
            ">

              <div className="
                flex items-center justify-between
                mb-6
              ">

                <h2 className="text-2xl font-semibold">
                  Enviar sugerencia
                </h2>

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="
                    text-slate-400
                    hover:text-white
                  "
                >
                  ✕
                </button>

              </div>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                type="email"
                placeholder="Tu correo electrónico"
                className="
                  w-full
                  bg-slate-800
                  border border-slate-700
                  rounded-2xl
                  px-4 py-3
                  mb-4
                  outline-none
                "
              />

              <textarea
                value={mensaje}
                onChange={(e) =>
                  setMensaje(e.target.value)
                }
                placeholder="Escribe tu sugerencia..."
                rows={6}
                className="
                  w-full
                  bg-slate-800
                  border border-slate-700
                  rounded-2xl
                  px-4 py-3
                  outline-none
                  resize-none
                "
              />

              <button
                onClick={async () => {

                  if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email)
) {

  alert(
    "Introduce un correo válido"
  )

  return
}

                  await fetch(
                    `${import.meta.env.VITE_API_URL}/api/Sugerencias`,
                    {
                      method: "POST",

                      headers: {
                        "Content-Type": "application/json"
                      },

                      body: JSON.stringify({
                        email,
                        mensaje
                      })
                    }
                  )

                  setOpenModal(false)

                  setEnviado(true)

                  setEmail("")

                  setMensaje("")

                }}

                disabled={
                  !email.trim() ||
                  !mensaje.trim()
                }

                className="
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  mt-6
                  w-full
                  bg-cyan-500
                  enabled:hover:bg-cyan-600
                  transition-all
                  rounded-2xl
                  px-6 py-3
                  font-medium
                  text-slate-950
                "
              >
                Enviar TEST
              </button>

            </div>

          </div>

        )
      }

      {/* MODAL ENVIADO */}
      {
        enviado && (

          <div className="
            fixed inset-0
            bg-black/70
            backdrop-blur-sm
            flex items-center justify-center
            z-50
            px-6
          ">

            <div className="
              w-full max-w-md
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-8
              text-center
            ">

              <div className="
                w-20 h-20
                rounded-full
                bg-cyan-500/20
                flex items-center justify-center
                mx-auto mb-6
              ">

                <span className="text-4xl">
                  ✉️
                </span>

              </div>

              <h2 className="
                text-2xl
                font-semibold
                mb-4
              ">
                Sugerencia enviada
              </h2>

              <p className="
                text-slate-400
                leading-relaxed
                mb-8
              ">

                Muchas gracias por ayudar
                a mejorar la plataforma.

              </p>

              <button
                onClick={() =>
                  setEnviado(false)
                }
                className="
                  w-full
                  bg-cyan-500
                  enabled:hover:bg-cyan-600
                  transition-all
                  rounded-2xl
                  px-6 py-3
                  font-medium
                  text-slate-950
                "
              >
                Aceptar
              </button>

            </div>

          </div>

        )
      }

    </div>

  )

}

export default MantenimientoPage
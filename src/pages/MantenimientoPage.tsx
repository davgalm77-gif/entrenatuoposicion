import {
  Card,
  CardContent,
} from "../components/ui/card"

function MantenimientoPage() {

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

        </div>

      </section>

      {/* FUNCIONES */}
      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD 1 */}
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

          {/* CARD 2 */}
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

          {/* CARD 3 */}
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

          {/* CARD 4 */}
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

          {/* CARD 5 */}
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

          {/* CARD 6 */}
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

    </div>

  )

}

export default MantenimientoPage
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
} from "../components/ui/card"

function App() {
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

          <p className="text-slate-400 text-xl mt-8 max-w-2xl mx-auto leading-relaxed">

            Genera tests, psicotécnicos, resúmenes y podcasts desde tus propios temarios.

            Crea tu cuenta y obtén 5 créditos gratis para empezar a entrenar hoy mismo.

            Prepara tu oposición de forma más inteligente y lleva tu rendimiento al máximo nivel.

          </p>

          <div className="mt-10 flex items-center justify-center gap-5">

  {/* CREAR CUENTA */}
  <Link to="/register">

    <Button
      size="lg"
      className="text-lg px-8 py-7 rounded-2xl"
    >
      Crear cuenta gratis
    </Button>

  </Link>

  {/* LOGIN */}
  <Link to="/login">

    <button className="h-14 px-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition text-white text-lg font-semibold">

      Iniciar sesión

    </button>

  </Link>

</div>

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
          lógica, verbales y numéricos, con explicación al finalizar el test.
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
          Resúmenes por temas y generaciónde audios tipo podcasts.
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
          Entrenamiento de pruebas de ofimática, matemáticas y conductuales.
        </p>

      </CardContent>

    </Card>

  </div>

</section>

    </div>
  )
}

export default App
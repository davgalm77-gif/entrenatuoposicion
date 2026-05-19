import {
  ReactNode,
  useEffect,
  useState
} from "react"
import {
  Link,
  useNavigate
} from "react-router-dom"


import {
  FileText,
  Brain,
  PenSquare,
  Settings,
  Target,
  MessageCircle,
  Monitor,
  Check,
  Calculator,
  RotateCcw,
  LogOut,
  Zap,
  UserCircle2,
  Trophy,
  CalendarDays
} from "lucide-react"

type Props = {
  children: ReactNode
}

function DashboardLayout({ children }: Props) {

  const navigate = useNavigate()

  const [usuario, setUsuario]
  = useState<any>(null)

  const [
  mostrarModalOposicion,

  setMostrarModalOposicion

] = useState(false)

const [
  nuevaOposicion,

  setNuevaOposicion

] = useState("")

  const handleLogout = () => {

  localStorage.removeItem(
    "token"
  )

  navigate("/login")
}

const handleCrearOposicion =
  async () => {

    if (!nuevaOposicion.trim()) {
      return
    }

    const token =
      localStorage.getItem("token")

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Auth/oposiciones`,
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
            nuevaOposicion
        })
      }
    )

    setMostrarModalOposicion(
      false
    )

    setNuevaOposicion("")

    window.location.reload()
}

  useEffect(() => {

    const token =
  localStorage.getItem("token")

if (!token) {

  navigate("/login")

  return
}

  const fetchUsuario = async () => {

    const token =
      localStorage.getItem("token")

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Auth/me`,
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

    setUsuario(data)

    
  }

  fetchUsuario()

}, [])


  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <header className="h-28 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-10">

        {/* LOGO */}
<div>

  <div className="flex items-center gap-3">

    <h1 className="text-5xl font-black italic tracking-tight">

      <span className="text-white">
        Entrena
      </span>

      <span className="text-cyan-400">
        Tu
      </span>

      <span className="text-white">
        Oposición
      </span>

    </h1>

    <Check
      size={58}
      strokeWidth={4}
      className="text-cyan-400"
    />

  </div>

  <div className="h-1 w-full mt-2 rounded-full bg-cyan-500"></div>
  

</div>

        {/* DERECHA */}
        <div className="flex items-center gap-5">

          <Link
  to="/creditos"
  className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-3 hover:bg-slate-800 transition"
>

  <Zap className="text-yellow-400" size={24} />

  <span className="text-2xl font-semibold">
    {usuario?.creditos} créditos
  </span>

</Link>

          {/* PERFIL */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-3">

            {usuario?.fotoPerfil ? (

  <img
    src={usuario.fotoPerfil}
    alt="Perfil"

    className="w-12 h-12 rounded-full object-cover"
  />

) : (

  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">

    <UserCircle2
      size={28}
      className="text-slate-300"
    />

  </div>

)}

            <span className="text-2xl">
              {usuario?.username}
            </span>

          </div>

        </div>

      </header>

      <div>

  <Link
    to="/dashboard"
    className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
  >

    <Trophy size={24} />

    Dashboard

  </Link>

</div>

      {/* CONTENIDO */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-80 border-r border-slate-800 bg-slate-950 p-8 overflow-auto">

            {/* OPOSICION ACTIVA */}
<div className="mb-10 bg-slate-900 border border-slate-800 rounded-3xl p-5">

  <p className="text-slate-500 text-sm uppercase tracking-widest mb-3">
    Oposición activa
  </p>

  <h2 className="text-xl font-bold text-white">
    
    {usuario?.oposicionActiva?.nombre}
  </h2>

</div>


          <div className="flex flex-col gap-10">

            {/* CONTENIDO */}
            <div>

              <p className="text-slate-500 text-sm uppercase tracking-widest mb-5">
                Contenido
              </p>

              <div className="flex flex-col gap-2">

                <Link
  to="/temarios"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <FileText size={20} />

  Temarios

</Link>

  <Link
  to="/plan-estudio"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <Brain size={20} />

  Plan de estudios

</Link>

<Link
  to="/configurar-plan"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <CalendarDays size={20} />

  Configurar plan

</Link>
                

              </div>

            </div>

            {/* TESTS */}
            <div>

              <p className="text-slate-500 text-sm uppercase tracking-widest mb-5">
                Tests
              </p>

              <div className="flex flex-col gap-2">

                <button
  disabled
  className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-900/40 text-slate-500 cursor-not-allowed text-xl"
>

  <PenSquare size={20} />

  Realizar Tests

</button>

                <Link
  to="/configuracion-pruebas"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <Settings size={20} />

  Configurar tests

</Link>

              </div>

            </div>

            {/* PRACTICA */}
            <div>

              <p className="text-slate-500 text-sm uppercase tracking-widest mb-5">
                Práctica
              </p>

              <div className="flex flex-col gap-2">

                <Link
  to="/pruebas-psicotecnicas"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <Target size={20} />

  Psicotécnicos

</Link>

                <Link
  to="/conductuales"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <MessageCircle size={20} />

  Conductuales

</Link>

                <Link
  to="/ofimatica"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <Monitor size={20} />

  Ofimática

</Link>

                <Link
  to="/matematicas"
  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <Calculator size={20} />

  Matemáticas

</Link>
              </div>

            </div>

          </div>

          {/* OPOSICIONES */}
<div className="mt-10">

  <p className="text-slate-500 text-sm uppercase tracking-widest mb-5">
    Oposiciones
  </p>

  <div className="flex flex-col gap-2">

    <button

  onClick={() =>
    navigate(
      "/seleccionar-oposicion"
    )
  }

  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>

  <RotateCcw size={20} />

  Cambiar oposición

</button>

    <button

    onClick={() =>
    setMostrarModalOposicion(true)
  }
      className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
    >

      <Check size={20} />

      Nueva oposición

    </button>

  </div>

</div>

          {/* INFERIOR */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col gap-3">


            <button

  onClick={handleLogout}

  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl"
>
              <LogOut size={20} />
              Salir
            </button>

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-auto p-10 bg-[radial-gradient(circle_at_top,#0f172a,black_60%)]">

          {children}

        </main>

      </div>
{mostrarModalOposicion && (

  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <h2 className="text-3xl font-black text-white">
        Nueva oposición
      </h2>

      <p className="text-slate-400 mt-3 leading-relaxed">
        Crea una nueva oposición para empezar a organizar
        tus temarios, tests y progreso.
      </p>

      <input
        value={nuevaOposicion}

        onChange={(e) =>
          setNuevaOposicion(
            e.target.value
          )
        }

        placeholder="Nombre de la oposición"

        className="w-full h-12 mt-8 px-5 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none"
      />

      <div className="flex gap-3 mt-8">

        <button

          onClick={() => {

            setMostrarModalOposicion(
              false
            )

            setNuevaOposicion("")
          }}

          className="flex-1 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 transition font-semibold"
        >

          Cancelar

        </button>

        <button
        onClick={handleCrearOposicion}
          className="flex-1 h-12 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold"
        >

          Crear

        </button>

      </div>

    </div>

  </div>

)}
    </div>
  )
}

export default DashboardLayout
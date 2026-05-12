import { ReactNode } from "react"
import { Link } from "react-router-dom"


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
    5 créditos
  </span>

</Link>

          {/* PERFIL */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-3">

            <UserCircle2 size={36} />

            <span className="text-2xl">
              David
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
    
    Técnico de Procesos
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

          {/* INFERIOR */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col gap-3">

            <button className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl">
              <RotateCcw size={20} />
              Cambiar oposición
            </button>

            <button className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-900 transition text-xl">
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

    </div>
  )
}

export default DashboardLayout
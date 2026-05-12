import {
  User,
  Mail,
  Lock,
} from "lucide-react"

import {
  FcGoogle,
} from "react-icons/fc"

import {
  FaFacebook,
} from "react-icons/fa"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

function RegisterPage() {

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8">

        {/* TITULO */}
        <div className="text-center">

          <h1 className="text-4xl font-black text-white">
            Crear cuenta
          </h1>

          <p className="text-slate-400 text-base mt-4 leading-relaxed">
            Obtén 5 créditos gratis al registrarte.
          </p>

        </div>

        {/* LOGIN SOCIAL */}
        <div className="mt-8 space-y-3">

          {/* GOOGLE */}
          <button className="w-full h-12 rounded-2xl bg-white hover:bg-slate-200 transition flex items-center justify-center gap-3 text-black text-base font-semibold">

            <FcGoogle size={22} />

            Continuar con Google

          </button>

          {/* FACEBOOK */}
          <button className="w-full h-12 rounded-2xl bg-[#1877F2] hover:opacity-90 transition flex items-center justify-center gap-3 text-white text-base font-semibold">

            <FaFacebook size={20} />

            Continuar con Facebook

          </button>

        </div>

        {/* SEPARADOR */}
        <div className="relative my-8">

          <div className="border-t border-slate-800"></div>

          <div className="absolute inset-0 flex justify-center">

            <span className="bg-slate-900 px-4 text-slate-500 text-[11px] uppercase tracking-widest">

              o continuar con email

            </span>

          </div>

        </div>

        {/* FORMULARIO */}
        <div className="space-y-4">

          {/* USUARIO */}
          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <Input
              placeholder="Nombre de usuario"
              className="h-12 pl-12 bg-slate-950 border-slate-700 text-white rounded-2xl text-base"
            />

          </div>

          {/* EMAIL */}
          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <Input
              placeholder="Correo electrónico"
              className="h-12 pl-12 bg-slate-950 border-slate-700 text-white rounded-2xl text-base"
            />

          </div>

          {/* PASSWORD */}
          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <Input
              type="password"
              placeholder="Contraseña"
              className="h-12 pl-12 bg-slate-950 border-slate-700 text-white rounded-2xl text-base"
            />

          </div>

          {/* CONFIRMAR */}
          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <Input
              type="password"
              placeholder="Confirmar contraseña"
              className="h-12 pl-12 bg-slate-950 border-slate-700 text-white rounded-2xl text-base"
            />

          </div>

        </div>

        {/* OPOSICION */}
        <div className="mt-8">

          <p className="text-slate-500 text-[11px] uppercase tracking-widest mb-4">
            Primera oposición
          </p>

          <Input
            placeholder="Nombre de tu oposición"
            className="h-12 bg-slate-950 border-slate-700 text-white rounded-2xl text-base"
          />

        </div>

        {/* BOTON */}
        <Button className="w-full h-12 mt-8 rounded-2xl text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-black">

          Crear cuenta

        </Button>

      </div>

    </div>

  )

}

export default RegisterPage
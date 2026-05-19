import {
  GoogleLogin
} from "@react-oauth/google"
import {
  Link,
  useNavigate
} from "react-router-dom"
import {
  useState,
  useRef,
  useEffect
} from "react"

import {
  Mail,
  Lock,
} from "lucide-react"

import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

function LoginPage() {

const [email, setEmail] = useState("")

const [password, setPassword] = useState("")

const [error, setError] =
  useState("")

const navigate = useNavigate()

useEffect(() => {

  const token =
    localStorage.getItem("token")

  if (token) {

    navigate("/dashboard")
  }

}, [])

const googleButtonRef =
  useRef<HTMLDivElement>(null)

const handleLogin = async () => {

  setError("")

if (!email.trim() || !password.trim()) {

  setError(
    "Introduce tu correo y contraseña o continúa con Google."
  )

  return
}

  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    )

    if (!response.ok) {

  setError(
    "Correo o contraseña incorrectos."
  )

  return
}

    const data = await response.json()

    localStorage.setItem(
  "token",
  data.token
)

const meResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/Auth/me`,
  {
    headers: {
      Authorization:
        `Bearer ${data.token}`
    }
  }
)

const meData =
  await meResponse.json()

if (
  meData.oposiciones.length === 0
) {

  navigate("/seleccionar-oposicion")

} else if (
  meData.oposiciones.length === 1
) {

  navigate("/dashboard")

} else {

  navigate("/seleccionar-oposicion")
}

console.log(data)
  } catch (error) {

    console.log(error)

  }

}

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8">

        {/* TITULO */}
        <div className="text-center">

          <h1 className="text-4xl font-black text-white">
            Bienvenido de nuevo
          </h1>

          <p className="text-slate-400 text-base mt-4 leading-relaxed">
            Inicia sesión y continúa preparando tu oposición.
          </p>

        </div>

        {/* LOGIN SOCIAL */}
        <div className="mt-8 space-y-3">

          {/* GOOGLE */}
          <div className="relative">

  {/* BOTÓN BONITO */}
  <button

    onClick={() => {

      const googleButton =
        googleButtonRef.current
          ?.querySelector(
            "div[role=button]"
          ) as HTMLElement

      googleButton?.click()
    }}

    className="w-full h-12 rounded-2xl bg-white hover:bg-slate-200 transition flex items-center justify-center gap-3 text-black text-base font-semibold"
  >

    <FcGoogle size={22} />

    Continuar con Google

  </button>

  {/* GOOGLE REAL OCULTO */}
  <div
    ref={googleButtonRef}

    className="absolute inset-0 opacity-0 pointer-events-none"
  >

    <GoogleLogin
      onSuccess={async (
        credentialResponse
      ) => {

        try {

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/Auth/google-login`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                credential:
                  credentialResponse.credential
              })
            }
          )

          const data =
            await response.json()

          localStorage.setItem(
  "token",
  data.token
)

const meResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/Auth/me`,
  {
    headers: {
      Authorization:
        `Bearer ${data.token}`
    }
  }
)

const meData =
  await meResponse.json()

if (
  meData.oposiciones.length === 0
) {

  navigate("/seleccionar-oposicion")

} else if (
  meData.oposiciones.length === 1
) {

  navigate("/dashboard")

} else {

  navigate("/seleccionar-oposicion")
}

        } catch (error) {

          console.log(error)

        }

      }}

      onError={() => {

        console.log(
          "Google login error"
        )

      }}
    />

  </div>

</div>

          {/* FACEBOOK */}
          <button className="w-full h-12 rounded-2xl bg-[#1877F2] hover:opacity-90 transition flex items-center justify-center gap-3 text-white text-base font-semibold">

            <FaFacebookF size={20} />

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

          {/* EMAIL */}
          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <Input
  value={email}

  onChange={(e) =>
    setEmail(e.target.value)
  }

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
  value={password}

  onChange={(e) =>
    setPassword(e.target.value)
  }

  type="password"

  placeholder="Contraseña"

  className="h-12 pl-12 bg-slate-950 border-slate-700 text-white rounded-2xl text-base"
/>

          </div>

        </div>

        {/* OLVIDE PASSWORD */}
        <div className="mt-5 text-right">

          <button className="text-slate-400 hover:text-white transition text-sm">

            ¿Has olvidado tu contraseña?

          </button>

        </div>

        {error && (

  <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl px-4 py-3 text-sm font-medium">

    {error}

  </div>

)}

        <Button
  onClick={handleLogin}

  className="w-full h-12 mt-7 rounded-2xl text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-black"
>

  Iniciar sesión

</Button>

        {/* REGISTER */}
        <div className="mt-7 text-center text-sm text-slate-500">

          ¿No tienes cuenta?

          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300 ml-2 font-semibold"
          >
            Crear cuenta
          </Link>

        </div>

      </div>

    </div>

  )

}

export default LoginPage
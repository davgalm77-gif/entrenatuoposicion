import {
  User,
  Mail,
  Lock,
} from "lucide-react"


import {
  useState,
  useEffect
} from "react"

import {
  useNavigate
} from "react-router-dom"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

function RegisterPage() {

  const navigate = useNavigate()

  useEffect(() => {

  const token =
    localStorage.getItem("token")

  if (token) {

    navigate("/dashboard")
  }

}, [])

  const [username, setUsername]
  = useState("")

const [email, setEmail] = useState("")

const [password, setPassword] = useState("")

const handleRegister = async () => {

  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
  username,
  email,
  password
})
      }
    )

    if (!response.ok) {

      alert("Error al registrarse")

      return
    }

    const loginResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
  username,
  email,
  password
})
      }
    )

    const loginData =
      await loginResponse.json()

    localStorage.setItem(
      "token",
      loginData.token
    )

    navigate("/seleccionar-oposicion")

  } catch (error) {

    console.log(error)

  }

}

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

        <div className="mt-6"></div>

        {/* FORMULARIO */}
        <div className="space-y-5">

          {/* USUARIO */}
          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <Input
  value={username}

  onChange={(e) =>
    setUsername(e.target.value)
  }

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

        {/* BOTON */}
        <Button
  onClick={handleRegister}

  className="w-full h-12 mt-8 rounded-2xl text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-black"
>

  Crear cuenta

</Button>

      </div>

    </div>

  )

}

export default RegisterPage
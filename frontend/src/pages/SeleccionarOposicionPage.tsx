import {
  useEffect,
  useState
} from "react"

import {
  useNavigate
} from "react-router-dom"

function SeleccionarOposicionPage() {

  const navigate = useNavigate()

  const [usuario, setUsuario]
    = useState<any>(null)

    const [
  nuevaOposicion,

  setNuevaOposicion

] = useState("")

  useEffect(() => {

    const fetchUsuario =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
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

        setUsuario(data)
        if (
  data.oposiciones.length === 1
) {

  navigate("/dashboard")
}
      }

    fetchUsuario()

  }, [])

  const handleCrearOposicion =
  async () => {

    if (!nuevaOposicion.trim()) {
      return
    }

    const token =
      localStorage.getItem(
        "token"
      )

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

    const meResponse =
  await fetch(
    `${import.meta.env.VITE_API_URL}/api/Auth/me`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

await meResponse.json()

    navigate("/dashboard")
}

const handleSeleccionarOposicion =
  async (id: number) => {

    const token =
      localStorage.getItem(
        "token"
      )

      console.log(id)

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/Auth/seleccionar-oposicion/${id}`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    const meResponse =
  await fetch(
    `${import.meta.env.VITE_API_URL}/api/Auth/me`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

await meResponse.json()

    navigate("/dashboard")
}

  return (

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

      {usuario?.oposiciones?.length === 0 && (

  <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <h1 className="text-4xl font-black text-white">
      Bienvenido
    </h1>

    <p className="text-slate-400 mt-4 leading-relaxed">
      Antes de empezar, crea tu primera oposición.
    </p>

    <input
  value={nuevaOposicion}

  onChange={(e) =>
    setNuevaOposicion(
      e.target.value
    )
  }

  placeholder="Nombre de tu oposición"

  className="w-full h-12 mt-8 px-5 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none"
/>

<button

  onClick={handleCrearOposicion}

  className="w-full h-12 mt-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold"
>

  Continuar

</button>

  </div>

)}

{usuario?.oposiciones?.length > 1 && (

  <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8">

    <h1 className="text-4xl font-black text-white">
      Selecciona oposición
    </h1>

    <p className="text-slate-400 mt-4 leading-relaxed">
      Elige la oposición con la que quieres continuar.
    </p>

    <div className="mt-8 flex flex-col gap-3">

      {usuario.oposiciones.map(
        (oposicion: any) => (

          <button
            key={oposicion.id}

            onClick={() =>
  handleSeleccionarOposicion(
    oposicion.id
  )
}

            className="w-full h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 transition text-left px-5 font-semibold"
          >

            {oposicion.nombre}

          </button>

        )
      )}

    </div>

  </div>

)}

    </div>

  )
}

export default
SeleccionarOposicionPage
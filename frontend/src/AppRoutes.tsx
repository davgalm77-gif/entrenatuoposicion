import {
  Routes,
  Route,
} from "react-router-dom"

import {
  useEffect,
  useState
} from "react"

import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import TestsConfigPage from "./pages/TestsConfigPage"
import ConfigurarPlanPage from "./pages/ConfigurarPlanPage"
import PsicotecnicosPage from "./pages/PsicotecnicosPage"
import ConductualesPage from "./pages/ConductualesPage"
import OfimaticaPage from "./pages/OfimaticaPage"
import MatematicasPage from "./pages/MatematicasPage"
import CreditosPage from "./pages/CreditosPage"
import TemarioPage from "./pages/TemarioPage"
import PlanEstudioPage from "./pages/PlanEstudioPage"
import VerbalTestPage from "./pages/Psicotecnicos/VerbalTestPage"
import NumericoTestPage from "./pages/Psicotecnicos/NumericoTestPage"
import FigurasTestPage from "./pages/Psicotecnicos/FigurasTestPage"
import RetentivaTestPage from "./pages/Psicotecnicos/RetentivaTestPage"
import AccessTestPage from "./pages/Ofimatica/AccessTestPage"
import CorreoTestPage from "./pages/Ofimatica/CorreoTestPage"
import ExcellTestPage from "./pages/Ofimatica/ExcellTestPage"
import InternetTestPage from "./pages/Ofimatica/InternetTestPage"
import PowerpointTestPage from "./pages/Ofimatica/PowerpointTestPage"
import WindowsTestPage from "./pages/Ofimatica/WindowsTestPage"
import WordTestPage from "./pages/Ofimatica/WordTestPage"
import SeleccionarOposicionPage from "./pages/SeleccionarOposicionPage"
import PrepararPDFPage from "./pages/PrepararPDFPage"
import VisorTemarioPage from "./pages/VisorTemarioPage"
import TemasPage from "./pages/TemasPage"
import ResumenPage from "./pages/ResumenPage"
import MantenimientoPage from "./pages/MantenimientoPage"

function App() {

  const esLocalhost =
  window.location.hostname === "localhost"

const apiUrl =
  import.meta.env.VITE_API_URL
  

  const [isLogged, setIsLogged] =
    useState(esLocalhost)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    if (esLocalhost) {

      setLoading(false)

      return
    }

    const comprobarUsuario =
      async () => {

        const token =
          localStorage.getItem("token")

        if (!token) {

          setLoading(false)

          return
        }

        try {

          const response =
            await fetch(
              `${apiUrl}/api/auth/me`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          if (!response.ok) {

            localStorage.removeItem(
              "token"
            )

            setIsLogged(false)

            setLoading(false)

            return
          }

          setIsLogged(true)

        } catch {

          localStorage.removeItem(
            "token"
          )

          setIsLogged(false)
        }

        setLoading(false)
      }

    comprobarUsuario()

  }, [])

  if (loading && !esLocalhost) {
    return <MantenimientoPage />
  }

  return (

    <Routes>

      {/* PUBLICA */}

      <Route
        path="/"
        element={<MantenimientoPage />}
      />


      <Route
  path="/login"
  element={
    esLocalhost
      ? <LoginPage />
      : <MantenimientoPage />
  }
/>

      <Route
  path="/register"
  element={
    esLocalhost
      ? <RegisterPage />
      : <MantenimientoPage />
  }
/>

      {/* PRIVADAS */}

      <Route
        path="/dashboard"
        element={
          isLogged
            ? <DashboardPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/configuracion-pruebas"
        element={
          isLogged
            ? <TestsConfigPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/configurar-plan"
        element={
          isLogged
            ? <ConfigurarPlanPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/pruebas-psicotecnicas"
        element={
          isLogged
            ? <PsicotecnicosPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/conductuales"
        element={
          isLogged
            ? <ConductualesPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/ofimatica"
        element={
          isLogged
            ? <OfimaticaPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/matematicas"
        element={
          isLogged
            ? <MatematicasPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/creditos"
        element={
          isLogged
            ? <CreditosPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/temarios"
        element={
          isLogged
            ? <TemarioPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/plan-estudio"
        element={
          isLogged
            ? <PlanEstudioPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/verbal-test"
        element={
          isLogged
            ? <VerbalTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/numerico-test"
        element={
          isLogged
            ? <NumericoTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/figuras-test"
        element={
          isLogged
            ? <FigurasTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/retentiva-test"
        element={
          isLogged
            ? <RetentivaTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/access-test"
        element={
          isLogged
            ? <AccessTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/correo-test"
        element={
          isLogged
            ? <CorreoTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/excell-test"
        element={
          isLogged
            ? <ExcellTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/internet-test"
        element={
          isLogged
            ? <InternetTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/powerpoint-test"
        element={
          isLogged
            ? <PowerpointTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/windows-test"
        element={
          isLogged
            ? <WindowsTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/word-test"
        element={
          isLogged
            ? <WordTestPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/seleccionar-oposicion"
        element={
          isLogged
            ? <SeleccionarOposicionPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/temarios/preparar/:id"
        element={
          isLogged
            ? <PrepararPDFPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/temarios/ver/:id"
        element={
          isLogged
            ? <VisorTemarioPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/temarios/:id/temas"
        element={
          isLogged
            ? <TemasPage />
            : <MantenimientoPage />
        }
      />

      <Route
        path="/resumenes/:id"
        element={
          isLogged
            ? <ResumenPage />
            : <MantenimientoPage />
        }
      />

    </Routes>

  )
}

export default App
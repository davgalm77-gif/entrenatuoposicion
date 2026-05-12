import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import LandingPage from "./pages/LandingPage"
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
import VerbalTestPage from "./pages/psicotecnicos/VerbalTestPage"
import FigurasTestPage from "./pages/psicotecnicos/FigurasTestPage"
import RetentivaTestPage from "./pages/psicotecnicos/RetentivaTestPage"


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
/>

        <Route
          path="/configuracion-pruebas"
          element={<TestsConfigPage />}
        />
        
        <Route
          path="/configurar-plan"
          element={<ConfigurarPlanPage />}
         />

        <Route
          path="/pruebas-psicotecnicas"
          element={<PsicotecnicosPage />}
        />

        <Route
          path="/conductuales"
          element={<ConductualesPage />}
        />

        <Route
          path="/ofimatica"
          element={<OfimaticaPage />}
         />

         <Route
          path="/matematicas"
          element={<MatematicasPage />}
          />

          <Route
          path="/creditos"
          element={<CreditosPage />}
          />

          <Route
          path="/temarios"
          element={<TemarioPage />}
          />

          <Route
          path="/plan-estudio"
          element={<PlanEstudioPage />}
          />

          <Route
          path="/verbal-test"
          element={<VerbalTestPage />}
          />

          <Route
          path="/figuras-test"
          element={<FigurasTestPage />}
          />

          <Route
          path="/retentiva-test"
          element={<RetentivaTestPage />}
          />


      </Routes>

    </BrowserRouter>
  )
}

export default App
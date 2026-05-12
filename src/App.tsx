import MantenimientoPage from "./pages/MantenimientoPage"
import AppRoutes from "./AppRoutes"

function App() {

  const esLocal =
    window.location.hostname === "localhost"

  if (!esLocal) {

    return <MantenimientoPage />

  }

  return <AppRoutes />

}

export default App
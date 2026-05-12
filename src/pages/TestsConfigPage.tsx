import DashboardLayout from "../layouts/DashboardLayout"
import { useState } from "react"

import {
  FileText,
  Clock3,
  CircleMinus,
} from "lucide-react"

function OtherTestBlock({
  icono,
  titulo,
  color,
}: {
  icono: string
  titulo: string
  color: string
}) {

  const [compartirTiempo, setCompartirTiempo] =
    useState(false)

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      {/* CABECERA */}
      <div className="border-b border-slate-800 px-6 py-5 flex items-center gap-3">

        <div className={`${color} p-3 rounded-xl`}>

          <span className="text-2xl">
            {icono}
          </span>

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            {titulo}
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Configuración de la prueba.
          </p>

        </div>

      </div>

      {/* CONTENIDO */}
      <div className="p-6 space-y-6">

        {/* DATOS BASICOS */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

          <h3 className="text-xl font-bold mb-5">
            Datos básicos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Número de preguntas
              </label>

              <input
                type="number"
                placeholder="80"
                className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Respuestas por pregunta
              </label>

              <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

                <option>
                  3 respuestas
                </option>

                <option>
                  4 respuestas
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* CORRECCION */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

          <h3 className="text-xl font-bold mb-5">
            Corrección
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Valor respuesta correcta
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="1"
                className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Valor respuesta incorrecta
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="0.30"
                className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Respuesta en blanco
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="0"
                className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
              />

            </div>

          </div>

        </div>

        {/* APROBADO */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

          <h3 className="text-xl font-bold mb-5">
            Criterios de aprobado
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Nota máxima
              </label>

              <input
                type="number"
                placeholder="100"
                className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                Porcentaje mínimo
              </label>

              <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

                <option>
                  50%
                </option>

                <option>
                  60%
                </option>

                <option>
                  Personalizado
                </option>

              </select>

            </div>

            <div>

              <label className="text-slate-300 text-sm block mb-2">
                ¿Eliminatoria?
              </label>

              <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

                <option>
                  Sí
                </option>

                <option>
                  No
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* TIEMPO */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

          <h3 className="text-xl font-bold mb-5">
            Tiempo de realización
          </h3>

          <div className="space-y-5">

            <select
              onChange={(e) =>
                setCompartirTiempo(
                  e.target.value === "compartido"
                )
              }
              className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
            >

              <option value="independiente">
                Tiempo independiente
              </option>

              <option value="compartido">
                Compartir tiempo con prueba teórica
              </option>

            </select>

            {!compartirTiempo && (

              <input
                type="number"
                placeholder="45 minutos"
                className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
              />

            )}

          </div>

        </div>

      </div>

    </div>

  )
}

function TestsConfigPage() {

  const [mostrarSelector, setMostrarSelector] = useState(false)
  const [bloques, setBloques] = useState<string[]>([])
  const [mostrarListening, setMostrarListening] = useState(false)
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState("Inglés")
  const [tipoListening, setTipoListening] = useState("general")
  const [compartirTiempoIdiomas, setCompartirTiempoIdiomas] = useState(false)

  const guardarConfiguracion = () => {

    alert("Configuración guardada")

  }

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div>

          <h1 className="text-3xl font-bold">
            Configuración de exámen
          </h1>

          <p className="text-slate-400 text-base mt-3 leading-relaxed">
            Configura las pruebas según el programa oficial
            de la convocatoria.
          </p>

        </div>

        {/* BLOQUE TEMARIO */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {/* CABECERA */}
          <div className="border-b border-slate-800 px-6 py-5 flex items-center gap-3">

            <div className="bg-blue-500/20 p-3 rounded-xl">

              <FileText
                size={24}
                className="text-blue-400"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Prueba teórica
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Primera prueba obligatoria.
              </p>

            </div>

          </div>

          {/* CONTENIDO */}
          <div className="p-6 space-y-6">

            {/* TEMARIOS */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

              <h3 className="text-xl font-semibold">
                Temarios seleccionados
              </h3>

              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Los temarios podrán seleccionarse
                cuando hayan sido subidos y procesados.
              </p>

              <div className="mt-4 inline-flex items-center rounded-xl bg-slate-900 border border-slate-700 px-4 py-2">

                <span className="text-slate-500 text-sm">
                  Ningún temario seleccionado
                </span>

              </div>

            </div>

            {/* CONFIGURACION */}
            <div className="space-y-6">

              {/* DATOS BASICOS */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <h3 className="text-xl font-bold mb-5">
                  Datos básicos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* PREGUNTAS */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Número de preguntas
                    </label>

                    <input
                      type="number"
                      placeholder="70"
                      className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
                    />

                  </div>

                  {/* RESPUESTAS */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Respuestas por pregunta
                    </label>

                    <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

                      <option>
                        3 respuestas
                      </option>

                      <option>
                        4 respuestas
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* CORRECCION */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <h3 className="text-xl font-bold mb-5">
                  Corrección
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  {/* POSITIVA */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Valor respuesta correcta
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      placeholder="1"
                      className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
                    />

                  </div>

                  {/* NEGATIVA */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Valor respuesta incorrecta
                    </label>

                    <div className="relative">

                      <CircleMinus
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400"
                      />

                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.30"
                        className="w-full h-12 bg-black border border-slate-700 rounded-xl pl-12 pr-4 text-base"
                      />

                    </div>

                  </div>

                  {/* BLANCO */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Respuesta en blanco
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
                    />

                  </div>

                </div>

              </div>

              {/* APROBADO */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <h3 className="text-xl font-bold mb-5">
                  Criterios de aprobado
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* NOTA */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Nota máxima
                    </label>

                    <input
                      type="number"
                      placeholder="70"
                      className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
                    />

                  </div>

                  {/* PORCENTAJE */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Porcentaje mínimo
                    </label>

                    <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

                      <option>
                        50%
                      </option>

                      <option>
                        60%
                      </option>

                      <option>
                        Personalizado
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* MERITOS */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

                <h3 className="text-xl font-bold mb-5">
                  Méritos (opcional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* NUMERO MERITOS */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Número máximo de méritos
                    </label>

                    <input
                      type="number"
                      placeholder="10"
                      className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
                    />

                  </div>

                  {/* VALOR */}
                  <div>

                    <label className="text-slate-300 text-sm block mb-2">
                      Valor por mérito
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.50"
                      className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
                    />

                  </div>

                </div>

              </div>

  {/* TIEMPO */}
<div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

  <h3 className="text-xl font-bold mb-5">
    Tiempo de realización
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    {/* TIEMPO */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Duración
      </label>

      <div className="relative">

        <Clock3
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
        />

        <input
          type="number"
          placeholder="100 minutos"
          className="w-full h-12 bg-black border border-slate-700 rounded-xl pl-12 pr-4 text-base"
        />

      </div>

    </div>

  </div>

</div>

</div>

</div>

</div>

{/* BOTONES */}
<div className="space-y-4">

  <div className="flex gap-3">

    {/* AÑADIR */}
    <button
      onClick={() => setMostrarSelector(!mostrarSelector)}
      className="flex-1 h-14 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500 hover:bg-slate-900 transition text-base font-semibold text-slate-300"
    >

      + Añadir prueba

    </button>

    {/* ELIMINAR */}
    {bloques.length > 0 && (

      <button
        onClick={() =>
          setBloques(bloques.slice(0, -1))
        }
        className="h-14 px-6 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-base font-semibold"
      >

        Eliminar

      </button>

    )}

  </div>

  {mostrarSelector && (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <h3 className="text-xl font-bold mb-5">
        Selecciona el tipo de prueba
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {!bloques.includes("idiomas") && (

          <button
            onClick={() => {

              setBloques([
                ...bloques,
                "idiomas"
              ])

              setMostrarSelector(false)

            }}
            className="bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded-xl p-4 text-left text-base"
          >
            🌍 Idiomas
          </button>

        )}

        {!bloques.includes("psicotecnicos") && (

          <button
            onClick={() => {

              setBloques([
                ...bloques,
                "psicotecnicos"
              ])

              setMostrarSelector(false)

            }}
            className="bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded-xl p-4 text-left text-base"
          >
            🎯 Psicotécnicos
          </button>

        )}

        {!bloques.includes("conductuales") && (

          <button
            onClick={() => {

              setBloques([
                ...bloques,
                "conductuales"
              ])

              setMostrarSelector(false)

            }}
            className="bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded-xl p-4 text-left text-base"
          >
            💬 Conductuales
          </button>

        )}

        {!bloques.includes("ofimatica") && (

          <button
            onClick={() => {

              setBloques([
                ...bloques,
                "ofimatica"
              ])

              setMostrarSelector(false)

            }}
            className="bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded-xl p-4 text-left text-base"
          >
            💻 Ofimática
          </button>

        )}

        {!bloques.includes("matematicas") && (

          <button
            onClick={() => {

              setBloques([
                ...bloques,
                "matematicas"
              ])

              setMostrarSelector(false)

            }}
            className="bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded-xl p-4 text-left text-base"
          >
            📐 Matemáticas
          </button>

        )}

      </div>

    </div>

  )}

</div>

{/* BLOQUE IDIOMAS */}
{bloques.includes("idiomas") && (

  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

    {/* CABECERA */}
    <div className="border-b border-slate-800 px-6 py-5 flex items-center gap-3">

      <div className="bg-cyan-500/20 p-3 rounded-xl">

        <span className="text-2xl">
          🌍
        </span>

      </div>

      <div>

        <h2 className="text-2xl font-bold">
          Prueba de idiomas
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Configura idioma, listening y criterios de evaluación.
        </p>

      </div>

    </div>

    {/* CONTENIDO */}
    <div className="p-6 space-y-6">

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* IDIOMA */}
        <div>

          <label className="text-slate-300 text-sm block mb-2">
            Idioma
          </label>

          <select
            value={idiomaSeleccionado}
            onChange={(e) => {

              setIdiomaSeleccionado(e.target.value)
              setTipoListening("general")

            }}
            className="w-full h-12 bg-slate-950 border border-slate-700 rounded-xl px-4 text-base"
          >

            <option>
              Inglés
            </option>

            <option>
              Francés
            </option>

            <option>
              Alemán
            </option>

          </select>

        </div>

        {/* PREGUNTAS */}
<div>

  <label className="text-slate-300 text-sm block mb-2">
    Número de preguntas totales
  </label>

  <input
    type="number"
    placeholder="60"
    className="w-full h-12 bg-slate-950 border border-slate-700 rounded-xl px-4 text-base"
  />

</div>

{/* RESPUESTAS */}
<div>

  <label className="text-slate-300 text-sm block mb-2">
    Respuestas por pregunta
  </label>

  <select className="w-full h-12 bg-slate-950 border border-slate-700 rounded-xl px-4 text-base">

    <option>
      3 respuestas
    </option>

    <option>
      4 respuestas
    </option>

  </select>

</div>

{/* TIEMPO */}
<div className="space-y-4">

  <div>

    <label className="text-slate-300 text-sm block mb-2">
      Configuración de tiempo
    </label>

    <select
      onChange={(e) =>
        setCompartirTiempoIdiomas(
          e.target.value === "compartido"
        )
      }
      className="w-full h-12 bg-slate-950 border border-slate-700 rounded-xl px-4 text-base"
    >

      <option value="independiente">
        Tiempo independiente
      </option>

      <option value="compartido">
        Compartir tiempo con prueba teórica
      </option>

    </select>

  </div>

  {compartirTiempoIdiomas ? (

    <div className="w-full h-12 bg-slate-800 border border-slate-700 rounded-xl px-4 flex items-center text-slate-400 text-sm">

      Esta prueba utilizará el tiempo de la prueba teórica

    </div>

  ) : (

    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Tiempo de prueba
      </label>

      <div className="relative">

        <Clock3
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
        />

        <input
          type="number"
          placeholder="100 minutos"
          className="w-full h-12 bg-black border border-slate-700 rounded-xl pl-12 pr-4 text-base"
        />

      </div>

    </div>

  )}

</div>

</div>

{/* CORRECCION */}
<div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

  <h3 className="text-xl font-bold mb-5">
    Corrección
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* POSITIVA */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Valor respuesta correcta
      </label>

      <input
        type="number"
        step="0.01"
        placeholder="0.50"
        className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
      />

    </div>

    {/* NEGATIVA */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Valor respuesta incorrecta
      </label>

      <div className="relative">

        <CircleMinus
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400"
        />

        <input
          type="number"
          step="0.01"
          placeholder="0.20"
          className="w-full h-12 bg-black border border-slate-700 rounded-xl pl-12 pr-4 text-base"
        />

      </div>

    </div>

    {/* BLANCO */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Respuesta en blanco
      </label>

      <input
        type="number"
        step="0.01"
        placeholder="0"
        className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
      />

    </div>

  </div>

</div>

{/* APROBADO */}
<div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

  <h3 className="text-xl font-bold mb-5">
    Criterios de aprobado
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* NOTA */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Nota máxima
      </label>

      <input
        type="number"
        placeholder="30"
        className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
      />

    </div>

    {/* PORCENTAJE */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        Porcentaje mínimo
      </label>

      <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

        <option>
          50%
        </option>

        <option>
          60%
        </option>

        <option>
          Personalizado
        </option>

      </select>

    </div>

    {/* ELIMINATORIA */}
    <div>

      <label className="text-slate-300 text-sm block mb-2">
        ¿Eliminatoria?
      </label>

      <select className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base">

        <option>
          Sí
        </option>

        <option>
          No
        </option>

      </select>

    </div>

  </div>

</div>

{/* LISTENING */}
<div>

  <label className="text-slate-300 text-sm block mb-2">
    ¿Incluye listening?
  </label>

  <select
    onChange={(e) =>
      setMostrarListening(e.target.value === "si")
    }
    className="w-full h-12 bg-slate-950 border border-slate-700 rounded-xl px-4 text-base"
  >

    <option value="no">
      No
    </option>

    <option value="si">
      Sí
    </option>

  </select>

</div>

{/* PANEL LISTENING */}
{mostrarListening && (

  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">

    <h3 className="text-xl font-bold mb-5">
      Configuración listening
    </h3>

    <div className="space-y-6">

      {/* PREGUNTAS */}
      <div>

        <label className="text-slate-300 text-sm block mb-2">
          Preguntas que son listening
        </label>

        <input
          type="number"
          placeholder="10"
          className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
        />

      </div>

      {/* TIPO */}
      <div>

        <label className="text-slate-300 text-sm block mb-2">
          Tipo de listening
        </label>

        <select
          onChange={(e) =>
            setTipoListening(e.target.value)
          }
          className="w-full h-12 bg-black border border-slate-700 rounded-xl px-4 text-base"
        >

          {idiomaSeleccionado === "Inglés" ? (
            <>
              <option value="general">
                Inglés general
              </option>

              <option value="rca">
                Inglés aeroportuario (RCA)
              </option>
            </>
          ) : (
            <option>
              Listening general
            </option>
          )}

        </select>

      </div>

      {/* PDF RCA */}
      {tipoListening === "rca" && (

        <div>

          <label className="text-slate-300 text-sm block mb-2">
            PDFs de apoyo (opcional)
          </label>

          <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center text-slate-500 text-sm">

            Arrastra PDFs aquí o selecciónalos manualmente.

          </div>

        </div>

      )}

    </div>

  </div>

)}

</div>

</div>

)}

{bloques.map((bloque, index) => {

  if (bloque === "psicotecnicos") {

    return (
      <OtherTestBlock
        key={index}
        icono="🎯"
        titulo="Prueba psicotécnica"
        color="bg-violet-500/20"
      />
    )

  }

  if (bloque === "conductuales") {

    return (
      <OtherTestBlock
        key={index}
        icono="💬"
        titulo="Prueba conductual"
        color="bg-pink-500/20"
      />
    )

  }

  if (bloque === "ofimatica") {

    return (
      <OtherTestBlock
        key={index}
        icono="💻"
        titulo="Prueba de ofimática"
        color="bg-emerald-500/20"
      />
    )

  }

  if (bloque === "matematicas") {

    return (
      <OtherTestBlock
        key={index}
        icono="📐"
        titulo="Prueba matemática"
        color="bg-orange-500/20"
      />
    )

  }

  return null

})}

{/* GUARDAR */}
<div className="pt-3">

  <button
    onClick={guardarConfiguracion}
    className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black text-base font-bold"
  >

    Guardar configuración

  </button>

</div>

      </div>

    </DashboardLayout>
  )
}

export default TestsConfigPage
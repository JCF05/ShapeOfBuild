import { useEffect, useState } from "react";
import ObjectCard from "./components/ObjectCard";
import Login from "./components/Login";
import BuildCreator from "./components/BuildCreator";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [objetos, setObjetos] = useState([]);

  // Cargar objetos SOLO cuando haya usuario
  useEffect(() => {
  if (usuario) {
    fetch("/api/objetos")
      .then(res => res.json())
      .then(data => {
        console.log("Datos recibidos:", data);
        setObjetos(data.data ?? []);
      })
      .catch(err => console.error(err));
  }
}, [usuario]);

  return (
    <div className="container">
      {!usuario ? (
        <Login onLogin={setUsuario} />
      ) : (
        <>
          <h1>Shape of Build</h1>
          <h2>Bienvenido, {usuario}</h2>
          <button onClick={() => setUsuario(null)}>Cerrar sesión</button>

          <BuildCreator objetos={objetos} />
        </>
      )}
    </div>
  );
}

export default App;
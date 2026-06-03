import { useState } from "react";

function BuildCreator({ objetos }) {
  const [artefactos, setArtefactos] = useState([null, null, null, null]);
  const [habilidades, setHabilidades] = useState([null, null, null, null]);

  const equiparObjeto = (objeto) => {
    const categoria = objeto.categoria.toLowerCase();

    if (categoria === "artefacto") {
      const index = artefactos.findIndex((slot) => slot === null);
      if (index !== -1) {
        const nuevos = [...artefactos];
        nuevos[index] = objeto;
        setArtefactos(nuevos);
      }
    }

    if (categoria === "habilidad") {
      const index = habilidades.findIndex((slot) => slot === null);
      if (index !== -1) {
        const nuevos = [...habilidades];
        nuevos[index] = objeto;
        setHabilidades(nuevos);
      }
    }
  };

  const quitarObjeto = (tipo, index) => {
    if (tipo === "artefacto") {
      const nuevos = [...artefactos];
      nuevos[index] = null;
      setArtefactos(nuevos);
    }

    if (tipo === "habilidad") {
      const nuevos = [...habilidades];
      nuevos[index] = null;
      setHabilidades(nuevos);
    }
  };

  // const artefactosDisponibles = objetos.filter(
  //   (obj) => obj.categoria.toLowerCase() === "artefacto",
  // );

  // const habilidadesDisponibles = objetos.filter(
  //   (obj) => obj.categoria.toLowerCase() === "habilidad",
  // );
  const artefactosDisponibles = objetos;
  const habilidadesDisponibles = [];
  
  return (
    <div className="build-container">
      <h2>Constructor de Build</h2>

      {/* ARTEFACTOS */}
      <h3>Artefactos</h3>
      <div className="slots">
        {artefactos.map((slot, index) => (
          <div
            key={index}
            className="slot"
            onClick={() => slot && quitarObjeto("artefacto", index)}
          >
            {slot ? slot.nombre : "Vacío"}
          </div>
        ))}
      </div>

      {/* HABILIDADES */}
      <h3>Habilidades</h3>
      <div className="slots">
        {habilidades.map((slot, index) => (
          <div
            key={index}
            className="slot"
            onClick={() => slot && quitarObjeto("habilidad", index)}
          >
            {slot ? slot.nombre : "Vacío"}
          </div>
        ))}
      </div>

      <hr />

      <h3>Artefactos disponibles</h3>
      <div className="object-list">
        {artefactosDisponibles.map((objeto) => (
          <div
            key={objeto.id}
            className="mini-card"
            onClick={() => equiparObjeto(objeto)}
          >
            {objeto.nombre}
          </div>
        ))}
      </div>

      <h3>Habilidades disponibles</h3>
      <div className="object-list">
        {habilidadesDisponibles.map((objeto) => (
          <div
            key={objeto.id}
            className="mini-card"
            onClick={() => equiparObjeto(objeto)}
          >
            {objeto.nombre}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuildCreator;

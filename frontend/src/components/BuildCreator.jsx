import { useState } from "react";

function BuildCreator({ objetos, personajes }) {
  console.log("Personajes:", personajes);
  const [artefactos, setArtefactos] = useState([null, null, null, null]);
  const [habilidades, setHabilidades] = useState([null, null, null, null]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  const equiparObjeto = (objeto) => {

    const yaEquipado = [...artefactos, ...habilidades]
      .some(item => item?.id === objeto.id);

    if (yaEquipado) {
      return;
    }

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

  const artefactosDisponibles = objetos.filter(
    (obj) =>
      obj.categoria &&
      obj.categoria.toLowerCase().includes("artefact")
  );

  const habilidadesDisponibles = objetos.filter(
    (obj) =>
      obj.categoria &&
      obj.categoria.toLowerCase().includes("habilidad")
  );
  
  const personaje = {
    nombre: "Dreamer",
    ataque: 100,
    defensa: 50,
    vida: 1000,
  };

  const bonusAtaque = [...artefactos, ...habilidades]
  .filter(Boolean)
  .reduce(
    (acc, obj) => acc + (obj.ataque || 0),
    0
  );

  const bonusDefensa = [...artefactos, ...habilidades]
  .filter(Boolean)
  .reduce(
    (acc, obj) => acc + (obj.defensa || 0),
    0
  );

  const bonusVida = [...artefactos, ...habilidades]
  .filter(Boolean)
  .reduce(
    (acc, obj) => acc + (obj.vida || 0),
    0
  );

  const statsFinales = personajeSeleccionado
  ? {
      ataque:
        personajeSeleccionado.ataque_base +
        bonusAtaque,

      defensa:
        personajeSeleccionado.defensa_base +
        bonusDefensa,

      vida:
        personajeSeleccionado.vida_base +
        bonusVida,
    }
  : null;

  console.log(objetos);

  return (
    <div className="build-container">
      <h2>Constructor de Build</h2>
      <div className="build-layout">
        <div className="left-panel">
          <h3>Selecciona personaje</h3>
          <select
            onChange={(e) => {

              const personaje = personajes.find(
                p => p.id === Number(e.target.value)
              );

              setPersonajeSeleccionado(personaje);
            }}
          >
            <option value="">
              Seleccionar...
            </option>

            {personajes.map(personaje => (
              <option
                key={personaje.id}
                value={personaje.id}
              >
                {personaje.nombre}
              </option>
            ))}
          </select>

          {personajeSeleccionado && (
            <div className="stats-card">

              <h3>
                Estadísticas Finales
              </h3>

              <p>
                Ataque: {statsFinales.ataque}
                <br />
                <small>
                  {personajeSeleccionado.ataque_base}
                  {" base + "}
                  {bonusAtaque}
                  {" equipo"}
                </small>
              </p>

              <p>
                Defensa: {statsFinales.defensa}
                <br />
                <small>
                  {personajeSeleccionado.defensa_base}
                  {" base + "}
                  {bonusDefensa}
                  {" equipo"}
                </small>
              </p>

              <p>
                Vida: {statsFinales.vida}
                <br />
                <small>
                  {personajeSeleccionado.vida_base}
                  {" base + "}
                  {bonusVida}
                  {" equipo"}
                </small>
              </p>

            </div>
          )}

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
        </div>
        
        <div className="right-panel">
          <h3>Artefactos disponibles</h3>
          <div className="object-list">
            {artefactosDisponibles.map((objeto) => (
              <div
                key={objeto.id}
                className={`mini-card rareza-${objeto.rareza.toLowerCase()}`}
                onClick={() => equiparObjeto(objeto)}
              >
                <strong>{objeto.nombre}</strong>

                <p>Rareza: {objeto.rareza}</p>

                <p>Ataque: +{objeto.ataque}</p>
                <p>Defensa: +{objeto.defensa}</p>
                <p>Vida: +{objeto.vida}</p>
              </div>
            ))}
          </div>

          <h3>Habilidades disponibles</h3>
          <div className="object-list">
            {habilidadesDisponibles.map((objeto) => (
              <div
                key={objeto.id}
                className={`mini-card rareza-${objeto.rareza.toLowerCase()}`}
                onClick={() => equiparObjeto(objeto)}
              >
                <strong>{objeto.nombre}</strong>

                <p>Rareza: {objeto.rareza}</p>

                <p>Ataque: +{objeto.ataque}</p>
                <p>Defensa: +{objeto.defensa}</p>
                <p>Vida: +{objeto.vida}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildCreator;

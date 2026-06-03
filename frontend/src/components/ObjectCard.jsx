function ObjectCard({ objeto }) {
  return (
    <div className="card">
      <h3>{objeto.nombre}</h3>
      <p><strong>Categoría:</strong> {objeto.categoria}</p>
      <p><strong>Rareza:</strong> {objeto.rareza}</p>
      <p><strong>Nivel requerido:</strong> {objeto.nivel_requerido}</p>
      <p className="descripcion">{objeto.descripcion}</p>
    </div>
  );
}

export default ObjectCard;
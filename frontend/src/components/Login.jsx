import { useState } from "react";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/auth/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          onLogin(data.usuario);
        } else {
          setError(data.error);
        }
      })
      .catch(() => setError("Error de conexión"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
import { fetchUser, createUser, updateUser } from '../api.js';

export async function user(params) {
  let userData = { name: "", email: "" };
  let isNew = params.id === "new";

  if (!isNew) {
    try { userData = await fetchUser(params.id); }
    catch { return `<h1>Error</h1><p>Usuario no encontrado</p>`; }
  }

  return `
    <h1>${isNew ? "Crear" : "Editar"} Usuario</h1>
    <form id="user-form">
      <label>Nombre: <input type="text" name="name" value="${userData.name}" required></label><br><br>
      <label>Email: <input type="email" name="email" value="${userData.email}" required></label><br><br>
      <button type="submit">${isNew ? "Crear" : "Actualizar"}</button>
    </form>
  `;
}

export function bindUserForm(params) {
  const form = document.getElementById("user-form");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    if (params.id === "new") await createUser(data);
    else await updateUser(params.id, data);

    history.pushState(null, null, "/");
    document.getElementById("app").classList.add("fade-out");
    setTimeout(() => window.router?.(), 200);
  });
}

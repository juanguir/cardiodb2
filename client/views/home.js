import { fetchUsers, deleteUser } from '../api.js';

/**
 * Helper debounce
 */
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Render de un único item (retorna elemento DOM)
 */
function createListItem(user) {
  const li = document.createElement('li');
  li.id = `user-${user.id}`;
  li.className = 'list-item enter'; // start in enter state

  const left = document.createElement('div');
  left.innerHTML = `<a href="/user/${user.id}" data-link>${user.name}</a><div style="font-size:0.85em;color:#666;">${user.email}</div>`;

  const right = document.createElement('div');
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Editar';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, `/user/${user.id}`);
    // llamar al router global
    window.router?.();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Eliminar';
  delBtn.className = 'delete-btn';
  delBtn.dataset.id = user.id;
  delBtn.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    // animación de salida
    li.classList.add('exit');
    // forzar reflow para que la transición funcione al añadir la clase hide
    // eslint-disable-next-line no-unused-expressions
    li.offsetHeight;
    li.classList.add('hide'); // clase hide para animar salida (ver CSS)
    try {
      await deleteUser(id);
      setTimeout(() => li.remove(), 250);
    } catch (err) {
      // si falla, revertir animación
      li.classList.remove('exit', 'hide');
      alert('Error al eliminar: ' + err);
    }
  });

  right.appendChild(editBtn);
  right.appendChild(delBtn);

  li.appendChild(left);
  li.appendChild(right);

  // Después de insertar en DOM, lanzar animación de entrada
  requestAnimationFrame(() => {
    // fuerza reflow y añadir clase show para animar entrada
    li.classList.add('show'); // .enter + .show -> transición a estado visible
  });

  return li;
}

/**
 * Mantener estado local de usuarios (lista filtrada)
 */
let allUsers = []; // todos los usuarios
let filtered = []; // actual filtrado mostrado
let userListEl;     // referencia al ul

export async function home() {
  allUsers = await fetchUsers();
  filtered = [...allUsers];

  // HTML base: search + lista
  return `
    <h1>Home - Lista de Usuarios</h1>
    <input id="search" placeholder="Buscar por nombre o email..." />
    <ul id="user-list"></ul>
    <a href="/user/new" data-link>Crear Nuevo Usuario</a>
  `;
}

/**
 * bind() se ejecuta desde el router cuando la vista ya está en el DOM
 * aquí añadimos listeners y pintamos la lista inicial sin recargar
 */
export function bind() {
  userListEl = document.getElementById('user-list');
  const searchInput = document.getElementById('search');

  // pintar lista inicial
  renderList(filtered);

  // filtro en tiempo real con debounce
  const onInput = debounce((e) => {
    const q = (e.target.value || '').trim().toLowerCase();
    filtered = allUsers.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
    diffRender(filtered);
  }, 150);

  searchInput.addEventListener('input', onInput);
}

/**
 * Render full (usado la primera vez)
 */
function renderList(users) {
  userListEl.innerHTML = '';
  const frag = document.createDocumentFragment();
  users.forEach(u => {
    const li = createListItem(u);
    frag.appendChild(li);
  });
  userListEl.appendChild(frag);
}

/**
 * Diff render: insertar/eliminar solo lo necesario para evitar recargas y mantener animaciones
 */
function diffRender(newList) {
  const existingIds = Array.from(userListEl.children).map(li => li.id.replace('user-', ''));
  const newIds = newList.map(u => String(u.id));

  // eliminar items no presentes en newList (con animación)
  existingIds.forEach(id => {
    if (!newIds.includes(id)) {
      const li = document.getElementById(`user-${id}`);
      if (li) {
        li.classList.add('exit');
        // forzar reflow
        // eslint-disable-next-line no-unused-expressions
        li.offsetHeight;
        li.classList.add('hide');
        setTimeout(() => li.remove(), 250);
      }
    }
  });

  // añadir o reordenar items
  newList.forEach((user, idx) => {
    const existing = document.getElementById(`user-${user.id}`);
    if (!existing) {
      // crear nuevo elemento y insertarlo en la posición correcta
      const li = createListItem(user);
      if (idx >= userListEl.children.length) {
        userListEl.appendChild(li);
      } else {
        userListEl.insertBefore(li, userListEl.children[idx]);
      }
    } else {
      // si existe pero la posición cambió, moverlo
      const currentIndex = Array.prototype.indexOf.call(userListEl.children, existing);
      if (currentIndex !== idx) {
        const ref = userListEl.children[idx] || null;
        userListEl.insertBefore(existing, ref);
      }
    }
  });
}

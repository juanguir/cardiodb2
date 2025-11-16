let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 42, name: "Carol", email: "carol@example.com" }
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchUsers() {
  await delay(300);
  return users;
}

export async function fetchUser(id) {
  await delay(300);
  const user = users.find(u => u.id === parseInt(id));
  if (!user) throw "Usuario no encontrado";
  return user;
}

export async function createUser(data) {
  await delay(300);
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, ...data };
  users.push(newUser);
  return newUser;
}

export async function updateUser(id, data) {
  await delay(300);
  const user = users.find(u => u.id === parseInt(id));
  if (!user) throw "Usuario no encontrado";
  Object.assign(user, data);
  return user;
}

export async function deleteUser(id) {
  await delay(300);
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) throw "Usuario no encontrado";
  users.splice(index, 1);
}

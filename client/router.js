import { parsePath } from './utils.js';

const routes = [
  { path: "/", view: () => import('./views/home.js').then(m => m.home), bind: (m) => m.bind?.() },
  { path: "/about", view: () => import('./views/about.js').then(m => m.about) },
  { path: "/contact", view: () => import('./views/contact.js').then(m => m.contact) },
  { path: "/user/:id", view: () => import('./views/user.js').then(m => m.user), bind: (m, params) => m.bindUserForm?.(params) }
];

const notFound = () => import('./views/notfound.js').then(m => m.notFound);

export async function router() {
  const app = document.getElementById("app");
  app.classList.add("fade-out");

  setTimeout(async () => {
    const { route, params } = matchRoute(window.location.pathname) || {};
    if (route) {
      const viewModule = await route.view();
      app.innerHTML = await viewModule(params);
      if (route.bind) route.bind(viewModule, params);
    } else {
      const nf = await notFound();
      app.innerHTML = nf();
    }
    app.classList.remove("fade-out");
  }, 200);
}

function matchRoute(pathname) {
  for (const route of routes) {
    const match = parsePath(route.path, pathname);
    if (match) return { route, params: match };
  }
  return null;
}

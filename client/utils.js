export function parsePath(routePath, actualPath) {
  const routeParts = routePath.split('/').filter(Boolean);
  const pathParts = actualPath.split('/').filter(Boolean);

  if (routeParts.length !== pathParts.length) return null;

  const params = {};
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

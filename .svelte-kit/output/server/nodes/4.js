

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.D6XxZeFz.js","_app/immutable/chunks/index.BkvKWb7e.js","_app/immutable/chunks/vendor.CYIIfUy6.js"];
export const stylesheets = ["_app/immutable/assets/index.DtZnf5IX.css"];
export const fonts = [];

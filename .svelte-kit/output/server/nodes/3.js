

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game-rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BfzoJS9d.js","_app/immutable/chunks/index.BkvKWb7e.js","_app/immutable/chunks/vendor.CYIIfUy6.js"];
export const stylesheets = ["_app/immutable/assets/index.DtZnf5IX.css"];
export const fonts = [];

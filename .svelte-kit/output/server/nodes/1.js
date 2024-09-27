

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.D25_Zpzc.js","_app/immutable/chunks/index.BkvKWb7e.js","_app/immutable/chunks/vendor.CYIIfUy6.js"];
export const stylesheets = ["_app/immutable/assets/index.DtZnf5IX.css"];
export const fonts = [];

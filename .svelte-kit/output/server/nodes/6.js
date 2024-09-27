

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.CJvlVxfG.js","_app/immutable/chunks/index.BkvKWb7e.js","_app/immutable/chunks/vendor.CYIIfUy6.js"];
export const stylesheets = ["_app/immutable/assets/index.DtZnf5IX.css"];
export const fonts = [];

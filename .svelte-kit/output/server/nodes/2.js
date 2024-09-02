

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.yFkRjItw.js","_app/immutable/chunks/index.CNduCW1M.js","_app/immutable/chunks/vendor.BgRk3dcw.js"];
export const stylesheets = ["_app/immutable/assets/index.DMWmh9zJ.css"];
export const fonts = [];

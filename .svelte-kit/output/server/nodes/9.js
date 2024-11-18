

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.6ZVrxB0G.js","_app/immutable/chunks/index.zBvk0ere.js","_app/immutable/chunks/vendor.DbbOIWXw.js"];
export const stylesheets = ["_app/immutable/assets/index.CQl5XccJ.css"];
export const fonts = [];

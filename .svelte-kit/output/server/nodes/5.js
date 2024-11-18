

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/mulligans/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BlmcC7mM.js","_app/immutable/chunks/index.zBvk0ere.js","_app/immutable/chunks/vendor.DbbOIWXw.js"];
export const stylesheets = ["_app/immutable/assets/index.CQl5XccJ.css"];
export const fonts = [];

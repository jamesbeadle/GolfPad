

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.CkUYtGvM.js","_app/immutable/chunks/index.BdOloL_G.js","_app/immutable/chunks/vendor.FNmIzXa7.js"];
export const stylesheets = ["_app/immutable/assets/index.kirncAzC.css"];
export const fonts = [];

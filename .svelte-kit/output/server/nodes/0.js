

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.K2wXG7oS.js","_app/immutable/chunks/index.BdOloL_G.js","_app/immutable/chunks/vendor.FNmIzXa7.js"];
export const stylesheets = ["_app/immutable/assets/index.kirncAzC.css"];
export const fonts = [];

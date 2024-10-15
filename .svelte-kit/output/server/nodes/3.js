

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game-rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DSUlUMZ9.js","_app/immutable/chunks/index.BdOloL_G.js","_app/immutable/chunks/vendor.FNmIzXa7.js"];
export const stylesheets = ["_app/immutable/assets/index.kirncAzC.css"];
export const fonts = [];

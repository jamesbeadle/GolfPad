

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/mulligans/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.I7UDJmod.js","_app/immutable/chunks/index.BdOloL_G.js","_app/immutable/chunks/vendor.FNmIzXa7.js"];
export const stylesheets = ["_app/immutable/assets/index.kirncAzC.css"];
export const fonts = [];

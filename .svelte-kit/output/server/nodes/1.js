

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.B3Q504Ev.js","_app/immutable/chunks/index.BiHrnWhP.js","_app/immutable/chunks/vendor.DmZGV-Zx.js"];
export const stylesheets = ["_app/immutable/assets/index.BxBnBMjC.css"];
export const fonts = [];

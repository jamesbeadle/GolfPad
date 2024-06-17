

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DbvlHbWs.js","_app/immutable/chunks/index.BiHrnWhP.js","_app/immutable/chunks/vendor.DmZGV-Zx.js"];
export const stylesheets = ["_app/immutable/assets/index.BxBnBMjC.css"];
export const fonts = [];

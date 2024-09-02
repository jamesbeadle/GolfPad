

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B89i7lyA.js","_app/immutable/chunks/index.LUepee0g.js","_app/immutable/chunks/vendor.BwyyGVu-.js"];
export const stylesheets = ["_app/immutable/assets/index.RHWQ-I2N.css"];
export const fonts = [];

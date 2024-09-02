

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/bands-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.d7MP1T4t.js","_app/immutable/chunks/index.LUepee0g.js","_app/immutable/chunks/vendor.BwyyGVu-.js"];
export const stylesheets = ["_app/immutable/assets/index.RHWQ-I2N.css"];
export const fonts = [];

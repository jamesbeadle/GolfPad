

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/my-games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.D1FiK-cU.js","_app/immutable/chunks/index.LUepee0g.js","_app/immutable/chunks/vendor.BwyyGVu-.js"];
export const stylesheets = ["_app/immutable/assets/index.RHWQ-I2N.css"];
export const fonts = [];



export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/build-it-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DHzLO-un.js","_app/immutable/chunks/index.Do3Zrsl_.js","_app/immutable/chunks/vendor.O6SQ_f7z.js"];
export const stylesheets = ["_app/immutable/assets/index.RHWQ-I2N.css"];
export const fonts = [];

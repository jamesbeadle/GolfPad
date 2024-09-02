

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DoFnyVS4.js","_app/immutable/chunks/index.Do3Zrsl_.js","_app/immutable/chunks/vendor.O6SQ_f7z.js"];
export const stylesheets = ["_app/immutable/assets/index.RHWQ-I2N.css"];
export const fonts = [];

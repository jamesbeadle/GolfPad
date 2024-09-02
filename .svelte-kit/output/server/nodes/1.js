

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Dnzd14D7.js","_app/immutable/chunks/index.C-CZCAzZ.js","_app/immutable/chunks/vendor.CEty_Z-w.js"];
export const stylesheets = ["_app/immutable/assets/index.Bt00Q7EO.css"];
export const fonts = [];

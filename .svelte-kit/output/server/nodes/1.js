

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Bz0UgO2P.js","_app/immutable/chunks/index.prmv6z2R.js","_app/immutable/chunks/vendor.C00-OxwN.js"];
export const stylesheets = ["_app/immutable/assets/index.D3YEpmre.css"];
export const fonts = [];

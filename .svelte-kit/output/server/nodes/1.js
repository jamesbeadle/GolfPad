

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Bjlmtx9P.js","_app/immutable/chunks/index.CxDWTmSx.js","_app/immutable/chunks/vendor.BCNzAg2J.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

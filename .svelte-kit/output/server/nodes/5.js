

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/call-it-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.C__7C_u7.js","_app/immutable/chunks/index.CxDWTmSx.js","_app/immutable/chunks/vendor.BCNzAg2J.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];



export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/my-games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.CTw2_MQ8.js","_app/immutable/chunks/index.CxDWTmSx.js","_app/immutable/chunks/vendor.BCNzAg2J.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

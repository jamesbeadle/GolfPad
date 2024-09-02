

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DASyCX_w.js","_app/immutable/chunks/index.eOqCU9Pi.js","_app/immutable/chunks/vendor.DlnipW3I.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

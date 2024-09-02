

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CwDaUMRD.js","_app/immutable/chunks/index.eOqCU9Pi.js","_app/immutable/chunks/vendor.DlnipW3I.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

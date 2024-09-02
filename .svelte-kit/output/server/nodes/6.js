

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mulligans-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.CQ5-69gv.js","_app/immutable/chunks/index.eOqCU9Pi.js","_app/immutable/chunks/vendor.DlnipW3I.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];



export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.DSWTzAyR.js","_app/immutable/chunks/index.AL7_6eOs.js","_app/immutable/chunks/vendor.Bp8FYdqI.js"];
export const stylesheets = ["_app/immutable/assets/index.CCj0jOpc.css"];
export const fonts = [];

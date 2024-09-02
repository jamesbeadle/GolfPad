

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CclIm_Go.js","_app/immutable/chunks/index.BHhivtAJ.js","_app/immutable/chunks/vendor.CftMXUWp.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

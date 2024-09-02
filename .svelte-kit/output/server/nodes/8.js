

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/next-up-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.DfZBMbSG.js","_app/immutable/chunks/index.BHhivtAJ.js","_app/immutable/chunks/vendor.CftMXUWp.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

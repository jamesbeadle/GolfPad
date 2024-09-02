

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.T8y97mOd.js","_app/immutable/chunks/index.BHhivtAJ.js","_app/immutable/chunks/vendor.CftMXUWp.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

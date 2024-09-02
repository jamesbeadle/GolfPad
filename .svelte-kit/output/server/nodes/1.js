

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.CO8jnfOE.js","_app/immutable/chunks/index.BHhivtAJ.js","_app/immutable/chunks/vendor.CftMXUWp.js"];
export const stylesheets = ["_app/immutable/assets/index.BoN1elt3.css"];
export const fonts = [];

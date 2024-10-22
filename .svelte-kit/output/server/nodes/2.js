

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DWYLlXX-.js","_app/immutable/chunks/index.CVfsLBDj.js","_app/immutable/chunks/vendor.TQ29kNrX.js"];
export const stylesheets = ["_app/immutable/assets/index.BUAW2T5S.css"];
export const fonts = [];

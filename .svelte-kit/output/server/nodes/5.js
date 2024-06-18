

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CrgjATtV.js","_app/immutable/chunks/index.CvhkxTlY.js","_app/immutable/chunks/vendor.BOspZlzh.js"];
export const stylesheets = ["_app/immutable/assets/index.BxBnBMjC.css"];
export const fonts = [];

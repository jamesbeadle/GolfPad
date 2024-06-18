

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DRN0JH07.js","_app/immutable/chunks/index.CvhkxTlY.js","_app/immutable/chunks/vendor.BOspZlzh.js"];
export const stylesheets = ["_app/immutable/assets/index.BxBnBMjC.css"];
export const fonts = [];

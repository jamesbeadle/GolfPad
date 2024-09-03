

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.BgjDGro9.js","_app/immutable/chunks/index.CvulEMMK.js","_app/immutable/chunks/vendor.CVCYeHPJ.js"];
export const stylesheets = ["_app/immutable/assets/index.prZuCQfy.css"];
export const fonts = [];

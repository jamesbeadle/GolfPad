

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.MdMsDddQ.js","_app/immutable/chunks/index.CvulEMMK.js","_app/immutable/chunks/vendor.CVCYeHPJ.js"];
export const stylesheets = ["_app/immutable/assets/index.prZuCQfy.css"];
export const fonts = [];

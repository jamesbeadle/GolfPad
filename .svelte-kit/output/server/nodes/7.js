

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mulligans-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.C9FQDA2u.js","_app/immutable/chunks/index.CvulEMMK.js","_app/immutable/chunks/vendor.CVCYeHPJ.js"];
export const stylesheets = ["_app/immutable/assets/index.prZuCQfy.css"];
export const fonts = [];



export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.BaeqvIUf.js","_app/immutable/chunks/index.C6kicn_f.js","_app/immutable/chunks/vendor.Bxf7QH-s.js"];
export const stylesheets = ["_app/immutable/assets/index.CVLz95Iw.css"];
export const fonts = [];

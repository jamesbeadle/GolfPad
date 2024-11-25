

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DpEN6yNU.js","_app/immutable/chunks/index.C6kicn_f.js","_app/immutable/chunks/vendor.Bxf7QH-s.js"];
export const stylesheets = ["_app/immutable/assets/index.CVLz95Iw.css"];
export const fonts = [];

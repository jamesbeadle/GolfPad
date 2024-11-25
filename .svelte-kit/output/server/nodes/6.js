

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/create/_game_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.u_4cQVm8.js","_app/immutable/chunks/index.C6kicn_f.js","_app/immutable/chunks/vendor.Bxf7QH-s.js"];
export const stylesheets = ["_app/immutable/assets/index.CVLz95Iw.css"];
export const fonts = [];

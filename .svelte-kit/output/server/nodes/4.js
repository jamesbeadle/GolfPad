

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/build-it/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DCSg7C-M.js","_app/immutable/chunks/index.dznbf2_R.js","_app/immutable/chunks/vendor.YucVuqbZ.js"];
export const stylesheets = ["_app/immutable/assets/index.zczPTLyE.css"];
export const fonts = [];

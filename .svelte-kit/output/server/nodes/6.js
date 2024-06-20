

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mulligans/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.Cw2d3Epk.js","_app/immutable/chunks/index.dznbf2_R.js","_app/immutable/chunks/vendor.YucVuqbZ.js"];
export const stylesheets = ["_app/immutable/assets/index.zczPTLyE.css"];
export const fonts = [];

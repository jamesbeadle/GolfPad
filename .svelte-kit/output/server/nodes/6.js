

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mulligans/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.CJOamoFS.js","_app/immutable/chunks/index.DAzhlbzz.js","_app/immutable/chunks/vendor.Cdhnc6CE.js"];
export const stylesheets = ["_app/immutable/assets/index.oIWl4Svj.css"];
export const fonts = [];

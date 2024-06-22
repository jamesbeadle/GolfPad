

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.mmxbtJU1.js","_app/immutable/chunks/index.DAzhlbzz.js","_app/immutable/chunks/vendor.Cdhnc6CE.js"];
export const stylesheets = ["_app/immutable/assets/index.oIWl4Svj.css"];
export const fonts = [];

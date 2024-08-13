

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/build-it/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DumpW0IU.js","_app/immutable/chunks/index.DaBd1zFl.js","_app/immutable/chunks/vendor.BsO2_pcS.js"];
export const stylesheets = ["_app/immutable/assets/index.Bz-nz82C.css"];
export const fonts = [];

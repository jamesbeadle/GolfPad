

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/randomiser/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.Didkzr5s.js","_app/immutable/chunks/index.DaBd1zFl.js","_app/immutable/chunks/vendor.BsO2_pcS.js"];
export const stylesheets = ["_app/immutable/assets/index.Bz-nz82C.css"];
export const fonts = [];

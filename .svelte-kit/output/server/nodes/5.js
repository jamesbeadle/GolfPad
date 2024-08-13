

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/call-it/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BwO21P8I.js","_app/immutable/chunks/index.DaBd1zFl.js","_app/immutable/chunks/vendor.BsO2_pcS.js"];
export const stylesheets = ["_app/immutable/assets/index.Bz-nz82C.css"];
export const fonts = [];



export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/build-it/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.v20_KMxF.js","_app/immutable/chunks/index.BlHG6-7m.js","_app/immutable/chunks/vendor.CWHHILFp.js"];
export const stylesheets = ["_app/immutable/assets/index.2YfO8_wa.css"];
export const fonts = [];

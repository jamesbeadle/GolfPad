

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BIeEFSHH.js","_app/immutable/chunks/index.BlHG6-7m.js","_app/immutable/chunks/vendor.CWHHILFp.js"];
export const stylesheets = ["_app/immutable/assets/index.2YfO8_wa.css"];
export const fonts = [];

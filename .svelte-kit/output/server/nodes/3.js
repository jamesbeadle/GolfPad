

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/bands/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.-h0ZkvIT.js","_app/immutable/chunks/index.DTBSCD1U.js","_app/immutable/chunks/vendor.BHUHVawk.js"];
export const stylesheets = ["_app/immutable/assets/index.DCPuEF9z.css"];
export const fonts = [];

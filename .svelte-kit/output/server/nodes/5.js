

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DzzCv4w8.js","_app/immutable/chunks/index.BiHrnWhP.js","_app/immutable/chunks/vendor.DmZGV-Zx.js"];
export const stylesheets = ["_app/immutable/assets/index.BxBnBMjC.css"];
export const fonts = [];

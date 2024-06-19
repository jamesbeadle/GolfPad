

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/call-it/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BJAnX5wQ.js","_app/immutable/chunks/index.B1Y_2RJ4.js","_app/immutable/chunks/vendor.BmLocV_b.js"];
export const stylesheets = ["_app/immutable/assets/index.BDQfC_X4.css"];
export const fonts = [];

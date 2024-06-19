

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/build-it/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CgR6xp8_.js","_app/immutable/chunks/index.B1Y_2RJ4.js","_app/immutable/chunks/vendor.BmLocV_b.js"];
export const stylesheets = ["_app/immutable/assets/index.BDQfC_X4.css"];
export const fonts = [];

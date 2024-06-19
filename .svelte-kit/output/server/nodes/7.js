

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/my-games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.BBJvdmqA.js","_app/immutable/chunks/index.B1Y_2RJ4.js","_app/immutable/chunks/vendor.BmLocV_b.js"];
export const stylesheets = ["_app/immutable/assets/index.BDQfC_X4.css"];
export const fonts = [];

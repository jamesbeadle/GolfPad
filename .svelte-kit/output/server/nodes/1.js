

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ImaA9r_8.js","_app/immutable/chunks/index.BrTfyaVC.js","_app/immutable/chunks/vendor.HdQOBVzc.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

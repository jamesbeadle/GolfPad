

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.QsHyrRAg.js","_app/immutable/chunks/index.BrTfyaVC.js","_app/immutable/chunks/vendor.HdQOBVzc.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

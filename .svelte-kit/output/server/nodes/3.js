

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/bands-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.mBuIlqD-.js","_app/immutable/chunks/index.BrTfyaVC.js","_app/immutable/chunks/vendor.HdQOBVzc.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

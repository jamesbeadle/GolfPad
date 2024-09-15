

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/call-it-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CezbdXBJ.js","_app/immutable/chunks/index.BiC4zAwt.js","_app/immutable/chunks/vendor.P78CsThq.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

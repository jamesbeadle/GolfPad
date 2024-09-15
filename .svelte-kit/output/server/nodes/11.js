

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/prophet-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.BDBDjYqH.js","_app/immutable/chunks/index.BiC4zAwt.js","_app/immutable/chunks/vendor.P78CsThq.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

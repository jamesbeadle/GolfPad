

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.DmGanRqU.js","_app/immutable/chunks/index.BiC4zAwt.js","_app/immutable/chunks/vendor.P78CsThq.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

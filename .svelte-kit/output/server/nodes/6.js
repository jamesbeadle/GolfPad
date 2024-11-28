

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.CaiVy-Mr.js","_app/immutable/chunks/index.Dx6Aq0XN.js","_app/immutable/chunks/vendor.mAtUDueV.js"];
export const stylesheets = ["_app/immutable/assets/index.JTqfBvrz.css"];
export const fonts = [];

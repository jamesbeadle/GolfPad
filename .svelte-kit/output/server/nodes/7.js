

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/my-games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.CNh1j3_n.js","_app/immutable/chunks/index.Bl2xzmj3.js","_app/immutable/chunks/vendor.DAPb1f8w.js"];
export const stylesheets = ["_app/immutable/assets/index.B5h2FXDo.css"];
export const fonts = [];

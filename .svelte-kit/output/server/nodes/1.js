

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.mae4_Ypi.js","_app/immutable/chunks/index.Bl2xzmj3.js","_app/immutable/chunks/vendor.DAPb1f8w.js"];
export const stylesheets = ["_app/immutable/assets/index.B5h2FXDo.css"];
export const fonts = [];

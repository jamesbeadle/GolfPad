

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/bands-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CGBL7oSf.js","_app/immutable/chunks/index.Bl2xzmj3.js","_app/immutable/chunks/vendor.DAPb1f8w.js"];
export const stylesheets = ["_app/immutable/assets/index.B5h2FXDo.css"];
export const fonts = [];

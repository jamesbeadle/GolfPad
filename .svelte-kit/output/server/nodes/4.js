

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/build-it-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DnxVltUy.js","_app/immutable/chunks/index.Bl2xzmj3.js","_app/immutable/chunks/vendor.DAPb1f8w.js"];
export const stylesheets = ["_app/immutable/assets/index.B5h2FXDo.css"];
export const fonts = [];

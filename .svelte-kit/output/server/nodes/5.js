

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/call-it-new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.ChttFIzb.js","_app/immutable/chunks/index.Bl2xzmj3.js","_app/immutable/chunks/vendor.DAPb1f8w.js"];
export const stylesheets = ["_app/immutable/assets/index.B5h2FXDo.css"];
export const fonts = [];

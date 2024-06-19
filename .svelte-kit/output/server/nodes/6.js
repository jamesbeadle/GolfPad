

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mulligans/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.Dm2j7CtU.js","_app/immutable/chunks/index.DfYNUEXk.js","_app/immutable/chunks/vendor.gAh-YM8L.js"];
export const stylesheets = ["_app/immutable/assets/index.2YfO8_wa.css"];
export const fonts = [];

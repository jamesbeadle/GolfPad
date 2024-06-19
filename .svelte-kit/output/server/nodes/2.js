

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D8eTEqBe.js","_app/immutable/chunks/index.DfYNUEXk.js","_app/immutable/chunks/vendor.gAh-YM8L.js"];
export const stylesheets = ["_app/immutable/assets/index.2YfO8_wa.css"];
export const fonts = [];



export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/my-games/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.DysNvUnm.js","_app/immutable/chunks/index.DfYNUEXk.js","_app/immutable/chunks/vendor.gAh-YM8L.js"];
export const stylesheets = ["_app/immutable/assets/index.2YfO8_wa.css"];
export const fonts = [];

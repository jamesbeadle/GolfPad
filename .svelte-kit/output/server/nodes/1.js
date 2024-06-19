

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BcE6K9x-.js","_app/immutable/chunks/index.DfYNUEXk.js","_app/immutable/chunks/vendor.gAh-YM8L.js"];
export const stylesheets = ["_app/immutable/assets/index.2YfO8_wa.css"];
export const fonts = [];

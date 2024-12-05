

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/yardages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.DQipKOLo.js","_app/immutable/chunks/index.CcGU-OsC.js","_app/immutable/chunks/vendor.BiSOgKTJ.js"];
export const stylesheets = ["_app/immutable/assets/index.CEmQTtlV.css"];
export const fonts = [];

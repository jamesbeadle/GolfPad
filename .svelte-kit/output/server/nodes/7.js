

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_gameId_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.Cifk-tgG.js","_app/immutable/chunks/index.CcGU-OsC.js","_app/immutable/chunks/vendor.BiSOgKTJ.js"];
export const stylesheets = ["_app/immutable/assets/index.CEmQTtlV.css"];
export const fonts = [];

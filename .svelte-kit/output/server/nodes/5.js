

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/_gameId_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.OcsBbV_p.js","_app/immutable/chunks/index.prmv6z2R.js","_app/immutable/chunks/vendor.C00-OxwN.js"];
export const stylesheets = ["_app/immutable/assets/index.D3YEpmre.css"];
export const fonts = [];

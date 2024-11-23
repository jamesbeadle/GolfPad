

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game-rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.eIQ3Qe_-.js","_app/immutable/chunks/index.prmv6z2R.js","_app/immutable/chunks/vendor.C00-OxwN.js"];
export const stylesheets = ["_app/immutable/assets/index.D3YEpmre.css"];
export const fonts = [];

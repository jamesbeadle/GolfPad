

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/create/_game_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.D77Qjun5.js","_app/immutable/chunks/index.prmv6z2R.js","_app/immutable/chunks/vendor.C00-OxwN.js"];
export const stylesheets = ["_app/immutable/assets/index.D3YEpmre.css"];
export const fonts = [];

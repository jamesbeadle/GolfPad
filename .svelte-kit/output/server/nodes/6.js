

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/create/_game_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.CgJ8dGA7.js","_app/immutable/chunks/index.BwSqExf6.js","_app/immutable/chunks/vendor.CAYtD-Ba.js"];
export const stylesheets = ["_app/immutable/assets/index.D3YEpmre.css"];
export const fonts = [];

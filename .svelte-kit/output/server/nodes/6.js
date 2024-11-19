

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/games/create/_game_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.CK7L7Brf.js","_app/immutable/chunks/index.xxT0eudR.js","_app/immutable/chunks/vendor.ttZttkfp.js"];
export const stylesheets = ["_app/immutable/assets/index.mcahxQmT.css"];
export const fonts = [];

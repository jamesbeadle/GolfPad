

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game-rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.PpxFaGqi.js","_app/immutable/chunks/index.Cslrm2PG.js","_app/immutable/chunks/vendor.fe1RtBDO.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

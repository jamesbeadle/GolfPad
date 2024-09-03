

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.CWT2sNTM.js","_app/immutable/chunks/index.Cslrm2PG.js","_app/immutable/chunks/vendor.fe1RtBDO.js"];
export const stylesheets = ["_app/immutable/assets/index.BtJ9TXoC.css"];
export const fonts = [];

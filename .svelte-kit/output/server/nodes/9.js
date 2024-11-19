

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.C0dzVDsE.js","_app/immutable/chunks/index.xxT0eudR.js","_app/immutable/chunks/vendor.ttZttkfp.js"];
export const stylesheets = ["_app/immutable/assets/index.mcahxQmT.css"];
export const fonts = [];



export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/courses/_courseId_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CmgThkU8.js","_app/immutable/chunks/index.Dx6Aq0XN.js","_app/immutable/chunks/vendor.mAtUDueV.js"];
export const stylesheets = ["_app/immutable/assets/index.JTqfBvrz.css"];
export const fonts = [];

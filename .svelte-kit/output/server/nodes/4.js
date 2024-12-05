

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/courses/_courseId_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DmO3Cb8N.js","_app/immutable/chunks/index.CcGU-OsC.js","_app/immutable/chunks/vendor.BiSOgKTJ.js"];
export const stylesheets = ["_app/immutable/assets/index.CEmQTtlV.css"];
export const fonts = [];

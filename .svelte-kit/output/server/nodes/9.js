

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.DcXbba8j.js","_app/immutable/chunks/index.BwSqExf6.js","_app/immutable/chunks/vendor.CAYtD-Ba.js"];
export const stylesheets = ["_app/immutable/assets/index.D3YEpmre.css"];
export const fonts = [];

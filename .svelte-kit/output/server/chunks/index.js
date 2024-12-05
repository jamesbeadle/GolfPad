import { D as DEV, B as BROWSER } from "./vendor.js";
import * as devalue from "devalue";
import { Buffer } from "buffer";
import { parse, serialize } from "cookie";
import * as set_cookie_parser from "set-cookie-parser";
import { nonNullish } from "@dfinity/utils";
import "dompurify";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
let base = "";
let assets = base;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
const SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
const ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
const PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
class HttpError {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Redirect {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
}
class SvelteKitError extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
}
class ActionFailure {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
const encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
const internal = new URL("sveltekit-internal://");
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
const tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
const DATA_SUFFIX = "/__data.json";
const HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server) {
  const actions = server?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server) {
  const actions = server?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data — received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function validate_action_return(data) {
  if (data instanceof Redirect) {
    throw new Error("Cannot `return redirect(...)` — use `redirect(...)` instead");
  }
  if (data instanceof HttpError) {
    throw new Error("Cannot `return error(...)` — use `error(...)` or `return fail(...)` instead");
  }
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, devalue.uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, devalue.stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "") message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
const INVALIDATED_PARAM = "x-sveltekit-invalidated";
const TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" — it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function noop() {
}
function is_promise(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof /** @type {any} */
  value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component") name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean) return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
const escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
const escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
const replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
const s = JSON.stringify;
const encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
const init = new Uint32Array(8);
const key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
const array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
const quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
const crypto_pattern = /^(nonce|sha\d\d\d)-/;
class BaseProvider {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
}
class CspProvider extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
}
class CspReportOnlyProvider extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
}
class Csp {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
}
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
const updated = {
  ...readable(false),
  check: () => false
};
const encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest._;
  const modulepreloads = new Set(client.imports);
  const stylesheets = new Set(client.stylesheets);
  const fonts = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets.add(url);
      for (const url of node.fonts) fonts.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = devalue.uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${devalue.uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = devalue.uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = devalue.uneval({ id, data, error }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${devalue.uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
const encoder = new TextEncoder();
async function render_data(event, route, options2, manifest, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = devalue.stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = devalue.stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${devalue.stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest._.nodes[n]()),
    manifest._.nodes[page2.leaf]()
  ]);
}
const MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(() => {
    });
    for (const p of load_promises) p.catch(() => {
    });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest._.nodes[index]();
              let j = i;
              while (!branch[j]) j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = parse(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return serialize(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = parse(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", serialize(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", serialize(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest.assets.has(filename);
        const is_asset_html = manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
const valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
const valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
const valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
const valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
const valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
const validate_layout_exports = validator(valid_layout_exports);
const validate_page_exports = validator(valid_page_exports);
const validate_layout_server_exports = validator(valid_layout_server_exports);
const validate_page_server_exports = validator(valid_page_server_exports);
const validate_server_exports = validator(valid_server_exports);
let body;
let etag;
let headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config) continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
const default_transform = ({ html }) => html;
const default_filter = () => false;
const default_preload = ({ type }) => type === "js" || type === "css";
const page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
const allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest._.matchers();
    for (const candidate of manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-static"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest);
        if (DEV) ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    } else if (state.emulator?.platform) {
      event.platform = await state.emulator.platform({
        config: {},
        prerender: !!state.prerendering?.fallback
      });
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback) disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function afterUpdate() {
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
const browser = BROWSER;
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
function set_read_implementation(fn) {
}
function set_manifest(_) {
}
const options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta content="width=device-width, initial-scale=1" name="viewport" />\n\n    <title>GOLFPAD</title>\n    <link href="https://golfpad.xyz" rel="canonical" />\n    <meta\n      content="GOLFPAD is a Web3 social golf platform."\n      name="description"\n    />\n    <meta content="GOLFPAD" property="og:title" />\n    <meta\n      content="GOLFPAD is a Web3 social golf platform."\n      property="og:description"\n    />\n    <meta content="website" property="og:type" />\n    <meta content="https://golfpad.xyz" property="og:url" />\n    <meta content="https://golfpad.xyz/meta-share.jpg" property="og:image" />\n    <meta content="summary_large_image" name="twitter:card" />\n    <meta content="GOLFPAD" name="twitter:title" />\n    <meta\n      content="GOLFPAD is a Web3 social golf platform."\n      name="twitter:description"\n    />\n    <meta content="https://golfpad.xyz/meta-share.jpg" name="twitter:image" />\n    <meta content="@beadle1989" name="twitter:creator" />\n\n    <link crossorigin="anonymous" href="/manifest.webmanifest" rel="manifest" />\n\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="32x32"\n      href="' + assets2 + '/favicons/favicon-32x32.png"\n    />\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="16x16"\n      href="' + assets2 + '/favicons/favicon-16x16.png"\n    />\n    <link rel="shortcut icon" href="' + assets2 + '/favicons/favicon.ico" />\n\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="#2CE3A6" />\n    <meta name="apple-mobile-web-app-title" content="GOLFPAD" />\n    <link\n      rel="apple-touch-icon"\n      href="' + assets2 + '/favicons/apple-touch-icon.png"\n    />\n    <link\n      rel="mask-icon"\n      href="' + assets2 + '/favicons/safari-pinned-tab.svg"\n      color="#2CE3A6"\n    />\n\n    <meta name="msapplication-TileColor" content="#101111" />\n    <meta\n      name="msapplication-config"\n      content="' + assets2 + '/favicons/browserconfig.xml"\n    />\n\n    <!-- Preloaded images -->\n    <link rel="preload" href="/golfball.png" as="image" />\n    <link rel="preload" href="/golfball_mobile.png" as="image" />\n    <link rel="preload" href="/boat.png" as="image" />\n    <link rel="preload" href="/panel-bg.png" as="image" />\n    <link rel="preload" href="/roadmap.png" as="image" />\n    <link rel="preload" href="/token.png" as="image" />\n\n    <link rel="preload" href="/bands.png" as="image" />\n    <link rel="preload" href="/bands-game.png" as="image" />\n    <link rel="preload" href="/build-it.png" as="image" />\n    <link rel="preload" href="/build-it-game.png" as="image" />\n    <link rel="preload" href="/next-up.png" as="image" />\n    <link rel="preload" href="/next-up-game.png" as="image" />\n    <link rel="preload" href="/mulligans.png" as="image" />\n    <link rel="preload" href="/mulligans-game.png" as="image" />\n\n    <link rel="preload" href="/team/dfd.jpg" as="image" />\n    <link rel="preload" href="/team/george.jpg" as="image" />\n    <link rel="preload" href="/team/james.jpg" as="image" />\n    <link rel="preload" href="/team/josh.jpg" as="image" />\n    <link rel="preload" href="/team/kelly.jpeg" as="image" />\n    <link rel="preload" href="/team/zoe.jpg" as="image" />\n\n    <link\n      rel="preload"\n      href="/MonaSans-Regular.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n    <link\n      rel="preload"\n      href="/MonaSans-SemiBold.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n    <link\n      rel="preload"\n      href="/MonaSansCondensed-ExtraBold.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n    <link\n      rel="preload"\n      href="/MonaSansCondensed-Regular.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n\n    <meta content="#2CE3A6" name="theme-color" />\n    ' + head + '\n\n    <style>\n      :root {\n        --GolfPadYellow: #f4c802;\n      }\n\n      html,\n      body {\n        height: 100%;\n        margin: 0;\n      }\n\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSans-Regular.woff2") format("woff2");\n      }\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans Semi Bold";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSans-SemiBold.woff2") format("woff2");\n      }\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans Condensed";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSansCondensed-Regular.woff2")\n          format("woff2");\n      }\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans Condensed Extra Bold";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSansCondensed-ExtraBold.woff2")\n          format("woff2");\n      }\n      body {\n        font-family: "Mona Sans", sans-serif !important;\n        color: white !important;\n        height: 100vh;\n        margin: 0;\n        background-color: var(--GolfPadYellow);\n      }\n\n      #app-spinner {\n        --spinner-size: 30px;\n\n        width: var(--spinner-size);\n        height: var(--spinner-size);\n\n        animation: app-spinner-linear-rotate 2000ms linear infinite;\n\n        position: absolute;\n        top: calc(50% - (var(--spinner-size) / 2));\n        left: calc(50% - (var(--spinner-size) / 2));\n\n        --radius: 45px;\n        --circumference: calc(3.14159265359 * var(--radius) * 2);\n\n        --start: calc((1 - 0.05) * var(--circumference));\n        --end: calc((1 - 0.8) * var(--circumference));\n      }\n\n      #app-spinner circle {\n        stroke-dasharray: var(--circumference);\n        stroke-width: 10%;\n        transform-origin: 50% 50% 0;\n\n        transition-property: stroke;\n\n        animation-name: app-spinner-stroke-rotate-100;\n        animation-duration: 4000ms;\n        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n        animation-iteration-count: infinite;\n\n        fill: transparent;\n        stroke: currentColor;\n\n        transition: stroke-dashoffset 225ms linear;\n      }\n\n      @keyframes app-spinner-linear-rotate {\n        0% {\n          transform: rotate(0deg);\n        }\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes app-spinner-stroke-rotate-100 {\n        0% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(0);\n        }\n        12.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(0);\n        }\n        12.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n        25% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n\n        25.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(270deg);\n        }\n        37.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(270deg);\n        }\n        37.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n        50% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n\n        50.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(180deg);\n        }\n        62.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(180deg);\n        }\n        62.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n        75% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n\n        75.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(90deg);\n        }\n        87.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(90deg);\n        }\n        87.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n        100% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n      }\n    </style>\n  </head>\n  <body data-sveltekit-preload-data="hover">\n    <div style="display: contents">' + body2 + '</div>\n\n    <svg\n      id="app-spinner"\n      preserveAspectRatio="xMidYMid meet"\n      focusable="false"\n      aria-hidden="true"\n      data-tid="spinner"\n      viewBox="0 0 100 100"\n    >\n      <circle cx="50%" cy="50%" r="45" />\n    </svg>\n  </body>\n</html>\n',
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1eiyqeu"
};
async function get_hooks() {
  return {};
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
const prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
class Server {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest) {
    this.#options = options;
    this.#manifest = manifest;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
}
const Layout$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
function get(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});
const AUTH_MAX_TIME_TO_LIVE = BigInt(
  60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14
);
const AUTH_POPUP_WIDTH = 576;
const AUTH_POPUP_HEIGHT = 625;
const createAuthClient = () => AuthClient.create({
  idleOptions: {
    disableIdle: true,
    disableDefaultIdleCallback: true
  }
});
const popupCenter = ({
  width,
  height
}) => {
  {
    return void 0;
  }
};
let authClient;
const NNS_IC_ORG_ALTERNATIVE_ORIGIN = "https://golfpad.xyz";
const NNS_IC_APP_DERIVATION_ORIGIN = "https://gw4gh-taaaa-aaaal-qjfia-cai.icp0.io";
const isNnsAlternativeOrigin = () => {
  if (typeof window === "undefined") return false;
  return window.location.origin === NNS_IC_ORG_ALTERNATIVE_ORIGIN;
};
const initAuthStore = () => {
  const { subscribe: subscribe2, set, update } = writable({
    identity: void 0
  });
  return {
    subscribe: subscribe2,
    sync: async () => {
      authClient = authClient ?? await createAuthClient();
      const isAuthenticated = await authClient.isAuthenticated();
      set({
        identity: isAuthenticated ? authClient.getIdentity() : null
      });
    },
    signIn: ({ domain }) => (
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve2, reject) => {
        authClient = authClient ?? await createAuthClient();
        const identityProvider = domain;
        await authClient?.login({
          maxTimeToLive: AUTH_MAX_TIME_TO_LIVE,
          onSuccess: () => {
            update((state) => ({
              ...state,
              identity: authClient?.getIdentity()
            }));
            resolve2();
          },
          onError: reject,
          identityProvider,
          ...isNnsAlternativeOrigin() && {
            derivationOrigin: NNS_IC_APP_DERIVATION_ORIGIN
          },
          windowOpenerFeatures: popupCenter({
            width: AUTH_POPUP_WIDTH,
            height: AUTH_POPUP_HEIGHT
          })
        });
      })
    ),
    signOut: async () => {
      const client = authClient ?? await createAuthClient();
      await client.logout();
      authClient = null;
      update((state) => ({
        ...state,
        identity: null
      }));
      localStorage.removeItem("user_profile_data");
    }
  };
};
const authStore = initAuthStore();
const adminPrincipal = "nn75s-ayupf-j6mj3-kluyb-wjj7y-eang2-dwzzr-cfdxk-etbw7-cgwnb-lqe";
const authSignedInStore = derived(
  authStore,
  ({ identity }) => identity !== null && identity !== void 0
);
derived(
  authStore,
  ({ identity }) => identity !== null && identity !== void 0 && identity.getPrincipal().toString() === adminPrincipal
);
function isError(response) {
  return response && response.err !== void 0;
}
function uint8ArrayToBase64(bytes) {
  const binary = Array.from(bytes).map((byte) => String.fromCharCode(byte)).join("");
  return btoa(binary);
}
const idlFactory = ({ IDL }) => {
  const PrincipalId = IDL.Text;
  const AcceptFriendRequestDTO = IDL.Record({ "requestedBy": PrincipalId });
  const Error2 = IDL.Variant({
    "InvalidProfilePicture": IDL.Null,
    "DecodeError": IDL.Null,
    "TooLong": IDL.Null,
    "NotAllowed": IDL.Null,
    "NotEnoughFunds": IDL.Null,
    "TooShort": IDL.Null,
    "NotFound": IDL.Null,
    "NotAuthorized": IDL.Null,
    "AlreadyExists": IDL.Null,
    "CreateGameError": IDL.Null,
    "OutOfRange": IDL.Null,
    "PaymentError": IDL.Null,
    "CanisterFull": IDL.Null
  });
  const Result = IDL.Variant({ "ok": IDL.Null, "err": Error2 });
  const GameId = IDL.Nat;
  const AcceptGameInviteDTO = IDL.Record({
    "gameId": GameId,
    "acceptedById": PrincipalId
  });
  const HoleNumber = IDL.Nat8;
  const MulligansScoreDTO = IDL.Record({
    "golfer2MulliganUsed": IDL.Bool,
    "winner": PrincipalId,
    "golfer1MulliganUsed": IDL.Bool,
    "holeNumber": HoleNumber
  });
  const GameScoreSubmissionDTO = IDL.Variant({
    "MulligansScores": MulligansScoreDTO
  });
  const AddGameScoreDTO = IDL.Record({
    "gameId": GameId,
    "detail": GameScoreSubmissionDTO
  });
  const BeginGameDTO = IDL.Record({ "gameId": GameId });
  const GameType = IDL.Variant({
    "Mulligans": IDL.Null,
    "BuildIt": IDL.Null,
    "Bands": IDL.Null,
    "NextUp": IDL.Null,
    "Prophet": IDL.Null
  });
  const CourseType = IDL.Variant({
    "Custom": IDL.Null,
    "Official": IDL.Null
  });
  const GolfCourseId = IDL.Nat;
  const CreateGameDTO = IDL.Record({
    "inviteIds": IDL.Vec(PrincipalId),
    "createdById": PrincipalId,
    "teeOffTime": IDL.Int,
    "gameType": GameType,
    "courseType": CourseType,
    "courseId": GolfCourseId,
    "teeGroup": IDL.Text
  });
  const TeeInfo = IDL.Record({
    "par": IDL.Nat8,
    "name": IDL.Text,
    "yardage": IDL.Nat,
    "colour": IDL.Text,
    "strokeIndex": IDL.Nat8
  });
  const CanisterId = IDL.Text;
  const ImageId = IDL.Nat;
  const Hole = IDL.Record({
    "name": IDL.Text,
    "tees": IDL.Vec(TeeInfo),
    "number": IDL.Nat8,
    "images": IDL.Vec(IDL.Tuple(CanisterId, ImageId))
  });
  const TeeGroup = IDL.Record({
    "added": IDL.Int,
    "holes": IDL.Vec(Hole),
    "name": IDL.Text,
    "colour": IDL.Text,
    "strokeIndex": IDL.Nat8
  });
  const CreateGolfCourseDTO = IDL.Record({
    "holes": IDL.Vec(Hole),
    "name": IDL.Text,
    "initialTeeGroup": TeeGroup
  });
  const Handicap2 = IDL.Int16;
  const CreateGolferDTO = IDL.Record({
    "username": IDL.Text,
    "handicap": IDL.Opt(Handicap2)
  });
  const ClubIndex = IDL.Nat16;
  const YardageClub = IDL.Record({
    "name": IDL.Text,
    "index": ClubIndex,
    "yards": IDL.Nat16
  });
  const CreateYardageSetDTO = IDL.Record({
    "clubs": IDL.Vec(YardageClub),
    "name": IDL.Text
  });
  const DeleteGolfCourseDTO = IDL.Record({ "courseId": GolfCourseId });
  const YardageSetId = IDL.Nat16;
  const DeleteYardageSetDTO = IDL.Record({ "yardageSetId": YardageSetId });
  const UpdateGolfCourseDTO = IDL.Record({
    "name": IDL.Text,
    "updatedTeeGroup": IDL.Opt(TeeGroup),
    "courseId": GolfCourseId
  });
  const PaginationFilters = IDL.Record({
    "offset": IDL.Nat,
    "limit": IDL.Nat
  });
  const GameStatus = IDL.Variant({
    "Unplayed": IDL.Null,
    "Active": IDL.Null,
    "Complete": IDL.Null
  });
  const MulligansHoleResult = IDL.Record({
    "golfer2MulliganUsed": IDL.Bool,
    "winner": PrincipalId,
    "golfer1MulliganUsed": IDL.Bool,
    "holeNumber": HoleNumber
  });
  const MulligansScores = IDL.Record({
    "winner": PrincipalId,
    "results": IDL.Vec(MulligansHoleResult),
    "golfer2HolesWonCount": IDL.Nat8,
    "golfer1HolesWonCount": IDL.Nat8
  });
  const GameScoreDetail = IDL.Variant({ "MulligansScores": MulligansScores });
  const MulligansPrediction = IDL.Record({});
  const BandsPrediction = IDL.Record({
    "wontHitTreeOrBunkerStartHole": HoleNumber,
    "underParStartHole": HoleNumber,
    "golferId": PrincipalId,
    "wontDoubleBogeyStartHole": HoleNumber,
    "singlePutt2Of3GreensStartHole": HoleNumber,
    "wontBogeyStartHole": HoleNumber,
    "parOrUnderStartHole": HoleNumber,
    "hit2Of3FairwaysStartHole": HoleNumber,
    "hit2Of3GreensStartHole": HoleNumber,
    "wontLoseBallStartHole": HoleNumber
  });
  const GamePrediction = IDL.Variant({
    "Mulligans": MulligansPrediction,
    "BuildIt": IDL.Record({}),
    "Bands": BandsPrediction,
    "NextUp": IDL.Record({})
  });
  const GolfCourseVersion = IDL.Nat8;
  const GolfCourseSnapshot = IDL.Record({
    "courseVersion": GolfCourseVersion,
    "courseId": GolfCourseId,
    "teeGroup": TeeGroup
  });
  const GolfEvent = IDL.Variant({
    "Par": IDL.Null,
    "Scrub": IDL.Null,
    "DoubleBogey": IDL.Null,
    "Birdie": IDL.Null,
    "BallNotLost": IDL.Null,
    "Bogey": IDL.Null,
    "HitFairway": IDL.Null,
    "Albatross": IDL.Null,
    "HitBunker": IDL.Null,
    "HitTree": IDL.Null,
    "HitGreen": IDL.Null,
    "TakeMulligan": IDL.Null,
    "HitWater": IDL.Null,
    "LongestDrive": IDL.Null,
    "Eagle": IDL.Null,
    "OnePuttGreen": IDL.Null
  });
  const GolferEvent = IDL.Record({
    "golferId": PrincipalId,
    "hole": HoleNumber,
    "event": GolfEvent
  });
  const GameDTO = IDL.Record({
    "id": GameId,
    "playerIds": IDL.Vec(PrincipalId),
    "status": GameStatus,
    "scoreDetail": IDL.Opt(GameScoreDetail),
    "invites": IDL.Vec(PrincipalId),
    "predictions": IDL.Vec(GamePrediction),
    "winner": PrincipalId,
    "teeOffTime": IDL.Int,
    "courseSnapshot": GolfCourseSnapshot,
    "events": IDL.Vec(GolferEvent),
    "gameType": GameType,
    "courseId": GolfCourseId
  });
  const Result_11 = IDL.Variant({ "ok": IDL.Vec(GameDTO), "err": Error2 });
  const GetGameDTO = IDL.Record({ "gameId": GameId });
  const Result_10 = IDL.Variant({ "ok": GameDTO, "err": Error2 });
  const GetGolferDTO = IDL.Record({ "golferPrincipalId": PrincipalId });
  const GameInvite = IDL.Record({
    "gameId": GameId,
    "inviteFrom": PrincipalId
  });
  const GolferDTO = IDL.Record({
    "username": IDL.Text,
    "gameInvites": IDL.Vec(GameInvite),
    "upcomingGames": IDL.Vec(GameId),
    "golferPicture": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "completedGames": IDL.Vec(GameId),
    "handicap": IDL.Opt(Handicap2),
    "golferPictureExtension": IDL.Text,
    "principalId": PrincipalId,
    "activeGames": IDL.Vec(GameId)
  });
  const Result_9 = IDL.Variant({ "ok": GolferDTO, "err": Error2 });
  const GolferBuzzDTO = IDL.Record({});
  const Result_8 = IDL.Variant({ "ok": GolferBuzzDTO, "err": Error2 });
  const GameSummary = IDL.Record({
    "status": GameStatus,
    "date": IDL.Int,
    "players": IDL.Vec(PrincipalId),
    "gameType": GameType
  });
  const GolferGameSummariesDTO = IDL.Record({
    "totalEntries": IDL.Nat,
    "offset": IDL.Nat,
    "limit": IDL.Nat,
    "entries": IDL.Vec(GameSummary)
  });
  const Result_7 = IDL.Variant({
    "ok": GolferGameSummariesDTO,
    "err": Error2
  });
  const MyGolferDTO = IDL.Record({
    "username": IDL.Text,
    "golferPicture": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "handicap": IDL.Opt(Handicap2),
    "golferPictureExtension": IDL.Text,
    "principalId": PrincipalId
  });
  const Result_6 = IDL.Variant({ "ok": MyGolferDTO, "err": Error2 });
  const UpcomingGamesDTO = IDL.Record({});
  const Result_5 = IDL.Variant({ "ok": UpcomingGamesDTO, "err": Error2 });
  const GetYardageSetDTO = IDL.Record({ "yardageSetId": YardageSetId });
  const YardageSetDTO = IDL.Record({});
  const Result_4 = IDL.Variant({ "ok": YardageSetDTO, "err": Error2 });
  const GolfCourseDTO = IDL.Record({
    "activeVersion": GolfCourseVersion,
    "name": IDL.Text,
    "tees": IDL.Vec(TeeGroup),
    "courseId": GolfCourseId
  });
  const CoursesDTO = IDL.Record({ "courses": IDL.Vec(GolfCourseDTO) });
  const Result_3 = IDL.Variant({ "ok": CoursesDTO, "err": Error2 });
  const FriendRequestDTO = IDL.Record({
    "requestTime": IDL.Int,
    "principalId": PrincipalId
  });
  const FriendRequestsDTO = IDL.Record({
    "friendRequests": IDL.Vec(FriendRequestDTO)
  });
  const Result_2 = IDL.Variant({ "ok": FriendRequestsDTO, "err": Error2 });
  const ListGolfersDTO = IDL.Record({ "searchTerm": IDL.Text });
  const GolferSummaryDTO = IDL.Record({
    "golferPrincipalId": PrincipalId,
    "golferPicture": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "golferName": IDL.Text,
    "handicap": IDL.Opt(Handicap2),
    "golferPictureExtension": IDL.Text
  });
  const GolfersDTO = IDL.Record({ "golfers": IDL.Vec(GolferSummaryDTO) });
  const Result_1 = IDL.Variant({ "ok": GolfersDTO, "err": Error2 });
  const RejectFriendRequestDTO = IDL.Record({ "requestedBy": PrincipalId });
  const UpdateGolferPictureDTO = IDL.Record({
    "golferPicture": IDL.Vec(IDL.Nat8),
    "golferPictureExtension": IDL.Text
  });
  const SendFriendRequestDTO = IDL.Record({ "requestedFriend": PrincipalId });
  const InviteGolfersDTO = IDL.Record({
    "gameId": GameId,
    "invitedGolferIds": IDL.Vec(PrincipalId)
  });
  const UpdateGolferDTO = IDL.Record({
    "username": IDL.Text,
    "handicap": IDL.Opt(Handicap2)
  });
  const UpdateYardageSetDTO = IDL.Record({
    "clubs": IDL.Vec(YardageClub),
    "name": IDL.Text,
    "yardageSetId": YardageSetId
  });
  const RustResult = IDL.Variant({ "Ok": IDL.Text, "Err": IDL.Text });
  return IDL.Service({
    "acceptFriendRequest": IDL.Func([AcceptFriendRequestDTO], [Result], []),
    "acceptGameInvite": IDL.Func([AcceptGameInviteDTO], [Result], []),
    "addGameScore": IDL.Func([AddGameScoreDTO], [Result], []),
    "beginGame": IDL.Func([BeginGameDTO], [Result], []),
    "createGame": IDL.Func([CreateGameDTO], [Result], []),
    "createGolfCourse": IDL.Func([CreateGolfCourseDTO], [Result], []),
    "createGolfer": IDL.Func([CreateGolferDTO], [Result], []),
    "createYardageSet": IDL.Func([CreateYardageSetDTO], [Result], []),
    "deleteGolfCourse": IDL.Func([DeleteGolfCourseDTO], [Result], []),
    "deleteYardageSet": IDL.Func([DeleteYardageSetDTO], [Result], []),
    "executeAddGolfCourse": IDL.Func([CreateGolfCourseDTO], [], []),
    "executeUpdateGolfCourse": IDL.Func([UpdateGolfCourseDTO], [], []),
    "getDummyGames": IDL.Func([PaginationFilters], [Result_11], []),
    "getGame": IDL.Func([GetGameDTO], [Result_10], []),
    "getGolfer": IDL.Func([GetGolferDTO], [Result_9], []),
    "getGolferBuzz": IDL.Func([PaginationFilters], [Result_8], []),
    "getGolferGameHistory": IDL.Func([PaginationFilters], [Result_7], []),
    "getMyGames": IDL.Func([PaginationFilters], [Result_7], []),
    "getMyGolfer": IDL.Func([], [Result_6], []),
    "getUpcomingGames": IDL.Func([PaginationFilters], [Result_5], []),
    "getYardageSet": IDL.Func([GetYardageSetDTO], [Result_4], []),
    "listCourses": IDL.Func([PaginationFilters], [Result_3], []),
    "listFriendRequests": IDL.Func([PaginationFilters], [Result_2], []),
    "listGolfers": IDL.Func([ListGolfersDTO], [Result_1], []),
    "rejectFriendRequest": IDL.Func([RejectFriendRequestDTO], [Result], []),
    "saveGolferPicture": IDL.Func([UpdateGolferPictureDTO], [Result], []),
    "sendFriendRequest": IDL.Func([SendFriendRequestDTO], [Result], []),
    "sendGameInvites": IDL.Func([InviteGolfersDTO], [Result], []),
    "updateGolfCourse": IDL.Func([UpdateGolfCourseDTO], [Result], []),
    "updateGolfer": IDL.Func([UpdateGolferDTO], [Result], []),
    "updateYardageSet": IDL.Func([UpdateYardageSetDTO], [Result], []),
    "validateAddGolfCourse": IDL.Func(
      [CreateGolfCourseDTO],
      [RustResult],
      ["query"]
    ),
    "validateUpdateGolfCourse": IDL.Func(
      [UpdateGolfCourseDTO],
      [RustResult],
      ["query"]
    )
  });
};
var define_process_env_default$3 = { __CANDID_UI_CANISTER_ID: "br5f7-7uaaa-aaaaa-qaaca-cai", BACKEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", FRONTEND_CANISTER_ID: "be2us-64aaa-aaaaa-qaabq-cai", DFX_NETWORK: "local" };
const canisterId = define_process_env_default$3.CANISTER_ID_BACKEND;
const createActor = (canisterId2, options2 = {}) => {
  const agent = options2.agent || new HttpAgent({ ...options2.agentOptions });
  if (options2.agent && options2.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }
  {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId2,
    ...options2.actorOptions
  });
};
canisterId ? createActor(canisterId) : void 0;
class ActorFactory {
  static createActor(idlFactory2, canisterId2 = "", identity = null, options2 = null) {
    const hostOptions = {
      host: "http://localhost:8080",
      identity
    };
    if (!options2) {
      options2 = {
        agentOptions: hostOptions
      };
    } else if (!options2.agentOptions) {
      options2.agentOptions = hostOptions;
    } else {
      options2.agentOptions.host = hostOptions.host;
    }
    const agent = new HttpAgent({ ...options2.agentOptions });
    {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Ensure your local replica is running"
        );
        console.error(err);
      });
    }
    return Actor.createActor(idlFactory2, {
      agent,
      canisterId: canisterId2,
      ...options2?.actorOptions
    });
  }
  static getAgent(canisterId2 = "", identity = null, options2 = null) {
    const hostOptions = {
      host: "http://localhost:8080",
      identity
    };
    if (!options2) {
      options2 = {
        agentOptions: hostOptions
      };
    } else if (!options2.agentOptions) {
      options2.agentOptions = hostOptions;
    } else {
      options2.agentOptions.host = hostOptions.host;
    }
    return new HttpAgent({ ...options2.agentOptions });
  }
  static createIdentityActor(authStore2, canisterId2) {
    let unsubscribe;
    return new Promise((resolve2, reject) => {
      unsubscribe = authStore2.subscribe((store) => {
        if (store.identity) {
          resolve2(store.identity);
        }
      });
    }).then((identity) => {
      unsubscribe();
      return ActorFactory.createActor(idlFactory, canisterId2, identity);
    });
  }
  static getGovernanceAgent(identity = null, options2 = null) {
    const hostOptions = {
      host: "http://localhost:8080",
      identity
    };
    if (!options2) {
      options2 = {
        agentOptions: hostOptions
      };
    } else if (!options2.agentOptions) {
      options2.agentOptions = hostOptions;
    } else {
      options2.agentOptions.host = hostOptions.host;
    }
    return new HttpAgent({ ...options2.agentOptions });
  }
}
var define_process_env_default$2 = { __CANDID_UI_CANISTER_ID: "br5f7-7uaaa-aaaaa-qaaca-cai", BACKEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", FRONTEND_CANISTER_ID: "be2us-64aaa-aaaaa-qaabq-cai", DFX_NETWORK: "local" };
class UserService {
  constructor() {
    authStore.sync();
  }
  async isAdmin() {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      define_process_env_default$2.BACKEND_CANISTER_ID
    );
    const result = await identityActor.isAdmin();
    if (isError(result)) {
      throw new Error("Failed to check is admin");
    }
    return result.ok;
  }
}
var define_process_env_default$1 = { __CANDID_UI_CANISTER_ID: "br5f7-7uaaa-aaaaa-qaaca-cai", BACKEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", FRONTEND_CANISTER_ID: "be2us-64aaa-aaaaa-qaabq-cai", DFX_NETWORK: "local" };
function createUserStore() {
  const { subscribe: subscribe2, set } = writable(null);
  async function sync() {
    let localStorageString = localStorage.getItem("user_profile_data");
    if (localStorageString) {
      const localProfile = JSON.parse(localStorageString);
      set(localProfile);
      console.log("Existing User");
      return false;
    }
    try {
      await cacheProfile();
      console.log("New User");
      return true;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
  async function isAdmin() {
    return new UserService().isAdmin();
  }
  async function createUser(username, handicap) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        define_process_env_default$1.BACKEND_CANISTER_ID ?? ""
      );
      try {
        let dto = {
          username,
          handicap
        };
        const result = await identityActor.createGolfer(dto);
        return result;
      } catch (error) {
        console.error("Error updating profile picture:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async function updateUser(updatedUser) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        define_process_env_default$1.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.updateUserDetail(updatedUser);
      sync();
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async function updateProfilePicture(picture) {
    try {
      const maxPictureSize = 1e3;
      const extension = getFileExtensionFromFile(picture);
      if (picture.size > maxPictureSize * 1024) {
        return null;
      }
      const reader = new FileReader();
      reader.readAsArrayBuffer(picture);
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        try {
          const identityActor = await ActorFactory.createIdentityActor(
            authStore,
            define_process_env_default$1.BACKEND_CANISTER_ID ?? ""
          );
          let dto = {
            golferPicture: uint8Array,
            golferPictureExtension: extension
          };
          const result = await identityActor.updateUserPicture(dto);
          if (isError(result)) {
            console.error("Error updating profile picture");
            return;
          }
          await cacheProfile();
          return result;
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  }
  function getFileExtensionFromFile(file) {
    const filename = file.name;
    const lastIndex = filename.lastIndexOf(".");
    return lastIndex !== -1 ? filename.substring(lastIndex + 1) : "";
  }
  async function isUsernameAvailable(username) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        define_process_env_default$1.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.isUsernameTaken(username);
      return result;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }
  async function cacheProfile() {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      define_process_env_default$1.BACKEND_CANISTER_ID
    );
    let getProfileResponse = await identityActor.getMyGolfer();
    console.log("getProfileResponse: ", getProfileResponse);
    let error = isError(getProfileResponse);
    if (error) {
      console.error("Error fetching user profile");
      return;
    }
    let profileData = getProfileResponse.ok;
    set(profileData);
  }
  return {
    subscribe: subscribe2,
    sync,
    createUser,
    updateUser,
    cacheProfile,
    updateProfilePicture,
    isUsernameAvailable,
    isAdmin
  };
}
const userStore = createUserStore();
const userGetProfilePicture = derived(
  userStore,
  ($user) => {
    try {
      let byteArray;
      if ($user && $user.profilePicture) {
        if (Array.isArray($user.profilePicture) && $user.profilePicture[0] instanceof Uint8Array) {
          byteArray = $user.profilePicture[0];
          return `data:image/${$user.profilePictureType};base64,${uint8ArrayToBase64(byteArray)}`;
        } else if ($user.profilePicture instanceof Uint8Array) {
          return `data:${$user.profilePictureType};base64,${uint8ArrayToBase64(
            $user.profilePicture
          )}`;
        } else {
          if (typeof $user.profilePicture === "string") {
            if ($user.profilePicture.startsWith("data:image")) {
              return $user.profilePicture;
            } else {
              return `data:${$user.profilePictureType};base64,${$user.profilePicture}`;
            }
          }
        }
      }
      return "placeholder.png";
    } catch (error) {
      console.error(error);
      return "placeholder.png";
    }
  }
);
const getCourseImage = (course) => {
  return "golfCourse.png";
};
const core = {
  close: "Close",
  back: "Back",
  menu: "Open menu to access navigation options",
  collapse: "Collapse",
  expand: "Expand",
  copy: "Copy to clipboard"
};
const theme = {
  switch_theme: "Switch theme"
};
const progress = {
  completed: "Completed",
  in_progress: "In progress"
};
const en = {
  core,
  theme,
  progress
};
readable({
  lang: "en",
  ...en
});
const initBusyStore = () => {
  const DEFAULT_STATE = [];
  const { subscribe: subscribe2, update, set } = writable(DEFAULT_STATE);
  return {
    subscribe: subscribe2,
    /**
     * Show the busy-screen if not visible
     */
    startBusy({ initiator: newInitiator, text: text2 }) {
      update((state) => [
        ...state.filter(({ initiator }) => newInitiator !== initiator),
        { initiator: newInitiator, text: text2 }
      ]);
    },
    /**
     * Hide the busy-screen if no other initiators are done
     */
    stopBusy(initiatorToRemove) {
      update((state) => state.filter(({ initiator }) => initiator !== initiatorToRemove));
    },
    resetForTesting() {
      set(DEFAULT_STATE);
    }
  };
};
const busyStore = initBusyStore();
const busy = derived(busyStore, ($busyStore) => $busyStore.length > 0);
const busyMessage = derived(busyStore, ($busyStore) => $busyStore.reverse().find(({ text: text2 }) => nonNullish(text2))?.text);
const css$2 = {
  code: ".medium.svelte-85668t{--spinner-size:30px}.small.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 1rem)}.tiny.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 0.5rem)}svg.svelte-85668t{width:var(--spinner-size);height:var(--spinner-size);animation:spinner-linear-rotate 2000ms linear infinite;position:absolute;top:calc(50% - var(--spinner-size) / 2);left:calc(50% - var(--spinner-size) / 2);--radius:45px;--circumference:calc(3.1415926536 * var(--radius) * 2);--start:calc((1 - 0.05) * var(--circumference));--end:calc((1 - 0.8) * var(--circumference))}svg.inline.svelte-85668t{display:inline-block;position:relative}circle.svelte-85668t{stroke-dasharray:var(--circumference);stroke-width:10%;transform-origin:50% 50% 0;transition-property:stroke;animation-name:spinner-stroke-rotate-100;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite;fill:transparent;stroke:currentColor;transition:stroke-dashoffset 225ms linear}@keyframes spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes spinner-stroke-rotate-100{0%{stroke-dashoffset:var(--start);transform:rotate(0)}12.5%{stroke-dashoffset:var(--end);transform:rotate(0)}12.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:var(--start);transform:rotate(270deg)}37.5%{stroke-dashoffset:var(--end);transform:rotate(270deg)}37.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:var(--start);transform:rotate(180deg)}62.5%{stroke-dashoffset:var(--end);transform:rotate(180deg)}62.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:var(--start);transform:rotate(90deg)}87.5%{stroke-dashoffset:var(--end);transform:rotate(90deg)}87.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(341.5deg)}}",
  map: '{"version":3,"file":"Spinner.svelte","sources":["Spinner.svelte"],"sourcesContent":["<!-- adapted source: https://github.com/angular/components/tree/master/src/material/progress-spinner -->\\n<script>export let inline = false;\\nexport let size = \\"medium\\";\\n<\/script>\\n\\n<svg\\n  class:inline\\n  class={size}\\n  preserveAspectRatio=\\"xMidYMid meet\\"\\n  focusable=\\"false\\"\\n  aria-hidden=\\"true\\"\\n  data-tid=\\"spinner\\"\\n  viewBox=\\"0 0 100 100\\"><circle cx=\\"50%\\" cy=\\"50%\\" r=\\"45\\" /></svg\\n>\\n\\n<style>.medium {\\n  --spinner-size: 30px;\\n}\\n\\n.small {\\n  --spinner-size: calc(var(--line-height-standard) * 1rem);\\n}\\n\\n.tiny {\\n  --spinner-size: calc(var(--line-height-standard) * 0.5rem);\\n}\\n\\nsvg {\\n  width: var(--spinner-size);\\n  height: var(--spinner-size);\\n  animation: spinner-linear-rotate 2000ms linear infinite;\\n  position: absolute;\\n  top: calc(50% - var(--spinner-size) / 2);\\n  left: calc(50% - var(--spinner-size) / 2);\\n  --radius: 45px;\\n  --circumference: calc(3.1415926536 * var(--radius) * 2);\\n  --start: calc((1 - 0.05) * var(--circumference));\\n  --end: calc((1 - 0.8) * var(--circumference));\\n}\\nsvg.inline {\\n  display: inline-block;\\n  position: relative;\\n}\\n\\ncircle {\\n  stroke-dasharray: var(--circumference);\\n  stroke-width: 10%;\\n  transform-origin: 50% 50% 0;\\n  transition-property: stroke;\\n  animation-name: spinner-stroke-rotate-100;\\n  animation-duration: 4000ms;\\n  animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\\n  animation-iteration-count: infinite;\\n  fill: transparent;\\n  stroke: currentColor;\\n  transition: stroke-dashoffset 225ms linear;\\n}\\n\\n/* -global- */\\n@keyframes -global-spinner-linear-rotate {\\n  0% {\\n    transform: rotate(0deg);\\n  }\\n  100% {\\n    transform: rotate(360deg);\\n  }\\n}\\n/* -global- */\\n@keyframes -global-spinner-stroke-rotate-100 {\\n  0% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(0);\\n  }\\n  12.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(0);\\n  }\\n  12.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(72.5deg);\\n  }\\n  25% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(72.5deg);\\n  }\\n  25.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(270deg);\\n  }\\n  37.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(270deg);\\n  }\\n  37.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(161.5deg);\\n  }\\n  50% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(161.5deg);\\n  }\\n  50.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(180deg);\\n  }\\n  62.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(180deg);\\n  }\\n  62.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(251.5deg);\\n  }\\n  75% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(251.5deg);\\n  }\\n  75.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(90deg);\\n  }\\n  87.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(90deg);\\n  }\\n  87.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(341.5deg);\\n  }\\n  100% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(341.5deg);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAeO,qBAAQ,CACb,cAAc,CAAE,IAClB,CAEA,oBAAO,CACL,cAAc,CAAE,wCAClB,CAEA,mBAAM,CACJ,cAAc,CAAE,0CAClB,CAEA,iBAAI,CACF,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,IAAI,cAAc,CAAC,CAC3B,SAAS,CAAE,qBAAqB,CAAC,MAAM,CAAC,MAAM,CAAC,QAAQ,CACvD,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACxC,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACzC,QAAQ,CAAE,IAAI,CACd,eAAe,CAAE,sCAAsC,CACvD,OAAO,CAAE,uCAAuC,CAChD,KAAK,CAAE,sCACT,CACA,GAAG,qBAAQ,CACT,OAAO,CAAE,YAAY,CACrB,QAAQ,CAAE,QACZ,CAEA,oBAAO,CACL,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,YAAY,CAAE,GAAG,CACjB,gBAAgB,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAC3B,mBAAmB,CAAE,MAAM,CAC3B,cAAc,CAAE,yBAAyB,CACzC,kBAAkB,CAAE,MAAM,CAC1B,yBAAyB,CAAE,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CACzD,yBAAyB,CAAE,QAAQ,CACnC,IAAI,CAAE,WAAW,CACjB,MAAM,CAAE,YAAY,CACpB,UAAU,CAAE,iBAAiB,CAAC,KAAK,CAAC,MACtC,CAGA,WAAmB,qBAAsB,CACvC,EAAG,CACD,SAAS,CAAE,OAAO,IAAI,CACxB,CACA,IAAK,CACH,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF,CAEA,WAAmB,yBAA0B,CAC3C,EAAG,CACD,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,OAAO,CAC3C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,OAAO,CAC3C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,KAAK,CACzB,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,KAAK,CACzB,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,IAAK,CACH,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACF"}'
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { inline = false } = $$props;
  let { size = "medium" } = $$props;
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$result.css.add(css$2);
  return `  <svg class="${[escape(null_to_empty(size), true) + " svelte-85668t", inline ? "inline" : ""].join(" ").trim()}" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" data-tid="spinner" viewBox="0 0 100 100"><circle cx="50%" cy="50%" r="45" class="svelte-85668t"></circle></svg>`;
});
const css$1 = {
  code: "div.svelte-14plyno{z-index:calc(var(--z-index) + 1000);position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop);color:var(--backdrop-contrast)}.content.svelte-14plyno{display:flex;flex-direction:column;justify-content:center;align-items:center}p.svelte-14plyno{padding-bottom:var(--padding);max-width:calc(var(--section-max-width) / 2)}",
  map: '{"version":3,"file":"BusyScreen.svelte","sources":["BusyScreen.svelte"],"sourcesContent":["<script>import { fade } from \\"svelte/transition\\";\\nimport { busy, busyMessage } from \\"../stores/busy.store\\";\\nimport Spinner from \\"./Spinner.svelte\\";\\nimport { nonNullish } from \\"@dfinity/utils\\";\\n<\/script>\\n\\n<!-- Display spinner and lock UI if busyStore is not empty -->\\n{#if $busy}\\n  <div data-tid=\\"busy\\" transition:fade|global>\\n    <div class=\\"content\\">\\n      {#if nonNullish($busyMessage)}\\n        <p>{$busyMessage}</p>\\n      {/if}\\n      <span>\\n        <Spinner inline />\\n      </span>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>div {\\n  z-index: calc(var(--z-index) + 1000);\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  background: var(--backdrop);\\n  color: var(--backdrop-contrast);\\n}\\n\\n.content {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\np {\\n  padding-bottom: var(--padding);\\n  max-width: calc(var(--section-max-width) / 2);\\n}</style>\\n"],"names":[],"mappings":"AAoBO,kBAAI,CACT,OAAO,CAAE,KAAK,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACpC,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,mBAAmB,CAChC,CAEA,uBAAS,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACf,CAEA,gBAAE,CACA,cAAc,CAAE,IAAI,SAAS,CAAC,CAC9B,SAAS,CAAE,KAAK,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,CAAC,CAC9C"}'
};
const BusyScreen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $busy, $$unsubscribe_busy;
  let $busyMessage, $$unsubscribe_busyMessage;
  $$unsubscribe_busy = subscribe(busy, (value) => $busy = value);
  $$unsubscribe_busyMessage = subscribe(busyMessage, (value) => $busyMessage = value);
  $$result.css.add(css$1);
  $$unsubscribe_busy();
  $$unsubscribe_busyMessage();
  return ` ${$busy ? `<div data-tid="busy" class="svelte-14plyno"><div class="content svelte-14plyno">${nonNullish($busyMessage) ? `<p class="svelte-14plyno">${escape($busyMessage)}</p>` : ``} <span>${validate_component(Spinner, "Spinner").$$render($$result, { inline: true }, {}, {})}</span></div></div>` : ``}`;
});
var Theme;
(function(Theme2) {
  Theme2["DARK"] = "dark";
  Theme2["LIGHT"] = "light";
})(Theme || (Theme = {}));
const isNode = () => typeof process !== "undefined" && process.versions != null && process.versions.node != null;
const enumFromStringExists = ({ obj, value }) => Object.values(obj).includes(value);
const THEME_ATTRIBUTE = "theme";
const LOCALSTORAGE_THEME_KEY = "nnsTheme";
const initTheme = () => {
  if (isNode()) {
    return void 0;
  }
  const theme2 = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  const initialTheme = enumFromStringExists({
    obj: Theme,
    value: theme2
  }) ? theme2 : Theme.DARK;
  applyTheme({ theme: initialTheme, preserve: false });
  return initialTheme;
};
const applyTheme = ({ theme: theme2, preserve = true }) => {
  const { documentElement, head } = document;
  documentElement.setAttribute(THEME_ATTRIBUTE, theme2);
  const color = getComputedStyle(documentElement).getPropertyValue("--theme-color");
  head?.children?.namedItem("theme-color")?.setAttribute("content", color.trim());
  if (preserve) {
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, JSON.stringify(theme2));
  }
};
initTheme();
var Menu;
(function(Menu2) {
  Menu2["COLLAPSED"] = "collapsed";
  Menu2["EXPANDED"] = "expanded";
})(Menu || (Menu = {}));
const MENU_ATTRIBUTE = "menu";
const LOCALSTORAGE_MENU_KEY = "nnsMenu";
const initMenu = () => {
  if (isNode()) {
    return void 0;
  }
  const menu = document.documentElement.getAttribute(MENU_ATTRIBUTE);
  const initialMenu2 = enumFromStringExists({
    obj: Menu,
    value: menu
  }) ? menu : Menu.EXPANDED;
  applyMenu({ menu: initialMenu2, preserve: false });
  return initialMenu2;
};
const applyMenu = ({ menu, preserve = true }) => {
  const { documentElement } = document;
  documentElement.setAttribute(MENU_ATTRIBUTE, menu);
  if (preserve) {
    localStorage.setItem(LOCALSTORAGE_MENU_KEY, JSON.stringify(menu));
  }
};
const initialMenu = initMenu();
const initMenuStore = () => {
  const { subscribe: subscribe2, update } = writable(initialMenu);
  return {
    subscribe: subscribe2,
    toggle: () => {
      update((state) => {
        const menu = state === Menu.EXPANDED ? Menu.COLLAPSED : Menu.EXPANDED;
        applyMenu({ menu, preserve: true });
        return menu;
      });
    }
  };
};
const menuStore = initMenuStore();
derived(menuStore, ($menuStore) => $menuStore === Menu.COLLAPSED);
const css = {
  code: ".nav-overlay.svelte-w4rfmh.svelte-w4rfmh{position:fixed;top:0px;left:0px;z-index:50;display:flex;height:100%;width:100vw;flex-direction:column;justify-content:space-between;overflow-x:hidden;--tw-bg-opacity:1;background-color:rgb(244 200 2 / var(--tw-bg-opacity))}.nav-item.svelte-w4rfmh.svelte-w4rfmh{transform:translateY(-100%);opacity:0;transition:transform 0.5s ease, opacity 0.5s ease}.nav-item.expanded.svelte-w4rfmh.svelte-w4rfmh{transform:translateY(0);opacity:1}.social-links.svelte-w4rfmh a.svelte-w4rfmh{margin-right:10px;text-decoration:none;color:black}.nav-content.svelte-w4rfmh.svelte-w4rfmh{margin-top:100px}",
  map: `{"version":3,"file":"navigation.svelte","sources":["navigation.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { fade } from \\"svelte/transition\\";\\nimport { writable } from \\"svelte/store\\";\\nimport { goto, afterNavigate } from \\"$app/navigation\\";\\nimport { page } from \\"$app/stores\\";\\nexport let expanded = false;\\nexport let selectedRoute = 'home';\\nexport let toggleNav;\\nconst navItems = writable([\\n    { name: 'HOME', route: 'home' },\\n    { name: 'WHITEPAPER', route: 'whitepaper' },\\n    { name: 'GAME RULES', route: 'game-rules' },\\n    { name: 'TEAM', route: 'team' }\\n]);\\nfunction selectRoute(route) {\\n    selectedRoute = route;\\n    toggleNav();\\n    if (route === 'home') {\\n        goto(\`/\`);\\n        return;\\n    }\\n    goto(\`/\${route}\`);\\n}\\nfunction closeNav() {\\n    toggleNav();\\n}\\nfunction goHome() {\\n    toggleNav();\\n    goto('/');\\n}\\n$: {\\n    switch ($page.url.pathname) {\\n        case '/':\\n            selectedRoute = 'home';\\n            break;\\n        case '/whitepaper':\\n            selectedRoute = 'whitepaper';\\n            break;\\n        case '/team':\\n            selectedRoute = 'team';\\n            break;\\n        case '/game-rules':\\n            selectedRoute = 'game-rules';\\n            break;\\n        default:\\n            selectedRoute = 'home';\\n            break;\\n    }\\n}\\n<\/script>\\n  \\n<style>\\n    .nav-overlay {\\n      position: fixed;\\n      top: 0px;\\n      left: 0px;\\n      z-index: 50;\\n      display: flex;\\n      height: 100%;\\n      width: 100vw;\\n      flex-direction: column;\\n      justify-content: space-between;\\n      overflow-x: hidden;\\n      --tw-bg-opacity: 1;\\n      background-color: rgb(244 200 2 / var(--tw-bg-opacity));\\n}\\n  \\n    .nav-item {\\n      transform: translateY(-100%);\\n      opacity: 0;\\n      transition: transform 0.5s ease, opacity 0.5s ease;\\n    }\\n  \\n    .nav-item.expanded {\\n      transform: translateY(0);\\n      opacity: 1;\\n    }\\n  \\n    .social-links a {\\n      margin-right: 10px;\\n      text-decoration: none;\\n      color: black;\\n    }\\n  \\n    .nav-content {\\n      margin-top: 100px;\\n    }</style>\\n  \\n{#if expanded}\\n\\n    <div class=\\"flex min-h-screen flex-col relative nav-overlay\\" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>\\n      \\n      <div class=\\"absolute top-4 left-4 z-10\\">\\n        <button\\n          on:click={closeNav}\\n          class=\\"bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md\\">\\n          -\\n        </button>\\n      </div>\\n      <div class=\\"absolute top-4 right-4 z-10\\">\\n        <button on:click={goHome}>\\n            <span class=\\"text-3xl font-extrabold text-black condensed\\">GOLFPAD</span>\\n        </button>\\n      </div>\\n  \\n      <div class=\\"nav-content flex flex-col items-start pl-10\\">\\n        {#each $navItems as item (item.route)}\\n          <div class=\\"nav-item expanded\\">\\n            <button\\n              on:click={() => selectRoute(item.route)}\\n              class=\\"text-3xl lg:text-6xl font-bold condensed {selectedRoute === item.route ? 'text-white' : 'text-black'}\\">\\n              {item.name}\\n            </button>\\n          </div>\\n        {/each}\\n      </div>\\n  \\n      <div class=\\"flex justify-between items-center p-5 text-xs lg:text-base\\">\\n        <div class=\\"social-links\\">\\n          <a href=\\"https://twitter.com\\" target=\\"_blank\\">TWITTER</a>\\n          <a href=\\"https://oc.app\\" target=\\"_blank\\">OPENCHAT</a>\\n          <a href=\\"https://youtube.com\\" target=\\"_blank\\">YOUTUBE</a>\\n        </div>\\n        \\n        <div>\\n          <img src=\\"placeholder.png\\" alt=\\"Profile\\" class=\\"w-12 h-12 rounded-full\\" />\\n        </div>\\n      </div>\\n    </div>\\n{/if}\\n"],"names":[],"mappings":"AAmDI,wCAAa,CACX,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,aAAa,CAC9B,UAAU,CAAE,MAAM,CAClB,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAC5D,CAEI,qCAAU,CACR,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,IAChD,CAEA,SAAS,qCAAU,CACjB,SAAS,CAAE,WAAW,CAAC,CAAC,CACxB,OAAO,CAAE,CACX,CAEA,2BAAa,CAAC,eAAE,CACd,YAAY,CAAE,IAAI,CAClB,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,KACT,CAEA,wCAAa,CACX,UAAU,CAAE,KACd"}`
};
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $navItems, $$unsubscribe_navItems;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { expanded = false } = $$props;
  let { selectedRoute = "home" } = $$props;
  let { toggleNav } = $$props;
  const navItems = writable([
    { name: "HOME", route: "home" },
    { name: "WHITEPAPER", route: "whitepaper" },
    { name: "GAME RULES", route: "game-rules" },
    { name: "TEAM", route: "team" }
  ]);
  $$unsubscribe_navItems = subscribe(navItems, (value) => $navItems = value);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);
  if ($$props.selectedRoute === void 0 && $$bindings.selectedRoute && selectedRoute !== void 0) $$bindings.selectedRoute(selectedRoute);
  if ($$props.toggleNav === void 0 && $$bindings.toggleNav && toggleNav !== void 0) $$bindings.toggleNav(toggleNav);
  $$result.css.add(css);
  {
    {
      switch ($page.url.pathname) {
        case "/":
          selectedRoute = "home";
          break;
        case "/whitepaper":
          selectedRoute = "whitepaper";
          break;
        case "/team":
          selectedRoute = "team";
          break;
        case "/game-rules":
          selectedRoute = "game-rules";
          break;
        default:
          selectedRoute = "home";
          break;
      }
    }
  }
  $$unsubscribe_page();
  $$unsubscribe_navItems();
  return `${expanded ? `<div class="flex min-h-screen flex-col relative nav-overlay svelte-w4rfmh"><div class="absolute top-4 left-4 z-10"><button class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md" data-svelte-h="svelte-1cmq6fl">-</button></div> <div class="absolute top-4 right-4 z-10"><button data-svelte-h="svelte-y0f4s"><span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span></button></div> <div class="nav-content flex flex-col items-start pl-10 svelte-w4rfmh">${each($navItems, (item) => {
    return `<div class="nav-item expanded svelte-w4rfmh"><button class="${"text-3xl lg:text-6xl font-bold condensed " + escape(
      selectedRoute === item.route ? "text-white" : "text-black",
      true
    )}">${escape(item.name)}</button> </div>`;
  })}</div> <div class="flex justify-between items-center p-5 text-xs lg:text-base" data-svelte-h="svelte-4mey05"><div class="social-links svelte-w4rfmh"><a href="https://twitter.com" target="_blank" class="svelte-w4rfmh">TWITTER</a> <a href="https://oc.app" target="_blank" class="svelte-w4rfmh">OPENCHAT</a> <a href="https://youtube.com" target="_blank" class="svelte-w4rfmh">YOUTUBE</a></div> <div><img src="placeholder.png" alt="Profile" class="w-12 h-12 rounded-full"></div></div></div>` : ``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isHomepage;
  let $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => value);
  let expanded = false;
  let selectedRoute = "home";
  const init2 = async () => await Promise.all([syncAuthStore()]);
  const syncAuthStore = async () => {
    {
      return;
    }
  };
  onDestroy(() => {
  });
  function toggleNav() {
    expanded = !expanded;
    console.log(expanded);
  }
  isHomepage = browser;
  $$unsubscribe_authStore();
  return ` ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div>${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div> `;
    }
    return function(_) {
      return ` <div class="relative flex flex-col min-h-screen"><div class="flex-none h-[80px] relative"><div class="absolute z-10 top-4 left-4"><button class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md" data-svelte-h="svelte-1kd34xx">+</button></div> <div class="absolute z-10 top-4 right-4" data-svelte-h="svelte-17zfyzy"><a href="/"><span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span></a></div></div> ${validate_component(Navigation, "NavOverlay").$$render($$result, { expanded, selectedRoute, toggleNav }, {}, {})} <div class="${escape(
        isHomepage ? "bg-BrandYellow  items-center justify-center relative" : "bg-white",
        true
      ) + " flex-1 flex"}">${slots.default ? slots.default({}) : ``}</div> ${!isHomepage ? `<div class="bg-BrandYellow flex-none relative h-[50px] mt-auto" data-svelte-h="svelte-1e56a5n"><div class="absolute z-10 bottom-4 left-4"><a href="/whitepaper" class="text-sm font-medium text-black">WHITEPAPER |</a> <a href="/team" class="text-sm font-medium text-black">TEAM |</a> <a target="_blank" href="https://github.com/jamesbeadle/golfpad" class="text-sm font-medium text-black">GITHUB</a></div></div>` : ``}</div> `;
    }();
  }(init2())} ${validate_component(BusyScreen, "BusyScreen").$$render($$result, {}, {}, {})}`;
});
const Page$a = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authSignedInStore, $$unsubscribe_authSignedInStore;
  let $userGetProfilePicture, $$unsubscribe_userGetProfilePicture;
  $$unsubscribe_authSignedInStore = subscribe(authSignedInStore, (value) => $authSignedInStore = value);
  $$unsubscribe_userGetProfilePicture = subscribe(userGetProfilePicture, (value) => $userGetProfilePicture = value);
  $$unsubscribe_authSignedInStore();
  $$unsubscribe_userGetProfilePicture();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="z-10 px-4 mb-20 text-center"><h1 class="mb-1 font-bold text-BrandForest" data-svelte-h="svelte-cw6v72">WELCOME TO <span class="condensed">GOLFPAD</span></h1> <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed" data-svelte-h="svelte-qfwaeu">THE FUTURE OF GOLF STARTS HERE</h2> ${!$authSignedInStore ? `<button class="px-10 py-3 text-sm font-semibold rounded shadow-lg md:px-12 md:text-lg bg-BrandForest text-BrandYellow" data-svelte-h="svelte-14ismbr">CONNECT</button>` : ``} ${$authSignedInStore ? `<img${add_attribute("src", $userGetProfilePicture, 0)} alt="Profile" class="fixed w-12 h-12 rounded-full bottom-3 right-3" aria-label="Toggle Profile"> <button class="px-10 py-3 text-sm font-semibold rounded shadow-lg md:px-12 md:text-lg bg-BrandForest text-BrandYellow" data-svelte-h="svelte-qglar7">SIGN OUT</button>` : ``}</div> <div class="absolute bottom-0 left-0 z-0 w-full" data-svelte-h="svelte-1l2reow"><img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden"> <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex"></div>`;
    }
  })}`;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let { bindSelected = null } = $$props;
  let { placeholder = "Select an Option" } = $$props;
  let { multiple = false } = $$props;
  let { searchEnabled = false } = $$props;
  let searchTerm = "";
  createEventDispatcher();
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.bindSelected === void 0 && $$bindings.bindSelected && bindSelected !== void 0) $$bindings.bindSelected(bindSelected);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0) $$bindings.multiple(multiple);
  if ($$props.searchEnabled === void 0 && $$bindings.searchEnabled && searchEnabled !== void 0) $$bindings.searchEnabled(searchEnabled);
  items.filter((item) => item && item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return `<div class="relative w-full"><button type="button" class="w-full p-2 text-left border border-gray-300 rounded-md cursor-pointer">${multiple && Array.isArray(bindSelected) && bindSelected.length > 0 ? `<span>${escape(bindSelected.map((item) => item.name).join(", "))}</span>` : `${!multiple && bindSelected && typeof bindSelected === "object" && "name" in bindSelected ? `<span>${escape(bindSelected.name)}</span>` : `<span class="text-gray-400">${escape(placeholder)}</span>`}`}</button> ${``}</div>`;
});
const Page$9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let coursesTees = [];
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full bg-white"><div class="flex items-center justify-between px-8 pt-4"><h2 class="text-4xl text-black condensed" data-svelte-h="svelte-k1xkdv">MY COURSES</h2> <button class="hidden md:block btn btn-new-game" data-svelte-h="svelte-1vxj1rq">ADD NEW COURSE</button></div> <div class="w-full h-full px-2 pt-4"><div class="hidden p-2 rounded lg:block bg-BrandLightGray"><div class="grid items-center grid-cols-2 gap-4 p-4 text-xl text-black condensed" data-svelte-h="svelte-1ixozn2"><span>NAME</span> <span>TEES</span></div> <div class="overflow-y-auto max-h-[60vh] p-2">${each(coursesTees, (course) => {
        return `<div class="grid items-center grid-cols-2 p-3 mb-2 bg-white rounded gap-y-4"><div class="flex items-center"><img${add_attribute("src", getCourseImage(), 0)}${add_attribute("alt", course.name, 0)} class="object-cover w-16 h-16 mr-4 rounded-md"> <span class="text-2xl text-black condensed">${escape(course.name)}</span></div> <div class="flex items-center justify-between space-x-2 text-black">${each(course.teeColors, (tee) => {
          return `<span class="px-2 py-1 text-sm text-black rounded-full" style="${"background-color: " + escape(tee.color, true) + ";"}">${escape(tee.name)} </span>`;
        })} <button class="px-5 py-1 text-sm rounded text-BrandYellow bg-BrandForest" data-svelte-h="svelte-19h1531">VIEW
                                </button></div> </div>`;
      })}</div></div> <div class="space-y-4 lg:hidden">${each(coursesTees, (course) => {
        return `<div class="p-4 bg-white rounded-lg"><div class="sm:hidden"><div class="flex items-center mb-4"><img${add_attribute("src", getCourseImage(), 0)}${add_attribute("alt", course.name, 0)} class="w-16 h-16 mr-4 rounded-lg"> <span class="text-2xl text-black condensed">${escape(course.name)}</span></div> <div class="h-px mb-4 bg-BrandDivider"></div> <div class="flex flex-wrap gap-2">${each(course.teeColors, (tee) => {
          return `<span class="px-3 py-1 text-sm text-white rounded-full" style="${"background-color: " + escape(tee.color, true) + ";"}">${escape(tee.name)} </span>`;
        })} </div></div> <div class="hidden sm:block"><div class="flex items-center justify-between mb-4"><div class="flex items-center"><img${add_attribute("src", getCourseImage(), 0)}${add_attribute("alt", course.name, 0)} class="w-16 h-16 mr-4 rounded-lg"> <span class="text-2xl text-black condensed">${escape(course.name)}</span></div> <div class="flex items-center gap-2">${each(course.teeColors, (tee) => {
          return `<span class="px-3 py-1 text-sm text-black rounded-full" style="${"background-color: " + escape(tee.color, true) + ";"}">${escape(tee.name)} </span>`;
        })}</div> </div></div> <button class="w-full py-2 mt-4 text-sm rounded text-BrandYellow bg-BrandForest" data-svelte-h="svelte-19ujajf">VIEW</button> </div>`;
      })}</div> <button class="w-full py-2 mt-6 text-xl lg:hidden bg-BrandYellow text-BrandForest" data-svelte-h="svelte-1mfp1xl">ADD NEW COURSE</button></div> ${``}</div>`;
    }
  })}`;
});
const Page$8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let holes = [
    {
      hole: 1,
      par: 4,
      strokeIndex: 8,
      yards: 400
    },
    {
      hole: 2,
      par: 4,
      strokeIndex: 3,
      yards: 340
    },
    {
      hole: 3,
      par: 3,
      strokeIndex: 12,
      yards: 200
    },
    {
      hole: 4,
      par: 4,
      strokeIndex: 6,
      yards: 320
    },
    {
      hole: 5,
      par: 5,
      strokeIndex: 1,
      yards: 480
    },
    {
      hole: 6,
      par: 3,
      strokeIndex: 5,
      yards: 220
    },
    {
      hole: 7,
      par: 4,
      strokeIndex: 11,
      yards: 370
    },
    {
      hole: 8,
      par: 4,
      strokeIndex: 2,
      yards: 350
    },
    {
      hole: 9,
      par: 4,
      strokeIndex: 7,
      yards: 420
    },
    {
      hole: 10,
      par: 5,
      strokeIndex: 9,
      yards: 500
    },
    {
      hole: 11,
      par: 4,
      strokeIndex: 14,
      yards: 310
    },
    {
      hole: 12,
      par: 3,
      strokeIndex: 18,
      yards: 190
    },
    {
      hole: 13,
      par: 5,
      strokeIndex: 4,
      yards: 530
    },
    {
      hole: 14,
      par: 4,
      strokeIndex: 13,
      yards: 390
    },
    {
      hole: 15,
      par: 3,
      strokeIndex: 17,
      yards: 180
    },
    {
      hole: 16,
      par: 4,
      strokeIndex: 10,
      yards: 410
    },
    {
      hole: 17,
      par: 5,
      strokeIndex: 15,
      yards: 480
    },
    {
      hole: 18,
      par: 4,
      strokeIndex: 16,
      yards: 400
    }
  ];
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full"><div class="p-2 px-4 text-black"><div class="flex items-center justify-between"><h2 class="text-5xl text-black md:text-4xl condensed" data-svelte-h="svelte-1bbmc22">COURSE DETAILS</h2> <div class="hidden gap-4 md:flex"><button class="px-4 py-3 font-semibold rounded text-md bg-BrandLightGray" data-svelte-h="svelte-1ayvtqr">REMOVE COURSE</button> <button class="px-4 py-3 font-semibold rounded text-md text-BrandYellow bg-BrandForest" data-svelte-h="svelte-v4pdxc">EDIT COURSE DETAILS</button></div></div></div> <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-6 lg:w-1/3 lg:mb-0" data-svelte-h="svelte-1uyfyew"><h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3> <img src="/course-placeholder.jpg" alt="golf course" class="object-cover w-full h-full rounded"></div> <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0">${``}</div> <div class="w-full px-0 lg:w-1/3 lg:px-4"><h2 class="pb-3 text-xl text-black condensed" data-svelte-h="svelte-1yg9laa">TEES</h2> <div class="flex flex-col p-5 bg-white border-b rounded">${``}</div> <div class="overflow-x-auto"><div class="overflow-y-auto max-h-[65vh]"><table class="hidden min-w-full bg-white border-collapse sm:table"><thead data-svelte-h="svelte-iqaa4l"><tr><th class="p-4 text-xl text-left text-black border-b condensed">HOLE</th> <th class="p-4 text-xl text-left text-black border-b condensed">PAR</th> <th class="p-4 text-xl text-left text-black border-b condensed">S.I.</th> <th class="p-4 text-xl text-left text-black border-b condensed">YARDS</th></tr></thead> <tbody>${each(holes, (hole) => {
        return `<tr><td class="p-3 text-black condensed">${escape(hole.hole)}</td> <td class="p-3 text-black">${escape(hole.par)}</td> <td class="p-3 text-black">${escape(hole.strokeIndex)}</td> <td class="p-3 text-black">${escape(hole.yards)}</td> </tr>`;
      })}</tbody></table> <div class="sm:hidden"><div class="grid grid-cols-4 gap-4 p-2 text-sm text-black bg-white condensed" data-svelte-h="svelte-m7esr"><div>HOLE</div> <div>PAR</div> <div>S.I</div> <div>YARDS</div></div> ${each(holes, (hole) => {
        return `<div class="grid grid-cols-4 gap-4 p-2 text-black bg-white border-t"><div class="text-lg condensed">${escape(hole.hole)}</div> <div class="text-lg">${escape(hole.par)}</div> <div class="text-lg">${escape(hole.strokeIndex)}</div> <div class="text-lg">${escape(hole.yards)}</div> </div>`;
      })}</div></div></div> <div class="flex w-full gap-4 p-2 bg-white md:hidden"><button class="px-3 py-1 font-semibold text-black rounded text-md bg-BrandLightGray" data-svelte-h="svelte-gfgmnn">REMOVE COURSE</button> <button class="px-3 py-1 font-semibold rounded text-md text-BrandYellow bg-BrandForest" data-svelte-h="svelte-174d6pb">EDIT COURSE DETAILS</button></div></div></div> ${``}</div>`;
    }
  })}`;
});
const Page$7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedGame, $$unsubscribe_selectedGame;
  const selectedGame = writable("Mulligans");
  $$unsubscribe_selectedGame = subscribe(selectedGame, (value) => $selectedGame = value);
  $$unsubscribe_selectedGame();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full max-w-4xl p-4 mx-auto text-black"><h2 class="mt-3 mb-6 text-2xl font-black text-black md:text-4xl" data-svelte-h="svelte-abfh44">GAMEPLAY RULES</h2> <p class="mb-6 text-base leading-relaxed md:text-lg" data-svelte-h="svelte-pidtw3">Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.</p> <div class="mb-4 border-b border-gray-300"><div class="flex flex-wrap space-x-2 overflow-x-auto md:space-x-4"><button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Mulligans" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      )}"><span class="condensed" data-svelte-h="svelte-1jctqhy">MULLIGANS</span></button> <button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Bands" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      )}"><span class="condensed" data-svelte-h="svelte-b8c3iw">BANDS</span></button> <button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Build It" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      )}"><span class="condensed" data-svelte-h="svelte-zhub7t">BUILD IT</span></button> <button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Next Up" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      )}"><span class="condensed" data-svelte-h="svelte-169yoda">NEXT UP</span></button></div></div> <div class="p-4 bg-white rounded-lg shadow-lg md:p-6">${$selectedGame === "Mulligans" ? `<div class="flex flex-col items-center mb-4 md:flex-row" data-svelte-h="svelte-gei0wy"><img src="prophet.png" alt="mulligans" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">MULLIGANS</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base" data-svelte-h="svelte-vgl2xj"><li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li> <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li> <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li> <li>A golfer can use as many mulligans as they have available on any hole.</li> <li>A golfer can build up as many mulligans as they can.</li> <li>The game is decided when a golfer is winning by more holes than are available to play.</li></ul>` : ``} ${$selectedGame === "Bands" ? `<div class="flex flex-col items-center mb-4 md:flex-row" data-svelte-h="svelte-1ab10e4"><img src="bands.png" alt="bands" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BANDS</h3></div> <p class="mb-4 text-sm text-gray-700 md:text-base" data-svelte-h="svelte-1j91ho7">Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. 
                    Each band must start on a different hole but they are allowed to overlap.</p> <p class="mb-4 text-sm text-gray-700 md:text-base" data-svelte-h="svelte-1u4k28f">The points for each band are as follows:</p> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base" data-svelte-h="svelte-1rmm0yj"><li><span class="semi-bold">Band 1:</span> Holes where you don’t hit a tree or enter a bunker. <span class="semi-bold">15 points</span></li> <li><span class="semi-bold">Band 2:</span> Holes where you won’t lose a ball. <span class="semi-bold">10 points</span></li> <li><span class="semi-bold">Band 3:</span> Holes where you hit 2/3 fairways. <span class="semi-bold">20 points</span></li> <li><span class="semi-bold">Band 4:</span> Holes where you hit 2/3 greens. <span class="semi-bold">25 points</span></li> <li><span class="semi-bold">Band 5:</span> Holes where you will 1-putt 2/3 greens. <span class="semi-bold">30 points</span></li> <li><span class="semi-bold">Band 6:</span> Holes where you won’t get a double bogey or worse. <span class="semi-bold">35 points</span></li> <li><span class="semi-bold">Band 7:</span> Holes where you won’t bogey or worse. <span class="semi-bold">40 points</span></li> <li><span class="semi-bold">Band 8:</span> Holes where you’ll be par or under. <span class="semi-bold">45 points</span></li> <li><span class="semi-bold">Band 9:</span> Holes where you’ll be under par. <span class="semi-bold">50 points</span></li></ul> <p class="mt-4 text-sm text-gray-700 md:text-base" data-svelte-h="svelte-158nqiz">A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.</p>` : ``} ${$selectedGame === "Build It" ? `<div class="flex flex-col items-center mb-4 md:flex-row" data-svelte-h="svelte-1lgdw2z"><img src="build-it.png" alt="build-it" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BUILD IT</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base" data-svelte-h="svelte-1uaqsdi"><li>A golfer can create a team in which they can compete against multiple other teams.</li> <li>The golfer who created the team becomes the team&#39;s captain.</li> <li>A team captain sets up a game on a specific course and tee to compete against other teams.</li> <li>A team captain invites other team&#39;s to join in a new game.</li> <li>A team captain selects a period of time to build their team card over.</li> <li>Golfers add their scorecards transferring any new lowest scores over to the team card.</li> <li>The winners are the team with the lowest scorecard at the end of the game&#39;s duration.</li></ul>` : ``} ${$selectedGame === "Next Up" ? `<div class="flex flex-col items-center mb-4 md:flex-row" data-svelte-h="svelte-urfv2e"><img src="next-up.png" alt="next-up" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">NEXT UP</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base" data-svelte-h="svelte-ypm00j"><li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li> <li>If a golfer wins the hole they are defending, they get 3 points.</li> <li>If a golfer wins a hole they are not defending, they get 1 point.</li> <li>The winner is the golfer with the most points at the end of the round.</li> <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li></ul>` : ``}</div></div>`;
    }
  })}`;
});
var define_process_env_default = { __CANDID_UI_CANISTER_ID: "br5f7-7uaaa-aaaaa-qaaca-cai", BACKEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", FRONTEND_CANISTER_ID: "be2us-64aaa-aaaaa-qaabq-cai", DFX_NETWORK: "local" };
class GolferSummariesServices {
  actor;
  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      define_process_env_default.BACKEND_CANISTER_ID
    );
  }
  async getGolferGameSummaries(filters) {
    const result = await this.actor.getMyGames(filters);
    if (isError(result)) throw new Error("Failed to get golfer game summaries");
    return result.ok;
  }
}
function createGolferSummariesStore() {
  const { subscribe: subscribe2, set } = writable(
    void 0
  );
  async function getGolferGameSummaries(dto) {
    return await new GolferSummariesServices().getGolferGameSummaries(dto);
  }
  return {
    subscribe: subscribe2,
    setGolferGameSummaries: (golferGameSummaries) => set(golferGameSummaries),
    getGolferGameSummaries
  };
}
const golferSummariesStore = createGolferSummariesStore();
const Game_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gameTitle } = $$props;
  let { opponentConfig } = $$props;
  let courses = [];
  let opponents = [];
  let dropdownItems = [];
  let selectedOpponent = [];
  let selectedCourseObject = null;
  let teeOffDate = "";
  let teeOffTime = "";
  if ($$props.gameTitle === void 0 && $$bindings.gameTitle && gameTitle !== void 0) $$bindings.gameTitle(gameTitle);
  if ($$props.opponentConfig === void 0 && $$bindings.opponentConfig && opponentConfig !== void 0) $$bindings.opponentConfig(opponentConfig);
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col w-full"><div class="w-full p-2 px-4 text-black"><h2 class="mx-2 mt-2 mb-0 text-5xl font-black text-black md:mx-4 condensed">${escape(gameTitle.toUpperCase())}</h2></div> <div class="w-full p-4 text-black bg-gray-100 rounded-lg"><label for="course" class="block mt-4 text-lg font-bold text-black" data-svelte-h="svelte-1byzqo7">Course</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md">${validate_component(Dropdown, "Dropdown").$$render(
        $$result,
        {
          items: courses.map((course) => ({
            name: course.name,
            value: course.courseId.toString()
          })),
          bindSelected: selectedCourseObject,
          placeholder: "Select Course",
          multiple: false,
          searchEnabled: false
        },
        {},
        {}
      )}</div></div> ${``} <label for="date" class="block mt-4 text-lg font-bold text-black" data-svelte-h="svelte-yp3zwq">Select Tee Off Date</label> <div class="flex items-center w-full mt-2"><div class="flex-grow max-w-md"><input type="date" class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded" placeholder="dd/mm/yyyy"${add_attribute("value", teeOffDate, 0)}></div></div> <label for="time" class="block mt-4 text-lg font-bold text-black" data-svelte-h="svelte-1jkzqww">Select Tee Off Time</label> <div class="flex items-center w-full mt-2"><div class="flex-grow max-w-md"><input type="time" class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded" placeholder="hh:mm"${add_attribute("value", teeOffTime, 0)}></div></div> <label for="opponent" class="block mt-4 text-lg font-bold text-black">${escape(opponentConfig.playerLabels ? "Players" : "Opponents")}</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md">${opponents.length > 0 ? `${validate_component(Dropdown, "Dropdown").$$render(
        $$result,
        {
          items: dropdownItems,
          bindSelected: selectedOpponent,
          placeholder: "Select your Opponent(s)",
          searchEnabled: false,
          multiple: false
        },
        {},
        {}
      )}` : `<div data-svelte-h="svelte-1oc8xm8">Loading opponents...</div>`}</div></div></div> <button class="btn btn-new-game md:w-[400px] w-full" data-svelte-h="svelte-1lc7lal">Create New Game</button></div>`;
    }
  })}`;
});
const Page$6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $golferSummariesStore, $$unsubscribe_golferSummariesStore;
  $$unsubscribe_golferSummariesStore = subscribe(golferSummariesStore, (value) => $golferSummariesStore = value);
  $$unsubscribe_golferSummariesStore();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full"><div class="w-full h-full p-2 px-4 text-black"><div class="flex items-center justify-between mb-4"><h2 class="px-2 my-3 text-3xl font-black text-black md:text-5xl condensed" data-svelte-h="svelte-11gfxk7">MY GAMES</h2> <button class="mr-4 btn btn-new-game" data-svelte-h="svelte-68zs4g">New Game</button> ${``}</div> <div class="flex items-center w-full p-4 text-xl font-bold text-left bg-gray-50 condensed" data-svelte-h="svelte-1e1ky6m"><div class="w-2/6">Game</div> <div class="w-2/6">Players</div> <div class="w-1/6">Status</div> <div class="w-1/6"></div></div> ${``}  ${$golferSummariesStore && $golferSummariesStore.entries.length > 0 ? `${each($golferSummariesStore.entries, (game) => {
        return `<div class="w-full mt-5 text-left border-t border-gray-200 bg-gray-50"><div class="flex items-center p-4 border-b border-gray-200"><div class="flex items-center rounded w-15 h-15" data-svelte-h="svelte-1hxxdi8"></div> <div class="ml-4"><h3 class="font-bold">${escape(game.gameType)}</h3> <p class="text-sm">${escape(new Date(Number(game.date) * 1e3).toLocaleDateString())}</p> </div></div> <div class="flex ml-auto bg-gray-50">${each(game.players, (player) => {
          return `<div class="relative group"><div class="absolute left-0 z-50 hidden group-hover:block top-12"><p class="font-bold">${escape(player)}</p> <button class="px-2.5 py-1.5 bg-blue-500 text-white rounded" data-svelte-h="svelte-1ayp4ij">View Player
                                        </button></div> </div>`;
        })}</div> <div class="w-1/6 text-lg font-bold text-blue-500 bg-gray-50">${escape(game.status)}</div> <div class="w-1/6" data-svelte-h="svelte-p15t31"><button class="px-4 py-2.5 bg-blue-500 text-white font-bold rounded">Predict
                            </button></div> </div>`;
      })}` : ``} ${``}</div></div>`;
    }
  })}`;
});
const Title_panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gameType } = $$props;
  let { teeOffTime } = $$props;
  let { courseId } = $$props;
  if ($$props.gameType === void 0 && $$bindings.gameType && gameType !== void 0) $$bindings.gameType(gameType);
  if ($$props.teeOffTime === void 0 && $$bindings.teeOffTime && teeOffTime !== void 0) $$bindings.teeOffTime(teeOffTime);
  if ($$props.courseId === void 0 && $$bindings.courseId && courseId !== void 0) $$bindings.courseId(courseId);
  return `<div class="flex flex-col items-start justify-center w-full ml-8 mt-2.5"><span class="mb-0 text-sm font-medium text-gray-500" data-svelte-h="svelte-8kyw97">GAMETYPE</span> <h1 class="font-black leading-none text-7xl font-condensed">${escape(gameType)}</h1> <div class="flex flex-col mt-2.5"><span class="mb-0 text-sm font-medium text-gray-500 mt-2.5" data-svelte-h="svelte-193wnh6">DATE</span> <h3 class="mb-4 text-4xl font-bold text-center font-condensed">${escape(teeOffTime)}</h3></div> <div class="flex items-center justify-start mt-2.5"><img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"> <div class="flex flex-col"><span class="mb-0 text-sm font-medium text-gray-500" data-svelte-h="svelte-17zrtw2">COURSE</span> <div><p class="text-3xl font-bold text-center font-condensed">${escape(courseId)}</p></div></div></div></div>`;
});
const Bands_scorecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Build_it_scorecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Mulligans_scorecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Next_up_scorecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Prophet_scorecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Game_info_panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gameType } = $$props;
  let { gameStatus } = $$props;
  let { playerIds } = $$props;
  let { events } = $$props;
  let { winner } = $$props;
  if ($$props.gameType === void 0 && $$bindings.gameType && gameType !== void 0) $$bindings.gameType(gameType);
  if ($$props.gameStatus === void 0 && $$bindings.gameStatus && gameStatus !== void 0) $$bindings.gameStatus(gameStatus);
  if ($$props.playerIds === void 0 && $$bindings.playerIds && playerIds !== void 0) $$bindings.playerIds(playerIds);
  if ($$props.events === void 0 && $$bindings.events && events !== void 0) $$bindings.events(events);
  if ($$props.winner === void 0 && $$bindings.winner && winner !== void 0) $$bindings.winner(winner);
  return `<div><h4 class="text-4xl font-bold condensed">${gameStatus === "unplayed" ? `PLAYER SETUP` : `${gameStatus === "active" ? `PLAYER SCORES` : `${gameStatus === "completed" ? `PLAYER DETAILS` : ``}`}`}</h4>   ${gameType ? `${gameType === "Bands" ? `${validate_component(Bands_scorecard, "BandsScorecard").$$render($$result, {}, {}, {})}` : `${gameType === "Mulligans" ? `${validate_component(Mulligans_scorecard, "MulligansScorecard").$$render($$result, {}, {}, {})}` : `${gameType === "NextUp" ? `${validate_component(Next_up_scorecard, "NextUpScorecard").$$render($$result, {}, {}, {})}` : `${gameType === "BuildIt" ? `${validate_component(Build_it_scorecard, "BuildItScorecard").$$render($$result, {}, {}, {})}` : `${gameType === "Prophet" ? `${validate_component(Prophet_scorecard, "ProphetScorecard").$$render($$result, {}, {}, {})}` : ``}`}`}`}`}` : ``}</div>`;
});
function getGameTypeImage(gameType) {
  if ("Bands" in gameType) return "/bands.png";
  if ("Mulligans" in gameType) return "/mulligans.png";
  if ("NextUp" in gameType) return "/next-up.png";
  if ("BuildIt" in gameType) return "/build-it.png";
  if ("Prophet" in gameType) return "/prophet.png";
  return "";
}
function getGameStatus(status) {
  if ("Unplayed" in status) return "Unplayed";
  if ("Active" in status) return "Active";
  if ("Complete" in status) return "Complete";
  return "Unknown";
}
const Page$5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $gameData, $$unsubscribe_gameData;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const gameData = writable({
    id: BigInt(0),
    gameType: { Mulligans: null },
    scoreDetail: [],
    status: { Unplayed: null },
    courseId: BigInt(0),
    predictions: [],
    events: [],
    courseSnapshot: {
      courseId: BigInt(0),
      courseVersion: 0,
      teeGroup: {
        added: BigInt(0),
        holes: [],
        name: "",
        colour: "",
        strokeIndex: 0
      }
    },
    teeOffTime: BigInt(0),
    playerIds: [],
    invites: [],
    winner: ""
  });
  $$unsubscribe_gameData = subscribe(gameData, (value) => $gameData = value);
  $page.url.searchParams.get("id");
  $$unsubscribe_page();
  $$unsubscribe_gameData();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full"><div class="w-full p-2 px-4 text-black"><div class="flex items-center justify-between"><h2 class="px-5 mt-1 text-3xl font-black text-black md:text-5xl condensed" data-svelte-h="svelte-nepsyy">GAME DETAILS</h2> ${getGameStatus($gameData?.status) === "Active" ? `<div class="flex items-center" data-svelte-h="svelte-166v31"><div class="w-3 h-3 bg-green-500 rounded-full"></div> <span class="ml-2 mr-4 text-xl font-bold text-green-500">LIVE</span></div>` : ``} ${getGameStatus($gameData?.status) === "Unplayed" ? `<div class="flex items-center" data-svelte-h="svelte-ac3xua"><div class="w-3 h-3 bg-blue-500 rounded-full"></div> <span class="ml-2 mr-4 text-xl font-bold text-blue-500">PREDICT</span></div>` : ``}</div></div> <div class="w-full"><div class="w-1/3 rounded-lg"><img${add_attribute("src", getGameTypeImage($gameData?.gameType), 0)}${add_attribute("alt", Object.keys($gameData?.gameType || {})[0], 0)} class="game-image"></div> ${validate_component(Title_panel, "TitlePanel").$$render(
        $$result,
        {
          gameType: Object.keys($gameData?.gameType || {})[0],
          teeOffTime: $gameData.teeOffTime,
          courseId: $gameData.courseId
        },
        {},
        {}
      )} ${validate_component(Game_info_panel, "GameInfoPanel").$$render(
        $$result,
        {
          gameType: Object.keys($gameData?.gameType || {})[0],
          gameStatus: getGameStatus($gameData?.status),
          playerIds: Object.keys($gameData.playerIds),
          events: Object.keys($gameData.events),
          winner: Object.keys($gameData.winner)
        },
        {},
        {}
      )}</div></div>`;
    }
  })}`;
});
const gameConfigs = {
  mulligans: {
    title: "Mulligans",
    opponentConfig: {
      multiple: true
    }
  },
  prophet: {
    title: "Prophet",
    opponentConfig: {
      multiple: false
    }
  },
  bands: {
    title: "Bands",
    opponentConfig: {
      multiple: true,
      maxPlayers: 4
    }
  },
  "build-it": {
    title: "Build It",
    opponentConfig: {
      playerLabels: ["Player A", "Player B", "Player C"]
    }
  },
  "next-up": {
    title: "Next Up",
    opponentConfig: {
      multiple: true,
      maxPlayers: 2
    }
  }
};
const Page$4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const gameType = $page.params.game;
  const config = gameConfigs[gameType];
  const defaultOpponentConfig = { multiple: false };
  const safeConfig = {
    ...defaultOpponentConfig,
    ...config.opponentConfig
  };
  $$unsubscribe_page();
  return `${validate_component(Game_form, "GameForm").$$render(
    $$result,
    {
      gameTitle: config.title,
      opponentConfig: safeConfig
    },
    {},
    {}
  )}`;
});
const Edit_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0) $$bindings.fill(fill);
  return `<svg${add_attribute("class", className, 0)}${add_attribute("fill", fill, 0)} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="m60 10c27.57 0 50 22.43 50 50s-22.43 50-50 50-50-22.43-50-50 22.43-50 50-50zm0-10c-33.135 0-60 26.865-60 60s26.865 60 60 60 60-26.865 60-60-26.865-60-60-60zm-19.97 64.82 15.53 15.525-20.56 4.655zm49.97-18.82-29.2 29.605-16.01-16.01 29.205-29.595z"></path></svg>`;
});
const Page$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  [
    {
      principalId: "DECHU_475",
      requestTime: BigInt(Date.now())
    },
    {
      principalId: "SMITH_238475",
      requestTime: BigInt(Date.now())
    }
  ];
  let golfer = { username: "", handicap: [0] };
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full"><div class="flex items-center justify-between px-8 pt-4"><h2 class="text-5xl text-black md:text-4xl condensed" data-svelte-h="svelte-xer55u">PROFILE</h2> <div class="justify-end hidden md:flex"><button class="${"px-10 py-3 text-xl text-BrandYellow condensed rounded-l-md rounded-r-none " + escape(
        "bg-BrandForest",
        true
      )}">DETAILS</button> <button class="${"px-10 py-3 text-xl text-BrandYellow condensed rounded-t-md " + escape(
        "bg-[#F9F9F9] text-[#C0C0C0]",
        true
      )}">SOCIAL</button></div></div> ${`<div class="w-full h-full px-2 pt-4"><div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-6 lg:w-1/3 lg:mb-0"><h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed" data-svelte-h="svelte-n9ylnt">DETAILS</h3> <div class="relative flex items-center justify-center w-full aspect-[16/9] lg:aspect-square bg-yellow-400 rounded-lg">${`<img src="default-profile-picture.jpg" alt="Default Profile" class="object-cover w-full h-full rounded-lg"> <button class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">${validate_component(Edit_icon, "EditIcon").$$render($$result, { className: "w-20 h-20", fill: "white" }, {}, {})}</button>`} ${``}</div></div> <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0"><h3 class="hidden mb-4 text-xl text-black lg:block condensed" data-svelte-h="svelte-c7x13v">DETAILS</h3> <label for="username" class="block pt-8 pb-3 text-sm text-BrandDarkGray" data-svelte-h="svelte-19ut7l7">USERNAME</label> <input id="username" placeholder="Enter your username" type="text" class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest"${add_attribute("value", golfer.username, 0)}> <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray" data-svelte-h="svelte-8ztggn">HANDICAP</label> <input id="handicap" placeholder="Enter your handicap" type="number" class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" min="0" max="54"${add_attribute("value", golfer.handicap[0], 0)}> ${`${``} <button class="px-2 py-2 mb-4 text-sm rounded lg:px-3 lg:py-1 text-BrandYellow bg-BrandForest hover:bg-green-700 disabled:opacity-50" ${"disabled"}>${`CREATE USER`}</button>`} <div class="flex items-center mt-auto text-black"><img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"> <div class="flex-1"><label for="homeCourse" class="block pb-3 text-sm text-BrandDarkGray" data-svelte-h="svelte-b12mcu">HOME COURSE</label> ${`<button type="button" class="w-full p-2 text-left rounded text-BrandDarkGray hover:bg-black/5" data-svelte-h="svelte-1xozzvh">Select home course</button>`} ${``}</div></div></div> <div class="w-full px-0 lg:w-1/3 lg:px-4"><h3 class="text-xl text-black condensed" data-svelte-h="svelte-c5n1wb">YARDAGES</h3> <div class="flex flex-col h-[calc(100%-1rem)] p-4 rounded-lg bg-BrandLightGray"><div class="flex flex-col h-full bg-white rounded-lg"><div class="flex items-center justify-between p-2 text-black lg:py-4 lg:mx-4 condensed" data-svelte-h="svelte-rjlhdz"><span>CLUB</span> <span>YARDS</span></div> <div class="flex items-center justify-center flex-1" data-svelte-h="svelte-19vbkmq"><p class="px-8 text-sm text-center text-BrandDarkGray">No yardages have been added. Click the button below to get started.</p></div> <div class="px-4 pb-4"><button class="w-full p-2 rounded text-BrandYellow bg-BrandForest hover:bg-green-700" data-svelte-h="svelte-qxw2s3">ADD YARDAGES</button> ${``}</div></div></div></div></div></div>`} ${``} <div class="sticky bottom-0 left-0 right-0 z-10 flex w-full bg-white md:hidden"><button class="${"flex-1 py-2 text-xl condensed " + escape(
        "bg-BrandForest text-BrandYellow",
        true
      )}">DETAILS</button> <button class="${"flex-1 py-2 text-xl condensed " + escape(
        "bg-[#F9F9F9] text-[#C0C0C0]",
        true
      )}">SOCIAL</button></div></div>`;
    }
  })}`;
});
const Page$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const teamMembers = [
    {
      name: "Zoe Duffy",
      title: "Managing Director",
      image: "zoe.jpg",
      handicap: "Unknown",
      bio: [
        "With a robust background in the software development and technology industries, Zoe brings a wealth of experience to her role as Managing Director.",
        "Her career spans over 20 years, during which she has cultivated expertise in sales, customer success, and marketing, driving growth and innovation across multiple organisations.",
        "A passionate advocate for supporting women in tech, Zoe is committed to fostering an inclusive and diverse workplace where everyone can thrive.",
        "She believes in empowering the next generation of female leaders and actively mentors women seeking to advance their careers in technology.",
        "Outside of her professional life, Zoe is a dedicated mum to two children. She balances her dynamic career with a love for running, cycling, and exploring the great outdoors."
      ]
    },
    {
      name: "Kelly Howlett",
      title: "Head of Operations",
      image: "kelly.jpeg",
      handicap: 18,
      bio: [
        "Kelly is head of Operations at Waterway Labs, ensuring our dynamic UK based team can work together smoothly. Kelly turns our vision to bring real world users to the Internet Computer into a reality with his dedication to our UK marketing strategy. Kelly lives with our unofficial head of security, Trevor, both of whom can be found touring the UK in the OpenFPL podcast studio.",
        "Kelly studied Ecology and Conservation and Natural History in Cambridge, building extensive experience in geotechnical engineering in his professional career. Kelly has worked on large-scale projects throughout Europe and the United States, specialising in utilising advanced technology to acheive wide ranging goals.",
        "Kelly has always had a passion for sports, previously being sponsored as a professional kiter. Nowadays he prefers to keep his feet on the ground, enjoying a game of football or round of golf."
      ]
    },
    {
      name: "James Beadle",
      title: "Development Manager",
      image: "james.jpg",
      handicap: 18,
      bio: [
        "James oversees all of our development projects, ensuring that our software meets the highest standards.",
        "James has over 15 years experience delivering projects for worldwide brands, including Ford, Coca Cola & GSK.",
        "The Internet Computer blockchain attracted James due it's ability to create a more equitable future for people. James believes passionately about using this new technology to create truly decentralised services.",
        "When he's not coding, you can find James on his narrowboat, where he enjoys thinking about his next big project while perfecting his short game."
      ]
    },
    {
      name: "George Robinson",
      title: "Community Manager",
      image: "george.jpg",
      handicap: 24,
      bio: [
        "George is our go-to person for all things community-related. His ability to connect with users and understand their needs makes him an invaluable part of our team.",
        "George has been in crypto for almost 5 years, specifically championing the unique features of ICP since 2021.",
        "Needing something to do during the football offseason, George picked up golf at the start of the 2024 summer. If he’s not on the course or the driving range, he’ll be at the club bar!"
      ]
    },
    {
      name: "Josh Wray",
      title: "Head of Promotion",
      image: "josh.jpg",
      handicap: 28,
      bio: [
        "Josh brings a wealth of experience from a background in the pharmaceutical industry, where attention to detail and a deep understanding of complex technologies were essential.",
        "Over the past five years, Josh has shifted focus towards blockchain technology, with a particular interest in the Internet Computer (ICP) ecosystem.",
        "Josh's passion for innovation and emerging technologies has driven their success in promoting and growing blockchain projects.",
        "As Head of Promotion at Waterway Labs, Josh leverages this expertise to build strong relationships, drive engagement, and enhance the visibility of our cutting-edge initiatives within the tech community and beyond."
      ]
    },
    {
      name: "Dfinity Designer",
      title: "Head of Design",
      image: "dfd.jpg",
      handicap: 18,
      bio: [
        "We believe we have the best designer in the world. Dfinity Designer maps out the user journey from start to finish, always ensuring a simple yet stunning product is created.",
        "Dfinity Designer's work can be enjoyed throughout the ICP blockchain, having designed a range of applications including OpenChat and OpenFPL.",
        "Dfinity Designer is also a keen golfer, making it even easier for him to design the perfect golf platform."
      ]
    }
  ];
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col space-y-6 text-base text-black p-4"><h2 class="text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed" data-svelte-h="svelte-1kcrqqp">OUR TEAM</h2> <p class="text-lg leading-relaxed" data-svelte-h="svelte-1pcuuok">Waterway Labs have a team of keen golfers. The team has experience of being long-time club members along with playing courses with friends on an ad-hoc basis. Using the team&#39;s domain knowledge will ensure that <span class="condensed">GOLFPAD</span> contains everything a golfer expects from an all-in-one golf solution and more.</p> <p class="text-lg leading-relaxed" data-svelte-h="svelte-1jqf6ix">The Waterway Labs team is in the process of expansion, bringing on a new Managing Director &amp; Head of Operations in June 2024.</p> <h2 class="text-2xl font-semibold" data-svelte-h="svelte-6wauv7">Meet the Team</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(teamMembers, (member) => {
        return `<div class="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4"><div class="flex items-center space-x-4"><div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img${add_attribute("src", `team/${member.image}`, 0)}${add_attribute("alt", member.name, 0)} class="w-full h-full object-cover"></div> <div><h3 class="text-xl font-medium">${escape(member.name)}</h3> <p class="text-sm text-gray-500">${escape(member.title)}</p> <p class="text-sm text-gray-600">Handicap: ${escape(member.handicap)}</p> </div></div> <div class="text-sm text-gray-700 space-y-2">${each(member.bio, (paragraph) => {
          return `<p>${escape(paragraph)}</p>`;
        })}</div> </div>`;
      })}</div></div>`;
    }
  })}`;
});
const Vision = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="space-y-4 text-base" data-svelte-h="svelte-18dq7ov"><h2 class="text-2xl font-black text-black condensed">VISION</h2> <div class="flex flex-col md:flex-row items-center"><div class="flex-1 md:pr-4 mb-4 md:mb-0"><p><span class="font-extrabold text-black condensed">GOLFPAD</span> is where the beautiful game of golf enters Web3.</p> <p class="mt-2">GolfPad will position itself to be the decentralised authority on golf by utilising the power of a DAO to create a revolution in how golfers play each other from new game formats to a more accurate handicap calculation system.
        GolfPad will introduce itself to users with features designed to enhance gameplay for golfers of all levels. 
        <span class="font-extrabold text-black condensed">GOLFPAD</span> introduces new games, tools and features to expand your game. 
        We also want to enrich the social and club experience, aiming to make the world of golf an even more vibrant community sport.</p></div> <div class="flex-shrink-0 w-full md:w-auto"><img src="panel-bg.png" alt="vision" class="w-full h-auto md:w-64 rounded-lg shadow-md"></div></div> <p>Many people who love golf can be inconsistent golfers, it&#39;s a game that usually requires a lot of practice. 
    Central to <span class="font-extrabold text-black condensed">GOLFPAD</span> are our initial 4 new golf game formats, designed to expand on the individual achievements of your round.  
    Whether a beginner or advanced golfer, everything we build has been designed to help you enjoy becoming a better golfer.</p> <p>We will introduce golfers to <span class="font-extrabold text-black condensed">GOLFPAD</span> with our 4 new unique games along with useful player tools.
    We will then bring in features to assist golf coaches and golf clubs to connect with the millions of golfers worldwide. 
    Our ultimate goal is to use the platform to enable golfers to take control of the sport they love, specifically giving them a more accurate handicap to use when they play.</p> <p><span class="font-extrabold text-black condensed">GOLFPAD</span> will operate as a DAO, 
    owning and managing the worldwide dataset of golf courses. It will use this 100% on-chain data as a foundation to deliver a range of golf related features and applications.</p> <p><span class="font-extrabold text-black condensed">GOLFPAD</span> will provide golfers and golf clubs with a range of tools, initially launching with Yardage Sets.
     This useful feature will allow golfers to keep track of how far they hit each club, saving multiple sets for the yardages you hit in different environments.</p> <p>We aim to make <span class="font-extrabold text-black condensed">GOLFPAD</span> the home of community golf.</p></div>`;
});
const Product = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${``} ${``} ${``} ${``} <div class="flex flex-col space-y-4 text-base"><h2 class="text-2xl font-black text-black condensed" data-svelte-h="svelte-1mahn8t">OUR NEW GAMES</h2> <p data-svelte-h="svelte-ks9rls">We want <span class="condensed">GOLFPAD</span> to have everything a user needs to play, learn and socialise with the world&#39;s community of golfers. 
    Initially we have designed 4 new game formats for golfers to enjoy on our platform, with the DAO deciding on future additions.</p> <p data-svelte-h="svelte-1ip4exd">Our first 4 games will be released in the following order and are described in the following sections:</p> <div class="flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-2"><div class="flex flex-col w-full space-y-2 md:w-1/4"><img src="prophet.png" alt="mulligans" class="w-full"> <p class="text-3xl text-center condensed md:text-lg" data-svelte-h="svelte-ybfjo2">MULLIGANS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow" data-svelte-h="svelte-8rnv3t">Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><img src="bands.png" alt="bands" class="w-full"> <p class="text-3xl text-center condensed md:text-lg" data-svelte-h="svelte-1yuc8dc">BANDS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow" data-svelte-h="svelte-1jpyihb">Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><img src="build-it.png" alt="build-it" class="w-full"> <p class="text-3xl text-center condensed md:text-lg" data-svelte-h="svelte-1qhvn4z">BUILD IT</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow" data-svelte-h="svelte-26gahg">Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><img src="next-up.png" alt="next-up" class="w-full"> <p class="text-3xl text-center condensed md:text-lg" data-svelte-h="svelte-gx8gne">NEXT UP</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow" data-svelte-h="svelte-xwza6f">Info</button></div></div></div>`;
});
const Handicap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col text-base" data-svelte-h="svelte-y9x9va"><h2 class="text-2xl font-black text-black condensed mb-4">OUR NEW HANDICAP SYSTEM</h2> <p><span class="condensed">GOLFPAD</span> plans to revolutionise the golfing world with a groundbreaking handicap system that leverages decentralised technology and community governance. 
    Our vision is to become the global authority on golf handicapping by addressing the inherent weaknesses of the current system, 
    which is dominated by siloed and centralised entities.</p> <h2 class="text-xl font-black text-black condensed mt-4">Eliminating Barriers in Handicap Calculation</h2> <p>The traditional handicap system is fraught with complexities and restrictions, especially when golfers attempt to play internationally. 
    National handicap authorities often impose limitations that prevent handicaps from being recognised across borders. This fragmentation not only hinders the global golfing community but also restricts players from enjoying a seamless experience.</p> <p class="mt-2"><span class="condensed">GOLFPAD</span>&#39;s new handicap system removes these obstacles by utilising a decentralised platform where all golfers can store their rounds and compete worldwide. By eliminating middlemen, 
    we provide a unified and accessible system that recognises handicaps globally, creating a more inclusive golfing environment.</p> <h2 class="text-xl font-black text-black condensed mt-4">Free and Accessible Handicap Data</h2> <p>We believe that a golfer&#39;s handicap should be freely available to all who enjoy the game, 
    not just those who pay membership fees to specific jurisdictional authorities. 
    <span class="condensed">GOLFPAD</span> democratises access to handicap data, ensuring that every golfer, regardless of affiliation or financial commitment, 
    can participate fully in the sport they love.</p> <h2 class="text-xl font-black text-black condensed mt-4">Enhanced Accuracy with Real-Time Data</h2> <p>One of the major flaws in the current handicap calculation is the reliance on outdated slope ratings, which are typically updated every ten years. 
    This archaic system fails to account for real-time changes in course difficulty due to factors like weather conditions or course modifications.</p> <p class="mt-2"><span class="condensed">GOLFPAD</span> addresses this issue by calculating a course&#39;s difficulty in real-time based on actual player performance data. 
    By harnessing big data and on-chain algorithms managed by a community of co-owner golfers, 
    we provide a more accurate and fair handicap system. 
    This approach not only enhances competitiveness but also increases enjoyment for golfers of all levels.</p> <h2 class="text-xl font-black text-black condensed mt-4">Mathematical Proof of Superior Accuracy</h2> <p>We are confident that our handicap calculation algorithm offers superior accuracy compared to existing systems. 
    By analysing the spread of scores from the expected handicap-adjusted outcomes, 
    we aim to demonstrate mathematically that our system produces a smaller variance. 
    This level of precision leads to more competitive rounds and a better overall experience for players.</p> <h2 class="text-xl font-black text-black condensed mt-4">Conclusion</h2> <p><span class="condensed">GOLFPAD</span>&#39;s new handicap system represents a significant step forward in making golf more accessible, fair, and enjoyable. 
    By eliminating unnecessary barriers and leveraging cutting-edge technology, 
    we are creating a unified platform that benefits golfers worldwide. 
    We invite you to join us in this exciting venture to redefine the future of golf.</p></div>`;
});
const Dao = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col items-center space-y-6 p-4 bg-gray-50 text-gray-900 w-full" data-svelte-h="svelte-1hjfhjj"><img src="token.png" alt="Golfpad Token" class="w-20 h-20 rounded-full shadow-lg"> <h2 class="text-3xl font-extrabold text-center">The <span class="font-extrabold text-black condensed">GOLFPAD</span> DAO</h2> <div class="space-y-4 text-base w-full"><p>The <span class="font-semibold">GOLFPAD</span> DAO will be used to govern our valuable worldwide golf dataset. 
            As a new golfer discovers the platform and adds their home course, a proposal can be raised to make their course official. 
            This consensus-backed dataset of worldwide courses will serve as the foundation for a range of Golf apps within the <span class="font-semibold">GOLFPAD</span> ecosystem.</p> <p>The DAO will be decentralised and governed using the utility token, $GOLF. The $GOLF token will be used throughout the <span class="font-semibold">GOLFPAD</span> ecosystem, initially ensuring we have zero 3rd party dependencies.</p> <p>Future features will enable golfers, coaches, and clubs to use their golf tokens as we bring additional areas of golf 100% on-chain.</p> <p>We will enable coaches to provide lessons and subscription-based content through our upcoming <span class="font-semibold">GOLF SCHOOL</span> features.</p> <p>Golf clubs will have the opportunity to manage memberships, events, and take payments all on a completely secure, tamper-proof blockchain.</p></div>  <div class="w-full h-px bg-gray-300"></div>  <div class="w-full text-left"><h3 class="text-xl font-semibold mb-2 text-green-700">Tokenomics at Decentralisation</h3> <ul class="list-disc list-inside text-left space-y-2 text-base"><li>SNS Sale Participants: 25%</li> <li>Waterway Labs: 16.8%</li> <li>OpenFPL Neuron Holders: 3.6%</li> <li>OpenFPL Supporters Club: 3.6%</li> <li><span class="condensed">GOLFPAD</span> Treasury: 51%</li></ul></div></div>`;
});
const Marketing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col space-y-4" data-svelte-h="svelte-xdeqhw"><h2 class="text-2xl font-black text-black condensed">MARKETING</h2> <p>Waterway Labs are an expanding tech company with a focus on real world events to introduce people to the Internet Computer blockchain.</p> <p>Like most successful brands, we too have our niche. We use narrowboats, something most people we have met love, to bring a unique excitement to each one of our products.</p> <div class="w-full mt-4"><img src="boat.png" alt="boat" class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center"></div> <p><span class="condensed">GOLFPAD</span> will be no different, we are creating a floating mini golf course, to be used for promotional events throughout the UK.</p> <p>We plan to moor our floating <span class="condensed">GOLFPAD MINIPUTT</span> course near some of the best golf courses in the world, in the heart of Surrey in the United Kingdom.</p> <p>We will use our unique setup to provide entertaining golf gamification to real world users. Content will be recorded and added to the range of Waterway Labs social media channels.</p> <p>With the largest anticipated user base for <span class="condensed">GOLFPAD</span> being in the US, we plan to focus on signing up courses as soon as possible through reverse promotion. 
      We will approach a course and ask to become the featured course for a day, adding them to the platform whilst showcasing their course in the best way possible.</p></div>`;
});
const Roadmap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col space-y-4 text-base" data-svelte-h="svelte-5aidaz"><h2 class="text-2xl font-black text-black condensed">ROADMAP</h2> <div class="w-full mt-4"><img src="roadmap.png" alt="boat" class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center"></div> <p>2024: Launch of our first 4 unique games, allowing the world to begin enjoying our new game formats. 
      Promotion will begin using our floating <span class="condensed">GOLFPAD MINIPUTT</span> course in the UK.
      We will begin signing up golf courses around the world to be showcased within the <span class="condensed">GOLFPAD</span> platform.</p> <p>2025: We will extend <span class="condensed">GOLFPAD</span> features to provide professional golf coaches with the tools required to build their own golf school. 
    These tools will enable coaches to manage the students they train and offer users around the world a content based subscription service filled with golf training videos.
  </p><p>2025 Onwards: Continued promotion of <span class="condensed">GOLFPAD</span>, introducing real world golf tournaments, mini games and advertising features.</p></div>`;
});
const Team = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const teamMembers = [
    {
      name: "Zoe Duffy",
      title: "Managing Director",
      image: "zoe.jpg"
    },
    {
      name: "Kelly Howlett",
      title: "Head of Operations",
      image: "kelly.jpeg"
    },
    {
      name: "James Beadle",
      title: "Development Manager",
      image: "james.jpg"
    },
    {
      name: "Dfinity Designer",
      title: "Head of Design",
      image: "dfd.jpg"
    },
    {
      name: "Thilly Thana",
      title: "Lead Developer",
      image: "thilly.jpg"
    },
    {
      name: "George Robinson",
      title: "Community Manager",
      image: "george.jpg"
    },
    {
      name: "Josh Wray",
      title: "Head of Promotion",
      image: "josh.jpg"
    },
    {
      name: "Ashutosh Yadav",
      title: "Media Production Manager",
      image: "ashutosh.jpg"
    }
  ];
  return `<div class="flex flex-col space-y-6 text-base"><h2 class="text-2xl font-black text-black condensed" data-svelte-h="svelte-ku25ef">OUR TEAM</h2> <p class="text-lg leading-relaxed" data-svelte-h="svelte-1ligo3a">Waterway Labs have a team of keen golfers. The team have experience of being long time club members along with playing courses with friends on an adhoc basis. Using the team&#39;s domain knowledge will ensure that <span class="condensed">GOLFPAD</span> contains everything a golfer expects from an all-in-one golf solution and more.</p> <p class="text-lg leading-relaxed" data-svelte-h="svelte-1on8rex">The Waterway Labs team is in the process of expansion, bringing on a new Managing Director &amp; Head of Operations in June 2024.</p> <h2 class="text-2xl font-semibold" data-svelte-h="svelte-6wauv7">Meet the Team</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(teamMembers, (member) => {
    return `<div class="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-lg"><div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img${add_attribute("src", `team/${member.image}`, 0)}${add_attribute("alt", member.name, 0)} class="w-full h-full object-cover"></div> <div><h3 class="text-xl font-medium">${escape(member.name)}</h3> <p class="text-sm text-gray-500">${escape(member.title)}</p></div> </div>`;
  })}</div></div>`;
});
const System_architecture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col space-y-4 text-base" data-svelte-h="svelte-78p70m"><h2 class="text-2xl font-black text-black condensed">SYSTEM ARCHITECTURE</h2> <p>Full details of the <span class="condensed">GOLFPAD</span> multi-canister architecture will be released after testing is complete.</p></div>`;
});
let cropPositionY = "top";
const Page$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeTab = "vision";
  const tabs = [
    { name: "Vision", component: Vision },
    { name: "Product", component: Product },
    { name: "Handicaps", component: Handicap },
    { name: "DAO", component: Dao },
    { name: "Marketing", component: Marketing },
    { name: "Road Map", component: Roadmap },
    { name: "Team", component: Team },
    {
      name: "System Architecture",
      component: System_architecture
    }
  ];
  function isActiveTab(index) {
    return tabs[index].name.toLowerCase() === activeTab;
  }
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full h-full p-2 px-4 text-black"><h2 class="mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed" data-svelte-h="svelte-1p363ws">GOLFPAD WHITEPAPER</h2> <div class="flex flex-col w-full md:flex-row"><img src="mulligans.png" alt="hero" class="w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg" style="${"--crop-position-y: " + escape(cropPositionY, true) + ";"}"> <div class="w-full px-2 mt-4 md:w-3/4 md:mt-0">${each(tabs, ({ name, component }, index) => {
        return `${activeTab === name.toLowerCase() ? `<div class="flex flex-col"><div class="flex">${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> <div class="flex flex-col mt-8 text-xs"><div class="flex flex-row space-x-2"><button class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white" ${tabs.findIndex((tab) => tab.name.toLowerCase() === activeTab) === 0 ? "disabled" : ""}>Previous Section</button> <button class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white" ${tabs.findIndex((tab) => tab.name.toLowerCase() === activeTab) === tabs.length - 1 ? "disabled" : ""}>Next Section
                  </button></div> <div class="flex flex-row justify-center my-4">${each(tabs, (_, index2) => {
          return `<button${add_attribute(
            "class",
            `
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-0.5 cursor-pointer border-none
                      ${isActiveTab(index2) ? "bg-BrandBlue" : "bg-gray-500 hover:bg-gray-600"}
                    `,
            0
          )}${add_attribute("aria-label", `Go to ${tabs[index2].name} section`, 0)}></button>`;
        })} </div></div> </div>` : ``}`;
      })}</div></div></div>`;
    }
  })}`;
});
const Delete_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0) $$bindings.fill(fill);
  return `<svg${add_attribute("class", className, 0)}${add_attribute("fill", fill, 0)} viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z" fill="#C0C0C0"></path></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let yardageSet = {
    id: 1,
    name: "Championship Tees",
    clubs: [
      { index: 1, name: "Driver", yards: 320 },
      { index: 2, name: "3 Wood", yards: 210 },
      { index: 3, name: "5 Wood", yards: 190 },
      { index: 4, name: "3 Iron", yards: 183 },
      { index: 5, name: "4 Iron", yards: 176 },
      { index: 6, name: "5 Iron", yards: 164 },
      { index: 7, name: "6 Iron", yards: 144 },
      { index: 8, name: "7 Iron", yards: 135 },
      { index: 9, name: "8 Iron", yards: 133 },
      { index: 10, name: "9 Iron", yards: 128 },
      { index: 11, name: "PW", yards: 0 }
    ]
  };
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full bg-white"><div class="flex items-center justify-between px-8 pt-4" data-svelte-h="svelte-1q0bbhl"><h2 class="text-4xl text-black condensed">MY YARDAGES</h2></div> <div class="w-full h-full px-2 pt-4"><div class="flex flex-col gap-4 p-4 rounded-lg lg:flex-row bg-BrandLightGray"><div class="flex flex-col w-full p-4 rounded-md lg:w-1/3"><label for="yardage-set" class="pb-2 text-2xl text-black condensed" data-svelte-h="svelte-us7rfp">YARDAGE SET</label> <select id="yardage-set" class="p-2 mb-6 text-lg text-black border rounded-md"><option${add_attribute("value", yardageSet.name, 0)}>${escape(yardageSet.name)}</option></select> <button type="button" class="w-full p-4 mt-auto rounded-md text-BrandForest bg-BrandYellow" data-svelte-h="svelte-lnkzdd">ADD NEW SET</button> ${``}</div> <div class="flex-1 p-4 bg-white rounded-md"><div class="flex items-center justify-between pb-4 border-b"><div class="flex items-center gap-2"><h3 class="text-2xl text-black condensed">${escape(yardageSet.name)}</h3> <button type="button" class="p-1 rounded-full hover:bg-gray-100">${validate_component(Edit_icon, "EditIcon").$$render($$result, { className: "w-4 h-4" }, {}, {})}</button> ${``}</div> <button class="p-2 text-sm text-black rounded-md bg-BrandLightGray" data-svelte-h="svelte-scpmhp">Copy From</button></div> <div class="grid grid-cols-3 gap-4 mt-4 text-sm sm:text-base" data-svelte-h="svelte-1igm8ed"><span class="col-span-1 text-black condensed">CLUB</span> <span class="col-span-2 text-black condensed">YARDS</span></div> ${each(yardageSet.clubs, (club, index) => {
        return `<div class="grid items-center grid-cols-3 gap-4 mt-4 group"><span class="col-span-1 text-black condensed">${escape(club.name)}</span> <div class="flex items-center justify-between col-span-2"><div class="flex items-center gap-2"><input type="number" class="w-1/3 p-2 text-black border rounded-md bg-BrandLightGray focus:outline-none focus:ring-2 focus:ring-BrandForest" placeholder="Enter"${add_attribute("value", club.yards, 0)}> <button type="button" class="invisible p-1 rounded-full hover:bg-BrandLightGray group-hover:visible">${validate_component(Delete_icon, "DeleteIcon").$$render($$result, { className: "w-4 h-4" }, {}, {})} </button></div> ${index === yardageSet.clubs.length - 1 ? `<button type="button" class="p-2 text-center rounded-md w-28 text-BrandYellow bg-BrandForest" data-svelte-h="svelte-gw2sqz">ADD CLUB
                                    </button>` : ``}</div> </div>`;
      })} ${``} ${``}</div></div></div></div>`;
    }
  })}`;
});
export {
  Error$1 as E,
  Layout$1 as L,
  Page$a as P,
  Server as S,
  set_building as a,
  set_manifest as b,
  set_prerendering as c,
  set_private_env as d,
  set_public_env as e,
  set_read_implementation as f,
  get_hooks as g,
  set_safe_public_env as h,
  Page$9 as i,
  Page$8 as j,
  Page$7 as k,
  Page$6 as l,
  Page$5 as m,
  Page$4 as n,
  options as o,
  Page$3 as p,
  Page$2 as q,
  Page$1 as r,
  set_assets as s,
  Page as t
};

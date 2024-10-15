import { D as DEV, B as BROWSER } from "./vendor.js";
import * as devalue from "devalue";
import { Buffer } from "buffer";
import { parse, serialize } from "cookie";
import * as set_cookie_parser from "set-cookie-parser";
import { nonNullish } from "@dfinity/utils";
import "dompurify";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import { computePosition, autoUpdate, offset, flip, shift } from "@floating-ui/dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
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
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
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
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const _boolean_attributes = (
  /** @type {const} */
  [
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]
);
const boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
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
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name)) return;
    const value = attributes[name];
    if (value === true) str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value) str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name) continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
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
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2] != null && style_object[key2] !== "").map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
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
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
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
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update2);
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
function serialize_data(fetched, filter2, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter2(key2, value)) {
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
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta content="width=device-width, initial-scale=1" name="viewport" />\n\n    <title>GOLFPAD</title>\n    <link href="https://golfpad.xyz" rel="canonical" />\n    <meta\n      content="GOLFPAD is a Web3 social golf platform."\n      name="description"\n    />\n    <meta content="GOLFPAD" property="og:title" />\n    <meta\n      content="GOLFPAD is a Web3 social golf platform."\n      property="og:description"\n    />\n    <meta content="website" property="og:type" />\n    <meta content="https://golfpad.xyz" property="og:url" />\n    <meta content="https://golfpad.xyz/meta-share.jpg" property="og:image" />\n    <meta content="summary_large_image" name="twitter:card" />\n    <meta content="GOLFPAD" name="twitter:title" />\n    <meta\n      content="GOLFPAD is a Web3 social golf platform."\n      name="twitter:description"\n    />\n    <meta content="https://golfpad.xyz/meta-share.jpg" name="twitter:image" />\n    <meta content="@beadle1989" name="twitter:creator" />\n\n    <link crossorigin="anonymous" href="/manifest.webmanifest" rel="manifest" />\n\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="32x32"\n      href="' + assets2 + '/favicons/favicon-32x32.png"\n    />\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="16x16"\n      href="' + assets2 + '/favicons/favicon-16x16.png"\n    />\n    <link rel="shortcut icon" href="' + assets2 + '/favicons/favicon.ico" />\n\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="#2CE3A6" />\n    <meta name="apple-mobile-web-app-title" content="GOLFPAD" />\n    <link\n      rel="apple-touch-icon"\n      href="' + assets2 + '/favicons/apple-touch-icon.png"\n    />\n    <link\n      rel="mask-icon"\n      href="' + assets2 + '/favicons/safari-pinned-tab.svg"\n      color="#2CE3A6"\n    />\n\n    <meta name="msapplication-TileColor" content="#101111" />\n    <meta\n      name="msapplication-config"\n      content="' + assets2 + '/favicons/browserconfig.xml"\n    />\n\n    <!-- Preloaded images -->\n    <link rel="preload" href="/golfball.png" as="image" />\n    <link rel="preload" href="/golfball_mobile.png" as="image" />\n    <link rel="preload" href="/boat.png" as="image" />\n    <link rel="preload" href="/hero.png" as="image" />\n    <link rel="preload" href="/panel-bg.png" as="image" />\n    <link rel="preload" href="/roadmap.png" as="image" />\n    <link rel="preload" href="/token.png" as="image" />\n\n    <link rel="preload" href="/bands.png" as="image" />\n    <link rel="preload" href="/bands-game.png" as="image" />\n    <link rel="preload" href="/build-it.png" as="image" />\n    <link rel="preload" href="/build-it-game.png" as="image" />\n    <link rel="preload" href="/next-up.png" as="image" />\n    <link rel="preload" href="/next-up-game.png" as="image" />\n    <link rel="preload" href="/mulligans.png" as="image" />\n    <link rel="preload" href="/mulligans-game.png" as="image" />\n\n    <link rel="preload" href="/team/dfd.jpg" as="image" />\n    <link rel="preload" href="/team/george.jpg" as="image" />\n    <link rel="preload" href="/team/james.jpg" as="image" />\n    <link rel="preload" href="/team/josh.jpg" as="image" />\n    <link rel="preload" href="/team/kelly.jpeg" as="image" />\n    <link rel="preload" href="/team/zoe.jpg" as="image" />\n\n    <link\n      rel="preload"\n      href="/MonaSans-Regular.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n    <link\n      rel="preload"\n      href="/MonaSans-SemiBold.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n    <link\n      rel="preload"\n      href="/MonaSansCondensed-ExtraBold.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n    <link\n      rel="preload"\n      href="/MonaSansCondensed-Regular.woff2"\n      as="font"\n      type="font/woff2"\n      crossorigin="anonymous"\n    />\n\n    <meta content="#2CE3A6" name="theme-color" />\n    ' + head + '\n\n    <style>\n      html,\n      body {\n        height: 100%;\n        margin: 0;\n      }\n\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSans-Regular.woff2") format("woff2");\n      }\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans Semi Bold";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSans-SemiBold.woff2") format("woff2");\n      }\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans Condensed";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSansCondensed-Regular.woff2")\n          format("woff2");\n      }\n      @font-face {\n        font-display: swap;\n        font-family: "Mona Sans Condensed Extra Bold";\n        font-style: normal;\n        font-weight: 400;\n        src: url("' + assets2 + '/MonaSansCondensed-ExtraBold.woff2")\n          format("woff2");\n      }\n      body {\n        font-family: "Mona Sans", sans-serif !important;\n        color: white !important;\n        height: 100vh;\n        margin: 0;\n        background-color: #f4c802;\n      }\n\n      #app-spinner {\n        --spinner-size: 30px;\n\n        width: var(--spinner-size);\n        height: var(--spinner-size);\n\n        animation: app-spinner-linear-rotate 2000ms linear infinite;\n\n        position: absolute;\n        top: calc(50% - (var(--spinner-size) / 2));\n        left: calc(50% - (var(--spinner-size) / 2));\n\n        --radius: 45px;\n        --circumference: calc(3.14159265359 * var(--radius) * 2);\n\n        --start: calc((1 - 0.05) * var(--circumference));\n        --end: calc((1 - 0.8) * var(--circumference));\n      }\n\n      #app-spinner circle {\n        stroke-dasharray: var(--circumference);\n        stroke-width: 10%;\n        transform-origin: 50% 50% 0;\n\n        transition-property: stroke;\n\n        animation-name: app-spinner-stroke-rotate-100;\n        animation-duration: 4000ms;\n        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n        animation-iteration-count: infinite;\n\n        fill: transparent;\n        stroke: currentColor;\n\n        transition: stroke-dashoffset 225ms linear;\n      }\n\n      @keyframes app-spinner-linear-rotate {\n        0% {\n          transform: rotate(0deg);\n        }\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes app-spinner-stroke-rotate-100 {\n        0% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(0);\n        }\n        12.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(0);\n        }\n        12.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n        25% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(72.5deg);\n        }\n\n        25.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(270deg);\n        }\n        37.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(270deg);\n        }\n        37.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n        50% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(161.5deg);\n        }\n\n        50.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(180deg);\n        }\n        62.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(180deg);\n        }\n        62.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n        75% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(251.5deg);\n        }\n\n        75.0001% {\n          stroke-dashoffset: var(--start);\n          transform: rotate(90deg);\n        }\n        87.5% {\n          stroke-dashoffset: var(--end);\n          transform: rotate(90deg);\n        }\n        87.5001% {\n          stroke-dashoffset: var(--end);\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n        100% {\n          stroke-dashoffset: var(--start);\n          transform: rotateX(180deg) rotate(341.5deg);\n        }\n      }\n    </style>\n  </head>\n  <body data-sveltekit-preload-data="hover">\n    <div style="display: contents">' + body2 + '</div>\n\n    <svg\n      id="app-spinner"\n      preserveAspectRatio="xMidYMid meet"\n      focusable="false"\n      aria-hidden="true"\n      data-tid="spinner"\n      viewBox="0 0 100 100"\n    >\n      <circle cx="50%" cy="50%" r="45" />\n    </svg>\n  </body>\n</html>\n',
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
  version_hash: "16sqgxk"
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
  const { subscribe: subscribe2, set, update: update2 } = writable({
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
            update2((state) => ({
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
      update2((state) => ({
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
const Logo_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  const fill = "";
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0) $$bindings.fill(fill);
  return `<svg${add_attribute("class", className, 0)} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60" fill="white"></circle><circle cx="60" cy="60" r="46" fill="#101111"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M102.483 66.689C102.824 64.5093 103 62.2753 103 60.0001C103 36.2518 83.7484 17 60.0001 17C36.2518 17 17 36.2518 17 60.0001C17 62.2753 17.1767 64.5093 17.5171 66.689H102.483Z" fill="#F4C802"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M96.2825 66.689C96.7531 64.3647 97 61.9608 97 59.5C97 39.3416 80.4345 23 60 23C39.5655 23 23 39.3416 23 59.5C23 61.9608 23.2469 64.3647 23.7175 66.689H96.2825Z" fill="#F4C802"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M89.2515 66.689C89.7413 64.5381 90 62.2992 90 60C90 43.4315 76.5685 30 60 30C43.4315 30 30 43.4315 30 60C30 62.2992 30.2587 64.5381 30.7485 66.689H89.2515Z" fill="#F4C802"></path><mask id="mask0_311_2114" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="17" y="17" width="86" height="86"><circle cx="60" cy="60" r="43" fill="#101111"></circle></mask><g mask="url(#mask0_311_2114)"><rect x="-15" y="60" width="149" height="66" fill="#70B354"></rect><path d="M57.3429 102.056C57.3784 102.607 57.8227 103.055 58.375 103.055H62.625C63.1773 103.055 63.6216 102.607 63.6571 102.056C64.0262 96.3243 67.5474 91.3577 72.6771 88.5507C72.8744 88.4427 73 88.237 73 88.0121C73 87.5548 72.5104 87.2608 72.0973 87.4569C68.9063 88.9722 64.8784 89.8764 60.5 89.8764C56.1216 89.8764 52.0937 88.9722 48.9027 87.4569C48.4896 87.2608 48 87.5548 48 88.0121C48 88.237 48.1256 88.4427 48.3229 88.5507C53.4526 91.3577 56.9738 96.3243 57.3429 102.056Z" fill="#101111"></path><path d="M57.375 90.8765C57.375 90.3242 57.8227 89.8765 58.375 89.8765H62.625C63.1773 89.8765 63.625 90.3242 63.625 90.8765V119C63.625 119.552 63.1773 120 62.625 120H58.375C57.8227 120 57.375 119.552 57.375 119V90.8765Z" fill="#101111"></path></g><circle cx="60" cy="60" r="20" fill="white"></circle><circle cx="60" cy="60" r="26" fill="#101111"></circle><circle cx="60" cy="60" r="22" fill="white"></circle></svg>`;
});
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
  const { subscribe: subscribe2, update: update2, set } = writable(DEFAULT_STATE);
  return {
    subscribe: subscribe2,
    /**
     * Show the busy-screen if not visible
     */
    startBusy({ initiator: newInitiator, text: text2 }) {
      update2((state) => [
        ...state.filter(({ initiator }) => newInitiator !== initiator),
        { initiator: newInitiator, text: text2 }
      ]);
    },
    /**
     * Hide the busy-screen if no other initiators are done
     */
    stopBusy(initiatorToRemove) {
      update2((state) => state.filter(({ initiator }) => initiator !== initiatorToRemove));
    },
    resetForTesting() {
      set(DEFAULT_STATE);
    }
  };
};
const busyStore = initBusyStore();
const busy = derived(busyStore, ($busyStore) => $busyStore.length > 0);
const busyMessage = derived(busyStore, ($busyStore) => $busyStore.reverse().find(({ text: text2 }) => nonNullish(text2))?.text);
const css$b = {
  code: ".medium.svelte-85668t{--spinner-size:30px}.small.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 1rem)}.tiny.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 0.5rem)}svg.svelte-85668t{width:var(--spinner-size);height:var(--spinner-size);animation:spinner-linear-rotate 2000ms linear infinite;position:absolute;top:calc(50% - var(--spinner-size) / 2);left:calc(50% - var(--spinner-size) / 2);--radius:45px;--circumference:calc(3.1415926536 * var(--radius) * 2);--start:calc((1 - 0.05) * var(--circumference));--end:calc((1 - 0.8) * var(--circumference))}svg.inline.svelte-85668t{display:inline-block;position:relative}circle.svelte-85668t{stroke-dasharray:var(--circumference);stroke-width:10%;transform-origin:50% 50% 0;transition-property:stroke;animation-name:spinner-stroke-rotate-100;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite;fill:transparent;stroke:currentColor;transition:stroke-dashoffset 225ms linear}@keyframes spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes spinner-stroke-rotate-100{0%{stroke-dashoffset:var(--start);transform:rotate(0)}12.5%{stroke-dashoffset:var(--end);transform:rotate(0)}12.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:var(--start);transform:rotate(270deg)}37.5%{stroke-dashoffset:var(--end);transform:rotate(270deg)}37.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:var(--start);transform:rotate(180deg)}62.5%{stroke-dashoffset:var(--end);transform:rotate(180deg)}62.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:var(--start);transform:rotate(90deg)}87.5%{stroke-dashoffset:var(--end);transform:rotate(90deg)}87.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(341.5deg)}}",
  map: '{"version":3,"file":"Spinner.svelte","sources":["Spinner.svelte"],"sourcesContent":["<!-- adapted source: https://github.com/angular/components/tree/master/src/material/progress-spinner -->\\n<script>export let inline = false;\\nexport let size = \\"medium\\";\\n<\/script>\\n\\n<svg\\n  class:inline\\n  class={size}\\n  preserveAspectRatio=\\"xMidYMid meet\\"\\n  focusable=\\"false\\"\\n  aria-hidden=\\"true\\"\\n  data-tid=\\"spinner\\"\\n  viewBox=\\"0 0 100 100\\"><circle cx=\\"50%\\" cy=\\"50%\\" r=\\"45\\" /></svg\\n>\\n\\n<style>.medium {\\n  --spinner-size: 30px;\\n}\\n\\n.small {\\n  --spinner-size: calc(var(--line-height-standard) * 1rem);\\n}\\n\\n.tiny {\\n  --spinner-size: calc(var(--line-height-standard) * 0.5rem);\\n}\\n\\nsvg {\\n  width: var(--spinner-size);\\n  height: var(--spinner-size);\\n  animation: spinner-linear-rotate 2000ms linear infinite;\\n  position: absolute;\\n  top: calc(50% - var(--spinner-size) / 2);\\n  left: calc(50% - var(--spinner-size) / 2);\\n  --radius: 45px;\\n  --circumference: calc(3.1415926536 * var(--radius) * 2);\\n  --start: calc((1 - 0.05) * var(--circumference));\\n  --end: calc((1 - 0.8) * var(--circumference));\\n}\\nsvg.inline {\\n  display: inline-block;\\n  position: relative;\\n}\\n\\ncircle {\\n  stroke-dasharray: var(--circumference);\\n  stroke-width: 10%;\\n  transform-origin: 50% 50% 0;\\n  transition-property: stroke;\\n  animation-name: spinner-stroke-rotate-100;\\n  animation-duration: 4000ms;\\n  animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\\n  animation-iteration-count: infinite;\\n  fill: transparent;\\n  stroke: currentColor;\\n  transition: stroke-dashoffset 225ms linear;\\n}\\n\\n/* -global- */\\n@keyframes -global-spinner-linear-rotate {\\n  0% {\\n    transform: rotate(0deg);\\n  }\\n  100% {\\n    transform: rotate(360deg);\\n  }\\n}\\n/* -global- */\\n@keyframes -global-spinner-stroke-rotate-100 {\\n  0% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(0);\\n  }\\n  12.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(0);\\n  }\\n  12.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(72.5deg);\\n  }\\n  25% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(72.5deg);\\n  }\\n  25.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(270deg);\\n  }\\n  37.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(270deg);\\n  }\\n  37.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(161.5deg);\\n  }\\n  50% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(161.5deg);\\n  }\\n  50.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(180deg);\\n  }\\n  62.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(180deg);\\n  }\\n  62.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(251.5deg);\\n  }\\n  75% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(251.5deg);\\n  }\\n  75.0001% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotate(90deg);\\n  }\\n  87.5% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotate(90deg);\\n  }\\n  87.5001% {\\n    stroke-dashoffset: var(--end);\\n    transform: rotateX(180deg) rotate(341.5deg);\\n  }\\n  100% {\\n    stroke-dashoffset: var(--start);\\n    transform: rotateX(180deg) rotate(341.5deg);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAeO,qBAAQ,CACb,cAAc,CAAE,IAClB,CAEA,oBAAO,CACL,cAAc,CAAE,wCAClB,CAEA,mBAAM,CACJ,cAAc,CAAE,0CAClB,CAEA,iBAAI,CACF,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,IAAI,cAAc,CAAC,CAC3B,SAAS,CAAE,qBAAqB,CAAC,MAAM,CAAC,MAAM,CAAC,QAAQ,CACvD,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACxC,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACzC,QAAQ,CAAE,IAAI,CACd,eAAe,CAAE,sCAAsC,CACvD,OAAO,CAAE,uCAAuC,CAChD,KAAK,CAAE,sCACT,CACA,GAAG,qBAAQ,CACT,OAAO,CAAE,YAAY,CACrB,QAAQ,CAAE,QACZ,CAEA,oBAAO,CACL,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,YAAY,CAAE,GAAG,CACjB,gBAAgB,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAC3B,mBAAmB,CAAE,MAAM,CAC3B,cAAc,CAAE,yBAAyB,CACzC,kBAAkB,CAAE,MAAM,CAC1B,yBAAyB,CAAE,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CACzD,yBAAyB,CAAE,QAAQ,CACnC,IAAI,CAAE,WAAW,CACjB,MAAM,CAAE,YAAY,CACpB,UAAU,CAAE,iBAAiB,CAAC,KAAK,CAAC,MACtC,CAGA,WAAmB,qBAAsB,CACvC,EAAG,CACD,SAAS,CAAE,OAAO,IAAI,CACxB,CACA,IAAK,CACH,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF,CAEA,WAAmB,yBAA0B,CAC3C,EAAG,CACD,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,CAAC,CACrB,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,OAAO,CAC3C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,OAAO,CAC3C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,MAAM,CAC1B,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,GAAI,CACF,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,OAAO,KAAK,CACzB,CACA,KAAM,CACJ,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,OAAO,KAAK,CACzB,CACA,QAAS,CACP,iBAAiB,CAAE,IAAI,KAAK,CAAC,CAC7B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACA,IAAK,CACH,iBAAiB,CAAE,IAAI,OAAO,CAAC,CAC/B,SAAS,CAAE,QAAQ,MAAM,CAAC,CAAC,OAAO,QAAQ,CAC5C,CACF"}'
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { inline = false } = $$props;
  let { size = "medium" } = $$props;
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$result.css.add(css$b);
  return `  <svg class="${[escape(null_to_empty(size), true) + " svelte-85668t", inline ? "inline" : ""].join(" ").trim()}" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" data-tid="spinner" viewBox="0 0 100 100"><circle cx="50%" cy="50%" r="45" class="svelte-85668t"></circle></svg>`;
});
const css$a = {
  code: "div.svelte-14plyno{z-index:calc(var(--z-index) + 1000);position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop);color:var(--backdrop-contrast)}.content.svelte-14plyno{display:flex;flex-direction:column;justify-content:center;align-items:center}p.svelte-14plyno{padding-bottom:var(--padding);max-width:calc(var(--section-max-width) / 2)}",
  map: '{"version":3,"file":"BusyScreen.svelte","sources":["BusyScreen.svelte"],"sourcesContent":["<script>import { fade } from \\"svelte/transition\\";\\nimport { busy, busyMessage } from \\"../stores/busy.store\\";\\nimport Spinner from \\"./Spinner.svelte\\";\\nimport { nonNullish } from \\"@dfinity/utils\\";\\n<\/script>\\n\\n<!-- Display spinner and lock UI if busyStore is not empty -->\\n{#if $busy}\\n  <div data-tid=\\"busy\\" transition:fade|global>\\n    <div class=\\"content\\">\\n      {#if nonNullish($busyMessage)}\\n        <p>{$busyMessage}</p>\\n      {/if}\\n      <span>\\n        <Spinner inline />\\n      </span>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>div {\\n  z-index: calc(var(--z-index) + 1000);\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  background: var(--backdrop);\\n  color: var(--backdrop-contrast);\\n}\\n\\n.content {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\np {\\n  padding-bottom: var(--padding);\\n  max-width: calc(var(--section-max-width) / 2);\\n}</style>\\n"],"names":[],"mappings":"AAoBO,kBAAI,CACT,OAAO,CAAE,KAAK,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACpC,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,mBAAmB,CAChC,CAEA,uBAAS,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACf,CAEA,gBAAE,CACA,cAAc,CAAE,IAAI,SAAS,CAAC,CAC9B,SAAS,CAAE,KAAK,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,CAAC,CAC9C"}'
};
const BusyScreen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $busy, $$unsubscribe_busy;
  let $busyMessage, $$unsubscribe_busyMessage;
  $$unsubscribe_busy = subscribe(busy, (value) => $busy = value);
  $$unsubscribe_busyMessage = subscribe(busyMessage, (value) => $busyMessage = value);
  $$result.css.add(css$a);
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
  const { subscribe: subscribe2, update: update2 } = writable(initialMenu);
  return {
    subscribe: subscribe2,
    toggle: () => {
      update2((state) => {
        const menu = state === Menu.EXPANDED ? Menu.COLLAPSED : Menu.EXPANDED;
        applyMenu({ menu, preserve: true });
        return menu;
      });
    }
  };
};
const menuStore = initMenuStore();
derived(menuStore, ($menuStore) => $menuStore === Menu.COLLAPSED);
const css$9 = {
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
  $$result.css.add(css$9);
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
        isHomepage ? "bg-GolfPadYellow  items-center justify-center relative" : "bg-white",
        true
      ) + " flex-1 flex"}">${slots.default ? slots.default({}) : ``}</div> ${!isHomepage ? `<div class="bg-GolfPadYellow flex-none relative h-[50px] mt-auto" data-svelte-h="svelte-ba1d4j"><div class="absolute z-10 bottom-4 left-4"><a href="/whitepaper" class="text-sm font-medium text-black">WHITEPAPER |</a> <a href="/team" class="text-sm font-medium text-black">TEAM |</a> <a target="_blank" href="https://github.com/jamesbeadle/golfpad" class="text-sm font-medium text-black">GITHUB</a></div></div>` : ``}</div> `;
    }();
  }(init2())} ${validate_component(BusyScreen, "BusyScreen").$$render($$result, {}, {}, {})}`;
});
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
    "NextUp": IDL.Null
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
  const GetGameDTO = IDL.Record({ "gameId": GameId });
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
  const PaginationFilters = IDL.Record({
    "offset": IDL.Nat,
    "limit": IDL.Nat
  });
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
var define_process_env_default$2 = { BACKEND_CANISTER_ID: "bkyz2-fmaaa-aaaaa-qaaaq-cai", FRONTEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", DFX_NETWORK: "local" };
const canisterId = define_process_env_default$2.CANISTER_ID_BACKEND;
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
var define_process_env_default$1 = { BACKEND_CANISTER_ID: "bkyz2-fmaaa-aaaaa-qaaaq-cai", FRONTEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", DFX_NETWORK: "local" };
class ActorFactory {
  static createActor(idlFactory2, canisterId2 = "", identity = null, options2 = null) {
    const hostOptions = {
      host: "http://127.0.0.1:8080",
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
    if (define_process_env_default$1.NODE_ENV !== "production") {
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
}
function isError(response) {
  return response && response.err !== void 0;
}
function getFileExtensionFromFile(file) {
  const filename = file.name;
  const lastIndex = filename.lastIndexOf(".");
  return lastIndex !== -1 ? filename.substring(lastIndex + 1) : "";
}
var define_process_env_default = { BACKEND_CANISTER_ID: "bkyz2-fmaaa-aaaaa-qaaaq-cai", FRONTEND_CANISTER_ID: "bd3sg-teaaa-aaaaa-qaaba-cai", DFX_NETWORK: "local" };
function createUserStore() {
  const { subscribe: subscribe2, set } = writable(null);
  async function sync() {
    let localStorageString = localStorage.getItem("user_data");
    if (localStorageString && localStorageString != "undefined") {
      const localUser = JSON.parse(localStorageString);
      set(localUser);
      return;
    }
    try {
      await cacheUser();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
  async function cacheUser() {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      define_process_env_default.BACKEND_CANISTER_ID
    );
    let getUserResponse = await identityActor.getUser();
    let error = isError(getUserResponse);
    if (error) {
      console.error("Error fetching user user");
      return;
    }
    let userData = getUserResponse.ok;
    set(userData);
  }
  async function createUser(username, handicap, profilePicture, principalId) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        define_process_env_default.BACKEND_CANISTER_ID ?? ""
      );
      const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve2, reject) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = () => {
            const arrayBuffer = reader.result;
            resolve2(new Uint8Array(arrayBuffer));
          };
          reader.onerror = () => {
            reject(new Error("Error reading file"));
          };
        });
      };
      try {
        var extension = "";
        const maxPictureSize = 500;
        if (profilePicture && profilePicture.size > maxPictureSize * 1024) {
          throw new Error("File size exceeds the limit of 500KB");
        }
        if (profilePicture) {
          extension = getFileExtensionFromFile(profilePicture);
        }
        let dto = {
          username,
          handicap,
          golferPicture: profilePicture ? [await readFileAsArrayBuffer(profilePicture)] : [],
          golferPictureExtension: extension,
          principalId
        };
        const result = await identityActor.createUser(dto);
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
        define_process_env_default.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.updateUserDetail(updatedUser);
      sync();
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async function isUsernameTaken(username) {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        define_process_env_default.BACKEND_CANISTER_ID ?? ""
      );
      const result = await identityActor.isUsernameTaken(username);
      return result;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }
  async function updateUserPicture(picture) {
    try {
      const maxPictureSize = 1e3;
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
            define_process_env_default.BACKEND_CANISTER_ID ?? ""
          );
          const result = await identityActor.updateUserPicture(uint8Array);
          sync();
          return result;
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }
  return {
    subscribe: subscribe2,
    sync,
    createUser,
    updateUser,
    updateUserPicture,
    isUsernameTaken
  };
}
const userStore = createUserStore();
const userGetAgentPicture = derived(
  userStore,
  (user) => user !== null && user !== void 0 && user.userPicture !== void 0 && user.userPicture.length > 0 ? URL.createObjectURL(new Blob([new Uint8Array(user.userPicture)])) : "placeholder.png"
);
const Page$6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authSignedInStore, $$unsubscribe_authSignedInStore;
  let $userGetAgentPicture, $$unsubscribe_userGetAgentPicture;
  $$unsubscribe_authSignedInStore = subscribe(authSignedInStore, (value) => $authSignedInStore = value);
  $$unsubscribe_userGetAgentPicture = subscribe(userGetAgentPicture, (value) => $userGetAgentPicture = value);
  $$unsubscribe_authSignedInStore();
  $$unsubscribe_userGetAgentPicture();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="z-10 px-4 text-center"><h1 class="mb-1 font-bold text-GolfPadForest" data-svelte-h="svelte-h9sgsu">WELCOME TO <span class="condensed">GOLFPAD</span></h1> <h2 class="mx-16 mb-6 text-3xl font-black leading-tight text-black md:text-6xl condensed" data-svelte-h="svelte-b01hg0">THE FUTURE OF GOLF STARTS HERE</h2> ${!$authSignedInStore ? `<button class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow" data-svelte-h="svelte-1xn4nag">CONNECT</button>` : ``} ${$authSignedInStore ? `<img${add_attribute("src", $userGetAgentPicture, 0)} alt="Profile" class="profile-pic-bottom-right" aria-label="Toggle Profile"> <button class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow" data-svelte-h="svelte-1ijbrxg">SIGN OUT</button>` : ``} <style data-svelte-h="svelte-zvmyc3">.profile-pic-bottom-right {
            position: fixed;
            bottom: 10px; 
            right: 10px; 
            width: 50px;  
            height: auto; 
            border-radius: 50%; 
        }</style></div> <div class="absolute bottom-0 left-0 z-0 w-full" data-svelte-h="svelte-1m4zgpi"><img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden"> <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full h-auto md:flex"></div>`;
    }
  })}`;
});
const css$8 = {
  code: "button.svelte-18ue7le{transition:color 0.3s, border-color 0.3s}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { writable } from \\"svelte/store\\";\\nimport Layout from \\"../Layout.svelte\\";\\nonMount(() => {\\n    window.scrollTo(0, 0);\\n});\\nconst selectedGame = writable(\\"Mulligans\\");\\n<\/script>\\n\\n<Layout>\\n    <div class=\\"p-4 text-black w-full max-w-4xl mx-auto\\">\\n        <h2 class=\\"text-2xl md:text-4xl font-black text-black mb-6 mt-3\\">\\n            GAMEPLAY RULES\\n        </h2>\\n\\n        <p class=\\"text-base md:text-lg leading-relaxed mb-6\\">\\n            Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.\\n        </p>\\n\\n        <div class=\\"border-b border-gray-300 mb-4\\">\\n            <div class=\\"flex flex-wrap space-x-2 md:space-x-4 overflow-x-auto\\">\\n                <button\\n                    class=\\"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Mulligans') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}\\"\\n                    on:click={() => selectedGame.set('Mulligans')}\\n                >\\n                <span class=\\"condensed\\">MULLIGANS</span>\\n                </button>\\n                <button\\n                    class=\\"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Bands') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}\\"\\n                    on:click={() => selectedGame.set('Bands')}\\n                >\\n                <span class=\\"condensed\\">BANDS</span>\\n                </button>\\n                <button\\n                    class=\\"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Build It') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}\\"\\n                    on:click={() => selectedGame.set('Build It')}\\n                >\\n                <span class=\\"condensed\\">BUILD IT</span>\\n                </button>\\n                <button\\n                    class=\\"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 {($selectedGame === 'Next Up') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}\\"\\n                    on:click={() => selectedGame.set('Next Up')}\\n                >\\n                <span class=\\"condensed\\">NEXT UP</span>\\n                </button>\\n            </div>\\n        </div>\\n\\n        <div class=\\"bg-white p-4 md:p-6 rounded-lg shadow-lg\\">\\n            {#if $selectedGame === 'Mulligans'}\\n                <div class=\\"flex flex-col md:flex-row items-center mb-4\\">\\n                    <img src=\\"mulligans.png\\" alt=\\"mulligans\\" class=\\"w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4\\" />\\n                    <h3 class=\\"text-xl md:text-2xl condensed\\">MULLIGANS</h3>\\n                </div>\\n                <ul class=\\"list-disc list-inside text-sm md:text-base text-gray-700 space-y-2\\">\\n                    <li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li>\\n                    <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li>\\n                    <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li>\\n                    <li>A golfer can use as many mulligans as they have available on any hole.</li>\\n                    <li>A golfer can build up as many mulligans as they can.</li>\\n                    <li>The game is decided when a golfer is winning by more holes than are available to play.</li>\\n                </ul>\\n            {/if}\\n\\n            {#if $selectedGame === 'Bands'}\\n                <div class=\\"flex flex-col md:flex-row items-center mb-4\\">\\n                    <img src=\\"bands.png\\" alt=\\"bands\\" class=\\"w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4\\" />\\n                    <h3 class=\\"text-xl md:text-2xl condensed\\">BANDS</h3>\\n                </div>\\n                <p class=\\"text-sm md:text-base text-gray-700 mb-4\\">\\n                    Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. \\n                    Each band must start on a different hole but they are allowed to overlap.\\n                </p>\\n\\n                <p class=\\"text-sm md:text-base text-gray-700 mb-4\\">\\n                    The points for each band are as follows:\\n                </p>\\n\\n                <ul class=\\"list-disc list-inside text-sm md:text-base text-gray-700 space-y-2\\">\\n                    <li><span class=\\"semi-bold\\">Band 1:</span> Holes where you don’t hit a tree or enter a bunker. <span class=\\"semi-bold\\">15 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 2:</span> Holes where you won’t lose a ball. <span class=\\"semi-bold\\">10 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 3:</span> Holes where you hit 2/3 fairways. <span class=\\"semi-bold\\">20 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 4:</span> Holes where you hit 2/3 greens. <span class=\\"semi-bold\\">25 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 5:</span> Holes where you will 1-putt 2/3 greens. <span class=\\"semi-bold\\">30 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 6:</span> Holes where you won’t get a double bogey or worse. <span class=\\"semi-bold\\">35 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 7:</span> Holes where you won’t bogey or worse. <span class=\\"semi-bold\\">40 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 8:</span> Holes where you’ll be par or under. <span class=\\"semi-bold\\">45 points</span></li>\\n                    <li><span class=\\"semi-bold\\">Band 9:</span> Holes where you’ll be under par. <span class=\\"semi-bold\\">50 points</span></li>\\n                </ul>\\n                <p class=\\"text-sm md:text-base text-gray-700 mt-4\\">\\n                    A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.\\n                </p>\\n            {/if}\\n\\n\\n            {#if $selectedGame === 'Build It'}\\n                <div class=\\"flex flex-col md:flex-row items-center mb-4\\">\\n                    <img src=\\"build-it.png\\" alt=\\"build-it\\" class=\\"w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4\\" />\\n                    <h3 class=\\"text-xl md:text-2xl condensed\\">BUILD IT</h3>\\n                </div>\\n                <ul class=\\"list-disc list-inside text-sm md:text-base text-gray-700 space-y-2\\">\\n                    <li>A golfer can create a team in which they can compete against multiple other teams.</li>\\n                    <li>The golfer who created the team becomes the team's captain.</li>\\n                    <li>A team captain sets up a game on a specific course and tee to compete against other teams.</li>\\n                    <li>A team captain invites other team's to join in a new game.</li>\\n                    <li>A team captain selects a period of time to build their team card over.</li>\\n                    <li>Golfers add their scorecards transferring any new lowest scores over to the team card.</li>\\n                    <li>The winners are the team with the lowest scorecard at the end of the game's duration.</li>\\n                </ul>\\n            {/if}\\n\\n            {#if $selectedGame === 'Next Up'}\\n                <div class=\\"flex flex-col md:flex-row items-center mb-4\\">\\n                    <img src=\\"next-up.png\\" alt=\\"next-up\\" class=\\"w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4\\" />\\n                    <h3 class=\\"text-xl md:text-2xl condensed\\">NEXT UP</h3>\\n                </div>\\n                <ul class=\\"list-disc list-inside text-sm md:text-base text-gray-700 space-y-2\\">\\n                    <li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li>\\n                    <li>If a golfer wins the hole they are defending, they get 3 points.</li>\\n                    <li>If a golfer wins a hole they are not defending, they get 1 point.</li>\\n                    <li>The winner is the golfer with the most points at the end of the round.</li>\\n                    <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li>\\n                </ul>\\n            {/if}\\n        </div>\\n    </div>\\n</Layout>\\n\\n<style>\\n    button {\\n        transition: color 0.3s, border-color 0.3s;\\n    }</style>\\n"],"names":[],"mappings":"AAiII,qBAAO,CACH,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,CAAC,YAAY,CAAC,IACzC"}`
};
const Page$5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedGame, $$unsubscribe_selectedGame;
  const selectedGame = writable("Mulligans");
  $$unsubscribe_selectedGame = subscribe(selectedGame, (value) => $selectedGame = value);
  $$result.css.add(css$8);
  $$unsubscribe_selectedGame();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-4 text-black w-full max-w-4xl mx-auto"><h2 class="text-2xl md:text-4xl font-black text-black mb-6 mt-3" data-svelte-h="svelte-2544s8">GAMEPLAY RULES</h2> <p class="text-base md:text-lg leading-relaxed mb-6" data-svelte-h="svelte-1srkqtt">Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.</p> <div class="border-b border-gray-300 mb-4"><div class="flex flex-wrap space-x-2 md:space-x-4 overflow-x-auto"><button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Mulligans" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      ) + " svelte-18ue7le"}"><span class="condensed" data-svelte-h="svelte-1jctqhy">MULLIGANS</span></button> <button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Bands" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      ) + " svelte-18ue7le"}"><span class="condensed" data-svelte-h="svelte-b8c3iw">BANDS</span></button> <button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Build It" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      ) + " svelte-18ue7le"}"><span class="condensed" data-svelte-h="svelte-zhub7t">BUILD IT</span></button> <button class="${"text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 " + escape(
        $selectedGame === "Next Up" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500",
        true
      ) + " svelte-18ue7le"}"><span class="condensed" data-svelte-h="svelte-169yoda">NEXT UP</span></button></div></div> <div class="bg-white p-4 md:p-6 rounded-lg shadow-lg">${$selectedGame === "Mulligans" ? `<div class="flex flex-col md:flex-row items-center mb-4" data-svelte-h="svelte-uxi7lo"><img src="mulligans.png" alt="mulligans" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">MULLIGANS</h3></div> <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2" data-svelte-h="svelte-1fqz0vv"><li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li> <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li> <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li> <li>A golfer can use as many mulligans as they have available on any hole.</li> <li>A golfer can build up as many mulligans as they can.</li> <li>The game is decided when a golfer is winning by more holes than are available to play.</li></ul>` : ``} ${$selectedGame === "Bands" ? `<div class="flex flex-col md:flex-row items-center mb-4" data-svelte-h="svelte-1gn2qme"><img src="bands.png" alt="bands" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BANDS</h3></div> <p class="text-sm md:text-base text-gray-700 mb-4" data-svelte-h="svelte-1de9wsf">Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. 
                    Each band must start on a different hole but they are allowed to overlap.</p> <p class="text-sm md:text-base text-gray-700 mb-4" data-svelte-h="svelte-1a1hvw7">The points for each band are as follows:</p> <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2" data-svelte-h="svelte-1syh2qn"><li><span class="semi-bold">Band 1:</span> Holes where you don’t hit a tree or enter a bunker. <span class="semi-bold">15 points</span></li> <li><span class="semi-bold">Band 2:</span> Holes where you won’t lose a ball. <span class="semi-bold">10 points</span></li> <li><span class="semi-bold">Band 3:</span> Holes where you hit 2/3 fairways. <span class="semi-bold">20 points</span></li> <li><span class="semi-bold">Band 4:</span> Holes where you hit 2/3 greens. <span class="semi-bold">25 points</span></li> <li><span class="semi-bold">Band 5:</span> Holes where you will 1-putt 2/3 greens. <span class="semi-bold">30 points</span></li> <li><span class="semi-bold">Band 6:</span> Holes where you won’t get a double bogey or worse. <span class="semi-bold">35 points</span></li> <li><span class="semi-bold">Band 7:</span> Holes where you won’t bogey or worse. <span class="semi-bold">40 points</span></li> <li><span class="semi-bold">Band 8:</span> Holes where you’ll be par or under. <span class="semi-bold">45 points</span></li> <li><span class="semi-bold">Band 9:</span> Holes where you’ll be under par. <span class="semi-bold">50 points</span></li></ul> <p class="text-sm md:text-base text-gray-700 mt-4" data-svelte-h="svelte-1kcklgv">A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.</p>` : ``} ${$selectedGame === "Build It" ? `<div class="flex flex-col md:flex-row items-center mb-4" data-svelte-h="svelte-142a6w9"><img src="build-it.png" alt="build-it" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BUILD IT</h3></div> <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2" data-svelte-h="svelte-1y3wufm"><li>A golfer can create a team in which they can compete against multiple other teams.</li> <li>The golfer who created the team becomes the team&#39;s captain.</li> <li>A team captain sets up a game on a specific course and tee to compete against other teams.</li> <li>A team captain invites other team&#39;s to join in a new game.</li> <li>A team captain selects a period of time to build their team card over.</li> <li>Golfers add their scorecards transferring any new lowest scores over to the team card.</li> <li>The winners are the team with the lowest scorecard at the end of the game&#39;s duration.</li></ul>` : ``} ${$selectedGame === "Next Up" ? `<div class="flex flex-col md:flex-row items-center mb-4" data-svelte-h="svelte-eema9s"><img src="next-up.png" alt="next-up" class="w-full h-32 md:w-20 md:h-20 rounded-lg object-cover object-center md:object-contain mb-4 md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">NEXT UP</h3></div> <ul class="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2" data-svelte-h="svelte-1ec81tj"><li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li> <li>If a golfer wins the hole they are defending, they get 3 points.</li> <li>If a golfer wins a hole they are not defending, they get 1 point.</li> <li>The winner is the golfer with the most points at the end of the round.</li> <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li></ul>` : ``}</div></div>`;
    }
  })}`;
});
const golferGameSummary = writable(null);
const css$7 = {
  code: ".btn.svelte-oxid1a.svelte-oxid1a{padding:10px 20px;font-weight:bold;border-radius:5px;cursor:pointer}.btn-new-game.svelte-oxid1a.svelte-oxid1a{background-color:#f6c200;color:#1C4932;border:none}.btn-predict.svelte-oxid1a.svelte-oxid1a{background-color:#007bff;color:white;padding:10px 15px}.table-headings.svelte-oxid1a.svelte-oxid1a{background-color:#f7f7f7;padding:10px;font-size:20px;width:100%;text-align:left;font-weight:bold}.game-type.svelte-oxid1a h3.svelte-oxid1a{font-weight:bold}.game-list.svelte-oxid1a.svelte-oxid1a{background-color:#f7f7f7;border-top:1px solid #eee;margin-top:20px;text-align:left;width:100%}.game-type.svelte-oxid1a.svelte-oxid1a{display:flex;align-items:center;border-bottom:1px solid #eee;padding:20px 0}.game-info.svelte-oxid1a.svelte-oxid1a{width:60px;height:60px;border-radius:5px}.players.svelte-oxid1a.svelte-oxid1a{display:flex;background-color:#f7f7f7}.hover-picture.svelte-oxid1a.svelte-oxid1a{display:none;position:absolute;top:50px;left:0;z-index:100}.hover-player.svelte-oxid1a.svelte-oxid1a{background-color:white;border-radius:8px;box-shadow:0px 4px 8px rgba(0,0,0,0.1);padding:10px}.btn-view-player.svelte-oxid1a.svelte-oxid1a{background-color:#007bff;color:white;padding:5px 10px;border-radius:5px}.status.svelte-oxid1a.svelte-oxid1a{font-size:18px;font-weight:bold;color:#007bff;background-color:#f7f7f7}.flex.svelte-oxid1a.svelte-oxid1a{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}h2.svelte-oxid1a.svelte-oxid1a{text-align:left;margin-left:0}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport Layout from \\"../Layout.svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { golferGameSummary, getGolferGameSummary } from \\"$lib/stores/golfer-summaries-store\\";\\nimport ShowSelectGameModal from \\"$lib/components/games/show-select-game-modal.svelte\\";\\nlet showNewGameModal = false;\\nlet pageFilters = {\\n    limit: BigInt(0),\\n    offset: BigInt(0),\\n};\\n// Fetch golfer game summaries on mount\\nonMount(async () => {\\n    try {\\n        const result = await getGolferGameSummary(pageFilters);\\n        console.log(result); // Log the result after it\'s fetched\\n    }\\n    catch (err) {\\n        console.error(\\"Failed to fetch golfer game summaries:\\", err);\\n    }\\n});\\nfunction openGameModal() {\\n    showNewGameModal = true;\\n}\\nfunction closeGameModal() {\\n    showNewGameModal = false;\\n}\\nfunction handleGameSelection(event) {\\n    const gameChoice = event.detail;\\n    closeGameModal();\\n    goto(`/${gameChoice}-new`);\\n}\\n<\/script>\\n\\n<Layout>\\n    <div class=\\"w-full\\">\\n        <div class=\\"w-full h-full p-2 px-4 text-black\\">\\n            <div class=\\"flex items-center justify-between mb-4\\">\\n                <h2 class=\\"mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed\\">MY GAMES</h2>\\n                <button on:click={openGameModal} class=\\"btn btn-new-game\\">New Game</button>\\n                {#if showNewGameModal}\\n                    <ShowSelectGameModal visible={showNewGameModal} closeModal={closeGameModal} on:gameSelected={handleGameSelection} />\\n                {/if}\\n            </div>\\n\\n            <!-- Headings -->\\n            <div class=\\"flex items-center p-4 font-bold table-headings condensed\\">\\n                <div class=\\"w-2/6\\">Game</div>\\n                <div class=\\"w-2/6\\">Players</div>\\n                <div class=\\"w-1/6\\">Status</div>\\n                <div class=\\"w-1/6\\"></div>\\n            </div>\\n\\n            <!-- Check if there are no games -->\\n            {#if $golferGameSummary && $golferGameSummary.totalEntries === BigInt(0)}\\n                <!-- Content to display when totalEntries is 0 -->\\n                <p>No game history found. Start your first game!</p>\\n            {/if}\\n\\n            <!-- Game List -->\\n            {#if $golferGameSummary && $golferGameSummary.entries.length > 0}\\n                {#each $golferGameSummary.entries as game}\\n                    <div class=\\"game-list\\">\\n                        <div class=\\"flex items-center p-4 game-type\\">\\n                            <div class=\\"flex items-center game-info\\">\\n                                <!-- Game image -->\\n                            </div>\\n                            <div class=\\"ml-4\\">\\n                                <h3 class=\\"font-bold\\">{game.gameType}</h3>\\n                                <p class=\\"text-sm\\">{new Date(Number(game.date) * 1000).toLocaleDateString()}</p>\\n                            </div>\\n                        </div>\\n\\n                        <!-- Players Column -->\\n                        <div class=\\"flex ml-auto players\\">\\n                            {#each game.players as player}\\n                                <div class=\\"hover-picture\\">\\n                                    <div class=\\"p-2 bg-white rounded shadow-lg hover-player\\">\\n                                        <p class=\\"font-bold\\">{player}</p>\\n                                        <button class=\\"btn btn-view-player\\">View Player</button>\\n                                    </div>\\n                                </div>\\n                            {/each}\\n                        </div>\\n\\n                        <!-- Status Column -->\\n                        <div class=\\"w-1/6 font-bold text-blue-500 status\\">\\n                            {game.status}\\n                        </div>\\n\\n                        <!-- Button Column -->\\n                        <div class=\\"w-1/6 actions\\">\\n                            <button class=\\"btn btn-predict\\">Predict</button>\\n                        </div>\\n                    </div>\\n                {/each}\\n            {/if}\\n        </div>\\n    </div>\\n</Layout>\\n\\n\\n<style>\\n    /* Example button styling */\\n    .btn {\\n        padding: 10px 20px;\\n        font-weight: bold;\\n        border-radius: 5px;\\n        cursor: pointer;\\n    }\\n\\n    .btn-new-game {\\n        background-color: #f6c200;\\n        color: #1C4932;\\n        border: none;\\n    }\\n\\n    .btn-predict {\\n        background-color: #007bff;\\n        color: white;\\n        padding: 10px 15px;\\n    }\\n    \\n    .table-headings{\\n        background-color: #f7f7f7;\\n        padding: 10px;\\n        font-size: 20px;\\n        width:100%;\\n        text-align: left;\\n        font-weight: bold;\\n    }\\n\\n    .game-type h3 {\\n        font-weight: bold;\\n    }\\n\\n    .game-list {\\n        background-color: #f7f7f7;\\n        border-top: 1px solid #eee;\\n        margin-top: 20px;\\n        text-align: left;\\n        width: 100%;\\n    }\\n\\n    .game-type {\\n        display: flex;\\n        align-items: center;\\n        border-bottom: 1px solid #eee;\\n        padding: 20px 0;\\n    }\\n\\n    .game-info {\\n        width: 60px;\\n        height: 60px;\\n        border-radius: 5px;\\n    }\\n\\n    .players {\\n        display: flex;\\n        background-color: #f7f7f7;\\n    }\\n\\n    .hover-picture {\\n        display: none;\\n        position: absolute;\\n        top: 50px;\\n        left: 0;\\n        z-index: 100;\\n    }\\n\\n    .hover-player {\\n        background-color: white;\\n        border-radius: 8px;\\n        box-shadow: 0px 4px 8px rgba(0,0,0,0.1);\\n        padding: 10px;\\n    }\\n\\n    .btn-view-player {\\n        background-color: #007bff;\\n        color: white;\\n        padding: 5px 10px;\\n        border-radius: 5px;\\n    }\\n\\n    .status {\\n        font-size: 18px;\\n        font-weight: bold;\\n        color: #007bff;\\n        background-color: #f7f7f7;\\n    }\\n\\n    .flex {\\n        display: flex;\\n        justify-content: space-between;\\n        align-items: center;\\n        margin-bottom: 20px;\\n    }\\n\\n/*     .no-games-message {\\n        text-align: center;\\n        margin-top: 20px;\\n        font-size: 18px;\\n        font-weight: bold;\\n        color: gray;\\n    } */\\n\\n    h2 {\\n        text-align: left;\\n        margin-left: 0;\\n    }</style>"],"names":[],"mappings":"AAuGI,gCAAK,CACD,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OACZ,CAEA,yCAAc,CACV,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,IACZ,CAEA,wCAAa,CACT,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CAAC,IAClB,CAEA,2CAAe,CACX,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,MAAM,IAAI,CACV,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IACjB,CAEA,wBAAU,CAAC,gBAAG,CACV,WAAW,CAAE,IACjB,CAEA,sCAAW,CACP,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC1B,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IACX,CAEA,sCAAW,CACP,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC7B,OAAO,CAAE,IAAI,CAAC,CAClB,CAEA,sCAAW,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GACnB,CAEA,oCAAS,CACL,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,OACtB,CAEA,0CAAe,CACX,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,GACb,CAEA,yCAAc,CACV,gBAAgB,CAAE,KAAK,CACvB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACvC,OAAO,CAAE,IACb,CAEA,4CAAiB,CACb,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,aAAa,CAAE,GACnB,CAEA,mCAAQ,CACJ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,CACd,gBAAgB,CAAE,OACtB,CAEA,iCAAM,CACF,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,IACnB,CAUA,8BAAG,CACC,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,CACjB"}'
};
const Page$4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $golferGameSummary, $$unsubscribe_golferGameSummary;
  $$unsubscribe_golferGameSummary = subscribe(golferGameSummary, (value) => $golferGameSummary = value);
  ({ limit: BigInt(0), offset: BigInt(0) });
  $$result.css.add(css$7);
  $$unsubscribe_golferGameSummary();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="w-full"><div class="w-full h-full p-2 px-4 text-black"><div class="flex items-center justify-between mb-4 svelte-oxid1a"><h2 class="mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed svelte-oxid1a" data-svelte-h="svelte-a8tfl1">MY GAMES</h2> <button class="btn btn-new-game svelte-oxid1a" data-svelte-h="svelte-di9i36">New Game</button> ${``}</div>  <div class="flex items-center p-4 font-bold table-headings condensed svelte-oxid1a" data-svelte-h="svelte-1e89po5"><div class="w-2/6">Game</div> <div class="w-2/6">Players</div> <div class="w-1/6">Status</div> <div class="w-1/6"></div></div>  ${$golferGameSummary && $golferGameSummary.totalEntries === BigInt(0) ? ` <p data-svelte-h="svelte-rlwbs1">No game history found. Start your first game!</p>` : ``}  ${$golferGameSummary && $golferGameSummary.entries.length > 0 ? `${each($golferGameSummary.entries, (game) => {
        return `<div class="game-list svelte-oxid1a"><div class="flex items-center p-4 game-type svelte-oxid1a"><div class="flex items-center game-info svelte-oxid1a" data-svelte-h="svelte-1cw2ejx"></div> <div class="ml-4"><h3 class="font-bold svelte-oxid1a">${escape(game.gameType)}</h3> <p class="text-sm">${escape(new Date(Number(game.date) * 1e3).toLocaleDateString())}</p> </div></div>  <div class="flex ml-auto players svelte-oxid1a">${each(game.players, (player) => {
          return `<div class="hover-picture svelte-oxid1a"><div class="p-2 bg-white rounded shadow-lg hover-player svelte-oxid1a"><p class="font-bold">${escape(player)}</p> <button class="btn btn-view-player svelte-oxid1a" data-svelte-h="svelte-y5anln">View Player</button></div> </div>`;
        })}</div>  <div class="w-1/6 font-bold text-blue-500 status svelte-oxid1a">${escape(game.status)}</div>  <div class="w-1/6 actions" data-svelte-h="svelte-vo6icp"><button class="btn btn-predict svelte-oxid1a">Predict</button></div> </div>`;
      })}` : ``}</div></div>`;
    }
  })}`;
});
function createFloatingActions(initOptions) {
  let referenceElement;
  let floatingElement;
  const defaultOptions = {
    autoUpdate: true
  };
  let options2 = initOptions;
  const getOptions = (mixin) => {
    return { ...defaultOptions, ...initOptions || {}, ...mixin || {} };
  };
  const updatePosition = (updateOptions) => {
    if (referenceElement && floatingElement) {
      options2 = getOptions(updateOptions);
      computePosition(referenceElement, floatingElement, options2).then((v) => {
        Object.assign(floatingElement.style, {
          position: v.strategy,
          left: `${v.x}px`,
          top: `${v.y}px`
        });
        options2?.onComputed && options2.onComputed(v);
      });
    }
  };
  const referenceAction = (node) => {
    if ("subscribe" in node) {
      setupVirtualElementObserver(node);
      return {};
    } else {
      referenceElement = node;
      updatePosition();
    }
  };
  const contentAction = (node, contentOptions) => {
    let autoUpdateDestroy;
    floatingElement = node;
    options2 = getOptions(contentOptions);
    setTimeout(() => updatePosition(contentOptions), 0);
    updatePosition(contentOptions);
    const destroyAutoUpdate = () => {
      if (autoUpdateDestroy) {
        autoUpdateDestroy();
        autoUpdateDestroy = void 0;
      }
    };
    const initAutoUpdate = ({ autoUpdate: autoUpdate$1 } = options2 || {}) => {
      destroyAutoUpdate();
      if (autoUpdate$1 !== false) {
        tick().then(() => {
          return autoUpdate(referenceElement, floatingElement, () => updatePosition(options2), autoUpdate$1 === true ? {} : autoUpdate$1);
        });
      }
      return;
    };
    autoUpdateDestroy = initAutoUpdate();
    return {
      update(contentOptions2) {
        updatePosition(contentOptions2);
        autoUpdateDestroy = initAutoUpdate(contentOptions2);
      },
      destroy() {
        destroyAutoUpdate();
      }
    };
  };
  const setupVirtualElementObserver = (node) => {
    const unsubscribe = node.subscribe(($node) => {
      if (referenceElement === void 0) {
        referenceElement = $node;
        updatePosition();
      } else {
        Object.assign(referenceElement, $node);
        updatePosition();
      }
    });
    onDestroy(unsubscribe);
  };
  return [
    referenceAction,
    contentAction,
    updatePosition
  ];
}
function filter({
  loadOptions,
  filterText,
  items,
  multiple,
  value,
  itemId,
  groupBy,
  filterSelectedItems,
  itemFilter,
  convertStringItemsToObjects: convertStringItemsToObjects2,
  filterGroupedItems,
  label
}) {
  if (items && loadOptions) return items;
  if (!items) return [];
  if (items && items.length > 0 && typeof items[0] !== "object") {
    items = convertStringItemsToObjects2(items);
  }
  let filterResults = items.filter((item) => {
    let matchesFilter = itemFilter(item[label], filterText, item);
    if (matchesFilter && multiple && value?.length) {
      matchesFilter = !value.some((x) => {
        return filterSelectedItems ? x[itemId] === item[itemId] : false;
      });
    }
    return matchesFilter;
  });
  if (groupBy) {
    filterResults = filterGroupedItems(filterResults);
  }
  return filterResults;
}
async function getItems({ dispatch, loadOptions, convertStringItemsToObjects: convertStringItemsToObjects2, filterText }) {
  let res = await loadOptions(filterText).catch((err) => {
    console.warn("svelte-select loadOptions error :>> ", err);
    dispatch("error", { type: "loadOptions", details: err });
  });
  if (res && !res.cancelled) {
    if (res) {
      if (res && res.length > 0 && typeof res[0] !== "object") {
        res = convertStringItemsToObjects2(res);
      }
      dispatch("loaded", { items: res });
    } else {
      res = [];
    }
    return {
      filteredItems: res,
      loading: false,
      focused: true,
      listOpen: true
    };
  }
}
const css$6 = {
  code: "svg.svelte-1ea3f3y{width:var(--chevron-icon-width, 20px);height:var(--chevron-icon-width, 20px);color:var(--chevron-icon-colour, currentColor)}",
  map: '{"version":3,"file":"ChevronIcon.svelte","sources":["ChevronIcon.svelte"],"sourcesContent":["<svg\\n    width=\\"100%\\"\\n    height=\\"100%\\"\\n    viewBox=\\"0 0 20 20\\"\\n    focusable=\\"false\\"\\n    aria-hidden=\\"true\\">\\n    <path\\n    fill=\\"currentColor\\"\\n        d=\\"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z\\" />\\n</svg>\\n\\n<style>\\n  svg {\\n      width: var(--chevron-icon-width, 20px);\\n      height: var(--chevron-icon-width, 20px);\\n      color: var(--chevron-icon-colour, currentColor);\\n  }</style>"],"names":[],"mappings":"AAgBE,kBAAI,CACA,KAAK,CAAE,IAAI,oBAAoB,CAAC,KAAK,CAAC,CACtC,MAAM,CAAE,IAAI,oBAAoB,CAAC,KAAK,CAAC,CACvC,KAAK,CAAE,IAAI,qBAAqB,CAAC,aAAa,CAClD"}'
};
const ChevronIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" aria-hidden="true" class="svelte-1ea3f3y"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747
          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0
          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502
          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0
          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;
});
const css$5 = {
  code: "svg.svelte-yszwet{width:var(--clear-icon-width, 20px);height:var(--clear-icon-width, 20px);color:var(--clear-icon-color, currentColor)}",
  map: '{"version":3,"file":"ClearIcon.svelte","sources":["ClearIcon.svelte"],"sourcesContent":["<svg\\n    width=\\"100%\\"\\n    height=\\"100%\\"\\n    viewBox=\\"-2 -2 50 50\\"\\n    focusable=\\"false\\"\\n    aria-hidden=\\"true\\"\\n    role=\\"presentation\\"\\n>\\n    <path\\n        fill=\\"currentColor\\"\\n        d=\\"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\\n    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z\\"\\n    />\\n</svg>\\n\\n<style>\\n    svg {\\n        width: var(--clear-icon-width, 20px);\\n        height: var(--clear-icon-width, 20px);\\n        color: var(--clear-icon-color, currentColor);\\n    }</style>"],"names":[],"mappings":"AAgBI,iBAAI,CACA,KAAK,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACpC,MAAM,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACrC,KAAK,CAAE,IAAI,kBAAkB,CAAC,aAAa,CAC/C"}'
};
const ClearIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" aria-hidden="true" role="presentation" class="svelte-yszwet"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124
    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
});
const css$4 = {
  code: ".loading.svelte-d6026t{width:var(--spinner-width, 20px);height:var(--spinner-height, 20px);color:var(--spinner-color, var(--icons-color));animation:svelte-d6026t-rotate 0.75s linear infinite;transform-origin:center center;transform:none}.circle_path.svelte-d6026t{stroke-dasharray:90;stroke-linecap:round}@keyframes svelte-d6026t-rotate{100%{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"LoadingIcon.svelte","sources":["LoadingIcon.svelte"],"sourcesContent":["<svg class=\\"loading\\" viewBox=\\"25 25 50 50\\">\\n    <circle\\n        class=\\"circle_path\\"\\n        cx=\\"50\\"\\n        cy=\\"50\\"\\n        r=\\"20\\"\\n        fill=\\"none\\"\\n        stroke=\\"currentColor\\"\\n        stroke-width=\\"5\\"\\n        stroke-miterlimit=\\"10\\" />\\n</svg>\\n\\n<style>\\n    .loading {\\n        width: var(--spinner-width, 20px);\\n        height: var(--spinner-height, 20px);\\n        color: var(--spinner-color, var(--icons-color));\\n        animation: rotate 0.75s linear infinite;\\n        transform-origin: center center;\\n        transform: none;\\n    }\\n\\n    .circle_path {\\n        stroke-dasharray: 90;\\n        stroke-linecap: round;\\n    }\\n\\n    @keyframes rotate {\\n        100% {\\n            transform: rotate(360deg);\\n        }\\n    }</style>"],"names":[],"mappings":"AAaI,sBAAS,CACL,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACnC,KAAK,CAAE,IAAI,eAAe,CAAC,mBAAmB,CAAC,CAC/C,SAAS,CAAE,oBAAM,CAAC,KAAK,CAAC,MAAM,CAAC,QAAQ,CACvC,gBAAgB,CAAE,MAAM,CAAC,MAAM,CAC/B,SAAS,CAAE,IACf,CAEA,0BAAa,CACT,gBAAgB,CAAE,EAAE,CACpB,cAAc,CAAE,KACpB,CAEA,WAAW,oBAAO,CACd,IAAK,CACD,SAAS,CAAE,OAAO,MAAM,CAC5B,CACJ"}'
};
const LoadingIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<svg class="loading svelte-d6026t" viewBox="25 25 50 50"><circle class="circle_path svelte-d6026t" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg>`;
});
const css$3 = {
  code: ".svelte-select.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{--borderRadius:var(--border-radius);--clearSelectColor:var(--clear-select-color);--clearSelectWidth:var(--clear-select-width);--disabledBackground:var(--disabled-background);--disabledBorderColor:var(--disabled-border-color);--disabledColor:var(--disabled-color);--disabledPlaceholderColor:var(--disabled-placeholder-color);--disabledPlaceholderOpacity:var(--disabled-placeholder-opacity);--errorBackground:var(--error-background);--errorBorder:var(--error-border);--groupItemPaddingLeft:var(--group-item-padding-left);--groupTitleColor:var(--group-title-color);--groupTitleFontSize:var(--group-title-font-size);--groupTitleFontWeight:var(--group-title-font-weight);--groupTitlePadding:var(--group-title-padding);--groupTitleTextTransform:var(--group-title-text-transform);--groupTitleBorderColor:var(--group-title-border-color);--groupTitleBorderWidth:var(--group-title-border-width);--groupTitleBorderStyle:var(--group-title-border-style);--indicatorColor:var(--chevron-color);--indicatorHeight:var(--chevron-height);--indicatorWidth:var(--chevron-width);--inputColor:var(--input-color);--inputLeft:var(--input-left);--inputLetterSpacing:var(--input-letter-spacing);--inputMargin:var(--input-margin);--inputPadding:var(--input-padding);--itemActiveBackground:var(--item-active-background);--itemColor:var(--item-color);--itemFirstBorderRadius:var(--item-first-border-radius);--itemHoverBG:var(--item-hover-bg);--itemHoverColor:var(--item-hover-color);--itemIsActiveBG:var(--item-is-active-bg);--itemIsActiveColor:var(--item-is-active-color);--itemIsNotSelectableColor:var(--item-is-not-selectable-color);--itemPadding:var(--item-padding);--listBackground:var(--list-background);--listBorder:var(--list-border);--listBorderRadius:var(--list-border-radius);--listEmptyColor:var(--list-empty-color);--listEmptyPadding:var(--list-empty-padding);--listEmptyTextAlign:var(--list-empty-text-align);--listMaxHeight:var(--list-max-height);--listPosition:var(--list-position);--listShadow:var(--list-shadow);--listZIndex:var(--list-z-index);--multiItemBG:var(--multi-item-bg);--multiItemBorderRadius:var(--multi-item-border-radius);--multiItemDisabledHoverBg:var(--multi-item-disabled-hover-bg);--multiItemDisabledHoverColor:var(--multi-item-disabled-hover-color);--multiItemHeight:var(--multi-item-height);--multiItemMargin:var(--multi-item-margin);--multiItemPadding:var(--multi-item-padding);--multiSelectInputMargin:var(--multi-select-input-margin);--multiSelectInputPadding:var(--multi-select-input-padding);--multiSelectPadding:var(--multi-select-padding);--placeholderColor:var(--placeholder-color);--placeholderOpacity:var(--placeholder-opacity);--selectedItemPadding:var(--selected-item-padding);--spinnerColor:var(--spinner-color);--spinnerHeight:var(--spinner-height);--spinnerWidth:var(--spinner-width);--internal-padding:0 0 0 16px;border:var(--border, 1px solid #d8dbdf);border-radius:var(--border-radius, 6px);min-height:var(--height, 42px);position:relative;display:flex;align-items:stretch;padding:var(--padding, var(--internal-padding));background:var(--background, #fff);margin:var(--margin, 0);width:var(--width, 100%);font-size:var(--font-size, 16px);max-height:var(--max-height)}.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{box-sizing:var(--box-sizing, border-box)}.svelte-select.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:hover{border:var(--border-hover, 1px solid #b2b8bf)}.value-container.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{display:flex;flex:1 1 0%;flex-wrap:wrap;align-items:center;gap:5px 10px;padding:var(--value-container-padding, 5px 0);position:relative;overflow:var(--value-container-overflow, hidden);align-self:stretch}.prepend.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam,.indicators.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{display:flex;flex-shrink:0;align-items:center}.indicators.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{position:var(--indicators-position);top:var(--indicators-top);right:var(--indicators-right);bottom:var(--indicators-bottom)}input.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{position:absolute;cursor:default;border:none;color:var(--input-color, var(--item-color));padding:var(--input-padding, 0);letter-spacing:var(--input-letter-spacing, inherit);margin:var(--input-margin, 0);min-width:10px;top:0;right:0;bottom:0;left:0;background:transparent;font-size:var(--font-size, 16px)}.svelte-1bhoqam:not(.multi)>.value-container.svelte-1bhoqam>input.svelte-1bhoqam{width:100%;height:100%}input.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam::-moz-placeholder{color:var(--placeholder-color, #78848f);opacity:var(--placeholder-opacity, 1)}input.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam::placeholder{color:var(--placeholder-color, #78848f);opacity:var(--placeholder-opacity, 1)}input.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:focus{outline:none}.svelte-select.focused.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{border:var(--border-focused, 1px solid #006fe8);border-radius:var(--border-radius-focused, var(--border-radius, 6px))}.disabled.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{background:var(--disabled-background, #ebedef);border-color:var(--disabled-border-color, #ebedef);color:var(--disabled-color, #c1c6cc)}.disabled.svelte-1bhoqam input.svelte-1bhoqam.svelte-1bhoqam::-moz-placeholder{color:var(--disabled-placeholder-color, #c1c6cc);opacity:var(--disabled-placeholder-opacity, 1)}.disabled.svelte-1bhoqam input.svelte-1bhoqam.svelte-1bhoqam::placeholder{color:var(--disabled-placeholder-color, #c1c6cc);opacity:var(--disabled-placeholder-opacity, 1)}.selected-item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{position:relative;overflow:var(--selected-item-overflow, hidden);padding:var(--selected-item-padding, 0 20px 0 0);text-overflow:ellipsis;white-space:nowrap;color:var(--selected-item-color, inherit);font-size:var(--font-size, 16px)}.multi.svelte-1bhoqam .selected-item.svelte-1bhoqam.svelte-1bhoqam{position:absolute;line-height:var(--height, 42px);height:var(--height, 42px)}.selected-item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:focus{outline:none}.hide-selected-item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{opacity:0}.icon.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{display:flex;align-items:center;justify-content:center}.clear-select.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{all:unset;display:flex;align-items:center;justify-content:center;width:var(--clear-select-width, 40px);height:var(--clear-select-height, 100%);color:var(--clear-select-color, var(--icons-color));margin:var(--clear-select-margin, 0);pointer-events:all;flex-shrink:0}.clear-select.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:focus{outline:var(--clear-select-focus-outline, 1px solid #006fe8)}.loading.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{width:var(--loading-width, 40px);height:var(--loading-height);color:var(--loading-color, var(--icons-color));margin:var(--loading--margin, 0);flex-shrink:0}.chevron.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{width:var(--chevron-width, 40px);height:var(--chevron-height, 40px);background:var(--chevron-background, transparent);pointer-events:var(--chevron-pointer-events, none);color:var(--chevron-color, var(--icons-color));border:var(--chevron-border, 0 0 0 1px solid #d8dbdf);flex-shrink:0}.multi.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{padding:var(--multi-select-padding, var(--internal-padding))}.multi.svelte-1bhoqam input.svelte-1bhoqam.svelte-1bhoqam{padding:var(--multi-select-input-padding, 0);position:relative;margin:var(--multi-select-input-margin, 5px 0);flex:1 1 40px}.svelte-select.error.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{border:var(--error-border, 1px solid #ff2d55);background:var(--error-background, #fff)}.a11y-text.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{z-index:9999;border:0px;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0px;white-space:nowrap}.multi-item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{background:var(--multi-item-bg, #ebedef);margin:var(--multi-item-margin, 0);outline:var(--multi-item-outline, 1px solid #ddd);border-radius:var(--multi-item-border-radius, 4px);height:var(--multi-item-height, 25px);line-height:var(--multi-item-height, 25px);display:flex;cursor:default;padding:var(--multi-item-padding, 0 5px);overflow:hidden;gap:var(--multi-item-gap, 4px);outline-offset:-1px;max-width:var(--multi-max-width, none);color:var(--multi-item-color, var(--item-color))}.multi-item.disabled.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:hover{background:var(--multi-item-disabled-hover-bg, #ebedef);color:var(--multi-item-disabled-hover-color, #c1c6cc)}.multi-item-text.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.multi-item-clear.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{display:flex;align-items:center;justify-content:center;--clear-icon-color:var(--multi-item-clear-icon-color, #000)}.multi-item.active.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{outline:var(--multi-item-active-outline, 1px solid #006fe8)}.svelte-select-list.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{box-shadow:var(--list-shadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));border-radius:var(--list-border-radius, 4px);max-height:var(--list-max-height, 252px);overflow-y:auto;background:var(--list-background, #fff);position:var(--list-position, absolute);z-index:var(--list-z-index, 2);border:var(--list-border)}.prefloat.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{opacity:0;pointer-events:none}.list-group-title.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{color:var(--group-title-color, #8f8f8f);cursor:default;font-size:var(--group-title-font-size, 16px);font-weight:var(--group-title-font-weight, 600);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--group-title-padding, 0 20px);text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:var(--group-title-text-transform, uppercase);border-width:var(--group-title-border-width, medium);border-style:var(--group-title-border-style, none);border-color:var(--group-title-border-color, color)}.empty.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{text-align:var(--list-empty-text-align, center);padding:var(--list-empty-padding, 20px 0);color:var(--list-empty-color, #78848f)}.item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{cursor:default;height:var(--item-height, var(--height, 42px));line-height:var(--item-line-height, var(--height, 42px));padding:var(--item-padding, 0 20px);color:var(--item-color, inherit);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;transition:var(--item-transition, all 0.2s);align-items:center;width:100%}.item.group-item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{padding-left:var(--group-item-padding-left, 40px)}.item.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:active{background:var(--item-active-background, #b9daff)}.item.active.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{background:var(--item-is-active-bg, #007aff);color:var(--item-is-active-color, #fff)}.item.first.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{border-radius:var(--item-first-border-radius, 4px 4px 0 0)}.item.hover.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:not(.active){background:var(--item-hover-bg, #e7f2ff);color:var(--item-hover-color, inherit)}.item.not-selectable.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam,.item.hover.item.not-selectable.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam,.item.active.item.not-selectable.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam,.item.not-selectable.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam:active{color:var(--item-is-not-selectable-color, #999);background:transparent}.required.svelte-1bhoqam.svelte-1bhoqam.svelte-1bhoqam{opacity:0;z-index:-1;position:absolute;top:0;left:0;bottom:0;right:0}",
  map: `{"version":3,"file":"Select.svelte","sources":["Select.svelte"],"sourcesContent":["<script>\\n    import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';\\n    import { offset, flip, shift } from 'svelte-floating-ui/dom';\\n    import { createFloatingActions } from 'svelte-floating-ui';\\n\\n    const dispatch = createEventDispatcher();\\n\\n    import _filter from './filter';\\n    import _getItems from './get-items';\\n\\n    import ChevronIcon from './ChevronIcon.svelte';\\n    import ClearIcon from './ClearIcon.svelte';\\n    import LoadingIcon from './LoadingIcon.svelte';\\n\\n    export let justValue = null; // read-only\\n\\n    export let filter = _filter;\\n    export let getItems = _getItems;\\n\\n    export let id = null;\\n    export let name = null;\\n    export let container = undefined;\\n    export let input = undefined;\\n    export let multiple = false;\\n    export let multiFullItemClearable = false;\\n    export let disabled = false;\\n    export let focused = false;\\n    export let value = null;\\n    export let filterText = '';\\n    export let placeholder = 'Please select';\\n    export let placeholderAlwaysShow = false;\\n    export let items = null;\\n    export let label = 'label';\\n    export let itemFilter = (label, filterText, option) => \`\${label}\`.toLowerCase().includes(filterText.toLowerCase());\\n    export let groupBy = undefined;\\n    export let groupFilter = (groups) => groups;\\n    export let groupHeaderSelectable = false;\\n    export let itemId = 'value';\\n    export let loadOptions = undefined;\\n    export let containerStyles = '';\\n    export let hasError = false;\\n    export let filterSelectedItems = true;\\n    export let required = false;\\n    export let closeListOnChange = true;\\n    export let clearFilterTextOnBlur = true;\\n\\n    export let createGroupHeaderItem = (groupValue, item) => {\\n        return {\\n            value: groupValue,\\n            [label]: groupValue,\\n        };\\n    };\\n\\n    export const getFilteredItems = () => {\\n        return filteredItems;\\n    };\\n\\n    export let searchable = true;\\n    export let inputStyles = '';\\n    export let clearable = true;\\n    export let loading = false;\\n    export let listOpen = false;\\n\\n    let timeout;\\n    export let debounce = (fn, wait = 1) => {\\n        clearTimeout(timeout);\\n        timeout = setTimeout(fn, wait);\\n    };\\n\\n    export let debounceWait = 300;\\n    export let hideEmptyState = false;\\n    export let inputAttributes = {};\\n    export let listAutoWidth = true;\\n    export let showChevron = false;\\n    export let listOffset = 5;\\n    export let hoverItemIndex = 0;\\n    export let floatingConfig = {};\\n\\n    export { containerClasses as class };\\n\\n    let containerClasses = '';\\n    let activeValue;\\n    let prev_value;\\n    let prev_filterText;\\n    let prev_multiple;\\n\\n    function setValue() {\\n        if (typeof value === 'string') {\\n            let item = (items || []).find((item) => item[itemId] === value);\\n            value = item || {\\n                [itemId]: value,\\n                label: value,\\n            };\\n        } else if (multiple && Array.isArray(value) && value.length > 0) {\\n            value = value.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));\\n        }\\n    }\\n\\n    let _inputAttributes;\\n    function assignInputAttributes() {\\n        _inputAttributes = Object.assign(\\n            {\\n                autocapitalize: 'none',\\n                autocomplete: 'off',\\n                autocorrect: 'off',\\n                spellcheck: false,\\n                tabindex: 0,\\n                type: 'text',\\n                'aria-autocomplete': 'list',\\n            },\\n            inputAttributes\\n        );\\n\\n        if (id) {\\n            _inputAttributes['id'] = id;\\n        }\\n\\n        if (!searchable) {\\n            _inputAttributes['readonly'] = true;\\n        }\\n    }\\n\\n    function convertStringItemsToObjects(_items) {\\n        return _items.map((item, index) => {\\n            return {\\n                index,\\n                value: item,\\n                label: \`\${item}\`,\\n            };\\n        });\\n    }\\n\\n    function filterGroupedItems(_items) {\\n        const groupValues = [];\\n        const groups = {};\\n\\n        _items.forEach((item) => {\\n            const groupValue = groupBy(item);\\n\\n            if (!groupValues.includes(groupValue)) {\\n                groupValues.push(groupValue);\\n                groups[groupValue] = [];\\n\\n                if (groupValue) {\\n                    groups[groupValue].push(\\n                        Object.assign(createGroupHeaderItem(groupValue, item), {\\n                            id: groupValue,\\n                            groupHeader: true,\\n                            selectable: groupHeaderSelectable,\\n                        })\\n                    );\\n                }\\n            }\\n\\n            groups[groupValue].push(Object.assign({ groupItem: !!groupValue }, item));\\n        });\\n\\n        const sortedGroupedItems = [];\\n\\n        groupFilter(groupValues).forEach((groupValue) => {\\n            if (groups[groupValue]) sortedGroupedItems.push(...groups[groupValue]);\\n        });\\n\\n        return sortedGroupedItems;\\n    }\\n\\n    function dispatchSelectedItem() {\\n        if (multiple) {\\n            if (JSON.stringify(value) !== JSON.stringify(prev_value)) {\\n                if (checkValueForDuplicates()) {\\n                    dispatch('input', value);\\n                }\\n            }\\n            return;\\n        }\\n\\n        if (!prev_value || JSON.stringify(value[itemId]) !== JSON.stringify(prev_value[itemId])) {\\n            dispatch('input', value);\\n        }\\n    }\\n\\n    function setupMulti() {\\n        if (value) {\\n            if (Array.isArray(value)) {\\n                value = [...value];\\n            } else {\\n                value = [value];\\n            }\\n        }\\n    }\\n\\n    function setupSingle() {\\n        if (value) value = null;\\n    }\\n\\n    $: if ((items, value)) setValue();\\n    $: if (inputAttributes || !searchable) assignInputAttributes();\\n    $: if (multiple) setupMulti();\\n    $: if (prev_multiple && !multiple) setupSingle();\\n    $: if (multiple && value && value.length > 1) checkValueForDuplicates();\\n    $: if (value) dispatchSelectedItem();\\n    $: if (!value && multiple && prev_value) dispatch('input', value);\\n    $: if (!focused && input) closeList();\\n    $: if (filterText !== prev_filterText) setupFilterText();\\n    $: if (!multiple && listOpen && value && filteredItems) setValueIndexAsHoverIndex();\\n    $: dispatchHover(hoverItemIndex);\\n\\n    function setValueIndexAsHoverIndex() {\\n        const valueIndex = filteredItems.findIndex((i) => {\\n            return i[itemId] === value[itemId];\\n        });\\n\\n        checkHoverSelectable(valueIndex, true);\\n    }\\n\\n    function dispatchHover(i) {\\n        dispatch('hoverItem', i);\\n    }\\n\\n    function checkHoverSelectable(startingIndex = 0, ignoreGroup) {\\n        hoverItemIndex = startingIndex < 0 ? 0 : startingIndex;\\n        if (!ignoreGroup && groupBy && filteredItems[hoverItemIndex] && !filteredItems[hoverItemIndex].selectable) {\\n            setHoverIndex(1);\\n        }\\n    }\\n\\n    function setupFilterText() {\\n        if (!loadOptions && filterText.length === 0) return;\\n\\n        if (loadOptions) {\\n            debounce(async function () {\\n                loading = true;\\n                let res = await getItems({\\n                    dispatch,\\n                    loadOptions,\\n                    convertStringItemsToObjects,\\n                    filterText,\\n                });\\n\\n                if (res) {\\n                    loading = res.loading;\\n                    listOpen = listOpen ? res.listOpen : filterText.length > 0 ? true : false;\\n                    focused = listOpen && res.focused;\\n                    items = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;\\n                } else {\\n                    loading = false;\\n                    focused = true;\\n                    listOpen = true;\\n                }\\n            }, debounceWait);\\n        } else {\\n            listOpen = true;\\n\\n            if (multiple) {\\n                activeValue = undefined;\\n            }\\n        }\\n    }\\n\\n    $: hasValue = multiple ? value && value.length > 0 : value;\\n    $: hideSelectedItem = hasValue && filterText.length > 0;\\n    $: showClear = hasValue && clearable && !disabled && !loading;\\n    $: placeholderText =\\n        placeholderAlwaysShow && multiple\\n            ? placeholder\\n            : multiple && value?.length === 0\\n            ? placeholder\\n            : value\\n            ? ''\\n            : placeholder;\\n    $: ariaSelection = value ? handleAriaSelection(multiple) : '';\\n    $: ariaContext = handleAriaContent({ filteredItems, hoverItemIndex, focused, listOpen });\\n    $: updateValueDisplay(items);\\n    $: justValue = computeJustValue(multiple, value, itemId);\\n    $: if (!multiple && prev_value && !value) dispatch('input', value);\\n    $: filteredItems = filter({\\n        loadOptions,\\n        filterText,\\n        items,\\n        multiple,\\n        value,\\n        itemId,\\n        groupBy,\\n        label,\\n        filterSelectedItems,\\n        itemFilter,\\n        convertStringItemsToObjects,\\n        filterGroupedItems,\\n    });\\n    $: if (listOpen && filteredItems && !multiple && !value) checkHoverSelectable();\\n    $: handleFilterEvent(filteredItems);\\n    $: if (container && floatingConfig) floatingUpdate(Object.assign(_floatingConfig, floatingConfig));\\n    $: listDom = !!list;\\n    $: listMounted(list, listOpen);\\n    $: if (listOpen && container && list) setListWidth();\\n    $: scrollToHoverItem = hoverItemIndex;\\n    $: if (listOpen && multiple) hoverItemIndex = 0;\\n    $: if (input && listOpen && !focused) handleFocus();\\n    $: if (filterText) hoverItemIndex = 0;\\n\\n    function handleFilterEvent(items) {\\n        if (listOpen) dispatch('filter', items);\\n    }\\n\\n    beforeUpdate(async () => {\\n        prev_value = value;\\n        prev_filterText = filterText;\\n        prev_multiple = multiple;\\n    });\\n\\n    function computeJustValue() {\\n        if (multiple) return value ? value.map((item) => item[itemId]) : null;\\n        return value ? value[itemId] : value;\\n    }\\n\\n    function checkValueForDuplicates() {\\n        let noDuplicates = true;\\n        if (value) {\\n            const ids = [];\\n            const uniqueValues = [];\\n\\n            value.forEach((val) => {\\n                if (!ids.includes(val[itemId])) {\\n                    ids.push(val[itemId]);\\n                    uniqueValues.push(val);\\n                } else {\\n                    noDuplicates = false;\\n                }\\n            });\\n\\n            if (!noDuplicates) value = uniqueValues;\\n        }\\n        return noDuplicates;\\n    }\\n\\n    function findItem(selection) {\\n        let matchTo = selection ? selection[itemId] : value[itemId];\\n        return items.find((item) => item[itemId] === matchTo);\\n    }\\n\\n    function updateValueDisplay(items) {\\n        if (!items || items.length === 0 || items.some((item) => typeof item !== 'object')) return;\\n        if (!value || (multiple ? value.some((selection) => !selection || !selection[itemId]) : !value[itemId])) return;\\n\\n        if (Array.isArray(value)) {\\n            value = value.map((selection) => findItem(selection) || selection);\\n        } else {\\n            value = findItem() || value;\\n        }\\n    }\\n\\n    async function handleMultiItemClear(i) {\\n        const itemToRemove = value[i];\\n\\n        if (value.length === 1) {\\n            value = undefined;\\n        } else {\\n            value = value.filter((item) => {\\n                return item !== itemToRemove;\\n            });\\n        }\\n\\n        dispatch('clear', itemToRemove);\\n    }\\n\\n    function handleKeyDown(e) {\\n        if (!focused) return;\\n        e.stopPropagation();\\n        switch (e.key) {\\n            case 'Escape':\\n                e.preventDefault();\\n                closeList();\\n                break;\\n            case 'Enter':\\n                e.preventDefault();\\n\\n                if (listOpen) {\\n                    if (filteredItems.length === 0) break;\\n                    const hoverItem = filteredItems[hoverItemIndex];\\n\\n                    if (value && !multiple && value[itemId] === hoverItem[itemId]) {\\n                        closeList();\\n                        break;\\n                    } else {\\n                        handleSelect(filteredItems[hoverItemIndex]);\\n                    }\\n                }\\n\\n                break;\\n            case 'ArrowDown':\\n                e.preventDefault();\\n\\n                if (listOpen) {\\n                    setHoverIndex(1);\\n                } else {\\n                    listOpen = true;\\n                    activeValue = undefined;\\n                }\\n\\n                break;\\n            case 'ArrowUp':\\n                e.preventDefault();\\n\\n                if (listOpen) {\\n                    setHoverIndex(-1);\\n                } else {\\n                    listOpen = true;\\n                    activeValue = undefined;\\n                }\\n\\n                break;\\n            case 'Tab':\\n                if (listOpen && focused) {\\n                    if (\\n                        filteredItems.length === 0 ||\\n                        (value && value[itemId] === filteredItems[hoverItemIndex][itemId])\\n                    )\\n                        return closeList();\\n\\n                    e.preventDefault();\\n                    handleSelect(filteredItems[hoverItemIndex]);\\n                    closeList();\\n                }\\n\\n                break;\\n            case 'Backspace':\\n                if (!multiple || filterText.length > 0) return;\\n\\n                if (multiple && value && value.length > 0) {\\n                    handleMultiItemClear(activeValue !== undefined ? activeValue : value.length - 1);\\n                    if (activeValue === 0 || activeValue === undefined) break;\\n                    activeValue = value.length > activeValue ? activeValue - 1 : undefined;\\n                }\\n\\n                break;\\n            case 'ArrowLeft':\\n                if (!value || !multiple || filterText.length > 0) return;\\n                if (activeValue === undefined) {\\n                    activeValue = value.length - 1;\\n                } else if (value.length > activeValue && activeValue !== 0) {\\n                    activeValue -= 1;\\n                }\\n                break;\\n            case 'ArrowRight':\\n                if (!value || !multiple || filterText.length > 0 || activeValue === undefined) return;\\n                if (activeValue === value.length - 1) {\\n                    activeValue = undefined;\\n                } else if (activeValue < value.length - 1) {\\n                    activeValue += 1;\\n                }\\n                break;\\n        }\\n    }\\n\\n    function handleFocus(e) {\\n        if (focused && input === document?.activeElement) return;\\n        if (e) dispatch('focus', e);\\n        input?.focus();\\n        focused = true;\\n    }\\n\\n    async function handleBlur(e) {\\n        if (isScrolling) return;\\n        if (listOpen || focused) {\\n            dispatch('blur', e);\\n            closeList();\\n            focused = false;\\n            activeValue = undefined;\\n            input?.blur();\\n        }\\n    }\\n\\n    function handleClick() {\\n        if (disabled) return;\\n        if (filterText.length > 0) return listOpen = true;\\n        listOpen = !listOpen;\\n    }\\n\\n    export function handleClear() {\\n        dispatch('clear', value);\\n        value = undefined;\\n        closeList();\\n        handleFocus();\\n    }\\n\\n    onMount(() => {\\n        if (listOpen) focused = true;\\n        if (focused && input) input.focus();\\n    });\\n\\n    function itemSelected(selection) {\\n        if (selection) {\\n            filterText = '';\\n            const item = Object.assign({}, selection);\\n\\n            if (item.groupHeader && !item.selectable) return;\\n            value = multiple ? (value ? value.concat([item]) : [item]) : (value = item);\\n\\n            setTimeout(() => {\\n                if (closeListOnChange) closeList();\\n                activeValue = undefined;\\n                dispatch('change', value);\\n                dispatch('select', selection);\\n            });\\n        }\\n    }\\n\\n    function closeList() {\\n        if (clearFilterTextOnBlur) {\\n            filterText = '';\\n        }\\n        listOpen = false;\\n    }\\n\\n    export let ariaValues = (values) => {\\n        return \`Option \${values}, selected.\`;\\n    };\\n\\n    export let ariaListOpen = (label, count) => {\\n        return \`You are currently focused on option \${label}. There are \${count} results available.\`;\\n    };\\n\\n    export let ariaFocused = () => {\\n        return \`Select is focused, type to refine list, press down to open the menu.\`;\\n    };\\n\\n    function handleAriaSelection(_multiple) {\\n        let selected = undefined;\\n\\n        if (_multiple && value.length > 0) {\\n            selected = value.map((v) => v[label]).join(', ');\\n        } else {\\n            selected = value[label];\\n        }\\n\\n        return ariaValues(selected);\\n    }\\n\\n    function handleAriaContent() {\\n        if (!filteredItems || filteredItems.length === 0) return '';\\n        let _item = filteredItems[hoverItemIndex];\\n        if (listOpen && _item) {\\n            let count = filteredItems ? filteredItems.length : 0;\\n            return ariaListOpen(_item[label], count);\\n        } else {\\n            return ariaFocused();\\n        }\\n    }\\n\\n    let list = null;\\n\\n    let isScrollingTimer;\\n    function handleListScroll() {\\n        clearTimeout(isScrollingTimer);\\n        isScrollingTimer = setTimeout(() => {\\n            isScrolling = false;\\n        }, 100);\\n    }\\n\\n    function handleClickOutside(event) {\\n        if (!listOpen && !focused && container && !container.contains(event.target) && !list?.contains(event.target)) {\\n            handleBlur();\\n        }\\n    }\\n\\n    onDestroy(() => {\\n        list?.remove();\\n    });\\n\\n    let isScrolling = false;\\n\\n    function handleSelect(item) {\\n        if (!item || item.selectable === false) return;\\n        itemSelected(item);\\n    }\\n\\n    function handleHover(i) {\\n        if (isScrolling) return;\\n        hoverItemIndex = i;\\n    }\\n\\n    function handleItemClick(args) {\\n        const { item, i } = args;\\n        if (item?.selectable === false) return;\\n        if (value && !multiple && value[itemId] === item[itemId]) return closeList();\\n        if (isItemSelectable(item)) {\\n            hoverItemIndex = i;\\n            handleSelect(item);\\n        }\\n    }\\n\\n    function setHoverIndex(increment) {\\n        let selectableFilteredItems = filteredItems.filter(\\n            (item) => !Object.hasOwn(item, 'selectable') || item.selectable === true\\n        );\\n\\n        if (selectableFilteredItems.length === 0) {\\n            return (hoverItemIndex = 0);\\n        }\\n\\n        if (increment > 0 && hoverItemIndex === filteredItems.length - 1) {\\n            hoverItemIndex = 0;\\n        } else if (increment < 0 && hoverItemIndex === 0) {\\n            hoverItemIndex = filteredItems.length - 1;\\n        } else {\\n            hoverItemIndex = hoverItemIndex + increment;\\n        }\\n\\n        const hover = filteredItems[hoverItemIndex];\\n\\n        if (hover && hover.selectable === false) {\\n            if (increment === 1 || increment === -1) setHoverIndex(increment);\\n            return;\\n        }\\n    }\\n\\n    function isItemActive(item, value, itemId) {\\n        if (multiple) return;\\n        return value && value[itemId] === item[itemId];\\n    }\\n\\n    function isItemFirst(itemIndex) {\\n        return itemIndex === 0;\\n    }\\n\\n    function isItemSelectable(item) {\\n        return (item.groupHeader && item.selectable) || item.selectable || !item.hasOwnProperty('selectable');\\n    }\\n\\n    const activeScroll = scrollAction;\\n    const hoverScroll = scrollAction;\\n\\n    function scrollAction(node) {\\n        return {\\n            update(args) {\\n                if (args.scroll) {\\n                    handleListScroll();\\n                    node.scrollIntoView({ behavior: 'auto', block: 'nearest' });\\n                }\\n            },\\n        };\\n    }\\n\\n    function setListWidth() {\\n        const { width } = container.getBoundingClientRect();\\n        list.style.width = listAutoWidth ? width + 'px' : 'auto';\\n    }\\n\\n    let _floatingConfig = {\\n        strategy: 'absolute',\\n        placement: 'bottom-start',\\n        middleware: [offset(listOffset), flip(), shift()],\\n        autoUpdate: false,\\n    };\\n\\n    const [floatingRef, floatingContent, floatingUpdate] = createFloatingActions(_floatingConfig);\\n\\n    $: if (container && floatingConfig?.autoUpdate === undefined) {\\n        _floatingConfig.autoUpdate = true;\\n    }\\n\\n    let prefloat = true;\\n    function listMounted(list, listOpen) {\\n        if (!list || !listOpen) return (prefloat = true);\\n        setTimeout(() => {\\n            prefloat = false;\\n        }, 0);\\n    }\\n<\/script>\\n\\n<svelte:window on:click={handleClickOutside} on:keydown={handleKeyDown} />\\n\\n<div\\n    class=\\"svelte-select {containerClasses}\\"\\n    class:multi={multiple}\\n    class:disabled\\n    class:focused\\n    class:list-open={listOpen}\\n    class:show-chevron={showChevron}\\n    class:error={hasError}\\n    style={containerStyles}\\n    on:pointerup|preventDefault={handleClick}\\n    bind:this={container}\\n    use:floatingRef\\n    role=\\"none\\">\\n    {#if listOpen}\\n        <div\\n            use:floatingContent\\n            bind:this={list}\\n            class=\\"svelte-select-list\\"\\n            class:prefloat\\n            on:scroll={handleListScroll}\\n            on:pointerup|preventDefault|stopPropagation\\n            on:mousedown|preventDefault|stopPropagation\\n\\t\\t\\trole=\\"none\\">\\n            {#if $$slots['list-prepend']}<slot name=\\"list-prepend\\" />{/if}\\n            {#if $$slots.list}<slot name=\\"list\\" {filteredItems} />\\n            {:else if filteredItems.length > 0}\\n                {#each filteredItems as item, i}\\n                    <div\\n                        on:mouseover={() => handleHover(i)}\\n                        on:focus={() => handleHover(i)}\\n                        on:click|stopPropagation={() => handleItemClick({ item, i })}\\n                        on:keydown|preventDefault|stopPropagation\\n                        class=\\"list-item\\"\\n                        tabindex=\\"-1\\"\\n                        role=\\"none\\">\\n                        <div\\n                            use:activeScroll={{ scroll: isItemActive(item, value, itemId), listDom }}\\n                            use:hoverScroll={{ scroll: scrollToHoverItem === i, listDom }}\\n                            class=\\"item\\"\\n                            class:list-group-title={item.groupHeader}\\n                            class:active={isItemActive(item, value, itemId)}\\n                            class:first={isItemFirst(i)}\\n                            class:hover={hoverItemIndex === i}\\n                            class:group-item={item.groupItem}\\n                            class:not-selectable={item?.selectable === false}>\\n                            <slot name=\\"item\\" {item} index={i}>\\n                                {item?.[label]}\\n                            </slot>\\n                        </div>\\n                    </div>\\n                {/each}\\n            {:else if !hideEmptyState}\\n                <slot name=\\"empty\\">\\n                    <div class=\\"empty\\">No options</div>\\n                </slot>\\n            {/if}\\n            {#if $$slots['list-append']}<slot name=\\"list-append\\" />{/if}\\n        </div>\\n    {/if}\\n\\n    <span aria-live=\\"polite\\" aria-atomic=\\"false\\" aria-relevant=\\"additions text\\" class=\\"a11y-text\\">\\n        {#if focused}\\n            <span id=\\"aria-selection\\">{ariaSelection}</span>\\n            <span id=\\"aria-context\\">\\n                {ariaContext}\\n            </span>\\n        {/if}\\n    </span>\\n\\n    <div class=\\"prepend\\">\\n        <slot name=\\"prepend\\" />\\n    </div>\\n\\n    <div class=\\"value-container\\">\\n        {#if hasValue}\\n            {#if multiple}\\n                {#each value as item, i}\\n                    <div\\n                        class=\\"multi-item\\"\\n                        class:active={activeValue === i}\\n                        class:disabled\\n                        on:click|preventDefault={() => (multiFullItemClearable ? handleMultiItemClear(i) : {})}\\n                        on:keydown|preventDefault|stopPropagation\\n                        role=\\"none\\">\\n                        <span class=\\"multi-item-text\\">\\n                            <slot name=\\"selection\\" selection={item} index={i}>\\n                                {item[label]}\\n                            </slot>\\n                        </span>\\n\\n                        {#if !disabled && !multiFullItemClearable && ClearIcon}\\n                            <div\\n                                class=\\"multi-item-clear\\"\\n                                on:pointerup|preventDefault|stopPropagation={() => handleMultiItemClear(i)}>\\n                                <slot name=\\"multi-clear-icon\\">\\n                                    <ClearIcon />\\n                                </slot>\\n                            </div>\\n                        {/if}\\n                    </div>\\n                {/each}\\n            {:else}\\n                <div class=\\"selected-item\\" class:hide-selected-item={hideSelectedItem}>\\n                    <slot name=\\"selection\\" selection={value}>\\n                        {value[label]}\\n                    </slot>\\n                </div>\\n            {/if}\\n        {/if}\\n\\n        <input\\n            on:keydown={handleKeyDown}\\n            on:blur={handleBlur}\\n            on:focus={handleFocus}\\n            readOnly={!searchable}\\n            {..._inputAttributes}\\n            bind:this={input}\\n            bind:value={filterText}\\n            placeholder={placeholderText}\\n            style={inputStyles}\\n            {disabled} />\\n    </div>\\n\\n    <div class=\\"indicators\\">\\n        {#if loading}\\n            <div class=\\"icon loading\\" aria-hidden=\\"true\\">\\n                <slot name=\\"loading-icon\\">\\n                    <LoadingIcon />\\n                </slot>\\n            </div>\\n        {/if}\\n\\n        {#if showClear}\\n            <button type=\\"button\\" class=\\"icon clear-select\\" on:click={handleClear}>\\n                <slot name=\\"clear-icon\\">\\n                    <ClearIcon />\\n                </slot>\\n            </button>\\n        {/if}\\n\\n        {#if showChevron}\\n            <div class=\\"icon chevron\\" aria-hidden=\\"true\\">\\n                <slot name=\\"chevron-icon\\" {listOpen}>\\n                    <ChevronIcon />\\n                </slot>\\n            </div>\\n        {/if}\\n    </div>\\n\\n    <slot name=\\"input-hidden\\" {value}>\\n        <input {name} type=\\"hidden\\" value={value ? JSON.stringify(value) : null} />\\n    </slot>\\n\\n    {#if required && (!value || value.length === 0)}\\n        <slot name=\\"required\\" {value}>\\n            <select class=\\"required\\" required tabindex=\\"-1\\" aria-hidden=\\"true\\" />\\n        </slot>\\n    {/if}\\n</div>\\n\\n<style>\\n    .svelte-select {\\n        /* deprecating camelCase custom props in favour of kebab-case for v5 */\\n        --borderRadius: var(--border-radius);\\n        --clearSelectColor: var(--clear-select-color);\\n        --clearSelectWidth: var(--clear-select-width);\\n        --disabledBackground: var(--disabled-background);\\n        --disabledBorderColor: var(--disabled-border-color);\\n        --disabledColor: var(--disabled-color);\\n        --disabledPlaceholderColor: var(--disabled-placeholder-color);\\n        --disabledPlaceholderOpacity: var(--disabled-placeholder-opacity);\\n        --errorBackground: var(--error-background);\\n        --errorBorder: var(--error-border);\\n        --groupItemPaddingLeft: var(--group-item-padding-left);\\n        --groupTitleColor: var(--group-title-color);\\n        --groupTitleFontSize: var(--group-title-font-size);\\n        --groupTitleFontWeight: var(--group-title-font-weight);\\n        --groupTitlePadding: var(--group-title-padding);\\n        --groupTitleTextTransform: var(--group-title-text-transform);\\n        --groupTitleBorderColor: var(--group-title-border-color);\\n        --groupTitleBorderWidth: var(--group-title-border-width);\\n        --groupTitleBorderStyle: var(--group-title-border-style);\\n        --indicatorColor: var(--chevron-color);\\n        --indicatorHeight: var(--chevron-height);\\n        --indicatorWidth: var(--chevron-width);\\n        --inputColor: var(--input-color);\\n        --inputLeft: var(--input-left);\\n        --inputLetterSpacing: var(--input-letter-spacing);\\n        --inputMargin: var(--input-margin);\\n        --inputPadding: var(--input-padding);\\n        --itemActiveBackground: var(--item-active-background);\\n        --itemColor: var(--item-color);\\n        --itemFirstBorderRadius: var(--item-first-border-radius);\\n        --itemHoverBG: var(--item-hover-bg);\\n        --itemHoverColor: var(--item-hover-color);\\n        --itemIsActiveBG: var(--item-is-active-bg);\\n        --itemIsActiveColor: var(--item-is-active-color);\\n        --itemIsNotSelectableColor: var(--item-is-not-selectable-color);\\n        --itemPadding: var(--item-padding);\\n        --listBackground: var(--list-background);\\n        --listBorder: var(--list-border);\\n        --listBorderRadius: var(--list-border-radius);\\n        --listEmptyColor: var(--list-empty-color);\\n        --listEmptyPadding: var(--list-empty-padding);\\n        --listEmptyTextAlign: var(--list-empty-text-align);\\n        --listMaxHeight: var(--list-max-height);\\n        --listPosition: var(--list-position);\\n        --listShadow: var(--list-shadow);\\n        --listZIndex: var(--list-z-index);\\n        --multiItemBG: var(--multi-item-bg);\\n        --multiItemBorderRadius: var(--multi-item-border-radius);\\n        --multiItemDisabledHoverBg: var(--multi-item-disabled-hover-bg);\\n        --multiItemDisabledHoverColor: var(--multi-item-disabled-hover-color);\\n        --multiItemHeight: var(--multi-item-height);\\n        --multiItemMargin: var(--multi-item-margin);\\n        --multiItemPadding: var(--multi-item-padding);\\n        --multiSelectInputMargin: var(--multi-select-input-margin);\\n        --multiSelectInputPadding: var(--multi-select-input-padding);\\n        --multiSelectPadding: var(--multi-select-padding);\\n        --placeholderColor: var(--placeholder-color);\\n        --placeholderOpacity: var(--placeholder-opacity);\\n        --selectedItemPadding: var(--selected-item-padding);\\n        --spinnerColor: var(--spinner-color);\\n        --spinnerHeight: var(--spinner-height);\\n        --spinnerWidth: var(--spinner-width);\\n\\n        --internal-padding: 0 0 0 16px;\\n\\n        border: var(--border, 1px solid #d8dbdf);\\n        border-radius: var(--border-radius, 6px);\\n        min-height: var(--height, 42px);\\n        position: relative;\\n        display: flex;\\n        align-items: stretch;\\n        padding: var(--padding, var(--internal-padding));\\n        background: var(--background, #fff);\\n        margin: var(--margin, 0);\\n        width: var(--width, 100%);\\n        font-size: var(--font-size, 16px);\\n        max-height: var(--max-height);\\n    }\\n\\n    * {\\n        box-sizing: var(--box-sizing, border-box);\\n    }\\n\\n    .svelte-select:hover {\\n        border: var(--border-hover, 1px solid #b2b8bf);\\n    }\\n\\n    .value-container {\\n        display: flex;\\n        flex: 1 1 0%;\\n        flex-wrap: wrap;\\n        align-items: center;\\n        gap: 5px 10px;\\n        padding: var(--value-container-padding, 5px 0);\\n        position: relative;\\n        overflow: var(--value-container-overflow, hidden);\\n        align-self: stretch;\\n    }\\n\\n    .prepend,\\n    .indicators {\\n        display: flex;\\n        flex-shrink: 0;\\n        align-items: center;\\n    }\\n\\n    .indicators {\\n        position: var(--indicators-position);\\n        top: var(--indicators-top);\\n        right: var(--indicators-right);\\n        bottom: var(--indicators-bottom);\\n    }\\n\\n    input {\\n        position: absolute;\\n        cursor: default;\\n        border: none;\\n        color: var(--input-color, var(--item-color));\\n        padding: var(--input-padding, 0);\\n        letter-spacing: var(--input-letter-spacing, inherit);\\n        margin: var(--input-margin, 0);\\n        min-width: 10px;\\n        top: 0;\\n        right: 0;\\n        bottom: 0;\\n        left: 0;\\n        background: transparent;\\n        font-size: var(--font-size, 16px);\\n    }\\n\\n    :not(.multi) > .value-container > input {\\n        width: 100%;\\n        height: 100%;\\n    }\\n\\n    input::-moz-placeholder {\\n        color: var(--placeholder-color, #78848f);\\n        opacity: var(--placeholder-opacity, 1);\\n    }\\n\\n    input::placeholder {\\n        color: var(--placeholder-color, #78848f);\\n        opacity: var(--placeholder-opacity, 1);\\n    }\\n\\n    input:focus {\\n        outline: none;\\n    }\\n\\n    .svelte-select.focused {\\n        border: var(--border-focused, 1px solid #006fe8);\\n        border-radius: var(--border-radius-focused, var(--border-radius, 6px));\\n    }\\n\\n    .disabled {\\n        background: var(--disabled-background, #ebedef);\\n        border-color: var(--disabled-border-color, #ebedef);\\n        color: var(--disabled-color, #c1c6cc);\\n    }\\n\\n    .disabled input::-moz-placeholder {\\n        color: var(--disabled-placeholder-color, #c1c6cc);\\n        opacity: var(--disabled-placeholder-opacity, 1);\\n    }\\n\\n    .disabled input::placeholder {\\n        color: var(--disabled-placeholder-color, #c1c6cc);\\n        opacity: var(--disabled-placeholder-opacity, 1);\\n    }\\n\\n    .selected-item {\\n        position: relative;\\n        overflow: var(--selected-item-overflow, hidden);\\n        padding: var(--selected-item-padding, 0 20px 0 0);\\n        text-overflow: ellipsis;\\n        white-space: nowrap;\\n        color: var(--selected-item-color, inherit);\\n        font-size: var(--font-size, 16px);\\n    }\\n\\n    .multi .selected-item {\\n        position: absolute;\\n        line-height: var(--height, 42px);\\n        height: var(--height, 42px);\\n    }\\n\\n    .selected-item:focus {\\n        outline: none;\\n    }\\n\\n    .hide-selected-item {\\n        opacity: 0;\\n    }\\n\\n    .icon {\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n    }\\n\\n    .clear-select {\\n        all: unset;\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        width: var(--clear-select-width, 40px);\\n        height: var(--clear-select-height, 100%);\\n        color: var(--clear-select-color, var(--icons-color));\\n        margin: var(--clear-select-margin, 0);\\n        pointer-events: all;\\n        flex-shrink: 0;\\n    }\\n\\n    .clear-select:focus {\\n        outline: var(--clear-select-focus-outline, 1px solid #006fe8);\\n    }\\n\\n    .loading {\\n        width: var(--loading-width, 40px);\\n        height: var(--loading-height);\\n        color: var(--loading-color, var(--icons-color));\\n        margin: var(--loading--margin, 0);\\n        flex-shrink: 0;\\n    }\\n\\n    .chevron {\\n        width: var(--chevron-width, 40px);\\n        height: var(--chevron-height, 40px);\\n        background: var(--chevron-background, transparent);\\n        pointer-events: var(--chevron-pointer-events, none);\\n        color: var(--chevron-color, var(--icons-color));\\n        border: var(--chevron-border, 0 0 0 1px solid #d8dbdf);\\n        flex-shrink: 0;\\n    }\\n\\n    .multi {\\n        padding: var(--multi-select-padding, var(--internal-padding));\\n    }\\n\\n    .multi input {\\n        padding: var(--multi-select-input-padding, 0);\\n        position: relative;\\n        margin: var(--multi-select-input-margin, 5px 0);\\n        flex: 1 1 40px;\\n    }\\n\\n    .svelte-select.error {\\n        border: var(--error-border, 1px solid #ff2d55);\\n        background: var(--error-background, #fff);\\n    }\\n\\n    .a11y-text {\\n        z-index: 9999;\\n        border: 0px;\\n        clip: rect(1px, 1px, 1px, 1px);\\n        height: 1px;\\n        width: 1px;\\n        position: absolute;\\n        overflow: hidden;\\n        padding: 0px;\\n        white-space: nowrap;\\n    }\\n\\n    .multi-item {\\n        background: var(--multi-item-bg, #ebedef);\\n        margin: var(--multi-item-margin, 0);\\n        outline: var(--multi-item-outline, 1px solid #ddd);\\n        border-radius: var(--multi-item-border-radius, 4px);\\n        height: var(--multi-item-height, 25px);\\n        line-height: var(--multi-item-height, 25px);\\n        display: flex;\\n        cursor: default;\\n        padding: var(--multi-item-padding, 0 5px);\\n        overflow: hidden;\\n        gap: var(--multi-item-gap, 4px);\\n        outline-offset: -1px;\\n        max-width: var(--multi-max-width, none);\\n        color: var(--multi-item-color, var(--item-color));\\n    }\\n\\n    .multi-item.disabled:hover {\\n        background: var(--multi-item-disabled-hover-bg, #ebedef);\\n        color: var(--multi-item-disabled-hover-color, #c1c6cc);\\n    }\\n\\n    .multi-item-text {\\n        overflow: hidden;\\n        text-overflow: ellipsis;\\n        white-space: nowrap;\\n    }\\n\\n    .multi-item-clear {\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        --clear-icon-color: var(--multi-item-clear-icon-color, #000);\\n    }\\n\\n    .multi-item.active {\\n        outline: var(--multi-item-active-outline, 1px solid #006fe8);\\n    }\\n\\n    .svelte-select-list {\\n        box-shadow: var(--list-shadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));\\n        border-radius: var(--list-border-radius, 4px);\\n        max-height: var(--list-max-height, 252px);\\n        overflow-y: auto;\\n        background: var(--list-background, #fff);\\n        position: var(--list-position, absolute);\\n        z-index: var(--list-z-index, 2);\\n        border: var(--list-border);\\n    }\\n\\n    .prefloat {\\n        opacity: 0;\\n        pointer-events: none;\\n    }\\n\\n    .list-group-title {\\n        color: var(--group-title-color, #8f8f8f);\\n        cursor: default;\\n        font-size: var(--group-title-font-size, 16px);\\n        font-weight: var(--group-title-font-weight, 600);\\n        height: var(--height, 42px);\\n        line-height: var(--height, 42px);\\n        padding: var(--group-title-padding, 0 20px);\\n        text-overflow: ellipsis;\\n        overflow-x: hidden;\\n        white-space: nowrap;\\n        text-transform: var(--group-title-text-transform, uppercase);\\n        border-width: var(--group-title-border-width, medium);\\n        border-style: var(--group-title-border-style, none);\\n        border-color: var(--group-title-border-color, color);\\n    }\\n\\n    .empty {\\n        text-align: var(--list-empty-text-align, center);\\n        padding: var(--list-empty-padding, 20px 0);\\n        color: var(--list-empty-color, #78848f);\\n    }\\n\\n    .item {\\n        cursor: default;\\n        height: var(--item-height, var(--height, 42px));\\n        line-height: var(--item-line-height, var(--height, 42px));\\n        padding: var(--item-padding, 0 20px);\\n        color: var(--item-color, inherit);\\n        text-overflow: ellipsis;\\n        overflow: hidden;\\n        white-space: nowrap;\\n        transition: var(--item-transition, all 0.2s);\\n        align-items: center;\\n        width: 100%;\\n    }\\n\\n    .item.group-item {\\n        padding-left: var(--group-item-padding-left, 40px);\\n    }\\n\\n    .item:active {\\n        background: var(--item-active-background, #b9daff);\\n    }\\n\\n    .item.active {\\n        background: var(--item-is-active-bg, #007aff);\\n        color: var(--item-is-active-color, #fff);\\n    }\\n\\n    .item.first {\\n        border-radius: var(--item-first-border-radius, 4px 4px 0 0);\\n    }\\n\\n    .item.hover:not(.active) {\\n        background: var(--item-hover-bg, #e7f2ff);\\n        color: var(--item-hover-color, inherit);\\n    }\\n\\n    .item.not-selectable,\\n    .item.hover.item.not-selectable,\\n    .item.active.item.not-selectable,\\n    .item.not-selectable:active {\\n        color: var(--item-is-not-selectable-color, #999);\\n        background: transparent;\\n    }\\n\\n    .required {\\n        opacity: 0;\\n        z-index: -1;\\n        position: absolute;\\n        top: 0;\\n        left: 0;\\n        bottom: 0;\\n        right: 0;\\n    }</style>\\n"],"names":[],"mappings":"AAi0BI,2DAAe,CAEX,cAAc,CAAE,oBAAoB,CACpC,kBAAkB,CAAE,yBAAyB,CAC7C,kBAAkB,CAAE,yBAAyB,CAC7C,oBAAoB,CAAE,0BAA0B,CAChD,qBAAqB,CAAE,4BAA4B,CACnD,eAAe,CAAE,qBAAqB,CACtC,0BAA0B,CAAE,iCAAiC,CAC7D,4BAA4B,CAAE,mCAAmC,CACjE,iBAAiB,CAAE,uBAAuB,CAC1C,aAAa,CAAE,mBAAmB,CAClC,sBAAsB,CAAE,8BAA8B,CACtD,iBAAiB,CAAE,wBAAwB,CAC3C,oBAAoB,CAAE,4BAA4B,CAClD,sBAAsB,CAAE,8BAA8B,CACtD,mBAAmB,CAAE,0BAA0B,CAC/C,yBAAyB,CAAE,iCAAiC,CAC5D,uBAAuB,CAAE,+BAA+B,CACxD,uBAAuB,CAAE,+BAA+B,CACxD,uBAAuB,CAAE,+BAA+B,CACxD,gBAAgB,CAAE,oBAAoB,CACtC,iBAAiB,CAAE,qBAAqB,CACxC,gBAAgB,CAAE,oBAAoB,CACtC,YAAY,CAAE,kBAAkB,CAChC,WAAW,CAAE,iBAAiB,CAC9B,oBAAoB,CAAE,2BAA2B,CACjD,aAAa,CAAE,mBAAmB,CAClC,cAAc,CAAE,oBAAoB,CACpC,sBAAsB,CAAE,6BAA6B,CACrD,WAAW,CAAE,iBAAiB,CAC9B,uBAAuB,CAAE,+BAA+B,CACxD,aAAa,CAAE,oBAAoB,CACnC,gBAAgB,CAAE,uBAAuB,CACzC,gBAAgB,CAAE,wBAAwB,CAC1C,mBAAmB,CAAE,2BAA2B,CAChD,0BAA0B,CAAE,mCAAmC,CAC/D,aAAa,CAAE,mBAAmB,CAClC,gBAAgB,CAAE,sBAAsB,CACxC,YAAY,CAAE,kBAAkB,CAChC,kBAAkB,CAAE,yBAAyB,CAC7C,gBAAgB,CAAE,uBAAuB,CACzC,kBAAkB,CAAE,yBAAyB,CAC7C,oBAAoB,CAAE,4BAA4B,CAClD,eAAe,CAAE,sBAAsB,CACvC,cAAc,CAAE,oBAAoB,CACpC,YAAY,CAAE,kBAAkB,CAChC,YAAY,CAAE,mBAAmB,CACjC,aAAa,CAAE,oBAAoB,CACnC,uBAAuB,CAAE,+BAA+B,CACxD,0BAA0B,CAAE,mCAAmC,CAC/D,6BAA6B,CAAE,sCAAsC,CACrE,iBAAiB,CAAE,wBAAwB,CAC3C,iBAAiB,CAAE,wBAAwB,CAC3C,kBAAkB,CAAE,yBAAyB,CAC7C,wBAAwB,CAAE,gCAAgC,CAC1D,yBAAyB,CAAE,iCAAiC,CAC5D,oBAAoB,CAAE,2BAA2B,CACjD,kBAAkB,CAAE,wBAAwB,CAC5C,oBAAoB,CAAE,0BAA0B,CAChD,qBAAqB,CAAE,4BAA4B,CACnD,cAAc,CAAE,oBAAoB,CACpC,eAAe,CAAE,qBAAqB,CACtC,cAAc,CAAE,oBAAoB,CAEpC,kBAAkB,CAAE,UAAU,CAE9B,MAAM,CAAE,IAAI,QAAQ,CAAC,kBAAkB,CAAC,CACxC,aAAa,CAAE,IAAI,eAAe,CAAC,IAAI,CAAC,CACxC,UAAU,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC/B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,OAAO,CACpB,OAAO,CAAE,IAAI,SAAS,CAAC,wBAAwB,CAAC,CAChD,UAAU,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,CACnC,MAAM,CAAE,IAAI,QAAQ,CAAC,EAAE,CAAC,CACxB,KAAK,CAAE,IAAI,OAAO,CAAC,KAAK,CAAC,CACzB,SAAS,CAAE,IAAI,WAAW,CAAC,KAAK,CAAC,CACjC,UAAU,CAAE,IAAI,YAAY,CAChC,CAEA,6CAAE,CACE,UAAU,CAAE,IAAI,YAAY,CAAC,WAAW,CAC5C,CAEA,2DAAc,MAAO,CACjB,MAAM,CAAE,IAAI,cAAc,CAAC,kBAAkB,CACjD,CAEA,6DAAiB,CACb,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GAAG,CAAC,IAAI,CACb,OAAO,CAAE,IAAI,yBAAyB,CAAC,MAAM,CAAC,CAC9C,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,IAAI,0BAA0B,CAAC,OAAO,CAAC,CACjD,UAAU,CAAE,OAChB,CAEA,qDAAQ,CACR,wDAAY,CACR,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,CAAC,CACd,WAAW,CAAE,MACjB,CAEA,wDAAY,CACR,QAAQ,CAAE,IAAI,qBAAqB,CAAC,CACpC,GAAG,CAAE,IAAI,gBAAgB,CAAC,CAC1B,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CACnC,CAEA,kDAAM,CACF,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,aAAa,CAAC,kBAAkB,CAAC,CAC5C,OAAO,CAAE,IAAI,eAAe,CAAC,EAAE,CAAC,CAChC,cAAc,CAAE,IAAI,sBAAsB,CAAC,QAAQ,CAAC,CACpD,MAAM,CAAE,IAAI,cAAc,CAAC,EAAE,CAAC,CAC9B,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,WAAW,CACvB,SAAS,CAAE,IAAI,WAAW,CAAC,KAAK,CACpC,gBAEA,KAAK,MAAM,CAAC,CAAG,+BAAgB,CAAG,oBAAM,CACpC,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACZ,CAEA,kDAAK,kBAAmB,CACpB,KAAK,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CAAC,CACxC,OAAO,CAAE,IAAI,qBAAqB,CAAC,EAAE,CACzC,CAEA,kDAAK,aAAc,CACf,KAAK,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CAAC,CACxC,OAAO,CAAE,IAAI,qBAAqB,CAAC,EAAE,CACzC,CAEA,kDAAK,MAAO,CACR,OAAO,CAAE,IACb,CAEA,cAAc,qDAAS,CACnB,MAAM,CAAE,IAAI,gBAAgB,CAAC,kBAAkB,CAAC,CAChD,aAAa,CAAE,IAAI,uBAAuB,CAAC,0BAA0B,CACzE,CAEA,sDAAU,CACN,UAAU,CAAE,IAAI,qBAAqB,CAAC,QAAQ,CAAC,CAC/C,YAAY,CAAE,IAAI,uBAAuB,CAAC,QAAQ,CAAC,CACnD,KAAK,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CACxC,CAEA,wBAAS,CAAC,mCAAK,kBAAmB,CAC9B,KAAK,CAAE,IAAI,4BAA4B,CAAC,QAAQ,CAAC,CACjD,OAAO,CAAE,IAAI,8BAA8B,CAAC,EAAE,CAClD,CAEA,wBAAS,CAAC,mCAAK,aAAc,CACzB,KAAK,CAAE,IAAI,4BAA4B,CAAC,QAAQ,CAAC,CACjD,OAAO,CAAE,IAAI,8BAA8B,CAAC,EAAE,CAClD,CAEA,2DAAe,CACX,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,IAAI,wBAAwB,CAAC,OAAO,CAAC,CAC/C,OAAO,CAAE,IAAI,uBAAuB,CAAC,WAAW,CAAC,CACjD,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,qBAAqB,CAAC,QAAQ,CAAC,CAC1C,SAAS,CAAE,IAAI,WAAW,CAAC,KAAK,CACpC,CAEA,qBAAM,CAAC,4CAAe,CAClB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAChC,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAC9B,CAEA,2DAAc,MAAO,CACjB,OAAO,CAAE,IACb,CAEA,gEAAoB,CAChB,OAAO,CAAE,CACb,CAEA,kDAAM,CACF,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MACrB,CAEA,0DAAc,CACV,GAAG,CAAE,KAAK,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,oBAAoB,CAAC,KAAK,CAAC,CACtC,MAAM,CAAE,IAAI,qBAAqB,CAAC,KAAK,CAAC,CACxC,KAAK,CAAE,IAAI,oBAAoB,CAAC,mBAAmB,CAAC,CACpD,MAAM,CAAE,IAAI,qBAAqB,CAAC,EAAE,CAAC,CACrC,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,CACjB,CAEA,0DAAa,MAAO,CAChB,OAAO,CAAE,IAAI,4BAA4B,CAAC,kBAAkB,CAChE,CAEA,qDAAS,CACL,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,CAC7B,KAAK,CAAE,IAAI,eAAe,CAAC,mBAAmB,CAAC,CAC/C,MAAM,CAAE,IAAI,iBAAiB,CAAC,EAAE,CAAC,CACjC,WAAW,CAAE,CACjB,CAEA,qDAAS,CACL,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACnC,UAAU,CAAE,IAAI,oBAAoB,CAAC,YAAY,CAAC,CAClD,cAAc,CAAE,IAAI,wBAAwB,CAAC,KAAK,CAAC,CACnD,KAAK,CAAE,IAAI,eAAe,CAAC,mBAAmB,CAAC,CAC/C,MAAM,CAAE,IAAI,gBAAgB,CAAC,wBAAwB,CAAC,CACtD,WAAW,CAAE,CACjB,CAEA,mDAAO,CACH,OAAO,CAAE,IAAI,sBAAsB,CAAC,wBAAwB,CAChE,CAEA,qBAAM,CAAC,mCAAM,CACT,OAAO,CAAE,IAAI,4BAA4B,CAAC,EAAE,CAAC,CAC7C,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,2BAA2B,CAAC,MAAM,CAAC,CAC/C,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IACd,CAEA,cAAc,mDAAO,CACjB,MAAM,CAAE,IAAI,cAAc,CAAC,kBAAkB,CAAC,CAC9C,UAAU,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAC5C,CAEA,uDAAW,CACP,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC9B,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,CACV,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,GAAG,CACZ,WAAW,CAAE,MACjB,CAEA,wDAAY,CACR,UAAU,CAAE,IAAI,eAAe,CAAC,QAAQ,CAAC,CACzC,MAAM,CAAE,IAAI,mBAAmB,CAAC,EAAE,CAAC,CACnC,OAAO,CAAE,IAAI,oBAAoB,CAAC,eAAe,CAAC,CAClD,aAAa,CAAE,IAAI,0BAA0B,CAAC,IAAI,CAAC,CACnD,MAAM,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,CACtC,WAAW,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,CAC3C,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,oBAAoB,CAAC,MAAM,CAAC,CACzC,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,IAAI,gBAAgB,CAAC,IAAI,CAAC,CAC/B,cAAc,CAAE,IAAI,CACpB,SAAS,CAAE,IAAI,iBAAiB,CAAC,KAAK,CAAC,CACvC,KAAK,CAAE,IAAI,kBAAkB,CAAC,kBAAkB,CACpD,CAEA,WAAW,sDAAS,MAAO,CACvB,UAAU,CAAE,IAAI,8BAA8B,CAAC,QAAQ,CAAC,CACxD,KAAK,CAAE,IAAI,iCAAiC,CAAC,QAAQ,CACzD,CAEA,6DAAiB,CACb,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MACjB,CAEA,8DAAkB,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,kBAAkB,CAAE,wCACxB,CAEA,WAAW,oDAAQ,CACf,OAAO,CAAE,IAAI,2BAA2B,CAAC,kBAAkB,CAC/D,CAEA,gEAAoB,CAChB,UAAU,CAAE,IAAI,aAAa,CAAC,mCAAmC,CAAC,CAClE,aAAa,CAAE,IAAI,oBAAoB,CAAC,IAAI,CAAC,CAC7C,UAAU,CAAE,IAAI,iBAAiB,CAAC,MAAM,CAAC,CACzC,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,iBAAiB,CAAC,KAAK,CAAC,CACxC,QAAQ,CAAE,IAAI,eAAe,CAAC,SAAS,CAAC,CACxC,OAAO,CAAE,IAAI,cAAc,CAAC,EAAE,CAAC,CAC/B,MAAM,CAAE,IAAI,aAAa,CAC7B,CAEA,sDAAU,CACN,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IACpB,CAEA,8DAAkB,CACd,KAAK,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CAAC,CACxC,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,IAAI,uBAAuB,CAAC,KAAK,CAAC,CAC7C,WAAW,CAAE,IAAI,yBAAyB,CAAC,IAAI,CAAC,CAChD,MAAM,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAC3B,WAAW,CAAE,IAAI,QAAQ,CAAC,KAAK,CAAC,CAChC,OAAO,CAAE,IAAI,qBAAqB,CAAC,OAAO,CAAC,CAC3C,aAAa,CAAE,QAAQ,CACvB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,IAAI,4BAA4B,CAAC,UAAU,CAAC,CAC5D,YAAY,CAAE,IAAI,0BAA0B,CAAC,OAAO,CAAC,CACrD,YAAY,CAAE,IAAI,0BAA0B,CAAC,KAAK,CAAC,CACnD,YAAY,CAAE,IAAI,0BAA0B,CAAC,MAAM,CACvD,CAEA,mDAAO,CACH,UAAU,CAAE,IAAI,uBAAuB,CAAC,OAAO,CAAC,CAChD,OAAO,CAAE,IAAI,oBAAoB,CAAC,OAAO,CAAC,CAC1C,KAAK,CAAE,IAAI,kBAAkB,CAAC,QAAQ,CAC1C,CAEA,kDAAM,CACF,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,aAAa,CAAC,oBAAoB,CAAC,CAC/C,WAAW,CAAE,IAAI,kBAAkB,CAAC,oBAAoB,CAAC,CACzD,OAAO,CAAE,IAAI,cAAc,CAAC,OAAO,CAAC,CACpC,KAAK,CAAE,IAAI,YAAY,CAAC,QAAQ,CAAC,CACjC,aAAa,CAAE,QAAQ,CACvB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,iBAAiB,CAAC,SAAS,CAAC,CAC5C,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IACX,CAEA,KAAK,wDAAY,CACb,YAAY,CAAE,IAAI,yBAAyB,CAAC,KAAK,CACrD,CAEA,kDAAK,OAAQ,CACT,UAAU,CAAE,IAAI,wBAAwB,CAAC,QAAQ,CACrD,CAEA,KAAK,oDAAQ,CACT,UAAU,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CAAC,CAC7C,KAAK,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAC3C,CAEA,KAAK,mDAAO,CACR,aAAa,CAAE,IAAI,0BAA0B,CAAC,YAAY,CAC9D,CAEA,KAAK,mDAAM,KAAK,OAAO,CAAE,CACrB,UAAU,CAAE,IAAI,eAAe,CAAC,QAAQ,CAAC,CACzC,KAAK,CAAE,IAAI,kBAAkB,CAAC,QAAQ,CAC1C,CAEA,KAAK,4DAAe,CACpB,KAAK,MAAM,KAAK,4DAAe,CAC/B,KAAK,OAAO,KAAK,4DAAe,CAChC,KAAK,4DAAe,OAAQ,CACxB,KAAK,CAAE,IAAI,8BAA8B,CAAC,KAAK,CAAC,CAChD,UAAU,CAAE,WAChB,CAEA,sDAAU,CACN,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,CACX"}`
};
function convertStringItemsToObjects(_items) {
  return _items.map((item, index) => {
    return { index, value: item, label: `${item}` };
  });
}
function isItemFirst(itemIndex) {
  return itemIndex === 0;
}
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasValue;
  let hideSelectedItem;
  let showClear;
  let placeholderText;
  let ariaSelection;
  let ariaContext;
  let filteredItems;
  let $$slots = compute_slots(slots);
  const dispatch = createEventDispatcher();
  let { justValue = null } = $$props;
  let { filter: filter$1 = filter } = $$props;
  let { getItems: getItems$1 = getItems } = $$props;
  let { id = null } = $$props;
  let { name = null } = $$props;
  let { container = void 0 } = $$props;
  let { input = void 0 } = $$props;
  let { multiple = false } = $$props;
  let { multiFullItemClearable = false } = $$props;
  let { disabled = false } = $$props;
  let { focused = false } = $$props;
  let { value = null } = $$props;
  let { filterText = "" } = $$props;
  let { placeholder = "Please select" } = $$props;
  let { placeholderAlwaysShow = false } = $$props;
  let { items = null } = $$props;
  let { label = "label" } = $$props;
  let { itemFilter = (label2, filterText2, option) => `${label2}`.toLowerCase().includes(filterText2.toLowerCase()) } = $$props;
  let { groupBy = void 0 } = $$props;
  let { groupFilter = (groups) => groups } = $$props;
  let { groupHeaderSelectable = false } = $$props;
  let { itemId = "value" } = $$props;
  let { loadOptions = void 0 } = $$props;
  let { containerStyles = "" } = $$props;
  let { hasError = false } = $$props;
  let { filterSelectedItems = true } = $$props;
  let { required = false } = $$props;
  let { closeListOnChange = true } = $$props;
  let { clearFilterTextOnBlur = true } = $$props;
  let { createGroupHeaderItem = (groupValue, item) => {
    return { value: groupValue, [label]: groupValue };
  } } = $$props;
  const getFilteredItems = () => {
    return filteredItems;
  };
  let { searchable = true } = $$props;
  let { inputStyles = "" } = $$props;
  let { clearable = true } = $$props;
  let { loading = false } = $$props;
  let { listOpen = false } = $$props;
  let timeout;
  let { debounce = (fn, wait = 1) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  } } = $$props;
  let { debounceWait = 300 } = $$props;
  let { hideEmptyState = false } = $$props;
  let { inputAttributes = {} } = $$props;
  let { listAutoWidth = true } = $$props;
  let { showChevron = false } = $$props;
  let { listOffset = 5 } = $$props;
  let { hoverItemIndex = 0 } = $$props;
  let { floatingConfig = {} } = $$props;
  let { class: containerClasses = "" } = $$props;
  let activeValue;
  let prev_value;
  let prev_filterText;
  function setValue() {
    if (typeof value === "string") {
      let item = (items || []).find((item2) => item2[itemId] === value);
      value = item || { [itemId]: value, label: value };
    } else if (multiple && Array.isArray(value) && value.length > 0) {
      value = value.map((item) => typeof item === "string" ? { value: item, label: item } : item);
    }
  }
  let _inputAttributes;
  function assignInputAttributes() {
    _inputAttributes = Object.assign(
      {
        autocapitalize: "none",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: false,
        tabindex: 0,
        type: "text",
        "aria-autocomplete": "list"
      },
      inputAttributes
    );
    if (id) {
      _inputAttributes["id"] = id;
    }
    if (!searchable) {
      _inputAttributes["readonly"] = true;
    }
  }
  function filterGroupedItems(_items) {
    const groupValues = [];
    const groups = {};
    _items.forEach((item) => {
      const groupValue = groupBy(item);
      if (!groupValues.includes(groupValue)) {
        groupValues.push(groupValue);
        groups[groupValue] = [];
        if (groupValue) {
          groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
            id: groupValue,
            groupHeader: true,
            selectable: groupHeaderSelectable
          }));
        }
      }
      groups[groupValue].push(Object.assign({ groupItem: !!groupValue }, item));
    });
    const sortedGroupedItems = [];
    groupFilter(groupValues).forEach((groupValue) => {
      if (groups[groupValue]) sortedGroupedItems.push(...groups[groupValue]);
    });
    return sortedGroupedItems;
  }
  function dispatchSelectedItem() {
    if (multiple) {
      if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
        if (checkValueForDuplicates()) {
          dispatch("input", value);
        }
      }
      return;
    }
    {
      dispatch("input", value);
    }
  }
  function setupMulti() {
    if (value) {
      if (Array.isArray(value)) {
        value = [...value];
      } else {
        value = [value];
      }
    }
  }
  function setValueIndexAsHoverIndex() {
    const valueIndex = filteredItems.findIndex((i) => {
      return i[itemId] === value[itemId];
    });
    checkHoverSelectable(valueIndex, true);
  }
  function dispatchHover(i) {
    dispatch("hoverItem", i);
  }
  function checkHoverSelectable(startingIndex = 0, ignoreGroup) {
    hoverItemIndex = startingIndex < 0 ? 0 : startingIndex;
    if (!ignoreGroup && groupBy && filteredItems[hoverItemIndex] && !filteredItems[hoverItemIndex].selectable) {
      setHoverIndex(1);
    }
  }
  function setupFilterText() {
    if (!loadOptions && filterText.length === 0) return;
    if (loadOptions) {
      debounce(
        async function() {
          loading = true;
          let res = await getItems$1({
            dispatch,
            loadOptions,
            convertStringItemsToObjects,
            filterText
          });
          if (res) {
            loading = res.loading;
            listOpen = listOpen ? res.listOpen : filterText.length > 0 ? true : false;
            focused = listOpen && res.focused;
            items = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;
          } else {
            loading = false;
            focused = true;
            listOpen = true;
          }
        },
        debounceWait
      );
    } else {
      listOpen = true;
      if (multiple) {
        activeValue = void 0;
      }
    }
  }
  function handleFilterEvent(items2) {
    if (listOpen) dispatch("filter", items2);
  }
  function computeJustValue() {
    if (multiple) return value ? value.map((item) => item[itemId]) : null;
    return value ? value[itemId] : value;
  }
  function checkValueForDuplicates() {
    let noDuplicates = true;
    if (value) {
      const ids = [];
      const uniqueValues = [];
      value.forEach((val) => {
        if (!ids.includes(val[itemId])) {
          ids.push(val[itemId]);
          uniqueValues.push(val);
        } else {
          noDuplicates = false;
        }
      });
      if (!noDuplicates) value = uniqueValues;
    }
    return noDuplicates;
  }
  function findItem(selection) {
    let matchTo = selection ? selection[itemId] : value[itemId];
    return items.find((item) => item[itemId] === matchTo);
  }
  function updateValueDisplay(items2) {
    if (!items2 || items2.length === 0 || items2.some((item) => typeof item !== "object")) return;
    if (!value || (multiple ? value.some((selection) => !selection || !selection[itemId]) : !value[itemId])) return;
    if (Array.isArray(value)) {
      value = value.map((selection) => findItem(selection) || selection);
    } else {
      value = findItem() || value;
    }
  }
  function handleFocus(e) {
    if (focused && input === document?.activeElement) return;
    input?.focus();
    focused = true;
  }
  function handleClear() {
    dispatch("clear", value);
    value = void 0;
    closeList();
    handleFocus();
  }
  function closeList() {
    if (clearFilterTextOnBlur) {
      filterText = "";
    }
    listOpen = false;
  }
  let { ariaValues = (values) => {
    return `Option ${values}, selected.`;
  } } = $$props;
  let { ariaListOpen = (label2, count) => {
    return `You are currently focused on option ${label2}. There are ${count} results available.`;
  } } = $$props;
  let { ariaFocused = () => {
    return `Select is focused, type to refine list, press down to open the menu.`;
  } } = $$props;
  function handleAriaSelection(_multiple) {
    let selected = void 0;
    if (_multiple && value.length > 0) {
      selected = value.map((v) => v[label]).join(", ");
    } else {
      selected = value[label];
    }
    return ariaValues(selected);
  }
  function handleAriaContent() {
    if (!filteredItems || filteredItems.length === 0) return "";
    let _item = filteredItems[hoverItemIndex];
    if (listOpen && _item) {
      let count = filteredItems ? filteredItems.length : 0;
      return ariaListOpen(_item[label], count);
    } else {
      return ariaFocused();
    }
  }
  let list = null;
  onDestroy(() => {
  });
  function setHoverIndex(increment) {
    let selectableFilteredItems = filteredItems.filter((item) => !Object.hasOwn(item, "selectable") || item.selectable === true);
    if (selectableFilteredItems.length === 0) {
      return hoverItemIndex = 0;
    }
    if (hoverItemIndex === filteredItems.length - 1) {
      hoverItemIndex = 0;
    } else {
      hoverItemIndex = hoverItemIndex + increment;
    }
    const hover = filteredItems[hoverItemIndex];
    if (hover && hover.selectable === false) {
      setHoverIndex(increment);
      return;
    }
  }
  function isItemActive(item, value2, itemId2) {
    if (multiple) return;
    return value2 && value2[itemId2] === item[itemId2];
  }
  function setListWidth() {
    const { width } = container.getBoundingClientRect();
    list.style.width = listAutoWidth ? width + "px" : "auto";
  }
  let _floatingConfig = {
    strategy: "absolute",
    placement: "bottom-start",
    middleware: [offset(listOffset), flip(), shift()],
    autoUpdate: false
  };
  const [floatingRef, floatingContent, floatingUpdate] = createFloatingActions(_floatingConfig);
  let prefloat = true;
  function listMounted(list2, listOpen2) {
    return prefloat = true;
  }
  if ($$props.justValue === void 0 && $$bindings.justValue && justValue !== void 0) $$bindings.justValue(justValue);
  if ($$props.filter === void 0 && $$bindings.filter && filter$1 !== void 0) $$bindings.filter(filter$1);
  if ($$props.getItems === void 0 && $$bindings.getItems && getItems$1 !== void 0) $$bindings.getItems(getItems$1);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.container === void 0 && $$bindings.container && container !== void 0) $$bindings.container(container);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0) $$bindings.input(input);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0) $$bindings.multiple(multiple);
  if ($$props.multiFullItemClearable === void 0 && $$bindings.multiFullItemClearable && multiFullItemClearable !== void 0) $$bindings.multiFullItemClearable(multiFullItemClearable);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.focused === void 0 && $$bindings.focused && focused !== void 0) $$bindings.focused(focused);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0) $$bindings.filterText(filterText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.placeholderAlwaysShow === void 0 && $$bindings.placeholderAlwaysShow && placeholderAlwaysShow !== void 0) $$bindings.placeholderAlwaysShow(placeholderAlwaysShow);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.itemFilter === void 0 && $$bindings.itemFilter && itemFilter !== void 0) $$bindings.itemFilter(itemFilter);
  if ($$props.groupBy === void 0 && $$bindings.groupBy && groupBy !== void 0) $$bindings.groupBy(groupBy);
  if ($$props.groupFilter === void 0 && $$bindings.groupFilter && groupFilter !== void 0) $$bindings.groupFilter(groupFilter);
  if ($$props.groupHeaderSelectable === void 0 && $$bindings.groupHeaderSelectable && groupHeaderSelectable !== void 0) $$bindings.groupHeaderSelectable(groupHeaderSelectable);
  if ($$props.itemId === void 0 && $$bindings.itemId && itemId !== void 0) $$bindings.itemId(itemId);
  if ($$props.loadOptions === void 0 && $$bindings.loadOptions && loadOptions !== void 0) $$bindings.loadOptions(loadOptions);
  if ($$props.containerStyles === void 0 && $$bindings.containerStyles && containerStyles !== void 0) $$bindings.containerStyles(containerStyles);
  if ($$props.hasError === void 0 && $$bindings.hasError && hasError !== void 0) $$bindings.hasError(hasError);
  if ($$props.filterSelectedItems === void 0 && $$bindings.filterSelectedItems && filterSelectedItems !== void 0) $$bindings.filterSelectedItems(filterSelectedItems);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.closeListOnChange === void 0 && $$bindings.closeListOnChange && closeListOnChange !== void 0) $$bindings.closeListOnChange(closeListOnChange);
  if ($$props.clearFilterTextOnBlur === void 0 && $$bindings.clearFilterTextOnBlur && clearFilterTextOnBlur !== void 0) $$bindings.clearFilterTextOnBlur(clearFilterTextOnBlur);
  if ($$props.createGroupHeaderItem === void 0 && $$bindings.createGroupHeaderItem && createGroupHeaderItem !== void 0) $$bindings.createGroupHeaderItem(createGroupHeaderItem);
  if ($$props.getFilteredItems === void 0 && $$bindings.getFilteredItems && getFilteredItems !== void 0) $$bindings.getFilteredItems(getFilteredItems);
  if ($$props.searchable === void 0 && $$bindings.searchable && searchable !== void 0) $$bindings.searchable(searchable);
  if ($$props.inputStyles === void 0 && $$bindings.inputStyles && inputStyles !== void 0) $$bindings.inputStyles(inputStyles);
  if ($$props.clearable === void 0 && $$bindings.clearable && clearable !== void 0) $$bindings.clearable(clearable);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.listOpen === void 0 && $$bindings.listOpen && listOpen !== void 0) $$bindings.listOpen(listOpen);
  if ($$props.debounce === void 0 && $$bindings.debounce && debounce !== void 0) $$bindings.debounce(debounce);
  if ($$props.debounceWait === void 0 && $$bindings.debounceWait && debounceWait !== void 0) $$bindings.debounceWait(debounceWait);
  if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0) $$bindings.hideEmptyState(hideEmptyState);
  if ($$props.inputAttributes === void 0 && $$bindings.inputAttributes && inputAttributes !== void 0) $$bindings.inputAttributes(inputAttributes);
  if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0) $$bindings.listAutoWidth(listAutoWidth);
  if ($$props.showChevron === void 0 && $$bindings.showChevron && showChevron !== void 0) $$bindings.showChevron(showChevron);
  if ($$props.listOffset === void 0 && $$bindings.listOffset && listOffset !== void 0) $$bindings.listOffset(listOffset);
  if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0) $$bindings.hoverItemIndex(hoverItemIndex);
  if ($$props.floatingConfig === void 0 && $$bindings.floatingConfig && floatingConfig !== void 0) $$bindings.floatingConfig(floatingConfig);
  if ($$props.class === void 0 && $$bindings.class && containerClasses !== void 0) $$bindings.class(containerClasses);
  if ($$props.handleClear === void 0 && $$bindings.handleClear && handleClear !== void 0) $$bindings.handleClear(handleClear);
  if ($$props.ariaValues === void 0 && $$bindings.ariaValues && ariaValues !== void 0) $$bindings.ariaValues(ariaValues);
  if ($$props.ariaListOpen === void 0 && $$bindings.ariaListOpen && ariaListOpen !== void 0) $$bindings.ariaListOpen(ariaListOpen);
  if ($$props.ariaFocused === void 0 && $$bindings.ariaFocused && ariaFocused !== void 0) $$bindings.ariaFocused(ariaFocused);
  $$result.css.add(css$3);
  {
    if (value) setValue();
  }
  {
    if (inputAttributes || !searchable) assignInputAttributes();
  }
  {
    if (multiple) setupMulti();
  }
  {
    if (multiple && value && value.length > 1) checkValueForDuplicates();
  }
  {
    if (value) dispatchSelectedItem();
  }
  {
    if (!value && multiple && prev_value) dispatch("input", value);
  }
  {
    if (!focused && input) closeList();
  }
  {
    if (filterText !== prev_filterText) setupFilterText();
  }
  filteredItems = filter$1({
    loadOptions,
    filterText,
    items,
    multiple,
    value,
    itemId,
    groupBy,
    label,
    filterSelectedItems,
    itemFilter,
    convertStringItemsToObjects,
    filterGroupedItems
  });
  {
    if (!multiple && listOpen && value && filteredItems) setValueIndexAsHoverIndex();
  }
  {
    if (listOpen && multiple) hoverItemIndex = 0;
  }
  {
    if (filterText) hoverItemIndex = 0;
  }
  {
    dispatchHover(hoverItemIndex);
  }
  hasValue = multiple ? value && value.length > 0 : value;
  hideSelectedItem = hasValue && filterText.length > 0;
  showClear = hasValue && clearable && !disabled && !loading;
  placeholderText = placeholderAlwaysShow && multiple ? placeholder : multiple && value?.length === 0 ? placeholder : value ? "" : placeholder;
  ariaSelection = value ? handleAriaSelection(multiple) : "";
  ariaContext = handleAriaContent();
  {
    updateValueDisplay(items);
  }
  justValue = computeJustValue();
  {
    if (!multiple && prev_value && !value) dispatch("input", value);
  }
  {
    if (listOpen && filteredItems && !multiple && !value) checkHoverSelectable();
  }
  {
    handleFilterEvent(filteredItems);
  }
  {
    if (container && floatingConfig?.autoUpdate === void 0) {
      _floatingConfig.autoUpdate = true;
    }
  }
  {
    if (container && floatingConfig) floatingUpdate(Object.assign(_floatingConfig, floatingConfig));
  }
  {
    listMounted();
  }
  {
    if (listOpen && container && list) setListWidth();
  }
  {
    if (input && listOpen && !focused) handleFocus();
  }
  return ` <div class="${[
    "svelte-select " + escape(containerClasses, true) + " svelte-1bhoqam",
    (multiple ? "multi" : "") + " " + (disabled ? "disabled" : "") + " " + (focused ? "focused" : "") + " " + (listOpen ? "list-open" : "") + " " + (showChevron ? "show-chevron" : "") + " " + (hasError ? "error" : "")
  ].join(" ").trim()}"${add_attribute("style", containerStyles, 0)} role="none"${add_attribute("this", container, 0)}>${listOpen ? `<div class="${["svelte-select-list svelte-1bhoqam", prefloat ? "prefloat" : ""].join(" ").trim()}" role="none"${add_attribute("this", list, 0)}>${$$slots["list-prepend"] ? `${slots["list-prepend"] ? slots["list-prepend"]({}) : ``}` : ``} ${$$slots.list ? `${slots.list ? slots.list({ filteredItems }) : ``}` : `${filteredItems.length > 0 ? `${each(filteredItems, (item, i) => {
    return `<div class="list-item svelte-1bhoqam" tabindex="-1" role="none"><div class="${[
      "item svelte-1bhoqam",
      (item.groupHeader ? "list-group-title" : "") + " " + (isItemActive(item, value, itemId) ? "active" : "") + " " + (isItemFirst(i) ? "first" : "") + " " + (hoverItemIndex === i ? "hover" : "") + " " + (item.groupItem ? "group-item" : "") + " " + (item?.selectable === false ? "not-selectable" : "")
    ].join(" ").trim()}">${slots.item ? slots.item({ item, index: i }) : ` ${escape(item?.[label])} `}</div> </div>`;
  })}` : `${!hideEmptyState ? `${slots.empty ? slots.empty({}) : ` <div class="empty svelte-1bhoqam" data-svelte-h="svelte-16ffy3h">No options</div> `}` : ``}`}`} ${$$slots["list-append"] ? `${slots["list-append"] ? slots["list-append"]({}) : ``}` : ``}</div>` : ``} <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="a11y-text svelte-1bhoqam">${focused ? `<span id="aria-selection" class="svelte-1bhoqam">${escape(ariaSelection)}</span> <span id="aria-context" class="svelte-1bhoqam">${escape(ariaContext)}</span>` : ``}</span> <div class="prepend svelte-1bhoqam">${slots.prepend ? slots.prepend({}) : ``}</div> <div class="value-container svelte-1bhoqam">${hasValue ? `${multiple ? `${each(value, (item, i) => {
    return `<div class="${[
      "multi-item svelte-1bhoqam",
      (activeValue === i ? "active" : "") + " " + (disabled ? "disabled" : "")
    ].join(" ").trim()}" role="none"><span class="multi-item-text svelte-1bhoqam">${slots.selection ? slots.selection({ selection: item, index: i }) : ` ${escape(item[label])} `}</span> ${!disabled && !multiFullItemClearable && ClearIcon ? `<div class="multi-item-clear svelte-1bhoqam">${slots["multi-clear-icon"] ? slots["multi-clear-icon"]({}) : ` ${validate_component(ClearIcon, "ClearIcon").$$render($$result, {}, {}, {})} `} </div>` : ``} </div>`;
  })}` : `<div class="${[
    "selected-item svelte-1bhoqam",
    hideSelectedItem ? "hide-selected-item" : ""
  ].join(" ").trim()}">${slots.selection ? slots.selection({ selection: value }) : ` ${escape(value[label])} `}</div>`}` : ``} <input${spread(
    [
      { readonly: !searchable || null },
      escape_object(_inputAttributes),
      {
        placeholder: escape_attribute_value(placeholderText)
      },
      {
        style: escape_attribute_value(inputStyles)
      },
      { disabled: disabled || null }
    ],
    { classes: "svelte-1bhoqam" }
  )}${add_attribute("this", input, 0)}${add_attribute("value", filterText, 0)}></div> <div class="indicators svelte-1bhoqam">${loading ? `<div class="icon loading svelte-1bhoqam" aria-hidden="true">${slots["loading-icon"] ? slots["loading-icon"]({}) : ` ${validate_component(LoadingIcon, "LoadingIcon").$$render($$result, {}, {}, {})} `}</div>` : ``} ${showClear ? `<button type="button" class="icon clear-select svelte-1bhoqam">${slots["clear-icon"] ? slots["clear-icon"]({}) : ` ${validate_component(ClearIcon, "ClearIcon").$$render($$result, {}, {}, {})} `}</button>` : ``} ${showChevron ? `<div class="icon chevron svelte-1bhoqam" aria-hidden="true">${slots["chevron-icon"] ? slots["chevron-icon"]({ listOpen }) : ` ${validate_component(ChevronIcon, "ChevronIcon").$$render($$result, {}, {}, {})} `}</div>` : ``}</div> ${slots["input-hidden"] ? slots["input-hidden"]({ value }) : ` <input${add_attribute("name", name, 0)} type="hidden"${add_attribute("value", value ? JSON.stringify(value) : null, 0)} class="svelte-1bhoqam"> `} ${required && (!value || value.length === 0) ? `${slots.required ? slots.required({ value }) : ` <select class="required svelte-1bhoqam" required tabindex="-1" aria-hidden="true"></select> `}` : ``} </div>`;
});
function getTransform(scale, translateX, translateY, rotate, flip2, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip2) {
    if (flip2 == "horizontal") {
      flipX = -1;
    } else if (flip2 == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  if (typeof scale === "string") {
    scale = parseFloat(scale);
  }
  if (typeof translateX === "string") {
    translateX = parseFloat(translateX);
  }
  if (typeof translateY === "string") {
    translateY = parseFloat(translateY);
  }
  const x = `${translateX * translateTimes}${translateUnit}`;
  const y = `${translateY * translateTimes}${translateUnit}`;
  let output = `translate(${x},${y}) scale(${flipX * scale},${flipY * scale})`;
  if (rotate) {
    output += ` rotate(${rotate}${rotateUnit})`;
  }
  return output;
}
const css$2 = {
  code: ".svelte-fa-base{height:1em;overflow:visible;transform-origin:center;vertical-align:-0.125em}.svelte-fa-fw{text-align:center;width:1.25em}.svelte-fa-pull-left.svelte-l34xo3{float:left}.svelte-fa-pull-right.svelte-l34xo3{float:right}.svelte-fa-size-lg.svelte-l34xo3{font-size:1.33333em;line-height:0.75em;vertical-align:-0.225em}.svelte-fa-size-sm.svelte-l34xo3{font-size:0.875em}.svelte-fa-size-xs.svelte-l34xo3{font-size:0.75em}.spin.svelte-l34xo3{animation:svelte-l34xo3-spin 2s 0s infinite linear}.pulse.svelte-l34xo3{animation:svelte-l34xo3-spin 1s infinite steps(8)}@keyframes svelte-l34xo3-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"fa.svelte","sources":["fa.svelte"],"sourcesContent":["<script>import { getTransform, setCustomFontSize } from \\"./utils.js\\";\\nlet clazz = void 0;\\nexport { clazz as class };\\nexport let id = void 0;\\nexport let style = void 0;\\nexport let icon;\\nexport let title = void 0;\\nexport let size = void 0;\\nexport let color = void 0;\\nexport let fw = false;\\nexport let pull = void 0;\\nexport let scale = 1;\\nexport let translateX = 0;\\nexport let translateY = 0;\\nexport let rotate = void 0;\\nexport let flip = void 0;\\nexport let spin = false;\\nexport let pulse = false;\\nexport let primaryColor = \\"\\";\\nexport let secondaryColor = \\"\\";\\nexport let primaryOpacity = 1;\\nexport let secondaryOpacity = 0.4;\\nexport let swapOpacity = false;\\nlet svgElement;\\n$:\\n  svgElement && size && setCustomFontSize(svgElement, size);\\n$:\\n  i = icon && icon.icon || [0, 0, \\"\\", [], \\"\\"];\\n$:\\n  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);\\n<\/script>\\n\\n{#if i[4]}\\n  <!-- eslint-disable svelte/no-inline-styles -- Only styles passed to this component should be included -->\\n  <svg\\n    {id}\\n    class=\\"svelte-fa svelte-fa-base {clazz}\\"\\n    class:pulse\\n    class:svelte-fa-size-lg={size === \\"lg\\"}\\n    class:svelte-fa-size-sm={size === \\"sm\\"}\\n    class:svelte-fa-size-xs={size === \\"xs\\"}\\n    class:svelte-fa-fw={fw}\\n    class:svelte-fa-pull-left={pull === \\"left\\"}\\n    class:svelte-fa-pull-right={pull === \\"right\\"}\\n    class:spin\\n    bind:this={svgElement}\\n    {style}\\n    viewBox=\\"0 0 {i[0]} {i[1]}\\"\\n    aria-hidden=\\"true\\"\\n    role=\\"img\\"\\n    xmlns=\\"http://www.w3.org/2000/svg\\"\\n  >\\n    <!-- eslint-enable -->\\n    {#if title}\\n      <title>{title}</title>\\n    {/if}\\n    <g transform=\\"translate({i[0] / 2} {i[1] / 2})\\" transform-origin=\\"{i[0] / 4} 0\\">\\n      <g {transform}>\\n        {#if typeof i[4] == \\"string\\"}\\n          <path\\n            d={i[4]}\\n            fill={color || primaryColor || \\"currentColor\\"}\\n            transform=\\"translate({i[0] / -2} {i[1] / -2})\\"\\n          />\\n        {:else}\\n          <!-- Duotone icons -->\\n          <path\\n            d={i[4][0]}\\n            fill={secondaryColor || color || \\"currentColor\\"}\\n            fill-opacity={swapOpacity != false ? primaryOpacity : secondaryOpacity}\\n            transform=\\"translate({i[0] / -2} {i[1] / -2})\\"\\n          />\\n          <path\\n            d={i[4][1]}\\n            fill={primaryColor || color || \\"currentColor\\"}\\n            fill-opacity={swapOpacity != false ? secondaryOpacity : primaryOpacity}\\n            transform=\\"translate({i[0] / -2} {i[1] / -2})\\"\\n          />\\n        {/if}\\n      </g>\\n    </g>\\n  </svg>\\n{/if}\\n\\n<style>\\n  :global(.svelte-fa-base) {\\n    height: 1em;\\n    overflow: visible;\\n    transform-origin: center;\\n    vertical-align: -0.125em;\\n  }\\n\\n  :global(.svelte-fa-fw) {\\n    text-align: center;\\n    width: 1.25em;\\n  }\\n\\n  .svelte-fa-pull-left {\\n    float: left;\\n  }\\n\\n  .svelte-fa-pull-right {\\n    float: right;\\n  }\\n\\n  .svelte-fa-size-lg {\\n    font-size: 1.33333em;\\n    line-height: 0.75em;\\n    vertical-align: -0.225em;\\n  }\\n\\n  .svelte-fa-size-sm {\\n    font-size: 0.875em;\\n  }\\n\\n  .svelte-fa-size-xs {\\n    font-size: 0.75em;\\n  }\\n\\n  .spin {\\n    animation: spin 2s 0s infinite linear;\\n  }\\n\\n  .pulse {\\n    animation: spin 1s infinite steps(8);\\n  }\\n\\n  @keyframes spin {\\n    0% {\\n      transform: rotate(0deg);\\n    }\\n    100% {\\n      transform: rotate(360deg);\\n    }\\n  }</style>\\n"],"names":[],"mappings":"AAqFU,eAAiB,CACvB,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,OAAO,CACjB,gBAAgB,CAAE,MAAM,CACxB,cAAc,CAAE,QAClB,CAEQ,aAAe,CACrB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,MACT,CAEA,kCAAqB,CACnB,KAAK,CAAE,IACT,CAEA,mCAAsB,CACpB,KAAK,CAAE,KACT,CAEA,gCAAmB,CACjB,SAAS,CAAE,SAAS,CACpB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,QAClB,CAEA,gCAAmB,CACjB,SAAS,CAAE,OACb,CAEA,gCAAmB,CACjB,SAAS,CAAE,MACb,CAEA,mBAAM,CACJ,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,EAAE,CAAC,QAAQ,CAAC,MACjC,CAEA,oBAAO,CACL,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,QAAQ,CAAC,MAAM,CAAC,CACrC,CAEA,WAAW,kBAAK,CACd,EAAG,CACD,SAAS,CAAE,OAAO,IAAI,CACxB,CACA,IAAK,CACH,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF"}'
};
const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let i;
  let transform;
  let { class: clazz = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { icon } = $$props;
  let { title = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { color = void 0 } = $$props;
  let { fw = false } = $$props;
  let { pull = void 0 } = $$props;
  let { scale = 1 } = $$props;
  let { translateX = 0 } = $$props;
  let { translateY = 0 } = $$props;
  let { rotate = void 0 } = $$props;
  let { flip: flip2 = void 0 } = $$props;
  let { spin = false } = $$props;
  let { pulse = false } = $$props;
  let { primaryColor = "" } = $$props;
  let { secondaryColor = "" } = $$props;
  let { primaryOpacity = 1 } = $$props;
  let { secondaryOpacity = 0.4 } = $$props;
  let { swapOpacity = false } = $$props;
  let svgElement;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0) $$bindings.class(clazz);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0) $$bindings.fw(fw);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0) $$bindings.pull(pull);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0) $$bindings.scale(scale);
  if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0) $$bindings.translateX(translateX);
  if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0) $$bindings.translateY(translateY);
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0) $$bindings.rotate(rotate);
  if ($$props.flip === void 0 && $$bindings.flip && flip2 !== void 0) $$bindings.flip(flip2);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0) $$bindings.spin(spin);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0) $$bindings.pulse(pulse);
  if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0) $$bindings.primaryColor(primaryColor);
  if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0) $$bindings.secondaryColor(secondaryColor);
  if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0) $$bindings.primaryOpacity(primaryOpacity);
  if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0) $$bindings.secondaryOpacity(secondaryOpacity);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0) $$bindings.swapOpacity(swapOpacity);
  $$result.css.add(css$2);
  i = icon && icon.icon || [0, 0, "", [], ""];
  transform = getTransform(scale, translateX, translateY, rotate, flip2, 512);
  return `${i[4] ? ` <svg${add_attribute("id", id, 0)} class="${[
    "svelte-fa svelte-fa-base " + escape(clazz, true) + " svelte-l34xo3",
    (pulse ? "pulse" : "") + " " + (size === "lg" ? "svelte-fa-size-lg" : "") + " " + (size === "sm" ? "svelte-fa-size-sm" : "") + " " + (size === "xs" ? "svelte-fa-size-xs" : "") + " " + (fw ? "svelte-fa-fw" : "") + " " + (pull === "left" ? "svelte-fa-pull-left" : "") + " " + (pull === "right" ? "svelte-fa-pull-right" : "") + " " + (spin ? "spin" : "")
  ].join(" ").trim()}"${add_attribute("style", style, 0)} viewBox="${"0 0 " + escape(i[0], true) + " " + escape(i[1], true)}" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"${add_attribute("this", svgElement, 0)}>${title ? `<title>${escape(title)}</title>` : ``}<g transform="${"translate(" + escape(i[0] / 2, true) + " " + escape(i[1] / 2, true) + ")"}" transform-origin="${escape(i[0] / 4, true) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string" ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>` : ` <path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path> <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>`}</g></g></svg>` : ``}`;
});
const css$1 = {
  code: ".select-override .svelte-select__control{background-color:white !important;color:black !important}.btn.svelte-hf9p98{padding:10px 10px;font-weight:bold;border-radius:5px;cursor:pointer;width:400px;margin:1rem 0 1rem 1.5rem}.btn-new-game.svelte-hf9p98{background-color:#f6c200;color:#1C4932;border:none}.btn-new-game.svelte-hf9p98:hover{background-color:#e4c013;box-shadow:0px 6px 8px rgba(0, 0, 0, 0.2)}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import ShowSelectGameModal from \\"$lib/components/games/show-select-game-modal.svelte\\";\\nimport Layout from \\"../../Layout.svelte\\";\\nimport Select from 'svelte-select';\\nimport FaIcon from 'svelte-fa';\\nimport { faCheck } from '@fortawesome/free-solid-svg-icons';\\nlet tees = [\\n    { value: 'blue-tee', label: 'Blue Tee' },\\n    { value: 'white_tee', label: 'White Tee' },\\n    { value: 'black_tee', label: 'Black Tee' },\\n    { value: 'red_tee', label: 'Red Tee' }\\n];\\nlet courses = [\\n    { value: 'royal_dornoch', label: 'Royal Dornoch', img: '/golfCourse.png' },\\n    { value: 'swinley_forest', label: 'Swinley Forest', img: '/golfCourse.png' },\\n    { value: 'trump_turnberry', label: 'Trump Turnberry', img: '/golfCourse.png' },\\n    { value: 'royal_birkdale', label: 'Royal Birkdale Golf Club', img: '/golfCourse.png' },\\n    { value: 'royal_liverpool', label: 'Royal Liverpool Golf Club', img: '/golfCourse.png' },\\n    { value: 'royal_st_george', label: 'Royal St. Georges', img: '/golfCourse.png' },\\n    { value: 'waterville', label: 'Waterville', img: '/golfCourse.png' }\\n];\\nlet opponents = [\\n    { name: 'Zoe Duffy', title: 'Managing Director', image: '/zoe.jpg' },\\n    { name: 'Kelly Howlett', title: 'Head of Operations', image: '/kelly.jpeg' },\\n    { name: 'James Beadle', title: 'Development Manager', image: '/james.jpg' },\\n    { name: 'Dfinity Designer', title: 'Head of Design', image: '/dfd.jpg' },\\n    { name: 'Thilly Thana', title: 'Lead Developer', image: '/thilly.jpg' },\\n    { name: 'George Robinson', title: 'Community Manager', image: '/george.jpg' },\\n    { name: 'Josh Wray', title: 'Head of Promotion', image: '/josh.jpg' },\\n    { name: 'Ashutosh Yadav', title: 'Media Production Manager', image: '/ashutosh.jpg' }\\n];\\nlet selectedOpponent = [];\\nlet selectedCourse = null;\\nlet selectedTee = null;\\nfunction handleSelectionChange(selected) {\\n    selectedOpponent = selected.map((opponent) => ({ ...opponent }));\\n}\\nfunction isSelected(opponent) {\\n    return selectedOpponent.some(sel => sel.name === opponent.name);\\n}\\n<\/script>\\n\\n<Layout>\\n    <div class=\\"flex flex-col w-full\\">\\n        <div class=\\"w-full p-2 px-4 text-black\\">\\n            <h2 class=\\"mt-2 mb-2 text-3xl font-black text-black md:text-5xl condensed\\">MULLIGANS</h2>\\n        </div>\\n  \\n        <div class=\\"w-full p-4 text-black bg-gray-100\\">\\n            <h3 class=\\"mt-0 mb-2 text-3xl font-black text-black md:text-3xl condensed\\">GAME DETAILS</h3>\\n\\n            <label for=\\"course\\" class=\\"block mt-4 text-lg font-bold text-black\\">Course</label>\\n            <!-- Course -->\\n            <div class=\\"flex items-center w-full mt-2 text-black bg-gray-100\\">\\n                <div class=\\"flex-grow max-w-md\\">\\n                    <Select \\n                        id=\\"course\\"\\n                        items={courses}\\n                        bind:value={selectedCourse}\\n                        label=\\"label\\"\\n                        placeholder=\\"Select a Course\\"\\n                        searchable\\n                        class=\\"p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override\\"\\n                    >\\n                        <svelte:fragment slot=\\"item\\" let:item>\\n                            <div class=\\"flex items-center w-12 h-12 p-2 space-x-3\\">\\n                                <img src={item.img} alt={item.label} class=\\"object-cover w-8 h-8 rounded-lg\\" />\\n                                <span class=\\"text-black\\">{item.label}</span>\\n                            </div>\\n                        </svelte:fragment>\\n                    </Select>\\n                </div>\\n            \\n                <!-- Add New Course Button -->\\n                <button class=\\"flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-black rounded-full shadow-md\\" style=\\"margin-left: 8px\\" >\\n                   +\\n                </button>\\n            </div>\\n\\n            <label for=\\"tee\\" class=\\"block mt-4 text-lg font-bold text-black\\">Tee</label>\\n\\n            <div class=\\"flex items-center w-full mt-2 text-black bg-gray-100\\">\\n                <div class=\\"flex-grow max-w-md\\">\\n                    <Select \\n                        id=\\"tee\\"\\n                        items={tees}\\n                        bind:value={selectedTee}\\n                        label=\\"label\\"\\n                        placeholder=\\"Select a Tee\\"\\n                        searchable\\n                        class=\\"p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override\\"\\n                    />\\n                </div>\\n            </div>\\n\\n            <!-- Date Selection -->\\n            <div class=\\"mt-4\\">\\n                <label for=\\"date\\" class=\\"block mb-2 text-lg font-bold text-black\\">Date</label>\\n                <input type=\\"date\\" id=\\"date\\" name=\\"date\\" class=\\"w-full max-w-md p-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400\\" />\\n            </div>\\n\\n            <!--Opponent Selection-->\\n            <label for=\\"opponent\\" class=\\"block mt-4 text-lg font-bold text-black\\">Opponents</label>\\n\\n            <div class=\\"flex items-center w-full mt-2 text-black bg-gray-100\\">\\n                <div class=\\"flex-grow max-w-md\\">\\n                    <Select \\n                        id=\\"opponent\\"\\n                        items={opponents}\\n                        bind:value={selectedOpponent}\\n                        label=\\"name\\"\\n                        placeholder=\\"Select your Opponent(s)\\"\\n                        multiple={true}\\n                        searchable\\n                        on:change={(e) => handleSelectionChange(e.detail)}\\n                        class=\\"p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override\\"\\n                    >\\n                        <svelte:fragment slot=\\"item\\" let:item > <!-- Custom rendering for items -->\\n                                <div class=\\"flex items-center justify-between w-full p-2\\">\\n                                    <span>{item.name}</span>\\n                                    {#if isSelected (item)}\\n                                        <FaIcon icon={faCheck} class=\\"text-green-500\\" />\\n                                    {/if}\\n                                </div>\\n                        </svelte:fragment>\\n                    </Select>\\n                </div>\\n            </div>\\n        </div>    \\n        <button class=\\"btn btn-new-game\\">Create New Game</button>\\n    </div>\\n</Layout>\\n\\n<style>\\n    :global(.select-override .svelte-select__control) {\\n        background-color: white !important;\\n        color: black !important;\\n    }\\n    .btn {\\n        padding: 10px 10px;\\n        font-weight: bold;\\n        border-radius: 5px;\\n        cursor: pointer;\\n        width: 400px;\\n        margin: 1rem 0 1rem 1.5rem;\\n    }\\n\\n    .btn-new-game {\\n        background-color: #f6c200;\\n        color: #1C4932;\\n        border: none;\\n    }\\n\\n    .btn-new-game:hover {\\n        background-color: #e4c013; /* Darker yellow on hover */\\n        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); /* More shadow on hover */\\n    }\\n\\n    .create-button:active {\\n        background-color: #d3a913; /* Even darker on click */\\n        transform: translateY(2px); /* Simulating a pressed state */\\n    }</style>"],"names":[],"mappings":"AAqIY,wCAA0C,CAC9C,gBAAgB,CAAE,KAAK,CAAC,UAAU,CAClC,KAAK,CAAE,KAAK,CAAC,UACjB,CACA,kBAAK,CACD,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,MACxB,CAEA,2BAAc,CACV,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,IACZ,CAEA,2BAAa,MAAO,CAChB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC7C"}`
};
const Page$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tees = [
    { value: "blue-tee", label: "Blue Tee" },
    { value: "white_tee", label: "White Tee" },
    { value: "black_tee", label: "Black Tee" },
    { value: "red_tee", label: "Red Tee" }
  ];
  let courses = [
    {
      value: "royal_dornoch",
      label: "Royal Dornoch",
      img: "/golfCourse.png"
    },
    {
      value: "swinley_forest",
      label: "Swinley Forest",
      img: "/golfCourse.png"
    },
    {
      value: "trump_turnberry",
      label: "Trump Turnberry",
      img: "/golfCourse.png"
    },
    {
      value: "royal_birkdale",
      label: "Royal Birkdale Golf Club",
      img: "/golfCourse.png"
    },
    {
      value: "royal_liverpool",
      label: "Royal Liverpool Golf Club",
      img: "/golfCourse.png"
    },
    {
      value: "royal_st_george",
      label: "Royal St. Georges",
      img: "/golfCourse.png"
    },
    {
      value: "waterville",
      label: "Waterville",
      img: "/golfCourse.png"
    }
  ];
  let opponents = [
    {
      name: "Zoe Duffy",
      title: "Managing Director",
      image: "/zoe.jpg"
    },
    {
      name: "Kelly Howlett",
      title: "Head of Operations",
      image: "/kelly.jpeg"
    },
    {
      name: "James Beadle",
      title: "Development Manager",
      image: "/james.jpg"
    },
    {
      name: "Dfinity Designer",
      title: "Head of Design",
      image: "/dfd.jpg"
    },
    {
      name: "Thilly Thana",
      title: "Lead Developer",
      image: "/thilly.jpg"
    },
    {
      name: "George Robinson",
      title: "Community Manager",
      image: "/george.jpg"
    },
    {
      name: "Josh Wray",
      title: "Head of Promotion",
      image: "/josh.jpg"
    },
    {
      name: "Ashutosh Yadav",
      title: "Media Production Manager",
      image: "/ashutosh.jpg"
    }
  ];
  let selectedOpponent = [];
  let selectedCourse = null;
  let selectedTee = null;
  function isSelected(opponent) {
    return selectedOpponent.some((sel) => sel.name === opponent.name);
  }
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex flex-col w-full"><div class="w-full p-2 px-4 text-black" data-svelte-h="svelte-boyq7t"><h2 class="mt-2 mb-2 text-3xl font-black text-black md:text-5xl condensed">MULLIGANS</h2></div> <div class="w-full p-4 text-black bg-gray-100"><h3 class="mt-0 mb-2 text-3xl font-black text-black md:text-3xl condensed" data-svelte-h="svelte-57ai8l">GAME DETAILS</h3> <label for="course" class="block mt-4 text-lg font-bold text-black" data-svelte-h="svelte-nmz97x">Course</label>  <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md">${validate_component(Select, "Select").$$render(
          $$result,
          {
            id: "course",
            items: courses,
            label: "label",
            placeholder: "Select a Course",
            searchable: true,
            class: "p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override",
            value: selectedCourse
          },
          {
            value: ($$value) => {
              selectedCourse = $$value;
              $$settled = false;
            }
          },
          {
            item: ({ item }) => {
              return `<div class="flex items-center w-12 h-12 p-2 space-x-3"><img${add_attribute("src", item.img, 0)}${add_attribute("alt", item.label, 0)} class="object-cover w-8 h-8 rounded-lg"> <span class="text-black">${escape(item.label)}</span></div>`;
            }
          }
        )}</div>  <button class="flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-black rounded-full shadow-md" style="margin-left: 8px" data-svelte-h="svelte-1wx7xmm">+</button></div> <label for="tee" class="block mt-4 text-lg font-bold text-black" data-svelte-h="svelte-xp2okv">Tee</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md">${validate_component(Select, "Select").$$render(
          $$result,
          {
            id: "tee",
            items: tees,
            label: "label",
            placeholder: "Select a Tee",
            searchable: true,
            class: "p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override",
            value: selectedTee
          },
          {
            value: ($$value) => {
              selectedTee = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div></div>  <div class="mt-4" data-svelte-h="svelte-bc75dv"><label for="date" class="block mb-2 text-lg font-bold text-black">Date</label> <input type="date" id="date" name="date" class="w-full max-w-md p-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></div>  <label for="opponent" class="block mt-4 text-lg font-bold text-black" data-svelte-h="svelte-1up3vre">Opponents</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md">${validate_component(Select, "Select").$$render(
          $$result,
          {
            id: "opponent",
            items: opponents,
            label: "name",
            placeholder: "Select your Opponent(s)",
            multiple: true,
            searchable: true,
            class: "p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override",
            value: selectedOpponent
          },
          {
            value: ($$value) => {
              selectedOpponent = $$value;
              $$settled = false;
            }
          },
          {
            item: ({ item }) => {
              return ` <div class="flex items-center justify-between w-full p-2"><span>${escape(item.name)}</span> ${isSelected(item) ? `${validate_component(Fa, "FaIcon").$$render($$result, { icon: faCheck, class: "text-green-500" }, {}, {})}` : ``}</div>`;
            }
          }
        )}</div></div></div> <button class="btn btn-new-game svelte-hf9p98" data-svelte-h="svelte-1cx9y75">Create New Game</button></div>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Page$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-4"><div class="flex flex-row items-center">${validate_component(Logo_icon, "LogoIcon").$$render($$result, { fill: "#FFFFFF", className: "w-6 mr-2" }, {}, {})} <p class="text-xl" data-svelte-h="svelte-14za60w">Profile Coming Soon</p></div></div>`;
    }
  })}`;
});
const Page$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    Initially we have designed 4 new game formats for golfers to enjoy on our platform, with the DAO deciding on future additions.</p> <p data-svelte-h="svelte-1ip4exd">Our first 4 games will be released in the following order and are described in the following sections:</p> <div class="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2"><div class="w-full md:w-1/4 flex flex-col space-y-2"><img src="mulligans.png" alt="mulligans" class="w-full"> <p class="condensed text-3xl md:text-lg text-center" data-svelte-h="svelte-ka1xdq">MULLIGANS</p> <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs" data-svelte-h="svelte-evty1l">Info</button></div> <div class="w-full md:w-1/4 flex flex-col space-y-2"><img src="bands.png" alt="bands" class="w-full"> <p class="condensed text-3xl md:text-lg text-center" data-svelte-h="svelte-1oh3gak">BANDS</p> <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs" data-svelte-h="svelte-g3ptgv">Info</button></div> <div class="w-full md:w-1/4 flex flex-col space-y-2"><img src="build-it.png" alt="build-it" class="w-full"> <p class="condensed text-3xl md:text-lg text-center" data-svelte-h="svelte-rwep13">BUILD IT</p> <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs" data-svelte-h="svelte-bkkypg">Info</button></div> <div class="w-full md:w-1/4 flex flex-col space-y-2"><img src="next-up.png" alt="next-up" class="w-full"> <p class="condensed text-3xl md:text-lg text-center" data-svelte-h="svelte-eslhli">NEXT UP</p> <button class="bg-GolfPadForest text-GolfPadYellow px-4 py-2 rounded text-xs" data-svelte-h="svelte-10d6a93">Info</button></div></div></div>`;
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
const css = {
  code: ".pip.svelte-1vyt279{width:10px;height:10px;background-color:gray;border-radius:50%;margin:0 2px;cursor:pointer;border:none}.pip.is-active.svelte-1vyt279{--tw-bg-opacity:1;background-color:rgb(45 93 122 / var(--tw-bg-opacity))}@media(min-width: 640px){.pip.svelte-1vyt279{width:12px;height:12px}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Layout from \\"../Layout.svelte\\";\\nimport BlackLogoIcon from \\"$lib/icons/logo-icon.svelte\\";\\nimport Vision from \\"$lib/components/whitepaper/vision.svelte\\";\\nimport Product from \\"$lib/components/whitepaper/product.svelte\\";\\nimport Handicap from \\"$lib/components/whitepaper/handicap.svelte\\";\\nimport DAO from \\"$lib/components/whitepaper/dao.svelte\\";\\nimport Marketing from \\"$lib/components/whitepaper/marketing.svelte\\";\\nimport RoadMap from \\"$lib/components/whitepaper/roadmap.svelte\\";\\nimport Team from \\"$lib/components/whitepaper/team.svelte\\";\\nimport SystemArchitecture from \\"$lib/components/whitepaper/system-architecture.svelte\\";\\nlet activeTab = \\"vision\\";\\nlet cropPositionY = \\"top\\";\\nconst tabs = [\\n    { name: \\"Vision\\", component: Vision },\\n    { name: \\"Product\\", component: Product },\\n    { name: \\"Handicaps\\", component: Handicap },\\n    { name: \\"DAO\\", component: DAO },\\n    { name: \\"Marketing\\", component: Marketing },\\n    { name: \\"Road Map\\", component: RoadMap },\\n    { name: \\"Team\\", component: Team },\\n    { name: \\"System Architecture\\", component: SystemArchitecture },\\n];\\nfunction nextTab() {\\n    const currentIndex = tabs.findIndex(tab => tab.name.toLowerCase() === activeTab);\\n    if (currentIndex < tabs.length - 1) {\\n        activeTab = tabs[currentIndex + 1].name.toLowerCase();\\n    }\\n}\\nfunction prevTab() {\\n    const currentIndex = tabs.findIndex(tab => tab.name.toLowerCase() === activeTab);\\n    if (currentIndex > 0) {\\n        activeTab = tabs[currentIndex - 1].name.toLowerCase();\\n    }\\n}\\nfunction isActiveTab(index) {\\n    return tabs[index].name.toLowerCase() === activeTab;\\n}\\nfunction setActiveTab(index) {\\n    activeTab = tabs[index].name.toLowerCase();\\n}\\n<\/script>\\n\\n<Layout>\\n  <div class=\\"p-2 px-4 text-black h-full w-full\\">\\n    <h2 class=\\"text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed\\">\\n      GOLFPAD WHITEPAPER\\n    </h2>\\n    <div class=\\"w-full flex flex-col md:flex-row\\">\\n      <img \\n        src=\\"hero.png\\" \\n        alt=\\"hero\\" \\n        class=\\"w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg\\" \\n        style=\\"--crop-position-y: {cropPositionY};\\"\\n      />\\n\\n      <div class=\\"w-full md:w-3/4 px-2 mt-4 md:mt-0\\">\\n        {#each tabs as { name, component }, index}\\n          {#if activeTab === name.toLowerCase()}\\n            <div class=\\"flex flex-col\\">\\n              <div class=\\"flex\\">\\n                <svelte:component this={component} />\\n              </div>\\n\\n              <div class=\\"flex flex-col text-xs mt-8\\">\\n                <div class=\\"flex flex-row space-x-2\\">\\n                  <button\\n                    class=\\"w-1/2 py-2 px-4 rounded bg-GolfPadYellow text-black disabled:bg-GolfPadDarkGreen disabled:text-white\\"\\n                    on:click={prevTab}\\n                    disabled={tabs.findIndex(tab => tab.name.toLowerCase() === activeTab) === 0}\\n                  >\\n                    Previous Section\\n                  </button>\\n                  <button\\n                    class=\\"w-1/2 py-2 px-4 rounded bg-GolfPadYellow text-black disabled:bg-GolfPadDarkGreen disabled:text-white\\"\\n                    on:click={nextTab}\\n                    disabled={tabs.findIndex(tab => tab.name.toLowerCase() === activeTab) === tabs.length - 1}\\n                  >\\n                    Next Section\\n                  </button>\\n                </div>\\n                <div class=\\"flex flex-row justify-center my-4\\">\\n                  {#each tabs as _, index}\\n                    <button \\n                      class=\\"pip\\" \\n                      class:is-active={isActiveTab(index)} \\n                      on:click={() => setActiveTab(index)}\\n                      aria-label={`Go to ${tabs[index].name} section`}\\n                    ></button>\\n                  {/each}\\n                </div>\\n              </div>\\n            </div>\\n          {/if}\\n        {/each}\\n      </div>\\n    </div>\\n  </div>\\n</Layout>\\n\\n<style>\\n  .pip {\\n    width: 10px;\\n    height: 10px;\\n    background-color: gray;\\n    border-radius: 50%;\\n    margin: 0 2px;\\n    cursor: pointer;\\n    border: none;\\n  }\\n  \\n  .pip.is-active {\\n    --tw-bg-opacity: 1;\\n    background-color: rgb(45 93 122 / var(--tw-bg-opacity));\\n}\\n\\n  @media (min-width: 640px) {\\n    .pip {\\n      width: 12px;\\n      height: 12px;\\n    }\\n  }</style>\\n"],"names":[],"mappings":"AAoGE,mBAAK,CACH,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,CACtB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,CAAC,CAAC,GAAG,CACb,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IACV,CAEA,IAAI,yBAAW,CACb,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAC1D,CAEE,MAAO,YAAY,KAAK,CAAE,CACxB,mBAAK,CACH,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACF"}'
};
let cropPositionY = "top";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  $$result.css.add(css);
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-2 px-4 text-black h-full w-full"><h2 class="text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed" data-svelte-h="svelte-1bllkzs">GOLFPAD WHITEPAPER</h2> <div class="w-full flex flex-col md:flex-row"><img src="hero.png" alt="hero" class="w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg" style="${"--crop-position-y: " + escape(cropPositionY, true) + ";"}"> <div class="w-full md:w-3/4 px-2 mt-4 md:mt-0">${each(tabs, ({ name, component }, index) => {
        return `${activeTab === name.toLowerCase() ? `<div class="flex flex-col"><div class="flex">${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> <div class="flex flex-col text-xs mt-8"><div class="flex flex-row space-x-2"><button class="w-1/2 py-2 px-4 rounded bg-GolfPadYellow text-black disabled:bg-GolfPadDarkGreen disabled:text-white" ${tabs.findIndex((tab) => tab.name.toLowerCase() === activeTab) === 0 ? "disabled" : ""}>Previous Section</button> <button class="w-1/2 py-2 px-4 rounded bg-GolfPadYellow text-black disabled:bg-GolfPadDarkGreen disabled:text-white" ${tabs.findIndex((tab) => tab.name.toLowerCase() === activeTab) === tabs.length - 1 ? "disabled" : ""}>Next Section
                  </button></div> <div class="flex flex-row justify-center my-4">${each(tabs, (_, index2) => {
          return `<button class="${["pip svelte-1vyt279", isActiveTab(index2) ? "is-active" : ""].join(" ").trim()}"${add_attribute("aria-label", `Go to ${tabs[index2].name} section`, 0)}></button>`;
        })} </div></div> </div>` : ``}`;
      })}</div></div></div>`;
    }
  })}`;
});
export {
  Error$1 as E,
  Layout$1 as L,
  Page$6 as P,
  Server as S,
  set_building as a,
  set_manifest as b,
  set_prerendering as c,
  set_private_env as d,
  set_public_env as e,
  set_read_implementation as f,
  get_hooks as g,
  set_safe_public_env as h,
  Page$5 as i,
  Page$4 as j,
  Page$3 as k,
  Page$2 as l,
  Page$1 as m,
  Page as n,
  options as o,
  set_assets as s
};

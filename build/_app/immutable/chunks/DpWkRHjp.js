import { s as y, g as _ } from "./uWWjYOZy.js";
import {
  ap as E,
  aq as w,
  a0 as h,
  J as S,
  a1 as P,
  B as k,
} from "./CxN_vpku.js";
let b = !1,
  m = Symbol();
function $(e, t, r) {
  const n = r[t] ?? (r[t] = { store: null, source: S(void 0), unsubscribe: h });
  if (n.store !== e && !(m in r))
    if ((n.unsubscribe(), (n.store = e ?? null), e == null))
      (n.source.v = void 0), (n.unsubscribe = h);
    else {
      var u = !0;
      (n.unsubscribe = y(e, (l) => {
        u ? (n.source.v = l) : P(n.source, l);
      })),
        (u = !1);
    }
  return e && m in r ? _(e) : k(n.source);
}
function q(e, t) {
  return e.set(t), t;
}
function C() {
  const e = {};
  function t() {
    E(() => {
      for (var r in e) e[r].unsubscribe();
      w(e, m, { enumerable: !1, value: !0 });
    });
  }
  return [e, t];
}
function A(e) {
  var t = b;
  try {
    return (b = !1), [e(), b];
  } finally {
    b = t;
  }
}
const N = "modulepreload",
  R = function (e, t) {
    return new URL(e, t).href;
  },
  v = {},
  M = function (t, r, n) {
    let u = Promise.resolve();
    if (r && r.length > 0) {
      const c = document.getElementsByTagName("link"),
        s = document.querySelector("meta[property=csp-nonce]"),
        p = s?.nonce || s?.getAttribute("nonce");
      u = Promise.allSettled(
        r.map((o) => {
          if (((o = R(o, n)), o in v)) return;
          v[o] = !0;
          const a = o.endsWith(".css"),
            g = a ? '[rel="stylesheet"]' : "";
          if (!!n)
            for (let f = c.length - 1; f >= 0; f--) {
              const d = c[f];
              if (d.href === o && (!a || d.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${o}"]${g}`)) return;
          const i = document.createElement("link");
          if (
            ((i.rel = a ? "stylesheet" : N),
            a || (i.as = "script"),
            (i.crossOrigin = ""),
            (i.href = o),
            p && i.setAttribute("nonce", p),
            document.head.appendChild(i),
            a)
          )
            return new Promise((f, d) => {
              i.addEventListener("load", f),
                i.addEventListener("error", () =>
                  d(new Error(`Unable to preload CSS for ${o}`)),
                );
            });
        }),
      );
    }
    function l(c) {
      const s = new Event("vite:preloadError", { cancelable: !0 });
      if (((s.payload = c), window.dispatchEvent(s), !s.defaultPrevented))
        throw c;
    }
    return u.then((c) => {
      for (const s of c || []) s.status === "rejected" && l(s.reason);
      return t().catch(l);
    });
  };
export { M as _, $ as a, q as b, A as c, C as s };

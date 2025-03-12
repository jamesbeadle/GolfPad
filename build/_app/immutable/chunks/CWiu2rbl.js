import {
  S as A,
  a3 as q,
  a4 as M,
  K as o,
  a5 as Y,
  B as b,
  U as v,
  a1 as g,
  a6 as D,
  F as C,
  a7 as G,
  l as K,
  G as j,
  a8 as Z,
  C as $,
  a9 as z,
  aa as F,
  ab as J,
  ac as T,
  ad as V,
  u as B,
  ae as H,
  af as Q,
  ag as W,
  J as X,
  ah as k,
  ai as p,
} from "./CxN_vpku.js";
import { c as ee } from "./DpWkRHjp.js";
function R(t, d = null, S) {
  if (typeof t != "object" || t === null || A in t) return t;
  const P = K(t);
  if (P !== q && P !== M) return t;
  var f = new Map(),
    l = j(t),
    y = o(0);
  l && f.set("length", o(t.length));
  var m;
  return new Proxy(t, {
    defineProperty(i, e, r) {
      (!("value" in r) ||
        r.configurable === !1 ||
        r.enumerable === !1 ||
        r.writable === !1) &&
        G();
      var a = f.get(e);
      return (
        a === void 0 ? ((a = o(r.value)), f.set(e, a)) : g(a, R(r.value, m)), !0
      );
    },
    deleteProperty(i, e) {
      var r = f.get(e);
      if (r === void 0) e in i && f.set(e, o(v));
      else {
        if (l && typeof e == "string") {
          var a = f.get("length"),
            n = Number(e);
          Number.isInteger(n) && n < a.v && g(a, n);
        }
        g(r, v), U(y);
      }
      return !0;
    },
    get(i, e, r) {
      if (e === A) return t;
      var a = f.get(e),
        n = e in i;
      if (
        (a === void 0 &&
          (!n || D(i, e)?.writable) &&
          ((a = o(R(n ? i[e] : v, m))), f.set(e, a)),
        a !== void 0)
      ) {
        var s = b(a);
        return s === v ? void 0 : s;
      }
      return Reflect.get(i, e, r);
    },
    getOwnPropertyDescriptor(i, e) {
      var r = Reflect.getOwnPropertyDescriptor(i, e);
      if (r && "value" in r) {
        var a = f.get(e);
        a && (r.value = b(a));
      } else if (r === void 0) {
        var n = f.get(e),
          s = n?.v;
        if (n !== void 0 && s !== v)
          return { enumerable: !0, configurable: !0, value: s, writable: !0 };
      }
      return r;
    },
    has(i, e) {
      if (e === A) return !0;
      var r = f.get(e),
        a = (r !== void 0 && r.v !== v) || Reflect.has(i, e);
      if (r !== void 0 || (C !== null && (!a || D(i, e)?.writable))) {
        r === void 0 && ((r = o(a ? R(i[e], m) : v)), f.set(e, r));
        var n = b(r);
        if (n === v) return !1;
      }
      return a;
    },
    set(i, e, r, a) {
      var n = f.get(e),
        s = e in i;
      if (l && e === "length")
        for (var _ = r; _ < n.v; _ += 1) {
          var I = f.get(_ + "");
          I !== void 0 ? g(I, v) : _ in i && ((I = o(v)), f.set(_ + "", I));
        }
      n === void 0
        ? (!s || D(i, e)?.writable) &&
          ((n = o(void 0)), g(n, R(r, m)), f.set(e, n))
        : ((s = n.v !== v), g(n, R(r, m)));
      var c = Reflect.getOwnPropertyDescriptor(i, e);
      if ((c?.set && c.set.call(a, r), !s)) {
        if (l && typeof e == "string") {
          var h = f.get("length"),
            O = Number(e);
          Number.isInteger(O) && O >= h.v && g(h, O + 1);
        }
        U(y);
      }
      return !0;
    },
    ownKeys(i) {
      b(y);
      var e = Reflect.ownKeys(i).filter((n) => {
        var s = f.get(n);
        return s === void 0 || s.v !== v;
      });
      for (var [r, a] of f) a.v !== v && !(r in i) && e.push(r);
      return e;
    },
    setPrototypeOf() {
      Y();
    },
  });
}
function U(t, d = 1) {
  g(t, t.v + d);
}
function ne(t, d, S, P) {
  var f = (S & p) !== 0,
    l = !F || (S & J) !== 0,
    y = (S & V) !== 0,
    m = (S & k) !== 0,
    i = !1,
    e;
  y ? ([e, i] = ee(() => t[d])) : (e = t[d]);
  var r = A in t || z in t,
    a = (y && (D(t, d)?.set ?? (r && d in t && ((u) => (t[d] = u))))) || void 0,
    n = P,
    s = !0,
    _ = !1,
    I = () => ((_ = !0), s && ((s = !1), m ? (n = B(P)) : (n = P)), n);
  e === void 0 && P !== void 0 && (a && l && H(), (e = I()), a && a(e));
  var c;
  if (l)
    c = () => {
      var u = t[d];
      return u === void 0 ? I() : ((s = !0), (_ = !1), u);
    };
  else {
    var h = (f ? T : $)(() => t[d]);
    (h.f |= Z),
      (c = () => {
        var u = b(h);
        return u !== void 0 && (n = void 0), u === void 0 ? n : u;
      });
  }
  if (!(S & Q)) return c;
  if (a) {
    var O = t.$$legacy;
    return function (u, w) {
      return arguments.length > 0
        ? ((!l || !w || O || i) && a(w ? c() : u), u)
        : c();
    };
  }
  var N = !1,
    L = X(e),
    E = T(() => {
      var u = c(),
        w = b(L);
      return N ? ((N = !1), w) : (L.v = u);
    });
  return (
    f || (E.equals = W),
    function (u, w) {
      if (arguments.length > 0) {
        const x = w ? b(E) : l && y ? R(u) : u;
        return (
          E.equals(x) ||
            ((N = !0), g(L, x), _ && n !== void 0 && (n = x), B(() => b(E))),
          u
        );
      }
      return b(E);
    }
  );
}
export { R as a, ne as p };

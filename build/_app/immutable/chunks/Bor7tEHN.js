import {
  S as E,
  a6 as M,
  a7 as U,
  F as o,
  a8 as Y,
  w as b,
  $ as v,
  a1 as g,
  a9 as A,
  B as j,
  aa as C,
  l as $,
  C as z,
  ab as G,
  z as K,
  ac as Z,
  ad as F,
  ae as V,
  af as T,
  ag as H,
  u as B,
  ah as J,
  ai as Q,
  aj as W,
  D as X,
  ak as k,
  al as p,
} from "./-IhJ7JpO.js";
import { c as ee } from "./AAG3YkeP.js";
function R(t, d = null, w) {
  if (typeof t != "object" || t === null || E in t) return t;
  const P = $(t);
  if (P !== M && P !== U) return t;
  var f = new Map(),
    l = z(t),
    y = o(0);
  l && f.set("length", o(t.length));
  var m;
  return new Proxy(t, {
    defineProperty(i, e, r) {
      (!("value" in r) ||
        r.configurable === !1 ||
        r.enumerable === !1 ||
        r.writable === !1) &&
        C();
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
        g(r, v), q(y);
      }
      return !0;
    },
    get(i, e, r) {
      if (e === E) return t;
      var a = f.get(e),
        n = e in i;
      if (
        (a === void 0 &&
          (!n || A(i, e)?.writable) &&
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
      if (e === E) return !0;
      var r = f.get(e),
        a = (r !== void 0 && r.v !== v) || Reflect.has(i, e);
      if (r !== void 0 || (j !== null && (!a || A(i, e)?.writable))) {
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
        ? (!s || A(i, e)?.writable) &&
          ((n = o(void 0)), g(n, R(r, m)), f.set(e, n))
        : ((s = n.v !== v), g(n, R(r, m)));
      var c = Reflect.getOwnPropertyDescriptor(i, e);
      if ((c?.set && c.set.call(a, r), !s)) {
        if (l && typeof e == "string") {
          var h = f.get("length"),
            O = Number(e);
          Number.isInteger(O) && O >= h.v && g(h, O + 1);
        }
        q(y);
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
function q(t, d = 1) {
  g(t, t.v + d);
}
function ne(t, d, w, P) {
  var f = (w & p) !== 0,
    l = !F || (w & V) !== 0,
    y = (w & H) !== 0,
    m = (w & k) !== 0,
    i = !1,
    e;
  y ? ([e, i] = ee(() => t[d])) : (e = t[d]);
  var r = E in t || Z in t,
    a = (y && (A(t, d)?.set ?? (r && d in t && ((u) => (t[d] = u))))) || void 0,
    n = P,
    s = !0,
    _ = !1,
    I = () => ((_ = !0), s && ((s = !1), m ? (n = B(P)) : (n = P)), n);
  e === void 0 && P !== void 0 && (a && l && J(), (e = I()), a && a(e));
  var c;
  if (l)
    c = () => {
      var u = t[d];
      return u === void 0 ? I() : ((s = !0), (_ = !1), u);
    };
  else {
    var h = (f ? T : K)(() => t[d]);
    (h.f |= G),
      (c = () => {
        var u = b(h);
        return u !== void 0 && (n = void 0), u === void 0 ? n : u;
      });
  }
  if (!(w & Q)) return c;
  if (a) {
    var O = t.$$legacy;
    return function (u, S) {
      return arguments.length > 0
        ? ((!l || !S || O || i) && a(S ? c() : u), u)
        : c();
    };
  }
  var N = !1,
    L = X(e),
    D = T(() => {
      var u = c(),
        S = b(L);
      return N ? ((N = !1), S) : (L.v = u);
    });
  return (
    f || (D.equals = W),
    function (u, S) {
      if (arguments.length > 0) {
        const x = S ? b(D) : l && y ? R(u) : u;
        return (
          D.equals(x) ||
            ((N = !0), g(L, x), _ && n !== void 0 && (n = x), B(() => b(D))),
          u
        );
      }
      return b(D);
    }
  );
}
export { R as a, ne as p };

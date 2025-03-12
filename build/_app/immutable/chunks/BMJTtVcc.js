import {
  aj as p,
  X as S,
  H,
  Z as I,
  ak as m,
  y as l,
  x as R,
  d as L,
  k as f,
  Y as O,
  al as V,
  am as Y,
  P as k,
  D as P,
  an as j,
  A as C,
  i as M,
  p as $,
  ao as F,
  h as g,
  F as W,
  a as X,
} from "./CxN_vpku.js";
import { b as Z, r as A, h as c, c as q } from "./BweNXA1K.js";
import { b as z } from "./CfcDVdrG.js";
const B = ["touchstart", "touchmove"];
function G(t) {
  return B.includes(t);
}
let N = !0;
function x(t, e) {
  var r = e == null ? "" : typeof e == "object" ? e + "" : e;
  r !== (t.__t ?? (t.__t = t.nodeValue)) &&
    ((t.__t = r), (t.nodeValue = r + ""));
}
function J(t, e) {
  return b(t, e);
}
function ee(t, e) {
  p(), (e.intro = e.intro ?? !1);
  const r = e.target,
    u = g,
    _ = f;
  try {
    for (var a = S(r); a && (a.nodeType !== 8 || a.data !== H); ) a = I(a);
    if (!a) throw m;
    l(!0), R(a), L();
    const d = b(t, { ...e, anchor: a });
    if (f === null || f.nodeType !== 8 || f.data !== O) throw (V(), m);
    return l(!1), d;
  } catch (d) {
    if (d === m) return e.recover === !1 && Y(), p(), k(r), l(!1), J(t, e);
    throw d;
  } finally {
    l(u), R(_), q();
  }
}
const i = new Map();
function b(
  t,
  { target: e, anchor: r, props: u = {}, events: _, context: a, intro: d = !0 },
) {
  p();
  var h = new Set(),
    v = (o) => {
      for (var s = 0; s < o.length; s++) {
        var n = o[s];
        if (!h.has(n)) {
          h.add(n);
          var w = G(n);
          e.addEventListener(n, c, { passive: w });
          var T = i.get(n);
          T === void 0
            ? (document.addEventListener(n, c, { passive: w }), i.set(n, 1))
            : i.set(n, T + 1);
        }
      }
    };
  v(P(Z)), A.add(v);
  var y = void 0,
    D = j(() => {
      var o = r ?? e.appendChild(C());
      return (
        M(() => {
          if (a) {
            $({});
            var s = F;
            s.c = a;
          }
          _ && (u.$$events = _),
            g && z(o, null),
            (N = d),
            (y = t(o, u) || {}),
            (N = !0),
            g && (W.nodes_end = f),
            a && X();
        }),
        () => {
          for (var s of h) {
            e.removeEventListener(s, c);
            var n = i.get(s);
            --n === 0
              ? (document.removeEventListener(s, c), i.delete(s))
              : i.set(s, n);
          }
          A.delete(v), o !== r && o.parentNode?.removeChild(o);
        }
      );
    });
  return E.set(y, D), y;
}
let E = new WeakMap();
function te(t, e) {
  const r = E.get(t);
  return r ? (E.delete(t), r(e)) : Promise.resolve();
}
export { N as a, ee as h, J as m, x as s, te as u };

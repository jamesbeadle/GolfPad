import {
  ax as c,
  ay as f,
  az as k,
  F as A,
  ap as F,
  q as H,
  aq as O,
  G as P,
  A as B,
  g as C,
  aA as N,
  h as v,
  H as R,
  Z as w,
  y as b,
  x as E,
  k as T,
  X as W,
} from "./CxN_vpku.js";
let x = !1;
function z() {
  x ||
    ((x = !0),
    document.addEventListener(
      "reset",
      (e) => {
        Promise.resolve().then(() => {
          if (!e.defaultPrevented)
            for (const t of e.target.elements) t.__on_r?.();
        });
      },
      { capture: !0 },
    ));
}
function L(e) {
  var t = k,
    i = A;
  c(null), f(null);
  try {
    return e();
  } finally {
    c(t), f(i);
  }
}
function X(e, t, i, r = i) {
  e.addEventListener(t, () => L(i));
  const n = e.__on_r;
  n
    ? (e.__on_r = () => {
        n(), r(!0);
      })
    : (e.__on_r = () => r(!0)),
    z();
}
const Y = new Set(),
  Z = new Set();
function G(e, t, i, r = {}) {
  function n(a) {
    if ((r.capture || I.call(t, a), !a.cancelBubble))
      return L(() => i?.call(this, a));
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? H(() => {
          t.addEventListener(e, n, r);
        })
      : t.addEventListener(e, n, r),
    n
  );
}
function j(e, t, i, r, n) {
  var a = { capture: r, passive: n },
    o = G(e, t, i, a);
  (t === document.body || t === window || t === document) &&
    F(() => {
      t.removeEventListener(e, o, a);
    });
}
function I(e) {
  var t = this,
    i = t.ownerDocument,
    r = e.type,
    n = e.composedPath?.() || [],
    a = n[0] || e.target,
    o = 0,
    p = e.__root;
  if (p) {
    var d = n.indexOf(p);
    if (d !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var y = n.indexOf(t);
    if (y === -1) return;
    d <= y && (o = d);
  }
  if (((a = n[o] || e.target), a !== t)) {
    O(e, "currentTarget", {
      configurable: !0,
      get() {
        return a || i;
      },
    });
    var q = k,
      S = A;
    c(null), f(null);
    try {
      for (var l, g = []; a !== null; ) {
        var h = a.assignedSlot || a.parentNode || a.host || null;
        try {
          var u = a["__" + r];
          if (u != null && (!a.disabled || e.target === a))
            if (P(u)) {
              var [m, ...D] = u;
              m.apply(a, [e, ...D]);
            } else u.call(a, e);
        } catch (_) {
          l ? g.push(_) : (l = _);
        }
        if (e.cancelBubble || h === t || h === null) break;
        a = h;
      }
      if (l) {
        for (let _ of g)
          queueMicrotask(() => {
            throw _;
          });
        throw l;
      }
    } finally {
      (e.__root = t), delete e.currentTarget, c(q), f(S);
    }
  }
}
let s;
function J() {
  s = void 0;
}
function K(e) {
  let t = null,
    i = v;
  var r;
  if (v) {
    for (
      t = T, s === void 0 && (s = W(document.head));
      s !== null && (s.nodeType !== 8 || s.data !== R);

    )
      s = w(s);
    s === null ? b(!1) : (s = E(w(s)));
  }
  v || (r = document.head.appendChild(B()));
  try {
    C(() => e(r), N);
  } finally {
    i && (b(!0), (s = T), E(t));
  }
}
export {
  z as a,
  Y as b,
  J as c,
  K as d,
  j as e,
  I as h,
  X as l,
  Z as r,
  L as w,
};

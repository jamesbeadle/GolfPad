import {
  A as U,
  g as W,
  B as L,
  z,
  i as F,
  j as Z,
  x as M,
  C as $,
  I as S,
  D as G,
  F as q,
  G as j,
  J as ee,
  K as V,
  h as C,
  M as Y,
  O as ae,
  P as re,
  Q as ne,
  R as b,
  T as y,
  V as ie,
  W as fe,
  X as le,
  d as se,
  v as ue,
  w as B,
  y as k,
  k as R,
  Y as te,
  Z as ve,
  _ as J,
  q as de,
  $ as _e,
} from "./CxN_vpku.js";
function pe(l, e) {
  return e;
}
function oe(l, e, a, u) {
  for (var v = [], _ = e.length, t = 0; t < _; t++) ae(e[t].e, v, !0);
  var o = _ > 0 && v.length === 0 && a !== null;
  if (o) {
    var A = a.parentNode;
    re(A), A.append(a), u.clear(), m(l, e[0].prev, e[_ - 1].next);
  }
  ne(v, () => {
    for (var h = 0; h < _; h++) {
      var d = e[h];
      o || (u.delete(d.k), m(l, d.prev, d.next)), fe(d.e, !o);
    }
  });
}
function Ae(l, e, a, u, v, _ = null) {
  var t = l,
    o = { flags: e, items: new Map(), first: null },
    A = (e & J) !== 0;
  if (A) {
    var h = l;
    t = C ? M(le(h)) : h.appendChild(U());
  }
  C && se();
  var d = null,
    w = !1,
    i = $(() => {
      var s = a();
      return j(s) ? s : s == null ? [] : G(s);
    });
  W(() => {
    var s = L(i),
      r = s.length;
    if (w && r === 0) return;
    w = r === 0;
    let I = !1;
    if (C) {
      var E = t.data === ue;
      E !== (r === 0) && ((t = B()), M(t), k(!1), (I = !0));
    }
    if (C) {
      for (var p = null, T, c = 0; c < r; c++) {
        if (R.nodeType === 8 && R.data === te) {
          (t = R), (I = !0), k(!1);
          break;
        }
        var n = s[c],
          f = u(n, c);
        (T = K(R, o, p, null, n, f, c, v, e, a)), o.items.set(f, T), (p = T);
      }
      r > 0 && M(B());
    }
    C || ce(s, o, t, v, e, u, a),
      _ !== null &&
        (r === 0
          ? d
            ? z(d)
            : (d = F(() => _(t)))
          : d !== null &&
            Z(d, () => {
              d = null;
            })),
      I && k(!0),
      L(i);
  }),
    C && (t = R);
}
function ce(l, e, a, u, v, _, t) {
  var o = (v & _e) !== 0,
    A = (v & (y | b)) !== 0,
    h = l.length,
    d = e.items,
    w = e.first,
    i = w,
    s,
    r = null,
    I,
    E = [],
    p = [],
    T,
    c,
    n,
    f;
  if (o)
    for (f = 0; f < h; f += 1)
      (T = l[f]),
        (c = _(T, f)),
        (n = d.get(c)),
        n !== void 0 && (n.a?.measure(), (I ?? (I = new Set())).add(n));
  for (f = 0; f < h; f += 1) {
    if (((T = l[f]), (c = _(T, f)), (n = d.get(c)), n === void 0)) {
      var P = i ? i.e.nodes_start : a;
      (r = K(P, e, r, r === null ? e.first : r.next, T, c, f, u, v, t)),
        d.set(c, r),
        (E = []),
        (p = []),
        (i = r.next);
      continue;
    }
    if (
      (A && he(n, T, f, v),
      n.e.f & S &&
        (z(n.e), o && (n.a?.unfix(), (I ?? (I = new Set())).delete(n))),
      n !== i)
    ) {
      if (s !== void 0 && s.has(n)) {
        if (E.length < p.length) {
          var g = p[0],
            x;
          r = g.prev;
          var O = E[0],
            D = E[E.length - 1];
          for (x = 0; x < E.length; x += 1) X(E[x], g, a);
          for (x = 0; x < p.length; x += 1) s.delete(p[x]);
          m(e, O.prev, D.next),
            m(e, r, O),
            m(e, D, g),
            (i = g),
            (r = D),
            (f -= 1),
            (E = []),
            (p = []);
        } else
          s.delete(n),
            X(n, i, a),
            m(e, n.prev, n.next),
            m(e, n, r === null ? e.first : r.next),
            m(e, r, n),
            (r = n);
        continue;
      }
      for (E = [], p = []; i !== null && i.k !== c; )
        i.e.f & S || (s ?? (s = new Set())).add(i), p.push(i), (i = i.next);
      if (i === null) continue;
      n = i;
    }
    E.push(n), (r = n), (i = n.next);
  }
  if (i !== null || s !== void 0) {
    for (var N = s === void 0 ? [] : G(s); i !== null; )
      i.e.f & S || N.push(i), (i = i.next);
    var H = N.length;
    if (H > 0) {
      var Q = v & J && h === 0 ? a : null;
      if (o) {
        for (f = 0; f < H; f += 1) N[f].a?.measure();
        for (f = 0; f < H; f += 1) N[f].a?.fix();
      }
      oe(e, N, Q, d);
    }
  }
  o &&
    de(() => {
      if (I !== void 0) for (n of I) n.a?.apply();
    }),
    (q.first = e.first && e.first.e),
    (q.last = r && r.e);
}
function he(l, e, a, u) {
  u & y && Y(l.v, e), u & b ? Y(l.i, a) : (l.i = a);
}
function K(l, e, a, u, v, _, t, o, A, h) {
  var d = (A & y) !== 0,
    w = (A & ie) === 0,
    i = d ? (w ? ee(v) : V(v)) : v,
    s = A & b ? V(t) : t,
    r = { i: s, v: i, k: _, a: null, e: null, prev: a, next: u };
  try {
    return (
      (r.e = F(() => o(l, i, s, h), C)),
      (r.e.prev = a && a.e),
      (r.e.next = u && u.e),
      a === null ? (e.first = r) : ((a.next = r), (a.e.next = r.e)),
      u !== null && ((u.prev = r), (u.e.prev = r.e)),
      r
    );
  } finally {
  }
}
function X(l, e, a) {
  for (
    var u = l.next ? l.next.e.nodes_start : a,
      v = e ? e.e.nodes_start : a,
      _ = l.e.nodes_start;
    _ !== u;

  ) {
    var t = ve(_);
    v.before(_), (_ = t);
  }
}
function m(l, e, a) {
  e === null ? (l.first = a) : ((e.next = a), (e.e.next = a && a.e)),
    a !== null && ((a.prev = e), (a.e.prev = e && e.e));
}
export { Ae as e, pe as i };

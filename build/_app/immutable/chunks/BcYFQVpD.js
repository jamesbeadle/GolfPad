var xi = Object.defineProperty;
var bs = (e) => {
  throw TypeError(e);
};
var ki = (e, t, r) =>
  t in e
    ? xi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r);
var Dr = (e, t, r) => ki(e, typeof t != "symbol" ? t + "" : t, r),
  ys = (e, t, r) => t.has(e) || bs("Cannot " + r);
var re = (e, t, r) => (
    ys(e, t, "read from private field"), r ? r.call(e) : t.get(e)
  ),
  lt = (e, t, r) =>
    t.has(e)
      ? bs("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, r),
  dn = (e, t, r, a) => (
    ys(e, t, "write to private field"), a ? a.call(e, r) : t.set(e, r), r
  );
import {
  D as _s,
  c as Ei,
  u as Ai,
  B as Si,
  A as Ti,
  b as ws,
  H as kn,
  a as to,
} from "./BC2jkFNy.js";
var La = Array.isArray,
  Ii = Array.prototype.indexOf,
  Gn = Array.from,
  jn = Object.defineProperty,
  lr = Object.getOwnPropertyDescriptor,
  ro = Object.getOwnPropertyDescriptors,
  Ci = Object.prototype,
  Pi = Array.prototype,
  Dn = Object.getPrototypeOf;
function Oi(e) {
  return typeof e == "function";
}
const nt = () => {};
function Ri(e) {
  return typeof e?.then == "function";
}
function Ni(e) {
  return e();
}
function zr(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
const St = 2,
  ao = 4,
  Va = 8,
  Ha = 16,
  Ht = 32,
  fa = 64,
  Ea = 128,
  gt = 256,
  Aa = 512,
  Qe = 1024,
  qt = 2048,
  vr = 4096,
  Ft = 8192,
  qa = 16384,
  no = 32768,
  Ir = 65536,
  Bi = 1 << 17,
  Gi = 1 << 19,
  so = 1 << 20,
  cr = Symbol("$state"),
  oo = Symbol("legacy props"),
  ji = Symbol("");
function io(e) {
  return e === this.v;
}
function lo(e, t) {
  return e != e
    ? t == t
    : e !== t || (e !== null && typeof e == "object") || typeof e == "function";
}
function Un(e) {
  return !lo(e, this.v);
}
function Di(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Ui() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function $i(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Mi() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Fi() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Li(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Vi() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Hi() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function qi() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function Yi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let Cr = !1,
  Wi = !1;
function zi() {
  Cr = !0;
}
const $n = 1,
  Mn = 2,
  co = 4,
  Ki = 8,
  Xi = 16,
  Ji = 1,
  Qi = 2,
  Zi = 4,
  el = 8,
  tl = 16,
  rl = 1,
  al = 2,
  nl = 4,
  sl = 1,
  ol = 2,
  uo = "[",
  Fn = "[!",
  Ln = "]",
  Lr = {},
  Ke = Symbol();
function Vn(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Hn(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let fe = null;
function Sa(e) {
  fe = e;
}
function me(e, t = !1, r) {
  (fe = { p: fe, c: null, e: null, m: !1, s: e, x: null, l: null }),
    Cr && !t && (fe.l = { s: null, u: null, r1: [], r2: et(!1) });
}
function be(e) {
  const t = fe;
  if (t !== null) {
    e !== void 0 && (t.x = e);
    const o = t.e;
    if (o !== null) {
      var r = se,
        a = ce;
      t.e = null;
      try {
        for (var n = 0; n < o.length; n++) {
          var s = o[n];
          _t(s.effect), yt(s.reaction), Ya(s.fn);
        }
      } finally {
        _t(r), yt(a);
      }
    }
    (fe = t.p), (t.m = !0);
  }
  return e || {};
}
function Pr() {
  return !Cr || (fe !== null && fe.l === null);
}
function et(e, t) {
  var r = { f: 0, v: e, reactions: null, equals: io, rv: 0, wv: 0 };
  return r;
}
function ut(e) {
  return fo(et(e));
}
function ur(e, t = !1) {
  var a;
  const r = et(e);
  return (
    t || (r.equals = Un),
    Cr && fe !== null && fe.l !== null && ((a = fe.l).s ?? (a.s = [])).push(r),
    r
  );
}
function G(e, t = !1) {
  return fo(ur(e, t));
}
function fo(e) {
  return (
    ce !== null && !Et && ce.f & St && (Ot === null ? pl([e]) : Ot.push(e)), e
  );
}
function vt(e, t) {
  return (
    T(
      e,
      wt(() => i(e)),
    ),
    t
  );
}
function T(e, t) {
  return (
    ce !== null &&
      !Et &&
      Pr() &&
      ce.f & (St | Ha) &&
      (Ot === null || !Ot.includes(e)) &&
      Yi(),
    wr(e, t)
  );
}
function wr(e, t) {
  return (
    e.equals(t) ||
      (e.v,
      (e.v = t),
      (e.wv = Po()),
      vo(e, qt),
      Pr() &&
        se !== null &&
        se.f & Qe &&
        !(se.f & (Ht | fa)) &&
        (jt === null ? hl([e]) : jt.push(e))),
    t
  );
}
function vo(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var a = Pr(), n = r.length, s = 0; s < n; s++) {
      var o = r[s],
        l = o.f;
      l & qt ||
        (!a && o === se) ||
        (Tt(o, t), l & (Qe | gt) && (l & St ? vo(o, vr) : Ka(o)));
    }
}
let Q = !1;
function Mt(e) {
  Q = e;
}
let ae;
function mt(e) {
  if (e === null) throw (Vn(), Lr);
  return (ae = e);
}
function pr() {
  return mt(Yt(ae));
}
function f(e) {
  if (Q) {
    if (Yt(ae) !== null) throw (Vn(), Lr);
    ae = e;
  }
}
function we(e = 1) {
  if (Q) {
    for (var t = e, r = ae; t--; ) r = Yt(r);
    ae = r;
  }
}
function En() {
  for (var e = 0, t = ae; ; ) {
    if (t.nodeType === 8) {
      var r = t.data;
      if (r === Ln) {
        if (e === 0) return t;
        e -= 1;
      } else (r === uo || r === Fn) && (e += 1);
    }
    var a = Yt(t);
    t.remove(), (t = a);
  }
}
function or(e, t = null, r) {
  if (typeof e != "object" || e === null || cr in e) return e;
  const a = Dn(e);
  if (a !== Ci && a !== Pi) return e;
  var n = new Map(),
    s = La(e),
    o = et(0);
  s && n.set("length", et(e.length));
  var l;
  return new Proxy(e, {
    defineProperty(u, c, p) {
      (!("value" in p) ||
        p.configurable === !1 ||
        p.enumerable === !1 ||
        p.writable === !1) &&
        Vi();
      var g = n.get(c);
      return (
        g === void 0 ? ((g = et(p.value)), n.set(c, g)) : T(g, or(p.value, l)),
        !0
      );
    },
    deleteProperty(u, c) {
      var p = n.get(c);
      if (p === void 0) c in u && n.set(c, et(Ke));
      else {
        if (s && typeof c == "string") {
          var g = n.get("length"),
            d = Number(c);
          Number.isInteger(d) && d < g.v && T(g, d);
        }
        T(p, Ke), xs(o);
      }
      return !0;
    },
    get(u, c, p) {
      if (c === cr) return e;
      var g = n.get(c),
        d = c in u;
      if (
        (g === void 0 &&
          (!d || lr(u, c)?.writable) &&
          ((g = et(or(d ? u[c] : Ke, l))), n.set(c, g)),
        g !== void 0)
      ) {
        var h = i(g);
        return h === Ke ? void 0 : h;
      }
      return Reflect.get(u, c, p);
    },
    getOwnPropertyDescriptor(u, c) {
      var p = Reflect.getOwnPropertyDescriptor(u, c);
      if (p && "value" in p) {
        var g = n.get(c);
        g && (p.value = i(g));
      } else if (p === void 0) {
        var d = n.get(c),
          h = d?.v;
        if (d !== void 0 && h !== Ke)
          return { enumerable: !0, configurable: !0, value: h, writable: !0 };
      }
      return p;
    },
    has(u, c) {
      if (c === cr) return !0;
      var p = n.get(c),
        g = (p !== void 0 && p.v !== Ke) || Reflect.has(u, c);
      if (p !== void 0 || (se !== null && (!g || lr(u, c)?.writable))) {
        p === void 0 && ((p = et(g ? or(u[c], l) : Ke)), n.set(c, p));
        var d = i(p);
        if (d === Ke) return !1;
      }
      return g;
    },
    set(u, c, p, g) {
      var d = n.get(c),
        h = c in u;
      if (s && c === "length")
        for (var b = p; b < d.v; b += 1) {
          var _ = n.get(b + "");
          _ !== void 0 ? T(_, Ke) : b in u && ((_ = et(Ke)), n.set(b + "", _));
        }
      d === void 0
        ? (!h || lr(u, c)?.writable) &&
          ((d = et(void 0)), T(d, or(p, l)), n.set(c, d))
        : ((h = d.v !== Ke), T(d, or(p, l)));
      var y = Reflect.getOwnPropertyDescriptor(u, c);
      if ((y?.set && y.set.call(g, p), !h)) {
        if (s && typeof c == "string") {
          var S = n.get("length"),
            k = Number(c);
          Number.isInteger(k) && k >= S.v && T(S, k + 1);
        }
        xs(o);
      }
      return !0;
    },
    ownKeys(u) {
      i(o);
      var c = Reflect.ownKeys(u).filter((d) => {
        var h = n.get(d);
        return h === void 0 || h.v !== Ke;
      });
      for (var [p, g] of n) g.v !== Ke && !(p in u) && c.push(p);
      return c;
    },
    setPrototypeOf() {
      Hi();
    },
  });
}
function xs(e, t = 1) {
  T(e, e.v + t);
}
var An, po, ho, go;
function Sn() {
  if (An === void 0) {
    (An = window), (po = /Firefox/.test(navigator.userAgent));
    var e = Element.prototype,
      t = Node.prototype;
    (ho = lr(t, "firstChild").get),
      (go = lr(t, "nextSibling").get),
      (e.__click = void 0),
      (e.__className = void 0),
      (e.__attributes = null),
      (e.__styles = null),
      (e.__e = void 0),
      (Text.prototype.__t = void 0);
  }
}
function tr(e = "") {
  return document.createTextNode(e);
}
function Lt(e) {
  return ho.call(e);
}
function Yt(e) {
  return go.call(e);
}
function v(e, t) {
  if (!Q) return Lt(e);
  var r = Lt(ae);
  if (r === null) r = ae.appendChild(tr());
  else if (t && r.nodeType !== 3) {
    var a = tr();
    return r?.before(a), mt(a), a;
  }
  return mt(r), r;
}
function J(e, t) {
  if (!Q) {
    var r = Lt(e);
    return r instanceof Comment && r.data === "" ? Yt(r) : r;
  }
  return ae;
}
function m(e, t = 1, r = !1) {
  let a = Q ? ae : e;
  for (var n; t--; ) (n = a), (a = Yt(a));
  if (!Q) return a;
  var s = a?.nodeType;
  if (r && s !== 3) {
    var o = tr();
    return a === null ? n?.after(o) : a.before(o), mt(o), o;
  }
  return mt(a), a;
}
function mo(e) {
  e.textContent = "";
}
function Zt(e) {
  var t = St | qt,
    r = ce !== null && ce.f & St ? ce : null;
  return (
    se === null || (r !== null && r.f & gt) ? (t |= gt) : (se.f |= so),
    {
      ctx: fe,
      deps: null,
      effects: null,
      equals: io,
      f: t,
      fn: e,
      reactions: null,
      rv: 0,
      v: null,
      wv: 0,
      parent: r ?? se,
    }
  );
}
function Te(e) {
  const t = Zt(e);
  return (t.equals = Un), t;
}
function bo(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1) Vt(t[r]);
  }
}
function il(e) {
  for (var t = e.parent; t !== null; ) {
    if (!(t.f & St)) return t;
    t = t.parent;
  }
  return null;
}
function ll(e) {
  var t,
    r = se;
  _t(il(e));
  try {
    bo(e), (t = Ro(e));
  } finally {
    _t(r);
  }
  return t;
}
function yo(e) {
  var t = ll(e),
    r = (Xt || e.f & gt) && e.deps !== null ? vr : Qe;
  Tt(e, r), e.equals(t) || ((e.v = t), (e.wv = Po()));
}
function _o(e) {
  se === null && ce === null && $i(),
    ce !== null && ce.f & gt && se === null && Ui(),
    Wn && Di();
}
function cl(e, t) {
  var r = t.last;
  r === null
    ? (t.last = t.first = e)
    : ((r.next = e), (e.prev = r), (t.last = e));
}
function Or(e, t, r, a = !0) {
  var n = (e & fa) !== 0,
    s = se,
    o = {
      ctx: fe,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: e | qt,
      first: null,
      fn: t,
      last: null,
      next: null,
      parent: n ? null : s,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0,
    };
  if (r)
    try {
      za(o), (o.f |= no);
    } catch (c) {
      throw (Vt(o), c);
    }
  else t !== null && Ka(o);
  var l =
    r &&
    o.deps === null &&
    o.first === null &&
    o.nodes_start === null &&
    o.teardown === null &&
    (o.f & (so | Ea)) === 0;
  if (!l && !n && a && (s !== null && cl(o, s), ce !== null && ce.f & St)) {
    var u = ce;
    (u.effects ?? (u.effects = [])).push(o);
  }
  return o;
}
function qn(e) {
  const t = Or(Va, null, !1);
  return Tt(t, Qe), (t.teardown = e), t;
}
function Ta(e) {
  _o();
  var t = se !== null && (se.f & Ht) !== 0 && fe !== null && !fe.m;
  if (t) {
    var r = fe;
    (r.e ?? (r.e = [])).push({ fn: e, effect: se, reaction: ce });
  } else {
    var a = Ya(e);
    return a;
  }
}
function wo(e) {
  return _o(), Nr(e);
}
function dl(e) {
  const t = Or(fa, e, !0);
  return (r = {}) =>
    new Promise((a) => {
      r.outro
        ? er(t, () => {
            Vt(t), a(void 0);
          })
        : (Vt(t), a(void 0));
    });
}
function Ya(e) {
  return Or(ao, e, !1);
}
function At(e, t) {
  var r = fe,
    a = { effect: null, ran: !1 };
  r.l.r1.push(a),
    (a.effect = Nr(() => {
      e(), !a.ran && ((a.ran = !0), T(r.l.r2, !0), wt(t));
    }));
}
function Rr() {
  var e = fe;
  Nr(() => {
    if (i(e.l.r2)) {
      for (var t of e.l.r1) {
        var r = t.effect;
        r.f & Qe && Tt(r, vr), Gr(r) && za(r), (t.ran = !1);
      }
      e.l.r2.v = !1;
    }
  });
}
function Nr(e) {
  return Or(Va, e, !0);
}
function V(e, t = [], r = Zt) {
  const a = t.map(r);
  return Br(() => e(...a.map(i)));
}
function Br(e, t = 0) {
  return Or(Va | Ha | t, e, !0);
}
function Pt(e, t = !0) {
  return Or(Va | Ht, e, !0, t);
}
function xo(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Wn,
      a = ce;
    Es(!0), yt(null);
    try {
      t.call(null);
    } finally {
      Es(r), yt(a);
    }
  }
}
function ko(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    var a = r.next;
    Vt(r, t), (r = a);
  }
}
function ul(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    t.f & Ht || Vt(t), (t = r);
  }
}
function Vt(e, t = !0) {
  var r = !1;
  if ((t || e.f & Gi) && e.nodes_start !== null) {
    for (var a = e.nodes_start, n = e.nodes_end; a !== null; ) {
      var s = a === n ? null : Yt(a);
      a.remove(), (a = s);
    }
    r = !0;
  }
  ko(e, t && !r), Oa(e, 0), Tt(e, qa);
  var o = e.transitions;
  if (o !== null) for (const u of o) u.stop();
  xo(e);
  var l = e.parent;
  l !== null && l.first !== null && Eo(e),
    (e.next =
      e.prev =
      e.teardown =
      e.ctx =
      e.deps =
      e.fn =
      e.nodes_start =
      e.nodes_end =
        null);
}
function Eo(e) {
  var t = e.parent,
    r = e.prev,
    a = e.next;
  r !== null && (r.next = a),
    a !== null && (a.prev = r),
    t !== null &&
      (t.first === e && (t.first = a), t.last === e && (t.last = r));
}
function er(e, t) {
  var r = [];
  Yn(e, r, !0),
    Ao(r, () => {
      Vt(e), t && t();
    });
}
function Ao(e, t) {
  var r = e.length;
  if (r > 0) {
    var a = () => --r || t();
    for (var n of e) n.out(a);
  } else t();
}
function Yn(e, t, r) {
  if (!(e.f & Ft)) {
    if (((e.f ^= Ft), e.transitions !== null))
      for (const o of e.transitions) (o.is_global || r) && t.push(o);
    for (var a = e.first; a !== null; ) {
      var n = a.next,
        s = (a.f & Ir) !== 0 || (a.f & Ht) !== 0;
      Yn(a, t, s ? r : !1), (a = n);
    }
  }
}
function Sr(e) {
  So(e, !0);
}
function So(e, t) {
  if (e.f & Ft) {
    (e.f ^= Ft), e.f & Qe || (e.f ^= Qe), Gr(e) && (Tt(e, qt), Ka(e));
    for (var r = e.first; r !== null; ) {
      var a = r.next,
        n = (r.f & Ir) !== 0 || (r.f & Ht) !== 0;
      So(r, n ? t : !1), (r = a);
    }
    if (e.transitions !== null)
      for (const s of e.transitions) (s.is_global || t) && s.in();
  }
}
const fl =
  typeof requestIdleCallback > "u"
    ? (e) => setTimeout(e, 1)
    : requestIdleCallback;
let Kr = [],
  Xr = [];
function To() {
  var e = Kr;
  (Kr = []), zr(e);
}
function Io() {
  var e = Xr;
  (Xr = []), zr(e);
}
function va(e) {
  Kr.length === 0 && queueMicrotask(To), Kr.push(e);
}
function vl(e) {
  Xr.length === 0 && fl(Io), Xr.push(e);
}
function ks() {
  Kr.length > 0 && To(), Xr.length > 0 && Io();
}
let _a = !1,
  Ia = !1,
  Ca = null,
  wa = !1,
  Wn = !1;
function Es(e) {
  Wn = e;
}
let Vr = [];
let ce = null,
  Et = !1;
function yt(e) {
  ce = e;
}
let se = null;
function _t(e) {
  se = e;
}
let Ot = null;
function pl(e) {
  Ot = e;
}
let tt = null,
  dt = 0,
  jt = null;
function hl(e) {
  jt = e;
}
let Co = 1,
  Pa = 0,
  Xt = !1;
function Po() {
  return ++Co;
}
function Gr(e) {
  var t = e.f;
  if (t & qt) return !0;
  if (t & vr) {
    var r = e.deps,
      a = (t & gt) !== 0;
    if (r !== null) {
      var n,
        s,
        o = (t & Aa) !== 0,
        l = a && se !== null && !Xt,
        u = r.length;
      if (o || l) {
        var c = e,
          p = c.parent;
        for (n = 0; n < u; n++)
          (s = r[n]),
            (o || !s?.reactions?.includes(c)) &&
              (s.reactions ?? (s.reactions = [])).push(c);
        o && (c.f ^= Aa), l && p !== null && !(p.f & gt) && (c.f ^= gt);
      }
      for (n = 0; n < u; n++)
        if (((s = r[n]), Gr(s) && yo(s), s.wv > e.wv)) return !0;
    }
    (!a || (se !== null && !Xt)) && Tt(e, Qe);
  }
  return !1;
}
function gl(e, t) {
  for (var r = t; r !== null; ) {
    if (r.f & Ea)
      try {
        r.fn(e);
        return;
      } catch {
        r.f ^= Ea;
      }
    r = r.parent;
  }
  throw ((_a = !1), e);
}
function ml(e) {
  return (e.f & qa) === 0 && (e.parent === null || (e.parent.f & Ea) === 0);
}
function Wa(e, t, r, a) {
  if (_a) {
    if ((r === null && (_a = !1), ml(t))) throw e;
    return;
  }
  r !== null && (_a = !0);
  {
    gl(e, t);
    return;
  }
}
function Oo(e, t, r = !0) {
  var a = e.reactions;
  if (a !== null)
    for (var n = 0; n < a.length; n++) {
      var s = a[n];
      s.f & St
        ? Oo(s, t, !1)
        : t === s && (r ? Tt(s, qt) : s.f & Qe && Tt(s, vr), Ka(s));
    }
}
function Ro(e) {
  var h;
  var t = tt,
    r = dt,
    a = jt,
    n = ce,
    s = Xt,
    o = Ot,
    l = fe,
    u = Et,
    c = e.f;
  (tt = null),
    (dt = 0),
    (jt = null),
    (Xt = (c & gt) !== 0 && (Et || !wa || ce === null)),
    (ce = c & (Ht | fa) ? null : e),
    (Ot = null),
    Sa(e.ctx),
    (Et = !1),
    Pa++;
  try {
    var p = (0, e.fn)(),
      g = e.deps;
    if (tt !== null) {
      var d;
      if ((Oa(e, dt), g !== null && dt > 0))
        for (g.length = dt + tt.length, d = 0; d < tt.length; d++)
          g[dt + d] = tt[d];
      else e.deps = g = tt;
      if (!Xt)
        for (d = dt; d < g.length; d++)
          ((h = g[d]).reactions ?? (h.reactions = [])).push(e);
    } else g !== null && dt < g.length && (Oa(e, dt), (g.length = dt));
    if (Pr() && jt !== null && !Et && g !== null && !(e.f & (St | vr | qt)))
      for (d = 0; d < jt.length; d++) Oo(jt[d], e);
    return n !== null && Pa++, p;
  } finally {
    (tt = t), (dt = r), (jt = a), (ce = n), (Xt = s), (Ot = o), Sa(l), (Et = u);
  }
}
function bl(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var a = Ii.call(r, e);
    if (a !== -1) {
      var n = r.length - 1;
      n === 0 ? (r = t.reactions = null) : ((r[a] = r[n]), r.pop());
    }
  }
  r === null &&
    t.f & St &&
    (tt === null || !tt.includes(t)) &&
    (Tt(t, vr), t.f & (gt | Aa) || (t.f ^= Aa), bo(t), Oa(t, 0));
}
function Oa(e, t) {
  var r = e.deps;
  if (r !== null) for (var a = t; a < r.length; a++) bl(e, r[a]);
}
function za(e) {
  var t = e.f;
  if (!(t & qa)) {
    Tt(e, Qe);
    var r = se,
      a = fe,
      n = wa;
    (se = e), (wa = !0);
    try {
      t & Ha ? ul(e) : ko(e), xo(e);
      var s = Ro(e);
      (e.teardown = typeof s == "function" ? s : null), (e.wv = Co);
      var o = e.deps,
        l;
      _s && Wi && e.f & qt;
    } catch (u) {
      Wa(u, e, r, a || e.ctx);
    } finally {
      (wa = n), (se = r);
    }
  }
}
function yl() {
  try {
    Mi();
  } catch (e) {
    if (Ca !== null) Wa(e, Ca, null);
    else throw e;
  }
}
function No() {
  try {
    for (var e = 0; Vr.length > 0; ) {
      e++ > 1e3 && yl();
      var t = Vr,
        r = t.length;
      Vr = [];
      for (var a = 0; a < r; a++) {
        var n = t[a];
        n.f & Qe || (n.f ^= Qe);
        var s = wl(n);
        _l(s);
      }
    }
  } finally {
    (Ia = !1), (Ca = null);
  }
}
function _l(e) {
  var t = e.length;
  if (t !== 0)
    for (var r = 0; r < t; r++) {
      var a = e[r];
      if (!(a.f & (qa | Ft)))
        try {
          Gr(a) &&
            (za(a),
            a.deps === null &&
              a.first === null &&
              a.nodes_start === null &&
              (a.teardown === null ? Eo(a) : (a.fn = null)));
        } catch (n) {
          Wa(n, a, null, a.ctx);
        }
    }
}
function Ka(e) {
  Ia || ((Ia = !0), queueMicrotask(No));
  for (var t = (Ca = e); t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (r & (fa | Ht)) {
      if (!(r & Qe)) return;
      t.f ^= Qe;
    }
  }
  Vr.push(t);
}
function wl(e) {
  for (var t = [], r = e.first; r !== null; ) {
    var a = r.f,
      n = (a & Ht) !== 0,
      s = n && (a & Qe) !== 0;
    if (!s && !(a & Ft)) {
      if (a & ao) t.push(r);
      else if (n) r.f ^= Qe;
      else {
        var o = ce;
        try {
          (ce = r), Gr(r) && za(r);
        } catch (c) {
          Wa(c, r, null, r.ctx);
        } finally {
          ce = o;
        }
      }
      var l = r.first;
      if (l !== null) {
        r = l;
        continue;
      }
    }
    var u = r.parent;
    for (r = r.next; r === null && u !== null; ) (r = u.next), (u = u.parent);
  }
  return t;
}
function zn(e) {
  var t;
  for (ks(); Vr.length > 0; ) (Ia = !0), No(), ks();
  return t;
}
async function Bo() {
  await Promise.resolve(), zn();
}
function i(e) {
  var t = e.f,
    r = (t & St) !== 0;
  if (ce !== null && !Et) {
    Ot !== null && Ot.includes(e) && qi();
    var a = ce.deps;
    e.rv < Pa &&
      ((e.rv = Pa),
      tt === null && a !== null && a[dt] === e
        ? dt++
        : tt === null
          ? (tt = [e])
          : (!Xt || !tt.includes(e)) && tt.push(e));
  } else if (r && e.deps === null && e.effects === null) {
    var n = e,
      s = n.parent;
    s !== null && !(s.f & gt) && (n.f ^= gt);
  }
  return r && ((n = e), Gr(n) && yo(n)), e.v;
}
function wt(e) {
  var t = Et;
  try {
    return (Et = !0), e();
  } finally {
    Et = t;
  }
}
const xl = -7169;
function Tt(e, t) {
  e.f = (e.f & xl) | t;
}
function Ra(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (cr in e) Tn(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && cr in r && Tn(r);
      }
  }
}
function Tn(e, t = new Set()) {
  if (
    typeof e == "object" &&
    e !== null &&
    !(e instanceof EventTarget) &&
    !t.has(e)
  ) {
    t.add(e), e instanceof Date && e.getTime();
    for (let a in e)
      try {
        Tn(e[a], t);
      } catch {}
    const r = Dn(e);
    if (
      r !== Object.prototype &&
      r !== Array.prototype &&
      r !== Map.prototype &&
      r !== Set.prototype &&
      r !== Date.prototype
    ) {
      const a = ro(r);
      for (let n in a) {
        const s = a[n].get;
        if (s)
          try {
            s.call(e);
          } catch {}
      }
    }
  }
}
const kl = ["touchstart", "touchmove"];
function El(e) {
  return kl.includes(e);
}
let As = !1;
function Go() {
  As ||
    ((As = !0),
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
function Kn(e) {
  var t = ce,
    r = se;
  yt(null), _t(null);
  try {
    return e();
  } finally {
    yt(t), _t(r);
  }
}
function jo(e, t, r, a = r) {
  e.addEventListener(t, () => Kn(r));
  const n = e.__on_r;
  n
    ? (e.__on_r = () => {
        n(), a(!0);
      })
    : (e.__on_r = () => a(!0)),
    Go();
}
const Al = new Set(),
  Ss = new Set();
function Sl(e, t, r, a = {}) {
  function n(s) {
    if ((a.capture || Mr.call(t, s), !s.cancelBubble))
      return Kn(() => r?.call(this, s));
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? va(() => {
          t.addEventListener(e, n, a);
        })
      : t.addEventListener(e, n, a),
    n
  );
}
function N(e, t, r, a, n) {
  var s = { capture: a, passive: n },
    o = Sl(e, t, r, s);
  (t === document.body || t === window || t === document) &&
    qn(() => {
      t.removeEventListener(e, o, s);
    });
}
function Mr(e) {
  var t = this,
    r = t.ownerDocument,
    a = e.type,
    n = e.composedPath?.() || [],
    s = n[0] || e.target,
    o = 0,
    l = e.__root;
  if (l) {
    var u = n.indexOf(l);
    if (u !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var c = n.indexOf(t);
    if (c === -1) return;
    u <= c && (o = u);
  }
  if (((s = n[o] || e.target), s !== t)) {
    jn(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || r;
      },
    });
    var p = ce,
      g = se;
    yt(null), _t(null);
    try {
      for (var d, h = []; s !== null; ) {
        var b = s.assignedSlot || s.parentNode || s.host || null;
        try {
          var _ = s["__" + a];
          if (_ !== void 0 && (!s.disabled || e.target === s))
            if (La(_)) {
              var [y, ...S] = _;
              y.apply(s, [e, ...S]);
            } else _.call(s, e);
        } catch (k) {
          d ? h.push(k) : (d = k);
        }
        if (e.cancelBubble || b === t || b === null) break;
        s = b;
      }
      if (d) {
        for (let k of h)
          queueMicrotask(() => {
            throw k;
          });
        throw d;
      }
    } finally {
      (e.__root = t), delete e.currentTarget, yt(p), _t(g);
    }
  }
}
function Do(e) {
  var t = document.createElement("template");
  return (t.innerHTML = e), t.content;
}
function Rt(e, t) {
  var r = se;
  r.nodes_start === null && ((r.nodes_start = e), (r.nodes_end = t));
}
function O(e, t) {
  var r = (t & sl) !== 0,
    a = (t & ol) !== 0,
    n,
    s = !e.startsWith("<!>");
  return () => {
    if (Q) return Rt(ae, null), ae;
    n === void 0 && ((n = Do(s ? e : "<!>" + e)), r || (n = Lt(n)));
    var o = a || po ? document.importNode(n, !0) : n.cloneNode(!0);
    if (r) {
      var l = Lt(o),
        u = o.lastChild;
      Rt(l, u);
    } else Rt(o, o);
    return o;
  };
}
function Uo(e, t, r = "svg") {
  var a = !e.startsWith("<!>"),
    n = `<${r}>${a ? e : "<!>" + e}</${r}>`,
    s;
  return () => {
    if (Q) return Rt(ae, null), ae;
    if (!s) {
      var o = Do(n),
        l = Lt(o);
      s = Lt(l);
    }
    var u = s.cloneNode(!0);
    return Rt(u, u), u;
  };
}
function dr(e = "") {
  if (!Q) {
    var t = tr(e + "");
    return Rt(t, t), t;
  }
  var r = ae;
  return r.nodeType !== 3 && (r.before((r = tr())), mt(r)), Rt(r, r), r;
}
function ge() {
  if (Q) return Rt(ae, null), ae;
  var e = document.createDocumentFragment(),
    t = document.createComment(""),
    r = tr();
  return e.append(t, r), Rt(t, r), e;
}
function A(e, t) {
  if (Q) {
    (se.nodes_end = ae), pr();
    return;
  }
  e !== null && e.before(t);
}
let In = !0;
function L(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) &&
    ((e.__t = r), (e.nodeValue = r + ""));
}
function $o(e, t) {
  return Mo(e, t);
}
function Tl(e, t) {
  Sn(), (t.intro = t.intro ?? !1);
  const r = t.target,
    a = Q,
    n = ae;
  try {
    for (var s = Lt(r); s && (s.nodeType !== 8 || s.data !== uo); ) s = Yt(s);
    if (!s) throw Lr;
    Mt(!0), mt(s), pr();
    const o = Mo(e, { ...t, anchor: s });
    if (ae === null || ae.nodeType !== 8 || ae.data !== Ln) throw (Vn(), Lr);
    return Mt(!1), o;
  } catch (o) {
    if (o === Lr)
      return t.recover === !1 && Fi(), Sn(), mo(r), Mt(!1), $o(e, t);
    throw o;
  } finally {
    Mt(a), mt(n);
  }
}
const br = new Map();
function Mo(
  e,
  { target: t, anchor: r, props: a = {}, events: n, context: s, intro: o = !0 },
) {
  Sn();
  var l = new Set(),
    u = (g) => {
      for (var d = 0; d < g.length; d++) {
        var h = g[d];
        if (!l.has(h)) {
          l.add(h);
          var b = El(h);
          t.addEventListener(h, Mr, { passive: b });
          var _ = br.get(h);
          _ === void 0
            ? (document.addEventListener(h, Mr, { passive: b }), br.set(h, 1))
            : br.set(h, _ + 1);
        }
      }
    };
  u(Gn(Al)), Ss.add(u);
  var c = void 0,
    p = dl(() => {
      var g = r ?? t.appendChild(tr());
      return (
        Pt(() => {
          if (s) {
            me({});
            var d = fe;
            d.c = s;
          }
          n && (a.$$events = n),
            Q && Rt(g, null),
            (In = o),
            (c = e(g, a) || {}),
            (In = !0),
            Q && (se.nodes_end = ae),
            s && be();
        }),
        () => {
          for (var d of l) {
            t.removeEventListener(d, Mr);
            var h = br.get(d);
            --h === 0
              ? (document.removeEventListener(d, Mr), br.delete(d))
              : br.set(d, h);
          }
          Ss.delete(u), g !== r && g.parentNode?.removeChild(g);
        }
      );
    });
  return Cn.set(c, p), c;
}
let Cn = new WeakMap();
function Il(e, t) {
  const r = Cn.get(e);
  return r ? (Cn.delete(e), r(t)) : Promise.resolve();
}
const un = 0,
  ha = 1,
  fn = 2;
function Cl(e, t, r, a, n) {
  Q && pr();
  var s = e,
    o = Pr(),
    l = fe,
    u = Ke,
    c,
    p,
    g,
    d = (o ? et : ur)(void 0),
    h = (o ? et : ur)(void 0),
    b = !1;
  function _(S, k) {
    (b = !0), k && (_t(y), yt(y), Sa(l));
    try {
      S === un && r && (c ? Sr(c) : (c = Pt(() => r(s)))),
        S === ha && a && (p ? Sr(p) : (p = Pt(() => a(s, d)))),
        S !== un && c && er(c, () => (c = null)),
        S !== ha && p && er(p, () => (p = null)),
        S !== fn && g && er(g, () => (g = null));
    } finally {
      k && (Sa(null), yt(null), _t(null), zn());
    }
  }
  var y = Br(() => {
    if (u !== (u = t())) {
      if (Ri(u)) {
        var S = u;
        (b = !1),
          S.then(
            (k) => {
              S === u && (wr(d, k), _(ha, !0));
            },
            (k) => {
              if (S === u) throw (wr(h, k), _(fn, !0), h.v);
            },
          ),
          Q
            ? r && (c = Pt(() => r(s)))
            : va(() => {
                b || _(un, !0);
              });
      } else wr(d, u), _(ha, !1);
      return () => (u = Ke);
    }
  });
  Q && (s = ae);
}
function D(e, t, r = !1) {
  Q && pr();
  var a = e,
    n = null,
    s = null,
    o = Ke,
    l = r ? Ir : 0,
    u = !1;
  const c = (g, d = !0) => {
      (u = !0), p(d, g);
    },
    p = (g, d) => {
      if (o === (o = g)) return;
      let h = !1;
      if (Q) {
        const b = a.data === Fn;
        !!o === b && ((a = En()), mt(a), Mt(!1), (h = !0));
      }
      o
        ? (n ? Sr(n) : d && (n = Pt(() => d(a))),
          s &&
            er(s, () => {
              s = null;
            }))
        : (s ? Sr(s) : d && (s = Pt(() => d(a))),
          n &&
            er(n, () => {
              n = null;
            })),
        h && Mt(!0);
    };
  Br(() => {
    (u = !1), t(c), u || p(null, null);
  }, l),
    Q && (a = ae);
}
function Ge(e, t) {
  return t;
}
function Pl(e, t, r, a) {
  for (var n = [], s = t.length, o = 0; o < s; o++) Yn(t[o].e, n, !0);
  var l = s > 0 && n.length === 0 && r !== null;
  if (l) {
    var u = r.parentNode;
    mo(u), u.append(r), a.clear(), Kt(e, t[0].prev, t[s - 1].next);
  }
  Ao(n, () => {
    for (var c = 0; c < s; c++) {
      var p = t[c];
      l || (a.delete(p.k), Kt(e, p.prev, p.next)), Vt(p.e, !l);
    }
  });
}
function xe(e, t, r, a, n, s = null) {
  var o = e,
    l = { flags: t, items: new Map(), first: null },
    u = (t & co) !== 0;
  if (u) {
    var c = e;
    o = Q ? mt(Lt(c)) : c.appendChild(tr());
  }
  Q && pr();
  var p = null,
    g = !1,
    d = Te(() => {
      var h = r();
      return La(h) ? h : h == null ? [] : Gn(h);
    });
  Br(() => {
    var h = i(d),
      b = h.length;
    if (g && b === 0) return;
    g = b === 0;
    let _ = !1;
    if (Q) {
      var y = o.data === Fn;
      y !== (b === 0) && ((o = En()), mt(o), Mt(!1), (_ = !0));
    }
    if (Q) {
      for (var S = null, k, E = 0; E < b; E++) {
        if (ae.nodeType === 8 && ae.data === Ln) {
          (o = ae), (_ = !0), Mt(!1);
          break;
        }
        var w = h[E],
          x = a(w, E);
        (k = Fo(ae, l, S, null, w, x, E, n, t, r)), l.items.set(x, k), (S = k);
      }
      b > 0 && mt(En());
    }
    Q || Ol(h, l, o, n, t, a, r),
      s !== null &&
        (b === 0
          ? p
            ? Sr(p)
            : (p = Pt(() => s(o)))
          : p !== null &&
            er(p, () => {
              p = null;
            })),
      _ && Mt(!0),
      i(d);
  }),
    Q && (o = ae);
}
function Ol(e, t, r, a, n, s, o) {
  var l = (n & Ki) !== 0,
    u = (n & ($n | Mn)) !== 0,
    c = e.length,
    p = t.items,
    g = t.first,
    d = g,
    h,
    b = null,
    _,
    y = [],
    S = [],
    k,
    E,
    w,
    x;
  if (l)
    for (x = 0; x < c; x += 1)
      (k = e[x]),
        (E = s(k, x)),
        (w = p.get(E)),
        w !== void 0 && (w.a?.measure(), (_ ?? (_ = new Set())).add(w));
  for (x = 0; x < c; x += 1) {
    if (((k = e[x]), (E = s(k, x)), (w = p.get(E)), w === void 0)) {
      var C = d ? d.e.nodes_start : r;
      (b = Fo(C, t, b, b === null ? t.first : b.next, k, E, x, a, n, o)),
        p.set(E, b),
        (y = []),
        (S = []),
        (d = b.next);
      continue;
    }
    if (
      (u && Rl(w, k, x, n),
      w.e.f & Ft &&
        (Sr(w.e), l && (w.a?.unfix(), (_ ?? (_ = new Set())).delete(w))),
      w !== d)
    ) {
      if (h !== void 0 && h.has(w)) {
        if (y.length < S.length) {
          var P = S[0],
            I;
          b = P.prev;
          var R = y[0],
            B = y[y.length - 1];
          for (I = 0; I < y.length; I += 1) Ts(y[I], P, r);
          for (I = 0; I < S.length; I += 1) h.delete(S[I]);
          Kt(t, R.prev, B.next),
            Kt(t, b, R),
            Kt(t, B, P),
            (d = P),
            (b = B),
            (x -= 1),
            (y = []),
            (S = []);
        } else
          h.delete(w),
            Ts(w, d, r),
            Kt(t, w.prev, w.next),
            Kt(t, w, b === null ? t.first : b.next),
            Kt(t, b, w),
            (b = w);
        continue;
      }
      for (y = [], S = []; d !== null && d.k !== E; )
        d.e.f & Ft || (h ?? (h = new Set())).add(d), S.push(d), (d = d.next);
      if (d === null) continue;
      w = d;
    }
    y.push(w), (b = w), (d = w.next);
  }
  if (d !== null || h !== void 0) {
    for (var $ = h === void 0 ? [] : Gn(h); d !== null; )
      d.e.f & Ft || $.push(d), (d = d.next);
    var j = $.length;
    if (j > 0) {
      var F = n & co && c === 0 ? r : null;
      if (l) {
        for (x = 0; x < j; x += 1) $[x].a?.measure();
        for (x = 0; x < j; x += 1) $[x].a?.fix();
      }
      Pl(t, $, F, p);
    }
  }
  l &&
    va(() => {
      if (_ !== void 0) for (w of _) w.a?.apply();
    }),
    (se.first = t.first && t.first.e),
    (se.last = b && b.e);
}
function Rl(e, t, r, a) {
  a & $n && wr(e.v, t), a & Mn ? wr(e.i, r) : (e.i = r);
}
function Fo(e, t, r, a, n, s, o, l, u, c) {
  var p = (u & $n) !== 0,
    g = (u & Xi) === 0,
    d = p ? (g ? ur(n) : et(n)) : n,
    h = u & Mn ? et(o) : o,
    b = { i: h, v: d, k: s, a: null, e: null, prev: r, next: a };
  try {
    return (
      (b.e = Pt(() => l(e, d, h, c), Q)),
      (b.e.prev = r && r.e),
      (b.e.next = a && a.e),
      r === null ? (t.first = b) : ((r.next = b), (r.e.next = b.e)),
      a !== null && ((a.prev = b), (a.e.prev = b.e)),
      b
    );
  } finally {
  }
}
function Ts(e, t, r) {
  for (
    var a = e.next ? e.next.e.nodes_start : r,
      n = t ? t.e.nodes_start : r,
      s = e.e.nodes_start;
    s !== a;

  ) {
    var o = Yt(s);
    n.before(s), (s = o);
  }
}
function Kt(e, t, r) {
  t === null ? (e.first = r) : ((t.next = r), (t.e.next = r && r.e)),
    r !== null && ((r.prev = t), (r.e.prev = t && t.e));
}
function Lo(e, t, r, a, n) {
  Q && pr();
  var s = t.$$slots?.[r],
    o = !1;
  s === !0 && ((s = t.children), (o = !0)),
    s === void 0 || s(e, o ? () => a : a);
}
function Nl(e, t, ...r) {
  var a = e,
    n = nt,
    s;
  Br(() => {
    n !== (n = t()) && (s && (Vt(s), (s = null)), (s = Pt(() => n(a, ...r))));
  }, Ir),
    Q && (a = ae);
}
function xa(e, t, r) {
  Q && pr();
  var a = e,
    n,
    s;
  Br(() => {
    n !== (n = t()) && (s && (er(s), (s = null)), n && (s = Pt(() => r(a, n))));
  }, Ir),
    Q && (a = ae);
}
function Vo(e) {
  return typeof e == "object" ? Ei(e) : e ?? "";
}
const Is = [
  ...` 	
\r\f \v\uFEFF`,
];
function Bl(e, t, r) {
  var a = e == null ? "" : "" + e;
  if ((t && (a = a ? a + " " + t : t), r)) {
    for (var n in r)
      if (r[n]) a = a ? a + " " + n : n;
      else if (a.length)
        for (var s = n.length, o = 0; (o = a.indexOf(n, o)) >= 0; ) {
          var l = o + s;
          (o === 0 || Is.includes(a[o - 1])) &&
          (l === a.length || Is.includes(a[l]))
            ? (a = (o === 0 ? "" : a.substring(0, o)) + a.substring(l + 1))
            : (o = l);
        }
  }
  return a === "" ? null : a;
}
function le(e, t, r, a, n, s) {
  var o = e.__className;
  if (Q || o !== r) {
    var l = Bl(r, a, s);
    (!Q || l !== e.getAttribute("class")) &&
      (l == null
        ? e.removeAttribute("class")
        : t
          ? (e.className = l)
          : e.setAttribute("class", l)),
      (e.__className = r);
  } else if (s)
    for (var u in s) {
      var c = !!s[u];
      (n == null || c !== !!n[u]) && e.classList.toggle(u, c);
    }
  return s;
}
function Oe(e) {
  if (Q) {
    var t = !1,
      r = () => {
        if (!t) {
          if (((t = !0), e.hasAttribute("value"))) {
            var a = e.value;
            te(e, "value", null), (e.value = a);
          }
          if (e.hasAttribute("checked")) {
            var n = e.checked;
            te(e, "checked", null), (e.checked = n);
          }
        }
      };
    (e.__on_r = r), vl(r), Go();
  }
}
function te(e, t, r, a) {
  var n = e.__attributes ?? (e.__attributes = {});
  (Q &&
    ((n[t] = e.getAttribute(t)),
    t === "src" ||
      t === "srcset" ||
      (t === "href" && e.nodeName === "LINK"))) ||
    (n[t] !== (n[t] = r) &&
      (t === "style" && "__styles" in e && (e.__styles = {}),
      t === "loading" && (e[ji] = r),
      r == null
        ? e.removeAttribute(t)
        : typeof r != "string" && Gl(e).includes(t)
          ? (e[t] = r)
          : e.setAttribute(t, r)));
}
var Cs = new Map();
function Gl(e) {
  var t = Cs.get(e.nodeName);
  if (t) return t;
  Cs.set(e.nodeName, (t = []));
  for (var r, a = e, n = Element.prototype; n !== a; ) {
    r = ro(a);
    for (var s in r) r[s].set && t.push(s);
    a = Dn(a);
  }
  return t;
}
const jl = () => performance.now(),
  Ut = {
    tick: (e) => requestAnimationFrame(e),
    now: () => jl(),
    tasks: new Set(),
  };
function Ho() {
  const e = Ut.now();
  Ut.tasks.forEach((t) => {
    t.c(e) || (Ut.tasks.delete(t), t.f());
  }),
    Ut.tasks.size !== 0 && Ut.tick(Ho);
}
function Dl(e) {
  let t;
  return (
    Ut.tasks.size === 0 && Ut.tick(Ho),
    {
      promise: new Promise((r) => {
        Ut.tasks.add((t = { c: e, f: r }));
      }),
      abort() {
        Ut.tasks.delete(t);
      },
    }
  );
}
function ga(e, t) {
  Kn(() => {
    e.dispatchEvent(new CustomEvent(t));
  });
}
function Ul(e) {
  if (e === "float") return "cssFloat";
  if (e === "offset") return "cssOffset";
  if (e.startsWith("--")) return e;
  const t = e.split("-");
  return t.length === 1
    ? t[0]
    : t[0] +
        t
          .slice(1)
          .map((r) => r[0].toUpperCase() + r.slice(1))
          .join("");
}
function Ps(e) {
  const t = {},
    r = e.split(";");
  for (const a of r) {
    const [n, s] = a.split(":");
    if (!n || s === void 0) break;
    const o = Ul(n.trim());
    t[o] = s.trim();
  }
  return t;
}
const $l = (e) => e;
function Jt(e, t, r, a) {
  var n = (e & rl) !== 0,
    s = (e & al) !== 0,
    o = n && s,
    l = (e & nl) !== 0,
    u = o ? "both" : n ? "in" : "out",
    c,
    p = t.inert,
    g = t.style.overflow,
    d,
    h;
  function b() {
    var E = ce,
      w = se;
    yt(null), _t(null);
    try {
      return c ?? (c = r()(t, a?.() ?? {}, { direction: u }));
    } finally {
      yt(E), _t(w);
    }
  }
  var _ = {
      is_global: l,
      in() {
        if (((t.inert = p), !n)) {
          h?.abort(), h?.reset?.();
          return;
        }
        s || d?.abort(),
          ga(t, "introstart"),
          (d = Pn(t, b(), h, 1, () => {
            ga(t, "introend"),
              d?.abort(),
              (d = c = void 0),
              (t.style.overflow = g);
          }));
      },
      out(E) {
        if (!s) {
          E?.(), (c = void 0);
          return;
        }
        (t.inert = !0),
          ga(t, "outrostart"),
          (h = Pn(t, b(), d, 0, () => {
            ga(t, "outroend"), E?.();
          }));
      },
      stop: () => {
        d?.abort(), h?.abort();
      },
    },
    y = se;
  if (((y.transitions ?? (y.transitions = [])).push(_), n && In)) {
    var S = l;
    if (!S) {
      for (var k = y.parent; k && k.f & Ir; )
        for (; (k = k.parent) && !(k.f & Ha); );
      S = !k || (k.f & no) !== 0;
    }
    S &&
      Ya(() => {
        wt(() => _.in());
      });
  }
}
function Pn(e, t, r, a, n) {
  var s = a === 1;
  if (Oi(t)) {
    var o,
      l = !1;
    return (
      va(() => {
        if (!l) {
          var y = t({ direction: s ? "in" : "out" });
          o = Pn(e, y, r, a, n);
        }
      }),
      {
        abort: () => {
          (l = !0), o?.abort();
        },
        deactivate: () => o.deactivate(),
        reset: () => o.reset(),
        t: () => o.t(),
      }
    );
  }
  if ((r?.deactivate(), !t?.duration))
    return n(), { abort: nt, deactivate: nt, reset: nt, t: () => a };
  const { delay: u = 0, css: c, tick: p, easing: g = $l } = t;
  var d = [];
  if (s && r === void 0 && (p && p(0, 1), c)) {
    var h = Ps(c(0, 1));
    d.push(h, h);
  }
  var b = () => 1 - a,
    _ = e.animate(d, { duration: u });
  return (
    (_.onfinish = () => {
      var y = r?.t() ?? 1 - a;
      r?.abort();
      var S = a - y,
        k = t.duration * Math.abs(S),
        E = [];
      if (k > 0) {
        var w = !1;
        if (c)
          for (
            var x = Math.ceil(k / 16.666666666666668), C = 0;
            C <= x;
            C += 1
          ) {
            var P = y + S * g(C / x),
              I = Ps(c(P, 1 - P));
            E.push(I), w || (w = I.overflow === "hidden");
          }
        w && (e.style.overflow = "hidden"),
          (b = () => {
            var R = _.currentTime;
            return y + S * g(R / k);
          }),
          p &&
            Dl(() => {
              if (_.playState !== "running") return !1;
              var R = b();
              return p(R, 1 - R), !0;
            });
      }
      (_ = e.animate(E, { duration: k, fill: "forwards" })),
        (_.onfinish = () => {
          (b = () => a), p?.(a, 1 - a), n();
        });
    }),
    {
      abort: () => {
        _ && (_.cancel(), (_.effect = null), (_.onfinish = nt));
      },
      deactivate: () => {
        n = nt;
      },
      reset: () => {
        a === 0 && p?.(1, 0);
      },
      t: () => b(),
    }
  );
}
function Be(e, t, r = t) {
  var a = Pr();
  jo(e, "input", (n) => {
    var s = n ? e.defaultValue : e.value;
    if (((s = vn(e) ? pn(s) : s), r(s), a && s !== (s = t()))) {
      var o = e.selectionStart,
        l = e.selectionEnd;
      (e.value = s ?? ""),
        l !== null &&
          ((e.selectionStart = o),
          (e.selectionEnd = Math.min(l, e.value.length)));
    }
  }),
    ((Q && e.defaultValue !== e.value) || (wt(t) == null && e.value)) &&
      r(vn(e) ? pn(e.value) : e.value),
    Nr(() => {
      var n = t();
      (vn(e) && n === pn(e.value)) ||
        (e.type === "date" && !n && !e.value) ||
        (n !== e.value && (e.value = n ?? ""));
    });
}
function Ml(e, t, r = t) {
  jo(e, "change", (a) => {
    var n = a ? e.defaultChecked : e.checked;
    r(n);
  }),
    ((Q && e.defaultChecked !== e.checked) || wt(t) == null) && r(e.checked),
    Nr(() => {
      var a = t();
      e.checked = !!a;
    });
}
function vn(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function pn(e) {
  return e === "" ? null : +e;
}
function Fl(e, t, r) {
  var a = lr(e, t);
  a &&
    a.set &&
    ((e[t] = r),
    qn(() => {
      e[t] = null;
    }));
}
function Os(e, t) {
  return e === t || e?.[cr] === t;
}
function ka(e = {}, t, r, a) {
  return (
    Ya(() => {
      var n, s;
      return (
        Nr(() => {
          (n = s),
            (s = []),
            wt(() => {
              e !== r(...s) &&
                (t(e, ...s), n && Os(r(...n), e) && t(null, ...n));
            });
        }),
        () => {
          va(() => {
            s && Os(r(...s), e) && t(null, ...s);
          });
        }
      );
    }),
    e
  );
}
function Ae(e = !1) {
  const t = fe,
    r = t.l.u;
  if (!r) return;
  let a = () => Ra(t.s);
  if (e) {
    let n = 0,
      s = {};
    const o = Zt(() => {
      let l = !1;
      const u = t.s;
      for (const c in u) u[c] !== s[c] && ((s[c] = u[c]), (l = !0));
      return l && n++, n;
    });
    a = () => i(o);
  }
  r.b.length &&
    wo(() => {
      Rs(t, a), zr(r.b);
    }),
    Ta(() => {
      const n = wt(() => r.m.map(Ni));
      return () => {
        for (const s of n) typeof s == "function" && s();
      };
    }),
    r.a.length &&
      Ta(() => {
        Rs(t, a), zr(r.a);
      });
}
function Rs(e, t) {
  if (e.l.s) for (const r of e.l.s) i(r);
  t();
}
function Xn(e, t, r) {
  if (e == null) return t(void 0), r && r(void 0), nt;
  const a = wt(() => e.subscribe(t, r));
  return a.unsubscribe ? () => a.unsubscribe() : a;
}
const yr = [];
function Ll(e, t) {
  return { subscribe: rt(e, t).subscribe };
}
function rt(e, t = nt) {
  let r = null;
  const a = new Set();
  function n(l) {
    if (lo(e, l) && ((e = l), r)) {
      const u = !yr.length;
      for (const c of a) c[1](), yr.push(c, e);
      if (u) {
        for (let c = 0; c < yr.length; c += 2) yr[c][0](yr[c + 1]);
        yr.length = 0;
      }
    }
  }
  function s(l) {
    n(l(e));
  }
  function o(l, u = nt) {
    const c = [l, u];
    return (
      a.add(c),
      a.size === 1 && (r = t(n, s) || nt),
      l(e),
      () => {
        a.delete(c), a.size === 0 && r && (r(), (r = null));
      }
    );
  }
  return { set: n, update: s, subscribe: o };
}
function Jn(e, t, r) {
  const a = !Array.isArray(e),
    n = a ? [e] : e;
  if (!n.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const s = t.length < 2;
  return Ll(r, (o, l) => {
    let u = !1;
    const c = [];
    let p = 0,
      g = nt;
    const d = () => {
        if (p) return;
        g();
        const b = t(a ? c[0] : c, o, l);
        s ? o(b) : (g = typeof b == "function" ? b : nt);
      },
      h = n.map((b, _) =>
        Xn(
          b,
          (y) => {
            (c[_] = y), (p &= ~(1 << _)), u && d();
          },
          () => {
            p |= 1 << _;
          },
        ),
      );
    return (
      (u = !0),
      d(),
      function () {
        zr(h), g(), (u = !1);
      }
    );
  });
}
function Vl(e) {
  let t;
  return Xn(e, (r) => (t = r))(), t;
}
let ma = !1,
  On = Symbol();
function Nt(e, t, r) {
  const a =
    r[t] ?? (r[t] = { store: null, source: ur(void 0), unsubscribe: nt });
  if (a.store !== e && !(On in r))
    if ((a.unsubscribe(), (a.store = e ?? null), e == null))
      (a.source.v = void 0), (a.unsubscribe = nt);
    else {
      var n = !0;
      (a.unsubscribe = Xn(e, (s) => {
        n ? (a.source.v = s) : T(a.source, s);
      })),
        (n = !1);
    }
  return e && On in r ? Vl(e) : i(a.source);
}
function hr() {
  const e = {};
  function t() {
    qn(() => {
      for (var r in e) e[r].unsubscribe();
      jn(e, On, { enumerable: !1, value: !0 });
    });
  }
  return [e, t];
}
function Hl(e) {
  var t = ma;
  try {
    return (ma = !1), [e(), ma];
  } finally {
    ma = t;
  }
}
function Z(e, t, r, a) {
  var n = (r & Ji) !== 0,
    s = !Cr || (r & Qi) !== 0,
    o = (r & el) !== 0,
    l = (r & tl) !== 0,
    u = !1,
    c;
  o ? ([c, u] = Hl(() => e[t])) : (c = e[t]);
  var p = cr in e || oo in e,
    g =
      (o && (lr(e, t)?.set ?? (p && t in e && ((C) => (e[t] = C))))) || void 0,
    d = a,
    h = !0,
    b = !1,
    _ = () => ((b = !0), h && ((h = !1), l ? (d = wt(a)) : (d = a)), d);
  c === void 0 && a !== void 0 && (g && s && Li(), (c = _()), g && g(c));
  var y;
  if (s)
    y = () => {
      var C = e[t];
      return C === void 0 ? _() : ((h = !0), (b = !1), C);
    };
  else {
    var S = (n ? Zt : Te)(() => e[t]);
    (S.f |= Bi),
      (y = () => {
        var C = i(S);
        return C !== void 0 && (d = void 0), C === void 0 ? d : C;
      });
  }
  if (!(r & Zi)) return y;
  if (g) {
    var k = e.$$legacy;
    return function (C, P) {
      return arguments.length > 0
        ? ((!s || !P || k || u) && g(P ? y() : C), C)
        : y();
    };
  }
  var E = !1,
    w = ur(c),
    x = Zt(() => {
      var C = y(),
        P = i(w);
      return E ? ((E = !1), P) : (w.v = C);
    });
  return (
    n || (x.equals = Un),
    function (C, P) {
      if (arguments.length > 0) {
        const I = P ? i(x) : s && o ? or(C) : C;
        return (
          x.equals(I) ||
            ((E = !0), T(w, I), b && d !== void 0 && (d = I), wt(() => i(x))),
          C
        );
      }
      return i(x);
    }
  );
}
function ql(e) {
  return class extends Yl {
    constructor(t) {
      super({ component: e, ...t });
    }
  };
}
var Dt, pt;
class Yl {
  constructor(t) {
    lt(this, Dt);
    lt(this, pt);
    var r = new Map(),
      a = (s, o) => {
        var l = ur(o);
        return r.set(s, l), l;
      };
    const n = new Proxy(
      { ...(t.props || {}), $$events: {} },
      {
        get(s, o) {
          return i(r.get(o) ?? a(o, Reflect.get(s, o)));
        },
        has(s, o) {
          return o === oo
            ? !0
            : (i(r.get(o) ?? a(o, Reflect.get(s, o))), Reflect.has(s, o));
        },
        set(s, o, l) {
          return T(r.get(o) ?? a(o, l), l), Reflect.set(s, o, l);
        },
      },
    );
    dn(
      this,
      pt,
      (t.hydrate ? Tl : $o)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: n,
        context: t.context,
        intro: t.intro ?? !1,
        recover: t.recover,
      }),
    ),
      (!t?.props?.$$host || t.sync === !1) && zn(),
      dn(this, Dt, n.$$events);
    for (const s of Object.keys(re(this, pt)))
      s === "$set" ||
        s === "$destroy" ||
        s === "$on" ||
        jn(this, s, {
          get() {
            return re(this, pt)[s];
          },
          set(o) {
            re(this, pt)[s] = o;
          },
          enumerable: !0,
        });
    (re(this, pt).$set = (s) => {
      Object.assign(n, s);
    }),
      (re(this, pt).$destroy = () => {
        Il(re(this, pt));
      });
  }
  $set(t) {
    re(this, pt).$set(t);
  }
  $on(t, r) {
    re(this, Dt)[t] = re(this, Dt)[t] || [];
    const a = (...n) => r.call(this, ...n);
    return (
      re(this, Dt)[t].push(a),
      () => {
        re(this, Dt)[t] = re(this, Dt)[t].filter((n) => n !== a);
      }
    );
  }
  $destroy() {
    re(this, pt).$destroy();
  }
}
(Dt = new WeakMap()), (pt = new WeakMap());
function st(e) {
  fe === null && Hn(),
    Cr && fe.l !== null
      ? Kl(fe).m.push(e)
      : Ta(() => {
          const t = wt(e);
          if (typeof t == "function") return t;
        });
}
function Wl(e) {
  fe === null && Hn(), st(() => () => wt(e));
}
function zl(e, t, { bubbles: r = !1, cancelable: a = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: r, cancelable: a });
}
function Xa() {
  const e = fe;
  return (
    e === null && Hn(),
    (t, r, a) => {
      const n = e.s.$$events?.[t];
      if (n) {
        const s = La(n) ? n.slice() : [n],
          o = zl(t, r, a);
        for (const l of s) l.call(e.x, o);
        return !o.defaultPrevented;
      }
      return !0;
    }
  );
}
function Kl(e) {
  var t = e.l;
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
new URL("sveltekit-internal://");
function Xl(e, t) {
  return e === "/" || t === "ignore"
    ? e
    : t === "never"
      ? e.endsWith("/")
        ? e.slice(0, -1)
        : e
      : t === "always" && !e.endsWith("/")
        ? e + "/"
        : e;
}
function Jl(e) {
  return e.split("%25").map(decodeURI).join("%25");
}
function Ql(e) {
  for (const t in e) e[t] = decodeURIComponent(e[t]);
  return e;
}
function hn({ href: e }) {
  return e.split("#")[0];
}
function Zl(e, t, r, a = !1) {
  const n = new URL(e);
  Object.defineProperty(n, "searchParams", {
    value: new Proxy(n.searchParams, {
      get(o, l) {
        if (l === "get" || l === "getAll" || l === "has")
          return (c) => (r(c), o[l](c));
        t();
        const u = Reflect.get(o, l);
        return typeof u == "function" ? u.bind(o) : u;
      },
    }),
    enumerable: !0,
    configurable: !0,
  });
  const s = ["href", "pathname", "search", "toString", "toJSON"];
  a && s.push("hash");
  for (const o of s)
    Object.defineProperty(n, o, {
      get() {
        return t(), e[o];
      },
      enumerable: !0,
      configurable: !0,
    });
  return n;
}
function ec(...e) {
  let t = 5381;
  for (const r of e)
    if (typeof r == "string") {
      let a = r.length;
      for (; a; ) t = (t * 33) ^ r.charCodeAt(--a);
    } else if (ArrayBuffer.isView(r)) {
      const a = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
      let n = a.length;
      for (; n; ) t = (t * 33) ^ a[--n];
    } else throw new TypeError("value must be a string or TypedArray");
  return (t >>> 0).toString(36);
}
var Tv =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Iv(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function tc(e) {
  const t = atob(e),
    r = new Uint8Array(t.length);
  for (let a = 0; a < t.length; a++) r[a] = t.charCodeAt(a);
  return r.buffer;
}
const rc = window.fetch;
window.fetch = (e, t) => (
  (e instanceof Request ? e.method : t?.method || "GET") !== "GET" &&
    Hr.delete(Qn(e)),
  rc(e, t)
);
const Hr = new Map();
function ac(e, t) {
  const r = Qn(e, t),
    a = document.querySelector(r);
  if (a?.textContent) {
    let { body: n, ...s } = JSON.parse(a.textContent);
    const o = a.getAttribute("data-ttl");
    return (
      o && Hr.set(r, { body: n, init: s, ttl: 1e3 * Number(o) }),
      a.getAttribute("data-b64") !== null && (n = tc(n)),
      Promise.resolve(new Response(n, s))
    );
  }
  return window.fetch(e, t);
}
function nc(e, t, r) {
  if (Hr.size > 0) {
    const a = Qn(e, r),
      n = Hr.get(a);
    if (n) {
      if (
        performance.now() < n.ttl &&
        ["default", "force-cache", "only-if-cached", void 0].includes(r?.cache)
      )
        return new Response(n.body, n.init);
      Hr.delete(a);
    }
  }
  return window.fetch(t, r);
}
function Qn(e, t) {
  let a = `script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request ? e.url : e)}]`;
  if (t?.headers || t?.body) {
    const n = [];
    t.headers && n.push([...new Headers(t.headers)].join(",")),
      t.body &&
        (typeof t.body == "string" || ArrayBuffer.isView(t.body)) &&
        n.push(t.body),
      (a += `[data-hash="${ec(...n)}"]`);
  }
  return a;
}
const sc = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function oc(e) {
  const t = [];
  return {
    pattern:
      e === "/"
        ? /^\/$/
        : new RegExp(
            `^${lc(e)
              .map((a) => {
                const n = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(a);
                if (n)
                  return (
                    t.push({
                      name: n[1],
                      matcher: n[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    "(?:/(.*))?"
                  );
                const s = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(a);
                if (s)
                  return (
                    t.push({
                      name: s[1],
                      matcher: s[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    "(?:/([^/]+))?"
                  );
                if (!a) return;
                const o = a.split(/\[(.+?)\](?!\])/);
                return (
                  "/" +
                  o
                    .map((u, c) => {
                      if (c % 2) {
                        if (u.startsWith("x+"))
                          return gn(
                            String.fromCharCode(parseInt(u.slice(2), 16)),
                          );
                        if (u.startsWith("u+"))
                          return gn(
                            String.fromCharCode(
                              ...u
                                .slice(2)
                                .split("-")
                                .map((_) => parseInt(_, 16)),
                            ),
                          );
                        const p = sc.exec(u),
                          [, g, d, h, b] = p;
                        return (
                          t.push({
                            name: h,
                            matcher: b,
                            optional: !!g,
                            rest: !!d,
                            chained: d ? c === 1 && o[0] === "" : !1,
                          }),
                          d ? "(.*?)" : g ? "([^/]*)?" : "([^/]+?)"
                        );
                      }
                      return gn(u);
                    })
                    .join("")
                );
              })
              .join("")}/?$`,
          ),
    params: t,
  };
}
function ic(e) {
  return !/^\([^)]+\)$/.test(e);
}
function lc(e) {
  return e.slice(1).split("/").filter(ic);
}
function cc(e, t, r) {
  const a = {},
    n = e.slice(1),
    s = n.filter((l) => l !== void 0);
  let o = 0;
  for (let l = 0; l < t.length; l += 1) {
    const u = t[l];
    let c = n[l - o];
    if (
      (u.chained &&
        u.rest &&
        o &&
        ((c = n
          .slice(l - o, l + 1)
          .filter((p) => p)
          .join("/")),
        (o = 0)),
      c === void 0)
    ) {
      u.rest && (a[u.name] = "");
      continue;
    }
    if (!u.matcher || r[u.matcher](c)) {
      a[u.name] = c;
      const p = t[l + 1],
        g = n[l + 1];
      p && !p.rest && p.optional && g && u.chained && (o = 0),
        !p && !g && Object.keys(a).length === s.length && (o = 0);
      continue;
    }
    if (u.optional && u.chained) {
      o++;
      continue;
    }
    return;
  }
  if (!o) return a;
}
function gn(e) {
  return e
    .normalize()
    .replace(/[[\]]/g, "\\$&")
    .replace(/%/g, "%25")
    .replace(/\//g, "%2[Ff]")
    .replace(/\?/g, "%3[Ff]")
    .replace(/#/g, "%23")
    .replace(/[.*+?^${}()|\\]/g, "\\$&");
}
function dc({ nodes: e, server_loads: t, dictionary: r, matchers: a }) {
  const n = new Set(t);
  return Object.entries(r).map(([l, [u, c, p]]) => {
    const { pattern: g, params: d } = oc(l),
      h = {
        id: l,
        exec: (b) => {
          const _ = g.exec(b);
          if (_) return cc(_, d, a);
        },
        errors: [1, ...(p || [])].map((b) => e[b]),
        layouts: [0, ...(c || [])].map(o),
        leaf: s(u),
      };
    return (
      (h.errors.length = h.layouts.length =
        Math.max(h.errors.length, h.layouts.length)),
      h
    );
  });
  function s(l) {
    const u = l < 0;
    return u && (l = ~l), [u, e[l]];
  }
  function o(l) {
    return l === void 0 ? l : [n.has(l), e[l]];
  }
}
function qo(e, t = JSON.parse) {
  try {
    return t(sessionStorage[e]);
  } catch {}
}
function Ns(e, t, r = JSON.stringify) {
  const a = r(t);
  try {
    sessionStorage[e] = a;
  } catch {}
}
const bt = globalThis.__sveltekit_huf0dv?.base ?? "",
  uc = globalThis.__sveltekit_huf0dv?.assets ?? bt,
  fc = "1741076061175",
  Yo = "sveltekit:snapshot",
  Wo = "sveltekit:scroll",
  zo = "sveltekit:states",
  vc = "sveltekit:pageurl",
  xr = "sveltekit:history",
  Jr = "sveltekit:navigation",
  Na = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
  pa = location.origin;
function Ko(e) {
  if (e instanceof URL) return e;
  let t = document.baseURI;
  if (!t) {
    const r = document.getElementsByTagName("base");
    t = r.length ? r[0].href : document.URL;
  }
  return new URL(e, t);
}
function Zn() {
  return { x: pageXOffset, y: pageYOffset };
}
function _r(e, t) {
  return e.getAttribute(`data-sveltekit-${t}`);
}
const Bs = { ...Na, "": Na.hover };
function Xo(e) {
  let t = e.assignedSlot ?? e.parentNode;
  return t?.nodeType === 11 && (t = t.host), t;
}
function Jo(e, t) {
  for (; e && e !== t; ) {
    if (e.nodeName.toUpperCase() === "A" && e.hasAttribute("href")) return e;
    e = Xo(e);
  }
}
function Rn(e, t, r) {
  let a;
  try {
    if (
      ((a = new URL(
        e instanceof SVGAElement ? e.href.baseVal : e.href,
        document.baseURI,
      )),
      r && a.hash.match(/^#[^/]/))
    ) {
      const l = location.hash.split("#")[1] || "/";
      a.hash = `#${l}${a.hash}`;
    }
  } catch {}
  const n = e instanceof SVGAElement ? e.target.baseVal : e.target,
    s =
      !a ||
      !!n ||
      Ja(a, t, r) ||
      (e.getAttribute("rel") || "").split(/\s+/).includes("external"),
    o = a?.origin === pa && e.hasAttribute("download");
  return { url: a, external: s, target: n, download: o };
}
function Ba(e) {
  let t = null,
    r = null,
    a = null,
    n = null,
    s = null,
    o = null,
    l = e;
  for (; l && l !== document.documentElement; )
    a === null && (a = _r(l, "preload-code")),
      n === null && (n = _r(l, "preload-data")),
      t === null && (t = _r(l, "keepfocus")),
      r === null && (r = _r(l, "noscroll")),
      s === null && (s = _r(l, "reload")),
      o === null && (o = _r(l, "replacestate")),
      (l = Xo(l));
  function u(c) {
    switch (c) {
      case "":
      case "true":
        return !0;
      case "off":
      case "false":
        return !1;
      default:
        return;
    }
  }
  return {
    preload_code: Bs[a ?? "off"],
    preload_data: Bs[n ?? "off"],
    keepfocus: u(t),
    noscroll: u(r),
    reload: u(s),
    replace_state: u(o),
  };
}
function Gs(e) {
  const t = rt(e);
  let r = !0;
  function a() {
    (r = !0), t.update((o) => o);
  }
  function n(o) {
    (r = !1), t.set(o);
  }
  function s(o) {
    let l;
    return t.subscribe((u) => {
      (l === void 0 || (r && u !== l)) && o((l = u));
    });
  }
  return { notify: a, set: n, subscribe: s };
}
const Qo = { v: () => {} };
function pc() {
  const { set: e, subscribe: t } = rt(!1);
  let r;
  async function a() {
    clearTimeout(r);
    try {
      const n = await fetch(`${uc}/_app/version.json`, {
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      });
      if (!n.ok) return !1;
      const o = (await n.json()).version !== fc;
      return o && (e(!0), Qo.v(), clearTimeout(r)), o;
    } catch {
      return !1;
    }
  }
  return { subscribe: t, check: a };
}
function Ja(e, t, r) {
  return e.origin !== pa || !e.pathname.startsWith(t)
    ? !0
    : r
      ? !(
          e.pathname === t + "/" ||
          e.pathname === t + "/index.html" ||
          (e.protocol === "file:" &&
            e.pathname.replace(/\/[^/]+\.html?$/, "") === t)
        )
      : !1;
}
function Cv(e) {}
const Zo = new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config",
]);
[...Zo];
const hc = new Set([...Zo]);
[...hc];
function gc(e) {
  return e.filter((t) => t != null);
}
class Qa {
  constructor(t, r) {
    (this.status = t),
      typeof r == "string"
        ? (this.body = { message: r })
        : r
          ? (this.body = r)
          : (this.body = { message: `Error: ${t}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class es {
  constructor(t, r) {
    (this.status = t), (this.location = r);
  }
}
class ts extends Error {
  constructor(t, r, a) {
    super(a), (this.status = t), (this.text = r);
  }
}
const mc = "x-sveltekit-invalidated",
  bc = "x-sveltekit-trailing-slash";
function Ga(e) {
  return e instanceof Qa || e instanceof ts ? e.status : 500;
}
function yc(e) {
  return e instanceof ts ? e.text : "Internal Error";
}
let Je, Qr, mn;
const _c =
  st.toString().includes("$$") || /function \w+\(\) \{\}/.test(st.toString());
var ra, aa, na, sa, oa, ia, la, ca, Qs, da, Zs, ua, eo;
_c
  ? ((Je = {
      data: {},
      form: null,
      error: null,
      params: {},
      route: { id: null },
      state: {},
      status: -1,
      url: new URL("https://example.com"),
    }),
    (Qr = { current: null }),
    (mn = { current: !1 }))
  : ((Je = new ((Qs = class {
      constructor() {
        lt(this, ra, ut({}));
        lt(this, aa, ut(null));
        lt(this, na, ut(null));
        lt(this, sa, ut({}));
        lt(this, oa, ut({ id: null }));
        lt(this, ia, ut({}));
        lt(this, la, ut(-1));
        lt(this, ca, ut(new URL("https://example.com")));
      }
      get data() {
        return i(re(this, ra));
      }
      set data(t) {
        T(re(this, ra), t);
      }
      get form() {
        return i(re(this, aa));
      }
      set form(t) {
        T(re(this, aa), t);
      }
      get error() {
        return i(re(this, na));
      }
      set error(t) {
        T(re(this, na), t);
      }
      get params() {
        return i(re(this, sa));
      }
      set params(t) {
        T(re(this, sa), t);
      }
      get route() {
        return i(re(this, oa));
      }
      set route(t) {
        T(re(this, oa), t);
      }
      get state() {
        return i(re(this, ia));
      }
      set state(t) {
        T(re(this, ia), t);
      }
      get status() {
        return i(re(this, la));
      }
      set status(t) {
        T(re(this, la), t);
      }
      get url() {
        return i(re(this, ca));
      }
      set url(t) {
        T(re(this, ca), t);
      }
    }),
    (ra = new WeakMap()),
    (aa = new WeakMap()),
    (na = new WeakMap()),
    (sa = new WeakMap()),
    (oa = new WeakMap()),
    (ia = new WeakMap()),
    (la = new WeakMap()),
    (ca = new WeakMap()),
    Qs)()),
    (Qr = new ((Zs = class {
      constructor() {
        lt(this, da, ut(null));
      }
      get current() {
        return i(re(this, da));
      }
      set current(t) {
        T(re(this, da), t);
      }
    }),
    (da = new WeakMap()),
    Zs)()),
    (mn = new ((eo = class {
      constructor() {
        lt(this, ua, ut(!1));
      }
      get current() {
        return i(re(this, ua));
      }
      set current(t) {
        T(re(this, ua), t);
      }
    }),
    (ua = new WeakMap()),
    eo)()),
    (Qo.v = () => (mn.current = !0)));
function wc(e) {
  Object.assign(Je, e);
}
const xc = "/__data.json",
  kc = ".html__data.json";
function Ec(e) {
  return e.endsWith(".html")
    ? e.replace(/\.html$/, kc)
    : e.replace(/\/$/, "") + xc;
}
const Ac = new Set(["icon", "shortcut icon", "apple-touch-icon"]),
  fr = qo(Wo) ?? {},
  Zr = qo(Yo) ?? {},
  Bt = { url: Gs({}), page: Gs({}), navigating: rt(null), updated: pc() };
function rs(e) {
  fr[e] = Zn();
}
function Sc(e, t) {
  let r = e + 1;
  for (; fr[r]; ) delete fr[r], (r += 1);
  for (r = t + 1; Zr[r]; ) delete Zr[r], (r += 1);
}
function Tr(e) {
  return (location.href = e.href), new Promise(() => {});
}
async function ei() {
  if ("serviceWorker" in navigator) {
    const e = await navigator.serviceWorker.getRegistration(bt || "/");
    e && (await e.update());
  }
}
function js() {}
let as, Nn, ja, $t, Bn, Ne;
const Da = [],
  Ua = [];
let Qt = null;
const ti = new Set(),
  Tc = new Set(),
  qr = new Set();
let pe = { branch: [], error: null, url: null },
  ns = !1,
  $a = !1,
  Ds = !0,
  ea = !1,
  Ur = !1,
  ri = !1,
  ss = !1,
  ai,
  Xe,
  ht,
  ir;
const Yr = new Set();
async function Nv(e, t, r) {
  document.URL !== location.href && (location.href = location.href),
    (Ne = e),
    await e.hooks.init?.(),
    (as = dc(e)),
    ($t = document.documentElement),
    (Bn = t),
    (Nn = e.nodes[0]),
    (ja = e.nodes[1]),
    Nn(),
    ja(),
    (Xe = history.state?.[xr]),
    (ht = history.state?.[Jr]),
    Xe ||
      ((Xe = ht = Date.now()),
      history.replaceState({ ...history.state, [xr]: Xe, [Jr]: ht }, ""));
  const a = fr[Xe];
  a && ((history.scrollRestoration = "manual"), scrollTo(a.x, a.y)),
    r
      ? await Dc(Bn, r)
      : await Er(Ne.hash ? vi(new URL(location.href)) : location.href, {
          replaceState: !0,
        }),
    jc();
}
function Ic() {
  (Da.length = 0), (ss = !1);
}
function ni(e) {
  Ua.some((t) => t?.snapshot) &&
    (Zr[e] = Ua.map((t) => t?.snapshot?.capture()));
}
function si(e) {
  Zr[e]?.forEach((t, r) => {
    Ua[r]?.snapshot?.restore(t);
  });
}
function Us() {
  rs(Xe), Ns(Wo, fr), ni(ht), Ns(Yo, Zr);
}
async function os(e, t, r, a) {
  return Fr({
    type: "goto",
    url: Ko(e),
    keepfocus: t.keepFocus,
    noscroll: t.noScroll,
    replace_state: t.replaceState,
    state: t.state,
    redirect_count: r,
    nav_token: a,
    accept: () => {
      t.invalidateAll && (ss = !0), t.invalidate && t.invalidate.forEach(Gc);
    },
  });
}
async function Cc(e) {
  if (e.id !== Qt?.id) {
    const t = {};
    Yr.add(t),
      (Qt = {
        id: e.id,
        token: t,
        promise: ii({ ...e, preload: t }).then(
          (r) => (
            Yr.delete(t), r.type === "loaded" && r.state.error && (Qt = null), r
          ),
        ),
      });
  }
  return Qt.promise;
}
async function bn(e) {
  const t = (await en(e, !1))?.route;
  t && (await Promise.all([...t.layouts, t.leaf].map((r) => r?.[1]())));
}
function oi(e, t, r) {
  pe = e.state;
  const a = document.querySelector("style[data-sveltekit]");
  a && a.remove(),
    Object.assign(Je, e.props.page),
    (ai = new Ne.root({
      target: t,
      props: { ...e.props, stores: Bt, components: Ua },
      hydrate: r,
      sync: !1,
    })),
    si(ht);
  const n = {
    from: null,
    to: {
      params: pe.params,
      route: { id: pe.route?.id ?? null },
      url: new URL(location.href),
    },
    willUnload: !1,
    type: "enter",
    complete: Promise.resolve(),
  };
  qr.forEach((s) => s(n)), ($a = !0);
}
function Ma({
  url: e,
  params: t,
  branch: r,
  status: a,
  error: n,
  route: s,
  form: o,
}) {
  let l = "never";
  if (bt && (e.pathname === bt || e.pathname === bt + "/")) l = "always";
  else for (const h of r) h?.slash !== void 0 && (l = h.slash);
  (e.pathname = Xl(e.pathname, l)), (e.search = e.search);
  const u = {
    type: "loaded",
    state: { url: e, params: t, branch: r, error: n, route: s },
    props: { constructors: gc(r).map((h) => h.node.component), page: cs(Je) },
  };
  o !== void 0 && (u.props.form = o);
  let c = {},
    p = !Je,
    g = 0;
  for (let h = 0; h < Math.max(r.length, pe.branch.length); h += 1) {
    const b = r[h],
      _ = pe.branch[h];
    b?.data !== _?.data && (p = !0),
      b &&
        ((c = { ...c, ...b.data }), p && (u.props[`data_${g}`] = c), (g += 1));
  }
  return (
    (!pe.url ||
      e.href !== pe.url.href ||
      pe.error !== n ||
      (o !== void 0 && o !== Je.form) ||
      p) &&
      (u.props.page = {
        error: n,
        params: t,
        route: { id: s?.id ?? null },
        state: {},
        status: a,
        url: new URL(e),
        form: o ?? null,
        data: p ? c : Je.data,
      }),
    u
  );
}
async function is({
  loader: e,
  parent: t,
  url: r,
  params: a,
  route: n,
  server_data_node: s,
}) {
  let o = null,
    l = !0;
  const u = {
      dependencies: new Set(),
      params: new Set(),
      parent: !1,
      route: !1,
      url: !1,
      search_params: new Set(),
    },
    c = await e();
  if (c.universal?.load) {
    let p = function (...d) {
      for (const h of d) {
        const { href: b } = new URL(h, r);
        u.dependencies.add(b);
      }
    };
    const g = {
      route: new Proxy(n, { get: (d, h) => (l && (u.route = !0), d[h]) }),
      params: new Proxy(a, { get: (d, h) => (l && u.params.add(h), d[h]) }),
      data: s?.data ?? null,
      url: Zl(
        r,
        () => {
          l && (u.url = !0);
        },
        (d) => {
          l && u.search_params.add(d);
        },
        Ne.hash,
      ),
      async fetch(d, h) {
        let b;
        d instanceof Request
          ? ((b = d.url),
            (h = {
              body:
                d.method === "GET" || d.method === "HEAD"
                  ? void 0
                  : await d.blob(),
              cache: d.cache,
              credentials: d.credentials,
              headers: [...d.headers].length ? d.headers : void 0,
              integrity: d.integrity,
              keepalive: d.keepalive,
              method: d.method,
              mode: d.mode,
              redirect: d.redirect,
              referrer: d.referrer,
              referrerPolicy: d.referrerPolicy,
              signal: d.signal,
              ...h,
            }))
          : (b = d);
        const _ = new URL(b, r);
        return (
          l && p(_.href),
          _.origin === r.origin && (b = _.href.slice(r.origin.length)),
          $a ? nc(b, _.href, h) : ac(b, h)
        );
      },
      setHeaders: () => {},
      depends: p,
      parent() {
        return l && (u.parent = !0), t();
      },
      untrack(d) {
        l = !1;
        try {
          return d();
        } finally {
          l = !0;
        }
      },
    };
    o = (await c.universal.load.call(null, g)) ?? null;
  }
  return {
    node: c,
    loader: e,
    server: s,
    universal: c.universal?.load ? { type: "data", data: o, uses: u } : null,
    data: o ?? s?.data ?? null,
    slash: c.universal?.trailingSlash ?? s?.slash,
  };
}
function $s(e, t, r, a, n, s) {
  if (ss) return !0;
  if (!n) return !1;
  if ((n.parent && e) || (n.route && t) || (n.url && r)) return !0;
  for (const o of n.search_params) if (a.has(o)) return !0;
  for (const o of n.params) if (s[o] !== pe.params[o]) return !0;
  for (const o of n.dependencies) if (Da.some((l) => l(new URL(o)))) return !0;
  return !1;
}
function ls(e, t) {
  return e?.type === "data" ? e : e?.type === "skip" ? t ?? null : null;
}
function Pc(e, t) {
  if (!e) return new Set(t.searchParams.keys());
  const r = new Set([...e.searchParams.keys(), ...t.searchParams.keys()]);
  for (const a of r) {
    const n = e.searchParams.getAll(a),
      s = t.searchParams.getAll(a);
    n.every((o) => s.includes(o)) &&
      s.every((o) => n.includes(o)) &&
      r.delete(a);
  }
  return r;
}
function Ms({ error: e, url: t, route: r, params: a }) {
  return {
    type: "loaded",
    state: { error: e, url: t, route: r, params: a, branch: [] },
    props: { page: cs(Je), constructors: [] },
  };
}
async function ii({
  id: e,
  invalidating: t,
  url: r,
  params: a,
  route: n,
  preload: s,
}) {
  if (Qt?.id === e) return Yr.delete(Qt.token), Qt.promise;
  const { errors: o, layouts: l, leaf: u } = n,
    c = [...l, u];
  o.forEach((w) => w?.().catch(() => {})),
    c.forEach((w) => w?.[1]().catch(() => {}));
  let p = null;
  const g = pe.url ? e !== Fa(pe.url) : !1,
    d = pe.route ? n.id !== pe.route.id : !1,
    h = Pc(pe.url, r);
  let b = !1;
  const _ = c.map((w, x) => {
    const C = pe.branch[x],
      P = !!w?.[0] && (C?.loader !== w[1] || $s(b, d, g, h, C.server?.uses, a));
    return P && (b = !0), P;
  });
  if (_.some(Boolean)) {
    try {
      p = await di(r, _);
    } catch (w) {
      const x = await kr(w, { url: r, params: a, route: { id: e } });
      return Yr.has(s)
        ? Ms({ error: x, url: r, params: a, route: n })
        : Za({ status: Ga(w), error: x, url: r, route: n });
    }
    if (p.type === "redirect") return p;
  }
  const y = p?.nodes;
  let S = !1;
  const k = c.map(async (w, x) => {
    if (!w) return;
    const C = pe.branch[x],
      P = y?.[x];
    if (
      (!P || P.type === "skip") &&
      w[1] === C?.loader &&
      !$s(S, d, g, h, C.universal?.uses, a)
    )
      return C;
    if (((S = !0), P?.type === "error")) throw P;
    return is({
      loader: w[1],
      url: r,
      params: a,
      route: n,
      parent: async () => {
        const R = {};
        for (let B = 0; B < x; B += 1) Object.assign(R, (await k[B])?.data);
        return R;
      },
      server_data_node: ls(
        P === void 0 && w[0] ? { type: "skip" } : P ?? null,
        w[0] ? C?.server : void 0,
      ),
    });
  });
  for (const w of k) w.catch(() => {});
  const E = [];
  for (let w = 0; w < c.length; w += 1)
    if (c[w])
      try {
        E.push(await k[w]);
      } catch (x) {
        if (x instanceof es) return { type: "redirect", location: x.location };
        if (Yr.has(s))
          return Ms({
            error: await kr(x, { params: a, url: r, route: { id: n.id } }),
            url: r,
            params: a,
            route: n,
          });
        let C = Ga(x),
          P;
        if (y?.includes(x)) (C = x.status ?? C), (P = x.error);
        else if (x instanceof Qa) P = x.body;
        else {
          if (await Bt.updated.check()) return await ei(), await Tr(r);
          P = await kr(x, { params: a, url: r, route: { id: n.id } });
        }
        const I = await Oc(w, E, o);
        return I
          ? Ma({
              url: r,
              params: a,
              branch: E.slice(0, I.idx).concat(I.node),
              status: C,
              error: P,
              route: n,
            })
          : await ci(r, { id: n.id }, P, C);
      }
    else E.push(void 0);
  return Ma({
    url: r,
    params: a,
    branch: E,
    status: 200,
    error: null,
    route: n,
    form: t ? void 0 : null,
  });
}
async function Oc(e, t, r) {
  for (; e--; )
    if (r[e]) {
      let a = e;
      for (; !t[a]; ) a -= 1;
      try {
        return {
          idx: a + 1,
          node: {
            node: await r[e](),
            loader: r[e],
            data: {},
            server: null,
            universal: null,
          },
        };
      } catch {
        continue;
      }
    }
}
async function Za({ status: e, error: t, url: r, route: a }) {
  const n = {};
  let s = null;
  if (Ne.server_loads[0] === 0)
    try {
      const l = await di(r, [!0]);
      if (l.type !== "data" || (l.nodes[0] && l.nodes[0].type !== "data"))
        throw 0;
      s = l.nodes[0] ?? null;
    } catch {
      (r.origin !== pa || r.pathname !== location.pathname || ns) &&
        (await Tr(r));
    }
  try {
    const l = await is({
        loader: Nn,
        url: r,
        params: n,
        route: a,
        parent: () => Promise.resolve({}),
        server_data_node: ls(s),
      }),
      u = {
        node: await ja(),
        loader: ja,
        universal: null,
        server: null,
        data: null,
      };
    return Ma({
      url: r,
      params: n,
      branch: [l, u],
      status: e,
      error: t,
      route: null,
    });
  } catch (l) {
    if (l instanceof es) return os(new URL(l.location, location.href), {}, 0);
    throw l;
  }
}
function Rc(e) {
  let t;
  try {
    if (
      ((t = Ne.hooks.reroute({ url: new URL(e) }) ?? e), typeof t == "string")
    ) {
      const r = new URL(e);
      Ne.hash ? (r.hash = t) : (r.pathname = t), (t = r);
    }
  } catch {
    return;
  }
  return t;
}
async function en(e, t) {
  if (e && !Ja(e, bt, Ne.hash)) {
    const r = Rc(e);
    if (!r) return;
    const a = Nc(r);
    for (const n of as) {
      const s = n.exec(a);
      if (s)
        return { id: Fa(e), invalidating: t, route: n, params: Ql(s), url: e };
    }
  }
}
function Nc(e) {
  return (
    Jl(
      Ne.hash
        ? e.hash.replace(/^#/, "").replace(/[?#].+/, "")
        : e.pathname.slice(bt.length),
    ) || "/"
  );
}
function Fa(e) {
  return (Ne.hash ? e.hash.replace(/^#/, "") : e.pathname) + e.search;
}
function li({ url: e, type: t, intent: r, delta: a }) {
  let n = !1;
  const s = fi(pe, r, e, t);
  a !== void 0 && (s.navigation.delta = a);
  const o = {
    ...s.navigation,
    cancel: () => {
      (n = !0), s.reject(new Error("navigation cancelled"));
    },
  };
  return ea || ti.forEach((l) => l(o)), n ? null : s;
}
async function Fr({
  type: e,
  url: t,
  popped: r,
  keepfocus: a,
  noscroll: n,
  replace_state: s,
  state: o = {},
  redirect_count: l = 0,
  nav_token: u = {},
  accept: c = js,
  block: p = js,
}) {
  const g = ir;
  ir = u;
  const d = await en(t, !1),
    h = li({ url: t, type: e, delta: r?.delta, intent: d });
  if (!h) {
    p(), ir === u && (ir = g);
    return;
  }
  const b = Xe,
    _ = ht;
  c(), (ea = !0), $a && Bt.navigating.set((Qr.current = h.navigation));
  let y = d && (await ii(d));
  if (!y) {
    if (Ja(t, bt, Ne.hash)) return await Tr(t);
    y = await ci(
      t,
      { id: null },
      await kr(new ts(404, "Not Found", `Not found: ${t.pathname}`), {
        url: t,
        params: {},
        route: { id: null },
      }),
      404,
    );
  }
  if (((t = d?.url || t), ir !== u))
    return h.reject(new Error("navigation aborted")), !1;
  if (y.type === "redirect")
    if (l >= 20)
      y = await Za({
        status: 500,
        error: await kr(new Error("Redirect loop"), {
          url: t,
          params: {},
          route: { id: null },
        }),
        url: t,
        route: { id: null },
      });
    else return await os(new URL(y.location, t).href, {}, l + 1, u), !1;
  else
    y.props.page.status >= 400 &&
      (await Bt.updated.check()) &&
      (await ei(), await Tr(t));
  if (
    (Ic(),
    rs(b),
    ni(_),
    y.props.page.url.pathname !== t.pathname &&
      (t.pathname = y.props.page.url.pathname),
    (o = r ? r.state : o),
    !r)
  ) {
    const w = s ? 0 : 1,
      x = { [xr]: (Xe += w), [Jr]: (ht += w), [zo]: o };
    (s ? history.replaceState : history.pushState).call(history, x, "", t),
      s || Sc(Xe, ht);
  }
  if (((Qt = null), (y.props.page.state = o), $a)) {
    (pe = y.state), y.props.page && (y.props.page.url = t);
    const w = (
      await Promise.all(Array.from(Tc, (x) => x(h.navigation)))
    ).filter((x) => typeof x == "function");
    if (w.length > 0) {
      let x = function () {
        w.forEach((C) => {
          qr.delete(C);
        });
      };
      w.push(x),
        w.forEach((C) => {
          qr.add(C);
        });
    }
    ai.$set(y.props), wc(y.props.page), (ri = !0);
  } else oi(y, Bn, !1);
  const { activeElement: S } = document;
  await Bo();
  const k = r ? r.scroll : n ? Zn() : null;
  if (Ds) {
    const w =
      t.hash &&
      document.getElementById(
        decodeURIComponent(
          Ne.hash ? t.hash.split("#")[2] ?? "" : t.hash.slice(1),
        ),
      );
    k ? scrollTo(k.x, k.y) : w ? w.scrollIntoView() : scrollTo(0, 0);
  }
  const E =
    document.activeElement !== S && document.activeElement !== document.body;
  !a && !E && Uc(),
    (Ds = !0),
    y.props.page && Object.assign(Je, y.props.page),
    (ea = !1),
    e === "popstate" && si(ht),
    h.fulfil(void 0),
    qr.forEach((w) => w(h.navigation)),
    Bt.navigating.set((Qr.current = null));
}
async function ci(e, t, r, a) {
  return e.origin === pa && e.pathname === location.pathname && !ns
    ? await Za({ status: a, error: r, url: e, route: t })
    : await Tr(e);
}
function Bc() {
  let e, t;
  $t.addEventListener("mousemove", (o) => {
    const l = o.target;
    clearTimeout(e),
      (e = setTimeout(() => {
        n(l, 2);
      }, 20));
  });
  function r(o) {
    o.defaultPrevented || n(o.composedPath()[0], 1);
  }
  $t.addEventListener("mousedown", r),
    $t.addEventListener("touchstart", r, { passive: !0 });
  const a = new IntersectionObserver(
    (o) => {
      for (const l of o)
        l.isIntersecting && (bn(new URL(l.target.href)), a.unobserve(l.target));
    },
    { threshold: 0 },
  );
  async function n(o, l) {
    const u = Jo(o, $t);
    if (!u || u === t) return;
    const { url: c, external: p, download: g } = Rn(u, bt, Ne.hash);
    if (p || g) return;
    const d = Ba(u),
      h = c && Fa(pe.url) === Fa(c);
    if (!d.reload && !h)
      if (l <= d.preload_data) {
        t = u;
        const b = await en(c, !1);
        b && Cc(b);
      } else l <= d.preload_code && ((t = u), bn(c));
  }
  function s() {
    a.disconnect();
    for (const o of $t.querySelectorAll("a")) {
      const { url: l, external: u, download: c } = Rn(o, bt, Ne.hash);
      if (u || c) continue;
      const p = Ba(o);
      p.reload ||
        (p.preload_code === Na.viewport && a.observe(o),
        p.preload_code === Na.eager && bn(l));
    }
  }
  qr.add(s), s();
}
function kr(e, t) {
  if (e instanceof Qa) return e.body;
  const r = Ga(e),
    a = yc(e);
  return (
    Ne.hooks.handleError({ error: e, event: t, status: r, message: a }) ?? {
      message: a,
    }
  );
}
function Er(e, t = {}) {
  return (
    (e = new URL(Ko(e))),
    e.origin !== pa
      ? Promise.reject(new Error("goto: invalid URL"))
      : os(e, t, 0)
  );
}
function Gc(e) {
  if (typeof e == "function") Da.push(e);
  else {
    const { href: t } = new URL(e, location.href);
    Da.push((r) => r.href === t);
  }
}
function jc() {
  (history.scrollRestoration = "manual"),
    addEventListener("beforeunload", (t) => {
      let r = !1;
      if ((Us(), !ea)) {
        const a = fi(pe, void 0, null, "leave"),
          n = {
            ...a.navigation,
            cancel: () => {
              (r = !0), a.reject(new Error("navigation cancelled"));
            },
          };
        ti.forEach((s) => s(n));
      }
      r
        ? (t.preventDefault(), (t.returnValue = ""))
        : (history.scrollRestoration = "auto");
    }),
    addEventListener("visibilitychange", () => {
      document.visibilityState === "hidden" && Us();
    }),
    navigator.connection?.saveData || Bc(),
    $t.addEventListener("click", async (t) => {
      if (
        t.button ||
        t.which !== 1 ||
        t.metaKey ||
        t.ctrlKey ||
        t.shiftKey ||
        t.altKey ||
        t.defaultPrevented
      )
        return;
      const r = Jo(t.composedPath()[0], $t);
      if (!r) return;
      const {
        url: a,
        external: n,
        target: s,
        download: o,
      } = Rn(r, bt, Ne.hash);
      if (!a) return;
      if (s === "_parent" || s === "_top") {
        if (window.parent !== window) return;
      } else if (s && s !== "_self") return;
      const l = Ba(r);
      if (
        (!(r instanceof SVGAElement) &&
          a.protocol !== location.protocol &&
          !(a.protocol === "https:" || a.protocol === "http:")) ||
        o
      )
        return;
      const [c, p] = (Ne.hash ? a.hash.replace(/^#/, "") : a.href).split("#"),
        g = c === hn(location);
      if (n || (l.reload && (!g || !p))) {
        li({ url: a, type: "link" }) ? (ea = !0) : t.preventDefault();
        return;
      }
      if (p !== void 0 && g) {
        const [, d] = pe.url.href.split("#");
        if (d === p) {
          if (
            (t.preventDefault(),
            p === "" ||
              (p === "top" && r.ownerDocument.getElementById("top") === null))
          )
            window.scrollTo({ top: 0 });
          else {
            const h = r.ownerDocument.getElementById(decodeURIComponent(p));
            h && (h.scrollIntoView(), h.focus());
          }
          return;
        }
        if (((Ur = !0), rs(Xe), e(a), !l.replace_state)) return;
        Ur = !1;
      }
      t.preventDefault(),
        await new Promise((d) => {
          requestAnimationFrame(() => {
            setTimeout(d, 0);
          }),
            setTimeout(d, 100);
        }),
        await Fr({
          type: "link",
          url: a,
          keepfocus: l.keepfocus,
          noscroll: l.noscroll,
          replace_state: l.replace_state ?? a.href === location.href,
        });
    }),
    $t.addEventListener("submit", (t) => {
      if (t.defaultPrevented) return;
      const r = HTMLFormElement.prototype.cloneNode.call(t.target),
        a = t.submitter;
      if (
        (a?.formTarget || r.target) === "_blank" ||
        (a?.formMethod || r.method) !== "get"
      )
        return;
      const o = new URL(
        (a?.hasAttribute("formaction") && a?.formAction) || r.action,
      );
      if (Ja(o, bt, !1)) return;
      const l = t.target,
        u = Ba(l);
      if (u.reload) return;
      t.preventDefault(), t.stopPropagation();
      const c = new FormData(l),
        p = a?.getAttribute("name");
      p && c.append(p, a?.getAttribute("value") ?? ""),
        (o.search = new URLSearchParams(c).toString()),
        Fr({
          type: "form",
          url: o,
          keepfocus: u.keepfocus,
          noscroll: u.noscroll,
          replace_state: u.replace_state ?? o.href === location.href,
        });
    }),
    addEventListener("popstate", async (t) => {
      if (t.state?.[xr]) {
        const r = t.state[xr];
        if (((ir = {}), r === Xe)) return;
        const a = fr[r],
          n = t.state[zo] ?? {},
          s = new URL(t.state[vc] ?? location.href),
          o = t.state[Jr],
          l = pe.url ? hn(location) === hn(pe.url) : !1;
        if (o === ht && (ri || l)) {
          n !== Je.state && (Je.state = n),
            e(s),
            (fr[Xe] = Zn()),
            a && scrollTo(a.x, a.y),
            (Xe = r);
          return;
        }
        const c = r - Xe;
        await Fr({
          type: "popstate",
          url: s,
          popped: { state: n, scroll: a, delta: c },
          accept: () => {
            (Xe = r), (ht = o);
          },
          block: () => {
            history.go(-c);
          },
          nav_token: ir,
        });
      } else if (!Ur) {
        const r = new URL(location.href);
        e(r);
      }
    }),
    addEventListener("hashchange", () => {
      Ur
        ? ((Ur = !1),
          history.replaceState(
            { ...history.state, [xr]: ++Xe, [Jr]: ht },
            "",
            location.href,
          ))
        : Ne.hash &&
          pe.url.hash === location.hash &&
          Fr({ type: "goto", url: vi(pe.url) });
    });
  for (const t of document.querySelectorAll("link"))
    Ac.has(t.rel) && (t.href = t.href);
  addEventListener("pageshow", (t) => {
    t.persisted && Bt.navigating.set((Qr.current = null));
  });
  function e(t) {
    (pe.url = Je.url = t), Bt.page.set(cs(Je)), Bt.page.notify();
  }
}
async function Dc(
  e,
  {
    status: t = 200,
    error: r,
    node_ids: a,
    params: n,
    route: s,
    server_route: o,
    data: l,
    form: u,
  },
) {
  ns = !0;
  const c = new URL(location.href);
  let p;
  ({ params: n = {}, route: s = { id: null } } = (await en(c, !1)) || {}),
    (p = as.find(({ id: h }) => h === s.id));
  let g,
    d = !0;
  try {
    const h = a.map(async (_, y) => {
        const S = l[y];
        return (
          S?.uses && (S.uses = ui(S.uses)),
          is({
            loader: Ne.nodes[_],
            url: c,
            params: n,
            route: s,
            parent: async () => {
              const k = {};
              for (let E = 0; E < y; E += 1)
                Object.assign(k, (await h[E]).data);
              return k;
            },
            server_data_node: ls(S),
          })
        );
      }),
      b = await Promise.all(h);
    if (p) {
      const _ = p.layouts;
      for (let y = 0; y < _.length; y++) _[y] || b.splice(y, 0, void 0);
    }
    g = Ma({
      url: c,
      params: n,
      branch: b,
      status: t,
      error: r,
      form: u,
      route: p ?? null,
    });
  } catch (h) {
    if (h instanceof es) {
      await Tr(new URL(h.location, location.href));
      return;
    }
    (g = await Za({
      status: Ga(h),
      error: await kr(h, { url: c, params: n, route: s }),
      url: c,
      route: s,
    })),
      (e.textContent = ""),
      (d = !1);
  }
  g.props.page && (g.props.page.state = {}), oi(g, e, d);
}
async function di(e, t) {
  const r = new URL(e);
  (r.pathname = Ec(e.pathname)),
    e.pathname.endsWith("/") && r.searchParams.append(bc, "1"),
    r.searchParams.append(mc, t.map((s) => (s ? "1" : "0")).join(""));
  const a = window.fetch,
    n = await a(r.href, {});
  if (!n.ok) {
    let s;
    throw (
      (n.headers.get("content-type")?.includes("application/json")
        ? (s = await n.json())
        : n.status === 404
          ? (s = "Not Found")
          : n.status === 500 && (s = "Internal Error"),
      new Qa(n.status, s))
    );
  }
  return new Promise(async (s) => {
    const o = new Map(),
      l = n.body.getReader(),
      u = new TextDecoder();
    function c(g) {
      return Ai(g, {
        ...Ne.decoders,
        Promise: (d) =>
          new Promise((h, b) => {
            o.set(d, { fulfil: h, reject: b });
          }),
      });
    }
    let p = "";
    for (;;) {
      const { done: g, value: d } = await l.read();
      if (g && !p) break;
      for (
        p +=
          !d && p
            ? `
`
            : u.decode(d, { stream: !0 });
        ;

      ) {
        const h = p.indexOf(`
`);
        if (h === -1) break;
        const b = JSON.parse(p.slice(0, h));
        if (((p = p.slice(h + 1)), b.type === "redirect")) return s(b);
        if (b.type === "data")
          b.nodes?.forEach((_) => {
            _?.type === "data" && ((_.uses = ui(_.uses)), (_.data = c(_.data)));
          }),
            s(b);
        else if (b.type === "chunk") {
          const { id: _, data: y, error: S } = b,
            k = o.get(_);
          o.delete(_), S ? k.reject(c(S)) : k.fulfil(c(y));
        }
      }
    }
  });
}
function ui(e) {
  return {
    dependencies: new Set(e?.dependencies ?? []),
    params: new Set(e?.params ?? []),
    parent: !!e?.parent,
    route: !!e?.route,
    url: !!e?.url,
    search_params: new Set(e?.search_params ?? []),
  };
}
function Uc() {
  const e = document.querySelector("[autofocus]");
  if (e) e.focus();
  else {
    const t = document.body,
      r = t.getAttribute("tabindex");
    (t.tabIndex = -1),
      t.focus({ preventScroll: !0, focusVisible: !1 }),
      r !== null
        ? t.setAttribute("tabindex", r)
        : t.removeAttribute("tabindex");
    const a = getSelection();
    if (a && a.type !== "None") {
      const n = [];
      for (let s = 0; s < a.rangeCount; s += 1) n.push(a.getRangeAt(s));
      setTimeout(() => {
        if (a.rangeCount === n.length) {
          for (let s = 0; s < a.rangeCount; s += 1) {
            const o = n[s],
              l = a.getRangeAt(s);
            if (
              o.commonAncestorContainer !== l.commonAncestorContainer ||
              o.startContainer !== l.startContainer ||
              o.endContainer !== l.endContainer ||
              o.startOffset !== l.startOffset ||
              o.endOffset !== l.endOffset
            )
              return;
          }
          a.removeAllRanges();
        }
      });
    }
  }
}
function fi(e, t, r, a) {
  let n, s;
  const o = new Promise((u, c) => {
    (n = u), (s = c);
  });
  return (
    o.catch(() => {}),
    {
      navigation: {
        from: {
          params: e.params,
          route: { id: e.route?.id ?? null },
          url: e.url,
        },
        to: r && {
          params: t?.params ?? null,
          route: { id: t?.route?.id ?? null },
          url: r,
        },
        willUnload: !t,
        type: a,
        complete: o,
      },
      fulfil: n,
      reject: s,
    }
  );
}
function cs(e) {
  return {
    data: e.data,
    error: e.error,
    form: e.form,
    params: e.params,
    route: e.route,
    state: e.state,
    status: e.status,
    url: e.url,
  };
}
function vi(e) {
  const t = new URL(e);
  return (t.hash = decodeURIComponent(e.hash)), t;
}
const $c = "modulepreload",
  Mc = function (e, t) {
    return new URL(e, t).href;
  },
  Fs = {},
  ct = function (t, r, a) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      const o = document.getElementsByTagName("link"),
        l = document.querySelector("meta[property=csp-nonce]"),
        u = l?.nonce || l?.getAttribute("nonce");
      n = Promise.allSettled(
        r.map((c) => {
          if (((c = Mc(c, a)), c in Fs)) return;
          Fs[c] = !0;
          const p = c.endsWith(".css"),
            g = p ? '[rel="stylesheet"]' : "";
          if (!!a)
            for (let b = o.length - 1; b >= 0; b--) {
              const _ = o[b];
              if (_.href === c && (!p || _.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${c}"]${g}`)) return;
          const h = document.createElement("link");
          if (
            ((h.rel = p ? "stylesheet" : $c),
            p || (h.as = "script"),
            (h.crossOrigin = ""),
            (h.href = c),
            u && h.setAttribute("nonce", u),
            document.head.appendChild(h),
            p)
          )
            return new Promise((b, _) => {
              h.addEventListener("load", b),
                h.addEventListener("error", () =>
                  _(new Error(`Unable to preload CSS for ${c}`)),
                );
            });
        }),
      );
    }
    function s(o) {
      const l = new Event("vite:preloadError", { cancelable: !0 });
      if (((l.payload = o), window.dispatchEvent(l), !l.defaultPrevented))
        throw o;
    }
    return n.then((o) => {
      for (const l of o || []) l.status === "rejected" && s(l.reason);
      return t().catch(s);
    });
  },
  Bv = {},
  Fc = "5";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(Fc);
const Lc = Si;
var Vc = O(
    '<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>',
  ),
  Hc = O("<!> <!>", 1);
function qc(e, t) {
  me(t, !0);
  let r = Z(t, "components", 23, () => []),
    a = Z(t, "data_0", 3, null),
    n = Z(t, "data_1", 3, null);
  wo(() => t.stores.page.set(t.page)),
    Ta(() => {
      t.stores,
        t.page,
        t.constructors,
        r(),
        t.form,
        a(),
        n(),
        t.stores.page.notify();
    });
  let s = ut(!1),
    o = ut(!1),
    l = ut(null);
  st(() => {
    const _ = t.stores.page.subscribe(() => {
      i(s) &&
        (T(o, !0),
        Bo().then(() => {
          T(l, or(document.title || "untitled page"));
        }));
    });
    return T(s, !0), _;
  });
  const u = Zt(() => t.constructors[1]);
  var c = Hc(),
    p = J(c);
  {
    var g = (_) => {
        var y = ge();
        const S = Zt(() => t.constructors[0]);
        var k = J(y);
        xa(
          k,
          () => i(S),
          (E, w) => {
            ka(
              w(E, {
                get data() {
                  return a();
                },
                get form() {
                  return t.form;
                },
                children: (x, C) => {
                  var P = ge(),
                    I = J(P);
                  xa(
                    I,
                    () => i(u),
                    (R, B) => {
                      ka(
                        B(R, {
                          get data() {
                            return n();
                          },
                          get form() {
                            return t.form;
                          },
                        }),
                        ($) => (r()[1] = $),
                        () => r()?.[1],
                      );
                    },
                  ),
                    A(x, P);
                },
                $$slots: { default: !0 },
              }),
              (x) => (r()[0] = x),
              () => r()?.[0],
            );
          },
        ),
          A(_, y);
      },
      d = (_) => {
        var y = ge();
        const S = Zt(() => t.constructors[0]);
        var k = J(y);
        xa(
          k,
          () => i(S),
          (E, w) => {
            ka(
              w(E, {
                get data() {
                  return a();
                },
                get form() {
                  return t.form;
                },
              }),
              (x) => (r()[0] = x),
              () => r()?.[0],
            );
          },
        ),
          A(_, y);
      };
    D(p, (_) => {
      t.constructors[1] ? _(g) : _(d, !1);
    });
  }
  var h = m(p, 2);
  {
    var b = (_) => {
      var y = Vc(),
        S = v(y);
      {
        var k = (E) => {
          var w = dr();
          V(() => L(w, i(l))), A(E, w);
        };
        D(S, (E) => {
          i(o) && E(k);
        });
      }
      f(y), A(_, y);
    };
    D(h, (_) => {
      i(s) && _(b);
    });
  }
  A(e, c), be();
}
const Gv = ql(qc),
  jv = [
    () => ct(() => Promise.resolve().then(() => Kc), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => Zc), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => Zd), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => Tu), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => $u), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => Yu), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => df), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => yf), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => xf), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => Ef), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => Hf), void 0, import.meta.url),
    () => ct(() => Promise.resolve().then(() => xv), void 0, import.meta.url),
  ],
  Dv = [],
  Uv = {
    "/": [2],
    "/courses": [3],
    "/courses/[courseId]": [4],
    "/game-rules": [5],
    "/games": [6],
    "/games/create/[game]": [8],
    "/games/[gameId]": [7],
    "/governance": [9],
    "/profile": [10],
    "/whitepaper": [11],
  },
  Yc = {
    handleError: ({ error: e }) => {
      console.error(e);
    },
    reroute: () => {},
    transport: {},
  },
  Wc = Object.fromEntries(
    Object.entries(Yc.transport).map(([e, t]) => [e, t.decode]),
  ),
  $v = !1,
  Mv = (e, t) => Wc[e](t);
function zc(e, t) {
  var r = ge(),
    a = J(r);
  Nl(a, () => t.children), A(e, r);
}
const Kc = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: zc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
zi();
const Xc = {
  get error() {
    return Je.error;
  },
  get status() {
    return Je.status;
  },
};
Bt.updated.check;
const Ls = Xc;
var Jc = O("<h1> </h1> <p> </p>", 1);
function Qc(e, t) {
  me(t, !1), Ae();
  var r = Jc(),
    a = J(r),
    n = v(a, !0);
  f(a);
  var s = m(a, 2),
    o = v(s, !0);
  f(s),
    V(() => {
      L(n, Ls.status), L(o, Ls.error?.message);
    }),
    A(e, r),
    be();
}
const Zc = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Qc },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var ed = O(
  '<div class="spinner-container svelte-1f0ob0u"><div class="local-spinner svelte-1f0ob0u"></div></div>',
);
function td(e) {
  var t = ed();
  A(e, t);
}
const rd = (e) => e;
function pi(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function Vs(e) {
  const t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function ta(e, { delay: t = 0, duration: r = 400, easing: a = rd } = {}) {
  const n = +getComputedStyle(e).opacity;
  return { delay: t, duration: r, easing: a, css: (s) => `opacity: ${s * n}` };
}
function ad(
  e,
  {
    delay: t = 0,
    duration: r = 400,
    easing: a = pi,
    x: n = 0,
    y: s = 0,
    opacity: o = 0,
  } = {},
) {
  const l = getComputedStyle(e),
    u = +l.opacity,
    c = l.transform === "none" ? "" : l.transform,
    p = u * (1 - o),
    [g, d] = Vs(n),
    [h, b] = Vs(s);
  return {
    delay: t,
    duration: r,
    easing: a,
    css: (_, y) => `
			transform: ${c} translate(${(1 - _) * g}${d}, ${(1 - _) * h}${b});
			opacity: ${u - p * y}`,
  };
}
function Hs(
  e,
  {
    delay: t = 0,
    duration: r = 400,
    easing: a = pi,
    start: n = 0,
    opacity: s = 0,
  } = {},
) {
  const o = getComputedStyle(e),
    l = +o.opacity,
    u = o.transform === "none" ? "" : o.transform,
    c = 1 - n,
    p = l * (1 - s);
  return {
    delay: t,
    duration: r,
    easing: a,
    css: (g, d) => `
			transform: ${u} scale(${1 - c * d});
			opacity: ${l - p * d}
		`,
  };
}
const nd = BigInt(60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14),
  sd = 576,
  od = 625,
  yn = () =>
    Ti.create({
      idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
    }),
  id = ({ width: e, height: t }) => {
    if (ws(window) || ws(window.top)) return;
    const {
        top: { innerWidth: r, innerHeight: a },
      } = window,
      n = a / 2 + screenY - t / 2,
      s = r / 2 + screenX - e / 2;
    return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${e}, height=${t}, top=${n}, left=${s}`;
  };
let Ct;
const ld = "https://golfpad.xyz",
  cd = "https://gw4gh-taaaa-aaaal-qjfia-cai.icp0.io",
  dd = () => (typeof window > "u" ? !1 : window.location.origin === ld),
  ud = () => {
    const { subscribe: e, set: t, update: r } = rt({ identity: void 0 });
    return {
      subscribe: e,
      sync: async () => {
        Ct = Ct ?? (await yn());
        const a = await Ct.isAuthenticated();
        t({ identity: a ? Ct.getIdentity() : null });
      },
      signIn: ({ domain: a }) =>
        new Promise(async (n, s) => {
          Ct = Ct ?? (await yn());
          const o = a;
          await Ct?.login({
            maxTimeToLive: nd,
            onSuccess: () => {
              r((l) => ({ ...l, identity: Ct?.getIdentity() })), n();
            },
            onError: s,
            identityProvider: o,
            ...(dd() && { derivationOrigin: cd }),
            windowOpenerFeatures: id({ width: sd, height: od }),
          });
        }),
      signOut: async () => {
        await (Ct ?? (await yn())).logout(),
          (Ct = null),
          r((n) => ({ ...n, identity: null })),
          localStorage.removeItem("user_profile_data");
      },
    };
  },
  Re = ud(),
  fd = rt(void 0);
function qs(e) {
  const t = Array.from(e)
    .map((r) => String.fromCharCode(r))
    .join("");
  return btoa(t);
}
function vd(e) {
  const [t, r] = e.split("T"),
    a = t.split("-");
  if (a.length !== 3)
    throw new Error("Invalid date format. Expected YYYY-MM-DD");
  const n = parseInt(a[0], 10),
    s = parseInt(a[1], 10) - 1,
    o = parseInt(a[2], 10);
  let l = 0,
    u = 0,
    c = 0;
  if (r) {
    const d = r.split(":");
    (l = parseInt(d[0], 10)),
      (u = parseInt(d[1], 10)),
      d.length === 3 && (c = parseInt(d[2], 10));
  }
  const g = new Date(n, s, o, l, u, c).getTime();
  return BigInt(g) * BigInt(1e6);
}
function He(e) {
  return e && e.err !== void 0;
}
const rr = ({ IDL: e }) => {
    const t = e.Text,
      r = e.Record({ principalId: t, requestedBy: t }),
      a = e.Variant({
        InvalidProfilePicture: e.Null,
        DecodeError: e.Null,
        TooLong: e.Null,
        NotAllowed: e.Null,
        NotEnoughFunds: e.Null,
        TooShort: e.Null,
        NotFound: e.Null,
        NotAuthorized: e.Null,
        AlreadyExists: e.Null,
        CreateGameError: e.Null,
        OutOfRange: e.Null,
        PaymentError: e.Null,
        CanisterFull: e.Null,
      }),
      n = e.Variant({ ok: e.Null, err: a }),
      s = e.Int16,
      o = e.Record({
        username: e.Text,
        profilePictureExtension: e.Opt(e.Text),
        profilePicture: e.Opt(e.Vec(e.Nat8)),
        handicap: e.Opt(s),
      }),
      l = e.Record({
        par: e.Nat8,
        name: e.Text,
        yardage: e.Nat,
        colour: e.Text,
        strokeIndex: e.Nat8,
      }),
      u = e.Text,
      c = e.Nat,
      p = e.Record({
        name: e.Text,
        tees: e.Vec(l),
        number: e.Nat8,
        images: e.Vec(e.Tuple(u, c)),
      }),
      g = e.Record({
        added: e.Int,
        holes: e.Vec(p),
        name: e.Text,
        colour: e.Text,
        strokeIndex: e.Nat8,
      }),
      d = e.Record({ holes: e.Vec(p), name: e.Text, initialTeeGroup: g }),
      h = e.Nat,
      b = e.Record({ name: e.Text, updatedTeeGroup: e.Opt(g), courseId: h }),
      _ = e.Record({ version: e.Text, onHold: e.Bool }),
      y = e.Variant({ ok: _, err: a }),
      S = e.Record({ golfCourseId: h }),
      k = e.Nat8,
      E = e.Record({
        activeVersion: k,
        name: e.Text,
        tees: e.Vec(g),
        courseId: h,
      }),
      w = e.Variant({ ok: E, err: a }),
      x = e.Record({ offset: e.Nat, limit: e.Nat, searchTerm: e.Text }),
      C = e.Record({}),
      P = e.Variant({ ok: C, err: a }),
      I = e.Record({ principalId: t }),
      R = e.Record({
        username: e.Text,
        golferPicture: e.Opt(e.Vec(e.Nat8)),
        handicap: e.Opt(s),
        golferPictureExtension: e.Text,
        principalId: t,
      }),
      B = e.Variant({ ok: R, err: a }),
      $ = e.Record({ username: e.Text, principalId: t }),
      j = e.Bool,
      F = e.Variant({ ok: j, err: a }),
      U = e.Record({
        totalEntries: e.Nat,
        offset: e.Nat,
        limit: e.Nat,
        principalId: t,
      }),
      M = e.Record({ requestTime: e.Int, principalId: t }),
      H = e.Record({ friendRequests: e.Vec(M) }),
      Y = e.Variant({ ok: H, err: a }),
      ee = e.Record({
        totalEntries: e.Nat,
        offset: e.Nat,
        limit: e.Nat,
        principalId: t,
      }),
      z = e.Record({ principalId: t }),
      K = e.Record({ friendRequests: e.Vec(z) }),
      q = e.Variant({ ok: K, err: a }),
      de = e.Record({ principalId: t, requestedBy: t }),
      he = e.Record({ requestedFriend: t, principalId: t }),
      Ie = e.Record({ handicap: e.Opt(s), principalId: t }),
      ve = e.Record({ homeCourseId: e.Opt(h), principalId: t }),
      ye = e.Record({
        profilePictureExtension: e.Text,
        profilePicture: e.Opt(e.Vec(e.Nat8)),
        principalId: t,
      }),
      $e = e.Record({ username: e.Text, principalId: t }),
      X = e.Variant({ Ok: e.Text, Err: e.Text });
    return e.Service({
      acceptFriendRequest: e.Func([r], [n], []),
      createGolfer: e.Func([o], [n], []),
      executeAddGolfCourse: e.Func([d], [], []),
      executeUpdateGolfCourse: e.Func([b], [], []),
      getAppStatus: e.Func([], [y], ["query"]),
      getGolfCourse: e.Func([S], [w], []),
      getGolfCourses: e.Func([x], [P], []),
      getProfile: e.Func([I], [B], []),
      isUsernameAvailable: e.Func([$], [F], ["query"]),
      listFriendRequests: e.Func([U], [Y], []),
      listFriends: e.Func([ee], [q], []),
      rejectFriendRequest: e.Func([de], [n], []),
      sendFriendRequest: e.Func([he], [n], []),
      updateHandicap: e.Func([Ie], [n], []),
      updateHomeCourse: e.Func([ve], [n], []),
      updateProfilePicture: e.Func([ye], [n], []),
      updateUsername: e.Func([$e], [n], []),
      validateAddGolfCourse: e.Func([d], [X], ["query"]),
      validateUpdateGolfCourse: e.Func([b], [X], ["query"]),
    });
  },
  pd = "elbip-aiaaa-aaaal-qjfhq-cai",
  hd = (e, t = {}) => {
    const r = t.agent || new kn({ ...t.agentOptions });
    return (
      t.agent &&
        t.agentOptions &&
        console.warn(
          "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.",
        ),
      to.createActor(rr, { agent: r, canisterId: e, ...t.actorOptions })
    );
  };
hd(pd);
class je {
  static createActor(t, r = "", a = null, n = null) {
    const s = { host: `https://${r}.icp-api.io`, identity: a };
    n
      ? n.agentOptions
        ? (n.agentOptions.host = s.host)
        : (n.agentOptions = s)
      : (n = { agentOptions: s });
    const o = new kn({ ...n.agentOptions });
    return to.createActor(t, { agent: o, canisterId: r, ...n?.actorOptions });
  }
  static getAgent(t = "", r = null, a = null) {
    const n = { host: `https://${t}.icp-api.io`, identity: r };
    return (
      a
        ? a.agentOptions
          ? (a.agentOptions.host = n.host)
          : (a.agentOptions = n)
        : (a = { agentOptions: n }),
      new kn({ ...a.agentOptions })
    );
  }
  static createIdentityActor(t, r) {
    let a;
    return new Promise((n, s) => {
      a = t.subscribe((o) => {
        o.identity && n(o.identity);
      });
    }).then((n) => (a(), je.createActor(rr, r, n)));
  }
  static createGovernanceAgent(t, r) {
    let a;
    return new Promise((n, s) => {
      a = t.subscribe((o) => {
        o.identity && n(o.identity);
      });
    }).then((n) => (a(), je.createActor(rr, r, n)));
  }
}
var gd = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class md {
  constructor() {
    Re.sync();
  }
  async isAdmin() {
    const r = await (
      await je.createIdentityActor(Re, gd.BACKEND_CANISTER_ID)
    ).isAdmin();
    if (He(r)) throw new Error("Failed to check is admin");
    return r.ok;
  }
}
var $r = {
  BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai",
  FRONTEND_CANISTER_ID: "gw4gh-taaaa-aaaal-qjfia-cai",
  DFX_NETWORK: "ic",
};
function bd() {
  const { subscribe: e, set: t } = rt(null);
  async function r() {
    let p = localStorage.getItem("user_profile_data");
    if (p) {
      const g = JSON.parse(p);
      return t(g), !1;
    }
    try {
      return await c(), !0;
    } catch (g) {
      throw (console.error("Error fetching user profile:", g), g);
    }
  }
  async function a() {
    return new md().isAdmin();
  }
  async function n(p) {
    try {
      return await (
        await je.createIdentityActor(Re, $r.BACKEND_CANISTER_ID ?? "")
      ).createGolfer(p);
    } catch (g) {
      throw (console.error("Error creating user:", g), g);
    }
  }
  async function s(p) {
    try {
      const d = await (
        await je.createIdentityActor(Re, $r.BACKEND_CANISTER_ID ?? "")
      ).updateUserDetail(p);
      return r(), d;
    } catch (g) {
      throw (console.error("Error updating user:", g), g);
    }
  }
  async function o(p) {
    try {
      const d = l(p);
      if (p.size > 1e3 * 1024) return null;
      const h = new FileReader();
      h.readAsArrayBuffer(p),
        (h.onloadend = async () => {
          const b = h.result,
            _ = new Uint8Array(b);
          try {
            const y = await je.createIdentityActor(
              Re,
              $r.BACKEND_CANISTER_ID ?? "",
            );
            let S = { golferPicture: _, golferPictureExtension: d };
            const k = await y.updateUserPicture(S);
            if (He(k)) {
              console.error("Error updating profile picture");
              return;
            }
            return await c(), k;
          } catch (y) {
            console.error(y);
          }
        });
    } catch (g) {
      throw (console.error("Error updating profile picture:", g), g);
    }
  }
  function l(p) {
    const g = p.name,
      d = g.lastIndexOf(".");
    return d !== -1 ? g.substring(d + 1) : "";
  }
  async function u(p) {
    try {
      return await (
        await je.createIdentityActor(Re, $r.BACKEND_CANISTER_ID ?? "")
      ).isUsernameTaken(p);
    } catch (g) {
      throw (console.error("Error getting user:", g), g);
    }
  }
  async function c() {
    let g = await (
      await je.createIdentityActor(Re, $r.BACKEND_CANISTER_ID)
    ).getMyGolfer();
    if ((console.log("getProfileResponse: ", g), He(g))) {
      console.error("Error fetching user profile");
      return;
    }
    let h = g.ok;
    t(h);
  }
  return {
    subscribe: e,
    sync: r,
    createUser: n,
    updateUser: s,
    cacheProfile: c,
    updateProfilePicture: o,
    isUsernameAvailable: u,
    isAdmin: a,
  };
}
const kt = bd();
var yd = O('<div class="local-spinner svelte-pvdm52"></div>');
function Ys(e) {
  var t = yd();
  A(e, t);
}
var _d = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class Ws {
  constructor() {}
  async getAppStatus() {
    const r = await (
      await je.createActor(rr, _d.BACKEND_CANISTER_ID)
    ).getAppStatus();
    if (He(r)) throw new Error("Failed to get app status");
    return r.ok;
  }
}
function wd() {
  const { subscribe: e, update: t } = rt([]);
  let r = 0;
  function a(s) {
    t((o) => [...o, { ...s, id: ++r }]);
  }
  function n(s) {
    t((o) => o.filter((l) => l.id !== s));
  }
  return { subscribe: e, addToast: a, removeToast: n };
}
const tn = wd(),
  { addToast: Fv } = tn;
function xd() {
  async function e() {
    const r = await new Ws().getAppStatus();
    if (He(r)) throw new Error("Error fetching app status");
    let a = r;
    if (!localStorage.getItem("version")) {
      localStorage.setItem("version", a.version);
      return;
    }
    a.version !== localStorage.getItem("version") &&
      tn.addToast({
        message: `ICFC V${a.version} is now available. Click here to reload:`,
        type: "frontend-update",
      });
  }
  async function t() {
    const r = await new Ws().getAppStatus();
    if (He(r)) throw new Error("Error fetching app status");
    let a = r;
    localStorage.setItem("version", a.version),
      window.location.replace(`${window.location.pathname}?v=${a.version}`);
  }
  return { checkServerVersion: e, updateFrontend: t };
}
const hi = xd(),
  kd = async () => Ed(),
  Ed = async () => {
    await Re.signOut(), window.location.reload();
  },
  Ad = async () => {
    const e = await ct(
        () => Promise.resolve().then(() => Ev),
        void 0,
        import.meta.url,
      ),
      t = new e.default();
    return (
      (t.onmessage = async ({ data: r }) => {
        const { msg: a, data: n } = r;
        switch (a) {
          case "signOutIdleTimer":
            await kd();
            return;
          case "delegationRemainingTime":
            fd.set(n?.authRemainingTime);
            return;
        }
      }),
      {
        syncAuthIdle: (r) => {
          if (!r.identity) {
            t.postMessage({ msg: "stopIdleTimer" });
            return;
          }
          t.postMessage({ msg: "startIdleTimer" });
        },
      }
    );
  };
var Sd = O('<button class="brand-button">Update Website</button>'),
  Td = O(
    '<div><span> </span> <!> <button class="font-bold ml-4">&times;</button></div>',
  );
function Id(e, t) {
  me(t, !1);
  let r = Z(t, "toast", 8);
  st(() => {
    r().duration && r().duration > 0 && setTimeout(a, r().duration);
  });
  function a() {
    tn.removeToast(r().id);
  }
  function n() {
    hi.updateFrontend();
  }
  Ae();
  var s = Td(),
    o = v(s),
    l = v(o, !0);
  f(o);
  var u = m(o, 2);
  {
    var c = (g) => {
      var d = Sd();
      N("click", d, n), A(g, d);
    };
    D(u, (g) => {
      r().type == "frontend-update" && g(c);
    });
  }
  var p = m(u, 2);
  f(s),
    V(() => {
      le(
        s,
        1,
        `fixed top-0 left-0 right-0 z-[9999] p-4 text-white shadow-md flex justify-between items-center bg-${r().type}`,
      ),
        L(l, r().message);
    }),
    N("click", p, a),
    A(e, s),
    be();
}
var Cd = O("<div><!></div>");
function Pd(e) {
  const [t, r] = hr(),
    a = () => Nt(tn, "$toasts", t);
  var n = ge(),
    s = J(n);
  xe(
    s,
    1,
    a,
    (o) => o.id,
    (o, l) => {
      var u = Cd(),
        c = v(u);
      Id(c, {
        get toast() {
          return i(l);
        },
      }),
        f(u),
        Jt(
          1,
          u,
          () => ad,
          () => ({ y: 20, duration: 200 }),
        ),
        A(o, u);
    },
  ),
    A(e, n),
    r();
}
const Od = () => {
    const e = Bt;
    return {
      page: { subscribe: e.page.subscribe },
      navigating: { subscribe: e.navigating.subscribe },
      updated: e.updated,
    };
  },
  ds = {
    subscribe(e) {
      return Od().page.subscribe(e);
    },
  },
  Rd = "nn75s-ayupf-j6mj3-kluyb-wjj7y-eang2-dwzzr-cfdxk-etbw7-cgwnb-lqe",
  Nd = Jn(Re, ({ identity: e }) => e != null);
Jn(Re, ({ identity: e }) => e != null && e.getPrincipal().toString() === Rd);
var Bd = O(
    '<div class="nav-item expanded svelte-htsp64"><button> </button></div>',
  ),
  Gd = O(
    '<div class="nav-item expanded svelte-htsp64"><a class="brand-button" href="/profile">Profile</a> <button class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow">SIGN OUT</button></div>',
  ),
  jd = O(
    '<div class="flex min-h-screen flex-col relative nav-overlay svelte-htsp64"><div class="absolute top-4 left-4 z-10"><button class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md">-</button></div> <div class="absolute top-4 right-4 z-10"><button><span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span></button></div> <div class="nav-content flex flex-col items-start pl-10 svelte-htsp64"><!> <!></div> <div class="flex justify-between items-center p-5 text-xs lg:text-base"><div class="social-links svelte-htsp64"><a href="https://twitter.com" target="_blank" class="svelte-htsp64">TWITTER</a> <a href="https://oc.app" target="_blank" class="svelte-htsp64">OPENCHAT</a> <a href="https://youtube.com" target="_blank" class="svelte-htsp64">YOUTUBE</a></div> <div><img src="placeholder.png" alt="Profile" class="w-12 h-12 rounded-full"></div></div></div>',
  );
function Dd(e, t) {
  me(t, !1);
  const [r, a] = hr(),
    n = () => Nt(ds, "$page", r),
    s = () => Nt(p, "$navItems", r),
    o = () => Nt(Nd, "$authSignedInStore", r);
  let l = Z(t, "expanded", 8, !1),
    u = Z(t, "selectedRoute", 12, "home"),
    c = Z(t, "toggleNav", 8);
  const p = rt([
    { name: "HOME", route: "home" },
    { name: "MY GAMES", route: "games" },
    { name: "WHITEPAPER", route: "whitepaper" },
    { name: "GAME RULES", route: "game-rules" },
  ]);
  function g(k) {
    if ((u(k), c()(), k === "home")) {
      Er("/");
      return;
    }
    Er(`/${k}`);
  }
  function d() {
    c()();
  }
  function h() {
    c()(), Er("/");
  }
  function b() {
    Re.signOut();
  }
  At(
    () => n(),
    () => {
      switch (n().url.pathname) {
        case "/":
          u("home");
          break;
        case "/whitepaper":
          u("whitepaper");
          break;
        case "/game-rules":
          u("game-rules");
          break;
        case "/games":
          u("games");
          break;
        case "/governance":
          u("governance");
          break;
        default:
          u("home");
          break;
      }
    },
  ),
    Rr(),
    Ae();
  var _ = ge(),
    y = J(_);
  {
    var S = (k) => {
      var E = jd(),
        w = v(E),
        x = v(w);
      f(w);
      var C = m(w, 2),
        P = v(C);
      f(C);
      var I = m(C, 2),
        R = v(I);
      xe(
        R,
        1,
        s,
        (j) => j.route,
        (j, F) => {
          var U = Bd(),
            M = v(U),
            H = v(M, !0);
          f(M),
            f(U),
            V(() => {
              le(
                M,
                1,
                `text-3xl lg:text-6xl font-bold condensed ${(u() === i(F).route ? "text-white" : "text-black") ?? ""}`,
              ),
                L(H, i(F).name);
            }),
            N("click", M, () => g(i(F).route)),
            A(j, U);
        },
      );
      var B = m(R, 2);
      {
        var $ = (j) => {
          var F = Gd(),
            U = m(v(F), 2);
          f(F), N("click", U, b), A(j, F);
        };
        D(B, (j) => {
          o() && j($);
        });
      }
      f(I),
        we(2),
        f(E),
        N("click", x, d),
        N("click", P, h),
        Jt(
          1,
          E,
          () => ta,
          () => ({ duration: 300 }),
        ),
        Jt(
          2,
          E,
          () => ta,
          () => ({ duration: 300 }),
        ),
        A(k, E);
    };
    D(y, (k) => {
      l() && k(S);
    });
  }
  A(e, _), be(), a();
}
var Ud = O(
  '<div class="z-10 px-4 mb-20 text-center"><h1 class="mb-1 font-bold text-BrandForest">WELCOME TO <span class="condensed">GOLFPAD</span></h1> <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">THE FUTURE OF GOLF STARTS HERE</h2> <button class="brand-button">CONNECT</button></div> <div class="absolute bottom-0 left-0 z-0 w-full"><img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden"> <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex"></div>',
  1,
);
function $d(e, t) {
  me(t, !1);
  function r() {
    let o = { domain: void 0 };
    Re.signIn(o);
  }
  Ae();
  var a = Ud(),
    n = J(a),
    s = m(v(n), 4);
  f(n), we(2), N("click", s, r), A(e, a), be();
}
var Md = O(
  '<div class="flex-none h-[80px] relative"><div class="absolute z-10 top-4 left-4"><button class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md">+</button></div> <div class="absolute z-10 top-4 right-4"><a href="/"><span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span></a></div></div>',
);
function Fd(e, t) {
  let r = Z(t, "toggleNav", 8);
  var a = Md(),
    n = v(a),
    s = v(n);
  f(n),
    we(2),
    f(a),
    N("click", s, function (...o) {
      r()?.apply(this, o);
    }),
    A(e, a);
}
var Ld = O(
  '<div class="p-4 bg-gray-50 rounded-lg shadow-inner"><pre class="text-sm text-gray-700 whitespace-pre-wrap"></pre></div>',
);
function Vd(e) {
  const t = `
        Terms and Conditions
        Last Updated: 3rd March 2025

        Welcome to GolfPad (the "DAO"), a potential decentralised autonomous organisation built on the Internet Computer blockchain. By accessing or using our services, you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully.

        1. Acceptance of Terms
        By using the DAO's platform, website, or any associated services (collectively, the "Services"), you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Services.

        2. Purpose of the DAO
        The DAO is a community-driven organisation focused on enhancing the golfing experience through innovative technology, including AI-driven features. Our mission is to create value for our members by developing tools, insights, and services that improve gameplay, strategy, and community engagement.

        3. User Data Collection and Usage
        To provide and improve our Services, we collect certain user data. By using the DAO, you agree to the following:

        Data Collection: We may collect personal and non-personal information, including but not limited to:

            - Account information (e.g., username, email address)
            - Golf-related data (e.g., scores, gameplay statistics, preferences)
            - Usage data (e.g., interactions with the platform, feature usage)
            - Device information (e.g., IP address, browser type)

        Purpose of Data Usage: Your data will only be used for the following purposes:

            - To train and improve AI models that enhance the DAO's features and services.
            - To develop new tools and functionalities that add value to the DAO and its members.
            - To personalise your experience and provide tailored recommendations.
            - To ensure the security and integrity of the platform.
        
        Data Sharing: We will never sell, rent, or share your data with third-party advertisers or external entities for marketing purposes. Your data will only be used internally within the DAO to improve our Services.

        4. User Rights
        
        You retain the following rights regarding your data:

        - Access: You may request access to the personal data we hold about you.

        - Correction: You may request corrections to any inaccurate or incomplete data.

        - Deletion: You may request the deletion of your data, subject to legal and operational requirements.

        - Opt-Out: You may opt out of data collection for AI training purposes, though this may limit your access to certain features.

        To exercise these rights, please contact us at support@waterwaylabs.xyz.

        5. AI Model Training
        The DAO uses user data to train AI models that power features such as:

        - Personalised golfing tips and strategies.

        - Gameplay analysis and improvement tools.

        - Predictive analytics for golf course conditions and performance.

        By using the Services, you consent to the use of your data for these purposes. All AI models are developed solely to benefit the DAO and its members.

        6. Prohibited Activities
        You agree not to:

        - Use the Services for any illegal or unauthorised purpose.

        - Attempt to gain unauthorised access to the DAO's systems or data.

        - Interfere with or disrupt the integrity or performance of the Services.

        - Use the Services to harm others or the DAO.

        7. Intellectual Property
        All content, features, and functionality on the DAO's platform, including AI models, software, and designs, are the property of the DAO or its licensors and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.

        8. Limitation of Liability
        The DAO and its contributors are not liable for any indirect, incidental, or consequential damages arising from your use of the Services. We do not guarantee the accuracy, completeness, or reliability of any content or features provided by the AI models.

        9. Governing Law
        These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes arising from these Terms or your use of the Services will be resolved in the courts of [Insert Jurisdiction].

        10. Changes to These Terms
        We may update these Terms from time to time. If we make significant changes, we will notify you through the platform or via email. Your continued use of the Services after such changes constitutes your acceptance of the updated Terms.

        11. Contact Us
        If you have any questions or concerns about these Terms, please contact us at:

        Email: support@waterwaylabs.xyz

        Website: waterwaylabs.xyz

        Acknowledgment
        By using the DAO's Services, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
    `;
  var r = Ld(),
    a = v(r);
  (a.textContent = t), f(r), A(e, r);
}
var Hd = O('<div class="mt-4"><!></div>'),
  qd = O(
    '<div class="p-4 bg-BrandDarkGreen m-4 rounded-lg shadow-md"><h2 class="text-xl font-bold my-4">Create Your Profile</h2> <div class="space-y-4"><input id="username" placeholder="Enter your username" type="text" class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest"> <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label> <input id="handicap" placeholder="Enter your handicap" type="number" class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" min="0" max="54"> <div class="flex items-center"><input type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded"> <label class="ml-2 block text-sm text-gray-900">I agree to the <button type="button" class="text-indigo-600 hover:text-indigo-500">terms and conditions</button></label></div> <!> <button class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">Create Profile</button></div></div>',
  );
function Yd(e, t) {
  me(t, !1);
  let r = G(!1),
    a = G(!1),
    n = G(""),
    s = G(void 0);
  function o() {
    T(a, !i(a));
  }
  async function l() {
    let E = [];
    i(s) != null ? (E = [i(s)]) : (E = []);
    let w = {
      principalId: "",
      username: i(n),
      profilePictureExtension: [""],
      profilePicture: [],
      handicap: E,
    };
    await kt.createUser(w);
  }
  Ae();
  var u = qd(),
    c = m(v(u), 2),
    p = v(c);
  Oe(p);
  var g = m(p, 4);
  Oe(g);
  var d = m(g, 2),
    h = v(d);
  Oe(h);
  var b = m(h, 2),
    _ = m(v(b));
  f(b), f(d);
  var y = m(d, 2);
  {
    var S = (E) => {
      var w = Hd(),
        x = v(w);
      Vd(x), f(w), A(E, w);
    };
    D(y, (E) => {
      i(a) && E(S);
    });
  }
  var k = m(y, 2);
  f(c),
    f(u),
    V(() => (k.disabled = !i(r))),
    Be(
      p,
      () => i(n),
      (E) => T(n, E),
    ),
    Be(
      g,
      () => i(s),
      (E) => T(s, E),
    ),
    Ml(
      h,
      () => i(r),
      (E) => T(r, E),
    ),
    N("click", _, o),
    N("click", k, l),
    A(e, u),
    be();
}
var Wd = O('<div class="bg-white text-black flex-1 flex"><!></div>'),
  zd = O("<!> <!> <!> <!>", 1),
  Kd = O('<div class="flex flex-col min-h-screen default-text"><!></div>'),
  Xd = O("<div><!></div>");
function Wt(e, t) {
  me(t, !1);
  const [r, a] = hr(),
    n = () => Nt(Re, "$authStore", r),
    s = G();
  let o = G(),
    l = G(!0),
    u = G(!1),
    c = "home",
    p = G(!1),
    g = G(!1);
  const d = async () => {
    await Promise.all([h()]), T(o, await Ad());
  };
  async function h() {
    try {
      await Re.sync();
    } catch (S) {
      console.error(S);
    } finally {
    }
  }
  st(async () => {
    try {
      Re.subscribe((S) => {
        T(u, S.identity !== null && S.identity !== void 0);
      }),
        await hi.checkServerVersion(),
        kt.sync(),
        kt.subscribe((S) => {
          S && T(g, !0);
        });
    } catch {
    } finally {
      T(p, !1), T(l, !1);
    }
  });
  async function b() {
    T(p, !i(p));
  }
  At(
    () => Lc,
    () => {
      T(s, window.location.pathname === "/whitepaper");
    },
  ),
    At(
      () => (i(o), n()),
      () => {
        i(o), n(), i(o)?.syncAuthIdle(n());
      },
    ),
    At(
      () => n(),
      () => {
        (() => {
          if (n() === void 0) return;
          document.querySelector("body > #app-spinner")?.remove();
        })();
      },
    ),
    Rr(),
    Ae();
  var _ = ge();
  N("storage", An, h);
  var y = J(_);
  Cl(
    y,
    d,
    (S) => {
      var k = Xd(),
        E = v(k);
      Ys(E), f(k), Jt(1, k, () => ta), A(S, k);
    },
    (S, k) => {
      var E = Kd(),
        w = v(E);
      {
        var x = (P) => {
            Ys(P);
          },
          C = (P) => {
            var I = zd(),
              R = J(I);
            Fd(R, { toggleNav: b });
            var B = m(R, 2);
            {
              var $ = (M) => {
                  var H = ge(),
                    Y = J(H);
                  {
                    var ee = (K) => {
                        var q = Wd(),
                          de = v(q);
                        Lo(de, t, "default", {}), f(q), A(K, q);
                      },
                      z = (K) => {
                        Yd(K, {});
                      };
                    D(Y, (K) => {
                      i(g) || i(s) ? K(ee) : K(z, !1);
                    });
                  }
                  A(M, H);
                },
                j = (M) => {
                  $d(M, {});
                };
              D(B, (M) => {
                i(u) ? M($) : M(j, !1);
              });
            }
            var F = m(B, 2);
            Dd(F, {
              get expanded() {
                return i(p);
              },
              selectedRoute: c,
              toggleNav: b,
            });
            var U = m(F, 2);
            Pd(U), A(P, I);
          };
        D(w, (P) => {
          i(l) ? P(x) : P(C, !1);
        });
      }
      f(E), A(S, E);
    },
  ),
    A(e, _),
    be(),
    a();
}
var Jd = O(
  '<div class="flex flex-col md:flex-row"><div class="w-full md:w-2/3"><!></div> <div class="w-full md:w-1/3 flex flex-col"><a class="brand-button w-full" href="/whitepaper"><button class="w-full">Whitepaper</button></a> <div class="w-full"></div></div></div>',
);
function Qd(e) {
  Wt(e, {
    children: (t, r) => {
      var a = Jd(),
        n = v(a),
        s = v(n);
      {
        var o = (l) => {
          td(l);
        };
        D(s, (l) => {
          l(o);
        });
      }
      f(n), we(2), f(a), A(t, a);
    },
    $$slots: { default: !0 },
  });
}
const Zd = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Qd },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var eu = O("<span> </span>"),
  tu = O("<span> </span>"),
  ru = O('<span class="text-gray-400"> </span>'),
  au = O(
    '<input type="text" class="w-full p-2 border-b border-gray-300" placeholder="Search...">',
  ),
  nu = O(
    '<div class="p-2 cursor-pointer hover:bg-gray-200" role="button" tabindex="0"> <!></div>',
  ),
  su = O(
    '<div class="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded shadow max-h-60"><!> <!></div>',
  ),
  ou = O(
    '<div class="relative w-full"><button type="button" class="w-full p-2 text-left border border-gray-300 rounded-md cursor-pointer"><!></button> <!></div>',
  );
function Wr(e, t) {
  me(t, !1);
  const r = G();
  let a = Z(t, "items", 24, () => []),
    n = Z(t, "bindSelected", 12, null),
    s = Z(t, "placeholder", 8, "Select an Option"),
    o = Z(t, "multiple", 8, !1),
    l = Z(t, "searchEnabled", 8, !1),
    u = G(""),
    c = G(!1);
  const p = Xa();
  function g(x) {
    o()
      ? Array.isArray(n())
        ? n().find((C) => C.value === x.value)
          ? n(n().filter((C) => C.value !== x.value))
          : n([...n(), x])
        : n([x])
      : (n(x), T(c, !1)),
      p("select", { value: o() ? n() : x });
  }
  function d(x) {
    return o() && Array.isArray(n())
      ? !!n().find((C) => C.value === x.value)
      : !o() && n() && typeof n() == "object" && "value" in n()
        ? n().value === x.value
        : !1;
  }
  function h() {
    T(c, !i(c));
  }
  At(
    () => (Ra(a()), i(u)),
    () => {
      T(
        r,
        a().filter(
          (x) =>
            x && x.name && x.name.toLowerCase().includes(i(u).toLowerCase()),
        ),
      );
    },
  ),
    Rr(),
    Ae();
  var b = ou(),
    _ = v(b),
    y = v(_);
  {
    var S = (x) => {
        var C = eu(),
          P = v(C, !0);
        f(C),
          V(
            (I) => L(P, I),
            [
              () =>
                n()
                  .map((I) => I.name)
                  .join(", "),
            ],
            Te,
          ),
          A(x, C);
      },
      k = (x) => {
        var C = ge(),
          P = J(C);
        {
          var I = (B) => {
              var $ = tu(),
                j = v($, !0);
              f($), V(() => L(j, n().name)), A(B, $);
            },
            R = (B) => {
              var $ = ru(),
                j = v($, !0);
              f($), V(() => L(j, s())), A(B, $);
            };
          D(
            P,
            (B) => {
              !o() && n() && typeof n() == "object" && "name" in n()
                ? B(I)
                : B(R, !1);
            },
            !0,
          );
        }
        A(x, C);
      };
    D(y, (x) => {
      o() && Array.isArray(n()) && n().length > 0 ? x(S) : x(k, !1);
    });
  }
  f(_);
  var E = m(_, 2);
  {
    var w = (x) => {
      var C = su(),
        P = v(C);
      {
        var I = (B) => {
          var $ = au();
          Oe($),
            Be(
              $,
              () => i(u),
              (j) => T(u, j),
            ),
            A(B, $);
        };
        D(P, (B) => {
          l() && B(I);
        });
      }
      var R = m(P, 2);
      xe(
        R,
        1,
        () => i(r),
        (B) => B.value,
        (B, $) => {
          var j = nu(),
            F = v(j),
            U = m(F);
          {
            var M = (H) => {
              var Y = dr("✔");
              A(H, Y);
            };
            D(U, (H) => {
              d(i($)) && H(M);
            });
          }
          f(j),
            V(() => L(F, `${i($).name ?? ""} `)),
            N("click", j, () => g(i($))),
            N("keydown", j, (H) => H.key === "Enter" && g(i($))),
            A(B, j);
        },
      ),
        f(C),
        A(x, C);
    };
    D(E, (x) => {
      i(c) && x(w);
    });
  }
  f(b),
    N("click", _, h),
    N("keydown", _, (x) => x.key === "Enter" && h()),
    A(e, b),
    be();
}
var _n = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class ba {
  constructor() {
    Dr(this, "actor");
    this.actor = je.createActor(rr, _n.BACKEND_CANISTER_ID);
  }
  async getCourse(t) {
    const r = await this.actor.getCourse(t);
    if (He(r)) throw new Error("Failed to get course");
    return r.ok;
  }
  async getCourses(t) {
    const r = await this.actor.listCourses(t);
    if (He(r)) throw new Error("Failed to get courses");
    return r.ok;
  }
  async createCourse(t) {
    const a = await (
      await je.createIdentityActor(Re, _n.BACKEND_CANISTER_ID)
    ).createGolfCourse(t);
    if ((console.log("Result: ", a), He(a)))
      throw new Error("Error Creating Course");
    return a;
  }
  async updateCourse(t) {
    const a = await (
      await je.createIdentityActor(Re, _n.BACKEND_CANISTER_ID)
    ).updateGolfCourse(t);
    if (He(a)) throw new Error("Error Updating Course");
  }
}
function iu() {
  const { subscribe: e, set: t } = rt([]);
  async function r(o) {
    return await new ba().getCourse(o);
  }
  async function a(o) {
    return (await new ba().getCourses(o)).courses;
  }
  async function n(o) {
    return await new ba().createCourse(o);
  }
  async function s(o) {
    return await new ba().updateCourse(o);
  }
  return {
    subscribe: e,
    setCourse: (o) => t(o),
    getCourse: r,
    getCourses: a,
    createCourse: n,
    updateCourse: s,
  };
}
const Ar = iu();
var lu = Uo(
  '<svg viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.125 22.3125C13.125 20.139 14.889 18.375 17.0625 18.375C19.236 18.375 21 20.139 21 22.3125C21 24.4886 19.236 26.25 17.0625 26.25C14.889 26.25 13.125 24.4886 13.125 22.3125ZM36.75 23.625L30.1376 34.125L23.625 28.98L13.125 44.625H49.875L36.75 23.625ZM57.75 13.125V49.875H5.25V13.125H57.75ZM63 7.875H0V55.125H63V7.875Z"></path></svg>',
);
function us(e, t) {
  me(t, !1);
  let r = Z(t, "className", 8, "");
  const a = "";
  var n = lu(),
    s = v(n);
  return (
    te(s, "fill", a),
    f(n),
    V(() => le(n, 0, Vo(r()))),
    A(e, n),
    Fl(t, "fill", a),
    be({ fill: a })
  );
}
var cu = O(
    '<span class="px-1.5 py-0.5 text-2xs font-bold text-white rounded-full"> </span>',
  ),
  du = O(
    '<span class="px-2 py-1 text-xs font-bold text-white rounded-full"> </span>',
  ),
  uu = O(
    '<button type="button"><div class="absolute flex flex-wrap gap-1 top-2 right-2 md:hidden"></div> <div class="flex items-center gap-2 md:gap-4"><div><span class="text-xs text-BrandDarkGray md:text-sm">ID</span> <h3 class="text-base text-black condensed md:text-lg"> </h3></div> <img src="golfCourse.png" alt="Course Thumbnail" class="w-8 h-8 rounded md:w-10 md:h-10"></div> <div class="flex items-center justify-between flex-1"><h3 class="text-base text-black condensed md:text-lg"> </h3> <div class="flex-wrap hidden gap-2 md:flex"></div></div></button>',
  ),
  fu = O(
    '<div class="flex flex-col gap-3 mb-3 text-black md:flex-row md:gap-4 md:mb-4"><div class="w-full md:w-1/2"><label for="courseName" class="block mb-1 text-xs font-medium text-BrandDarkGray md:text-sm">Course Name</label> <input id="courseName" type="text" placeholder="Search"></div> <div class="w-full md:w-1/2"><label for="country" class="block mb-1 text-xs font-medium text-BrandDarkGray md:text-sm">Country</label> <!></div></div> <div class="space-y-2 md:space-y-4"></div>',
    1,
  ),
  vu = O(
    '<div class="flex items-center justify-center w-12 h-12 rounded bg-BrandLightGray"><!></div>',
  ),
  pu = O(
    '<div class="flex gap-4"><div class="flex-1"><label for="teeName" class="block mb-2 text-sm font-bold">TEE NAME</label> <input id="teeName" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter"></div> <div class="flex-1"><label for="teeColor" class="block mb-2 text-sm font-bold">COLOR</label> <input id="teeColor" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter"></div></div>',
  ),
  hu = O(
    '<div class="flex flex-col space-y-6"><div class="flex flex-col gap-4"><div class="basis-1/2"><label for="teeName" class="block mb-2 text-sm font-bold">TEE NAME</label> <input id="teeName" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter"></div> <div class="basis-1/2"><label for="teeColorPicker" class="block mb-2 text-sm font-bold">COLOR</label> <div class="flex items-center gap-2"><div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"><input id="teeColorPicker" type="color" class="w-full h-full border-none cursor-pointer"></div> <input type="text" class="flex-1 p-3 text-black bg-white border border-gray-300 rounded" placeholder="Hex code"></div></div></div></div>',
  ),
  gu = O(
    '<tr class="hover:bg-BrandLightGray"><td class="p-4 text-lg border-b condensed"></td><td class="p-4 border-b"><input type="text" placeholder="Enter"></td><td class="p-4 border-b"><input type="text" placeholder="Enter"></td><td class="p-4 border-b"><input type="text" placeholder="Enter"></td></tr>',
  ),
  mu = O(
    '<div class="overflow-x-auto"><div class="overflow-y-auto max-h-[50vh]"><table class="min-w-full bg-white border-collapse"><thead><tr><th class="p-4 text-xl text-left border-b condensed text-Black">HOLE</th><th class="p-4 text-xl text-left border-b condensed text-Black">PAR</th><th class="p-4 text-xl text-left border-b condensed text-Black">S.I.</th><th class="p-4 text-xl text-left border-b condensed text-Black">YARDS</th></tr></thead><tbody></tbody></table></div></div>',
  ),
  bu = O(
    '<div class="flex flex-col space-y-6"><div class="flex gap-4"><div class="basis-4/5"><label for="courseNameInput" class="block mb-2 text-sm font-bold">COURSE NAME</label> <input id="courseNameInput" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter Course Name"></div> <div class="basis-1/5"><label for="courseImageUpload" class="block mb-2 text-sm font-bold">COURSE IMAGE</label> <div class="flex items-center gap-1"><!> <div class="flex items-center gap-2"><button id="courseImageUpload" type="button" class="brand-button">UPLOAD</button> <span class="text-xs text-BrandDarkGray">800px x 800px min</span></div></div></div></div> <div class="flex flex-col gap-4"><div class="flex flex-col gap-4 items-left"><div class="flex items-center gap-4"><button>BASIC</button> <button>ADVANCED</button></div> <div class="flex flex-row justify-between gap-4"><div class="flex flex-col px-2"><label for="addTee" class="block mb-2 text-sm font-bold">TEES</label> <button id="addTee" type="button" class="brand-button">+</button></div> <div><label for="copyFromTeeGroup" class="block mb-2 text-sm font-bold">COPY FROM EXISTING TEE GROUP</label> <!></div></div></div> <!> <!> <div class="flex justify-end"><button type="button">CREATE TEE</button></div> <!></div></div>',
  ),
  yu = O(
    '<div class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"><div class="relative z-10 w-full md:w-[80vw] lg:w-[60vw] h-[95vh] overflow-y-auto bg-white rounded-lg shadow-xl"><div class="flex items-center justify-between p-3 md:p-4"><h2 class="text-2xl text-black md:text-3xl condensed">ADD HOME COURSE</h2> <button class="cancel-button" type="button" aria-label="Close">✕</button></div> <div class="px-3 pt-2 pb-2 md:px-6 md:pt-4"><p class="text-sm md:text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p></div> <div class="flex px-3 pt-4 md:px-6"><button>SEARCH</button> <button>ADD CUSTOM</button></div> <div class="p-3 md:p-6"><!></div> <div class="flex justify-end gap-3 p-3 border-t md:p-4 md:border-t-0"><button class="cancel-button">CANCEL</button> <button type="button">ADD COURSE</button></div></div></div>',
  );
function gi(e, t) {
  me(t, !1);
  let r = Z(t, "isOpen", 8, !1),
    a = Z(t, "selectedCourse", 12, null);
  const n = Xa();
  let s = G([]),
    o = null,
    l = G("ADD_CUSTOM"),
    u = G("ADVANCED"),
    c = G(""),
    p = G("Test Golf Club"),
    g = [],
    d = G({
      name: "Championship",
      colour: "#000000",
      strokeIndex: 0,
      added: BigInt(Date.now()),
      holes: Array(18)
        .fill(null)
        .map((P, I) => ({
          number: I + 1,
          name: `Hole ${I + 1}`,
          images: [],
          tees: [
            {
              name: "Championship",
              colour: "#000000",
              yardage: BigInt(350 + I * 10),
              par: 4,
              strokeIndex: I + 1,
            },
          ],
        })),
    }),
    h = G(
      Array(18)
        .fill(null)
        .map((P, I) => ({
          name: "Championship",
          colour: "#000000",
          yardage: 350 + I * 10,
          par: 4,
          strokeIndex: I + 1,
        })),
    ),
    b = null,
    _ = G(!1);
  st(async () => {
    try {
      const P = { limit: BigInt(10), offset: BigInt(0) };
      T(s, await Ar.getCourses(P));
    } catch (P) {
      console.error("Error fetching courses:", P);
    }
  });
  function y() {
    n("close");
  }
  async function S() {
    try {
      if (i(l) === "SEARCH" && a()) n("courseSelect", { course: a() }), y();
      else if (i(l) === "ADD_CUSTOM") {
        if (!i(p) || !i(d).name || !i(d).colour) {
          console.error(
            "Course name, tee group name, and tee group color are required",
          );
          return;
        }
        if (i(u) === "ADVANCED" && !k()) {
          console.error("All 18 holes must have complete data");
          return;
        }
        const P = {
          name: i(p),
          initialTeeGroup: {
            name: i(d).name,
            colour: i(d).colour,
            added: BigInt(Date.now()),
            strokeIndex: i(d).strokeIndex ?? 0,
            holes:
              i(u) === "ADVANCED"
                ? i(d).holes
                : Array(18)
                    .fill(null)
                    .map(($, j) => ({
                      number: j + 1,
                      name: `Hole ${j + 1}`,
                      images: [],
                      tees: [
                        {
                          name: i(d).name || "",
                          colour: i(d).colour || "",
                          yardage: BigInt(0),
                          par: 4,
                          strokeIndex: j + 1,
                        },
                      ],
                    })),
          },
          holes: [],
        };
        console.log("Creating Golf Course: ", P), await Ar.createCourse(P);
        const I = { limit: BigInt(10), offset: BigInt(0) },
          B = (await Ar.getCourses(I)).find(($) => $.name === i(p));
        B && n("courseSelect", { course: B }), y();
      }
    } catch (P) {
      console.error("Error saving course:", P);
    }
  }
  function k() {
    return i(d).holes.length !== 18
      ? (console.log("Not enough holes:", i(d).holes.length), !1)
      : i(d).holes.every((P, I) =>
          P.number !== I + 1
            ? (console.log(`Invalid hole number at index ${I}`), !1)
            : !P.tees || P.tees.length === 0
              ? (console.log(`No tees for hole ${P.number}`), !1)
              : P.tees.every((R) => {
                  const B =
                    R.name &&
                    R.colour &&
                    typeof R.yardage < "u" &&
                    typeof R.par < "u" &&
                    typeof R.strokeIndex < "u";
                  return (
                    B ||
                      console.log(`Invalid tee data for hole ${P.number}:`, R),
                    B
                  );
                }),
        );
  }
  function E() {
    return !i(p) || !i(d).name || !i(d).colour
      ? !1
      : i(u) === "ADVANCED"
        ? k()
        : !0;
  }
  Ae();
  var w = ge(),
    x = J(w);
  {
    var C = (P) => {
      var I = yu(),
        R = v(I),
        B = v(R),
        $ = m(v(B), 2);
      f(B);
      var j = m(B, 4),
        F = v(j);
      let U;
      var M = m(F, 2);
      let H;
      f(j);
      var Y = m(j, 2),
        ee = v(Y);
      {
        var z = (ve) => {
            var ye = fu(),
              $e = J(ye),
              X = v($e),
              ke = m(v(X), 2);
            Oe(ke);
            let qe;
            f(X);
            var Me = m(X, 2),
              at = m(v(Me), 2);
            Wr(at, {
              items: [
                { value: "us", name: "United States" },
                { value: "uk", name: "United Kingdom" },
                { value: "ca", name: "Canada" },
                { value: "au", name: "Australia" },
              ],
              bindSelected: o,
              placeholder: "Select Country",
              searchEnabled: !1,
              multiple: !1,
            }),
              f(Me),
              f($e);
            var De = m($e, 2);
            xe(
              De,
              5,
              () =>
                i(s).filter((ue) =>
                  ue.name.toLowerCase().includes(i(c).toLowerCase()),
                ),
              Ge,
              (ue, oe) => {
                var Ee = uu();
                let Fe;
                var Ue = v(Ee);
                xe(
                  Ue,
                  5,
                  () => i(oe).tees,
                  Ge,
                  (Le, ft) => {
                    var ot = cu(),
                      ze = v(ot, !0);
                    f(ot),
                      V(() => {
                        te(
                          ot,
                          "style",
                          `background-color: ${i(ft).colour ?? ""}`,
                        ),
                          L(ze, i(ft).name);
                      }),
                      A(Le, ot);
                  },
                ),
                  f(Ue);
                var Ce = m(Ue, 2),
                  Ye = v(Ce),
                  We = m(v(Ye), 2),
                  W = v(We, !0);
                f(We), f(Ye), we(2), f(Ce);
                var ne = m(Ce, 2),
                  ie = v(ne),
                  Se = v(ie, !0);
                f(ie);
                var _e = m(ie, 2);
                xe(
                  _e,
                  5,
                  () => i(oe).tees,
                  Ge,
                  (Le, ft) => {
                    var ot = du(),
                      ze = v(ot, !0);
                    f(ot),
                      V(() => {
                        te(
                          ot,
                          "style",
                          `background-color: ${i(ft).colour ?? ""}`,
                        ),
                          L(ze, i(ft).name);
                      }),
                      A(Le, ot);
                  },
                ),
                  f(_e),
                  f(ne),
                  f(Ee),
                  V(() => {
                    (Fe = le(Ee, 1, "brand-button", null, Fe, {
                      "bg-BrandLightGray": a() === i(oe),
                    })),
                      L(W, i(oe).courseId),
                      L(Se, i(oe).name);
                  }),
                  N("click", Ee, () => a(i(oe))),
                  N("keydown", Ee, (Le) => Le.key === "Enter" && a(i(oe))),
                  A(ue, Ee);
              },
            ),
              f(De),
              V(
                () =>
                  (qe = le(
                    ke,
                    1,
                    "w-full p-2 text-sm text-black rounded md:text-base",
                    null,
                    qe,
                    { "bg-BrandLightGray": !i(c), "bg-white": i(c) },
                  )),
              ),
              Be(
                ke,
                () => i(c),
                (ue) => T(c, ue),
              ),
              A(ve, ye);
          },
          K = (ve) => {
            var ye = ge(),
              $e = J(ye);
            {
              var X = (ke) => {
                var qe = bu(),
                  Me = v(qe),
                  at = v(Me),
                  De = m(v(at), 2);
                Oe(De), f(at);
                var ue = m(at, 2),
                  oe = m(v(ue), 2),
                  Ee = v(oe);
                {
                  var Fe = (Pe) => {
                    var Ze = vu(),
                      xt = v(Ze);
                    us(xt, { className: "w-6 h-6 fill-black" }),
                      f(Ze),
                      A(Pe, Ze);
                  };
                  D(Ee, (Pe) => {
                    Pe(Fe, !1);
                  });
                }
                we(2), f(oe), f(ue), f(Me);
                var Ue = m(Me, 2),
                  Ce = v(Ue),
                  Ye = v(Ce),
                  We = v(Ye);
                let W;
                var ne = m(We, 2);
                let ie;
                f(Ye);
                var Se = m(Ye, 2),
                  _e = v(Se),
                  Le = m(v(_e), 2);
                f(_e);
                var ft = m(_e, 2),
                  ot = m(v(ft), 2);
                const ze = Te(() =>
                  g.map((Pe) => ({ name: Pe.name, value: Pe })),
                );
                Wr(ot, {
                  get items() {
                    return i(ze);
                  },
                  bindSelected: b,
                  placeholder: "Select Tee Group",
                  searchEnabled: !0,
                  multiple: !1,
                }),
                  f(ft),
                  f(Se),
                  f(Ce);
                var It = m(Ce, 2);
                {
                  var rn = (Pe) => {
                    var Ze = pu(),
                      xt = v(Ze),
                      Gt = m(v(xt), 2);
                    Oe(Gt), f(xt);
                    var zt = m(xt, 2),
                      ar = m(v(zt), 2);
                    Oe(ar),
                      f(zt),
                      f(Ze),
                      Be(
                        Gt,
                        () => i(d).name,
                        (nr) => vt(d, (i(d).name = nr)),
                      ),
                      Be(
                        ar,
                        () => i(d).colour,
                        (nr) => vt(d, (i(d).colour = nr)),
                      ),
                      A(Pe, Ze);
                  };
                  D(It, (Pe) => {
                    i(u) === "BASIC" && Pe(rn);
                  });
                }
                var fs = m(It, 2);
                {
                  var yi = (Pe) => {
                    var Ze = hu(),
                      xt = v(Ze),
                      Gt = v(xt),
                      zt = m(v(Gt), 2);
                    Oe(zt), f(Gt);
                    var ar = m(Gt, 2),
                      nr = m(v(ar), 2),
                      Ve = v(nr),
                      sr = v(Ve);
                    Oe(sr), f(Ve);
                    var mr = m(Ve, 2);
                    Oe(mr),
                      f(nr),
                      f(ar),
                      f(xt),
                      f(Ze),
                      Be(
                        zt,
                        () => i(d).name,
                        (it) => vt(d, (i(d).name = it)),
                      ),
                      Be(
                        sr,
                        () => i(d).colour,
                        (it) => vt(d, (i(d).colour = it)),
                      ),
                      N("input", sr, (it) => {
                        vt(d, (i(d).colour = it.currentTarget.value));
                      }),
                      Be(
                        mr,
                        () => i(d).colour,
                        (it) => vt(d, (i(d).colour = it)),
                      ),
                      N("input", mr, (it) => {
                        vt(d, (i(d).colour = it.currentTarget.value));
                      }),
                      A(Pe, Ze);
                  };
                  D(fs, (Pe) => {
                    i(u) === "ADVANCED" && Pe(yi);
                  });
                }
                var an = m(fs, 2),
                  nn = v(an);
                let vs;
                f(an);
                var _i = m(an, 2);
                {
                  var wi = (Pe) => {
                    var Ze = mu(),
                      xt = v(Ze),
                      Gt = v(xt),
                      zt = m(v(Gt));
                    xe(
                      zt,
                      5,
                      () => i(h),
                      Ge,
                      (ar, nr, Ve) => {
                        var sr = gu(),
                          mr = v(sr);
                        mr.textContent = Ve + 1;
                        var it = m(mr),
                          sn = v(it);
                        Oe(sn);
                        let ps;
                        f(it);
                        var on = m(it),
                          ln = v(on);
                        Oe(ln);
                        let hs;
                        f(on);
                        var gs = m(on),
                          cn = v(gs);
                        Oe(cn);
                        let ms;
                        f(gs),
                          f(sr),
                          V(() => {
                            (ps = le(
                              sn,
                              1,
                              "w-full p-2 text-black border rounded",
                              null,
                              ps,
                              {
                                "bg-BrandLightGray": !i(h)[Ve].par,
                                "bg-white": i(h)[Ve].par,
                              },
                            )),
                              (hs = le(
                                ln,
                                1,
                                "w-full p-2 text-black border rounded",
                                null,
                                hs,
                                {
                                  "bg-BrandLightGray": !i(h)[Ve].strokeIndex,
                                  "bg-white": i(h)[Ve].strokeIndex,
                                },
                              )),
                              (ms = le(
                                cn,
                                1,
                                "w-full p-2 text-black border rounded",
                                null,
                                ms,
                                {
                                  "bg-BrandLightGray": !i(h)[Ve].yardage,
                                  "bg-white": i(h)[Ve].yardage,
                                },
                              ));
                          }),
                          Be(
                            sn,
                            () => i(h)[Ve].par,
                            (jr) => vt(h, (i(h)[Ve].par = jr)),
                          ),
                          Be(
                            ln,
                            () => i(h)[Ve].strokeIndex,
                            (jr) => vt(h, (i(h)[Ve].strokeIndex = jr)),
                          ),
                          Be(
                            cn,
                            () => i(h)[Ve].yardage,
                            (jr) => vt(h, (i(h)[Ve].yardage = jr)),
                          ),
                          A(ar, sr);
                      },
                    ),
                      f(zt),
                      f(Gt),
                      f(xt),
                      f(Ze),
                      A(Pe, Ze);
                  };
                  D(_i, (Pe) => {
                    i(_) && Pe(wi);
                  });
                }
                f(Ue),
                  f(qe),
                  V(() => {
                    (W = le(We, 1, "brand-button", null, W, {
                      "text-BrandForest": i(u) === "BASIC",
                      "text-BrandDarkGray": i(u) !== "BASIC",
                    })),
                      (ie = le(ne, 1, "brand-button", null, ie, {
                        "text-BrandForest": i(u) === "ADVANCED",
                        "text-BrandDarkGray": i(u) !== "ADVANCED",
                      })),
                      (vs = le(nn, 1, "brand-button", null, vs, {
                        "bg-BrandLightGray": !i(d).name || !i(d).colour,
                        "text-BrandDarkGray": !i(d).name || !i(d).colour,
                        "bg-BrandForest": i(d).name && i(d).colour,
                        "text-BrandYellow": i(d).name && i(d).colour,
                      })),
                      (nn.disabled = !i(d).name || !i(d).colour);
                  }),
                  Be(
                    De,
                    () => i(p),
                    (Pe) => T(p, Pe),
                  ),
                  N("click", We, () => T(u, "BASIC")),
                  N("click", ne, () => T(u, "ADVANCED")),
                  N("click", Le, () => {
                    console.log("All 18 holes are already added");
                  }),
                  N("click", nn, () => T(_, !0)),
                  A(ke, qe);
              };
              D(
                $e,
                (ke) => {
                  i(l) === "ADD_CUSTOM" && ke(X);
                },
                !0,
              );
            }
            A(ve, ye);
          };
        D(ee, (ve) => {
          i(l) === "SEARCH" ? ve(z) : ve(K, !1);
        });
      }
      f(Y);
      var q = m(Y, 2),
        de = v(q),
        he = m(de, 2);
      let Ie;
      f(q),
        f(R),
        f(I),
        V(
          (ve, ye) => {
            (U = le(F, 1, "brand-button", null, U, {
              "text-BrandForest": i(l) === "SEARCH",
              "text-BrandDarkGray": i(l) !== "SEARCH",
            })),
              (H = le(M, 1, "brand-button", null, H, {
                "text-BrandForest": i(l) === "ADD_CUSTOM",
                "text-BrandDarkGray": i(l) !== "ADD_CUSTOM",
              })),
              (Ie = le(he, 1, "brand-button", null, Ie, {
                "bg-BrandLightGray": ve,
                "text-BrandDarkGray": ve,
                "bg-BrandForest": ye,
                "text-BrandYellow": ye,
              }));
          },
          [() => !E(), E],
          Te,
        ),
        N("click", $, y),
        N("click", F, () => T(l, "SEARCH")),
        N("click", M, () => T(l, "ADD_CUSTOM")),
        N("click", de, y),
        N("click", he, S),
        A(P, I);
    };
    D(x, (P) => {
      r() && P(C);
    });
  }
  A(e, w), be();
}
Jn(kt, (e) => {
  try {
    let t;
    if (e && e.profilePicture) {
      if (
        Array.isArray(e.profilePicture) &&
        e.profilePicture[0] instanceof Uint8Array
      )
        return (
          (t = e.profilePicture[0]),
          `data:image/${e.profilePictureType};base64,${qs(t)}`
        );
      if (e.profilePicture instanceof Uint8Array)
        return `data:${e.profilePictureType};base64,${qs(e.profilePicture)}`;
      if (typeof e.profilePicture == "string")
        return e.profilePicture.startsWith("data:image")
          ? e.profilePicture
          : `data:${e.profilePictureType};base64,${e.profilePicture}`;
    }
    return "placeholder.png";
  } catch (t) {
    return console.error(t), "placeholder.png";
  }
});
const zs = (e) => "golfCourse.png";
var _u = O('<span class="px-2 py-1 text-sm text-black rounded-full"> </span>'),
  wu = O(
    '<div class="grid items-center grid-cols-2 p-3 mb-2 bg-white rounded gap-y-4"><div class="flex items-center"><img class="object-cover w-16 h-16 mr-4 rounded-md"> <span class="text-2xl text-black condensed"> </span></div> <div class="flex items-center justify-between space-x-2 text-black"><!> <button class="px-5 py-1 text-sm rounded text-BrandYellow bg-BrandForest">VIEW</button></div></div>',
  ),
  xu = O('<span class="px-3 py-1 text-sm text-white rounded-full"> </span>'),
  ku = O('<span class="px-3 py-1 text-sm text-black rounded-full"> </span>'),
  Eu = O(
    '<div class="p-4 bg-white rounded-lg"><div class="sm:hidden"><div class="flex items-center mb-4"><img class="w-16 h-16 mr-4 rounded-lg"> <span class="text-2xl text-black condensed"> </span></div> <div class="h-px mb-4 bg-BrandDivider"></div> <div class="flex flex-wrap gap-2"></div></div> <div class="hidden sm:block"><div class="flex items-center justify-between mb-4"><div class="flex items-center"><img class="w-16 h-16 mr-4 rounded-lg"> <span class="text-2xl text-black condensed"> </span></div> <div class="flex items-center gap-2"></div></div></div> <button class="w-full py-2 mt-4 text-sm rounded text-BrandYellow bg-BrandForest">VIEW</button></div>',
  ),
  Au = O(
    '<div class="w-full bg-white"><div class="flex items-center justify-between px-8 pt-4"><h2 class="text-4xl text-black condensed">MY COURSES</h2> <button class="hidden md:block btn btn-new-game">ADD NEW COURSE</button></div> <div class="w-full h-full px-2 pt-4"><div class="hidden p-2 rounded lg:block bg-BrandLightGray"><div class="grid items-center grid-cols-2 gap-4 p-4 text-xl text-black condensed"><span>NAME</span> <span>TEES</span></div> <div class="overflow-y-auto max-h-[60vh] p-2"></div></div> <div class="space-y-4 lg:hidden"></div> <button class="w-full py-2 mt-6 text-xl lg:hidden bg-BrandYellow text-BrandForest">ADD NEW COURSE</button></div> <!></div>',
  );
function Su(e, t) {
  me(t, !1);
  let r = [],
    a = G(!1),
    n = G([]),
    s = G(null);
  st(async () => {
    try {
      const l = { limit: BigInt(10), offset: BigInt(0) };
      (r = await Ar.getCourses(l)),
        T(
          n,
          r.map((u) => ({
            ...u,
            teeColors: u.tees.map((c) => ({ name: c.name, color: o(c.name) })),
          })),
        ),
        console.log("Courses Tees:", i(n));
    } catch (l) {
      console.error("Error fetching courses:", l);
    }
  });
  function o(l) {
    switch (l.toLowerCase()) {
      case "black":
        return "#000000";
      case "blue":
        return "#0000FF";
      case "green":
        return "#008000";
      case "orange":
        return "#FFA500";
      case "pink":
        return "#FFC0CB";
      case "red":
        return "#FF0000";
      case "white":
        return "#FFFFFF";
      case "yellow":
      case "gold":
        return "#FFFF00";
      default:
        return "#CCCCCC";
    }
  }
  Ae(),
    Wt(e, {
      children: (l, u) => {
        var c = Au(),
          p = v(c),
          g = m(v(p), 2);
        f(p);
        var d = m(p, 2),
          h = v(d),
          b = m(v(h), 2);
        xe(
          b,
          5,
          () => i(n),
          Ge,
          (E, w) => {
            var x = wu(),
              C = v(x),
              P = v(C),
              I = m(P, 2),
              R = v(I, !0);
            f(I), f(C);
            var B = m(C, 2),
              $ = v(B);
            xe(
              $,
              1,
              () => i(w).teeColors,
              Ge,
              (j, F) => {
                var U = _u(),
                  M = v(U, !0);
                f(U),
                  V(() => {
                    te(U, "style", `background-color: ${i(F).color ?? ""};`),
                      L(M, i(F).name);
                  }),
                  A(j, U);
              },
            ),
              we(2),
              f(B),
              f(x),
              V(
                (j) => {
                  te(P, "src", j), te(P, "alt", i(w).name), L(R, i(w).name);
                },
                [() => zs(i(w))],
                Te,
              ),
              A(E, x);
          },
        ),
          f(b),
          f(h);
        var _ = m(h, 2);
        xe(
          _,
          5,
          () => i(n),
          Ge,
          (E, w) => {
            var x = Eu(),
              C = v(x),
              P = v(C),
              I = v(P),
              R = m(I, 2),
              B = v(R, !0);
            f(R), f(P);
            var $ = m(P, 4);
            xe(
              $,
              5,
              () => i(w).teeColors,
              Ge,
              (z, K) => {
                var q = xu(),
                  de = v(q, !0);
                f(q),
                  V(() => {
                    te(q, "style", `background-color: ${i(K).color ?? ""};`),
                      L(de, i(K).name);
                  }),
                  A(z, q);
              },
            ),
              f($),
              f(C);
            var j = m(C, 2),
              F = v(j),
              U = v(F),
              M = v(U),
              H = m(M, 2),
              Y = v(H, !0);
            f(H), f(U);
            var ee = m(U, 2);
            xe(
              ee,
              5,
              () => i(w).teeColors,
              Ge,
              (z, K) => {
                var q = ku(),
                  de = v(q, !0);
                f(q),
                  V(() => {
                    te(q, "style", `background-color: ${i(K).color ?? ""};`),
                      L(de, i(K).name);
                  }),
                  A(z, q);
              },
            ),
              f(ee),
              f(F),
              f(j),
              we(2),
              f(x),
              V(
                (z) => {
                  te(I, "src", z),
                    te(I, "alt", i(w).name),
                    L(B, i(w).name),
                    te(M, "src", z),
                    te(M, "alt", i(w).name),
                    L(Y, i(w).name);
                },
                [() => zs(i(w))],
                Te,
              ),
              A(E, x);
          },
        ),
          f(_);
        var y = m(_, 2);
        f(d);
        var S = m(d, 2);
        {
          var k = (E) => {
            gi(E, {
              get isOpen() {
                return i(a);
              },
              $$events: {
                close: () => T(a, !1),
                courseSelect: (w) => {
                  T(s, w.detail.course), T(a, !1);
                },
              },
            });
          };
          D(S, (E) => {
            i(a) && E(k);
          });
        }
        f(c),
          N("click", g, () => T(a, !0)),
          N("click", y, () => T(a, !0)),
          A(l, c);
      },
      $$slots: { default: !0 },
    }),
    be();
}
const Tu = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Su },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Iu = O(
    '<img alt="Course thumbnail" class="object-cover w-16 h-16 rounded">',
  ),
  Cu = O(
    '<div class="flex items-center justify-center w-12 h-12 rounded bg-BrandLightGray"><!></div>',
  ),
  Pu = O(
    '<div class="fixed inset-0 z-50 flex items-center justify-center"><div class="relative z-50 w-full md:h-auto md:w-[60vw] overflow-y-auto bg-white rounded-lg"><div class="sticky top-0 z-10 flex items-center justify-between p-3 bg-white border-b md:p-4"><h2 class="text-2xl text-black md:text-3xl condensed">EDIT HOME COURSE</h2> <button class="cancel-button" type="button" aria-label="Close">✕</button></div> <div class="p-3 md:p-6"><p class="text-sm md:text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p> <div class="mt-4 md:mt-6"><label for="courseNameInput" class="block mb-2 text-sm font-bold text-BrandDarkGray">COURSE NAME</label> <input id="courseNameInput" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter Course Name"></div> <div class="mt-4 md:mt-6"><label for="courseImageUpload" class="block mb-2 text-sm font-bold">COURSE IMAGE</label> <div class="flex items-center gap-2"><!> <div class="flex flex-col gap-1"><button id="courseImageUpload" type="button" class="brand-button">UPLOAD</button> <span class="text-2xs md:text-xs text-BrandDarkGray">800px x 800px min</span></div></div></div></div> <div class="sticky bottom-0 flex justify-end gap-2 p-3 bg-white border-t md:p-4"><button class="cancel-button">CANCEL</button> <button type="button">SAVE CHANGES</button></div></div></div>',
  );
function Ou(e, t) {
  me(t, !1);
  let r = Z(t, "isOpen", 8, !1),
    a = Z(t, "holes", 24, () => []),
    n = Z(t, "courseName", 12, ""),
    s = Z(t, "courseImage", 8, "");
  const o = Xa();
  function l() {
    o("close");
  }
  function u() {
    o("save", { holes: a() });
  }
  function c() {
    return n().trim().length > 0;
  }
  Ae();
  var p = ge(),
    g = J(p);
  {
    var d = (h) => {
      var b = Pu(),
        _ = v(b),
        y = v(_),
        S = m(v(y), 2);
      f(y);
      var k = m(y, 2),
        E = m(v(k), 2),
        w = m(v(E), 2);
      Oe(w), f(E);
      var x = m(E, 2),
        C = m(v(x), 2),
        P = v(C);
      {
        var I = (U) => {
            var M = Iu();
            V(() => te(M, "src", s())), A(U, M);
          },
          R = (U) => {
            var M = Cu(),
              H = v(M);
            us(H, { className: "w-6 h-6 fill-black" }), f(M), A(U, M);
          };
        D(P, (U) => {
          s() ? U(I) : U(R, !1);
        });
      }
      we(2), f(C), f(x), f(k);
      var B = m(k, 2),
        $ = v(B),
        j = m($, 2);
      let F;
      f(B),
        f(_),
        f(b),
        V(
          (U, M) =>
            (F = le(j, 1, "brand-button", null, F, {
              "bg-BrandLightGray": U,
              "text-BrandDarkGray": U,
              "bg-BrandForest": M,
              "text-BrandYellow": M,
            })),
          [() => !c(), c],
          Te,
        ),
        N("click", S, l),
        Be(w, n),
        N("click", $, l),
        N("click", j, u),
        A(h, b);
    };
    D(g, (h) => {
      r() && h(d);
    });
  }
  A(e, p), be();
}
var Ru = O(
    '<div class="flex flex-col"><h3 class="hidden mb-4 text-xl text-black lg:block condensed">DETAILS</h3> <div class="flex flex-col"><p class="block pt-8 text-sm text-BrandDarkGray">COURSE NAME</p> <h2 class="text-5xl text-black md:text-6xl condensed"> </h2></div> <div class="flex flex-col"><p class="block pt-8 text-sm text-BrandDarkGray">LOCATION</p> <h1 class="text-2xl text-black condensed">UNITED KINGDOM</h1></div> <div class="w-full h-px my-4 bg-BrandDivider sm:hidden"></div></div>',
  ),
  Nu = O(
    '<span class="inline-block px-2 py-1 text-sm text-white rounded-full max-w-max"> </span>',
  ),
  Bu = O(
    '<tr><td class="p-3 text-black condensed"> </td><td class="p-3 text-black"> </td><td class="p-3 text-black"> </td><td class="p-3 text-black"> </td></tr>',
  ),
  Gu = O(
    '<div class="grid grid-cols-4 gap-4 p-2 text-black bg-white border-t"><div class="text-lg condensed"> </div> <div class="text-lg"> </div> <div class="text-lg"> </div> <div class="text-lg"> </div></div>',
  ),
  ju = O(
    '<div class="w-full"><div class="p-2 px-4 text-black"><div class="flex items-center justify-between"><h2 class="text-5xl text-black md:text-4xl condensed">COURSE DETAILS</h2> <div class="hidden gap-4 md:flex"><button class="px-4 py-3 font-semibold rounded text-md bg-BrandLightGray">REMOVE COURSE</button> <button class="px-4 py-3 font-semibold rounded text-md text-BrandYellow bg-BrandForest">EDIT COURSE DETAILS</button></div></div></div> <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-6 lg:w-1/3 lg:mb-0"><h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3> <img src="/course-placeholder.jpg" alt="golf course" class="object-cover w-full h-full rounded"></div> <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0"><!></div> <div class="w-full px-0 lg:w-1/3 lg:px-4"><h2 class="pb-3 text-xl text-black condensed">TEES</h2> <div class="flex flex-col p-5 bg-white border-b rounded"><!></div> <div class="overflow-x-auto"><div class="overflow-y-auto max-h-[65vh]"><table class="hidden min-w-full bg-white border-collapse sm:table"><thead><tr><th class="p-4 text-xl text-left text-black border-b condensed">HOLE</th><th class="p-4 text-xl text-left text-black border-b condensed">PAR</th><th class="p-4 text-xl text-left text-black border-b condensed">S.I.</th><th class="p-4 text-xl text-left text-black border-b condensed">YARDS</th></tr></thead><tbody></tbody></table> <div class="sm:hidden"><div class="grid grid-cols-4 gap-4 p-2 text-sm text-black bg-white condensed"><div>HOLE</div> <div>PAR</div> <div>S.I</div> <div>YARDS</div></div> <!></div></div></div> <div class="flex w-full gap-4 p-2 bg-white md:hidden"><button class="px-3 py-1 font-semibold text-black rounded text-md bg-BrandLightGray">REMOVE COURSE</button> <button class="px-3 py-1 font-semibold rounded text-md text-BrandYellow bg-BrandForest">EDIT COURSE DETAILS</button></div></div></div></div>',
  ),
  Du = O("<!> <!>", 1);
function Uu(e, t) {
  me(t, !1);
  let r = G(null),
    a = G(!1),
    n = [
      { hole: 1, par: 4, strokeIndex: 8, yards: 400 },
      { hole: 2, par: 4, strokeIndex: 3, yards: 340 },
      { hole: 3, par: 3, strokeIndex: 12, yards: 200 },
      { hole: 4, par: 4, strokeIndex: 6, yards: 320 },
      { hole: 5, par: 5, strokeIndex: 1, yards: 480 },
      { hole: 6, par: 3, strokeIndex: 5, yards: 220 },
      { hole: 7, par: 4, strokeIndex: 11, yards: 370 },
      { hole: 8, par: 4, strokeIndex: 2, yards: 350 },
      { hole: 9, par: 4, strokeIndex: 7, yards: 420 },
      { hole: 10, par: 5, strokeIndex: 9, yards: 500 },
      { hole: 11, par: 4, strokeIndex: 14, yards: 310 },
      { hole: 12, par: 3, strokeIndex: 18, yards: 190 },
      { hole: 13, par: 5, strokeIndex: 4, yards: 530 },
      { hole: 14, par: 4, strokeIndex: 13, yards: 390 },
      { hole: 15, par: 3, strokeIndex: 17, yards: 180 },
      { hole: 16, par: 4, strokeIndex: 10, yards: 410 },
      { hole: 17, par: 5, strokeIndex: 15, yards: 480 },
      { hole: 18, par: 4, strokeIndex: 16, yards: 400 },
    ];
  st(async () => {
    try {
      const c = { limit: BigInt(10), offset: BigInt(0) },
        p = await Ar.getCourses(c);
      T(r, p[0] || null);
    } catch (c) {
      console.error("Error fetching course details:", c);
    }
  }),
    Ae();
  var s = Du(),
    o = J(s);
  Wt(o, {
    children: (c, p) => {
      var g = ju(),
        d = v(g),
        h = v(d),
        b = m(v(h), 2),
        _ = m(v(b), 2);
      f(b), f(h), f(d);
      var y = m(d, 2),
        S = m(v(y), 2),
        k = v(S);
      {
        var E = (H) => {
          var Y = Ru(),
            ee = m(v(Y), 2),
            z = m(v(ee), 2),
            K = v(z, !0);
          f(z),
            f(ee),
            we(4),
            f(Y),
            V((q) => L(K, q), [() => i(r).name.toUpperCase()], Te),
            A(H, Y);
        };
        D(k, (H) => {
          i(r) && H(E);
        });
      }
      f(S);
      var w = m(S, 2),
        x = m(v(w), 2),
        C = v(x);
      {
        var P = (H) => {
          var Y = ge(),
            ee = J(Y);
          xe(
            ee,
            1,
            () => i(r).tees,
            Ge,
            (z, K) => {
              var q = Nu(),
                de = v(q, !0);
              f(q),
                V(() => {
                  te(q, "style", `background-color: ${i(K).colour ?? ""};`),
                    L(de, i(K).name);
                }),
                A(z, q);
            },
          ),
            A(H, Y);
        };
        D(C, (H) => {
          i(r) && i(r).tees && H(P);
        });
      }
      f(x);
      var I = m(x, 2),
        R = v(I),
        B = v(R),
        $ = m(v(B));
      xe(
        $,
        5,
        () => n,
        Ge,
        (H, Y) => {
          var ee = Bu(),
            z = v(ee),
            K = v(z, !0);
          f(z);
          var q = m(z),
            de = v(q, !0);
          f(q);
          var he = m(q),
            Ie = v(he, !0);
          f(he);
          var ve = m(he),
            ye = v(ve, !0);
          f(ve),
            f(ee),
            V(() => {
              L(K, i(Y).hole),
                L(de, i(Y).par),
                L(Ie, i(Y).strokeIndex),
                L(ye, i(Y).yards);
            }),
            A(H, ee);
        },
      ),
        f($),
        f(B);
      var j = m(B, 2),
        F = m(v(j), 2);
      xe(
        F,
        1,
        () => n,
        Ge,
        (H, Y) => {
          var ee = Gu(),
            z = v(ee),
            K = v(z, !0);
          f(z);
          var q = m(z, 2),
            de = v(q, !0);
          f(q);
          var he = m(q, 2),
            Ie = v(he, !0);
          f(he);
          var ve = m(he, 2),
            ye = v(ve, !0);
          f(ve),
            f(ee),
            V(() => {
              L(K, i(Y).hole),
                L(de, i(Y).par),
                L(Ie, i(Y).strokeIndex),
                L(ye, i(Y).yards);
            }),
            A(H, ee);
        },
      ),
        f(j),
        f(R),
        f(I);
      var U = m(I, 2),
        M = m(v(U), 2);
      f(U),
        f(w),
        f(y),
        f(g),
        N("click", _, () => T(a, !0)),
        N("click", M, () => T(a, !0)),
        A(c, g);
    },
    $$slots: { default: !0 },
  });
  var l = m(o, 2);
  {
    var u = (c) => {
      const p = Te(() => i(r)?.name || "");
      Ou(c, {
        get isOpen() {
          return i(a);
        },
        holes: n,
        get courseName() {
          return i(p);
        },
        courseImage: "/course-placeholder.jpg",
      });
    };
    D(l, (c) => {
      i(a) && c(u);
    });
  }
  A(e, s), be();
}
const $u = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Uu },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Mu = O(
    '<div class="flex flex-col items-center mb-4 md:flex-row"><img src="prophet.png" alt="mulligans" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">MULLIGANS</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li> <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li> <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li> <li>A golfer can use as many mulligans as they have available on any hole.</li> <li>A golfer can build up as many mulligans as they can.</li> <li>The game is decided when a golfer is winning by more holes than are available to play.</li></ul>',
    1,
  ),
  Fu = O(
    `<div class="flex flex-col items-center mb-4 md:flex-row"><img src="bands.png" alt="bands" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BANDS</h3></div> <p class="mb-4 text-sm text-gray-700 md:text-base">Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. 
                    Each band must start on a different hole but they are allowed to overlap.</p> <p class="mb-4 text-sm text-gray-700 md:text-base">The points for each band are as follows:</p> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li><span class="semi-bold">Band 1:</span> Holes where you don’t hit a tree or enter a bunker. <span class="semi-bold">15 points</span></li> <li><span class="semi-bold">Band 2:</span> Holes where you won’t lose a ball. <span class="semi-bold">10 points</span></li> <li><span class="semi-bold">Band 3:</span> Holes where you hit 2/3 fairways. <span class="semi-bold">20 points</span></li> <li><span class="semi-bold">Band 4:</span> Holes where you hit 2/3 greens. <span class="semi-bold">25 points</span></li> <li><span class="semi-bold">Band 5:</span> Holes where you will 1-putt 2/3 greens. <span class="semi-bold">30 points</span></li> <li><span class="semi-bold">Band 6:</span> Holes where you won’t get a double bogey or worse. <span class="semi-bold">35 points</span></li> <li><span class="semi-bold">Band 7:</span> Holes where you won’t bogey or worse. <span class="semi-bold">40 points</span></li> <li><span class="semi-bold">Band 8:</span> Holes where you’ll be par or under. <span class="semi-bold">45 points</span></li> <li><span class="semi-bold">Band 9:</span> Holes where you’ll be under par. <span class="semi-bold">50 points</span></li></ul> <p class="mt-4 text-sm text-gray-700 md:text-base">A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.</p>`,
    1,
  ),
  Lu = O(
    `<div class="flex flex-col items-center mb-4 md:flex-row"><img src="build-it.png" alt="build-it" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BUILD IT</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li>A golfer can create a team in which they can compete against multiple other teams.</li> <li>The golfer who created the team becomes the team's captain.</li> <li>A team captain sets up a game on a specific course and tee to compete against other teams.</li> <li>A team captain invites other team's to join in a new game.</li> <li>A team captain selects a period of time to build their team card over.</li> <li>Golfers add their scorecards transferring any new lowest scores over to the team card.</li> <li>The winners are the team with the lowest scorecard at the end of the game's duration.</li></ul>`,
    1,
  ),
  Vu = O(
    '<div class="flex flex-col items-center mb-4 md:flex-row"><img src="next-up.png" alt="next-up" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">NEXT UP</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li> <li>If a golfer wins the hole they are defending, they get 3 points.</li> <li>If a golfer wins a hole they are not defending, they get 1 point.</li> <li>The winner is the golfer with the most points at the end of the round.</li> <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li></ul>',
    1,
  ),
  Hu = O(
    '<div class="w-full max-w-4xl p-4 mx-auto text-black"><h2 class="mt-3 mb-6 text-2xl font-black text-black md:text-4xl">GAMEPLAY RULES</h2> <p class="mb-6 text-base leading-relaxed md:text-lg">Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.</p> <div class="mb-4 border-b border-gray-300"><div class="flex flex-wrap space-x-2 overflow-x-auto md:space-x-4"><button><span class="condensed">MULLIGANS</span></button> <button><span class="condensed">BANDS</span></button> <button><span class="condensed">BUILD IT</span></button> <button><span class="condensed">NEXT UP</span></button></div></div> <div class="p-4 bg-white rounded-lg shadow-lg md:p-6"><!> <!> <!> <!></div></div>',
  );
function qu(e, t) {
  me(t, !1);
  const [r, a] = hr(),
    n = () => Nt(s, "$selectedGame", r);
  st(() => {
    window.scrollTo(0, 0);
  });
  const s = rt("Mulligans");
  Ae(),
    Wt(e, {
      children: (o, l) => {
        var u = Hu(),
          c = m(v(u), 4),
          p = v(c),
          g = v(p),
          d = m(g, 2),
          h = m(d, 2),
          b = m(h, 2);
        f(p), f(c);
        var _ = m(c, 2),
          y = v(_);
        {
          var S = (I) => {
            var R = Mu();
            we(2), A(I, R);
          };
          D(y, (I) => {
            n() === "Mulligans" && I(S);
          });
        }
        var k = m(y, 2);
        {
          var E = (I) => {
            var R = Fu();
            we(8), A(I, R);
          };
          D(k, (I) => {
            n() === "Bands" && I(E);
          });
        }
        var w = m(k, 2);
        {
          var x = (I) => {
            var R = Lu();
            we(2), A(I, R);
          };
          D(w, (I) => {
            n() === "Build It" && I(x);
          });
        }
        var C = m(w, 2);
        {
          var P = (I) => {
            var R = Vu();
            we(2), A(I, R);
          };
          D(C, (I) => {
            n() === "Next Up" && I(P);
          });
        }
        f(_),
          f(u),
          V(() => {
            le(
              g,
              1,
              `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Mulligans" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
            ),
              le(
                d,
                1,
                `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Bands" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
              ),
              le(
                h,
                1,
                `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Build It" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
              ),
              le(
                b,
                1,
                `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Next Up" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
              );
          }),
          N("click", g, () => s.set("Mulligans")),
          N("click", d, () => s.set("Bands")),
          N("click", h, () => s.set("Build It")),
          N("click", b, () => s.set("Next Up")),
          A(o, u);
      },
      $$slots: { default: !0 },
    }),
    be(),
    a();
}
const Yu = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: qu },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Wu = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class zu {
  constructor() {
    Dr(this, "actor");
    this.actor = je.createActor(rr, Wu.BACKEND_CANISTER_ID);
  }
  async getGolferGameSummaries(t) {
    const r = await this.actor.getMyGames(t);
    if (He(r)) throw new Error("Failed to get golfer game summaries");
    return r.ok;
  }
}
function Ku() {
  const { subscribe: e, set: t } = rt(void 0);
  async function r(a) {
    return await new zu().getGolferGameSummaries(a);
  }
  return {
    subscribe: e,
    setGolferGameSummaries: (a) => t(a),
    getGolferGameSummaries: r,
  };
}
const Ks = Ku(),
  Xu = [
    {
      id: "mulligans",
      title: "MULLIGANS",
      image: "/mulligans.png",
      description:
        "Mulligans offer golfers a second chance to retake a shot without penalty, providing a do-over opportunity to improve their game.",
    },
    {
      id: "prophet",
      title: "PROPHET",
      image: "/prophet.png",
      description:
        "Prophet is a golf game format that emphasizes precise scoring based on the length of each putt made by players.",
    },
    {
      id: "bands",
      title: "BANDS",
      image: "/bands.png",
      description:
        "Bands is a golf game where players hit designated targets to earn points.",
    },
    {
      id: "build-it",
      title: "BUILD IT",
      image: "/build-it.png",
      description:
        "Build It is a golf game where players aim to progressively improve their scores over each hole.",
    },
    {
      id: "next-up",
      title: "NEXT UP",
      image: "/next-up.png",
      description:
        "Next Up is a golf game where players compete to score the next best shot after each hole.",
    },
  ];
var Ju = O(
    '<button class="brand-button"><img class="object-cover object-[center_20%] h-[140px] sm:h-auto w-full mx-0 mb-4 rounded-lg sm:max-w-none sm:aspect-square sm:object-fill sm:mx-auto"> <div class="flex flex-col flex-grow w-full"><h3 class="text-2xl font-bold mb-1 condensed h-[2em] flex items-start sm:items-center text-left sm:text-center sm:justify-center"> </h3> <p class="text-sm text-left text-gray-500 md:text-sm font-inter font-med"> </p></div></button>',
  ),
  Qu = O(
    '<div class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4"><div class="bg-white p-8 sm:p-5 rounded-lg max-w-[90%] w-full h-auto max-h-[90vh] overflow-y-auto shadow-lg relative"><div class="flex items-center justify-between mb-5"><h2 class="ml-5 text-4xl font-bold sm:text-5xl condensed">NEW GAME</h2> <button class="brand-button">&times;</button></div> <p class="mb-5 ml-5 text-base text-gray-500 font-inter font-sub">SELECT GAME</p> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-5"></div> <div class="hidden mt-5 text-right lg:block"><button class="brand-button">SELECT</button></div></div></div>',
  );
function Zu(e, t) {
  me(t, !1);
  let r = Z(t, "visible", 8),
    a = Z(t, "closeModal", 8);
  function n(u) {
    a()(), Er(`/games/create/${u}`);
  }
  Ae();
  var s = ge(),
    o = J(s);
  {
    var l = (u) => {
      var c = Qu(),
        p = v(c),
        g = v(p),
        d = m(v(g), 2);
      f(g);
      var h = m(g, 4);
      xe(
        h,
        5,
        () => Xu,
        (y) => y.id,
        (y, S) => {
          var k = Ju(),
            E = v(k),
            w = m(E, 2),
            x = v(w),
            C = v(x, !0);
          f(x);
          var P = m(x, 2),
            I = v(P, !0);
          f(P),
            f(w),
            f(k),
            V(() => {
              te(E, "src", i(S).image),
                te(E, "alt", i(S).title),
                L(C, i(S).title),
                L(I, i(S).description);
            }),
            N("click", k, () => n(i(S).id)),
            A(y, k);
        },
      ),
        f(h);
      var b = m(h, 2),
        _ = v(b);
      f(b),
        f(p),
        f(c),
        N("click", d, function (...y) {
          a()?.apply(this, y);
        }),
        N("click", _, function (...y) {
          a()?.apply(this, y);
        }),
        A(u, c);
    };
    D(o, (u) => {
      r() && u(l);
    });
  }
  A(e, s), be();
}
var Xs = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class Js {
  constructor() {
    Dr(this, "actor");
    this.actor = je.createActor(rr, Xs.BACKEND_CANISTER_ID);
  }
  async getGame(t) {
    try {
      let r = { gameId: BigInt(t) },
        a = await this.actor.getGame(r);
      return He(a) && console.error("Error Fetching Game", a), a.ok;
    } catch (r) {
      throw (console.error("Error Fetching Game", r), r);
    }
  }
  async createGame(t) {
    const a = await (
      await je.createIdentityActor(Re, Xs.BACKEND_CANISTER_ID)
    ).createGame(t);
    if (He(a)) throw new Error("Error Creating Game");
    return { ok: a.ok };
  }
}
function ef() {
  const { subscribe: e, set: t } = rt([]);
  async function r(n) {
    return new Js().getGame(n);
  }
  async function a(n) {
    return new Js().createGame(n);
  }
  return { subscribe: e, setGame: (n) => t(n), getGame: r, createGame: a };
}
const mi = ef();
var tf = O(
    '<label for="tee" class="block mt-4 text-lg font-bold text-black">Select Tee Group</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md"><!></div></div>',
    1,
  ),
  rf = O("<div>Loading opponents...</div>"),
  af = O(
    '<div class="flex flex-col w-full"><div class="w-full p-2 px-4 text-black"><h2 class="mx-2 mt-2 mb-0 text-5xl font-black text-black md:mx-4 condensed"> </h2></div> <div class="w-full p-4 text-black bg-gray-100 rounded-lg"><label for="course" class="block mt-4 text-lg font-bold text-black">Course</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md"><!></div></div> <!> <label for="date" class="block mt-4 text-lg font-bold text-black">Select Tee Off Date</label> <div class="flex items-center w-full mt-2"><div class="flex-grow max-w-md"><input type="date" class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded" placeholder="dd/mm/yyyy"></div></div> <label for="time" class="block mt-4 text-lg font-bold text-black">Select Tee Off Time</label> <div class="flex items-center w-full mt-2"><div class="flex-grow max-w-md"><input type="time" class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded" placeholder="hh:mm"></div></div> <label for="opponent" class="block mt-4 text-lg font-bold text-black"> </label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md"><!></div></div></div> <button class="brand-button">Create New Game</button></div>',
  );
function bi(e, t) {
  me(t, !1);
  let r = Z(t, "gameTitle", 8),
    a = Z(t, "opponentConfig", 8),
    n = [],
    s = [],
    o = G([]),
    l = [],
    u = G([]),
    c = G(null),
    p = G(null),
    g = G(null),
    d = G(null),
    h = G(""),
    b = G(""),
    _ = G("");
  async function y() {
    if (!i(c) || !i(d) || i(u).length === 0) {
      console.error("Please fill out all fields.");
      return;
    }
    const k = {
      Mulligans: { Mulligans: null },
      BuildIt: { BuildIt: null },
      Bands: { Bands: null },
      NextUp: { NextUp: null },
      Prophet: { Prophet: null },
    }[r()];
    if (!k) {
      console.error(`Invalid gameTitle: ${r()}`);
      return;
    }
    const E = vd(i(_)),
      w = {
        createdById: "Kelly-Howlett",
        courseId: BigInt(i(c).courseId),
        gameType: k,
        inviteIds: ["James-Beadle"],
        teeOffTime: E,
        teeGroup: i(d).value,
      };
    console.log("DTO:", w);
    try {
      const x = await mi.createGame(w);
      x.ok
        ? (console.log("Game Created, Game ID:", x.ok), Er(`/games/${x.ok}`))
        : console.error("Error Creating Game", x.err);
    } catch (x) {
      console.error("Error Creating Game", x);
    }
  }
  At(
    () => (i(h), i(b)),
    () => {
      T(_, i(h) + "T" + i(b));
    },
  ),
    At(
      () => (i(g), i(c), i(o)),
      () => {
        i(g)?.value &&
          (T(c, n.find((S) => S.courseId.toString() === i(g).value) || null),
          console.log("Selected Course:", i(g)),
          i(c) &&
            (T(
              o,
              i(c).tees.map((S) => ({ name: S.name, value: S.name })),
            ),
            console.log("Tees:", i(o)),
            T(d, null)));
      },
    ),
    Rr(),
    Ae(),
    Wt(e, {
      children: (S, k) => {
        var E = af(),
          w = v(E),
          x = v(w),
          C = v(x, !0);
        f(x), f(w);
        var P = m(w, 2),
          I = m(v(P), 2),
          R = v(I),
          B = v(R);
        const $ = Te(() =>
          n.map((X) => ({ name: X.name, value: X.courseId.toString() })),
        );
        Wr(B, {
          get items() {
            return i($);
          },
          get bindSelected() {
            return i(p);
          },
          placeholder: "Select Course",
          multiple: !1,
          searchEnabled: !1,
          $$events: {
            select: (X) => {
              T(p, X.detail), T(g, X.detail.value);
            },
          },
        }),
          f(R),
          f(I);
        var j = m(I, 2);
        {
          var F = (X) => {
            var ke = tf(),
              qe = m(J(ke), 2),
              Me = v(qe),
              at = v(Me);
            Wr(at, {
              get items() {
                return i(o);
              },
              get bindSelected() {
                return i(d);
              },
              placeholder: "Select Tee Group",
              searchEnabled: !1,
              multiple: !1,
              $$events: {
                select: (De) => {
                  T(d, De.detail.value);
                },
              },
            }),
              f(Me),
              f(qe),
              A(X, ke);
          };
          D(j, (X) => {
            i(g) && X(F);
          });
        }
        var U = m(j, 4),
          M = v(U),
          H = v(M);
        Oe(H), f(M), f(U);
        var Y = m(U, 4),
          ee = v(Y),
          z = v(ee);
        Oe(z), f(ee), f(Y);
        var K = m(Y, 2),
          q = v(K, !0);
        f(K);
        var de = m(K, 2),
          he = v(de),
          Ie = v(he);
        {
          var ve = (X) => {
              Wr(X, {
                items: l,
                get bindSelected() {
                  return i(u);
                },
                placeholder: "Select your Opponent(s)",
                searchEnabled: !1,
                multiple: !1,
                $$events: {
                  select: (ke) => {
                    T(u, ke.detail.value);
                  },
                },
              });
            },
            ye = (X) => {
              var ke = rf();
              A(X, ke);
            };
          D(Ie, (X) => {
            s.length > 0 ? X(ve) : X(ye, !1);
          });
        }
        f(he), f(de), f(P);
        var $e = m(P, 2);
        f(E),
          V(
            (X) => {
              L(C, X), L(q, a().playerLabels ? "Players" : "Opponents");
            },
            [() => r().toUpperCase()],
            Te,
          ),
          Be(
            H,
            () => i(h),
            (X) => T(h, X),
          ),
          Be(
            z,
            () => i(b),
            (X) => T(b, X),
          ),
          N("click", $e, y),
          A(S, E);
      },
      $$slots: { default: !0 },
    }),
    be();
}
var nf = O("<p>No game history found. Start your first game!</p>"),
  sf = O(
    '<div class="relative group"><div class="absolute left-0 z-50 hidden group-hover:block top-12"><p class="font-bold"> </p> <button class="px-2.5 py-1.5 bg-blue-500 text-white rounded">View Player</button></div></div>',
  ),
  of = O(
    '<div class="w-full mt-5 text-left border-t border-gray-200 bg-gray-50"><div class="flex items-center p-4 border-b border-gray-200"><div class="flex items-center rounded w-15 h-15"></div> <div class="ml-4"><h3 class="font-bold"> </h3> <p class="text-sm"> </p></div></div> <div class="flex ml-auto bg-gray-50"></div> <div class="w-1/6 text-lg font-bold text-blue-500 bg-gray-50"> </div> <div class="w-1/6"><button class="px-4 py-2.5 bg-blue-500 text-white font-bold rounded">Predict</button></div></div>',
  ),
  lf = O(
    '<div class="w-full"><div class="w-full h-full p-2 px-4 text-black"><div class="flex items-center justify-between mb-4"><h2 class="px-2 my-3 text-3xl font-black text-black md:text-5xl condensed">MY GAMES</h2> <button class="mr-4 btn btn-new-game">New Game</button> <!></div> <div class="flex items-center w-full p-4 text-xl font-bold text-left bg-gray-50 condensed"><div class="w-2/6">Game</div> <div class="w-2/6">Players</div> <div class="w-1/6">Status</div> <div class="w-1/6"></div></div> <!> <!> <!></div></div>',
  );
function cf(e, t) {
  me(t, !1);
  const [r, a] = hr(),
    n = () => Nt(Ks, "$golferSummariesStore", r);
  let s = G(!1),
    o = G(null),
    l = G();
  st(async () => {
    try {
      const g = { limit: BigInt(10), offset: BigInt(0) };
      T(l, await Ks.getGolferGameSummaries(g)), console.log(i(l));
    } catch (g) {
      console.error("Failed to fetch golfer game summaries:", g);
    }
  });
  function u() {
    T(s, !0);
  }
  function c() {
    T(s, !1);
  }
  function p(g) {
    T(o, g.detail);
  }
  Ae(),
    Wt(e, {
      children: (g, d) => {
        var h = lf(),
          b = v(h),
          _ = v(b),
          y = m(v(_), 2),
          S = m(y, 2);
        {
          var k = (R) => {
            Zu(R, {
              get visible() {
                return i(s);
              },
              closeModal: c,
              $$events: { gameSelected: p },
            });
          };
          D(S, (R) => {
            i(s) && R(k);
          });
        }
        f(_);
        var E = m(_, 4);
        {
          var w = (R) => {
            var B = nf();
            A(R, B);
          };
          D(E, (R) => {
            i(l) && i(l).totalEntries === BigInt(0) && R(w);
          });
        }
        var x = m(E, 2);
        {
          var C = (R) => {
            var B = ge(),
              $ = J(B);
            xe(
              $,
              1,
              () => n().entries,
              Ge,
              (j, F) => {
                var U = of(),
                  M = v(U),
                  H = m(v(M), 2),
                  Y = v(H),
                  ee = v(Y, !0);
                f(Y);
                var z = m(Y, 2),
                  K = v(z, !0);
                f(z), f(H), f(M);
                var q = m(M, 2);
                xe(
                  q,
                  5,
                  () => i(F).players,
                  Ge,
                  (Ie, ve) => {
                    var ye = sf(),
                      $e = v(ye),
                      X = v($e),
                      ke = v(X, !0);
                    f(X), we(2), f($e), f(ye), V(() => L(ke, i(ve))), A(Ie, ye);
                  },
                ),
                  f(q);
                var de = m(q, 2),
                  he = v(de, !0);
                f(de),
                  we(2),
                  f(U),
                  V(
                    (Ie) => {
                      L(ee, i(F).gameType), L(K, Ie), L(he, i(F).status);
                    },
                    [
                      () =>
                        new Date(Number(i(F).date) * 1e3).toLocaleDateString(),
                    ],
                    Te,
                  ),
                  A(j, U);
              },
            ),
              A(R, B);
          };
          D(x, (R) => {
            n() && n().entries.length > 0 && R(C);
          });
        }
        var P = m(x, 2);
        {
          var I = (R) => {
            bi(R, {
              get gameTitle() {
                return i(o).config.title;
              },
              get opponentConfig() {
                return i(o).config.opponentConfig;
              },
            });
          };
          D(P, (R) => {
            i(o) && R(I);
          });
        }
        f(b), f(h), N("click", y, u), A(g, h);
      },
      $$slots: { default: !0 },
    }),
    be(),
    a();
}
const df = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: cf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var uf = O(
  '<div class="flex flex-col items-start justify-center w-full ml-8 mt-2.5"><span class="mb-0 text-sm font-medium text-gray-500">GAMETYPE</span> <h1 class="font-black leading-none text-7xl font-condensed"> </h1> <div class="flex flex-col mt-2.5"><span class="mb-0 text-sm font-medium text-gray-500 mt-2.5">DATE</span> <h3 class="mb-4 text-4xl font-bold text-center font-condensed"> </h3></div> <div class="flex items-center justify-start mt-2.5"><img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"> <div class="flex flex-col"><span class="mb-0 text-sm font-medium text-gray-500">COURSE</span> <div><p class="text-3xl font-bold text-center font-condensed"> </p></div></div></div></div>',
);
function ff(e, t) {
  me(t, !1);
  let r = Z(t, "gameType", 8),
    a = Z(t, "teeOffTime", 8),
    n = Z(t, "courseId", 8);
  st(async () => {}), Ae();
  var s = uf(),
    o = m(v(s), 2),
    l = v(o, !0);
  f(o);
  var u = m(o, 2),
    c = m(v(u), 2),
    p = v(c, !0);
  f(c), f(u);
  var g = m(u, 2),
    d = m(v(g), 2),
    h = m(v(d), 2),
    b = v(h),
    _ = v(b, !0);
  f(b),
    f(h),
    f(d),
    f(g),
    f(s),
    V(() => {
      L(l, r()), L(p, a()), L(_, n());
    }),
    A(e, s),
    be();
}
var vf = O('<div><h4 class="text-4xl font-bold condensed"><!></h4>  <!></div>');
function pf(e, t) {
  me(t, !1);
  let r = Z(t, "gameType", 8),
    a = Z(t, "gameStatus", 8);
  Z(t, "playerIds", 8), Z(t, "events", 8), Z(t, "winner", 8), Ae();
  var n = vf(),
    s = v(n),
    o = v(s);
  {
    var l = (g) => {
        var d = dr("PLAYER SETUP");
        A(g, d);
      },
      u = (g) => {
        var d = ge(),
          h = J(d);
        {
          var b = (y) => {
              var S = dr("PLAYER SCORES");
              A(y, S);
            },
            _ = (y) => {
              var S = ge(),
                k = J(S);
              {
                var E = (w) => {
                  var x = dr("PLAYER DETAILS");
                  A(w, x);
                };
                D(
                  k,
                  (w) => {
                    a() === "completed" && w(E);
                  },
                  !0,
                );
              }
              A(y, S);
            };
          D(
            h,
            (y) => {
              a() === "active" ? y(b) : y(_, !1);
            },
            !0,
          );
        }
        A(g, d);
      };
    D(o, (g) => {
      a() === "unplayed" ? g(l) : g(u, !1);
    });
  }
  f(s);
  var c = m(s, 2);
  {
    var p = (g) => {
      var d = ge(),
        h = J(d);
      {
        var b = (y) => {},
          _ = (y) => {
            var S = ge(),
              k = J(S);
            {
              var E = (x) => {},
                w = (x) => {
                  var C = ge(),
                    P = J(C);
                  {
                    var I = (B) => {},
                      R = (B) => {
                        var $ = ge(),
                          j = J($);
                        {
                          var F = (M) => {},
                            U = (M) => {
                              var H = ge(),
                                Y = J(H);
                              {
                                var ee = (z) => {};
                                D(
                                  Y,
                                  (z) => {
                                    r() === "Prophet" && z(ee);
                                  },
                                  !0,
                                );
                              }
                              A(M, H);
                            };
                          D(
                            j,
                            (M) => {
                              r() === "BuildIt" ? M(F) : M(U, !1);
                            },
                            !0,
                          );
                        }
                        A(B, $);
                      };
                    D(
                      P,
                      (B) => {
                        r() === "NextUp" ? B(I) : B(R, !1);
                      },
                      !0,
                    );
                  }
                  A(x, C);
                };
              D(
                k,
                (x) => {
                  r() === "Mulligans" ? x(E) : x(w, !1);
                },
                !0,
              );
            }
            A(y, S);
          };
        D(h, (y) => {
          r() === "Bands" ? y(b) : y(_, !1);
        });
      }
      A(g, d);
    };
    D(c, (g) => {
      r() && g(p);
    });
  }
  f(n), A(e, n), be();
}
var hf = O(
    '<div class="flex items-center"><div class="w-3 h-3 bg-green-500 rounded-full"></div> <span class="ml-2 mr-4 text-xl font-bold text-green-500">LIVE</span></div>',
  ),
  gf = O(
    '<div class="flex items-center"><div class="w-3 h-3 bg-blue-500 rounded-full"></div> <span class="ml-2 mr-4 text-xl font-bold text-blue-500">PREDICT</span></div>',
  ),
  mf = O(
    '<div class="w-full"><div class="w-full p-2 px-4 text-black"><div class="flex items-center justify-between"><h2 class="px-5 mt-1 text-3xl font-black text-black md:text-5xl condensed">GAME DETAILS</h2> <!> <!></div></div> <div class="w-full"><div class="w-1/3 rounded-lg"><img class="game-image"></div> <!> <!></div></div>',
  );
function bf(e, t) {
  me(t, !1);
  const [r, a] = hr(),
    n = () => Nt(ds, "$page", r),
    s = () => Nt(l, "$gameData", r),
    o = G(),
    l = rt({
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
          strokeIndex: 0,
        },
      },
      teeOffTime: BigInt(0),
      playerIds: [],
      invites: [],
      winner: "",
    });
  st(async () => {
    try {
      if (i(o)) {
        const p = await mi.getGame(parseInt(i(o)));
        l.set(p);
      }
    } catch (p) {
      console.error(p);
    } finally {
    }
  });
  function u(p) {
    return "Bands" in p
      ? "/bands.png"
      : "Mulligans" in p
        ? "/mulligans.png"
        : "NextUp" in p
          ? "/next-up.png"
          : "BuildIt" in p
            ? "/build-it.png"
            : "Prophet" in p
              ? "/prophet.png"
              : "";
  }
  function c(p) {
    return "Unplayed" in p
      ? "Unplayed"
      : "Active" in p
        ? "Active"
        : "Complete" in p
          ? "Complete"
          : "Unknown";
  }
  At(
    () => n(),
    () => {
      T(o, n().url.searchParams.get("id"));
    },
  ),
    Rr(),
    Ae(),
    Wt(e, {
      children: (p, g) => {
        var d = mf(),
          h = v(d),
          b = v(h),
          _ = m(v(b), 2);
        {
          var y = (j) => {
            var F = hf();
            A(j, F);
          };
          D(_, (j) => {
            c(s()?.status) === "Active" && j(y);
          });
        }
        var S = m(_, 2);
        {
          var k = (j) => {
            var F = gf();
            A(j, F);
          };
          D(S, (j) => {
            c(s()?.status) === "Unplayed" && j(k);
          });
        }
        f(b), f(h);
        var E = m(h, 2),
          w = v(E),
          x = v(w);
        f(w);
        var C = m(w, 2);
        ff(C, {
          get gameType() {
            return Object.keys(s()?.gameType || {})[0];
          },
          get teeOffTime() {
            return s().teeOffTime;
          },
          get courseId() {
            return s().courseId;
          },
        });
        var P = m(C, 2);
        const I = Te(() => c(s()?.status)),
          R = Te(() => Object.keys(s().playerIds)),
          B = Te(() => Object.keys(s().events)),
          $ = Te(() => Object.keys(s().winner));
        pf(P, {
          get gameType() {
            return Object.keys(s()?.gameType || {})[0];
          },
          get gameStatus() {
            return i(I);
          },
          get playerIds() {
            return i(R);
          },
          get events() {
            return i(B);
          },
          get winner() {
            return i($);
          },
        }),
          f(E),
          f(d),
          V(
            (j, F) => {
              te(x, "src", j), te(x, "alt", F);
            },
            [() => u(s()?.gameType), () => Object.keys(s()?.gameType || {})[0]],
            Te,
          ),
          A(p, d);
      },
      $$slots: { default: !0 },
    }),
    be(),
    a();
}
const yf = Object.freeze(
    Object.defineProperty(
      { __proto__: null, component: bf },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  _f = {
    mulligans: { title: "Mulligans", opponentConfig: { multiple: !0 } },
    prophet: { title: "Prophet", opponentConfig: { multiple: !1 } },
    bands: { title: "Bands", opponentConfig: { multiple: !0, maxPlayers: 4 } },
    "build-it": {
      title: "Build It",
      opponentConfig: { playerLabels: ["Player A", "Player B", "Player C"] },
    },
    "next-up": {
      title: "Next Up",
      opponentConfig: { multiple: !0, maxPlayers: 2 },
    },
  };
function wf(e, t) {
  me(t, !1);
  const [r, a] = hr(),
    s = Nt(ds, "$page", r).params.game,
    o = _f[s],
    u = { ...{ multiple: !1 }, ...o.opponentConfig };
  Ae(),
    bi(e, {
      get gameTitle() {
        return o.title;
      },
      opponentConfig: u,
    }),
    be(),
    a();
}
const xf = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: wf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function kf(e) {}
const Ef = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: kf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var wn = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class ya {
  constructor() {
    Dr(this, "actor");
    this.actor = je.createActor(rr, wn.BACKEND_CANISTER_ID);
  }
  async getPlayer(t) {
    const r = await this.actor.getPlayer(t);
    if (He(r)) throw new Error("Failed to get player");
    return r.ok;
  }
  async createPlayer(t) {
    const a = await (
      await je.createIdentityActor(Re, wn.BACKEND_CANISTER_ID)
    ).createGolfer(t);
    if ((console.log("Result:", a), He(a)))
      throw (
        (console.log("ERROR Result:", a), new Error("Error Creating Player"))
      );
  }
  async listPlayers(t) {
    const r = { searchTerm: t },
      a = await this.actor.listGolfers(r);
    if (He(a)) throw new Error("Failed to list players");
    return a.ok;
  }
  async saveGolferPicture(t) {
    const a = await (
      await je.createIdentityActor(Re, wn.BACKEND_CANISTER_ID)
    ).saveGolferPicture(t);
    if (He(a))
      throw (
        (console.log("ERROR Result:", a),
        new Error("Error Saving Golfer Picture"))
      );
  }
}
function Af() {
  const { subscribe: e, set: t } = rt([]);
  async function r(o) {
    return new ya().getPlayer(o);
  }
  async function a(o = "") {
    return new ya().listPlayers(o);
  }
  async function n(o) {
    return new ya().createPlayer(o);
  }
  async function s(o) {
    return new ya().saveGolferPicture(o);
  }
  return {
    subscribe: e,
    setPlayer: (o) => t(o),
    createPlayer: n,
    getPlayer: r,
    listPlayers: a,
    saveGolferPicture: s,
  };
}
Af();
var Sf = Uo(
  '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="m60 10c27.57 0 50 22.43 50 50s-22.43 50-50 50-50-22.43-50-50 22.43-50 50-50zm0-10c-33.135 0-60 26.865-60 60s26.865 60 60 60 60-26.865 60-60-26.865-60-60-60zm-19.97 64.82 15.53 15.525-20.56 4.655zm49.97-18.82-29.2 29.605-16.01-16.01 29.205-29.595z"></path></svg>',
);
function xn(e, t) {
  let r = Z(t, "className", 8, ""),
    a = Z(t, "fill", 8, "");
  var n = Sf();
  V(() => {
    le(n, 0, Vo(r())), te(n, "fill", a());
  }),
    A(e, n);
}
var Tf = O(
    '<img alt="Preview" class="object-cover w-24 h-24 mb-4 rounded sm:w-32 sm:h-32"> <p class="text-base font-medium sm:text-lg text-BrandDarkGray">Click to change image</p>',
    1,
  ),
  If = O(
    '<div class="mb-4"><!></div> <p class="text-base font-medium sm:text-lg text-BrandDarkGray">Drag and Drop or Browse</p>',
    1,
  ),
  Cf = O(
    '<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"><div class="relative z-10 w-full sm:w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white rounded-lg shadow-xl"><div class="flex items-center justify-between p-4 sm:p-5"><h2 class="text-2xl text-black sm:text-3xl condensed">UPLOAD IMAGE</h2> <button class="cancel-button" type="button" aria-label="Close">✕</button></div> <div class="p-4 sm:p-8"><button type="button" class="brand-button"><!> <input id="fileInput" type="file" accept="image/*" class="hidden"></button></div> <div class="flex justify-end gap-3 p-4 sm:gap-4 sm:p-6"><button type="button" class="cancel-button">Cancel</button> <button type="button">Save</button></div></div></div>',
  );
function Pf(e, t) {
  me(t, !1);
  let r = Z(t, "isOpen", 8, !1);
  const a = Xa();
  let n = G(!1),
    s = null,
    o = G(null),
    l = G();
  function u() {
    a("close");
  }
  function c(_) {
    const y = _.target;
    y.files &&
      y.files[0] &&
      (T(n, !0), (s = y.files[0]), T(o, URL.createObjectURL(y.files[0])));
  }
  function p() {
    s && (a("fileSelect", { file: s, preview: i(o) }), u());
  }
  function g() {
    i(l)?.click();
  }
  Ae();
  var d = ge(),
    h = J(d);
  {
    var b = (_) => {
      var y = Cf(),
        S = v(y),
        k = v(S),
        E = m(v(k), 2);
      f(k);
      var w = m(k, 2),
        x = v(w),
        C = v(x);
      {
        var P = (U) => {
            var M = Tf(),
              H = J(M);
            we(2), V(() => te(H, "src", i(o))), A(U, M);
          },
          I = (U) => {
            var M = If(),
              H = J(M),
              Y = v(H);
            us(Y, {
              className: "w-10 h-10 sm:w-12 sm:h-12 fill-BrandDarkGray",
            }),
              f(H),
              we(2),
              A(U, M);
          };
        D(C, (U) => {
          i(o) ? U(P) : U(I, !1);
        });
      }
      var R = m(C, 2);
      ka(
        R,
        (U) => T(l, U),
        () => i(l),
      ),
        f(x),
        f(w);
      var B = m(w, 2),
        $ = v(B),
        j = m($, 2);
      let F;
      f(B),
        f(S),
        f(y),
        V(
          () =>
            (F = le(j, 1, "brand-button", null, F, {
              "bg-BrandForest": i(n),
              "text-BrandYellow": i(n),
              "bg-BrandLightGray": !i(n),
              "text-BrandDarkGray": !i(n),
            })),
        ),
        N("click", E, u),
        N("change", R, c),
        N("click", x, g),
        N("keydown", x, (U) => U.key === "Enter" && g()),
        N("click", $, u),
        N("click", j, p),
        A(_, y);
    };
    D(h, (_) => {
      r() && _(b);
    });
  }
  A(e, d), be();
}
var Of = O(
    '<div class="relative w-full h-full"><img alt="Profile" class="object-cover w-full h-full rounded-lg"> <button class="absolute p-2 transition-all duration-200 bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-70"><!></button></div>',
  ),
  Rf = O(
    '<img src="default-profile-picture.jpg" alt="Default Profile" class="object-cover w-full h-full rounded-lg"> <button class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><!></button>',
    1,
  ),
  Nf = O('<p class="mb-2 text-red-500"> </p>'),
  Bf = O(
    '<!> <button class="px-2 py-2 mb-4 text-sm rounded lg:px-3 lg:py-1 text-BrandYellow bg-BrandForest hover:bg-green-700 disabled:opacity-50"><!></button>',
    1,
  ),
  Gf = O(
    '<div class="relative"><p class="text-xl text-black condensed"> </p> <button type="button" class="absolute bottom-0 right-0 p-1 transition-all duration-200 rounded-full hover:bg-black/10"><!></button></div>',
  ),
  jf = O(
    '<button type="button" class="w-full p-2 text-left rounded text-BrandDarkGray hover:bg-black/5">Select home course</button>',
  ),
  Df = O(
    '<div class="w-full h-full px-2 pt-4"><div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-6 lg:w-1/3 lg:mb-0"><h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3> <div class="relative flex items-center justify-center w-full aspect-[16/9] lg:aspect-square bg-yellow-400 rounded-lg"><!> <!></div></div> <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0"><h3 class="hidden mb-4 text-xl text-black lg:block condensed">DETAILS</h3> <label for="username" class="block pt-8 pb-3 text-sm text-BrandDarkGray">USERNAME</label> <input id="username" placeholder="Enter your username" type="text" class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest"> <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label> <input id="handicap" placeholder="Enter your handicap" type="number" class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" min="0" max="54"> <!> <div class="flex items-center mt-auto text-black"><img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"> <div class="flex-1"><label for="homeCourse" class="block pb-3 text-sm text-BrandDarkGray">HOME COURSE</label> <!> <!></div></div></div></div></div>',
  ),
  Uf = O(
    '<div class="grid items-center grid-cols-12 p-4 bg-white rounded-lg"><div class="flex items-center justify-between col-span-12 mb-2 lg:col-span-5 lg:mb-0"><div class="flex items-center"><img src="default-profile-picture.jpg" alt="Profile" class="mr-4 rounded-full w-14 h-14"> <div><span class="text-xxs text-BrandDarkGray"> </span> <h4 class="text-2xl text-black md:text-3xl condensed"> </h4></div></div> <div class="flex flex-col items-end lg:hidden"><span class="text-xxs text-BrandDarkGray">HANDICAP</span> <span class="text-2xl text-black md:text-3xl condensed">4</span></div></div> <div class="items-center hidden col-span-2 lg:flex lg:flex-col"><span class="text-xxs text-BrandDarkGray">HANDICAP</span> <span class="text-2xl text-black md:text-3xl condensed">4</span></div> <div class="flex justify-center col-span-12 space-x-2 lg:justify-end lg:col-span-5"><button class="flex-1 px-3 py-1 text-sm text-black rounded lg:flex-initial bg-BrandAcceptGreen">ACCEPT</button> <button class="flex-1 px-3 py-1 text-sm text-white rounded lg:flex-initial bg-BrandDeclineRed">REJECT</button></div></div>',
  ),
  $f = O(
    '<div class="grid items-center grid-cols-12 p-4 bg-white rounded-lg"><div class="flex items-center justify-between col-span-12 mb-2 lg:col-span-5 lg:mb-0"><div class="flex items-center"><img src="default-profile-picture.jpg" alt="Profile" class="mr-4 rounded-full w-14 h-14"> <div><span class="text-xxs text-BrandDarkGray"> </span> <h4 class="text-2xl text-black md:text-3xl condensed"> </h4></div></div> <div class="flex flex-col items-end lg:hidden"><span class="text-xxs text-BrandDarkGray">HANDICAP</span> <span class="text-2xl text-black md:text-3xl condensed"> </span></div></div> <div class="items-center hidden col-span-2 lg:flex lg:flex-col"><span class="text-xxs text-BrandDarkGray">HANDICAP</span> <span class="text-3xl text-black condensed"> </span></div> <div class="flex justify-center col-span-12 lg:justify-end lg:col-span-5"><button class="w-full px-5 py-1 text-sm rounded lg:w-auto text-BrandYellow bg-BrandForest">VIEW</button></div></div>',
  ),
  Mf = O(
    '<button type="button" role="option"><div class="flex items-center justify-between col-span-12"><div class="flex items-center"><img src="default-profile-picture.jpg" alt="Profile" class="w-10 h-10 mr-4 rounded-full"> <div class="flex flex-col"><span class="text-xs text-BrandDarkGray"> </span> <span class="text-xl text-black condensed"> </span></div></div> <div class="flex flex-col items-end"><span class="text-xs text-BrandDarkGray">HANDICAP</span> <span class="text-xl text-black condensed"> </span></div></div></button>',
  ),
  Ff = O(
    '<div class="w-full h-full px-2 pt-4"><div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-8 lg:w-3/5 lg:pr-4 lg:mb-0"><div class="flex items-center justify-between mb-4"><h3 class="text-2xl text-black condensed">YOUR FRIENDS</h3> <span class="text-xxs lg:text-sm text-BrandDarkGray">SMOKE THESE GUYS</span></div> <div class="space-y-4"><!> <!></div></div> <div class="w-full rounded lg:w-2/5 lg:pl-4"><div class="flex items-center justify-between mb-4"><h3 class="text-2xl text-black condensed">PLAYER SEARCH</h3> <span class="md:text-sm text-xxs text-BrandDarkGray">TIME FOR NEW FRIENDS</span></div> <div class="p-4 mb-4 bg-white rounded"><h4 class="mb-4 text-xl text-black condensed">SEARCH PLAYERS BY NAME</h4> <input type="text" placeholder="Enter Name" class="w-full p-3 text-lg bg-white border rounded border-BrandDivider"> <div class="pt-4 space-y-4"></div> <button>ADD FRIEND</button></div></div></div></div>',
  ),
  Lf = O(
    '<div class="w-full"><div class="flex items-center justify-between px-8 pt-4"><h2 class="text-5xl text-black md:text-4xl condensed">PROFILE</h2> <div class="justify-end hidden md:flex"><button>DETAILS</button> <button>SOCIAL</button></div></div> <!> <!> <div class="sticky bottom-0 left-0 right-0 z-10 flex w-full bg-white md:hidden"><button>DETAILS</button> <button>SOCIAL</button></div></div>',
  );
function Vf(e, t) {
  me(t, !1);
  let r = [
      {
        principalId: "LEE, M.W._4857357",
        displayName: "LEE, M.W.",
        handicap: [2],
      },
      { principalId: "WOLF_238475", displayName: "WOLF", handicap: [12] },
      { principalId: "MCELROY_238475", displayName: "MCELROY", handicap: [4] },
      { principalId: "HATTON_238475", displayName: "HATTON", handicap: [22] },
    ],
    a = [
      { principalId: "DECHU_475", requestTime: BigInt(Date.now()) },
      { principalId: "SMITH_238475", requestTime: BigInt(Date.now()) },
    ],
    n = [
      {
        golferPrincipalId: "SAVAGE3_238475",
        golferName: "SAVAGE3",
        golferPicture: [],
        golferPictureExtension: "jpg",
        handicap: [8],
      },
      {
        golferPrincipalId: "SAVAGE63_238475",
        golferName: "SAVAGE63",
        golferPicture: [],
        golferPictureExtension: "jpg",
        handicap: [22],
      },
    ],
    s = G({ username: "", handicap: [0] }),
    o = G(null),
    l = [],
    u = G(null),
    c = G("DETAILS"),
    p = G(!0),
    g = G(!1),
    d = G(!1),
    h = G(!1),
    b = G(""),
    _ = G(""),
    y = G(null);
  st(async () => {
    try {
      T(p, await kt.sync()), console.log("sync complete");
      const C = { limit: BigInt(10), offset: BigInt(0) };
      l = await Ar.getCourses(C);
    } catch (C) {
      console.error("Creating Golfer Error:", C);
    }
  });
  async function S() {
    if (i(p)) {
      if (!i(s).username) {
        T(b, "Username is required");
        return;
      }
      T(h, !0), T(b, "");
      try {
        const C = Number(i(s).handicap[0]);
        if (isNaN(C)) throw new Error("Invalid handicap value");
        const P = [C];
        await kt.createUser(i(s).username, P),
          T(p, !1),
          await kt.cacheProfile(),
          await kt.sync();
      } catch (C) {
        T(b, "Failed to create user. Please try again."),
          console.error("Error creating user:", C);
      } finally {
        T(h, !1), console.log("createUser complete");
      }
    }
  }
  async function k(C) {
    const { file: P, preview: I } = C.detail;
    T(o, I), T(g, !1);
    try {
      await kt.updateProfilePicture(P),
        await kt.cacheProfile(),
        await kt.sync(),
        console.log("Profile picture updated successfully");
    } catch (R) {
      console.error("Error updating profile picture:", R);
    }
  }
  async function E(C) {}
  async function w(C) {}
  function x() {
    i(y) && console.log("Sending friend request to:", i(y).golferName);
  }
  Ae(),
    Wt(e, {
      children: (C, P) => {
        var I = Lf(),
          R = v(I),
          B = m(v(R), 2),
          $ = v(B),
          j = m($, 2);
        f(B), f(R);
        var F = m(R, 2);
        {
          var U = (K) => {
            var q = Df(),
              de = v(q),
              he = v(de),
              Ie = m(v(he), 2),
              ve = v(Ie);
            {
              var ye = (W) => {
                  var ne = Of(),
                    ie = v(ne),
                    Se = m(ie, 2),
                    _e = v(Se);
                  xn(_e, { className: "w-4 h-4", fill: "white" }),
                    f(Se),
                    f(ne),
                    V(() => te(ie, "src", i(o))),
                    N("click", Se, () => T(g, !0)),
                    A(W, ne);
                },
                $e = (W) => {
                  var ne = Rf(),
                    ie = m(J(ne), 2),
                    Se = v(ie);
                  xn(Se, { className: "w-20 h-20", fill: "white" }),
                    f(ie),
                    N("click", ie, () => T(g, !0)),
                    A(W, ne);
                };
              D(ve, (W) => {
                i(o) ? W(ye) : W($e, !1);
              });
            }
            var X = m(ve, 2);
            {
              var ke = (W) => {
                Pf(W, {
                  get isOpen() {
                    return i(g);
                  },
                  $$events: { close: () => T(g, !1), fileSelect: k },
                });
              };
              D(X, (W) => {
                i(g) && W(ke);
              });
            }
            f(Ie), f(he);
            var qe = m(he, 2),
              Me = m(v(qe), 4);
            Oe(Me);
            var at = m(Me, 4);
            Oe(at);
            var De = m(at, 2);
            {
              var ue = (W) => {
                var ne = Bf(),
                  ie = J(ne);
                {
                  var Se = (ze) => {
                    var It = Nf(),
                      rn = v(It, !0);
                    f(It), V(() => L(rn, i(b))), A(ze, It);
                  };
                  D(ie, (ze) => {
                    i(b) && ze(Se);
                  });
                }
                var _e = m(ie, 2),
                  Le = v(_e);
                {
                  var ft = (ze) => {
                      var It = dr("Creating...");
                      A(ze, It);
                    },
                    ot = (ze) => {
                      var It = dr("CREATE USER");
                      A(ze, It);
                    };
                  D(Le, (ze) => {
                    i(h) ? ze(ft) : ze(ot, !1);
                  });
                }
                f(_e),
                  V(() => (_e.disabled = !i(s).username || i(h))),
                  N("click", _e, S),
                  A(W, ne);
              };
              D(De, (W) => {
                i(p) && W(ue);
              });
            }
            var oe = m(De, 2),
              Ee = m(v(oe), 2),
              Fe = m(v(Ee), 2);
            {
              var Ue = (W) => {
                  var ne = Gf(),
                    ie = v(ne),
                    Se = v(ie, !0);
                  f(ie);
                  var _e = m(ie, 2),
                    Le = v(_e);
                  xn(Le, { className: "w-4 h-4 fill-black" }),
                    f(_e),
                    f(ne),
                    V(() => L(Se, i(u).name)),
                    N("click", _e, () => T(d, !0)),
                    A(W, ne);
                },
                Ce = (W) => {
                  var ne = jf();
                  N("click", ne, () => T(d, !0)), A(W, ne);
                };
              D(Fe, (W) => {
                i(u) ? W(Ue) : W(Ce, !1);
              });
            }
            var Ye = m(Fe, 2);
            {
              var We = (W) => {
                gi(W, {
                  get isOpen() {
                    return i(d);
                  },
                  $$events: {
                    close: () => T(d, !1),
                    courseSelect: (ne) => {
                      T(u, ne.detail.course), T(d, !1);
                    },
                  },
                });
              };
              D(Ye, (W) => {
                i(d) && W(We);
              });
            }
            f(Ee),
              f(oe),
              f(qe),
              f(de),
              f(q),
              Be(
                Me,
                () => i(s).username,
                (W) => vt(s, (i(s).username = W)),
              ),
              Be(
                at,
                () => i(s).handicap[0],
                (W) => vt(s, (i(s).handicap[0] = W)),
              ),
              A(K, q);
          };
          D(F, (K) => {
            i(c) === "DETAILS" && K(U);
          });
        }
        var M = m(F, 2);
        {
          var H = (K) => {
            var q = Ff(),
              de = v(q),
              he = v(de),
              Ie = m(v(he), 2),
              ve = v(Ie);
            xe(
              ve,
              1,
              () => a,
              Ge,
              (De, ue) => {
                var oe = Uf(),
                  Ee = v(oe),
                  Fe = v(Ee),
                  Ue = m(v(Fe), 2),
                  Ce = v(Ue),
                  Ye = v(Ce, !0);
                f(Ce);
                var We = m(Ce, 2),
                  W = v(We, !0);
                f(We), f(Ue), f(Fe), we(2), f(Ee);
                var ne = m(Ee, 4),
                  ie = v(ne),
                  Se = m(ie, 2);
                f(ne),
                  f(oe),
                  V(
                    (_e) => {
                      L(Ye, i(ue).principalId), L(W, _e);
                    },
                    [() => i(ue).principalId.split("_")[0]],
                    Te,
                  ),
                  N("click", ie, () => E(i(ue))),
                  N("click", Se, () => w(i(ue))),
                  A(De, oe);
              },
            );
            var ye = m(ve, 2);
            xe(
              ye,
              1,
              () => r,
              Ge,
              (De, ue) => {
                var oe = $f(),
                  Ee = v(oe),
                  Fe = v(Ee),
                  Ue = m(v(Fe), 2),
                  Ce = v(Ue),
                  Ye = v(Ce, !0);
                f(Ce);
                var We = m(Ce, 2),
                  W = v(We, !0);
                f(We), f(Ue), f(Fe);
                var ne = m(Fe, 2),
                  ie = m(v(ne), 2),
                  Se = v(ie, !0);
                f(ie), f(ne), f(Ee);
                var _e = m(Ee, 2),
                  Le = m(v(_e), 2),
                  ft = v(Le, !0);
                f(Le),
                  f(_e),
                  we(2),
                  f(oe),
                  V(() => {
                    L(Ye, i(ue).principalId),
                      L(W, i(ue).displayName),
                      L(Se, i(ue).handicap[0]),
                      L(ft, i(ue).handicap[0]);
                  }),
                  A(De, oe);
              },
            ),
              f(Ie),
              f(he);
            var $e = m(he, 2),
              X = m(v($e), 2),
              ke = m(v(X), 2);
            Oe(ke);
            var qe = m(ke, 2);
            xe(
              qe,
              5,
              () => n,
              Ge,
              (De, ue) => {
                var oe = Mf();
                let Ee;
                var Fe = v(oe),
                  Ue = v(Fe),
                  Ce = m(v(Ue), 2),
                  Ye = v(Ce),
                  We = v(Ye, !0);
                f(Ye);
                var W = m(Ye, 2),
                  ne = v(W, !0);
                f(W), f(Ce), f(Ue);
                var ie = m(Ue, 2),
                  Se = m(v(ie), 2),
                  _e = v(Se, !0);
                f(Se),
                  f(ie),
                  f(Fe),
                  f(oe),
                  V(() => {
                    (Ee = le(
                      oe,
                      1,
                      "grid items-center w-full grid-cols-12 p-4 text-left bg-white rounded cursor-pointer hover:bg-gray-50",
                      null,
                      Ee,
                      { "bg-gray-50": i(y) === i(ue) },
                    )),
                      te(oe, "aria-selected", i(y) === i(ue)),
                      L(We, i(ue).golferPrincipalId),
                      L(ne, i(ue).golferName),
                      L(_e, i(ue).handicap[0]);
                  }),
                  N("click", oe, () => T(y, i(ue))),
                  N("keydown", oe, (Le) => {
                    (Le.key === "Enter" || Le.key === " ") && T(y, i(ue));
                  }),
                  A(De, oe);
              },
            ),
              f(qe);
            var Me = m(qe, 2);
            let at;
            f(X),
              f($e),
              f(de),
              f(q),
              V(() => {
                (at = le(
                  Me,
                  1,
                  "w-full p-3 mt-4 text-center transition-colors duration-200 rounded-lg",
                  null,
                  at,
                  {
                    "bg-BrandYellow": i(y),
                    "text-BrandForest": i(y),
                    "bg-gray-200": !i(y),
                    "text-gray-400": !i(y),
                    "cursor-not-allowed": !i(y),
                  },
                )),
                  (Me.disabled = !i(y));
              }),
              Be(
                ke,
                () => i(_),
                (De) => T(_, De),
              ),
              N("click", Me, x),
              A(K, q);
          };
          D(M, (K) => {
            i(c) === "SOCIAL" && K(H);
          });
        }
        var Y = m(M, 2),
          ee = v(Y),
          z = m(ee, 2);
        f(Y),
          f(I),
          V(() => {
            le(
              $,
              1,
              `px-10 py-3 text-xl text-BrandYellow condensed rounded-l-md rounded-r-none ${(i(c) === "DETAILS" ? "bg-BrandForest" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
            ),
              le(
                j,
                1,
                `px-10 py-3 text-xl text-BrandYellow condensed rounded-t-md ${(i(c) === "SOCIAL" ? "bg-BrandForest" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
              ),
              le(
                ee,
                1,
                `flex-1 py-2 text-xl condensed ${(i(c) === "DETAILS" ? "bg-BrandForest text-BrandYellow" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
              ),
              le(
                z,
                1,
                `flex-1 py-2 text-xl condensed ${(i(c) === "SOCIAL" ? "bg-BrandForest text-BrandYellow" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
              );
          }),
          N("click", $, () => T(c, "DETAILS")),
          N("click", j, () => T(c, "SOCIAL")),
          N("click", ee, () => T(c, "DETAILS")),
          N("click", z, () => T(c, "SOCIAL")),
          A(C, I);
      },
      $$slots: { default: !0 },
    }),
    be();
}
const Hf = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Vf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var qf =
  O(`<div class="md:px-4"><h2 class="mb-2 text-2xl tracking-wide condensed">VISION</h2> <div class="space-y-4"><p class="relative"><img src="panel-bg.jpg" alt="vision" class="w-full h-auto mb-4 rounded-lg shadow-md md:mb-0 md:w-1/3 md:float-right md:ml-4"> <span class="condensed">GOLFPAD</span> is building the future of golf by building you a new range of games and tools powered by AI.
      Whether you’re a seasoned player who thrives on the game’s challenges or a newcomer discovering its unique joys, <span class="condensed">GOLFPAD</span> is designed to enhance every step of your golfing journey.</p> <p>At the heart of our platform is <span class="condensed">MERVE</span>, your own personalised AI assistant there to help transform your game. <span class="condensed">MERVE</span> will chat to you about how far you are hitting specific clubs, let you know a specific ruling and even enter the scores for your weekend fourball. <span class="condensed">MERVE</span> will grow to do more than just the things a perfect caddy does, <span class="condensed">MERVE</span> will become your coach using AI powered swing analysis. 
      Begin chatting with <span class="condensed">MERVE</span> whenever you're ready to begin your golfing relationship.</p> <p><span class="condensed">GOLFPAD</span> also challenges players with our 4 new game formats, training golfers with new skills while they compete out on the course. <span class="condensed">GOLFPAD</span> will provide 3 new AI-driven side games that allow you and your friends to enjoy a more meaningful range & short game area experience.</p> <p class="mb-4"><span class="condensed">GOLFPAD</span> aims to preserve the traditions of golf whilst enabling cutting-edge technology to improve your golfing journey.</p></div></div>`);
function Yf(e) {
  var t = qf();
  A(e, t);
}
var Wf = O(
  '<div class="md:px-4"><h2 class="text-2xl condensed tracking-wide mb-2">MERVE</h2> <div class="space-y-4"><p class="relative"><span class="condensed">MERVE</span> is your new chat-based AI assistant, ready to become the most useful tool in your golf bag. Whether you’re out on the course or at the range, let <span class="condensed">MERVE</span> know about any shot that may help build your golfer profile. Tell <span class="condensed">MERVE</span> about the shot types you’re playing, the club you’re hitting, and even the course conditions. <span class="condensed">MERVE</span> brings together all kinds of information about your game to provide you with personalised advice that feels like having a coach in your pocket.</p> <p class="relative">But <span class="condensed">MERVE</span> doesn’t stop there. By recording where your ball ends up off the tee, <span class="condensed">MERVE</span>helps you play percentage golf—ensuring you’re making the smartest decisions on every shot. With the ability to gather and analyse data from multiple sources, <span class="condensed">MERVE</span> delivers advanced insights and tooling that take your game to the next level.</p> <p>With a friendly chat interface and voice input, <span class="condensed">MERVE</span>is easy to talk to in any weather. Beyond your game, <span class="condensed">MERVE</span> has been trained on the rules of golf to settle any on-course dispute. Just share the details of any situation, and <span class="condensed">MERVE</span> will reply with helpful, easy-to-understand guidance for all golfers involved, including the steps to follow.</p> <p>Whether you’re a weekend golfer or chasing your next handicap milestone, <span class="condensed">MERVE</span> combines cutting-edge AI with the personalised touch you need to get the most out of your golf game.</p> <p>As <span class="condensed">MERVE</span> grows he will offer his services to golf courses, offering a new simpler way to manage memberships, share course information and set up competitions. By enabling courses to communicate with each other, <span class="condensed">MERVE</span> will offer groundbreaking management features, from creating promotional offerings to hosting inter-club tournaments.</p> <p><span class="condensed">GOLFPAD</span>, our integrated platform, will benefit from <span class="condensed">MERVE</span> evolution, providing advanced tools to manage courses, tournaments, and handicaps with AI driven efficiency.</p> <p><span class="condensed">MERVE</span> will also revolutionise the social side of golf. He’ll connect users to arrange rounds with friends, or even pair golfers looking for a partner, making your entire golf experience as seamless as possible. And with swing analysis on the horizon, <span class="condensed">MERVE</span> will unlock deeper insights into your game, helping you refine your skills and lower your scores.</p> <p>Our voice-first interface ensures that you can talk to <span class="condensed">MERVE</span> easily, even when the weather makes typing difficult. Whether you’re seeking shot advice, settling on-course rules, or planning your next tournament, <span class="condensed">MERVE</span> is always ready to help - bringing cutting edge AI and a friendly conversational touch to every aspect of your golf journey.</p></div></div>',
);
function zf(e) {
  var t = Wf();
  A(e, t);
}
var Kf = O(
  '<div class="fixed inset-0 z-50 overflow-visible bg-black bg-opacity-50 shadow-lg modal-backdrop" aria-hidden="true"><div><div class="bg-BrandLightGray rounded-lg w-full overflow-y-auto max-h-[90vh] px-4 py-4 md:px-6" role="dialog" aria-modal="true"><!></div></div></div>',
);
function gr(e, t) {
  me(t, !1);
  const r = G();
  let a = Z(t, "showModal", 8),
    n = Z(t, "onClose", 8),
    s = Z(t, "useFixedPosition", 8, !1),
    o = G(),
    l = G(),
    u = !1;
  const c = (S) => {
    S.key === "Escape" && a() && n()();
  };
  typeof window < "u" && window.addEventListener("keydown", c),
    Wl(() => {
      typeof window < "u" &&
        (window.removeEventListener("keydown", c),
        (document.body.style.overflow = "auto"));
    });
  const p = (S) => {
      const k = document.querySelector('[role="dialog"]'),
        E = S.target;
      !k?.contains(E) && !u && n()();
    },
    g = () => {
      u = !1;
    },
    d = () => {
      u = !0;
    },
    h = () => {
      setTimeout(() => {
        u = !1;
      }, 0);
    };
  At(
    () => Ra(a()),
    () => {
      typeof window < "u" &&
        a() &&
        (T(o, window.scrollY), T(l, window.innerWidth < 768));
    },
  ),
    At(
      () => (i(l), i(o)),
      () => {
        T(
          r,
          i(l)
            ? i(o) + window.innerHeight * 0.45
            : i(o) + window.innerHeight / 2,
        );
      },
    ),
    At(
      () => Ra(a()),
      () => {
        typeof window < "u" &&
          (a()
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto"));
      },
    ),
    Rr(),
    Ae();
  var b = ge(),
    _ = J(b);
  {
    var y = (S) => {
      var k = Kf(),
        E = v(k),
        w = v(E),
        x = v(w);
      Lo(x, t, "default", {}),
        f(w),
        f(E),
        f(k),
        V(() => {
          le(
            E,
            1,
            `border-2 shadow-md rounded-lg border-BrandPurple/50 ${(s() ? "absolute" : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2") ?? ""} 
           w-full max-w-lg px-4 md:px-0`,
          ),
            te(
              E,
              "style",
              s()
                ? `top: ${i(r)}px; transform: translate(-50%, -50%); left: 50%;`
                : "",
            );
        }),
        Jt(
          1,
          w,
          () => Hs,
          () => ({ duration: 2e3 }),
        ),
        Jt(
          2,
          w,
          () => Hs,
          () => ({ duration: 2e3 }),
        ),
        N("click", k, p),
        N("mousedown", k, g),
        N("mousemove", k, d),
        N("mouseup", k, h),
        Jt(
          1,
          k,
          () => ta,
          () => ({ duration: 2e3 }),
        ),
        Jt(
          2,
          k,
          () => ta,
          () => ({ duration: 2e3 }),
        ),
        A(S, k);
    };
    D(_, (S) => {
      a() && S(y);
    });
  }
  A(e, b), be();
}
var Xf = O(
  '<div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0"><div class="flex flex-col space-y-2 text-xl leading-relaxed p-4"><p class="relative"><span class="condensed">BOMBS</span> is a cutting-edge game format that transforms your driving range sessions into interactive, competitive, and endlessly entertaining experiences. Designed to bring a social element to your practice, <span class="condensed">BOMBS</span> introduces an exciting new way to challenge yourself and your friends while sharpening your accuracy and focus.</p> <p class="relative">Here’s how it works: Friends can tune into each other’s live driving range streams, creating a shared experience no matter where they are. Using their devices, they select specific targets on the range for the player on the tee to aim for. This isn’t just about hitting long drives—it’s about precision, strategy, and rising to the challenge your friends set for you.</p> <p class="relative">Thanks to advanced AI capabilities, the game identifies when a golfer successfully hits a target, awarding points in real time. Every successful shot brings a mix of satisfaction and bragging rights, while missed targets fuel the fun and banter that makes <span class="condensed">BOMBS</span> so engaging.</p> <p class="relative">Whether you’re practicing solo and inviting friends to join remotely or competing side-by-side at the range, <span class="condensed">BOMBS</span> adds an electrifying layer of competition and camaraderie to every session. It’s not just about hitting the ball; it’s about making every shot count in a dynamic, interactive game that keeps you coming back for more.</p></div></div>',
);
function Jf(e) {
  let t = G(!1);
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (r, a) => {
      var n = Xf();
      A(r, n);
    },
    $$slots: { default: !0 },
  });
}
var Qf = O(
  '<div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0"><div class="flex flex-col space-y-2 text-xl leading-relaxed p-4"><p class="relative"><span class="condensed">BULLSEYE</span> takes your putting practice to a whole new level, turning every putt into a fun, competitive challenge that sharpens your accuracy and touch. Designed for groups, <span class="condensed">BULLSEYE</span> adds an exciting twist to your putting sessions, making it a game of skill and precision with every stroke.</p> <p class="relative">Here’s how it works: Players take turns attempting to hit designated targets on the green, with points awarded for getting within a putter’s length of the hole. It’s all about precision, as each putt must be carefully judged to land as close to the hole as possible. The more accurate your putts, the higher your score, creating a thrilling dynamic of friendly competition.</p> <p class="relative"><span class="condensed">BULLSEYE</span> encourages players to refine their putting technique in a relaxed yet challenging environment, fostering both individual focus and group camaraderie. Whether you’re practicing with friends or challenging yourself to beat your best, <span class="condensed">BULLSEYE</span> makes every putting session a rewarding experience.</p> <p class="relative">Ideal for groups of golfers, <span class="condensed">BULLSEYE</span> turns your practice into an engaging game that’s as fun as it is effective. Perfect your putting, engage in friendly competition, and make every round count—one precise putt at a time.</p></div></div>',
);
function Zf(e) {
  let t = G(!1);
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (r, a) => {
      var n = Qf();
      A(r, n);
    },
    $$slots: { default: !0 },
  });
}
var ev = O(
  '<div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0"><div class="flex flex-col space-y-2 text-xl leading-relaxed p-4"><p class="relative"><span class="condensed">PIN HIGH</span> reimagines your chipping practice, turning it into an engaging and competitive experience that sharpens your skills while keeping things fun and social. Designed for groups of golfers, <span class="condensed">PIN HIGH</span> challenges you to perfect your touch and precision around the green, making every practice session as rewarding as it is enjoyable.</p> <p class="relative">Here’s how it works: Players take turns aiming for specific targets, with points awarded for hitting the right distance and getting close to the hole. It’s not just about making the shot—it’s about dialing in your control and accuracy to outscore your friends. Whether you’re playing casually or competing fiercely, <span class="condensed">PIN HIGH</span> transforms chipping practice into a game that’s easy to play and hard to put down.</p> <p class="relative">With its dynamic scoring and interactive approach, <span class="condensed">PIN HIGH</span> encourages strategic thinking and steady improvement. Each shot becomes an opportunity to test your skills, refine your technique, and gain valuable feedback—all while enjoying the camaraderie of friendly competition.</p> <p class="relative">Whether you’re at the range or in a backyard setup, <span class="condensed">PIN HIGH</span> brings a new level of excitement to your short game. It’s the perfect way to elevate your practice, connect with others, and master the art of getting up and down.</p></div></div>',
);
function tv(e) {
  let t = G(!1);
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (r, a) => {
      var n = ev();
      A(r, n);
    },
    $$slots: { default: !0 },
  });
}
var rv = O(
  `<!> <!> <!> <div class="md:px-4"><h2 class="text-2xl condensed tracking-wide mb-2">OUR AI POWERED SIDE GAMES</h2> <div class="space-y-4"><p class="relative">We’re excited to unveil <span class="condensed">THREE</span> groundbreaking AI-powered side game formats, designed to revolutionise the way you practice and enhance your social golf experience—no matter where you are in the world.</p> <p class="relative">These innovative formats harness the power of your mobile device’s AI capabilities, transforming traditional practice facilities into dynamic game arenas for you and your friends. Whether you’re looking to sharpen your skills, engage in friendly competition, or simply add some excitement to your practice routine, these games bring a whole new dimension to the way you train.
      In the sections that follow, we’ll introduce each of these three AI-driven experiences, detailing how they work and the specific aspects of your game they’re designed to improve. Get ready to practice smarter, play better, and have more fun than ever before.</p> <p class="relative">These innovative formats harness the power of your mobile device’s AI capabilities, transforming traditional practice facilities into dynamic game arenas for you and your friends. Whether you’re looking to sharpen your skills, engage in friendly competition, or simply add some excitement to your practice routine, these games bring a whole new dimension to the way you train.
      In the sections that follow, we’ll introduce each of these three AI-driven experiences, detailing how they work and the specific aspects of your game they’re designed to improve. Get ready to practice smarter, play better, and have more fun than ever before.</p></div> <div class="pt-4 flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-2 mt-2 mb-32"><div class="flex flex-col w-full space-y-2 md:w-1/3"><div class="aspect-square rounded-2xl overflow-hidden"><img src="game-images/bombs.jpg" alt="bombs" class="w-full h-full object-fill"></div> <p class="text-3xl text-center condensed md:text-lg">BOMBS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/3"><div class="aspect-square rounded-2xl overflow-hidden"><img src="game-images/pin-high.jpg" alt="pin-high" class="w-full h-full object-cover"></div> <p class="text-3xl text-center condensed md:text-lg">PIN HIGH</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/3"><div class=" overflow-hidden"><img src="game-images/bullseye.jpg" alt="bullseye" class="w-full h-full object-cover"></div> <p class="text-3xl text-center condensed md:text-lg">BULLSEYE</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div></div></div>`,
  1,
);
function av(e) {
  let t = G(!1),
    r = G(!1),
    a = G(!1);
  var n = rv(),
    s = J(n);
  {
    var o = (E) => {
      Jf(E);
    };
    D(s, (E) => {
      i(t) && E(o);
    });
  }
  var l = m(s, 2);
  {
    var u = (E) => {
      tv(E);
    };
    D(l, (E) => {
      i(r) && E(u);
    });
  }
  var c = m(l, 2);
  {
    var p = (E) => {
      Zf(E);
    };
    D(c, (E) => {
      i(a) && E(p);
    });
  }
  var g = m(c, 2),
    d = m(v(g), 4),
    h = v(d),
    b = m(v(h), 4);
  f(h);
  var _ = m(h, 2),
    y = m(v(_), 4);
  f(_);
  var S = m(_, 2),
    k = m(v(S), 4);
  f(S),
    f(d),
    f(g),
    N("click", b, () => {
      T(t, !0);
    }),
    N("click", y, () => {
      T(r, !0);
    }),
    N("click", k, () => {
      T(a, !0);
    }),
    A(e, n);
}
var nv = O(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">BANDS</span> is an exciting new game format designed to help you capitalise on those "purple patches"—the stretches in your golf round where you know you tend to play your best. It’s a game that rewards strategic thinking, consistency, and your ability to perform under pressure, no matter when your game heats up.</p> <p class="relative">Here’s how it works: At the start of your round, you’ll select a three-hole stretch, known as your <span class="condensed">BANDS</span>, where you aim to shine. This is your moment to rack up points by excelling in one of our nine achievement categories. From hitting fairways and greens to avoiding penalties like lost balls, every element of your game contributes to your overall score.</p> <p class="relative">Points are awarded for performing well during your <span class="condensed">BANDS</span>, whether it’s a string of solid pars, hitting every green in regulation, or nailing a clutch birdie. The goal is simple: train your focus and precision during this chosen stretch to maximise your scoring potential. But the impact goes beyond just the BAND itself—<span class="condensed">BANDS</span> is designed to enhance every part of your game, helping you build consistency and confidence across the board, from tee to green.</p> <p class="relative">What makes <span class="condensed">BANDS</span> so exciting is its flexibility. Whether you’re the type of golfer who starts strong, finishes with a flourish, or peaks somewhere in the middle, <span class="condensed">BANDS</span> allows you to choose the part of your round where you’re most likely to excel. It’s not just about playing well—it’s about playing well at the right time.</p> <p class="relative">Perfect for friendly matches, practice rounds, or personal challenges, <span class="condensed">BANDS</span> adds a fresh dimension to your game, encouraging you to refine your skills while keeping the competition fun and engaging. With its innovative approach to training and scoring, <span class="condensed">BANDS</span> is your opportunity to make every round more rewarding, one BAND at a time.</p></div></div>',
);
function sv(e) {
  let t = G(!1),
    r = G(0),
    a = [
      {
        src: "whitepaper/bands1.jpg",
        alt: "Prediction view",
        nextLabel: "Show Live View",
      },
      {
        src: "whitepaper/bands2.jpg",
        alt: "Live view",
        nextLabel: "Show Results View",
      },
      {
        src: "whitepaper/bands3.jpg",
        alt: "Results view",
        nextLabel: "Show Prediction View",
      },
    ];
  async function n() {
    T(r, (i(r) + 1) % a.length);
  }
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (s, o) => {
      var l = nv(),
        u = v(l),
        c = v(u),
        p = m(c, 2),
        g = v(p, !0);
      f(p),
        f(u),
        we(2),
        f(l),
        V(() => {
          te(c, "src", a[i(r)].src),
            te(c, "alt", a[i(r)].alt),
            L(g, a[i(r)].nextLabel);
        }),
        N("click", p, n),
        A(s, l);
    },
    $$slots: { default: !0 },
  });
}
var ov = O(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">BUILD IT</span> is an innovative and customisable team-based format that brings a new level of camaraderie and competition to golf. Designed for groups of friends, it allows golfers to create their own unique tournaments, playing together over a chosen course and timeframe that suits their schedules and ambitions.</p> <p class="relative">Here’s how it works: Players form teams and compete against other teams, building a combined scorecard using their lowest individual scores. This collaborative approach ensures that every contribution matters, while also encouraging teammates to push each other to perform their best. The format is entirely flexible, letting golfers decide how long the competition runs—whether it’s a single round, a weeklong event, or even an epic season that stretches across an entire year.</p> <p class="relative">The magic of <span class="condensed">BUILD IT</span> lies in its adaptability. Teams can tailor the experience to fit their goals, preferences, and schedules, making it perfect for everything from casual weekend rivalries to long-term leaderboards. With its ability to bring friends together in a shared quest for victory, <span class="condensed">BUILD IT</span> fosters stronger bonds and plenty of friendly banter along the way.</p> <p class="relative">By focusing on teamwork, strategy, and consistency, <span class="condensed">BUILD IT</span> offers golfers a fresh and engaging way to enjoy the sport they love. It’s not just about individual performance—it’s about creating something greater together and enjoying every step of the journey. Whether you’re competing for bragging rights or organising a yearlong competition, <span class="condensed">BUILD IT</span> transforms golf into a truly collaborative adventure.</p></div></div>',
);
function iv(e) {
  let t = G(!1),
    r = G(0),
    a = [
      {
        src: "whitepaper/build-it1.jpg",
        alt: "Team Creation View",
        nextLabel: "Show Results View",
      },
      {
        src: "whitepaper/build-it2.jpg",
        alt: "Results screen",
        nextLabel: "Show Team View",
      },
    ];
  async function n() {
    T(r, (i(r) + 1) % a.length);
  }
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (s, o) => {
      var l = ov(),
        u = v(l),
        c = v(u),
        p = m(c, 2),
        g = v(p, !0);
      f(p),
        f(u),
        we(2),
        f(l),
        V(() => {
          te(c, "src", a[i(r)].src),
            te(c, "alt", a[i(r)].alt),
            L(g, a[i(r)].nextLabel);
        }),
        N("click", p, n),
        A(s, l);
    },
    $$slots: { default: !0 },
  });
}
var lv = O(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">MULLIGANS</span> is an exciting new twist on the traditional match play format, designed to add a layer of strategy and fun to your round of golf. It’s a game that rewards tactical thinking, careful decision-making, and the ability to bounce back from mistakes—perfect for golfers looking to shake up their usual match play routine.</p> <p class="relative">In <span class="condensed">MULLIGANS</span>, both players automatically receive a mulligan every three holes, starting with the 1st hole and continuing on the 4th, 7th, 10th, 13th, and 16th. These "do-over" shots can be used at any time, giving golfers the opportunity to replay a wayward drive, take another approach shot, or try again on the greens—all with the aim of staying competitive in the match.</p> <p class="relative">But here’s where the strategy deepens: golfers also compete to earn additional mulligans by winning a hole. Each hole becomes a battle not just for the lead but for valuable resources that can change the tide of the game. Will you save your mulligan for a critical moment later in the round, or use it now to put pressure on your opponent?</p> <p class="relative">The key to <span class="condensed">MULLIGANS</span> lies in how you play them. A well-timed mulligan can help secure a win on a tough hole or stop your opponent from running away with the match. Every decision becomes part of the strategy, keeping the competition fresh, engaging, and unpredictable from start to finish.</p> <p class="relative">With <span class="condensed">MULLIGANS</span>, golfers can enjoy their round with a little less pressure, knowing that a few mistakes are not just allowed—they’re part of the fun. It’s a format that brings out the competitive spirit while encouraging players to laugh off the occasional misstep, making it perfect for friendly matches or lively rivalries.</p> <p class="relative">Whether you’re a seasoned golfer or a casual player, <span class="condensed">MULLIGANS</span> offers a new way to enjoy the game, combining tradition with innovation for a round that’s as entertaining as it is strategic.</p></div></div>',
);
function cv(e) {
  let t = G(!1),
    r = G(0),
    a = [
      {
        src: "whitepaper/mulligans1.jpg",
        alt: "In-game view",
        nextLabel: "Show Results View",
      },
      {
        src: "whitepaper/mulligans2.jpg",
        alt: "Results screen",
        nextLabel: "Show In-game View",
      },
    ];
  async function n() {
    T(r, (i(r) + 1) % a.length);
  }
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (s, o) => {
      var l = lv(),
        u = v(l),
        c = v(u),
        p = m(c, 2),
        g = v(p, !0);
      f(p),
        f(u),
        we(2),
        f(l),
        V(() => {
          te(c, "src", a[i(r)].src),
            te(c, "alt", a[i(r)].alt),
            L(g, a[i(r)].nextLabel);
        }),
        N("click", p, n),
        A(s, l);
    },
    $$slots: { default: !0 },
  });
}
var dv = O(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">NEXT UP</span> is a dynamic and competitive new game format that puts a spotlight on performing under pressure, especially when it’s your turn to go first off the tee. It’s all about stepping up when it matters most, defending your assigned holes, and seizing opportunities to gain an edge over your opponents.</p> <p class="relative">Here’s how it works: Each hole is a chance to earn points. A golfer earns 3 points for successfully defending a hole when they’re first off the tee, while their opponent can earn 1 point if they manage to beat the defender. The game keeps things fair and exciting by randomising who tees off first across the round, ensuring everyone gets their share of opportunities to defend.</p> <p class="relative">But that’s not all—<span class="condensed">NEXT UP</span> has a clever comeback mechanic. Any remaining unassigned holes are given to the golfer with the lowest score at the time of tee-off. This creates a unique opportunity for the trailing player to defend the hole, potentially swinging momentum back in their favor and leveling the playing field.</p> <p class="relative">The genius of <span class="condensed">NEXT UP</span> lies in its focus on pressure situations. By training golfers to perform when they’re first off the tee, this format sharpens your ability to stay composed, deliver clutch drives, and take control of the hole from the very start.</p> <p class="relative">Whether you’re playing with friends or looking to refine your skills under competition-like conditions, <span class="condensed">NEXT UP</span> keeps every round fresh, engaging, and full of strategic decisions. It’s a format that builds confidence and adds an extra layer of excitement to your golf game, ensuring that every hole is packed with purpose and potential.</p></div></div>',
);
function uv(e) {
  let t = G(!1),
    r = G(0),
    a = [
      {
        src: "whitepaper/next-up1.jpg",
        alt: "Live View",
        nextLabel: "Show Results View",
      },
      {
        src: "whitepaper/next-up2.jpg",
        alt: "Results screen",
        nextLabel: "Show Live View",
      },
    ];
  async function n() {
    T(r, (i(r) + 1) % a.length);
  }
  gr(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      T(t, !1);
    },
    children: (s, o) => {
      var l = dv(),
        u = v(l),
        c = v(u),
        p = m(c, 2),
        g = v(p, !0);
      f(p),
        f(u),
        we(2),
        f(l),
        V(() => {
          te(c, "src", a[i(r)].src),
            te(c, "alt", a[i(r)].alt),
            L(g, a[i(r)].nextLabel);
        }),
        N("click", p, n),
        A(s, l);
    },
    $$slots: { default: !0 },
  });
}
var fv = O(
  '<!> <!> <!> <!> <div class="md:px-4"><h2 class="mb-2 text-2xl tracking-wide condensed">OUR NEW GAMES</h2> <div class="space-y-4"><p class="relative">We’re excited to introduce <span class="condensed">FOUR</span> new game formats designed with the next generation of golfers in mind. These fresh takes on the sport offer opportunities to challenge yourself, refine your skills, and enjoy the game in new ways. Whether you’re aiming for serious competition or just some lighthearted fun, these formats have something for everyone.</p> <p class="relative">Blending the traditions of golf with creative innovations, each format adds a unique twist to the game. Some reimagine classic rules for a modern edge, while others take an entirely new approach to keep things fresh and engaging. They’re designed to make every round memorable, no matter your skill level.</p> <p class="relative">In the following sections, you’ll learn what makes each format stand out and why they’re worth trying. With <span class="condensed">GOLFPAD</span>, golf’s rich history and exciting future come together, offering new ways to play, compete, and grow.</p></div> <div class="flex flex-col w-full pt-4 mt-2 space-y-4 md:flex-row md:space-y-0 md:space-x-2"><div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden aspect-square rounded-2xl"><img src="game-images/mulligans.jpg" alt="mulligans" class="object-fill w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">MULLIGANS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden aspect-square rounded-2xl"><img src="game-images/bands.jpg" alt="bands" class="object-cover w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">BANDS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden "><img src="game-images/next-up.jpg" alt="next-up" class="object-cover w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">NEXT UP</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden aspect-square rounded-2xl"><img src="game-images/build-it.jpg" alt="build-it" class="object-cover w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">BUILD IT</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div></div></div>',
  1,
);
function vv(e) {
  let t = G(!1),
    r = G(!1),
    a = G(!1),
    n = G(!1);
  var s = fv(),
    o = J(s);
  {
    var l = (I) => {
      cv(I);
    };
    D(o, (I) => {
      i(t) && I(l);
    });
  }
  var u = m(o, 2);
  {
    var c = (I) => {
      sv(I);
    };
    D(u, (I) => {
      i(r) && I(c);
    });
  }
  var p = m(u, 2);
  {
    var g = (I) => {
      iv(I);
    };
    D(p, (I) => {
      i(n) && I(g);
    });
  }
  var d = m(p, 2);
  {
    var h = (I) => {
      uv(I);
    };
    D(d, (I) => {
      i(a) && I(h);
    });
  }
  var b = m(d, 2),
    _ = m(v(b), 4),
    y = v(_),
    S = m(v(y), 4);
  f(y);
  var k = m(y, 2),
    E = m(v(k), 4);
  f(k);
  var w = m(k, 2),
    x = m(v(w), 4);
  f(w);
  var C = m(w, 2),
    P = m(v(C), 4);
  f(C),
    f(_),
    f(b),
    N("click", S, () => {
      T(t, !0);
    }),
    N("click", E, () => {
      T(r, !0);
    }),
    N("click", x, () => {
      T(a, !0);
    }),
    N("click", P, () => {
      T(n, !0);
    }),
    A(e, s);
}
var pv = O(
  '<div class="flex flex-col space-y-4"><h2 class="text-2xl font-black text-black condensed">MARKETING</h2> <p>At Waterway Labs, we are more than just a tech company—we are innovators on a mission to create groundbreaking, community-driven applications that bridge the gap between digital and real-world experiences. Our passion for creating memorable events that introduce people to new technologies is the driving force behind everything we do.</p> <p>What sets us apart? Our unique niche. At Waterway Labs, we use narrowboats—an unexpected yet beloved element—to infuse excitement and originality into our projects. This distinctive approach adds a fresh, unforgettable twist to each of our products, making them truly stand out. It’s not just about creating tech, it’s about creating experiences that resonate with our audience.</p> <div class="w-full mt-4"><img src="whitepaper/boat.jpg" alt="boat" class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center"></div> <p><span class="condensed">GOLFPAD</span>, will carry this philosophy to new heights. We are bringing the ultimate combination of fun, technology, and community to life by creating a floating mini-golf course that will be used for promotional events across the UK. This innovative concept will allow golf enthusiasts and casual players alike to enjoy a new way to play and connect with others.</p> <p>To ensure maximum exposure, we will anchor our floating <span class="condensed">GOLFPAD MINI-PUTT</span> course near some of the world’s most renowned golf courses, with our debut location nestled in the heart of Surrey, one of the UK’s premier golfing regions. By mooring our course at these prestigious sites, we’ll introduce our unique gamified golf experience to both seasoned players and curious newcomers. We’re not just creating another mini-golf course—we’re creating a destination for fun, entertainment, and social connection.</p> <p>Our goal is to seamlessly merge the real-world excitement of golf with the power of social media and digital engagement, positioning <span class="condensed">GOLFPAD</span> at the center of an already competitive and passionate golfing community. With an eye on growth, we’re strategically building a strong online presence, engaging with influencers, and promoting our events to connect with a broader audience. We believe <span class="condensed">GOLFPAD</span> will quickly become the must-visit attraction for golf fans in the UK and beyond.</p> <p>As we set our sights on expansion, we recognise that the US will be a key market for <span class="condensed">GOLFPAD</span>. To ensure a smooth entry, our promotional team is already cultivating strong relationships with some of the country’s most prestigious golf courses, showcasing their beauty and features on our platform. By showcasing these stunning locations, we aim to build a connection with American golfers and inspire the next generation to embrace the world of golf in new and exciting ways.</p> <p>With <span class="condensed">GOLFPAD</span>, we’re not just building a product—we’re creating a global movement that brings people together, elevates the golfing experience, and fuels a passion for innovation. Join us on this journey as we change the way people experience golf—one floating course at a time.</p> <p>Like most successful brands, we too have our niche. We use narrowboats, something most people we have met love, to bring a unique excitement to each one of our products.</p></div>',
);
function hv(e) {
  var t = pv();
  A(e, t);
}
var gv = O(
  '<div class="flex flex-col space-y-4 text-base"><h2 class="text-2xl font-black text-black condensed">ROADMAP</h2> <div class="w-full mt-4"><img src="whitepaper/roadmap.jpg" alt="roadmap" class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center"></div> <p class="relative"><span class="condensed">Q1 2025:</span> The year kicks off with an exciting beginning as we engage and welcome our first users to the <span class="condensed">GOLFPAD</span> ecosystem. Our initial focus will be on introducing them to our first player tool—<span class="condensed">SHOTS</span>—setting the stage for a seamless golfing experience. Early adopters will dive into a world of smarter play, building the foundation for what’s to come.</p> <p class="relative"><span class="condensed">Q2 2025:</span> As the summer season heats up, so will the excitement around <span class="condensed">GOLFPAD</span>. This quarter, users will immerse themselves in our innovative game formats—<span class="condensed">MULLIGANS</span>, <span class="condensed">BANDS</span>, and <span class="condensed">NEXT UP</span>. These formats will empower golfers to elevate their skills, connect with friends, and enjoy friendly competition on the course. By the end of Q2, our community will be fully engaged, creating a buzz that sets the stage for what’s next.</p> <p class="relative"><span class="condensed">Q3 2025:</span> Building on the success of our 4-ball formats, we will introduce our first team-based game—<span class="condensed">BUILD-IT</span>. Designed to bring friends, families, and communities together, <span class="condensed">BUILD-IT</span> will take the <span class="condensed">GOLFPAD</span> experience to new heights, offering a dynamic and strategic way for golfers to collaborate, compete, and refine their skills as a team.</p> <p class="relative"><span class="condensed">Q4 2025:</span> As we approach the end of the year, we’ll evaluate the evolving technology landscape and explore opportunities for decentralisation within the <span class="condensed">GOLFPAD</span> platform. Whether through shared ownership or profit-sharing models, we’re committed to giving our users a more direct stake in the future of <span class="condensed">GOLFPAD</span>—ensuring that the platform remains community-driven and that everyone who contributes to our success can reap the rewards.</p> <p class="relative">With each step, <span class="condensed">GOLFPAD</span> will grow stronger, more innovative, and more aligned with the evolving needs of the golf community. This roadmap represents just the beginning of our journey towards reshaping the future of golf, and we’re excited to have users like you along for the ride.</p></div>',
);
function mv(e) {
  var t = gv();
  A(e, t);
}
var bv = O("<button></button>"),
  yv = O(
    '<div class="flex flex-col"><div class="flex"><!></div> <div class="flex flex-col mt-8 text-xs"><div class="flex flex-row space-x-2"><button class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white">Previous Section</button> <button class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white">Next Section</button></div> <div class="flex flex-row justify-center my-4"></div></div></div>',
  ),
  _v = O(
    '<div class="w-full h-full p-2 px-4 text-black"><h2 class="mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed">GOLFPAD WHITEPAPER</h2> <div class="flex flex-col w-full md:flex-row"><img src="mulligans.png" alt="hero" class="w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg"> <div class="w-full px-2 mt-4 md:w-3/4 md:mt-0"></div></div></div>',
  );
function wv(e) {
  let t = G("vision"),
    r = "top";
  const a = [
    { name: "Vision", component: Yf },
    { name: "Merve", component: zf },
    { name: "New Games", component: vv },
    { name: "Side Games", component: av },
    { name: "Marketing", component: hv },
    { name: "Road Map", component: mv },
  ];
  function n() {
    const u = a.findIndex((c) => c.name.toLowerCase() === i(t));
    u < a.length - 1 && T(t, a[u + 1].name.toLowerCase());
  }
  function s() {
    const u = a.findIndex((c) => c.name.toLowerCase() === i(t));
    u > 0 && T(t, a[u - 1].name.toLowerCase());
  }
  function o(u) {
    return a[u].name.toLowerCase() === i(t);
  }
  function l(u) {
    T(t, a[u].name.toLowerCase());
  }
  Wt(e, {
    children: (u, c) => {
      var p = _v(),
        g = m(v(p), 2),
        d = v(g);
      te(d, "style", `--crop-position-y: ${r};`);
      var h = m(d, 2);
      xe(
        h,
        5,
        () => a,
        Ge,
        (b, _) => {
          let y = () => i(_).name,
            S = () => i(_).component;
          var k = ge(),
            E = J(k);
          {
            var w = (x) => {
              var C = yv(),
                P = v(C),
                I = v(P);
              xa(I, S, (U, M) => {
                M(U, {});
              }),
                f(P);
              var R = m(P, 2),
                B = v(R),
                $ = v(B),
                j = m($, 2);
              f(B);
              var F = m(B, 2);
              xe(
                F,
                5,
                () => a,
                Ge,
                (U, M, H, Y) => {
                  var ee = bv();
                  V(
                    (z) => {
                      le(ee, 1, z),
                        te(ee, "aria-label", `Go to ${a[H].name} section`);
                    },
                    [
                      () => `
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-0.5 cursor-pointer border-none
                      ${o(H) ? "bg-BrandBlue" : "bg-gray-500 hover:bg-gray-600"}
                    `,
                    ],
                    Te,
                  ),
                    N("click", ee, () => l(H)),
                    A(U, ee);
                },
              ),
                f(F),
                f(R),
                f(C),
                V(
                  (U, M) => {
                    ($.disabled = U), (j.disabled = M);
                  },
                  [
                    () =>
                      a.findIndex((U) => U.name.toLowerCase() === i(t)) === 0,
                    () =>
                      a.findIndex((U) => U.name.toLowerCase() === i(t)) ===
                      a.length - 1,
                  ],
                  Te,
                ),
                N("click", $, s),
                N("click", j, n),
                A(x, C);
            };
            D(E, (x) => {
              i(t) === y().toLowerCase() && x(w);
            });
          }
          A(b, k);
        },
      ),
        f(h),
        f(g),
        f(p),
        A(u, p);
    },
    $$slots: { default: !0 },
  });
}
const xv = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: wv },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function kv(e) {
  return new Worker(
    "" + new URL("../workers/auth.worker-7D_JHySN.js", import.meta.url).href,
    { type: "module", name: e?.name },
  );
}
const Ev = Object.freeze(
  Object.defineProperty({ __proto__: null, default: kv }, Symbol.toStringTag, {
    value: "Module",
  }),
);
export {
  Qc as E,
  zc as L,
  ct as _,
  Dv as a,
  Wc as b,
  Tv as c,
  Uv as d,
  $v as e,
  Mv as f,
  Iv as g,
  Yc as h,
  Qd as i,
  Su as j,
  Uu as k,
  Cv as l,
  Bv as m,
  jv as n,
  qu as o,
  cf as p,
  bf as q,
  Gv as r,
  Nv as s,
  wf as t,
  kf as u,
  Vf as v,
  wv as w,
};

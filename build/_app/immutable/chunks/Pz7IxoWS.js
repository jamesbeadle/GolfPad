var Nl = Object.defineProperty;
var xs = (e) => {
  throw TypeError(e);
};
var Pl = (e, t, a) =>
  t in e
    ? Nl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
    : (e[t] = a);
var Tr = (e, t, a) => Pl(e, typeof t != "symbol" ? t + "" : t, a),
  ks = (e, t, a) => t.has(e) || xs("Cannot " + a);
var Z = (e, t, a) => (
    ks(e, t, "read from private field"), a ? a.call(e) : t.get(e)
  ),
  nt = (e, t, a) =>
    t.has(e)
      ? xs("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, a),
  yn = (e, t, a, r) => (
    ks(e, t, "write to private field"), r ? r.call(e, a) : t.set(e, a), a
  );
import {
  D as Es,
  c as Ol,
  u as Bl,
  A as Gl,
  b as As,
  H as Nn,
  a as oo,
} from "./D9toh9r9.js";
var tn = Array.isArray,
  Il = Array.prototype.indexOf,
  qn = Array.from,
  Wn = Object.defineProperty,
  da = Object.getOwnPropertyDescriptor,
  lo = Object.getOwnPropertyDescriptors,
  jl = Object.prototype,
  Ul = Array.prototype,
  Yn = Object.getPrototypeOf;
function Fl(e) {
  return typeof e == "function";
}
const Ze = () => {};
function Ml(e) {
  return typeof e?.then == "function";
}
function $l(e) {
  return e();
}
function er(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
const St = 2,
  io = 4,
  an = 8,
  rn = 16,
  Yt = 32,
  br = 64,
  jr = 128,
  ft = 256,
  Ur = 512,
  We = 1024,
  Dt = 2048,
  ha = 4096,
  Ht = 8192,
  nn = 16384,
  co = 32768,
  Ra = 65536,
  Vl = 1 << 17,
  Hl = 1 << 19,
  uo = 1 << 20,
  ua = Symbol("$state"),
  fo = Symbol("legacy props"),
  ql = Symbol("");
function vo(e) {
  return e === this.v;
}
function po(e, t) {
  return e != e
    ? t == t
    : e !== t || (e !== null && typeof e == "object") || typeof e == "function";
}
function Dn(e) {
  return !po(e, this.v);
}
function Wl(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Yl() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Dl(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function zl() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Kl() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Ll(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Xl() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Jl() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ql() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function Zl() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let Na = !1,
  ei = !1;
function ti() {
  Na = !0;
}
const zn = 1,
  Kn = 2,
  ho = 4,
  ai = 8,
  ri = 16,
  ni = 1,
  si = 2,
  oi = 4,
  li = 8,
  ii = 16,
  ci = 1,
  di = 2,
  ui = 4,
  fi = 1,
  vi = 2,
  go = "[",
  Ln = "[!",
  Xn = "]",
  Da = {},
  Ve = Symbol();
function Jn(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Qn(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let de = null;
function Fr(e) {
  de = e;
}
function pe(e, t = !1, a) {
  (de = { p: de, c: null, e: null, m: !1, s: e, x: null, l: null }),
    Na && !t && (de.l = { s: null, u: null, r1: [], r2: Le(!1) });
}
function he(e) {
  const t = de;
  if (t !== null) {
    e !== void 0 && (t.x = e);
    const o = t.e;
    if (o !== null) {
      var a = se,
        r = ie;
      t.e = null;
      try {
        for (var n = 0; n < o.length; n++) {
          var s = o[n];
          mt(s.effect), gt(s.reaction), sn(s.fn);
        }
      } finally {
        mt(a), gt(r);
      }
    }
    (de = t.p), (t.m = !0);
  }
  return e || {};
}
function Pa() {
  return !Na || (de !== null && de.l === null);
}
function Le(e, t) {
  var a = { f: 0, v: e, reactions: null, equals: vo, rv: 0, wv: 0 };
  return a;
}
function lt(e) {
  return mo(Le(e));
}
function fa(e, t = !1) {
  var r;
  const a = Le(e);
  return (
    t || (a.equals = Dn),
    Na && de !== null && de.l !== null && ((r = de.l).s ?? (r.s = [])).push(a),
    a
  );
}
function U(e, t = !1) {
  return mo(fa(e, t));
}
function mo(e) {
  return (
    ie !== null && !kt && ie.f & St && (Pt === null ? wi([e]) : Pt.push(e)), e
  );
}
function ct(e, t) {
  return (
    C(
      e,
      bt(() => i(e)),
    ),
    t
  );
}
function C(e, t) {
  return (
    ie !== null &&
      !kt &&
      Pa() &&
      ie.f & (St | rn) &&
      (Pt === null || !Pt.includes(e)) &&
      Zl(),
    xa(e, t)
  );
}
function xa(e, t) {
  return (
    e.equals(t) ||
      (e.v,
      (e.v = t),
      (e.wv = Io()),
      bo(e, Dt),
      Pa() &&
        se !== null &&
        se.f & We &&
        !(se.f & (Yt | br)) &&
        (Ut === null ? xi([e]) : Ut.push(e))),
    t
  );
}
function bo(e, t) {
  var a = e.reactions;
  if (a !== null)
    for (var r = Pa(), n = a.length, s = 0; s < n; s++) {
      var o = a[s],
        l = o.f;
      l & Dt ||
        (!r && o === se) ||
        (Tt(o, t), l & (We | ft) && (l & St ? bo(o, ha) : cn(o)));
    }
}
let X = !1;
function Vt(e) {
  X = e;
}
let ae;
function vt(e) {
  if (e === null) throw (Jn(), Da);
  return (ae = e);
}
function ga() {
  return vt(zt(ae));
}
function f(e) {
  if (X) {
    if (zt(ae) !== null) throw (Jn(), Da);
    ae = e;
  }
}
function ye(e = 1) {
  if (X) {
    for (var t = e, a = ae; t--; ) a = zt(a);
    ae = a;
  }
}
function Pn() {
  for (var e = 0, t = ae; ; ) {
    if (t.nodeType === 8) {
      var a = t.data;
      if (a === Xn) {
        if (e === 0) return t;
        e -= 1;
      } else (a === go || a === Ln) && (e += 1);
    }
    var r = zt(t);
    t.remove(), (t = r);
  }
}
function ia(e, t = null, a) {
  if (typeof e != "object" || e === null || ua in e) return e;
  const r = Yn(e);
  if (r !== jl && r !== Ul) return e;
  var n = new Map(),
    s = tn(e),
    o = Le(0);
  s && n.set("length", Le(e.length));
  var l;
  return new Proxy(e, {
    defineProperty(d, c, v) {
      (!("value" in v) ||
        v.configurable === !1 ||
        v.enumerable === !1 ||
        v.writable === !1) &&
        Xl();
      var g = n.get(c);
      return (
        g === void 0 ? ((g = Le(v.value)), n.set(c, g)) : C(g, ia(v.value, l)),
        !0
      );
    },
    deleteProperty(d, c) {
      var v = n.get(c);
      if (v === void 0) c in d && n.set(c, Le(Ve));
      else {
        if (s && typeof c == "string") {
          var g = n.get("length"),
            u = Number(c);
          Number.isInteger(u) && u < g.v && C(g, u);
        }
        C(v, Ve), Ss(o);
      }
      return !0;
    },
    get(d, c, v) {
      if (c === ua) return e;
      var g = n.get(c),
        u = c in d;
      if (
        (g === void 0 &&
          (!u || da(d, c)?.writable) &&
          ((g = Le(ia(u ? d[c] : Ve, l))), n.set(c, g)),
        g !== void 0)
      ) {
        var h = i(g);
        return h === Ve ? void 0 : h;
      }
      return Reflect.get(d, c, v);
    },
    getOwnPropertyDescriptor(d, c) {
      var v = Reflect.getOwnPropertyDescriptor(d, c);
      if (v && "value" in v) {
        var g = n.get(c);
        g && (v.value = i(g));
      } else if (v === void 0) {
        var u = n.get(c),
          h = u?.v;
        if (u !== void 0 && h !== Ve)
          return { enumerable: !0, configurable: !0, value: h, writable: !0 };
      }
      return v;
    },
    has(d, c) {
      if (c === ua) return !0;
      var v = n.get(c),
        g = (v !== void 0 && v.v !== Ve) || Reflect.has(d, c);
      if (v !== void 0 || (se !== null && (!g || da(d, c)?.writable))) {
        v === void 0 && ((v = Le(g ? ia(d[c], l) : Ve)), n.set(c, v));
        var u = i(v);
        if (u === Ve) return !1;
      }
      return g;
    },
    set(d, c, v, g) {
      var u = n.get(c),
        h = c in d;
      if (s && c === "length")
        for (var y = v; y < u.v; y += 1) {
          var b = n.get(y + "");
          b !== void 0 ? C(b, Ve) : y in d && ((b = Le(Ve)), n.set(y + "", b));
        }
      u === void 0
        ? (!h || da(d, c)?.writable) &&
          ((u = Le(void 0)), C(u, ia(v, l)), n.set(c, u))
        : ((h = u.v !== Ve), C(u, ia(v, l)));
      var _ = Reflect.getOwnPropertyDescriptor(d, c);
      if ((_?.set && _.set.call(g, v), !h)) {
        if (s && typeof c == "string") {
          var A = n.get("length"),
            k = Number(c);
          Number.isInteger(k) && k >= A.v && C(A, k + 1);
        }
        Ss(o);
      }
      return !0;
    },
    ownKeys(d) {
      i(o);
      var c = Reflect.ownKeys(d).filter((u) => {
        var h = n.get(u);
        return h === void 0 || h.v !== Ve;
      });
      for (var [v, g] of n) g.v !== Ve && !(v in d) && c.push(v);
      return c;
    },
    setPrototypeOf() {
      Jl();
    },
  });
}
function Ss(e, t = 1) {
  C(e, e.v + t);
}
var On, yo, _o, wo;
function Bn() {
  if (On === void 0) {
    (On = window), (yo = /Firefox/.test(navigator.userAgent));
    var e = Element.prototype,
      t = Node.prototype;
    (_o = da(t, "firstChild").get),
      (wo = da(t, "nextSibling").get),
      (e.__click = void 0),
      (e.__className = void 0),
      (e.__attributes = null),
      (e.__styles = null),
      (e.__e = void 0),
      (Text.prototype.__t = void 0);
  }
}
function na(e = "") {
  return document.createTextNode(e);
}
function qt(e) {
  return _o.call(e);
}
function zt(e) {
  return wo.call(e);
}
function p(e, t) {
  if (!X) return qt(e);
  var a = qt(ae);
  if (a === null) a = ae.appendChild(na());
  else if (t && a.nodeType !== 3) {
    var r = na();
    return a?.before(r), vt(r), r;
  }
  return vt(a), a;
}
function K(e, t) {
  if (!X) {
    var a = qt(e);
    return a instanceof Comment && a.data === "" ? zt(a) : a;
  }
  return ae;
}
function m(e, t = 1, a = !1) {
  let r = X ? ae : e;
  for (var n; t--; ) (n = r), (r = zt(r));
  if (!X) return r;
  var s = r?.nodeType;
  if (a && s !== 3) {
    var o = na();
    return r === null ? n?.after(o) : r.before(o), vt(o), o;
  }
  return vt(r), r;
}
function xo(e) {
  e.textContent = "";
}
function aa(e) {
  var t = St | Dt,
    a = ie !== null && ie.f & St ? ie : null;
  return (
    se === null || (a !== null && a.f & ft) ? (t |= ft) : (se.f |= uo),
    {
      ctx: de,
      deps: null,
      effects: null,
      equals: vo,
      f: t,
      fn: e,
      reactions: null,
      rv: 0,
      v: null,
      wv: 0,
      parent: a ?? se,
    }
  );
}
function Se(e) {
  const t = aa(e);
  return (t.equals = Dn), t;
}
function ko(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var a = 0; a < t.length; a += 1) Wt(t[a]);
  }
}
function pi(e) {
  for (var t = e.parent; t !== null; ) {
    if (!(t.f & St)) return t;
    t = t.parent;
  }
  return null;
}
function hi(e) {
  var t,
    a = se;
  mt(pi(e));
  try {
    ko(e), (t = Uo(e));
  } finally {
    mt(a);
  }
  return t;
}
function Eo(e) {
  var t = hi(e),
    a = (Zt || e.f & ft) && e.deps !== null ? ha : We;
  Tt(e, a), e.equals(t) || ((e.v = t), (e.wv = Io()));
}
function Ao(e) {
  se === null && ie === null && Dl(),
    ie !== null && ie.f & ft && se === null && Yl(),
    ts && Wl();
}
function gi(e, t) {
  var a = t.last;
  a === null
    ? (t.last = t.first = e)
    : ((a.next = e), (e.prev = a), (t.last = e));
}
function Oa(e, t, a, r = !0) {
  var n = (e & br) !== 0,
    s = se,
    o = {
      ctx: de,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: e | Dt,
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
  if (a)
    try {
      ln(o), (o.f |= co);
    } catch (c) {
      throw (Wt(o), c);
    }
  else t !== null && cn(o);
  var l =
    a &&
    o.deps === null &&
    o.first === null &&
    o.nodes_start === null &&
    o.teardown === null &&
    (o.f & (uo | jr)) === 0;
  if (!l && !n && r && (s !== null && gi(o, s), ie !== null && ie.f & St)) {
    var d = ie;
    (d.effects ?? (d.effects = [])).push(o);
  }
  return o;
}
function Zn(e) {
  const t = Oa(an, null, !1);
  return Tt(t, We), (t.teardown = e), t;
}
function Mr(e) {
  Ao();
  var t = se !== null && (se.f & Yt) !== 0 && de !== null && !de.m;
  if (t) {
    var a = de;
    (a.e ?? (a.e = [])).push({ fn: e, effect: se, reaction: ie });
  } else {
    var r = sn(e);
    return r;
  }
}
function So(e) {
  return Ao(), Ga(e);
}
function mi(e) {
  const t = Oa(br, e, !0);
  return (a = {}) =>
    new Promise((r) => {
      a.outro
        ? ra(t, () => {
            Wt(t), r(void 0);
          })
        : (Wt(t), r(void 0));
    });
}
function sn(e) {
  return Oa(io, e, !1);
}
function Et(e, t) {
  var a = de,
    r = { effect: null, ran: !1 };
  a.l.r1.push(r),
    (r.effect = Ga(() => {
      e(), !r.ran && ((r.ran = !0), C(a.l.r2, !0), bt(t));
    }));
}
function Ba() {
  var e = de;
  Ga(() => {
    if (i(e.l.r2)) {
      for (var t of e.l.r1) {
        var a = t.effect;
        a.f & We && Tt(a, ha), ja(a) && ln(a), (t.ran = !1);
      }
      e.l.r2.v = !1;
    }
  });
}
function Ga(e) {
  return Oa(an, e, !0);
}
function W(e, t = [], a = aa) {
  const r = t.map(a);
  return Ia(() => e(...r.map(i)));
}
function Ia(e, t = 0) {
  return Oa(an | rn | t, e, !0);
}
function Nt(e, t = !0) {
  return Oa(an | Yt, e, !0, t);
}
function To(e) {
  var t = e.teardown;
  if (t !== null) {
    const a = ts,
      r = ie;
    Cs(!0), gt(null);
    try {
      t.call(null);
    } finally {
      Cs(a), gt(r);
    }
  }
}
function Co(e, t = !1) {
  var a = e.first;
  for (e.first = e.last = null; a !== null; ) {
    var r = a.next;
    Wt(a, t), (a = r);
  }
}
function bi(e) {
  for (var t = e.first; t !== null; ) {
    var a = t.next;
    t.f & Yt || Wt(t), (t = a);
  }
}
function Wt(e, t = !0) {
  var a = !1;
  if ((t || e.f & Hl) && e.nodes_start !== null) {
    for (var r = e.nodes_start, n = e.nodes_end; r !== null; ) {
      var s = r === n ? null : zt(r);
      r.remove(), (r = s);
    }
    a = !0;
  }
  Co(e, t && !a), qr(e, 0), Tt(e, nn);
  var o = e.transitions;
  if (o !== null) for (const d of o) d.stop();
  To(e);
  var l = e.parent;
  l !== null && l.first !== null && Ro(e),
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
function Ro(e) {
  var t = e.parent,
    a = e.prev,
    r = e.next;
  a !== null && (a.next = r),
    r !== null && (r.prev = a),
    t !== null &&
      (t.first === e && (t.first = r), t.last === e && (t.last = a));
}
function ra(e, t) {
  var a = [];
  es(e, a, !0),
    No(a, () => {
      Wt(e), t && t();
    });
}
function No(e, t) {
  var a = e.length;
  if (a > 0) {
    var r = () => --a || t();
    for (var n of e) n.out(r);
  } else t();
}
function es(e, t, a) {
  if (!(e.f & Ht)) {
    if (((e.f ^= Ht), e.transitions !== null))
      for (const o of e.transitions) (o.is_global || a) && t.push(o);
    for (var r = e.first; r !== null; ) {
      var n = r.next,
        s = (r.f & Ra) !== 0 || (r.f & Yt) !== 0;
      es(r, t, s ? a : !1), (r = n);
    }
  }
}
function Sa(e) {
  Po(e, !0);
}
function Po(e, t) {
  if (e.f & Ht) {
    (e.f ^= Ht), e.f & We || (e.f ^= We), ja(e) && (Tt(e, Dt), cn(e));
    for (var a = e.first; a !== null; ) {
      var r = a.next,
        n = (a.f & Ra) !== 0 || (a.f & Yt) !== 0;
      Po(a, n ? t : !1), (a = r);
    }
    if (e.transitions !== null)
      for (const s of e.transitions) (s.is_global || t) && s.in();
  }
}
const yi =
  typeof requestIdleCallback > "u"
    ? (e) => setTimeout(e, 1)
    : requestIdleCallback;
let tr = [],
  ar = [];
function Oo() {
  var e = tr;
  (tr = []), er(e);
}
function Bo() {
  var e = ar;
  (ar = []), er(e);
}
function yr(e) {
  tr.length === 0 && queueMicrotask(Oo), tr.push(e);
}
function _i(e) {
  ar.length === 0 && yi(Bo), ar.push(e);
}
function Ts() {
  tr.length > 0 && Oo(), ar.length > 0 && Bo();
}
let Or = !1,
  $r = !1,
  Vr = null,
  Br = !1,
  ts = !1;
function Cs(e) {
  ts = e;
}
let za = [];
let ie = null,
  kt = !1;
function gt(e) {
  ie = e;
}
let se = null;
function mt(e) {
  se = e;
}
let Pt = null;
function wi(e) {
  Pt = e;
}
let Xe = null,
  ot = 0,
  Ut = null;
function xi(e) {
  Ut = e;
}
let Go = 1,
  Hr = 0,
  Zt = !1;
function Io() {
  return ++Go;
}
function ja(e) {
  var t = e.f;
  if (t & Dt) return !0;
  if (t & ha) {
    var a = e.deps,
      r = (t & ft) !== 0;
    if (a !== null) {
      var n,
        s,
        o = (t & Ur) !== 0,
        l = r && se !== null && !Zt,
        d = a.length;
      if (o || l) {
        var c = e,
          v = c.parent;
        for (n = 0; n < d; n++)
          (s = a[n]),
            (o || !s?.reactions?.includes(c)) &&
              (s.reactions ?? (s.reactions = [])).push(c);
        o && (c.f ^= Ur), l && v !== null && !(v.f & ft) && (c.f ^= ft);
      }
      for (n = 0; n < d; n++)
        if (((s = a[n]), ja(s) && Eo(s), s.wv > e.wv)) return !0;
    }
    (!r || (se !== null && !Zt)) && Tt(e, We);
  }
  return !1;
}
function ki(e, t) {
  for (var a = t; a !== null; ) {
    if (a.f & jr)
      try {
        a.fn(e);
        return;
      } catch {
        a.f ^= jr;
      }
    a = a.parent;
  }
  throw ((Or = !1), e);
}
function Ei(e) {
  return (e.f & nn) === 0 && (e.parent === null || (e.parent.f & jr) === 0);
}
function on(e, t, a, r) {
  if (Or) {
    if ((a === null && (Or = !1), Ei(t))) throw e;
    return;
  }
  a !== null && (Or = !0);
  {
    ki(e, t);
    return;
  }
}
function jo(e, t, a = !0) {
  var r = e.reactions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var s = r[n];
      s.f & St
        ? jo(s, t, !1)
        : t === s && (a ? Tt(s, Dt) : s.f & We && Tt(s, ha), cn(s));
    }
}
function Uo(e) {
  var h;
  var t = Xe,
    a = ot,
    r = Ut,
    n = ie,
    s = Zt,
    o = Pt,
    l = de,
    d = kt,
    c = e.f;
  (Xe = null),
    (ot = 0),
    (Ut = null),
    (Zt = (c & ft) !== 0 && (kt || !Br || ie === null)),
    (ie = c & (Yt | br) ? null : e),
    (Pt = null),
    Fr(e.ctx),
    (kt = !1),
    Hr++;
  try {
    var v = (0, e.fn)(),
      g = e.deps;
    if (Xe !== null) {
      var u;
      if ((qr(e, ot), g !== null && ot > 0))
        for (g.length = ot + Xe.length, u = 0; u < Xe.length; u++)
          g[ot + u] = Xe[u];
      else e.deps = g = Xe;
      if (!Zt)
        for (u = ot; u < g.length; u++)
          ((h = g[u]).reactions ?? (h.reactions = [])).push(e);
    } else g !== null && ot < g.length && (qr(e, ot), (g.length = ot));
    if (Pa() && Ut !== null && !kt && g !== null && !(e.f & (St | ha | Dt)))
      for (u = 0; u < Ut.length; u++) jo(Ut[u], e);
    return n !== null && Hr++, v;
  } finally {
    (Xe = t), (ot = a), (Ut = r), (ie = n), (Zt = s), (Pt = o), Fr(l), (kt = d);
  }
}
function Ai(e, t) {
  let a = t.reactions;
  if (a !== null) {
    var r = Il.call(a, e);
    if (r !== -1) {
      var n = a.length - 1;
      n === 0 ? (a = t.reactions = null) : ((a[r] = a[n]), a.pop());
    }
  }
  a === null &&
    t.f & St &&
    (Xe === null || !Xe.includes(t)) &&
    (Tt(t, ha), t.f & (ft | Ur) || (t.f ^= Ur), ko(t), qr(t, 0));
}
function qr(e, t) {
  var a = e.deps;
  if (a !== null) for (var r = t; r < a.length; r++) Ai(e, a[r]);
}
function ln(e) {
  var t = e.f;
  if (!(t & nn)) {
    Tt(e, We);
    var a = se,
      r = de,
      n = Br;
    (se = e), (Br = !0);
    try {
      t & rn ? bi(e) : Co(e), To(e);
      var s = Uo(e);
      (e.teardown = typeof s == "function" ? s : null), (e.wv = Go);
      var o = e.deps,
        l;
      Es && ei && e.f & Dt;
    } catch (d) {
      on(d, e, a, r || e.ctx);
    } finally {
      (Br = n), (se = a);
    }
  }
}
function Si() {
  try {
    zl();
  } catch (e) {
    if (Vr !== null) on(e, Vr, null);
    else throw e;
  }
}
function Fo() {
  try {
    for (var e = 0; za.length > 0; ) {
      e++ > 1e3 && Si();
      var t = za,
        a = t.length;
      za = [];
      for (var r = 0; r < a; r++) {
        var n = t[r];
        n.f & We || (n.f ^= We);
        var s = Ci(n);
        Ti(s);
      }
    }
  } finally {
    ($r = !1), (Vr = null);
  }
}
function Ti(e) {
  var t = e.length;
  if (t !== 0)
    for (var a = 0; a < t; a++) {
      var r = e[a];
      if (!(r.f & (nn | Ht)))
        try {
          ja(r) &&
            (ln(r),
            r.deps === null &&
              r.first === null &&
              r.nodes_start === null &&
              (r.teardown === null ? Ro(r) : (r.fn = null)));
        } catch (n) {
          on(n, r, null, r.ctx);
        }
    }
}
function cn(e) {
  $r || (($r = !0), queueMicrotask(Fo));
  for (var t = (Vr = e); t.parent !== null; ) {
    t = t.parent;
    var a = t.f;
    if (a & (br | Yt)) {
      if (!(a & We)) return;
      t.f ^= We;
    }
  }
  za.push(t);
}
function Ci(e) {
  for (var t = [], a = e.first; a !== null; ) {
    var r = a.f,
      n = (r & Yt) !== 0,
      s = n && (r & We) !== 0;
    if (!s && !(r & Ht)) {
      if (r & io) t.push(a);
      else if (n) a.f ^= We;
      else {
        var o = ie;
        try {
          (ie = a), ja(a) && ln(a);
        } catch (c) {
          on(c, a, null, a.ctx);
        } finally {
          ie = o;
        }
      }
      var l = a.first;
      if (l !== null) {
        a = l;
        continue;
      }
    }
    var d = a.parent;
    for (a = a.next; a === null && d !== null; ) (a = d.next), (d = d.parent);
  }
  return t;
}
function as(e) {
  var t;
  for (Ts(); za.length > 0; ) ($r = !0), Fo(), Ts();
  return t;
}
async function Mo() {
  await Promise.resolve(), as();
}
function i(e) {
  var t = e.f,
    a = (t & St) !== 0;
  if (ie !== null && !kt) {
    Pt !== null && Pt.includes(e) && Ql();
    var r = ie.deps;
    e.rv < Hr &&
      ((e.rv = Hr),
      Xe === null && r !== null && r[ot] === e
        ? ot++
        : Xe === null
          ? (Xe = [e])
          : (!Zt || !Xe.includes(e)) && Xe.push(e));
  } else if (a && e.deps === null && e.effects === null) {
    var n = e,
      s = n.parent;
    s !== null && !(s.f & ft) && (n.f ^= ft);
  }
  return a && ((n = e), ja(n) && Eo(n)), e.v;
}
function bt(e) {
  var t = kt;
  try {
    return (kt = !0), e();
  } finally {
    kt = t;
  }
}
const Ri = -7169;
function Tt(e, t) {
  e.f = (e.f & Ri) | t;
}
function Wr(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (ua in e) Gn(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const a = e[t];
        typeof a == "object" && a && ua in a && Gn(a);
      }
  }
}
function Gn(e, t = new Set()) {
  if (
    typeof e == "object" &&
    e !== null &&
    !(e instanceof EventTarget) &&
    !t.has(e)
  ) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        Gn(e[r], t);
      } catch {}
    const a = Yn(e);
    if (
      a !== Object.prototype &&
      a !== Array.prototype &&
      a !== Map.prototype &&
      a !== Set.prototype &&
      a !== Date.prototype
    ) {
      const r = lo(a);
      for (let n in r) {
        const s = r[n].get;
        if (s)
          try {
            s.call(e);
          } catch {}
      }
    }
  }
}
const Ni = ["touchstart", "touchmove"];
function Pi(e) {
  return Ni.includes(e);
}
let Rs = !1;
function $o() {
  Rs ||
    ((Rs = !0),
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
function rs(e) {
  var t = ie,
    a = se;
  gt(null), mt(null);
  try {
    return e();
  } finally {
    gt(t), mt(a);
  }
}
function Vo(e, t, a, r = a) {
  e.addEventListener(t, () => rs(a));
  const n = e.__on_r;
  n
    ? (e.__on_r = () => {
        n(), r(!0);
      })
    : (e.__on_r = () => r(!0)),
    $o();
}
const Oi = new Set(),
  Ns = new Set();
function Bi(e, t, a, r = {}) {
  function n(s) {
    if ((r.capture || Wa.call(t, s), !s.cancelBubble))
      return rs(() => a?.call(this, s));
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? yr(() => {
          t.addEventListener(e, n, r);
        })
      : t.addEventListener(e, n, r),
    n
  );
}
function I(e, t, a, r, n) {
  var s = { capture: r, passive: n },
    o = Bi(e, t, a, s);
  (t === document.body || t === window || t === document) &&
    Zn(() => {
      t.removeEventListener(e, o, s);
    });
}
function Wa(e) {
  var t = this,
    a = t.ownerDocument,
    r = e.type,
    n = e.composedPath?.() || [],
    s = n[0] || e.target,
    o = 0,
    l = e.__root;
  if (l) {
    var d = n.indexOf(l);
    if (d !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var c = n.indexOf(t);
    if (c === -1) return;
    d <= c && (o = d);
  }
  if (((s = n[o] || e.target), s !== t)) {
    Wn(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || a;
      },
    });
    var v = ie,
      g = se;
    gt(null), mt(null);
    try {
      for (var u, h = []; s !== null; ) {
        var y = s.assignedSlot || s.parentNode || s.host || null;
        try {
          var b = s["__" + r];
          if (b !== void 0 && (!s.disabled || e.target === s))
            if (tn(b)) {
              var [_, ...A] = b;
              _.apply(s, [e, ...A]);
            } else b.call(s, e);
        } catch (k) {
          u ? h.push(k) : (u = k);
        }
        if (e.cancelBubble || y === t || y === null) break;
        s = y;
      }
      if (u) {
        for (let k of h)
          queueMicrotask(() => {
            throw k;
          });
        throw u;
      }
    } finally {
      (e.__root = t), delete e.currentTarget, gt(v), mt(g);
    }
  }
}
function Ho(e) {
  var t = document.createElement("template");
  return (t.innerHTML = e), t.content;
}
function Ot(e, t) {
  var a = se;
  a.nodes_start === null && ((a.nodes_start = e), (a.nodes_end = t));
}
function P(e, t) {
  var a = (t & fi) !== 0,
    r = (t & vi) !== 0,
    n,
    s = !e.startsWith("<!>");
  return () => {
    if (X) return Ot(ae, null), ae;
    n === void 0 && ((n = Ho(s ? e : "<!>" + e)), a || (n = qt(n)));
    var o = r || yo ? document.importNode(n, !0) : n.cloneNode(!0);
    if (a) {
      var l = qt(o),
        d = o.lastChild;
      Ot(l, d);
    } else Ot(o, o);
    return o;
  };
}
function qo(e, t, a = "svg") {
  var r = !e.startsWith("<!>"),
    n = `<${a}>${r ? e : "<!>" + e}</${a}>`,
    s;
  return () => {
    if (X) return Ot(ae, null), ae;
    if (!s) {
      var o = Ho(n),
        l = qt(o);
      s = qt(l);
    }
    var d = s.cloneNode(!0);
    return Ot(d, d), d;
  };
}
function Ka(e = "") {
  if (!X) {
    var t = na(e + "");
    return Ot(t, t), t;
  }
  var a = ae;
  return a.nodeType !== 3 && (a.before((a = na())), vt(a)), Ot(a, a), a;
}
function fe() {
  if (X) return Ot(ae, null), ae;
  var e = document.createDocumentFragment(),
    t = document.createComment(""),
    a = na();
  return e.append(t, a), Ot(t, a), e;
}
function S(e, t) {
  if (X) {
    (se.nodes_end = ae), ga();
    return;
  }
  e !== null && e.before(t);
}
let In = !0;
function Y(e, t) {
  var a = t == null ? "" : typeof t == "object" ? t + "" : t;
  a !== (e.__t ?? (e.__t = e.nodeValue)) &&
    ((e.__t = a), (e.nodeValue = a + ""));
}
function Wo(e, t) {
  return Yo(e, t);
}
function Gi(e, t) {
  Bn(), (t.intro = t.intro ?? !1);
  const a = t.target,
    r = X,
    n = ae;
  try {
    for (var s = qt(a); s && (s.nodeType !== 8 || s.data !== go); ) s = zt(s);
    if (!s) throw Da;
    Vt(!0), vt(s), ga();
    const o = Yo(e, { ...t, anchor: s });
    if (ae === null || ae.nodeType !== 8 || ae.data !== Xn) throw (Jn(), Da);
    return Vt(!1), o;
  } catch (o) {
    if (o === Da)
      return t.recover === !1 && Kl(), Bn(), xo(a), Vt(!1), Wo(e, t);
    throw o;
  } finally {
    Vt(r), vt(n);
  }
}
const ya = new Map();
function Yo(
  e,
  { target: t, anchor: a, props: r = {}, events: n, context: s, intro: o = !0 },
) {
  Bn();
  var l = new Set(),
    d = (g) => {
      for (var u = 0; u < g.length; u++) {
        var h = g[u];
        if (!l.has(h)) {
          l.add(h);
          var y = Pi(h);
          t.addEventListener(h, Wa, { passive: y });
          var b = ya.get(h);
          b === void 0
            ? (document.addEventListener(h, Wa, { passive: y }), ya.set(h, 1))
            : ya.set(h, b + 1);
        }
      }
    };
  d(qn(Oi)), Ns.add(d);
  var c = void 0,
    v = mi(() => {
      var g = a ?? t.appendChild(na());
      return (
        Nt(() => {
          if (s) {
            pe({});
            var u = de;
            u.c = s;
          }
          n && (r.$$events = n),
            X && Ot(g, null),
            (In = o),
            (c = e(g, r) || {}),
            (In = !0),
            X && (se.nodes_end = ae),
            s && he();
        }),
        () => {
          for (var u of l) {
            t.removeEventListener(u, Wa);
            var h = ya.get(u);
            --h === 0
              ? (document.removeEventListener(u, Wa), ya.delete(u))
              : ya.set(u, h);
          }
          Ns.delete(d), g !== a && g.parentNode?.removeChild(g);
        }
      );
    });
  return jn.set(c, v), c;
}
let jn = new WeakMap();
function Ii(e, t) {
  const a = jn.get(e);
  return a ? (jn.delete(e), a(t)) : Promise.resolve();
}
const _n = 0,
  Cr = 1,
  wn = 2;
function ji(e, t, a, r, n) {
  X && ga();
  var s = e,
    o = Pa(),
    l = de,
    d = Ve,
    c,
    v,
    g,
    u = (o ? Le : fa)(void 0),
    h = (o ? Le : fa)(void 0),
    y = !1;
  function b(A, k) {
    (y = !0), k && (mt(_), gt(_), Fr(l));
    try {
      A === _n && a && (c ? Sa(c) : (c = Nt(() => a(s)))),
        A === Cr && r && (v ? Sa(v) : (v = Nt(() => r(s, u)))),
        A !== _n && c && ra(c, () => (c = null)),
        A !== Cr && v && ra(v, () => (v = null)),
        A !== wn && g && ra(g, () => (g = null));
    } finally {
      k && (Fr(null), gt(null), mt(null), as());
    }
  }
  var _ = Ia(() => {
    if (d !== (d = t())) {
      if (Ml(d)) {
        var A = d;
        (y = !1),
          A.then(
            (k) => {
              A === d && (xa(u, k), b(Cr, !0));
            },
            (k) => {
              if (A === d) throw (xa(h, k), b(wn, !0), h.v);
            },
          ),
          X
            ? a && (c = Nt(() => a(s)))
            : yr(() => {
                y || b(_n, !0);
              });
      } else xa(u, d), b(Cr, !1);
      return () => (d = Ve);
    }
  });
  X && (s = ae);
}
function F(e, t, a = !1) {
  X && ga();
  var r = e,
    n = null,
    s = null,
    o = Ve,
    l = a ? Ra : 0,
    d = !1;
  const c = (g, u = !0) => {
      (d = !0), v(u, g);
    },
    v = (g, u) => {
      if (o === (o = g)) return;
      let h = !1;
      if (X) {
        const y = r.data === Ln;
        !!o === y && ((r = Pn()), vt(r), Vt(!1), (h = !0));
      }
      o
        ? (n ? Sa(n) : u && (n = Nt(() => u(r))),
          s &&
            ra(s, () => {
              s = null;
            }))
        : (s ? Sa(s) : u && (s = Nt(() => u(r))),
          n &&
            ra(n, () => {
              n = null;
            })),
        h && Vt(!0);
    };
  Ia(() => {
    (d = !1), t(c), d || v(null, null);
  }, l),
    X && (r = ae);
}
function Me(e, t) {
  return t;
}
function Ui(e, t, a, r) {
  for (var n = [], s = t.length, o = 0; o < s; o++) es(t[o].e, n, !0);
  var l = s > 0 && n.length === 0 && a !== null;
  if (l) {
    var d = a.parentNode;
    xo(d), d.append(a), r.clear(), Jt(e, t[0].prev, t[s - 1].next);
  }
  No(n, () => {
    for (var c = 0; c < s; c++) {
      var v = t[c];
      l || (r.delete(v.k), Jt(e, v.prev, v.next)), Wt(v.e, !l);
    }
  });
}
function Te(e, t, a, r, n, s = null) {
  var o = e,
    l = { flags: t, items: new Map(), first: null },
    d = (t & ho) !== 0;
  if (d) {
    var c = e;
    o = X ? vt(qt(c)) : c.appendChild(na());
  }
  X && ga();
  var v = null,
    g = !1,
    u = Se(() => {
      var h = a();
      return tn(h) ? h : h == null ? [] : qn(h);
    });
  Ia(() => {
    var h = i(u),
      y = h.length;
    if (g && y === 0) return;
    g = y === 0;
    let b = !1;
    if (X) {
      var _ = o.data === Ln;
      _ !== (y === 0) && ((o = Pn()), vt(o), Vt(!1), (b = !0));
    }
    if (X) {
      for (var A = null, k, E = 0; E < y; E++) {
        if (ae.nodeType === 8 && ae.data === Xn) {
          (o = ae), (b = !0), Vt(!1);
          break;
        }
        var x = h[E],
          w = r(x, E);
        (k = Do(ae, l, A, null, x, w, E, n, t, a)), l.items.set(w, k), (A = k);
      }
      y > 0 && vt(Pn());
    }
    X || Fi(h, l, o, n, t, r, a),
      s !== null &&
        (y === 0
          ? v
            ? Sa(v)
            : (v = Nt(() => s(o)))
          : v !== null &&
            ra(v, () => {
              v = null;
            })),
      b && Vt(!0),
      i(u);
  }),
    X && (o = ae);
}
function Fi(e, t, a, r, n, s, o) {
  var l = (n & ai) !== 0,
    d = (n & (zn | Kn)) !== 0,
    c = e.length,
    v = t.items,
    g = t.first,
    u = g,
    h,
    y = null,
    b,
    _ = [],
    A = [],
    k,
    E,
    x,
    w;
  if (l)
    for (w = 0; w < c; w += 1)
      (k = e[w]),
        (E = s(k, w)),
        (x = v.get(E)),
        x !== void 0 && (x.a?.measure(), (b ?? (b = new Set())).add(x));
  for (w = 0; w < c; w += 1) {
    if (((k = e[w]), (E = s(k, w)), (x = v.get(E)), x === void 0)) {
      var R = u ? u.e.nodes_start : a;
      (y = Do(R, t, y, y === null ? t.first : y.next, k, E, w, r, n, o)),
        v.set(E, y),
        (_ = []),
        (A = []),
        (u = y.next);
      continue;
    }
    if (
      (d && Mi(x, k, w, n),
      x.e.f & Ht &&
        (Sa(x.e), l && (x.a?.unfix(), (b ?? (b = new Set())).delete(x))),
      x !== u)
    ) {
      if (h !== void 0 && h.has(x)) {
        if (_.length < A.length) {
          var N = A[0],
            T;
          y = N.prev;
          var O = _[0],
            G = _[_.length - 1];
          for (T = 0; T < _.length; T += 1) Ps(_[T], N, a);
          for (T = 0; T < A.length; T += 1) h.delete(A[T]);
          Jt(t, O.prev, G.next),
            Jt(t, y, O),
            Jt(t, G, N),
            (u = N),
            (y = G),
            (w -= 1),
            (_ = []),
            (A = []);
        } else
          h.delete(x),
            Ps(x, u, a),
            Jt(t, x.prev, x.next),
            Jt(t, x, y === null ? t.first : y.next),
            Jt(t, y, x),
            (y = x);
        continue;
      }
      for (_ = [], A = []; u !== null && u.k !== E; )
        u.e.f & Ht || (h ?? (h = new Set())).add(u), A.push(u), (u = u.next);
      if (u === null) continue;
      x = u;
    }
    _.push(x), (y = x), (u = x.next);
  }
  if (u !== null || h !== void 0) {
    for (var M = h === void 0 ? [] : qn(h); u !== null; )
      u.e.f & Ht || M.push(u), (u = u.next);
    var B = M.length;
    if (B > 0) {
      var V = n & ho && c === 0 ? a : null;
      if (l) {
        for (w = 0; w < B; w += 1) M[w].a?.measure();
        for (w = 0; w < B; w += 1) M[w].a?.fix();
      }
      Ui(t, M, V, v);
    }
  }
  l &&
    yr(() => {
      if (b !== void 0) for (x of b) x.a?.apply();
    }),
    (se.first = t.first && t.first.e),
    (se.last = y && y.e);
}
function Mi(e, t, a, r) {
  r & zn && xa(e.v, t), r & Kn ? xa(e.i, a) : (e.i = a);
}
function Do(e, t, a, r, n, s, o, l, d, c) {
  var v = (d & zn) !== 0,
    g = (d & ri) === 0,
    u = v ? (g ? fa(n) : Le(n)) : n,
    h = d & Kn ? Le(o) : o,
    y = { i: h, v: u, k: s, a: null, e: null, prev: a, next: r };
  try {
    return (
      (y.e = Nt(() => l(e, u, h, c), X)),
      (y.e.prev = a && a.e),
      (y.e.next = r && r.e),
      a === null ? (t.first = y) : ((a.next = y), (a.e.next = y.e)),
      r !== null && ((r.prev = y), (r.e.prev = y.e)),
      y
    );
  } finally {
  }
}
function Ps(e, t, a) {
  for (
    var r = e.next ? e.next.e.nodes_start : a,
      n = t ? t.e.nodes_start : a,
      s = e.e.nodes_start;
    s !== r;

  ) {
    var o = zt(s);
    n.before(s), (s = o);
  }
}
function Jt(e, t, a) {
  t === null ? (e.first = a) : ((t.next = a), (t.e.next = a && a.e)),
    a !== null && ((a.prev = t), (a.e.prev = t && t.e));
}
function Un(e, t, a, r, n) {
  X && ga();
  var s = t.$$slots?.[a],
    o = !1;
  s === !0 && ((s = t.children), (o = !0)),
    s === void 0 || s(e, o ? () => r : r);
}
function $i(e, t, ...a) {
  var r = e,
    n = Ze,
    s;
  Ia(() => {
    n !== (n = t()) && (s && (Wt(s), (s = null)), (s = Nt(() => n(r, ...a))));
  }, Ra),
    X && (r = ae);
}
function Gr(e, t, a) {
  X && ga();
  var r = e,
    n,
    s;
  Ia(() => {
    n !== (n = t()) && (s && (ra(s), (s = null)), n && (s = Nt(() => a(r, n))));
  }, Ra),
    X && (r = ae);
}
function zo(e) {
  return typeof e == "object" ? Ol(e) : e ?? "";
}
const Os = [
  ...` 	
\r\f \v\uFEFF`,
];
function Vi(e, t, a) {
  var r = e == null ? "" : "" + e;
  if ((t && (r = r ? r + " " + t : t), a)) {
    for (var n in a)
      if (a[n]) r = r ? r + " " + n : n;
      else if (r.length)
        for (var s = n.length, o = 0; (o = r.indexOf(n, o)) >= 0; ) {
          var l = o + s;
          (o === 0 || Os.includes(r[o - 1])) &&
          (l === r.length || Os.includes(r[l]))
            ? (r = (o === 0 ? "" : r.substring(0, o)) + r.substring(l + 1))
            : (o = l);
        }
  }
  return r === "" ? null : r;
}
function ce(e, t, a, r, n, s) {
  var o = e.__className;
  if (X || o !== a) {
    var l = Vi(a, r, s);
    (!X || l !== e.getAttribute("class")) &&
      (l == null
        ? e.removeAttribute("class")
        : t
          ? (e.className = l)
          : e.setAttribute("class", l)),
      (e.__className = a);
  } else if (s)
    for (var d in s) {
      var c = !!s[d];
      (n == null || c !== !!n[d]) && e.classList.toggle(d, c);
    }
  return s;
}
function Re(e) {
  if (X) {
    var t = !1,
      a = () => {
        if (!t) {
          if (((t = !0), e.hasAttribute("value"))) {
            var r = e.value;
            ee(e, "value", null), (e.value = r);
          }
          if (e.hasAttribute("checked")) {
            var n = e.checked;
            ee(e, "checked", null), (e.checked = n);
          }
        }
      };
    (e.__on_r = a), _i(a), $o();
  }
}
function ee(e, t, a, r) {
  var n = e.__attributes ?? (e.__attributes = {});
  (X &&
    ((n[t] = e.getAttribute(t)),
    t === "src" ||
      t === "srcset" ||
      (t === "href" && e.nodeName === "LINK"))) ||
    (n[t] !== (n[t] = a) &&
      (t === "style" && "__styles" in e && (e.__styles = {}),
      t === "loading" && (e[ql] = a),
      a == null
        ? e.removeAttribute(t)
        : typeof a != "string" && Hi(e).includes(t)
          ? (e[t] = a)
          : e.setAttribute(t, a)));
}
var Bs = new Map();
function Hi(e) {
  var t = Bs.get(e.nodeName);
  if (t) return t;
  Bs.set(e.nodeName, (t = []));
  for (var a, r = e, n = Element.prototype; n !== r; ) {
    a = lo(r);
    for (var s in a) a[s].set && t.push(s);
    r = Yn(r);
  }
  return t;
}
const qi = () => performance.now(),
  Mt = {
    tick: (e) => requestAnimationFrame(e),
    now: () => qi(),
    tasks: new Set(),
  };
function Ko() {
  const e = Mt.now();
  Mt.tasks.forEach((t) => {
    t.c(e) || (Mt.tasks.delete(t), t.f());
  }),
    Mt.tasks.size !== 0 && Mt.tick(Ko);
}
function Wi(e) {
  let t;
  return (
    Mt.tasks.size === 0 && Mt.tick(Ko),
    {
      promise: new Promise((a) => {
        Mt.tasks.add((t = { c: e, f: a }));
      }),
      abort() {
        Mt.tasks.delete(t);
      },
    }
  );
}
function Rr(e, t) {
  rs(() => {
    e.dispatchEvent(new CustomEvent(t));
  });
}
function Yi(e) {
  if (e === "float") return "cssFloat";
  if (e === "offset") return "cssOffset";
  if (e.startsWith("--")) return e;
  const t = e.split("-");
  return t.length === 1
    ? t[0]
    : t[0] +
        t
          .slice(1)
          .map((a) => a[0].toUpperCase() + a.slice(1))
          .join("");
}
function Gs(e) {
  const t = {},
    a = e.split(";");
  for (const r of a) {
    const [n, s] = r.split(":");
    if (!n || s === void 0) break;
    const o = Yi(n.trim());
    t[o] = s.trim();
  }
  return t;
}
const Di = (e) => e;
function ea(e, t, a, r) {
  var n = (e & ci) !== 0,
    s = (e & di) !== 0,
    o = n && s,
    l = (e & ui) !== 0,
    d = o ? "both" : n ? "in" : "out",
    c,
    v = t.inert,
    g = t.style.overflow,
    u,
    h;
  function y() {
    var E = ie,
      x = se;
    gt(null), mt(null);
    try {
      return c ?? (c = a()(t, r?.() ?? {}, { direction: d }));
    } finally {
      gt(E), mt(x);
    }
  }
  var b = {
      is_global: l,
      in() {
        if (((t.inert = v), !n)) {
          h?.abort(), h?.reset?.();
          return;
        }
        s || u?.abort(),
          Rr(t, "introstart"),
          (u = Fn(t, y(), h, 1, () => {
            Rr(t, "introend"),
              u?.abort(),
              (u = c = void 0),
              (t.style.overflow = g);
          }));
      },
      out(E) {
        if (!s) {
          E?.(), (c = void 0);
          return;
        }
        (t.inert = !0),
          Rr(t, "outrostart"),
          (h = Fn(t, y(), u, 0, () => {
            Rr(t, "outroend"), E?.();
          }));
      },
      stop: () => {
        u?.abort(), h?.abort();
      },
    },
    _ = se;
  if (((_.transitions ?? (_.transitions = [])).push(b), n && In)) {
    var A = l;
    if (!A) {
      for (var k = _.parent; k && k.f & Ra; )
        for (; (k = k.parent) && !(k.f & rn); );
      A = !k || (k.f & co) !== 0;
    }
    A &&
      sn(() => {
        bt(() => b.in());
      });
  }
}
function Fn(e, t, a, r, n) {
  var s = r === 1;
  if (Fl(t)) {
    var o,
      l = !1;
    return (
      yr(() => {
        if (!l) {
          var _ = t({ direction: s ? "in" : "out" });
          o = Fn(e, _, a, r, n);
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
  if ((a?.deactivate(), !t?.duration))
    return n(), { abort: Ze, deactivate: Ze, reset: Ze, t: () => r };
  const { delay: d = 0, css: c, tick: v, easing: g = Di } = t;
  var u = [];
  if (s && a === void 0 && (v && v(0, 1), c)) {
    var h = Gs(c(0, 1));
    u.push(h, h);
  }
  var y = () => 1 - r,
    b = e.animate(u, { duration: d });
  return (
    (b.onfinish = () => {
      var _ = a?.t() ?? 1 - r;
      a?.abort();
      var A = r - _,
        k = t.duration * Math.abs(A),
        E = [];
      if (k > 0) {
        var x = !1;
        if (c)
          for (
            var w = Math.ceil(k / 16.666666666666668), R = 0;
            R <= w;
            R += 1
          ) {
            var N = _ + A * g(R / w),
              T = Gs(c(N, 1 - N));
            E.push(T), x || (x = T.overflow === "hidden");
          }
        x && (e.style.overflow = "hidden"),
          (y = () => {
            var O = b.currentTime;
            return _ + A * g(O / k);
          }),
          v &&
            Wi(() => {
              if (b.playState !== "running") return !1;
              var O = y();
              return v(O, 1 - O), !0;
            });
      }
      (b = e.animate(E, { duration: k, fill: "forwards" })),
        (b.onfinish = () => {
          (y = () => r), v?.(r, 1 - r), n();
        });
    }),
    {
      abort: () => {
        b && (b.cancel(), (b.effect = null), (b.onfinish = Ze));
      },
      deactivate: () => {
        n = Ze;
      },
      reset: () => {
        r === 0 && v?.(1, 0);
      },
      t: () => y(),
    }
  );
}
function Oe(e, t, a = t) {
  var r = Pa();
  Vo(e, "input", (n) => {
    var s = n ? e.defaultValue : e.value;
    if (((s = xn(e) ? kn(s) : s), a(s), r && s !== (s = t()))) {
      var o = e.selectionStart,
        l = e.selectionEnd;
      (e.value = s ?? ""),
        l !== null &&
          ((e.selectionStart = o),
          (e.selectionEnd = Math.min(l, e.value.length)));
    }
  }),
    ((X && e.defaultValue !== e.value) || (bt(t) == null && e.value)) &&
      a(xn(e) ? kn(e.value) : e.value),
    Ga(() => {
      var n = t();
      (xn(e) && n === kn(e.value)) ||
        (e.type === "date" && !n && !e.value) ||
        (n !== e.value && (e.value = n ?? ""));
    });
}
function zi(e, t, a = t) {
  Vo(e, "change", (r) => {
    var n = r ? e.defaultChecked : e.checked;
    a(n);
  }),
    ((X && e.defaultChecked !== e.checked) || bt(t) == null) && a(e.checked),
    Ga(() => {
      var r = t();
      e.checked = !!r;
    });
}
function xn(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function kn(e) {
  return e === "" ? null : +e;
}
function Ki(e, t, a) {
  var r = da(e, t);
  r &&
    r.set &&
    ((e[t] = a),
    Zn(() => {
      e[t] = null;
    }));
}
function Is(e, t) {
  return e === t || e?.[ua] === t;
}
function Ir(e = {}, t, a, r) {
  return (
    sn(() => {
      var n, s;
      return (
        Ga(() => {
          (n = s),
            (s = []),
            bt(() => {
              e !== a(...s) &&
                (t(e, ...s), n && Is(a(...n), e) && t(null, ...n));
            });
        }),
        () => {
          yr(() => {
            s && Is(a(...s), e) && t(null, ...s);
          });
        }
      );
    }),
    e
  );
}
function Ee(e = !1) {
  const t = de,
    a = t.l.u;
  if (!a) return;
  let r = () => Wr(t.s);
  if (e) {
    let n = 0,
      s = {};
    const o = aa(() => {
      let l = !1;
      const d = t.s;
      for (const c in d) d[c] !== s[c] && ((s[c] = d[c]), (l = !0));
      return l && n++, n;
    });
    r = () => i(o);
  }
  a.b.length &&
    So(() => {
      js(t, r), er(a.b);
    }),
    Mr(() => {
      const n = bt(() => a.m.map($l));
      return () => {
        for (const s of n) typeof s == "function" && s();
      };
    }),
    a.a.length &&
      Mr(() => {
        js(t, r), er(a.a);
      });
}
function js(e, t) {
  if (e.l.s) for (const a of e.l.s) i(a);
  t();
}
function ns(e, t, a) {
  if (e == null) return t(void 0), a && a(void 0), Ze;
  const r = bt(() => e.subscribe(t, a));
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const _a = [];
function Li(e, t) {
  return { subscribe: Je(e, t).subscribe };
}
function Je(e, t = Ze) {
  let a = null;
  const r = new Set();
  function n(l) {
    if (po(e, l) && ((e = l), a)) {
      const d = !_a.length;
      for (const c of r) c[1](), _a.push(c, e);
      if (d) {
        for (let c = 0; c < _a.length; c += 2) _a[c][0](_a[c + 1]);
        _a.length = 0;
      }
    }
  }
  function s(l) {
    n(l(e));
  }
  function o(l, d = Ze) {
    const c = [l, d];
    return (
      r.add(c),
      r.size === 1 && (a = t(n, s) || Ze),
      l(e),
      () => {
        r.delete(c), r.size === 0 && a && (a(), (a = null));
      }
    );
  }
  return { set: n, update: s, subscribe: o };
}
function ss(e, t, a) {
  const r = !Array.isArray(e),
    n = r ? [e] : e;
  if (!n.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const s = t.length < 2;
  return Li(a, (o, l) => {
    let d = !1;
    const c = [];
    let v = 0,
      g = Ze;
    const u = () => {
        if (v) return;
        g();
        const y = t(r ? c[0] : c, o, l);
        s ? o(y) : (g = typeof y == "function" ? y : Ze);
      },
      h = n.map((y, b) =>
        ns(
          y,
          (_) => {
            (c[b] = _), (v &= ~(1 << b)), d && u();
          },
          () => {
            v |= 1 << b;
          },
        ),
      );
    return (
      (d = !0),
      u(),
      function () {
        er(h), g(), (d = !1);
      }
    );
  });
}
function Xi(e) {
  let t;
  return ns(e, (a) => (t = a))(), t;
}
let Nr = !1,
  Mn = Symbol();
function At(e, t, a) {
  const r =
    a[t] ?? (a[t] = { store: null, source: fa(void 0), unsubscribe: Ze });
  if (r.store !== e && !(Mn in a))
    if ((r.unsubscribe(), (r.store = e ?? null), e == null))
      (r.source.v = void 0), (r.unsubscribe = Ze);
    else {
      var n = !0;
      (r.unsubscribe = ns(e, (s) => {
        n ? (r.source.v = s) : C(r.source, s);
      })),
        (n = !1);
    }
  return e && Mn in a ? Xi(e) : i(r.source);
}
function Ji(e, t) {
  return e.set(t), t;
}
function sa() {
  const e = {};
  function t() {
    Zn(() => {
      for (var a in e) e[a].unsubscribe();
      Wn(e, Mn, { enumerable: !1, value: !0 });
    });
  }
  return [e, t];
}
function Qi(e) {
  var t = Nr;
  try {
    return (Nr = !1), [e(), Nr];
  } finally {
    Nr = t;
  }
}
function J(e, t, a, r) {
  var n = (a & ni) !== 0,
    s = !Na || (a & si) !== 0,
    o = (a & li) !== 0,
    l = (a & ii) !== 0,
    d = !1,
    c;
  o ? ([c, d] = Qi(() => e[t])) : (c = e[t]);
  var v = ua in e || fo in e,
    g =
      (o && (da(e, t)?.set ?? (v && t in e && ((R) => (e[t] = R))))) || void 0,
    u = r,
    h = !0,
    y = !1,
    b = () => ((y = !0), h && ((h = !1), l ? (u = bt(r)) : (u = r)), u);
  c === void 0 && r !== void 0 && (g && s && Ll(), (c = b()), g && g(c));
  var _;
  if (s)
    _ = () => {
      var R = e[t];
      return R === void 0 ? b() : ((h = !0), (y = !1), R);
    };
  else {
    var A = (n ? aa : Se)(() => e[t]);
    (A.f |= Vl),
      (_ = () => {
        var R = i(A);
        return R !== void 0 && (u = void 0), R === void 0 ? u : R;
      });
  }
  if (!(a & oi)) return _;
  if (g) {
    var k = e.$$legacy;
    return function (R, N) {
      return arguments.length > 0
        ? ((!s || !N || k || d) && g(N ? _() : R), R)
        : _();
    };
  }
  var E = !1,
    x = fa(c),
    w = aa(() => {
      var R = _(),
        N = i(x);
      return E ? ((E = !1), N) : (x.v = R);
    });
  return (
    n || (w.equals = Dn),
    function (R, N) {
      if (arguments.length > 0) {
        const T = N ? i(w) : s && o ? ia(R) : R;
        return (
          w.equals(T) ||
            ((E = !0), C(x, T), y && u !== void 0 && (u = T), bt(() => i(w))),
          R
        );
      }
      return i(w);
    }
  );
}
function Zi(e) {
  return class extends ec {
    constructor(t) {
      super({ component: e, ...t });
    }
  };
}
var Ft, dt;
class ec {
  constructor(t) {
    nt(this, Ft);
    nt(this, dt);
    var a = new Map(),
      r = (s, o) => {
        var l = fa(o);
        return a.set(s, l), l;
      };
    const n = new Proxy(
      { ...(t.props || {}), $$events: {} },
      {
        get(s, o) {
          return i(a.get(o) ?? r(o, Reflect.get(s, o)));
        },
        has(s, o) {
          return o === fo
            ? !0
            : (i(a.get(o) ?? r(o, Reflect.get(s, o))), Reflect.has(s, o));
        },
        set(s, o, l) {
          return C(a.get(o) ?? r(o, l), l), Reflect.set(s, o, l);
        },
      },
    );
    yn(
      this,
      dt,
      (t.hydrate ? Gi : Wo)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: n,
        context: t.context,
        intro: t.intro ?? !1,
        recover: t.recover,
      }),
    ),
      (!t?.props?.$$host || t.sync === !1) && as(),
      yn(this, Ft, n.$$events);
    for (const s of Object.keys(Z(this, dt)))
      s === "$set" ||
        s === "$destroy" ||
        s === "$on" ||
        Wn(this, s, {
          get() {
            return Z(this, dt)[s];
          },
          set(o) {
            Z(this, dt)[s] = o;
          },
          enumerable: !0,
        });
    (Z(this, dt).$set = (s) => {
      Object.assign(n, s);
    }),
      (Z(this, dt).$destroy = () => {
        Ii(Z(this, dt));
      });
  }
  $set(t) {
    Z(this, dt).$set(t);
  }
  $on(t, a) {
    Z(this, Ft)[t] = Z(this, Ft)[t] || [];
    const r = (...n) => a.call(this, ...n);
    return (
      Z(this, Ft)[t].push(r),
      () => {
        Z(this, Ft)[t] = Z(this, Ft)[t].filter((n) => n !== r);
      }
    );
  }
  $destroy() {
    Z(this, dt).$destroy();
  }
}
(Ft = new WeakMap()), (dt = new WeakMap());
function tt(e) {
  de === null && Qn(),
    Na && de.l !== null
      ? rc(de).m.push(e)
      : Mr(() => {
          const t = bt(e);
          if (typeof t == "function") return t;
        });
}
function tc(e) {
  de === null && Qn(), tt(() => () => bt(e));
}
function ac(e, t, { bubbles: a = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: a, cancelable: r });
}
function dn() {
  const e = de;
  return (
    e === null && Qn(),
    (t, a, r) => {
      const n = e.s.$$events?.[t];
      if (n) {
        const s = tn(n) ? n.slice() : [n],
          o = ac(t, a, r);
        for (const l of s) l.call(e.x, o);
        return !o.defaultPrevented;
      }
      return !0;
    }
  );
}
function rc(e) {
  var t = e.l;
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
new URL("sveltekit-internal://");
function nc(e, t) {
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
function sc(e) {
  return e.split("%25").map(decodeURI).join("%25");
}
function oc(e) {
  for (const t in e) e[t] = decodeURIComponent(e[t]);
  return e;
}
function En({ href: e }) {
  return e.split("#")[0];
}
function lc(e, t, a, r = !1) {
  const n = new URL(e);
  Object.defineProperty(n, "searchParams", {
    value: new Proxy(n.searchParams, {
      get(o, l) {
        if (l === "get" || l === "getAll" || l === "has")
          return (c) => (a(c), o[l](c));
        t();
        const d = Reflect.get(o, l);
        return typeof d == "function" ? d.bind(o) : d;
      },
    }),
    enumerable: !0,
    configurable: !0,
  });
  const s = ["href", "pathname", "search", "toString", "toJSON"];
  r && s.push("hash");
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
function ic(...e) {
  let t = 5381;
  for (const a of e)
    if (typeof a == "string") {
      let r = a.length;
      for (; r; ) t = (t * 33) ^ a.charCodeAt(--r);
    } else if (ArrayBuffer.isView(a)) {
      const r = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
      let n = r.length;
      for (; n; ) t = (t * 33) ^ r[--n];
    } else throw new TypeError("value must be a string or TypedArray");
  return (t >>> 0).toString(36);
}
var Nv =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Pv(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function cc(e) {
  const t = atob(e),
    a = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++) a[r] = t.charCodeAt(r);
  return a.buffer;
}
const dc = window.fetch;
window.fetch = (e, t) => (
  (e instanceof Request ? e.method : t?.method || "GET") !== "GET" &&
    La.delete(os(e)),
  dc(e, t)
);
const La = new Map();
function uc(e, t) {
  const a = os(e, t),
    r = document.querySelector(a);
  if (r?.textContent) {
    let { body: n, ...s } = JSON.parse(r.textContent);
    const o = r.getAttribute("data-ttl");
    return (
      o && La.set(a, { body: n, init: s, ttl: 1e3 * Number(o) }),
      r.getAttribute("data-b64") !== null && (n = cc(n)),
      Promise.resolve(new Response(n, s))
    );
  }
  return window.fetch(e, t);
}
function fc(e, t, a) {
  if (La.size > 0) {
    const r = os(e, a),
      n = La.get(r);
    if (n) {
      if (
        performance.now() < n.ttl &&
        ["default", "force-cache", "only-if-cached", void 0].includes(a?.cache)
      )
        return new Response(n.body, n.init);
      La.delete(r);
    }
  }
  return window.fetch(t, a);
}
function os(e, t) {
  let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request ? e.url : e)}]`;
  if (t?.headers || t?.body) {
    const n = [];
    t.headers && n.push([...new Headers(t.headers)].join(",")),
      t.body &&
        (typeof t.body == "string" || ArrayBuffer.isView(t.body)) &&
        n.push(t.body),
      (r += `[data-hash="${ic(...n)}"]`);
  }
  return r;
}
const vc = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function pc(e) {
  const t = [];
  return {
    pattern:
      e === "/"
        ? /^\/$/
        : new RegExp(
            `^${gc(e)
              .map((r) => {
                const n = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
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
                const s = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
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
                if (!r) return;
                const o = r.split(/\[(.+?)\](?!\])/);
                return (
                  "/" +
                  o
                    .map((d, c) => {
                      if (c % 2) {
                        if (d.startsWith("x+"))
                          return An(
                            String.fromCharCode(parseInt(d.slice(2), 16)),
                          );
                        if (d.startsWith("u+"))
                          return An(
                            String.fromCharCode(
                              ...d
                                .slice(2)
                                .split("-")
                                .map((b) => parseInt(b, 16)),
                            ),
                          );
                        const v = vc.exec(d),
                          [, g, u, h, y] = v;
                        return (
                          t.push({
                            name: h,
                            matcher: y,
                            optional: !!g,
                            rest: !!u,
                            chained: u ? c === 1 && o[0] === "" : !1,
                          }),
                          u ? "(.*?)" : g ? "([^/]*)?" : "([^/]+?)"
                        );
                      }
                      return An(d);
                    })
                    .join("")
                );
              })
              .join("")}/?$`,
          ),
    params: t,
  };
}
function hc(e) {
  return !/^\([^)]+\)$/.test(e);
}
function gc(e) {
  return e.slice(1).split("/").filter(hc);
}
function mc(e, t, a) {
  const r = {},
    n = e.slice(1),
    s = n.filter((l) => l !== void 0);
  let o = 0;
  for (let l = 0; l < t.length; l += 1) {
    const d = t[l];
    let c = n[l - o];
    if (
      (d.chained &&
        d.rest &&
        o &&
        ((c = n
          .slice(l - o, l + 1)
          .filter((v) => v)
          .join("/")),
        (o = 0)),
      c === void 0)
    ) {
      d.rest && (r[d.name] = "");
      continue;
    }
    if (!d.matcher || a[d.matcher](c)) {
      r[d.name] = c;
      const v = t[l + 1],
        g = n[l + 1];
      v && !v.rest && v.optional && g && d.chained && (o = 0),
        !v && !g && Object.keys(r).length === s.length && (o = 0);
      continue;
    }
    if (d.optional && d.chained) {
      o++;
      continue;
    }
    return;
  }
  if (!o) return r;
}
function An(e) {
  return e
    .normalize()
    .replace(/[[\]]/g, "\\$&")
    .replace(/%/g, "%25")
    .replace(/\//g, "%2[Ff]")
    .replace(/\?/g, "%3[Ff]")
    .replace(/#/g, "%23")
    .replace(/[.*+?^${}()|\\]/g, "\\$&");
}
function bc({ nodes: e, server_loads: t, dictionary: a, matchers: r }) {
  const n = new Set(t);
  return Object.entries(a).map(([l, [d, c, v]]) => {
    const { pattern: g, params: u } = pc(l),
      h = {
        id: l,
        exec: (y) => {
          const b = g.exec(y);
          if (b) return mc(b, u, r);
        },
        errors: [1, ...(v || [])].map((y) => e[y]),
        layouts: [0, ...(c || [])].map(o),
        leaf: s(d),
      };
    return (
      (h.errors.length = h.layouts.length =
        Math.max(h.errors.length, h.layouts.length)),
      h
    );
  });
  function s(l) {
    const d = l < 0;
    return d && (l = ~l), [d, e[l]];
  }
  function o(l) {
    return l === void 0 ? l : [n.has(l), e[l]];
  }
}
function Lo(e, t = JSON.parse) {
  try {
    return t(sessionStorage[e]);
  } catch {}
}
function Us(e, t, a = JSON.stringify) {
  const r = a(t);
  try {
    sessionStorage[e] = r;
  } catch {}
}
const pt = globalThis.__sveltekit_1te57fj?.base ?? "",
  yc = globalThis.__sveltekit_1te57fj?.assets ?? pt,
  _c = "1741131971252",
  Xo = "sveltekit:snapshot",
  Jo = "sveltekit:scroll",
  Qo = "sveltekit:states",
  wc = "sveltekit:pageurl",
  ka = "sveltekit:history",
  rr = "sveltekit:navigation",
  Yr = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
  _r = location.origin;
function Zo(e) {
  if (e instanceof URL) return e;
  let t = document.baseURI;
  if (!t) {
    const a = document.getElementsByTagName("base");
    t = a.length ? a[0].href : document.URL;
  }
  return new URL(e, t);
}
function ls() {
  return { x: pageXOffset, y: pageYOffset };
}
function wa(e, t) {
  return e.getAttribute(`data-sveltekit-${t}`);
}
const Fs = { ...Yr, "": Yr.hover };
function el(e) {
  let t = e.assignedSlot ?? e.parentNode;
  return t?.nodeType === 11 && (t = t.host), t;
}
function tl(e, t) {
  for (; e && e !== t; ) {
    if (e.nodeName.toUpperCase() === "A" && e.hasAttribute("href")) return e;
    e = el(e);
  }
}
function $n(e, t, a) {
  let r;
  try {
    if (
      ((r = new URL(
        e instanceof SVGAElement ? e.href.baseVal : e.href,
        document.baseURI,
      )),
      a && r.hash.match(/^#[^/]/))
    ) {
      const l = location.hash.split("#")[1] || "/";
      r.hash = `#${l}${r.hash}`;
    }
  } catch {}
  const n = e instanceof SVGAElement ? e.target.baseVal : e.target,
    s =
      !r ||
      !!n ||
      un(r, t, a) ||
      (e.getAttribute("rel") || "").split(/\s+/).includes("external"),
    o = r?.origin === _r && e.hasAttribute("download");
  return { url: r, external: s, target: n, download: o };
}
function Dr(e) {
  let t = null,
    a = null,
    r = null,
    n = null,
    s = null,
    o = null,
    l = e;
  for (; l && l !== document.documentElement; )
    r === null && (r = wa(l, "preload-code")),
      n === null && (n = wa(l, "preload-data")),
      t === null && (t = wa(l, "keepfocus")),
      a === null && (a = wa(l, "noscroll")),
      s === null && (s = wa(l, "reload")),
      o === null && (o = wa(l, "replacestate")),
      (l = el(l));
  function d(c) {
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
    preload_code: Fs[r ?? "off"],
    preload_data: Fs[n ?? "off"],
    keepfocus: d(t),
    noscroll: d(a),
    reload: d(s),
    replace_state: d(o),
  };
}
function Ms(e) {
  const t = Je(e);
  let a = !0;
  function r() {
    (a = !0), t.update((o) => o);
  }
  function n(o) {
    (a = !1), t.set(o);
  }
  function s(o) {
    let l;
    return t.subscribe((d) => {
      (l === void 0 || (a && d !== l)) && o((l = d));
    });
  }
  return { notify: r, set: n, subscribe: s };
}
const al = { v: () => {} };
function xc() {
  const { set: e, subscribe: t } = Je(!1);
  let a;
  async function r() {
    clearTimeout(a);
    try {
      const n = await fetch(`${yc}/_app/version.json`, {
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      });
      if (!n.ok) return !1;
      const o = (await n.json()).version !== _c;
      return o && (e(!0), al.v(), clearTimeout(a)), o;
    } catch {
      return !1;
    }
  }
  return { subscribe: t, check: r };
}
function un(e, t, a) {
  return e.origin !== _r || !e.pathname.startsWith(t)
    ? !0
    : a
      ? !(
          e.pathname === t + "/" ||
          e.pathname === t + "/index.html" ||
          (e.protocol === "file:" &&
            e.pathname.replace(/\/[^/]+\.html?$/, "") === t)
        )
      : !1;
}
function Ov(e) {}
const rl = new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config",
]);
[...rl];
const kc = new Set([...rl]);
[...kc];
function Ec(e) {
  return e.filter((t) => t != null);
}
class fn {
  constructor(t, a) {
    (this.status = t),
      typeof a == "string"
        ? (this.body = { message: a })
        : a
          ? (this.body = a)
          : (this.body = { message: `Error: ${t}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class is {
  constructor(t, a) {
    (this.status = t), (this.location = a);
  }
}
class cs extends Error {
  constructor(t, a, r) {
    super(r), (this.status = t), (this.text = a);
  }
}
const Ac = "x-sveltekit-invalidated",
  Sc = "x-sveltekit-trailing-slash";
function zr(e) {
  return e instanceof fn || e instanceof cs ? e.status : 500;
}
function Tc(e) {
  return e instanceof cs ? e.text : "Internal Error";
}
let ke, nr, Sn;
const Cc =
  tt.toString().includes("$$") || /function \w+\(\) \{\}/.test(tt.toString());
var ir, cr, dr, ur, fr, vr, pr, hr, ro, gr, no, mr, so;
Cc
  ? ((ke = {
      data: {},
      form: null,
      error: null,
      params: {},
      route: { id: null },
      state: {},
      status: -1,
      url: new URL("https://example.com"),
    }),
    (nr = { current: null }),
    (Sn = { current: !1 }))
  : ((ke = new ((ro = class {
      constructor() {
        nt(this, ir, lt({}));
        nt(this, cr, lt(null));
        nt(this, dr, lt(null));
        nt(this, ur, lt({}));
        nt(this, fr, lt({ id: null }));
        nt(this, vr, lt({}));
        nt(this, pr, lt(-1));
        nt(this, hr, lt(new URL("https://example.com")));
      }
      get data() {
        return i(Z(this, ir));
      }
      set data(t) {
        C(Z(this, ir), t);
      }
      get form() {
        return i(Z(this, cr));
      }
      set form(t) {
        C(Z(this, cr), t);
      }
      get error() {
        return i(Z(this, dr));
      }
      set error(t) {
        C(Z(this, dr), t);
      }
      get params() {
        return i(Z(this, ur));
      }
      set params(t) {
        C(Z(this, ur), t);
      }
      get route() {
        return i(Z(this, fr));
      }
      set route(t) {
        C(Z(this, fr), t);
      }
      get state() {
        return i(Z(this, vr));
      }
      set state(t) {
        C(Z(this, vr), t);
      }
      get status() {
        return i(Z(this, pr));
      }
      set status(t) {
        C(Z(this, pr), t);
      }
      get url() {
        return i(Z(this, hr));
      }
      set url(t) {
        C(Z(this, hr), t);
      }
    }),
    (ir = new WeakMap()),
    (cr = new WeakMap()),
    (dr = new WeakMap()),
    (ur = new WeakMap()),
    (fr = new WeakMap()),
    (vr = new WeakMap()),
    (pr = new WeakMap()),
    (hr = new WeakMap()),
    ro)()),
    (nr = new ((no = class {
      constructor() {
        nt(this, gr, lt(null));
      }
      get current() {
        return i(Z(this, gr));
      }
      set current(t) {
        C(Z(this, gr), t);
      }
    }),
    (gr = new WeakMap()),
    no)()),
    (Sn = new ((so = class {
      constructor() {
        nt(this, mr, lt(!1));
      }
      get current() {
        return i(Z(this, mr));
      }
      set current(t) {
        C(Z(this, mr), t);
      }
    }),
    (mr = new WeakMap()),
    so)()),
    (al.v = () => (Sn.current = !0)));
function Rc(e) {
  Object.assign(ke, e);
}
const Nc = "/__data.json",
  Pc = ".html__data.json";
function Oc(e) {
  return e.endsWith(".html")
    ? e.replace(/\.html$/, Pc)
    : e.replace(/\/$/, "") + Nc;
}
const Bc = new Set(["icon", "shortcut icon", "apple-touch-icon"]),
  va = Lo(Jo) ?? {},
  sr = Lo(Xo) ?? {},
  Bt = { url: Ms({}), page: Ms({}), navigating: Je(null), updated: xc() };
function ds(e) {
  va[e] = ls();
}
function Gc(e, t) {
  let a = e + 1;
  for (; va[a]; ) delete va[a], (a += 1);
  for (a = t + 1; sr[a]; ) delete sr[a], (a += 1);
}
function Ta(e) {
  return (location.href = e.href), new Promise(() => {});
}
async function nl() {
  if ("serviceWorker" in navigator) {
    const e = await navigator.serviceWorker.getRegistration(pt || "/");
    e && (await e.update());
  }
}
function $s() {}
let us, Vn, Kr, $t, Hn, Ne;
const Lr = [],
  Xr = [];
let ta = null;
const sl = new Set(),
  Ic = new Set(),
  Xa = new Set();
let ve = { branch: [], error: null, url: null },
  fs = !1,
  Jr = !1,
  Vs = !0,
  or = !1,
  qa = !1,
  ol = !1,
  vs = !1,
  ll,
  He,
  ut,
  ca;
const Ja = new Set();
async function jv(e, t, a) {
  document.URL !== location.href && (location.href = location.href),
    (Ne = e),
    await e.hooks.init?.(),
    (us = bc(e)),
    ($t = document.documentElement),
    (Hn = t),
    (Vn = e.nodes[0]),
    (Kr = e.nodes[1]),
    Vn(),
    Kr(),
    (He = history.state?.[ka]),
    (ut = history.state?.[rr]),
    He ||
      ((He = ut = Date.now()),
      history.replaceState({ ...history.state, [ka]: He, [rr]: ut }, ""));
  const r = va[He];
  r && ((history.scrollRestoration = "manual"), scrollTo(r.x, r.y)),
    a
      ? await Yc(Hn, a)
      : await Aa(Ne.hash ? ml(new URL(location.href)) : location.href, {
          replaceState: !0,
        }),
    Wc();
}
function jc() {
  (Lr.length = 0), (vs = !1);
}
function il(e) {
  Xr.some((t) => t?.snapshot) &&
    (sr[e] = Xr.map((t) => t?.snapshot?.capture()));
}
function cl(e) {
  sr[e]?.forEach((t, a) => {
    Xr[a]?.snapshot?.restore(t);
  });
}
function Hs() {
  ds(He), Us(Jo, va), il(ut), Us(Xo, sr);
}
async function ps(e, t, a, r) {
  return Ya({
    type: "goto",
    url: Zo(e),
    keepfocus: t.keepFocus,
    noscroll: t.noScroll,
    replace_state: t.replaceState,
    state: t.state,
    redirect_count: a,
    nav_token: r,
    accept: () => {
      t.invalidateAll && (vs = !0), t.invalidate && t.invalidate.forEach(qc);
    },
  });
}
async function Uc(e) {
  if (e.id !== ta?.id) {
    const t = {};
    Ja.add(t),
      (ta = {
        id: e.id,
        token: t,
        promise: ul({ ...e, preload: t }).then(
          (a) => (
            Ja.delete(t), a.type === "loaded" && a.state.error && (ta = null), a
          ),
        ),
      });
  }
  return ta.promise;
}
async function Tn(e) {
  const t = (await pn(e, !1))?.route;
  t && (await Promise.all([...t.layouts, t.leaf].map((a) => a?.[1]())));
}
function dl(e, t, a) {
  ve = e.state;
  const r = document.querySelector("style[data-sveltekit]");
  r && r.remove(),
    Object.assign(ke, e.props.page),
    (ll = new Ne.root({
      target: t,
      props: { ...e.props, stores: Bt, components: Xr },
      hydrate: a,
      sync: !1,
    })),
    cl(ut);
  const n = {
    from: null,
    to: {
      params: ve.params,
      route: { id: ve.route?.id ?? null },
      url: new URL(location.href),
    },
    willUnload: !1,
    type: "enter",
    complete: Promise.resolve(),
  };
  Xa.forEach((s) => s(n)), (Jr = !0);
}
function Qr({
  url: e,
  params: t,
  branch: a,
  status: r,
  error: n,
  route: s,
  form: o,
}) {
  let l = "never";
  if (pt && (e.pathname === pt || e.pathname === pt + "/")) l = "always";
  else for (const h of a) h?.slash !== void 0 && (l = h.slash);
  (e.pathname = nc(e.pathname, l)), (e.search = e.search);
  const d = {
    type: "loaded",
    state: { url: e, params: t, branch: a, error: n, route: s },
    props: { constructors: Ec(a).map((h) => h.node.component), page: ms(ke) },
  };
  o !== void 0 && (d.props.form = o);
  let c = {},
    v = !ke,
    g = 0;
  for (let h = 0; h < Math.max(a.length, ve.branch.length); h += 1) {
    const y = a[h],
      b = ve.branch[h];
    y?.data !== b?.data && (v = !0),
      y &&
        ((c = { ...c, ...y.data }), v && (d.props[`data_${g}`] = c), (g += 1));
  }
  return (
    (!ve.url ||
      e.href !== ve.url.href ||
      ve.error !== n ||
      (o !== void 0 && o !== ke.form) ||
      v) &&
      (d.props.page = {
        error: n,
        params: t,
        route: { id: s?.id ?? null },
        state: {},
        status: r,
        url: new URL(e),
        form: o ?? null,
        data: v ? c : ke.data,
      }),
    d
  );
}
async function hs({
  loader: e,
  parent: t,
  url: a,
  params: r,
  route: n,
  server_data_node: s,
}) {
  let o = null,
    l = !0;
  const d = {
      dependencies: new Set(),
      params: new Set(),
      parent: !1,
      route: !1,
      url: !1,
      search_params: new Set(),
    },
    c = await e();
  if (c.universal?.load) {
    let v = function (...u) {
      for (const h of u) {
        const { href: y } = new URL(h, a);
        d.dependencies.add(y);
      }
    };
    const g = {
      route: new Proxy(n, { get: (u, h) => (l && (d.route = !0), u[h]) }),
      params: new Proxy(r, { get: (u, h) => (l && d.params.add(h), u[h]) }),
      data: s?.data ?? null,
      url: lc(
        a,
        () => {
          l && (d.url = !0);
        },
        (u) => {
          l && d.search_params.add(u);
        },
        Ne.hash,
      ),
      async fetch(u, h) {
        let y;
        u instanceof Request
          ? ((y = u.url),
            (h = {
              body:
                u.method === "GET" || u.method === "HEAD"
                  ? void 0
                  : await u.blob(),
              cache: u.cache,
              credentials: u.credentials,
              headers: [...u.headers].length ? u.headers : void 0,
              integrity: u.integrity,
              keepalive: u.keepalive,
              method: u.method,
              mode: u.mode,
              redirect: u.redirect,
              referrer: u.referrer,
              referrerPolicy: u.referrerPolicy,
              signal: u.signal,
              ...h,
            }))
          : (y = u);
        const b = new URL(y, a);
        return (
          l && v(b.href),
          b.origin === a.origin && (y = b.href.slice(a.origin.length)),
          Jr ? fc(y, b.href, h) : uc(y, h)
        );
      },
      setHeaders: () => {},
      depends: v,
      parent() {
        return l && (d.parent = !0), t();
      },
      untrack(u) {
        l = !1;
        try {
          return u();
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
    universal: c.universal?.load ? { type: "data", data: o, uses: d } : null,
    data: o ?? s?.data ?? null,
    slash: c.universal?.trailingSlash ?? s?.slash,
  };
}
function qs(e, t, a, r, n, s) {
  if (vs) return !0;
  if (!n) return !1;
  if ((n.parent && e) || (n.route && t) || (n.url && a)) return !0;
  for (const o of n.search_params) if (r.has(o)) return !0;
  for (const o of n.params) if (s[o] !== ve.params[o]) return !0;
  for (const o of n.dependencies) if (Lr.some((l) => l(new URL(o)))) return !0;
  return !1;
}
function gs(e, t) {
  return e?.type === "data" ? e : e?.type === "skip" ? t ?? null : null;
}
function Fc(e, t) {
  if (!e) return new Set(t.searchParams.keys());
  const a = new Set([...e.searchParams.keys(), ...t.searchParams.keys()]);
  for (const r of a) {
    const n = e.searchParams.getAll(r),
      s = t.searchParams.getAll(r);
    n.every((o) => s.includes(o)) &&
      s.every((o) => n.includes(o)) &&
      a.delete(r);
  }
  return a;
}
function Ws({ error: e, url: t, route: a, params: r }) {
  return {
    type: "loaded",
    state: { error: e, url: t, route: a, params: r, branch: [] },
    props: { page: ms(ke), constructors: [] },
  };
}
async function ul({
  id: e,
  invalidating: t,
  url: a,
  params: r,
  route: n,
  preload: s,
}) {
  if (ta?.id === e) return Ja.delete(ta.token), ta.promise;
  const { errors: o, layouts: l, leaf: d } = n,
    c = [...l, d];
  o.forEach((x) => x?.().catch(() => {})),
    c.forEach((x) => x?.[1]().catch(() => {}));
  let v = null;
  const g = ve.url ? e !== Zr(ve.url) : !1,
    u = ve.route ? n.id !== ve.route.id : !1,
    h = Fc(ve.url, a);
  let y = !1;
  const b = c.map((x, w) => {
    const R = ve.branch[w],
      N = !!x?.[0] && (R?.loader !== x[1] || qs(y, u, g, h, R.server?.uses, r));
    return N && (y = !0), N;
  });
  if (b.some(Boolean)) {
    try {
      v = await pl(a, b);
    } catch (x) {
      const w = await Ea(x, { url: a, params: r, route: { id: e } });
      return Ja.has(s)
        ? Ws({ error: w, url: a, params: r, route: n })
        : vn({ status: zr(x), error: w, url: a, route: n });
    }
    if (v.type === "redirect") return v;
  }
  const _ = v?.nodes;
  let A = !1;
  const k = c.map(async (x, w) => {
    if (!x) return;
    const R = ve.branch[w],
      N = _?.[w];
    if (
      (!N || N.type === "skip") &&
      x[1] === R?.loader &&
      !qs(A, u, g, h, R.universal?.uses, r)
    )
      return R;
    if (((A = !0), N?.type === "error")) throw N;
    return hs({
      loader: x[1],
      url: a,
      params: r,
      route: n,
      parent: async () => {
        const O = {};
        for (let G = 0; G < w; G += 1) Object.assign(O, (await k[G])?.data);
        return O;
      },
      server_data_node: gs(
        N === void 0 && x[0] ? { type: "skip" } : N ?? null,
        x[0] ? R?.server : void 0,
      ),
    });
  });
  for (const x of k) x.catch(() => {});
  const E = [];
  for (let x = 0; x < c.length; x += 1)
    if (c[x])
      try {
        E.push(await k[x]);
      } catch (w) {
        if (w instanceof is) return { type: "redirect", location: w.location };
        if (Ja.has(s))
          return Ws({
            error: await Ea(w, { params: r, url: a, route: { id: n.id } }),
            url: a,
            params: r,
            route: n,
          });
        let R = zr(w),
          N;
        if (_?.includes(w)) (R = w.status ?? R), (N = w.error);
        else if (w instanceof fn) N = w.body;
        else {
          if (await Bt.updated.check()) return await nl(), await Ta(a);
          N = await Ea(w, { params: r, url: a, route: { id: n.id } });
        }
        const T = await Mc(x, E, o);
        return T
          ? Qr({
              url: a,
              params: r,
              branch: E.slice(0, T.idx).concat(T.node),
              status: R,
              error: N,
              route: n,
            })
          : await vl(a, { id: n.id }, N, R);
      }
    else E.push(void 0);
  return Qr({
    url: a,
    params: r,
    branch: E,
    status: 200,
    error: null,
    route: n,
    form: t ? void 0 : null,
  });
}
async function Mc(e, t, a) {
  for (; e--; )
    if (a[e]) {
      let r = e;
      for (; !t[r]; ) r -= 1;
      try {
        return {
          idx: r + 1,
          node: {
            node: await a[e](),
            loader: a[e],
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
async function vn({ status: e, error: t, url: a, route: r }) {
  const n = {};
  let s = null;
  if (Ne.server_loads[0] === 0)
    try {
      const l = await pl(a, [!0]);
      if (l.type !== "data" || (l.nodes[0] && l.nodes[0].type !== "data"))
        throw 0;
      s = l.nodes[0] ?? null;
    } catch {
      (a.origin !== _r || a.pathname !== location.pathname || fs) &&
        (await Ta(a));
    }
  try {
    const l = await hs({
        loader: Vn,
        url: a,
        params: n,
        route: r,
        parent: () => Promise.resolve({}),
        server_data_node: gs(s),
      }),
      d = {
        node: await Kr(),
        loader: Kr,
        universal: null,
        server: null,
        data: null,
      };
    return Qr({
      url: a,
      params: n,
      branch: [l, d],
      status: e,
      error: t,
      route: null,
    });
  } catch (l) {
    if (l instanceof is) return ps(new URL(l.location, location.href), {}, 0);
    throw l;
  }
}
function $c(e) {
  let t;
  try {
    if (
      ((t = Ne.hooks.reroute({ url: new URL(e) }) ?? e), typeof t == "string")
    ) {
      const a = new URL(e);
      Ne.hash ? (a.hash = t) : (a.pathname = t), (t = a);
    }
  } catch {
    return;
  }
  return t;
}
async function pn(e, t) {
  if (e && !un(e, pt, Ne.hash)) {
    const a = $c(e);
    if (!a) return;
    const r = Vc(a);
    for (const n of us) {
      const s = n.exec(r);
      if (s)
        return { id: Zr(e), invalidating: t, route: n, params: oc(s), url: e };
    }
  }
}
function Vc(e) {
  return (
    sc(
      Ne.hash
        ? e.hash.replace(/^#/, "").replace(/[?#].+/, "")
        : e.pathname.slice(pt.length),
    ) || "/"
  );
}
function Zr(e) {
  return (Ne.hash ? e.hash.replace(/^#/, "") : e.pathname) + e.search;
}
function fl({ url: e, type: t, intent: a, delta: r }) {
  let n = !1;
  const s = gl(ve, a, e, t);
  r !== void 0 && (s.navigation.delta = r);
  const o = {
    ...s.navigation,
    cancel: () => {
      (n = !0), s.reject(new Error("navigation cancelled"));
    },
  };
  return or || sl.forEach((l) => l(o)), n ? null : s;
}
async function Ya({
  type: e,
  url: t,
  popped: a,
  keepfocus: r,
  noscroll: n,
  replace_state: s,
  state: o = {},
  redirect_count: l = 0,
  nav_token: d = {},
  accept: c = $s,
  block: v = $s,
}) {
  const g = ca;
  ca = d;
  const u = await pn(t, !1),
    h = fl({ url: t, type: e, delta: a?.delta, intent: u });
  if (!h) {
    v(), ca === d && (ca = g);
    return;
  }
  const y = He,
    b = ut;
  c(), (or = !0), Jr && Bt.navigating.set((nr.current = h.navigation));
  let _ = u && (await ul(u));
  if (!_) {
    if (un(t, pt, Ne.hash)) return await Ta(t);
    _ = await vl(
      t,
      { id: null },
      await Ea(new cs(404, "Not Found", `Not found: ${t.pathname}`), {
        url: t,
        params: {},
        route: { id: null },
      }),
      404,
    );
  }
  if (((t = u?.url || t), ca !== d))
    return h.reject(new Error("navigation aborted")), !1;
  if (_.type === "redirect")
    if (l >= 20)
      _ = await vn({
        status: 500,
        error: await Ea(new Error("Redirect loop"), {
          url: t,
          params: {},
          route: { id: null },
        }),
        url: t,
        route: { id: null },
      });
    else return await ps(new URL(_.location, t).href, {}, l + 1, d), !1;
  else
    _.props.page.status >= 400 &&
      (await Bt.updated.check()) &&
      (await nl(), await Ta(t));
  if (
    (jc(),
    ds(y),
    il(b),
    _.props.page.url.pathname !== t.pathname &&
      (t.pathname = _.props.page.url.pathname),
    (o = a ? a.state : o),
    !a)
  ) {
    const x = s ? 0 : 1,
      w = { [ka]: (He += x), [rr]: (ut += x), [Qo]: o };
    (s ? history.replaceState : history.pushState).call(history, w, "", t),
      s || Gc(He, ut);
  }
  if (((ta = null), (_.props.page.state = o), Jr)) {
    (ve = _.state), _.props.page && (_.props.page.url = t);
    const x = (
      await Promise.all(Array.from(Ic, (w) => w(h.navigation)))
    ).filter((w) => typeof w == "function");
    if (x.length > 0) {
      let w = function () {
        x.forEach((R) => {
          Xa.delete(R);
        });
      };
      x.push(w),
        x.forEach((R) => {
          Xa.add(R);
        });
    }
    ll.$set(_.props), Rc(_.props.page), (ol = !0);
  } else dl(_, Hn, !1);
  const { activeElement: A } = document;
  await Mo();
  const k = a ? a.scroll : n ? ls() : null;
  if (Vs) {
    const x =
      t.hash &&
      document.getElementById(
        decodeURIComponent(
          Ne.hash ? t.hash.split("#")[2] ?? "" : t.hash.slice(1),
        ),
      );
    k ? scrollTo(k.x, k.y) : x ? x.scrollIntoView() : scrollTo(0, 0);
  }
  const E =
    document.activeElement !== A && document.activeElement !== document.body;
  !r && !E && Dc(),
    (Vs = !0),
    _.props.page && Object.assign(ke, _.props.page),
    (or = !1),
    e === "popstate" && cl(ut),
    h.fulfil(void 0),
    Xa.forEach((x) => x(h.navigation)),
    Bt.navigating.set((nr.current = null));
}
async function vl(e, t, a, r) {
  return e.origin === _r && e.pathname === location.pathname && !fs
    ? await vn({ status: r, error: a, url: e, route: t })
    : await Ta(e);
}
function Hc() {
  let e, t;
  $t.addEventListener("mousemove", (o) => {
    const l = o.target;
    clearTimeout(e),
      (e = setTimeout(() => {
        n(l, 2);
      }, 20));
  });
  function a(o) {
    o.defaultPrevented || n(o.composedPath()[0], 1);
  }
  $t.addEventListener("mousedown", a),
    $t.addEventListener("touchstart", a, { passive: !0 });
  const r = new IntersectionObserver(
    (o) => {
      for (const l of o)
        l.isIntersecting && (Tn(new URL(l.target.href)), r.unobserve(l.target));
    },
    { threshold: 0 },
  );
  async function n(o, l) {
    const d = tl(o, $t);
    if (!d || d === t) return;
    const { url: c, external: v, download: g } = $n(d, pt, Ne.hash);
    if (v || g) return;
    const u = Dr(d),
      h = c && Zr(ve.url) === Zr(c);
    if (!u.reload && !h)
      if (l <= u.preload_data) {
        t = d;
        const y = await pn(c, !1);
        y && Uc(y);
      } else l <= u.preload_code && ((t = d), Tn(c));
  }
  function s() {
    r.disconnect();
    for (const o of $t.querySelectorAll("a")) {
      const { url: l, external: d, download: c } = $n(o, pt, Ne.hash);
      if (d || c) continue;
      const v = Dr(o);
      v.reload ||
        (v.preload_code === Yr.viewport && r.observe(o),
        v.preload_code === Yr.eager && Tn(l));
    }
  }
  Xa.add(s), s();
}
function Ea(e, t) {
  if (e instanceof fn) return e.body;
  const a = zr(e),
    r = Tc(e);
  return (
    Ne.hooks.handleError({ error: e, event: t, status: a, message: r }) ?? {
      message: r,
    }
  );
}
function Aa(e, t = {}) {
  return (
    (e = new URL(Zo(e))),
    e.origin !== _r
      ? Promise.reject(new Error("goto: invalid URL"))
      : ps(e, t, 0)
  );
}
function qc(e) {
  if (typeof e == "function") Lr.push(e);
  else {
    const { href: t } = new URL(e, location.href);
    Lr.push((a) => a.href === t);
  }
}
function Wc() {
  (history.scrollRestoration = "manual"),
    addEventListener("beforeunload", (t) => {
      let a = !1;
      if ((Hs(), !or)) {
        const r = gl(ve, void 0, null, "leave"),
          n = {
            ...r.navigation,
            cancel: () => {
              (a = !0), r.reject(new Error("navigation cancelled"));
            },
          };
        sl.forEach((s) => s(n));
      }
      a
        ? (t.preventDefault(), (t.returnValue = ""))
        : (history.scrollRestoration = "auto");
    }),
    addEventListener("visibilitychange", () => {
      document.visibilityState === "hidden" && Hs();
    }),
    navigator.connection?.saveData || Hc(),
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
      const a = tl(t.composedPath()[0], $t);
      if (!a) return;
      const {
        url: r,
        external: n,
        target: s,
        download: o,
      } = $n(a, pt, Ne.hash);
      if (!r) return;
      if (s === "_parent" || s === "_top") {
        if (window.parent !== window) return;
      } else if (s && s !== "_self") return;
      const l = Dr(a);
      if (
        (!(a instanceof SVGAElement) &&
          r.protocol !== location.protocol &&
          !(r.protocol === "https:" || r.protocol === "http:")) ||
        o
      )
        return;
      const [c, v] = (Ne.hash ? r.hash.replace(/^#/, "") : r.href).split("#"),
        g = c === En(location);
      if (n || (l.reload && (!g || !v))) {
        fl({ url: r, type: "link" }) ? (or = !0) : t.preventDefault();
        return;
      }
      if (v !== void 0 && g) {
        const [, u] = ve.url.href.split("#");
        if (u === v) {
          if (
            (t.preventDefault(),
            v === "" ||
              (v === "top" && a.ownerDocument.getElementById("top") === null))
          )
            window.scrollTo({ top: 0 });
          else {
            const h = a.ownerDocument.getElementById(decodeURIComponent(v));
            h && (h.scrollIntoView(), h.focus());
          }
          return;
        }
        if (((qa = !0), ds(He), e(r), !l.replace_state)) return;
        qa = !1;
      }
      t.preventDefault(),
        await new Promise((u) => {
          requestAnimationFrame(() => {
            setTimeout(u, 0);
          }),
            setTimeout(u, 100);
        }),
        await Ya({
          type: "link",
          url: r,
          keepfocus: l.keepfocus,
          noscroll: l.noscroll,
          replace_state: l.replace_state ?? r.href === location.href,
        });
    }),
    $t.addEventListener("submit", (t) => {
      if (t.defaultPrevented) return;
      const a = HTMLFormElement.prototype.cloneNode.call(t.target),
        r = t.submitter;
      if (
        (r?.formTarget || a.target) === "_blank" ||
        (r?.formMethod || a.method) !== "get"
      )
        return;
      const o = new URL(
        (r?.hasAttribute("formaction") && r?.formAction) || a.action,
      );
      if (un(o, pt, !1)) return;
      const l = t.target,
        d = Dr(l);
      if (d.reload) return;
      t.preventDefault(), t.stopPropagation();
      const c = new FormData(l),
        v = r?.getAttribute("name");
      v && c.append(v, r?.getAttribute("value") ?? ""),
        (o.search = new URLSearchParams(c).toString()),
        Ya({
          type: "form",
          url: o,
          keepfocus: d.keepfocus,
          noscroll: d.noscroll,
          replace_state: d.replace_state ?? o.href === location.href,
        });
    }),
    addEventListener("popstate", async (t) => {
      if (t.state?.[ka]) {
        const a = t.state[ka];
        if (((ca = {}), a === He)) return;
        const r = va[a],
          n = t.state[Qo] ?? {},
          s = new URL(t.state[wc] ?? location.href),
          o = t.state[rr],
          l = ve.url ? En(location) === En(ve.url) : !1;
        if (o === ut && (ol || l)) {
          n !== ke.state && (ke.state = n),
            e(s),
            (va[He] = ls()),
            r && scrollTo(r.x, r.y),
            (He = a);
          return;
        }
        const c = a - He;
        await Ya({
          type: "popstate",
          url: s,
          popped: { state: n, scroll: r, delta: c },
          accept: () => {
            (He = a), (ut = o);
          },
          block: () => {
            history.go(-c);
          },
          nav_token: ca,
        });
      } else if (!qa) {
        const a = new URL(location.href);
        e(a);
      }
    }),
    addEventListener("hashchange", () => {
      qa
        ? ((qa = !1),
          history.replaceState(
            { ...history.state, [ka]: ++He, [rr]: ut },
            "",
            location.href,
          ))
        : Ne.hash &&
          ve.url.hash === location.hash &&
          Ya({ type: "goto", url: ml(ve.url) });
    });
  for (const t of document.querySelectorAll("link"))
    Bc.has(t.rel) && (t.href = t.href);
  addEventListener("pageshow", (t) => {
    t.persisted && Bt.navigating.set((nr.current = null));
  });
  function e(t) {
    (ve.url = ke.url = t), Bt.page.set(ms(ke)), Bt.page.notify();
  }
}
async function Yc(
  e,
  {
    status: t = 200,
    error: a,
    node_ids: r,
    params: n,
    route: s,
    server_route: o,
    data: l,
    form: d,
  },
) {
  fs = !0;
  const c = new URL(location.href);
  let v;
  ({ params: n = {}, route: s = { id: null } } = (await pn(c, !1)) || {}),
    (v = us.find(({ id: h }) => h === s.id));
  let g,
    u = !0;
  try {
    const h = r.map(async (b, _) => {
        const A = l[_];
        return (
          A?.uses && (A.uses = hl(A.uses)),
          hs({
            loader: Ne.nodes[b],
            url: c,
            params: n,
            route: s,
            parent: async () => {
              const k = {};
              for (let E = 0; E < _; E += 1)
                Object.assign(k, (await h[E]).data);
              return k;
            },
            server_data_node: gs(A),
          })
        );
      }),
      y = await Promise.all(h);
    if (v) {
      const b = v.layouts;
      for (let _ = 0; _ < b.length; _++) b[_] || y.splice(_, 0, void 0);
    }
    g = Qr({
      url: c,
      params: n,
      branch: y,
      status: t,
      error: a,
      form: d,
      route: v ?? null,
    });
  } catch (h) {
    if (h instanceof is) {
      await Ta(new URL(h.location, location.href));
      return;
    }
    (g = await vn({
      status: zr(h),
      error: await Ea(h, { url: c, params: n, route: s }),
      url: c,
      route: s,
    })),
      (e.textContent = ""),
      (u = !1);
  }
  g.props.page && (g.props.page.state = {}), dl(g, e, u);
}
async function pl(e, t) {
  const a = new URL(e);
  (a.pathname = Oc(e.pathname)),
    e.pathname.endsWith("/") && a.searchParams.append(Sc, "1"),
    a.searchParams.append(Ac, t.map((s) => (s ? "1" : "0")).join(""));
  const r = window.fetch,
    n = await r(a.href, {});
  if (!n.ok) {
    let s;
    throw (
      (n.headers.get("content-type")?.includes("application/json")
        ? (s = await n.json())
        : n.status === 404
          ? (s = "Not Found")
          : n.status === 500 && (s = "Internal Error"),
      new fn(n.status, s))
    );
  }
  return new Promise(async (s) => {
    const o = new Map(),
      l = n.body.getReader(),
      d = new TextDecoder();
    function c(g) {
      return Bl(g, {
        ...Ne.decoders,
        Promise: (u) =>
          new Promise((h, y) => {
            o.set(u, { fulfil: h, reject: y });
          }),
      });
    }
    let v = "";
    for (;;) {
      const { done: g, value: u } = await l.read();
      if (g && !v) break;
      for (
        v +=
          !u && v
            ? `
`
            : d.decode(u, { stream: !0 });
        ;

      ) {
        const h = v.indexOf(`
`);
        if (h === -1) break;
        const y = JSON.parse(v.slice(0, h));
        if (((v = v.slice(h + 1)), y.type === "redirect")) return s(y);
        if (y.type === "data")
          y.nodes?.forEach((b) => {
            b?.type === "data" && ((b.uses = hl(b.uses)), (b.data = c(b.data)));
          }),
            s(y);
        else if (y.type === "chunk") {
          const { id: b, data: _, error: A } = y,
            k = o.get(b);
          o.delete(b), A ? k.reject(c(A)) : k.fulfil(c(_));
        }
      }
    }
  });
}
function hl(e) {
  return {
    dependencies: new Set(e?.dependencies ?? []),
    params: new Set(e?.params ?? []),
    parent: !!e?.parent,
    route: !!e?.route,
    url: !!e?.url,
    search_params: new Set(e?.search_params ?? []),
  };
}
function Dc() {
  const e = document.querySelector("[autofocus]");
  if (e) e.focus();
  else {
    const t = document.body,
      a = t.getAttribute("tabindex");
    (t.tabIndex = -1),
      t.focus({ preventScroll: !0, focusVisible: !1 }),
      a !== null
        ? t.setAttribute("tabindex", a)
        : t.removeAttribute("tabindex");
    const r = getSelection();
    if (r && r.type !== "None") {
      const n = [];
      for (let s = 0; s < r.rangeCount; s += 1) n.push(r.getRangeAt(s));
      setTimeout(() => {
        if (r.rangeCount === n.length) {
          for (let s = 0; s < r.rangeCount; s += 1) {
            const o = n[s],
              l = r.getRangeAt(s);
            if (
              o.commonAncestorContainer !== l.commonAncestorContainer ||
              o.startContainer !== l.startContainer ||
              o.endContainer !== l.endContainer ||
              o.startOffset !== l.startOffset ||
              o.endOffset !== l.endOffset
            )
              return;
          }
          r.removeAllRanges();
        }
      });
    }
  }
}
function gl(e, t, a, r) {
  let n, s;
  const o = new Promise((d, c) => {
    (n = d), (s = c);
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
        to: a && {
          params: t?.params ?? null,
          route: { id: t?.route?.id ?? null },
          url: a,
        },
        willUnload: !t,
        type: r,
        complete: o,
      },
      fulfil: n,
      reject: s,
    }
  );
}
function ms(e) {
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
function ml(e) {
  const t = new URL(e);
  return (t.hash = decodeURIComponent(e.hash)), t;
}
const zc = "modulepreload",
  Kc = function (e, t) {
    return new URL(e, t).href;
  },
  Ys = {},
  st = function (t, a, r) {
    let n = Promise.resolve();
    if (a && a.length > 0) {
      const o = document.getElementsByTagName("link"),
        l = document.querySelector("meta[property=csp-nonce]"),
        d = l?.nonce || l?.getAttribute("nonce");
      n = Promise.allSettled(
        a.map((c) => {
          if (((c = Kc(c, r)), c in Ys)) return;
          Ys[c] = !0;
          const v = c.endsWith(".css"),
            g = v ? '[rel="stylesheet"]' : "";
          if (!!r)
            for (let y = o.length - 1; y >= 0; y--) {
              const b = o[y];
              if (b.href === c && (!v || b.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${c}"]${g}`)) return;
          const h = document.createElement("link");
          if (
            ((h.rel = v ? "stylesheet" : zc),
            v || (h.as = "script"),
            (h.crossOrigin = ""),
            (h.href = c),
            d && h.setAttribute("nonce", d),
            document.head.appendChild(h),
            v)
          )
            return new Promise((y, b) => {
              h.addEventListener("load", y),
                h.addEventListener("error", () =>
                  b(new Error(`Unable to preload CSS for ${c}`)),
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
  Uv = {},
  Lc = "5";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(Lc);
var Xc = P(
    '<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>',
  ),
  Jc = P("<!> <!>", 1);
function Qc(e, t) {
  pe(t, !0);
  let a = J(t, "components", 23, () => []),
    r = J(t, "data_0", 3, null),
    n = J(t, "data_1", 3, null);
  So(() => t.stores.page.set(t.page)),
    Mr(() => {
      t.stores,
        t.page,
        t.constructors,
        a(),
        t.form,
        r(),
        n(),
        t.stores.page.notify();
    });
  let s = lt(!1),
    o = lt(!1),
    l = lt(null);
  tt(() => {
    const b = t.stores.page.subscribe(() => {
      i(s) &&
        (C(o, !0),
        Mo().then(() => {
          C(l, ia(document.title || "untitled page"));
        }));
    });
    return C(s, !0), b;
  });
  const d = aa(() => t.constructors[1]);
  var c = Jc(),
    v = K(c);
  {
    var g = (b) => {
        var _ = fe();
        const A = aa(() => t.constructors[0]);
        var k = K(_);
        Gr(
          k,
          () => i(A),
          (E, x) => {
            Ir(
              x(E, {
                get data() {
                  return r();
                },
                get form() {
                  return t.form;
                },
                children: (w, R) => {
                  var N = fe(),
                    T = K(N);
                  Gr(
                    T,
                    () => i(d),
                    (O, G) => {
                      Ir(
                        G(O, {
                          get data() {
                            return n();
                          },
                          get form() {
                            return t.form;
                          },
                        }),
                        (M) => (a()[1] = M),
                        () => a()?.[1],
                      );
                    },
                  ),
                    S(w, N);
                },
                $$slots: { default: !0 },
              }),
              (w) => (a()[0] = w),
              () => a()?.[0],
            );
          },
        ),
          S(b, _);
      },
      u = (b) => {
        var _ = fe();
        const A = aa(() => t.constructors[0]);
        var k = K(_);
        Gr(
          k,
          () => i(A),
          (E, x) => {
            Ir(
              x(E, {
                get data() {
                  return r();
                },
                get form() {
                  return t.form;
                },
              }),
              (w) => (a()[0] = w),
              () => a()?.[0],
            );
          },
        ),
          S(b, _);
      };
    F(v, (b) => {
      t.constructors[1] ? b(g) : b(u, !1);
    });
  }
  var h = m(v, 2);
  {
    var y = (b) => {
      var _ = Xc(),
        A = p(_);
      {
        var k = (E) => {
          var x = Ka();
          W(() => Y(x, i(l))), S(E, x);
        };
        F(A, (E) => {
          i(o) && E(k);
        });
      }
      f(_), S(b, _);
    };
    F(h, (b) => {
      i(s) && b(y);
    });
  }
  S(e, c), he();
}
const Fv = Zi(Qc),
  Mv = [
    () => st(() => Promise.resolve().then(() => ad), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => od), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => su), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Gu), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Du), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Zu), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => mf), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Sf), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Rf), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Pf), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => zf), void 0, import.meta.url),
    () => st(() => Promise.resolve().then(() => Av), void 0, import.meta.url),
  ],
  $v = [],
  Vv = {
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
  Zc = {
    handleError: ({ error: e }) => {
      console.error(e);
    },
    reroute: () => {},
    transport: {},
  },
  ed = Object.fromEntries(
    Object.entries(Zc.transport).map(([e, t]) => [e, t.decode]),
  ),
  Hv = !1,
  qv = (e, t) => ed[e](t);
function td(e, t) {
  var a = fe(),
    r = K(a);
  $i(r, () => t.children), S(e, a);
}
const ad = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: td },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
ti();
const rd = {
  get data() {
    return ke.data;
  },
  get error() {
    return ke.error;
  },
  get form() {
    return ke.form;
  },
  get params() {
    return ke.params;
  },
  get route() {
    return ke.route;
  },
  get state() {
    return ke.state;
  },
  get status() {
    return ke.status;
  },
  get url() {
    return ke.url;
  },
};
Bt.updated.check;
const en = rd;
var nd = P("<h1> </h1> <p> </p>", 1);
function sd(e, t) {
  pe(t, !1), Ee();
  var a = nd(),
    r = K(a),
    n = p(r, !0);
  f(r);
  var s = m(r, 2),
    o = p(s, !0);
  f(s),
    W(() => {
      Y(n, en.status), Y(o, en.error?.message);
    }),
    S(e, a),
    he();
}
const od = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: sd },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var ld = P(
  '<div class="spinner-container svelte-1f0ob0u"><div class="local-spinner svelte-1f0ob0u"></div></div>',
);
function bs(e) {
  var t = ld();
  S(e, t);
}
const id = (e) => e;
function bl(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function Ds(e) {
  const t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function lr(e, { delay: t = 0, duration: a = 400, easing: r = id } = {}) {
  const n = +getComputedStyle(e).opacity;
  return { delay: t, duration: a, easing: r, css: (s) => `opacity: ${s * n}` };
}
function cd(
  e,
  {
    delay: t = 0,
    duration: a = 400,
    easing: r = bl,
    x: n = 0,
    y: s = 0,
    opacity: o = 0,
  } = {},
) {
  const l = getComputedStyle(e),
    d = +l.opacity,
    c = l.transform === "none" ? "" : l.transform,
    v = d * (1 - o),
    [g, u] = Ds(n),
    [h, y] = Ds(s);
  return {
    delay: t,
    duration: a,
    easing: r,
    css: (b, _) => `
			transform: ${c} translate(${(1 - b) * g}${u}, ${(1 - b) * h}${y});
			opacity: ${d - v * _}`,
  };
}
function zs(
  e,
  {
    delay: t = 0,
    duration: a = 400,
    easing: r = bl,
    start: n = 0,
    opacity: s = 0,
  } = {},
) {
  const o = getComputedStyle(e),
    l = +o.opacity,
    d = o.transform === "none" ? "" : o.transform,
    c = 1 - n,
    v = l * (1 - s);
  return {
    delay: t,
    duration: a,
    easing: r,
    css: (g, u) => `
			transform: ${d} scale(${1 - c * u});
			opacity: ${l - v * u}
		`,
  };
}
const dd = BigInt(60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14),
  ud = 576,
  fd = 625,
  Cn = () =>
    Gl.create({
      idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
    }),
  vd = ({ width: e, height: t }) => {
    if (As(window) || As(window.top)) return;
    const {
        top: { innerWidth: a, innerHeight: r },
      } = window,
      n = r / 2 + screenY - t / 2,
      s = a / 2 + screenX - e / 2;
    return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${e}, height=${t}, top=${n}, left=${s}`;
  };
let Rt;
const pd = "https://golfpad.xyz",
  hd = "https://gw4gh-taaaa-aaaal-qjfia-cai.icp0.io",
  gd = () => (typeof window > "u" ? !1 : window.location.origin === pd),
  md = () => {
    const { subscribe: e, set: t, update: a } = Je({ identity: void 0 });
    return {
      subscribe: e,
      sync: async () => {
        Rt = Rt ?? (await Cn());
        const r = await Rt.isAuthenticated();
        t({ identity: r ? Rt.getIdentity() : null });
      },
      signIn: ({ domain: r }) =>
        new Promise(async (n, s) => {
          Rt = Rt ?? (await Cn());
          const o = r;
          await Rt?.login({
            maxTimeToLive: dd,
            onSuccess: () => {
              a((l) => ({ ...l, identity: Rt?.getIdentity() })), n();
            },
            onError: s,
            identityProvider: o,
            ...(gd() && { derivationOrigin: hd }),
            windowOpenerFeatures: vd({ width: ud, height: fd }),
          });
        }),
      signOut: async () => {
        await (Rt ?? (await Cn())).logout(),
          (Rt = null),
          a((n) => ({ ...n, identity: null })),
          localStorage.removeItem("user_profile_data");
      },
    };
  },
  qe = md(),
  bd = Je(void 0);
function Ks(e) {
  const t = Array.from(e)
    .map((a) => String.fromCharCode(a))
    .join("");
  return btoa(t);
}
function yd(e) {
  const [t, a] = e.split("T"),
    r = t.split("-");
  if (r.length !== 3)
    throw new Error("Invalid date format. Expected YYYY-MM-DD");
  const n = parseInt(r[0], 10),
    s = parseInt(r[1], 10) - 1,
    o = parseInt(r[2], 10);
  let l = 0,
    d = 0,
    c = 0;
  if (a) {
    const u = a.split(":");
    (l = parseInt(u[0], 10)),
      (d = parseInt(u[1], 10)),
      u.length === 3 && (c = parseInt(u[2], 10));
  }
  const g = new Date(n, s, o, l, d, c).getTime();
  return BigInt(g) * BigInt(1e6);
}
function ht(e) {
  return e && e.err !== void 0;
}
const pa = ({ IDL: e }) => {
    const t = e.Text,
      a = e.Record({ principalId: t, requestedBy: t }),
      r = e.Variant({
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
      n = e.Variant({ ok: e.Null, err: r }),
      s = e.Nat,
      o = e.Record({ gameId: s, acceptedById: t }),
      l = e.Nat8,
      d = e.Record({
        golfer2MulliganUsed: e.Bool,
        winner: t,
        golfer1MulliganUsed: e.Bool,
        holeNumber: l,
      }),
      c = e.Variant({ MulligansScores: d }),
      v = e.Record({ submittedById: t, gameId: s, detail: c }),
      g = e.Text,
      u = e.Record({ principalId: g }),
      h = e.Record({ gameId: s }),
      y = e.Nat8,
      b = e.Variant({
        Mulligans: e.Null,
        BuildIt: e.Null,
        Bands: e.Null,
        NextUp: e.Null,
        Prophet: e.Null,
      }),
      _ = e.Nat,
      A = e.Record({
        par: e.Nat8,
        name: e.Text,
        yardage: e.Nat,
        colour: e.Text,
        strokeIndex: e.Nat8,
      }),
      k = e.Text,
      E = e.Nat,
      x = e.Record({
        name: e.Text,
        tees: e.Vec(A),
        number: e.Nat8,
        images: e.Vec(e.Tuple(k, E)),
      }),
      w = e.Record({
        added: e.Int,
        holes: e.Vec(x),
        name: e.Text,
        colour: e.Text,
        strokeIndex: e.Nat8,
      }),
      R = e.Record({
        name: e.Text,
        inviteIds: e.Vec(t),
        createdById: t,
        teeOffTime: e.Int,
        courseVersion: y,
        gameType: b,
        courseId: _,
        teeGroup: w,
      }),
      N = e.Variant({ ok: s, err: r }),
      T = e.Record({ name: e.Text, createdById: t }),
      O = e.Int16,
      G = e.Record({
        username: e.Text,
        profilePictureExtension: e.Opt(e.Text),
        profilePicture: e.Opt(e.Vec(e.Nat8)),
        handicap: e.Opt(O),
      }),
      M = e.Record({ gameId: s }),
      B = e.Nat,
      V = e.Record({ channelId: B }),
      j = e.Record({ holes: e.Vec(x), name: e.Text, initialTeeGroup: w }),
      $ = e.Record({ name: e.Text, updatedTeeGroup: e.Opt(w), courseId: _ }),
      H = e.Record({ version: e.Text, onHold: e.Bool }),
      q = e.Variant({ ok: H, err: r }),
      Q = e.Record({ gameId: s }),
      L = e.Variant({ Unplayed: e.Null, Active: e.Null, Complete: e.Null }),
      oe = e.Record({
        golfer2MulliganUsed: e.Bool,
        winner: t,
        golfer1MulliganUsed: e.Bool,
        holeNumber: l,
      }),
      D = e.Record({
        winner: t,
        results: e.Vec(oe),
        golfer2HolesWonCount: e.Nat8,
        golfer1HolesWonCount: e.Nat8,
      }),
      re = e.Variant({ MulligansScores: D }),
      ue = e.Record({}),
      _e = e.Record({
        wontHitTreeOrBunkerStartHole: l,
        underParStartHole: l,
        golferId: t,
        wontDoubleBogeyStartHole: l,
        singlePutt2Of3GreensStartHole: l,
        wontBogeyStartHole: l,
        parOrUnderStartHole: l,
        hit2Of3FairwaysStartHole: l,
        hit2Of3GreensStartHole: l,
        wontLoseBallStartHole: l,
      }),
      ne = e.Variant({
        Mulligans: ue,
        BuildIt: e.Record({}),
        Bands: _e,
        NextUp: e.Record({}),
      }),
      te = e.Record({ courseVersion: y, courseId: _, teeGroup: w }),
      we = e.Variant({
        Par: e.Null,
        Scrub: e.Null,
        DoubleBogey: e.Null,
        Birdie: e.Null,
        BallNotLost: e.Null,
        Bogey: e.Null,
        HitFairway: e.Null,
        Albatross: e.Null,
        HitBunker: e.Null,
        HitTree: e.Null,
        HitGreen: e.Null,
        TakeMulligan: e.Null,
        HitWater: e.Null,
        LongestDrive: e.Null,
        Eagle: e.Null,
        OnePuttGreen: e.Null,
      }),
      z = e.Record({ golferId: t, hole: l, event: we }),
      ge = e.Record({
        id: s,
        playerIds: e.Vec(t),
        status: L,
        scoreDetail: e.Opt(re),
        invites: e.Vec(t),
        predictions: e.Vec(ne),
        winner: t,
        teeOffTime: e.Int,
        courseSnapshot: te,
        events: e.Vec(z),
        gameType: b,
        courseId: _,
      }),
      Ge = e.Variant({ ok: ge, err: r }),
      Ie = e.Record({ golfChannelId: B }),
      je = e.Record({}),
      Ye = e.Variant({ ok: je, err: r }),
      $e = e.Record({}),
      le = e.Record({}),
      me = e.Variant({ ok: le, err: r }),
      Ae = e.Record({ page: e.Nat }),
      Ce = e.Record({}),
      Ue = e.Variant({ ok: Ce, err: r }),
      at = e.Record({ golfCourseId: _ }),
      De = e.Record({
        activeVersion: y,
        name: e.Text,
        tees: e.Vec(w),
        courseId: _,
      }),
      yt = e.Variant({ ok: De, err: r }),
      _t = e.Record({ offset: e.Nat, limit: e.Nat, searchTerm: e.Text }),
      it = e.Record({ entries: e.Vec(De) }),
      Lt = e.Variant({ ok: it, err: r }),
      be = e.Record({ principalId: t }),
      Be = e.Record({
        username: e.Text,
        golferPicture: e.Opt(e.Vec(e.Nat8)),
        handicap: e.Opt(O),
        golferPictureExtension: e.Text,
        principalId: t,
      }),
      Qe = e.Variant({ ok: Be, err: r }),
      ze = e.Record({ principalId: g }),
      wt = e.Record({}),
      ba = e.Variant({ ok: wt, err: r }),
      hn = e.Record({ gameId: s, invitedGolferIds: e.Vec(t) }),
      wr = e.Record({ username: e.Text, principalId: t }),
      gn = e.Bool,
      Ua = e.Variant({ ok: gn, err: r }),
      Fa = e.Record({
        totalEntries: e.Nat,
        offset: e.Nat,
        limit: e.Nat,
        principalId: t,
      }),
      xr = e.Record({ requestTime: e.Int, principalId: t }),
      mn = e.Record({ friendRequests: e.Vec(xr) }),
      bn = e.Variant({ ok: mn, err: r }),
      xe = e.Record({
        totalEntries: e.Nat,
        offset: e.Nat,
        limit: e.Nat,
        principalId: t,
      }),
      Fe = e.Record({ principalId: t }),
      rt = e.Record({ friendRequests: e.Vec(Fe) }),
      xt = e.Variant({ ok: rt, err: r }),
      Ct = e.Record({
        totalEntries: e.Nat,
        offset: e.Nat,
        limit: e.Nat,
        searchTerm: e.Text,
      }),
      Gt = e.Record({
        golferPrincipalId: t,
        golferPicture: e.Opt(e.Vec(e.Nat8)),
        golferName: e.Text,
        handicap: e.Opt(O),
        golferPictureExtension: e.Text,
      }),
      It = e.Record({ golfers: e.Vec(Gt) }),
      Pe = e.Variant({ ok: It, err: r }),
      jt = e.Record({ principalId: g }),
      Xt = e.Record({}),
      Ke = e.Variant({ ok: Xt, err: r }),
      Ma = e.Record({ principalId: t, requestedBy: t }),
      kr = e.Record({ rejectedById: t, gameId: s }),
      $a = e.Record({ channelId: B }),
      Va = e.Record({ requestedFriend: t, principalId: t }),
      Er = e.Record({ channelId: B, principalId: t }),
      Ar = e.Record({ channelId: B, principalId: t }),
      Ha = e.Record({ principalId: t, firstName: e.Text }),
      Sr = e.Record({ gameId: s }),
      oa = e.Record({
        channelId: B,
        name: e.Text,
        channelBanner: e.Opt(e.Vec(e.Nat8)),
        channelBannerExtension: e.Text,
        channelImageExtension: e.Text,
        channelImage: e.Opt(e.Vec(e.Nat8)),
      }),
      kl = e.Record({ channelId: B }),
      El = e.Record({ handicap: e.Opt(O), principalId: t }),
      Al = e.Record({ homeCourseId: e.Opt(_), principalId: t }),
      Sl = e.Record({ lastName: e.Text, principalId: t }),
      Tl = e.Record({
        profilePictureExtension: e.Text,
        profilePicture: e.Opt(e.Vec(e.Nat8)),
        principalId: t,
      }),
      Cl = e.Record({ username: e.Text, principalId: t }),
      Rl = e.Record({ channelId: B }),
      ws = e.Variant({ Ok: e.Text, Err: e.Text });
    return e.Service({
      acceptFriendRequest: e.Func([a], [n], []),
      acceptGameInvite: e.Func([o], [n], []),
      addGameScore: e.Func([v], [n], []),
      addShot: e.Func([u], [n], []),
      beginGame: e.Func([h], [n], []),
      createGame: e.Func([R], [N], []),
      createGolfChannel: e.Func([T], [n], []),
      createUser: e.Func([G], [n], []),
      deleteGame: e.Func([M], [n], []),
      deleteGolfChannel: e.Func([V], [n], []),
      executeAddGolfCourse: e.Func([j], [], []),
      executeUpdateGolfCourse: e.Func([$], [], []),
      getAppStatus: e.Func([], [q], ["query"]),
      getGame: e.Func([Q], [Ge], []),
      getGolfChannel: e.Func([Ie], [Ye], []),
      getGolfChannelVideo: e.Func([$e], [me], []),
      getGolfChannelVideos: e.Func([Ae], [Ue], []),
      getGolfCourse: e.Func([at], [yt], []),
      getGolfCourses: e.Func([_t], [Lt], []),
      getProfile: e.Func([be], [Qe], []),
      getShot: e.Func([ze], [ba], []),
      inviteGolfers: e.Func([hn], [n], []),
      isUsernameAvailable: e.Func([wr], [Ua], ["query"]),
      listFriendRequests: e.Func([Fa], [bn], []),
      listFriends: e.Func([xe], [xt], []),
      listGolfers: e.Func([Ct], [Pe], []),
      predictShot: e.Func([jt], [Ke], []),
      rejectFriendRequest: e.Func([Ma], [n], []),
      rejectGameInvite: e.Func([kr], [n], []),
      removeGolfChannelVideo: e.Func([$a], [n], []),
      sendFriendRequest: e.Func([Va], [n], []),
      subscribeToGolfChannel: e.Func([Er], [n], []),
      unsubscribeFromGolfChannel: e.Func([Ar], [n], []),
      updateFirstName: e.Func([Ha], [n], []),
      updateGame: e.Func([Sr], [n], []),
      updateGolfChannel: e.Func([oa], [n], []),
      updateGolfChannelVideo: e.Func([kl], [n], []),
      updateHandicap: e.Func([El], [n], []),
      updateHomeCourse: e.Func([Al], [n], []),
      updateLastName: e.Func([Sl], [n], []),
      updateProfilePicture: e.Func([Tl], [n], []),
      updateUsername: e.Func([Cl], [n], []),
      uploadGolfChannelVideo: e.Func([Rl], [n], []),
      validateAddGolfCourse: e.Func([j], [ws], ["query"]),
      validateUpdateGolfCourse: e.Func([$], [ws], ["query"]),
    });
  },
  _d = "elbip-aiaaa-aaaal-qjfhq-cai",
  wd = (e, t = {}) => {
    const a = t.agent || new Nn({ ...t.agentOptions });
    return (
      t.agent &&
        t.agentOptions &&
        console.warn(
          "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.",
        ),
      oo.createActor(pa, { agent: a, canisterId: e, ...t.actorOptions })
    );
  };
wd(_d);
class et {
  static createActor(t, a = "", r = null, n = null) {
    const s = { host: `https://${a}.icp-api.io`, identity: r };
    n
      ? n.agentOptions
        ? (n.agentOptions.host = s.host)
        : (n.agentOptions = s)
      : (n = { agentOptions: s });
    const o = new Nn({ ...n.agentOptions });
    return oo.createActor(t, { agent: o, canisterId: a, ...n?.actorOptions });
  }
  static getAgent(t = "", a = null, r = null) {
    const n = { host: `https://${t}.icp-api.io`, identity: a };
    return (
      r
        ? r.agentOptions
          ? (r.agentOptions.host = n.host)
          : (r.agentOptions = n)
        : (r = { agentOptions: n }),
      new Nn({ ...r.agentOptions })
    );
  }
  static createIdentityActor(t, a) {
    let r;
    return new Promise((n, s) => {
      r = t.subscribe((o) => {
        o.identity && n(o.identity);
      });
    }).then((n) => (r(), et.createActor(pa, a, n)));
  }
  static createGovernanceAgent(t, a) {
    let r;
    return new Promise((n, s) => {
      r = t.subscribe((o) => {
        o.identity && n(o.identity);
      });
    }).then((n) => (r(), et.createActor(pa, a, n)));
  }
}
var Ls = {
  BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai",
  FRONTEND_CANISTER_ID: "gw4gh-taaaa-aaaal-qjfia-cai",
  DFX_NETWORK: "ic",
};
class la {
  constructor() {
    qe.sync();
  }
  async createUser(t) {
    try {
      return await (
        await et.createIdentityActor(qe, Ls.BACKEND_CANISTER_ID ?? "")
      ).createUser(t);
    } catch (a) {
      throw (console.error("Error creating user:", a), a);
    }
  }
  async updateUsername(t) {}
  async updateHandicap(t) {}
  async updateFirstName(t) {}
  async updateLastName(t) {}
  async updateHomeCourse(t) {}
  async updateProfilePicture(t) {}
  async isAdmin() {
    const a = await (
      await et.createIdentityActor(qe, Ls.BACKEND_CANISTER_ID)
    ).isAdmin();
    if (ht(a)) throw new Error("Failed to check is admin");
    return a.ok;
  }
}
var Pr = {
  BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai",
  FRONTEND_CANISTER_ID: "gw4gh-taaaa-aaaal-qjfia-cai",
  DFX_NETWORK: "ic",
};
function xd() {
  const { subscribe: e, set: t } = Je(null);
  async function a() {
    let b = localStorage.getItem("user_profile_data");
    if (b) {
      const _ = JSON.parse(b);
      t(_);
      return;
    }
    try {
      await h();
    } catch (_) {
      throw (console.error("Error fetching user profile:", _), _);
    }
  }
  async function r() {
    return new la().isAdmin();
  }
  async function n(b) {
    return new la().createUser(b);
  }
  async function s(b) {
    return new la().updateUsername(b);
  }
  async function o(b) {
    return new la().updateHandicap(b);
  }
  async function l(b) {
    return new la().updateFirstName(b);
  }
  async function d(b) {
    return new la().updateLastName(b);
  }
  async function c(b) {
    return new la().updateHomeCourse(b);
  }
  async function v(b) {
    try {
      const A = g(b);
      if (b.size > 1e3 * 1024) return null;
      const k = new FileReader();
      k.readAsArrayBuffer(b),
        (k.onloadend = async () => {
          const E = k.result,
            x = new Uint8Array(E);
          try {
            const w = await et.createIdentityActor(
              qe,
              Pr.BACKEND_CANISTER_ID ?? "",
            );
            let R = {
              principalId: "",
              profilePicture: [x],
              profilePictureExtension: A,
            };
            const N = await w.updateUserPicture(R);
            if (ht(N)) {
              console.error("Error updating profile picture");
              return;
            }
            return await h(), N;
          } catch (w) {
            console.error(w);
          }
        });
    } catch (_) {
      throw (console.error("Error updating profile picture:", _), _);
    }
  }
  function g(b) {
    const _ = b.name,
      A = _.lastIndexOf(".");
    return A !== -1 ? _.substring(A + 1) : "";
  }
  async function u(b) {
    try {
      return await (
        await et.createIdentityActor(qe, Pr.BACKEND_CANISTER_ID ?? "")
      ).isUsernameTaken(b);
    } catch (_) {
      throw (console.error("Error getting user:", _), _);
    }
  }
  async function h() {
    const b = await et.createIdentityActor(qe, Pr.BACKEND_CANISTER_ID);
    qe.subscribe(async (_) => {
      let A = _.identity?.getPrincipal().toString();
      if (!A) return;
      let k = { principalId: A },
        E = await b.getProfile(k);
      if (ht(E)) {
        console.error("Error fetching user profile");
        return;
      }
      let w = E.ok;
      t(w);
    });
  }
  async function y(b) {
    const _ = await et.createIdentityActor(qe, Pr.BACKEND_CANISTER_ID);
    let A = { principalId: b },
      k = await _.getProfile(A);
    return ht(k) ? (console.error("Error fetching user profile"), null) : k.ok;
  }
  return {
    subscribe: e,
    sync: a,
    getProfile: y,
    createUser: n,
    updateUsername: s,
    updateHandicap: o,
    updateFirstName: l,
    updateLastName: d,
    updateHomeCourse: c,
    cacheProfile: h,
    updateProfilePicture: v,
    isUsernameAvailable: u,
    isAdmin: r,
  };
}
const Qt = xd();
var kd = P('<div class="local-spinner svelte-pvdm52"></div>');
function Xs(e) {
  var t = kd();
  S(e, t);
}
var Ed = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class Js {
  constructor() {}
  async getAppStatus() {
    const a = await (
      await et.createActor(pa, Ed.BACKEND_CANISTER_ID)
    ).getAppStatus();
    if (ht(a)) throw new Error("Failed to get app status");
    return a.ok;
  }
}
function Ad() {
  const { subscribe: e, update: t } = Je([]);
  let a = 0;
  function r(s) {
    t((o) => [...o, { ...s, id: ++a }]);
  }
  function n(s) {
    t((o) => o.filter((l) => l.id !== s));
  }
  return { subscribe: e, addToast: r, removeToast: n };
}
const Ca = Ad(),
  { addToast: Wv } = Ca;
function Sd() {
  async function e() {
    const a = await new Js().getAppStatus();
    if (ht(a)) throw new Error("Error fetching app status");
    let r = a;
    if (!localStorage.getItem("version")) {
      localStorage.setItem("version", r.version);
      return;
    }
    r.version !== localStorage.getItem("version") &&
      Ca.addToast({
        message: `ICFC V${r.version} is now available. Click here to reload:`,
        type: "frontend-update",
      });
  }
  async function t() {
    const a = await new Js().getAppStatus();
    if (ht(a)) throw new Error("Error fetching app status");
    let r = a;
    localStorage.setItem("version", r.version),
      window.location.replace(`${window.location.pathname}?v=${r.version}`);
  }
  return { checkServerVersion: e, updateFrontend: t };
}
const yl = Sd(),
  Td = async () => Cd(),
  Cd = async () => {
    await qe.signOut(), window.location.reload();
  },
  Rd = async () => {
    const e = await st(
        () => Promise.resolve().then(() => Tv),
        void 0,
        import.meta.url,
      ),
      t = new e.default();
    return (
      (t.onmessage = async ({ data: a }) => {
        const { msg: r, data: n } = a;
        switch (r) {
          case "signOutIdleTimer":
            await Td();
            return;
          case "delegationRemainingTime":
            bd.set(n?.authRemainingTime);
            return;
        }
      }),
      {
        syncAuthIdle: (a) => {
          if (!a.identity) {
            t.postMessage({ msg: "stopIdleTimer" });
            return;
          }
          t.postMessage({ msg: "startIdleTimer" });
        },
      }
    );
  };
var Nd = P('<button class="brand-button">Update Website</button>'),
  Pd = P(
    '<div><span> </span> <!> <button class="font-bold ml-4">&times;</button></div>',
  );
function Od(e, t) {
  pe(t, !1);
  let a = J(t, "toast", 8);
  tt(() => {
    a().duration && a().duration > 0 && setTimeout(r, a().duration);
  });
  function r() {
    Ca.removeToast(a().id);
  }
  function n() {
    yl.updateFrontend();
  }
  Ee();
  var s = Pd(),
    o = p(s),
    l = p(o, !0);
  f(o);
  var d = m(o, 2);
  {
    var c = (g) => {
      var u = Nd();
      I("click", u, n), S(g, u);
    };
    F(d, (g) => {
      a().type == "frontend-update" && g(c);
    });
  }
  var v = m(d, 2);
  f(s),
    W(() => {
      ce(
        s,
        1,
        `fixed top-0 left-0 right-0 z-[9999] p-4 text-white shadow-md flex justify-between items-center bg-${a().type}`,
      ),
        Y(l, a().message);
    }),
    I("click", v, r),
    S(e, s),
    he();
}
var Bd = P("<div><!></div>");
function Gd(e) {
  const [t, a] = sa(),
    r = () => At(Ca, "$toasts", t);
  var n = fe(),
    s = K(n);
  Te(
    s,
    1,
    r,
    (o) => o.id,
    (o, l) => {
      var d = Bd(),
        c = p(d);
      Od(c, {
        get toast() {
          return i(l);
        },
      }),
        f(d),
        ea(
          1,
          d,
          () => cd,
          () => ({ y: 20, duration: 200 }),
        ),
        S(o, d);
    },
  ),
    S(e, n),
    a();
}
const Id = () => {
    const e = Bt;
    return {
      page: { subscribe: e.page.subscribe },
      navigating: { subscribe: e.navigating.subscribe },
      updated: e.updated,
    };
  },
  ys = {
    subscribe(e) {
      return Id().page.subscribe(e);
    },
  },
  jd = "nn75s-ayupf-j6mj3-kluyb-wjj7y-eang2-dwzzr-cfdxk-etbw7-cgwnb-lqe",
  Ud = ss(qe, ({ identity: e }) => e != null);
ss(qe, ({ identity: e }) => e != null && e.getPrincipal().toString() === jd);
var Fd = P(
    '<div class="nav-item expanded svelte-htsp64"><button> </button></div>',
  ),
  Md = P(
    '<div class="nav-item expanded svelte-htsp64"><a class="brand-button" href="/profile">Profile</a> <button class="px-12 py-3 text-lg font-semibold shadow-lg bg-GolfPadForest text-GolfPadYellow">SIGN OUT</button></div>',
  ),
  $d = P(
    '<div class="flex min-h-screen flex-col relative nav-overlay svelte-htsp64"><div class="absolute top-4 left-4 z-10"><button class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md">-</button></div> <div class="absolute top-4 right-4 z-10"><button><span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span></button></div> <div class="nav-content flex flex-col items-start pl-10 svelte-htsp64"><!> <!></div> <div class="flex justify-between items-center p-5 text-xs lg:text-base"><div class="social-links svelte-htsp64"><a href="https://twitter.com" target="_blank" class="svelte-htsp64">TWITTER</a> <a href="https://oc.app" target="_blank" class="svelte-htsp64">OPENCHAT</a> <a href="https://youtube.com" target="_blank" class="svelte-htsp64">YOUTUBE</a></div> <div><img src="placeholder.png" alt="Profile" class="w-12 h-12 rounded-full"></div></div></div>',
  );
function Vd(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    n = () => At(ys, "$page", a),
    s = () => At(v, "$navItems", a),
    o = () => At(Ud, "$authSignedInStore", a);
  let l = J(t, "expanded", 8, !1),
    d = J(t, "selectedRoute", 12, "home"),
    c = J(t, "toggleNav", 8);
  const v = Je([
    { name: "HOME", route: "home" },
    { name: "WHITEPAPER", route: "whitepaper" },
    { name: "GAME RULES", route: "game-rules" },
  ]);
  function g(k) {
    if ((d(k), c()(), k === "home")) {
      Aa("/");
      return;
    }
    Aa(`/${k}`);
  }
  function u() {
    c()();
  }
  function h() {
    c()(), Aa("/");
  }
  function y() {
    qe.signOut();
  }
  Et(
    () => n(),
    () => {
      switch (n().url.pathname) {
        case "/":
          d("home");
          break;
        case "/whitepaper":
          d("whitepaper");
          break;
        case "/game-rules":
          d("game-rules");
          break;
        case "/games":
          d("games");
          break;
        case "/governance":
          d("governance");
          break;
        default:
          d("home");
          break;
      }
    },
  ),
    Ba(),
    Ee();
  var b = fe(),
    _ = K(b);
  {
    var A = (k) => {
      var E = $d(),
        x = p(E),
        w = p(x);
      f(x);
      var R = m(x, 2),
        N = p(R);
      f(R);
      var T = m(R, 2),
        O = p(T);
      Te(
        O,
        1,
        s,
        (B) => B.route,
        (B, V) => {
          var j = Fd(),
            $ = p(j),
            H = p($, !0);
          f($),
            f(j),
            W(() => {
              ce(
                $,
                1,
                `text-3xl lg:text-6xl font-bold condensed ${(d() === i(V).route ? "text-white" : "text-black") ?? ""}`,
              ),
                Y(H, i(V).name);
            }),
            I("click", $, () => g(i(V).route)),
            S(B, j);
        },
      );
      var G = m(O, 2);
      {
        var M = (B) => {
          var V = Md(),
            j = m(p(V), 2);
          f(V), I("click", j, y), S(B, V);
        };
        F(G, (B) => {
          o() && B(M);
        });
      }
      f(T),
        ye(2),
        f(E),
        I("click", w, u),
        I("click", N, h),
        ea(
          1,
          E,
          () => lr,
          () => ({ duration: 300 }),
        ),
        ea(
          2,
          E,
          () => lr,
          () => ({ duration: 300 }),
        ),
        S(k, E);
    };
    F(_, (k) => {
      l() && k(A);
    });
  }
  S(e, b), he(), r();
}
var Hd = P(
  '<div class="z-10 px-4 mb-20 text-center"><h1 class="mb-1 font-bold text-BrandForest">WELCOME TO <span class="condensed">GOLFPAD</span></h1> <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">THE FUTURE OF GOLF STARTS HERE</h2> <button class="brand-button">CONNECT</button></div> <div class="absolute bottom-0 left-0 z-0 w-full"><img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden"> <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex"></div>',
  1,
);
function qd(e, t) {
  pe(t, !1);
  function a() {
    let o = { domain: void 0 };
    qe.signIn(o);
  }
  Ee();
  var r = Hd(),
    n = K(r),
    s = m(p(n), 4);
  f(n), ye(2), I("click", s, a), S(e, r), he();
}
var Wd = P(
  '<div class="flex-none h-[80px] relative"><div class="absolute z-10 top-4 left-4"><button class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md">+</button></div> <div class="absolute z-10 top-4 right-4"><a href="/"><span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span></a></div></div>',
);
function Yd(e, t) {
  let a = J(t, "toggleNav", 8);
  var r = Wd(),
    n = p(r),
    s = p(n);
  f(n),
    ye(2),
    f(r),
    I("click", s, function (...o) {
      a()?.apply(this, o);
    }),
    S(e, r);
}
var Dd = P(
  '<div class="p-4 bg-gray-50 rounded-lg shadow-inner"><pre class="text-sm text-gray-700 whitespace-pre-wrap"></pre></div>',
);
function zd(e) {
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
  var a = Dd(),
    r = p(a);
  (r.textContent = t), f(a), S(e, a);
}
var Kd = P('<div class="mt-4"><!></div>'),
  Ld = P(
    '<div class="space-y-4"><input id="username" placeholder="Enter your username" type="text" class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest"> <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label> <input id="handicap" placeholder="Enter your handicap" type="number" class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" min="0" max="54"> <div class="flex items-center"><input type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded"> <label class="ml-2 block text-sm text-white">I agree to the <button type="button" class="text-indigo-600 hover:text-indigo-500">terms and conditions</button></label></div> <!> <button class="brand-button">Create Profile</button></div>',
  ),
  Xd = P(
    '<div class="p-4 bg-BrandDarkGreen m-4 rounded-lg shadow-md"><h2 class="text-xl font-bold my-4">Create Your Profile</h2> <!></div>',
  );
function Jd(e, t) {
  pe(t, !1);
  let a = U(!1),
    r = U(!1),
    n = U(""),
    s = U(void 0),
    o = U(!1);
  function l() {
    C(r, !i(r));
  }
  async function d() {
    try {
      C(o, !0);
      let h = [];
      i(s) != null ? (h = [i(s)]) : (h = []);
      let y = {
        username: i(n),
        profilePictureExtension: [""],
        profilePicture: [],
        handicap: h,
      };
      await Qt.createUser(y),
        Ca.addToast({ type: "success", message: "Profile created." });
    } catch {
      Ca.addToast({ type: "error", message: "Error creating profile." });
    } finally {
      C(o, !1);
    }
  }
  Ee();
  var c = Xd(),
    v = m(p(c), 2);
  {
    var g = (h) => {
        bs(h);
      },
      u = (h) => {
        var y = Ld(),
          b = p(y);
        Re(b);
        var _ = m(b, 4);
        Re(_);
        var A = m(_, 2),
          k = p(A);
        Re(k);
        var E = m(k, 2),
          x = m(p(E));
        f(E), f(A);
        var w = m(A, 2);
        {
          var R = (T) => {
            var O = Kd(),
              G = p(O);
            zd(G), f(O), S(T, O);
          };
          F(w, (T) => {
            i(r) && T(R);
          });
        }
        var N = m(w, 2);
        f(y),
          W(() => (N.disabled = !i(a))),
          Oe(
            b,
            () => i(n),
            (T) => C(n, T),
          ),
          Oe(
            _,
            () => i(s),
            (T) => C(s, T),
          ),
          zi(
            k,
            () => i(a),
            (T) => C(a, T),
          ),
          I("click", x, l),
          I("click", N, d),
          S(h, y);
      };
    F(v, (h) => {
      i(o) ? h(g) : h(u, !1);
    });
  }
  f(c), S(e, c), he();
}
var Qd = P('<div class="bg-white text-black flex-1 flex"><!></div>'),
  Zd = P('<div class="bg-white text-black flex-1 flex"><!></div>'),
  eu = P("<!> <!> <!> <!>", 1),
  tu = P('<div class="flex flex-col min-h-screen default-text"><!></div>'),
  au = P("<div><!></div>");
function Kt(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    n = () => At(qe, "$authStore", a),
    s = U();
  let o = U(),
    l = U(!0),
    d = U(!1),
    c = "home",
    v = U(!1),
    g = U(null);
  const u = async () => {
    await Promise.all([y()]), C(o, await Rd()), await Promise.all([h()]);
  };
  async function h() {
    let k = n().identity?.getPrincipal().toString();
    k && C(g, await Qt.getProfile(k));
  }
  async function y() {
    try {
      await qe.sync(), C(d, n().identity !== null && n().identity !== void 0);
    } catch (k) {
      console.error(k);
    }
  }
  tt(async () => {
    try {
      await yl.checkServerVersion();
    } catch {
      console.error("error syncing version");
    } finally {
      C(l, !1);
    }
  });
  function b() {
    C(v, !i(v));
  }
  Et(
    () => en,
    () => {
      C(s, en.url.pathname === "/whitepaper");
    },
  ),
    Et(
      () => (i(o), n()),
      () => {
        i(o), n(), i(o)?.syncAuthIdle(n());
      },
    ),
    Et(
      () => n(),
      () => {
        (() => {
          if (n() === void 0) return;
          document.querySelector("body > #app-spinner")?.remove();
        })();
      },
    ),
    Ba(),
    Ee();
  var _ = fe();
  I("storage", On, y);
  var A = K(_);
  ji(
    A,
    u,
    (k) => {
      var E = au(),
        x = p(E);
      Xs(x), f(E), ea(1, E, () => lr), S(k, E);
    },
    (k, E) => {
      var x = tu(),
        w = p(x);
      {
        var R = (T) => {
            Xs(T);
          },
          N = (T) => {
            var O = eu(),
              G = K(O);
            Yd(G, { toggleNav: b });
            var M = m(G, 2);
            {
              var B = (H) => {
                  var q = Qd(),
                    Q = p(q);
                  Un(Q, t, "default", {}), f(q), S(H, q);
                },
                V = (H) => {
                  var q = fe(),
                    Q = K(q);
                  {
                    var L = (D) => {
                        var re = fe(),
                          ue = K(re);
                        {
                          var _e = (te) => {
                              var we = Zd(),
                                z = p(we);
                              Un(z, t, "default", {}), f(we), S(te, we);
                            },
                            ne = (te) => {
                              Jd(te, {});
                            };
                          F(ue, (te) => {
                            i(g) ? te(_e) : te(ne, !1);
                          });
                        }
                        S(D, re);
                      },
                      oe = (D) => {
                        qd(D, {});
                      };
                    F(Q, (D) => {
                      i(d) ? D(L) : D(oe, !1);
                    });
                  }
                  S(H, q);
                };
              F(M, (H) => {
                i(s) ? H(B) : H(V, !1);
              });
            }
            var j = m(M, 2);
            Vd(j, {
              get expanded() {
                return i(v);
              },
              selectedRoute: c,
              toggleNav: b,
            });
            var $ = m(j, 2);
            Gd($), S(T, O);
          };
        F(w, (T) => {
          i(l) ? T(R) : T(N, !1);
        });
      }
      f(x), S(k, x);
    },
  ),
    S(e, _),
    he(),
    r();
}
var ru = P(
  '<div class="flex flex-col md:flex-row"><div class="w-full md:w-2/3"><!></div> <div class="w-full md:w-1/3 flex flex-col"><a class="brand-button w-full" href="/whitepaper"><button class="w-full">Whitepaper</button></a> <div class="w-full"></div></div></div>',
);
function nu(e) {
  Kt(e, {
    children: (t, a) => {
      var r = ru(),
        n = p(r),
        s = p(n);
      {
        var o = (l) => {
          bs(l);
        };
        F(s, (l) => {
          l(o);
        });
      }
      f(n), ye(2), f(r), S(t, r);
    },
    $$slots: { default: !0 },
  });
}
const su = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: nu },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var ou = P("<span> </span>"),
  lu = P("<span> </span>"),
  iu = P('<span class="text-gray-400"> </span>'),
  cu = P(
    '<input type="text" class="w-full p-2 border-b border-gray-300" placeholder="Search...">',
  ),
  du = P(
    '<div class="p-2 cursor-pointer hover:bg-gray-200" role="button" tabindex="0"> <!></div>',
  ),
  uu = P(
    '<div class="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded shadow max-h-60"><!> <!></div>',
  ),
  fu = P(
    '<div class="relative w-full"><button type="button" class="w-full p-2 text-left border border-gray-300 rounded-md cursor-pointer"><!></button> <!></div>',
  );
function Qa(e, t) {
  pe(t, !1);
  const a = U();
  let r = J(t, "items", 24, () => []),
    n = J(t, "bindSelected", 12, null),
    s = J(t, "placeholder", 8, "Select an Option"),
    o = J(t, "multiple", 8, !1),
    l = J(t, "searchEnabled", 8, !1),
    d = U(""),
    c = U(!1);
  const v = dn();
  function g(w) {
    o()
      ? Array.isArray(n())
        ? n().find((R) => R.value === w.value)
          ? n(n().filter((R) => R.value !== w.value))
          : n([...n(), w])
        : n([w])
      : (n(w), C(c, !1)),
      v("select", { value: o() ? n() : w });
  }
  function u(w) {
    return o() && Array.isArray(n())
      ? !!n().find((R) => R.value === w.value)
      : !o() && n() && typeof n() == "object" && "value" in n()
        ? n().value === w.value
        : !1;
  }
  function h() {
    C(c, !i(c));
  }
  Et(
    () => (Wr(r()), i(d)),
    () => {
      C(
        a,
        r().filter(
          (w) =>
            w && w.name && w.name.toLowerCase().includes(i(d).toLowerCase()),
        ),
      );
    },
  ),
    Ba(),
    Ee();
  var y = fu(),
    b = p(y),
    _ = p(b);
  {
    var A = (w) => {
        var R = ou(),
          N = p(R, !0);
        f(R),
          W(
            (T) => Y(N, T),
            [
              () =>
                n()
                  .map((T) => T.name)
                  .join(", "),
            ],
            Se,
          ),
          S(w, R);
      },
      k = (w) => {
        var R = fe(),
          N = K(R);
        {
          var T = (G) => {
              var M = lu(),
                B = p(M, !0);
              f(M), W(() => Y(B, n().name)), S(G, M);
            },
            O = (G) => {
              var M = iu(),
                B = p(M, !0);
              f(M), W(() => Y(B, s())), S(G, M);
            };
          F(
            N,
            (G) => {
              !o() && n() && typeof n() == "object" && "name" in n()
                ? G(T)
                : G(O, !1);
            },
            !0,
          );
        }
        S(w, R);
      };
    F(_, (w) => {
      o() && Array.isArray(n()) && n().length > 0 ? w(A) : w(k, !1);
    });
  }
  f(b);
  var E = m(b, 2);
  {
    var x = (w) => {
      var R = uu(),
        N = p(R);
      {
        var T = (G) => {
          var M = cu();
          Re(M),
            Oe(
              M,
              () => i(d),
              (B) => C(d, B),
            ),
            S(G, M);
        };
        F(N, (G) => {
          l() && G(T);
        });
      }
      var O = m(N, 2);
      Te(
        O,
        1,
        () => i(a),
        (G) => G.value,
        (G, M) => {
          var B = du(),
            V = p(B),
            j = m(V);
          {
            var $ = (H) => {
              var q = Ka("✔");
              S(H, q);
            };
            F(j, (H) => {
              u(i(M)) && H($);
            });
          }
          f(B),
            W(() => Y(V, `${i(M).name ?? ""} `)),
            I("click", B, () => g(i(M))),
            I("keydown", B, (H) => H.key === "Enter" && g(i(M))),
            S(G, B);
        },
      ),
        f(R),
        S(w, R);
    };
    F(E, (w) => {
      i(c) && w(x);
    });
  }
  f(y),
    I("click", b, h),
    I("keydown", b, (w) => w.key === "Enter" && h()),
    S(e, y),
    he();
}
var vu = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class Qs {
  constructor() {
    Tr(this, "actor");
    this.actor = et.createActor(pa, vu.BACKEND_CANISTER_ID);
  }
  async getGolfCourse(t) {
    const a = await this.actor.getGolfCourse(t);
    if (ht(a)) throw new Error("Failed to get golf course");
    return a.ok;
  }
  async getGolfCourses(t) {
    const a = await this.actor.getGolfCourses(t);
    if (ht(a)) throw new Error("Failed to get golf courses");
    return a.ok;
  }
}
function pu() {
  const { subscribe: e, set: t } = Je([]);
  async function a(n) {
    return await new Qs().getGolfCourse(n);
  }
  async function r(n) {
    return await new Qs().getGolfCourses(n);
  }
  return {
    subscribe: e,
    setCourse: (n) => t(n),
    getGolfCourse: a,
    getGolfCourses: r,
  };
}
const Za = pu();
var hu = qo(
  '<svg viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.125 22.3125C13.125 20.139 14.889 18.375 17.0625 18.375C19.236 18.375 21 20.139 21 22.3125C21 24.4886 19.236 26.25 17.0625 26.25C14.889 26.25 13.125 24.4886 13.125 22.3125ZM36.75 23.625L30.1376 34.125L23.625 28.98L13.125 44.625H49.875L36.75 23.625ZM57.75 13.125V49.875H5.25V13.125H57.75ZM63 7.875H0V55.125H63V7.875Z"></path></svg>',
);
function _s(e, t) {
  pe(t, !1);
  let a = J(t, "className", 8, "");
  const r = "";
  var n = hu(),
    s = p(n);
  return (
    ee(s, "fill", r),
    f(n),
    W(() => ce(n, 0, zo(a()))),
    S(e, n),
    Ki(t, "fill", r),
    he({ fill: r })
  );
}
var gu = P(
    '<span class="px-1.5 py-0.5 text-2xs font-bold text-white rounded-full"> </span>',
  ),
  mu = P(
    '<span class="px-2 py-1 text-xs font-bold text-white rounded-full"> </span>',
  ),
  bu = P(
    '<button type="button"><div class="absolute flex flex-wrap gap-1 top-2 right-2 md:hidden"></div> <div class="flex items-center gap-2 md:gap-4"><div><span class="text-xs text-BrandDarkGray md:text-sm">ID</span> <h3 class="text-base text-black condensed md:text-lg"> </h3></div> <img src="golfCourse.png" alt="Course Thumbnail" class="w-8 h-8 rounded md:w-10 md:h-10"></div> <div class="flex items-center justify-between flex-1"><h3 class="text-base text-black condensed md:text-lg"> </h3> <div class="flex-wrap hidden gap-2 md:flex"></div></div></button>',
  ),
  yu = P(
    '<div class="flex flex-col gap-3 mb-3 text-black md:flex-row md:gap-4 md:mb-4"><div class="w-full md:w-1/2"><label for="courseName" class="block mb-1 text-xs font-medium text-BrandDarkGray md:text-sm">Course Name</label> <input id="courseName" type="text" placeholder="Search"></div> <div class="w-full md:w-1/2"><label for="country" class="block mb-1 text-xs font-medium text-BrandDarkGray md:text-sm">Country</label> <!></div></div> <div class="space-y-2 md:space-y-4"></div>',
    1,
  ),
  _u = P(
    '<div class="flex items-center justify-center w-12 h-12 rounded bg-BrandLightGray"><!></div>',
  ),
  wu = P(
    '<div class="flex gap-4"><div class="flex-1"><label for="teeName" class="block mb-2 text-sm font-bold">TEE NAME</label> <input id="teeName" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter"></div> <div class="flex-1"><label for="teeColor" class="block mb-2 text-sm font-bold">COLOR</label> <input id="teeColor" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter"></div></div>',
  ),
  xu = P(
    '<div class="flex flex-col space-y-6"><div class="flex flex-col gap-4"><div class="basis-1/2"><label for="teeName" class="block mb-2 text-sm font-bold">TEE NAME</label> <input id="teeName" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter"></div> <div class="basis-1/2"><label for="teeColorPicker" class="block mb-2 text-sm font-bold">COLOR</label> <div class="flex items-center gap-2"><div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"><input id="teeColorPicker" type="color" class="w-full h-full border-none cursor-pointer"></div> <input type="text" class="flex-1 p-3 text-black bg-white border border-gray-300 rounded" placeholder="Hex code"></div></div></div></div>',
  ),
  ku = P(
    '<tr class="hover:bg-BrandLightGray"><td class="p-4 text-lg border-b condensed"></td><td class="p-4 border-b"><input type="text" placeholder="Enter"></td><td class="p-4 border-b"><input type="text" placeholder="Enter"></td><td class="p-4 border-b"><input type="text" placeholder="Enter"></td></tr>',
  ),
  Eu = P(
    '<div class="overflow-x-auto"><div class="overflow-y-auto max-h-[50vh]"><table class="min-w-full bg-white border-collapse"><thead><tr><th class="p-4 text-xl text-left border-b condensed text-Black">HOLE</th><th class="p-4 text-xl text-left border-b condensed text-Black">PAR</th><th class="p-4 text-xl text-left border-b condensed text-Black">S.I.</th><th class="p-4 text-xl text-left border-b condensed text-Black">YARDS</th></tr></thead><tbody></tbody></table></div></div>',
  ),
  Au = P(
    '<div class="flex flex-col space-y-6"><div class="flex gap-4"><div class="basis-4/5"><label for="courseNameInput" class="block mb-2 text-sm font-bold">COURSE NAME</label> <input id="courseNameInput" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter Course Name"></div> <div class="basis-1/5"><label for="courseImageUpload" class="block mb-2 text-sm font-bold">COURSE IMAGE</label> <div class="flex items-center gap-1"><!> <div class="flex items-center gap-2"><button id="courseImageUpload" type="button" class="brand-button">UPLOAD</button> <span class="text-xs text-BrandDarkGray">800px x 800px min</span></div></div></div></div> <div class="flex flex-col gap-4"><div class="flex flex-col gap-4 items-left"><div class="flex items-center gap-4"><button>BASIC</button> <button>ADVANCED</button></div> <div class="flex flex-row justify-between gap-4"><div class="flex flex-col px-2"><label for="addTee" class="block mb-2 text-sm font-bold">TEES</label> <button id="addTee" type="button" class="brand-button">+</button></div> <div><label for="copyFromTeeGroup" class="block mb-2 text-sm font-bold">COPY FROM EXISTING TEE GROUP</label> <!></div></div></div> <!> <!> <div class="flex justify-end"><button type="button">CREATE TEE</button></div> <!></div></div>',
  ),
  Su = P(
    '<div class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"><div class="relative z-10 w-full md:w-[80vw] lg:w-[60vw] h-[95vh] overflow-y-auto bg-white rounded-lg shadow-xl"><div class="flex items-center justify-between p-3 md:p-4"><h2 class="text-2xl text-black md:text-3xl condensed">ADD HOME COURSE</h2> <button class="cancel-button" type="button" aria-label="Close">✕</button></div> <div class="px-3 pt-2 pb-2 md:px-6 md:pt-4"><p class="text-sm md:text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p></div> <div class="flex px-3 pt-4 md:px-6"><button>SEARCH</button> <button>ADD CUSTOM</button></div> <div class="p-3 md:p-6"><!></div> <div class="flex justify-end gap-3 p-3 border-t md:p-4 md:border-t-0"><button class="cancel-button">CANCEL</button> <button type="button">ADD COURSE</button></div></div></div>',
  );
function _l(e, t) {
  pe(t, !1);
  let a = J(t, "isOpen", 8, !1),
    r = J(t, "selectedCourse", 12, null);
  const n = dn();
  let s = U([]),
    o = null,
    l = U("ADD_CUSTOM"),
    d = U("ADVANCED"),
    c = U(""),
    v = U("Test Golf Club"),
    g = [],
    u = U({
      name: "Championship",
      colour: "#000000",
      strokeIndex: 0,
      added: BigInt(Date.now()),
      holes: Array(18)
        .fill(null)
        .map((N, T) => ({
          number: T + 1,
          name: `Hole ${T + 1}`,
          images: [],
          tees: [
            {
              name: "Championship",
              colour: "#000000",
              yardage: BigInt(350 + T * 10),
              par: 4,
              strokeIndex: T + 1,
            },
          ],
        })),
    }),
    h = U(
      Array(18)
        .fill(null)
        .map((N, T) => ({
          name: "Championship",
          colour: "#000000",
          yardage: 350 + T * 10,
          par: 4,
          strokeIndex: T + 1,
        })),
    ),
    y = null,
    b = U(!1);
  tt(async () => {
    try {
      const N = { limit: BigInt(10), offset: BigInt(0) };
      C(s, await Za.getCourses(N));
    } catch (N) {
      console.error("Error fetching courses:", N);
    }
  });
  function _() {
    n("close");
  }
  async function A() {
    try {
      if (i(l) === "SEARCH" && r()) n("courseSelect", { course: r() }), _();
      else if (i(l) === "ADD_CUSTOM") {
        if (!i(v) || !i(u).name || !i(u).colour) {
          console.error(
            "Course name, tee group name, and tee group color are required",
          );
          return;
        }
        if (i(d) === "ADVANCED" && !k()) {
          console.error("All 18 holes must have complete data");
          return;
        }
        const N = {
          name: i(v),
          initialTeeGroup: {
            name: i(u).name,
            colour: i(u).colour,
            added: BigInt(Date.now()),
            strokeIndex: i(u).strokeIndex ?? 0,
            holes:
              i(d) === "ADVANCED"
                ? i(u).holes
                : Array(18)
                    .fill(null)
                    .map((M, B) => ({
                      number: B + 1,
                      name: `Hole ${B + 1}`,
                      images: [],
                      tees: [
                        {
                          name: i(u).name || "",
                          colour: i(u).colour || "",
                          yardage: BigInt(0),
                          par: 4,
                          strokeIndex: B + 1,
                        },
                      ],
                    })),
          },
          holes: [],
        };
        await Za.createCourse(N);
        const T = { limit: BigInt(10), offset: BigInt(0) },
          G = (await Za.getCourses(T)).find((M) => M.name === i(v));
        G && n("courseSelect", { course: G }), _();
      }
    } catch (N) {
      console.error("Error saving course:", N);
    }
  }
  function k() {
    return i(u).holes.length !== 18
      ? !1
      : i(u).holes.every((N, T) =>
          N.number !== T + 1 || !N.tees || N.tees.length === 0
            ? !1
            : N.tees.every(
                (O) =>
                  O.name &&
                  O.colour &&
                  typeof O.yardage < "u" &&
                  typeof O.par < "u" &&
                  typeof O.strokeIndex < "u",
              ),
        );
  }
  function E() {
    return !i(v) || !i(u).name || !i(u).colour
      ? !1
      : i(d) === "ADVANCED"
        ? k()
        : !0;
  }
  Ee();
  var x = fe(),
    w = K(x);
  {
    var R = (N) => {
      var T = Su(),
        O = p(T),
        G = p(O),
        M = m(p(G), 2);
      f(G);
      var B = m(G, 4),
        V = p(B);
      let j;
      var $ = m(V, 2);
      let H;
      f(B);
      var q = m(B, 2),
        Q = p(q);
      {
        var L = (ne) => {
            var te = yu(),
              we = K(te),
              z = p(we),
              ge = m(p(z), 2);
            Re(ge);
            let Ge;
            f(z);
            var Ie = m(z, 2),
              je = m(p(Ie), 2);
            Qa(je, {
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
              f(Ie),
              f(we);
            var Ye = m(we, 2);
            Te(
              Ye,
              5,
              () =>
                i(s).filter(($e) =>
                  $e.name.toLowerCase().includes(i(c).toLowerCase()),
                ),
              Me,
              ($e, le) => {
                var me = bu();
                let Ae;
                var Ce = p(me);
                Te(
                  Ce,
                  5,
                  () => i(le).tees,
                  Me,
                  (Be, Qe) => {
                    var ze = gu(),
                      wt = p(ze, !0);
                    f(ze),
                      W(() => {
                        ee(
                          ze,
                          "style",
                          `background-color: ${i(Qe).colour ?? ""}`,
                        ),
                          Y(wt, i(Qe).name);
                      }),
                      S(Be, ze);
                  },
                ),
                  f(Ce);
                var Ue = m(Ce, 2),
                  at = p(Ue),
                  De = m(p(at), 2),
                  yt = p(De, !0);
                f(De), f(at), ye(2), f(Ue);
                var _t = m(Ue, 2),
                  it = p(_t),
                  Lt = p(it, !0);
                f(it);
                var be = m(it, 2);
                Te(
                  be,
                  5,
                  () => i(le).tees,
                  Me,
                  (Be, Qe) => {
                    var ze = mu(),
                      wt = p(ze, !0);
                    f(ze),
                      W(() => {
                        ee(
                          ze,
                          "style",
                          `background-color: ${i(Qe).colour ?? ""}`,
                        ),
                          Y(wt, i(Qe).name);
                      }),
                      S(Be, ze);
                  },
                ),
                  f(be),
                  f(_t),
                  f(me),
                  W(() => {
                    (Ae = ce(me, 1, "brand-button", null, Ae, {
                      "bg-BrandLightGray": r() === i(le),
                    })),
                      Y(yt, i(le).courseId),
                      Y(Lt, i(le).name);
                  }),
                  I("click", me, () => r(i(le))),
                  I("keydown", me, (Be) => Be.key === "Enter" && r(i(le))),
                  S($e, me);
              },
            ),
              f(Ye),
              W(
                () =>
                  (Ge = ce(
                    ge,
                    1,
                    "w-full p-2 text-sm text-black rounded md:text-base",
                    null,
                    Ge,
                    { "bg-BrandLightGray": !i(c), "bg-white": i(c) },
                  )),
              ),
              Oe(
                ge,
                () => i(c),
                ($e) => C(c, $e),
              ),
              S(ne, te);
          },
          oe = (ne) => {
            var te = fe(),
              we = K(te);
            {
              var z = (ge) => {
                var Ge = Au(),
                  Ie = p(Ge),
                  je = p(Ie),
                  Ye = m(p(je), 2);
                Re(Ye), f(je);
                var $e = m(je, 2),
                  le = m(p($e), 2),
                  me = p(le);
                {
                  var Ae = (xe) => {
                    var Fe = _u(),
                      rt = p(Fe);
                    _s(rt, { className: "w-6 h-6 fill-black" }),
                      f(Fe),
                      S(xe, Fe);
                  };
                  F(me, (xe) => {
                    xe(Ae, !1);
                  });
                }
                ye(2), f(le), f($e), f(Ie);
                var Ce = m(Ie, 2),
                  Ue = p(Ce),
                  at = p(Ue),
                  De = p(at);
                let yt;
                var _t = m(De, 2);
                let it;
                f(at);
                var Lt = m(at, 2),
                  be = p(Lt),
                  Be = m(p(be), 2);
                f(be);
                var Qe = m(be, 2),
                  ze = m(p(Qe), 2);
                const wt = Se(() =>
                  g.map((xe) => ({ name: xe.name, value: xe })),
                );
                Qa(ze, {
                  get items() {
                    return i(wt);
                  },
                  bindSelected: y,
                  placeholder: "Select Tee Group",
                  searchEnabled: !0,
                  multiple: !1,
                }),
                  f(Qe),
                  f(Lt),
                  f(Ue);
                var ba = m(Ue, 2);
                {
                  var hn = (xe) => {
                    var Fe = wu(),
                      rt = p(Fe),
                      xt = m(p(rt), 2);
                    Re(xt), f(rt);
                    var Ct = m(rt, 2),
                      Gt = m(p(Ct), 2);
                    Re(Gt),
                      f(Ct),
                      f(Fe),
                      Oe(
                        xt,
                        () => i(u).name,
                        (It) => ct(u, (i(u).name = It)),
                      ),
                      Oe(
                        Gt,
                        () => i(u).colour,
                        (It) => ct(u, (i(u).colour = It)),
                      ),
                      S(xe, Fe);
                  };
                  F(ba, (xe) => {
                    i(d) === "BASIC" && xe(hn);
                  });
                }
                var wr = m(ba, 2);
                {
                  var gn = (xe) => {
                    var Fe = xu(),
                      rt = p(Fe),
                      xt = p(rt),
                      Ct = m(p(xt), 2);
                    Re(Ct), f(xt);
                    var Gt = m(xt, 2),
                      It = m(p(Gt), 2),
                      Pe = p(It),
                      jt = p(Pe);
                    Re(jt), f(Pe);
                    var Xt = m(Pe, 2);
                    Re(Xt),
                      f(It),
                      f(Gt),
                      f(rt),
                      f(Fe),
                      Oe(
                        Ct,
                        () => i(u).name,
                        (Ke) => ct(u, (i(u).name = Ke)),
                      ),
                      Oe(
                        jt,
                        () => i(u).colour,
                        (Ke) => ct(u, (i(u).colour = Ke)),
                      ),
                      I("input", jt, (Ke) => {
                        ct(u, (i(u).colour = Ke.currentTarget.value));
                      }),
                      Oe(
                        Xt,
                        () => i(u).colour,
                        (Ke) => ct(u, (i(u).colour = Ke)),
                      ),
                      I("input", Xt, (Ke) => {
                        ct(u, (i(u).colour = Ke.currentTarget.value));
                      }),
                      S(xe, Fe);
                  };
                  F(wr, (xe) => {
                    i(d) === "ADVANCED" && xe(gn);
                  });
                }
                var Ua = m(wr, 2),
                  Fa = p(Ua);
                let xr;
                f(Ua);
                var mn = m(Ua, 2);
                {
                  var bn = (xe) => {
                    var Fe = Eu(),
                      rt = p(Fe),
                      xt = p(rt),
                      Ct = m(p(xt));
                    Te(
                      Ct,
                      5,
                      () => i(h),
                      Me,
                      (Gt, It, Pe) => {
                        var jt = ku(),
                          Xt = p(jt);
                        Xt.textContent = Pe + 1;
                        var Ke = m(Xt),
                          Ma = p(Ke);
                        Re(Ma);
                        let kr;
                        f(Ke);
                        var $a = m(Ke),
                          Va = p($a);
                        Re(Va);
                        let Er;
                        f($a);
                        var Ar = m($a),
                          Ha = p(Ar);
                        Re(Ha);
                        let Sr;
                        f(Ar),
                          f(jt),
                          W(() => {
                            (kr = ce(
                              Ma,
                              1,
                              "w-full p-2 text-black border rounded",
                              null,
                              kr,
                              {
                                "bg-BrandLightGray": !i(h)[Pe].par,
                                "bg-white": i(h)[Pe].par,
                              },
                            )),
                              (Er = ce(
                                Va,
                                1,
                                "w-full p-2 text-black border rounded",
                                null,
                                Er,
                                {
                                  "bg-BrandLightGray": !i(h)[Pe].strokeIndex,
                                  "bg-white": i(h)[Pe].strokeIndex,
                                },
                              )),
                              (Sr = ce(
                                Ha,
                                1,
                                "w-full p-2 text-black border rounded",
                                null,
                                Sr,
                                {
                                  "bg-BrandLightGray": !i(h)[Pe].yardage,
                                  "bg-white": i(h)[Pe].yardage,
                                },
                              ));
                          }),
                          Oe(
                            Ma,
                            () => i(h)[Pe].par,
                            (oa) => ct(h, (i(h)[Pe].par = oa)),
                          ),
                          Oe(
                            Va,
                            () => i(h)[Pe].strokeIndex,
                            (oa) => ct(h, (i(h)[Pe].strokeIndex = oa)),
                          ),
                          Oe(
                            Ha,
                            () => i(h)[Pe].yardage,
                            (oa) => ct(h, (i(h)[Pe].yardage = oa)),
                          ),
                          S(Gt, jt);
                      },
                    ),
                      f(Ct),
                      f(xt),
                      f(rt),
                      f(Fe),
                      S(xe, Fe);
                  };
                  F(mn, (xe) => {
                    i(b) && xe(bn);
                  });
                }
                f(Ce),
                  f(Ge),
                  W(() => {
                    (yt = ce(De, 1, "brand-button", null, yt, {
                      "text-BrandForest": i(d) === "BASIC",
                      "text-BrandDarkGray": i(d) !== "BASIC",
                    })),
                      (it = ce(_t, 1, "brand-button", null, it, {
                        "text-BrandForest": i(d) === "ADVANCED",
                        "text-BrandDarkGray": i(d) !== "ADVANCED",
                      })),
                      (xr = ce(Fa, 1, "brand-button", null, xr, {
                        "bg-BrandLightGray": !i(u).name || !i(u).colour,
                        "text-BrandDarkGray": !i(u).name || !i(u).colour,
                        "bg-BrandForest": i(u).name && i(u).colour,
                        "text-BrandYellow": i(u).name && i(u).colour,
                      })),
                      (Fa.disabled = !i(u).name || !i(u).colour);
                  }),
                  Oe(
                    Ye,
                    () => i(v),
                    (xe) => C(v, xe),
                  ),
                  I("click", De, () => C(d, "BASIC")),
                  I("click", _t, () => C(d, "ADVANCED")),
                  I("click", Be, () => {}),
                  I("click", Fa, () => C(b, !0)),
                  S(ge, Ge);
              };
              F(
                we,
                (ge) => {
                  i(l) === "ADD_CUSTOM" && ge(z);
                },
                !0,
              );
            }
            S(ne, te);
          };
        F(Q, (ne) => {
          i(l) === "SEARCH" ? ne(L) : ne(oe, !1);
        });
      }
      f(q);
      var D = m(q, 2),
        re = p(D),
        ue = m(re, 2);
      let _e;
      f(D),
        f(O),
        f(T),
        W(
          (ne, te) => {
            (j = ce(V, 1, "brand-button", null, j, {
              "text-BrandForest": i(l) === "SEARCH",
              "text-BrandDarkGray": i(l) !== "SEARCH",
            })),
              (H = ce($, 1, "brand-button", null, H, {
                "text-BrandForest": i(l) === "ADD_CUSTOM",
                "text-BrandDarkGray": i(l) !== "ADD_CUSTOM",
              })),
              (_e = ce(ue, 1, "brand-button", null, _e, {
                "bg-BrandLightGray": ne,
                "text-BrandDarkGray": ne,
                "bg-BrandForest": te,
                "text-BrandYellow": te,
              }));
          },
          [() => !E(), E],
          Se,
        ),
        I("click", M, _),
        I("click", V, () => C(l, "SEARCH")),
        I("click", $, () => C(l, "ADD_CUSTOM")),
        I("click", re, _),
        I("click", ue, A),
        S(N, T);
    };
    F(w, (N) => {
      a() && N(R);
    });
  }
  S(e, x), he();
}
ss(Qt, (e) => {
  try {
    let t;
    if (e && e.profilePicture) {
      if (
        Array.isArray(e.profilePicture) &&
        e.profilePicture[0] instanceof Uint8Array
      )
        return (
          (t = e.profilePicture[0]),
          `data:image/${e.profilePictureType};base64,${Ks(t)}`
        );
      if (e.profilePicture instanceof Uint8Array)
        return `data:${e.profilePictureType};base64,${Ks(e.profilePicture)}`;
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
const Zs = (e) => "golfCourse.png";
var Tu = P('<span class="px-2 py-1 text-sm text-black rounded-full"> </span>'),
  Cu = P(
    '<div class="grid items-center grid-cols-2 p-3 mb-2 bg-white rounded gap-y-4"><div class="flex items-center"><img class="object-cover w-16 h-16 mr-4 rounded-md"> <span class="text-2xl text-black condensed"> </span></div> <div class="flex items-center justify-between space-x-2 text-black"><!> <button class="px-5 py-1 text-sm rounded text-BrandYellow bg-BrandForest">VIEW</button></div></div>',
  ),
  Ru = P('<span class="px-3 py-1 text-sm text-white rounded-full"> </span>'),
  Nu = P('<span class="px-3 py-1 text-sm text-black rounded-full"> </span>'),
  Pu = P(
    '<div class="p-4 bg-white rounded-lg"><div class="sm:hidden"><div class="flex items-center mb-4"><img class="w-16 h-16 mr-4 rounded-lg"> <span class="text-2xl text-black condensed"> </span></div> <div class="h-px mb-4 bg-BrandDivider"></div> <div class="flex flex-wrap gap-2"></div></div> <div class="hidden sm:block"><div class="flex items-center justify-between mb-4"><div class="flex items-center"><img class="w-16 h-16 mr-4 rounded-lg"> <span class="text-2xl text-black condensed"> </span></div> <div class="flex items-center gap-2"></div></div></div> <button class="w-full py-2 mt-4 text-sm rounded text-BrandYellow bg-BrandForest">VIEW</button></div>',
  ),
  Ou = P(
    '<div class="w-full bg-white"><div class="flex items-center justify-between px-8 pt-4"><h2 class="text-4xl text-black condensed">MY COURSES</h2> <button class="hidden md:block btn btn-new-game">ADD NEW COURSE</button></div> <div class="w-full h-full px-2 pt-4"><div class="hidden p-2 rounded lg:block bg-BrandLightGray"><div class="grid items-center grid-cols-2 gap-4 p-4 text-xl text-black condensed"><span>NAME</span> <span>TEES</span></div> <div class="overflow-y-auto max-h-[60vh] p-2"></div></div> <div class="space-y-4 lg:hidden"></div> <button class="w-full py-2 mt-6 text-xl lg:hidden bg-BrandYellow text-BrandForest">ADD NEW COURSE</button></div> <!></div>',
  );
function Bu(e, t) {
  pe(t, !1);
  let a = [],
    r = U(!1),
    n = U([]),
    s = U(null);
  tt(async () => {
    try {
      const l = { limit: BigInt(10), offset: BigInt(0) };
      (a = await Za.getCourses(l)),
        C(
          n,
          a.map((d) => ({
            ...d,
            teeColors: d.tees.map((c) => ({ name: c.name, color: o(c.name) })),
          })),
        );
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
  Ee(),
    Kt(e, {
      children: (l, d) => {
        var c = Ou(),
          v = p(c),
          g = m(p(v), 2);
        f(v);
        var u = m(v, 2),
          h = p(u),
          y = m(p(h), 2);
        Te(
          y,
          5,
          () => i(n),
          Me,
          (E, x) => {
            var w = Cu(),
              R = p(w),
              N = p(R),
              T = m(N, 2),
              O = p(T, !0);
            f(T), f(R);
            var G = m(R, 2),
              M = p(G);
            Te(
              M,
              1,
              () => i(x).teeColors,
              Me,
              (B, V) => {
                var j = Tu(),
                  $ = p(j, !0);
                f(j),
                  W(() => {
                    ee(j, "style", `background-color: ${i(V).color ?? ""};`),
                      Y($, i(V).name);
                  }),
                  S(B, j);
              },
            ),
              ye(2),
              f(G),
              f(w),
              W(
                (B) => {
                  ee(N, "src", B), ee(N, "alt", i(x).name), Y(O, i(x).name);
                },
                [() => Zs(i(x))],
                Se,
              ),
              S(E, w);
          },
        ),
          f(y),
          f(h);
        var b = m(h, 2);
        Te(
          b,
          5,
          () => i(n),
          Me,
          (E, x) => {
            var w = Pu(),
              R = p(w),
              N = p(R),
              T = p(N),
              O = m(T, 2),
              G = p(O, !0);
            f(O), f(N);
            var M = m(N, 4);
            Te(
              M,
              5,
              () => i(x).teeColors,
              Me,
              (L, oe) => {
                var D = Ru(),
                  re = p(D, !0);
                f(D),
                  W(() => {
                    ee(D, "style", `background-color: ${i(oe).color ?? ""};`),
                      Y(re, i(oe).name);
                  }),
                  S(L, D);
              },
            ),
              f(M),
              f(R);
            var B = m(R, 2),
              V = p(B),
              j = p(V),
              $ = p(j),
              H = m($, 2),
              q = p(H, !0);
            f(H), f(j);
            var Q = m(j, 2);
            Te(
              Q,
              5,
              () => i(x).teeColors,
              Me,
              (L, oe) => {
                var D = Nu(),
                  re = p(D, !0);
                f(D),
                  W(() => {
                    ee(D, "style", `background-color: ${i(oe).color ?? ""};`),
                      Y(re, i(oe).name);
                  }),
                  S(L, D);
              },
            ),
              f(Q),
              f(V),
              f(B),
              ye(2),
              f(w),
              W(
                (L) => {
                  ee(T, "src", L),
                    ee(T, "alt", i(x).name),
                    Y(G, i(x).name),
                    ee($, "src", L),
                    ee($, "alt", i(x).name),
                    Y(q, i(x).name);
                },
                [() => Zs(i(x))],
                Se,
              ),
              S(E, w);
          },
        ),
          f(b);
        var _ = m(b, 2);
        f(u);
        var A = m(u, 2);
        {
          var k = (E) => {
            _l(E, {
              get isOpen() {
                return i(r);
              },
              $$events: {
                close: () => C(r, !1),
                courseSelect: (x) => {
                  C(s, x.detail.course), C(r, !1);
                },
              },
            });
          };
          F(A, (E) => {
            i(r) && E(k);
          });
        }
        f(c),
          I("click", g, () => C(r, !0)),
          I("click", _, () => C(r, !0)),
          S(l, c);
      },
      $$slots: { default: !0 },
    }),
    he();
}
const Gu = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Bu },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Iu = P(
    '<img alt="Course thumbnail" class="object-cover w-16 h-16 rounded">',
  ),
  ju = P(
    '<div class="flex items-center justify-center w-12 h-12 rounded bg-BrandLightGray"><!></div>',
  ),
  Uu = P(
    '<div class="fixed inset-0 z-50 flex items-center justify-center"><div class="relative z-50 w-full md:h-auto md:w-[60vw] overflow-y-auto bg-white rounded-lg"><div class="sticky top-0 z-10 flex items-center justify-between p-3 bg-white border-b md:p-4"><h2 class="text-2xl text-black md:text-3xl condensed">EDIT HOME COURSE</h2> <button class="cancel-button" type="button" aria-label="Close">✕</button></div> <div class="p-3 md:p-6"><p class="text-sm md:text-base text-BrandDarkGray">Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p> <div class="mt-4 md:mt-6"><label for="courseNameInput" class="block mb-2 text-sm font-bold text-BrandDarkGray">COURSE NAME</label> <input id="courseNameInput" type="text" class="w-full p-3 text-black bg-white border border-gray-300 rounded" placeholder="Enter Course Name"></div> <div class="mt-4 md:mt-6"><label for="courseImageUpload" class="block mb-2 text-sm font-bold">COURSE IMAGE</label> <div class="flex items-center gap-2"><!> <div class="flex flex-col gap-1"><button id="courseImageUpload" type="button" class="brand-button">UPLOAD</button> <span class="text-2xs md:text-xs text-BrandDarkGray">800px x 800px min</span></div></div></div></div> <div class="sticky bottom-0 flex justify-end gap-2 p-3 bg-white border-t md:p-4"><button class="cancel-button">CANCEL</button> <button type="button">SAVE CHANGES</button></div></div></div>',
  );
function Fu(e, t) {
  pe(t, !1);
  let a = J(t, "isOpen", 8, !1),
    r = J(t, "holes", 24, () => []),
    n = J(t, "courseName", 12, ""),
    s = J(t, "courseImage", 8, "");
  const o = dn();
  function l() {
    o("close");
  }
  function d() {
    o("save", { holes: r() });
  }
  function c() {
    return n().trim().length > 0;
  }
  Ee();
  var v = fe(),
    g = K(v);
  {
    var u = (h) => {
      var y = Uu(),
        b = p(y),
        _ = p(b),
        A = m(p(_), 2);
      f(_);
      var k = m(_, 2),
        E = m(p(k), 2),
        x = m(p(E), 2);
      Re(x), f(E);
      var w = m(E, 2),
        R = m(p(w), 2),
        N = p(R);
      {
        var T = (j) => {
            var $ = Iu();
            W(() => ee($, "src", s())), S(j, $);
          },
          O = (j) => {
            var $ = ju(),
              H = p($);
            _s(H, { className: "w-6 h-6 fill-black" }), f($), S(j, $);
          };
        F(N, (j) => {
          s() ? j(T) : j(O, !1);
        });
      }
      ye(2), f(R), f(w), f(k);
      var G = m(k, 2),
        M = p(G),
        B = m(M, 2);
      let V;
      f(G),
        f(b),
        f(y),
        W(
          (j, $) =>
            (V = ce(B, 1, "brand-button", null, V, {
              "bg-BrandLightGray": j,
              "text-BrandDarkGray": j,
              "bg-BrandForest": $,
              "text-BrandYellow": $,
            })),
          [() => !c(), c],
          Se,
        ),
        I("click", A, l),
        Oe(x, n),
        I("click", M, l),
        I("click", B, d),
        S(h, y);
    };
    F(g, (h) => {
      a() && h(u);
    });
  }
  S(e, v), he();
}
var Mu = P(
    '<div class="flex flex-col"><h3 class="hidden mb-4 text-xl text-black lg:block condensed">DETAILS</h3> <div class="flex flex-col"><p class="block pt-8 text-sm text-BrandDarkGray">COURSE NAME</p> <h2 class="text-5xl text-black md:text-6xl condensed"> </h2></div> <div class="flex flex-col"><p class="block pt-8 text-sm text-BrandDarkGray">LOCATION</p> <h1 class="text-2xl text-black condensed">UNITED KINGDOM</h1></div> <div class="w-full h-px my-4 bg-BrandDivider sm:hidden"></div></div>',
  ),
  $u = P(
    '<span class="inline-block px-2 py-1 text-sm text-white rounded-full max-w-max"> </span>',
  ),
  Vu = P(
    '<tr><td class="p-3 text-black condensed"> </td><td class="p-3 text-black"> </td><td class="p-3 text-black"> </td><td class="p-3 text-black"> </td></tr>',
  ),
  Hu = P(
    '<div class="grid grid-cols-4 gap-4 p-2 text-black bg-white border-t"><div class="text-lg condensed"> </div> <div class="text-lg"> </div> <div class="text-lg"> </div> <div class="text-lg"> </div></div>',
  ),
  qu = P(
    '<div class="w-full"><div class="p-2 px-4 text-black"><div class="flex items-center justify-between"><h2 class="text-5xl text-black md:text-4xl condensed">COURSE DETAILS</h2> <div class="hidden gap-4 md:flex"><button class="px-4 py-3 font-semibold rounded text-md bg-BrandLightGray">REMOVE COURSE</button> <button class="px-4 py-3 font-semibold rounded text-md text-BrandYellow bg-BrandForest">EDIT COURSE DETAILS</button></div></div></div> <div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-6 lg:w-1/3 lg:mb-0"><h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3> <img src="/course-placeholder.jpg" alt="golf course" class="object-cover w-full h-full rounded"></div> <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0"><!></div> <div class="w-full px-0 lg:w-1/3 lg:px-4"><h2 class="pb-3 text-xl text-black condensed">TEES</h2> <div class="flex flex-col p-5 bg-white border-b rounded"><!></div> <div class="overflow-x-auto"><div class="overflow-y-auto max-h-[65vh]"><table class="hidden min-w-full bg-white border-collapse sm:table"><thead><tr><th class="p-4 text-xl text-left text-black border-b condensed">HOLE</th><th class="p-4 text-xl text-left text-black border-b condensed">PAR</th><th class="p-4 text-xl text-left text-black border-b condensed">S.I.</th><th class="p-4 text-xl text-left text-black border-b condensed">YARDS</th></tr></thead><tbody></tbody></table> <div class="sm:hidden"><div class="grid grid-cols-4 gap-4 p-2 text-sm text-black bg-white condensed"><div>HOLE</div> <div>PAR</div> <div>S.I</div> <div>YARDS</div></div> <!></div></div></div> <div class="flex w-full gap-4 p-2 bg-white md:hidden"><button class="px-3 py-1 font-semibold text-black rounded text-md bg-BrandLightGray">REMOVE COURSE</button> <button class="px-3 py-1 font-semibold rounded text-md text-BrandYellow bg-BrandForest">EDIT COURSE DETAILS</button></div></div></div></div>',
  ),
  Wu = P("<!> <!>", 1);
function Yu(e, t) {
  pe(t, !1);
  let a = U(null),
    r = U(!1),
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
  tt(async () => {
    try {
      const c = { limit: BigInt(10), offset: BigInt(0) },
        v = await Za.getCourses(c);
      C(a, v[0] || null);
    } catch (c) {
      console.error("Error fetching course details:", c);
    }
  }),
    Ee();
  var s = Wu(),
    o = K(s);
  Kt(o, {
    children: (c, v) => {
      var g = qu(),
        u = p(g),
        h = p(u),
        y = m(p(h), 2),
        b = m(p(y), 2);
      f(y), f(h), f(u);
      var _ = m(u, 2),
        A = m(p(_), 2),
        k = p(A);
      {
        var E = (H) => {
          var q = Mu(),
            Q = m(p(q), 2),
            L = m(p(Q), 2),
            oe = p(L, !0);
          f(L),
            f(Q),
            ye(4),
            f(q),
            W((D) => Y(oe, D), [() => i(a).name.toUpperCase()], Se),
            S(H, q);
        };
        F(k, (H) => {
          i(a) && H(E);
        });
      }
      f(A);
      var x = m(A, 2),
        w = m(p(x), 2),
        R = p(w);
      {
        var N = (H) => {
          var q = fe(),
            Q = K(q);
          Te(
            Q,
            1,
            () => i(a).tees,
            Me,
            (L, oe) => {
              var D = $u(),
                re = p(D, !0);
              f(D),
                W(() => {
                  ee(D, "style", `background-color: ${i(oe).colour ?? ""};`),
                    Y(re, i(oe).name);
                }),
                S(L, D);
            },
          ),
            S(H, q);
        };
        F(R, (H) => {
          i(a) && i(a).tees && H(N);
        });
      }
      f(w);
      var T = m(w, 2),
        O = p(T),
        G = p(O),
        M = m(p(G));
      Te(
        M,
        5,
        () => n,
        Me,
        (H, q) => {
          var Q = Vu(),
            L = p(Q),
            oe = p(L, !0);
          f(L);
          var D = m(L),
            re = p(D, !0);
          f(D);
          var ue = m(D),
            _e = p(ue, !0);
          f(ue);
          var ne = m(ue),
            te = p(ne, !0);
          f(ne),
            f(Q),
            W(() => {
              Y(oe, i(q).hole),
                Y(re, i(q).par),
                Y(_e, i(q).strokeIndex),
                Y(te, i(q).yards);
            }),
            S(H, Q);
        },
      ),
        f(M),
        f(G);
      var B = m(G, 2),
        V = m(p(B), 2);
      Te(
        V,
        1,
        () => n,
        Me,
        (H, q) => {
          var Q = Hu(),
            L = p(Q),
            oe = p(L, !0);
          f(L);
          var D = m(L, 2),
            re = p(D, !0);
          f(D);
          var ue = m(D, 2),
            _e = p(ue, !0);
          f(ue);
          var ne = m(ue, 2),
            te = p(ne, !0);
          f(ne),
            f(Q),
            W(() => {
              Y(oe, i(q).hole),
                Y(re, i(q).par),
                Y(_e, i(q).strokeIndex),
                Y(te, i(q).yards);
            }),
            S(H, Q);
        },
      ),
        f(B),
        f(O),
        f(T);
      var j = m(T, 2),
        $ = m(p(j), 2);
      f(j),
        f(x),
        f(_),
        f(g),
        I("click", b, () => C(r, !0)),
        I("click", $, () => C(r, !0)),
        S(c, g);
    },
    $$slots: { default: !0 },
  });
  var l = m(o, 2);
  {
    var d = (c) => {
      const v = Se(() => i(a)?.name || "");
      Fu(c, {
        get isOpen() {
          return i(r);
        },
        holes: n,
        get courseName() {
          return i(v);
        },
        courseImage: "/course-placeholder.jpg",
      });
    };
    F(l, (c) => {
      i(r) && c(d);
    });
  }
  S(e, s), he();
}
const Du = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Yu },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var zu = P(
    '<div class="flex flex-col items-center mb-4 md:flex-row"><img src="prophet.png" alt="mulligans" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">MULLIGANS</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li>A golfer receives a mulligan every 3 holes, specifically the 1st, 4th, 7th, 10th, 13th and 16th holes.</li> <li>Golfers play each hole in match play format, with scores adjusted by handicap.</li> <li>If a golfer wins a hole a mulligan is added to their available mulligans.</li> <li>A golfer can use as many mulligans as they have available on any hole.</li> <li>A golfer can build up as many mulligans as they can.</li> <li>The game is decided when a golfer is winning by more holes than are available to play.</li></ul>',
    1,
  ),
  Ku = P(
    `<div class="flex flex-col items-center mb-4 md:flex-row"><img src="bands.png" alt="bands" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BANDS</h3></div> <p class="mb-4 text-sm text-gray-700 md:text-base">Before a match, a golfer makes selections of 3 hole bands for each of the 9 game categories. 
                    Each band must start on a different hole but they are allowed to overlap.</p> <p class="mb-4 text-sm text-gray-700 md:text-base">The points for each band are as follows:</p> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li><span class="semi-bold">Band 1:</span> Holes where you don’t hit a tree or enter a bunker. <span class="semi-bold">15 points</span></li> <li><span class="semi-bold">Band 2:</span> Holes where you won’t lose a ball. <span class="semi-bold">10 points</span></li> <li><span class="semi-bold">Band 3:</span> Holes where you hit 2/3 fairways. <span class="semi-bold">20 points</span></li> <li><span class="semi-bold">Band 4:</span> Holes where you hit 2/3 greens. <span class="semi-bold">25 points</span></li> <li><span class="semi-bold">Band 5:</span> Holes where you will 1-putt 2/3 greens. <span class="semi-bold">30 points</span></li> <li><span class="semi-bold">Band 6:</span> Holes where you won’t get a double bogey or worse. <span class="semi-bold">35 points</span></li> <li><span class="semi-bold">Band 7:</span> Holes where you won’t bogey or worse. <span class="semi-bold">40 points</span></li> <li><span class="semi-bold">Band 8:</span> Holes where you’ll be par or under. <span class="semi-bold">45 points</span></li> <li><span class="semi-bold">Band 9:</span> Holes where you’ll be under par. <span class="semi-bold">50 points</span></li></ul> <p class="mt-4 text-sm text-gray-700 md:text-base">A golfer can get a maximum possible total score of 270. Golfers receive the points for each band they achieve. The winner is the golfer with the most points at the end of the round.</p>`,
    1,
  ),
  Lu = P(
    `<div class="flex flex-col items-center mb-4 md:flex-row"><img src="build-it.png" alt="build-it" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">BUILD IT</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li>A golfer can create a team in which they can compete against multiple other teams.</li> <li>The golfer who created the team becomes the team's captain.</li> <li>A team captain sets up a game on a specific course and tee to compete against other teams.</li> <li>A team captain invites other team's to join in a new game.</li> <li>A team captain selects a period of time to build their team card over.</li> <li>Golfers add their scorecards transferring any new lowest scores over to the team card.</li> <li>The winners are the team with the lowest scorecard at the end of the game's duration.</li></ul>`,
    1,
  ),
  Xu = P(
    '<div class="flex flex-col items-center mb-4 md:flex-row"><img src="next-up.png" alt="next-up" class="object-cover object-center w-full h-32 mb-4 rounded-lg md:w-20 md:h-20 md:object-contain md:mb-0 md:mr-4"> <h3 class="text-xl md:text-2xl condensed">NEXT UP</h3></div> <ul class="space-y-2 text-sm text-gray-700 list-disc list-inside md:text-base"><li>Each golfer is assigned a random tee box, denoting the hole in which they must win.</li> <li>If a golfer wins the hole they are defending, they get 3 points.</li> <li>If a golfer wins a hole they are not defending, they get 1 point.</li> <li>The winner is the golfer with the most points at the end of the round.</li> <li>If the number of holes is not divisible by the number of players without a remainder, the holes are divided up and the remaining holes are assigned to the lowest scoring player who can potentially win.</li></ul>',
    1,
  ),
  Ju = P(
    '<div class="w-full max-w-4xl p-4 mx-auto text-black"><h2 class="mt-3 mb-6 text-2xl font-black text-black md:text-4xl">GAMEPLAY RULES</h2> <p class="mb-6 text-base leading-relaxed md:text-lg">Choose a game from the tabs below to view its specific rules. Understanding these rules is essential to ensure fair play and enjoyment for everyone involved.</p> <div class="mb-4 border-b border-gray-300"><div class="flex flex-wrap space-x-2 overflow-x-auto md:space-x-4"><button><span class="condensed">MULLIGANS</span></button> <button><span class="condensed">BANDS</span></button> <button><span class="condensed">BUILD IT</span></button> <button><span class="condensed">NEXT UP</span></button></div></div> <div class="p-4 bg-white rounded-lg shadow-lg md:p-6"><!> <!> <!> <!></div></div>',
  );
function Qu(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    n = () => At(s, "$selectedGame", a);
  tt(() => {
    window.scrollTo(0, 0);
  });
  const s = Je("Mulligans");
  Ee(),
    Kt(e, {
      children: (o, l) => {
        var d = Ju(),
          c = m(p(d), 4),
          v = p(c),
          g = p(v),
          u = m(g, 2),
          h = m(u, 2),
          y = m(h, 2);
        f(v), f(c);
        var b = m(c, 2),
          _ = p(b);
        {
          var A = (T) => {
            var O = zu();
            ye(2), S(T, O);
          };
          F(_, (T) => {
            n() === "Mulligans" && T(A);
          });
        }
        var k = m(_, 2);
        {
          var E = (T) => {
            var O = Ku();
            ye(8), S(T, O);
          };
          F(k, (T) => {
            n() === "Bands" && T(E);
          });
        }
        var x = m(k, 2);
        {
          var w = (T) => {
            var O = Lu();
            ye(2), S(T, O);
          };
          F(x, (T) => {
            n() === "Build It" && T(w);
          });
        }
        var R = m(x, 2);
        {
          var N = (T) => {
            var O = Xu();
            ye(2), S(T, O);
          };
          F(R, (T) => {
            n() === "Next Up" && T(N);
          });
        }
        f(b),
          f(d),
          W(() => {
            ce(
              g,
              1,
              `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Mulligans" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
            ),
              ce(
                u,
                1,
                `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Bands" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
              ),
              ce(
                h,
                1,
                `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Build It" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
              ),
              ce(
                y,
                1,
                `text-sm md:text-lg pb-2 focus:outline-none transition-colors duration-300 ${(n() === "Next Up" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500") ?? ""}`,
              );
          }),
          I("click", g, () => s.set("Mulligans")),
          I("click", u, () => s.set("Bands")),
          I("click", h, () => s.set("Build It")),
          I("click", y, () => s.set("Next Up")),
          S(o, d);
      },
      $$slots: { default: !0 },
    }),
    he(),
    r();
}
const Zu = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Qu },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var ef = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class tf {
  constructor() {
    Tr(this, "actor");
    this.actor = et.createActor(pa, ef.BACKEND_CANISTER_ID);
  }
  async getGolferGameSummaries(t) {
    const a = await this.actor.getMyGames(t);
    if (ht(a)) throw new Error("Failed to get golfer game summaries");
    return a.ok;
  }
}
function af() {
  const { subscribe: e, set: t } = Je(void 0);
  async function a(r) {
    return await new tf().getGolferGameSummaries(r);
  }
  return {
    subscribe: e,
    setGolferGameSummaries: (r) => t(r),
    getGolferGameSummaries: a,
  };
}
const eo = af(),
  rf = [
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
var nf = P(
    '<button class="brand-button"><img class="object-cover object-[center_20%] h-[140px] sm:h-auto w-full mx-0 mb-4 rounded-lg sm:max-w-none sm:aspect-square sm:object-fill sm:mx-auto"> <div class="flex flex-col flex-grow w-full"><h3 class="text-2xl font-bold mb-1 condensed h-[2em] flex items-start sm:items-center text-left sm:text-center sm:justify-center"> </h3> <p class="text-sm text-left text-gray-500 md:text-sm font-inter font-med"> </p></div></button>',
  ),
  sf = P(
    '<div class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4"><div class="bg-white p-8 sm:p-5 rounded-lg max-w-[90%] w-full h-auto max-h-[90vh] overflow-y-auto shadow-lg relative"><div class="flex items-center justify-between mb-5"><h2 class="ml-5 text-4xl font-bold sm:text-5xl condensed">NEW GAME</h2> <button class="brand-button">&times;</button></div> <p class="mb-5 ml-5 text-base text-gray-500 font-inter font-sub">SELECT GAME</p> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-5"></div> <div class="hidden mt-5 text-right lg:block"><button class="brand-button">SELECT</button></div></div></div>',
  );
function of(e, t) {
  pe(t, !1);
  let a = J(t, "visible", 8),
    r = J(t, "closeModal", 8);
  function n(d) {
    r()(), Aa(`/games/create/${d}`);
  }
  Ee();
  var s = fe(),
    o = K(s);
  {
    var l = (d) => {
      var c = sf(),
        v = p(c),
        g = p(v),
        u = m(p(g), 2);
      f(g);
      var h = m(g, 4);
      Te(
        h,
        5,
        () => rf,
        (_) => _.id,
        (_, A) => {
          var k = nf(),
            E = p(k),
            x = m(E, 2),
            w = p(x),
            R = p(w, !0);
          f(w);
          var N = m(w, 2),
            T = p(N, !0);
          f(N),
            f(x),
            f(k),
            W(() => {
              ee(E, "src", i(A).image),
                ee(E, "alt", i(A).title),
                Y(R, i(A).title),
                Y(T, i(A).description);
            }),
            I("click", k, () => n(i(A).id)),
            S(_, k);
        },
      ),
        f(h);
      var y = m(h, 2),
        b = p(y);
      f(y),
        f(v),
        f(c),
        I("click", u, function (..._) {
          r()?.apply(this, _);
        }),
        I("click", b, function (..._) {
          r()?.apply(this, _);
        }),
        S(d, c);
    };
    F(o, (d) => {
      a() && d(l);
    });
  }
  S(e, s), he();
}
var to = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class ao {
  constructor() {
    Tr(this, "actor");
    this.actor = et.createActor(pa, to.BACKEND_CANISTER_ID);
  }
  async getGame(t) {
    try {
      let a = { gameId: BigInt(t) },
        r = await this.actor.getGame(a);
      return ht(r) && console.error("Error Fetching Game", r), r.ok;
    } catch (a) {
      throw (console.error("Error Fetching Game", a), a);
    }
  }
  async createGame(t) {
    const r = await (
      await et.createIdentityActor(qe, to.BACKEND_CANISTER_ID)
    ).createGame(t);
    if (ht(r)) throw new Error("Error Creating Game");
    return { ok: r.ok };
  }
}
function lf() {
  const { subscribe: e, set: t } = Je([]);
  async function a(n) {
    return new ao().getGame(n);
  }
  async function r(n) {
    return new ao().createGame(n);
  }
  return { subscribe: e, setGame: (n) => t(n), getGame: a, createGame: r };
}
const wl = lf();
var cf = P(
    '<label for="tee" class="block mt-4 text-lg font-bold text-black">Select Tee Group</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md"><!></div></div>',
    1,
  ),
  df = P("<div>Loading opponents...</div>"),
  uf = P(
    '<div class="flex flex-col w-full"><div class="w-full p-2 px-4 text-black"><h2 class="mx-2 mt-2 mb-0 text-5xl font-black text-black md:mx-4 condensed"> </h2></div> <div class="w-full p-4 text-black bg-gray-100 rounded-lg"><label for="course" class="block mt-4 text-lg font-bold text-black">Course</label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md"><!></div></div> <!> <label for="date" class="block mt-4 text-lg font-bold text-black">Select Tee Off Date</label> <div class="flex items-center w-full mt-2"><div class="flex-grow max-w-md"><input type="date" class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded" placeholder="dd/mm/yyyy"></div></div> <label for="time" class="block mt-4 text-lg font-bold text-black">Select Tee Off Time</label> <div class="flex items-center w-full mt-2"><div class="flex-grow max-w-md"><input type="time" class="w-full p-2 mt-2 text-gray-400 bg-gray-100 border border-gray-300 rounded" placeholder="hh:mm"></div></div> <label for="opponent" class="block mt-4 text-lg font-bold text-black"> </label> <div class="flex items-center w-full mt-2 text-black bg-gray-100"><div class="flex-grow max-w-md"><!></div></div></div> <button class="brand-button">Create New Game</button></div>',
  );
function xl(e, t) {
  pe(t, !1);
  let a = J(t, "gameTitle", 8),
    r = J(t, "opponentConfig", 8),
    n = [],
    s = [],
    o = U([]),
    l = [],
    d = U([]),
    c = U(null),
    v = U(null),
    g = U(null),
    u = U(null),
    h = U(""),
    y = U(""),
    b = U("");
  async function _() {
    if (!i(c) || !i(u) || i(d).length === 0) {
      console.error("Please fill out all fields.");
      return;
    }
    const k = {
      Mulligans: { Mulligans: null },
      BuildIt: { BuildIt: null },
      Bands: { Bands: null },
      NextUp: { NextUp: null },
      Prophet: { Prophet: null },
    }[a()];
    if (!k) {
      console.error(`Invalid gameTitle: ${a()}`);
      return;
    }
    const E = yd(i(b)),
      x = {
        createdById: "Kelly-Howlett",
        courseId: BigInt(i(c).courseId),
        gameType: k,
        inviteIds: ["James-Beadle"],
        teeOffTime: E,
        teeGroup: i(u).value,
      };
    try {
      const w = await wl.createGame(x);
      w.ok ? Aa(`/games/${w.ok}`) : console.error("Error Creating Game", w.err);
    } catch (w) {
      console.error("Error Creating Game", w);
    }
  }
  Et(
    () => (i(h), i(y)),
    () => {
      C(b, i(h) + "T" + i(y));
    },
  ),
    Et(
      () => (i(g), i(c)),
      () => {
        i(g)?.value &&
          (C(c, n.find((A) => A.courseId.toString() === i(g).value) || null),
          i(c) &&
            (C(
              o,
              i(c).tees.map((A) => ({ name: A.name, value: A.name })),
            ),
            C(u, null)));
      },
    ),
    Ba(),
    Ee(),
    Kt(e, {
      children: (A, k) => {
        var E = uf(),
          x = p(E),
          w = p(x),
          R = p(w, !0);
        f(w), f(x);
        var N = m(x, 2),
          T = m(p(N), 2),
          O = p(T),
          G = p(O);
        const M = Se(() =>
          n.map((z) => ({ name: z.name, value: z.courseId.toString() })),
        );
        Qa(G, {
          get items() {
            return i(M);
          },
          get bindSelected() {
            return i(v);
          },
          placeholder: "Select Course",
          multiple: !1,
          searchEnabled: !1,
          $$events: {
            select: (z) => {
              C(v, z.detail), C(g, z.detail.value);
            },
          },
        }),
          f(O),
          f(T);
        var B = m(T, 2);
        {
          var V = (z) => {
            var ge = cf(),
              Ge = m(K(ge), 2),
              Ie = p(Ge),
              je = p(Ie);
            Qa(je, {
              get items() {
                return i(o);
              },
              get bindSelected() {
                return i(u);
              },
              placeholder: "Select Tee Group",
              searchEnabled: !1,
              multiple: !1,
              $$events: {
                select: (Ye) => {
                  C(u, Ye.detail.value);
                },
              },
            }),
              f(Ie),
              f(Ge),
              S(z, ge);
          };
          F(B, (z) => {
            i(g) && z(V);
          });
        }
        var j = m(B, 4),
          $ = p(j),
          H = p($);
        Re(H), f($), f(j);
        var q = m(j, 4),
          Q = p(q),
          L = p(Q);
        Re(L), f(Q), f(q);
        var oe = m(q, 2),
          D = p(oe, !0);
        f(oe);
        var re = m(oe, 2),
          ue = p(re),
          _e = p(ue);
        {
          var ne = (z) => {
              Qa(z, {
                items: l,
                get bindSelected() {
                  return i(d);
                },
                placeholder: "Select your Opponent(s)",
                searchEnabled: !1,
                multiple: !1,
                $$events: {
                  select: (ge) => {
                    C(d, ge.detail.value);
                  },
                },
              });
            },
            te = (z) => {
              var ge = df();
              S(z, ge);
            };
          F(_e, (z) => {
            s.length > 0 ? z(ne) : z(te, !1);
          });
        }
        f(ue), f(re), f(N);
        var we = m(N, 2);
        f(E),
          W(
            (z) => {
              Y(R, z), Y(D, r().playerLabels ? "Players" : "Opponents");
            },
            [() => a().toUpperCase()],
            Se,
          ),
          Oe(
            H,
            () => i(h),
            (z) => C(h, z),
          ),
          Oe(
            L,
            () => i(y),
            (z) => C(y, z),
          ),
          I("click", we, _),
          S(A, E);
      },
      $$slots: { default: !0 },
    }),
    he();
}
var ff = P("<p>No game history found. Start your first game!</p>"),
  vf = P(
    '<div class="relative group"><div class="absolute left-0 z-50 hidden group-hover:block top-12"><p class="font-bold"> </p> <button class="px-2.5 py-1.5 bg-blue-500 text-white rounded">View Player</button></div></div>',
  ),
  pf = P(
    '<div class="w-full mt-5 text-left border-t border-gray-200 bg-gray-50"><div class="flex items-center p-4 border-b border-gray-200"><div class="flex items-center rounded w-15 h-15"></div> <div class="ml-4"><h3 class="font-bold"> </h3> <p class="text-sm"> </p></div></div> <div class="flex ml-auto bg-gray-50"></div> <div class="w-1/6 text-lg font-bold text-blue-500 bg-gray-50"> </div> <div class="w-1/6"><button class="px-4 py-2.5 bg-blue-500 text-white font-bold rounded">Predict</button></div></div>',
  ),
  hf = P(
    '<div class="w-full"><div class="w-full h-full p-2 px-4 text-black"><div class="flex items-center justify-between mb-4"><h2 class="px-2 my-3 text-3xl font-black text-black md:text-5xl condensed">MY GAMES</h2> <button class="mr-4 btn btn-new-game">New Game</button> <!></div> <div class="flex items-center w-full p-4 text-xl font-bold text-left bg-gray-50 condensed"><div class="w-2/6">Game</div> <div class="w-2/6">Players</div> <div class="w-1/6">Status</div> <div class="w-1/6"></div></div> <!> <!> <!></div></div>',
  );
function gf(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    n = () => At(eo, "$golferSummariesStore", a);
  let s = U(!1),
    o = U(null),
    l = U();
  tt(async () => {
    try {
      const g = { limit: BigInt(10), offset: BigInt(0) };
      C(l, await eo.getGolferGameSummaries(g));
    } catch (g) {
      console.error("Failed to fetch golfer game summaries:", g);
    }
  });
  function d() {
    C(s, !0);
  }
  function c() {
    C(s, !1);
  }
  function v(g) {
    C(o, g.detail);
  }
  Ee(),
    Kt(e, {
      children: (g, u) => {
        var h = hf(),
          y = p(h),
          b = p(y),
          _ = m(p(b), 2),
          A = m(_, 2);
        {
          var k = (O) => {
            of(O, {
              get visible() {
                return i(s);
              },
              closeModal: c,
              $$events: { gameSelected: v },
            });
          };
          F(A, (O) => {
            i(s) && O(k);
          });
        }
        f(b);
        var E = m(b, 4);
        {
          var x = (O) => {
            var G = ff();
            S(O, G);
          };
          F(E, (O) => {
            i(l) && i(l).totalEntries === BigInt(0) && O(x);
          });
        }
        var w = m(E, 2);
        {
          var R = (O) => {
            var G = fe(),
              M = K(G);
            Te(
              M,
              1,
              () => n().entries,
              Me,
              (B, V) => {
                var j = pf(),
                  $ = p(j),
                  H = m(p($), 2),
                  q = p(H),
                  Q = p(q, !0);
                f(q);
                var L = m(q, 2),
                  oe = p(L, !0);
                f(L), f(H), f($);
                var D = m($, 2);
                Te(
                  D,
                  5,
                  () => i(V).players,
                  Me,
                  (_e, ne) => {
                    var te = vf(),
                      we = p(te),
                      z = p(we),
                      ge = p(z, !0);
                    f(z), ye(2), f(we), f(te), W(() => Y(ge, i(ne))), S(_e, te);
                  },
                ),
                  f(D);
                var re = m(D, 2),
                  ue = p(re, !0);
                f(re),
                  ye(2),
                  f(j),
                  W(
                    (_e) => {
                      Y(Q, i(V).gameType), Y(oe, _e), Y(ue, i(V).status);
                    },
                    [
                      () =>
                        new Date(Number(i(V).date) * 1e3).toLocaleDateString(),
                    ],
                    Se,
                  ),
                  S(B, j);
              },
            ),
              S(O, G);
          };
          F(w, (O) => {
            n() && n().entries.length > 0 && O(R);
          });
        }
        var N = m(w, 2);
        {
          var T = (O) => {
            xl(O, {
              get gameTitle() {
                return i(o).config.title;
              },
              get opponentConfig() {
                return i(o).config.opponentConfig;
              },
            });
          };
          F(N, (O) => {
            i(o) && O(T);
          });
        }
        f(y), f(h), I("click", _, d), S(g, h);
      },
      $$slots: { default: !0 },
    }),
    he(),
    r();
}
const mf = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: gf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var bf = P(
  '<div class="flex flex-col items-start justify-center w-full ml-8 mt-2.5"><span class="mb-0 text-sm font-medium text-gray-500">GAMETYPE</span> <h1 class="font-black leading-none text-7xl font-condensed"> </h1> <div class="flex flex-col mt-2.5"><span class="mb-0 text-sm font-medium text-gray-500 mt-2.5">DATE</span> <h3 class="mb-4 text-4xl font-bold text-center font-condensed"> </h3></div> <div class="flex items-center justify-start mt-2.5"><img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"> <div class="flex flex-col"><span class="mb-0 text-sm font-medium text-gray-500">COURSE</span> <div><p class="text-3xl font-bold text-center font-condensed"> </p></div></div></div></div>',
);
function yf(e, t) {
  pe(t, !1);
  let a = J(t, "gameType", 8),
    r = J(t, "teeOffTime", 8),
    n = J(t, "courseId", 8);
  tt(async () => {}), Ee();
  var s = bf(),
    o = m(p(s), 2),
    l = p(o, !0);
  f(o);
  var d = m(o, 2),
    c = m(p(d), 2),
    v = p(c, !0);
  f(c), f(d);
  var g = m(d, 2),
    u = m(p(g), 2),
    h = m(p(u), 2),
    y = p(h),
    b = p(y, !0);
  f(y),
    f(h),
    f(u),
    f(g),
    f(s),
    W(() => {
      Y(l, a()), Y(v, r()), Y(b, n());
    }),
    S(e, s),
    he();
}
var _f = P('<div><h4 class="text-4xl font-bold condensed"><!></h4>  <!></div>');
function wf(e, t) {
  pe(t, !1);
  let a = J(t, "gameType", 8),
    r = J(t, "gameStatus", 8);
  J(t, "playerIds", 8), J(t, "events", 8), J(t, "winner", 8), Ee();
  var n = _f(),
    s = p(n),
    o = p(s);
  {
    var l = (g) => {
        var u = Ka("PLAYER SETUP");
        S(g, u);
      },
      d = (g) => {
        var u = fe(),
          h = K(u);
        {
          var y = (_) => {
              var A = Ka("PLAYER SCORES");
              S(_, A);
            },
            b = (_) => {
              var A = fe(),
                k = K(A);
              {
                var E = (x) => {
                  var w = Ka("PLAYER DETAILS");
                  S(x, w);
                };
                F(
                  k,
                  (x) => {
                    r() === "completed" && x(E);
                  },
                  !0,
                );
              }
              S(_, A);
            };
          F(
            h,
            (_) => {
              r() === "active" ? _(y) : _(b, !1);
            },
            !0,
          );
        }
        S(g, u);
      };
    F(o, (g) => {
      r() === "unplayed" ? g(l) : g(d, !1);
    });
  }
  f(s);
  var c = m(s, 2);
  {
    var v = (g) => {
      var u = fe(),
        h = K(u);
      {
        var y = (_) => {},
          b = (_) => {
            var A = fe(),
              k = K(A);
            {
              var E = (w) => {},
                x = (w) => {
                  var R = fe(),
                    N = K(R);
                  {
                    var T = (G) => {},
                      O = (G) => {
                        var M = fe(),
                          B = K(M);
                        {
                          var V = ($) => {},
                            j = ($) => {
                              var H = fe(),
                                q = K(H);
                              {
                                var Q = (L) => {};
                                F(
                                  q,
                                  (L) => {
                                    a() === "Prophet" && L(Q);
                                  },
                                  !0,
                                );
                              }
                              S($, H);
                            };
                          F(
                            B,
                            ($) => {
                              a() === "BuildIt" ? $(V) : $(j, !1);
                            },
                            !0,
                          );
                        }
                        S(G, M);
                      };
                    F(
                      N,
                      (G) => {
                        a() === "NextUp" ? G(T) : G(O, !1);
                      },
                      !0,
                    );
                  }
                  S(w, R);
                };
              F(
                k,
                (w) => {
                  a() === "Mulligans" ? w(E) : w(x, !1);
                },
                !0,
              );
            }
            S(_, A);
          };
        F(h, (_) => {
          a() === "Bands" ? _(y) : _(b, !1);
        });
      }
      S(g, u);
    };
    F(c, (g) => {
      a() && g(v);
    });
  }
  f(n), S(e, n), he();
}
var xf = P(
    '<div class="flex items-center"><div class="w-3 h-3 bg-green-500 rounded-full"></div> <span class="ml-2 mr-4 text-xl font-bold text-green-500">LIVE</span></div>',
  ),
  kf = P(
    '<div class="flex items-center"><div class="w-3 h-3 bg-blue-500 rounded-full"></div> <span class="ml-2 mr-4 text-xl font-bold text-blue-500">PREDICT</span></div>',
  ),
  Ef = P(
    '<div class="w-full"><div class="w-full p-2 px-4 text-black"><div class="flex items-center justify-between"><h2 class="px-5 mt-1 text-3xl font-black text-black md:text-5xl condensed">GAME DETAILS</h2> <!> <!></div></div> <div class="w-full"><div class="w-1/3 rounded-lg"><img class="game-image"></div> <!> <!></div></div>',
  );
function Af(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    n = () => At(ys, "$page", a),
    s = () => At(l, "$gameData", a),
    o = U(),
    l = Je({
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
  tt(async () => {
    try {
      if (i(o)) {
        const v = await wl.getGame(parseInt(i(o)));
        l.set(v);
      }
    } catch (v) {
      console.error(v);
    } finally {
    }
  });
  function d(v) {
    return "Bands" in v
      ? "/bands.png"
      : "Mulligans" in v
        ? "/mulligans.png"
        : "NextUp" in v
          ? "/next-up.png"
          : "BuildIt" in v
            ? "/build-it.png"
            : "Prophet" in v
              ? "/prophet.png"
              : "";
  }
  function c(v) {
    return "Unplayed" in v
      ? "Unplayed"
      : "Active" in v
        ? "Active"
        : "Complete" in v
          ? "Complete"
          : "Unknown";
  }
  Et(
    () => n(),
    () => {
      C(o, n().url.searchParams.get("id"));
    },
  ),
    Ba(),
    Ee(),
    Kt(e, {
      children: (v, g) => {
        var u = Ef(),
          h = p(u),
          y = p(h),
          b = m(p(y), 2);
        {
          var _ = (B) => {
            var V = xf();
            S(B, V);
          };
          F(b, (B) => {
            c(s()?.status) === "Active" && B(_);
          });
        }
        var A = m(b, 2);
        {
          var k = (B) => {
            var V = kf();
            S(B, V);
          };
          F(A, (B) => {
            c(s()?.status) === "Unplayed" && B(k);
          });
        }
        f(y), f(h);
        var E = m(h, 2),
          x = p(E),
          w = p(x);
        f(x);
        var R = m(x, 2);
        yf(R, {
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
        var N = m(R, 2);
        const T = Se(() => c(s()?.status)),
          O = Se(() => Object.keys(s().playerIds)),
          G = Se(() => Object.keys(s().events)),
          M = Se(() => Object.keys(s().winner));
        wf(N, {
          get gameType() {
            return Object.keys(s()?.gameType || {})[0];
          },
          get gameStatus() {
            return i(T);
          },
          get playerIds() {
            return i(O);
          },
          get events() {
            return i(G);
          },
          get winner() {
            return i(M);
          },
        }),
          f(E),
          f(u),
          W(
            (B, V) => {
              ee(w, "src", B), ee(w, "alt", V);
            },
            [() => d(s()?.gameType), () => Object.keys(s()?.gameType || {})[0]],
            Se,
          ),
          S(v, u);
      },
      $$slots: { default: !0 },
    }),
    he(),
    r();
}
const Sf = Object.freeze(
    Object.defineProperty(
      { __proto__: null, component: Af },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Tf = {
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
function Cf(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    s = At(ys, "$page", a).params.game,
    o = Tf[s],
    d = { ...{ multiple: !1 }, ...o.opponentConfig };
  Ee(),
    xl(e, {
      get gameTitle() {
        return o.title;
      },
      opponentConfig: d,
    }),
    he(),
    r();
}
const Rf = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Cf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function Nf(e) {}
const Pf = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Nf },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Of = qo(
  '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="m60 10c27.57 0 50 22.43 50 50s-22.43 50-50 50-50-22.43-50-50 22.43-50 50-50zm0-10c-33.135 0-60 26.865-60 60s26.865 60 60 60 60-26.865 60-60-26.865-60-60-60zm-19.97 64.82 15.53 15.525-20.56 4.655zm49.97-18.82-29.2 29.605-16.01-16.01 29.205-29.595z"></path></svg>',
);
function Rn(e, t) {
  let a = J(t, "className", 8, ""),
    r = J(t, "fill", 8, "");
  var n = Of();
  W(() => {
    ce(n, 0, zo(a())), ee(n, "fill", r());
  }),
    S(e, n);
}
var Bf = P(
    '<img alt="Preview" class="object-cover w-24 h-24 mb-4 rounded sm:w-32 sm:h-32"> <p class="text-base font-medium sm:text-lg text-BrandDarkGray">Click to change image</p>',
    1,
  ),
  Gf = P(
    '<div class="mb-4"><!></div> <p class="text-base font-medium sm:text-lg text-BrandDarkGray">Drag and Drop or Browse</p>',
    1,
  ),
  If = P(
    '<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"><div class="relative z-10 w-full sm:w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white rounded-lg shadow-xl"><div class="flex items-center justify-between p-4 sm:p-5"><h2 class="text-2xl text-black sm:text-3xl condensed">UPLOAD IMAGE</h2> <button class="cancel-button" type="button" aria-label="Close">✕</button></div> <div class="p-4 sm:p-8"><button type="button" class="brand-button"><!> <input id="fileInput" type="file" accept="image/*" class="hidden"></button></div> <div class="flex justify-end gap-3 p-4 sm:gap-4 sm:p-6"><button type="button" class="cancel-button">Cancel</button> <button type="button">Save</button></div></div></div>',
  );
function jf(e, t) {
  pe(t, !1);
  let a = J(t, "isOpen", 8, !1);
  const r = dn();
  let n = U(!1),
    s = null,
    o = U(null),
    l = U();
  function d() {
    r("close");
  }
  function c(b) {
    const _ = b.target;
    _.files &&
      _.files[0] &&
      (C(n, !0), (s = _.files[0]), C(o, URL.createObjectURL(_.files[0])));
  }
  function v() {
    s && (r("fileSelect", { file: s, preview: i(o) }), d());
  }
  function g() {
    i(l)?.click();
  }
  Ee();
  var u = fe(),
    h = K(u);
  {
    var y = (b) => {
      var _ = If(),
        A = p(_),
        k = p(A),
        E = m(p(k), 2);
      f(k);
      var x = m(k, 2),
        w = p(x),
        R = p(w);
      {
        var N = (j) => {
            var $ = Bf(),
              H = K($);
            ye(2), W(() => ee(H, "src", i(o))), S(j, $);
          },
          T = (j) => {
            var $ = Gf(),
              H = K($),
              q = p(H);
            _s(q, {
              className: "w-10 h-10 sm:w-12 sm:h-12 fill-BrandDarkGray",
            }),
              f(H),
              ye(2),
              S(j, $);
          };
        F(R, (j) => {
          i(o) ? j(N) : j(T, !1);
        });
      }
      var O = m(R, 2);
      Ir(
        O,
        (j) => C(l, j),
        () => i(l),
      ),
        f(w),
        f(x);
      var G = m(x, 2),
        M = p(G),
        B = m(M, 2);
      let V;
      f(G),
        f(A),
        f(_),
        W(
          () =>
            (V = ce(B, 1, "brand-button", null, V, {
              "bg-BrandForest": i(n),
              "text-BrandYellow": i(n),
              "bg-BrandLightGray": !i(n),
              "text-BrandDarkGray": !i(n),
            })),
        ),
        I("click", E, d),
        I("change", O, c),
        I("click", w, g),
        I("keydown", w, (j) => j.key === "Enter" && g()),
        I("click", M, d),
        I("click", B, v),
        S(b, _);
    };
    F(h, (b) => {
      a() && b(y);
    });
  }
  S(e, u), he();
}
var Uf = P(
    '<div class="relative w-full h-full"><img alt="Profile" class="object-cover w-full h-full rounded-lg"> <button class="absolute p-2 transition-all duration-200 bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-70"><!></button></div>',
  ),
  Ff = P(
    '<img src="default-profile-picture.jpg" alt="Default Profile" class="object-cover w-full h-full rounded-lg"> <button class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><!></button>',
    1,
  ),
  Mf = P(
    '<div class="relative"><p class="text-xl text-black condensed"> </p> <button type="button" class="absolute bottom-0 right-0 p-1 transition-all duration-200 rounded-full hover:bg-black/10"><!></button></div>',
  ),
  $f = P(
    '<button type="button" class="w-full p-2 text-left rounded text-BrandDarkGray hover:bg-black/5">Select home course</button>',
  ),
  Vf = P(
    '<label for="username" class="block pt-8 pb-3 text-sm text-BrandDarkGray">USERNAME</label> <input id="username" placeholder="Enter your username" type="text" class="w-full p-2 mb-4 text-4xl text-black bg-transparent border-b rounded lg:text-2xl condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest"> <label for="handicap" class="block pt-4 pb-3 text-sm text-BrandDarkGray">HANDICAP</label> <input id="handicap" placeholder="Enter your handicap" type="number" class="w-full p-2 mb-4 text-xl text-black bg-transparent border-b rounded condensed border-BrandDivider focus:outline-none focus:ring-2 focus:ring-BrandForest" min="0" max="54"> <div class="flex items-center mt-auto text-black"><img src="/golfCourse.png" alt="Course" class="w-20 h-20 mr-4 rounded-lg"> <div class="flex-1"><label for="homeCourse" class="block pb-3 text-sm text-BrandDarkGray">HOME COURSE</label> <!> <!></div></div>',
    1,
  ),
  Hf = P(
    '<div class="w-full h-full px-2 pt-4"><div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-6 lg:w-1/3 lg:mb-0"><h3 class="px-2 mb-4 text-2xl text-black lg:hidden condensed">DETAILS</h3> <div class="relative flex items-center justify-center w-full aspect-[16/9] lg:aspect-square bg-yellow-400 rounded-lg"><!> <!></div></div> <div class="w-full px-0 mb-6 lg:w-1/3 lg:px-4 lg:mb-0"><h3 class="hidden mb-4 text-xl text-black lg:block condensed">DETAILS</h3> <!></div></div></div>',
  ),
  qf = P(
    '<div class="grid items-center grid-cols-12 p-4 bg-white rounded-lg"><div class="flex items-center justify-between col-span-12 mb-2 lg:col-span-5 lg:mb-0"><div class="flex items-center"><img src="default-profile-picture.jpg" alt="Profile" class="mr-4 rounded-full w-14 h-14"> <div><span class="text-xxs text-BrandDarkGray"> </span> <h4 class="text-2xl text-black md:text-3xl condensed"> </h4></div></div> <div class="flex flex-col items-end lg:hidden"><span class="text-xxs text-BrandDarkGray">HANDICAP</span> <span class="text-2xl text-black md:text-3xl condensed">4</span></div></div> <div class="items-center hidden col-span-2 lg:flex lg:flex-col"><span class="text-xxs text-BrandDarkGray">HANDICAP</span> <span class="text-2xl text-black md:text-3xl condensed">4</span></div> <div class="flex justify-center col-span-12 space-x-2 lg:justify-end lg:col-span-5"><button class="flex-1 px-3 py-1 text-sm text-black rounded lg:flex-initial bg-BrandAcceptGreen">ACCEPT</button> <button class="flex-1 px-3 py-1 text-sm text-white rounded lg:flex-initial bg-BrandDeclineRed">REJECT</button></div></div>',
  ),
  Wf = P(
    '<div class="w-full h-full px-2 pt-4"><div class="flex flex-col p-4 rounded-md lg:flex-row bg-BrandLightGray"><div class="w-full mb-8 lg:w-3/5 lg:pr-4 lg:mb-0"><div class="flex items-center justify-between mb-4"><h3 class="text-2xl text-black condensed">YOUR FRIENDS</h3> <span class="text-xxs lg:text-sm text-BrandDarkGray">SMOKE THESE GUYS</span></div> <div class="space-y-4"></div></div> <div class="w-full rounded lg:w-2/5 lg:pl-4"><div class="flex items-center justify-between mb-4"><h3 class="text-2xl text-black condensed">PLAYER SEARCH</h3> <span class="md:text-sm text-xxs text-BrandDarkGray">TIME FOR NEW FRIENDS</span></div> <div class="p-4 mb-4 bg-white rounded"><h4 class="mb-4 text-xl text-black condensed">SEARCH PLAYERS BY NAME</h4> <input type="text" placeholder="Enter Name" class="w-full p-3 text-lg bg-white border rounded border-BrandDivider"> <button>ADD FRIEND</button></div></div></div></div>',
  ),
  Yf = P(
    '<div class="w-full"><div class="flex items-center justify-between px-8 pt-4"><h2 class="text-5xl text-black md:text-4xl condensed">PROFILE</h2> <div class="justify-end hidden md:flex"><button>DETAILS</button> <button>SOCIAL</button></div></div> <!> <!> <div class="sticky bottom-0 left-0 right-0 z-10 flex w-full bg-white md:hidden"><button>DETAILS</button> <button>SOCIAL</button></div></div>',
  );
function Df(e, t) {
  pe(t, !1);
  const [a, r] = sa(),
    n = () => At(s, "$isLoading", a);
  let s = Je(!0),
    o = [],
    l = U(),
    d = U(null),
    c = U(null),
    v = U("DETAILS"),
    g = U(!1),
    u = U(!1),
    h = U(""),
    y = null;
  tt(async () => {
    try {
      await Qt.sync(),
        Qt.subscribe((E) => {
          console.log(E), E && (C(l, E), Ji(s, !1));
        });
    } catch (E) {
      console.error("Creating Golfer Error:", E);
    }
  });
  async function b(E) {
    const { file: x, preview: w } = E.detail;
    C(d, w), C(g, !1);
    try {
      await Qt.updateProfilePicture(x),
        await Qt.cacheProfile(),
        await Qt.sync();
    } catch (R) {
      console.error("Error updating profile picture:", R);
    }
  }
  async function _(E) {}
  async function A(E) {}
  function k() {}
  Ee(),
    Kt(e, {
      children: (E, x) => {
        var w = fe(),
          R = K(w);
        {
          var N = (O) => {
              bs(O);
            },
            T = (O) => {
              var G = Yf(),
                M = p(G),
                B = m(p(M), 2),
                V = p(B),
                j = m(V, 2);
              f(B), f(M);
              var $ = m(M, 2);
              {
                var H = (re) => {
                  var ue = Hf(),
                    _e = p(ue),
                    ne = p(_e),
                    te = m(p(ne), 2),
                    we = p(te);
                  {
                    var z = (le) => {
                        var me = Uf(),
                          Ae = p(me),
                          Ce = m(Ae, 2),
                          Ue = p(Ce);
                        Rn(Ue, { className: "w-4 h-4", fill: "white" }),
                          f(Ce),
                          f(me),
                          W(() => ee(Ae, "src", i(d))),
                          I("click", Ce, () => C(g, !0)),
                          S(le, me);
                      },
                      ge = (le) => {
                        var me = Ff(),
                          Ae = m(K(me), 2),
                          Ce = p(Ae);
                        Rn(Ce, { className: "w-20 h-20", fill: "white" }),
                          f(Ae),
                          I("click", Ae, () => C(g, !0)),
                          S(le, me);
                      };
                    F(we, (le) => {
                      i(d) ? le(z) : le(ge, !1);
                    });
                  }
                  var Ge = m(we, 2);
                  {
                    var Ie = (le) => {
                      jf(le, {
                        get isOpen() {
                          return i(g);
                        },
                        $$events: { close: () => C(g, !1), fileSelect: b },
                      });
                    };
                    F(Ge, (le) => {
                      i(g) && le(Ie);
                    });
                  }
                  f(te), f(ne);
                  var je = m(ne, 2),
                    Ye = m(p(je), 2);
                  {
                    var $e = (le) => {
                      var me = Vf(),
                        Ae = m(K(me), 2);
                      Re(Ae);
                      var Ce = m(Ae, 4);
                      Re(Ce);
                      var Ue = m(Ce, 2),
                        at = m(p(Ue), 2),
                        De = m(p(at), 2);
                      {
                        var yt = (be) => {
                            var Be = Mf(),
                              Qe = p(Be),
                              ze = p(Qe, !0);
                            f(Qe);
                            var wt = m(Qe, 2),
                              ba = p(wt);
                            Rn(ba, { className: "w-4 h-4 fill-black" }),
                              f(wt),
                              f(Be),
                              W(() => Y(ze, i(c).name)),
                              I("click", wt, () => C(u, !0)),
                              S(be, Be);
                          },
                          _t = (be) => {
                            var Be = $f();
                            I("click", Be, () => C(u, !0)), S(be, Be);
                          };
                        F(De, (be) => {
                          i(c) ? be(yt) : be(_t, !1);
                        });
                      }
                      var it = m(De, 2);
                      {
                        var Lt = (be) => {
                          _l(be, {
                            get isOpen() {
                              return i(u);
                            },
                            $$events: {
                              close: () => C(u, !1),
                              courseSelect: (Be) => {
                                C(c, Be.detail.course), C(u, !1);
                              },
                            },
                          });
                        };
                        F(it, (be) => {
                          i(u) && be(Lt);
                        });
                      }
                      f(at),
                        f(Ue),
                        Oe(
                          Ae,
                          () => i(l).username,
                          (be) => ct(l, (i(l).username = be)),
                        ),
                        Oe(
                          Ce,
                          () => i(l).handicap[0],
                          (be) => ct(l, (i(l).handicap[0] = be)),
                        ),
                        S(le, me);
                    };
                    F(Ye, (le) => {
                      i(l) && le($e);
                    });
                  }
                  f(je), f(_e), f(ue), S(re, ue);
                };
                F($, (re) => {
                  i(v) === "DETAILS" && re(H);
                });
              }
              var q = m($, 2);
              {
                var Q = (re) => {
                  var ue = Wf(),
                    _e = p(ue),
                    ne = p(_e),
                    te = m(p(ne), 2);
                  Te(
                    te,
                    5,
                    () => o,
                    Me,
                    (Ie, je) => {
                      var Ye = qf(),
                        $e = p(Ye),
                        le = p($e),
                        me = m(p(le), 2),
                        Ae = p(me),
                        Ce = p(Ae, !0);
                      f(Ae);
                      var Ue = m(Ae, 2),
                        at = p(Ue, !0);
                      f(Ue), f(me), f(le), ye(2), f($e);
                      var De = m($e, 4),
                        yt = p(De),
                        _t = m(yt, 2);
                      f(De),
                        f(Ye),
                        W(
                          (it) => {
                            Y(Ce, i(je).principalId), Y(at, it);
                          },
                          [() => i(je).principalId.split("_")[0]],
                          Se,
                        ),
                        I("click", yt, () => _(i(je))),
                        I("click", _t, () => A(i(je))),
                        S(Ie, Ye);
                    },
                  ),
                    f(te),
                    f(ne);
                  var we = m(ne, 2),
                    z = m(p(we), 2),
                    ge = m(p(z), 2);
                  Re(ge);
                  var Ge = m(ge, 2);
                  ce(
                    Ge,
                    1,
                    "w-full p-3 mt-4 text-center transition-colors duration-200 rounded-lg",
                    null,
                    {},
                    {
                      "bg-BrandYellow": y,
                      "text-BrandForest": y,
                      "bg-gray-200": !0,
                      "text-gray-400": !0,
                      "cursor-not-allowed": !0,
                    },
                  ),
                    (Ge.disabled = !0),
                    f(z),
                    f(we),
                    f(_e),
                    f(ue),
                    Oe(
                      ge,
                      () => i(h),
                      (Ie) => C(h, Ie),
                    ),
                    I("click", Ge, k),
                    S(re, ue);
                };
                F(q, (re) => {
                  i(v) === "SOCIAL" && re(Q);
                });
              }
              var L = m(q, 2),
                oe = p(L),
                D = m(oe, 2);
              f(L),
                f(G),
                W(() => {
                  ce(
                    V,
                    1,
                    `px-10 py-3 text-xl text-BrandYellow condensed rounded-l-md rounded-r-none ${(i(v) === "DETAILS" ? "bg-BrandForest" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
                  ),
                    ce(
                      j,
                      1,
                      `px-10 py-3 text-xl text-BrandYellow condensed rounded-t-md ${(i(v) === "SOCIAL" ? "bg-BrandForest" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
                    ),
                    ce(
                      oe,
                      1,
                      `flex-1 py-2 text-xl condensed ${(i(v) === "DETAILS" ? "bg-BrandForest text-BrandYellow" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
                    ),
                    ce(
                      D,
                      1,
                      `flex-1 py-2 text-xl condensed ${(i(v) === "SOCIAL" ? "bg-BrandForest text-BrandYellow" : "bg-[#F9F9F9] text-[#C0C0C0]") ?? ""}`,
                    );
                }),
                I("click", V, () => C(v, "DETAILS")),
                I("click", j, () => C(v, "SOCIAL")),
                I("click", oe, () => C(v, "DETAILS")),
                I("click", D, () => C(v, "SOCIAL")),
                S(O, G);
            };
          F(R, (O) => {
            n() ? O(N) : O(T, !1);
          });
        }
        S(E, w);
      },
      $$slots: { default: !0 },
    }),
    he(),
    r();
}
const zf = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Df },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Kf =
  P(`<div class="md:px-4"><h2 class="mb-2 text-2xl tracking-wide condensed">VISION</h2> <div class="space-y-4"><p class="relative"><img src="panel-bg.jpg" alt="vision" class="w-full h-auto mb-4 rounded-lg shadow-md md:mb-0 md:w-1/3 md:float-right md:ml-4"> <span class="condensed">GOLFPAD</span> is building the future of golf by building you a new range of games and tools powered by AI.
      Whether you’re a seasoned player who thrives on the game’s challenges or a newcomer discovering its unique joys, <span class="condensed">GOLFPAD</span> is designed to enhance every step of your golfing journey.</p> <p>At the heart of our platform is <span class="condensed">MERVE</span>, your own personalised AI assistant there to help transform your game. <span class="condensed">MERVE</span> will chat to you about how far you are hitting specific clubs, let you know a specific ruling and even enter the scores for your weekend fourball. <span class="condensed">MERVE</span> will grow to do more than just the things a perfect caddy does, <span class="condensed">MERVE</span> will become your coach using AI powered swing analysis. 
      Begin chatting with <span class="condensed">MERVE</span> whenever you're ready to begin your golfing relationship.</p> <p><span class="condensed">GOLFPAD</span> also challenges players with our 4 new game formats, training golfers with new skills while they compete out on the course. <span class="condensed">GOLFPAD</span> will provide 3 new AI-driven side games that allow you and your friends to enjoy a more meaningful range & short game area experience.</p> <p class="mb-4"><span class="condensed">GOLFPAD</span> aims to preserve the traditions of golf whilst enabling cutting-edge technology to improve your golfing journey.</p></div></div>`);
function Lf(e) {
  var t = Kf();
  S(e, t);
}
var Xf = P(
  '<div class="md:px-4"><h2 class="text-2xl condensed tracking-wide mb-2">MERVE</h2> <div class="space-y-4"><p class="relative"><span class="condensed">MERVE</span> is your new chat-based AI assistant, ready to become the most useful tool in your golf bag. Whether you’re out on the course or at the range, let <span class="condensed">MERVE</span> know about any shot that may help build your golfer profile. Tell <span class="condensed">MERVE</span> about the shot types you’re playing, the club you’re hitting, and even the course conditions. <span class="condensed">MERVE</span> brings together all kinds of information about your game to provide you with personalised advice that feels like having a coach in your pocket.</p> <p class="relative">But <span class="condensed">MERVE</span> doesn’t stop there. By recording where your ball ends up off the tee, <span class="condensed">MERVE</span> helps you play percentage golf—ensuring you’re making the smartest decisions on every shot. With the ability to gather and analyse data from multiple sources, <span class="condensed">MERVE</span> delivers advanced insights and tooling that take your game to the next level.</p> <p>With a friendly chat interface and voice input, <span class="condensed">MERVE</span> is easy to talk to in any weather. Beyond your game, <span class="condensed">MERVE</span> has been trained on the rules of golf to settle any on-course dispute. Just share the details of any situation, and <span class="condensed">MERVE</span> will reply with helpful, easy-to-understand guidance for all golfers involved, including the steps to follow.</p> <p>Whether you’re a weekend golfer or chasing your next handicap milestone, <span class="condensed">MERVE</span> combines cutting-edge AI with the personalised touch you need to get the most out of your golf game.</p> <p>As <span class="condensed">MERVE</span> grows he will offer his services to golf courses, offering a new simpler way to manage memberships, share course information and set up competitions. By enabling courses to communicate with each other, <span class="condensed">MERVE</span> will offer groundbreaking management features, from creating promotional offerings to hosting inter-club tournaments.</p> <p><span class="condensed">GOLFPAD</span>, our integrated platform, will benefit from <span class="condensed">MERVE</span> evolution, providing advanced tools to manage courses, tournaments, and handicaps with AI driven efficiency.</p> <p><span class="condensed">MERVE</span> will also revolutionise the social side of golf. He’ll connect users to arrange rounds with friends, or even pair golfers looking for a partner, making your entire golf experience as seamless as possible. And with swing analysis on the horizon, <span class="condensed">MERVE</span> will unlock deeper insights into your game, helping you refine your skills and lower your scores.</p> <p>Our voice-first interface ensures that you can talk to <span class="condensed">MERVE</span> easily, even when the weather makes typing difficult. Whether you’re seeking shot advice, settling on-course rules, or planning your next tournament, <span class="condensed">MERVE</span> is always ready to help - bringing cutting edge AI and a friendly conversational touch to every aspect of your golf journey.</p></div></div>',
);
function Jf(e) {
  var t = Xf();
  S(e, t);
}
var Qf = P(
  '<div class="fixed inset-0 z-50 overflow-visible bg-black bg-opacity-50 shadow-lg modal-backdrop" aria-hidden="true"><div><div class="bg-BrandLightGray rounded-lg w-full overflow-y-auto max-h-[90vh] px-4 py-4 md:px-6" role="dialog" aria-modal="true"><!></div></div></div>',
);
function ma(e, t) {
  pe(t, !1);
  const a = U();
  let r = J(t, "showModal", 8),
    n = J(t, "onClose", 8),
    s = J(t, "useFixedPosition", 8, !1),
    o = U(),
    l = U(),
    d = !1;
  const c = (A) => {
    A.key === "Escape" && r() && n()();
  };
  typeof window < "u" && window.addEventListener("keydown", c),
    tc(() => {
      typeof window < "u" &&
        (window.removeEventListener("keydown", c),
        (document.body.style.overflow = "auto"));
    });
  const v = (A) => {
      const k = document.querySelector('[role="dialog"]'),
        E = A.target;
      !k?.contains(E) && !d && n()();
    },
    g = () => {
      d = !1;
    },
    u = () => {
      d = !0;
    },
    h = () => {
      setTimeout(() => {
        d = !1;
      }, 0);
    };
  Et(
    () => Wr(r()),
    () => {
      typeof window < "u" &&
        r() &&
        (C(o, window.scrollY), C(l, window.innerWidth < 768));
    },
  ),
    Et(
      () => (i(l), i(o)),
      () => {
        C(
          a,
          i(l)
            ? i(o) + window.innerHeight * 0.45
            : i(o) + window.innerHeight / 2,
        );
      },
    ),
    Et(
      () => Wr(r()),
      () => {
        typeof window < "u" &&
          (r()
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto"));
      },
    ),
    Ba(),
    Ee();
  var y = fe(),
    b = K(y);
  {
    var _ = (A) => {
      var k = Qf(),
        E = p(k),
        x = p(E),
        w = p(x);
      Un(w, t, "default", {}),
        f(x),
        f(E),
        f(k),
        W(() => {
          ce(
            E,
            1,
            `border-2 shadow-md rounded-lg border-BrandPurple/50 ${(s() ? "absolute" : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2") ?? ""} 
           w-full max-w-lg px-4 md:px-0`,
          ),
            ee(
              E,
              "style",
              s()
                ? `top: ${i(a)}px; transform: translate(-50%, -50%); left: 50%;`
                : "",
            );
        }),
        ea(
          1,
          x,
          () => zs,
          () => ({ duration: 2e3 }),
        ),
        ea(
          2,
          x,
          () => zs,
          () => ({ duration: 2e3 }),
        ),
        I("click", k, v),
        I("mousedown", k, g),
        I("mousemove", k, u),
        I("mouseup", k, h),
        ea(
          1,
          k,
          () => lr,
          () => ({ duration: 2e3 }),
        ),
        ea(
          2,
          k,
          () => lr,
          () => ({ duration: 2e3 }),
        ),
        S(A, k);
    };
    F(b, (A) => {
      r() && A(_);
    });
  }
  S(e, y), he();
}
var Zf = P(
  '<div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0"><div class="flex flex-col space-y-2 text-xl leading-relaxed p-4"><p class="relative"><span class="condensed">BOMBS</span> is a cutting-edge game format that transforms your driving range sessions into interactive, competitive, and endlessly entertaining experiences. Designed to bring a social element to your practice, <span class="condensed">BOMBS</span> introduces an exciting new way to challenge yourself and your friends while sharpening your accuracy and focus.</p> <p class="relative">Here’s how it works: Friends can tune into each other’s live driving range streams, creating a shared experience no matter where they are. Using their devices, they select specific targets on the range for the player on the tee to aim for. This isn’t just about hitting long drives—it’s about precision, strategy, and rising to the challenge your friends set for you.</p> <p class="relative">Thanks to advanced AI capabilities, the game identifies when a golfer successfully hits a target, awarding points in real time. Every successful shot brings a mix of satisfaction and bragging rights, while missed targets fuel the fun and banter that makes <span class="condensed">BOMBS</span> so engaging.</p> <p class="relative">Whether you’re practicing solo and inviting friends to join remotely or competing side-by-side at the range, <span class="condensed">BOMBS</span> adds an electrifying layer of competition and camaraderie to every session. It’s not just about hitting the ball; it’s about making every shot count in a dynamic, interactive game that keeps you coming back for more.</p></div></div>',
);
function ev(e) {
  let t = U(!1);
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (a, r) => {
      var n = Zf();
      S(a, n);
    },
    $$slots: { default: !0 },
  });
}
var tv = P(
  '<div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0"><div class="flex flex-col space-y-2 text-xl leading-relaxed p-4"><p class="relative"><span class="condensed">BULLSEYE</span> takes your putting practice to a whole new level, turning every putt into a fun, competitive challenge that sharpens your accuracy and touch. Designed for groups, <span class="condensed">BULLSEYE</span> adds an exciting twist to your putting sessions, making it a game of skill and precision with every stroke.</p> <p class="relative">Here’s how it works: Players take turns attempting to hit designated targets on the green, with points awarded for getting within a putter’s length of the hole. It’s all about precision, as each putt must be carefully judged to land as close to the hole as possible. The more accurate your putts, the higher your score, creating a thrilling dynamic of friendly competition.</p> <p class="relative"><span class="condensed">BULLSEYE</span> encourages players to refine their putting technique in a relaxed yet challenging environment, fostering both individual focus and group camaraderie. Whether you’re practicing with friends or challenging yourself to beat your best, <span class="condensed">BULLSEYE</span> makes every putting session a rewarding experience.</p> <p class="relative">Ideal for groups of golfers, <span class="condensed">BULLSEYE</span> turns your practice into an engaging game that’s as fun as it is effective. Perfect your putting, engage in friendly competition, and make every round count—one precise putt at a time.</p></div></div>',
);
function av(e) {
  let t = U(!1);
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (a, r) => {
      var n = tv();
      S(a, n);
    },
    $$slots: { default: !0 },
  });
}
var rv = P(
  '<div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0"><div class="flex flex-col space-y-2 text-xl leading-relaxed p-4"><p class="relative"><span class="condensed">PIN HIGH</span> reimagines your chipping practice, turning it into an engaging and competitive experience that sharpens your skills while keeping things fun and social. Designed for groups of golfers, <span class="condensed">PIN HIGH</span> challenges you to perfect your touch and precision around the green, making every practice session as rewarding as it is enjoyable.</p> <p class="relative">Here’s how it works: Players take turns aiming for specific targets, with points awarded for hitting the right distance and getting close to the hole. It’s not just about making the shot—it’s about dialing in your control and accuracy to outscore your friends. Whether you’re playing casually or competing fiercely, <span class="condensed">PIN HIGH</span> transforms chipping practice into a game that’s easy to play and hard to put down.</p> <p class="relative">With its dynamic scoring and interactive approach, <span class="condensed">PIN HIGH</span> encourages strategic thinking and steady improvement. Each shot becomes an opportunity to test your skills, refine your technique, and gain valuable feedback—all while enjoying the camaraderie of friendly competition.</p> <p class="relative">Whether you’re at the range or in a backyard setup, <span class="condensed">PIN HIGH</span> brings a new level of excitement to your short game. It’s the perfect way to elevate your practice, connect with others, and master the art of getting up and down.</p></div></div>',
);
function nv(e) {
  let t = U(!1);
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (a, r) => {
      var n = rv();
      S(a, n);
    },
    $$slots: { default: !0 },
  });
}
var sv = P(
  `<!> <!> <!> <div class="md:px-4"><h2 class="text-2xl condensed tracking-wide mb-2">OUR AI POWERED SIDE GAMES</h2> <div class="space-y-4"><p class="relative">We’re excited to unveil <span class="condensed">THREE</span> groundbreaking AI-powered side game formats, designed to revolutionise the way you practice and enhance your social golf experience—no matter where you are in the world.</p> <p class="relative">These innovative formats harness the power of your mobile device’s AI capabilities, transforming traditional practice facilities into dynamic game arenas for you and your friends. Whether you’re looking to sharpen your skills, engage in friendly competition, or simply add some excitement to your practice routine, these games bring a whole new dimension to the way you train.
      In the sections that follow, we’ll introduce each of these three AI-driven experiences, detailing how they work and the specific aspects of your game they’re designed to improve. Get ready to practice smarter, play better, and have more fun than ever before.</p> <p class="relative">These innovative formats harness the power of your mobile device’s AI capabilities, transforming traditional practice facilities into dynamic game arenas for you and your friends. Whether you’re looking to sharpen your skills, engage in friendly competition, or simply add some excitement to your practice routine, these games bring a whole new dimension to the way you train.
      In the sections that follow, we’ll introduce each of these three AI-driven experiences, detailing how they work and the specific aspects of your game they’re designed to improve. Get ready to practice smarter, play better, and have more fun than ever before.</p></div> <div class="pt-4 flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-2 mt-2 mb-32"><div class="flex flex-col w-full space-y-2 md:w-1/3"><div class="aspect-square rounded-2xl overflow-hidden"><img src="game-images/bombs.jpg" alt="bombs" class="w-full h-full object-fill"></div> <p class="text-3xl text-center condensed md:text-lg">BOMBS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/3"><div class="aspect-square rounded-2xl overflow-hidden"><img src="game-images/pin-high.jpg" alt="pin-high" class="w-full h-full object-cover"></div> <p class="text-3xl text-center condensed md:text-lg">PIN HIGH</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/3"><div class=" overflow-hidden"><img src="game-images/bullseye.jpg" alt="bullseye" class="w-full h-full object-cover"></div> <p class="text-3xl text-center condensed md:text-lg">BULLSEYE</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div></div></div>`,
  1,
);
function ov(e) {
  let t = U(!1),
    a = U(!1),
    r = U(!1);
  var n = sv(),
    s = K(n);
  {
    var o = (E) => {
      ev(E);
    };
    F(s, (E) => {
      i(t) && E(o);
    });
  }
  var l = m(s, 2);
  {
    var d = (E) => {
      nv(E);
    };
    F(l, (E) => {
      i(a) && E(d);
    });
  }
  var c = m(l, 2);
  {
    var v = (E) => {
      av(E);
    };
    F(c, (E) => {
      i(r) && E(v);
    });
  }
  var g = m(c, 2),
    u = m(p(g), 4),
    h = p(u),
    y = m(p(h), 4);
  f(h);
  var b = m(h, 2),
    _ = m(p(b), 4);
  f(b);
  var A = m(b, 2),
    k = m(p(A), 4);
  f(A),
    f(u),
    f(g),
    I("click", y, () => {
      C(t, !0);
    }),
    I("click", _, () => {
      C(a, !0);
    }),
    I("click", k, () => {
      C(r, !0);
    }),
    S(e, n);
}
var lv = P(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">BANDS</span> is an exciting new game format designed to help you capitalise on those "purple patches"—the stretches in your golf round where you know you tend to play your best. It’s a game that rewards strategic thinking, consistency, and your ability to perform under pressure, no matter when your game heats up.</p> <p class="relative">Here’s how it works: At the start of your round, you’ll select a three-hole stretch, known as your <span class="condensed">BANDS</span>, where you aim to shine. This is your moment to rack up points by excelling in one of our nine achievement categories. From hitting fairways and greens to avoiding penalties like lost balls, every element of your game contributes to your overall score.</p> <p class="relative">Points are awarded for performing well during your <span class="condensed">BANDS</span>, whether it’s a string of solid pars, hitting every green in regulation, or nailing a clutch birdie. The goal is simple: train your focus and precision during this chosen stretch to maximise your scoring potential. But the impact goes beyond just the BAND itself—<span class="condensed">BANDS</span> is designed to enhance every part of your game, helping you build consistency and confidence across the board, from tee to green.</p> <p class="relative">What makes <span class="condensed">BANDS</span> so exciting is its flexibility. Whether you’re the type of golfer who starts strong, finishes with a flourish, or peaks somewhere in the middle, <span class="condensed">BANDS</span> allows you to choose the part of your round where you’re most likely to excel. It’s not just about playing well—it’s about playing well at the right time.</p> <p class="relative">Perfect for friendly matches, practice rounds, or personal challenges, <span class="condensed">BANDS</span> adds a fresh dimension to your game, encouraging you to refine your skills while keeping the competition fun and engaging. With its innovative approach to training and scoring, <span class="condensed">BANDS</span> is your opportunity to make every round more rewarding, one BAND at a time.</p></div></div>',
);
function iv(e) {
  let t = U(!1),
    a = U(0),
    r = [
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
    C(a, (i(a) + 1) % r.length);
  }
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (s, o) => {
      var l = lv(),
        d = p(l),
        c = p(d),
        v = m(c, 2),
        g = p(v, !0);
      f(v),
        f(d),
        ye(2),
        f(l),
        W(() => {
          ee(c, "src", r[i(a)].src),
            ee(c, "alt", r[i(a)].alt),
            Y(g, r[i(a)].nextLabel);
        }),
        I("click", v, n),
        S(s, l);
    },
    $$slots: { default: !0 },
  });
}
var cv = P(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">BUILD IT</span> is an innovative and customisable team-based format that brings a new level of camaraderie and competition to golf. Designed for groups of friends, it allows golfers to create their own unique tournaments, playing together over a chosen course and timeframe that suits their schedules and ambitions.</p> <p class="relative">Here’s how it works: Players form teams and compete against other teams, building a combined scorecard using their lowest individual scores. This collaborative approach ensures that every contribution matters, while also encouraging teammates to push each other to perform their best. The format is entirely flexible, letting golfers decide how long the competition runs—whether it’s a single round, a weeklong event, or even an epic season that stretches across an entire year.</p> <p class="relative">The magic of <span class="condensed">BUILD IT</span> lies in its adaptability. Teams can tailor the experience to fit their goals, preferences, and schedules, making it perfect for everything from casual weekend rivalries to long-term leaderboards. With its ability to bring friends together in a shared quest for victory, <span class="condensed">BUILD IT</span> fosters stronger bonds and plenty of friendly banter along the way.</p> <p class="relative">By focusing on teamwork, strategy, and consistency, <span class="condensed">BUILD IT</span> offers golfers a fresh and engaging way to enjoy the sport they love. It’s not just about individual performance—it’s about creating something greater together and enjoying every step of the journey. Whether you’re competing for bragging rights or organising a yearlong competition, <span class="condensed">BUILD IT</span> transforms golf into a truly collaborative adventure.</p></div></div>',
);
function dv(e) {
  let t = U(!1),
    a = U(0),
    r = [
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
    C(a, (i(a) + 1) % r.length);
  }
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (s, o) => {
      var l = cv(),
        d = p(l),
        c = p(d),
        v = m(c, 2),
        g = p(v, !0);
      f(v),
        f(d),
        ye(2),
        f(l),
        W(() => {
          ee(c, "src", r[i(a)].src),
            ee(c, "alt", r[i(a)].alt),
            Y(g, r[i(a)].nextLabel);
        }),
        I("click", v, n),
        S(s, l);
    },
    $$slots: { default: !0 },
  });
}
var uv = P(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">MULLIGANS</span> is an exciting new twist on the traditional match play format, designed to add a layer of strategy and fun to your round of golf. It’s a game that rewards tactical thinking, careful decision-making, and the ability to bounce back from mistakes—perfect for golfers looking to shake up their usual match play routine.</p> <p class="relative">In <span class="condensed">MULLIGANS</span>, both players automatically receive a mulligan every three holes, starting with the 1st hole and continuing on the 4th, 7th, 10th, 13th, and 16th. These "do-over" shots can be used at any time, giving golfers the opportunity to replay a wayward drive, take another approach shot, or try again on the greens—all with the aim of staying competitive in the match.</p> <p class="relative">But here’s where the strategy deepens: golfers also compete to earn additional mulligans by winning a hole. Each hole becomes a battle not just for the lead but for valuable resources that can change the tide of the game. Will you save your mulligan for a critical moment later in the round, or use it now to put pressure on your opponent?</p> <p class="relative">The key to <span class="condensed">MULLIGANS</span> lies in how you play them. A well-timed mulligan can help secure a win on a tough hole or stop your opponent from running away with the match. Every decision becomes part of the strategy, keeping the competition fresh, engaging, and unpredictable from start to finish.</p> <p class="relative">With <span class="condensed">MULLIGANS</span>, golfers can enjoy their round with a little less pressure, knowing that a few mistakes are not just allowed—they’re part of the fun. It’s a format that brings out the competitive spirit while encouraging players to laugh off the occasional misstep, making it perfect for friendly matches or lively rivalries.</p> <p class="relative">Whether you’re a seasoned golfer or a casual player, <span class="condensed">MULLIGANS</span> offers a new way to enjoy the game, combining tradition with innovation for a round that’s as entertaining as it is strategic.</p></div></div>',
);
function fv(e) {
  let t = U(!1),
    a = U(0),
    r = [
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
    C(a, (i(a) + 1) % r.length);
  }
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (s, o) => {
      var l = uv(),
        d = p(l),
        c = p(d),
        v = m(c, 2),
        g = p(v, !0);
      f(v),
        f(d),
        ye(2),
        f(l),
        W(() => {
          ee(c, "src", r[i(a)].src),
            ee(c, "alt", r[i(a)].alt),
            Y(g, r[i(a)].nextLabel);
        }),
        I("click", v, n),
        S(s, l);
    },
    $$slots: { default: !0 },
  });
}
var vv = P(
  '<div class="flex flex-col px-2 py-4 space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"><div class="flex flex-col items-center space-y-4 md:items-start md:w-1/3"><img class="object-cover w-full rounded-lg shadow-lg"> <button class="w-full brand-button"> </button></div> <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3"><p class="relative"><span class="condensed">NEXT UP</span> is a dynamic and competitive new game format that puts a spotlight on performing under pressure, especially when it’s your turn to go first off the tee. It’s all about stepping up when it matters most, defending your assigned holes, and seizing opportunities to gain an edge over your opponents.</p> <p class="relative">Here’s how it works: Each hole is a chance to earn points. A golfer earns 3 points for successfully defending a hole when they’re first off the tee, while their opponent can earn 1 point if they manage to beat the defender. The game keeps things fair and exciting by randomising who tees off first across the round, ensuring everyone gets their share of opportunities to defend.</p> <p class="relative">But that’s not all—<span class="condensed">NEXT UP</span> has a clever comeback mechanic. Any remaining unassigned holes are given to the golfer with the lowest score at the time of tee-off. This creates a unique opportunity for the trailing player to defend the hole, potentially swinging momentum back in their favor and leveling the playing field.</p> <p class="relative">The genius of <span class="condensed">NEXT UP</span> lies in its focus on pressure situations. By training golfers to perform when they’re first off the tee, this format sharpens your ability to stay composed, deliver clutch drives, and take control of the hole from the very start.</p> <p class="relative">Whether you’re playing with friends or looking to refine your skills under competition-like conditions, <span class="condensed">NEXT UP</span> keeps every round fresh, engaging, and full of strategic decisions. It’s a format that builds confidence and adds an extra layer of excitement to your golf game, ensuring that every hole is packed with purpose and potential.</p></div></div>',
);
function pv(e) {
  let t = U(!1),
    a = U(0),
    r = [
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
    C(a, (i(a) + 1) % r.length);
  }
  ma(e, {
    get showModal() {
      return i(t);
    },
    onClose: () => {
      C(t, !1);
    },
    children: (s, o) => {
      var l = vv(),
        d = p(l),
        c = p(d),
        v = m(c, 2),
        g = p(v, !0);
      f(v),
        f(d),
        ye(2),
        f(l),
        W(() => {
          ee(c, "src", r[i(a)].src),
            ee(c, "alt", r[i(a)].alt),
            Y(g, r[i(a)].nextLabel);
        }),
        I("click", v, n),
        S(s, l);
    },
    $$slots: { default: !0 },
  });
}
var hv = P(
  '<!> <!> <!> <!> <div class="md:px-4"><h2 class="mb-2 text-2xl tracking-wide condensed">OUR NEW GAMES</h2> <div class="space-y-4"><p class="relative">We’re excited to introduce <span class="condensed">FOUR</span> new game formats designed with the next generation of golfers in mind. These fresh takes on the sport offer opportunities to challenge yourself, refine your skills, and enjoy the game in new ways. Whether you’re aiming for serious competition or just some lighthearted fun, these formats have something for everyone.</p> <p class="relative">Blending the traditions of golf with creative innovations, each format adds a unique twist to the game. Some reimagine classic rules for a modern edge, while others take an entirely new approach to keep things fresh and engaging. They’re designed to make every round memorable, no matter your skill level.</p> <p class="relative">In the following sections, you’ll learn what makes each format stand out and why they’re worth trying. With <span class="condensed">GOLFPAD</span>, golf’s rich history and exciting future come together, offering new ways to play, compete, and grow.</p></div> <div class="flex flex-col w-full pt-4 mt-2 space-y-4 md:flex-row md:space-y-0 md:space-x-2"><div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden aspect-square rounded-2xl"><img src="game-images/mulligans.jpg" alt="mulligans" class="object-fill w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">MULLIGANS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden aspect-square rounded-2xl"><img src="game-images/bands.jpg" alt="bands" class="object-cover w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">BANDS</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden "><img src="game-images/next-up.jpg" alt="next-up" class="object-cover w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">NEXT UP</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div> <div class="flex flex-col w-full space-y-2 md:w-1/4"><div class="overflow-hidden aspect-square rounded-2xl"><img src="game-images/build-it.jpg" alt="build-it" class="object-cover w-full h-full"></div> <p class="text-3xl text-center condensed md:text-lg">BUILD IT</p> <button class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button></div></div></div>',
  1,
);
function gv(e) {
  let t = U(!1),
    a = U(!1),
    r = U(!1),
    n = U(!1);
  var s = hv(),
    o = K(s);
  {
    var l = (T) => {
      fv(T);
    };
    F(o, (T) => {
      i(t) && T(l);
    });
  }
  var d = m(o, 2);
  {
    var c = (T) => {
      iv(T);
    };
    F(d, (T) => {
      i(a) && T(c);
    });
  }
  var v = m(d, 2);
  {
    var g = (T) => {
      dv(T);
    };
    F(v, (T) => {
      i(n) && T(g);
    });
  }
  var u = m(v, 2);
  {
    var h = (T) => {
      pv(T);
    };
    F(u, (T) => {
      i(r) && T(h);
    });
  }
  var y = m(u, 2),
    b = m(p(y), 4),
    _ = p(b),
    A = m(p(_), 4);
  f(_);
  var k = m(_, 2),
    E = m(p(k), 4);
  f(k);
  var x = m(k, 2),
    w = m(p(x), 4);
  f(x);
  var R = m(x, 2),
    N = m(p(R), 4);
  f(R),
    f(b),
    f(y),
    I("click", A, () => {
      C(t, !0);
    }),
    I("click", E, () => {
      C(a, !0);
    }),
    I("click", w, () => {
      C(r, !0);
    }),
    I("click", N, () => {
      C(n, !0);
    }),
    S(e, s);
}
var mv = P(
  '<div class="flex flex-col space-y-4"><h2 class="text-2xl font-black text-black condensed">MARKETING</h2> <p>At Waterway Labs, we are more than just a tech company—we are innovators on a mission to create groundbreaking, community-driven applications that bridge the gap between digital and real-world experiences. Our passion for creating memorable events that introduce people to new technologies is the driving force behind everything we do.</p> <p>What sets us apart? Our unique niche. At Waterway Labs, we use narrowboats—an unexpected yet beloved element—to infuse excitement and originality into our projects. This distinctive approach adds a fresh, unforgettable twist to each of our products, making them truly stand out. It’s not just about creating tech, it’s about creating experiences that resonate with our audience.</p> <div class="w-full mt-4"><img src="whitepaper/boat.jpg" alt="boat" class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center"></div> <p><span class="condensed">GOLFPAD</span>, will carry this philosophy to new heights. We are bringing the ultimate combination of fun, technology, and community to life by creating a floating mini-golf course that will be used for promotional events across the UK. This innovative concept will allow golf enthusiasts and casual players alike to enjoy a new way to play and connect with others.</p> <p>To ensure maximum exposure, we will anchor our floating <span class="condensed">GOLFPAD MINI-PUTT</span> course near some of the world’s most renowned golf courses, with our debut location nestled in the heart of Surrey, one of the UK’s premier golfing regions. By mooring our course at these prestigious sites, we’ll introduce our unique gamified golf experience to both seasoned players and curious newcomers. We’re not just creating another mini-golf course—we’re creating a destination for fun, entertainment, and social connection.</p> <p>Our goal is to seamlessly merge the real-world excitement of golf with the power of social media and digital engagement, positioning <span class="condensed">GOLFPAD</span> at the center of an already competitive and passionate golfing community. With an eye on growth, we’re strategically building a strong online presence, engaging with influencers, and promoting our events to connect with a broader audience. We believe <span class="condensed">GOLFPAD</span> will quickly become the must-visit attraction for golf fans in the UK and beyond.</p> <p>As we set our sights on expansion, we recognise that the US will be a key market for <span class="condensed">GOLFPAD</span>. To ensure a smooth entry, our promotional team is already cultivating strong relationships with some of the country’s most prestigious golf courses, showcasing their beauty and features on our platform. By showcasing these stunning locations, we aim to build a connection with American golfers and inspire the next generation to embrace the world of golf in new and exciting ways.</p> <p>With <span class="condensed">GOLFPAD</span>, we’re not just building a product—we’re creating a global movement that brings people together, elevates the golfing experience, and fuels a passion for innovation. Join us on this journey as we change the way people experience golf—one floating course at a time.</p> <p>Like most successful brands, we too have our niche. We use narrowboats, something most people we have met love, to bring a unique excitement to each one of our products.</p></div>',
);
function bv(e) {
  var t = mv();
  S(e, t);
}
var yv = P(
  '<div class="flex flex-col space-y-4 text-base"><h2 class="text-2xl font-black text-black condensed">ROADMAP</h2> <div class="w-full mt-4"><img src="whitepaper/roadmap.jpg" alt="roadmap" class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center"></div> <p class="relative"><span class="condensed">Q1 2025:</span> The year kicks off with an exciting beginning as we engage and welcome our first users to the <span class="condensed">GOLFPAD</span> ecosystem. Our initial focus will be on introducing them to our first player tool—<span class="condensed">SHOTS</span>—setting the stage for a seamless golfing experience. Early adopters will dive into a world of smarter play, building the foundation for what’s to come.</p> <p class="relative"><span class="condensed">Q2 2025:</span> As the summer season heats up, so will the excitement around <span class="condensed">GOLFPAD</span>. This quarter, users will immerse themselves in our innovative game formats—<span class="condensed">MULLIGANS</span>, <span class="condensed">BANDS</span>, and <span class="condensed">NEXT UP</span>. These formats will empower golfers to elevate their skills, connect with friends, and enjoy friendly competition on the course. By the end of Q2, our community will be fully engaged, creating a buzz that sets the stage for what’s next.</p> <p class="relative"><span class="condensed">Q3 2025:</span> Building on the success of our 4-ball formats, we will introduce our first team-based game—<span class="condensed">BUILD-IT</span>. Designed to bring friends, families, and communities together, <span class="condensed">BUILD-IT</span> will take the <span class="condensed">GOLFPAD</span> experience to new heights, offering a dynamic and strategic way for golfers to collaborate, compete, and refine their skills as a team.</p> <p class="relative"><span class="condensed">Q4 2025:</span> As we approach the end of the year, we’ll evaluate the evolving technology landscape and explore opportunities for decentralisation within the <span class="condensed">GOLFPAD</span> platform. Whether through shared ownership or profit-sharing models, we’re committed to giving our users a more direct stake in the future of <span class="condensed">GOLFPAD</span>—ensuring that the platform remains community-driven and that everyone who contributes to our success can reap the rewards.</p> <p class="relative">With each step, <span class="condensed">GOLFPAD</span> will grow stronger, more innovative, and more aligned with the evolving needs of the golf community. This roadmap represents just the beginning of our journey towards reshaping the future of golf, and we’re excited to have users like you along for the ride.</p></div>',
);
function _v(e) {
  var t = yv();
  S(e, t);
}
var wv = P("<button></button>"),
  xv = P(
    '<div class="flex flex-col"><div class="flex"><!></div> <div class="flex flex-col mt-8 text-xs"><div class="flex flex-row space-x-2"><button class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white">Previous Section</button> <button class="w-1/2 px-4 py-2 text-black rounded bg-BrandYellow disabled:bg-BrandDarkGreen disabled:text-white">Next Section</button></div> <div class="flex flex-row justify-center my-4"></div></div></div>',
  ),
  kv = P(
    '<div class="w-full h-full p-2 px-4 text-black"><h2 class="mt-3 mb-4 text-3xl font-black text-black md:text-5xl condensed">GOLFPAD WHITEPAPER</h2> <div class="flex flex-col w-full md:flex-row"><img src="mulligans.png" alt="hero" class="w-full h-48 md:w-1/4 md:h-auto object-cover object-[50%_var(--crop-position-y)] rounded-lg"> <div class="w-full px-2 mt-4 md:w-3/4 md:mt-0"></div></div></div>',
  );
function Ev(e) {
  let t = U("vision"),
    a = "top";
  const r = [
    { name: "Vision", component: Lf },
    { name: "Merve", component: Jf },
    { name: "New Games", component: gv },
    { name: "Side Games", component: ov },
    { name: "Marketing", component: bv },
    { name: "Road Map", component: _v },
  ];
  function n() {
    const d = r.findIndex((c) => c.name.toLowerCase() === i(t));
    d < r.length - 1 && C(t, r[d + 1].name.toLowerCase());
  }
  function s() {
    const d = r.findIndex((c) => c.name.toLowerCase() === i(t));
    d > 0 && C(t, r[d - 1].name.toLowerCase());
  }
  function o(d) {
    return r[d].name.toLowerCase() === i(t);
  }
  function l(d) {
    C(t, r[d].name.toLowerCase());
  }
  Kt(e, {
    children: (d, c) => {
      var v = kv(),
        g = m(p(v), 2),
        u = p(g);
      ee(u, "style", `--crop-position-y: ${a};`);
      var h = m(u, 2);
      Te(
        h,
        5,
        () => r,
        Me,
        (y, b) => {
          let _ = () => i(b).name,
            A = () => i(b).component;
          var k = fe(),
            E = K(k);
          {
            var x = (w) => {
              var R = xv(),
                N = p(R),
                T = p(N);
              Gr(T, A, (j, $) => {
                $(j, {});
              }),
                f(N);
              var O = m(N, 2),
                G = p(O),
                M = p(G),
                B = m(M, 2);
              f(G);
              var V = m(G, 2);
              Te(
                V,
                5,
                () => r,
                Me,
                (j, $, H, q) => {
                  var Q = wv();
                  W(
                    (L) => {
                      ce(Q, 1, L),
                        ee(Q, "aria-label", `Go to ${r[H].name} section`);
                    },
                    [
                      () => `
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-0.5 cursor-pointer border-none
                      ${o(H) ? "bg-BrandBlue" : "bg-gray-500 hover:bg-gray-600"}
                    `,
                    ],
                    Se,
                  ),
                    I("click", Q, () => l(H)),
                    S(j, Q);
                },
              ),
                f(V),
                f(O),
                f(R),
                W(
                  (j, $) => {
                    (M.disabled = j), (B.disabled = $);
                  },
                  [
                    () =>
                      r.findIndex((j) => j.name.toLowerCase() === i(t)) === 0,
                    () =>
                      r.findIndex((j) => j.name.toLowerCase() === i(t)) ===
                      r.length - 1,
                  ],
                  Se,
                ),
                I("click", M, s),
                I("click", B, n),
                S(w, R);
            };
            F(E, (w) => {
              i(t) === _().toLowerCase() && w(x);
            });
          }
          S(y, k);
        },
      ),
        f(h),
        f(g),
        f(v),
        S(d, v);
    },
    $$slots: { default: !0 },
  });
}
const Av = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Ev },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function Sv(e) {
  return new Worker(
    "" + new URL("../workers/auth.worker-7D_JHySN.js", import.meta.url).href,
    { type: "module", name: e?.name },
  );
}
const Tv = Object.freeze(
  Object.defineProperty({ __proto__: null, default: Sv }, Symbol.toStringTag, {
    value: "Module",
  }),
);
export {
  sd as E,
  td as L,
  st as _,
  $v as a,
  ed as b,
  Nv as c,
  Vv as d,
  Hv as e,
  qv as f,
  Pv as g,
  Zc as h,
  nu as i,
  Bu as j,
  Yu as k,
  Ov as l,
  Uv as m,
  Mv as n,
  Qu as o,
  gf as p,
  Af as q,
  Fv as r,
  jv as s,
  Cf as t,
  Nf as u,
  Df as v,
  Ev as w,
};

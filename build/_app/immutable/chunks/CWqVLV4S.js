import {
  a0 as b,
  u as y,
  aD as E,
  aw as k,
  av as q,
  ar as d,
  ad as D,
  C as z,
} from "./-IhJ7JpO.js";
function g(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function h(e, n, t) {
  if (e == null) return n(void 0), t && t(void 0), b;
  const s = y(() => e.subscribe(n, t));
  return s.unsubscribe ? () => s.unsubscribe() : s;
}
const l = [];
function A(e, n) {
  return { subscribe: C(e, n).subscribe };
}
function C(e, n = b) {
  let t = null;
  const s = new Set();
  function u(o) {
    if (E(e, o) && ((e = o), t)) {
      const i = !l.length;
      for (const r of s) r[1](), l.push(r, e);
      if (i) {
        for (let r = 0; r < l.length; r += 2) l[r][0](l[r + 1]);
        l.length = 0;
      }
    }
  }
  function a(o) {
    u(o(e));
  }
  function c(o, i = b) {
    const r = [o, i];
    return (
      s.add(r),
      s.size === 1 && (t = n(u, a) || b),
      o(e),
      () => {
        s.delete(r), s.size === 0 && t && (t(), (t = null));
      }
    );
  }
  return { set: u, update: a, subscribe: c };
}
function S(e, n, t) {
  const s = !Array.isArray(e),
    u = s ? [e] : e;
  if (!u.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const a = n.length < 2;
  return A(t, (c, o) => {
    let i = !1;
    const r = [];
    let p = 0,
      _ = b;
    const v = () => {
        if (p) return;
        _();
        const f = n(s ? r[0] : r, c, o);
        a ? c(f) : (_ = typeof f == "function" ? f : b);
      },
      w = u.map((f, m) =>
        h(
          f,
          (x) => {
            (r[m] = x), (p &= ~(1 << m)), i && v();
          },
          () => {
            p |= 1 << m;
          },
        ),
      );
    return (
      (i = !0),
      v(),
      function () {
        k(w), _(), (i = !1);
      }
    );
  });
}
function j(e) {
  let n;
  return h(e, (t) => (n = t))(), n;
}
function $(e) {
  d === null && g(),
    D && d.l !== null
      ? M(d).m.push(e)
      : q(() => {
          const n = y(e);
          if (typeof n == "function") return n;
        });
}
function F(e) {
  d === null && g(), $(() => () => y(e));
}
function B(e, n, { bubbles: t = !1, cancelable: s = !1 } = {}) {
  return new CustomEvent(e, { detail: n, bubbles: t, cancelable: s });
}
function G() {
  const e = d;
  return (
    e === null && g(),
    (n, t, s) => {
      const u = e.s.$$events?.[n];
      if (u) {
        const a = z(u) ? u.slice() : [u],
          c = B(n, t, s);
        for (const o of a) o.call(e.x, c);
        return !c.defaultPrevented;
      }
      return !0;
    }
  );
}
function M(e) {
  var n = e.l;
  return n.u ?? (n.u = { a: [], b: [], m: [] });
}
export { F as a, G as c, S as d, j as g, $ as o, h as s, C as w };

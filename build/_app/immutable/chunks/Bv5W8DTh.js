import {
  ao as d,
  ar as _,
  as as l,
  at as p,
  u as b,
  au as h,
  B as g,
  av as k,
  ac as v,
  aw as y,
} from "./CxN_vpku.js";
import { s as x, p as t } from "./Bxzzj_Yl.js";
function j(s = !1) {
  const r = d,
    e = r.l.u;
  if (!e) return;
  let f = () => k(r.s);
  if (s) {
    let n = 0,
      a = {};
    const m = v(() => {
      let c = !1;
      const u = r.s;
      for (const o in u) u[o] !== a[o] && ((a[o] = u[o]), (c = !0));
      return c && n++, n;
    });
    f = () => g(m);
  }
  e.b.length &&
    _(() => {
      i(r, f), p(e.b);
    }),
    l(() => {
      const n = b(() => e.m.map(h));
      return () => {
        for (const a of n) typeof a == "function" && a();
      };
    }),
    e.a.length &&
      l(() => {
        i(r, f), p(e.a);
      });
}
function i(s, r) {
  if (s.l.s) for (const e of s.l.s) g(e);
  r();
}
y();
const $ = {
  get data() {
    return t.data;
  },
  get error() {
    return t.error;
  },
  get form() {
    return t.form;
  },
  get params() {
    return t.params;
  },
  get route() {
    return t.route;
  },
  get state() {
    return t.state;
  },
  get status() {
    return t.status;
  },
  get url() {
    return t.url;
  },
};
x.updated.check;
const q = $;
export { j as i, q as p };

const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "../nodes/0.BP64PGEs.js",
      "../chunks/BMmDdByd.js",
      "../chunks/-IhJ7JpO.js",
      "../nodes/1.B52c9gru.js",
      "../chunks/CGhTk5_h.js",
      "../chunks/C1B2B8uS.js",
      "../chunks/CWqVLV4S.js",
      "../chunks/ugbJ_z5I.js",
      "../chunks/Bymeyx8s.js",
      "../nodes/2.C90CBXTS.js",
      "../chunks/C5k5KcEQ.js",
      "../chunks/C8_ZPc39.js",
      "../chunks/NaaQUmnV.js",
      "../chunks/LEJbNnwY.js",
      "../chunks/vBhIH9no.js",
      "../chunks/AAG3YkeP.js",
      "../assets/Layout.Dk_m9epw.css",
      "../assets/2.1rELfeTq.css",
      "../nodes/3.B5gWlsy2.js",
      "../chunks/CfX7pB0F.js",
      "../nodes/4.CT7NBH-4.js",
      "../chunks/Bor7tEHN.js",
      "../chunks/RVjoGsh7.js",
      "../chunks/BuFEPMEm.js",
      "../assets/pagination-row.CgdFRnS2.css",
      "../nodes/5.D-f_Vj1I.js",
      "../nodes/6.D-f_Vj1I.js",
      "../nodes/7.D-f_Vj1I.js",
      "../nodes/8.DeyDSxvH.js",
      "../nodes/9.D-f_Vj1I.js",
      "../nodes/10.D-f_Vj1I.js",
      "../nodes/11.D-f_Vj1I.js",
      "../nodes/12.D2FclTXW.js",
      "../nodes/13.D-f_Vj1I.js",
      "../nodes/14.D-f_Vj1I.js",
      "../nodes/15.D-f_Vj1I.js",
      "../nodes/16.CIAASn_n.js",
      "../nodes/17.D-f_Vj1I.js",
      "../nodes/18.D-f_Vj1I.js",
      "../nodes/19.D-f_Vj1I.js",
      "../nodes/20.CIAASn_n.js",
      "../nodes/21.D-f_Vj1I.js",
      "../nodes/22.D-f_Vj1I.js",
      "../nodes/23.D-f_Vj1I.js",
      "../nodes/24.DD1yD-2k.js",
      "../chunks/IeFsPlxR.js",
      "../nodes/25.D09bOMqE.js",
      "../chunks/BK25qBDb.js",
    ]),
) => i.map((i) => d[i]);
var C = (e) => {
  throw TypeError(e);
};
var S = (e, t, o) => t.has(e) || C("Cannot " + o);
var i = (e, t, o) => (
    S(e, t, "read from private field"), o ? o.call(e) : t.get(e)
  ),
  A = (e, t, o) =>
    t.has(e)
      ? C("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, o),
  D = (e, t, o, _) => (
    S(e, t, "write to private field"), _ ? _.call(e, o) : t.set(e, o), o
  );
import { _ as r } from "../chunks/AAG3YkeP.js";
import {
  a1 as O,
  ac as N,
  w as d,
  aH as Q,
  at as U,
  D as W,
  p as X,
  au as Z,
  av as $,
  aI as I,
  aJ as tt,
  f as R,
  s as et,
  a as rt,
  c as ot,
  r as at,
  af as L,
  t as st,
} from "../chunks/-IhJ7JpO.js";
import { h as it, m as _t, u as mt, s as ut } from "../chunks/ugbJ_z5I.js";
import { t as M, a as p, c as T, d as nt } from "../chunks/BMmDdByd.js";
import { i as V } from "../chunks/C5k5KcEQ.js";
import { c as y } from "../chunks/BK25qBDb.js";
import { p as b, a as ct } from "../chunks/Bor7tEHN.js";
import { b as x } from "../chunks/IeFsPlxR.js";
import { o as lt } from "../chunks/CWqVLV4S.js";
function dt(e) {
  return class extends ft {
    constructor(t) {
      super({ component: e, ...t });
    }
  };
}
var f, u;
class ft {
  constructor(t) {
    A(this, f);
    A(this, u);
    var o = new Map(),
      _ = (a, s) => {
        var c = W(s);
        return o.set(a, c), c;
      };
    const n = new Proxy(
      { ...(t.props || {}), $$events: {} },
      {
        get(a, s) {
          return d(o.get(s) ?? _(s, Reflect.get(a, s)));
        },
        has(a, s) {
          return s === N
            ? !0
            : (d(o.get(s) ?? _(s, Reflect.get(a, s))), Reflect.has(a, s));
        },
        set(a, s, c) {
          return O(o.get(s) ?? _(s, c), c), Reflect.set(a, s, c);
        },
      },
    );
    D(
      this,
      u,
      (t.hydrate ? it : _t)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: n,
        context: t.context,
        intro: t.intro ?? !1,
        recover: t.recover,
      }),
    ),
      (!t?.props?.$$host || t.sync === !1) && Q(),
      D(this, f, n.$$events);
    for (const a of Object.keys(i(this, u)))
      a === "$set" ||
        a === "$destroy" ||
        a === "$on" ||
        U(this, a, {
          get() {
            return i(this, u)[a];
          },
          set(s) {
            i(this, u)[a] = s;
          },
          enumerable: !0,
        });
    (i(this, u).$set = (a) => {
      Object.assign(n, a);
    }),
      (i(this, u).$destroy = () => {
        mt(i(this, u));
      });
  }
  $set(t) {
    i(this, u).$set(t);
  }
  $on(t, o) {
    i(this, f)[t] = i(this, f)[t] || [];
    const _ = (...n) => o.call(this, ...n);
    return (
      i(this, f)[t].push(_),
      () => {
        i(this, f)[t] = i(this, f)[t].filter((n) => n !== _);
      }
    );
  }
  $destroy() {
    i(this, u).$destroy();
  }
}
(f = new WeakMap()), (u = new WeakMap());
const xt = {};
var vt = M(
    '<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>',
  ),
  Et = M("<!> <!>", 1);
function pt(e, t) {
  X(t, !0);
  let o = b(t, "components", 23, () => []),
    _ = b(t, "data_0", 3, null),
    n = b(t, "data_1", 3, null);
  Z(() => t.stores.page.set(t.page)),
    $(() => {
      t.stores,
        t.page,
        t.constructors,
        o(),
        t.form,
        _(),
        n(),
        t.stores.page.notify();
    });
  let a = I(!1),
    s = I(!1),
    c = I(null);
  lt(() => {
    const m = t.stores.page.subscribe(() => {
      d(a) &&
        (O(s, !0),
        tt().then(() => {
          O(c, ct(document.title || "untitled page"));
        }));
    });
    return O(a, !0), m;
  });
  const G = L(() => t.constructors[1]);
  var w = Et(),
    k = R(w);
  {
    var H = (m) => {
        var l = T();
        const g = L(() => t.constructors[0]);
        var h = R(l);
        y(
          h,
          () => d(g),
          (v, E) => {
            x(
              E(v, {
                get data() {
                  return _();
                },
                get form() {
                  return t.form;
                },
                children: (P, Pt) => {
                  var j = T(),
                    z = R(j);
                  y(
                    z,
                    () => d(G),
                    (B, F) => {
                      x(
                        F(B, {
                          get data() {
                            return n();
                          },
                          get form() {
                            return t.form;
                          },
                        }),
                        (K) => (o()[1] = K),
                        () => o()?.[1],
                      );
                    },
                  ),
                    p(P, j);
                },
                $$slots: { default: !0 },
              }),
              (P) => (o()[0] = P),
              () => o()?.[0],
            );
          },
        ),
          p(m, l);
      },
      J = (m) => {
        var l = T();
        const g = L(() => t.constructors[0]);
        var h = R(l);
        y(
          h,
          () => d(g),
          (v, E) => {
            x(
              E(v, {
                get data() {
                  return _();
                },
                get form() {
                  return t.form;
                },
              }),
              (P) => (o()[0] = P),
              () => o()?.[0],
            );
          },
        ),
          p(m, l);
      };
    V(k, (m) => {
      t.constructors[1] ? m(H) : m(J, !1);
    });
  }
  var Y = et(k, 2);
  {
    var q = (m) => {
      var l = vt(),
        g = ot(l);
      {
        var h = (v) => {
          var E = nt();
          st(() => ut(E, d(c))), p(v, E);
        };
        V(g, (v) => {
          d(s) && v(h);
        });
      }
      at(l), p(m, l);
    };
    V(Y, (m) => {
      d(a) && m(q);
    });
  }
  p(e, w), rt();
}
const wt = dt(pt),
  kt = [
    () =>
      r(
        () => import("../nodes/0.BP64PGEs.js"),
        __vite__mapDeps([0, 1, 2]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/1.B52c9gru.js"),
        __vite__mapDeps([3, 1, 2, 4, 5, 6, 7, 8]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/2.C90CBXTS.js"),
        __vite__mapDeps([
          9, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17,
        ]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/3.B5gWlsy2.js"),
        __vite__mapDeps([18, 1, 2, 4, 5, 6, 8, 10, 19, 15, 14, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/4.CT7NBH-4.js"),
        __vite__mapDeps([
          20, 1, 2, 4, 5, 6, 10, 11, 15, 14, 8, 16, 21, 22, 7, 23, 19, 24, 13,
        ]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/5.D-f_Vj1I.js"),
        __vite__mapDeps([25, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/6.D-f_Vj1I.js"),
        __vite__mapDeps([26, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/7.D-f_Vj1I.js"),
        __vite__mapDeps([27, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/8.DeyDSxvH.js"),
        __vite__mapDeps([
          28, 1, 2, 4, 5, 6, 10, 11, 15, 14, 8, 16, 21, 22, 7, 23, 19, 24, 13,
        ]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/9.D-f_Vj1I.js"),
        __vite__mapDeps([29, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/10.D-f_Vj1I.js"),
        __vite__mapDeps([30, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/11.D-f_Vj1I.js"),
        __vite__mapDeps([31, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/12.D2FclTXW.js"),
        __vite__mapDeps([
          32, 1, 2, 4, 5, 6, 10, 11, 15, 14, 8, 16, 21, 22, 7, 23, 19, 24, 13,
        ]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/13.D-f_Vj1I.js"),
        __vite__mapDeps([33, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/14.D-f_Vj1I.js"),
        __vite__mapDeps([34, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/15.D-f_Vj1I.js"),
        __vite__mapDeps([35, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/16.CIAASn_n.js"),
        __vite__mapDeps([36, 1, 2, 4, 5, 6, 22, 7, 8, 14, 15, 16, 21]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/17.D-f_Vj1I.js"),
        __vite__mapDeps([37, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/18.D-f_Vj1I.js"),
        __vite__mapDeps([38, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/19.D-f_Vj1I.js"),
        __vite__mapDeps([39, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/20.CIAASn_n.js"),
        __vite__mapDeps([40, 1, 2, 4, 5, 6, 22, 7, 8, 14, 15, 16, 21]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/21.D-f_Vj1I.js"),
        __vite__mapDeps([41, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/22.D-f_Vj1I.js"),
        __vite__mapDeps([42, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/23.D-f_Vj1I.js"),
        __vite__mapDeps([43, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/24.DD1yD-2k.js"),
        __vite__mapDeps([
          44, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 19, 15, 14, 16, 21, 45, 13,
        ]),
        import.meta.url,
      ),
    () =>
      r(
        () => import("../nodes/25.D09bOMqE.js"),
        __vite__mapDeps([
          46, 1, 2, 4, 5, 6, 8, 10, 11, 47, 12, 19, 14, 15, 16, 7, 21,
        ]),
        import.meta.url,
      ),
  ],
  jt = [],
  Ct = {
    "/": [2],
    "/game-rules": [3],
    "/games": [4],
    "/games/create": [7],
    "/games/[id]": [5],
    "/games/[id]/edit": [6],
    "/golf-channels": [8],
    "/golf-channels/create": [11],
    "/golf-channels/[id]": [9],
    "/golf-channels/[id]/edit": [10],
    "/golf-courses": [12],
    "/golf-courses/create": [15],
    "/golf-courses/[id]": [13],
    "/golf-courses/[id]/edit": [14],
    "/golf-teams": [16],
    "/golf-teams/create": [19],
    "/golf-teams/[id]": [17],
    "/golf-teams/[id]/edit": [18],
    "/golfers": [20],
    "/golfers/create": [23],
    "/golfers/[id]": [21],
    "/golfers/[id]/edit": [22],
    "/profile": [24],
    "/whitepaper": [25],
  },
  gt = {
    handleError: ({ error: e }) => {
      console.error(e);
    },
    reroute: () => {},
    transport: {},
  },
  ht = Object.fromEntries(
    Object.entries(gt.transport).map(([e, t]) => [e, t.decode]),
  ),
  St = !1,
  Mt = (e, t) => ht[e](t);
export {
  Mt as decode,
  ht as decoders,
  Ct as dictionary,
  St as hash,
  gt as hooks,
  xt as matchers,
  kt as nodes,
  wt as root,
  jt as server_loads,
};

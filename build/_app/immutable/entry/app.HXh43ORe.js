const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "../nodes/0.Bpxbd_iH.js",
      "../chunks/CfcDVdrG.js",
      "../chunks/CxN_vpku.js",
      "../nodes/1._mQmlDb0.js",
      "../chunks/Bv5W8DTh.js",
      "../chunks/Bxzzj_Yl.js",
      "../chunks/uWWjYOZy.js",
      "../chunks/BMJTtVcc.js",
      "../chunks/BweNXA1K.js",
      "../nodes/2.a3_vBDdV.js",
      "../chunks/B64lGz8y.js",
      "../chunks/H0vPu0gU.js",
      "../chunks/CjjwH-_m.js",
      "../chunks/Ca9TznOk.js",
      "../chunks/CIYIwWpX.js",
      "../chunks/DpWkRHjp.js",
      "../assets/Layout.Dk_m9epw.css",
      "../assets/2.1rELfeTq.css",
      "../nodes/3.BVHbFKKo.js",
      "../chunks/LbqoZVd0.js",
      "../nodes/4.ByvGNZyL.js",
      "../chunks/CWiu2rbl.js",
      "../chunks/C2-k5s9i.js",
      "../nodes/5.CcwGGy2I.js",
      "../nodes/6.CcwGGy2I.js",
      "../nodes/7.CcwGGy2I.js",
      "../nodes/8.CFz7iHJc.js",
      "../nodes/9.CcwGGy2I.js",
      "../nodes/10.CcwGGy2I.js",
      "../nodes/11.CcwGGy2I.js",
      "../nodes/12.Ck5GziHq.js",
      "../nodes/13.CcwGGy2I.js",
      "../nodes/14.CcwGGy2I.js",
      "../nodes/15.CcwGGy2I.js",
      "../nodes/16.DLPr3_ux.js",
      "../nodes/17.CcwGGy2I.js",
      "../nodes/18.CcwGGy2I.js",
      "../nodes/19.CcwGGy2I.js",
      "../nodes/20.CcwGGy2I.js",
      "../nodes/21.j-QvJaqI.js",
      "../chunks/DG1oQLg4.js",
      "../nodes/22.CulLrchM.js",
      "../chunks/B8dPJ5Vu.js",
    ]),
) => i.map((i) => d[i]);
var C = (e) => {
  throw TypeError(e);
};
var S = (e, t, r) => t.has(e) || C("Cannot " + r);
var i = (e, t, r) => (
    S(e, t, "read from private field"), r ? r.call(e) : t.get(e)
  ),
  A = (e, t, r) =>
    t.has(e)
      ? C("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, r),
  L = (e, t, r, _) => (
    S(e, t, "write to private field"), _ ? _.call(e, r) : t.set(e, r), r
  );
import { _ as o } from "../chunks/DpWkRHjp.js";
import {
  a1 as O,
  a9 as N,
  B as d,
  aF as Q,
  aq as U,
  J as W,
  p as X,
  ar as Z,
  as as $,
  aG as D,
  aH as tt,
  f as R,
  s as et,
  a as rt,
  c as ot,
  r as at,
  ac as I,
  t as st,
} from "../chunks/CxN_vpku.js";
import { h as it, m as _t, u as mt, s as nt } from "../chunks/BMJTtVcc.js";
import { t as G, a as E, c as T, d as ut } from "../chunks/CfcDVdrG.js";
import { i as V } from "../chunks/B64lGz8y.js";
import { c as y } from "../chunks/B8dPJ5Vu.js";
import { p as b, a as ct } from "../chunks/CWiu2rbl.js";
import { b as x } from "../chunks/DG1oQLg4.js";
import { o as lt } from "../chunks/uWWjYOZy.js";
function dt(e) {
  return class extends ft {
    constructor(t) {
      super({ component: e, ...t });
    }
  };
}
var f, n;
class ft {
  constructor(t) {
    A(this, f);
    A(this, n);
    var r = new Map(),
      _ = (a, s) => {
        var c = W(s);
        return r.set(a, c), c;
      };
    const u = new Proxy(
      { ...(t.props || {}), $$events: {} },
      {
        get(a, s) {
          return d(r.get(s) ?? _(s, Reflect.get(a, s)));
        },
        has(a, s) {
          return s === N
            ? !0
            : (d(r.get(s) ?? _(s, Reflect.get(a, s))), Reflect.has(a, s));
        },
        set(a, s, c) {
          return O(r.get(s) ?? _(s, c), c), Reflect.set(a, s, c);
        },
      },
    );
    L(
      this,
      n,
      (t.hydrate ? it : _t)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: u,
        context: t.context,
        intro: t.intro ?? !1,
        recover: t.recover,
      }),
    ),
      (!t?.props?.$$host || t.sync === !1) && Q(),
      L(this, f, u.$$events);
    for (const a of Object.keys(i(this, n)))
      a === "$set" ||
        a === "$destroy" ||
        a === "$on" ||
        U(this, a, {
          get() {
            return i(this, n)[a];
          },
          set(s) {
            i(this, n)[a] = s;
          },
          enumerable: !0,
        });
    (i(this, n).$set = (a) => {
      Object.assign(u, a);
    }),
      (i(this, n).$destroy = () => {
        mt(i(this, n));
      });
  }
  $set(t) {
    i(this, n).$set(t);
  }
  $on(t, r) {
    i(this, f)[t] = i(this, f)[t] || [];
    const _ = (...u) => r.call(this, ...u);
    return (
      i(this, f)[t].push(_),
      () => {
        i(this, f)[t] = i(this, f)[t].filter((u) => u !== _);
      }
    );
  }
  $destroy() {
    i(this, n).$destroy();
  }
}
(f = new WeakMap()), (n = new WeakMap());
const xt = {};
var vt = G(
    '<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>',
  ),
  ht = G("<!> <!>", 1);
function Et(e, t) {
  X(t, !0);
  let r = b(t, "components", 23, () => []),
    _ = b(t, "data_0", 3, null),
    u = b(t, "data_1", 3, null);
  Z(() => t.stores.page.set(t.page)),
    $(() => {
      t.stores,
        t.page,
        t.constructors,
        r(),
        t.form,
        _(),
        u(),
        t.stores.page.notify();
    });
  let a = D(!1),
    s = D(!1),
    c = D(null);
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
  const M = I(() => t.constructors[1]);
  var w = ht(),
    k = R(w);
  {
    var q = (m) => {
        var l = T();
        const g = I(() => t.constructors[0]);
        var p = R(l);
        y(
          p,
          () => d(g),
          (v, h) => {
            x(
              h(v, {
                get data() {
                  return _();
                },
                get form() {
                  return t.form;
                },
                children: (P, Pt) => {
                  var j = T(),
                    J = R(j);
                  y(
                    J,
                    () => d(M),
                    (Y, z) => {
                      x(
                        z(Y, {
                          get data() {
                            return u();
                          },
                          get form() {
                            return t.form;
                          },
                        }),
                        (K) => (r()[1] = K),
                        () => r()?.[1],
                      );
                    },
                  ),
                    E(P, j);
                },
                $$slots: { default: !0 },
              }),
              (P) => (r()[0] = P),
              () => r()?.[0],
            );
          },
        ),
          E(m, l);
      },
      B = (m) => {
        var l = T();
        const g = I(() => t.constructors[0]);
        var p = R(l);
        y(
          p,
          () => d(g),
          (v, h) => {
            x(
              h(v, {
                get data() {
                  return _();
                },
                get form() {
                  return t.form;
                },
              }),
              (P) => (r()[0] = P),
              () => r()?.[0],
            );
          },
        ),
          E(m, l);
      };
    V(k, (m) => {
      t.constructors[1] ? m(q) : m(B, !1);
    });
  }
  var F = et(k, 2);
  {
    var H = (m) => {
      var l = vt(),
        g = ot(l);
      {
        var p = (v) => {
          var h = ut();
          st(() => nt(h, d(c))), E(v, h);
        };
        V(g, (v) => {
          d(s) && v(p);
        });
      }
      at(l), E(m, l);
    };
    V(F, (m) => {
      d(a) && m(H);
    });
  }
  E(e, w), rt();
}
const wt = dt(Et),
  kt = [
    () =>
      o(
        () => import("../nodes/0.Bpxbd_iH.js"),
        __vite__mapDeps([0, 1, 2]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/1._mQmlDb0.js"),
        __vite__mapDeps([3, 1, 2, 4, 5, 6, 7, 8]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/2.a3_vBDdV.js"),
        __vite__mapDeps([
          9, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17,
        ]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/3.BVHbFKKo.js"),
        __vite__mapDeps([18, 1, 2, 4, 5, 6, 8, 10, 19, 15, 14, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/4.ByvGNZyL.js"),
        __vite__mapDeps([20, 1, 2, 4, 5, 6, 11, 21, 15, 22, 7, 8, 14, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/5.CcwGGy2I.js"),
        __vite__mapDeps([23, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/6.CcwGGy2I.js"),
        __vite__mapDeps([24, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/7.CcwGGy2I.js"),
        __vite__mapDeps([25, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/8.CFz7iHJc.js"),
        __vite__mapDeps([26, 1, 2, 4, 5, 6, 22, 7, 8, 14, 15, 16, 21]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/9.CcwGGy2I.js"),
        __vite__mapDeps([27, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/10.CcwGGy2I.js"),
        __vite__mapDeps([28, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/11.CcwGGy2I.js"),
        __vite__mapDeps([29, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/12.Ck5GziHq.js"),
        __vite__mapDeps([30, 1, 2, 4, 5, 6, 22, 7, 8, 14, 15, 16, 21]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/13.CcwGGy2I.js"),
        __vite__mapDeps([31, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/14.CcwGGy2I.js"),
        __vite__mapDeps([32, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/15.CcwGGy2I.js"),
        __vite__mapDeps([33, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/16.DLPr3_ux.js"),
        __vite__mapDeps([34, 1, 2, 4, 5, 6, 22, 7, 8, 14, 15, 16, 21]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/17.CcwGGy2I.js"),
        __vite__mapDeps([35, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/18.CcwGGy2I.js"),
        __vite__mapDeps([36, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/19.CcwGGy2I.js"),
        __vite__mapDeps([37, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/20.CcwGGy2I.js"),
        __vite__mapDeps([38, 1, 2, 4, 5, 6, 14, 8, 15, 16]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/21.j-QvJaqI.js"),
        __vite__mapDeps([
          39, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 19, 15, 14, 16, 21, 40, 13,
        ]),
        import.meta.url,
      ),
    () =>
      o(
        () => import("../nodes/22.CulLrchM.js"),
        __vite__mapDeps([
          41, 1, 2, 4, 5, 6, 8, 10, 11, 42, 12, 19, 14, 15, 16, 7, 21,
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
    "/golfer": [20],
    "/profile": [21],
    "/whitepaper": [22],
  },
  gt = {
    handleError: ({ error: e }) => {
      console.error(e);
    },
    reroute: () => {},
    transport: {},
  },
  pt = Object.fromEntries(
    Object.entries(gt.transport).map(([e, t]) => [e, t.decode]),
  ),
  St = !1,
  Gt = (e, t) => pt[e](t);
export {
  Gt as decode,
  pt as decoders,
  Ct as dictionary,
  St as hash,
  gt as hooks,
  xt as matchers,
  kt as nodes,
  wt as root,
  jt as server_loads,
};

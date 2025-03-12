import { c as b, a as u, t as S } from "../chunks/BMmDdByd.js";
import { i as W } from "../chunks/CGhTk5_h.js";
import {
  p as X,
  a as Y,
  f as v,
  a1 as c,
  a2 as w,
  w as t,
  s as Z,
  z as tt,
} from "../chunks/-IhJ7JpO.js";
import { i as A } from "../chunks/C5k5KcEQ.js";
import { e as et, i as ot } from "../chunks/C8_ZPc39.js";
import { s as rt, a as at } from "../chunks/AAG3YkeP.js";
import { w as st, o as nt } from "../chunks/CWqVLV4S.js";
import { g as P } from "../chunks/C1B2B8uS.js";
import {
  A as $,
  a as G,
  i as L,
  L as it,
  t as lt,
} from "../chunks/vBhIH9no.js";
import { p as ut } from "../chunks/Bor7tEHN.js";
import { L as ct } from "../chunks/RVjoGsh7.js";
import { P as ft } from "../chunks/BuFEPMEm.js";
import { L as gt } from "../chunks/LEJbNnwY.js";
var D = { BACKEND_CANISTER_ID: "elbip-aiaaa-aaaal-qjfhq-cai" };
class T {
  constructor() {}
  async getGolfCourse(e) {
    const o = await (
      await $.createIdentityActor(G, D.BACKEND_CANISTER_ID)
    ).getGolfCourse(e);
    if (L(o)) throw new Error("Failed to get golf course");
    return o.ok;
  }
  async getGolfCourses(e) {
    const o = await (
      await $.createIdentityActor(G, D.BACKEND_CANISTER_ID)
    ).getGolfCourses(e);
    if (L(o)) throw new Error("Failed to get golf courses");
    return o.ok;
  }
}
function pt() {
  const { subscribe: f, set: e } = st([]);
  async function g(a) {
    return await new T().getGolfCourse(a);
  }
  async function o(a) {
    return await new T().getGolfCourses(a);
  }
  return {
    subscribe: f,
    setCourse: (a) => e(a),
    getGolfCourse: g,
    getGolfCourses: o,
  };
}
const mt = pt();
function _t(f, e) {
  ut(e, "golfCourse", 8);
}
var dt = S("<p>No golf courses found.</p>"),
  Ct = S("<!> <!>", 1),
  vt = S("<p>Error loading golf courses.</p>");
function Tt(f, e) {
  X(e, !1);
  const [g, o] = rt(),
    a = () => at(G, "$authStore", g);
  let y = w(!0),
    r = w(null),
    p = w(1n),
    h = w(1n);
  nt(async () => {
    E();
  });
  function B() {
    P("/golf-courses/create");
  }
  async function F(m) {
    const s = Number(t(p)) + m;
    s >= 1 && s <= Number(t(h)) && (c(p, BigInt(s)), await E());
  }
  async function E() {
    c(y, !0);
    try {
      const s = a().identity?.getPrincipal();
      if (!s) {
        P("/");
        return;
      }
      let _ = { page: t(p), user_id: s.toString(), searchTerm: "" };
      c(r, await mt.getGolfCourses(_)),
        t(r)?.total &&
          t(r)?.pageSize &&
          c(h, BigInt(Math.ceil(Number(t(r).total) / Number(t(r).pageSize))));
    } catch {
      lt.addToast({ type: "error", message: "Error loading golf courses." }),
        c(r, null);
    } finally {
      c(y, !1);
    }
  }
  W(),
    it(f, {
      children: (m, s) => {
        var _ = b(),
          R = v(_);
        {
          var k = (n) => {
              gt(n);
            },
            O = (n) => {
              ct(n, {
                title: "GOLF COURSES",
                buttonTitle: "ADD GOLF COURSE",
                buttonCallback: B,
                children: (q, wt) => {
                  var N = b(),
                    x = v(N);
                  {
                    var z = (i) => {
                        var d = Ct(),
                          I = v(d);
                        {
                          var M = (l) => {
                              var C = b(),
                                J = v(C);
                              et(
                                J,
                                1,
                                () => t(r)?.entries,
                                ot,
                                (Q, V) => {
                                  _t(Q, {
                                    get golfCourse() {
                                      return t(V);
                                    },
                                  });
                                },
                              ),
                                u(l, C);
                            },
                            U = (l) => {
                              var C = dt();
                              u(l, C);
                            };
                          A(I, (l) => {
                            t(r).entries.length > 0 ? l(M) : l(U, !1);
                          });
                        }
                        var j = Z(I, 2);
                        const H = tt(() => Number(t(p)));
                        ft(j, {
                          changePage: F,
                          get currentPage() {
                            return t(H);
                          },
                          get totalPages() {
                            return t(h);
                          },
                        }),
                          u(i, d);
                      },
                      K = (i) => {
                        var d = vt();
                        u(i, d);
                      };
                    A(x, (i) => {
                      t(r) ? i(z) : i(K, !1);
                    });
                  }
                  u(q, N);
                },
                $$slots: { default: !0 },
              });
            };
          A(R, (n) => {
            t(y) ? n(k) : n(O, !1);
          });
        }
        u(m, _);
      },
      $$slots: { default: !0 },
    }),
    Y(),
    o();
}
export { Tt as component };

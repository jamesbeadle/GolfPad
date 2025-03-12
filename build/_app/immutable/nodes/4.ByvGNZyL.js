import { t as g, a as u } from "../chunks/CfcDVdrG.js";
import { i as $ } from "../chunks/Bv5W8DTh.js";
import { p as d, a as _, f as h, B as v, s as P } from "../chunks/CxN_vpku.js";
import { e as b, i as w } from "../chunks/H0vPu0gU.js";
import { g as L } from "../chunks/Bxzzj_Yl.js";
import { p as s } from "../chunks/CWiu2rbl.js";
import { L as E } from "../chunks/C2-k5s9i.js";
import { L as G } from "../chunks/CIYIwWpX.js";
function x(t, a) {
  s(a, "game", 8);
}
function y(t, a) {
  s(a, "changePage", 8);
}
var A = g("<!> <!>", 1);
function z(t, a) {
  d(a, !1);
  let n = [];
  function i() {
    L("/games/create");
  }
  function m(o) {}
  $(),
    G(t, {
      children: (o, M) => {
        E(o, {
          title: "GAMES",
          buttonTitle: "NEW GAME",
          buttonCallback: i,
          children: (p, N) => {
            var e = A(),
              r = h(e);
            b(
              r,
              1,
              () => n,
              w,
              (l, c) => {
                x(l, {
                  get game() {
                    return v(c);
                  },
                });
              },
            );
            var f = P(r, 2);
            y(f, { changePage: m }), u(p, e);
          },
          $$slots: { default: !0 },
        });
      },
      $$slots: { default: !0 },
    }),
    _();
}
export { z as component };

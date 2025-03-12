import { c as s, a as i } from "../chunks/BMmDdByd.js";
import {
  g as f,
  E as p,
  i as c,
  a0 as d,
  Q as m,
  h,
  k as l,
  f as u,
} from "../chunks/-IhJ7JpO.js";
function v(t, e, ...a) {
  var n = t,
    o = d,
    r;
  f(() => {
    o !== (o = e()) && (r && (m(r), (r = null)), (r = c(() => o(n, ...a))));
  }, p),
    h && (n = l);
}
function E(t, e) {
  var a = s(),
    n = u(a);
  v(n, () => e.children), i(t, a);
}
export { E as component };

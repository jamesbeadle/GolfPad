import { e as b, b as t, u as S, q as h, S as k } from "./CxN_vpku.js";
function u(r, i) {
  return r === i || r?.[k] === i;
}
function c(r = {}, i, a, q) {
  return (
    b(() => {
      var f, s;
      return (
        t(() => {
          (f = s),
            (s = []),
            S(() => {
              r !== a(...s) &&
                (i(r, ...s), f && u(a(...f), r) && i(null, ...f));
            });
        }),
        () => {
          h(() => {
            s && u(a(...s), r) && i(null, ...s);
          });
        }
      );
    }),
    r
  );
}
export { c as b };

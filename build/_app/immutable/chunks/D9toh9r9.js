import { c as $r, g as fu, _ as lu } from "./Pz7IxoWS.js";
const qh = !1;
function Ko(t) {
  var e,
    r,
    n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var i = t.length;
      for (e = 0; e < i; e++)
        t[e] && (r = Ko(t[e])) && (n && (n += " "), (n += r));
    } else for (r in t) t[r] && (n && (n += " "), (n += r));
  return n;
}
function Vh() {
  for (var t, e, r = 0, n = "", i = arguments.length; r < i; r++)
    (t = arguments[r]) && (e = Ko(t)) && (n && (n += " "), (n += e));
  return n;
}
var zo = {},
  hn = {};
hn.byteLength = pu;
hn.toByteArray = wu;
hn.fromByteArray = bu;
var Ut = [],
  lt = [],
  hu = typeof Uint8Array < "u" ? Uint8Array : Array,
  Pi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Er = 0, du = Pi.length; Er < du; ++Er)
  (Ut[Er] = Pi[Er]), (lt[Pi.charCodeAt(Er)] = Er);
lt[45] = 62;
lt[95] = 63;
function Lo(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = e);
  var n = r === e ? 0 : 4 - (r % 4);
  return [r, n];
}
function pu(t) {
  var e = Lo(t),
    r = e[0],
    n = e[1];
  return ((r + n) * 3) / 4 - n;
}
function yu(t, e, r) {
  return ((e + r) * 3) / 4 - r;
}
function wu(t) {
  var e,
    r = Lo(t),
    n = r[0],
    i = r[1],
    o = new hu(yu(t, n, i)),
    l = 0,
    a = i > 0 ? n - 4 : n,
    p;
  for (p = 0; p < a; p += 4)
    (e =
      (lt[t.charCodeAt(p)] << 18) |
      (lt[t.charCodeAt(p + 1)] << 12) |
      (lt[t.charCodeAt(p + 2)] << 6) |
      lt[t.charCodeAt(p + 3)]),
      (o[l++] = (e >> 16) & 255),
      (o[l++] = (e >> 8) & 255),
      (o[l++] = e & 255);
  return (
    i === 2 &&
      ((e = (lt[t.charCodeAt(p)] << 2) | (lt[t.charCodeAt(p + 1)] >> 4)),
      (o[l++] = e & 255)),
    i === 1 &&
      ((e =
        (lt[t.charCodeAt(p)] << 10) |
        (lt[t.charCodeAt(p + 1)] << 4) |
        (lt[t.charCodeAt(p + 2)] >> 2)),
      (o[l++] = (e >> 8) & 255),
      (o[l++] = e & 255)),
    o
  );
}
function gu(t) {
  return (
    Ut[(t >> 18) & 63] + Ut[(t >> 12) & 63] + Ut[(t >> 6) & 63] + Ut[t & 63]
  );
}
function mu(t, e, r) {
  for (var n, i = [], o = e; o < r; o += 3)
    (n =
      ((t[o] << 16) & 16711680) + ((t[o + 1] << 8) & 65280) + (t[o + 2] & 255)),
      i.push(gu(n));
  return i.join("");
}
function bu(t) {
  for (
    var e, r = t.length, n = r % 3, i = [], o = 16383, l = 0, a = r - n;
    l < a;
    l += o
  )
    i.push(mu(t, l, l + o > a ? a : l + o));
  return (
    n === 1
      ? ((e = t[r - 1]), i.push(Ut[e >> 2] + Ut[(e << 4) & 63] + "=="))
      : n === 2 &&
        ((e = (t[r - 2] << 8) + t[r - 1]),
        i.push(Ut[e >> 10] + Ut[(e >> 4) & 63] + Ut[(e << 2) & 63] + "=")),
    i.join("")
  );
}
var dn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ dn.read =
  function (t, e, r, n, i) {
    var o,
      l,
      a = i * 8 - n - 1,
      p = (1 << a) - 1,
      g = p >> 1,
      E = -7,
      S = r ? i - 1 : 0,
      I = r ? -1 : 1,
      A = t[e + S];
    for (
      S += I, o = A & ((1 << -E) - 1), A >>= -E, E += a;
      E > 0;
      o = o * 256 + t[e + S], S += I, E -= 8
    );
    for (
      l = o & ((1 << -E) - 1), o >>= -E, E += n;
      E > 0;
      l = l * 256 + t[e + S], S += I, E -= 8
    );
    if (o === 0) o = 1 - g;
    else {
      if (o === p) return l ? NaN : (A ? -1 : 1) * (1 / 0);
      (l = l + Math.pow(2, n)), (o = o - g);
    }
    return (A ? -1 : 1) * l * Math.pow(2, o - n);
  };
dn.write = function (t, e, r, n, i, o) {
  var l,
    a,
    p,
    g = o * 8 - i - 1,
    E = (1 << g) - 1,
    S = E >> 1,
    I = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    A = n ? 0 : o - 1,
    w = n ? 1 : -1,
    $ = e < 0 || (e === 0 && 1 / e < 0) ? 1 : 0;
  for (
    e = Math.abs(e),
      isNaN(e) || e === 1 / 0
        ? ((a = isNaN(e) ? 1 : 0), (l = E))
        : ((l = Math.floor(Math.log(e) / Math.LN2)),
          e * (p = Math.pow(2, -l)) < 1 && (l--, (p *= 2)),
          l + S >= 1 ? (e += I / p) : (e += I * Math.pow(2, 1 - S)),
          e * p >= 2 && (l++, (p /= 2)),
          l + S >= E
            ? ((a = 0), (l = E))
            : l + S >= 1
              ? ((a = (e * p - 1) * Math.pow(2, i)), (l = l + S))
              : ((a = e * Math.pow(2, S - 1) * Math.pow(2, i)), (l = 0)));
    i >= 8;
    t[r + A] = a & 255, A += w, a /= 256, i -= 8
  );
  for (
    l = (l << i) | a, g += i;
    g > 0;
    t[r + A] = l & 255, A += w, l /= 256, g -= 8
  );
  t[r + A - w] |= $ * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (t) {
  const e = hn,
    r = dn,
    n =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (t.Buffer = a), (t.SlowBuffer = z), (t.INSPECT_MAX_BYTES = 50);
  const i = 2147483647;
  (t.kMaxLength = i),
    (a.TYPED_ARRAY_SUPPORT = o()),
    !a.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function o() {
    try {
      const d = new Uint8Array(1),
        u = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(u, Uint8Array.prototype),
        Object.setPrototypeOf(d, u),
        d.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(a.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (a.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(a.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (a.isBuffer(this)) return this.byteOffset;
      },
    });
  function l(d) {
    if (d > i)
      throw new RangeError(
        'The value "' + d + '" is invalid for option "size"',
      );
    const u = new Uint8Array(d);
    return Object.setPrototypeOf(u, a.prototype), u;
  }
  function a(d, u, f) {
    if (typeof d == "number") {
      if (typeof u == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return S(d);
    }
    return p(d, u, f);
  }
  a.poolSize = 8192;
  function p(d, u, f) {
    if (typeof d == "string") return I(d, u);
    if (ArrayBuffer.isView(d)) return w(d);
    if (d == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof d,
      );
    if (
      V(d, ArrayBuffer) ||
      (d && V(d.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (V(d, SharedArrayBuffer) || (d && V(d.buffer, SharedArrayBuffer))))
    )
      return $(d, u, f);
    if (typeof d == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    const v = d.valueOf && d.valueOf();
    if (v != null && v !== d) return a.from(v, u, f);
    const F = C(d);
    if (F) return F;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof d[Symbol.toPrimitive] == "function"
    )
      return a.from(d[Symbol.toPrimitive]("string"), u, f);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof d,
    );
  }
  (a.from = function (d, u, f) {
    return p(d, u, f);
  }),
    Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(a, Uint8Array);
  function g(d) {
    if (typeof d != "number")
      throw new TypeError('"size" argument must be of type number');
    if (d < 0)
      throw new RangeError(
        'The value "' + d + '" is invalid for option "size"',
      );
  }
  function E(d, u, f) {
    return (
      g(d),
      d <= 0
        ? l(d)
        : u !== void 0
          ? typeof f == "string"
            ? l(d).fill(u, f)
            : l(d).fill(u)
          : l(d)
    );
  }
  a.alloc = function (d, u, f) {
    return E(d, u, f);
  };
  function S(d) {
    return g(d), l(d < 0 ? 0 : W(d) | 0);
  }
  (a.allocUnsafe = function (d) {
    return S(d);
  }),
    (a.allocUnsafeSlow = function (d) {
      return S(d);
    });
  function I(d, u) {
    if (((typeof u != "string" || u === "") && (u = "utf8"), !a.isEncoding(u)))
      throw new TypeError("Unknown encoding: " + u);
    const f = q(d, u) | 0;
    let v = l(f);
    const F = v.write(d, u);
    return F !== f && (v = v.slice(0, F)), v;
  }
  function A(d) {
    const u = d.length < 0 ? 0 : W(d.length) | 0,
      f = l(u);
    for (let v = 0; v < u; v += 1) f[v] = d[v] & 255;
    return f;
  }
  function w(d) {
    if (V(d, Uint8Array)) {
      const u = new Uint8Array(d);
      return $(u.buffer, u.byteOffset, u.byteLength);
    }
    return A(d);
  }
  function $(d, u, f) {
    if (u < 0 || d.byteLength < u)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (d.byteLength < u + (f || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let v;
    return (
      u === void 0 && f === void 0
        ? (v = new Uint8Array(d))
        : f === void 0
          ? (v = new Uint8Array(d, u))
          : (v = new Uint8Array(d, u, f)),
      Object.setPrototypeOf(v, a.prototype),
      v
    );
  }
  function C(d) {
    if (a.isBuffer(d)) {
      const u = W(d.length) | 0,
        f = l(u);
      return f.length === 0 || d.copy(f, 0, 0, u), f;
    }
    if (d.length !== void 0)
      return typeof d.length != "number" || ne(d.length) ? l(0) : A(d);
    if (d.type === "Buffer" && Array.isArray(d.data)) return A(d.data);
  }
  function W(d) {
    if (d >= i)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          i.toString(16) +
          " bytes",
      );
    return d | 0;
  }
  function z(d) {
    return +d != d && (d = 0), a.alloc(+d);
  }
  (a.isBuffer = function (u) {
    return u != null && u._isBuffer === !0 && u !== a.prototype;
  }),
    (a.compare = function (u, f) {
      if (
        (V(u, Uint8Array) && (u = a.from(u, u.offset, u.byteLength)),
        V(f, Uint8Array) && (f = a.from(f, f.offset, f.byteLength)),
        !a.isBuffer(u) || !a.isBuffer(f))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (u === f) return 0;
      let v = u.length,
        F = f.length;
      for (let K = 0, H = Math.min(v, F); K < H; ++K)
        if (u[K] !== f[K]) {
          (v = u[K]), (F = f[K]);
          break;
        }
      return v < F ? -1 : F < v ? 1 : 0;
    }),
    (a.isEncoding = function (u) {
      switch (String(u).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (a.concat = function (u, f) {
      if (!Array.isArray(u))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (u.length === 0) return a.alloc(0);
      let v;
      if (f === void 0) for (f = 0, v = 0; v < u.length; ++v) f += u[v].length;
      const F = a.allocUnsafe(f);
      let K = 0;
      for (v = 0; v < u.length; ++v) {
        let H = u[v];
        if (V(H, Uint8Array))
          K + H.length > F.length
            ? (a.isBuffer(H) || (H = a.from(H)), H.copy(F, K))
            : Uint8Array.prototype.set.call(F, H, K);
        else if (a.isBuffer(H)) H.copy(F, K);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        K += H.length;
      }
      return F;
    });
  function q(d, u) {
    if (a.isBuffer(d)) return d.length;
    if (ArrayBuffer.isView(d) || V(d, ArrayBuffer)) return d.byteLength;
    if (typeof d != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof d,
      );
    const f = d.length,
      v = arguments.length > 2 && arguments[2] === !0;
    if (!v && f === 0) return 0;
    let F = !1;
    for (;;)
      switch (u) {
        case "ascii":
        case "latin1":
        case "binary":
          return f;
        case "utf8":
        case "utf-8":
          return s(d).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return f * 2;
        case "hex":
          return f >>> 1;
        case "base64":
          return _(d).length;
        default:
          if (F) return v ? -1 : s(d).length;
          (u = ("" + u).toLowerCase()), (F = !0);
      }
  }
  a.byteLength = q;
  function re(d, u, f) {
    let v = !1;
    if (
      ((u === void 0 || u < 0) && (u = 0),
      u > this.length ||
        ((f === void 0 || f > this.length) && (f = this.length), f <= 0) ||
        ((f >>>= 0), (u >>>= 0), f <= u))
    )
      return "";
    for (d || (d = "utf8"); ; )
      switch (d) {
        case "hex":
          return ie(this, u, f);
        case "utf8":
        case "utf-8":
          return U(this, u, f);
        case "ascii":
          return G(this, u, f);
        case "latin1":
        case "binary":
          return D(this, u, f);
        case "base64":
          return N(this, u, f);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ge(this, u, f);
        default:
          if (v) throw new TypeError("Unknown encoding: " + d);
          (d = (d + "").toLowerCase()), (v = !0);
      }
  }
  a.prototype._isBuffer = !0;
  function P(d, u, f) {
    const v = d[u];
    (d[u] = d[f]), (d[f] = v);
  }
  (a.prototype.swap16 = function () {
    const u = this.length;
    if (u % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let f = 0; f < u; f += 2) P(this, f, f + 1);
    return this;
  }),
    (a.prototype.swap32 = function () {
      const u = this.length;
      if (u % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let f = 0; f < u; f += 4) P(this, f, f + 3), P(this, f + 1, f + 2);
      return this;
    }),
    (a.prototype.swap64 = function () {
      const u = this.length;
      if (u % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let f = 0; f < u; f += 8)
        P(this, f, f + 7),
          P(this, f + 1, f + 6),
          P(this, f + 2, f + 5),
          P(this, f + 3, f + 4);
      return this;
    }),
    (a.prototype.toString = function () {
      const u = this.length;
      return u === 0
        ? ""
        : arguments.length === 0
          ? U(this, 0, u)
          : re.apply(this, arguments);
    }),
    (a.prototype.toLocaleString = a.prototype.toString),
    (a.prototype.equals = function (u) {
      if (!a.isBuffer(u)) throw new TypeError("Argument must be a Buffer");
      return this === u ? !0 : a.compare(this, u) === 0;
    }),
    (a.prototype.inspect = function () {
      let u = "";
      const f = t.INSPECT_MAX_BYTES;
      return (
        (u = this.toString("hex", 0, f)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > f && (u += " ... "),
        "<Buffer " + u + ">"
      );
    }),
    n && (a.prototype[n] = a.prototype.inspect),
    (a.prototype.compare = function (u, f, v, F, K) {
      if (
        (V(u, Uint8Array) && (u = a.from(u, u.offset, u.byteLength)),
        !a.isBuffer(u))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof u,
        );
      if (
        (f === void 0 && (f = 0),
        v === void 0 && (v = u ? u.length : 0),
        F === void 0 && (F = 0),
        K === void 0 && (K = this.length),
        f < 0 || v > u.length || F < 0 || K > this.length)
      )
        throw new RangeError("out of range index");
      if (F >= K && f >= v) return 0;
      if (F >= K) return -1;
      if (f >= v) return 1;
      if (((f >>>= 0), (v >>>= 0), (F >>>= 0), (K >>>= 0), this === u))
        return 0;
      let H = K - F,
        _e = v - f;
      const Be = Math.min(H, _e),
        Ee = this.slice(F, K),
        be = u.slice(f, v);
      for (let Re = 0; Re < Be; ++Re)
        if (Ee[Re] !== be[Re]) {
          (H = Ee[Re]), (_e = be[Re]);
          break;
        }
      return H < _e ? -1 : _e < H ? 1 : 0;
    });
  function Z(d, u, f, v, F) {
    if (d.length === 0) return -1;
    if (
      (typeof f == "string"
        ? ((v = f), (f = 0))
        : f > 2147483647
          ? (f = 2147483647)
          : f < -2147483648 && (f = -2147483648),
      (f = +f),
      ne(f) && (f = F ? 0 : d.length - 1),
      f < 0 && (f = d.length + f),
      f >= d.length)
    ) {
      if (F) return -1;
      f = d.length - 1;
    } else if (f < 0)
      if (F) f = 0;
      else return -1;
    if ((typeof u == "string" && (u = a.from(u, v)), a.isBuffer(u)))
      return u.length === 0 ? -1 : Y(d, u, f, v, F);
    if (typeof u == "number")
      return (
        (u = u & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? F
            ? Uint8Array.prototype.indexOf.call(d, u, f)
            : Uint8Array.prototype.lastIndexOf.call(d, u, f)
          : Y(d, [u], f, v, F)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function Y(d, u, f, v, F) {
    let K = 1,
      H = d.length,
      _e = u.length;
    if (
      v !== void 0 &&
      ((v = String(v).toLowerCase()),
      v === "ucs2" || v === "ucs-2" || v === "utf16le" || v === "utf-16le")
    ) {
      if (d.length < 2 || u.length < 2) return -1;
      (K = 2), (H /= 2), (_e /= 2), (f /= 2);
    }
    function Be(be, Re) {
      return K === 1 ? be[Re] : be.readUInt16BE(Re * K);
    }
    let Ee;
    if (F) {
      let be = -1;
      for (Ee = f; Ee < H; Ee++)
        if (Be(d, Ee) === Be(u, be === -1 ? 0 : Ee - be)) {
          if ((be === -1 && (be = Ee), Ee - be + 1 === _e)) return be * K;
        } else be !== -1 && (Ee -= Ee - be), (be = -1);
    } else
      for (f + _e > H && (f = H - _e), Ee = f; Ee >= 0; Ee--) {
        let be = !0;
        for (let Re = 0; Re < _e; Re++)
          if (Be(d, Ee + Re) !== Be(u, Re)) {
            be = !1;
            break;
          }
        if (be) return Ee;
      }
    return -1;
  }
  (a.prototype.includes = function (u, f, v) {
    return this.indexOf(u, f, v) !== -1;
  }),
    (a.prototype.indexOf = function (u, f, v) {
      return Z(this, u, f, v, !0);
    }),
    (a.prototype.lastIndexOf = function (u, f, v) {
      return Z(this, u, f, v, !1);
    });
  function J(d, u, f, v) {
    f = Number(f) || 0;
    const F = d.length - f;
    v ? ((v = Number(v)), v > F && (v = F)) : (v = F);
    const K = u.length;
    v > K / 2 && (v = K / 2);
    let H;
    for (H = 0; H < v; ++H) {
      const _e = parseInt(u.substr(H * 2, 2), 16);
      if (ne(_e)) return H;
      d[f + H] = _e;
    }
    return H;
  }
  function Q(d, u, f, v) {
    return T(s(u, d.length - f), d, f, v);
  }
  function X(d, u, f, v) {
    return T(c(u), d, f, v);
  }
  function he(d, u, f, v) {
    return T(_(u), d, f, v);
  }
  function le(d, u, f, v) {
    return T(y(u, d.length - f), d, f, v);
  }
  (a.prototype.write = function (u, f, v, F) {
    if (f === void 0) (F = "utf8"), (v = this.length), (f = 0);
    else if (v === void 0 && typeof f == "string")
      (F = f), (v = this.length), (f = 0);
    else if (isFinite(f))
      (f = f >>> 0),
        isFinite(v)
          ? ((v = v >>> 0), F === void 0 && (F = "utf8"))
          : ((F = v), (v = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    const K = this.length - f;
    if (
      ((v === void 0 || v > K) && (v = K),
      (u.length > 0 && (v < 0 || f < 0)) || f > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    F || (F = "utf8");
    let H = !1;
    for (;;)
      switch (F) {
        case "hex":
          return J(this, u, f, v);
        case "utf8":
        case "utf-8":
          return Q(this, u, f, v);
        case "ascii":
        case "latin1":
        case "binary":
          return X(this, u, f, v);
        case "base64":
          return he(this, u, f, v);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return le(this, u, f, v);
        default:
          if (H) throw new TypeError("Unknown encoding: " + F);
          (F = ("" + F).toLowerCase()), (H = !0);
      }
  }),
    (a.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function N(d, u, f) {
    return u === 0 && f === d.length
      ? e.fromByteArray(d)
      : e.fromByteArray(d.slice(u, f));
  }
  function U(d, u, f) {
    f = Math.min(d.length, f);
    const v = [];
    let F = u;
    for (; F < f; ) {
      const K = d[F];
      let H = null,
        _e = K > 239 ? 4 : K > 223 ? 3 : K > 191 ? 2 : 1;
      if (F + _e <= f) {
        let Be, Ee, be, Re;
        switch (_e) {
          case 1:
            K < 128 && (H = K);
            break;
          case 2:
            (Be = d[F + 1]),
              (Be & 192) === 128 &&
                ((Re = ((K & 31) << 6) | (Be & 63)), Re > 127 && (H = Re));
            break;
          case 3:
            (Be = d[F + 1]),
              (Ee = d[F + 2]),
              (Be & 192) === 128 &&
                (Ee & 192) === 128 &&
                ((Re = ((K & 15) << 12) | ((Be & 63) << 6) | (Ee & 63)),
                Re > 2047 && (Re < 55296 || Re > 57343) && (H = Re));
            break;
          case 4:
            (Be = d[F + 1]),
              (Ee = d[F + 2]),
              (be = d[F + 3]),
              (Be & 192) === 128 &&
                (Ee & 192) === 128 &&
                (be & 192) === 128 &&
                ((Re =
                  ((K & 15) << 18) |
                  ((Be & 63) << 12) |
                  ((Ee & 63) << 6) |
                  (be & 63)),
                Re > 65535 && Re < 1114112 && (H = Re));
        }
      }
      H === null
        ? ((H = 65533), (_e = 1))
        : H > 65535 &&
          ((H -= 65536),
          v.push(((H >>> 10) & 1023) | 55296),
          (H = 56320 | (H & 1023))),
        v.push(H),
        (F += _e);
    }
    return j(v);
  }
  const L = 4096;
  function j(d) {
    const u = d.length;
    if (u <= L) return String.fromCharCode.apply(String, d);
    let f = "",
      v = 0;
    for (; v < u; )
      f += String.fromCharCode.apply(String, d.slice(v, (v += L)));
    return f;
  }
  function G(d, u, f) {
    let v = "";
    f = Math.min(d.length, f);
    for (let F = u; F < f; ++F) v += String.fromCharCode(d[F] & 127);
    return v;
  }
  function D(d, u, f) {
    let v = "";
    f = Math.min(d.length, f);
    for (let F = u; F < f; ++F) v += String.fromCharCode(d[F]);
    return v;
  }
  function ie(d, u, f) {
    const v = d.length;
    (!u || u < 0) && (u = 0), (!f || f < 0 || f > v) && (f = v);
    let F = "";
    for (let K = u; K < f; ++K) F += pe[d[K]];
    return F;
  }
  function ge(d, u, f) {
    const v = d.slice(u, f);
    let F = "";
    for (let K = 0; K < v.length - 1; K += 2)
      F += String.fromCharCode(v[K] + v[K + 1] * 256);
    return F;
  }
  a.prototype.slice = function (u, f) {
    const v = this.length;
    (u = ~~u),
      (f = f === void 0 ? v : ~~f),
      u < 0 ? ((u += v), u < 0 && (u = 0)) : u > v && (u = v),
      f < 0 ? ((f += v), f < 0 && (f = 0)) : f > v && (f = v),
      f < u && (f = u);
    const F = this.subarray(u, f);
    return Object.setPrototypeOf(F, a.prototype), F;
  };
  function oe(d, u, f) {
    if (d % 1 !== 0 || d < 0) throw new RangeError("offset is not uint");
    if (d + u > f)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (a.prototype.readUintLE = a.prototype.readUIntLE =
    function (u, f, v) {
      (u = u >>> 0), (f = f >>> 0), v || oe(u, f, this.length);
      let F = this[u],
        K = 1,
        H = 0;
      for (; ++H < f && (K *= 256); ) F += this[u + H] * K;
      return F;
    }),
    (a.prototype.readUintBE = a.prototype.readUIntBE =
      function (u, f, v) {
        (u = u >>> 0), (f = f >>> 0), v || oe(u, f, this.length);
        let F = this[u + --f],
          K = 1;
        for (; f > 0 && (K *= 256); ) F += this[u + --f] * K;
        return F;
      }),
    (a.prototype.readUint8 = a.prototype.readUInt8 =
      function (u, f) {
        return (u = u >>> 0), f || oe(u, 1, this.length), this[u];
      }),
    (a.prototype.readUint16LE = a.prototype.readUInt16LE =
      function (u, f) {
        return (
          (u = u >>> 0),
          f || oe(u, 2, this.length),
          this[u] | (this[u + 1] << 8)
        );
      }),
    (a.prototype.readUint16BE = a.prototype.readUInt16BE =
      function (u, f) {
        return (
          (u = u >>> 0),
          f || oe(u, 2, this.length),
          (this[u] << 8) | this[u + 1]
        );
      }),
    (a.prototype.readUint32LE = a.prototype.readUInt32LE =
      function (u, f) {
        return (
          (u = u >>> 0),
          f || oe(u, 4, this.length),
          (this[u] | (this[u + 1] << 8) | (this[u + 2] << 16)) +
            this[u + 3] * 16777216
        );
      }),
    (a.prototype.readUint32BE = a.prototype.readUInt32BE =
      function (u, f) {
        return (
          (u = u >>> 0),
          f || oe(u, 4, this.length),
          this[u] * 16777216 +
            ((this[u + 1] << 16) | (this[u + 2] << 8) | this[u + 3])
        );
      }),
    (a.prototype.readBigUInt64LE = ye(function (u) {
      (u = u >>> 0), k(u, "offset");
      const f = this[u],
        v = this[u + 7];
      (f === void 0 || v === void 0) && O(u, this.length - 8);
      const F =
          f + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24,
        K = this[++u] + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + v * 2 ** 24;
      return BigInt(F) + (BigInt(K) << BigInt(32));
    })),
    (a.prototype.readBigUInt64BE = ye(function (u) {
      (u = u >>> 0), k(u, "offset");
      const f = this[u],
        v = this[u + 7];
      (f === void 0 || v === void 0) && O(u, this.length - 8);
      const F =
          f * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u],
        K = this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + v;
      return (BigInt(F) << BigInt(32)) + BigInt(K);
    })),
    (a.prototype.readIntLE = function (u, f, v) {
      (u = u >>> 0), (f = f >>> 0), v || oe(u, f, this.length);
      let F = this[u],
        K = 1,
        H = 0;
      for (; ++H < f && (K *= 256); ) F += this[u + H] * K;
      return (K *= 128), F >= K && (F -= Math.pow(2, 8 * f)), F;
    }),
    (a.prototype.readIntBE = function (u, f, v) {
      (u = u >>> 0), (f = f >>> 0), v || oe(u, f, this.length);
      let F = f,
        K = 1,
        H = this[u + --F];
      for (; F > 0 && (K *= 256); ) H += this[u + --F] * K;
      return (K *= 128), H >= K && (H -= Math.pow(2, 8 * f)), H;
    }),
    (a.prototype.readInt8 = function (u, f) {
      return (
        (u = u >>> 0),
        f || oe(u, 1, this.length),
        this[u] & 128 ? (255 - this[u] + 1) * -1 : this[u]
      );
    }),
    (a.prototype.readInt16LE = function (u, f) {
      (u = u >>> 0), f || oe(u, 2, this.length);
      const v = this[u] | (this[u + 1] << 8);
      return v & 32768 ? v | 4294901760 : v;
    }),
    (a.prototype.readInt16BE = function (u, f) {
      (u = u >>> 0), f || oe(u, 2, this.length);
      const v = this[u + 1] | (this[u] << 8);
      return v & 32768 ? v | 4294901760 : v;
    }),
    (a.prototype.readInt32LE = function (u, f) {
      return (
        (u = u >>> 0),
        f || oe(u, 4, this.length),
        this[u] | (this[u + 1] << 8) | (this[u + 2] << 16) | (this[u + 3] << 24)
      );
    }),
    (a.prototype.readInt32BE = function (u, f) {
      return (
        (u = u >>> 0),
        f || oe(u, 4, this.length),
        (this[u] << 24) | (this[u + 1] << 16) | (this[u + 2] << 8) | this[u + 3]
      );
    }),
    (a.prototype.readBigInt64LE = ye(function (u) {
      (u = u >>> 0), k(u, "offset");
      const f = this[u],
        v = this[u + 7];
      (f === void 0 || v === void 0) && O(u, this.length - 8);
      const F =
        this[u + 4] + this[u + 5] * 2 ** 8 + this[u + 6] * 2 ** 16 + (v << 24);
      return (
        (BigInt(F) << BigInt(32)) +
        BigInt(
          f + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24,
        )
      );
    })),
    (a.prototype.readBigInt64BE = ye(function (u) {
      (u = u >>> 0), k(u, "offset");
      const f = this[u],
        v = this[u + 7];
      (f === void 0 || v === void 0) && O(u, this.length - 8);
      const F =
        (f << 24) + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u];
      return (
        (BigInt(F) << BigInt(32)) +
        BigInt(
          this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + v,
        )
      );
    })),
    (a.prototype.readFloatLE = function (u, f) {
      return (
        (u = u >>> 0), f || oe(u, 4, this.length), r.read(this, u, !0, 23, 4)
      );
    }),
    (a.prototype.readFloatBE = function (u, f) {
      return (
        (u = u >>> 0), f || oe(u, 4, this.length), r.read(this, u, !1, 23, 4)
      );
    }),
    (a.prototype.readDoubleLE = function (u, f) {
      return (
        (u = u >>> 0), f || oe(u, 8, this.length), r.read(this, u, !0, 52, 8)
      );
    }),
    (a.prototype.readDoubleBE = function (u, f) {
      return (
        (u = u >>> 0), f || oe(u, 8, this.length), r.read(this, u, !1, 52, 8)
      );
    });
  function fe(d, u, f, v, F, K) {
    if (!a.isBuffer(d))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (u > F || u < K)
      throw new RangeError('"value" argument is out of bounds');
    if (f + v > d.length) throw new RangeError("Index out of range");
  }
  (a.prototype.writeUintLE = a.prototype.writeUIntLE =
    function (u, f, v, F) {
      if (((u = +u), (f = f >>> 0), (v = v >>> 0), !F)) {
        const _e = Math.pow(2, 8 * v) - 1;
        fe(this, u, f, v, _e, 0);
      }
      let K = 1,
        H = 0;
      for (this[f] = u & 255; ++H < v && (K *= 256); )
        this[f + H] = (u / K) & 255;
      return f + v;
    }),
    (a.prototype.writeUintBE = a.prototype.writeUIntBE =
      function (u, f, v, F) {
        if (((u = +u), (f = f >>> 0), (v = v >>> 0), !F)) {
          const _e = Math.pow(2, 8 * v) - 1;
          fe(this, u, f, v, _e, 0);
        }
        let K = v - 1,
          H = 1;
        for (this[f + K] = u & 255; --K >= 0 && (H *= 256); )
          this[f + K] = (u / H) & 255;
        return f + v;
      }),
    (a.prototype.writeUint8 = a.prototype.writeUInt8 =
      function (u, f, v) {
        return (
          (u = +u),
          (f = f >>> 0),
          v || fe(this, u, f, 1, 255, 0),
          (this[f] = u & 255),
          f + 1
        );
      }),
    (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
      function (u, f, v) {
        return (
          (u = +u),
          (f = f >>> 0),
          v || fe(this, u, f, 2, 65535, 0),
          (this[f] = u & 255),
          (this[f + 1] = u >>> 8),
          f + 2
        );
      }),
    (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
      function (u, f, v) {
        return (
          (u = +u),
          (f = f >>> 0),
          v || fe(this, u, f, 2, 65535, 0),
          (this[f] = u >>> 8),
          (this[f + 1] = u & 255),
          f + 2
        );
      }),
    (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
      function (u, f, v) {
        return (
          (u = +u),
          (f = f >>> 0),
          v || fe(this, u, f, 4, 4294967295, 0),
          (this[f + 3] = u >>> 24),
          (this[f + 2] = u >>> 16),
          (this[f + 1] = u >>> 8),
          (this[f] = u & 255),
          f + 4
        );
      }),
    (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
      function (u, f, v) {
        return (
          (u = +u),
          (f = f >>> 0),
          v || fe(this, u, f, 4, 4294967295, 0),
          (this[f] = u >>> 24),
          (this[f + 1] = u >>> 16),
          (this[f + 2] = u >>> 8),
          (this[f + 3] = u & 255),
          f + 4
        );
      });
  function ee(d, u, f, v, F) {
    B(u, v, F, d, f, 7);
    let K = Number(u & BigInt(4294967295));
    (d[f++] = K),
      (K = K >> 8),
      (d[f++] = K),
      (K = K >> 8),
      (d[f++] = K),
      (K = K >> 8),
      (d[f++] = K);
    let H = Number((u >> BigInt(32)) & BigInt(4294967295));
    return (
      (d[f++] = H),
      (H = H >> 8),
      (d[f++] = H),
      (H = H >> 8),
      (d[f++] = H),
      (H = H >> 8),
      (d[f++] = H),
      f
    );
  }
  function m(d, u, f, v, F) {
    B(u, v, F, d, f, 7);
    let K = Number(u & BigInt(4294967295));
    (d[f + 7] = K),
      (K = K >> 8),
      (d[f + 6] = K),
      (K = K >> 8),
      (d[f + 5] = K),
      (K = K >> 8),
      (d[f + 4] = K);
    let H = Number((u >> BigInt(32)) & BigInt(4294967295));
    return (
      (d[f + 3] = H),
      (H = H >> 8),
      (d[f + 2] = H),
      (H = H >> 8),
      (d[f + 1] = H),
      (H = H >> 8),
      (d[f] = H),
      f + 8
    );
  }
  (a.prototype.writeBigUInt64LE = ye(function (u, f = 0) {
    return ee(this, u, f, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (a.prototype.writeBigUInt64BE = ye(function (u, f = 0) {
      return m(this, u, f, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (a.prototype.writeIntLE = function (u, f, v, F) {
      if (((u = +u), (f = f >>> 0), !F)) {
        const Be = Math.pow(2, 8 * v - 1);
        fe(this, u, f, v, Be - 1, -Be);
      }
      let K = 0,
        H = 1,
        _e = 0;
      for (this[f] = u & 255; ++K < v && (H *= 256); )
        u < 0 && _e === 0 && this[f + K - 1] !== 0 && (_e = 1),
          (this[f + K] = (((u / H) >> 0) - _e) & 255);
      return f + v;
    }),
    (a.prototype.writeIntBE = function (u, f, v, F) {
      if (((u = +u), (f = f >>> 0), !F)) {
        const Be = Math.pow(2, 8 * v - 1);
        fe(this, u, f, v, Be - 1, -Be);
      }
      let K = v - 1,
        H = 1,
        _e = 0;
      for (this[f + K] = u & 255; --K >= 0 && (H *= 256); )
        u < 0 && _e === 0 && this[f + K + 1] !== 0 && (_e = 1),
          (this[f + K] = (((u / H) >> 0) - _e) & 255);
      return f + v;
    }),
    (a.prototype.writeInt8 = function (u, f, v) {
      return (
        (u = +u),
        (f = f >>> 0),
        v || fe(this, u, f, 1, 127, -128),
        u < 0 && (u = 255 + u + 1),
        (this[f] = u & 255),
        f + 1
      );
    }),
    (a.prototype.writeInt16LE = function (u, f, v) {
      return (
        (u = +u),
        (f = f >>> 0),
        v || fe(this, u, f, 2, 32767, -32768),
        (this[f] = u & 255),
        (this[f + 1] = u >>> 8),
        f + 2
      );
    }),
    (a.prototype.writeInt16BE = function (u, f, v) {
      return (
        (u = +u),
        (f = f >>> 0),
        v || fe(this, u, f, 2, 32767, -32768),
        (this[f] = u >>> 8),
        (this[f + 1] = u & 255),
        f + 2
      );
    }),
    (a.prototype.writeInt32LE = function (u, f, v) {
      return (
        (u = +u),
        (f = f >>> 0),
        v || fe(this, u, f, 4, 2147483647, -2147483648),
        (this[f] = u & 255),
        (this[f + 1] = u >>> 8),
        (this[f + 2] = u >>> 16),
        (this[f + 3] = u >>> 24),
        f + 4
      );
    }),
    (a.prototype.writeInt32BE = function (u, f, v) {
      return (
        (u = +u),
        (f = f >>> 0),
        v || fe(this, u, f, 4, 2147483647, -2147483648),
        u < 0 && (u = 4294967295 + u + 1),
        (this[f] = u >>> 24),
        (this[f + 1] = u >>> 16),
        (this[f + 2] = u >>> 8),
        (this[f + 3] = u & 255),
        f + 4
      );
    }),
    (a.prototype.writeBigInt64LE = ye(function (u, f = 0) {
      return ee(
        this,
        u,
        f,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })),
    (a.prototype.writeBigInt64BE = ye(function (u, f = 0) {
      return m(
        this,
        u,
        f,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    }));
  function se(d, u, f, v, F, K) {
    if (f + v > d.length) throw new RangeError("Index out of range");
    if (f < 0) throw new RangeError("Index out of range");
  }
  function ue(d, u, f, v, F) {
    return (
      (u = +u),
      (f = f >>> 0),
      F || se(d, u, f, 4),
      r.write(d, u, f, v, 23, 4),
      f + 4
    );
  }
  (a.prototype.writeFloatLE = function (u, f, v) {
    return ue(this, u, f, !0, v);
  }),
    (a.prototype.writeFloatBE = function (u, f, v) {
      return ue(this, u, f, !1, v);
    });
  function de(d, u, f, v, F) {
    return (
      (u = +u),
      (f = f >>> 0),
      F || se(d, u, f, 8),
      r.write(d, u, f, v, 52, 8),
      f + 8
    );
  }
  (a.prototype.writeDoubleLE = function (u, f, v) {
    return de(this, u, f, !0, v);
  }),
    (a.prototype.writeDoubleBE = function (u, f, v) {
      return de(this, u, f, !1, v);
    }),
    (a.prototype.copy = function (u, f, v, F) {
      if (!a.isBuffer(u)) throw new TypeError("argument should be a Buffer");
      if (
        (v || (v = 0),
        !F && F !== 0 && (F = this.length),
        f >= u.length && (f = u.length),
        f || (f = 0),
        F > 0 && F < v && (F = v),
        F === v || u.length === 0 || this.length === 0)
      )
        return 0;
      if (f < 0) throw new RangeError("targetStart out of bounds");
      if (v < 0 || v >= this.length) throw new RangeError("Index out of range");
      if (F < 0) throw new RangeError("sourceEnd out of bounds");
      F > this.length && (F = this.length),
        u.length - f < F - v && (F = u.length - f + v);
      const K = F - v;
      return (
        this === u && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(f, v, F)
          : Uint8Array.prototype.set.call(u, this.subarray(v, F), f),
        K
      );
    }),
    (a.prototype.fill = function (u, f, v, F) {
      if (typeof u == "string") {
        if (
          (typeof f == "string"
            ? ((F = f), (f = 0), (v = this.length))
            : typeof v == "string" && ((F = v), (v = this.length)),
          F !== void 0 && typeof F != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof F == "string" && !a.isEncoding(F))
          throw new TypeError("Unknown encoding: " + F);
        if (u.length === 1) {
          const H = u.charCodeAt(0);
          ((F === "utf8" && H < 128) || F === "latin1") && (u = H);
        }
      } else
        typeof u == "number"
          ? (u = u & 255)
          : typeof u == "boolean" && (u = Number(u));
      if (f < 0 || this.length < f || this.length < v)
        throw new RangeError("Out of range index");
      if (v <= f) return this;
      (f = f >>> 0), (v = v === void 0 ? this.length : v >>> 0), u || (u = 0);
      let K;
      if (typeof u == "number") for (K = f; K < v; ++K) this[K] = u;
      else {
        const H = a.isBuffer(u) ? u : a.from(u, F),
          _e = H.length;
        if (_e === 0)
          throw new TypeError(
            'The value "' + u + '" is invalid for argument "value"',
          );
        for (K = 0; K < v - f; ++K) this[K + f] = H[K % _e];
      }
      return this;
    });
  const te = {};
  function ae(d, u, f) {
    te[d] = class extends f {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: u.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${d}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return d;
      }
      set code(F) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: F,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${d}]: ${this.message}`;
      }
    };
  }
  ae(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (d) {
      return d
        ? `${d} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  ),
    ae(
      "ERR_INVALID_ARG_TYPE",
      function (d, u) {
        return `The "${d}" argument must be of type number. Received type ${typeof u}`;
      },
      TypeError,
    ),
    ae(
      "ERR_OUT_OF_RANGE",
      function (d, u, f) {
        let v = `The value of "${d}" is out of range.`,
          F = f;
        return (
          Number.isInteger(f) && Math.abs(f) > 2 ** 32
            ? (F = b(String(f)))
            : typeof f == "bigint" &&
              ((F = String(f)),
              (f > BigInt(2) ** BigInt(32) || f < -(BigInt(2) ** BigInt(32))) &&
                (F = b(F)),
              (F += "n")),
          (v += ` It must be ${u}. Received ${F}`),
          v
        );
      },
      RangeError,
    );
  function b(d) {
    let u = "",
      f = d.length;
    const v = d[0] === "-" ? 1 : 0;
    for (; f >= v + 4; f -= 3) u = `_${d.slice(f - 3, f)}${u}`;
    return `${d.slice(0, f)}${u}`;
  }
  function x(d, u, f) {
    k(u, "offset"),
      (d[u] === void 0 || d[u + f] === void 0) && O(u, d.length - (f + 1));
  }
  function B(d, u, f, v, F, K) {
    if (d > f || d < u) {
      const H = typeof u == "bigint" ? "n" : "";
      let _e;
      throw (
        (u === 0 || u === BigInt(0)
          ? (_e = `>= 0${H} and < 2${H} ** ${(K + 1) * 8}${H}`)
          : (_e = `>= -(2${H} ** ${(K + 1) * 8 - 1}${H}) and < 2 ** ${(K + 1) * 8 - 1}${H}`),
        new te.ERR_OUT_OF_RANGE("value", _e, d))
      );
    }
    x(v, F, K);
  }
  function k(d, u) {
    if (typeof d != "number") throw new te.ERR_INVALID_ARG_TYPE(u, "number", d);
  }
  function O(d, u, f) {
    throw Math.floor(d) !== d
      ? (k(d, f), new te.ERR_OUT_OF_RANGE("offset", "an integer", d))
      : u < 0
        ? new te.ERR_BUFFER_OUT_OF_BOUNDS()
        : new te.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${u}`, d);
  }
  const M = /[^+/0-9A-Za-z-_]/g;
  function h(d) {
    if (((d = d.split("=")[0]), (d = d.trim().replace(M, "")), d.length < 2))
      return "";
    for (; d.length % 4 !== 0; ) d = d + "=";
    return d;
  }
  function s(d, u) {
    u = u || 1 / 0;
    let f;
    const v = d.length;
    let F = null;
    const K = [];
    for (let H = 0; H < v; ++H) {
      if (((f = d.charCodeAt(H)), f > 55295 && f < 57344)) {
        if (!F) {
          if (f > 56319) {
            (u -= 3) > -1 && K.push(239, 191, 189);
            continue;
          } else if (H + 1 === v) {
            (u -= 3) > -1 && K.push(239, 191, 189);
            continue;
          }
          F = f;
          continue;
        }
        if (f < 56320) {
          (u -= 3) > -1 && K.push(239, 191, 189), (F = f);
          continue;
        }
        f = (((F - 55296) << 10) | (f - 56320)) + 65536;
      } else F && (u -= 3) > -1 && K.push(239, 191, 189);
      if (((F = null), f < 128)) {
        if ((u -= 1) < 0) break;
        K.push(f);
      } else if (f < 2048) {
        if ((u -= 2) < 0) break;
        K.push((f >> 6) | 192, (f & 63) | 128);
      } else if (f < 65536) {
        if ((u -= 3) < 0) break;
        K.push((f >> 12) | 224, ((f >> 6) & 63) | 128, (f & 63) | 128);
      } else if (f < 1114112) {
        if ((u -= 4) < 0) break;
        K.push(
          (f >> 18) | 240,
          ((f >> 12) & 63) | 128,
          ((f >> 6) & 63) | 128,
          (f & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return K;
  }
  function c(d) {
    const u = [];
    for (let f = 0; f < d.length; ++f) u.push(d.charCodeAt(f) & 255);
    return u;
  }
  function y(d, u) {
    let f, v, F;
    const K = [];
    for (let H = 0; H < d.length && !((u -= 2) < 0); ++H)
      (f = d.charCodeAt(H)), (v = f >> 8), (F = f % 256), K.push(F), K.push(v);
    return K;
  }
  function _(d) {
    return e.toByteArray(h(d));
  }
  function T(d, u, f, v) {
    let F;
    for (F = 0; F < v && !(F + f >= u.length || F >= d.length); ++F)
      u[F + f] = d[F];
    return F;
  }
  function V(d, u) {
    return (
      d instanceof u ||
      (d != null &&
        d.constructor != null &&
        d.constructor.name != null &&
        d.constructor.name === u.name)
    );
  }
  function ne(d) {
    return d !== d;
  }
  const pe = (function () {
    const d = "0123456789abcdef",
      u = new Array(256);
    for (let f = 0; f < 16; ++f) {
      const v = f * 16;
      for (let F = 0; F < 16; ++F) u[v + F] = d[f] + d[F];
    }
    return u;
  })();
  function ye(d) {
    return typeof BigInt > "u" ? xe : d;
  }
  function xe() {
    throw new Error("BigInt not supported");
  }
})(zo);
function Ws(t) {
  const e = xu(t),
    r = new ArrayBuffer(e.length),
    n = new DataView(r);
  for (let i = 0; i < r.byteLength; i++) n.setUint8(i, e.charCodeAt(i));
  return r;
}
const _u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function xu(t) {
  t.length % 4 === 0 && (t = t.replace(/==?$/, ""));
  let e = "",
    r = 0,
    n = 0;
  for (let i = 0; i < t.length; i++)
    (r <<= 6),
      (r |= _u.indexOf(t[i])),
      (n += 6),
      n === 24 &&
        ((e += String.fromCharCode((r & 16711680) >> 16)),
        (e += String.fromCharCode((r & 65280) >> 8)),
        (e += String.fromCharCode(r & 255)),
        (r = n = 0));
  return (
    n === 12
      ? ((r >>= 4), (e += String.fromCharCode(r)))
      : n === 18 &&
        ((r >>= 2),
        (e += String.fromCharCode((r & 65280) >> 8)),
        (e += String.fromCharCode(r & 255))),
    e
  );
}
const Eu = -1,
  vu = -2,
  Au = -3,
  Bu = -4,
  Su = -5,
  Tu = -6;
function jh(t, e) {
  if (typeof t == "number") return i(t, !0);
  if (!Array.isArray(t) || t.length === 0) throw new Error("Invalid input");
  const r = t,
    n = Array(r.length);
  function i(o, l = !1) {
    if (o === Eu) return;
    if (o === Au) return NaN;
    if (o === Bu) return 1 / 0;
    if (o === Su) return -1 / 0;
    if (o === Tu) return -0;
    if (l) throw new Error("Invalid input");
    if (o in n) return n[o];
    const a = r[o];
    if (!a || typeof a != "object") n[o] = a;
    else if (Array.isArray(a))
      if (typeof a[0] == "string") {
        const p = a[0],
          g = e?.[p];
        if (g) return (n[o] = g(i(a[1])));
        switch (p) {
          case "Date":
            n[o] = new Date(a[1]);
            break;
          case "Set":
            const E = new Set();
            n[o] = E;
            for (let A = 1; A < a.length; A += 1) E.add(i(a[A]));
            break;
          case "Map":
            const S = new Map();
            n[o] = S;
            for (let A = 1; A < a.length; A += 2) S.set(i(a[A]), i(a[A + 1]));
            break;
          case "RegExp":
            n[o] = new RegExp(a[1], a[2]);
            break;
          case "Object":
            n[o] = Object(a[1]);
            break;
          case "BigInt":
            n[o] = BigInt(a[1]);
            break;
          case "null":
            const I = Object.create(null);
            n[o] = I;
            for (let A = 1; A < a.length; A += 2) I[a[A]] = i(a[A + 1]);
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const A = globalThis[p],
              w = a[1],
              $ = Ws(w),
              C = new A($);
            n[o] = C;
            break;
          }
          case "ArrayBuffer": {
            const A = a[1],
              w = Ws(A);
            n[o] = w;
            break;
          }
          default:
            throw new Error(`Unknown type ${p}`);
        }
      } else {
        const p = new Array(a.length);
        n[o] = p;
        for (let g = 0; g < a.length; g += 1) {
          const E = a[g];
          E !== vu && (p[g] = i(E));
        }
      }
    else {
      const p = {};
      n[o] = p;
      for (const g in a) {
        const E = a[g];
        p[g] = i(E);
      }
    }
    return n[o];
  }
  return i(0);
}
var is;
(function (t) {
  (t[(t.SysFatal = 1)] = "SysFatal"),
    (t[(t.SysTransient = 2)] = "SysTransient"),
    (t[(t.DestinationInvalid = 3)] = "DestinationInvalid"),
    (t[(t.CanisterReject = 4)] = "CanisterReject"),
    (t[(t.CanisterError = 5)] = "CanisterError");
})(is || (is = {}));
const ii = "abcdefghijklmnopqrstuvwxyz234567",
  qr = Object.create(null);
for (let t = 0; t < ii.length; t++) qr[ii[t]] = t;
qr[0] = qr.o;
qr[1] = qr.i;
function Nu(t) {
  let e = 0,
    r = 0,
    n = "";
  function i(o) {
    return (
      e < 0 ? (r |= o >> -e) : (r = (o << e) & 248),
      e > 3 ? ((e -= 8), 1) : (e < 4 && ((n += ii[r >> 3]), (e += 5)), 0)
    );
  }
  for (let o = 0; o < t.length; ) o += i(t[o]);
  return n + (e < 0 ? ii[r >> 3] : "");
}
function Iu(t) {
  let e = 0,
    r = 0;
  const n = new Uint8Array(((t.length * 4) / 3) | 0);
  let i = 0;
  function o(l) {
    let a = qr[l.toLowerCase()];
    if (a === void 0)
      throw new Error(`Invalid character: ${JSON.stringify(l)}`);
    (a <<= 3),
      (r |= a >>> e),
      (e += 5),
      e >= 8 &&
        ((n[i++] = r), (e -= 8), e > 0 ? (r = (a << (5 - e)) & 255) : (r = 0));
  }
  for (const l of t) o(l);
  return n.slice(0, i);
}
const Ru = new Uint32Array([
  0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
  2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
  2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
  2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
  1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
  2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
  1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
  2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
  1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
  3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
  1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
  4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
  251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
  3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
  453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
  4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
  984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
  3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
  855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
  3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
  702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
  3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
  2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
  2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
  2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
  1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
  2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
  1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
  2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
  1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
  3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
  1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
  3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
  83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
  3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
  534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
  4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
  376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
  3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
  936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
  3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
  601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
  3272380065, 1510334235, 755167117,
]);
function Ou(t) {
  const e = new Uint8Array(t);
  let r = -1;
  for (let n = 0; n < e.length; n++) {
    const o = (e[n] ^ r) & 255;
    r = Ru[o] ^ (r >>> 8);
  }
  return (r ^ -1) >>> 0;
}
function Uu(t) {
  return (
    t instanceof Uint8Array ||
    (ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array")
  );
}
function Wo(t, ...e) {
  if (!Uu(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error(
      "Uint8Array expected of length " + e + ", got length=" + t.length,
    );
}
function Ys(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function Fu(t, e) {
  Wo(t);
  const r = e.outputLen;
  if (t.length < r)
    throw new Error(
      "digestInto() expects output buffer of length at least " + r,
    );
}
const vr =
  typeof globalThis == "object" && "crypto" in globalThis
    ? globalThis.crypto
    : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function ki(
  t,
) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function Bt(t, e) {
  return (t << (32 - e)) | (t >>> e);
}
function Pu(t) {
  if (typeof t != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function Yo(t) {
  return typeof t == "string" && (t = Pu(t)), Wo(t), t;
}
class ku {
  clone() {
    return this._cloneInto();
  }
}
function Bs(t) {
  const e = (n) => t().update(Yo(n)).digest(),
    r = t();
  return (
    (e.outputLen = r.outputLen),
    (e.blockLen = r.blockLen),
    (e.create = () => t()),
    e
  );
}
function Zo(t = 32) {
  if (vr && typeof vr.getRandomValues == "function")
    return vr.getRandomValues(new Uint8Array(t));
  if (vr && typeof vr.randomBytes == "function") return vr.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function Mu(t, e, r, n) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, r, n);
  const i = BigInt(32),
    o = BigInt(4294967295),
    l = Number((r >> i) & o),
    a = Number(r & o),
    p = n ? 4 : 0,
    g = n ? 0 : 4;
  t.setUint32(e + p, l, n), t.setUint32(e + g, a, n);
}
function Cu(t, e, r) {
  return (t & e) ^ (~t & r);
}
function $u(t, e, r) {
  return (t & e) ^ (t & r) ^ (e & r);
}
class Do extends ku {
  constructor(e, r, n, i) {
    super(),
      (this.blockLen = e),
      (this.outputLen = r),
      (this.padOffset = n),
      (this.isLE = i),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(e)),
      (this.view = ki(this.buffer));
  }
  update(e) {
    Ys(this);
    const { view: r, buffer: n, blockLen: i } = this;
    e = Yo(e);
    const o = e.length;
    for (let l = 0; l < o; ) {
      const a = Math.min(i - this.pos, o - l);
      if (a === i) {
        const p = ki(e);
        for (; i <= o - l; l += i) this.process(p, l);
        continue;
      }
      n.set(e.subarray(l, l + a), this.pos),
        (this.pos += a),
        (l += a),
        this.pos === i && (this.process(r, 0), (this.pos = 0));
    }
    return (this.length += e.length), this.roundClean(), this;
  }
  digestInto(e) {
    Ys(this), Fu(e, this), (this.finished = !0);
    const { buffer: r, view: n, blockLen: i, isLE: o } = this;
    let { pos: l } = this;
    (r[l++] = 128),
      this.buffer.subarray(l).fill(0),
      this.padOffset > i - l && (this.process(n, 0), (l = 0));
    for (let S = l; S < i; S++) r[S] = 0;
    Mu(n, i - 8, BigInt(this.length * 8), o), this.process(n, 0);
    const a = ki(e),
      p = this.outputLen;
    if (p % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const g = p / 4,
      E = this.get();
    if (g > E.length) throw new Error("_sha2: outputLen bigger than state");
    for (let S = 0; S < g; S++) a.setUint32(4 * S, E[S], o);
  }
  digest() {
    const { buffer: e, outputLen: r } = this;
    this.digestInto(e);
    const n = e.slice(0, r);
    return this.destroy(), n;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const {
      blockLen: r,
      buffer: n,
      length: i,
      finished: o,
      destroyed: l,
      pos: a,
    } = this;
    return (
      (e.length = i),
      (e.pos = a),
      (e.finished = o),
      (e.destroyed = l),
      i % r && e.buffer.set(n),
      e
    );
  }
}
const qu = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  Kt = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  zt = new Uint32Array(64);
class Xo extends Do {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = Kt[0] | 0),
      (this.B = Kt[1] | 0),
      (this.C = Kt[2] | 0),
      (this.D = Kt[3] | 0),
      (this.E = Kt[4] | 0),
      (this.F = Kt[5] | 0),
      (this.G = Kt[6] | 0),
      (this.H = Kt[7] | 0);
  }
  get() {
    const { A: e, B: r, C: n, D: i, E: o, F: l, G: a, H: p } = this;
    return [e, r, n, i, o, l, a, p];
  }
  set(e, r, n, i, o, l, a, p) {
    (this.A = e | 0),
      (this.B = r | 0),
      (this.C = n | 0),
      (this.D = i | 0),
      (this.E = o | 0),
      (this.F = l | 0),
      (this.G = a | 0),
      (this.H = p | 0);
  }
  process(e, r) {
    for (let S = 0; S < 16; S++, r += 4) zt[S] = e.getUint32(r, !1);
    for (let S = 16; S < 64; S++) {
      const I = zt[S - 15],
        A = zt[S - 2],
        w = Bt(I, 7) ^ Bt(I, 18) ^ (I >>> 3),
        $ = Bt(A, 17) ^ Bt(A, 19) ^ (A >>> 10);
      zt[S] = ($ + zt[S - 7] + w + zt[S - 16]) | 0;
    }
    let { A: n, B: i, C: o, D: l, E: a, F: p, G: g, H: E } = this;
    for (let S = 0; S < 64; S++) {
      const I = Bt(a, 6) ^ Bt(a, 11) ^ Bt(a, 25),
        A = (E + I + Cu(a, p, g) + qu[S] + zt[S]) | 0,
        $ = ((Bt(n, 2) ^ Bt(n, 13) ^ Bt(n, 22)) + $u(n, i, o)) | 0;
      (E = g),
        (g = p),
        (p = a),
        (a = (l + A) | 0),
        (l = o),
        (o = i),
        (i = n),
        (n = (A + $) | 0);
    }
    (n = (n + this.A) | 0),
      (i = (i + this.B) | 0),
      (o = (o + this.C) | 0),
      (l = (l + this.D) | 0),
      (a = (a + this.E) | 0),
      (p = (p + this.F) | 0),
      (g = (g + this.G) | 0),
      (E = (E + this.H) | 0),
      this.set(n, i, o, l, a, p, g, E);
  }
  roundClean() {
    zt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class Vu extends Xo {
  constructor() {
    super(),
      (this.A = -1056596264),
      (this.B = 914150663),
      (this.C = 812702999),
      (this.D = -150054599),
      (this.E = -4191439),
      (this.F = 1750603025),
      (this.G = 1694076839),
      (this.H = -1090891868),
      (this.outputLen = 28);
  }
}
const Ss = Bs(() => new Xo()),
  Gu = Bs(() => new Vu());
function ju(t) {
  return Gu.create().update(new Uint8Array(t)).digest();
}
const xn = "__principal__",
  Hu = 2,
  Zs = 4,
  Ku = "aaaaa-aa",
  zu = (t) => {
    var e;
    return new Uint8Array(
      ((e = t.match(/.{1,2}/g)) !== null && e !== void 0 ? e : []).map((r) =>
        parseInt(r, 16),
      ),
    );
  },
  Lu = (t) => t.reduce((e, r) => e + r.toString(16).padStart(2, "0"), "");
let Ae = class Pn {
  constructor(e) {
    (this._arr = e), (this._isPrincipal = !0);
  }
  static anonymous() {
    return new this(new Uint8Array([Zs]));
  }
  static managementCanister() {
    return this.fromHex(Ku);
  }
  static selfAuthenticating(e) {
    const r = ju(e);
    return new this(new Uint8Array([...r, Hu]));
  }
  static from(e) {
    if (typeof e == "string") return Pn.fromText(e);
    if (Object.getPrototypeOf(e) === Uint8Array.prototype) return new Pn(e);
    if (typeof e == "object" && e !== null && e._isPrincipal === !0)
      return new Pn(e._arr);
    throw new Error(`Impossible to convert ${JSON.stringify(e)} to Principal.`);
  }
  static fromHex(e) {
    return new this(zu(e));
  }
  static fromText(e) {
    let r = e;
    if (e.includes(xn)) {
      const l = JSON.parse(e);
      xn in l && (r = l[xn]);
    }
    const n = r.toLowerCase().replace(/-/g, "");
    let i = Iu(n);
    i = i.slice(4, i.length);
    const o = new this(i);
    if (o.toText() !== r)
      throw new Error(
        `Principal "${o.toText()}" does not have a valid checksum (original value "${r}" may not be a valid Principal ID).`,
      );
    return o;
  }
  static fromUint8Array(e) {
    return new this(e);
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === Zs;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return Lu(this._arr).toUpperCase();
  }
  toText() {
    const e = new ArrayBuffer(4);
    new DataView(e).setUint32(0, Ou(this._arr));
    const n = new Uint8Array(e),
      i = Uint8Array.from(this._arr),
      o = new Uint8Array([...n, ...i]),
      a = Nu(o).match(/.{1,5}/g);
    if (!a) throw new Error();
    return a.join("-");
  }
  toString() {
    return this.toText();
  }
  toJSON() {
    return { [xn]: this.toText() };
  }
  compareTo(e) {
    for (let r = 0; r < Math.min(this._arr.length, e._arr.length); r++) {
      if (this._arr[r] < e._arr[r]) return "lt";
      if (this._arr[r] > e._arr[r]) return "gt";
    }
    return this._arr.length < e._arr.length
      ? "lt"
      : this._arr.length > e._arr.length
        ? "gt"
        : "eq";
  }
  ltEq(e) {
    const r = this.compareTo(e);
    return r == "lt" || r == "eq";
  }
  gtEq(e) {
    const r = this.compareTo(e);
    return r == "gt" || r == "eq";
  }
};
function vt(...t) {
  const e = new Uint8Array(t.reduce((n, i) => n + i.byteLength, 0));
  let r = 0;
  for (const n of t) e.set(new Uint8Array(n), r), (r += n.byteLength);
  return e.buffer;
}
function Me(t) {
  return [...new Uint8Array(t)]
    .map((e) => e.toString(16).padStart(2, "0"))
    .join("");
}
const Wu = new RegExp(/^[0-9a-fA-F]+$/);
function Gt(t) {
  if (!Wu.test(t)) throw new Error("Invalid hexadecimal string.");
  const e = [...t]
    .reduce((r, n, i) => ((r[(i / 2) | 0] = (r[(i / 2) | 0] || "") + n), r), [])
    .map((r) => Number.parseInt(r, 16));
  return new Uint8Array(e).buffer;
}
function Jo(t, e) {
  if (t.byteLength !== e.byteLength) return t.byteLength - e.byteLength;
  const r = new Uint8Array(t),
    n = new Uint8Array(e);
  for (let i = 0; i < r.length; i++) if (r[i] !== n[i]) return r[i] - n[i];
  return 0;
}
function pn(t, e) {
  return Jo(t, e) === 0;
}
function en(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength).buffer;
}
function Ts(t) {
  return t instanceof Uint8Array
    ? en(t)
    : t instanceof ArrayBuffer
      ? t
      : Array.isArray(t)
        ? en(new Uint8Array(t))
        : "buffer" in t
          ? Ts(t.buffer)
          : en(new Uint8Array(t));
}
class qe extends Error {
  constructor(e) {
    super(e),
      (this.message = e),
      (this.name = "AgentError"),
      (this.__proto__ = qe.prototype),
      Object.setPrototypeOf(this, qe.prototype);
  }
}
function Oe(...t) {
  const e = new Uint8Array(t.reduce((n, i) => n + i.byteLength, 0));
  let r = 0;
  for (const n of t) e.set(new Uint8Array(n), r), (r += n.byteLength);
  return e;
}
class jr {
  constructor(e, r = e?.byteLength || 0) {
    (this._buffer = si(e || new ArrayBuffer(0))),
      (this._view = new Uint8Array(this._buffer, 0, r));
  }
  get buffer() {
    return si(this._view.slice());
  }
  get byteLength() {
    return this._view.byteLength;
  }
  read(e) {
    const r = this._view.subarray(0, e);
    return (this._view = this._view.subarray(e)), r.slice().buffer;
  }
  readUint8() {
    const e = this._view[0];
    return (this._view = this._view.subarray(1)), e;
  }
  write(e) {
    const r = new Uint8Array(e),
      n = this._view.byteLength;
    this._view.byteOffset + this._view.byteLength + r.byteLength >=
    this._buffer.byteLength
      ? this.alloc(r.byteLength)
      : (this._view = new Uint8Array(
          this._buffer,
          this._view.byteOffset,
          this._view.byteLength + r.byteLength,
        )),
      this._view.set(r, n);
  }
  get end() {
    return this._view.byteLength === 0;
  }
  alloc(e) {
    const r = new ArrayBuffer(((this._buffer.byteLength + e) * 1.2) | 0),
      n = new Uint8Array(r, 0, this._view.byteLength + e);
    n.set(this._view), (this._buffer = r), (this._view = n);
  }
}
function Mi(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength).buffer;
}
function si(t) {
  return t instanceof Uint8Array
    ? Mi(t)
    : t instanceof ArrayBuffer
      ? t
      : Array.isArray(t)
        ? Mi(new Uint8Array(t))
        : "buffer" in t
          ? si(t.buffer)
          : Mi(new Uint8Array(t));
}
function Yu(t) {
  const r = new TextEncoder().encode(t);
  let n = 0;
  for (const i of r) n = (n * 223 + i) % 2 ** 32;
  return n;
}
function Ft(t) {
  if (/^_\d+_$/.test(t) || /^_0x[0-9a-fA-F]+_$/.test(t)) {
    const e = +t.slice(1, -1);
    if (Number.isSafeInteger(e) && e >= 0 && e < 2 ** 32) return e;
  }
  return Yu(t);
}
function Qo() {
  throw new Error("unexpected end of buffer");
}
function mr(t, e) {
  return t.byteLength < e && Qo(), t.read(e);
}
function br(t) {
  const e = t.readUint8();
  return e === void 0 && Qo(), e;
}
function Ve(t) {
  if ((typeof t == "number" && (t = BigInt(t)), t < BigInt(0)))
    throw new Error("Cannot leb encode negative values.");
  const e = (t === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(t)))) + 1,
    r = new jr(new ArrayBuffer(e), 0);
  for (;;) {
    const n = Number(t & BigInt(127));
    if (((t /= BigInt(128)), t === BigInt(0))) {
      r.write(new Uint8Array([n]));
      break;
    } else r.write(new Uint8Array([n | 128]));
  }
  return r.buffer;
}
function Ze(t) {
  let e = BigInt(1),
    r = BigInt(0),
    n;
  do (n = br(t)), (r += BigInt(n & 127).valueOf() * e), (e *= BigInt(128));
  while (n >= 128);
  return r;
}
function Le(t) {
  typeof t == "number" && (t = BigInt(t));
  const e = t < BigInt(0);
  e && (t = -t - BigInt(1));
  const r = (t === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(t)))) + 1,
    n = new jr(new ArrayBuffer(r), 0);
  for (;;) {
    const o = i(t);
    if (
      ((t /= BigInt(128)),
      (e && t === BigInt(0) && o & 64) || (!e && t === BigInt(0) && !(o & 64)))
    ) {
      n.write(new Uint8Array([o]));
      break;
    } else n.write(new Uint8Array([o | 128]));
  }
  function i(o) {
    const l = o % BigInt(128);
    return Number(e ? BigInt(128) - l - BigInt(1) : l);
  }
  return n.buffer;
}
function Zt(t) {
  const e = new Uint8Array(t.buffer);
  let r = 0;
  for (; r < e.byteLength; r++)
    if (e[r] < 128) {
      if (!(e[r] & 64)) return Ze(t);
      break;
    }
  const n = new Uint8Array(mr(t, r + 1));
  let i = BigInt(0);
  for (let o = n.byteLength - 1; o >= 0; o--)
    i = i * BigInt(128) + BigInt(128 - (n[o] & 127) - 1);
  return -i - BigInt(1);
}
function Zu(t, e) {
  if (BigInt(t) < BigInt(0)) throw new Error("Cannot write negative values.");
  return ea(t, e);
}
function ea(t, e) {
  t = BigInt(t);
  const r = new jr(new ArrayBuffer(Math.min(1, e)), 0);
  let n = 0,
    i = BigInt(256),
    o = BigInt(0),
    l = Number(t % i);
  for (r.write(new Uint8Array([l])); ++n < e; )
    t < 0 && o === BigInt(0) && l !== 0 && (o = BigInt(1)),
      (l = Number((t / i - o) % BigInt(256))),
      r.write(new Uint8Array([l])),
      (i *= BigInt(256));
  return r.buffer;
}
function ta(t, e) {
  let r = BigInt(br(t)),
    n = BigInt(1),
    i = 0;
  for (; ++i < e; ) {
    n *= BigInt(256);
    const o = BigInt(br(t));
    r = r + n * o;
  }
  return r;
}
function Du(t, e) {
  let r = ta(t, e);
  const n = BigInt(2) ** (BigInt(8) * BigInt(e - 1) + BigInt(7));
  return r >= n && (r -= n * BigInt(2)), r;
}
function ss(t) {
  const e = BigInt(t);
  if (t < 0) throw new RangeError("Input must be non-negative");
  return BigInt(1) << e;
}
const kn = "DIDL",
  Ds = 400;
function on(t, e, r) {
  return t.map((n, i) => r(n, e[i]));
}
class Xu {
  constructor() {
    (this._typs = []), (this._idx = new Map());
  }
  has(e) {
    return this._idx.has(e.name);
  }
  add(e, r) {
    const n = this._typs.length;
    this._idx.set(e.name, n), this._typs.push(r);
  }
  merge(e, r) {
    const n = this._idx.get(e.name),
      i = this._idx.get(r);
    if (n === void 0) throw new Error("Missing type index for " + e);
    if (i === void 0) throw new Error("Missing type index for " + r);
    (this._typs[n] = this._typs[i]),
      this._typs.splice(i, 1),
      this._idx.delete(r);
  }
  encode() {
    const e = Ve(this._typs.length),
      r = Oe(...this._typs);
    return Oe(e, r);
  }
  indexOf(e) {
    if (!this._idx.has(e)) throw new Error("Missing type index for " + e);
    return Le(this._idx.get(e) || 0);
  }
}
class Ju {
  visitType(e, r) {
    throw new Error("Not implemented");
  }
  visitPrimitive(e, r) {
    return this.visitType(e, r);
  }
  visitEmpty(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitBool(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitNull(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitReserved(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitText(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitNumber(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitInt(e, r) {
    return this.visitNumber(e, r);
  }
  visitNat(e, r) {
    return this.visitNumber(e, r);
  }
  visitFloat(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitFixedInt(e, r) {
    return this.visitNumber(e, r);
  }
  visitFixedNat(e, r) {
    return this.visitNumber(e, r);
  }
  visitPrincipal(e, r) {
    return this.visitPrimitive(e, r);
  }
  visitConstruct(e, r) {
    return this.visitType(e, r);
  }
  visitVec(e, r, n) {
    return this.visitConstruct(e, n);
  }
  visitOpt(e, r, n) {
    return this.visitConstruct(e, n);
  }
  visitRecord(e, r, n) {
    return this.visitConstruct(e, n);
  }
  visitTuple(e, r, n) {
    const i = r.map((o, l) => [`_${l}_`, o]);
    return this.visitRecord(e, i, n);
  }
  visitVariant(e, r, n) {
    return this.visitConstruct(e, n);
  }
  visitRec(e, r, n) {
    return this.visitConstruct(r, n);
  }
  visitFunc(e, r) {
    return this.visitConstruct(e, r);
  }
  visitService(e, r) {
    return this.visitConstruct(e, r);
  }
}
class bi {
  display() {
    return this.name;
  }
  valueToString(e) {
    return je(e);
  }
  buildTypeTable(e) {
    e.has(this) || this._buildTypeTableImpl(e);
  }
}
class yt extends bi {
  checkType(e) {
    if (this.name !== e.name)
      throw new Error(
        `type mismatch: type on the wire ${e.name}, expect type ${this.name}`,
      );
    return e;
  }
  _buildTypeTableImpl(e) {}
}
class cr extends bi {
  checkType(e) {
    if (e instanceof ur) {
      const r = e.getType();
      if (typeof r > "u")
        throw new Error("type mismatch with uninitialized type");
      return r;
    }
    throw new Error(
      `type mismatch: type on the wire ${e.name}, expect type ${this.name}`,
    );
  }
  encodeType(e) {
    return e.indexOf(this.name);
  }
}
class ra extends yt {
  accept(e, r) {
    return e.visitEmpty(this, r);
  }
  covariant(e) {
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue() {
    throw new Error("Empty cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Empty cannot appear as a value");
  }
  encodeType() {
    return Le(-17);
  }
  decodeValue() {
    throw new Error("Empty cannot appear as an output");
  }
  get name() {
    return "empty";
  }
}
class na extends bi {
  checkType(e) {
    throw new Error("Method not implemented for unknown.");
  }
  accept(e, r) {
    throw e.visitType(this, r);
  }
  covariant(e) {
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue() {
    throw new Error("Unknown cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Unknown cannot appear as a value");
  }
  encodeType() {
    throw new Error("Unknown cannot be serialized");
  }
  decodeValue(e, r) {
    let n = r.decodeValue(e, r);
    Object(n) !== n && (n = Object(n));
    let i;
    return (
      r instanceof ur ? (i = () => r.getType()) : (i = () => r),
      Object.defineProperty(n, "type", {
        value: i,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      n
    );
  }
  _buildTypeTableImpl() {
    throw new Error("Unknown cannot be serialized");
  }
  get name() {
    return "Unknown";
  }
}
class ia extends yt {
  accept(e, r) {
    return e.visitBool(this, r);
  }
  covariant(e) {
    if (typeof e == "boolean") return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    return new Uint8Array([e ? 1 : 0]);
  }
  encodeType() {
    return Le(-2);
  }
  decodeValue(e, r) {
    switch ((this.checkType(r), br(e))) {
      case 0:
        return !1;
      case 1:
        return !0;
      default:
        throw new Error("Boolean value out of range");
    }
  }
  get name() {
    return "bool";
  }
}
class sa extends yt {
  accept(e, r) {
    return e.visitNull(this, r);
  }
  covariant(e) {
    if (e === null) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return Le(-1);
  }
  decodeValue(e, r) {
    return this.checkType(r), null;
  }
  get name() {
    return "null";
  }
}
class oi extends yt {
  accept(e, r) {
    return e.visitReserved(this, r);
  }
  covariant(e) {
    return !0;
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return Le(-16);
  }
  decodeValue(e, r) {
    return r.name !== this.name && r.decodeValue(e, r), null;
  }
  get name() {
    return "reserved";
  }
}
class oa extends yt {
  accept(e, r) {
    return e.visitText(this, r);
  }
  covariant(e) {
    if (typeof e == "string") return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = new TextEncoder().encode(e),
      n = Ve(r.byteLength);
    return Oe(n, r);
  }
  encodeType() {
    return Le(-15);
  }
  decodeValue(e, r) {
    this.checkType(r);
    const n = Ze(e),
      i = mr(e, Number(n));
    return new TextDecoder("utf8", { fatal: !0 }).decode(i);
  }
  get name() {
    return "text";
  }
  valueToString(e) {
    return '"' + e + '"';
  }
}
class aa extends yt {
  accept(e, r) {
    return e.visitInt(this, r);
  }
  covariant(e) {
    if (typeof e == "bigint" || Number.isInteger(e)) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    return Le(e);
  }
  encodeType() {
    return Le(-4);
  }
  decodeValue(e, r) {
    return this.checkType(r), Zt(e);
  }
  get name() {
    return "int";
  }
  valueToString(e) {
    return e.toString();
  }
}
class ca extends yt {
  accept(e, r) {
    return e.visitNat(this, r);
  }
  covariant(e) {
    if (
      (typeof e == "bigint" && e >= BigInt(0)) ||
      (Number.isInteger(e) && e >= 0)
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    return Ve(e);
  }
  encodeType() {
    return Le(-3);
  }
  decodeValue(e, r) {
    return this.checkType(r), Ze(e);
  }
  get name() {
    return "nat";
  }
  valueToString(e) {
    return e.toString();
  }
}
class Ns extends yt {
  constructor(e) {
    if ((super(), (this._bits = e), e !== 32 && e !== 64))
      throw new Error("not a valid float type");
  }
  accept(e, r) {
    return e.visitFloat(this, r);
  }
  covariant(e) {
    if (typeof e == "number" || e instanceof Number) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = new ArrayBuffer(this._bits / 8),
      n = new DataView(r);
    return (
      this._bits === 32 ? n.setFloat32(0, e, !0) : n.setFloat64(0, e, !0), r
    );
  }
  encodeType() {
    const e = this._bits === 32 ? -13 : -14;
    return Le(e);
  }
  decodeValue(e, r) {
    this.checkType(r);
    const n = mr(e, this._bits / 8),
      i = new DataView(n);
    return this._bits === 32 ? i.getFloat32(0, !0) : i.getFloat64(0, !0);
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(e) {
    return e.toString();
  }
}
class _r extends yt {
  constructor(e) {
    super(), (this._bits = e);
  }
  accept(e, r) {
    return e.visitFixedInt(this, r);
  }
  covariant(e) {
    const r = ss(this._bits - 1) * BigInt(-1),
      n = ss(this._bits - 1) - BigInt(1);
    let i = !1;
    if (typeof e == "bigint") i = e >= r && e <= n;
    else if (Number.isInteger(e)) {
      const o = BigInt(e);
      i = o >= r && o <= n;
    } else i = !1;
    if (i) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    return ea(e, this._bits / 8);
  }
  encodeType() {
    const e = Math.log2(this._bits) - 3;
    return Le(-9 - e);
  }
  decodeValue(e, r) {
    this.checkType(r);
    const n = Du(e, this._bits / 8);
    return this._bits <= 32 ? Number(n) : n;
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(e) {
    return e.toString();
  }
}
class sr extends yt {
  constructor(e) {
    super(), (this._bits = e);
  }
  accept(e, r) {
    return e.visitFixedNat(this, r);
  }
  covariant(e) {
    const r = ss(this._bits);
    let n = !1;
    if (
      (typeof e == "bigint" && e >= BigInt(0)
        ? (n = e < r)
        : Number.isInteger(e) && e >= 0
          ? (n = BigInt(e) < r)
          : (n = !1),
      n)
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    return Zu(e, this._bits / 8);
  }
  encodeType() {
    const e = Math.log2(this._bits) - 3;
    return Le(-5 - e);
  }
  decodeValue(e, r) {
    this.checkType(r);
    const n = ta(e, this._bits / 8);
    return this._bits <= 32 ? Number(n) : n;
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(e) {
    return e.toString();
  }
}
class _i extends cr {
  constructor(e) {
    super(),
      (this._type = e),
      (this._blobOptimization = !1),
      e instanceof sr && e._bits === 8 && (this._blobOptimization = !0);
  }
  accept(e, r) {
    return e.visitVec(this, this._type, r);
  }
  covariant(e) {
    const r =
      this._type instanceof sr
        ? this._type._bits
        : this._type instanceof _r
          ? this._type._bits
          : 0;
    if (
      (ArrayBuffer.isView(e) && r == e.BYTES_PER_ELEMENT * 8) ||
      (Array.isArray(e) &&
        e.every((n, i) => {
          try {
            return this._type.covariant(n);
          } catch (o) {
            throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${o.message}`);
          }
        }))
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = Ve(e.length);
    if (this._blobOptimization) return Oe(r, new Uint8Array(e));
    if (ArrayBuffer.isView(e)) return Oe(r, new Uint8Array(e.buffer));
    const n = new jr(new ArrayBuffer(r.byteLength + e.length), 0);
    n.write(r);
    for (const i of e) {
      const o = this._type.encodeValue(i);
      n.write(new Uint8Array(o));
    }
    return n.buffer;
  }
  _buildTypeTableImpl(e) {
    this._type.buildTypeTable(e);
    const r = Le(-19),
      n = this._type.encodeType(e);
    e.add(this, Oe(r, n));
  }
  decodeValue(e, r) {
    const n = this.checkType(r);
    if (!(n instanceof _i)) throw new Error("Not a vector type");
    const i = Number(Ze(e));
    if (this._type instanceof sr) {
      if (this._type._bits == 8) return new Uint8Array(e.read(i));
      if (this._type._bits == 16) return new Uint16Array(e.read(i * 2));
      if (this._type._bits == 32) return new Uint32Array(e.read(i * 4));
      if (this._type._bits == 64) return new BigUint64Array(e.read(i * 8));
    }
    if (this._type instanceof _r) {
      if (this._type._bits == 8) return new Int8Array(e.read(i));
      if (this._type._bits == 16) return new Int16Array(e.read(i * 2));
      if (this._type._bits == 32) return new Int32Array(e.read(i * 4));
      if (this._type._bits == 64) return new BigInt64Array(e.read(i * 8));
    }
    const o = [];
    for (let l = 0; l < i; l++) o.push(this._type.decodeValue(e, n._type));
    return o;
  }
  get name() {
    return `vec ${this._type.name}`;
  }
  display() {
    return `vec ${this._type.display()}`;
  }
  valueToString(e) {
    return "vec {" + e.map((n) => this._type.valueToString(n)).join("; ") + "}";
  }
}
class Vr extends cr {
  constructor(e) {
    super(), (this._type = e);
  }
  accept(e, r) {
    return e.visitOpt(this, this._type, r);
  }
  covariant(e) {
    try {
      if (
        Array.isArray(e) &&
        (e.length === 0 || (e.length === 1 && this._type.covariant(e[0])))
      )
        return !0;
    } catch (r) {
      throw new Error(`Invalid ${this.display()} argument: ${je(e)} 

-> ${r.message}`);
    }
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    return e.length === 0
      ? new Uint8Array([0])
      : Oe(new Uint8Array([1]), this._type.encodeValue(e[0]));
  }
  _buildTypeTableImpl(e) {
    this._type.buildTypeTable(e);
    const r = Le(-18),
      n = this._type.encodeType(e);
    e.add(this, Oe(r, n));
  }
  decodeValue(e, r) {
    const n = this.checkType(r);
    if (!(n instanceof Vr)) throw new Error("Not an option type");
    switch (br(e)) {
      case 0:
        return [];
      case 1:
        return [this._type.decodeValue(e, n._type)];
      default:
        throw new Error("Not an option value");
    }
  }
  get name() {
    return `opt ${this._type.name}`;
  }
  display() {
    return `opt ${this._type.display()}`;
  }
  valueToString(e) {
    return e.length === 0 ? "null" : `opt ${this._type.valueToString(e[0])}`;
  }
}
class yn extends cr {
  constructor(e = {}) {
    super(),
      (this._fields = Object.entries(e).sort((r, n) => Ft(r[0]) - Ft(n[0])));
  }
  accept(e, r) {
    return e.visitRecord(this, this._fields, r);
  }
  tryAsTuple() {
    const e = [];
    for (let r = 0; r < this._fields.length; r++) {
      const [n, i] = this._fields[r];
      if (n !== `_${r}_`) return null;
      e.push(i);
    }
    return e;
  }
  covariant(e) {
    if (
      typeof e == "object" &&
      this._fields.every(([r, n]) => {
        if (!e.hasOwnProperty(r))
          throw new Error(`Record is missing key "${r}".`);
        try {
          return n.covariant(e[r]);
        } catch (i) {
          throw new Error(`Invalid ${this.display()} argument: 

field ${r} -> ${i.message}`);
        }
      })
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = this._fields.map(([i]) => e[i]),
      n = on(this._fields, r, ([, i], o) => i.encodeValue(o));
    return Oe(...n);
  }
  _buildTypeTableImpl(e) {
    this._fields.forEach(([o, l]) => l.buildTypeTable(e));
    const r = Le(-20),
      n = Ve(this._fields.length),
      i = this._fields.map(([o, l]) => Oe(Ve(Ft(o)), l.encodeType(e)));
    e.add(this, Oe(r, n, Oe(...i)));
  }
  decodeValue(e, r) {
    const n = this.checkType(r);
    if (!(n instanceof yn)) throw new Error("Not a record type");
    const i = {};
    let o = 0,
      l = 0;
    for (; l < n._fields.length; ) {
      const [a, p] = n._fields[l];
      if (o >= this._fields.length) {
        p.decodeValue(e, p), l++;
        continue;
      }
      const [g, E] = this._fields[o],
        S = Ft(this._fields[o][0]),
        I = Ft(a);
      if (S === I) (i[g] = E.decodeValue(e, p)), o++, l++;
      else if (I > S)
        if (E instanceof Vr || E instanceof oi) (i[g] = []), o++;
        else throw new Error("Cannot find required field " + g);
      else p.decodeValue(e, p), l++;
    }
    for (const [a, p] of this._fields.slice(o))
      if (p instanceof Vr || p instanceof oi) i[a] = [];
      else throw new Error("Cannot find required field " + a);
    return i;
  }
  get name() {
    return `record {${this._fields.map(([r, n]) => r + ":" + n.name).join("; ")}}`;
  }
  display() {
    return `record {${this._fields.map(([r, n]) => r + ":" + n.display()).join("; ")}}`;
  }
  valueToString(e) {
    const r = this._fields.map(([i]) => e[i]);
    return `record {${on(this._fields, r, ([i, o], l) => i + "=" + o.valueToString(l)).join("; ")}}`;
  }
}
class xi extends yn {
  constructor(e) {
    const r = {};
    e.forEach((n, i) => (r["_" + i + "_"] = n)),
      super(r),
      (this._components = e);
  }
  accept(e, r) {
    return e.visitTuple(this, this._components, r);
  }
  covariant(e) {
    if (
      Array.isArray(e) &&
      e.length >= this._fields.length &&
      this._components.every((r, n) => {
        try {
          return r.covariant(e[n]);
        } catch (i) {
          throw new Error(`Invalid ${this.display()} argument: 

index ${n} -> ${i.message}`);
        }
      })
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = on(this._components, e, (n, i) => n.encodeValue(i));
    return Oe(...r);
  }
  decodeValue(e, r) {
    const n = this.checkType(r);
    if (!(n instanceof xi)) throw new Error("not a tuple type");
    if (n._components.length < this._components.length)
      throw new Error("tuple mismatch");
    const i = [];
    for (const [o, l] of n._components.entries())
      o >= this._components.length
        ? l.decodeValue(e, l)
        : i.push(this._components[o].decodeValue(e, l));
    return i;
  }
  display() {
    return `record {${this._components.map((r) => r.display()).join("; ")}}`;
  }
  valueToString(e) {
    return `record {${on(this._components, e, (n, i) => n.valueToString(i)).join("; ")}}`;
  }
}
class Ei extends cr {
  constructor(e = {}) {
    super(),
      (this._fields = Object.entries(e).sort((r, n) => Ft(r[0]) - Ft(n[0])));
  }
  accept(e, r) {
    return e.visitVariant(this, this._fields, r);
  }
  covariant(e) {
    if (
      typeof e == "object" &&
      Object.entries(e).length === 1 &&
      this._fields.every(([r, n]) => {
        try {
          return !e.hasOwnProperty(r) || n.covariant(e[r]);
        } catch (i) {
          throw new Error(`Invalid ${this.display()} argument: 

variant ${r} -> ${i.message}`);
        }
      })
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    for (let r = 0; r < this._fields.length; r++) {
      const [n, i] = this._fields[r];
      if (e.hasOwnProperty(n)) {
        const o = Ve(r),
          l = i.encodeValue(e[n]);
        return Oe(o, l);
      }
    }
    throw Error("Variant has no data: " + e);
  }
  _buildTypeTableImpl(e) {
    this._fields.forEach(([, o]) => {
      o.buildTypeTable(e);
    });
    const r = Le(-21),
      n = Ve(this._fields.length),
      i = this._fields.map(([o, l]) => Oe(Ve(Ft(o)), l.encodeType(e)));
    e.add(this, Oe(r, n, ...i));
  }
  decodeValue(e, r) {
    const n = this.checkType(r);
    if (!(n instanceof Ei)) throw new Error("Not a variant type");
    const i = Number(Ze(e));
    if (i >= n._fields.length) throw Error("Invalid variant index: " + i);
    const [o, l] = n._fields[i];
    for (const [a, p] of this._fields)
      if (Ft(o) === Ft(a)) {
        const g = p.decodeValue(e, l);
        return { [a]: g };
      }
    throw new Error("Cannot find field hash " + o);
  }
  get name() {
    return `variant {${this._fields.map(([r, n]) => r + ":" + n.name).join("; ")}}`;
  }
  display() {
    return `variant {${this._fields.map(([r, n]) => r + (n.name === "null" ? "" : `:${n.display()}`)).join("; ")}}`;
  }
  valueToString(e) {
    for (const [r, n] of this._fields)
      if (e.hasOwnProperty(r)) {
        const i = n.valueToString(e[r]);
        return i === "null" ? `variant {${r}}` : `variant {${r}=${i}}`;
      }
    throw new Error("Variant has no data: " + e);
  }
}
class ur extends cr {
  constructor() {
    super(...arguments), (this._id = ur._counter++), (this._type = void 0);
  }
  accept(e, r) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return e.visitRec(this, this._type, r);
  }
  fill(e) {
    this._type = e;
  }
  getType() {
    return this._type;
  }
  covariant(e) {
    if (this._type && this._type.covariant(e)) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.encodeValue(e);
  }
  _buildTypeTableImpl(e) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    e.add(this, new Uint8Array([])),
      this._type.buildTypeTable(e),
      e.merge(this, this._type.name);
  }
  decodeValue(e, r) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.decodeValue(e, r);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(e) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.valueToString(e);
  }
}
ur._counter = 0;
function Is(t) {
  if (br(t) !== 1) throw new Error("Cannot decode principal");
  const r = Number(Ze(t));
  return Ae.fromUint8Array(new Uint8Array(mr(t, r)));
}
class ua extends yt {
  accept(e, r) {
    return e.visitPrincipal(this, r);
  }
  covariant(e) {
    if (e && e._isPrincipal) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = e.toUint8Array(),
      n = Ve(r.byteLength);
    return Oe(new Uint8Array([1]), n, r);
  }
  encodeType() {
    return Le(-24);
  }
  decodeValue(e, r) {
    return this.checkType(r), Is(e);
  }
  get name() {
    return "principal";
  }
  valueToString(e) {
    return `${this.name} "${e.toText()}"`;
  }
}
class Rs extends cr {
  constructor(e, r, n = []) {
    super(), (this.argTypes = e), (this.retTypes = r), (this.annotations = n);
  }
  static argsToString(e, r) {
    if (e.length !== r.length) throw new Error("arity mismatch");
    return "(" + e.map((n, i) => n.valueToString(r[i])).join(", ") + ")";
  }
  accept(e, r) {
    return e.visitFunc(this, r);
  }
  covariant(e) {
    if (
      Array.isArray(e) &&
      e.length === 2 &&
      e[0] &&
      e[0]._isPrincipal &&
      typeof e[1] == "string"
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue([e, r]) {
    const n = e.toUint8Array(),
      i = Ve(n.byteLength),
      o = Oe(new Uint8Array([1]), i, n),
      l = new TextEncoder().encode(r),
      a = Ve(l.byteLength);
    return Oe(new Uint8Array([1]), o, a, l);
  }
  _buildTypeTableImpl(e) {
    this.argTypes.forEach((g) => g.buildTypeTable(e)),
      this.retTypes.forEach((g) => g.buildTypeTable(e));
    const r = Le(-22),
      n = Ve(this.argTypes.length),
      i = Oe(...this.argTypes.map((g) => g.encodeType(e))),
      o = Ve(this.retTypes.length),
      l = Oe(...this.retTypes.map((g) => g.encodeType(e))),
      a = Ve(this.annotations.length),
      p = Oe(...this.annotations.map((g) => this.encodeAnnotation(g)));
    e.add(this, Oe(r, n, i, o, l, a, p));
  }
  decodeValue(e) {
    if (br(e) !== 1) throw new Error("Cannot decode function reference");
    const n = Is(e),
      i = Number(Ze(e)),
      o = mr(e, i),
      a = new TextDecoder("utf8", { fatal: !0 }).decode(o);
    return [n, a];
  }
  get name() {
    const e = this.argTypes.map((i) => i.name).join(", "),
      r = this.retTypes.map((i) => i.name).join(", "),
      n = " " + this.annotations.join(" ");
    return `(${e}) -> (${r})${n}`;
  }
  valueToString([e, r]) {
    return `func "${e.toText()}".${r}`;
  }
  display() {
    const e = this.argTypes.map((i) => i.display()).join(", "),
      r = this.retTypes.map((i) => i.display()).join(", "),
      n = " " + this.annotations.join(" ");
    return `(${e}) → (${r})${n}`;
  }
  encodeAnnotation(e) {
    if (e === "query") return new Uint8Array([1]);
    if (e === "oneway") return new Uint8Array([2]);
    if (e === "composite_query") return new Uint8Array([3]);
    throw new Error("Illegal function annotation");
  }
}
class fa extends cr {
  constructor(e) {
    super(),
      (this._fields = Object.entries(e).sort((r, n) =>
        r[0] < n[0] ? -1 : r[0] > n[0] ? 1 : 0,
      ));
  }
  accept(e, r) {
    return e.visitService(this, r);
  }
  covariant(e) {
    if (e && e._isPrincipal) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${je(e)}`);
  }
  encodeValue(e) {
    const r = e.toUint8Array(),
      n = Ve(r.length);
    return Oe(new Uint8Array([1]), n, r);
  }
  _buildTypeTableImpl(e) {
    this._fields.forEach(([o, l]) => l.buildTypeTable(e));
    const r = Le(-23),
      n = Ve(this._fields.length),
      i = this._fields.map(([o, l]) => {
        const a = new TextEncoder().encode(o),
          p = Ve(a.length);
        return Oe(p, a, l.encodeType(e));
      });
    e.add(this, Oe(r, n, ...i));
  }
  decodeValue(e) {
    return Is(e);
  }
  get name() {
    return `service {${this._fields.map(([r, n]) => r + ":" + n.name).join("; ")}}`;
  }
  valueToString(e) {
    return `service "${e.toText()}"`;
  }
}
function je(t) {
  const e = JSON.stringify(t, (r, n) =>
    typeof n == "bigint" ? `BigInt(${n})` : n,
  );
  return e && e.length > Ds ? e.substring(0, Ds - 3) + "..." : e;
}
function os(t, e) {
  if (e.length < t.length) throw Error("Wrong number of message arguments");
  const r = new Xu();
  t.forEach((p) => p.buildTypeTable(r));
  const n = new TextEncoder().encode(kn),
    i = r.encode(),
    o = Ve(e.length),
    l = Oe(...t.map((p) => p.encodeType(r))),
    a = Oe(
      ...on(t, e, (p, g) => {
        try {
          p.covariant(g);
        } catch (E) {
          throw new Error(
            E.message +
              `

`,
          );
        }
        return p.encodeValue(g);
      }),
    );
  return Oe(n, i, o, l, a);
}
function la(t, e) {
  const r = new jr(e);
  if (e.byteLength < kn.length)
    throw new Error("Message length smaller than magic number");
  const n = mr(r, kn.length),
    i = new TextDecoder().decode(n);
  if (i !== kn) throw new Error("Wrong magic number: " + JSON.stringify(i));
  function o(A) {
    const w = [],
      $ = Number(Ze(A));
    for (let z = 0; z < $; z++) {
      const q = Number(Zt(A));
      switch (q) {
        case -18:
        case -19: {
          const re = Number(Zt(A));
          w.push([q, re]);
          break;
        }
        case -20:
        case -21: {
          const re = [];
          let P = Number(Ze(A)),
            Z;
          for (; P--; ) {
            const Y = Number(Ze(A));
            if (Y >= Math.pow(2, 32))
              throw new Error("field id out of 32-bit range");
            if (typeof Z == "number" && Z >= Y)
              throw new Error("field id collision or not sorted");
            Z = Y;
            const J = Number(Zt(A));
            re.push([Y, J]);
          }
          w.push([q, re]);
          break;
        }
        case -22: {
          const re = [];
          let P = Number(Ze(A));
          for (; P--; ) re.push(Number(Zt(A)));
          const Z = [];
          let Y = Number(Ze(A));
          for (; Y--; ) Z.push(Number(Zt(A)));
          const J = [];
          let Q = Number(Ze(A));
          for (; Q--; )
            switch (Number(Ze(A))) {
              case 1: {
                J.push("query");
                break;
              }
              case 2: {
                J.push("oneway");
                break;
              }
              case 3: {
                J.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          w.push([q, [re, Z, J]]);
          break;
        }
        case -23: {
          let re = Number(Ze(A));
          const P = [];
          for (; re--; ) {
            const Z = Number(Ze(A)),
              Y = new TextDecoder().decode(mr(A, Z)),
              J = Zt(A);
            P.push([Y, J]);
          }
          w.push([q, P]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + q);
      }
    }
    const C = [],
      W = Number(Ze(A));
    for (let z = 0; z < W; z++) C.push(Number(Zt(A)));
    return [w, C];
  }
  const [l, a] = o(r);
  if (a.length < t.length) throw new Error("Wrong number of return values");
  const p = l.map((A) => ka());
  function g(A) {
    if (A < -24) throw new Error("future value not supported");
    if (A < 0)
      switch (A) {
        case -1:
          return ya;
        case -2:
          return pa;
        case -3:
          return ma;
        case -4:
          return ga;
        case -5:
          return Ba;
        case -6:
          return Sa;
        case -7:
          return Ta;
        case -8:
          return Na;
        case -9:
          return xa;
        case -10:
          return Ea;
        case -11:
          return va;
        case -12:
          return Aa;
        case -13:
          return ba;
        case -14:
          return _a;
        case -15:
          return wa;
        case -16:
          return da;
        case -17:
          return ha;
        case -24:
          return Ia;
        default:
          throw new Error("Illegal op_code: " + A);
      }
    if (A >= l.length) throw new Error("type index out of range");
    return p[A];
  }
  function E(A) {
    switch (A[0]) {
      case -19: {
        const w = g(A[1]);
        return Oa(w);
      }
      case -18: {
        const w = g(A[1]);
        return Ua(w);
      }
      case -20: {
        const w = {};
        for (const [W, z] of A[1]) {
          const q = `_${W}_`;
          w[q] = g(z);
        }
        const $ = Fa(w),
          C = $.tryAsTuple();
        return Array.isArray(C) ? Ra(...C) : $;
      }
      case -21: {
        const w = {};
        for (const [$, C] of A[1]) {
          const W = `_${$}_`;
          w[W] = g(C);
        }
        return Pa(w);
      }
      case -22: {
        const [w, $, C] = A[1];
        return Ma(
          w.map((W) => g(W)),
          $.map((W) => g(W)),
          C,
        );
      }
      case -23: {
        const w = {},
          $ = A[1];
        for (const [C, W] of $) {
          let z = g(W);
          if ((z instanceof ur && (z = z.getType()), !(z instanceof Rs)))
            throw new Error(
              "Illegal service definition: services can only contain functions",
            );
          w[C] = z;
        }
        return Ca(w);
      }
      default:
        throw new Error("Illegal op_code: " + A[0]);
    }
  }
  l.forEach((A, w) => {
    if (A[0] === -22) {
      const $ = E(A);
      p[w].fill($);
    }
  }),
    l.forEach((A, w) => {
      if (A[0] !== -22) {
        const $ = E(A);
        p[w].fill($);
      }
    });
  const S = a.map((A) => g(A)),
    I = t.map((A, w) => A.decodeValue(r, S[w]));
  for (let A = t.length; A < S.length; A++) S[A].decodeValue(r, S[A]);
  if (r.byteLength > 0) throw new Error("decode: Left-over bytes");
  return I;
}
const ha = new ra(),
  da = new oi(),
  Qu = new na(),
  pa = new ia(),
  ya = new sa(),
  wa = new oa(),
  ga = new aa(),
  ma = new ca(),
  ba = new Ns(32),
  _a = new Ns(64),
  xa = new _r(8),
  Ea = new _r(16),
  va = new _r(32),
  Aa = new _r(64),
  Ba = new sr(8),
  Sa = new sr(16),
  Ta = new sr(32),
  Na = new sr(64),
  Ia = new ua();
function Ra(...t) {
  return new xi(t);
}
function Oa(t) {
  return new _i(t);
}
function Ua(t) {
  return new Vr(t);
}
function Fa(t) {
  return new yn(t);
}
function Pa(t) {
  return new Ei(t);
}
function ka() {
  return new ur();
}
function Ma(t, e, r = []) {
  return new Rs(t, e, r);
}
function Ca(t) {
  return new fa(t);
}
const ef = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Bool: pa,
      BoolClass: ia,
      ConstructType: cr,
      Empty: ha,
      EmptyClass: ra,
      FixedIntClass: _r,
      FixedNatClass: sr,
      Float32: ba,
      Float64: _a,
      FloatClass: Ns,
      Func: Ma,
      FuncClass: Rs,
      Int: ga,
      Int16: Ea,
      Int32: va,
      Int64: Aa,
      Int8: xa,
      IntClass: aa,
      Nat: ma,
      Nat16: Sa,
      Nat32: Ta,
      Nat64: Na,
      Nat8: Ba,
      NatClass: ca,
      Null: ya,
      NullClass: sa,
      Opt: Ua,
      OptClass: Vr,
      PrimitiveType: yt,
      Principal: Ia,
      PrincipalClass: ua,
      Rec: ka,
      RecClass: ur,
      Record: Fa,
      RecordClass: yn,
      Reserved: da,
      ReservedClass: oi,
      Service: Ca,
      ServiceClass: fa,
      Text: wa,
      TextClass: oa,
      Tuple: Ra,
      TupleClass: xi,
      Type: bi,
      Unknown: Qu,
      UnknownClass: na,
      Variant: Pa,
      VariantClass: Ei,
      Vec: Oa,
      VecClass: _i,
      Visitor: Ju,
      decode: la,
      encode: os,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var $a = {},
  wn = {};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (t) {
  var e = hn,
    r = dn,
    n =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (t.Buffer = a), (t.SlowBuffer = z), (t.INSPECT_MAX_BYTES = 50);
  var i = 2147483647;
  (t.kMaxLength = i),
    (a.TYPED_ARRAY_SUPPORT = o()),
    !a.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function o() {
    try {
      var h = new Uint8Array(1),
        s = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(s, Uint8Array.prototype),
        Object.setPrototypeOf(h, s),
        h.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(a.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (a.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(a.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (a.isBuffer(this)) return this.byteOffset;
      },
    });
  function l(h) {
    if (h > i)
      throw new RangeError(
        'The value "' + h + '" is invalid for option "size"',
      );
    var s = new Uint8Array(h);
    return Object.setPrototypeOf(s, a.prototype), s;
  }
  function a(h, s, c) {
    if (typeof h == "number") {
      if (typeof s == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return S(h);
    }
    return p(h, s, c);
  }
  a.poolSize = 8192;
  function p(h, s, c) {
    if (typeof h == "string") return I(h, s);
    if (ArrayBuffer.isView(h)) return w(h);
    if (h == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof h,
      );
    if (
      k(h, ArrayBuffer) ||
      (h && k(h.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (k(h, SharedArrayBuffer) || (h && k(h.buffer, SharedArrayBuffer))))
    )
      return $(h, s, c);
    if (typeof h == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    var y = h.valueOf && h.valueOf();
    if (y != null && y !== h) return a.from(y, s, c);
    var _ = C(h);
    if (_) return _;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof h[Symbol.toPrimitive] == "function"
    )
      return a.from(h[Symbol.toPrimitive]("string"), s, c);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof h,
    );
  }
  (a.from = function (h, s, c) {
    return p(h, s, c);
  }),
    Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(a, Uint8Array);
  function g(h) {
    if (typeof h != "number")
      throw new TypeError('"size" argument must be of type number');
    if (h < 0)
      throw new RangeError(
        'The value "' + h + '" is invalid for option "size"',
      );
  }
  function E(h, s, c) {
    return (
      g(h),
      h <= 0
        ? l(h)
        : s !== void 0
          ? typeof c == "string"
            ? l(h).fill(s, c)
            : l(h).fill(s)
          : l(h)
    );
  }
  a.alloc = function (h, s, c) {
    return E(h, s, c);
  };
  function S(h) {
    return g(h), l(h < 0 ? 0 : W(h) | 0);
  }
  (a.allocUnsafe = function (h) {
    return S(h);
  }),
    (a.allocUnsafeSlow = function (h) {
      return S(h);
    });
  function I(h, s) {
    if (((typeof s != "string" || s === "") && (s = "utf8"), !a.isEncoding(s)))
      throw new TypeError("Unknown encoding: " + s);
    var c = q(h, s) | 0,
      y = l(c),
      _ = y.write(h, s);
    return _ !== c && (y = y.slice(0, _)), y;
  }
  function A(h) {
    for (
      var s = h.length < 0 ? 0 : W(h.length) | 0, c = l(s), y = 0;
      y < s;
      y += 1
    )
      c[y] = h[y] & 255;
    return c;
  }
  function w(h) {
    if (k(h, Uint8Array)) {
      var s = new Uint8Array(h);
      return $(s.buffer, s.byteOffset, s.byteLength);
    }
    return A(h);
  }
  function $(h, s, c) {
    if (s < 0 || h.byteLength < s)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (h.byteLength < s + (c || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var y;
    return (
      s === void 0 && c === void 0
        ? (y = new Uint8Array(h))
        : c === void 0
          ? (y = new Uint8Array(h, s))
          : (y = new Uint8Array(h, s, c)),
      Object.setPrototypeOf(y, a.prototype),
      y
    );
  }
  function C(h) {
    if (a.isBuffer(h)) {
      var s = W(h.length) | 0,
        c = l(s);
      return c.length === 0 || h.copy(c, 0, 0, s), c;
    }
    if (h.length !== void 0)
      return typeof h.length != "number" || O(h.length) ? l(0) : A(h);
    if (h.type === "Buffer" && Array.isArray(h.data)) return A(h.data);
  }
  function W(h) {
    if (h >= i)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          i.toString(16) +
          " bytes",
      );
    return h | 0;
  }
  function z(h) {
    return +h != h && (h = 0), a.alloc(+h);
  }
  (a.isBuffer = function (s) {
    return s != null && s._isBuffer === !0 && s !== a.prototype;
  }),
    (a.compare = function (s, c) {
      if (
        (k(s, Uint8Array) && (s = a.from(s, s.offset, s.byteLength)),
        k(c, Uint8Array) && (c = a.from(c, c.offset, c.byteLength)),
        !a.isBuffer(s) || !a.isBuffer(c))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (s === c) return 0;
      for (
        var y = s.length, _ = c.length, T = 0, V = Math.min(y, _);
        T < V;
        ++T
      )
        if (s[T] !== c[T]) {
          (y = s[T]), (_ = c[T]);
          break;
        }
      return y < _ ? -1 : _ < y ? 1 : 0;
    }),
    (a.isEncoding = function (s) {
      switch (String(s).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (a.concat = function (s, c) {
      if (!Array.isArray(s))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (s.length === 0) return a.alloc(0);
      var y;
      if (c === void 0) for (c = 0, y = 0; y < s.length; ++y) c += s[y].length;
      var _ = a.allocUnsafe(c),
        T = 0;
      for (y = 0; y < s.length; ++y) {
        var V = s[y];
        if (k(V, Uint8Array))
          T + V.length > _.length
            ? a.from(V).copy(_, T)
            : Uint8Array.prototype.set.call(_, V, T);
        else if (a.isBuffer(V)) V.copy(_, T);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        T += V.length;
      }
      return _;
    });
  function q(h, s) {
    if (a.isBuffer(h)) return h.length;
    if (ArrayBuffer.isView(h) || k(h, ArrayBuffer)) return h.byteLength;
    if (typeof h != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof h,
      );
    var c = h.length,
      y = arguments.length > 2 && arguments[2] === !0;
    if (!y && c === 0) return 0;
    for (var _ = !1; ; )
      switch (s) {
        case "ascii":
        case "latin1":
        case "binary":
          return c;
        case "utf8":
        case "utf-8":
          return te(h).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return c * 2;
        case "hex":
          return c >>> 1;
        case "base64":
          return x(h).length;
        default:
          if (_) return y ? -1 : te(h).length;
          (s = ("" + s).toLowerCase()), (_ = !0);
      }
  }
  a.byteLength = q;
  function re(h, s, c) {
    var y = !1;
    if (
      ((s === void 0 || s < 0) && (s = 0),
      s > this.length ||
        ((c === void 0 || c > this.length) && (c = this.length), c <= 0) ||
        ((c >>>= 0), (s >>>= 0), c <= s))
    )
      return "";
    for (h || (h = "utf8"); ; )
      switch (h) {
        case "hex":
          return ie(this, s, c);
        case "utf8":
        case "utf-8":
          return U(this, s, c);
        case "ascii":
          return G(this, s, c);
        case "latin1":
        case "binary":
          return D(this, s, c);
        case "base64":
          return N(this, s, c);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ge(this, s, c);
        default:
          if (y) throw new TypeError("Unknown encoding: " + h);
          (h = (h + "").toLowerCase()), (y = !0);
      }
  }
  a.prototype._isBuffer = !0;
  function P(h, s, c) {
    var y = h[s];
    (h[s] = h[c]), (h[c] = y);
  }
  (a.prototype.swap16 = function () {
    var s = this.length;
    if (s % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var c = 0; c < s; c += 2) P(this, c, c + 1);
    return this;
  }),
    (a.prototype.swap32 = function () {
      var s = this.length;
      if (s % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var c = 0; c < s; c += 4) P(this, c, c + 3), P(this, c + 1, c + 2);
      return this;
    }),
    (a.prototype.swap64 = function () {
      var s = this.length;
      if (s % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var c = 0; c < s; c += 8)
        P(this, c, c + 7),
          P(this, c + 1, c + 6),
          P(this, c + 2, c + 5),
          P(this, c + 3, c + 4);
      return this;
    }),
    (a.prototype.toString = function () {
      var s = this.length;
      return s === 0
        ? ""
        : arguments.length === 0
          ? U(this, 0, s)
          : re.apply(this, arguments);
    }),
    (a.prototype.toLocaleString = a.prototype.toString),
    (a.prototype.equals = function (s) {
      if (!a.isBuffer(s)) throw new TypeError("Argument must be a Buffer");
      return this === s ? !0 : a.compare(this, s) === 0;
    }),
    (a.prototype.inspect = function () {
      var s = "",
        c = t.INSPECT_MAX_BYTES;
      return (
        (s = this.toString("hex", 0, c)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > c && (s += " ... "),
        "<Buffer " + s + ">"
      );
    }),
    n && (a.prototype[n] = a.prototype.inspect),
    (a.prototype.compare = function (s, c, y, _, T) {
      if (
        (k(s, Uint8Array) && (s = a.from(s, s.offset, s.byteLength)),
        !a.isBuffer(s))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof s,
        );
      if (
        (c === void 0 && (c = 0),
        y === void 0 && (y = s ? s.length : 0),
        _ === void 0 && (_ = 0),
        T === void 0 && (T = this.length),
        c < 0 || y > s.length || _ < 0 || T > this.length)
      )
        throw new RangeError("out of range index");
      if (_ >= T && c >= y) return 0;
      if (_ >= T) return -1;
      if (c >= y) return 1;
      if (((c >>>= 0), (y >>>= 0), (_ >>>= 0), (T >>>= 0), this === s))
        return 0;
      for (
        var V = T - _,
          ne = y - c,
          pe = Math.min(V, ne),
          ye = this.slice(_, T),
          xe = s.slice(c, y),
          d = 0;
        d < pe;
        ++d
      )
        if (ye[d] !== xe[d]) {
          (V = ye[d]), (ne = xe[d]);
          break;
        }
      return V < ne ? -1 : ne < V ? 1 : 0;
    });
  function Z(h, s, c, y, _) {
    if (h.length === 0) return -1;
    if (
      (typeof c == "string"
        ? ((y = c), (c = 0))
        : c > 2147483647
          ? (c = 2147483647)
          : c < -2147483648 && (c = -2147483648),
      (c = +c),
      O(c) && (c = _ ? 0 : h.length - 1),
      c < 0 && (c = h.length + c),
      c >= h.length)
    ) {
      if (_) return -1;
      c = h.length - 1;
    } else if (c < 0)
      if (_) c = 0;
      else return -1;
    if ((typeof s == "string" && (s = a.from(s, y)), a.isBuffer(s)))
      return s.length === 0 ? -1 : Y(h, s, c, y, _);
    if (typeof s == "number")
      return (
        (s = s & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? _
            ? Uint8Array.prototype.indexOf.call(h, s, c)
            : Uint8Array.prototype.lastIndexOf.call(h, s, c)
          : Y(h, [s], c, y, _)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function Y(h, s, c, y, _) {
    var T = 1,
      V = h.length,
      ne = s.length;
    if (
      y !== void 0 &&
      ((y = String(y).toLowerCase()),
      y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")
    ) {
      if (h.length < 2 || s.length < 2) return -1;
      (T = 2), (V /= 2), (ne /= 2), (c /= 2);
    }
    function pe(f, v) {
      return T === 1 ? f[v] : f.readUInt16BE(v * T);
    }
    var ye;
    if (_) {
      var xe = -1;
      for (ye = c; ye < V; ye++)
        if (pe(h, ye) === pe(s, xe === -1 ? 0 : ye - xe)) {
          if ((xe === -1 && (xe = ye), ye - xe + 1 === ne)) return xe * T;
        } else xe !== -1 && (ye -= ye - xe), (xe = -1);
    } else
      for (c + ne > V && (c = V - ne), ye = c; ye >= 0; ye--) {
        for (var d = !0, u = 0; u < ne; u++)
          if (pe(h, ye + u) !== pe(s, u)) {
            d = !1;
            break;
          }
        if (d) return ye;
      }
    return -1;
  }
  (a.prototype.includes = function (s, c, y) {
    return this.indexOf(s, c, y) !== -1;
  }),
    (a.prototype.indexOf = function (s, c, y) {
      return Z(this, s, c, y, !0);
    }),
    (a.prototype.lastIndexOf = function (s, c, y) {
      return Z(this, s, c, y, !1);
    });
  function J(h, s, c, y) {
    c = Number(c) || 0;
    var _ = h.length - c;
    y ? ((y = Number(y)), y > _ && (y = _)) : (y = _);
    var T = s.length;
    y > T / 2 && (y = T / 2);
    for (var V = 0; V < y; ++V) {
      var ne = parseInt(s.substr(V * 2, 2), 16);
      if (O(ne)) return V;
      h[c + V] = ne;
    }
    return V;
  }
  function Q(h, s, c, y) {
    return B(te(s, h.length - c), h, c, y);
  }
  function X(h, s, c, y) {
    return B(ae(s), h, c, y);
  }
  function he(h, s, c, y) {
    return B(x(s), h, c, y);
  }
  function le(h, s, c, y) {
    return B(b(s, h.length - c), h, c, y);
  }
  (a.prototype.write = function (s, c, y, _) {
    if (c === void 0) (_ = "utf8"), (y = this.length), (c = 0);
    else if (y === void 0 && typeof c == "string")
      (_ = c), (y = this.length), (c = 0);
    else if (isFinite(c))
      (c = c >>> 0),
        isFinite(y)
          ? ((y = y >>> 0), _ === void 0 && (_ = "utf8"))
          : ((_ = y), (y = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    var T = this.length - c;
    if (
      ((y === void 0 || y > T) && (y = T),
      (s.length > 0 && (y < 0 || c < 0)) || c > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    _ || (_ = "utf8");
    for (var V = !1; ; )
      switch (_) {
        case "hex":
          return J(this, s, c, y);
        case "utf8":
        case "utf-8":
          return Q(this, s, c, y);
        case "ascii":
        case "latin1":
        case "binary":
          return X(this, s, c, y);
        case "base64":
          return he(this, s, c, y);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return le(this, s, c, y);
        default:
          if (V) throw new TypeError("Unknown encoding: " + _);
          (_ = ("" + _).toLowerCase()), (V = !0);
      }
  }),
    (a.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function N(h, s, c) {
    return s === 0 && c === h.length
      ? e.fromByteArray(h)
      : e.fromByteArray(h.slice(s, c));
  }
  function U(h, s, c) {
    c = Math.min(h.length, c);
    for (var y = [], _ = s; _ < c; ) {
      var T = h[_],
        V = null,
        ne = T > 239 ? 4 : T > 223 ? 3 : T > 191 ? 2 : 1;
      if (_ + ne <= c) {
        var pe, ye, xe, d;
        switch (ne) {
          case 1:
            T < 128 && (V = T);
            break;
          case 2:
            (pe = h[_ + 1]),
              (pe & 192) === 128 &&
                ((d = ((T & 31) << 6) | (pe & 63)), d > 127 && (V = d));
            break;
          case 3:
            (pe = h[_ + 1]),
              (ye = h[_ + 2]),
              (pe & 192) === 128 &&
                (ye & 192) === 128 &&
                ((d = ((T & 15) << 12) | ((pe & 63) << 6) | (ye & 63)),
                d > 2047 && (d < 55296 || d > 57343) && (V = d));
            break;
          case 4:
            (pe = h[_ + 1]),
              (ye = h[_ + 2]),
              (xe = h[_ + 3]),
              (pe & 192) === 128 &&
                (ye & 192) === 128 &&
                (xe & 192) === 128 &&
                ((d =
                  ((T & 15) << 18) |
                  ((pe & 63) << 12) |
                  ((ye & 63) << 6) |
                  (xe & 63)),
                d > 65535 && d < 1114112 && (V = d));
        }
      }
      V === null
        ? ((V = 65533), (ne = 1))
        : V > 65535 &&
          ((V -= 65536),
          y.push(((V >>> 10) & 1023) | 55296),
          (V = 56320 | (V & 1023))),
        y.push(V),
        (_ += ne);
    }
    return j(y);
  }
  var L = 4096;
  function j(h) {
    var s = h.length;
    if (s <= L) return String.fromCharCode.apply(String, h);
    for (var c = "", y = 0; y < s; )
      c += String.fromCharCode.apply(String, h.slice(y, (y += L)));
    return c;
  }
  function G(h, s, c) {
    var y = "";
    c = Math.min(h.length, c);
    for (var _ = s; _ < c; ++_) y += String.fromCharCode(h[_] & 127);
    return y;
  }
  function D(h, s, c) {
    var y = "";
    c = Math.min(h.length, c);
    for (var _ = s; _ < c; ++_) y += String.fromCharCode(h[_]);
    return y;
  }
  function ie(h, s, c) {
    var y = h.length;
    (!s || s < 0) && (s = 0), (!c || c < 0 || c > y) && (c = y);
    for (var _ = "", T = s; T < c; ++T) _ += M[h[T]];
    return _;
  }
  function ge(h, s, c) {
    for (var y = h.slice(s, c), _ = "", T = 0; T < y.length - 1; T += 2)
      _ += String.fromCharCode(y[T] + y[T + 1] * 256);
    return _;
  }
  a.prototype.slice = function (s, c) {
    var y = this.length;
    (s = ~~s),
      (c = c === void 0 ? y : ~~c),
      s < 0 ? ((s += y), s < 0 && (s = 0)) : s > y && (s = y),
      c < 0 ? ((c += y), c < 0 && (c = 0)) : c > y && (c = y),
      c < s && (c = s);
    var _ = this.subarray(s, c);
    return Object.setPrototypeOf(_, a.prototype), _;
  };
  function oe(h, s, c) {
    if (h % 1 !== 0 || h < 0) throw new RangeError("offset is not uint");
    if (h + s > c)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (a.prototype.readUintLE = a.prototype.readUIntLE =
    function (s, c, y) {
      (s = s >>> 0), (c = c >>> 0), y || oe(s, c, this.length);
      for (var _ = this[s], T = 1, V = 0; ++V < c && (T *= 256); )
        _ += this[s + V] * T;
      return _;
    }),
    (a.prototype.readUintBE = a.prototype.readUIntBE =
      function (s, c, y) {
        (s = s >>> 0), (c = c >>> 0), y || oe(s, c, this.length);
        for (var _ = this[s + --c], T = 1; c > 0 && (T *= 256); )
          _ += this[s + --c] * T;
        return _;
      }),
    (a.prototype.readUint8 = a.prototype.readUInt8 =
      function (s, c) {
        return (s = s >>> 0), c || oe(s, 1, this.length), this[s];
      }),
    (a.prototype.readUint16LE = a.prototype.readUInt16LE =
      function (s, c) {
        return (
          (s = s >>> 0),
          c || oe(s, 2, this.length),
          this[s] | (this[s + 1] << 8)
        );
      }),
    (a.prototype.readUint16BE = a.prototype.readUInt16BE =
      function (s, c) {
        return (
          (s = s >>> 0),
          c || oe(s, 2, this.length),
          (this[s] << 8) | this[s + 1]
        );
      }),
    (a.prototype.readUint32LE = a.prototype.readUInt32LE =
      function (s, c) {
        return (
          (s = s >>> 0),
          c || oe(s, 4, this.length),
          (this[s] | (this[s + 1] << 8) | (this[s + 2] << 16)) +
            this[s + 3] * 16777216
        );
      }),
    (a.prototype.readUint32BE = a.prototype.readUInt32BE =
      function (s, c) {
        return (
          (s = s >>> 0),
          c || oe(s, 4, this.length),
          this[s] * 16777216 +
            ((this[s + 1] << 16) | (this[s + 2] << 8) | this[s + 3])
        );
      }),
    (a.prototype.readIntLE = function (s, c, y) {
      (s = s >>> 0), (c = c >>> 0), y || oe(s, c, this.length);
      for (var _ = this[s], T = 1, V = 0; ++V < c && (T *= 256); )
        _ += this[s + V] * T;
      return (T *= 128), _ >= T && (_ -= Math.pow(2, 8 * c)), _;
    }),
    (a.prototype.readIntBE = function (s, c, y) {
      (s = s >>> 0), (c = c >>> 0), y || oe(s, c, this.length);
      for (var _ = c, T = 1, V = this[s + --_]; _ > 0 && (T *= 256); )
        V += this[s + --_] * T;
      return (T *= 128), V >= T && (V -= Math.pow(2, 8 * c)), V;
    }),
    (a.prototype.readInt8 = function (s, c) {
      return (
        (s = s >>> 0),
        c || oe(s, 1, this.length),
        this[s] & 128 ? (255 - this[s] + 1) * -1 : this[s]
      );
    }),
    (a.prototype.readInt16LE = function (s, c) {
      (s = s >>> 0), c || oe(s, 2, this.length);
      var y = this[s] | (this[s + 1] << 8);
      return y & 32768 ? y | 4294901760 : y;
    }),
    (a.prototype.readInt16BE = function (s, c) {
      (s = s >>> 0), c || oe(s, 2, this.length);
      var y = this[s + 1] | (this[s] << 8);
      return y & 32768 ? y | 4294901760 : y;
    }),
    (a.prototype.readInt32LE = function (s, c) {
      return (
        (s = s >>> 0),
        c || oe(s, 4, this.length),
        this[s] | (this[s + 1] << 8) | (this[s + 2] << 16) | (this[s + 3] << 24)
      );
    }),
    (a.prototype.readInt32BE = function (s, c) {
      return (
        (s = s >>> 0),
        c || oe(s, 4, this.length),
        (this[s] << 24) | (this[s + 1] << 16) | (this[s + 2] << 8) | this[s + 3]
      );
    }),
    (a.prototype.readFloatLE = function (s, c) {
      return (
        (s = s >>> 0), c || oe(s, 4, this.length), r.read(this, s, !0, 23, 4)
      );
    }),
    (a.prototype.readFloatBE = function (s, c) {
      return (
        (s = s >>> 0), c || oe(s, 4, this.length), r.read(this, s, !1, 23, 4)
      );
    }),
    (a.prototype.readDoubleLE = function (s, c) {
      return (
        (s = s >>> 0), c || oe(s, 8, this.length), r.read(this, s, !0, 52, 8)
      );
    }),
    (a.prototype.readDoubleBE = function (s, c) {
      return (
        (s = s >>> 0), c || oe(s, 8, this.length), r.read(this, s, !1, 52, 8)
      );
    });
  function fe(h, s, c, y, _, T) {
    if (!a.isBuffer(h))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (s > _ || s < T)
      throw new RangeError('"value" argument is out of bounds');
    if (c + y > h.length) throw new RangeError("Index out of range");
  }
  (a.prototype.writeUintLE = a.prototype.writeUIntLE =
    function (s, c, y, _) {
      if (((s = +s), (c = c >>> 0), (y = y >>> 0), !_)) {
        var T = Math.pow(2, 8 * y) - 1;
        fe(this, s, c, y, T, 0);
      }
      var V = 1,
        ne = 0;
      for (this[c] = s & 255; ++ne < y && (V *= 256); )
        this[c + ne] = (s / V) & 255;
      return c + y;
    }),
    (a.prototype.writeUintBE = a.prototype.writeUIntBE =
      function (s, c, y, _) {
        if (((s = +s), (c = c >>> 0), (y = y >>> 0), !_)) {
          var T = Math.pow(2, 8 * y) - 1;
          fe(this, s, c, y, T, 0);
        }
        var V = y - 1,
          ne = 1;
        for (this[c + V] = s & 255; --V >= 0 && (ne *= 256); )
          this[c + V] = (s / ne) & 255;
        return c + y;
      }),
    (a.prototype.writeUint8 = a.prototype.writeUInt8 =
      function (s, c, y) {
        return (
          (s = +s),
          (c = c >>> 0),
          y || fe(this, s, c, 1, 255, 0),
          (this[c] = s & 255),
          c + 1
        );
      }),
    (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
      function (s, c, y) {
        return (
          (s = +s),
          (c = c >>> 0),
          y || fe(this, s, c, 2, 65535, 0),
          (this[c] = s & 255),
          (this[c + 1] = s >>> 8),
          c + 2
        );
      }),
    (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
      function (s, c, y) {
        return (
          (s = +s),
          (c = c >>> 0),
          y || fe(this, s, c, 2, 65535, 0),
          (this[c] = s >>> 8),
          (this[c + 1] = s & 255),
          c + 2
        );
      }),
    (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
      function (s, c, y) {
        return (
          (s = +s),
          (c = c >>> 0),
          y || fe(this, s, c, 4, 4294967295, 0),
          (this[c + 3] = s >>> 24),
          (this[c + 2] = s >>> 16),
          (this[c + 1] = s >>> 8),
          (this[c] = s & 255),
          c + 4
        );
      }),
    (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
      function (s, c, y) {
        return (
          (s = +s),
          (c = c >>> 0),
          y || fe(this, s, c, 4, 4294967295, 0),
          (this[c] = s >>> 24),
          (this[c + 1] = s >>> 16),
          (this[c + 2] = s >>> 8),
          (this[c + 3] = s & 255),
          c + 4
        );
      }),
    (a.prototype.writeIntLE = function (s, c, y, _) {
      if (((s = +s), (c = c >>> 0), !_)) {
        var T = Math.pow(2, 8 * y - 1);
        fe(this, s, c, y, T - 1, -T);
      }
      var V = 0,
        ne = 1,
        pe = 0;
      for (this[c] = s & 255; ++V < y && (ne *= 256); )
        s < 0 && pe === 0 && this[c + V - 1] !== 0 && (pe = 1),
          (this[c + V] = (((s / ne) >> 0) - pe) & 255);
      return c + y;
    }),
    (a.prototype.writeIntBE = function (s, c, y, _) {
      if (((s = +s), (c = c >>> 0), !_)) {
        var T = Math.pow(2, 8 * y - 1);
        fe(this, s, c, y, T - 1, -T);
      }
      var V = y - 1,
        ne = 1,
        pe = 0;
      for (this[c + V] = s & 255; --V >= 0 && (ne *= 256); )
        s < 0 && pe === 0 && this[c + V + 1] !== 0 && (pe = 1),
          (this[c + V] = (((s / ne) >> 0) - pe) & 255);
      return c + y;
    }),
    (a.prototype.writeInt8 = function (s, c, y) {
      return (
        (s = +s),
        (c = c >>> 0),
        y || fe(this, s, c, 1, 127, -128),
        s < 0 && (s = 255 + s + 1),
        (this[c] = s & 255),
        c + 1
      );
    }),
    (a.prototype.writeInt16LE = function (s, c, y) {
      return (
        (s = +s),
        (c = c >>> 0),
        y || fe(this, s, c, 2, 32767, -32768),
        (this[c] = s & 255),
        (this[c + 1] = s >>> 8),
        c + 2
      );
    }),
    (a.prototype.writeInt16BE = function (s, c, y) {
      return (
        (s = +s),
        (c = c >>> 0),
        y || fe(this, s, c, 2, 32767, -32768),
        (this[c] = s >>> 8),
        (this[c + 1] = s & 255),
        c + 2
      );
    }),
    (a.prototype.writeInt32LE = function (s, c, y) {
      return (
        (s = +s),
        (c = c >>> 0),
        y || fe(this, s, c, 4, 2147483647, -2147483648),
        (this[c] = s & 255),
        (this[c + 1] = s >>> 8),
        (this[c + 2] = s >>> 16),
        (this[c + 3] = s >>> 24),
        c + 4
      );
    }),
    (a.prototype.writeInt32BE = function (s, c, y) {
      return (
        (s = +s),
        (c = c >>> 0),
        y || fe(this, s, c, 4, 2147483647, -2147483648),
        s < 0 && (s = 4294967295 + s + 1),
        (this[c] = s >>> 24),
        (this[c + 1] = s >>> 16),
        (this[c + 2] = s >>> 8),
        (this[c + 3] = s & 255),
        c + 4
      );
    });
  function ee(h, s, c, y, _, T) {
    if (c + y > h.length) throw new RangeError("Index out of range");
    if (c < 0) throw new RangeError("Index out of range");
  }
  function m(h, s, c, y, _) {
    return (
      (s = +s),
      (c = c >>> 0),
      _ || ee(h, s, c, 4),
      r.write(h, s, c, y, 23, 4),
      c + 4
    );
  }
  (a.prototype.writeFloatLE = function (s, c, y) {
    return m(this, s, c, !0, y);
  }),
    (a.prototype.writeFloatBE = function (s, c, y) {
      return m(this, s, c, !1, y);
    });
  function se(h, s, c, y, _) {
    return (
      (s = +s),
      (c = c >>> 0),
      _ || ee(h, s, c, 8),
      r.write(h, s, c, y, 52, 8),
      c + 8
    );
  }
  (a.prototype.writeDoubleLE = function (s, c, y) {
    return se(this, s, c, !0, y);
  }),
    (a.prototype.writeDoubleBE = function (s, c, y) {
      return se(this, s, c, !1, y);
    }),
    (a.prototype.copy = function (s, c, y, _) {
      if (!a.isBuffer(s)) throw new TypeError("argument should be a Buffer");
      if (
        (y || (y = 0),
        !_ && _ !== 0 && (_ = this.length),
        c >= s.length && (c = s.length),
        c || (c = 0),
        _ > 0 && _ < y && (_ = y),
        _ === y || s.length === 0 || this.length === 0)
      )
        return 0;
      if (c < 0) throw new RangeError("targetStart out of bounds");
      if (y < 0 || y >= this.length) throw new RangeError("Index out of range");
      if (_ < 0) throw new RangeError("sourceEnd out of bounds");
      _ > this.length && (_ = this.length),
        s.length - c < _ - y && (_ = s.length - c + y);
      var T = _ - y;
      return (
        this === s && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(c, y, _)
          : Uint8Array.prototype.set.call(s, this.subarray(y, _), c),
        T
      );
    }),
    (a.prototype.fill = function (s, c, y, _) {
      if (typeof s == "string") {
        if (
          (typeof c == "string"
            ? ((_ = c), (c = 0), (y = this.length))
            : typeof y == "string" && ((_ = y), (y = this.length)),
          _ !== void 0 && typeof _ != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof _ == "string" && !a.isEncoding(_))
          throw new TypeError("Unknown encoding: " + _);
        if (s.length === 1) {
          var T = s.charCodeAt(0);
          ((_ === "utf8" && T < 128) || _ === "latin1") && (s = T);
        }
      } else
        typeof s == "number"
          ? (s = s & 255)
          : typeof s == "boolean" && (s = Number(s));
      if (c < 0 || this.length < c || this.length < y)
        throw new RangeError("Out of range index");
      if (y <= c) return this;
      (c = c >>> 0), (y = y === void 0 ? this.length : y >>> 0), s || (s = 0);
      var V;
      if (typeof s == "number") for (V = c; V < y; ++V) this[V] = s;
      else {
        var ne = a.isBuffer(s) ? s : a.from(s, _),
          pe = ne.length;
        if (pe === 0)
          throw new TypeError(
            'The value "' + s + '" is invalid for argument "value"',
          );
        for (V = 0; V < y - c; ++V) this[V + c] = ne[V % pe];
      }
      return this;
    });
  var ue = /[^+/0-9A-Za-z-_]/g;
  function de(h) {
    if (((h = h.split("=")[0]), (h = h.trim().replace(ue, "")), h.length < 2))
      return "";
    for (; h.length % 4 !== 0; ) h = h + "=";
    return h;
  }
  function te(h, s) {
    s = s || 1 / 0;
    for (var c, y = h.length, _ = null, T = [], V = 0; V < y; ++V) {
      if (((c = h.charCodeAt(V)), c > 55295 && c < 57344)) {
        if (!_) {
          if (c > 56319) {
            (s -= 3) > -1 && T.push(239, 191, 189);
            continue;
          } else if (V + 1 === y) {
            (s -= 3) > -1 && T.push(239, 191, 189);
            continue;
          }
          _ = c;
          continue;
        }
        if (c < 56320) {
          (s -= 3) > -1 && T.push(239, 191, 189), (_ = c);
          continue;
        }
        c = (((_ - 55296) << 10) | (c - 56320)) + 65536;
      } else _ && (s -= 3) > -1 && T.push(239, 191, 189);
      if (((_ = null), c < 128)) {
        if ((s -= 1) < 0) break;
        T.push(c);
      } else if (c < 2048) {
        if ((s -= 2) < 0) break;
        T.push((c >> 6) | 192, (c & 63) | 128);
      } else if (c < 65536) {
        if ((s -= 3) < 0) break;
        T.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
      } else if (c < 1114112) {
        if ((s -= 4) < 0) break;
        T.push(
          (c >> 18) | 240,
          ((c >> 12) & 63) | 128,
          ((c >> 6) & 63) | 128,
          (c & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return T;
  }
  function ae(h) {
    for (var s = [], c = 0; c < h.length; ++c) s.push(h.charCodeAt(c) & 255);
    return s;
  }
  function b(h, s) {
    for (var c, y, _, T = [], V = 0; V < h.length && !((s -= 2) < 0); ++V)
      (c = h.charCodeAt(V)), (y = c >> 8), (_ = c % 256), T.push(_), T.push(y);
    return T;
  }
  function x(h) {
    return e.toByteArray(de(h));
  }
  function B(h, s, c, y) {
    for (var _ = 0; _ < y && !(_ + c >= s.length || _ >= h.length); ++_)
      s[_ + c] = h[_];
    return _;
  }
  function k(h, s) {
    return (
      h instanceof s ||
      (h != null &&
        h.constructor != null &&
        h.constructor.name != null &&
        h.constructor.name === s.name)
    );
  }
  function O(h) {
    return h !== h;
  }
  var M = (function () {
    for (var h = "0123456789abcdef", s = new Array(256), c = 0; c < 16; ++c)
      for (var y = c * 16, _ = 0; _ < 16; ++_) s[y + _] = h[c] + h[_];
    return s;
  })();
})(wn);
var qa = { exports: {} };
(function (t) {
  (function (e) {
    var r,
      n = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      i = Math.ceil,
      o = Math.floor,
      l = "[BigNumber Error] ",
      a = l + "Number primitive has more than 15 significant digits: ",
      p = 1e14,
      g = 14,
      E = 9007199254740991,
      S = [
        1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
      ],
      I = 1e7,
      A = 1e9;
    function w(Z) {
      var Y,
        J,
        Q,
        X = (m.prototype = { constructor: m, toString: null, valueOf: null }),
        he = new m(1),
        le = 20,
        N = 4,
        U = -7,
        L = 21,
        j = -1e7,
        G = 1e7,
        D = !1,
        ie = 1,
        ge = 0,
        oe = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          suffix: "",
        },
        fe = "0123456789abcdefghijklmnopqrstuvwxyz",
        ee = !0;
      function m(b, x) {
        var B,
          k,
          O,
          M,
          h,
          s,
          c,
          y,
          _ = this;
        if (!(_ instanceof m)) return new m(b, x);
        if (x == null) {
          if (b && b._isBigNumber === !0) {
            (_.s = b.s),
              !b.c || b.e > G
                ? (_.c = _.e = null)
                : b.e < j
                  ? (_.c = [(_.e = 0)])
                  : ((_.e = b.e), (_.c = b.c.slice()));
            return;
          }
          if ((s = typeof b == "number") && b * 0 == 0) {
            if (((_.s = 1 / b < 0 ? ((b = -b), -1) : 1), b === ~~b)) {
              for (M = 0, h = b; h >= 10; h /= 10, M++);
              M > G ? (_.c = _.e = null) : ((_.e = M), (_.c = [b]));
              return;
            }
            y = String(b);
          } else {
            if (!n.test((y = String(b)))) return Q(_, y, s);
            _.s = y.charCodeAt(0) == 45 ? ((y = y.slice(1)), -1) : 1;
          }
          (M = y.indexOf(".")) > -1 && (y = y.replace(".", "")),
            (h = y.search(/e/i)) > 0
              ? (M < 0 && (M = h),
                (M += +y.slice(h + 1)),
                (y = y.substring(0, h)))
              : M < 0 && (M = y.length);
        } else {
          if ((z(x, 2, fe.length, "Base"), x == 10 && ee))
            return (_ = new m(b)), te(_, le + _.e + 1, N);
          if (((y = String(b)), (s = typeof b == "number"))) {
            if (b * 0 != 0) return Q(_, y, s, x);
            if (
              ((_.s = 1 / b < 0 ? ((y = y.slice(1)), -1) : 1),
              m.DEBUG && y.replace(/^0\.0*|\./, "").length > 15)
            )
              throw Error(a + b);
          } else _.s = y.charCodeAt(0) === 45 ? ((y = y.slice(1)), -1) : 1;
          for (B = fe.slice(0, x), M = h = 0, c = y.length; h < c; h++)
            if (B.indexOf((k = y.charAt(h))) < 0) {
              if (k == ".") {
                if (h > M) {
                  M = c;
                  continue;
                }
              } else if (
                !O &&
                ((y == y.toUpperCase() && (y = y.toLowerCase())) ||
                  (y == y.toLowerCase() && (y = y.toUpperCase())))
              ) {
                (O = !0), (h = -1), (M = 0);
                continue;
              }
              return Q(_, String(b), s, x);
            }
          (s = !1),
            (y = J(y, x, 10, _.s)),
            (M = y.indexOf(".")) > -1
              ? (y = y.replace(".", ""))
              : (M = y.length);
        }
        for (h = 0; y.charCodeAt(h) === 48; h++);
        for (c = y.length; y.charCodeAt(--c) === 48; );
        if ((y = y.slice(h, ++c))) {
          if (((c -= h), s && m.DEBUG && c > 15 && (b > E || b !== o(b))))
            throw Error(a + _.s * b);
          if ((M = M - h - 1) > G) _.c = _.e = null;
          else if (M < j) _.c = [(_.e = 0)];
          else {
            if (
              ((_.e = M),
              (_.c = []),
              (h = (M + 1) % g),
              M < 0 && (h += g),
              h < c)
            ) {
              for (h && _.c.push(+y.slice(0, h)), c -= g; h < c; )
                _.c.push(+y.slice(h, (h += g)));
              h = g - (y = y.slice(h)).length;
            } else h -= c;
            for (; h--; y += "0");
            _.c.push(+y);
          }
        } else _.c = [(_.e = 0)];
      }
      (m.clone = w),
        (m.ROUND_UP = 0),
        (m.ROUND_DOWN = 1),
        (m.ROUND_CEIL = 2),
        (m.ROUND_FLOOR = 3),
        (m.ROUND_HALF_UP = 4),
        (m.ROUND_HALF_DOWN = 5),
        (m.ROUND_HALF_EVEN = 6),
        (m.ROUND_HALF_CEIL = 7),
        (m.ROUND_HALF_FLOOR = 8),
        (m.EUCLID = 9),
        (m.config = m.set =
          function (b) {
            var x, B;
            if (b != null)
              if (typeof b == "object") {
                if (
                  (b.hasOwnProperty((x = "DECIMAL_PLACES")) &&
                    ((B = b[x]), z(B, 0, A, x), (le = B)),
                  b.hasOwnProperty((x = "ROUNDING_MODE")) &&
                    ((B = b[x]), z(B, 0, 8, x), (N = B)),
                  b.hasOwnProperty((x = "EXPONENTIAL_AT")) &&
                    ((B = b[x]),
                    B && B.pop
                      ? (z(B[0], -1e9, 0, x),
                        z(B[1], 0, A, x),
                        (U = B[0]),
                        (L = B[1]))
                      : (z(B, -1e9, A, x), (U = -(L = B < 0 ? -B : B)))),
                  b.hasOwnProperty((x = "RANGE")))
                )
                  if (((B = b[x]), B && B.pop))
                    z(B[0], -1e9, -1, x),
                      z(B[1], 1, A, x),
                      (j = B[0]),
                      (G = B[1]);
                  else if ((z(B, -1e9, A, x), B)) j = -(G = B < 0 ? -B : B);
                  else throw Error(l + x + " cannot be zero: " + B);
                if (b.hasOwnProperty((x = "CRYPTO")))
                  if (((B = b[x]), B === !!B))
                    if (B)
                      if (
                        typeof crypto < "u" &&
                        crypto &&
                        (crypto.getRandomValues || crypto.randomBytes)
                      )
                        D = B;
                      else throw ((D = !B), Error(l + "crypto unavailable"));
                    else D = B;
                  else throw Error(l + x + " not true or false: " + B);
                if (
                  (b.hasOwnProperty((x = "MODULO_MODE")) &&
                    ((B = b[x]), z(B, 0, 9, x), (ie = B)),
                  b.hasOwnProperty((x = "POW_PRECISION")) &&
                    ((B = b[x]), z(B, 0, A, x), (ge = B)),
                  b.hasOwnProperty((x = "FORMAT")))
                )
                  if (((B = b[x]), typeof B == "object")) oe = B;
                  else throw Error(l + x + " not an object: " + B);
                if (b.hasOwnProperty((x = "ALPHABET")))
                  if (
                    ((B = b[x]),
                    typeof B == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(B))
                  )
                    (ee = B.slice(0, 10) == "0123456789"), (fe = B);
                  else throw Error(l + x + " invalid: " + B);
              } else throw Error(l + "Object expected: " + b);
            return {
              DECIMAL_PLACES: le,
              ROUNDING_MODE: N,
              EXPONENTIAL_AT: [U, L],
              RANGE: [j, G],
              CRYPTO: D,
              MODULO_MODE: ie,
              POW_PRECISION: ge,
              FORMAT: oe,
              ALPHABET: fe,
            };
          }),
        (m.isBigNumber = function (b) {
          if (!b || b._isBigNumber !== !0) return !1;
          if (!m.DEBUG) return !0;
          var x,
            B,
            k = b.c,
            O = b.e,
            M = b.s;
          e: if ({}.toString.call(k) == "[object Array]") {
            if ((M === 1 || M === -1) && O >= -1e9 && O <= A && O === o(O)) {
              if (k[0] === 0) {
                if (O === 0 && k.length === 1) return !0;
                break e;
              }
              if (
                ((x = (O + 1) % g), x < 1 && (x += g), String(k[0]).length == x)
              ) {
                for (x = 0; x < k.length; x++)
                  if (((B = k[x]), B < 0 || B >= p || B !== o(B))) break e;
                if (B !== 0) return !0;
              }
            }
          } else if (
            k === null &&
            O === null &&
            (M === null || M === 1 || M === -1)
          )
            return !0;
          throw Error(l + "Invalid BigNumber: " + b);
        }),
        (m.maximum = m.max =
          function () {
            return ue(arguments, -1);
          }),
        (m.minimum = m.min =
          function () {
            return ue(arguments, 1);
          }),
        (m.random = (function () {
          var b = 9007199254740992,
            x =
              (Math.random() * b) & 2097151
                ? function () {
                    return o(Math.random() * b);
                  }
                : function () {
                    return (
                      ((Math.random() * 1073741824) | 0) * 8388608 +
                      ((Math.random() * 8388608) | 0)
                    );
                  };
          return function (B) {
            var k,
              O,
              M,
              h,
              s,
              c = 0,
              y = [],
              _ = new m(he);
            if ((B == null ? (B = le) : z(B, 0, A), (h = i(B / g)), D))
              if (crypto.getRandomValues) {
                for (
                  k = crypto.getRandomValues(new Uint32Array((h *= 2)));
                  c < h;

                )
                  (s = k[c] * 131072 + (k[c + 1] >>> 11)),
                    s >= 9e15
                      ? ((O = crypto.getRandomValues(new Uint32Array(2))),
                        (k[c] = O[0]),
                        (k[c + 1] = O[1]))
                      : (y.push(s % 1e14), (c += 2));
                c = h / 2;
              } else if (crypto.randomBytes) {
                for (k = crypto.randomBytes((h *= 7)); c < h; )
                  (s =
                    (k[c] & 31) * 281474976710656 +
                    k[c + 1] * 1099511627776 +
                    k[c + 2] * 4294967296 +
                    k[c + 3] * 16777216 +
                    (k[c + 4] << 16) +
                    (k[c + 5] << 8) +
                    k[c + 6]),
                    s >= 9e15
                      ? crypto.randomBytes(7).copy(k, c)
                      : (y.push(s % 1e14), (c += 7));
                c = h / 7;
              } else throw ((D = !1), Error(l + "crypto unavailable"));
            if (!D) for (; c < h; ) (s = x()), s < 9e15 && (y[c++] = s % 1e14);
            for (
              h = y[--c],
                B %= g,
                h && B && ((s = S[g - B]), (y[c] = o(h / s) * s));
              y[c] === 0;
              y.pop(), c--
            );
            if (c < 0) y = [(M = 0)];
            else {
              for (M = -1; y[0] === 0; y.splice(0, 1), M -= g);
              for (c = 1, s = y[0]; s >= 10; s /= 10, c++);
              c < g && (M -= g - c);
            }
            return (_.e = M), (_.c = y), _;
          };
        })()),
        (m.sum = function () {
          for (var b = 1, x = arguments, B = new m(x[0]); b < x.length; )
            B = B.plus(x[b++]);
          return B;
        }),
        (J = (function () {
          var b = "0123456789";
          function x(B, k, O, M) {
            for (var h, s = [0], c, y = 0, _ = B.length; y < _; ) {
              for (c = s.length; c--; s[c] *= k);
              for (s[0] += M.indexOf(B.charAt(y++)), h = 0; h < s.length; h++)
                s[h] > O - 1 &&
                  (s[h + 1] == null && (s[h + 1] = 0),
                  (s[h + 1] += (s[h] / O) | 0),
                  (s[h] %= O));
            }
            return s.reverse();
          }
          return function (B, k, O, M, h) {
            var s,
              c,
              y,
              _,
              T,
              V,
              ne,
              pe,
              ye = B.indexOf("."),
              xe = le,
              d = N;
            for (
              ye >= 0 &&
                ((_ = ge),
                (ge = 0),
                (B = B.replace(".", "")),
                (pe = new m(k)),
                (V = pe.pow(B.length - ye)),
                (ge = _),
                (pe.c = x(P(C(V.c), V.e, "0"), 10, O, b)),
                (pe.e = pe.c.length)),
                ne = x(B, k, O, h ? ((s = fe), b) : ((s = b), fe)),
                y = _ = ne.length;
              ne[--_] == 0;
              ne.pop()
            );
            if (!ne[0]) return s.charAt(0);
            if (
              (ye < 0
                ? --y
                : ((V.c = ne),
                  (V.e = y),
                  (V.s = M),
                  (V = Y(V, pe, xe, d, O)),
                  (ne = V.c),
                  (T = V.r),
                  (y = V.e)),
              (c = y + xe + 1),
              (ye = ne[c]),
              (_ = O / 2),
              (T = T || c < 0 || ne[c + 1] != null),
              (T =
                d < 4
                  ? (ye != null || T) && (d == 0 || d == (V.s < 0 ? 3 : 2))
                  : ye > _ ||
                    (ye == _ &&
                      (d == 4 ||
                        T ||
                        (d == 6 && ne[c - 1] & 1) ||
                        d == (V.s < 0 ? 8 : 7)))),
              c < 1 || !ne[0])
            )
              B = T ? P(s.charAt(1), -xe, s.charAt(0)) : s.charAt(0);
            else {
              if (((ne.length = c), T))
                for (--O; ++ne[--c] > O; )
                  (ne[c] = 0), c || (++y, (ne = [1].concat(ne)));
              for (_ = ne.length; !ne[--_]; );
              for (ye = 0, B = ""; ye <= _; B += s.charAt(ne[ye++]));
              B = P(B, y, s.charAt(0));
            }
            return B;
          };
        })()),
        (Y = (function () {
          function b(k, O, M) {
            var h,
              s,
              c,
              y,
              _ = 0,
              T = k.length,
              V = O % I,
              ne = (O / I) | 0;
            for (k = k.slice(); T--; )
              (c = k[T] % I),
                (y = (k[T] / I) | 0),
                (h = ne * c + y * V),
                (s = V * c + (h % I) * I + _),
                (_ = ((s / M) | 0) + ((h / I) | 0) + ne * y),
                (k[T] = s % M);
            return _ && (k = [_].concat(k)), k;
          }
          function x(k, O, M, h) {
            var s, c;
            if (M != h) c = M > h ? 1 : -1;
            else
              for (s = c = 0; s < M; s++)
                if (k[s] != O[s]) {
                  c = k[s] > O[s] ? 1 : -1;
                  break;
                }
            return c;
          }
          function B(k, O, M, h) {
            for (var s = 0; M--; )
              (k[M] -= s),
                (s = k[M] < O[M] ? 1 : 0),
                (k[M] = s * h + k[M] - O[M]);
            for (; !k[0] && k.length > 1; k.splice(0, 1));
          }
          return function (k, O, M, h, s) {
            var c,
              y,
              _,
              T,
              V,
              ne,
              pe,
              ye,
              xe,
              d,
              u,
              f,
              v,
              F,
              K,
              H,
              _e,
              Be = k.s == O.s ? 1 : -1,
              Ee = k.c,
              be = O.c;
            if (!Ee || !Ee[0] || !be || !be[0])
              return new m(
                !k.s || !O.s || (Ee ? be && Ee[0] == be[0] : !be)
                  ? NaN
                  : (Ee && Ee[0] == 0) || !be
                    ? Be * 0
                    : Be / 0,
              );
            for (
              ye = new m(Be),
                xe = ye.c = [],
                y = k.e - O.e,
                Be = M + y + 1,
                s ||
                  ((s = p), (y = $(k.e / g) - $(O.e / g)), (Be = (Be / g) | 0)),
                _ = 0;
              be[_] == (Ee[_] || 0);
              _++
            );
            if ((be[_] > (Ee[_] || 0) && y--, Be < 0)) xe.push(1), (T = !0);
            else {
              for (
                F = Ee.length,
                  H = be.length,
                  _ = 0,
                  Be += 2,
                  V = o(s / (be[0] + 1)),
                  V > 1 &&
                    ((be = b(be, V, s)),
                    (Ee = b(Ee, V, s)),
                    (H = be.length),
                    (F = Ee.length)),
                  v = H,
                  d = Ee.slice(0, H),
                  u = d.length;
                u < H;
                d[u++] = 0
              );
              (_e = be.slice()),
                (_e = [0].concat(_e)),
                (K = be[0]),
                be[1] >= s / 2 && K++;
              do {
                if (((V = 0), (c = x(be, d, H, u)), c < 0)) {
                  if (
                    ((f = d[0]),
                    H != u && (f = f * s + (d[1] || 0)),
                    (V = o(f / K)),
                    V > 1)
                  )
                    for (
                      V >= s && (V = s - 1),
                        ne = b(be, V, s),
                        pe = ne.length,
                        u = d.length;
                      x(ne, d, pe, u) == 1;

                    )
                      V--,
                        B(ne, H < pe ? _e : be, pe, s),
                        (pe = ne.length),
                        (c = 1);
                  else
                    V == 0 && (c = V = 1), (ne = be.slice()), (pe = ne.length);
                  if (
                    (pe < u && (ne = [0].concat(ne)),
                    B(d, ne, u, s),
                    (u = d.length),
                    c == -1)
                  )
                    for (; x(be, d, H, u) < 1; )
                      V++, B(d, H < u ? _e : be, u, s), (u = d.length);
                } else c === 0 && (V++, (d = [0]));
                (xe[_++] = V),
                  d[0] ? (d[u++] = Ee[v] || 0) : ((d = [Ee[v]]), (u = 1));
              } while ((v++ < F || d[0] != null) && Be--);
              (T = d[0] != null), xe[0] || xe.splice(0, 1);
            }
            if (s == p) {
              for (_ = 1, Be = xe[0]; Be >= 10; Be /= 10, _++);
              te(ye, M + (ye.e = _ + y * g - 1) + 1, h, T);
            } else (ye.e = y), (ye.r = +T);
            return ye;
          };
        })());
      function se(b, x, B, k) {
        var O, M, h, s, c;
        if ((B == null ? (B = N) : z(B, 0, 8), !b.c)) return b.toString();
        if (((O = b.c[0]), (h = b.e), x == null))
          (c = C(b.c)),
            (c =
              k == 1 || (k == 2 && (h <= U || h >= L))
                ? re(c, h)
                : P(c, h, "0"));
        else if (
          ((b = te(new m(b), x, B)),
          (M = b.e),
          (c = C(b.c)),
          (s = c.length),
          k == 1 || (k == 2 && (x <= M || M <= U)))
        ) {
          for (; s < x; c += "0", s++);
          c = re(c, M);
        } else if (((x -= h), (c = P(c, M, "0")), M + 1 > s)) {
          if (--x > 0) for (c += "."; x--; c += "0");
        } else if (((x += M - s), x > 0))
          for (M + 1 == s && (c += "."); x--; c += "0");
        return b.s < 0 && O ? "-" + c : c;
      }
      function ue(b, x) {
        for (var B, k, O = 1, M = new m(b[0]); O < b.length; O++)
          (k = new m(b[O])),
            (!k.s || (B = W(M, k)) === x || (B === 0 && M.s === x)) && (M = k);
        return M;
      }
      function de(b, x, B) {
        for (var k = 1, O = x.length; !x[--O]; x.pop());
        for (O = x[0]; O >= 10; O /= 10, k++);
        return (
          (B = k + B * g - 1) > G
            ? (b.c = b.e = null)
            : B < j
              ? (b.c = [(b.e = 0)])
              : ((b.e = B), (b.c = x)),
          b
        );
      }
      Q = (function () {
        var b = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          x = /^([^.]+)\.$/,
          B = /^\.([^.]+)$/,
          k = /^-?(Infinity|NaN)$/,
          O = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function (M, h, s, c) {
          var y,
            _ = s ? h : h.replace(O, "");
          if (k.test(_)) M.s = isNaN(_) ? null : _ < 0 ? -1 : 1;
          else {
            if (
              !s &&
              ((_ = _.replace(b, function (T, V, ne) {
                return (
                  (y = (ne = ne.toLowerCase()) == "x" ? 16 : ne == "b" ? 2 : 8),
                  !c || c == y ? V : T
                );
              })),
              c && ((y = c), (_ = _.replace(x, "$1").replace(B, "0.$1"))),
              h != _)
            )
              return new m(_, y);
            if (m.DEBUG)
              throw Error(
                l + "Not a" + (c ? " base " + c : "") + " number: " + h,
              );
            M.s = null;
          }
          M.c = M.e = null;
        };
      })();
      function te(b, x, B, k) {
        var O,
          M,
          h,
          s,
          c,
          y,
          _,
          T = b.c,
          V = S;
        if (T) {
          e: {
            for (O = 1, s = T[0]; s >= 10; s /= 10, O++);
            if (((M = x - O), M < 0))
              (M += g),
                (h = x),
                (c = T[(y = 0)]),
                (_ = o((c / V[O - h - 1]) % 10));
            else if (((y = i((M + 1) / g)), y >= T.length))
              if (k) {
                for (; T.length <= y; T.push(0));
                (c = _ = 0), (O = 1), (M %= g), (h = M - g + 1);
              } else break e;
            else {
              for (c = s = T[y], O = 1; s >= 10; s /= 10, O++);
              (M %= g),
                (h = M - g + O),
                (_ = h < 0 ? 0 : o((c / V[O - h - 1]) % 10));
            }
            if (
              ((k =
                k ||
                x < 0 ||
                T[y + 1] != null ||
                (h < 0 ? c : c % V[O - h - 1])),
              (k =
                B < 4
                  ? (_ || k) && (B == 0 || B == (b.s < 0 ? 3 : 2))
                  : _ > 5 ||
                    (_ == 5 &&
                      (B == 4 ||
                        k ||
                        (B == 6 &&
                          (M > 0 ? (h > 0 ? c / V[O - h] : 0) : T[y - 1]) % 10 &
                            1) ||
                        B == (b.s < 0 ? 8 : 7)))),
              x < 1 || !T[0])
            )
              return (
                (T.length = 0),
                k
                  ? ((x -= b.e + 1),
                    (T[0] = V[(g - (x % g)) % g]),
                    (b.e = -x || 0))
                  : (T[0] = b.e = 0),
                b
              );
            if (
              (M == 0
                ? ((T.length = y), (s = 1), y--)
                : ((T.length = y + 1),
                  (s = V[g - M]),
                  (T[y] = h > 0 ? o((c / V[O - h]) % V[h]) * s : 0)),
              k)
            )
              for (;;)
                if (y == 0) {
                  for (M = 1, h = T[0]; h >= 10; h /= 10, M++);
                  for (h = T[0] += s, s = 1; h >= 10; h /= 10, s++);
                  M != s && (b.e++, T[0] == p && (T[0] = 1));
                  break;
                } else {
                  if (((T[y] += s), T[y] != p)) break;
                  (T[y--] = 0), (s = 1);
                }
            for (M = T.length; T[--M] === 0; T.pop());
          }
          b.e > G ? (b.c = b.e = null) : b.e < j && (b.c = [(b.e = 0)]);
        }
        return b;
      }
      function ae(b) {
        var x,
          B = b.e;
        return B === null
          ? b.toString()
          : ((x = C(b.c)),
            (x = B <= U || B >= L ? re(x, B) : P(x, B, "0")),
            b.s < 0 ? "-" + x : x);
      }
      return (
        (X.absoluteValue = X.abs =
          function () {
            var b = new m(this);
            return b.s < 0 && (b.s = 1), b;
          }),
        (X.comparedTo = function (b, x) {
          return W(this, new m(b, x));
        }),
        (X.decimalPlaces = X.dp =
          function (b, x) {
            var B,
              k,
              O,
              M = this;
            if (b != null)
              return (
                z(b, 0, A),
                x == null ? (x = N) : z(x, 0, 8),
                te(new m(M), b + M.e + 1, x)
              );
            if (!(B = M.c)) return null;
            if (((k = ((O = B.length - 1) - $(this.e / g)) * g), (O = B[O])))
              for (; O % 10 == 0; O /= 10, k--);
            return k < 0 && (k = 0), k;
          }),
        (X.dividedBy = X.div =
          function (b, x) {
            return Y(this, new m(b, x), le, N);
          }),
        (X.dividedToIntegerBy = X.idiv =
          function (b, x) {
            return Y(this, new m(b, x), 0, 1);
          }),
        (X.exponentiatedBy = X.pow =
          function (b, x) {
            var B,
              k,
              O,
              M,
              h,
              s,
              c,
              y,
              _,
              T = this;
            if (((b = new m(b)), b.c && !b.isInteger()))
              throw Error(l + "Exponent not an integer: " + ae(b));
            if (
              (x != null && (x = new m(x)),
              (s = b.e > 14),
              !T.c ||
                !T.c[0] ||
                (T.c[0] == 1 && !T.e && T.c.length == 1) ||
                !b.c ||
                !b.c[0])
            )
              return (
                (_ = new m(Math.pow(+ae(T), s ? b.s * (2 - q(b)) : +ae(b)))),
                x ? _.mod(x) : _
              );
            if (((c = b.s < 0), x)) {
              if (x.c ? !x.c[0] : !x.s) return new m(NaN);
              (k = !c && T.isInteger() && x.isInteger()), k && (T = T.mod(x));
            } else {
              if (
                b.e > 9 &&
                (T.e > 0 ||
                  T.e < -1 ||
                  (T.e == 0
                    ? T.c[0] > 1 || (s && T.c[1] >= 24e7)
                    : T.c[0] < 8e13 || (s && T.c[0] <= 9999975e7)))
              )
                return (
                  (M = T.s < 0 && q(b) ? -0 : 0),
                  T.e > -1 && (M = 1 / M),
                  new m(c ? 1 / M : M)
                );
              ge && (M = i(ge / g + 2));
            }
            for (
              s
                ? ((B = new m(0.5)), c && (b.s = 1), (y = q(b)))
                : ((O = Math.abs(+ae(b))), (y = O % 2)),
                _ = new m(he);
              ;

            ) {
              if (y) {
                if (((_ = _.times(T)), !_.c)) break;
                M ? _.c.length > M && (_.c.length = M) : k && (_ = _.mod(x));
              }
              if (O) {
                if (((O = o(O / 2)), O === 0)) break;
                y = O % 2;
              } else if (((b = b.times(B)), te(b, b.e + 1, 1), b.e > 14))
                y = q(b);
              else {
                if (((O = +ae(b)), O === 0)) break;
                y = O % 2;
              }
              (T = T.times(T)),
                M
                  ? T.c && T.c.length > M && (T.c.length = M)
                  : k && (T = T.mod(x));
            }
            return k
              ? _
              : (c && (_ = he.div(_)), x ? _.mod(x) : M ? te(_, ge, N, h) : _);
          }),
        (X.integerValue = function (b) {
          var x = new m(this);
          return b == null ? (b = N) : z(b, 0, 8), te(x, x.e + 1, b);
        }),
        (X.isEqualTo = X.eq =
          function (b, x) {
            return W(this, new m(b, x)) === 0;
          }),
        (X.isFinite = function () {
          return !!this.c;
        }),
        (X.isGreaterThan = X.gt =
          function (b, x) {
            return W(this, new m(b, x)) > 0;
          }),
        (X.isGreaterThanOrEqualTo = X.gte =
          function (b, x) {
            return (x = W(this, new m(b, x))) === 1 || x === 0;
          }),
        (X.isInteger = function () {
          return !!this.c && $(this.e / g) > this.c.length - 2;
        }),
        (X.isLessThan = X.lt =
          function (b, x) {
            return W(this, new m(b, x)) < 0;
          }),
        (X.isLessThanOrEqualTo = X.lte =
          function (b, x) {
            return (x = W(this, new m(b, x))) === -1 || x === 0;
          }),
        (X.isNaN = function () {
          return !this.s;
        }),
        (X.isNegative = function () {
          return this.s < 0;
        }),
        (X.isPositive = function () {
          return this.s > 0;
        }),
        (X.isZero = function () {
          return !!this.c && this.c[0] == 0;
        }),
        (X.minus = function (b, x) {
          var B,
            k,
            O,
            M,
            h = this,
            s = h.s;
          if (((b = new m(b, x)), (x = b.s), !s || !x)) return new m(NaN);
          if (s != x) return (b.s = -x), h.plus(b);
          var c = h.e / g,
            y = b.e / g,
            _ = h.c,
            T = b.c;
          if (!c || !y) {
            if (!_ || !T) return _ ? ((b.s = -x), b) : new m(T ? h : NaN);
            if (!_[0] || !T[0])
              return T[0] ? ((b.s = -x), b) : new m(_[0] ? h : N == 3 ? -0 : 0);
          }
          if (((c = $(c)), (y = $(y)), (_ = _.slice()), (s = c - y))) {
            for (
              (M = s < 0) ? ((s = -s), (O = _)) : ((y = c), (O = T)),
                O.reverse(),
                x = s;
              x--;
              O.push(0)
            );
            O.reverse();
          } else
            for (
              k = (M = (s = _.length) < (x = T.length)) ? s : x, s = x = 0;
              x < k;
              x++
            )
              if (_[x] != T[x]) {
                M = _[x] < T[x];
                break;
              }
          if (
            (M && ((O = _), (_ = T), (T = O), (b.s = -b.s)),
            (x = (k = T.length) - (B = _.length)),
            x > 0)
          )
            for (; x--; _[B++] = 0);
          for (x = p - 1; k > s; ) {
            if (_[--k] < T[k]) {
              for (B = k; B && !_[--B]; _[B] = x);
              --_[B], (_[k] += p);
            }
            _[k] -= T[k];
          }
          for (; _[0] == 0; _.splice(0, 1), --y);
          return _[0]
            ? de(b, _, y)
            : ((b.s = N == 3 ? -1 : 1), (b.c = [(b.e = 0)]), b);
        }),
        (X.modulo = X.mod =
          function (b, x) {
            var B,
              k,
              O = this;
            return (
              (b = new m(b, x)),
              !O.c || !b.s || (b.c && !b.c[0])
                ? new m(NaN)
                : !b.c || (O.c && !O.c[0])
                  ? new m(O)
                  : (ie == 9
                      ? ((k = b.s),
                        (b.s = 1),
                        (B = Y(O, b, 0, 3)),
                        (b.s = k),
                        (B.s *= k))
                      : (B = Y(O, b, 0, ie)),
                    (b = O.minus(B.times(b))),
                    !b.c[0] && ie == 1 && (b.s = O.s),
                    b)
            );
          }),
        (X.multipliedBy = X.times =
          function (b, x) {
            var B,
              k,
              O,
              M,
              h,
              s,
              c,
              y,
              _,
              T,
              V,
              ne,
              pe,
              ye,
              xe,
              d = this,
              u = d.c,
              f = (b = new m(b, x)).c;
            if (!u || !f || !u[0] || !f[0])
              return (
                !d.s || !b.s || (u && !u[0] && !f) || (f && !f[0] && !u)
                  ? (b.c = b.e = b.s = null)
                  : ((b.s *= d.s),
                    !u || !f ? (b.c = b.e = null) : ((b.c = [0]), (b.e = 0))),
                b
              );
            for (
              k = $(d.e / g) + $(b.e / g),
                b.s *= d.s,
                c = u.length,
                T = f.length,
                c < T &&
                  ((pe = u), (u = f), (f = pe), (O = c), (c = T), (T = O)),
                O = c + T,
                pe = [];
              O--;
              pe.push(0)
            );
            for (ye = p, xe = I, O = T; --O >= 0; ) {
              for (
                B = 0, V = f[O] % xe, ne = (f[O] / xe) | 0, h = c, M = O + h;
                M > O;

              )
                (y = u[--h] % xe),
                  (_ = (u[h] / xe) | 0),
                  (s = ne * y + _ * V),
                  (y = V * y + (s % xe) * xe + pe[M] + B),
                  (B = ((y / ye) | 0) + ((s / xe) | 0) + ne * _),
                  (pe[M--] = y % ye);
              pe[M] = B;
            }
            return B ? ++k : pe.splice(0, 1), de(b, pe, k);
          }),
        (X.negated = function () {
          var b = new m(this);
          return (b.s = -b.s || null), b;
        }),
        (X.plus = function (b, x) {
          var B,
            k = this,
            O = k.s;
          if (((b = new m(b, x)), (x = b.s), !O || !x)) return new m(NaN);
          if (O != x) return (b.s = -x), k.minus(b);
          var M = k.e / g,
            h = b.e / g,
            s = k.c,
            c = b.c;
          if (!M || !h) {
            if (!s || !c) return new m(O / 0);
            if (!s[0] || !c[0]) return c[0] ? b : new m(s[0] ? k : O * 0);
          }
          if (((M = $(M)), (h = $(h)), (s = s.slice()), (O = M - h))) {
            for (
              O > 0 ? ((h = M), (B = c)) : ((O = -O), (B = s)), B.reverse();
              O--;
              B.push(0)
            );
            B.reverse();
          }
          for (
            O = s.length,
              x = c.length,
              O - x < 0 && ((B = c), (c = s), (s = B), (x = O)),
              O = 0;
            x;

          )
            (O = ((s[--x] = s[x] + c[x] + O) / p) | 0),
              (s[x] = p === s[x] ? 0 : s[x] % p);
          return O && ((s = [O].concat(s)), ++h), de(b, s, h);
        }),
        (X.precision = X.sd =
          function (b, x) {
            var B,
              k,
              O,
              M = this;
            if (b != null && b !== !!b)
              return (
                z(b, 1, A), x == null ? (x = N) : z(x, 0, 8), te(new m(M), b, x)
              );
            if (!(B = M.c)) return null;
            if (((O = B.length - 1), (k = O * g + 1), (O = B[O]))) {
              for (; O % 10 == 0; O /= 10, k--);
              for (O = B[0]; O >= 10; O /= 10, k++);
            }
            return b && M.e + 1 > k && (k = M.e + 1), k;
          }),
        (X.shiftedBy = function (b) {
          return z(b, -9007199254740991, E), this.times("1e" + b);
        }),
        (X.squareRoot = X.sqrt =
          function () {
            var b,
              x,
              B,
              k,
              O,
              M = this,
              h = M.c,
              s = M.s,
              c = M.e,
              y = le + 4,
              _ = new m("0.5");
            if (s !== 1 || !h || !h[0])
              return new m(!s || (s < 0 && (!h || h[0])) ? NaN : h ? M : 1 / 0);
            if (
              ((s = Math.sqrt(+ae(M))),
              s == 0 || s == 1 / 0
                ? ((x = C(h)),
                  (x.length + c) % 2 == 0 && (x += "0"),
                  (s = Math.sqrt(+x)),
                  (c = $((c + 1) / 2) - (c < 0 || c % 2)),
                  s == 1 / 0
                    ? (x = "5e" + c)
                    : ((x = s.toExponential()),
                      (x = x.slice(0, x.indexOf("e") + 1) + c)),
                  (B = new m(x)))
                : (B = new m(s + "")),
              B.c[0])
            ) {
              for (c = B.e, s = c + y, s < 3 && (s = 0); ; )
                if (
                  ((O = B),
                  (B = _.times(O.plus(Y(M, O, y, 1)))),
                  C(O.c).slice(0, s) === (x = C(B.c)).slice(0, s))
                )
                  if (
                    (B.e < c && --s,
                    (x = x.slice(s - 3, s + 1)),
                    x == "9999" || (!k && x == "4999"))
                  ) {
                    if (!k && (te(O, O.e + le + 2, 0), O.times(O).eq(M))) {
                      B = O;
                      break;
                    }
                    (y += 4), (s += 4), (k = 1);
                  } else {
                    (!+x || (!+x.slice(1) && x.charAt(0) == "5")) &&
                      (te(B, B.e + le + 2, 1), (b = !B.times(B).eq(M)));
                    break;
                  }
            }
            return te(B, B.e + le + 1, N, b);
          }),
        (X.toExponential = function (b, x) {
          return b != null && (z(b, 0, A), b++), se(this, b, x, 1);
        }),
        (X.toFixed = function (b, x) {
          return (
            b != null && (z(b, 0, A), (b = b + this.e + 1)), se(this, b, x)
          );
        }),
        (X.toFormat = function (b, x, B) {
          var k,
            O = this;
          if (B == null)
            b != null && x && typeof x == "object"
              ? ((B = x), (x = null))
              : b && typeof b == "object"
                ? ((B = b), (b = x = null))
                : (B = oe);
          else if (typeof B != "object")
            throw Error(l + "Argument not an object: " + B);
          if (((k = O.toFixed(b, x)), O.c)) {
            var M,
              h = k.split("."),
              s = +B.groupSize,
              c = +B.secondaryGroupSize,
              y = B.groupSeparator || "",
              _ = h[0],
              T = h[1],
              V = O.s < 0,
              ne = V ? _.slice(1) : _,
              pe = ne.length;
            if (
              (c && ((M = s), (s = c), (c = M), (pe -= M)), s > 0 && pe > 0)
            ) {
              for (M = pe % s || s, _ = ne.substr(0, M); M < pe; M += s)
                _ += y + ne.substr(M, s);
              c > 0 && (_ += y + ne.slice(M)), V && (_ = "-" + _);
            }
            k = T
              ? _ +
                (B.decimalSeparator || "") +
                ((c = +B.fractionGroupSize)
                  ? T.replace(
                      new RegExp("\\d{" + c + "}\\B", "g"),
                      "$&" + (B.fractionGroupSeparator || ""),
                    )
                  : T)
              : _;
          }
          return (B.prefix || "") + k + (B.suffix || "");
        }),
        (X.toFraction = function (b) {
          var x,
            B,
            k,
            O,
            M,
            h,
            s,
            c,
            y,
            _,
            T,
            V,
            ne = this,
            pe = ne.c;
          if (
            b != null &&
            ((s = new m(b)), (!s.isInteger() && (s.c || s.s !== 1)) || s.lt(he))
          )
            throw Error(
              l +
                "Argument " +
                (s.isInteger() ? "out of range: " : "not an integer: ") +
                ae(s),
            );
          if (!pe) return new m(ne);
          for (
            x = new m(he),
              y = B = new m(he),
              k = c = new m(he),
              V = C(pe),
              M = x.e = V.length - ne.e - 1,
              x.c[0] = S[(h = M % g) < 0 ? g + h : h],
              b = !b || s.comparedTo(x) > 0 ? (M > 0 ? x : y) : s,
              h = G,
              G = 1 / 0,
              s = new m(V),
              c.c[0] = 0;
            (_ = Y(s, x, 0, 1)), (O = B.plus(_.times(k))), O.comparedTo(b) != 1;

          )
            (B = k),
              (k = O),
              (y = c.plus(_.times((O = y)))),
              (c = O),
              (x = s.minus(_.times((O = x)))),
              (s = O);
          return (
            (O = Y(b.minus(B), k, 0, 1)),
            (c = c.plus(O.times(y))),
            (B = B.plus(O.times(k))),
            (c.s = y.s = ne.s),
            (M = M * 2),
            (T =
              Y(y, k, M, N)
                .minus(ne)
                .abs()
                .comparedTo(Y(c, B, M, N).minus(ne).abs()) < 1
                ? [y, k]
                : [c, B]),
            (G = h),
            T
          );
        }),
        (X.toNumber = function () {
          return +ae(this);
        }),
        (X.toPrecision = function (b, x) {
          return b != null && z(b, 1, A), se(this, b, x, 2);
        }),
        (X.toString = function (b) {
          var x,
            B = this,
            k = B.s,
            O = B.e;
          return (
            O === null
              ? k
                ? ((x = "Infinity"), k < 0 && (x = "-" + x))
                : (x = "NaN")
              : (b == null
                  ? (x = O <= U || O >= L ? re(C(B.c), O) : P(C(B.c), O, "0"))
                  : b === 10 && ee
                    ? ((B = te(new m(B), le + O + 1, N)),
                      (x = P(C(B.c), B.e, "0")))
                    : (z(b, 2, fe.length, "Base"),
                      (x = J(P(C(B.c), O, "0"), 10, b, k, !0))),
                k < 0 && B.c[0] && (x = "-" + x)),
            x
          );
        }),
        (X.valueOf = X.toJSON =
          function () {
            return ae(this);
          }),
        (X._isBigNumber = !0),
        Z != null && m.set(Z),
        m
      );
    }
    function $(Z) {
      var Y = Z | 0;
      return Z > 0 || Z === Y ? Y : Y - 1;
    }
    function C(Z) {
      for (var Y, J, Q = 1, X = Z.length, he = Z[0] + ""; Q < X; ) {
        for (Y = Z[Q++] + "", J = g - Y.length; J--; Y = "0" + Y);
        he += Y;
      }
      for (X = he.length; he.charCodeAt(--X) === 48; );
      return he.slice(0, X + 1 || 1);
    }
    function W(Z, Y) {
      var J,
        Q,
        X = Z.c,
        he = Y.c,
        le = Z.s,
        N = Y.s,
        U = Z.e,
        L = Y.e;
      if (!le || !N) return null;
      if (((J = X && !X[0]), (Q = he && !he[0]), J || Q))
        return J ? (Q ? 0 : -N) : le;
      if (le != N) return le;
      if (((J = le < 0), (Q = U == L), !X || !he))
        return Q ? 0 : !X ^ J ? 1 : -1;
      if (!Q) return (U > L) ^ J ? 1 : -1;
      for (N = (U = X.length) < (L = he.length) ? U : L, le = 0; le < N; le++)
        if (X[le] != he[le]) return (X[le] > he[le]) ^ J ? 1 : -1;
      return U == L ? 0 : (U > L) ^ J ? 1 : -1;
    }
    function z(Z, Y, J, Q) {
      if (Z < Y || Z > J || Z !== o(Z))
        throw Error(
          l +
            (Q || "Argument") +
            (typeof Z == "number"
              ? Z < Y || Z > J
                ? " out of range: "
                : " not an integer: "
              : " not a primitive number: ") +
            String(Z),
        );
    }
    function q(Z) {
      var Y = Z.c.length - 1;
      return $(Z.e / g) == Y && Z.c[Y] % 2 != 0;
    }
    function re(Z, Y) {
      return (
        (Z.length > 1 ? Z.charAt(0) + "." + Z.slice(1) : Z) +
        (Y < 0 ? "e" : "e+") +
        Y
      );
    }
    function P(Z, Y, J) {
      var Q, X;
      if (Y < 0) {
        for (X = J + "."; ++Y; X += J);
        Z = X + Z;
      } else if (((Q = Z.length), ++Y > Q)) {
        for (X = J, Y -= Q; --Y; X += J);
        Z += X;
      } else Y < Q && (Z = Z.slice(0, Y) + "." + Z.slice(Y));
      return Z;
    }
    (r = w()),
      (r.default = r.BigNumber = r),
      t.exports
        ? (t.exports = r)
        : (e || (e = typeof self < "u" && self ? self : window),
          (e.BigNumber = r));
  })($r);
})(qa);
var vi = qa.exports,
  tf = function (e, r, n) {
    var i = new e.Uint8Array(n),
      o = r.pushInt,
      l = r.pushInt32,
      a = r.pushInt32Neg,
      p = r.pushInt64,
      g = r.pushInt64Neg,
      E = r.pushFloat,
      S = r.pushFloatSingle,
      I = r.pushFloatDouble,
      A = r.pushTrue,
      w = r.pushFalse,
      $ = r.pushUndefined,
      C = r.pushNull,
      W = r.pushInfinity,
      z = r.pushInfinityNeg,
      q = r.pushNaN,
      re = r.pushNaNNeg,
      P = r.pushArrayStart,
      Z = r.pushArrayStartFixed,
      Y = r.pushArrayStartFixed32,
      J = r.pushArrayStartFixed64,
      Q = r.pushObjectStart,
      X = r.pushObjectStartFixed,
      he = r.pushObjectStartFixed32,
      le = r.pushObjectStartFixed64,
      N = r.pushByteString,
      U = r.pushByteStringStart,
      L = r.pushUtf8String,
      j = r.pushUtf8StringStart,
      G = r.pushSimpleUnassigned,
      D = r.pushTagStart,
      ie = r.pushTagStart4,
      ge = r.pushTagStart8,
      oe = r.pushTagUnassigned,
      fe = r.pushBreak,
      ee = e.Math.pow,
      m = 0,
      se = 0,
      ue = 0;
    function de(R) {
      for (
        R = R | 0, m = 0, se = R;
        (m | 0) < (se | 0) &&
        ((ue = uu[i[m] & 255](i[m] | 0) | 0), !((ue | 0) > 0));

      );
      return ue | 0;
    }
    function te(R) {
      return (R = R | 0), (((m | 0) + (R | 0)) | 0) < (se | 0) ? 0 : 1;
    }
    function ae(R) {
      return (R = R | 0), (i[R | 0] << 8) | i[(R + 1) | 0] | 0;
    }
    function b(R) {
      return (
        (R = R | 0),
        (i[R | 0] << 24) |
          (i[(R + 1) | 0] << 16) |
          (i[(R + 2) | 0] << 8) |
          i[(R + 3) | 0] |
          0
      );
    }
    function x(R) {
      return (R = R | 0), o(R | 0), (m = (m + 1) | 0), 0;
    }
    function B(R) {
      return (
        (R = R | 0),
        te(1) | 0 ? 1 : (o(i[(m + 1) | 0] | 0), (m = (m + 2) | 0), 0)
      );
    }
    function k(R) {
      return (
        (R = R | 0),
        te(2) | 0 ? 1 : (o(ae((m + 1) | 0) | 0), (m = (m + 3) | 0), 0)
      );
    }
    function O(R) {
      return (
        (R = R | 0),
        te(4) | 0
          ? 1
          : (l(ae((m + 1) | 0) | 0, ae((m + 3) | 0) | 0), (m = (m + 5) | 0), 0)
      );
    }
    function M(R) {
      return (
        (R = R | 0),
        te(8) | 0
          ? 1
          : (p(
              ae((m + 1) | 0) | 0,
              ae((m + 3) | 0) | 0,
              ae((m + 5) | 0) | 0,
              ae((m + 7) | 0) | 0,
            ),
            (m = (m + 9) | 0),
            0)
      );
    }
    function h(R) {
      return (R = R | 0), o((-1 - ((R - 32) | 0)) | 0), (m = (m + 1) | 0), 0;
    }
    function s(R) {
      return (
        (R = R | 0),
        te(1) | 0
          ? 1
          : (o((-1 - (i[(m + 1) | 0] | 0)) | 0), (m = (m + 2) | 0), 0)
      );
    }
    function c(R) {
      R = R | 0;
      var Ne = 0;
      return te(2) | 0
        ? 1
        : ((Ne = ae((m + 1) | 0) | 0),
          o((-1 - (Ne | 0)) | 0),
          (m = (m + 3) | 0),
          0);
    }
    function y(R) {
      return (
        (R = R | 0),
        te(4) | 0
          ? 1
          : (a(ae((m + 1) | 0) | 0, ae((m + 3) | 0) | 0), (m = (m + 5) | 0), 0)
      );
    }
    function _(R) {
      return (
        (R = R | 0),
        te(8) | 0
          ? 1
          : (g(
              ae((m + 1) | 0) | 0,
              ae((m + 3) | 0) | 0,
              ae((m + 5) | 0) | 0,
              ae((m + 7) | 0) | 0,
            ),
            (m = (m + 9) | 0),
            0)
      );
    }
    function T(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return (
        (Se = (R - 64) | 0),
        te(Se | 0) | 0
          ? 1
          : ((Ne = (m + 1) | 0),
            (Ie = (((m + 1) | 0) + (Se | 0)) | 0),
            N(Ne | 0, Ie | 0),
            (m = Ie | 0),
            0)
      );
    }
    function V(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return te(1) | 0 ||
        ((Se = i[(m + 1) | 0] | 0),
        (Ne = (m + 2) | 0),
        (Ie = (((m + 2) | 0) + (Se | 0)) | 0),
        te((Se + 1) | 0) | 0)
        ? 1
        : (N(Ne | 0, Ie | 0), (m = Ie | 0), 0);
    }
    function ne(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return te(2) | 0 ||
        ((Se = ae((m + 1) | 0) | 0),
        (Ne = (m + 3) | 0),
        (Ie = (((m + 3) | 0) + (Se | 0)) | 0),
        te((Se + 2) | 0) | 0)
        ? 1
        : (N(Ne | 0, Ie | 0), (m = Ie | 0), 0);
    }
    function pe(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return te(4) | 0 ||
        ((Se = b((m + 1) | 0) | 0),
        (Ne = (m + 5) | 0),
        (Ie = (((m + 5) | 0) + (Se | 0)) | 0),
        te((Se + 4) | 0) | 0)
        ? 1
        : (N(Ne | 0, Ie | 0), (m = Ie | 0), 0);
    }
    function ye(R) {
      return (R = R | 0), 1;
    }
    function xe(R) {
      return (R = R | 0), U(), (m = (m + 1) | 0), 0;
    }
    function d(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return (
        (Se = (R - 96) | 0),
        te(Se | 0) | 0
          ? 1
          : ((Ne = (m + 1) | 0),
            (Ie = (((m + 1) | 0) + (Se | 0)) | 0),
            L(Ne | 0, Ie | 0),
            (m = Ie | 0),
            0)
      );
    }
    function u(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return te(1) | 0 ||
        ((Se = i[(m + 1) | 0] | 0),
        (Ne = (m + 2) | 0),
        (Ie = (((m + 2) | 0) + (Se | 0)) | 0),
        te((Se + 1) | 0) | 0)
        ? 1
        : (L(Ne | 0, Ie | 0), (m = Ie | 0), 0);
    }
    function f(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return te(2) | 0 ||
        ((Se = ae((m + 1) | 0) | 0),
        (Ne = (m + 3) | 0),
        (Ie = (((m + 3) | 0) + (Se | 0)) | 0),
        te((Se + 2) | 0) | 0)
        ? 1
        : (L(Ne | 0, Ie | 0), (m = Ie | 0), 0);
    }
    function v(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 0;
      return te(4) | 0 ||
        ((Se = b((m + 1) | 0) | 0),
        (Ne = (m + 5) | 0),
        (Ie = (((m + 5) | 0) + (Se | 0)) | 0),
        te((Se + 4) | 0) | 0)
        ? 1
        : (L(Ne | 0, Ie | 0), (m = Ie | 0), 0);
    }
    function F(R) {
      return (R = R | 0), 1;
    }
    function K(R) {
      return (R = R | 0), j(), (m = (m + 1) | 0), 0;
    }
    function H(R) {
      return (R = R | 0), Z((R - 128) | 0), (m = (m + 1) | 0), 0;
    }
    function _e(R) {
      return (
        (R = R | 0),
        te(1) | 0 ? 1 : (Z(i[(m + 1) | 0] | 0), (m = (m + 2) | 0), 0)
      );
    }
    function Be(R) {
      return (
        (R = R | 0),
        te(2) | 0 ? 1 : (Z(ae((m + 1) | 0) | 0), (m = (m + 3) | 0), 0)
      );
    }
    function Ee(R) {
      return (
        (R = R | 0),
        te(4) | 0
          ? 1
          : (Y(ae((m + 1) | 0) | 0, ae((m + 3) | 0) | 0), (m = (m + 5) | 0), 0)
      );
    }
    function be(R) {
      return (
        (R = R | 0),
        te(8) | 0
          ? 1
          : (J(
              ae((m + 1) | 0) | 0,
              ae((m + 3) | 0) | 0,
              ae((m + 5) | 0) | 0,
              ae((m + 7) | 0) | 0,
            ),
            (m = (m + 9) | 0),
            0)
      );
    }
    function Re(R) {
      return (R = R | 0), P(), (m = (m + 1) | 0), 0;
    }
    function ke(R) {
      R = R | 0;
      var Ne = 0;
      return (
        (Ne = (R - 160) | 0),
        te(Ne | 0) | 0 ? 1 : (X(Ne | 0), (m = (m + 1) | 0), 0)
      );
    }
    function Ii(R) {
      return (
        (R = R | 0),
        te(1) | 0 ? 1 : (X(i[(m + 1) | 0] | 0), (m = (m + 2) | 0), 0)
      );
    }
    function Ri(R) {
      return (
        (R = R | 0),
        te(2) | 0 ? 1 : (X(ae((m + 1) | 0) | 0), (m = (m + 3) | 0), 0)
      );
    }
    function Oi(R) {
      return (
        (R = R | 0),
        te(4) | 0
          ? 1
          : (he(ae((m + 1) | 0) | 0, ae((m + 3) | 0) | 0), (m = (m + 5) | 0), 0)
      );
    }
    function Ui(R) {
      return (
        (R = R | 0),
        te(8) | 0
          ? 1
          : (le(
              ae((m + 1) | 0) | 0,
              ae((m + 3) | 0) | 0,
              ae((m + 5) | 0) | 0,
              ae((m + 7) | 0) | 0,
            ),
            (m = (m + 9) | 0),
            0)
      );
    }
    function Fi(R) {
      return (R = R | 0), Q(), (m = (m + 1) | 0), 0;
    }
    function Ht(R) {
      return (R = R | 0), D((R - 192) | 0 | 0), (m = (m + 1) | 0), 0;
    }
    function Rh(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function Oh(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function Uh(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function Fh(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function Ye(R) {
      return (R = R | 0), D((R - 192) | 0 | 0), (m = (m + 1) | 0), 0;
    }
    function Ph(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function kh(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function Mh(R) {
      return (R = R | 0), D(R | 0), (m = (m + 1) | 0), 0;
    }
    function Dc(R) {
      return (
        (R = R | 0),
        te(1) | 0 ? 1 : (D(i[(m + 1) | 0] | 0), (m = (m + 2) | 0), 0)
      );
    }
    function Xc(R) {
      return (
        (R = R | 0),
        te(2) | 0 ? 1 : (D(ae((m + 1) | 0) | 0), (m = (m + 3) | 0), 0)
      );
    }
    function Jc(R) {
      return (
        (R = R | 0),
        te(4) | 0
          ? 1
          : (ie(ae((m + 1) | 0) | 0, ae((m + 3) | 0) | 0), (m = (m + 5) | 0), 0)
      );
    }
    function Qc(R) {
      return (
        (R = R | 0),
        te(8) | 0
          ? 1
          : (ge(
              ae((m + 1) | 0) | 0,
              ae((m + 3) | 0) | 0,
              ae((m + 5) | 0) | 0,
              ae((m + 7) | 0) | 0,
            ),
            (m = (m + 9) | 0),
            0)
      );
    }
    function He(R) {
      return (R = R | 0), G(((R | 0) - 224) | 0), (m = (m + 1) | 0), 0;
    }
    function eu(R) {
      return (R = R | 0), w(), (m = (m + 1) | 0), 0;
    }
    function tu(R) {
      return (R = R | 0), A(), (m = (m + 1) | 0), 0;
    }
    function ru(R) {
      return (R = R | 0), C(), (m = (m + 1) | 0), 0;
    }
    function nu(R) {
      return (R = R | 0), $(), (m = (m + 1) | 0), 0;
    }
    function iu(R) {
      return (
        (R = R | 0),
        te(1) | 0 ? 1 : (G(i[(m + 1) | 0] | 0), (m = (m + 2) | 0), 0)
      );
    }
    function su(R) {
      R = R | 0;
      var Ne = 0,
        Ie = 0,
        Se = 1,
        _n = 0,
        Kr = 0,
        Ch = 0;
      return te(2) | 0
        ? 1
        : ((Ne = i[(m + 1) | 0] | 0),
          (Ie = i[(m + 2) | 0] | 0),
          (Ne | 0) & 128 && (Se = -1),
          (_n = +(((Ne | 0) & 124) >> 2)),
          (Kr = +((((Ne | 0) & 3) << 8) | Ie)),
          +_n == 0
            ? E(+(+Se * 5960464477539063e-23 * +Kr))
            : +_n == 31
              ? +Se == 1
                ? +Kr > 0
                  ? q()
                  : W()
                : +Kr > 0
                  ? re()
                  : z()
              : E(+(+Se * ee(2, +(+_n - 25)) * +(1024 + Kr))),
          (m = (m + 3) | 0),
          0);
    }
    function ou(R) {
      return (
        (R = R | 0),
        te(4) | 0
          ? 1
          : (S(
              i[(m + 1) | 0] | 0,
              i[(m + 2) | 0] | 0,
              i[(m + 3) | 0] | 0,
              i[(m + 4) | 0] | 0,
            ),
            (m = (m + 5) | 0),
            0)
      );
    }
    function au(R) {
      return (
        (R = R | 0),
        te(8) | 0
          ? 1
          : (I(
              i[(m + 1) | 0] | 0,
              i[(m + 2) | 0] | 0,
              i[(m + 3) | 0] | 0,
              i[(m + 4) | 0] | 0,
              i[(m + 5) | 0] | 0,
              i[(m + 6) | 0] | 0,
              i[(m + 7) | 0] | 0,
              i[(m + 8) | 0] | 0,
            ),
            (m = (m + 9) | 0),
            0)
      );
    }
    function Fe(R) {
      return (R = R | 0), 1;
    }
    function cu(R) {
      return (R = R | 0), fe(), (m = (m + 1) | 0), 0;
    }
    var uu = [
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      B,
      k,
      O,
      M,
      Fe,
      Fe,
      Fe,
      Fe,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      s,
      c,
      y,
      _,
      Fe,
      Fe,
      Fe,
      Fe,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      T,
      V,
      ne,
      pe,
      ye,
      Fe,
      Fe,
      Fe,
      xe,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      d,
      u,
      f,
      v,
      F,
      Fe,
      Fe,
      Fe,
      K,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      H,
      _e,
      Be,
      Ee,
      be,
      Fe,
      Fe,
      Fe,
      Re,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      ke,
      Ii,
      Ri,
      Oi,
      Ui,
      Fe,
      Fe,
      Fe,
      Fi,
      Ht,
      Ht,
      Ht,
      Ht,
      Ht,
      Ht,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Ye,
      Dc,
      Xc,
      Jc,
      Qc,
      Fe,
      Fe,
      Fe,
      Fe,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      He,
      eu,
      tu,
      ru,
      nu,
      iu,
      su,
      ou,
      au,
      Fe,
      Fe,
      Fe,
      cu,
    ];
    return { parse: de };
  },
  Ai = {},
  nt = {};
const Os = vi.BigNumber;
nt.MT = {
  POS_INT: 0,
  NEG_INT: 1,
  BYTE_STRING: 2,
  UTF8_STRING: 3,
  ARRAY: 4,
  MAP: 5,
  TAG: 6,
  SIMPLE_FLOAT: 7,
};
nt.TAG = {
  DATE_STRING: 0,
  DATE_EPOCH: 1,
  POS_BIGINT: 2,
  NEG_BIGINT: 3,
  DECIMAL_FRAC: 4,
  BIGFLOAT: 5,
  BASE64URL_EXPECTED: 21,
  BASE64_EXPECTED: 22,
  BASE16_EXPECTED: 23,
  CBOR: 24,
  URI: 32,
  BASE64URL: 33,
  BASE64: 34,
  REGEXP: 35,
  MIME: 36,
};
nt.NUMBYTES = {
  ZERO: 0,
  ONE: 24,
  TWO: 25,
  FOUR: 26,
  EIGHT: 27,
  INDEFINITE: 31,
};
nt.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
nt.SYMS = {
  NULL: Symbol("null"),
  UNDEFINED: Symbol("undef"),
  PARENT: Symbol("parent"),
  BREAK: Symbol("break"),
  STREAM: Symbol("stream"),
};
nt.SHIFT32 = Math.pow(2, 32);
nt.SHIFT16 = Math.pow(2, 16);
nt.MAX_SAFE_HIGH = 2097151;
nt.NEG_ONE = new Os(-1);
nt.TEN = new Os(10);
nt.TWO = new Os(2);
nt.PARENT = {
  ARRAY: 0,
  OBJECT: 1,
  MAP: 2,
  TAG: 3,
  BYTE_STRING: 4,
  UTF8_STRING: 5,
};
(function (t) {
  const { Buffer: e } = wn,
    r = vi.BigNumber,
    n = nt,
    i = n.SHIFT32,
    o = n.SHIFT16,
    l = 2097151;
  t.parseHalf = function (g) {
    var E, S, I;
    return (
      (I = g[0] & 128 ? -1 : 1),
      (E = (g[0] & 124) >> 2),
      (S = ((g[0] & 3) << 8) | g[1]),
      E
        ? E === 31
          ? I * (S ? NaN : 1 / 0)
          : I * Math.pow(2, E - 25) * (1024 + S)
        : I * 5960464477539063e-23 * S
    );
  };
  function a(p) {
    return p < 16 ? "0" + p.toString(16) : p.toString(16);
  }
  (t.arrayBufferToBignumber = function (p) {
    const g = p.byteLength;
    let E = "";
    for (let S = 0; S < g; S++) E += a(p[S]);
    return new r(E, 16);
  }),
    (t.buildMap = (p) => {
      const g = new Map(),
        E = Object.keys(p),
        S = E.length;
      for (let I = 0; I < S; I++) g.set(E[I], p[E[I]]);
      return g;
    }),
    (t.buildInt32 = (p, g) => p * o + g),
    (t.buildInt64 = (p, g, E, S) => {
      const I = t.buildInt32(p, g),
        A = t.buildInt32(E, S);
      return I > l ? new r(I).times(i).plus(A) : I * i + A;
    }),
    (t.writeHalf = function (g, E) {
      const S = e.allocUnsafe(4);
      S.writeFloatBE(E, 0);
      const I = S.readUInt32BE(0);
      if (I & 8191) return !1;
      var A = (I >> 16) & 32768;
      const w = (I >> 23) & 255,
        $ = I & 8388607;
      if (w >= 113 && w <= 142) A += ((w - 112) << 10) + ($ >> 13);
      else if (w >= 103 && w < 113) {
        if ($ & ((1 << (126 - w)) - 1)) return !1;
        A += ($ + 8388608) >> (126 - w);
      } else return !1;
      return g.writeUInt16BE(A, 0), !0;
    }),
    (t.keySorter = function (p, g) {
      var E = p[0].byteLength,
        S = g[0].byteLength;
      return E > S ? 1 : S > E ? -1 : p[0].compare(g[0]);
    }),
    (t.isNegativeZero = (p) => p === 0 && 1 / p < 0),
    (t.nextPowerOf2 = (p) => {
      let g = 0;
      if (p && !(p & (p - 1))) return p;
      for (; p !== 0; ) (p >>= 1), (g += 1);
      return 1 << g;
    });
})(Ai);
const Us = nt,
  rf = Us.MT,
  En = Us.SIMPLE,
  Ci = Us.SYMS;
let nf = class as {
  constructor(e) {
    if (typeof e != "number")
      throw new Error("Invalid Simple type: " + typeof e);
    if (e < 0 || e > 255 || (e | 0) !== e)
      throw new Error("value must be a small positive integer: " + e);
    this.value = e;
  }
  toString() {
    return "simple(" + this.value + ")";
  }
  inspect() {
    return "simple(" + this.value + ")";
  }
  encodeCBOR(e) {
    return e._pushInt(this.value, rf.SIMPLE_FLOAT);
  }
  static isSimple(e) {
    return e instanceof as;
  }
  static decode(e, r) {
    switch ((r == null && (r = !0), e)) {
      case En.FALSE:
        return !1;
      case En.TRUE:
        return !0;
      case En.NULL:
        return r ? null : Ci.NULL;
      case En.UNDEFINED:
        return r ? void 0 : Ci.UNDEFINED;
      case -1:
        if (!r) throw new Error("Invalid BREAK");
        return Ci.BREAK;
      default:
        return new as(e);
    }
  }
};
var Va = nf;
let sf = class cs {
  constructor(e, r, n) {
    if (
      ((this.tag = e),
      (this.value = r),
      (this.err = n),
      typeof this.tag != "number")
    )
      throw new Error("Invalid tag type (" + typeof this.tag + ")");
    if (this.tag < 0 || (this.tag | 0) !== this.tag)
      throw new Error("Tag must be a positive integer: " + this.tag);
  }
  toString() {
    return `${this.tag}(${JSON.stringify(this.value)})`;
  }
  encodeCBOR(e) {
    return e._pushTag(this.tag), e.pushAny(this.value);
  }
  convert(e) {
    var r, n;
    if (
      ((n = e?.[this.tag]),
      typeof n != "function" &&
        ((n = cs["_tag" + this.tag]), typeof n != "function"))
    )
      return this;
    try {
      return n.call(cs, this.value);
    } catch (i) {
      return (r = i), (this.err = r), this;
    }
  }
};
var Ga = sf;
const ja = self.location
    ? self.location.protocol + "//" + self.location.host
    : "",
  us = self.URL;
let of = class {
  constructor(e = "", r = ja) {
    (this.super = new us(e, r)),
      (this.path = this.pathname + this.search),
      (this.auth =
        this.username && this.password
          ? this.username + ":" + this.password
          : null),
      (this.query =
        this.search && this.search.startsWith("?")
          ? this.search.slice(1)
          : null);
  }
  get hash() {
    return this.super.hash;
  }
  get host() {
    return this.super.host;
  }
  get hostname() {
    return this.super.hostname;
  }
  get href() {
    return this.super.href;
  }
  get origin() {
    return this.super.origin;
  }
  get password() {
    return this.super.password;
  }
  get pathname() {
    return this.super.pathname;
  }
  get port() {
    return this.super.port;
  }
  get protocol() {
    return this.super.protocol;
  }
  get search() {
    return this.super.search;
  }
  get searchParams() {
    return this.super.searchParams;
  }
  get username() {
    return this.super.username;
  }
  set hash(e) {
    this.super.hash = e;
  }
  set host(e) {
    this.super.host = e;
  }
  set hostname(e) {
    this.super.hostname = e;
  }
  set href(e) {
    this.super.href = e;
  }
  set origin(e) {
    this.super.origin = e;
  }
  set password(e) {
    this.super.password = e;
  }
  set pathname(e) {
    this.super.pathname = e;
  }
  set port(e) {
    this.super.port = e;
  }
  set protocol(e) {
    this.super.protocol = e;
  }
  set search(e) {
    this.super.search = e;
  }
  set searchParams(e) {
    this.super.searchParams = e;
  }
  set username(e) {
    this.super.username = e;
  }
  createObjectURL(e) {
    return this.super.createObjectURL(e);
  }
  revokeObjectURL(e) {
    this.super.revokeObjectURL(e);
  }
  toJSON() {
    return this.super.toJSON();
  }
  toString() {
    return this.super.toString();
  }
  format() {
    return this.toString();
  }
};
function af(t) {
  if (typeof t == "string") return new us(t).toString();
  if (!(t instanceof us)) {
    const e = t.username && t.password ? `${t.username}:${t.password}@` : "",
      r = t.auth ? t.auth + "@" : "",
      n = t.port ? ":" + t.port : "",
      i = t.protocol ? t.protocol + "//" : "",
      o = t.host || "",
      l = t.hostname || "",
      a = t.search || (t.query ? "?" + t.query : ""),
      p = t.hash || "",
      g = t.pathname || "",
      E = t.path || g + a;
    return `${i}${e || r}${o || l + n}${E}${p}`;
  }
}
var Ha = {
  URLWithLegacySupport: of,
  URLSearchParams: self.URLSearchParams,
  defaultBase: ja,
  format: af,
};
const { URLWithLegacySupport: Kh, format: zh } = Ha,
  {
    URLWithLegacySupport: cf,
    format: Lh,
    URLSearchParams: Wh,
    defaultBase: Yh,
  } = Ha;
var Ka = { URL: cf };
const { Buffer: Ar } = wn,
  Xs = dn,
  uf = vi.BigNumber,
  ff = tf,
  it = Ai,
  Ue = nt,
  lf = Va,
  hf = Ga,
  { URL: df } = Ka;
let fs = class ls {
  constructor(e) {
    (e = e || {}),
      !e.size || e.size < 65536
        ? (e.size = 65536)
        : (e.size = it.nextPowerOf2(e.size)),
      (this._heap = new ArrayBuffer(e.size)),
      (this._heap8 = new Uint8Array(this._heap)),
      (this._buffer = Ar.from(this._heap)),
      this._reset(),
      (this._knownTags = Object.assign(
        {
          0: (r) => new Date(r),
          1: (r) => new Date(r * 1e3),
          2: (r) => it.arrayBufferToBignumber(r),
          3: (r) => Ue.NEG_ONE.minus(it.arrayBufferToBignumber(r)),
          4: (r) => Ue.TEN.pow(r[0]).times(r[1]),
          5: (r) => Ue.TWO.pow(r[0]).times(r[1]),
          32: (r) => new df(r),
          35: (r) => new RegExp(r),
        },
        e.tags,
      )),
      (this.parser = ff(
        $r,
        {
          log: console.log.bind(console),
          pushInt: this.pushInt.bind(this),
          pushInt32: this.pushInt32.bind(this),
          pushInt32Neg: this.pushInt32Neg.bind(this),
          pushInt64: this.pushInt64.bind(this),
          pushInt64Neg: this.pushInt64Neg.bind(this),
          pushFloat: this.pushFloat.bind(this),
          pushFloatSingle: this.pushFloatSingle.bind(this),
          pushFloatDouble: this.pushFloatDouble.bind(this),
          pushTrue: this.pushTrue.bind(this),
          pushFalse: this.pushFalse.bind(this),
          pushUndefined: this.pushUndefined.bind(this),
          pushNull: this.pushNull.bind(this),
          pushInfinity: this.pushInfinity.bind(this),
          pushInfinityNeg: this.pushInfinityNeg.bind(this),
          pushNaN: this.pushNaN.bind(this),
          pushNaNNeg: this.pushNaNNeg.bind(this),
          pushArrayStart: this.pushArrayStart.bind(this),
          pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
          pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
          pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
          pushObjectStart: this.pushObjectStart.bind(this),
          pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
          pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
          pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
          pushByteString: this.pushByteString.bind(this),
          pushByteStringStart: this.pushByteStringStart.bind(this),
          pushUtf8String: this.pushUtf8String.bind(this),
          pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
          pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
          pushTagUnassigned: this.pushTagUnassigned.bind(this),
          pushTagStart: this.pushTagStart.bind(this),
          pushTagStart4: this.pushTagStart4.bind(this),
          pushTagStart8: this.pushTagStart8.bind(this),
          pushBreak: this.pushBreak.bind(this),
        },
        this._heap,
      ));
  }
  get _depth() {
    return this._parents.length;
  }
  get _currentParent() {
    return this._parents[this._depth - 1];
  }
  get _ref() {
    return this._currentParent.ref;
  }
  _closeParent() {
    var e = this._parents.pop();
    if (e.length > 0) throw new Error(`Missing ${e.length} elements`);
    switch (e.type) {
      case Ue.PARENT.TAG:
        this._push(this.createTag(e.ref[0], e.ref[1]));
        break;
      case Ue.PARENT.BYTE_STRING:
        this._push(this.createByteString(e.ref, e.length));
        break;
      case Ue.PARENT.UTF8_STRING:
        this._push(this.createUtf8String(e.ref, e.length));
        break;
      case Ue.PARENT.MAP:
        if (e.values % 2 > 0)
          throw new Error("Odd number of elements in the map");
        this._push(this.createMap(e.ref, e.length));
        break;
      case Ue.PARENT.OBJECT:
        if (e.values % 2 > 0)
          throw new Error("Odd number of elements in the map");
        this._push(this.createObject(e.ref, e.length));
        break;
      case Ue.PARENT.ARRAY:
        this._push(this.createArray(e.ref, e.length));
        break;
    }
    this._currentParent &&
      this._currentParent.type === Ue.PARENT.TAG &&
      this._dec();
  }
  _dec() {
    const e = this._currentParent;
    e.length < 0 || (e.length--, e.length === 0 && this._closeParent());
  }
  _push(e, r) {
    const n = this._currentParent;
    switch ((n.values++, n.type)) {
      case Ue.PARENT.ARRAY:
      case Ue.PARENT.BYTE_STRING:
      case Ue.PARENT.UTF8_STRING:
        n.length > -1
          ? (this._ref[this._ref.length - n.length] = e)
          : this._ref.push(e),
          this._dec();
        break;
      case Ue.PARENT.OBJECT:
        n.tmpKey != null
          ? ((this._ref[n.tmpKey] = e), (n.tmpKey = null), this._dec())
          : ((n.tmpKey = e),
            typeof n.tmpKey != "string" &&
              ((n.type = Ue.PARENT.MAP), (n.ref = it.buildMap(n.ref))));
        break;
      case Ue.PARENT.MAP:
        n.tmpKey != null
          ? (this._ref.set(n.tmpKey, e), (n.tmpKey = null), this._dec())
          : (n.tmpKey = e);
        break;
      case Ue.PARENT.TAG:
        this._ref.push(e), r || this._dec();
        break;
      default:
        throw new Error("Unknown parent type");
    }
  }
  _createParent(e, r, n) {
    this._parents[this._depth] = {
      type: r,
      length: n,
      ref: e,
      values: 0,
      tmpKey: null,
    };
  }
  _reset() {
    (this._res = []),
      (this._parents = [
        {
          type: Ue.PARENT.ARRAY,
          length: -1,
          ref: this._res,
          values: 0,
          tmpKey: null,
        },
      ]);
  }
  createTag(e, r) {
    const n = this._knownTags[e];
    return n ? n(r) : new hf(e, r);
  }
  createMap(e, r) {
    return e;
  }
  createObject(e, r) {
    return e;
  }
  createArray(e, r) {
    return e;
  }
  createByteString(e, r) {
    return Ar.concat(e);
  }
  createByteStringFromHeap(e, r) {
    return e === r ? Ar.alloc(0) : Ar.from(this._heap.slice(e, r));
  }
  createInt(e) {
    return e;
  }
  createInt32(e, r) {
    return it.buildInt32(e, r);
  }
  createInt64(e, r, n, i) {
    return it.buildInt64(e, r, n, i);
  }
  createFloat(e) {
    return e;
  }
  createFloatSingle(e, r, n, i) {
    return Xs.read([e, r, n, i], 0, !1, 23, 4);
  }
  createFloatDouble(e, r, n, i, o, l, a, p) {
    return Xs.read([e, r, n, i, o, l, a, p], 0, !1, 52, 8);
  }
  createInt32Neg(e, r) {
    return -1 - it.buildInt32(e, r);
  }
  createInt64Neg(e, r, n, i) {
    const o = it.buildInt32(e, r),
      l = it.buildInt32(n, i);
    return o > Ue.MAX_SAFE_HIGH
      ? Ue.NEG_ONE.minus(new uf(o).times(Ue.SHIFT32).plus(l))
      : -1 - (o * Ue.SHIFT32 + l);
  }
  createTrue() {
    return !0;
  }
  createFalse() {
    return !1;
  }
  createNull() {
    return null;
  }
  createUndefined() {}
  createInfinity() {
    return 1 / 0;
  }
  createInfinityNeg() {
    return -1 / 0;
  }
  createNaN() {
    return NaN;
  }
  createNaNNeg() {
    return NaN;
  }
  createUtf8String(e, r) {
    return e.join("");
  }
  createUtf8StringFromHeap(e, r) {
    return e === r ? "" : this._buffer.toString("utf8", e, r);
  }
  createSimpleUnassigned(e) {
    return new lf(e);
  }
  pushInt(e) {
    this._push(this.createInt(e));
  }
  pushInt32(e, r) {
    this._push(this.createInt32(e, r));
  }
  pushInt64(e, r, n, i) {
    this._push(this.createInt64(e, r, n, i));
  }
  pushFloat(e) {
    this._push(this.createFloat(e));
  }
  pushFloatSingle(e, r, n, i) {
    this._push(this.createFloatSingle(e, r, n, i));
  }
  pushFloatDouble(e, r, n, i, o, l, a, p) {
    this._push(this.createFloatDouble(e, r, n, i, o, l, a, p));
  }
  pushInt32Neg(e, r) {
    this._push(this.createInt32Neg(e, r));
  }
  pushInt64Neg(e, r, n, i) {
    this._push(this.createInt64Neg(e, r, n, i));
  }
  pushTrue() {
    this._push(this.createTrue());
  }
  pushFalse() {
    this._push(this.createFalse());
  }
  pushNull() {
    this._push(this.createNull());
  }
  pushUndefined() {
    this._push(this.createUndefined());
  }
  pushInfinity() {
    this._push(this.createInfinity());
  }
  pushInfinityNeg() {
    this._push(this.createInfinityNeg());
  }
  pushNaN() {
    this._push(this.createNaN());
  }
  pushNaNNeg() {
    this._push(this.createNaNNeg());
  }
  pushArrayStart() {
    this._createParent([], Ue.PARENT.ARRAY, -1);
  }
  pushArrayStartFixed(e) {
    this._createArrayStartFixed(e);
  }
  pushArrayStartFixed32(e, r) {
    const n = it.buildInt32(e, r);
    this._createArrayStartFixed(n);
  }
  pushArrayStartFixed64(e, r, n, i) {
    const o = it.buildInt64(e, r, n, i);
    this._createArrayStartFixed(o);
  }
  pushObjectStart() {
    this._createObjectStartFixed(-1);
  }
  pushObjectStartFixed(e) {
    this._createObjectStartFixed(e);
  }
  pushObjectStartFixed32(e, r) {
    const n = it.buildInt32(e, r);
    this._createObjectStartFixed(n);
  }
  pushObjectStartFixed64(e, r, n, i) {
    const o = it.buildInt64(e, r, n, i);
    this._createObjectStartFixed(o);
  }
  pushByteStringStart() {
    this._parents[this._depth] = {
      type: Ue.PARENT.BYTE_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushByteString(e, r) {
    this._push(this.createByteStringFromHeap(e, r));
  }
  pushUtf8StringStart() {
    this._parents[this._depth] = {
      type: Ue.PARENT.UTF8_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushUtf8String(e, r) {
    this._push(this.createUtf8StringFromHeap(e, r));
  }
  pushSimpleUnassigned(e) {
    this._push(this.createSimpleUnassigned(e));
  }
  pushTagStart(e) {
    this._parents[this._depth] = { type: Ue.PARENT.TAG, length: 1, ref: [e] };
  }
  pushTagStart4(e, r) {
    this.pushTagStart(it.buildInt32(e, r));
  }
  pushTagStart8(e, r, n, i) {
    this.pushTagStart(it.buildInt64(e, r, n, i));
  }
  pushTagUnassigned(e) {
    this._push(this.createTag(e));
  }
  pushBreak() {
    if (this._currentParent.length > -1) throw new Error("Unexpected break");
    this._closeParent();
  }
  _createObjectStartFixed(e) {
    if (e === 0) {
      this._push(this.createObject({}));
      return;
    }
    this._createParent({}, Ue.PARENT.OBJECT, e);
  }
  _createArrayStartFixed(e) {
    if (e === 0) {
      this._push(this.createArray([]));
      return;
    }
    this._createParent(new Array(e), Ue.PARENT.ARRAY, e);
  }
  _decode(e) {
    if (e.byteLength === 0) throw new Error("Input too short");
    this._reset(), this._heap8.set(e);
    const r = this.parser.parse(e.byteLength);
    if (this._depth > 1) {
      for (; this._currentParent.length === 0; ) this._closeParent();
      if (this._depth > 1) throw new Error("Undeterminated nesting");
    }
    if (r > 0) throw new Error("Failed to parse");
    if (this._res.length === 0) throw new Error("No valid result");
  }
  decodeFirst(e) {
    return this._decode(e), this._res[0];
  }
  decodeAll(e) {
    return this._decode(e), this._res;
  }
  static decode(e, r) {
    return (
      typeof e == "string" && (e = Ar.from(e, r || "hex")),
      new ls({ size: e.length }).decodeFirst(e)
    );
  }
  static decodeAll(e, r) {
    return (
      typeof e == "string" && (e = Ar.from(e, r || "hex")),
      new ls({ size: e.length }).decodeAll(e)
    );
  }
};
fs.decodeFirst = fs.decode;
var za = fs;
const { Buffer: $i } = wn,
  pf = za,
  yf = Ai;
class Fs extends pf {
  createTag(e, r) {
    return `${e}(${r})`;
  }
  createInt(e) {
    return super.createInt(e).toString();
  }
  createInt32(e, r) {
    return super.createInt32(e, r).toString();
  }
  createInt64(e, r, n, i) {
    return super.createInt64(e, r, n, i).toString();
  }
  createInt32Neg(e, r) {
    return super.createInt32Neg(e, r).toString();
  }
  createInt64Neg(e, r, n, i) {
    return super.createInt64Neg(e, r, n, i).toString();
  }
  createTrue() {
    return "true";
  }
  createFalse() {
    return "false";
  }
  createFloat(e) {
    const r = super.createFloat(e);
    return yf.isNegativeZero(e) ? "-0_1" : `${r}_1`;
  }
  createFloatSingle(e, r, n, i) {
    return `${super.createFloatSingle(e, r, n, i)}_2`;
  }
  createFloatDouble(e, r, n, i, o, l, a, p) {
    return `${super.createFloatDouble(e, r, n, i, o, l, a, p)}_3`;
  }
  createByteString(e, r) {
    const n = e.join(", ");
    return r === -1 ? `(_ ${n})` : `h'${n}`;
  }
  createByteStringFromHeap(e, r) {
    return `h'${$i.from(super.createByteStringFromHeap(e, r)).toString("hex")}'`;
  }
  createInfinity() {
    return "Infinity_1";
  }
  createInfinityNeg() {
    return "-Infinity_1";
  }
  createNaN() {
    return "NaN_1";
  }
  createNaNNeg() {
    return "-NaN_1";
  }
  createNull() {
    return "null";
  }
  createUndefined() {
    return "undefined";
  }
  createSimpleUnassigned(e) {
    return `simple(${e})`;
  }
  createArray(e, r) {
    const n = super.createArray(e, r);
    return r === -1 ? `[_ ${n.join(", ")}]` : `[${n.join(", ")}]`;
  }
  createMap(e, r) {
    const n = super.createMap(e),
      i = Array.from(n.keys()).reduce(Js(n), "");
    return r === -1 ? `{_ ${i}}` : `{${i}}`;
  }
  createObject(e, r) {
    const n = super.createObject(e),
      i = Object.keys(n).reduce(Js(n), "");
    return r === -1 ? `{_ ${i}}` : `{${i}}`;
  }
  createUtf8String(e, r) {
    const n = e.join(", ");
    return r === -1 ? `(_ ${n})` : `"${n}"`;
  }
  createUtf8StringFromHeap(e, r) {
    return `"${$i.from(super.createUtf8StringFromHeap(e, r)).toString("utf8")}"`;
  }
  static diagnose(e, r) {
    return (
      typeof e == "string" && (e = $i.from(e, r || "hex")),
      new Fs().decodeFirst(e)
    );
  }
}
var wf = Fs;
function Js(t) {
  return (e, r) => (e ? `${e}, ${r}: ${t[r]}` : `${r}: ${t[r]}`);
}
const { Buffer: Rt } = wn,
  { URL: gf } = Ka,
  hs = vi.BigNumber,
  qi = Ai,
  We = nt,
  wt = We.MT,
  vn = We.NUMBYTES,
  Qs = We.SHIFT32,
  eo = We.SYMS,
  Br = We.TAG,
  mf = (We.MT.SIMPLE_FLOAT << 5) | We.NUMBYTES.TWO,
  bf = (We.MT.SIMPLE_FLOAT << 5) | We.NUMBYTES.FOUR,
  _f = (We.MT.SIMPLE_FLOAT << 5) | We.NUMBYTES.EIGHT,
  xf = (We.MT.SIMPLE_FLOAT << 5) | We.SIMPLE.TRUE,
  Ef = (We.MT.SIMPLE_FLOAT << 5) | We.SIMPLE.FALSE,
  vf = (We.MT.SIMPLE_FLOAT << 5) | We.SIMPLE.UNDEFINED,
  to = (We.MT.SIMPLE_FLOAT << 5) | We.SIMPLE.NULL,
  Af = new hs("0x20000000000000"),
  Bf = Rt.from("f97e00", "hex"),
  Sf = Rt.from("f9fc00", "hex"),
  Tf = Rt.from("f97c00", "hex");
function Nf(t) {
  return {}.toString.call(t).slice(8, -1);
}
class ai {
  constructor(e) {
    (e = e || {}),
      (this.streaming = typeof e.stream == "function"),
      (this.onData = e.stream),
      (this.semanticTypes = [
        [gf, this._pushUrl],
        [hs, this._pushBigNumber],
      ]);
    const r = e.genTypes || [],
      n = r.length;
    for (let i = 0; i < n; i++) this.addSemanticType(r[i][0], r[i][1]);
    this._reset();
  }
  addSemanticType(e, r) {
    const n = this.semanticTypes.length;
    for (let i = 0; i < n; i++)
      if (this.semanticTypes[i][0] === e) {
        const l = this.semanticTypes[i][1];
        return (this.semanticTypes[i][1] = r), l;
      }
    return this.semanticTypes.push([e, r]), null;
  }
  push(e) {
    return (
      e &&
        ((this.result[this.offset] = e),
        (this.resultMethod[this.offset] = 0),
        (this.resultLength[this.offset] = e.length),
        this.offset++,
        this.streaming && this.onData(this.finalize())),
      !0
    );
  }
  pushWrite(e, r, n) {
    return (
      (this.result[this.offset] = e),
      (this.resultMethod[this.offset] = r),
      (this.resultLength[this.offset] = n),
      this.offset++,
      this.streaming && this.onData(this.finalize()),
      !0
    );
  }
  _pushUInt8(e) {
    return this.pushWrite(e, 1, 1);
  }
  _pushUInt16BE(e) {
    return this.pushWrite(e, 2, 2);
  }
  _pushUInt32BE(e) {
    return this.pushWrite(e, 3, 4);
  }
  _pushDoubleBE(e) {
    return this.pushWrite(e, 4, 8);
  }
  _pushNaN() {
    return this.push(Bf);
  }
  _pushInfinity(e) {
    const r = e < 0 ? Sf : Tf;
    return this.push(r);
  }
  _pushFloat(e) {
    const r = Rt.allocUnsafe(2);
    if (qi.writeHalf(r, e) && qi.parseHalf(r) === e)
      return this._pushUInt8(mf) && this.push(r);
    const n = Rt.allocUnsafe(4);
    return (
      n.writeFloatBE(e, 0),
      n.readFloatBE(0) === e
        ? this._pushUInt8(bf) && this.push(n)
        : this._pushUInt8(_f) && this._pushDoubleBE(e)
    );
  }
  _pushInt(e, r, n) {
    const i = r << 5;
    return e < 24
      ? this._pushUInt8(i | e)
      : e <= 255
        ? this._pushUInt8(i | vn.ONE) && this._pushUInt8(e)
        : e <= 65535
          ? this._pushUInt8(i | vn.TWO) && this._pushUInt16BE(e)
          : e <= 4294967295
            ? this._pushUInt8(i | vn.FOUR) && this._pushUInt32BE(e)
            : e <= Number.MAX_SAFE_INTEGER
              ? this._pushUInt8(i | vn.EIGHT) &&
                this._pushUInt32BE(Math.floor(e / Qs)) &&
                this._pushUInt32BE(e % Qs)
              : r === wt.NEG_INT
                ? this._pushFloat(n)
                : this._pushFloat(e);
  }
  _pushIntNum(e) {
    return e < 0
      ? this._pushInt(-e - 1, wt.NEG_INT, e)
      : this._pushInt(e, wt.POS_INT);
  }
  _pushNumber(e) {
    switch (!1) {
      case e === e:
        return this._pushNaN(e);
      case isFinite(e):
        return this._pushInfinity(e);
      case e % 1 !== 0:
        return this._pushIntNum(e);
      default:
        return this._pushFloat(e);
    }
  }
  _pushString(e) {
    const r = Rt.byteLength(e, "utf8");
    return this._pushInt(r, wt.UTF8_STRING) && this.pushWrite(e, 5, r);
  }
  _pushBoolean(e) {
    return this._pushUInt8(e ? xf : Ef);
  }
  _pushUndefined(e) {
    return this._pushUInt8(vf);
  }
  _pushArray(e, r) {
    const n = r.length;
    if (!e._pushInt(n, wt.ARRAY)) return !1;
    for (let i = 0; i < n; i++) if (!e.pushAny(r[i])) return !1;
    return !0;
  }
  _pushTag(e) {
    return this._pushInt(e, wt.TAG);
  }
  _pushDate(e, r) {
    return e._pushTag(Br.DATE_EPOCH) && e.pushAny(Math.round(r / 1e3));
  }
  _pushBuffer(e, r) {
    return e._pushInt(r.length, wt.BYTE_STRING) && e.push(r);
  }
  _pushNoFilter(e, r) {
    return e._pushBuffer(e, r.slice());
  }
  _pushRegexp(e, r) {
    return e._pushTag(Br.REGEXP) && e.pushAny(r.source);
  }
  _pushSet(e, r) {
    if (!e._pushInt(r.size, wt.ARRAY)) return !1;
    for (const n of r) if (!e.pushAny(n)) return !1;
    return !0;
  }
  _pushUrl(e, r) {
    return e._pushTag(Br.URI) && e.pushAny(r.format());
  }
  _pushBigint(e) {
    let r = Br.POS_BIGINT;
    e.isNegative() && ((e = e.negated().minus(1)), (r = Br.NEG_BIGINT));
    let n = e.toString(16);
    n.length % 2 && (n = "0" + n);
    const i = Rt.from(n, "hex");
    return this._pushTag(r) && this._pushBuffer(this, i);
  }
  _pushBigNumber(e, r) {
    if (r.isNaN()) return e._pushNaN();
    if (!r.isFinite()) return e._pushInfinity(r.isNegative() ? -1 / 0 : 1 / 0);
    if (r.isInteger()) return e._pushBigint(r);
    if (!(e._pushTag(Br.DECIMAL_FRAC) && e._pushInt(2, wt.ARRAY))) return !1;
    const n = r.decimalPlaces(),
      i = r.multipliedBy(new hs(10).pow(n));
    return e._pushIntNum(-n)
      ? i.abs().isLessThan(Af)
        ? e._pushIntNum(i.toNumber())
        : e._pushBigint(i)
      : !1;
  }
  _pushMap(e, r) {
    return e._pushInt(r.size, wt.MAP)
      ? this._pushRawMap(r.size, Array.from(r))
      : !1;
  }
  _pushObject(e) {
    if (!e) return this._pushUInt8(to);
    for (var r = this.semanticTypes.length, n = 0; n < r; n++)
      if (e instanceof this.semanticTypes[n][0])
        return this.semanticTypes[n][1].call(e, this, e);
    var i = e.encodeCBOR;
    if (typeof i == "function") return i.call(e, this);
    var o = Object.keys(e),
      l = o.length;
    return this._pushInt(l, wt.MAP)
      ? this._pushRawMap(
          l,
          o.map((a) => [a, e[a]]),
        )
      : !1;
  }
  _pushRawMap(e, r) {
    r = r
      .map(function (i) {
        return (i[0] = ai.encode(i[0])), i;
      })
      .sort(qi.keySorter);
    for (var n = 0; n < e; n++)
      if (!this.push(r[n][0]) || !this.pushAny(r[n][1])) return !1;
    return !0;
  }
  write(e) {
    return this.pushAny(e);
  }
  pushAny(e) {
    var r = Nf(e);
    switch (r) {
      case "Number":
        return this._pushNumber(e);
      case "String":
        return this._pushString(e);
      case "Boolean":
        return this._pushBoolean(e);
      case "Object":
        return this._pushObject(e);
      case "Array":
        return this._pushArray(this, e);
      case "Uint8Array":
        return this._pushBuffer(this, Rt.isBuffer(e) ? e : Rt.from(e));
      case "Null":
        return this._pushUInt8(to);
      case "Undefined":
        return this._pushUndefined(e);
      case "Map":
        return this._pushMap(this, e);
      case "Set":
        return this._pushSet(this, e);
      case "URL":
        return this._pushUrl(this, e);
      case "BigNumber":
        return this._pushBigNumber(this, e);
      case "Date":
        return this._pushDate(this, e);
      case "RegExp":
        return this._pushRegexp(this, e);
      case "Symbol":
        switch (e) {
          case eo.NULL:
            return this._pushObject(null);
          case eo.UNDEFINED:
            return this._pushUndefined(void 0);
          default:
            throw new Error("Unknown symbol: " + e.toString());
        }
      default:
        throw new Error(
          "Unknown type: " + typeof e + ", " + (e ? e.toString() : ""),
        );
    }
  }
  finalize() {
    if (this.offset === 0) return null;
    for (
      var e = this.result,
        r = this.resultLength,
        n = this.resultMethod,
        i = this.offset,
        o = 0,
        l = 0;
      l < i;
      l++
    )
      o += r[l];
    var a = Rt.allocUnsafe(o),
      p = 0,
      g = 0;
    for (l = 0; l < i; l++) {
      switch (((g = r[l]), n[l])) {
        case 0:
          e[l].copy(a, p);
          break;
        case 1:
          a.writeUInt8(e[l], p, !0);
          break;
        case 2:
          a.writeUInt16BE(e[l], p, !0);
          break;
        case 3:
          a.writeUInt32BE(e[l], p, !0);
          break;
        case 4:
          a.writeDoubleBE(e[l], p, !0);
          break;
        case 5:
          a.write(e[l], p, g, "utf8");
          break;
        default:
          throw new Error("unkown method");
      }
      p += g;
    }
    var E = a;
    return this._reset(), E;
  }
  _reset() {
    (this.result = []),
      (this.resultMethod = []),
      (this.resultLength = []),
      (this.offset = 0);
  }
  static encode(e) {
    const r = new ai();
    if (!r.pushAny(e)) throw new Error("Failed to encode input");
    return r.finalize();
  }
}
var If = ai;
(function (t) {
  (t.Diagnose = wf),
    (t.Decoder = za),
    (t.Encoder = If),
    (t.Simple = Va),
    (t.Tagged = Ga),
    (t.decodeAll = t.Decoder.decodeAll),
    (t.decodeFirst = t.Decoder.decodeFirst),
    (t.diagnose = t.Diagnose.diagnose),
    (t.encode = t.Encoder.encode),
    (t.decode = t.Decoder.decode),
    (t.leveldb = {
      decode: t.Decoder.decodeAll,
      encode: t.Encoder.encode,
      buffer: !0,
      name: "cbor",
    });
})($a);
const La = fu($a);
function Et(t) {
  return en(Ss.create().update(new Uint8Array(t)).digest());
}
function Mn(t) {
  if (t instanceof La.Tagged) return Mn(t.value);
  if (typeof t == "string") return Wa(t);
  if (typeof t == "number") return Et(Ve(t));
  if (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) return Et(t);
  if (Array.isArray(t)) {
    const e = t.map(Mn);
    return Et(vt(...e));
  } else {
    if (t && typeof t == "object" && t._isPrincipal)
      return Et(t.toUint8Array());
    if (typeof t == "object" && t !== null && typeof t.toHash == "function")
      return Mn(t.toHash());
    if (typeof t == "object") return ci(t);
    if (typeof t == "bigint") return Et(Ve(t));
  }
  throw Object.assign(
    new Error(`Attempt to hash a value of unsupported type: ${t}`),
    { value: t },
  );
}
const Wa = (t) => {
  const e = new TextEncoder().encode(t);
  return Et(e);
};
function an(t) {
  return ci(t);
}
function ci(t) {
  const n = Object.entries(t)
      .filter(([, l]) => l !== void 0)
      .map(([l, a]) => {
        const p = Wa(l),
          g = Mn(a);
        return [p, g];
      })
      .sort(([l], [a]) => Jo(l, a)),
    i = vt(...n.map((l) => vt(...l)));
  return Et(i);
}
var Rf = function (t, e) {
  var r = {};
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) &&
      e.indexOf(n) < 0 &&
      (r[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(t); i < n.length; i++)
      e.indexOf(n[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, n[i]) &&
        (r[n[i]] = t[n[i]]);
  return r;
};
const Of = new TextEncoder().encode(`
ic-request`);
class Ps {
  getPrincipal() {
    return (
      this._principal ||
        (this._principal = Ae.selfAuthenticating(
          new Uint8Array(this.getPublicKey().toDer()),
        )),
      this._principal
    );
  }
  async transformRequest(e) {
    const { body: r } = e,
      n = Rf(e, ["body"]),
      i = an(r);
    return Object.assign(Object.assign({}, n), {
      body: {
        content: r,
        sender_pubkey: this.getPublicKey().toDer(),
        sender_sig: await this.sign(vt(Of, i)),
      },
    });
  }
}
class ui {
  getPrincipal() {
    return Ae.anonymous();
  }
  async transformRequest(e) {
    return Object.assign(Object.assign({}, e), { body: { content: e.body } });
  }
}
var ut = {},
  Hr = {},
  Pe = {};
Object.defineProperty(Pe, "__esModule", { value: !0 });
const Uf = 9007199254740992;
function jt(t, ...e) {
  const r = new Uint8Array(
    t.byteLength + e.reduce((i, o) => i + o.byteLength, 0),
  );
  r.set(new Uint8Array(t), 0);
  let n = t.byteLength;
  for (const i of e) r.set(new Uint8Array(i), n), (n += i.byteLength);
  return r.buffer;
}
function At(t, e, r) {
  r = r.replace(/[^0-9a-fA-F]/g, "");
  const n = 2 ** (e - 24);
  r = r.slice(-n * 2).padStart(n * 2, "0");
  const i = [(t << 5) + e].concat(r.match(/../g).map((o) => parseInt(o, 16)));
  return new Uint8Array(i).buffer;
}
function Bi(t, e) {
  if (e < 24) return new Uint8Array([(t << 5) + e]).buffer;
  {
    const r = e <= 255 ? 24 : e <= 65535 ? 25 : e <= 4294967295 ? 26 : 27;
    return At(t, r, e.toString(16));
  }
}
function Ya(t) {
  const e = [];
  for (let r = 0; r < t.length; r++) {
    let n = t.charCodeAt(r);
    n < 128
      ? e.push(n)
      : n < 2048
        ? e.push(192 | (n >> 6), 128 | (n & 63))
        : n < 55296 || n >= 57344
          ? e.push(224 | (n >> 12), 128 | ((n >> 6) & 63), 128 | (n & 63))
          : (r++,
            (n = ((n & 1023) << 10) | (t.charCodeAt(r) & 1023)),
            e.push(
              240 | (n >> 18),
              128 | ((n >> 12) & 63),
              128 | ((n >> 6) & 63),
              128 | (n & 63),
            ));
  }
  return jt(new Uint8Array(Bi(3, t.length)), new Uint8Array(e));
}
function Ff(t, e) {
  if (t == 14277111) return jt(new Uint8Array([217, 217, 247]), e);
  if (t < 24) return jt(new Uint8Array([192 + t]), e);
  {
    const r = t <= 255 ? 24 : t <= 65535 ? 25 : t <= 4294967295 ? 26 : 27,
      n = 2 ** (r - 24),
      i = t
        .toString(16)
        .slice(-n * 2)
        .padStart(n * 2, "0"),
      o = [192 + r].concat(i.match(/../g).map((l) => parseInt(l, 16)));
    return new Uint8Array(o).buffer;
  }
}
Pe.tagged = Ff;
function gn(t) {
  return new Uint8Array(t).buffer;
}
Pe.raw = gn;
function ks(t) {
  if (isNaN(t)) throw new RangeError("Invalid number.");
  t = Math.min(Math.max(0, t), 23);
  const e = [0 + t];
  return new Uint8Array(e).buffer;
}
Pe.uSmall = ks;
function Za(t, e) {
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, t), 255)), (t = t.toString(16)), At(0, 24, t)
  );
}
Pe.u8 = Za;
function Da(t, e) {
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, t), 65535)), (t = t.toString(16)), At(0, 25, t)
  );
}
Pe.u16 = Da;
function Xa(t, e) {
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, t), 4294967295)),
    (t = t.toString(16)),
    At(0, 26, t)
  );
}
Pe.u32 = Xa;
function Ms(t, e) {
  if (typeof t == "string" && e == 16) {
    if (t.match(/[^0-9a-fA-F]/)) throw new RangeError("Invalid number.");
    return At(0, 27, t);
  }
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (t = Math.min(Math.max(0, t), Uf)), (t = t.toString(16)), At(0, 27, t);
}
Pe.u64 = Ms;
function Ja(t) {
  if (isNaN(t)) throw new RangeError("Invalid number.");
  if (t === 0) return ks(0);
  t = Math.min(Math.max(0, -t), 24) - 1;
  const e = [32 + t];
  return new Uint8Array(e).buffer;
}
Pe.iSmall = Ja;
function Qa(t, e) {
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, -t - 1), 255)), (t = t.toString(16)), At(1, 24, t)
  );
}
Pe.i8 = Qa;
function ec(t, e) {
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, -t - 1), 65535)),
    (t = t.toString(16)),
    At(1, 25, t)
  );
}
Pe.i16 = ec;
function tc(t, e) {
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, -t - 1), 4294967295)),
    (t = t.toString(16)),
    At(1, 26, t)
  );
}
Pe.i32 = tc;
function rc(t, e) {
  if (typeof t == "string" && e == 16) {
    if (
      (t.startsWith("-") ? (t = t.slice(1)) : (t = "0"),
      t.match(/[^0-9a-fA-F]/) || t.length > 16)
    )
      throw new RangeError("Invalid number.");
    let r = !1,
      n = t.split("").reduceRight((i, o) => {
        if (r) return o + i;
        let l = parseInt(o, 16) - 1;
        return l >= 0 ? ((r = !0), l.toString(16) + i) : "f" + i;
      }, "");
    return r ? At(1, 27, n) : Ms(0);
  }
  if (((t = parseInt("" + t, e)), isNaN(t)))
    throw new RangeError("Invalid number.");
  return (
    (t = Math.min(Math.max(0, -t - 1), 9007199254740992)),
    (t = t.toString(16)),
    At(1, 27, t)
  );
}
Pe.i64 = rc;
function Pf(t) {
  return t >= 0
    ? t < 24
      ? ks(t)
      : t <= 255
        ? Za(t)
        : t <= 65535
          ? Da(t)
          : t <= 4294967295
            ? Xa(t)
            : Ms(t)
    : t >= -24
      ? Ja(t)
      : t >= -255
        ? Qa(t)
        : t >= -65535
          ? ec(t)
          : t >= -4294967295
            ? tc(t)
            : rc(t);
}
Pe.number = Pf;
function kf(t) {
  return jt(Bi(2, t.byteLength), t);
}
Pe.bytes = kf;
function Mf(t) {
  return Ya(t);
}
Pe.string = Mf;
function Cf(t) {
  return jt(Bi(4, t.length), ...t);
}
Pe.array = Cf;
function $f(t, e = !1) {
  t instanceof Map || (t = new Map(Object.entries(t)));
  let r = Array.from(t.entries());
  return (
    e && (r = r.sort(([n], [i]) => n.localeCompare(i))),
    jt(Bi(5, t.size), ...r.map(([n, i]) => jt(Ya(n), i)))
  );
}
Pe.map = $f;
function qf(t) {
  const e = new Float32Array([t]);
  return jt(new Uint8Array([250]), new Uint8Array(e.buffer));
}
Pe.singleFloat = qf;
function Vf(t) {
  const e = new Float64Array([t]);
  return jt(new Uint8Array([251]), new Uint8Array(e.buffer));
}
Pe.doubleFloat = Vf;
function Gf(t) {
  return t ? nc() : ic();
}
Pe.bool = Gf;
function nc() {
  return gn(new Uint8Array([245]));
}
Pe.true_ = nc;
function ic() {
  return gn(new Uint8Array([244]));
}
Pe.false_ = ic;
function jf() {
  return gn(new Uint8Array([246]));
}
Pe.null_ = jf;
function Hf() {
  return gn(new Uint8Array([247]));
}
Pe.undefined_ = Hf;
var Kf =
  ($r && $r.__importStar) ||
  function (t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (t != null)
      for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return (e.default = t), e;
  };
Object.defineProperty(Hr, "__esModule", { value: !0 });
const mt = Kf(Pe),
  zf = [
    ArrayBuffer,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array,
  ];
class sc {
  constructor(e, r = !1) {
    (this._serializer = e),
      (this._stable = r),
      (this.name = "jsonDefault"),
      (this.priority = -100);
  }
  match(e) {
    return (
      ["undefined", "boolean", "number", "string", "object"].indexOf(
        typeof e,
      ) != -1
    );
  }
  encode(e) {
    switch (typeof e) {
      case "undefined":
        return mt.undefined_();
      case "boolean":
        return mt.bool(e);
      case "number":
        return Math.floor(e) === e ? mt.number(e) : mt.doubleFloat(e);
      case "string":
        return mt.string(e);
      case "object":
        if (e === null) return mt.null_();
        if (Array.isArray(e))
          return mt.array(e.map((r) => this._serializer.serializeValue(r)));
        if (zf.find((r) => e instanceof r)) return mt.bytes(e.buffer);
        if (Object.getOwnPropertyNames(e).indexOf("toJSON") !== -1)
          return this.encode(e.toJSON());
        if (e instanceof Map) {
          const r = new Map();
          for (const [n, i] of e.entries())
            r.set(n, this._serializer.serializeValue(i));
          return mt.map(r, this._stable);
        } else {
          const r = new Map();
          for (const [n, i] of Object.entries(e))
            r.set(n, this._serializer.serializeValue(i));
          return mt.map(r, this._stable);
        }
      default:
        throw new Error("Invalid value.");
    }
  }
}
Hr.JsonDefaultCborEncoder = sc;
class oc {
  constructor() {
    (this.name = "cborEncoder"), (this.priority = -90);
  }
  match(e) {
    return typeof e == "object" && typeof e.toCBOR == "function";
  }
  encode(e) {
    return e.toCBOR();
  }
}
Hr.ToCborEncoder = oc;
class ac {
  constructor() {
    this._encoders = new Set();
  }
  static withDefaultEncoders(e = !1) {
    const r = new this();
    return r.addEncoder(new sc(r, e)), r.addEncoder(new oc()), r;
  }
  removeEncoder(e) {
    for (const r of this._encoders.values())
      r.name == e && this._encoders.delete(r);
  }
  addEncoder(e) {
    this._encoders.add(e);
  }
  getEncoderFor(e) {
    let r = null;
    for (const n of this._encoders)
      (!r || n.priority > r.priority) && n.match(e) && (r = n);
    if (r === null) throw new Error("Could not find an encoder for value.");
    return r;
  }
  serializeValue(e) {
    return this.getEncoderFor(e).encode(e);
  }
  serialize(e) {
    return this.serializeValue(e);
  }
}
Hr.CborSerializer = ac;
class Lf extends ac {
  serialize(e) {
    return mt.raw(
      new Uint8Array([
        ...new Uint8Array([217, 217, 247]),
        ...new Uint8Array(super.serializeValue(e)),
      ]),
    );
  }
}
Hr.SelfDescribeCborSerializer = Lf;
(function (t) {
  function e(i) {
    for (var o in i) t.hasOwnProperty(o) || (t[o] = i[o]);
  }
  var r =
    ($r && $r.__importStar) ||
    function (i) {
      if (i && i.__esModule) return i;
      var o = {};
      if (i != null)
        for (var l in i) Object.hasOwnProperty.call(i, l) && (o[l] = i[l]);
      return (o.default = i), o;
    };
  Object.defineProperty(t, "__esModule", { value: !0 }), e(Hr);
  const n = r(Pe);
  t.value = n;
})(ut);
class Wf {
  get name() {
    return "Principal";
  }
  get priority() {
    return 0;
  }
  match(e) {
    return e && e._isPrincipal === !0;
  }
  encode(e) {
    return ut.value.bytes(e.toUint8Array());
  }
}
class Yf {
  get name() {
    return "Buffer";
  }
  get priority() {
    return 1;
  }
  match(e) {
    return e instanceof ArrayBuffer || ArrayBuffer.isView(e);
  }
  encode(e) {
    return ut.value.bytes(new Uint8Array(e));
  }
}
class Zf {
  get name() {
    return "BigInt";
  }
  get priority() {
    return 1;
  }
  match(e) {
    return typeof e == "bigint";
  }
  encode(e) {
    return e > BigInt(0)
      ? ut.value.tagged(2, ut.value.bytes(Gt(e.toString(16))))
      : ut.value.tagged(3, ut.value.bytes(Gt((BigInt("-1") * e).toString(16))));
  }
}
const Si = ut.SelfDescribeCborSerializer.withDefaultEncoders(!0);
Si.addEncoder(new Wf());
Si.addEncoder(new Yf());
Si.addEncoder(new Zf());
var ds;
(function (t) {
  (t[(t.Uint64LittleEndian = 71)] = "Uint64LittleEndian"),
    (t[(t.Semantic = 55799)] = "Semantic");
})(ds || (ds = {}));
function Vi(t) {
  return Si.serialize(t);
}
function ro(t) {
  const e = t.byteLength;
  let r = BigInt(0);
  for (let n = 0; n < e; n++) r = r * BigInt(256) + BigInt(t[n]);
  return r;
}
class Df extends La.Decoder {
  createByteString(e) {
    return vt(...e);
  }
  createByteStringFromHeap(e, r) {
    return e === r
      ? new ArrayBuffer(0)
      : new Uint8Array(this._heap.slice(e, r));
  }
}
function qt(t) {
  const e = new Uint8Array(t),
    r = new Df({
      size: e.byteLength,
      tags: { 2: (n) => ro(n), 3: (n) => -ro(n), [ds.Semantic]: (n) => n },
    });
  try {
    return r.decodeFirst(e);
  } catch (n) {
    throw new Error(`Failed to decode CBOR: ${n}, input: ${Me(e)}`);
  }
}
const An = () => {
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    const t = new Uint32Array(1);
    return window.crypto.getRandomValues(t), t[0];
  }
  if (typeof crypto < "u" && crypto.getRandomValues) {
    const t = new Uint32Array(1);
    return crypto.getRandomValues(t), t[0];
  }
  return typeof crypto < "u" && crypto.randomInt
    ? crypto.randomInt(0, 4294967295)
    : Math.floor(Math.random() * 4294967295);
};
var ps;
(function (t) {
  t.Call = "call";
})(ps || (ps = {}));
function ys() {
  const t = new ArrayBuffer(16),
    e = new DataView(t),
    r = An(),
    n = An(),
    i = An(),
    o = An();
  return (
    e.setUint32(0, r),
    e.setUint32(4, n),
    e.setUint32(8, i),
    e.setUint32(12, o),
    t
  );
}
const no = BigInt(1e6),
  Xf = 60 * 1e3;
class Bn {
  constructor(e) {
    if (e < 90 * 1e3) {
      const a = (BigInt(Date.now() + e) * no) / BigInt(1e9);
      this._value = a * BigInt(1e9);
      return;
    }
    const o =
      ((BigInt(Math.floor(Date.now() + e - Xf)) * no) /
        BigInt(1e9) /
        BigInt(60)) *
      BigInt(60) *
      BigInt(1e9);
    this._value = o;
  }
  toCBOR() {
    return ut.value.u64(this._value.toString(16), 16);
  }
  toHash() {
    return Ve(this._value);
  }
}
function io(t = ys) {
  return async (e) => {
    const r = e.request.headers;
    (e.request.headers = r), e.endpoint === "call" && (e.body.nonce = t());
  };
}
function Wr(t) {
  const e = [];
  return (
    t.forEach((r, n) => {
      e.push([n, r]);
    }),
    e
  );
}
class Gi extends qe {
  constructor(e, r) {
    super(e),
      (this.response = r),
      (this.name = this.constructor.name),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}
class Jf extends qe {
  constructor(e, r, n, i, o, l) {
    super(e),
      (this.response = r),
      (this.requestId = n),
      (this.senderPubkey = i),
      (this.senderSig = o),
      (this.ingressExpiry = l),
      (this.name = "AgentCallError"),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}
class Qf extends qe {
  constructor(e, r, n, i, o, l) {
    super(e),
      (this.response = r),
      (this.requestId = n),
      (this.senderPubkey = i),
      (this.senderSig = o),
      (this.ingressExpiry = l),
      (this.name = "AgentQueryError"),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}
class el extends qe {
  constructor(e, r, n, i, o, l) {
    super(e),
      (this.response = r),
      (this.requestId = n),
      (this.senderPubkey = i),
      (this.senderSig = o),
      (this.ingressExpiry = l),
      (this.name = "AgentReadStateError"),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Cs =
    BigInt(0),
  $s = BigInt(1),
  tl = BigInt(2);
function Ti(t) {
  return (
    t instanceof Uint8Array ||
    (ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array")
  );
}
function ar(t) {
  if (!Ti(t)) throw new Error("Uint8Array expected");
}
function tn(t, e) {
  if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const rl = Array.from({ length: 256 }, (t, e) =>
  e.toString(16).padStart(2, "0"),
);
function xr(t) {
  ar(t);
  let e = "";
  for (let r = 0; r < t.length; r++) e += rl[t[r]];
  return e;
}
function cc(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  return t === "" ? Cs : BigInt("0x" + t);
}
const Pt = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function so(t) {
  if (t >= Pt._0 && t <= Pt._9) return t - Pt._0;
  if (t >= Pt.A && t <= Pt.F) return t - (Pt.A - 10);
  if (t >= Pt.a && t <= Pt.f) return t - (Pt.a - 10);
}
function uc(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  const e = t.length,
    r = e / 2;
  if (e % 2)
    throw new Error("hex string expected, got unpadded hex of length " + e);
  const n = new Uint8Array(r);
  for (let i = 0, o = 0; i < r; i++, o += 2) {
    const l = so(t.charCodeAt(o)),
      a = so(t.charCodeAt(o + 1));
    if (l === void 0 || a === void 0) {
      const p = t[o] + t[o + 1];
      throw new Error(
        'hex string expected, got non-hex character "' + p + '" at index ' + o,
      );
    }
    n[i] = l * 16 + a;
  }
  return n;
}
function xt(t) {
  return cc(xr(t));
}
function rn(t) {
  return ar(t), cc(xr(Uint8Array.from(t).reverse()));
}
function Qe(t, e) {
  return uc(t.toString(16).padStart(e * 2, "0"));
}
function fi(t, e) {
  return Qe(t, e).reverse();
}
function at(t, e, r) {
  let n;
  if (typeof e == "string")
    try {
      n = uc(e);
    } catch (o) {
      throw new Error(t + " must be hex string or Uint8Array, cause: " + o);
    }
  else if (Ti(e)) n = Uint8Array.from(e);
  else throw new Error(t + " must be hex string or Uint8Array");
  const i = n.length;
  if (typeof r == "number" && i !== r)
    throw new Error(t + " of length " + r + " expected, got " + i);
  return n;
}
function Ke(...t) {
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    ar(i), (e += i.length);
  }
  const r = new Uint8Array(e);
  for (let n = 0, i = 0; n < t.length; n++) {
    const o = t[n];
    r.set(o, i), (i += o.length);
  }
  return r;
}
function qs(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
const ji = (t) => typeof t == "bigint" && Cs <= t;
function fc(t, e, r) {
  return ji(t) && ji(e) && ji(r) && e <= t && t < r;
}
function tr(t, e, r, n) {
  if (!fc(e, r, n))
    throw new Error(
      "expected valid " + t + ": " + r + " <= n < " + n + ", got " + e,
    );
}
function nn(t) {
  let e;
  for (e = 0; t > Cs; t >>= $s, e += 1);
  return e;
}
function nl(t, e) {
  return (t >> BigInt(e)) & $s;
}
const Cn = (t) => (tl << BigInt(t - 1)) - $s,
  il = {
    bigint: (t) => typeof t == "bigint",
    function: (t) => typeof t == "function",
    boolean: (t) => typeof t == "boolean",
    string: (t) => typeof t == "string",
    stringOrUint8Array: (t) => typeof t == "string" || Ti(t),
    isSafeInteger: (t) => Number.isSafeInteger(t),
    array: (t) => Array.isArray(t),
    field: (t, e) => e.Fp.isValid(t),
    hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen),
  };
function mn(t, e, r = {}) {
  const n = (i, o, l) => {
    const a = il[o];
    if (typeof a != "function") throw new Error("invalid validator function");
    const p = t[i];
    if (!(l && p === void 0) && !a(p, t))
      throw new Error(
        "param " + String(i) + " is invalid. Expected " + o + ", got " + p,
      );
  };
  for (const [i, o] of Object.entries(e)) n(i, o, !1);
  for (const [i, o] of Object.entries(r)) n(i, o, !0);
  return t;
}
const oo = () => {
  throw new Error("not implemented");
};
function cn(t) {
  const e = new WeakMap();
  return (r, ...n) => {
    const i = e.get(r);
    if (i !== void 0) return i;
    const o = t(r, ...n);
    return e.set(r, o), o;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Xe =
    BigInt(0),
  Ce = BigInt(1),
  rr = BigInt(2),
  sl = BigInt(3),
  ws = BigInt(4),
  ao = BigInt(5),
  co = BigInt(8);
function $e(t, e) {
  const r = t % e;
  return r >= Xe ? r : e + r;
}
function ol(t, e, r) {
  if (e < Xe) throw new Error("invalid exponent, negatives unsupported");
  if (r <= Xe) throw new Error("invalid modulus");
  if (r === Ce) return Xe;
  let n = Ce;
  for (; e > Xe; ) e & Ce && (n = (n * t) % r), (t = (t * t) % r), (e >>= Ce);
  return n;
}
function St(t, e, r) {
  let n = t;
  for (; e-- > Xe; ) (n *= n), (n %= r);
  return n;
}
function uo(t, e) {
  if (t === Xe) throw new Error("invert: expected non-zero number");
  if (e <= Xe) throw new Error("invert: expected positive modulus, got " + e);
  let r = $e(t, e),
    n = e,
    i = Xe,
    o = Ce;
  for (; r !== Xe; ) {
    const a = n / r,
      p = n % r,
      g = i - o * a;
    (n = r), (r = p), (i = o), (o = g);
  }
  if (n !== Ce) throw new Error("invert: does not exist");
  return $e(i, e);
}
function al(t) {
  const e = (t - Ce) / rr;
  let r, n, i;
  for (r = t - Ce, n = 0; r % rr === Xe; r /= rr, n++);
  for (i = rr; i < t && ol(i, e, t) !== t - Ce; i++)
    if (i > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const l = (t + Ce) / ws;
    return function (p, g) {
      const E = p.pow(g, l);
      if (!p.eql(p.sqr(E), g)) throw new Error("Cannot find square root");
      return E;
    };
  }
  const o = (r + Ce) / rr;
  return function (a, p) {
    if (a.pow(p, e) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let g = n,
      E = a.pow(a.mul(a.ONE, i), r),
      S = a.pow(p, o),
      I = a.pow(p, r);
    for (; !a.eql(I, a.ONE); ) {
      if (a.eql(I, a.ZERO)) return a.ZERO;
      let A = 1;
      for (let $ = a.sqr(I); A < g && !a.eql($, a.ONE); A++) $ = a.sqr($);
      const w = a.pow(E, Ce << BigInt(g - A - 1));
      (E = a.sqr(w)), (S = a.mul(S, w)), (I = a.mul(I, E)), (g = A);
    }
    return S;
  };
}
function cl(t) {
  if (t % ws === sl) {
    const e = (t + Ce) / ws;
    return function (n, i) {
      const o = n.pow(i, e);
      if (!n.eql(n.sqr(o), i)) throw new Error("Cannot find square root");
      return o;
    };
  }
  if (t % co === ao) {
    const e = (t - ao) / co;
    return function (n, i) {
      const o = n.mul(i, rr),
        l = n.pow(o, e),
        a = n.mul(i, l),
        p = n.mul(n.mul(a, rr), l),
        g = n.mul(a, n.sub(p, n.ONE));
      if (!n.eql(n.sqr(g), i)) throw new Error("Cannot find square root");
      return g;
    };
  }
  return al(t);
}
const ul = (t, e) => ($e(t, e) & Ce) === Ce,
  fl = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN",
  ];
function lc(t) {
  const e = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger",
    },
    r = fl.reduce((n, i) => ((n[i] = "function"), n), e);
  return mn(t, r);
}
function $n(t, e, r) {
  if (r < Xe) throw new Error("invalid exponent, negatives unsupported");
  if (r === Xe) return t.ONE;
  if (r === Ce) return e;
  let n = t.ONE,
    i = e;
  for (; r > Xe; ) r & Ce && (n = t.mul(n, i)), (i = t.sqr(i)), (r >>= Ce);
  return n;
}
function qn(t, e) {
  const r = new Array(e.length),
    n = e.reduce(
      (o, l, a) => (t.is0(l) ? o : ((r[a] = o), t.mul(o, l))),
      t.ONE,
    ),
    i = t.inv(n);
  return (
    e.reduceRight(
      (o, l, a) => (t.is0(l) ? o : ((r[a] = t.mul(o, r[a])), t.mul(o, l))),
      i,
    ),
    r
  );
}
function ll(t) {
  const e = (t - Ce) / rr;
  return (r, n) => r.pow(n, e);
}
function hc(t, e) {
  const r = e !== void 0 ? e : t.toString(2).length,
    n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function bn(t, e, r = !1, n = {}) {
  if (t <= Xe) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: i, nByteLength: o } = hc(t, e);
  if (o > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let l;
  const a = Object.freeze({
    ORDER: t,
    isLE: r,
    BITS: i,
    BYTES: o,
    MASK: Cn(i),
    ZERO: Xe,
    ONE: Ce,
    create: (p) => $e(p, t),
    isValid: (p) => {
      if (typeof p != "bigint")
        throw new Error(
          "invalid field element: expected bigint, got " + typeof p,
        );
      return Xe <= p && p < t;
    },
    is0: (p) => p === Xe,
    isOdd: (p) => (p & Ce) === Ce,
    neg: (p) => $e(-p, t),
    eql: (p, g) => p === g,
    sqr: (p) => $e(p * p, t),
    add: (p, g) => $e(p + g, t),
    sub: (p, g) => $e(p - g, t),
    mul: (p, g) => $e(p * g, t),
    pow: (p, g) => $n(a, p, g),
    div: (p, g) => $e(p * uo(g, t), t),
    sqrN: (p) => p * p,
    addN: (p, g) => p + g,
    subN: (p, g) => p - g,
    mulN: (p, g) => p * g,
    inv: (p) => uo(p, t),
    sqrt: n.sqrt || ((p) => (l || (l = cl(t)), l(a, p))),
    invertBatch: (p) => qn(a, p),
    cmov: (p, g, E) => (E ? g : p),
    toBytes: (p) => (r ? fi(p, o) : Qe(p, o)),
    fromBytes: (p) => {
      if (p.length !== o)
        throw new Error(
          "Field.fromBytes: expected " + o + " bytes, got " + p.length,
        );
      return r ? rn(p) : xt(p);
    },
  });
  return Object.freeze(a);
}
function dc(t) {
  if (typeof t != "bigint") throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function pc(t) {
  const e = dc(t);
  return e + Math.ceil(e / 2);
}
function hl(t, e, r = !1) {
  const n = t.length,
    i = dc(e),
    o = pc(e);
  if (n < 16 || n < o || n > 1024)
    throw new Error("expected " + o + "-1024 bytes of input, got " + n);
  const l = r ? rn(t) : xt(t),
    a = $e(l, e - Ce) + Ce;
  return r ? fi(a, i) : Qe(a, i);
}
const dl = xt;
function Xt(t, e) {
  if ((un(t), un(e), t < 0 || t >= 1 << (8 * e)))
    throw new Error("invalid I2OSP input: " + t);
  const r = Array.from({ length: e }).fill(0);
  for (let n = e - 1; n >= 0; n--) (r[n] = t & 255), (t >>>= 8);
  return new Uint8Array(r);
}
function pl(t, e) {
  const r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++) r[n] = t[n] ^ e[n];
  return r;
}
function un(t) {
  if (!Number.isSafeInteger(t)) throw new Error("number expected");
}
function yl(t, e, r, n) {
  ar(t),
    ar(e),
    un(r),
    e.length > 255 && (e = n(Ke(qs("H2C-OVERSIZE-DST-"), e)));
  const { outputLen: i, blockLen: o } = n,
    l = Math.ceil(r / i);
  if (r > 65535 || l > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const a = Ke(e, Xt(e.length, 1)),
    p = Xt(0, o),
    g = Xt(r, 2),
    E = new Array(l),
    S = n(Ke(p, t, g, Xt(0, 1), a));
  E[0] = n(Ke(S, Xt(1, 1), a));
  for (let A = 1; A <= l; A++) {
    const w = [pl(S, E[A - 1]), Xt(A + 1, 1), a];
    E[A] = n(Ke(...w));
  }
  return Ke(...E).slice(0, r);
}
function wl(t, e, r, n, i) {
  if ((ar(t), ar(e), un(r), e.length > 255)) {
    const o = Math.ceil((2 * n) / 8);
    e = i
      .create({ dkLen: o })
      .update(qs("H2C-OVERSIZE-DST-"))
      .update(e)
      .digest();
  }
  if (r > 65535 || e.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return i
    .create({ dkLen: r })
    .update(t)
    .update(Xt(r, 2))
    .update(e)
    .update(Xt(e.length, 1))
    .digest();
}
function fo(t, e, r) {
  mn(r, {
    DST: "stringOrUint8Array",
    p: "bigint",
    m: "isSafeInteger",
    k: "isSafeInteger",
    hash: "hash",
  });
  const { p: n, k: i, m: o, hash: l, expand: a, DST: p } = r;
  ar(t), un(e);
  const g = typeof p == "string" ? qs(p) : p,
    E = n.toString(2).length,
    S = Math.ceil((E + i) / 8),
    I = e * o * S;
  let A;
  if (a === "xmd") A = yl(t, g, I, l);
  else if (a === "xof") A = wl(t, g, I, i, l);
  else if (a === "_internal_pass") A = t;
  else throw new Error('expand must be "xmd" or "xof"');
  const w = new Array(e);
  for (let $ = 0; $ < e; $++) {
    const C = new Array(o);
    for (let W = 0; W < o; W++) {
      const z = S * (W + $ * o),
        q = A.subarray(z, z + S);
      C[W] = $e(dl(q), n);
    }
    w[$] = C;
  }
  return w;
}
function yc(t, e) {
  const r = e.map((n) => Array.from(n).reverse());
  return (n, i) => {
    const [o, l, a, p] = r.map((g) =>
      g.reduce((E, S) => t.add(t.mul(E, n), S)),
    );
    return (n = t.div(o, l)), (i = t.mul(i, t.div(a, p))), { x: n, y: i };
  };
}
function lo(t, e, r) {
  if (typeof e != "function") throw new Error("mapToCurve() must be defined");
  return {
    hashToCurve(n, i) {
      const o = fo(n, 2, { ...r, DST: r.DST, ...i }),
        l = t.fromAffine(e(o[0])),
        a = t.fromAffine(e(o[1])),
        p = l.add(a).clearCofactor();
      return p.assertValidity(), p;
    },
    encodeToCurve(n, i) {
      const o = fo(n, 1, { ...r, DST: r.encodeDST, ...i }),
        l = t.fromAffine(e(o[0])).clearCofactor();
      return l.assertValidity(), l;
    },
    mapToCurve(n) {
      if (!Array.isArray(n))
        throw new Error("mapToCurve: expected array of bigints");
      for (const o of n)
        if (typeof o != "bigint")
          throw new Error("mapToCurve: expected array of bigints");
      const i = t.fromAffine(e(n)).clearCofactor();
      return i.assertValidity(), i;
    },
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ho =
    BigInt(0),
  Sn = BigInt(1);
function Hi(t, e) {
  const r = e.negate();
  return t ? r : e;
}
function wc(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e)
    throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function Ki(t, e) {
  wc(t, e);
  const r = Math.ceil(e / t) + 1,
    n = 2 ** (t - 1);
  return { windows: r, windowSize: n };
}
function gl(t, e) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((r, n) => {
    if (!(r instanceof e)) throw new Error("invalid point at index " + n);
  });
}
function ml(t, e) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((r, n) => {
    if (!e.isValid(r)) throw new Error("invalid scalar at index " + n);
  });
}
const zi = new WeakMap(),
  gc = new WeakMap();
function Li(t) {
  return gc.get(t) || 1;
}
function mc(t, e) {
  return {
    constTimeNegate: Hi,
    hasPrecomputes(r) {
      return Li(r) !== 1;
    },
    unsafeLadder(r, n, i = t.ZERO) {
      let o = r;
      for (; n > ho; ) n & Sn && (i = i.add(o)), (o = o.double()), (n >>= Sn);
      return i;
    },
    precomputeWindow(r, n) {
      const { windows: i, windowSize: o } = Ki(n, e),
        l = [];
      let a = r,
        p = a;
      for (let g = 0; g < i; g++) {
        (p = a), l.push(p);
        for (let E = 1; E < o; E++) (p = p.add(a)), l.push(p);
        a = p.double();
      }
      return l;
    },
    wNAF(r, n, i) {
      const { windows: o, windowSize: l } = Ki(r, e);
      let a = t.ZERO,
        p = t.BASE;
      const g = BigInt(2 ** r - 1),
        E = 2 ** r,
        S = BigInt(r);
      for (let I = 0; I < o; I++) {
        const A = I * l;
        let w = Number(i & g);
        (i >>= S), w > l && ((w -= E), (i += Sn));
        const $ = A,
          C = A + Math.abs(w) - 1,
          W = I % 2 !== 0,
          z = w < 0;
        w === 0 ? (p = p.add(Hi(W, n[$]))) : (a = a.add(Hi(z, n[C])));
      }
      return { p: a, f: p };
    },
    wNAFUnsafe(r, n, i, o = t.ZERO) {
      const { windows: l, windowSize: a } = Ki(r, e),
        p = BigInt(2 ** r - 1),
        g = 2 ** r,
        E = BigInt(r);
      for (let S = 0; S < l; S++) {
        const I = S * a;
        if (i === ho) break;
        let A = Number(i & p);
        if (((i >>= E), A > a && ((A -= g), (i += Sn)), A === 0)) continue;
        let w = n[I + Math.abs(A) - 1];
        A < 0 && (w = w.negate()), (o = o.add(w));
      }
      return o;
    },
    getPrecomputes(r, n, i) {
      let o = zi.get(n);
      return (
        o || ((o = this.precomputeWindow(n, r)), r !== 1 && zi.set(n, i(o))), o
      );
    },
    wNAFCached(r, n, i) {
      const o = Li(r);
      return this.wNAF(o, this.getPrecomputes(o, r, i), n);
    },
    wNAFCachedUnsafe(r, n, i, o) {
      const l = Li(r);
      return l === 1
        ? this.unsafeLadder(r, n, o)
        : this.wNAFUnsafe(l, this.getPrecomputes(l, r, i), n, o);
    },
    setWindowSize(r, n) {
      wc(n, e), gc.set(r, n), zi.delete(r);
    },
  };
}
function bc(t, e, r, n) {
  if ((gl(r, t), ml(n, e), r.length !== n.length))
    throw new Error("arrays of points and scalars must have equal length");
  const i = t.ZERO,
    o = nn(BigInt(r.length)),
    l = o > 12 ? o - 3 : o > 4 ? o - 2 : o ? 2 : 1,
    a = (1 << l) - 1,
    p = new Array(a + 1).fill(i),
    g = Math.floor((e.BITS - 1) / l) * l;
  let E = i;
  for (let S = g; S >= 0; S -= l) {
    p.fill(i);
    for (let A = 0; A < n.length; A++) {
      const w = n[A],
        $ = Number((w >> BigInt(S)) & BigInt(a));
      p[$] = p[$].add(r[A]);
    }
    let I = i;
    for (let A = p.length - 1, w = i; A > 0; A--)
      (w = w.add(p[A])), (I = I.add(w));
    if (((E = E.add(I)), S !== 0)) for (let A = 0; A < l; A++) E = E.double();
  }
  return E;
}
function _c(t) {
  return (
    lc(t.Fp),
    mn(
      t,
      { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
      { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" },
    ),
    Object.freeze({ ...hc(t.n, t.nBitLength), ...t, p: t.Fp.ORDER })
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function bl(
  t,
) {
  const e = _c(t);
  mn(
    e,
    { a: "field", b: "field" },
    {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function",
    },
  );
  const { endo: r, Fp: n, a: i } = e;
  if (r) {
    if (!n.eql(i, n.ZERO))
      throw new Error(
        "invalid endomorphism, can only be defined for Koblitz curves that have a=0",
      );
    if (
      typeof r != "object" ||
      typeof r.beta != "bigint" ||
      typeof r.splitScalar != "function"
    )
      throw new Error(
        "invalid endomorphism, expected beta: bigint and splitScalar: function",
      );
  }
  return Object.freeze({ ...e });
}
const yr = BigInt(0),
  Ge = BigInt(1),
  Lt = BigInt(2),
  li = BigInt(3),
  po = BigInt(4);
function yo(t) {
  const e = bl(t),
    { Fp: r } = e,
    n = bn(e.n, e.nBitLength),
    i =
      e.toBytes ||
      (($, C, W) => {
        const z = C.toAffine();
        return Ke(Uint8Array.from([4]), r.toBytes(z.x), r.toBytes(z.y));
      }),
    o =
      e.fromBytes ||
      (($) => {
        const C = $.subarray(1),
          W = r.fromBytes(C.subarray(0, r.BYTES)),
          z = r.fromBytes(C.subarray(r.BYTES, 2 * r.BYTES));
        return { x: W, y: z };
      });
  function l($) {
    const { a: C, b: W } = e,
      z = r.sqr($),
      q = r.mul(z, $);
    return r.add(r.add(q, r.mul($, C)), W);
  }
  if (!r.eql(r.sqr(e.Gy), l(e.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a($) {
    return fc($, Ge, e.n);
  }
  function p($) {
    const {
      allowedPrivateKeyLengths: C,
      nByteLength: W,
      wrapPrivateKey: z,
      n: q,
    } = e;
    if (C && typeof $ != "bigint") {
      if ((Ti($) && ($ = xr($)), typeof $ != "string" || !C.includes($.length)))
        throw new Error("invalid private key");
      $ = $.padStart(W * 2, "0");
    }
    let re;
    try {
      re = typeof $ == "bigint" ? $ : xt(at("private key", $, W));
    } catch {
      throw new Error(
        "invalid private key, expected hex or " + W + " bytes, got " + typeof $,
      );
    }
    return z && (re = $e(re, q)), tr("private key", re, Ge, q), re;
  }
  function g($) {
    if (!($ instanceof I)) throw new Error("ProjectivePoint expected");
  }
  const E = cn(($, C) => {
      const { px: W, py: z, pz: q } = $;
      if (r.eql(q, r.ONE)) return { x: W, y: z };
      const re = $.is0();
      C == null && (C = re ? r.ONE : r.inv(q));
      const P = r.mul(W, C),
        Z = r.mul(z, C),
        Y = r.mul(q, C);
      if (re) return { x: r.ZERO, y: r.ZERO };
      if (!r.eql(Y, r.ONE)) throw new Error("invZ was invalid");
      return { x: P, y: Z };
    }),
    S = cn(($) => {
      if ($.is0()) {
        if (e.allowInfinityPoint && !r.is0($.py)) return;
        throw new Error("bad point: ZERO");
      }
      const { x: C, y: W } = $.toAffine();
      if (!r.isValid(C) || !r.isValid(W))
        throw new Error("bad point: x or y not FE");
      const z = r.sqr(W),
        q = l(C);
      if (!r.eql(z, q)) throw new Error("bad point: equation left != right");
      if (!$.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return !0;
    });
  class I {
    constructor(C, W, z) {
      if (
        ((this.px = C),
        (this.py = W),
        (this.pz = z),
        C == null || !r.isValid(C))
      )
        throw new Error("x required");
      if (W == null || !r.isValid(W)) throw new Error("y required");
      if (z == null || !r.isValid(z)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(C) {
      const { x: W, y: z } = C || {};
      if (!C || !r.isValid(W) || !r.isValid(z))
        throw new Error("invalid affine point");
      if (C instanceof I) throw new Error("projective point not allowed");
      const q = (re) => r.eql(re, r.ZERO);
      return q(W) && q(z) ? I.ZERO : new I(W, z, r.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(C) {
      const W = r.invertBatch(C.map((z) => z.pz));
      return C.map((z, q) => z.toAffine(W[q])).map(I.fromAffine);
    }
    static fromHex(C) {
      const W = I.fromAffine(o(at("pointHex", C)));
      return W.assertValidity(), W;
    }
    static fromPrivateKey(C) {
      return I.BASE.multiply(p(C));
    }
    static msm(C, W) {
      return bc(I, n, C, W);
    }
    _setWindowSize(C) {
      w.setWindowSize(this, C);
    }
    assertValidity() {
      S(this);
    }
    hasEvenY() {
      const { y: C } = this.toAffine();
      if (r.isOdd) return !r.isOdd(C);
      throw new Error("Field doesn't support isOdd");
    }
    equals(C) {
      g(C);
      const { px: W, py: z, pz: q } = this,
        { px: re, py: P, pz: Z } = C,
        Y = r.eql(r.mul(W, Z), r.mul(re, q)),
        J = r.eql(r.mul(z, Z), r.mul(P, q));
      return Y && J;
    }
    negate() {
      return new I(this.px, r.neg(this.py), this.pz);
    }
    double() {
      const { a: C, b: W } = e,
        z = r.mul(W, li),
        { px: q, py: re, pz: P } = this;
      let Z = r.ZERO,
        Y = r.ZERO,
        J = r.ZERO,
        Q = r.mul(q, q),
        X = r.mul(re, re),
        he = r.mul(P, P),
        le = r.mul(q, re);
      return (
        (le = r.add(le, le)),
        (J = r.mul(q, P)),
        (J = r.add(J, J)),
        (Z = r.mul(C, J)),
        (Y = r.mul(z, he)),
        (Y = r.add(Z, Y)),
        (Z = r.sub(X, Y)),
        (Y = r.add(X, Y)),
        (Y = r.mul(Z, Y)),
        (Z = r.mul(le, Z)),
        (J = r.mul(z, J)),
        (he = r.mul(C, he)),
        (le = r.sub(Q, he)),
        (le = r.mul(C, le)),
        (le = r.add(le, J)),
        (J = r.add(Q, Q)),
        (Q = r.add(J, Q)),
        (Q = r.add(Q, he)),
        (Q = r.mul(Q, le)),
        (Y = r.add(Y, Q)),
        (he = r.mul(re, P)),
        (he = r.add(he, he)),
        (Q = r.mul(he, le)),
        (Z = r.sub(Z, Q)),
        (J = r.mul(he, X)),
        (J = r.add(J, J)),
        (J = r.add(J, J)),
        new I(Z, Y, J)
      );
    }
    add(C) {
      g(C);
      const { px: W, py: z, pz: q } = this,
        { px: re, py: P, pz: Z } = C;
      let Y = r.ZERO,
        J = r.ZERO,
        Q = r.ZERO;
      const X = e.a,
        he = r.mul(e.b, li);
      let le = r.mul(W, re),
        N = r.mul(z, P),
        U = r.mul(q, Z),
        L = r.add(W, z),
        j = r.add(re, P);
      (L = r.mul(L, j)),
        (j = r.add(le, N)),
        (L = r.sub(L, j)),
        (j = r.add(W, q));
      let G = r.add(re, Z);
      return (
        (j = r.mul(j, G)),
        (G = r.add(le, U)),
        (j = r.sub(j, G)),
        (G = r.add(z, q)),
        (Y = r.add(P, Z)),
        (G = r.mul(G, Y)),
        (Y = r.add(N, U)),
        (G = r.sub(G, Y)),
        (Q = r.mul(X, j)),
        (Y = r.mul(he, U)),
        (Q = r.add(Y, Q)),
        (Y = r.sub(N, Q)),
        (Q = r.add(N, Q)),
        (J = r.mul(Y, Q)),
        (N = r.add(le, le)),
        (N = r.add(N, le)),
        (U = r.mul(X, U)),
        (j = r.mul(he, j)),
        (N = r.add(N, U)),
        (U = r.sub(le, U)),
        (U = r.mul(X, U)),
        (j = r.add(j, U)),
        (le = r.mul(N, j)),
        (J = r.add(J, le)),
        (le = r.mul(G, j)),
        (Y = r.mul(L, Y)),
        (Y = r.sub(Y, le)),
        (le = r.mul(L, N)),
        (Q = r.mul(G, Q)),
        (Q = r.add(Q, le)),
        new I(Y, J, Q)
      );
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(I.ZERO);
    }
    wNAF(C) {
      return w.wNAFCached(this, C, I.normalizeZ);
    }
    multiplyUnsafe(C) {
      const { endo: W, n: z } = e;
      tr("scalar", C, yr, z);
      const q = I.ZERO;
      if (C === yr) return q;
      if (this.is0() || C === Ge) return this;
      if (!W || w.hasPrecomputes(this))
        return w.wNAFCachedUnsafe(this, C, I.normalizeZ);
      let { k1neg: re, k1: P, k2neg: Z, k2: Y } = W.splitScalar(C),
        J = q,
        Q = q,
        X = this;
      for (; P > yr || Y > yr; )
        P & Ge && (J = J.add(X)),
          Y & Ge && (Q = Q.add(X)),
          (X = X.double()),
          (P >>= Ge),
          (Y >>= Ge);
      return (
        re && (J = J.negate()),
        Z && (Q = Q.negate()),
        (Q = new I(r.mul(Q.px, W.beta), Q.py, Q.pz)),
        J.add(Q)
      );
    }
    multiply(C) {
      const { endo: W, n: z } = e;
      tr("scalar", C, Ge, z);
      let q, re;
      if (W) {
        const { k1neg: P, k1: Z, k2neg: Y, k2: J } = W.splitScalar(C);
        let { p: Q, f: X } = this.wNAF(Z),
          { p: he, f: le } = this.wNAF(J);
        (Q = w.constTimeNegate(P, Q)),
          (he = w.constTimeNegate(Y, he)),
          (he = new I(r.mul(he.px, W.beta), he.py, he.pz)),
          (q = Q.add(he)),
          (re = X.add(le));
      } else {
        const { p: P, f: Z } = this.wNAF(C);
        (q = P), (re = Z);
      }
      return I.normalizeZ([q, re])[0];
    }
    multiplyAndAddUnsafe(C, W, z) {
      const q = I.BASE,
        re = (Z, Y) =>
          Y === yr || Y === Ge || !Z.equals(q)
            ? Z.multiplyUnsafe(Y)
            : Z.multiply(Y),
        P = re(this, W).add(re(C, z));
      return P.is0() ? void 0 : P;
    }
    toAffine(C) {
      return E(this, C);
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: W } = e;
      if (C === Ge) return !0;
      if (W) return W(I, this);
      throw new Error(
        "isTorsionFree() has not been declared for the elliptic curve",
      );
    }
    clearCofactor() {
      const { h: C, clearCofactor: W } = e;
      return C === Ge ? this : W ? W(I, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(C = !0) {
      return tn("isCompressed", C), this.assertValidity(), i(I, this, C);
    }
    toHex(C = !0) {
      return tn("isCompressed", C), xr(this.toRawBytes(C));
    }
  }
  (I.BASE = new I(e.Gx, e.Gy, r.ONE)), (I.ZERO = new I(r.ZERO, r.ONE, r.ZERO));
  const A = e.nBitLength,
    w = mc(I, e.endo ? Math.ceil(A / 2) : A);
  return {
    CURVE: e,
    ProjectivePoint: I,
    normPrivateKeyToScalar: p,
    weierstrassEquation: l,
    isWithinCurveOrder: a,
  };
}
function _l(t, e) {
  const r = t.ORDER;
  let n = yr;
  for (let w = r - Ge; w % Lt === yr; w /= Lt) n += Ge;
  const i = n,
    o = Lt << (i - Ge - Ge),
    l = o * Lt,
    a = (r - Ge) / l,
    p = (a - Ge) / Lt,
    g = l - Ge,
    E = o,
    S = t.pow(e, a),
    I = t.pow(e, (a + Ge) / Lt);
  let A = (w, $) => {
    let C = S,
      W = t.pow($, g),
      z = t.sqr(W);
    z = t.mul(z, $);
    let q = t.mul(w, z);
    (q = t.pow(q, p)), (q = t.mul(q, W)), (W = t.mul(q, $)), (z = t.mul(q, w));
    let re = t.mul(z, W);
    q = t.pow(re, E);
    let P = t.eql(q, t.ONE);
    (W = t.mul(z, I)),
      (q = t.mul(re, C)),
      (z = t.cmov(W, z, P)),
      (re = t.cmov(q, re, P));
    for (let Z = i; Z > Ge; Z--) {
      let Y = Z - Lt;
      Y = Lt << (Y - Ge);
      let J = t.pow(re, Y);
      const Q = t.eql(J, t.ONE);
      (W = t.mul(z, C)),
        (C = t.mul(C, C)),
        (J = t.mul(re, C)),
        (z = t.cmov(W, z, Q)),
        (re = t.cmov(J, re, Q));
    }
    return { isValid: P, value: z };
  };
  if (t.ORDER % po === li) {
    const w = (t.ORDER - li) / po,
      $ = t.sqrt(t.neg(e));
    A = (C, W) => {
      let z = t.sqr(W);
      const q = t.mul(C, W);
      z = t.mul(z, q);
      let re = t.pow(z, w);
      re = t.mul(re, q);
      const P = t.mul(re, $),
        Z = t.mul(t.sqr(re), W),
        Y = t.eql(Z, C);
      let J = t.cmov(P, re, Y);
      return { isValid: Y, value: J };
    };
  }
  return A;
}
function xc(t, e) {
  if ((lc(t), !t.isValid(e.A) || !t.isValid(e.B) || !t.isValid(e.Z)))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const r = _l(t, e.Z);
  if (!t.isOdd) throw new Error("Fp.isOdd is not implemented!");
  return (n) => {
    let i, o, l, a, p, g, E, S;
    (i = t.sqr(n)),
      (i = t.mul(i, e.Z)),
      (o = t.sqr(i)),
      (o = t.add(o, i)),
      (l = t.add(o, t.ONE)),
      (l = t.mul(l, e.B)),
      (a = t.cmov(e.Z, t.neg(o), !t.eql(o, t.ZERO))),
      (a = t.mul(a, e.A)),
      (o = t.sqr(l)),
      (g = t.sqr(a)),
      (p = t.mul(g, e.A)),
      (o = t.add(o, p)),
      (o = t.mul(o, l)),
      (g = t.mul(g, a)),
      (p = t.mul(g, e.B)),
      (o = t.add(o, p)),
      (E = t.mul(i, l));
    const { isValid: I, value: A } = r(o, g);
    (S = t.mul(i, n)),
      (S = t.mul(S, A)),
      (E = t.cmov(E, l, I)),
      (S = t.cmov(S, A, I));
    const w = t.isOdd(n) === t.isOdd(S);
    return (S = t.cmov(t.neg(S), S, w)), (E = t.div(E, a)), { x: E, y: S };
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const xl =
    BigInt(0),
  Tn = BigInt(1),
  wo = BigInt(2),
  Pr = BigInt(3);
function El(t) {
  const e = [];
  for (; t > Tn; t >>= Tn)
    (t & Tn) === xl
      ? e.unshift(0)
      : (t & Pr) === Pr
        ? (e.unshift(-1), (t += Tn))
        : e.unshift(1);
  return e;
}
function vl(t) {
  const { Fp: e, Fr: r, Fp2: n, Fp6: i, Fp12: o } = t.fields,
    l = t.params.xNegative,
    a = t.params.twistType,
    p = yo({ n: r.ORDER, ...t.G1 }),
    g = Object.assign(
      p,
      lo(p.ProjectivePoint, t.G1.mapToCurve, {
        ...t.htfDefaults,
        ...t.G1.htfDefaults,
      }),
    ),
    E = yo({ n: r.ORDER, ...t.G2 }),
    S = Object.assign(
      E,
      lo(E.ProjectivePoint, t.G2.mapToCurve, {
        ...t.htfDefaults,
        ...t.G2.htfDefaults,
      }),
    );
  let I;
  if (a === "multiplicative")
    I = (ee, m, se, ue, de, te) =>
      o.mul014(ue, ee, n.mul(m, de), n.mul(se, te));
  else if (a === "divisive")
    I = (ee, m, se, ue, de, te) =>
      o.mul034(ue, n.mul(se, te), n.mul(m, de), ee);
  else throw new Error("bls: unknown twist type");
  const A = n.div(n.ONE, n.mul(n.ONE, wo));
  function w(ee, m, se, ue) {
    const de = n.sqr(se),
      te = n.sqr(ue),
      ae = n.mulByB(n.mul(te, Pr)),
      b = n.mul(ae, Pr),
      x = n.sub(n.sub(n.sqr(n.add(se, ue)), te), de),
      B = n.sub(ae, de),
      k = n.mul(n.sqr(m), Pr),
      O = n.neg(x);
    return (
      ee.push([B, k, O]),
      (m = n.mul(n.mul(n.mul(n.sub(de, b), m), se), A)),
      (se = n.sub(n.sqr(n.mul(n.add(de, b), A)), n.mul(n.sqr(ae), Pr))),
      (ue = n.mul(de, x)),
      { Rx: m, Ry: se, Rz: ue }
    );
  }
  function $(ee, m, se, ue, de, te) {
    const ae = n.sub(se, n.mul(te, ue)),
      b = n.sub(m, n.mul(de, ue)),
      x = n.sub(n.mul(ae, de), n.mul(b, te)),
      B = n.neg(ae),
      k = b;
    ee.push([x, B, k]);
    const O = n.sqr(b),
      M = n.mul(O, b),
      h = n.mul(O, m),
      s = n.add(n.sub(M, n.mul(h, wo)), n.mul(n.sqr(ae), ue));
    return (
      (m = n.mul(b, s)),
      (se = n.sub(n.mul(n.sub(h, s), ae), n.mul(M, se))),
      (ue = n.mul(ue, M)),
      { Rx: m, Ry: se, Rz: ue }
    );
  }
  const C = El(t.params.ateLoopSize),
    W = cn((ee) => {
      const m = ee,
        { x: se, y: ue } = m.toAffine(),
        de = se,
        te = ue,
        ae = n.neg(ue);
      let b = de,
        x = te,
        B = n.ONE;
      const k = [];
      for (const O of C) {
        const M = [];
        ({ Rx: b, Ry: x, Rz: B } = w(M, b, x, B)),
          O &&
            ({ Rx: b, Ry: x, Rz: B } = $(M, b, x, B, de, O === -1 ? ae : te)),
          k.push(M);
      }
      if (t.postPrecompute) {
        const O = k[k.length - 1];
        t.postPrecompute(b, x, B, de, te, $.bind(null, O));
      }
      return k;
    });
  function z(ee, m = !1) {
    let se = o.ONE;
    if (ee.length) {
      const ue = ee[0][0].length;
      for (let de = 0; de < ue; de++) {
        se = o.sqr(se);
        for (const [te, ae, b] of ee)
          for (const [x, B, k] of te[de]) se = I(x, B, k, se, ae, b);
      }
    }
    return l && (se = o.conjugate(se)), m ? o.finalExponentiate(se) : se;
  }
  function q(ee, m = !0) {
    const se = [];
    g.ProjectivePoint.normalizeZ(ee.map(({ g1: ue }) => ue)),
      S.ProjectivePoint.normalizeZ(ee.map(({ g2: ue }) => ue));
    for (const { g1: ue, g2: de } of ee) {
      if (
        ue.equals(g.ProjectivePoint.ZERO) ||
        de.equals(S.ProjectivePoint.ZERO)
      )
        throw new Error("pairing is not available for ZERO point");
      ue.assertValidity(), de.assertValidity();
      const te = ue.toAffine();
      se.push([W(de), te.x, te.y]);
    }
    return z(se, m);
  }
  function re(ee, m, se = !0) {
    return q([{ g1: ee, g2: m }], se);
  }
  const P = {
      randomPrivateKey: () => {
        const ee = pc(r.ORDER);
        return hl(t.randomBytes(ee), r.ORDER);
      },
      calcPairingPrecomputes: W,
    },
    { ShortSignature: Z } = t.G1,
    { Signature: Y } = t.G2;
  function J(ee) {
    return ee instanceof g.ProjectivePoint ? ee : g.ProjectivePoint.fromHex(ee);
  }
  function Q(ee, m) {
    return ee instanceof g.ProjectivePoint
      ? ee
      : g.hashToCurve(at("point", ee), m);
  }
  function X(ee) {
    return ee instanceof S.ProjectivePoint ? ee : Y.fromHex(ee);
  }
  function he(ee, m) {
    return ee instanceof S.ProjectivePoint
      ? ee
      : S.hashToCurve(at("point", ee), m);
  }
  function le(ee) {
    return g.ProjectivePoint.fromPrivateKey(ee).toRawBytes(!0);
  }
  function N(ee) {
    return S.ProjectivePoint.fromPrivateKey(ee).toRawBytes(!0);
  }
  function U(ee, m, se) {
    const ue = he(ee, se);
    ue.assertValidity();
    const de = ue.multiply(g.normPrivateKeyToScalar(m));
    return ee instanceof S.ProjectivePoint ? de : Y.toRawBytes(de);
  }
  function L(ee, m, se) {
    const ue = Q(ee, se);
    ue.assertValidity();
    const de = ue.multiply(g.normPrivateKeyToScalar(m));
    return ee instanceof g.ProjectivePoint ? de : Z.toRawBytes(de);
  }
  function j(ee, m, se, ue) {
    const de = J(se),
      te = he(m, ue),
      ae = g.ProjectivePoint.BASE,
      b = X(ee),
      x = q([
        { g1: de.negate(), g2: te },
        { g1: ae, g2: b },
      ]);
    return o.eql(x, o.ONE);
  }
  function G(ee, m, se, ue) {
    const de = X(se),
      te = Q(m, ue),
      ae = S.ProjectivePoint.BASE,
      b = J(ee),
      x = q([
        { g1: te, g2: de },
        { g1: b, g2: ae.negate() },
      ]);
    return o.eql(x, o.ONE);
  }
  function D(ee) {
    if (!Array.isArray(ee) || ee.length === 0)
      throw new Error("expected non-empty array");
  }
  function ie(ee) {
    D(ee);
    const se = ee.map(J).reduce((ue, de) => ue.add(de), g.ProjectivePoint.ZERO);
    return ee[0] instanceof g.ProjectivePoint
      ? (se.assertValidity(), se)
      : se.toRawBytes(!0);
  }
  function ge(ee) {
    D(ee);
    const se = ee.map(X).reduce((ue, de) => ue.add(de), S.ProjectivePoint.ZERO);
    return ee[0] instanceof S.ProjectivePoint
      ? (se.assertValidity(), se)
      : Y.toRawBytes(se);
  }
  function oe(ee) {
    D(ee);
    const se = ee.map(J).reduce((ue, de) => ue.add(de), g.ProjectivePoint.ZERO);
    return ee[0] instanceof g.ProjectivePoint
      ? (se.assertValidity(), se)
      : Z.toRawBytes(se);
  }
  function fe(ee, m, se, ue) {
    if ((D(m), se.length !== m.length))
      throw new Error("amount of public keys and messages should be equal");
    const de = X(ee),
      te = m.map((B) => he(B, ue)),
      ae = se.map(J),
      b = new Map();
    for (let B = 0; B < ae.length; B++) {
      const k = ae[B],
        O = te[B];
      let M = b.get(O);
      M === void 0 && ((M = []), b.set(O, M)), M.push(k);
    }
    const x = [];
    try {
      for (const [B, k] of b) {
        const O = k.reduce((M, h) => M.add(h));
        x.push({ g1: O, g2: B });
      }
      return (
        x.push({ g1: g.ProjectivePoint.BASE.negate(), g2: de }),
        o.eql(q(x), o.ONE)
      );
    } catch {
      return !1;
    }
  }
  return (
    g.ProjectivePoint.BASE._setWindowSize(4),
    {
      getPublicKey: le,
      getPublicKeyForShortSignatures: N,
      sign: U,
      signShortSignature: L,
      verify: j,
      verifyBatch: fe,
      verifyShortSignature: G,
      aggregatePublicKeys: ie,
      aggregateSignatures: ge,
      aggregateShortSignatures: oe,
      millerLoopBatch: z,
      pairing: re,
      pairingBatch: q,
      G1: g,
      G2: S,
      Signature: Y,
      ShortSignature: Z,
      fields: { Fr: r, Fp: e, Fp2: n, Fp6: i, Fp12: o },
      params: {
        ateLoopSize: t.params.ateLoopSize,
        r: t.params.r,
        G1b: t.G1.b,
        G2b: t.G2.b,
      },
      utils: P,
    }
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Al =
    BigInt(0),
  kr = BigInt(1),
  Ct = BigInt(2),
  go = BigInt(3);
function Wi(t, e, r, n, i = 1, o) {
  const l = BigInt(o === void 0 ? n : o),
    a = r ** BigInt(n),
    p = [];
  for (let g = 0; g < i; g++) {
    const E = BigInt(g + 1),
      S = [];
    for (let I = 0, A = kr; I < n; I++) {
      const w = ((E * A - E) / l) % a;
      S.push(t.pow(e, w)), (A *= r);
    }
    p.push(S);
  }
  return p;
}
function Bl(t, e, r) {
  const n = e.pow(r, (t.ORDER - kr) / go),
    i = e.pow(r, (t.ORDER - kr) / Ct);
  function o(I, A) {
    const w = e.mul(e.frobeniusMap(I, 1), n),
      $ = e.mul(e.frobeniusMap(A, 1), i);
    return [w, $];
  }
  const l = e.pow(r, (t.ORDER ** Ct - kr) / go),
    a = e.pow(r, (t.ORDER ** Ct - kr) / Ct);
  if (!e.eql(a, e.neg(e.ONE))) throw new Error("psiFrobenius: PSI2_Y!==-1");
  function p(I, A) {
    return [e.mul(I, l), e.neg(A)];
  }
  const g = (I) => (A, w) => {
      const $ = w.toAffine(),
        C = I($.x, $.y);
      return A.fromAffine({ x: C[0], y: C[1] });
    },
    E = g(o),
    S = g(p);
  return {
    psi: o,
    psi2: p,
    G2psi: E,
    G2psi2: S,
    PSI_X: n,
    PSI_Y: i,
    PSI2_X: l,
    PSI2_Y: a,
  };
}
function Sl(t) {
  const { ORDER: e } = t,
    r = bn(e),
    n = r.create(t.NONRESIDUE || BigInt(-1)),
    i = ll(e),
    o = r.div(r.ONE, Ct),
    l = Wi(r, n, r.ORDER, 2)[0],
    a = ({ c0: N, c1: U }, { c0: L, c1: j }) => ({
      c0: r.add(N, L),
      c1: r.add(U, j),
    }),
    p = ({ c0: N, c1: U }, { c0: L, c1: j }) => ({
      c0: r.sub(N, L),
      c1: r.sub(U, j),
    }),
    g = ({ c0: N, c1: U }, L) => {
      if (typeof L == "bigint") return { c0: r.mul(N, L), c1: r.mul(U, L) };
      const { c0: j, c1: G } = L;
      let D = r.mul(N, j),
        ie = r.mul(U, G);
      const ge = r.sub(D, ie),
        oe = r.sub(r.mul(r.add(N, U), r.add(j, G)), r.add(D, ie));
      return { c0: ge, c1: oe };
    },
    E = ({ c0: N, c1: U }) => {
      const L = r.add(N, U),
        j = r.sub(N, U),
        G = r.add(N, N);
      return { c0: r.mul(L, j), c1: r.mul(G, U) };
    },
    S = (N) => {
      if (N.length !== 2) throw new Error("invalid tuple");
      const U = N.map((L) => r.create(L));
      return { c0: U[0], c1: U[1] };
    },
    I = e * e,
    A = S(t.FP2_NONRESIDUE),
    w = {
      ORDER: I,
      isLE: r.isLE,
      NONRESIDUE: A,
      BITS: nn(I),
      BYTES: Math.ceil(nn(I) / 8),
      MASK: Cn(nn(I)),
      ZERO: { c0: r.ZERO, c1: r.ZERO },
      ONE: { c0: r.ONE, c1: r.ZERO },
      create: (N) => N,
      isValid: ({ c0: N, c1: U }) =>
        typeof N == "bigint" && typeof U == "bigint",
      is0: ({ c0: N, c1: U }) => r.is0(N) && r.is0(U),
      eql: ({ c0: N, c1: U }, { c0: L, c1: j }) => r.eql(N, L) && r.eql(U, j),
      neg: ({ c0: N, c1: U }) => ({ c0: r.neg(N), c1: r.neg(U) }),
      pow: (N, U) => $n(w, N, U),
      invertBatch: (N) => qn(w, N),
      add: a,
      sub: p,
      mul: g,
      sqr: E,
      addN: a,
      subN: p,
      mulN: g,
      sqrN: E,
      div: (N, U) =>
        w.mul(N, typeof U == "bigint" ? r.inv(r.create(U)) : w.inv(U)),
      inv: ({ c0: N, c1: U }) => {
        const L = r.inv(r.create(N * N + U * U));
        return { c0: r.mul(L, r.create(N)), c1: r.mul(L, r.create(-U)) };
      },
      sqrt: (N) => {
        if (t.Fp2sqrt) return t.Fp2sqrt(N);
        const { c0: U, c1: L } = N;
        if (r.is0(L))
          return r.eql(i(r, U), r.ONE)
            ? w.create({ c0: r.sqrt(U), c1: r.ZERO })
            : w.create({ c0: r.ZERO, c1: r.sqrt(r.div(U, n)) });
        const j = r.sqrt(r.sub(r.sqr(U), r.mul(r.sqr(L), n)));
        let G = r.mul(r.add(j, U), o);
        const D = i(r, G);
        !r.is0(D) && !r.eql(D, r.ONE) && (G = r.sub(G, j));
        const ie = r.sqrt(G),
          ge = w.create({ c0: ie, c1: r.div(r.mul(L, o), ie) });
        if (!w.eql(w.sqr(ge), N)) throw new Error("Cannot find square root");
        const oe = ge,
          fe = w.neg(oe),
          { re: ee, im: m } = w.reim(oe),
          { re: se, im: ue } = w.reim(fe);
        return m > ue || (m === ue && ee > se) ? oe : fe;
      },
      isOdd: (N) => {
        const { re: U, im: L } = w.reim(N),
          j = U % Ct,
          G = U === Al,
          D = L % Ct;
        return BigInt(j || (G && D)) == kr;
      },
      fromBytes(N) {
        if (N.length !== w.BYTES)
          throw new Error("fromBytes invalid length=" + N.length);
        return {
          c0: r.fromBytes(N.subarray(0, r.BYTES)),
          c1: r.fromBytes(N.subarray(r.BYTES)),
        };
      },
      toBytes: ({ c0: N, c1: U }) => Ke(r.toBytes(N), r.toBytes(U)),
      cmov: ({ c0: N, c1: U }, { c0: L, c1: j }, G) => ({
        c0: r.cmov(N, L, G),
        c1: r.cmov(U, j, G),
      }),
      reim: ({ c0: N, c1: U }) => ({ re: N, im: U }),
      mulByNonresidue: ({ c0: N, c1: U }) => w.mul({ c0: N, c1: U }, A),
      mulByB: t.Fp2mulByB,
      fromBigTuple: S,
      frobeniusMap: ({ c0: N, c1: U }, L) => ({
        c0: N,
        c1: r.mul(U, l[L % 2]),
      }),
    },
    $ = ({ c0: N, c1: U, c2: L }, { c0: j, c1: G, c2: D }) => ({
      c0: w.add(N, j),
      c1: w.add(U, G),
      c2: w.add(L, D),
    }),
    C = ({ c0: N, c1: U, c2: L }, { c0: j, c1: G, c2: D }) => ({
      c0: w.sub(N, j),
      c1: w.sub(U, G),
      c2: w.sub(L, D),
    }),
    W = ({ c0: N, c1: U, c2: L }, j) => {
      if (typeof j == "bigint")
        return { c0: w.mul(N, j), c1: w.mul(U, j), c2: w.mul(L, j) };
      const { c0: G, c1: D, c2: ie } = j,
        ge = w.mul(N, G),
        oe = w.mul(U, D),
        fe = w.mul(L, ie);
      return {
        c0: w.add(
          ge,
          w.mulByNonresidue(
            w.sub(w.mul(w.add(U, L), w.add(D, ie)), w.add(oe, fe)),
          ),
        ),
        c1: w.add(
          w.sub(w.mul(w.add(N, U), w.add(G, D)), w.add(ge, oe)),
          w.mulByNonresidue(fe),
        ),
        c2: w.sub(w.add(oe, w.mul(w.add(N, L), w.add(G, ie))), w.add(ge, fe)),
      };
    },
    z = ({ c0: N, c1: U, c2: L }) => {
      let j = w.sqr(N),
        G = w.mul(w.mul(N, U), Ct),
        D = w.mul(w.mul(U, L), Ct),
        ie = w.sqr(L);
      return {
        c0: w.add(w.mulByNonresidue(D), j),
        c1: w.add(w.mulByNonresidue(ie), G),
        c2: w.sub(
          w.sub(w.add(w.add(G, w.sqr(w.add(w.sub(N, U), L))), D), j),
          ie,
        ),
      };
    },
    [q, re] = Wi(w, A, r.ORDER, 6, 2, 3),
    P = {
      ORDER: w.ORDER,
      isLE: w.isLE,
      BITS: 3 * w.BITS,
      BYTES: 3 * w.BYTES,
      MASK: Cn(3 * w.BITS),
      ZERO: { c0: w.ZERO, c1: w.ZERO, c2: w.ZERO },
      ONE: { c0: w.ONE, c1: w.ZERO, c2: w.ZERO },
      create: (N) => N,
      isValid: ({ c0: N, c1: U, c2: L }) =>
        w.isValid(N) && w.isValid(U) && w.isValid(L),
      is0: ({ c0: N, c1: U, c2: L }) => w.is0(N) && w.is0(U) && w.is0(L),
      neg: ({ c0: N, c1: U, c2: L }) => ({
        c0: w.neg(N),
        c1: w.neg(U),
        c2: w.neg(L),
      }),
      eql: ({ c0: N, c1: U, c2: L }, { c0: j, c1: G, c2: D }) =>
        w.eql(N, j) && w.eql(U, G) && w.eql(L, D),
      sqrt: oo,
      div: (N, U) =>
        P.mul(N, typeof U == "bigint" ? r.inv(r.create(U)) : P.inv(U)),
      pow: (N, U) => $n(P, N, U),
      invertBatch: (N) => qn(P, N),
      add: $,
      sub: C,
      mul: W,
      sqr: z,
      addN: $,
      subN: C,
      mulN: W,
      sqrN: z,
      inv: ({ c0: N, c1: U, c2: L }) => {
        let j = w.sub(w.sqr(N), w.mulByNonresidue(w.mul(L, U))),
          G = w.sub(w.mulByNonresidue(w.sqr(L)), w.mul(N, U)),
          D = w.sub(w.sqr(U), w.mul(N, L)),
          ie = w.inv(
            w.add(
              w.mulByNonresidue(w.add(w.mul(L, G), w.mul(U, D))),
              w.mul(N, j),
            ),
          );
        return { c0: w.mul(ie, j), c1: w.mul(ie, G), c2: w.mul(ie, D) };
      },
      fromBytes: (N) => {
        if (N.length !== P.BYTES)
          throw new Error("fromBytes invalid length=" + N.length);
        return {
          c0: w.fromBytes(N.subarray(0, w.BYTES)),
          c1: w.fromBytes(N.subarray(w.BYTES, 2 * w.BYTES)),
          c2: w.fromBytes(N.subarray(2 * w.BYTES)),
        };
      },
      toBytes: ({ c0: N, c1: U, c2: L }) =>
        Ke(w.toBytes(N), w.toBytes(U), w.toBytes(L)),
      cmov: ({ c0: N, c1: U, c2: L }, { c0: j, c1: G, c2: D }, ie) => ({
        c0: w.cmov(N, j, ie),
        c1: w.cmov(U, G, ie),
        c2: w.cmov(L, D, ie),
      }),
      fromBigSix: (N) => {
        if (!Array.isArray(N) || N.length !== 6)
          throw new Error("invalid Fp6 usage");
        return {
          c0: w.fromBigTuple(N.slice(0, 2)),
          c1: w.fromBigTuple(N.slice(2, 4)),
          c2: w.fromBigTuple(N.slice(4, 6)),
        };
      },
      frobeniusMap: ({ c0: N, c1: U, c2: L }, j) => ({
        c0: w.frobeniusMap(N, j),
        c1: w.mul(w.frobeniusMap(U, j), q[j % 6]),
        c2: w.mul(w.frobeniusMap(L, j), re[j % 6]),
      }),
      mulByFp2: ({ c0: N, c1: U, c2: L }, j) => ({
        c0: w.mul(N, j),
        c1: w.mul(U, j),
        c2: w.mul(L, j),
      }),
      mulByNonresidue: ({ c0: N, c1: U, c2: L }) => ({
        c0: w.mulByNonresidue(L),
        c1: N,
        c2: U,
      }),
      mul1: ({ c0: N, c1: U, c2: L }, j) => ({
        c0: w.mulByNonresidue(w.mul(L, j)),
        c1: w.mul(N, j),
        c2: w.mul(U, j),
      }),
      mul01({ c0: N, c1: U, c2: L }, j, G) {
        let D = w.mul(N, j),
          ie = w.mul(U, G);
        return {
          c0: w.add(w.mulByNonresidue(w.sub(w.mul(w.add(U, L), G), ie)), D),
          c1: w.sub(w.sub(w.mul(w.add(j, G), w.add(N, U)), D), ie),
          c2: w.add(w.sub(w.mul(w.add(N, L), j), D), ie),
        };
      },
    },
    Z = Wi(w, A, r.ORDER, 12, 1, 6)[0],
    Y = ({ c0: N, c1: U }, { c0: L, c1: j }) => ({
      c0: P.add(N, L),
      c1: P.add(U, j),
    }),
    J = ({ c0: N, c1: U }, { c0: L, c1: j }) => ({
      c0: P.sub(N, L),
      c1: P.sub(U, j),
    }),
    Q = ({ c0: N, c1: U }, L) => {
      if (typeof L == "bigint") return { c0: P.mul(N, L), c1: P.mul(U, L) };
      let { c0: j, c1: G } = L,
        D = P.mul(N, j),
        ie = P.mul(U, G);
      return {
        c0: P.add(D, P.mulByNonresidue(ie)),
        c1: P.sub(P.mul(P.add(N, U), P.add(j, G)), P.add(D, ie)),
      };
    },
    X = ({ c0: N, c1: U }) => {
      let L = P.mul(N, U);
      return {
        c0: P.sub(
          P.sub(P.mul(P.add(P.mulByNonresidue(U), N), P.add(N, U)), L),
          P.mulByNonresidue(L),
        ),
        c1: P.add(L, L),
      };
    };
  function he(N, U) {
    const L = w.sqr(N),
      j = w.sqr(U);
    return {
      first: w.add(w.mulByNonresidue(j), L),
      second: w.sub(w.sub(w.sqr(w.add(N, U)), L), j),
    };
  }
  const le = {
    ORDER: w.ORDER,
    isLE: P.isLE,
    BITS: 2 * w.BITS,
    BYTES: 2 * w.BYTES,
    MASK: Cn(2 * w.BITS),
    ZERO: { c0: P.ZERO, c1: P.ZERO },
    ONE: { c0: P.ONE, c1: P.ZERO },
    create: (N) => N,
    isValid: ({ c0: N, c1: U }) => P.isValid(N) && P.isValid(U),
    is0: ({ c0: N, c1: U }) => P.is0(N) && P.is0(U),
    neg: ({ c0: N, c1: U }) => ({ c0: P.neg(N), c1: P.neg(U) }),
    eql: ({ c0: N, c1: U }, { c0: L, c1: j }) => P.eql(N, L) && P.eql(U, j),
    sqrt: oo,
    inv: ({ c0: N, c1: U }) => {
      let L = P.inv(P.sub(P.sqr(N), P.mulByNonresidue(P.sqr(U))));
      return { c0: P.mul(N, L), c1: P.neg(P.mul(U, L)) };
    },
    div: (N, U) =>
      le.mul(N, typeof U == "bigint" ? r.inv(r.create(U)) : le.inv(U)),
    pow: (N, U) => $n(le, N, U),
    invertBatch: (N) => qn(le, N),
    add: Y,
    sub: J,
    mul: Q,
    sqr: X,
    addN: Y,
    subN: J,
    mulN: Q,
    sqrN: X,
    fromBytes: (N) => {
      if (N.length !== le.BYTES)
        throw new Error("fromBytes invalid length=" + N.length);
      return {
        c0: P.fromBytes(N.subarray(0, P.BYTES)),
        c1: P.fromBytes(N.subarray(P.BYTES)),
      };
    },
    toBytes: ({ c0: N, c1: U }) => Ke(P.toBytes(N), P.toBytes(U)),
    cmov: ({ c0: N, c1: U }, { c0: L, c1: j }, G) => ({
      c0: P.cmov(N, L, G),
      c1: P.cmov(U, j, G),
    }),
    fromBigTwelve: (N) => ({
      c0: P.fromBigSix(N.slice(0, 6)),
      c1: P.fromBigSix(N.slice(6, 12)),
    }),
    frobeniusMap(N, U) {
      const { c0: L, c1: j, c2: G } = P.frobeniusMap(N.c1, U),
        D = Z[U % 12];
      return {
        c0: P.frobeniusMap(N.c0, U),
        c1: P.create({ c0: w.mul(L, D), c1: w.mul(j, D), c2: w.mul(G, D) }),
      };
    },
    mulByFp2: ({ c0: N, c1: U }, L) => ({
      c0: P.mulByFp2(N, L),
      c1: P.mulByFp2(U, L),
    }),
    conjugate: ({ c0: N, c1: U }) => ({ c0: N, c1: P.neg(U) }),
    mul014: ({ c0: N, c1: U }, L, j, G) => {
      let D = P.mul01(N, L, j),
        ie = P.mul1(U, G);
      return {
        c0: P.add(P.mulByNonresidue(ie), D),
        c1: P.sub(P.sub(P.mul01(P.add(U, N), L, w.add(j, G)), D), ie),
      };
    },
    mul034: ({ c0: N, c1: U }, L, j, G) => {
      const D = P.create({
          c0: w.mul(N.c0, L),
          c1: w.mul(N.c1, L),
          c2: w.mul(N.c2, L),
        }),
        ie = P.mul01(U, j, G),
        ge = P.mul01(P.add(N, U), w.add(L, j), G);
      return {
        c0: P.add(P.mulByNonresidue(ie), D),
        c1: P.sub(ge, P.add(D, ie)),
      };
    },
    _cyclotomicSquare: t.Fp12cyclotomicSquare,
    _cyclotomicExp: t.Fp12cyclotomicExp,
    finalExponentiate: t.Fp12finalExponentiate,
  };
  return { Fp: r, Fp2: w, Fp6: P, Fp4Square: he, Fp12: le };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ot =
    BigInt(0),
  hi = BigInt(1),
  De = BigInt(2),
  Nn = BigInt(3),
  sn = BigInt(4),
  Jt = BigInt("0xd201000000010000"),
  Tl = nn(Jt),
  {
    Fp: we,
    Fp2: me,
    Fp6: gs,
    Fp4Square: Yi,
    Fp12: Te,
  } = Sl({
    ORDER: BigInt(
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab",
    ),
    FP2_NONRESIDUE: [hi, hi],
    Fp2mulByB: ({ c0: t, c1: e }) => {
      const r = we.mul(t, sn),
        n = we.mul(e, sn);
      return { c0: we.sub(r, n), c1: we.add(r, n) };
    },
    Fp12cyclotomicSquare: ({ c0: t, c1: e }) => {
      const { c0: r, c1: n, c2: i } = t,
        { c0: o, c1: l, c2: a } = e,
        { first: p, second: g } = Yi(r, l),
        { first: E, second: S } = Yi(o, i),
        { first: I, second: A } = Yi(n, a),
        w = me.mulByNonresidue(A);
      return {
        c0: gs.create({
          c0: me.add(me.mul(me.sub(p, r), De), p),
          c1: me.add(me.mul(me.sub(E, n), De), E),
          c2: me.add(me.mul(me.sub(I, i), De), I),
        }),
        c1: gs.create({
          c0: me.add(me.mul(me.add(w, o), De), w),
          c1: me.add(me.mul(me.add(g, l), De), g),
          c2: me.add(me.mul(me.add(S, a), De), S),
        }),
      };
    },
    Fp12cyclotomicExp(t, e) {
      let r = Te.ONE;
      for (let n = Tl - 1; n >= 0; n--)
        (r = Te._cyclotomicSquare(r)), nl(e, n) && (r = Te.mul(r, t));
      return r;
    },
    Fp12finalExponentiate: (t) => {
      const e = Jt,
        r = Te.div(Te.frobeniusMap(t, 6), t),
        n = Te.mul(Te.frobeniusMap(r, 2), r),
        i = Te.conjugate(Te._cyclotomicExp(n, e)),
        o = Te.mul(Te.conjugate(Te._cyclotomicSquare(n)), i),
        l = Te.conjugate(Te._cyclotomicExp(o, e)),
        a = Te.conjugate(Te._cyclotomicExp(l, e)),
        p = Te.mul(
          Te.conjugate(Te._cyclotomicExp(a, e)),
          Te._cyclotomicSquare(i),
        ),
        g = Te.conjugate(Te._cyclotomicExp(p, e)),
        E = Te.frobeniusMap(Te.mul(i, a), 2),
        S = Te.frobeniusMap(Te.mul(l, n), 3),
        I = Te.frobeniusMap(Te.mul(p, Te.conjugate(n)), 1),
        A = Te.mul(Te.mul(g, Te.conjugate(o)), n);
      return Te.mul(Te.mul(Te.mul(E, S), I), A);
    },
  }),
  mo = bn(
    BigInt(
      "0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001",
    ),
  ),
  Nl = yc(
    me,
    [
      [
        [
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
        ],
        [
          "0x0",
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a",
        ],
        [
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
          "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d",
        ],
        [
          "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
          "0x0",
        ],
      ],
      [
        [
          "0x0",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63",
        ],
        [
          "0xc",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f",
        ],
        ["0x1", "0x0"],
      ],
      [
        [
          "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
          "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
        ],
        [
          "0x0",
          "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be",
        ],
        [
          "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
          "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f",
        ],
        [
          "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
          "0x0",
        ],
      ],
      [
        [
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
        ],
        [
          "0x0",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3",
        ],
        [
          "0x12",
          "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99",
        ],
        ["0x1", "0x0"],
      ],
    ].map((t) => t.map((e) => me.fromBigTuple(e.map(BigInt)))),
  ),
  Il = yc(
    we,
    [
      [
        "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
        "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
        "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
        "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
        "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
        "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
        "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
        "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
        "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
        "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
        "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
        "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229",
      ],
      [
        "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
        "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
        "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
        "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
        "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
        "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
        "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
        "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
        "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
        "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
        "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      ],
      [
        "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
        "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
        "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
        "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
        "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
        "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
        "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
        "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
        "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
        "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
        "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
        "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
        "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
        "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
        "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
        "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604",
      ],
      [
        "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
        "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
        "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
        "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
        "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
        "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
        "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
        "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
        "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
        "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
        "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
        "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
        "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
        "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
        "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
        "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      ],
    ].map((t) => t.map((e) => BigInt(e))),
  ),
  Rl = xc(me, {
    A: me.create({ c0: we.create(ot), c1: we.create(BigInt(240)) }),
    B: me.create({ c0: we.create(BigInt(1012)), c1: we.create(BigInt(1012)) }),
    Z: me.create({ c0: we.create(BigInt(-2)), c1: we.create(BigInt(-1)) }),
  }),
  Ol = xc(we, {
    A: we.create(
      BigInt(
        "0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d",
      ),
    ),
    B: we.create(
      BigInt(
        "0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0",
      ),
    ),
    Z: we.create(BigInt(11)),
  }),
  { G2psi: bo, G2psi2: Ul } = Bl(we, me, me.div(me.ONE, me.NONRESIDUE)),
  Zi = Object.freeze({
    DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
    encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
    p: we.ORDER,
    m: 2,
    k: 128,
    expand: "xmd",
    hash: Ss,
  }),
  di = fn(we.toBytes(ot), { infinity: !0, compressed: !0 });
function In(t) {
  t = t.slice();
  const e = t[0] & 224,
    r = !!((e >> 7) & 1),
    n = !!((e >> 6) & 1),
    i = !!((e >> 5) & 1);
  return (t[0] &= 31), { compressed: r, infinity: n, sort: i, value: t };
}
function fn(t, e) {
  if (t[0] & 224) throw new Error("setMask: non-empty mask");
  return (
    e.compressed && (t[0] |= 128),
    e.infinity && (t[0] |= 64),
    e.sort && (t[0] |= 32),
    t
  );
}
function _o(t) {
  t.assertValidity();
  const e = t.equals(ht.G1.ProjectivePoint.ZERO),
    { x: r, y: n } = t.toAffine();
  if (e) return di.slice();
  const i = we.ORDER,
    o = !!((n * De) / i);
  return fn(Qe(r, we.BYTES), { compressed: !0, sort: o });
}
function xo(t) {
  t.assertValidity();
  const e = we.BYTES;
  if (t.equals(ht.G2.ProjectivePoint.ZERO)) return Ke(di, Qe(ot, e));
  const { x: r, y: n } = t.toAffine(),
    { re: i, im: o } = me.reim(r),
    { re: l, im: a } = me.reim(n),
    g = !!(((a > ot ? a * De : l * De) / we.ORDER) & hi),
    E = i;
  return Ke(fn(Qe(o, e), { sort: g, compressed: !0 }), Qe(E, e));
}
const ht = vl({
  fields: { Fp: we, Fp2: me, Fp6: gs, Fp12: Te, Fr: mo },
  G1: {
    Fp: we,
    h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
    Gx: BigInt(
      "0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb",
    ),
    Gy: BigInt(
      "0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1",
    ),
    a: we.ZERO,
    b: sn,
    htfDefaults: {
      ...Zi,
      m: 1,
      DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_",
    },
    wrapPrivateKey: !0,
    allowInfinityPoint: !0,
    isTorsionFree: (t, e) => {
      const r = BigInt(
          "0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe",
        ),
        n = new t(we.mul(e.px, r), e.py, e.pz);
      return e.multiplyUnsafe(Jt).negate().multiplyUnsafe(Jt).equals(n);
    },
    clearCofactor: (t, e) => e.multiplyUnsafe(Jt).add(e),
    mapToCurve: (t) => {
      const { x: e, y: r } = Ol(we.create(t[0]));
      return Il(e, r);
    },
    fromBytes: (t) => {
      const { compressed: e, infinity: r, sort: n, value: i } = In(t);
      if (i.length === 48 && e) {
        const o = we.ORDER,
          l = xt(i),
          a = we.create(l & we.MASK);
        if (r) {
          if (a !== ot)
            throw new Error("G1: non-empty compressed point at infinity");
          return { x: ot, y: ot };
        }
        const p = we.add(we.pow(a, Nn), we.create(ht.params.G1b));
        let g = we.sqrt(p);
        if (!g) throw new Error("invalid compressed G1 point");
        return (
          (g * De) / o !== BigInt(n) && (g = we.neg(g)),
          { x: we.create(a), y: we.create(g) }
        );
      } else if (i.length === 96 && !e) {
        const o = xt(i.subarray(0, we.BYTES)),
          l = xt(i.subarray(we.BYTES));
        if (r) {
          if (o !== ot || l !== ot)
            throw new Error("G1: non-empty point at infinity");
          return ht.G1.ProjectivePoint.ZERO.toAffine();
        }
        return { x: we.create(o), y: we.create(l) };
      } else throw new Error("invalid point G1, expected 48/96 bytes");
    },
    toBytes: (t, e, r) => {
      const n = e.equals(t.ZERO),
        { x: i, y: o } = e.toAffine();
      if (r) {
        if (n) return di.slice();
        const l = we.ORDER,
          a = !!((o * De) / l);
        return fn(Qe(i, we.BYTES), { compressed: !0, sort: a });
      } else
        return n
          ? Ke(new Uint8Array([64]), new Uint8Array(2 * we.BYTES - 1))
          : Ke(Qe(i, we.BYTES), Qe(o, we.BYTES));
    },
    ShortSignature: {
      fromHex(t) {
        const {
            infinity: e,
            sort: r,
            value: n,
          } = In(at("signatureHex", t, 48)),
          i = we.ORDER,
          o = xt(n);
        if (e) return ht.G1.ProjectivePoint.ZERO;
        const l = we.create(o & we.MASK),
          a = we.add(we.pow(l, Nn), we.create(ht.params.G1b));
        let p = we.sqrt(a);
        if (!p) throw new Error("invalid compressed G1 point");
        const g = BigInt(r);
        (p * De) / i !== g && (p = we.neg(p));
        const E = ht.G1.ProjectivePoint.fromAffine({ x: l, y: p });
        return E.assertValidity(), E;
      },
      toRawBytes(t) {
        return _o(t);
      },
      toHex(t) {
        return xr(_o(t));
      },
    },
  },
  G2: {
    Fp: me,
    h: BigInt(
      "0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5",
    ),
    Gx: me.fromBigTuple([
      BigInt(
        "0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8",
      ),
      BigInt(
        "0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e",
      ),
    ]),
    Gy: me.fromBigTuple([
      BigInt(
        "0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801",
      ),
      BigInt(
        "0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be",
      ),
    ]),
    a: me.ZERO,
    b: me.fromBigTuple([sn, sn]),
    hEff: BigInt(
      "0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551",
    ),
    htfDefaults: { ...Zi },
    wrapPrivateKey: !0,
    allowInfinityPoint: !0,
    mapToCurve: (t) => {
      const { x: e, y: r } = Rl(me.fromBigTuple(t));
      return Nl(e, r);
    },
    isTorsionFree: (t, e) => e.multiplyUnsafe(Jt).negate().equals(bo(t, e)),
    clearCofactor: (t, e) => {
      const r = Jt;
      let n = e.multiplyUnsafe(r).negate(),
        i = bo(t, e),
        o = e.double();
      return (
        (o = Ul(t, o)),
        (o = o.subtract(i)),
        (i = n.add(i)),
        (i = i.multiplyUnsafe(r).negate()),
        (o = o.add(i)),
        (o = o.subtract(n)),
        o.subtract(e)
      );
    },
    fromBytes: (t) => {
      const { compressed: e, infinity: r, sort: n, value: i } = In(t);
      if ((!e && !r && n) || (!e && r && n) || (n && r && e))
        throw new Error("invalid encoding flag: " + (t[0] & 224));
      const o = we.BYTES,
        l = (a, p, g) => xt(a.slice(p, g));
      if (i.length === 96 && e) {
        const a = ht.params.G2b,
          p = we.ORDER;
        if (r) {
          if (i.reduce(($, C) => ($ !== 0 ? C + 1 : C), 0) > 0)
            throw new Error("invalid compressed G2 point");
          return { x: me.ZERO, y: me.ZERO };
        }
        const g = l(i, 0, o),
          E = l(i, o, 2 * o),
          S = me.create({ c0: we.create(E), c1: we.create(g) }),
          I = me.add(me.pow(S, Nn), a);
        let A = me.sqrt(I);
        const w = A.c1 === ot ? (A.c0 * De) / p : (A.c1 * De) / p ? hi : ot;
        return (A = n && w > 0 ? A : me.neg(A)), { x: S, y: A };
      } else if (i.length === 192 && !e) {
        if (r) {
          if (i.reduce((S, I) => (S !== 0 ? I + 1 : I), 0) > 0)
            throw new Error("invalid uncompressed G2 point");
          return { x: me.ZERO, y: me.ZERO };
        }
        const a = l(i, 0, o),
          p = l(i, o, 2 * o),
          g = l(i, 2 * o, 3 * o),
          E = l(i, 3 * o, 4 * o);
        return { x: me.fromBigTuple([p, a]), y: me.fromBigTuple([E, g]) };
      } else throw new Error("invalid point G2, expected 96/192 bytes");
    },
    toBytes: (t, e, r) => {
      const { BYTES: n, ORDER: i } = we,
        o = e.equals(t.ZERO),
        { x: l, y: a } = e.toAffine();
      if (r) {
        if (o) return Ke(di, Qe(ot, n));
        const p = !!(a.c1 === ot ? (a.c0 * De) / i : (a.c1 * De) / i);
        return Ke(fn(Qe(l.c1, n), { compressed: !0, sort: p }), Qe(l.c0, n));
      } else {
        if (o) return Ke(new Uint8Array([64]), new Uint8Array(4 * n - 1));
        const { re: p, im: g } = me.reim(l),
          { re: E, im: S } = me.reim(a);
        return Ke(Qe(g, n), Qe(p, n), Qe(S, n), Qe(E, n));
      }
    },
    Signature: {
      fromHex(t) {
        const { infinity: e, sort: r, value: n } = In(at("signatureHex", t)),
          i = we.ORDER,
          o = n.length / 2;
        if (o !== 48 && o !== 96)
          throw new Error(
            "invalid compressed signature length, must be 96 or 192",
          );
        const l = xt(n.slice(0, o)),
          a = xt(n.slice(o));
        if (e) return ht.G2.ProjectivePoint.ZERO;
        const p = we.create(l & we.MASK),
          g = we.create(a),
          E = me.create({ c0: g, c1: p }),
          S = me.add(me.pow(E, Nn), ht.params.G2b);
        let I = me.sqrt(S);
        if (!I) throw new Error("Failed to find a square root");
        const { re: A, im: w } = me.reim(I),
          $ = BigInt(r),
          C = w > ot && (w * De) / i !== $,
          W = w === ot && (A * De) / i !== $;
        (C || W) && (I = me.neg(I));
        const z = ht.G2.ProjectivePoint.fromAffine({ x: E, y: I });
        return z.assertValidity(), z;
      },
      toRawBytes(t) {
        return xo(t);
      },
      toHex(t) {
        return xr(xo(t));
      },
    },
  },
  params: {
    ateLoopSize: Jt,
    r: mo.ORDER,
    xNegative: !0,
    twistType: "multiplicative",
  },
  htfDefaults: Zi,
  hash: Ss,
  randomBytes: Zo,
});
function Fl(t, e, r) {
  const n = typeof t == "string" ? t : Me(t),
    i = typeof e == "string" ? e : Me(e),
    o = typeof r == "string" ? r : Me(r);
  return ht.verifyShortSignature(i, o, n);
}
const Ec = (t) => Ze(new jr(t)),
  Vs = (t) => {
    const e = Ec(t);
    return new Date(Number(e) / 1e6);
  };
var Pl = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  kl = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  Vn;
class Ot extends qe {
  constructor(e) {
    super(`Invalid certificate: ${e}`);
  }
}
var ft;
(function (t) {
  (t[(t.Empty = 0)] = "Empty"),
    (t[(t.Fork = 1)] = "Fork"),
    (t[(t.Labeled = 2)] = "Labeled"),
    (t[(t.Leaf = 3)] = "Leaf"),
    (t[(t.Pruned = 4)] = "Pruned");
})(ft || (ft = {}));
function Ml(t, e) {
  const r = new Uint8Array(t),
    n = new Uint8Array(e);
  for (let i = 0; i < r.length; i++) if (r[i] > n[i]) return !0;
  return !1;
}
class gr {
  constructor(e, r, n, i, o = 5, l = !1) {
    (this._rootKey = r),
      (this._canisterId = n),
      (this._blsVerify = i),
      (this._maxAgeInMinutes = o),
      Vn.set(this, !1),
      Pl(this, Vn, l, "f"),
      (this.cert = qt(new Uint8Array(e)));
  }
  static async create(e) {
    const r = gr.createUnverified(e);
    return await r.verify(), r;
  }
  static createUnverified(e) {
    let r = e.blsVerify;
    return (
      r || (r = Fl),
      new gr(
        e.certificate,
        e.rootKey,
        e.canisterId,
        r,
        e.maxAgeInMinutes,
        e.disableTimeVerification,
      )
    );
  }
  lookup(e) {
    return Gr(e, this.cert.tree);
  }
  lookup_label(e) {
    return this.lookup([e]);
  }
  async verify() {
    const e = await Gn(this.cert.tree),
      r = await this._checkDelegationAndGetKey(this.cert.delegation),
      n = this.cert.signature,
      i = $l(r),
      o = vt(Yr("ic-state-root"), e);
    let l = !1;
    const a = pt(this.lookup(["time"]));
    if (!a) throw new Ot("Certificate does not contain a time");
    if (!kl(this, Vn, "f")) {
      const g = this._maxAgeInMinutes * 60 * 1e3,
        E = Date.now(),
        S = E - g,
        I = E + 3e5,
        A = Vs(a);
      if (A.getTime() < S)
        throw new Ot(
          `Certificate is signed more than ${this._maxAgeInMinutes} minutes in the past. Certificate time: ` +
            A.toISOString() +
            " Current time: " +
            new Date(E).toISOString(),
        );
      if (A.getTime() > I)
        throw new Ot(
          "Certificate is signed more than 5 minutes in the future. Certificate time: " +
            A.toISOString() +
            " Current time: " +
            new Date(E).toISOString(),
        );
    }
    try {
      l = await this._blsVerify(
        new Uint8Array(i),
        new Uint8Array(n),
        new Uint8Array(o),
      );
    } catch {
      l = !1;
    }
    if (!l) throw new Ot("Signature verification failed");
  }
  async _checkDelegationAndGetKey(e) {
    if (!e) return this._rootKey;
    const r = await gr.createUnverified({
      certificate: e.certificate,
      rootKey: this._rootKey,
      canisterId: this._canisterId,
      blsVerify: this._blsVerify,
      maxAgeInMinutes: 1 / 0,
    });
    if (r.cert.delegation)
      throw new Ot("Delegation certificates cannot be nested");
    if (
      (await r.verify(),
      this._canisterId.toString() !== O0 &&
        !vc({
          canisterId: this._canisterId,
          subnetId: Ae.fromUint8Array(new Uint8Array(e.subnet_id)),
          tree: r.cert.tree,
        }))
    )
      throw new Ot(
        `Canister ${this._canisterId} not in range of delegations for subnet 0x${Me(e.subnet_id)}`,
      );
    const n = pt(r.lookup(["subnet", e.subnet_id, "public_key"]));
    if (!n)
      throw new Error(
        `Could not find subnet key for subnet 0x${Me(e.subnet_id)}`,
      );
    return n;
  }
}
Vn = new WeakMap();
const zr = Gt(
    "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100",
  ),
  Cl = 96;
function $l(t) {
  const e = zr.byteLength + Cl;
  if (t.byteLength !== e)
    throw new TypeError(`BLS DER-encoded public key must be ${e} bytes long`);
  const r = t.slice(0, zr.byteLength);
  if (!pn(r, zr))
    throw new TypeError(
      `BLS DER-encoded public key is invalid. Expect the following prefix: ${zr}, but get ${r}`,
    );
  return t.slice(zr.byteLength);
}
function pt(t) {
  if (t.status === ze.Found) {
    if (t.value instanceof ArrayBuffer) return t.value;
    if (t.value instanceof Uint8Array) return t.value.buffer;
  }
}
async function Gn(t) {
  switch (t[0]) {
    case ft.Empty:
      return Et(Yr("ic-hashtree-empty"));
    case ft.Pruned:
      return t[1];
    case ft.Leaf:
      return Et(vt(Yr("ic-hashtree-leaf"), t[1]));
    case ft.Labeled:
      return Et(vt(Yr("ic-hashtree-labeled"), t[1], await Gn(t[2])));
    case ft.Fork:
      return Et(vt(Yr("ic-hashtree-fork"), await Gn(t[1]), await Gn(t[2])));
    default:
      throw new Error("unreachable");
  }
}
function Yr(t) {
  const e = new Uint8Array([t.length]),
    r = new TextEncoder().encode(t);
  return vt(e, r);
}
var ze;
(function (t) {
  (t.Unknown = "unknown"), (t.Absent = "absent"), (t.Found = "found");
})(ze || (ze = {}));
var $t;
(function (t) {
  (t.Less = "less"), (t.Greater = "greater");
})($t || ($t = {}));
function Gr(t, e) {
  if (t.length === 0)
    switch (e[0]) {
      case ft.Leaf: {
        if (!e[1]) throw new Error("Invalid tree structure for leaf");
        return e[1] instanceof ArrayBuffer
          ? { status: ze.Found, value: e[1] }
          : e[1] instanceof Uint8Array
            ? { status: ze.Found, value: e[1].buffer }
            : { status: ze.Found, value: e[1] };
      }
      default:
        return { status: ze.Found, value: e };
    }
  const r = typeof t[0] == "string" ? new TextEncoder().encode(t[0]) : t[0],
    n = jn(r, e);
  switch (n.status) {
    case ze.Found:
      return Gr(t.slice(1), n.value);
    case $t.Greater:
    case $t.Less:
      return { status: ze.Absent };
    default:
      return n;
  }
}
function ms(t) {
  switch (t[0]) {
    case ft.Empty:
      return [];
    case ft.Fork:
      return ms(t[1]).concat(ms(t[2]));
    default:
      return [t];
  }
}
function jn(t, e) {
  switch (e[0]) {
    case ft.Labeled:
      return Ml(t, e[1])
        ? { status: $t.Greater }
        : pn(t, e[1])
          ? { status: ze.Found, value: e[2] }
          : { status: $t.Less };
    case ft.Fork:
      const r = jn(t, e[1]);
      switch (r.status) {
        case $t.Greater: {
          const n = jn(t, e[2]);
          return n.status === $t.Less ? { status: ze.Absent } : n;
        }
        case ze.Unknown: {
          let n = jn(t, e[2]);
          return n.status === $t.Less ? { status: ze.Unknown } : n;
        }
        default:
          return r;
      }
    case ft.Pruned:
      return { status: ze.Unknown };
    default:
      return { status: ze.Absent };
  }
}
function vc(t) {
  const { canisterId: e, subnetId: r, tree: n } = t,
    i = Gr(["subnet", r.toUint8Array(), "canister_ranges"], n);
  if (i.status !== ze.Found || !(i.value instanceof ArrayBuffer))
    throw new Error(`Could not find canister ranges for subnet ${r}`);
  return qt(i.value)
    .map((p) => [Ae.fromUint8Array(p[0]), Ae.fromUint8Array(p[1])])
    .some((p) => p[0].ltEq(e) && p[1].gtEq(e));
}
class ql {
  constructor(e, r, n) {
    (this.key = e), (this.path = r), (this.decodeStrategy = n);
  }
}
const Ac = async (t) => {
    const { agent: e, paths: r } = t,
      n = Ae.from(t.canisterId),
      i = [...new Set(r)],
      o = i.map((p) => bs(p, n)),
      l = new Map(),
      a = i.map((p, g) =>
        (async () => {
          var E;
          try {
            const S = await e.readState(n, { paths: [o[g]] });
            if (e.rootKey == null) throw new Error("Agent is missing root key");
            const I = await gr.create({
                certificate: S.certificate,
                rootKey: e.rootKey,
                canisterId: n,
                disableTimeVerification: !0,
              }),
              A = (C, W) => {
                if (W === "subnet") {
                  if (e.rootKey == null)
                    throw new Error("Agent is missing root key");
                  const z = Bc(S.certificate, n, e.rootKey);
                  return { path: W, data: z };
                } else return { path: W, data: pt(C.lookup(bs(W, n))) };
              },
              { path: w, data: $ } = A(I, i[g]);
            if (!$)
              console.warn(
                `Expected to find result for path ${w}, but instead found nothing.`,
              ),
                typeof w == "string" ? l.set(w, null) : l.set(w.key, null);
            else
              switch (w) {
                case "time": {
                  l.set(w, Vs($));
                  break;
                }
                case "controllers": {
                  l.set(w, Gl($));
                  break;
                }
                case "module_hash": {
                  l.set(w, Eo($));
                  break;
                }
                case "subnet": {
                  l.set(w, $);
                  break;
                }
                case "candid": {
                  l.set(w, new TextDecoder().decode($));
                  break;
                }
                default:
                  if (typeof w != "string" && "key" in w && "path" in w)
                    switch (w.decodeStrategy) {
                      case "raw":
                        l.set(w.key, $);
                        break;
                      case "leb128": {
                        l.set(w.key, Ec($));
                        break;
                      }
                      case "cbor": {
                        l.set(w.key, Sc($));
                        break;
                      }
                      case "hex": {
                        l.set(w.key, Eo($));
                        break;
                      }
                      case "utf-8":
                        l.set(w.key, Vl($));
                    }
              }
          } catch (S) {
            if (
              !((E = S?.message) === null || E === void 0) &&
              E.includes("Invalid certificate")
            )
              throw new qe(S.message);
            typeof p != "string" && "key" in p && "path" in p
              ? l.set(p.key, null)
              : l.set(p, null),
              console.group(),
              console.warn(
                `Expected to find result for path ${p}, but instead found nothing.`,
              ),
              console.warn(S),
              console.groupEnd();
          }
        })(),
      );
    return await Promise.all(a), l;
  },
  Bc = (t, e, r) => {
    if (!e._isPrincipal) throw new Error("Invalid canisterId");
    const n = qt(new Uint8Array(t)),
      i = n.tree;
    let o = n.delegation,
      l;
    if (
      (o && o.subnet_id
        ? (l = Ae.fromUint8Array(new Uint8Array(o.subnet_id)))
        : !o && typeof r < "u"
          ? ((l = Ae.selfAuthenticating(new Uint8Array(r))),
            (o = {
              subnet_id: l.toUint8Array(),
              certificate: new ArrayBuffer(0),
            }))
          : ((l = Ae.selfAuthenticating(
              Ae.fromText(
                "tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe",
              ).toUint8Array(),
            )),
            (o = {
              subnet_id: l.toUint8Array(),
              certificate: new ArrayBuffer(0),
            })),
      !vc({ canisterId: e, subnetId: l, tree: i }))
    )
      throw new Error("Canister not in range");
    const p = Gr(["subnet", o.subnet_id, "node"], i);
    if (p.status !== ze.Found) throw new Error("Node not found");
    if (p.value instanceof ArrayBuffer) throw new Error("Invalid node tree");
    const g = ms(p.value),
      E = new Map();
    return (
      g.forEach((S) => {
        const I = Ae.from(new Uint8Array(S[1])).toText(),
          A = Gr(["public_key"], S[2]);
        if (A.status !== ze.Found) throw new Error("Public key not found");
        const w = A.value;
        if (w.byteLength !== 44) throw new Error("Invalid public key length");
        E.set(I, w);
      }),
      {
        subnetId: Ae.fromUint8Array(new Uint8Array(o.subnet_id)).toText(),
        nodeKeys: E,
      }
    );
  },
  bs = (t, e) => {
    const r = new TextEncoder(),
      n = (o) => new DataView(r.encode(o).buffer).buffer,
      i = new DataView(e.toUint8Array().buffer).buffer;
    switch (t) {
      case "time":
        return [n("time")];
      case "controllers":
        return [n("canister"), i, n("controllers")];
      case "module_hash":
        return [n("canister"), i, n("module_hash")];
      case "subnet":
        return [n("subnet")];
      case "candid":
        return [n("canister"), i, n("metadata"), n("candid:service")];
      default:
        if ("key" in t && "path" in t)
          if (typeof t.path == "string" || t.path instanceof ArrayBuffer) {
            const o = t.path,
              l = typeof o == "string" ? n(o) : o;
            return [n("canister"), i, n("metadata"), l];
          } else return t.path;
    }
    throw new Error(
      `An unexpeected error was encountered while encoding your path for canister status. Please ensure that your path, ${t} was formatted correctly.`,
    );
  },
  Eo = (t) => Me(t),
  Sc = (t) => qt(t),
  Vl = (t) => new TextDecoder().decode(t),
  Gl = (t) => Sc(t).map((r) => Ae.fromUint8Array(new Uint8Array(r))),
  jl = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CustomPath: ql,
        encodePath: bs,
        fetchNodeKeys: Bc,
        request: Ac,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Rn = BigInt(2 ** 32 - 1),
  _s = BigInt(32);
function Tc(t, e = !1) {
  return e
    ? { h: Number(t & Rn), l: Number((t >> _s) & Rn) }
    : { h: Number((t >> _s) & Rn) | 0, l: Number(t & Rn) | 0 };
}
function Hl(t, e = !1) {
  let r = new Uint32Array(t.length),
    n = new Uint32Array(t.length);
  for (let i = 0; i < t.length; i++) {
    const { h: o, l } = Tc(t[i], e);
    [r[i], n[i]] = [o, l];
  }
  return [r, n];
}
const Kl = (t, e) => (BigInt(t >>> 0) << _s) | BigInt(e >>> 0),
  zl = (t, e, r) => t >>> r,
  Ll = (t, e, r) => (t << (32 - r)) | (e >>> r),
  Wl = (t, e, r) => (t >>> r) | (e << (32 - r)),
  Yl = (t, e, r) => (t << (32 - r)) | (e >>> r),
  Zl = (t, e, r) => (t << (64 - r)) | (e >>> (r - 32)),
  Dl = (t, e, r) => (t >>> (r - 32)) | (e << (64 - r)),
  Xl = (t, e) => e,
  Jl = (t, e) => t,
  Ql = (t, e, r) => (t << r) | (e >>> (32 - r)),
  e0 = (t, e, r) => (e << r) | (t >>> (32 - r)),
  t0 = (t, e, r) => (e << (r - 32)) | (t >>> (64 - r)),
  r0 = (t, e, r) => (t << (r - 32)) | (e >>> (64 - r));
function n0(t, e, r, n) {
  const i = (e >>> 0) + (n >>> 0);
  return { h: (t + r + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
}
const i0 = (t, e, r) => (t >>> 0) + (e >>> 0) + (r >>> 0),
  s0 = (t, e, r, n) => (e + r + n + ((t / 2 ** 32) | 0)) | 0,
  o0 = (t, e, r, n) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0),
  a0 = (t, e, r, n, i) => (e + r + n + i + ((t / 2 ** 32) | 0)) | 0,
  c0 = (t, e, r, n, i) =>
    (t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0),
  u0 = (t, e, r, n, i, o) => (e + r + n + i + o + ((t / 2 ** 32) | 0)) | 0,
  ve = {
    fromBig: Tc,
    split: Hl,
    toBig: Kl,
    shrSH: zl,
    shrSL: Ll,
    rotrSH: Wl,
    rotrSL: Yl,
    rotrBH: Zl,
    rotrBL: Dl,
    rotr32H: Xl,
    rotr32L: Jl,
    rotlSH: Ql,
    rotlSL: e0,
    rotlBH: t0,
    rotlBL: r0,
    add: n0,
    add3L: i0,
    add3H: s0,
    add4L: o0,
    add4H: a0,
    add5H: u0,
    add5L: c0,
  },
  [f0, l0] = ve.split(
    [
      "0x428a2f98d728ae22",
      "0x7137449123ef65cd",
      "0xb5c0fbcfec4d3b2f",
      "0xe9b5dba58189dbbc",
      "0x3956c25bf348b538",
      "0x59f111f1b605d019",
      "0x923f82a4af194f9b",
      "0xab1c5ed5da6d8118",
      "0xd807aa98a3030242",
      "0x12835b0145706fbe",
      "0x243185be4ee4b28c",
      "0x550c7dc3d5ffb4e2",
      "0x72be5d74f27b896f",
      "0x80deb1fe3b1696b1",
      "0x9bdc06a725c71235",
      "0xc19bf174cf692694",
      "0xe49b69c19ef14ad2",
      "0xefbe4786384f25e3",
      "0x0fc19dc68b8cd5b5",
      "0x240ca1cc77ac9c65",
      "0x2de92c6f592b0275",
      "0x4a7484aa6ea6e483",
      "0x5cb0a9dcbd41fbd4",
      "0x76f988da831153b5",
      "0x983e5152ee66dfab",
      "0xa831c66d2db43210",
      "0xb00327c898fb213f",
      "0xbf597fc7beef0ee4",
      "0xc6e00bf33da88fc2",
      "0xd5a79147930aa725",
      "0x06ca6351e003826f",
      "0x142929670a0e6e70",
      "0x27b70a8546d22ffc",
      "0x2e1b21385c26c926",
      "0x4d2c6dfc5ac42aed",
      "0x53380d139d95b3df",
      "0x650a73548baf63de",
      "0x766a0abb3c77b2a8",
      "0x81c2c92e47edaee6",
      "0x92722c851482353b",
      "0xa2bfe8a14cf10364",
      "0xa81a664bbc423001",
      "0xc24b8b70d0f89791",
      "0xc76c51a30654be30",
      "0xd192e819d6ef5218",
      "0xd69906245565a910",
      "0xf40e35855771202a",
      "0x106aa07032bbd1b8",
      "0x19a4c116b8d2d0c8",
      "0x1e376c085141ab53",
      "0x2748774cdf8eeb99",
      "0x34b0bcb5e19b48a8",
      "0x391c0cb3c5c95a63",
      "0x4ed8aa4ae3418acb",
      "0x5b9cca4f7763e373",
      "0x682e6ff3d6b2b8a3",
      "0x748f82ee5defb2fc",
      "0x78a5636f43172f60",
      "0x84c87814a1f0ab72",
      "0x8cc702081a6439ec",
      "0x90befffa23631e28",
      "0xa4506cebde82bde9",
      "0xbef9a3f7b2c67915",
      "0xc67178f2e372532b",
      "0xca273eceea26619c",
      "0xd186b8c721c0c207",
      "0xeada7dd6cde0eb1e",
      "0xf57d4f7fee6ed178",
      "0x06f067aa72176fba",
      "0x0a637dc5a2c898a6",
      "0x113f9804bef90dae",
      "0x1b710b35131c471b",
      "0x28db77f523047d84",
      "0x32caab7b40c72493",
      "0x3c9ebe0a15c9bebc",
      "0x431d67c49c100d4c",
      "0x4cc5d4becb3e42b6",
      "0x597f299cfc657e2a",
      "0x5fcb6fab3ad6faec",
      "0x6c44198c4a475817",
    ].map((t) => BigInt(t)),
  ),
  Wt = new Uint32Array(80),
  Yt = new Uint32Array(80);
class h0 extends Do {
  constructor() {
    super(128, 64, 16, !1),
      (this.Ah = 1779033703),
      (this.Al = -205731576),
      (this.Bh = -1150833019),
      (this.Bl = -2067093701),
      (this.Ch = 1013904242),
      (this.Cl = -23791573),
      (this.Dh = -1521486534),
      (this.Dl = 1595750129),
      (this.Eh = 1359893119),
      (this.El = -1377402159),
      (this.Fh = -1694144372),
      (this.Fl = 725511199),
      (this.Gh = 528734635),
      (this.Gl = -79577749),
      (this.Hh = 1541459225),
      (this.Hl = 327033209);
  }
  get() {
    const {
      Ah: e,
      Al: r,
      Bh: n,
      Bl: i,
      Ch: o,
      Cl: l,
      Dh: a,
      Dl: p,
      Eh: g,
      El: E,
      Fh: S,
      Fl: I,
      Gh: A,
      Gl: w,
      Hh: $,
      Hl: C,
    } = this;
    return [e, r, n, i, o, l, a, p, g, E, S, I, A, w, $, C];
  }
  set(e, r, n, i, o, l, a, p, g, E, S, I, A, w, $, C) {
    (this.Ah = e | 0),
      (this.Al = r | 0),
      (this.Bh = n | 0),
      (this.Bl = i | 0),
      (this.Ch = o | 0),
      (this.Cl = l | 0),
      (this.Dh = a | 0),
      (this.Dl = p | 0),
      (this.Eh = g | 0),
      (this.El = E | 0),
      (this.Fh = S | 0),
      (this.Fl = I | 0),
      (this.Gh = A | 0),
      (this.Gl = w | 0),
      (this.Hh = $ | 0),
      (this.Hl = C | 0);
  }
  process(e, r) {
    for (let q = 0; q < 16; q++, r += 4)
      (Wt[q] = e.getUint32(r)), (Yt[q] = e.getUint32((r += 4)));
    for (let q = 16; q < 80; q++) {
      const re = Wt[q - 15] | 0,
        P = Yt[q - 15] | 0,
        Z = ve.rotrSH(re, P, 1) ^ ve.rotrSH(re, P, 8) ^ ve.shrSH(re, P, 7),
        Y = ve.rotrSL(re, P, 1) ^ ve.rotrSL(re, P, 8) ^ ve.shrSL(re, P, 7),
        J = Wt[q - 2] | 0,
        Q = Yt[q - 2] | 0,
        X = ve.rotrSH(J, Q, 19) ^ ve.rotrBH(J, Q, 61) ^ ve.shrSH(J, Q, 6),
        he = ve.rotrSL(J, Q, 19) ^ ve.rotrBL(J, Q, 61) ^ ve.shrSL(J, Q, 6),
        le = ve.add4L(Y, he, Yt[q - 7], Yt[q - 16]),
        N = ve.add4H(le, Z, X, Wt[q - 7], Wt[q - 16]);
      (Wt[q] = N | 0), (Yt[q] = le | 0);
    }
    let {
      Ah: n,
      Al: i,
      Bh: o,
      Bl: l,
      Ch: a,
      Cl: p,
      Dh: g,
      Dl: E,
      Eh: S,
      El: I,
      Fh: A,
      Fl: w,
      Gh: $,
      Gl: C,
      Hh: W,
      Hl: z,
    } = this;
    for (let q = 0; q < 80; q++) {
      const re =
          ve.rotrSH(S, I, 14) ^ ve.rotrSH(S, I, 18) ^ ve.rotrBH(S, I, 41),
        P = ve.rotrSL(S, I, 14) ^ ve.rotrSL(S, I, 18) ^ ve.rotrBL(S, I, 41),
        Z = (S & A) ^ (~S & $),
        Y = (I & w) ^ (~I & C),
        J = ve.add5L(z, P, Y, l0[q], Yt[q]),
        Q = ve.add5H(J, W, re, Z, f0[q], Wt[q]),
        X = J | 0,
        he = ve.rotrSH(n, i, 28) ^ ve.rotrBH(n, i, 34) ^ ve.rotrBH(n, i, 39),
        le = ve.rotrSL(n, i, 28) ^ ve.rotrBL(n, i, 34) ^ ve.rotrBL(n, i, 39),
        N = (n & o) ^ (n & a) ^ (o & a),
        U = (i & l) ^ (i & p) ^ (l & p);
      (W = $ | 0),
        (z = C | 0),
        ($ = A | 0),
        (C = w | 0),
        (A = S | 0),
        (w = I | 0),
        ({ h: S, l: I } = ve.add(g | 0, E | 0, Q | 0, X | 0)),
        (g = a | 0),
        (E = p | 0),
        (a = o | 0),
        (p = l | 0),
        (o = n | 0),
        (l = i | 0);
      const L = ve.add3L(X, le, U);
      (n = ve.add3H(L, Q, he, N)), (i = L | 0);
    }
    ({ h: n, l: i } = ve.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)),
      ({ h: o, l } = ve.add(this.Bh | 0, this.Bl | 0, o | 0, l | 0)),
      ({ h: a, l: p } = ve.add(this.Ch | 0, this.Cl | 0, a | 0, p | 0)),
      ({ h: g, l: E } = ve.add(this.Dh | 0, this.Dl | 0, g | 0, E | 0)),
      ({ h: S, l: I } = ve.add(this.Eh | 0, this.El | 0, S | 0, I | 0)),
      ({ h: A, l: w } = ve.add(this.Fh | 0, this.Fl | 0, A | 0, w | 0)),
      ({ h: $, l: C } = ve.add(this.Gh | 0, this.Gl | 0, $ | 0, C | 0)),
      ({ h: W, l: z } = ve.add(this.Hh | 0, this.Hl | 0, W | 0, z | 0)),
      this.set(n, i, o, l, a, p, g, E, S, I, A, w, $, C, W, z);
  }
  roundClean() {
    Wt.fill(0), Yt.fill(0);
  }
  destroy() {
    this.buffer.fill(0),
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const d0 = Bs(() => new h0());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const gt =
    BigInt(0),
  ct = BigInt(1),
  On = BigInt(2),
  p0 = BigInt(8),
  y0 = { zip215: !0 };
function w0(t) {
  const e = _c(t);
  return (
    mn(
      t,
      { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" },
      {
        adjustScalarBytes: "function",
        domain: "function",
        uvRatio: "function",
        mapToCurve: "function",
      },
    ),
    Object.freeze({ ...e })
  );
}
function g0(t) {
  const e = w0(t),
    { Fp: r, n, prehash: i, hash: o, randomBytes: l, nByteLength: a, h: p } = e,
    g = On << (BigInt(a * 8) - ct),
    E = r.create,
    S = bn(e.n, e.nBitLength),
    I =
      e.uvRatio ||
      ((j, G) => {
        try {
          return { isValid: !0, value: r.sqrt(j * r.inv(G)) };
        } catch {
          return { isValid: !1, value: gt };
        }
      }),
    A = e.adjustScalarBytes || ((j) => j),
    w =
      e.domain ||
      ((j, G, D) => {
        if ((tn("phflag", D), G.length || D))
          throw new Error("Contexts/pre-hash are not supported");
        return j;
      });
  function $(j, G) {
    tr("coordinate " + j, G, gt, g);
  }
  function C(j) {
    if (!(j instanceof q)) throw new Error("ExtendedPoint expected");
  }
  const W = cn((j, G) => {
      const { ex: D, ey: ie, ez: ge } = j,
        oe = j.is0();
      G == null && (G = oe ? p0 : r.inv(ge));
      const fe = E(D * G),
        ee = E(ie * G),
        m = E(ge * G);
      if (oe) return { x: gt, y: ct };
      if (m !== ct) throw new Error("invZ was invalid");
      return { x: fe, y: ee };
    }),
    z = cn((j) => {
      const { a: G, d: D } = e;
      if (j.is0()) throw new Error("bad point: ZERO");
      const { ex: ie, ey: ge, ez: oe, et: fe } = j,
        ee = E(ie * ie),
        m = E(ge * ge),
        se = E(oe * oe),
        ue = E(se * se),
        de = E(ee * G),
        te = E(se * E(de + m)),
        ae = E(ue + E(D * E(ee * m)));
      if (te !== ae) throw new Error("bad point: equation left != right (1)");
      const b = E(ie * ge),
        x = E(oe * fe);
      if (b !== x) throw new Error("bad point: equation left != right (2)");
      return !0;
    });
  class q {
    constructor(G, D, ie, ge) {
      (this.ex = G),
        (this.ey = D),
        (this.ez = ie),
        (this.et = ge),
        $("x", G),
        $("y", D),
        $("z", ie),
        $("t", ge),
        Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(G) {
      if (G instanceof q) throw new Error("extended point not allowed");
      const { x: D, y: ie } = G || {};
      return $("x", D), $("y", ie), new q(D, ie, ct, E(D * ie));
    }
    static normalizeZ(G) {
      const D = r.invertBatch(G.map((ie) => ie.ez));
      return G.map((ie, ge) => ie.toAffine(D[ge])).map(q.fromAffine);
    }
    static msm(G, D) {
      return bc(q, S, G, D);
    }
    _setWindowSize(G) {
      Z.setWindowSize(this, G);
    }
    assertValidity() {
      z(this);
    }
    equals(G) {
      C(G);
      const { ex: D, ey: ie, ez: ge } = this,
        { ex: oe, ey: fe, ez: ee } = G,
        m = E(D * ee),
        se = E(oe * ge),
        ue = E(ie * ee),
        de = E(fe * ge);
      return m === se && ue === de;
    }
    is0() {
      return this.equals(q.ZERO);
    }
    negate() {
      return new q(E(-this.ex), this.ey, this.ez, E(-this.et));
    }
    double() {
      const { a: G } = e,
        { ex: D, ey: ie, ez: ge } = this,
        oe = E(D * D),
        fe = E(ie * ie),
        ee = E(On * E(ge * ge)),
        m = E(G * oe),
        se = D + ie,
        ue = E(E(se * se) - oe - fe),
        de = m + fe,
        te = de - ee,
        ae = m - fe,
        b = E(ue * te),
        x = E(de * ae),
        B = E(ue * ae),
        k = E(te * de);
      return new q(b, x, k, B);
    }
    add(G) {
      C(G);
      const { a: D, d: ie } = e,
        { ex: ge, ey: oe, ez: fe, et: ee } = this,
        { ex: m, ey: se, ez: ue, et: de } = G;
      if (D === BigInt(-1)) {
        const _ = E((oe - ge) * (se + m)),
          T = E((oe + ge) * (se - m)),
          V = E(T - _);
        if (V === gt) return this.double();
        const ne = E(fe * On * de),
          pe = E(ee * On * ue),
          ye = pe + ne,
          xe = T + _,
          d = pe - ne,
          u = E(ye * V),
          f = E(xe * d),
          v = E(ye * d),
          F = E(V * xe);
        return new q(u, f, F, v);
      }
      const te = E(ge * m),
        ae = E(oe * se),
        b = E(ee * ie * de),
        x = E(fe * ue),
        B = E((ge + oe) * (m + se) - te - ae),
        k = x - b,
        O = x + b,
        M = E(ae - D * te),
        h = E(B * k),
        s = E(O * M),
        c = E(B * M),
        y = E(k * O);
      return new q(h, s, y, c);
    }
    subtract(G) {
      return this.add(G.negate());
    }
    wNAF(G) {
      return Z.wNAFCached(this, G, q.normalizeZ);
    }
    multiply(G) {
      const D = G;
      tr("scalar", D, ct, n);
      const { p: ie, f: ge } = this.wNAF(D);
      return q.normalizeZ([ie, ge])[0];
    }
    multiplyUnsafe(G, D = q.ZERO) {
      const ie = G;
      return (
        tr("scalar", ie, gt, n),
        ie === gt
          ? P
          : this.is0() || ie === ct
            ? this
            : Z.wNAFCachedUnsafe(this, ie, q.normalizeZ, D)
      );
    }
    isSmallOrder() {
      return this.multiplyUnsafe(p).is0();
    }
    isTorsionFree() {
      return Z.unsafeLadder(this, n).is0();
    }
    toAffine(G) {
      return W(this, G);
    }
    clearCofactor() {
      const { h: G } = e;
      return G === ct ? this : this.multiplyUnsafe(G);
    }
    static fromHex(G, D = !1) {
      const { d: ie, a: ge } = e,
        oe = r.BYTES;
      (G = at("pointHex", G, oe)), tn("zip215", D);
      const fe = G.slice(),
        ee = G[oe - 1];
      fe[oe - 1] = ee & -129;
      const m = rn(fe),
        se = D ? g : r.ORDER;
      tr("pointHex.y", m, gt, se);
      const ue = E(m * m),
        de = E(ue - ct),
        te = E(ie * ue - ge);
      let { isValid: ae, value: b } = I(de, te);
      if (!ae) throw new Error("Point.fromHex: invalid y coordinate");
      const x = (b & ct) === ct,
        B = (ee & 128) !== 0;
      if (!D && b === gt && B) throw new Error("Point.fromHex: x=0 and x_0=1");
      return B !== x && (b = E(-b)), q.fromAffine({ x: b, y: m });
    }
    static fromPrivateKey(G) {
      return Q(G).point;
    }
    toRawBytes() {
      const { x: G, y: D } = this.toAffine(),
        ie = fi(D, r.BYTES);
      return (ie[ie.length - 1] |= G & ct ? 128 : 0), ie;
    }
    toHex() {
      return xr(this.toRawBytes());
    }
  }
  (q.BASE = new q(e.Gx, e.Gy, ct, E(e.Gx * e.Gy))),
    (q.ZERO = new q(gt, ct, ct, gt));
  const { BASE: re, ZERO: P } = q,
    Z = mc(q, a * 8);
  function Y(j) {
    return $e(j, n);
  }
  function J(j) {
    return Y(rn(j));
  }
  function Q(j) {
    const G = r.BYTES;
    j = at("private key", j, G);
    const D = at("hashed private key", o(j), 2 * G),
      ie = A(D.slice(0, G)),
      ge = D.slice(G, 2 * G),
      oe = J(ie),
      fe = re.multiply(oe),
      ee = fe.toRawBytes();
    return { head: ie, prefix: ge, scalar: oe, point: fe, pointBytes: ee };
  }
  function X(j) {
    return Q(j).pointBytes;
  }
  function he(j = new Uint8Array(), ...G) {
    const D = Ke(...G);
    return J(o(w(D, at("context", j), !!i)));
  }
  function le(j, G, D = {}) {
    (j = at("message", j)), i && (j = i(j));
    const { prefix: ie, scalar: ge, pointBytes: oe } = Q(G),
      fe = he(D.context, ie, j),
      ee = re.multiply(fe).toRawBytes(),
      m = he(D.context, ee, oe, j),
      se = Y(fe + m * ge);
    tr("signature.s", se, gt, n);
    const ue = Ke(ee, fi(se, r.BYTES));
    return at("result", ue, r.BYTES * 2);
  }
  const N = y0;
  function U(j, G, D, ie = N) {
    const { context: ge, zip215: oe } = ie,
      fe = r.BYTES;
    (j = at("signature", j, 2 * fe)),
      (G = at("message", G)),
      (D = at("publicKey", D, fe)),
      oe !== void 0 && tn("zip215", oe),
      i && (G = i(G));
    const ee = rn(j.slice(fe, 2 * fe));
    let m, se, ue;
    try {
      (m = q.fromHex(D, oe)),
        (se = q.fromHex(j.slice(0, fe), oe)),
        (ue = re.multiplyUnsafe(ee));
    } catch {
      return !1;
    }
    if (!oe && m.isSmallOrder()) return !1;
    const de = he(ge, se.toRawBytes(), m.toRawBytes(), G);
    return se
      .add(m.multiplyUnsafe(de))
      .subtract(ue)
      .clearCofactor()
      .equals(q.ZERO);
  }
  return (
    re._setWindowSize(8),
    {
      CURVE: e,
      getPublicKey: X,
      sign: le,
      verify: U,
      ExtendedPoint: q,
      utils: {
        getExtendedPublicKey: Q,
        randomPrivateKey: () => l(r.BYTES),
        precompute(j = 8, G = q.BASE) {
          return G._setWindowSize(j), G.multiply(BigInt(3)), G;
        },
      },
    }
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Gs =
    BigInt(
      "57896044618658097711785492504343953926634992332820282019728792003956564819949",
    ),
  vo = BigInt(
    "19681161376707505956807079304988542015446066515923890162744021073123829784752",
  );
BigInt(0);
const m0 = BigInt(1),
  Ao = BigInt(2);
BigInt(3);
const b0 = BigInt(5),
  _0 = BigInt(8);
function x0(t) {
  const e = BigInt(10),
    r = BigInt(20),
    n = BigInt(40),
    i = BigInt(80),
    o = Gs,
    a = (((t * t) % o) * t) % o,
    p = (St(a, Ao, o) * a) % o,
    g = (St(p, m0, o) * t) % o,
    E = (St(g, b0, o) * g) % o,
    S = (St(E, e, o) * E) % o,
    I = (St(S, r, o) * S) % o,
    A = (St(I, n, o) * I) % o,
    w = (St(A, i, o) * A) % o,
    $ = (St(w, i, o) * A) % o,
    C = (St($, e, o) * E) % o;
  return { pow_p_5_8: (St(C, Ao, o) * t) % o, b2: a };
}
function E0(t) {
  return (t[0] &= 248), (t[31] &= 127), (t[31] |= 64), t;
}
function v0(t, e) {
  const r = Gs,
    n = $e(e * e * e, r),
    i = $e(n * n * e, r),
    o = x0(t * i).pow_p_5_8;
  let l = $e(t * n * o, r);
  const a = $e(e * l * l, r),
    p = l,
    g = $e(l * vo, r),
    E = a === t,
    S = a === $e(-t, r),
    I = a === $e(-t * vo, r);
  return (
    E && (l = p),
    (S || I) && (l = g),
    ul(l, r) && (l = $e(-l, r)),
    { isValid: E || S, value: l }
  );
}
const A0 = bn(Gs, void 0, !0),
  B0 = {
    a: BigInt(-1),
    d: BigInt(
      "37095705934669439343138083508754565189542113879843219016388785533085940283555",
    ),
    Fp: A0,
    n: BigInt(
      "7237005577332262213973186563042994240857116359379907606001950938285454250989",
    ),
    h: _0,
    Gx: BigInt(
      "15112221349535400772501151409588531511454012693041857206046113283949847762202",
    ),
    Gy: BigInt(
      "46316835694926478169428394003475163141307993866256225615783033603165251855960",
    ),
    hash: d0,
    randomBytes: Zo,
    adjustScalarBytes: E0,
    uvRatio: v0,
  },
  Tr = g0(B0);
var Bo = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  st = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  tt,
  Zr,
  Nc,
  Ic;
class S0 {
  constructor(e = {}) {
    tt.set(this, void 0),
      Zr.set(this, void 0),
      (this[Nc] = this.entries.bind(this)),
      (this[Ic] = "ExpirableMap");
    const { source: r = [], expirationTime: n = 10 * 60 * 1e3 } = e,
      i = Date.now();
    Bo(
      this,
      tt,
      new Map([...r].map(([o, l]) => [o, { value: l, timestamp: i }])),
      "f",
    ),
      Bo(this, Zr, n, "f");
  }
  prune() {
    const e = Date.now();
    for (const [r, n] of st(this, tt, "f").entries())
      e - n.timestamp > st(this, Zr, "f") && st(this, tt, "f").delete(r);
    return this;
  }
  set(e, r) {
    this.prune();
    const n = { value: r, timestamp: Date.now() };
    return st(this, tt, "f").set(e, n), this;
  }
  get(e) {
    const r = st(this, tt, "f").get(e);
    if (r !== void 0) {
      if (Date.now() - r.timestamp > st(this, Zr, "f")) {
        st(this, tt, "f").delete(e);
        return;
      }
      return r.value;
    }
  }
  clear() {
    st(this, tt, "f").clear();
  }
  entries() {
    const e = st(this, tt, "f").entries();
    return (function* () {
      for (const [n, i] of e) yield [n, i.value];
    })();
  }
  values() {
    const e = st(this, tt, "f").values();
    return (function* () {
      for (const n of e) yield n.value;
    })();
  }
  keys() {
    return st(this, tt, "f").keys();
  }
  forEach(e, r) {
    for (const [n, i] of st(this, tt, "f").entries())
      e.call(r, i.value, n, this);
  }
  has(e) {
    return st(this, tt, "f").has(e);
  }
  delete(e) {
    return st(this, tt, "f").delete(e);
  }
  get size() {
    return st(this, tt, "f").size;
  }
}
(tt = new WeakMap()),
  (Zr = new WeakMap()),
  (Nc = Symbol.iterator),
  (Ic = Symbol.toStringTag);
const So = (t) => {
    if (t <= 127) return 1;
    if (t <= 255) return 2;
    if (t <= 65535) return 3;
    if (t <= 16777215) return 4;
    throw new Error("Length too long (> 4 bytes)");
  },
  To = (t, e, r) => {
    if (r <= 127) return (t[e] = r), 1;
    if (r <= 255) return (t[e] = 129), (t[e + 1] = r), 2;
    if (r <= 65535) return (t[e] = 130), (t[e + 1] = r >> 8), (t[e + 2] = r), 3;
    if (r <= 16777215)
      return (
        (t[e] = 131),
        (t[e + 1] = r >> 16),
        (t[e + 2] = r >> 8),
        (t[e + 3] = r),
        4
      );
    throw new Error("Length too long (> 4 bytes)");
  },
  xs = (t, e) => {
    if (t[e] < 128) return 1;
    if (t[e] === 128) throw new Error("Invalid length 0");
    if (t[e] === 129) return 2;
    if (t[e] === 130) return 3;
    if (t[e] === 131) return 4;
    throw new Error("Length too long (> 4 bytes)");
  },
  T0 = (t, e) => {
    const r = xs(t, e);
    if (r === 1) return t[e];
    if (r === 2) return t[e + 1];
    if (r === 3) return (t[e + 1] << 8) + t[e + 2];
    if (r === 4) return (t[e + 1] << 16) + (t[e + 2] << 8) + t[e + 3];
    throw new Error("Length too long (> 4 bytes)");
  };
Uint8Array.from([48, 12, 6, 10, 43, 6, 1, 4, 1, 131, 184, 67, 1, 1]);
const pi = Uint8Array.from([48, 5, 6, 3, 43, 101, 112]);
Uint8Array.from([
  48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 10,
]);
function Rc(t, e) {
  const r = 2 + So(t.byteLength + 1),
    n = e.byteLength + r + t.byteLength;
  let i = 0;
  const o = new Uint8Array(1 + So(n) + n);
  return (
    (o[i++] = 48),
    (i += To(o, i, n)),
    o.set(e, i),
    (i += e.byteLength),
    (o[i++] = 3),
    (i += To(o, i, t.byteLength + 1)),
    (o[i++] = 0),
    o.set(new Uint8Array(t), i),
    o
  );
}
const Oc = (t, e) => {
  let r = 0;
  const n = (a, p) => {
      if (i[r++] !== a) throw new Error("Expected: " + p);
    },
    i = new Uint8Array(t);
  if (
    (n(48, "sequence"), (r += xs(i, r)), !pn(i.slice(r, r + e.byteLength), e))
  )
    throw new Error("Not the expected OID.");
  (r += e.byteLength), n(3, "bit string");
  const o = T0(i, r) - 1;
  (r += xs(i, r)), n(0, "0 padding");
  const l = i.slice(r);
  if (o !== l.length)
    throw new Error(
      `DER payload mismatch: Expected length ${o} actual length ${l.length}`,
    );
  return l;
};
var No = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  Io = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  Hn,
  Kn;
let Uc = class Dr {
  constructor(e) {
    if (
      (Hn.set(this, void 0),
      Kn.set(this, void 0),
      e.byteLength !== Dr.RAW_KEY_LENGTH)
    )
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    No(this, Hn, e, "f"), No(this, Kn, Dr.derEncode(e), "f");
  }
  static from(e) {
    return this.fromDer(e.toDer());
  }
  static fromRaw(e) {
    return new Dr(e);
  }
  static fromDer(e) {
    return new Dr(this.derDecode(e));
  }
  static derEncode(e) {
    return Rc(e, pi).buffer;
  }
  static derDecode(e) {
    const r = Oc(e, pi);
    if (r.length !== this.RAW_KEY_LENGTH)
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    return r;
  }
  get rawKey() {
    return Io(this, Hn, "f");
  }
  get derKey() {
    return Io(this, Kn, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
(Hn = new WeakMap()), (Kn = new WeakMap());
Uc.RAW_KEY_LENGTH = 32;
class N0 {
  constructor() {
    this.observers = [];
  }
  subscribe(e) {
    this.observers.push(e);
  }
  unsubscribe(e) {
    this.observers = this.observers.filter((r) => r !== e);
  }
  notify(e, ...r) {
    this.observers.forEach((n) => n(e, ...r));
  }
}
class I0 extends N0 {
  constructor() {
    super();
  }
  print(e, ...r) {
    this.notify({ message: e, level: "info" }, ...r);
  }
  warn(e, ...r) {
    this.notify({ message: e, level: "warn" }, ...r);
  }
  error(e, r, ...n) {
    this.notify({ message: e, level: "error", error: r }, ...n);
  }
}
var Tt = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  et = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  Nt,
  zn,
  Ln,
  Wn,
  Yn,
  Zn,
  Dn,
  Xn,
  Nr;
const Fc = 0.5,
  Pc = 1.5,
  kc = 500,
  Mc = 6e4,
  Cc = 9e5,
  $c = 10;
class Ni {
  constructor(e = Ni.default) {
    Nt.set(this, void 0),
      zn.set(this, void 0),
      Ln.set(this, void 0),
      Wn.set(this, void 0),
      Yn.set(this, void 0),
      Zn.set(this, void 0),
      Dn.set(this, void 0),
      Xn.set(this, void 0),
      Nr.set(this, 0);
    const {
      initialInterval: r = kc,
      randomizationFactor: n = Fc,
      multiplier: i = Pc,
      maxInterval: o = Mc,
      maxElapsedTime: l = Cc,
      maxIterations: a = $c,
      date: p = Date,
    } = e;
    Tt(this, Nt, r, "f"),
      Tt(this, zn, n, "f"),
      Tt(this, Ln, i, "f"),
      Tt(this, Wn, o, "f"),
      Tt(this, Xn, p, "f"),
      Tt(this, Yn, p.now(), "f"),
      Tt(this, Zn, l, "f"),
      Tt(this, Dn, a, "f");
  }
  get ellapsedTimeInMsec() {
    return et(this, Xn, "f").now() - et(this, Yn, "f");
  }
  get currentInterval() {
    return et(this, Nt, "f");
  }
  get count() {
    return et(this, Nr, "f");
  }
  get randomValueFromInterval() {
    const e = et(this, zn, "f") * et(this, Nt, "f"),
      r = et(this, Nt, "f") - e,
      n = et(this, Nt, "f") + e;
    return Math.random() * (n - r) + r;
  }
  incrementCurrentInterval() {
    var e;
    return (
      Tt(
        this,
        Nt,
        Math.min(et(this, Nt, "f") * et(this, Ln, "f"), et(this, Wn, "f")),
        "f",
      ),
      Tt(this, Nr, ((e = et(this, Nr, "f")), e++, e), "f"),
      et(this, Nt, "f")
    );
  }
  next() {
    return this.ellapsedTimeInMsec >= et(this, Zn, "f") ||
      et(this, Nr, "f") >= et(this, Dn, "f")
      ? null
      : (this.incrementCurrentInterval(), this.randomValueFromInterval);
  }
}
(Nt = new WeakMap()),
  (zn = new WeakMap()),
  (Ln = new WeakMap()),
  (Wn = new WeakMap()),
  (Yn = new WeakMap()),
  (Zn = new WeakMap()),
  (Dn = new WeakMap()),
  (Xn = new WeakMap()),
  (Nr = new WeakMap());
Ni.default = {
  initialInterval: kc,
  randomizationFactor: Fc,
  multiplier: Pc,
  maxInterval: Mc,
  maxElapsedTime: Cc,
  maxIterations: $c,
  date: Date,
};
var Je = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  ce = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  rt,
  fr,
  Cr,
  It,
  kt,
  Mr,
  Xr,
  Ir,
  bt,
  _t,
  lr,
  hr,
  Jr,
  Rr,
  Or,
  dr,
  wr,
  qc,
  Jn,
  Qn,
  pr,
  Mt;
(function (t) {
  (t.Received = "received"),
    (t.Processing = "processing"),
    (t.Replied = "replied"),
    (t.Rejected = "rejected"),
    (t.Unknown = "unknown"),
    (t.Done = "done");
})(Mt || (Mt = {}));
const Un = 60 * 1e3,
  R0 =
    "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae",
  O0 = "aaaaa-aa",
  U0 = "ic0.app",
  F0 = ".ic0.app",
  P0 = "icp0.io",
  k0 = ".icp0.io",
  M0 = "icp-api.io",
  C0 = ".icp-api.io";
class Di extends qe {
  constructor(e) {
    super(e), (this.message = e);
  }
}
class Fn extends qe {
  constructor(e) {
    super(e), (this.message = e);
  }
}
function $0() {
  let t;
  if (typeof window < "u")
    if (window.fetch) t = window.fetch.bind(window);
    else
      throw new Di(
        "Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present.",
      );
  else if (typeof global < "u")
    if (global.fetch) t = global.fetch.bind(global);
    else
      throw new Di(
        "Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available.",
      );
  else typeof self < "u" && self.fetch && (t = self.fetch.bind(self));
  if (t) return t;
  throw new Di(
    "Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context.",
  );
}
function q0(t) {
  let e;
  if (t !== void 0)
    !t.match(/^[a-z]+:/) && typeof window < "u"
      ? (e = new URL(window.location.protocol + "//" + t))
      : (e = new URL(t));
  else {
    const r = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"],
      n = [".github.dev", ".gitpod.io"],
      i = typeof window < "u" ? window.location : void 0,
      o = i?.hostname;
    let l;
    o &&
      typeof o == "string" &&
      (n.some((a) => o.endsWith(a))
        ? (l = o)
        : (l = r.find((a) => o.endsWith(a)))),
      i && l
        ? (e = new URL(`${i.protocol}//${l}${i.port ? ":" + i.port : ""}`))
        : (e = new URL("https://icp-api.io"));
  }
  return e.toString();
}
class Qr {
  constructor(e = {}) {
    var r, n;
    rt.add(this),
      fr.set(this, null),
      Cr.set(this, !1),
      It.set(this, void 0),
      kt.set(this, void 0),
      Mr.set(this, void 0),
      Xr.set(this, void 0),
      Ir.set(this, 0),
      bt.set(this, void 0),
      _t.set(this, void 0),
      lr.set(this, void 0),
      hr.set(this, void 0),
      (this._isAgent = !0),
      (this.config = {}),
      Jr.set(this, 0),
      (this.log = new I0()),
      Rr.set(this, []),
      Or.set(this, []),
      dr.set(this, new S0({ expirationTime: 5 * 60 * 1e3 })),
      wr.set(this, !0),
      Qn.set(this, (l, a) => {
        if (ce(this, wr, "f") === !1) return l;
        if (!a)
          throw new Ot(
            "Invalid signature from replica signed query: no matching node key found.",
          );
        const { status: p, signatures: g = [], requestId: E } = l,
          S = new TextEncoder().encode("\vic-response");
        for (const I of g) {
          const { timestamp: A, identity: w } = I,
            $ = Ae.fromUint8Array(w).toText();
          let C;
          if (p === "replied") {
            const { reply: P } = l;
            C = ci({
              status: p,
              reply: P,
              timestamp: BigInt(A),
              request_id: E,
            });
          } else if (p === "rejected") {
            const { reject_code: P, reject_message: Z, error_code: Y } = l;
            C = ci({
              status: p,
              reject_code: P,
              reject_message: Z,
              error_code: Y,
              timestamp: BigInt(A),
              request_id: E,
            });
          } else throw new Error(`Unknown status: ${p}`);
          const W = vt(S, new Uint8Array(C)),
            z = a?.nodeKeys.get($);
          if (!z)
            throw new Ot(
              "Invalid signature from replica signed query: no matching node key found.",
            );
          const q = Uc.fromDer(z).rawKey;
          if (Tr.verify(I.signature, new Uint8Array(W), new Uint8Array(q)))
            return l;
          throw new Ot(`Invalid signature from replica ${$} signed query.`);
        }
        return l;
      }),
      (this.config = e),
      Je(this, kt, e.fetch || $0() || fetch.bind(global), "f"),
      Je(this, Mr, e.fetchOptions, "f"),
      Je(this, Xr, e.callOptions, "f"),
      Je(
        this,
        Cr,
        (r = e.shouldFetchRootKey) !== null && r !== void 0 ? r : !1,
        "f",
      ),
      e.rootKey
        ? (this.rootKey = e.rootKey)
        : ce(this, Cr, "f")
          ? (this.rootKey = null)
          : (this.rootKey = Gt(R0));
    const i = q0(e.host);
    (this.host = new URL(i)),
      e.verifyQuerySignatures !== void 0 &&
        Je(this, wr, e.verifyQuerySignatures, "f"),
      Je(this, _t, (n = e.retryTimes) !== null && n !== void 0 ? n : 3, "f");
    const o = () => new Ni({ maxIterations: ce(this, _t, "f") });
    if (
      (Je(this, lr, e.backoffStrategy || o, "f"),
      this.host.hostname.endsWith(F0)
        ? (this.host.hostname = U0)
        : this.host.hostname.endsWith(k0)
          ? (this.host.hostname = P0)
          : this.host.hostname.endsWith(C0) && (this.host.hostname = M0),
      e.credentials)
    ) {
      const { name: l, password: a } = e.credentials;
      Je(this, bt, `${l}${a ? ":" + a : ""}`, "f");
    }
    if (
      (Je(this, It, Promise.resolve(e.identity || new ui()), "f"),
      e.ingressExpiryInMinutes && e.ingressExpiryInMinutes > 5)
    )
      throw new qe(
        `The maximum ingress expiry time is 5 minutes. Provided ingress expiry time is ${e.ingressExpiryInMinutes} minutes.`,
      );
    if (e.ingressExpiryInMinutes && e.ingressExpiryInMinutes <= 0)
      throw new qe(
        `Ingress expiry time must be greater than 0. Provided ingress expiry time is ${e.ingressExpiryInMinutes} minutes.`,
      );
    Je(this, hr, e.ingressExpiryInMinutes || 5, "f"),
      this.addTransform("update", io(ys)),
      e.useQueryNonces && this.addTransform("query", io(ys)),
      e.logToConsole &&
        this.log.subscribe((l) => {
          l.level === "error"
            ? console.error(l.message)
            : l.level === "warn"
              ? console.warn(l.message)
              : console.log(l.message);
        });
  }
  get waterMark() {
    return ce(this, Jr, "f");
  }
  static createSync(e = {}) {
    return new this(Object.assign({}, e));
  }
  static async create(e = { shouldFetchRootKey: !1 }) {
    const r = Qr.createSync(e),
      n = [r.syncTime()];
    return (
      r.host.toString() !== "https://icp-api.io" &&
        e.shouldFetchRootKey &&
        n.push(r.fetchRootKey()),
      await Promise.all(n),
      r
    );
  }
  static async from(e) {
    var r;
    try {
      return "config" in e
        ? await Qr.create(e.config)
        : await Qr.create({
            fetch: e._fetch,
            fetchOptions: e._fetchOptions,
            callOptions: e._callOptions,
            host: e._host.toString(),
            identity: (r = e._identity) !== null && r !== void 0 ? r : void 0,
          });
    } catch {
      throw new qe("Failed to create agent from provided agent");
    }
  }
  isLocal() {
    const e = this.host.hostname;
    return e === "127.0.0.1" || e.endsWith("127.0.0.1");
  }
  addTransform(e, r, n = r.priority || 0) {
    if (e === "update") {
      const i = ce(this, Or, "f").findIndex((o) => (o.priority || 0) < n);
      ce(this, Or, "f").splice(
        i >= 0 ? i : ce(this, Or, "f").length,
        0,
        Object.assign(r, { priority: n }),
      );
    } else if (e === "query") {
      const i = ce(this, Rr, "f").findIndex((o) => (o.priority || 0) < n);
      ce(this, Rr, "f").splice(
        i >= 0 ? i : ce(this, Rr, "f").length,
        0,
        Object.assign(r, { priority: n }),
      );
    }
  }
  async getPrincipal() {
    if (!ce(this, It, "f"))
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    return (await ce(this, It, "f")).getPrincipal();
  }
  async call(e, r, n) {
    var i, o;
    await ce(this, rt, "m", pr).call(this);
    const l = (i = r.callSync) !== null && i !== void 0 ? i : !0,
      a = await (n !== void 0 ? await n : await ce(this, It, "f"));
    if (!a)
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    const p = Ae.from(e),
      g = r.effectiveCanisterId ? Ae.from(r.effectiveCanisterId) : p,
      E = a.getPrincipal() || Ae.anonymous();
    let S = new Bn(ce(this, hr, "f") * Un);
    Math.abs(ce(this, Ir, "f")) > 1e3 * 30 &&
      (S = new Bn(ce(this, hr, "f") * Un + ce(this, Ir, "f")));
    const I = {
      request_type: ps.Call,
      canister_id: p,
      method_name: r.methodName,
      arg: r.arg,
      sender: E,
      ingress_expiry: S,
    };
    let A = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: Object.assign(
          { "Content-Type": "application/cbor" },
          ce(this, bt, "f")
            ? { Authorization: "Basic " + btoa(ce(this, bt, "f")) }
            : {},
        ),
      },
      endpoint: "call",
      body: I,
    });
    const w = A.body.nonce ? $(A.body.nonce) : void 0;
    I.nonce = w;
    function $(q) {
      return new Uint8Array(q);
    }
    A = await a.transformRequest(A);
    const C = Vi(A.body),
      W = ce(this, lr, "f").call(this),
      z = an(I);
    try {
      const q = () => (
          this.log.print(
            `fetching "/api/v3/canister/${g.toText()}/call" with request:`,
            A,
          ),
          ce(this, kt, "f").call(
            this,
            "" + new URL(`/api/v3/canister/${g.toText()}/call`, this.host),
            Object.assign(
              Object.assign(Object.assign({}, ce(this, Xr, "f")), A.request),
              { body: C },
            ),
          )
        ),
        re = () => (
          this.log.print(
            `fetching "/api/v2/canister/${g.toText()}/call" with request:`,
            A,
          ),
          ce(this, kt, "f").call(
            this,
            "" + new URL(`/api/v2/canister/${g.toText()}/call`, this.host),
            Object.assign(
              Object.assign(Object.assign({}, ce(this, Xr, "f")), A.request),
              { body: C },
            ),
          )
        ),
        Z = await ce(this, rt, "m", Jn).call(this, {
          request: l ? q : re,
          backoff: W,
          tries: 0,
        }),
        Y = await Z.arrayBuffer(),
        J = Z.status === 200 && Y.byteLength > 0 ? qt(Y) : null;
      if (J && "certificate" in J) {
        const Q = await this.parseTimeFromResponse({
          certificate: J.certificate,
        });
        Je(this, Jr, Q, "f");
      }
      return {
        requestId: z,
        response: {
          ok: Z.ok,
          status: Z.status,
          statusText: Z.statusText,
          body: J,
          headers: Wr(Z.headers),
        },
        requestDetails: I,
      };
    } catch (q) {
      if (q.message.includes("v3 api not supported."))
        return (
          this.log.warn("v3 api not supported. Fall back to v2"),
          this.call(e, Object.assign(Object.assign({}, r), { callSync: !1 }), n)
        );
      const re = `Error while making call: ${(o = q.message) !== null && o !== void 0 ? o : String(q)}`,
        P = new Jf(
          re,
          q,
          Me(z),
          Me(A.body.sender_pubkey),
          Me(A.body.sender_sig),
          String(A.body.content.ingress_expiry._value),
        );
      throw (this.log.error(re, P), P);
    }
  }
  async query(e, r, n) {
    var i, o, l, a;
    await ce(this, rt, "m", pr).call(this);
    const p = ce(this, lr, "f").call(this),
      g = r.effectiveCanisterId ? Ae.from(r.effectiveCanisterId) : Ae.from(e);
    this.log.print(`ecid ${g.toString()}`),
      this.log.print(`canisterId ${e.toString()}`);
    let E, S;
    const I = await (n !== void 0 ? n : ce(this, It, "f"));
    if (!I)
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    const A = Ae.from(e),
      w = I?.getPrincipal() || Ae.anonymous(),
      $ = {
        request_type: "query",
        canister_id: A,
        method_name: r.methodName,
        arg: r.arg,
        sender: w,
        ingress_expiry: new Bn(ce(this, hr, "f") * Un),
      },
      C = an($);
    (E = await this._transform({
      request: {
        method: "POST",
        headers: Object.assign(
          { "Content-Type": "application/cbor" },
          ce(this, bt, "f")
            ? { Authorization: "Basic " + btoa(ce(this, bt, "f")) }
            : {},
        ),
      },
      endpoint: "read",
      body: $,
    })),
      (E = await I?.transformRequest(E));
    const W = Vi(E.body),
      z = {
        canister: A.toText(),
        ecid: g,
        transformedRequest: E,
        body: W,
        requestId: C,
        backoff: p,
        tries: 0,
      },
      q = async () => ({
        requestDetails: $,
        query: await ce(this, rt, "m", qc).call(this, z),
      }),
      re = async () => {
        if (!ce(this, wr, "f")) return;
        const P = ce(this, dr, "f").get(g.toString());
        return (
          P ||
          (await this.fetchSubnetKeys(g.toString()),
          ce(this, dr, "f").get(g.toString()))
        );
      };
    try {
      const [P, Z] = await Promise.all([q(), re()]);
      S = P;
      const { requestDetails: Y, query: J } = S,
        Q = Object.assign(Object.assign({}, J), { requestDetails: Y });
      if ((this.log.print("Query response:", Q), !ce(this, wr, "f"))) return Q;
      try {
        return ce(this, Qn, "f").call(this, Q, Z);
      } catch {
        this.log.warn(
          "Query response verification failed. Retrying with fresh subnet keys.",
        ),
          ce(this, dr, "f").delete(e.toString()),
          await this.fetchSubnetKeys(g.toString());
        const he = ce(this, dr, "f").get(e.toString());
        if (!he)
          throw new Ot(
            "Invalid signature from replica signed query: no matching node key found.",
          );
        return ce(this, Qn, "f").call(this, Q, he);
      }
    } catch (P) {
      const Z = `Error while making call: ${(i = P.message) !== null && i !== void 0 ? i : String(P)}`,
        Y = new Qf(
          Z,
          P,
          String(C),
          Me((o = E?.body) === null || o === void 0 ? void 0 : o.sender_pubkey),
          Me((l = E?.body) === null || l === void 0 ? void 0 : l.sender_sig),
          String(
            (a = E?.body) === null || a === void 0
              ? void 0
              : a.content.ingress_expiry._value,
          ),
        );
      throw (this.log.error(Z, Y), Y);
    }
  }
  async createReadStateRequest(e, r) {
    await ce(this, rt, "m", pr).call(this);
    const n = await (r !== void 0 ? await r : await ce(this, It, "f"));
    if (!n)
      throw new Fn(
        "This identity has expired due this application's security policy. Please refresh your authentication.",
      );
    const i = n?.getPrincipal() || Ae.anonymous(),
      o = await this._transform({
        request: {
          method: "POST",
          headers: Object.assign(
            { "Content-Type": "application/cbor" },
            ce(this, bt, "f")
              ? { Authorization: "Basic " + btoa(ce(this, bt, "f")) }
              : {},
          ),
        },
        endpoint: "read_state",
        body: {
          request_type: "read_state",
          paths: e.paths,
          sender: i,
          ingress_expiry: new Bn(ce(this, hr, "f") * Un),
        },
      });
    return n?.transformRequest(o);
  }
  async readState(e, r, n, i) {
    var o, l, a, p;
    function g($) {
      for (const C of $.paths) {
        const [W, z] = C,
          q = new TextEncoder().encode("request_status");
        if (pn(W, q)) return z;
      }
    }
    const E = g(r);
    await ce(this, rt, "m", pr).call(this);
    const S = typeof e == "string" ? Ae.fromText(e) : e,
      I = i ?? (await this.createReadStateRequest(r, n)),
      A = Vi(I.body);
    this.log.print(
      `fetching "/api/v2/canister/${S}/read_state" with request:`,
      I,
    );
    const w = ce(this, lr, "f").call(this);
    try {
      const $ = await ce(this, rt, "m", Jn).call(this, {
        request: () =>
          ce(this, kt, "f").call(
            this,
            "" +
              new URL(`/api/v2/canister/${S.toString()}/read_state`, this.host),
            Object.assign(
              Object.assign(Object.assign({}, ce(this, Mr, "f")), I.request),
              { body: A },
            ),
          ),
        backoff: w,
        tries: 0,
      });
      if (!$.ok)
        throw new Error(`Server returned an error:
  Code: ${$.status} (${$.statusText})
  Body: ${await $.text()}
`);
      const C = qt(await $.arrayBuffer());
      this.log.print("Read state response:", C);
      const W = await this.parseTimeFromResponse(C);
      return (
        W > 0 &&
          (this.log.print("Read state response time:", W),
          Je(this, Jr, W, "f")),
        C
      );
    } catch ($) {
      const C = `Caught exception while attempting to read state: ${(o = $.message) !== null && o !== void 0 ? o : String($)}`,
        W = new el(
          C,
          $,
          String(E),
          Me((l = I?.body) === null || l === void 0 ? void 0 : l.sender_pubkey),
          Me((a = I?.body) === null || a === void 0 ? void 0 : a.sender_sig),
          String(
            (p = I?.body) === null || p === void 0
              ? void 0
              : p.content.ingress_expiry._value,
          ),
        );
      throw (this.log.error(C, W), W);
    }
  }
  async parseTimeFromResponse(e) {
    let r;
    if (e.certificate) {
      const n = qt(e.certificate);
      if (n && "tree" in n) r = n.tree;
      else throw new Error("Could not decode time from response");
      const i = Gr(["time"], r);
      if (i.status !== ze.Found)
        throw new Error(
          "Time was not found in the response or was not in its expected format.",
        );
      if (!(i.value instanceof ArrayBuffer) && !ArrayBuffer.isView(i))
        throw new Error(
          "Time was not found in the response or was not in its expected format.",
        );
      const o = Vs(Ts(i.value));
      return (
        this.log.print("Time from response:", o),
        this.log.print("Time from response in milliseconds:", Number(o)),
        Number(o)
      );
    } else this.log.warn("No certificate found in response");
    return 0;
  }
  async syncTime(e) {
    await ce(this, rt, "m", pr).call(this);
    const r = await lu(
        () => Promise.resolve().then(() => jl),
        void 0,
        import.meta.url,
      ),
      n = Date.now();
    try {
      e ||
        this.log.print(
          "Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai",
        );
      const i = Qr.createSync({
          identity: new ui(),
          host: this.host.toString(),
          fetch: ce(this, kt, "f"),
          retryTimes: 0,
        }),
        l = (
          await r.request({
            canisterId: e ?? Ae.from("ryjl3-tyaaa-aaaaa-aaaba-cai"),
            agent: i,
            paths: ["time"],
          })
        ).get("time");
      l &&
        (Je(this, Ir, Number(l) - Number(n), "f"),
        this.log.notify({
          message: `Syncing time: offset of ${ce(this, Ir, "f")}`,
          level: "info",
        }));
    } catch (i) {
      this.log.error("Caught exception while attempting to sync time", i);
    }
  }
  async status() {
    const e = ce(this, bt, "f")
      ? { Authorization: "Basic " + btoa(ce(this, bt, "f")) }
      : {};
    this.log.print('fetching "/api/v2/status"');
    const r = ce(this, lr, "f").call(this),
      n = await ce(this, rt, "m", Jn).call(this, {
        backoff: r,
        request: () =>
          ce(this, kt, "f").call(
            this,
            "" + new URL("/api/v2/status", this.host),
            Object.assign({ headers: e }, ce(this, Mr, "f")),
          ),
        tries: 0,
      });
    return qt(await n.arrayBuffer());
  }
  async fetchRootKey() {
    let e;
    return (
      ce(this, fr, "f")
        ? (e = await ce(this, fr, "f"))
        : (Je(
            this,
            fr,
            new Promise((r, n) => {
              this.status()
                .then((i) => {
                  const o = i.root_key;
                  (this.rootKey = o), r(o);
                })
                .catch(n);
            }),
            "f",
          ),
          (e = await ce(this, fr, "f"))),
      Je(this, fr, null, "f"),
      e
    );
  }
  invalidateIdentity() {
    Je(this, It, null, "f");
  }
  replaceIdentity(e) {
    Je(this, It, Promise.resolve(e), "f");
  }
  async fetchSubnetKeys(e) {
    await ce(this, rt, "m", pr).call(this);
    const r = Ae.from(e),
      i = (await Ac({ canisterId: r, paths: ["subnet"], agent: this })).get(
        "subnet",
      );
    if (i && typeof i == "object" && "nodeKeys" in i)
      return ce(this, dr, "f").set(r.toText(), i), i;
  }
  _transform(e) {
    let r = Promise.resolve(e);
    if (e.endpoint === "call")
      for (const n of ce(this, Or, "f"))
        r = r.then((i) => n(i).then((o) => o || i));
    else
      for (const n of ce(this, Rr, "f"))
        r = r.then((i) => n(i).then((o) => o || i));
    return r;
  }
}
(fr = new WeakMap()),
  (Cr = new WeakMap()),
  (It = new WeakMap()),
  (kt = new WeakMap()),
  (Mr = new WeakMap()),
  (Xr = new WeakMap()),
  (Ir = new WeakMap()),
  (bt = new WeakMap()),
  (_t = new WeakMap()),
  (lr = new WeakMap()),
  (hr = new WeakMap()),
  (Jr = new WeakMap()),
  (Rr = new WeakMap()),
  (Or = new WeakMap()),
  (dr = new WeakMap()),
  (wr = new WeakMap()),
  (Qn = new WeakMap()),
  (rt = new WeakSet()),
  (qc = async function t(e) {
    var r, n;
    const {
        ecid: i,
        transformedRequest: o,
        body: l,
        requestId: a,
        backoff: p,
        tries: g,
      } = e,
      E = g === 0 ? 0 : p.next();
    if (
      (this.log.print(
        `fetching "/api/v2/canister/${i.toString()}/query" with tries:`,
        { tries: g, backoff: p, delay: E },
      ),
      E === null)
    )
      throw new qe(
        `Timestamp failed to pass the watermark after retrying the configured ${ce(this, _t, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
      );
    E > 0 && (await new Promise((w) => setTimeout(w, E)));
    let S;
    try {
      this.log.print(
        `fetching "/api/v2/canister/${i.toString()}/query" with request:`,
        o,
      );
      const w = await ce(this, kt, "f").call(
        this,
        "" + new URL(`/api/v2/canister/${i.toString()}/query`, this.host),
        Object.assign(
          Object.assign(Object.assign({}, ce(this, Mr, "f")), o.request),
          { body: l },
        ),
      );
      if (w.status === 200) {
        const $ = qt(await w.arrayBuffer());
        S = Object.assign(Object.assign({}, $), {
          httpDetails: {
            ok: w.ok,
            status: w.status,
            statusText: w.statusText,
            headers: Wr(w.headers),
          },
          requestId: a,
        });
      } else
        throw new Gi(
          `Gateway returned an error:
  Code: ${w.status} (${w.statusText})
  Body: ${await w.text()}
`,
          {
            ok: w.ok,
            status: w.status,
            statusText: w.statusText,
            headers: Wr(w.headers),
          },
        );
    } catch (w) {
      if (g < ce(this, _t, "f"))
        return (
          this.log.warn(`Caught exception while attempting to make query:
  ${w}
  Retrying query.`),
          await ce(this, rt, "m", t).call(
            this,
            Object.assign(Object.assign({}, e), { tries: g + 1 }),
          )
        );
      throw w;
    }
    const I =
      (n = (r = S.signatures) === null || r === void 0 ? void 0 : r[0]) ===
        null || n === void 0
        ? void 0
        : n.timestamp;
    if (!ce(this, wr, "f")) return S;
    if (!I)
      throw new Error(
        "Timestamp not found in query response. This suggests a malformed or malicious response.",
      );
    const A = Number(BigInt(I) / BigInt(1e6));
    if (
      (this.log.print("watermark and timestamp", {
        waterMark: this.waterMark,
        timestamp: A,
      }),
      Number(this.waterMark) > A)
    ) {
      const w = new qe("Timestamp is below the watermark. Retrying query.");
      if (
        (this.log.error("Timestamp is below", w, {
          timestamp: I,
          waterMark: this.waterMark,
        }),
        g < ce(this, _t, "f"))
      )
        return await ce(this, rt, "m", t).call(
          this,
          Object.assign(Object.assign({}, e), { tries: g + 1 }),
        );
      throw new qe(
        `Timestamp failed to pass the watermark after retrying the configured ${ce(this, _t, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
      );
    }
    return S;
  }),
  (Jn = async function t(e) {
    const { request: r, backoff: n, tries: i } = e,
      o = i === 0 ? 0 : n.next();
    if (o === null)
      throw new qe(
        `Timestamp failed to pass the watermark after retrying the configured ${ce(this, _t, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`,
      );
    o > 0 && (await new Promise((g) => setTimeout(g, o)));
    let l;
    try {
      l = await r();
    } catch (g) {
      if (ce(this, _t, "f") > i)
        return (
          this.log.warn(`Caught exception while attempting to make request:
  ${g}
  Retrying request.`),
          await ce(this, rt, "m", t).call(this, {
            request: r,
            backoff: n,
            tries: i + 1,
          })
        );
      throw g;
    }
    if (l.ok) return l;
    const a = await l.clone().text(),
      p = `Server returned an error:
  Code: ${l.status} (${l.statusText})
  Body: ${a}
`;
    if (l.status === 404 && l.url.includes("api/v3"))
      throw new Gi("v3 api not supported. Fall back to v2", {
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        headers: Wr(l.headers),
      });
    if (i < ce(this, _t, "f"))
      return await ce(this, rt, "m", t).call(this, {
        request: r,
        backoff: n,
        tries: i + 1,
      });
    throw new Gi(p, {
      ok: l.ok,
      status: l.status,
      statusText: l.statusText,
      headers: Wr(l.headers),
    });
  }),
  (pr = async function () {
    if (!this.rootKey)
      if (this.rootKey === null && ce(this, Cr, "f")) await this.fetchRootKey();
      else
        throw new qe(
          `Invalid root key detected. The root key for this agent is ${this.rootKey} and the shouldFetchRootKey value is set to ${ce(this, Cr, "f")}. The root key should only be unknown if you are in local development. Otherwise you should avoid fetching and use the default IC Root Key or the known root key of your environment.`,
        );
  });
var Ro;
(function (t) {
  (t.Error = "err"),
    (t.GetPrincipal = "gp"),
    (t.GetPrincipalResponse = "gpr"),
    (t.Query = "q"),
    (t.QueryResponse = "qr"),
    (t.Call = "c"),
    (t.CallResponse = "cr"),
    (t.ReadState = "rs"),
    (t.ReadStateResponse = "rsr"),
    (t.Status = "s"),
    (t.StatusResponse = "sr");
})(Ro || (Ro = {}));
function Oo() {
  const t =
    typeof window > "u"
      ? typeof global > "u"
        ? typeof self > "u"
          ? void 0
          : self.ic.agent
        : global.ic.agent
      : window.ic.agent;
  if (!t) throw new Error("No Agent could be found.");
  return t;
}
const V0 = 5 * 60 * 1e3;
function Vc() {
  return z0(j0(G0(), 1e3), K0(1e3, 1.2), H0(V0));
}
function G0() {
  let t = !0;
  return async () => (t ? ((t = !1), !0) : !1);
}
function j0(t, e) {
  return async (r, n, i) => {
    if (await t(r, n, i)) return new Promise((o) => setTimeout(o, e));
  };
}
function H0(t) {
  const e = Date.now() + t;
  return async (r, n, i) => {
    if (Date.now() > e)
      throw new Error(`Request timed out after ${t} msec:
  Request ID: ${Me(n)}
  Request status: ${i}
`);
  };
}
function K0(t, e) {
  let r = t;
  return () =>
    new Promise((n) =>
      setTimeout(() => {
        (r *= e), n();
      }, r),
    );
}
function z0(...t) {
  return async (e, r, n) => {
    for (const i of t) await i(e, r, n);
  };
}
async function Gc(t, e, r, n = Vc(), i, o) {
  var l;
  const a = [new TextEncoder().encode("request_status"), r],
    p =
      i ??
      (await ((l = t.createReadStateRequest) === null || l === void 0
        ? void 0
        : l.call(t, { paths: [a] }))),
    g = await t.readState(e, { paths: [a] }, void 0, p);
  if (t.rootKey == null)
    throw new Error("Agent root key not initialized before polling");
  const E = await gr.create({
      certificate: g.certificate,
      rootKey: t.rootKey,
      canisterId: e,
      blsVerify: o,
    }),
    S = pt(E.lookup([...a, new TextEncoder().encode("status")]));
  let I;
  switch (
    (typeof S > "u" ? (I = Mt.Unknown) : (I = new TextDecoder().decode(S)), I)
  ) {
    case Mt.Replied:
      return { reply: pt(E.lookup([...a, "reply"])), certificate: E };
    case Mt.Received:
    case Mt.Unknown:
    case Mt.Processing:
      return await n(e, r, I), Gc(t, e, r, n, p, o);
    case Mt.Rejected: {
      const A = new Uint8Array(pt(E.lookup([...a, "reject_code"])))[0],
        w = new TextDecoder().decode(pt(E.lookup([...a, "reject_message"])));
      throw new Error(`Call was rejected:
  Request ID: ${Me(r)}
  Reject code: ${A}
  Reject text: ${w}
`);
    }
    case Mt.Done:
      throw new Error(`Call was marked as done but we never saw the reply:
  Request ID: ${Me(r)}
`);
  }
  throw new Error("unreachable");
}
const L0 = ({ IDL: t }) => {
  const e = t.Variant({ mainnet: t.Null, testnet: t.Null }),
    r = t.Text,
    n = t.Record({ network: e, address: r, min_confirmations: t.Opt(t.Nat32) }),
    i = t.Nat64,
    o = i,
    l = t.Nat32,
    a = t.Record({ start_height: l, end_height: t.Opt(l), network: e }),
    p = t.Vec(t.Nat8),
    g = t.Record({ tip_height: l, block_headers: t.Vec(p) }),
    E = t.Record({ network: e }),
    S = t.Nat64,
    I = t.Vec(S),
    A = t.Record({
      network: e,
      filter: t.Opt(
        t.Variant({ page: t.Vec(t.Nat8), min_confirmations: t.Nat32 }),
      ),
      address: r,
    }),
    w = t.Vec(t.Nat8),
    $ = t.Record({ txid: t.Vec(t.Nat8), vout: t.Nat32 }),
    C = t.Record({ height: t.Nat32, value: i, outpoint: $ }),
    W = t.Record({
      next_page: t.Opt(t.Vec(t.Nat8)),
      tip_height: l,
      tip_block_hash: w,
      utxos: t.Vec(C),
    }),
    z = t.Record({ transaction: t.Vec(t.Nat8), network: e }),
    q = t.Principal,
    re = t.Record({ canister_id: q, num_requested_changes: t.Opt(t.Nat64) }),
    P = t.Variant({
      from_user: t.Record({ user_id: t.Principal }),
      from_canister: t.Record({
        canister_version: t.Opt(t.Nat64),
        canister_id: t.Principal,
      }),
    }),
    Z = t.Vec(t.Nat8),
    Y = t.Variant({
      creation: t.Record({ controllers: t.Vec(t.Principal) }),
      code_deployment: t.Record({
        mode: t.Variant({
          reinstall: t.Null,
          upgrade: t.Null,
          install: t.Null,
        }),
        module_hash: t.Vec(t.Nat8),
      }),
      load_snapshot: t.Record({
        canister_version: t.Nat64,
        taken_at_timestamp: t.Nat64,
        snapshot_id: Z,
      }),
      controllers_change: t.Record({ controllers: t.Vec(t.Principal) }),
      code_uninstall: t.Null,
    }),
    J = t.Record({
      timestamp_nanos: t.Nat64,
      canister_version: t.Nat64,
      origin: P,
      details: Y,
    }),
    Q = t.Record({
      controllers: t.Vec(t.Principal),
      module_hash: t.Opt(t.Vec(t.Nat8)),
      recent_changes: t.Vec(J),
      total_num_changes: t.Nat64,
    }),
    X = t.Record({ canister_id: q }),
    he = t.Variant({
      controllers: t.Null,
      public: t.Null,
      allowed_viewers: t.Vec(t.Principal),
    }),
    le = t.Record({
      freezing_threshold: t.Nat,
      controllers: t.Vec(t.Principal),
      reserved_cycles_limit: t.Nat,
      log_visibility: he,
      wasm_memory_limit: t.Nat,
      memory_allocation: t.Nat,
      compute_allocation: t.Nat,
    }),
    N = t.Record({
      status: t.Variant({ stopped: t.Null, stopping: t.Null, running: t.Null }),
      memory_size: t.Nat,
      cycles: t.Nat,
      settings: le,
      query_stats: t.Record({
        response_payload_bytes_total: t.Nat,
        num_instructions_total: t.Nat,
        num_calls_total: t.Nat,
        request_payload_bytes_total: t.Nat,
      }),
      idle_cycles_burned_per_day: t.Nat,
      module_hash: t.Opt(t.Vec(t.Nat8)),
      reserved_cycles: t.Nat,
    }),
    U = t.Record({ canister_id: q }),
    L = t.Record({
      freezing_threshold: t.Opt(t.Nat),
      controllers: t.Opt(t.Vec(t.Principal)),
      reserved_cycles_limit: t.Opt(t.Nat),
      log_visibility: t.Opt(he),
      wasm_memory_limit: t.Opt(t.Nat),
      memory_allocation: t.Opt(t.Nat),
      compute_allocation: t.Opt(t.Nat),
    }),
    j = t.Record({
      settings: t.Opt(L),
      sender_canister_version: t.Opt(t.Nat64),
    }),
    G = t.Record({ canister_id: q }),
    D = t.Record({ canister_id: q }),
    ie = t.Record({ canister_id: q, snapshot_id: Z }),
    ge = t.Record({ canister_id: q }),
    oe = t.Variant({ secp256k1: t.Null }),
    fe = t.Record({
      key_id: t.Record({ name: t.Text, curve: oe }),
      canister_id: t.Opt(q),
      derivation_path: t.Vec(t.Vec(t.Nat8)),
    }),
    ee = t.Record({ public_key: t.Vec(t.Nat8), chain_code: t.Vec(t.Nat8) }),
    m = t.Record({ canister_id: q }),
    se = t.Record({
      idx: t.Nat64,
      timestamp_nanos: t.Nat64,
      content: t.Vec(t.Nat8),
    }),
    ue = t.Record({ canister_log_records: t.Vec(se) }),
    de = t.Record({ value: t.Text, name: t.Text }),
    te = t.Record({ status: t.Nat, body: t.Vec(t.Nat8), headers: t.Vec(de) }),
    ae = t.Record({
      url: t.Text,
      method: t.Variant({ get: t.Null, head: t.Null, post: t.Null }),
      max_response_bytes: t.Opt(t.Nat64),
      body: t.Opt(t.Vec(t.Nat8)),
      transform: t.Opt(
        t.Record({
          function: t.Func(
            [t.Record({ context: t.Vec(t.Nat8), response: te })],
            [te],
            ["query"],
          ),
          context: t.Vec(t.Nat8),
        }),
      ),
      headers: t.Vec(de),
    }),
    b = t.Variant({
      reinstall: t.Null,
      upgrade: t.Opt(
        t.Record({
          wasm_memory_persistence: t.Opt(
            t.Variant({ keep: t.Null, replace: t.Null }),
          ),
          skip_pre_upgrade: t.Opt(t.Bool),
        }),
      ),
      install: t.Null,
    }),
    x = t.Record({ hash: t.Vec(t.Nat8) }),
    B = t.Record({
      arg: t.Vec(t.Nat8),
      wasm_module_hash: t.Vec(t.Nat8),
      mode: b,
      chunk_hashes_list: t.Vec(x),
      target_canister: q,
      store_canister: t.Opt(q),
      sender_canister_version: t.Opt(t.Nat64),
    }),
    k = t.Vec(t.Nat8),
    O = t.Record({
      arg: t.Vec(t.Nat8),
      wasm_module: k,
      mode: b,
      canister_id: q,
      sender_canister_version: t.Opt(t.Nat64),
    }),
    M = t.Record({ canister_id: q }),
    h = t.Record({ id: Z, total_size: t.Nat64, taken_at_timestamp: t.Nat64 }),
    s = t.Vec(h),
    c = t.Record({
      canister_id: q,
      sender_canister_version: t.Opt(t.Nat64),
      snapshot_id: Z,
    }),
    y = t.Record({ start_at_timestamp_nanos: t.Nat64, subnet_id: t.Principal }),
    _ = t.Record({
      num_block_failures_total: t.Nat64,
      node_id: t.Principal,
      num_blocks_proposed_total: t.Nat64,
    }),
    T = t.Vec(t.Record({ timestamp_nanos: t.Nat64, node_metrics: t.Vec(_) })),
    V = t.Record({
      settings: t.Opt(L),
      specified_id: t.Opt(q),
      amount: t.Opt(t.Nat),
      sender_canister_version: t.Opt(t.Nat64),
    }),
    ne = t.Record({ canister_id: q }),
    pe = t.Record({ canister_id: q, amount: t.Nat }),
    ye = t.Vec(t.Nat8),
    xe = t.Variant({ ed25519: t.Null, bip340secp256k1: t.Null }),
    d = t.Record({
      key_id: t.Record({ algorithm: xe, name: t.Text }),
      canister_id: t.Opt(q),
      derivation_path: t.Vec(t.Vec(t.Nat8)),
    }),
    u = t.Record({ public_key: t.Vec(t.Nat8), chain_code: t.Vec(t.Nat8) }),
    f = t.Record({
      key_id: t.Record({ name: t.Text, curve: oe }),
      derivation_path: t.Vec(t.Vec(t.Nat8)),
      message_hash: t.Vec(t.Nat8),
    }),
    v = t.Record({ signature: t.Vec(t.Nat8) }),
    F = t.Variant({ bip341: t.Record({ merkle_root_hash: t.Vec(t.Nat8) }) }),
    K = t.Record({
      aux: t.Opt(F),
      key_id: t.Record({ algorithm: xe, name: t.Text }),
      derivation_path: t.Vec(t.Vec(t.Nat8)),
      message: t.Vec(t.Nat8),
    }),
    H = t.Record({ signature: t.Vec(t.Nat8) }),
    _e = t.Record({ canister_id: q }),
    Be = t.Record({ canister_id: q }),
    Ee = t.Record({ canister_id: q }),
    be = t.Vec(x),
    Re = t.Record({ subnet_id: t.Principal }),
    ke = t.Record({ replica_version: t.Text }),
    Ii = t.Record({ replace_snapshot: t.Opt(Z), canister_id: q }),
    Ri = h,
    Oi = t.Record({ canister_id: q, sender_canister_version: t.Opt(t.Nat64) }),
    Ui = t.Record({
      canister_id: t.Principal,
      settings: L,
      sender_canister_version: t.Opt(t.Nat64),
    }),
    Fi = t.Record({ chunk: t.Vec(t.Nat8), canister_id: t.Principal }),
    Ht = x;
  return t.Service({
    bitcoin_get_balance: t.Func([n], [o], []),
    bitcoin_get_block_headers: t.Func([a], [g], []),
    bitcoin_get_current_fee_percentiles: t.Func([E], [I], []),
    bitcoin_get_utxos: t.Func([A], [W], []),
    bitcoin_send_transaction: t.Func([z], [], []),
    canister_info: t.Func([re], [Q], []),
    canister_status: t.Func([X], [N], []),
    clear_chunk_store: t.Func([U], [], []),
    create_canister: t.Func([j], [G], []),
    delete_canister: t.Func([D], [], []),
    delete_canister_snapshot: t.Func([ie], [], []),
    deposit_cycles: t.Func([ge], [], []),
    ecdsa_public_key: t.Func([fe], [ee], []),
    fetch_canister_logs: t.Func([m], [ue], ["query"]),
    http_request: t.Func([ae], [te], []),
    install_chunked_code: t.Func([B], [], []),
    install_code: t.Func([O], [], []),
    list_canister_snapshots: t.Func([M], [s], []),
    load_canister_snapshot: t.Func([c], [], []),
    node_metrics_history: t.Func([y], [T], []),
    provisional_create_canister_with_cycles: t.Func([V], [ne], []),
    provisional_top_up_canister: t.Func([pe], [], []),
    raw_rand: t.Func([], [ye], []),
    schnorr_public_key: t.Func([d], [u], []),
    sign_with_ecdsa: t.Func([f], [v], []),
    sign_with_schnorr: t.Func([K], [H], []),
    start_canister: t.Func([_e], [], []),
    stop_canister: t.Func([Be], [], []),
    stored_chunks: t.Func([Ee], [be], []),
    subnet_info: t.Func([Re], [ke], []),
    take_canister_snapshot: t.Func([Ii], [Ri], []),
    uninstall_code: t.Func([Oi], [], []),
    update_settings: t.Func([Ui], [], []),
    upload_chunk: t.Func([Fi], [Ht], []),
  });
};
class jc extends qe {
  constructor(e, r, n, i) {
    super(
      [
        "Call failed:",
        `  Canister: ${e.toText()}`,
        `  Method: ${r} (${n})`,
        ...Object.getOwnPropertyNames(i).map(
          (o) => `  "${o}": ${JSON.stringify(i[o])}`,
        ),
      ].join(`
`),
    ),
      (this.canisterId = e),
      (this.methodName = r),
      (this.type = n),
      (this.props = i);
  }
}
class W0 extends jc {
  constructor(e, r, n) {
    var i;
    super(e, r, "query", {
      Status: n.status,
      Code:
        (i = is[n.reject_code]) !== null && i !== void 0
          ? i
          : `Unknown Code "${n.reject_code}"`,
      Message: n.reject_message,
    }),
      (this.result = n);
  }
}
class Uo extends jc {
  constructor(e, r, n, i, o, l, a) {
    super(
      e,
      r,
      "update",
      Object.assign(
        { "Request ID": Me(n) },
        i.body
          ? Object.assign(Object.assign({}, a ? { "Error code": a } : {}), {
              "Reject code": String(o),
              "Reject message": l,
            })
          : {
              "HTTP status code": i.status.toString(),
              "HTTP status text": i.statusText,
            },
      ),
    ),
      (this.requestId = n),
      (this.response = i),
      (this.reject_code = o),
      (this.reject_message = l),
      (this.error_code = a);
  }
}
const dt = Symbol.for("ic-agent-metadata");
class js {
  constructor(e) {
    this[dt] = Object.freeze(e);
  }
  static agentOf(e) {
    return e[dt].config.agent;
  }
  static interfaceOf(e) {
    return e[dt].service;
  }
  static canisterIdOf(e) {
    return Ae.from(e[dt].config.canisterId);
  }
  static async install(e, r) {
    const n = e.mode === void 0 ? { install: null } : e.mode,
      i = e.arg ? [...new Uint8Array(e.arg)] : [],
      o = [...new Uint8Array(e.module)],
      l =
        typeof r.canisterId == "string"
          ? Ae.fromText(r.canisterId)
          : r.canisterId;
    await Fo(r).install_code({
      mode: n,
      arg: i,
      wasm_module: o,
      canister_id: l,
      sender_canister_version: [],
    });
  }
  static async createCanister(e, r) {
    function n(o) {
      return [
        {
          controllers: o.controllers ? [o.controllers] : [],
          compute_allocation: o.compute_allocation
            ? [o.compute_allocation]
            : [],
          freezing_threshold: o.freezing_threshold
            ? [o.freezing_threshold]
            : [],
          memory_allocation: o.memory_allocation ? [o.memory_allocation] : [],
          reserved_cycles_limit: [],
          log_visibility: [],
          wasm_memory_limit: [],
        },
      ];
    }
    const { canister_id: i } = await Fo(
      e || {},
    ).provisional_create_canister_with_cycles({
      amount: [],
      settings: n(r || {}),
      specified_id: [],
      sender_canister_version: [],
    });
    return i;
  }
  static async createAndInstallCanister(e, r, n) {
    const i = await this.createCanister(n);
    return (
      await this.install(
        Object.assign({}, r),
        Object.assign(Object.assign({}, n), { canisterId: i }),
      ),
      this.createActor(
        e,
        Object.assign(Object.assign({}, n), { canisterId: i }),
      )
    );
  }
  static createActorClass(e, r) {
    const n = e({ IDL: ef });
    class i extends js {
      constructor(l) {
        if (!l.canisterId)
          throw new qe(
            `Canister ID is required, but received ${typeof l.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`,
          );
        const a =
          typeof l.canisterId == "string"
            ? Ae.fromText(l.canisterId)
            : l.canisterId;
        super({
          config: Object.assign(Object.assign(Object.assign({}, Hc), l), {
            canisterId: a,
          }),
          service: n,
        });
        for (const [p, g] of n._fields)
          r?.httpDetails && g.annotations.push(Es),
            r?.certificate && g.annotations.push(Kc),
            (this[p] = Y0(this, p, g, l.blsVerify));
      }
    }
    return i;
  }
  static createActor(e, r) {
    if (!r.canisterId)
      throw new qe(
        `Canister ID is required, but received ${typeof r.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`,
      );
    return new (this.createActorClass(e))(r);
  }
  static createActorWithHttpDetails(e, r) {
    return new (this.createActorClass(e, { httpDetails: !0 }))(r);
  }
  static createActorWithExtendedDetails(
    e,
    r,
    n = { httpDetails: !0, certificate: !0 },
  ) {
    return new (this.createActorClass(e, n))(r);
  }
}
function Sr(t, e) {
  const r = la(t, zo.Buffer.from(e));
  switch (r.length) {
    case 0:
      return;
    case 1:
      return r[0];
    default:
      return r;
  }
}
const Hc = { pollingStrategyFactory: Vc },
  Es = "http-details",
  Kc = "certificate";
function Y0(t, e, r, n) {
  let i;
  r.annotations.includes("query") || r.annotations.includes("composite_query")
    ? (i = async (l, ...a) => {
        var p, g;
        l = Object.assign(
          Object.assign({}, l),
          (g = (p = t[dt].config).queryTransform) === null || g === void 0
            ? void 0
            : g.call(
                p,
                e,
                a,
                Object.assign(Object.assign({}, t[dt].config), l),
              ),
        );
        const E = l.agent || t[dt].config.agent || Oo(),
          S = Ae.from(l.canisterId || t[dt].config.canisterId),
          I = os(r.argTypes, a),
          A = await E.query(S, {
            methodName: e,
            arg: I,
            effectiveCanisterId: l.effectiveCanisterId,
          }),
          w = Object.assign(Object.assign({}, A.httpDetails), {
            requestDetails: A.requestDetails,
          });
        switch (A.status) {
          case "rejected":
            throw new W0(S, e, A);
          case "replied":
            return r.annotations.includes(Es)
              ? { httpDetails: w, result: Sr(r.retTypes, A.reply.arg) }
              : Sr(r.retTypes, A.reply.arg);
        }
      })
    : (i = async (l, ...a) => {
        var p, g;
        l = Object.assign(
          Object.assign({}, l),
          (g = (p = t[dt].config).callTransform) === null || g === void 0
            ? void 0
            : g.call(
                p,
                e,
                a,
                Object.assign(Object.assign({}, t[dt].config), l),
              ),
        );
        const E = l.agent || t[dt].config.agent || Oo(),
          {
            canisterId: S,
            effectiveCanisterId: I,
            pollingStrategyFactory: A,
          } = Object.assign(
            Object.assign(Object.assign({}, Hc), t[dt].config),
            l,
          ),
          w = Ae.from(S),
          $ = I !== void 0 ? Ae.from(I) : w,
          C = os(r.argTypes, a),
          {
            requestId: W,
            response: z,
            requestDetails: q,
          } = await E.call(w, {
            methodName: e,
            arg: C,
            effectiveCanisterId: $,
          });
        let re, P;
        if (z.body && z.body.certificate) {
          if (E.rootKey == null) throw new Error("Agent is missing root key");
          const Q = z.body.certificate;
          P = await gr.create({
            certificate: si(Q),
            rootKey: E.rootKey,
            canisterId: Ae.from(S),
            blsVerify: n,
          });
          const X = [new TextEncoder().encode("request_status"), W];
          switch (new TextDecoder().decode(pt(P.lookup([...X, "status"])))) {
            case "replied":
              re = pt(P.lookup([...X, "reply"]));
              break;
            case "rejected": {
              const le = new Uint8Array(pt(P.lookup([...X, "reject_code"])))[0],
                N = new TextDecoder().decode(
                  pt(P.lookup([...X, "reject_message"])),
                ),
                U = pt(P.lookup([...X, "error_code"])),
                L = U ? new TextDecoder().decode(U) : void 0;
              throw new Uo(w, e, W, z, le, N, L);
            }
          }
        } else if (z.body && "reject_message" in z.body) {
          const { reject_code: Q, reject_message: X, error_code: he } = z.body;
          throw new Uo(w, e, W, z, Q, X, he);
        }
        if (z.status === 202) {
          const Q = A(),
            X = await Gc(E, $, W, Q, n);
          (P = X.certificate), (re = X.reply);
        }
        const Z = r.annotations.includes(Es),
          Y = r.annotations.includes(Kc),
          J = Object.assign(Object.assign({}, z), { requestDetails: q });
        if (re !== void 0)
          return Z && Y
            ? { httpDetails: J, certificate: P, result: Sr(r.retTypes, re) }
            : Y
              ? { certificate: P, result: Sr(r.retTypes, re) }
              : Z
                ? { httpDetails: J, result: Sr(r.retTypes, re) }
                : Sr(r.retTypes, re);
        if (r.retTypes.length === 0)
          return Z ? { httpDetails: z, result: void 0 } : void 0;
        throw new Error(
          `Call was returned undefined, but type [${r.retTypes.join(",")}].`,
        );
      });
  const o = (...l) => i({}, ...l);
  return (
    (o.withOptions =
      (l) =>
      (...a) =>
        i(l, ...a)),
    o
  );
}
function Fo(t) {
  function e(r, n) {
    if (t.effectiveCanisterId)
      return { effectiveCanisterId: Ae.from(t.effectiveCanisterId) };
    const i = n[0];
    let o = Ae.fromHex("");
    return (
      i &&
        typeof i == "object" &&
        i.target_canister &&
        r === "install_chunked_code" &&
        (o = Ae.from(i.target_canister)),
      i &&
        typeof i == "object" &&
        i.canister_id &&
        (o = Ae.from(i.canister_id)),
      { effectiveCanisterId: o }
    );
  }
  return js.createActor(
    L0,
    Object.assign(
      Object.assign(Object.assign({}, t), { canisterId: Ae.fromHex("") }),
      { callTransform: e, queryTransform: e },
    ),
  );
}
var yi = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  Qt = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  ei,
  ti,
  Ur,
  Fr;
function Po(t) {
  return t !== null && typeof t == "object";
}
class Vt {
  constructor(e) {
    if (
      (ei.set(this, void 0),
      ti.set(this, void 0),
      e.byteLength !== Vt.RAW_KEY_LENGTH)
    )
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    yi(this, ei, e, "f"), yi(this, ti, Vt.derEncode(e), "f");
  }
  static from(e) {
    if (typeof e == "string") {
      const r = Gt(e);
      return this.fromRaw(r);
    } else if (Po(e)) {
      const r = e;
      if (Po(r) && Object.hasOwnProperty.call(r, "__derEncodedPublicKey__"))
        return this.fromDer(r);
      if (ArrayBuffer.isView(r)) {
        const n = r;
        return this.fromRaw(Ts(n.buffer));
      } else {
        if (r instanceof ArrayBuffer) return this.fromRaw(r);
        if ("rawKey" in r) return this.fromRaw(r.rawKey);
        if ("derKey" in r) return this.fromDer(r.derKey);
        if ("toDer" in r) return this.fromDer(r.toDer());
      }
    }
    throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
  }
  static fromRaw(e) {
    return new Vt(e);
  }
  static fromDer(e) {
    return new Vt(this.derDecode(e));
  }
  static derEncode(e) {
    const r = Rc(e, pi).buffer;
    return (r.__derEncodedPublicKey__ = void 0), r;
  }
  static derDecode(e) {
    const r = Oc(e, pi);
    if (r.length !== this.RAW_KEY_LENGTH)
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    return r;
  }
  get rawKey() {
    return Qt(this, ei, "f");
  }
  get derKey() {
    return Qt(this, ti, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
}
(ei = new WeakMap()), (ti = new WeakMap());
Vt.RAW_KEY_LENGTH = 32;
class ir extends Ps {
  constructor(e, r) {
    super(),
      Ur.set(this, void 0),
      Fr.set(this, void 0),
      yi(this, Ur, Vt.from(e), "f"),
      yi(this, Fr, new Uint8Array(r), "f");
  }
  static generate(e) {
    if (e && e.length !== 32)
      throw new Error("Ed25519 Seed needs to be 32 bytes long.");
    e || (e = Tr.utils.randomPrivateKey()),
      pn(e, new Uint8Array(new Array(32).fill(0))) &&
        console.warn(
          "Seed is all zeros. This is not a secure seed. Please provide a seed with sufficient entropy if this is a production environment.",
        );
    const r = new Uint8Array(32);
    for (let i = 0; i < 32; i++) r[i] = new Uint8Array(e)[i];
    const n = Tr.getPublicKey(r);
    return ir.fromKeyPair(n, r);
  }
  static fromParsedJson(e) {
    const [r, n] = e;
    return new ir(Vt.fromDer(Gt(r)), Gt(n));
  }
  static fromJSON(e) {
    const r = JSON.parse(e);
    if (Array.isArray(r)) {
      if (typeof r[0] == "string" && typeof r[1] == "string")
        return this.fromParsedJson([r[0], r[1]]);
      throw new Error(
        "Deserialization error: JSON must have at least 2 items.",
      );
    }
    throw new Error(
      `Deserialization error: Invalid JSON type for string: ${JSON.stringify(e)}`,
    );
  }
  static fromKeyPair(e, r) {
    return new ir(Vt.fromRaw(e), r);
  }
  static fromSecretKey(e) {
    const r = Tr.getPublicKey(new Uint8Array(e));
    return ir.fromKeyPair(r, e);
  }
  toJSON() {
    return [Me(Qt(this, Ur, "f").toDer()), Me(Qt(this, Fr, "f"))];
  }
  getKeyPair() {
    return { secretKey: Qt(this, Fr, "f"), publicKey: Qt(this, Ur, "f") };
  }
  getPublicKey() {
    return Qt(this, Ur, "f");
  }
  async sign(e) {
    const r = new Uint8Array(e),
      n = en(Tr.sign(r, Qt(this, Fr, "f").slice(0, 32)));
    return (
      Object.defineProperty(n, "__signature__", {
        enumerable: !1,
        value: void 0,
      }),
      n
    );
  }
  static verify(e, r, n) {
    const [i, o, l] = [e, r, n].map(
      (a) => (
        typeof a == "string" && (a = Gt(a)),
        a instanceof Uint8Array && (a = a.buffer),
        new Uint8Array(a)
      ),
    );
    return Tr.verify(o, i, l);
  }
}
(Ur = new WeakMap()), (Fr = new WeakMap());
class Hs extends Error {
  constructor(e) {
    super(e), (this.message = e), Object.setPrototypeOf(this, Hs.prototype);
  }
}
function ko(t) {
  if (typeof global < "u" && global.crypto && global.crypto.subtle)
    return global.crypto.subtle;
  if (t) return t;
  if (typeof crypto < "u" && crypto.subtle) return crypto.subtle;
  throw new Hs(
    "Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto",
  );
}
class wi extends Ps {
  constructor(e, r, n) {
    super(), (this._keyPair = e), (this._derKey = r), (this._subtleCrypto = n);
  }
  static async generate(e) {
    const {
        extractable: r = !1,
        keyUsages: n = ["sign", "verify"],
        subtleCrypto: i,
      } = e ?? {},
      o = ko(i),
      l = await o.generateKey({ name: "ECDSA", namedCurve: "P-256" }, r, n),
      a = await o.exportKey("spki", l.publicKey);
    return new this(l, a, o);
  }
  static async fromKeyPair(e, r) {
    const n = ko(r),
      i = await n.exportKey("spki", e.publicKey);
    return new wi(e, i, n);
  }
  getKeyPair() {
    return this._keyPair;
  }
  getPublicKey() {
    const e = this._derKey,
      r = Object.create(this._keyPair.publicKey);
    return (
      (r.toDer = function () {
        return e;
      }),
      r
    );
  }
  async sign(e) {
    const r = { name: "ECDSA", hash: { name: "SHA-256" } };
    return await this._subtleCrypto.sign(r, this._keyPair.privateKey, e);
  }
}
var Z0 = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  Lr = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  Dt;
class D0 {
  constructor(e) {
    Dt.set(this, void 0), Z0(this, Dt, e, "f");
  }
  get rawKey() {
    return Lr(this, Dt, "f").rawKey;
  }
  get derKey() {
    return Lr(this, Dt, "f").derKey;
  }
  toDer() {
    return Lr(this, Dt, "f").toDer();
  }
  getPublicKey() {
    return Lr(this, Dt, "f");
  }
  getPrincipal() {
    return Ae.from(Lr(this, Dt, "f").rawKey);
  }
  transformRequest() {
    return Promise.reject(
      "Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.",
    );
  }
}
Dt = new WeakMap();
var X0 = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  J0 = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  Q0 = function (t, e) {
    var r = {};
    for (var n in t)
      Object.prototype.hasOwnProperty.call(t, n) &&
        e.indexOf(n) < 0 &&
        (r[n] = t[n]);
    if (t != null && typeof Object.getOwnPropertySymbols == "function")
      for (var i = 0, n = Object.getOwnPropertySymbols(t); i < n.length; i++)
        e.indexOf(n[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, n[i]) &&
          (r[n[i]] = t[n[i]]);
    return r;
  },
  ri;
const eh = new TextEncoder().encode("ic-request-auth-delegation"),
  th = new TextEncoder().encode(`
ic-request`);
function Xi(t) {
  if (typeof t != "string" || t.length < 64)
    throw new Error("Invalid public key.");
  return Gt(t);
}
class Ks {
  constructor(e, r, n) {
    (this.pubkey = e), (this.expiration = r), (this.targets = n);
  }
  toCBOR() {
    return ut.value.map(
      Object.assign(
        {
          pubkey: ut.value.bytes(this.pubkey),
          expiration: ut.value.u64(this.expiration.toString(16), 16),
        },
        this.targets && {
          targets: ut.value.array(
            this.targets.map((e) => ut.value.bytes(e.toUint8Array())),
          ),
        },
      ),
    );
  }
  toJSON() {
    return Object.assign(
      { expiration: this.expiration.toString(16), pubkey: Me(this.pubkey) },
      this.targets && { targets: this.targets.map((e) => e.toHex()) },
    );
  }
}
async function rh(t, e, r, n) {
  const i = new Ks(e.toDer(), BigInt(+r) * BigInt(1e6), n),
    o = new Uint8Array([...eh, ...new Uint8Array(an(Object.assign({}, i)))]),
    l = await t.sign(o);
  return { delegation: i, signature: l };
}
class gi {
  constructor(e, r) {
    (this.delegations = e), (this.publicKey = r);
  }
  static async create(e, r, n = new Date(Date.now() + 15 * 60 * 1e3), i = {}) {
    var o, l;
    const a = await rh(e, r, n, i.targets);
    return new gi(
      [
        ...(((o = i.previous) === null || o === void 0
          ? void 0
          : o.delegations) || []),
        a,
      ],
      ((l = i.previous) === null || l === void 0 ? void 0 : l.publicKey) ||
        e.getPublicKey().toDer(),
    );
  }
  static fromJSON(e) {
    const { publicKey: r, delegations: n } =
      typeof e == "string" ? JSON.parse(e) : e;
    if (!Array.isArray(n)) throw new Error("Invalid delegations.");
    const i = n.map((o) => {
      const { delegation: l, signature: a } = o,
        { pubkey: p, expiration: g, targets: E } = l;
      if (E !== void 0 && !Array.isArray(E))
        throw new Error("Invalid targets.");
      return {
        delegation: new Ks(
          Xi(p),
          BigInt("0x" + g),
          E &&
            E.map((S) => {
              if (typeof S != "string") throw new Error("Invalid target.");
              return Ae.fromHex(S);
            }),
        ),
        signature: Xi(a),
      };
    });
    return new this(i, Xi(r));
  }
  static fromDelegations(e, r) {
    return new this(e, r);
  }
  toJSON() {
    return {
      delegations: this.delegations.map((e) => {
        const { delegation: r, signature: n } = e,
          { targets: i } = r;
        return {
          delegation: Object.assign(
            { expiration: r.expiration.toString(16), pubkey: Me(r.pubkey) },
            i && { targets: i.map((o) => o.toHex()) },
          ),
          signature: Me(n),
        };
      }),
      publicKey: Me(this.publicKey),
    };
  }
}
class Mo extends Ps {
  constructor(e, r) {
    super(), (this._inner = e), (this._delegation = r);
  }
  static fromDelegation(e, r) {
    return new this(e, r);
  }
  getDelegation() {
    return this._delegation;
  }
  getPublicKey() {
    return {
      derKey: this._delegation.publicKey,
      toDer: () => this._delegation.publicKey,
    };
  }
  sign(e) {
    return this._inner.sign(e);
  }
  async transformRequest(e) {
    const { body: r } = e,
      n = Q0(e, ["body"]),
      i = await an(r);
    return Object.assign(Object.assign({}, n), {
      body: {
        content: r,
        sender_sig: await this.sign(
          new Uint8Array([...th, ...new Uint8Array(i)]),
        ),
        sender_delegation: this._delegation.delegations,
        sender_pubkey: this._delegation.publicKey,
      },
    });
  }
}
class mi extends D0 {
  constructor(e, r) {
    super(e), ri.set(this, void 0), X0(this, ri, r, "f");
  }
  get delegation() {
    return J0(this, ri, "f");
  }
  static fromDelegation(e, r) {
    return new mi(e, r);
  }
}
ri = new WeakMap();
function nh(t, e) {
  for (const { delegation: n } of t.delegations)
    if (+new Date(Number(n.expiration / BigInt(1e6))) <= +Date.now()) return !1;
  const r = [];
  for (const n of r) {
    const i = n.toText();
    for (const { delegation: o } of t.delegations) {
      if (o.targets === void 0) continue;
      let l = !0;
      for (const a of o.targets)
        if (a.toText() === i) {
          l = !1;
          break;
        }
      if (l) return !1;
    }
  }
  return !0;
}
var Co;
(function (t) {
  t[(t.ECDSA_WITH_SHA256 = -7)] = "ECDSA_WITH_SHA256";
})(Co || (Co = {}));
const $o = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"];
class qo {
  constructor(e = {}) {
    var r;
    (this.callbacks = []),
      (this.idleTimeout = 10 * 60 * 1e3),
      (this.timeoutID = void 0);
    const { onIdle: n, idleTimeout: i = 10 * 60 * 1e3 } = e || {};
    (this.callbacks = n ? [n] : []), (this.idleTimeout = i);
    const o = this._resetTimer.bind(this);
    window.addEventListener("load", o, !0),
      $o.forEach(function (a) {
        document.addEventListener(a, o, !0);
      });
    const l = (a, p) => {
      let g;
      return (...E) => {
        const S = this,
          I = function () {
            (g = void 0), a.apply(S, E);
          };
        clearTimeout(g), (g = window.setTimeout(I, p));
      };
    };
    if (e?.captureScroll) {
      const a = l(
        o,
        (r = e?.scrollDebounce) !== null && r !== void 0 ? r : 100,
      );
      window.addEventListener("scroll", a, !0);
    }
    o();
  }
  static create(e = {}) {
    return new this(e);
  }
  registerCallback(e) {
    this.callbacks.push(e);
  }
  exit() {
    clearTimeout(this.timeoutID),
      window.removeEventListener("load", this._resetTimer, !0);
    const e = this._resetTimer.bind(this);
    $o.forEach(function (r) {
      document.removeEventListener(r, e, !0);
    }),
      this.callbacks.forEach((r) => r());
  }
  _resetTimer() {
    const e = this.exit.bind(this);
    window.clearTimeout(this.timeoutID),
      (this.timeoutID = window.setTimeout(e, this.idleTimeout));
  }
}
const ih = (t, e) => e.some((r) => t instanceof r);
let Vo, Go;
function sh() {
  return (
    Vo ||
    (Vo = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function oh() {
  return (
    Go ||
    (Go = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const zc = new WeakMap(),
  vs = new WeakMap(),
  Lc = new WeakMap(),
  Ji = new WeakMap(),
  zs = new WeakMap();
function ah(t) {
  const e = new Promise((r, n) => {
    const i = () => {
        t.removeEventListener("success", o), t.removeEventListener("error", l);
      },
      o = () => {
        r(or(t.result)), i();
      },
      l = () => {
        n(t.error), i();
      };
    t.addEventListener("success", o), t.addEventListener("error", l);
  });
  return (
    e
      .then((r) => {
        r instanceof IDBCursor && zc.set(r, t);
      })
      .catch(() => {}),
    zs.set(e, t),
    e
  );
}
function ch(t) {
  if (vs.has(t)) return;
  const e = new Promise((r, n) => {
    const i = () => {
        t.removeEventListener("complete", o),
          t.removeEventListener("error", l),
          t.removeEventListener("abort", l);
      },
      o = () => {
        r(), i();
      },
      l = () => {
        n(t.error || new DOMException("AbortError", "AbortError")), i();
      };
    t.addEventListener("complete", o),
      t.addEventListener("error", l),
      t.addEventListener("abort", l);
  });
  vs.set(t, e);
}
let As = {
  get(t, e, r) {
    if (t instanceof IDBTransaction) {
      if (e === "done") return vs.get(t);
      if (e === "objectStoreNames") return t.objectStoreNames || Lc.get(t);
      if (e === "store")
        return r.objectStoreNames[1]
          ? void 0
          : r.objectStore(r.objectStoreNames[0]);
    }
    return or(t[e]);
  },
  set(t, e, r) {
    return (t[e] = r), !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store")
      ? !0
      : e in t;
  },
};
function uh(t) {
  As = t(As);
}
function fh(t) {
  return t === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (e, ...r) {
        const n = t.call(Qi(this), e, ...r);
        return Lc.set(n, e.sort ? e.sort() : [e]), or(n);
      }
    : oh().includes(t)
      ? function (...e) {
          return t.apply(Qi(this), e), or(zc.get(this));
        }
      : function (...e) {
          return or(t.apply(Qi(this), e));
        };
}
function lh(t) {
  return typeof t == "function"
    ? fh(t)
    : (t instanceof IDBTransaction && ch(t),
      ih(t, sh()) ? new Proxy(t, As) : t);
}
function or(t) {
  if (t instanceof IDBRequest) return ah(t);
  if (Ji.has(t)) return Ji.get(t);
  const e = lh(t);
  return e !== t && (Ji.set(t, e), zs.set(e, t)), e;
}
const Qi = (t) => zs.get(t);
function hh(t, e, { blocked: r, upgrade: n, blocking: i, terminated: o } = {}) {
  const l = indexedDB.open(t, e),
    a = or(l);
  return (
    n &&
      l.addEventListener("upgradeneeded", (p) => {
        n(or(l.result), p.oldVersion, p.newVersion, or(l.transaction), p);
      }),
    r && l.addEventListener("blocked", (p) => r(p.oldVersion, p.newVersion, p)),
    a
      .then((p) => {
        o && p.addEventListener("close", () => o()),
          i &&
            p.addEventListener("versionchange", (g) =>
              i(g.oldVersion, g.newVersion, g),
            );
      })
      .catch(() => {}),
    a
  );
}
const dh = ["get", "getKey", "getAll", "getAllKeys", "count"],
  ph = ["put", "add", "delete", "clear"],
  es = new Map();
function jo(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string")) return;
  if (es.get(e)) return es.get(e);
  const r = e.replace(/FromIndex$/, ""),
    n = e !== r,
    i = ph.includes(r);
  if (
    !(r in (n ? IDBIndex : IDBObjectStore).prototype) ||
    !(i || dh.includes(r))
  )
    return;
  const o = async function (l, ...a) {
    const p = this.transaction(l, i ? "readwrite" : "readonly");
    let g = p.store;
    return (
      n && (g = g.index(a.shift())),
      (await Promise.all([g[r](...a), i && p.done]))[0]
    );
  };
  return es.set(e, o), o;
}
uh((t) => ({
  ...t,
  get: (e, r, n) => jo(e, r) || t.get(e, r, n),
  has: (e, r) => !!jo(e, r) || t.has(e, r),
}));
const Wc = "auth-client-db",
  Yc = "ic-keyval",
  yh = async (t = Wc, e = Yc, r) => (
    Zc &&
      localStorage != null &&
      localStorage.getItem(nr) &&
      (localStorage.removeItem(nr), localStorage.removeItem(er)),
    await hh(t, r, {
      upgrade: (n) => {
        n.objectStoreNames.contains(e) && n.clear(e), n.createObjectStore(e);
      },
    })
  );
async function wh(t, e, r) {
  return await t.get(e, r);
}
async function gh(t, e, r, n) {
  return await t.put(e, n, r);
}
async function mh(t, e, r) {
  return await t.delete(e, r);
}
class Ls {
  constructor(e, r) {
    (this._db = e), (this._storeName = r);
  }
  static async create(e) {
    const { dbName: r = Wc, storeName: n = Yc, version: i = Eh } = e ?? {},
      o = await yh(r, n, i);
    return new Ls(o, n);
  }
  async set(e, r) {
    return await gh(this._db, this._storeName, e, r);
  }
  async get(e) {
    var r;
    return (r = await wh(this._db, this._storeName, e)) !== null && r !== void 0
      ? r
      : null;
  }
  async remove(e) {
    return await mh(this._db, this._storeName, e);
  }
}
var bh = function (t, e, r, n, i) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !i)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
  },
  _h = function (t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  },
  ni;
const er = "identity",
  nr = "delegation",
  xh = "iv",
  Eh = 1,
  Zc = typeof window < "u";
class vh {
  constructor(e = "ic-", r) {
    (this.prefix = e), (this._localStorage = r);
  }
  get(e) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + e));
  }
  set(e, r) {
    return (
      this._getLocalStorage().setItem(this.prefix + e, r), Promise.resolve()
    );
  }
  remove(e) {
    return (
      this._getLocalStorage().removeItem(this.prefix + e), Promise.resolve()
    );
  }
  _getLocalStorage() {
    if (this._localStorage) return this._localStorage;
    const e =
      typeof window > "u"
        ? typeof global > "u"
          ? typeof self > "u"
            ? void 0
            : self.localStorage
          : global.localStorage
        : window.localStorage;
    if (!e) throw new Error("Could not find local storage.");
    return e;
  }
}
class Ah {
  constructor(e) {
    ni.set(this, void 0), bh(this, ni, e ?? {}, "f");
  }
  get _db() {
    return new Promise((e) => {
      if (this.initializedDb) {
        e(this.initializedDb);
        return;
      }
      Ls.create(_h(this, ni, "f")).then((r) => {
        (this.initializedDb = r), e(r);
      });
    });
  }
  async get(e) {
    return await (await this._db).get(e);
  }
  async set(e, r) {
    await (await this._db).set(e, r);
  }
  async remove(e) {
    await (await this._db).remove(e);
  }
}
ni = new WeakMap();
const Bh = "https://identity.ic0.app",
  Sh = "#authorize",
  ts = "ECDSA",
  rs = "Ed25519",
  Th = 500,
  Nh = "UserInterrupt";
class Zh {
  constructor(e, r, n, i, o, l, a, p) {
    (this._identity = e),
      (this._key = r),
      (this._chain = n),
      (this._storage = i),
      (this.idleManager = o),
      (this._createOptions = l),
      (this._idpWindow = a),
      (this._eventHandler = p),
      this._registerDefaultIdleCallback();
  }
  static async create(e = {}) {
    var r, n, i;
    const o = (r = e.storage) !== null && r !== void 0 ? r : new Ah(),
      l = (n = e.keyType) !== null && n !== void 0 ? n : ts;
    let a = null;
    if (e.identity) a = e.identity;
    else {
      let S = await o.get(er);
      if (!S && Zc)
        try {
          const I = new vh(),
            A = await I.get(nr),
            w = await I.get(er);
          A &&
            w &&
            l === ts &&
            (console.log(
              "Discovered an identity stored in localstorage. Migrating to IndexedDB",
            ),
            await o.set(nr, A),
            await o.set(er, w),
            (S = A),
            await I.remove(nr),
            await I.remove(er));
        } catch (I) {
          console.error("error while attempting to recover localstorage: " + I);
        }
      if (S)
        try {
          typeof S == "object"
            ? l === rs && typeof S == "string"
              ? (a = await ir.fromJSON(S))
              : (a = await wi.fromKeyPair(S))
            : typeof S == "string" && (a = ir.fromJSON(S));
        } catch {}
    }
    let p = new ui(),
      g = null;
    if (a)
      try {
        const S = await o.get(nr);
        if (typeof S == "object" && S !== null)
          throw new Error(
            "Delegation chain is incorrectly stored. A delegation chain should be stored as a string.",
          );
        e.identity
          ? (p = e.identity)
          : S &&
            ((g = gi.fromJSON(S)),
            nh(g)
              ? "toDer" in a
                ? (p = mi.fromDelegation(a, g))
                : (p = Mo.fromDelegation(a, g))
              : (await ns(o), (a = null)));
      } catch (S) {
        console.error(S), await ns(o), (a = null);
      }
    let E;
    return (
      !((i = e.idleOptions) === null || i === void 0) && i.disableIdle
        ? (E = void 0)
        : (g || e.identity) && (E = qo.create(e.idleOptions)),
      a ||
        (l === rs
          ? ((a = await ir.generate()),
            await o.set(er, JSON.stringify(a.toJSON())))
          : (e.storage &&
              l === ts &&
              console.warn(
                `You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${rs}' as the key type, as it can serialize to a string`,
              ),
            (a = await wi.generate()),
            await o.set(er, a.getKeyPair()))),
      new this(p, a, g, o, E, e)
    );
  }
  _registerDefaultIdleCallback() {
    var e, r;
    const n =
      (e = this._createOptions) === null || e === void 0
        ? void 0
        : e.idleOptions;
    !n?.onIdle &&
      !n?.disableDefaultIdleCallback &&
      ((r = this.idleManager) === null ||
        r === void 0 ||
        r.registerCallback(() => {
          this.logout(), location.reload();
        }));
  }
  async _handleSuccess(e, r) {
    var n, i;
    const o = e.delegations.map((g) => ({
        delegation: new Ks(
          g.delegation.pubkey,
          g.delegation.expiration,
          g.delegation.targets,
        ),
        signature: g.signature.buffer,
      })),
      l = gi.fromDelegations(o, e.userPublicKey.buffer),
      a = this._key;
    if (!a) return;
    (this._chain = l),
      "toDer" in a
        ? (this._identity = mi.fromDelegation(a, this._chain))
        : (this._identity = Mo.fromDelegation(a, this._chain)),
      (n = this._idpWindow) === null || n === void 0 || n.close();
    const p =
      (i = this._createOptions) === null || i === void 0
        ? void 0
        : i.idleOptions;
    !this.idleManager &&
      !p?.disableIdle &&
      ((this.idleManager = qo.create(p)), this._registerDefaultIdleCallback()),
      this._removeEventListener(),
      delete this._idpWindow,
      this._chain &&
        (await this._storage.set(nr, JSON.stringify(this._chain.toJSON()))),
      r?.(e);
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return (
      !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null
    );
  }
  async login(e) {
    var r, n, i, o;
    const l = BigInt(8) * BigInt(36e11),
      a = new URL(
        ((r = e?.identityProvider) === null || r === void 0
          ? void 0
          : r.toString()) || Bh,
      );
    (a.hash = Sh),
      (n = this._idpWindow) === null || n === void 0 || n.close(),
      this._removeEventListener(),
      (this._eventHandler = this._getEventHandler(
        a,
        Object.assign(
          {
            maxTimeToLive:
              (i = e?.maxTimeToLive) !== null && i !== void 0 ? i : l,
          },
          e,
        ),
      )),
      window.addEventListener("message", this._eventHandler),
      (this._idpWindow =
        (o = window.open(
          a.toString(),
          "idpWindow",
          e?.windowOpenerFeatures,
        )) !== null && o !== void 0
          ? o
          : void 0);
    const p = () => {
      this._idpWindow &&
        (this._idpWindow.closed
          ? this._handleFailure(Nh, e?.onError)
          : setTimeout(p, Th));
    };
    p();
  }
  _getEventHandler(e, r) {
    return async (n) => {
      var i, o, l;
      if (n.origin !== e.origin) return;
      const a = n.data;
      switch (a.kind) {
        case "authorize-ready": {
          const p = Object.assign(
            {
              kind: "authorize-client",
              sessionPublicKey: new Uint8Array(
                (i = this._key) === null || i === void 0
                  ? void 0
                  : i.getPublicKey().toDer(),
              ),
              maxTimeToLive: r?.maxTimeToLive,
              allowPinAuthentication: r?.allowPinAuthentication,
              derivationOrigin:
                (o = r?.derivationOrigin) === null || o === void 0
                  ? void 0
                  : o.toString(),
            },
            r?.customValues,
          );
          (l = this._idpWindow) === null ||
            l === void 0 ||
            l.postMessage(p, e.origin);
          break;
        }
        case "authorize-client-success":
          try {
            await this._handleSuccess(a, r?.onSuccess);
          } catch (p) {
            this._handleFailure(p.message, r?.onError);
          }
          break;
        case "authorize-client-failure":
          this._handleFailure(a.text, r?.onError);
          break;
      }
    };
  }
  _handleFailure(e, r) {
    var n;
    (n = this._idpWindow) === null || n === void 0 || n.close(),
      r?.(e),
      this._removeEventListener(),
      delete this._idpWindow;
  }
  _removeEventListener() {
    this._eventHandler &&
      window.removeEventListener("message", this._eventHandler),
      (this._eventHandler = void 0);
  }
  async logout(e = {}) {
    if (
      (await ns(this._storage),
      (this._identity = new ui()),
      (this._chain = null),
      e.returnTo)
    )
      try {
        window.history.pushState({}, "", e.returnTo);
      } catch {
        window.location.href = e.returnTo;
      }
  }
}
async function ns(t) {
  await t.remove(er), await t.remove(nr), await t.remove(xh);
}
var Ih = ((t) => (
  (t[(t.FractionalMoreThan8Decimals = 0)] = "FractionalMoreThan8Decimals"),
  (t[(t.InvalidFormat = 1)] = "InvalidFormat"),
  (t[(t.FractionalTooManyDecimals = 2)] = "FractionalTooManyDecimals"),
  t
))(Ih || {});
BigInt(1e8);
var Dh = (t) => t == null,
  Ho = "abcdefghijklmnopqrstuvwxyz234567",
  ln = Object.create(null);
for (let t = 0; t < Ho.length; t++) ln[Ho[t]] = t;
ln[0] = ln.o;
ln[1] = ln.i;
export { Zh as A, qh as D, Qr as H, js as a, Dh as b, Vh as c, jh as u };

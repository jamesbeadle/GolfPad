BigInt(60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14);
const ws = 1e3;
var Ee =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function ys(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var gs = {},
  ve = {};
ve.byteLength = bs;
ve.toByteArray = _s;
ve.fromByteArray = Bs;
var qt = [],
  Gt = [],
  xs = typeof Uint8Array < "u" ? Uint8Array : Array,
  ar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var pe = 0, ms = ar.length; pe < ms; ++pe)
  (qt[pe] = ar[pe]), (Gt[ar.charCodeAt(pe)] = pe);
Gt[45] = 62;
Gt[95] = 63;
function Jn(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = e.indexOf("=");
  r === -1 && (r = t);
  var s = r === t ? 0 : 4 - (r % 4);
  return [r, s];
}
function bs(e) {
  var t = Jn(e),
    r = t[0],
    s = t[1];
  return ((r + s) * 3) / 4 - s;
}
function Es(e, t, r) {
  return ((t + r) * 3) / 4 - r;
}
function _s(e) {
  var t,
    r = Jn(e),
    s = r[0],
    u = r[1],
    d = new xs(Es(e, s, u)),
    g = 0,
    c = u > 0 ? s - 4 : s,
    b;
  for (b = 0; b < c; b += 4)
    (t =
      (Gt[e.charCodeAt(b)] << 18) |
      (Gt[e.charCodeAt(b + 1)] << 12) |
      (Gt[e.charCodeAt(b + 2)] << 6) |
      Gt[e.charCodeAt(b + 3)]),
      (d[g++] = (t >> 16) & 255),
      (d[g++] = (t >> 8) & 255),
      (d[g++] = t & 255);
  return (
    u === 2 &&
      ((t = (Gt[e.charCodeAt(b)] << 2) | (Gt[e.charCodeAt(b + 1)] >> 4)),
      (d[g++] = t & 255)),
    u === 1 &&
      ((t =
        (Gt[e.charCodeAt(b)] << 10) |
        (Gt[e.charCodeAt(b + 1)] << 4) |
        (Gt[e.charCodeAt(b + 2)] >> 2)),
      (d[g++] = (t >> 8) & 255),
      (d[g++] = t & 255)),
    d
  );
}
function Is(e) {
  return (
    qt[(e >> 18) & 63] + qt[(e >> 12) & 63] + qt[(e >> 6) & 63] + qt[e & 63]
  );
}
function As(e, t, r) {
  for (var s, u = [], d = t; d < r; d += 3)
    (s =
      ((e[d] << 16) & 16711680) + ((e[d + 1] << 8) & 65280) + (e[d + 2] & 255)),
      u.push(Is(s));
  return u.join("");
}
function Bs(e) {
  for (
    var t, r = e.length, s = r % 3, u = [], d = 16383, g = 0, c = r - s;
    g < c;
    g += d
  )
    u.push(As(e, g, g + d > c ? c : g + d));
  return (
    s === 1
      ? ((t = e[r - 1]), u.push(qt[t >> 2] + qt[(t << 4) & 63] + "=="))
      : s === 2 &&
        ((t = (e[r - 2] << 8) + e[r - 1]),
        u.push(qt[t >> 10] + qt[(t >> 4) & 63] + qt[(t << 2) & 63] + "=")),
    u.join("")
  );
}
var Re = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ Re.read =
  function (e, t, r, s, u) {
    var d,
      g,
      c = u * 8 - s - 1,
      b = (1 << c) - 1,
      S = b >> 1,
      N = -7,
      L = r ? u - 1 : 0,
      O = r ? -1 : 1,
      P = e[t + L];
    for (
      L += O, d = P & ((1 << -N) - 1), P >>= -N, N += c;
      N > 0;
      d = d * 256 + e[t + L], L += O, N -= 8
    );
    for (
      g = d & ((1 << -N) - 1), d >>= -N, N += s;
      N > 0;
      g = g * 256 + e[t + L], L += O, N -= 8
    );
    if (d === 0) d = 1 - S;
    else {
      if (d === b) return g ? NaN : (P ? -1 : 1) * (1 / 0);
      (g = g + Math.pow(2, s)), (d = d - S);
    }
    return (P ? -1 : 1) * g * Math.pow(2, d - s);
  };
Re.write = function (e, t, r, s, u, d) {
  var g,
    c,
    b,
    S = d * 8 - u - 1,
    N = (1 << S) - 1,
    L = N >> 1,
    O = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    P = s ? 0 : d - 1,
    q = s ? 1 : -1,
    W = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
  for (
    t = Math.abs(t),
      isNaN(t) || t === 1 / 0
        ? ((c = isNaN(t) ? 1 : 0), (g = N))
        : ((g = Math.floor(Math.log(t) / Math.LN2)),
          t * (b = Math.pow(2, -g)) < 1 && (g--, (b *= 2)),
          g + L >= 1 ? (t += O / b) : (t += O * Math.pow(2, 1 - L)),
          t * b >= 2 && (g++, (b /= 2)),
          g + L >= N
            ? ((c = 0), (g = N))
            : g + L >= 1
              ? ((c = (t * b - 1) * Math.pow(2, u)), (g = g + L))
              : ((c = t * Math.pow(2, L - 1) * Math.pow(2, u)), (g = 0)));
    u >= 8;
    e[r + P] = c & 255, P += q, c /= 256, u -= 8
  );
  for (
    g = (g << u) | c, S += u;
    S > 0;
    e[r + P] = g & 255, P += q, g /= 256, S -= 8
  );
  e[r + P - q] |= W * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  const t = ve,
    r = Re,
    s =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (e.Buffer = c), (e.SlowBuffer = at), (e.INSPECT_MAX_BYTES = 50);
  const u = 2147483647;
  (e.kMaxLength = u),
    (c.TYPED_ARRAY_SUPPORT = d()),
    !c.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function d() {
    try {
      const h = new Uint8Array(1),
        o = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(o, Uint8Array.prototype),
        Object.setPrototypeOf(h, o),
        h.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (c.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(c.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (c.isBuffer(this)) return this.byteOffset;
      },
    });
  function g(h) {
    if (h > u)
      throw new RangeError(
        'The value "' + h + '" is invalid for option "size"',
      );
    const o = new Uint8Array(h);
    return Object.setPrototypeOf(o, c.prototype), o;
  }
  function c(h, o, a) {
    if (typeof h == "number") {
      if (typeof o == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return L(h);
    }
    return b(h, o, a);
  }
  c.poolSize = 8192;
  function b(h, o, a) {
    if (typeof h == "string") return O(h, o);
    if (ArrayBuffer.isView(h)) return q(h);
    if (h == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof h,
      );
    if (
      F(h, ArrayBuffer) ||
      (h && F(h.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (F(h, SharedArrayBuffer) || (h && F(h.buffer, SharedArrayBuffer))))
    )
      return W(h, o, a);
    if (typeof h == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    const m = h.valueOf && h.valueOf();
    if (m != null && m !== h) return c.from(m, o, a);
    const A = lt(h);
    if (A) return A;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof h[Symbol.toPrimitive] == "function"
    )
      return c.from(h[Symbol.toPrimitive]("string"), o, a);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof h,
    );
  }
  (c.from = function (h, o, a) {
    return b(h, o, a);
  }),
    Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(c, Uint8Array);
  function S(h) {
    if (typeof h != "number")
      throw new TypeError('"size" argument must be of type number');
    if (h < 0)
      throw new RangeError(
        'The value "' + h + '" is invalid for option "size"',
      );
  }
  function N(h, o, a) {
    return (
      S(h),
      h <= 0
        ? g(h)
        : o !== void 0
          ? typeof a == "string"
            ? g(h).fill(o, a)
            : g(h).fill(o)
          : g(h)
    );
  }
  c.alloc = function (h, o, a) {
    return N(h, o, a);
  };
  function L(h) {
    return S(h), g(h < 0 ? 0 : Et(h) | 0);
  }
  (c.allocUnsafe = function (h) {
    return L(h);
  }),
    (c.allocUnsafeSlow = function (h) {
      return L(h);
    });
  function O(h, o) {
    if (((typeof o != "string" || o === "") && (o = "utf8"), !c.isEncoding(o)))
      throw new TypeError("Unknown encoding: " + o);
    const a = K(h, o) | 0;
    let m = g(a);
    const A = m.write(h, o);
    return A !== a && (m = m.slice(0, A)), m;
  }
  function P(h) {
    const o = h.length < 0 ? 0 : Et(h.length) | 0,
      a = g(o);
    for (let m = 0; m < o; m += 1) a[m] = h[m] & 255;
    return a;
  }
  function q(h) {
    if (F(h, Uint8Array)) {
      const o = new Uint8Array(h);
      return W(o.buffer, o.byteOffset, o.byteLength);
    }
    return P(h);
  }
  function W(h, o, a) {
    if (o < 0 || h.byteLength < o)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (h.byteLength < o + (a || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let m;
    return (
      o === void 0 && a === void 0
        ? (m = new Uint8Array(h))
        : a === void 0
          ? (m = new Uint8Array(h, o))
          : (m = new Uint8Array(h, o, a)),
      Object.setPrototypeOf(m, c.prototype),
      m
    );
  }
  function lt(h) {
    if (c.isBuffer(h)) {
      const o = Et(h.length) | 0,
        a = g(o);
      return a.length === 0 || h.copy(a, 0, 0, o), a;
    }
    if (h.length !== void 0)
      return typeof h.length != "number" || D(h.length) ? g(0) : P(h);
    if (h.type === "Buffer" && Array.isArray(h.data)) return P(h.data);
  }
  function Et(h) {
    if (h >= u)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          u.toString(16) +
          " bytes",
      );
    return h | 0;
  }
  function at(h) {
    return +h != h && (h = 0), c.alloc(+h);
  }
  (c.isBuffer = function (o) {
    return o != null && o._isBuffer === !0 && o !== c.prototype;
  }),
    (c.compare = function (o, a) {
      if (
        (F(o, Uint8Array) && (o = c.from(o, o.offset, o.byteLength)),
        F(a, Uint8Array) && (a = c.from(a, a.offset, a.byteLength)),
        !c.isBuffer(o) || !c.isBuffer(a))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (o === a) return 0;
      let m = o.length,
        A = a.length;
      for (let R = 0, v = Math.min(m, A); R < v; ++R)
        if (o[R] !== a[R]) {
          (m = o[R]), (A = a[R]);
          break;
        }
      return m < A ? -1 : A < m ? 1 : 0;
    }),
    (c.isEncoding = function (o) {
      switch (String(o).toLowerCase()) {
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
    (c.concat = function (o, a) {
      if (!Array.isArray(o))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (o.length === 0) return c.alloc(0);
      let m;
      if (a === void 0) for (a = 0, m = 0; m < o.length; ++m) a += o[m].length;
      const A = c.allocUnsafe(a);
      let R = 0;
      for (m = 0; m < o.length; ++m) {
        let v = o[m];
        if (F(v, Uint8Array))
          R + v.length > A.length
            ? (c.isBuffer(v) || (v = c.from(v)), v.copy(A, R))
            : Uint8Array.prototype.set.call(A, v, R);
        else if (c.isBuffer(v)) v.copy(A, R);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        R += v.length;
      }
      return A;
    });
  function K(h, o) {
    if (c.isBuffer(h)) return h.length;
    if (ArrayBuffer.isView(h) || F(h, ArrayBuffer)) return h.byteLength;
    if (typeof h != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof h,
      );
    const a = h.length,
      m = arguments.length > 2 && arguments[2] === !0;
    if (!m && a === 0) return 0;
    let A = !1;
    for (;;)
      switch (o) {
        case "ascii":
        case "latin1":
        case "binary":
          return a;
        case "utf8":
        case "utf-8":
          return n(h).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return a * 2;
        case "hex":
          return a >>> 1;
        case "base64":
          return p(h).length;
        default:
          if (A) return m ? -1 : n(h).length;
          (o = ("" + o).toLowerCase()), (A = !0);
      }
  }
  c.byteLength = K;
  function Ut(h, o, a) {
    let m = !1;
    if (
      ((o === void 0 || o < 0) && (o = 0),
      o > this.length ||
        ((a === void 0 || a > this.length) && (a = this.length), a <= 0) ||
        ((a >>>= 0), (o >>>= 0), a <= o))
    )
      return "";
    for (h || (h = "utf8"); ; )
      switch (h) {
        case "hex":
          return j(this, o, a);
        case "utf8":
        case "utf-8":
          return St(this, o, a);
        case "ascii":
          return M(this, o, a);
        case "latin1":
        case "binary":
          return k(this, o, a);
        case "base64":
          return ft(this, o, a);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Q(this, o, a);
        default:
          if (m) throw new TypeError("Unknown encoding: " + h);
          (h = (h + "").toLowerCase()), (m = !0);
      }
  }
  c.prototype._isBuffer = !0;
  function ut(h, o, a) {
    const m = h[o];
    (h[o] = h[a]), (h[a] = m);
  }
  (c.prototype.swap16 = function () {
    const o = this.length;
    if (o % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let a = 0; a < o; a += 2) ut(this, a, a + 1);
    return this;
  }),
    (c.prototype.swap32 = function () {
      const o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let a = 0; a < o; a += 4) ut(this, a, a + 3), ut(this, a + 1, a + 2);
      return this;
    }),
    (c.prototype.swap64 = function () {
      const o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let a = 0; a < o; a += 8)
        ut(this, a, a + 7),
          ut(this, a + 1, a + 6),
          ut(this, a + 2, a + 5),
          ut(this, a + 3, a + 4);
      return this;
    }),
    (c.prototype.toString = function () {
      const o = this.length;
      return o === 0
        ? ""
        : arguments.length === 0
          ? St(this, 0, o)
          : Ut.apply(this, arguments);
    }),
    (c.prototype.toLocaleString = c.prototype.toString),
    (c.prototype.equals = function (o) {
      if (!c.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
      return this === o ? !0 : c.compare(this, o) === 0;
    }),
    (c.prototype.inspect = function () {
      let o = "";
      const a = e.INSPECT_MAX_BYTES;
      return (
        (o = this.toString("hex", 0, a)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > a && (o += " ... "),
        "<Buffer " + o + ">"
      );
    }),
    s && (c.prototype[s] = c.prototype.inspect),
    (c.prototype.compare = function (o, a, m, A, R) {
      if (
        (F(o, Uint8Array) && (o = c.from(o, o.offset, o.byteLength)),
        !c.isBuffer(o))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof o,
        );
      if (
        (a === void 0 && (a = 0),
        m === void 0 && (m = o ? o.length : 0),
        A === void 0 && (A = 0),
        R === void 0 && (R = this.length),
        a < 0 || m > o.length || A < 0 || R > this.length)
      )
        throw new RangeError("out of range index");
      if (A >= R && a >= m) return 0;
      if (A >= R) return -1;
      if (a >= m) return 1;
      if (((a >>>= 0), (m >>>= 0), (A >>>= 0), (R >>>= 0), this === o))
        return 0;
      let v = R - A,
        et = m - a;
      const ht = Math.min(v, et),
        st = this.slice(A, R),
        tt = o.slice(a, m);
      for (let bt = 0; bt < ht; ++bt)
        if (st[bt] !== tt[bt]) {
          (v = st[bt]), (et = tt[bt]);
          break;
        }
      return v < et ? -1 : et < v ? 1 : 0;
    });
  function J(h, o, a, m, A) {
    if (h.length === 0) return -1;
    if (
      (typeof a == "string"
        ? ((m = a), (a = 0))
        : a > 2147483647
          ? (a = 2147483647)
          : a < -2147483648 && (a = -2147483648),
      (a = +a),
      D(a) && (a = A ? 0 : h.length - 1),
      a < 0 && (a = h.length + a),
      a >= h.length)
    ) {
      if (A) return -1;
      a = h.length - 1;
    } else if (a < 0)
      if (A) a = 0;
      else return -1;
    if ((typeof o == "string" && (o = c.from(o, m)), c.isBuffer(o)))
      return o.length === 0 ? -1 : X(h, o, a, m, A);
    if (typeof o == "number")
      return (
        (o = o & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? A
            ? Uint8Array.prototype.indexOf.call(h, o, a)
            : Uint8Array.prototype.lastIndexOf.call(h, o, a)
          : X(h, [o], a, m, A)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function X(h, o, a, m, A) {
    let R = 1,
      v = h.length,
      et = o.length;
    if (
      m !== void 0 &&
      ((m = String(m).toLowerCase()),
      m === "ucs2" || m === "ucs-2" || m === "utf16le" || m === "utf-16le")
    ) {
      if (h.length < 2 || o.length < 2) return -1;
      (R = 2), (v /= 2), (et /= 2), (a /= 2);
    }
    function ht(tt, bt) {
      return R === 1 ? tt[bt] : tt.readUInt16BE(bt * R);
    }
    let st;
    if (A) {
      let tt = -1;
      for (st = a; st < v; st++)
        if (ht(h, st) === ht(o, tt === -1 ? 0 : st - tt)) {
          if ((tt === -1 && (tt = st), st - tt + 1 === et)) return tt * R;
        } else tt !== -1 && (st -= st - tt), (tt = -1);
    } else
      for (a + et > v && (a = v - et), st = a; st >= 0; st--) {
        let tt = !0;
        for (let bt = 0; bt < et; bt++)
          if (ht(h, st + bt) !== ht(o, bt)) {
            tt = !1;
            break;
          }
        if (tt) return st;
      }
    return -1;
  }
  (c.prototype.includes = function (o, a, m) {
    return this.indexOf(o, a, m) !== -1;
  }),
    (c.prototype.indexOf = function (o, a, m) {
      return J(this, o, a, m, !0);
    }),
    (c.prototype.lastIndexOf = function (o, a, m) {
      return J(this, o, a, m, !1);
    });
  function nt(h, o, a, m) {
    a = Number(a) || 0;
    const A = h.length - a;
    m ? ((m = Number(m)), m > A && (m = A)) : (m = A);
    const R = o.length;
    m > R / 2 && (m = R / 2);
    let v;
    for (v = 0; v < m; ++v) {
      const et = parseInt(o.substr(v * 2, 2), 16);
      if (D(et)) return v;
      h[a + v] = et;
    }
    return v;
  }
  function it(h, o, a, m) {
    return E(n(o, h.length - a), h, a, m);
  }
  function C(h, o, a, m) {
    return E(i(o), h, a, m);
  }
  function xt(h, o, a, m) {
    return E(p(o), h, a, m);
  }
  function ct(h, o, a, m) {
    return E(l(o, h.length - a), h, a, m);
  }
  (c.prototype.write = function (o, a, m, A) {
    if (a === void 0) (A = "utf8"), (m = this.length), (a = 0);
    else if (m === void 0 && typeof a == "string")
      (A = a), (m = this.length), (a = 0);
    else if (isFinite(a))
      (a = a >>> 0),
        isFinite(m)
          ? ((m = m >>> 0), A === void 0 && (A = "utf8"))
          : ((A = m), (m = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    const R = this.length - a;
    if (
      ((m === void 0 || m > R) && (m = R),
      (o.length > 0 && (m < 0 || a < 0)) || a > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    A || (A = "utf8");
    let v = !1;
    for (;;)
      switch (A) {
        case "hex":
          return nt(this, o, a, m);
        case "utf8":
        case "utf-8":
          return it(this, o, a, m);
        case "ascii":
        case "latin1":
        case "binary":
          return C(this, o, a, m);
        case "base64":
          return xt(this, o, a, m);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ct(this, o, a, m);
        default:
          if (v) throw new TypeError("Unknown encoding: " + A);
          (A = ("" + A).toLowerCase()), (v = !0);
      }
  }),
    (c.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function ft(h, o, a) {
    return o === 0 && a === h.length
      ? t.fromByteArray(h)
      : t.fromByteArray(h.slice(o, a));
  }
  function St(h, o, a) {
    a = Math.min(h.length, a);
    const m = [];
    let A = o;
    for (; A < a; ) {
      const R = h[A];
      let v = null,
        et = R > 239 ? 4 : R > 223 ? 3 : R > 191 ? 2 : 1;
      if (A + et <= a) {
        let ht, st, tt, bt;
        switch (et) {
          case 1:
            R < 128 && (v = R);
            break;
          case 2:
            (ht = h[A + 1]),
              (ht & 192) === 128 &&
                ((bt = ((R & 31) << 6) | (ht & 63)), bt > 127 && (v = bt));
            break;
          case 3:
            (ht = h[A + 1]),
              (st = h[A + 2]),
              (ht & 192) === 128 &&
                (st & 192) === 128 &&
                ((bt = ((R & 15) << 12) | ((ht & 63) << 6) | (st & 63)),
                bt > 2047 && (bt < 55296 || bt > 57343) && (v = bt));
            break;
          case 4:
            (ht = h[A + 1]),
              (st = h[A + 2]),
              (tt = h[A + 3]),
              (ht & 192) === 128 &&
                (st & 192) === 128 &&
                (tt & 192) === 128 &&
                ((bt =
                  ((R & 15) << 18) |
                  ((ht & 63) << 12) |
                  ((st & 63) << 6) |
                  (tt & 63)),
                bt > 65535 && bt < 1114112 && (v = bt));
        }
      }
      v === null
        ? ((v = 65533), (et = 1))
        : v > 65535 &&
          ((v -= 65536),
          m.push(((v >>> 10) & 1023) | 55296),
          (v = 56320 | (v & 1023))),
        m.push(v),
        (A += et);
    }
    return Z(m);
  }
  const _t = 4096;
  function Z(h) {
    const o = h.length;
    if (o <= _t) return String.fromCharCode.apply(String, h);
    let a = "",
      m = 0;
    for (; m < o; )
      a += String.fromCharCode.apply(String, h.slice(m, (m += _t)));
    return a;
  }
  function M(h, o, a) {
    let m = "";
    a = Math.min(h.length, a);
    for (let A = o; A < a; ++A) m += String.fromCharCode(h[A] & 127);
    return m;
  }
  function k(h, o, a) {
    let m = "";
    a = Math.min(h.length, a);
    for (let A = o; A < a; ++A) m += String.fromCharCode(h[A]);
    return m;
  }
  function j(h, o, a) {
    const m = h.length;
    (!o || o < 0) && (o = 0), (!a || a < 0 || a > m) && (a = m);
    let A = "";
    for (let R = o; R < a; ++R) A += z[h[R]];
    return A;
  }
  function Q(h, o, a) {
    const m = h.slice(o, a);
    let A = "";
    for (let R = 0; R < m.length - 1; R += 2)
      A += String.fromCharCode(m[R] + m[R + 1] * 256);
    return A;
  }
  c.prototype.slice = function (o, a) {
    const m = this.length;
    (o = ~~o),
      (a = a === void 0 ? m : ~~a),
      o < 0 ? ((o += m), o < 0 && (o = 0)) : o > m && (o = m),
      a < 0 ? ((a += m), a < 0 && (a = 0)) : a > m && (a = m),
      a < o && (a = o);
    const A = this.subarray(o, a);
    return Object.setPrototypeOf(A, c.prototype), A;
  };
  function G(h, o, a) {
    if (h % 1 !== 0 || h < 0) throw new RangeError("offset is not uint");
    if (h + o > a)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (c.prototype.readUintLE = c.prototype.readUIntLE =
    function (o, a, m) {
      (o = o >>> 0), (a = a >>> 0), m || G(o, a, this.length);
      let A = this[o],
        R = 1,
        v = 0;
      for (; ++v < a && (R *= 256); ) A += this[o + v] * R;
      return A;
    }),
    (c.prototype.readUintBE = c.prototype.readUIntBE =
      function (o, a, m) {
        (o = o >>> 0), (a = a >>> 0), m || G(o, a, this.length);
        let A = this[o + --a],
          R = 1;
        for (; a > 0 && (R *= 256); ) A += this[o + --a] * R;
        return A;
      }),
    (c.prototype.readUint8 = c.prototype.readUInt8 =
      function (o, a) {
        return (o = o >>> 0), a || G(o, 1, this.length), this[o];
      }),
    (c.prototype.readUint16LE = c.prototype.readUInt16LE =
      function (o, a) {
        return (
          (o = o >>> 0), a || G(o, 2, this.length), this[o] | (this[o + 1] << 8)
        );
      }),
    (c.prototype.readUint16BE = c.prototype.readUInt16BE =
      function (o, a) {
        return (
          (o = o >>> 0), a || G(o, 2, this.length), (this[o] << 8) | this[o + 1]
        );
      }),
    (c.prototype.readUint32LE = c.prototype.readUInt32LE =
      function (o, a) {
        return (
          (o = o >>> 0),
          a || G(o, 4, this.length),
          (this[o] | (this[o + 1] << 8) | (this[o + 2] << 16)) +
            this[o + 3] * 16777216
        );
      }),
    (c.prototype.readUint32BE = c.prototype.readUInt32BE =
      function (o, a) {
        return (
          (o = o >>> 0),
          a || G(o, 4, this.length),
          this[o] * 16777216 +
            ((this[o + 1] << 16) | (this[o + 2] << 8) | this[o + 3])
        );
      }),
    (c.prototype.readBigUInt64LE = V(function (o) {
      (o = o >>> 0), T(o, "offset");
      const a = this[o],
        m = this[o + 7];
      (a === void 0 || m === void 0) && B(o, this.length - 8);
      const A =
          a + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24,
        R = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + m * 2 ** 24;
      return BigInt(A) + (BigInt(R) << BigInt(32));
    })),
    (c.prototype.readBigUInt64BE = V(function (o) {
      (o = o >>> 0), T(o, "offset");
      const a = this[o],
        m = this[o + 7];
      (a === void 0 || m === void 0) && B(o, this.length - 8);
      const A =
          a * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o],
        R = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + m;
      return (BigInt(A) << BigInt(32)) + BigInt(R);
    })),
    (c.prototype.readIntLE = function (o, a, m) {
      (o = o >>> 0), (a = a >>> 0), m || G(o, a, this.length);
      let A = this[o],
        R = 1,
        v = 0;
      for (; ++v < a && (R *= 256); ) A += this[o + v] * R;
      return (R *= 128), A >= R && (A -= Math.pow(2, 8 * a)), A;
    }),
    (c.prototype.readIntBE = function (o, a, m) {
      (o = o >>> 0), (a = a >>> 0), m || G(o, a, this.length);
      let A = a,
        R = 1,
        v = this[o + --A];
      for (; A > 0 && (R *= 256); ) v += this[o + --A] * R;
      return (R *= 128), v >= R && (v -= Math.pow(2, 8 * a)), v;
    }),
    (c.prototype.readInt8 = function (o, a) {
      return (
        (o = o >>> 0),
        a || G(o, 1, this.length),
        this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o]
      );
    }),
    (c.prototype.readInt16LE = function (o, a) {
      (o = o >>> 0), a || G(o, 2, this.length);
      const m = this[o] | (this[o + 1] << 8);
      return m & 32768 ? m | 4294901760 : m;
    }),
    (c.prototype.readInt16BE = function (o, a) {
      (o = o >>> 0), a || G(o, 2, this.length);
      const m = this[o + 1] | (this[o] << 8);
      return m & 32768 ? m | 4294901760 : m;
    }),
    (c.prototype.readInt32LE = function (o, a) {
      return (
        (o = o >>> 0),
        a || G(o, 4, this.length),
        this[o] | (this[o + 1] << 8) | (this[o + 2] << 16) | (this[o + 3] << 24)
      );
    }),
    (c.prototype.readInt32BE = function (o, a) {
      return (
        (o = o >>> 0),
        a || G(o, 4, this.length),
        (this[o] << 24) | (this[o + 1] << 16) | (this[o + 2] << 8) | this[o + 3]
      );
    }),
    (c.prototype.readBigInt64LE = V(function (o) {
      (o = o >>> 0), T(o, "offset");
      const a = this[o],
        m = this[o + 7];
      (a === void 0 || m === void 0) && B(o, this.length - 8);
      const A =
        this[o + 4] + this[o + 5] * 2 ** 8 + this[o + 6] * 2 ** 16 + (m << 24);
      return (
        (BigInt(A) << BigInt(32)) +
        BigInt(
          a + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24,
        )
      );
    })),
    (c.prototype.readBigInt64BE = V(function (o) {
      (o = o >>> 0), T(o, "offset");
      const a = this[o],
        m = this[o + 7];
      (a === void 0 || m === void 0) && B(o, this.length - 8);
      const A =
        (a << 24) + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o];
      return (
        (BigInt(A) << BigInt(32)) +
        BigInt(
          this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + m,
        )
      );
    })),
    (c.prototype.readFloatLE = function (o, a) {
      return (
        (o = o >>> 0), a || G(o, 4, this.length), r.read(this, o, !0, 23, 4)
      );
    }),
    (c.prototype.readFloatBE = function (o, a) {
      return (
        (o = o >>> 0), a || G(o, 4, this.length), r.read(this, o, !1, 23, 4)
      );
    }),
    (c.prototype.readDoubleLE = function (o, a) {
      return (
        (o = o >>> 0), a || G(o, 8, this.length), r.read(this, o, !0, 52, 8)
      );
    }),
    (c.prototype.readDoubleBE = function (o, a) {
      return (
        (o = o >>> 0), a || G(o, 8, this.length), r.read(this, o, !1, 52, 8)
      );
    });
  function $(h, o, a, m, A, R) {
    if (!c.isBuffer(h))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > A || o < R)
      throw new RangeError('"value" argument is out of bounds');
    if (a + m > h.length) throw new RangeError("Index out of range");
  }
  (c.prototype.writeUintLE = c.prototype.writeUIntLE =
    function (o, a, m, A) {
      if (((o = +o), (a = a >>> 0), (m = m >>> 0), !A)) {
        const et = Math.pow(2, 8 * m) - 1;
        $(this, o, a, m, et, 0);
      }
      let R = 1,
        v = 0;
      for (this[a] = o & 255; ++v < m && (R *= 256); )
        this[a + v] = (o / R) & 255;
      return a + m;
    }),
    (c.prototype.writeUintBE = c.prototype.writeUIntBE =
      function (o, a, m, A) {
        if (((o = +o), (a = a >>> 0), (m = m >>> 0), !A)) {
          const et = Math.pow(2, 8 * m) - 1;
          $(this, o, a, m, et, 0);
        }
        let R = m - 1,
          v = 1;
        for (this[a + R] = o & 255; --R >= 0 && (v *= 256); )
          this[a + R] = (o / v) & 255;
        return a + m;
      }),
    (c.prototype.writeUint8 = c.prototype.writeUInt8 =
      function (o, a, m) {
        return (
          (o = +o),
          (a = a >>> 0),
          m || $(this, o, a, 1, 255, 0),
          (this[a] = o & 255),
          a + 1
        );
      }),
    (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
      function (o, a, m) {
        return (
          (o = +o),
          (a = a >>> 0),
          m || $(this, o, a, 2, 65535, 0),
          (this[a] = o & 255),
          (this[a + 1] = o >>> 8),
          a + 2
        );
      }),
    (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
      function (o, a, m) {
        return (
          (o = +o),
          (a = a >>> 0),
          m || $(this, o, a, 2, 65535, 0),
          (this[a] = o >>> 8),
          (this[a + 1] = o & 255),
          a + 2
        );
      }),
    (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
      function (o, a, m) {
        return (
          (o = +o),
          (a = a >>> 0),
          m || $(this, o, a, 4, 4294967295, 0),
          (this[a + 3] = o >>> 24),
          (this[a + 2] = o >>> 16),
          (this[a + 1] = o >>> 8),
          (this[a] = o & 255),
          a + 4
        );
      }),
    (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
      function (o, a, m) {
        return (
          (o = +o),
          (a = a >>> 0),
          m || $(this, o, a, 4, 4294967295, 0),
          (this[a] = o >>> 24),
          (this[a + 1] = o >>> 16),
          (this[a + 2] = o >>> 8),
          (this[a + 3] = o & 255),
          a + 4
        );
      });
  function yt(h, o, a, m, A) {
    _(o, m, A, h, a, 7);
    let R = Number(o & BigInt(4294967295));
    (h[a++] = R),
      (R = R >> 8),
      (h[a++] = R),
      (R = R >> 8),
      (h[a++] = R),
      (R = R >> 8),
      (h[a++] = R);
    let v = Number((o >> BigInt(32)) & BigInt(4294967295));
    return (
      (h[a++] = v),
      (v = v >> 8),
      (h[a++] = v),
      (v = v >> 8),
      (h[a++] = v),
      (v = v >> 8),
      (h[a++] = v),
      a
    );
  }
  function y(h, o, a, m, A) {
    _(o, m, A, h, a, 7);
    let R = Number(o & BigInt(4294967295));
    (h[a + 7] = R),
      (R = R >> 8),
      (h[a + 6] = R),
      (R = R >> 8),
      (h[a + 5] = R),
      (R = R >> 8),
      (h[a + 4] = R);
    let v = Number((o >> BigInt(32)) & BigInt(4294967295));
    return (
      (h[a + 3] = v),
      (v = v >> 8),
      (h[a + 2] = v),
      (v = v >> 8),
      (h[a + 1] = v),
      (v = v >> 8),
      (h[a] = v),
      a + 8
    );
  }
  (c.prototype.writeBigUInt64LE = V(function (o, a = 0) {
    return yt(this, o, a, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (c.prototype.writeBigUInt64BE = V(function (o, a = 0) {
      return y(this, o, a, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (c.prototype.writeIntLE = function (o, a, m, A) {
      if (((o = +o), (a = a >>> 0), !A)) {
        const ht = Math.pow(2, 8 * m - 1);
        $(this, o, a, m, ht - 1, -ht);
      }
      let R = 0,
        v = 1,
        et = 0;
      for (this[a] = o & 255; ++R < m && (v *= 256); )
        o < 0 && et === 0 && this[a + R - 1] !== 0 && (et = 1),
          (this[a + R] = (((o / v) >> 0) - et) & 255);
      return a + m;
    }),
    (c.prototype.writeIntBE = function (o, a, m, A) {
      if (((o = +o), (a = a >>> 0), !A)) {
        const ht = Math.pow(2, 8 * m - 1);
        $(this, o, a, m, ht - 1, -ht);
      }
      let R = m - 1,
        v = 1,
        et = 0;
      for (this[a + R] = o & 255; --R >= 0 && (v *= 256); )
        o < 0 && et === 0 && this[a + R + 1] !== 0 && (et = 1),
          (this[a + R] = (((o / v) >> 0) - et) & 255);
      return a + m;
    }),
    (c.prototype.writeInt8 = function (o, a, m) {
      return (
        (o = +o),
        (a = a >>> 0),
        m || $(this, o, a, 1, 127, -128),
        o < 0 && (o = 255 + o + 1),
        (this[a] = o & 255),
        a + 1
      );
    }),
    (c.prototype.writeInt16LE = function (o, a, m) {
      return (
        (o = +o),
        (a = a >>> 0),
        m || $(this, o, a, 2, 32767, -32768),
        (this[a] = o & 255),
        (this[a + 1] = o >>> 8),
        a + 2
      );
    }),
    (c.prototype.writeInt16BE = function (o, a, m) {
      return (
        (o = +o),
        (a = a >>> 0),
        m || $(this, o, a, 2, 32767, -32768),
        (this[a] = o >>> 8),
        (this[a + 1] = o & 255),
        a + 2
      );
    }),
    (c.prototype.writeInt32LE = function (o, a, m) {
      return (
        (o = +o),
        (a = a >>> 0),
        m || $(this, o, a, 4, 2147483647, -2147483648),
        (this[a] = o & 255),
        (this[a + 1] = o >>> 8),
        (this[a + 2] = o >>> 16),
        (this[a + 3] = o >>> 24),
        a + 4
      );
    }),
    (c.prototype.writeInt32BE = function (o, a, m) {
      return (
        (o = +o),
        (a = a >>> 0),
        m || $(this, o, a, 4, 2147483647, -2147483648),
        o < 0 && (o = 4294967295 + o + 1),
        (this[a] = o >>> 24),
        (this[a + 1] = o >>> 16),
        (this[a + 2] = o >>> 8),
        (this[a + 3] = o & 255),
        a + 4
      );
    }),
    (c.prototype.writeBigInt64LE = V(function (o, a = 0) {
      return yt(
        this,
        o,
        a,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })),
    (c.prototype.writeBigInt64BE = V(function (o, a = 0) {
      return y(
        this,
        o,
        a,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    }));
  function dt(h, o, a, m, A, R) {
    if (a + m > h.length) throw new RangeError("Index out of range");
    if (a < 0) throw new RangeError("Index out of range");
  }
  function mt(h, o, a, m, A) {
    return (
      (o = +o),
      (a = a >>> 0),
      A || dt(h, o, a, 4),
      r.write(h, o, a, m, 23, 4),
      a + 4
    );
  }
  (c.prototype.writeFloatLE = function (o, a, m) {
    return mt(this, o, a, !0, m);
  }),
    (c.prototype.writeFloatBE = function (o, a, m) {
      return mt(this, o, a, !1, m);
    });
  function Tt(h, o, a, m, A) {
    return (
      (o = +o),
      (a = a >>> 0),
      A || dt(h, o, a, 8),
      r.write(h, o, a, m, 52, 8),
      a + 8
    );
  }
  (c.prototype.writeDoubleLE = function (o, a, m) {
    return Tt(this, o, a, !0, m);
  }),
    (c.prototype.writeDoubleBE = function (o, a, m) {
      return Tt(this, o, a, !1, m);
    }),
    (c.prototype.copy = function (o, a, m, A) {
      if (!c.isBuffer(o)) throw new TypeError("argument should be a Buffer");
      if (
        (m || (m = 0),
        !A && A !== 0 && (A = this.length),
        a >= o.length && (a = o.length),
        a || (a = 0),
        A > 0 && A < m && (A = m),
        A === m || o.length === 0 || this.length === 0)
      )
        return 0;
      if (a < 0) throw new RangeError("targetStart out of bounds");
      if (m < 0 || m >= this.length) throw new RangeError("Index out of range");
      if (A < 0) throw new RangeError("sourceEnd out of bounds");
      A > this.length && (A = this.length),
        o.length - a < A - m && (A = o.length - a + m);
      const R = A - m;
      return (
        this === o && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(a, m, A)
          : Uint8Array.prototype.set.call(o, this.subarray(m, A), a),
        R
      );
    }),
    (c.prototype.fill = function (o, a, m, A) {
      if (typeof o == "string") {
        if (
          (typeof a == "string"
            ? ((A = a), (a = 0), (m = this.length))
            : typeof m == "string" && ((A = m), (m = this.length)),
          A !== void 0 && typeof A != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof A == "string" && !c.isEncoding(A))
          throw new TypeError("Unknown encoding: " + A);
        if (o.length === 1) {
          const v = o.charCodeAt(0);
          ((A === "utf8" && v < 128) || A === "latin1") && (o = v);
        }
      } else
        typeof o == "number"
          ? (o = o & 255)
          : typeof o == "boolean" && (o = Number(o));
      if (a < 0 || this.length < a || this.length < m)
        throw new RangeError("Out of range index");
      if (m <= a) return this;
      (a = a >>> 0), (m = m === void 0 ? this.length : m >>> 0), o || (o = 0);
      let R;
      if (typeof o == "number") for (R = a; R < m; ++R) this[R] = o;
      else {
        const v = c.isBuffer(o) ? o : c.from(o, A),
          et = v.length;
        if (et === 0)
          throw new TypeError(
            'The value "' + o + '" is invalid for argument "value"',
          );
        for (R = 0; R < m - a; ++R) this[R + a] = v[R % et];
      }
      return this;
    });
  const H = {};
  function Y(h, o, a) {
    H[h] = class extends a {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: o.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${h}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return h;
      }
      set code(A) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: A,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${h}]: ${this.message}`;
      }
    };
  }
  Y(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (h) {
      return h
        ? `${h} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  ),
    Y(
      "ERR_INVALID_ARG_TYPE",
      function (h, o) {
        return `The "${h}" argument must be of type number. Received type ${typeof o}`;
      },
      TypeError,
    ),
    Y(
      "ERR_OUT_OF_RANGE",
      function (h, o, a) {
        let m = `The value of "${h}" is out of range.`,
          A = a;
        return (
          Number.isInteger(a) && Math.abs(a) > 2 ** 32
            ? (A = w(String(a)))
            : typeof a == "bigint" &&
              ((A = String(a)),
              (a > BigInt(2) ** BigInt(32) || a < -(BigInt(2) ** BigInt(32))) &&
                (A = w(A)),
              (A += "n")),
          (m += ` It must be ${o}. Received ${A}`),
          m
        );
      },
      RangeError,
    );
  function w(h) {
    let o = "",
      a = h.length;
    const m = h[0] === "-" ? 1 : 0;
    for (; a >= m + 4; a -= 3) o = `_${h.slice(a - 3, a)}${o}`;
    return `${h.slice(0, a)}${o}`;
  }
  function x(h, o, a) {
    T(o, "offset"),
      (h[o] === void 0 || h[o + a] === void 0) && B(o, h.length - (a + 1));
  }
  function _(h, o, a, m, A, R) {
    if (h > a || h < o) {
      const v = typeof o == "bigint" ? "n" : "";
      let et;
      throw (
        (o === 0 || o === BigInt(0)
          ? (et = `>= 0${v} and < 2${v} ** ${(R + 1) * 8}${v}`)
          : (et = `>= -(2${v} ** ${(R + 1) * 8 - 1}${v}) and < 2 ** ${(R + 1) * 8 - 1}${v}`),
        new H.ERR_OUT_OF_RANGE("value", et, h))
      );
    }
    x(m, A, R);
  }
  function T(h, o) {
    if (typeof h != "number") throw new H.ERR_INVALID_ARG_TYPE(o, "number", h);
  }
  function B(h, o, a) {
    throw Math.floor(h) !== h
      ? (T(h, a), new H.ERR_OUT_OF_RANGE("offset", "an integer", h))
      : o < 0
        ? new H.ERR_BUFFER_OUT_OF_BOUNDS()
        : new H.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${o}`, h);
  }
  const U = /[^+/0-9A-Za-z-_]/g;
  function f(h) {
    if (((h = h.split("=")[0]), (h = h.trim().replace(U, "")), h.length < 2))
      return "";
    for (; h.length % 4 !== 0; ) h = h + "=";
    return h;
  }
  function n(h, o) {
    o = o || 1 / 0;
    let a;
    const m = h.length;
    let A = null;
    const R = [];
    for (let v = 0; v < m; ++v) {
      if (((a = h.charCodeAt(v)), a > 55295 && a < 57344)) {
        if (!A) {
          if (a > 56319) {
            (o -= 3) > -1 && R.push(239, 191, 189);
            continue;
          } else if (v + 1 === m) {
            (o -= 3) > -1 && R.push(239, 191, 189);
            continue;
          }
          A = a;
          continue;
        }
        if (a < 56320) {
          (o -= 3) > -1 && R.push(239, 191, 189), (A = a);
          continue;
        }
        a = (((A - 55296) << 10) | (a - 56320)) + 65536;
      } else A && (o -= 3) > -1 && R.push(239, 191, 189);
      if (((A = null), a < 128)) {
        if ((o -= 1) < 0) break;
        R.push(a);
      } else if (a < 2048) {
        if ((o -= 2) < 0) break;
        R.push((a >> 6) | 192, (a & 63) | 128);
      } else if (a < 65536) {
        if ((o -= 3) < 0) break;
        R.push((a >> 12) | 224, ((a >> 6) & 63) | 128, (a & 63) | 128);
      } else if (a < 1114112) {
        if ((o -= 4) < 0) break;
        R.push(
          (a >> 18) | 240,
          ((a >> 12) & 63) | 128,
          ((a >> 6) & 63) | 128,
          (a & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return R;
  }
  function i(h) {
    const o = [];
    for (let a = 0; a < h.length; ++a) o.push(h.charCodeAt(a) & 255);
    return o;
  }
  function l(h, o) {
    let a, m, A;
    const R = [];
    for (let v = 0; v < h.length && !((o -= 2) < 0); ++v)
      (a = h.charCodeAt(v)), (m = a >> 8), (A = a % 256), R.push(A), R.push(m);
    return R;
  }
  function p(h) {
    return t.toByteArray(f(h));
  }
  function E(h, o, a, m) {
    let A;
    for (A = 0; A < m && !(A + a >= o.length || A >= h.length); ++A)
      o[A + a] = h[A];
    return A;
  }
  function F(h, o) {
    return (
      h instanceof o ||
      (h != null &&
        h.constructor != null &&
        h.constructor.name != null &&
        h.constructor.name === o.name)
    );
  }
  function D(h) {
    return h !== h;
  }
  const z = (function () {
    const h = "0123456789abcdef",
      o = new Array(256);
    for (let a = 0; a < 16; ++a) {
      const m = a * 16;
      for (let A = 0; A < 16; ++A) o[m + A] = h[a] + h[A];
    }
    return o;
  })();
  function V(h) {
    return typeof BigInt > "u" ? rt : h;
  }
  function rt() {
    throw new Error("BigInt not supported");
  }
})(gs);
var cn;
(function (e) {
  (e[(e.SysFatal = 1)] = "SysFatal"),
    (e[(e.SysTransient = 2)] = "SysTransient"),
    (e[(e.DestinationInvalid = 3)] = "DestinationInvalid"),
    (e[(e.CanisterReject = 4)] = "CanisterReject"),
    (e[(e.CanisterError = 5)] = "CanisterError");
})(cn || (cn = {}));
const Xe = "abcdefghijklmnopqrstuvwxyz234567",
  _e = Object.create(null);
for (let e = 0; e < Xe.length; e++) _e[Xe[e]] = e;
_e[0] = _e.o;
_e[1] = _e.i;
function Ss(e) {
  let t = 0,
    r = 0,
    s = "";
  function u(d) {
    return (
      t < 0 ? (r |= d >> -t) : (r = (d << t) & 248),
      t > 3 ? ((t -= 8), 1) : (t < 4 && ((s += Xe[r >> 3]), (t += 5)), 0)
    );
  }
  for (let d = 0; d < e.length; ) d += u(e[d]);
  return s + (t < 0 ? Xe[r >> 3] : "");
}
function Ts(e) {
  let t = 0,
    r = 0;
  const s = new Uint8Array(((e.length * 4) / 3) | 0);
  let u = 0;
  function d(g) {
    let c = _e[g.toLowerCase()];
    if (c === void 0)
      throw new Error(`Invalid character: ${JSON.stringify(g)}`);
    (c <<= 3),
      (r |= c >>> t),
      (t += 5),
      t >= 8 &&
        ((s[u++] = r), (t -= 8), t > 0 ? (r = (c << (5 - t)) & 255) : (r = 0));
  }
  for (const g of e) d(g);
  return s.slice(0, u);
}
const Us = new Uint32Array([
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
function Ns(e) {
  const t = new Uint8Array(e);
  let r = -1;
  for (let s = 0; s < t.length; s++) {
    const d = (t[s] ^ r) & 255;
    r = Us[d] ^ (r >>> 8);
  }
  return (r ^ -1) >>> 0;
}
function Fs(e) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
  );
}
function Xn(e, ...t) {
  if (!Fs(e)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(
      "Uint8Array expected of length " + t + ", got length=" + e.length,
    );
}
function fn(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function vs(e, t) {
  Xn(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(
      "digestInto() expects output buffer of length at least " + r,
    );
}
const we =
  typeof globalThis == "object" && "crypto" in globalThis
    ? globalThis.crypto
    : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function ur(
  e,
) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Yt(e, t) {
  return (e << (32 - t)) | (e >>> t);
}
function Rs(e) {
  if (typeof e != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof e);
  return new Uint8Array(new TextEncoder().encode(e));
}
function jn(e) {
  return typeof e == "string" && (e = Rs(e)), Xn(e), e;
}
class Ls {
  clone() {
    return this._cloneInto();
  }
}
function Gr(e) {
  const t = (s) => e().update(jn(s)).digest(),
    r = e();
  return (
    (t.outputLen = r.outputLen),
    (t.blockLen = r.blockLen),
    (t.create = () => e()),
    t
  );
}
function Os(e = 32) {
  if (we && typeof we.getRandomValues == "function")
    return we.getRandomValues(new Uint8Array(e));
  if (we && typeof we.randomBytes == "function") return we.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function Ds(e, t, r, s) {
  if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, r, s);
  const u = BigInt(32),
    d = BigInt(4294967295),
    g = Number((r >> u) & d),
    c = Number(r & d),
    b = s ? 4 : 0,
    S = s ? 0 : 4;
  e.setUint32(t + b, g, s), e.setUint32(t + S, c, s);
}
function Ps(e, t, r) {
  return (e & t) ^ (~e & r);
}
function Ms(e, t, r) {
  return (e & t) ^ (e & r) ^ (t & r);
}
class Zn extends Ls {
  constructor(t, r, s, u) {
    super(),
      (this.blockLen = t),
      (this.outputLen = r),
      (this.padOffset = s),
      (this.isLE = u),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(t)),
      (this.view = ur(this.buffer));
  }
  update(t) {
    fn(this);
    const { view: r, buffer: s, blockLen: u } = this;
    t = jn(t);
    const d = t.length;
    for (let g = 0; g < d; ) {
      const c = Math.min(u - this.pos, d - g);
      if (c === u) {
        const b = ur(t);
        for (; u <= d - g; g += u) this.process(b, g);
        continue;
      }
      s.set(t.subarray(g, g + c), this.pos),
        (this.pos += c),
        (g += c),
        this.pos === u && (this.process(r, 0), (this.pos = 0));
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    fn(this), vs(t, this), (this.finished = !0);
    const { buffer: r, view: s, blockLen: u, isLE: d } = this;
    let { pos: g } = this;
    (r[g++] = 128),
      this.buffer.subarray(g).fill(0),
      this.padOffset > u - g && (this.process(s, 0), (g = 0));
    for (let L = g; L < u; L++) r[L] = 0;
    Ds(s, u - 8, BigInt(this.length * 8), d), this.process(s, 0);
    const c = ur(t),
      b = this.outputLen;
    if (b % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const S = b / 4,
      N = this.get();
    if (S > N.length) throw new Error("_sha2: outputLen bigger than state");
    for (let L = 0; L < S; L++) c.setUint32(4 * L, N[L], d);
  }
  digest() {
    const { buffer: t, outputLen: r } = this;
    this.digestInto(t);
    const s = t.slice(0, r);
    return this.destroy(), s;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const {
      blockLen: r,
      buffer: s,
      length: u,
      finished: d,
      destroyed: g,
      pos: c,
    } = this;
    return (
      (t.length = u),
      (t.pos = c),
      (t.finished = d),
      (t.destroyed = g),
      u % r && t.buffer.set(s),
      t
    );
  }
}
const Cs = new Uint32Array([
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
  te = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  ee = new Uint32Array(64);
class Qn extends Zn {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = te[0] | 0),
      (this.B = te[1] | 0),
      (this.C = te[2] | 0),
      (this.D = te[3] | 0),
      (this.E = te[4] | 0),
      (this.F = te[5] | 0),
      (this.G = te[6] | 0),
      (this.H = te[7] | 0);
  }
  get() {
    const { A: t, B: r, C: s, D: u, E: d, F: g, G: c, H: b } = this;
    return [t, r, s, u, d, g, c, b];
  }
  set(t, r, s, u, d, g, c, b) {
    (this.A = t | 0),
      (this.B = r | 0),
      (this.C = s | 0),
      (this.D = u | 0),
      (this.E = d | 0),
      (this.F = g | 0),
      (this.G = c | 0),
      (this.H = b | 0);
  }
  process(t, r) {
    for (let L = 0; L < 16; L++, r += 4) ee[L] = t.getUint32(r, !1);
    for (let L = 16; L < 64; L++) {
      const O = ee[L - 15],
        P = ee[L - 2],
        q = Yt(O, 7) ^ Yt(O, 18) ^ (O >>> 3),
        W = Yt(P, 17) ^ Yt(P, 19) ^ (P >>> 10);
      ee[L] = (W + ee[L - 7] + q + ee[L - 16]) | 0;
    }
    let { A: s, B: u, C: d, D: g, E: c, F: b, G: S, H: N } = this;
    for (let L = 0; L < 64; L++) {
      const O = Yt(c, 6) ^ Yt(c, 11) ^ Yt(c, 25),
        P = (N + O + Ps(c, b, S) + Cs[L] + ee[L]) | 0,
        W = ((Yt(s, 2) ^ Yt(s, 13) ^ Yt(s, 22)) + Ms(s, u, d)) | 0;
      (N = S),
        (S = b),
        (b = c),
        (c = (g + P) | 0),
        (g = d),
        (d = u),
        (u = s),
        (s = (P + W) | 0);
    }
    (s = (s + this.A) | 0),
      (u = (u + this.B) | 0),
      (d = (d + this.C) | 0),
      (g = (g + this.D) | 0),
      (c = (c + this.E) | 0),
      (b = (b + this.F) | 0),
      (S = (S + this.G) | 0),
      (N = (N + this.H) | 0),
      this.set(s, u, d, g, c, b, S, N);
  }
  roundClean() {
    ee.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class ks extends Qn {
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
const Gs = Gr(() => new Qn()),
  Hs = Gr(() => new ks());
function $s(e) {
  return Hs.create().update(new Uint8Array(e)).digest();
}
const Me = "__principal__",
  zs = 2,
  hn = 4,
  Ks = "aaaaa-aa",
  Ys = (e) => {
    var t;
    return new Uint8Array(
      ((t = e.match(/.{1,2}/g)) !== null && t !== void 0 ? t : []).map((r) =>
        parseInt(r, 16),
      ),
    );
  },
  Ws = (e) => e.reduce((t, r) => t + r.toString(16).padStart(2, "0"), "");
class ue {
  constructor(t) {
    (this._arr = t), (this._isPrincipal = !0);
  }
  static anonymous() {
    return new this(new Uint8Array([hn]));
  }
  static managementCanister() {
    return this.fromHex(Ks);
  }
  static selfAuthenticating(t) {
    const r = $s(t);
    return new this(new Uint8Array([...r, zs]));
  }
  static from(t) {
    if (typeof t == "string") return ue.fromText(t);
    if (Object.getPrototypeOf(t) === Uint8Array.prototype) return new ue(t);
    if (typeof t == "object" && t !== null && t._isPrincipal === !0)
      return new ue(t._arr);
    throw new Error(`Impossible to convert ${JSON.stringify(t)} to Principal.`);
  }
  static fromHex(t) {
    return new this(Ys(t));
  }
  static fromText(t) {
    let r = t;
    if (t.includes(Me)) {
      const g = JSON.parse(t);
      Me in g && (r = g[Me]);
    }
    const s = r.toLowerCase().replace(/-/g, "");
    let u = Ts(s);
    u = u.slice(4, u.length);
    const d = new this(u);
    if (d.toText() !== r)
      throw new Error(
        `Principal "${d.toText()}" does not have a valid checksum (original value "${r}" may not be a valid Principal ID).`,
      );
    return d;
  }
  static fromUint8Array(t) {
    return new this(t);
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === hn;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return Ws(this._arr).toUpperCase();
  }
  toText() {
    const t = new ArrayBuffer(4);
    new DataView(t).setUint32(0, Ns(this._arr));
    const s = new Uint8Array(t),
      u = Uint8Array.from(this._arr),
      d = new Uint8Array([...s, ...u]),
      c = Ss(d).match(/.{1,5}/g);
    if (!c) throw new Error();
    return c.join("-");
  }
  toString() {
    return this.toText();
  }
  toJSON() {
    return { [Me]: this.toText() };
  }
  compareTo(t) {
    for (let r = 0; r < Math.min(this._arr.length, t._arr.length); r++) {
      if (this._arr[r] < t._arr[r]) return "lt";
      if (this._arr[r] > t._arr[r]) return "gt";
    }
    return this._arr.length < t._arr.length
      ? "lt"
      : this._arr.length > t._arr.length
        ? "gt"
        : "eq";
  }
  ltEq(t) {
    const r = this.compareTo(t);
    return r == "lt" || r == "eq";
  }
  gtEq(t) {
    const r = this.compareTo(t);
    return r == "gt" || r == "eq";
  }
}
function Ne(...e) {
  const t = new Uint8Array(e.reduce((s, u) => s + u.byteLength, 0));
  let r = 0;
  for (const s of e) t.set(new Uint8Array(s), r), (r += s.byteLength);
  return t.buffer;
}
function be(e) {
  return [...new Uint8Array(e)]
    .map((t) => t.toString(16).padStart(2, "0"))
    .join("");
}
const Vs = new RegExp(/^[0-9a-fA-F]+$/);
function ce(e) {
  if (!Vs.test(e)) throw new Error("Invalid hexadecimal string.");
  const t = [...e]
    .reduce((r, s, u) => ((r[(u / 2) | 0] = (r[(u / 2) | 0] || "") + s), r), [])
    .map((r) => Number.parseInt(r, 16));
  return new Uint8Array(t).buffer;
}
function ti(e, t) {
  if (e.byteLength !== t.byteLength) return e.byteLength - t.byteLength;
  const r = new Uint8Array(e),
    s = new Uint8Array(t);
  for (let u = 0; u < r.length; u++) if (r[u] !== s[u]) return r[u] - s[u];
  return 0;
}
function ei(e, t) {
  return ti(e, t) === 0;
}
function Ue(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength).buffer;
}
function ri(e) {
  return e instanceof Uint8Array
    ? Ue(e)
    : e instanceof ArrayBuffer
      ? e
      : Array.isArray(e)
        ? Ue(new Uint8Array(e))
        : "buffer" in e
          ? ri(e.buffer)
          : Ue(new Uint8Array(e));
}
class Hr {
  constructor(t, r = t?.byteLength || 0) {
    (this._buffer = Sr(t || new ArrayBuffer(0))),
      (this._view = new Uint8Array(this._buffer, 0, r));
  }
  get buffer() {
    return Sr(this._view.slice());
  }
  get byteLength() {
    return this._view.byteLength;
  }
  read(t) {
    const r = this._view.subarray(0, t);
    return (this._view = this._view.subarray(t)), r.slice().buffer;
  }
  readUint8() {
    const t = this._view[0];
    return (this._view = this._view.subarray(1)), t;
  }
  write(t) {
    const r = new Uint8Array(t),
      s = this._view.byteLength;
    this._view.byteOffset + this._view.byteLength + r.byteLength >=
    this._buffer.byteLength
      ? this.alloc(r.byteLength)
      : (this._view = new Uint8Array(
          this._buffer,
          this._view.byteOffset,
          this._view.byteLength + r.byteLength,
        )),
      this._view.set(r, s);
  }
  get end() {
    return this._view.byteLength === 0;
  }
  alloc(t) {
    const r = new ArrayBuffer(((this._buffer.byteLength + t) * 1.2) | 0),
      s = new Uint8Array(r, 0, this._view.byteLength + t);
    s.set(this._view), (this._buffer = r), (this._view = s);
  }
}
function cr(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength).buffer;
}
function Sr(e) {
  return e instanceof Uint8Array
    ? cr(e)
    : e instanceof ArrayBuffer
      ? e
      : Array.isArray(e)
        ? cr(new Uint8Array(e))
        : "buffer" in e
          ? Sr(e.buffer)
          : cr(new Uint8Array(e));
}
function ni() {
  throw new Error("unexpected end of buffer");
}
function qs(e, t) {
  return e.byteLength < t && ni(), e.read(t);
}
function ln(e) {
  const t = e.readUint8();
  return t === void 0 && ni(), t;
}
function dn(e) {
  if ((typeof e == "number" && (e = BigInt(e)), e < BigInt(0)))
    throw new Error("Cannot leb encode negative values.");
  const t = (e === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(e)))) + 1,
    r = new Hr(new ArrayBuffer(t), 0);
  for (;;) {
    const s = Number(e & BigInt(127));
    if (((e /= BigInt(128)), e === BigInt(0))) {
      r.write(new Uint8Array([s]));
      break;
    } else r.write(new Uint8Array([s | 128]));
  }
  return r.buffer;
}
function $r(e) {
  typeof e == "number" && (e = BigInt(e));
  const t = e < BigInt(0);
  t && (e = -e - BigInt(1));
  const r = (e === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(e)))) + 1,
    s = new Hr(new ArrayBuffer(r), 0);
  for (;;) {
    const d = u(e);
    if (
      ((e /= BigInt(128)),
      (t && e === BigInt(0) && d & 64) || (!t && e === BigInt(0) && !(d & 64)))
    ) {
      s.write(new Uint8Array([d]));
      break;
    } else s.write(new Uint8Array([d | 128]));
  }
  function u(d) {
    const g = d % BigInt(128);
    return Number(t ? BigInt(128) - g - BigInt(1) : g);
  }
  return s.buffer;
}
function Js(e, t) {
  if (BigInt(e) < BigInt(0)) throw new Error("Cannot write negative values.");
  return ii(e, t);
}
function ii(e, t) {
  e = BigInt(e);
  const r = new Hr(new ArrayBuffer(Math.min(1, t)), 0);
  let s = 0,
    u = BigInt(256),
    d = BigInt(0),
    g = Number(e % u);
  for (r.write(new Uint8Array([g])); ++s < t; )
    e < 0 && d === BigInt(0) && g !== 0 && (d = BigInt(1)),
      (g = Number((e / u - d) % BigInt(256))),
      r.write(new Uint8Array([g])),
      (u *= BigInt(256));
  return r.buffer;
}
function si(e, t) {
  let r = BigInt(ln(e)),
    s = BigInt(1),
    u = 0;
  for (; ++u < t; ) {
    s *= BigInt(256);
    const d = BigInt(ln(e));
    r = r + s * d;
  }
  return r;
}
function Xs(e, t) {
  let r = si(e, t);
  const s = BigInt(2) ** (BigInt(8) * BigInt(t - 1) + BigInt(7));
  return r >= s && (r -= s * BigInt(2)), r;
}
function Tr(e) {
  const t = BigInt(e);
  if (e < 0) throw new RangeError("Input must be non-negative");
  return BigInt(1) << t;
}
const pn = 400;
class oi {
  display() {
    return this.name;
  }
  valueToString(t) {
    return Le(t);
  }
  buildTypeTable(t) {
    t.has(this) || this._buildTypeTableImpl(t);
  }
}
class zr extends oi {
  checkType(t) {
    if (this.name !== t.name)
      throw new Error(
        `type mismatch: type on the wire ${t.name}, expect type ${this.name}`,
      );
    return t;
  }
  _buildTypeTableImpl(t) {}
}
class js extends oi {
  checkType(t) {
    if (t instanceof nr) {
      const r = t.getType();
      if (typeof r > "u")
        throw new Error("type mismatch with uninitialized type");
      return r;
    }
    throw new Error(
      `type mismatch: type on the wire ${t.name}, expect type ${this.name}`,
    );
  }
  encodeType(t) {
    return t.indexOf(this.name);
  }
}
class ai extends zr {
  constructor(t) {
    if ((super(), (this._bits = t), t !== 32 && t !== 64))
      throw new Error("not a valid float type");
  }
  accept(t, r) {
    return t.visitFloat(this, r);
  }
  covariant(t) {
    if (typeof t == "number" || t instanceof Number) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Le(t)}`);
  }
  encodeValue(t) {
    const r = new ArrayBuffer(this._bits / 8),
      s = new DataView(r);
    return (
      this._bits === 32 ? s.setFloat32(0, t, !0) : s.setFloat64(0, t, !0), r
    );
  }
  encodeType() {
    const t = this._bits === 32 ? -13 : -14;
    return $r(t);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const s = qs(t, this._bits / 8),
      u = new DataView(s);
    return this._bits === 32 ? u.getFloat32(0, !0) : u.getFloat64(0, !0);
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(t) {
    return t.toString();
  }
}
class er extends zr {
  constructor(t) {
    super(), (this._bits = t);
  }
  accept(t, r) {
    return t.visitFixedInt(this, r);
  }
  covariant(t) {
    const r = Tr(this._bits - 1) * BigInt(-1),
      s = Tr(this._bits - 1) - BigInt(1);
    let u = !1;
    if (typeof t == "bigint") u = t >= r && t <= s;
    else if (Number.isInteger(t)) {
      const d = BigInt(t);
      u = d >= r && d <= s;
    } else u = !1;
    if (u) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Le(t)}`);
  }
  encodeValue(t) {
    return ii(t, this._bits / 8);
  }
  encodeType() {
    const t = Math.log2(this._bits) - 3;
    return $r(-9 - t);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const s = Xs(t, this._bits / 8);
    return this._bits <= 32 ? Number(s) : s;
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(t) {
    return t.toString();
  }
}
class rr extends zr {
  constructor(t) {
    super(), (this._bits = t);
  }
  accept(t, r) {
    return t.visitFixedNat(this, r);
  }
  covariant(t) {
    const r = Tr(this._bits);
    let s = !1;
    if (
      (typeof t == "bigint" && t >= BigInt(0)
        ? (s = t < r)
        : Number.isInteger(t) && t >= 0
          ? (s = BigInt(t) < r)
          : (s = !1),
      s)
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Le(t)}`);
  }
  encodeValue(t) {
    return Js(t, this._bits / 8);
  }
  encodeType() {
    const t = Math.log2(this._bits) - 3;
    return $r(-5 - t);
  }
  decodeValue(t, r) {
    this.checkType(r);
    const s = si(t, this._bits / 8);
    return this._bits <= 32 ? Number(s) : s;
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(t) {
    return t.toString();
  }
}
class nr extends js {
  constructor() {
    super(...arguments), (this._id = nr._counter++), (this._type = void 0);
  }
  accept(t, r) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return t.visitRec(this, this._type, r);
  }
  fill(t) {
    this._type = t;
  }
  getType() {
    return this._type;
  }
  covariant(t) {
    if (this._type && this._type.covariant(t)) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${Le(t)}`);
  }
  encodeValue(t) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.encodeValue(t);
  }
  _buildTypeTableImpl(t) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    t.add(this, new Uint8Array([])),
      this._type.buildTypeTable(t),
      t.merge(this, this._type.name);
  }
  decodeValue(t, r) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.decodeValue(t, r);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(t) {
    if (!this._type) throw Error("Recursive type uninitialized.");
    return this._type.valueToString(t);
  }
}
nr._counter = 0;
function Le(e) {
  const t = JSON.stringify(e, (r, s) =>
    typeof s == "bigint" ? `BigInt(${s})` : s,
  );
  return t && t.length > pn ? t.substring(0, pn - 3) + "..." : t;
}
new ai(32);
new ai(64);
new er(8);
new er(16);
new er(32);
new er(64);
new rr(8);
new rr(16);
new rr(32);
new rr(64);
var ui = {},
  Oe = {};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  var t = ve,
    r = Re,
    s =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (e.Buffer = c), (e.SlowBuffer = at), (e.INSPECT_MAX_BYTES = 50);
  var u = 2147483647;
  (e.kMaxLength = u),
    (c.TYPED_ARRAY_SUPPORT = d()),
    !c.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function d() {
    try {
      var f = new Uint8Array(1),
        n = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(n, Uint8Array.prototype),
        Object.setPrototypeOf(f, n),
        f.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (c.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(c.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (c.isBuffer(this)) return this.byteOffset;
      },
    });
  function g(f) {
    if (f > u)
      throw new RangeError(
        'The value "' + f + '" is invalid for option "size"',
      );
    var n = new Uint8Array(f);
    return Object.setPrototypeOf(n, c.prototype), n;
  }
  function c(f, n, i) {
    if (typeof f == "number") {
      if (typeof n == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return L(f);
    }
    return b(f, n, i);
  }
  c.poolSize = 8192;
  function b(f, n, i) {
    if (typeof f == "string") return O(f, n);
    if (ArrayBuffer.isView(f)) return q(f);
    if (f == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof f,
      );
    if (
      T(f, ArrayBuffer) ||
      (f && T(f.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (T(f, SharedArrayBuffer) || (f && T(f.buffer, SharedArrayBuffer))))
    )
      return W(f, n, i);
    if (typeof f == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    var l = f.valueOf && f.valueOf();
    if (l != null && l !== f) return c.from(l, n, i);
    var p = lt(f);
    if (p) return p;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof f[Symbol.toPrimitive] == "function"
    )
      return c.from(f[Symbol.toPrimitive]("string"), n, i);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof f,
    );
  }
  (c.from = function (f, n, i) {
    return b(f, n, i);
  }),
    Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(c, Uint8Array);
  function S(f) {
    if (typeof f != "number")
      throw new TypeError('"size" argument must be of type number');
    if (f < 0)
      throw new RangeError(
        'The value "' + f + '" is invalid for option "size"',
      );
  }
  function N(f, n, i) {
    return (
      S(f),
      f <= 0
        ? g(f)
        : n !== void 0
          ? typeof i == "string"
            ? g(f).fill(n, i)
            : g(f).fill(n)
          : g(f)
    );
  }
  c.alloc = function (f, n, i) {
    return N(f, n, i);
  };
  function L(f) {
    return S(f), g(f < 0 ? 0 : Et(f) | 0);
  }
  (c.allocUnsafe = function (f) {
    return L(f);
  }),
    (c.allocUnsafeSlow = function (f) {
      return L(f);
    });
  function O(f, n) {
    if (((typeof n != "string" || n === "") && (n = "utf8"), !c.isEncoding(n)))
      throw new TypeError("Unknown encoding: " + n);
    var i = K(f, n) | 0,
      l = g(i),
      p = l.write(f, n);
    return p !== i && (l = l.slice(0, p)), l;
  }
  function P(f) {
    for (
      var n = f.length < 0 ? 0 : Et(f.length) | 0, i = g(n), l = 0;
      l < n;
      l += 1
    )
      i[l] = f[l] & 255;
    return i;
  }
  function q(f) {
    if (T(f, Uint8Array)) {
      var n = new Uint8Array(f);
      return W(n.buffer, n.byteOffset, n.byteLength);
    }
    return P(f);
  }
  function W(f, n, i) {
    if (n < 0 || f.byteLength < n)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (f.byteLength < n + (i || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var l;
    return (
      n === void 0 && i === void 0
        ? (l = new Uint8Array(f))
        : i === void 0
          ? (l = new Uint8Array(f, n))
          : (l = new Uint8Array(f, n, i)),
      Object.setPrototypeOf(l, c.prototype),
      l
    );
  }
  function lt(f) {
    if (c.isBuffer(f)) {
      var n = Et(f.length) | 0,
        i = g(n);
      return i.length === 0 || f.copy(i, 0, 0, n), i;
    }
    if (f.length !== void 0)
      return typeof f.length != "number" || B(f.length) ? g(0) : P(f);
    if (f.type === "Buffer" && Array.isArray(f.data)) return P(f.data);
  }
  function Et(f) {
    if (f >= u)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          u.toString(16) +
          " bytes",
      );
    return f | 0;
  }
  function at(f) {
    return +f != f && (f = 0), c.alloc(+f);
  }
  (c.isBuffer = function (n) {
    return n != null && n._isBuffer === !0 && n !== c.prototype;
  }),
    (c.compare = function (n, i) {
      if (
        (T(n, Uint8Array) && (n = c.from(n, n.offset, n.byteLength)),
        T(i, Uint8Array) && (i = c.from(i, i.offset, i.byteLength)),
        !c.isBuffer(n) || !c.isBuffer(i))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (n === i) return 0;
      for (
        var l = n.length, p = i.length, E = 0, F = Math.min(l, p);
        E < F;
        ++E
      )
        if (n[E] !== i[E]) {
          (l = n[E]), (p = i[E]);
          break;
        }
      return l < p ? -1 : p < l ? 1 : 0;
    }),
    (c.isEncoding = function (n) {
      switch (String(n).toLowerCase()) {
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
    (c.concat = function (n, i) {
      if (!Array.isArray(n))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (n.length === 0) return c.alloc(0);
      var l;
      if (i === void 0) for (i = 0, l = 0; l < n.length; ++l) i += n[l].length;
      var p = c.allocUnsafe(i),
        E = 0;
      for (l = 0; l < n.length; ++l) {
        var F = n[l];
        if (T(F, Uint8Array))
          E + F.length > p.length
            ? c.from(F).copy(p, E)
            : Uint8Array.prototype.set.call(p, F, E);
        else if (c.isBuffer(F)) F.copy(p, E);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        E += F.length;
      }
      return p;
    });
  function K(f, n) {
    if (c.isBuffer(f)) return f.length;
    if (ArrayBuffer.isView(f) || T(f, ArrayBuffer)) return f.byteLength;
    if (typeof f != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof f,
      );
    var i = f.length,
      l = arguments.length > 2 && arguments[2] === !0;
    if (!l && i === 0) return 0;
    for (var p = !1; ; )
      switch (n) {
        case "ascii":
        case "latin1":
        case "binary":
          return i;
        case "utf8":
        case "utf-8":
          return H(f).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return i * 2;
        case "hex":
          return i >>> 1;
        case "base64":
          return x(f).length;
        default:
          if (p) return l ? -1 : H(f).length;
          (n = ("" + n).toLowerCase()), (p = !0);
      }
  }
  c.byteLength = K;
  function Ut(f, n, i) {
    var l = !1;
    if (
      ((n === void 0 || n < 0) && (n = 0),
      n > this.length ||
        ((i === void 0 || i > this.length) && (i = this.length), i <= 0) ||
        ((i >>>= 0), (n >>>= 0), i <= n))
    )
      return "";
    for (f || (f = "utf8"); ; )
      switch (f) {
        case "hex":
          return j(this, n, i);
        case "utf8":
        case "utf-8":
          return St(this, n, i);
        case "ascii":
          return M(this, n, i);
        case "latin1":
        case "binary":
          return k(this, n, i);
        case "base64":
          return ft(this, n, i);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Q(this, n, i);
        default:
          if (l) throw new TypeError("Unknown encoding: " + f);
          (f = (f + "").toLowerCase()), (l = !0);
      }
  }
  c.prototype._isBuffer = !0;
  function ut(f, n, i) {
    var l = f[n];
    (f[n] = f[i]), (f[i] = l);
  }
  (c.prototype.swap16 = function () {
    var n = this.length;
    if (n % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var i = 0; i < n; i += 2) ut(this, i, i + 1);
    return this;
  }),
    (c.prototype.swap32 = function () {
      var n = this.length;
      if (n % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var i = 0; i < n; i += 4) ut(this, i, i + 3), ut(this, i + 1, i + 2);
      return this;
    }),
    (c.prototype.swap64 = function () {
      var n = this.length;
      if (n % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var i = 0; i < n; i += 8)
        ut(this, i, i + 7),
          ut(this, i + 1, i + 6),
          ut(this, i + 2, i + 5),
          ut(this, i + 3, i + 4);
      return this;
    }),
    (c.prototype.toString = function () {
      var n = this.length;
      return n === 0
        ? ""
        : arguments.length === 0
          ? St(this, 0, n)
          : Ut.apply(this, arguments);
    }),
    (c.prototype.toLocaleString = c.prototype.toString),
    (c.prototype.equals = function (n) {
      if (!c.isBuffer(n)) throw new TypeError("Argument must be a Buffer");
      return this === n ? !0 : c.compare(this, n) === 0;
    }),
    (c.prototype.inspect = function () {
      var n = "",
        i = e.INSPECT_MAX_BYTES;
      return (
        (n = this.toString("hex", 0, i)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > i && (n += " ... "),
        "<Buffer " + n + ">"
      );
    }),
    s && (c.prototype[s] = c.prototype.inspect),
    (c.prototype.compare = function (n, i, l, p, E) {
      if (
        (T(n, Uint8Array) && (n = c.from(n, n.offset, n.byteLength)),
        !c.isBuffer(n))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof n,
        );
      if (
        (i === void 0 && (i = 0),
        l === void 0 && (l = n ? n.length : 0),
        p === void 0 && (p = 0),
        E === void 0 && (E = this.length),
        i < 0 || l > n.length || p < 0 || E > this.length)
      )
        throw new RangeError("out of range index");
      if (p >= E && i >= l) return 0;
      if (p >= E) return -1;
      if (i >= l) return 1;
      if (((i >>>= 0), (l >>>= 0), (p >>>= 0), (E >>>= 0), this === n))
        return 0;
      for (
        var F = E - p,
          D = l - i,
          z = Math.min(F, D),
          V = this.slice(p, E),
          rt = n.slice(i, l),
          h = 0;
        h < z;
        ++h
      )
        if (V[h] !== rt[h]) {
          (F = V[h]), (D = rt[h]);
          break;
        }
      return F < D ? -1 : D < F ? 1 : 0;
    });
  function J(f, n, i, l, p) {
    if (f.length === 0) return -1;
    if (
      (typeof i == "string"
        ? ((l = i), (i = 0))
        : i > 2147483647
          ? (i = 2147483647)
          : i < -2147483648 && (i = -2147483648),
      (i = +i),
      B(i) && (i = p ? 0 : f.length - 1),
      i < 0 && (i = f.length + i),
      i >= f.length)
    ) {
      if (p) return -1;
      i = f.length - 1;
    } else if (i < 0)
      if (p) i = 0;
      else return -1;
    if ((typeof n == "string" && (n = c.from(n, l)), c.isBuffer(n)))
      return n.length === 0 ? -1 : X(f, n, i, l, p);
    if (typeof n == "number")
      return (
        (n = n & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? p
            ? Uint8Array.prototype.indexOf.call(f, n, i)
            : Uint8Array.prototype.lastIndexOf.call(f, n, i)
          : X(f, [n], i, l, p)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function X(f, n, i, l, p) {
    var E = 1,
      F = f.length,
      D = n.length;
    if (
      l !== void 0 &&
      ((l = String(l).toLowerCase()),
      l === "ucs2" || l === "ucs-2" || l === "utf16le" || l === "utf-16le")
    ) {
      if (f.length < 2 || n.length < 2) return -1;
      (E = 2), (F /= 2), (D /= 2), (i /= 2);
    }
    function z(a, m) {
      return E === 1 ? a[m] : a.readUInt16BE(m * E);
    }
    var V;
    if (p) {
      var rt = -1;
      for (V = i; V < F; V++)
        if (z(f, V) === z(n, rt === -1 ? 0 : V - rt)) {
          if ((rt === -1 && (rt = V), V - rt + 1 === D)) return rt * E;
        } else rt !== -1 && (V -= V - rt), (rt = -1);
    } else
      for (i + D > F && (i = F - D), V = i; V >= 0; V--) {
        for (var h = !0, o = 0; o < D; o++)
          if (z(f, V + o) !== z(n, o)) {
            h = !1;
            break;
          }
        if (h) return V;
      }
    return -1;
  }
  (c.prototype.includes = function (n, i, l) {
    return this.indexOf(n, i, l) !== -1;
  }),
    (c.prototype.indexOf = function (n, i, l) {
      return J(this, n, i, l, !0);
    }),
    (c.prototype.lastIndexOf = function (n, i, l) {
      return J(this, n, i, l, !1);
    });
  function nt(f, n, i, l) {
    i = Number(i) || 0;
    var p = f.length - i;
    l ? ((l = Number(l)), l > p && (l = p)) : (l = p);
    var E = n.length;
    l > E / 2 && (l = E / 2);
    for (var F = 0; F < l; ++F) {
      var D = parseInt(n.substr(F * 2, 2), 16);
      if (B(D)) return F;
      f[i + F] = D;
    }
    return F;
  }
  function it(f, n, i, l) {
    return _(H(n, f.length - i), f, i, l);
  }
  function C(f, n, i, l) {
    return _(Y(n), f, i, l);
  }
  function xt(f, n, i, l) {
    return _(x(n), f, i, l);
  }
  function ct(f, n, i, l) {
    return _(w(n, f.length - i), f, i, l);
  }
  (c.prototype.write = function (n, i, l, p) {
    if (i === void 0) (p = "utf8"), (l = this.length), (i = 0);
    else if (l === void 0 && typeof i == "string")
      (p = i), (l = this.length), (i = 0);
    else if (isFinite(i))
      (i = i >>> 0),
        isFinite(l)
          ? ((l = l >>> 0), p === void 0 && (p = "utf8"))
          : ((p = l), (l = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    var E = this.length - i;
    if (
      ((l === void 0 || l > E) && (l = E),
      (n.length > 0 && (l < 0 || i < 0)) || i > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    p || (p = "utf8");
    for (var F = !1; ; )
      switch (p) {
        case "hex":
          return nt(this, n, i, l);
        case "utf8":
        case "utf-8":
          return it(this, n, i, l);
        case "ascii":
        case "latin1":
        case "binary":
          return C(this, n, i, l);
        case "base64":
          return xt(this, n, i, l);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ct(this, n, i, l);
        default:
          if (F) throw new TypeError("Unknown encoding: " + p);
          (p = ("" + p).toLowerCase()), (F = !0);
      }
  }),
    (c.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function ft(f, n, i) {
    return n === 0 && i === f.length
      ? t.fromByteArray(f)
      : t.fromByteArray(f.slice(n, i));
  }
  function St(f, n, i) {
    i = Math.min(f.length, i);
    for (var l = [], p = n; p < i; ) {
      var E = f[p],
        F = null,
        D = E > 239 ? 4 : E > 223 ? 3 : E > 191 ? 2 : 1;
      if (p + D <= i) {
        var z, V, rt, h;
        switch (D) {
          case 1:
            E < 128 && (F = E);
            break;
          case 2:
            (z = f[p + 1]),
              (z & 192) === 128 &&
                ((h = ((E & 31) << 6) | (z & 63)), h > 127 && (F = h));
            break;
          case 3:
            (z = f[p + 1]),
              (V = f[p + 2]),
              (z & 192) === 128 &&
                (V & 192) === 128 &&
                ((h = ((E & 15) << 12) | ((z & 63) << 6) | (V & 63)),
                h > 2047 && (h < 55296 || h > 57343) && (F = h));
            break;
          case 4:
            (z = f[p + 1]),
              (V = f[p + 2]),
              (rt = f[p + 3]),
              (z & 192) === 128 &&
                (V & 192) === 128 &&
                (rt & 192) === 128 &&
                ((h =
                  ((E & 15) << 18) |
                  ((z & 63) << 12) |
                  ((V & 63) << 6) |
                  (rt & 63)),
                h > 65535 && h < 1114112 && (F = h));
        }
      }
      F === null
        ? ((F = 65533), (D = 1))
        : F > 65535 &&
          ((F -= 65536),
          l.push(((F >>> 10) & 1023) | 55296),
          (F = 56320 | (F & 1023))),
        l.push(F),
        (p += D);
    }
    return Z(l);
  }
  var _t = 4096;
  function Z(f) {
    var n = f.length;
    if (n <= _t) return String.fromCharCode.apply(String, f);
    for (var i = "", l = 0; l < n; )
      i += String.fromCharCode.apply(String, f.slice(l, (l += _t)));
    return i;
  }
  function M(f, n, i) {
    var l = "";
    i = Math.min(f.length, i);
    for (var p = n; p < i; ++p) l += String.fromCharCode(f[p] & 127);
    return l;
  }
  function k(f, n, i) {
    var l = "";
    i = Math.min(f.length, i);
    for (var p = n; p < i; ++p) l += String.fromCharCode(f[p]);
    return l;
  }
  function j(f, n, i) {
    var l = f.length;
    (!n || n < 0) && (n = 0), (!i || i < 0 || i > l) && (i = l);
    for (var p = "", E = n; E < i; ++E) p += U[f[E]];
    return p;
  }
  function Q(f, n, i) {
    for (var l = f.slice(n, i), p = "", E = 0; E < l.length - 1; E += 2)
      p += String.fromCharCode(l[E] + l[E + 1] * 256);
    return p;
  }
  c.prototype.slice = function (n, i) {
    var l = this.length;
    (n = ~~n),
      (i = i === void 0 ? l : ~~i),
      n < 0 ? ((n += l), n < 0 && (n = 0)) : n > l && (n = l),
      i < 0 ? ((i += l), i < 0 && (i = 0)) : i > l && (i = l),
      i < n && (i = n);
    var p = this.subarray(n, i);
    return Object.setPrototypeOf(p, c.prototype), p;
  };
  function G(f, n, i) {
    if (f % 1 !== 0 || f < 0) throw new RangeError("offset is not uint");
    if (f + n > i)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (c.prototype.readUintLE = c.prototype.readUIntLE =
    function (n, i, l) {
      (n = n >>> 0), (i = i >>> 0), l || G(n, i, this.length);
      for (var p = this[n], E = 1, F = 0; ++F < i && (E *= 256); )
        p += this[n + F] * E;
      return p;
    }),
    (c.prototype.readUintBE = c.prototype.readUIntBE =
      function (n, i, l) {
        (n = n >>> 0), (i = i >>> 0), l || G(n, i, this.length);
        for (var p = this[n + --i], E = 1; i > 0 && (E *= 256); )
          p += this[n + --i] * E;
        return p;
      }),
    (c.prototype.readUint8 = c.prototype.readUInt8 =
      function (n, i) {
        return (n = n >>> 0), i || G(n, 1, this.length), this[n];
      }),
    (c.prototype.readUint16LE = c.prototype.readUInt16LE =
      function (n, i) {
        return (
          (n = n >>> 0), i || G(n, 2, this.length), this[n] | (this[n + 1] << 8)
        );
      }),
    (c.prototype.readUint16BE = c.prototype.readUInt16BE =
      function (n, i) {
        return (
          (n = n >>> 0), i || G(n, 2, this.length), (this[n] << 8) | this[n + 1]
        );
      }),
    (c.prototype.readUint32LE = c.prototype.readUInt32LE =
      function (n, i) {
        return (
          (n = n >>> 0),
          i || G(n, 4, this.length),
          (this[n] | (this[n + 1] << 8) | (this[n + 2] << 16)) +
            this[n + 3] * 16777216
        );
      }),
    (c.prototype.readUint32BE = c.prototype.readUInt32BE =
      function (n, i) {
        return (
          (n = n >>> 0),
          i || G(n, 4, this.length),
          this[n] * 16777216 +
            ((this[n + 1] << 16) | (this[n + 2] << 8) | this[n + 3])
        );
      }),
    (c.prototype.readIntLE = function (n, i, l) {
      (n = n >>> 0), (i = i >>> 0), l || G(n, i, this.length);
      for (var p = this[n], E = 1, F = 0; ++F < i && (E *= 256); )
        p += this[n + F] * E;
      return (E *= 128), p >= E && (p -= Math.pow(2, 8 * i)), p;
    }),
    (c.prototype.readIntBE = function (n, i, l) {
      (n = n >>> 0), (i = i >>> 0), l || G(n, i, this.length);
      for (var p = i, E = 1, F = this[n + --p]; p > 0 && (E *= 256); )
        F += this[n + --p] * E;
      return (E *= 128), F >= E && (F -= Math.pow(2, 8 * i)), F;
    }),
    (c.prototype.readInt8 = function (n, i) {
      return (
        (n = n >>> 0),
        i || G(n, 1, this.length),
        this[n] & 128 ? (255 - this[n] + 1) * -1 : this[n]
      );
    }),
    (c.prototype.readInt16LE = function (n, i) {
      (n = n >>> 0), i || G(n, 2, this.length);
      var l = this[n] | (this[n + 1] << 8);
      return l & 32768 ? l | 4294901760 : l;
    }),
    (c.prototype.readInt16BE = function (n, i) {
      (n = n >>> 0), i || G(n, 2, this.length);
      var l = this[n + 1] | (this[n] << 8);
      return l & 32768 ? l | 4294901760 : l;
    }),
    (c.prototype.readInt32LE = function (n, i) {
      return (
        (n = n >>> 0),
        i || G(n, 4, this.length),
        this[n] | (this[n + 1] << 8) | (this[n + 2] << 16) | (this[n + 3] << 24)
      );
    }),
    (c.prototype.readInt32BE = function (n, i) {
      return (
        (n = n >>> 0),
        i || G(n, 4, this.length),
        (this[n] << 24) | (this[n + 1] << 16) | (this[n + 2] << 8) | this[n + 3]
      );
    }),
    (c.prototype.readFloatLE = function (n, i) {
      return (
        (n = n >>> 0), i || G(n, 4, this.length), r.read(this, n, !0, 23, 4)
      );
    }),
    (c.prototype.readFloatBE = function (n, i) {
      return (
        (n = n >>> 0), i || G(n, 4, this.length), r.read(this, n, !1, 23, 4)
      );
    }),
    (c.prototype.readDoubleLE = function (n, i) {
      return (
        (n = n >>> 0), i || G(n, 8, this.length), r.read(this, n, !0, 52, 8)
      );
    }),
    (c.prototype.readDoubleBE = function (n, i) {
      return (
        (n = n >>> 0), i || G(n, 8, this.length), r.read(this, n, !1, 52, 8)
      );
    });
  function $(f, n, i, l, p, E) {
    if (!c.isBuffer(f))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (n > p || n < E)
      throw new RangeError('"value" argument is out of bounds');
    if (i + l > f.length) throw new RangeError("Index out of range");
  }
  (c.prototype.writeUintLE = c.prototype.writeUIntLE =
    function (n, i, l, p) {
      if (((n = +n), (i = i >>> 0), (l = l >>> 0), !p)) {
        var E = Math.pow(2, 8 * l) - 1;
        $(this, n, i, l, E, 0);
      }
      var F = 1,
        D = 0;
      for (this[i] = n & 255; ++D < l && (F *= 256); )
        this[i + D] = (n / F) & 255;
      return i + l;
    }),
    (c.prototype.writeUintBE = c.prototype.writeUIntBE =
      function (n, i, l, p) {
        if (((n = +n), (i = i >>> 0), (l = l >>> 0), !p)) {
          var E = Math.pow(2, 8 * l) - 1;
          $(this, n, i, l, E, 0);
        }
        var F = l - 1,
          D = 1;
        for (this[i + F] = n & 255; --F >= 0 && (D *= 256); )
          this[i + F] = (n / D) & 255;
        return i + l;
      }),
    (c.prototype.writeUint8 = c.prototype.writeUInt8 =
      function (n, i, l) {
        return (
          (n = +n),
          (i = i >>> 0),
          l || $(this, n, i, 1, 255, 0),
          (this[i] = n & 255),
          i + 1
        );
      }),
    (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
      function (n, i, l) {
        return (
          (n = +n),
          (i = i >>> 0),
          l || $(this, n, i, 2, 65535, 0),
          (this[i] = n & 255),
          (this[i + 1] = n >>> 8),
          i + 2
        );
      }),
    (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
      function (n, i, l) {
        return (
          (n = +n),
          (i = i >>> 0),
          l || $(this, n, i, 2, 65535, 0),
          (this[i] = n >>> 8),
          (this[i + 1] = n & 255),
          i + 2
        );
      }),
    (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
      function (n, i, l) {
        return (
          (n = +n),
          (i = i >>> 0),
          l || $(this, n, i, 4, 4294967295, 0),
          (this[i + 3] = n >>> 24),
          (this[i + 2] = n >>> 16),
          (this[i + 1] = n >>> 8),
          (this[i] = n & 255),
          i + 4
        );
      }),
    (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
      function (n, i, l) {
        return (
          (n = +n),
          (i = i >>> 0),
          l || $(this, n, i, 4, 4294967295, 0),
          (this[i] = n >>> 24),
          (this[i + 1] = n >>> 16),
          (this[i + 2] = n >>> 8),
          (this[i + 3] = n & 255),
          i + 4
        );
      }),
    (c.prototype.writeIntLE = function (n, i, l, p) {
      if (((n = +n), (i = i >>> 0), !p)) {
        var E = Math.pow(2, 8 * l - 1);
        $(this, n, i, l, E - 1, -E);
      }
      var F = 0,
        D = 1,
        z = 0;
      for (this[i] = n & 255; ++F < l && (D *= 256); )
        n < 0 && z === 0 && this[i + F - 1] !== 0 && (z = 1),
          (this[i + F] = (((n / D) >> 0) - z) & 255);
      return i + l;
    }),
    (c.prototype.writeIntBE = function (n, i, l, p) {
      if (((n = +n), (i = i >>> 0), !p)) {
        var E = Math.pow(2, 8 * l - 1);
        $(this, n, i, l, E - 1, -E);
      }
      var F = l - 1,
        D = 1,
        z = 0;
      for (this[i + F] = n & 255; --F >= 0 && (D *= 256); )
        n < 0 && z === 0 && this[i + F + 1] !== 0 && (z = 1),
          (this[i + F] = (((n / D) >> 0) - z) & 255);
      return i + l;
    }),
    (c.prototype.writeInt8 = function (n, i, l) {
      return (
        (n = +n),
        (i = i >>> 0),
        l || $(this, n, i, 1, 127, -128),
        n < 0 && (n = 255 + n + 1),
        (this[i] = n & 255),
        i + 1
      );
    }),
    (c.prototype.writeInt16LE = function (n, i, l) {
      return (
        (n = +n),
        (i = i >>> 0),
        l || $(this, n, i, 2, 32767, -32768),
        (this[i] = n & 255),
        (this[i + 1] = n >>> 8),
        i + 2
      );
    }),
    (c.prototype.writeInt16BE = function (n, i, l) {
      return (
        (n = +n),
        (i = i >>> 0),
        l || $(this, n, i, 2, 32767, -32768),
        (this[i] = n >>> 8),
        (this[i + 1] = n & 255),
        i + 2
      );
    }),
    (c.prototype.writeInt32LE = function (n, i, l) {
      return (
        (n = +n),
        (i = i >>> 0),
        l || $(this, n, i, 4, 2147483647, -2147483648),
        (this[i] = n & 255),
        (this[i + 1] = n >>> 8),
        (this[i + 2] = n >>> 16),
        (this[i + 3] = n >>> 24),
        i + 4
      );
    }),
    (c.prototype.writeInt32BE = function (n, i, l) {
      return (
        (n = +n),
        (i = i >>> 0),
        l || $(this, n, i, 4, 2147483647, -2147483648),
        n < 0 && (n = 4294967295 + n + 1),
        (this[i] = n >>> 24),
        (this[i + 1] = n >>> 16),
        (this[i + 2] = n >>> 8),
        (this[i + 3] = n & 255),
        i + 4
      );
    });
  function yt(f, n, i, l, p, E) {
    if (i + l > f.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError("Index out of range");
  }
  function y(f, n, i, l, p) {
    return (
      (n = +n),
      (i = i >>> 0),
      p || yt(f, n, i, 4),
      r.write(f, n, i, l, 23, 4),
      i + 4
    );
  }
  (c.prototype.writeFloatLE = function (n, i, l) {
    return y(this, n, i, !0, l);
  }),
    (c.prototype.writeFloatBE = function (n, i, l) {
      return y(this, n, i, !1, l);
    });
  function dt(f, n, i, l, p) {
    return (
      (n = +n),
      (i = i >>> 0),
      p || yt(f, n, i, 8),
      r.write(f, n, i, l, 52, 8),
      i + 8
    );
  }
  (c.prototype.writeDoubleLE = function (n, i, l) {
    return dt(this, n, i, !0, l);
  }),
    (c.prototype.writeDoubleBE = function (n, i, l) {
      return dt(this, n, i, !1, l);
    }),
    (c.prototype.copy = function (n, i, l, p) {
      if (!c.isBuffer(n)) throw new TypeError("argument should be a Buffer");
      if (
        (l || (l = 0),
        !p && p !== 0 && (p = this.length),
        i >= n.length && (i = n.length),
        i || (i = 0),
        p > 0 && p < l && (p = l),
        p === l || n.length === 0 || this.length === 0)
      )
        return 0;
      if (i < 0) throw new RangeError("targetStart out of bounds");
      if (l < 0 || l >= this.length) throw new RangeError("Index out of range");
      if (p < 0) throw new RangeError("sourceEnd out of bounds");
      p > this.length && (p = this.length),
        n.length - i < p - l && (p = n.length - i + l);
      var E = p - l;
      return (
        this === n && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(i, l, p)
          : Uint8Array.prototype.set.call(n, this.subarray(l, p), i),
        E
      );
    }),
    (c.prototype.fill = function (n, i, l, p) {
      if (typeof n == "string") {
        if (
          (typeof i == "string"
            ? ((p = i), (i = 0), (l = this.length))
            : typeof l == "string" && ((p = l), (l = this.length)),
          p !== void 0 && typeof p != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof p == "string" && !c.isEncoding(p))
          throw new TypeError("Unknown encoding: " + p);
        if (n.length === 1) {
          var E = n.charCodeAt(0);
          ((p === "utf8" && E < 128) || p === "latin1") && (n = E);
        }
      } else
        typeof n == "number"
          ? (n = n & 255)
          : typeof n == "boolean" && (n = Number(n));
      if (i < 0 || this.length < i || this.length < l)
        throw new RangeError("Out of range index");
      if (l <= i) return this;
      (i = i >>> 0), (l = l === void 0 ? this.length : l >>> 0), n || (n = 0);
      var F;
      if (typeof n == "number") for (F = i; F < l; ++F) this[F] = n;
      else {
        var D = c.isBuffer(n) ? n : c.from(n, p),
          z = D.length;
        if (z === 0)
          throw new TypeError(
            'The value "' + n + '" is invalid for argument "value"',
          );
        for (F = 0; F < l - i; ++F) this[F + i] = D[F % z];
      }
      return this;
    });
  var mt = /[^+/0-9A-Za-z-_]/g;
  function Tt(f) {
    if (((f = f.split("=")[0]), (f = f.trim().replace(mt, "")), f.length < 2))
      return "";
    for (; f.length % 4 !== 0; ) f = f + "=";
    return f;
  }
  function H(f, n) {
    n = n || 1 / 0;
    for (var i, l = f.length, p = null, E = [], F = 0; F < l; ++F) {
      if (((i = f.charCodeAt(F)), i > 55295 && i < 57344)) {
        if (!p) {
          if (i > 56319) {
            (n -= 3) > -1 && E.push(239, 191, 189);
            continue;
          } else if (F + 1 === l) {
            (n -= 3) > -1 && E.push(239, 191, 189);
            continue;
          }
          p = i;
          continue;
        }
        if (i < 56320) {
          (n -= 3) > -1 && E.push(239, 191, 189), (p = i);
          continue;
        }
        i = (((p - 55296) << 10) | (i - 56320)) + 65536;
      } else p && (n -= 3) > -1 && E.push(239, 191, 189);
      if (((p = null), i < 128)) {
        if ((n -= 1) < 0) break;
        E.push(i);
      } else if (i < 2048) {
        if ((n -= 2) < 0) break;
        E.push((i >> 6) | 192, (i & 63) | 128);
      } else if (i < 65536) {
        if ((n -= 3) < 0) break;
        E.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (i & 63) | 128);
      } else if (i < 1114112) {
        if ((n -= 4) < 0) break;
        E.push(
          (i >> 18) | 240,
          ((i >> 12) & 63) | 128,
          ((i >> 6) & 63) | 128,
          (i & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return E;
  }
  function Y(f) {
    for (var n = [], i = 0; i < f.length; ++i) n.push(f.charCodeAt(i) & 255);
    return n;
  }
  function w(f, n) {
    for (var i, l, p, E = [], F = 0; F < f.length && !((n -= 2) < 0); ++F)
      (i = f.charCodeAt(F)), (l = i >> 8), (p = i % 256), E.push(p), E.push(l);
    return E;
  }
  function x(f) {
    return t.toByteArray(Tt(f));
  }
  function _(f, n, i, l) {
    for (var p = 0; p < l && !(p + i >= n.length || p >= f.length); ++p)
      n[p + i] = f[p];
    return p;
  }
  function T(f, n) {
    return (
      f instanceof n ||
      (f != null &&
        f.constructor != null &&
        f.constructor.name != null &&
        f.constructor.name === n.name)
    );
  }
  function B(f) {
    return f !== f;
  }
  var U = (function () {
    for (var f = "0123456789abcdef", n = new Array(256), i = 0; i < 16; ++i)
      for (var l = i * 16, p = 0; p < 16; ++p) n[l + p] = f[i] + f[p];
    return n;
  })();
})(Oe);
var ci = { exports: {} };
(function (e) {
  (function (t) {
    var r,
      s = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      u = Math.ceil,
      d = Math.floor,
      g = "[BigNumber Error] ",
      c = g + "Number primitive has more than 15 significant digits: ",
      b = 1e14,
      S = 14,
      N = 9007199254740991,
      L = [
        1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
      ],
      O = 1e7,
      P = 1e9;
    function q(J) {
      var X,
        nt,
        it,
        C = (y.prototype = { constructor: y, toString: null, valueOf: null }),
        xt = new y(1),
        ct = 20,
        ft = 4,
        St = -7,
        _t = 21,
        Z = -1e7,
        M = 1e7,
        k = !1,
        j = 1,
        Q = 0,
        G = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          suffix: "",
        },
        $ = "0123456789abcdefghijklmnopqrstuvwxyz",
        yt = !0;
      function y(w, x) {
        var _,
          T,
          B,
          U,
          f,
          n,
          i,
          l,
          p = this;
        if (!(p instanceof y)) return new y(w, x);
        if (x == null) {
          if (w && w._isBigNumber === !0) {
            (p.s = w.s),
              !w.c || w.e > M
                ? (p.c = p.e = null)
                : w.e < Z
                  ? (p.c = [(p.e = 0)])
                  : ((p.e = w.e), (p.c = w.c.slice()));
            return;
          }
          if ((n = typeof w == "number") && w * 0 == 0) {
            if (((p.s = 1 / w < 0 ? ((w = -w), -1) : 1), w === ~~w)) {
              for (U = 0, f = w; f >= 10; f /= 10, U++);
              U > M ? (p.c = p.e = null) : ((p.e = U), (p.c = [w]));
              return;
            }
            l = String(w);
          } else {
            if (!s.test((l = String(w)))) return it(p, l, n);
            p.s = l.charCodeAt(0) == 45 ? ((l = l.slice(1)), -1) : 1;
          }
          (U = l.indexOf(".")) > -1 && (l = l.replace(".", "")),
            (f = l.search(/e/i)) > 0
              ? (U < 0 && (U = f),
                (U += +l.slice(f + 1)),
                (l = l.substring(0, f)))
              : U < 0 && (U = l.length);
        } else {
          if ((at(x, 2, $.length, "Base"), x == 10 && yt))
            return (p = new y(w)), H(p, ct + p.e + 1, ft);
          if (((l = String(w)), (n = typeof w == "number"))) {
            if (w * 0 != 0) return it(p, l, n, x);
            if (
              ((p.s = 1 / w < 0 ? ((l = l.slice(1)), -1) : 1),
              y.DEBUG && l.replace(/^0\.0*|\./, "").length > 15)
            )
              throw Error(c + w);
          } else p.s = l.charCodeAt(0) === 45 ? ((l = l.slice(1)), -1) : 1;
          for (_ = $.slice(0, x), U = f = 0, i = l.length; f < i; f++)
            if (_.indexOf((T = l.charAt(f))) < 0) {
              if (T == ".") {
                if (f > U) {
                  U = i;
                  continue;
                }
              } else if (
                !B &&
                ((l == l.toUpperCase() && (l = l.toLowerCase())) ||
                  (l == l.toLowerCase() && (l = l.toUpperCase())))
              ) {
                (B = !0), (f = -1), (U = 0);
                continue;
              }
              return it(p, String(w), n, x);
            }
          (n = !1),
            (l = nt(l, x, 10, p.s)),
            (U = l.indexOf(".")) > -1
              ? (l = l.replace(".", ""))
              : (U = l.length);
        }
        for (f = 0; l.charCodeAt(f) === 48; f++);
        for (i = l.length; l.charCodeAt(--i) === 48; );
        if ((l = l.slice(f, ++i))) {
          if (((i -= f), n && y.DEBUG && i > 15 && (w > N || w !== d(w))))
            throw Error(c + p.s * w);
          if ((U = U - f - 1) > M) p.c = p.e = null;
          else if (U < Z) p.c = [(p.e = 0)];
          else {
            if (
              ((p.e = U),
              (p.c = []),
              (f = (U + 1) % S),
              U < 0 && (f += S),
              f < i)
            ) {
              for (f && p.c.push(+l.slice(0, f)), i -= S; f < i; )
                p.c.push(+l.slice(f, (f += S)));
              f = S - (l = l.slice(f)).length;
            } else f -= i;
            for (; f--; l += "0");
            p.c.push(+l);
          }
        } else p.c = [(p.e = 0)];
      }
      (y.clone = q),
        (y.ROUND_UP = 0),
        (y.ROUND_DOWN = 1),
        (y.ROUND_CEIL = 2),
        (y.ROUND_FLOOR = 3),
        (y.ROUND_HALF_UP = 4),
        (y.ROUND_HALF_DOWN = 5),
        (y.ROUND_HALF_EVEN = 6),
        (y.ROUND_HALF_CEIL = 7),
        (y.ROUND_HALF_FLOOR = 8),
        (y.EUCLID = 9),
        (y.config = y.set =
          function (w) {
            var x, _;
            if (w != null)
              if (typeof w == "object") {
                if (
                  (w.hasOwnProperty((x = "DECIMAL_PLACES")) &&
                    ((_ = w[x]), at(_, 0, P, x), (ct = _)),
                  w.hasOwnProperty((x = "ROUNDING_MODE")) &&
                    ((_ = w[x]), at(_, 0, 8, x), (ft = _)),
                  w.hasOwnProperty((x = "EXPONENTIAL_AT")) &&
                    ((_ = w[x]),
                    _ && _.pop
                      ? (at(_[0], -1e9, 0, x),
                        at(_[1], 0, P, x),
                        (St = _[0]),
                        (_t = _[1]))
                      : (at(_, -1e9, P, x), (St = -(_t = _ < 0 ? -_ : _)))),
                  w.hasOwnProperty((x = "RANGE")))
                )
                  if (((_ = w[x]), _ && _.pop))
                    at(_[0], -1e9, -1, x),
                      at(_[1], 1, P, x),
                      (Z = _[0]),
                      (M = _[1]);
                  else if ((at(_, -1e9, P, x), _)) Z = -(M = _ < 0 ? -_ : _);
                  else throw Error(g + x + " cannot be zero: " + _);
                if (w.hasOwnProperty((x = "CRYPTO")))
                  if (((_ = w[x]), _ === !!_))
                    if (_)
                      if (
                        typeof crypto < "u" &&
                        crypto &&
                        (crypto.getRandomValues || crypto.randomBytes)
                      )
                        k = _;
                      else throw ((k = !_), Error(g + "crypto unavailable"));
                    else k = _;
                  else throw Error(g + x + " not true or false: " + _);
                if (
                  (w.hasOwnProperty((x = "MODULO_MODE")) &&
                    ((_ = w[x]), at(_, 0, 9, x), (j = _)),
                  w.hasOwnProperty((x = "POW_PRECISION")) &&
                    ((_ = w[x]), at(_, 0, P, x), (Q = _)),
                  w.hasOwnProperty((x = "FORMAT")))
                )
                  if (((_ = w[x]), typeof _ == "object")) G = _;
                  else throw Error(g + x + " not an object: " + _);
                if (w.hasOwnProperty((x = "ALPHABET")))
                  if (
                    ((_ = w[x]),
                    typeof _ == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(_))
                  )
                    (yt = _.slice(0, 10) == "0123456789"), ($ = _);
                  else throw Error(g + x + " invalid: " + _);
              } else throw Error(g + "Object expected: " + w);
            return {
              DECIMAL_PLACES: ct,
              ROUNDING_MODE: ft,
              EXPONENTIAL_AT: [St, _t],
              RANGE: [Z, M],
              CRYPTO: k,
              MODULO_MODE: j,
              POW_PRECISION: Q,
              FORMAT: G,
              ALPHABET: $,
            };
          }),
        (y.isBigNumber = function (w) {
          if (!w || w._isBigNumber !== !0) return !1;
          if (!y.DEBUG) return !0;
          var x,
            _,
            T = w.c,
            B = w.e,
            U = w.s;
          t: if ({}.toString.call(T) == "[object Array]") {
            if ((U === 1 || U === -1) && B >= -1e9 && B <= P && B === d(B)) {
              if (T[0] === 0) {
                if (B === 0 && T.length === 1) return !0;
                break t;
              }
              if (
                ((x = (B + 1) % S), x < 1 && (x += S), String(T[0]).length == x)
              ) {
                for (x = 0; x < T.length; x++)
                  if (((_ = T[x]), _ < 0 || _ >= b || _ !== d(_))) break t;
                if (_ !== 0) return !0;
              }
            }
          } else if (
            T === null &&
            B === null &&
            (U === null || U === 1 || U === -1)
          )
            return !0;
          throw Error(g + "Invalid BigNumber: " + w);
        }),
        (y.maximum = y.max =
          function () {
            return mt(arguments, -1);
          }),
        (y.minimum = y.min =
          function () {
            return mt(arguments, 1);
          }),
        (y.random = (function () {
          var w = 9007199254740992,
            x =
              (Math.random() * w) & 2097151
                ? function () {
                    return d(Math.random() * w);
                  }
                : function () {
                    return (
                      ((Math.random() * 1073741824) | 0) * 8388608 +
                      ((Math.random() * 8388608) | 0)
                    );
                  };
          return function (_) {
            var T,
              B,
              U,
              f,
              n,
              i = 0,
              l = [],
              p = new y(xt);
            if ((_ == null ? (_ = ct) : at(_, 0, P), (f = u(_ / S)), k))
              if (crypto.getRandomValues) {
                for (
                  T = crypto.getRandomValues(new Uint32Array((f *= 2)));
                  i < f;

                )
                  (n = T[i] * 131072 + (T[i + 1] >>> 11)),
                    n >= 9e15
                      ? ((B = crypto.getRandomValues(new Uint32Array(2))),
                        (T[i] = B[0]),
                        (T[i + 1] = B[1]))
                      : (l.push(n % 1e14), (i += 2));
                i = f / 2;
              } else if (crypto.randomBytes) {
                for (T = crypto.randomBytes((f *= 7)); i < f; )
                  (n =
                    (T[i] & 31) * 281474976710656 +
                    T[i + 1] * 1099511627776 +
                    T[i + 2] * 4294967296 +
                    T[i + 3] * 16777216 +
                    (T[i + 4] << 16) +
                    (T[i + 5] << 8) +
                    T[i + 6]),
                    n >= 9e15
                      ? crypto.randomBytes(7).copy(T, i)
                      : (l.push(n % 1e14), (i += 7));
                i = f / 7;
              } else throw ((k = !1), Error(g + "crypto unavailable"));
            if (!k) for (; i < f; ) (n = x()), n < 9e15 && (l[i++] = n % 1e14);
            for (
              f = l[--i],
                _ %= S,
                f && _ && ((n = L[S - _]), (l[i] = d(f / n) * n));
              l[i] === 0;
              l.pop(), i--
            );
            if (i < 0) l = [(U = 0)];
            else {
              for (U = -1; l[0] === 0; l.splice(0, 1), U -= S);
              for (i = 1, n = l[0]; n >= 10; n /= 10, i++);
              i < S && (U -= S - i);
            }
            return (p.e = U), (p.c = l), p;
          };
        })()),
        (y.sum = function () {
          for (var w = 1, x = arguments, _ = new y(x[0]); w < x.length; )
            _ = _.plus(x[w++]);
          return _;
        }),
        (nt = (function () {
          var w = "0123456789";
          function x(_, T, B, U) {
            for (var f, n = [0], i, l = 0, p = _.length; l < p; ) {
              for (i = n.length; i--; n[i] *= T);
              for (n[0] += U.indexOf(_.charAt(l++)), f = 0; f < n.length; f++)
                n[f] > B - 1 &&
                  (n[f + 1] == null && (n[f + 1] = 0),
                  (n[f + 1] += (n[f] / B) | 0),
                  (n[f] %= B));
            }
            return n.reverse();
          }
          return function (_, T, B, U, f) {
            var n,
              i,
              l,
              p,
              E,
              F,
              D,
              z,
              V = _.indexOf("."),
              rt = ct,
              h = ft;
            for (
              V >= 0 &&
                ((p = Q),
                (Q = 0),
                (_ = _.replace(".", "")),
                (z = new y(T)),
                (F = z.pow(_.length - V)),
                (Q = p),
                (z.c = x(ut(lt(F.c), F.e, "0"), 10, B, w)),
                (z.e = z.c.length)),
                D = x(_, T, B, f ? ((n = $), w) : ((n = w), $)),
                l = p = D.length;
              D[--p] == 0;
              D.pop()
            );
            if (!D[0]) return n.charAt(0);
            if (
              (V < 0
                ? --l
                : ((F.c = D),
                  (F.e = l),
                  (F.s = U),
                  (F = X(F, z, rt, h, B)),
                  (D = F.c),
                  (E = F.r),
                  (l = F.e)),
              (i = l + rt + 1),
              (V = D[i]),
              (p = B / 2),
              (E = E || i < 0 || D[i + 1] != null),
              (E =
                h < 4
                  ? (V != null || E) && (h == 0 || h == (F.s < 0 ? 3 : 2))
                  : V > p ||
                    (V == p &&
                      (h == 4 ||
                        E ||
                        (h == 6 && D[i - 1] & 1) ||
                        h == (F.s < 0 ? 8 : 7)))),
              i < 1 || !D[0])
            )
              _ = E ? ut(n.charAt(1), -rt, n.charAt(0)) : n.charAt(0);
            else {
              if (((D.length = i), E))
                for (--B; ++D[--i] > B; )
                  (D[i] = 0), i || (++l, (D = [1].concat(D)));
              for (p = D.length; !D[--p]; );
              for (V = 0, _ = ""; V <= p; _ += n.charAt(D[V++]));
              _ = ut(_, l, n.charAt(0));
            }
            return _;
          };
        })()),
        (X = (function () {
          function w(T, B, U) {
            var f,
              n,
              i,
              l,
              p = 0,
              E = T.length,
              F = B % O,
              D = (B / O) | 0;
            for (T = T.slice(); E--; )
              (i = T[E] % O),
                (l = (T[E] / O) | 0),
                (f = D * i + l * F),
                (n = F * i + (f % O) * O + p),
                (p = ((n / U) | 0) + ((f / O) | 0) + D * l),
                (T[E] = n % U);
            return p && (T = [p].concat(T)), T;
          }
          function x(T, B, U, f) {
            var n, i;
            if (U != f) i = U > f ? 1 : -1;
            else
              for (n = i = 0; n < U; n++)
                if (T[n] != B[n]) {
                  i = T[n] > B[n] ? 1 : -1;
                  break;
                }
            return i;
          }
          function _(T, B, U, f) {
            for (var n = 0; U--; )
              (T[U] -= n),
                (n = T[U] < B[U] ? 1 : 0),
                (T[U] = n * f + T[U] - B[U]);
            for (; !T[0] && T.length > 1; T.splice(0, 1));
          }
          return function (T, B, U, f, n) {
            var i,
              l,
              p,
              E,
              F,
              D,
              z,
              V,
              rt,
              h,
              o,
              a,
              m,
              A,
              R,
              v,
              et,
              ht = T.s == B.s ? 1 : -1,
              st = T.c,
              tt = B.c;
            if (!st || !st[0] || !tt || !tt[0])
              return new y(
                !T.s || !B.s || (st ? tt && st[0] == tt[0] : !tt)
                  ? NaN
                  : (st && st[0] == 0) || !tt
                    ? ht * 0
                    : ht / 0,
              );
            for (
              V = new y(ht),
                rt = V.c = [],
                l = T.e - B.e,
                ht = U + l + 1,
                n ||
                  ((n = b), (l = W(T.e / S) - W(B.e / S)), (ht = (ht / S) | 0)),
                p = 0;
              tt[p] == (st[p] || 0);
              p++
            );
            if ((tt[p] > (st[p] || 0) && l--, ht < 0)) rt.push(1), (E = !0);
            else {
              for (
                A = st.length,
                  v = tt.length,
                  p = 0,
                  ht += 2,
                  F = d(n / (tt[0] + 1)),
                  F > 1 &&
                    ((tt = w(tt, F, n)),
                    (st = w(st, F, n)),
                    (v = tt.length),
                    (A = st.length)),
                  m = v,
                  h = st.slice(0, v),
                  o = h.length;
                o < v;
                h[o++] = 0
              );
              (et = tt.slice()),
                (et = [0].concat(et)),
                (R = tt[0]),
                tt[1] >= n / 2 && R++;
              do {
                if (((F = 0), (i = x(tt, h, v, o)), i < 0)) {
                  if (
                    ((a = h[0]),
                    v != o && (a = a * n + (h[1] || 0)),
                    (F = d(a / R)),
                    F > 1)
                  )
                    for (
                      F >= n && (F = n - 1),
                        D = w(tt, F, n),
                        z = D.length,
                        o = h.length;
                      x(D, h, z, o) == 1;

                    )
                      F--, _(D, v < z ? et : tt, z, n), (z = D.length), (i = 1);
                  else F == 0 && (i = F = 1), (D = tt.slice()), (z = D.length);
                  if (
                    (z < o && (D = [0].concat(D)),
                    _(h, D, o, n),
                    (o = h.length),
                    i == -1)
                  )
                    for (; x(tt, h, v, o) < 1; )
                      F++, _(h, v < o ? et : tt, o, n), (o = h.length);
                } else i === 0 && (F++, (h = [0]));
                (rt[p++] = F),
                  h[0] ? (h[o++] = st[m] || 0) : ((h = [st[m]]), (o = 1));
              } while ((m++ < A || h[0] != null) && ht--);
              (E = h[0] != null), rt[0] || rt.splice(0, 1);
            }
            if (n == b) {
              for (p = 1, ht = rt[0]; ht >= 10; ht /= 10, p++);
              H(V, U + (V.e = p + l * S - 1) + 1, f, E);
            } else (V.e = l), (V.r = +E);
            return V;
          };
        })());
      function dt(w, x, _, T) {
        var B, U, f, n, i;
        if ((_ == null ? (_ = ft) : at(_, 0, 8), !w.c)) return w.toString();
        if (((B = w.c[0]), (f = w.e), x == null))
          (i = lt(w.c)),
            (i =
              T == 1 || (T == 2 && (f <= St || f >= _t))
                ? Ut(i, f)
                : ut(i, f, "0"));
        else if (
          ((w = H(new y(w), x, _)),
          (U = w.e),
          (i = lt(w.c)),
          (n = i.length),
          T == 1 || (T == 2 && (x <= U || U <= St)))
        ) {
          for (; n < x; i += "0", n++);
          i = Ut(i, U);
        } else if (((x -= f), (i = ut(i, U, "0")), U + 1 > n)) {
          if (--x > 0) for (i += "."; x--; i += "0");
        } else if (((x += U - n), x > 0))
          for (U + 1 == n && (i += "."); x--; i += "0");
        return w.s < 0 && B ? "-" + i : i;
      }
      function mt(w, x) {
        for (var _, T, B = 1, U = new y(w[0]); B < w.length; B++)
          (T = new y(w[B])),
            (!T.s || (_ = Et(U, T)) === x || (_ === 0 && U.s === x)) && (U = T);
        return U;
      }
      function Tt(w, x, _) {
        for (var T = 1, B = x.length; !x[--B]; x.pop());
        for (B = x[0]; B >= 10; B /= 10, T++);
        return (
          (_ = T + _ * S - 1) > M
            ? (w.c = w.e = null)
            : _ < Z
              ? (w.c = [(w.e = 0)])
              : ((w.e = _), (w.c = x)),
          w
        );
      }
      it = (function () {
        var w = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          x = /^([^.]+)\.$/,
          _ = /^\.([^.]+)$/,
          T = /^-?(Infinity|NaN)$/,
          B = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function (U, f, n, i) {
          var l,
            p = n ? f : f.replace(B, "");
          if (T.test(p)) U.s = isNaN(p) ? null : p < 0 ? -1 : 1;
          else {
            if (
              !n &&
              ((p = p.replace(w, function (E, F, D) {
                return (
                  (l = (D = D.toLowerCase()) == "x" ? 16 : D == "b" ? 2 : 8),
                  !i || i == l ? F : E
                );
              })),
              i && ((l = i), (p = p.replace(x, "$1").replace(_, "0.$1"))),
              f != p)
            )
              return new y(p, l);
            if (y.DEBUG)
              throw Error(
                g + "Not a" + (i ? " base " + i : "") + " number: " + f,
              );
            U.s = null;
          }
          U.c = U.e = null;
        };
      })();
      function H(w, x, _, T) {
        var B,
          U,
          f,
          n,
          i,
          l,
          p,
          E = w.c,
          F = L;
        if (E) {
          t: {
            for (B = 1, n = E[0]; n >= 10; n /= 10, B++);
            if (((U = x - B), U < 0))
              (U += S),
                (f = x),
                (i = E[(l = 0)]),
                (p = d((i / F[B - f - 1]) % 10));
            else if (((l = u((U + 1) / S)), l >= E.length))
              if (T) {
                for (; E.length <= l; E.push(0));
                (i = p = 0), (B = 1), (U %= S), (f = U - S + 1);
              } else break t;
            else {
              for (i = n = E[l], B = 1; n >= 10; n /= 10, B++);
              (U %= S),
                (f = U - S + B),
                (p = f < 0 ? 0 : d((i / F[B - f - 1]) % 10));
            }
            if (
              ((T =
                T ||
                x < 0 ||
                E[l + 1] != null ||
                (f < 0 ? i : i % F[B - f - 1])),
              (T =
                _ < 4
                  ? (p || T) && (_ == 0 || _ == (w.s < 0 ? 3 : 2))
                  : p > 5 ||
                    (p == 5 &&
                      (_ == 4 ||
                        T ||
                        (_ == 6 &&
                          (U > 0 ? (f > 0 ? i / F[B - f] : 0) : E[l - 1]) % 10 &
                            1) ||
                        _ == (w.s < 0 ? 8 : 7)))),
              x < 1 || !E[0])
            )
              return (
                (E.length = 0),
                T
                  ? ((x -= w.e + 1),
                    (E[0] = F[(S - (x % S)) % S]),
                    (w.e = -x || 0))
                  : (E[0] = w.e = 0),
                w
              );
            if (
              (U == 0
                ? ((E.length = l), (n = 1), l--)
                : ((E.length = l + 1),
                  (n = F[S - U]),
                  (E[l] = f > 0 ? d((i / F[B - f]) % F[f]) * n : 0)),
              T)
            )
              for (;;)
                if (l == 0) {
                  for (U = 1, f = E[0]; f >= 10; f /= 10, U++);
                  for (f = E[0] += n, n = 1; f >= 10; f /= 10, n++);
                  U != n && (w.e++, E[0] == b && (E[0] = 1));
                  break;
                } else {
                  if (((E[l] += n), E[l] != b)) break;
                  (E[l--] = 0), (n = 1);
                }
            for (U = E.length; E[--U] === 0; E.pop());
          }
          w.e > M ? (w.c = w.e = null) : w.e < Z && (w.c = [(w.e = 0)]);
        }
        return w;
      }
      function Y(w) {
        var x,
          _ = w.e;
        return _ === null
          ? w.toString()
          : ((x = lt(w.c)),
            (x = _ <= St || _ >= _t ? Ut(x, _) : ut(x, _, "0")),
            w.s < 0 ? "-" + x : x);
      }
      return (
        (C.absoluteValue = C.abs =
          function () {
            var w = new y(this);
            return w.s < 0 && (w.s = 1), w;
          }),
        (C.comparedTo = function (w, x) {
          return Et(this, new y(w, x));
        }),
        (C.decimalPlaces = C.dp =
          function (w, x) {
            var _,
              T,
              B,
              U = this;
            if (w != null)
              return (
                at(w, 0, P),
                x == null ? (x = ft) : at(x, 0, 8),
                H(new y(U), w + U.e + 1, x)
              );
            if (!(_ = U.c)) return null;
            if (((T = ((B = _.length - 1) - W(this.e / S)) * S), (B = _[B])))
              for (; B % 10 == 0; B /= 10, T--);
            return T < 0 && (T = 0), T;
          }),
        (C.dividedBy = C.div =
          function (w, x) {
            return X(this, new y(w, x), ct, ft);
          }),
        (C.dividedToIntegerBy = C.idiv =
          function (w, x) {
            return X(this, new y(w, x), 0, 1);
          }),
        (C.exponentiatedBy = C.pow =
          function (w, x) {
            var _,
              T,
              B,
              U,
              f,
              n,
              i,
              l,
              p,
              E = this;
            if (((w = new y(w)), w.c && !w.isInteger()))
              throw Error(g + "Exponent not an integer: " + Y(w));
            if (
              (x != null && (x = new y(x)),
              (n = w.e > 14),
              !E.c ||
                !E.c[0] ||
                (E.c[0] == 1 && !E.e && E.c.length == 1) ||
                !w.c ||
                !w.c[0])
            )
              return (
                (p = new y(Math.pow(+Y(E), n ? w.s * (2 - K(w)) : +Y(w)))),
                x ? p.mod(x) : p
              );
            if (((i = w.s < 0), x)) {
              if (x.c ? !x.c[0] : !x.s) return new y(NaN);
              (T = !i && E.isInteger() && x.isInteger()), T && (E = E.mod(x));
            } else {
              if (
                w.e > 9 &&
                (E.e > 0 ||
                  E.e < -1 ||
                  (E.e == 0
                    ? E.c[0] > 1 || (n && E.c[1] >= 24e7)
                    : E.c[0] < 8e13 || (n && E.c[0] <= 9999975e7)))
              )
                return (
                  (U = E.s < 0 && K(w) ? -0 : 0),
                  E.e > -1 && (U = 1 / U),
                  new y(i ? 1 / U : U)
                );
              Q && (U = u(Q / S + 2));
            }
            for (
              n
                ? ((_ = new y(0.5)), i && (w.s = 1), (l = K(w)))
                : ((B = Math.abs(+Y(w))), (l = B % 2)),
                p = new y(xt);
              ;

            ) {
              if (l) {
                if (((p = p.times(E)), !p.c)) break;
                U ? p.c.length > U && (p.c.length = U) : T && (p = p.mod(x));
              }
              if (B) {
                if (((B = d(B / 2)), B === 0)) break;
                l = B % 2;
              } else if (((w = w.times(_)), H(w, w.e + 1, 1), w.e > 14))
                l = K(w);
              else {
                if (((B = +Y(w)), B === 0)) break;
                l = B % 2;
              }
              (E = E.times(E)),
                U
                  ? E.c && E.c.length > U && (E.c.length = U)
                  : T && (E = E.mod(x));
            }
            return T
              ? p
              : (i && (p = xt.div(p)), x ? p.mod(x) : U ? H(p, Q, ft, f) : p);
          }),
        (C.integerValue = function (w) {
          var x = new y(this);
          return w == null ? (w = ft) : at(w, 0, 8), H(x, x.e + 1, w);
        }),
        (C.isEqualTo = C.eq =
          function (w, x) {
            return Et(this, new y(w, x)) === 0;
          }),
        (C.isFinite = function () {
          return !!this.c;
        }),
        (C.isGreaterThan = C.gt =
          function (w, x) {
            return Et(this, new y(w, x)) > 0;
          }),
        (C.isGreaterThanOrEqualTo = C.gte =
          function (w, x) {
            return (x = Et(this, new y(w, x))) === 1 || x === 0;
          }),
        (C.isInteger = function () {
          return !!this.c && W(this.e / S) > this.c.length - 2;
        }),
        (C.isLessThan = C.lt =
          function (w, x) {
            return Et(this, new y(w, x)) < 0;
          }),
        (C.isLessThanOrEqualTo = C.lte =
          function (w, x) {
            return (x = Et(this, new y(w, x))) === -1 || x === 0;
          }),
        (C.isNaN = function () {
          return !this.s;
        }),
        (C.isNegative = function () {
          return this.s < 0;
        }),
        (C.isPositive = function () {
          return this.s > 0;
        }),
        (C.isZero = function () {
          return !!this.c && this.c[0] == 0;
        }),
        (C.minus = function (w, x) {
          var _,
            T,
            B,
            U,
            f = this,
            n = f.s;
          if (((w = new y(w, x)), (x = w.s), !n || !x)) return new y(NaN);
          if (n != x) return (w.s = -x), f.plus(w);
          var i = f.e / S,
            l = w.e / S,
            p = f.c,
            E = w.c;
          if (!i || !l) {
            if (!p || !E) return p ? ((w.s = -x), w) : new y(E ? f : NaN);
            if (!p[0] || !E[0])
              return E[0]
                ? ((w.s = -x), w)
                : new y(p[0] ? f : ft == 3 ? -0 : 0);
          }
          if (((i = W(i)), (l = W(l)), (p = p.slice()), (n = i - l))) {
            for (
              (U = n < 0) ? ((n = -n), (B = p)) : ((l = i), (B = E)),
                B.reverse(),
                x = n;
              x--;
              B.push(0)
            );
            B.reverse();
          } else
            for (
              T = (U = (n = p.length) < (x = E.length)) ? n : x, n = x = 0;
              x < T;
              x++
            )
              if (p[x] != E[x]) {
                U = p[x] < E[x];
                break;
              }
          if (
            (U && ((B = p), (p = E), (E = B), (w.s = -w.s)),
            (x = (T = E.length) - (_ = p.length)),
            x > 0)
          )
            for (; x--; p[_++] = 0);
          for (x = b - 1; T > n; ) {
            if (p[--T] < E[T]) {
              for (_ = T; _ && !p[--_]; p[_] = x);
              --p[_], (p[T] += b);
            }
            p[T] -= E[T];
          }
          for (; p[0] == 0; p.splice(0, 1), --l);
          return p[0]
            ? Tt(w, p, l)
            : ((w.s = ft == 3 ? -1 : 1), (w.c = [(w.e = 0)]), w);
        }),
        (C.modulo = C.mod =
          function (w, x) {
            var _,
              T,
              B = this;
            return (
              (w = new y(w, x)),
              !B.c || !w.s || (w.c && !w.c[0])
                ? new y(NaN)
                : !w.c || (B.c && !B.c[0])
                  ? new y(B)
                  : (j == 9
                      ? ((T = w.s),
                        (w.s = 1),
                        (_ = X(B, w, 0, 3)),
                        (w.s = T),
                        (_.s *= T))
                      : (_ = X(B, w, 0, j)),
                    (w = B.minus(_.times(w))),
                    !w.c[0] && j == 1 && (w.s = B.s),
                    w)
            );
          }),
        (C.multipliedBy = C.times =
          function (w, x) {
            var _,
              T,
              B,
              U,
              f,
              n,
              i,
              l,
              p,
              E,
              F,
              D,
              z,
              V,
              rt,
              h = this,
              o = h.c,
              a = (w = new y(w, x)).c;
            if (!o || !a || !o[0] || !a[0])
              return (
                !h.s || !w.s || (o && !o[0] && !a) || (a && !a[0] && !o)
                  ? (w.c = w.e = w.s = null)
                  : ((w.s *= h.s),
                    !o || !a ? (w.c = w.e = null) : ((w.c = [0]), (w.e = 0))),
                w
              );
            for (
              T = W(h.e / S) + W(w.e / S),
                w.s *= h.s,
                i = o.length,
                E = a.length,
                i < E && ((z = o), (o = a), (a = z), (B = i), (i = E), (E = B)),
                B = i + E,
                z = [];
              B--;
              z.push(0)
            );
            for (V = b, rt = O, B = E; --B >= 0; ) {
              for (
                _ = 0, F = a[B] % rt, D = (a[B] / rt) | 0, f = i, U = B + f;
                U > B;

              )
                (l = o[--f] % rt),
                  (p = (o[f] / rt) | 0),
                  (n = D * l + p * F),
                  (l = F * l + (n % rt) * rt + z[U] + _),
                  (_ = ((l / V) | 0) + ((n / rt) | 0) + D * p),
                  (z[U--] = l % V);
              z[U] = _;
            }
            return _ ? ++T : z.splice(0, 1), Tt(w, z, T);
          }),
        (C.negated = function () {
          var w = new y(this);
          return (w.s = -w.s || null), w;
        }),
        (C.plus = function (w, x) {
          var _,
            T = this,
            B = T.s;
          if (((w = new y(w, x)), (x = w.s), !B || !x)) return new y(NaN);
          if (B != x) return (w.s = -x), T.minus(w);
          var U = T.e / S,
            f = w.e / S,
            n = T.c,
            i = w.c;
          if (!U || !f) {
            if (!n || !i) return new y(B / 0);
            if (!n[0] || !i[0]) return i[0] ? w : new y(n[0] ? T : B * 0);
          }
          if (((U = W(U)), (f = W(f)), (n = n.slice()), (B = U - f))) {
            for (
              B > 0 ? ((f = U), (_ = i)) : ((B = -B), (_ = n)), _.reverse();
              B--;
              _.push(0)
            );
            _.reverse();
          }
          for (
            B = n.length,
              x = i.length,
              B - x < 0 && ((_ = i), (i = n), (n = _), (x = B)),
              B = 0;
            x;

          )
            (B = ((n[--x] = n[x] + i[x] + B) / b) | 0),
              (n[x] = b === n[x] ? 0 : n[x] % b);
          return B && ((n = [B].concat(n)), ++f), Tt(w, n, f);
        }),
        (C.precision = C.sd =
          function (w, x) {
            var _,
              T,
              B,
              U = this;
            if (w != null && w !== !!w)
              return (
                at(w, 1, P),
                x == null ? (x = ft) : at(x, 0, 8),
                H(new y(U), w, x)
              );
            if (!(_ = U.c)) return null;
            if (((B = _.length - 1), (T = B * S + 1), (B = _[B]))) {
              for (; B % 10 == 0; B /= 10, T--);
              for (B = _[0]; B >= 10; B /= 10, T++);
            }
            return w && U.e + 1 > T && (T = U.e + 1), T;
          }),
        (C.shiftedBy = function (w) {
          return at(w, -9007199254740991, N), this.times("1e" + w);
        }),
        (C.squareRoot = C.sqrt =
          function () {
            var w,
              x,
              _,
              T,
              B,
              U = this,
              f = U.c,
              n = U.s,
              i = U.e,
              l = ct + 4,
              p = new y("0.5");
            if (n !== 1 || !f || !f[0])
              return new y(!n || (n < 0 && (!f || f[0])) ? NaN : f ? U : 1 / 0);
            if (
              ((n = Math.sqrt(+Y(U))),
              n == 0 || n == 1 / 0
                ? ((x = lt(f)),
                  (x.length + i) % 2 == 0 && (x += "0"),
                  (n = Math.sqrt(+x)),
                  (i = W((i + 1) / 2) - (i < 0 || i % 2)),
                  n == 1 / 0
                    ? (x = "5e" + i)
                    : ((x = n.toExponential()),
                      (x = x.slice(0, x.indexOf("e") + 1) + i)),
                  (_ = new y(x)))
                : (_ = new y(n + "")),
              _.c[0])
            ) {
              for (i = _.e, n = i + l, n < 3 && (n = 0); ; )
                if (
                  ((B = _),
                  (_ = p.times(B.plus(X(U, B, l, 1)))),
                  lt(B.c).slice(0, n) === (x = lt(_.c)).slice(0, n))
                )
                  if (
                    (_.e < i && --n,
                    (x = x.slice(n - 3, n + 1)),
                    x == "9999" || (!T && x == "4999"))
                  ) {
                    if (!T && (H(B, B.e + ct + 2, 0), B.times(B).eq(U))) {
                      _ = B;
                      break;
                    }
                    (l += 4), (n += 4), (T = 1);
                  } else {
                    (!+x || (!+x.slice(1) && x.charAt(0) == "5")) &&
                      (H(_, _.e + ct + 2, 1), (w = !_.times(_).eq(U)));
                    break;
                  }
            }
            return H(_, _.e + ct + 1, ft, w);
          }),
        (C.toExponential = function (w, x) {
          return w != null && (at(w, 0, P), w++), dt(this, w, x, 1);
        }),
        (C.toFixed = function (w, x) {
          return (
            w != null && (at(w, 0, P), (w = w + this.e + 1)), dt(this, w, x)
          );
        }),
        (C.toFormat = function (w, x, _) {
          var T,
            B = this;
          if (_ == null)
            w != null && x && typeof x == "object"
              ? ((_ = x), (x = null))
              : w && typeof w == "object"
                ? ((_ = w), (w = x = null))
                : (_ = G);
          else if (typeof _ != "object")
            throw Error(g + "Argument not an object: " + _);
          if (((T = B.toFixed(w, x)), B.c)) {
            var U,
              f = T.split("."),
              n = +_.groupSize,
              i = +_.secondaryGroupSize,
              l = _.groupSeparator || "",
              p = f[0],
              E = f[1],
              F = B.s < 0,
              D = F ? p.slice(1) : p,
              z = D.length;
            if ((i && ((U = n), (n = i), (i = U), (z -= U)), n > 0 && z > 0)) {
              for (U = z % n || n, p = D.substr(0, U); U < z; U += n)
                p += l + D.substr(U, n);
              i > 0 && (p += l + D.slice(U)), F && (p = "-" + p);
            }
            T = E
              ? p +
                (_.decimalSeparator || "") +
                ((i = +_.fractionGroupSize)
                  ? E.replace(
                      new RegExp("\\d{" + i + "}\\B", "g"),
                      "$&" + (_.fractionGroupSeparator || ""),
                    )
                  : E)
              : p;
          }
          return (_.prefix || "") + T + (_.suffix || "");
        }),
        (C.toFraction = function (w) {
          var x,
            _,
            T,
            B,
            U,
            f,
            n,
            i,
            l,
            p,
            E,
            F,
            D = this,
            z = D.c;
          if (
            w != null &&
            ((n = new y(w)), (!n.isInteger() && (n.c || n.s !== 1)) || n.lt(xt))
          )
            throw Error(
              g +
                "Argument " +
                (n.isInteger() ? "out of range: " : "not an integer: ") +
                Y(n),
            );
          if (!z) return new y(D);
          for (
            x = new y(xt),
              l = _ = new y(xt),
              T = i = new y(xt),
              F = lt(z),
              U = x.e = F.length - D.e - 1,
              x.c[0] = L[(f = U % S) < 0 ? S + f : f],
              w = !w || n.comparedTo(x) > 0 ? (U > 0 ? x : l) : n,
              f = M,
              M = 1 / 0,
              n = new y(F),
              i.c[0] = 0;
            (p = X(n, x, 0, 1)), (B = _.plus(p.times(T))), B.comparedTo(w) != 1;

          )
            (_ = T),
              (T = B),
              (l = i.plus(p.times((B = l)))),
              (i = B),
              (x = n.minus(p.times((B = x)))),
              (n = B);
          return (
            (B = X(w.minus(_), T, 0, 1)),
            (i = i.plus(B.times(l))),
            (_ = _.plus(B.times(T))),
            (i.s = l.s = D.s),
            (U = U * 2),
            (E =
              X(l, T, U, ft)
                .minus(D)
                .abs()
                .comparedTo(X(i, _, U, ft).minus(D).abs()) < 1
                ? [l, T]
                : [i, _]),
            (M = f),
            E
          );
        }),
        (C.toNumber = function () {
          return +Y(this);
        }),
        (C.toPrecision = function (w, x) {
          return w != null && at(w, 1, P), dt(this, w, x, 2);
        }),
        (C.toString = function (w) {
          var x,
            _ = this,
            T = _.s,
            B = _.e;
          return (
            B === null
              ? T
                ? ((x = "Infinity"), T < 0 && (x = "-" + x))
                : (x = "NaN")
              : (w == null
                  ? (x =
                      B <= St || B >= _t ? Ut(lt(_.c), B) : ut(lt(_.c), B, "0"))
                  : w === 10 && yt
                    ? ((_ = H(new y(_), ct + B + 1, ft)),
                      (x = ut(lt(_.c), _.e, "0")))
                    : (at(w, 2, $.length, "Base"),
                      (x = nt(ut(lt(_.c), B, "0"), 10, w, T, !0))),
                T < 0 && _.c[0] && (x = "-" + x)),
            x
          );
        }),
        (C.valueOf = C.toJSON =
          function () {
            return Y(this);
          }),
        (C._isBigNumber = !0),
        J != null && y.set(J),
        y
      );
    }
    function W(J) {
      var X = J | 0;
      return J > 0 || J === X ? X : X - 1;
    }
    function lt(J) {
      for (var X, nt, it = 1, C = J.length, xt = J[0] + ""; it < C; ) {
        for (X = J[it++] + "", nt = S - X.length; nt--; X = "0" + X);
        xt += X;
      }
      for (C = xt.length; xt.charCodeAt(--C) === 48; );
      return xt.slice(0, C + 1 || 1);
    }
    function Et(J, X) {
      var nt,
        it,
        C = J.c,
        xt = X.c,
        ct = J.s,
        ft = X.s,
        St = J.e,
        _t = X.e;
      if (!ct || !ft) return null;
      if (((nt = C && !C[0]), (it = xt && !xt[0]), nt || it))
        return nt ? (it ? 0 : -ft) : ct;
      if (ct != ft) return ct;
      if (((nt = ct < 0), (it = St == _t), !C || !xt))
        return it ? 0 : !C ^ nt ? 1 : -1;
      if (!it) return (St > _t) ^ nt ? 1 : -1;
      for (
        ft = (St = C.length) < (_t = xt.length) ? St : _t, ct = 0;
        ct < ft;
        ct++
      )
        if (C[ct] != xt[ct]) return (C[ct] > xt[ct]) ^ nt ? 1 : -1;
      return St == _t ? 0 : (St > _t) ^ nt ? 1 : -1;
    }
    function at(J, X, nt, it) {
      if (J < X || J > nt || J !== d(J))
        throw Error(
          g +
            (it || "Argument") +
            (typeof J == "number"
              ? J < X || J > nt
                ? " out of range: "
                : " not an integer: "
              : " not a primitive number: ") +
            String(J),
        );
    }
    function K(J) {
      var X = J.c.length - 1;
      return W(J.e / S) == X && J.c[X] % 2 != 0;
    }
    function Ut(J, X) {
      return (
        (J.length > 1 ? J.charAt(0) + "." + J.slice(1) : J) +
        (X < 0 ? "e" : "e+") +
        X
      );
    }
    function ut(J, X, nt) {
      var it, C;
      if (X < 0) {
        for (C = nt + "."; ++X; C += nt);
        J = C + J;
      } else if (((it = J.length), ++X > it)) {
        for (C = nt, X -= it; --X; C += nt);
        J += C;
      } else X < it && (J = J.slice(0, X) + "." + J.slice(X));
      return J;
    }
    (r = q()),
      (r.default = r.BigNumber = r),
      e.exports
        ? (e.exports = r)
        : (t || (t = typeof self < "u" && self ? self : window),
          (t.BigNumber = r));
  })(Ee);
})(ci);
var ir = ci.exports,
  Zs = function (t, r, s) {
    var u = new t.Uint8Array(s),
      d = r.pushInt,
      g = r.pushInt32,
      c = r.pushInt32Neg,
      b = r.pushInt64,
      S = r.pushInt64Neg,
      N = r.pushFloat,
      L = r.pushFloatSingle,
      O = r.pushFloatDouble,
      P = r.pushTrue,
      q = r.pushFalse,
      W = r.pushUndefined,
      lt = r.pushNull,
      Et = r.pushInfinity,
      at = r.pushInfinityNeg,
      K = r.pushNaN,
      Ut = r.pushNaNNeg,
      ut = r.pushArrayStart,
      J = r.pushArrayStartFixed,
      X = r.pushArrayStartFixed32,
      nt = r.pushArrayStartFixed64,
      it = r.pushObjectStart,
      C = r.pushObjectStartFixed,
      xt = r.pushObjectStartFixed32,
      ct = r.pushObjectStartFixed64,
      ft = r.pushByteString,
      St = r.pushByteStringStart,
      _t = r.pushUtf8String,
      Z = r.pushUtf8StringStart,
      M = r.pushSimpleUnassigned,
      k = r.pushTagStart,
      j = r.pushTagStart4,
      Q = r.pushTagStart8,
      G = r.pushTagUnassigned,
      $ = r.pushBreak,
      yt = t.Math.pow,
      y = 0,
      dt = 0,
      mt = 0;
    function Tt(I) {
      for (
        I = I | 0, y = 0, dt = I;
        (y | 0) < (dt | 0) &&
        ((mt = ps[u[y] & 255](u[y] | 0) | 0), !((mt | 0) > 0));

      );
      return mt | 0;
    }
    function H(I) {
      return (I = I | 0), (((y | 0) + (I | 0)) | 0) < (dt | 0) ? 0 : 1;
    }
    function Y(I) {
      return (I = I | 0), (u[I | 0] << 8) | u[(I + 1) | 0] | 0;
    }
    function w(I) {
      return (
        (I = I | 0),
        (u[I | 0] << 24) |
          (u[(I + 1) | 0] << 16) |
          (u[(I + 2) | 0] << 8) |
          u[(I + 3) | 0] |
          0
      );
    }
    function x(I) {
      return (I = I | 0), d(I | 0), (y = (y + 1) | 0), 0;
    }
    function _(I) {
      return (
        (I = I | 0),
        H(1) | 0 ? 1 : (d(u[(y + 1) | 0] | 0), (y = (y + 2) | 0), 0)
      );
    }
    function T(I) {
      return (
        (I = I | 0),
        H(2) | 0 ? 1 : (d(Y((y + 1) | 0) | 0), (y = (y + 3) | 0), 0)
      );
    }
    function B(I) {
      return (
        (I = I | 0),
        H(4) | 0
          ? 1
          : (g(Y((y + 1) | 0) | 0, Y((y + 3) | 0) | 0), (y = (y + 5) | 0), 0)
      );
    }
    function U(I) {
      return (
        (I = I | 0),
        H(8) | 0
          ? 1
          : (b(
              Y((y + 1) | 0) | 0,
              Y((y + 3) | 0) | 0,
              Y((y + 5) | 0) | 0,
              Y((y + 7) | 0) | 0,
            ),
            (y = (y + 9) | 0),
            0)
      );
    }
    function f(I) {
      return (I = I | 0), d((-1 - ((I - 32) | 0)) | 0), (y = (y + 1) | 0), 0;
    }
    function n(I) {
      return (
        (I = I | 0),
        H(1) | 0
          ? 1
          : (d((-1 - (u[(y + 1) | 0] | 0)) | 0), (y = (y + 2) | 0), 0)
      );
    }
    function i(I) {
      I = I | 0;
      var wt = 0;
      return H(2) | 0
        ? 1
        : ((wt = Y((y + 1) | 0) | 0),
          d((-1 - (wt | 0)) | 0),
          (y = (y + 3) | 0),
          0);
    }
    function l(I) {
      return (
        (I = I | 0),
        H(4) | 0
          ? 1
          : (c(Y((y + 1) | 0) | 0, Y((y + 3) | 0) | 0), (y = (y + 5) | 0), 0)
      );
    }
    function p(I) {
      return (
        (I = I | 0),
        H(8) | 0
          ? 1
          : (S(
              Y((y + 1) | 0) | 0,
              Y((y + 3) | 0) | 0,
              Y((y + 5) | 0) | 0,
              Y((y + 7) | 0) | 0,
            ),
            (y = (y + 9) | 0),
            0)
      );
    }
    function E(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return (
        (pt = (I - 64) | 0),
        H(pt | 0) | 0
          ? 1
          : ((wt = (y + 1) | 0),
            (gt = (((y + 1) | 0) + (pt | 0)) | 0),
            ft(wt | 0, gt | 0),
            (y = gt | 0),
            0)
      );
    }
    function F(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return H(1) | 0 ||
        ((pt = u[(y + 1) | 0] | 0),
        (wt = (y + 2) | 0),
        (gt = (((y + 2) | 0) + (pt | 0)) | 0),
        H((pt + 1) | 0) | 0)
        ? 1
        : (ft(wt | 0, gt | 0), (y = gt | 0), 0);
    }
    function D(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return H(2) | 0 ||
        ((pt = Y((y + 1) | 0) | 0),
        (wt = (y + 3) | 0),
        (gt = (((y + 3) | 0) + (pt | 0)) | 0),
        H((pt + 2) | 0) | 0)
        ? 1
        : (ft(wt | 0, gt | 0), (y = gt | 0), 0);
    }
    function z(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return H(4) | 0 ||
        ((pt = w((y + 1) | 0) | 0),
        (wt = (y + 5) | 0),
        (gt = (((y + 5) | 0) + (pt | 0)) | 0),
        H((pt + 4) | 0) | 0)
        ? 1
        : (ft(wt | 0, gt | 0), (y = gt | 0), 0);
    }
    function V(I) {
      return (I = I | 0), 1;
    }
    function rt(I) {
      return (I = I | 0), St(), (y = (y + 1) | 0), 0;
    }
    function h(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return (
        (pt = (I - 96) | 0),
        H(pt | 0) | 0
          ? 1
          : ((wt = (y + 1) | 0),
            (gt = (((y + 1) | 0) + (pt | 0)) | 0),
            _t(wt | 0, gt | 0),
            (y = gt | 0),
            0)
      );
    }
    function o(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return H(1) | 0 ||
        ((pt = u[(y + 1) | 0] | 0),
        (wt = (y + 2) | 0),
        (gt = (((y + 2) | 0) + (pt | 0)) | 0),
        H((pt + 1) | 0) | 0)
        ? 1
        : (_t(wt | 0, gt | 0), (y = gt | 0), 0);
    }
    function a(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return H(2) | 0 ||
        ((pt = Y((y + 1) | 0) | 0),
        (wt = (y + 3) | 0),
        (gt = (((y + 3) | 0) + (pt | 0)) | 0),
        H((pt + 2) | 0) | 0)
        ? 1
        : (_t(wt | 0, gt | 0), (y = gt | 0), 0);
    }
    function m(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 0;
      return H(4) | 0 ||
        ((pt = w((y + 1) | 0) | 0),
        (wt = (y + 5) | 0),
        (gt = (((y + 5) | 0) + (pt | 0)) | 0),
        H((pt + 4) | 0) | 0)
        ? 1
        : (_t(wt | 0, gt | 0), (y = gt | 0), 0);
    }
    function A(I) {
      return (I = I | 0), 1;
    }
    function R(I) {
      return (I = I | 0), Z(), (y = (y + 1) | 0), 0;
    }
    function v(I) {
      return (I = I | 0), J((I - 128) | 0), (y = (y + 1) | 0), 0;
    }
    function et(I) {
      return (
        (I = I | 0),
        H(1) | 0 ? 1 : (J(u[(y + 1) | 0] | 0), (y = (y + 2) | 0), 0)
      );
    }
    function ht(I) {
      return (
        (I = I | 0),
        H(2) | 0 ? 1 : (J(Y((y + 1) | 0) | 0), (y = (y + 3) | 0), 0)
      );
    }
    function st(I) {
      return (
        (I = I | 0),
        H(4) | 0
          ? 1
          : (X(Y((y + 1) | 0) | 0, Y((y + 3) | 0) | 0), (y = (y + 5) | 0), 0)
      );
    }
    function tt(I) {
      return (
        (I = I | 0),
        H(8) | 0
          ? 1
          : (nt(
              Y((y + 1) | 0) | 0,
              Y((y + 3) | 0) | 0,
              Y((y + 5) | 0) | 0,
              Y((y + 7) | 0) | 0,
            ),
            (y = (y + 9) | 0),
            0)
      );
    }
    function bt(I) {
      return (I = I | 0), ut(), (y = (y + 1) | 0), 0;
    }
    function Nt(I) {
      I = I | 0;
      var wt = 0;
      return (
        (wt = (I - 160) | 0),
        H(wt | 0) | 0 ? 1 : (C(wt | 0), (y = (y + 1) | 0), 0)
      );
    }
    function Xi(I) {
      return (
        (I = I | 0),
        H(1) | 0 ? 1 : (C(u[(y + 1) | 0] | 0), (y = (y + 2) | 0), 0)
      );
    }
    function ji(I) {
      return (
        (I = I | 0),
        H(2) | 0 ? 1 : (C(Y((y + 1) | 0) | 0), (y = (y + 3) | 0), 0)
      );
    }
    function Zi(I) {
      return (
        (I = I | 0),
        H(4) | 0
          ? 1
          : (xt(Y((y + 1) | 0) | 0, Y((y + 3) | 0) | 0), (y = (y + 5) | 0), 0)
      );
    }
    function Qi(I) {
      return (
        (I = I | 0),
        H(8) | 0
          ? 1
          : (ct(
              Y((y + 1) | 0) | 0,
              Y((y + 3) | 0) | 0,
              Y((y + 5) | 0) | 0,
              Y((y + 7) | 0) | 0,
            ),
            (y = (y + 9) | 0),
            0)
      );
    }
    function ts(I) {
      return (I = I | 0), it(), (y = (y + 1) | 0), 0;
    }
    function de(I) {
      return (I = I | 0), k((I - 192) | 0 | 0), (y = (y + 1) | 0), 0;
    }
    function Gu(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function Hu(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function $u(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function zu(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function Ot(I) {
      return (I = I | 0), k((I - 192) | 0 | 0), (y = (y + 1) | 0), 0;
    }
    function Ku(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function Yu(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function Wu(I) {
      return (I = I | 0), k(I | 0), (y = (y + 1) | 0), 0;
    }
    function es(I) {
      return (
        (I = I | 0),
        H(1) | 0 ? 1 : (k(u[(y + 1) | 0] | 0), (y = (y + 2) | 0), 0)
      );
    }
    function rs(I) {
      return (
        (I = I | 0),
        H(2) | 0 ? 1 : (k(Y((y + 1) | 0) | 0), (y = (y + 3) | 0), 0)
      );
    }
    function ns(I) {
      return (
        (I = I | 0),
        H(4) | 0
          ? 1
          : (j(Y((y + 1) | 0) | 0, Y((y + 3) | 0) | 0), (y = (y + 5) | 0), 0)
      );
    }
    function is(I) {
      return (
        (I = I | 0),
        H(8) | 0
          ? 1
          : (Q(
              Y((y + 1) | 0) | 0,
              Y((y + 3) | 0) | 0,
              Y((y + 5) | 0) | 0,
              Y((y + 7) | 0) | 0,
            ),
            (y = (y + 9) | 0),
            0)
      );
    }
    function vt(I) {
      return (I = I | 0), M(((I | 0) - 224) | 0), (y = (y + 1) | 0), 0;
    }
    function ss(I) {
      return (I = I | 0), q(), (y = (y + 1) | 0), 0;
    }
    function os(I) {
      return (I = I | 0), P(), (y = (y + 1) | 0), 0;
    }
    function as(I) {
      return (I = I | 0), lt(), (y = (y + 1) | 0), 0;
    }
    function us(I) {
      return (I = I | 0), W(), (y = (y + 1) | 0), 0;
    }
    function cs(I) {
      return (
        (I = I | 0),
        H(1) | 0 ? 1 : (M(u[(y + 1) | 0] | 0), (y = (y + 2) | 0), 0)
      );
    }
    function fs(I) {
      I = I | 0;
      var wt = 0,
        gt = 0,
        pt = 1,
        Pe = 0,
        Ae = 0,
        Vu = 0;
      return H(2) | 0
        ? 1
        : ((wt = u[(y + 1) | 0] | 0),
          (gt = u[(y + 2) | 0] | 0),
          (wt | 0) & 128 && (pt = -1),
          (Pe = +(((wt | 0) & 124) >> 2)),
          (Ae = +((((wt | 0) & 3) << 8) | gt)),
          +Pe == 0
            ? N(+(+pt * 5960464477539063e-23 * +Ae))
            : +Pe == 31
              ? +pt == 1
                ? +Ae > 0
                  ? K()
                  : Et()
                : +Ae > 0
                  ? Ut()
                  : at()
              : N(+(+pt * yt(2, +(+Pe - 25)) * +(1024 + Ae))),
          (y = (y + 3) | 0),
          0);
    }
    function hs(I) {
      return (
        (I = I | 0),
        H(4) | 0
          ? 1
          : (L(
              u[(y + 1) | 0] | 0,
              u[(y + 2) | 0] | 0,
              u[(y + 3) | 0] | 0,
              u[(y + 4) | 0] | 0,
            ),
            (y = (y + 5) | 0),
            0)
      );
    }
    function ls(I) {
      return (
        (I = I | 0),
        H(8) | 0
          ? 1
          : (O(
              u[(y + 1) | 0] | 0,
              u[(y + 2) | 0] | 0,
              u[(y + 3) | 0] | 0,
              u[(y + 4) | 0] | 0,
              u[(y + 5) | 0] | 0,
              u[(y + 6) | 0] | 0,
              u[(y + 7) | 0] | 0,
              u[(y + 8) | 0] | 0,
            ),
            (y = (y + 9) | 0),
            0)
      );
    }
    function At(I) {
      return (I = I | 0), 1;
    }
    function ds(I) {
      return (I = I | 0), $(), (y = (y + 1) | 0), 0;
    }
    var ps = [
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
      _,
      T,
      B,
      U,
      At,
      At,
      At,
      At,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      f,
      n,
      i,
      l,
      p,
      At,
      At,
      At,
      At,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      E,
      F,
      D,
      z,
      V,
      At,
      At,
      At,
      rt,
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
      o,
      a,
      m,
      A,
      At,
      At,
      At,
      R,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      v,
      et,
      ht,
      st,
      tt,
      At,
      At,
      At,
      bt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Nt,
      Xi,
      ji,
      Zi,
      Qi,
      At,
      At,
      At,
      ts,
      de,
      de,
      de,
      de,
      de,
      de,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      Ot,
      es,
      rs,
      ns,
      is,
      At,
      At,
      At,
      At,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      vt,
      ss,
      os,
      as,
      us,
      cs,
      fs,
      hs,
      ls,
      At,
      At,
      At,
      ds,
    ];
    return { parse: Tt };
  },
  sr = {},
  Pt = {};
const Kr = ir.BigNumber;
Pt.MT = {
  POS_INT: 0,
  NEG_INT: 1,
  BYTE_STRING: 2,
  UTF8_STRING: 3,
  ARRAY: 4,
  MAP: 5,
  TAG: 6,
  SIMPLE_FLOAT: 7,
};
Pt.TAG = {
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
Pt.NUMBYTES = {
  ZERO: 0,
  ONE: 24,
  TWO: 25,
  FOUR: 26,
  EIGHT: 27,
  INDEFINITE: 31,
};
Pt.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
Pt.SYMS = {
  NULL: Symbol("null"),
  UNDEFINED: Symbol("undef"),
  PARENT: Symbol("parent"),
  BREAK: Symbol("break"),
  STREAM: Symbol("stream"),
};
Pt.SHIFT32 = Math.pow(2, 32);
Pt.SHIFT16 = Math.pow(2, 16);
Pt.MAX_SAFE_HIGH = 2097151;
Pt.NEG_ONE = new Kr(-1);
Pt.TEN = new Kr(10);
Pt.TWO = new Kr(2);
Pt.PARENT = {
  ARRAY: 0,
  OBJECT: 1,
  MAP: 2,
  TAG: 3,
  BYTE_STRING: 4,
  UTF8_STRING: 5,
};
(function (e) {
  const { Buffer: t } = Oe,
    r = ir.BigNumber,
    s = Pt,
    u = s.SHIFT32,
    d = s.SHIFT16,
    g = 2097151;
  e.parseHalf = function (S) {
    var N, L, O;
    return (
      (O = S[0] & 128 ? -1 : 1),
      (N = (S[0] & 124) >> 2),
      (L = ((S[0] & 3) << 8) | S[1]),
      N
        ? N === 31
          ? O * (L ? NaN : 1 / 0)
          : O * Math.pow(2, N - 25) * (1024 + L)
        : O * 5960464477539063e-23 * L
    );
  };
  function c(b) {
    return b < 16 ? "0" + b.toString(16) : b.toString(16);
  }
  (e.arrayBufferToBignumber = function (b) {
    const S = b.byteLength;
    let N = "";
    for (let L = 0; L < S; L++) N += c(b[L]);
    return new r(N, 16);
  }),
    (e.buildMap = (b) => {
      const S = new Map(),
        N = Object.keys(b),
        L = N.length;
      for (let O = 0; O < L; O++) S.set(N[O], b[N[O]]);
      return S;
    }),
    (e.buildInt32 = (b, S) => b * d + S),
    (e.buildInt64 = (b, S, N, L) => {
      const O = e.buildInt32(b, S),
        P = e.buildInt32(N, L);
      return O > g ? new r(O).times(u).plus(P) : O * u + P;
    }),
    (e.writeHalf = function (S, N) {
      const L = t.allocUnsafe(4);
      L.writeFloatBE(N, 0);
      const O = L.readUInt32BE(0);
      if (O & 8191) return !1;
      var P = (O >> 16) & 32768;
      const q = (O >> 23) & 255,
        W = O & 8388607;
      if (q >= 113 && q <= 142) P += ((q - 112) << 10) + (W >> 13);
      else if (q >= 103 && q < 113) {
        if (W & ((1 << (126 - q)) - 1)) return !1;
        P += (W + 8388608) >> (126 - q);
      } else return !1;
      return S.writeUInt16BE(P, 0), !0;
    }),
    (e.keySorter = function (b, S) {
      var N = b[0].byteLength,
        L = S[0].byteLength;
      return N > L ? 1 : L > N ? -1 : b[0].compare(S[0]);
    }),
    (e.isNegativeZero = (b) => b === 0 && 1 / b < 0),
    (e.nextPowerOf2 = (b) => {
      let S = 0;
      if (b && !(b & (b - 1))) return b;
      for (; b !== 0; ) (b >>= 1), (S += 1);
      return 1 << S;
    });
})(sr);
const Yr = Pt,
  Qs = Yr.MT,
  Ce = Yr.SIMPLE,
  fr = Yr.SYMS;
let to = class Ur {
  constructor(t) {
    if (typeof t != "number")
      throw new Error("Invalid Simple type: " + typeof t);
    if (t < 0 || t > 255 || (t | 0) !== t)
      throw new Error("value must be a small positive integer: " + t);
    this.value = t;
  }
  toString() {
    return "simple(" + this.value + ")";
  }
  inspect() {
    return "simple(" + this.value + ")";
  }
  encodeCBOR(t) {
    return t._pushInt(this.value, Qs.SIMPLE_FLOAT);
  }
  static isSimple(t) {
    return t instanceof Ur;
  }
  static decode(t, r) {
    switch ((r == null && (r = !0), t)) {
      case Ce.FALSE:
        return !1;
      case Ce.TRUE:
        return !0;
      case Ce.NULL:
        return r ? null : fr.NULL;
      case Ce.UNDEFINED:
        return r ? void 0 : fr.UNDEFINED;
      case -1:
        if (!r) throw new Error("Invalid BREAK");
        return fr.BREAK;
      default:
        return new Ur(t);
    }
  }
};
var fi = to;
let eo = class Nr {
  constructor(t, r, s) {
    if (
      ((this.tag = t),
      (this.value = r),
      (this.err = s),
      typeof this.tag != "number")
    )
      throw new Error("Invalid tag type (" + typeof this.tag + ")");
    if (this.tag < 0 || (this.tag | 0) !== this.tag)
      throw new Error("Tag must be a positive integer: " + this.tag);
  }
  toString() {
    return `${this.tag}(${JSON.stringify(this.value)})`;
  }
  encodeCBOR(t) {
    return t._pushTag(this.tag), t.pushAny(this.value);
  }
  convert(t) {
    var r, s;
    if (
      ((s = t?.[this.tag]),
      typeof s != "function" &&
        ((s = Nr["_tag" + this.tag]), typeof s != "function"))
    )
      return this;
    try {
      return s.call(Nr, this.value);
    } catch (u) {
      return (r = u), (this.err = r), this;
    }
  }
};
var hi = eo;
const li = self.location
    ? self.location.protocol + "//" + self.location.host
    : "",
  Fr = self.URL;
let ro = class {
  constructor(t = "", r = li) {
    (this.super = new Fr(t, r)),
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
  set hash(t) {
    this.super.hash = t;
  }
  set host(t) {
    this.super.host = t;
  }
  set hostname(t) {
    this.super.hostname = t;
  }
  set href(t) {
    this.super.href = t;
  }
  set origin(t) {
    this.super.origin = t;
  }
  set password(t) {
    this.super.password = t;
  }
  set pathname(t) {
    this.super.pathname = t;
  }
  set port(t) {
    this.super.port = t;
  }
  set protocol(t) {
    this.super.protocol = t;
  }
  set search(t) {
    this.super.search = t;
  }
  set searchParams(t) {
    this.super.searchParams = t;
  }
  set username(t) {
    this.super.username = t;
  }
  createObjectURL(t) {
    return this.super.createObjectURL(t);
  }
  revokeObjectURL(t) {
    this.super.revokeObjectURL(t);
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
function no(e) {
  if (typeof e == "string") return new Fr(e).toString();
  if (!(e instanceof Fr)) {
    const t = e.username && e.password ? `${e.username}:${e.password}@` : "",
      r = e.auth ? e.auth + "@" : "",
      s = e.port ? ":" + e.port : "",
      u = e.protocol ? e.protocol + "//" : "",
      d = e.host || "",
      g = e.hostname || "",
      c = e.search || (e.query ? "?" + e.query : ""),
      b = e.hash || "",
      S = e.pathname || "",
      N = e.path || S + c;
    return `${u}${t || r}${d || g + s}${N}${b}`;
  }
}
var di = {
  URLWithLegacySupport: ro,
  URLSearchParams: self.URLSearchParams,
  defaultBase: li,
  format: no,
};
const { URLWithLegacySupport: Xu, format: ju } = di,
  {
    URLWithLegacySupport: io,
    format: Zu,
    URLSearchParams: Qu,
    defaultBase: t0,
  } = di;
var pi = { URL: io };
const { Buffer: ye } = Oe,
  wn = Re,
  so = ir.BigNumber,
  oo = Zs,
  Mt = sr,
  It = Pt,
  ao = fi,
  uo = hi,
  { URL: co } = pi;
let vr = class Rr {
  constructor(t) {
    (t = t || {}),
      !t.size || t.size < 65536
        ? (t.size = 65536)
        : (t.size = Mt.nextPowerOf2(t.size)),
      (this._heap = new ArrayBuffer(t.size)),
      (this._heap8 = new Uint8Array(this._heap)),
      (this._buffer = ye.from(this._heap)),
      this._reset(),
      (this._knownTags = Object.assign(
        {
          0: (r) => new Date(r),
          1: (r) => new Date(r * 1e3),
          2: (r) => Mt.arrayBufferToBignumber(r),
          3: (r) => It.NEG_ONE.minus(Mt.arrayBufferToBignumber(r)),
          4: (r) => It.TEN.pow(r[0]).times(r[1]),
          5: (r) => It.TWO.pow(r[0]).times(r[1]),
          32: (r) => new co(r),
          35: (r) => new RegExp(r),
        },
        t.tags,
      )),
      (this.parser = oo(
        Ee,
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
    var t = this._parents.pop();
    if (t.length > 0) throw new Error(`Missing ${t.length} elements`);
    switch (t.type) {
      case It.PARENT.TAG:
        this._push(this.createTag(t.ref[0], t.ref[1]));
        break;
      case It.PARENT.BYTE_STRING:
        this._push(this.createByteString(t.ref, t.length));
        break;
      case It.PARENT.UTF8_STRING:
        this._push(this.createUtf8String(t.ref, t.length));
        break;
      case It.PARENT.MAP:
        if (t.values % 2 > 0)
          throw new Error("Odd number of elements in the map");
        this._push(this.createMap(t.ref, t.length));
        break;
      case It.PARENT.OBJECT:
        if (t.values % 2 > 0)
          throw new Error("Odd number of elements in the map");
        this._push(this.createObject(t.ref, t.length));
        break;
      case It.PARENT.ARRAY:
        this._push(this.createArray(t.ref, t.length));
        break;
    }
    this._currentParent &&
      this._currentParent.type === It.PARENT.TAG &&
      this._dec();
  }
  _dec() {
    const t = this._currentParent;
    t.length < 0 || (t.length--, t.length === 0 && this._closeParent());
  }
  _push(t, r) {
    const s = this._currentParent;
    switch ((s.values++, s.type)) {
      case It.PARENT.ARRAY:
      case It.PARENT.BYTE_STRING:
      case It.PARENT.UTF8_STRING:
        s.length > -1
          ? (this._ref[this._ref.length - s.length] = t)
          : this._ref.push(t),
          this._dec();
        break;
      case It.PARENT.OBJECT:
        s.tmpKey != null
          ? ((this._ref[s.tmpKey] = t), (s.tmpKey = null), this._dec())
          : ((s.tmpKey = t),
            typeof s.tmpKey != "string" &&
              ((s.type = It.PARENT.MAP), (s.ref = Mt.buildMap(s.ref))));
        break;
      case It.PARENT.MAP:
        s.tmpKey != null
          ? (this._ref.set(s.tmpKey, t), (s.tmpKey = null), this._dec())
          : (s.tmpKey = t);
        break;
      case It.PARENT.TAG:
        this._ref.push(t), r || this._dec();
        break;
      default:
        throw new Error("Unknown parent type");
    }
  }
  _createParent(t, r, s) {
    this._parents[this._depth] = {
      type: r,
      length: s,
      ref: t,
      values: 0,
      tmpKey: null,
    };
  }
  _reset() {
    (this._res = []),
      (this._parents = [
        {
          type: It.PARENT.ARRAY,
          length: -1,
          ref: this._res,
          values: 0,
          tmpKey: null,
        },
      ]);
  }
  createTag(t, r) {
    const s = this._knownTags[t];
    return s ? s(r) : new uo(t, r);
  }
  createMap(t, r) {
    return t;
  }
  createObject(t, r) {
    return t;
  }
  createArray(t, r) {
    return t;
  }
  createByteString(t, r) {
    return ye.concat(t);
  }
  createByteStringFromHeap(t, r) {
    return t === r ? ye.alloc(0) : ye.from(this._heap.slice(t, r));
  }
  createInt(t) {
    return t;
  }
  createInt32(t, r) {
    return Mt.buildInt32(t, r);
  }
  createInt64(t, r, s, u) {
    return Mt.buildInt64(t, r, s, u);
  }
  createFloat(t) {
    return t;
  }
  createFloatSingle(t, r, s, u) {
    return wn.read([t, r, s, u], 0, !1, 23, 4);
  }
  createFloatDouble(t, r, s, u, d, g, c, b) {
    return wn.read([t, r, s, u, d, g, c, b], 0, !1, 52, 8);
  }
  createInt32Neg(t, r) {
    return -1 - Mt.buildInt32(t, r);
  }
  createInt64Neg(t, r, s, u) {
    const d = Mt.buildInt32(t, r),
      g = Mt.buildInt32(s, u);
    return d > It.MAX_SAFE_HIGH
      ? It.NEG_ONE.minus(new so(d).times(It.SHIFT32).plus(g))
      : -1 - (d * It.SHIFT32 + g);
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
  createUtf8String(t, r) {
    return t.join("");
  }
  createUtf8StringFromHeap(t, r) {
    return t === r ? "" : this._buffer.toString("utf8", t, r);
  }
  createSimpleUnassigned(t) {
    return new ao(t);
  }
  pushInt(t) {
    this._push(this.createInt(t));
  }
  pushInt32(t, r) {
    this._push(this.createInt32(t, r));
  }
  pushInt64(t, r, s, u) {
    this._push(this.createInt64(t, r, s, u));
  }
  pushFloat(t) {
    this._push(this.createFloat(t));
  }
  pushFloatSingle(t, r, s, u) {
    this._push(this.createFloatSingle(t, r, s, u));
  }
  pushFloatDouble(t, r, s, u, d, g, c, b) {
    this._push(this.createFloatDouble(t, r, s, u, d, g, c, b));
  }
  pushInt32Neg(t, r) {
    this._push(this.createInt32Neg(t, r));
  }
  pushInt64Neg(t, r, s, u) {
    this._push(this.createInt64Neg(t, r, s, u));
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
    this._createParent([], It.PARENT.ARRAY, -1);
  }
  pushArrayStartFixed(t) {
    this._createArrayStartFixed(t);
  }
  pushArrayStartFixed32(t, r) {
    const s = Mt.buildInt32(t, r);
    this._createArrayStartFixed(s);
  }
  pushArrayStartFixed64(t, r, s, u) {
    const d = Mt.buildInt64(t, r, s, u);
    this._createArrayStartFixed(d);
  }
  pushObjectStart() {
    this._createObjectStartFixed(-1);
  }
  pushObjectStartFixed(t) {
    this._createObjectStartFixed(t);
  }
  pushObjectStartFixed32(t, r) {
    const s = Mt.buildInt32(t, r);
    this._createObjectStartFixed(s);
  }
  pushObjectStartFixed64(t, r, s, u) {
    const d = Mt.buildInt64(t, r, s, u);
    this._createObjectStartFixed(d);
  }
  pushByteStringStart() {
    this._parents[this._depth] = {
      type: It.PARENT.BYTE_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushByteString(t, r) {
    this._push(this.createByteStringFromHeap(t, r));
  }
  pushUtf8StringStart() {
    this._parents[this._depth] = {
      type: It.PARENT.UTF8_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushUtf8String(t, r) {
    this._push(this.createUtf8StringFromHeap(t, r));
  }
  pushSimpleUnassigned(t) {
    this._push(this.createSimpleUnassigned(t));
  }
  pushTagStart(t) {
    this._parents[this._depth] = { type: It.PARENT.TAG, length: 1, ref: [t] };
  }
  pushTagStart4(t, r) {
    this.pushTagStart(Mt.buildInt32(t, r));
  }
  pushTagStart8(t, r, s, u) {
    this.pushTagStart(Mt.buildInt64(t, r, s, u));
  }
  pushTagUnassigned(t) {
    this._push(this.createTag(t));
  }
  pushBreak() {
    if (this._currentParent.length > -1) throw new Error("Unexpected break");
    this._closeParent();
  }
  _createObjectStartFixed(t) {
    if (t === 0) {
      this._push(this.createObject({}));
      return;
    }
    this._createParent({}, It.PARENT.OBJECT, t);
  }
  _createArrayStartFixed(t) {
    if (t === 0) {
      this._push(this.createArray([]));
      return;
    }
    this._createParent(new Array(t), It.PARENT.ARRAY, t);
  }
  _decode(t) {
    if (t.byteLength === 0) throw new Error("Input too short");
    this._reset(), this._heap8.set(t);
    const r = this.parser.parse(t.byteLength);
    if (this._depth > 1) {
      for (; this._currentParent.length === 0; ) this._closeParent();
      if (this._depth > 1) throw new Error("Undeterminated nesting");
    }
    if (r > 0) throw new Error("Failed to parse");
    if (this._res.length === 0) throw new Error("No valid result");
  }
  decodeFirst(t) {
    return this._decode(t), this._res[0];
  }
  decodeAll(t) {
    return this._decode(t), this._res;
  }
  static decode(t, r) {
    return (
      typeof t == "string" && (t = ye.from(t, r || "hex")),
      new Rr({ size: t.length }).decodeFirst(t)
    );
  }
  static decodeAll(t, r) {
    return (
      typeof t == "string" && (t = ye.from(t, r || "hex")),
      new Rr({ size: t.length }).decodeAll(t)
    );
  }
};
vr.decodeFirst = vr.decode;
var wi = vr;
const { Buffer: hr } = Oe,
  fo = wi,
  ho = sr;
class Wr extends fo {
  createTag(t, r) {
    return `${t}(${r})`;
  }
  createInt(t) {
    return super.createInt(t).toString();
  }
  createInt32(t, r) {
    return super.createInt32(t, r).toString();
  }
  createInt64(t, r, s, u) {
    return super.createInt64(t, r, s, u).toString();
  }
  createInt32Neg(t, r) {
    return super.createInt32Neg(t, r).toString();
  }
  createInt64Neg(t, r, s, u) {
    return super.createInt64Neg(t, r, s, u).toString();
  }
  createTrue() {
    return "true";
  }
  createFalse() {
    return "false";
  }
  createFloat(t) {
    const r = super.createFloat(t);
    return ho.isNegativeZero(t) ? "-0_1" : `${r}_1`;
  }
  createFloatSingle(t, r, s, u) {
    return `${super.createFloatSingle(t, r, s, u)}_2`;
  }
  createFloatDouble(t, r, s, u, d, g, c, b) {
    return `${super.createFloatDouble(t, r, s, u, d, g, c, b)}_3`;
  }
  createByteString(t, r) {
    const s = t.join(", ");
    return r === -1 ? `(_ ${s})` : `h'${s}`;
  }
  createByteStringFromHeap(t, r) {
    return `h'${hr.from(super.createByteStringFromHeap(t, r)).toString("hex")}'`;
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
  createSimpleUnassigned(t) {
    return `simple(${t})`;
  }
  createArray(t, r) {
    const s = super.createArray(t, r);
    return r === -1 ? `[_ ${s.join(", ")}]` : `[${s.join(", ")}]`;
  }
  createMap(t, r) {
    const s = super.createMap(t),
      u = Array.from(s.keys()).reduce(yn(s), "");
    return r === -1 ? `{_ ${u}}` : `{${u}}`;
  }
  createObject(t, r) {
    const s = super.createObject(t),
      u = Object.keys(s).reduce(yn(s), "");
    return r === -1 ? `{_ ${u}}` : `{${u}}`;
  }
  createUtf8String(t, r) {
    const s = t.join(", ");
    return r === -1 ? `(_ ${s})` : `"${s}"`;
  }
  createUtf8StringFromHeap(t, r) {
    return `"${hr.from(super.createUtf8StringFromHeap(t, r)).toString("utf8")}"`;
  }
  static diagnose(t, r) {
    return (
      typeof t == "string" && (t = hr.from(t, r || "hex")),
      new Wr().decodeFirst(t)
    );
  }
}
var lo = Wr;
function yn(e) {
  return (t, r) => (t ? `${t}, ${r}: ${e[r]}` : `${r}: ${e[r]}`);
}
const { Buffer: Vt } = Oe,
  { URL: po } = pi,
  Lr = ir.BigNumber,
  lr = sr,
  Lt = Pt,
  Ht = Lt.MT,
  ke = Lt.NUMBYTES,
  gn = Lt.SHIFT32,
  xn = Lt.SYMS,
  ge = Lt.TAG,
  wo = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.NUMBYTES.TWO,
  yo = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.NUMBYTES.FOUR,
  go = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.NUMBYTES.EIGHT,
  xo = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.SIMPLE.TRUE,
  mo = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.SIMPLE.FALSE,
  bo = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.SIMPLE.UNDEFINED,
  mn = (Lt.MT.SIMPLE_FLOAT << 5) | Lt.SIMPLE.NULL,
  Eo = new Lr("0x20000000000000"),
  _o = Vt.from("f97e00", "hex"),
  Io = Vt.from("f9fc00", "hex"),
  Ao = Vt.from("f97c00", "hex");
function Bo(e) {
  return {}.toString.call(e).slice(8, -1);
}
class je {
  constructor(t) {
    (t = t || {}),
      (this.streaming = typeof t.stream == "function"),
      (this.onData = t.stream),
      (this.semanticTypes = [
        [po, this._pushUrl],
        [Lr, this._pushBigNumber],
      ]);
    const r = t.genTypes || [],
      s = r.length;
    for (let u = 0; u < s; u++) this.addSemanticType(r[u][0], r[u][1]);
    this._reset();
  }
  addSemanticType(t, r) {
    const s = this.semanticTypes.length;
    for (let u = 0; u < s; u++)
      if (this.semanticTypes[u][0] === t) {
        const g = this.semanticTypes[u][1];
        return (this.semanticTypes[u][1] = r), g;
      }
    return this.semanticTypes.push([t, r]), null;
  }
  push(t) {
    return (
      t &&
        ((this.result[this.offset] = t),
        (this.resultMethod[this.offset] = 0),
        (this.resultLength[this.offset] = t.length),
        this.offset++,
        this.streaming && this.onData(this.finalize())),
      !0
    );
  }
  pushWrite(t, r, s) {
    return (
      (this.result[this.offset] = t),
      (this.resultMethod[this.offset] = r),
      (this.resultLength[this.offset] = s),
      this.offset++,
      this.streaming && this.onData(this.finalize()),
      !0
    );
  }
  _pushUInt8(t) {
    return this.pushWrite(t, 1, 1);
  }
  _pushUInt16BE(t) {
    return this.pushWrite(t, 2, 2);
  }
  _pushUInt32BE(t) {
    return this.pushWrite(t, 3, 4);
  }
  _pushDoubleBE(t) {
    return this.pushWrite(t, 4, 8);
  }
  _pushNaN() {
    return this.push(_o);
  }
  _pushInfinity(t) {
    const r = t < 0 ? Io : Ao;
    return this.push(r);
  }
  _pushFloat(t) {
    const r = Vt.allocUnsafe(2);
    if (lr.writeHalf(r, t) && lr.parseHalf(r) === t)
      return this._pushUInt8(wo) && this.push(r);
    const s = Vt.allocUnsafe(4);
    return (
      s.writeFloatBE(t, 0),
      s.readFloatBE(0) === t
        ? this._pushUInt8(yo) && this.push(s)
        : this._pushUInt8(go) && this._pushDoubleBE(t)
    );
  }
  _pushInt(t, r, s) {
    const u = r << 5;
    return t < 24
      ? this._pushUInt8(u | t)
      : t <= 255
        ? this._pushUInt8(u | ke.ONE) && this._pushUInt8(t)
        : t <= 65535
          ? this._pushUInt8(u | ke.TWO) && this._pushUInt16BE(t)
          : t <= 4294967295
            ? this._pushUInt8(u | ke.FOUR) && this._pushUInt32BE(t)
            : t <= Number.MAX_SAFE_INTEGER
              ? this._pushUInt8(u | ke.EIGHT) &&
                this._pushUInt32BE(Math.floor(t / gn)) &&
                this._pushUInt32BE(t % gn)
              : r === Ht.NEG_INT
                ? this._pushFloat(s)
                : this._pushFloat(t);
  }
  _pushIntNum(t) {
    return t < 0
      ? this._pushInt(-t - 1, Ht.NEG_INT, t)
      : this._pushInt(t, Ht.POS_INT);
  }
  _pushNumber(t) {
    switch (!1) {
      case t === t:
        return this._pushNaN(t);
      case isFinite(t):
        return this._pushInfinity(t);
      case t % 1 !== 0:
        return this._pushIntNum(t);
      default:
        return this._pushFloat(t);
    }
  }
  _pushString(t) {
    const r = Vt.byteLength(t, "utf8");
    return this._pushInt(r, Ht.UTF8_STRING) && this.pushWrite(t, 5, r);
  }
  _pushBoolean(t) {
    return this._pushUInt8(t ? xo : mo);
  }
  _pushUndefined(t) {
    return this._pushUInt8(bo);
  }
  _pushArray(t, r) {
    const s = r.length;
    if (!t._pushInt(s, Ht.ARRAY)) return !1;
    for (let u = 0; u < s; u++) if (!t.pushAny(r[u])) return !1;
    return !0;
  }
  _pushTag(t) {
    return this._pushInt(t, Ht.TAG);
  }
  _pushDate(t, r) {
    return t._pushTag(ge.DATE_EPOCH) && t.pushAny(Math.round(r / 1e3));
  }
  _pushBuffer(t, r) {
    return t._pushInt(r.length, Ht.BYTE_STRING) && t.push(r);
  }
  _pushNoFilter(t, r) {
    return t._pushBuffer(t, r.slice());
  }
  _pushRegexp(t, r) {
    return t._pushTag(ge.REGEXP) && t.pushAny(r.source);
  }
  _pushSet(t, r) {
    if (!t._pushInt(r.size, Ht.ARRAY)) return !1;
    for (const s of r) if (!t.pushAny(s)) return !1;
    return !0;
  }
  _pushUrl(t, r) {
    return t._pushTag(ge.URI) && t.pushAny(r.format());
  }
  _pushBigint(t) {
    let r = ge.POS_BIGINT;
    t.isNegative() && ((t = t.negated().minus(1)), (r = ge.NEG_BIGINT));
    let s = t.toString(16);
    s.length % 2 && (s = "0" + s);
    const u = Vt.from(s, "hex");
    return this._pushTag(r) && this._pushBuffer(this, u);
  }
  _pushBigNumber(t, r) {
    if (r.isNaN()) return t._pushNaN();
    if (!r.isFinite()) return t._pushInfinity(r.isNegative() ? -1 / 0 : 1 / 0);
    if (r.isInteger()) return t._pushBigint(r);
    if (!(t._pushTag(ge.DECIMAL_FRAC) && t._pushInt(2, Ht.ARRAY))) return !1;
    const s = r.decimalPlaces(),
      u = r.multipliedBy(new Lr(10).pow(s));
    return t._pushIntNum(-s)
      ? u.abs().isLessThan(Eo)
        ? t._pushIntNum(u.toNumber())
        : t._pushBigint(u)
      : !1;
  }
  _pushMap(t, r) {
    return t._pushInt(r.size, Ht.MAP)
      ? this._pushRawMap(r.size, Array.from(r))
      : !1;
  }
  _pushObject(t) {
    if (!t) return this._pushUInt8(mn);
    for (var r = this.semanticTypes.length, s = 0; s < r; s++)
      if (t instanceof this.semanticTypes[s][0])
        return this.semanticTypes[s][1].call(t, this, t);
    var u = t.encodeCBOR;
    if (typeof u == "function") return u.call(t, this);
    var d = Object.keys(t),
      g = d.length;
    return this._pushInt(g, Ht.MAP)
      ? this._pushRawMap(
          g,
          d.map((c) => [c, t[c]]),
        )
      : !1;
  }
  _pushRawMap(t, r) {
    r = r
      .map(function (u) {
        return (u[0] = je.encode(u[0])), u;
      })
      .sort(lr.keySorter);
    for (var s = 0; s < t; s++)
      if (!this.push(r[s][0]) || !this.pushAny(r[s][1])) return !1;
    return !0;
  }
  write(t) {
    return this.pushAny(t);
  }
  pushAny(t) {
    var r = Bo(t);
    switch (r) {
      case "Number":
        return this._pushNumber(t);
      case "String":
        return this._pushString(t);
      case "Boolean":
        return this._pushBoolean(t);
      case "Object":
        return this._pushObject(t);
      case "Array":
        return this._pushArray(this, t);
      case "Uint8Array":
        return this._pushBuffer(this, Vt.isBuffer(t) ? t : Vt.from(t));
      case "Null":
        return this._pushUInt8(mn);
      case "Undefined":
        return this._pushUndefined(t);
      case "Map":
        return this._pushMap(this, t);
      case "Set":
        return this._pushSet(this, t);
      case "URL":
        return this._pushUrl(this, t);
      case "BigNumber":
        return this._pushBigNumber(this, t);
      case "Date":
        return this._pushDate(this, t);
      case "RegExp":
        return this._pushRegexp(this, t);
      case "Symbol":
        switch (t) {
          case xn.NULL:
            return this._pushObject(null);
          case xn.UNDEFINED:
            return this._pushUndefined(void 0);
          default:
            throw new Error("Unknown symbol: " + t.toString());
        }
      default:
        throw new Error(
          "Unknown type: " + typeof t + ", " + (t ? t.toString() : ""),
        );
    }
  }
  finalize() {
    if (this.offset === 0) return null;
    for (
      var t = this.result,
        r = this.resultLength,
        s = this.resultMethod,
        u = this.offset,
        d = 0,
        g = 0;
      g < u;
      g++
    )
      d += r[g];
    var c = Vt.allocUnsafe(d),
      b = 0,
      S = 0;
    for (g = 0; g < u; g++) {
      switch (((S = r[g]), s[g])) {
        case 0:
          t[g].copy(c, b);
          break;
        case 1:
          c.writeUInt8(t[g], b, !0);
          break;
        case 2:
          c.writeUInt16BE(t[g], b, !0);
          break;
        case 3:
          c.writeUInt32BE(t[g], b, !0);
          break;
        case 4:
          c.writeDoubleBE(t[g], b, !0);
          break;
        case 5:
          c.write(t[g], b, S, "utf8");
          break;
        default:
          throw new Error("unkown method");
      }
      b += S;
    }
    var N = c;
    return this._reset(), N;
  }
  _reset() {
    (this.result = []),
      (this.resultMethod = []),
      (this.resultLength = []),
      (this.offset = 0);
  }
  static encode(t) {
    const r = new je();
    if (!r.pushAny(t)) throw new Error("Failed to encode input");
    return r.finalize();
  }
}
var So = je;
(function (e) {
  (e.Diagnose = lo),
    (e.Decoder = wi),
    (e.Encoder = So),
    (e.Simple = fi),
    (e.Tagged = hi),
    (e.decodeAll = e.Decoder.decodeAll),
    (e.decodeFirst = e.Decoder.decodeFirst),
    (e.diagnose = e.Diagnose.diagnose),
    (e.encode = e.Encoder.encode),
    (e.decode = e.Decoder.decode),
    (e.leveldb = {
      decode: e.Decoder.decodeAll,
      encode: e.Encoder.encode,
      buffer: !0,
      name: "cbor",
    });
})(ui);
var yi = ys(ui);
function he(e) {
  return Ue(Gs.create().update(new Uint8Array(e)).digest());
}
function ze(e) {
  if (e instanceof yi.Tagged) return ze(e.value);
  if (typeof e == "string") return gi(e);
  if (typeof e == "number") return he(dn(e));
  if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return he(e);
  if (Array.isArray(e)) {
    const t = e.map(ze);
    return he(Ne(...t));
  } else {
    if (e && typeof e == "object" && e._isPrincipal)
      return he(e.toUint8Array());
    if (typeof e == "object" && e !== null && typeof e.toHash == "function")
      return ze(e.toHash());
    if (typeof e == "object") return xi(e);
    if (typeof e == "bigint") return he(dn(e));
  }
  throw Object.assign(
    new Error(`Attempt to hash a value of unsupported type: ${e}`),
    { value: e },
  );
}
const gi = (e) => {
  const t = new TextEncoder().encode(e);
  return he(t);
};
function Vr(e) {
  return xi(e);
}
function xi(e) {
  const s = Object.entries(e)
      .filter(([, g]) => g !== void 0)
      .map(([g, c]) => {
        const b = gi(g),
          S = ze(c);
        return [b, S];
      })
      .sort(([g], [c]) => ti(g, c)),
    u = Ne(...s.map((g) => Ne(...g)));
  return he(u);
}
var To = function (e, t) {
  var r = {};
  for (var s in e)
    Object.prototype.hasOwnProperty.call(e, s) &&
      t.indexOf(s) < 0 &&
      (r[s] = e[s]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var u = 0, s = Object.getOwnPropertySymbols(e); u < s.length; u++)
      t.indexOf(s[u]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, s[u]) &&
        (r[s[u]] = e[s[u]]);
  return r;
};
const Uo = new TextEncoder().encode(`
ic-request`);
class qr {
  getPrincipal() {
    return (
      this._principal ||
        (this._principal = ue.selfAuthenticating(
          new Uint8Array(this.getPublicKey().toDer()),
        )),
      this._principal
    );
  }
  async transformRequest(t) {
    const { body: r } = t,
      s = To(t, ["body"]),
      u = Vr(r);
    return Object.assign(Object.assign({}, s), {
      body: {
        content: r,
        sender_pubkey: this.getPublicKey().toDer(),
        sender_sig: await this.sign(Ne(Uo, u)),
      },
    });
  }
}
class bn {
  getPrincipal() {
    return ue.anonymous();
  }
  async transformRequest(t) {
    return Object.assign(Object.assign({}, t), { body: { content: t.body } });
  }
}
var kt = {},
  Ie = {},
  Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
const No = 9007199254740992;
function Qt(e, ...t) {
  const r = new Uint8Array(
    e.byteLength + t.reduce((u, d) => u + d.byteLength, 0),
  );
  r.set(new Uint8Array(e), 0);
  let s = e.byteLength;
  for (const u of t) r.set(new Uint8Array(u), s), (s += u.byteLength);
  return r.buffer;
}
function Kt(e, t, r) {
  r = r.replace(/[^0-9a-fA-F]/g, "");
  const s = 2 ** (t - 24);
  r = r.slice(-s * 2).padStart(s * 2, "0");
  const u = [(e << 5) + t].concat(r.match(/../g).map((d) => parseInt(d, 16)));
  return new Uint8Array(u).buffer;
}
function or(e, t) {
  if (t < 24) return new Uint8Array([(e << 5) + t]).buffer;
  {
    const r = t <= 255 ? 24 : t <= 65535 ? 25 : t <= 4294967295 ? 26 : 27;
    return Kt(e, r, t.toString(16));
  }
}
function mi(e) {
  const t = [];
  for (let r = 0; r < e.length; r++) {
    let s = e.charCodeAt(r);
    s < 128
      ? t.push(s)
      : s < 2048
        ? t.push(192 | (s >> 6), 128 | (s & 63))
        : s < 55296 || s >= 57344
          ? t.push(224 | (s >> 12), 128 | ((s >> 6) & 63), 128 | (s & 63))
          : (r++,
            (s = ((s & 1023) << 10) | (e.charCodeAt(r) & 1023)),
            t.push(
              240 | (s >> 18),
              128 | ((s >> 12) & 63),
              128 | ((s >> 6) & 63),
              128 | (s & 63),
            ));
  }
  return Qt(new Uint8Array(or(3, e.length)), new Uint8Array(t));
}
function Fo(e, t) {
  if (e == 14277111) return Qt(new Uint8Array([217, 217, 247]), t);
  if (e < 24) return Qt(new Uint8Array([192 + e]), t);
  {
    const r = e <= 255 ? 24 : e <= 65535 ? 25 : e <= 4294967295 ? 26 : 27,
      s = 2 ** (r - 24),
      u = e
        .toString(16)
        .slice(-s * 2)
        .padStart(s * 2, "0"),
      d = [192 + r].concat(u.match(/../g).map((g) => parseInt(g, 16)));
    return new Uint8Array(d).buffer;
  }
}
Bt.tagged = Fo;
function De(e) {
  return new Uint8Array(e).buffer;
}
Bt.raw = De;
function Jr(e) {
  if (isNaN(e)) throw new RangeError("Invalid number.");
  e = Math.min(Math.max(0, e), 23);
  const t = [0 + e];
  return new Uint8Array(t).buffer;
}
Bt.uSmall = Jr;
function bi(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, e), 255)), (e = e.toString(16)), Kt(0, 24, e)
  );
}
Bt.u8 = bi;
function Ei(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, e), 65535)), (e = e.toString(16)), Kt(0, 25, e)
  );
}
Bt.u16 = Ei;
function _i(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, e), 4294967295)),
    (e = e.toString(16)),
    Kt(0, 26, e)
  );
}
Bt.u32 = _i;
function Xr(e, t) {
  if (typeof e == "string" && t == 16) {
    if (e.match(/[^0-9a-fA-F]/)) throw new RangeError("Invalid number.");
    return Kt(0, 27, e);
  }
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (e = Math.min(Math.max(0, e), No)), (e = e.toString(16)), Kt(0, 27, e);
}
Bt.u64 = Xr;
function Ii(e) {
  if (isNaN(e)) throw new RangeError("Invalid number.");
  if (e === 0) return Jr(0);
  e = Math.min(Math.max(0, -e), 24) - 1;
  const t = [32 + e];
  return new Uint8Array(t).buffer;
}
Bt.iSmall = Ii;
function Ai(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 255)), (e = e.toString(16)), Kt(1, 24, e)
  );
}
Bt.i8 = Ai;
function Bi(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 65535)),
    (e = e.toString(16)),
    Kt(1, 25, e)
  );
}
Bt.i16 = Bi;
function Si(e, t) {
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 4294967295)),
    (e = e.toString(16)),
    Kt(1, 26, e)
  );
}
Bt.i32 = Si;
function Ti(e, t) {
  if (typeof e == "string" && t == 16) {
    if (
      (e.startsWith("-") ? (e = e.slice(1)) : (e = "0"),
      e.match(/[^0-9a-fA-F]/) || e.length > 16)
    )
      throw new RangeError("Invalid number.");
    let r = !1,
      s = e.split("").reduceRight((u, d) => {
        if (r) return d + u;
        let g = parseInt(d, 16) - 1;
        return g >= 0 ? ((r = !0), g.toString(16) + u) : "f" + u;
      }, "");
    return r ? Kt(1, 27, s) : Xr(0);
  }
  if (((e = parseInt("" + e, t)), isNaN(e)))
    throw new RangeError("Invalid number.");
  return (
    (e = Math.min(Math.max(0, -e - 1), 9007199254740992)),
    (e = e.toString(16)),
    Kt(1, 27, e)
  );
}
Bt.i64 = Ti;
function vo(e) {
  return e >= 0
    ? e < 24
      ? Jr(e)
      : e <= 255
        ? bi(e)
        : e <= 65535
          ? Ei(e)
          : e <= 4294967295
            ? _i(e)
            : Xr(e)
    : e >= -24
      ? Ii(e)
      : e >= -255
        ? Ai(e)
        : e >= -65535
          ? Bi(e)
          : e >= -4294967295
            ? Si(e)
            : Ti(e);
}
Bt.number = vo;
function Ro(e) {
  return Qt(or(2, e.byteLength), e);
}
Bt.bytes = Ro;
function Lo(e) {
  return mi(e);
}
Bt.string = Lo;
function Oo(e) {
  return Qt(or(4, e.length), ...e);
}
Bt.array = Oo;
function Do(e, t = !1) {
  e instanceof Map || (e = new Map(Object.entries(e)));
  let r = Array.from(e.entries());
  return (
    t && (r = r.sort(([s], [u]) => s.localeCompare(u))),
    Qt(or(5, e.size), ...r.map(([s, u]) => Qt(mi(s), u)))
  );
}
Bt.map = Do;
function Po(e) {
  const t = new Float32Array([e]);
  return Qt(new Uint8Array([250]), new Uint8Array(t.buffer));
}
Bt.singleFloat = Po;
function Mo(e) {
  const t = new Float64Array([e]);
  return Qt(new Uint8Array([251]), new Uint8Array(t.buffer));
}
Bt.doubleFloat = Mo;
function Co(e) {
  return e ? Ui() : Ni();
}
Bt.bool = Co;
function Ui() {
  return De(new Uint8Array([245]));
}
Bt.true_ = Ui;
function Ni() {
  return De(new Uint8Array([244]));
}
Bt.false_ = Ni;
function ko() {
  return De(new Uint8Array([246]));
}
Bt.null_ = ko;
function Go() {
  return De(new Uint8Array([247]));
}
Bt.undefined_ = Go;
var Ho =
  (Ee && Ee.__importStar) ||
  function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (e != null)
      for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return (t.default = e), t;
  };
Object.defineProperty(Ie, "__esModule", { value: !0 });
const zt = Ho(Bt),
  $o = [
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
class Fi {
  constructor(t, r = !1) {
    (this._serializer = t),
      (this._stable = r),
      (this.name = "jsonDefault"),
      (this.priority = -100);
  }
  match(t) {
    return (
      ["undefined", "boolean", "number", "string", "object"].indexOf(
        typeof t,
      ) != -1
    );
  }
  encode(t) {
    switch (typeof t) {
      case "undefined":
        return zt.undefined_();
      case "boolean":
        return zt.bool(t);
      case "number":
        return Math.floor(t) === t ? zt.number(t) : zt.doubleFloat(t);
      case "string":
        return zt.string(t);
      case "object":
        if (t === null) return zt.null_();
        if (Array.isArray(t))
          return zt.array(t.map((r) => this._serializer.serializeValue(r)));
        if ($o.find((r) => t instanceof r)) return zt.bytes(t.buffer);
        if (Object.getOwnPropertyNames(t).indexOf("toJSON") !== -1)
          return this.encode(t.toJSON());
        if (t instanceof Map) {
          const r = new Map();
          for (const [s, u] of t.entries())
            r.set(s, this._serializer.serializeValue(u));
          return zt.map(r, this._stable);
        } else {
          const r = new Map();
          for (const [s, u] of Object.entries(t))
            r.set(s, this._serializer.serializeValue(u));
          return zt.map(r, this._stable);
        }
      default:
        throw new Error("Invalid value.");
    }
  }
}
Ie.JsonDefaultCborEncoder = Fi;
class vi {
  constructor() {
    (this.name = "cborEncoder"), (this.priority = -90);
  }
  match(t) {
    return typeof t == "object" && typeof t.toCBOR == "function";
  }
  encode(t) {
    return t.toCBOR();
  }
}
Ie.ToCborEncoder = vi;
class Ri {
  constructor() {
    this._encoders = new Set();
  }
  static withDefaultEncoders(t = !1) {
    const r = new this();
    return r.addEncoder(new Fi(r, t)), r.addEncoder(new vi()), r;
  }
  removeEncoder(t) {
    for (const r of this._encoders.values())
      r.name == t && this._encoders.delete(r);
  }
  addEncoder(t) {
    this._encoders.add(t);
  }
  getEncoderFor(t) {
    let r = null;
    for (const s of this._encoders)
      (!r || s.priority > r.priority) && s.match(t) && (r = s);
    if (r === null) throw new Error("Could not find an encoder for value.");
    return r;
  }
  serializeValue(t) {
    return this.getEncoderFor(t).encode(t);
  }
  serialize(t) {
    return this.serializeValue(t);
  }
}
Ie.CborSerializer = Ri;
class zo extends Ri {
  serialize(t) {
    return zt.raw(
      new Uint8Array([
        ...new Uint8Array([217, 217, 247]),
        ...new Uint8Array(super.serializeValue(t)),
      ]),
    );
  }
}
Ie.SelfDescribeCborSerializer = zo;
(function (e) {
  function t(u) {
    for (var d in u) e.hasOwnProperty(d) || (e[d] = u[d]);
  }
  var r =
    (Ee && Ee.__importStar) ||
    function (u) {
      if (u && u.__esModule) return u;
      var d = {};
      if (u != null)
        for (var g in u) Object.hasOwnProperty.call(u, g) && (d[g] = u[g]);
      return (d.default = u), d;
    };
  Object.defineProperty(e, "__esModule", { value: !0 }), t(Ie);
  const s = r(Bt);
  e.value = s;
})(kt);
class Ko {
  get name() {
    return "Principal";
  }
  get priority() {
    return 0;
  }
  match(t) {
    return t && t._isPrincipal === !0;
  }
  encode(t) {
    return kt.value.bytes(t.toUint8Array());
  }
}
class Yo {
  get name() {
    return "Buffer";
  }
  get priority() {
    return 1;
  }
  match(t) {
    return t instanceof ArrayBuffer || ArrayBuffer.isView(t);
  }
  encode(t) {
    return kt.value.bytes(new Uint8Array(t));
  }
}
class Wo {
  get name() {
    return "BigInt";
  }
  get priority() {
    return 1;
  }
  match(t) {
    return typeof t == "bigint";
  }
  encode(t) {
    return t > BigInt(0)
      ? kt.value.tagged(2, kt.value.bytes(ce(t.toString(16))))
      : kt.value.tagged(3, kt.value.bytes(ce((BigInt("-1") * t).toString(16))));
  }
}
const jr = kt.SelfDescribeCborSerializer.withDefaultEncoders(!0);
jr.addEncoder(new Ko());
jr.addEncoder(new Yo());
jr.addEncoder(new Wo());
var En;
(function (e) {
  (e[(e.Uint64LittleEndian = 71)] = "Uint64LittleEndian"),
    (e[(e.Semantic = 55799)] = "Semantic");
})(En || (En = {}));
class e0 extends yi.Decoder {
  createByteString(t) {
    return Ne(...t);
  }
  createByteStringFromHeap(t, r) {
    return t === r
      ? new ArrayBuffer(0)
      : new Uint8Array(this._heap.slice(t, r));
  }
}
var _n;
(function (e) {
  e.Call = "call";
})(_n || (_n = {}));
BigInt(1e6);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Zr =
    BigInt(0),
  Li = BigInt(1),
  Vo = BigInt(2);
function Qr(e) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
  );
}
function tn(e) {
  if (!Qr(e)) throw new Error("Uint8Array expected");
}
function dr(e, t) {
  if (typeof t != "boolean") throw new Error(e + " boolean expected, got " + t);
}
const qo = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, "0"),
);
function en(e) {
  tn(e);
  let t = "";
  for (let r = 0; r < e.length; r++) t += qo[e[r]];
  return t;
}
function Oi(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return e === "" ? Zr : BigInt("0x" + e);
}
const Jt = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function In(e) {
  if (e >= Jt._0 && e <= Jt._9) return e - Jt._0;
  if (e >= Jt.A && e <= Jt.F) return e - (Jt.A - 10);
  if (e >= Jt.a && e <= Jt.f) return e - (Jt.a - 10);
}
function Di(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length,
    r = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const s = new Uint8Array(r);
  for (let u = 0, d = 0; u < r; u++, d += 2) {
    const g = In(e.charCodeAt(d)),
      c = In(e.charCodeAt(d + 1));
    if (g === void 0 || c === void 0) {
      const b = e[d] + e[d + 1];
      throw new Error(
        'hex string expected, got non-hex character "' + b + '" at index ' + d,
      );
    }
    s[u] = g * 16 + c;
  }
  return s;
}
function Jo(e) {
  return Oi(en(e));
}
function Ke(e) {
  return tn(e), Oi(en(Uint8Array.from(e).reverse()));
}
function Pi(e, t) {
  return Di(e.toString(16).padStart(t * 2, "0"));
}
function Or(e, t) {
  return Pi(e, t).reverse();
}
function Xt(e, t, r) {
  let s;
  if (typeof t == "string")
    try {
      s = Di(t);
    } catch (d) {
      throw new Error(e + " must be hex string or Uint8Array, cause: " + d);
    }
  else if (Qr(t)) s = Uint8Array.from(t);
  else throw new Error(e + " must be hex string or Uint8Array");
  const u = s.length;
  if (typeof r == "number" && u !== r)
    throw new Error(e + " of length " + r + " expected, got " + u);
  return s;
}
function An(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const u = e[s];
    tn(u), (t += u.length);
  }
  const r = new Uint8Array(t);
  for (let s = 0, u = 0; s < e.length; s++) {
    const d = e[s];
    r.set(d, u), (u += d.length);
  }
  return r;
}
const pr = (e) => typeof e == "bigint" && Zr <= e;
function Xo(e, t, r) {
  return pr(e) && pr(t) && pr(r) && t <= e && e < r;
}
function Be(e, t, r, s) {
  if (!Xo(t, r, s))
    throw new Error(
      "expected valid " + e + ": " + r + " <= n < " + s + ", got " + t,
    );
}
function jo(e) {
  let t;
  for (t = 0; e > Zr; e >>= Li, t += 1);
  return t;
}
const Zo = (e) => (Vo << BigInt(e - 1)) - Li,
  Qo = {
    bigint: (e) => typeof e == "bigint",
    function: (e) => typeof e == "function",
    boolean: (e) => typeof e == "boolean",
    string: (e) => typeof e == "string",
    stringOrUint8Array: (e) => typeof e == "string" || Qr(e),
    isSafeInteger: (e) => Number.isSafeInteger(e),
    array: (e) => Array.isArray(e),
    field: (e, t) => t.Fp.isValid(e),
    hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen),
  };
function rn(e, t, r = {}) {
  const s = (u, d, g) => {
    const c = Qo[d];
    if (typeof c != "function") throw new Error("invalid validator function");
    const b = e[u];
    if (!(g && b === void 0) && !c(b, e))
      throw new Error(
        "param " + String(u) + " is invalid. Expected " + d + ", got " + b,
      );
  };
  for (const [u, d] of Object.entries(t)) s(u, d, !1);
  for (const [u, d] of Object.entries(r)) s(u, d, !0);
  return e;
}
function Bn(e) {
  const t = new WeakMap();
  return (r, ...s) => {
    const u = t.get(r);
    if (u !== void 0) return u;
    const d = e(r, ...s);
    return t.set(r, d), d;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Dt =
    BigInt(0),
  Ft = BigInt(1),
  le = BigInt(2),
  ta = BigInt(3),
  Dr = BigInt(4),
  Sn = BigInt(5),
  Tn = BigInt(8);
function Rt(e, t) {
  const r = e % t;
  return r >= Dt ? r : t + r;
}
function ea(e, t, r) {
  if (t < Dt) throw new Error("invalid exponent, negatives unsupported");
  if (r <= Dt) throw new Error("invalid modulus");
  if (r === Ft) return Dt;
  let s = Ft;
  for (; t > Dt; ) t & Ft && (s = (s * e) % r), (e = (e * e) % r), (t >>= Ft);
  return s;
}
function Wt(e, t, r) {
  let s = e;
  for (; t-- > Dt; ) (s *= s), (s %= r);
  return s;
}
function Un(e, t) {
  if (e === Dt) throw new Error("invert: expected non-zero number");
  if (t <= Dt) throw new Error("invert: expected positive modulus, got " + t);
  let r = Rt(e, t),
    s = t,
    u = Dt,
    d = Ft;
  for (; r !== Dt; ) {
    const c = s / r,
      b = s % r,
      S = u - d * c;
    (s = r), (r = b), (u = d), (d = S);
  }
  if (s !== Ft) throw new Error("invert: does not exist");
  return Rt(u, t);
}
function ra(e) {
  const t = (e - Ft) / le;
  let r, s, u;
  for (r = e - Ft, s = 0; r % le === Dt; r /= le, s++);
  for (u = le; u < e && ea(u, t, e) !== e - Ft; u++)
    if (u > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (s === 1) {
    const g = (e + Ft) / Dr;
    return function (b, S) {
      const N = b.pow(S, g);
      if (!b.eql(b.sqr(N), S)) throw new Error("Cannot find square root");
      return N;
    };
  }
  const d = (r + Ft) / le;
  return function (c, b) {
    if (c.pow(b, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let S = s,
      N = c.pow(c.mul(c.ONE, u), r),
      L = c.pow(b, d),
      O = c.pow(b, r);
    for (; !c.eql(O, c.ONE); ) {
      if (c.eql(O, c.ZERO)) return c.ZERO;
      let P = 1;
      for (let W = c.sqr(O); P < S && !c.eql(W, c.ONE); P++) W = c.sqr(W);
      const q = c.pow(N, Ft << BigInt(S - P - 1));
      (N = c.sqr(q)), (L = c.mul(L, q)), (O = c.mul(O, N)), (S = P);
    }
    return L;
  };
}
function na(e) {
  if (e % Dr === ta) {
    const t = (e + Ft) / Dr;
    return function (s, u) {
      const d = s.pow(u, t);
      if (!s.eql(s.sqr(d), u)) throw new Error("Cannot find square root");
      return d;
    };
  }
  if (e % Tn === Sn) {
    const t = (e - Sn) / Tn;
    return function (s, u) {
      const d = s.mul(u, le),
        g = s.pow(d, t),
        c = s.mul(u, g),
        b = s.mul(s.mul(c, le), g),
        S = s.mul(c, s.sub(b, s.ONE));
      if (!s.eql(s.sqr(S), u)) throw new Error("Cannot find square root");
      return S;
    };
  }
  return ra(e);
}
const ia = (e, t) => (Rt(e, t) & Ft) === Ft,
  sa = [
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
function oa(e) {
  const t = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger",
    },
    r = sa.reduce((s, u) => ((s[u] = "function"), s), t);
  return rn(e, r);
}
function aa(e, t, r) {
  if (r < Dt) throw new Error("invalid exponent, negatives unsupported");
  if (r === Dt) return e.ONE;
  if (r === Ft) return t;
  let s = e.ONE,
    u = t;
  for (; r > Dt; ) r & Ft && (s = e.mul(s, u)), (u = e.sqr(u)), (r >>= Ft);
  return s;
}
function ua(e, t) {
  const r = new Array(t.length),
    s = t.reduce(
      (d, g, c) => (e.is0(g) ? d : ((r[c] = d), e.mul(d, g))),
      e.ONE,
    ),
    u = e.inv(s);
  return (
    t.reduceRight(
      (d, g, c) => (e.is0(g) ? d : ((r[c] = e.mul(d, r[c])), e.mul(d, g))),
      u,
    ),
    r
  );
}
function Mi(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length,
    s = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: s };
}
function Ci(e, t, r = !1, s = {}) {
  if (e <= Dt) throw new Error("invalid field: expected ORDER > 0, got " + e);
  const { nBitLength: u, nByteLength: d } = Mi(e, t);
  if (d > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let g;
  const c = Object.freeze({
    ORDER: e,
    isLE: r,
    BITS: u,
    BYTES: d,
    MASK: Zo(u),
    ZERO: Dt,
    ONE: Ft,
    create: (b) => Rt(b, e),
    isValid: (b) => {
      if (typeof b != "bigint")
        throw new Error(
          "invalid field element: expected bigint, got " + typeof b,
        );
      return Dt <= b && b < e;
    },
    is0: (b) => b === Dt,
    isOdd: (b) => (b & Ft) === Ft,
    neg: (b) => Rt(-b, e),
    eql: (b, S) => b === S,
    sqr: (b) => Rt(b * b, e),
    add: (b, S) => Rt(b + S, e),
    sub: (b, S) => Rt(b - S, e),
    mul: (b, S) => Rt(b * S, e),
    pow: (b, S) => aa(c, b, S),
    div: (b, S) => Rt(b * Un(S, e), e),
    sqrN: (b) => b * b,
    addN: (b, S) => b + S,
    subN: (b, S) => b - S,
    mulN: (b, S) => b * S,
    inv: (b) => Un(b, e),
    sqrt: s.sqrt || ((b) => (g || (g = na(e)), g(c, b))),
    invertBatch: (b) => ua(c, b),
    cmov: (b, S, N) => (N ? S : b),
    toBytes: (b) => (r ? Or(b, d) : Pi(b, d)),
    fromBytes: (b) => {
      if (b.length !== d)
        throw new Error(
          "Field.fromBytes: expected " + d + " bytes, got " + b.length,
        );
      return r ? Ke(b) : Jo(b);
    },
  });
  return Object.freeze(c);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Nn =
    BigInt(0),
  Ge = BigInt(1);
function wr(e, t) {
  const r = t.negate();
  return e ? r : t;
}
function ki(e, t) {
  if (!Number.isSafeInteger(e) || e <= 0 || e > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function yr(e, t) {
  ki(e, t);
  const r = Math.ceil(t / e) + 1,
    s = 2 ** (e - 1);
  return { windows: r, windowSize: s };
}
function ca(e, t) {
  if (!Array.isArray(e)) throw new Error("array expected");
  e.forEach((r, s) => {
    if (!(r instanceof t)) throw new Error("invalid point at index " + s);
  });
}
function fa(e, t) {
  if (!Array.isArray(e)) throw new Error("array of scalars expected");
  e.forEach((r, s) => {
    if (!t.isValid(r)) throw new Error("invalid scalar at index " + s);
  });
}
const gr = new WeakMap(),
  Gi = new WeakMap();
function xr(e) {
  return Gi.get(e) || 1;
}
function ha(e, t) {
  return {
    constTimeNegate: wr,
    hasPrecomputes(r) {
      return xr(r) !== 1;
    },
    unsafeLadder(r, s, u = e.ZERO) {
      let d = r;
      for (; s > Nn; ) s & Ge && (u = u.add(d)), (d = d.double()), (s >>= Ge);
      return u;
    },
    precomputeWindow(r, s) {
      const { windows: u, windowSize: d } = yr(s, t),
        g = [];
      let c = r,
        b = c;
      for (let S = 0; S < u; S++) {
        (b = c), g.push(b);
        for (let N = 1; N < d; N++) (b = b.add(c)), g.push(b);
        c = b.double();
      }
      return g;
    },
    wNAF(r, s, u) {
      const { windows: d, windowSize: g } = yr(r, t);
      let c = e.ZERO,
        b = e.BASE;
      const S = BigInt(2 ** r - 1),
        N = 2 ** r,
        L = BigInt(r);
      for (let O = 0; O < d; O++) {
        const P = O * g;
        let q = Number(u & S);
        (u >>= L), q > g && ((q -= N), (u += Ge));
        const W = P,
          lt = P + Math.abs(q) - 1,
          Et = O % 2 !== 0,
          at = q < 0;
        q === 0 ? (b = b.add(wr(Et, s[W]))) : (c = c.add(wr(at, s[lt])));
      }
      return { p: c, f: b };
    },
    wNAFUnsafe(r, s, u, d = e.ZERO) {
      const { windows: g, windowSize: c } = yr(r, t),
        b = BigInt(2 ** r - 1),
        S = 2 ** r,
        N = BigInt(r);
      for (let L = 0; L < g; L++) {
        const O = L * c;
        if (u === Nn) break;
        let P = Number(u & b);
        if (((u >>= N), P > c && ((P -= S), (u += Ge)), P === 0)) continue;
        let q = s[O + Math.abs(P) - 1];
        P < 0 && (q = q.negate()), (d = d.add(q));
      }
      return d;
    },
    getPrecomputes(r, s, u) {
      let d = gr.get(s);
      return (
        d || ((d = this.precomputeWindow(s, r)), r !== 1 && gr.set(s, u(d))), d
      );
    },
    wNAFCached(r, s, u) {
      const d = xr(r);
      return this.wNAF(d, this.getPrecomputes(d, r, u), s);
    },
    wNAFCachedUnsafe(r, s, u, d) {
      const g = xr(r);
      return g === 1
        ? this.unsafeLadder(r, s, d)
        : this.wNAFUnsafe(g, this.getPrecomputes(g, r, u), s, d);
    },
    setWindowSize(r, s) {
      ki(s, t), Gi.set(r, s), gr.delete(r);
    },
  };
}
function la(e, t, r, s) {
  if ((ca(r, e), fa(s, t), r.length !== s.length))
    throw new Error("arrays of points and scalars must have equal length");
  const u = e.ZERO,
    d = jo(BigInt(r.length)),
    g = d > 12 ? d - 3 : d > 4 ? d - 2 : d ? 2 : 1,
    c = (1 << g) - 1,
    b = new Array(c + 1).fill(u),
    S = Math.floor((t.BITS - 1) / g) * g;
  let N = u;
  for (let L = S; L >= 0; L -= g) {
    b.fill(u);
    for (let P = 0; P < s.length; P++) {
      const q = s[P],
        W = Number((q >> BigInt(L)) & BigInt(c));
      b[W] = b[W].add(r[P]);
    }
    let O = u;
    for (let P = b.length - 1, q = u; P > 0; P--)
      (q = q.add(b[P])), (O = O.add(q));
    if (((N = N.add(O)), L !== 0)) for (let P = 0; P < g; P++) N = N.double();
  }
  return N;
}
function da(e) {
  return (
    oa(e.Fp),
    rn(
      e,
      { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
      { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" },
    ),
    Object.freeze({ ...Mi(e.n, e.nBitLength), ...e, p: e.Fp.ORDER })
  );
}
var Fn;
(function (e) {
  (e[(e.Empty = 0)] = "Empty"),
    (e[(e.Fork = 1)] = "Fork"),
    (e[(e.Labeled = 2)] = "Labeled"),
    (e[(e.Leaf = 3)] = "Leaf"),
    (e[(e.Pruned = 4)] = "Pruned");
})(Fn || (Fn = {}));
ce(
  "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100",
);
var vn;
(function (e) {
  (e.Unknown = "unknown"), (e.Absent = "absent"), (e.Found = "found");
})(vn || (vn = {}));
var Rn;
(function (e) {
  (e.Less = "less"), (e.Greater = "greater");
})(Rn || (Rn = {}));
const He = BigInt(2 ** 32 - 1),
  Pr = BigInt(32);
function Hi(e, t = !1) {
  return t
    ? { h: Number(e & He), l: Number((e >> Pr) & He) }
    : { h: Number((e >> Pr) & He) | 0, l: Number(e & He) | 0 };
}
function pa(e, t = !1) {
  let r = new Uint32Array(e.length),
    s = new Uint32Array(e.length);
  for (let u = 0; u < e.length; u++) {
    const { h: d, l: g } = Hi(e[u], t);
    [r[u], s[u]] = [d, g];
  }
  return [r, s];
}
const wa = (e, t) => (BigInt(e >>> 0) << Pr) | BigInt(t >>> 0),
  ya = (e, t, r) => e >>> r,
  ga = (e, t, r) => (e << (32 - r)) | (t >>> r),
  xa = (e, t, r) => (e >>> r) | (t << (32 - r)),
  ma = (e, t, r) => (e << (32 - r)) | (t >>> r),
  ba = (e, t, r) => (e << (64 - r)) | (t >>> (r - 32)),
  Ea = (e, t, r) => (e >>> (r - 32)) | (t << (64 - r)),
  _a = (e, t) => t,
  Ia = (e, t) => e,
  Aa = (e, t, r) => (e << r) | (t >>> (32 - r)),
  Ba = (e, t, r) => (t << r) | (e >>> (32 - r)),
  Sa = (e, t, r) => (t << (r - 32)) | (e >>> (64 - r)),
  Ta = (e, t, r) => (e << (r - 32)) | (t >>> (64 - r));
function Ua(e, t, r, s) {
  const u = (t >>> 0) + (s >>> 0);
  return { h: (e + r + ((u / 2 ** 32) | 0)) | 0, l: u | 0 };
}
const Na = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0),
  Fa = (e, t, r, s) => (t + r + s + ((e / 2 ** 32) | 0)) | 0,
  va = (e, t, r, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (s >>> 0),
  Ra = (e, t, r, s, u) => (t + r + s + u + ((e / 2 ** 32) | 0)) | 0,
  La = (e, t, r, s, u) =>
    (e >>> 0) + (t >>> 0) + (r >>> 0) + (s >>> 0) + (u >>> 0),
  Oa = (e, t, r, s, u, d) => (t + r + s + u + d + ((e / 2 ** 32) | 0)) | 0,
  ot = {
    fromBig: Hi,
    split: pa,
    toBig: wa,
    shrSH: ya,
    shrSL: ga,
    rotrSH: xa,
    rotrSL: ma,
    rotrBH: ba,
    rotrBL: Ea,
    rotr32H: _a,
    rotr32L: Ia,
    rotlSH: Aa,
    rotlSL: Ba,
    rotlBH: Sa,
    rotlBL: Ta,
    add: Ua,
    add3L: Na,
    add3H: Fa,
    add4L: va,
    add4H: Ra,
    add5H: Oa,
    add5L: La,
  },
  [Da, Pa] = ot.split(
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
    ].map((e) => BigInt(e)),
  ),
  re = new Uint32Array(80),
  ne = new Uint32Array(80);
class Ma extends Zn {
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
      Ah: t,
      Al: r,
      Bh: s,
      Bl: u,
      Ch: d,
      Cl: g,
      Dh: c,
      Dl: b,
      Eh: S,
      El: N,
      Fh: L,
      Fl: O,
      Gh: P,
      Gl: q,
      Hh: W,
      Hl: lt,
    } = this;
    return [t, r, s, u, d, g, c, b, S, N, L, O, P, q, W, lt];
  }
  set(t, r, s, u, d, g, c, b, S, N, L, O, P, q, W, lt) {
    (this.Ah = t | 0),
      (this.Al = r | 0),
      (this.Bh = s | 0),
      (this.Bl = u | 0),
      (this.Ch = d | 0),
      (this.Cl = g | 0),
      (this.Dh = c | 0),
      (this.Dl = b | 0),
      (this.Eh = S | 0),
      (this.El = N | 0),
      (this.Fh = L | 0),
      (this.Fl = O | 0),
      (this.Gh = P | 0),
      (this.Gl = q | 0),
      (this.Hh = W | 0),
      (this.Hl = lt | 0);
  }
  process(t, r) {
    for (let K = 0; K < 16; K++, r += 4)
      (re[K] = t.getUint32(r)), (ne[K] = t.getUint32((r += 4)));
    for (let K = 16; K < 80; K++) {
      const Ut = re[K - 15] | 0,
        ut = ne[K - 15] | 0,
        J = ot.rotrSH(Ut, ut, 1) ^ ot.rotrSH(Ut, ut, 8) ^ ot.shrSH(Ut, ut, 7),
        X = ot.rotrSL(Ut, ut, 1) ^ ot.rotrSL(Ut, ut, 8) ^ ot.shrSL(Ut, ut, 7),
        nt = re[K - 2] | 0,
        it = ne[K - 2] | 0,
        C = ot.rotrSH(nt, it, 19) ^ ot.rotrBH(nt, it, 61) ^ ot.shrSH(nt, it, 6),
        xt =
          ot.rotrSL(nt, it, 19) ^ ot.rotrBL(nt, it, 61) ^ ot.shrSL(nt, it, 6),
        ct = ot.add4L(X, xt, ne[K - 7], ne[K - 16]),
        ft = ot.add4H(ct, J, C, re[K - 7], re[K - 16]);
      (re[K] = ft | 0), (ne[K] = ct | 0);
    }
    let {
      Ah: s,
      Al: u,
      Bh: d,
      Bl: g,
      Ch: c,
      Cl: b,
      Dh: S,
      Dl: N,
      Eh: L,
      El: O,
      Fh: P,
      Fl: q,
      Gh: W,
      Gl: lt,
      Hh: Et,
      Hl: at,
    } = this;
    for (let K = 0; K < 80; K++) {
      const Ut =
          ot.rotrSH(L, O, 14) ^ ot.rotrSH(L, O, 18) ^ ot.rotrBH(L, O, 41),
        ut = ot.rotrSL(L, O, 14) ^ ot.rotrSL(L, O, 18) ^ ot.rotrBL(L, O, 41),
        J = (L & P) ^ (~L & W),
        X = (O & q) ^ (~O & lt),
        nt = ot.add5L(at, ut, X, Pa[K], ne[K]),
        it = ot.add5H(nt, Et, Ut, J, Da[K], re[K]),
        C = nt | 0,
        xt = ot.rotrSH(s, u, 28) ^ ot.rotrBH(s, u, 34) ^ ot.rotrBH(s, u, 39),
        ct = ot.rotrSL(s, u, 28) ^ ot.rotrBL(s, u, 34) ^ ot.rotrBL(s, u, 39),
        ft = (s & d) ^ (s & c) ^ (d & c),
        St = (u & g) ^ (u & b) ^ (g & b);
      (Et = W | 0),
        (at = lt | 0),
        (W = P | 0),
        (lt = q | 0),
        (P = L | 0),
        (q = O | 0),
        ({ h: L, l: O } = ot.add(S | 0, N | 0, it | 0, C | 0)),
        (S = c | 0),
        (N = b | 0),
        (c = d | 0),
        (b = g | 0),
        (d = s | 0),
        (g = u | 0);
      const _t = ot.add3L(C, ct, St);
      (s = ot.add3H(_t, it, xt, ft)), (u = _t | 0);
    }
    ({ h: s, l: u } = ot.add(this.Ah | 0, this.Al | 0, s | 0, u | 0)),
      ({ h: d, l: g } = ot.add(this.Bh | 0, this.Bl | 0, d | 0, g | 0)),
      ({ h: c, l: b } = ot.add(this.Ch | 0, this.Cl | 0, c | 0, b | 0)),
      ({ h: S, l: N } = ot.add(this.Dh | 0, this.Dl | 0, S | 0, N | 0)),
      ({ h: L, l: O } = ot.add(this.Eh | 0, this.El | 0, L | 0, O | 0)),
      ({ h: P, l: q } = ot.add(this.Fh | 0, this.Fl | 0, P | 0, q | 0)),
      ({ h: W, l: lt } = ot.add(this.Gh | 0, this.Gl | 0, W | 0, lt | 0)),
      ({ h: Et, l: at } = ot.add(this.Hh | 0, this.Hl | 0, Et | 0, at | 0)),
      this.set(s, u, d, g, c, b, S, N, L, O, P, q, W, lt, Et, at);
  }
  roundClean() {
    re.fill(0), ne.fill(0);
  }
  destroy() {
    this.buffer.fill(0),
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Ca = Gr(() => new Ma());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const $t =
    BigInt(0),
  Ct = BigInt(1),
  $e = BigInt(2),
  ka = BigInt(8),
  Ga = { zip215: !0 };
function Ha(e) {
  const t = da(e);
  return (
    rn(
      e,
      { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" },
      {
        adjustScalarBytes: "function",
        domain: "function",
        uvRatio: "function",
        mapToCurve: "function",
      },
    ),
    Object.freeze({ ...t })
  );
}
function $a(e) {
  const t = Ha(e),
    {
      Fp: r,
      n: s,
      prehash: u,
      hash: d,
      randomBytes: g,
      nByteLength: c,
      h: b,
    } = t,
    S = $e << (BigInt(c * 8) - Ct),
    N = r.create,
    L = Ci(t.n, t.nBitLength),
    O =
      t.uvRatio ||
      ((Z, M) => {
        try {
          return { isValid: !0, value: r.sqrt(Z * r.inv(M)) };
        } catch {
          return { isValid: !1, value: $t };
        }
      }),
    P = t.adjustScalarBytes || ((Z) => Z),
    q =
      t.domain ||
      ((Z, M, k) => {
        if ((dr("phflag", k), M.length || k))
          throw new Error("Contexts/pre-hash are not supported");
        return Z;
      });
  function W(Z, M) {
    Be("coordinate " + Z, M, $t, S);
  }
  function lt(Z) {
    if (!(Z instanceof K)) throw new Error("ExtendedPoint expected");
  }
  const Et = Bn((Z, M) => {
      const { ex: k, ey: j, ez: Q } = Z,
        G = Z.is0();
      M == null && (M = G ? ka : r.inv(Q));
      const $ = N(k * M),
        yt = N(j * M),
        y = N(Q * M);
      if (G) return { x: $t, y: Ct };
      if (y !== Ct) throw new Error("invZ was invalid");
      return { x: $, y: yt };
    }),
    at = Bn((Z) => {
      const { a: M, d: k } = t;
      if (Z.is0()) throw new Error("bad point: ZERO");
      const { ex: j, ey: Q, ez: G, et: $ } = Z,
        yt = N(j * j),
        y = N(Q * Q),
        dt = N(G * G),
        mt = N(dt * dt),
        Tt = N(yt * M),
        H = N(dt * N(Tt + y)),
        Y = N(mt + N(k * N(yt * y)));
      if (H !== Y) throw new Error("bad point: equation left != right (1)");
      const w = N(j * Q),
        x = N(G * $);
      if (w !== x) throw new Error("bad point: equation left != right (2)");
      return !0;
    });
  class K {
    constructor(M, k, j, Q) {
      (this.ex = M),
        (this.ey = k),
        (this.ez = j),
        (this.et = Q),
        W("x", M),
        W("y", k),
        W("z", j),
        W("t", Q),
        Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(M) {
      if (M instanceof K) throw new Error("extended point not allowed");
      const { x: k, y: j } = M || {};
      return W("x", k), W("y", j), new K(k, j, Ct, N(k * j));
    }
    static normalizeZ(M) {
      const k = r.invertBatch(M.map((j) => j.ez));
      return M.map((j, Q) => j.toAffine(k[Q])).map(K.fromAffine);
    }
    static msm(M, k) {
      return la(K, L, M, k);
    }
    _setWindowSize(M) {
      J.setWindowSize(this, M);
    }
    assertValidity() {
      at(this);
    }
    equals(M) {
      lt(M);
      const { ex: k, ey: j, ez: Q } = this,
        { ex: G, ey: $, ez: yt } = M,
        y = N(k * yt),
        dt = N(G * Q),
        mt = N(j * yt),
        Tt = N($ * Q);
      return y === dt && mt === Tt;
    }
    is0() {
      return this.equals(K.ZERO);
    }
    negate() {
      return new K(N(-this.ex), this.ey, this.ez, N(-this.et));
    }
    double() {
      const { a: M } = t,
        { ex: k, ey: j, ez: Q } = this,
        G = N(k * k),
        $ = N(j * j),
        yt = N($e * N(Q * Q)),
        y = N(M * G),
        dt = k + j,
        mt = N(N(dt * dt) - G - $),
        Tt = y + $,
        H = Tt - yt,
        Y = y - $,
        w = N(mt * H),
        x = N(Tt * Y),
        _ = N(mt * Y),
        T = N(H * Tt);
      return new K(w, x, T, _);
    }
    add(M) {
      lt(M);
      const { a: k, d: j } = t,
        { ex: Q, ey: G, ez: $, et: yt } = this,
        { ex: y, ey: dt, ez: mt, et: Tt } = M;
      if (k === BigInt(-1)) {
        const p = N((G - Q) * (dt + y)),
          E = N((G + Q) * (dt - y)),
          F = N(E - p);
        if (F === $t) return this.double();
        const D = N($ * $e * Tt),
          z = N(yt * $e * mt),
          V = z + D,
          rt = E + p,
          h = z - D,
          o = N(V * F),
          a = N(rt * h),
          m = N(V * h),
          A = N(F * rt);
        return new K(o, a, A, m);
      }
      const H = N(Q * y),
        Y = N(G * dt),
        w = N(yt * j * Tt),
        x = N($ * mt),
        _ = N((Q + G) * (y + dt) - H - Y),
        T = x - w,
        B = x + w,
        U = N(Y - k * H),
        f = N(_ * T),
        n = N(B * U),
        i = N(_ * U),
        l = N(T * B);
      return new K(f, n, l, i);
    }
    subtract(M) {
      return this.add(M.negate());
    }
    wNAF(M) {
      return J.wNAFCached(this, M, K.normalizeZ);
    }
    multiply(M) {
      const k = M;
      Be("scalar", k, Ct, s);
      const { p: j, f: Q } = this.wNAF(k);
      return K.normalizeZ([j, Q])[0];
    }
    multiplyUnsafe(M, k = K.ZERO) {
      const j = M;
      return (
        Be("scalar", j, $t, s),
        j === $t
          ? ut
          : this.is0() || j === Ct
            ? this
            : J.wNAFCachedUnsafe(this, j, K.normalizeZ, k)
      );
    }
    isSmallOrder() {
      return this.multiplyUnsafe(b).is0();
    }
    isTorsionFree() {
      return J.unsafeLadder(this, s).is0();
    }
    toAffine(M) {
      return Et(this, M);
    }
    clearCofactor() {
      const { h: M } = t;
      return M === Ct ? this : this.multiplyUnsafe(M);
    }
    static fromHex(M, k = !1) {
      const { d: j, a: Q } = t,
        G = r.BYTES;
      (M = Xt("pointHex", M, G)), dr("zip215", k);
      const $ = M.slice(),
        yt = M[G - 1];
      $[G - 1] = yt & -129;
      const y = Ke($),
        dt = k ? S : r.ORDER;
      Be("pointHex.y", y, $t, dt);
      const mt = N(y * y),
        Tt = N(mt - Ct),
        H = N(j * mt - Q);
      let { isValid: Y, value: w } = O(Tt, H);
      if (!Y) throw new Error("Point.fromHex: invalid y coordinate");
      const x = (w & Ct) === Ct,
        _ = (yt & 128) !== 0;
      if (!k && w === $t && _) throw new Error("Point.fromHex: x=0 and x_0=1");
      return _ !== x && (w = N(-w)), K.fromAffine({ x: w, y });
    }
    static fromPrivateKey(M) {
      return it(M).point;
    }
    toRawBytes() {
      const { x: M, y: k } = this.toAffine(),
        j = Or(k, r.BYTES);
      return (j[j.length - 1] |= M & Ct ? 128 : 0), j;
    }
    toHex() {
      return en(this.toRawBytes());
    }
  }
  (K.BASE = new K(t.Gx, t.Gy, Ct, N(t.Gx * t.Gy))),
    (K.ZERO = new K($t, Ct, Ct, $t));
  const { BASE: Ut, ZERO: ut } = K,
    J = ha(K, c * 8);
  function X(Z) {
    return Rt(Z, s);
  }
  function nt(Z) {
    return X(Ke(Z));
  }
  function it(Z) {
    const M = r.BYTES;
    Z = Xt("private key", Z, M);
    const k = Xt("hashed private key", d(Z), 2 * M),
      j = P(k.slice(0, M)),
      Q = k.slice(M, 2 * M),
      G = nt(j),
      $ = Ut.multiply(G),
      yt = $.toRawBytes();
    return { head: j, prefix: Q, scalar: G, point: $, pointBytes: yt };
  }
  function C(Z) {
    return it(Z).pointBytes;
  }
  function xt(Z = new Uint8Array(), ...M) {
    const k = An(...M);
    return nt(d(q(k, Xt("context", Z), !!u)));
  }
  function ct(Z, M, k = {}) {
    (Z = Xt("message", Z)), u && (Z = u(Z));
    const { prefix: j, scalar: Q, pointBytes: G } = it(M),
      $ = xt(k.context, j, Z),
      yt = Ut.multiply($).toRawBytes(),
      y = xt(k.context, yt, G, Z),
      dt = X($ + y * Q);
    Be("signature.s", dt, $t, s);
    const mt = An(yt, Or(dt, r.BYTES));
    return Xt("result", mt, r.BYTES * 2);
  }
  const ft = Ga;
  function St(Z, M, k, j = ft) {
    const { context: Q, zip215: G } = j,
      $ = r.BYTES;
    (Z = Xt("signature", Z, 2 * $)),
      (M = Xt("message", M)),
      (k = Xt("publicKey", k, $)),
      G !== void 0 && dr("zip215", G),
      u && (M = u(M));
    const yt = Ke(Z.slice($, 2 * $));
    let y, dt, mt;
    try {
      (y = K.fromHex(k, G)),
        (dt = K.fromHex(Z.slice(0, $), G)),
        (mt = Ut.multiplyUnsafe(yt));
    } catch {
      return !1;
    }
    if (!G && y.isSmallOrder()) return !1;
    const Tt = xt(Q, dt.toRawBytes(), y.toRawBytes(), M);
    return dt
      .add(y.multiplyUnsafe(Tt))
      .subtract(mt)
      .clearCofactor()
      .equals(K.ZERO);
  }
  return (
    Ut._setWindowSize(8),
    {
      CURVE: t,
      getPublicKey: C,
      sign: ct,
      verify: St,
      ExtendedPoint: K,
      utils: {
        getExtendedPublicKey: it,
        randomPrivateKey: () => g(r.BYTES),
        precompute(Z = 8, M = K.BASE) {
          return M._setWindowSize(Z), M.multiply(BigInt(3)), M;
        },
      },
    }
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const nn =
    BigInt(
      "57896044618658097711785492504343953926634992332820282019728792003956564819949",
    ),
  Ln = BigInt(
    "19681161376707505956807079304988542015446066515923890162744021073123829784752",
  );
BigInt(0);
const za = BigInt(1),
  On = BigInt(2);
BigInt(3);
const Ka = BigInt(5),
  Ya = BigInt(8);
function Wa(e) {
  const t = BigInt(10),
    r = BigInt(20),
    s = BigInt(40),
    u = BigInt(80),
    d = nn,
    c = (((e * e) % d) * e) % d,
    b = (Wt(c, On, d) * c) % d,
    S = (Wt(b, za, d) * e) % d,
    N = (Wt(S, Ka, d) * S) % d,
    L = (Wt(N, t, d) * N) % d,
    O = (Wt(L, r, d) * L) % d,
    P = (Wt(O, s, d) * O) % d,
    q = (Wt(P, u, d) * P) % d,
    W = (Wt(q, u, d) * P) % d,
    lt = (Wt(W, t, d) * N) % d;
  return { pow_p_5_8: (Wt(lt, On, d) * e) % d, b2: c };
}
function Va(e) {
  return (e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e;
}
function qa(e, t) {
  const r = nn,
    s = Rt(t * t * t, r),
    u = Rt(s * s * t, r),
    d = Wa(e * u).pow_p_5_8;
  let g = Rt(e * s * d, r);
  const c = Rt(t * g * g, r),
    b = g,
    S = Rt(g * Ln, r),
    N = c === e,
    L = c === Rt(-e, r),
    O = c === Rt(-e * Ln, r);
  return (
    N && (g = b),
    (L || O) && (g = S),
    ia(g, r) && (g = Rt(-g, r)),
    { isValid: N || L, value: g }
  );
}
const Ja = Ci(nn, void 0, !0),
  Xa = {
    a: BigInt(-1),
    d: BigInt(
      "37095705934669439343138083508754565189542113879843219016388785533085940283555",
    ),
    Fp: Ja,
    n: BigInt(
      "7237005577332262213973186563042994240857116359379907606001950938285454250989",
    ),
    h: Ya,
    Gx: BigInt(
      "15112221349535400772501151409588531511454012693041857206046113283949847762202",
    ),
    Gy: BigInt(
      "46316835694926478169428394003475163141307993866256225615783033603165251855960",
    ),
    hash: Ca,
    randomBytes: Os,
    adjustScalarBytes: Va,
    uvRatio: qa,
  },
  Se = $a(Xa),
  Dn = (e) => {
    if (e <= 127) return 1;
    if (e <= 255) return 2;
    if (e <= 65535) return 3;
    if (e <= 16777215) return 4;
    throw new Error("Length too long (> 4 bytes)");
  },
  Pn = (e, t, r) => {
    if (r <= 127) return (e[t] = r), 1;
    if (r <= 255) return (e[t] = 129), (e[t + 1] = r), 2;
    if (r <= 65535) return (e[t] = 130), (e[t + 1] = r >> 8), (e[t + 2] = r), 3;
    if (r <= 16777215)
      return (
        (e[t] = 131),
        (e[t + 1] = r >> 16),
        (e[t + 2] = r >> 8),
        (e[t + 3] = r),
        4
      );
    throw new Error("Length too long (> 4 bytes)");
  },
  Mr = (e, t) => {
    if (e[t] < 128) return 1;
    if (e[t] === 128) throw new Error("Invalid length 0");
    if (e[t] === 129) return 2;
    if (e[t] === 130) return 3;
    if (e[t] === 131) return 4;
    throw new Error("Length too long (> 4 bytes)");
  },
  ja = (e, t) => {
    const r = Mr(e, t);
    if (r === 1) return e[t];
    if (r === 2) return e[t + 1];
    if (r === 3) return (e[t + 1] << 8) + e[t + 2];
    if (r === 4) return (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3];
    throw new Error("Length too long (> 4 bytes)");
  };
Uint8Array.from([48, 12, 6, 10, 43, 6, 1, 4, 1, 131, 184, 67, 1, 1]);
const Mn = Uint8Array.from([48, 5, 6, 3, 43, 101, 112]);
Uint8Array.from([
  48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 10,
]);
function Za(e, t) {
  const r = 2 + Dn(e.byteLength + 1),
    s = t.byteLength + r + e.byteLength;
  let u = 0;
  const d = new Uint8Array(1 + Dn(s) + s);
  return (
    (d[u++] = 48),
    (u += Pn(d, u, s)),
    d.set(t, u),
    (u += t.byteLength),
    (d[u++] = 3),
    (u += Pn(d, u, e.byteLength + 1)),
    (d[u++] = 0),
    d.set(new Uint8Array(e), u),
    d
  );
}
const Qa = (e, t) => {
  let r = 0;
  const s = (c, b) => {
      if (u[r++] !== c) throw new Error("Expected: " + b);
    },
    u = new Uint8Array(e);
  if (
    (s(48, "sequence"), (r += Mr(u, r)), !ei(u.slice(r, r + t.byteLength), t))
  )
    throw new Error("Not the expected OID.");
  (r += t.byteLength), s(3, "bit string");
  const d = ja(u, r) - 1;
  (r += Mr(u, r)), s(0, "0 padding");
  const g = u.slice(r);
  if (d !== g.length)
    throw new Error(
      `DER payload mismatch: Expected length ${d} actual length ${g.length}`,
    );
  return g;
};
var Cn;
(function (e) {
  (e.Received = "received"),
    (e.Processing = "processing"),
    (e.Replied = "replied"),
    (e.Rejected = "rejected"),
    (e.Unknown = "unknown"),
    (e.Done = "done");
})(Cn || (Cn = {}));
var kn;
(function (e) {
  (e.Error = "err"),
    (e.GetPrincipal = "gp"),
    (e.GetPrincipalResponse = "gpr"),
    (e.Query = "q"),
    (e.QueryResponse = "qr"),
    (e.Call = "c"),
    (e.CallResponse = "cr"),
    (e.ReadState = "rs"),
    (e.ReadStateResponse = "rsr"),
    (e.Status = "s"),
    (e.StatusResponse = "sr");
})(kn || (kn = {}));
var Ze = function (e, t, r, s, u) {
    if (s === "m") throw new TypeError("Private method is not writable");
    if (s === "a" && !u)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !u : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return s === "a" ? u.call(e, r) : u ? (u.value = r) : t.set(e, r), r;
  },
  se = function (e, t, r, s) {
    if (r === "a" && !s)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !s : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? s : r === "a" ? s.call(e) : s ? s.value : t.get(e);
  },
  Ye,
  We,
  xe,
  me;
function Gn(e) {
  return e !== null && typeof e == "object";
}
class Zt {
  constructor(t) {
    if (
      (Ye.set(this, void 0),
      We.set(this, void 0),
      t.byteLength !== Zt.RAW_KEY_LENGTH)
    )
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    Ze(this, Ye, t, "f"), Ze(this, We, Zt.derEncode(t), "f");
  }
  static from(t) {
    if (typeof t == "string") {
      const r = ce(t);
      return this.fromRaw(r);
    } else if (Gn(t)) {
      const r = t;
      if (Gn(r) && Object.hasOwnProperty.call(r, "__derEncodedPublicKey__"))
        return this.fromDer(r);
      if (ArrayBuffer.isView(r)) {
        const s = r;
        return this.fromRaw(ri(s.buffer));
      } else {
        if (r instanceof ArrayBuffer) return this.fromRaw(r);
        if ("rawKey" in r) return this.fromRaw(r.rawKey);
        if ("derKey" in r) return this.fromDer(r.derKey);
        if ("toDer" in r) return this.fromDer(r.toDer());
      }
    }
    throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
  }
  static fromRaw(t) {
    return new Zt(t);
  }
  static fromDer(t) {
    return new Zt(this.derDecode(t));
  }
  static derEncode(t) {
    const r = Za(t, Mn).buffer;
    return (r.__derEncodedPublicKey__ = void 0), r;
  }
  static derDecode(t) {
    const r = Qa(t, Mn);
    if (r.length !== this.RAW_KEY_LENGTH)
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    return r;
  }
  get rawKey() {
    return se(this, Ye, "f");
  }
  get derKey() {
    return se(this, We, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
}
(Ye = new WeakMap()), (We = new WeakMap());
Zt.RAW_KEY_LENGTH = 32;
class ae extends qr {
  constructor(t, r) {
    super(),
      xe.set(this, void 0),
      me.set(this, void 0),
      Ze(this, xe, Zt.from(t), "f"),
      Ze(this, me, new Uint8Array(r), "f");
  }
  static generate(t) {
    if (t && t.length !== 32)
      throw new Error("Ed25519 Seed needs to be 32 bytes long.");
    t || (t = Se.utils.randomPrivateKey()),
      ei(t, new Uint8Array(new Array(32).fill(0))) &&
        console.warn(
          "Seed is all zeros. This is not a secure seed. Please provide a seed with sufficient entropy if this is a production environment.",
        );
    const r = new Uint8Array(32);
    for (let u = 0; u < 32; u++) r[u] = new Uint8Array(t)[u];
    const s = Se.getPublicKey(r);
    return ae.fromKeyPair(s, r);
  }
  static fromParsedJson(t) {
    const [r, s] = t;
    return new ae(Zt.fromDer(ce(r)), ce(s));
  }
  static fromJSON(t) {
    const r = JSON.parse(t);
    if (Array.isArray(r)) {
      if (typeof r[0] == "string" && typeof r[1] == "string")
        return this.fromParsedJson([r[0], r[1]]);
      throw new Error(
        "Deserialization error: JSON must have at least 2 items.",
      );
    }
    throw new Error(
      `Deserialization error: Invalid JSON type for string: ${JSON.stringify(t)}`,
    );
  }
  static fromKeyPair(t, r) {
    return new ae(Zt.fromRaw(t), r);
  }
  static fromSecretKey(t) {
    const r = Se.getPublicKey(new Uint8Array(t));
    return ae.fromKeyPair(r, t);
  }
  toJSON() {
    return [be(se(this, xe, "f").toDer()), be(se(this, me, "f"))];
  }
  getKeyPair() {
    return { secretKey: se(this, me, "f"), publicKey: se(this, xe, "f") };
  }
  getPublicKey() {
    return se(this, xe, "f");
  }
  async sign(t) {
    const r = new Uint8Array(t),
      s = Ue(Se.sign(r, se(this, me, "f").slice(0, 32)));
    return (
      Object.defineProperty(s, "__signature__", {
        enumerable: !1,
        value: void 0,
      }),
      s
    );
  }
  static verify(t, r, s) {
    const [u, d, g] = [t, r, s].map(
      (c) => (
        typeof c == "string" && (c = ce(c)),
        c instanceof Uint8Array && (c = c.buffer),
        new Uint8Array(c)
      ),
    );
    return Se.verify(d, u, g);
  }
}
(xe = new WeakMap()), (me = new WeakMap());
class sn extends Error {
  constructor(t) {
    super(t), (this.message = t), Object.setPrototypeOf(this, sn.prototype);
  }
}
function Hn(e) {
  if (typeof global < "u" && global.crypto && global.crypto.subtle)
    return global.crypto.subtle;
  if (e) return e;
  if (typeof crypto < "u" && crypto.subtle) return crypto.subtle;
  throw new sn(
    "Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto",
  );
}
class Qe extends qr {
  constructor(t, r, s) {
    super(), (this._keyPair = t), (this._derKey = r), (this._subtleCrypto = s);
  }
  static async generate(t) {
    const {
        extractable: r = !1,
        keyUsages: s = ["sign", "verify"],
        subtleCrypto: u,
      } = t ?? {},
      d = Hn(u),
      g = await d.generateKey({ name: "ECDSA", namedCurve: "P-256" }, r, s),
      c = await d.exportKey("spki", g.publicKey);
    return new this(g, c, d);
  }
  static async fromKeyPair(t, r) {
    const s = Hn(r),
      u = await s.exportKey("spki", t.publicKey);
    return new Qe(t, u, s);
  }
  getKeyPair() {
    return this._keyPair;
  }
  getPublicKey() {
    const t = this._derKey,
      r = Object.create(this._keyPair.publicKey);
    return (
      (r.toDer = function () {
        return t;
      }),
      r
    );
  }
  async sign(t) {
    const r = { name: "ECDSA", hash: { name: "SHA-256" } };
    return await this._subtleCrypto.sign(r, this._keyPair.privateKey, t);
  }
}
var tu = function (e, t, r, s, u) {
    if (s === "m") throw new TypeError("Private method is not writable");
    if (s === "a" && !u)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !u : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return s === "a" ? u.call(e, r) : u ? (u.value = r) : t.set(e, r), r;
  },
  Te = function (e, t, r, s) {
    if (r === "a" && !s)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !s : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? s : r === "a" ? s.call(e) : s ? s.value : t.get(e);
  },
  ie;
class eu {
  constructor(t) {
    ie.set(this, void 0), tu(this, ie, t, "f");
  }
  get rawKey() {
    return Te(this, ie, "f").rawKey;
  }
  get derKey() {
    return Te(this, ie, "f").derKey;
  }
  toDer() {
    return Te(this, ie, "f").toDer();
  }
  getPublicKey() {
    return Te(this, ie, "f");
  }
  getPrincipal() {
    return ue.from(Te(this, ie, "f").rawKey);
  }
  transformRequest() {
    return Promise.reject(
      "Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.",
    );
  }
}
ie = new WeakMap();
var ru = function (e, t, r, s, u) {
    if (s === "m") throw new TypeError("Private method is not writable");
    if (s === "a" && !u)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !u : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return s === "a" ? u.call(e, r) : u ? (u.value = r) : t.set(e, r), r;
  },
  nu = function (e, t, r, s) {
    if (r === "a" && !s)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !s : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? s : r === "a" ? s.call(e) : s ? s.value : t.get(e);
  },
  iu = function (e, t) {
    var r = {};
    for (var s in e)
      Object.prototype.hasOwnProperty.call(e, s) &&
        t.indexOf(s) < 0 &&
        (r[s] = e[s]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var u = 0, s = Object.getOwnPropertySymbols(e); u < s.length; u++)
        t.indexOf(s[u]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, s[u]) &&
          (r[s[u]] = e[s[u]]);
    return r;
  },
  Ve;
const su = new TextEncoder().encode("ic-request-auth-delegation"),
  ou = new TextEncoder().encode(`
ic-request`);
function mr(e) {
  if (typeof e != "string" || e.length < 64)
    throw new Error("Invalid public key.");
  return ce(e);
}
class on {
  constructor(t, r, s) {
    (this.pubkey = t), (this.expiration = r), (this.targets = s);
  }
  toCBOR() {
    return kt.value.map(
      Object.assign(
        {
          pubkey: kt.value.bytes(this.pubkey),
          expiration: kt.value.u64(this.expiration.toString(16), 16),
        },
        this.targets && {
          targets: kt.value.array(
            this.targets.map((t) => kt.value.bytes(t.toUint8Array())),
          ),
        },
      ),
    );
  }
  toJSON() {
    return Object.assign(
      { expiration: this.expiration.toString(16), pubkey: be(this.pubkey) },
      this.targets && { targets: this.targets.map((t) => t.toHex()) },
    );
  }
}
async function au(e, t, r, s) {
  const u = new on(t.toDer(), BigInt(+r) * BigInt(1e6), s),
    d = new Uint8Array([...su, ...new Uint8Array(Vr(Object.assign({}, u)))]),
    g = await e.sign(d);
  return { delegation: u, signature: g };
}
class Fe {
  constructor(t, r) {
    (this.delegations = t), (this.publicKey = r);
  }
  static async create(t, r, s = new Date(Date.now() + 15 * 60 * 1e3), u = {}) {
    var d, g;
    const c = await au(t, r, s, u.targets);
    return new Fe(
      [
        ...(((d = u.previous) === null || d === void 0
          ? void 0
          : d.delegations) || []),
        c,
      ],
      ((g = u.previous) === null || g === void 0 ? void 0 : g.publicKey) ||
        t.getPublicKey().toDer(),
    );
  }
  static fromJSON(t) {
    const { publicKey: r, delegations: s } =
      typeof t == "string" ? JSON.parse(t) : t;
    if (!Array.isArray(s)) throw new Error("Invalid delegations.");
    const u = s.map((d) => {
      const { delegation: g, signature: c } = d,
        { pubkey: b, expiration: S, targets: N } = g;
      if (N !== void 0 && !Array.isArray(N))
        throw new Error("Invalid targets.");
      return {
        delegation: new on(
          mr(b),
          BigInt("0x" + S),
          N &&
            N.map((L) => {
              if (typeof L != "string") throw new Error("Invalid target.");
              return ue.fromHex(L);
            }),
        ),
        signature: mr(c),
      };
    });
    return new this(u, mr(r));
  }
  static fromDelegations(t, r) {
    return new this(t, r);
  }
  toJSON() {
    return {
      delegations: this.delegations.map((t) => {
        const { delegation: r, signature: s } = t,
          { targets: u } = r;
        return {
          delegation: Object.assign(
            { expiration: r.expiration.toString(16), pubkey: be(r.pubkey) },
            u && { targets: u.map((d) => d.toHex()) },
          ),
          signature: be(s),
        };
      }),
      publicKey: be(this.publicKey),
    };
  }
}
class $n extends qr {
  constructor(t, r) {
    super(), (this._inner = t), (this._delegation = r);
  }
  static fromDelegation(t, r) {
    return new this(t, r);
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
  sign(t) {
    return this._inner.sign(t);
  }
  async transformRequest(t) {
    const { body: r } = t,
      s = iu(t, ["body"]),
      u = await Vr(r);
    return Object.assign(Object.assign({}, s), {
      body: {
        content: r,
        sender_sig: await this.sign(
          new Uint8Array([...ou, ...new Uint8Array(u)]),
        ),
        sender_delegation: this._delegation.delegations,
        sender_pubkey: this._delegation.publicKey,
      },
    });
  }
}
class tr extends eu {
  constructor(t, r) {
    super(t), Ve.set(this, void 0), ru(this, Ve, r, "f");
  }
  get delegation() {
    return nu(this, Ve, "f");
  }
  static fromDelegation(t, r) {
    return new tr(t, r);
  }
}
Ve = new WeakMap();
function $i(e, t) {
  for (const { delegation: s } of e.delegations)
    if (+new Date(Number(s.expiration / BigInt(1e6))) <= +Date.now()) return !1;
  const r = [];
  for (const s of r) {
    const u = s.toText();
    for (const { delegation: d } of e.delegations) {
      if (d.targets === void 0) continue;
      let g = !0;
      for (const c of d.targets)
        if (c.toText() === u) {
          g = !1;
          break;
        }
      if (g) return !1;
    }
  }
  return !0;
}
var zn;
(function (e) {
  e[(e.ECDSA_WITH_SHA256 = -7)] = "ECDSA_WITH_SHA256";
})(zn || (zn = {}));
const Kn = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"];
class Yn {
  constructor(t = {}) {
    var r;
    (this.callbacks = []),
      (this.idleTimeout = 10 * 60 * 1e3),
      (this.timeoutID = void 0);
    const { onIdle: s, idleTimeout: u = 10 * 60 * 1e3 } = t || {};
    (this.callbacks = s ? [s] : []), (this.idleTimeout = u);
    const d = this._resetTimer.bind(this);
    window.addEventListener("load", d, !0),
      Kn.forEach(function (c) {
        document.addEventListener(c, d, !0);
      });
    const g = (c, b) => {
      let S;
      return (...N) => {
        const L = this,
          O = function () {
            (S = void 0), c.apply(L, N);
          };
        clearTimeout(S), (S = window.setTimeout(O, b));
      };
    };
    if (t?.captureScroll) {
      const c = g(
        d,
        (r = t?.scrollDebounce) !== null && r !== void 0 ? r : 100,
      );
      window.addEventListener("scroll", c, !0);
    }
    d();
  }
  static create(t = {}) {
    return new this(t);
  }
  registerCallback(t) {
    this.callbacks.push(t);
  }
  exit() {
    clearTimeout(this.timeoutID),
      window.removeEventListener("load", this._resetTimer, !0);
    const t = this._resetTimer.bind(this);
    Kn.forEach(function (r) {
      document.removeEventListener(r, t, !0);
    }),
      this.callbacks.forEach((r) => r());
  }
  _resetTimer() {
    const t = this.exit.bind(this);
    window.clearTimeout(this.timeoutID),
      (this.timeoutID = window.setTimeout(t, this.idleTimeout));
  }
}
const uu = (e, t) => t.some((r) => e instanceof r);
let Wn, Vn;
function cu() {
  return (
    Wn ||
    (Wn = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function fu() {
  return (
    Vn ||
    (Vn = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const zi = new WeakMap(),
  Cr = new WeakMap(),
  Ki = new WeakMap(),
  br = new WeakMap(),
  an = new WeakMap();
function hu(e) {
  const t = new Promise((r, s) => {
    const u = () => {
        e.removeEventListener("success", d), e.removeEventListener("error", g);
      },
      d = () => {
        r(fe(e.result)), u();
      },
      g = () => {
        s(e.error), u();
      };
    e.addEventListener("success", d), e.addEventListener("error", g);
  });
  return (
    t
      .then((r) => {
        r instanceof IDBCursor && zi.set(r, e);
      })
      .catch(() => {}),
    an.set(t, e),
    t
  );
}
function lu(e) {
  if (Cr.has(e)) return;
  const t = new Promise((r, s) => {
    const u = () => {
        e.removeEventListener("complete", d),
          e.removeEventListener("error", g),
          e.removeEventListener("abort", g);
      },
      d = () => {
        r(), u();
      },
      g = () => {
        s(e.error || new DOMException("AbortError", "AbortError")), u();
      };
    e.addEventListener("complete", d),
      e.addEventListener("error", g),
      e.addEventListener("abort", g);
  });
  Cr.set(e, t);
}
let kr = {
  get(e, t, r) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return Cr.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || Ki.get(e);
      if (t === "store")
        return r.objectStoreNames[1]
          ? void 0
          : r.objectStore(r.objectStoreNames[0]);
    }
    return fe(e[t]);
  },
  set(e, t, r) {
    return (e[t] = r), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function du(e) {
  kr = e(kr);
}
function pu(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...r) {
        const s = e.call(Er(this), t, ...r);
        return Ki.set(s, t.sort ? t.sort() : [t]), fe(s);
      }
    : fu().includes(e)
      ? function (...t) {
          return e.apply(Er(this), t), fe(zi.get(this));
        }
      : function (...t) {
          return fe(e.apply(Er(this), t));
        };
}
function wu(e) {
  return typeof e == "function"
    ? pu(e)
    : (e instanceof IDBTransaction && lu(e),
      uu(e, cu()) ? new Proxy(e, kr) : e);
}
function fe(e) {
  if (e instanceof IDBRequest) return hu(e);
  if (br.has(e)) return br.get(e);
  const t = wu(e);
  return t !== e && (br.set(e, t), an.set(t, e)), t;
}
const Er = (e) => an.get(e);
function yu(e, t, { blocked: r, upgrade: s, blocking: u, terminated: d } = {}) {
  const g = indexedDB.open(e, t),
    c = fe(g);
  return (
    s &&
      g.addEventListener("upgradeneeded", (b) => {
        s(fe(g.result), b.oldVersion, b.newVersion, fe(g.transaction), b);
      }),
    r && g.addEventListener("blocked", (b) => r(b.oldVersion, b.newVersion, b)),
    c
      .then((b) => {
        d && b.addEventListener("close", () => d()),
          u &&
            b.addEventListener("versionchange", (S) =>
              u(S.oldVersion, S.newVersion, S),
            );
      })
      .catch(() => {}),
    c
  );
}
const gu = ["get", "getKey", "getAll", "getAllKeys", "count"],
  xu = ["put", "add", "delete", "clear"],
  _r = new Map();
function qn(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (_r.get(t)) return _r.get(t);
  const r = t.replace(/FromIndex$/, ""),
    s = t !== r,
    u = xu.includes(r);
  if (
    !(r in (s ? IDBIndex : IDBObjectStore).prototype) ||
    !(u || gu.includes(r))
  )
    return;
  const d = async function (g, ...c) {
    const b = this.transaction(g, u ? "readwrite" : "readonly");
    let S = b.store;
    return (
      s && (S = S.index(c.shift())),
      (await Promise.all([S[r](...c), u && b.done]))[0]
    );
  };
  return _r.set(t, d), d;
}
du((e) => ({
  ...e,
  get: (t, r, s) => qn(t, r) || e.get(t, r, s),
  has: (t, r) => !!qn(t, r) || e.has(t, r),
}));
const Yi = "auth-client-db",
  Wi = "ic-keyval",
  mu = async (e = Yi, t = Wi, r) => (
    Vi &&
      localStorage != null &&
      localStorage.getItem(jt) &&
      (localStorage.removeItem(jt), localStorage.removeItem(oe)),
    await yu(e, r, {
      upgrade: (s) => {
        s.objectStoreNames.contains(t) && s.clear(t), s.createObjectStore(t);
      },
    })
  );
async function bu(e, t, r) {
  return await e.get(t, r);
}
async function Eu(e, t, r, s) {
  return await e.put(t, s, r);
}
async function _u(e, t, r) {
  return await e.delete(t, r);
}
class un {
  constructor(t, r) {
    (this._db = t), (this._storeName = r);
  }
  static async create(t) {
    const { dbName: r = Yi, storeName: s = Wi, version: u = Su } = t ?? {},
      d = await mu(r, s, u);
    return new un(d, s);
  }
  async set(t, r) {
    return await Eu(this._db, this._storeName, t, r);
  }
  async get(t) {
    var r;
    return (r = await bu(this._db, this._storeName, t)) !== null && r !== void 0
      ? r
      : null;
  }
  async remove(t) {
    return await _u(this._db, this._storeName, t);
  }
}
var Iu = function (e, t, r, s, u) {
    if (s === "m") throw new TypeError("Private method is not writable");
    if (s === "a" && !u)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !u : !t.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return s === "a" ? u.call(e, r) : u ? (u.value = r) : t.set(e, r), r;
  },
  Au = function (e, t, r, s) {
    if (r === "a" && !s)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !s : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? s : r === "a" ? s.call(e) : s ? s.value : t.get(e);
  },
  qe;
const oe = "identity",
  jt = "delegation",
  Bu = "iv",
  Su = 1,
  Vi = typeof window < "u";
class Tu {
  constructor(t = "ic-", r) {
    (this.prefix = t), (this._localStorage = r);
  }
  get(t) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + t));
  }
  set(t, r) {
    return (
      this._getLocalStorage().setItem(this.prefix + t, r), Promise.resolve()
    );
  }
  remove(t) {
    return (
      this._getLocalStorage().removeItem(this.prefix + t), Promise.resolve()
    );
  }
  _getLocalStorage() {
    if (this._localStorage) return this._localStorage;
    const t =
      typeof window > "u"
        ? typeof global > "u"
          ? typeof self > "u"
            ? void 0
            : self.localStorage
          : global.localStorage
        : window.localStorage;
    if (!t) throw new Error("Could not find local storage.");
    return t;
  }
}
class qi {
  constructor(t) {
    qe.set(this, void 0), Iu(this, qe, t ?? {}, "f");
  }
  get _db() {
    return new Promise((t) => {
      if (this.initializedDb) {
        t(this.initializedDb);
        return;
      }
      un.create(Au(this, qe, "f")).then((r) => {
        (this.initializedDb = r), t(r);
      });
    });
  }
  async get(t) {
    return await (await this._db).get(t);
  }
  async set(t, r) {
    await (await this._db).set(t, r);
  }
  async remove(t) {
    await (await this._db).remove(t);
  }
}
qe = new WeakMap();
const Uu = "https://identity.ic0.app",
  Nu = "#authorize",
  Ir = "ECDSA",
  Ar = "Ed25519",
  Fu = 500,
  vu = "UserInterrupt";
class Ru {
  constructor(t, r, s, u, d, g, c, b) {
    (this._identity = t),
      (this._key = r),
      (this._chain = s),
      (this._storage = u),
      (this.idleManager = d),
      (this._createOptions = g),
      (this._idpWindow = c),
      (this._eventHandler = b),
      this._registerDefaultIdleCallback();
  }
  static async create(t = {}) {
    var r, s, u;
    const d = (r = t.storage) !== null && r !== void 0 ? r : new qi(),
      g = (s = t.keyType) !== null && s !== void 0 ? s : Ir;
    let c = null;
    if (t.identity) c = t.identity;
    else {
      let L = await d.get(oe);
      if (!L && Vi)
        try {
          const O = new Tu(),
            P = await O.get(jt),
            q = await O.get(oe);
          P &&
            q &&
            g === Ir &&
            (console.log(
              "Discovered an identity stored in localstorage. Migrating to IndexedDB",
            ),
            await d.set(jt, P),
            await d.set(oe, q),
            (L = P),
            await O.remove(jt),
            await O.remove(oe));
        } catch (O) {
          console.error("error while attempting to recover localstorage: " + O);
        }
      if (L)
        try {
          typeof L == "object"
            ? g === Ar && typeof L == "string"
              ? (c = await ae.fromJSON(L))
              : (c = await Qe.fromKeyPair(L))
            : typeof L == "string" && (c = ae.fromJSON(L));
        } catch {}
    }
    let b = new bn(),
      S = null;
    if (c)
      try {
        const L = await d.get(jt);
        if (typeof L == "object" && L !== null)
          throw new Error(
            "Delegation chain is incorrectly stored. A delegation chain should be stored as a string.",
          );
        t.identity
          ? (b = t.identity)
          : L &&
            ((S = Fe.fromJSON(L)),
            $i(S)
              ? "toDer" in c
                ? (b = tr.fromDelegation(c, S))
                : (b = $n.fromDelegation(c, S))
              : (await Br(d), (c = null)));
      } catch (L) {
        console.error(L), await Br(d), (c = null);
      }
    let N;
    return (
      !((u = t.idleOptions) === null || u === void 0) && u.disableIdle
        ? (N = void 0)
        : (S || t.identity) && (N = Yn.create(t.idleOptions)),
      c ||
        (g === Ar
          ? ((c = await ae.generate()),
            await d.set(oe, JSON.stringify(c.toJSON())))
          : (t.storage &&
              g === Ir &&
              console.warn(
                `You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${Ar}' as the key type, as it can serialize to a string`,
              ),
            (c = await Qe.generate()),
            await d.set(oe, c.getKeyPair()))),
      new this(b, c, S, d, N, t)
    );
  }
  _registerDefaultIdleCallback() {
    var t, r;
    const s =
      (t = this._createOptions) === null || t === void 0
        ? void 0
        : t.idleOptions;
    !s?.onIdle &&
      !s?.disableDefaultIdleCallback &&
      ((r = this.idleManager) === null ||
        r === void 0 ||
        r.registerCallback(() => {
          this.logout(), location.reload();
        }));
  }
  async _handleSuccess(t, r) {
    var s, u;
    const d = t.delegations.map((S) => ({
        delegation: new on(
          S.delegation.pubkey,
          S.delegation.expiration,
          S.delegation.targets,
        ),
        signature: S.signature.buffer,
      })),
      g = Fe.fromDelegations(d, t.userPublicKey.buffer),
      c = this._key;
    if (!c) return;
    (this._chain = g),
      "toDer" in c
        ? (this._identity = tr.fromDelegation(c, this._chain))
        : (this._identity = $n.fromDelegation(c, this._chain)),
      (s = this._idpWindow) === null || s === void 0 || s.close();
    const b =
      (u = this._createOptions) === null || u === void 0
        ? void 0
        : u.idleOptions;
    !this.idleManager &&
      !b?.disableIdle &&
      ((this.idleManager = Yn.create(b)), this._registerDefaultIdleCallback()),
      this._removeEventListener(),
      delete this._idpWindow,
      this._chain &&
        (await this._storage.set(jt, JSON.stringify(this._chain.toJSON()))),
      r?.(t);
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return (
      !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null
    );
  }
  async login(t) {
    var r, s, u, d;
    const g = BigInt(8) * BigInt(36e11),
      c = new URL(
        ((r = t?.identityProvider) === null || r === void 0
          ? void 0
          : r.toString()) || Uu,
      );
    (c.hash = Nu),
      (s = this._idpWindow) === null || s === void 0 || s.close(),
      this._removeEventListener(),
      (this._eventHandler = this._getEventHandler(
        c,
        Object.assign(
          {
            maxTimeToLive:
              (u = t?.maxTimeToLive) !== null && u !== void 0 ? u : g,
          },
          t,
        ),
      )),
      window.addEventListener("message", this._eventHandler),
      (this._idpWindow =
        (d = window.open(
          c.toString(),
          "idpWindow",
          t?.windowOpenerFeatures,
        )) !== null && d !== void 0
          ? d
          : void 0);
    const b = () => {
      this._idpWindow &&
        (this._idpWindow.closed
          ? this._handleFailure(vu, t?.onError)
          : setTimeout(b, Fu));
    };
    b();
  }
  _getEventHandler(t, r) {
    return async (s) => {
      var u, d, g;
      if (s.origin !== t.origin) return;
      const c = s.data;
      switch (c.kind) {
        case "authorize-ready": {
          const b = Object.assign(
            {
              kind: "authorize-client",
              sessionPublicKey: new Uint8Array(
                (u = this._key) === null || u === void 0
                  ? void 0
                  : u.getPublicKey().toDer(),
              ),
              maxTimeToLive: r?.maxTimeToLive,
              allowPinAuthentication: r?.allowPinAuthentication,
              derivationOrigin:
                (d = r?.derivationOrigin) === null || d === void 0
                  ? void 0
                  : d.toString(),
            },
            r?.customValues,
          );
          (g = this._idpWindow) === null ||
            g === void 0 ||
            g.postMessage(b, t.origin);
          break;
        }
        case "authorize-client-success":
          try {
            await this._handleSuccess(c, r?.onSuccess);
          } catch (b) {
            this._handleFailure(b.message, r?.onError);
          }
          break;
        case "authorize-client-failure":
          this._handleFailure(c.text, r?.onError);
          break;
      }
    };
  }
  _handleFailure(t, r) {
    var s;
    (s = this._idpWindow) === null || s === void 0 || s.close(),
      r?.(t),
      this._removeEventListener(),
      delete this._idpWindow;
  }
  _removeEventListener() {
    this._eventHandler &&
      window.removeEventListener("message", this._eventHandler),
      (this._eventHandler = void 0);
  }
  async logout(t = {}) {
    if (
      (await Br(this._storage),
      (this._identity = new bn()),
      (this._chain = null),
      t.returnTo)
    )
      try {
        window.history.pushState({}, "", t.returnTo);
      } catch {
        window.location.href = t.returnTo;
      }
  }
}
async function Br(e) {
  await e.remove(oe), await e.remove(jt), await e.remove(Bu);
}
const Lu = () =>
  Ru.create({
    idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
  });
onmessage = ({ data: e }) => {
  const { msg: t } = e;
  switch (t) {
    case "startIdleTimer":
      Ou();
      return;
    case "stopIdleTimer":
      Ji();
      return;
  }
};
let Je;
const Ou = () => (Je = setInterval(async () => await Du(), ws)),
  Ji = () => {
    Je && (clearInterval(Je), (Je = void 0));
  },
  Du = async () => {
    const [e, t] = await Promise.all([Pu(), Mu()]);
    if (e && t.valid && t.delegation !== null) {
      ku(t.delegation);
      return;
    }
    Cu();
  },
  Pu = async () => (await Lu()).isAuthenticated(),
  Mu = async () => {
    const t = await new qi().get(jt),
      r = t !== null ? Fe.fromJSON(t) : null;
    return { valid: r !== null && $i(r), delegation: r };
  },
  Cu = () => {
    Ji(), postMessage({ msg: "signOutIdleTimer" });
  },
  ku = (e) => {
    const t = e.delegations[0]?.delegation.expiration;
    if (t === void 0) return;
    const r = new Date(Number(t / BigInt(1e6))).getTime() - Date.now();
    postMessage({
      msg: "delegationRemainingTime",
      data: { authRemainingTime: r },
    });
  };

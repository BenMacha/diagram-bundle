var Af = Object.defineProperty;
var Uf = (e, t, n) => t in e ? Af(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var re = (e, t, n) => Uf(e, typeof t != "symbol" ? t + "" : t, n);
import { defineComponent as Vf, ref as Bf, onMounted as Wf, watch as Hf, onBeforeUnmount as Gf, h as Qf } from "vue";
function Yf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ru = { exports: {} }, Hl = {}, Du = { exports: {} }, D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Or = Symbol.for("react.element"), Kf = Symbol.for("react.portal"), Xf = Symbol.for("react.fragment"), qf = Symbol.for("react.strict_mode"), Jf = Symbol.for("react.profiler"), Zf = Symbol.for("react.provider"), ep = Symbol.for("react.context"), tp = Symbol.for("react.forward_ref"), np = Symbol.for("react.suspense"), rp = Symbol.for("react.memo"), lp = Symbol.for("react.lazy"), Ys = Symbol.iterator;
function ip(e) {
  return e === null || typeof e != "object" ? null : (e = Ys && e[Ys] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Fu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Au = Object.assign, Uu = {};
function Rn(e, t, n) {
  this.props = e, this.context = t, this.refs = Uu, this.updater = n || Fu;
}
Rn.prototype.isReactComponent = {};
Rn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Rn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Vu() {
}
Vu.prototype = Rn.prototype;
function Go(e, t, n) {
  this.props = e, this.context = t, this.refs = Uu, this.updater = n || Fu;
}
var Qo = Go.prototype = new Vu();
Qo.constructor = Go;
Au(Qo, Rn.prototype);
Qo.isPureReactComponent = !0;
var Ks = Array.isArray, Bu = Object.prototype.hasOwnProperty, Yo = { current: null }, Wu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Hu(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) Bu.call(t, r) && !Wu.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: Or, type: e, key: i, ref: o, props: l, _owner: Yo.current };
}
function op(e, t) {
  return { $$typeof: Or, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ko(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Or;
}
function sp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Xs = /\/+/g;
function gi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? sp("" + e.key) : t.toString(36);
}
function ol(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Or:
        case Kf:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + gi(o, 0) : r, Ks(l) ? (n = "", e != null && (n = e.replace(Xs, "$&/") + "/"), ol(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Ko(l) && (l = op(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Xs, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Ks(e)) for (var s = 0; s < e.length; s++) {
    i = e[s];
    var a = r + gi(i, s);
    o += ol(i, t, n, a, l);
  }
  else if (a = ip(e), typeof a == "function") for (e = a.call(e), s = 0; !(i = e.next()).done; ) i = i.value, a = r + gi(i, s++), o += ol(i, t, n, a, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Vr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return ol(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function ap(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var _e = { current: null }, sl = { transition: null }, up = { ReactCurrentDispatcher: _e, ReactCurrentBatchConfig: sl, ReactCurrentOwner: Yo };
function Gu() {
  throw Error("act(...) is not supported in production builds of React.");
}
D.Children = { map: Vr, forEach: function(e, t, n) {
  Vr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Vr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Vr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ko(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
D.Component = Rn;
D.Fragment = Xf;
D.Profiler = Jf;
D.PureComponent = Go;
D.StrictMode = qf;
D.Suspense = np;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = up;
D.act = Gu;
D.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Au({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Yo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (a in t) Bu.call(t, a) && !Wu.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: Or, type: e.type, key: l, ref: i, props: r, _owner: o };
};
D.createContext = function(e) {
  return e = { $$typeof: ep, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Zf, _context: e }, e.Consumer = e;
};
D.createElement = Hu;
D.createFactory = function(e) {
  var t = Hu.bind(null, e);
  return t.type = e, t;
};
D.createRef = function() {
  return { current: null };
};
D.forwardRef = function(e) {
  return { $$typeof: tp, render: e };
};
D.isValidElement = Ko;
D.lazy = function(e) {
  return { $$typeof: lp, _payload: { _status: -1, _result: e }, _init: ap };
};
D.memo = function(e, t) {
  return { $$typeof: rp, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function(e) {
  var t = sl.transition;
  sl.transition = {};
  try {
    e();
  } finally {
    sl.transition = t;
  }
};
D.unstable_act = Gu;
D.useCallback = function(e, t) {
  return _e.current.useCallback(e, t);
};
D.useContext = function(e) {
  return _e.current.useContext(e);
};
D.useDebugValue = function() {
};
D.useDeferredValue = function(e) {
  return _e.current.useDeferredValue(e);
};
D.useEffect = function(e, t) {
  return _e.current.useEffect(e, t);
};
D.useId = function() {
  return _e.current.useId();
};
D.useImperativeHandle = function(e, t, n) {
  return _e.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function(e, t) {
  return _e.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function(e, t) {
  return _e.current.useLayoutEffect(e, t);
};
D.useMemo = function(e, t) {
  return _e.current.useMemo(e, t);
};
D.useReducer = function(e, t, n) {
  return _e.current.useReducer(e, t, n);
};
D.useRef = function(e) {
  return _e.current.useRef(e);
};
D.useState = function(e) {
  return _e.current.useState(e);
};
D.useSyncExternalStore = function(e, t, n) {
  return _e.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function() {
  return _e.current.useTransition();
};
D.version = "18.3.1";
Du.exports = D;
var L = Du.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cp = L, dp = Symbol.for("react.element"), fp = Symbol.for("react.fragment"), pp = Object.prototype.hasOwnProperty, hp = cp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, mp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Qu(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) pp.call(t, r) && !mp.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: dp, type: e, key: i, ref: o, props: l, _owner: hp.current };
}
Hl.Fragment = fp;
Hl.jsx = Qu;
Hl.jsxs = Qu;
Ru.exports = Hl;
var d = Ru.exports, Yu = { exports: {} }, Re = {}, Ku = { exports: {} }, Xu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t($, z) {
    var R = $.length;
    $.push(z);
    e: for (; 0 < R; ) {
      var U = R - 1 >>> 1, A = $[U];
      if (0 < l(A, z)) $[U] = z, $[R] = A, R = U;
      else break e;
    }
  }
  function n($) {
    return $.length === 0 ? null : $[0];
  }
  function r($) {
    if ($.length === 0) return null;
    var z = $[0], R = $.pop();
    if (R !== z) {
      $[0] = R;
      e: for (var U = 0, A = $.length, nt = A >>> 1; U < nt; ) {
        var je = 2 * (U + 1) - 1, Qe = $[je], he = je + 1, ct = $[he];
        if (0 > l(Qe, R)) he < A && 0 > l(ct, Qe) ? ($[U] = ct, $[he] = R, U = he) : ($[U] = Qe, $[je] = R, U = je);
        else if (he < A && 0 > l(ct, R)) $[U] = ct, $[he] = R, U = he;
        else break e;
      }
    }
    return z;
  }
  function l($, z) {
    var R = $.sortIndex - z.sortIndex;
    return R !== 0 ? R : $.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, s = o.now();
    e.unstable_now = function() {
      return o.now() - s;
    };
  }
  var a = [], u = [], c = 1, f = null, h = 3, g = !1, x = !1, k = !1, C = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v($) {
    for (var z = n(u); z !== null; ) {
      if (z.callback === null) r(u);
      else if (z.startTime <= $) r(u), z.sortIndex = z.expirationTime, t(a, z);
      else break;
      z = n(u);
    }
  }
  function w($) {
    if (k = !1, v($), !x) if (n(a) !== null) x = !0, oe(N);
    else {
      var z = n(u);
      z !== null && Fe(w, z.startTime - $);
    }
  }
  function N($, z) {
    x = !1, k && (k = !1, p(j), j = -1), g = !0;
    var R = h;
    try {
      for (v(z), f = n(a); f !== null && (!(f.expirationTime > z) || $ && !B()); ) {
        var U = f.callback;
        if (typeof U == "function") {
          f.callback = null, h = f.priorityLevel;
          var A = U(f.expirationTime <= z);
          z = e.unstable_now(), typeof A == "function" ? f.callback = A : f === n(a) && r(a), v(z);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var nt = !0;
      else {
        var je = n(u);
        je !== null && Fe(w, je.startTime - z), nt = !1;
      }
      return nt;
    } finally {
      f = null, h = R, g = !1;
    }
  }
  var _ = !1, y = null, j = -1, P = 5, S = -1;
  function B() {
    return !(e.unstable_now() - S < P);
  }
  function O() {
    if (y !== null) {
      var $ = e.unstable_now();
      S = $;
      var z = !0;
      try {
        z = y(!0, $);
      } finally {
        z ? I() : (_ = !1, y = null);
      }
    } else _ = !1;
  }
  var I;
  if (typeof m == "function") I = function() {
    m(O);
  };
  else if (typeof MessageChannel != "undefined") {
    var Q = new MessageChannel(), Se = Q.port2;
    Q.port1.onmessage = O, I = function() {
      Se.postMessage(null);
    };
  } else I = function() {
    C(O, 0);
  };
  function oe($) {
    y = $, _ || (_ = !0, I());
  }
  function Fe($, z) {
    j = C(function() {
      $(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function($) {
    $.callback = null;
  }, e.unstable_continueExecution = function() {
    x || g || (x = !0, oe(N));
  }, e.unstable_forceFrameRate = function($) {
    0 > $ || 125 < $ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < $ ? Math.floor(1e3 / $) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function($) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = h;
    }
    var R = h;
    h = z;
    try {
      return $();
    } finally {
      h = R;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function($, z) {
    switch ($) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        $ = 3;
    }
    var R = h;
    h = $;
    try {
      return z();
    } finally {
      h = R;
    }
  }, e.unstable_scheduleCallback = function($, z, R) {
    var U = e.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? U + R : U) : R = U, $) {
      case 1:
        var A = -1;
        break;
      case 2:
        A = 250;
        break;
      case 5:
        A = 1073741823;
        break;
      case 4:
        A = 1e4;
        break;
      default:
        A = 5e3;
    }
    return A = R + A, $ = { id: c++, callback: z, priorityLevel: $, startTime: R, expirationTime: A, sortIndex: -1 }, R > U ? ($.sortIndex = R, t(u, $), n(a) === null && $ === n(u) && (k ? (p(j), j = -1) : k = !0, Fe(w, R - U))) : ($.sortIndex = A, t(a, $), x || g || (x = !0, oe(N))), $;
  }, e.unstable_shouldYield = B, e.unstable_wrapCallback = function($) {
    var z = h;
    return function() {
      var R = h;
      h = z;
      try {
        return $.apply(this, arguments);
      } finally {
        h = R;
      }
    };
  };
})(Xu);
Ku.exports = Xu;
var gp = Ku.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vp = L, ze = gp;
function b(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var qu = /* @__PURE__ */ new Set(), pr = {};
function on(e, t) {
  On(e, t), On(e + "Capture", t);
}
function On(e, t) {
  for (pr[e] = t, e = 0; e < t.length; e++) qu.add(t[e]);
}
var yt = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), Ki = Object.prototype.hasOwnProperty, yp = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, qs = {}, Js = {};
function xp(e) {
  return Ki.call(Js, e) ? !0 : Ki.call(qs, e) ? !1 : yp.test(e) ? Js[e] = !0 : (qs[e] = !0, !1);
}
function wp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function kp(e, t, n, r) {
  if (t === null || typeof t == "undefined" || wp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function be(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var pe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  pe[e] = new be(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  pe[t] = new be(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  pe[e] = new be(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  pe[e] = new be(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  pe[e] = new be(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  pe[e] = new be(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  pe[e] = new be(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  pe[e] = new be(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  pe[e] = new be(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Xo = /[\-:]([a-z])/g;
function qo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Xo,
    qo
  );
  pe[t] = new be(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Xo, qo);
  pe[t] = new be(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Xo, qo);
  pe[t] = new be(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  pe[e] = new be(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
pe.xlinkHref = new be("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  pe[e] = new be(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Jo(e, t, n, r) {
  var l = pe.hasOwnProperty(t) ? pe[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (kp(t, n, l, r) && (n = null), r || l === null ? xp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Et = vp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Br = Symbol.for("react.element"), fn = Symbol.for("react.portal"), pn = Symbol.for("react.fragment"), Zo = Symbol.for("react.strict_mode"), Xi = Symbol.for("react.profiler"), Ju = Symbol.for("react.provider"), Zu = Symbol.for("react.context"), es = Symbol.for("react.forward_ref"), qi = Symbol.for("react.suspense"), Ji = Symbol.for("react.suspense_list"), ts = Symbol.for("react.memo"), St = Symbol.for("react.lazy"), ec = Symbol.for("react.offscreen"), Zs = Symbol.iterator;
function Wn(e) {
  return e === null || typeof e != "object" ? null : (e = Zs && e[Zs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Z = Object.assign, vi;
function Jn(e) {
  if (vi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    vi = t && t[1] || "";
  }
  return `
` + vi + e;
}
var yi = !1;
function xi(e, t) {
  if (!e || yi) return "";
  yi = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (u) {
        var r = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        r = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (var l = u.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s]; ) s--;
      for (; 1 <= o && 0 <= s; o--, s--) if (l[o] !== i[s]) {
        if (o !== 1 || s !== 1)
          do
            if (o--, s--, 0 > s || l[o] !== i[s]) {
              var a = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= o && 0 <= s);
        break;
      }
    }
  } finally {
    yi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Jn(e) : "";
}
function Ep(e) {
  switch (e.tag) {
    case 5:
      return Jn(e.type);
    case 16:
      return Jn("Lazy");
    case 13:
      return Jn("Suspense");
    case 19:
      return Jn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = xi(e.type, !1), e;
    case 11:
      return e = xi(e.type.render, !1), e;
    case 1:
      return e = xi(e.type, !0), e;
    default:
      return "";
  }
}
function Zi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case pn:
      return "Fragment";
    case fn:
      return "Portal";
    case Xi:
      return "Profiler";
    case Zo:
      return "StrictMode";
    case qi:
      return "Suspense";
    case Ji:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Zu:
      return (e.displayName || "Context") + ".Consumer";
    case Ju:
      return (e._context.displayName || "Context") + ".Provider";
    case es:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ts:
      return t = e.displayName || null, t !== null ? t : Zi(e.type) || "Memo";
    case St:
      t = e._payload, e = e._init;
      try {
        return Zi(e(t));
      } catch {
      }
  }
  return null;
}
function _p(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Zi(t);
    case 8:
      return t === Zo ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Ft(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function tc(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function bp(e) {
  var t = tc(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n != "undefined" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Wr(e) {
  e._valueTracker || (e._valueTracker = bp(e));
}
function nc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = tc(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function yl(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function eo(e, t) {
  var n = t.checked;
  return Z({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function ea(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Ft(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function rc(e, t) {
  t = t.checked, t != null && Jo(e, "checked", t, !1);
}
function to(e, t) {
  rc(e, t);
  var n = Ft(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? no(e, t.type, n) : t.hasOwnProperty("defaultValue") && no(e, t.type, Ft(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ta(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function no(e, t, n) {
  (t !== "number" || yl(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Zn = Array.isArray;
function bn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Ft(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ro(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(b(91));
  return Z({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function na(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(b(92));
      if (Zn(n)) {
        if (1 < n.length) throw Error(b(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Ft(n) };
}
function lc(e, t) {
  var n = Ft(t.value), r = Ft(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ra(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ic(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ic(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Hr, oc = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Hr = Hr || document.createElement("div"), Hr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Hr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function hr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var rr = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Sp = ["Webkit", "ms", "Moz", "O"];
Object.keys(rr).forEach(function(e) {
  Sp.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), rr[t] = rr[e];
  });
});
function sc(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || rr.hasOwnProperty(e) && rr[e] ? ("" + t).trim() : t + "px";
}
function ac(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = sc(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var jp = Z({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function io(e, t) {
  if (t) {
    if (jp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(b(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(b(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(b(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(b(62));
  }
}
function oo(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var so = null;
function ns(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ao = null, Sn = null, jn = null;
function la(e) {
  if (e = Tr(e)) {
    if (typeof ao != "function") throw Error(b(280));
    var t = e.stateNode;
    t && (t = Xl(t), ao(e.stateNode, e.type, t));
  }
}
function uc(e) {
  Sn ? jn ? jn.push(e) : jn = [e] : Sn = e;
}
function cc() {
  if (Sn) {
    var e = Sn, t = jn;
    if (jn = Sn = null, la(e), t) for (e = 0; e < t.length; e++) la(t[e]);
  }
}
function dc(e, t) {
  return e(t);
}
function fc() {
}
var wi = !1;
function pc(e, t, n) {
  if (wi) return e(t, n);
  wi = !0;
  try {
    return dc(e, t, n);
  } finally {
    wi = !1, (Sn !== null || jn !== null) && (fc(), cc());
  }
}
function mr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Xl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(b(231, t, typeof n));
  return n;
}
var uo = !1;
if (yt) try {
  var Hn = {};
  Object.defineProperty(Hn, "passive", { get: function() {
    uo = !0;
  } }), window.addEventListener("test", Hn, Hn), window.removeEventListener("test", Hn, Hn);
} catch {
  uo = !1;
}
function Np(e, t, n, r, l, i, o, s, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var lr = !1, xl = null, wl = !1, co = null, Cp = { onError: function(e) {
  lr = !0, xl = e;
} };
function Mp(e, t, n, r, l, i, o, s, a) {
  lr = !1, xl = null, Np.apply(Cp, arguments);
}
function Op(e, t, n, r, l, i, o, s, a) {
  if (Mp.apply(this, arguments), lr) {
    if (lr) {
      var u = xl;
      lr = !1, xl = null;
    } else throw Error(b(198));
    wl || (wl = !0, co = u);
  }
}
function sn(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function hc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ia(e) {
  if (sn(e) !== e) throw Error(b(188));
}
function $p(e) {
  var t = e.alternate;
  if (!t) {
    if (t = sn(e), t === null) throw Error(b(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return ia(l), e;
        if (i === r) return ia(l), t;
        i = i.sibling;
      }
      throw Error(b(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, s = l.child; s; ) {
        if (s === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (s === r) {
          o = !0, r = l, n = i;
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = i.child; s; ) {
          if (s === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (s === r) {
            o = !0, r = i, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(b(189));
      }
    }
    if (n.alternate !== r) throw Error(b(190));
  }
  if (n.tag !== 3) throw Error(b(188));
  return n.stateNode.current === n ? e : t;
}
function mc(e) {
  return e = $p(e), e !== null ? gc(e) : null;
}
function gc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = gc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var vc = ze.unstable_scheduleCallback, oa = ze.unstable_cancelCallback, Lp = ze.unstable_shouldYield, Tp = ze.unstable_requestPaint, te = ze.unstable_now, Ip = ze.unstable_getCurrentPriorityLevel, rs = ze.unstable_ImmediatePriority, yc = ze.unstable_UserBlockingPriority, kl = ze.unstable_NormalPriority, Pp = ze.unstable_LowPriority, xc = ze.unstable_IdlePriority, Gl = null, at = null;
function zp(e) {
  if (at && typeof at.onCommitFiberRoot == "function") try {
    at.onCommitFiberRoot(Gl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Je = Math.clz32 ? Math.clz32 : Fp, Rp = Math.log, Dp = Math.LN2;
function Fp(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Rp(e) / Dp | 0) | 0;
}
var Gr = 64, Qr = 4194304;
function er(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function El(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = er(s) : (i &= o, i !== 0 && (r = er(i)));
  } else o = n & ~l, o !== 0 ? r = er(o) : i !== 0 && (r = er(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Je(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Ap(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Up(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Je(i), s = 1 << o, a = l[o];
    a === -1 ? (!(s & n) || s & r) && (l[o] = Ap(s, t)) : a <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function fo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function wc() {
  var e = Gr;
  return Gr <<= 1, !(Gr & 4194240) && (Gr = 64), e;
}
function ki(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function $r(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Je(t), e[t] = n;
}
function Vp(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Je(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function ls(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Je(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var W = 0;
function kc(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ec, is, _c, bc, Sc, po = !1, Yr = [], $t = null, Lt = null, Tt = null, gr = /* @__PURE__ */ new Map(), vr = /* @__PURE__ */ new Map(), Nt = [], Bp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function sa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      $t = null;
      break;
    case "dragenter":
    case "dragleave":
      Lt = null;
      break;
    case "mouseover":
    case "mouseout":
      Tt = null;
      break;
    case "pointerover":
    case "pointerout":
      gr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      vr.delete(t.pointerId);
  }
}
function Gn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Tr(t), t !== null && is(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Wp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return $t = Gn($t, e, t, n, r, l), !0;
    case "dragenter":
      return Lt = Gn(Lt, e, t, n, r, l), !0;
    case "mouseover":
      return Tt = Gn(Tt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return gr.set(i, Gn(gr.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, vr.set(i, Gn(vr.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function jc(e) {
  var t = Kt(e.target);
  if (t !== null) {
    var n = sn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = hc(n), t !== null) {
          e.blockedOn = t, Sc(e.priority, function() {
            _c(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function al(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ho(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      so = r, n.target.dispatchEvent(r), so = null;
    } else return t = Tr(n), t !== null && is(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function aa(e, t, n) {
  al(e) && n.delete(t);
}
function Hp() {
  po = !1, $t !== null && al($t) && ($t = null), Lt !== null && al(Lt) && (Lt = null), Tt !== null && al(Tt) && (Tt = null), gr.forEach(aa), vr.forEach(aa);
}
function Qn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, po || (po = !0, ze.unstable_scheduleCallback(ze.unstable_NormalPriority, Hp)));
}
function yr(e) {
  function t(l) {
    return Qn(l, e);
  }
  if (0 < Yr.length) {
    Qn(Yr[0], e);
    for (var n = 1; n < Yr.length; n++) {
      var r = Yr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for ($t !== null && Qn($t, e), Lt !== null && Qn(Lt, e), Tt !== null && Qn(Tt, e), gr.forEach(t), vr.forEach(t), n = 0; n < Nt.length; n++) r = Nt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Nt.length && (n = Nt[0], n.blockedOn === null); ) jc(n), n.blockedOn === null && Nt.shift();
}
var Nn = Et.ReactCurrentBatchConfig, _l = !0;
function Gp(e, t, n, r) {
  var l = W, i = Nn.transition;
  Nn.transition = null;
  try {
    W = 1, os(e, t, n, r);
  } finally {
    W = l, Nn.transition = i;
  }
}
function Qp(e, t, n, r) {
  var l = W, i = Nn.transition;
  Nn.transition = null;
  try {
    W = 4, os(e, t, n, r);
  } finally {
    W = l, Nn.transition = i;
  }
}
function os(e, t, n, r) {
  if (_l) {
    var l = ho(e, t, n, r);
    if (l === null) $i(e, t, r, bl, n), sa(e, r);
    else if (Wp(l, e, t, n, r)) r.stopPropagation();
    else if (sa(e, r), t & 4 && -1 < Bp.indexOf(e)) {
      for (; l !== null; ) {
        var i = Tr(l);
        if (i !== null && Ec(i), i = ho(e, t, n, r), i === null && $i(e, t, r, bl, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else $i(e, t, r, null, n);
  }
}
var bl = null;
function ho(e, t, n, r) {
  if (bl = null, e = ns(r), e = Kt(e), e !== null) if (t = sn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = hc(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return bl = e, null;
}
function Nc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ip()) {
        case rs:
          return 1;
        case yc:
          return 4;
        case kl:
        case Pp:
          return 16;
        case xc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Mt = null, ss = null, ul = null;
function Cc() {
  if (ul) return ul;
  var e, t = ss, n = t.length, r, l = "value" in Mt ? Mt.value : Mt.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return ul = l.slice(e, 1 < r ? 1 - r : void 0);
}
function cl(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Kr() {
  return !0;
}
function ua() {
  return !1;
}
function De(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Kr : ua, this.isPropagationStopped = ua, this;
  }
  return Z(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Kr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Kr);
  }, persist: function() {
  }, isPersistent: Kr }), t;
}
var Dn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, as = De(Dn), Lr = Z({}, Dn, { view: 0, detail: 0 }), Yp = De(Lr), Ei, _i, Yn, Ql = Z({}, Lr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: us, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Yn && (Yn && e.type === "mousemove" ? (Ei = e.screenX - Yn.screenX, _i = e.screenY - Yn.screenY) : _i = Ei = 0, Yn = e), Ei);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : _i;
} }), ca = De(Ql), Kp = Z({}, Ql, { dataTransfer: 0 }), Xp = De(Kp), qp = Z({}, Lr, { relatedTarget: 0 }), bi = De(qp), Jp = Z({}, Dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Zp = De(Jp), eh = Z({}, Dn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), th = De(eh), nh = Z({}, Dn, { data: 0 }), da = De(nh), rh = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, lh = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, ih = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function oh(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ih[e]) ? !!t[e] : !1;
}
function us() {
  return oh;
}
var sh = Z({}, Lr, { key: function(e) {
  if (e.key) {
    var t = rh[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = cl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? lh[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: us, charCode: function(e) {
  return e.type === "keypress" ? cl(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? cl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), ah = De(sh), uh = Z({}, Ql, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), fa = De(uh), ch = Z({}, Lr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: us }), dh = De(ch), fh = Z({}, Dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ph = De(fh), hh = Z({}, Ql, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), mh = De(hh), gh = [9, 13, 27, 32], cs = yt && "CompositionEvent" in window, ir = null;
yt && "documentMode" in document && (ir = document.documentMode);
var vh = yt && "TextEvent" in window && !ir, Mc = yt && (!cs || ir && 8 < ir && 11 >= ir), pa = " ", ha = !1;
function Oc(e, t) {
  switch (e) {
    case "keyup":
      return gh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function $c(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var hn = !1;
function yh(e, t) {
  switch (e) {
    case "compositionend":
      return $c(t);
    case "keypress":
      return t.which !== 32 ? null : (ha = !0, pa);
    case "textInput":
      return e = t.data, e === pa && ha ? null : e;
    default:
      return null;
  }
}
function xh(e, t) {
  if (hn) return e === "compositionend" || !cs && Oc(e, t) ? (e = Cc(), ul = ss = Mt = null, hn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Mc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var wh = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ma(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!wh[e.type] : t === "textarea";
}
function Lc(e, t, n, r) {
  uc(r), t = Sl(t, "onChange"), 0 < t.length && (n = new as("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var or = null, xr = null;
function kh(e) {
  Bc(e, 0);
}
function Yl(e) {
  var t = vn(e);
  if (nc(t)) return e;
}
function Eh(e, t) {
  if (e === "change") return t;
}
var Tc = !1;
if (yt) {
  var Si;
  if (yt) {
    var ji = "oninput" in document;
    if (!ji) {
      var ga = document.createElement("div");
      ga.setAttribute("oninput", "return;"), ji = typeof ga.oninput == "function";
    }
    Si = ji;
  } else Si = !1;
  Tc = Si && (!document.documentMode || 9 < document.documentMode);
}
function va() {
  or && (or.detachEvent("onpropertychange", Ic), xr = or = null);
}
function Ic(e) {
  if (e.propertyName === "value" && Yl(xr)) {
    var t = [];
    Lc(t, xr, e, ns(e)), pc(kh, t);
  }
}
function _h(e, t, n) {
  e === "focusin" ? (va(), or = t, xr = n, or.attachEvent("onpropertychange", Ic)) : e === "focusout" && va();
}
function bh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Yl(xr);
}
function Sh(e, t) {
  if (e === "click") return Yl(t);
}
function jh(e, t) {
  if (e === "input" || e === "change") return Yl(t);
}
function Nh(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var et = typeof Object.is == "function" ? Object.is : Nh;
function wr(e, t) {
  if (et(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ki.call(t, l) || !et(e[l], t[l])) return !1;
  }
  return !0;
}
function ya(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function xa(e, t) {
  var n = ya(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ya(n);
  }
}
function Pc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function zc() {
  for (var e = window, t = yl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = yl(e.document);
  }
  return t;
}
function ds(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Ch(e) {
  var t = zc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Pc(n.ownerDocument.documentElement, n)) {
    if (r !== null && ds(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = xa(n, i);
        var o = xa(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Mh = yt && "documentMode" in document && 11 >= document.documentMode, mn = null, mo = null, sr = null, go = !1;
function wa(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  go || mn == null || mn !== yl(r) || (r = mn, "selectionStart" in r && ds(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), sr && wr(sr, r) || (sr = r, r = Sl(mo, "onSelect"), 0 < r.length && (t = new as("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = mn)));
}
function Xr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var gn = { animationend: Xr("Animation", "AnimationEnd"), animationiteration: Xr("Animation", "AnimationIteration"), animationstart: Xr("Animation", "AnimationStart"), transitionend: Xr("Transition", "TransitionEnd") }, Ni = {}, Rc = {};
yt && (Rc = document.createElement("div").style, "AnimationEvent" in window || (delete gn.animationend.animation, delete gn.animationiteration.animation, delete gn.animationstart.animation), "TransitionEvent" in window || delete gn.transitionend.transition);
function Kl(e) {
  if (Ni[e]) return Ni[e];
  if (!gn[e]) return e;
  var t = gn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Rc) return Ni[e] = t[n];
  return e;
}
var Dc = Kl("animationend"), Fc = Kl("animationiteration"), Ac = Kl("animationstart"), Uc = Kl("transitionend"), Vc = /* @__PURE__ */ new Map(), ka = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ut(e, t) {
  Vc.set(e, t), on(t, [e]);
}
for (var Ci = 0; Ci < ka.length; Ci++) {
  var Mi = ka[Ci], Oh = Mi.toLowerCase(), $h = Mi[0].toUpperCase() + Mi.slice(1);
  Ut(Oh, "on" + $h);
}
Ut(Dc, "onAnimationEnd");
Ut(Fc, "onAnimationIteration");
Ut(Ac, "onAnimationStart");
Ut("dblclick", "onDoubleClick");
Ut("focusin", "onFocus");
Ut("focusout", "onBlur");
Ut(Uc, "onTransitionEnd");
On("onMouseEnter", ["mouseout", "mouseover"]);
On("onMouseLeave", ["mouseout", "mouseover"]);
On("onPointerEnter", ["pointerout", "pointerover"]);
On("onPointerLeave", ["pointerout", "pointerover"]);
on("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
on("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
on("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
on("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
on("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
on("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var tr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lh = new Set("cancel close invalid load scroll toggle".split(" ").concat(tr));
function Ea(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Op(r, t, void 0, e), e.currentTarget = null;
}
function Bc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var s = r[o], a = s.instance, u = s.currentTarget;
        if (s = s.listener, a !== i && l.isPropagationStopped()) break e;
        Ea(l, s, u), i = a;
      }
      else for (o = 0; o < r.length; o++) {
        if (s = r[o], a = s.instance, u = s.currentTarget, s = s.listener, a !== i && l.isPropagationStopped()) break e;
        Ea(l, s, u), i = a;
      }
    }
  }
  if (wl) throw e = co, wl = !1, co = null, e;
}
function Y(e, t) {
  var n = t[ko];
  n === void 0 && (n = t[ko] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Wc(t, e, 2, !1), n.add(r));
}
function Oi(e, t, n) {
  var r = 0;
  t && (r |= 4), Wc(n, e, r, t);
}
var qr = "_reactListening" + Math.random().toString(36).slice(2);
function kr(e) {
  if (!e[qr]) {
    e[qr] = !0, qu.forEach(function(n) {
      n !== "selectionchange" && (Lh.has(n) || Oi(n, !1, e), Oi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[qr] || (t[qr] = !0, Oi("selectionchange", !1, t));
  }
}
function Wc(e, t, n, r) {
  switch (Nc(t)) {
    case 1:
      var l = Gp;
      break;
    case 4:
      l = Qp;
      break;
    default:
      l = os;
  }
  n = l.bind(null, t, n, e), l = void 0, !uo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function $i(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var a = o.tag;
        if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l)) return;
        o = o.return;
      }
      for (; s !== null; ) {
        if (o = Kt(s), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          r = i = o;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  pc(function() {
    var u = i, c = ns(n), f = [];
    e: {
      var h = Vc.get(e);
      if (h !== void 0) {
        var g = as, x = e;
        switch (e) {
          case "keypress":
            if (cl(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = ah;
            break;
          case "focusin":
            x = "focus", g = bi;
            break;
          case "focusout":
            x = "blur", g = bi;
            break;
          case "beforeblur":
          case "afterblur":
            g = bi;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = ca;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Xp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = dh;
            break;
          case Dc:
          case Fc:
          case Ac:
            g = Zp;
            break;
          case Uc:
            g = ph;
            break;
          case "scroll":
            g = Yp;
            break;
          case "wheel":
            g = mh;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = th;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = fa;
        }
        var k = (t & 4) !== 0, C = !k && e === "scroll", p = k ? h !== null ? h + "Capture" : null : h;
        k = [];
        for (var m = u, v; m !== null; ) {
          v = m;
          var w = v.stateNode;
          if (v.tag === 5 && w !== null && (v = w, p !== null && (w = mr(m, p), w != null && k.push(Er(m, w, v)))), C) break;
          m = m.return;
        }
        0 < k.length && (h = new g(h, x, null, n, c), f.push({ event: h, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", h && n !== so && (x = n.relatedTarget || n.fromElement) && (Kt(x) || x[xt])) break e;
        if ((g || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (x = n.relatedTarget || n.toElement, g = u, x = x ? Kt(x) : null, x !== null && (C = sn(x), x !== C || x.tag !== 5 && x.tag !== 6) && (x = null)) : (g = null, x = u), g !== x)) {
          if (k = ca, w = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (k = fa, w = "onPointerLeave", p = "onPointerEnter", m = "pointer"), C = g == null ? h : vn(g), v = x == null ? h : vn(x), h = new k(w, m + "leave", g, n, c), h.target = C, h.relatedTarget = v, w = null, Kt(c) === u && (k = new k(p, m + "enter", x, n, c), k.target = v, k.relatedTarget = C, w = k), C = w, g && x) t: {
            for (k = g, p = x, m = 0, v = k; v; v = dn(v)) m++;
            for (v = 0, w = p; w; w = dn(w)) v++;
            for (; 0 < m - v; ) k = dn(k), m--;
            for (; 0 < v - m; ) p = dn(p), v--;
            for (; m--; ) {
              if (k === p || p !== null && k === p.alternate) break t;
              k = dn(k), p = dn(p);
            }
            k = null;
          }
          else k = null;
          g !== null && _a(f, h, g, k, !1), x !== null && C !== null && _a(f, C, x, k, !0);
        }
      }
      e: {
        if (h = u ? vn(u) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file") var N = Eh;
        else if (ma(h)) if (Tc) N = jh;
        else {
          N = bh;
          var _ = _h;
        }
        else (g = h.nodeName) && g.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (N = Sh);
        if (N && (N = N(e, u))) {
          Lc(f, N, n, c);
          break e;
        }
        _ && _(e, h, u), e === "focusout" && (_ = h._wrapperState) && _.controlled && h.type === "number" && no(h, "number", h.value);
      }
      switch (_ = u ? vn(u) : window, e) {
        case "focusin":
          (ma(_) || _.contentEditable === "true") && (mn = _, mo = u, sr = null);
          break;
        case "focusout":
          sr = mo = mn = null;
          break;
        case "mousedown":
          go = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          go = !1, wa(f, n, c);
          break;
        case "selectionchange":
          if (Mh) break;
        case "keydown":
        case "keyup":
          wa(f, n, c);
      }
      var y;
      if (cs) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e;
        }
        j = void 0;
      }
      else hn ? Oc(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (Mc && n.locale !== "ko" && (hn || j !== "onCompositionStart" ? j === "onCompositionEnd" && hn && (y = Cc()) : (Mt = c, ss = "value" in Mt ? Mt.value : Mt.textContent, hn = !0)), _ = Sl(u, j), 0 < _.length && (j = new da(j, e, null, n, c), f.push({ event: j, listeners: _ }), y ? j.data = y : (y = $c(n), y !== null && (j.data = y)))), (y = vh ? yh(e, n) : xh(e, n)) && (u = Sl(u, "onBeforeInput"), 0 < u.length && (c = new da("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = y));
    }
    Bc(f, t);
  });
}
function Er(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Sl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = mr(e, n), i != null && r.unshift(Er(e, i, l)), i = mr(e, t), i != null && r.push(Er(e, i, l))), e = e.return;
  }
  return r;
}
function dn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function _a(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, a = s.alternate, u = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 && u !== null && (s = u, l ? (a = mr(n, i), a != null && o.unshift(Er(n, a, s))) : l || (a = mr(n, i), a != null && o.push(Er(n, a, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Th = /\r\n?/g, Ih = /\u0000|\uFFFD/g;
function ba(e) {
  return (typeof e == "string" ? e : "" + e).replace(Th, `
`).replace(Ih, "");
}
function Jr(e, t, n) {
  if (t = ba(t), ba(e) !== t && n) throw Error(b(425));
}
function jl() {
}
var vo = null, yo = null;
function xo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var wo = typeof setTimeout == "function" ? setTimeout : void 0, Ph = typeof clearTimeout == "function" ? clearTimeout : void 0, Sa = typeof Promise == "function" ? Promise : void 0, zh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sa != "undefined" ? function(e) {
  return Sa.resolve(null).then(e).catch(Rh);
} : wo;
function Rh(e) {
  setTimeout(function() {
    throw e;
  });
}
function Li(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), yr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  yr(t);
}
function It(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ja(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Fn = Math.random().toString(36).slice(2), ot = "__reactFiber$" + Fn, _r = "__reactProps$" + Fn, xt = "__reactContainer$" + Fn, ko = "__reactEvents$" + Fn, Dh = "__reactListeners$" + Fn, Fh = "__reactHandles$" + Fn;
function Kt(e) {
  var t = e[ot];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[xt] || n[ot]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ja(e); e !== null; ) {
        if (n = e[ot]) return n;
        e = ja(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Tr(e) {
  return e = e[ot] || e[xt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function vn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(b(33));
}
function Xl(e) {
  return e[_r] || null;
}
var Eo = [], yn = -1;
function Vt(e) {
  return { current: e };
}
function K(e) {
  0 > yn || (e.current = Eo[yn], Eo[yn] = null, yn--);
}
function G(e, t) {
  yn++, Eo[yn] = e.current, e.current = t;
}
var At = {}, we = Vt(At), Me = Vt(!1), en = At;
function $n(e, t) {
  var n = e.type.contextTypes;
  if (!n) return At;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Oe(e) {
  return e = e.childContextTypes, e != null;
}
function Nl() {
  K(Me), K(we);
}
function Na(e, t, n) {
  if (we.current !== At) throw Error(b(168));
  G(we, t), G(Me, n);
}
function Hc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(b(108, _p(e) || "Unknown", l));
  return Z({}, n, r);
}
function Cl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || At, en = we.current, G(we, e), G(Me, Me.current), !0;
}
function Ca(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(b(169));
  n ? (e = Hc(e, t, en), r.__reactInternalMemoizedMergedChildContext = e, K(Me), K(we), G(we, e)) : K(Me), G(Me, n);
}
var pt = null, ql = !1, Ti = !1;
function Gc(e) {
  pt === null ? pt = [e] : pt.push(e);
}
function Ah(e) {
  ql = !0, Gc(e);
}
function Bt() {
  if (!Ti && pt !== null) {
    Ti = !0;
    var e = 0, t = W;
    try {
      var n = pt;
      for (W = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      pt = null, ql = !1;
    } catch (l) {
      throw pt !== null && (pt = pt.slice(e + 1)), vc(rs, Bt), l;
    } finally {
      W = t, Ti = !1;
    }
  }
  return null;
}
var xn = [], wn = 0, Ml = null, Ol = 0, Ae = [], Ue = 0, tn = null, mt = 1, gt = "";
function Gt(e, t) {
  xn[wn++] = Ol, xn[wn++] = Ml, Ml = e, Ol = t;
}
function Qc(e, t, n) {
  Ae[Ue++] = mt, Ae[Ue++] = gt, Ae[Ue++] = tn, tn = e;
  var r = mt;
  e = gt;
  var l = 32 - Je(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Je(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, mt = 1 << 32 - Je(t) + l | n << l | r, gt = i + e;
  } else mt = 1 << i | n << l | r, gt = e;
}
function fs(e) {
  e.return !== null && (Gt(e, 1), Qc(e, 1, 0));
}
function ps(e) {
  for (; e === Ml; ) Ml = xn[--wn], xn[wn] = null, Ol = xn[--wn], xn[wn] = null;
  for (; e === tn; ) tn = Ae[--Ue], Ae[Ue] = null, gt = Ae[--Ue], Ae[Ue] = null, mt = Ae[--Ue], Ae[Ue] = null;
}
var Pe = null, Ie = null, X = !1, qe = null;
function Yc(e, t) {
  var n = Ve(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ma(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Pe = e, Ie = It(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Pe = e, Ie = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = tn !== null ? { id: mt, overflow: gt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ve(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Pe = e, Ie = null, !0) : !1;
    default:
      return !1;
  }
}
function _o(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function bo(e) {
  if (X) {
    var t = Ie;
    if (t) {
      var n = t;
      if (!Ma(e, t)) {
        if (_o(e)) throw Error(b(418));
        t = It(n.nextSibling);
        var r = Pe;
        t && Ma(e, t) ? Yc(r, n) : (e.flags = e.flags & -4097 | 2, X = !1, Pe = e);
      }
    } else {
      if (_o(e)) throw Error(b(418));
      e.flags = e.flags & -4097 | 2, X = !1, Pe = e;
    }
  }
}
function Oa(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Pe = e;
}
function Zr(e) {
  if (e !== Pe) return !1;
  if (!X) return Oa(e), X = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !xo(e.type, e.memoizedProps)), t && (t = Ie)) {
    if (_o(e)) throw Kc(), Error(b(418));
    for (; t; ) Yc(e, t), t = It(t.nextSibling);
  }
  if (Oa(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(b(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ie = It(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ie = null;
    }
  } else Ie = Pe ? It(e.stateNode.nextSibling) : null;
  return !0;
}
function Kc() {
  for (var e = Ie; e; ) e = It(e.nextSibling);
}
function Ln() {
  Ie = Pe = null, X = !1;
}
function hs(e) {
  qe === null ? qe = [e] : qe.push(e);
}
var Uh = Et.ReactCurrentBatchConfig;
function Kn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(b(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(b(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(b(284));
    if (!n._owner) throw Error(b(290, e));
  }
  return e;
}
function el(e, t) {
  throw e = Object.prototype.toString.call(t), Error(b(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function $a(e) {
  var t = e._init;
  return t(e._payload);
}
function Xc(e) {
  function t(p, m) {
    if (e) {
      var v = p.deletions;
      v === null ? (p.deletions = [m], p.flags |= 16) : v.push(m);
    }
  }
  function n(p, m) {
    if (!e) return null;
    for (; m !== null; ) t(p, m), m = m.sibling;
    return null;
  }
  function r(p, m) {
    for (p = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? p.set(m.key, m) : p.set(m.index, m), m = m.sibling;
    return p;
  }
  function l(p, m) {
    return p = Dt(p, m), p.index = 0, p.sibling = null, p;
  }
  function i(p, m, v) {
    return p.index = v, e ? (v = p.alternate, v !== null ? (v = v.index, v < m ? (p.flags |= 2, m) : v) : (p.flags |= 2, m)) : (p.flags |= 1048576, m);
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function s(p, m, v, w) {
    return m === null || m.tag !== 6 ? (m = Ai(v, p.mode, w), m.return = p, m) : (m = l(m, v), m.return = p, m);
  }
  function a(p, m, v, w) {
    var N = v.type;
    return N === pn ? c(p, m, v.props.children, w, v.key) : m !== null && (m.elementType === N || typeof N == "object" && N !== null && N.$$typeof === St && $a(N) === m.type) ? (w = l(m, v.props), w.ref = Kn(p, m, v), w.return = p, w) : (w = vl(v.type, v.key, v.props, null, p.mode, w), w.ref = Kn(p, m, v), w.return = p, w);
  }
  function u(p, m, v, w) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== v.containerInfo || m.stateNode.implementation !== v.implementation ? (m = Ui(v, p.mode, w), m.return = p, m) : (m = l(m, v.children || []), m.return = p, m);
  }
  function c(p, m, v, w, N) {
    return m === null || m.tag !== 7 ? (m = Zt(v, p.mode, w, N), m.return = p, m) : (m = l(m, v), m.return = p, m);
  }
  function f(p, m, v) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = Ai("" + m, p.mode, v), m.return = p, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Br:
          return v = vl(m.type, m.key, m.props, null, p.mode, v), v.ref = Kn(p, null, m), v.return = p, v;
        case fn:
          return m = Ui(m, p.mode, v), m.return = p, m;
        case St:
          var w = m._init;
          return f(p, w(m._payload), v);
      }
      if (Zn(m) || Wn(m)) return m = Zt(m, p.mode, v, null), m.return = p, m;
      el(p, m);
    }
    return null;
  }
  function h(p, m, v, w) {
    var N = m !== null ? m.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number") return N !== null ? null : s(p, m, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Br:
          return v.key === N ? a(p, m, v, w) : null;
        case fn:
          return v.key === N ? u(p, m, v, w) : null;
        case St:
          return N = v._init, h(
            p,
            m,
            N(v._payload),
            w
          );
      }
      if (Zn(v) || Wn(v)) return N !== null ? null : c(p, m, v, w, null);
      el(p, v);
    }
    return null;
  }
  function g(p, m, v, w, N) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return p = p.get(v) || null, s(m, p, "" + w, N);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Br:
          return p = p.get(w.key === null ? v : w.key) || null, a(m, p, w, N);
        case fn:
          return p = p.get(w.key === null ? v : w.key) || null, u(m, p, w, N);
        case St:
          var _ = w._init;
          return g(p, m, v, _(w._payload), N);
      }
      if (Zn(w) || Wn(w)) return p = p.get(v) || null, c(m, p, w, N, null);
      el(m, w);
    }
    return null;
  }
  function x(p, m, v, w) {
    for (var N = null, _ = null, y = m, j = m = 0, P = null; y !== null && j < v.length; j++) {
      y.index > j ? (P = y, y = null) : P = y.sibling;
      var S = h(p, y, v[j], w);
      if (S === null) {
        y === null && (y = P);
        break;
      }
      e && y && S.alternate === null && t(p, y), m = i(S, m, j), _ === null ? N = S : _.sibling = S, _ = S, y = P;
    }
    if (j === v.length) return n(p, y), X && Gt(p, j), N;
    if (y === null) {
      for (; j < v.length; j++) y = f(p, v[j], w), y !== null && (m = i(y, m, j), _ === null ? N = y : _.sibling = y, _ = y);
      return X && Gt(p, j), N;
    }
    for (y = r(p, y); j < v.length; j++) P = g(y, p, j, v[j], w), P !== null && (e && P.alternate !== null && y.delete(P.key === null ? j : P.key), m = i(P, m, j), _ === null ? N = P : _.sibling = P, _ = P);
    return e && y.forEach(function(B) {
      return t(p, B);
    }), X && Gt(p, j), N;
  }
  function k(p, m, v, w) {
    var N = Wn(v);
    if (typeof N != "function") throw Error(b(150));
    if (v = N.call(v), v == null) throw Error(b(151));
    for (var _ = N = null, y = m, j = m = 0, P = null, S = v.next(); y !== null && !S.done; j++, S = v.next()) {
      y.index > j ? (P = y, y = null) : P = y.sibling;
      var B = h(p, y, S.value, w);
      if (B === null) {
        y === null && (y = P);
        break;
      }
      e && y && B.alternate === null && t(p, y), m = i(B, m, j), _ === null ? N = B : _.sibling = B, _ = B, y = P;
    }
    if (S.done) return n(
      p,
      y
    ), X && Gt(p, j), N;
    if (y === null) {
      for (; !S.done; j++, S = v.next()) S = f(p, S.value, w), S !== null && (m = i(S, m, j), _ === null ? N = S : _.sibling = S, _ = S);
      return X && Gt(p, j), N;
    }
    for (y = r(p, y); !S.done; j++, S = v.next()) S = g(y, p, j, S.value, w), S !== null && (e && S.alternate !== null && y.delete(S.key === null ? j : S.key), m = i(S, m, j), _ === null ? N = S : _.sibling = S, _ = S);
    return e && y.forEach(function(O) {
      return t(p, O);
    }), X && Gt(p, j), N;
  }
  function C(p, m, v, w) {
    if (typeof v == "object" && v !== null && v.type === pn && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Br:
          e: {
            for (var N = v.key, _ = m; _ !== null; ) {
              if (_.key === N) {
                if (N = v.type, N === pn) {
                  if (_.tag === 7) {
                    n(p, _.sibling), m = l(_, v.props.children), m.return = p, p = m;
                    break e;
                  }
                } else if (_.elementType === N || typeof N == "object" && N !== null && N.$$typeof === St && $a(N) === _.type) {
                  n(p, _.sibling), m = l(_, v.props), m.ref = Kn(p, _, v), m.return = p, p = m;
                  break e;
                }
                n(p, _);
                break;
              } else t(p, _);
              _ = _.sibling;
            }
            v.type === pn ? (m = Zt(v.props.children, p.mode, w, v.key), m.return = p, p = m) : (w = vl(v.type, v.key, v.props, null, p.mode, w), w.ref = Kn(p, m, v), w.return = p, p = w);
          }
          return o(p);
        case fn:
          e: {
            for (_ = v.key; m !== null; ) {
              if (m.key === _) if (m.tag === 4 && m.stateNode.containerInfo === v.containerInfo && m.stateNode.implementation === v.implementation) {
                n(p, m.sibling), m = l(m, v.children || []), m.return = p, p = m;
                break e;
              } else {
                n(p, m);
                break;
              }
              else t(p, m);
              m = m.sibling;
            }
            m = Ui(v, p.mode, w), m.return = p, p = m;
          }
          return o(p);
        case St:
          return _ = v._init, C(p, m, _(v._payload), w);
      }
      if (Zn(v)) return x(p, m, v, w);
      if (Wn(v)) return k(p, m, v, w);
      el(p, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, m !== null && m.tag === 6 ? (n(p, m.sibling), m = l(m, v), m.return = p, p = m) : (n(p, m), m = Ai(v, p.mode, w), m.return = p, p = m), o(p)) : n(p, m);
  }
  return C;
}
var Tn = Xc(!0), qc = Xc(!1), $l = Vt(null), Ll = null, kn = null, ms = null;
function gs() {
  ms = kn = Ll = null;
}
function vs(e) {
  var t = $l.current;
  K($l), e._currentValue = t;
}
function So(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Cn(e, t) {
  Ll = e, ms = kn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ce = !0), e.firstContext = null);
}
function We(e) {
  var t = e._currentValue;
  if (ms !== e) if (e = { context: e, memoizedValue: t, next: null }, kn === null) {
    if (Ll === null) throw Error(b(308));
    kn = e, Ll.dependencies = { lanes: 0, firstContext: e };
  } else kn = kn.next = e;
  return t;
}
var Xt = null;
function ys(e) {
  Xt === null ? Xt = [e] : Xt.push(e);
}
function Jc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ys(t)) : (n.next = l.next, l.next = n), t.interleaved = n, wt(e, r);
}
function wt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var jt = !1;
function xs(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Zc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function vt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Pt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, V & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, wt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, ys(r)) : (t.next = l.next, l.next = t), r.interleaved = t, wt(e, n);
}
function dl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ls(e, n);
  }
}
function La(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Tl(e, t, n, r) {
  var l = e.updateQueue;
  jt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s, u = a.next;
    a.next = null, o === null ? i = u : o.next = u, o = a;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, s = c.lastBaseUpdate, s !== o && (s === null ? c.firstBaseUpdate = u : s.next = u, c.lastBaseUpdate = a));
  }
  if (i !== null) {
    var f = l.baseState;
    o = 0, c = u = a = null, s = i;
    do {
      var h = s.lane, g = s.eventTime;
      if ((r & h) === h) {
        c !== null && (c = c.next = {
          eventTime: g,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var x = e, k = s;
          switch (h = t, g = n, k.tag) {
            case 1:
              if (x = k.payload, typeof x == "function") {
                f = x.call(g, f, h);
                break e;
              }
              f = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = k.payload, h = typeof x == "function" ? x.call(g, f, h) : x, h == null) break e;
              f = Z({}, f, h);
              break e;
            case 2:
              jt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else g = { eventTime: g, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, c === null ? (u = c = g, a = f) : c = c.next = g, o |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (c === null && (a = f), l.baseState = a, l.firstBaseUpdate = u, l.lastBaseUpdate = c, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    rn |= o, e.lanes = o, e.memoizedState = f;
  }
}
function Ta(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(b(191, l));
      l.call(r);
    }
  }
}
var Ir = {}, ut = Vt(Ir), br = Vt(Ir), Sr = Vt(Ir);
function qt(e) {
  if (e === Ir) throw Error(b(174));
  return e;
}
function ws(e, t) {
  switch (G(Sr, t), G(br, e), G(ut, Ir), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : lo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = lo(t, e);
  }
  K(ut), G(ut, t);
}
function In() {
  K(ut), K(br), K(Sr);
}
function ed(e) {
  qt(Sr.current);
  var t = qt(ut.current), n = lo(t, e.type);
  t !== n && (G(br, e), G(ut, n));
}
function ks(e) {
  br.current === e && (K(ut), K(br));
}
var q = Vt(0);
function Il(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Ii = [];
function Es() {
  for (var e = 0; e < Ii.length; e++) Ii[e]._workInProgressVersionPrimary = null;
  Ii.length = 0;
}
var fl = Et.ReactCurrentDispatcher, Pi = Et.ReactCurrentBatchConfig, nn = 0, J = null, se = null, ue = null, Pl = !1, ar = !1, jr = 0, Vh = 0;
function ve() {
  throw Error(b(321));
}
function _s(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!et(e[n], t[n])) return !1;
  return !0;
}
function bs(e, t, n, r, l, i) {
  if (nn = i, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, fl.current = e === null || e.memoizedState === null ? Gh : Qh, e = n(r, l), ar) {
    i = 0;
    do {
      if (ar = !1, jr = 0, 25 <= i) throw Error(b(301));
      i += 1, ue = se = null, t.updateQueue = null, fl.current = Yh, e = n(r, l);
    } while (ar);
  }
  if (fl.current = zl, t = se !== null && se.next !== null, nn = 0, ue = se = J = null, Pl = !1, t) throw Error(b(300));
  return e;
}
function Ss() {
  var e = jr !== 0;
  return jr = 0, e;
}
function it() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ue === null ? J.memoizedState = ue = e : ue = ue.next = e, ue;
}
function He() {
  if (se === null) {
    var e = J.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = se.next;
  var t = ue === null ? J.memoizedState : ue.next;
  if (t !== null) ue = t, se = e;
  else {
    if (e === null) throw Error(b(310));
    se = e, e = { memoizedState: se.memoizedState, baseState: se.baseState, baseQueue: se.baseQueue, queue: se.queue, next: null }, ue === null ? J.memoizedState = ue = e : ue = ue.next = e;
  }
  return ue;
}
function Nr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function zi(e) {
  var t = He(), n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = se, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var s = o = null, a = null, u = i;
    do {
      var c = u.lane;
      if ((nn & c) === c) a !== null && (a = a.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        a === null ? (s = a = f, o = r) : a = a.next = f, J.lanes |= c, rn |= c;
      }
      u = u.next;
    } while (u !== null && u !== i);
    a === null ? o = r : a.next = s, et(r, t.memoizedState) || (Ce = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, J.lanes |= i, rn |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ri(e) {
  var t = He(), n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    et(i, t.memoizedState) || (Ce = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function td() {
}
function nd(e, t) {
  var n = J, r = He(), l = t(), i = !et(r.memoizedState, l);
  if (i && (r.memoizedState = l, Ce = !0), r = r.queue, js(id.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ue !== null && ue.memoizedState.tag & 1) {
    if (n.flags |= 2048, Cr(9, ld.bind(null, n, r, l, t), void 0, null), ce === null) throw Error(b(349));
    nn & 30 || rd(n, t, l);
  }
  return l;
}
function rd(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = J.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, J.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function ld(e, t, n, r) {
  t.value = n, t.getSnapshot = r, od(t) && sd(e);
}
function id(e, t, n) {
  return n(function() {
    od(t) && sd(e);
  });
}
function od(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !et(e, n);
  } catch {
    return !0;
  }
}
function sd(e) {
  var t = wt(e, 1);
  t !== null && Ze(t, e, 1, -1);
}
function Ia(e) {
  var t = it();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Nr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Hh.bind(null, J, e), [t.memoizedState, e];
}
function Cr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = J.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, J.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function ad() {
  return He().memoizedState;
}
function pl(e, t, n, r) {
  var l = it();
  J.flags |= e, l.memoizedState = Cr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Jl(e, t, n, r) {
  var l = He();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (se !== null) {
    var o = se.memoizedState;
    if (i = o.destroy, r !== null && _s(r, o.deps)) {
      l.memoizedState = Cr(t, n, i, r);
      return;
    }
  }
  J.flags |= e, l.memoizedState = Cr(1 | t, n, i, r);
}
function Pa(e, t) {
  return pl(8390656, 8, e, t);
}
function js(e, t) {
  return Jl(2048, 8, e, t);
}
function ud(e, t) {
  return Jl(4, 2, e, t);
}
function cd(e, t) {
  return Jl(4, 4, e, t);
}
function dd(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function fd(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Jl(4, 4, dd.bind(null, t, e), n);
}
function Ns() {
}
function pd(e, t) {
  var n = He();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _s(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function hd(e, t) {
  var n = He();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _s(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function md(e, t, n) {
  return nn & 21 ? (et(n, t) || (n = wc(), J.lanes |= n, rn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ce = !0), e.memoizedState = n);
}
function Bh(e, t) {
  var n = W;
  W = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Pi.transition;
  Pi.transition = {};
  try {
    e(!1), t();
  } finally {
    W = n, Pi.transition = r;
  }
}
function gd() {
  return He().memoizedState;
}
function Wh(e, t, n) {
  var r = Rt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, vd(e)) yd(t, n);
  else if (n = Jc(e, t, n, r), n !== null) {
    var l = Ee();
    Ze(n, e, r, l), xd(n, t, r);
  }
}
function Hh(e, t, n) {
  var r = Rt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (vd(e)) yd(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, et(s, o)) {
        var a = t.interleaved;
        a === null ? (l.next = l, ys(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Jc(e, t, l, r), n !== null && (l = Ee(), Ze(n, e, r, l), xd(n, t, r));
  }
}
function vd(e) {
  var t = e.alternate;
  return e === J || t !== null && t === J;
}
function yd(e, t) {
  ar = Pl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function xd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ls(e, n);
  }
}
var zl = { readContext: We, useCallback: ve, useContext: ve, useEffect: ve, useImperativeHandle: ve, useInsertionEffect: ve, useLayoutEffect: ve, useMemo: ve, useReducer: ve, useRef: ve, useState: ve, useDebugValue: ve, useDeferredValue: ve, useTransition: ve, useMutableSource: ve, useSyncExternalStore: ve, useId: ve, unstable_isNewReconciler: !1 }, Gh = { readContext: We, useCallback: function(e, t) {
  return it().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: We, useEffect: Pa, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, pl(
    4194308,
    4,
    dd.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return pl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return pl(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = it();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = it();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Wh.bind(null, J, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = it();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ia, useDebugValue: Ns, useDeferredValue: function(e) {
  return it().memoizedState = e;
}, useTransition: function() {
  var e = Ia(!1), t = e[0];
  return e = Bh.bind(null, e[1]), it().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = J, l = it();
  if (X) {
    if (n === void 0) throw Error(b(407));
    n = n();
  } else {
    if (n = t(), ce === null) throw Error(b(349));
    nn & 30 || rd(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Pa(id.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Cr(9, ld.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = it(), t = ce.identifierPrefix;
  if (X) {
    var n = gt, r = mt;
    n = (r & ~(1 << 32 - Je(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = jr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Vh++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Qh = {
  readContext: We,
  useCallback: pd,
  useContext: We,
  useEffect: js,
  useImperativeHandle: fd,
  useInsertionEffect: ud,
  useLayoutEffect: cd,
  useMemo: hd,
  useReducer: zi,
  useRef: ad,
  useState: function() {
    return zi(Nr);
  },
  useDebugValue: Ns,
  useDeferredValue: function(e) {
    var t = He();
    return md(t, se.memoizedState, e);
  },
  useTransition: function() {
    var e = zi(Nr)[0], t = He().memoizedState;
    return [e, t];
  },
  useMutableSource: td,
  useSyncExternalStore: nd,
  useId: gd,
  unstable_isNewReconciler: !1
}, Yh = { readContext: We, useCallback: pd, useContext: We, useEffect: js, useImperativeHandle: fd, useInsertionEffect: ud, useLayoutEffect: cd, useMemo: hd, useReducer: Ri, useRef: ad, useState: function() {
  return Ri(Nr);
}, useDebugValue: Ns, useDeferredValue: function(e) {
  var t = He();
  return se === null ? t.memoizedState = e : md(t, se.memoizedState, e);
}, useTransition: function() {
  var e = Ri(Nr)[0], t = He().memoizedState;
  return [e, t];
}, useMutableSource: td, useSyncExternalStore: nd, useId: gd, unstable_isNewReconciler: !1 };
function Ke(e, t) {
  if (e && e.defaultProps) {
    t = Z({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function jo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Z({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Zl = { isMounted: function(e) {
  return (e = e._reactInternals) ? sn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Ee(), l = Rt(e), i = vt(r, l);
  i.payload = t, n != null && (i.callback = n), t = Pt(e, i, l), t !== null && (Ze(t, e, l, r), dl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Ee(), l = Rt(e), i = vt(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Pt(e, i, l), t !== null && (Ze(t, e, l, r), dl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Ee(), r = Rt(e), l = vt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Pt(e, l, r), t !== null && (Ze(t, e, r, n), dl(t, e, r));
} };
function za(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !wr(n, r) || !wr(l, i) : !0;
}
function wd(e, t, n) {
  var r = !1, l = At, i = t.contextType;
  return typeof i == "object" && i !== null ? i = We(i) : (l = Oe(t) ? en : we.current, r = t.contextTypes, i = (r = r != null) ? $n(e, l) : At), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Zl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ra(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Zl.enqueueReplaceState(t, t.state, null);
}
function No(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, xs(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = We(i) : (i = Oe(t) ? en : we.current, l.context = $n(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (jo(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Zl.enqueueReplaceState(l, l.state, null), Tl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Pn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Ep(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Di(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Co(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Kh = typeof WeakMap == "function" ? WeakMap : Map;
function kd(e, t, n) {
  n = vt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Dl || (Dl = !0, Do = r), Co(e, t);
  }, n;
}
function Ed(e, t, n) {
  n = vt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Co(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Co(e, t), typeof r != "function" && (zt === null ? zt = /* @__PURE__ */ new Set([this]) : zt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Da(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Kh();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = um.bind(null, e, t, n), t.then(e, e));
}
function Fa(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Aa(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = vt(-1, 1), t.tag = 2, Pt(n, t, 1))), n.lanes |= 1), e);
}
var Xh = Et.ReactCurrentOwner, Ce = !1;
function ke(e, t, n, r) {
  t.child = e === null ? qc(t, null, n, r) : Tn(t, e.child, n, r);
}
function Ua(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return Cn(t, l), r = bs(e, t, n, r, i, l), n = Ss(), e !== null && !Ce ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, kt(e, t, l)) : (X && n && fs(t), t.flags |= 1, ke(e, t, r, l), t.child);
}
function Va(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Ps(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, _d(e, t, i, r, l)) : (e = vl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : wr, n(o, r) && e.ref === t.ref) return kt(e, t, l);
  }
  return t.flags |= 1, e = Dt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function _d(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (wr(i, r) && e.ref === t.ref) if (Ce = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (Ce = !0);
    else return t.lanes = e.lanes, kt(e, t, l);
  }
  return Mo(e, t, n, r, l);
}
function bd(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(_n, Te), Te |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, G(_n, Te), Te |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, G(_n, Te), Te |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, G(_n, Te), Te |= r;
  return ke(e, t, l, n), t.child;
}
function Sd(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Mo(e, t, n, r, l) {
  var i = Oe(n) ? en : we.current;
  return i = $n(t, i), Cn(t, l), n = bs(e, t, n, r, i, l), r = Ss(), e !== null && !Ce ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, kt(e, t, l)) : (X && r && fs(t), t.flags |= 1, ke(e, t, n, l), t.child);
}
function Ba(e, t, n, r, l) {
  if (Oe(n)) {
    var i = !0;
    Cl(t);
  } else i = !1;
  if (Cn(t, l), t.stateNode === null) hl(e, t), wd(t, n, r), No(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var a = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = We(u) : (u = Oe(n) ? en : we.current, u = $n(t, u));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || a !== u) && Ra(t, o, r, u), jt = !1;
    var h = t.memoizedState;
    o.state = h, Tl(t, r, o, l), a = t.memoizedState, s !== r || h !== a || Me.current || jt ? (typeof c == "function" && (jo(t, n, c, r), a = t.memoizedState), (s = jt || za(t, n, s, r, h, a, u)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), o.props = r, o.state = a, o.context = u, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Zc(e, t), s = t.memoizedProps, u = t.type === t.elementType ? s : Ke(t.type, s), o.props = u, f = t.pendingProps, h = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = We(a) : (a = Oe(n) ? en : we.current, a = $n(t, a));
    var g = n.getDerivedStateFromProps;
    (c = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== f || h !== a) && Ra(t, o, r, a), jt = !1, h = t.memoizedState, o.state = h, Tl(t, r, o, l);
    var x = t.memoizedState;
    s !== f || h !== x || Me.current || jt ? (typeof g == "function" && (jo(t, n, g, r), x = t.memoizedState), (u = jt || za(t, n, u, r, h, x, a) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, x, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, x, a)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), o.props = r, o.state = x, o.context = a, r = u) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Oo(e, t, n, r, i, l);
}
function Oo(e, t, n, r, l, i) {
  Sd(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Ca(t, n, !1), kt(e, t, i);
  r = t.stateNode, Xh.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = Tn(t, e.child, null, i), t.child = Tn(t, null, s, i)) : ke(e, t, s, i), t.memoizedState = r.state, l && Ca(t, n, !0), t.child;
}
function jd(e) {
  var t = e.stateNode;
  t.pendingContext ? Na(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Na(e, t.context, !1), ws(e, t.containerInfo);
}
function Wa(e, t, n, r, l) {
  return Ln(), hs(l), t.flags |= 256, ke(e, t, n, r), t.child;
}
var $o = { dehydrated: null, treeContext: null, retryLane: 0 };
function Lo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Nd(e, t, n) {
  var r = t.pendingProps, l = q.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), G(q, l & 1), e === null)
    return bo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = ni(o, r, 0, null), e = Zt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Lo(n), t.memoizedState = $o, e) : Cs(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return qh(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = Dt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = Dt(s, i) : (i = Zt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Lo(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = $o, r;
  }
  return i = e.child, e = i.sibling, r = Dt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Cs(e, t) {
  return t = ni({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function tl(e, t, n, r) {
  return r !== null && hs(r), Tn(t, e.child, null, n), e = Cs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function qh(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Di(Error(b(422))), tl(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = ni({ mode: "visible", children: r.children }, l, 0, null), i = Zt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && Tn(t, e.child, null, o), t.child.memoizedState = Lo(o), t.memoizedState = $o, i);
  if (!(t.mode & 1)) return tl(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(b(419)), r = Di(i, r, void 0), tl(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, Ce || s) {
    if (r = ce, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, wt(e, l), Ze(r, e, l, -1));
    }
    return Is(), r = Di(Error(b(421))), tl(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = cm.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Ie = It(l.nextSibling), Pe = t, X = !0, qe = null, e !== null && (Ae[Ue++] = mt, Ae[Ue++] = gt, Ae[Ue++] = tn, mt = e.id, gt = e.overflow, tn = t), t = Cs(t, r.children), t.flags |= 4096, t);
}
function Ha(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), So(e.return, t, n);
}
function Fi(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function Cd(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ke(e, t, r.children, n), r = q.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ha(e, n, t);
      else if (e.tag === 19) Ha(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (G(q, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Il(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Fi(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Il(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Fi(t, !0, n, null, i);
      break;
    case "together":
      Fi(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function hl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function kt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), rn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(b(153));
  if (t.child !== null) {
    for (e = t.child, n = Dt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Dt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Jh(e, t, n) {
  switch (t.tag) {
    case 3:
      jd(t), Ln();
      break;
    case 5:
      ed(t);
      break;
    case 1:
      Oe(t.type) && Cl(t);
      break;
    case 4:
      ws(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      G($l, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (G(q, q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Nd(e, t, n) : (G(q, q.current & 1), e = kt(e, t, n), e !== null ? e.sibling : null);
      G(q, q.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Cd(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), G(q, q.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, bd(e, t, n);
  }
  return kt(e, t, n);
}
var Md, To, Od, $d;
Md = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
To = function() {
};
Od = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, qt(ut.current);
    var i = null;
    switch (n) {
      case "input":
        l = eo(e, l), r = eo(e, r), i = [];
        break;
      case "select":
        l = Z({}, l, { value: void 0 }), r = Z({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = ro(e, l), r = ro(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = jl);
    }
    io(n, r);
    var o;
    n = null;
    for (u in l) if (!r.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null) if (u === "style") {
      var s = l[u];
      for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (pr.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (s = l != null ? l[u] : void 0, r.hasOwnProperty(u) && a !== s && (a != null || s != null)) if (u === "style") if (s) {
        for (o in s) !s.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in a) a.hasOwnProperty(o) && s[o] !== a[o] && (n || (n = {}), n[o] = a[o]);
      } else n || (i || (i = []), i.push(
        u,
        n
      )), n = a;
      else u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (i = i || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (pr.hasOwnProperty(u) ? (a != null && u === "onScroll" && Y("scroll", e), i || s === a || (i = [])) : (i = i || []).push(u, a));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
$d = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Xn(e, t) {
  if (!X) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function ye(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Zh(e, t, n) {
  var r = t.pendingProps;
  switch (ps(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ye(t), null;
    case 1:
      return Oe(t.type) && Nl(), ye(t), null;
    case 3:
      return r = t.stateNode, In(), K(Me), K(we), Es(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Zr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, qe !== null && (Uo(qe), qe = null))), To(e, t), ye(t), null;
    case 5:
      ks(t);
      var l = qt(Sr.current);
      if (n = t.type, e !== null && t.stateNode != null) Od(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(b(166));
          return ye(t), null;
        }
        if (e = qt(ut.current), Zr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[ot] = t, r[_r] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Y("cancel", r), Y("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Y("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < tr.length; l++) Y(tr[l], r);
              break;
            case "source":
              Y("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Y(
                "error",
                r
              ), Y("load", r);
              break;
            case "details":
              Y("toggle", r);
              break;
            case "input":
              ea(r, i), Y("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, Y("invalid", r);
              break;
            case "textarea":
              na(r, i), Y("invalid", r);
          }
          io(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && Jr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && Jr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : pr.hasOwnProperty(o) && s != null && o === "onScroll" && Y("scroll", r);
          }
          switch (n) {
            case "input":
              Wr(r), ta(r, i, !0);
              break;
            case "textarea":
              Wr(r), ra(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = jl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ic(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[ot] = t, e[_r] = r, Md(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = oo(n, r), n) {
              case "dialog":
                Y("cancel", e), Y("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Y("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < tr.length; l++) Y(tr[l], e);
                l = r;
                break;
              case "source":
                Y("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Y(
                  "error",
                  e
                ), Y("load", e), l = r;
                break;
              case "details":
                Y("toggle", e), l = r;
                break;
              case "input":
                ea(e, r), l = eo(e, r), Y("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Z({}, r, { value: void 0 }), Y("invalid", e);
                break;
              case "textarea":
                na(e, r), l = ro(e, r), Y("invalid", e);
                break;
              default:
                l = r;
            }
            io(n, l), s = l;
            for (i in s) if (s.hasOwnProperty(i)) {
              var a = s[i];
              i === "style" ? ac(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && oc(e, a)) : i === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && hr(e, a) : typeof a == "number" && hr(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (pr.hasOwnProperty(i) ? a != null && i === "onScroll" && Y("scroll", e) : a != null && Jo(e, i, a, o));
            }
            switch (n) {
              case "input":
                Wr(e), ta(e, r, !1);
                break;
              case "textarea":
                Wr(e), ra(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Ft(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? bn(e, !!r.multiple, i, !1) : r.defaultValue != null && bn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = jl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return ye(t), null;
    case 6:
      if (e && t.stateNode != null) $d(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(b(166));
        if (n = qt(Sr.current), qt(ut.current), Zr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[ot] = t, (i = r.nodeValue !== n) && (e = Pe, e !== null)) switch (e.tag) {
            case 3:
              Jr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Jr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ot] = t, t.stateNode = r;
      }
      return ye(t), null;
    case 13:
      if (K(q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (X && Ie !== null && t.mode & 1 && !(t.flags & 128)) Kc(), Ln(), t.flags |= 98560, i = !1;
        else if (i = Zr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(b(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(b(317));
            i[ot] = t;
          } else Ln(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ye(t), i = !1;
        } else qe !== null && (Uo(qe), qe = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || q.current & 1 ? ae === 0 && (ae = 3) : Is())), t.updateQueue !== null && (t.flags |= 4), ye(t), null);
    case 4:
      return In(), To(e, t), e === null && kr(t.stateNode.containerInfo), ye(t), null;
    case 10:
      return vs(t.type._context), ye(t), null;
    case 17:
      return Oe(t.type) && Nl(), ye(t), null;
    case 19:
      if (K(q), i = t.memoizedState, i === null) return ye(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) Xn(i, !1);
      else {
        if (ae !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Il(e), o !== null) {
            for (t.flags |= 128, Xn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return G(q, q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && te() > zn && (t.flags |= 128, r = !0, Xn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Il(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Xn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !X) return ye(t), null;
        } else 2 * te() - i.renderingStartTime > zn && n !== 1073741824 && (t.flags |= 128, r = !0, Xn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = te(), t.sibling = null, n = q.current, G(q, r ? n & 1 | 2 : n & 1), t) : (ye(t), null);
    case 22:
    case 23:
      return Ts(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Te & 1073741824 && (ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ye(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(b(156, t.tag));
}
function em(e, t) {
  switch (ps(t), t.tag) {
    case 1:
      return Oe(t.type) && Nl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return In(), K(Me), K(we), Es(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ks(t), null;
    case 13:
      if (K(q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(b(340));
        Ln();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return K(q), null;
    case 4:
      return In(), null;
    case 10:
      return vs(t.type._context), null;
    case 22:
    case 23:
      return Ts(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var nl = !1, xe = !1, tm = typeof WeakSet == "function" ? WeakSet : Set, T = null;
function En(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    ee(e, t, r);
  }
  else n.current = null;
}
function Io(e, t, n) {
  try {
    n();
  } catch (r) {
    ee(e, t, r);
  }
}
var Ga = !1;
function nm(e, t) {
  if (vo = _l, e = zc(), ds(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, s = -1, a = -1, u = 0, c = 0, f = e, h = null;
        t: for (; ; ) {
          for (var g; f !== n || l !== 0 && f.nodeType !== 3 || (s = o + l), f !== i || r !== 0 && f.nodeType !== 3 || (a = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (g = f.firstChild) !== null; )
            h = f, f = g;
          for (; ; ) {
            if (f === e) break t;
            if (h === n && ++u === l && (s = o), h === i && ++c === r && (a = o), (g = f.nextSibling) !== null) break;
            f = h, h = f.parentNode;
          }
          f = g;
        }
        n = s === -1 || a === -1 ? null : { start: s, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (yo = { focusedElem: e, selectionRange: n }, _l = !1, T = t; T !== null; ) if (t = T, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, T = e;
  else for (; T !== null; ) {
    t = T;
    try {
      var x = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (x !== null) {
            var k = x.memoizedProps, C = x.memoizedState, p = t.stateNode, m = p.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Ke(t.type, k), C);
            p.__reactInternalSnapshotBeforeUpdate = m;
          }
          break;
        case 3:
          var v = t.stateNode.containerInfo;
          v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(b(163));
      }
    } catch (w) {
      ee(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, T = e;
      break;
    }
    T = t.return;
  }
  return x = Ga, Ga = !1, x;
}
function ur(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Io(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ei(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Po(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function Ld(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Ld(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ot], delete t[_r], delete t[ko], delete t[Dh], delete t[Fh])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Td(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Qa(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Td(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function zo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = jl));
  else if (r !== 4 && (e = e.child, e !== null)) for (zo(e, t, n), e = e.sibling; e !== null; ) zo(e, t, n), e = e.sibling;
}
function Ro(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ro(e, t, n), e = e.sibling; e !== null; ) Ro(e, t, n), e = e.sibling;
}
var de = null, Xe = !1;
function _t(e, t, n) {
  for (n = n.child; n !== null; ) Id(e, t, n), n = n.sibling;
}
function Id(e, t, n) {
  if (at && typeof at.onCommitFiberUnmount == "function") try {
    at.onCommitFiberUnmount(Gl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      xe || En(n, t);
    case 6:
      var r = de, l = Xe;
      de = null, _t(e, t, n), de = r, Xe = l, de !== null && (Xe ? (e = de, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : de.removeChild(n.stateNode));
      break;
    case 18:
      de !== null && (Xe ? (e = de, n = n.stateNode, e.nodeType === 8 ? Li(e.parentNode, n) : e.nodeType === 1 && Li(e, n), yr(e)) : Li(de, n.stateNode));
      break;
    case 4:
      r = de, l = Xe, de = n.stateNode.containerInfo, Xe = !0, _t(e, t, n), de = r, Xe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!xe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Io(n, t, o), l = l.next;
        } while (l !== r);
      }
      _t(e, t, n);
      break;
    case 1:
      if (!xe && (En(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        ee(n, t, s);
      }
      _t(e, t, n);
      break;
    case 21:
      _t(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (xe = (r = xe) || n.memoizedState !== null, _t(e, t, n), xe = r) : _t(e, t, n);
      break;
    default:
      _t(e, t, n);
  }
}
function Ya(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new tm()), t.forEach(function(r) {
      var l = dm.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Ye(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, s = o;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            de = s.stateNode, Xe = !1;
            break e;
          case 3:
            de = s.stateNode.containerInfo, Xe = !0;
            break e;
          case 4:
            de = s.stateNode.containerInfo, Xe = !0;
            break e;
        }
        s = s.return;
      }
      if (de === null) throw Error(b(160));
      Id(i, o, l), de = null, Xe = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (u) {
      ee(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Pd(t, e), t = t.sibling;
}
function Pd(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ye(t, e), lt(e), r & 4) {
        try {
          ur(3, e, e.return), ei(3, e);
        } catch (k) {
          ee(e, e.return, k);
        }
        try {
          ur(5, e, e.return);
        } catch (k) {
          ee(e, e.return, k);
        }
      }
      break;
    case 1:
      Ye(t, e), lt(e), r & 512 && n !== null && En(n, n.return);
      break;
    case 5:
      if (Ye(t, e), lt(e), r & 512 && n !== null && En(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          hr(l, "");
        } catch (k) {
          ee(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          s === "input" && i.type === "radio" && i.name != null && rc(l, i), oo(s, o);
          var u = oo(s, i);
          for (o = 0; o < a.length; o += 2) {
            var c = a[o], f = a[o + 1];
            c === "style" ? ac(l, f) : c === "dangerouslySetInnerHTML" ? oc(l, f) : c === "children" ? hr(l, f) : Jo(l, c, f, u);
          }
          switch (s) {
            case "input":
              to(l, i);
              break;
            case "textarea":
              lc(l, i);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var g = i.value;
              g != null ? bn(l, !!i.multiple, g, !1) : h !== !!i.multiple && (i.defaultValue != null ? bn(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : bn(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[_r] = i;
        } catch (k) {
          ee(e, e.return, k);
        }
      }
      break;
    case 6:
      if (Ye(t, e), lt(e), r & 4) {
        if (e.stateNode === null) throw Error(b(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (k) {
          ee(e, e.return, k);
        }
      }
      break;
    case 3:
      if (Ye(t, e), lt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        yr(t.containerInfo);
      } catch (k) {
        ee(e, e.return, k);
      }
      break;
    case 4:
      Ye(t, e), lt(e);
      break;
    case 13:
      Ye(t, e), lt(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || ($s = te())), r & 4 && Ya(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (xe = (u = xe) || c, Ye(t, e), xe = u) : Ye(t, e), lt(e), r & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1) for (T = e, c = e.child; c !== null; ) {
          for (f = T = c; T !== null; ) {
            switch (h = T, g = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                ur(4, h, h.return);
                break;
              case 1:
                En(h, h.return);
                var x = h.stateNode;
                if (typeof x.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount();
                  } catch (k) {
                    ee(r, n, k);
                  }
                }
                break;
              case 5:
                En(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Xa(f);
                  continue;
                }
            }
            g !== null ? (g.return = h, T = g) : Xa(f);
          }
          c = c.sibling;
        }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                l = f.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = f.stateNode, a = f.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = sc("display", o));
              } catch (k) {
                ee(e, e.return, k);
              }
            }
          } else if (f.tag === 6) {
            if (c === null) try {
              f.stateNode.nodeValue = u ? "" : f.memoizedProps;
            } catch (k) {
              ee(e, e.return, k);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), f = f.return;
          }
          c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      Ye(t, e), lt(e), r & 4 && Ya(e);
      break;
    case 21:
      break;
    default:
      Ye(
        t,
        e
      ), lt(e);
  }
}
function lt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Td(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(b(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (hr(l, ""), r.flags &= -33);
          var i = Qa(e);
          Ro(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = Qa(e);
          zo(e, s, o);
          break;
        default:
          throw Error(b(161));
      }
    } catch (a) {
      ee(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function rm(e, t, n) {
  T = e, zd(e);
}
function zd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; T !== null; ) {
    var l = T, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || nl;
      if (!o) {
        var s = l.alternate, a = s !== null && s.memoizedState !== null || xe;
        s = nl;
        var u = xe;
        if (nl = o, (xe = a) && !u) for (T = l; T !== null; ) o = T, a = o.child, o.tag === 22 && o.memoizedState !== null ? qa(l) : a !== null ? (a.return = o, T = a) : qa(l);
        for (; i !== null; ) T = i, zd(i), i = i.sibling;
        T = l, nl = s, xe = u;
      }
      Ka(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, T = i) : Ka(e);
  }
}
function Ka(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            xe || ei(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !xe) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Ke(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Ta(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Ta(t, o, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var a = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a.autoFocus && n.focus();
                  break;
                case "img":
                  a.src && (n.src = a.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var u = t.alternate;
              if (u !== null) {
                var c = u.memoizedState;
                if (c !== null) {
                  var f = c.dehydrated;
                  f !== null && yr(f);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(b(163));
        }
        xe || t.flags & 512 && Po(t);
      } catch (h) {
        ee(t, t.return, h);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, T = n;
      break;
    }
    T = t.return;
  }
}
function Xa(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, T = n;
      break;
    }
    T = t.return;
  }
}
function qa(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ei(4, t);
          } catch (a) {
            ee(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ee(t, l, a);
            }
          }
          var i = t.return;
          try {
            Po(t);
          } catch (a) {
            ee(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Po(t);
          } catch (a) {
            ee(t, o, a);
          }
      }
    } catch (a) {
      ee(t, t.return, a);
    }
    if (t === e) {
      T = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, T = s;
      break;
    }
    T = t.return;
  }
}
var lm = Math.ceil, Rl = Et.ReactCurrentDispatcher, Ms = Et.ReactCurrentOwner, Be = Et.ReactCurrentBatchConfig, V = 0, ce = null, le = null, fe = 0, Te = 0, _n = Vt(0), ae = 0, Mr = null, rn = 0, ti = 0, Os = 0, cr = null, Ne = null, $s = 0, zn = 1 / 0, ft = null, Dl = !1, Do = null, zt = null, rl = !1, Ot = null, Fl = 0, dr = 0, Fo = null, ml = -1, gl = 0;
function Ee() {
  return V & 6 ? te() : ml !== -1 ? ml : ml = te();
}
function Rt(e) {
  return e.mode & 1 ? V & 2 && fe !== 0 ? fe & -fe : Uh.transition !== null ? (gl === 0 && (gl = wc()), gl) : (e = W, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Nc(e.type)), e) : 1;
}
function Ze(e, t, n, r) {
  if (50 < dr) throw dr = 0, Fo = null, Error(b(185));
  $r(e, n, r), (!(V & 2) || e !== ce) && (e === ce && (!(V & 2) && (ti |= n), ae === 4 && Ct(e, fe)), $e(e, r), n === 1 && V === 0 && !(t.mode & 1) && (zn = te() + 500, ql && Bt()));
}
function $e(e, t) {
  var n = e.callbackNode;
  Up(e, t);
  var r = El(e, e === ce ? fe : 0);
  if (r === 0) n !== null && oa(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && oa(n), t === 1) e.tag === 0 ? Ah(Ja.bind(null, e)) : Gc(Ja.bind(null, e)), zh(function() {
      !(V & 6) && Bt();
    }), n = null;
    else {
      switch (kc(r)) {
        case 1:
          n = rs;
          break;
        case 4:
          n = yc;
          break;
        case 16:
          n = kl;
          break;
        case 536870912:
          n = xc;
          break;
        default:
          n = kl;
      }
      n = Wd(n, Rd.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Rd(e, t) {
  if (ml = -1, gl = 0, V & 6) throw Error(b(327));
  var n = e.callbackNode;
  if (Mn() && e.callbackNode !== n) return null;
  var r = El(e, e === ce ? fe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Al(e, r);
  else {
    t = r;
    var l = V;
    V |= 2;
    var i = Fd();
    (ce !== e || fe !== t) && (ft = null, zn = te() + 500, Jt(e, t));
    do
      try {
        sm();
        break;
      } catch (s) {
        Dd(e, s);
      }
    while (!0);
    gs(), Rl.current = i, V = l, le !== null ? t = 0 : (ce = null, fe = 0, t = ae);
  }
  if (t !== 0) {
    if (t === 2 && (l = fo(e), l !== 0 && (r = l, t = Ao(e, l))), t === 1) throw n = Mr, Jt(e, 0), Ct(e, r), $e(e, te()), n;
    if (t === 6) Ct(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !im(l) && (t = Al(e, r), t === 2 && (i = fo(e), i !== 0 && (r = i, t = Ao(e, i))), t === 1)) throw n = Mr, Jt(e, 0), Ct(e, r), $e(e, te()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(b(345));
        case 2:
          Qt(e, Ne, ft);
          break;
        case 3:
          if (Ct(e, r), (r & 130023424) === r && (t = $s + 500 - te(), 10 < t)) {
            if (El(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Ee(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = wo(Qt.bind(null, e, Ne, ft), t);
            break;
          }
          Qt(e, Ne, ft);
          break;
        case 4:
          if (Ct(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Je(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = te() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * lm(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = wo(Qt.bind(null, e, Ne, ft), r);
            break;
          }
          Qt(e, Ne, ft);
          break;
        case 5:
          Qt(e, Ne, ft);
          break;
        default:
          throw Error(b(329));
      }
    }
  }
  return $e(e, te()), e.callbackNode === n ? Rd.bind(null, e) : null;
}
function Ao(e, t) {
  var n = cr;
  return e.current.memoizedState.isDehydrated && (Jt(e, t).flags |= 256), e = Al(e, t), e !== 2 && (t = Ne, Ne = n, t !== null && Uo(t)), e;
}
function Uo(e) {
  Ne === null ? Ne = e : Ne.push.apply(Ne, e);
}
function im(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!et(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Ct(e, t) {
  for (t &= ~Os, t &= ~ti, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Je(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Ja(e) {
  if (V & 6) throw Error(b(327));
  Mn();
  var t = El(e, 0);
  if (!(t & 1)) return $e(e, te()), null;
  var n = Al(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = fo(e);
    r !== 0 && (t = r, n = Ao(e, r));
  }
  if (n === 1) throw n = Mr, Jt(e, 0), Ct(e, t), $e(e, te()), n;
  if (n === 6) throw Error(b(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Qt(e, Ne, ft), $e(e, te()), null;
}
function Ls(e, t) {
  var n = V;
  V |= 1;
  try {
    return e(t);
  } finally {
    V = n, V === 0 && (zn = te() + 500, ql && Bt());
  }
}
function ln(e) {
  Ot !== null && Ot.tag === 0 && !(V & 6) && Mn();
  var t = V;
  V |= 1;
  var n = Be.transition, r = W;
  try {
    if (Be.transition = null, W = 1, e) return e();
  } finally {
    W = r, Be.transition = n, V = t, !(V & 6) && Bt();
  }
}
function Ts() {
  Te = _n.current, K(_n);
}
function Jt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Ph(n)), le !== null) for (n = le.return; n !== null; ) {
    var r = n;
    switch (ps(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Nl();
        break;
      case 3:
        In(), K(Me), K(we), Es();
        break;
      case 5:
        ks(r);
        break;
      case 4:
        In();
        break;
      case 13:
        K(q);
        break;
      case 19:
        K(q);
        break;
      case 10:
        vs(r.type._context);
        break;
      case 22:
      case 23:
        Ts();
    }
    n = n.return;
  }
  if (ce = e, le = e = Dt(e.current, null), fe = Te = t, ae = 0, Mr = null, Os = ti = rn = 0, Ne = cr = null, Xt !== null) {
    for (t = 0; t < Xt.length; t++) if (n = Xt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    Xt = null;
  }
  return e;
}
function Dd(e, t) {
  do {
    var n = le;
    try {
      if (gs(), fl.current = zl, Pl) {
        for (var r = J.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Pl = !1;
      }
      if (nn = 0, ue = se = J = null, ar = !1, jr = 0, Ms.current = null, n === null || n.return === null) {
        ae = 1, Mr = t, le = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, a = t;
        if (t = fe, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var u = a, c = s, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var h = c.alternate;
            h ? (c.updateQueue = h.updateQueue, c.memoizedState = h.memoizedState, c.lanes = h.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var g = Fa(o);
          if (g !== null) {
            g.flags &= -257, Aa(g, o, s, i, t), g.mode & 1 && Da(i, u, t), t = g, a = u;
            var x = t.updateQueue;
            if (x === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(a), t.updateQueue = k;
            } else x.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Da(i, u, t), Is();
              break e;
            }
            a = Error(b(426));
          }
        } else if (X && s.mode & 1) {
          var C = Fa(o);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256), Aa(C, o, s, i, t), hs(Pn(a, s));
            break e;
          }
        }
        i = a = Pn(a, s), ae !== 4 && (ae = 2), cr === null ? cr = [i] : cr.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = kd(i, a, t);
              La(i, p);
              break e;
            case 1:
              s = a;
              var m = i.type, v = i.stateNode;
              if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (zt === null || !zt.has(v)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var w = Ed(i, s, t);
                La(i, w);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Ud(n);
    } catch (N) {
      t = N, le === n && n !== null && (le = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Fd() {
  var e = Rl.current;
  return Rl.current = zl, e === null ? zl : e;
}
function Is() {
  (ae === 0 || ae === 3 || ae === 2) && (ae = 4), ce === null || !(rn & 268435455) && !(ti & 268435455) || Ct(ce, fe);
}
function Al(e, t) {
  var n = V;
  V |= 2;
  var r = Fd();
  (ce !== e || fe !== t) && (ft = null, Jt(e, t));
  do
    try {
      om();
      break;
    } catch (l) {
      Dd(e, l);
    }
  while (!0);
  if (gs(), V = n, Rl.current = r, le !== null) throw Error(b(261));
  return ce = null, fe = 0, ae;
}
function om() {
  for (; le !== null; ) Ad(le);
}
function sm() {
  for (; le !== null && !Lp(); ) Ad(le);
}
function Ad(e) {
  var t = Bd(e.alternate, e, Te);
  e.memoizedProps = e.pendingProps, t === null ? Ud(e) : le = t, Ms.current = null;
}
function Ud(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = em(n, t), n !== null) {
        n.flags &= 32767, le = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ae = 6, le = null;
        return;
      }
    } else if (n = Zh(n, t, Te), n !== null) {
      le = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      le = t;
      return;
    }
    le = t = e;
  } while (t !== null);
  ae === 0 && (ae = 5);
}
function Qt(e, t, n) {
  var r = W, l = Be.transition;
  try {
    Be.transition = null, W = 1, am(e, t, n, r);
  } finally {
    Be.transition = l, W = r;
  }
  return null;
}
function am(e, t, n, r) {
  do
    Mn();
  while (Ot !== null);
  if (V & 6) throw Error(b(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(b(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Vp(e, i), e === ce && (le = ce = null, fe = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || rl || (rl = !0, Wd(kl, function() {
    return Mn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Be.transition, Be.transition = null;
    var o = W;
    W = 1;
    var s = V;
    V |= 4, Ms.current = null, nm(e, n), Pd(n, e), Ch(yo), _l = !!vo, yo = vo = null, e.current = n, rm(n), Tp(), V = s, W = o, Be.transition = i;
  } else e.current = n;
  if (rl && (rl = !1, Ot = e, Fl = l), i = e.pendingLanes, i === 0 && (zt = null), zp(n.stateNode), $e(e, te()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Dl) throw Dl = !1, e = Do, Do = null, e;
  return Fl & 1 && e.tag !== 0 && Mn(), i = e.pendingLanes, i & 1 ? e === Fo ? dr++ : (dr = 0, Fo = e) : dr = 0, Bt(), null;
}
function Mn() {
  if (Ot !== null) {
    var e = kc(Fl), t = Be.transition, n = W;
    try {
      if (Be.transition = null, W = 16 > e ? 16 : e, Ot === null) var r = !1;
      else {
        if (e = Ot, Ot = null, Fl = 0, V & 6) throw Error(b(331));
        var l = V;
        for (V |= 4, T = e.current; T !== null; ) {
          var i = T, o = i.child;
          if (T.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var u = s[a];
                for (T = u; T !== null; ) {
                  var c = T;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ur(8, c, i);
                  }
                  var f = c.child;
                  if (f !== null) f.return = c, T = f;
                  else for (; T !== null; ) {
                    c = T;
                    var h = c.sibling, g = c.return;
                    if (Ld(c), c === u) {
                      T = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = g, T = h;
                      break;
                    }
                    T = g;
                  }
                }
              }
              var x = i.alternate;
              if (x !== null) {
                var k = x.child;
                if (k !== null) {
                  x.child = null;
                  do {
                    var C = k.sibling;
                    k.sibling = null, k = C;
                  } while (k !== null);
                }
              }
              T = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, T = o;
          else e: for (; T !== null; ) {
            if (i = T, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                ur(9, i, i.return);
            }
            var p = i.sibling;
            if (p !== null) {
              p.return = i.return, T = p;
              break e;
            }
            T = i.return;
          }
        }
        var m = e.current;
        for (T = m; T !== null; ) {
          o = T;
          var v = o.child;
          if (o.subtreeFlags & 2064 && v !== null) v.return = o, T = v;
          else e: for (o = m; T !== null; ) {
            if (s = T, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  ei(9, s);
              }
            } catch (N) {
              ee(s, s.return, N);
            }
            if (s === o) {
              T = null;
              break e;
            }
            var w = s.sibling;
            if (w !== null) {
              w.return = s.return, T = w;
              break e;
            }
            T = s.return;
          }
        }
        if (V = l, Bt(), at && typeof at.onPostCommitFiberRoot == "function") try {
          at.onPostCommitFiberRoot(Gl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      W = n, Be.transition = t;
    }
  }
  return !1;
}
function Za(e, t, n) {
  t = Pn(n, t), t = kd(e, t, 1), e = Pt(e, t, 1), t = Ee(), e !== null && ($r(e, 1, t), $e(e, t));
}
function ee(e, t, n) {
  if (e.tag === 3) Za(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Za(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (zt === null || !zt.has(r))) {
        e = Pn(n, e), e = Ed(t, e, 1), t = Pt(t, e, 1), e = Ee(), t !== null && ($r(t, 1, e), $e(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function um(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Ee(), e.pingedLanes |= e.suspendedLanes & n, ce === e && (fe & n) === n && (ae === 4 || ae === 3 && (fe & 130023424) === fe && 500 > te() - $s ? Jt(e, 0) : Os |= n), $e(e, t);
}
function Vd(e, t) {
  t === 0 && (e.mode & 1 ? (t = Qr, Qr <<= 1, !(Qr & 130023424) && (Qr = 4194304)) : t = 1);
  var n = Ee();
  e = wt(e, t), e !== null && ($r(e, t, n), $e(e, n));
}
function cm(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Vd(e, n);
}
function dm(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(b(314));
  }
  r !== null && r.delete(t), Vd(e, n);
}
var Bd;
Bd = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Me.current) Ce = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ce = !1, Jh(e, t, n);
    Ce = !!(e.flags & 131072);
  }
  else Ce = !1, X && t.flags & 1048576 && Qc(t, Ol, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      hl(e, t), e = t.pendingProps;
      var l = $n(t, we.current);
      Cn(t, n), l = bs(null, t, r, e, l, n);
      var i = Ss();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Oe(r) ? (i = !0, Cl(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, xs(t), l.updater = Zl, t.stateNode = l, l._reactInternals = t, No(t, r, e, n), t = Oo(null, t, r, !0, i, n)) : (t.tag = 0, X && i && fs(t), ke(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (hl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = pm(r), e = Ke(r, e), l) {
          case 0:
            t = Mo(null, t, r, e, n);
            break e;
          case 1:
            t = Ba(null, t, r, e, n);
            break e;
          case 11:
            t = Ua(null, t, r, e, n);
            break e;
          case 14:
            t = Va(null, t, r, Ke(r.type, e), n);
            break e;
        }
        throw Error(b(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ke(r, l), Mo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ke(r, l), Ba(e, t, r, l, n);
    case 3:
      e: {
        if (jd(t), e === null) throw Error(b(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Zc(e, t), Tl(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = Pn(Error(b(423)), t), t = Wa(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Pn(Error(b(424)), t), t = Wa(e, t, r, n, l);
          break e;
        } else for (Ie = It(t.stateNode.containerInfo.firstChild), Pe = t, X = !0, qe = null, n = qc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Ln(), r === l) {
            t = kt(e, t, n);
            break e;
          }
          ke(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ed(t), e === null && bo(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, xo(r, l) ? o = null : i !== null && xo(r, i) && (t.flags |= 32), Sd(e, t), ke(e, t, o, n), t.child;
    case 6:
      return e === null && bo(t), null;
    case 13:
      return Nd(e, t, n);
    case 4:
      return ws(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Tn(t, null, r, n) : ke(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ke(r, l), Ua(e, t, r, l, n);
    case 7:
      return ke(e, t, t.pendingProps, n), t.child;
    case 8:
      return ke(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ke(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, G($l, r._currentValue), r._currentValue = o, i !== null) if (et(i.value, o)) {
          if (i.children === l.children && !Me.current) {
            t = kt(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var s = i.dependencies;
          if (s !== null) {
            o = i.child;
            for (var a = s.firstContext; a !== null; ) {
              if (a.context === r) {
                if (i.tag === 1) {
                  a = vt(-1, n & -n), a.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var c = u.pending;
                    c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a;
                  }
                }
                i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), So(
                  i.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              a = a.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(b(341));
            o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), So(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        ke(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, Cn(t, n), l = We(l), r = r(l), t.flags |= 1, ke(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Ke(r, t.pendingProps), l = Ke(r.type, l), Va(e, t, r, l, n);
    case 15:
      return _d(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ke(r, l), hl(e, t), t.tag = 1, Oe(r) ? (e = !0, Cl(t)) : e = !1, Cn(t, n), wd(t, r, l), No(t, r, l, n), Oo(null, t, r, !0, e, n);
    case 19:
      return Cd(e, t, n);
    case 22:
      return bd(e, t, n);
  }
  throw Error(b(156, t.tag));
};
function Wd(e, t) {
  return vc(e, t);
}
function fm(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ve(e, t, n, r) {
  return new fm(e, t, n, r);
}
function Ps(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function pm(e) {
  if (typeof e == "function") return Ps(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === es) return 11;
    if (e === ts) return 14;
  }
  return 2;
}
function Dt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ve(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function vl(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Ps(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case pn:
      return Zt(n.children, l, i, t);
    case Zo:
      o = 8, l |= 8;
      break;
    case Xi:
      return e = Ve(12, n, t, l | 2), e.elementType = Xi, e.lanes = i, e;
    case qi:
      return e = Ve(13, n, t, l), e.elementType = qi, e.lanes = i, e;
    case Ji:
      return e = Ve(19, n, t, l), e.elementType = Ji, e.lanes = i, e;
    case ec:
      return ni(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ju:
          o = 10;
          break e;
        case Zu:
          o = 9;
          break e;
        case es:
          o = 11;
          break e;
        case ts:
          o = 14;
          break e;
        case St:
          o = 16, r = null;
          break e;
      }
      throw Error(b(130, e == null ? e : typeof e, ""));
  }
  return t = Ve(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Zt(e, t, n, r) {
  return e = Ve(7, e, r, t), e.lanes = n, e;
}
function ni(e, t, n, r) {
  return e = Ve(22, e, r, t), e.elementType = ec, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ai(e, t, n) {
  return e = Ve(6, e, null, t), e.lanes = n, e;
}
function Ui(e, t, n) {
  return t = Ve(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function hm(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ki(0), this.expirationTimes = ki(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ki(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function zs(e, t, n, r, l, i, o, s, a) {
  return e = new hm(e, t, n, s, a), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ve(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, xs(i), e;
}
function mm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: fn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Hd(e) {
  if (!e) return At;
  e = e._reactInternals;
  e: {
    if (sn(e) !== e || e.tag !== 1) throw Error(b(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Oe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(b(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Oe(n)) return Hc(e, n, t);
  }
  return t;
}
function Gd(e, t, n, r, l, i, o, s, a) {
  return e = zs(n, r, !0, e, l, i, o, s, a), e.context = Hd(null), n = e.current, r = Ee(), l = Rt(n), i = vt(r, l), i.callback = t != null ? t : null, Pt(n, i, l), e.current.lanes = l, $r(e, l, r), $e(e, r), e;
}
function ri(e, t, n, r) {
  var l = t.current, i = Ee(), o = Rt(l);
  return n = Hd(n), t.context === null ? t.context = n : t.pendingContext = n, t = vt(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Pt(l, t, o), e !== null && (Ze(e, l, o, i), dl(e, l, o)), o;
}
function Ul(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function eu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Rs(e, t) {
  eu(e, t), (e = e.alternate) && eu(e, t);
}
function gm() {
  return null;
}
var Qd = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ds(e) {
  this._internalRoot = e;
}
li.prototype.render = Ds.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  ri(e, t, null, null);
};
li.prototype.unmount = Ds.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    ln(function() {
      ri(null, e, null, null);
    }), t[xt] = null;
  }
};
function li(e) {
  this._internalRoot = e;
}
li.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = bc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Nt.length && t !== 0 && t < Nt[n].priority; n++) ;
    Nt.splice(n, 0, e), n === 0 && jc(e);
  }
};
function Fs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ii(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function tu() {
}
function vm(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var u = Ul(o);
        i.call(u);
      };
    }
    var o = Gd(t, r, e, 0, null, !1, !1, "", tu);
    return e._reactRootContainer = o, e[xt] = o.current, kr(e.nodeType === 8 ? e.parentNode : e), ln(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var u = Ul(a);
      s.call(u);
    };
  }
  var a = zs(e, 0, !1, null, null, !1, !1, "", tu);
  return e._reactRootContainer = a, e[xt] = a.current, kr(e.nodeType === 8 ? e.parentNode : e), ln(function() {
    ri(t, a, n, r);
  }), a;
}
function oi(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var a = Ul(o);
        s.call(a);
      };
    }
    ri(t, o, e, l);
  } else o = vm(n, t, e, l, r);
  return Ul(o);
}
Ec = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = er(t.pendingLanes);
        n !== 0 && (ls(t, n | 1), $e(t, te()), !(V & 6) && (zn = te() + 500, Bt()));
      }
      break;
    case 13:
      ln(function() {
        var r = wt(e, 1);
        if (r !== null) {
          var l = Ee();
          Ze(r, e, 1, l);
        }
      }), Rs(e, 1);
  }
};
is = function(e) {
  if (e.tag === 13) {
    var t = wt(e, 134217728);
    if (t !== null) {
      var n = Ee();
      Ze(t, e, 134217728, n);
    }
    Rs(e, 134217728);
  }
};
_c = function(e) {
  if (e.tag === 13) {
    var t = Rt(e), n = wt(e, t);
    if (n !== null) {
      var r = Ee();
      Ze(n, e, t, r);
    }
    Rs(e, t);
  }
};
bc = function() {
  return W;
};
Sc = function(e, t) {
  var n = W;
  try {
    return W = e, t();
  } finally {
    W = n;
  }
};
ao = function(e, t, n) {
  switch (t) {
    case "input":
      if (to(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Xl(r);
            if (!l) throw Error(b(90));
            nc(r), to(r, l);
          }
        }
      }
      break;
    case "textarea":
      lc(e, n);
      break;
    case "select":
      t = n.value, t != null && bn(e, !!n.multiple, t, !1);
  }
};
dc = Ls;
fc = ln;
var ym = { usingClientEntryPoint: !1, Events: [Tr, vn, Xl, uc, cc, Ls] }, qn = { findFiberByHostInstance: Kt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, xm = { bundleType: qn.bundleType, version: qn.version, rendererPackageName: qn.rendererPackageName, rendererConfig: qn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Et.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = mc(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: qn.findFiberByHostInstance || gm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var ll = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ll.isDisabled && ll.supportsFiber) try {
    Gl = ll.inject(xm), at = ll;
  } catch {
  }
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ym;
Re.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fs(t)) throw Error(b(200));
  return mm(e, t, null, n);
};
Re.createRoot = function(e, t) {
  if (!Fs(e)) throw Error(b(299));
  var n = !1, r = "", l = Qd;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = zs(e, 1, !1, null, null, n, !1, r, l), e[xt] = t.current, kr(e.nodeType === 8 ? e.parentNode : e), new Ds(t);
};
Re.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(b(188)) : (e = Object.keys(e).join(","), Error(b(268, e)));
  return e = mc(t), e = e === null ? null : e.stateNode, e;
};
Re.flushSync = function(e) {
  return ln(e);
};
Re.hydrate = function(e, t, n) {
  if (!ii(t)) throw Error(b(200));
  return oi(null, e, t, !0, n);
};
Re.hydrateRoot = function(e, t, n) {
  if (!Fs(e)) throw Error(b(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = Qd;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Gd(t, null, e, 1, n != null ? n : null, l, !1, i, o), e[xt] = t.current, kr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new li(t);
};
Re.render = function(e, t, n) {
  if (!ii(t)) throw Error(b(200));
  return oi(null, e, t, !1, n);
};
Re.unmountComponentAtNode = function(e) {
  if (!ii(e)) throw Error(b(40));
  return e._reactRootContainer ? (ln(function() {
    oi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[xt] = null;
    });
  }), !0) : !1;
};
Re.unstable_batchedUpdates = Ls;
Re.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!ii(n)) throw Error(b(200));
  if (e == null || e._reactInternals === void 0) throw Error(b(38));
  return oi(e, t, n, !1, r);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function Yd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yd);
    } catch (e) {
      console.error(e);
    }
}
Yd(), Yu.exports = Re;
var wm = Yu.exports, Kd, nu = wm;
Kd = nu.createRoot, nu.hydrateRoot;
class ru extends Error {
  constructor(t, n) {
    super(t), this.status = n;
  }
}
function km(e, t, n = {}) {
  const r = Object.entries(n).filter(([, l]) => l !== void 0 && l !== "").map(([l, i]) => `${encodeURIComponent(l)}=${encodeURIComponent(i)}`).join("&");
  return `${e.replace(/\/+$/, "")}${t}${r ? `?${r}` : ""}`;
}
async function Em(e, t, n, r) {
  if (!e.apiUrl && e.apiUrl !== "")
    throw new ru("apiUrl is not configured", 0);
  const l = typeof e.headers == "function" ? await e.headers() : e.headers || {}, o = await (e.fetch || fetch.bind(globalThis))(km(e.apiUrl, t, n), {
    headers: { Accept: r, ...l },
    credentials: e.credentials || "same-origin"
  });
  if (!o.ok) {
    let s = `HTTP ${o.status}`;
    try {
      const a = await o.clone().json();
      a && a.error && (s = a.error);
    } catch {
    }
    throw new ru(s, o.status);
  }
  return o;
}
async function _m(e, t) {
  return await (await Em(e, "/api/schema", { em: t }, "application/json")).json();
}
var bm = "\0", Wt = "\0", lu = "";
let Sm = class {
  constructor(t) {
    re(this, "_isDirected", !0);
    re(this, "_isMultigraph", !1);
    re(this, "_isCompound", !1);
    // Label for the graph itself
    re(this, "_label");
    // Defaults to be set when creating a new node
    re(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    re(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    re(this, "_nodes", {});
    // v -> edgeObj
    re(this, "_in", {});
    // u -> v -> Number
    re(this, "_preds", {});
    // v -> edgeObj
    re(this, "_out", {});
    // v -> w -> Number
    re(this, "_sucs", {});
    // e -> edgeObj
    re(this, "_edgeObjs", {});
    // e -> label
    re(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    re(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    re(this, "_edgeCount", 0);
    re(this, "_parent");
    re(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Wt] = {});
  }
  /* === Graph functions ========= */
  /**
   * Whether graph was created with 'directed' flag set to true or not.
   */
  isDirected() {
    return this._isDirected;
  }
  /**
   * Whether graph was created with 'multigraph' flag set to true or not.
   */
  isMultigraph() {
    return this._isMultigraph;
  }
  /**
   * Whether graph was created with 'compound' flag set to true or not.
   */
  isCompound() {
    return this._isCompound;
  }
  /**
   * Sets the label of the graph.
   */
  setGraph(t) {
    return this._label = t, this;
  }
  /**
   * Gets the graph label.
   */
  graph() {
    return this._label;
  }
  /* === Node functions ========== */
  /**
   * Sets the default node label. If newDefault is a function, it will be
   * invoked ach time when setting a label for a node. Otherwise, this label
   * will be assigned as default label in case if no label was specified while
   * setting a node.
   * Complexity: O(1).
   */
  setDefaultNodeLabel(t) {
    return this._defaultNodeLabelFn = t, typeof t != "function" && (this._defaultNodeLabelFn = () => t), this;
  }
  /**
   * Gets the number of nodes in the graph.
   * Complexity: O(1).
   */
  nodeCount() {
    return this._nodeCount;
  }
  /**
   * Gets all nodes of the graph. Note, the in case of compound graph subnodes are
   * not included in list.
   * Complexity: O(1).
   */
  nodes() {
    return Object.keys(this._nodes);
  }
  /**
   * Gets list of nodes without in-edges.
   * Complexity: O(|V|).
   */
  sources() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._in[n]).length === 0);
  }
  /**
   * Gets list of nodes without out-edges.
   * Complexity: O(|V|).
   */
  sinks() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._out[n]).length === 0);
  }
  /**
   * Invokes setNode method for each node in names list.
   * Complexity: O(|names|).
   */
  setNodes(t, n) {
    var r = arguments, l = this;
    return t.forEach(function(i) {
      r.length > 1 ? l.setNode(i, n) : l.setNode(i);
    }), this;
  }
  /**
   * Creates or updates the value for the node v in the graph. If label is supplied
   * it is set as the value for the node. If label is not supplied and the node was
   * created by this call then the default node label will be assigned.
   * Complexity: O(1).
   */
  setNode(t, n) {
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Wt, this._children[t] = {}, this._children[Wt][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
  }
  /**
   * Gets the label of node with specified name.
   * Complexity: O(|V|).
   */
  node(t) {
    return this._nodes[t];
  }
  /**
   * Detects whether graph has a node with specified name or not.
   */
  hasNode(t) {
    return Object.hasOwn(this._nodes, t);
  }
  /**
   * Remove the node with the name from the graph or do nothing if the node is not in
   * the graph. If the node was removed this function also removes any incident
   * edges.
   * Complexity: O(1).
   */
  removeNode(t) {
    var n = this;
    if (Object.hasOwn(this._nodes, t)) {
      var r = (l) => n.removeEdge(n._edgeObjs[l]);
      delete this._nodes[t], this._isCompound && (this._removeFromParentsChildList(t), delete this._parent[t], this.children(t).forEach(function(l) {
        n.setParent(l);
      }), delete this._children[t]), Object.keys(this._in[t]).forEach(r), delete this._in[t], delete this._preds[t], Object.keys(this._out[t]).forEach(r), delete this._out[t], delete this._sucs[t], --this._nodeCount;
    }
    return this;
  }
  /**
   * Sets node p as a parent for node v if it is defined, or removes the
   * parent for v if p is undefined. Method throws an exception in case of
   * invoking it in context of noncompound graph.
   * Average-case complexity: O(1).
   */
  setParent(t, n) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (n === void 0)
      n = Wt;
    else {
      n += "";
      for (var r = n; r !== void 0; r = this.parent(r))
        if (r === t)
          throw new Error("Setting " + n + " as parent of " + t + " would create a cycle");
      this.setNode(n);
    }
    return this.setNode(t), this._removeFromParentsChildList(t), this._parent[t] = n, this._children[n][t] = !0, this;
  }
  _removeFromParentsChildList(t) {
    delete this._children[this._parent[t]][t];
  }
  /**
   * Gets parent node for node v.
   * Complexity: O(1).
   */
  parent(t) {
    if (this._isCompound) {
      var n = this._parent[t];
      if (n !== Wt)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Wt) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Wt)
        return this.nodes();
      if (this.hasNode(t))
        return [];
    }
  }
  /**
   * Return all nodes that are predecessors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  predecessors(t) {
    var n = this._preds[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are successors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  successors(t) {
    var n = this._sucs[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are predecessors or successors of the specified node or undefined if
   * node v is not in the graph.
   * Complexity: O(|V|).
   */
  neighbors(t) {
    var n = this.predecessors(t);
    if (n) {
      const l = new Set(n);
      for (var r of this.successors(t))
        l.add(r);
      return Array.from(l.values());
    }
  }
  isLeaf(t) {
    var n;
    return this.isDirected() ? n = this.successors(t) : n = this.neighbors(t), n.length === 0;
  }
  /**
   * Creates new graph with nodes filtered via filter. Edges incident to rejected node
   * are also removed. In case of compound graph, if parent is rejected by filter,
   * than all its children are rejected too.
   * Average-case complexity: O(|E|+|V|).
   */
  filterNodes(t) {
    var n = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    n.setGraph(this.graph());
    var r = this;
    Object.entries(this._nodes).forEach(function([o, s]) {
      t(o) && n.setNode(o, s);
    }), Object.values(this._edgeObjs).forEach(function(o) {
      n.hasNode(o.v) && n.hasNode(o.w) && n.setEdge(o, r.edge(o));
    });
    var l = {};
    function i(o) {
      var s = r.parent(o);
      return s === void 0 || n.hasNode(s) ? (l[o] = s, s) : s in l ? l[s] : i(s);
    }
    return this._isCompound && n.nodes().forEach((o) => n.setParent(o, i(o))), n;
  }
  /* === Edge functions ========== */
  /**
   * Sets the default edge label or factory function. This label will be
   * assigned as default label in case if no label was specified while setting
   * an edge or this function will be invoked each time when setting an edge
   * with no label specified and returned value * will be used as a label for edge.
   * Complexity: O(1).
   */
  setDefaultEdgeLabel(t) {
    return this._defaultEdgeLabelFn = t, typeof t != "function" && (this._defaultEdgeLabelFn = () => t), this;
  }
  /**
   * Gets the number of edges in the graph.
   * Complexity: O(1).
   */
  edgeCount() {
    return this._edgeCount;
  }
  /**
   * Gets edges of the graph. In case of compound graph subgraphs are not considered.
   * Complexity: O(|E|).
   */
  edges() {
    return Object.values(this._edgeObjs);
  }
  /**
   * Establish an edges path over the nodes in nodes list. If some edge is already
   * exists, it will update its label, otherwise it will create an edge between pair
   * of nodes with label provided or default label if no label provided.
   * Complexity: O(|nodes|).
   */
  setPath(t, n) {
    var r = this, l = arguments;
    return t.reduce(function(i, o) {
      return l.length > 1 ? r.setEdge(i, o, n) : r.setEdge(i, o), o;
    }), this;
  }
  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied
   * name. If label is supplied it is set as the value for the edge. If label is not
   * supplied and the edge was created by this call then the default edge label will
   * be assigned. The name parameter is only useful with multigraphs.
   */
  setEdge() {
    var t, n, r, l, i = !1, o = arguments[0];
    typeof o == "object" && o !== null && "v" in o ? (t = o.v, n = o.w, r = o.name, arguments.length === 2 && (l = arguments[1], i = !0)) : (t = o, n = arguments[1], r = arguments[3], arguments.length > 2 && (l = arguments[2], i = !0)), t = "" + t, n = "" + n, r !== void 0 && (r = "" + r);
    var s = nr(this._isDirected, t, n, r);
    if (Object.hasOwn(this._edgeLabels, s))
      return i && (this._edgeLabels[s] = l), this;
    if (r !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[s] = i ? l : this._defaultEdgeLabelFn(t, n, r);
    var a = jm(this._isDirected, t, n, r);
    return t = a.v, n = a.w, Object.freeze(a), this._edgeObjs[s] = a, iu(this._preds[n], t), iu(this._sucs[t], n), this._in[n][s] = a, this._out[t][s] = a, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, r) {
    var l = arguments.length === 1 ? Vi(this._isDirected, arguments[0]) : nr(this._isDirected, t, n, r);
    return this._edgeLabels[l];
  }
  /**
   * Gets the label for the specified edge and converts it to an object.
   * Complexity: O(1)
   */
  edgeAsObj() {
    const t = this.edge(...arguments);
    return typeof t != "object" ? { label: t } : t;
  }
  /**
   * Detects whether the graph contains specified edge or not. No subgraphs are considered.
   * Complexity: O(1).
   */
  hasEdge(t, n, r) {
    var l = arguments.length === 1 ? Vi(this._isDirected, arguments[0]) : nr(this._isDirected, t, n, r);
    return Object.hasOwn(this._edgeLabels, l);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, r) {
    var l = arguments.length === 1 ? Vi(this._isDirected, arguments[0]) : nr(this._isDirected, t, n, r), i = this._edgeObjs[l];
    return i && (t = i.v, n = i.w, delete this._edgeLabels[l], delete this._edgeObjs[l], ou(this._preds[n], t), ou(this._sucs[t], n), delete this._in[n][l], delete this._out[t][l], this._edgeCount--), this;
  }
  /**
   * Return all edges that point to the node v. Optionally filters those edges down to just those
   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  inEdges(t, n) {
    var r = this._in[t];
    if (r) {
      var l = Object.values(r);
      return n ? l.filter((i) => i.v === n) : l;
    }
  }
  /**
   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  outEdges(t, n) {
    var r = this._out[t];
    if (r) {
      var l = Object.values(r);
      return n ? l.filter((i) => i.w === n) : l;
    }
  }
  /**
   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
   * down to just those between nodes v and w regardless of direction.
   * Complexity: O(|E|).
   */
  nodeEdges(t, n) {
    var r = this.inEdges(t, n);
    if (r)
      return r.concat(this.outEdges(t, n));
  }
};
function iu(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function ou(e, t) {
  --e[t] || delete e[t];
}
function nr(e, t, n, r) {
  var l = "" + t, i = "" + n;
  if (!e && l > i) {
    var o = l;
    l = i, i = o;
  }
  return l + lu + i + lu + (r === void 0 ? bm : r);
}
function jm(e, t, n, r) {
  var l = "" + t, i = "" + n;
  if (!e && l > i) {
    var o = l;
    l = i, i = o;
  }
  var s = { v: l, w: i };
  return r && (s.name = r), s;
}
function Vi(e, t) {
  return nr(e, t.v, t.w, t.name);
}
var As = Sm, Nm = "2.2.4", Cm = {
  Graph: As,
  version: Nm
}, Mm = As, Om = {
  write: $m,
  read: Im
};
function $m(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: Lm(e),
    edges: Tm(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function Lm(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), r = e.parent(t), l = { v: t };
    return n !== void 0 && (l.value = n), r !== void 0 && (l.parent = r), l;
  });
}
function Tm(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), r = { v: t.v, w: t.w };
    return t.name !== void 0 && (r.name = t.name), n !== void 0 && (r.value = n), r;
  });
}
function Im(e) {
  var t = new Mm(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var Pm = zm;
function zm(e) {
  var t = {}, n = [], r;
  function l(i) {
    Object.hasOwn(t, i) || (t[i] = !0, r.push(i), e.successors(i).forEach(l), e.predecessors(i).forEach(l));
  }
  return e.nodes().forEach(function(i) {
    r = [], l(i), r.length && n.push(r);
  }), n;
}
let Rm = class {
  constructor() {
    re(this, "_arr", []);
    re(this, "_keyIndices", {});
  }
  /**
   * Returns the number of elements in the queue. Takes `O(1)` time.
   */
  size() {
    return this._arr.length;
  }
  /**
   * Returns the keys that are in the queue. Takes `O(n)` time.
   */
  keys() {
    return this._arr.map(function(t) {
      return t.key;
    });
  }
  /**
   * Returns `true` if **key** is in the queue and `false` if not.
   */
  has(t) {
    return Object.hasOwn(this._keyIndices, t);
  }
  /**
   * Returns the priority for **key**. If **key** is not present in the queue
   * then this function returns `undefined`. Takes `O(1)` time.
   *
   * @param {Object} key
   */
  priority(t) {
    var n = this._keyIndices[t];
    if (n !== void 0)
      return this._arr[n].priority;
  }
  /**
   * Returns the key for the minimum element in this queue. If the queue is
   * empty this function throws an Error. Takes `O(1)` time.
   */
  min() {
    if (this.size() === 0)
      throw new Error("Queue underflow");
    return this._arr[0].key;
  }
  /**
   * Inserts a new key into the priority queue. If the key already exists in
   * the queue this function returns `false`; otherwise it will return `true`.
   * Takes `O(n)` time.
   *
   * @param {Object} key the key to add
   * @param {Number} priority the initial priority for the key
   */
  add(t, n) {
    var r = this._keyIndices;
    if (t = String(t), !Object.hasOwn(r, t)) {
      var l = this._arr, i = l.length;
      return r[t] = i, l.push({ key: t, priority: n }), this._decrease(i), !0;
    }
    return !1;
  }
  /**
   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
   */
  removeMin() {
    this._swap(0, this._arr.length - 1);
    var t = this._arr.pop();
    return delete this._keyIndices[t.key], this._heapify(0), t.key;
  }
  /**
   * Decreases the priority for **key** to **priority**. If the new priority is
   * greater than the previous priority, this function will throw an Error.
   *
   * @param {Object} key the key for which to raise priority
   * @param {Number} priority the new priority for the key
   */
  decrease(t, n) {
    var r = this._keyIndices[t];
    if (n > this._arr[r].priority)
      throw new Error("New priority is greater than current priority. Key: " + t + " Old: " + this._arr[r].priority + " New: " + n);
    this._arr[r].priority = n, this._decrease(r);
  }
  _heapify(t) {
    var n = this._arr, r = 2 * t, l = r + 1, i = t;
    r < n.length && (i = n[r].priority < n[i].priority ? r : i, l < n.length && (i = n[l].priority < n[i].priority ? l : i), i !== t && (this._swap(t, i), this._heapify(i)));
  }
  _decrease(t) {
    for (var n = this._arr, r = n[t].priority, l; t !== 0 && (l = t >> 1, !(n[l].priority < r)); )
      this._swap(t, l), t = l;
  }
  _swap(t, n) {
    var r = this._arr, l = this._keyIndices, i = r[t], o = r[n];
    r[t] = o, r[n] = i, l[o.key] = t, l[i.key] = n;
  }
};
var Xd = Rm, Dm = Xd, qd = Am, Fm = () => 1;
function Am(e, t, n, r) {
  return Um(
    e,
    String(t),
    n || Fm,
    r || function(l) {
      return e.outEdges(l);
    }
  );
}
function Um(e, t, n, r) {
  var l = {}, i = new Dm(), o, s, a = function(u) {
    var c = u.v !== o ? u.v : u.w, f = l[c], h = n(u), g = s.distance + h;
    if (h < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + u + " Weight: " + h);
    g < f.distance && (f.distance = g, f.predecessor = o, i.decrease(c, g));
  };
  for (e.nodes().forEach(function(u) {
    var c = u === t ? 0 : Number.POSITIVE_INFINITY;
    l[u] = { distance: c }, i.add(u, c);
  }); i.size() > 0 && (o = i.removeMin(), s = l[o], s.distance !== Number.POSITIVE_INFINITY); )
    r(o).forEach(a);
  return l;
}
var Vm = qd, Bm = Wm;
function Wm(e, t, n) {
  return e.nodes().reduce(function(r, l) {
    return r[l] = Vm(e, l, t, n), r;
  }, {});
}
var Jd = Hm;
function Hm(e) {
  var t = 0, n = [], r = {}, l = [];
  function i(o) {
    var s = r[o] = {
      onStack: !0,
      lowlink: t,
      index: t++
    };
    if (n.push(o), e.successors(o).forEach(function(c) {
      Object.hasOwn(r, c) ? r[c].onStack && (s.lowlink = Math.min(s.lowlink, r[c].index)) : (i(c), s.lowlink = Math.min(s.lowlink, r[c].lowlink));
    }), s.lowlink === s.index) {
      var a = [], u;
      do
        u = n.pop(), r[u].onStack = !1, a.push(u);
      while (o !== u);
      l.push(a);
    }
  }
  return e.nodes().forEach(function(o) {
    Object.hasOwn(r, o) || i(o);
  }), l;
}
var Gm = Jd, Qm = Ym;
function Ym(e) {
  return Gm(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var Km = qm, Xm = () => 1;
function qm(e, t, n) {
  return Jm(
    e,
    t || Xm,
    n || function(r) {
      return e.outEdges(r);
    }
  );
}
function Jm(e, t, n) {
  var r = {}, l = e.nodes();
  return l.forEach(function(i) {
    r[i] = {}, r[i][i] = { distance: 0 }, l.forEach(function(o) {
      i !== o && (r[i][o] = { distance: Number.POSITIVE_INFINITY });
    }), n(i).forEach(function(o) {
      var s = o.v === i ? o.w : o.v, a = t(o);
      r[i][s] = { distance: a, predecessor: i };
    });
  }), l.forEach(function(i) {
    var o = r[i];
    l.forEach(function(s) {
      var a = r[s];
      l.forEach(function(u) {
        var c = a[i], f = o[u], h = a[u], g = c.distance + f.distance;
        g < h.distance && (h.distance = g, h.predecessor = f.predecessor);
      });
    });
  }), r;
}
function Zd(e) {
  var t = {}, n = {}, r = [];
  function l(i) {
    if (Object.hasOwn(n, i))
      throw new Vo();
    Object.hasOwn(t, i) || (n[i] = !0, t[i] = !0, e.predecessors(i).forEach(l), delete n[i], r.push(i));
  }
  if (e.sinks().forEach(l), Object.keys(t).length !== e.nodeCount())
    throw new Vo();
  return r;
}
class Vo extends Error {
  constructor() {
    super(...arguments);
  }
}
var ef = Zd;
Zd.CycleException = Vo;
var su = ef, Zm = eg;
function eg(e) {
  try {
    su(e);
  } catch (t) {
    if (t instanceof su.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var tf = tg;
function tg(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var r = e.isDirected() ? (s) => e.successors(s) : (s) => e.neighbors(s), l = n === "post" ? ng : rg, i = [], o = {};
  return t.forEach((s) => {
    if (!e.hasNode(s))
      throw new Error("Graph does not have node: " + s);
    l(s, r, o, i);
  }), i;
}
function ng(e, t, n, r) {
  for (var l = [[e, !1]]; l.length > 0; ) {
    var i = l.pop();
    i[1] ? r.push(i[0]) : Object.hasOwn(n, i[0]) || (n[i[0]] = !0, l.push([i[0], !0]), nf(t(i[0]), (o) => l.push([o, !1])));
  }
}
function rg(e, t, n, r) {
  for (var l = [e]; l.length > 0; ) {
    var i = l.pop();
    Object.hasOwn(n, i) || (n[i] = !0, r.push(i), nf(t(i), (o) => l.push(o)));
  }
}
function nf(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var lg = tf, ig = og;
function og(e, t) {
  return lg(e, t, "post");
}
var sg = tf, ag = ug;
function ug(e, t) {
  return sg(e, t, "pre");
}
var cg = As, dg = Xd, fg = pg;
function pg(e, t) {
  var n = new cg(), r = {}, l = new dg(), i;
  function o(a) {
    var u = a.v === i ? a.w : a.v, c = l.priority(u);
    if (c !== void 0) {
      var f = t(a);
      f < c && (r[u] = i, l.decrease(u, f));
    }
  }
  if (e.nodeCount() === 0)
    return n;
  e.nodes().forEach(function(a) {
    l.add(a, Number.POSITIVE_INFINITY), n.setNode(a);
  }), l.decrease(e.nodes()[0], 0);
  for (var s = !1; l.size() > 0; ) {
    if (i = l.removeMin(), Object.hasOwn(r, i))
      n.setEdge(i, r[i]);
    else {
      if (s)
        throw new Error("Input graph is not connected: " + e);
      s = !0;
    }
    e.nodeEdges(i).forEach(o);
  }
  return n;
}
var hg = {
  components: Pm,
  dijkstra: qd,
  dijkstraAll: Bm,
  findCycles: Qm,
  floydWarshall: Km,
  isAcyclic: Zm,
  postorder: ig,
  preorder: ag,
  prim: fg,
  tarjan: Jd,
  topsort: ef
}, au = Cm, tt = {
  Graph: au.Graph,
  json: Om,
  alg: hg,
  version: au.version
};
let mg = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return uu(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && uu(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, r = n._prev;
    for (; r !== n; )
      t.push(JSON.stringify(r, gg)), r = r._prev;
    return "[" + t.join(", ") + "]";
  }
};
function uu(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function gg(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var vg = mg;
let yg = tt.Graph, xg = vg;
var wg = Eg;
let kg = () => 1;
function Eg(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = bg(e, t || kg);
  return _g(n.graph, n.buckets, n.zeroIdx).flatMap((l) => e.outEdges(l.v, l.w));
}
function _g(e, t, n) {
  let r = [], l = t[t.length - 1], i = t[0], o;
  for (; e.nodeCount(); ) {
    for (; o = i.dequeue(); )
      Bi(e, t, n, o);
    for (; o = l.dequeue(); )
      Bi(e, t, n, o);
    if (e.nodeCount()) {
      for (let s = t.length - 2; s > 0; --s)
        if (o = t[s].dequeue(), o) {
          r = r.concat(Bi(e, t, n, o, !0));
          break;
        }
    }
  }
  return r;
}
function Bi(e, t, n, r, l) {
  let i = l ? [] : void 0;
  return e.inEdges(r.v).forEach((o) => {
    let s = e.edge(o), a = e.node(o.v);
    l && i.push({ v: o.v, w: o.w }), a.out -= s, Bo(t, n, a);
  }), e.outEdges(r.v).forEach((o) => {
    let s = e.edge(o), a = o.w, u = e.node(a);
    u.in -= s, Bo(t, n, u);
  }), e.removeNode(r.v), i;
}
function bg(e, t) {
  let n = new yg(), r = 0, l = 0;
  e.nodes().forEach((s) => {
    n.setNode(s, { v: s, in: 0, out: 0 });
  }), e.edges().forEach((s) => {
    let a = n.edge(s.v, s.w) || 0, u = t(s), c = a + u;
    n.setEdge(s.v, s.w, c), l = Math.max(l, n.node(s.v).out += u), r = Math.max(r, n.node(s.w).in += u);
  });
  let i = Sg(l + r + 3).map(() => new xg()), o = r + 1;
  return n.nodes().forEach((s) => {
    Bo(i, o, n.node(s));
  }), { graph: n, buckets: i, zeroIdx: o };
}
function Bo(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Sg(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let rf = tt.Graph;
var ie = {
  addBorderNode: Ig,
  addDummyNode: lf,
  applyWithChunking: si,
  asNonCompoundGraph: Ng,
  buildLayerMatrix: $g,
  intersectRect: Og,
  mapValues: Ug,
  maxRank: sf,
  normalizeRanks: Lg,
  notime: Dg,
  partition: zg,
  pick: Ag,
  predecessorWeights: Mg,
  range: uf,
  removeEmptyRanks: Tg,
  simplify: jg,
  successorWeights: Cg,
  time: Rg,
  uniqueId: af,
  zipObject: Us
};
function lf(e, t, n, r) {
  for (var l = r; e.hasNode(l); )
    l = af(r);
  return n.dummy = t, e.setNode(l, n), l;
}
function jg(e) {
  let t = new rf().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let r = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, l = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: r.weight + l.weight,
      minlen: Math.max(r.minlen, l.minlen)
    });
  }), t;
}
function Ng(e) {
  let t = new rf({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Cg(e) {
  let t = e.nodes().map((n) => {
    let r = {};
    return e.outEdges(n).forEach((l) => {
      r[l.w] = (r[l.w] || 0) + e.edge(l).weight;
    }), r;
  });
  return Us(e.nodes(), t);
}
function Mg(e) {
  let t = e.nodes().map((n) => {
    let r = {};
    return e.inEdges(n).forEach((l) => {
      r[l.v] = (r[l.v] || 0) + e.edge(l).weight;
    }), r;
  });
  return Us(e.nodes(), t);
}
function Og(e, t) {
  let n = e.x, r = e.y, l = t.x - n, i = t.y - r, o = e.width / 2, s = e.height / 2;
  if (!l && !i)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let a, u;
  return Math.abs(i) * o > Math.abs(l) * s ? (i < 0 && (s = -s), a = s * l / i, u = s) : (l < 0 && (o = -o), a = o, u = o * i / l), { x: n + a, y: r + u };
}
function $g(e) {
  let t = uf(sf(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let r = e.node(n), l = r.rank;
    l !== void 0 && (t[l][r.order] = n);
  }), t;
}
function Lg(e) {
  let t = e.nodes().map((r) => {
    let l = e.node(r).rank;
    return l === void 0 ? Number.MAX_VALUE : l;
  }), n = si(Math.min, t);
  e.nodes().forEach((r) => {
    let l = e.node(r);
    Object.hasOwn(l, "rank") && (l.rank -= n);
  });
}
function Tg(e) {
  let t = e.nodes().map((o) => e.node(o).rank), n = si(Math.min, t), r = [];
  e.nodes().forEach((o) => {
    let s = e.node(o).rank - n;
    r[s] || (r[s] = []), r[s].push(o);
  });
  let l = 0, i = e.graph().nodeRankFactor;
  Array.from(r).forEach((o, s) => {
    o === void 0 && s % i !== 0 ? --l : o !== void 0 && l && o.forEach((a) => e.node(a).rank += l);
  });
}
function Ig(e, t, n, r) {
  let l = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (l.rank = n, l.order = r), lf(e, "border", l, t);
}
function Pg(e, t = of) {
  const n = [];
  for (let r = 0; r < e.length; r += t) {
    const l = e.slice(r, r + t);
    n.push(l);
  }
  return n;
}
const of = 65535;
function si(e, t) {
  if (t.length > of) {
    const n = Pg(t);
    return e.apply(null, n.map((r) => e.apply(null, r)));
  } else
    return e.apply(null, t);
}
function sf(e) {
  const n = e.nodes().map((r) => {
    let l = e.node(r).rank;
    return l === void 0 ? Number.MIN_VALUE : l;
  });
  return si(Math.max, n);
}
function zg(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((r) => {
    t(r) ? n.lhs.push(r) : n.rhs.push(r);
  }), n;
}
function Rg(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function Dg(e, t) {
  return t();
}
let Fg = 0;
function af(e) {
  var t = ++Fg;
  return e + ("" + t);
}
function uf(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let r = (i) => i < t;
  n < 0 && (r = (i) => t < i);
  const l = [];
  for (let i = e; r(i); i += n)
    l.push(i);
  return l;
}
function Ag(e, t) {
  const n = {};
  for (const r of t)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function Ug(e, t) {
  let n = t;
  return typeof t == "string" && (n = (r) => r[t]), Object.entries(e).reduce((r, [l, i]) => (r[l] = n(i, l), r), {});
}
function Us(e, t) {
  return e.reduce((n, r, l) => (n[r] = t[l], n), {});
}
let Vg = wg, Bg = ie.uniqueId;
var Wg = {
  run: Hg,
  undo: Qg
};
function Hg(e) {
  (e.graph().acyclicer === "greedy" ? Vg(e, n(e)) : Gg(e)).forEach((r) => {
    let l = e.edge(r);
    e.removeEdge(r), l.forwardName = r.name, l.reversed = !0, e.setEdge(r.w, r.v, l, Bg("rev"));
  });
  function n(r) {
    return (l) => r.edge(l).weight;
  }
}
function Gg(e) {
  let t = [], n = {}, r = {};
  function l(i) {
    Object.hasOwn(r, i) || (r[i] = !0, n[i] = !0, e.outEdges(i).forEach((o) => {
      Object.hasOwn(n, o.w) ? t.push(o) : l(o.w);
    }), delete n[i]);
  }
  return e.nodes().forEach(l), t;
}
function Qg(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let r = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, r);
    }
  });
}
let Yg = ie;
var Kg = {
  run: Xg,
  undo: Jg
};
function Xg(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => qg(e, t));
}
function qg(e, t) {
  let n = t.v, r = e.node(n).rank, l = t.w, i = e.node(l).rank, o = t.name, s = e.edge(t), a = s.labelRank;
  if (i === r + 1) return;
  e.removeEdge(t);
  let u, c, f;
  for (f = 0, ++r; r < i; ++f, ++r)
    s.points = [], c = {
      width: 0,
      height: 0,
      edgeLabel: s,
      edgeObj: t,
      rank: r
    }, u = Yg.addDummyNode(e, "edge", c, "_d"), r === a && (c.width = s.width, c.height = s.height, c.dummy = "edge-label", c.labelpos = s.labelpos), e.setEdge(n, u, { weight: s.weight }, o), f === 0 && e.graph().dummyChains.push(u), n = u;
  e.setEdge(n, l, { weight: s.weight }, o);
}
function Jg(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), r = n.edgeLabel, l;
    for (e.setEdge(n.edgeObj, r); n.dummy; )
      l = e.successors(t)[0], e.removeNode(t), r.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (r.x = n.x, r.y = n.y, r.width = n.width, r.height = n.height), t = l, n = e.node(t);
  });
}
const { applyWithChunking: Zg } = ie;
var ai = {
  longestPath: ev,
  slack: tv
};
function ev(e) {
  var t = {};
  function n(r) {
    var l = e.node(r);
    if (Object.hasOwn(t, r))
      return l.rank;
    t[r] = !0;
    let i = e.outEdges(r).map((s) => s == null ? Number.POSITIVE_INFINITY : n(s.w) - e.edge(s).minlen);
    var o = Zg(Math.min, i);
    return o === Number.POSITIVE_INFINITY && (o = 0), l.rank = o;
  }
  e.sources().forEach(n);
}
function tv(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var nv = tt.Graph, Vl = ai.slack, cf = rv;
function rv(e) {
  var t = new nv({ directed: !1 }), n = e.nodes()[0], r = e.nodeCount();
  t.setNode(n, {});
  for (var l, i; lv(t, e) < r; )
    l = iv(t, e), i = t.hasNode(l.v) ? Vl(e, l) : -Vl(e, l), ov(t, e, i);
  return t;
}
function lv(e, t) {
  function n(r) {
    t.nodeEdges(r).forEach((l) => {
      var i = l.v, o = r === i ? l.w : i;
      !e.hasNode(o) && !Vl(t, l) && (e.setNode(o, {}), e.setEdge(r, o, {}), n(o));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function iv(e, t) {
  return t.edges().reduce((r, l) => {
    let i = Number.POSITIVE_INFINITY;
    return e.hasNode(l.v) !== e.hasNode(l.w) && (i = Vl(t, l)), i < r[0] ? [i, l] : r;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function ov(e, t, n) {
  e.nodes().forEach((r) => t.node(r).rank += n);
}
var sv = cf, cu = ai.slack, av = ai.longestPath, uv = tt.alg.preorder, cv = tt.alg.postorder, dv = ie.simplify, fv = an;
an.initLowLimValues = Bs;
an.initCutValues = Vs;
an.calcCutValue = df;
an.leaveEdge = pf;
an.enterEdge = hf;
an.exchangeEdges = mf;
function an(e) {
  e = dv(e), av(e);
  var t = sv(e);
  Bs(t), Vs(t, e);
  for (var n, r; n = pf(t); )
    r = hf(t, e, n), mf(t, e, n, r);
}
function Vs(e, t) {
  var n = cv(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((r) => pv(e, t, r));
}
function pv(e, t, n) {
  var r = e.node(n), l = r.parent;
  e.edge(n, l).cutvalue = df(e, t, n);
}
function df(e, t, n) {
  var r = e.node(n), l = r.parent, i = !0, o = t.edge(n, l), s = 0;
  return o || (i = !1, o = t.edge(l, n)), s = o.weight, t.nodeEdges(n).forEach((a) => {
    var u = a.v === n, c = u ? a.w : a.v;
    if (c !== l) {
      var f = u === i, h = t.edge(a).weight;
      if (s += f ? h : -h, mv(e, n, c)) {
        var g = e.edge(n, c).cutvalue;
        s += f ? -g : g;
      }
    }
  }), s;
}
function Bs(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), ff(e, {}, 1, t);
}
function ff(e, t, n, r, l) {
  var i = n, o = e.node(r);
  return t[r] = !0, e.neighbors(r).forEach((s) => {
    Object.hasOwn(t, s) || (n = ff(e, t, n, s, r));
  }), o.low = i, o.lim = n++, l ? o.parent = l : delete o.parent, n;
}
function pf(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function hf(e, t, n) {
  var r = n.v, l = n.w;
  t.hasEdge(r, l) || (r = n.w, l = n.v);
  var i = e.node(r), o = e.node(l), s = i, a = !1;
  i.lim > o.lim && (s = o, a = !0);
  var u = t.edges().filter((c) => a === du(e, e.node(c.v), s) && a !== du(e, e.node(c.w), s));
  return u.reduce((c, f) => cu(t, f) < cu(t, c) ? f : c);
}
function mf(e, t, n, r) {
  var l = n.v, i = n.w;
  e.removeEdge(l, i), e.setEdge(r.v, r.w, {}), Bs(e), Vs(e, t), hv(e, t);
}
function hv(e, t) {
  var n = e.nodes().find((l) => !t.node(l).parent), r = uv(e, n);
  r = r.slice(1), r.forEach((l) => {
    var i = e.node(l).parent, o = t.edge(l, i), s = !1;
    o || (o = t.edge(i, l), s = !0), t.node(l).rank = t.node(i).rank + (s ? o.minlen : -o.minlen);
  });
}
function mv(e, t, n) {
  return e.hasEdge(t, n);
}
function du(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var gv = ai, gf = gv.longestPath, vv = cf, yv = fv, xv = wv;
function wv(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      fu(e);
      break;
    case "tight-tree":
      Ev(e);
      break;
    case "longest-path":
      kv(e);
      break;
    case "none":
      break;
    default:
      fu(e);
  }
}
var kv = gf;
function Ev(e) {
  gf(e), vv(e);
}
function fu(e) {
  yv(e);
}
var _v = bv;
function bv(e) {
  let t = jv(e);
  e.graph().dummyChains.forEach((n) => {
    let r = e.node(n), l = r.edgeObj, i = Sv(e, t, l.v, l.w), o = i.path, s = i.lca, a = 0, u = o[a], c = !0;
    for (; n !== l.w; ) {
      if (r = e.node(n), c) {
        for (; (u = o[a]) !== s && e.node(u).maxRank < r.rank; )
          a++;
        u === s && (c = !1);
      }
      if (!c) {
        for (; a < o.length - 1 && e.node(u = o[a + 1]).minRank <= r.rank; )
          a++;
        u = o[a];
      }
      e.setParent(n, u), n = e.successors(n)[0];
    }
  });
}
function Sv(e, t, n, r) {
  let l = [], i = [], o = Math.min(t[n].low, t[r].low), s = Math.max(t[n].lim, t[r].lim), a, u;
  a = n;
  do
    a = e.parent(a), l.push(a);
  while (a && (t[a].low > o || s > t[a].lim));
  for (u = a, a = r; (a = e.parent(a)) !== u; )
    i.push(a);
  return { path: l.concat(i.reverse()), lca: u };
}
function jv(e) {
  let t = {}, n = 0;
  function r(l) {
    let i = n;
    e.children(l).forEach(r), t[l] = { low: i, lim: n++ };
  }
  return e.children().forEach(r), t;
}
let Bl = ie;
var Nv = {
  run: Cv,
  cleanup: $v
};
function Cv(e) {
  let t = Bl.addDummyNode(e, "root", {}, "_root"), n = Mv(e), r = Object.values(n), l = Bl.applyWithChunking(Math.max, r) - 1, i = 2 * l + 1;
  e.graph().nestingRoot = t, e.edges().forEach((s) => e.edge(s).minlen *= i);
  let o = Ov(e) + 1;
  e.children().forEach((s) => vf(e, t, i, o, l, n, s)), e.graph().nodeRankFactor = i;
}
function vf(e, t, n, r, l, i, o) {
  let s = e.children(o);
  if (!s.length) {
    o !== t && e.setEdge(t, o, { weight: 0, minlen: n });
    return;
  }
  let a = Bl.addBorderNode(e, "_bt"), u = Bl.addBorderNode(e, "_bb"), c = e.node(o);
  e.setParent(a, o), c.borderTop = a, e.setParent(u, o), c.borderBottom = u, s.forEach((f) => {
    vf(e, t, n, r, l, i, f);
    let h = e.node(f), g = h.borderTop ? h.borderTop : f, x = h.borderBottom ? h.borderBottom : f, k = h.borderTop ? r : 2 * r, C = g !== x ? 1 : l - i[o] + 1;
    e.setEdge(a, g, {
      weight: k,
      minlen: C,
      nestingEdge: !0
    }), e.setEdge(x, u, {
      weight: k,
      minlen: C,
      nestingEdge: !0
    });
  }), e.parent(o) || e.setEdge(t, a, { weight: 0, minlen: l + i[o] });
}
function Mv(e) {
  var t = {};
  function n(r, l) {
    var i = e.children(r);
    i && i.length && i.forEach((o) => n(o, l + 1)), t[r] = l;
  }
  return e.children().forEach((r) => n(r, 1)), t;
}
function Ov(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function $v(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var r = e.edge(n);
    r.nestingEdge && e.removeEdge(n);
  });
}
let Lv = ie;
var Tv = Iv;
function Iv(e) {
  function t(n) {
    let r = e.children(n), l = e.node(n);
    if (r.length && r.forEach(t), Object.hasOwn(l, "minRank")) {
      l.borderLeft = [], l.borderRight = [];
      for (let i = l.minRank, o = l.maxRank + 1; i < o; ++i)
        pu(e, "borderLeft", "_bl", n, l, i), pu(e, "borderRight", "_br", n, l, i);
    }
  }
  e.children().forEach(t);
}
function pu(e, t, n, r, l, i) {
  let o = { width: 0, height: 0, rank: i, borderType: t }, s = l[t][i - 1], a = Lv.addDummyNode(e, "border", o, n);
  l[t][i] = a, e.setParent(a, r), s && e.setEdge(s, a, { weight: 1 });
}
var Pv = {
  adjust: zv,
  undo: Rv
};
function zv(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && yf(e);
}
function Rv(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && Dv(e), (t === "lr" || t === "rl") && (Fv(e), yf(e));
}
function yf(e) {
  e.nodes().forEach((t) => hu(e.node(t))), e.edges().forEach((t) => hu(e.edge(t)));
}
function hu(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function Dv(e) {
  e.nodes().forEach((t) => Wi(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Wi), Object.hasOwn(n, "y") && Wi(n);
  });
}
function Wi(e) {
  e.y = -e.y;
}
function Fv(e) {
  e.nodes().forEach((t) => Hi(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Hi), Object.hasOwn(n, "x") && Hi(n);
  });
}
function Hi(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let mu = ie;
var Av = Uv;
function Uv(e) {
  let t = {}, n = e.nodes().filter((a) => !e.children(a).length), r = n.map((a) => e.node(a).rank), l = mu.applyWithChunking(Math.max, r), i = mu.range(l + 1).map(() => []);
  function o(a) {
    if (t[a]) return;
    t[a] = !0;
    let u = e.node(a);
    i[u.rank].push(a), e.successors(a).forEach(o);
  }
  return n.sort((a, u) => e.node(a).rank - e.node(u).rank).forEach(o), i;
}
let Vv = ie.zipObject;
var Bv = Wv;
function Wv(e, t) {
  let n = 0;
  for (let r = 1; r < t.length; ++r)
    n += Hv(e, t[r - 1], t[r]);
  return n;
}
function Hv(e, t, n) {
  let r = Vv(n, n.map((u, c) => c)), l = t.flatMap((u) => e.outEdges(u).map((c) => ({ pos: r[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), i = 1;
  for (; i < n.length; ) i <<= 1;
  let o = 2 * i - 1;
  i -= 1;
  let s = new Array(o).fill(0), a = 0;
  return l.forEach((u) => {
    let c = u.pos + i;
    s[c] += u.weight;
    let f = 0;
    for (; c > 0; )
      c % 2 && (f += s[c + 1]), c = c - 1 >> 1, s[c] += u.weight;
    a += u.weight * f;
  }), a;
}
var Gv = Qv;
function Qv(e, t = []) {
  return t.map((n) => {
    let r = e.inEdges(n);
    if (r.length) {
      let l = r.reduce((i, o) => {
        let s = e.edge(o), a = e.node(o.v);
        return {
          sum: i.sum + s.weight * a.order,
          weight: i.weight + s.weight
        };
      }, { sum: 0, weight: 0 });
      return {
        v: n,
        barycenter: l.sum / l.weight,
        weight: l.weight
      };
    } else
      return { v: n };
  });
}
let Yv = ie;
var Kv = Xv;
function Xv(e, t) {
  let n = {};
  e.forEach((l, i) => {
    let o = n[l.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [l.v],
      i
    };
    l.barycenter !== void 0 && (o.barycenter = l.barycenter, o.weight = l.weight);
  }), t.edges().forEach((l) => {
    let i = n[l.v], o = n[l.w];
    i !== void 0 && o !== void 0 && (o.indegree++, i.out.push(n[l.w]));
  });
  let r = Object.values(n).filter((l) => !l.indegree);
  return qv(r);
}
function qv(e) {
  let t = [];
  function n(l) {
    return (i) => {
      i.merged || (i.barycenter === void 0 || l.barycenter === void 0 || i.barycenter >= l.barycenter) && Jv(l, i);
    };
  }
  function r(l) {
    return (i) => {
      i.in.push(l), --i.indegree === 0 && e.push(i);
    };
  }
  for (; e.length; ) {
    let l = e.pop();
    t.push(l), l.in.reverse().forEach(n(l)), l.out.forEach(r(l));
  }
  return t.filter((l) => !l.merged).map((l) => Yv.pick(l, ["vs", "i", "barycenter", "weight"]));
}
function Jv(e, t) {
  let n = 0, r = 0;
  e.weight && (n += e.barycenter * e.weight, r += e.weight), t.weight && (n += t.barycenter * t.weight, r += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / r, e.weight = r, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let Zv = ie;
var ey = ty;
function ty(e, t) {
  let n = Zv.partition(e, (c) => Object.hasOwn(c, "barycenter")), r = n.lhs, l = n.rhs.sort((c, f) => f.i - c.i), i = [], o = 0, s = 0, a = 0;
  r.sort(ny(!!t)), a = gu(i, l, a), r.forEach((c) => {
    a += c.vs.length, i.push(c.vs), o += c.barycenter * c.weight, s += c.weight, a = gu(i, l, a);
  });
  let u = { vs: i.flat(!0) };
  return s && (u.barycenter = o / s, u.weight = s), u;
}
function gu(e, t, n) {
  let r;
  for (; t.length && (r = t[t.length - 1]).i <= n; )
    t.pop(), e.push(r.vs), n++;
  return n;
}
function ny(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let ry = Gv, ly = Kv, iy = ey;
var oy = xf;
function xf(e, t, n, r) {
  let l = e.children(t), i = e.node(t), o = i ? i.borderLeft : void 0, s = i ? i.borderRight : void 0, a = {};
  o && (l = l.filter((h) => h !== o && h !== s));
  let u = ry(e, l);
  u.forEach((h) => {
    if (e.children(h.v).length) {
      let g = xf(e, h.v, n, r);
      a[h.v] = g, Object.hasOwn(g, "barycenter") && ay(h, g);
    }
  });
  let c = ly(u, n);
  sy(c, a);
  let f = iy(c, r);
  if (o && (f.vs = [o, f.vs, s].flat(!0), e.predecessors(o).length)) {
    let h = e.node(e.predecessors(o)[0]), g = e.node(e.predecessors(s)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + g.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function sy(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((r) => t[r] ? t[r].vs : r);
  });
}
function ay(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let uy = tt.Graph, cy = ie;
var dy = fy;
function fy(e, t, n, r) {
  r || (r = e.nodes());
  let l = py(e), i = new uy({ compound: !0 }).setGraph({ root: l }).setDefaultNodeLabel((o) => e.node(o));
  return r.forEach((o) => {
    let s = e.node(o), a = e.parent(o);
    (s.rank === t || s.minRank <= t && t <= s.maxRank) && (i.setNode(o), i.setParent(o, a || l), e[n](o).forEach((u) => {
      let c = u.v === o ? u.w : u.v, f = i.edge(c, o), h = f !== void 0 ? f.weight : 0;
      i.setEdge(c, o, { weight: e.edge(u).weight + h });
    }), Object.hasOwn(s, "minRank") && i.setNode(o, {
      borderLeft: s.borderLeft[t],
      borderRight: s.borderRight[t]
    }));
  }), i;
}
function py(e) {
  for (var t; e.hasNode(t = cy.uniqueId("_root")); ) ;
  return t;
}
var hy = my;
function my(e, t, n) {
  let r = {}, l;
  n.forEach((i) => {
    let o = e.parent(i), s, a;
    for (; o; ) {
      if (s = e.parent(o), s ? (a = r[s], r[s] = o) : (a = l, l = o), a && a !== o) {
        t.setEdge(a, o);
        return;
      }
      o = s;
    }
  });
}
let gy = Av, vy = Bv, yy = oy, xy = dy, wy = hy, ky = tt.Graph, il = ie;
var Ey = wf;
function wf(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, wf);
    return;
  }
  let n = il.maxRank(e), r = vu(e, il.range(1, n + 1), "inEdges"), l = vu(e, il.range(n - 1, -1, -1), "outEdges"), i = gy(e);
  if (yu(e, i), t && t.disableOptimalOrderHeuristic)
    return;
  let o = Number.POSITIVE_INFINITY, s;
  for (let a = 0, u = 0; u < 4; ++a, ++u) {
    _y(a % 2 ? r : l, a % 4 >= 2), i = il.buildLayerMatrix(e);
    let c = vy(e, i);
    c < o && (u = 0, s = Object.assign({}, i), o = c);
  }
  yu(e, s);
}
function vu(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i, o) => {
    r.has(i) || r.set(i, []), r.get(i).push(o);
  };
  for (const i of e.nodes()) {
    const o = e.node(i);
    if (typeof o.rank == "number" && l(o.rank, i), typeof o.minRank == "number" && typeof o.maxRank == "number")
      for (let s = o.minRank; s <= o.maxRank; s++)
        s !== o.rank && l(s, i);
  }
  return t.map(function(i) {
    return xy(e, i, n, r.get(i) || []);
  });
}
function _y(e, t) {
  let n = new ky();
  e.forEach(function(r) {
    let l = r.graph().root, i = yy(r, l, n, t);
    i.vs.forEach((o, s) => r.node(o).order = s), wy(r, n, i.vs);
  });
}
function yu(e, t) {
  Object.values(t).forEach((n) => n.forEach((r, l) => e.node(r).order = l));
}
let by = tt.Graph, ht = ie;
var Sy = {
  positionX: zy
};
function jy(e, t) {
  let n = {};
  function r(l, i) {
    let o = 0, s = 0, a = l.length, u = i[i.length - 1];
    return i.forEach((c, f) => {
      let h = Cy(e, c), g = h ? e.node(h).order : a;
      (h || c === u) && (i.slice(s, f + 1).forEach((x) => {
        e.predecessors(x).forEach((k) => {
          let C = e.node(k), p = C.order;
          (p < o || g < p) && !(C.dummy && e.node(x).dummy) && kf(n, k, x);
        });
      }), s = f + 1, o = g);
    }), i;
  }
  return t.length && t.reduce(r), n;
}
function Ny(e, t) {
  let n = {};
  function r(i, o, s, a, u) {
    let c;
    ht.range(o, s).forEach((f) => {
      c = i[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let g = e.node(h);
        g.dummy && (g.order < a || g.order > u) && kf(n, h, c);
      });
    });
  }
  function l(i, o) {
    let s = -1, a, u = 0;
    return o.forEach((c, f) => {
      if (e.node(c).dummy === "border") {
        let h = e.predecessors(c);
        h.length && (a = e.node(h[0]).order, r(o, u, f, s, a), u = f, s = a);
      }
      r(o, u, o.length, a, i.length);
    }), o;
  }
  return t.length && t.reduce(l), n;
}
function Cy(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function kf(e, t, n) {
  if (t > n) {
    let l = t;
    t = n, n = l;
  }
  let r = e[t];
  r || (e[t] = r = {}), r[n] = !0;
}
function My(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function Oy(e, t, n, r) {
  let l = {}, i = {}, o = {};
  return t.forEach((s) => {
    s.forEach((a, u) => {
      l[a] = a, i[a] = a, o[a] = u;
    });
  }), t.forEach((s) => {
    let a = -1;
    s.forEach((u) => {
      let c = r(u);
      if (c.length) {
        c = c.sort((h, g) => o[h] - o[g]);
        let f = (c.length - 1) / 2;
        for (let h = Math.floor(f), g = Math.ceil(f); h <= g; ++h) {
          let x = c[h];
          i[u] === u && a < o[x] && !My(n, u, x) && (i[x] = u, i[u] = l[u] = l[x], a = o[x]);
        }
      }
    });
  }), { root: l, align: i };
}
function $y(e, t, n, r, l) {
  let i = {}, o = Ly(e, t, n, l), s = l ? "borderLeft" : "borderRight";
  function a(f, h) {
    let g = o.nodes(), x = g.pop(), k = {};
    for (; x; )
      k[x] ? f(x) : (k[x] = !0, g.push(x), g = g.concat(h(x))), x = g.pop();
  }
  function u(f) {
    i[f] = o.inEdges(f).reduce((h, g) => Math.max(h, i[g.v] + o.edge(g)), 0);
  }
  function c(f) {
    let h = o.outEdges(f).reduce((x, k) => Math.min(x, i[k.w] - o.edge(k)), Number.POSITIVE_INFINITY), g = e.node(f);
    h !== Number.POSITIVE_INFINITY && g.borderType !== s && (i[f] = Math.max(i[f], h));
  }
  return a(u, o.predecessors.bind(o)), a(c, o.successors.bind(o)), Object.keys(r).forEach((f) => i[f] = i[n[f]]), i;
}
function Ly(e, t, n, r) {
  let l = new by(), i = e.graph(), o = Ry(i.nodesep, i.edgesep, r);
  return t.forEach((s) => {
    let a;
    s.forEach((u) => {
      let c = n[u];
      if (l.setNode(c), a) {
        var f = n[a], h = l.edge(f, c);
        l.setEdge(f, c, Math.max(o(e, u, a), h || 0));
      }
      a = u;
    });
  }), l;
}
function Ty(e, t) {
  return Object.values(t).reduce((n, r) => {
    let l = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    Object.entries(r).forEach(([s, a]) => {
      let u = Dy(e, s) / 2;
      l = Math.max(a + u, l), i = Math.min(a - u, i);
    });
    const o = l - i;
    return o < n[0] && (n = [o, r]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Iy(e, t) {
  let n = Object.values(t), r = ht.applyWithChunking(Math.min, n), l = ht.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((i) => {
    ["l", "r"].forEach((o) => {
      let s = i + o, a = e[s];
      if (a === t) return;
      let u = Object.values(a), c = r - ht.applyWithChunking(Math.min, u);
      o !== "l" && (c = l - ht.applyWithChunking(Math.max, u)), c && (e[s] = ht.mapValues(a, (f) => f + c));
    });
  });
}
function Py(e, t) {
  return ht.mapValues(e.ul, (n, r) => {
    if (t)
      return e[t.toLowerCase()][r];
    {
      let l = Object.values(e).map((i) => i[r]).sort((i, o) => i - o);
      return (l[1] + l[2]) / 2;
    }
  });
}
function zy(e) {
  let t = ht.buildLayerMatrix(e), n = Object.assign(
    jy(e, t),
    Ny(e, t)
  ), r = {}, l;
  ["u", "d"].forEach((o) => {
    l = o === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((s) => {
      s === "r" && (l = l.map((f) => Object.values(f).reverse()));
      let a = (o === "u" ? e.predecessors : e.successors).bind(e), u = Oy(e, l, n, a), c = $y(
        e,
        l,
        u.root,
        u.align,
        s === "r"
      );
      s === "r" && (c = ht.mapValues(c, (f) => -f)), r[o + s] = c;
    });
  });
  let i = Ty(e, r);
  return Iy(r, i), Py(r, e.graph().align);
}
function Ry(e, t, n) {
  return (r, l, i) => {
    let o = r.node(l), s = r.node(i), a = 0, u;
    if (a += o.width / 2, Object.hasOwn(o, "labelpos"))
      switch (o.labelpos.toLowerCase()) {
        case "l":
          u = -o.width / 2;
          break;
        case "r":
          u = o.width / 2;
          break;
      }
    if (u && (a += n ? u : -u), u = 0, a += (o.dummy ? t : e) / 2, a += (s.dummy ? t : e) / 2, a += s.width / 2, Object.hasOwn(s, "labelpos"))
      switch (s.labelpos.toLowerCase()) {
        case "l":
          u = s.width / 2;
          break;
        case "r":
          u = -s.width / 2;
          break;
      }
    return u && (a += n ? u : -u), u = 0, a;
  };
}
function Dy(e, t) {
  return e.node(t).width;
}
let Ef = ie, Fy = Sy.positionX;
var Ay = Uy;
function Uy(e) {
  e = Ef.asNonCompoundGraph(e), Vy(e), Object.entries(Fy(e)).forEach(([t, n]) => e.node(t).x = n);
}
function Vy(e) {
  let t = Ef.buildLayerMatrix(e), n = e.graph().ranksep, r = 0;
  t.forEach((l) => {
    const i = l.reduce((o, s) => {
      const a = e.node(s).height;
      return o > a ? o : a;
    }, 0);
    l.forEach((o) => e.node(o).y = r + i / 2), r += i + n;
  });
}
let xu = Wg, wu = Kg, By = xv, Wy = ie.normalizeRanks, Hy = _v, Gy = ie.removeEmptyRanks, ku = Nv, Qy = Tv, Eu = Pv, Yy = Ey, Ky = Ay, Ge = ie, Xy = tt.Graph;
var qy = Jy;
function Jy(e, t) {
  let n = t && t.debugTiming ? Ge.time : Ge.notime;
  n("layout", () => {
    let r = n("  buildLayoutGraph", () => a0(e));
    n("  runLayout", () => Zy(r, n, t)), n("  updateInputGraph", () => e0(e, r));
  });
}
function Zy(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => u0(e)), t("    removeSelfEdges", () => y0(e)), t("    acyclic", () => xu.run(e)), t("    nestingGraph.run", () => ku.run(e)), t("    rank", () => By(Ge.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => c0(e)), t("    removeEmptyRanks", () => Gy(e)), t("    nestingGraph.cleanup", () => ku.cleanup(e)), t("    normalizeRanks", () => Wy(e)), t("    assignRankMinMax", () => d0(e)), t("    removeEdgeLabelProxies", () => f0(e)), t("    normalize.run", () => wu.run(e)), t("    parentDummyChains", () => Hy(e)), t("    addBorderSegments", () => Qy(e)), t("    order", () => Yy(e, n)), t("    insertSelfEdges", () => x0(e)), t("    adjustCoordinateSystem", () => Eu.adjust(e)), t("    position", () => Ky(e)), t("    positionSelfEdges", () => w0(e)), t("    removeBorderNodes", () => v0(e)), t("    normalize.undo", () => wu.undo(e)), t("    fixupEdgeLabelCoords", () => m0(e)), t("    undoCoordinateSystem", () => Eu.undo(e)), t("    translateGraph", () => p0(e)), t("    assignNodeIntersects", () => h0(e)), t("    reversePoints", () => g0(e)), t("    acyclic.undo", () => xu.undo(e));
}
function e0(e, t) {
  e.nodes().forEach((n) => {
    let r = e.node(n), l = t.node(n);
    r && (r.x = l.x, r.y = l.y, r.rank = l.rank, t.children(n).length && (r.width = l.width, r.height = l.height));
  }), e.edges().forEach((n) => {
    let r = e.edge(n), l = t.edge(n);
    r.points = l.points, Object.hasOwn(l, "x") && (r.x = l.x, r.y = l.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let t0 = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], n0 = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, r0 = ["acyclicer", "ranker", "rankdir", "align"], l0 = ["width", "height", "rank"], _u = { width: 0, height: 0 }, i0 = ["minlen", "weight", "width", "height", "labeloffset"], o0 = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, s0 = ["labelpos"];
function a0(e) {
  let t = new Xy({ multigraph: !0, compound: !0 }), n = Qi(e.graph());
  return t.setGraph(Object.assign(
    {},
    n0,
    Gi(n, t0),
    Ge.pick(n, r0)
  )), e.nodes().forEach((r) => {
    let l = Qi(e.node(r));
    const i = Gi(l, l0);
    Object.keys(_u).forEach((o) => {
      i[o] === void 0 && (i[o] = _u[o]);
    }), t.setNode(r, i), t.setParent(r, e.parent(r));
  }), e.edges().forEach((r) => {
    let l = Qi(e.edge(r));
    t.setEdge(r, Object.assign(
      {},
      o0,
      Gi(l, i0),
      Ge.pick(l, s0)
    ));
  }), t;
}
function u0(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let r = e.edge(n);
    r.minlen *= 2, r.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? r.width += r.labeloffset : r.height += r.labeloffset);
  });
}
function c0(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let r = e.node(t.v), i = { rank: (e.node(t.w).rank - r.rank) / 2 + r.rank, e: t };
      Ge.addDummyNode(e, "edge-proxy", i, "_ep");
    }
  });
}
function d0(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let r = e.node(n);
    r.borderTop && (r.minRank = e.node(r.borderTop).rank, r.maxRank = e.node(r.borderBottom).rank, t = Math.max(t, r.maxRank));
  }), e.graph().maxRank = t;
}
function f0(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function p0(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, r = Number.POSITIVE_INFINITY, l = 0, i = e.graph(), o = i.marginx || 0, s = i.marginy || 0;
  function a(u) {
    let c = u.x, f = u.y, h = u.width, g = u.height;
    t = Math.min(t, c - h / 2), n = Math.max(n, c + h / 2), r = Math.min(r, f - g / 2), l = Math.max(l, f + g / 2);
  }
  e.nodes().forEach((u) => a(e.node(u))), e.edges().forEach((u) => {
    let c = e.edge(u);
    Object.hasOwn(c, "x") && a(c);
  }), t -= o, r -= s, e.nodes().forEach((u) => {
    let c = e.node(u);
    c.x -= t, c.y -= r;
  }), e.edges().forEach((u) => {
    let c = e.edge(u);
    c.points.forEach((f) => {
      f.x -= t, f.y -= r;
    }), Object.hasOwn(c, "x") && (c.x -= t), Object.hasOwn(c, "y") && (c.y -= r);
  }), i.width = n - t + o, i.height = l - r + s;
}
function h0(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), r = e.node(t.v), l = e.node(t.w), i, o;
    n.points ? (i = n.points[0], o = n.points[n.points.length - 1]) : (n.points = [], i = l, o = r), n.points.unshift(Ge.intersectRect(r, i)), n.points.push(Ge.intersectRect(l, o));
  });
}
function m0(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (Object.hasOwn(n, "x"))
      switch ((n.labelpos === "l" || n.labelpos === "r") && (n.width -= n.labeloffset), n.labelpos) {
        case "l":
          n.x -= n.width / 2 + n.labeloffset;
          break;
        case "r":
          n.x += n.width / 2 + n.labeloffset;
          break;
      }
  });
}
function g0(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function v0(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), r = e.node(n.borderTop), l = e.node(n.borderBottom), i = e.node(n.borderLeft[n.borderLeft.length - 1]), o = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(o.x - i.x), n.height = Math.abs(l.y - r.y), n.x = i.x + n.width / 2, n.y = r.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function y0(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function x0(e) {
  var t = Ge.buildLayerMatrix(e);
  t.forEach((n) => {
    var r = 0;
    n.forEach((l, i) => {
      var o = e.node(l);
      o.order = i + r, (o.selfEdges || []).forEach((s) => {
        Ge.addDummyNode(e, "selfedge", {
          width: s.label.width,
          height: s.label.height,
          rank: o.rank,
          order: i + ++r,
          e: s.e,
          label: s.label
        }, "_se");
      }), delete o.selfEdges;
    });
  });
}
function w0(e) {
  e.nodes().forEach((t) => {
    var n = e.node(t);
    if (n.dummy === "selfedge") {
      var r = e.node(n.e.v), l = r.x + r.width / 2, i = r.y, o = n.x - l, s = r.height / 2;
      e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [
        { x: l + 2 * o / 3, y: i - s },
        { x: l + 5 * o / 6, y: i - s },
        { x: l + o, y: i },
        { x: l + 5 * o / 6, y: i + s },
        { x: l + 2 * o / 3, y: i + s }
      ], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
function Gi(e, t) {
  return Ge.mapValues(Ge.pick(e, t), Number);
}
function Qi(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, r]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = r;
  }), t;
}
let k0 = ie, E0 = tt.Graph;
var _0 = {
  debugOrdering: b0
};
function b0(e) {
  let t = k0.buildLayerMatrix(e), n = new E0({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((r) => {
    n.setNode(r, { label: r }), n.setParent(r, "layer" + e.node(r).rank);
  }), e.edges().forEach((r) => n.setEdge(r.v, r.w, {}, r.name)), t.forEach((r, l) => {
    let i = "layer" + l;
    n.setNode(i, { rank: "same" }), r.reduce((o, s) => (n.setEdge(o, s, { style: "invis" }), s));
  }), n;
}
var S0 = "1.1.8", j0 = {
  graphlib: tt,
  layout: qy,
  debug: _0,
  util: {
    time: ie.time,
    notime: ie.notime
  },
  version: S0
};
const bu = /* @__PURE__ */ Yf(j0), st = 46, Wl = 24, Wo = 8, N0 = 190, C0 = 440, M0 = (e) => e.type === "ManyToMany" || e.type === "OneToMany";
function O0(e, t, n, r) {
  if (r === "none") return [];
  const l = [];
  for (const i of e.fields) {
    if (e.kind === "enum") {
      l.push({ key: `v:${i.name}`, label: i.name, type: "", kind: "field", nullable: !1, unique: !1 });
      continue;
    }
    r === "keys" && !i.id && !i.unique || l.push({
      key: `f:${i.name}`,
      label: i.name,
      type: i.length ? `${i.type}(${i.length})` : i.type,
      kind: i.id ? "pk" : "field",
      nullable: i.nullable,
      unique: i.unique
    });
  }
  for (const i of t)
    if (i.source === e.id) {
      const o = n.get(i.target) || i.target;
      l.push({
        key: `r:${i.id}`,
        label: i.field,
        type: M0(i) ? `${o}[]` : o,
        kind: "fk",
        nullable: i.nullable,
        unique: i.type === "OneToOne",
        relation: i.id
      });
    }
  if (r === "all") {
    for (const i of t)
      if (i.target === e.id && i.inverseField && i.source !== i.target) {
        const o = n.get(i.source) || i.source;
        l.push({
          key: `i:${i.id}`,
          label: i.inverseField,
          type: i.type === "OneToOne" ? o : `${o}[]`,
          kind: "collection",
          nullable: !0,
          unique: !1,
          relation: i.id
        });
      }
  }
  return l;
}
function $0(e, t, n) {
  let r = Math.max(n(e.name, "title") + 56, n(e.table || e.kind, "type") + 40);
  for (const i of t)
    r = Math.max(r, n(i.label, "row") + n(i.type, "type") + 70);
  r = Math.min(C0, Math.max(N0, Math.ceil(r)));
  const l = st + t.length * Wl + (t.length ? Wo : 0);
  return { width: r, height: l };
}
function L0(e, t, n) {
  const r = new Set(e.map((c) => c.id)), l = /* @__PURE__ */ new Set(), i = [];
  for (const c of t)
    c.source !== c.target && r.has(c.source) && r.has(c.target) && (i.push([c.target, c.source]), l.add(c.source), l.add(c.target));
  for (const c of e)
    c.entity.parent && r.has(c.entity.parent) && (i.push([c.entity.parent, c.id]), l.add(c.id), l.add(c.entity.parent));
  const o = /* @__PURE__ */ new Map();
  let s = 0, a = 0;
  if (l.size) {
    const c = new bu.graphlib.Graph({ multigraph: !0 });
    c.setGraph({ rankdir: n, nodesep: 42, ranksep: 110, edgesep: 18, marginx: 0, marginy: 0 }), c.setDefaultEdgeLabel(() => ({}));
    for (const f of e)
      l.has(f.id) && c.setNode(f.id, { width: f.width, height: f.height });
    i.forEach(([f, h], g) => c.setEdge(f, h, {}, `e${g}`)), bu.layout(c);
    for (const f of c.nodes()) {
      const h = c.node(f), g = h.x - h.width / 2, x = h.y - h.height / 2;
      o.set(f, { x: g, y: x }), s = Math.max(s, g + h.width), a = Math.max(a, x + h.height);
    }
  }
  const u = e.filter((c) => !l.has(c.id));
  if (u.length) {
    const f = l.size ? a + 120 : 0, h = Math.max(s, 1400);
    let g = 0, x = f, k = 0;
    for (const C of u)
      g > 0 && g + C.width > h && (g = 0, x += k + 36, k = 0), o.set(C.id, { x: g, y: x }), g += C.width + 36, k = Math.max(k, C.height);
  }
  return o;
}
function Su(e, t, n = 1) {
  return { x: e.x + t.x * n, y: e.y + t.y * n };
}
function ju(e, t, n, r, l) {
  const i = 1 - l;
  return {
    x: i * i * i * e.x + 3 * i * i * l * t.x + 3 * i * l * l * n.x + l * l * l * r.x,
    y: i * i * i * e.y + 3 * i * i * l * t.y + 3 * i * l * l * n.y + l * l * l * r.y
  };
}
function Yi(e, t) {
  if (!t) return null;
  const n = e.rows.findIndex((r) => r.key === t);
  return n === -1 ? null : e.y + st + n * Wl + Wl / 2;
}
function T0(e, t) {
  var s;
  const n = [], r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), i = (a, u) => a < u ? `${a}|${u}` : `${u}|${a}`, o = [];
  for (const a of t)
    e.has(a.source) && e.has(a.target) && o.push({ id: a.id, relation: a, source: a.source, target: a.target, inheritance: !1 });
  e.forEach((a) => {
    a.entity.parent && e.has(a.entity.parent) && o.push({ id: `extends:${a.id}`, relation: null, source: a.id, target: a.entity.parent, inheritance: !0 });
  });
  for (const a of o) {
    const u = i(a.source, a.target);
    r.set(u, (r.get(u) || 0) + 1);
  }
  for (const a of o) {
    const u = e.get(a.source), c = e.get(a.target), f = i(a.source, a.target), h = l.get(f) || 0;
    l.set(f, h + 1);
    const g = r.get(f) || 1, x = (h - (g - 1) / 2) * 14;
    if (u === c) {
      const j = (s = Yi(u, a.relation ? `r:${a.relation.id}` : void 0)) != null ? s : u.y + st / 2, P = { x: u.x + u.width, y: j }, S = { x: u.x + u.width, y: u.y + st / 2 + 4 }, B = 46 + h * 12, O = { x: P.x + B, y: P.y }, I = { x: S.x + B, y: S.y - 10 };
      n.push({
        ...a,
        d: `M${P.x},${P.y} C${O.x},${O.y} ${I.x},${I.y} ${S.x},${S.y}`,
        start: P,
        end: S,
        startDir: { x: 1, y: 0 },
        endDir: { x: 1, y: 0 },
        mid: ju(P, O, I, S, 0.5)
      });
      continue;
    }
    let k, C, p, m;
    if (c.x >= u.x + u.width + 24 || c.x + c.width + 24 <= u.x) {
      const j = c.x >= u.x + u.width, P = Yi(u, a.relation ? `r:${a.relation.id}` : void 0), S = Yi(c, a.relation ? `i:${a.relation.id}` : void 0);
      k = { x: j ? u.x + u.width : u.x, y: P != null ? P : u.y + Math.min(u.height / 2, st / 2 + x + 6) }, C = { x: j ? c.x : c.x + c.width, y: S != null ? S : c.y + st / 2 + (P === null ? x : 0) }, p = { x: j ? 1 : -1, y: 0 }, m = { x: j ? -1 : 1, y: 0 };
    } else {
      const j = c.y + c.height / 2 > u.y + u.height / 2, P = u.x + u.width / 2 + x, S = c.x + c.width / 2 + x;
      k = { x: P, y: j ? u.y + u.height : u.y }, C = { x: S, y: j ? c.y : c.y + c.height }, p = { x: 0, y: j ? 1 : -1 }, m = { x: 0, y: j ? -1 : 1 };
    }
    const w = Math.hypot(C.x - k.x, C.y - k.y), N = Math.max(36, Math.min(160, w * 0.45)), _ = Su(k, p, N), y = Su(C, m, N);
    n.push({
      ...a,
      d: `M${k.x},${k.y} C${_.x},${_.y} ${y.x},${y.y} ${C.x},${C.y}`,
      start: k,
      end: C,
      startDir: p,
      endDir: m,
      mid: ju(k, _, y, C, 0.5)
    });
  }
  return n;
}
function _f(e) {
  let t = 1 / 0, n = 1 / 0, r = -1 / 0, l = -1 / 0;
  for (const i of e)
    t = Math.min(t, i.x), n = Math.min(n, i.y), r = Math.max(r, i.x + i.width), l = Math.max(l, i.y + i.height);
  return t === 1 / 0 ? { x: 0, y: 0, width: 0, height: 0 } : { x: t, y: n, width: r - t, height: l - n };
}
function Nu(e, t, n, r) {
  const l = -t.y, i = t.x, o = (u, c) => ({ x: e.x + t.x * u + l * c, y: e.y + t.y * u + i * c }), s = (u, c) => `M${u.x},${u.y} L${c.x},${c.y}`, a = [];
  return n === "many" ? (a.push(s(o(12, 0), o(0, -6)), s(o(12, 0), o(0, 0)), s(o(12, 0), o(0, 6))), a.push(r ? "" : s(o(16, -6), o(16, 6)))) : (a.push(s(o(7, -6), o(7, 6))), r || a.push(s(o(12, -6), o(12, 6)))), a.filter(Boolean).join(" ");
}
function Cu(e, t, n) {
  const r = n === "many" ? 20 : 17;
  return { x: e.x + t.x * r, y: e.y + t.y * r };
}
const I0 = {
  font: "var(--_font)",
  mono: "var(--_mono)",
  surface: "var(--_surface)",
  surface2: "var(--_surface-2)",
  border: "var(--_border)",
  text: "var(--_text)",
  muted: "var(--_muted)",
  accent: "var(--_accent)",
  edge: "var(--_edge)",
  canvas: "var(--_canvas)"
};
function P0(e) {
  const t = getComputedStyle(e), n = (r, l) => t.getPropertyValue(r).trim() || l;
  return {
    font: n("--_font", "Arial, sans-serif"),
    mono: n("--_mono", "monospace"),
    surface: n("--_surface", "#fff"),
    surface2: n("--_surface-2", "#f1f3f6"),
    border: n("--_border", "#e3e6eb"),
    text: n("--_text", "#161a22"),
    muted: n("--_muted", "#687083"),
    accent: n("--_accent", "#4f5bd5"),
    edge: n("--_edge", "#9aa3b5"),
    grid: n("--_grid", "#d7dbe2"),
    canvas: n("--_canvas", "#f3f4f7")
  };
}
function bf(e) {
  return `
.bmd-node { cursor: pointer; }
.bmd-node-bg { fill: ${e.surface}; stroke: ${e.border}; stroke-width: 1; }
.bmd-node-shadow { fill: #000; opacity: .05; }
.bmd-node-head { fill: ${e.surface2}; }
.bmd-node-strip { stroke: none; }
.bmd-node-title { font: 650 13.5px ${e.font}; fill: ${e.text}; }
.bmd-node-sub { font: 400 11px ${e.mono}; fill: ${e.muted}; }
.bmd-node-kind { font: 600 9.5px ${e.font}; fill: ${e.muted}; letter-spacing: .06em; text-transform: uppercase; }
.bmd-node-sep { stroke: ${e.border}; stroke-width: 1; }
.bmd-row-name { font: 400 12px ${e.font}; fill: ${e.text}; }
.bmd-row-name.is-pk { font-weight: 650; }
.bmd-row-name.is-nullable { fill: ${e.muted}; }
.bmd-row-type { font: 400 11px ${e.mono}; fill: ${e.muted}; }
.bmd-row-type.is-ref { fill: ${e.accent}; }
.bmd-row-hover { fill: transparent; }
.bmd-row-icon { fill: none; stroke: ${e.muted}; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.bmd-row-icon.is-pk { stroke: #d39b1a; }
.bmd-row-icon.is-ref { stroke: ${e.accent}; }
.bmd-node.is-selected .bmd-node-bg { stroke: ${e.accent}; stroke-width: 2; }
.bmd-node.is-dim { opacity: .28; }
.bmd-node:hover .bmd-node-bg { stroke: ${e.accent}; }
.bmd-edge { fill: none; stroke: ${e.edge}; stroke-width: 1.4; }
.bmd-edge-glyph { fill: none; stroke: ${e.edge}; stroke-width: 1.4; stroke-linecap: round; }
.bmd-edge-circle { fill: ${e.canvas}; stroke: ${e.edge}; stroke-width: 1.4; }
.bmd-edge.is-inheritance { stroke-dasharray: 5 4; }
.bmd-edge-arrow { fill: ${e.canvas}; stroke: ${e.edge}; stroke-width: 1.4; stroke-linejoin: round; }
.bmd-link.is-active .bmd-edge, .bmd-link.is-active .bmd-edge-glyph { stroke: ${e.accent}; stroke-width: 2; }
.bmd-link.is-active .bmd-edge-circle, .bmd-link.is-active .bmd-edge-arrow { stroke: ${e.accent}; }
.bmd-link.is-dim { opacity: .15; }
.bmd-edge-label { font: 500 11px ${e.font}; fill: ${e.text}; }
.bmd-edge-label-bg { fill: ${e.surface}; stroke: ${e.border}; }
.bmd-hit { fill: none; stroke: transparent; stroke-width: 12; cursor: pointer; }
`;
}
function z0(e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) t = t * 31 + e.charCodeAt(r) | 0;
  return `hsl(${Math.abs(t) % 360} 62% 52%)`;
}
function fr(e, t, n = "text/plain") {
  const r = typeof e == "string" ? new Blob([e], { type: `${n};charset=utf-8` }) : e, l = URL.createObjectURL(r), i = document.createElement("a");
  i.href = l, i.download = t, i.rel = "noopener", i.style.display = "none", document.body.appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(l), 1e3);
}
function Sf(e, t, n) {
  const r = P0(n), l = 40, i = _f(t), o = Math.ceil(i.width + l * 2), s = Math.ceil(i.height + l * 2), a = e.cloneNode(!0);
  a.setAttribute("xmlns", "http://www.w3.org/2000/svg"), a.setAttribute("width", String(o)), a.setAttribute("height", String(s)), a.setAttribute("viewBox", `0 0 ${o} ${s}`), a.removeAttribute("class");
  const u = a.querySelector("style");
  u && (u.textContent = bf(r)), a.querySelectorAll(".bmd-grid-bg, defs, .bmd-hit").forEach((h) => h.remove()), a.querySelectorAll(".is-dim, .is-active, .is-selected").forEach((h) => h.classList.remove("is-dim", "is-active", "is-selected")), a.querySelectorAll('[fill="var(--_accent)"]').forEach((h) => h.setAttribute("fill", r.accent));
  const c = a.querySelector(".bmd-viewport");
  c && c.setAttribute("transform", `translate(${l - i.x} ${l - i.y})`);
  const f = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  return f.setAttribute("width", "100%"), f.setAttribute("height", "100%"), f.setAttribute("fill", r.canvas), a.insertBefore(f, c), { markup: `<?xml version="1.0" encoding="UTF-8"?>
${new XMLSerializer().serializeToString(a)}`, width: o, height: s };
}
function R0(e, t, n, r) {
  fr(Sf(e, t, n).markup, r, "image/svg+xml");
}
function D0(e, t, n, r) {
  const { markup: l, width: i, height: o } = Sf(e, t, n), s = Math.max(0.5, Math.min(2, 16e3 / Math.max(i, o)));
  return new Promise((a, u) => {
    const c = new Image();
    c.onload = () => {
      const f = document.createElement("canvas");
      f.width = Math.round(i * s), f.height = Math.round(o * s);
      const h = f.getContext("2d");
      if (!h) return u(new Error("Canvas not supported"));
      h.scale(s, s), h.drawImage(c, 0, 0), f.toBlob((g) => {
        g ? (fr(g, r), a()) : u(new Error("PNG export failed"));
      }, "image/png");
    }, c.onerror = () => u(new Error("PNG export failed")), c.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(l)}`;
  });
}
const F0 = {
  entities: "Entities",
  search: "Search entities…",
  showAll: "Show all",
  hideAll: "Hide all",
  noResult: "No entity matches",
  manager: "Entity manager",
  detail: "Detail",
  detailAll: "Fields",
  detailKeys: "Keys",
  detailNone: "Names",
  direction: "Layout",
  horizontal: "Horizontal",
  vertical: "Vertical",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  fit: "Fit to screen",
  relayout: "Reset layout",
  export: "Export",
  exportSvg: "Image (SVG)",
  exportPng: "Image (PNG)",
  exportJdl: "JDL file",
  exportJson: "JSON schema",
  jdl: "JDL",
  jdlTitle: "JDL editor",
  jdlHint: "Edit the JDL: the diagram updates live. Import a .jdl / .jh file or go back to the database schema.",
  apply: "Apply",
  import: "Import",
  reset: "Database",
  download: "Download",
  close: "Close",
  theme: "Theme",
  toggleSidebar: "Toggle entity list",
  loading: "Loading schema…",
  error: "Unable to load the schema",
  retry: "Retry",
  empty: "No entity in this entity manager.",
  table: "Table",
  kind: "Kind",
  parent: "Extends",
  fields: "Fields",
  relations: "Relations",
  outgoing: "Owning side",
  incoming: "Referenced by",
  focus: "Only neighbours",
  unfocus: "Show everything",
  copy: "Copy",
  copied: "Copied",
  nullable: "nullable",
  unique: "unique",
  primary: "primary key",
  jdlSource: "Imported JDL",
  visible: "visible",
  shortcuts: "Scroll to zoom · drag to pan · drag an entity to move it",
  parseError: "Line"
}, A0 = {
  entities: "Entités",
  search: "Rechercher une entité…",
  showAll: "Tout afficher",
  hideAll: "Tout masquer",
  noResult: "Aucune entité ne correspond",
  manager: "Entity manager",
  detail: "Détail",
  detailAll: "Champs",
  detailKeys: "Clés",
  detailNone: "Noms",
  direction: "Disposition",
  horizontal: "Horizontale",
  vertical: "Verticale",
  zoomIn: "Zoom avant",
  zoomOut: "Zoom arrière",
  fit: "Ajuster à l’écran",
  relayout: "Réinitialiser la disposition",
  export: "Exporter",
  exportSvg: "Image (SVG)",
  exportPng: "Image (PNG)",
  exportJdl: "Fichier JDL",
  exportJson: "Schéma JSON",
  jdl: "JDL",
  jdlTitle: "Éditeur JDL",
  jdlHint: "Modifiez le JDL : le diagramme se met à jour en direct. Importez un fichier .jdl / .jh ou revenez au schéma de la base.",
  apply: "Appliquer",
  import: "Importer",
  reset: "Base",
  download: "Télécharger",
  close: "Fermer",
  theme: "Thème",
  toggleSidebar: "Afficher / masquer la liste",
  loading: "Chargement du schéma…",
  error: "Impossible de charger le schéma",
  retry: "Réessayer",
  empty: "Aucune entité dans cet entity manager.",
  table: "Table",
  kind: "Type",
  parent: "Hérite de",
  fields: "Champs",
  relations: "Relations",
  outgoing: "Côté propriétaire",
  incoming: "Référencée par",
  focus: "Voisins uniquement",
  unfocus: "Tout afficher",
  copy: "Copier",
  copied: "Copié",
  nullable: "nullable",
  unique: "unique",
  primary: "clé primaire",
  jdlSource: "JDL importé",
  visible: "visibles",
  shortcuts: "Molette pour zoomer · glisser pour se déplacer · glisser une entité pour la déplacer",
  parseError: "Ligne"
};
function U0(e) {
  return (e || (typeof navigator != "undefined" && /^fr/i.test(navigator.language) ? "fr" : "en")) === "fr" ? A0 : F0;
}
class Yt extends Error {
  constructor(t, n) {
    super(t), this.line = n;
  }
}
const jf = ["OneToOne", "ManyToOne", "OneToMany", "ManyToMany"], V0 = /* @__PURE__ */ new Set(["required", "unique", "min", "max", "minlength", "maxlength", "pattern", "minbytes", "maxbytes"]);
function B0(e) {
  const t = [];
  let n = 0, r = 1;
  const l = e.length;
  for (; n < l; ) {
    const i = e[n];
    if (i === `
`) {
      r++, n++;
      continue;
    }
    if (/\s/.test(i)) {
      n++;
      continue;
    }
    if (i === "/" && e[n + 1] === "/") {
      for (; n < l && e[n] !== `
`; ) n++;
      continue;
    }
    if (i === "/" && e[n + 1] === "*") {
      const o = n, s = r, a = e.indexOf("*/", n + 2), u = a === -1 ? l : a + 2, c = e.slice(o, u);
      for (const f of c) f === `
` && r++;
      c.startsWith("/**") && t.push({ type: "doc", value: c, line: s }), n = u;
      continue;
    }
    if (i === '"' || i === "'") {
      let o = n + 1;
      for (; o < l && e[o] !== i; )
        e[o] === "\\" && o++, o++;
      t.push({ type: "string", value: e.slice(n + 1, o), line: r }), n = o + 1;
      continue;
    }
    if (i === "@") {
      let o = n + 1;
      for (; o < l && /[\w]/.test(e[o]); ) o++;
      t.push({ type: "annotation", value: e.slice(n + 1, o), line: r }), n = o;
      continue;
    }
    if ("{}(),;=*".includes(i)) {
      t.push({ type: "punct", value: i, line: r }), n++;
      continue;
    }
    if (/[0-9-]/.test(i)) {
      let o = n + 1;
      for (; o < l && /[0-9.]/.test(e[o]); ) o++;
      t.push({ type: "number", value: e.slice(n, o), line: r }), n = o;
      continue;
    }
    if (/[\w\\$.]/.test(i)) {
      let o = n + 1;
      for (; o < l && /[\w\\$.]/.test(e[o]); ) o++;
      t.push({ type: "ident", value: e.slice(n, o), line: r }), n = o;
      continue;
    }
    throw new Yt(`Unexpected character "${i}"`, r);
  }
  return t;
}
function Ht(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}
function W0(e) {
  return e.charAt(0).toLowerCase() + e.slice(1);
}
function bt(e) {
  const t = e.lastIndexOf("\\");
  return t === -1 ? { name: e, namespace: "" } : { name: e.slice(t + 1), namespace: e.slice(0, t) };
}
function H0(e) {
  const t = e.replace(/^\/\*\*|\*\/$/g, "").split(`
`).map((r) => r.replace(/^\s*\*\s?/, "").trim()).filter(Boolean), n = {};
  for (const r of t) {
    const l = /^@table\s+(\S+)/.exec(r);
    l ? n.table = l[1] : !n.fqcn && /^[\w\\]+\\[\w]+$/.test(r) && (n.fqcn = r);
  }
  return n;
}
function G0(e, t = "jdl") {
  const n = B0(e);
  let r = 0, l = null;
  const i = /* @__PURE__ */ new Map(), o = [], s = (_ = 0) => n[r + _], a = () => n.length ? n[n.length - 1].line : 1, u = () => {
    const _ = n[r++];
    if (!_) throw new Yt("Unexpected end of file", a());
    return _;
  }, c = (_) => {
    const y = u();
    if (y.value !== _) throw new Yt(`Expected "${_}" but found "${y.value}"`, y.line);
    return y;
  }, f = (_) => {
    const y = u();
    if (y.type !== "ident") throw new Yt(`Expected ${_} but found "${y.value}"`, y.line);
    return y;
  }, h = () => {
    var y;
    if (((y = s()) == null ? void 0 : y.value) !== "(") return;
    let _ = 0;
    do {
      const j = u();
      j.value === "(" && _++, j.value === ")" && _--;
    } while (_ > 0);
  }, g = () => {
    let _ = 0;
    do {
      const y = u();
      y.value === "{" && _++, y.value === "}" && _--;
    } while (_ > 0);
  }, x = () => {
    var _, y;
    for (; ((_ = s()) == null ? void 0 : _.type) === "doc" || ((y = s()) == null ? void 0 : y.type) === "annotation"; )
      u().type === "annotation" && h();
  }, k = (_) => {
    let y = i.get(_);
    if (!y) {
      const { name: j, namespace: P } = bt(_);
      y = { id: _, name: j, namespace: P, table: Ht(j), kind: "entity", parent: null, fields: [] }, i.set(_, y);
    }
    return y;
  }, C = () => {
    var Se, oe, Fe, $, z, R;
    const _ = f("an entity name"), y = l || {};
    l = null;
    let j = y.table || null;
    ((Se = s()) == null ? void 0 : Se.value) === "(" && (u(), j = f("a table name").value, c(")"));
    const P = _.value, S = y.fqcn || P, { namespace: B } = bt(S), O = [];
    if (((oe = s()) == null ? void 0 : oe.value) === "{") {
      for (u(); s() && s().value !== "}" && (x(), ((Fe = s()) == null ? void 0 : Fe.value) !== "}"); ) {
        const U = f("a field name"), A = f("a field type");
        let nt = !1, je = !1, Qe = null;
        for (; (($ = s()) == null ? void 0 : $.type) === "ident" && V0.has(s().value.toLowerCase()); ) {
          const he = u().value.toLowerCase();
          if (he === "required" && (nt = !0), he === "unique" && (je = !0), he === "maxlength" && ((z = s()) == null ? void 0 : z.value) === "(") {
            u();
            const ct = u();
            Qe = parseInt(ct.value, 10) || null, c(")");
          } else
            h();
        }
        ((R = s()) == null ? void 0 : R.value) === "," && u(), O.push({ name: U.value, column: Ht(U.value), type: A.value, nullable: !nt, unique: je, id: !1, length: Qe });
      }
      c("}");
    }
    O.some((U) => U.name === "id") ? O.forEach((U) => {
      U.name === "id" && (U.id = !0);
    }) : O.unshift({ name: "id", column: "id", type: "Long", nullable: !1, unique: !0, id: !0, length: null });
    const I = i.get(P), Q = {
      id: S,
      name: bt(S).name,
      namespace: B,
      table: j || Ht(bt(P).name),
      kind: "entity",
      parent: null,
      fields: O
    };
    I ? Object.assign(I, Q) : i.set(P, Q);
  }, p = () => {
    const _ = f("an enum name").value;
    l = null;
    const y = [];
    for (c("{"); s() && s().value !== "}"; ) {
      x();
      const S = u();
      S.type === "ident" && (y.push({ name: S.value, column: S.value, type: "", nullable: !1, unique: !1, id: !1, length: null }), h());
    }
    c("}");
    const { name: j, namespace: P } = bt(_);
    i.set(_, { id: _, name: j, namespace: P, table: null, kind: "enum", parent: null, fields: y });
  }, m = () => {
    var P, S;
    x();
    const _ = f("an entity name").value;
    let y, j = !1;
    if (((P = s()) == null ? void 0 : P.value) === "{") {
      for (u(), ((S = s()) == null ? void 0 : S.type) === "ident" && (y = u().value, h()); s() && s().value !== "}"; )
        u().value.toLowerCase() === "required" && (j = !0);
      c("}");
    }
    return { entity: _, field: y, required: j };
  }, v = () => {
    var j, P;
    const _ = f("a relationship type"), y = jf.find((S) => S.toLowerCase() === _.value.toLowerCase());
    if (!y) throw new Yt(`Unknown relationship type "${_.value}"`, _.line);
    for (l = null, c("{"); s() && s().value !== "}"; ) {
      const S = m(), B = u();
      if (B.value.toLowerCase() !== "to") throw new Yt(`Expected "to" but found "${B.value}"`, B.line);
      const O = m();
      if (((j = s()) == null ? void 0 : j.value.toLowerCase()) === "with" && (u(), u()), x(), ((P = s()) == null ? void 0 : P.value) === "," && u(), k(S.entity), k(O.entity), y === "OneToMany" && O.field) {
        o.push({
          id: `${O.entity}::${O.field}`,
          type: "ManyToOne",
          source: O.entity,
          target: S.entity,
          field: O.field,
          inverseField: S.field || null,
          joinColumns: [`${Ht(O.field)}_id`],
          joinTable: null,
          nullable: !O.required
        });
        continue;
      }
      const I = S.field || W0(bt(O.entity).name);
      o.push({
        id: `${S.entity}::${I}`,
        type: y,
        source: S.entity,
        target: O.entity,
        field: I,
        inverseField: O.field || null,
        joinColumns: y === "ManyToMany" || y === "OneToMany" ? [] : [`${Ht(I)}_id`],
        joinTable: y === "ManyToMany" ? `${Ht(bt(S.entity).name)}_${Ht(bt(O.entity).name)}` : null,
        nullable: !S.required
      });
    }
    c("}");
  };
  for (; r < n.length; ) {
    const _ = s();
    if (_.type === "doc") {
      l = H0(_.value), r++;
      continue;
    }
    if (_.type === "annotation") {
      r++, h();
      continue;
    }
    const y = _.type === "ident" ? _.value.toLowerCase() : "";
    if (y === "entity")
      r++, C();
    else if (y === "enum")
      r++, p();
    else if (y === "relationship")
      r++, v();
    else
      for (l = null, r++; s() && !["entity", "enum", "relationship"].includes(s().value.toLowerCase()) && s().type !== "doc"; )
        s().value === "{" ? g() : r++;
  }
  const w = (_) => {
    var y;
    return ((y = i.get(_)) == null ? void 0 : y.id) || _;
  }, N = o.map((_) => ({ ..._, source: w(_.source), target: w(_.target), id: `${w(_.source)}::${_.field}` }));
  return {
    manager: t,
    managers: [{ name: t, connection: null, database: null, driver: "JDL", default: !0 }],
    entities: Array.from(i.values()).sort((_, y) => _.id.localeCompare(y.id)),
    relations: N
  };
}
const Mu = {
  string: "String",
  ascii_string: "String",
  text: "TextBlob",
  integer: "Integer",
  smallint: "Integer",
  bigint: "Long",
  float: "Double",
  decimal: "BigDecimal",
  boolean: "Boolean",
  date: "LocalDate",
  date_immutable: "LocalDate",
  datetime: "Instant",
  datetime_immutable: "Instant",
  datetimetz: "ZonedDateTime",
  datetimetz_immutable: "ZonedDateTime",
  time: "Duration",
  time_immutable: "Duration",
  guid: "UUID",
  uuid: "UUID",
  ulid: "String",
  blob: "Blob",
  binary: "Blob",
  json: "TextBlob",
  json_array: "TextBlob",
  array: "TextBlob",
  simple_array: "TextBlob",
  object: "TextBlob"
};
function Q0(e) {
  return Mu[e] ? Mu[e] : /^[A-Z]/.test(e) ? e : "String";
}
function Ou(e) {
  const t = /* @__PURE__ */ new Map();
  e.entities.forEach((i) => t.set(i.name, (t.get(i.name) || 0) + 1));
  const n = /* @__PURE__ */ new Map();
  e.entities.forEach((i) => n.set(i.id, t.get(i.name) === 1 ? i.name : i.id.replace(/\\/g, "_")));
  const r = (i) => i.replace(/\./g, "_"), l = [`/* Doctrine entity manager "${e.manager}" */`, ""];
  for (const i of e.entities) {
    if (i.kind === "enum") {
      l.push(`enum ${n.get(i.id)} {`, `  ${i.fields.map((o) => o.name).join(", ")}`, "}", "");
      continue;
    }
    l.push("/**", ` * ${i.id}`), i.table && l.push(` * @table ${i.table}`), l.push(" */", `entity ${n.get(i.id)} {`);
    for (const o of i.fields)
      o.id && o.name === "id" || l.push(`  ${r(o.name)} ${Q0(o.type)}${o.nullable ? "" : " required"}`);
    l.push("}", "");
  }
  for (const i of jf) {
    const o = e.relations.filter((s) => s.type === i);
    o.length && (l.push(`relationship ${i} {`), o.forEach((s, a) => {
      const u = s.inverseField ? `{${r(s.inverseField)}}` : "";
      l.push(`  ${n.get(s.source) || s.source}{${r(s.field)}} to ${n.get(s.target) || s.target}${u}${a < o.length - 1 ? "," : ""}`);
    }), l.push("}", ""));
  }
  return l.join(`
`);
}
const Y0 = {
  title: "650 13.5px",
  row: "400 12px",
  type: "400 11px"
};
function K0(e, t) {
  let n = null;
  try {
    n = document.createElement("canvas").getContext("2d");
  } catch {
    n = null;
  }
  const r = /* @__PURE__ */ new Map();
  return (l, i) => {
    const o = `${i}|${l}`, s = r.get(o);
    if (s !== void 0) return s;
    let a;
    return n ? (n.font = `${Y0[i]} ${i === "type" ? t : e}`, a = n.measureText(l).width) : a = l.length * (i === "title" ? 8 : 7), r.set(o, a), a;
  };
}
const $u = `.bmd{--_accent: var(--bmd-accent, #4f5bd5);--_accent-fg: var(--bmd-accent-foreground, #ffffff);--_bg: var(--bmd-bg, #f6f7f9);--_surface: var(--bmd-surface, #ffffff);--_surface-2: var(--bmd-surface-2, #f1f3f6);--_border: var(--bmd-border, #e3e6eb);--_text: var(--bmd-text, #161a22);--_muted: var(--bmd-muted, #687083);--_canvas: var(--bmd-canvas, #f3f4f7);--_grid: var(--bmd-grid, #d7dbe2);--_danger: var(--bmd-danger, #d93f3f);--_radius: var(--bmd-radius, 10px);--_font: var(--bmd-font, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);--_mono: var(--bmd-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace);--_shadow: 0 1px 2px rgba(16, 24, 40, .06), 0 8px 24px rgba(16, 24, 40, .08);--_accent-soft: color-mix(in srgb, var(--_accent) 12%, transparent);--_accent-line: color-mix(in srgb, var(--_accent) 55%, transparent);--_edge: var(--bmd-edge, #9aa3b5);position:relative;display:flex;flex-direction:column;box-sizing:border-box;width:100%;height:100%;min-height:420px;overflow:hidden;background:var(--_bg);color:var(--_text);font-family:var(--_font);font-size:13px;line-height:1.45;color-scheme:light;border-radius:inherit;-webkit-font-smoothing:antialiased;container-type:inline-size;container-name:bmd}.bmd[data-theme=dark]{--_accent: var(--bmd-accent, #8b93ff);--_accent-fg: var(--bmd-accent-foreground, #0d0f14);--_bg: var(--bmd-bg, #0e1116);--_surface: var(--bmd-surface, #161a21);--_surface-2: var(--bmd-surface-2, #1d222b);--_border: var(--bmd-border, #2a303b);--_text: var(--bmd-text, #e7eaf0);--_muted: var(--bmd-muted, #959db0);--_canvas: var(--bmd-canvas, #11141a);--_grid: var(--bmd-grid, #262c36);--_danger: var(--bmd-danger, #f07272);--_shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 10px 30px rgba(0, 0, 0, .35);--_edge: var(--bmd-edge, #5d6678);color-scheme:dark}.bmd *,.bmd *:before,.bmd *:after{box-sizing:border-box}.bmd button,.bmd input,.bmd select,.bmd textarea{font:inherit;color:inherit;letter-spacing:normal}.bmd :focus-visible{outline:2px solid var(--_accent);outline-offset:1px}.bmd-toolbar{display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--_border);background:var(--_surface);flex-wrap:wrap;position:relative;z-index:5}.bmd-brand{display:flex;align-items:center;gap:10px;min-width:0;margin-right:auto}.bmd-logo{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:var(--_accent);color:var(--_accent-fg);flex:none}.bmd-title{font-weight:650;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmd-subtitle{color:var(--_muted);font-size:12px;white-space:nowrap}.bmd-group{display:inline-flex;align-items:center;gap:2px;padding:2px;border:1px solid var(--_border);border-radius:9px;background:var(--_surface-2)}.bmd-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;min-width:30px;padding:0 9px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--_text);cursor:pointer;font-size:12.5px;font-weight:500;white-space:nowrap;transition:background .12s,border-color .12s,color .12s}.bmd-btn:hover{background:var(--_surface-2)}.bmd-group .bmd-btn{height:26px;min-width:26px;padding:0 8px}.bmd-group .bmd-btn:hover{background:var(--_surface)}.bmd-btn[aria-pressed=true]{background:var(--_surface);border-color:var(--_border);box-shadow:0 1px 2px #10182814;color:var(--_text)}.bmd-btn--outline{border-color:var(--_border);background:var(--_surface)}.bmd-btn--primary{background:var(--_accent);color:var(--_accent-fg)}.bmd-btn--primary:hover{background:color-mix(in srgb,var(--_accent) 88%,#000)}.bmd-btn--icon{padding:0;width:30px}.bmd-btn:disabled{opacity:.45;cursor:default}.bmd-btn svg,.bmd-icon{width:16px;height:16px;flex:none;display:block}.bmd-zoom{min-width:46px;text-align:center;font-variant-numeric:tabular-nums;font-size:12px;color:var(--_muted)}.bmd-select{height:30px;padding:0 28px 0 10px;border:1px solid var(--_border);border-radius:7px;background:var(--_surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 9px center;appearance:none;-webkit-appearance:none;cursor:pointer;font-size:12.5px}.bmd-sep{width:1px;height:22px;background:var(--_border)}.bmd-menu{position:relative}.bmd-menu-list{position:absolute;right:0;top:calc(100% + 6px);min-width:190px;padding:5px;border:1px solid var(--_border);border-radius:var(--_radius);background:var(--_surface);box-shadow:var(--_shadow);z-index:30}.bmd-menu-item{display:flex;align-items:center;gap:9px;width:100%;padding:7px 9px;border:0;border-radius:6px;background:transparent;cursor:pointer;text-align:left;font-size:12.5px}.bmd-menu-item:hover{background:var(--_surface-2)}.bmd-body{position:relative;display:flex;flex:1;min-height:0}.bmd-sidebar{display:flex;flex-direction:column;width:272px;flex:none;border-right:1px solid var(--_border);background:var(--_surface);min-height:0}.bmd-sidebar[hidden]{display:none}.bmd-sidebar-head{padding:10px;display:grid;gap:8px;border-bottom:1px solid var(--_border)}.bmd-search{position:relative}.bmd-search svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--_muted);pointer-events:none}.bmd-input{width:100%;height:32px;padding:0 10px 0 31px;border:1px solid var(--_border);border-radius:8px;background:var(--_surface-2);font-size:12.5px;outline:none}.bmd-input:focus{border-color:var(--_accent-line);background:var(--_surface)}.bmd-sidebar-meta{display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--_muted)}.bmd-link{border:0;background:none;padding:0;color:var(--_accent);cursor:pointer;font-size:11.5px;font-weight:500}.bmd-tree{flex:1;overflow:auto;padding:6px 6px 12px}.bmd-ns{margin-top:4px}.bmd-ns-head{display:flex;align-items:center;gap:7px;width:100%;padding:6px;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--_muted);text-align:left;border-radius:6px}.bmd-ns-head:hover{background:var(--_surface-2)}.bmd-ns-head svg{width:13px;height:13px;transition:transform .15s}.bmd-ns-head[aria-expanded=false] svg{transform:rotate(-90deg)}.bmd-ns-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bmd-dot{width:8px;height:8px;border-radius:99px;flex:none}.bmd-count{font-variant-numeric:tabular-nums;font-weight:500;color:var(--_muted)}.bmd-item{display:flex;align-items:center;gap:8px;width:100%;padding:4px 6px 4px 8px;border-radius:6px;cursor:pointer;font-size:12.5px}.bmd-item:hover{background:var(--_surface-2)}.bmd-item.is-selected{background:var(--_accent-soft)}.bmd-item.is-hidden .bmd-item-name{color:var(--_muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--_muted) 50%,transparent)}.bmd-item-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:0;background:none;padding:2px 0;cursor:pointer;text-align:left}.bmd-eye{display:grid;place-items:center;width:24px;height:24px;border:0;border-radius:5px;background:none;color:var(--_muted);cursor:pointer;opacity:.55}.bmd-item:hover .bmd-eye,.bmd-item.is-hidden .bmd-eye{opacity:1}.bmd-eye:hover{background:var(--_surface);color:var(--_text)}.bmd-eye svg{width:15px;height:15px}.bmd-empty-list{padding:18px 10px;color:var(--_muted);text-align:center;font-size:12.5px}.bmd-stage{position:relative;flex:1;min-width:0;background:var(--_canvas);overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}.bmd-stage.is-panning{cursor:grabbing}.bmd-svg{display:block;width:100%;height:100%}.bmd-hint{position:absolute;left:12px;bottom:10px;padding:4px 9px;border-radius:99px;background:color-mix(in srgb,var(--_surface) 85%,transparent);border:1px solid var(--_border);color:var(--_muted);font-size:11px;pointer-events:none;backdrop-filter:blur(6px)}.bmd-minimap{position:absolute;right:12px;bottom:12px;width:190px;height:128px;border:1px solid var(--_border);border-radius:9px;background:color-mix(in srgb,var(--_surface) 92%,transparent);box-shadow:var(--_shadow);overflow:hidden;cursor:pointer;backdrop-filter:blur(6px)}.bmd-minimap svg{display:block;width:100%;height:100%}.bmd-panel{display:flex;flex-direction:column;width:360px;max-width:100%;flex:none;border-left:1px solid var(--_border);background:var(--_surface);min-height:0}.bmd-panel--wide{width:440px}.bmd-panel-head{display:flex;align-items:flex-start;gap:10px;padding:12px 12px 10px 14px;border-bottom:1px solid var(--_border)}.bmd-panel-title{flex:1;min-width:0}.bmd-panel-title h3{margin:0;font-size:15px;font-weight:650;line-height:1.3;word-break:break-word}.bmd-panel-title p{margin:2px 0 0;color:var(--_muted);font-family:var(--_mono);font-size:11px;word-break:break-all}.bmd-panel-body{flex:1;overflow:auto;padding:12px 14px 16px}.bmd-kv{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0 0 16px;font-size:12.5px}.bmd-kv dt{color:var(--_muted)}.bmd-kv dd{margin:0;font-family:var(--_mono);font-size:12px;word-break:break-all}.bmd-section{margin:18px 0 8px;font-size:11px;font-weight:650;letter-spacing:.06em;text-transform:uppercase;color:var(--_muted)}.bmd-fields{width:100%;border-collapse:collapse;font-size:12.5px}.bmd-fields td{padding:6px 4px;border-bottom:1px solid var(--_border);vertical-align:top}.bmd-fields tr:last-child td{border-bottom:0}.bmd-fields .bmd-col-type{font-family:var(--_mono);font-size:11.5px;color:var(--_muted);text-align:right;white-space:nowrap}.bmd-fields small{display:block;color:var(--_muted);font-family:var(--_mono);font-size:11px}.bmd-badges{display:inline-flex;gap:4px;margin-left:6px;vertical-align:1px}.bmd-badge{display:inline-block;padding:0 5px;border-radius:4px;font-size:10px;font-weight:600;line-height:16px;background:var(--_surface-2);color:var(--_muted);border:1px solid var(--_border)}.bmd-badge--accent{background:var(--_accent-soft);color:var(--_accent);border-color:transparent}.bmd-rel{display:flex;align-items:center;gap:8px;width:100%;padding:7px 8px;margin-bottom:4px;border:1px solid var(--_border);border-radius:8px;background:var(--_surface);cursor:pointer;text-align:left;font-size:12.5px}.bmd-rel:hover{border-color:var(--_accent-line);background:var(--_accent-soft)}.bmd-rel-type{font-family:var(--_mono);font-size:10.5px;color:var(--_muted);flex:none;min-width:34px}.bmd-rel-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bmd-rel-name b{font-weight:600}.bmd-actions{display:flex;gap:6px;flex-wrap:wrap;margin:2px 0 6px}.bmd-jdl{display:flex;flex-direction:column;flex:1;min-height:0}.bmd-jdl-hint{margin:0;padding:10px 14px;color:var(--_muted);font-size:12px;border-bottom:1px solid var(--_border)}.bmd-editor{position:relative;display:flex;flex:1;min-height:0;background:var(--_surface-2);font-family:var(--_mono);font-size:12px;line-height:19px}.bmd-gutter{flex:none;padding:10px 8px 10px 10px;color:var(--_muted);text-align:right;opacity:.6;overflow:hidden;user-select:none;white-space:pre}.bmd-gutter .is-error{color:var(--_danger);opacity:1;font-weight:700}.bmd-textarea{flex:1;min-width:0;padding:10px 12px 10px 4px;border:0;outline:none;resize:none;background:transparent;color:var(--_text);font:inherit;white-space:pre;overflow:auto;tab-size:2}.bmd-jdl-foot{display:flex;align-items:center;gap:6px;padding:10px 12px;border-top:1px solid var(--_border);flex-wrap:wrap}.bmd-error-msg{flex-basis:100%;color:var(--_danger);font-size:12px}.bmd-state{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;color:var(--_muted)}.bmd-state-box{display:grid;gap:10px;justify-items:center;max-width:380px}.bmd-state strong{color:var(--_text);font-size:14px}.bmd-spinner{width:26px;height:26px;border-radius:99px;border:2.5px solid var(--_border);border-top-color:var(--_accent);animation:bmd-spin .8s linear infinite}@keyframes bmd-spin{to{transform:rotate(360deg)}}.bmd-toast{position:absolute;left:50%;bottom:18px;transform:translate(-50%);padding:8px 14px;border-radius:99px;background:var(--_text);color:var(--_bg);font-size:12.5px;box-shadow:var(--_shadow);z-index:40;pointer-events:none}@container bmd (max-width: 900px){.bmd-sidebar{position:absolute;inset:0 auto 0 0;z-index:12;box-shadow:var(--_shadow)}.bmd-panel,.bmd-panel--wide{position:absolute;inset:0 0 0 auto;width:min(400px,100%);z-index:12;box-shadow:var(--_shadow)}.bmd-hide-sm{display:none!important}.bmd-minimap{display:none}}`, Lu = /* @__PURE__ */ new WeakSet();
function X0(e) {
  if (typeof document == "undefined") return;
  const t = e && typeof ShadowRoot != "undefined" && e.getRootNode() instanceof ShadowRoot ? e.getRootNode() : document;
  if (!Lu.has(t)) {
    Lu.add(t);
    try {
      const n = new CSSStyleSheet();
      n.replaceSync($u), t.adoptedStyleSheets = [...t.adoptedStyleSheets, n];
    } catch {
      const n = document.createElement("style");
      n.setAttribute("data-doctrine-diagram", ""), n.textContent = $u, (t instanceof Document ? t.head : t).appendChild(n);
    }
  }
}
const q0 = 0.08, J0 = 2.5;
function Ho(e) {
  return Math.min(J0, Math.max(q0, e));
}
function Z0(e) {
  switch (e.type) {
    case "ManyToOne":
      return { start: "many", startOptional: !0, end: "one", endOptional: e.nullable };
    case "OneToOne":
      return { start: "one", startOptional: !0, end: "one", endOptional: e.nullable };
    case "OneToMany":
      return { start: "one", startOptional: !0, end: "many", endOptional: !0 };
    default:
      return { start: "many", startOptional: !0, end: "many", endOptional: !0 };
  }
}
const e1 = ({ kind: e }) => e === "pk" ? /* @__PURE__ */ d.jsxs("g", { className: "bmd-row-icon is-pk", transform: "translate(12 6)", children: [
  /* @__PURE__ */ d.jsx("circle", { cx: "3.5", cy: "6", r: "2.8" }),
  /* @__PURE__ */ d.jsx("path", { d: "M6.3 6H12M10.2 6v2.4M12 6v2" })
] }) : e === "fk" ? /* @__PURE__ */ d.jsx("g", { className: "bmd-row-icon is-ref", transform: "translate(12 6)", children: /* @__PURE__ */ d.jsx("path", { d: "M1 6h9M7 3l3 3-3 3" }) }) : e === "collection" ? /* @__PURE__ */ d.jsx("g", { className: "bmd-row-icon is-ref", transform: "translate(12 6)", children: /* @__PURE__ */ d.jsx("path", { d: "M1 3h3M1 6h3M1 9h3M6 3h5M6 6h5M6 9h5" }) }) : /* @__PURE__ */ d.jsx("g", { className: "bmd-row-icon", transform: "translate(12 6)", children: /* @__PURE__ */ d.jsx("circle", { cx: "5", cy: "6", r: "1.6" }) }), t1 = L.memo(function({ box: t, color: n, selected: r, dim: l, kindLabel: i }) {
  const { entity: o, rows: s, width: a, height: u } = t, c = 10, f = `M0,${c} a${c},${c} 0 0 1 ${c},-${c} h${a - 2 * c} a${c},${c} 0 0 1 ${c},${c} v${st - c} h-${a} z`;
  return /* @__PURE__ */ d.jsxs("g", { className: `bmd-node${r ? " is-selected" : ""}${l ? " is-dim" : ""}`, transform: `translate(${t.x} ${t.y})`, "data-node": t.id, children: [
    /* @__PURE__ */ d.jsx("rect", { className: "bmd-node-shadow", x: 1, y: 3, width: a, height: u, rx: c }),
    /* @__PURE__ */ d.jsx("rect", { className: "bmd-node-bg", width: a, height: u, rx: c }),
    /* @__PURE__ */ d.jsx("path", { className: "bmd-node-head", d: f }),
    /* @__PURE__ */ d.jsx("rect", { className: "bmd-node-strip", x: 0, y: 0, width: a, height: 3, rx: 1.5, fill: n }),
    /* @__PURE__ */ d.jsx("text", { className: "bmd-node-title", x: 14, y: 22, children: o.name }),
    /* @__PURE__ */ d.jsx("text", { className: "bmd-node-sub", x: 14, y: 37, children: o.table || o.namespace || " " }),
    i ? /* @__PURE__ */ d.jsx("text", { className: "bmd-node-kind", x: a - 12, y: 22, textAnchor: "end", children: i }) : null,
    s.length ? /* @__PURE__ */ d.jsx("line", { className: "bmd-node-sep", x1: 0, x2: a, y1: st, y2: st }) : null,
    s.map((h, g) => /* @__PURE__ */ d.jsxs("g", { transform: `translate(0 ${st + g * Wl})`, children: [
      /* @__PURE__ */ d.jsx(e1, { kind: h.kind }),
      /* @__PURE__ */ d.jsxs("text", { className: `bmd-row-name${h.kind === "pk" ? " is-pk" : ""}${h.nullable && h.kind === "field" ? " is-nullable" : ""}`, x: 32, y: 16, children: [
        h.label,
        h.nullable && h.kind === "field" ? "?" : ""
      ] }),
      /* @__PURE__ */ d.jsx("text", { className: `bmd-row-type${h.kind === "fk" || h.kind === "collection" ? " is-ref" : ""}`, x: a - 12, y: 16, textAnchor: "end", children: h.type })
    ] }, h.key)),
    s.length ? /* @__PURE__ */ d.jsx("rect", { width: a, height: Wo, y: u - Wo, fill: "transparent" }) : null
  ] });
}), n1 = L.memo(function({ edge: t, active: n, dim: r }) {
  const l = `bmd-link${n ? " is-active" : ""}${r ? " is-dim" : ""}`;
  if (t.inheritance) {
    const c = t.end, f = t.endDir, h = -f.y, g = f.x, x = c, k = { x: c.x + f.x * 12 + h * 7, y: c.y + f.y * 12 + g * 7 }, C = { x: c.x + f.x * 12 - h * 7, y: c.y + f.y * 12 - g * 7 };
    return /* @__PURE__ */ d.jsxs("g", { className: l, children: [
      /* @__PURE__ */ d.jsx("path", { className: "bmd-edge is-inheritance", d: t.d }),
      /* @__PURE__ */ d.jsx("path", { className: "bmd-edge-arrow", d: `M${x.x},${x.y} L${k.x},${k.y} L${C.x},${C.y} Z` })
    ] });
  }
  const i = Z0(t.relation), o = i.startOptional ? Cu(t.start, t.startDir, i.start) : null, s = i.endOptional ? Cu(t.end, t.endDir, i.end) : null, a = t.relation.field + (t.relation.inverseField ? ` ⇄ ${t.relation.inverseField}` : ""), u = a.length * 6.4 + 16;
  return /* @__PURE__ */ d.jsxs("g", { className: l, "data-edge": t.id, children: [
    /* @__PURE__ */ d.jsx("path", { className: "bmd-hit", d: t.d }),
    /* @__PURE__ */ d.jsx("path", { className: "bmd-edge", d: t.d }),
    /* @__PURE__ */ d.jsx("path", { className: "bmd-edge-glyph", d: Nu(t.start, t.startDir, i.start, i.startOptional) }),
    /* @__PURE__ */ d.jsx("path", { className: "bmd-edge-glyph", d: Nu(t.end, t.endDir, i.end, i.endOptional) }),
    o ? /* @__PURE__ */ d.jsx("circle", { className: "bmd-edge-circle", cx: o.x, cy: o.y, r: 3.6 }) : null,
    s ? /* @__PURE__ */ d.jsx("circle", { className: "bmd-edge-circle", cx: s.x, cy: s.y, r: 3.6 }) : null,
    n ? /* @__PURE__ */ d.jsxs("g", { transform: `translate(${t.mid.x} ${t.mid.y})`, children: [
      /* @__PURE__ */ d.jsx("rect", { className: "bmd-edge-label-bg", x: -u / 2, y: -11, width: u, height: 22, rx: 11 }),
      /* @__PURE__ */ d.jsx("text", { className: "bmd-edge-label", textAnchor: "middle", y: 4, children: a })
    ] }) : null
  ] });
});
function r1(e) {
  const { boxes: t, edges: n, viewport: r, onViewport: l, selectedId: i, hoveredId: o, onHover: s, onSelect: a, onMove: u, onMoveEnd: c, colors: f, kindLabels: h, svgRef: g, stageRef: x, hint: k } = e, C = L.useRef(null), [p, m] = L.useState(!1), v = L.useRef(r);
  v.current = r;
  const w = o || i, N = L.useMemo(() => {
    if (!w) return null;
    const O = /* @__PURE__ */ new Set([w]);
    for (const I of n)
      I.source === w && O.add(I.target), I.target === w && O.add(I.source);
    return O;
  }, [w, n]), _ = L.useMemo(() => new Map(t.map((O) => [O.id, O])), [t]);
  L.useEffect(() => {
    const O = x.current;
    if (!O) return;
    const I = (Q) => {
      Q.preventDefault();
      const Se = O.getBoundingClientRect(), oe = v.current, Fe = Q.clientX - Se.left, $ = Q.clientY - Se.top, z = Math.exp(-Q.deltaY * (Q.ctrlKey ? 0.01 : 16e-4)), R = Ho(oe.k * z), U = (Fe - oe.x) / oe.k, A = ($ - oe.y) / oe.k;
      l({ k: R, x: Fe - U * R, y: $ - A * R });
    };
    return O.addEventListener("wheel", I, { passive: !1 }), () => O.removeEventListener("wheel", I);
  }, [x, l]);
  const y = (O) => {
    let I = O;
    for (; I && I !== x.current; ) {
      const Q = I.getAttribute && I.getAttribute("data-node");
      if (Q) return Q;
      I = I.parentNode;
    }
    return null;
  }, j = (O) => {
    if (O.button !== 0) return;
    const I = y(O.target);
    if (O.currentTarget.setPointerCapture(O.pointerId), I) {
      const Q = _.get(I);
      if (!Q) return;
      C.current = { type: "drag", pointer: O.pointerId, id: I, sx: O.clientX, sy: O.clientY, bx: Q.x, by: Q.y, moved: !1 };
    } else
      C.current = { type: "pan", pointer: O.pointerId, sx: O.clientX, sy: O.clientY, vx: r.x, vy: r.y, moved: !1 };
  }, P = (O) => {
    const I = C.current;
    if (!I) {
      const oe = y(O.target);
      oe !== o && s(oe);
      return;
    }
    const Q = O.clientX - I.sx, Se = O.clientY - I.sy;
    !I.moved && Math.hypot(Q, Se) < 4 || (I.moved = !0, I.type === "pan" ? (m(!0), l({ ...r, x: I.vx + Q, y: I.vy + Se })) : u(I.id, I.bx + Q / r.k, I.by + Se / r.k));
  }, S = () => {
    const O = C.current;
    C.current = null, m(!1), O && (O.type === "drag" ? O.moved ? c() : a(O.id) : O.moved || a(null));
  }, B = 22 * r.k;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: x,
      className: `bmd-stage${p ? " is-panning" : ""}`,
      onPointerDown: j,
      onPointerMove: P,
      onPointerUp: S,
      onPointerCancel: S,
      onPointerLeave: () => !C.current && s(null),
      children: [
        /* @__PURE__ */ d.jsxs("svg", { ref: g, className: "bmd-svg", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ d.jsx("style", { children: bf(I0) }),
          /* @__PURE__ */ d.jsx("defs", { children: /* @__PURE__ */ d.jsx("pattern", { id: "bmd-grid", width: B, height: B, patternUnits: "userSpaceOnUse", x: r.x % B, y: r.y % B, children: /* @__PURE__ */ d.jsx("circle", { cx: 1, cy: 1, r: Math.max(0.6, Math.min(1.2, r.k)), fill: "var(--_grid)" }) }) }),
          /* @__PURE__ */ d.jsx("rect", { className: "bmd-grid-bg", width: "100%", height: "100%", fill: r.k > 0.25 ? "url(#bmd-grid)" : "none" }),
          /* @__PURE__ */ d.jsxs("g", { className: "bmd-viewport", transform: `translate(${r.x} ${r.y}) scale(${r.k})`, children: [
            /* @__PURE__ */ d.jsx("g", { className: "bmd-links", children: n.map((O) => {
              const I = !!w && (O.source === w || O.target === w);
              return /* @__PURE__ */ d.jsx(n1, { edge: O, active: I, dim: !!N && !I }, O.id);
            }) }),
            /* @__PURE__ */ d.jsx("g", { className: "bmd-nodes", children: t.map((O) => /* @__PURE__ */ d.jsx(
              t1,
              {
                box: O,
                color: f.get(O.entity.namespace) || "var(--_accent)",
                selected: O.id === i,
                dim: !!N && !N.has(O.id),
                kindLabel: h[O.entity.kind] || null
              },
              O.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "bmd-hint bmd-hide-sm", children: k }),
        e.children
      ]
    }
  );
}
function l1({ boxes: e, viewport: t, stageSize: n, colors: r, onCenter: l }) {
  let a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (const p of e)
    a = Math.min(a, p.x), u = Math.min(u, p.y), c = Math.max(c, p.x + p.width), f = Math.max(f, p.y + p.height);
  if (!e.length) return null;
  const h = Math.min((190 - 8 * 2) / Math.max(1, c - a), (128 - 8 * 2) / Math.max(1, f - u)), g = 8 - a * h + (190 - 8 * 2 - (c - a) * h) / 2, x = 8 - u * h + (128 - 8 * 2 - (f - u) * h) / 2, k = {
    x: -t.x / t.k * h + g,
    y: -t.y / t.k * h + x,
    w: n.width / t.k * h,
    h: n.height / t.k * h
  }, C = (p) => {
    const m = p.currentTarget.getBoundingClientRect(), v = (p.clientX - m.left) / m.width * 190, w = (p.clientY - m.top) / m.height * 128;
    l({ x: (v - g) / h, y: (w - x) / h });
  };
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "bmd-minimap",
      onPointerDown: (p) => {
        p.stopPropagation(), p.currentTarget.setPointerCapture(p.pointerId), C(p);
      },
      onPointerMove: (p) => {
        p.stopPropagation(), p.buttons === 1 && C(p);
      },
      onPointerUp: (p) => p.stopPropagation(),
      children: /* @__PURE__ */ d.jsxs("svg", { viewBox: "0 0 190 128", preserveAspectRatio: "xMidYMid meet", children: [
        e.map((p) => /* @__PURE__ */ d.jsx(
          "rect",
          {
            x: p.x * h + g,
            y: p.y * h + x,
            width: Math.max(1.5, p.width * h),
            height: Math.max(1.5, p.height * h),
            rx: 1.5,
            fill: r.get(p.entity.namespace) || "var(--_accent)",
            opacity: 0.55
          },
          p.id
        )),
        /* @__PURE__ */ d.jsx("rect", { x: k.x, y: k.y, width: k.w, height: k.h, fill: "var(--_accent-soft)", stroke: "var(--_accent)", strokeWidth: 1.2, rx: 2 })
      ] })
    }
  );
}
const ne = (e) => function(n) {
  return /* @__PURE__ */ d.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...n, children: e });
}, i1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("rect", { x: "3", y: "3", width: "7", height: "6", rx: "1.5" }),
    /* @__PURE__ */ d.jsx("rect", { x: "14", y: "15", width: "7", height: "6", rx: "1.5" }),
    /* @__PURE__ */ d.jsx("rect", { x: "14", y: "3", width: "7", height: "6", rx: "1.5" }),
    /* @__PURE__ */ d.jsx("path", { d: "M10 6h4M17.5 9v6" })
  ] })
), o1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ d.jsx("path", { d: "M9 4v16" })
  ] })
), s1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ d.jsx("path", { d: "m20 20-3.5-3.5" })
  ] })
), a1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M12 5v14M5 12h14" })), u1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M5 12h14" })), c1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4" })), d1 = ne(/* @__PURE__ */ d.jsx("path", { d: "m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" })), Nf = ne(/* @__PURE__ */ d.jsx("path", { d: "M12 4v11m0 0-4-4m4 4 4-4M5 20h14" })), f1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M12 20V9m0 0-4 4m4-4 4 4M5 4h14" })), p1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ d.jsx("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })
  ] })
), h1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" })), Cf = ne(/* @__PURE__ */ d.jsx("path", { d: "M6 6l12 12M18 6 6 18" })), m1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("path", { d: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" }),
    /* @__PURE__ */ d.jsx("circle", { cx: "12", cy: "12", r: "3" })
  ] })
), g1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2" })), v1 = ne(/* @__PURE__ */ d.jsx("path", { d: "m6 9 6 6 6-6" })), Tu = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("rect", { x: "3", y: "4", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ d.jsx("rect", { x: "15", y: "4", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ d.jsx("rect", { x: "9", y: "15", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ d.jsx("path", { d: "M6 9v2.5h12V9M12 11.5V15" })
  ] })
), y1 = ne(/* @__PURE__ */ d.jsx("path", { d: "M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16m0 4v-4h-4" })), x1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ d.jsx("path", { d: "M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" })
  ] })
), w1 = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
    /* @__PURE__ */ d.jsx("path", { d: "M5 15V6a2 2 0 0 1 2-2h8" })
  ] })
), Iu = ne(
  /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("ellipse", { cx: "12", cy: "5.5", rx: "7", ry: "2.5" }),
    /* @__PURE__ */ d.jsx("path", { d: "M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" })
  ] })
), Pu = ne(/* @__PURE__ */ d.jsx("path", { d: "M5 12h14m-5-5 5 5-5 5" })), k1 = { OneToOne: "1 : 1", ManyToOne: "N : 1", OneToMany: "1 : N", ManyToMany: "N : N" }, E1 = { OneToOne: "1 : 1", ManyToOne: "1 : N", OneToMany: "N : 1", ManyToMany: "N : N" };
function _1({ entity: e, relations: t, names: n, focused: r, t: l, onClose: i, onSelect: o, onFocusToggle: s }) {
  const [a, u] = L.useState(!1), c = t.filter((g) => g.source === e.id), f = t.filter((g) => g.target === e.id && g.source !== e.id), h = () => {
    navigator.clipboard && navigator.clipboard.writeText(e.id).then(
      () => {
        u(!0), setTimeout(() => u(!1), 1200);
      },
      () => {
      }
    );
  };
  return /* @__PURE__ */ d.jsxs("aside", { className: "bmd-panel", "aria-label": e.name, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "bmd-panel-head", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "bmd-panel-title", children: [
        /* @__PURE__ */ d.jsx("h3", { children: e.name }),
        /* @__PURE__ */ d.jsx("p", { children: e.id })
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn bmd-btn--icon", onClick: i, "aria-label": l.close, title: l.close, children: /* @__PURE__ */ d.jsx(Cf, {}) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "bmd-panel-body", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "bmd-actions", children: [
        /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: s, "aria-pressed": r, children: [
          /* @__PURE__ */ d.jsx(x1, {}),
          r ? l.unfocus : l.focus
        ] }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: h, children: [
          /* @__PURE__ */ d.jsx(w1, {}),
          a ? l.copied : l.copy
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("dl", { className: "bmd-kv", children: [
        e.table ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("dt", { children: l.table }),
          /* @__PURE__ */ d.jsx("dd", { children: e.table })
        ] }) : null,
        /* @__PURE__ */ d.jsx("dt", { children: l.kind }),
        /* @__PURE__ */ d.jsx("dd", { children: e.kind }),
        e.parent ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("dt", { children: l.parent }),
          /* @__PURE__ */ d.jsx("dd", { children: /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-link", onClick: () => o(e.parent), children: n.get(e.parent) || e.parent }) })
        ] }) : null
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "bmd-section", children: [
        l.fields,
        " · ",
        e.fields.length
      ] }),
      /* @__PURE__ */ d.jsx("table", { className: "bmd-fields", children: /* @__PURE__ */ d.jsx("tbody", { children: e.fields.map((g) => /* @__PURE__ */ d.jsxs("tr", { children: [
        /* @__PURE__ */ d.jsxs("td", { children: [
          /* @__PURE__ */ d.jsx("span", { style: { fontWeight: g.id ? 650 : 400 }, children: g.name }),
          /* @__PURE__ */ d.jsxs("span", { className: "bmd-badges", children: [
            g.id ? /* @__PURE__ */ d.jsx("span", { className: "bmd-badge bmd-badge--accent", title: l.primary, children: "PK" }) : null,
            g.unique && !g.id ? /* @__PURE__ */ d.jsx("span", { className: "bmd-badge", children: l.unique }) : null,
            g.nullable ? /* @__PURE__ */ d.jsx("span", { className: "bmd-badge", children: l.nullable }) : null
          ] }),
          g.column && g.column !== g.name ? /* @__PURE__ */ d.jsx("small", { children: g.column }) : null
        ] }),
        /* @__PURE__ */ d.jsxs("td", { className: "bmd-col-type", children: [
          g.type,
          g.length ? `(${g.length})` : ""
        ] })
      ] }, g.name)) }) }),
      c.length ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "bmd-section", children: [
          l.outgoing,
          " · ",
          c.length
        ] }),
        c.map((g) => /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-rel", onClick: () => o(g.target), title: g.joinTable || g.joinColumns.join(", "), children: [
          /* @__PURE__ */ d.jsx("span", { className: "bmd-rel-type", children: k1[g.type] }),
          /* @__PURE__ */ d.jsxs("span", { className: "bmd-rel-name", children: [
            g.field,
            " → ",
            /* @__PURE__ */ d.jsx("b", { children: n.get(g.target) || g.target })
          ] }),
          /* @__PURE__ */ d.jsx(Pu, { className: "bmd-icon" })
        ] }, g.id))
      ] }) : null,
      f.length ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "bmd-section", children: [
          l.incoming,
          " · ",
          f.length
        ] }),
        f.map((g) => /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-rel", onClick: () => o(g.source), children: [
          /* @__PURE__ */ d.jsx("span", { className: "bmd-rel-type", children: E1[g.type] }),
          /* @__PURE__ */ d.jsxs("span", { className: "bmd-rel-name", children: [
            /* @__PURE__ */ d.jsx("b", { children: n.get(g.source) || g.source }),
            ".",
            g.field,
            g.inverseField ? ` (${g.inverseField})` : ""
          ] }),
          /* @__PURE__ */ d.jsx(Pu, { className: "bmd-icon" })
        ] }, g.id))
      ] }) : null
    ] })
  ] });
}
function b1({ initial: e, t, canReset: n, onApply: r, onReset: l, onDownload: i, onClose: o }) {
  const [s, a] = L.useState(e), [u, c] = L.useState(null), f = L.useRef(null), h = L.useRef(null), g = L.useRef(!1);
  L.useEffect(() => {
    g.current || a(e);
  }, [e]), L.useEffect(() => {
    if (!g.current) return;
    const C = setTimeout(() => {
      try {
        r(G0(s)), c(null);
      } catch (p) {
        p instanceof Yt ? c({ message: p.message, line: p.line }) : c({ message: String(p), line: 0 });
      }
    }, 350);
    return () => clearTimeout(C);
  }, [s, r]);
  const x = L.useMemo(() => s.split(`
`).length, [s]), k = (C) => {
    const p = new FileReader();
    p.onload = () => {
      g.current = !0, a(String(p.result || ""));
    }, p.readAsText(C);
  };
  return /* @__PURE__ */ d.jsxs("aside", { className: "bmd-panel bmd-panel--wide", "aria-label": t.jdlTitle, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "bmd-panel-head", children: [
      /* @__PURE__ */ d.jsx("div", { className: "bmd-panel-title", children: /* @__PURE__ */ d.jsx("h3", { children: t.jdlTitle }) }),
      /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn bmd-btn--icon", onClick: o, "aria-label": t.close, title: t.close, children: /* @__PURE__ */ d.jsx(Cf, {}) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "bmd-jdl", children: [
      /* @__PURE__ */ d.jsx("p", { className: "bmd-jdl-hint", children: t.jdlHint }),
      /* @__PURE__ */ d.jsxs("div", { className: "bmd-editor", children: [
        /* @__PURE__ */ d.jsx("div", { className: "bmd-gutter", ref: h, children: Array.from({ length: x }, (C, p) => /* @__PURE__ */ d.jsx("div", { className: u && u.line === p + 1 ? "is-error" : void 0, children: p + 1 }, p)) }),
        /* @__PURE__ */ d.jsx(
          "textarea",
          {
            name: "jdl",
            className: "bmd-textarea",
            spellCheck: !1,
            value: s,
            wrap: "off",
            onScroll: (C) => {
              h.current && (h.current.scrollTop = C.currentTarget.scrollTop);
            },
            onChange: (C) => {
              g.current = !0, a(C.target.value);
            },
            onKeyDown: (C) => {
              if (C.key === "Tab") {
                C.preventDefault();
                const p = C.currentTarget, m = p.selectionStart, v = `${s.slice(0, m)}  ${s.slice(p.selectionEnd)}`;
                g.current = !0, a(v), requestAnimationFrame(() => p.setSelectionRange(m + 2, m + 2));
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "bmd-jdl-foot", children: [
        u ? /* @__PURE__ */ d.jsxs("div", { className: "bmd-error-msg", children: [
          u.line ? `${t.parseError} ${u.line} — ` : "",
          u.message
        ] }) : null,
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: f,
            type: "file",
            accept: ".jdl,.jh,.txt",
            hidden: !0,
            onChange: (C) => {
              const p = C.target.files && C.target.files[0];
              p && k(p), C.target.value = "";
            }
          }
        ),
        /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: () => f.current && f.current.click(), children: [
          /* @__PURE__ */ d.jsx(f1, {}),
          t.import
        ] }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: () => i(s), children: [
          /* @__PURE__ */ d.jsx(Nf, {}),
          t.download
        ] }),
        n ? /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: "bmd-btn bmd-btn--outline",
            style: { marginLeft: "auto" },
            onClick: () => {
              g.current = !1, c(null), l();
            },
            children: [
              /* @__PURE__ */ d.jsx(y1, {}),
              t.reset
            ]
          }
        ) : null
      ] })
    ] })
  ] });
}
function S1({ entities: e, hidden: t, selectedId: n, colors: r, t: l, onToggle: i, onSetAll: o, onFocus: s, searchRef: a }) {
  const [u, c] = L.useState(""), [f, h] = L.useState(/* @__PURE__ */ new Set()), g = L.useMemo(() => {
    const p = u.trim().toLowerCase();
    return p ? e.filter((m) => m.id.toLowerCase().includes(p) || (m.table || "").toLowerCase().includes(p)) : e;
  }, [e, u]), x = L.useMemo(() => {
    const p = /* @__PURE__ */ new Map();
    for (const m of g) {
      const v = p.get(m.namespace) || [];
      v.push(m), p.set(m.namespace, v);
    }
    return Array.from(p.entries()).sort(([m], [v]) => m.localeCompare(v));
  }, [g]), k = e.filter((p) => !t.has(p.id)).length, C = g.map((p) => p.id);
  return /* @__PURE__ */ d.jsxs("aside", { className: "bmd-sidebar", "aria-label": l.entities, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "bmd-sidebar-head", children: [
      /* @__PURE__ */ d.jsxs("label", { className: "bmd-search", children: [
        /* @__PURE__ */ d.jsx(s1, {}),
        /* @__PURE__ */ d.jsx("input", { ref: a, name: "search", className: "bmd-input", type: "search", placeholder: l.search, value: u, onChange: (p) => c(p.target.value) })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "bmd-sidebar-meta", children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          k,
          " / ",
          e.length,
          " ",
          l.visible
        ] }),
        /* @__PURE__ */ d.jsxs("span", { style: { display: "flex", gap: 10 }, children: [
          /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-link", onClick: () => o(!0, C), children: l.showAll }),
          /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-link", onClick: () => o(!1, C), children: l.hideAll })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "bmd-tree", children: [
      x.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: "bmd-empty-list", children: l.noResult }) : null,
      x.map(([p, m]) => {
        const v = f.has(p) && !u;
        return /* @__PURE__ */ d.jsxs("div", { className: "bmd-ns", children: [
          /* @__PURE__ */ d.jsxs(
            "button",
            {
              type: "button",
              className: "bmd-ns-head",
              "aria-expanded": !v,
              onClick: () => h((w) => {
                const N = new Set(w);
                return N.has(p) ? N.delete(p) : N.add(p), N;
              }),
              title: p,
              children: [
                /* @__PURE__ */ d.jsx(v1, {}),
                /* @__PURE__ */ d.jsx("span", { className: "bmd-dot", style: { background: r.get(p) } }),
                /* @__PURE__ */ d.jsx("span", { className: "bmd-ns-name", children: p || "\\" }),
                /* @__PURE__ */ d.jsx("span", { className: "bmd-count", children: m.length })
              ]
            }
          ),
          !v && m.map((w) => {
            const N = t.has(w.id);
            return /* @__PURE__ */ d.jsxs("div", { className: `bmd-item${N ? " is-hidden" : ""}${n === w.id ? " is-selected" : ""}`, children: [
              /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-eye", onClick: () => i(w.id), "aria-label": N ? l.showAll : l.hideAll, title: w.id, children: N ? /* @__PURE__ */ d.jsx(g1, {}) : /* @__PURE__ */ d.jsx(m1, {}) }),
              /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-item-name", onClick: () => s(w.id), title: w.table ? `${w.id} (${w.table})` : w.id, children: w.name })
            ] }, w.id);
          })
        ] }, p || "_");
      })
    ] })
  ] });
}
const Mf = { hidden: [], positions: {}, direction: "TB", detail: "all" };
function j1(e, t) {
  const n = { ...Mf, detail: t > 40 ? "keys" : "all" };
  if (!e) return n;
  try {
    const r = window.localStorage.getItem(e);
    return r ? { ...n, ...JSON.parse(r) } : n;
  } catch {
    return n;
  }
}
function N1(e, t) {
  if (e)
    try {
      window.localStorage.setItem(e, JSON.stringify(t));
    } catch {
    }
}
function C1() {
  const e = typeof window != "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, [t, n] = L.useState(e ? e.matches : !1);
  return L.useEffect(() => {
    if (!e) return;
    const r = (l) => n(l.matches);
    return e.addEventListener("change", r), () => e.removeEventListener("change", r);
  }, [e]), t;
}
function zu(e) {
  const t = [e.database, e.driver ? `(${e.driver})` : null].filter(Boolean).join(" ");
  return t ? `${e.name} — ${t}` : e.name;
}
function M1(e) {
  const t = L.useMemo(() => U0(e.locale), [e.locale]), n = L.useRef(e);
  n.current = e;
  const r = L.useRef(null), l = L.useRef(null), i = L.useRef(null), o = L.useRef(null), s = C1(), [a, u] = L.useState(null), c = a || (e.theme === "light" || e.theme === "dark" ? e.theme : s ? "dark" : "light"), [f, h] = L.useState(null);
  L.useLayoutEffect(() => {
    e.injectStyles !== !1 && X0(r.current);
    const E = r.current ? getComputedStyle(r.current) : null, M = E && E.fontFamily || "sans-serif", F = E && E.getPropertyValue("--_mono").trim() || "monospace";
    h(() => K0(M, F));
  }, [e.injectStyles]);
  const [g, x] = L.useState(e.manager), [k, C] = L.useState(e.schema || null), [p, m] = L.useState(null), [v, w] = L.useState(!e.schema), [N, _] = L.useState(null), y = p || k, j = L.useCallback(async (E) => {
    w(!0), _(null);
    try {
      const M = await _m(n.current, E);
      C(M), m(null);
    } catch (M) {
      _(M instanceof Error ? M.message : String(M));
    } finally {
      w(!1);
    }
  }, []);
  L.useEffect(() => {
    if (e.schema) {
      C(e.schema), w(!1);
      return;
    }
    j(g);
  }, [e.schema, e.apiUrl, g, j]), L.useEffect(() => {
    e.manager !== void 0 && x(e.manager);
  }, [e.manager]);
  const P = L.useMemo(() => e.storageKey === !1 || !y ? null : `${e.storageKey || `doctrine-diagram:${e.apiUrl || "static"}`}:${p ? "jdl" : y.manager}`, [e.storageKey, e.apiUrl, y, p]), [S, B] = L.useState(Mf), O = y ? y.entities.length : 0;
  L.useEffect(() => B(j1(P, O)), [P, O]);
  const I = L.useCallback(
    (E) => {
      B((M) => {
        const F = { ...M, ...E };
        return N1(P, F), F;
      });
    },
    [P]
  ), [Q, Se] = L.useState(!0), [oe, Fe] = L.useState(!1), [$, z] = L.useState(null), [R, U] = L.useState(null), [A, nt] = L.useState(null), [je, Qe] = L.useState(!1), [he, ct] = L.useState(null), [rt, Pr] = L.useState({ x: 0, y: 0, k: 1 }), [Of, $f] = L.useState({ width: 800, height: 600 }), [ui, Ws] = L.useState({});
  L.useEffect(() => {
    z(null), nt(null);
  }, [y]), L.useEffect(() => {
    if (!he) return;
    const E = setTimeout(() => ct(null), 1800);
    return () => clearTimeout(E);
  }, [he]), L.useEffect(() => {
    const E = l.current;
    if (!E || typeof ResizeObserver == "undefined") return;
    const M = new ResizeObserver(([F]) => $f({ width: F.contentRect.width, height: F.contentRect.height }));
    return M.observe(E), () => M.disconnect();
  }, [y, v]);
  const me = y ? y.entities : [], un = y ? y.relations : [], An = L.useMemo(() => new Set(S.hidden), [S.hidden]), ci = L.useMemo(() => {
    const E = /* @__PURE__ */ new Map();
    return me.forEach((M) => E.set(M.name, (E.get(M.name) || 0) + 1)), new Map(me.map((M) => [M.id, E.get(M.name) === 1 ? M.name : M.id]));
  }, [me]), di = L.useMemo(() => {
    const E = /* @__PURE__ */ new Map();
    return me.forEach((M) => {
      E.has(M.namespace) || E.set(M.namespace, z0(M.namespace));
    }), E;
  }, [me]), zr = L.useMemo(() => {
    let E = me.filter((M) => !An.has(M.id));
    if (A) {
      const M = /* @__PURE__ */ new Set([A]);
      un.forEach((H) => {
        H.source === A && M.add(H.target), H.target === A && M.add(H.source);
      });
      const F = me.find((H) => H.id === A);
      F && F.parent && M.add(F.parent), E = me.filter((H) => M.has(H.id));
    }
    return E;
  }, [me, un, An, A]), cn = L.useMemo(() => {
    const E = new Set(zr.map((M) => M.id));
    return un.filter((M) => E.has(M.source) && E.has(M.target));
  }, [zr, un]), Rr = L.useMemo(() => f ? zr.map((E) => {
    const M = O0(E, cn, ci, S.detail), { width: F, height: H } = $0(E, M, f);
    return { id: E.id, entity: E, rows: M, width: F, height: H };
  }) : [], [zr, cn, ci, S.detail, f]), Hs = L.useMemo(() => L0(Rr, cn, S.direction), [Rr, cn, S.direction]), Le = L.useMemo(
    () => Rr.map((E) => {
      const M = ui[E.id] || !A && S.positions[E.id] || Hs.get(E.id) || { x: 0, y: 0 };
      return { ...E, x: M.x, y: M.y };
    }),
    [Rr, Hs, S.positions, ui, A]
  ), Un = L.useMemo(() => new Map(Le.map((E) => [E.id, E])), [Le]), Lf = L.useMemo(() => T0(Un, cn), [Un, cn]), Dr = L.useCallback(
    (E = Le) => {
      const M = l.current;
      if (!M || !E.length) return;
      const F = M.clientWidth, H = M.clientHeight, ge = _f(E), dt = Ho(Math.min((F - 80) / Math.max(1, ge.width), (H - 80) / Math.max(1, ge.height), 1.1));
      Pr({ k: dt, x: (F - ge.width * dt) / 2 - ge.x * dt, y: (H - ge.height * dt) / 2 - ge.y * dt });
    },
    [Le]
  ), fi = `${y ? y.manager : ""}|${p ? "jdl" : "db"}|${S.direction}|${S.detail}|${A || ""}|${Le.length > 0}`, pi = L.useRef("");
  L.useLayoutEffect(() => {
    !Le.length || pi.current === fi || (pi.current = fi, Dr(Le));
  }, [fi, Le, Dr]);
  const Fr = (E) => {
    const M = l.current, F = M ? M.clientWidth : 800, H = M ? M.clientHeight : 600;
    Pr((ge) => {
      const dt = Ho(ge.k * E), Df = (F / 2 - ge.x) / ge.k, Ff = (H / 2 - ge.y) / ge.k;
      return { k: dt, x: F / 2 - Df * dt, y: H / 2 - Ff * dt };
    });
  }, hi = (E, M) => {
    const F = l.current;
    F && Pr((H) => {
      const ge = M || H.k;
      return { k: ge, x: F.clientWidth / 2 - E.x * ge, y: F.clientHeight / 2 - E.y * ge };
    });
  }, Ar = L.useCallback(
    (E) => {
      if (z(E), n.current.onEntitySelect) {
        const M = E && me.find((F) => F.id === E) || null;
        n.current.onEntitySelect(M);
      }
    },
    [me]
  ), Gs = (E) => {
    An.has(E) && I({ hidden: S.hidden.filter((F) => F !== E) }), Ar(E);
    const M = Un.get(E);
    M && hi({ x: M.x + M.width / 2, y: M.y + M.height / 2 }, Math.max(rt.k, 0.8));
  };
  L.useEffect(() => {
    if (!$) return;
    const E = Un.get($), M = l.current;
    if (!E || !M) return;
    const F = E.x * rt.k + rt.x, H = E.y * rt.k + rt.y;
    (F > M.clientWidth || H > M.clientHeight || F + E.width * rt.k < 0 || H + E.height * rt.k < 0) && hi({ x: E.x + E.width / 2, y: E.y + E.height / 2 });
  }, [$, Un]);
  const Tf = (E) => {
    x(E), n.current.onManagerChange && n.current.onManagerChange(E);
  }, Vn = y ? p ? "diagram" : y.manager : "diagram", Ur = async (E) => {
    if (Qe(!1), !!y)
      try {
        E === "json" && fr(JSON.stringify(y, null, 2), `${Vn}.json`, "application/json"), E === "jdl" && fr(Ou(y), `${Vn}.jdl`), E === "svg" && i.current && r.current && R0(i.current, Le, r.current, `${Vn}.svg`), E === "png" && i.current && r.current && await D0(i.current, Le, r.current, `${Vn}.png`);
      } catch (M) {
        ct(M instanceof Error ? M.message : String(M));
      }
  }, If = (E) => {
    const M = E.target.tagName;
    if (M === "INPUT" || M === "TEXTAREA" || M === "SELECT") {
      E.key === "Escape" && E.target.blur();
      return;
    }
    E.key === "/" ? (E.preventDefault(), Se(!0), setTimeout(() => o.current && o.current.focus(), 0)) : E.key === "f" ? Dr() : E.key === "+" || E.key === "=" ? Fr(1.2) : E.key === "-" ? Fr(1 / 1.2) : E.key === "Escape" && (Qe(!1), Ar(null));
  }, Bn = $ && me.find((E) => E.id === $) || null, mi = k ? k.managers : [], Qs = mi.find((E) => E.name === (k && k.manager)), Pf = e.title || y && y.title || "Doctrine Diagram", zf = y ? p ? `${t.jdlSource} · ${me.length} ${t.entities.toLowerCase()}` : `${me.length} ${t.entities.toLowerCase()} · ${un.length} ${t.relations.toLowerCase()}` : "", Rf = { mapped_superclass: "mapped", embeddable: "embeddable", enum: "enum" };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: r,
      className: `bmd${e.className ? ` ${e.className}` : ""}`,
      "data-theme": c,
      style: { height: e.height === void 0 ? "100%" : e.height },
      onKeyDown: If,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "bmd-toolbar", children: [
          /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn bmd-btn--icon", "aria-pressed": Q, onClick: () => Se((E) => !E), title: t.toggleSidebar, "aria-label": t.toggleSidebar, children: /* @__PURE__ */ d.jsx(o1, {}) }),
          /* @__PURE__ */ d.jsxs("div", { className: "bmd-brand", children: [
            /* @__PURE__ */ d.jsx("span", { className: "bmd-logo", children: /* @__PURE__ */ d.jsx(i1, { className: "bmd-icon" }) }),
            /* @__PURE__ */ d.jsxs("div", { style: { minWidth: 0 }, children: [
              /* @__PURE__ */ d.jsx("div", { className: "bmd-title", children: Pf }),
              /* @__PURE__ */ d.jsx("div", { className: "bmd-subtitle", children: zf })
            ] })
          ] }),
          mi.length ? /* @__PURE__ */ d.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, title: t.manager, children: [
            /* @__PURE__ */ d.jsx(Iu, { className: "bmd-icon", style: { color: "var(--_muted)" } }),
            /* @__PURE__ */ d.jsx("select", { name: "manager", className: "bmd-select", value: k ? k.manager : "", onChange: (E) => Tf(E.target.value), "aria-label": t.manager, disabled: !!e.schema, children: mi.map((E) => /* @__PURE__ */ d.jsx("option", { value: E.name, children: zu(E) }, E.name)) })
          ] }) : null,
          p ? /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: () => m(null), title: Qs ? zu(Qs) : "", children: [
            /* @__PURE__ */ d.jsx(Iu, {}),
            t.reset
          ] }) : null,
          /* @__PURE__ */ d.jsx("span", { className: "bmd-sep bmd-hide-sm" }),
          /* @__PURE__ */ d.jsx("div", { className: "bmd-group bmd-hide-sm", role: "group", "aria-label": t.detail, children: ["all", "keys", "none"].map((E) => /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn", "aria-pressed": S.detail === E, onClick: () => I({ detail: E }), children: E === "all" ? t.detailAll : E === "keys" ? t.detailKeys : t.detailNone }, E)) }),
          /* @__PURE__ */ d.jsxs("div", { className: "bmd-group bmd-hide-sm", role: "group", "aria-label": t.direction, children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn", "aria-pressed": S.direction === "LR", onClick: () => I({ direction: "LR", positions: {} }), title: t.horizontal, children: /* @__PURE__ */ d.jsx(Tu, { style: { transform: "rotate(-90deg)" } }) }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn", "aria-pressed": S.direction === "TB", onClick: () => I({ direction: "TB", positions: {} }), title: t.vertical, children: /* @__PURE__ */ d.jsx(Tu, {}) })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "bmd-group", role: "group", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn", onClick: () => Fr(1 / 1.25), title: t.zoomOut, "aria-label": t.zoomOut, children: /* @__PURE__ */ d.jsx(u1, {}) }),
            /* @__PURE__ */ d.jsxs("span", { className: "bmd-zoom", children: [
              Math.round(rt.k * 100),
              "%"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn", onClick: () => Fr(1.25), title: t.zoomIn, "aria-label": t.zoomIn, children: /* @__PURE__ */ d.jsx(a1, {}) }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn", onClick: () => Dr(), title: t.fit, "aria-label": t.fit, children: /* @__PURE__ */ d.jsx(c1, {}) })
          ] }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "bmd-btn bmd-btn--outline bmd-hide-sm",
              onClick: () => {
                I({ positions: {} }), pi.current = "";
              },
              title: t.relayout,
              children: t.relayout
            }
          ),
          /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--outline", "aria-pressed": oe, onClick: () => Fe((E) => !E), title: t.jdlTitle, children: [
            /* @__PURE__ */ d.jsx(d1, {}),
            t.jdl
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "bmd-menu", children: [
            /* @__PURE__ */ d.jsxs("button", { type: "button", className: "bmd-btn bmd-btn--primary", "aria-haspopup": "menu", "aria-expanded": je, onClick: () => Qe((E) => !E), disabled: !y, children: [
              /* @__PURE__ */ d.jsx(Nf, {}),
              /* @__PURE__ */ d.jsx("span", { className: "bmd-hide-sm", children: t.export })
            ] }),
            je ? /* @__PURE__ */ d.jsxs("div", { className: "bmd-menu-list", role: "menu", children: [
              /* @__PURE__ */ d.jsx("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Ur("svg"), children: t.exportSvg }),
              /* @__PURE__ */ d.jsx("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Ur("png"), children: t.exportPng }),
              /* @__PURE__ */ d.jsx("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Ur("json"), children: t.exportJson }),
              /* @__PURE__ */ d.jsx("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Ur("jdl"), children: t.exportJdl })
            ] }) : null
          ] }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "bmd-btn bmd-btn--icon",
              onClick: () => u(c === "dark" ? "light" : "dark"),
              title: t.theme,
              "aria-label": t.theme,
              children: c === "dark" ? /* @__PURE__ */ d.jsx(p1, {}) : /* @__PURE__ */ d.jsx(h1, {})
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "bmd-body", onPointerDown: () => je && Qe(!1), children: [
          Q && y ? /* @__PURE__ */ d.jsx(
            S1,
            {
              entities: me,
              hidden: An,
              selectedId: $,
              colors: di,
              t,
              searchRef: o,
              onToggle: (E) => I({ hidden: An.has(E) ? S.hidden.filter((M) => M !== E) : [...S.hidden, E] }),
              onSetAll: (E, M) => {
                const F = new Set(S.hidden);
                M.forEach((H) => E ? F.delete(H) : F.add(H)), I({ hidden: Array.from(F) });
              },
              onFocus: Gs
            }
          ) : null,
          /* @__PURE__ */ d.jsxs(
            r1,
            {
              boxes: Le,
              edges: Lf,
              viewport: rt,
              onViewport: Pr,
              selectedId: $,
              hoveredId: R,
              onHover: U,
              onSelect: Ar,
              onMove: (E, M, F) => Ws((H) => ({ ...H, [E]: { x: M, y: F } })),
              onMoveEnd: () => {
                A || I({ positions: { ...S.positions, ...ui } }), Ws({});
              },
              colors: di,
              kindLabels: Rf,
              svgRef: i,
              stageRef: l,
              hint: t.shortcuts,
              children: [
                v ? /* @__PURE__ */ d.jsx("div", { className: "bmd-state", children: /* @__PURE__ */ d.jsxs("div", { className: "bmd-state-box", children: [
                  /* @__PURE__ */ d.jsx("div", { className: "bmd-spinner" }),
                  t.loading
                ] }) }) : null,
                !v && N ? /* @__PURE__ */ d.jsx("div", { className: "bmd-state", children: /* @__PURE__ */ d.jsxs("div", { className: "bmd-state-box", children: [
                  /* @__PURE__ */ d.jsx("strong", { children: t.error }),
                  /* @__PURE__ */ d.jsx("span", { children: N }),
                  /* @__PURE__ */ d.jsx("button", { type: "button", className: "bmd-btn bmd-btn--primary", onClick: () => j(g), children: t.retry })
                ] }) }) : null,
                !v && !N && y && !me.length ? /* @__PURE__ */ d.jsx("div", { className: "bmd-state", children: /* @__PURE__ */ d.jsx("div", { className: "bmd-state-box", children: t.empty }) }) : null,
                Le.length > 1 ? /* @__PURE__ */ d.jsx(l1, { boxes: Le, viewport: rt, stageSize: Of, colors: di, onCenter: (E) => hi(E) }) : null,
                he ? /* @__PURE__ */ d.jsx("div", { className: "bmd-toast", children: he }) : null
              ]
            }
          ),
          Bn && !oe ? /* @__PURE__ */ d.jsx(
            _1,
            {
              entity: Bn,
              relations: un,
              names: ci,
              focused: A === Bn.id,
              t,
              onClose: () => Ar(null),
              onSelect: Gs,
              onFocusToggle: () => nt((E) => E === Bn.id ? null : Bn.id)
            }
          ) : null,
          oe ? /* @__PURE__ */ d.jsx(
            b1,
            {
              initial: k ? Ou(k) : "",
              t,
              canReset: !!k,
              onApply: m,
              onReset: () => m(null),
              onDownload: (E) => fr(E, `${Vn}.jdl`),
              onClose: () => Fe(!1)
            }
          ) : null
        ] })
      ]
    }
  );
}
function O1(e, t) {
  const n = Kd(e);
  let r = { ...t };
  const l = () => n.render(/* @__PURE__ */ d.jsx(M1, { ...r }));
  return l(), {
    update(i) {
      r = { ...r, ...i }, l();
    },
    unmount() {
      n.unmount();
    }
  };
}
const z1 = Vf({
  name: "DoctrineDiagram",
  props: {
    apiUrl: { type: String, default: void 0 },
    manager: { type: String, default: void 0 },
    schema: { type: Object, default: void 0 },
    headers: { type: [Object, Function], default: void 0 },
    credentials: { type: String, default: void 0 },
    fetch: { type: Function, default: void 0 },
    theme: { type: String, default: void 0 },
    locale: { type: String, default: void 0 },
    title: { type: String, default: void 0 },
    height: { type: [String, Number], default: "100%" },
    storageKey: { type: [String, Boolean], default: void 0 },
    injectStyles: { type: Boolean, default: !0 }
  },
  emits: ["entity-select", "manager-change"],
  setup(e, { emit: t }) {
    const n = Bf(null);
    let r = null;
    const l = () => ({
      apiUrl: e.apiUrl,
      manager: e.manager,
      schema: e.schema,
      headers: e.headers,
      credentials: e.credentials,
      fetch: e.fetch,
      theme: e.theme,
      locale: e.locale,
      title: e.title,
      height: "100%",
      storageKey: e.storageKey,
      injectStyles: e.injectStyles,
      onEntitySelect: (i) => t("entity-select", i),
      onManagerChange: (i) => t("manager-change", i)
    });
    return Wf(() => {
      n.value && (r = O1(n.value, l()));
    }), Hf(
      () => ({ ...e }),
      () => r && r.update(l())
    ), Gf(() => {
      r && r.unmount(), r = null;
    }), () => Qf("div", {
      ref: n,
      style: { height: typeof e.height == "number" ? `${e.height}px` : e.height }
    });
  }
});
export {
  z1 as DoctrineDiagram,
  z1 as default,
  O1 as mount
};

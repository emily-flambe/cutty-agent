(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
  new MutationObserver((o) => {
    for (const c of o)
      if (c.type === "childList")
        for (const s of c.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(o) {
    const c = {};
    return (
      o.integrity && (c.integrity = o.integrity),
      o.referrerPolicy && (c.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function i(o) {
    if (o.ep) return;
    o.ep = !0;
    const c = a(o);
    fetch(o.href, c);
  }
})();
function gi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var xc = { exports: {} },
  Xa = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wp;
function ex() {
  if (Wp) return Xa;
  Wp = 1;
  var t = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function a(i, o, c) {
    var s = null;
    if (
      (c !== void 0 && (s = "" + c),
      o.key !== void 0 && (s = "" + o.key),
      "key" in o)
    ) {
      c = {};
      for (var h in o) h !== "key" && (c[h] = o[h]);
    } else c = o;
    return (
      (o = c.ref),
      { $$typeof: t, type: i, key: s, ref: o !== void 0 ? o : null, props: c }
    );
  }
  return ((Xa.Fragment = l), (Xa.jsx = a), (Xa.jsxs = a), Xa);
}
var e1;
function tx() {
  return (e1 || ((e1 = 1), (xc.exports = ex())), xc.exports);
}
var Z = tx(),
  vc = { exports: {} },
  $a = {},
  kc = { exports: {} },
  Sc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var t1;
function nx() {
  return (
    t1 ||
      ((t1 = 1),
      (function (t) {
        function l(L, J) {
          var Q = L.length;
          L.push(J);
          e: for (; 0 < Q; ) {
            var be = (Q - 1) >>> 1,
              x = L[be];
            if (0 < o(x, J)) ((L[be] = J), (L[Q] = x), (Q = be));
            else break e;
          }
        }
        function a(L) {
          return L.length === 0 ? null : L[0];
        }
        function i(L) {
          if (L.length === 0) return null;
          var J = L[0],
            Q = L.pop();
          if (Q !== J) {
            L[0] = Q;
            e: for (var be = 0, x = L.length, G = x >>> 1; be < G; ) {
              var re = 2 * (be + 1) - 1,
                w = L[re],
                oe = re + 1,
                ge = L[oe];
              if (0 > o(w, Q))
                oe < x && 0 > o(ge, w)
                  ? ((L[be] = ge), (L[oe] = Q), (be = oe))
                  : ((L[be] = w), (L[re] = Q), (be = re));
              else if (oe < x && 0 > o(ge, Q))
                ((L[be] = ge), (L[oe] = Q), (be = oe));
              else break e;
            }
          }
          return J;
        }
        function o(L, J) {
          var Q = L.sortIndex - J.sortIndex;
          return Q !== 0 ? Q : L.id - J.id;
        }
        if (
          ((t.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var c = performance;
          t.unstable_now = function () {
            return c.now();
          };
        } else {
          var s = Date,
            h = s.now();
          t.unstable_now = function () {
            return s.now() - h;
          };
        }
        var p = [],
          m = [],
          y = 1,
          g = null,
          k = 3,
          v = !1,
          A = !1,
          C = !1,
          U = !1,
          R = typeof setTimeout == "function" ? setTimeout : null,
          Y = typeof clearTimeout == "function" ? clearTimeout : null,
          V = typeof setImmediate < "u" ? setImmediate : null;
        function ee(L) {
          for (var J = a(m); J !== null; ) {
            if (J.callback === null) i(m);
            else if (J.startTime <= L)
              (i(m), (J.sortIndex = J.expirationTime), l(p, J));
            else break;
            J = a(m);
          }
        }
        function O(L) {
          if (((C = !1), ee(L), !A))
            if (a(p) !== null) ((A = !0), _ || ((_ = !0), te()));
            else {
              var J = a(m);
              J !== null && ue(O, J.startTime - L);
            }
        }
        var _ = !1,
          F = -1,
          q = 5,
          K = -1;
        function z() {
          return U ? !0 : !(t.unstable_now() - K < q);
        }
        function ne() {
          if (((U = !1), _)) {
            var L = t.unstable_now();
            K = L;
            var J = !0;
            try {
              e: {
                ((A = !1), C && ((C = !1), Y(F), (F = -1)), (v = !0));
                var Q = k;
                try {
                  t: {
                    for (
                      ee(L), g = a(p);
                      g !== null && !(g.expirationTime > L && z());

                    ) {
                      var be = g.callback;
                      if (typeof be == "function") {
                        ((g.callback = null), (k = g.priorityLevel));
                        var x = be(g.expirationTime <= L);
                        if (((L = t.unstable_now()), typeof x == "function")) {
                          ((g.callback = x), ee(L), (J = !0));
                          break t;
                        }
                        (g === a(p) && i(p), ee(L));
                      } else i(p);
                      g = a(p);
                    }
                    if (g !== null) J = !0;
                    else {
                      var G = a(m);
                      (G !== null && ue(O, G.startTime - L), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((g = null), (k = Q), (v = !1));
                }
                J = void 0;
              }
            } finally {
              J ? te() : (_ = !1);
            }
          }
        }
        var te;
        if (typeof V == "function")
          te = function () {
            V(ne);
          };
        else if (typeof MessageChannel < "u") {
          var le = new MessageChannel(),
            ie = le.port2;
          ((le.port1.onmessage = ne),
            (te = function () {
              ie.postMessage(null);
            }));
        } else
          te = function () {
            R(ne, 0);
          };
        function ue(L, J) {
          F = R(function () {
            L(t.unstable_now());
          }, J);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (L) {
            L.callback = null;
          }),
          (t.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (q = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return k;
          }),
          (t.unstable_next = function (L) {
            switch (k) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = k;
            }
            var Q = k;
            k = J;
            try {
              return L();
            } finally {
              k = Q;
            }
          }),
          (t.unstable_requestPaint = function () {
            U = !0;
          }),
          (t.unstable_runWithPriority = function (L, J) {
            switch (L) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                L = 3;
            }
            var Q = k;
            k = L;
            try {
              return J();
            } finally {
              k = Q;
            }
          }),
          (t.unstable_scheduleCallback = function (L, J, Q) {
            var be = t.unstable_now();
            switch (
              (typeof Q == "object" && Q !== null
                ? ((Q = Q.delay),
                  (Q = typeof Q == "number" && 0 < Q ? be + Q : be))
                : (Q = be),
              L)
            ) {
              case 1:
                var x = -1;
                break;
              case 2:
                x = 250;
                break;
              case 5:
                x = 1073741823;
                break;
              case 4:
                x = 1e4;
                break;
              default:
                x = 5e3;
            }
            return (
              (x = Q + x),
              (L = {
                id: y++,
                callback: J,
                priorityLevel: L,
                startTime: Q,
                expirationTime: x,
                sortIndex: -1,
              }),
              Q > be
                ? ((L.sortIndex = Q),
                  l(m, L),
                  a(p) === null &&
                    L === a(m) &&
                    (C ? (Y(F), (F = -1)) : (C = !0), ue(O, Q - be)))
                : ((L.sortIndex = x),
                  l(p, L),
                  A || v || ((A = !0), _ || ((_ = !0), te()))),
              L
            );
          }),
          (t.unstable_shouldYield = z),
          (t.unstable_wrapCallback = function (L) {
            var J = k;
            return function () {
              var Q = k;
              k = J;
              try {
                return L.apply(this, arguments);
              } finally {
                k = Q;
              }
            };
          }));
      })(Sc)),
    Sc
  );
}
var n1;
function lx() {
  return (n1 || ((n1 = 1), (kc.exports = nx())), kc.exports);
}
var wc = { exports: {} },
  Re = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var l1;
function rx() {
  if (l1) return Re;
  l1 = 1;
  var t = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    a = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    c = Symbol.for("react.consumer"),
    s = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    g = Symbol.iterator;
  function k(x) {
    return x === null || typeof x != "object"
      ? null
      : ((x = (g && x[g]) || x["@@iterator"]),
        typeof x == "function" ? x : null);
  }
  var v = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    A = Object.assign,
    C = {};
  function U(x, G, re) {
    ((this.props = x),
      (this.context = G),
      (this.refs = C),
      (this.updater = re || v));
  }
  ((U.prototype.isReactComponent = {}),
    (U.prototype.setState = function (x, G) {
      if (typeof x != "object" && typeof x != "function" && x != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, x, G, "setState");
    }),
    (U.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, "forceUpdate");
    }));
  function R() {}
  R.prototype = U.prototype;
  function Y(x, G, re) {
    ((this.props = x),
      (this.context = G),
      (this.refs = C),
      (this.updater = re || v));
  }
  var V = (Y.prototype = new R());
  ((V.constructor = Y), A(V, U.prototype), (V.isPureReactComponent = !0));
  var ee = Array.isArray,
    O = { H: null, A: null, T: null, S: null, V: null },
    _ = Object.prototype.hasOwnProperty;
  function F(x, G, re, w, oe, ge) {
    return (
      (re = ge.ref),
      {
        $$typeof: t,
        type: x,
        key: G,
        ref: re !== void 0 ? re : null,
        props: ge,
      }
    );
  }
  function q(x, G) {
    return F(x.type, G, void 0, void 0, void 0, x.props);
  }
  function K(x) {
    return typeof x == "object" && x !== null && x.$$typeof === t;
  }
  function z(x) {
    var G = { "=": "=0", ":": "=2" };
    return (
      "$" +
      x.replace(/[=:]/g, function (re) {
        return G[re];
      })
    );
  }
  var ne = /\/+/g;
  function te(x, G) {
    return typeof x == "object" && x !== null && x.key != null
      ? z("" + x.key)
      : G.toString(36);
  }
  function le() {}
  function ie(x) {
    switch (x.status) {
      case "fulfilled":
        return x.value;
      case "rejected":
        throw x.reason;
      default:
        switch (
          (typeof x.status == "string"
            ? x.then(le, le)
            : ((x.status = "pending"),
              x.then(
                function (G) {
                  x.status === "pending" &&
                    ((x.status = "fulfilled"), (x.value = G));
                },
                function (G) {
                  x.status === "pending" &&
                    ((x.status = "rejected"), (x.reason = G));
                }
              )),
          x.status)
        ) {
          case "fulfilled":
            return x.value;
          case "rejected":
            throw x.reason;
        }
    }
    throw x;
  }
  function ue(x, G, re, w, oe) {
    var ge = typeof x;
    (ge === "undefined" || ge === "boolean") && (x = null);
    var se = !1;
    if (x === null) se = !0;
    else
      switch (ge) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (x.$$typeof) {
            case t:
            case l:
              se = !0;
              break;
            case y:
              return ((se = x._init), ue(se(x._payload), G, re, w, oe));
          }
      }
    if (se)
      return (
        (oe = oe(x)),
        (se = w === "" ? "." + te(x, 0) : w),
        ee(oe)
          ? ((re = ""),
            se != null && (re = se.replace(ne, "$&/") + "/"),
            ue(oe, G, re, "", function (lt) {
              return lt;
            }))
          : oe != null &&
            (K(oe) &&
              (oe = q(
                oe,
                re +
                  (oe.key == null || (x && x.key === oe.key)
                    ? ""
                    : ("" + oe.key).replace(ne, "$&/") + "/") +
                  se
              )),
            G.push(oe)),
        1
      );
    se = 0;
    var Ee = w === "" ? "." : w + ":";
    if (ee(x))
      for (var Te = 0; Te < x.length; Te++)
        ((w = x[Te]), (ge = Ee + te(w, Te)), (se += ue(w, G, re, ge, oe)));
    else if (((Te = k(x)), typeof Te == "function"))
      for (x = Te.call(x), Te = 0; !(w = x.next()).done; )
        ((w = w.value), (ge = Ee + te(w, Te++)), (se += ue(w, G, re, ge, oe)));
    else if (ge === "object") {
      if (typeof x.then == "function") return ue(ie(x), G, re, w, oe);
      throw (
        (G = String(x)),
        Error(
          "Objects are not valid as a React child (found: " +
            (G === "[object Object]"
              ? "object with keys {" + Object.keys(x).join(", ") + "}"
              : G) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    }
    return se;
  }
  function L(x, G, re) {
    if (x == null) return x;
    var w = [],
      oe = 0;
    return (
      ue(x, w, "", "", function (ge) {
        return G.call(re, ge, oe++);
      }),
      w
    );
  }
  function J(x) {
    if (x._status === -1) {
      var G = x._result;
      ((G = G()),
        G.then(
          function (re) {
            (x._status === 0 || x._status === -1) &&
              ((x._status = 1), (x._result = re));
          },
          function (re) {
            (x._status === 0 || x._status === -1) &&
              ((x._status = 2), (x._result = re));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = G)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var Q =
    typeof reportError == "function"
      ? reportError
      : function (x) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var G = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof x == "object" &&
                x !== null &&
                typeof x.message == "string"
                  ? String(x.message)
                  : String(x),
              error: x,
            });
            if (!window.dispatchEvent(G)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", x);
            return;
          }
          console.error(x);
        };
  function be() {}
  return (
    (Re.Children = {
      map: L,
      forEach: function (x, G, re) {
        L(
          x,
          function () {
            G.apply(this, arguments);
          },
          re
        );
      },
      count: function (x) {
        var G = 0;
        return (
          L(x, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (x) {
        return (
          L(x, function (G) {
            return G;
          }) || []
        );
      },
      only: function (x) {
        if (!K(x))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return x;
      },
    }),
    (Re.Component = U),
    (Re.Fragment = a),
    (Re.Profiler = o),
    (Re.PureComponent = Y),
    (Re.StrictMode = i),
    (Re.Suspense = p),
    (Re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O),
    (Re.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return O.H.useMemoCache(x);
      },
    }),
    (Re.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (Re.cloneElement = function (x, G, re) {
      if (x == null)
        throw Error(
          "The argument must be a React element, but you passed " + x + "."
        );
      var w = A({}, x.props),
        oe = x.key,
        ge = void 0;
      if (G != null)
        for (se in (G.ref !== void 0 && (ge = void 0),
        G.key !== void 0 && (oe = "" + G.key),
        G))
          !_.call(G, se) ||
            se === "key" ||
            se === "__self" ||
            se === "__source" ||
            (se === "ref" && G.ref === void 0) ||
            (w[se] = G[se]);
      var se = arguments.length - 2;
      if (se === 1) w.children = re;
      else if (1 < se) {
        for (var Ee = Array(se), Te = 0; Te < se; Te++)
          Ee[Te] = arguments[Te + 2];
        w.children = Ee;
      }
      return F(x.type, oe, void 0, void 0, ge, w);
    }),
    (Re.createContext = function (x) {
      return (
        (x = {
          $$typeof: s,
          _currentValue: x,
          _currentValue2: x,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (x.Provider = x),
        (x.Consumer = { $$typeof: c, _context: x }),
        x
      );
    }),
    (Re.createElement = function (x, G, re) {
      var w,
        oe = {},
        ge = null;
      if (G != null)
        for (w in (G.key !== void 0 && (ge = "" + G.key), G))
          _.call(G, w) &&
            w !== "key" &&
            w !== "__self" &&
            w !== "__source" &&
            (oe[w] = G[w]);
      var se = arguments.length - 2;
      if (se === 1) oe.children = re;
      else if (1 < se) {
        for (var Ee = Array(se), Te = 0; Te < se; Te++)
          Ee[Te] = arguments[Te + 2];
        oe.children = Ee;
      }
      if (x && x.defaultProps)
        for (w in ((se = x.defaultProps), se))
          oe[w] === void 0 && (oe[w] = se[w]);
      return F(x, ge, void 0, void 0, null, oe);
    }),
    (Re.createRef = function () {
      return { current: null };
    }),
    (Re.forwardRef = function (x) {
      return { $$typeof: h, render: x };
    }),
    (Re.isValidElement = K),
    (Re.lazy = function (x) {
      return { $$typeof: y, _payload: { _status: -1, _result: x }, _init: J };
    }),
    (Re.memo = function (x, G) {
      return { $$typeof: m, type: x, compare: G === void 0 ? null : G };
    }),
    (Re.startTransition = function (x) {
      var G = O.T,
        re = {};
      O.T = re;
      try {
        var w = x(),
          oe = O.S;
        (oe !== null && oe(re, w),
          typeof w == "object" &&
            w !== null &&
            typeof w.then == "function" &&
            w.then(be, Q));
      } catch (ge) {
        Q(ge);
      } finally {
        O.T = G;
      }
    }),
    (Re.unstable_useCacheRefresh = function () {
      return O.H.useCacheRefresh();
    }),
    (Re.use = function (x) {
      return O.H.use(x);
    }),
    (Re.useActionState = function (x, G, re) {
      return O.H.useActionState(x, G, re);
    }),
    (Re.useCallback = function (x, G) {
      return O.H.useCallback(x, G);
    }),
    (Re.useContext = function (x) {
      return O.H.useContext(x);
    }),
    (Re.useDebugValue = function () {}),
    (Re.useDeferredValue = function (x, G) {
      return O.H.useDeferredValue(x, G);
    }),
    (Re.useEffect = function (x, G, re) {
      var w = O.H;
      if (typeof re == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return w.useEffect(x, G);
    }),
    (Re.useId = function () {
      return O.H.useId();
    }),
    (Re.useImperativeHandle = function (x, G, re) {
      return O.H.useImperativeHandle(x, G, re);
    }),
    (Re.useInsertionEffect = function (x, G) {
      return O.H.useInsertionEffect(x, G);
    }),
    (Re.useLayoutEffect = function (x, G) {
      return O.H.useLayoutEffect(x, G);
    }),
    (Re.useMemo = function (x, G) {
      return O.H.useMemo(x, G);
    }),
    (Re.useOptimistic = function (x, G) {
      return O.H.useOptimistic(x, G);
    }),
    (Re.useReducer = function (x, G, re) {
      return O.H.useReducer(x, G, re);
    }),
    (Re.useRef = function (x) {
      return O.H.useRef(x);
    }),
    (Re.useState = function (x) {
      return O.H.useState(x);
    }),
    (Re.useSyncExternalStore = function (x, G, re) {
      return O.H.useSyncExternalStore(x, G, re);
    }),
    (Re.useTransition = function () {
      return O.H.useTransition();
    }),
    (Re.version = "19.1.0"),
    Re
  );
}
var r1;
function Wu() {
  return (r1 || ((r1 = 1), (wc.exports = rx())), wc.exports);
}
var Ec = { exports: {} },
  Dt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var a1;
function ax() {
  if (a1) return Dt;
  a1 = 1;
  var t = Wu();
  function l(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function a() {}
  var i = {
      d: {
        f: a,
        r: function () {
          throw Error(l(522));
        },
        D: a,
        C: a,
        L: a,
        m: a,
        X: a,
        S: a,
        M: a,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function c(p, m, y) {
    var g =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
      children: p,
      containerInfo: m,
      implementation: y,
    };
  }
  var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Dt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
    (Dt.createPortal = function (p, m) {
      var y =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(l(299));
      return c(p, m, null, y);
    }),
    (Dt.flushSync = function (p) {
      var m = s.T,
        y = i.p;
      try {
        if (((s.T = null), (i.p = 2), p)) return p();
      } finally {
        ((s.T = m), (i.p = y), i.d.f());
      }
    }),
    (Dt.preconnect = function (p, m) {
      typeof p == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        i.d.C(p, m));
    }),
    (Dt.prefetchDNS = function (p) {
      typeof p == "string" && i.d.D(p);
    }),
    (Dt.preinit = function (p, m) {
      if (typeof p == "string" && m && typeof m.as == "string") {
        var y = m.as,
          g = h(y, m.crossOrigin),
          k = typeof m.integrity == "string" ? m.integrity : void 0,
          v = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        y === "style"
          ? i.d.S(p, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: g,
              integrity: k,
              fetchPriority: v,
            })
          : y === "script" &&
            i.d.X(p, {
              crossOrigin: g,
              integrity: k,
              fetchPriority: v,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Dt.preinitModule = function (p, m) {
      if (typeof p == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var y = h(m.as, m.crossOrigin);
            i.d.M(p, {
              crossOrigin: y,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && i.d.M(p);
    }),
    (Dt.preload = function (p, m) {
      if (
        typeof p == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var y = m.as,
          g = h(y, m.crossOrigin);
        i.d.L(p, y, {
          crossOrigin: g,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Dt.preloadModule = function (p, m) {
      if (typeof p == "string")
        if (m) {
          var y = h(m.as, m.crossOrigin);
          i.d.m(p, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else i.d.m(p);
    }),
    (Dt.requestFormReset = function (p) {
      i.d.r(p);
    }),
    (Dt.unstable_batchedUpdates = function (p, m) {
      return p(m);
    }),
    (Dt.useFormState = function (p, m, y) {
      return s.H.useFormState(p, m, y);
    }),
    (Dt.useFormStatus = function () {
      return s.H.useHostTransitionStatus();
    }),
    (Dt.version = "19.1.0"),
    Dt
  );
}
var i1;
function ix() {
  if (i1) return Ec.exports;
  i1 = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (l) {
        console.error(l);
      }
  }
  return (t(), (Ec.exports = ax()), Ec.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var u1;
function ux() {
  if (u1) return $a;
  u1 = 1;
  var t = lx(),
    l = Wu(),
    a = ix();
  function i(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function c(e) {
    var n = e,
      r = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do ((n = e), (n.flags & 4098) !== 0 && (r = n.return), (e = n.return));
      while (e);
    }
    return n.tag === 3 ? r : null;
  }
  function s(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (
        (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (c(e) !== e) throw Error(i(188));
  }
  function p(e) {
    var n = e.alternate;
    if (!n) {
      if (((n = c(e)), n === null)) throw Error(i(188));
      return n !== e ? null : e;
    }
    for (var r = e, u = n; ; ) {
      var f = r.return;
      if (f === null) break;
      var d = f.alternate;
      if (d === null) {
        if (((u = f.return), u !== null)) {
          r = u;
          continue;
        }
        break;
      }
      if (f.child === d.child) {
        for (d = f.child; d; ) {
          if (d === r) return (h(f), e);
          if (d === u) return (h(f), n);
          d = d.sibling;
        }
        throw Error(i(188));
      }
      if (r.return !== u.return) ((r = f), (u = d));
      else {
        for (var b = !1, S = f.child; S; ) {
          if (S === r) {
            ((b = !0), (r = f), (u = d));
            break;
          }
          if (S === u) {
            ((b = !0), (u = f), (r = d));
            break;
          }
          S = S.sibling;
        }
        if (!b) {
          for (S = d.child; S; ) {
            if (S === r) {
              ((b = !0), (r = d), (u = f));
              break;
            }
            if (S === u) {
              ((b = !0), (u = d), (r = f));
              break;
            }
            S = S.sibling;
          }
          if (!b) throw Error(i(189));
        }
      }
      if (r.alternate !== u) throw Error(i(190));
    }
    if (r.tag !== 3) throw Error(i(188));
    return r.stateNode.current === r ? e : n;
  }
  function m(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((n = m(e)), n !== null)) return n;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign,
    g = Symbol.for("react.element"),
    k = Symbol.for("react.transitional.element"),
    v = Symbol.for("react.portal"),
    A = Symbol.for("react.fragment"),
    C = Symbol.for("react.strict_mode"),
    U = Symbol.for("react.profiler"),
    R = Symbol.for("react.provider"),
    Y = Symbol.for("react.consumer"),
    V = Symbol.for("react.context"),
    ee = Symbol.for("react.forward_ref"),
    O = Symbol.for("react.suspense"),
    _ = Symbol.for("react.suspense_list"),
    F = Symbol.for("react.memo"),
    q = Symbol.for("react.lazy"),
    K = Symbol.for("react.activity"),
    z = Symbol.for("react.memo_cache_sentinel"),
    ne = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (ne && e[ne]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function ie(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case U:
        return "Profiler";
      case C:
        return "StrictMode";
      case O:
        return "Suspense";
      case _:
        return "SuspenseList";
      case K:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case v:
          return "Portal";
        case V:
          return (e.displayName || "Context") + ".Provider";
        case Y:
          return (e._context.displayName || "Context") + ".Consumer";
        case ee:
          var n = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = n.displayName || n.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case F:
          return (
            (n = e.displayName || null),
            n !== null ? n : ie(e.type) || "Memo"
          );
        case q:
          ((n = e._payload), (e = e._init));
          try {
            return ie(e(n));
          } catch {}
      }
    return null;
  }
  var ue = Array.isArray,
    L = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = { pending: !1, data: null, method: null, action: null },
    be = [],
    x = -1;
  function G(e) {
    return { current: e };
  }
  function re(e) {
    0 > x || ((e.current = be[x]), (be[x] = null), x--);
  }
  function w(e, n) {
    (x++, (be[x] = e.current), (e.current = n));
  }
  var oe = G(null),
    ge = G(null),
    se = G(null),
    Ee = G(null);
  function Te(e, n) {
    switch ((w(se, n), w(ge, e), w(oe, null), n.nodeType)) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Tp(e) : 0;
        break;
      default:
        if (((e = n.tagName), (n = n.namespaceURI)))
          ((n = Tp(n)), (e = Cp(n, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (re(oe), w(oe, e));
  }
  function lt() {
    (re(oe), re(ge), re(se));
  }
  function at(e) {
    e.memoizedState !== null && w(Ee, e);
    var n = oe.current,
      r = Cp(n, e.type);
    n !== r && (w(ge, e), w(oe, r));
  }
  function xt(e) {
    (ge.current === e && (re(oe), re(ge)),
      Ee.current === e && (re(Ee), (Ia._currentValue = Q)));
  }
  var Ae = Object.prototype.hasOwnProperty,
    Se = t.unstable_scheduleCallback,
    ve = t.unstable_cancelCallback,
    Oe = t.unstable_shouldYield,
    _e = t.unstable_requestPaint,
    Ie = t.unstable_now,
    At = t.unstable_getCurrentPriorityLevel,
    Fe = t.unstable_ImmediatePriority,
    Ye = t.unstable_UserBlockingPriority,
    ft = t.unstable_NormalPriority,
    el = t.unstable_LowPriority,
    On = t.unstable_IdlePriority,
    tl = t.log,
    mt = t.unstable_setDisableYieldValue,
    I = null,
    W = null;
  function de(e) {
    if (
      (typeof tl == "function" && mt(e),
      W && typeof W.setStrictMode == "function")
    )
      try {
        W.setStrictMode(I, e);
      } catch {}
  }
  var me = Math.clz32 ? Math.clz32 : ln,
    Ve = Math.log,
    Rt = Math.LN2;
  function ln(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ve(e) / Rt) | 0)) | 0);
  }
  var Bt = 256,
    kn = 4194304;
  function Qt(e) {
    var n = e & 42;
    if (n !== 0) return n;
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
        return 64;
      case 128:
        return 128;
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
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function vt(e, n, r) {
    var u = e.pendingLanes;
    if (u === 0) return 0;
    var f = 0,
      d = e.suspendedLanes,
      b = e.pingedLanes;
    e = e.warmLanes;
    var S = u & 134217727;
    return (
      S !== 0
        ? ((u = S & ~d),
          u !== 0
            ? (f = Qt(u))
            : ((b &= S),
              b !== 0
                ? (f = Qt(b))
                : r || ((r = S & ~e), r !== 0 && (f = Qt(r)))))
        : ((S = u & ~d),
          S !== 0
            ? (f = Qt(S))
            : b !== 0
              ? (f = Qt(b))
              : r || ((r = u & ~e), r !== 0 && (f = Qt(r)))),
      f === 0
        ? 0
        : n !== 0 &&
            n !== f &&
            (n & d) === 0 &&
            ((d = f & -f),
            (r = n & -n),
            d >= r || (d === 32 && (r & 4194048) !== 0))
          ? n
          : f
    );
  }
  function rn(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function gn(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
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
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ch() {
    var e = Bt;
    return ((Bt <<= 1), (Bt & 4194048) === 0 && (Bt = 256), e);
  }
  function fh() {
    var e = kn;
    return ((kn <<= 1), (kn & 62914560) === 0 && (kn = 4194304), e);
  }
  function uo(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function Wr(e, n) {
    ((e.pendingLanes |= n),
      n !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Zy(e, n, r, u, f, d) {
    var b = e.pendingLanes;
    ((e.pendingLanes = r),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= r),
      (e.entangledLanes &= r),
      (e.errorRecoveryDisabledLanes &= r),
      (e.shellSuspendCounter = 0));
    var S = e.entanglements,
      T = e.expirationTimes,
      H = e.hiddenUpdates;
    for (r = b & ~r; 0 < r; ) {
      var X = 31 - me(r),
        P = 1 << X;
      ((S[X] = 0), (T[X] = -1));
      var j = H[X];
      if (j !== null)
        for (H[X] = null, X = 0; X < j.length; X++) {
          var B = j[X];
          B !== null && (B.lane &= -536870913);
        }
      r &= ~P;
    }
    (u !== 0 && hh(e, u, 0),
      d !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(b & ~n)));
  }
  function hh(e, n, r) {
    ((e.pendingLanes |= n), (e.suspendedLanes &= ~n));
    var u = 31 - me(n);
    ((e.entangledLanes |= n),
      (e.entanglements[u] = e.entanglements[u] | 1073741824 | (r & 4194090)));
  }
  function dh(e, n) {
    var r = (e.entangledLanes |= n);
    for (e = e.entanglements; r; ) {
      var u = 31 - me(r),
        f = 1 << u;
      ((f & n) | (e[u] & n) && (e[u] |= n), (r &= ~f));
    }
  }
  function oo(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function so(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function ph() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Qp(e.type));
  }
  function Iy(e, n) {
    var r = J.p;
    try {
      return ((J.p = e), n());
    } finally {
      J.p = r;
    }
  }
  var nl = Math.random().toString(36).slice(2),
    Mt = "__reactFiber$" + nl,
    Vt = "__reactProps$" + nl,
    nr = "__reactContainer$" + nl,
    co = "__reactEvents$" + nl,
    Yy = "__reactListeners$" + nl,
    Gy = "__reactHandles$" + nl,
    mh = "__reactResources$" + nl,
    ea = "__reactMarker$" + nl;
  function fo(e) {
    (delete e[Mt], delete e[Vt], delete e[co], delete e[Yy], delete e[Gy]);
  }
  function lr(e) {
    var n = e[Mt];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if ((n = r[nr] || r[Mt])) {
        if (
          ((r = n.alternate),
          n.child !== null || (r !== null && r.child !== null))
        )
          for (e = Dp(e); e !== null; ) {
            if ((r = e[Mt])) return r;
            e = Dp(e);
          }
        return n;
      }
      ((e = r), (r = e.parentNode));
    }
    return null;
  }
  function rr(e) {
    if ((e = e[Mt] || e[nr])) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function ta(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function ar(e) {
    var n = e[mh];
    return (
      n ||
        (n = e[mh] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      n
    );
  }
  function kt(e) {
    e[ea] = !0;
  }
  var gh = new Set(),
    yh = {};
  function Ml(e, n) {
    (ir(e, n), ir(e + "Capture", n));
  }
  function ir(e, n) {
    for (yh[e] = n, e = 0; e < n.length; e++) gh.add(n[e]);
  }
  var Fy = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    bh = {},
    xh = {};
  function Qy(e) {
    return Ae.call(xh, e)
      ? !0
      : Ae.call(bh, e)
        ? !1
        : Fy.test(e)
          ? (xh[e] = !0)
          : ((bh[e] = !0), !1);
  }
  function Si(e, n, r) {
    if (Qy(n))
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var u = n.toLowerCase().slice(0, 5);
            if (u !== "data-" && u !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + r);
      }
  }
  function wi(e, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + r);
    }
  }
  function Nn(e, n, r, u) {
    if (u === null) e.removeAttribute(r);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(r);
          return;
      }
      e.setAttributeNS(n, r, "" + u);
    }
  }
  var ho, vh;
  function ur(e) {
    if (ho === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        ((ho = (n && n[1]) || ""),
          (vh =
            -1 <
            r.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < r.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      ho +
      e +
      vh
    );
  }
  var po = !1;
  function mo(e, n) {
    if (!e || po) return "";
    po = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var u = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var P = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(P.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(P, []);
                } catch (B) {
                  var j = B;
                }
                Reflect.construct(e, [], P);
              } else {
                try {
                  P.call();
                } catch (B) {
                  j = B;
                }
                e.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                j = B;
              }
              (P = e()) &&
                typeof P.catch == "function" &&
                P.catch(function () {});
            }
          } catch (B) {
            if (B && j && typeof B.stack == "string") return [B.stack, j.stack];
          }
          return [null, null];
        },
      };
      u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        u.DetermineComponentFrameRoot,
        "name"
      );
      f &&
        f.configurable &&
        Object.defineProperty(u.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var d = u.DetermineComponentFrameRoot(),
        b = d[0],
        S = d[1];
      if (b && S) {
        var T = b.split(`
`),
          H = S.split(`
`);
        for (
          f = u = 0;
          u < T.length && !T[u].includes("DetermineComponentFrameRoot");

        )
          u++;
        for (; f < H.length && !H[f].includes("DetermineComponentFrameRoot"); )
          f++;
        if (u === T.length || f === H.length)
          for (
            u = T.length - 1, f = H.length - 1;
            1 <= u && 0 <= f && T[u] !== H[f];

          )
            f--;
        for (; 1 <= u && 0 <= f; u--, f--)
          if (T[u] !== H[f]) {
            if (u !== 1 || f !== 1)
              do
                if ((u--, f--, 0 > f || T[u] !== H[f])) {
                  var X =
                    `
` + T[u].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      X.includes("<anonymous>") &&
                      (X = X.replace("<anonymous>", e.displayName)),
                    X
                  );
                }
              while (1 <= u && 0 <= f);
            break;
          }
      }
    } finally {
      ((po = !1), (Error.prepareStackTrace = r));
    }
    return (r = e ? e.displayName || e.name : "") ? ur(r) : "";
  }
  function Xy(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ur(e.type);
      case 16:
        return ur("Lazy");
      case 13:
        return ur("Suspense");
      case 19:
        return ur("SuspenseList");
      case 0:
      case 15:
        return mo(e.type, !1);
      case 11:
        return mo(e.type.render, !1);
      case 1:
        return mo(e.type, !0);
      case 31:
        return ur("Activity");
      default:
        return "";
    }
  }
  function kh(e) {
    try {
      var n = "";
      do ((n += Xy(e)), (e = e.return));
      while (e);
      return n;
    } catch (r) {
      return (
        `
Error generating stack: ` +
        r.message +
        `
` +
        r.stack
      );
    }
  }
  function an(e) {
    switch (typeof e) {
      case "bigint":
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
  function Sh(e) {
    var n = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function $y(e) {
    var n = Sh(e) ? "checked" : "value",
      r = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
      u = "" + e[n];
    if (
      !e.hasOwnProperty(n) &&
      typeof r < "u" &&
      typeof r.get == "function" &&
      typeof r.set == "function"
    ) {
      var f = r.get,
        d = r.set;
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return f.call(this);
          },
          set: function (b) {
            ((u = "" + b), d.call(this, b));
          },
        }),
        Object.defineProperty(e, n, { enumerable: r.enumerable }),
        {
          getValue: function () {
            return u;
          },
          setValue: function (b) {
            u = "" + b;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[n]);
          },
        }
      );
    }
  }
  function Ei(e) {
    e._valueTracker || (e._valueTracker = $y(e));
  }
  function wh(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(),
      u = "";
    return (
      e && (u = Sh(e) ? (e.checked ? "true" : "false") : e.value),
      (e = u),
      e !== r ? (n.setValue(e), !0) : !1
    );
  }
  function Ai(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Py = /[\n"\\]/g;
  function un(e) {
    return e.replace(Py, function (n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function go(e, n, r, u, f, d, b, S) {
    ((e.name = ""),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (e.type = b)
        : e.removeAttribute("type"),
      n != null
        ? b === "number"
          ? ((n === 0 && e.value === "") || e.value != n) &&
            (e.value = "" + an(n))
          : e.value !== "" + an(n) && (e.value = "" + an(n))
        : (b !== "submit" && b !== "reset") || e.removeAttribute("value"),
      n != null
        ? yo(e, b, an(n))
        : r != null
          ? yo(e, b, an(r))
          : u != null && e.removeAttribute("value"),
      f == null && d != null && (e.defaultChecked = !!d),
      f != null &&
        (e.checked = f && typeof f != "function" && typeof f != "symbol"),
      S != null &&
      typeof S != "function" &&
      typeof S != "symbol" &&
      typeof S != "boolean"
        ? (e.name = "" + an(S))
        : e.removeAttribute("name"));
  }
  function Eh(e, n, r, u, f, d, b, S) {
    if (
      (d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (e.type = d),
      n != null || r != null)
    ) {
      if (!((d !== "submit" && d !== "reset") || n != null)) return;
      ((r = r != null ? "" + an(r) : ""),
        (n = n != null ? "" + an(n) : r),
        S || n === e.value || (e.value = n),
        (e.defaultValue = n));
    }
    ((u = u ?? f),
      (u = typeof u != "function" && typeof u != "symbol" && !!u),
      (e.checked = S ? e.checked : !!u),
      (e.defaultChecked = !!u),
      b != null &&
        typeof b != "function" &&
        typeof b != "symbol" &&
        typeof b != "boolean" &&
        (e.name = b));
  }
  function yo(e, n, r) {
    (n === "number" && Ai(e.ownerDocument) === e) ||
      e.defaultValue === "" + r ||
      (e.defaultValue = "" + r);
  }
  function or(e, n, r, u) {
    if (((e = e.options), n)) {
      n = {};
      for (var f = 0; f < r.length; f++) n["$" + r[f]] = !0;
      for (r = 0; r < e.length; r++)
        ((f = n.hasOwnProperty("$" + e[r].value)),
          e[r].selected !== f && (e[r].selected = f),
          f && u && (e[r].defaultSelected = !0));
    } else {
      for (r = "" + an(r), n = null, f = 0; f < e.length; f++) {
        if (e[f].value === r) {
          ((e[f].selected = !0), u && (e[f].defaultSelected = !0));
          return;
        }
        n !== null || e[f].disabled || (n = e[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Ah(e, n, r) {
    if (
      n != null &&
      ((n = "" + an(n)), n !== e.value && (e.value = n), r == null)
    ) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + an(r) : "";
  }
  function _h(e, n, r, u) {
    if (n == null) {
      if (u != null) {
        if (r != null) throw Error(i(92));
        if (ue(u)) {
          if (1 < u.length) throw Error(i(93));
          u = u[0];
        }
        r = u;
      }
      (r == null && (r = ""), (n = r));
    }
    ((r = an(n)),
      (e.defaultValue = r),
      (u = e.textContent),
      u === r && u !== "" && u !== null && (e.value = u));
  }
  function sr(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Ky = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Th(e, n, r) {
    var u = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === ""
      ? u
        ? e.setProperty(n, "")
        : n === "float"
          ? (e.cssFloat = "")
          : (e[n] = "")
      : u
        ? e.setProperty(n, r)
        : typeof r != "number" || r === 0 || Ky.has(n)
          ? n === "float"
            ? (e.cssFloat = r)
            : (e[n] = ("" + r).trim())
          : (e[n] = r + "px");
  }
  function Ch(e, n, r) {
    if (n != null && typeof n != "object") throw Error(i(62));
    if (((e = e.style), r != null)) {
      for (var u in r)
        !r.hasOwnProperty(u) ||
          (n != null && n.hasOwnProperty(u)) ||
          (u.indexOf("--") === 0
            ? e.setProperty(u, "")
            : u === "float"
              ? (e.cssFloat = "")
              : (e[u] = ""));
      for (var f in n)
        ((u = n[f]), n.hasOwnProperty(f) && r[f] !== u && Th(e, f, u));
    } else for (var d in n) n.hasOwnProperty(d) && Th(e, d, n[d]);
  }
  function bo(e) {
    if (e.indexOf("-") === -1) return !1;
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
  var Jy = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Wy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function _i(e) {
    return Wy.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var xo = null;
  function vo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var cr = null,
    fr = null;
  function Rh(e) {
    var n = rr(e);
    if (n && (e = n.stateNode)) {
      var r = e[Vt] || null;
      e: switch (((e = n.stateNode), n.type)) {
        case "input":
          if (
            (go(
              e,
              r.value,
              r.defaultValue,
              r.defaultValue,
              r.checked,
              r.defaultChecked,
              r.type,
              r.name
            ),
            (n = r.name),
            r.type === "radio" && n != null)
          ) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (
              r = r.querySelectorAll(
                'input[name="' + un("" + n) + '"][type="radio"]'
              ),
                n = 0;
              n < r.length;
              n++
            ) {
              var u = r[n];
              if (u !== e && u.form === e.form) {
                var f = u[Vt] || null;
                if (!f) throw Error(i(90));
                go(
                  u,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name
                );
              }
            }
            for (n = 0; n < r.length; n++)
              ((u = r[n]), u.form === e.form && wh(u));
          }
          break e;
        case "textarea":
          Ah(e, r.value, r.defaultValue);
          break e;
        case "select":
          ((n = r.value), n != null && or(e, !!r.multiple, n, !1));
      }
    }
  }
  var ko = !1;
  function Mh(e, n, r) {
    if (ko) return e(n, r);
    ko = !0;
    try {
      var u = e(n);
      return u;
    } finally {
      if (
        ((ko = !1),
        (cr !== null || fr !== null) &&
          (fu(), cr && ((n = cr), (e = fr), (fr = cr = null), Rh(n), e)))
      )
        for (n = 0; n < e.length; n++) Rh(e[n]);
    }
  }
  function na(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var u = r[Vt] || null;
    if (u === null) return null;
    r = u[n];
    e: switch (n) {
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
        ((u = !u.disabled) ||
          ((e = e.type),
          (u = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !u));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(i(231, n, typeof r));
    return r;
  }
  var Ln = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    So = !1;
  if (Ln)
    try {
      var la = {};
      (Object.defineProperty(la, "passive", {
        get: function () {
          So = !0;
        },
      }),
        window.addEventListener("test", la, la),
        window.removeEventListener("test", la, la));
    } catch {
      So = !1;
    }
  var ll = null,
    wo = null,
    Ti = null;
  function zh() {
    if (Ti) return Ti;
    var e,
      n = wo,
      r = n.length,
      u,
      f = "value" in ll ? ll.value : ll.textContent,
      d = f.length;
    for (e = 0; e < r && n[e] === f[e]; e++);
    var b = r - e;
    for (u = 1; u <= b && n[r - u] === f[d - u]; u++);
    return (Ti = f.slice(e, 1 < u ? 1 - u : void 0));
  }
  function Ci(e) {
    var n = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
        : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ri() {
    return !0;
  }
  function Dh() {
    return !1;
  }
  function qt(e) {
    function n(r, u, f, d, b) {
      ((this._reactName = r),
        (this._targetInst = f),
        (this.type = u),
        (this.nativeEvent = d),
        (this.target = b),
        (this.currentTarget = null));
      for (var S in e)
        e.hasOwnProperty(S) && ((r = e[S]), (this[S] = r ? r(d) : d[S]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Ri
          : Dh),
        (this.isPropagationStopped = Dh),
        this
      );
    }
    return (
      y(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var r = this.nativeEvent;
          r &&
            (r.preventDefault
              ? r.preventDefault()
              : typeof r.returnValue != "unknown" && (r.returnValue = !1),
            (this.isDefaultPrevented = Ri));
        },
        stopPropagation: function () {
          var r = this.nativeEvent;
          r &&
            (r.stopPropagation
              ? r.stopPropagation()
              : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
            (this.isPropagationStopped = Ri));
        },
        persist: function () {},
        isPersistent: Ri,
      }),
      n
    );
  }
  var zl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Mi = qt(zl),
    ra = y({}, zl, { view: 0, detail: 0 }),
    e2 = qt(ra),
    Eo,
    Ao,
    aa,
    zi = y({}, ra, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: To,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== aa &&
              (aa && e.type === "mousemove"
                ? ((Eo = e.screenX - aa.screenX), (Ao = e.screenY - aa.screenY))
                : (Ao = Eo = 0),
              (aa = e)),
            Eo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Ao;
      },
    }),
    Oh = qt(zi),
    t2 = y({}, zi, { dataTransfer: 0 }),
    n2 = qt(t2),
    l2 = y({}, ra, { relatedTarget: 0 }),
    _o = qt(l2),
    r2 = y({}, zl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    a2 = qt(r2),
    i2 = y({}, zl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    u2 = qt(i2),
    o2 = y({}, zl, { data: 0 }),
    Nh = qt(o2),
    s2 = {
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
      MozPrintableKey: "Unidentified",
    },
    c2 = {
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
      224: "Meta",
    },
    f2 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function h2(e) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(e)
      : (e = f2[e])
        ? !!n[e]
        : !1;
  }
  function To() {
    return h2;
  }
  var d2 = y({}, ra, {
      key: function (e) {
        if (e.key) {
          var n = s2[e.key] || e.key;
          if (n !== "Unidentified") return n;
        }
        return e.type === "keypress"
          ? ((e = Ci(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? c2[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: To,
      charCode: function (e) {
        return e.type === "keypress" ? Ci(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Ci(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    p2 = qt(d2),
    m2 = y({}, zi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Lh = qt(m2),
    g2 = y({}, ra, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: To,
    }),
    y2 = qt(g2),
    b2 = y({}, zl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    x2 = qt(b2),
    v2 = y({}, zi, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    k2 = qt(v2),
    S2 = y({}, zl, { newState: 0, oldState: 0 }),
    w2 = qt(S2),
    E2 = [9, 13, 27, 32],
    Co = Ln && "CompositionEvent" in window,
    ia = null;
  Ln && "documentMode" in document && (ia = document.documentMode);
  var A2 = Ln && "TextEvent" in window && !ia,
    Hh = Ln && (!Co || (ia && 8 < ia && 11 >= ia)),
    jh = " ",
    Uh = !1;
  function Bh(e, n) {
    switch (e) {
      case "keyup":
        return E2.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Vh(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var hr = !1;
  function _2(e, n) {
    switch (e) {
      case "compositionend":
        return Vh(n);
      case "keypress":
        return n.which !== 32 ? null : ((Uh = !0), jh);
      case "textInput":
        return ((e = n.data), e === jh && Uh ? null : e);
      default:
        return null;
    }
  }
  function T2(e, n) {
    if (hr)
      return e === "compositionend" || (!Co && Bh(e, n))
        ? ((e = zh()), (Ti = wo = ll = null), (hr = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Hh && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var C2 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function qh(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!C2[e.type] : n === "textarea";
  }
  function Zh(e, n, r, u) {
    (cr ? (fr ? fr.push(u) : (fr = [u])) : (cr = u),
      (n = yu(n, "onChange")),
      0 < n.length &&
        ((r = new Mi("onChange", "change", null, r, u)),
        e.push({ event: r, listeners: n })));
  }
  var ua = null,
    oa = null;
  function R2(e) {
    Sp(e, 0);
  }
  function Di(e) {
    var n = ta(e);
    if (wh(n)) return e;
  }
  function Ih(e, n) {
    if (e === "change") return n;
  }
  var Yh = !1;
  if (Ln) {
    var Ro;
    if (Ln) {
      var Mo = "oninput" in document;
      if (!Mo) {
        var Gh = document.createElement("div");
        (Gh.setAttribute("oninput", "return;"),
          (Mo = typeof Gh.oninput == "function"));
      }
      Ro = Mo;
    } else Ro = !1;
    Yh = Ro && (!document.documentMode || 9 < document.documentMode);
  }
  function Fh() {
    ua && (ua.detachEvent("onpropertychange", Qh), (oa = ua = null));
  }
  function Qh(e) {
    if (e.propertyName === "value" && Di(oa)) {
      var n = [];
      (Zh(n, oa, e, vo(e)), Mh(R2, n));
    }
  }
  function M2(e, n, r) {
    e === "focusin"
      ? (Fh(), (ua = n), (oa = r), ua.attachEvent("onpropertychange", Qh))
      : e === "focusout" && Fh();
  }
  function z2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Di(oa);
  }
  function D2(e, n) {
    if (e === "click") return Di(n);
  }
  function O2(e, n) {
    if (e === "input" || e === "change") return Di(n);
  }
  function N2(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
  }
  var Xt = typeof Object.is == "function" ? Object.is : N2;
  function sa(e, n) {
    if (Xt(e, n)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var r = Object.keys(e),
      u = Object.keys(n);
    if (r.length !== u.length) return !1;
    for (u = 0; u < r.length; u++) {
      var f = r[u];
      if (!Ae.call(n, f) || !Xt(e[f], n[f])) return !1;
    }
    return !0;
  }
  function Xh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $h(e, n) {
    var r = Xh(e);
    e = 0;
    for (var u; r; ) {
      if (r.nodeType === 3) {
        if (((u = e + r.textContent.length), e <= n && u >= n))
          return { node: r, offset: n - e };
        e = u;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Xh(r);
    }
  }
  function Ph(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Ph(e, n.parentNode)
            : "contains" in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Kh(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var n = Ai(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Ai(e.document);
    }
    return n;
  }
  function zo(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        n === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var L2 = Ln && "documentMode" in document && 11 >= document.documentMode,
    dr = null,
    Do = null,
    ca = null,
    Oo = !1;
  function Jh(e, n, r) {
    var u =
      r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Oo ||
      dr == null ||
      dr !== Ai(u) ||
      ((u = dr),
      "selectionStart" in u && zo(u)
        ? (u = { start: u.selectionStart, end: u.selectionEnd })
        : ((u = (
            (u.ownerDocument && u.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (u = {
            anchorNode: u.anchorNode,
            anchorOffset: u.anchorOffset,
            focusNode: u.focusNode,
            focusOffset: u.focusOffset,
          })),
      (ca && sa(ca, u)) ||
        ((ca = u),
        (u = yu(Do, "onSelect")),
        0 < u.length &&
          ((n = new Mi("onSelect", "select", null, n, r)),
          e.push({ event: n, listeners: u }),
          (n.target = dr))));
  }
  function Dl(e, n) {
    var r = {};
    return (
      (r[e.toLowerCase()] = n.toLowerCase()),
      (r["Webkit" + e] = "webkit" + n),
      (r["Moz" + e] = "moz" + n),
      r
    );
  }
  var pr = {
      animationend: Dl("Animation", "AnimationEnd"),
      animationiteration: Dl("Animation", "AnimationIteration"),
      animationstart: Dl("Animation", "AnimationStart"),
      transitionrun: Dl("Transition", "TransitionRun"),
      transitionstart: Dl("Transition", "TransitionStart"),
      transitioncancel: Dl("Transition", "TransitionCancel"),
      transitionend: Dl("Transition", "TransitionEnd"),
    },
    No = {},
    Wh = {};
  Ln &&
    ((Wh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete pr.animationend.animation,
      delete pr.animationiteration.animation,
      delete pr.animationstart.animation),
    "TransitionEvent" in window || delete pr.transitionend.transition);
  function Ol(e) {
    if (No[e]) return No[e];
    if (!pr[e]) return e;
    var n = pr[e],
      r;
    for (r in n) if (n.hasOwnProperty(r) && r in Wh) return (No[e] = n[r]);
    return e;
  }
  var e0 = Ol("animationend"),
    t0 = Ol("animationiteration"),
    n0 = Ol("animationstart"),
    H2 = Ol("transitionrun"),
    j2 = Ol("transitionstart"),
    U2 = Ol("transitioncancel"),
    l0 = Ol("transitionend"),
    r0 = new Map(),
    Lo =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Lo.push("scrollEnd");
  function yn(e, n) {
    (r0.set(e, n), Ml(n, [e]));
  }
  var a0 = new WeakMap();
  function on(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = a0.get(e);
      return r !== void 0
        ? r
        : ((n = { value: e, source: n, stack: kh(n) }), a0.set(e, n), n);
    }
    return { value: e, source: n, stack: kh(n) };
  }
  var sn = [],
    mr = 0,
    Ho = 0;
  function Oi() {
    for (var e = mr, n = (Ho = mr = 0); n < e; ) {
      var r = sn[n];
      sn[n++] = null;
      var u = sn[n];
      sn[n++] = null;
      var f = sn[n];
      sn[n++] = null;
      var d = sn[n];
      if (((sn[n++] = null), u !== null && f !== null)) {
        var b = u.pending;
        (b === null ? (f.next = f) : ((f.next = b.next), (b.next = f)),
          (u.pending = f));
      }
      d !== 0 && i0(r, f, d);
    }
  }
  function Ni(e, n, r, u) {
    ((sn[mr++] = e),
      (sn[mr++] = n),
      (sn[mr++] = r),
      (sn[mr++] = u),
      (Ho |= u),
      (e.lanes |= u),
      (e = e.alternate),
      e !== null && (e.lanes |= u));
  }
  function jo(e, n, r, u) {
    return (Ni(e, n, r, u), Li(e));
  }
  function gr(e, n) {
    return (Ni(e, null, null, n), Li(e));
  }
  function i0(e, n, r) {
    e.lanes |= r;
    var u = e.alternate;
    u !== null && (u.lanes |= r);
    for (var f = !1, d = e.return; d !== null; )
      ((d.childLanes |= r),
        (u = d.alternate),
        u !== null && (u.childLanes |= r),
        d.tag === 22 &&
          ((e = d.stateNode), e === null || e._visibility & 1 || (f = !0)),
        (e = d),
        (d = d.return));
    return e.tag === 3
      ? ((d = e.stateNode),
        f &&
          n !== null &&
          ((f = 31 - me(r)),
          (e = d.hiddenUpdates),
          (u = e[f]),
          u === null ? (e[f] = [n]) : u.push(n),
          (n.lane = r | 536870912)),
        d)
      : null;
  }
  function Li(e) {
    if (50 < La) throw ((La = 0), (Is = null), Error(i(185)));
    for (var n = e.return; n !== null; ) ((e = n), (n = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var yr = {};
  function B2(e, n, r, u) {
    ((this.tag = e),
      (this.key = r),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = u),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function $t(e, n, r, u) {
    return new B2(e, n, r, u);
  }
  function Uo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Hn(e, n) {
    var r = e.alternate;
    return (
      r === null
        ? ((r = $t(e.tag, n, e.key, e.mode)),
          (r.elementType = e.elementType),
          (r.type = e.type),
          (r.stateNode = e.stateNode),
          (r.alternate = e),
          (e.alternate = r))
        : ((r.pendingProps = n),
          (r.type = e.type),
          (r.flags = 0),
          (r.subtreeFlags = 0),
          (r.deletions = null)),
      (r.flags = e.flags & 65011712),
      (r.childLanes = e.childLanes),
      (r.lanes = e.lanes),
      (r.child = e.child),
      (r.memoizedProps = e.memoizedProps),
      (r.memoizedState = e.memoizedState),
      (r.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (r.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (r.sibling = e.sibling),
      (r.index = e.index),
      (r.ref = e.ref),
      (r.refCleanup = e.refCleanup),
      r
    );
  }
  function u0(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return (
      r === null
        ? ((e.childLanes = 0),
          (e.lanes = n),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = r.childLanes),
          (e.lanes = r.lanes),
          (e.child = r.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = r.memoizedProps),
          (e.memoizedState = r.memoizedState),
          (e.updateQueue = r.updateQueue),
          (e.type = r.type),
          (n = r.dependencies),
          (e.dependencies =
            n === null
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext })),
      e
    );
  }
  function Hi(e, n, r, u, f, d) {
    var b = 0;
    if (((u = e), typeof e == "function")) Uo(e) && (b = 1);
    else if (typeof e == "string")
      b = qb(e, r, oe.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case K:
          return ((e = $t(31, r, n, f)), (e.elementType = K), (e.lanes = d), e);
        case A:
          return Nl(r.children, f, d, n);
        case C:
          ((b = 8), (f |= 24));
          break;
        case U:
          return (
            (e = $t(12, r, n, f | 2)),
            (e.elementType = U),
            (e.lanes = d),
            e
          );
        case O:
          return ((e = $t(13, r, n, f)), (e.elementType = O), (e.lanes = d), e);
        case _:
          return ((e = $t(19, r, n, f)), (e.elementType = _), (e.lanes = d), e);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
              case V:
                b = 10;
                break e;
              case Y:
                b = 9;
                break e;
              case ee:
                b = 11;
                break e;
              case F:
                b = 14;
                break e;
              case q:
                ((b = 16), (u = null));
                break e;
            }
          ((b = 29),
            (r = Error(i(130, e === null ? "null" : typeof e, ""))),
            (u = null));
      }
    return (
      (n = $t(b, r, n, f)),
      (n.elementType = e),
      (n.type = u),
      (n.lanes = d),
      n
    );
  }
  function Nl(e, n, r, u) {
    return ((e = $t(7, e, u, n)), (e.lanes = r), e);
  }
  function Bo(e, n, r) {
    return ((e = $t(6, e, null, n)), (e.lanes = r), e);
  }
  function Vo(e, n, r) {
    return (
      (n = $t(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = r),
      (n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      n
    );
  }
  var br = [],
    xr = 0,
    ji = null,
    Ui = 0,
    cn = [],
    fn = 0,
    Ll = null,
    jn = 1,
    Un = "";
  function Hl(e, n) {
    ((br[xr++] = Ui), (br[xr++] = ji), (ji = e), (Ui = n));
  }
  function o0(e, n, r) {
    ((cn[fn++] = jn), (cn[fn++] = Un), (cn[fn++] = Ll), (Ll = e));
    var u = jn;
    e = Un;
    var f = 32 - me(u) - 1;
    ((u &= ~(1 << f)), (r += 1));
    var d = 32 - me(n) + f;
    if (30 < d) {
      var b = f - (f % 5);
      ((d = (u & ((1 << b) - 1)).toString(32)),
        (u >>= b),
        (f -= b),
        (jn = (1 << (32 - me(n) + f)) | (r << f) | u),
        (Un = d + e));
    } else ((jn = (1 << d) | (r << f) | u), (Un = e));
  }
  function qo(e) {
    e.return !== null && (Hl(e, 1), o0(e, 1, 0));
  }
  function Zo(e) {
    for (; e === ji; )
      ((ji = br[--xr]), (br[xr] = null), (Ui = br[--xr]), (br[xr] = null));
    for (; e === Ll; )
      ((Ll = cn[--fn]),
        (cn[fn] = null),
        (Un = cn[--fn]),
        (cn[fn] = null),
        (jn = cn[--fn]),
        (cn[fn] = null));
  }
  var Lt = null,
    ut = null,
    Ze = !1,
    jl = null,
    Sn = !1,
    Io = Error(i(519));
  function Ul(e) {
    var n = Error(i(418, ""));
    throw (da(on(n, e)), Io);
  }
  function s0(e) {
    var n = e.stateNode,
      r = e.type,
      u = e.memoizedProps;
    switch (((n[Mt] = e), (n[Vt] = u), r)) {
      case "dialog":
        (Le("cancel", n), Le("close", n));
        break;
      case "iframe":
      case "object":
      case "embed":
        Le("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < ja.length; r++) Le(ja[r], n);
        break;
      case "source":
        Le("error", n);
        break;
      case "img":
      case "image":
      case "link":
        (Le("error", n), Le("load", n));
        break;
      case "details":
        Le("toggle", n);
        break;
      case "input":
        (Le("invalid", n),
          Eh(
            n,
            u.value,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name,
            !0
          ),
          Ei(n));
        break;
      case "select":
        Le("invalid", n);
        break;
      case "textarea":
        (Le("invalid", n), _h(n, u.value, u.defaultValue, u.children), Ei(n));
    }
    ((r = u.children),
      (typeof r != "string" && typeof r != "number" && typeof r != "bigint") ||
      n.textContent === "" + r ||
      u.suppressHydrationWarning === !0 ||
      _p(n.textContent, r)
        ? (u.popover != null && (Le("beforetoggle", n), Le("toggle", n)),
          u.onScroll != null && Le("scroll", n),
          u.onScrollEnd != null && Le("scrollend", n),
          u.onClick != null && (n.onclick = bu),
          (n = !0))
        : (n = !1),
      n || Ul(e));
  }
  function c0(e) {
    for (Lt = e.return; Lt; )
      switch (Lt.tag) {
        case 5:
        case 13:
          Sn = !1;
          return;
        case 27:
        case 3:
          Sn = !0;
          return;
        default:
          Lt = Lt.return;
      }
  }
  function fa(e) {
    if (e !== Lt) return !1;
    if (!Ze) return (c0(e), (Ze = !0), !1);
    var n = e.tag,
      r;
    if (
      ((r = n !== 3 && n !== 27) &&
        ((r = n === 5) &&
          ((r = e.type),
          (r =
            !(r !== "form" && r !== "button") || ac(e.type, e.memoizedProps))),
        (r = !r)),
      r && ut && Ul(e),
      c0(e),
      n === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(i(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8)
            if (((r = e.data), r === "/$")) {
              if (n === 0) {
                ut = xn(e.nextSibling);
                break e;
              }
              n--;
            } else (r !== "$" && r !== "$!" && r !== "$?") || n++;
          e = e.nextSibling;
        }
        ut = null;
      }
    } else
      n === 27
        ? ((n = ut), xl(e.type) ? ((e = sc), (sc = null), (ut = e)) : (ut = n))
        : (ut = Lt ? xn(e.stateNode.nextSibling) : null);
    return !0;
  }
  function ha() {
    ((ut = Lt = null), (Ze = !1));
  }
  function f0() {
    var e = jl;
    return (
      e !== null &&
        (Yt === null ? (Yt = e) : Yt.push.apply(Yt, e), (jl = null)),
      e
    );
  }
  function da(e) {
    jl === null ? (jl = [e]) : jl.push(e);
  }
  var Yo = G(null),
    Bl = null,
    Bn = null;
  function rl(e, n, r) {
    (w(Yo, n._currentValue), (n._currentValue = r));
  }
  function Vn(e) {
    ((e._currentValue = Yo.current), re(Yo));
  }
  function Go(e, n, r) {
    for (; e !== null; ) {
      var u = e.alternate;
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), u !== null && (u.childLanes |= n))
          : u !== null && (u.childLanes & n) !== n && (u.childLanes |= n),
        e === r)
      )
        break;
      e = e.return;
    }
  }
  function Fo(e, n, r, u) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var d = f.dependencies;
      if (d !== null) {
        var b = f.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var S = d;
          d = f;
          for (var T = 0; T < n.length; T++)
            if (S.context === n[T]) {
              ((d.lanes |= r),
                (S = d.alternate),
                S !== null && (S.lanes |= r),
                Go(d.return, r, e),
                u || (b = null));
              break e;
            }
          d = S.next;
        }
      } else if (f.tag === 18) {
        if (((b = f.return), b === null)) throw Error(i(341));
        ((b.lanes |= r),
          (d = b.alternate),
          d !== null && (d.lanes |= r),
          Go(b, r, e),
          (b = null));
      } else b = f.child;
      if (b !== null) b.return = f;
      else
        for (b = f; b !== null; ) {
          if (b === e) {
            b = null;
            break;
          }
          if (((f = b.sibling), f !== null)) {
            ((f.return = b.return), (b = f));
            break;
          }
          b = b.return;
        }
      f = b;
    }
  }
  function pa(e, n, r, u) {
    e = null;
    for (var f = n, d = !1; f !== null; ) {
      if (!d) {
        if ((f.flags & 524288) !== 0) d = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var b = f.alternate;
        if (b === null) throw Error(i(387));
        if (((b = b.memoizedProps), b !== null)) {
          var S = f.type;
          Xt(f.pendingProps.value, b.value) ||
            (e !== null ? e.push(S) : (e = [S]));
        }
      } else if (f === Ee.current) {
        if (((b = f.alternate), b === null)) throw Error(i(387));
        b.memoizedState.memoizedState !== f.memoizedState.memoizedState &&
          (e !== null ? e.push(Ia) : (e = [Ia]));
      }
      f = f.return;
    }
    (e !== null && Fo(n, e, r, u), (n.flags |= 262144));
  }
  function Bi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Xt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Vl(e) {
    ((Bl = e),
      (Bn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function zt(e) {
    return h0(Bl, e);
  }
  function Vi(e, n) {
    return (Bl === null && Vl(e), h0(e, n));
  }
  function h0(e, n) {
    var r = n._currentValue;
    if (((n = { context: n, memoizedValue: r, next: null }), Bn === null)) {
      if (e === null) throw Error(i(308));
      ((Bn = n),
        (e.dependencies = { lanes: 0, firstContext: n }),
        (e.flags |= 524288));
    } else Bn = Bn.next = n;
    return r;
  }
  var V2 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (r, u) {
                  e.push(u);
                },
              });
            this.abort = function () {
              ((n.aborted = !0),
                e.forEach(function (r) {
                  return r();
                }));
            };
          },
    q2 = t.unstable_scheduleCallback,
    Z2 = t.unstable_NormalPriority,
    gt = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Qo() {
    return { controller: new V2(), data: new Map(), refCount: 0 };
  }
  function ma(e) {
    (e.refCount--,
      e.refCount === 0 &&
        q2(Z2, function () {
          e.controller.abort();
        }));
  }
  var ga = null,
    Xo = 0,
    vr = 0,
    kr = null;
  function I2(e, n) {
    if (ga === null) {
      var r = (ga = []);
      ((Xo = 0),
        (vr = Ps()),
        (kr = {
          status: "pending",
          value: void 0,
          then: function (u) {
            r.push(u);
          },
        }));
    }
    return (Xo++, n.then(d0, d0), n);
  }
  function d0() {
    if (--Xo === 0 && ga !== null) {
      kr !== null && (kr.status = "fulfilled");
      var e = ga;
      ((ga = null), (vr = 0), (kr = null));
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Y2(e, n) {
    var r = [],
      u = {
        status: "pending",
        value: null,
        reason: null,
        then: function (f) {
          r.push(f);
        },
      };
    return (
      e.then(
        function () {
          ((u.status = "fulfilled"), (u.value = n));
          for (var f = 0; f < r.length; f++) (0, r[f])(n);
        },
        function (f) {
          for (u.status = "rejected", u.reason = f, f = 0; f < r.length; f++)
            (0, r[f])(void 0);
        }
      ),
      u
    );
  }
  var p0 = L.S;
  L.S = function (e, n) {
    (typeof n == "object" &&
      n !== null &&
      typeof n.then == "function" &&
      I2(e, n),
      p0 !== null && p0(e, n));
  };
  var ql = G(null);
  function $o() {
    var e = ql.current;
    return e !== null ? e : tt.pooledCache;
  }
  function qi(e, n) {
    n === null ? w(ql, ql.current) : w(ql, n.pool);
  }
  function m0() {
    var e = $o();
    return e === null ? null : { parent: gt._currentValue, pool: e };
  }
  var ya = Error(i(460)),
    g0 = Error(i(474)),
    Zi = Error(i(542)),
    Po = { then: function () {} };
  function y0(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Ii() {}
  function b0(e, n, r) {
    switch (
      ((r = e[r]),
      r === void 0 ? e.push(n) : r !== n && (n.then(Ii, Ii), (n = r)),
      n.status)
    ) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw ((e = n.reason), v0(e), e);
      default:
        if (typeof n.status == "string") n.then(Ii, Ii);
        else {
          if (((e = tt), e !== null && 100 < e.shellSuspendCounter))
            throw Error(i(482));
          ((e = n),
            (e.status = "pending"),
            e.then(
              function (u) {
                if (n.status === "pending") {
                  var f = n;
                  ((f.status = "fulfilled"), (f.value = u));
                }
              },
              function (u) {
                if (n.status === "pending") {
                  var f = n;
                  ((f.status = "rejected"), (f.reason = u));
                }
              }
            ));
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw ((e = n.reason), v0(e), e);
        }
        throw ((ba = n), ya);
    }
  }
  var ba = null;
  function x0() {
    if (ba === null) throw Error(i(459));
    var e = ba;
    return ((ba = null), e);
  }
  function v0(e) {
    if (e === ya || e === Zi) throw Error(i(483));
  }
  var al = !1;
  function Ko(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Jo(e, n) {
    ((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function il(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ul(e, n, r) {
    var u = e.updateQueue;
    if (u === null) return null;
    if (((u = u.shared), (Qe & 2) !== 0)) {
      var f = u.pending;
      return (
        f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
        (u.pending = n),
        (n = Li(e)),
        i0(e, null, r),
        n
      );
    }
    return (Ni(e, u, n, r), Li(e));
  }
  function xa(e, n, r) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (r & 4194048) !== 0))
    ) {
      var u = n.lanes;
      ((u &= e.pendingLanes), (r |= u), (n.lanes = r), dh(e, r));
    }
  }
  function Wo(e, n) {
    var r = e.updateQueue,
      u = e.alternate;
    if (u !== null && ((u = u.updateQueue), r === u)) {
      var f = null,
        d = null;
      if (((r = r.firstBaseUpdate), r !== null)) {
        do {
          var b = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null,
          };
          (d === null ? (f = d = b) : (d = d.next = b), (r = r.next));
        } while (r !== null);
        d === null ? (f = d = n) : (d = d.next = n);
      } else f = d = n;
      ((r = {
        baseState: u.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: d,
        shared: u.shared,
        callbacks: u.callbacks,
      }),
        (e.updateQueue = r));
      return;
    }
    ((e = r.lastBaseUpdate),
      e === null ? (r.firstBaseUpdate = n) : (e.next = n),
      (r.lastBaseUpdate = n));
  }
  var es = !1;
  function va() {
    if (es) {
      var e = kr;
      if (e !== null) throw e;
    }
  }
  function ka(e, n, r, u) {
    es = !1;
    var f = e.updateQueue;
    al = !1;
    var d = f.firstBaseUpdate,
      b = f.lastBaseUpdate,
      S = f.shared.pending;
    if (S !== null) {
      f.shared.pending = null;
      var T = S,
        H = T.next;
      ((T.next = null), b === null ? (d = H) : (b.next = H), (b = T));
      var X = e.alternate;
      X !== null &&
        ((X = X.updateQueue),
        (S = X.lastBaseUpdate),
        S !== b &&
          (S === null ? (X.firstBaseUpdate = H) : (S.next = H),
          (X.lastBaseUpdate = T)));
    }
    if (d !== null) {
      var P = f.baseState;
      ((b = 0), (X = H = T = null), (S = d));
      do {
        var j = S.lane & -536870913,
          B = j !== S.lane;
        if (B ? (je & j) === j : (u & j) === j) {
          (j !== 0 && j === vr && (es = !0),
            X !== null &&
              (X = X.next =
                {
                  lane: 0,
                  tag: S.tag,
                  payload: S.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var we = e,
              xe = S;
            j = n;
            var Je = r;
            switch (xe.tag) {
              case 1:
                if (((we = xe.payload), typeof we == "function")) {
                  P = we.call(Je, P, j);
                  break e;
                }
                P = we;
                break e;
              case 3:
                we.flags = (we.flags & -65537) | 128;
              case 0:
                if (
                  ((we = xe.payload),
                  (j = typeof we == "function" ? we.call(Je, P, j) : we),
                  j == null)
                )
                  break e;
                P = y({}, P, j);
                break e;
              case 2:
                al = !0;
            }
          }
          ((j = S.callback),
            j !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = f.callbacks),
              B === null ? (f.callbacks = [j]) : B.push(j)));
        } else
          ((B = {
            lane: j,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null,
          }),
            X === null ? ((H = X = B), (T = P)) : (X = X.next = B),
            (b |= j));
        if (((S = S.next), S === null)) {
          if (((S = f.shared.pending), S === null)) break;
          ((B = S),
            (S = B.next),
            (B.next = null),
            (f.lastBaseUpdate = B),
            (f.shared.pending = null));
        }
      } while (!0);
      (X === null && (T = P),
        (f.baseState = T),
        (f.firstBaseUpdate = H),
        (f.lastBaseUpdate = X),
        d === null && (f.shared.lanes = 0),
        (ml |= b),
        (e.lanes = b),
        (e.memoizedState = P));
    }
  }
  function k0(e, n) {
    if (typeof e != "function") throw Error(i(191, e));
    e.call(n);
  }
  function S0(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++) k0(r[e], n);
  }
  var Sr = G(null),
    Yi = G(0);
  function w0(e, n) {
    ((e = Qn), w(Yi, e), w(Sr, n), (Qn = e | n.baseLanes));
  }
  function ts() {
    (w(Yi, Qn), w(Sr, Sr.current));
  }
  function ns() {
    ((Qn = Yi.current), re(Sr), re(Yi));
  }
  var ol = 0,
    Me = null,
    Pe = null,
    ht = null,
    Gi = !1,
    wr = !1,
    Zl = !1,
    Fi = 0,
    Sa = 0,
    Er = null,
    G2 = 0;
  function st() {
    throw Error(i(321));
  }
  function ls(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!Xt(e[r], n[r])) return !1;
    return !0;
  }
  function rs(e, n, r, u, f, d) {
    return (
      (ol = d),
      (Me = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? id : ud),
      (Zl = !1),
      (d = r(u, f)),
      (Zl = !1),
      wr && (d = A0(n, r, u, f)),
      E0(e),
      d
    );
  }
  function E0(e) {
    L.H = Ji;
    var n = Pe !== null && Pe.next !== null;
    if (((ol = 0), (ht = Pe = Me = null), (Gi = !1), (Sa = 0), (Er = null), n))
      throw Error(i(300));
    e === null ||
      St ||
      ((e = e.dependencies), e !== null && Bi(e) && (St = !0));
  }
  function A0(e, n, r, u) {
    Me = e;
    var f = 0;
    do {
      if ((wr && (Er = null), (Sa = 0), (wr = !1), 25 <= f))
        throw Error(i(301));
      if (((f += 1), (ht = Pe = null), e.updateQueue != null)) {
        var d = e.updateQueue;
        ((d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0));
      }
      ((L.H = J2), (d = n(r, u)));
    } while (wr);
    return d;
  }
  function F2() {
    var e = L.H,
      n = e.useState()[0];
    return (
      (n = typeof n.then == "function" ? wa(n) : n),
      (e = e.useState()[0]),
      (Pe !== null ? Pe.memoizedState : null) !== e && (Me.flags |= 1024),
      n
    );
  }
  function as() {
    var e = Fi !== 0;
    return ((Fi = 0), e);
  }
  function is(e, n, r) {
    ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~r));
  }
  function us(e) {
    if (Gi) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        (n !== null && (n.pending = null), (e = e.next));
      }
      Gi = !1;
    }
    ((ol = 0), (ht = Pe = Me = null), (wr = !1), (Sa = Fi = 0), (Er = null));
  }
  function Zt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ht === null ? (Me.memoizedState = ht = e) : (ht = ht.next = e), ht);
  }
  function dt() {
    if (Pe === null) {
      var e = Me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Pe.next;
    var n = ht === null ? Me.memoizedState : ht.next;
    if (n !== null) ((ht = n), (Pe = e));
    else {
      if (e === null)
        throw Me.alternate === null ? Error(i(467)) : Error(i(310));
      ((Pe = e),
        (e = {
          memoizedState: Pe.memoizedState,
          baseState: Pe.baseState,
          baseQueue: Pe.baseQueue,
          queue: Pe.queue,
          next: null,
        }),
        ht === null ? (Me.memoizedState = ht = e) : (ht = ht.next = e));
    }
    return ht;
  }
  function os() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function wa(e) {
    var n = Sa;
    return (
      (Sa += 1),
      Er === null && (Er = []),
      (e = b0(Er, e, n)),
      (n = Me),
      (ht === null ? n.memoizedState : ht.next) === null &&
        ((n = n.alternate),
        (L.H = n === null || n.memoizedState === null ? id : ud)),
      e
    );
  }
  function Qi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return wa(e);
      if (e.$$typeof === V) return zt(e);
    }
    throw Error(i(438, String(e)));
  }
  function ss(e) {
    var n = null,
      r = Me.updateQueue;
    if ((r !== null && (n = r.memoCache), n == null)) {
      var u = Me.alternate;
      u !== null &&
        ((u = u.updateQueue),
        u !== null &&
          ((u = u.memoCache),
          u != null &&
            (n = {
              data: u.data.map(function (f) {
                return f.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      r === null && ((r = os()), (Me.updateQueue = r)),
      (r.memoCache = n),
      (r = n.data[n.index]),
      r === void 0)
    )
      for (r = n.data[n.index] = Array(e), u = 0; u < e; u++) r[u] = z;
    return (n.index++, r);
  }
  function qn(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Xi(e) {
    var n = dt();
    return cs(n, Pe, e);
  }
  function cs(e, n, r) {
    var u = e.queue;
    if (u === null) throw Error(i(311));
    u.lastRenderedReducer = r;
    var f = e.baseQueue,
      d = u.pending;
    if (d !== null) {
      if (f !== null) {
        var b = f.next;
        ((f.next = d.next), (d.next = b));
      }
      ((n.baseQueue = f = d), (u.pending = null));
    }
    if (((d = e.baseState), f === null)) e.memoizedState = d;
    else {
      n = f.next;
      var S = (b = null),
        T = null,
        H = n,
        X = !1;
      do {
        var P = H.lane & -536870913;
        if (P !== H.lane ? (je & P) === P : (ol & P) === P) {
          var j = H.revertLane;
          if (j === 0)
            (T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: H.action,
                  hasEagerState: H.hasEagerState,
                  eagerState: H.eagerState,
                  next: null,
                }),
              P === vr && (X = !0));
          else if ((ol & j) === j) {
            ((H = H.next), j === vr && (X = !0));
            continue;
          } else
            ((P = {
              lane: 0,
              revertLane: H.revertLane,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null,
            }),
              T === null ? ((S = T = P), (b = d)) : (T = T.next = P),
              (Me.lanes |= j),
              (ml |= j));
          ((P = H.action),
            Zl && r(d, P),
            (d = H.hasEagerState ? H.eagerState : r(d, P)));
        } else
          ((j = {
            lane: P,
            revertLane: H.revertLane,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null,
          }),
            T === null ? ((S = T = j), (b = d)) : (T = T.next = j),
            (Me.lanes |= P),
            (ml |= P));
        H = H.next;
      } while (H !== null && H !== n);
      if (
        (T === null ? (b = d) : (T.next = S),
        !Xt(d, e.memoizedState) && ((St = !0), X && ((r = kr), r !== null)))
      )
        throw r;
      ((e.memoizedState = d),
        (e.baseState = b),
        (e.baseQueue = T),
        (u.lastRenderedState = d));
    }
    return (f === null && (u.lanes = 0), [e.memoizedState, u.dispatch]);
  }
  function fs(e) {
    var n = dt(),
      r = n.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var u = r.dispatch,
      f = r.pending,
      d = n.memoizedState;
    if (f !== null) {
      r.pending = null;
      var b = (f = f.next);
      do ((d = e(d, b.action)), (b = b.next));
      while (b !== f);
      (Xt(d, n.memoizedState) || (St = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (r.lastRenderedState = d));
    }
    return [d, u];
  }
  function _0(e, n, r) {
    var u = Me,
      f = dt(),
      d = Ze;
    if (d) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var b = !Xt((Pe || f).memoizedState, r);
    (b && ((f.memoizedState = r), (St = !0)), (f = f.queue));
    var S = R0.bind(null, u, f, e);
    if (
      (Ea(2048, 8, S, [e]),
      f.getSnapshot !== n || b || (ht !== null && ht.memoizedState.tag & 1))
    ) {
      if (
        ((u.flags |= 2048),
        Ar(9, $i(), C0.bind(null, u, f, r, n), null),
        tt === null)
      )
        throw Error(i(349));
      d || (ol & 124) !== 0 || T0(u, n, r);
    }
    return r;
  }
  function T0(e, n, r) {
    ((e.flags |= 16384),
      (e = { getSnapshot: n, value: r }),
      (n = Me.updateQueue),
      n === null
        ? ((n = os()), (Me.updateQueue = n), (n.stores = [e]))
        : ((r = n.stores), r === null ? (n.stores = [e]) : r.push(e)));
  }
  function C0(e, n, r, u) {
    ((n.value = r), (n.getSnapshot = u), M0(n) && z0(e));
  }
  function R0(e, n, r) {
    return r(function () {
      M0(n) && z0(e);
    });
  }
  function M0(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !Xt(e, r);
    } catch {
      return !0;
    }
  }
  function z0(e) {
    var n = gr(e, 2);
    n !== null && en(n, e, 2);
  }
  function hs(e) {
    var n = Zt();
    if (typeof e == "function") {
      var r = e;
      if (((e = r()), Zl)) {
        de(!0);
        try {
          r();
        } finally {
          de(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = e),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qn,
        lastRenderedState: e,
      }),
      n
    );
  }
  function D0(e, n, r, u) {
    return ((e.baseState = r), cs(e, Pe, typeof u == "function" ? u : qn));
  }
  function Q2(e, n, r, u, f) {
    if (Ki(e)) throw Error(i(485));
    if (((e = n.action), e !== null)) {
      var d = {
        payload: f,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (b) {
          d.listeners.push(b);
        },
      };
      (L.T !== null ? r(!0) : (d.isTransition = !1),
        u(d),
        (r = n.pending),
        r === null
          ? ((d.next = n.pending = d), O0(n, d))
          : ((d.next = r.next), (n.pending = r.next = d)));
    }
  }
  function O0(e, n) {
    var r = n.action,
      u = n.payload,
      f = e.state;
    if (n.isTransition) {
      var d = L.T,
        b = {};
      L.T = b;
      try {
        var S = r(f, u),
          T = L.S;
        (T !== null && T(b, S), N0(e, n, S));
      } catch (H) {
        ds(e, n, H);
      } finally {
        L.T = d;
      }
    } else
      try {
        ((d = r(f, u)), N0(e, n, d));
      } catch (H) {
        ds(e, n, H);
      }
  }
  function N0(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function"
      ? r.then(
          function (u) {
            L0(e, n, u);
          },
          function (u) {
            return ds(e, n, u);
          }
        )
      : L0(e, n, r);
  }
  function L0(e, n, r) {
    ((n.status = "fulfilled"),
      (n.value = r),
      H0(n),
      (e.state = r),
      (n = e.pending),
      n !== null &&
        ((r = n.next),
        r === n ? (e.pending = null) : ((r = r.next), (n.next = r), O0(e, r))));
  }
  function ds(e, n, r) {
    var u = e.pending;
    if (((e.pending = null), u !== null)) {
      u = u.next;
      do ((n.status = "rejected"), (n.reason = r), H0(n), (n = n.next));
      while (n !== u);
    }
    e.action = null;
  }
  function H0(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function j0(e, n) {
    return n;
  }
  function U0(e, n) {
    if (Ze) {
      var r = tt.formState;
      if (r !== null) {
        e: {
          var u = Me;
          if (Ze) {
            if (ut) {
              t: {
                for (var f = ut, d = Sn; f.nodeType !== 8; ) {
                  if (!d) {
                    f = null;
                    break t;
                  }
                  if (((f = xn(f.nextSibling)), f === null)) {
                    f = null;
                    break t;
                  }
                }
                ((d = f.data), (f = d === "F!" || d === "F" ? f : null));
              }
              if (f) {
                ((ut = xn(f.nextSibling)), (u = f.data === "F!"));
                break e;
              }
            }
            Ul(u);
          }
          u = !1;
        }
        u && (n = r[0]);
      }
    }
    return (
      (r = Zt()),
      (r.memoizedState = r.baseState = n),
      (u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: j0,
        lastRenderedState: n,
      }),
      (r.queue = u),
      (r = ld.bind(null, Me, u)),
      (u.dispatch = r),
      (u = hs(!1)),
      (d = bs.bind(null, Me, !1, u.queue)),
      (u = Zt()),
      (f = { state: n, dispatch: null, action: e, pending: null }),
      (u.queue = f),
      (r = Q2.bind(null, Me, f, d, r)),
      (f.dispatch = r),
      (u.memoizedState = e),
      [n, r, !1]
    );
  }
  function B0(e) {
    var n = dt();
    return V0(n, Pe, e);
  }
  function V0(e, n, r) {
    if (
      ((n = cs(e, n, j0)[0]),
      (e = Xi(qn)[0]),
      typeof n == "object" && n !== null && typeof n.then == "function")
    )
      try {
        var u = wa(n);
      } catch (b) {
        throw b === ya ? Zi : b;
      }
    else u = n;
    n = dt();
    var f = n.queue,
      d = f.dispatch;
    return (
      r !== n.memoizedState &&
        ((Me.flags |= 2048), Ar(9, $i(), X2.bind(null, f, r), null)),
      [u, d, e]
    );
  }
  function X2(e, n) {
    e.action = n;
  }
  function q0(e) {
    var n = dt(),
      r = Pe;
    if (r !== null) return V0(n, r, e);
    (dt(), (n = n.memoizedState), (r = dt()));
    var u = r.queue.dispatch;
    return ((r.memoizedState = e), [n, u, !1]);
  }
  function Ar(e, n, r, u) {
    return (
      (e = { tag: e, create: r, deps: u, inst: n, next: null }),
      (n = Me.updateQueue),
      n === null && ((n = os()), (Me.updateQueue = n)),
      (r = n.lastEffect),
      r === null
        ? (n.lastEffect = e.next = e)
        : ((u = r.next), (r.next = e), (e.next = u), (n.lastEffect = e)),
      e
    );
  }
  function $i() {
    return { destroy: void 0, resource: void 0 };
  }
  function Z0() {
    return dt().memoizedState;
  }
  function Pi(e, n, r, u) {
    var f = Zt();
    ((u = u === void 0 ? null : u),
      (Me.flags |= e),
      (f.memoizedState = Ar(1 | n, $i(), r, u)));
  }
  function Ea(e, n, r, u) {
    var f = dt();
    u = u === void 0 ? null : u;
    var d = f.memoizedState.inst;
    Pe !== null && u !== null && ls(u, Pe.memoizedState.deps)
      ? (f.memoizedState = Ar(n, d, r, u))
      : ((Me.flags |= e), (f.memoizedState = Ar(1 | n, d, r, u)));
  }
  function I0(e, n) {
    Pi(8390656, 8, e, n);
  }
  function Y0(e, n) {
    Ea(2048, 8, e, n);
  }
  function G0(e, n) {
    return Ea(4, 2, e, n);
  }
  function F0(e, n) {
    return Ea(4, 4, e, n);
  }
  function Q0(e, n) {
    if (typeof n == "function") {
      e = e();
      var r = n(e);
      return function () {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null;
        }
      );
  }
  function X0(e, n, r) {
    ((r = r != null ? r.concat([e]) : null), Ea(4, 4, Q0.bind(null, n, e), r));
  }
  function ps() {}
  function $0(e, n) {
    var r = dt();
    n = n === void 0 ? null : n;
    var u = r.memoizedState;
    return n !== null && ls(n, u[1]) ? u[0] : ((r.memoizedState = [e, n]), e);
  }
  function P0(e, n) {
    var r = dt();
    n = n === void 0 ? null : n;
    var u = r.memoizedState;
    if (n !== null && ls(n, u[1])) return u[0];
    if (((u = e()), Zl)) {
      de(!0);
      try {
        e();
      } finally {
        de(!1);
      }
    }
    return ((r.memoizedState = [u, n]), u);
  }
  function ms(e, n, r) {
    return r === void 0 || (ol & 1073741824) !== 0
      ? (e.memoizedState = n)
      : ((e.memoizedState = r), (e = Wd()), (Me.lanes |= e), (ml |= e), r);
  }
  function K0(e, n, r, u) {
    return Xt(r, n)
      ? r
      : Sr.current !== null
        ? ((e = ms(e, r, u)), Xt(e, n) || (St = !0), e)
        : (ol & 42) === 0
          ? ((St = !0), (e.memoizedState = r))
          : ((e = Wd()), (Me.lanes |= e), (ml |= e), n);
  }
  function J0(e, n, r, u, f) {
    var d = J.p;
    J.p = d !== 0 && 8 > d ? d : 8;
    var b = L.T,
      S = {};
    ((L.T = S), bs(e, !1, n, r));
    try {
      var T = f(),
        H = L.S;
      if (
        (H !== null && H(S, T),
        T !== null && typeof T == "object" && typeof T.then == "function")
      ) {
        var X = Y2(T, u);
        Aa(e, n, X, Wt(e));
      } else Aa(e, n, u, Wt(e));
    } catch (P) {
      Aa(e, n, { then: function () {}, status: "rejected", reason: P }, Wt());
    } finally {
      ((J.p = d), (L.T = b));
    }
  }
  function $2() {}
  function gs(e, n, r, u) {
    if (e.tag !== 5) throw Error(i(476));
    var f = W0(e).queue;
    J0(
      e,
      f,
      n,
      Q,
      r === null
        ? $2
        : function () {
            return (ed(e), r(u));
          }
    );
  }
  function W0(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qn,
        lastRenderedState: Q,
      },
      next: null,
    };
    var r = {};
    return (
      (n.next = {
        memoizedState: r,
        baseState: r,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: qn,
          lastRenderedState: r,
        },
        next: null,
      }),
      (e.memoizedState = n),
      (e = e.alternate),
      e !== null && (e.memoizedState = n),
      n
    );
  }
  function ed(e) {
    var n = W0(e).next.queue;
    Aa(e, n, {}, Wt());
  }
  function ys() {
    return zt(Ia);
  }
  function td() {
    return dt().memoizedState;
  }
  function nd() {
    return dt().memoizedState;
  }
  function P2(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Wt();
          e = il(r);
          var u = ul(n, e, r);
          (u !== null && (en(u, n, r), xa(u, n, r)),
            (n = { cache: Qo() }),
            (e.payload = n));
          return;
      }
      n = n.return;
    }
  }
  function K2(e, n, r) {
    var u = Wt();
    ((r = {
      lane: u,
      revertLane: 0,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ki(e)
        ? rd(n, r)
        : ((r = jo(e, n, r, u)), r !== null && (en(r, e, u), ad(r, n, u))));
  }
  function ld(e, n, r) {
    var u = Wt();
    Aa(e, n, r, u);
  }
  function Aa(e, n, r, u) {
    var f = {
      lane: u,
      revertLane: 0,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ki(e)) rd(n, f);
    else {
      var d = e.alternate;
      if (
        e.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = n.lastRenderedReducer), d !== null)
      )
        try {
          var b = n.lastRenderedState,
            S = d(b, r);
          if (((f.hasEagerState = !0), (f.eagerState = S), Xt(S, b)))
            return (Ni(e, n, f, 0), tt === null && Oi(), !1);
        } catch {
        } finally {
        }
      if (((r = jo(e, n, f, u)), r !== null))
        return (en(r, e, u), ad(r, n, u), !0);
    }
    return !1;
  }
  function bs(e, n, r, u) {
    if (
      ((u = {
        lane: 2,
        revertLane: Ps(),
        action: u,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ki(e))
    ) {
      if (n) throw Error(i(479));
    } else ((n = jo(e, r, u, 2)), n !== null && en(n, e, 2));
  }
  function Ki(e) {
    var n = e.alternate;
    return e === Me || (n !== null && n === Me);
  }
  function rd(e, n) {
    wr = Gi = !0;
    var r = e.pending;
    (r === null ? (n.next = n) : ((n.next = r.next), (r.next = n)),
      (e.pending = n));
  }
  function ad(e, n, r) {
    if ((r & 4194048) !== 0) {
      var u = n.lanes;
      ((u &= e.pendingLanes), (r |= u), (n.lanes = r), dh(e, r));
    }
  }
  var Ji = {
      readContext: zt,
      use: Qi,
      useCallback: st,
      useContext: st,
      useEffect: st,
      useImperativeHandle: st,
      useLayoutEffect: st,
      useInsertionEffect: st,
      useMemo: st,
      useReducer: st,
      useRef: st,
      useState: st,
      useDebugValue: st,
      useDeferredValue: st,
      useTransition: st,
      useSyncExternalStore: st,
      useId: st,
      useHostTransitionStatus: st,
      useFormState: st,
      useActionState: st,
      useOptimistic: st,
      useMemoCache: st,
      useCacheRefresh: st,
    },
    id = {
      readContext: zt,
      use: Qi,
      useCallback: function (e, n) {
        return ((Zt().memoizedState = [e, n === void 0 ? null : n]), e);
      },
      useContext: zt,
      useEffect: I0,
      useImperativeHandle: function (e, n, r) {
        ((r = r != null ? r.concat([e]) : null),
          Pi(4194308, 4, Q0.bind(null, n, e), r));
      },
      useLayoutEffect: function (e, n) {
        return Pi(4194308, 4, e, n);
      },
      useInsertionEffect: function (e, n) {
        Pi(4, 2, e, n);
      },
      useMemo: function (e, n) {
        var r = Zt();
        n = n === void 0 ? null : n;
        var u = e();
        if (Zl) {
          de(!0);
          try {
            e();
          } finally {
            de(!1);
          }
        }
        return ((r.memoizedState = [u, n]), u);
      },
      useReducer: function (e, n, r) {
        var u = Zt();
        if (r !== void 0) {
          var f = r(n);
          if (Zl) {
            de(!0);
            try {
              r(n);
            } finally {
              de(!1);
            }
          }
        } else f = n;
        return (
          (u.memoizedState = u.baseState = f),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: f,
          }),
          (u.queue = e),
          (e = e.dispatch = K2.bind(null, Me, e)),
          [u.memoizedState, e]
        );
      },
      useRef: function (e) {
        var n = Zt();
        return ((e = { current: e }), (n.memoizedState = e));
      },
      useState: function (e) {
        e = hs(e);
        var n = e.queue,
          r = ld.bind(null, Me, n);
        return ((n.dispatch = r), [e.memoizedState, r]);
      },
      useDebugValue: ps,
      useDeferredValue: function (e, n) {
        var r = Zt();
        return ms(r, e, n);
      },
      useTransition: function () {
        var e = hs(!1);
        return (
          (e = J0.bind(null, Me, e.queue, !0, !1)),
          (Zt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, n, r) {
        var u = Me,
          f = Zt();
        if (Ze) {
          if (r === void 0) throw Error(i(407));
          r = r();
        } else {
          if (((r = n()), tt === null)) throw Error(i(349));
          (je & 124) !== 0 || T0(u, n, r);
        }
        f.memoizedState = r;
        var d = { value: r, getSnapshot: n };
        return (
          (f.queue = d),
          I0(R0.bind(null, u, d, e), [e]),
          (u.flags |= 2048),
          Ar(9, $i(), C0.bind(null, u, d, r, n), null),
          r
        );
      },
      useId: function () {
        var e = Zt(),
          n = tt.identifierPrefix;
        if (Ze) {
          var r = Un,
            u = jn;
          ((r = (u & ~(1 << (32 - me(u) - 1))).toString(32) + r),
            (n = "«" + n + "R" + r),
            (r = Fi++),
            0 < r && (n += "H" + r.toString(32)),
            (n += "»"));
        } else ((r = G2++), (n = "«" + n + "r" + r.toString(32) + "»"));
        return (e.memoizedState = n);
      },
      useHostTransitionStatus: ys,
      useFormState: U0,
      useActionState: U0,
      useOptimistic: function (e) {
        var n = Zt();
        n.memoizedState = n.baseState = e;
        var r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (n.queue = r),
          (n = bs.bind(null, Me, !0, r)),
          (r.dispatch = n),
          [e, n]
        );
      },
      useMemoCache: ss,
      useCacheRefresh: function () {
        return (Zt().memoizedState = P2.bind(null, Me));
      },
    },
    ud = {
      readContext: zt,
      use: Qi,
      useCallback: $0,
      useContext: zt,
      useEffect: Y0,
      useImperativeHandle: X0,
      useInsertionEffect: G0,
      useLayoutEffect: F0,
      useMemo: P0,
      useReducer: Xi,
      useRef: Z0,
      useState: function () {
        return Xi(qn);
      },
      useDebugValue: ps,
      useDeferredValue: function (e, n) {
        var r = dt();
        return K0(r, Pe.memoizedState, e, n);
      },
      useTransition: function () {
        var e = Xi(qn)[0],
          n = dt().memoizedState;
        return [typeof e == "boolean" ? e : wa(e), n];
      },
      useSyncExternalStore: _0,
      useId: td,
      useHostTransitionStatus: ys,
      useFormState: B0,
      useActionState: B0,
      useOptimistic: function (e, n) {
        var r = dt();
        return D0(r, Pe, e, n);
      },
      useMemoCache: ss,
      useCacheRefresh: nd,
    },
    J2 = {
      readContext: zt,
      use: Qi,
      useCallback: $0,
      useContext: zt,
      useEffect: Y0,
      useImperativeHandle: X0,
      useInsertionEffect: G0,
      useLayoutEffect: F0,
      useMemo: P0,
      useReducer: fs,
      useRef: Z0,
      useState: function () {
        return fs(qn);
      },
      useDebugValue: ps,
      useDeferredValue: function (e, n) {
        var r = dt();
        return Pe === null ? ms(r, e, n) : K0(r, Pe.memoizedState, e, n);
      },
      useTransition: function () {
        var e = fs(qn)[0],
          n = dt().memoizedState;
        return [typeof e == "boolean" ? e : wa(e), n];
      },
      useSyncExternalStore: _0,
      useId: td,
      useHostTransitionStatus: ys,
      useFormState: q0,
      useActionState: q0,
      useOptimistic: function (e, n) {
        var r = dt();
        return Pe !== null
          ? D0(r, Pe, e, n)
          : ((r.baseState = e), [e, r.queue.dispatch]);
      },
      useMemoCache: ss,
      useCacheRefresh: nd,
    },
    _r = null,
    _a = 0;
  function Wi(e) {
    var n = _a;
    return ((_a += 1), _r === null && (_r = []), b0(_r, e, n));
  }
  function Ta(e, n) {
    ((n = n.props.ref), (e.ref = n !== void 0 ? n : null));
  }
  function eu(e, n) {
    throw n.$$typeof === g
      ? Error(i(525))
      : ((e = Object.prototype.toString.call(n)),
        Error(
          i(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(n).join(", ") + "}"
              : e
          )
        ));
  }
  function od(e) {
    var n = e._init;
    return n(e._payload);
  }
  function sd(e) {
    function n(D, M) {
      if (e) {
        var N = D.deletions;
        N === null ? ((D.deletions = [M]), (D.flags |= 16)) : N.push(M);
      }
    }
    function r(D, M) {
      if (!e) return null;
      for (; M !== null; ) (n(D, M), (M = M.sibling));
      return null;
    }
    function u(D) {
      for (var M = new Map(); D !== null; )
        (D.key !== null ? M.set(D.key, D) : M.set(D.index, D), (D = D.sibling));
      return M;
    }
    function f(D, M) {
      return ((D = Hn(D, M)), (D.index = 0), (D.sibling = null), D);
    }
    function d(D, M, N) {
      return (
        (D.index = N),
        e
          ? ((N = D.alternate),
            N !== null
              ? ((N = N.index), N < M ? ((D.flags |= 67108866), M) : N)
              : ((D.flags |= 67108866), M))
          : ((D.flags |= 1048576), M)
      );
    }
    function b(D) {
      return (e && D.alternate === null && (D.flags |= 67108866), D);
    }
    function S(D, M, N, $) {
      return M === null || M.tag !== 6
        ? ((M = Bo(N, D.mode, $)), (M.return = D), M)
        : ((M = f(M, N)), (M.return = D), M);
    }
    function T(D, M, N, $) {
      var ce = N.type;
      return ce === A
        ? X(D, M, N.props.children, $, N.key)
        : M !== null &&
            (M.elementType === ce ||
              (typeof ce == "object" &&
                ce !== null &&
                ce.$$typeof === q &&
                od(ce) === M.type))
          ? ((M = f(M, N.props)), Ta(M, N), (M.return = D), M)
          : ((M = Hi(N.type, N.key, N.props, null, D.mode, $)),
            Ta(M, N),
            (M.return = D),
            M);
    }
    function H(D, M, N, $) {
      return M === null ||
        M.tag !== 4 ||
        M.stateNode.containerInfo !== N.containerInfo ||
        M.stateNode.implementation !== N.implementation
        ? ((M = Vo(N, D.mode, $)), (M.return = D), M)
        : ((M = f(M, N.children || [])), (M.return = D), M);
    }
    function X(D, M, N, $, ce) {
      return M === null || M.tag !== 7
        ? ((M = Nl(N, D.mode, $, ce)), (M.return = D), M)
        : ((M = f(M, N)), (M.return = D), M);
    }
    function P(D, M, N) {
      if (
        (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
      )
        return ((M = Bo("" + M, D.mode, N)), (M.return = D), M);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case k:
            return (
              (N = Hi(M.type, M.key, M.props, null, D.mode, N)),
              Ta(N, M),
              (N.return = D),
              N
            );
          case v:
            return ((M = Vo(M, D.mode, N)), (M.return = D), M);
          case q:
            var $ = M._init;
            return ((M = $(M._payload)), P(D, M, N));
        }
        if (ue(M) || te(M))
          return ((M = Nl(M, D.mode, N, null)), (M.return = D), M);
        if (typeof M.then == "function") return P(D, Wi(M), N);
        if (M.$$typeof === V) return P(D, Vi(D, M), N);
        eu(D, M);
      }
      return null;
    }
    function j(D, M, N, $) {
      var ce = M !== null ? M.key : null;
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return ce !== null ? null : S(D, M, "" + N, $);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case k:
            return N.key === ce ? T(D, M, N, $) : null;
          case v:
            return N.key === ce ? H(D, M, N, $) : null;
          case q:
            return ((ce = N._init), (N = ce(N._payload)), j(D, M, N, $));
        }
        if (ue(N) || te(N)) return ce !== null ? null : X(D, M, N, $, null);
        if (typeof N.then == "function") return j(D, M, Wi(N), $);
        if (N.$$typeof === V) return j(D, M, Vi(D, N), $);
        eu(D, N);
      }
      return null;
    }
    function B(D, M, N, $, ce) {
      if (
        (typeof $ == "string" && $ !== "") ||
        typeof $ == "number" ||
        typeof $ == "bigint"
      )
        return ((D = D.get(N) || null), S(M, D, "" + $, ce));
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case k:
            return (
              (D = D.get($.key === null ? N : $.key) || null),
              T(M, D, $, ce)
            );
          case v:
            return (
              (D = D.get($.key === null ? N : $.key) || null),
              H(M, D, $, ce)
            );
          case q:
            var De = $._init;
            return (($ = De($._payload)), B(D, M, N, $, ce));
        }
        if (ue($) || te($))
          return ((D = D.get(N) || null), X(M, D, $, ce, null));
        if (typeof $.then == "function") return B(D, M, N, Wi($), ce);
        if ($.$$typeof === V) return B(D, M, N, Vi(M, $), ce);
        eu(M, $);
      }
      return null;
    }
    function we(D, M, N, $) {
      for (
        var ce = null, De = null, pe = M, ke = (M = 0), Et = null;
        pe !== null && ke < N.length;
        ke++
      ) {
        pe.index > ke ? ((Et = pe), (pe = null)) : (Et = pe.sibling);
        var qe = j(D, pe, N[ke], $);
        if (qe === null) {
          pe === null && (pe = Et);
          break;
        }
        (e && pe && qe.alternate === null && n(D, pe),
          (M = d(qe, M, ke)),
          De === null ? (ce = qe) : (De.sibling = qe),
          (De = qe),
          (pe = Et));
      }
      if (ke === N.length) return (r(D, pe), Ze && Hl(D, ke), ce);
      if (pe === null) {
        for (; ke < N.length; ke++)
          ((pe = P(D, N[ke], $)),
            pe !== null &&
              ((M = d(pe, M, ke)),
              De === null ? (ce = pe) : (De.sibling = pe),
              (De = pe)));
        return (Ze && Hl(D, ke), ce);
      }
      for (pe = u(pe); ke < N.length; ke++)
        ((Et = B(pe, D, ke, N[ke], $)),
          Et !== null &&
            (e &&
              Et.alternate !== null &&
              pe.delete(Et.key === null ? ke : Et.key),
            (M = d(Et, M, ke)),
            De === null ? (ce = Et) : (De.sibling = Et),
            (De = Et)));
      return (
        e &&
          pe.forEach(function (El) {
            return n(D, El);
          }),
        Ze && Hl(D, ke),
        ce
      );
    }
    function xe(D, M, N, $) {
      if (N == null) throw Error(i(151));
      for (
        var ce = null,
          De = null,
          pe = M,
          ke = (M = 0),
          Et = null,
          qe = N.next();
        pe !== null && !qe.done;
        ke++, qe = N.next()
      ) {
        pe.index > ke ? ((Et = pe), (pe = null)) : (Et = pe.sibling);
        var El = j(D, pe, qe.value, $);
        if (El === null) {
          pe === null && (pe = Et);
          break;
        }
        (e && pe && El.alternate === null && n(D, pe),
          (M = d(El, M, ke)),
          De === null ? (ce = El) : (De.sibling = El),
          (De = El),
          (pe = Et));
      }
      if (qe.done) return (r(D, pe), Ze && Hl(D, ke), ce);
      if (pe === null) {
        for (; !qe.done; ke++, qe = N.next())
          ((qe = P(D, qe.value, $)),
            qe !== null &&
              ((M = d(qe, M, ke)),
              De === null ? (ce = qe) : (De.sibling = qe),
              (De = qe)));
        return (Ze && Hl(D, ke), ce);
      }
      for (pe = u(pe); !qe.done; ke++, qe = N.next())
        ((qe = B(pe, D, ke, qe.value, $)),
          qe !== null &&
            (e &&
              qe.alternate !== null &&
              pe.delete(qe.key === null ? ke : qe.key),
            (M = d(qe, M, ke)),
            De === null ? (ce = qe) : (De.sibling = qe),
            (De = qe)));
      return (
        e &&
          pe.forEach(function (Wb) {
            return n(D, Wb);
          }),
        Ze && Hl(D, ke),
        ce
      );
    }
    function Je(D, M, N, $) {
      if (
        (typeof N == "object" &&
          N !== null &&
          N.type === A &&
          N.key === null &&
          (N = N.props.children),
        typeof N == "object" && N !== null)
      ) {
        switch (N.$$typeof) {
          case k:
            e: {
              for (var ce = N.key; M !== null; ) {
                if (M.key === ce) {
                  if (((ce = N.type), ce === A)) {
                    if (M.tag === 7) {
                      (r(D, M.sibling),
                        ($ = f(M, N.props.children)),
                        ($.return = D),
                        (D = $));
                      break e;
                    }
                  } else if (
                    M.elementType === ce ||
                    (typeof ce == "object" &&
                      ce !== null &&
                      ce.$$typeof === q &&
                      od(ce) === M.type)
                  ) {
                    (r(D, M.sibling),
                      ($ = f(M, N.props)),
                      Ta($, N),
                      ($.return = D),
                      (D = $));
                    break e;
                  }
                  r(D, M);
                  break;
                } else n(D, M);
                M = M.sibling;
              }
              N.type === A
                ? (($ = Nl(N.props.children, D.mode, $, N.key)),
                  ($.return = D),
                  (D = $))
                : (($ = Hi(N.type, N.key, N.props, null, D.mode, $)),
                  Ta($, N),
                  ($.return = D),
                  (D = $));
            }
            return b(D);
          case v:
            e: {
              for (ce = N.key; M !== null; ) {
                if (M.key === ce)
                  if (
                    M.tag === 4 &&
                    M.stateNode.containerInfo === N.containerInfo &&
                    M.stateNode.implementation === N.implementation
                  ) {
                    (r(D, M.sibling),
                      ($ = f(M, N.children || [])),
                      ($.return = D),
                      (D = $));
                    break e;
                  } else {
                    r(D, M);
                    break;
                  }
                else n(D, M);
                M = M.sibling;
              }
              (($ = Vo(N, D.mode, $)), ($.return = D), (D = $));
            }
            return b(D);
          case q:
            return ((ce = N._init), (N = ce(N._payload)), Je(D, M, N, $));
        }
        if (ue(N)) return we(D, M, N, $);
        if (te(N)) {
          if (((ce = te(N)), typeof ce != "function")) throw Error(i(150));
          return ((N = ce.call(N)), xe(D, M, N, $));
        }
        if (typeof N.then == "function") return Je(D, M, Wi(N), $);
        if (N.$$typeof === V) return Je(D, M, Vi(D, N), $);
        eu(D, N);
      }
      return (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
        ? ((N = "" + N),
          M !== null && M.tag === 6
            ? (r(D, M.sibling), ($ = f(M, N)), ($.return = D), (D = $))
            : (r(D, M), ($ = Bo(N, D.mode, $)), ($.return = D), (D = $)),
          b(D))
        : r(D, M);
    }
    return function (D, M, N, $) {
      try {
        _a = 0;
        var ce = Je(D, M, N, $);
        return ((_r = null), ce);
      } catch (pe) {
        if (pe === ya || pe === Zi) throw pe;
        var De = $t(29, pe, null, D.mode);
        return ((De.lanes = $), (De.return = D), De);
      } finally {
      }
    };
  }
  var Tr = sd(!0),
    cd = sd(!1),
    hn = G(null),
    wn = null;
  function sl(e) {
    var n = e.alternate;
    (w(yt, yt.current & 1),
      w(hn, e),
      wn === null &&
        (n === null || Sr.current !== null || n.memoizedState !== null) &&
        (wn = e));
  }
  function fd(e) {
    if (e.tag === 22) {
      if ((w(yt, yt.current), w(hn, e), wn === null)) {
        var n = e.alternate;
        n !== null && n.memoizedState !== null && (wn = e);
      }
    } else cl();
  }
  function cl() {
    (w(yt, yt.current), w(hn, hn.current));
  }
  function Zn(e) {
    (re(hn), wn === e && (wn = null), re(yt));
  }
  var yt = G(0);
  function tu(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (
          r !== null &&
          ((r = r.dehydrated), r === null || r.data === "$?" || oc(r))
        )
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  function xs(e, n, r, u) {
    ((n = e.memoizedState),
      (r = r(u, n)),
      (r = r == null ? n : y({}, n, r)),
      (e.memoizedState = r),
      e.lanes === 0 && (e.updateQueue.baseState = r));
  }
  var vs = {
    enqueueSetState: function (e, n, r) {
      e = e._reactInternals;
      var u = Wt(),
        f = il(u);
      ((f.payload = n),
        r != null && (f.callback = r),
        (n = ul(e, f, u)),
        n !== null && (en(n, e, u), xa(n, e, u)));
    },
    enqueueReplaceState: function (e, n, r) {
      e = e._reactInternals;
      var u = Wt(),
        f = il(u);
      ((f.tag = 1),
        (f.payload = n),
        r != null && (f.callback = r),
        (n = ul(e, f, u)),
        n !== null && (en(n, e, u), xa(n, e, u)));
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals;
      var r = Wt(),
        u = il(r);
      ((u.tag = 2),
        n != null && (u.callback = n),
        (n = ul(e, u, r)),
        n !== null && (en(n, e, r), xa(n, e, r)));
    },
  };
  function hd(e, n, r, u, f, d, b) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(u, d, b)
        : n.prototype && n.prototype.isPureReactComponent
          ? !sa(r, u) || !sa(f, d)
          : !0
    );
  }
  function dd(e, n, r, u) {
    ((e = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(r, u),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(r, u),
      n.state !== e && vs.enqueueReplaceState(n, n.state, null));
  }
  function Il(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var u in n) u !== "ref" && (r[u] = n[u]);
    }
    if ((e = e.defaultProps)) {
      r === n && (r = y({}, r));
      for (var f in e) r[f] === void 0 && (r[f] = e[f]);
    }
    return r;
  }
  var nu =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var n = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(n)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function pd(e) {
    nu(e);
  }
  function md(e) {
    console.error(e);
  }
  function gd(e) {
    nu(e);
  }
  function lu(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function yd(e, n, r) {
    try {
      var u = e.onCaughtError;
      u(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null,
      });
    } catch (f) {
      setTimeout(function () {
        throw f;
      });
    }
  }
  function ks(e, n, r) {
    return (
      (r = il(r)),
      (r.tag = 3),
      (r.payload = { element: null }),
      (r.callback = function () {
        lu(e, n);
      }),
      r
    );
  }
  function bd(e) {
    return ((e = il(e)), (e.tag = 3), e);
  }
  function xd(e, n, r, u) {
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var d = u.value;
      ((e.payload = function () {
        return f(d);
      }),
        (e.callback = function () {
          yd(n, r, u);
        }));
    }
    var b = r.stateNode;
    b !== null &&
      typeof b.componentDidCatch == "function" &&
      (e.callback = function () {
        (yd(n, r, u),
          typeof f != "function" &&
            (gl === null ? (gl = new Set([this])) : gl.add(this)));
        var S = u.stack;
        this.componentDidCatch(u.value, {
          componentStack: S !== null ? S : "",
        });
      });
  }
  function W2(e, n, r, u, f) {
    if (
      ((r.flags |= 32768),
      u !== null && typeof u == "object" && typeof u.then == "function")
    ) {
      if (
        ((n = r.alternate),
        n !== null && pa(n, r, f, !0),
        (r = hn.current),
        r !== null)
      ) {
        switch (r.tag) {
          case 13:
            return (
              wn === null ? Gs() : r.alternate === null && ot === 0 && (ot = 3),
              (r.flags &= -257),
              (r.flags |= 65536),
              (r.lanes = f),
              u === Po
                ? (r.flags |= 16384)
                : ((n = r.updateQueue),
                  n === null ? (r.updateQueue = new Set([u])) : n.add(u),
                  Qs(e, u, f)),
              !1
            );
          case 22:
            return (
              (r.flags |= 65536),
              u === Po
                ? (r.flags |= 16384)
                : ((n = r.updateQueue),
                  n === null
                    ? ((n = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([u]),
                      }),
                      (r.updateQueue = n))
                    : ((r = n.retryQueue),
                      r === null ? (n.retryQueue = new Set([u])) : r.add(u)),
                  Qs(e, u, f)),
              !1
            );
        }
        throw Error(i(435, r.tag));
      }
      return (Qs(e, u, f), Gs(), !1);
    }
    if (Ze)
      return (
        (n = hn.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = f),
            u !== Io && ((e = Error(i(422), { cause: u })), da(on(e, r))))
          : (u !== Io && ((n = Error(i(423), { cause: u })), da(on(n, r))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (f &= -f),
            (e.lanes |= f),
            (u = on(u, r)),
            (f = ks(e.stateNode, u, f)),
            Wo(e, f),
            ot !== 4 && (ot = 2)),
        !1
      );
    var d = Error(i(520), { cause: u });
    if (
      ((d = on(d, r)),
      Na === null ? (Na = [d]) : Na.push(d),
      ot !== 4 && (ot = 2),
      n === null)
    )
      return !0;
    ((u = on(u, r)), (r = n));
    do {
      switch (r.tag) {
        case 3:
          return (
            (r.flags |= 65536),
            (e = f & -f),
            (r.lanes |= e),
            (e = ks(r.stateNode, u, e)),
            Wo(r, e),
            !1
          );
        case 1:
          if (
            ((n = r.type),
            (d = r.stateNode),
            (r.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == "function" ||
                (d !== null &&
                  typeof d.componentDidCatch == "function" &&
                  (gl === null || !gl.has(d)))))
          )
            return (
              (r.flags |= 65536),
              (f &= -f),
              (r.lanes |= f),
              (f = bd(f)),
              xd(f, e, r, u),
              Wo(r, f),
              !1
            );
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var vd = Error(i(461)),
    St = !1;
  function _t(e, n, r, u) {
    n.child = e === null ? cd(n, null, r, u) : Tr(n, e.child, r, u);
  }
  function kd(e, n, r, u, f) {
    r = r.render;
    var d = n.ref;
    if ("ref" in u) {
      var b = {};
      for (var S in u) S !== "ref" && (b[S] = u[S]);
    } else b = u;
    return (
      Vl(n),
      (u = rs(e, n, r, b, d, f)),
      (S = as()),
      e !== null && !St
        ? (is(e, n, f), In(e, n, f))
        : (Ze && S && qo(n), (n.flags |= 1), _t(e, n, u, f), n.child)
    );
  }
  function Sd(e, n, r, u, f) {
    if (e === null) {
      var d = r.type;
      return typeof d == "function" &&
        !Uo(d) &&
        d.defaultProps === void 0 &&
        r.compare === null
        ? ((n.tag = 15), (n.type = d), wd(e, n, d, u, f))
        : ((e = Hi(r.type, null, u, n, n.mode, f)),
          (e.ref = n.ref),
          (e.return = n),
          (n.child = e));
    }
    if (((d = e.child), !Rs(e, f))) {
      var b = d.memoizedProps;
      if (
        ((r = r.compare), (r = r !== null ? r : sa), r(b, u) && e.ref === n.ref)
      )
        return In(e, n, f);
    }
    return (
      (n.flags |= 1),
      (e = Hn(d, u)),
      (e.ref = n.ref),
      (e.return = n),
      (n.child = e)
    );
  }
  function wd(e, n, r, u, f) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (sa(d, u) && e.ref === n.ref)
        if (((St = !1), (n.pendingProps = u = d), Rs(e, f)))
          (e.flags & 131072) !== 0 && (St = !0);
        else return ((n.lanes = e.lanes), In(e, n, f));
    }
    return Ss(e, n, r, u, f);
  }
  function Ed(e, n, r) {
    var u = n.pendingProps,
      f = u.children,
      d = e !== null ? e.memoizedState : null;
    if (u.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (((u = d !== null ? d.baseLanes | r : r), e !== null)) {
          for (f = n.child = e.child, d = 0; f !== null; )
            ((d = d | f.lanes | f.childLanes), (f = f.sibling));
          n.childLanes = d & ~u;
        } else ((n.childLanes = 0), (n.child = null));
        return Ad(e, n, u, r);
      }
      if ((r & 536870912) !== 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && qi(n, d !== null ? d.cachePool : null),
          d !== null ? w0(n, d) : ts(),
          fd(n));
      else
        return (
          (n.lanes = n.childLanes = 536870912),
          Ad(e, n, d !== null ? d.baseLanes | r : r, r)
        );
    } else
      d !== null
        ? (qi(n, d.cachePool), w0(n, d), cl(), (n.memoizedState = null))
        : (e !== null && qi(n, null), ts(), cl());
    return (_t(e, n, f, r), n.child);
  }
  function Ad(e, n, r, u) {
    var f = $o();
    return (
      (f = f === null ? null : { parent: gt._currentValue, pool: f }),
      (n.memoizedState = { baseLanes: r, cachePool: f }),
      e !== null && qi(n, null),
      ts(),
      fd(n),
      e !== null && pa(e, n, u, !0),
      null
    );
  }
  function ru(e, n) {
    var r = n.ref;
    if (r === null) e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object") throw Error(i(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function Ss(e, n, r, u, f) {
    return (
      Vl(n),
      (r = rs(e, n, r, u, void 0, f)),
      (u = as()),
      e !== null && !St
        ? (is(e, n, f), In(e, n, f))
        : (Ze && u && qo(n), (n.flags |= 1), _t(e, n, r, f), n.child)
    );
  }
  function _d(e, n, r, u, f, d) {
    return (
      Vl(n),
      (n.updateQueue = null),
      (r = A0(n, u, r, f)),
      E0(e),
      (u = as()),
      e !== null && !St
        ? (is(e, n, d), In(e, n, d))
        : (Ze && u && qo(n), (n.flags |= 1), _t(e, n, r, d), n.child)
    );
  }
  function Td(e, n, r, u, f) {
    if ((Vl(n), n.stateNode === null)) {
      var d = yr,
        b = r.contextType;
      (typeof b == "object" && b !== null && (d = zt(b)),
        (d = new r(u, d)),
        (n.memoizedState =
          d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = vs),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = u),
        (d.state = n.memoizedState),
        (d.refs = {}),
        Ko(n),
        (b = r.contextType),
        (d.context = typeof b == "object" && b !== null ? zt(b) : yr),
        (d.state = n.memoizedState),
        (b = r.getDerivedStateFromProps),
        typeof b == "function" && (xs(n, r, b, u), (d.state = n.memoizedState)),
        typeof r.getDerivedStateFromProps == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function" ||
          (typeof d.UNSAFE_componentWillMount != "function" &&
            typeof d.componentWillMount != "function") ||
          ((b = d.state),
          typeof d.componentWillMount == "function" && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == "function" &&
            d.UNSAFE_componentWillMount(),
          b !== d.state && vs.enqueueReplaceState(d, d.state, null),
          ka(n, u, d, f),
          va(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == "function" && (n.flags |= 4194308),
        (u = !0));
    } else if (e === null) {
      d = n.stateNode;
      var S = n.memoizedProps,
        T = Il(r, S);
      d.props = T;
      var H = d.context,
        X = r.contextType;
      ((b = yr), typeof X == "object" && X !== null && (b = zt(X)));
      var P = r.getDerivedStateFromProps;
      ((X =
        typeof P == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function"),
        (S = n.pendingProps !== S),
        X ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((S || H !== b) && dd(n, d, u, b)),
        (al = !1));
      var j = n.memoizedState;
      ((d.state = j),
        ka(n, u, d, f),
        va(),
        (H = n.memoizedState),
        S || j !== H || al
          ? (typeof P == "function" && (xs(n, r, P, u), (H = n.memoizedState)),
            (T = al || hd(n, r, T, u, j, H, b))
              ? (X ||
                  (typeof d.UNSAFE_componentWillMount != "function" &&
                    typeof d.componentWillMount != "function") ||
                  (typeof d.componentWillMount == "function" &&
                    d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == "function" &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = u),
                (n.memoizedState = H)),
            (d.props = u),
            (d.state = H),
            (d.context = b),
            (u = T))
          : (typeof d.componentDidMount == "function" && (n.flags |= 4194308),
            (u = !1)));
    } else {
      ((d = n.stateNode),
        Jo(e, n),
        (b = n.memoizedProps),
        (X = Il(r, b)),
        (d.props = X),
        (P = n.pendingProps),
        (j = d.context),
        (H = r.contextType),
        (T = yr),
        typeof H == "object" && H !== null && (T = zt(H)),
        (S = r.getDerivedStateFromProps),
        (H =
          typeof S == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function") ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((b !== P || j !== T) && dd(n, d, u, T)),
        (al = !1),
        (j = n.memoizedState),
        (d.state = j),
        ka(n, u, d, f),
        va());
      var B = n.memoizedState;
      b !== P ||
      j !== B ||
      al ||
      (e !== null && e.dependencies !== null && Bi(e.dependencies))
        ? (typeof S == "function" && (xs(n, r, S, u), (B = n.memoizedState)),
          (X =
            al ||
            hd(n, r, X, u, j, B, T) ||
            (e !== null && e.dependencies !== null && Bi(e.dependencies)))
            ? (H ||
                (typeof d.UNSAFE_componentWillUpdate != "function" &&
                  typeof d.componentWillUpdate != "function") ||
                (typeof d.componentWillUpdate == "function" &&
                  d.componentWillUpdate(u, B, T),
                typeof d.UNSAFE_componentWillUpdate == "function" &&
                  d.UNSAFE_componentWillUpdate(u, B, T)),
              typeof d.componentDidUpdate == "function" && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof d.componentDidUpdate != "function" ||
                (b === e.memoizedProps && j === e.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != "function" ||
                (b === e.memoizedProps && j === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = u),
              (n.memoizedState = B)),
          (d.props = u),
          (d.state = B),
          (d.context = T),
          (u = X))
        : (typeof d.componentDidUpdate != "function" ||
            (b === e.memoizedProps && j === e.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != "function" ||
            (b === e.memoizedProps && j === e.memoizedState) ||
            (n.flags |= 1024),
          (u = !1));
    }
    return (
      (d = u),
      ru(e, n),
      (u = (n.flags & 128) !== 0),
      d || u
        ? ((d = n.stateNode),
          (r =
            u && typeof r.getDerivedStateFromError != "function"
              ? null
              : d.render()),
          (n.flags |= 1),
          e !== null && u
            ? ((n.child = Tr(n, e.child, null, f)),
              (n.child = Tr(n, null, r, f)))
            : _t(e, n, r, f),
          (n.memoizedState = d.state),
          (e = n.child))
        : (e = In(e, n, f)),
      e
    );
  }
  function Cd(e, n, r, u) {
    return (ha(), (n.flags |= 256), _t(e, n, r, u), n.child);
  }
  var ws = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Es(e) {
    return { baseLanes: e, cachePool: m0() };
  }
  function As(e, n, r) {
    return ((e = e !== null ? e.childLanes & ~r : 0), n && (e |= dn), e);
  }
  function Rd(e, n, r) {
    var u = n.pendingProps,
      f = !1,
      d = (n.flags & 128) !== 0,
      b;
    if (
      ((b = d) ||
        (b =
          e !== null && e.memoizedState === null ? !1 : (yt.current & 2) !== 0),
      b && ((f = !0), (n.flags &= -129)),
      (b = (n.flags & 32) !== 0),
      (n.flags &= -33),
      e === null)
    ) {
      if (Ze) {
        if ((f ? sl(n) : cl(), Ze)) {
          var S = ut,
            T;
          if ((T = S)) {
            e: {
              for (T = S, S = Sn; T.nodeType !== 8; ) {
                if (!S) {
                  S = null;
                  break e;
                }
                if (((T = xn(T.nextSibling)), T === null)) {
                  S = null;
                  break e;
                }
              }
              S = T;
            }
            S !== null
              ? ((n.memoizedState = {
                  dehydrated: S,
                  treeContext: Ll !== null ? { id: jn, overflow: Un } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (T = $t(18, null, null, 0)),
                (T.stateNode = S),
                (T.return = n),
                (n.child = T),
                (Lt = n),
                (ut = null),
                (T = !0))
              : (T = !1);
          }
          T || Ul(n);
        }
        if (
          ((S = n.memoizedState),
          S !== null && ((S = S.dehydrated), S !== null))
        )
          return (oc(S) ? (n.lanes = 32) : (n.lanes = 536870912), null);
        Zn(n);
      }
      return (
        (S = u.children),
        (u = u.fallback),
        f
          ? (cl(),
            (f = n.mode),
            (S = au({ mode: "hidden", children: S }, f)),
            (u = Nl(u, f, r, null)),
            (S.return = n),
            (u.return = n),
            (S.sibling = u),
            (n.child = S),
            (f = n.child),
            (f.memoizedState = Es(r)),
            (f.childLanes = As(e, b, r)),
            (n.memoizedState = ws),
            u)
          : (sl(n), _s(n, S))
      );
    }
    if (
      ((T = e.memoizedState), T !== null && ((S = T.dehydrated), S !== null))
    ) {
      if (d)
        n.flags & 256
          ? (sl(n), (n.flags &= -257), (n = Ts(e, n, r)))
          : n.memoizedState !== null
            ? (cl(), (n.child = e.child), (n.flags |= 128), (n = null))
            : (cl(),
              (f = u.fallback),
              (S = n.mode),
              (u = au({ mode: "visible", children: u.children }, S)),
              (f = Nl(f, S, r, null)),
              (f.flags |= 2),
              (u.return = n),
              (f.return = n),
              (u.sibling = f),
              (n.child = u),
              Tr(n, e.child, null, r),
              (u = n.child),
              (u.memoizedState = Es(r)),
              (u.childLanes = As(e, b, r)),
              (n.memoizedState = ws),
              (n = f));
      else if ((sl(n), oc(S))) {
        if (((b = S.nextSibling && S.nextSibling.dataset), b)) var H = b.dgst;
        ((b = H),
          (u = Error(i(419))),
          (u.stack = ""),
          (u.digest = b),
          da({ value: u, source: null, stack: null }),
          (n = Ts(e, n, r)));
      } else if (
        (St || pa(e, n, r, !1), (b = (r & e.childLanes) !== 0), St || b)
      ) {
        if (
          ((b = tt),
          b !== null &&
            ((u = r & -r),
            (u = (u & 42) !== 0 ? 1 : oo(u)),
            (u = (u & (b.suspendedLanes | r)) !== 0 ? 0 : u),
            u !== 0 && u !== T.retryLane))
        )
          throw ((T.retryLane = u), gr(e, u), en(b, e, u), vd);
        (S.data === "$?" || Gs(), (n = Ts(e, n, r)));
      } else
        S.data === "$?"
          ? ((n.flags |= 192), (n.child = e.child), (n = null))
          : ((e = T.treeContext),
            (ut = xn(S.nextSibling)),
            (Lt = n),
            (Ze = !0),
            (jl = null),
            (Sn = !1),
            e !== null &&
              ((cn[fn++] = jn),
              (cn[fn++] = Un),
              (cn[fn++] = Ll),
              (jn = e.id),
              (Un = e.overflow),
              (Ll = n)),
            (n = _s(n, u.children)),
            (n.flags |= 4096));
      return n;
    }
    return f
      ? (cl(),
        (f = u.fallback),
        (S = n.mode),
        (T = e.child),
        (H = T.sibling),
        (u = Hn(T, { mode: "hidden", children: u.children })),
        (u.subtreeFlags = T.subtreeFlags & 65011712),
        H !== null ? (f = Hn(H, f)) : ((f = Nl(f, S, r, null)), (f.flags |= 2)),
        (f.return = n),
        (u.return = n),
        (u.sibling = f),
        (n.child = u),
        (u = f),
        (f = n.child),
        (S = e.child.memoizedState),
        S === null
          ? (S = Es(r))
          : ((T = S.cachePool),
            T !== null
              ? ((H = gt._currentValue),
                (T = T.parent !== H ? { parent: H, pool: H } : T))
              : (T = m0()),
            (S = { baseLanes: S.baseLanes | r, cachePool: T })),
        (f.memoizedState = S),
        (f.childLanes = As(e, b, r)),
        (n.memoizedState = ws),
        u)
      : (sl(n),
        (r = e.child),
        (e = r.sibling),
        (r = Hn(r, { mode: "visible", children: u.children })),
        (r.return = n),
        (r.sibling = null),
        e !== null &&
          ((b = n.deletions),
          b === null ? ((n.deletions = [e]), (n.flags |= 16)) : b.push(e)),
        (n.child = r),
        (n.memoizedState = null),
        r);
  }
  function _s(e, n) {
    return (
      (n = au({ mode: "visible", children: n }, e.mode)),
      (n.return = e),
      (e.child = n)
    );
  }
  function au(e, n) {
    return (
      (e = $t(22, e, null, n)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Ts(e, n, r) {
    return (
      Tr(n, e.child, null, r),
      (e = _s(n, n.pendingProps.children)),
      (e.flags |= 2),
      (n.memoizedState = null),
      e
    );
  }
  function Md(e, n, r) {
    e.lanes |= n;
    var u = e.alternate;
    (u !== null && (u.lanes |= n), Go(e.return, n, r));
  }
  function Cs(e, n, r, u, f) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: u,
          tail: r,
          tailMode: f,
        })
      : ((d.isBackwards = n),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = u),
        (d.tail = r),
        (d.tailMode = f));
  }
  function zd(e, n, r) {
    var u = n.pendingProps,
      f = u.revealOrder,
      d = u.tail;
    if ((_t(e, n, u.children, r), (u = yt.current), (u & 2) !== 0))
      ((u = (u & 1) | 2), (n.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Md(e, r, n);
          else if (e.tag === 19) Md(e, r, n);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === n) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === n) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      u &= 1;
    }
    switch ((w(yt, u), f)) {
      case "forwards":
        for (r = n.child, f = null; r !== null; )
          ((e = r.alternate),
            e !== null && tu(e) === null && (f = r),
            (r = r.sibling));
        ((r = f),
          r === null
            ? ((f = n.child), (n.child = null))
            : ((f = r.sibling), (r.sibling = null)),
          Cs(n, !1, f, r, d));
        break;
      case "backwards":
        for (r = null, f = n.child, n.child = null; f !== null; ) {
          if (((e = f.alternate), e !== null && tu(e) === null)) {
            n.child = f;
            break;
          }
          ((e = f.sibling), (f.sibling = r), (r = f), (f = e));
        }
        Cs(n, !0, r, null, d);
        break;
      case "together":
        Cs(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function In(e, n, r) {
    if (
      (e !== null && (n.dependencies = e.dependencies),
      (ml |= n.lanes),
      (r & n.childLanes) === 0)
    )
      if (e !== null) {
        if ((pa(e, n, r, !1), (r & n.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && n.child !== e.child) throw Error(i(153));
    if (n.child !== null) {
      for (
        e = n.child, r = Hn(e, e.pendingProps), n.child = r, r.return = n;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (r = r.sibling = Hn(e, e.pendingProps)),
          (r.return = n));
      r.sibling = null;
    }
    return n.child;
  }
  function Rs(e, n) {
    return (e.lanes & n) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Bi(e)));
  }
  function eb(e, n, r) {
    switch (n.tag) {
      case 3:
        (Te(n, n.stateNode.containerInfo),
          rl(n, gt, e.memoizedState.cache),
          ha());
        break;
      case 27:
      case 5:
        at(n);
        break;
      case 4:
        Te(n, n.stateNode.containerInfo);
        break;
      case 10:
        rl(n, n.type, n.memoizedProps.value);
        break;
      case 13:
        var u = n.memoizedState;
        if (u !== null)
          return u.dehydrated !== null
            ? (sl(n), (n.flags |= 128), null)
            : (r & n.child.childLanes) !== 0
              ? Rd(e, n, r)
              : (sl(n), (e = In(e, n, r)), e !== null ? e.sibling : null);
        sl(n);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (
          ((u = (r & n.childLanes) !== 0),
          u || (pa(e, n, r, !1), (u = (r & n.childLanes) !== 0)),
          f)
        ) {
          if (u) return zd(e, n, r);
          n.flags |= 128;
        }
        if (
          ((f = n.memoizedState),
          f !== null &&
            ((f.rendering = null), (f.tail = null), (f.lastEffect = null)),
          w(yt, yt.current),
          u)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), Ed(e, n, r));
      case 24:
        rl(n, gt, e.memoizedState.cache);
    }
    return In(e, n, r);
  }
  function Dd(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps) St = !0;
      else {
        if (!Rs(e, r) && (n.flags & 128) === 0) return ((St = !1), eb(e, n, r));
        St = (e.flags & 131072) !== 0;
      }
    else ((St = !1), Ze && (n.flags & 1048576) !== 0 && o0(n, Ui, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          e = n.pendingProps;
          var u = n.elementType,
            f = u._init;
          if (((u = f(u._payload)), (n.type = u), typeof u == "function"))
            Uo(u)
              ? ((e = Il(u, e)), (n.tag = 1), (n = Td(null, n, u, e, r)))
              : ((n.tag = 0), (n = Ss(null, n, u, e, r)));
          else {
            if (u != null) {
              if (((f = u.$$typeof), f === ee)) {
                ((n.tag = 11), (n = kd(null, n, u, e, r)));
                break e;
              } else if (f === F) {
                ((n.tag = 14), (n = Sd(null, n, u, e, r)));
                break e;
              }
            }
            throw ((n = ie(u) || u), Error(i(306, n, "")));
          }
        }
        return n;
      case 0:
        return Ss(e, n, n.type, n.pendingProps, r);
      case 1:
        return ((u = n.type), (f = Il(u, n.pendingProps)), Td(e, n, u, f, r));
      case 3:
        e: {
          if ((Te(n, n.stateNode.containerInfo), e === null))
            throw Error(i(387));
          u = n.pendingProps;
          var d = n.memoizedState;
          ((f = d.element), Jo(e, n), ka(n, u, null, r));
          var b = n.memoizedState;
          if (
            ((u = b.cache),
            rl(n, gt, u),
            u !== d.cache && Fo(n, [gt], r, !0),
            va(),
            (u = b.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: u, isDehydrated: !1, cache: b.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = Cd(e, n, u, r);
              break e;
            } else if (u !== f) {
              ((f = on(Error(i(424)), n)), da(f), (n = Cd(e, n, u, r)));
              break e;
            } else {
              switch (((e = n.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                ut = xn(e.firstChild),
                  Lt = n,
                  Ze = !0,
                  jl = null,
                  Sn = !0,
                  r = cd(n, null, u, r),
                  n.child = r;
                r;

              )
                ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
            }
          else {
            if ((ha(), u === f)) {
              n = In(e, n, r);
              break e;
            }
            _t(e, n, u, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          ru(e, n),
          e === null
            ? (r = Hp(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = r)
              : Ze ||
                ((r = n.type),
                (e = n.pendingProps),
                (u = xu(se.current).createElement(r)),
                (u[Mt] = n),
                (u[Vt] = e),
                Ct(u, r, e),
                kt(u),
                (n.stateNode = u))
            : (n.memoizedState = Hp(
                n.type,
                e.memoizedProps,
                n.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          at(n),
          e === null &&
            Ze &&
            ((u = n.stateNode = Op(n.type, n.pendingProps, se.current)),
            (Lt = n),
            (Sn = !0),
            (f = ut),
            xl(n.type) ? ((sc = f), (ut = xn(u.firstChild))) : (ut = f)),
          _t(e, n, n.pendingProps.children, r),
          ru(e, n),
          e === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          e === null &&
            Ze &&
            ((f = u = ut) &&
              ((u = Cb(u, n.type, n.pendingProps, Sn)),
              u !== null
                ? ((n.stateNode = u),
                  (Lt = n),
                  (ut = xn(u.firstChild)),
                  (Sn = !1),
                  (f = !0))
                : (f = !1)),
            f || Ul(n)),
          at(n),
          (f = n.type),
          (d = n.pendingProps),
          (b = e !== null ? e.memoizedProps : null),
          (u = d.children),
          ac(f, d) ? (u = null) : b !== null && ac(f, b) && (n.flags |= 32),
          n.memoizedState !== null &&
            ((f = rs(e, n, F2, null, null, r)), (Ia._currentValue = f)),
          ru(e, n),
          _t(e, n, u, r),
          n.child
        );
      case 6:
        return (
          e === null &&
            Ze &&
            ((e = r = ut) &&
              ((r = Rb(r, n.pendingProps, Sn)),
              r !== null
                ? ((n.stateNode = r), (Lt = n), (ut = null), (e = !0))
                : (e = !1)),
            e || Ul(n)),
          null
        );
      case 13:
        return Rd(e, n, r);
      case 4:
        return (
          Te(n, n.stateNode.containerInfo),
          (u = n.pendingProps),
          e === null ? (n.child = Tr(n, null, u, r)) : _t(e, n, u, r),
          n.child
        );
      case 11:
        return kd(e, n, n.type, n.pendingProps, r);
      case 7:
        return (_t(e, n, n.pendingProps, r), n.child);
      case 8:
        return (_t(e, n, n.pendingProps.children, r), n.child);
      case 12:
        return (_t(e, n, n.pendingProps.children, r), n.child);
      case 10:
        return (
          (u = n.pendingProps),
          rl(n, n.type, u.value),
          _t(e, n, u.children, r),
          n.child
        );
      case 9:
        return (
          (f = n.type._context),
          (u = n.pendingProps.children),
          Vl(n),
          (f = zt(f)),
          (u = u(f)),
          (n.flags |= 1),
          _t(e, n, u, r),
          n.child
        );
      case 14:
        return Sd(e, n, n.type, n.pendingProps, r);
      case 15:
        return wd(e, n, n.type, n.pendingProps, r);
      case 19:
        return zd(e, n, r);
      case 31:
        return (
          (u = n.pendingProps),
          (r = n.mode),
          (u = { mode: u.mode, children: u.children }),
          e === null
            ? ((r = au(u, r)),
              (r.ref = n.ref),
              (n.child = r),
              (r.return = n),
              (n = r))
            : ((r = Hn(e.child, u)),
              (r.ref = n.ref),
              (n.child = r),
              (r.return = n),
              (n = r)),
          n
        );
      case 22:
        return Ed(e, n, r);
      case 24:
        return (
          Vl(n),
          (u = zt(gt)),
          e === null
            ? ((f = $o()),
              f === null &&
                ((f = tt),
                (d = Qo()),
                (f.pooledCache = d),
                d.refCount++,
                d !== null && (f.pooledCacheLanes |= r),
                (f = d)),
              (n.memoizedState = { parent: u, cache: f }),
              Ko(n),
              rl(n, gt, f))
            : ((e.lanes & r) !== 0 && (Jo(e, n), ka(n, null, null, r), va()),
              (f = e.memoizedState),
              (d = n.memoizedState),
              f.parent !== u
                ? ((f = { parent: u, cache: u }),
                  (n.memoizedState = f),
                  n.lanes === 0 &&
                    (n.memoizedState = n.updateQueue.baseState = f),
                  rl(n, gt, u))
                : ((u = d.cache),
                  rl(n, gt, u),
                  u !== f.cache && Fo(n, [gt], r, !0))),
          _t(e, n, n.pendingProps.children, r),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(i(156, n.tag));
  }
  function Yn(e) {
    e.flags |= 4;
  }
  function Od(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !qp(n))) {
      if (
        ((n = hn.current),
        n !== null &&
          ((je & 4194048) === je
            ? wn !== null
            : ((je & 62914560) !== je && (je & 536870912) === 0) || n !== wn))
      )
        throw ((ba = Po), g0);
      e.flags |= 8192;
    }
  }
  function iu(e, n) {
    (n !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((n = e.tag !== 22 ? fh() : 536870912), (e.lanes |= n), (zr |= n)));
  }
  function Ca(e, n) {
    if (!Ze)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var r = null; n !== null; )
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null ? (e.tail = null) : (r.sibling = null);
          break;
        case "collapsed":
          r = e.tail;
          for (var u = null; r !== null; )
            (r.alternate !== null && (u = r), (r = r.sibling));
          u === null
            ? n || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (u.sibling = null);
      }
  }
  function it(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      r = 0,
      u = 0;
    if (n)
      for (var f = e.child; f !== null; )
        ((r |= f.lanes | f.childLanes),
          (u |= f.subtreeFlags & 65011712),
          (u |= f.flags & 65011712),
          (f.return = e),
          (f = f.sibling));
    else
      for (f = e.child; f !== null; )
        ((r |= f.lanes | f.childLanes),
          (u |= f.subtreeFlags),
          (u |= f.flags),
          (f.return = e),
          (f = f.sibling));
    return ((e.subtreeFlags |= u), (e.childLanes = r), n);
  }
  function tb(e, n, r) {
    var u = n.pendingProps;
    switch ((Zo(n), n.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (it(n), null);
      case 1:
        return (it(n), null);
      case 3:
        return (
          (r = n.stateNode),
          (u = null),
          e !== null && (u = e.memoizedState.cache),
          n.memoizedState.cache !== u && (n.flags |= 2048),
          Vn(gt),
          lt(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (fa(n)
              ? Yn(n)
              : e === null ||
                (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), f0())),
          it(n),
          null
        );
      case 26:
        return (
          (r = n.memoizedState),
          e === null
            ? (Yn(n),
              r !== null ? (it(n), Od(n, r)) : (it(n), (n.flags &= -16777217)))
            : r
              ? r !== e.memoizedState
                ? (Yn(n), it(n), Od(n, r))
                : (it(n), (n.flags &= -16777217))
              : (e.memoizedProps !== u && Yn(n), it(n), (n.flags &= -16777217)),
          null
        );
      case 27:
        (xt(n), (r = se.current));
        var f = n.type;
        if (e !== null && n.stateNode != null) e.memoizedProps !== u && Yn(n);
        else {
          if (!u) {
            if (n.stateNode === null) throw Error(i(166));
            return (it(n), null);
          }
          ((e = oe.current),
            fa(n) ? s0(n) : ((e = Op(f, u, r)), (n.stateNode = e), Yn(n)));
        }
        return (it(n), null);
      case 5:
        if ((xt(n), (r = n.type), e !== null && n.stateNode != null))
          e.memoizedProps !== u && Yn(n);
        else {
          if (!u) {
            if (n.stateNode === null) throw Error(i(166));
            return (it(n), null);
          }
          if (((e = oe.current), fa(n))) s0(n);
          else {
            switch (((f = xu(se.current)), e)) {
              case 1:
                e = f.createElementNS("http://www.w3.org/2000/svg", r);
                break;
              case 2:
                e = f.createElementNS("http://www.w3.org/1998/Math/MathML", r);
                break;
              default:
                switch (r) {
                  case "svg":
                    e = f.createElementNS("http://www.w3.org/2000/svg", r);
                    break;
                  case "math":
                    e = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r
                    );
                    break;
                  case "script":
                    ((e = f.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)));
                    break;
                  case "select":
                    ((e =
                      typeof u.is == "string"
                        ? f.createElement("select", { is: u.is })
                        : f.createElement("select")),
                      u.multiple
                        ? (e.multiple = !0)
                        : u.size && (e.size = u.size));
                    break;
                  default:
                    e =
                      typeof u.is == "string"
                        ? f.createElement(r, { is: u.is })
                        : f.createElement(r);
                }
            }
            ((e[Mt] = n), (e[Vt] = u));
            e: for (f = n.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) e.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === n) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === n) break e;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            n.stateNode = e;
            e: switch ((Ct(e, r, u), r)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!u.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Yn(n);
          }
        }
        return (it(n), (n.flags &= -16777217), null);
      case 6:
        if (e && n.stateNode != null) e.memoizedProps !== u && Yn(n);
        else {
          if (typeof u != "string" && n.stateNode === null) throw Error(i(166));
          if (((e = se.current), fa(n))) {
            if (
              ((e = n.stateNode),
              (r = n.memoizedProps),
              (u = null),
              (f = Lt),
              f !== null)
            )
              switch (f.tag) {
                case 27:
                case 5:
                  u = f.memoizedProps;
              }
            ((e[Mt] = n),
              (e = !!(
                e.nodeValue === r ||
                (u !== null && u.suppressHydrationWarning === !0) ||
                _p(e.nodeValue, r)
              )),
              e || Ul(n));
          } else
            ((e = xu(e).createTextNode(u)), (e[Mt] = n), (n.stateNode = e));
        }
        return (it(n), null);
      case 13:
        if (
          ((u = n.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((f = fa(n)), u !== null && u.dehydrated !== null)) {
            if (e === null) {
              if (!f) throw Error(i(318));
              if (
                ((f = n.memoizedState),
                (f = f !== null ? f.dehydrated : null),
                !f)
              )
                throw Error(i(317));
              f[Mt] = n;
            } else
              (ha(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (it(n), (f = !1));
          } else
            ((f = f0()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = f),
              (f = !0));
          if (!f) return n.flags & 256 ? (Zn(n), n) : (Zn(n), null);
        }
        if ((Zn(n), (n.flags & 128) !== 0)) return ((n.lanes = r), n);
        if (
          ((r = u !== null), (e = e !== null && e.memoizedState !== null), r)
        ) {
          ((u = n.child),
            (f = null),
            u.alternate !== null &&
              u.alternate.memoizedState !== null &&
              u.alternate.memoizedState.cachePool !== null &&
              (f = u.alternate.memoizedState.cachePool.pool));
          var d = null;
          (u.memoizedState !== null &&
            u.memoizedState.cachePool !== null &&
            (d = u.memoizedState.cachePool.pool),
            d !== f && (u.flags |= 2048));
        }
        return (
          r !== e && r && (n.child.flags |= 8192),
          iu(n, n.updateQueue),
          it(n),
          null
        );
      case 4:
        return (lt(), e === null && ec(n.stateNode.containerInfo), it(n), null);
      case 10:
        return (Vn(n.type), it(n), null);
      case 19:
        if ((re(yt), (f = n.memoizedState), f === null)) return (it(n), null);
        if (((u = (n.flags & 128) !== 0), (d = f.rendering), d === null))
          if (u) Ca(f, !1);
          else {
            if (ot !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null; ) {
                if (((d = tu(e)), d !== null)) {
                  for (
                    n.flags |= 128,
                      Ca(f, !1),
                      e = d.updateQueue,
                      n.updateQueue = e,
                      iu(n, e),
                      n.subtreeFlags = 0,
                      e = r,
                      r = n.child;
                    r !== null;

                  )
                    (u0(r, e), (r = r.sibling));
                  return (w(yt, (yt.current & 1) | 2), n.child);
                }
                e = e.sibling;
              }
            f.tail !== null &&
              Ie() > su &&
              ((n.flags |= 128), (u = !0), Ca(f, !1), (n.lanes = 4194304));
          }
        else {
          if (!u)
            if (((e = tu(d)), e !== null)) {
              if (
                ((n.flags |= 128),
                (u = !0),
                (e = e.updateQueue),
                (n.updateQueue = e),
                iu(n, e),
                Ca(f, !0),
                f.tail === null &&
                  f.tailMode === "hidden" &&
                  !d.alternate &&
                  !Ze)
              )
                return (it(n), null);
            } else
              2 * Ie() - f.renderingStartTime > su &&
                r !== 536870912 &&
                ((n.flags |= 128), (u = !0), Ca(f, !1), (n.lanes = 4194304));
          f.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((e = f.last),
              e !== null ? (e.sibling = d) : (n.child = d),
              (f.last = d));
        }
        return f.tail !== null
          ? ((n = f.tail),
            (f.rendering = n),
            (f.tail = n.sibling),
            (f.renderingStartTime = Ie()),
            (n.sibling = null),
            (e = yt.current),
            w(yt, u ? (e & 1) | 2 : e & 1),
            n)
          : (it(n), null);
      case 22:
      case 23:
        return (
          Zn(n),
          ns(),
          (u = n.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== u && (n.flags |= 8192)
            : u && (n.flags |= 8192),
          u
            ? (r & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (it(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : it(n),
          (r = n.updateQueue),
          r !== null && iu(n, r.retryQueue),
          (r = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (r = e.memoizedState.cachePool.pool),
          (u = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (u = n.memoizedState.cachePool.pool),
          u !== r && (n.flags |= 2048),
          e !== null && re(ql),
          null
        );
      case 24:
        return (
          (r = null),
          e !== null && (r = e.memoizedState.cache),
          n.memoizedState.cache !== r && (n.flags |= 2048),
          Vn(gt),
          it(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function nb(e, n) {
    switch ((Zo(n), n.tag)) {
      case 1:
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 3:
        return (
          Vn(gt),
          lt(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((n.flags = (e & -65537) | 128), n)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (xt(n), null);
      case 13:
        if (
          (Zn(n), (e = n.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(i(340));
          ha();
        }
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 19:
        return (re(yt), null);
      case 4:
        return (lt(), null);
      case 10:
        return (Vn(n.type), null);
      case 22:
      case 23:
        return (
          Zn(n),
          ns(),
          e !== null && re(ql),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 24:
        return (Vn(gt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Nd(e, n) {
    switch ((Zo(n), n.tag)) {
      case 3:
        (Vn(gt), lt());
        break;
      case 26:
      case 27:
      case 5:
        xt(n);
        break;
      case 4:
        lt();
        break;
      case 13:
        Zn(n);
        break;
      case 19:
        re(yt);
        break;
      case 10:
        Vn(n.type);
        break;
      case 22:
      case 23:
        (Zn(n), ns(), e !== null && re(ql));
        break;
      case 24:
        Vn(gt);
    }
  }
  function Ra(e, n) {
    try {
      var r = n.updateQueue,
        u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        r = f;
        do {
          if ((r.tag & e) === e) {
            u = void 0;
            var d = r.create,
              b = r.inst;
            ((u = d()), (b.destroy = u));
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (S) {
      We(n, n.return, S);
    }
  }
  function fl(e, n, r) {
    try {
      var u = n.updateQueue,
        f = u !== null ? u.lastEffect : null;
      if (f !== null) {
        var d = f.next;
        u = d;
        do {
          if ((u.tag & e) === e) {
            var b = u.inst,
              S = b.destroy;
            if (S !== void 0) {
              ((b.destroy = void 0), (f = n));
              var T = r,
                H = S;
              try {
                H();
              } catch (X) {
                We(f, T, X);
              }
            }
          }
          u = u.next;
        } while (u !== d);
      }
    } catch (X) {
      We(n, n.return, X);
    }
  }
  function Ld(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        S0(n, r);
      } catch (u) {
        We(e, e.return, u);
      }
    }
  }
  function Hd(e, n, r) {
    ((r.props = Il(e.type, e.memoizedProps)), (r.state = e.memoizedState));
    try {
      r.componentWillUnmount();
    } catch (u) {
      We(e, n, u);
    }
  }
  function Ma(e, n) {
    try {
      var r = e.ref;
      if (r !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var u = e.stateNode;
            break;
          case 30:
            u = e.stateNode;
            break;
          default:
            u = e.stateNode;
        }
        typeof r == "function" ? (e.refCleanup = r(u)) : (r.current = u);
      }
    } catch (f) {
      We(e, n, f);
    }
  }
  function En(e, n) {
    var r = e.ref,
      u = e.refCleanup;
    if (r !== null)
      if (typeof u == "function")
        try {
          u();
        } catch (f) {
          We(e, n, f);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (f) {
          We(e, n, f);
        }
      else r.current = null;
  }
  function jd(e) {
    var n = e.type,
      r = e.memoizedProps,
      u = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && u.focus();
          break e;
        case "img":
          r.src ? (u.src = r.src) : r.srcSet && (u.srcset = r.srcSet);
      }
    } catch (f) {
      We(e, e.return, f);
    }
  }
  function Ms(e, n, r) {
    try {
      var u = e.stateNode;
      (wb(u, e.type, r, n), (u[Vt] = n));
    } catch (f) {
      We(e, e.return, f);
    }
  }
  function Ud(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && xl(e.type)) ||
      e.tag === 4
    );
  }
  function zs(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ud(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && xl(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ds(e, n, r) {
    var u = e.tag;
    if (u === 5 || u === 6)
      ((e = e.stateNode),
        n
          ? (r.nodeType === 9
              ? r.body
              : r.nodeName === "HTML"
                ? r.ownerDocument.body
                : r
            ).insertBefore(e, n)
          : ((n =
              r.nodeType === 9
                ? r.body
                : r.nodeName === "HTML"
                  ? r.ownerDocument.body
                  : r),
            n.appendChild(e),
            (r = r._reactRootContainer),
            r != null || n.onclick !== null || (n.onclick = bu)));
    else if (
      u !== 4 &&
      (u === 27 && xl(e.type) && ((r = e.stateNode), (n = null)),
      (e = e.child),
      e !== null)
    )
      for (Ds(e, n, r), e = e.sibling; e !== null; )
        (Ds(e, n, r), (e = e.sibling));
  }
  function uu(e, n, r) {
    var u = e.tag;
    if (u === 5 || u === 6)
      ((e = e.stateNode), n ? r.insertBefore(e, n) : r.appendChild(e));
    else if (
      u !== 4 &&
      (u === 27 && xl(e.type) && (r = e.stateNode), (e = e.child), e !== null)
    )
      for (uu(e, n, r), e = e.sibling; e !== null; )
        (uu(e, n, r), (e = e.sibling));
  }
  function Bd(e) {
    var n = e.stateNode,
      r = e.memoizedProps;
    try {
      for (var u = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      (Ct(n, u, r), (n[Mt] = e), (n[Vt] = r));
    } catch (d) {
      We(e, e.return, d);
    }
  }
  var Gn = !1,
    ct = !1,
    Os = !1,
    Vd = typeof WeakSet == "function" ? WeakSet : Set,
    wt = null;
  function lb(e, n) {
    if (((e = e.containerInfo), (lc = Au), (e = Kh(e)), zo(e))) {
      if ("selectionStart" in e)
        var r = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          r = ((r = e.ownerDocument) && r.defaultView) || window;
          var u = r.getSelection && r.getSelection();
          if (u && u.rangeCount !== 0) {
            r = u.anchorNode;
            var f = u.anchorOffset,
              d = u.focusNode;
            u = u.focusOffset;
            try {
              (r.nodeType, d.nodeType);
            } catch {
              r = null;
              break e;
            }
            var b = 0,
              S = -1,
              T = -1,
              H = 0,
              X = 0,
              P = e,
              j = null;
            t: for (;;) {
              for (
                var B;
                P !== r || (f !== 0 && P.nodeType !== 3) || (S = b + f),
                  P !== d || (u !== 0 && P.nodeType !== 3) || (T = b + u),
                  P.nodeType === 3 && (b += P.nodeValue.length),
                  (B = P.firstChild) !== null;

              )
                ((j = P), (P = B));
              for (;;) {
                if (P === e) break t;
                if (
                  (j === r && ++H === f && (S = b),
                  j === d && ++X === u && (T = b),
                  (B = P.nextSibling) !== null)
                )
                  break;
                ((P = j), (j = P.parentNode));
              }
              P = B;
            }
            r = S === -1 || T === -1 ? null : { start: S, end: T };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (
      rc = { focusedElem: e, selectionRange: r }, Au = !1, wt = n;
      wt !== null;

    )
      if (
        ((n = wt), (e = n.child), (n.subtreeFlags & 1024) !== 0 && e !== null)
      )
        ((e.return = n), (wt = e));
      else
        for (; wt !== null; ) {
          switch (((n = wt), (d = n.alternate), (e = n.flags), n.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                ((e = void 0),
                  (r = n),
                  (f = d.memoizedProps),
                  (d = d.memoizedState),
                  (u = r.stateNode));
                try {
                  var we = Il(r.type, f, r.elementType === r.type);
                  ((e = u.getSnapshotBeforeUpdate(we, d)),
                    (u.__reactInternalSnapshotBeforeUpdate = e));
                } catch (xe) {
                  We(r, r.return, xe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = n.stateNode.containerInfo), (r = e.nodeType), r === 9)
                )
                  uc(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      uc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(i(163));
          }
          if (((e = n.sibling), e !== null)) {
            ((e.return = n.return), (wt = e));
            break;
          }
          wt = n.return;
        }
  }
  function qd(e, n, r) {
    var u = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        (hl(e, r), u & 4 && Ra(5, r));
        break;
      case 1:
        if ((hl(e, r), u & 4))
          if (((e = r.stateNode), n === null))
            try {
              e.componentDidMount();
            } catch (b) {
              We(r, r.return, b);
            }
          else {
            var f = Il(r.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              e.componentDidUpdate(f, n, e.__reactInternalSnapshotBeforeUpdate);
            } catch (b) {
              We(r, r.return, b);
            }
          }
        (u & 64 && Ld(r), u & 512 && Ma(r, r.return));
        break;
      case 3:
        if ((hl(e, r), u & 64 && ((e = r.updateQueue), e !== null))) {
          if (((n = null), r.child !== null))
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            S0(e, n);
          } catch (b) {
            We(r, r.return, b);
          }
        }
        break;
      case 27:
        n === null && u & 4 && Bd(r);
      case 26:
      case 5:
        (hl(e, r), n === null && u & 4 && jd(r), u & 512 && Ma(r, r.return));
        break;
      case 12:
        hl(e, r);
        break;
      case 13:
        (hl(e, r),
          u & 4 && Yd(e, r),
          u & 64 &&
            ((e = r.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((r = hb.bind(null, r)), Mb(e, r)))));
        break;
      case 22:
        if (((u = r.memoizedState !== null || Gn), !u)) {
          ((n = (n !== null && n.memoizedState !== null) || ct), (f = Gn));
          var d = ct;
          ((Gn = u),
            (ct = n) && !d ? dl(e, r, (r.subtreeFlags & 8772) !== 0) : hl(e, r),
            (Gn = f),
            (ct = d));
        }
        break;
      case 30:
        break;
      default:
        hl(e, r);
    }
  }
  function Zd(e) {
    var n = e.alternate;
    (n !== null && ((e.alternate = null), Zd(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((n = e.stateNode), n !== null && fo(n)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var rt = null,
    It = !1;
  function Fn(e, n, r) {
    for (r = r.child; r !== null; ) (Id(e, n, r), (r = r.sibling));
  }
  function Id(e, n, r) {
    if (W && typeof W.onCommitFiberUnmount == "function")
      try {
        W.onCommitFiberUnmount(I, r);
      } catch {}
    switch (r.tag) {
      case 26:
        (ct || En(r, n),
          Fn(e, n, r),
          r.memoizedState
            ? r.memoizedState.count--
            : r.stateNode && ((r = r.stateNode), r.parentNode.removeChild(r)));
        break;
      case 27:
        ct || En(r, n);
        var u = rt,
          f = It;
        (xl(r.type) && ((rt = r.stateNode), (It = !1)),
          Fn(e, n, r),
          Ba(r.stateNode),
          (rt = u),
          (It = f));
        break;
      case 5:
        ct || En(r, n);
      case 6:
        if (
          ((u = rt),
          (f = It),
          (rt = null),
          Fn(e, n, r),
          (rt = u),
          (It = f),
          rt !== null)
        )
          if (It)
            try {
              (rt.nodeType === 9
                ? rt.body
                : rt.nodeName === "HTML"
                  ? rt.ownerDocument.body
                  : rt
              ).removeChild(r.stateNode);
            } catch (d) {
              We(r, n, d);
            }
          else
            try {
              rt.removeChild(r.stateNode);
            } catch (d) {
              We(r, n, d);
            }
        break;
      case 18:
        rt !== null &&
          (It
            ? ((e = rt),
              zp(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                r.stateNode
              ),
              Qa(e))
            : zp(rt, r.stateNode));
        break;
      case 4:
        ((u = rt),
          (f = It),
          (rt = r.stateNode.containerInfo),
          (It = !0),
          Fn(e, n, r),
          (rt = u),
          (It = f));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ct || fl(2, r, n), ct || fl(4, r, n), Fn(e, n, r));
        break;
      case 1:
        (ct ||
          (En(r, n),
          (u = r.stateNode),
          typeof u.componentWillUnmount == "function" && Hd(r, n, u)),
          Fn(e, n, r));
        break;
      case 21:
        Fn(e, n, r);
        break;
      case 22:
        ((ct = (u = ct) || r.memoizedState !== null), Fn(e, n, r), (ct = u));
        break;
      default:
        Fn(e, n, r);
    }
  }
  function Yd(e, n) {
    if (
      n.memoizedState === null &&
      ((e = n.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Qa(e);
      } catch (r) {
        We(n, n.return, r);
      }
  }
  function rb(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var n = e.stateNode;
        return (n === null && (n = e.stateNode = new Vd()), n);
      case 22:
        return (
          (e = e.stateNode),
          (n = e._retryCache),
          n === null && (n = e._retryCache = new Vd()),
          n
        );
      default:
        throw Error(i(435, e.tag));
    }
  }
  function Ns(e, n) {
    var r = rb(e);
    n.forEach(function (u) {
      var f = db.bind(null, e, u);
      r.has(u) || (r.add(u), u.then(f, f));
    });
  }
  function Pt(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var u = 0; u < r.length; u++) {
        var f = r[u],
          d = e,
          b = n,
          S = b;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (xl(S.type)) {
                ((rt = S.stateNode), (It = !1));
                break e;
              }
              break;
            case 5:
              ((rt = S.stateNode), (It = !1));
              break e;
            case 3:
            case 4:
              ((rt = S.stateNode.containerInfo), (It = !0));
              break e;
          }
          S = S.return;
        }
        if (rt === null) throw Error(i(160));
        (Id(d, b, f),
          (rt = null),
          (It = !1),
          (d = f.alternate),
          d !== null && (d.return = null),
          (f.return = null));
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; ) (Gd(n, e), (n = n.sibling));
  }
  var bn = null;
  function Gd(e, n) {
    var r = e.alternate,
      u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pt(n, e),
          Kt(e),
          u & 4 && (fl(3, e, e.return), Ra(3, e), fl(5, e, e.return)));
        break;
      case 1:
        (Pt(n, e),
          Kt(e),
          u & 512 && (ct || r === null || En(r, r.return)),
          u & 64 &&
            Gn &&
            ((e = e.updateQueue),
            e !== null &&
              ((u = e.callbacks),
              u !== null &&
                ((r = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = r === null ? u : r.concat(u))))));
        break;
      case 26:
        var f = bn;
        if (
          (Pt(n, e),
          Kt(e),
          u & 512 && (ct || r === null || En(r, r.return)),
          u & 4)
        ) {
          var d = r !== null ? r.memoizedState : null;
          if (((u = e.memoizedState), r === null))
            if (u === null)
              if (e.stateNode === null) {
                e: {
                  ((u = e.type),
                    (r = e.memoizedProps),
                    (f = f.ownerDocument || f));
                  t: switch (u) {
                    case "title":
                      ((d = f.getElementsByTagName("title")[0]),
                        (!d ||
                          d[ea] ||
                          d[Mt] ||
                          d.namespaceURI === "http://www.w3.org/2000/svg" ||
                          d.hasAttribute("itemprop")) &&
                          ((d = f.createElement(u)),
                          f.head.insertBefore(
                            d,
                            f.querySelector("head > title")
                          )),
                        Ct(d, u, r),
                        (d[Mt] = e),
                        kt(d),
                        (u = d));
                      break e;
                    case "link":
                      var b = Bp("link", "href", f).get(u + (r.href || ""));
                      if (b) {
                        for (var S = 0; S < b.length; S++)
                          if (
                            ((d = b[S]),
                            d.getAttribute("href") ===
                              (r.href == null || r.href === ""
                                ? null
                                : r.href) &&
                              d.getAttribute("rel") ===
                                (r.rel == null ? null : r.rel) &&
                              d.getAttribute("title") ===
                                (r.title == null ? null : r.title) &&
                              d.getAttribute("crossorigin") ===
                                (r.crossOrigin == null ? null : r.crossOrigin))
                          ) {
                            b.splice(S, 1);
                            break t;
                          }
                      }
                      ((d = f.createElement(u)),
                        Ct(d, u, r),
                        f.head.appendChild(d));
                      break;
                    case "meta":
                      if (
                        (b = Bp("meta", "content", f).get(
                          u + (r.content || "")
                        ))
                      ) {
                        for (S = 0; S < b.length; S++)
                          if (
                            ((d = b[S]),
                            d.getAttribute("content") ===
                              (r.content == null ? null : "" + r.content) &&
                              d.getAttribute("name") ===
                                (r.name == null ? null : r.name) &&
                              d.getAttribute("property") ===
                                (r.property == null ? null : r.property) &&
                              d.getAttribute("http-equiv") ===
                                (r.httpEquiv == null ? null : r.httpEquiv) &&
                              d.getAttribute("charset") ===
                                (r.charSet == null ? null : r.charSet))
                          ) {
                            b.splice(S, 1);
                            break t;
                          }
                      }
                      ((d = f.createElement(u)),
                        Ct(d, u, r),
                        f.head.appendChild(d));
                      break;
                    default:
                      throw Error(i(468, u));
                  }
                  ((d[Mt] = e), kt(d), (u = d));
                }
                e.stateNode = u;
              } else Vp(f, e.type, e.stateNode);
            else e.stateNode = Up(f, u, e.memoizedProps);
          else
            d !== u
              ? (d === null
                  ? r.stateNode !== null &&
                    ((r = r.stateNode), r.parentNode.removeChild(r))
                  : d.count--,
                u === null
                  ? Vp(f, e.type, e.stateNode)
                  : Up(f, u, e.memoizedProps))
              : u === null &&
                e.stateNode !== null &&
                Ms(e, e.memoizedProps, r.memoizedProps);
        }
        break;
      case 27:
        (Pt(n, e),
          Kt(e),
          u & 512 && (ct || r === null || En(r, r.return)),
          r !== null && u & 4 && Ms(e, e.memoizedProps, r.memoizedProps));
        break;
      case 5:
        if (
          (Pt(n, e),
          Kt(e),
          u & 512 && (ct || r === null || En(r, r.return)),
          e.flags & 32)
        ) {
          f = e.stateNode;
          try {
            sr(f, "");
          } catch (B) {
            We(e, e.return, B);
          }
        }
        (u & 4 &&
          e.stateNode != null &&
          ((f = e.memoizedProps), Ms(e, f, r !== null ? r.memoizedProps : f)),
          u & 1024 && (Os = !0));
        break;
      case 6:
        if ((Pt(n, e), Kt(e), u & 4)) {
          if (e.stateNode === null) throw Error(i(162));
          ((u = e.memoizedProps), (r = e.stateNode));
          try {
            r.nodeValue = u;
          } catch (B) {
            We(e, e.return, B);
          }
        }
        break;
      case 3:
        if (
          ((Su = null),
          (f = bn),
          (bn = vu(n.containerInfo)),
          Pt(n, e),
          (bn = f),
          Kt(e),
          u & 4 && r !== null && r.memoizedState.isDehydrated)
        )
          try {
            Qa(n.containerInfo);
          } catch (B) {
            We(e, e.return, B);
          }
        Os && ((Os = !1), Fd(e));
        break;
      case 4:
        ((u = bn),
          (bn = vu(e.stateNode.containerInfo)),
          Pt(n, e),
          Kt(e),
          (bn = u));
        break;
      case 12:
        (Pt(n, e), Kt(e));
        break;
      case 13:
        (Pt(n, e),
          Kt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (r !== null && r.memoizedState !== null) &&
            (Vs = Ie()),
          u & 4 &&
            ((u = e.updateQueue),
            u !== null && ((e.updateQueue = null), Ns(e, u))));
        break;
      case 22:
        f = e.memoizedState !== null;
        var T = r !== null && r.memoizedState !== null,
          H = Gn,
          X = ct;
        if (
          ((Gn = H || f),
          (ct = X || T),
          Pt(n, e),
          (ct = X),
          (Gn = H),
          Kt(e),
          u & 8192)
        )
          e: for (
            n = e.stateNode,
              n._visibility = f ? n._visibility & -2 : n._visibility | 1,
              f && (r === null || T || Gn || ct || Yl(e)),
              r = null,
              n = e;
            ;

          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                T = r = n;
                try {
                  if (((d = T.stateNode), f))
                    ((b = d.style),
                      typeof b.setProperty == "function"
                        ? b.setProperty("display", "none", "important")
                        : (b.display = "none"));
                  else {
                    S = T.stateNode;
                    var P = T.memoizedProps.style,
                      j =
                        P != null && P.hasOwnProperty("display")
                          ? P.display
                          : null;
                    S.style.display =
                      j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (B) {
                  We(T, T.return, B);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                T = n;
                try {
                  T.stateNode.nodeValue = f ? "" : T.memoizedProps;
                } catch (B) {
                  We(T, T.return, B);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) ||
                n.memoizedState === null ||
                n === e) &&
              n.child !== null
            ) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              (r === n && (r = null), (n = n.return));
            }
            (r === n && (r = null),
              (n.sibling.return = n.return),
              (n = n.sibling));
          }
        u & 4 &&
          ((u = e.updateQueue),
          u !== null &&
            ((r = u.retryQueue),
            r !== null && ((u.retryQueue = null), Ns(e, r))));
        break;
      case 19:
        (Pt(n, e),
          Kt(e),
          u & 4 &&
            ((u = e.updateQueue),
            u !== null && ((e.updateQueue = null), Ns(e, u))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Pt(n, e), Kt(e));
    }
  }
  function Kt(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, u = e.return; u !== null; ) {
          if (Ud(u)) {
            r = u;
            break;
          }
          u = u.return;
        }
        if (r == null) throw Error(i(160));
        switch (r.tag) {
          case 27:
            var f = r.stateNode,
              d = zs(e);
            uu(e, d, f);
            break;
          case 5:
            var b = r.stateNode;
            r.flags & 32 && (sr(b, ""), (r.flags &= -33));
            var S = zs(e);
            uu(e, S, b);
            break;
          case 3:
          case 4:
            var T = r.stateNode.containerInfo,
              H = zs(e);
            Ds(e, H, T);
            break;
          default:
            throw Error(i(161));
        }
      } catch (X) {
        We(e, e.return, X);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Fd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        (Fd(n),
          n.tag === 5 && n.flags & 1024 && n.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function hl(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; ) (qd(e, n.alternate, n), (n = n.sibling));
  }
  function Yl(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (fl(4, n, n.return), Yl(n));
          break;
        case 1:
          En(n, n.return);
          var r = n.stateNode;
          (typeof r.componentWillUnmount == "function" && Hd(n, n.return, r),
            Yl(n));
          break;
        case 27:
          Ba(n.stateNode);
        case 26:
        case 5:
          (En(n, n.return), Yl(n));
          break;
        case 22:
          n.memoizedState === null && Yl(n);
          break;
        case 30:
          Yl(n);
          break;
        default:
          Yl(n);
      }
      e = e.sibling;
    }
  }
  function dl(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var u = n.alternate,
        f = e,
        d = n,
        b = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (dl(f, d, r), Ra(4, d));
          break;
        case 1:
          if (
            (dl(f, d, r),
            (u = d),
            (f = u.stateNode),
            typeof f.componentDidMount == "function")
          )
            try {
              f.componentDidMount();
            } catch (H) {
              We(u, u.return, H);
            }
          if (((u = d), (f = u.updateQueue), f !== null)) {
            var S = u.stateNode;
            try {
              var T = f.shared.hiddenCallbacks;
              if (T !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < T.length; f++)
                  k0(T[f], S);
            } catch (H) {
              We(u, u.return, H);
            }
          }
          (r && b & 64 && Ld(d), Ma(d, d.return));
          break;
        case 27:
          Bd(d);
        case 26:
        case 5:
          (dl(f, d, r), r && u === null && b & 4 && jd(d), Ma(d, d.return));
          break;
        case 12:
          dl(f, d, r);
          break;
        case 13:
          (dl(f, d, r), r && b & 4 && Yd(f, d));
          break;
        case 22:
          (d.memoizedState === null && dl(f, d, r), Ma(d, d.return));
          break;
        case 30:
          break;
        default:
          dl(f, d, r);
      }
      n = n.sibling;
    }
  }
  function Ls(e, n) {
    var r = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (r = e.memoizedState.cachePool.pool),
      (e = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (e = n.memoizedState.cachePool.pool),
      e !== r && (e != null && e.refCount++, r != null && ma(r)));
  }
  function Hs(e, n) {
    ((e = null),
      n.alternate !== null && (e = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== e && (n.refCount++, e != null && ma(e)));
  }
  function An(e, n, r, u) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) (Qd(e, n, r, u), (n = n.sibling));
  }
  function Qd(e, n, r, u) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (An(e, n, r, u), f & 2048 && Ra(9, n));
        break;
      case 1:
        An(e, n, r, u);
        break;
      case 3:
        (An(e, n, r, u),
          f & 2048 &&
            ((e = null),
            n.alternate !== null && (e = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== e && (n.refCount++, e != null && ma(e))));
        break;
      case 12:
        if (f & 2048) {
          (An(e, n, r, u), (e = n.stateNode));
          try {
            var d = n.memoizedProps,
              b = d.id,
              S = d.onPostCommit;
            typeof S == "function" &&
              S(
                b,
                n.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (T) {
            We(n, n.return, T);
          }
        } else An(e, n, r, u);
        break;
      case 13:
        An(e, n, r, u);
        break;
      case 23:
        break;
      case 22:
        ((d = n.stateNode),
          (b = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? An(e, n, r, u)
              : za(e, n)
            : d._visibility & 2
              ? An(e, n, r, u)
              : ((d._visibility |= 2),
                Cr(e, n, r, u, (n.subtreeFlags & 10256) !== 0)),
          f & 2048 && Ls(b, n));
        break;
      case 24:
        (An(e, n, r, u), f & 2048 && Hs(n.alternate, n));
        break;
      default:
        An(e, n, r, u);
    }
  }
  function Cr(e, n, r, u, f) {
    for (f = f && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var d = e,
        b = n,
        S = r,
        T = u,
        H = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          (Cr(d, b, S, T, f), Ra(8, b));
          break;
        case 23:
          break;
        case 22:
          var X = b.stateNode;
          (b.memoizedState !== null
            ? X._visibility & 2
              ? Cr(d, b, S, T, f)
              : za(d, b)
            : ((X._visibility |= 2), Cr(d, b, S, T, f)),
            f && H & 2048 && Ls(b.alternate, b));
          break;
        case 24:
          (Cr(d, b, S, T, f), f && H & 2048 && Hs(b.alternate, b));
          break;
        default:
          Cr(d, b, S, T, f);
      }
      n = n.sibling;
    }
  }
  function za(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e,
          u = n,
          f = u.flags;
        switch (u.tag) {
          case 22:
            (za(r, u), f & 2048 && Ls(u.alternate, u));
            break;
          case 24:
            (za(r, u), f & 2048 && Hs(u.alternate, u));
            break;
          default:
            za(r, u);
        }
        n = n.sibling;
      }
  }
  var Da = 8192;
  function Rr(e) {
    if (e.subtreeFlags & Da)
      for (e = e.child; e !== null; ) (Xd(e), (e = e.sibling));
  }
  function Xd(e) {
    switch (e.tag) {
      case 26:
        (Rr(e),
          e.flags & Da &&
            e.memoizedState !== null &&
            Ib(bn, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Rr(e);
        break;
      case 3:
      case 4:
        var n = bn;
        ((bn = vu(e.stateNode.containerInfo)), Rr(e), (bn = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Da), (Da = 16777216), Rr(e), (Da = n))
            : Rr(e));
        break;
      default:
        Rr(e);
    }
  }
  function $d(e) {
    var n = e.alternate;
    if (n !== null && ((e = n.child), e !== null)) {
      n.child = null;
      do ((n = e.sibling), (e.sibling = null), (e = n));
      while (e !== null);
    }
  }
  function Oa(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var u = n[r];
          ((wt = u), Kd(u, e));
        }
      $d(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Pd(e), (e = e.sibling));
  }
  function Pd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Oa(e), e.flags & 2048 && fl(9, e, e.return));
        break;
      case 3:
        Oa(e);
        break;
      case 12:
        Oa(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null &&
        n._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((n._visibility &= -3), ou(e))
          : Oa(e);
        break;
      default:
        Oa(e);
    }
  }
  function ou(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var u = n[r];
          ((wt = u), Kd(u, e));
        }
      $d(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((n = e), n.tag)) {
        case 0:
        case 11:
        case 15:
          (fl(8, n, n.return), ou(n));
          break;
        case 22:
          ((r = n.stateNode),
            r._visibility & 2 && ((r._visibility &= -3), ou(n)));
          break;
        default:
          ou(n);
      }
      e = e.sibling;
    }
  }
  function Kd(e, n) {
    for (; wt !== null; ) {
      var r = wt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          fl(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var u = r.memoizedState.cachePool.pool;
            u != null && u.refCount++;
          }
          break;
        case 24:
          ma(r.memoizedState.cache);
      }
      if (((u = r.child), u !== null)) ((u.return = r), (wt = u));
      else
        e: for (r = e; wt !== null; ) {
          u = wt;
          var f = u.sibling,
            d = u.return;
          if ((Zd(u), u === r)) {
            wt = null;
            break e;
          }
          if (f !== null) {
            ((f.return = d), (wt = f));
            break e;
          }
          wt = d;
        }
    }
  }
  var ab = {
      getCacheForType: function (e) {
        var n = zt(gt),
          r = n.data.get(e);
        return (r === void 0 && ((r = e()), n.data.set(e, r)), r);
      },
    },
    ib = typeof WeakMap == "function" ? WeakMap : Map,
    Qe = 0,
    tt = null,
    Ne = null,
    je = 0,
    Xe = 0,
    Jt = null,
    pl = !1,
    Mr = !1,
    js = !1,
    Qn = 0,
    ot = 0,
    ml = 0,
    Gl = 0,
    Us = 0,
    dn = 0,
    zr = 0,
    Na = null,
    Yt = null,
    Bs = !1,
    Vs = 0,
    su = 1 / 0,
    cu = null,
    gl = null,
    Tt = 0,
    yl = null,
    Dr = null,
    Or = 0,
    qs = 0,
    Zs = null,
    Jd = null,
    La = 0,
    Is = null;
  function Wt() {
    if ((Qe & 2) !== 0 && je !== 0) return je & -je;
    if (L.T !== null) {
      var e = vr;
      return e !== 0 ? e : Ps();
    }
    return ph();
  }
  function Wd() {
    dn === 0 && (dn = (je & 536870912) === 0 || Ze ? ch() : 536870912);
    var e = hn.current;
    return (e !== null && (e.flags |= 32), dn);
  }
  function en(e, n, r) {
    (((e === tt && (Xe === 2 || Xe === 9)) || e.cancelPendingCommit !== null) &&
      (Nr(e, 0), bl(e, je, dn, !1)),
      Wr(e, r),
      ((Qe & 2) === 0 || e !== tt) &&
        (e === tt &&
          ((Qe & 2) === 0 && (Gl |= r), ot === 4 && bl(e, je, dn, !1)),
        _n(e)));
  }
  function ep(e, n, r) {
    if ((Qe & 6) !== 0) throw Error(i(327));
    var u = (!r && (n & 124) === 0 && (n & e.expiredLanes) === 0) || rn(e, n),
      f = u ? sb(e, n) : Fs(e, n, !0),
      d = u;
    do {
      if (f === 0) {
        Mr && !u && bl(e, n, 0, !1);
        break;
      } else {
        if (((r = e.current.alternate), d && !ub(r))) {
          ((f = Fs(e, n, !1)), (d = !1));
          continue;
        }
        if (f === 2) {
          if (((d = n), e.errorRecoveryDisabledLanes & d)) var b = 0;
          else
            ((b = e.pendingLanes & -536870913),
              (b = b !== 0 ? b : b & 536870912 ? 536870912 : 0));
          if (b !== 0) {
            n = b;
            e: {
              var S = e;
              f = Na;
              var T = S.current.memoizedState.isDehydrated;
              if ((T && (Nr(S, b).flags |= 256), (b = Fs(S, b, !1)), b !== 2)) {
                if (js && !T) {
                  ((S.errorRecoveryDisabledLanes |= d), (Gl |= d), (f = 4));
                  break e;
                }
                ((d = Yt),
                  (Yt = f),
                  d !== null &&
                    (Yt === null ? (Yt = d) : Yt.push.apply(Yt, d)));
              }
              f = b;
            }
            if (((d = !1), f !== 2)) continue;
          }
        }
        if (f === 1) {
          (Nr(e, 0), bl(e, n, 0, !0));
          break;
        }
        e: {
          switch (((u = e), (d = f), d)) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              bl(u, n, dn, !pl);
              break e;
            case 2:
              Yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && ((f = Vs + 300 - Ie()), 10 < f)) {
            if ((bl(u, n, dn, !pl), vt(u, 0, !0) !== 0)) break e;
            u.timeoutHandle = Rp(
              tp.bind(null, u, r, Yt, cu, Bs, n, dn, Gl, zr, pl, d, 2, -0, 0),
              f
            );
            break e;
          }
          tp(u, r, Yt, cu, Bs, n, dn, Gl, zr, pl, d, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    _n(e);
  }
  function tp(e, n, r, u, f, d, b, S, T, H, X, P, j, B) {
    if (
      ((e.timeoutHandle = -1),
      (P = n.subtreeFlags),
      (P & 8192 || (P & 16785408) === 16785408) &&
        ((Za = { stylesheets: null, count: 0, unsuspend: Zb }),
        Xd(n),
        (P = Yb()),
        P !== null))
    ) {
      ((e.cancelPendingCommit = P(
        op.bind(null, e, n, d, r, u, f, b, S, T, X, 1, j, B)
      )),
        bl(e, d, b, !H));
      return;
    }
    op(e, n, d, r, u, f, b, S, T);
  }
  function ub(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if (
        (r === 0 || r === 11 || r === 15) &&
        n.flags & 16384 &&
        ((r = n.updateQueue), r !== null && ((r = r.stores), r !== null))
      )
        for (var u = 0; u < r.length; u++) {
          var f = r[u],
            d = f.getSnapshot;
          f = f.value;
          try {
            if (!Xt(d(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (((r = n.child), n.subtreeFlags & 16384 && r !== null))
        ((r.return = n), (n = r));
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function bl(e, n, r, u) {
    ((n &= ~Us),
      (n &= ~Gl),
      (e.suspendedLanes |= n),
      (e.pingedLanes &= ~n),
      u && (e.warmLanes |= n),
      (u = e.expirationTimes));
    for (var f = n; 0 < f; ) {
      var d = 31 - me(f),
        b = 1 << d;
      ((u[d] = -1), (f &= ~b));
    }
    r !== 0 && hh(e, r, n);
  }
  function fu() {
    return (Qe & 6) === 0 ? (Ha(0), !1) : !0;
  }
  function Ys() {
    if (Ne !== null) {
      if (Xe === 0) var e = Ne.return;
      else ((e = Ne), (Bn = Bl = null), us(e), (_r = null), (_a = 0), (e = Ne));
      for (; e !== null; ) (Nd(e.alternate, e), (e = e.return));
      Ne = null;
    }
  }
  function Nr(e, n) {
    var r = e.timeoutHandle;
    (r !== -1 && ((e.timeoutHandle = -1), Ab(r)),
      (r = e.cancelPendingCommit),
      r !== null && ((e.cancelPendingCommit = null), r()),
      Ys(),
      (tt = e),
      (Ne = r = Hn(e.current, null)),
      (je = n),
      (Xe = 0),
      (Jt = null),
      (pl = !1),
      (Mr = rn(e, n)),
      (js = !1),
      (zr = dn = Us = Gl = ml = ot = 0),
      (Yt = Na = null),
      (Bs = !1),
      (n & 8) !== 0 && (n |= n & 32));
    var u = e.entangledLanes;
    if (u !== 0)
      for (e = e.entanglements, u &= n; 0 < u; ) {
        var f = 31 - me(u),
          d = 1 << f;
        ((n |= e[f]), (u &= ~d));
      }
    return ((Qn = n), Oi(), r);
  }
  function np(e, n) {
    ((Me = null),
      (L.H = Ji),
      n === ya || n === Zi
        ? ((n = x0()), (Xe = 3))
        : n === g0
          ? ((n = x0()), (Xe = 4))
          : (Xe =
              n === vd
                ? 8
                : n !== null &&
                    typeof n == "object" &&
                    typeof n.then == "function"
                  ? 6
                  : 1),
      (Jt = n),
      Ne === null && ((ot = 1), lu(e, on(n, e.current))));
  }
  function lp() {
    var e = L.H;
    return ((L.H = Ji), e === null ? Ji : e);
  }
  function rp() {
    var e = L.A;
    return ((L.A = ab), e);
  }
  function Gs() {
    ((ot = 4),
      pl || ((je & 4194048) !== je && hn.current !== null) || (Mr = !0),
      ((ml & 134217727) === 0 && (Gl & 134217727) === 0) ||
        tt === null ||
        bl(tt, je, dn, !1));
  }
  function Fs(e, n, r) {
    var u = Qe;
    Qe |= 2;
    var f = lp(),
      d = rp();
    ((tt !== e || je !== n) && ((cu = null), Nr(e, n)), (n = !1));
    var b = ot;
    e: do
      try {
        if (Xe !== 0 && Ne !== null) {
          var S = Ne,
            T = Jt;
          switch (Xe) {
            case 8:
              (Ys(), (b = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              hn.current === null && (n = !0);
              var H = Xe;
              if (((Xe = 0), (Jt = null), Lr(e, S, T, H), r && Mr)) {
                b = 0;
                break e;
              }
              break;
            default:
              ((H = Xe), (Xe = 0), (Jt = null), Lr(e, S, T, H));
          }
        }
        (ob(), (b = ot));
        break;
      } catch (X) {
        np(e, X);
      }
    while (!0);
    return (
      n && e.shellSuspendCounter++,
      (Bn = Bl = null),
      (Qe = u),
      (L.H = f),
      (L.A = d),
      Ne === null && ((tt = null), (je = 0), Oi()),
      b
    );
  }
  function ob() {
    for (; Ne !== null; ) ap(Ne);
  }
  function sb(e, n) {
    var r = Qe;
    Qe |= 2;
    var u = lp(),
      f = rp();
    tt !== e || je !== n
      ? ((cu = null), (su = Ie() + 500), Nr(e, n))
      : (Mr = rn(e, n));
    e: do
      try {
        if (Xe !== 0 && Ne !== null) {
          n = Ne;
          var d = Jt;
          t: switch (Xe) {
            case 1:
              ((Xe = 0), (Jt = null), Lr(e, n, d, 1));
              break;
            case 2:
            case 9:
              if (y0(d)) {
                ((Xe = 0), (Jt = null), ip(n));
                break;
              }
              ((n = function () {
                ((Xe !== 2 && Xe !== 9) || tt !== e || (Xe = 7), _n(e));
              }),
                d.then(n, n));
              break e;
            case 3:
              Xe = 7;
              break e;
            case 4:
              Xe = 5;
              break e;
            case 7:
              y0(d)
                ? ((Xe = 0), (Jt = null), ip(n))
                : ((Xe = 0), (Jt = null), Lr(e, n, d, 7));
              break;
            case 5:
              var b = null;
              switch (Ne.tag) {
                case 26:
                  b = Ne.memoizedState;
                case 5:
                case 27:
                  var S = Ne;
                  if (!b || qp(b)) {
                    ((Xe = 0), (Jt = null));
                    var T = S.sibling;
                    if (T !== null) Ne = T;
                    else {
                      var H = S.return;
                      H !== null ? ((Ne = H), hu(H)) : (Ne = null);
                    }
                    break t;
                  }
              }
              ((Xe = 0), (Jt = null), Lr(e, n, d, 5));
              break;
            case 6:
              ((Xe = 0), (Jt = null), Lr(e, n, d, 6));
              break;
            case 8:
              (Ys(), (ot = 6));
              break e;
            default:
              throw Error(i(462));
          }
        }
        cb();
        break;
      } catch (X) {
        np(e, X);
      }
    while (!0);
    return (
      (Bn = Bl = null),
      (L.H = u),
      (L.A = f),
      (Qe = r),
      Ne !== null ? 0 : ((tt = null), (je = 0), Oi(), ot)
    );
  }
  function cb() {
    for (; Ne !== null && !Oe(); ) ap(Ne);
  }
  function ap(e) {
    var n = Dd(e.alternate, e, Qn);
    ((e.memoizedProps = e.pendingProps), n === null ? hu(e) : (Ne = n));
  }
  function ip(e) {
    var n = e,
      r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = _d(r, n, n.pendingProps, n.type, void 0, je);
        break;
      case 11:
        n = _d(r, n, n.pendingProps, n.type.render, n.ref, je);
        break;
      case 5:
        us(n);
      default:
        (Nd(r, n), (n = Ne = u0(n, Qn)), (n = Dd(r, n, Qn)));
    }
    ((e.memoizedProps = e.pendingProps), n === null ? hu(e) : (Ne = n));
  }
  function Lr(e, n, r, u) {
    ((Bn = Bl = null), us(n), (_r = null), (_a = 0));
    var f = n.return;
    try {
      if (W2(e, f, n, r, je)) {
        ((ot = 1), lu(e, on(r, e.current)), (Ne = null));
        return;
      }
    } catch (d) {
      if (f !== null) throw ((Ne = f), d);
      ((ot = 1), lu(e, on(r, e.current)), (Ne = null));
      return;
    }
    n.flags & 32768
      ? (Ze || u === 1
          ? (e = !0)
          : Mr || (je & 536870912) !== 0
            ? (e = !1)
            : ((pl = e = !0),
              (u === 2 || u === 9 || u === 3 || u === 6) &&
                ((u = hn.current),
                u !== null && u.tag === 13 && (u.flags |= 16384))),
        up(n, e))
      : hu(n);
  }
  function hu(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        up(n, pl);
        return;
      }
      e = n.return;
      var r = tb(n.alternate, n, Qn);
      if (r !== null) {
        Ne = r;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        Ne = n;
        return;
      }
      Ne = n = e;
    } while (n !== null);
    ot === 0 && (ot = 5);
  }
  function up(e, n) {
    do {
      var r = nb(e.alternate, e);
      if (r !== null) {
        ((r.flags &= 32767), (Ne = r));
        return;
      }
      if (
        ((r = e.return),
        r !== null &&
          ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null)),
        !n && ((e = e.sibling), e !== null))
      ) {
        Ne = e;
        return;
      }
      Ne = e = r;
    } while (e !== null);
    ((ot = 6), (Ne = null));
  }
  function op(e, n, r, u, f, d, b, S, T) {
    e.cancelPendingCommit = null;
    do du();
    while (Tt !== 0);
    if ((Qe & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (
        ((d = n.lanes | n.childLanes),
        (d |= Ho),
        Zy(e, r, d, b, S, T),
        e === tt && ((Ne = tt = null), (je = 0)),
        (Dr = n),
        (yl = e),
        (Or = r),
        (qs = d),
        (Zs = f),
        (Jd = u),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            pb(ft, function () {
              return (dp(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (u = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || u)
      ) {
        ((u = L.T), (L.T = null), (f = J.p), (J.p = 2), (b = Qe), (Qe |= 4));
        try {
          lb(e, n, r);
        } finally {
          ((Qe = b), (J.p = f), (L.T = u));
        }
      }
      ((Tt = 1), sp(), cp(), fp());
    }
  }
  function sp() {
    if (Tt === 1) {
      Tt = 0;
      var e = yl,
        n = Dr,
        r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        ((r = L.T), (L.T = null));
        var u = J.p;
        J.p = 2;
        var f = Qe;
        Qe |= 4;
        try {
          Gd(n, e);
          var d = rc,
            b = Kh(e.containerInfo),
            S = d.focusedElem,
            T = d.selectionRange;
          if (
            b !== S &&
            S &&
            S.ownerDocument &&
            Ph(S.ownerDocument.documentElement, S)
          ) {
            if (T !== null && zo(S)) {
              var H = T.start,
                X = T.end;
              if ((X === void 0 && (X = H), "selectionStart" in S))
                ((S.selectionStart = H),
                  (S.selectionEnd = Math.min(X, S.value.length)));
              else {
                var P = S.ownerDocument || document,
                  j = (P && P.defaultView) || window;
                if (j.getSelection) {
                  var B = j.getSelection(),
                    we = S.textContent.length,
                    xe = Math.min(T.start, we),
                    Je = T.end === void 0 ? xe : Math.min(T.end, we);
                  !B.extend && xe > Je && ((b = Je), (Je = xe), (xe = b));
                  var D = $h(S, xe),
                    M = $h(S, Je);
                  if (
                    D &&
                    M &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== D.node ||
                      B.anchorOffset !== D.offset ||
                      B.focusNode !== M.node ||
                      B.focusOffset !== M.offset)
                  ) {
                    var N = P.createRange();
                    (N.setStart(D.node, D.offset),
                      B.removeAllRanges(),
                      xe > Je
                        ? (B.addRange(N), B.extend(M.node, M.offset))
                        : (N.setEnd(M.node, M.offset), B.addRange(N)));
                  }
                }
              }
            }
            for (P = [], B = S; (B = B.parentNode); )
              B.nodeType === 1 &&
                P.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (
              typeof S.focus == "function" && S.focus(), S = 0;
              S < P.length;
              S++
            ) {
              var $ = P[S];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Au = !!lc), (rc = lc = null));
        } finally {
          ((Qe = f), (J.p = u), (L.T = r));
        }
      }
      ((e.current = n), (Tt = 2));
    }
  }
  function cp() {
    if (Tt === 2) {
      Tt = 0;
      var e = yl,
        n = Dr,
        r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        ((r = L.T), (L.T = null));
        var u = J.p;
        J.p = 2;
        var f = Qe;
        Qe |= 4;
        try {
          qd(e, n.alternate, n);
        } finally {
          ((Qe = f), (J.p = u), (L.T = r));
        }
      }
      Tt = 3;
    }
  }
  function fp() {
    if (Tt === 4 || Tt === 3) {
      ((Tt = 0), _e());
      var e = yl,
        n = Dr,
        r = Or,
        u = Jd;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (Tt = 5)
        : ((Tt = 0), (Dr = yl = null), hp(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (
        (f === 0 && (gl = null),
        so(r),
        (n = n.stateNode),
        W && typeof W.onCommitFiberRoot == "function")
      )
        try {
          W.onCommitFiberRoot(I, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (u !== null) {
        ((n = L.T), (f = J.p), (J.p = 2), (L.T = null));
        try {
          for (var d = e.onRecoverableError, b = 0; b < u.length; b++) {
            var S = u[b];
            d(S.value, { componentStack: S.stack });
          }
        } finally {
          ((L.T = n), (J.p = f));
        }
      }
      ((Or & 3) !== 0 && du(),
        _n(e),
        (f = e.pendingLanes),
        (r & 4194090) !== 0 && (f & 42) !== 0
          ? e === Is
            ? La++
            : ((La = 0), (Is = e))
          : (La = 0),
        Ha(0));
    }
  }
  function hp(e, n) {
    (e.pooledCacheLanes &= n) === 0 &&
      ((n = e.pooledCache), n != null && ((e.pooledCache = null), ma(n)));
  }
  function du(e) {
    return (sp(), cp(), fp(), dp());
  }
  function dp() {
    if (Tt !== 5) return !1;
    var e = yl,
      n = qs;
    qs = 0;
    var r = so(Or),
      u = L.T,
      f = J.p;
    try {
      ((J.p = 32 > r ? 32 : r), (L.T = null), (r = Zs), (Zs = null));
      var d = yl,
        b = Or;
      if (((Tt = 0), (Dr = yl = null), (Or = 0), (Qe & 6) !== 0))
        throw Error(i(331));
      var S = Qe;
      if (
        ((Qe |= 4),
        Pd(d.current),
        Qd(d, d.current, b, r),
        (Qe = S),
        Ha(0, !1),
        W && typeof W.onPostCommitFiberRoot == "function")
      )
        try {
          W.onPostCommitFiberRoot(I, d);
        } catch {}
      return !0;
    } finally {
      ((J.p = f), (L.T = u), hp(e, n));
    }
  }
  function pp(e, n, r) {
    ((n = on(r, n)),
      (n = ks(e.stateNode, n, 2)),
      (e = ul(e, n, 2)),
      e !== null && (Wr(e, 2), _n(e)));
  }
  function We(e, n, r) {
    if (e.tag === 3) pp(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          pp(n, e, r);
          break;
        } else if (n.tag === 1) {
          var u = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof u.componentDidCatch == "function" &&
              (gl === null || !gl.has(u)))
          ) {
            ((e = on(r, e)),
              (r = bd(2)),
              (u = ul(n, r, 2)),
              u !== null && (xd(r, u, n, e), Wr(u, 2), _n(u)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Qs(e, n, r) {
    var u = e.pingCache;
    if (u === null) {
      u = e.pingCache = new ib();
      var f = new Set();
      u.set(n, f);
    } else ((f = u.get(n)), f === void 0 && ((f = new Set()), u.set(n, f)));
    f.has(r) ||
      ((js = !0), f.add(r), (e = fb.bind(null, e, n, r)), n.then(e, e));
  }
  function fb(e, n, r) {
    var u = e.pingCache;
    (u !== null && u.delete(n),
      (e.pingedLanes |= e.suspendedLanes & r),
      (e.warmLanes &= ~r),
      tt === e &&
        (je & r) === r &&
        (ot === 4 || (ot === 3 && (je & 62914560) === je && 300 > Ie() - Vs)
          ? (Qe & 2) === 0 && Nr(e, 0)
          : (Us |= r),
        zr === je && (zr = 0)),
      _n(e));
  }
  function mp(e, n) {
    (n === 0 && (n = fh()), (e = gr(e, n)), e !== null && (Wr(e, n), _n(e)));
  }
  function hb(e) {
    var n = e.memoizedState,
      r = 0;
    (n !== null && (r = n.retryLane), mp(e, r));
  }
  function db(e, n) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var u = e.stateNode,
          f = e.memoizedState;
        f !== null && (r = f.retryLane);
        break;
      case 19:
        u = e.stateNode;
        break;
      case 22:
        u = e.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    (u !== null && u.delete(n), mp(e, r));
  }
  function pb(e, n) {
    return Se(e, n);
  }
  var pu = null,
    Hr = null,
    Xs = !1,
    mu = !1,
    $s = !1,
    Fl = 0;
  function _n(e) {
    (e !== Hr &&
      e.next === null &&
      (Hr === null ? (pu = Hr = e) : (Hr = Hr.next = e)),
      (mu = !0),
      Xs || ((Xs = !0), gb()));
  }
  function Ha(e, n) {
    if (!$s && mu) {
      $s = !0;
      do
        for (var r = !1, u = pu; u !== null; ) {
          if (e !== 0) {
            var f = u.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var b = u.suspendedLanes,
                S = u.pingedLanes;
              ((d = (1 << (31 - me(42 | e) + 1)) - 1),
                (d &= f & ~(b & ~S)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
            }
            d !== 0 && ((r = !0), xp(u, d));
          } else
            ((d = je),
              (d = vt(
                u,
                u === tt ? d : 0,
                u.cancelPendingCommit !== null || u.timeoutHandle !== -1
              )),
              (d & 3) === 0 || rn(u, d) || ((r = !0), xp(u, d)));
          u = u.next;
        }
      while (r);
      $s = !1;
    }
  }
  function mb() {
    gp();
  }
  function gp() {
    mu = Xs = !1;
    var e = 0;
    Fl !== 0 && (Eb() && (e = Fl), (Fl = 0));
    for (var n = Ie(), r = null, u = pu; u !== null; ) {
      var f = u.next,
        d = yp(u, n);
      (d === 0
        ? ((u.next = null),
          r === null ? (pu = f) : (r.next = f),
          f === null && (Hr = r))
        : ((r = u), (e !== 0 || (d & 3) !== 0) && (mu = !0)),
        (u = f));
    }
    Ha(e);
  }
  function yp(e, n) {
    for (
      var r = e.suspendedLanes,
        u = e.pingedLanes,
        f = e.expirationTimes,
        d = e.pendingLanes & -62914561;
      0 < d;

    ) {
      var b = 31 - me(d),
        S = 1 << b,
        T = f[b];
      (T === -1
        ? ((S & r) === 0 || (S & u) !== 0) && (f[b] = gn(S, n))
        : T <= n && (e.expiredLanes |= S),
        (d &= ~S));
    }
    if (
      ((n = tt),
      (r = je),
      (r = vt(
        e,
        e === n ? r : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (u = e.callbackNode),
      r === 0 ||
        (e === n && (Xe === 2 || Xe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        u !== null && u !== null && ve(u),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((r & 3) === 0 || rn(e, r)) {
      if (((n = r & -r), n === e.callbackPriority)) return n;
      switch ((u !== null && ve(u), so(r))) {
        case 2:
        case 8:
          r = Ye;
          break;
        case 32:
          r = ft;
          break;
        case 268435456:
          r = On;
          break;
        default:
          r = ft;
      }
      return (
        (u = bp.bind(null, e)),
        (r = Se(r, u)),
        (e.callbackPriority = n),
        (e.callbackNode = r),
        n
      );
    }
    return (
      u !== null && u !== null && ve(u),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function bp(e, n) {
    if (Tt !== 0 && Tt !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var r = e.callbackNode;
    if (du() && e.callbackNode !== r) return null;
    var u = je;
    return (
      (u = vt(
        e,
        e === tt ? u : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      u === 0
        ? null
        : (ep(e, u, n),
          yp(e, Ie()),
          e.callbackNode != null && e.callbackNode === r
            ? bp.bind(null, e)
            : null)
    );
  }
  function xp(e, n) {
    if (du()) return null;
    ep(e, n, !0);
  }
  function gb() {
    _b(function () {
      (Qe & 6) !== 0 ? Se(Fe, mb) : gp();
    });
  }
  function Ps() {
    return (Fl === 0 && (Fl = ch()), Fl);
  }
  function vp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : _i("" + e);
  }
  function kp(e, n) {
    var r = n.ownerDocument.createElement("input");
    return (
      (r.name = n.name),
      (r.value = n.value),
      e.id && r.setAttribute("form", e.id),
      n.parentNode.insertBefore(r, n),
      (e = new FormData(e)),
      r.parentNode.removeChild(r),
      e
    );
  }
  function yb(e, n, r, u, f) {
    if (n === "submit" && r && r.stateNode === f) {
      var d = vp((f[Vt] || null).action),
        b = u.submitter;
      b &&
        ((n = (n = b[Vt] || null)
          ? vp(n.formAction)
          : b.getAttribute("formAction")),
        n !== null && ((d = n), (b = null)));
      var S = new Mi("action", "action", null, u, f);
      e.push({
        event: S,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (u.defaultPrevented) {
                if (Fl !== 0) {
                  var T = b ? kp(f, b) : new FormData(f);
                  gs(
                    r,
                    { pending: !0, data: T, method: f.method, action: d },
                    null,
                    T
                  );
                }
              } else
                typeof d == "function" &&
                  (S.preventDefault(),
                  (T = b ? kp(f, b) : new FormData(f)),
                  gs(
                    r,
                    { pending: !0, data: T, method: f.method, action: d },
                    d,
                    T
                  ));
            },
            currentTarget: f,
          },
        ],
      });
    }
  }
  for (var Ks = 0; Ks < Lo.length; Ks++) {
    var Js = Lo[Ks],
      bb = Js.toLowerCase(),
      xb = Js[0].toUpperCase() + Js.slice(1);
    yn(bb, "on" + xb);
  }
  (yn(e0, "onAnimationEnd"),
    yn(t0, "onAnimationIteration"),
    yn(n0, "onAnimationStart"),
    yn("dblclick", "onDoubleClick"),
    yn("focusin", "onFocus"),
    yn("focusout", "onBlur"),
    yn(H2, "onTransitionRun"),
    yn(j2, "onTransitionStart"),
    yn(U2, "onTransitionCancel"),
    yn(l0, "onTransitionEnd"),
    ir("onMouseEnter", ["mouseout", "mouseover"]),
    ir("onMouseLeave", ["mouseout", "mouseover"]),
    ir("onPointerEnter", ["pointerout", "pointerover"]),
    ir("onPointerLeave", ["pointerout", "pointerover"]),
    Ml(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Ml(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Ml("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ml(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ml(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ml(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var ja =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    vb = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(ja)
    );
  function Sp(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var u = e[r],
        f = u.event;
      u = u.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var b = u.length - 1; 0 <= b; b--) {
            var S = u[b],
              T = S.instance,
              H = S.currentTarget;
            if (((S = S.listener), T !== d && f.isPropagationStopped()))
              break e;
            ((d = S), (f.currentTarget = H));
            try {
              d(f);
            } catch (X) {
              nu(X);
            }
            ((f.currentTarget = null), (d = T));
          }
        else
          for (b = 0; b < u.length; b++) {
            if (
              ((S = u[b]),
              (T = S.instance),
              (H = S.currentTarget),
              (S = S.listener),
              T !== d && f.isPropagationStopped())
            )
              break e;
            ((d = S), (f.currentTarget = H));
            try {
              d(f);
            } catch (X) {
              nu(X);
            }
            ((f.currentTarget = null), (d = T));
          }
      }
    }
  }
  function Le(e, n) {
    var r = n[co];
    r === void 0 && (r = n[co] = new Set());
    var u = e + "__bubble";
    r.has(u) || (wp(n, e, 2, !1), r.add(u));
  }
  function Ws(e, n, r) {
    var u = 0;
    (n && (u |= 4), wp(r, e, u, n));
  }
  var gu = "_reactListening" + Math.random().toString(36).slice(2);
  function ec(e) {
    if (!e[gu]) {
      ((e[gu] = !0),
        gh.forEach(function (r) {
          r !== "selectionchange" && (vb.has(r) || Ws(r, !1, e), Ws(r, !0, e));
        }));
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[gu] || ((n[gu] = !0), Ws("selectionchange", !1, n));
    }
  }
  function wp(e, n, r, u) {
    switch (Qp(n)) {
      case 2:
        var f = Qb;
        break;
      case 8:
        f = Xb;
        break;
      default:
        f = pc;
    }
    ((r = f.bind(null, n, r, e)),
      (f = void 0),
      !So ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (f = !0),
      u
        ? f !== void 0
          ? e.addEventListener(n, r, { capture: !0, passive: f })
          : e.addEventListener(n, r, !0)
        : f !== void 0
          ? e.addEventListener(n, r, { passive: f })
          : e.addEventListener(n, r, !1));
  }
  function tc(e, n, r, u, f) {
    var d = u;
    if ((n & 1) === 0 && (n & 2) === 0 && u !== null)
      e: for (;;) {
        if (u === null) return;
        var b = u.tag;
        if (b === 3 || b === 4) {
          var S = u.stateNode.containerInfo;
          if (S === f) break;
          if (b === 4)
            for (b = u.return; b !== null; ) {
              var T = b.tag;
              if ((T === 3 || T === 4) && b.stateNode.containerInfo === f)
                return;
              b = b.return;
            }
          for (; S !== null; ) {
            if (((b = lr(S)), b === null)) return;
            if (((T = b.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              u = d = b;
              continue e;
            }
            S = S.parentNode;
          }
        }
        u = u.return;
      }
    Mh(function () {
      var H = d,
        X = vo(r),
        P = [];
      e: {
        var j = r0.get(e);
        if (j !== void 0) {
          var B = Mi,
            we = e;
          switch (e) {
            case "keypress":
              if (Ci(r) === 0) break e;
            case "keydown":
            case "keyup":
              B = p2;
              break;
            case "focusin":
              ((we = "focus"), (B = _o));
              break;
            case "focusout":
              ((we = "blur"), (B = _o));
              break;
            case "beforeblur":
            case "afterblur":
              B = _o;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              B = Oh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = n2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = y2;
              break;
            case e0:
            case t0:
            case n0:
              B = a2;
              break;
            case l0:
              B = x2;
              break;
            case "scroll":
            case "scrollend":
              B = e2;
              break;
            case "wheel":
              B = k2;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = u2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = Lh;
              break;
            case "toggle":
            case "beforetoggle":
              B = w2;
          }
          var xe = (n & 4) !== 0,
            Je = !xe && (e === "scroll" || e === "scrollend"),
            D = xe ? (j !== null ? j + "Capture" : null) : j;
          xe = [];
          for (var M = H, N; M !== null; ) {
            var $ = M;
            if (
              ((N = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                N === null ||
                D === null ||
                (($ = na(M, D)), $ != null && xe.push(Ua(M, $, N))),
              Je)
            )
              break;
            M = M.return;
          }
          0 < xe.length &&
            ((j = new B(j, we, null, r, X)),
            P.push({ event: j, listeners: xe }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((j = e === "mouseover" || e === "pointerover"),
            (B = e === "mouseout" || e === "pointerout"),
            j &&
              r !== xo &&
              (we = r.relatedTarget || r.fromElement) &&
              (lr(we) || we[nr]))
          )
            break e;
          if (
            (B || j) &&
            ((j =
              X.window === X
                ? X
                : (j = X.ownerDocument)
                  ? j.defaultView || j.parentWindow
                  : window),
            B
              ? ((we = r.relatedTarget || r.toElement),
                (B = H),
                (we = we ? lr(we) : null),
                we !== null &&
                  ((Je = c(we)),
                  (xe = we.tag),
                  we !== Je || (xe !== 5 && xe !== 27 && xe !== 6)) &&
                  (we = null))
              : ((B = null), (we = H)),
            B !== we)
          ) {
            if (
              ((xe = Oh),
              ($ = "onMouseLeave"),
              (D = "onMouseEnter"),
              (M = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((xe = Lh),
                ($ = "onPointerLeave"),
                (D = "onPointerEnter"),
                (M = "pointer")),
              (Je = B == null ? j : ta(B)),
              (N = we == null ? j : ta(we)),
              (j = new xe($, M + "leave", B, r, X)),
              (j.target = Je),
              (j.relatedTarget = N),
              ($ = null),
              lr(X) === H &&
                ((xe = new xe(D, M + "enter", we, r, X)),
                (xe.target = N),
                (xe.relatedTarget = Je),
                ($ = xe)),
              (Je = $),
              B && we)
            )
              t: {
                for (xe = B, D = we, M = 0, N = xe; N; N = jr(N)) M++;
                for (N = 0, $ = D; $; $ = jr($)) N++;
                for (; 0 < M - N; ) ((xe = jr(xe)), M--);
                for (; 0 < N - M; ) ((D = jr(D)), N--);
                for (; M--; ) {
                  if (xe === D || (D !== null && xe === D.alternate)) break t;
                  ((xe = jr(xe)), (D = jr(D)));
                }
                xe = null;
              }
            else xe = null;
            (B !== null && Ep(P, j, B, xe, !1),
              we !== null && Je !== null && Ep(P, Je, we, xe, !0));
          }
        }
        e: {
          if (
            ((j = H ? ta(H) : window),
            (B = j.nodeName && j.nodeName.toLowerCase()),
            B === "select" || (B === "input" && j.type === "file"))
          )
            var ce = Ih;
          else if (qh(j))
            if (Yh) ce = O2;
            else {
              ce = z2;
              var De = M2;
            }
          else
            ((B = j.nodeName),
              !B ||
              B.toLowerCase() !== "input" ||
              (j.type !== "checkbox" && j.type !== "radio")
                ? H && bo(H.elementType) && (ce = Ih)
                : (ce = D2));
          if (ce && (ce = ce(e, H))) {
            Zh(P, ce, r, X);
            break e;
          }
          (De && De(e, j, H),
            e === "focusout" &&
              H &&
              j.type === "number" &&
              H.memoizedProps.value != null &&
              yo(j, "number", j.value));
        }
        switch (((De = H ? ta(H) : window), e)) {
          case "focusin":
            (qh(De) || De.contentEditable === "true") &&
              ((dr = De), (Do = H), (ca = null));
            break;
          case "focusout":
            ca = Do = dr = null;
            break;
          case "mousedown":
            Oo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Oo = !1), Jh(P, r, X));
            break;
          case "selectionchange":
            if (L2) break;
          case "keydown":
          case "keyup":
            Jh(P, r, X);
        }
        var pe;
        if (Co)
          e: {
            switch (e) {
              case "compositionstart":
                var ke = "onCompositionStart";
                break e;
              case "compositionend":
                ke = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ke = "onCompositionUpdate";
                break e;
            }
            ke = void 0;
          }
        else
          hr
            ? Bh(e, r) && (ke = "onCompositionEnd")
            : e === "keydown" &&
              r.keyCode === 229 &&
              (ke = "onCompositionStart");
        (ke &&
          (Hh &&
            r.locale !== "ko" &&
            (hr || ke !== "onCompositionStart"
              ? ke === "onCompositionEnd" && hr && (pe = zh())
              : ((ll = X),
                (wo = "value" in ll ? ll.value : ll.textContent),
                (hr = !0))),
          (De = yu(H, ke)),
          0 < De.length &&
            ((ke = new Nh(ke, e, null, r, X)),
            P.push({ event: ke, listeners: De }),
            pe
              ? (ke.data = pe)
              : ((pe = Vh(r)), pe !== null && (ke.data = pe)))),
          (pe = A2 ? _2(e, r) : T2(e, r)) &&
            ((ke = yu(H, "onBeforeInput")),
            0 < ke.length &&
              ((De = new Nh("onBeforeInput", "beforeinput", null, r, X)),
              P.push({ event: De, listeners: ke }),
              (De.data = pe))),
          yb(P, e, H, r, X));
      }
      Sp(P, n);
    });
  }
  function Ua(e, n, r) {
    return { instance: e, listener: n, currentTarget: r };
  }
  function yu(e, n) {
    for (var r = n + "Capture", u = []; e !== null; ) {
      var f = e,
        d = f.stateNode;
      if (
        ((f = f.tag),
        (f !== 5 && f !== 26 && f !== 27) ||
          d === null ||
          ((f = na(e, r)),
          f != null && u.unshift(Ua(e, f, d)),
          (f = na(e, n)),
          f != null && u.push(Ua(e, f, d))),
        e.tag === 3)
      )
        return u;
      e = e.return;
    }
    return [];
  }
  function jr(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ep(e, n, r, u, f) {
    for (var d = n._reactName, b = []; r !== null && r !== u; ) {
      var S = r,
        T = S.alternate,
        H = S.stateNode;
      if (((S = S.tag), T !== null && T === u)) break;
      ((S !== 5 && S !== 26 && S !== 27) ||
        H === null ||
        ((T = H),
        f
          ? ((H = na(r, d)), H != null && b.unshift(Ua(r, H, T)))
          : f || ((H = na(r, d)), H != null && b.push(Ua(r, H, T)))),
        (r = r.return));
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var kb = /\r\n?/g,
    Sb = /\u0000|\uFFFD/g;
  function Ap(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        kb,
        `
`
      )
      .replace(Sb, "");
  }
  function _p(e, n) {
    return ((n = Ap(n)), Ap(e) === n);
  }
  function bu() {}
  function Ke(e, n, r, u, f, d) {
    switch (r) {
      case "children":
        typeof u == "string"
          ? n === "body" || (n === "textarea" && u === "") || sr(e, u)
          : (typeof u == "number" || typeof u == "bigint") &&
            n !== "body" &&
            sr(e, "" + u);
        break;
      case "className":
        wi(e, "class", u);
        break;
      case "tabIndex":
        wi(e, "tabindex", u);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        wi(e, r, u);
        break;
      case "style":
        Ch(e, u, d);
        break;
      case "data":
        if (n !== "object") {
          wi(e, "data", u);
          break;
        }
      case "src":
      case "href":
        if (u === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (
          u == null ||
          typeof u == "function" ||
          typeof u == "symbol" ||
          typeof u == "boolean"
        ) {
          e.removeAttribute(r);
          break;
        }
        ((u = _i("" + u)), e.setAttribute(r, u));
        break;
      case "action":
      case "formAction":
        if (typeof u == "function") {
          e.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof d == "function" &&
            (r === "formAction"
              ? (n !== "input" && Ke(e, n, "name", f.name, f, null),
                Ke(e, n, "formEncType", f.formEncType, f, null),
                Ke(e, n, "formMethod", f.formMethod, f, null),
                Ke(e, n, "formTarget", f.formTarget, f, null))
              : (Ke(e, n, "encType", f.encType, f, null),
                Ke(e, n, "method", f.method, f, null),
                Ke(e, n, "target", f.target, f, null)));
        if (u == null || typeof u == "symbol" || typeof u == "boolean") {
          e.removeAttribute(r);
          break;
        }
        ((u = _i("" + u)), e.setAttribute(r, u));
        break;
      case "onClick":
        u != null && (e.onclick = bu);
        break;
      case "onScroll":
        u != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        u != null && Le("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) throw Error(i(61));
          if (((r = u.__html), r != null)) {
            if (f.children != null) throw Error(i(60));
            e.innerHTML = r;
          }
        }
        break;
      case "multiple":
        e.multiple = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "muted":
        e.muted = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          u == null ||
          typeof u == "function" ||
          typeof u == "boolean" ||
          typeof u == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((r = _i("" + u)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        u != null && typeof u != "function" && typeof u != "symbol"
          ? e.setAttribute(r, "" + u)
          : e.removeAttribute(r);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        u && typeof u != "function" && typeof u != "symbol"
          ? e.setAttribute(r, "")
          : e.removeAttribute(r);
        break;
      case "capture":
      case "download":
        u === !0
          ? e.setAttribute(r, "")
          : u !== !1 &&
              u != null &&
              typeof u != "function" &&
              typeof u != "symbol"
            ? e.setAttribute(r, u)
            : e.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        !isNaN(u) &&
        1 <= u
          ? e.setAttribute(r, u)
          : e.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u)
          ? e.removeAttribute(r)
          : e.setAttribute(r, u);
        break;
      case "popover":
        (Le("beforetoggle", e), Le("toggle", e), Si(e, "popover", u));
        break;
      case "xlinkActuate":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", u);
        break;
      case "xlinkArcrole":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", u);
        break;
      case "xlinkRole":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:role", u);
        break;
      case "xlinkShow":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:show", u);
        break;
      case "xlinkTitle":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:title", u);
        break;
      case "xlinkType":
        Nn(e, "http://www.w3.org/1999/xlink", "xlink:type", u);
        break;
      case "xmlBase":
        Nn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", u);
        break;
      case "xmlLang":
        Nn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", u);
        break;
      case "xmlSpace":
        Nn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", u);
        break;
      case "is":
        Si(e, "is", u);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) ||
          (r[0] !== "o" && r[0] !== "O") ||
          (r[1] !== "n" && r[1] !== "N")) &&
          ((r = Jy.get(r) || r), Si(e, r, u));
    }
  }
  function nc(e, n, r, u, f, d) {
    switch (r) {
      case "style":
        Ch(e, u, d);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) throw Error(i(61));
          if (((r = u.__html), r != null)) {
            if (f.children != null) throw Error(i(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof u == "string"
          ? sr(e, u)
          : (typeof u == "number" || typeof u == "bigint") && sr(e, "" + u);
        break;
      case "onScroll":
        u != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        u != null && Le("scrollend", e);
        break;
      case "onClick":
        u != null && (e.onclick = bu);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!yh.hasOwnProperty(r))
          e: {
            if (
              r[0] === "o" &&
              r[1] === "n" &&
              ((f = r.endsWith("Capture")),
              (n = r.slice(2, f ? r.length - 7 : void 0)),
              (d = e[Vt] || null),
              (d = d != null ? d[r] : null),
              typeof d == "function" && e.removeEventListener(n, d, f),
              typeof u == "function")
            ) {
              (typeof d != "function" &&
                d !== null &&
                (r in e
                  ? (e[r] = null)
                  : e.hasAttribute(r) && e.removeAttribute(r)),
                e.addEventListener(n, u, f));
              break e;
            }
            r in e
              ? (e[r] = u)
              : u === !0
                ? e.setAttribute(r, "")
                : Si(e, r, u);
          }
    }
  }
  function Ct(e, n, r) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Le("error", e), Le("load", e));
        var u = !1,
          f = !1,
          d;
        for (d in r)
          if (r.hasOwnProperty(d)) {
            var b = r[d];
            if (b != null)
              switch (d) {
                case "src":
                  u = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, n));
                default:
                  Ke(e, n, d, b, r, null);
              }
          }
        (f && Ke(e, n, "srcSet", r.srcSet, r, null),
          u && Ke(e, n, "src", r.src, r, null));
        return;
      case "input":
        Le("invalid", e);
        var S = (d = b = f = null),
          T = null,
          H = null;
        for (u in r)
          if (r.hasOwnProperty(u)) {
            var X = r[u];
            if (X != null)
              switch (u) {
                case "name":
                  f = X;
                  break;
                case "type":
                  b = X;
                  break;
                case "checked":
                  T = X;
                  break;
                case "defaultChecked":
                  H = X;
                  break;
                case "value":
                  d = X;
                  break;
                case "defaultValue":
                  S = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null) throw Error(i(137, n));
                  break;
                default:
                  Ke(e, n, u, X, r, null);
              }
          }
        (Eh(e, d, S, T, H, b, f, !1), Ei(e));
        return;
      case "select":
        (Le("invalid", e), (u = b = d = null));
        for (f in r)
          if (r.hasOwnProperty(f) && ((S = r[f]), S != null))
            switch (f) {
              case "value":
                d = S;
                break;
              case "defaultValue":
                b = S;
                break;
              case "multiple":
                u = S;
              default:
                Ke(e, n, f, S, r, null);
            }
        ((n = d),
          (r = b),
          (e.multiple = !!u),
          n != null ? or(e, !!u, n, !1) : r != null && or(e, !!u, r, !0));
        return;
      case "textarea":
        (Le("invalid", e), (d = f = u = null));
        for (b in r)
          if (r.hasOwnProperty(b) && ((S = r[b]), S != null))
            switch (b) {
              case "value":
                u = S;
                break;
              case "defaultValue":
                f = S;
                break;
              case "children":
                d = S;
                break;
              case "dangerouslySetInnerHTML":
                if (S != null) throw Error(i(91));
                break;
              default:
                Ke(e, n, b, S, r, null);
            }
        (_h(e, u, f, d), Ei(e));
        return;
      case "option":
        for (T in r)
          if (r.hasOwnProperty(T) && ((u = r[T]), u != null))
            switch (T) {
              case "selected":
                e.selected =
                  u && typeof u != "function" && typeof u != "symbol";
                break;
              default:
                Ke(e, n, T, u, r, null);
            }
        return;
      case "dialog":
        (Le("beforetoggle", e),
          Le("toggle", e),
          Le("cancel", e),
          Le("close", e));
        break;
      case "iframe":
      case "object":
        Le("load", e);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ja.length; u++) Le(ja[u], e);
        break;
      case "image":
        (Le("error", e), Le("load", e));
        break;
      case "details":
        Le("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Le("error", e), Le("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in r)
          if (r.hasOwnProperty(H) && ((u = r[H]), u != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                Ke(e, n, H, u, r, null);
            }
        return;
      default:
        if (bo(n)) {
          for (X in r)
            r.hasOwnProperty(X) &&
              ((u = r[X]), u !== void 0 && nc(e, n, X, u, r, void 0));
          return;
        }
    }
    for (S in r)
      r.hasOwnProperty(S) && ((u = r[S]), u != null && Ke(e, n, S, u, r, null));
  }
  function wb(e, n, r, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var f = null,
          d = null,
          b = null,
          S = null,
          T = null,
          H = null,
          X = null;
        for (B in r) {
          var P = r[B];
          if (r.hasOwnProperty(B) && P != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = P;
              default:
                u.hasOwnProperty(B) || Ke(e, n, B, null, u, P);
            }
        }
        for (var j in u) {
          var B = u[j];
          if (((P = r[j]), u.hasOwnProperty(j) && (B != null || P != null)))
            switch (j) {
              case "type":
                d = B;
                break;
              case "name":
                f = B;
                break;
              case "checked":
                H = B;
                break;
              case "defaultChecked":
                X = B;
                break;
              case "value":
                b = B;
                break;
              case "defaultValue":
                S = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(i(137, n));
                break;
              default:
                B !== P && Ke(e, n, j, B, u, P);
            }
        }
        go(e, b, S, T, H, X, d, f);
        return;
      case "select":
        B = b = S = j = null;
        for (d in r)
          if (((T = r[d]), r.hasOwnProperty(d) && T != null))
            switch (d) {
              case "value":
                break;
              case "multiple":
                B = T;
              default:
                u.hasOwnProperty(d) || Ke(e, n, d, null, u, T);
            }
        for (f in u)
          if (
            ((d = u[f]),
            (T = r[f]),
            u.hasOwnProperty(f) && (d != null || T != null))
          )
            switch (f) {
              case "value":
                j = d;
                break;
              case "defaultValue":
                S = d;
                break;
              case "multiple":
                b = d;
              default:
                d !== T && Ke(e, n, f, d, u, T);
            }
        ((n = S),
          (r = b),
          (u = B),
          j != null
            ? or(e, !!r, j, !1)
            : !!u != !!r &&
              (n != null ? or(e, !!r, n, !0) : or(e, !!r, r ? [] : "", !1)));
        return;
      case "textarea":
        B = j = null;
        for (S in r)
          if (
            ((f = r[S]),
            r.hasOwnProperty(S) && f != null && !u.hasOwnProperty(S))
          )
            switch (S) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ke(e, n, S, null, u, f);
            }
        for (b in u)
          if (
            ((f = u[b]),
            (d = r[b]),
            u.hasOwnProperty(b) && (f != null || d != null))
          )
            switch (b) {
              case "value":
                j = f;
                break;
              case "defaultValue":
                B = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(i(91));
                break;
              default:
                f !== d && Ke(e, n, b, f, u, d);
            }
        Ah(e, j, B);
        return;
      case "option":
        for (var we in r)
          if (
            ((j = r[we]),
            r.hasOwnProperty(we) && j != null && !u.hasOwnProperty(we))
          )
            switch (we) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ke(e, n, we, null, u, j);
            }
        for (T in u)
          if (
            ((j = u[T]),
            (B = r[T]),
            u.hasOwnProperty(T) && j !== B && (j != null || B != null))
          )
            switch (T) {
              case "selected":
                e.selected =
                  j && typeof j != "function" && typeof j != "symbol";
                break;
              default:
                Ke(e, n, T, j, u, B);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var xe in r)
          ((j = r[xe]),
            r.hasOwnProperty(xe) &&
              j != null &&
              !u.hasOwnProperty(xe) &&
              Ke(e, n, xe, null, u, j));
        for (H in u)
          if (
            ((j = u[H]),
            (B = r[H]),
            u.hasOwnProperty(H) && j !== B && (j != null || B != null))
          )
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(i(137, n));
                break;
              default:
                Ke(e, n, H, j, u, B);
            }
        return;
      default:
        if (bo(n)) {
          for (var Je in r)
            ((j = r[Je]),
              r.hasOwnProperty(Je) &&
                j !== void 0 &&
                !u.hasOwnProperty(Je) &&
                nc(e, n, Je, void 0, u, j));
          for (X in u)
            ((j = u[X]),
              (B = r[X]),
              !u.hasOwnProperty(X) ||
                j === B ||
                (j === void 0 && B === void 0) ||
                nc(e, n, X, j, u, B));
          return;
        }
    }
    for (var D in r)
      ((j = r[D]),
        r.hasOwnProperty(D) &&
          j != null &&
          !u.hasOwnProperty(D) &&
          Ke(e, n, D, null, u, j));
    for (P in u)
      ((j = u[P]),
        (B = r[P]),
        !u.hasOwnProperty(P) ||
          j === B ||
          (j == null && B == null) ||
          Ke(e, n, P, j, u, B));
  }
  var lc = null,
    rc = null;
  function xu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Tp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Cp(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function ac(e, n) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      typeof n.children == "bigint" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ic = null;
  function Eb() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === ic
        ? !1
        : ((ic = e), !0)
      : ((ic = null), !1);
  }
  var Rp = typeof setTimeout == "function" ? setTimeout : void 0,
    Ab = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Mp = typeof Promise == "function" ? Promise : void 0,
    _b =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Mp < "u"
          ? function (e) {
              return Mp.resolve(null).then(e).catch(Tb);
            }
          : Rp;
  function Tb(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function xl(e) {
    return e === "head";
  }
  function zp(e, n) {
    var r = n,
      u = 0,
      f = 0;
    do {
      var d = r.nextSibling;
      if ((e.removeChild(r), d && d.nodeType === 8))
        if (((r = d.data), r === "/$")) {
          if (0 < u && 8 > u) {
            r = u;
            var b = e.ownerDocument;
            if ((r & 1 && Ba(b.documentElement), r & 2 && Ba(b.body), r & 4))
              for (r = b.head, Ba(r), b = r.firstChild; b; ) {
                var S = b.nextSibling,
                  T = b.nodeName;
                (b[ea] ||
                  T === "SCRIPT" ||
                  T === "STYLE" ||
                  (T === "LINK" && b.rel.toLowerCase() === "stylesheet") ||
                  r.removeChild(b),
                  (b = S));
              }
          }
          if (f === 0) {
            (e.removeChild(d), Qa(n));
            return;
          }
          f--;
        } else
          r === "$" || r === "$?" || r === "$!"
            ? f++
            : (u = r.charCodeAt(0) - 48);
      else u = 0;
      r = d;
    } while (r);
    Qa(n);
  }
  function uc(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (((n = n.nextSibling), r.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (uc(r), fo(r));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(r);
    }
  }
  function Cb(e, n, r, u) {
    for (; e.nodeType === 1; ) {
      var f = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!u && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (u) {
        if (!e[ea])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((d = e.getAttribute("rel")),
                d === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                d !== f.rel ||
                e.getAttribute("href") !==
                  (f.href == null || f.href === "" ? null : f.href) ||
                e.getAttribute("crossorigin") !==
                  (f.crossOrigin == null ? null : f.crossOrigin) ||
                e.getAttribute("title") !== (f.title == null ? null : f.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((d = e.getAttribute("src")),
                (d !== (f.src == null ? null : f.src) ||
                  e.getAttribute("type") !== (f.type == null ? null : f.type) ||
                  e.getAttribute("crossorigin") !==
                    (f.crossOrigin == null ? null : f.crossOrigin)) &&
                  d &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var d = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && e.getAttribute("name") === d) return e;
      } else return e;
      if (((e = xn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Rb(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !r) ||
        ((e = xn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function oc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function Mb(e, n) {
    var r = e.ownerDocument;
    if (e.data !== "$?" || r.readyState === "complete") n();
    else {
      var u = function () {
        (n(), r.removeEventListener("DOMContentLoaded", u));
      };
      (r.addEventListener("DOMContentLoaded", u), (e._reactRetry = u));
    }
  }
  function xn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = e.data),
          n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
        )
          break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  var sc = null;
  function Dp(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (n === 0) return e;
          n--;
        } else r === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Op(e, n, r) {
    switch (((n = xu(r)), e)) {
      case "html":
        if (((e = n.documentElement), !e)) throw Error(i(452));
        return e;
      case "head":
        if (((e = n.head), !e)) throw Error(i(453));
        return e;
      case "body":
        if (((e = n.body), !e)) throw Error(i(454));
        return e;
      default:
        throw Error(i(451));
    }
  }
  function Ba(e) {
    for (var n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
    fo(e);
  }
  var pn = new Map(),
    Np = new Set();
  function vu(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Xn = J.d;
  J.d = { f: zb, r: Db, D: Ob, C: Nb, L: Lb, m: Hb, X: Ub, S: jb, M: Bb };
  function zb() {
    var e = Xn.f(),
      n = fu();
    return e || n;
  }
  function Db(e) {
    var n = rr(e);
    n !== null && n.tag === 5 && n.type === "form" ? ed(n) : Xn.r(e);
  }
  var Ur = typeof document > "u" ? null : document;
  function Lp(e, n, r) {
    var u = Ur;
    if (u && typeof n == "string" && n) {
      var f = un(n);
      ((f = 'link[rel="' + e + '"][href="' + f + '"]'),
        typeof r == "string" && (f += '[crossorigin="' + r + '"]'),
        Np.has(f) ||
          (Np.add(f),
          (e = { rel: e, crossOrigin: r, href: n }),
          u.querySelector(f) === null &&
            ((n = u.createElement("link")),
            Ct(n, "link", e),
            kt(n),
            u.head.appendChild(n))));
    }
  }
  function Ob(e) {
    (Xn.D(e), Lp("dns-prefetch", e, null));
  }
  function Nb(e, n) {
    (Xn.C(e, n), Lp("preconnect", e, n));
  }
  function Lb(e, n, r) {
    Xn.L(e, n, r);
    var u = Ur;
    if (u && e && n) {
      var f = 'link[rel="preload"][as="' + un(n) + '"]';
      n === "image" && r && r.imageSrcSet
        ? ((f += '[imagesrcset="' + un(r.imageSrcSet) + '"]'),
          typeof r.imageSizes == "string" &&
            (f += '[imagesizes="' + un(r.imageSizes) + '"]'))
        : (f += '[href="' + un(e) + '"]');
      var d = f;
      switch (n) {
        case "style":
          d = Br(e);
          break;
        case "script":
          d = Vr(e);
      }
      pn.has(d) ||
        ((e = y(
          {
            rel: "preload",
            href: n === "image" && r && r.imageSrcSet ? void 0 : e,
            as: n,
          },
          r
        )),
        pn.set(d, e),
        u.querySelector(f) !== null ||
          (n === "style" && u.querySelector(Va(d))) ||
          (n === "script" && u.querySelector(qa(d))) ||
          ((n = u.createElement("link")),
          Ct(n, "link", e),
          kt(n),
          u.head.appendChild(n)));
    }
  }
  function Hb(e, n) {
    Xn.m(e, n);
    var r = Ur;
    if (r && e) {
      var u = n && typeof n.as == "string" ? n.as : "script",
        f =
          'link[rel="modulepreload"][as="' + un(u) + '"][href="' + un(e) + '"]',
        d = f;
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Vr(e);
      }
      if (
        !pn.has(d) &&
        ((e = y({ rel: "modulepreload", href: e }, n)),
        pn.set(d, e),
        r.querySelector(f) === null)
      ) {
        switch (u) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(qa(d))) return;
        }
        ((u = r.createElement("link")),
          Ct(u, "link", e),
          kt(u),
          r.head.appendChild(u));
      }
    }
  }
  function jb(e, n, r) {
    Xn.S(e, n, r);
    var u = Ur;
    if (u && e) {
      var f = ar(u).hoistableStyles,
        d = Br(e);
      n = n || "default";
      var b = f.get(d);
      if (!b) {
        var S = { loading: 0, preload: null };
        if ((b = u.querySelector(Va(d)))) S.loading = 5;
        else {
          ((e = y({ rel: "stylesheet", href: e, "data-precedence": n }, r)),
            (r = pn.get(d)) && cc(e, r));
          var T = (b = u.createElement("link"));
          (kt(T),
            Ct(T, "link", e),
            (T._p = new Promise(function (H, X) {
              ((T.onload = H), (T.onerror = X));
            })),
            T.addEventListener("load", function () {
              S.loading |= 1;
            }),
            T.addEventListener("error", function () {
              S.loading |= 2;
            }),
            (S.loading |= 4),
            ku(b, n, u));
        }
        ((b = { type: "stylesheet", instance: b, count: 1, state: S }),
          f.set(d, b));
      }
    }
  }
  function Ub(e, n) {
    Xn.X(e, n);
    var r = Ur;
    if (r && e) {
      var u = ar(r).hoistableScripts,
        f = Vr(e),
        d = u.get(f);
      d ||
        ((d = r.querySelector(qa(f))),
        d ||
          ((e = y({ src: e, async: !0 }, n)),
          (n = pn.get(f)) && fc(e, n),
          (d = r.createElement("script")),
          kt(d),
          Ct(d, "link", e),
          r.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        u.set(f, d));
    }
  }
  function Bb(e, n) {
    Xn.M(e, n);
    var r = Ur;
    if (r && e) {
      var u = ar(r).hoistableScripts,
        f = Vr(e),
        d = u.get(f);
      d ||
        ((d = r.querySelector(qa(f))),
        d ||
          ((e = y({ src: e, async: !0, type: "module" }, n)),
          (n = pn.get(f)) && fc(e, n),
          (d = r.createElement("script")),
          kt(d),
          Ct(d, "link", e),
          r.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        u.set(f, d));
    }
  }
  function Hp(e, n, r, u) {
    var f = (f = se.current) ? vu(f) : null;
    if (!f) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string"
          ? ((n = Br(r.href)),
            (r = ar(f).hoistableStyles),
            (u = r.get(n)),
            u ||
              ((u = { type: "style", instance: null, count: 0, state: null }),
              r.set(n, u)),
            u)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          r.rel === "stylesheet" &&
          typeof r.href == "string" &&
          typeof r.precedence == "string"
        ) {
          e = Br(r.href);
          var d = ar(f).hoistableStyles,
            b = d.get(e);
          if (
            (b ||
              ((f = f.ownerDocument || f),
              (b = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(e, b),
              (d = f.querySelector(Va(e))) &&
                !d._p &&
                ((b.instance = d), (b.state.loading = 5)),
              pn.has(e) ||
                ((r = {
                  rel: "preload",
                  as: "style",
                  href: r.href,
                  crossOrigin: r.crossOrigin,
                  integrity: r.integrity,
                  media: r.media,
                  hrefLang: r.hrefLang,
                  referrerPolicy: r.referrerPolicy,
                }),
                pn.set(e, r),
                d || Vb(f, e, r, b.state))),
            n && u === null)
          )
            throw Error(i(528, ""));
          return b;
        }
        if (n && u !== null) throw Error(i(529, ""));
        return null;
      case "script":
        return (
          (n = r.async),
          (r = r.src),
          typeof r == "string" &&
          n &&
          typeof n != "function" &&
          typeof n != "symbol"
            ? ((n = Vr(r)),
              (r = ar(f).hoistableScripts),
              (u = r.get(n)),
              u ||
                ((u = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                r.set(n, u)),
              u)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(i(444, e));
    }
  }
  function Br(e) {
    return 'href="' + un(e) + '"';
  }
  function Va(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function jp(e) {
    return y({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Vb(e, n, r, u) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]")
      ? (u.loading = 1)
      : ((n = e.createElement("link")),
        (u.preload = n),
        n.addEventListener("load", function () {
          return (u.loading |= 1);
        }),
        n.addEventListener("error", function () {
          return (u.loading |= 2);
        }),
        Ct(n, "link", r),
        kt(n),
        e.head.appendChild(n));
  }
  function Vr(e) {
    return '[src="' + un(e) + '"]';
  }
  function qa(e) {
    return "script[async]" + e;
  }
  function Up(e, n, r) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case "style":
          var u = e.querySelector('style[data-href~="' + un(r.href) + '"]');
          if (u) return ((n.instance = u), kt(u), u);
          var f = y({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null,
          });
          return (
            (u = (e.ownerDocument || e).createElement("style")),
            kt(u),
            Ct(u, "style", f),
            ku(u, r.precedence, e),
            (n.instance = u)
          );
        case "stylesheet":
          f = Br(r.href);
          var d = e.querySelector(Va(f));
          if (d) return ((n.state.loading |= 4), (n.instance = d), kt(d), d);
          ((u = jp(r)),
            (f = pn.get(f)) && cc(u, f),
            (d = (e.ownerDocument || e).createElement("link")),
            kt(d));
          var b = d;
          return (
            (b._p = new Promise(function (S, T) {
              ((b.onload = S), (b.onerror = T));
            })),
            Ct(d, "link", u),
            (n.state.loading |= 4),
            ku(d, r.precedence, e),
            (n.instance = d)
          );
        case "script":
          return (
            (d = Vr(r.src)),
            (f = e.querySelector(qa(d)))
              ? ((n.instance = f), kt(f), f)
              : ((u = r),
                (f = pn.get(d)) && ((u = y({}, r)), fc(u, f)),
                (e = e.ownerDocument || e),
                (f = e.createElement("script")),
                kt(f),
                Ct(f, "link", u),
                e.head.appendChild(f),
                (n.instance = f))
          );
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" &&
        (n.state.loading & 4) === 0 &&
        ((u = n.instance), (n.state.loading |= 4), ku(u, r.precedence, e));
    return n.instance;
  }
  function ku(e, n, r) {
    for (
      var u = r.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        f = u.length ? u[u.length - 1] : null,
        d = f,
        b = 0;
      b < u.length;
      b++
    ) {
      var S = u[b];
      if (S.dataset.precedence === n) d = S;
      else if (d !== f) break;
    }
    d
      ? d.parentNode.insertBefore(e, d.nextSibling)
      : ((n = r.nodeType === 9 ? r.head : r), n.insertBefore(e, n.firstChild));
  }
  function cc(e, n) {
    (e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.title == null && (e.title = n.title));
  }
  function fc(e, n) {
    (e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.integrity == null && (e.integrity = n.integrity));
  }
  var Su = null;
  function Bp(e, n, r) {
    if (Su === null) {
      var u = new Map(),
        f = (Su = new Map());
      f.set(r, u);
    } else ((f = Su), (u = f.get(r)), u || ((u = new Map()), f.set(r, u)));
    if (u.has(e)) return u;
    for (
      u.set(e, null), r = r.getElementsByTagName(e), f = 0;
      f < r.length;
      f++
    ) {
      var d = r[f];
      if (
        !(
          d[ea] ||
          d[Mt] ||
          (e === "link" && d.getAttribute("rel") === "stylesheet")
        ) &&
        d.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var b = d.getAttribute(n) || "";
        b = e + b;
        var S = u.get(b);
        S ? S.push(d) : u.set(b, [d]);
      }
    }
    return u;
  }
  function Vp(e, n, r) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        r,
        n === "title" ? e.querySelector("head > title") : null
      ));
  }
  function qb(e, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof n.precedence != "string" ||
          typeof n.href != "string" ||
          n.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof n.rel != "string" ||
          typeof n.href != "string" ||
          n.href === "" ||
          n.onLoad ||
          n.onError
        )
          break;
        switch (n.rel) {
          case "stylesheet":
            return (
              (e = n.disabled),
              typeof n.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          n.async &&
          typeof n.async != "function" &&
          typeof n.async != "symbol" &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function qp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Za = null;
  function Zb() {}
  function Ib(e, n, r) {
    if (Za === null) throw Error(i(475));
    var u = Za;
    if (
      n.type === "stylesheet" &&
      (typeof r.media != "string" || matchMedia(r.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var f = Br(r.href),
          d = e.querySelector(Va(f));
        if (d) {
          ((e = d._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (u.count++, (u = wu.bind(u)), e.then(u, u)),
            (n.state.loading |= 4),
            (n.instance = d),
            kt(d));
          return;
        }
        ((d = e.ownerDocument || e),
          (r = jp(r)),
          (f = pn.get(f)) && cc(r, f),
          (d = d.createElement("link")),
          kt(d));
        var b = d;
        ((b._p = new Promise(function (S, T) {
          ((b.onload = S), (b.onerror = T));
        })),
          Ct(d, "link", r),
          (n.instance = d));
      }
      (u.stylesheets === null && (u.stylesheets = new Map()),
        u.stylesheets.set(n, e),
        (e = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (u.count++,
          (n = wu.bind(u)),
          e.addEventListener("load", n),
          e.addEventListener("error", n)));
    }
  }
  function Yb() {
    if (Za === null) throw Error(i(475));
    var e = Za;
    return (
      e.stylesheets && e.count === 0 && hc(e, e.stylesheets),
      0 < e.count
        ? function (n) {
            var r = setTimeout(function () {
              if ((e.stylesheets && hc(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend;
                ((e.unsuspend = null), u());
              }
            }, 6e4);
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(r));
              }
            );
          }
        : null
    );
  }
  function wu() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) hc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Eu = null;
  function hc(e, n) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Eu = new Map()),
        n.forEach(Gb, e),
        (Eu = null),
        wu.call(e)));
  }
  function Gb(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Eu.get(e);
      if (r) var u = r.get(null);
      else {
        ((r = new Map()), Eu.set(e, r));
        for (
          var f = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            d = 0;
          d < f.length;
          d++
        ) {
          var b = f[d];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") &&
            (r.set(b.dataset.precedence, b), (u = b));
        }
        u && r.set(null, u);
      }
      ((f = n.instance),
        (b = f.getAttribute("data-precedence")),
        (d = r.get(b) || u),
        d === u && r.set(null, f),
        r.set(b, f),
        this.count++,
        (u = wu.bind(this)),
        f.addEventListener("load", u),
        f.addEventListener("error", u),
        d
          ? d.parentNode.insertBefore(f, d.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(f, e.firstChild)),
        (n.state.loading |= 4));
    }
  }
  var Ia = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0,
  };
  function Fb(e, n, r, u, f, d, b, S) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = uo(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = uo(0)),
      (this.hiddenUpdates = uo(null)),
      (this.identifierPrefix = u),
      (this.onUncaughtError = f),
      (this.onCaughtError = d),
      (this.onRecoverableError = b),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function Zp(e, n, r, u, f, d, b, S, T, H, X, P) {
    return (
      (e = new Fb(e, n, r, b, S, T, H, P)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = $t(3, null, null, n)),
      (e.current = d),
      (d.stateNode = e),
      (n = Qo()),
      n.refCount++,
      (e.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: u, isDehydrated: r, cache: n }),
      Ko(d),
      e
    );
  }
  function Ip(e) {
    return e ? ((e = yr), e) : yr;
  }
  function Yp(e, n, r, u, f, d) {
    ((f = Ip(f)),
      u.context === null ? (u.context = f) : (u.pendingContext = f),
      (u = il(n)),
      (u.payload = { element: r }),
      (d = d === void 0 ? null : d),
      d !== null && (u.callback = d),
      (r = ul(e, u, n)),
      r !== null && (en(r, e, n), xa(r, e, n)));
  }
  function Gp(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function dc(e, n) {
    (Gp(e, n), (e = e.alternate) && Gp(e, n));
  }
  function Fp(e) {
    if (e.tag === 13) {
      var n = gr(e, 67108864);
      (n !== null && en(n, e, 67108864), dc(e, 67108864));
    }
  }
  var Au = !0;
  function Qb(e, n, r, u) {
    var f = L.T;
    L.T = null;
    var d = J.p;
    try {
      ((J.p = 2), pc(e, n, r, u));
    } finally {
      ((J.p = d), (L.T = f));
    }
  }
  function Xb(e, n, r, u) {
    var f = L.T;
    L.T = null;
    var d = J.p;
    try {
      ((J.p = 8), pc(e, n, r, u));
    } finally {
      ((J.p = d), (L.T = f));
    }
  }
  function pc(e, n, r, u) {
    if (Au) {
      var f = mc(u);
      if (f === null) (tc(e, n, u, _u, r), Xp(e, u));
      else if (Pb(f, e, n, r, u)) u.stopPropagation();
      else if ((Xp(e, u), n & 4 && -1 < $b.indexOf(e))) {
        for (; f !== null; ) {
          var d = rr(f);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var b = Qt(d.pendingLanes);
                  if (b !== 0) {
                    var S = d;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; b; ) {
                      var T = 1 << (31 - me(b));
                      ((S.entanglements[1] |= T), (b &= ~T));
                    }
                    (_n(d), (Qe & 6) === 0 && ((su = Ie() + 500), Ha(0)));
                  }
                }
                break;
              case 13:
                ((S = gr(d, 2)), S !== null && en(S, d, 2), fu(), dc(d, 2));
            }
          if (((d = mc(u)), d === null && tc(e, n, u, _u, r), d === f)) break;
          f = d;
        }
        f !== null && u.stopPropagation();
      } else tc(e, n, u, null, r);
    }
  }
  function mc(e) {
    return ((e = vo(e)), gc(e));
  }
  var _u = null;
  function gc(e) {
    if (((_u = null), (e = lr(e)), e !== null)) {
      var n = c(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (((e = s(n)), e !== null)) return e;
          e = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return ((_u = e), null);
  }
  function Qp(e) {
    switch (e) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (At()) {
          case Fe:
            return 2;
          case Ye:
            return 8;
          case ft:
          case el:
            return 32;
          case On:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var yc = !1,
    vl = null,
    kl = null,
    Sl = null,
    Ya = new Map(),
    Ga = new Map(),
    wl = [],
    $b =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Xp(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        vl = null;
        break;
      case "dragenter":
      case "dragleave":
        kl = null;
        break;
      case "mouseover":
      case "mouseout":
        Sl = null;
        break;
      case "pointerover":
      case "pointerout":
        Ya.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ga.delete(n.pointerId);
    }
  }
  function Fa(e, n, r, u, f, d) {
    return e === null || e.nativeEvent !== d
      ? ((e = {
          blockedOn: n,
          domEventName: r,
          eventSystemFlags: u,
          nativeEvent: d,
          targetContainers: [f],
        }),
        n !== null && ((n = rr(n)), n !== null && Fp(n)),
        e)
      : ((e.eventSystemFlags |= u),
        (n = e.targetContainers),
        f !== null && n.indexOf(f) === -1 && n.push(f),
        e);
  }
  function Pb(e, n, r, u, f) {
    switch (n) {
      case "focusin":
        return ((vl = Fa(vl, e, n, r, u, f)), !0);
      case "dragenter":
        return ((kl = Fa(kl, e, n, r, u, f)), !0);
      case "mouseover":
        return ((Sl = Fa(Sl, e, n, r, u, f)), !0);
      case "pointerover":
        var d = f.pointerId;
        return (Ya.set(d, Fa(Ya.get(d) || null, e, n, r, u, f)), !0);
      case "gotpointercapture":
        return (
          (d = f.pointerId),
          Ga.set(d, Fa(Ga.get(d) || null, e, n, r, u, f)),
          !0
        );
    }
    return !1;
  }
  function $p(e) {
    var n = lr(e.target);
    if (n !== null) {
      var r = c(n);
      if (r !== null) {
        if (((n = r.tag), n === 13)) {
          if (((n = s(r)), n !== null)) {
            ((e.blockedOn = n),
              Iy(e.priority, function () {
                if (r.tag === 13) {
                  var u = Wt();
                  u = oo(u);
                  var f = gr(r, u);
                  (f !== null && en(f, r, u), dc(r, u));
                }
              }));
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Tu(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = mc(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var u = new r.constructor(r.type, r);
        ((xo = u), r.target.dispatchEvent(u), (xo = null));
      } else return ((n = rr(r)), n !== null && Fp(n), (e.blockedOn = r), !1);
      n.shift();
    }
    return !0;
  }
  function Pp(e, n, r) {
    Tu(e) && r.delete(n);
  }
  function Kb() {
    ((yc = !1),
      vl !== null && Tu(vl) && (vl = null),
      kl !== null && Tu(kl) && (kl = null),
      Sl !== null && Tu(Sl) && (Sl = null),
      Ya.forEach(Pp),
      Ga.forEach(Pp));
  }
  function Cu(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null),
      yc ||
        ((yc = !0),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, Kb)));
  }
  var Ru = null;
  function Kp(e) {
    Ru !== e &&
      ((Ru = e),
      t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
        Ru === e && (Ru = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n],
            u = e[n + 1],
            f = e[n + 2];
          if (typeof u != "function") {
            if (gc(u || r) === null) continue;
            break;
          }
          var d = rr(r);
          d !== null &&
            (e.splice(n, 3),
            (n -= 3),
            gs(d, { pending: !0, data: f, method: r.method, action: u }, u, f));
        }
      }));
  }
  function Qa(e) {
    function n(T) {
      return Cu(T, e);
    }
    (vl !== null && Cu(vl, e),
      kl !== null && Cu(kl, e),
      Sl !== null && Cu(Sl, e),
      Ya.forEach(n),
      Ga.forEach(n));
    for (var r = 0; r < wl.length; r++) {
      var u = wl[r];
      u.blockedOn === e && (u.blockedOn = null);
    }
    for (; 0 < wl.length && ((r = wl[0]), r.blockedOn === null); )
      ($p(r), r.blockedOn === null && wl.shift());
    if (((r = (e.ownerDocument || e).$$reactFormReplay), r != null))
      for (u = 0; u < r.length; u += 3) {
        var f = r[u],
          d = r[u + 1],
          b = f[Vt] || null;
        if (typeof d == "function") b || Kp(r);
        else if (b) {
          var S = null;
          if (d && d.hasAttribute("formAction")) {
            if (((f = d), (b = d[Vt] || null))) S = b.formAction;
            else if (gc(f) !== null) continue;
          } else S = b.action;
          (typeof S == "function" ? (r[u + 1] = S) : (r.splice(u, 3), (u -= 3)),
            Kp(r));
        }
      }
  }
  function bc(e) {
    this._internalRoot = e;
  }
  ((Mu.prototype.render = bc.prototype.render =
    function (e) {
      var n = this._internalRoot;
      if (n === null) throw Error(i(409));
      var r = n.current,
        u = Wt();
      Yp(r, u, e, n, null, null);
    }),
    (Mu.prototype.unmount = bc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var n = e.containerInfo;
          (Yp(e.current, 2, null, e, null, null), fu(), (n[nr] = null));
        }
      }));
  function Mu(e) {
    this._internalRoot = e;
  }
  Mu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = ph();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < wl.length && n !== 0 && n < wl[r].priority; r++);
      (wl.splice(r, 0, e), r === 0 && $p(e));
    }
  };
  var Jp = l.version;
  if (Jp !== "19.1.0") throw Error(i(527, Jp, "19.1.0"));
  J.findDOMNode = function (e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function"
        ? Error(i(188))
        : ((e = Object.keys(e).join(",")), Error(i(268, e)));
    return (
      (e = p(n)),
      (e = e !== null ? m(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Jb = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zu.isDisabled && zu.supportsFiber)
      try {
        ((I = zu.inject(Jb)), (W = zu));
      } catch {}
  }
  return (
    ($a.createRoot = function (e, n) {
      if (!o(e)) throw Error(i(299));
      var r = !1,
        u = "",
        f = pd,
        d = md,
        b = gd,
        S = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (r = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (f = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (b = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (S = n.unstable_transitionCallbacks)),
        (n = Zp(e, 1, !1, null, null, r, u, f, d, b, S, null)),
        (e[nr] = n.current),
        ec(e),
        new bc(n)
      );
    }),
    ($a.hydrateRoot = function (e, n, r) {
      if (!o(e)) throw Error(i(299));
      var u = !1,
        f = "",
        d = pd,
        b = md,
        S = gd,
        T = null,
        H = null;
      return (
        r != null &&
          (r.unstable_strictMode === !0 && (u = !0),
          r.identifierPrefix !== void 0 && (f = r.identifierPrefix),
          r.onUncaughtError !== void 0 && (d = r.onUncaughtError),
          r.onCaughtError !== void 0 && (b = r.onCaughtError),
          r.onRecoverableError !== void 0 && (S = r.onRecoverableError),
          r.unstable_transitionCallbacks !== void 0 &&
            (T = r.unstable_transitionCallbacks),
          r.formState !== void 0 && (H = r.formState)),
        (n = Zp(e, 1, !0, n, r ?? null, u, f, d, b, S, T, H)),
        (n.context = Ip(null)),
        (r = n.current),
        (u = Wt()),
        (u = oo(u)),
        (f = il(u)),
        (f.callback = null),
        ul(r, f, u),
        (r = u),
        (n.current.lanes = r),
        Wr(n, r),
        _n(n),
        (e[nr] = n.current),
        ec(e),
        new Mu(n)
      );
    }),
    ($a.version = "19.1.0"),
    $a
  );
}
var o1;
function ox() {
  if (o1) return vc.exports;
  o1 = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (l) {
        console.error(l);
      }
  }
  return (t(), (vc.exports = ux()), vc.exports);
}
var sx = ox(),
  E = Wu();
const Mf = gi(E);
(!globalThis.EventTarget || !globalThis.Event) &&
  console.error(`
  PartySocket requires a global 'EventTarget' class to be available!
  You can polyfill this global by adding this to your code before any partysocket imports: 
  
  \`\`\`
  import 'partysocket/event-target-polyfill';
  \`\`\`
  Please file an issue at https://github.com/partykit/partykit if you're still having trouble.
`);
var Cm = class extends Event {
    message;
    error;
    constructor(t, l) {
      (super("error", l), (this.message = t.message), (this.error = t));
    }
  },
  Rm = class extends Event {
    code;
    reason;
    wasClean = !0;
    constructor(t = 1e3, l = "", a) {
      (super("close", a), (this.code = t), (this.reason = l));
    }
  },
  Ac = { Event, ErrorEvent: Cm, CloseEvent: Rm };
function cx(t, l) {
  if (!t) throw new Error(l);
}
function fx(t) {
  return new t.constructor(t.type, t);
}
function hx(t) {
  return "data" in t
    ? new MessageEvent(t.type, t)
    : "code" in t || "reason" in t
      ? new Rm(t.code || 1999, t.reason || "unknown reason", t)
      : "error" in t
        ? new Cm(t.error, t)
        : new Event(t.type, t);
}
var s1,
  dx =
    typeof process < "u" &&
    typeof ((s1 = process.versions) == null ? void 0 : s1.node) < "u" &&
    typeof document > "u",
  Du = dx ? hx : fx,
  Ql = {
    maxReconnectionDelay: 1e4,
    minReconnectionDelay: 1e3 + Math.random() * 4e3,
    minUptime: 5e3,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4e3,
    maxRetries: Number.POSITIVE_INFINITY,
    maxEnqueuedMessages: Number.POSITIVE_INFINITY,
  },
  c1 = !1,
  px = class Kl extends EventTarget {
    _ws;
    _retryCount = -1;
    _uptimeTimeout;
    _connectTimeout;
    _shouldReconnect = !0;
    _connectLock = !1;
    _binaryType = "blob";
    _closeCalled = !1;
    _messageQueue = [];
    _debugLogger = console.log.bind(console);
    _url;
    _protocols;
    _options;
    constructor(l, a, i = {}) {
      (super(),
        (this._url = l),
        (this._protocols = a),
        (this._options = i),
        this._options.startClosed && (this._shouldReconnect = !1),
        this._options.debugLogger &&
          (this._debugLogger = this._options.debugLogger),
        this._connect());
    }
    static get CONNECTING() {
      return 0;
    }
    static get OPEN() {
      return 1;
    }
    static get CLOSING() {
      return 2;
    }
    static get CLOSED() {
      return 3;
    }
    get CONNECTING() {
      return Kl.CONNECTING;
    }
    get OPEN() {
      return Kl.OPEN;
    }
    get CLOSING() {
      return Kl.CLOSING;
    }
    get CLOSED() {
      return Kl.CLOSED;
    }
    get binaryType() {
      return this._ws ? this._ws.binaryType : this._binaryType;
    }
    set binaryType(l) {
      ((this._binaryType = l), this._ws && (this._ws.binaryType = l));
    }
    get retryCount() {
      return Math.max(this._retryCount, 0);
    }
    get bufferedAmount() {
      return (
        this._messageQueue.reduce(
          (a, i) => (
            typeof i == "string"
              ? (a += i.length)
              : i instanceof Blob
                ? (a += i.size)
                : (a += i.byteLength),
            a
          ),
          0
        ) + (this._ws ? this._ws.bufferedAmount : 0)
      );
    }
    get extensions() {
      return this._ws ? this._ws.extensions : "";
    }
    get protocol() {
      return this._ws ? this._ws.protocol : "";
    }
    get readyState() {
      return this._ws
        ? this._ws.readyState
        : this._options.startClosed
          ? Kl.CLOSED
          : Kl.CONNECTING;
    }
    get url() {
      return this._ws ? this._ws.url : "";
    }
    get shouldReconnect() {
      return this._shouldReconnect;
    }
    onclose = null;
    onerror = null;
    onmessage = null;
    onopen = null;
    close(l = 1e3, a) {
      if (
        ((this._closeCalled = !0),
        (this._shouldReconnect = !1),
        this._clearTimeouts(),
        !this._ws)
      ) {
        this._debug("close enqueued: no ws instance");
        return;
      }
      if (this._ws.readyState === this.CLOSED) {
        this._debug("close: already closed");
        return;
      }
      this._ws.close(l, a);
    }
    reconnect(l, a) {
      ((this._shouldReconnect = !0),
        (this._closeCalled = !1),
        (this._retryCount = -1),
        !this._ws || this._ws.readyState === this.CLOSED
          ? this._connect()
          : (this._disconnect(l, a), this._connect()));
    }
    send(l) {
      if (this._ws && this._ws.readyState === this.OPEN)
        (this._debug("send", l), this._ws.send(l));
      else {
        const { maxEnqueuedMessages: a = Ql.maxEnqueuedMessages } =
          this._options;
        this._messageQueue.length < a &&
          (this._debug("enqueue", l), this._messageQueue.push(l));
      }
    }
    _debug(...l) {
      this._options.debug && this._debugLogger("RWS>", ...l);
    }
    _getNextDelay() {
      const {
        reconnectionDelayGrowFactor: l = Ql.reconnectionDelayGrowFactor,
        minReconnectionDelay: a = Ql.minReconnectionDelay,
        maxReconnectionDelay: i = Ql.maxReconnectionDelay,
      } = this._options;
      let o = 0;
      return (
        this._retryCount > 0 &&
          ((o = a * l ** (this._retryCount - 1)), o > i && (o = i)),
        this._debug("next delay", o),
        o
      );
    }
    _wait() {
      return new Promise((l) => {
        setTimeout(l, this._getNextDelay());
      });
    }
    _getNextProtocols(l) {
      if (!l) return Promise.resolve(null);
      if (typeof l == "string" || Array.isArray(l)) return Promise.resolve(l);
      if (typeof l == "function") {
        const a = l();
        if (!a) return Promise.resolve(null);
        if (typeof a == "string" || Array.isArray(a)) return Promise.resolve(a);
        if (a.then) return a;
      }
      throw Error("Invalid protocols");
    }
    _getNextUrl(l) {
      if (typeof l == "string") return Promise.resolve(l);
      if (typeof l == "function") {
        const a = l();
        if (typeof a == "string") return Promise.resolve(a);
        if (a.then) return a;
      }
      throw Error("Invalid URL");
    }
    _connect() {
      if (this._connectLock || !this._shouldReconnect) return;
      this._connectLock = !0;
      const {
        maxRetries: l = Ql.maxRetries,
        connectionTimeout: a = Ql.connectionTimeout,
      } = this._options;
      if (this._retryCount >= l) {
        this._debug("max retries reached", this._retryCount, ">=", l);
        return;
      }
      (this._retryCount++,
        this._debug("connect", this._retryCount),
        this._removeListeners(),
        this._wait()
          .then(() =>
            Promise.all([
              this._getNextUrl(this._url),
              this._getNextProtocols(this._protocols || null),
            ])
          )
          .then(([i, o]) => {
            if (this._closeCalled) {
              this._connectLock = !1;
              return;
            }
            !this._options.WebSocket &&
              typeof WebSocket > "u" &&
              !c1 &&
              (console.error(`‼️ No WebSocket implementation available. You should define options.WebSocket. 

For example, if you're using node.js, run \`npm install ws\`, and then in your code:

import PartySocket from 'partysocket';
import WS from 'ws';

const partysocket = new PartySocket({
  host: "127.0.0.1:1999",
  room: "test-room",
  WebSocket: WS
});

`),
              (c1 = !0));
            const c = this._options.WebSocket || WebSocket;
            (this._debug("connect", { url: i, protocols: o }),
              (this._ws = o ? new c(i, o) : new c(i)),
              (this._ws.binaryType = this._binaryType),
              (this._connectLock = !1),
              this._addListeners(),
              (this._connectTimeout = setTimeout(
                () => this._handleTimeout(),
                a
              )));
          })
          .catch((i) => {
            ((this._connectLock = !1),
              this._handleError(new Ac.ErrorEvent(Error(i.message), this)));
          }));
    }
    _handleTimeout() {
      (this._debug("timeout event"),
        this._handleError(new Ac.ErrorEvent(Error("TIMEOUT"), this)));
    }
    _disconnect(l = 1e3, a) {
      if ((this._clearTimeouts(), !!this._ws)) {
        this._removeListeners();
        try {
          ((this._ws.readyState === this.OPEN ||
            this._ws.readyState === this.CONNECTING) &&
            this._ws.close(l, a),
            this._handleClose(new Ac.CloseEvent(l, a, this)));
        } catch {}
      }
    }
    _acceptOpen() {
      (this._debug("accept open"), (this._retryCount = 0));
    }
    _handleOpen = (l) => {
      this._debug("open event");
      const { minUptime: a = Ql.minUptime } = this._options;
      (clearTimeout(this._connectTimeout),
        (this._uptimeTimeout = setTimeout(() => this._acceptOpen(), a)),
        cx(this._ws, "WebSocket is not defined"),
        (this._ws.binaryType = this._binaryType),
        this._messageQueue.forEach((i) => {
          var o;
          return (o = this._ws) == null ? void 0 : o.send(i);
        }),
        (this._messageQueue = []),
        this.onopen && this.onopen(l),
        this.dispatchEvent(Du(l)));
    };
    _handleMessage = (l) => {
      (this._debug("message event"),
        this.onmessage && this.onmessage(l),
        this.dispatchEvent(Du(l)));
    };
    _handleError = (l) => {
      (this._debug("error event", l.message),
        this._disconnect(void 0, l.message === "TIMEOUT" ? "timeout" : void 0),
        this.onerror && this.onerror(l),
        this._debug("exec error listeners"),
        this.dispatchEvent(Du(l)),
        this._connect());
    };
    _handleClose = (l) => {
      (this._debug("close event"),
        this._clearTimeouts(),
        this._shouldReconnect && this._connect(),
        this.onclose && this.onclose(l),
        this.dispatchEvent(Du(l)));
    };
    _removeListeners() {
      this._ws &&
        (this._debug("removeListeners"),
        this._ws.removeEventListener("open", this._handleOpen),
        this._ws.removeEventListener("close", this._handleClose),
        this._ws.removeEventListener("message", this._handleMessage),
        this._ws.removeEventListener("error", this._handleError));
    }
    _addListeners() {
      this._ws &&
        (this._debug("addListeners"),
        this._ws.addEventListener("open", this._handleOpen),
        this._ws.addEventListener("close", this._handleClose),
        this._ws.addEventListener("message", this._handleMessage),
        this._ws.addEventListener("error", this._handleError));
    }
    _clearTimeouts() {
      (clearTimeout(this._connectTimeout), clearTimeout(this._uptimeTimeout));
    }
  };
/*!
 * Reconnecting WebSocket
 * by Pedro Ladaria <pedro.ladaria@gmail.com>
 * https://github.com/pladaria/reconnecting-websocket
 * License MIT
 */ var mx = (t) => t[1] !== null && t[1] !== void 0;
function gx() {
  if (typeof crypto < "u" && crypto.randomUUID) return crypto.randomUUID();
  let t = new Date().getTime(),
    l =
      (typeof performance < "u" &&
        performance.now &&
        performance.now() * 1e3) ||
      0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
    let i = Math.random() * 16;
    return (
      t > 0
        ? ((i = (t + i) % 16 | 0), (t = Math.floor(t / 16)))
        : ((i = (l + i) % 16 | 0), (l = Math.floor(l / 16))),
      (a === "x" ? i : (i & 3) | 8).toString(16)
    );
  });
}
function Mm(t, l, a = {}) {
  const {
    host: i,
    path: o,
    protocol: c,
    room: s,
    party: h,
    basePath: p,
    prefix: m,
    query: y,
  } = t;
  let g = i.replace(/^(http|https|ws|wss):\/\//, "");
  if ((g.endsWith("/") && (g = g.slice(0, -1)), o?.startsWith("/")))
    throw new Error("path must not start with a slash");
  const k = h ?? "main",
    v = o ? `/${o}` : "",
    A =
      c ||
      (g.startsWith("localhost:") ||
      g.startsWith("127.0.0.1:") ||
      g.startsWith("192.168.") ||
      g.startsWith("10.") ||
      (g.startsWith("172.") &&
        g.split(".")[1] >= "16" &&
        g.split(".")[1] <= "31") ||
      g.startsWith("[::ffff:7f00:1]:")
        ? l
        : `${l}s`),
    C = `${A}://${g}/${p || `${m || "parties"}/${k}/${s}`}${v}`,
    U = (Y = {}) =>
      `${C}?${new URLSearchParams([...Object.entries(a), ...Object.entries(Y).filter(mx)])}`,
    R = typeof y == "function" ? async () => U(await y()) : U(y);
  return {
    host: g,
    path: v,
    room: s,
    name: k,
    protocol: A,
    partyUrl: C,
    urlProvider: R,
  };
}
var yx = class extends px {
  constructor(t) {
    const l = f1(t);
    (super(l.urlProvider, l.protocols, l.socketOptions),
      (this.partySocketOptions = t),
      this.setWSProperties(l));
  }
  _pk;
  _pkurl;
  name;
  room;
  host;
  path;
  updateProperties(t) {
    const l = f1({
      ...this.partySocketOptions,
      ...t,
      host: t.host ?? this.host,
      room: t.room ?? this.room,
      path: t.path ?? this.path,
    });
    ((this._url = l.urlProvider),
      (this._protocols = l.protocols),
      (this._options = l.socketOptions),
      this.setWSProperties(l));
  }
  setWSProperties(t) {
    const { _pk: l, _pkurl: a, name: i, room: o, host: c, path: s } = t;
    ((this._pk = l),
      (this._pkurl = a),
      (this.name = i),
      (this.room = o),
      (this.host = c),
      (this.path = s));
  }
  reconnect(t, l) {
    if (!this.room || !this.host)
      throw new Error(
        "The room and host must be set before connecting, use `updateProperties` method to set them or pass them to the constructor."
      );
    super.reconnect(t, l);
  }
  get id() {
    return this._pk;
  }
  get roomUrl() {
    return this._pkurl;
  }
  static async fetch(t, l) {
    const a = Mm(t, "http"),
      i =
        typeof a.urlProvider == "string"
          ? a.urlProvider
          : await a.urlProvider();
    return (t.fetch ?? fetch)(i, l);
  }
};
function f1(t) {
  const {
      id: l,
      host: a,
      path: i,
      party: o,
      room: c,
      protocol: s,
      query: h,
      protocols: p,
      ...m
    } = t,
    y = l || gx(),
    g = Mm(t, "ws", { _pk: y });
  return {
    _pk: y,
    _pkurl: g.partyUrl,
    name: g.name,
    room: g.room,
    host: g.host,
    path: g.path,
    protocols: p,
    socketOptions: m,
    urlProvider: g.urlProvider,
  };
}
var bx = (t, l) => {
    const a = E.useRef(l);
    ((a.current = l),
      E.useEffect(() => {
        const i = (h) => {
            var p, m;
            return (m = (p = a.current) == null ? void 0 : p.onOpen) == null
              ? void 0
              : m.call(p, h);
          },
          o = (h) => {
            var p, m;
            return (m = (p = a.current) == null ? void 0 : p.onMessage) == null
              ? void 0
              : m.call(p, h);
          },
          c = (h) => {
            var p, m;
            return (m = (p = a.current) == null ? void 0 : p.onClose) == null
              ? void 0
              : m.call(p, h);
          },
          s = (h) => {
            var p, m;
            return (m = (p = a.current) == null ? void 0 : p.onError) == null
              ? void 0
              : m.call(p, h);
          };
        return (
          t.addEventListener("open", i),
          t.addEventListener("close", c),
          t.addEventListener("error", s),
          t.addEventListener("message", o),
          () => {
            (t.removeEventListener("open", i),
              t.removeEventListener("close", c),
              t.removeEventListener("error", s),
              t.removeEventListener("message", o));
          }
        );
      }, [t]));
  },
  xx = (t) => [
    t.startClosed,
    t.minUptime,
    t.maxRetries,
    t.connectionTimeout,
    t.maxEnqueuedMessages,
    t.maxReconnectionDelay,
    t.minReconnectionDelay,
    t.reconnectionDelayGrowFactor,
    t.debug,
  ];
function vx({ options: t, createSocket: l, createSocketMemoKey: a }) {
  const i = a(t),
    o = E.useMemo(() => t, [i]),
    [c, s] = E.useState(() => l({ ...o, startClosed: !0 })),
    h = E.useRef(null),
    p = E.useRef(l);
  return (
    (p.current = l),
    E.useEffect(() => {
      if (h.current === c) {
        const m = p.current({ ...o, startClosed: !1 });
        s(m);
      } else
        return (
          !h.current && o.startClosed !== !0 && c.reconnect(),
          (h.current = c),
          () => {
            c.close();
          }
        );
    }, [c, o]),
    c
  );
}
function kx(t) {
  const { host: l, ...a } = t,
    i = vx({
      options: {
        host:
          l ||
          (typeof window < "u" ? window.location.host : "dummy-domain.com"),
        ...a,
      },
      createSocket: (o) => new yx(o),
      createSocketMemoKey: (o) =>
        JSON.stringify([
          o.query,
          o.id,
          o.host,
          o.room,
          o.party,
          o.path,
          o.protocol,
          o.protocols,
          o.basePath,
          o.prefix,
          ...xx(o),
        ]),
    });
  return (bx(i, t), i);
}
function Sx(t) {
  if (t === t.toUpperCase() && t !== t.toLowerCase())
    return t.toLowerCase().replace(/_/g, "-");
  let l = t.replace(/[A-Z]/g, (a) => `-${a.toLowerCase()}`);
  return (
    (l = l.startsWith("-") ? l.slice(1) : l),
    l.replace(/_/g, "-").replace(/-$/, "")
  );
}
function wx(t) {
  const l = Sx(t.agent),
    a = E.useRef(new Map()),
    i = kx({
      party: l,
      prefix: "agents",
      room: t.name || "default",
      ...t,
      onMessage: (c) => {
        if (typeof c.data == "string") {
          let s;
          try {
            s = JSON.parse(c.data);
          } catch {
            return t.onMessage?.(c);
          }
          if (s.type === "cf_agent_state") {
            t.onStateUpdate?.(s.state, "server");
            return;
          }
          if (s.type === "cf_agent_mcp_servers") {
            t.onMcpUpdate?.(s.mcp);
            return;
          }
          if (s.type === "rpc") {
            const h = s,
              p = a.current.get(h.id);
            if (!p) return;
            if (!h.success) {
              (p.reject(new Error(h.error)),
                a.current.delete(h.id),
                p.stream?.onError?.(h.error));
              return;
            }
            "done" in h
              ? h.done
                ? (p.resolve(h.result),
                  a.current.delete(h.id),
                  p.stream?.onDone?.(h.result))
                : p.stream?.onChunk?.(h.result)
              : (p.resolve(h.result), a.current.delete(h.id));
            return;
          }
        }
        t.onMessage?.(c);
      },
    }),
    o = E.useCallback(
      (c, s = [], h) =>
        new Promise((p, m) => {
          const y = Math.random().toString(36).slice(2);
          a.current.set(y, { reject: m, resolve: p, stream: h });
          const g = { args: s, id: y, method: c, type: "rpc" };
          i.send(JSON.stringify(g));
        }),
      [i]
    );
  return (
    (i.setState = (c) => {
      (i.send(JSON.stringify({ state: c, type: "cf_agent_state" })),
        t.onStateUpdate?.(c, "client"));
    }),
    (i.call = o),
    (i.agent = l),
    (i.name = t.name || "default"),
    (i.stub = new Proxy(
      {},
      {
        get:
          (c, s) =>
          (...h) =>
            o(s, h),
      }
    )),
    i.agent !== i.agent.toLowerCase() &&
      console.warn(
        `Agent name: ${i.agent} should probably be in lowercase. Received: ${i.agent}`
      ),
    i
  );
}
var zm = "vercel.ai.error",
  Ex = Symbol.for(zm),
  Dm,
  Ax = class Om extends Error {
    constructor({ name: l, message: a, cause: i }) {
      (super(a), (this[Dm] = !0), (this.name = l), (this.cause = i));
    }
    static isInstance(l) {
      return Om.hasMarker(l, zm);
    }
    static hasMarker(l, a) {
      const i = Symbol.for(a);
      return (
        l != null &&
        typeof l == "object" &&
        i in l &&
        typeof l[i] == "boolean" &&
        l[i] === !0
      );
    }
  };
Dm = Ex;
var Qr = Ax;
function Nm(t) {
  return t == null
    ? "unknown error"
    : typeof t == "string"
      ? t
      : t instanceof Error
        ? t.message
        : JSON.stringify(t);
}
var Lm = "AI_InvalidArgumentError",
  Hm = `vercel.ai.error.${Lm}`,
  _x = Symbol.for(Hm),
  jm,
  Tx = class extends Qr {
    constructor({ message: t, cause: l, argument: a }) {
      (super({ name: Lm, message: t, cause: l }),
        (this[jm] = !0),
        (this.argument = a));
    }
    static isInstance(t) {
      return Qr.hasMarker(t, Hm);
    }
  };
jm = _x;
var Um = "AI_JSONParseError",
  Bm = `vercel.ai.error.${Um}`,
  Cx = Symbol.for(Bm),
  Vm,
  h1 = class extends Qr {
    constructor({ text: t, cause: l }) {
      (super({
        name: Um,
        message: `JSON parsing failed: Text: ${t}.
Error message: ${Nm(l)}`,
        cause: l,
      }),
        (this[Vm] = !0),
        (this.text = t));
    }
    static isInstance(t) {
      return Qr.hasMarker(t, Bm);
    }
  };
Vm = Cx;
var qm = "AI_TypeValidationError",
  Zm = `vercel.ai.error.${qm}`,
  Rx = Symbol.for(Zm),
  Im,
  Mx = class tf extends Qr {
    constructor({ value: l, cause: a }) {
      (super({
        name: qm,
        message: `Type validation failed: Value: ${JSON.stringify(l)}.
Error message: ${Nm(a)}`,
        cause: a,
      }),
        (this[Im] = !0),
        (this.value = l));
    }
    static isInstance(l) {
      return Qr.hasMarker(l, Zm);
    }
    static wrap({ value: l, cause: a }) {
      return tf.isInstance(a) && a.value === l
        ? a
        : new tf({ value: l, cause: a });
    }
  };
Im = Rx;
var d1 = Mx;
let zx =
  (t, l = 21) =>
  (a = l) => {
    let i = "",
      o = a | 0;
    for (; o--; ) i += t[(Math.random() * t.length) | 0];
    return i;
  };
var Xl = { exports: {} },
  p1;
function Dx() {
  if (p1) return Xl.exports;
  p1 = 1;
  const t = typeof Buffer < "u",
    l =
      /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,
    a =
      /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function i(h, p, m) {
    (m == null && p !== null && typeof p == "object" && ((m = p), (p = void 0)),
      t && Buffer.isBuffer(h) && (h = h.toString()),
      h && h.charCodeAt(0) === 65279 && (h = h.slice(1)));
    const y = JSON.parse(h, p);
    if (y === null || typeof y != "object") return y;
    const g = (m && m.protoAction) || "error",
      k = (m && m.constructorAction) || "error";
    if (g === "ignore" && k === "ignore") return y;
    if (g !== "ignore" && k !== "ignore") {
      if (l.test(h) === !1 && a.test(h) === !1) return y;
    } else if (g !== "ignore" && k === "ignore") {
      if (l.test(h) === !1) return y;
    } else if (a.test(h) === !1) return y;
    return o(y, { protoAction: g, constructorAction: k, safe: m && m.safe });
  }
  function o(
    h,
    { protoAction: p = "error", constructorAction: m = "error", safe: y } = {}
  ) {
    let g = [h];
    for (; g.length; ) {
      const k = g;
      g = [];
      for (const v of k) {
        if (
          p !== "ignore" &&
          Object.prototype.hasOwnProperty.call(v, "__proto__")
        ) {
          if (y === !0) return null;
          if (p === "error")
            throw new SyntaxError(
              "Object contains forbidden prototype property"
            );
          delete v.__proto__;
        }
        if (
          m !== "ignore" &&
          Object.prototype.hasOwnProperty.call(v, "constructor") &&
          Object.prototype.hasOwnProperty.call(v.constructor, "prototype")
        ) {
          if (y === !0) return null;
          if (m === "error")
            throw new SyntaxError(
              "Object contains forbidden prototype property"
            );
          delete v.constructor;
        }
        for (const A in v) {
          const C = v[A];
          C && typeof C == "object" && g.push(C);
        }
      }
    }
    return h;
  }
  function c(h, p, m) {
    const y = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return i(h, p, m);
    } finally {
      Error.stackTraceLimit = y;
    }
  }
  function s(h, p) {
    const m = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return i(h, p, { safe: !0 });
    } catch {
      return null;
    } finally {
      Error.stackTraceLimit = m;
    }
  }
  return (
    (Xl.exports = c),
    (Xl.exports.default = c),
    (Xl.exports.parse = c),
    (Xl.exports.safeParse = s),
    (Xl.exports.scan = o),
    Xl.exports
  );
}
var Ox = Dx();
const Nx = gi(Ox);
var Lx = ({
    prefix: t,
    size: l = 16,
    alphabet:
      a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    separator: i = "-",
  } = {}) => {
    const o = zx(a, l);
    if (t == null) return o;
    if (a.includes(i))
      throw new Tx({
        argument: "separator",
        message: `The separator "${i}" must not be part of the alphabet "${a}".`,
      });
    return (c) => `${t}${i}${o(c)}`;
  },
  zf = Lx(),
  nf = Symbol.for("vercel.ai.validator");
function Hx(t) {
  return { [nf]: !0, validate: t };
}
function jx(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    nf in t &&
    t[nf] === !0 &&
    "validate" in t
  );
}
function Ux(t) {
  return jx(t) ? t : Bx(t);
}
function Bx(t) {
  return Hx((l) => {
    const a = t.safeParse(l);
    return a.success
      ? { success: !0, value: a.data }
      : { success: !1, error: a.error };
  });
}
function Vx({ value: t, schema: l }) {
  const a = Ux(l);
  try {
    if (a.validate == null) return { success: !0, value: t };
    const i = a.validate(t);
    return i.success
      ? i
      : { success: !1, error: d1.wrap({ value: t, cause: i.error }) };
  } catch (i) {
    return { success: !1, error: d1.wrap({ value: t, cause: i }) };
  }
}
function m1({ text: t, schema: l }) {
  try {
    const a = Nx.parse(t);
    if (l == null) return { success: !0, value: a, rawValue: a };
    const i = Vx({ value: a, schema: l });
    return i.success ? { ...i, rawValue: a } : i;
  } catch (a) {
    return {
      success: !1,
      error: h1.isInstance(a) ? a : new h1({ text: t, cause: a }),
    };
  }
}
new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
var ui = {
    code: "0",
    name: "text",
    parse: (t) => {
      if (typeof t != "string")
        throw new Error('"text" parts expect a string value.');
      return { type: "text", value: t };
    },
  },
  oi = {
    code: "3",
    name: "error",
    parse: (t) => {
      if (typeof t != "string")
        throw new Error('"error" parts expect a string value.');
      return { type: "error", value: t };
    },
  },
  si = {
    code: "4",
    name: "assistant_message",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("id" in t) ||
        !("role" in t) ||
        !("content" in t) ||
        typeof t.id != "string" ||
        typeof t.role != "string" ||
        t.role !== "assistant" ||
        !Array.isArray(t.content) ||
        !t.content.every(
          (l) =>
            l != null &&
            typeof l == "object" &&
            "type" in l &&
            l.type === "text" &&
            "text" in l &&
            l.text != null &&
            typeof l.text == "object" &&
            "value" in l.text &&
            typeof l.text.value == "string"
        )
      )
        throw new Error(
          '"assistant_message" parts expect an object with an "id", "role", and "content" property.'
        );
      return { type: "assistant_message", value: t };
    },
  },
  ci = {
    code: "5",
    name: "assistant_control_data",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("threadId" in t) ||
        !("messageId" in t) ||
        typeof t.threadId != "string" ||
        typeof t.messageId != "string"
      )
        throw new Error(
          '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.'
        );
      return {
        type: "assistant_control_data",
        value: { threadId: t.threadId, messageId: t.messageId },
      };
    },
  },
  fi = {
    code: "6",
    name: "data_message",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("role" in t) ||
        !("data" in t) ||
        typeof t.role != "string" ||
        t.role !== "data"
      )
        throw new Error(
          '"data_message" parts expect an object with a "role" and "data" property.'
        );
      return { type: "data_message", value: t };
    },
  },
  qx = [ui, oi, si, ci, fi];
(ui.code + "", oi.code + "", si.code + "", ci.code + "", fi.code + "");
(ui.name + "",
  ui.code,
  oi.name + "",
  oi.code,
  si.name + "",
  si.code,
  ci.name + "",
  ci.code,
  fi.name + "",
  fi.code);
qx.map((t) => t.code);
function Zx({ promptTokens: t, completionTokens: l }) {
  return { promptTokens: t, completionTokens: l, totalTokens: t + l };
}
function Ix(t) {
  const l = ["ROOT"];
  let a = -1,
    i = null;
  function o(p, m, y) {
    switch (p) {
      case '"': {
        ((a = m), l.pop(), l.push(y), l.push("INSIDE_STRING"));
        break;
      }
      case "f":
      case "t":
      case "n": {
        ((a = m), (i = m), l.pop(), l.push(y), l.push("INSIDE_LITERAL"));
        break;
      }
      case "-": {
        (l.pop(), l.push(y), l.push("INSIDE_NUMBER"));
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        ((a = m), l.pop(), l.push(y), l.push("INSIDE_NUMBER"));
        break;
      }
      case "{": {
        ((a = m), l.pop(), l.push(y), l.push("INSIDE_OBJECT_START"));
        break;
      }
      case "[": {
        ((a = m), l.pop(), l.push(y), l.push("INSIDE_ARRAY_START"));
        break;
      }
    }
  }
  function c(p, m) {
    switch (p) {
      case ",": {
        (l.pop(), l.push("INSIDE_OBJECT_AFTER_COMMA"));
        break;
      }
      case "}": {
        ((a = m), l.pop());
        break;
      }
    }
  }
  function s(p, m) {
    switch (p) {
      case ",": {
        (l.pop(), l.push("INSIDE_ARRAY_AFTER_COMMA"));
        break;
      }
      case "]": {
        ((a = m), l.pop());
        break;
      }
    }
  }
  for (let p = 0; p < t.length; p++) {
    const m = t[p];
    switch (l[l.length - 1]) {
      case "ROOT":
        o(m, p, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (m) {
          case '"': {
            (l.pop(), l.push("INSIDE_OBJECT_KEY"));
            break;
          }
          case "}": {
            ((a = p), l.pop());
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (m) {
          case '"': {
            (l.pop(), l.push("INSIDE_OBJECT_KEY"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (m) {
          case '"': {
            (l.pop(), l.push("INSIDE_OBJECT_AFTER_KEY"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (m) {
          case ":": {
            (l.pop(), l.push("INSIDE_OBJECT_BEFORE_VALUE"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        o(m, p, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        c(m, p);
        break;
      }
      case "INSIDE_STRING": {
        switch (m) {
          case '"': {
            (l.pop(), (a = p));
            break;
          }
          case "\\": {
            l.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            a = p;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (m) {
          case "]": {
            ((a = p), l.pop());
            break;
          }
          default: {
            ((a = p), o(m, p, "INSIDE_ARRAY_AFTER_VALUE"));
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (m) {
          case ",": {
            (l.pop(), l.push("INSIDE_ARRAY_AFTER_COMMA"));
            break;
          }
          case "]": {
            ((a = p), l.pop());
            break;
          }
          default: {
            a = p;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        o(m, p, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        (l.pop(), (a = p));
        break;
      }
      case "INSIDE_NUMBER": {
        switch (m) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            a = p;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            (l.pop(),
              l[l.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && s(m, p),
              l[l.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && c(m, p));
            break;
          }
          case "}": {
            (l.pop(),
              l[l.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && c(m, p));
            break;
          }
          case "]": {
            (l.pop(),
              l[l.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && s(m, p));
            break;
          }
          default: {
            l.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const g = t.substring(i, p + 1);
        !"false".startsWith(g) && !"true".startsWith(g) && !"null".startsWith(g)
          ? (l.pop(),
            l[l.length - 1] === "INSIDE_OBJECT_AFTER_VALUE"
              ? c(m, p)
              : l[l.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && s(m, p))
          : (a = p);
        break;
      }
    }
  }
  let h = t.slice(0, a + 1);
  for (let p = l.length - 1; p >= 0; p--)
    switch (l[p]) {
      case "INSIDE_STRING": {
        h += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        h += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        h += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const y = t.substring(i, t.length);
        "true".startsWith(y)
          ? (h += "true".slice(y.length))
          : "false".startsWith(y)
            ? (h += "false".slice(y.length))
            : "null".startsWith(y) && (h += "null".slice(y.length));
      }
    }
  return h;
}
function Yx(t) {
  if (t === void 0) return { value: void 0, state: "undefined-input" };
  let l = m1({ text: t });
  return l.success
    ? { value: l.value, state: "successful-parse" }
    : ((l = m1({ text: Ix(t) })),
      l.success
        ? { value: l.value, state: "repaired-parse" }
        : { value: void 0, state: "failed-parse" });
}
var Gx = {
    code: "0",
    name: "text",
    parse: (t) => {
      if (typeof t != "string")
        throw new Error('"text" parts expect a string value.');
      return { type: "text", value: t };
    },
  },
  Fx = {
    code: "2",
    name: "data",
    parse: (t) => {
      if (!Array.isArray(t))
        throw new Error('"data" parts expect an array value.');
      return { type: "data", value: t };
    },
  },
  Qx = {
    code: "3",
    name: "error",
    parse: (t) => {
      if (typeof t != "string")
        throw new Error('"error" parts expect a string value.');
      return { type: "error", value: t };
    },
  },
  Xx = {
    code: "8",
    name: "message_annotations",
    parse: (t) => {
      if (!Array.isArray(t))
        throw new Error('"message_annotations" parts expect an array value.');
      return { type: "message_annotations", value: t };
    },
  },
  $x = {
    code: "9",
    name: "tool_call",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("toolCallId" in t) ||
        typeof t.toolCallId != "string" ||
        !("toolName" in t) ||
        typeof t.toolName != "string" ||
        !("args" in t) ||
        typeof t.args != "object"
      )
        throw new Error(
          '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.'
        );
      return { type: "tool_call", value: t };
    },
  },
  Px = {
    code: "a",
    name: "tool_result",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("toolCallId" in t) ||
        typeof t.toolCallId != "string" ||
        !("result" in t)
      )
        throw new Error(
          '"tool_result" parts expect an object with a "toolCallId" and a "result" property.'
        );
      return { type: "tool_result", value: t };
    },
  },
  Kx = {
    code: "b",
    name: "tool_call_streaming_start",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("toolCallId" in t) ||
        typeof t.toolCallId != "string" ||
        !("toolName" in t) ||
        typeof t.toolName != "string"
      )
        throw new Error(
          '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.'
        );
      return { type: "tool_call_streaming_start", value: t };
    },
  },
  Jx = {
    code: "c",
    name: "tool_call_delta",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("toolCallId" in t) ||
        typeof t.toolCallId != "string" ||
        !("argsTextDelta" in t) ||
        typeof t.argsTextDelta != "string"
      )
        throw new Error(
          '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.'
        );
      return { type: "tool_call_delta", value: t };
    },
  },
  Wx = {
    code: "d",
    name: "finish_message",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("finishReason" in t) ||
        typeof t.finishReason != "string"
      )
        throw new Error(
          '"finish_message" parts expect an object with a "finishReason" property.'
        );
      const l = { finishReason: t.finishReason };
      return (
        "usage" in t &&
          t.usage != null &&
          typeof t.usage == "object" &&
          "promptTokens" in t.usage &&
          "completionTokens" in t.usage &&
          (l.usage = {
            promptTokens:
              typeof t.usage.promptTokens == "number"
                ? t.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof t.usage.completionTokens == "number"
                ? t.usage.completionTokens
                : Number.NaN,
          }),
        { type: "finish_message", value: l }
      );
    },
  },
  ev = {
    code: "e",
    name: "finish_step",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("finishReason" in t) ||
        typeof t.finishReason != "string"
      )
        throw new Error(
          '"finish_step" parts expect an object with a "finishReason" property.'
        );
      const l = { finishReason: t.finishReason, isContinued: !1 };
      return (
        "usage" in t &&
          t.usage != null &&
          typeof t.usage == "object" &&
          "promptTokens" in t.usage &&
          "completionTokens" in t.usage &&
          (l.usage = {
            promptTokens:
              typeof t.usage.promptTokens == "number"
                ? t.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof t.usage.completionTokens == "number"
                ? t.usage.completionTokens
                : Number.NaN,
          }),
        "isContinued" in t &&
          typeof t.isContinued == "boolean" &&
          (l.isContinued = t.isContinued),
        { type: "finish_step", value: l }
      );
    },
  },
  tv = {
    code: "f",
    name: "start_step",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("messageId" in t) ||
        typeof t.messageId != "string"
      )
        throw new Error(
          '"start_step" parts expect an object with an "id" property.'
        );
      return { type: "start_step", value: { messageId: t.messageId } };
    },
  },
  nv = {
    code: "g",
    name: "reasoning",
    parse: (t) => {
      if (typeof t != "string")
        throw new Error('"reasoning" parts expect a string value.');
      return { type: "reasoning", value: t };
    },
  },
  lv = {
    code: "h",
    name: "source",
    parse: (t) => {
      if (t == null || typeof t != "object")
        throw new Error('"source" parts expect a Source object.');
      return { type: "source", value: t };
    },
  },
  rv = {
    code: "i",
    name: "redacted_reasoning",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("data" in t) ||
        typeof t.data != "string"
      )
        throw new Error(
          '"redacted_reasoning" parts expect an object with a "data" property.'
        );
      return { type: "redacted_reasoning", value: { data: t.data } };
    },
  },
  av = {
    code: "j",
    name: "reasoning_signature",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("signature" in t) ||
        typeof t.signature != "string"
      )
        throw new Error(
          '"reasoning_signature" parts expect an object with a "signature" property.'
        );
      return { type: "reasoning_signature", value: { signature: t.signature } };
    },
  },
  iv = {
    code: "k",
    name: "file",
    parse: (t) => {
      if (
        t == null ||
        typeof t != "object" ||
        !("data" in t) ||
        typeof t.data != "string" ||
        !("mimeType" in t) ||
        typeof t.mimeType != "string"
      )
        throw new Error(
          '"file" parts expect an object with a "data" and "mimeType" property.'
        );
      return { type: "file", value: t };
    },
  },
  Df = [Gx, Fx, Qx, Xx, $x, Px, Kx, Jx, Wx, ev, tv, nv, lv, rv, av, iv],
  uv = Object.fromEntries(Df.map((t) => [t.code, t]));
Object.fromEntries(Df.map((t) => [t.name, t.code]));
var ov = Df.map((t) => t.code),
  sv = (t) => {
    const l = t.indexOf(":");
    if (l === -1)
      throw new Error("Failed to parse stream string. No separator found.");
    const a = t.slice(0, l);
    if (!ov.includes(a))
      throw new Error(`Failed to parse stream string. Invalid code ${a}.`);
    const i = a,
      o = t.slice(l + 1),
      c = JSON.parse(o);
    return uv[i].parse(c);
  },
  cv = 10;
function fv(t, l) {
  const a = new Uint8Array(l);
  let i = 0;
  for (const o of t) (a.set(o, i), (i += o.length));
  return ((t.length = 0), a);
}
async function hv({
  stream: t,
  onTextPart: l,
  onReasoningPart: a,
  onReasoningSignaturePart: i,
  onRedactedReasoningPart: o,
  onSourcePart: c,
  onFilePart: s,
  onDataPart: h,
  onErrorPart: p,
  onToolCallStreamingStartPart: m,
  onToolCallDeltaPart: y,
  onToolCallPart: g,
  onToolResultPart: k,
  onMessageAnnotationsPart: v,
  onFinishMessagePart: A,
  onFinishStepPart: C,
  onStartStepPart: U,
}) {
  const R = t.getReader(),
    Y = new TextDecoder(),
    V = [];
  let ee = 0;
  for (;;) {
    const { value: O } = await R.read();
    if (O && (V.push(O), (ee += O.length), O[O.length - 1] !== cv)) continue;
    if (V.length === 0) break;
    const _ = fv(V, ee);
    ee = 0;
    const F = Y.decode(_, { stream: !0 })
      .split(
        `
`
      )
      .filter((q) => q !== "")
      .map(sv);
    for (const { type: q, value: K } of F)
      switch (q) {
        case "text":
          await l?.(K);
          break;
        case "reasoning":
          await a?.(K);
          break;
        case "reasoning_signature":
          await i?.(K);
          break;
        case "redacted_reasoning":
          await o?.(K);
          break;
        case "file":
          await s?.(K);
          break;
        case "source":
          await c?.(K);
          break;
        case "data":
          await h?.(K);
          break;
        case "error":
          await p?.(K);
          break;
        case "message_annotations":
          await v?.(K);
          break;
        case "tool_call_streaming_start":
          await m?.(K);
          break;
        case "tool_call_delta":
          await y?.(K);
          break;
        case "tool_call":
          await g?.(K);
          break;
        case "tool_result":
          await k?.(K);
          break;
        case "finish_message":
          await A?.(K);
          break;
        case "finish_step":
          await C?.(K);
          break;
        case "start_step":
          await U?.(K);
          break;
        default: {
          const z = q;
          throw new Error(`Unknown stream part type: ${z}`);
        }
      }
  }
}
async function dv({
  stream: t,
  update: l,
  onToolCall: a,
  onFinish: i,
  generateId: o = zf,
  getCurrentDate: c = () => new Date(),
  lastMessage: s,
}) {
  var h, p;
  const m = s?.role === "assistant";
  let y = m
    ? 1 +
      ((p =
        (h = s.toolInvocations) == null
          ? void 0
          : h.reduce((_, F) => {
              var q;
              return Math.max(_, (q = F.step) != null ? q : 0);
            }, 0)) != null
        ? p
        : 0)
    : 0;
  const g = m
    ? structuredClone(s)
    : { id: o(), createdAt: c(), role: "assistant", content: "", parts: [] };
  let k, v, A;
  function C(_, F) {
    const q = g.parts.find(
      (K) => K.type === "tool-invocation" && K.toolInvocation.toolCallId === _
    );
    q != null
      ? (q.toolInvocation = F)
      : g.parts.push({ type: "tool-invocation", toolInvocation: F });
  }
  const U = [];
  let R = m ? s?.annotations : void 0;
  const Y = {};
  let V = { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
    ee = "unknown";
  function O() {
    const _ = [...U];
    R?.length && (g.annotations = R);
    const F = { ...structuredClone(g), revisionId: o() };
    l({ message: F, data: _, replaceLastMessage: m });
  }
  (await hv({
    stream: t,
    onTextPart(_) {
      (k == null
        ? ((k = { type: "text", text: _ }), g.parts.push(k))
        : (k.text += _),
        (g.content += _),
        O());
    },
    onReasoningPart(_) {
      var F;
      (A == null
        ? ((A = { type: "text", text: _ }), v?.details.push(A))
        : (A.text += _),
        v == null
          ? ((v = { type: "reasoning", reasoning: _, details: [A] }),
            g.parts.push(v))
          : (v.reasoning += _),
        (g.reasoning = ((F = g.reasoning) != null ? F : "") + _),
        O());
    },
    onReasoningSignaturePart(_) {
      A != null && (A.signature = _.signature);
    },
    onRedactedReasoningPart(_) {
      (v == null &&
        ((v = { type: "reasoning", reasoning: "", details: [] }),
        g.parts.push(v)),
        v.details.push({ type: "redacted", data: _.data }),
        (A = void 0),
        O());
    },
    onFilePart(_) {
      (g.parts.push({ type: "file", mimeType: _.mimeType, data: _.data }), O());
    },
    onSourcePart(_) {
      (g.parts.push({ type: "source", source: _ }), O());
    },
    onToolCallStreamingStartPart(_) {
      (g.toolInvocations == null && (g.toolInvocations = []),
        (Y[_.toolCallId] = {
          text: "",
          step: y,
          toolName: _.toolName,
          index: g.toolInvocations.length,
        }));
      const F = {
        state: "partial-call",
        step: y,
        toolCallId: _.toolCallId,
        toolName: _.toolName,
        args: void 0,
      };
      (g.toolInvocations.push(F), C(_.toolCallId, F), O());
    },
    onToolCallDeltaPart(_) {
      const F = Y[_.toolCallId];
      F.text += _.argsTextDelta;
      const { value: q } = Yx(F.text),
        K = {
          state: "partial-call",
          step: F.step,
          toolCallId: _.toolCallId,
          toolName: F.toolName,
          args: q,
        };
      ((g.toolInvocations[F.index] = K), C(_.toolCallId, K), O());
    },
    async onToolCallPart(_) {
      const F = { state: "call", step: y, ..._ };
      if (
        (Y[_.toolCallId] != null
          ? (g.toolInvocations[Y[_.toolCallId].index] = F)
          : (g.toolInvocations == null && (g.toolInvocations = []),
            g.toolInvocations.push(F)),
        C(_.toolCallId, F),
        O(),
        a)
      ) {
        const q = await a({ toolCall: _ });
        if (q != null) {
          const K = { state: "result", step: y, ..._, result: q };
          ((g.toolInvocations[g.toolInvocations.length - 1] = K),
            C(_.toolCallId, K),
            O());
        }
      }
    },
    onToolResultPart(_) {
      const F = g.toolInvocations;
      if (F == null)
        throw new Error("tool_result must be preceded by a tool_call");
      const q = F.findIndex((z) => z.toolCallId === _.toolCallId);
      if (q === -1)
        throw new Error(
          "tool_result must be preceded by a tool_call with the same toolCallId"
        );
      const K = { ...F[q], state: "result", ..._ };
      ((F[q] = K), C(_.toolCallId, K), O());
    },
    onDataPart(_) {
      (U.push(..._), O());
    },
    onMessageAnnotationsPart(_) {
      (R == null ? (R = [..._]) : R.push(..._), O());
    },
    onFinishStepPart(_) {
      ((y += 1), (k = _.isContinued ? k : void 0), (v = void 0), (A = void 0));
    },
    onStartStepPart(_) {
      (m || (g.id = _.messageId), g.parts.push({ type: "step-start" }), O());
    },
    onFinishMessagePart(_) {
      ((ee = _.finishReason), _.usage != null && (V = Zx(_.usage)));
    },
    onErrorPart(_) {
      throw new Error(_);
    },
  }),
    i?.({ message: g, finishReason: ee, usage: V }));
}
async function pv({ stream: t, onTextPart: l }) {
  const a = t.pipeThrough(new TextDecoderStream()).getReader();
  for (;;) {
    const { done: i, value: o } = await a.read();
    if (i) break;
    await l(o);
  }
}
async function mv({
  stream: t,
  update: l,
  onFinish: a,
  getCurrentDate: i = () => new Date(),
  generateId: o = zf,
}) {
  const c = { type: "text", text: "" },
    s = { id: o(), createdAt: i(), role: "assistant", content: "", parts: [c] };
  (await pv({
    stream: t,
    onTextPart: (h) => {
      ((s.content += h),
        (c.text += h),
        l({ message: { ...s }, data: [], replaceLastMessage: !1 }));
    },
  }),
    a?.(s, {
      usage: { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
      finishReason: "unknown",
    }));
}
var gv = () => fetch;
async function yv({
  api: t,
  body: l,
  streamProtocol: a = "data",
  credentials: i,
  headers: o,
  abortController: c,
  restoreMessagesOnFailure: s,
  onResponse: h,
  onUpdate: p,
  onFinish: m,
  onToolCall: y,
  generateId: g,
  fetch: k = gv(),
  lastMessage: v,
  requestType: A = "generate",
}) {
  var C, U, R;
  const V = await (
    A === "resume"
      ? k(`${t}?chatId=${l.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", ...o },
          signal: (C = c?.()) == null ? void 0 : C.signal,
          credentials: i,
        })
      : k(t, {
          method: "POST",
          body: JSON.stringify(l),
          headers: { "Content-Type": "application/json", ...o },
          signal: (U = c?.()) == null ? void 0 : U.signal,
          credentials: i,
        })
  ).catch((ee) => {
    throw (s(), ee);
  });
  if (h)
    try {
      await h(V);
    } catch (ee) {
      throw ee;
    }
  if (!V.ok)
    throw (
      s(),
      new Error(
        (R = await V.text()) != null ? R : "Failed to fetch the chat response."
      )
    );
  if (!V.body) throw new Error("The response body is empty.");
  switch (a) {
    case "text": {
      await mv({ stream: V.body, update: p, onFinish: m, generateId: g });
      return;
    }
    case "data": {
      await dv({
        stream: V.body,
        update: p,
        lastMessage: v,
        onToolCall: y,
        onFinish({ message: ee, finishReason: O, usage: _ }) {
          m && ee != null && m(ee, { usage: _, finishReason: O });
        },
        generateId: g,
      });
      return;
    }
    default: {
      const ee = a;
      throw new Error(`Unknown stream protocol: ${ee}`);
    }
  }
}
function lf(t) {
  return t?.reduce((l, a) => {
    var i;
    return Math.max(l, (i = a.step) != null ? i : 0);
  }, 0);
}
function Ym(t) {
  var l;
  return (l = t.parts) != null
    ? l
    : [
        ...(t.toolInvocations
          ? t.toolInvocations.map((a) => ({
              type: "tool-invocation",
              toolInvocation: a,
            }))
          : []),
        ...(t.reasoning
          ? [
              {
                type: "reasoning",
                reasoning: t.reasoning,
                details: [{ type: "text", text: t.reasoning }],
              },
            ]
          : []),
        ...(t.content ? [{ type: "text", text: t.content }] : []),
      ];
}
function _c(t) {
  return t.map((l) => ({ ...l, parts: Ym(l) }));
}
function rf(t, l) {
  if (t === l) return !0;
  if (t == null || l == null) return !1;
  if (typeof t != "object" && typeof l != "object") return t === l;
  if (t.constructor !== l.constructor) return !1;
  if (t instanceof Date && l instanceof Date)
    return t.getTime() === l.getTime();
  if (Array.isArray(t)) {
    if (t.length !== l.length) return !1;
    for (let o = 0; o < t.length; o++) if (!rf(t[o], l[o])) return !1;
    return !0;
  }
  const a = Object.keys(t),
    i = Object.keys(l);
  if (a.length !== i.length) return !1;
  for (const o of a) if (!i.includes(o) || !rf(t[o], l[o])) return !1;
  return !0;
}
async function g1(t) {
  if (!t) return [];
  if (globalThis.FileList && t instanceof globalThis.FileList)
    return Promise.all(
      Array.from(t).map(async (l) => {
        const { name: a, type: i } = l,
          o = await new Promise((c, s) => {
            const h = new FileReader();
            ((h.onload = (p) => {
              var m;
              c((m = p.target) == null ? void 0 : m.result);
            }),
              (h.onerror = (p) => s(p)),
              h.readAsDataURL(l));
          });
        return { name: a, contentType: i, url: o };
      })
    );
  if (Array.isArray(t)) return t;
  throw new Error("Invalid attachments type");
}
function bv({
  originalMaxToolInvocationStep: t,
  originalMessageCount: l,
  maxSteps: a,
  messages: i,
}) {
  var o;
  const c = i[i.length - 1];
  return (
    a > 1 &&
    c != null &&
    (i.length > l || lf(c.toolInvocations) !== t) &&
    Gm(c) &&
    ((o = lf(c.toolInvocations)) != null ? o : 0) < a
  );
}
function Gm(t) {
  if (t.role !== "assistant") return !1;
  const l = t.parts.reduce((i, o, c) => (o.type === "step-start" ? c : i), -1),
    a = t.parts.slice(l + 1).filter((i) => i.type === "tool-invocation");
  return a.length > 0 && a.every((i) => "result" in i.toolInvocation);
}
function xv({ messages: t, toolCallId: l, toolResult: a }) {
  var i;
  const o = t[t.length - 1],
    c = o.parts.find(
      (h) => h.type === "tool-invocation" && h.toolInvocation.toolCallId === l
    );
  if (c == null) return;
  const s = { ...c.toolInvocation, state: "result", result: a };
  ((c.toolInvocation = s),
    (o.toolInvocations =
      (i = o.toolInvocations) == null
        ? void 0
        : i.map((h) => (h.toolCallId === l ? s : h))));
}
var Tc = { exports: {} },
  Cc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var y1;
function vv() {
  if (y1) return Cc;
  y1 = 1;
  var t = Wu();
  function l(g, k) {
    return (g === k && (g !== 0 || 1 / g === 1 / k)) || (g !== g && k !== k);
  }
  var a = typeof Object.is == "function" ? Object.is : l,
    i = t.useState,
    o = t.useEffect,
    c = t.useLayoutEffect,
    s = t.useDebugValue;
  function h(g, k) {
    var v = k(),
      A = i({ inst: { value: v, getSnapshot: k } }),
      C = A[0].inst,
      U = A[1];
    return (
      c(
        function () {
          ((C.value = v), (C.getSnapshot = k), p(C) && U({ inst: C }));
        },
        [g, v, k]
      ),
      o(
        function () {
          return (
            p(C) && U({ inst: C }),
            g(function () {
              p(C) && U({ inst: C });
            })
          );
        },
        [g]
      ),
      s(v),
      v
    );
  }
  function p(g) {
    var k = g.getSnapshot;
    g = g.value;
    try {
      var v = k();
      return !a(g, v);
    } catch {
      return !0;
    }
  }
  function m(g, k) {
    return k();
  }
  var y =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? m
      : h;
  return (
    (Cc.useSyncExternalStore =
      t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y),
    Cc
  );
}
var b1;
function kv() {
  return (b1 || ((b1 = 1), (Tc.exports = vv())), Tc.exports);
}
var Sv = kv();
const Fm = 0,
  Qm = 1,
  Xm = 2,
  x1 = 3;
var v1 = Object.prototype.hasOwnProperty;
function af(t, l) {
  var a, i;
  if (t === l) return !0;
  if (t && l && (a = t.constructor) === l.constructor) {
    if (a === Date) return t.getTime() === l.getTime();
    if (a === RegExp) return t.toString() === l.toString();
    if (a === Array) {
      if ((i = t.length) === l.length) for (; i-- && af(t[i], l[i]); );
      return i === -1;
    }
    if (!a || typeof t == "object") {
      i = 0;
      for (a in t)
        if (
          (v1.call(t, a) && ++i && !v1.call(l, a)) ||
          !(a in l) ||
          !af(t[a], l[a])
        )
          return !1;
      return Object.keys(l).length === i;
    }
  }
  return t !== t && l !== l;
}
const Pn = new WeakMap(),
  Tl = () => {},
  Ht = Tl(),
  uf = Object,
  Be = (t) => t === Ht,
  Rn = (t) => typeof t == "function",
  Cl = (t, l) => ({ ...t, ...l }),
  $m = (t) => Rn(t.then),
  Rc = {},
  Ou = {},
  Of = "undefined",
  yi = typeof window != Of,
  of = typeof document != Of,
  wv = yi && "Deno" in window,
  Ev = () => yi && typeof window.requestAnimationFrame != Of,
  Pm = (t, l) => {
    const a = Pn.get(t);
    return [
      () => (!Be(l) && t.get(l)) || Rc,
      (i) => {
        if (!Be(l)) {
          const o = t.get(l);
          (l in Ou || (Ou[l] = o), a[5](l, Cl(o, i), o || Rc));
        }
      },
      a[6],
      () => (!Be(l) && l in Ou ? Ou[l] : (!Be(l) && t.get(l)) || Rc),
    ];
  };
let sf = !0;
const Av = () => sf,
  [cf, ff] =
    yi && window.addEventListener
      ? [
          window.addEventListener.bind(window),
          window.removeEventListener.bind(window),
        ]
      : [Tl, Tl],
  _v = () => {
    const t = of && document.visibilityState;
    return Be(t) || t !== "hidden";
  },
  Tv = (t) => (
    of && document.addEventListener("visibilitychange", t),
    cf("focus", t),
    () => {
      (of && document.removeEventListener("visibilitychange", t),
        ff("focus", t));
    }
  ),
  Cv = (t) => {
    const l = () => {
        ((sf = !0), t());
      },
      a = () => {
        sf = !1;
      };
    return (
      cf("online", l),
      cf("offline", a),
      () => {
        (ff("online", l), ff("offline", a));
      }
    );
  },
  Rv = { isOnline: Av, isVisible: _v },
  Mv = { initFocus: Tv, initReconnect: Cv },
  k1 = !Mf.useId,
  hi = !yi || wv,
  zv = (t) => (Ev() ? window.requestAnimationFrame(t) : setTimeout(t, 1)),
  Mc = hi ? E.useEffect : E.useLayoutEffect,
  zc = typeof navigator < "u" && navigator.connection,
  S1 =
    !hi && zc && (["slow-2g", "2g"].includes(zc.effectiveType) || zc.saveData),
  Nu = new WeakMap(),
  Dc = (t, l) => uf.prototype.toString.call(t) === `[object ${l}]`;
let Dv = 0;
const hf = (t) => {
    const l = typeof t,
      a = Dc(t, "Date"),
      i = Dc(t, "RegExp"),
      o = Dc(t, "Object");
    let c, s;
    if (uf(t) === t && !a && !i) {
      if (((c = Nu.get(t)), c)) return c;
      if (((c = ++Dv + "~"), Nu.set(t, c), Array.isArray(t))) {
        for (c = "@", s = 0; s < t.length; s++) c += hf(t[s]) + ",";
        Nu.set(t, c);
      }
      if (o) {
        c = "#";
        const h = uf.keys(t).sort();
        for (; !Be((s = h.pop())); )
          Be(t[s]) || (c += s + ":" + hf(t[s]) + ",");
        Nu.set(t, c);
      }
    } else
      c = a
        ? t.toJSON()
        : l == "symbol"
          ? t.toString()
          : l == "string"
            ? JSON.stringify(t)
            : "" + t;
    return c;
  },
  Nf = (t) => {
    if (Rn(t))
      try {
        t = t();
      } catch {
        t = "";
      }
    const l = t;
    return (
      (t =
        typeof t == "string"
          ? t
          : (Array.isArray(t) ? t.length : t)
            ? hf(t)
            : ""),
      [t, l]
    );
  };
let Ov = 0;
const df = () => ++Ov;
async function Km(...t) {
  const [l, a, i, o] = t,
    c = Cl(
      { populateCache: !0, throwOnError: !0 },
      typeof o == "boolean" ? { revalidate: o } : o || {}
    );
  let s = c.populateCache;
  const h = c.rollbackOnError;
  let p = c.optimisticData;
  const m = (k) => (typeof h == "function" ? h(k) : h !== !1),
    y = c.throwOnError;
  if (Rn(a)) {
    const k = a,
      v = [],
      A = l.keys();
    for (const C of A) !/^\$(inf|sub)\$/.test(C) && k(l.get(C)._k) && v.push(C);
    return Promise.all(v.map(g));
  }
  return g(a);
  async function g(k) {
    const [v] = Nf(k);
    if (!v) return;
    const [A, C] = Pm(l, v),
      [U, R, Y, V] = Pn.get(l),
      ee = () => {
        const le = U[v];
        return (Rn(c.revalidate)
          ? c.revalidate(A().data, k)
          : c.revalidate !== !1) && (delete Y[v], delete V[v], le && le[0])
          ? le[0](Xm).then(() => A().data)
          : A().data;
      };
    if (t.length < 3) return ee();
    let O = i,
      _;
    const F = df();
    R[v] = [F, 0];
    const q = !Be(p),
      K = A(),
      z = K.data,
      ne = K._c,
      te = Be(ne) ? z : ne;
    if ((q && ((p = Rn(p) ? p(te, z) : p), C({ data: p, _c: te })), Rn(O)))
      try {
        O = O(te);
      } catch (le) {
        _ = le;
      }
    if (O && $m(O))
      if (
        ((O = await O.catch((le) => {
          _ = le;
        })),
        F !== R[v][0])
      ) {
        if (_) throw _;
        return O;
      } else _ && q && m(_) && ((s = !0), C({ data: te, _c: Ht }));
    if (s && !_)
      if (Rn(s)) {
        const le = s(O, te);
        C({ data: le, error: Ht, _c: Ht });
      } else C({ data: O, error: Ht, _c: Ht });
    if (
      ((R[v][1] = df()),
      Promise.resolve(ee()).then(() => {
        C({ _c: Ht });
      }),
      _)
    ) {
      if (y) throw _;
      return;
    }
    return O;
  }
}
const w1 = (t, l) => {
    for (const a in t) t[a][0] && t[a][0](l);
  },
  Nv = (t, l) => {
    if (!Pn.has(t)) {
      const a = Cl(Mv, l),
        i = {},
        o = Km.bind(Ht, t);
      let c = Tl;
      const s = {},
        h = (y, g) => {
          const k = s[y] || [];
          return ((s[y] = k), k.push(g), () => k.splice(k.indexOf(g), 1));
        },
        p = (y, g, k) => {
          t.set(y, g);
          const v = s[y];
          if (v) for (const A of v) A(g, k);
        },
        m = () => {
          if (!Pn.has(t) && (Pn.set(t, [i, {}, {}, {}, o, p, h]), !hi)) {
            const y = a.initFocus(setTimeout.bind(Ht, w1.bind(Ht, i, Fm))),
              g = a.initReconnect(setTimeout.bind(Ht, w1.bind(Ht, i, Qm)));
            c = () => {
              (y && y(), g && g(), Pn.delete(t));
            };
          }
        };
      return (m(), [t, o, m, c]);
    }
    return [t, Pn.get(t)[4]];
  },
  Lv = (t, l, a, i, o) => {
    const c = a.errorRetryCount,
      s = o.retryCount,
      h =
        ~~((Math.random() + 0.5) * (1 << (s < 8 ? s : 8))) *
        a.errorRetryInterval;
    (!Be(c) && s > c) || setTimeout(i, h, o);
  },
  Hv = af,
  [Jm, jv] = Nv(new Map()),
  Uv = Cl(
    {
      onLoadingSlow: Tl,
      onSuccess: Tl,
      onError: Tl,
      onErrorRetry: Lv,
      onDiscarded: Tl,
      revalidateOnFocus: !0,
      revalidateOnReconnect: !0,
      revalidateIfStale: !0,
      shouldRetryOnError: !0,
      errorRetryInterval: S1 ? 1e4 : 5e3,
      focusThrottleInterval: 5 * 1e3,
      dedupingInterval: 2 * 1e3,
      loadingTimeout: S1 ? 5e3 : 3e3,
      compare: Hv,
      isPaused: () => !1,
      cache: Jm,
      mutate: jv,
      fallback: {},
    },
    Rv
  ),
  Bv = (t, l) => {
    const a = Cl(t, l);
    if (l) {
      const { use: i, fallback: o } = t,
        { use: c, fallback: s } = l;
      (i && c && (a.use = i.concat(c)), o && s && (a.fallback = Cl(o, s)));
    }
    return a;
  },
  Vv = E.createContext({}),
  qv = "$inf$",
  Wm = yi && window.__SWR_DEVTOOLS_USE__,
  Zv = Wm ? window.__SWR_DEVTOOLS_USE__ : [],
  Iv = () => {
    Wm && (window.__SWR_DEVTOOLS_REACT__ = Mf);
  },
  Yv = (t) =>
    Rn(t[1])
      ? [t[0], t[1], t[2] || {}]
      : [t[0], null, (t[1] === null ? t[2] : t[1]) || {}],
  Gv = () => Cl(Uv, E.useContext(Vv)),
  Fv = (t) => (l, a, i) =>
    t(
      l,
      a &&
        ((...c) => {
          const [s] = Nf(l),
            [, , , h] = Pn.get(Jm);
          if (s.startsWith(qv)) return a(...c);
          const p = h[s];
          return Be(p) ? a(...c) : (delete h[s], p);
        }),
      i
    ),
  Qv = Zv.concat(Fv),
  Xv = (t) =>
    function (...a) {
      const i = Gv(),
        [o, c, s] = Yv(a),
        h = Bv(i, s);
      let p = t;
      const { use: m } = h,
        y = (m || []).concat(Qv);
      for (let g = y.length; g--; ) p = y[g](p);
      return p(o, c || h.fetcher || null, h);
    },
  $v = (t, l, a) => {
    const i = l[t] || (l[t] = []);
    return (
      i.push(a),
      () => {
        const o = i.indexOf(a);
        o >= 0 && ((i[o] = i[i.length - 1]), i.pop());
      }
    );
  };
Iv();
const Oc =
    Mf.use ||
    ((t) => {
      switch (t.status) {
        case "pending":
          throw t;
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
        default:
          throw (
            (t.status = "pending"),
            t.then(
              (l) => {
                ((t.status = "fulfilled"), (t.value = l));
              },
              (l) => {
                ((t.status = "rejected"), (t.reason = l));
              }
            ),
            t
          );
      }
    }),
  Nc = { dedupe: !0 },
  Pv = (t, l, a) => {
    const {
        cache: i,
        compare: o,
        suspense: c,
        fallbackData: s,
        revalidateOnMount: h,
        revalidateIfStale: p,
        refreshInterval: m,
        refreshWhenHidden: y,
        refreshWhenOffline: g,
        keepPreviousData: k,
      } = a,
      [v, A, C, U] = Pn.get(i),
      [R, Y] = Nf(t),
      V = E.useRef(!1),
      ee = E.useRef(!1),
      O = E.useRef(R),
      _ = E.useRef(l),
      F = E.useRef(a),
      q = () => F.current,
      K = () => q().isVisible() && q().isOnline(),
      [z, ne, te, le] = Pm(i, R),
      ie = E.useRef({}).current,
      ue = Be(s) ? (Be(a.fallback) ? Ht : a.fallback[R]) : s,
      L = (Se, ve) => {
        for (const Oe in ie) {
          const _e = Oe;
          if (_e === "data") {
            if (!o(Se[_e], ve[_e]) && (!Be(Se[_e]) || !o(ge, ve[_e])))
              return !1;
          } else if (ve[_e] !== Se[_e]) return !1;
        }
        return !0;
      },
      J = E.useMemo(() => {
        const Se =
            !R || !l ? !1 : Be(h) ? (q().isPaused() || c ? !1 : p !== !1) : h,
          ve = (Ye) => {
            const ft = Cl(Ye);
            return (
              delete ft._k,
              Se ? { isValidating: !0, isLoading: !0, ...ft } : ft
            );
          },
          Oe = z(),
          _e = le(),
          Ie = ve(Oe),
          At = Oe === _e ? Ie : ve(_e);
        let Fe = Ie;
        return [
          () => {
            const Ye = ve(z());
            return L(Ye, Fe)
              ? ((Fe.data = Ye.data),
                (Fe.isLoading = Ye.isLoading),
                (Fe.isValidating = Ye.isValidating),
                (Fe.error = Ye.error),
                Fe)
              : ((Fe = Ye), Ye);
          },
          () => At,
        ];
      }, [i, R]),
      Q = Sv.useSyncExternalStore(
        E.useCallback(
          (Se) =>
            te(R, (ve, Oe) => {
              L(Oe, ve) || Se();
            }),
          [i, R]
        ),
        J[0],
        J[1]
      ),
      be = !V.current,
      x = v[R] && v[R].length > 0,
      G = Q.data,
      re = Be(G) ? (ue && $m(ue) ? Oc(ue) : ue) : G,
      w = Q.error,
      oe = E.useRef(re),
      ge = k ? (Be(G) ? (Be(oe.current) ? re : oe.current) : G) : re,
      se =
        x && !Be(w)
          ? !1
          : be && !Be(h)
            ? h
            : q().isPaused()
              ? !1
              : c
                ? Be(re)
                  ? !1
                  : p
                : Be(re) || p,
      Ee = !!(R && l && be && se),
      Te = Be(Q.isValidating) ? Ee : Q.isValidating,
      lt = Be(Q.isLoading) ? Ee : Q.isLoading,
      at = E.useCallback(
        async (Se) => {
          const ve = _.current;
          if (!R || !ve || ee.current || q().isPaused()) return !1;
          let Oe,
            _e,
            Ie = !0;
          const At = Se || {},
            Fe = !C[R] || !At.dedupe,
            Ye = () =>
              k1
                ? !ee.current && R === O.current && V.current
                : R === O.current,
            ft = { isValidating: !1, isLoading: !1 },
            el = () => {
              ne(ft);
            },
            On = () => {
              const mt = C[R];
              mt && mt[1] === _e && delete C[R];
            },
            tl = { isValidating: !0 };
          Be(z().data) && (tl.isLoading = !0);
          try {
            if (
              (Fe &&
                (ne(tl),
                a.loadingTimeout &&
                  Be(z().data) &&
                  setTimeout(() => {
                    Ie && Ye() && q().onLoadingSlow(R, a);
                  }, a.loadingTimeout),
                (C[R] = [ve(Y), df()])),
              ([Oe, _e] = C[R]),
              (Oe = await Oe),
              Fe && setTimeout(On, a.dedupingInterval),
              !C[R] || C[R][1] !== _e)
            )
              return (Fe && Ye() && q().onDiscarded(R), !1);
            ft.error = Ht;
            const mt = A[R];
            if (!Be(mt) && (_e <= mt[0] || _e <= mt[1] || mt[1] === 0))
              return (el(), Fe && Ye() && q().onDiscarded(R), !1);
            const I = z().data;
            ((ft.data = o(I, Oe) ? I : Oe),
              Fe && Ye() && q().onSuccess(Oe, R, a));
          } catch (mt) {
            On();
            const I = q(),
              { shouldRetryOnError: W } = I;
            I.isPaused() ||
              ((ft.error = mt),
              Fe &&
                Ye() &&
                (I.onError(mt, R, I),
                (W === !0 || (Rn(W) && W(mt))) &&
                  (!q().revalidateOnFocus ||
                    !q().revalidateOnReconnect ||
                    K()) &&
                  I.onErrorRetry(
                    mt,
                    R,
                    I,
                    (de) => {
                      const me = v[R];
                      me && me[0] && me[0](x1, de);
                    },
                    { retryCount: (At.retryCount || 0) + 1, dedupe: !0 }
                  )));
          }
          return ((Ie = !1), el(), !0);
        },
        [R, i]
      ),
      xt = E.useCallback((...Se) => Km(i, O.current, ...Se), []);
    if (
      (Mc(() => {
        ((_.current = l), (F.current = a), Be(G) || (oe.current = G));
      }),
      Mc(() => {
        if (!R) return;
        const Se = at.bind(Ht, Nc);
        let ve = 0;
        const _e = $v(R, v, (Ie, At = {}) => {
          if (Ie == Fm) {
            const Fe = Date.now();
            q().revalidateOnFocus &&
              Fe > ve &&
              K() &&
              ((ve = Fe + q().focusThrottleInterval), Se());
          } else if (Ie == Qm) q().revalidateOnReconnect && K() && Se();
          else {
            if (Ie == Xm) return at();
            if (Ie == x1) return at(At);
          }
        });
        return (
          (ee.current = !1),
          (O.current = R),
          (V.current = !0),
          ne({ _k: Y }),
          se && (Be(re) || hi ? Se() : zv(Se)),
          () => {
            ((ee.current = !0), _e());
          }
        );
      }, [R]),
      Mc(() => {
        let Se;
        function ve() {
          const _e = Rn(m) ? m(z().data) : m;
          _e && Se !== -1 && (Se = setTimeout(Oe, _e));
        }
        function Oe() {
          !z().error && (y || q().isVisible()) && (g || q().isOnline())
            ? at(Nc).then(ve)
            : ve();
        }
        return (
          ve(),
          () => {
            Se && (clearTimeout(Se), (Se = -1));
          }
        );
      }, [m, y, g, R]),
      E.useDebugValue(ge),
      c && Be(re) && R)
    ) {
      if (!k1 && hi)
        throw new Error(
          "Fallback data is required when using Suspense in SSR."
        );
      ((_.current = l), (F.current = a), (ee.current = !1));
      const Se = U[R];
      if (!Be(Se)) {
        const ve = xt(Se);
        Oc(ve);
      }
      if (Be(w)) {
        const ve = at(Nc);
        (Be(ge) || ((ve.status = "fulfilled"), (ve.value = !0)), Oc(ve));
      } else throw w;
    }
    return {
      mutate: xt,
      get data() {
        return ((ie.data = !0), ge);
      },
      get error() {
        return ((ie.error = !0), w);
      },
      get isValidating() {
        return ((ie.isValidating = !0), Te);
      },
      get isLoading() {
        return ((ie.isLoading = !0), lt);
      },
    };
  },
  Lu = Xv(Pv);
var Lc, E1;
function Kv() {
  if (E1) return Lc;
  E1 = 1;
  function t(l, a) {
    if (typeof l != "function")
      throw new TypeError(
        `Expected the first argument to be a \`function\`, got \`${typeof l}\`.`
      );
    let i,
      o = 0;
    return function (...s) {
      clearTimeout(i);
      const h = Date.now(),
        p = h - o,
        m = a - p;
      m <= 0
        ? ((o = h), l.apply(this, s))
        : (i = setTimeout(() => {
            ((o = Date.now()), l.apply(this, s));
          }, m));
    };
  }
  return ((Lc = t), Lc);
}
var Jv = Kv();
const Wv = gi(Jv);
function A1(t, l) {
  return l != null ? Wv(t, l) : t;
}
function e6(t) {
  const [l, a] = E.useState(t);
  return (
    E.useEffect(() => {
      rf(t, l) || a(t);
    }, [t, l]),
    l
  );
}
function t6({
  api: t = "/api/chat",
  id: l,
  initialMessages: a,
  initialInput: i = "",
  sendExtraMessageFields: o,
  onToolCall: c,
  experimental_prepareRequestBody: s,
  maxSteps: h = 1,
  streamProtocol: p = "data",
  onResponse: m,
  onFinish: y,
  onError: g,
  credentials: k,
  headers: v,
  body: A,
  generateId: C = zf,
  fetch: U,
  keepLastMessageOnError: R = !0,
  experimental_throttle: Y,
} = {}) {
  const [V] = E.useState(C),
    ee = l ?? V,
    O = typeof t == "string" ? [t, ee] : ee,
    _ = e6(a ?? []),
    F = E.useMemo(() => _c(_), [_]),
    { data: q, mutate: K } = Lu([O, "messages"], null, { fallbackData: F }),
    z = E.useRef(q || []);
  E.useEffect(() => {
    z.current = q || [];
  }, [q]);
  const { data: ne, mutate: te } = Lu([O, "streamData"], null),
    le = E.useRef(ne);
  E.useEffect(() => {
    le.current = ne;
  }, [ne]);
  const { data: ie = "ready", mutate: ue } = Lu([O, "status"], null),
    { data: L = void 0, mutate: J } = Lu([O, "error"], null),
    Q = E.useRef(null),
    be = E.useRef({ credentials: k, headers: v, body: A });
  E.useEffect(() => {
    be.current = { credentials: k, headers: v, body: A };
  }, [k, v, A]);
  const x = E.useCallback(
      async (Ae, Se = "generate") => {
        var ve, Oe;
        (ue("submitted"), J(void 0));
        const _e = _c(Ae.messages),
          Ie = _e.length,
          At = lf(
            (ve = _e[_e.length - 1]) == null ? void 0 : ve.toolInvocations
          );
        try {
          const Ye = new AbortController();
          Q.current = Ye;
          const ft = A1(K, Y),
            el = A1(te, Y),
            On = z.current;
          ft(_e, !1);
          const tl = o
              ? _e
              : _e.map(
                  ({
                    role: I,
                    content: W,
                    experimental_attachments: de,
                    data: me,
                    annotations: Ve,
                    toolInvocations: Rt,
                    parts: ln,
                  }) => ({
                    role: I,
                    content: W,
                    ...(de !== void 0 && { experimental_attachments: de }),
                    ...(me !== void 0 && { data: me }),
                    ...(Ve !== void 0 && { annotations: Ve }),
                    ...(Rt !== void 0 && { toolInvocations: Rt }),
                    ...(ln !== void 0 && { parts: ln }),
                  })
                ),
            mt = le.current;
          (await yv({
            api: t,
            body:
              (Oe = s?.({
                id: ee,
                messages: _e,
                requestData: Ae.data,
                requestBody: Ae.body,
              })) != null
                ? Oe
                : {
                    id: ee,
                    messages: tl,
                    data: Ae.data,
                    ...be.current.body,
                    ...Ae.body,
                  },
            streamProtocol: p,
            credentials: be.current.credentials,
            headers: { ...be.current.headers, ...Ae.headers },
            abortController: () => Q.current,
            restoreMessagesOnFailure() {
              R || ft(On, !1);
            },
            onResponse: m,
            onUpdate({ message: I, data: W, replaceLastMessage: de }) {
              (ue("streaming"),
                ft([...(de ? _e.slice(0, _e.length - 1) : _e), I], !1),
                W?.length && el([...(mt ?? []), ...W], !1));
            },
            onToolCall: c,
            onFinish: y,
            generateId: C,
            fetch: U,
            lastMessage: _e[_e.length - 1],
            requestType: Se,
          }),
            (Q.current = null),
            ue("ready"));
        } catch (Ye) {
          if (Ye.name === "AbortError")
            return ((Q.current = null), ue("ready"), null);
          (g && Ye instanceof Error && g(Ye), J(Ye), ue("error"));
        }
        const Fe = z.current;
        bv({
          originalMaxToolInvocationStep: At,
          originalMessageCount: Ie,
          maxSteps: h,
          messages: Fe,
        }) && (await x({ messages: Fe }));
      },
      [K, ue, t, be, m, y, g, J, te, le, p, o, s, c, h, z, Q, C, U, R, Y, ee]
    ),
    G = E.useCallback(
      async (
        Ae,
        {
          data: Se,
          headers: ve,
          body: Oe,
          experimental_attachments: _e = Ae.experimental_attachments,
        } = {}
      ) => {
        var Ie, At;
        const Fe = await g1(_e),
          Ye = z.current.concat({
            ...Ae,
            id: (Ie = Ae.id) != null ? Ie : C(),
            createdAt: (At = Ae.createdAt) != null ? At : new Date(),
            experimental_attachments: Fe.length > 0 ? Fe : void 0,
            parts: Ym(Ae),
          });
        return x({ messages: Ye, headers: ve, body: Oe, data: Se });
      },
      [x, C]
    ),
    re = E.useCallback(
      async ({ data: Ae, headers: Se, body: ve } = {}) => {
        const Oe = z.current;
        if (Oe.length === 0) return null;
        const _e = Oe[Oe.length - 1];
        return x({
          messages: _e.role === "assistant" ? Oe.slice(0, -1) : Oe,
          headers: Se,
          body: ve,
          data: Ae,
        });
      },
      [x]
    ),
    w = E.useCallback(() => {
      Q.current && (Q.current.abort(), (Q.current = null));
    }, []),
    oe = E.useCallback(async () => {
      const Ae = z.current;
      x({ messages: Ae }, "resume");
    }, [x]),
    ge = E.useCallback(
      (Ae) => {
        typeof Ae == "function" && (Ae = Ae(z.current));
        const Se = _c(Ae);
        (K(Se, !1), (z.current = Se));
      },
      [K]
    ),
    se = E.useCallback(
      (Ae) => {
        (typeof Ae == "function" && (Ae = Ae(le.current)),
          te(Ae, !1),
          (le.current = Ae));
      },
      [te]
    ),
    [Ee, Te] = E.useState(i),
    lt = E.useCallback(
      async (Ae, Se = {}, ve) => {
        var Oe;
        if (
          ((Oe = Ae?.preventDefault) == null || Oe.call(Ae),
          !Ee && !Se.allowEmptySubmit)
        )
          return;
        ve && (be.current = { ...be.current, ...ve });
        const _e = await g1(Se.experimental_attachments),
          At = {
            messages: z.current.concat({
              id: C(),
              createdAt: new Date(),
              role: "user",
              content: Ee,
              experimental_attachments: _e.length > 0 ? _e : void 0,
              parts: [{ type: "text", text: Ee }],
            }),
            headers: Se.headers,
            body: Se.body,
            data: Se.data,
          };
        (x(At), Te(""));
      },
      [Ee, C, x]
    ),
    at = (Ae) => {
      Te(Ae.target.value);
    },
    xt = E.useCallback(
      ({ toolCallId: Ae, result: Se }) => {
        const ve = z.current;
        if (
          (xv({ messages: ve, toolCallId: Ae, toolResult: Se }),
          K([...ve.slice(0, ve.length - 1), { ...ve[ve.length - 1] }], !1),
          ie === "submitted" || ie === "streaming")
        )
          return;
        const Oe = ve[ve.length - 1];
        Gm(Oe) && x({ messages: ve });
      },
      [K, ie, x]
    );
  return {
    messages: q ?? [],
    id: ee,
    setMessages: ge,
    data: ne,
    setData: se,
    error: L,
    append: G,
    reload: re,
    stop: w,
    experimental_resume: oe,
    input: Ee,
    setInput: Te,
    handleInputChange: at,
    handleSubmit: lt,
    isLoading: ie === "submitted" || ie === "streaming",
    status: ie,
    addToolResult: xt,
  };
}
const n6 = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let l6 = (t = 21) => {
  let l = "",
    a = crypto.getRandomValues(new Uint8Array((t |= 0)));
  for (; t--; ) l += n6[a[t] & 63];
  return l;
};
var qr = new Map();
function r6(t) {
  const { agent: l, getInitialMessages: a, ...i } = t,
    o = new URL(
      `${(l._url || l._pkurl)?.replace("ws://", "http://").replace("wss://", "https://")}`
    );
  o.searchParams.delete("_pk");
  const c = o.toString();
  async function s({ url: v }) {
    const A = new URL(v);
    return (
      (A.pathname += "/get-messages"),
      (
        await fetch(A.toString(), {
          credentials: t.credentials,
          headers: t.headers,
        })
      ).json()
    );
  }
  const h = a || s;
  function p(v) {
    if (qr.has(c)) return qr.get(c);
    const A = h(v);
    return (qr.set(c, A), A);
  }
  const m = a === null ? null : p({ agent: l.agent, name: l.name, url: c }),
    y = m ? E.use(m) : (i.initialMessages ?? []);
  E.useEffect(() => {
    if (m)
      return (
        qr.set(c, m),
        () => {
          qr.get(c) === m && qr.delete(c);
        }
      );
  }, [c, m]);
  async function g(v, A = {}) {
    const {
        method: C,
        keepalive: U,
        headers: R,
        body: Y,
        redirect: V,
        integrity: ee,
        signal: O,
        credentials: _,
        mode: F,
        referrer: q,
        referrerPolicy: K,
        window: z,
      } = A,
      ne = l6(8),
      te = new AbortController();
    (O?.addEventListener("abort", () => {
      (l.send(JSON.stringify({ id: ne, type: "cf_agent_chat_request_cancel" })),
        te.abort(),
        le.close());
    }),
      l.addEventListener(
        "message",
        (ue) => {
          let L;
          try {
            L = JSON.parse(ue.data);
          } catch {
            return;
          }
          L.type === "cf_agent_use_chat_response" &&
            L.id === ne &&
            (le.enqueue(new TextEncoder().encode(L.body)),
            L.done && (le.close(), te.abort()));
        },
        { signal: te.signal }
      ));
    let le;
    const ie = new ReadableStream({
      start(ue) {
        le = ue;
      },
    });
    return (
      l.send(
        JSON.stringify({
          id: ne,
          init: {
            body: Y,
            credentials: _,
            headers: R,
            integrity: ee,
            keepalive: U,
            method: C,
            mode: F,
            redirect: V,
            referrer: q,
            referrerPolicy: K,
            window: z,
          },
          type: "cf_agent_use_chat_request",
          url: v.toString(),
        })
      ),
      new Response(ie)
    );
  }
  const k = t6({
    fetch: g,
    initialMessages: y,
    sendExtraMessageFields: !0,
    ...i,
  });
  return (
    E.useEffect(() => {
      function v(C) {
        if (typeof C.data != "string") return;
        let U;
        try {
          U = JSON.parse(C.data);
        } catch {
          return;
        }
        U.type === "cf_agent_chat_clear" && k.setMessages([]);
      }
      function A(C) {
        if (typeof C.data != "string") return;
        let U;
        try {
          U = JSON.parse(C.data);
        } catch {
          return;
        }
        U.type === "cf_agent_chat_messages" && k.setMessages(U.messages);
      }
      return (
        l.addEventListener("message", v),
        l.addEventListener("message", A),
        () => {
          (l.removeEventListener("message", v),
            l.removeEventListener("message", A));
        }
      );
    }, [l, k.setMessages]),
    {
      ...k,
      clearHistory: () => {
        (k.setMessages([]),
          l.send(JSON.stringify({ type: "cf_agent_chat_clear" })));
      },
      setMessages: (v) => {
        (k.setMessages(v),
          l.send(
            JSON.stringify({ messages: v, type: "cf_agent_chat_messages" })
          ));
      },
    }
  );
}
const a6 = ({ className: t, size: l = 24, title: a = "Loading..." }) =>
    Z.jsxs("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "currentColor",
      className: t,
      style: { height: l ?? void 0, width: l ?? void 0 },
      children: [
        Z.jsx("title", { children: a }),
        Z.jsxs("circle", {
          cx: "12",
          cy: "12",
          r: "9.5",
          fill: "none",
          strokeWidth: "2",
          strokeLinecap: "round",
          children: [
            Z.jsx("animateTransform", {
              attributeName: "transform",
              type: "rotate",
              from: "0 12 12",
              to: "360 12 12",
              dur: "2s",
              repeatCount: "indefinite",
            }),
            Z.jsx("animate", {
              attributeName: "stroke-dasharray",
              values: "0 150;42 150;42 150",
              keyTimes: "0;0.5;1",
              dur: "1.5s",
              repeatCount: "indefinite",
            }),
            Z.jsx("animate", {
              attributeName: "stroke-dashoffset",
              values: "0;-16;-59",
              keyTimes: "0;0.5;1",
              dur: "1.5s",
              repeatCount: "indefinite",
            }),
          ],
        }),
        Z.jsx("circle", {
          cx: "12",
          cy: "12",
          r: "9.5",
          fill: "none",
          opacity: 0.1,
          strokeWidth: "2",
          strokeLinecap: "round",
        }),
      ],
    }),
  eg = ({ as: t, children: l, ...a }) => {
    const i = t;
    return Z.jsx(i, { ...a, children: l });
  },
  tg = E.createContext(null),
  i6 = ({ children: t }) => {
    const [l, a] = E.useState(null),
      i = E.useRef(null),
      o = E.useRef(null),
      c = E.useRef(!1),
      s = E.useRef(!1),
      h = (m, y) => {
        (i.current && clearTimeout(i.current),
          o.current && clearTimeout(o.current),
          (s.current = !1),
          y || c.current
            ? (a(m), (s.current = !0))
            : (i.current = window.setTimeout(() => {
                (a(m), (s.current = !0));
              }, 600)));
      },
      p = () => {
        (i.current && clearTimeout(i.current),
          a(null),
          s.current &&
            ((c.current = !0),
            (o.current = window.setTimeout(() => {
              c.current = !1;
            }, 100))));
      };
    return Z.jsx(tg.Provider, {
      value: { activeTooltip: l, showTooltip: h, hideTooltip: p },
      children: t,
    });
  },
  u6 = () => {
    const t = E.useContext(tg);
    if (!t) throw new Error("useTooltip must be used within TooltipProvider");
    return t;
  };
function ng(t) {
  var l,
    a,
    i = "";
  if (typeof t == "string" || typeof t == "number") i += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var o = t.length;
      for (l = 0; l < o; l++)
        t[l] && (a = ng(t[l])) && (i && (i += " "), (i += a));
    } else for (a in t) t[a] && (i && (i += " "), (i += a));
  return i;
}
function o6() {
  for (var t, l, a = 0, i = "", o = arguments.length; a < o; a++)
    (t = arguments[a]) && (l = ng(t)) && (i && (i += " "), (i += l));
  return i;
}
const Lf = "-",
  s6 = (t) => {
    const l = f6(t),
      { conflictingClassGroups: a, conflictingClassGroupModifiers: i } = t;
    return {
      getClassGroupId: (s) => {
        const h = s.split(Lf);
        return (h[0] === "" && h.length !== 1 && h.shift(), lg(h, l) || c6(s));
      },
      getConflictingClassGroupIds: (s, h) => {
        const p = a[s] || [];
        return h && i[s] ? [...p, ...i[s]] : p;
      },
    };
  },
  lg = (t, l) => {
    if (t.length === 0) return l.classGroupId;
    const a = t[0],
      i = l.nextPart.get(a),
      o = i ? lg(t.slice(1), i) : void 0;
    if (o) return o;
    if (l.validators.length === 0) return;
    const c = t.join(Lf);
    return l.validators.find(({ validator: s }) => s(c))?.classGroupId;
  },
  _1 = /^\[(.+)\]$/,
  c6 = (t) => {
    if (_1.test(t)) {
      const l = _1.exec(t)[1],
        a = l?.substring(0, l.indexOf(":"));
      if (a) return "arbitrary.." + a;
    }
  },
  f6 = (t) => {
    const { theme: l, classGroups: a } = t,
      i = { nextPart: new Map(), validators: [] };
    for (const o in a) pf(a[o], i, o, l);
    return i;
  },
  pf = (t, l, a, i) => {
    t.forEach((o) => {
      if (typeof o == "string") {
        const c = o === "" ? l : T1(l, o);
        c.classGroupId = a;
        return;
      }
      if (typeof o == "function") {
        if (h6(o)) {
          pf(o(i), l, a, i);
          return;
        }
        l.validators.push({ validator: o, classGroupId: a });
        return;
      }
      Object.entries(o).forEach(([c, s]) => {
        pf(s, T1(l, c), a, i);
      });
    });
  },
  T1 = (t, l) => {
    let a = t;
    return (
      l.split(Lf).forEach((i) => {
        (a.nextPart.has(i) ||
          a.nextPart.set(i, { nextPart: new Map(), validators: [] }),
          (a = a.nextPart.get(i)));
      }),
      a
    );
  },
  h6 = (t) => t.isThemeGetter,
  d6 = (t) => {
    if (t < 1) return { get: () => {}, set: () => {} };
    let l = 0,
      a = new Map(),
      i = new Map();
    const o = (c, s) => {
      (a.set(c, s), l++, l > t && ((l = 0), (i = a), (a = new Map())));
    };
    return {
      get(c) {
        let s = a.get(c);
        if (s !== void 0) return s;
        if ((s = i.get(c)) !== void 0) return (o(c, s), s);
      },
      set(c, s) {
        a.has(c) ? a.set(c, s) : o(c, s);
      },
    };
  },
  mf = "!",
  gf = ":",
  p6 = gf.length,
  m6 = (t) => {
    const { prefix: l, experimentalParseClassName: a } = t;
    let i = (o) => {
      const c = [];
      let s = 0,
        h = 0,
        p = 0,
        m;
      for (let A = 0; A < o.length; A++) {
        let C = o[A];
        if (s === 0 && h === 0) {
          if (C === gf) {
            (c.push(o.slice(p, A)), (p = A + p6));
            continue;
          }
          if (C === "/") {
            m = A;
            continue;
          }
        }
        C === "[" ? s++ : C === "]" ? s-- : C === "(" ? h++ : C === ")" && h--;
      }
      const y = c.length === 0 ? o : o.substring(p),
        g = g6(y),
        k = g !== y,
        v = m && m > p ? m - p : void 0;
      return {
        modifiers: c,
        hasImportantModifier: k,
        baseClassName: g,
        maybePostfixModifierPosition: v,
      };
    };
    if (l) {
      const o = l + gf,
        c = i;
      i = (s) =>
        s.startsWith(o)
          ? c(s.substring(o.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: s,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (a) {
      const o = i;
      i = (c) => a({ className: c, parseClassName: o });
    }
    return i;
  },
  g6 = (t) =>
    t.endsWith(mf)
      ? t.substring(0, t.length - 1)
      : t.startsWith(mf)
        ? t.substring(1)
        : t,
  y6 = (t) => {
    const l = Object.fromEntries(t.orderSensitiveModifiers.map((i) => [i, !0]));
    return (i) => {
      if (i.length <= 1) return i;
      const o = [];
      let c = [];
      return (
        i.forEach((s) => {
          s[0] === "[" || l[s] ? (o.push(...c.sort(), s), (c = [])) : c.push(s);
        }),
        o.push(...c.sort()),
        o
      );
    };
  },
  b6 = (t) => ({
    cache: d6(t.cacheSize),
    parseClassName: m6(t),
    sortModifiers: y6(t),
    ...s6(t),
  }),
  x6 = /\s+/,
  v6 = (t, l) => {
    const {
        parseClassName: a,
        getClassGroupId: i,
        getConflictingClassGroupIds: o,
        sortModifiers: c,
      } = l,
      s = [],
      h = t.trim().split(x6);
    let p = "";
    for (let m = h.length - 1; m >= 0; m -= 1) {
      const y = h[m],
        {
          isExternal: g,
          modifiers: k,
          hasImportantModifier: v,
          baseClassName: A,
          maybePostfixModifierPosition: C,
        } = a(y);
      if (g) {
        p = y + (p.length > 0 ? " " + p : p);
        continue;
      }
      let U = !!C,
        R = i(U ? A.substring(0, C) : A);
      if (!R) {
        if (!U) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (((R = i(A)), !R)) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        U = !1;
      }
      const Y = c(k).join(":"),
        V = v ? Y + mf : Y,
        ee = V + R;
      if (s.includes(ee)) continue;
      s.push(ee);
      const O = o(R, U);
      for (let _ = 0; _ < O.length; ++_) {
        const F = O[_];
        s.push(V + F);
      }
      p = y + (p.length > 0 ? " " + p : p);
    }
    return p;
  };
function k6() {
  let t = 0,
    l,
    a,
    i = "";
  for (; t < arguments.length; )
    (l = arguments[t++]) && (a = rg(l)) && (i && (i += " "), (i += a));
  return i;
}
const rg = (t) => {
  if (typeof t == "string") return t;
  let l,
    a = "";
  for (let i = 0; i < t.length; i++)
    t[i] && (l = rg(t[i])) && (a && (a += " "), (a += l));
  return a;
};
function S6(t, ...l) {
  let a,
    i,
    o,
    c = s;
  function s(p) {
    const m = l.reduce((y, g) => g(y), t());
    return ((a = b6(m)), (i = a.cache.get), (o = a.cache.set), (c = h), h(p));
  }
  function h(p) {
    const m = i(p);
    if (m) return m;
    const y = v6(p, a);
    return (o(p, y), y);
  }
  return function () {
    return c(k6.apply(null, arguments));
  };
}
const bt = (t) => {
    const l = (a) => a[t] || [];
    return ((l.isThemeGetter = !0), l);
  },
  ag = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  ig = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  w6 = /^\d+\/\d+$/,
  E6 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  A6 =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  _6 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  T6 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  C6 =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Zr = (t) => w6.test(t),
  ze = (t) => !!t && !Number.isNaN(Number(t)),
  Al = (t) => !!t && Number.isInteger(Number(t)),
  Hc = (t) => t.endsWith("%") && ze(t.slice(0, -1)),
  $n = (t) => E6.test(t),
  R6 = () => !0,
  M6 = (t) => A6.test(t) && !_6.test(t),
  ug = () => !1,
  z6 = (t) => T6.test(t),
  D6 = (t) => C6.test(t),
  O6 = (t) => !fe(t) && !he(t),
  N6 = (t) => $r(t, cg, ug),
  fe = (t) => ag.test(t),
  $l = (t) => $r(t, fg, M6),
  jc = (t) => $r(t, B6, ze),
  C1 = (t) => $r(t, og, ug),
  L6 = (t) => $r(t, sg, D6),
  Hu = (t) => $r(t, hg, z6),
  he = (t) => ig.test(t),
  Pa = (t) => Pr(t, fg),
  H6 = (t) => Pr(t, V6),
  R1 = (t) => Pr(t, og),
  j6 = (t) => Pr(t, cg),
  U6 = (t) => Pr(t, sg),
  ju = (t) => Pr(t, hg, !0),
  $r = (t, l, a) => {
    const i = ag.exec(t);
    return i ? (i[1] ? l(i[1]) : a(i[2])) : !1;
  },
  Pr = (t, l, a = !1) => {
    const i = ig.exec(t);
    return i ? (i[1] ? l(i[1]) : a) : !1;
  },
  og = (t) => t === "position" || t === "percentage",
  sg = (t) => t === "image" || t === "url",
  cg = (t) => t === "length" || t === "size" || t === "bg-size",
  fg = (t) => t === "length",
  B6 = (t) => t === "number",
  V6 = (t) => t === "family-name",
  hg = (t) => t === "shadow",
  q6 = () => {
    const t = bt("color"),
      l = bt("font"),
      a = bt("text"),
      i = bt("font-weight"),
      o = bt("tracking"),
      c = bt("leading"),
      s = bt("breakpoint"),
      h = bt("container"),
      p = bt("spacing"),
      m = bt("radius"),
      y = bt("shadow"),
      g = bt("inset-shadow"),
      k = bt("text-shadow"),
      v = bt("drop-shadow"),
      A = bt("blur"),
      C = bt("perspective"),
      U = bt("aspect"),
      R = bt("ease"),
      Y = bt("animate"),
      V = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      ee = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      O = () => [...ee(), he, fe],
      _ = () => ["auto", "hidden", "clip", "visible", "scroll"],
      F = () => ["auto", "contain", "none"],
      q = () => [he, fe, p],
      K = () => [Zr, "full", "auto", ...q()],
      z = () => [Al, "none", "subgrid", he, fe],
      ne = () => ["auto", { span: ["full", Al, he, fe] }, Al, he, fe],
      te = () => [Al, "auto", he, fe],
      le = () => ["auto", "min", "max", "fr", he, fe],
      ie = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      ue = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      L = () => ["auto", ...q()],
      J = () => [
        Zr,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...q(),
      ],
      Q = () => [t, he, fe],
      be = () => [...ee(), R1, C1, { position: [he, fe] }],
      x = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      G = () => ["auto", "cover", "contain", j6, N6, { size: [he, fe] }],
      re = () => [Hc, Pa, $l],
      w = () => ["", "none", "full", m, he, fe],
      oe = () => ["", ze, Pa, $l],
      ge = () => ["solid", "dashed", "dotted", "double"],
      se = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      Ee = () => [ze, Hc, R1, C1],
      Te = () => ["", "none", A, he, fe],
      lt = () => ["none", ze, he, fe],
      at = () => ["none", ze, he, fe],
      xt = () => [ze, he, fe],
      Ae = () => [Zr, "full", ...q()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [$n],
        breakpoint: [$n],
        color: [R6],
        container: [$n],
        "drop-shadow": [$n],
        ease: ["in", "out", "in-out"],
        font: [O6],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [$n],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [$n],
        shadow: [$n],
        spacing: ["px", ze],
        text: [$n],
        "text-shadow": [$n],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Zr, fe, he, U] }],
        container: ["container"],
        columns: [{ columns: [ze, fe, he, h] }],
        "break-after": [{ "break-after": V() }],
        "break-before": [{ "break-before": V() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: O() }],
        overflow: [{ overflow: _() }],
        "overflow-x": [{ "overflow-x": _() }],
        "overflow-y": [{ "overflow-y": _() }],
        overscroll: [{ overscroll: F() }],
        "overscroll-x": [{ "overscroll-x": F() }],
        "overscroll-y": [{ "overscroll-y": F() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: K() }],
        "inset-x": [{ "inset-x": K() }],
        "inset-y": [{ "inset-y": K() }],
        start: [{ start: K() }],
        end: [{ end: K() }],
        top: [{ top: K() }],
        right: [{ right: K() }],
        bottom: [{ bottom: K() }],
        left: [{ left: K() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Al, "auto", he, fe] }],
        basis: [{ basis: [Zr, "full", "auto", h, ...q()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [ze, Zr, "auto", "initial", "none", fe] }],
        grow: [{ grow: ["", ze, he, fe] }],
        shrink: [{ shrink: ["", ze, he, fe] }],
        order: [{ order: [Al, "first", "last", "none", he, fe] }],
        "grid-cols": [{ "grid-cols": z() }],
        "col-start-end": [{ col: ne() }],
        "col-start": [{ "col-start": te() }],
        "col-end": [{ "col-end": te() }],
        "grid-rows": [{ "grid-rows": z() }],
        "row-start-end": [{ row: ne() }],
        "row-start": [{ "row-start": te() }],
        "row-end": [{ "row-end": te() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": le() }],
        "auto-rows": [{ "auto-rows": le() }],
        gap: [{ gap: q() }],
        "gap-x": [{ "gap-x": q() }],
        "gap-y": [{ "gap-y": q() }],
        "justify-content": [{ justify: [...ie(), "normal"] }],
        "justify-items": [{ "justify-items": [...ue(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...ue()] }],
        "align-content": [{ content: ["normal", ...ie()] }],
        "align-items": [{ items: [...ue(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...ue(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": ie() }],
        "place-items": [{ "place-items": [...ue(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...ue()] }],
        p: [{ p: q() }],
        px: [{ px: q() }],
        py: [{ py: q() }],
        ps: [{ ps: q() }],
        pe: [{ pe: q() }],
        pt: [{ pt: q() }],
        pr: [{ pr: q() }],
        pb: [{ pb: q() }],
        pl: [{ pl: q() }],
        m: [{ m: L() }],
        mx: [{ mx: L() }],
        my: [{ my: L() }],
        ms: [{ ms: L() }],
        me: [{ me: L() }],
        mt: [{ mt: L() }],
        mr: [{ mr: L() }],
        mb: [{ mb: L() }],
        ml: [{ ml: L() }],
        "space-x": [{ "space-x": q() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": q() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: J() }],
        w: [{ w: [h, "screen", ...J()] }],
        "min-w": [{ "min-w": [h, "screen", "none", ...J()] }],
        "max-w": [
          { "max-w": [h, "screen", "none", "prose", { screen: [s] }, ...J()] },
        ],
        h: [{ h: ["screen", "lh", ...J()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...J()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...J()] }],
        "font-size": [{ text: ["base", a, Pa, $l] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [i, he, jc] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Hc,
              fe,
            ],
          },
        ],
        "font-family": [{ font: [H6, fe, l] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [o, he, fe] }],
        "line-clamp": [{ "line-clamp": [ze, "none", he, jc] }],
        leading: [{ leading: [c, ...q()] }],
        "list-image": [{ "list-image": ["none", he, fe] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", he, fe] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: Q() }],
        "text-color": [{ text: Q() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ge(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [ze, "from-font", "auto", he, $l] },
        ],
        "text-decoration-color": [{ decoration: Q() }],
        "underline-offset": [{ "underline-offset": [ze, "auto", he, fe] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: q() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              he,
              fe,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", he, fe] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: be() }],
        "bg-repeat": [{ bg: x() }],
        "bg-size": [{ bg: G() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Al,
                  he,
                  fe,
                ],
                radial: ["", he, fe],
                conic: [Al, he, fe],
              },
              U6,
              L6,
            ],
          },
        ],
        "bg-color": [{ bg: Q() }],
        "gradient-from-pos": [{ from: re() }],
        "gradient-via-pos": [{ via: re() }],
        "gradient-to-pos": [{ to: re() }],
        "gradient-from": [{ from: Q() }],
        "gradient-via": [{ via: Q() }],
        "gradient-to": [{ to: Q() }],
        rounded: [{ rounded: w() }],
        "rounded-s": [{ "rounded-s": w() }],
        "rounded-e": [{ "rounded-e": w() }],
        "rounded-t": [{ "rounded-t": w() }],
        "rounded-r": [{ "rounded-r": w() }],
        "rounded-b": [{ "rounded-b": w() }],
        "rounded-l": [{ "rounded-l": w() }],
        "rounded-ss": [{ "rounded-ss": w() }],
        "rounded-se": [{ "rounded-se": w() }],
        "rounded-ee": [{ "rounded-ee": w() }],
        "rounded-es": [{ "rounded-es": w() }],
        "rounded-tl": [{ "rounded-tl": w() }],
        "rounded-tr": [{ "rounded-tr": w() }],
        "rounded-br": [{ "rounded-br": w() }],
        "rounded-bl": [{ "rounded-bl": w() }],
        "border-w": [{ border: oe() }],
        "border-w-x": [{ "border-x": oe() }],
        "border-w-y": [{ "border-y": oe() }],
        "border-w-s": [{ "border-s": oe() }],
        "border-w-e": [{ "border-e": oe() }],
        "border-w-t": [{ "border-t": oe() }],
        "border-w-r": [{ "border-r": oe() }],
        "border-w-b": [{ "border-b": oe() }],
        "border-w-l": [{ "border-l": oe() }],
        "divide-x": [{ "divide-x": oe() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": oe() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...ge(), "hidden", "none"] }],
        "divide-style": [{ divide: [...ge(), "hidden", "none"] }],
        "border-color": [{ border: Q() }],
        "border-color-x": [{ "border-x": Q() }],
        "border-color-y": [{ "border-y": Q() }],
        "border-color-s": [{ "border-s": Q() }],
        "border-color-e": [{ "border-e": Q() }],
        "border-color-t": [{ "border-t": Q() }],
        "border-color-r": [{ "border-r": Q() }],
        "border-color-b": [{ "border-b": Q() }],
        "border-color-l": [{ "border-l": Q() }],
        "divide-color": [{ divide: Q() }],
        "outline-style": [{ outline: [...ge(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [ze, he, fe] }],
        "outline-w": [{ outline: ["", ze, Pa, $l] }],
        "outline-color": [{ outline: Q() }],
        shadow: [{ shadow: ["", "none", y, ju, Hu] }],
        "shadow-color": [{ shadow: Q() }],
        "inset-shadow": [{ "inset-shadow": ["none", g, ju, Hu] }],
        "inset-shadow-color": [{ "inset-shadow": Q() }],
        "ring-w": [{ ring: oe() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: Q() }],
        "ring-offset-w": [{ "ring-offset": [ze, $l] }],
        "ring-offset-color": [{ "ring-offset": Q() }],
        "inset-ring-w": [{ "inset-ring": oe() }],
        "inset-ring-color": [{ "inset-ring": Q() }],
        "text-shadow": [{ "text-shadow": ["none", k, ju, Hu] }],
        "text-shadow-color": [{ "text-shadow": Q() }],
        opacity: [{ opacity: [ze, he, fe] }],
        "mix-blend": [
          { "mix-blend": [...se(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": se() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [ze] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": Ee() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": Ee() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": Q() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": Q() }],
        "mask-image-t-from-pos": [{ "mask-t-from": Ee() }],
        "mask-image-t-to-pos": [{ "mask-t-to": Ee() }],
        "mask-image-t-from-color": [{ "mask-t-from": Q() }],
        "mask-image-t-to-color": [{ "mask-t-to": Q() }],
        "mask-image-r-from-pos": [{ "mask-r-from": Ee() }],
        "mask-image-r-to-pos": [{ "mask-r-to": Ee() }],
        "mask-image-r-from-color": [{ "mask-r-from": Q() }],
        "mask-image-r-to-color": [{ "mask-r-to": Q() }],
        "mask-image-b-from-pos": [{ "mask-b-from": Ee() }],
        "mask-image-b-to-pos": [{ "mask-b-to": Ee() }],
        "mask-image-b-from-color": [{ "mask-b-from": Q() }],
        "mask-image-b-to-color": [{ "mask-b-to": Q() }],
        "mask-image-l-from-pos": [{ "mask-l-from": Ee() }],
        "mask-image-l-to-pos": [{ "mask-l-to": Ee() }],
        "mask-image-l-from-color": [{ "mask-l-from": Q() }],
        "mask-image-l-to-color": [{ "mask-l-to": Q() }],
        "mask-image-x-from-pos": [{ "mask-x-from": Ee() }],
        "mask-image-x-to-pos": [{ "mask-x-to": Ee() }],
        "mask-image-x-from-color": [{ "mask-x-from": Q() }],
        "mask-image-x-to-color": [{ "mask-x-to": Q() }],
        "mask-image-y-from-pos": [{ "mask-y-from": Ee() }],
        "mask-image-y-to-pos": [{ "mask-y-to": Ee() }],
        "mask-image-y-from-color": [{ "mask-y-from": Q() }],
        "mask-image-y-to-color": [{ "mask-y-to": Q() }],
        "mask-image-radial": [{ "mask-radial": [he, fe] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": Ee() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": Ee() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": Q() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": Q() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": ee() }],
        "mask-image-conic-pos": [{ "mask-conic": [ze] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": Ee() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": Ee() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": Q() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": Q() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: be() }],
        "mask-repeat": [{ mask: x() }],
        "mask-size": [{ mask: G() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", he, fe] }],
        filter: [{ filter: ["", "none", he, fe] }],
        blur: [{ blur: Te() }],
        brightness: [{ brightness: [ze, he, fe] }],
        contrast: [{ contrast: [ze, he, fe] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", v, ju, Hu] }],
        "drop-shadow-color": [{ "drop-shadow": Q() }],
        grayscale: [{ grayscale: ["", ze, he, fe] }],
        "hue-rotate": [{ "hue-rotate": [ze, he, fe] }],
        invert: [{ invert: ["", ze, he, fe] }],
        saturate: [{ saturate: [ze, he, fe] }],
        sepia: [{ sepia: ["", ze, he, fe] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", he, fe] }],
        "backdrop-blur": [{ "backdrop-blur": Te() }],
        "backdrop-brightness": [{ "backdrop-brightness": [ze, he, fe] }],
        "backdrop-contrast": [{ "backdrop-contrast": [ze, he, fe] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", ze, he, fe] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [ze, he, fe] }],
        "backdrop-invert": [{ "backdrop-invert": ["", ze, he, fe] }],
        "backdrop-opacity": [{ "backdrop-opacity": [ze, he, fe] }],
        "backdrop-saturate": [{ "backdrop-saturate": [ze, he, fe] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", ze, he, fe] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": q() }],
        "border-spacing-x": [{ "border-spacing-x": q() }],
        "border-spacing-y": [{ "border-spacing-y": q() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              he,
              fe,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [ze, "initial", he, fe] }],
        ease: [{ ease: ["linear", "initial", R, he, fe] }],
        delay: [{ delay: [ze, he, fe] }],
        animate: [{ animate: ["none", Y, he, fe] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [C, he, fe] }],
        "perspective-origin": [{ "perspective-origin": O() }],
        rotate: [{ rotate: lt() }],
        "rotate-x": [{ "rotate-x": lt() }],
        "rotate-y": [{ "rotate-y": lt() }],
        "rotate-z": [{ "rotate-z": lt() }],
        scale: [{ scale: at() }],
        "scale-x": [{ "scale-x": at() }],
        "scale-y": [{ "scale-y": at() }],
        "scale-z": [{ "scale-z": at() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: xt() }],
        "skew-x": [{ "skew-x": xt() }],
        "skew-y": [{ "skew-y": xt() }],
        transform: [{ transform: [he, fe, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: O() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: Ae() }],
        "translate-x": [{ "translate-x": Ae() }],
        "translate-y": [{ "translate-y": Ae() }],
        "translate-z": [{ "translate-z": Ae() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: Q() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: Q() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              he,
              fe,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": q() }],
        "scroll-mx": [{ "scroll-mx": q() }],
        "scroll-my": [{ "scroll-my": q() }],
        "scroll-ms": [{ "scroll-ms": q() }],
        "scroll-me": [{ "scroll-me": q() }],
        "scroll-mt": [{ "scroll-mt": q() }],
        "scroll-mr": [{ "scroll-mr": q() }],
        "scroll-mb": [{ "scroll-mb": q() }],
        "scroll-ml": [{ "scroll-ml": q() }],
        "scroll-p": [{ "scroll-p": q() }],
        "scroll-px": [{ "scroll-px": q() }],
        "scroll-py": [{ "scroll-py": q() }],
        "scroll-ps": [{ "scroll-ps": q() }],
        "scroll-pe": [{ "scroll-pe": q() }],
        "scroll-pt": [{ "scroll-pt": q() }],
        "scroll-pr": [{ "scroll-pr": q() }],
        "scroll-pb": [{ "scroll-pb": q() }],
        "scroll-pl": [{ "scroll-pl": q() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", he, fe],
          },
        ],
        fill: [{ fill: ["none", ...Q()] }],
        "stroke-w": [{ stroke: [ze, Pa, $l, jc] }],
        stroke: [{ stroke: ["none", ...Q()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Z6 = S6(q6);
function Mn(...t) {
  return Z6(o6(t));
}
const Hf = ({ children: t, className: l, content: a, id: i }) => {
    const { activeTooltip: o, showTooltip: c, hideTooltip: s } = u6(),
      [h, p] = E.useState("center"),
      [m, y] = E.useState("top"),
      [g, k] = E.useState(!1),
      [v, A] = E.useState(!1),
      C = E.useRef(null);
    E.useEffect(() => {
      k(window.matchMedia("(hover: hover)").matches);
    }, []);
    const U = i ? i + a : a,
      R = `tooltip-${i || a.replace(/\s+/g, "-")}`,
      Y = o === U;
    return (
      E.useLayoutEffect(() => {
        Y
          ? (() => {
              const ee = C.current;
              if (ee) {
                const O = ee.getBoundingClientRect(),
                  { top: _, left: F, bottom: q, right: K } = O,
                  z = window.innerWidth,
                  ne = window.innerHeight;
                (_ <= 0 && y("bottom"),
                  F <= 0 && p("left"),
                  q >= ne && y("top"),
                  K >= z && p("right"));
              }
            })()
          : (p("center"), y("top"));
      }, [Y]),
      Z.jsxs("div", {
        "aria-describedby": Y ? R : void 0,
        className: Mn("relative inline-block", l),
        onMouseEnter: () => g && c(U, !1),
        onMouseLeave: () => s(),
        onPointerDown: (V) => {
          V.pointerType === "mouse" && A(!0);
        },
        onPointerUp: () => A(!1),
        onFocus: () => {
          g ? (v ? c(U, !1) : c(U, !0)) : s();
        },
        onBlur: () => s(),
        children: [
          t,
          Y &&
            Z.jsx("span", {
              "aria-hidden": !Y,
              className: Mn(
                "bg-ob-base-1000 text-ob-inverted absolute w-max rounded-md px-2 py-1 text-sm shadow before:absolute before:top-0 before:left-0 before:size-full before:scale-[1.5] before:bg-transparent",
                {
                  "left-0 translate-x-0": h === "left",
                  "right-0 translate-x-0": h === "right",
                  "left-1/2 -translate-x-1/2": h === "center",
                  "-bottom-7": m === "bottom",
                  "-top-7": m === "top",
                }
              ),
              id: R,
              ref: C,
              role: "tooltip",
              children: a,
            }),
        ],
      })
    );
  },
  M1 = ({
    as: t,
    children: l,
    className: a,
    disabled: i,
    displayContent: o = "items-last",
    external: c,
    href: s,
    loading: h,
    shape: p = "base",
    size: m = "base",
    title: y,
    toggled: g,
    variant: k = "secondary",
    ...v
  }) =>
    Z.jsxs(eg, {
      as: t ?? "button",
      className: Mn(
        "btn add-focus group interactive flex w-max shrink-0 items-center font-medium select-none",
        {
          "btn-primary": k === "primary",
          "btn-secondary": k === "secondary",
          "btn-tertiary": k === "tertiary",
          "btn-ghost": k === "ghost",
          "btn-destructive": k === "destructive",
          "add-size-sm gap-1": m === "sm",
          "add-size-md gap-1.5": m === "md",
          "add-size-base gap-2": m === "base",
          square: p === "square",
          circular: p === "circular",
          "flex-row-reverse": o === "items-first",
          "add-disable": i,
          toggle: g,
        },
        a
      ),
      disabled: i,
      href: s,
      rel: c ? "noopener noreferrer" : void 0,
      target: c ? "_blank" : void 0,
      ...v,
      children: [
        y,
        h
          ? Z.jsx("span", {
              className: Mn({
                "w-3": m === "sm",
                "w-3.5": m === "md",
                "w-4": m === "base",
                "ease-bounce transition-[width] duration-300 starting:w-0": !l,
              }),
              children: Z.jsx(a6, {
                size: m === "sm" ? 12 : m === "md" ? 14 : 16,
              }),
            })
          : l,
      ],
    }),
  di = ({ ...t }) =>
    t.tooltip
      ? Z.jsx(Hf, {
          content: t.tooltip,
          className: t.className,
          id: t.id,
          children: Z.jsx(M1, { ...t, className: void 0 }),
        })
      : Z.jsx(M1, { ...t }),
  Gu = ({
    as: t,
    children: l,
    className: a,
    ref: i,
    tabIndex: o,
    variant: c = "secondary",
  }) => {
    const s = t ?? "div";
    return Z.jsx(s, {
      className: Mn(
        "w-full rounded-lg p-4",
        { "btn-primary": c === "primary", "btn-secondary": c === "secondary" },
        a
      ),
      ref: i,
      tabIndex: o,
      children: l,
    });
  },
  z1 = ({
    as: t,
    className: l,
    external: a,
    href: i,
    image: o,
    size: c = "base",
    toggled: s,
    username: h,
  }) => {
    const p = h.charAt(0).toUpperCase();
    return Z.jsx(eg, {
      as: t ?? "div",
      className: Mn(
        "btn btn-secondary circular add-focus relative overflow-hidden",
        {
          "add-size-sm": c === "sm",
          "add-size-md": c === "md",
          "add-size-base": c === "base",
          interactive: t === "button",
          "after:absolute after:top-0 after:left-0 after:z-10 after:size-full after:bg-black/10 after:opacity-0 after:transition-opacity hover:after:opacity-100 dark:after:bg-white/10":
            o,
          "after:opacity-100": o && s,
          toggle: !o && s,
        },
        l
      ),
      href: i,
      rel: a ? "noopener noreferrer" : void 0,
      target: a ? "_blank" : void 0,
      children: o
        ? Z.jsx("img", {
            className: "w-full",
            height: c === "sm" ? 28 : c === "base" ? 32 : 36,
            width: c === "sm" ? 28 : c === "base" ? 32 : 36,
            src: o,
            alt: h,
          })
        : Z.jsx("p", { className: "text-100 font-bold", children: p }),
    });
  },
  I6 = ({ ...t }) =>
    t.tooltip
      ? Z.jsx(Hf, {
          content: t.tooltip,
          className: t.className,
          id: t.id,
          children: Z.jsx(z1, { ...t, className: void 0 }),
        })
      : Z.jsx(z1, { ...t }),
  Y6 = ({ onClick: t, size: l = "base", toggled: a }) =>
    Z.jsx("button", {
      type: "button",
      className: Mn(
        "ob-focus interactive dark:bg-neutral-750 bg-neutral-250 cursor-pointer rounded-full border border-transparent p-1 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700",
        {
          "h-5.5 w-8.5": l === "sm",
          "h-6.5 w-10.5": l === "base",
          "h-7.5 w-12.5": l === "lg",
          "dark:hover:bg-neutral-450 bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-500":
            a,
        }
      ),
      onClick: t,
      children: Z.jsx("div", {
        className: Mn(
          "aspect-square h-full rounded-full bg-white transition-all",
          { "translate-x-full": a }
        ),
      }),
    }),
  dg = E.forwardRef(({ className: t, ...l }, a) =>
    Z.jsx("textarea", {
      className: Mn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t
      ),
      ref: a,
      ...l,
    })
  );
dg.displayName = "Textarea";
function jf() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
var er = jf();
function pg(t) {
  er = t;
}
var li = { exec: () => null };
function Ge(t, l = "") {
  let a = typeof t == "string" ? t : t.source,
    i = {
      replace: (o, c) => {
        let s = typeof c == "string" ? c : c.source;
        return ((s = s.replace(Ut.caret, "$1")), (a = a.replace(o, s)), i);
      },
      getRegex: () => new RegExp(a, l),
    };
  return i;
}
var Ut = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (t) =>
      new RegExp(
        `^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
      ),
    hrRegex: (t) =>
      new RegExp(
        `^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
      ),
    fencesBeginRegex: (t) =>
      new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`),
    htmlBeginRegex: (t) =>
      new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i"),
  },
  G6 = /^(?:[ \t]*(?:\n|$))+/,
  F6 = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
  Q6 =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  bi = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  X6 = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  Uf = /(?:[*+-]|\d{1,9}[.)])/,
  mg =
    /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  gg = Ge(mg)
    .replace(/bull/g, Uf)
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .replace(/\|table/g, "")
    .getRegex(),
  $6 = Ge(mg)
    .replace(/bull/g, Uf)
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/)
    .getRegex(),
  Bf =
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  P6 = /^[^\n]+/,
  Vf = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  K6 = Ge(
    /^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/
  )
    .replace("label", Vf)
    .replace(
      "title",
      /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    )
    .getRegex(),
  J6 = Ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, Uf)
    .getRegex(),
  eo =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
  qf = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  W6 = Ge(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i"
  )
    .replace("comment", qf)
    .replace("tag", eo)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex(),
  yg = Ge(Bf)
    .replace("hr", bi)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", eo)
    .getRegex(),
  e8 = Ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace("paragraph", yg)
    .getRegex(),
  Zf = {
    blockquote: e8,
    code: F6,
    def: K6,
    fences: Q6,
    heading: X6,
    hr: bi,
    html: W6,
    lheading: gg,
    list: J6,
    newline: G6,
    paragraph: yg,
    table: li,
    text: P6,
  },
  D1 = Ge(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  )
    .replace("hr", bi)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("blockquote", " {0,3}>")
    .replace("code", "(?: {4}| {0,3}	)[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", eo)
    .getRegex(),
  t8 = {
    ...Zf,
    lheading: $6,
    table: D1,
    paragraph: Ge(Bf)
      .replace("hr", bi)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("table", D1)
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
      )
      .replace("tag", eo)
      .getRegex(),
  },
  n8 = {
    ...Zf,
    html: Ge(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    )
      .replace("comment", qf)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: li,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: Ge(Bf)
      .replace("hr", bi)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`
      )
      .replace("lheading", gg)
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .replace("|tag", "")
      .getRegex(),
  },
  l8 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  r8 = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  bg = /^( {2,}|\\)\n(?!\s*$)/,
  a8 =
    /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  to = /[\p{P}\p{S}]/u,
  If = /[\s\p{P}\p{S}]/u,
  xg = /[^\s\p{P}\p{S}]/u,
  i8 = Ge(/^((?![*_])punctSpace)/, "u")
    .replace(/punctSpace/g, If)
    .getRegex(),
  vg = /(?!~)[\p{P}\p{S}]/u,
  u8 = /(?!~)[\s\p{P}\p{S}]/u,
  o8 = /(?:[^\s\p{P}\p{S}]|~)/u,
  s8 =
    /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,
  kg = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,
  c8 = Ge(kg, "u").replace(/punct/g, to).getRegex(),
  f8 = Ge(kg, "u").replace(/punct/g, vg).getRegex(),
  Sg =
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",
  h8 = Ge(Sg, "gu")
    .replace(/notPunctSpace/g, xg)
    .replace(/punctSpace/g, If)
    .replace(/punct/g, to)
    .getRegex(),
  d8 = Ge(Sg, "gu")
    .replace(/notPunctSpace/g, o8)
    .replace(/punctSpace/g, u8)
    .replace(/punct/g, vg)
    .getRegex(),
  p8 = Ge(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu"
  )
    .replace(/notPunctSpace/g, xg)
    .replace(/punctSpace/g, If)
    .replace(/punct/g, to)
    .getRegex(),
  m8 = Ge(/\\(punct)/, "gu")
    .replace(/punct/g, to)
    .getRegex(),
  g8 = Ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      "email",
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/
    )
    .getRegex(),
  y8 = Ge(qf).replace("(?:-->|$)", "-->").getRegex(),
  b8 = Ge(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  )
    .replace("comment", y8)
    .replace(
      "attribute",
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/
    )
    .getRegex(),
  Fu = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  x8 = Ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/)
    .replace("label", Fu)
    .replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/)
    .replace(
      "title",
      /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/
    )
    .getRegex(),
  wg = Ge(/^!?\[(label)\]\[(ref)\]/)
    .replace("label", Fu)
    .replace("ref", Vf)
    .getRegex(),
  Eg = Ge(/^!?\[(ref)\](?:\[\])?/)
    .replace("ref", Vf)
    .getRegex(),
  v8 = Ge("reflink|nolink(?!\\()", "g")
    .replace("reflink", wg)
    .replace("nolink", Eg)
    .getRegex(),
  Yf = {
    _backpedal: li,
    anyPunctuation: m8,
    autolink: g8,
    blockSkip: s8,
    br: bg,
    code: r8,
    del: li,
    emStrongLDelim: c8,
    emStrongRDelimAst: h8,
    emStrongRDelimUnd: p8,
    escape: l8,
    link: x8,
    nolink: Eg,
    punctuation: i8,
    reflink: wg,
    reflinkSearch: v8,
    tag: b8,
    text: a8,
    url: li,
  },
  k8 = {
    ...Yf,
    link: Ge(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", Fu)
      .getRegex(),
    reflink: Ge(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", Fu)
      .getRegex(),
  },
  yf = {
    ...Yf,
    emStrongRDelimAst: d8,
    emStrongLDelim: f8,
    url: Ge(
      /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      "i"
    )
      .replace(
        "email",
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/
      )
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  },
  S8 = {
    ...yf,
    br: Ge(bg).replace("{2,}", "*").getRegex(),
    text: Ge(yf.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  },
  Uu = { normal: Zf, gfm: t8, pedantic: n8 },
  Ka = { normal: Yf, gfm: yf, breaks: S8, pedantic: k8 },
  w8 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  O1 = (t) => w8[t];
function Tn(t, l) {
  if (l) {
    if (Ut.escapeTest.test(t)) return t.replace(Ut.escapeReplace, O1);
  } else if (Ut.escapeTestNoEncode.test(t))
    return t.replace(Ut.escapeReplaceNoEncode, O1);
  return t;
}
function N1(t) {
  try {
    t = encodeURI(t).replace(Ut.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function L1(t, l) {
  let a = t.replace(Ut.findPipe, (c, s, h) => {
      let p = !1,
        m = s;
      for (; --m >= 0 && h[m] === "\\"; ) p = !p;
      return p ? "|" : " |";
    }),
    i = a.split(Ut.splitPipe),
    o = 0;
  if (
    (i[0].trim() || i.shift(), i.length > 0 && !i.at(-1)?.trim() && i.pop(), l)
  )
    if (i.length > l) i.splice(l);
    else for (; i.length < l; ) i.push("");
  for (; o < i.length; o++) i[o] = i[o].trim().replace(Ut.slashPipe, "|");
  return i;
}
function Ja(t, l, a) {
  let i = t.length;
  if (i === 0) return "";
  let o = 0;
  for (; o < i && t.charAt(i - o - 1) === l; ) o++;
  return t.slice(0, i - o);
}
function E8(t, l) {
  if (t.indexOf(l[1]) === -1) return -1;
  let a = 0;
  for (let i = 0; i < t.length; i++)
    if (t[i] === "\\") i++;
    else if (t[i] === l[0]) a++;
    else if (t[i] === l[1] && (a--, a < 0)) return i;
  return a > 0 ? -2 : -1;
}
function H1(t, l, a, i, o) {
  let c = l.href,
    s = l.title || null,
    h = t[1].replace(o.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let p = {
    type: t[0].charAt(0) === "!" ? "image" : "link",
    raw: a,
    href: c,
    title: s,
    text: h,
    tokens: i.inlineTokens(h),
  };
  return ((i.state.inLink = !1), p);
}
function A8(t, l, a) {
  let i = t.match(a.other.indentCodeCompensation);
  if (i === null) return l;
  let o = i[1];
  return l
    .split(
      `
`
    )
    .map((c) => {
      let s = c.match(a.other.beginningSpace);
      if (s === null) return c;
      let [h] = s;
      return h.length >= o.length ? c.slice(o.length) : c;
    }).join(`
`);
}
var Qu = class {
    options;
    rules;
    lexer;
    constructor(t) {
      this.options = t || er;
    }
    space(t) {
      let l = this.rules.block.newline.exec(t);
      if (l && l[0].length > 0) return { type: "space", raw: l[0] };
    }
    code(t) {
      let l = this.rules.block.code.exec(t);
      if (l) {
        let a = l[0].replace(this.rules.other.codeRemoveIndent, "");
        return {
          type: "code",
          raw: l[0],
          codeBlockStyle: "indented",
          text: this.options.pedantic
            ? a
            : Ja(
                a,
                `
`
              ),
        };
      }
    }
    fences(t) {
      let l = this.rules.block.fences.exec(t);
      if (l) {
        let a = l[0],
          i = A8(a, l[3] || "", this.rules);
        return {
          type: "code",
          raw: a,
          lang: l[2]
            ? l[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
            : l[2],
          text: i,
        };
      }
    }
    heading(t) {
      let l = this.rules.block.heading.exec(t);
      if (l) {
        let a = l[2].trim();
        if (this.rules.other.endingHash.test(a)) {
          let i = Ja(a, "#");
          (this.options.pedantic ||
            !i ||
            this.rules.other.endingSpaceChar.test(i)) &&
            (a = i.trim());
        }
        return {
          type: "heading",
          raw: l[0],
          depth: l[1].length,
          text: a,
          tokens: this.lexer.inline(a),
        };
      }
    }
    hr(t) {
      let l = this.rules.block.hr.exec(t);
      if (l)
        return {
          type: "hr",
          raw: Ja(
            l[0],
            `
`
          ),
        };
    }
    blockquote(t) {
      let l = this.rules.block.blockquote.exec(t);
      if (l) {
        let a = Ja(
            l[0],
            `
`
          ).split(`
`),
          i = "",
          o = "",
          c = [];
        for (; a.length > 0; ) {
          let s = !1,
            h = [],
            p;
          for (p = 0; p < a.length; p++)
            if (this.rules.other.blockquoteStart.test(a[p]))
              (h.push(a[p]), (s = !0));
            else if (!s) h.push(a[p]);
            else break;
          a = a.slice(p);
          let m = h.join(`
`),
            y = m
              .replace(
                this.rules.other.blockquoteSetextReplace,
                `
    $1`
              )
              .replace(this.rules.other.blockquoteSetextReplace2, "");
          ((i = i
            ? `${i}
${m}`
            : m),
            (o = o
              ? `${o}
${y}`
              : y));
          let g = this.lexer.state.top;
          if (
            ((this.lexer.state.top = !0),
            this.lexer.blockTokens(y, c, !0),
            (this.lexer.state.top = g),
            a.length === 0)
          )
            break;
          let k = c.at(-1);
          if (k?.type === "code") break;
          if (k?.type === "blockquote") {
            let v = k,
              A =
                v.raw +
                `
` +
                a.join(`
`),
              C = this.blockquote(A);
            ((c[c.length - 1] = C),
              (i = i.substring(0, i.length - v.raw.length) + C.raw),
              (o = o.substring(0, o.length - v.text.length) + C.text));
            break;
          } else if (k?.type === "list") {
            let v = k,
              A =
                v.raw +
                `
` +
                a.join(`
`),
              C = this.list(A);
            ((c[c.length - 1] = C),
              (i = i.substring(0, i.length - k.raw.length) + C.raw),
              (o = o.substring(0, o.length - v.raw.length) + C.raw),
              (a = A.substring(c.at(-1).raw.length).split(`
`)));
            continue;
          }
        }
        return { type: "blockquote", raw: i, tokens: c, text: o };
      }
    }
    list(t) {
      let l = this.rules.block.list.exec(t);
      if (l) {
        let a = l[1].trim(),
          i = a.length > 1,
          o = {
            type: "list",
            raw: "",
            ordered: i,
            start: i ? +a.slice(0, -1) : "",
            loose: !1,
            items: [],
          };
        ((a = i ? `\\d{1,9}\\${a.slice(-1)}` : `\\${a}`),
          this.options.pedantic && (a = i ? a : "[*+-]"));
        let c = this.rules.other.listItemRegex(a),
          s = !1;
        for (; t; ) {
          let p = !1,
            m = "",
            y = "";
          if (!(l = c.exec(t)) || this.rules.block.hr.test(t)) break;
          ((m = l[0]), (t = t.substring(m.length)));
          let g = l[2]
              .split(
                `
`,
                1
              )[0]
              .replace(this.rules.other.listReplaceTabs, (R) =>
                " ".repeat(3 * R.length)
              ),
            k = t.split(
              `
`,
              1
            )[0],
            v = !g.trim(),
            A = 0;
          if (
            (this.options.pedantic
              ? ((A = 2), (y = g.trimStart()))
              : v
                ? (A = l[1].length + 1)
                : ((A = l[2].search(this.rules.other.nonSpaceChar)),
                  (A = A > 4 ? 1 : A),
                  (y = g.slice(A)),
                  (A += l[1].length)),
            v &&
              this.rules.other.blankLine.test(k) &&
              ((m +=
                k +
                `
`),
              (t = t.substring(k.length + 1)),
              (p = !0)),
            !p)
          ) {
            let R = this.rules.other.nextBulletRegex(A),
              Y = this.rules.other.hrRegex(A),
              V = this.rules.other.fencesBeginRegex(A),
              ee = this.rules.other.headingBeginRegex(A),
              O = this.rules.other.htmlBeginRegex(A);
            for (; t; ) {
              let _ = t.split(
                  `
`,
                  1
                )[0],
                F;
              if (
                ((k = _),
                this.options.pedantic
                  ? ((k = k.replace(this.rules.other.listReplaceNesting, "  ")),
                    (F = k))
                  : (F = k.replace(this.rules.other.tabCharGlobal, "    ")),
                V.test(k) || ee.test(k) || O.test(k) || R.test(k) || Y.test(k))
              )
                break;
              if (F.search(this.rules.other.nonSpaceChar) >= A || !k.trim())
                y +=
                  `
` + F.slice(A);
              else {
                if (
                  v ||
                  g
                    .replace(this.rules.other.tabCharGlobal, "    ")
                    .search(this.rules.other.nonSpaceChar) >= 4 ||
                  V.test(g) ||
                  ee.test(g) ||
                  Y.test(g)
                )
                  break;
                y +=
                  `
` + k;
              }
              (!v && !k.trim() && (v = !0),
                (m +=
                  _ +
                  `
`),
                (t = t.substring(_.length + 1)),
                (g = F.slice(A)));
            }
          }
          o.loose ||
            (s
              ? (o.loose = !0)
              : this.rules.other.doubleBlankLine.test(m) && (s = !0));
          let C = null,
            U;
          (this.options.gfm &&
            ((C = this.rules.other.listIsTask.exec(y)),
            C &&
              ((U = C[0] !== "[ ] "),
              (y = y.replace(this.rules.other.listReplaceTask, "")))),
            o.items.push({
              type: "list_item",
              raw: m,
              task: !!C,
              checked: U,
              loose: !1,
              text: y,
              tokens: [],
            }),
            (o.raw += m));
        }
        let h = o.items.at(-1);
        if (h) ((h.raw = h.raw.trimEnd()), (h.text = h.text.trimEnd()));
        else return;
        o.raw = o.raw.trimEnd();
        for (let p = 0; p < o.items.length; p++)
          if (
            ((this.lexer.state.top = !1),
            (o.items[p].tokens = this.lexer.blockTokens(o.items[p].text, [])),
            !o.loose)
          ) {
            let m = o.items[p].tokens.filter((g) => g.type === "space"),
              y =
                m.length > 0 &&
                m.some((g) => this.rules.other.anyLine.test(g.raw));
            o.loose = y;
          }
        if (o.loose)
          for (let p = 0; p < o.items.length; p++) o.items[p].loose = !0;
        return o;
      }
    }
    html(t) {
      let l = this.rules.block.html.exec(t);
      if (l)
        return {
          type: "html",
          block: !0,
          raw: l[0],
          pre: l[1] === "pre" || l[1] === "script" || l[1] === "style",
          text: l[0],
        };
    }
    def(t) {
      let l = this.rules.block.def.exec(t);
      if (l) {
        let a = l[1]
            .toLowerCase()
            .replace(this.rules.other.multipleSpaceGlobal, " "),
          i = l[2]
            ? l[2]
                .replace(this.rules.other.hrefBrackets, "$1")
                .replace(this.rules.inline.anyPunctuation, "$1")
            : "",
          o = l[3]
            ? l[3]
                .substring(1, l[3].length - 1)
                .replace(this.rules.inline.anyPunctuation, "$1")
            : l[3];
        return { type: "def", tag: a, raw: l[0], href: i, title: o };
      }
    }
    table(t) {
      let l = this.rules.block.table.exec(t);
      if (!l || !this.rules.other.tableDelimiter.test(l[2])) return;
      let a = L1(l[1]),
        i = l[2].replace(this.rules.other.tableAlignChars, "").split("|"),
        o = l[3]?.trim()
          ? l[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`)
          : [],
        c = { type: "table", raw: l[0], header: [], align: [], rows: [] };
      if (a.length === i.length) {
        for (let s of i)
          this.rules.other.tableAlignRight.test(s)
            ? c.align.push("right")
            : this.rules.other.tableAlignCenter.test(s)
              ? c.align.push("center")
              : this.rules.other.tableAlignLeft.test(s)
                ? c.align.push("left")
                : c.align.push(null);
        for (let s = 0; s < a.length; s++)
          c.header.push({
            text: a[s],
            tokens: this.lexer.inline(a[s]),
            header: !0,
            align: c.align[s],
          });
        for (let s of o)
          c.rows.push(
            L1(s, c.header.length).map((h, p) => ({
              text: h,
              tokens: this.lexer.inline(h),
              header: !1,
              align: c.align[p],
            }))
          );
        return c;
      }
    }
    lheading(t) {
      let l = this.rules.block.lheading.exec(t);
      if (l)
        return {
          type: "heading",
          raw: l[0],
          depth: l[2].charAt(0) === "=" ? 1 : 2,
          text: l[1],
          tokens: this.lexer.inline(l[1]),
        };
    }
    paragraph(t) {
      let l = this.rules.block.paragraph.exec(t);
      if (l) {
        let a =
          l[1].charAt(l[1].length - 1) ===
          `
`
            ? l[1].slice(0, -1)
            : l[1];
        return {
          type: "paragraph",
          raw: l[0],
          text: a,
          tokens: this.lexer.inline(a),
        };
      }
    }
    text(t) {
      let l = this.rules.block.text.exec(t);
      if (l)
        return {
          type: "text",
          raw: l[0],
          text: l[0],
          tokens: this.lexer.inline(l[0]),
        };
    }
    escape(t) {
      let l = this.rules.inline.escape.exec(t);
      if (l) return { type: "escape", raw: l[0], text: l[1] };
    }
    tag(t) {
      let l = this.rules.inline.tag.exec(t);
      if (l)
        return (
          !this.lexer.state.inLink && this.rules.other.startATag.test(l[0])
            ? (this.lexer.state.inLink = !0)
            : this.lexer.state.inLink &&
              this.rules.other.endATag.test(l[0]) &&
              (this.lexer.state.inLink = !1),
          !this.lexer.state.inRawBlock &&
          this.rules.other.startPreScriptTag.test(l[0])
            ? (this.lexer.state.inRawBlock = !0)
            : this.lexer.state.inRawBlock &&
              this.rules.other.endPreScriptTag.test(l[0]) &&
              (this.lexer.state.inRawBlock = !1),
          {
            type: "html",
            raw: l[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: l[0],
          }
        );
    }
    link(t) {
      let l = this.rules.inline.link.exec(t);
      if (l) {
        let a = l[2].trim();
        if (
          !this.options.pedantic &&
          this.rules.other.startAngleBracket.test(a)
        ) {
          if (!this.rules.other.endAngleBracket.test(a)) return;
          let c = Ja(a.slice(0, -1), "\\");
          if ((a.length - c.length) % 2 === 0) return;
        } else {
          let c = E8(l[2], "()");
          if (c === -2) return;
          if (c > -1) {
            let s = (l[0].indexOf("!") === 0 ? 5 : 4) + l[1].length + c;
            ((l[2] = l[2].substring(0, c)),
              (l[0] = l[0].substring(0, s).trim()),
              (l[3] = ""));
          }
        }
        let i = l[2],
          o = "";
        if (this.options.pedantic) {
          let c = this.rules.other.pedanticHrefTitle.exec(i);
          c && ((i = c[1]), (o = c[3]));
        } else o = l[3] ? l[3].slice(1, -1) : "";
        return (
          (i = i.trim()),
          this.rules.other.startAngleBracket.test(i) &&
            (this.options.pedantic && !this.rules.other.endAngleBracket.test(a)
              ? (i = i.slice(1))
              : (i = i.slice(1, -1))),
          H1(
            l,
            {
              href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
              title: o && o.replace(this.rules.inline.anyPunctuation, "$1"),
            },
            l[0],
            this.lexer,
            this.rules
          )
        );
      }
    }
    reflink(t, l) {
      let a;
      if (
        (a = this.rules.inline.reflink.exec(t)) ||
        (a = this.rules.inline.nolink.exec(t))
      ) {
        let i = (a[2] || a[1]).replace(
            this.rules.other.multipleSpaceGlobal,
            " "
          ),
          o = l[i.toLowerCase()];
        if (!o) {
          let c = a[0].charAt(0);
          return { type: "text", raw: c, text: c };
        }
        return H1(a, o, a[0], this.lexer, this.rules);
      }
    }
    emStrong(t, l, a = "") {
      let i = this.rules.inline.emStrongLDelim.exec(t);
      if (
        !(!i || (i[3] && a.match(this.rules.other.unicodeAlphaNumeric))) &&
        (!(i[1] || i[2]) || !a || this.rules.inline.punctuation.exec(a))
      ) {
        let o = [...i[0]].length - 1,
          c,
          s,
          h = o,
          p = 0,
          m =
            i[0][0] === "*"
              ? this.rules.inline.emStrongRDelimAst
              : this.rules.inline.emStrongRDelimUnd;
        for (
          m.lastIndex = 0, l = l.slice(-1 * t.length + o);
          (i = m.exec(l)) != null;

        ) {
          if (((c = i[1] || i[2] || i[3] || i[4] || i[5] || i[6]), !c))
            continue;
          if (((s = [...c].length), i[3] || i[4])) {
            h += s;
            continue;
          } else if ((i[5] || i[6]) && o % 3 && !((o + s) % 3)) {
            p += s;
            continue;
          }
          if (((h -= s), h > 0)) continue;
          s = Math.min(s, s + h + p);
          let y = [...i[0]][0].length,
            g = t.slice(0, o + i.index + y + s);
          if (Math.min(o, s) % 2) {
            let v = g.slice(1, -1);
            return {
              type: "em",
              raw: g,
              text: v,
              tokens: this.lexer.inlineTokens(v),
            };
          }
          let k = g.slice(2, -2);
          return {
            type: "strong",
            raw: g,
            text: k,
            tokens: this.lexer.inlineTokens(k),
          };
        }
      }
    }
    codespan(t) {
      let l = this.rules.inline.code.exec(t);
      if (l) {
        let a = l[2].replace(this.rules.other.newLineCharGlobal, " "),
          i = this.rules.other.nonSpaceChar.test(a),
          o =
            this.rules.other.startingSpaceChar.test(a) &&
            this.rules.other.endingSpaceChar.test(a);
        return (
          i && o && (a = a.substring(1, a.length - 1)),
          { type: "codespan", raw: l[0], text: a }
        );
      }
    }
    br(t) {
      let l = this.rules.inline.br.exec(t);
      if (l) return { type: "br", raw: l[0] };
    }
    del(t) {
      let l = this.rules.inline.del.exec(t);
      if (l)
        return {
          type: "del",
          raw: l[0],
          text: l[2],
          tokens: this.lexer.inlineTokens(l[2]),
        };
    }
    autolink(t) {
      let l = this.rules.inline.autolink.exec(t);
      if (l) {
        let a, i;
        return (
          l[2] === "@"
            ? ((a = l[1]), (i = "mailto:" + a))
            : ((a = l[1]), (i = a)),
          {
            type: "link",
            raw: l[0],
            text: a,
            href: i,
            tokens: [{ type: "text", raw: a, text: a }],
          }
        );
      }
    }
    url(t) {
      let l;
      if ((l = this.rules.inline.url.exec(t))) {
        let a, i;
        if (l[2] === "@") ((a = l[0]), (i = "mailto:" + a));
        else {
          let o;
          do
            ((o = l[0]),
              (l[0] = this.rules.inline._backpedal.exec(l[0])?.[0] ?? ""));
          while (o !== l[0]);
          ((a = l[0]), l[1] === "www." ? (i = "http://" + l[0]) : (i = l[0]));
        }
        return {
          type: "link",
          raw: l[0],
          text: a,
          href: i,
          tokens: [{ type: "text", raw: a, text: a }],
        };
      }
    }
    inlineText(t) {
      let l = this.rules.inline.text.exec(t);
      if (l) {
        let a = this.lexer.state.inRawBlock;
        return { type: "text", raw: l[0], text: l[0], escaped: a };
      }
    }
  },
  Kn = class bf {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(l) {
      ((this.tokens = []),
        (this.tokens.links = Object.create(null)),
        (this.options = l || er),
        (this.options.tokenizer = this.options.tokenizer || new Qu()),
        (this.tokenizer = this.options.tokenizer),
        (this.tokenizer.options = this.options),
        (this.tokenizer.lexer = this),
        (this.inlineQueue = []),
        (this.state = { inLink: !1, inRawBlock: !1, top: !0 }));
      let a = { other: Ut, block: Uu.normal, inline: Ka.normal };
      (this.options.pedantic
        ? ((a.block = Uu.pedantic), (a.inline = Ka.pedantic))
        : this.options.gfm &&
          ((a.block = Uu.gfm),
          this.options.breaks ? (a.inline = Ka.breaks) : (a.inline = Ka.gfm)),
        (this.tokenizer.rules = a));
    }
    static get rules() {
      return { block: Uu, inline: Ka };
    }
    static lex(l, a) {
      return new bf(a).lex(l);
    }
    static lexInline(l, a) {
      return new bf(a).inlineTokens(l);
    }
    lex(l) {
      ((l = l.replace(
        Ut.carriageReturn,
        `
`
      )),
        this.blockTokens(l, this.tokens));
      for (let a = 0; a < this.inlineQueue.length; a++) {
        let i = this.inlineQueue[a];
        this.inlineTokens(i.src, i.tokens);
      }
      return ((this.inlineQueue = []), this.tokens);
    }
    blockTokens(l, a = [], i = !1) {
      for (
        this.options.pedantic &&
        (l = l.replace(Ut.tabCharGlobal, "    ").replace(Ut.spaceLine, ""));
        l;

      ) {
        let o;
        if (
          this.options.extensions?.block?.some((s) =>
            (o = s.call({ lexer: this }, l, a))
              ? ((l = l.substring(o.raw.length)), a.push(o), !0)
              : !1
          )
        )
          continue;
        if ((o = this.tokenizer.space(l))) {
          l = l.substring(o.raw.length);
          let s = a.at(-1);
          o.raw.length === 1 && s !== void 0
            ? (s.raw += `
`)
            : a.push(o);
          continue;
        }
        if ((o = this.tokenizer.code(l))) {
          l = l.substring(o.raw.length);
          let s = a.at(-1);
          s?.type === "paragraph" || s?.type === "text"
            ? ((s.raw +=
                `
` + o.raw),
              (s.text +=
                `
` + o.text),
              (this.inlineQueue.at(-1).src = s.text))
            : a.push(o);
          continue;
        }
        if ((o = this.tokenizer.fences(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.heading(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.hr(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.blockquote(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.list(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.html(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.def(l))) {
          l = l.substring(o.raw.length);
          let s = a.at(-1);
          s?.type === "paragraph" || s?.type === "text"
            ? ((s.raw +=
                `
` + o.raw),
              (s.text +=
                `
` + o.raw),
              (this.inlineQueue.at(-1).src = s.text))
            : this.tokens.links[o.tag] ||
              (this.tokens.links[o.tag] = { href: o.href, title: o.title });
          continue;
        }
        if ((o = this.tokenizer.table(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        if ((o = this.tokenizer.lheading(l))) {
          ((l = l.substring(o.raw.length)), a.push(o));
          continue;
        }
        let c = l;
        if (this.options.extensions?.startBlock) {
          let s = 1 / 0,
            h = l.slice(1),
            p;
          (this.options.extensions.startBlock.forEach((m) => {
            ((p = m.call({ lexer: this }, h)),
              typeof p == "number" && p >= 0 && (s = Math.min(s, p)));
          }),
            s < 1 / 0 && s >= 0 && (c = l.substring(0, s + 1)));
        }
        if (this.state.top && (o = this.tokenizer.paragraph(c))) {
          let s = a.at(-1);
          (i && s?.type === "paragraph"
            ? ((s.raw +=
                `
` + o.raw),
              (s.text +=
                `
` + o.text),
              this.inlineQueue.pop(),
              (this.inlineQueue.at(-1).src = s.text))
            : a.push(o),
            (i = c.length !== l.length),
            (l = l.substring(o.raw.length)));
          continue;
        }
        if ((o = this.tokenizer.text(l))) {
          l = l.substring(o.raw.length);
          let s = a.at(-1);
          s?.type === "text"
            ? ((s.raw +=
                `
` + o.raw),
              (s.text +=
                `
` + o.text),
              this.inlineQueue.pop(),
              (this.inlineQueue.at(-1).src = s.text))
            : a.push(o);
          continue;
        }
        if (l) {
          let s = "Infinite loop on byte: " + l.charCodeAt(0);
          if (this.options.silent) {
            console.error(s);
            break;
          } else throw new Error(s);
        }
      }
      return ((this.state.top = !0), a);
    }
    inline(l, a = []) {
      return (this.inlineQueue.push({ src: l, tokens: a }), a);
    }
    inlineTokens(l, a = []) {
      let i = l,
        o = null;
      if (this.tokens.links) {
        let h = Object.keys(this.tokens.links);
        if (h.length > 0)
          for (
            ;
            (o = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null;

          )
            h.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) &&
              (i =
                i.slice(0, o.index) +
                "[" +
                "a".repeat(o[0].length - 2) +
                "]" +
                i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (o = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; )
        i =
          i.slice(0, o.index) +
          "++" +
          i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      for (; (o = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
        i =
          i.slice(0, o.index) +
          "[" +
          "a".repeat(o[0].length - 2) +
          "]" +
          i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      let c = !1,
        s = "";
      for (; l; ) {
        (c || (s = ""), (c = !1));
        let h;
        if (
          this.options.extensions?.inline?.some((m) =>
            (h = m.call({ lexer: this }, l, a))
              ? ((l = l.substring(h.raw.length)), a.push(h), !0)
              : !1
          )
        )
          continue;
        if ((h = this.tokenizer.escape(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.tag(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.link(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.reflink(l, this.tokens.links))) {
          l = l.substring(h.raw.length);
          let m = a.at(-1);
          h.type === "text" && m?.type === "text"
            ? ((m.raw += h.raw), (m.text += h.text))
            : a.push(h);
          continue;
        }
        if ((h = this.tokenizer.emStrong(l, i, s))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.codespan(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.br(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.del(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if ((h = this.tokenizer.autolink(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        if (!this.state.inLink && (h = this.tokenizer.url(l))) {
          ((l = l.substring(h.raw.length)), a.push(h));
          continue;
        }
        let p = l;
        if (this.options.extensions?.startInline) {
          let m = 1 / 0,
            y = l.slice(1),
            g;
          (this.options.extensions.startInline.forEach((k) => {
            ((g = k.call({ lexer: this }, y)),
              typeof g == "number" && g >= 0 && (m = Math.min(m, g)));
          }),
            m < 1 / 0 && m >= 0 && (p = l.substring(0, m + 1)));
        }
        if ((h = this.tokenizer.inlineText(p))) {
          ((l = l.substring(h.raw.length)),
            h.raw.slice(-1) !== "_" && (s = h.raw.slice(-1)),
            (c = !0));
          let m = a.at(-1);
          m?.type === "text"
            ? ((m.raw += h.raw), (m.text += h.text))
            : a.push(h);
          continue;
        }
        if (l) {
          let m = "Infinite loop on byte: " + l.charCodeAt(0);
          if (this.options.silent) {
            console.error(m);
            break;
          } else throw new Error(m);
        }
      }
      return a;
    }
  },
  Xu = class {
    options;
    parser;
    constructor(t) {
      this.options = t || er;
    }
    space(t) {
      return "";
    }
    code({ text: t, lang: l, escaped: a }) {
      let i = (l || "").match(Ut.notSpaceStart)?.[0],
        o =
          t.replace(Ut.endingNewline, "") +
          `
`;
      return i
        ? '<pre><code class="language-' +
            Tn(i) +
            '">' +
            (a ? o : Tn(o, !0)) +
            `</code></pre>
`
        : "<pre><code>" +
            (a ? o : Tn(o, !0)) +
            `</code></pre>
`;
    }
    blockquote({ tokens: t }) {
      return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
    }
    html({ text: t }) {
      return t;
    }
    heading({ tokens: t, depth: l }) {
      return `<h${l}>${this.parser.parseInline(t)}</h${l}>
`;
    }
    hr(t) {
      return `<hr>
`;
    }
    list(t) {
      let l = t.ordered,
        a = t.start,
        i = "";
      for (let s = 0; s < t.items.length; s++) {
        let h = t.items[s];
        i += this.listitem(h);
      }
      let o = l ? "ol" : "ul",
        c = l && a !== 1 ? ' start="' + a + '"' : "";
      return (
        "<" +
        o +
        c +
        `>
` +
        i +
        "</" +
        o +
        `>
`
      );
    }
    listitem(t) {
      let l = "";
      if (t.task) {
        let a = this.checkbox({ checked: !!t.checked });
        t.loose
          ? t.tokens[0]?.type === "paragraph"
            ? ((t.tokens[0].text = a + " " + t.tokens[0].text),
              t.tokens[0].tokens &&
                t.tokens[0].tokens.length > 0 &&
                t.tokens[0].tokens[0].type === "text" &&
                ((t.tokens[0].tokens[0].text =
                  a + " " + Tn(t.tokens[0].tokens[0].text)),
                (t.tokens[0].tokens[0].escaped = !0)))
            : t.tokens.unshift({
                type: "text",
                raw: a + " ",
                text: a + " ",
                escaped: !0,
              })
          : (l += a + " ");
      }
      return (
        (l += this.parser.parse(t.tokens, !!t.loose)),
        `<li>${l}</li>
`
      );
    }
    checkbox({ checked: t }) {
      return (
        "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
      );
    }
    paragraph({ tokens: t }) {
      return `<p>${this.parser.parseInline(t)}</p>
`;
    }
    table(t) {
      let l = "",
        a = "";
      for (let o = 0; o < t.header.length; o++)
        a += this.tablecell(t.header[o]);
      l += this.tablerow({ text: a });
      let i = "";
      for (let o = 0; o < t.rows.length; o++) {
        let c = t.rows[o];
        a = "";
        for (let s = 0; s < c.length; s++) a += this.tablecell(c[s]);
        i += this.tablerow({ text: a });
      }
      return (
        i && (i = `<tbody>${i}</tbody>`),
        `<table>
<thead>
` +
          l +
          `</thead>
` +
          i +
          `</table>
`
      );
    }
    tablerow({ text: t }) {
      return `<tr>
${t}</tr>
`;
    }
    tablecell(t) {
      let l = this.parser.parseInline(t.tokens),
        a = t.header ? "th" : "td";
      return (
        (t.align ? `<${a} align="${t.align}">` : `<${a}>`) +
        l +
        `</${a}>
`
      );
    }
    strong({ tokens: t }) {
      return `<strong>${this.parser.parseInline(t)}</strong>`;
    }
    em({ tokens: t }) {
      return `<em>${this.parser.parseInline(t)}</em>`;
    }
    codespan({ text: t }) {
      return `<code>${Tn(t, !0)}</code>`;
    }
    br(t) {
      return "<br>";
    }
    del({ tokens: t }) {
      return `<del>${this.parser.parseInline(t)}</del>`;
    }
    link({ href: t, title: l, tokens: a }) {
      let i = this.parser.parseInline(a),
        o = N1(t);
      if (o === null) return i;
      t = o;
      let c = '<a href="' + t + '"';
      return (l && (c += ' title="' + Tn(l) + '"'), (c += ">" + i + "</a>"), c);
    }
    image({ href: t, title: l, text: a, tokens: i }) {
      i && (a = this.parser.parseInline(i, this.parser.textRenderer));
      let o = N1(t);
      if (o === null) return Tn(a);
      t = o;
      let c = `<img src="${t}" alt="${a}"`;
      return (l && (c += ` title="${Tn(l)}"`), (c += ">"), c);
    }
    text(t) {
      return "tokens" in t && t.tokens
        ? this.parser.parseInline(t.tokens)
        : "escaped" in t && t.escaped
          ? t.text
          : Tn(t.text);
    }
  },
  Gf = class {
    strong({ text: t }) {
      return t;
    }
    em({ text: t }) {
      return t;
    }
    codespan({ text: t }) {
      return t;
    }
    del({ text: t }) {
      return t;
    }
    html({ text: t }) {
      return t;
    }
    text({ text: t }) {
      return t;
    }
    link({ text: t }) {
      return "" + t;
    }
    image({ text: t }) {
      return "" + t;
    }
    br() {
      return "";
    }
  },
  Jn = class xf {
    options;
    renderer;
    textRenderer;
    constructor(l) {
      ((this.options = l || er),
        (this.options.renderer = this.options.renderer || new Xu()),
        (this.renderer = this.options.renderer),
        (this.renderer.options = this.options),
        (this.renderer.parser = this),
        (this.textRenderer = new Gf()));
    }
    static parse(l, a) {
      return new xf(a).parse(l);
    }
    static parseInline(l, a) {
      return new xf(a).parseInline(l);
    }
    parse(l, a = !0) {
      let i = "";
      for (let o = 0; o < l.length; o++) {
        let c = l[o];
        if (this.options.extensions?.renderers?.[c.type]) {
          let h = c,
            p = this.options.extensions.renderers[h.type].call(
              { parser: this },
              h
            );
          if (
            p !== !1 ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "html",
              "paragraph",
              "text",
            ].includes(h.type)
          ) {
            i += p || "";
            continue;
          }
        }
        let s = c;
        switch (s.type) {
          case "space": {
            i += this.renderer.space(s);
            continue;
          }
          case "hr": {
            i += this.renderer.hr(s);
            continue;
          }
          case "heading": {
            i += this.renderer.heading(s);
            continue;
          }
          case "code": {
            i += this.renderer.code(s);
            continue;
          }
          case "table": {
            i += this.renderer.table(s);
            continue;
          }
          case "blockquote": {
            i += this.renderer.blockquote(s);
            continue;
          }
          case "list": {
            i += this.renderer.list(s);
            continue;
          }
          case "html": {
            i += this.renderer.html(s);
            continue;
          }
          case "paragraph": {
            i += this.renderer.paragraph(s);
            continue;
          }
          case "text": {
            let h = s,
              p = this.renderer.text(h);
            for (; o + 1 < l.length && l[o + 1].type === "text"; )
              ((h = l[++o]),
                (p +=
                  `
` + this.renderer.text(h)));
            a
              ? (i += this.renderer.paragraph({
                  type: "paragraph",
                  raw: p,
                  text: p,
                  tokens: [{ type: "text", raw: p, text: p, escaped: !0 }],
                }))
              : (i += p);
            continue;
          }
          default: {
            let h = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) return (console.error(h), "");
            throw new Error(h);
          }
        }
      }
      return i;
    }
    parseInline(l, a = this.renderer) {
      let i = "";
      for (let o = 0; o < l.length; o++) {
        let c = l[o];
        if (this.options.extensions?.renderers?.[c.type]) {
          let h = this.options.extensions.renderers[c.type].call(
            { parser: this },
            c
          );
          if (
            h !== !1 ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(c.type)
          ) {
            i += h || "";
            continue;
          }
        }
        let s = c;
        switch (s.type) {
          case "escape": {
            i += a.text(s);
            break;
          }
          case "html": {
            i += a.html(s);
            break;
          }
          case "link": {
            i += a.link(s);
            break;
          }
          case "image": {
            i += a.image(s);
            break;
          }
          case "strong": {
            i += a.strong(s);
            break;
          }
          case "em": {
            i += a.em(s);
            break;
          }
          case "codespan": {
            i += a.codespan(s);
            break;
          }
          case "br": {
            i += a.br(s);
            break;
          }
          case "del": {
            i += a.del(s);
            break;
          }
          case "text": {
            i += a.text(s);
            break;
          }
          default: {
            let h = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) return (console.error(h), "");
            throw new Error(h);
          }
        }
      }
      return i;
    }
  },
  Iu = class {
    options;
    block;
    constructor(t) {
      this.options = t || er;
    }
    static passThroughHooks = new Set([
      "preprocess",
      "postprocess",
      "processAllTokens",
    ]);
    preprocess(t) {
      return t;
    }
    postprocess(t) {
      return t;
    }
    processAllTokens(t) {
      return t;
    }
    provideLexer() {
      return this.block ? Kn.lex : Kn.lexInline;
    }
    provideParser() {
      return this.block ? Jn.parse : Jn.parseInline;
    }
  },
  _8 = class {
    defaults = jf();
    options = this.setOptions;
    parse = this.parseMarkdown(!0);
    parseInline = this.parseMarkdown(!1);
    Parser = Jn;
    Renderer = Xu;
    TextRenderer = Gf;
    Lexer = Kn;
    Tokenizer = Qu;
    Hooks = Iu;
    constructor(...t) {
      this.use(...t);
    }
    walkTokens(t, l) {
      let a = [];
      for (let i of t)
        switch (((a = a.concat(l.call(this, i))), i.type)) {
          case "table": {
            let o = i;
            for (let c of o.header) a = a.concat(this.walkTokens(c.tokens, l));
            for (let c of o.rows)
              for (let s of c) a = a.concat(this.walkTokens(s.tokens, l));
            break;
          }
          case "list": {
            let o = i;
            a = a.concat(this.walkTokens(o.items, l));
            break;
          }
          default: {
            let o = i;
            this.defaults.extensions?.childTokens?.[o.type]
              ? this.defaults.extensions.childTokens[o.type].forEach((c) => {
                  let s = o[c].flat(1 / 0);
                  a = a.concat(this.walkTokens(s, l));
                })
              : o.tokens && (a = a.concat(this.walkTokens(o.tokens, l)));
          }
        }
      return a;
    }
    use(...t) {
      let l = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return (
        t.forEach((a) => {
          let i = { ...a };
          if (
            ((i.async = this.defaults.async || i.async || !1),
            a.extensions &&
              (a.extensions.forEach((o) => {
                if (!o.name) throw new Error("extension name required");
                if ("renderer" in o) {
                  let c = l.renderers[o.name];
                  c
                    ? (l.renderers[o.name] = function (...s) {
                        let h = o.renderer.apply(this, s);
                        return (h === !1 && (h = c.apply(this, s)), h);
                      })
                    : (l.renderers[o.name] = o.renderer);
                }
                if ("tokenizer" in o) {
                  if (!o.level || (o.level !== "block" && o.level !== "inline"))
                    throw new Error(
                      "extension level must be 'block' or 'inline'"
                    );
                  let c = l[o.level];
                  (c ? c.unshift(o.tokenizer) : (l[o.level] = [o.tokenizer]),
                    o.start &&
                      (o.level === "block"
                        ? l.startBlock
                          ? l.startBlock.push(o.start)
                          : (l.startBlock = [o.start])
                        : o.level === "inline" &&
                          (l.startInline
                            ? l.startInline.push(o.start)
                            : (l.startInline = [o.start]))));
                }
                "childTokens" in o &&
                  o.childTokens &&
                  (l.childTokens[o.name] = o.childTokens);
              }),
              (i.extensions = l)),
            a.renderer)
          ) {
            let o = this.defaults.renderer || new Xu(this.defaults);
            for (let c in a.renderer) {
              if (!(c in o)) throw new Error(`renderer '${c}' does not exist`);
              if (["options", "parser"].includes(c)) continue;
              let s = c,
                h = a.renderer[s],
                p = o[s];
              o[s] = (...m) => {
                let y = h.apply(o, m);
                return (y === !1 && (y = p.apply(o, m)), y || "");
              };
            }
            i.renderer = o;
          }
          if (a.tokenizer) {
            let o = this.defaults.tokenizer || new Qu(this.defaults);
            for (let c in a.tokenizer) {
              if (!(c in o)) throw new Error(`tokenizer '${c}' does not exist`);
              if (["options", "rules", "lexer"].includes(c)) continue;
              let s = c,
                h = a.tokenizer[s],
                p = o[s];
              o[s] = (...m) => {
                let y = h.apply(o, m);
                return (y === !1 && (y = p.apply(o, m)), y);
              };
            }
            i.tokenizer = o;
          }
          if (a.hooks) {
            let o = this.defaults.hooks || new Iu();
            for (let c in a.hooks) {
              if (!(c in o)) throw new Error(`hook '${c}' does not exist`);
              if (["options", "block"].includes(c)) continue;
              let s = c,
                h = a.hooks[s],
                p = o[s];
              Iu.passThroughHooks.has(c)
                ? (o[s] = (m) => {
                    if (this.defaults.async)
                      return Promise.resolve(h.call(o, m)).then((g) =>
                        p.call(o, g)
                      );
                    let y = h.call(o, m);
                    return p.call(o, y);
                  })
                : (o[s] = (...m) => {
                    let y = h.apply(o, m);
                    return (y === !1 && (y = p.apply(o, m)), y);
                  });
            }
            i.hooks = o;
          }
          if (a.walkTokens) {
            let o = this.defaults.walkTokens,
              c = a.walkTokens;
            i.walkTokens = function (s) {
              let h = [];
              return (
                h.push(c.call(this, s)),
                o && (h = h.concat(o.call(this, s))),
                h
              );
            };
          }
          this.defaults = { ...this.defaults, ...i };
        }),
        this
      );
    }
    setOptions(t) {
      return ((this.defaults = { ...this.defaults, ...t }), this);
    }
    lexer(t, l) {
      return Kn.lex(t, l ?? this.defaults);
    }
    parser(t, l) {
      return Jn.parse(t, l ?? this.defaults);
    }
    parseMarkdown(t) {
      return (l, a) => {
        let i = { ...a },
          o = { ...this.defaults, ...i },
          c = this.onError(!!o.silent, !!o.async);
        if (this.defaults.async === !0 && i.async === !1)
          return c(
            new Error(
              "marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."
            )
          );
        if (typeof l > "u" || l === null)
          return c(new Error("marked(): input parameter is undefined or null"));
        if (typeof l != "string")
          return c(
            new Error(
              "marked(): input parameter is of type " +
                Object.prototype.toString.call(l) +
                ", string expected"
            )
          );
        o.hooks && ((o.hooks.options = o), (o.hooks.block = t));
        let s = o.hooks ? o.hooks.provideLexer() : t ? Kn.lex : Kn.lexInline,
          h = o.hooks ? o.hooks.provideParser() : t ? Jn.parse : Jn.parseInline;
        if (o.async)
          return Promise.resolve(o.hooks ? o.hooks.preprocess(l) : l)
            .then((p) => s(p, o))
            .then((p) => (o.hooks ? o.hooks.processAllTokens(p) : p))
            .then((p) =>
              o.walkTokens
                ? Promise.all(this.walkTokens(p, o.walkTokens)).then(() => p)
                : p
            )
            .then((p) => h(p, o))
            .then((p) => (o.hooks ? o.hooks.postprocess(p) : p))
            .catch(c);
        try {
          o.hooks && (l = o.hooks.preprocess(l));
          let p = s(l, o);
          (o.hooks && (p = o.hooks.processAllTokens(p)),
            o.walkTokens && this.walkTokens(p, o.walkTokens));
          let m = h(p, o);
          return (o.hooks && (m = o.hooks.postprocess(m)), m);
        } catch (p) {
          return c(p);
        }
      };
    }
    onError(t, l) {
      return (a) => {
        if (
          ((a.message += `
Please report this to https://github.com/markedjs/marked.`),
          t)
        ) {
          let i =
            "<p>An error occurred:</p><pre>" +
            Tn(a.message + "", !0) +
            "</pre>";
          return l ? Promise.resolve(i) : i;
        }
        if (l) return Promise.reject(a);
        throw a;
      };
    }
  },
  Jl = new _8();
function $e(t, l) {
  return Jl.parse(t, l);
}
$e.options = $e.setOptions = function (t) {
  return (Jl.setOptions(t), ($e.defaults = Jl.defaults), pg($e.defaults), $e);
};
$e.getDefaults = jf;
$e.defaults = er;
$e.use = function (...t) {
  return (Jl.use(...t), ($e.defaults = Jl.defaults), pg($e.defaults), $e);
};
$e.walkTokens = function (t, l) {
  return Jl.walkTokens(t, l);
};
$e.parseInline = Jl.parseInline;
$e.Parser = Jn;
$e.parser = Jn.parse;
$e.Renderer = Xu;
$e.TextRenderer = Gf;
$e.Lexer = Kn;
$e.lexer = Kn.lex;
$e.Tokenizer = Qu;
$e.Hooks = Iu;
$e.parse = $e;
$e.options;
$e.setOptions;
$e.use;
$e.walkTokens;
$e.parseInline;
Jn.parse;
Kn.lex;
function T8(t, l) {
  const a = {};
  return (t[t.length - 1] === "" ? [...t, ""] : t)
    .join((a.padRight ? " " : "") + "," + (a.padLeft === !1 ? "" : " "))
    .trim();
}
const C8 = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  R8 = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  M8 = {};
function j1(t, l) {
  return (M8.jsx ? R8 : C8).test(t);
}
const z8 = /[ \t\n\f\r]/g;
function D8(t) {
  return typeof t == "object" ? (t.type === "text" ? U1(t.value) : !1) : U1(t);
}
function U1(t) {
  return t.replace(z8, "") === "";
}
class xi {
  constructor(l, a, i) {
    ((this.normal = a), (this.property = l), i && (this.space = i));
  }
}
xi.prototype.normal = {};
xi.prototype.property = {};
xi.prototype.space = void 0;
function Ag(t, l) {
  const a = {},
    i = {};
  for (const o of t) (Object.assign(a, o.property), Object.assign(i, o.normal));
  return new xi(a, i, l);
}
function vf(t) {
  return t.toLowerCase();
}
class Ft {
  constructor(l, a) {
    ((this.attribute = a), (this.property = l));
  }
}
Ft.prototype.attribute = "";
Ft.prototype.booleanish = !1;
Ft.prototype.boolean = !1;
Ft.prototype.commaOrSpaceSeparated = !1;
Ft.prototype.commaSeparated = !1;
Ft.prototype.defined = !1;
Ft.prototype.mustUseProperty = !1;
Ft.prototype.number = !1;
Ft.prototype.overloadedBoolean = !1;
Ft.prototype.property = "";
Ft.prototype.spaceSeparated = !1;
Ft.prototype.space = void 0;
let O8 = 0;
const Ce = tr(),
  pt = tr(),
  _g = tr(),
  ae = tr(),
  nt = tr(),
  Fr = tr(),
  tn = tr();
function tr() {
  return 2 ** ++O8;
}
const kf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: Ce,
        booleanish: pt,
        commaOrSpaceSeparated: tn,
        commaSeparated: Fr,
        number: ae,
        overloadedBoolean: _g,
        spaceSeparated: nt,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Uc = Object.keys(kf);
class Ff extends Ft {
  constructor(l, a, i, o) {
    let c = -1;
    if ((super(l, a), B1(this, "space", o), typeof i == "number"))
      for (; ++c < Uc.length; ) {
        const s = Uc[c];
        B1(this, Uc[c], (i & kf[s]) === kf[s]);
      }
  }
}
Ff.prototype.defined = !0;
function B1(t, l, a) {
  a && (t[l] = a);
}
function Kr(t) {
  const l = {},
    a = {};
  for (const [i, o] of Object.entries(t.properties)) {
    const c = new Ff(i, t.transform(t.attributes || {}, i), o, t.space);
    (t.mustUseProperty &&
      t.mustUseProperty.includes(i) &&
      (c.mustUseProperty = !0),
      (l[i] = c),
      (a[vf(i)] = i),
      (a[vf(c.attribute)] = i));
  }
  return new xi(l, a, t.space);
}
const Tg = Kr({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: pt,
    ariaAutoComplete: null,
    ariaBusy: pt,
    ariaChecked: pt,
    ariaColCount: ae,
    ariaColIndex: ae,
    ariaColSpan: ae,
    ariaControls: nt,
    ariaCurrent: null,
    ariaDescribedBy: nt,
    ariaDetails: null,
    ariaDisabled: pt,
    ariaDropEffect: nt,
    ariaErrorMessage: null,
    ariaExpanded: pt,
    ariaFlowTo: nt,
    ariaGrabbed: pt,
    ariaHasPopup: null,
    ariaHidden: pt,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: nt,
    ariaLevel: ae,
    ariaLive: null,
    ariaModal: pt,
    ariaMultiLine: pt,
    ariaMultiSelectable: pt,
    ariaOrientation: null,
    ariaOwns: nt,
    ariaPlaceholder: null,
    ariaPosInSet: ae,
    ariaPressed: pt,
    ariaReadOnly: pt,
    ariaRelevant: null,
    ariaRequired: pt,
    ariaRoleDescription: nt,
    ariaRowCount: ae,
    ariaRowIndex: ae,
    ariaRowSpan: ae,
    ariaSelected: pt,
    ariaSetSize: ae,
    ariaSort: null,
    ariaValueMax: ae,
    ariaValueMin: ae,
    ariaValueNow: ae,
    ariaValueText: null,
    role: null,
  },
  transform(t, l) {
    return l === "role" ? l : "aria-" + l.slice(4).toLowerCase();
  },
});
function Cg(t, l) {
  return l in t ? t[l] : l;
}
function Rg(t, l) {
  return Cg(t, l.toLowerCase());
}
const N8 = Kr({
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: Fr,
      acceptCharset: nt,
      accessKey: nt,
      action: null,
      allow: null,
      allowFullScreen: Ce,
      allowPaymentRequest: Ce,
      allowUserMedia: Ce,
      alt: null,
      as: null,
      async: Ce,
      autoCapitalize: null,
      autoComplete: nt,
      autoFocus: Ce,
      autoPlay: Ce,
      blocking: nt,
      capture: null,
      charSet: null,
      checked: Ce,
      cite: null,
      className: nt,
      cols: ae,
      colSpan: null,
      content: null,
      contentEditable: pt,
      controls: Ce,
      controlsList: nt,
      coords: ae | Fr,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: Ce,
      defer: Ce,
      dir: null,
      dirName: null,
      disabled: Ce,
      download: _g,
      draggable: pt,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: Ce,
      formTarget: null,
      headers: nt,
      height: ae,
      hidden: Ce,
      high: ae,
      href: null,
      hrefLang: null,
      htmlFor: nt,
      httpEquiv: nt,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: Ce,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: Ce,
      itemId: null,
      itemProp: nt,
      itemRef: nt,
      itemScope: Ce,
      itemType: nt,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: Ce,
      low: ae,
      manifest: null,
      max: null,
      maxLength: ae,
      media: null,
      method: null,
      min: null,
      minLength: ae,
      multiple: Ce,
      muted: Ce,
      name: null,
      nonce: null,
      noModule: Ce,
      noValidate: Ce,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: Ce,
      optimum: ae,
      pattern: null,
      ping: nt,
      placeholder: null,
      playsInline: Ce,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: Ce,
      referrerPolicy: null,
      rel: nt,
      required: Ce,
      reversed: Ce,
      rows: ae,
      rowSpan: ae,
      sandbox: nt,
      scope: null,
      scoped: Ce,
      seamless: Ce,
      selected: Ce,
      shadowRootClonable: Ce,
      shadowRootDelegatesFocus: Ce,
      shadowRootMode: null,
      shape: null,
      size: ae,
      sizes: null,
      slot: null,
      span: ae,
      spellCheck: pt,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: ae,
      step: null,
      style: null,
      tabIndex: ae,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: Ce,
      useMap: null,
      value: pt,
      width: ae,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: nt,
      axis: null,
      background: null,
      bgColor: null,
      border: ae,
      borderColor: null,
      bottomMargin: ae,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: Ce,
      declare: Ce,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: ae,
      leftMargin: ae,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: ae,
      marginWidth: ae,
      noResize: Ce,
      noHref: Ce,
      noShade: Ce,
      noWrap: Ce,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: ae,
      rules: null,
      scheme: null,
      scrolling: pt,
      standby: null,
      summary: null,
      text: null,
      topMargin: ae,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: ae,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: Ce,
      disableRemotePlayback: Ce,
      prefix: null,
      property: null,
      results: ae,
      security: null,
      unselectable: null,
    },
    space: "html",
    transform: Rg,
  }),
  L8 = Kr({
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    properties: {
      about: tn,
      accentHeight: ae,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: ae,
      amplitude: ae,
      arabicForm: null,
      ascent: ae,
      attributeName: null,
      attributeType: null,
      azimuth: ae,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: ae,
      by: null,
      calcMode: null,
      capHeight: ae,
      className: nt,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: ae,
      diffuseConstant: ae,
      direction: null,
      display: null,
      dur: null,
      divisor: ae,
      dominantBaseline: null,
      download: Ce,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: ae,
      enableBackground: null,
      end: null,
      event: null,
      exponent: ae,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: ae,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: Fr,
      g2: Fr,
      glyphName: Fr,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: ae,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: ae,
      horizOriginX: ae,
      horizOriginY: ae,
      id: null,
      ideographic: ae,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: ae,
      k: ae,
      k1: ae,
      k2: ae,
      k3: ae,
      k4: ae,
      kernelMatrix: tn,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: ae,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: ae,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: ae,
      overlineThickness: ae,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: ae,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: nt,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: ae,
      pointsAtY: ae,
      pointsAtZ: ae,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: tn,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: tn,
      rev: tn,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: tn,
      requiredFeatures: tn,
      requiredFonts: tn,
      requiredFormats: tn,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: ae,
      specularExponent: ae,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: ae,
      strikethroughThickness: ae,
      string: null,
      stroke: null,
      strokeDashArray: tn,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: ae,
      strokeOpacity: ae,
      strokeWidth: null,
      style: null,
      surfaceScale: ae,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: tn,
      tabIndex: ae,
      tableValues: null,
      target: null,
      targetX: ae,
      targetY: ae,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: tn,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: ae,
      underlineThickness: ae,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: ae,
      values: null,
      vAlphabetic: ae,
      vMathematical: ae,
      vectorEffect: null,
      vHanging: ae,
      vIdeographic: ae,
      version: null,
      vertAdvY: ae,
      vertOriginX: ae,
      vertOriginY: ae,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: ae,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: "svg",
    transform: Cg,
  }),
  Mg = Kr({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: "xlink",
    transform(t, l) {
      return "xlink:" + l.slice(5).toLowerCase();
    },
  }),
  zg = Kr({
    attributes: { xmlnsxlink: "xmlns:xlink" },
    properties: { xmlnsXLink: null, xmlns: null },
    space: "xmlns",
    transform: Rg,
  }),
  Dg = Kr({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: "xml",
    transform(t, l) {
      return "xml:" + l.slice(3).toLowerCase();
    },
  }),
  H8 = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink",
  },
  j8 = /[A-Z]/g,
  V1 = /-[a-z]/g,
  U8 = /^data[-\w.:]+$/i;
function B8(t, l) {
  const a = vf(l);
  let i = l,
    o = Ft;
  if (a in t.normal) return t.property[t.normal[a]];
  if (a.length > 4 && a.slice(0, 4) === "data" && U8.test(l)) {
    if (l.charAt(4) === "-") {
      const c = l.slice(5).replace(V1, q8);
      i = "data" + c.charAt(0).toUpperCase() + c.slice(1);
    } else {
      const c = l.slice(4);
      if (!V1.test(c)) {
        let s = c.replace(j8, V8);
        (s.charAt(0) !== "-" && (s = "-" + s), (l = "data" + s));
      }
    }
    o = Ff;
  }
  return new o(i, l);
}
function V8(t) {
  return "-" + t.toLowerCase();
}
function q8(t) {
  return t.charAt(1).toUpperCase();
}
const Z8 = Ag([Tg, N8, Mg, zg, Dg], "html"),
  Qf = Ag([Tg, L8, Mg, zg, Dg], "svg");
function I8(t) {
  return t.join(" ").trim();
}
var Ir = {},
  Bc,
  q1;
function Y8() {
  if (q1) return Bc;
  q1 = 1;
  var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    l = /\n/g,
    a = /^\s*/,
    i = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    o = /^:\s*/,
    c = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    s = /^[;\s]*/,
    h = /^\s+|\s+$/g,
    p = `
`,
    m = "/",
    y = "*",
    g = "",
    k = "comment",
    v = "declaration";
  Bc = function (C, U) {
    if (typeof C != "string")
      throw new TypeError("First argument must be a string");
    if (!C) return [];
    U = U || {};
    var R = 1,
      Y = 1;
    function V(le) {
      var ie = le.match(l);
      ie && (R += ie.length);
      var ue = le.lastIndexOf(p);
      Y = ~ue ? le.length - ue : Y + le.length;
    }
    function ee() {
      var le = { line: R, column: Y };
      return function (ie) {
        return ((ie.position = new O(le)), q(), ie);
      };
    }
    function O(le) {
      ((this.start = le),
        (this.end = { line: R, column: Y }),
        (this.source = U.source));
    }
    O.prototype.content = C;
    function _(le) {
      var ie = new Error(U.source + ":" + R + ":" + Y + ": " + le);
      if (
        ((ie.reason = le),
        (ie.filename = U.source),
        (ie.line = R),
        (ie.column = Y),
        (ie.source = C),
        !U.silent)
      )
        throw ie;
    }
    function F(le) {
      var ie = le.exec(C);
      if (ie) {
        var ue = ie[0];
        return (V(ue), (C = C.slice(ue.length)), ie);
      }
    }
    function q() {
      F(a);
    }
    function K(le) {
      var ie;
      for (le = le || []; (ie = z()); ) ie !== !1 && le.push(ie);
      return le;
    }
    function z() {
      var le = ee();
      if (!(m != C.charAt(0) || y != C.charAt(1))) {
        for (
          var ie = 2;
          g != C.charAt(ie) && (y != C.charAt(ie) || m != C.charAt(ie + 1));

        )
          ++ie;
        if (((ie += 2), g === C.charAt(ie - 1)))
          return _("End of comment missing");
        var ue = C.slice(2, ie - 2);
        return (
          (Y += 2),
          V(ue),
          (C = C.slice(ie)),
          (Y += 2),
          le({ type: k, comment: ue })
        );
      }
    }
    function ne() {
      var le = ee(),
        ie = F(i);
      if (ie) {
        if ((z(), !F(o))) return _("property missing ':'");
        var ue = F(c),
          L = le({
            type: v,
            property: A(ie[0].replace(t, g)),
            value: ue ? A(ue[0].replace(t, g)) : g,
          });
        return (F(s), L);
      }
    }
    function te() {
      var le = [];
      K(le);
      for (var ie; (ie = ne()); ) ie !== !1 && (le.push(ie), K(le));
      return le;
    }
    return (q(), te());
  };
  function A(C) {
    return C ? C.replace(h, g) : g;
  }
  return Bc;
}
var Z1;
function G8() {
  if (Z1) return Ir;
  Z1 = 1;
  var t =
    (Ir && Ir.__importDefault) ||
    function (i) {
      return i && i.__esModule ? i : { default: i };
    };
  (Object.defineProperty(Ir, "__esModule", { value: !0 }), (Ir.default = a));
  var l = t(Y8());
  function a(i, o) {
    var c = null;
    if (!i || typeof i != "string") return c;
    var s = (0, l.default)(i),
      h = typeof o == "function";
    return (
      s.forEach(function (p) {
        if (p.type === "declaration") {
          var m = p.property,
            y = p.value;
          h ? o(m, y, p) : y && ((c = c || {}), (c[m] = y));
        }
      }),
      c
    );
  }
  return Ir;
}
var Wa = {},
  I1;
function F8() {
  if (I1) return Wa;
  ((I1 = 1),
    Object.defineProperty(Wa, "__esModule", { value: !0 }),
    (Wa.camelCase = void 0));
  var t = /^--[a-zA-Z0-9_-]+$/,
    l = /-([a-z])/g,
    a = /^[^-]+$/,
    i = /^-(webkit|moz|ms|o|khtml)-/,
    o = /^-(ms)-/,
    c = function (m) {
      return !m || a.test(m) || t.test(m);
    },
    s = function (m, y) {
      return y.toUpperCase();
    },
    h = function (m, y) {
      return "".concat(y, "-");
    },
    p = function (m, y) {
      return (
        y === void 0 && (y = {}),
        c(m)
          ? m
          : ((m = m.toLowerCase()),
            y.reactCompat ? (m = m.replace(o, h)) : (m = m.replace(i, h)),
            m.replace(l, s))
      );
    };
  return ((Wa.camelCase = p), Wa);
}
var ei, Y1;
function Q8() {
  if (Y1) return ei;
  Y1 = 1;
  var t =
      (ei && ei.__importDefault) ||
      function (o) {
        return o && o.__esModule ? o : { default: o };
      },
    l = t(G8()),
    a = F8();
  function i(o, c) {
    var s = {};
    return (
      !o ||
        typeof o != "string" ||
        (0, l.default)(o, function (h, p) {
          h && p && (s[(0, a.camelCase)(h, c)] = p);
        }),
      s
    );
  }
  return ((i.default = i), (ei = i), ei);
}
var X8 = Q8();
const $8 = gi(X8),
  Og = Ng("end"),
  Xf = Ng("start");
function Ng(t) {
  return l;
  function l(a) {
    const i = (a && a.position && a.position[t]) || {};
    if (
      typeof i.line == "number" &&
      i.line > 0 &&
      typeof i.column == "number" &&
      i.column > 0
    )
      return {
        line: i.line,
        column: i.column,
        offset:
          typeof i.offset == "number" && i.offset > -1 ? i.offset : void 0,
      };
  }
}
function P8(t) {
  const l = Xf(t),
    a = Og(t);
  if (l && a) return { start: l, end: a };
}
function ri(t) {
  return !t || typeof t != "object"
    ? ""
    : "position" in t || "type" in t
      ? G1(t.position)
      : "start" in t || "end" in t
        ? G1(t)
        : "line" in t || "column" in t
          ? Sf(t)
          : "";
}
function Sf(t) {
  return F1(t && t.line) + ":" + F1(t && t.column);
}
function G1(t) {
  return Sf(t && t.start) + "-" + Sf(t && t.end);
}
function F1(t) {
  return t && typeof t == "number" ? t : 1;
}
class Nt extends Error {
  constructor(l, a, i) {
    (super(), typeof a == "string" && ((i = a), (a = void 0)));
    let o = "",
      c = {},
      s = !1;
    if (
      (a &&
        ("line" in a && "column" in a
          ? (c = { place: a })
          : "start" in a && "end" in a
            ? (c = { place: a })
            : "type" in a
              ? (c = { ancestors: [a], place: a.position })
              : (c = { ...a })),
      typeof l == "string"
        ? (o = l)
        : !c.cause && l && ((s = !0), (o = l.message), (c.cause = l)),
      !c.ruleId && !c.source && typeof i == "string")
    ) {
      const p = i.indexOf(":");
      p === -1
        ? (c.ruleId = i)
        : ((c.source = i.slice(0, p)), (c.ruleId = i.slice(p + 1)));
    }
    if (!c.place && c.ancestors && c.ancestors) {
      const p = c.ancestors[c.ancestors.length - 1];
      p && (c.place = p.position);
    }
    const h = c.place && "start" in c.place ? c.place.start : c.place;
    ((this.ancestors = c.ancestors || void 0),
      (this.cause = c.cause || void 0),
      (this.column = h ? h.column : void 0),
      (this.fatal = void 0),
      this.file,
      (this.message = o),
      (this.line = h ? h.line : void 0),
      (this.name = ri(c.place) || "1:1"),
      (this.place = c.place || void 0),
      (this.reason = this.message),
      (this.ruleId = c.ruleId || void 0),
      (this.source = c.source || void 0),
      (this.stack =
        s && c.cause && typeof c.cause.stack == "string" ? c.cause.stack : ""),
      this.actual,
      this.expected,
      this.note,
      this.url);
  }
}
Nt.prototype.file = "";
Nt.prototype.name = "";
Nt.prototype.reason = "";
Nt.prototype.message = "";
Nt.prototype.stack = "";
Nt.prototype.column = void 0;
Nt.prototype.line = void 0;
Nt.prototype.ancestors = void 0;
Nt.prototype.cause = void 0;
Nt.prototype.fatal = void 0;
Nt.prototype.place = void 0;
Nt.prototype.ruleId = void 0;
Nt.prototype.source = void 0;
const $f = {}.hasOwnProperty,
  K8 = new Map(),
  J8 = /[A-Z]/g,
  W8 = new Set(["table", "tbody", "thead", "tfoot", "tr"]),
  e4 = new Set(["td", "th"]),
  Lg = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function t4(t, l) {
  if (!l || l.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const a = l.filePath || void 0;
  let i;
  if (l.development) {
    if (typeof l.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    i = s4(a, l.jsxDEV);
  } else {
    if (typeof l.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof l.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    i = o4(a, l.jsx, l.jsxs);
  }
  const o = {
      Fragment: l.Fragment,
      ancestors: [],
      components: l.components || {},
      create: i,
      elementAttributeNameCase: l.elementAttributeNameCase || "react",
      evaluater: l.createEvaluater ? l.createEvaluater() : void 0,
      filePath: a,
      ignoreInvalidStyle: l.ignoreInvalidStyle || !1,
      passKeys: l.passKeys !== !1,
      passNode: l.passNode || !1,
      schema: l.space === "svg" ? Qf : Z8,
      stylePropertyNameCase: l.stylePropertyNameCase || "dom",
      tableCellAlignToStyle: l.tableCellAlignToStyle !== !1,
    },
    c = Hg(o, t, void 0);
  return c && typeof c != "string"
    ? c
    : o.create(t, o.Fragment, { children: c || void 0 }, void 0);
}
function Hg(t, l, a) {
  if (l.type === "element") return n4(t, l, a);
  if (l.type === "mdxFlowExpression" || l.type === "mdxTextExpression")
    return l4(t, l);
  if (l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement")
    return a4(t, l, a);
  if (l.type === "mdxjsEsm") return r4(t, l);
  if (l.type === "root") return i4(t, l, a);
  if (l.type === "text") return u4(t, l);
}
function n4(t, l, a) {
  const i = t.schema;
  let o = i;
  (l.tagName.toLowerCase() === "svg" &&
    i.space === "html" &&
    ((o = Qf), (t.schema = o)),
    t.ancestors.push(l));
  const c = Ug(t, l.tagName, !1),
    s = c4(t, l);
  let h = Kf(t, l);
  return (
    W8.has(l.tagName) &&
      (h = h.filter(function (p) {
        return typeof p == "string" ? !D8(p) : !0;
      })),
    jg(t, s, c, l),
    Pf(s, h),
    t.ancestors.pop(),
    (t.schema = i),
    t.create(l, c, s, a)
  );
}
function l4(t, l) {
  if (l.data && l.data.estree && t.evaluater) {
    const i = l.data.estree.body[0];
    return (i.type, t.evaluater.evaluateExpression(i.expression));
  }
  pi(t, l.position);
}
function r4(t, l) {
  if (l.data && l.data.estree && t.evaluater)
    return t.evaluater.evaluateProgram(l.data.estree);
  pi(t, l.position);
}
function a4(t, l, a) {
  const i = t.schema;
  let o = i;
  (l.name === "svg" && i.space === "html" && ((o = Qf), (t.schema = o)),
    t.ancestors.push(l));
  const c = l.name === null ? t.Fragment : Ug(t, l.name, !0),
    s = f4(t, l),
    h = Kf(t, l);
  return (
    jg(t, s, c, l),
    Pf(s, h),
    t.ancestors.pop(),
    (t.schema = i),
    t.create(l, c, s, a)
  );
}
function i4(t, l, a) {
  const i = {};
  return (Pf(i, Kf(t, l)), t.create(l, t.Fragment, i, a));
}
function u4(t, l) {
  return l.value;
}
function jg(t, l, a, i) {
  typeof a != "string" && a !== t.Fragment && t.passNode && (l.node = i);
}
function Pf(t, l) {
  if (l.length > 0) {
    const a = l.length > 1 ? l : l[0];
    a && (t.children = a);
  }
}
function o4(t, l, a) {
  return i;
  function i(o, c, s, h) {
    const m = Array.isArray(s.children) ? a : l;
    return h ? m(c, s, h) : m(c, s);
  }
}
function s4(t, l) {
  return a;
  function a(i, o, c, s) {
    const h = Array.isArray(c.children),
      p = Xf(i);
    return l(
      o,
      c,
      s,
      h,
      {
        columnNumber: p ? p.column - 1 : void 0,
        fileName: t,
        lineNumber: p ? p.line : void 0,
      },
      void 0
    );
  }
}
function c4(t, l) {
  const a = {};
  let i, o;
  for (o in l.properties)
    if (o !== "children" && $f.call(l.properties, o)) {
      const c = h4(t, o, l.properties[o]);
      if (c) {
        const [s, h] = c;
        t.tableCellAlignToStyle &&
        s === "align" &&
        typeof h == "string" &&
        e4.has(l.tagName)
          ? (i = h)
          : (a[s] = h);
      }
    }
  if (i) {
    const c = a.style || (a.style = {});
    c[t.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = i;
  }
  return a;
}
function f4(t, l) {
  const a = {};
  for (const i of l.attributes)
    if (i.type === "mdxJsxExpressionAttribute")
      if (i.data && i.data.estree && t.evaluater) {
        const c = i.data.estree.body[0];
        c.type;
        const s = c.expression;
        s.type;
        const h = s.properties[0];
        (h.type, Object.assign(a, t.evaluater.evaluateExpression(h.argument)));
      } else pi(t, l.position);
    else {
      const o = i.name;
      let c;
      if (i.value && typeof i.value == "object")
        if (i.value.data && i.value.data.estree && t.evaluater) {
          const h = i.value.data.estree.body[0];
          (h.type, (c = t.evaluater.evaluateExpression(h.expression)));
        } else pi(t, l.position);
      else c = i.value === null ? !0 : i.value;
      a[o] = c;
    }
  return a;
}
function Kf(t, l) {
  const a = [];
  let i = -1;
  const o = t.passKeys ? new Map() : K8;
  for (; ++i < l.children.length; ) {
    const c = l.children[i];
    let s;
    if (t.passKeys) {
      const p =
        c.type === "element"
          ? c.tagName
          : c.type === "mdxJsxFlowElement" || c.type === "mdxJsxTextElement"
            ? c.name
            : void 0;
      if (p) {
        const m = o.get(p) || 0;
        ((s = p + "-" + m), o.set(p, m + 1));
      }
    }
    const h = Hg(t, c, s);
    h !== void 0 && a.push(h);
  }
  return a;
}
function h4(t, l, a) {
  const i = B8(t.schema, l);
  if (!(a == null || (typeof a == "number" && Number.isNaN(a)))) {
    if (
      (Array.isArray(a) && (a = i.commaSeparated ? T8(a) : I8(a)),
      i.property === "style")
    ) {
      let o = typeof a == "object" ? a : d4(t, String(a));
      return (t.stylePropertyNameCase === "css" && (o = p4(o)), ["style", o]);
    }
    return [
      t.elementAttributeNameCase === "react" && i.space
        ? H8[i.property] || i.property
        : i.attribute,
      a,
    ];
  }
}
function d4(t, l) {
  try {
    return $8(l, { reactCompat: !0 });
  } catch (a) {
    if (t.ignoreInvalidStyle) return {};
    const i = a,
      o = new Nt("Cannot parse `style` attribute", {
        ancestors: t.ancestors,
        cause: i,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime",
      });
    throw (
      (o.file = t.filePath || void 0),
      (o.url = Lg + "#cannot-parse-style-attribute"),
      o
    );
  }
}
function Ug(t, l, a) {
  let i;
  if (!a) i = { type: "Literal", value: l };
  else if (l.includes(".")) {
    const o = l.split(".");
    let c = -1,
      s;
    for (; ++c < o.length; ) {
      const h = j1(o[c])
        ? { type: "Identifier", name: o[c] }
        : { type: "Literal", value: o[c] };
      s = s
        ? {
            type: "MemberExpression",
            object: s,
            property: h,
            computed: !!(c && h.type === "Literal"),
            optional: !1,
          }
        : h;
    }
    i = s;
  } else
    i =
      j1(l) && !/^[a-z]/.test(l)
        ? { type: "Identifier", name: l }
        : { type: "Literal", value: l };
  if (i.type === "Literal") {
    const o = i.value;
    return $f.call(t.components, o) ? t.components[o] : o;
  }
  if (t.evaluater) return t.evaluater.evaluateExpression(i);
  pi(t);
}
function pi(t, l) {
  const a = new Nt("Cannot handle MDX estrees without `createEvaluater`", {
    ancestors: t.ancestors,
    place: l,
    ruleId: "mdx-estree",
    source: "hast-util-to-jsx-runtime",
  });
  throw (
    (a.file = t.filePath || void 0),
    (a.url = Lg + "#cannot-handle-mdx-estrees-without-createevaluater"),
    a
  );
}
function p4(t) {
  const l = {};
  let a;
  for (a in t) $f.call(t, a) && (l[m4(a)] = t[a]);
  return l;
}
function m4(t) {
  let l = t.replace(J8, g4);
  return (l.slice(0, 3) === "ms-" && (l = "-" + l), l);
}
function g4(t) {
  return "-" + t.toLowerCase();
}
const Vc = {
    action: ["form"],
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    formAction: ["button", "input"],
    href: ["a", "area", "base", "link"],
    icon: ["menuitem"],
    itemId: null,
    manifest: ["html"],
    ping: ["a", "area"],
    poster: ["video"],
    src: [
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "source",
      "track",
      "video",
    ],
  },
  y4 = {};
function Jf(t, l) {
  const a = y4,
    i = typeof a.includeImageAlt == "boolean" ? a.includeImageAlt : !0,
    o = typeof a.includeHtml == "boolean" ? a.includeHtml : !0;
  return Bg(t, i, o);
}
function Bg(t, l, a) {
  if (b4(t)) {
    if ("value" in t) return t.type === "html" && !a ? "" : t.value;
    if (l && "alt" in t && t.alt) return t.alt;
    if ("children" in t) return Q1(t.children, l, a);
  }
  return Array.isArray(t) ? Q1(t, l, a) : "";
}
function Q1(t, l, a) {
  const i = [];
  let o = -1;
  for (; ++o < t.length; ) i[o] = Bg(t[o], l, a);
  return i.join("");
}
function b4(t) {
  return !!(t && typeof t == "object");
}
const X1 = document.createElement("i");
function Wf(t) {
  const l = "&" + t + ";";
  X1.innerHTML = l;
  const a = X1.textContent;
  return (a.charCodeAt(a.length - 1) === 59 && t !== "semi") || a === l
    ? !1
    : a;
}
function nn(t, l, a, i) {
  const o = t.length;
  let c = 0,
    s;
  if (
    (l < 0 ? (l = -l > o ? 0 : o + l) : (l = l > o ? o : l),
    (a = a > 0 ? a : 0),
    i.length < 1e4)
  )
    ((s = Array.from(i)), s.unshift(l, a), t.splice(...s));
  else
    for (a && t.splice(l, a); c < i.length; )
      ((s = i.slice(c, c + 1e4)),
        s.unshift(l, 0),
        t.splice(...s),
        (c += 1e4),
        (l += 1e4));
}
function mn(t, l) {
  return t.length > 0 ? (nn(t, t.length, 0, l), t) : l;
}
const $1 = {}.hasOwnProperty;
function Vg(t) {
  const l = {};
  let a = -1;
  for (; ++a < t.length; ) x4(l, t[a]);
  return l;
}
function x4(t, l) {
  let a;
  for (a in l) {
    const o = ($1.call(t, a) ? t[a] : void 0) || (t[a] = {}),
      c = l[a];
    let s;
    if (c)
      for (s in c) {
        $1.call(o, s) || (o[s] = []);
        const h = c[s];
        v4(o[s], Array.isArray(h) ? h : h ? [h] : []);
      }
  }
}
function v4(t, l) {
  let a = -1;
  const i = [];
  for (; ++a < l.length; ) (l[a].add === "after" ? t : i).push(l[a]);
  nn(t, 0, 0, i);
}
function qg(t, l) {
  const a = Number.parseInt(t, l);
  return a < 9 ||
    a === 11 ||
    (a > 13 && a < 32) ||
    (a > 126 && a < 160) ||
    (a > 55295 && a < 57344) ||
    (a > 64975 && a < 65008) ||
    (a & 65535) === 65535 ||
    (a & 65535) === 65534 ||
    a > 1114111
    ? "�"
    : String.fromCodePoint(a);
}
function vn(t) {
  return t
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const jt = Rl(/[A-Za-z]/),
  Ot = Rl(/[\dA-Za-z]/),
  k4 = Rl(/[#-'*+\--9=?A-Z^-~]/);
function $u(t) {
  return t !== null && (t < 32 || t === 127);
}
const wf = Rl(/\d/),
  S4 = Rl(/[\dA-Fa-f]/),
  w4 = Rl(/[!-/:-@[-`{-~]/);
function ye(t) {
  return t !== null && t < -2;
}
function et(t) {
  return t !== null && (t < 0 || t === 32);
}
function He(t) {
  return t === -2 || t === -1 || t === 32;
}
const no = Rl(new RegExp("\\p{P}|\\p{S}", "u")),
  Wl = Rl(/\s/);
function Rl(t) {
  return l;
  function l(a) {
    return a !== null && a > -1 && t.test(String.fromCharCode(a));
  }
}
function Jr(t) {
  const l = [];
  let a = -1,
    i = 0,
    o = 0;
  for (; ++a < t.length; ) {
    const c = t.charCodeAt(a);
    let s = "";
    if (c === 37 && Ot(t.charCodeAt(a + 1)) && Ot(t.charCodeAt(a + 2))) o = 2;
    else if (c < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(c)) ||
        (s = String.fromCharCode(c));
    else if (c > 55295 && c < 57344) {
      const h = t.charCodeAt(a + 1);
      c < 56320 && h > 56319 && h < 57344
        ? ((s = String.fromCharCode(c, h)), (o = 1))
        : (s = "�");
    } else s = String.fromCharCode(c);
    (s &&
      (l.push(t.slice(i, a), encodeURIComponent(s)), (i = a + o + 1), (s = "")),
      o && ((a += o), (o = 0)));
  }
  return l.join("") + t.slice(i);
}
function Ue(t, l, a, i) {
  const o = i ? i - 1 : Number.POSITIVE_INFINITY;
  let c = 0;
  return s;
  function s(p) {
    return He(p) ? (t.enter(a), h(p)) : l(p);
  }
  function h(p) {
    return He(p) && c++ < o ? (t.consume(p), h) : (t.exit(a), l(p));
  }
}
const E4 = { tokenize: A4 };
function A4(t) {
  const l = t.attempt(this.parser.constructs.contentInitial, i, o);
  let a;
  return l;
  function i(h) {
    if (h === null) {
      t.consume(h);
      return;
    }
    return (
      t.enter("lineEnding"),
      t.consume(h),
      t.exit("lineEnding"),
      Ue(t, l, "linePrefix")
    );
  }
  function o(h) {
    return (t.enter("paragraph"), c(h));
  }
  function c(h) {
    const p = t.enter("chunkText", { contentType: "text", previous: a });
    return (a && (a.next = p), (a = p), s(h));
  }
  function s(h) {
    if (h === null) {
      (t.exit("chunkText"), t.exit("paragraph"), t.consume(h));
      return;
    }
    return ye(h) ? (t.consume(h), t.exit("chunkText"), c) : (t.consume(h), s);
  }
}
const _4 = { tokenize: T4 },
  P1 = { tokenize: C4 };
function T4(t) {
  const l = this,
    a = [];
  let i = 0,
    o,
    c,
    s;
  return h;
  function h(V) {
    if (i < a.length) {
      const ee = a[i];
      return (
        (l.containerState = ee[1]),
        t.attempt(ee[0].continuation, p, m)(V)
      );
    }
    return m(V);
  }
  function p(V) {
    if ((i++, l.containerState._closeFlow)) {
      ((l.containerState._closeFlow = void 0), o && Y());
      const ee = l.events.length;
      let O = ee,
        _;
      for (; O--; )
        if (l.events[O][0] === "exit" && l.events[O][1].type === "chunkFlow") {
          _ = l.events[O][1].end;
          break;
        }
      R(i);
      let F = ee;
      for (; F < l.events.length; ) ((l.events[F][1].end = { ..._ }), F++);
      return (
        nn(l.events, O + 1, 0, l.events.slice(ee)),
        (l.events.length = F),
        m(V)
      );
    }
    return h(V);
  }
  function m(V) {
    if (i === a.length) {
      if (!o) return k(V);
      if (o.currentConstruct && o.currentConstruct.concrete) return A(V);
      l.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return ((l.containerState = {}), t.check(P1, y, g)(V));
  }
  function y(V) {
    return (o && Y(), R(i), k(V));
  }
  function g(V) {
    return (
      (l.parser.lazy[l.now().line] = i !== a.length),
      (s = l.now().offset),
      A(V)
    );
  }
  function k(V) {
    return ((l.containerState = {}), t.attempt(P1, v, A)(V));
  }
  function v(V) {
    return (i++, a.push([l.currentConstruct, l.containerState]), k(V));
  }
  function A(V) {
    if (V === null) {
      (o && Y(), R(0), t.consume(V));
      return;
    }
    return (
      (o = o || l.parser.flow(l.now())),
      t.enter("chunkFlow", { _tokenizer: o, contentType: "flow", previous: c }),
      C(V)
    );
  }
  function C(V) {
    if (V === null) {
      (U(t.exit("chunkFlow"), !0), R(0), t.consume(V));
      return;
    }
    return ye(V)
      ? (t.consume(V),
        U(t.exit("chunkFlow")),
        (i = 0),
        (l.interrupt = void 0),
        h)
      : (t.consume(V), C);
  }
  function U(V, ee) {
    const O = l.sliceStream(V);
    if (
      (ee && O.push(null),
      (V.previous = c),
      c && (c.next = V),
      (c = V),
      o.defineSkip(V.start),
      o.write(O),
      l.parser.lazy[V.start.line])
    ) {
      let _ = o.events.length;
      for (; _--; )
        if (
          o.events[_][1].start.offset < s &&
          (!o.events[_][1].end || o.events[_][1].end.offset > s)
        )
          return;
      const F = l.events.length;
      let q = F,
        K,
        z;
      for (; q--; )
        if (l.events[q][0] === "exit" && l.events[q][1].type === "chunkFlow") {
          if (K) {
            z = l.events[q][1].end;
            break;
          }
          K = !0;
        }
      for (R(i), _ = F; _ < l.events.length; )
        ((l.events[_][1].end = { ...z }), _++);
      (nn(l.events, q + 1, 0, l.events.slice(F)), (l.events.length = _));
    }
  }
  function R(V) {
    let ee = a.length;
    for (; ee-- > V; ) {
      const O = a[ee];
      ((l.containerState = O[1]), O[0].exit.call(l, t));
    }
    a.length = V;
  }
  function Y() {
    (o.write([null]),
      (c = void 0),
      (o = void 0),
      (l.containerState._closeFlow = void 0));
  }
}
function C4(t, l, a) {
  return Ue(
    t,
    t.attempt(this.parser.constructs.document, l, a),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function Xr(t) {
  if (t === null || et(t) || Wl(t)) return 1;
  if (no(t)) return 2;
}
function lo(t, l, a) {
  const i = [];
  let o = -1;
  for (; ++o < t.length; ) {
    const c = t[o].resolveAll;
    c && !i.includes(c) && ((l = c(l, a)), i.push(c));
  }
  return l;
}
const Ef = { name: "attention", resolveAll: R4, tokenize: M4 };
function R4(t, l) {
  let a = -1,
    i,
    o,
    c,
    s,
    h,
    p,
    m,
    y;
  for (; ++a < t.length; )
    if (
      t[a][0] === "enter" &&
      t[a][1].type === "attentionSequence" &&
      t[a][1]._close
    ) {
      for (i = a; i--; )
        if (
          t[i][0] === "exit" &&
          t[i][1].type === "attentionSequence" &&
          t[i][1]._open &&
          l.sliceSerialize(t[i][1]).charCodeAt(0) ===
            l.sliceSerialize(t[a][1]).charCodeAt(0)
        ) {
          if (
            (t[i][1]._close || t[a][1]._open) &&
            (t[a][1].end.offset - t[a][1].start.offset) % 3 &&
            !(
              (t[i][1].end.offset -
                t[i][1].start.offset +
                t[a][1].end.offset -
                t[a][1].start.offset) %
              3
            )
          )
            continue;
          p =
            t[i][1].end.offset - t[i][1].start.offset > 1 &&
            t[a][1].end.offset - t[a][1].start.offset > 1
              ? 2
              : 1;
          const g = { ...t[i][1].end },
            k = { ...t[a][1].start };
          (K1(g, -p),
            K1(k, p),
            (s = {
              type: p > 1 ? "strongSequence" : "emphasisSequence",
              start: g,
              end: { ...t[i][1].end },
            }),
            (h = {
              type: p > 1 ? "strongSequence" : "emphasisSequence",
              start: { ...t[a][1].start },
              end: k,
            }),
            (c = {
              type: p > 1 ? "strongText" : "emphasisText",
              start: { ...t[i][1].end },
              end: { ...t[a][1].start },
            }),
            (o = {
              type: p > 1 ? "strong" : "emphasis",
              start: { ...s.start },
              end: { ...h.end },
            }),
            (t[i][1].end = { ...s.start }),
            (t[a][1].start = { ...h.end }),
            (m = []),
            t[i][1].end.offset - t[i][1].start.offset &&
              (m = mn(m, [
                ["enter", t[i][1], l],
                ["exit", t[i][1], l],
              ])),
            (m = mn(m, [
              ["enter", o, l],
              ["enter", s, l],
              ["exit", s, l],
              ["enter", c, l],
            ])),
            (m = mn(
              m,
              lo(l.parser.constructs.insideSpan.null, t.slice(i + 1, a), l)
            )),
            (m = mn(m, [
              ["exit", c, l],
              ["enter", h, l],
              ["exit", h, l],
              ["exit", o, l],
            ])),
            t[a][1].end.offset - t[a][1].start.offset
              ? ((y = 2),
                (m = mn(m, [
                  ["enter", t[a][1], l],
                  ["exit", t[a][1], l],
                ])))
              : (y = 0),
            nn(t, i - 1, a - i + 3, m),
            (a = i + m.length - y - 2));
          break;
        }
    }
  for (a = -1; ++a < t.length; )
    t[a][1].type === "attentionSequence" && (t[a][1].type = "data");
  return t;
}
function M4(t, l) {
  const a = this.parser.constructs.attentionMarkers.null,
    i = this.previous,
    o = Xr(i);
  let c;
  return s;
  function s(p) {
    return ((c = p), t.enter("attentionSequence"), h(p));
  }
  function h(p) {
    if (p === c) return (t.consume(p), h);
    const m = t.exit("attentionSequence"),
      y = Xr(p),
      g = !y || (y === 2 && o) || a.includes(p),
      k = !o || (o === 2 && y) || a.includes(i);
    return (
      (m._open = !!(c === 42 ? g : g && (o || !k))),
      (m._close = !!(c === 42 ? k : k && (y || !g))),
      l(p)
    );
  }
}
function K1(t, l) {
  ((t.column += l), (t.offset += l), (t._bufferIndex += l));
}
const z4 = { name: "autolink", tokenize: D4 };
function D4(t, l, a) {
  let i = 0;
  return o;
  function o(v) {
    return (
      t.enter("autolink"),
      t.enter("autolinkMarker"),
      t.consume(v),
      t.exit("autolinkMarker"),
      t.enter("autolinkProtocol"),
      c
    );
  }
  function c(v) {
    return jt(v) ? (t.consume(v), s) : v === 64 ? a(v) : m(v);
  }
  function s(v) {
    return v === 43 || v === 45 || v === 46 || Ot(v) ? ((i = 1), h(v)) : m(v);
  }
  function h(v) {
    return v === 58
      ? (t.consume(v), (i = 0), p)
      : (v === 43 || v === 45 || v === 46 || Ot(v)) && i++ < 32
        ? (t.consume(v), h)
        : ((i = 0), m(v));
  }
  function p(v) {
    return v === 62
      ? (t.exit("autolinkProtocol"),
        t.enter("autolinkMarker"),
        t.consume(v),
        t.exit("autolinkMarker"),
        t.exit("autolink"),
        l)
      : v === null || v === 32 || v === 60 || $u(v)
        ? a(v)
        : (t.consume(v), p);
  }
  function m(v) {
    return v === 64 ? (t.consume(v), y) : k4(v) ? (t.consume(v), m) : a(v);
  }
  function y(v) {
    return Ot(v) ? g(v) : a(v);
  }
  function g(v) {
    return v === 46
      ? (t.consume(v), (i = 0), y)
      : v === 62
        ? ((t.exit("autolinkProtocol").type = "autolinkEmail"),
          t.enter("autolinkMarker"),
          t.consume(v),
          t.exit("autolinkMarker"),
          t.exit("autolink"),
          l)
        : k(v);
  }
  function k(v) {
    if ((v === 45 || Ot(v)) && i++ < 63) {
      const A = v === 45 ? k : g;
      return (t.consume(v), A);
    }
    return a(v);
  }
}
const vi = { partial: !0, tokenize: O4 };
function O4(t, l, a) {
  return i;
  function i(c) {
    return He(c) ? Ue(t, o, "linePrefix")(c) : o(c);
  }
  function o(c) {
    return c === null || ye(c) ? l(c) : a(c);
  }
}
const Zg = {
  continuation: { tokenize: L4 },
  exit: H4,
  name: "blockQuote",
  tokenize: N4,
};
function N4(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    if (s === 62) {
      const h = i.containerState;
      return (
        h.open || (t.enter("blockQuote", { _container: !0 }), (h.open = !0)),
        t.enter("blockQuotePrefix"),
        t.enter("blockQuoteMarker"),
        t.consume(s),
        t.exit("blockQuoteMarker"),
        c
      );
    }
    return a(s);
  }
  function c(s) {
    return He(s)
      ? (t.enter("blockQuotePrefixWhitespace"),
        t.consume(s),
        t.exit("blockQuotePrefixWhitespace"),
        t.exit("blockQuotePrefix"),
        l)
      : (t.exit("blockQuotePrefix"), l(s));
  }
}
function L4(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return He(s)
      ? Ue(
          t,
          c,
          "linePrefix",
          i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(s)
      : c(s);
  }
  function c(s) {
    return t.attempt(Zg, l, a)(s);
  }
}
function H4(t) {
  t.exit("blockQuote");
}
const Ig = { name: "characterEscape", tokenize: j4 };
function j4(t, l, a) {
  return i;
  function i(c) {
    return (
      t.enter("characterEscape"),
      t.enter("escapeMarker"),
      t.consume(c),
      t.exit("escapeMarker"),
      o
    );
  }
  function o(c) {
    return w4(c)
      ? (t.enter("characterEscapeValue"),
        t.consume(c),
        t.exit("characterEscapeValue"),
        t.exit("characterEscape"),
        l)
      : a(c);
  }
}
const Yg = { name: "characterReference", tokenize: U4 };
function U4(t, l, a) {
  const i = this;
  let o = 0,
    c,
    s;
  return h;
  function h(g) {
    return (
      t.enter("characterReference"),
      t.enter("characterReferenceMarker"),
      t.consume(g),
      t.exit("characterReferenceMarker"),
      p
    );
  }
  function p(g) {
    return g === 35
      ? (t.enter("characterReferenceMarkerNumeric"),
        t.consume(g),
        t.exit("characterReferenceMarkerNumeric"),
        m)
      : (t.enter("characterReferenceValue"), (c = 31), (s = Ot), y(g));
  }
  function m(g) {
    return g === 88 || g === 120
      ? (t.enter("characterReferenceMarkerHexadecimal"),
        t.consume(g),
        t.exit("characterReferenceMarkerHexadecimal"),
        t.enter("characterReferenceValue"),
        (c = 6),
        (s = S4),
        y)
      : (t.enter("characterReferenceValue"), (c = 7), (s = wf), y(g));
  }
  function y(g) {
    if (g === 59 && o) {
      const k = t.exit("characterReferenceValue");
      return s === Ot && !Wf(i.sliceSerialize(k))
        ? a(g)
        : (t.enter("characterReferenceMarker"),
          t.consume(g),
          t.exit("characterReferenceMarker"),
          t.exit("characterReference"),
          l);
    }
    return s(g) && o++ < c ? (t.consume(g), y) : a(g);
  }
}
const J1 = { partial: !0, tokenize: V4 },
  W1 = { concrete: !0, name: "codeFenced", tokenize: B4 };
function B4(t, l, a) {
  const i = this,
    o = { partial: !0, tokenize: O };
  let c = 0,
    s = 0,
    h;
  return p;
  function p(_) {
    return m(_);
  }
  function m(_) {
    const F = i.events[i.events.length - 1];
    return (
      (c =
        F && F[1].type === "linePrefix"
          ? F[2].sliceSerialize(F[1], !0).length
          : 0),
      (h = _),
      t.enter("codeFenced"),
      t.enter("codeFencedFence"),
      t.enter("codeFencedFenceSequence"),
      y(_)
    );
  }
  function y(_) {
    return _ === h
      ? (s++, t.consume(_), y)
      : s < 3
        ? a(_)
        : (t.exit("codeFencedFenceSequence"),
          He(_) ? Ue(t, g, "whitespace")(_) : g(_));
  }
  function g(_) {
    return _ === null || ye(_)
      ? (t.exit("codeFencedFence"), i.interrupt ? l(_) : t.check(J1, C, ee)(_))
      : (t.enter("codeFencedFenceInfo"),
        t.enter("chunkString", { contentType: "string" }),
        k(_));
  }
  function k(_) {
    return _ === null || ye(_)
      ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), g(_))
      : He(_)
        ? (t.exit("chunkString"),
          t.exit("codeFencedFenceInfo"),
          Ue(t, v, "whitespace")(_))
        : _ === 96 && _ === h
          ? a(_)
          : (t.consume(_), k);
  }
  function v(_) {
    return _ === null || ye(_)
      ? g(_)
      : (t.enter("codeFencedFenceMeta"),
        t.enter("chunkString", { contentType: "string" }),
        A(_));
  }
  function A(_) {
    return _ === null || ye(_)
      ? (t.exit("chunkString"), t.exit("codeFencedFenceMeta"), g(_))
      : _ === 96 && _ === h
        ? a(_)
        : (t.consume(_), A);
  }
  function C(_) {
    return t.attempt(o, ee, U)(_);
  }
  function U(_) {
    return (t.enter("lineEnding"), t.consume(_), t.exit("lineEnding"), R);
  }
  function R(_) {
    return c > 0 && He(_) ? Ue(t, Y, "linePrefix", c + 1)(_) : Y(_);
  }
  function Y(_) {
    return _ === null || ye(_)
      ? t.check(J1, C, ee)(_)
      : (t.enter("codeFlowValue"), V(_));
  }
  function V(_) {
    return _ === null || ye(_)
      ? (t.exit("codeFlowValue"), Y(_))
      : (t.consume(_), V);
  }
  function ee(_) {
    return (t.exit("codeFenced"), l(_));
  }
  function O(_, F, q) {
    let K = 0;
    return z;
    function z(ue) {
      return (_.enter("lineEnding"), _.consume(ue), _.exit("lineEnding"), ne);
    }
    function ne(ue) {
      return (
        _.enter("codeFencedFence"),
        He(ue)
          ? Ue(
              _,
              te,
              "linePrefix",
              i.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4
            )(ue)
          : te(ue)
      );
    }
    function te(ue) {
      return ue === h ? (_.enter("codeFencedFenceSequence"), le(ue)) : q(ue);
    }
    function le(ue) {
      return ue === h
        ? (K++, _.consume(ue), le)
        : K >= s
          ? (_.exit("codeFencedFenceSequence"),
            He(ue) ? Ue(_, ie, "whitespace")(ue) : ie(ue))
          : q(ue);
    }
    function ie(ue) {
      return ue === null || ye(ue) ? (_.exit("codeFencedFence"), F(ue)) : q(ue);
    }
  }
}
function V4(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return s === null
      ? a(s)
      : (t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), c);
  }
  function c(s) {
    return i.parser.lazy[i.now().line] ? a(s) : l(s);
  }
}
const qc = { name: "codeIndented", tokenize: Z4 },
  q4 = { partial: !0, tokenize: I4 };
function Z4(t, l, a) {
  const i = this;
  return o;
  function o(m) {
    return (t.enter("codeIndented"), Ue(t, c, "linePrefix", 5)(m));
  }
  function c(m) {
    const y = i.events[i.events.length - 1];
    return y &&
      y[1].type === "linePrefix" &&
      y[2].sliceSerialize(y[1], !0).length >= 4
      ? s(m)
      : a(m);
  }
  function s(m) {
    return m === null
      ? p(m)
      : ye(m)
        ? t.attempt(q4, s, p)(m)
        : (t.enter("codeFlowValue"), h(m));
  }
  function h(m) {
    return m === null || ye(m)
      ? (t.exit("codeFlowValue"), s(m))
      : (t.consume(m), h);
  }
  function p(m) {
    return (t.exit("codeIndented"), l(m));
  }
}
function I4(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return i.parser.lazy[i.now().line]
      ? a(s)
      : ye(s)
        ? (t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), o)
        : Ue(t, c, "linePrefix", 5)(s);
  }
  function c(s) {
    const h = i.events[i.events.length - 1];
    return h &&
      h[1].type === "linePrefix" &&
      h[2].sliceSerialize(h[1], !0).length >= 4
      ? l(s)
      : ye(s)
        ? o(s)
        : a(s);
  }
}
const Y4 = { name: "codeText", previous: F4, resolve: G4, tokenize: Q4 };
function G4(t) {
  let l = t.length - 4,
    a = 3,
    i,
    o;
  if (
    (t[a][1].type === "lineEnding" || t[a][1].type === "space") &&
    (t[l][1].type === "lineEnding" || t[l][1].type === "space")
  ) {
    for (i = a; ++i < l; )
      if (t[i][1].type === "codeTextData") {
        ((t[a][1].type = "codeTextPadding"),
          (t[l][1].type = "codeTextPadding"),
          (a += 2),
          (l -= 2));
        break;
      }
  }
  for (i = a - 1, l++; ++i <= l; )
    o === void 0
      ? i !== l && t[i][1].type !== "lineEnding" && (o = i)
      : (i === l || t[i][1].type === "lineEnding") &&
        ((t[o][1].type = "codeTextData"),
        i !== o + 2 &&
          ((t[o][1].end = t[i - 1][1].end),
          t.splice(o + 2, i - o - 2),
          (l -= i - o - 2),
          (i = o + 2)),
        (o = void 0));
  return t;
}
function F4(t) {
  return (
    t !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function Q4(t, l, a) {
  let i = 0,
    o,
    c;
  return s;
  function s(g) {
    return (t.enter("codeText"), t.enter("codeTextSequence"), h(g));
  }
  function h(g) {
    return g === 96
      ? (t.consume(g), i++, h)
      : (t.exit("codeTextSequence"), p(g));
  }
  function p(g) {
    return g === null
      ? a(g)
      : g === 32
        ? (t.enter("space"), t.consume(g), t.exit("space"), p)
        : g === 96
          ? ((c = t.enter("codeTextSequence")), (o = 0), y(g))
          : ye(g)
            ? (t.enter("lineEnding"), t.consume(g), t.exit("lineEnding"), p)
            : (t.enter("codeTextData"), m(g));
  }
  function m(g) {
    return g === null || g === 32 || g === 96 || ye(g)
      ? (t.exit("codeTextData"), p(g))
      : (t.consume(g), m);
  }
  function y(g) {
    return g === 96
      ? (t.consume(g), o++, y)
      : o === i
        ? (t.exit("codeTextSequence"), t.exit("codeText"), l(g))
        : ((c.type = "codeTextData"), m(g));
  }
}
class X4 {
  constructor(l) {
    ((this.left = l ? [...l] : []), (this.right = []));
  }
  get(l) {
    if (l < 0 || l >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" +
          l +
          "` in a splice buffer of size `" +
          (this.left.length + this.right.length) +
          "`"
      );
    return l < this.left.length
      ? this.left[l]
      : this.right[this.right.length - l + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return (this.setCursor(0), this.right.pop());
  }
  slice(l, a) {
    const i = a ?? Number.POSITIVE_INFINITY;
    return i < this.left.length
      ? this.left.slice(l, i)
      : l > this.left.length
        ? this.right
            .slice(
              this.right.length - i + this.left.length,
              this.right.length - l + this.left.length
            )
            .reverse()
        : this.left
            .slice(l)
            .concat(
              this.right
                .slice(this.right.length - i + this.left.length)
                .reverse()
            );
  }
  splice(l, a, i) {
    const o = a || 0;
    this.setCursor(Math.trunc(l));
    const c = this.right.splice(
      this.right.length - o,
      Number.POSITIVE_INFINITY
    );
    return (i && ti(this.left, i), c.reverse());
  }
  pop() {
    return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop());
  }
  push(l) {
    (this.setCursor(Number.POSITIVE_INFINITY), this.left.push(l));
  }
  pushMany(l) {
    (this.setCursor(Number.POSITIVE_INFINITY), ti(this.left, l));
  }
  unshift(l) {
    (this.setCursor(0), this.right.push(l));
  }
  unshiftMany(l) {
    (this.setCursor(0), ti(this.right, l.reverse()));
  }
  setCursor(l) {
    if (
      !(
        l === this.left.length ||
        (l > this.left.length && this.right.length === 0) ||
        (l < 0 && this.left.length === 0)
      )
    )
      if (l < this.left.length) {
        const a = this.left.splice(l, Number.POSITIVE_INFINITY);
        ti(this.right, a.reverse());
      } else {
        const a = this.right.splice(
          this.left.length + this.right.length - l,
          Number.POSITIVE_INFINITY
        );
        ti(this.left, a.reverse());
      }
  }
}
function ti(t, l) {
  let a = 0;
  if (l.length < 1e4) t.push(...l);
  else for (; a < l.length; ) (t.push(...l.slice(a, a + 1e4)), (a += 1e4));
}
function Gg(t) {
  const l = {};
  let a = -1,
    i,
    o,
    c,
    s,
    h,
    p,
    m;
  const y = new X4(t);
  for (; ++a < y.length; ) {
    for (; a in l; ) a = l[a];
    if (
      ((i = y.get(a)),
      a &&
        i[1].type === "chunkFlow" &&
        y.get(a - 1)[1].type === "listItemPrefix" &&
        ((p = i[1]._tokenizer.events),
        (c = 0),
        c < p.length && p[c][1].type === "lineEndingBlank" && (c += 2),
        c < p.length && p[c][1].type === "content"))
    )
      for (; ++c < p.length && p[c][1].type !== "content"; )
        p[c][1].type === "chunkText" &&
          ((p[c][1]._isInFirstContentOfListItem = !0), c++);
    if (i[0] === "enter")
      i[1].contentType && (Object.assign(l, $4(y, a)), (a = l[a]), (m = !0));
    else if (i[1]._container) {
      for (c = a, o = void 0; c--; )
        if (
          ((s = y.get(c)),
          s[1].type === "lineEnding" || s[1].type === "lineEndingBlank")
        )
          s[0] === "enter" &&
            (o && (y.get(o)[1].type = "lineEndingBlank"),
            (s[1].type = "lineEnding"),
            (o = c));
        else if (
          !(s[1].type === "linePrefix" || s[1].type === "listItemIndent")
        )
          break;
      o &&
        ((i[1].end = { ...y.get(o)[1].start }),
        (h = y.slice(o, a)),
        h.unshift(i),
        y.splice(o, a - o + 1, h));
    }
  }
  return (nn(t, 0, Number.POSITIVE_INFINITY, y.slice(0)), !m);
}
function $4(t, l) {
  const a = t.get(l)[1],
    i = t.get(l)[2];
  let o = l - 1;
  const c = [];
  let s = a._tokenizer;
  s ||
    ((s = i.parser[a.contentType](a.start)),
    a._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const h = s.events,
    p = [],
    m = {};
  let y,
    g,
    k = -1,
    v = a,
    A = 0,
    C = 0;
  const U = [C];
  for (; v; ) {
    for (; t.get(++o)[1] !== v; );
    (c.push(o),
      v._tokenizer ||
        ((y = i.sliceStream(v)),
        v.next || y.push(null),
        g && s.defineSkip(v.start),
        v._isInFirstContentOfListItem &&
          (s._gfmTasklistFirstContentOfListItem = !0),
        s.write(y),
        v._isInFirstContentOfListItem &&
          (s._gfmTasklistFirstContentOfListItem = void 0)),
      (g = v),
      (v = v.next));
  }
  for (v = a; ++k < h.length; )
    h[k][0] === "exit" &&
      h[k - 1][0] === "enter" &&
      h[k][1].type === h[k - 1][1].type &&
      h[k][1].start.line !== h[k][1].end.line &&
      ((C = k + 1),
      U.push(C),
      (v._tokenizer = void 0),
      (v.previous = void 0),
      (v = v.next));
  for (
    s.events = [],
      v ? ((v._tokenizer = void 0), (v.previous = void 0)) : U.pop(),
      k = U.length;
    k--;

  ) {
    const R = h.slice(U[k], U[k + 1]),
      Y = c.pop();
    (p.push([Y, Y + R.length - 1]), t.splice(Y, 2, R));
  }
  for (p.reverse(), k = -1; ++k < p.length; )
    ((m[A + p[k][0]] = A + p[k][1]), (A += p[k][1] - p[k][0] - 1));
  return m;
}
const P4 = { resolve: J4, tokenize: W4 },
  K4 = { partial: !0, tokenize: ek };
function J4(t) {
  return (Gg(t), t);
}
function W4(t, l) {
  let a;
  return i;
  function i(h) {
    return (
      t.enter("content"),
      (a = t.enter("chunkContent", { contentType: "content" })),
      o(h)
    );
  }
  function o(h) {
    return h === null ? c(h) : ye(h) ? t.check(K4, s, c)(h) : (t.consume(h), o);
  }
  function c(h) {
    return (t.exit("chunkContent"), t.exit("content"), l(h));
  }
  function s(h) {
    return (
      t.consume(h),
      t.exit("chunkContent"),
      (a.next = t.enter("chunkContent", {
        contentType: "content",
        previous: a,
      })),
      (a = a.next),
      o
    );
  }
}
function ek(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return (
      t.exit("chunkContent"),
      t.enter("lineEnding"),
      t.consume(s),
      t.exit("lineEnding"),
      Ue(t, c, "linePrefix")
    );
  }
  function c(s) {
    if (s === null || ye(s)) return a(s);
    const h = i.events[i.events.length - 1];
    return !i.parser.constructs.disable.null.includes("codeIndented") &&
      h &&
      h[1].type === "linePrefix" &&
      h[2].sliceSerialize(h[1], !0).length >= 4
      ? l(s)
      : t.interrupt(i.parser.constructs.flow, a, l)(s);
  }
}
function Fg(t, l, a, i, o, c, s, h, p) {
  const m = p || Number.POSITIVE_INFINITY;
  let y = 0;
  return g;
  function g(R) {
    return R === 60
      ? (t.enter(i), t.enter(o), t.enter(c), t.consume(R), t.exit(c), k)
      : R === null || R === 32 || R === 41 || $u(R)
        ? a(R)
        : (t.enter(i),
          t.enter(s),
          t.enter(h),
          t.enter("chunkString", { contentType: "string" }),
          C(R));
  }
  function k(R) {
    return R === 62
      ? (t.enter(c), t.consume(R), t.exit(c), t.exit(o), t.exit(i), l)
      : (t.enter(h), t.enter("chunkString", { contentType: "string" }), v(R));
  }
  function v(R) {
    return R === 62
      ? (t.exit("chunkString"), t.exit(h), k(R))
      : R === null || R === 60 || ye(R)
        ? a(R)
        : (t.consume(R), R === 92 ? A : v);
  }
  function A(R) {
    return R === 60 || R === 62 || R === 92 ? (t.consume(R), v) : v(R);
  }
  function C(R) {
    return !y && (R === null || R === 41 || et(R))
      ? (t.exit("chunkString"), t.exit(h), t.exit(s), t.exit(i), l(R))
      : y < m && R === 40
        ? (t.consume(R), y++, C)
        : R === 41
          ? (t.consume(R), y--, C)
          : R === null || R === 32 || R === 40 || $u(R)
            ? a(R)
            : (t.consume(R), R === 92 ? U : C);
  }
  function U(R) {
    return R === 40 || R === 41 || R === 92 ? (t.consume(R), C) : C(R);
  }
}
function Qg(t, l, a, i, o, c) {
  const s = this;
  let h = 0,
    p;
  return m;
  function m(v) {
    return (t.enter(i), t.enter(o), t.consume(v), t.exit(o), t.enter(c), y);
  }
  function y(v) {
    return h > 999 ||
      v === null ||
      v === 91 ||
      (v === 93 && !p) ||
      (v === 94 && !h && "_hiddenFootnoteSupport" in s.parser.constructs)
      ? a(v)
      : v === 93
        ? (t.exit(c), t.enter(o), t.consume(v), t.exit(o), t.exit(i), l)
        : ye(v)
          ? (t.enter("lineEnding"), t.consume(v), t.exit("lineEnding"), y)
          : (t.enter("chunkString", { contentType: "string" }), g(v));
  }
  function g(v) {
    return v === null || v === 91 || v === 93 || ye(v) || h++ > 999
      ? (t.exit("chunkString"), y(v))
      : (t.consume(v), p || (p = !He(v)), v === 92 ? k : g);
  }
  function k(v) {
    return v === 91 || v === 92 || v === 93 ? (t.consume(v), h++, g) : g(v);
  }
}
function Xg(t, l, a, i, o, c) {
  let s;
  return h;
  function h(k) {
    return k === 34 || k === 39 || k === 40
      ? (t.enter(i),
        t.enter(o),
        t.consume(k),
        t.exit(o),
        (s = k === 40 ? 41 : k),
        p)
      : a(k);
  }
  function p(k) {
    return k === s
      ? (t.enter(o), t.consume(k), t.exit(o), t.exit(i), l)
      : (t.enter(c), m(k));
  }
  function m(k) {
    return k === s
      ? (t.exit(c), p(s))
      : k === null
        ? a(k)
        : ye(k)
          ? (t.enter("lineEnding"),
            t.consume(k),
            t.exit("lineEnding"),
            Ue(t, m, "linePrefix"))
          : (t.enter("chunkString", { contentType: "string" }), y(k));
  }
  function y(k) {
    return k === s || k === null || ye(k)
      ? (t.exit("chunkString"), m(k))
      : (t.consume(k), k === 92 ? g : y);
  }
  function g(k) {
    return k === s || k === 92 ? (t.consume(k), y) : y(k);
  }
}
function ai(t, l) {
  let a;
  return i;
  function i(o) {
    return ye(o)
      ? (t.enter("lineEnding"), t.consume(o), t.exit("lineEnding"), (a = !0), i)
      : He(o)
        ? Ue(t, i, a ? "linePrefix" : "lineSuffix")(o)
        : l(o);
  }
}
const tk = { name: "definition", tokenize: lk },
  nk = { partial: !0, tokenize: rk };
function lk(t, l, a) {
  const i = this;
  let o;
  return c;
  function c(v) {
    return (t.enter("definition"), s(v));
  }
  function s(v) {
    return Qg.call(
      i,
      t,
      h,
      a,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(v);
  }
  function h(v) {
    return (
      (o = vn(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1))),
      v === 58
        ? (t.enter("definitionMarker"),
          t.consume(v),
          t.exit("definitionMarker"),
          p)
        : a(v)
    );
  }
  function p(v) {
    return et(v) ? ai(t, m)(v) : m(v);
  }
  function m(v) {
    return Fg(
      t,
      y,
      a,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(v);
  }
  function y(v) {
    return t.attempt(nk, g, g)(v);
  }
  function g(v) {
    return He(v) ? Ue(t, k, "whitespace")(v) : k(v);
  }
  function k(v) {
    return v === null || ye(v)
      ? (t.exit("definition"), i.parser.defined.push(o), l(v))
      : a(v);
  }
}
function rk(t, l, a) {
  return i;
  function i(h) {
    return et(h) ? ai(t, o)(h) : a(h);
  }
  function o(h) {
    return Xg(
      t,
      c,
      a,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(h);
  }
  function c(h) {
    return He(h) ? Ue(t, s, "whitespace")(h) : s(h);
  }
  function s(h) {
    return h === null || ye(h) ? l(h) : a(h);
  }
}
const ak = { name: "hardBreakEscape", tokenize: ik };
function ik(t, l, a) {
  return i;
  function i(c) {
    return (t.enter("hardBreakEscape"), t.consume(c), o);
  }
  function o(c) {
    return ye(c) ? (t.exit("hardBreakEscape"), l(c)) : a(c);
  }
}
const uk = { name: "headingAtx", resolve: ok, tokenize: sk };
function ok(t, l) {
  let a = t.length - 2,
    i = 3,
    o,
    c;
  return (
    t[i][1].type === "whitespace" && (i += 2),
    a - 2 > i && t[a][1].type === "whitespace" && (a -= 2),
    t[a][1].type === "atxHeadingSequence" &&
      (i === a - 1 || (a - 4 > i && t[a - 2][1].type === "whitespace")) &&
      (a -= i + 1 === a ? 2 : 4),
    a > i &&
      ((o = { type: "atxHeadingText", start: t[i][1].start, end: t[a][1].end }),
      (c = {
        type: "chunkText",
        start: t[i][1].start,
        end: t[a][1].end,
        contentType: "text",
      }),
      nn(t, i, a - i + 1, [
        ["enter", o, l],
        ["enter", c, l],
        ["exit", c, l],
        ["exit", o, l],
      ])),
    t
  );
}
function sk(t, l, a) {
  let i = 0;
  return o;
  function o(y) {
    return (t.enter("atxHeading"), c(y));
  }
  function c(y) {
    return (t.enter("atxHeadingSequence"), s(y));
  }
  function s(y) {
    return y === 35 && i++ < 6
      ? (t.consume(y), s)
      : y === null || et(y)
        ? (t.exit("atxHeadingSequence"), h(y))
        : a(y);
  }
  function h(y) {
    return y === 35
      ? (t.enter("atxHeadingSequence"), p(y))
      : y === null || ye(y)
        ? (t.exit("atxHeading"), l(y))
        : He(y)
          ? Ue(t, h, "whitespace")(y)
          : (t.enter("atxHeadingText"), m(y));
  }
  function p(y) {
    return y === 35 ? (t.consume(y), p) : (t.exit("atxHeadingSequence"), h(y));
  }
  function m(y) {
    return y === null || y === 35 || et(y)
      ? (t.exit("atxHeadingText"), h(y))
      : (t.consume(y), m);
  }
}
const ck = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  em = ["pre", "script", "style", "textarea"],
  fk = { concrete: !0, name: "htmlFlow", resolveTo: pk, tokenize: mk },
  hk = { partial: !0, tokenize: yk },
  dk = { partial: !0, tokenize: gk };
function pk(t) {
  let l = t.length;
  for (; l-- && !(t[l][0] === "enter" && t[l][1].type === "htmlFlow"); );
  return (
    l > 1 &&
      t[l - 2][1].type === "linePrefix" &&
      ((t[l][1].start = t[l - 2][1].start),
      (t[l + 1][1].start = t[l - 2][1].start),
      t.splice(l - 2, 2)),
    t
  );
}
function mk(t, l, a) {
  const i = this;
  let o, c, s, h, p;
  return m;
  function m(w) {
    return y(w);
  }
  function y(w) {
    return (t.enter("htmlFlow"), t.enter("htmlFlowData"), t.consume(w), g);
  }
  function g(w) {
    return w === 33
      ? (t.consume(w), k)
      : w === 47
        ? (t.consume(w), (c = !0), C)
        : w === 63
          ? (t.consume(w), (o = 3), i.interrupt ? l : x)
          : jt(w)
            ? (t.consume(w), (s = String.fromCharCode(w)), U)
            : a(w);
  }
  function k(w) {
    return w === 45
      ? (t.consume(w), (o = 2), v)
      : w === 91
        ? (t.consume(w), (o = 5), (h = 0), A)
        : jt(w)
          ? (t.consume(w), (o = 4), i.interrupt ? l : x)
          : a(w);
  }
  function v(w) {
    return w === 45 ? (t.consume(w), i.interrupt ? l : x) : a(w);
  }
  function A(w) {
    const oe = "CDATA[";
    return w === oe.charCodeAt(h++)
      ? (t.consume(w), h === oe.length ? (i.interrupt ? l : te) : A)
      : a(w);
  }
  function C(w) {
    return jt(w) ? (t.consume(w), (s = String.fromCharCode(w)), U) : a(w);
  }
  function U(w) {
    if (w === null || w === 47 || w === 62 || et(w)) {
      const oe = w === 47,
        ge = s.toLowerCase();
      return !oe && !c && em.includes(ge)
        ? ((o = 1), i.interrupt ? l(w) : te(w))
        : ck.includes(s.toLowerCase())
          ? ((o = 6), oe ? (t.consume(w), R) : i.interrupt ? l(w) : te(w))
          : ((o = 7),
            i.interrupt && !i.parser.lazy[i.now().line]
              ? a(w)
              : c
                ? Y(w)
                : V(w));
    }
    return w === 45 || Ot(w)
      ? (t.consume(w), (s += String.fromCharCode(w)), U)
      : a(w);
  }
  function R(w) {
    return w === 62 ? (t.consume(w), i.interrupt ? l : te) : a(w);
  }
  function Y(w) {
    return He(w) ? (t.consume(w), Y) : z(w);
  }
  function V(w) {
    return w === 47
      ? (t.consume(w), z)
      : w === 58 || w === 95 || jt(w)
        ? (t.consume(w), ee)
        : He(w)
          ? (t.consume(w), V)
          : z(w);
  }
  function ee(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || Ot(w)
      ? (t.consume(w), ee)
      : O(w);
  }
  function O(w) {
    return w === 61 ? (t.consume(w), _) : He(w) ? (t.consume(w), O) : V(w);
  }
  function _(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96
      ? a(w)
      : w === 34 || w === 39
        ? (t.consume(w), (p = w), F)
        : He(w)
          ? (t.consume(w), _)
          : q(w);
  }
  function F(w) {
    return w === p
      ? (t.consume(w), (p = null), K)
      : w === null || ye(w)
        ? a(w)
        : (t.consume(w), F);
  }
  function q(w) {
    return w === null ||
      w === 34 ||
      w === 39 ||
      w === 47 ||
      w === 60 ||
      w === 61 ||
      w === 62 ||
      w === 96 ||
      et(w)
      ? O(w)
      : (t.consume(w), q);
  }
  function K(w) {
    return w === 47 || w === 62 || He(w) ? V(w) : a(w);
  }
  function z(w) {
    return w === 62 ? (t.consume(w), ne) : a(w);
  }
  function ne(w) {
    return w === null || ye(w) ? te(w) : He(w) ? (t.consume(w), ne) : a(w);
  }
  function te(w) {
    return w === 45 && o === 2
      ? (t.consume(w), L)
      : w === 60 && o === 1
        ? (t.consume(w), J)
        : w === 62 && o === 4
          ? (t.consume(w), G)
          : w === 63 && o === 3
            ? (t.consume(w), x)
            : w === 93 && o === 5
              ? (t.consume(w), be)
              : ye(w) && (o === 6 || o === 7)
                ? (t.exit("htmlFlowData"), t.check(hk, re, le)(w))
                : w === null || ye(w)
                  ? (t.exit("htmlFlowData"), le(w))
                  : (t.consume(w), te);
  }
  function le(w) {
    return t.check(dk, ie, re)(w);
  }
  function ie(w) {
    return (t.enter("lineEnding"), t.consume(w), t.exit("lineEnding"), ue);
  }
  function ue(w) {
    return w === null || ye(w) ? le(w) : (t.enter("htmlFlowData"), te(w));
  }
  function L(w) {
    return w === 45 ? (t.consume(w), x) : te(w);
  }
  function J(w) {
    return w === 47 ? (t.consume(w), (s = ""), Q) : te(w);
  }
  function Q(w) {
    if (w === 62) {
      const oe = s.toLowerCase();
      return em.includes(oe) ? (t.consume(w), G) : te(w);
    }
    return jt(w) && s.length < 8
      ? (t.consume(w), (s += String.fromCharCode(w)), Q)
      : te(w);
  }
  function be(w) {
    return w === 93 ? (t.consume(w), x) : te(w);
  }
  function x(w) {
    return w === 62
      ? (t.consume(w), G)
      : w === 45 && o === 2
        ? (t.consume(w), x)
        : te(w);
  }
  function G(w) {
    return w === null || ye(w)
      ? (t.exit("htmlFlowData"), re(w))
      : (t.consume(w), G);
  }
  function re(w) {
    return (t.exit("htmlFlow"), l(w));
  }
}
function gk(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return ye(s)
      ? (t.enter("lineEnding"), t.consume(s), t.exit("lineEnding"), c)
      : a(s);
  }
  function c(s) {
    return i.parser.lazy[i.now().line] ? a(s) : l(s);
  }
}
function yk(t, l, a) {
  return i;
  function i(o) {
    return (
      t.enter("lineEnding"),
      t.consume(o),
      t.exit("lineEnding"),
      t.attempt(vi, l, a)
    );
  }
}
const bk = { name: "htmlText", tokenize: xk };
function xk(t, l, a) {
  const i = this;
  let o, c, s;
  return h;
  function h(x) {
    return (t.enter("htmlText"), t.enter("htmlTextData"), t.consume(x), p);
  }
  function p(x) {
    return x === 33
      ? (t.consume(x), m)
      : x === 47
        ? (t.consume(x), O)
        : x === 63
          ? (t.consume(x), V)
          : jt(x)
            ? (t.consume(x), q)
            : a(x);
  }
  function m(x) {
    return x === 45
      ? (t.consume(x), y)
      : x === 91
        ? (t.consume(x), (c = 0), A)
        : jt(x)
          ? (t.consume(x), Y)
          : a(x);
  }
  function y(x) {
    return x === 45 ? (t.consume(x), v) : a(x);
  }
  function g(x) {
    return x === null
      ? a(x)
      : x === 45
        ? (t.consume(x), k)
        : ye(x)
          ? ((s = g), J(x))
          : (t.consume(x), g);
  }
  function k(x) {
    return x === 45 ? (t.consume(x), v) : g(x);
  }
  function v(x) {
    return x === 62 ? L(x) : x === 45 ? k(x) : g(x);
  }
  function A(x) {
    const G = "CDATA[";
    return x === G.charCodeAt(c++)
      ? (t.consume(x), c === G.length ? C : A)
      : a(x);
  }
  function C(x) {
    return x === null
      ? a(x)
      : x === 93
        ? (t.consume(x), U)
        : ye(x)
          ? ((s = C), J(x))
          : (t.consume(x), C);
  }
  function U(x) {
    return x === 93 ? (t.consume(x), R) : C(x);
  }
  function R(x) {
    return x === 62 ? L(x) : x === 93 ? (t.consume(x), R) : C(x);
  }
  function Y(x) {
    return x === null || x === 62
      ? L(x)
      : ye(x)
        ? ((s = Y), J(x))
        : (t.consume(x), Y);
  }
  function V(x) {
    return x === null
      ? a(x)
      : x === 63
        ? (t.consume(x), ee)
        : ye(x)
          ? ((s = V), J(x))
          : (t.consume(x), V);
  }
  function ee(x) {
    return x === 62 ? L(x) : V(x);
  }
  function O(x) {
    return jt(x) ? (t.consume(x), _) : a(x);
  }
  function _(x) {
    return x === 45 || Ot(x) ? (t.consume(x), _) : F(x);
  }
  function F(x) {
    return ye(x) ? ((s = F), J(x)) : He(x) ? (t.consume(x), F) : L(x);
  }
  function q(x) {
    return x === 45 || Ot(x)
      ? (t.consume(x), q)
      : x === 47 || x === 62 || et(x)
        ? K(x)
        : a(x);
  }
  function K(x) {
    return x === 47
      ? (t.consume(x), L)
      : x === 58 || x === 95 || jt(x)
        ? (t.consume(x), z)
        : ye(x)
          ? ((s = K), J(x))
          : He(x)
            ? (t.consume(x), K)
            : L(x);
  }
  function z(x) {
    return x === 45 || x === 46 || x === 58 || x === 95 || Ot(x)
      ? (t.consume(x), z)
      : ne(x);
  }
  function ne(x) {
    return x === 61
      ? (t.consume(x), te)
      : ye(x)
        ? ((s = ne), J(x))
        : He(x)
          ? (t.consume(x), ne)
          : K(x);
  }
  function te(x) {
    return x === null || x === 60 || x === 61 || x === 62 || x === 96
      ? a(x)
      : x === 34 || x === 39
        ? (t.consume(x), (o = x), le)
        : ye(x)
          ? ((s = te), J(x))
          : He(x)
            ? (t.consume(x), te)
            : (t.consume(x), ie);
  }
  function le(x) {
    return x === o
      ? (t.consume(x), (o = void 0), ue)
      : x === null
        ? a(x)
        : ye(x)
          ? ((s = le), J(x))
          : (t.consume(x), le);
  }
  function ie(x) {
    return x === null ||
      x === 34 ||
      x === 39 ||
      x === 60 ||
      x === 61 ||
      x === 96
      ? a(x)
      : x === 47 || x === 62 || et(x)
        ? K(x)
        : (t.consume(x), ie);
  }
  function ue(x) {
    return x === 47 || x === 62 || et(x) ? K(x) : a(x);
  }
  function L(x) {
    return x === 62
      ? (t.consume(x), t.exit("htmlTextData"), t.exit("htmlText"), l)
      : a(x);
  }
  function J(x) {
    return (
      t.exit("htmlTextData"),
      t.enter("lineEnding"),
      t.consume(x),
      t.exit("lineEnding"),
      Q
    );
  }
  function Q(x) {
    return He(x)
      ? Ue(
          t,
          be,
          "linePrefix",
          i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(x)
      : be(x);
  }
  function be(x) {
    return (t.enter("htmlTextData"), s(x));
  }
}
const eh = { name: "labelEnd", resolveAll: wk, resolveTo: Ek, tokenize: Ak },
  vk = { tokenize: _k },
  kk = { tokenize: Tk },
  Sk = { tokenize: Ck };
function wk(t) {
  let l = -1;
  const a = [];
  for (; ++l < t.length; ) {
    const i = t[l][1];
    if (
      (a.push(t[l]),
      i.type === "labelImage" ||
        i.type === "labelLink" ||
        i.type === "labelEnd")
    ) {
      const o = i.type === "labelImage" ? 4 : 2;
      ((i.type = "data"), (l += o));
    }
  }
  return (t.length !== a.length && nn(t, 0, t.length, a), t);
}
function Ek(t, l) {
  let a = t.length,
    i = 0,
    o,
    c,
    s,
    h;
  for (; a--; )
    if (((o = t[a][1]), c)) {
      if (o.type === "link" || (o.type === "labelLink" && o._inactive)) break;
      t[a][0] === "enter" && o.type === "labelLink" && (o._inactive = !0);
    } else if (s) {
      if (
        t[a][0] === "enter" &&
        (o.type === "labelImage" || o.type === "labelLink") &&
        !o._balanced &&
        ((c = a), o.type !== "labelLink")
      ) {
        i = 2;
        break;
      }
    } else o.type === "labelEnd" && (s = a);
  const p = {
      type: t[c][1].type === "labelLink" ? "link" : "image",
      start: { ...t[c][1].start },
      end: { ...t[t.length - 1][1].end },
    },
    m = { type: "label", start: { ...t[c][1].start }, end: { ...t[s][1].end } },
    y = {
      type: "labelText",
      start: { ...t[c + i + 2][1].end },
      end: { ...t[s - 2][1].start },
    };
  return (
    (h = [
      ["enter", p, l],
      ["enter", m, l],
    ]),
    (h = mn(h, t.slice(c + 1, c + i + 3))),
    (h = mn(h, [["enter", y, l]])),
    (h = mn(
      h,
      lo(l.parser.constructs.insideSpan.null, t.slice(c + i + 4, s - 3), l)
    )),
    (h = mn(h, [["exit", y, l], t[s - 2], t[s - 1], ["exit", m, l]])),
    (h = mn(h, t.slice(s + 1))),
    (h = mn(h, [["exit", p, l]])),
    nn(t, c, t.length, h),
    t
  );
}
function Ak(t, l, a) {
  const i = this;
  let o = i.events.length,
    c,
    s;
  for (; o--; )
    if (
      (i.events[o][1].type === "labelImage" ||
        i.events[o][1].type === "labelLink") &&
      !i.events[o][1]._balanced
    ) {
      c = i.events[o][1];
      break;
    }
  return h;
  function h(k) {
    return c
      ? c._inactive
        ? g(k)
        : ((s = i.parser.defined.includes(
            vn(i.sliceSerialize({ start: c.end, end: i.now() }))
          )),
          t.enter("labelEnd"),
          t.enter("labelMarker"),
          t.consume(k),
          t.exit("labelMarker"),
          t.exit("labelEnd"),
          p)
      : a(k);
  }
  function p(k) {
    return k === 40
      ? t.attempt(vk, y, s ? y : g)(k)
      : k === 91
        ? t.attempt(kk, y, s ? m : g)(k)
        : s
          ? y(k)
          : g(k);
  }
  function m(k) {
    return t.attempt(Sk, y, g)(k);
  }
  function y(k) {
    return l(k);
  }
  function g(k) {
    return ((c._balanced = !0), a(k));
  }
}
function _k(t, l, a) {
  return i;
  function i(g) {
    return (
      t.enter("resource"),
      t.enter("resourceMarker"),
      t.consume(g),
      t.exit("resourceMarker"),
      o
    );
  }
  function o(g) {
    return et(g) ? ai(t, c)(g) : c(g);
  }
  function c(g) {
    return g === 41
      ? y(g)
      : Fg(
          t,
          s,
          h,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32
        )(g);
  }
  function s(g) {
    return et(g) ? ai(t, p)(g) : y(g);
  }
  function h(g) {
    return a(g);
  }
  function p(g) {
    return g === 34 || g === 39 || g === 40
      ? Xg(
          t,
          m,
          a,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString"
        )(g)
      : y(g);
  }
  function m(g) {
    return et(g) ? ai(t, y)(g) : y(g);
  }
  function y(g) {
    return g === 41
      ? (t.enter("resourceMarker"),
        t.consume(g),
        t.exit("resourceMarker"),
        t.exit("resource"),
        l)
      : a(g);
  }
}
function Tk(t, l, a) {
  const i = this;
  return o;
  function o(h) {
    return Qg.call(
      i,
      t,
      c,
      s,
      "reference",
      "referenceMarker",
      "referenceString"
    )(h);
  }
  function c(h) {
    return i.parser.defined.includes(
      vn(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1))
    )
      ? l(h)
      : a(h);
  }
  function s(h) {
    return a(h);
  }
}
function Ck(t, l, a) {
  return i;
  function i(c) {
    return (
      t.enter("reference"),
      t.enter("referenceMarker"),
      t.consume(c),
      t.exit("referenceMarker"),
      o
    );
  }
  function o(c) {
    return c === 93
      ? (t.enter("referenceMarker"),
        t.consume(c),
        t.exit("referenceMarker"),
        t.exit("reference"),
        l)
      : a(c);
  }
}
const Rk = { name: "labelStartImage", resolveAll: eh.resolveAll, tokenize: Mk };
function Mk(t, l, a) {
  const i = this;
  return o;
  function o(h) {
    return (
      t.enter("labelImage"),
      t.enter("labelImageMarker"),
      t.consume(h),
      t.exit("labelImageMarker"),
      c
    );
  }
  function c(h) {
    return h === 91
      ? (t.enter("labelMarker"),
        t.consume(h),
        t.exit("labelMarker"),
        t.exit("labelImage"),
        s)
      : a(h);
  }
  function s(h) {
    return h === 94 && "_hiddenFootnoteSupport" in i.parser.constructs
      ? a(h)
      : l(h);
  }
}
const zk = { name: "labelStartLink", resolveAll: eh.resolveAll, tokenize: Dk };
function Dk(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return (
      t.enter("labelLink"),
      t.enter("labelMarker"),
      t.consume(s),
      t.exit("labelMarker"),
      t.exit("labelLink"),
      c
    );
  }
  function c(s) {
    return s === 94 && "_hiddenFootnoteSupport" in i.parser.constructs
      ? a(s)
      : l(s);
  }
}
const Zc = { name: "lineEnding", tokenize: Ok };
function Ok(t, l) {
  return a;
  function a(i) {
    return (
      t.enter("lineEnding"),
      t.consume(i),
      t.exit("lineEnding"),
      Ue(t, l, "linePrefix")
    );
  }
}
const Yu = { name: "thematicBreak", tokenize: Nk };
function Nk(t, l, a) {
  let i = 0,
    o;
  return c;
  function c(m) {
    return (t.enter("thematicBreak"), s(m));
  }
  function s(m) {
    return ((o = m), h(m));
  }
  function h(m) {
    return m === o
      ? (t.enter("thematicBreakSequence"), p(m))
      : i >= 3 && (m === null || ye(m))
        ? (t.exit("thematicBreak"), l(m))
        : a(m);
  }
  function p(m) {
    return m === o
      ? (t.consume(m), i++, p)
      : (t.exit("thematicBreakSequence"),
        He(m) ? Ue(t, h, "whitespace")(m) : h(m));
  }
}
const Gt = {
    continuation: { tokenize: Uk },
    exit: Vk,
    name: "list",
    tokenize: jk,
  },
  Lk = { partial: !0, tokenize: qk },
  Hk = { partial: !0, tokenize: Bk };
function jk(t, l, a) {
  const i = this,
    o = i.events[i.events.length - 1];
  let c =
      o && o[1].type === "linePrefix"
        ? o[2].sliceSerialize(o[1], !0).length
        : 0,
    s = 0;
  return h;
  function h(v) {
    const A =
      i.containerState.type ||
      (v === 42 || v === 43 || v === 45 ? "listUnordered" : "listOrdered");
    if (
      A === "listUnordered"
        ? !i.containerState.marker || v === i.containerState.marker
        : wf(v)
    ) {
      if (
        (i.containerState.type ||
          ((i.containerState.type = A), t.enter(A, { _container: !0 })),
        A === "listUnordered")
      )
        return (
          t.enter("listItemPrefix"),
          v === 42 || v === 45 ? t.check(Yu, a, m)(v) : m(v)
        );
      if (!i.interrupt || v === 49)
        return (t.enter("listItemPrefix"), t.enter("listItemValue"), p(v));
    }
    return a(v);
  }
  function p(v) {
    return wf(v) && ++s < 10
      ? (t.consume(v), p)
      : (!i.interrupt || s < 2) &&
          (i.containerState.marker
            ? v === i.containerState.marker
            : v === 41 || v === 46)
        ? (t.exit("listItemValue"), m(v))
        : a(v);
  }
  function m(v) {
    return (
      t.enter("listItemMarker"),
      t.consume(v),
      t.exit("listItemMarker"),
      (i.containerState.marker = i.containerState.marker || v),
      t.check(vi, i.interrupt ? a : y, t.attempt(Lk, k, g))
    );
  }
  function y(v) {
    return ((i.containerState.initialBlankLine = !0), c++, k(v));
  }
  function g(v) {
    return He(v)
      ? (t.enter("listItemPrefixWhitespace"),
        t.consume(v),
        t.exit("listItemPrefixWhitespace"),
        k)
      : a(v);
  }
  function k(v) {
    return (
      (i.containerState.size =
        c + i.sliceSerialize(t.exit("listItemPrefix"), !0).length),
      l(v)
    );
  }
}
function Uk(t, l, a) {
  const i = this;
  return ((i.containerState._closeFlow = void 0), t.check(vi, o, c));
  function o(h) {
    return (
      (i.containerState.furtherBlankLines =
        i.containerState.furtherBlankLines ||
        i.containerState.initialBlankLine),
      Ue(t, l, "listItemIndent", i.containerState.size + 1)(h)
    );
  }
  function c(h) {
    return i.containerState.furtherBlankLines || !He(h)
      ? ((i.containerState.furtherBlankLines = void 0),
        (i.containerState.initialBlankLine = void 0),
        s(h))
      : ((i.containerState.furtherBlankLines = void 0),
        (i.containerState.initialBlankLine = void 0),
        t.attempt(Hk, l, s)(h));
  }
  function s(h) {
    return (
      (i.containerState._closeFlow = !0),
      (i.interrupt = void 0),
      Ue(
        t,
        t.attempt(Gt, l, a),
        "linePrefix",
        i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(h)
    );
  }
}
function Bk(t, l, a) {
  const i = this;
  return Ue(t, o, "listItemIndent", i.containerState.size + 1);
  function o(c) {
    const s = i.events[i.events.length - 1];
    return s &&
      s[1].type === "listItemIndent" &&
      s[2].sliceSerialize(s[1], !0).length === i.containerState.size
      ? l(c)
      : a(c);
  }
}
function Vk(t) {
  t.exit(this.containerState.type);
}
function qk(t, l, a) {
  const i = this;
  return Ue(
    t,
    o,
    "listItemPrefixWhitespace",
    i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5
  );
  function o(c) {
    const s = i.events[i.events.length - 1];
    return !He(c) && s && s[1].type === "listItemPrefixWhitespace"
      ? l(c)
      : a(c);
  }
}
const tm = { name: "setextUnderline", resolveTo: Zk, tokenize: Ik };
function Zk(t, l) {
  let a = t.length,
    i,
    o,
    c;
  for (; a--; )
    if (t[a][0] === "enter") {
      if (t[a][1].type === "content") {
        i = a;
        break;
      }
      t[a][1].type === "paragraph" && (o = a);
    } else
      (t[a][1].type === "content" && t.splice(a, 1),
        !c && t[a][1].type === "definition" && (c = a));
  const s = {
    type: "setextHeading",
    start: { ...t[i][1].start },
    end: { ...t[t.length - 1][1].end },
  };
  return (
    (t[o][1].type = "setextHeadingText"),
    c
      ? (t.splice(o, 0, ["enter", s, l]),
        t.splice(c + 1, 0, ["exit", t[i][1], l]),
        (t[i][1].end = { ...t[c][1].end }))
      : (t[i][1] = s),
    t.push(["exit", s, l]),
    t
  );
}
function Ik(t, l, a) {
  const i = this;
  let o;
  return c;
  function c(m) {
    let y = i.events.length,
      g;
    for (; y--; )
      if (
        i.events[y][1].type !== "lineEnding" &&
        i.events[y][1].type !== "linePrefix" &&
        i.events[y][1].type !== "content"
      ) {
        g = i.events[y][1].type === "paragraph";
        break;
      }
    return !i.parser.lazy[i.now().line] && (i.interrupt || g)
      ? (t.enter("setextHeadingLine"), (o = m), s(m))
      : a(m);
  }
  function s(m) {
    return (t.enter("setextHeadingLineSequence"), h(m));
  }
  function h(m) {
    return m === o
      ? (t.consume(m), h)
      : (t.exit("setextHeadingLineSequence"),
        He(m) ? Ue(t, p, "lineSuffix")(m) : p(m));
  }
  function p(m) {
    return m === null || ye(m) ? (t.exit("setextHeadingLine"), l(m)) : a(m);
  }
}
const Yk = { tokenize: Gk };
function Gk(t) {
  const l = this,
    a = t.attempt(
      vi,
      i,
      t.attempt(
        this.parser.constructs.flowInitial,
        o,
        Ue(
          t,
          t.attempt(this.parser.constructs.flow, o, t.attempt(P4, o)),
          "linePrefix"
        )
      )
    );
  return a;
  function i(c) {
    if (c === null) {
      t.consume(c);
      return;
    }
    return (
      t.enter("lineEndingBlank"),
      t.consume(c),
      t.exit("lineEndingBlank"),
      (l.currentConstruct = void 0),
      a
    );
  }
  function o(c) {
    if (c === null) {
      t.consume(c);
      return;
    }
    return (
      t.enter("lineEnding"),
      t.consume(c),
      t.exit("lineEnding"),
      (l.currentConstruct = void 0),
      a
    );
  }
}
const Fk = { resolveAll: Pg() },
  Qk = $g("string"),
  Xk = $g("text");
function $g(t) {
  return { resolveAll: Pg(t === "text" ? $k : void 0), tokenize: l };
  function l(a) {
    const i = this,
      o = this.parser.constructs[t],
      c = a.attempt(o, s, h);
    return s;
    function s(y) {
      return m(y) ? c(y) : h(y);
    }
    function h(y) {
      if (y === null) {
        a.consume(y);
        return;
      }
      return (a.enter("data"), a.consume(y), p);
    }
    function p(y) {
      return m(y) ? (a.exit("data"), c(y)) : (a.consume(y), p);
    }
    function m(y) {
      if (y === null) return !0;
      const g = o[y];
      let k = -1;
      if (g)
        for (; ++k < g.length; ) {
          const v = g[k];
          if (!v.previous || v.previous.call(i, i.previous)) return !0;
        }
      return !1;
    }
  }
}
function Pg(t) {
  return l;
  function l(a, i) {
    let o = -1,
      c;
    for (; ++o <= a.length; )
      c === void 0
        ? a[o] && a[o][1].type === "data" && ((c = o), o++)
        : (!a[o] || a[o][1].type !== "data") &&
          (o !== c + 2 &&
            ((a[c][1].end = a[o - 1][1].end),
            a.splice(c + 2, o - c - 2),
            (o = c + 2)),
          (c = void 0));
    return t ? t(a, i) : a;
  }
}
function $k(t, l) {
  let a = 0;
  for (; ++a <= t.length; )
    if (
      (a === t.length || t[a][1].type === "lineEnding") &&
      t[a - 1][1].type === "data"
    ) {
      const i = t[a - 1][1],
        o = l.sliceStream(i);
      let c = o.length,
        s = -1,
        h = 0,
        p;
      for (; c--; ) {
        const m = o[c];
        if (typeof m == "string") {
          for (s = m.length; m.charCodeAt(s - 1) === 32; ) (h++, s--);
          if (s) break;
          s = -1;
        } else if (m === -2) ((p = !0), h++);
        else if (m !== -1) {
          c++;
          break;
        }
      }
      if ((l._contentTypeTextTrailing && a === t.length && (h = 0), h)) {
        const m = {
          type:
            a === t.length || p || h < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: c ? s : i.start._bufferIndex + s,
            _index: i.start._index + c,
            line: i.end.line,
            column: i.end.column - h,
            offset: i.end.offset - h,
          },
          end: { ...i.end },
        };
        ((i.end = { ...m.start }),
          i.start.offset === i.end.offset
            ? Object.assign(i, m)
            : (t.splice(a, 0, ["enter", m, l], ["exit", m, l]), (a += 2)));
      }
      a++;
    }
  return t;
}
const Pk = {
    42: Gt,
    43: Gt,
    45: Gt,
    48: Gt,
    49: Gt,
    50: Gt,
    51: Gt,
    52: Gt,
    53: Gt,
    54: Gt,
    55: Gt,
    56: Gt,
    57: Gt,
    62: Zg,
  },
  Kk = { 91: tk },
  Jk = { [-2]: qc, [-1]: qc, 32: qc },
  Wk = {
    35: uk,
    42: Yu,
    45: [tm, Yu],
    60: fk,
    61: tm,
    95: Yu,
    96: W1,
    126: W1,
  },
  eS = { 38: Yg, 92: Ig },
  tS = {
    [-5]: Zc,
    [-4]: Zc,
    [-3]: Zc,
    33: Rk,
    38: Yg,
    42: Ef,
    60: [z4, bk],
    91: zk,
    92: [ak, Ig],
    93: eh,
    95: Ef,
    96: Y4,
  },
  nS = { null: [Ef, Fk] },
  lS = { null: [42, 95] },
  rS = { null: [] },
  aS = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: lS,
        contentInitial: Kk,
        disable: rS,
        document: Pk,
        flow: Wk,
        flowInitial: Jk,
        insideSpan: nS,
        string: eS,
        text: tS,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function iS(t, l, a) {
  let i = {
    _bufferIndex: -1,
    _index: 0,
    line: (a && a.line) || 1,
    column: (a && a.column) || 1,
    offset: (a && a.offset) || 0,
  };
  const o = {},
    c = [];
  let s = [],
    h = [];
  const p = {
      attempt: F(O),
      check: F(_),
      consume: Y,
      enter: V,
      exit: ee,
      interrupt: F(_, { interrupt: !0 }),
    },
    m = {
      code: null,
      containerState: {},
      defineSkip: C,
      events: [],
      now: A,
      parser: t,
      previous: null,
      sliceSerialize: k,
      sliceStream: v,
      write: g,
    };
  let y = l.tokenize.call(m, p);
  return (l.resolveAll && c.push(l), m);
  function g(ne) {
    return (
      (s = mn(s, ne)),
      U(),
      s[s.length - 1] !== null
        ? []
        : (q(l, 0), (m.events = lo(c, m.events, m)), m.events)
    );
  }
  function k(ne, te) {
    return oS(v(ne), te);
  }
  function v(ne) {
    return uS(s, ne);
  }
  function A() {
    const {
      _bufferIndex: ne,
      _index: te,
      line: le,
      column: ie,
      offset: ue,
    } = i;
    return { _bufferIndex: ne, _index: te, line: le, column: ie, offset: ue };
  }
  function C(ne) {
    ((o[ne.line] = ne.column), z());
  }
  function U() {
    let ne;
    for (; i._index < s.length; ) {
      const te = s[i._index];
      if (typeof te == "string")
        for (
          ne = i._index, i._bufferIndex < 0 && (i._bufferIndex = 0);
          i._index === ne && i._bufferIndex < te.length;

        )
          R(te.charCodeAt(i._bufferIndex));
      else R(te);
    }
  }
  function R(ne) {
    y = y(ne);
  }
  function Y(ne) {
    (ye(ne)
      ? (i.line++, (i.column = 1), (i.offset += ne === -3 ? 2 : 1), z())
      : ne !== -1 && (i.column++, i.offset++),
      i._bufferIndex < 0
        ? i._index++
        : (i._bufferIndex++,
          i._bufferIndex === s[i._index].length &&
            ((i._bufferIndex = -1), i._index++)),
      (m.previous = ne));
  }
  function V(ne, te) {
    const le = te || {};
    return (
      (le.type = ne),
      (le.start = A()),
      m.events.push(["enter", le, m]),
      h.push(le),
      le
    );
  }
  function ee(ne) {
    const te = h.pop();
    return ((te.end = A()), m.events.push(["exit", te, m]), te);
  }
  function O(ne, te) {
    q(ne, te.from);
  }
  function _(ne, te) {
    te.restore();
  }
  function F(ne, te) {
    return le;
    function le(ie, ue, L) {
      let J, Q, be, x;
      return Array.isArray(ie) ? re(ie) : "tokenize" in ie ? re([ie]) : G(ie);
      function G(se) {
        return Ee;
        function Ee(Te) {
          const lt = Te !== null && se[Te],
            at = Te !== null && se.null,
            xt = [
              ...(Array.isArray(lt) ? lt : lt ? [lt] : []),
              ...(Array.isArray(at) ? at : at ? [at] : []),
            ];
          return re(xt)(Te);
        }
      }
      function re(se) {
        return ((J = se), (Q = 0), se.length === 0 ? L : w(se[Q]));
      }
      function w(se) {
        return Ee;
        function Ee(Te) {
          return (
            (x = K()),
            (be = se),
            se.partial || (m.currentConstruct = se),
            se.name && m.parser.constructs.disable.null.includes(se.name)
              ? ge()
              : se.tokenize.call(
                  te ? Object.assign(Object.create(m), te) : m,
                  p,
                  oe,
                  ge
                )(Te)
          );
        }
      }
      function oe(se) {
        return (ne(be, x), ue);
      }
      function ge(se) {
        return (x.restore(), ++Q < J.length ? w(J[Q]) : L);
      }
    }
  }
  function q(ne, te) {
    (ne.resolveAll && !c.includes(ne) && c.push(ne),
      ne.resolve &&
        nn(
          m.events,
          te,
          m.events.length - te,
          ne.resolve(m.events.slice(te), m)
        ),
      ne.resolveTo && (m.events = ne.resolveTo(m.events, m)));
  }
  function K() {
    const ne = A(),
      te = m.previous,
      le = m.currentConstruct,
      ie = m.events.length,
      ue = Array.from(h);
    return { from: ie, restore: L };
    function L() {
      ((i = ne),
        (m.previous = te),
        (m.currentConstruct = le),
        (m.events.length = ie),
        (h = ue),
        z());
    }
  }
  function z() {
    i.line in o &&
      i.column < 2 &&
      ((i.column = o[i.line]), (i.offset += o[i.line] - 1));
  }
}
function uS(t, l) {
  const a = l.start._index,
    i = l.start._bufferIndex,
    o = l.end._index,
    c = l.end._bufferIndex;
  let s;
  if (a === o) s = [t[a].slice(i, c)];
  else {
    if (((s = t.slice(a, o)), i > -1)) {
      const h = s[0];
      typeof h == "string" ? (s[0] = h.slice(i)) : s.shift();
    }
    c > 0 && s.push(t[o].slice(0, c));
  }
  return s;
}
function oS(t, l) {
  let a = -1;
  const i = [];
  let o;
  for (; ++a < t.length; ) {
    const c = t[a];
    let s;
    if (typeof c == "string") s = c;
    else
      switch (c) {
        case -5: {
          s = "\r";
          break;
        }
        case -4: {
          s = `
`;
          break;
        }
        case -3: {
          s = `\r
`;
          break;
        }
        case -2: {
          s = l ? " " : "	";
          break;
        }
        case -1: {
          if (!l && o) continue;
          s = " ";
          break;
        }
        default:
          s = String.fromCharCode(c);
      }
    ((o = c === -2), i.push(s));
  }
  return i.join("");
}
function sS(t) {
  const i = {
    constructs: Vg([aS, ...((t || {}).extensions || [])]),
    content: o(E4),
    defined: [],
    document: o(_4),
    flow: o(Yk),
    lazy: {},
    string: o(Qk),
    text: o(Xk),
  };
  return i;
  function o(c) {
    return s;
    function s(h) {
      return iS(i, c, h);
    }
  }
}
function cS(t) {
  for (; !Gg(t); );
  return t;
}
const nm = /[\0\t\n\r]/g;
function fS() {
  let t = 1,
    l = "",
    a = !0,
    i;
  return o;
  function o(c, s, h) {
    const p = [];
    let m, y, g, k, v;
    for (
      c =
        l +
        (typeof c == "string"
          ? c.toString()
          : new TextDecoder(s || void 0).decode(c)),
        g = 0,
        l = "",
        a && (c.charCodeAt(0) === 65279 && g++, (a = void 0));
      g < c.length;

    ) {
      if (
        ((nm.lastIndex = g),
        (m = nm.exec(c)),
        (k = m && m.index !== void 0 ? m.index : c.length),
        (v = c.charCodeAt(k)),
        !m)
      ) {
        l = c.slice(g);
        break;
      }
      if (v === 10 && g === k && i) (p.push(-3), (i = void 0));
      else
        switch (
          (i && (p.push(-5), (i = void 0)),
          g < k && (p.push(c.slice(g, k)), (t += k - g)),
          v)
        ) {
          case 0: {
            (p.push(65533), t++);
            break;
          }
          case 9: {
            for (y = Math.ceil(t / 4) * 4, p.push(-2); t++ < y; ) p.push(-1);
            break;
          }
          case 10: {
            (p.push(-4), (t = 1));
            break;
          }
          default:
            ((i = !0), (t = 1));
        }
      g = k + 1;
    }
    return (h && (i && p.push(-5), l && p.push(l), p.push(null)), p);
  }
}
const hS = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function dS(t) {
  return t.replace(hS, pS);
}
function pS(t, l, a) {
  if (l) return l;
  if (a.charCodeAt(0) === 35) {
    const o = a.charCodeAt(1),
      c = o === 120 || o === 88;
    return qg(a.slice(c ? 2 : 1), c ? 16 : 10);
  }
  return Wf(a) || t;
}
const Kg = {}.hasOwnProperty;
function mS(t, l, a) {
  return (
    typeof l != "string" && ((a = l), (l = void 0)),
    gS(a)(
      cS(
        sS(a)
          .document()
          .write(fS()(t, l, !0))
      )
    )
  );
}
function gS(t) {
  const l = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: c(Fe),
      autolinkProtocol: K,
      autolinkEmail: K,
      atxHeading: c(Oe),
      blockQuote: c(at),
      characterEscape: K,
      characterReference: K,
      codeFenced: c(xt),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: c(xt, s),
      codeText: c(Ae, s),
      codeTextData: K,
      data: K,
      codeFlowValue: K,
      definition: c(Se),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: c(ve),
      hardBreakEscape: c(_e),
      hardBreakTrailing: c(_e),
      htmlFlow: c(Ie, s),
      htmlFlowData: K,
      htmlText: c(Ie, s),
      htmlTextData: K,
      image: c(At),
      label: s,
      link: c(Fe),
      listItem: c(ft),
      listItemValue: k,
      listOrdered: c(Ye, g),
      listUnordered: c(Ye),
      paragraph: c(el),
      reference: w,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: c(Oe),
      strong: c(On),
      thematicBreak: c(mt),
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: O,
      autolink: p(),
      autolinkEmail: lt,
      autolinkProtocol: Te,
      blockQuote: p(),
      characterEscapeValue: z,
      characterReferenceMarkerHexadecimal: ge,
      characterReferenceMarkerNumeric: ge,
      characterReferenceValue: se,
      characterReference: Ee,
      codeFenced: p(U),
      codeFencedFence: C,
      codeFencedFenceInfo: v,
      codeFencedFenceMeta: A,
      codeFlowValue: z,
      codeIndented: p(R),
      codeText: p(ue),
      codeTextData: z,
      data: z,
      definition: p(),
      definitionDestinationString: ee,
      definitionLabelString: Y,
      definitionTitleString: V,
      emphasis: p(),
      hardBreakEscape: p(te),
      hardBreakTrailing: p(te),
      htmlFlow: p(le),
      htmlFlowData: z,
      htmlText: p(ie),
      htmlTextData: z,
      image: p(J),
      label: be,
      labelText: Q,
      lineEnding: ne,
      link: p(L),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: oe,
      resourceDestinationString: x,
      resourceTitleString: G,
      resource: re,
      setextHeading: p(q),
      setextHeadingLineSequence: F,
      setextHeadingText: _,
      strong: p(),
      thematicBreak: p(),
    },
  };
  Jg(l, (t || {}).mdastExtensions || []);
  const a = {};
  return i;
  function i(I) {
    let W = { type: "root", children: [] };
    const de = {
        stack: [W],
        tokenStack: [],
        config: l,
        enter: h,
        exit: m,
        buffer: s,
        resume: y,
        data: a,
      },
      me = [];
    let Ve = -1;
    for (; ++Ve < I.length; )
      if (I[Ve][1].type === "listOrdered" || I[Ve][1].type === "listUnordered")
        if (I[Ve][0] === "enter") me.push(Ve);
        else {
          const Rt = me.pop();
          Ve = o(I, Rt, Ve);
        }
    for (Ve = -1; ++Ve < I.length; ) {
      const Rt = l[I[Ve][0]];
      Kg.call(Rt, I[Ve][1].type) &&
        Rt[I[Ve][1].type].call(
          Object.assign({ sliceSerialize: I[Ve][2].sliceSerialize }, de),
          I[Ve][1]
        );
    }
    if (de.tokenStack.length > 0) {
      const Rt = de.tokenStack[de.tokenStack.length - 1];
      (Rt[1] || lm).call(de, void 0, Rt[0]);
    }
    for (
      W.position = {
        start: _l(
          I.length > 0 ? I[0][1].start : { line: 1, column: 1, offset: 0 }
        ),
        end: _l(
          I.length > 0
            ? I[I.length - 2][1].end
            : { line: 1, column: 1, offset: 0 }
        ),
      },
        Ve = -1;
      ++Ve < l.transforms.length;

    )
      W = l.transforms[Ve](W) || W;
    return W;
  }
  function o(I, W, de) {
    let me = W - 1,
      Ve = -1,
      Rt = !1,
      ln,
      Bt,
      kn,
      Qt;
    for (; ++me <= de; ) {
      const vt = I[me];
      switch (vt[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          (vt[0] === "enter" ? Ve++ : Ve--, (Qt = void 0));
          break;
        }
        case "lineEndingBlank": {
          vt[0] === "enter" &&
            (ln && !Qt && !Ve && !kn && (kn = me), (Qt = void 0));
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Qt = void 0;
      }
      if (
        (!Ve && vt[0] === "enter" && vt[1].type === "listItemPrefix") ||
        (Ve === -1 &&
          vt[0] === "exit" &&
          (vt[1].type === "listUnordered" || vt[1].type === "listOrdered"))
      ) {
        if (ln) {
          let rn = me;
          for (Bt = void 0; rn--; ) {
            const gn = I[rn];
            if (
              gn[1].type === "lineEnding" ||
              gn[1].type === "lineEndingBlank"
            ) {
              if (gn[0] === "exit") continue;
              (Bt && ((I[Bt][1].type = "lineEndingBlank"), (Rt = !0)),
                (gn[1].type = "lineEnding"),
                (Bt = rn));
            } else if (
              !(
                gn[1].type === "linePrefix" ||
                gn[1].type === "blockQuotePrefix" ||
                gn[1].type === "blockQuotePrefixWhitespace" ||
                gn[1].type === "blockQuoteMarker" ||
                gn[1].type === "listItemIndent"
              )
            )
              break;
          }
          (kn && (!Bt || kn < Bt) && (ln._spread = !0),
            (ln.end = Object.assign({}, Bt ? I[Bt][1].start : vt[1].end)),
            I.splice(Bt || me, 0, ["exit", ln, vt[2]]),
            me++,
            de++);
        }
        if (vt[1].type === "listItemPrefix") {
          const rn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, vt[1].start),
            end: void 0,
          };
          ((ln = rn),
            I.splice(me, 0, ["enter", rn, vt[2]]),
            me++,
            de++,
            (kn = void 0),
            (Qt = !0));
        }
      }
    }
    return ((I[W][1]._spread = Rt), de);
  }
  function c(I, W) {
    return de;
    function de(me) {
      (h.call(this, I(me), me), W && W.call(this, me));
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function h(I, W, de) {
    (this.stack[this.stack.length - 1].children.push(I),
      this.stack.push(I),
      this.tokenStack.push([W, de || void 0]),
      (I.position = { start: _l(W.start), end: void 0 }));
  }
  function p(I) {
    return W;
    function W(de) {
      (I && I.call(this, de), m.call(this, de));
    }
  }
  function m(I, W) {
    const de = this.stack.pop(),
      me = this.tokenStack.pop();
    if (me)
      me[0].type !== I.type &&
        (W ? W.call(this, I, me[0]) : (me[1] || lm).call(this, I, me[0]));
    else
      throw new Error(
        "Cannot close `" +
          I.type +
          "` (" +
          ri({ start: I.start, end: I.end }) +
          "): it’s not open"
      );
    de.position.end = _l(I.end);
  }
  function y() {
    return Jf(this.stack.pop());
  }
  function g() {
    this.data.expectingFirstListItemValue = !0;
  }
  function k(I) {
    if (this.data.expectingFirstListItemValue) {
      const W = this.stack[this.stack.length - 2];
      ((W.start = Number.parseInt(this.sliceSerialize(I), 10)),
        (this.data.expectingFirstListItemValue = void 0));
    }
  }
  function v() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.lang = I;
  }
  function A() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.meta = I;
  }
  function C() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function U() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    ((W.value = I.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
      (this.data.flowCodeInside = void 0));
  }
  function R() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = I.replace(/(\r?\n|\r)$/g, "");
  }
  function Y(I) {
    const W = this.resume(),
      de = this.stack[this.stack.length - 1];
    ((de.label = W),
      (de.identifier = vn(this.sliceSerialize(I)).toLowerCase()));
  }
  function V() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.title = I;
  }
  function ee() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.url = I;
  }
  function O(I) {
    const W = this.stack[this.stack.length - 1];
    if (!W.depth) {
      const de = this.sliceSerialize(I).length;
      W.depth = de;
    }
  }
  function _() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function F(I) {
    const W = this.stack[this.stack.length - 1];
    W.depth = this.sliceSerialize(I).codePointAt(0) === 61 ? 1 : 2;
  }
  function q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function K(I) {
    const de = this.stack[this.stack.length - 1].children;
    let me = de[de.length - 1];
    ((!me || me.type !== "text") &&
      ((me = tl()),
      (me.position = { start: _l(I.start), end: void 0 }),
      de.push(me)),
      this.stack.push(me));
  }
  function z(I) {
    const W = this.stack.pop();
    ((W.value += this.sliceSerialize(I)), (W.position.end = _l(I.end)));
  }
  function ne(I) {
    const W = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const de = W.children[W.children.length - 1];
      ((de.position.end = _l(I.end)), (this.data.atHardBreak = void 0));
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      l.canContainEols.includes(W.type) &&
      (K.call(this, I), z.call(this, I));
  }
  function te() {
    this.data.atHardBreak = !0;
  }
  function le() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = I;
  }
  function ie() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = I;
  }
  function ue() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = I;
  }
  function L() {
    const I = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const W = this.data.referenceType || "shortcut";
      ((I.type += "Reference"),
        (I.referenceType = W),
        delete I.url,
        delete I.title);
    } else (delete I.identifier, delete I.label);
    this.data.referenceType = void 0;
  }
  function J() {
    const I = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const W = this.data.referenceType || "shortcut";
      ((I.type += "Reference"),
        (I.referenceType = W),
        delete I.url,
        delete I.title);
    } else (delete I.identifier, delete I.label);
    this.data.referenceType = void 0;
  }
  function Q(I) {
    const W = this.sliceSerialize(I),
      de = this.stack[this.stack.length - 2];
    ((de.label = dS(W)), (de.identifier = vn(W).toLowerCase()));
  }
  function be() {
    const I = this.stack[this.stack.length - 1],
      W = this.resume(),
      de = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), de.type === "link")) {
      const me = I.children;
      de.children = me;
    } else de.alt = W;
  }
  function x() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.url = I;
  }
  function G() {
    const I = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.title = I;
  }
  function re() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function oe(I) {
    const W = this.resume(),
      de = this.stack[this.stack.length - 1];
    ((de.label = W),
      (de.identifier = vn(this.sliceSerialize(I)).toLowerCase()),
      (this.data.referenceType = "full"));
  }
  function ge(I) {
    this.data.characterReferenceType = I.type;
  }
  function se(I) {
    const W = this.sliceSerialize(I),
      de = this.data.characterReferenceType;
    let me;
    de
      ? ((me = qg(W, de === "characterReferenceMarkerNumeric" ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (me = Wf(W));
    const Ve = this.stack[this.stack.length - 1];
    Ve.value += me;
  }
  function Ee(I) {
    const W = this.stack.pop();
    W.position.end = _l(I.end);
  }
  function Te(I) {
    z.call(this, I);
    const W = this.stack[this.stack.length - 1];
    W.url = this.sliceSerialize(I);
  }
  function lt(I) {
    z.call(this, I);
    const W = this.stack[this.stack.length - 1];
    W.url = "mailto:" + this.sliceSerialize(I);
  }
  function at() {
    return { type: "blockquote", children: [] };
  }
  function xt() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function Ae() {
    return { type: "inlineCode", value: "" };
  }
  function Se() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function ve() {
    return { type: "emphasis", children: [] };
  }
  function Oe() {
    return { type: "heading", depth: 0, children: [] };
  }
  function _e() {
    return { type: "break" };
  }
  function Ie() {
    return { type: "html", value: "" };
  }
  function At() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Fe() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function Ye(I) {
    return {
      type: "list",
      ordered: I.type === "listOrdered",
      start: null,
      spread: I._spread,
      children: [],
    };
  }
  function ft(I) {
    return { type: "listItem", spread: I._spread, checked: null, children: [] };
  }
  function el() {
    return { type: "paragraph", children: [] };
  }
  function On() {
    return { type: "strong", children: [] };
  }
  function tl() {
    return { type: "text", value: "" };
  }
  function mt() {
    return { type: "thematicBreak" };
  }
}
function _l(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function Jg(t, l) {
  let a = -1;
  for (; ++a < l.length; ) {
    const i = l[a];
    Array.isArray(i) ? Jg(t, i) : yS(t, i);
  }
}
function yS(t, l) {
  let a;
  for (a in l)
    if (Kg.call(l, a))
      switch (a) {
        case "canContainEols": {
          const i = l[a];
          i && t[a].push(...i);
          break;
        }
        case "transforms": {
          const i = l[a];
          i && t[a].push(...i);
          break;
        }
        case "enter":
        case "exit": {
          const i = l[a];
          i && Object.assign(t[a], i);
          break;
        }
      }
}
function lm(t, l) {
  throw t
    ? new Error(
        "Cannot close `" +
          t.type +
          "` (" +
          ri({ start: t.start, end: t.end }) +
          "): a different token (`" +
          l.type +
          "`, " +
          ri({ start: l.start, end: l.end }) +
          ") is open"
      )
    : new Error(
        "Cannot close document, a token (`" +
          l.type +
          "`, " +
          ri({ start: l.start, end: l.end }) +
          ") is still open"
      );
}
function bS(t) {
  const l = this;
  l.parser = a;
  function a(i) {
    return mS(i, {
      ...l.data("settings"),
      ...t,
      extensions: l.data("micromarkExtensions") || [],
      mdastExtensions: l.data("fromMarkdownExtensions") || [],
    });
  }
}
function xS(t, l) {
  const a = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: t.wrap(t.all(l), !0),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
function vS(t, l) {
  const a = { type: "element", tagName: "br", properties: {}, children: [] };
  return (
    t.patch(l, a),
    [
      t.applyData(l, a),
      {
        type: "text",
        value: `
`,
      },
    ]
  );
}
function kS(t, l) {
  const a = l.value
      ? l.value +
        `
`
      : "",
    i = {};
  l.lang && (i.className = ["language-" + l.lang]);
  let o = {
    type: "element",
    tagName: "code",
    properties: i,
    children: [{ type: "text", value: a }],
  };
  return (
    l.meta && (o.data = { meta: l.meta }),
    t.patch(l, o),
    (o = t.applyData(l, o)),
    (o = { type: "element", tagName: "pre", properties: {}, children: [o] }),
    t.patch(l, o),
    o
  );
}
function SS(t, l) {
  const a = {
    type: "element",
    tagName: "del",
    properties: {},
    children: t.all(l),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
function wS(t, l) {
  const a = {
    type: "element",
    tagName: "em",
    properties: {},
    children: t.all(l),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
function ES(t, l) {
  const a =
      typeof t.options.clobberPrefix == "string"
        ? t.options.clobberPrefix
        : "user-content-",
    i = String(l.identifier).toUpperCase(),
    o = Jr(i.toLowerCase()),
    c = t.footnoteOrder.indexOf(i);
  let s,
    h = t.footnoteCounts.get(i);
  (h === void 0
    ? ((h = 0), t.footnoteOrder.push(i), (s = t.footnoteOrder.length))
    : (s = c + 1),
    (h += 1),
    t.footnoteCounts.set(i, h));
  const p = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + a + "fn-" + o,
      id: a + "fnref-" + o + (h > 1 ? "-" + h : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"],
    },
    children: [{ type: "text", value: String(s) }],
  };
  t.patch(l, p);
  const m = { type: "element", tagName: "sup", properties: {}, children: [p] };
  return (t.patch(l, m), t.applyData(l, m));
}
function AS(t, l) {
  const a = {
    type: "element",
    tagName: "h" + l.depth,
    properties: {},
    children: t.all(l),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
function _S(t, l) {
  if (t.options.allowDangerousHtml) {
    const a = { type: "raw", value: l.value };
    return (t.patch(l, a), t.applyData(l, a));
  }
}
function Wg(t, l) {
  const a = l.referenceType;
  let i = "]";
  if (
    (a === "collapsed"
      ? (i += "[]")
      : a === "full" && (i += "[" + (l.label || l.identifier) + "]"),
    l.type === "imageReference")
  )
    return [{ type: "text", value: "![" + l.alt + i }];
  const o = t.all(l),
    c = o[0];
  c && c.type === "text"
    ? (c.value = "[" + c.value)
    : o.unshift({ type: "text", value: "[" });
  const s = o[o.length - 1];
  return (
    s && s.type === "text"
      ? (s.value += i)
      : o.push({ type: "text", value: i }),
    o
  );
}
function TS(t, l) {
  const a = String(l.identifier).toUpperCase(),
    i = t.definitionById.get(a);
  if (!i) return Wg(t, l);
  const o = { src: Jr(i.url || ""), alt: l.alt };
  i.title !== null && i.title !== void 0 && (o.title = i.title);
  const c = { type: "element", tagName: "img", properties: o, children: [] };
  return (t.patch(l, c), t.applyData(l, c));
}
function CS(t, l) {
  const a = { src: Jr(l.url) };
  (l.alt !== null && l.alt !== void 0 && (a.alt = l.alt),
    l.title !== null && l.title !== void 0 && (a.title = l.title));
  const i = { type: "element", tagName: "img", properties: a, children: [] };
  return (t.patch(l, i), t.applyData(l, i));
}
function RS(t, l) {
  const a = { type: "text", value: l.value.replace(/\r?\n|\r/g, " ") };
  t.patch(l, a);
  const i = { type: "element", tagName: "code", properties: {}, children: [a] };
  return (t.patch(l, i), t.applyData(l, i));
}
function MS(t, l) {
  const a = String(l.identifier).toUpperCase(),
    i = t.definitionById.get(a);
  if (!i) return Wg(t, l);
  const o = { href: Jr(i.url || "") };
  i.title !== null && i.title !== void 0 && (o.title = i.title);
  const c = {
    type: "element",
    tagName: "a",
    properties: o,
    children: t.all(l),
  };
  return (t.patch(l, c), t.applyData(l, c));
}
function zS(t, l) {
  const a = { href: Jr(l.url) };
  l.title !== null && l.title !== void 0 && (a.title = l.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: a,
    children: t.all(l),
  };
  return (t.patch(l, i), t.applyData(l, i));
}
function DS(t, l, a) {
  const i = t.all(l),
    o = a ? OS(a) : ey(l),
    c = {},
    s = [];
  if (typeof l.checked == "boolean") {
    const y = i[0];
    let g;
    (y && y.type === "element" && y.tagName === "p"
      ? (g = y)
      : ((g = { type: "element", tagName: "p", properties: {}, children: [] }),
        i.unshift(g)),
      g.children.length > 0 && g.children.unshift({ type: "text", value: " " }),
      g.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: l.checked, disabled: !0 },
        children: [],
      }),
      (c.className = ["task-list-item"]));
  }
  let h = -1;
  for (; ++h < i.length; ) {
    const y = i[h];
    ((o || h !== 0 || y.type !== "element" || y.tagName !== "p") &&
      s.push({
        type: "text",
        value: `
`,
      }),
      y.type === "element" && y.tagName === "p" && !o
        ? s.push(...y.children)
        : s.push(y));
  }
  const p = i[i.length - 1];
  p &&
    (o || p.type !== "element" || p.tagName !== "p") &&
    s.push({
      type: "text",
      value: `
`,
    });
  const m = { type: "element", tagName: "li", properties: c, children: s };
  return (t.patch(l, m), t.applyData(l, m));
}
function OS(t) {
  let l = !1;
  if (t.type === "list") {
    l = t.spread || !1;
    const a = t.children;
    let i = -1;
    for (; !l && ++i < a.length; ) l = ey(a[i]);
  }
  return l;
}
function ey(t) {
  const l = t.spread;
  return l ?? t.children.length > 1;
}
function NS(t, l) {
  const a = {},
    i = t.all(l);
  let o = -1;
  for (
    typeof l.start == "number" && l.start !== 1 && (a.start = l.start);
    ++o < i.length;

  ) {
    const s = i[o];
    if (
      s.type === "element" &&
      s.tagName === "li" &&
      s.properties &&
      Array.isArray(s.properties.className) &&
      s.properties.className.includes("task-list-item")
    ) {
      a.className = ["contains-task-list"];
      break;
    }
  }
  const c = {
    type: "element",
    tagName: l.ordered ? "ol" : "ul",
    properties: a,
    children: t.wrap(i, !0),
  };
  return (t.patch(l, c), t.applyData(l, c));
}
function LS(t, l) {
  const a = {
    type: "element",
    tagName: "p",
    properties: {},
    children: t.all(l),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
function HS(t, l) {
  const a = { type: "root", children: t.wrap(t.all(l)) };
  return (t.patch(l, a), t.applyData(l, a));
}
function jS(t, l) {
  const a = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: t.all(l),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
function US(t, l) {
  const a = t.all(l),
    i = a.shift(),
    o = [];
  if (i) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: t.wrap([i], !0),
    };
    (t.patch(l.children[0], s), o.push(s));
  }
  if (a.length > 0) {
    const s = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: t.wrap(a, !0),
      },
      h = Xf(l.children[1]),
      p = Og(l.children[l.children.length - 1]);
    (h && p && (s.position = { start: h, end: p }), o.push(s));
  }
  const c = {
    type: "element",
    tagName: "table",
    properties: {},
    children: t.wrap(o, !0),
  };
  return (t.patch(l, c), t.applyData(l, c));
}
function BS(t, l, a) {
  const i = a ? a.children : void 0,
    c = (i ? i.indexOf(l) : 1) === 0 ? "th" : "td",
    s = a && a.type === "table" ? a.align : void 0,
    h = s ? s.length : l.children.length;
  let p = -1;
  const m = [];
  for (; ++p < h; ) {
    const g = l.children[p],
      k = {},
      v = s ? s[p] : void 0;
    v && (k.align = v);
    let A = { type: "element", tagName: c, properties: k, children: [] };
    (g && ((A.children = t.all(g)), t.patch(g, A), (A = t.applyData(g, A))),
      m.push(A));
  }
  const y = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: t.wrap(m, !0),
  };
  return (t.patch(l, y), t.applyData(l, y));
}
function VS(t, l) {
  const a = {
    type: "element",
    tagName: "td",
    properties: {},
    children: t.all(l),
  };
  return (t.patch(l, a), t.applyData(l, a));
}
const rm = 9,
  am = 32;
function qS(t) {
  const l = String(t),
    a = /\r?\n|\r/g;
  let i = a.exec(l),
    o = 0;
  const c = [];
  for (; i; )
    (c.push(im(l.slice(o, i.index), o > 0, !0), i[0]),
      (o = i.index + i[0].length),
      (i = a.exec(l)));
  return (c.push(im(l.slice(o), o > 0, !1)), c.join(""));
}
function im(t, l, a) {
  let i = 0,
    o = t.length;
  if (l) {
    let c = t.codePointAt(i);
    for (; c === rm || c === am; ) (i++, (c = t.codePointAt(i)));
  }
  if (a) {
    let c = t.codePointAt(o - 1);
    for (; c === rm || c === am; ) (o--, (c = t.codePointAt(o - 1)));
  }
  return o > i ? t.slice(i, o) : "";
}
function ZS(t, l) {
  const a = { type: "text", value: qS(String(l.value)) };
  return (t.patch(l, a), t.applyData(l, a));
}
function IS(t, l) {
  const a = { type: "element", tagName: "hr", properties: {}, children: [] };
  return (t.patch(l, a), t.applyData(l, a));
}
const YS = {
  blockquote: xS,
  break: vS,
  code: kS,
  delete: SS,
  emphasis: wS,
  footnoteReference: ES,
  heading: AS,
  html: _S,
  imageReference: TS,
  image: CS,
  inlineCode: RS,
  linkReference: MS,
  link: zS,
  listItem: DS,
  list: NS,
  paragraph: LS,
  root: HS,
  strong: jS,
  table: US,
  tableCell: VS,
  tableRow: BS,
  text: ZS,
  thematicBreak: IS,
  toml: Bu,
  yaml: Bu,
  definition: Bu,
  footnoteDefinition: Bu,
};
function Bu() {}
const ty = -1,
  ro = 0,
  ii = 1,
  Pu = 2,
  th = 3,
  nh = 4,
  lh = 5,
  rh = 6,
  ny = 7,
  ly = 8,
  um = typeof self == "object" ? self : globalThis,
  GS = (t, l) => {
    const a = (o, c) => (t.set(c, o), o),
      i = (o) => {
        if (t.has(o)) return t.get(o);
        const [c, s] = l[o];
        switch (c) {
          case ro:
          case ty:
            return a(s, o);
          case ii: {
            const h = a([], o);
            for (const p of s) h.push(i(p));
            return h;
          }
          case Pu: {
            const h = a({}, o);
            for (const [p, m] of s) h[i(p)] = i(m);
            return h;
          }
          case th:
            return a(new Date(s), o);
          case nh: {
            const { source: h, flags: p } = s;
            return a(new RegExp(h, p), o);
          }
          case lh: {
            const h = a(new Map(), o);
            for (const [p, m] of s) h.set(i(p), i(m));
            return h;
          }
          case rh: {
            const h = a(new Set(), o);
            for (const p of s) h.add(i(p));
            return h;
          }
          case ny: {
            const { name: h, message: p } = s;
            return a(new um[h](p), o);
          }
          case ly:
            return a(BigInt(s), o);
          case "BigInt":
            return a(Object(BigInt(s)), o);
          case "ArrayBuffer":
            return a(new Uint8Array(s).buffer, s);
          case "DataView": {
            const { buffer: h } = new Uint8Array(s);
            return a(new DataView(h), s);
          }
        }
        return a(new um[c](s), o);
      };
    return i;
  },
  om = (t) => GS(new Map(), t)(0),
  Yr = "",
  { toString: FS } = {},
  { keys: QS } = Object,
  ni = (t) => {
    const l = typeof t;
    if (l !== "object" || !t) return [ro, l];
    const a = FS.call(t).slice(8, -1);
    switch (a) {
      case "Array":
        return [ii, Yr];
      case "Object":
        return [Pu, Yr];
      case "Date":
        return [th, Yr];
      case "RegExp":
        return [nh, Yr];
      case "Map":
        return [lh, Yr];
      case "Set":
        return [rh, Yr];
      case "DataView":
        return [ii, a];
    }
    return a.includes("Array")
      ? [ii, a]
      : a.includes("Error")
        ? [ny, a]
        : [Pu, a];
  },
  Vu = ([t, l]) => t === ro && (l === "function" || l === "symbol"),
  XS = (t, l, a, i) => {
    const o = (s, h) => {
        const p = i.push(s) - 1;
        return (a.set(h, p), p);
      },
      c = (s) => {
        if (a.has(s)) return a.get(s);
        let [h, p] = ni(s);
        switch (h) {
          case ro: {
            let y = s;
            switch (p) {
              case "bigint":
                ((h = ly), (y = s.toString()));
                break;
              case "function":
              case "symbol":
                if (t) throw new TypeError("unable to serialize " + p);
                y = null;
                break;
              case "undefined":
                return o([ty], s);
            }
            return o([h, y], s);
          }
          case ii: {
            if (p) {
              let k = s;
              return (
                p === "DataView"
                  ? (k = new Uint8Array(s.buffer))
                  : p === "ArrayBuffer" && (k = new Uint8Array(s)),
                o([p, [...k]], s)
              );
            }
            const y = [],
              g = o([h, y], s);
            for (const k of s) y.push(c(k));
            return g;
          }
          case Pu: {
            if (p)
              switch (p) {
                case "BigInt":
                  return o([p, s.toString()], s);
                case "Boolean":
                case "Number":
                case "String":
                  return o([p, s.valueOf()], s);
              }
            if (l && "toJSON" in s) return c(s.toJSON());
            const y = [],
              g = o([h, y], s);
            for (const k of QS(s))
              (t || !Vu(ni(s[k]))) && y.push([c(k), c(s[k])]);
            return g;
          }
          case th:
            return o([h, s.toISOString()], s);
          case nh: {
            const { source: y, flags: g } = s;
            return o([h, { source: y, flags: g }], s);
          }
          case lh: {
            const y = [],
              g = o([h, y], s);
            for (const [k, v] of s)
              (t || !(Vu(ni(k)) || Vu(ni(v)))) && y.push([c(k), c(v)]);
            return g;
          }
          case rh: {
            const y = [],
              g = o([h, y], s);
            for (const k of s) (t || !Vu(ni(k))) && y.push(c(k));
            return g;
          }
        }
        const { message: m } = s;
        return o([h, { name: p, message: m }], s);
      };
    return c;
  },
  sm = (t, { json: l, lossy: a } = {}) => {
    const i = [];
    return (XS(!(l || a), !!l, new Map(), i)(t), i);
  },
  Ku =
    typeof structuredClone == "function"
      ? (t, l) =>
          l && ("json" in l || "lossy" in l) ? om(sm(t, l)) : structuredClone(t)
      : (t, l) => om(sm(t, l));
function $S(t, l) {
  const a = [{ type: "text", value: "↩" }];
  return (
    l > 1 &&
      a.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(l) }],
      }),
    a
  );
}
function PS(t, l) {
  return "Back to reference " + (t + 1) + (l > 1 ? "-" + l : "");
}
function KS(t) {
  const l =
      typeof t.options.clobberPrefix == "string"
        ? t.options.clobberPrefix
        : "user-content-",
    a = t.options.footnoteBackContent || $S,
    i = t.options.footnoteBackLabel || PS,
    o = t.options.footnoteLabel || "Footnotes",
    c = t.options.footnoteLabelTagName || "h2",
    s = t.options.footnoteLabelProperties || { className: ["sr-only"] },
    h = [];
  let p = -1;
  for (; ++p < t.footnoteOrder.length; ) {
    const m = t.footnoteById.get(t.footnoteOrder[p]);
    if (!m) continue;
    const y = t.all(m),
      g = String(m.identifier).toUpperCase(),
      k = Jr(g.toLowerCase());
    let v = 0;
    const A = [],
      C = t.footnoteCounts.get(g);
    for (; C !== void 0 && ++v <= C; ) {
      A.length > 0 && A.push({ type: "text", value: " " });
      let Y = typeof a == "string" ? a : a(p, v);
      (typeof Y == "string" && (Y = { type: "text", value: Y }),
        A.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + l + "fnref-" + k + (v > 1 ? "-" + v : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof i == "string" ? i : i(p, v),
            className: ["data-footnote-backref"],
          },
          children: Array.isArray(Y) ? Y : [Y],
        }));
    }
    const U = y[y.length - 1];
    if (U && U.type === "element" && U.tagName === "p") {
      const Y = U.children[U.children.length - 1];
      (Y && Y.type === "text"
        ? (Y.value += " ")
        : U.children.push({ type: "text", value: " " }),
        U.children.push(...A));
    } else y.push(...A);
    const R = {
      type: "element",
      tagName: "li",
      properties: { id: l + "fn-" + k },
      children: t.wrap(y, !0),
    };
    (t.patch(m, R), h.push(R));
  }
  if (h.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: c,
          properties: { ...Ku(s), id: "footnote-label" },
          children: [{ type: "text", value: o }],
        },
        {
          type: "text",
          value: `
`,
        },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: t.wrap(h, !0),
        },
        {
          type: "text",
          value: `
`,
        },
      ],
    };
}
const ao = function (t) {
  if (t == null) return tw;
  if (typeof t == "function") return io(t);
  if (typeof t == "object") return Array.isArray(t) ? JS(t) : WS(t);
  if (typeof t == "string") return ew(t);
  throw new Error("Expected function, string, or object as test");
};
function JS(t) {
  const l = [];
  let a = -1;
  for (; ++a < t.length; ) l[a] = ao(t[a]);
  return io(i);
  function i(...o) {
    let c = -1;
    for (; ++c < l.length; ) if (l[c].apply(this, o)) return !0;
    return !1;
  }
}
function WS(t) {
  const l = t;
  return io(a);
  function a(i) {
    const o = i;
    let c;
    for (c in t) if (o[c] !== l[c]) return !1;
    return !0;
  }
}
function ew(t) {
  return io(l);
  function l(a) {
    return a && a.type === t;
  }
}
function io(t) {
  return l;
  function l(a, i, o) {
    return !!(
      nw(a) && t.call(this, a, typeof i == "number" ? i : void 0, o || void 0)
    );
  }
}
function tw() {
  return !0;
}
function nw(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const ry = [],
  lw = !0,
  Af = !1,
  rw = "skip";
function ay(t, l, a, i) {
  let o;
  typeof l == "function" && typeof a != "function"
    ? ((i = a), (a = l))
    : (o = l);
  const c = ao(o),
    s = i ? -1 : 1;
  h(t, void 0, [])();
  function h(p, m, y) {
    const g = p && typeof p == "object" ? p : {};
    if (typeof g.type == "string") {
      const v =
        typeof g.tagName == "string"
          ? g.tagName
          : typeof g.name == "string"
            ? g.name
            : void 0;
      Object.defineProperty(k, "name", {
        value: "node (" + (p.type + (v ? "<" + v + ">" : "")) + ")",
      });
    }
    return k;
    function k() {
      let v = ry,
        A,
        C,
        U;
      if (
        (!l || c(p, m, y[y.length - 1] || void 0)) &&
        ((v = aw(a(p, y))), v[0] === Af)
      )
        return v;
      if ("children" in p && p.children) {
        const R = p;
        if (R.children && v[0] !== rw)
          for (
            C = (i ? R.children.length : -1) + s, U = y.concat(R);
            C > -1 && C < R.children.length;

          ) {
            const Y = R.children[C];
            if (((A = h(Y, C, U)()), A[0] === Af)) return A;
            C = typeof A[1] == "number" ? A[1] : C + s;
          }
      }
      return v;
    }
  }
}
function aw(t) {
  return Array.isArray(t)
    ? t
    : typeof t == "number"
      ? [lw, t]
      : t == null
        ? ry
        : [t];
}
function ah(t, l, a, i) {
  let o, c, s;
  (typeof l == "function"
    ? ((c = void 0), (s = l), (o = a))
    : ((c = l), (s = a), (o = i)),
    ay(t, c, h, o));
  function h(p, m) {
    const y = m[m.length - 1],
      g = y ? y.children.indexOf(p) : void 0;
    return s(p, g, y);
  }
}
const _f = {}.hasOwnProperty,
  iw = {};
function uw(t, l) {
  const a = l || iw,
    i = new Map(),
    o = new Map(),
    c = new Map(),
    s = { ...YS, ...a.handlers },
    h = {
      all: m,
      applyData: sw,
      definitionById: i,
      footnoteById: o,
      footnoteCounts: c,
      footnoteOrder: [],
      handlers: s,
      one: p,
      options: a,
      patch: ow,
      wrap: fw,
    };
  return (
    ah(t, function (y) {
      if (y.type === "definition" || y.type === "footnoteDefinition") {
        const g = y.type === "definition" ? i : o,
          k = String(y.identifier).toUpperCase();
        g.has(k) || g.set(k, y);
      }
    }),
    h
  );
  function p(y, g) {
    const k = y.type,
      v = h.handlers[k];
    if (_f.call(h.handlers, k) && v) return v(h, y, g);
    if (h.options.passThrough && h.options.passThrough.includes(k)) {
      if ("children" in y) {
        const { children: C, ...U } = y,
          R = Ku(U);
        return ((R.children = h.all(y)), R);
      }
      return Ku(y);
    }
    return (h.options.unknownHandler || cw)(h, y, g);
  }
  function m(y) {
    const g = [];
    if ("children" in y) {
      const k = y.children;
      let v = -1;
      for (; ++v < k.length; ) {
        const A = h.one(k[v], y);
        if (A) {
          if (
            v &&
            k[v - 1].type === "break" &&
            (!Array.isArray(A) && A.type === "text" && (A.value = cm(A.value)),
            !Array.isArray(A) && A.type === "element")
          ) {
            const C = A.children[0];
            C && C.type === "text" && (C.value = cm(C.value));
          }
          Array.isArray(A) ? g.push(...A) : g.push(A);
        }
      }
    }
    return g;
  }
}
function ow(t, l) {
  t.position && (l.position = P8(t));
}
function sw(t, l) {
  let a = l;
  if (t && t.data) {
    const i = t.data.hName,
      o = t.data.hChildren,
      c = t.data.hProperties;
    if (typeof i == "string")
      if (a.type === "element") a.tagName = i;
      else {
        const s = "children" in a ? a.children : [a];
        a = { type: "element", tagName: i, properties: {}, children: s };
      }
    (a.type === "element" && c && Object.assign(a.properties, Ku(c)),
      "children" in a &&
        a.children &&
        o !== null &&
        o !== void 0 &&
        (a.children = o));
  }
  return a;
}
function cw(t, l) {
  const a = l.data || {},
    i =
      "value" in l && !(_f.call(a, "hProperties") || _f.call(a, "hChildren"))
        ? { type: "text", value: l.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: t.all(l),
          };
  return (t.patch(l, i), t.applyData(l, i));
}
function fw(t, l) {
  const a = [];
  let i = -1;
  for (
    l &&
    a.push({
      type: "text",
      value: `
`,
    });
    ++i < t.length;

  )
    (i &&
      a.push({
        type: "text",
        value: `
`,
      }),
      a.push(t[i]));
  return (
    l &&
      t.length > 0 &&
      a.push({
        type: "text",
        value: `
`,
      }),
    a
  );
}
function cm(t) {
  let l = 0,
    a = t.charCodeAt(l);
  for (; a === 9 || a === 32; ) (l++, (a = t.charCodeAt(l)));
  return t.slice(l);
}
function fm(t, l) {
  const a = uw(t, l),
    i = a.one(t, void 0),
    o = KS(a),
    c = Array.isArray(i)
      ? { type: "root", children: i }
      : i || { type: "root", children: [] };
  return (
    o &&
      c.children.push(
        {
          type: "text",
          value: `
`,
        },
        o
      ),
    c
  );
}
function hw(t, l) {
  return t && "run" in t
    ? async function (a, i) {
        const o = fm(a, { file: i, ...l });
        await t.run(o, i);
      }
    : function (a, i) {
        return fm(a, { file: i, ...(t || l) });
      };
}
function hm(t) {
  if (t) throw t;
}
var Ic, dm;
function dw() {
  if (dm) return Ic;
  dm = 1;
  var t = Object.prototype.hasOwnProperty,
    l = Object.prototype.toString,
    a = Object.defineProperty,
    i = Object.getOwnPropertyDescriptor,
    o = function (m) {
      return typeof Array.isArray == "function"
        ? Array.isArray(m)
        : l.call(m) === "[object Array]";
    },
    c = function (m) {
      if (!m || l.call(m) !== "[object Object]") return !1;
      var y = t.call(m, "constructor"),
        g =
          m.constructor &&
          m.constructor.prototype &&
          t.call(m.constructor.prototype, "isPrototypeOf");
      if (m.constructor && !y && !g) return !1;
      var k;
      for (k in m);
      return typeof k > "u" || t.call(m, k);
    },
    s = function (m, y) {
      a && y.name === "__proto__"
        ? a(m, y.name, {
            enumerable: !0,
            configurable: !0,
            value: y.newValue,
            writable: !0,
          })
        : (m[y.name] = y.newValue);
    },
    h = function (m, y) {
      if (y === "__proto__")
        if (t.call(m, y)) {
          if (i) return i(m, y).value;
        } else return;
      return m[y];
    };
  return (
    (Ic = function p() {
      var m,
        y,
        g,
        k,
        v,
        A,
        C = arguments[0],
        U = 1,
        R = arguments.length,
        Y = !1;
      for (
        typeof C == "boolean" && ((Y = C), (C = arguments[1] || {}), (U = 2)),
          (C == null || (typeof C != "object" && typeof C != "function")) &&
            (C = {});
        U < R;
        ++U
      )
        if (((m = arguments[U]), m != null))
          for (y in m)
            ((g = h(C, y)),
              (k = h(m, y)),
              C !== k &&
                (Y && k && (c(k) || (v = o(k)))
                  ? (v
                      ? ((v = !1), (A = g && o(g) ? g : []))
                      : (A = g && c(g) ? g : {}),
                    s(C, { name: y, newValue: p(Y, A, k) }))
                  : typeof k < "u" && s(C, { name: y, newValue: k })));
      return C;
    }),
    Ic
  );
}
var pw = dw();
const Yc = gi(pw);
function Tf(t) {
  if (typeof t != "object" || t === null) return !1;
  const l = Object.getPrototypeOf(t);
  return (
    (l === null ||
      l === Object.prototype ||
      Object.getPrototypeOf(l) === null) &&
    !(Symbol.toStringTag in t) &&
    !(Symbol.iterator in t)
  );
}
function mw() {
  const t = [],
    l = { run: a, use: i };
  return l;
  function a(...o) {
    let c = -1;
    const s = o.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    h(null, ...o);
    function h(p, ...m) {
      const y = t[++c];
      let g = -1;
      if (p) {
        s(p);
        return;
      }
      for (; ++g < o.length; )
        (m[g] === null || m[g] === void 0) && (m[g] = o[g]);
      ((o = m), y ? gw(y, h)(...m) : s(null, ...m));
    }
  }
  function i(o) {
    if (typeof o != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + o);
    return (t.push(o), l);
  }
}
function gw(t, l) {
  let a;
  return i;
  function i(...s) {
    const h = t.length > s.length;
    let p;
    h && s.push(o);
    try {
      p = t.apply(this, s);
    } catch (m) {
      const y = m;
      if (h && a) throw y;
      return o(y);
    }
    h ||
      (p && p.then && typeof p.then == "function"
        ? p.then(c, o)
        : p instanceof Error
          ? o(p)
          : c(p));
  }
  function o(s, ...h) {
    a || ((a = !0), l(s, ...h));
  }
  function c(s) {
    o(null, s);
  }
}
const Cn = { basename: yw, dirname: bw, extname: xw, join: vw, sep: "/" };
function yw(t, l) {
  if (l !== void 0 && typeof l != "string")
    throw new TypeError('"ext" argument must be a string');
  ki(t);
  let a = 0,
    i = -1,
    o = t.length,
    c;
  if (l === void 0 || l.length === 0 || l.length > t.length) {
    for (; o--; )
      if (t.codePointAt(o) === 47) {
        if (c) {
          a = o + 1;
          break;
        }
      } else i < 0 && ((c = !0), (i = o + 1));
    return i < 0 ? "" : t.slice(a, i);
  }
  if (l === t) return "";
  let s = -1,
    h = l.length - 1;
  for (; o--; )
    if (t.codePointAt(o) === 47) {
      if (c) {
        a = o + 1;
        break;
      }
    } else
      (s < 0 && ((c = !0), (s = o + 1)),
        h > -1 &&
          (t.codePointAt(o) === l.codePointAt(h--)
            ? h < 0 && (i = o)
            : ((h = -1), (i = s))));
  return (a === i ? (i = s) : i < 0 && (i = t.length), t.slice(a, i));
}
function bw(t) {
  if ((ki(t), t.length === 0)) return ".";
  let l = -1,
    a = t.length,
    i;
  for (; --a; )
    if (t.codePointAt(a) === 47) {
      if (i) {
        l = a;
        break;
      }
    } else i || (i = !0);
  return l < 0
    ? t.codePointAt(0) === 47
      ? "/"
      : "."
    : l === 1 && t.codePointAt(0) === 47
      ? "//"
      : t.slice(0, l);
}
function xw(t) {
  ki(t);
  let l = t.length,
    a = -1,
    i = 0,
    o = -1,
    c = 0,
    s;
  for (; l--; ) {
    const h = t.codePointAt(l);
    if (h === 47) {
      if (s) {
        i = l + 1;
        break;
      }
      continue;
    }
    (a < 0 && ((s = !0), (a = l + 1)),
      h === 46 ? (o < 0 ? (o = l) : c !== 1 && (c = 1)) : o > -1 && (c = -1));
  }
  return o < 0 || a < 0 || c === 0 || (c === 1 && o === a - 1 && o === i + 1)
    ? ""
    : t.slice(o, a);
}
function vw(...t) {
  let l = -1,
    a;
  for (; ++l < t.length; )
    (ki(t[l]), t[l] && (a = a === void 0 ? t[l] : a + "/" + t[l]));
  return a === void 0 ? "." : kw(a);
}
function kw(t) {
  ki(t);
  const l = t.codePointAt(0) === 47;
  let a = Sw(t, !l);
  return (
    a.length === 0 && !l && (a = "."),
    a.length > 0 && t.codePointAt(t.length - 1) === 47 && (a += "/"),
    l ? "/" + a : a
  );
}
function Sw(t, l) {
  let a = "",
    i = 0,
    o = -1,
    c = 0,
    s = -1,
    h,
    p;
  for (; ++s <= t.length; ) {
    if (s < t.length) h = t.codePointAt(s);
    else {
      if (h === 47) break;
      h = 47;
    }
    if (h === 47) {
      if (!(o === s - 1 || c === 1))
        if (o !== s - 1 && c === 2) {
          if (
            a.length < 2 ||
            i !== 2 ||
            a.codePointAt(a.length - 1) !== 46 ||
            a.codePointAt(a.length - 2) !== 46
          ) {
            if (a.length > 2) {
              if (((p = a.lastIndexOf("/")), p !== a.length - 1)) {
                (p < 0
                  ? ((a = ""), (i = 0))
                  : ((a = a.slice(0, p)),
                    (i = a.length - 1 - a.lastIndexOf("/"))),
                  (o = s),
                  (c = 0));
                continue;
              }
            } else if (a.length > 0) {
              ((a = ""), (i = 0), (o = s), (c = 0));
              continue;
            }
          }
          l && ((a = a.length > 0 ? a + "/.." : ".."), (i = 2));
        } else
          (a.length > 0
            ? (a += "/" + t.slice(o + 1, s))
            : (a = t.slice(o + 1, s)),
            (i = s - o - 1));
      ((o = s), (c = 0));
    } else h === 46 && c > -1 ? c++ : (c = -1);
  }
  return a;
}
function ki(t) {
  if (typeof t != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(t));
}
const ww = { cwd: Ew };
function Ew() {
  return "/";
}
function Cf(t) {
  return !!(
    t !== null &&
    typeof t == "object" &&
    "href" in t &&
    t.href &&
    "protocol" in t &&
    t.protocol &&
    t.auth === void 0
  );
}
function Aw(t) {
  if (typeof t == "string") t = new URL(t);
  else if (!Cf(t)) {
    const l = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        t +
        "`"
    );
    throw ((l.code = "ERR_INVALID_ARG_TYPE"), l);
  }
  if (t.protocol !== "file:") {
    const l = new TypeError("The URL must be of scheme file");
    throw ((l.code = "ERR_INVALID_URL_SCHEME"), l);
  }
  return _w(t);
}
function _w(t) {
  if (t.hostname !== "") {
    const i = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw ((i.code = "ERR_INVALID_FILE_URL_HOST"), i);
  }
  const l = t.pathname;
  let a = -1;
  for (; ++a < l.length; )
    if (l.codePointAt(a) === 37 && l.codePointAt(a + 1) === 50) {
      const i = l.codePointAt(a + 2);
      if (i === 70 || i === 102) {
        const o = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw ((o.code = "ERR_INVALID_FILE_URL_PATH"), o);
      }
    }
  return decodeURIComponent(l);
}
const Gc = ["history", "path", "basename", "stem", "extname", "dirname"];
class iy {
  constructor(l) {
    let a;
    (l
      ? Cf(l)
        ? (a = { path: l })
        : typeof l == "string" || Tw(l)
          ? (a = { value: l })
          : (a = l)
      : (a = {}),
      (this.cwd = "cwd" in a ? "" : ww.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored);
    let i = -1;
    for (; ++i < Gc.length; ) {
      const c = Gc[i];
      c in a &&
        a[c] !== void 0 &&
        a[c] !== null &&
        (this[c] = c === "history" ? [...a[c]] : a[c]);
    }
    let o;
    for (o in a) Gc.includes(o) || (this[o] = a[o]);
  }
  get basename() {
    return typeof this.path == "string" ? Cn.basename(this.path) : void 0;
  }
  set basename(l) {
    (Qc(l, "basename"),
      Fc(l, "basename"),
      (this.path = Cn.join(this.dirname || "", l)));
  }
  get dirname() {
    return typeof this.path == "string" ? Cn.dirname(this.path) : void 0;
  }
  set dirname(l) {
    (pm(this.basename, "dirname"),
      (this.path = Cn.join(l || "", this.basename)));
  }
  get extname() {
    return typeof this.path == "string" ? Cn.extname(this.path) : void 0;
  }
  set extname(l) {
    if ((Fc(l, "extname"), pm(this.dirname, "extname"), l)) {
      if (l.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (l.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Cn.join(this.dirname, this.stem + (l || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(l) {
    (Cf(l) && (l = Aw(l)),
      Qc(l, "path"),
      this.path !== l && this.history.push(l));
  }
  get stem() {
    return typeof this.path == "string"
      ? Cn.basename(this.path, this.extname)
      : void 0;
  }
  set stem(l) {
    (Qc(l, "stem"),
      Fc(l, "stem"),
      (this.path = Cn.join(this.dirname || "", l + (this.extname || ""))));
  }
  fail(l, a, i) {
    const o = this.message(l, a, i);
    throw ((o.fatal = !0), o);
  }
  info(l, a, i) {
    const o = this.message(l, a, i);
    return ((o.fatal = void 0), o);
  }
  message(l, a, i) {
    const o = new Nt(l, a, i);
    return (
      this.path && ((o.name = this.path + ":" + o.name), (o.file = this.path)),
      (o.fatal = !1),
      this.messages.push(o),
      o
    );
  }
  toString(l) {
    return this.value === void 0
      ? ""
      : typeof this.value == "string"
        ? this.value
        : new TextDecoder(l || void 0).decode(this.value);
  }
}
function Fc(t, l) {
  if (t && t.includes(Cn.sep))
    throw new Error(
      "`" + l + "` cannot be a path: did not expect `" + Cn.sep + "`"
    );
}
function Qc(t, l) {
  if (!t) throw new Error("`" + l + "` cannot be empty");
}
function pm(t, l) {
  if (!t) throw new Error("Setting `" + l + "` requires `path` to be set too");
}
function Tw(t) {
  return !!(
    t &&
    typeof t == "object" &&
    "byteLength" in t &&
    "byteOffset" in t
  );
}
const Cw = function (t) {
    const i = this.constructor.prototype,
      o = i[t],
      c = function () {
        return o.apply(c, arguments);
      };
    return (Object.setPrototypeOf(c, i), c);
  },
  Rw = {}.hasOwnProperty;
class ih extends Cw {
  constructor() {
    (super("copy"),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = mw()));
  }
  copy() {
    const l = new ih();
    let a = -1;
    for (; ++a < this.attachers.length; ) {
      const i = this.attachers[a];
      l.use(...i);
    }
    return (l.data(Yc(!0, {}, this.namespace)), l);
  }
  data(l, a) {
    return typeof l == "string"
      ? arguments.length === 2
        ? (Pc("data", this.frozen), (this.namespace[l] = a), this)
        : (Rw.call(this.namespace, l) && this.namespace[l]) || void 0
      : l
        ? (Pc("data", this.frozen), (this.namespace = l), this)
        : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const l = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [a, ...i] = this.attachers[this.freezeIndex];
      if (i[0] === !1) continue;
      i[0] === !0 && (i[0] = void 0);
      const o = a.call(l, ...i);
      typeof o == "function" && this.transformers.use(o);
    }
    return (
      (this.frozen = !0),
      (this.freezeIndex = Number.POSITIVE_INFINITY),
      this
    );
  }
  parse(l) {
    this.freeze();
    const a = qu(l),
      i = this.parser || this.Parser;
    return (Xc("parse", i), i(String(a), a));
  }
  process(l, a) {
    const i = this;
    return (
      this.freeze(),
      Xc("process", this.parser || this.Parser),
      $c("process", this.compiler || this.Compiler),
      a ? o(void 0, a) : new Promise(o)
    );
    function o(c, s) {
      const h = qu(l),
        p = i.parse(h);
      i.run(p, h, function (y, g, k) {
        if (y || !g || !k) return m(y);
        const v = g,
          A = i.stringify(v, k);
        (Dw(A) ? (k.value = A) : (k.result = A), m(y, k));
      });
      function m(y, g) {
        y || !g ? s(y) : c ? c(g) : a(void 0, g);
      }
    }
  }
  processSync(l) {
    let a = !1,
      i;
    return (
      this.freeze(),
      Xc("processSync", this.parser || this.Parser),
      $c("processSync", this.compiler || this.Compiler),
      this.process(l, o),
      gm("processSync", "process", a),
      i
    );
    function o(c, s) {
      ((a = !0), hm(c), (i = s));
    }
  }
  run(l, a, i) {
    (mm(l), this.freeze());
    const o = this.transformers;
    return (
      !i && typeof a == "function" && ((i = a), (a = void 0)),
      i ? c(void 0, i) : new Promise(c)
    );
    function c(s, h) {
      const p = qu(a);
      o.run(l, p, m);
      function m(y, g, k) {
        const v = g || l;
        y ? h(y) : s ? s(v) : i(void 0, v, k);
      }
    }
  }
  runSync(l, a) {
    let i = !1,
      o;
    return (this.run(l, a, c), gm("runSync", "run", i), o);
    function c(s, h) {
      (hm(s), (o = h), (i = !0));
    }
  }
  stringify(l, a) {
    this.freeze();
    const i = qu(a),
      o = this.compiler || this.Compiler;
    return ($c("stringify", o), mm(l), o(l, i));
  }
  use(l, ...a) {
    const i = this.attachers,
      o = this.namespace;
    if ((Pc("use", this.frozen), l != null))
      if (typeof l == "function") p(l, a);
      else if (typeof l == "object") Array.isArray(l) ? h(l) : s(l);
      else throw new TypeError("Expected usable value, not `" + l + "`");
    return this;
    function c(m) {
      if (typeof m == "function") p(m, []);
      else if (typeof m == "object")
        if (Array.isArray(m)) {
          const [y, ...g] = m;
          p(y, g);
        } else s(m);
      else throw new TypeError("Expected usable value, not `" + m + "`");
    }
    function s(m) {
      if (!("plugins" in m) && !("settings" in m))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      (h(m.plugins),
        m.settings && (o.settings = Yc(!0, o.settings, m.settings)));
    }
    function h(m) {
      let y = -1;
      if (m != null)
        if (Array.isArray(m))
          for (; ++y < m.length; ) {
            const g = m[y];
            c(g);
          }
        else throw new TypeError("Expected a list of plugins, not `" + m + "`");
    }
    function p(m, y) {
      let g = -1,
        k = -1;
      for (; ++g < i.length; )
        if (i[g][0] === m) {
          k = g;
          break;
        }
      if (k === -1) i.push([m, ...y]);
      else if (y.length > 0) {
        let [v, ...A] = y;
        const C = i[k][1];
        (Tf(C) && Tf(v) && (v = Yc(!0, C, v)), (i[k] = [m, v, ...A]));
      }
    }
  }
}
const Mw = new ih().freeze();
function Xc(t, l) {
  if (typeof l != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function $c(t, l) {
  if (typeof l != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function Pc(t, l) {
  if (l)
    throw new Error(
      "Cannot call `" +
        t +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function mm(t) {
  if (!Tf(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function gm(t, l, a) {
  if (!a)
    throw new Error("`" + t + "` finished async. Use `" + l + "` instead");
}
function qu(t) {
  return zw(t) ? t : new iy(t);
}
function zw(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function Dw(t) {
  return typeof t == "string" || Ow(t);
}
function Ow(t) {
  return !!(
    t &&
    typeof t == "object" &&
    "byteLength" in t &&
    "byteOffset" in t
  );
}
const Nw = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  ym = [],
  bm = { allowDangerousHtml: !0 },
  Lw = /^(https?|ircs?|mailto|xmpp)$/i,
  Hw = [
    { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
    { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
    {
      from: "allowNode",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowElement",
    },
    {
      from: "allowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowedElements",
    },
    { from: "className", id: "remove-classname" },
    {
      from: "disallowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "disallowedElements",
    },
    { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
    { from: "includeElementIndex", id: "#remove-includeelementindex" },
    {
      from: "includeNodeIndex",
      id: "change-includenodeindex-to-includeelementindex",
    },
    { from: "linkTarget", id: "remove-linktarget" },
    {
      from: "plugins",
      id: "change-plugins-to-remarkplugins",
      to: "remarkPlugins",
    },
    { from: "rawSourcePos", id: "#remove-rawsourcepos" },
    {
      from: "renderers",
      id: "change-renderers-to-components",
      to: "components",
    },
    { from: "source", id: "change-source-to-children", to: "children" },
    { from: "sourcePos", id: "#remove-sourcepos" },
    { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
    { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" },
  ];
function jw(t) {
  const l = Uw(t),
    a = Bw(t);
  return Vw(l.runSync(l.parse(a), a), t);
}
function Uw(t) {
  const l = t.rehypePlugins || ym,
    a = t.remarkPlugins || ym,
    i = t.remarkRehypeOptions ? { ...t.remarkRehypeOptions, ...bm } : bm;
  return Mw().use(bS).use(a).use(hw, i).use(l);
}
function Bw(t) {
  const l = t.children || "",
    a = new iy();
  return (typeof l == "string" && (a.value = l), a);
}
function Vw(t, l) {
  const a = l.allowedElements,
    i = l.allowElement,
    o = l.components,
    c = l.disallowedElements,
    s = l.skipHtml,
    h = l.unwrapDisallowed,
    p = l.urlTransform || qw;
  for (const y of Hw)
    Object.hasOwn(l, y.from) &&
      ("" +
        y.from +
        (y.to ? "use `" + y.to + "` instead" : "remove it") +
        Nw +
        y.id,
      void 0);
  return (
    ah(t, m),
    t4(t, {
      Fragment: Z.Fragment,
      components: o,
      ignoreInvalidStyle: !0,
      jsx: Z.jsx,
      jsxs: Z.jsxs,
      passKeys: !0,
      passNode: !0,
    })
  );
  function m(y, g, k) {
    if (y.type === "raw" && k && typeof g == "number")
      return (
        s
          ? k.children.splice(g, 1)
          : (k.children[g] = { type: "text", value: y.value }),
        g
      );
    if (y.type === "element") {
      let v;
      for (v in Vc)
        if (Object.hasOwn(Vc, v) && Object.hasOwn(y.properties, v)) {
          const A = y.properties[v],
            C = Vc[v];
          (C === null || C.includes(y.tagName)) &&
            (y.properties[v] = p(String(A || ""), v, y));
        }
    }
    if (y.type === "element") {
      let v = a ? !a.includes(y.tagName) : c ? c.includes(y.tagName) : !1;
      if (
        (!v && i && typeof g == "number" && (v = !i(y, g, k)),
        v && k && typeof g == "number")
      )
        return (
          h && y.children
            ? k.children.splice(g, 1, ...y.children)
            : k.children.splice(g, 1),
          g
        );
    }
  }
}
function qw(t) {
  const l = t.indexOf(":"),
    a = t.indexOf("?"),
    i = t.indexOf("#"),
    o = t.indexOf("/");
  return l === -1 ||
    (o !== -1 && l > o) ||
    (a !== -1 && l > a) ||
    (i !== -1 && l > i) ||
    Lw.test(t.slice(0, l))
    ? t
    : "";
}
function xm(t, l) {
  const a = String(t);
  if (typeof l != "string") throw new TypeError("Expected character");
  let i = 0,
    o = a.indexOf(l);
  for (; o !== -1; ) (i++, (o = a.indexOf(l, o + l.length)));
  return i;
}
function Zw(t) {
  if (typeof t != "string") throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Iw(t, l, a) {
  const o = ao((a || {}).ignore || []),
    c = Yw(l);
  let s = -1;
  for (; ++s < c.length; ) ay(t, "text", h);
  function h(m, y) {
    let g = -1,
      k;
    for (; ++g < y.length; ) {
      const v = y[g],
        A = k ? k.children : void 0;
      if (o(v, A ? A.indexOf(v) : void 0, k)) return;
      k = v;
    }
    if (k) return p(m, y);
  }
  function p(m, y) {
    const g = y[y.length - 1],
      k = c[s][0],
      v = c[s][1];
    let A = 0;
    const U = g.children.indexOf(m);
    let R = !1,
      Y = [];
    k.lastIndex = 0;
    let V = k.exec(m.value);
    for (; V; ) {
      const ee = V.index,
        O = { index: V.index, input: V.input, stack: [...y, m] };
      let _ = v(...V, O);
      if (
        (typeof _ == "string" &&
          (_ = _.length > 0 ? { type: "text", value: _ } : void 0),
        _ === !1
          ? (k.lastIndex = ee + 1)
          : (A !== ee && Y.push({ type: "text", value: m.value.slice(A, ee) }),
            Array.isArray(_) ? Y.push(..._) : _ && Y.push(_),
            (A = ee + V[0].length),
            (R = !0)),
        !k.global)
      )
        break;
      V = k.exec(m.value);
    }
    return (
      R
        ? (A < m.value.length &&
            Y.push({ type: "text", value: m.value.slice(A) }),
          g.children.splice(U, 1, ...Y))
        : (Y = [m]),
      U + Y.length
    );
  }
}
function Yw(t) {
  const l = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const a = !t[0] || Array.isArray(t[0]) ? t : [t];
  let i = -1;
  for (; ++i < a.length; ) {
    const o = a[i];
    l.push([Gw(o[0]), Fw(o[1])]);
  }
  return l;
}
function Gw(t) {
  return typeof t == "string" ? new RegExp(Zw(t), "g") : t;
}
function Fw(t) {
  return typeof t == "function"
    ? t
    : function () {
        return t;
      };
}
const Kc = "phrasing",
  Jc = ["autolink", "link", "image", "label"];
function Qw() {
  return {
    transforms: [e3],
    enter: {
      literalAutolink: $w,
      literalAutolinkEmail: Wc,
      literalAutolinkHttp: Wc,
      literalAutolinkWww: Wc,
    },
    exit: {
      literalAutolink: Ww,
      literalAutolinkEmail: Jw,
      literalAutolinkHttp: Pw,
      literalAutolinkWww: Kw,
    },
  };
}
function Xw() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Kc,
        notInConstruct: Jc,
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Kc,
        notInConstruct: Jc,
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Kc,
        notInConstruct: Jc,
      },
    ],
  };
}
function $w(t) {
  this.enter({ type: "link", title: null, url: "", children: [] }, t);
}
function Wc(t) {
  this.config.enter.autolinkProtocol.call(this, t);
}
function Pw(t) {
  this.config.exit.autolinkProtocol.call(this, t);
}
function Kw(t) {
  this.config.exit.data.call(this, t);
  const l = this.stack[this.stack.length - 1];
  (l.type, (l.url = "http://" + this.sliceSerialize(t)));
}
function Jw(t) {
  this.config.exit.autolinkEmail.call(this, t);
}
function Ww(t) {
  this.exit(t);
}
function e3(t) {
  Iw(
    t,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, t3],
      [
        new RegExp(
          "(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)",
          "gu"
        ),
        n3,
      ],
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function t3(t, l, a, i, o) {
  let c = "";
  if (
    !uy(o) ||
    (/^w/i.test(l) && ((a = l + a), (l = ""), (c = "http://")), !l3(a))
  )
    return !1;
  const s = r3(a + i);
  if (!s[0]) return !1;
  const h = {
    type: "link",
    title: null,
    url: c + l + s[0],
    children: [{ type: "text", value: l + s[0] }],
  };
  return s[1] ? [h, { type: "text", value: s[1] }] : h;
}
function n3(t, l, a, i) {
  return !uy(i, !0) || /[-\d_]$/.test(a)
    ? !1
    : {
        type: "link",
        title: null,
        url: "mailto:" + l + "@" + a,
        children: [{ type: "text", value: l + "@" + a }],
      };
}
function l3(t) {
  const l = t.split(".");
  return !(
    l.length < 2 ||
    (l[l.length - 1] &&
      (/_/.test(l[l.length - 1]) || !/[a-zA-Z\d]/.test(l[l.length - 1]))) ||
    (l[l.length - 2] &&
      (/_/.test(l[l.length - 2]) || !/[a-zA-Z\d]/.test(l[l.length - 2])))
  );
}
function r3(t) {
  const l = /[!"&'),.:;<>?\]}]+$/.exec(t);
  if (!l) return [t, void 0];
  t = t.slice(0, l.index);
  let a = l[0],
    i = a.indexOf(")");
  const o = xm(t, "(");
  let c = xm(t, ")");
  for (; i !== -1 && o > c; )
    ((t += a.slice(0, i + 1)), (a = a.slice(i + 1)), (i = a.indexOf(")")), c++);
  return [t, a];
}
function uy(t, l) {
  const a = t.input.charCodeAt(t.index - 1);
  return (t.index === 0 || Wl(a) || no(a)) && (!l || a !== 47);
}
oy.peek = d3;
function a3() {
  this.buffer();
}
function i3(t) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, t);
}
function u3() {
  this.buffer();
}
function o3(t) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    t
  );
}
function s3(t) {
  const l = this.resume(),
    a = this.stack[this.stack.length - 1];
  (a.type,
    (a.identifier = vn(this.sliceSerialize(t)).toLowerCase()),
    (a.label = l));
}
function c3(t) {
  this.exit(t);
}
function f3(t) {
  const l = this.resume(),
    a = this.stack[this.stack.length - 1];
  (a.type,
    (a.identifier = vn(this.sliceSerialize(t)).toLowerCase()),
    (a.label = l));
}
function h3(t) {
  this.exit(t);
}
function d3() {
  return "[";
}
function oy(t, l, a, i) {
  const o = a.createTracker(i);
  let c = o.move("[^");
  const s = a.enter("footnoteReference"),
    h = a.enter("reference");
  return (
    (c += o.move(a.safe(a.associationId(t), { after: "]", before: c }))),
    h(),
    s(),
    (c += o.move("]")),
    c
  );
}
function p3() {
  return {
    enter: {
      gfmFootnoteCallString: a3,
      gfmFootnoteCall: i3,
      gfmFootnoteDefinitionLabelString: u3,
      gfmFootnoteDefinition: o3,
    },
    exit: {
      gfmFootnoteCallString: s3,
      gfmFootnoteCall: c3,
      gfmFootnoteDefinitionLabelString: f3,
      gfmFootnoteDefinition: h3,
    },
  };
}
function m3(t) {
  let l = !1;
  return (
    t && t.firstLineBlank && (l = !0),
    {
      handlers: { footnoteDefinition: a, footnoteReference: oy },
      unsafe: [
        { character: "[", inConstruct: ["label", "phrasing", "reference"] },
      ],
    }
  );
  function a(i, o, c, s) {
    const h = c.createTracker(s);
    let p = h.move("[^");
    const m = c.enter("footnoteDefinition"),
      y = c.enter("label");
    return (
      (p += h.move(c.safe(c.associationId(i), { before: p, after: "]" }))),
      y(),
      (p += h.move("]:")),
      i.children &&
        i.children.length > 0 &&
        (h.shift(4),
        (p += h.move(
          (l
            ? `
`
            : " ") + c.indentLines(c.containerFlow(i, h.current()), l ? sy : g3)
        ))),
      m(),
      p
    );
  }
}
function g3(t, l, a) {
  return l === 0 ? t : sy(t, l, a);
}
function sy(t, l, a) {
  return (a ? "" : "    ") + t;
}
const y3 = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe",
];
cy.peek = S3;
function b3() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: v3 },
    exit: { strikethrough: k3 },
  };
}
function x3() {
  return {
    unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: y3 }],
    handlers: { delete: cy },
  };
}
function v3(t) {
  this.enter({ type: "delete", children: [] }, t);
}
function k3(t) {
  this.exit(t);
}
function cy(t, l, a, i) {
  const o = a.createTracker(i),
    c = a.enter("strikethrough");
  let s = o.move("~~");
  return (
    (s += a.containerPhrasing(t, { ...o.current(), before: s, after: "~" })),
    (s += o.move("~~")),
    c(),
    s
  );
}
function S3() {
  return "~";
}
function w3(t) {
  return t.length;
}
function E3(t, l) {
  const a = l || {},
    i = (a.align || []).concat(),
    o = a.stringLength || w3,
    c = [],
    s = [],
    h = [],
    p = [];
  let m = 0,
    y = -1;
  for (; ++y < t.length; ) {
    const C = [],
      U = [];
    let R = -1;
    for (t[y].length > m && (m = t[y].length); ++R < t[y].length; ) {
      const Y = A3(t[y][R]);
      if (a.alignDelimiters !== !1) {
        const V = o(Y);
        ((U[R] = V), (p[R] === void 0 || V > p[R]) && (p[R] = V));
      }
      C.push(Y);
    }
    ((s[y] = C), (h[y] = U));
  }
  let g = -1;
  if (typeof i == "object" && "length" in i) for (; ++g < m; ) c[g] = vm(i[g]);
  else {
    const C = vm(i);
    for (; ++g < m; ) c[g] = C;
  }
  g = -1;
  const k = [],
    v = [];
  for (; ++g < m; ) {
    const C = c[g];
    let U = "",
      R = "";
    C === 99
      ? ((U = ":"), (R = ":"))
      : C === 108
        ? (U = ":")
        : C === 114 && (R = ":");
    let Y =
      a.alignDelimiters === !1 ? 1 : Math.max(1, p[g] - U.length - R.length);
    const V = U + "-".repeat(Y) + R;
    (a.alignDelimiters !== !1 &&
      ((Y = U.length + Y + R.length), Y > p[g] && (p[g] = Y), (v[g] = Y)),
      (k[g] = V));
  }
  (s.splice(1, 0, k), h.splice(1, 0, v), (y = -1));
  const A = [];
  for (; ++y < s.length; ) {
    const C = s[y],
      U = h[y];
    g = -1;
    const R = [];
    for (; ++g < m; ) {
      const Y = C[g] || "";
      let V = "",
        ee = "";
      if (a.alignDelimiters !== !1) {
        const O = p[g] - (U[g] || 0),
          _ = c[g];
        _ === 114
          ? (V = " ".repeat(O))
          : _ === 99
            ? O % 2
              ? ((V = " ".repeat(O / 2 + 0.5)), (ee = " ".repeat(O / 2 - 0.5)))
              : ((V = " ".repeat(O / 2)), (ee = V))
            : (ee = " ".repeat(O));
      }
      (a.delimiterStart !== !1 && !g && R.push("|"),
        a.padding !== !1 &&
          !(a.alignDelimiters === !1 && Y === "") &&
          (a.delimiterStart !== !1 || g) &&
          R.push(" "),
        a.alignDelimiters !== !1 && R.push(V),
        R.push(Y),
        a.alignDelimiters !== !1 && R.push(ee),
        a.padding !== !1 && R.push(" "),
        (a.delimiterEnd !== !1 || g !== m - 1) && R.push("|"));
    }
    A.push(a.delimiterEnd === !1 ? R.join("").replace(/ +$/, "") : R.join(""));
  }
  return A.join(`
`);
}
function A3(t) {
  return t == null ? "" : String(t);
}
function vm(t) {
  const l = typeof t == "string" ? t.codePointAt(0) : 0;
  return l === 67 || l === 99
    ? 99
    : l === 76 || l === 108
      ? 108
      : l === 82 || l === 114
        ? 114
        : 0;
}
function _3(t, l, a, i) {
  const o = a.enter("blockquote"),
    c = a.createTracker(i);
  (c.move("> "), c.shift(2));
  const s = a.indentLines(a.containerFlow(t, c.current()), T3);
  return (o(), s);
}
function T3(t, l, a) {
  return ">" + (a ? "" : " ") + t;
}
function C3(t, l) {
  return km(t, l.inConstruct, !0) && !km(t, l.notInConstruct, !1);
}
function km(t, l, a) {
  if ((typeof l == "string" && (l = [l]), !l || l.length === 0)) return a;
  let i = -1;
  for (; ++i < l.length; ) if (t.includes(l[i])) return !0;
  return !1;
}
function Sm(t, l, a, i) {
  let o = -1;
  for (; ++o < a.unsafe.length; )
    if (
      a.unsafe[o].character ===
        `
` &&
      C3(a.stack, a.unsafe[o])
    )
      return /[ \t]/.test(i.before) ? "" : " ";
  return `\\
`;
}
function R3(t, l) {
  const a = String(t);
  let i = a.indexOf(l),
    o = i,
    c = 0,
    s = 0;
  if (typeof l != "string") throw new TypeError("Expected substring");
  for (; i !== -1; )
    (i === o ? ++c > s && (s = c) : (c = 1),
      (o = i + l.length),
      (i = a.indexOf(l, o)));
  return s;
}
function M3(t, l) {
  return !!(
    l.options.fences === !1 &&
    t.value &&
    !t.lang &&
    /[^ \r\n]/.test(t.value) &&
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(t.value)
  );
}
function z3(t) {
  const l = t.options.fence || "`";
  if (l !== "`" && l !== "~")
    throw new Error(
      "Cannot serialize code with `" +
        l +
        "` for `options.fence`, expected `` ` `` or `~`"
    );
  return l;
}
function D3(t, l, a, i) {
  const o = z3(a),
    c = t.value || "",
    s = o === "`" ? "GraveAccent" : "Tilde";
  if (M3(t, a)) {
    const g = a.enter("codeIndented"),
      k = a.indentLines(c, O3);
    return (g(), k);
  }
  const h = a.createTracker(i),
    p = o.repeat(Math.max(R3(c, o) + 1, 3)),
    m = a.enter("codeFenced");
  let y = h.move(p);
  if (t.lang) {
    const g = a.enter(`codeFencedLang${s}`);
    ((y += h.move(
      a.safe(t.lang, { before: y, after: " ", encode: ["`"], ...h.current() })
    )),
      g());
  }
  if (t.lang && t.meta) {
    const g = a.enter(`codeFencedMeta${s}`);
    ((y += h.move(" ")),
      (y += h.move(
        a.safe(t.meta, {
          before: y,
          after: `
`,
          encode: ["`"],
          ...h.current(),
        })
      )),
      g());
  }
  return (
    (y += h.move(`
`)),
    c &&
      (y += h.move(
        c +
          `
`
      )),
    (y += h.move(p)),
    m(),
    y
  );
}
function O3(t, l, a) {
  return (a ? "" : "    ") + t;
}
function uh(t) {
  const l = t.options.quote || '"';
  if (l !== '"' && l !== "'")
    throw new Error(
      "Cannot serialize title with `" +
        l +
        "` for `options.quote`, expected `\"`, or `'`"
    );
  return l;
}
function N3(t, l, a, i) {
  const o = uh(a),
    c = o === '"' ? "Quote" : "Apostrophe",
    s = a.enter("definition");
  let h = a.enter("label");
  const p = a.createTracker(i);
  let m = p.move("[");
  return (
    (m += p.move(
      a.safe(a.associationId(t), { before: m, after: "]", ...p.current() })
    )),
    (m += p.move("]: ")),
    h(),
    !t.url || /[\0- \u007F]/.test(t.url)
      ? ((h = a.enter("destinationLiteral")),
        (m += p.move("<")),
        (m += p.move(a.safe(t.url, { before: m, after: ">", ...p.current() }))),
        (m += p.move(">")))
      : ((h = a.enter("destinationRaw")),
        (m += p.move(
          a.safe(t.url, {
            before: m,
            after: t.title
              ? " "
              : `
`,
            ...p.current(),
          })
        ))),
    h(),
    t.title &&
      ((h = a.enter(`title${c}`)),
      (m += p.move(" " + o)),
      (m += p.move(a.safe(t.title, { before: m, after: o, ...p.current() }))),
      (m += p.move(o)),
      h()),
    s(),
    m
  );
}
function L3(t) {
  const l = t.options.emphasis || "*";
  if (l !== "*" && l !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" +
        l +
        "` for `options.emphasis`, expected `*`, or `_`"
    );
  return l;
}
function mi(t) {
  return "&#x" + t.toString(16).toUpperCase() + ";";
}
function Ju(t, l, a) {
  const i = Xr(t),
    o = Xr(l);
  return i === void 0
    ? o === void 0
      ? a === "_"
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !1 }
      : o === 1
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !0 }
    : i === 1
      ? o === void 0
        ? { inside: !1, outside: !1 }
        : o === 1
          ? { inside: !0, outside: !0 }
          : { inside: !1, outside: !1 }
      : o === void 0
        ? { inside: !1, outside: !1 }
        : o === 1
          ? { inside: !0, outside: !1 }
          : { inside: !1, outside: !1 };
}
fy.peek = H3;
function fy(t, l, a, i) {
  const o = L3(a),
    c = a.enter("emphasis"),
    s = a.createTracker(i),
    h = s.move(o);
  let p = s.move(
    a.containerPhrasing(t, { after: o, before: h, ...s.current() })
  );
  const m = p.charCodeAt(0),
    y = Ju(i.before.charCodeAt(i.before.length - 1), m, o);
  y.inside && (p = mi(m) + p.slice(1));
  const g = p.charCodeAt(p.length - 1),
    k = Ju(i.after.charCodeAt(0), g, o);
  k.inside && (p = p.slice(0, -1) + mi(g));
  const v = s.move(o);
  return (
    c(),
    (a.attentionEncodeSurroundingInfo = {
      after: k.outside,
      before: y.outside,
    }),
    h + p + v
  );
}
function H3(t, l, a) {
  return a.options.emphasis || "*";
}
function j3(t, l) {
  let a = !1;
  return (
    ah(t, function (i) {
      if (("value" in i && /\r?\n|\r/.test(i.value)) || i.type === "break")
        return ((a = !0), Af);
    }),
    !!((!t.depth || t.depth < 3) && Jf(t) && (l.options.setext || a))
  );
}
function U3(t, l, a, i) {
  const o = Math.max(Math.min(6, t.depth || 1), 1),
    c = a.createTracker(i);
  if (j3(t, a)) {
    const y = a.enter("headingSetext"),
      g = a.enter("phrasing"),
      k = a.containerPhrasing(t, {
        ...c.current(),
        before: `
`,
        after: `
`,
      });
    return (
      g(),
      y(),
      k +
        `
` +
        (o === 1 ? "=" : "-").repeat(
          k.length -
            (Math.max(
              k.lastIndexOf("\r"),
              k.lastIndexOf(`
`)
            ) +
              1)
        )
    );
  }
  const s = "#".repeat(o),
    h = a.enter("headingAtx"),
    p = a.enter("phrasing");
  c.move(s + " ");
  let m = a.containerPhrasing(t, {
    before: "# ",
    after: `
`,
    ...c.current(),
  });
  return (
    /^[\t ]/.test(m) && (m = mi(m.charCodeAt(0)) + m.slice(1)),
    (m = m ? s + " " + m : s),
    a.options.closeAtx && (m += " " + s),
    p(),
    h(),
    m
  );
}
hy.peek = B3;
function hy(t) {
  return t.value || "";
}
function B3() {
  return "<";
}
dy.peek = V3;
function dy(t, l, a, i) {
  const o = uh(a),
    c = o === '"' ? "Quote" : "Apostrophe",
    s = a.enter("image");
  let h = a.enter("label");
  const p = a.createTracker(i);
  let m = p.move("![");
  return (
    (m += p.move(a.safe(t.alt, { before: m, after: "]", ...p.current() }))),
    (m += p.move("](")),
    h(),
    (!t.url && t.title) || /[\0- \u007F]/.test(t.url)
      ? ((h = a.enter("destinationLiteral")),
        (m += p.move("<")),
        (m += p.move(a.safe(t.url, { before: m, after: ">", ...p.current() }))),
        (m += p.move(">")))
      : ((h = a.enter("destinationRaw")),
        (m += p.move(
          a.safe(t.url, {
            before: m,
            after: t.title ? " " : ")",
            ...p.current(),
          })
        ))),
    h(),
    t.title &&
      ((h = a.enter(`title${c}`)),
      (m += p.move(" " + o)),
      (m += p.move(a.safe(t.title, { before: m, after: o, ...p.current() }))),
      (m += p.move(o)),
      h()),
    (m += p.move(")")),
    s(),
    m
  );
}
function V3() {
  return "!";
}
py.peek = q3;
function py(t, l, a, i) {
  const o = t.referenceType,
    c = a.enter("imageReference");
  let s = a.enter("label");
  const h = a.createTracker(i);
  let p = h.move("![");
  const m = a.safe(t.alt, { before: p, after: "]", ...h.current() });
  ((p += h.move(m + "][")), s());
  const y = a.stack;
  ((a.stack = []), (s = a.enter("reference")));
  const g = a.safe(a.associationId(t), {
    before: p,
    after: "]",
    ...h.current(),
  });
  return (
    s(),
    (a.stack = y),
    c(),
    o === "full" || !m || m !== g
      ? (p += h.move(g + "]"))
      : o === "shortcut"
        ? (p = p.slice(0, -1))
        : (p += h.move("]")),
    p
  );
}
function q3() {
  return "!";
}
my.peek = Z3;
function my(t, l, a) {
  let i = t.value || "",
    o = "`",
    c = -1;
  for (; new RegExp("(^|[^`])" + o + "([^`]|$)").test(i); ) o += "`";
  for (
    /[^ \r\n]/.test(i) &&
    ((/^[ \r\n]/.test(i) && /[ \r\n]$/.test(i)) || /^`|`$/.test(i)) &&
    (i = " " + i + " ");
    ++c < a.unsafe.length;

  ) {
    const s = a.unsafe[c],
      h = a.compilePattern(s);
    let p;
    if (s.atBreak)
      for (; (p = h.exec(i)); ) {
        let m = p.index;
        (i.charCodeAt(m) === 10 && i.charCodeAt(m - 1) === 13 && m--,
          (i = i.slice(0, m) + " " + i.slice(p.index + 1)));
      }
  }
  return o + i + o;
}
function Z3() {
  return "`";
}
function gy(t, l) {
  const a = Jf(t);
  return !!(
    !l.options.resourceLink &&
    t.url &&
    !t.title &&
    t.children &&
    t.children.length === 1 &&
    t.children[0].type === "text" &&
    (a === t.url || "mailto:" + a === t.url) &&
    /^[a-z][a-z+.-]+:/i.test(t.url) &&
    !/[\0- <>\u007F]/.test(t.url)
  );
}
yy.peek = I3;
function yy(t, l, a, i) {
  const o = uh(a),
    c = o === '"' ? "Quote" : "Apostrophe",
    s = a.createTracker(i);
  let h, p;
  if (gy(t, a)) {
    const y = a.stack;
    ((a.stack = []), (h = a.enter("autolink")));
    let g = s.move("<");
    return (
      (g += s.move(
        a.containerPhrasing(t, { before: g, after: ">", ...s.current() })
      )),
      (g += s.move(">")),
      h(),
      (a.stack = y),
      g
    );
  }
  ((h = a.enter("link")), (p = a.enter("label")));
  let m = s.move("[");
  return (
    (m += s.move(
      a.containerPhrasing(t, { before: m, after: "](", ...s.current() })
    )),
    (m += s.move("](")),
    p(),
    (!t.url && t.title) || /[\0- \u007F]/.test(t.url)
      ? ((p = a.enter("destinationLiteral")),
        (m += s.move("<")),
        (m += s.move(a.safe(t.url, { before: m, after: ">", ...s.current() }))),
        (m += s.move(">")))
      : ((p = a.enter("destinationRaw")),
        (m += s.move(
          a.safe(t.url, {
            before: m,
            after: t.title ? " " : ")",
            ...s.current(),
          })
        ))),
    p(),
    t.title &&
      ((p = a.enter(`title${c}`)),
      (m += s.move(" " + o)),
      (m += s.move(a.safe(t.title, { before: m, after: o, ...s.current() }))),
      (m += s.move(o)),
      p()),
    (m += s.move(")")),
    h(),
    m
  );
}
function I3(t, l, a) {
  return gy(t, a) ? "<" : "[";
}
by.peek = Y3;
function by(t, l, a, i) {
  const o = t.referenceType,
    c = a.enter("linkReference");
  let s = a.enter("label");
  const h = a.createTracker(i);
  let p = h.move("[");
  const m = a.containerPhrasing(t, { before: p, after: "]", ...h.current() });
  ((p += h.move(m + "][")), s());
  const y = a.stack;
  ((a.stack = []), (s = a.enter("reference")));
  const g = a.safe(a.associationId(t), {
    before: p,
    after: "]",
    ...h.current(),
  });
  return (
    s(),
    (a.stack = y),
    c(),
    o === "full" || !m || m !== g
      ? (p += h.move(g + "]"))
      : o === "shortcut"
        ? (p = p.slice(0, -1))
        : (p += h.move("]")),
    p
  );
}
function Y3() {
  return "[";
}
function oh(t) {
  const l = t.options.bullet || "*";
  if (l !== "*" && l !== "+" && l !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        l +
        "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return l;
}
function G3(t) {
  const l = oh(t),
    a = t.options.bulletOther;
  if (!a) return l === "*" ? "-" : "*";
  if (a !== "*" && a !== "+" && a !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        a +
        "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (a === l)
    throw new Error(
      "Expected `bullet` (`" +
        l +
        "`) and `bulletOther` (`" +
        a +
        "`) to be different"
    );
  return a;
}
function F3(t) {
  const l = t.options.bulletOrdered || ".";
  if (l !== "." && l !== ")")
    throw new Error(
      "Cannot serialize items with `" +
        l +
        "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return l;
}
function xy(t) {
  const l = t.options.rule || "*";
  if (l !== "*" && l !== "-" && l !== "_")
    throw new Error(
      "Cannot serialize rules with `" +
        l +
        "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return l;
}
function Q3(t, l, a, i) {
  const o = a.enter("list"),
    c = a.bulletCurrent;
  let s = t.ordered ? F3(a) : oh(a);
  const h = t.ordered ? (s === "." ? ")" : ".") : G3(a);
  let p = l && a.bulletLastUsed ? s === a.bulletLastUsed : !1;
  if (!t.ordered) {
    const y = t.children ? t.children[0] : void 0;
    if (
      ((s === "*" || s === "-") &&
        y &&
        (!y.children || !y.children[0]) &&
        a.stack[a.stack.length - 1] === "list" &&
        a.stack[a.stack.length - 2] === "listItem" &&
        a.stack[a.stack.length - 3] === "list" &&
        a.stack[a.stack.length - 4] === "listItem" &&
        a.indexStack[a.indexStack.length - 1] === 0 &&
        a.indexStack[a.indexStack.length - 2] === 0 &&
        a.indexStack[a.indexStack.length - 3] === 0 &&
        (p = !0),
      xy(a) === s && y)
    ) {
      let g = -1;
      for (; ++g < t.children.length; ) {
        const k = t.children[g];
        if (
          k &&
          k.type === "listItem" &&
          k.children &&
          k.children[0] &&
          k.children[0].type === "thematicBreak"
        ) {
          p = !0;
          break;
        }
      }
    }
  }
  (p && (s = h), (a.bulletCurrent = s));
  const m = a.containerFlow(t, i);
  return ((a.bulletLastUsed = s), (a.bulletCurrent = c), o(), m);
}
function X3(t) {
  const l = t.options.listItemIndent || "one";
  if (l !== "tab" && l !== "one" && l !== "mixed")
    throw new Error(
      "Cannot serialize items with `" +
        l +
        "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return l;
}
function $3(t, l, a, i) {
  const o = X3(a);
  let c = a.bulletCurrent || oh(a);
  l &&
    l.type === "list" &&
    l.ordered &&
    (c =
      (typeof l.start == "number" && l.start > -1 ? l.start : 1) +
      (a.options.incrementListMarker === !1 ? 0 : l.children.indexOf(t)) +
      c);
  let s = c.length + 1;
  (o === "tab" ||
    (o === "mixed" && ((l && l.type === "list" && l.spread) || t.spread))) &&
    (s = Math.ceil(s / 4) * 4);
  const h = a.createTracker(i);
  (h.move(c + " ".repeat(s - c.length)), h.shift(s));
  const p = a.enter("listItem"),
    m = a.indentLines(a.containerFlow(t, h.current()), y);
  return (p(), m);
  function y(g, k, v) {
    return k
      ? (v ? "" : " ".repeat(s)) + g
      : (v ? c : c + " ".repeat(s - c.length)) + g;
  }
}
function P3(t, l, a, i) {
  const o = a.enter("paragraph"),
    c = a.enter("phrasing"),
    s = a.containerPhrasing(t, i);
  return (c(), o(), s);
}
const K3 = ao([
  "break",
  "delete",
  "emphasis",
  "footnote",
  "footnoteReference",
  "image",
  "imageReference",
  "inlineCode",
  "inlineMath",
  "link",
  "linkReference",
  "mdxJsxTextElement",
  "mdxTextExpression",
  "strong",
  "text",
  "textDirective",
]);
function J3(t, l, a, i) {
  return (
    t.children.some(function (s) {
      return K3(s);
    })
      ? a.containerPhrasing
      : a.containerFlow
  ).call(a, t, i);
}
function W3(t) {
  const l = t.options.strong || "*";
  if (l !== "*" && l !== "_")
    throw new Error(
      "Cannot serialize strong with `" +
        l +
        "` for `options.strong`, expected `*`, or `_`"
    );
  return l;
}
vy.peek = eE;
function vy(t, l, a, i) {
  const o = W3(a),
    c = a.enter("strong"),
    s = a.createTracker(i),
    h = s.move(o + o);
  let p = s.move(
    a.containerPhrasing(t, { after: o, before: h, ...s.current() })
  );
  const m = p.charCodeAt(0),
    y = Ju(i.before.charCodeAt(i.before.length - 1), m, o);
  y.inside && (p = mi(m) + p.slice(1));
  const g = p.charCodeAt(p.length - 1),
    k = Ju(i.after.charCodeAt(0), g, o);
  k.inside && (p = p.slice(0, -1) + mi(g));
  const v = s.move(o + o);
  return (
    c(),
    (a.attentionEncodeSurroundingInfo = {
      after: k.outside,
      before: y.outside,
    }),
    h + p + v
  );
}
function eE(t, l, a) {
  return a.options.strong || "*";
}
function tE(t, l, a, i) {
  return a.safe(t.value, i);
}
function nE(t) {
  const l = t.options.ruleRepetition || 3;
  if (l < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" +
        l +
        "` for `options.ruleRepetition`, expected `3` or more"
    );
  return l;
}
function lE(t, l, a) {
  const i = (xy(a) + (a.options.ruleSpaces ? " " : "")).repeat(nE(a));
  return a.options.ruleSpaces ? i.slice(0, -1) : i;
}
const ky = {
  blockquote: _3,
  break: Sm,
  code: D3,
  definition: N3,
  emphasis: fy,
  hardBreak: Sm,
  heading: U3,
  html: hy,
  image: dy,
  imageReference: py,
  inlineCode: my,
  link: yy,
  linkReference: by,
  list: Q3,
  listItem: $3,
  paragraph: P3,
  root: J3,
  strong: vy,
  text: tE,
  thematicBreak: lE,
};
function rE() {
  return {
    enter: { table: aE, tableData: wm, tableHeader: wm, tableRow: uE },
    exit: {
      codeText: oE,
      table: iE,
      tableData: ef,
      tableHeader: ef,
      tableRow: ef,
    },
  };
}
function aE(t) {
  const l = t._align;
  (this.enter(
    {
      type: "table",
      align: l.map(function (a) {
        return a === "none" ? null : a;
      }),
      children: [],
    },
    t
  ),
    (this.data.inTable = !0));
}
function iE(t) {
  (this.exit(t), (this.data.inTable = void 0));
}
function uE(t) {
  this.enter({ type: "tableRow", children: [] }, t);
}
function ef(t) {
  this.exit(t);
}
function wm(t) {
  this.enter({ type: "tableCell", children: [] }, t);
}
function oE(t) {
  let l = this.resume();
  this.data.inTable && (l = l.replace(/\\([\\|])/g, sE));
  const a = this.stack[this.stack.length - 1];
  (a.type, (a.value = l), this.exit(t));
}
function sE(t, l) {
  return l === "|" ? l : t;
}
function cE(t) {
  const l = t || {},
    a = l.tableCellPadding,
    i = l.tablePipeAlign,
    o = l.stringLength,
    c = a ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      {
        character: `
`,
        inConstruct: "tableCell",
      },
      { atBreak: !0, character: "|", after: "[	 :-]" },
      { character: "|", inConstruct: "tableCell" },
      { atBreak: !0, character: ":", after: "-" },
      { atBreak: !0, character: "-", after: "[:|-]" },
    ],
    handlers: { inlineCode: k, table: s, tableCell: p, tableRow: h },
  };
  function s(v, A, C, U) {
    return m(y(v, C, U), v.align);
  }
  function h(v, A, C, U) {
    const R = g(v, C, U),
      Y = m([R]);
    return Y.slice(
      0,
      Y.indexOf(`
`)
    );
  }
  function p(v, A, C, U) {
    const R = C.enter("tableCell"),
      Y = C.enter("phrasing"),
      V = C.containerPhrasing(v, { ...U, before: c, after: c });
    return (Y(), R(), V);
  }
  function m(v, A) {
    return E3(v, { align: A, alignDelimiters: i, padding: a, stringLength: o });
  }
  function y(v, A, C) {
    const U = v.children;
    let R = -1;
    const Y = [],
      V = A.enter("table");
    for (; ++R < U.length; ) Y[R] = g(U[R], A, C);
    return (V(), Y);
  }
  function g(v, A, C) {
    const U = v.children;
    let R = -1;
    const Y = [],
      V = A.enter("tableRow");
    for (; ++R < U.length; ) Y[R] = p(U[R], v, A, C);
    return (V(), Y);
  }
  function k(v, A, C) {
    let U = ky.inlineCode(v, A, C);
    return (C.stack.includes("tableCell") && (U = U.replace(/\|/g, "\\$&")), U);
  }
}
function fE() {
  return {
    exit: {
      taskListCheckValueChecked: Em,
      taskListCheckValueUnchecked: Em,
      paragraph: dE,
    },
  };
}
function hE() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: pE },
  };
}
function Em(t) {
  const l = this.stack[this.stack.length - 2];
  (l.type, (l.checked = t.type === "taskListCheckValueChecked"));
}
function dE(t) {
  const l = this.stack[this.stack.length - 2];
  if (l && l.type === "listItem" && typeof l.checked == "boolean") {
    const a = this.stack[this.stack.length - 1];
    a.type;
    const i = a.children[0];
    if (i && i.type === "text") {
      const o = l.children;
      let c = -1,
        s;
      for (; ++c < o.length; ) {
        const h = o[c];
        if (h.type === "paragraph") {
          s = h;
          break;
        }
      }
      s === a &&
        ((i.value = i.value.slice(1)),
        i.value.length === 0
          ? a.children.shift()
          : a.position &&
            i.position &&
            typeof i.position.start.offset == "number" &&
            (i.position.start.column++,
            i.position.start.offset++,
            (a.position.start = Object.assign({}, i.position.start))));
    }
  }
  this.exit(t);
}
function pE(t, l, a, i) {
  const o = t.children[0],
    c = typeof t.checked == "boolean" && o && o.type === "paragraph",
    s = "[" + (t.checked ? "x" : " ") + "] ",
    h = a.createTracker(i);
  c && h.move(s);
  let p = ky.listItem(t, l, a, { ...i, ...h.current() });
  return (c && (p = p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, m)), p);
  function m(y) {
    return y + s;
  }
}
function mE() {
  return [Qw(), p3(), b3(), rE(), fE()];
}
function gE(t) {
  return { extensions: [Xw(), m3(t), x3(), cE(t), hE()] };
}
const yE = { tokenize: wE, partial: !0 },
  Sy = { tokenize: EE, partial: !0 },
  wy = { tokenize: AE, partial: !0 },
  Ey = { tokenize: _E, partial: !0 },
  bE = { tokenize: TE, partial: !0 },
  Ay = { name: "wwwAutolink", tokenize: kE, previous: Ty },
  _y = { name: "protocolAutolink", tokenize: SE, previous: Cy },
  Wn = { name: "emailAutolink", tokenize: vE, previous: Ry },
  zn = {};
function xE() {
  return { text: zn };
}
let Pl = 48;
for (; Pl < 123; )
  ((zn[Pl] = Wn), Pl++, Pl === 58 ? (Pl = 65) : Pl === 91 && (Pl = 97));
zn[43] = Wn;
zn[45] = Wn;
zn[46] = Wn;
zn[95] = Wn;
zn[72] = [Wn, _y];
zn[104] = [Wn, _y];
zn[87] = [Wn, Ay];
zn[119] = [Wn, Ay];
function vE(t, l, a) {
  const i = this;
  let o, c;
  return s;
  function s(g) {
    return !Rf(g) || !Ry.call(i, i.previous) || sh(i.events)
      ? a(g)
      : (t.enter("literalAutolink"), t.enter("literalAutolinkEmail"), h(g));
  }
  function h(g) {
    return Rf(g) ? (t.consume(g), h) : g === 64 ? (t.consume(g), p) : a(g);
  }
  function p(g) {
    return g === 46
      ? t.check(bE, y, m)(g)
      : g === 45 || g === 95 || Ot(g)
        ? ((c = !0), t.consume(g), p)
        : y(g);
  }
  function m(g) {
    return (t.consume(g), (o = !0), p);
  }
  function y(g) {
    return c && o && jt(i.previous)
      ? (t.exit("literalAutolinkEmail"), t.exit("literalAutolink"), l(g))
      : a(g);
  }
}
function kE(t, l, a) {
  const i = this;
  return o;
  function o(s) {
    return (s !== 87 && s !== 119) || !Ty.call(i, i.previous) || sh(i.events)
      ? a(s)
      : (t.enter("literalAutolink"),
        t.enter("literalAutolinkWww"),
        t.check(yE, t.attempt(Sy, t.attempt(wy, c), a), a)(s));
  }
  function c(s) {
    return (t.exit("literalAutolinkWww"), t.exit("literalAutolink"), l(s));
  }
}
function SE(t, l, a) {
  const i = this;
  let o = "",
    c = !1;
  return s;
  function s(g) {
    return (g === 72 || g === 104) && Cy.call(i, i.previous) && !sh(i.events)
      ? (t.enter("literalAutolink"),
        t.enter("literalAutolinkHttp"),
        (o += String.fromCodePoint(g)),
        t.consume(g),
        h)
      : a(g);
  }
  function h(g) {
    if (jt(g) && o.length < 5)
      return ((o += String.fromCodePoint(g)), t.consume(g), h);
    if (g === 58) {
      const k = o.toLowerCase();
      if (k === "http" || k === "https") return (t.consume(g), p);
    }
    return a(g);
  }
  function p(g) {
    return g === 47 ? (t.consume(g), c ? m : ((c = !0), p)) : a(g);
  }
  function m(g) {
    return g === null || $u(g) || et(g) || Wl(g) || no(g)
      ? a(g)
      : t.attempt(Sy, t.attempt(wy, y), a)(g);
  }
  function y(g) {
    return (t.exit("literalAutolinkHttp"), t.exit("literalAutolink"), l(g));
  }
}
function wE(t, l, a) {
  let i = 0;
  return o;
  function o(s) {
    return (s === 87 || s === 119) && i < 3
      ? (i++, t.consume(s), o)
      : s === 46 && i === 3
        ? (t.consume(s), c)
        : a(s);
  }
  function c(s) {
    return s === null ? a(s) : l(s);
  }
}
function EE(t, l, a) {
  let i, o, c;
  return s;
  function s(m) {
    return m === 46 || m === 95
      ? t.check(Ey, p, h)(m)
      : m === null || et(m) || Wl(m) || (m !== 45 && no(m))
        ? p(m)
        : ((c = !0), t.consume(m), s);
  }
  function h(m) {
    return (m === 95 ? (i = !0) : ((o = i), (i = void 0)), t.consume(m), s);
  }
  function p(m) {
    return o || i || !c ? a(m) : l(m);
  }
}
function AE(t, l) {
  let a = 0,
    i = 0;
  return o;
  function o(s) {
    return s === 40
      ? (a++, t.consume(s), o)
      : s === 41 && i < a
        ? c(s)
        : s === 33 ||
            s === 34 ||
            s === 38 ||
            s === 39 ||
            s === 41 ||
            s === 42 ||
            s === 44 ||
            s === 46 ||
            s === 58 ||
            s === 59 ||
            s === 60 ||
            s === 63 ||
            s === 93 ||
            s === 95 ||
            s === 126
          ? t.check(Ey, l, c)(s)
          : s === null || et(s) || Wl(s)
            ? l(s)
            : (t.consume(s), o);
  }
  function c(s) {
    return (s === 41 && i++, t.consume(s), o);
  }
}
function _E(t, l, a) {
  return i;
  function i(h) {
    return h === 33 ||
      h === 34 ||
      h === 39 ||
      h === 41 ||
      h === 42 ||
      h === 44 ||
      h === 46 ||
      h === 58 ||
      h === 59 ||
      h === 63 ||
      h === 95 ||
      h === 126
      ? (t.consume(h), i)
      : h === 38
        ? (t.consume(h), c)
        : h === 93
          ? (t.consume(h), o)
          : h === 60 || h === null || et(h) || Wl(h)
            ? l(h)
            : a(h);
  }
  function o(h) {
    return h === null || h === 40 || h === 91 || et(h) || Wl(h) ? l(h) : i(h);
  }
  function c(h) {
    return jt(h) ? s(h) : a(h);
  }
  function s(h) {
    return h === 59 ? (t.consume(h), i) : jt(h) ? (t.consume(h), s) : a(h);
  }
}
function TE(t, l, a) {
  return i;
  function i(c) {
    return (t.consume(c), o);
  }
  function o(c) {
    return Ot(c) ? a(c) : l(c);
  }
}
function Ty(t) {
  return (
    t === null ||
    t === 40 ||
    t === 42 ||
    t === 95 ||
    t === 91 ||
    t === 93 ||
    t === 126 ||
    et(t)
  );
}
function Cy(t) {
  return !jt(t);
}
function Ry(t) {
  return !(t === 47 || Rf(t));
}
function Rf(t) {
  return t === 43 || t === 45 || t === 46 || t === 95 || Ot(t);
}
function sh(t) {
  let l = t.length,
    a = !1;
  for (; l--; ) {
    const i = t[l][1];
    if ((i.type === "labelLink" || i.type === "labelImage") && !i._balanced) {
      a = !0;
      break;
    }
    if (i._gfmAutolinkLiteralWalkedInto) {
      a = !1;
      break;
    }
  }
  return (
    t.length > 0 &&
      !a &&
      (t[t.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0),
    a
  );
}
const CE = { tokenize: HE, partial: !0 };
function RE() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: OE,
        continuation: { tokenize: NE },
        exit: LE,
      },
    },
    text: {
      91: { name: "gfmFootnoteCall", tokenize: DE },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: ME,
        resolveTo: zE,
      },
    },
  };
}
function ME(t, l, a) {
  const i = this;
  let o = i.events.length;
  const c = i.parser.gfmFootnotes || (i.parser.gfmFootnotes = []);
  let s;
  for (; o--; ) {
    const p = i.events[o][1];
    if (p.type === "labelImage") {
      s = p;
      break;
    }
    if (
      p.type === "gfmFootnoteCall" ||
      p.type === "labelLink" ||
      p.type === "label" ||
      p.type === "image" ||
      p.type === "link"
    )
      break;
  }
  return h;
  function h(p) {
    if (!s || !s._balanced) return a(p);
    const m = vn(i.sliceSerialize({ start: s.end, end: i.now() }));
    return m.codePointAt(0) !== 94 || !c.includes(m.slice(1))
      ? a(p)
      : (t.enter("gfmFootnoteCallLabelMarker"),
        t.consume(p),
        t.exit("gfmFootnoteCallLabelMarker"),
        l(p));
  }
}
function zE(t, l) {
  let a = t.length;
  for (; a--; )
    if (t[a][1].type === "labelImage" && t[a][0] === "enter") {
      t[a][1];
      break;
    }
  ((t[a + 1][1].type = "data"),
    (t[a + 3][1].type = "gfmFootnoteCallLabelMarker"));
  const i = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, t[a + 3][1].start),
      end: Object.assign({}, t[t.length - 1][1].end),
    },
    o = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, t[a + 3][1].end),
      end: Object.assign({}, t[a + 3][1].end),
    };
  (o.end.column++, o.end.offset++, o.end._bufferIndex++);
  const c = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, o.end),
      end: Object.assign({}, t[t.length - 1][1].start),
    },
    s = {
      type: "chunkString",
      contentType: "string",
      start: Object.assign({}, c.start),
      end: Object.assign({}, c.end),
    },
    h = [
      t[a + 1],
      t[a + 2],
      ["enter", i, l],
      t[a + 3],
      t[a + 4],
      ["enter", o, l],
      ["exit", o, l],
      ["enter", c, l],
      ["enter", s, l],
      ["exit", s, l],
      ["exit", c, l],
      t[t.length - 2],
      t[t.length - 1],
      ["exit", i, l],
    ];
  return (t.splice(a, t.length - a + 1, ...h), t);
}
function DE(t, l, a) {
  const i = this,
    o = i.parser.gfmFootnotes || (i.parser.gfmFootnotes = []);
  let c = 0,
    s;
  return h;
  function h(g) {
    return (
      t.enter("gfmFootnoteCall"),
      t.enter("gfmFootnoteCallLabelMarker"),
      t.consume(g),
      t.exit("gfmFootnoteCallLabelMarker"),
      p
    );
  }
  function p(g) {
    return g !== 94
      ? a(g)
      : (t.enter("gfmFootnoteCallMarker"),
        t.consume(g),
        t.exit("gfmFootnoteCallMarker"),
        t.enter("gfmFootnoteCallString"),
        (t.enter("chunkString").contentType = "string"),
        m);
  }
  function m(g) {
    if (c > 999 || (g === 93 && !s) || g === null || g === 91 || et(g))
      return a(g);
    if (g === 93) {
      t.exit("chunkString");
      const k = t.exit("gfmFootnoteCallString");
      return o.includes(vn(i.sliceSerialize(k)))
        ? (t.enter("gfmFootnoteCallLabelMarker"),
          t.consume(g),
          t.exit("gfmFootnoteCallLabelMarker"),
          t.exit("gfmFootnoteCall"),
          l)
        : a(g);
    }
    return (et(g) || (s = !0), c++, t.consume(g), g === 92 ? y : m);
  }
  function y(g) {
    return g === 91 || g === 92 || g === 93 ? (t.consume(g), c++, m) : m(g);
  }
}
function OE(t, l, a) {
  const i = this,
    o = i.parser.gfmFootnotes || (i.parser.gfmFootnotes = []);
  let c,
    s = 0,
    h;
  return p;
  function p(A) {
    return (
      (t.enter("gfmFootnoteDefinition")._container = !0),
      t.enter("gfmFootnoteDefinitionLabel"),
      t.enter("gfmFootnoteDefinitionLabelMarker"),
      t.consume(A),
      t.exit("gfmFootnoteDefinitionLabelMarker"),
      m
    );
  }
  function m(A) {
    return A === 94
      ? (t.enter("gfmFootnoteDefinitionMarker"),
        t.consume(A),
        t.exit("gfmFootnoteDefinitionMarker"),
        t.enter("gfmFootnoteDefinitionLabelString"),
        (t.enter("chunkString").contentType = "string"),
        y)
      : a(A);
  }
  function y(A) {
    if (s > 999 || (A === 93 && !h) || A === null || A === 91 || et(A))
      return a(A);
    if (A === 93) {
      t.exit("chunkString");
      const C = t.exit("gfmFootnoteDefinitionLabelString");
      return (
        (c = vn(i.sliceSerialize(C))),
        t.enter("gfmFootnoteDefinitionLabelMarker"),
        t.consume(A),
        t.exit("gfmFootnoteDefinitionLabelMarker"),
        t.exit("gfmFootnoteDefinitionLabel"),
        k
      );
    }
    return (et(A) || (h = !0), s++, t.consume(A), A === 92 ? g : y);
  }
  function g(A) {
    return A === 91 || A === 92 || A === 93 ? (t.consume(A), s++, y) : y(A);
  }
  function k(A) {
    return A === 58
      ? (t.enter("definitionMarker"),
        t.consume(A),
        t.exit("definitionMarker"),
        o.includes(c) || o.push(c),
        Ue(t, v, "gfmFootnoteDefinitionWhitespace"))
      : a(A);
  }
  function v(A) {
    return l(A);
  }
}
function NE(t, l, a) {
  return t.check(vi, l, t.attempt(CE, l, a));
}
function LE(t) {
  t.exit("gfmFootnoteDefinition");
}
function HE(t, l, a) {
  const i = this;
  return Ue(t, o, "gfmFootnoteDefinitionIndent", 5);
  function o(c) {
    const s = i.events[i.events.length - 1];
    return s &&
      s[1].type === "gfmFootnoteDefinitionIndent" &&
      s[2].sliceSerialize(s[1], !0).length === 4
      ? l(c)
      : a(c);
  }
}
function jE(t) {
  let a = (t || {}).singleTilde;
  const i = { name: "strikethrough", tokenize: c, resolveAll: o };
  return (
    a == null && (a = !0),
    {
      text: { 126: i },
      insideSpan: { null: [i] },
      attentionMarkers: { null: [126] },
    }
  );
  function o(s, h) {
    let p = -1;
    for (; ++p < s.length; )
      if (
        s[p][0] === "enter" &&
        s[p][1].type === "strikethroughSequenceTemporary" &&
        s[p][1]._close
      ) {
        let m = p;
        for (; m--; )
          if (
            s[m][0] === "exit" &&
            s[m][1].type === "strikethroughSequenceTemporary" &&
            s[m][1]._open &&
            s[p][1].end.offset - s[p][1].start.offset ===
              s[m][1].end.offset - s[m][1].start.offset
          ) {
            ((s[p][1].type = "strikethroughSequence"),
              (s[m][1].type = "strikethroughSequence"));
            const y = {
                type: "strikethrough",
                start: Object.assign({}, s[m][1].start),
                end: Object.assign({}, s[p][1].end),
              },
              g = {
                type: "strikethroughText",
                start: Object.assign({}, s[m][1].end),
                end: Object.assign({}, s[p][1].start),
              },
              k = [
                ["enter", y, h],
                ["enter", s[m][1], h],
                ["exit", s[m][1], h],
                ["enter", g, h],
              ],
              v = h.parser.constructs.insideSpan.null;
            (v && nn(k, k.length, 0, lo(v, s.slice(m + 1, p), h)),
              nn(k, k.length, 0, [
                ["exit", g, h],
                ["enter", s[p][1], h],
                ["exit", s[p][1], h],
                ["exit", y, h],
              ]),
              nn(s, m - 1, p - m + 3, k),
              (p = m + k.length - 2));
            break;
          }
      }
    for (p = -1; ++p < s.length; )
      s[p][1].type === "strikethroughSequenceTemporary" &&
        (s[p][1].type = "data");
    return s;
  }
  function c(s, h, p) {
    const m = this.previous,
      y = this.events;
    let g = 0;
    return k;
    function k(A) {
      return m === 126 && y[y.length - 1][1].type !== "characterEscape"
        ? p(A)
        : (s.enter("strikethroughSequenceTemporary"), v(A));
    }
    function v(A) {
      const C = Xr(m);
      if (A === 126) return g > 1 ? p(A) : (s.consume(A), g++, v);
      if (g < 2 && !a) return p(A);
      const U = s.exit("strikethroughSequenceTemporary"),
        R = Xr(A);
      return (
        (U._open = !R || (R === 2 && !!C)),
        (U._close = !C || (C === 2 && !!R)),
        h(A)
      );
    }
  }
}
class UE {
  constructor() {
    this.map = [];
  }
  add(l, a, i) {
    BE(this, l, a, i);
  }
  consume(l) {
    if (
      (this.map.sort(function (c, s) {
        return c[0] - s[0];
      }),
      this.map.length === 0)
    )
      return;
    let a = this.map.length;
    const i = [];
    for (; a > 0; )
      ((a -= 1),
        i.push(l.slice(this.map[a][0] + this.map[a][1]), this.map[a][2]),
        (l.length = this.map[a][0]));
    (i.push(l.slice()), (l.length = 0));
    let o = i.pop();
    for (; o; ) {
      for (const c of o) l.push(c);
      o = i.pop();
    }
    this.map.length = 0;
  }
}
function BE(t, l, a, i) {
  let o = 0;
  if (!(a === 0 && i.length === 0)) {
    for (; o < t.map.length; ) {
      if (t.map[o][0] === l) {
        ((t.map[o][1] += a), t.map[o][2].push(...i));
        return;
      }
      o += 1;
    }
    t.map.push([l, a, i]);
  }
}
function VE(t, l) {
  let a = !1;
  const i = [];
  for (; l < t.length; ) {
    const o = t[l];
    if (a) {
      if (o[0] === "enter")
        o[1].type === "tableContent" &&
          i.push(t[l + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (o[1].type === "tableContent") {
        if (t[l - 1][1].type === "tableDelimiterMarker") {
          const c = i.length - 1;
          i[c] = i[c] === "left" ? "center" : "right";
        }
      } else if (o[1].type === "tableDelimiterRow") break;
    } else o[0] === "enter" && o[1].type === "tableDelimiterRow" && (a = !0);
    l += 1;
  }
  return i;
}
function qE() {
  return { flow: { null: { name: "table", tokenize: ZE, resolveAll: IE } } };
}
function ZE(t, l, a) {
  const i = this;
  let o = 0,
    c = 0,
    s;
  return h;
  function h(z) {
    let ne = i.events.length - 1;
    for (; ne > -1; ) {
      const ie = i.events[ne][1].type;
      if (ie === "lineEnding" || ie === "linePrefix") ne--;
      else break;
    }
    const te = ne > -1 ? i.events[ne][1].type : null,
      le = te === "tableHead" || te === "tableRow" ? _ : p;
    return le === _ && i.parser.lazy[i.now().line] ? a(z) : le(z);
  }
  function p(z) {
    return (t.enter("tableHead"), t.enter("tableRow"), m(z));
  }
  function m(z) {
    return (z === 124 || ((s = !0), (c += 1)), y(z));
  }
  function y(z) {
    return z === null
      ? a(z)
      : ye(z)
        ? c > 1
          ? ((c = 0),
            (i.interrupt = !0),
            t.exit("tableRow"),
            t.enter("lineEnding"),
            t.consume(z),
            t.exit("lineEnding"),
            v)
          : a(z)
        : He(z)
          ? Ue(t, y, "whitespace")(z)
          : ((c += 1),
            s && ((s = !1), (o += 1)),
            z === 124
              ? (t.enter("tableCellDivider"),
                t.consume(z),
                t.exit("tableCellDivider"),
                (s = !0),
                y)
              : (t.enter("data"), g(z)));
  }
  function g(z) {
    return z === null || z === 124 || et(z)
      ? (t.exit("data"), y(z))
      : (t.consume(z), z === 92 ? k : g);
  }
  function k(z) {
    return z === 92 || z === 124 ? (t.consume(z), g) : g(z);
  }
  function v(z) {
    return (
      (i.interrupt = !1),
      i.parser.lazy[i.now().line]
        ? a(z)
        : (t.enter("tableDelimiterRow"),
          (s = !1),
          He(z)
            ? Ue(
                t,
                A,
                "linePrefix",
                i.parser.constructs.disable.null.includes("codeIndented")
                  ? void 0
                  : 4
              )(z)
            : A(z))
    );
  }
  function A(z) {
    return z === 45 || z === 58
      ? U(z)
      : z === 124
        ? ((s = !0),
          t.enter("tableCellDivider"),
          t.consume(z),
          t.exit("tableCellDivider"),
          C)
        : O(z);
  }
  function C(z) {
    return He(z) ? Ue(t, U, "whitespace")(z) : U(z);
  }
  function U(z) {
    return z === 58
      ? ((c += 1),
        (s = !0),
        t.enter("tableDelimiterMarker"),
        t.consume(z),
        t.exit("tableDelimiterMarker"),
        R)
      : z === 45
        ? ((c += 1), R(z))
        : z === null || ye(z)
          ? ee(z)
          : O(z);
  }
  function R(z) {
    return z === 45 ? (t.enter("tableDelimiterFiller"), Y(z)) : O(z);
  }
  function Y(z) {
    return z === 45
      ? (t.consume(z), Y)
      : z === 58
        ? ((s = !0),
          t.exit("tableDelimiterFiller"),
          t.enter("tableDelimiterMarker"),
          t.consume(z),
          t.exit("tableDelimiterMarker"),
          V)
        : (t.exit("tableDelimiterFiller"), V(z));
  }
  function V(z) {
    return He(z) ? Ue(t, ee, "whitespace")(z) : ee(z);
  }
  function ee(z) {
    return z === 124
      ? A(z)
      : z === null || ye(z)
        ? !s || o !== c
          ? O(z)
          : (t.exit("tableDelimiterRow"), t.exit("tableHead"), l(z))
        : O(z);
  }
  function O(z) {
    return a(z);
  }
  function _(z) {
    return (t.enter("tableRow"), F(z));
  }
  function F(z) {
    return z === 124
      ? (t.enter("tableCellDivider"),
        t.consume(z),
        t.exit("tableCellDivider"),
        F)
      : z === null || ye(z)
        ? (t.exit("tableRow"), l(z))
        : He(z)
          ? Ue(t, F, "whitespace")(z)
          : (t.enter("data"), q(z));
  }
  function q(z) {
    return z === null || z === 124 || et(z)
      ? (t.exit("data"), F(z))
      : (t.consume(z), z === 92 ? K : q);
  }
  function K(z) {
    return z === 92 || z === 124 ? (t.consume(z), q) : q(z);
  }
}
function IE(t, l) {
  let a = -1,
    i = !0,
    o = 0,
    c = [0, 0, 0, 0],
    s = [0, 0, 0, 0],
    h = !1,
    p = 0,
    m,
    y,
    g;
  const k = new UE();
  for (; ++a < t.length; ) {
    const v = t[a],
      A = v[1];
    v[0] === "enter"
      ? A.type === "tableHead"
        ? ((h = !1),
          p !== 0 && (Am(k, l, p, m, y), (y = void 0), (p = 0)),
          (m = {
            type: "table",
            start: Object.assign({}, A.start),
            end: Object.assign({}, A.end),
          }),
          k.add(a, 0, [["enter", m, l]]))
        : A.type === "tableRow" || A.type === "tableDelimiterRow"
          ? ((i = !0),
            (g = void 0),
            (c = [0, 0, 0, 0]),
            (s = [0, a + 1, 0, 0]),
            h &&
              ((h = !1),
              (y = {
                type: "tableBody",
                start: Object.assign({}, A.start),
                end: Object.assign({}, A.end),
              }),
              k.add(a, 0, [["enter", y, l]])),
            (o = A.type === "tableDelimiterRow" ? 2 : y ? 3 : 1))
          : o &&
              (A.type === "data" ||
                A.type === "tableDelimiterMarker" ||
                A.type === "tableDelimiterFiller")
            ? ((i = !1),
              s[2] === 0 &&
                (c[1] !== 0 &&
                  ((s[0] = s[1]),
                  (g = Zu(k, l, c, o, void 0, g)),
                  (c = [0, 0, 0, 0])),
                (s[2] = a)))
            : A.type === "tableCellDivider" &&
              (i
                ? (i = !1)
                : (c[1] !== 0 &&
                    ((s[0] = s[1]), (g = Zu(k, l, c, o, void 0, g))),
                  (c = s),
                  (s = [c[1], a, 0, 0])))
      : A.type === "tableHead"
        ? ((h = !0), (p = a))
        : A.type === "tableRow" || A.type === "tableDelimiterRow"
          ? ((p = a),
            c[1] !== 0
              ? ((s[0] = s[1]), (g = Zu(k, l, c, o, a, g)))
              : s[1] !== 0 && (g = Zu(k, l, s, o, a, g)),
            (o = 0))
          : o &&
            (A.type === "data" ||
              A.type === "tableDelimiterMarker" ||
              A.type === "tableDelimiterFiller") &&
            (s[3] = a);
  }
  for (
    p !== 0 && Am(k, l, p, m, y), k.consume(l.events), a = -1;
    ++a < l.events.length;

  ) {
    const v = l.events[a];
    v[0] === "enter" &&
      v[1].type === "table" &&
      (v[1]._align = VE(l.events, a));
  }
  return t;
}
function Zu(t, l, a, i, o, c) {
  const s = i === 1 ? "tableHeader" : i === 2 ? "tableDelimiter" : "tableData",
    h = "tableContent";
  a[0] !== 0 &&
    ((c.end = Object.assign({}, Gr(l.events, a[0]))),
    t.add(a[0], 0, [["exit", c, l]]));
  const p = Gr(l.events, a[1]);
  if (
    ((c = { type: s, start: Object.assign({}, p), end: Object.assign({}, p) }),
    t.add(a[1], 0, [["enter", c, l]]),
    a[2] !== 0)
  ) {
    const m = Gr(l.events, a[2]),
      y = Gr(l.events, a[3]),
      g = { type: h, start: Object.assign({}, m), end: Object.assign({}, y) };
    if ((t.add(a[2], 0, [["enter", g, l]]), i !== 2)) {
      const k = l.events[a[2]],
        v = l.events[a[3]];
      if (
        ((k[1].end = Object.assign({}, v[1].end)),
        (k[1].type = "chunkText"),
        (k[1].contentType = "text"),
        a[3] > a[2] + 1)
      ) {
        const A = a[2] + 1,
          C = a[3] - a[2] - 1;
        t.add(A, C, []);
      }
    }
    t.add(a[3] + 1, 0, [["exit", g, l]]);
  }
  return (
    o !== void 0 &&
      ((c.end = Object.assign({}, Gr(l.events, o))),
      t.add(o, 0, [["exit", c, l]]),
      (c = void 0)),
    c
  );
}
function Am(t, l, a, i, o) {
  const c = [],
    s = Gr(l.events, a);
  (o && ((o.end = Object.assign({}, s)), c.push(["exit", o, l])),
    (i.end = Object.assign({}, s)),
    c.push(["exit", i, l]),
    t.add(a + 1, 0, c));
}
function Gr(t, l) {
  const a = t[l],
    i = a[0] === "enter" ? "start" : "end";
  return a[1][i];
}
const YE = { name: "tasklistCheck", tokenize: FE };
function GE() {
  return { text: { 91: YE } };
}
function FE(t, l, a) {
  const i = this;
  return o;
  function o(p) {
    return i.previous !== null || !i._gfmTasklistFirstContentOfListItem
      ? a(p)
      : (t.enter("taskListCheck"),
        t.enter("taskListCheckMarker"),
        t.consume(p),
        t.exit("taskListCheckMarker"),
        c);
  }
  function c(p) {
    return et(p)
      ? (t.enter("taskListCheckValueUnchecked"),
        t.consume(p),
        t.exit("taskListCheckValueUnchecked"),
        s)
      : p === 88 || p === 120
        ? (t.enter("taskListCheckValueChecked"),
          t.consume(p),
          t.exit("taskListCheckValueChecked"),
          s)
        : a(p);
  }
  function s(p) {
    return p === 93
      ? (t.enter("taskListCheckMarker"),
        t.consume(p),
        t.exit("taskListCheckMarker"),
        t.exit("taskListCheck"),
        h)
      : a(p);
  }
  function h(p) {
    return ye(p) ? l(p) : He(p) ? t.check({ tokenize: QE }, l, a)(p) : a(p);
  }
}
function QE(t, l, a) {
  return Ue(t, i, "whitespace");
  function i(o) {
    return o === null ? a(o) : l(o);
  }
}
function XE(t) {
  return Vg([xE(), RE(), jE(t), qE(), GE()]);
}
const $E = {};
function PE(t) {
  const l = this,
    a = t || $E,
    i = l.data(),
    o = i.micromarkExtensions || (i.micromarkExtensions = []),
    c = i.fromMarkdownExtensions || (i.fromMarkdownExtensions = []),
    s = i.toMarkdownExtensions || (i.toMarkdownExtensions = []);
  (o.push(XE(a)), c.push(mE()), s.push(gE(a)));
}
function KE(t) {
  return $e.lexer(t).map((a) => a.raw);
}
const My = E.memo(
  ({ content: t }) =>
    Z.jsx("div", {
      className: "markdown-body",
      children: Z.jsx(jw, { remarkPlugins: [PE], children: t }),
    }),
  (t, l) => t.content === l.content
);
My.displayName = "MemoizedMarkdownBlock";
const zy = E.memo(({ content: t, id: l }) =>
  E.useMemo(() => KE(t), [t]).map((i, o) =>
    Z.jsx(My, { content: i }, `${l}-block_${o}`)
  )
);
zy.displayName = "MemoizedMarkdown";
const JE = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M140,88a16,16,0,1,1,16,16A16,16,0,0,1,140,88ZM100,72a16,16,0,1,0,16,16A16,16,0,0,0,100,72Zm120,72a91.84,91.84,0,0,1-2.34,20.64L236.81,173a12,12,0,0,1-9.62,22l-18-7.85a92,92,0,0,1-162.46,0l-18,7.85a12,12,0,1,1-9.62-22l19.15-8.36A91.84,91.84,0,0,1,36,144v-4H16a12,12,0,0,1,0-24H36v-4a91.84,91.84,0,0,1,2.34-20.64L19.19,83a12,12,0,0,1,9.62-22l18,7.85a92,92,0,0,1,162.46,0l18-7.85a12,12,0,1,1,9.62,22l-19.15,8.36A91.84,91.84,0,0,1,220,112v4h20a12,12,0,0,1,0,24H220ZM60,116H196v-4a68,68,0,0,0-136,0Zm56,94.92V140H60v4A68.1,68.1,0,0,0,116,210.92ZM196,144v-4H140v70.92A68.1,68.1,0,0,0,196,144Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M208,128v16a80,80,0,0,1-160,0V128Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M144,92a12,12,0,1,1,12,12A12,12,0,0,1,144,92ZM100,80a12,12,0,1,0,12,12A12,12,0,0,0,100,80Zm116,64A87.76,87.76,0,0,1,213,167l22.24,9.72A8,8,0,0,1,232,192a7.89,7.89,0,0,1-3.2-.67L207.38,182a88,88,0,0,1-158.76,0L27.2,191.33A7.89,7.89,0,0,1,24,192a8,8,0,0,1-3.2-15.33L43,167A87.76,87.76,0,0,1,40,144v-8H16a8,8,0,0,1,0-16H40v-8a87.76,87.76,0,0,1,3-23L20.8,79.33a8,8,0,1,1,6.4-14.66L48.62,74a88,88,0,0,1,158.76,0l21.42-9.36a8,8,0,0,1,6.4,14.66L213,89.05a87.76,87.76,0,0,1,3,23v8h24a8,8,0,0,1,0,16H216ZM56,120H200v-8a72,72,0,0,0-144,0Zm64,95.54V136H56v8A72.08,72.08,0,0,0,120,215.54ZM200,144v-8H136v79.54A72.08,72.08,0,0,0,200,144Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M168,92a12,12,0,1,1-12-12A12,12,0,0,1,168,92ZM100,80a12,12,0,1,0,12,12A12,12,0,0,0,100,80Zm116,64A87.76,87.76,0,0,1,213,167l22.24,9.72A8,8,0,0,1,232,192a7.89,7.89,0,0,1-3.2-.67L207.38,182a88,88,0,0,1-158.76,0L27.2,191.33A7.89,7.89,0,0,1,24,192a8,8,0,0,1-3.2-15.33L43,167A87.76,87.76,0,0,1,40,144v-8H16a8,8,0,0,1,0-16H40v-8a87.76,87.76,0,0,1,3-23L20.8,79.33a8,8,0,1,1,6.4-14.66L48.62,74a88,88,0,0,1,158.76,0l21.42-9.36a8,8,0,0,1,6.4,14.66L213,89.05a87.76,87.76,0,0,1,3,23v8h24a8,8,0,0,1,0,16H216Zm-80,0a8,8,0,0,0-16,0v64a8,8,0,0,0,16,0Zm64-32a72,72,0,0,0-144,0v8H200Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M146,92a10,10,0,1,1,10,10A10,10,0,0,1,146,92ZM100,82a10,10,0,1,0,10,10A10,10,0,0,0,100,82Zm146,46a6,6,0,0,1-6,6H214v10a85.88,85.88,0,0,1-3.45,24.08L234.4,178.5a6,6,0,0,1-4.8,11l-23.23-10.15a86,86,0,0,1-156.74,0L26.4,189.5a6,6,0,1,1-4.8-11l23.85-10.42A85.88,85.88,0,0,1,42,144V134H16a6,6,0,0,1,0-12H42V112a85.88,85.88,0,0,1,3.45-24.08L21.6,77.5a6,6,0,0,1,4.8-11L49.63,76.65a86,86,0,0,1,156.74,0L229.6,66.5a6,6,0,1,1,4.8,11L210.55,87.92A85.88,85.88,0,0,1,214,112v10h26A6,6,0,0,1,246,128ZM54,122H202V112a74,74,0,0,0-148,0Zm68,95.74V134H54v10A74.09,74.09,0,0,0,122,217.74ZM202,134H134v83.74A74.09,74.09,0,0,0,202,144Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M144,92a12,12,0,1,1,12,12A12,12,0,0,1,144,92ZM100,80a12,12,0,1,0,12,12A12,12,0,0,0,100,80Zm116,64A87.76,87.76,0,0,1,213,167l22.24,9.72A8,8,0,0,1,232,192a7.89,7.89,0,0,1-3.2-.67L207.38,182a88,88,0,0,1-158.76,0L27.2,191.33A7.89,7.89,0,0,1,24,192a8,8,0,0,1-3.2-15.33L43,167A87.76,87.76,0,0,1,40,144v-8H16a8,8,0,0,1,0-16H40v-8a87.76,87.76,0,0,1,3-23L20.8,79.33a8,8,0,1,1,6.4-14.66L48.62,74a88,88,0,0,1,158.76,0l21.42-9.36a8,8,0,0,1,6.4,14.66L213,89.05a87.76,87.76,0,0,1,3,23v8h24a8,8,0,0,1,0,16H216ZM56,120H200v-8a72,72,0,0,0-144,0Zm64,95.54V136H56v8A72.08,72.08,0,0,0,120,215.54ZM200,144v-8H136v79.54A72.08,72.08,0,0,0,200,144Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M148,92a8,8,0,1,1,8,8A8,8,0,0,1,148,92Zm-48-8a8,8,0,1,0,8,8A8,8,0,0,0,100,84Zm144,44a4,4,0,0,1-4,4H212v12a83.64,83.64,0,0,1-3.87,25.2l25.47,11.13A4,4,0,0,1,232,188a4.09,4.09,0,0,1-1.6-.33l-25-10.95a84,84,0,0,1-154.72,0l-25,10.95A4.09,4.09,0,0,1,24,188a4,4,0,0,1-1.6-7.67L47.87,169.2A83.64,83.64,0,0,1,44,144V132H16a4,4,0,0,1,0-8H44V112a83.64,83.64,0,0,1,3.87-25.2L22.4,75.67a4,4,0,0,1,3.2-7.34l25,11a84,84,0,0,1,154.72,0l25-11a4,4,0,1,1,3.2,7.34L208.13,86.8A83.64,83.64,0,0,1,212,112v12h28A4,4,0,0,1,244,128ZM52,124H204V112a76,76,0,0,0-152,0Zm72,95.89V132H52v12A76.09,76.09,0,0,0,124,219.89ZM204,132H132v87.89A76.09,76.09,0,0,0,204,144Z",
        })
      ),
    ],
  ]),
  WE = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", { d: "M208,96l-80,80L48,96Z", opacity: "0.2" }),
        E.createElement("path", {
          d: "M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z",
        })
      ),
    ],
  ]),
  eA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M227.89,147.89A96,96,0,1,1,108.11,28.11,96.09,96.09,0,0,0,227.89,147.89Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M232.13,143.64a6,6,0,0,0-6-1.49A90.07,90.07,0,0,1,113.86,29.85a6,6,0,0,0-7.49-7.48A102.88,102.88,0,0,0,54.48,58.68,102,102,0,0,0,197.32,201.52a102.88,102.88,0,0,0,36.31-51.89A6,6,0,0,0,232.13,143.64Zm-42,48.29a90,90,0,0,1-126-126A90.9,90.9,0,0,1,99.65,37.66,102.06,102.06,0,0,0,218.34,156.35,90.9,90.9,0,0,1,190.1,191.93Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M230.72,145.06a4,4,0,0,0-4-1A92.08,92.08,0,0,1,111.94,29.27a4,4,0,0,0-5-5A100.78,100.78,0,0,0,56.08,59.88a100,100,0,0,0,140,140,100.78,100.78,0,0,0,35.59-50.87A4,4,0,0,0,230.72,145.06ZM191.3,193.53A92,92,0,0,1,62.47,64.7a93,93,0,0,1,39.88-30.35,100.09,100.09,0,0,0,119.3,119.3A93,93,0,0,1,191.3,193.53Z",
        })
      ),
    ],
  ]),
  tA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L108,148,20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.85l85.56,41.64L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a2,2,0,0,1-3.76.26l-40.68-83.58,49-49a6,6,0,1,0-8.49-8.49l-49,49L23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M224.47,31.52a11.87,11.87,0,0,0-11.82-3L20.74,86.67a12,12,0,0,0-1.91,22.38L105,151l41.92,86.15A11.88,11.88,0,0,0,157.74,244c.34,0,.69,0,1,0a11.89,11.89,0,0,0,10.52-8.63l58.21-192,0-.08A11.85,11.85,0,0,0,224.47,31.52Zm-4.62,9.54-58.23,192a4,4,0,0,1-7.48.59l-41.3-84.86,50-50a4,4,0,1,0-5.66-5.66l-50,50-84.9-41.31a3.88,3.88,0,0,1-2.27-4,3.93,3.93,0,0,1,3-3.54L214.9,36.16A3.93,3.93,0,0,1,216,36a4,4,0,0,1,2.79,1.19A3.93,3.93,0,0,1,219.85,41.06Z",
        })
      ),
    ],
  ]),
  nA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M72,104a16,16,0,1,1,16,16A16,16,0,0,1,72,104Zm96,16a16,16,0,1,0-16-16A16,16,0,0,0,168,120Zm68-40V192a36,36,0,0,1-36,36H56a36,36,0,0,1-36-36V80A36,36,0,0,1,56,44h60V16a12,12,0,0,1,24,0V44h60A36,36,0,0,1,236,80Zm-24,0a12,12,0,0,0-12-12H56A12,12,0,0,0,44,80V192a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12Zm-12,82a30,30,0,0,1-30,30H86a30,30,0,0,1,0-60h84A30,30,0,0,1,200,162Zm-80-6v12h16V156ZM86,168H96V156H86a6,6,0,0,0,0,12Zm90-6a6,6,0,0,0-6-6H160v12h10A6,6,0,0,0,176,162Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,56H56A24,24,0,0,0,32,80V192a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V80A24,24,0,0,0,200,56ZM164,184H92a20,20,0,0,1,0-40h72a20,20,0,0,1,0,40Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Zm4,28H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,96a12,12,0,1,1-12,12A12,12,0,0,1,172,96ZM96,184H80a16,16,0,0,1,0-32H96ZM84,120a12,12,0,1,1,12-12A12,12,0,0,1,84,120Zm60,64H112V152h32Zm32,0H160V152h16a16,16,0,0,1,0,32Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,50H134V16a6,6,0,0,0-12,0V50H56A30,30,0,0,0,26,80V192a30,30,0,0,0,30,30H200a30,30,0,0,0,30-30V80A30,30,0,0,0,200,50Zm18,142a18,18,0,0,1-18,18H56a18,18,0,0,1-18-18V80A18,18,0,0,1,56,62H200a18,18,0,0,1,18,18ZM74,108a10,10,0,1,1,10,10A10,10,0,0,1,74,108Zm88,0a10,10,0,1,1,10,10A10,10,0,0,1,162,108Zm2,30H92a26,26,0,0,0,0,52h72a26,26,0,0,0,0-52Zm-22,12v28H114V150ZM78,164a14,14,0,0,1,14-14h10v28H92A14,14,0,0,1,78,164Zm86,14H154V150h10a14,14,0,0,1,0,28Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,52H132V16a4,4,0,0,0-8,0V52H56A28,28,0,0,0,28,80V192a28,28,0,0,0,28,28H200a28,28,0,0,0,28-28V80A28,28,0,0,0,200,52Zm20,140a20,20,0,0,1-20,20H56a20,20,0,0,1-20-20V80A20,20,0,0,1,56,60H200a20,20,0,0,1,20,20ZM76,108a8,8,0,1,1,8,8A8,8,0,0,1,76,108Zm88,0a8,8,0,1,1,8,8A8,8,0,0,1,164,108Zm0,32H92a24,24,0,0,0,0,48h72a24,24,0,0,0,0-48Zm-20,8v32H112V148ZM76,164a16,16,0,0,1,16-16h12v32H92A16,16,0,0,1,76,164Zm88,16H152V148h12a16,16,0,0,1,0,32Z",
        })
      ),
    ],
  ]),
  lA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,160H60V60H196Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,158a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,44H56A12,12,0,0,0,44,56V200a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,156a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z",
        })
      ),
    ],
  ]),
  rA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M184,128a56,56,0,1,1-56-56A56,56,0,0,1,184,128Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M122,40V16a6,6,0,0,1,12,0V40a6,6,0,0,1-12,0Zm68,88a62,62,0,1,1-62-62A62.07,62.07,0,0,1,190,128Zm-12,0a50,50,0,1,0-50,50A50.06,50.06,0,0,0,178,128ZM59.76,68.24a6,6,0,1,0,8.48-8.48l-16-16a6,6,0,0,0-8.48,8.48Zm0,119.52-16,16a6,6,0,1,0,8.48,8.48l16-16a6,6,0,1,0-8.48-8.48ZM192,70a6,6,0,0,0,4.24-1.76l16-16a6,6,0,0,0-8.48-8.48l-16,16A6,6,0,0,0,192,70Zm4.24,117.76a6,6,0,0,0-8.48,8.48l16,16a6,6,0,0,0,8.48-8.48ZM46,128a6,6,0,0,0-6-6H16a6,6,0,0,0,0,12H40A6,6,0,0,0,46,128Zm82,82a6,6,0,0,0-6,6v24a6,6,0,0,0,12,0V216A6,6,0,0,0,128,210Zm112-88H216a6,6,0,0,0,0,12h24a6,6,0,0,0,0-12Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M124,40V16a4,4,0,0,1,8,0V40a4,4,0,0,1-8,0Zm64,88a60,60,0,1,1-60-60A60.07,60.07,0,0,1,188,128Zm-8,0a52,52,0,1,0-52,52A52.06,52.06,0,0,0,180,128ZM61.17,66.83a4,4,0,0,0,5.66-5.66l-16-16a4,4,0,0,0-5.66,5.66Zm0,122.34-16,16a4,4,0,0,0,5.66,5.66l16-16a4,4,0,0,0-5.66-5.66ZM192,68a4,4,0,0,0,2.83-1.17l16-16a4,4,0,1,0-5.66-5.66l-16,16A4,4,0,0,0,192,68Zm2.83,121.17a4,4,0,0,0-5.66,5.66l16,16a4,4,0,0,0,5.66-5.66ZM40,124H16a4,4,0,0,0,0,8H40a4,4,0,0,0,0-8Zm88,88a4,4,0,0,0-4,4v24a4,4,0,0,0,8,0V216A4,4,0,0,0,128,212Zm112-88H216a4,4,0,0,0,0,8h24a4,4,0,0,0,0-8Z",
        })
      ),
    ],
  ]),
  aA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,52H172V40a20,20,0,0,0-20-20H104A20,20,0,0,0,84,40V52H40a4,4,0,0,0,0,8H52V208a12,12,0,0,0,12,12H192a12,12,0,0,0,12-12V60h12a4,4,0,0,0,0-8ZM92,40a12,12,0,0,1,12-12h48a12,12,0,0,1,12,12V52H92ZM196,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V60H196ZM108,104v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Zm48,0v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Z",
        })
      ),
    ],
  ]),
  iA = new Map([
    [
      "bold",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z",
        })
      ),
    ],
    [
      "duotone",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
          opacity: "0.2",
        }),
        E.createElement("path", {
          d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z",
        })
      ),
    ],
    [
      "fill",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z",
        })
      ),
    ],
    [
      "light",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z",
        })
      ),
    ],
    [
      "regular",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z",
        })
      ),
    ],
    [
      "thin",
      E.createElement(
        E.Fragment,
        null,
        E.createElement("path", {
          d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z",
        })
      ),
    ],
  ]),
  uA = E.createContext({
    color: "currentColor",
    size: "1em",
    weight: "regular",
    mirrored: !1,
  }),
  Dn = E.forwardRef((t, l) => {
    const {
        alt: a,
        color: i,
        size: o,
        weight: c,
        mirrored: s,
        children: h,
        weights: p,
        ...m
      } = t,
      {
        color: y = "currentColor",
        size: g,
        weight: k = "regular",
        mirrored: v = !1,
        ...A
      } = E.useContext(uA);
    return E.createElement(
      "svg",
      {
        ref: l,
        xmlns: "http://www.w3.org/2000/svg",
        width: o ?? g,
        height: o ?? g,
        fill: i ?? y,
        viewBox: "0 0 256 256",
        transform: s || v ? "scale(-1, 1)" : void 0,
        ...A,
        ...m,
      },
      !!a && E.createElement("title", null, a),
      h,
      p.get(c ?? k)
    );
  });
Dn.displayName = "IconBase";
const Dy = E.forwardRef((t, l) =>
  E.createElement(Dn, { ref: l, ...t, weights: JE })
);
Dy.displayName = "BugIcon";
const oA = Dy,
  Oy = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: WE })
  );
Oy.displayName = "CaretDownIcon";
const sA = Oy,
  Ny = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: eA })
  );
Ny.displayName = "MoonIcon";
const cA = Ny,
  Ly = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: tA })
  );
Ly.displayName = "PaperPlaneTiltIcon";
const fA = Ly,
  Hy = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: nA })
  );
Hy.displayName = "RobotIcon";
const jy = Hy,
  Uy = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: lA })
  );
Uy.displayName = "StopIcon";
const hA = Uy,
  By = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: rA })
  );
By.displayName = "SunIcon";
const dA = By,
  Vy = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: aA })
  );
Vy.displayName = "TrashIcon";
const pA = Vy,
  qy = E.forwardRef((t, l) =>
    E.createElement(Dn, { ref: l, ...t, weights: iA })
  );
qy.displayName = "XIcon";
const mA = qy,
  _m = { YES: "Yes, confirmed.", NO: "No, denied." };
function gA({
  toolInvocation: t,
  toolCallId: l,
  needsConfirmation: a,
  addToolResult: i,
}) {
  const [o, c] = E.useState(!0);
  return Z.jsxs(Gu, {
    className: `p-4 my-3 w-full max-w-[500px] rounded-md bg-neutral-100 dark:bg-neutral-900 ${a ? "" : "border-[#F48120]/30"} overflow-hidden`,
    children: [
      Z.jsxs("button", {
        type: "button",
        onClick: () => c(!o),
        className: "w-full flex items-center gap-2 cursor-pointer",
        children: [
          Z.jsx("div", {
            className: `${a ? "bg-[#F48120]/10" : "bg-[#F48120]/5"} p-1.5 rounded-full flex-shrink-0`,
            children: Z.jsx(jy, { size: 16, className: "text-[#F48120]" }),
          }),
          Z.jsxs("h4", {
            className: "font-medium flex items-center gap-2 flex-1 text-left",
            children: [
              t.toolName,
              !a &&
                t.state === "result" &&
                Z.jsx("span", {
                  className: "text-xs text-[#F48120]/70",
                  children: "✓ Completed",
                }),
            ],
          }),
          Z.jsx(sA, {
            size: 16,
            className: `text-muted-foreground transition-transform ${o ? "rotate-180" : ""}`,
          }),
        ],
      }),
      Z.jsx("div", {
        className: `transition-all duration-200 ${o ? "max-h-[200px] opacity-100 mt-3" : "max-h-0 opacity-0 overflow-hidden"}`,
        children: Z.jsxs("div", {
          className: "overflow-y-auto",
          style: { maxHeight: o ? "180px" : "0px" },
          children: [
            Z.jsxs("div", {
              className: "mb-3",
              children: [
                Z.jsx("h5", {
                  className: "text-xs font-medium mb-1 text-muted-foreground",
                  children: "Arguments:",
                }),
                Z.jsx("pre", {
                  className:
                    "bg-background/80 p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap break-words max-w-[450px]",
                  children: JSON.stringify(t.args, null, 2),
                }),
              ],
            }),
            a &&
              t.state === "call" &&
              Z.jsxs("div", {
                className: "flex gap-2 justify-end",
                children: [
                  Z.jsx(di, {
                    variant: "primary",
                    size: "sm",
                    onClick: () => i({ toolCallId: l, result: _m.NO }),
                    children: "Reject",
                  }),
                  Z.jsx(Hf, {
                    content: "Accept action",
                    children: Z.jsx(di, {
                      variant: "primary",
                      size: "sm",
                      onClick: () => i({ toolCallId: l, result: _m.YES }),
                      children: "Approve",
                    }),
                  }),
                ],
              }),
            !a &&
              t.state === "result" &&
              Z.jsxs("div", {
                className: "mt-3 border-t border-[#F48120]/10 pt-3",
                children: [
                  Z.jsx("h5", {
                    className: "text-xs font-medium mb-1 text-muted-foreground",
                    children: "Result:",
                  }),
                  Z.jsx("pre", {
                    className:
                      "bg-background/80 p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap break-words max-w-[450px]",
                    children: (() => {
                      const s = t.result;
                      return typeof s == "object" && s.content
                        ? s.content.map((h) =>
                            h.type === "text" &&
                            h.text.startsWith(`
~ Page URL:`)
                              ? h.text
                                  .split(
                                    `
`
                                  )
                                  .filter(Boolean)
                                  .map(
                                    (m) =>
                                      `- ${m.replace(
                                        `
~ `,
                                        ""
                                      )}`
                                  ).join(`
`)
                              : h.text
                          ).join(`
`)
                        : JSON.stringify(s, null, 2);
                    })(),
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
}
const Tm = ["explainFeature"];
function yA() {
  const [t, l] = E.useState(() => localStorage.getItem("theme") || "dark"),
    [a, i] = E.useState(!1),
    [o, c] = E.useState("auto"),
    s = E.useRef(null),
    [h] = E.useState(() => {
      const O = window.sessionStorage.getItem("cutty-session-id");
      if (O) return (console.log("Using existing session ID:", O), O);
      const _ = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return (
        console.log("Generated new session ID:", _),
        window.sessionStorage.setItem("cutty-session-id", _),
        _
      );
    });
  E.useEffect(() => {
    console.log(`[Client] Setting up fetch interceptor for session: ${h}`);
    const O = window.fetch,
      _ = async (F, q) => {
        const K =
          typeof F == "string"
            ? F
            : F instanceof Request
              ? F.url
              : F.toString();
        if (
          (console.log(`[Client] Intercepted fetch to: ${K}`),
          K.includes("/agents/"))
        ) {
          const z = new URL(K, window.location.origin);
          if (
            (z.searchParams.set("sessionId", h),
            console.log(
              `[Client] Adding sessionId to request: ${z.toString()}`
            ),
            typeof F == "string")
          )
            return O(z.toString(), q);
          if (F instanceof Request) {
            const ne = new Request(z.toString(), F);
            return O(ne, q);
          } else return O(z, q);
        }
        return O(F, q);
      };
    return (
      (window.fetch = _),
      () => {
        (console.log("[Client] Cleaning up fetch interceptor"),
          (window.fetch = O));
      }
    );
  }, [h]);
  const p = E.useCallback(() => {
    s.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  (E.useEffect(() => {
    (t === "dark"
      ? (document.documentElement.classList.add("dark"),
        document.documentElement.classList.remove("light"))
      : (document.documentElement.classList.remove("dark"),
        document.documentElement.classList.add("light")),
      localStorage.setItem("theme", t));
  }, [t]),
    E.useEffect(() => {
      p();
    }, [p]));
  const m = () => {
      l(t === "dark" ? "light" : "dark");
    },
    y = wx({ agent: "chat", name: h, apiPath: `/agents/chat/${h}` }),
    {
      messages: g,
      input: k,
      handleInputChange: v,
      handleSubmit: A,
      addToolResult: C,
      clearHistory: U,
      isLoading: R,
      stop: Y,
    } = r6({ agent: y, maxSteps: 5 });
  E.useEffect(() => {
    g.length > 0 && p();
  }, [g, p]);
  const V = g.some((O) =>
      O.parts?.some(
        (_) =>
          _.type === "tool-invocation" &&
          _.toolInvocation.state === "call" &&
          Tm.includes(_.toolInvocation.toolName)
      )
    ),
    ee = (O) =>
      O.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return Z.jsxs("div", {
    className:
      "h-[100vh] w-full p-4 flex justify-center items-center bg-fixed overflow-hidden",
    children: [
      Z.jsx(xA, {}),
      Z.jsxs("div", {
        className:
          "h-[calc(100vh-2rem)] w-full mx-auto max-w-lg flex flex-col shadow-xl rounded-md overflow-hidden relative border border-neutral-300 dark:border-neutral-800",
        children: [
          Z.jsxs("div", {
            className:
              "px-4 py-3 border-b border-neutral-300 dark:border-neutral-800 flex items-center gap-3 sticky top-0 z-10",
            children: [
              Z.jsx("div", {
                className: "flex items-center justify-center h-8 w-8",
                children: Z.jsxs("svg", {
                  width: "28px",
                  height: "28px",
                  className: "text-[#F48120]",
                  "data-icon": "agents",
                  children: [
                    Z.jsx("title", { children: "Cloudflare Agents" }),
                    Z.jsx("symbol", {
                      id: "ai:local:agents",
                      viewBox: "0 0 80 79",
                      children: Z.jsx("path", {
                        fill: "currentColor",
                        d: "M69.3 39.7c-3.1 0-5.8 2.1-6.7 5H48.3V34h4.6l4.5-2.5c1.1.8 2.5 1.2 3.9 1.2 3.8 0 7-3.1 7-7s-3.1-7-7-7-7 3.1-7 7c0 .9.2 1.8.5 2.6L51.9 30h-3.5V18.8h-.1c-1.3-1-2.9-1.6-4.5-1.9h-.2c-1.9-.3-3.9-.1-5.8.6-.4.1-.8.3-1.2.5h-.1c-.1.1-.2.1-.3.2-1.7 1-3 2.4-4 4 0 .1-.1.2-.1.2l-.3.6c0 .1-.1.1-.1.2v.1h-.6c-2.9 0-5.7 1.2-7.7 3.2-2.1 2-3.2 4.8-3.2 7.7 0 .7.1 1.4.2 2.1-1.3.9-2.4 2.1-3.2 3.5s-1.2 2.9-1.4 4.5c-.1 1.6.1 3.2.7 4.7s1.5 2.9 2.6 4c-.8 1.8-1.2 3.7-1.1 5.6 0 1.9.5 3.8 1.4 5.6s2.1 3.2 3.6 4.4c1.3 1 2.7 1.7 4.3 2.2v-.1q2.25.75 4.8.6h.1c0 .1.1.1.1.1.9 1.7 2.3 3 4 4 .1.1.2.1.3.2h.1c.4.2.8.4 1.2.5 1.4.6 3 .8 4.5.7.4 0 .8-.1 1.3-.1h.1c1.6-.3 3.1-.9 4.5-1.9V62.9h3.5l3.1 1.7c-.3.8-.5 1.7-.5 2.6 0 3.8 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7c-1.5 0-2.8.5-3.9 1.2l-4.6-2.5h-4.6V48.7h14.3c.9 2.9 3.5 5 6.7 5 3.8 0 7-3.1 7-7s-3.1-7-7-7m-7.9-16.9c1.6 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.4-3 3-3m0 41.4c1.6 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.4-3 3-3M44.3 72c-.4.2-.7.3-1.1.3-.2 0-.4.1-.5.1h-.2c-.9.1-1.7 0-2.6-.3-1-.3-1.9-.9-2.7-1.7-.7-.8-1.3-1.7-1.6-2.7l-.3-1.5v-.7q0-.75.3-1.5c.1-.2.1-.4.2-.7s.3-.6.5-.9c0-.1.1-.1.1-.2.1-.1.1-.2.2-.3s.1-.2.2-.3c0 0 0-.1.1-.1l.6-.6-2.7-3.5c-1.3 1.1-2.3 2.4-2.9 3.9-.2.4-.4.9-.5 1.3v.1c-.1.2-.1.4-.1.6-.3 1.1-.4 2.3-.3 3.4-.3 0-.7 0-1-.1-2.2-.4-4.2-1.5-5.5-3.2-1.4-1.7-2-3.9-1.8-6.1q.15-1.2.6-2.4l.3-.6c.1-.2.2-.4.3-.5 0 0 0-.1.1-.1.4-.7.9-1.3 1.5-1.9 1.6-1.5 3.8-2.3 6-2.3q1.05 0 2.1.3v-4.5c-.7-.1-1.4-.2-2.1-.2-1.8 0-3.5.4-5.2 1.1-.7.3-1.3.6-1.9 1s-1.1.8-1.7 1.3c-.3.2-.5.5-.8.8-.6-.8-1-1.6-1.3-2.6-.2-1-.2-2 0-2.9.2-1 .6-1.9 1.3-2.6.6-.8 1.4-1.4 2.3-1.8l1.8-.9-.7-1.9c-.4-1-.5-2.1-.4-3.1s.5-2.1 1.1-2.9q.9-1.35 2.4-2.1c.9-.5 2-.8 3-.7.5 0 1 .1 1.5.2 1 .2 1.8.7 2.6 1.3s1.4 1.4 1.8 2.3l4.1-1.5c-.9-2-2.3-3.7-4.2-4.9q-.6-.3-.9-.6c.4-.7 1-1.4 1.6-1.9.8-.7 1.8-1.1 2.9-1.3.9-.2 1.7-.1 2.6 0 .4.1.7.2 1.1.3V72zm25-22.3c-1.6 0-3-1.3-3-3 0-1.6 1.3-3 3-3s3 1.3 3 3c0 1.6-1.3 3-3 3",
                      }),
                    }),
                    Z.jsx("use", { href: "#ai:local:agents" }),
                  ],
                }),
              }),
              Z.jsxs("div", {
                className: "flex-1",
                children: [
                  Z.jsx("h2", {
                    className: "font-semibold text-base",
                    children: "AI Chat Agent",
                  }),
                  a &&
                    Z.jsxs("p", {
                      className: "text-xs text-muted-foreground",
                      children: ["Session: ", h.slice(-8)],
                    }),
                ],
              }),
              Z.jsxs("div", {
                className: "flex items-center gap-2 mr-2",
                children: [
                  Z.jsx(oA, { size: 16 }),
                  Z.jsx(Y6, {
                    toggled: a,
                    "aria-label": "Toggle debug mode",
                    onClick: () => i((O) => !O),
                  }),
                ],
              }),
              Z.jsx(di, {
                variant: "ghost",
                size: "md",
                shape: "square",
                className: "rounded-full h-9 w-9",
                onClick: m,
                children:
                  t === "dark"
                    ? Z.jsx(dA, { size: 20 })
                    : Z.jsx(cA, { size: 20 }),
              }),
              Z.jsx(di, {
                variant: "ghost",
                size: "md",
                shape: "square",
                className: "rounded-full h-9 w-9",
                onClick: U,
                children: Z.jsx(pA, { size: 20 }),
              }),
            ],
          }),
          Z.jsxs("div", {
            className:
              "flex-1 overflow-y-auto p-4 space-y-4 pb-24 max-h-[calc(100vh-10rem)]",
            children: [
              g.length === 0 &&
                Z.jsx("div", {
                  className: "h-full flex items-center justify-center",
                  children: Z.jsx(Gu, {
                    className:
                      "p-6 max-w-md mx-auto bg-neutral-100 dark:bg-neutral-900",
                    children: Z.jsxs("div", {
                      className: "text-center space-y-4",
                      children: [
                        Z.jsx("div", {
                          className:
                            "bg-[#F48120]/10 text-[#F48120] rounded-full p-3 inline-flex",
                          children: Z.jsx(jy, { size: 24 }),
                        }),
                        Z.jsx("h3", {
                          className: "font-semibold text-lg",
                          children: "Welcome to AI Chat",
                        }),
                        Z.jsx("p", {
                          className: "text-muted-foreground text-sm",
                          children:
                            "Start a conversation with your AI assistant. Try asking about:",
                        }),
                        Z.jsxs("ul", {
                          className: "text-sm text-left space-y-2",
                          children: [
                            Z.jsxs("li", {
                              className: "flex items-center gap-2",
                              children: [
                                Z.jsx("span", {
                                  className: "text-[#F48120]",
                                  children: "•",
                                }),
                                Z.jsx("span", {
                                  children: "Weather information for any city",
                                }),
                              ],
                            }),
                            Z.jsxs("li", {
                              className: "flex items-center gap-2",
                              children: [
                                Z.jsx("span", {
                                  className: "text-[#F48120]",
                                  children: "•",
                                }),
                                Z.jsx("span", {
                                  children: "Local time in different locations",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              g.map((O, _) => {
                const F = O.role === "user",
                  q = _ === 0 || g[_ - 1]?.role !== O.role;
                return Z.jsxs(
                  "div",
                  {
                    children: [
                      a &&
                        Z.jsx("pre", {
                          className:
                            "text-xs text-muted-foreground overflow-scroll",
                          children: JSON.stringify(O, null, 2),
                        }),
                      Z.jsx("div", {
                        className: `flex ${F ? "justify-end" : "justify-start"}`,
                        children: Z.jsxs("div", {
                          className: `flex gap-2 max-w-[85%] ${F ? "flex-row-reverse" : "flex-row"}`,
                          children: [
                            q && !F
                              ? Z.jsx(I6, { username: "AI" })
                              : !F && Z.jsx("div", { className: "w-8" }),
                            Z.jsx("div", {
                              children: Z.jsx("div", {
                                children: O.parts?.map((K, z) => {
                                  if (K.type === "text")
                                    return Z.jsxs(
                                      "div",
                                      {
                                        children: [
                                          Z.jsxs(Gu, {
                                            className: `p-3 rounded-md bg-neutral-100 dark:bg-neutral-900 ${F ? "rounded-br-none" : "rounded-bl-none border-assistant-border"} ${K.text.startsWith("scheduled message") ? "border-accent/50" : ""} relative`,
                                            children: [
                                              K.text.startsWith(
                                                "scheduled message"
                                              ) &&
                                                Z.jsx("span", {
                                                  className:
                                                    "absolute -top-3 -left-2 text-base",
                                                  children: "🕒",
                                                }),
                                              Z.jsx(zy, {
                                                id: `${O.id}-${z}`,
                                                content: K.text.replace(
                                                  /^scheduled message: /,
                                                  ""
                                                ),
                                              }),
                                            ],
                                          }),
                                          Z.jsx("p", {
                                            className: `text-xs text-muted-foreground mt-1 ${F ? "text-right" : "text-left"}`,
                                            children: ee(new Date(O.createdAt)),
                                          }),
                                        ],
                                      },
                                      z
                                    );
                                  if (K.type === "tool-invocation") {
                                    const ne = K.toolInvocation,
                                      te = ne.toolCallId,
                                      le = Tm.includes(ne.toolName);
                                    return a
                                      ? null
                                      : Z.jsx(
                                          gA,
                                          {
                                            toolInvocation: ne,
                                            toolCallId: te,
                                            needsConfirmation: le,
                                            addToolResult: C,
                                          },
                                          `${te}-${z}`
                                        );
                                  }
                                  return null;
                                }),
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  },
                  O.id
                );
              }),
              Z.jsx("div", { ref: s }),
            ],
          }),
          Z.jsx("form", {
            onSubmit: (O) => {
              (O.preventDefault(),
                A(O, { data: { annotations: { hello: "world" } } }),
                c("auto"));
            },
            className:
              "p-3 bg-neutral-50 absolute bottom-0 left-0 right-0 z-10 border-t border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900",
            children: Z.jsx("div", {
              className: "flex items-center gap-2",
              children: Z.jsxs("div", {
                className: "flex-1 relative",
                children: [
                  Z.jsx(dg, {
                    disabled: V,
                    placeholder: V
                      ? "Please respond to the tool confirmation above..."
                      : "Send a message...",
                    className:
                      "flex w-full border border-neutral-200 dark:border-neutral-700 px-3 py-2  ring-offset-background placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base pb-10 dark:bg-neutral-900",
                    value: k,
                    onChange: (O) => {
                      (v(O),
                        (O.target.style.height = "auto"),
                        (O.target.style.height = `${O.target.scrollHeight}px`),
                        c(`${O.target.scrollHeight}px`));
                    },
                    onKeyDown: (O) => {
                      O.key === "Enter" &&
                        !O.shiftKey &&
                        !O.nativeEvent.isComposing &&
                        (O.preventDefault(), A(O), c("auto"));
                    },
                    rows: 2,
                    style: { height: o },
                  }),
                  Z.jsx("div", {
                    className:
                      "absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end",
                    children: R
                      ? Z.jsx("button", {
                          type: "button",
                          onClick: Y,
                          className:
                            "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-1.5 h-fit border border-neutral-200 dark:border-neutral-800",
                          "aria-label": "Stop generation",
                          children: Z.jsx(hA, { size: 16 }),
                        })
                      : Z.jsx("button", {
                          type: "submit",
                          className:
                            "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-1.5 h-fit border border-neutral-200 dark:border-neutral-800",
                          disabled: V || !k.trim(),
                          "aria-label": "Send message",
                          children: Z.jsx(fA, { size: 16 }),
                        }),
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
const bA = fetch("/check-api-key").then((t) => t.json());
function xA() {
  return E.use(bA).success
    ? null
    : Z.jsx("div", {
        className:
          "fixed top-0 left-0 right-0 z-50 bg-red-500/10 backdrop-blur-sm",
        children: Z.jsx("div", {
          className: "max-w-3xl mx-auto p-4",
          children: Z.jsx("div", {
            className:
              "bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-red-200 dark:border-red-900 p-4",
            children: Z.jsxs("div", {
              className: "flex items-start gap-3",
              children: [
                Z.jsx("div", {
                  className: "p-2 bg-red-100 dark:bg-red-900/30 rounded-full",
                  children: Z.jsxs("svg", {
                    className: "w-5 h-5 text-red-600 dark:text-red-400",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-labelledby": "warningIcon",
                    children: [
                      Z.jsx("title", {
                        id: "warningIcon",
                        children: "Warning Icon",
                      }),
                      Z.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                      Z.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
                      Z.jsx("line", {
                        x1: "12",
                        y1: "16",
                        x2: "12.01",
                        y2: "16",
                      }),
                    ],
                  }),
                }),
                Z.jsxs("div", {
                  className: "flex-1",
                  children: [
                    Z.jsx("h3", {
                      className:
                        "text-lg font-semibold text-red-600 dark:text-red-400 mb-2",
                      children: "Anthropic API Key Not Configured",
                    }),
                    Z.jsx("p", {
                      className: "text-neutral-600 dark:text-neutral-300 mb-1",
                      children:
                        "Requests to the API, including from the frontend UI, will not work until an Anthropic API key is configured.",
                    }),
                    Z.jsxs("p", {
                      className: "text-neutral-600 dark:text-neutral-300",
                      children: [
                        "Please configure an Anthropic API key by setting a",
                        " ",
                        Z.jsx("a", {
                          href: "https://developers.cloudflare.com/workers/configuration/secrets/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "text-red-600 dark:text-red-400",
                          children: "secret",
                        }),
                        " ",
                        "named",
                        " ",
                        Z.jsx("code", {
                          className:
                            "bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded text-red-600 dark:text-red-400 font-mono text-sm",
                          children: "ANTHROPIC_API_KEY",
                        }),
                        ". ",
                        Z.jsx("br", {}),
                        "You can also use a different model provider by following these",
                        " ",
                        Z.jsx("a", {
                          href: "https://github.com/cloudflare/agents-starter?tab=readme-ov-file#use-a-different-ai-model-provider",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "text-red-600 dark:text-red-400",
                          children: "instructions.",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      });
}
const vA = (t) => {
    const l = E.useRef(null);
    return (
      E.useEffect(() => {
        const a = (i) => {
          l.current && !l.current.contains(i.target) && t();
        };
        return (
          document.addEventListener("click", a),
          () => {
            document.removeEventListener("click", a);
          }
        );
      }, [t]),
      l
    );
  },
  kA = ({
    className: t,
    children: l,
    clickOutsideToClose: a = !1,
    isOpen: i,
    onClose: o,
  }) => {
    const c = a ? vA(o) : E.useRef(null);
    return (
      E.useEffect(
        () => (
          i
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = ""),
          () => {
            document.body.style.overflow = "";
          }
        ),
        [i]
      ),
      E.useEffect(() => {
        if (!i || !c.current) return;
        const s = c.current.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
          ),
          h = s[0],
          p = s[s.length - 1];
        h && h.focus();
        const m = (y) => {
          (y.key === "Tab" &&
            (y.shiftKey
              ? document.activeElement === h && (y.preventDefault(), p.focus())
              : document.activeElement === p &&
                (y.preventDefault(), h.focus())),
            y.key === "Escape" && o());
        };
        return (
          document.addEventListener("keydown", m),
          () => {
            document.removeEventListener("keydown", m);
          }
        );
      }, [i, o, c.current]),
      i
        ? Z.jsxs("div", {
            className:
              "fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-transparent p-6",
            children: [
              Z.jsx("div", {
                className:
                  "fade fixed top-0 left-0 h-full w-full bg-black/5 backdrop-blur-[2px]",
              }),
              Z.jsxs(Gu, {
                className: Mn("reveal reveal-sm relative z-50 max-w-md", t),
                ref: c,
                tabIndex: -1,
                children: [
                  l,
                  Z.jsx(di, {
                    "aria-label": "Close Modal",
                    shape: "square",
                    className: "absolute top-2 right-2",
                    onClick: o,
                    variant: "ghost",
                    children: Z.jsx(mA, { size: 16 }),
                  }),
                ],
              }),
            ],
          })
        : null
    );
  },
  SA = E.createContext(void 0),
  wA = ({ children: t }) => {
    const [l, a] = E.useState(!1),
      [i, o] = E.useState(null),
      c = (h) => {
        (o(h), a(!0));
      },
      s = () => {
        (a(!1), o(null));
      };
    return Z.jsxs(SA.Provider, {
      value: { isOpen: l, content: i, openModal: c, closeModal: s },
      children: [t, l && Z.jsx(kA, { isOpen: l, onClose: s, children: i })],
    });
  },
  EA = ({ children: t }) => Z.jsx(i6, { children: Z.jsx(wA, { children: t }) }),
  AA = sx.createRoot(document.getElementById("app"));
AA.render(
  Z.jsx(EA, {
    children: Z.jsx("div", {
      className:
        "bg-neutral-50 text-base text-neutral-900 antialiased transition-colors selection:bg-blue-700 selection:text-white dark:bg-neutral-950 dark:text-neutral-100",
      children: Z.jsx(yA, {}),
    }),
  })
);

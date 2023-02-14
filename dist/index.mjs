function Ln(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function jn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = se(s) ? Qi(s) : jn(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else {
    if (se(e))
      return e;
    if (W(e))
      return e;
  }
}
const Gi = /;(?![^(]*\))/g, Ji = /:([^]+)/, Zi = /\/\*.*?\*\//gs;
function Qi(e) {
  const t = {};
  return e.replace(Zi, "").split(Gi).forEach((n) => {
    if (n) {
      const s = n.split(Ji);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Hn(e) {
  let t = "";
  if (se(e))
    t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = Hn(e[n]);
      s && (t += s + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const er = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", tr = /* @__PURE__ */ Ln(er);
function Ys(e) {
  return !!e || e === "";
}
const En = (e) => se(e) ? e : e == null ? "" : D(e) || W(e) && (e.toString === Js || !M(e.toString)) ? JSON.stringify(e, Xs, 2) : String(e), Xs = (e, t) => t && t.__v_isRef ? Xs(e, t.value) : at(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, i]) => (n[`${s} =>`] = i, n), {})
} : qs(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : W(t) && !D(t) && !Zs(t) ? String(t) : t, K = {}, ct = [], ke = () => {
}, nr = () => !1, sr = /^on[^a-z]/, qt = (e) => sr.test(e), Bn = (e) => e.startsWith("onUpdate:"), ee = Object.assign, Vn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ir = Object.prototype.hasOwnProperty, S = (e, t) => ir.call(e, t), D = Array.isArray, at = (e) => Gt(e) === "[object Map]", qs = (e) => Gt(e) === "[object Set]", M = (e) => typeof e == "function", se = (e) => typeof e == "string", zn = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", Gs = (e) => W(e) && M(e.then) && M(e.catch), Js = Object.prototype.toString, Gt = (e) => Js.call(e), rr = (e) => Gt(e).slice(8, -1), Zs = (e) => Gt(e) === "[object Object]", Kn = (e) => se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ht = /* @__PURE__ */ Ln(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Jt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, or = /-(\w)/g, Ue = Jt((e) => e.replace(or, (t, n) => n ? n.toUpperCase() : "")), lr = /\B([A-Z])/g, ve = Jt((e) => e.replace(lr, "-$1").toLowerCase()), Qs = Jt((e) => e.charAt(0).toUpperCase() + e.slice(1)), un = Jt((e) => e ? `on${Qs(e)}` : ""), Ct = (e, t) => !Object.is(e, t), pn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Kt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, wt = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let _s;
const cr = () => _s || (_s = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let Oe;
class ar {
  constructor(t = !1) {
    this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = Oe, !t && Oe && (this.index = (Oe.scopes || (Oe.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Oe;
      try {
        return Oe = this, t();
      } finally {
        Oe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Oe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Oe = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this.active = !1;
    }
  }
}
function fr(e, t = Oe) {
  t && t.active && t.effects.push(e);
}
const Wn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, ei = (e) => (e.w & ze) > 0, ti = (e) => (e.n & ze) > 0, ur = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ze;
}, pr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      ei(i) && !ti(i) ? i.delete(e) : t[n++] = i, i.w &= ~ze, i.n &= ~ze;
    }
    t.length = n;
  }
}, kn = /* @__PURE__ */ new WeakMap();
let bt = 0, ze = 1;
const xn = 30;
let be;
const tt = Symbol(""), Cn = Symbol("");
class $n {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, fr(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = be, n = Be;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = be, be = this, Be = !0, ze = 1 << ++bt, bt <= xn ? ur(this) : ds(this), this.fn();
    } finally {
      bt <= xn && pr(this), ze = 1 << --bt, be = this.parent, Be = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    be === this ? this.deferStop = !0 : this.active && (ds(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ds(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Be = !0;
const ni = [];
function dt() {
  ni.push(Be), Be = !1;
}
function mt() {
  const e = ni.pop();
  Be = e === void 0 ? !0 : e;
}
function _e(e, t, n) {
  if (Be && be) {
    let s = kn.get(e);
    s || kn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = Wn()), si(i);
  }
}
function si(e, t) {
  let n = !1;
  bt <= xn ? ti(e) || (e.n |= ze, n = !ei(e)) : n = !e.has(be), n && (e.add(be), be.deps.push(e));
}
function Re(e, t, n, s, i, r) {
  const o = kn.get(e);
  if (!o)
    return;
  let l = [];
  if (t === "clear")
    l = [...o.values()];
  else if (n === "length" && D(e)) {
    const a = wt(s);
    o.forEach((u, _) => {
      (_ === "length" || _ >= a) && l.push(u);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), t) {
      case "add":
        D(e) ? Kn(n) && l.push(o.get("length")) : (l.push(o.get(tt)), at(e) && l.push(o.get(Cn)));
        break;
      case "delete":
        D(e) || (l.push(o.get(tt)), at(e) && l.push(o.get(Cn)));
        break;
      case "set":
        at(e) && l.push(o.get(tt));
        break;
    }
  if (l.length === 1)
    l[0] && wn(l[0]);
  else {
    const a = [];
    for (const u of l)
      u && a.push(...u);
    wn(Wn(a));
  }
}
function wn(e, t) {
  const n = D(e) ? e : [...e];
  for (const s of n)
    s.computed && ms(s);
  for (const s of n)
    s.computed || ms(s);
}
function ms(e, t) {
  (e !== be || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const _r = /* @__PURE__ */ Ln("__proto__,__v_isRef,__isVue"), ii = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(zn)
), dr = /* @__PURE__ */ Yn(), mr = /* @__PURE__ */ Yn(!1, !0), gr = /* @__PURE__ */ Yn(!0), gs = /* @__PURE__ */ hr();
function hr() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = P(this);
      for (let r = 0, o = this.length; r < o; r++)
        _e(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(P)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      dt();
      const s = P(this)[t].apply(this, n);
      return mt(), s;
    };
  }), e;
}
function Yn(e = !1, t = !1) {
  return function(s, i, r) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && r === (e ? t ? Mr : ai : t ? ci : li).get(s))
      return s;
    const o = D(s);
    if (!e && o && S(gs, i))
      return Reflect.get(gs, i, r);
    const l = Reflect.get(s, i, r);
    return (zn(i) ? ii.has(i) : _r(i)) || (e || _e(s, "get", i), t) ? l : ne(l) ? o && Kn(i) ? l : l.value : W(l) ? e ? fi(l) : nt(l) : l;
  };
}
const vr = /* @__PURE__ */ ri(), br = /* @__PURE__ */ ri(!0);
function ri(e = !1) {
  return function(n, s, i, r) {
    let o = n[s];
    if (pt(o) && ne(o) && !ne(i))
      return !1;
    if (!e && (!Wt(i) && !pt(i) && (o = P(o), i = P(i)), !D(n) && ne(o) && !ne(i)))
      return o.value = i, !0;
    const l = D(n) && Kn(s) ? Number(s) < n.length : S(n, s), a = Reflect.set(n, s, i, r);
    return n === P(r) && (l ? Ct(i, o) && Re(n, "set", s, i) : Re(n, "add", s, i)), a;
  };
}
function yr(e, t) {
  const n = S(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Re(e, "delete", t, void 0), s;
}
function Er(e, t) {
  const n = Reflect.has(e, t);
  return (!zn(t) || !ii.has(t)) && _e(e, "has", t), n;
}
function kr(e) {
  return _e(e, "iterate", D(e) ? "length" : tt), Reflect.ownKeys(e);
}
const oi = {
  get: dr,
  set: vr,
  deleteProperty: yr,
  has: Er,
  ownKeys: kr
}, xr = {
  get: gr,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Cr = /* @__PURE__ */ ee({}, oi, {
  get: mr,
  set: br
}), Xn = (e) => e, Zt = (e) => Reflect.getPrototypeOf(e);
function Mt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = P(e), r = P(t);
  n || (t !== r && _e(i, "get", t), _e(i, "get", r));
  const { has: o } = Zt(i), l = s ? Xn : n ? Jn : Tt;
  if (o.call(i, t))
    return l(e.get(t));
  if (o.call(i, r))
    return l(e.get(r));
  e !== i && e.get(t);
}
function Rt(e, t = !1) {
  const n = this.__v_raw, s = P(n), i = P(e);
  return t || (e !== i && _e(s, "has", e), _e(s, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Ft(e, t = !1) {
  return e = e.__v_raw, !t && _e(P(e), "iterate", tt), Reflect.get(e, "size", e);
}
function hs(e) {
  e = P(e);
  const t = P(this);
  return Zt(t).has.call(t, e) || (t.add(e), Re(t, "add", e, e)), this;
}
function vs(e, t) {
  t = P(t);
  const n = P(this), { has: s, get: i } = Zt(n);
  let r = s.call(n, e);
  r || (e = P(e), r = s.call(n, e));
  const o = i.call(n, e);
  return n.set(e, t), r ? Ct(t, o) && Re(n, "set", e, t) : Re(n, "add", e, t), this;
}
function bs(e) {
  const t = P(this), { has: n, get: s } = Zt(t);
  let i = n.call(t, e);
  i || (e = P(e), i = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return i && Re(t, "delete", e, void 0), r;
}
function ys() {
  const e = P(this), t = e.size !== 0, n = e.clear();
  return t && Re(e, "clear", void 0, void 0), n;
}
function St(e, t) {
  return function(s, i) {
    const r = this, o = r.__v_raw, l = P(o), a = t ? Xn : e ? Jn : Tt;
    return !e && _e(l, "iterate", tt), o.forEach((u, _) => s.call(i, a(u), a(_), r));
  };
}
function Pt(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = P(i), o = at(r), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, u = i[e](...s), _ = n ? Xn : t ? Jn : Tt;
    return !t && _e(r, "iterate", a ? Cn : tt), {
      // iterator protocol
      next() {
        const { value: g, done: v } = u.next();
        return v ? { value: g, done: v } : {
          value: l ? [_(g[0]), _(g[1])] : _(g),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Pe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function wr() {
  const e = {
    get(r) {
      return Mt(this, r);
    },
    get size() {
      return Ft(this);
    },
    has: Rt,
    add: hs,
    set: vs,
    delete: bs,
    clear: ys,
    forEach: St(!1, !1)
  }, t = {
    get(r) {
      return Mt(this, r, !1, !0);
    },
    get size() {
      return Ft(this);
    },
    has: Rt,
    add: hs,
    set: vs,
    delete: bs,
    clear: ys,
    forEach: St(!1, !0)
  }, n = {
    get(r) {
      return Mt(this, r, !0);
    },
    get size() {
      return Ft(this, !0);
    },
    has(r) {
      return Rt.call(this, r, !0);
    },
    add: Pe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Pe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Pe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Pe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: St(!0, !1)
  }, s = {
    get(r) {
      return Mt(this, r, !0, !0);
    },
    get size() {
      return Ft(this, !0);
    },
    has(r) {
      return Rt.call(this, r, !0);
    },
    add: Pe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Pe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Pe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Pe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: St(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Pt(r, !1, !1), n[r] = Pt(r, !0, !1), t[r] = Pt(r, !1, !0), s[r] = Pt(r, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [Tr, Or, Ar, Dr] = /* @__PURE__ */ wr();
function qn(e, t) {
  const n = t ? e ? Dr : Ar : e ? Or : Tr;
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(S(n, i) && i in s ? n : s, i, r);
}
const Ir = {
  get: /* @__PURE__ */ qn(!1, !1)
}, Nr = {
  get: /* @__PURE__ */ qn(!1, !0)
}, Ur = {
  get: /* @__PURE__ */ qn(!0, !1)
}, li = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap();
function Rr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Fr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Rr(rr(e));
}
function nt(e) {
  return pt(e) ? e : Gn(e, !1, oi, Ir, li);
}
function Sr(e) {
  return Gn(e, !1, Cr, Nr, ci);
}
function fi(e) {
  return Gn(e, !0, xr, Ur, ai);
}
function Gn(e, t, n, s, i) {
  if (!W(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = Fr(e);
  if (o === 0)
    return e;
  const l = new Proxy(e, o === 2 ? s : n);
  return i.set(e, l), l;
}
function ft(e) {
  return pt(e) ? ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
function pt(e) {
  return !!(e && e.__v_isReadonly);
}
function Wt(e) {
  return !!(e && e.__v_isShallow);
}
function ui(e) {
  return ft(e) || pt(e);
}
function P(e) {
  const t = e && e.__v_raw;
  return t ? P(t) : e;
}
function pi(e) {
  return Kt(e, "__v_skip", !0), e;
}
const Tt = (e) => W(e) ? nt(e) : e, Jn = (e) => W(e) ? fi(e) : e;
function _i(e) {
  Be && be && (e = P(e), si(e.dep || (e.dep = Wn())));
}
function di(e, t) {
  e = P(e), e.dep && wn(e.dep);
}
function ne(e) {
  return !!(e && e.__v_isRef === !0);
}
function Tn(e) {
  return Pr(e, !1);
}
function Pr(e, t) {
  return ne(e) ? e : new Lr(e, t);
}
class Lr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : P(t), this._value = n ? t : Tt(t);
  }
  get value() {
    return _i(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Wt(t) || pt(t);
    t = n ? t : P(t), Ct(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Tt(t), di(this));
  }
}
function ot(e) {
  return ne(e) ? e.value : e;
}
const jr = {
  get: (e, t, n) => ot(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return ne(i) && !ne(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function mi(e) {
  return ft(e) ? e : new Proxy(e, jr);
}
function Hr(e) {
  const t = D(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Vr(e, n);
  return t;
}
class Br {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function Vr(e, t, n) {
  const s = e[t];
  return ne(s) ? s : new Br(e, t, n);
}
var gi;
class zr {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[gi] = !1, this._dirty = !0, this.effect = new $n(t, () => {
      this._dirty || (this._dirty = !0, di(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = P(this);
    return _i(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
gi = "__v_isReadonly";
function Kr(e, t, n = !1) {
  let s, i;
  const r = M(e);
  return r ? (s = e, i = ke) : (s = e.get, i = e.set), new zr(s, i, r || !i, n);
}
function Ve(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    Qt(r, t, n);
  }
  return i;
}
function me(e, t, n, s) {
  if (M(e)) {
    const r = Ve(e, t, n, s);
    return r && Gs(r) && r.catch((o) => {
      Qt(o, t, n);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(me(e[r], t, n, s));
  return i;
}
function Qt(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy, l = n;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let _ = 0; _ < u.length; _++)
          if (u[_](e, o, l) === !1)
            return;
      }
      r = r.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Ve(a, null, 10, [e, o, l]);
      return;
    }
  }
  Wr(e, n, i, s);
}
function Wr(e, t, n, s = !0) {
  console.error(e);
}
let Ot = !1, On = !1;
const re = [];
let De = 0;
const ut = [];
let Ne = null, Ze = 0;
const hi = /* @__PURE__ */ Promise.resolve();
let Zn = null;
function vi(e) {
  const t = Zn || hi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $r(e) {
  let t = De + 1, n = re.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    At(re[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Qn(e) {
  (!re.length || !re.includes(e, Ot && e.allowRecurse ? De + 1 : De)) && (e.id == null ? re.push(e) : re.splice($r(e.id), 0, e), bi());
}
function bi() {
  !Ot && !On && (On = !0, Zn = hi.then(Ei));
}
function Yr(e) {
  const t = re.indexOf(e);
  t > De && re.splice(t, 1);
}
function Xr(e) {
  D(e) ? ut.push(...e) : (!Ne || !Ne.includes(e, e.allowRecurse ? Ze + 1 : Ze)) && ut.push(e), bi();
}
function Es(e, t = Ot ? De + 1 : 0) {
  for (; t < re.length; t++) {
    const n = re[t];
    n && n.pre && (re.splice(t, 1), t--, n());
  }
}
function yi(e) {
  if (ut.length) {
    const t = [...new Set(ut)];
    if (ut.length = 0, Ne) {
      Ne.push(...t);
      return;
    }
    for (Ne = t, Ne.sort((n, s) => At(n) - At(s)), Ze = 0; Ze < Ne.length; Ze++)
      Ne[Ze]();
    Ne = null, Ze = 0;
  }
}
const At = (e) => e.id == null ? 1 / 0 : e.id, qr = (e, t) => {
  const n = At(e) - At(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Ei(e) {
  On = !1, Ot = !0, re.sort(qr);
  const t = ke;
  try {
    for (De = 0; De < re.length; De++) {
      const n = re[De];
      n && n.active !== !1 && Ve(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    De = 0, re.length = 0, yi(), Ot = !1, Zn = null, (re.length || ut.length) && Ei();
  }
}
function Gr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || K;
  let i = n;
  const r = t.startsWith("update:"), o = r && t.slice(7);
  if (o && o in s) {
    const _ = `${o === "modelValue" ? "model" : o}Modifiers`, { number: g, trim: v } = s[_] || K;
    v && (i = n.map((C) => se(C) ? C.trim() : C)), g && (i = n.map(wt));
  }
  let l, a = s[l = un(t)] || // also try camelCase event handler (#2249)
  s[l = un(Ue(t))];
  !a && r && (a = s[l = un(ve(t))]), a && me(a, e, 6, i);
  const u = s[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, me(u, e, 6, i);
  }
}
function ki(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, l = !1;
  if (!M(e)) {
    const a = (u) => {
      const _ = ki(u, t, !0);
      _ && (l = !0, ee(o, _));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !l ? (W(e) && s.set(e, null), null) : (D(r) ? r.forEach((a) => o[a] = null) : ee(o, r), W(e) && s.set(e, o), o);
}
function en(e, t) {
  return !e || !qt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), S(e, t[0].toLowerCase() + t.slice(1)) || S(e, ve(t)) || S(e, t));
}
let ce = null, xi = null;
function $t(e) {
  const t = ce;
  return ce = e, xi = e && e.type.__scopeId || null, t;
}
function Ci(e, t = ce, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && Ns(-1);
    const r = $t(t);
    let o;
    try {
      o = e(...i);
    } finally {
      $t(r), s._d && Ns(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function _n(e) {
  const { type: t, vnode: n, proxy: s, withProxy: i, props: r, propsOptions: [o], slots: l, attrs: a, emit: u, render: _, renderCache: g, data: v, setupState: C, ctx: R, inheritAttrs: A } = e;
  let Y, L;
  const oe = $t(e);
  try {
    if (n.shapeFlag & 4) {
      const V = i || s;
      Y = Ae(_.call(V, V, g, r, C, v, R)), L = a;
    } else {
      const V = t;
      Y = Ae(V.length > 1 ? V(r, { attrs: a, slots: l, emit: u }) : V(
        r,
        null
        /* we know it doesn't need it */
      )), L = t.props ? a : Jr(a);
    }
  } catch (V) {
    kt.length = 0, Qt(
      V,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), Y = Q(ge);
  }
  let N = Y;
  if (L && A !== !1) {
    const V = Object.keys(L), { shapeFlag: J } = N;
    V.length && J & 7 && (o && V.some(Bn) && (L = Zr(L, o)), N = Ke(N, L));
  }
  return n.dirs && (N = Ke(N), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && (N.transition = n.transition), Y = N, $t(oe), Y;
}
const Jr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || qt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Zr = (e, t) => {
  const n = {};
  for (const s in e)
    (!Bn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Qr(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: l, patchFlag: a } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ks(s, o, u) : !!o;
    if (a & 8) {
      const _ = t.dynamicProps;
      for (let g = 0; g < _.length; g++) {
        const v = _[g];
        if (o[v] !== s[v] && !en(u, v))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? ks(s, o, u) : !0 : !!o;
  return !1;
}
function ks(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !en(n, r))
      return !0;
  }
  return !1;
}
function eo({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const to = (e) => e.__isSuspense;
function no(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Xr(e);
}
function so(e, t) {
  if (te) {
    let n = te.provides;
    const s = te.parent && te.parent.provides;
    s === n && (n = te.provides = Object.create(s)), n[e] = t;
  }
}
function Bt(e, t, n = !1) {
  const s = te || ce;
  if (s) {
    const i = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && M(t) ? t.call(s.proxy) : t;
  }
}
function io(e, t) {
  return es(e, null, { flush: "post" });
}
const Lt = {};
function dn(e, t, n) {
  return es(e, t, n);
}
function es(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = K) {
  const l = te;
  let a, u = !1, _ = !1;
  if (ne(e) ? (a = () => e.value, u = Wt(e)) : ft(e) ? (a = () => e, s = !0) : D(e) ? (_ = !0, u = e.some((N) => ft(N) || Wt(N)), a = () => e.map((N) => {
    if (ne(N))
      return N.value;
    if (ft(N))
      return lt(N);
    if (M(N))
      return Ve(
        N,
        l,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : M(e) ? t ? a = () => Ve(
    e,
    l,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : a = () => {
    if (!(l && l.isUnmounted))
      return g && g(), me(e, l, 3, [v]);
  } : a = ke, t && s) {
    const N = a;
    a = () => lt(N());
  }
  let g, v = (N) => {
    g = L.onStop = () => {
      Ve(
        N,
        l,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, C;
  if (It)
    if (v = ke, t ? n && me(t, l, 3, [
      a(),
      _ ? [] : void 0,
      v
    ]) : a(), i === "sync") {
      const N = Zo();
      C = N.__watcherHandles || (N.__watcherHandles = []);
    } else
      return ke;
  let R = _ ? new Array(e.length).fill(Lt) : Lt;
  const A = () => {
    if (L.active)
      if (t) {
        const N = L.run();
        (s || u || (_ ? N.some((V, J) => Ct(V, R[J])) : Ct(N, R))) && (g && g(), me(t, l, 3, [
          N,
          // pass undefined as the old value when it's changed for the first time
          R === Lt ? void 0 : _ && R[0] === Lt ? [] : R,
          v
        ]), R = N);
      } else
        L.run();
  };
  A.allowRecurse = !!t;
  let Y;
  i === "sync" ? Y = A : i === "post" ? Y = () => ae(A, l && l.suspense) : (A.pre = !0, l && (A.id = l.uid), Y = () => Qn(A));
  const L = new $n(a, Y);
  t ? n ? A() : R = L.run() : i === "post" ? ae(L.run.bind(L), l && l.suspense) : L.run();
  const oe = () => {
    L.stop(), l && l.scope && Vn(l.scope.effects, L);
  };
  return C && C.push(oe), oe;
}
function ro(e, t, n) {
  const s = this.proxy, i = se(e) ? e.includes(".") ? wi(s, e) : () => s[e] : e.bind(s, s);
  let r;
  M(t) ? r = t : (r = t.handler, n = t);
  const o = te;
  _t(this);
  const l = es(i, r.bind(s), n);
  return o ? _t(o) : st(), l;
}
function wi(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function lt(e, t) {
  if (!W(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ne(e))
    lt(e.value, t);
  else if (D(e))
    for (let n = 0; n < e.length; n++)
      lt(e[n], t);
  else if (qs(e) || at(e))
    e.forEach((n) => {
      lt(n, t);
    });
  else if (Zs(e))
    for (const n in e)
      lt(e[n], t);
  return e;
}
function oo() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return rn(() => {
    e.isMounted = !0;
  }), Ii(() => {
    e.isUnmounting = !0;
  }), e;
}
const de = [Function, Array], lo = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: de,
    onEnter: de,
    onAfterEnter: de,
    onEnterCancelled: de,
    // leave
    onBeforeLeave: de,
    onLeave: de,
    onAfterLeave: de,
    onLeaveCancelled: de,
    // appear
    onBeforeAppear: de,
    onAppear: de,
    onAfterAppear: de,
    onAppearCancelled: de
  },
  setup(e, { slots: t }) {
    const n = Ki(), s = oo();
    let i;
    return () => {
      const r = t.default && Ai(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const A of r)
          if (A.type !== ge) {
            o = A;
            break;
          }
      }
      const l = P(e), { mode: a } = l;
      if (s.isLeaving)
        return mn(o);
      const u = xs(o);
      if (!u)
        return mn(o);
      const _ = An(u, l, s, n);
      Dn(u, _);
      const g = n.subTree, v = g && xs(g);
      let C = !1;
      const { getTransitionKey: R } = u.type;
      if (R) {
        const A = R();
        i === void 0 ? i = A : A !== i && (i = A, C = !0);
      }
      if (v && v.type !== ge && (!Qe(u, v) || C)) {
        const A = An(v, l, s, n);
        if (Dn(v, A), a === "out-in")
          return s.isLeaving = !0, A.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, mn(o);
        a === "in-out" && u.type !== ge && (A.delayLeave = (Y, L, oe) => {
          const N = Oi(s, v);
          N[String(v.key)] = v, Y._leaveCb = () => {
            L(), Y._leaveCb = void 0, delete _.delayedLeave;
          }, _.delayedLeave = oe;
        });
      }
      return o;
    };
  }
}, Ti = lo;
function Oi(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function An(e, t, n, s) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: l, onEnter: a, onAfterEnter: u, onEnterCancelled: _, onBeforeLeave: g, onLeave: v, onAfterLeave: C, onLeaveCancelled: R, onBeforeAppear: A, onAppear: Y, onAfterAppear: L, onAppearCancelled: oe } = t, N = String(e.key), V = Oi(n, e), J = (U, X) => {
    U && me(U, s, 9, X);
  }, Se = (U, X) => {
    const z = X[1];
    J(U, X), D(U) ? U.every((ie) => ie.length <= 1) && z() : U.length <= 1 && z();
  }, xe = {
    mode: r,
    persisted: o,
    beforeEnter(U) {
      let X = l;
      if (!n.isMounted)
        if (i)
          X = A || l;
        else
          return;
      U._leaveCb && U._leaveCb(
        !0
        /* cancelled */
      );
      const z = V[N];
      z && Qe(e, z) && z.el._leaveCb && z.el._leaveCb(), J(X, [U]);
    },
    enter(U) {
      let X = a, z = u, ie = _;
      if (!n.isMounted)
        if (i)
          X = Y || a, z = L || u, ie = oe || _;
        else
          return;
      let w = !1;
      const $ = U._enterCb = (ue) => {
        w || (w = !0, ue ? J(ie, [U]) : J(z, [U]), xe.delayedLeave && xe.delayedLeave(), U._enterCb = void 0);
      };
      X ? Se(X, [U, $]) : $();
    },
    leave(U, X) {
      const z = String(e.key);
      if (U._enterCb && U._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      J(g, [U]);
      let ie = !1;
      const w = U._leaveCb = ($) => {
        ie || (ie = !0, X(), $ ? J(R, [U]) : J(C, [U]), U._leaveCb = void 0, V[z] === e && delete V[z]);
      };
      V[z] = e, v ? Se(v, [U, w]) : w();
    },
    clone(U) {
      return An(U, t, n, s);
    }
  };
  return xe;
}
function mn(e) {
  if (nn(e))
    return e = Ke(e), e.children = null, e;
}
function xs(e) {
  return nn(e) ? e.children ? e.children[0] : void 0 : e;
}
function Dn(e, t) {
  e.shapeFlag & 6 && e.component ? Dn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ai(e, t = !1, n) {
  let s = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === fe ? (o.patchFlag & 128 && i++, s = s.concat(Ai(o.children, t, l))) : (t || o.type !== ge) && s.push(l != null ? Ke(o, { key: l }) : o);
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
function tn(e) {
  return M(e) ? { setup: e, name: e.name } : e;
}
const yt = (e) => !!e.type.__asyncLoader, nn = (e) => e.type.__isKeepAlive;
function co(e, t) {
  Di(e, "a", t);
}
function ao(e, t) {
  Di(e, "da", t);
}
function Di(e, t, n = te) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (sn(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      nn(i.parent.vnode) && fo(s, t, n, i), i = i.parent;
  }
}
function fo(e, t, n, s) {
  const i = sn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  ts(() => {
    Vn(s[t], i);
  }, n);
}
function sn(e, t, n = te, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      dt(), _t(n);
      const l = me(t, n, e, o);
      return st(), mt(), l;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Fe = (e) => (t, n = te) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!It || e === "sp") && sn(e, (...s) => t(...s), n)
), uo = Fe(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), rn = Fe(
  "m"
  /* LifecycleHooks.MOUNTED */
), po = Fe(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), _o = Fe(
  "u"
  /* LifecycleHooks.UPDATED */
), Ii = Fe(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), ts = Fe(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), mo = Fe(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), go = Fe(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), ho = Fe(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function vo(e, t = te) {
  sn("ec", e, t);
}
function Ye(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[s];
    a && (dt(), me(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), mt());
  }
}
const bo = Symbol();
function Cs(e, t, n = {}, s, i) {
  if (ce.isCE || ce.parent && yt(ce.parent) && ce.parent.isCE)
    return t !== "default" && (n.name = t), Q("slot", n, s && s());
  let r = e[t];
  r && r._c && (r._d = !1), Me();
  const o = r && Ni(r(n)), l = ln(
    fe,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      o && o.key || `_${t}`
    },
    o || (s ? s() : []),
    o && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), r && r._c && (r._d = !0), l;
}
function Ni(e) {
  return e.some((t) => Xt(t) ? !(t.type === ge || t.type === fe && !Ni(t.children)) : !0) ? e : null;
}
const In = (e) => e ? Wi(e) ? rs(e) || e.proxy : In(e.parent) : null, Et = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => In(e.parent),
    $root: (e) => In(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ns(e),
    $forceUpdate: (e) => e.f || (e.f = () => Qn(e.update)),
    $nextTick: (e) => e.n || (e.n = vi.bind(e.proxy)),
    $watch: (e) => ro.bind(e)
  })
), gn = (e, t) => e !== K && !e.__isScriptSetup && S(e, t), yo = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const C = o[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (gn(s, t))
          return o[t] = 1, s[t];
        if (i !== K && S(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && S(u, t)
        )
          return o[t] = 3, r[t];
        if (n !== K && S(n, t))
          return o[t] = 4, n[t];
        Nn && (o[t] = 0);
      }
    }
    const _ = Et[t];
    let g, v;
    if (_)
      return t === "$attrs" && _e(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (g = l.__cssModules) && (g = g[t])
    )
      return g;
    if (n !== K && S(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      v = a.config.globalProperties, S(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return gn(i, t) ? (i[t] = n, !0) : s !== K && S(s, t) ? (s[t] = n, !0) : S(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r } }, o) {
    let l;
    return !!n[o] || e !== K && S(e, o) || gn(t, o) || (l = r[0]) && S(l, o) || S(s, o) || S(Et, o) || S(i.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : S(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let Nn = !0;
function Eo(e) {
  const t = ns(e), n = e.proxy, s = e.ctx;
  Nn = !1, t.beforeCreate && ws(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: _,
    beforeMount: g,
    mounted: v,
    beforeUpdate: C,
    updated: R,
    activated: A,
    deactivated: Y,
    beforeDestroy: L,
    beforeUnmount: oe,
    destroyed: N,
    unmounted: V,
    render: J,
    renderTracked: Se,
    renderTriggered: xe,
    errorCaptured: U,
    serverPrefetch: X,
    // public API
    expose: z,
    inheritAttrs: ie,
    // assets
    components: w,
    directives: $,
    filters: ue
  } = t;
  if (u && ko(u, s, null, e.appContext.config.unwrapInjectedRef), o)
    for (const q in o) {
      const H = o[q];
      M(H) && (s[q] = H.bind(n));
    }
  if (i) {
    const q = i.call(n, n);
    W(q) && (e.data = nt(q));
  }
  if (Nn = !0, r)
    for (const q in r) {
      const H = r[q], We = M(H) ? H.bind(n, n) : M(H.get) ? H.get.bind(n, n) : ke, Nt = !M(H) && M(H.set) ? H.set.bind(n) : ke, $e = qo({
        get: We,
        set: Nt
      });
      Object.defineProperty(s, q, {
        enumerable: !0,
        configurable: !0,
        get: () => $e.value,
        set: (Ce) => $e.value = Ce
      });
    }
  if (l)
    for (const q in l)
      Ui(l[q], s, n, q);
  if (a) {
    const q = M(a) ? a.call(n) : a;
    Reflect.ownKeys(q).forEach((H) => {
      so(H, q[H]);
    });
  }
  _ && ws(
    _,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function Z(q, H) {
    D(H) ? H.forEach((We) => q(We.bind(n))) : H && q(H.bind(n));
  }
  if (Z(uo, g), Z(rn, v), Z(po, C), Z(_o, R), Z(co, A), Z(ao, Y), Z(vo, U), Z(ho, Se), Z(go, xe), Z(Ii, oe), Z(ts, V), Z(mo, X), D(z))
    if (z.length) {
      const q = e.exposed || (e.exposed = {});
      z.forEach((H) => {
        Object.defineProperty(q, H, {
          get: () => n[H],
          set: (We) => n[H] = We
        });
      });
    } else
      e.exposed || (e.exposed = {});
  J && e.render === ke && (e.render = J), ie != null && (e.inheritAttrs = ie), w && (e.components = w), $ && (e.directives = $);
}
function ko(e, t, n = ke, s = !1) {
  D(e) && (e = Un(e));
  for (const i in e) {
    const r = e[i];
    let o;
    W(r) ? "default" in r ? o = Bt(
      r.from || i,
      r.default,
      !0
      /* treat default function as factory */
    ) : o = Bt(r.from || i) : o = Bt(r), ne(o) && s ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (l) => o.value = l
    }) : t[i] = o;
  }
}
function ws(e, t, n) {
  me(D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ui(e, t, n, s) {
  const i = s.includes(".") ? wi(n, s) : () => n[s];
  if (se(e)) {
    const r = t[e];
    M(r) && dn(i, r);
  } else if (M(e))
    dn(i, e.bind(n));
  else if (W(e))
    if (D(e))
      e.forEach((r) => Ui(r, t, n, s));
    else {
      const r = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(r) && dn(i, r, e);
    }
}
function ns(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: i, optionsCache: r, config: { optionMergeStrategies: o } } = e.appContext, l = r.get(t);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach((u) => Yt(a, u, o, !0)), Yt(a, t, o)), W(t) && r.set(t, a), a;
}
function Yt(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Yt(e, r, n, !0), i && i.forEach((o) => Yt(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = xo[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const xo = {
  data: Ts,
  props: Je,
  emits: Je,
  // objects
  methods: Je,
  computed: Je,
  // lifecycle
  beforeCreate: le,
  created: le,
  beforeMount: le,
  mounted: le,
  beforeUpdate: le,
  updated: le,
  beforeDestroy: le,
  beforeUnmount: le,
  destroyed: le,
  unmounted: le,
  activated: le,
  deactivated: le,
  errorCaptured: le,
  serverPrefetch: le,
  // assets
  components: Je,
  directives: Je,
  // watch
  watch: wo,
  // provide / inject
  provide: Ts,
  inject: Co
};
function Ts(e, t) {
  return t ? e ? function() {
    return ee(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
  } : t : e;
}
function Co(e, t) {
  return Je(Un(e), Un(t));
}
function Un(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Je(e, t) {
  return e ? ee(ee(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function wo(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = le(e[s], t[s]);
  return n;
}
function To(e, t, n, s = !1) {
  const i = {}, r = {};
  Kt(r, cn, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Mi(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : Sr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Oo(e, t, n, s) {
  const { props: i, attrs: r, vnode: { patchFlag: o } } = e, l = P(i), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const _ = e.vnode.dynamicProps;
      for (let g = 0; g < _.length; g++) {
        let v = _[g];
        if (en(e.emitsOptions, v))
          continue;
        const C = t[v];
        if (a)
          if (S(r, v))
            C !== r[v] && (r[v] = C, u = !0);
          else {
            const R = Ue(v);
            i[R] = Mn(
              a,
              l,
              R,
              C,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          C !== r[v] && (r[v] = C, u = !0);
      }
    }
  } else {
    Mi(e, t, i, r) && (u = !0);
    let _;
    for (const g in l)
      (!t || // for camelCase
      !S(t, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = ve(g)) === g || !S(t, _))) && (a ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[_] !== void 0) && (i[g] = Mn(
        a,
        l,
        g,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[g]);
    if (r !== l)
      for (const g in r)
        (!t || !S(t, g)) && (delete r[g], u = !0);
  }
  u && Re(e, "set", "$attrs");
}
function Mi(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Ht(a))
        continue;
      const u = t[a];
      let _;
      i && S(i, _ = Ue(a)) ? !r || !r.includes(_) ? n[_] = u : (l || (l = {}))[_] = u : en(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, o = !0);
    }
  if (r) {
    const a = P(n), u = l || K;
    for (let _ = 0; _ < r.length; _++) {
      const g = r[_];
      n[g] = Mn(i, a, g, u[g], e, !S(u, g));
    }
  }
  return o;
}
function Mn(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const l = S(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && M(a)) {
        const { propsDefaults: u } = i;
        n in u ? s = u[n] : (_t(i), s = u[n] = a.call(null, t), st());
      } else
        s = a;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (r && !l ? s = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === ve(n)) && (s = !0));
  }
  return s;
}
function Ri(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, l = [];
  let a = !1;
  if (!M(e)) {
    const _ = (g) => {
      a = !0;
      const [v, C] = Ri(g, t, !0);
      ee(o, v), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!r && !a)
    return W(e) && s.set(e, ct), ct;
  if (D(r))
    for (let _ = 0; _ < r.length; _++) {
      const g = Ue(r[_]);
      Os(g) && (o[g] = K);
    }
  else if (r)
    for (const _ in r) {
      const g = Ue(_);
      if (Os(g)) {
        const v = r[_], C = o[g] = D(v) || M(v) ? { type: v } : Object.assign({}, v);
        if (C) {
          const R = Is(Boolean, C.type), A = Is(String, C.type);
          C[
            0
            /* BooleanFlags.shouldCast */
          ] = R > -1, C[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = A < 0 || R < A, (R > -1 || S(C, "default")) && l.push(g);
        }
      }
    }
  const u = [o, l];
  return W(e) && s.set(e, u), u;
}
function Os(e) {
  return e[0] !== "$";
}
function As(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Ds(e, t) {
  return As(e) === As(t);
}
function Is(e, t) {
  return D(t) ? t.findIndex((n) => Ds(n, e)) : M(t) && Ds(t, e) ? 0 : -1;
}
const Fi = (e) => e[0] === "_" || e === "$stable", ss = (e) => D(e) ? e.map(Ae) : [Ae(e)], Ao = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ci((...i) => ss(t(...i)), n);
  return s._c = !1, s;
}, Si = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Fi(i))
      continue;
    const r = e[i];
    if (M(r))
      t[i] = Ao(i, r, s);
    else if (r != null) {
      const o = ss(r);
      t[i] = () => o;
    }
  }
}, Pi = (e, t) => {
  const n = ss(t);
  e.slots.default = () => n;
}, Do = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = P(t), Kt(t, "_", n)) : Si(t, e.slots = {});
  } else
    e.slots = {}, t && Pi(e, t);
  Kt(e.slots, cn, 1);
}, Io = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = K;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : (ee(i, t), !n && l === 1 && delete i._) : (r = !t.$stable, Si(t, i)), o = t;
  } else
    t && (Pi(e, t), o = { default: 1 });
  if (r)
    for (const l in i)
      !Fi(l) && !(l in o) && delete i[l];
};
function Li() {
  return {
    app: null,
    config: {
      isNativeTag: nr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let No = 0;
function Uo(e, t) {
  return function(s, i = null) {
    M(s) || (s = Object.assign({}, s)), i != null && !W(i) && (i = null);
    const r = Li(), o = /* @__PURE__ */ new Set();
    let l = !1;
    const a = r.app = {
      _uid: No++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Qo,
      get config() {
        return r.config;
      },
      set config(u) {
      },
      use(u, ..._) {
        return o.has(u) || (u && M(u.install) ? (o.add(u), u.install(a, ..._)) : M(u) && (o.add(u), u(a, ..._))), a;
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), a;
      },
      component(u, _) {
        return _ ? (r.components[u] = _, a) : r.components[u];
      },
      directive(u, _) {
        return _ ? (r.directives[u] = _, a) : r.directives[u];
      },
      mount(u, _, g) {
        if (!l) {
          const v = Q(s, i);
          return v.appContext = r, _ && t ? t(v, u) : e(v, u, g), l = !0, a._container = u, u.__vue_app__ = a, rs(v.component) || v.component.proxy;
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, _) {
        return r.provides[u] = _, a;
      }
    };
    return a;
  };
}
function Rn(e, t, n, s, i = !1) {
  if (D(e)) {
    e.forEach((v, C) => Rn(v, t && (D(t) ? t[C] : t), n, s, i));
    return;
  }
  if (yt(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? rs(s.component) || s.component.proxy : s.el, o = i ? null : r, { i: l, r: a } = e, u = t && t.r, _ = l.refs === K ? l.refs = {} : l.refs, g = l.setupState;
  if (u != null && u !== a && (se(u) ? (_[u] = null, S(g, u) && (g[u] = null)) : ne(u) && (u.value = null)), M(a))
    Ve(a, l, 12, [o, _]);
  else {
    const v = se(a), C = ne(a);
    if (v || C) {
      const R = () => {
        if (e.f) {
          const A = v ? S(g, a) ? g[a] : _[a] : a.value;
          i ? D(A) && Vn(A, r) : D(A) ? A.includes(r) || A.push(r) : v ? (_[a] = [r], S(g, a) && (g[a] = _[a])) : (a.value = [r], e.k && (_[e.k] = a.value));
        } else
          v ? (_[a] = o, S(g, a) && (g[a] = o)) : C && (a.value = o, e.k && (_[e.k] = o));
      };
      o ? (R.id = -1, ae(R, n)) : R();
    }
  }
}
const ae = no;
function Mo(e) {
  return Ro(e);
}
function Ro(e, t) {
  const n = cr();
  n.__VUE__ = !0;
  const { insert: s, remove: i, patchProp: r, createElement: o, createText: l, createComment: a, setText: u, setElementText: _, parentNode: g, nextSibling: v, setScopeId: C = ke, insertStaticContent: R } = e, A = (c, f, p, m = null, d = null, y = null, k = !1, b = null, E = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Qe(c, f) && (m = Ut(c), Ce(c, d, y, !0), c = null), f.patchFlag === -2 && (E = !1, f.dynamicChildren = null);
    const { type: h, ref: T, shapeFlag: x } = f;
    switch (h) {
      case on:
        Y(c, f, p, m);
        break;
      case ge:
        L(c, f, p, m);
        break;
      case Vt:
        c == null && oe(f, p, m, k);
        break;
      case fe:
        w(c, f, p, m, d, y, k, b, E);
        break;
      default:
        x & 1 ? J(c, f, p, m, d, y, k, b, E) : x & 6 ? $(c, f, p, m, d, y, k, b, E) : (x & 64 || x & 128) && h.process(c, f, p, m, d, y, k, b, E, it);
    }
    T != null && d && Rn(T, c && c.ref, y, f || c, !f);
  }, Y = (c, f, p, m) => {
    if (c == null)
      s(f.el = l(f.children), p, m);
    else {
      const d = f.el = c.el;
      f.children !== c.children && u(d, f.children);
    }
  }, L = (c, f, p, m) => {
    c == null ? s(f.el = a(f.children || ""), p, m) : f.el = c.el;
  }, oe = (c, f, p, m) => {
    [c.el, c.anchor] = R(c.children, f, p, m, c.el, c.anchor);
  }, N = ({ el: c, anchor: f }, p, m) => {
    let d;
    for (; c && c !== f; )
      d = v(c), s(c, p, m), c = d;
    s(f, p, m);
  }, V = ({ el: c, anchor: f }) => {
    let p;
    for (; c && c !== f; )
      p = v(c), i(c), c = p;
    i(f);
  }, J = (c, f, p, m, d, y, k, b, E) => {
    k = k || f.type === "svg", c == null ? Se(f, p, m, d, y, k, b, E) : X(c, f, d, y, k, b, E);
  }, Se = (c, f, p, m, d, y, k, b) => {
    let E, h;
    const { type: T, props: x, shapeFlag: O, transition: I, dirs: F } = c;
    if (E = c.el = o(c.type, y, x && x.is, x), O & 8 ? _(E, c.children) : O & 16 && U(c.children, E, null, m, d, y && T !== "foreignObject", k, b), F && Ye(c, null, m, "created"), x) {
      for (const j in x)
        j !== "value" && !Ht(j) && r(E, j, null, x[j], y, c.children, m, d, Ie);
      "value" in x && r(E, "value", null, x.value), (h = x.onVnodeBeforeMount) && Te(h, m, c);
    }
    xe(E, c, c.scopeId, k, m), F && Ye(c, null, m, "beforeMount");
    const B = (!d || d && !d.pendingBranch) && I && !I.persisted;
    B && I.beforeEnter(E), s(E, f, p), ((h = x && x.onVnodeMounted) || B || F) && ae(() => {
      h && Te(h, m, c), B && I.enter(E), F && Ye(c, null, m, "mounted");
    }, d);
  }, xe = (c, f, p, m, d) => {
    if (p && C(c, p), m)
      for (let y = 0; y < m.length; y++)
        C(c, m[y]);
    if (d) {
      let y = d.subTree;
      if (f === y) {
        const k = d.vnode;
        xe(c, k, k.scopeId, k.slotScopeIds, d.parent);
      }
    }
  }, U = (c, f, p, m, d, y, k, b, E = 0) => {
    for (let h = E; h < c.length; h++) {
      const T = c[h] = b ? He(c[h]) : Ae(c[h]);
      A(null, T, f, p, m, d, y, k, b);
    }
  }, X = (c, f, p, m, d, y, k) => {
    const b = f.el = c.el;
    let { patchFlag: E, dynamicChildren: h, dirs: T } = f;
    E |= c.patchFlag & 16;
    const x = c.props || K, O = f.props || K;
    let I;
    p && Xe(p, !1), (I = O.onVnodeBeforeUpdate) && Te(I, p, f, c), T && Ye(f, c, p, "beforeUpdate"), p && Xe(p, !0);
    const F = d && f.type !== "foreignObject";
    if (h ? z(c.dynamicChildren, h, b, p, m, F, y) : k || H(c, f, b, null, p, m, F, y, !1), E > 0) {
      if (E & 16)
        ie(b, f, x, O, p, m, d);
      else if (E & 2 && x.class !== O.class && r(b, "class", null, O.class, d), E & 4 && r(b, "style", x.style, O.style, d), E & 8) {
        const B = f.dynamicProps;
        for (let j = 0; j < B.length; j++) {
          const G = B[j], he = x[G], rt = O[G];
          (rt !== he || G === "value") && r(b, G, he, rt, d, c.children, p, m, Ie);
        }
      }
      E & 1 && c.children !== f.children && _(b, f.children);
    } else
      !k && h == null && ie(b, f, x, O, p, m, d);
    ((I = O.onVnodeUpdated) || T) && ae(() => {
      I && Te(I, p, f, c), T && Ye(f, c, p, "updated");
    }, m);
  }, z = (c, f, p, m, d, y, k) => {
    for (let b = 0; b < f.length; b++) {
      const E = c[b], h = f[b], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Qe(E, h) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? g(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      A(E, h, T, null, m, d, y, k, !0);
    }
  }, ie = (c, f, p, m, d, y, k) => {
    if (p !== m) {
      if (p !== K)
        for (const b in p)
          !Ht(b) && !(b in m) && r(c, b, p[b], null, k, f.children, d, y, Ie);
      for (const b in m) {
        if (Ht(b))
          continue;
        const E = m[b], h = p[b];
        E !== h && b !== "value" && r(c, b, h, E, k, f.children, d, y, Ie);
      }
      "value" in m && r(c, "value", p.value, m.value);
    }
  }, w = (c, f, p, m, d, y, k, b, E) => {
    const h = f.el = c ? c.el : l(""), T = f.anchor = c ? c.anchor : l("");
    let { patchFlag: x, dynamicChildren: O, slotScopeIds: I } = f;
    I && (b = b ? b.concat(I) : I), c == null ? (s(h, p, m), s(T, p, m), U(f.children, p, T, d, y, k, b, E)) : x > 0 && x & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (z(c.dynamicChildren, O, p, d, y, k, b), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || d && f === d.subTree) && ji(
      c,
      f,
      !0
      /* shallow */
    )) : H(c, f, p, T, d, y, k, b, E);
  }, $ = (c, f, p, m, d, y, k, b, E) => {
    f.slotScopeIds = b, c == null ? f.shapeFlag & 512 ? d.ctx.activate(f, p, m, k, E) : ue(f, p, m, d, y, k, E) : gt(c, f, E);
  }, ue = (c, f, p, m, d, y, k) => {
    const b = c.component = zo(c, m, d);
    if (nn(c) && (b.ctx.renderer = it), Ko(b), b.asyncDep) {
      if (d && d.registerDep(b, Z), !c.el) {
        const E = b.subTree = Q(ge);
        L(null, E, f, p);
      }
      return;
    }
    Z(b, c, f, p, d, y, k);
  }, gt = (c, f, p) => {
    const m = f.component = c.component;
    if (Qr(c, f, p))
      if (m.asyncDep && !m.asyncResolved) {
        q(m, f, p);
        return;
      } else
        m.next = f, Yr(m.update), m.update();
    else
      f.el = c.el, m.vnode = f;
  }, Z = (c, f, p, m, d, y, k) => {
    const b = () => {
      if (c.isMounted) {
        let { next: T, bu: x, u: O, parent: I, vnode: F } = c, B = T, j;
        Xe(c, !1), T ? (T.el = F.el, q(c, T, k)) : T = F, x && pn(x), (j = T.props && T.props.onVnodeBeforeUpdate) && Te(j, I, T, F), Xe(c, !0);
        const G = _n(c), he = c.subTree;
        c.subTree = G, A(
          he,
          G,
          // parent may have changed if it's in a teleport
          g(he.el),
          // anchor may have changed if it's in a fragment
          Ut(he),
          c,
          d,
          y
        ), T.el = G.el, B === null && eo(c, G.el), O && ae(O, d), (j = T.props && T.props.onVnodeUpdated) && ae(() => Te(j, I, T, F), d);
      } else {
        let T;
        const { el: x, props: O } = f, { bm: I, m: F, parent: B } = c, j = yt(f);
        if (Xe(c, !1), I && pn(I), !j && (T = O && O.onVnodeBeforeMount) && Te(T, B, f), Xe(c, !0), x && fn) {
          const G = () => {
            c.subTree = _n(c), fn(x, c.subTree, c, d, null);
          };
          j ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && G()
          ) : G();
        } else {
          const G = c.subTree = _n(c);
          A(null, G, p, m, c, d, y), f.el = G.el;
        }
        if (F && ae(F, d), !j && (T = O && O.onVnodeMounted)) {
          const G = f;
          ae(() => Te(T, B, G), d);
        }
        (f.shapeFlag & 256 || B && yt(B.vnode) && B.vnode.shapeFlag & 256) && c.a && ae(c.a, d), c.isMounted = !0, f = p = m = null;
      }
    }, E = c.effect = new $n(
      b,
      () => Qn(h),
      c.scope
      // track it in component's effect scope
    ), h = c.update = () => E.run();
    h.id = c.uid, Xe(c, !0), h();
  }, q = (c, f, p) => {
    f.component = c;
    const m = c.vnode.props;
    c.vnode = f, c.next = null, Oo(c, f.props, m, p), Io(c, f.children, p), dt(), Es(), mt();
  }, H = (c, f, p, m, d, y, k, b, E = !1) => {
    const h = c && c.children, T = c ? c.shapeFlag : 0, x = f.children, { patchFlag: O, shapeFlag: I } = f;
    if (O > 0) {
      if (O & 128) {
        Nt(h, x, p, m, d, y, k, b, E);
        return;
      } else if (O & 256) {
        We(h, x, p, m, d, y, k, b, E);
        return;
      }
    }
    I & 8 ? (T & 16 && Ie(h, d, y), x !== h && _(p, x)) : T & 16 ? I & 16 ? Nt(h, x, p, m, d, y, k, b, E) : Ie(h, d, y, !0) : (T & 8 && _(p, ""), I & 16 && U(x, p, m, d, y, k, b, E));
  }, We = (c, f, p, m, d, y, k, b, E) => {
    c = c || ct, f = f || ct;
    const h = c.length, T = f.length, x = Math.min(h, T);
    let O;
    for (O = 0; O < x; O++) {
      const I = f[O] = E ? He(f[O]) : Ae(f[O]);
      A(c[O], I, p, null, d, y, k, b, E);
    }
    h > T ? Ie(c, d, y, !0, !1, x) : U(f, p, m, d, y, k, b, E, x);
  }, Nt = (c, f, p, m, d, y, k, b, E) => {
    let h = 0;
    const T = f.length;
    let x = c.length - 1, O = T - 1;
    for (; h <= x && h <= O; ) {
      const I = c[h], F = f[h] = E ? He(f[h]) : Ae(f[h]);
      if (Qe(I, F))
        A(I, F, p, null, d, y, k, b, E);
      else
        break;
      h++;
    }
    for (; h <= x && h <= O; ) {
      const I = c[x], F = f[O] = E ? He(f[O]) : Ae(f[O]);
      if (Qe(I, F))
        A(I, F, p, null, d, y, k, b, E);
      else
        break;
      x--, O--;
    }
    if (h > x) {
      if (h <= O) {
        const I = O + 1, F = I < T ? f[I].el : m;
        for (; h <= O; )
          A(null, f[h] = E ? He(f[h]) : Ae(f[h]), p, F, d, y, k, b, E), h++;
      }
    } else if (h > O)
      for (; h <= x; )
        Ce(c[h], d, y, !0), h++;
    else {
      const I = h, F = h, B = /* @__PURE__ */ new Map();
      for (h = F; h <= O; h++) {
        const pe = f[h] = E ? He(f[h]) : Ae(f[h]);
        pe.key != null && B.set(pe.key, h);
      }
      let j, G = 0;
      const he = O - F + 1;
      let rt = !1, fs = 0;
      const ht = new Array(he);
      for (h = 0; h < he; h++)
        ht[h] = 0;
      for (h = I; h <= x; h++) {
        const pe = c[h];
        if (G >= he) {
          Ce(pe, d, y, !0);
          continue;
        }
        let we;
        if (pe.key != null)
          we = B.get(pe.key);
        else
          for (j = F; j <= O; j++)
            if (ht[j - F] === 0 && Qe(pe, f[j])) {
              we = j;
              break;
            }
        we === void 0 ? Ce(pe, d, y, !0) : (ht[we - F] = h + 1, we >= fs ? fs = we : rt = !0, A(pe, f[we], p, null, d, y, k, b, E), G++);
      }
      const us = rt ? Fo(ht) : ct;
      for (j = us.length - 1, h = he - 1; h >= 0; h--) {
        const pe = F + h, we = f[pe], ps = pe + 1 < T ? f[pe + 1].el : m;
        ht[h] === 0 ? A(null, we, p, ps, d, y, k, b, E) : rt && (j < 0 || h !== us[j] ? $e(
          we,
          p,
          ps,
          2
          /* MoveType.REORDER */
        ) : j--);
      }
    }
  }, $e = (c, f, p, m, d = null) => {
    const { el: y, type: k, transition: b, children: E, shapeFlag: h } = c;
    if (h & 6) {
      $e(c.component.subTree, f, p, m);
      return;
    }
    if (h & 128) {
      c.suspense.move(f, p, m);
      return;
    }
    if (h & 64) {
      k.move(c, f, p, it);
      return;
    }
    if (k === fe) {
      s(y, f, p);
      for (let x = 0; x < E.length; x++)
        $e(E[x], f, p, m);
      s(c.anchor, f, p);
      return;
    }
    if (k === Vt) {
      N(c, f, p);
      return;
    }
    if (m !== 2 && h & 1 && b)
      if (m === 0)
        b.beforeEnter(y), s(y, f, p), ae(() => b.enter(y), d);
      else {
        const { leave: x, delayLeave: O, afterLeave: I } = b, F = () => s(y, f, p), B = () => {
          x(y, () => {
            F(), I && I();
          });
        };
        O ? O(y, F, B) : B();
      }
    else
      s(y, f, p);
  }, Ce = (c, f, p, m = !1, d = !1) => {
    const { type: y, props: k, ref: b, children: E, dynamicChildren: h, shapeFlag: T, patchFlag: x, dirs: O } = c;
    if (b != null && Rn(b, null, p, c, !0), T & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const I = T & 1 && O, F = !yt(c);
    let B;
    if (F && (B = k && k.onVnodeBeforeUnmount) && Te(B, f, c), T & 6)
      qi(c.component, p, m);
    else {
      if (T & 128) {
        c.suspense.unmount(p, m);
        return;
      }
      I && Ye(c, null, f, "beforeUnmount"), T & 64 ? c.type.remove(c, f, p, d, it, m) : h && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== fe || x > 0 && x & 64) ? Ie(h, f, p, !1, !0) : (y === fe && x & 384 || !d && T & 16) && Ie(E, f, p), m && cs(c);
    }
    (F && (B = k && k.onVnodeUnmounted) || I) && ae(() => {
      B && Te(B, f, c), I && Ye(c, null, f, "unmounted");
    }, p);
  }, cs = (c) => {
    const { type: f, el: p, anchor: m, transition: d } = c;
    if (f === fe) {
      Xi(p, m);
      return;
    }
    if (f === Vt) {
      V(c);
      return;
    }
    const y = () => {
      i(p), d && !d.persisted && d.afterLeave && d.afterLeave();
    };
    if (c.shapeFlag & 1 && d && !d.persisted) {
      const { leave: k, delayLeave: b } = d, E = () => k(p, y);
      b ? b(c.el, y, E) : E();
    } else
      y();
  }, Xi = (c, f) => {
    let p;
    for (; c !== f; )
      p = v(c), i(c), c = p;
    i(f);
  }, qi = (c, f, p) => {
    const { bum: m, scope: d, update: y, subTree: k, um: b } = c;
    m && pn(m), d.stop(), y && (y.active = !1, Ce(k, c, f, p)), b && ae(b, f), ae(() => {
      c.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Ie = (c, f, p, m = !1, d = !1, y = 0) => {
    for (let k = y; k < c.length; k++)
      Ce(c[k], f, p, m, d);
  }, Ut = (c) => c.shapeFlag & 6 ? Ut(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : v(c.anchor || c.el), as = (c, f, p) => {
    c == null ? f._vnode && Ce(f._vnode, null, null, !0) : A(f._vnode || null, c, f, null, null, null, p), Es(), yi(), f._vnode = c;
  }, it = {
    p: A,
    um: Ce,
    m: $e,
    r: cs,
    mt: ue,
    mc: U,
    pc: H,
    pbc: z,
    n: Ut,
    o: e
  };
  let an, fn;
  return t && ([an, fn] = t(it)), {
    render: as,
    hydrate: an,
    createApp: Uo(as, an)
  };
}
function Xe({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ji(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (D(s) && D(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = He(i[r]), l.el = o.el), n || ji(o, l)), l.type === on && (l.el = o.el);
    }
}
function Fo(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, e[n[l]] < u ? r = l + 1 : o = l;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
const So = (e) => e.__isTeleport, fe = Symbol(void 0), on = Symbol(void 0), ge = Symbol(void 0), Vt = Symbol(void 0), kt = [];
let ye = null;
function Me(e = !1) {
  kt.push(ye = e ? null : []);
}
function Po() {
  kt.pop(), ye = kt[kt.length - 1] || null;
}
let Dt = 1;
function Ns(e) {
  Dt += e;
}
function Hi(e) {
  return e.dynamicChildren = Dt > 0 ? ye || ct : null, Po(), Dt > 0 && ye && ye.push(e), e;
}
function xt(e, t, n, s, i, r) {
  return Hi(Ee(
    e,
    t,
    n,
    s,
    i,
    r,
    !0
    /* isBlock */
  ));
}
function ln(e, t, n, s, i) {
  return Hi(Q(
    e,
    t,
    n,
    s,
    i,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Xt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Qe(e, t) {
  return e.type === t.type && e.key === t.key;
}
const cn = "__vInternal", Bi = ({ key: e }) => e ?? null, zt = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? se(e) || ne(e) || M(e) ? { i: ce, r: e, k: t, f: !!n } : e : null;
function Ee(e, t = null, n = null, s = 0, i = null, r = e === fe ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Bi(t),
    ref: t && zt(t),
    scopeId: xi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: ce
  };
  return l ? (is(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= se(n) ? 8 : 16), Dt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ye && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ye.push(a), a;
}
const Q = Lo;
function Lo(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === bo) && (e = ge), Xt(e)) {
    const l = Ke(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && is(l, n), Dt > 0 && !r && ye && (l.shapeFlag & 6 ? ye[ye.indexOf(e)] = l : ye.push(l)), l.patchFlag |= -2, l;
  }
  if (Xo(e) && (e = e.__vccOpts), t) {
    t = jo(t);
    let { class: l, style: a } = t;
    l && !se(l) && (t.class = Hn(l)), W(a) && (ui(a) && !D(a) && (a = ee({}, a)), t.style = jn(a));
  }
  const o = se(e) ? 1 : to(e) ? 128 : So(e) ? 64 : W(e) ? 4 : M(e) ? 2 : 0;
  return Ee(e, t, n, s, i, o, r, !0);
}
function jo(e) {
  return e ? ui(e) || cn in e ? ee({}, e) : e : null;
}
function Ke(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = e, l = t ? Ho(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Bi(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? D(i) ? i.concat(zt(t)) : [i, zt(t)] : zt(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== fe ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ke(e.ssContent),
    ssFallback: e.ssFallback && Ke(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function Vi(e = " ", t = 0) {
  return Q(on, null, e, t);
}
function zi(e = "", t = !1) {
  return t ? (Me(), ln(ge, null, e)) : Q(ge, null, e);
}
function Ae(e) {
  return e == null || typeof e == "boolean" ? Q(ge) : D(e) ? Q(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? He(e) : Q(on, null, String(e));
}
function He(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ke(e);
}
function is(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (D(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), is(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(cn in t) ? t._ctx = ce : i === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    M(t) ? (t = { default: t, _ctx: ce }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Vi(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ho(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Hn([t.class, s.class]));
      else if (i === "style")
        t.style = jn([t.style, s.style]);
      else if (qt(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(D(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Te(e, t, n, s = null) {
  me(e, t, 7, [
    n,
    s
  ]);
}
const Bo = Li();
let Vo = 0;
function zo(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Bo, r = {
    uid: Vo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new ar(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ri(s, i),
    emitsOptions: ki(s, i),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: K,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: K,
    data: K,
    props: K,
    attrs: K,
    slots: K,
    refs: K,
    setupState: K,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Gr.bind(null, r), e.ce && e.ce(r), r;
}
let te = null;
const Ki = () => te || ce, _t = (e) => {
  te = e, e.scope.on();
}, st = () => {
  te && te.scope.off(), te = null;
};
function Wi(e) {
  return e.vnode.shapeFlag & 4;
}
let It = !1;
function Ko(e, t = !1) {
  It = t;
  const { props: n, children: s } = e.vnode, i = Wi(e);
  To(e, n, i, t), Do(e, s);
  const r = i ? Wo(e, t) : void 0;
  return It = !1, r;
}
function Wo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = pi(new Proxy(e.ctx, yo));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? Yo(e) : null;
    _t(e), dt();
    const r = Ve(s, e, 0, [e.props, i]);
    if (mt(), st(), Gs(r)) {
      if (r.then(st, st), t)
        return r.then((o) => {
          Us(e, o, t);
        }).catch((o) => {
          Qt(
            o,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = r;
    } else
      Us(e, r, t);
  } else
    $i(e, t);
}
function Us(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) && (e.setupState = mi(t)), $i(e, n);
}
let Ms;
function $i(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ms && !s.render) {
      const i = s.template || ns(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: l, compilerOptions: a } = s, u = ee(ee({
          isCustomElement: r,
          delimiters: l
        }, o), a);
        s.render = Ms(i, u);
      }
    }
    e.render = s.render || ke;
  }
  _t(e), dt(), Eo(e), mt(), st();
}
function $o(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return _e(e, "get", "$attrs"), t[n];
    }
  });
}
function Yo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = $o(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function rs(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(mi(pi(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Et)
          return Et[n](e);
      },
      has(t, n) {
        return n in t || n in Et;
      }
    }));
}
function Xo(e) {
  return M(e) && "__vccOpts" in e;
}
const qo = (e, t) => Kr(e, t, It);
function Go(e, t, n) {
  const s = arguments.length;
  return s === 2 ? W(t) && !D(t) ? Xt(t) ? Q(e, null, [t]) : Q(e, t) : Q(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Xt(n) && (n = [n]), Q(e, t, n));
}
const Jo = Symbol(""), Zo = () => Bt(Jo), Qo = "3.2.45", el = "http://www.w3.org/2000/svg", et = typeof document < "u" ? document : null, Rs = et && /* @__PURE__ */ et.createElement("template"), tl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? et.createElementNS(el, e) : et.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => et.createTextNode(e),
  createComment: (e) => et.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => et.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      Rs.innerHTML = s ? `<svg>${e}</svg>` : e;
      const l = Rs.content;
      if (s) {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function nl(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function sl(e, t, n) {
  const s = e.style, i = se(n);
  if (n && !i) {
    for (const r in n)
      Fn(s, r, n[r]);
    if (t && !se(t))
      for (const r in t)
        n[r] == null && Fn(s, r, "");
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const Fs = /\s*!important$/;
function Fn(e, t, n) {
  if (D(n))
    n.forEach((s) => Fn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = il(e, t);
    Fs.test(n) ? e.setProperty(ve(s), n.replace(Fs, ""), "important") : e[s] = n;
  }
}
const Ss = ["Webkit", "Moz", "ms"], hn = {};
function il(e, t) {
  const n = hn[t];
  if (n)
    return n;
  let s = Ue(t);
  if (s !== "filter" && s in e)
    return hn[t] = s;
  s = Qs(s);
  for (let i = 0; i < Ss.length; i++) {
    const r = Ss[i] + s;
    if (r in e)
      return hn[t] = r;
  }
  return t;
}
const Ps = "http://www.w3.org/1999/xlink";
function rl(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Ps, t.slice(6, t.length)) : e.setAttributeNS(Ps, t, n);
  else {
    const r = tr(t);
    n == null || r && !Ys(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function ol(e, t, n, s, i, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, i, r), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const a = n ?? "";
    (e.value !== a || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = a), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Ys(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(t);
}
function ll(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function cl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function al(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = fl(t);
    if (s) {
      const u = r[t] = _l(s, i);
      ll(e, l, u, a);
    } else
      o && (cl(e, l, o, a), r[t] = void 0);
  }
}
const Ls = /(?:Once|Passive|Capture)$/;
function fl(e) {
  let t;
  if (Ls.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ls); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ve(e.slice(2)), t];
}
let vn = 0;
const ul = /* @__PURE__ */ Promise.resolve(), pl = () => vn || (ul.then(() => vn = 0), vn = Date.now());
function _l(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    me(dl(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = pl(), n;
}
function dl(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const js = /^on[a-z]/, ml = (e, t, n, s, i = !1, r, o, l, a) => {
  t === "class" ? nl(e, s, i) : t === "style" ? sl(e, n, s) : qt(t) ? Bn(t) || al(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : gl(e, t, s, i)) ? ol(e, t, s, r, o, l, a) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), rl(e, t, s, i));
};
function gl(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && js.test(t) && M(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || js.test(t) && se(n) ? !1 : t in e;
}
function hl(e, t) {
  const n = tn(e);
  class s extends os {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const vl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class os extends vl {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, vi(() => {
      this._connected || ($s(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const i of s)
        this._setAttr(i.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, i = !1) => {
      const { props: r, styles: o } = s;
      let l;
      if (r && !D(r))
        for (const a in r) {
          const u = r[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = wt(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[Ue(a)] = !0);
        }
      this._numberProps = l, i && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = D(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of s.map(Ue))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = Ue(t);
    this._numberProps && this._numberProps[s] && (n = wt(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, i = !0) {
    n !== this._props[t] && (this._props[t] = n, i && this._instance && this._update(), s && (n === !0 ? this.setAttribute(ve(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ve(t), n + "") : n || this.removeAttribute(ve(t))));
  }
  _update() {
    $s(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Q(this._def, ee({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, o) => {
        this.dispatchEvent(new CustomEvent(r, {
          detail: o
        }));
      };
      n.emit = (r, ...o) => {
        s(r, o), ve(r) !== r && s(ve(r), o);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof os) {
          n.parent = i._instance, n.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
function bl(e) {
  const t = Ki();
  if (!t)
    return;
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((r) => Pn(r, i));
  }, s = () => {
    const i = e(t.proxy);
    Sn(t.subTree, i), n(i);
  };
  io(s), rn(() => {
    const i = new MutationObserver(s);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), ts(() => i.disconnect());
  });
}
function Sn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      Sn(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Pn(e.el, t);
  else if (e.type === fe)
    e.children.forEach((n) => Sn(n, t));
  else if (e.type === Vt) {
    let { el: n, anchor: s } = e;
    for (; n && (Pn(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function Pn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t)
      n.setProperty(`--${s}`, t[s]);
  }
}
const Le = "transition", vt = "animation", ls = (e, { slots: t }) => Go(Ti, yl(e), t);
ls.displayName = "Transition";
const Yi = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
ls.props = /* @__PURE__ */ ee({}, Ti.props, Yi);
const qe = (e, t = []) => {
  D(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Hs = (e) => e ? D(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function yl(e) {
  const t = {};
  for (const w in e)
    w in Yi || (t[w] = e[w]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: s, duration: i, enterFromClass: r = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: l = `${n}-enter-to`, appearFromClass: a = r, appearActiveClass: u = o, appearToClass: _ = l, leaveFromClass: g = `${n}-leave-from`, leaveActiveClass: v = `${n}-leave-active`, leaveToClass: C = `${n}-leave-to` } = e, R = El(i), A = R && R[0], Y = R && R[1], { onBeforeEnter: L, onEnter: oe, onEnterCancelled: N, onLeave: V, onLeaveCancelled: J, onBeforeAppear: Se = L, onAppear: xe = oe, onAppearCancelled: U = N } = t, X = (w, $, ue) => {
    Ge(w, $ ? _ : l), Ge(w, $ ? u : o), ue && ue();
  }, z = (w, $) => {
    w._isLeaving = !1, Ge(w, g), Ge(w, C), Ge(w, v), $ && $();
  }, ie = (w) => ($, ue) => {
    const gt = w ? xe : oe, Z = () => X($, w, ue);
    qe(gt, [$, Z]), Bs(() => {
      Ge($, w ? a : r), je($, w ? _ : l), Hs(gt) || Vs($, s, A, Z);
    });
  };
  return ee(t, {
    onBeforeEnter(w) {
      qe(L, [w]), je(w, r), je(w, o);
    },
    onBeforeAppear(w) {
      qe(Se, [w]), je(w, a), je(w, u);
    },
    onEnter: ie(!1),
    onAppear: ie(!0),
    onLeave(w, $) {
      w._isLeaving = !0;
      const ue = () => z(w, $);
      je(w, g), Cl(), je(w, v), Bs(() => {
        w._isLeaving && (Ge(w, g), je(w, C), Hs(V) || Vs(w, s, Y, ue));
      }), qe(V, [w, ue]);
    },
    onEnterCancelled(w) {
      X(w, !1), qe(N, [w]);
    },
    onAppearCancelled(w) {
      X(w, !0), qe(U, [w]);
    },
    onLeaveCancelled(w) {
      z(w), qe(J, [w]);
    }
  });
}
function El(e) {
  if (e == null)
    return null;
  if (W(e))
    return [bn(e.enter), bn(e.leave)];
  {
    const t = bn(e);
    return [t, t];
  }
}
function bn(e) {
  return wt(e);
}
function je(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function Ge(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Bs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let kl = 0;
function Vs(e, t, n, s) {
  const i = e._endId = ++kl, r = () => {
    i === e._endId && s();
  };
  if (n)
    return setTimeout(r, n);
  const { type: o, timeout: l, propCount: a } = xl(e, t);
  if (!o)
    return s();
  const u = o + "end";
  let _ = 0;
  const g = () => {
    e.removeEventListener(u, v), r();
  }, v = (C) => {
    C.target === e && ++_ >= a && g();
  };
  setTimeout(() => {
    _ < a && g();
  }, l + 1), e.addEventListener(u, v);
}
function xl(e, t) {
  const n = window.getComputedStyle(e), s = (R) => (n[R] || "").split(", "), i = s(`${Le}Delay`), r = s(`${Le}Duration`), o = zs(i, r), l = s(`${vt}Delay`), a = s(`${vt}Duration`), u = zs(l, a);
  let _ = null, g = 0, v = 0;
  t === Le ? o > 0 && (_ = Le, g = o, v = r.length) : t === vt ? u > 0 && (_ = vt, g = u, v = a.length) : (g = Math.max(o, u), _ = g > 0 ? o > u ? Le : vt : null, v = _ ? _ === Le ? r.length : a.length : 0);
  const C = _ === Le && /\b(transform|all)(,|$)/.test(s(`${Le}Property`).toString());
  return {
    type: _,
    timeout: g,
    propCount: v,
    hasTransform: C
  };
}
function zs(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => Ks(n) + Ks(e[s])));
}
function Ks(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Cl() {
  return document.body.offsetHeight;
}
const wl = /* @__PURE__ */ ee({ patchProp: ml }, tl);
let Ws;
function Tl() {
  return Ws || (Ws = Mo(wl));
}
const $s = (...e) => {
  Tl().render(...e);
}, Ol = { key: 0 }, Al = {
  key: 0,
  class: "up",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 330 330",
  style: { "enable-background": "new 0 0 330 330" },
  "xml:space": "preserve"
}, Dl = /* @__PURE__ */ Ee("path", { d: "m325.606 229.393-150.004-150a14.997 14.997 0 0 0-21.213.001l-149.996 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.393 139.397 139.393A14.953 14.953 0 0 0 315 255a14.95 14.95 0 0 0 10.607-4.394c5.857-5.858 5.857-15.355-.001-21.213z" }, null, -1), Il = [
  Dl
], Nl = {
  key: 1,
  class: "down",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 330 330",
  style: { "enable-background": "new 0 0 330 330" },
  "xml:space": "preserve"
}, Ul = /* @__PURE__ */ Ee("path", { d: "M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z" }, null, -1), Ml = [
  Ul
], jt = nt({}), Rl = /* @__PURE__ */ tn({
  __name: "arrow-check",
  props: {
    amount: null,
    name: null
  },
  setup(e) {
    const t = e, n = Tn(!1), s = Tn(!1);
    return n.value = t.amount > jt[t.name], jt[t.name] && t.amount !== jt[t.name] && (s.value = !0), rn(() => {
      jt[t.name] = t.amount;
    }), (i, r) => s.value ? (Me(), xt("div", Ol, [
      n.value ? (Me(), xt("svg", Al, Il)) : (Me(), xt("svg", Nl, Ml))
    ])) : zi("", !0);
  }
}), Fl = { class: "inner" }, Sl = { class: "val-and-arrow" }, yn = /* @__PURE__ */ tn({
  __name: "coin-check",
  props: {
    coin: null
  },
  setup(e) {
    const t = e, { coin: n } = Hr(t);
    return (s, i) => (Me(), ln(ls, { name: "out-in" }, {
      default: Ci(() => [
        (Me(), xt("div", {
          key: ot(n).formated
        }, [
          Ee("div", Fl, [
            Ee("div", null, En(ot(n).name), 1),
            Ee("div", Sl, [
              Ee("div", null, En(ot(n).formated), 1),
              Q(Rl, {
                amount: ot(n).money ?? 0,
                name: ot(n).name ?? null
              }, null, 8, ["amount", "name"])
            ])
          ])
        ]))
      ]),
      _: 1
    }));
  }
});
const Pl = { class: "sub" }, Ll = /* @__PURE__ */ tn({
  __name: "coin-tracker.ce",
  props: {
    pair: null,
    backround: null
  },
  setup(e) {
    const t = e;
    bl((g) => ({
      "55c3f7ba": e.backround
    }));
    const n = "https://api.coinbase.com/v2/prices", s = Tn(new Date()), i = "BTC-USD", r = "ETH-USD", o = nt({}), l = nt({}), a = nt({});
    async function u(g) {
      const C = await (await fetch(`${n}/${g}/spot`)).json();
      return {
        money: parseFloat(C.data.amount),
        formated: Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(C.data.amount),
        name: g.split("-")[0]
      };
    }
    async function _() {
      const g = await u(i), v = await u(r);
      if (console.log(g, v), l.formated = g.formated, l.money = g.money, l.name = g.name, a.formated = v.formated, a.money = v.money, a.name = v.name, s.value = new Date(), t.pair) {
        const C = await u(t.pair);
        o.formated = C.formated, o.money = C.money, o.name = C.name;
      }
    }
    return _(), setInterval(_, 5e3), (g, v) => (Me(), xt(fe, null, [
      Cs(g.$slots, "header"),
      Ee("section", null, [
        Q(yn, { coin: l }, null, 8, ["coin"]),
        Q(yn, { coin: a }, null, 8, ["coin"]),
        e.pair ? (Me(), ln(yn, {
          key: 0,
          coin: o
        }, null, 8, ["coin"])) : zi("", !0)
      ]),
      Ee("div", Pl, [
        Vi(" Last Update: "),
        Ee("span", null, En(s.value), 1)
      ]),
      Cs(g.$slots, "footer")
    ], 64));
  }
}), jl = `.sub{font-size:14px;font-weight:700;display:flex;justify-content:center;margin-top:10px}section{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;font-size:2.5rem;margin:0 auto;gap:1rem}section>div{display:flex;justify-content:center;flex-direction:column;align-items:center;box-shadow:0 3px 10px #0003;border-radius:.5rem;width:20%;background-color:var(--55c3f7ba)}.inner{font-size:1.5rem;display:flex;justify-content:center;flex-direction:column;align-items:center}.val-and-arrow{display:flex;justify-content:center;align-items:center;flex-direction:row;gap:1rem;font-size:1rem}svg{width:30px}.up{fill:green}.down{fill:red}.price-info{display:flex;gap:1.2rem}
`, Hl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, Bl = /* @__PURE__ */ Hl(Ll, [["styles", [jl]]]), Vl = hl(Bl);
customElements.define("coin-tracker", Vl);

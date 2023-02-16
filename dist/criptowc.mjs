function In(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function Mn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = Q(s) ? Hi(s) : Mn(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else {
    if (Q(e))
      return e;
    if (z(e))
      return e;
  }
}
const Si = /;(?![^(]*\))/g, Li = /:([^]+)/, ji = /\/\*.*?\*\//gs;
function Hi(e) {
  const t = {};
  return e.replace(ji, "").split(Si).forEach((n) => {
    if (n) {
      const s = n.split(Li);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Nn(e) {
  let t = "";
  if (Q(e))
    t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = Nn(e[n]);
      s && (t += s + " ");
    }
  else if (z(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Bi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Vi = /* @__PURE__ */ In(Bi);
function Fs(e) {
  return !!e || e === "";
}
const Ht = (e) => Q(e) ? e : e == null ? "" : D(e) || z(e) && (e.toString === Hs || !I(e.toString)) ? JSON.stringify(e, Ss, 2) : String(e), Ss = (e, t) => t && t.__v_isRef ? Ss(e, t.value) : it(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, i]) => (n[`${s} =>`] = i, n), {})
} : Ls(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : z(t) && !D(t) && !Bs(t) ? String(t) : t, B = {}, st = [], ye = () => {
}, Ki = () => !1, Wi = /^on[^a-z]/, $t = (e) => Wi.test(e), Pn = (e) => e.startsWith("onUpdate:"), Z = Object.assign, Un = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zi = Object.prototype.hasOwnProperty, U = (e, t) => zi.call(e, t), D = Array.isArray, it = (e) => Yt(e) === "[object Map]", Ls = (e) => Yt(e) === "[object Set]", I = (e) => typeof e == "function", Q = (e) => typeof e == "string", Fn = (e) => typeof e == "symbol", z = (e) => e !== null && typeof e == "object", js = (e) => z(e) && I(e.then) && I(e.catch), Hs = Object.prototype.toString, Yt = (e) => Hs.call(e), $i = (e) => Yt(e).slice(8, -1), Bs = (e) => Yt(e) === "[object Object]", Sn = (e) => Q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = /* @__PURE__ */ In(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Yi = /-(\w)/g, Ie = Xt((e) => e.replace(Yi, (t, n) => n ? n.toUpperCase() : "")), Xi = /\B([A-Z])/g, ge = Xt((e) => e.replace(Xi, "-$1").toLowerCase()), Vs = Xt((e) => e.charAt(0).toUpperCase() + e.slice(1)), on = Xt((e) => e ? `on${Vs(e)}` : ""), yt = (e, t) => !Object.is(e, t), ln = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Bt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Vt = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let cs;
const qi = () => cs || (cs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let we;
class Gi {
  constructor(t = !1) {
    this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = we, !t && we && (this.index = (we.scopes || (we.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = we;
      try {
        return we = this, t();
      } finally {
        we = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    we = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    we = this.parent;
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
function Ji(e, t = we) {
  t && t.active && t.effects.push(e);
}
const Ln = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Ks = (e) => (e.w & He) > 0, Ws = (e) => (e.n & He) > 0, Zi = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= He;
}, Qi = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      Ks(i) && !Ws(i) ? i.delete(e) : t[n++] = i, i.w &= ~He, i.n &= ~He;
    }
    t.length = n;
  }
}, mn = /* @__PURE__ */ new WeakMap();
let dt = 0, He = 1;
const gn = 30;
let he;
const Ge = Symbol(""), hn = Symbol("");
class jn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ji(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = he, n = Le;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = he, he = this, Le = !0, He = 1 << ++dt, dt <= gn ? Zi(this) : as(this), this.fn();
    } finally {
      dt <= gn && Qi(this), He = 1 << --dt, he = this.parent, Le = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    he === this ? this.deferStop = !0 : this.active && (as(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function as(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Le = !0;
const zs = [];
function ft() {
  zs.push(Le), Le = !1;
}
function ut() {
  const e = zs.pop();
  Le = e === void 0 ? !0 : e;
}
function fe(e, t, n) {
  if (Le && he) {
    let s = mn.get(e);
    s || mn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = Ln()), $s(i);
  }
}
function $s(e, t) {
  let n = !1;
  dt <= gn ? Ws(e) || (e.n |= He, n = !Ks(e)) : n = !e.has(he), n && (e.add(he), he.deps.push(e));
}
function Ne(e, t, n, s, i, r) {
  const o = mn.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && D(e)) {
    const f = Vt(s);
    o.forEach((u, _) => {
      (_ === "length" || _ >= f) && c.push(u);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        D(e) ? Sn(n) && c.push(o.get("length")) : (c.push(o.get(Ge)), it(e) && c.push(o.get(hn)));
        break;
      case "delete":
        D(e) || (c.push(o.get(Ge)), it(e) && c.push(o.get(hn)));
        break;
      case "set":
        it(e) && c.push(o.get(Ge));
        break;
    }
  if (c.length === 1)
    c[0] && vn(c[0]);
  else {
    const f = [];
    for (const u of c)
      u && f.push(...u);
    vn(Ln(f));
  }
}
function vn(e, t) {
  const n = D(e) ? e : [...e];
  for (const s of n)
    s.computed && fs(s);
  for (const s of n)
    s.computed || fs(s);
}
function fs(e, t) {
  (e !== he || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const er = /* @__PURE__ */ In("__proto__,__v_isRef,__isVue"), Ys = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Fn)
), tr = /* @__PURE__ */ Hn(), nr = /* @__PURE__ */ Hn(!1, !0), sr = /* @__PURE__ */ Hn(!0), us = /* @__PURE__ */ ir();
function ir() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = F(this);
      for (let r = 0, o = this.length; r < o; r++)
        fe(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(F)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ft();
      const s = F(this)[t].apply(this, n);
      return ut(), s;
    };
  }), e;
}
function Hn(e = !1, t = !1) {
  return function(s, i, r) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && r === (e ? t ? yr : Zs : t ? Js : Gs).get(s))
      return s;
    const o = D(s);
    if (!e && o && U(us, i))
      return Reflect.get(us, i, r);
    const c = Reflect.get(s, i, r);
    return (Fn(i) ? Ys.has(i) : er(i)) || (e || fe(s, "get", i), t) ? c : J(c) ? o && Sn(i) ? c : c.value : z(c) ? e ? Qs(c) : Je(c) : c;
  };
}
const rr = /* @__PURE__ */ Xs(), or = /* @__PURE__ */ Xs(!0);
function Xs(e = !1) {
  return function(n, s, i, r) {
    let o = n[s];
    if (ct(o) && J(o) && !J(i))
      return !1;
    if (!e && (!Kt(i) && !ct(i) && (o = F(o), i = F(i)), !D(n) && J(o) && !J(i)))
      return o.value = i, !0;
    const c = D(n) && Sn(s) ? Number(s) < n.length : U(n, s), f = Reflect.set(n, s, i, r);
    return n === F(r) && (c ? yt(i, o) && Ne(n, "set", s, i) : Ne(n, "add", s, i)), f;
  };
}
function lr(e, t) {
  const n = U(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ne(e, "delete", t, void 0), s;
}
function cr(e, t) {
  const n = Reflect.has(e, t);
  return (!Fn(t) || !Ys.has(t)) && fe(e, "has", t), n;
}
function ar(e) {
  return fe(e, "iterate", D(e) ? "length" : Ge), Reflect.ownKeys(e);
}
const qs = {
  get: tr,
  set: rr,
  deleteProperty: lr,
  has: cr,
  ownKeys: ar
}, fr = {
  get: sr,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, ur = /* @__PURE__ */ Z({}, qs, {
  get: nr,
  set: or
}), Bn = (e) => e, qt = (e) => Reflect.getPrototypeOf(e);
function Dt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = F(e), r = F(t);
  n || (t !== r && fe(i, "get", t), fe(i, "get", r));
  const { has: o } = qt(i), c = s ? Bn : n ? Wn : kt;
  if (o.call(i, t))
    return c(e.get(t));
  if (o.call(i, r))
    return c(e.get(r));
  e !== i && e.get(t);
}
function Rt(e, t = !1) {
  const n = this.__v_raw, s = F(n), i = F(e);
  return t || (e !== i && fe(s, "has", e), fe(s, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function It(e, t = !1) {
  return e = e.__v_raw, !t && fe(F(e), "iterate", Ge), Reflect.get(e, "size", e);
}
function ps(e) {
  e = F(e);
  const t = F(this);
  return qt(t).has.call(t, e) || (t.add(e), Ne(t, "add", e, e)), this;
}
function _s(e, t) {
  t = F(t);
  const n = F(this), { has: s, get: i } = qt(n);
  let r = s.call(n, e);
  r || (e = F(e), r = s.call(n, e));
  const o = i.call(n, e);
  return n.set(e, t), r ? yt(t, o) && Ne(n, "set", e, t) : Ne(n, "add", e, t), this;
}
function ds(e) {
  const t = F(this), { has: n, get: s } = qt(t);
  let i = n.call(t, e);
  i || (e = F(e), i = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return i && Ne(t, "delete", e, void 0), r;
}
function ms() {
  const e = F(this), t = e.size !== 0, n = e.clear();
  return t && Ne(e, "clear", void 0, void 0), n;
}
function Mt(e, t) {
  return function(s, i) {
    const r = this, o = r.__v_raw, c = F(o), f = t ? Bn : e ? Wn : kt;
    return !e && fe(c, "iterate", Ge), o.forEach((u, _) => s.call(i, f(u), f(_), r));
  };
}
function Nt(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = F(i), o = it(r), c = e === "entries" || e === Symbol.iterator && o, f = e === "keys" && o, u = i[e](...s), _ = n ? Bn : t ? Wn : kt;
    return !t && fe(r, "iterate", f ? hn : Ge), {
      // iterator protocol
      next() {
        const { value: b, done: y } = u.next();
        return y ? { value: b, done: y } : {
          value: c ? [_(b[0]), _(b[1])] : _(b),
          done: y
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Fe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function pr() {
  const e = {
    get(r) {
      return Dt(this, r);
    },
    get size() {
      return It(this);
    },
    has: Rt,
    add: ps,
    set: _s,
    delete: ds,
    clear: ms,
    forEach: Mt(!1, !1)
  }, t = {
    get(r) {
      return Dt(this, r, !1, !0);
    },
    get size() {
      return It(this);
    },
    has: Rt,
    add: ps,
    set: _s,
    delete: ds,
    clear: ms,
    forEach: Mt(!1, !0)
  }, n = {
    get(r) {
      return Dt(this, r, !0);
    },
    get size() {
      return It(this, !0);
    },
    has(r) {
      return Rt.call(this, r, !0);
    },
    add: Fe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Fe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Fe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Fe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Mt(!0, !1)
  }, s = {
    get(r) {
      return Dt(this, r, !0, !0);
    },
    get size() {
      return It(this, !0);
    },
    has(r) {
      return Rt.call(this, r, !0);
    },
    add: Fe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Fe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Fe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Fe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Mt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Nt(r, !1, !1), n[r] = Nt(r, !0, !1), t[r] = Nt(r, !1, !0), s[r] = Nt(r, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [_r, dr, mr, gr] = /* @__PURE__ */ pr();
function Vn(e, t) {
  const n = t ? e ? gr : mr : e ? dr : _r;
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(U(n, i) && i in s ? n : s, i, r);
}
const hr = {
  get: /* @__PURE__ */ Vn(!1, !1)
}, vr = {
  get: /* @__PURE__ */ Vn(!1, !0)
}, br = {
  get: /* @__PURE__ */ Vn(!0, !1)
}, Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakMap();
function kr(e) {
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
function Er(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : kr($i(e));
}
function Je(e) {
  return ct(e) ? e : Kn(e, !1, qs, hr, Gs);
}
function xr(e) {
  return Kn(e, !1, ur, vr, Js);
}
function Qs(e) {
  return Kn(e, !0, fr, br, Zs);
}
function Kn(e, t, n, s, i) {
  if (!z(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = Er(e);
  if (o === 0)
    return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return i.set(e, c), c;
}
function rt(e) {
  return ct(e) ? rt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
function Kt(e) {
  return !!(e && e.__v_isShallow);
}
function ei(e) {
  return rt(e) || ct(e);
}
function F(e) {
  const t = e && e.__v_raw;
  return t ? F(t) : e;
}
function ti(e) {
  return Bt(e, "__v_skip", !0), e;
}
const kt = (e) => z(e) ? Je(e) : e, Wn = (e) => z(e) ? Qs(e) : e;
function ni(e) {
  Le && he && (e = F(e), $s(e.dep || (e.dep = Ln())));
}
function si(e, t) {
  e = F(e), e.dep && vn(e.dep);
}
function J(e) {
  return !!(e && e.__v_isRef === !0);
}
function bn(e) {
  return Cr(e, !1);
}
function Cr(e, t) {
  return J(e) ? e : new wr(e, t);
}
class wr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : F(t), this._value = n ? t : kt(t);
  }
  get value() {
    return ni(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Kt(t) || ct(t);
    t = n ? t : F(t), yt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : kt(t), si(this));
  }
}
function ve(e) {
  return J(e) ? e.value : e;
}
const Tr = {
  get: (e, t, n) => ve(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return J(i) && !J(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function ii(e) {
  return rt(e) ? e : new Proxy(e, Tr);
}
function Or(e) {
  const t = D(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Dr(e, n);
  return t;
}
class Ar {
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
function Dr(e, t, n) {
  const s = e[t];
  return J(s) ? s : new Ar(e, t, n);
}
var ri;
class Rr {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[ri] = !1, this._dirty = !0, this.effect = new jn(t, () => {
      this._dirty || (this._dirty = !0, si(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = F(this);
    return ni(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
ri = "__v_isReadonly";
function Ir(e, t, n = !1) {
  let s, i;
  const r = I(e);
  return r ? (s = e, i = ye) : (s = e.get, i = e.set), new Rr(s, i, r || !i, n);
}
function je(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    Gt(r, t, n);
  }
  return i;
}
function _e(e, t, n, s) {
  if (I(e)) {
    const r = je(e, t, n, s);
    return r && js(r) && r.catch((o) => {
      Gt(o, t, n);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(_e(e[r], t, n, s));
  return i;
}
function Gt(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy, c = n;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let _ = 0; _ < u.length; _++)
          if (u[_](e, o, c) === !1)
            return;
      }
      r = r.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      je(f, null, 10, [e, o, c]);
      return;
    }
  }
  Mr(e, n, i, s);
}
function Mr(e, t, n, s = !0) {
  console.error(e);
}
let Et = !1, yn = !1;
const te = [];
let Oe = 0;
const ot = [];
let Re = null, Ye = 0;
const oi = /* @__PURE__ */ Promise.resolve();
let zn = null;
function li(e) {
  const t = zn || oi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Nr(e) {
  let t = Oe + 1, n = te.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    xt(te[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function $n(e) {
  (!te.length || !te.includes(e, Et && e.allowRecurse ? Oe + 1 : Oe)) && (e.id == null ? te.push(e) : te.splice(Nr(e.id), 0, e), ci());
}
function ci() {
  !Et && !yn && (yn = !0, zn = oi.then(fi));
}
function Pr(e) {
  const t = te.indexOf(e);
  t > Oe && te.splice(t, 1);
}
function Ur(e) {
  D(e) ? ot.push(...e) : (!Re || !Re.includes(e, e.allowRecurse ? Ye + 1 : Ye)) && ot.push(e), ci();
}
function gs(e, t = Et ? Oe + 1 : 0) {
  for (; t < te.length; t++) {
    const n = te[t];
    n && n.pre && (te.splice(t, 1), t--, n());
  }
}
function ai(e) {
  if (ot.length) {
    const t = [...new Set(ot)];
    if (ot.length = 0, Re) {
      Re.push(...t);
      return;
    }
    for (Re = t, Re.sort((n, s) => xt(n) - xt(s)), Ye = 0; Ye < Re.length; Ye++)
      Re[Ye]();
    Re = null, Ye = 0;
  }
}
const xt = (e) => e.id == null ? 1 / 0 : e.id, Fr = (e, t) => {
  const n = xt(e) - xt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function fi(e) {
  yn = !1, Et = !0, te.sort(Fr);
  const t = ye;
  try {
    for (Oe = 0; Oe < te.length; Oe++) {
      const n = te[Oe];
      n && n.active !== !1 && je(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    Oe = 0, te.length = 0, ai(), Et = !1, zn = null, (te.length || ot.length) && fi();
  }
}
function Sr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || B;
  let i = n;
  const r = t.startsWith("update:"), o = r && t.slice(7);
  if (o && o in s) {
    const _ = `${o === "modelValue" ? "model" : o}Modifiers`, { number: b, trim: y } = s[_] || B;
    y && (i = n.map((T) => Q(T) ? T.trim() : T)), b && (i = n.map(Vt));
  }
  let c, f = s[c = on(t)] || // also try camelCase event handler (#2249)
  s[c = on(Ie(t))];
  !f && r && (f = s[c = on(ge(t))]), f && _e(f, e, 6, i);
  const u = s[c + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, _e(u, e, 6, i);
  }
}
function ui(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, c = !1;
  if (!I(e)) {
    const f = (u) => {
      const _ = ui(u, t, !0);
      _ && (c = !0, Z(o, _));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !c ? (z(e) && s.set(e, null), null) : (D(r) ? r.forEach((f) => o[f] = null) : Z(o, r), z(e) && s.set(e, o), o);
}
function Jt(e, t) {
  return !e || !$t(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), U(e, t[0].toLowerCase() + t.slice(1)) || U(e, ge(t)) || U(e, t));
}
let re = null, pi = null;
function Wt(e) {
  const t = re;
  return re = e, pi = e && e.type.__scopeId || null, t;
}
function Lr(e, t = re, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && ws(-1);
    const r = Wt(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Wt(r), s._d && ws(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function cn(e) {
  const { type: t, vnode: n, proxy: s, withProxy: i, props: r, propsOptions: [o], slots: c, attrs: f, emit: u, render: _, renderCache: b, data: y, setupState: T, ctx: M, inheritAttrs: O } = e;
  let $, L;
  const ue = Wt(e);
  try {
    if (n.shapeFlag & 4) {
      const V = i || s;
      $ = Te(_.call(V, V, b, r, T, y, M)), L = f;
    } else {
      const V = t;
      $ = Te(V.length > 1 ? V(r, { attrs: f, slots: c, emit: u }) : V(
        r,
        null
        /* we know it doesn't need it */
      )), L = t.props ? f : jr(f);
    }
  } catch (V) {
    vt.length = 0, Gt(
      V,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), $ = oe(de);
  }
  let R = $;
  if (L && O !== !1) {
    const V = Object.keys(L), { shapeFlag: ee } = R;
    V.length && ee & 7 && (o && V.some(Pn) && (L = Hr(L, o)), R = Be(R, L));
  }
  return n.dirs && (R = Be(R), R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs), n.transition && (R.transition = n.transition), $ = R, Wt(ue), $;
}
const jr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || $t(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Hr = (e, t) => {
  const n = {};
  for (const s in e)
    (!Pn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Br(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: c, patchFlag: f } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return s ? hs(s, o, u) : !!o;
    if (f & 8) {
      const _ = t.dynamicProps;
      for (let b = 0; b < _.length; b++) {
        const y = _[b];
        if (o[y] !== s[y] && !Jt(u, y))
          return !0;
      }
    }
  } else
    return (i || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? o ? hs(s, o, u) : !0 : !!o;
  return !1;
}
function hs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !Jt(n, r))
      return !0;
  }
  return !1;
}
function Vr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Kr = (e) => e.__isSuspense;
function Wr(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Ur(e);
}
function zr(e, t) {
  if (G) {
    let n = G.provides;
    const s = G.parent && G.parent.provides;
    s === n && (n = G.provides = Object.create(s)), n[e] = t;
  }
}
function St(e, t, n = !1) {
  const s = G || re;
  if (s) {
    const i = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(s.proxy) : t;
  }
}
function $r(e, t) {
  return Yn(e, null, { flush: "post" });
}
const Pt = {};
function an(e, t, n) {
  return Yn(e, t, n);
}
function Yn(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = B) {
  const c = G;
  let f, u = !1, _ = !1;
  if (J(e) ? (f = () => e.value, u = Kt(e)) : rt(e) ? (f = () => e, s = !0) : D(e) ? (_ = !0, u = e.some((R) => rt(R) || Kt(R)), f = () => e.map((R) => {
    if (J(R))
      return R.value;
    if (rt(R))
      return nt(R);
    if (I(R))
      return je(
        R,
        c,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : I(e) ? t ? f = () => je(
    e,
    c,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : f = () => {
    if (!(c && c.isUnmounted))
      return b && b(), _e(e, c, 3, [y]);
  } : f = ye, t && s) {
    const R = f;
    f = () => nt(R());
  }
  let b, y = (R) => {
    b = L.onStop = () => {
      je(
        R,
        c,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, T;
  if (wt)
    if (y = ye, t ? n && _e(t, c, 3, [
      f(),
      _ ? [] : void 0,
      y
    ]) : f(), i === "sync") {
      const R = Ho();
      T = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return ye;
  let M = _ ? new Array(e.length).fill(Pt) : Pt;
  const O = () => {
    if (L.active)
      if (t) {
        const R = L.run();
        (s || u || (_ ? R.some((V, ee) => yt(V, M[ee])) : yt(R, M))) && (b && b(), _e(t, c, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          M === Pt ? void 0 : _ && M[0] === Pt ? [] : M,
          y
        ]), M = R);
      } else
        L.run();
  };
  O.allowRecurse = !!t;
  let $;
  i === "sync" ? $ = O : i === "post" ? $ = () => le(O, c && c.suspense) : (O.pre = !0, c && (O.id = c.uid), $ = () => $n(O));
  const L = new jn(f, $);
  t ? n ? O() : M = L.run() : i === "post" ? le(L.run.bind(L), c && c.suspense) : L.run();
  const ue = () => {
    L.stop(), c && c.scope && Un(c.scope.effects, L);
  };
  return T && T.push(ue), ue;
}
function Yr(e, t, n) {
  const s = this.proxy, i = Q(e) ? e.includes(".") ? _i(s, e) : () => s[e] : e.bind(s, s);
  let r;
  I(t) ? r = t : (r = t.handler, n = t);
  const o = G;
  at(this);
  const c = Yn(i, r.bind(s), n);
  return o ? at(o) : Ze(), c;
}
function _i(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function nt(e, t) {
  if (!z(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), J(e))
    nt(e.value, t);
  else if (D(e))
    for (let n = 0; n < e.length; n++)
      nt(e[n], t);
  else if (Ls(e) || it(e))
    e.forEach((n) => {
      nt(n, t);
    });
  else if (Bs(e))
    for (const n in e)
      nt(e[n], t);
  return e;
}
function Xr() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return en(() => {
    e.isMounted = !0;
  }), hi(() => {
    e.isUnmounting = !0;
  }), e;
}
const pe = [Function, Array], qr = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: pe,
    onEnter: pe,
    onAfterEnter: pe,
    onEnterCancelled: pe,
    // leave
    onBeforeLeave: pe,
    onLeave: pe,
    onAfterLeave: pe,
    onLeaveCancelled: pe,
    // appear
    onBeforeAppear: pe,
    onAppear: pe,
    onAfterAppear: pe,
    onAppearCancelled: pe
  },
  setup(e, { slots: t }) {
    const n = Ii(), s = Xr();
    let i;
    return () => {
      const r = t.default && mi(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const O of r)
          if (O.type !== de) {
            o = O;
            break;
          }
      }
      const c = F(e), { mode: f } = c;
      if (s.isLeaving)
        return fn(o);
      const u = vs(o);
      if (!u)
        return fn(o);
      const _ = kn(u, c, s, n);
      En(u, _);
      const b = n.subTree, y = b && vs(b);
      let T = !1;
      const { getTransitionKey: M } = u.type;
      if (M) {
        const O = M();
        i === void 0 ? i = O : O !== i && (i = O, T = !0);
      }
      if (y && y.type !== de && (!Xe(u, y) || T)) {
        const O = kn(y, c, s, n);
        if (En(y, O), f === "out-in")
          return s.isLeaving = !0, O.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, fn(o);
        f === "in-out" && u.type !== de && (O.delayLeave = ($, L, ue) => {
          const R = di(s, y);
          R[String(y.key)] = y, $._leaveCb = () => {
            L(), $._leaveCb = void 0, delete _.delayedLeave;
          }, _.delayedLeave = ue;
        });
      }
      return o;
    };
  }
}, Gr = qr;
function di(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function kn(e, t, n, s) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: c, onEnter: f, onAfterEnter: u, onEnterCancelled: _, onBeforeLeave: b, onLeave: y, onAfterLeave: T, onLeaveCancelled: M, onBeforeAppear: O, onAppear: $, onAfterAppear: L, onAppearCancelled: ue } = t, R = String(e.key), V = di(n, e), ee = (N, X) => {
    N && _e(N, s, 9, X);
  }, Qe = (N, X) => {
    const K = X[1];
    ee(N, X), D(N) ? N.every((ce) => ce.length <= 1) && K() : N.length <= 1 && K();
  }, Ue = {
    mode: r,
    persisted: o,
    beforeEnter(N) {
      let X = c;
      if (!n.isMounted)
        if (i)
          X = O || c;
        else
          return;
      N._leaveCb && N._leaveCb(
        !0
        /* cancelled */
      );
      const K = V[R];
      K && Xe(e, K) && K.el._leaveCb && K.el._leaveCb(), ee(X, [N]);
    },
    enter(N) {
      let X = f, K = u, ce = _;
      if (!n.isMounted)
        if (i)
          X = $ || f, K = L || u, ce = ue || _;
        else
          return;
      let ke = !1;
      const Ae = N._enterCb = (pt) => {
        ke || (ke = !0, pt ? ee(ce, [N]) : ee(K, [N]), Ue.delayedLeave && Ue.delayedLeave(), N._enterCb = void 0);
      };
      X ? Qe(X, [N, Ae]) : Ae();
    },
    leave(N, X) {
      const K = String(e.key);
      if (N._enterCb && N._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      ee(b, [N]);
      let ce = !1;
      const ke = N._leaveCb = (Ae) => {
        ce || (ce = !0, X(), Ae ? ee(M, [N]) : ee(T, [N]), N._leaveCb = void 0, V[K] === e && delete V[K]);
      };
      V[K] = e, y ? Qe(y, [N, ke]) : ke();
    },
    clone(N) {
      return kn(N, t, n, s);
    }
  };
  return Ue;
}
function fn(e) {
  if (Zt(e))
    return e = Be(e), e.children = null, e;
}
function vs(e) {
  return Zt(e) ? e.children ? e.children[0] : void 0 : e;
}
function En(e, t) {
  e.shapeFlag & 6 && e.component ? En(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function mi(e, t = !1, n) {
  let s = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const c = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === ie ? (o.patchFlag & 128 && i++, s = s.concat(mi(o.children, t, c))) : (t || o.type !== de) && s.push(c != null ? Be(o, { key: c }) : o);
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
function Tt(e) {
  return I(e) ? { setup: e, name: e.name } : e;
}
const gt = (e) => !!e.type.__asyncLoader, Zt = (e) => e.type.__isKeepAlive;
function Jr(e, t) {
  gi(e, "a", t);
}
function Zr(e, t) {
  gi(e, "da", t);
}
function gi(e, t, n = G) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Qt(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Zt(i.parent.vnode) && Qr(s, t, n, i), i = i.parent;
  }
}
function Qr(e, t, n, s) {
  const i = Qt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Xn(() => {
    Un(s[t], i);
  }, n);
}
function Qt(e, t, n = G, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      ft(), at(n);
      const c = _e(t, n, e, o);
      return Ze(), ut(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Pe = (e) => (t, n = G) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!wt || e === "sp") && Qt(e, (...s) => t(...s), n)
), eo = Pe(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), en = Pe(
  "m"
  /* LifecycleHooks.MOUNTED */
), to = Pe(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), no = Pe(
  "u"
  /* LifecycleHooks.UPDATED */
), hi = Pe(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), Xn = Pe(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), so = Pe(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), io = Pe(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), ro = Pe(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function oo(e, t = G) {
  Qt("ec", e, t);
}
function We(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const c = i[o];
    r && (c.oldValue = r[o].value);
    let f = c.dir[s];
    f && (ft(), _e(f, n, 8, [
      e.el,
      c,
      e,
      t
    ]), ut());
  }
}
const lo = Symbol();
function co(e, t, n = {}, s, i) {
  if (re.isCE || re.parent && gt(re.parent) && re.parent.isCE)
    return t !== "default" && (n.name = t), oe("slot", n, s && s());
  let r = e[t];
  r && r._c && (r._d = !1), Me();
  const o = r && vi(r(n)), c = Jn(
    ie,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      o && o.key || `_${t}`
    },
    o || (s ? s() : []),
    o && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), r && r._c && (r._d = !0), c;
}
function vi(e) {
  return e.some((t) => Ai(t) ? !(t.type === de || t.type === ie && !vi(t.children)) : !0) ? e : null;
}
const xn = (e) => e ? Mi(e) ? es(e) || e.proxy : xn(e.parent) : null, ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => xn(e.parent),
    $root: (e) => xn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => qn(e),
    $forceUpdate: (e) => e.f || (e.f = () => $n(e.update)),
    $nextTick: (e) => e.n || (e.n = li.bind(e.proxy)),
    $watch: (e) => Yr.bind(e)
  })
), un = (e, t) => e !== B && !e.__isScriptSetup && U(e, t), ao = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: c, appContext: f } = e;
    let u;
    if (t[0] !== "$") {
      const T = o[t];
      if (T !== void 0)
        switch (T) {
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
        if (un(s, t))
          return o[t] = 1, s[t];
        if (i !== B && U(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && U(u, t)
        )
          return o[t] = 3, r[t];
        if (n !== B && U(n, t))
          return o[t] = 4, n[t];
        Cn && (o[t] = 0);
      }
    }
    const _ = ht[t];
    let b, y;
    if (_)
      return t === "$attrs" && fe(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (b = c.__cssModules) && (b = b[t])
    )
      return b;
    if (n !== B && U(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      y = f.config.globalProperties, U(y, t)
    )
      return y[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return un(i, t) ? (i[t] = n, !0) : s !== B && U(s, t) ? (s[t] = n, !0) : U(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r } }, o) {
    let c;
    return !!n[o] || e !== B && U(e, o) || un(t, o) || (c = r[0]) && U(c, o) || U(s, o) || U(ht, o) || U(i.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : U(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let Cn = !0;
function fo(e) {
  const t = qn(e), n = e.proxy, s = e.ctx;
  Cn = !1, t.beforeCreate && bs(
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
    watch: c,
    provide: f,
    inject: u,
    // lifecycle
    created: _,
    beforeMount: b,
    mounted: y,
    beforeUpdate: T,
    updated: M,
    activated: O,
    deactivated: $,
    beforeDestroy: L,
    beforeUnmount: ue,
    destroyed: R,
    unmounted: V,
    render: ee,
    renderTracked: Qe,
    renderTriggered: Ue,
    errorCaptured: N,
    serverPrefetch: X,
    // public API
    expose: K,
    inheritAttrs: ce,
    // assets
    components: ke,
    directives: Ae,
    filters: pt
  } = t;
  if (u && uo(u, s, null, e.appContext.config.unwrapInjectedRef), o)
    for (const W in o) {
      const j = o[W];
      I(j) && (s[W] = j.bind(n));
    }
  if (i) {
    const W = i.call(n, n);
    z(W) && (e.data = Je(W));
  }
  if (Cn = !0, r)
    for (const W in r) {
      const j = r[W], Ve = I(j) ? j.bind(n, n) : I(j.get) ? j.get.bind(n, n) : ye, Ot = !I(j) && I(j.set) ? j.set.bind(n) : ye, Ke = bt({
        get: Ve,
        set: Ot
      });
      Object.defineProperty(s, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (Ee) => Ke.value = Ee
      });
    }
  if (c)
    for (const W in c)
      bi(c[W], s, n, W);
  if (f) {
    const W = I(f) ? f.call(n) : f;
    Reflect.ownKeys(W).forEach((j) => {
      zr(j, W[j]);
    });
  }
  _ && bs(
    _,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ne(W, j) {
    D(j) ? j.forEach((Ve) => W(Ve.bind(n))) : j && W(j.bind(n));
  }
  if (ne(eo, b), ne(en, y), ne(to, T), ne(no, M), ne(Jr, O), ne(Zr, $), ne(oo, N), ne(ro, Qe), ne(io, Ue), ne(hi, ue), ne(Xn, V), ne(so, X), D(K))
    if (K.length) {
      const W = e.exposed || (e.exposed = {});
      K.forEach((j) => {
        Object.defineProperty(W, j, {
          get: () => n[j],
          set: (Ve) => n[j] = Ve
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ee && e.render === ye && (e.render = ee), ce != null && (e.inheritAttrs = ce), ke && (e.components = ke), Ae && (e.directives = Ae);
}
function uo(e, t, n = ye, s = !1) {
  D(e) && (e = wn(e));
  for (const i in e) {
    const r = e[i];
    let o;
    z(r) ? "default" in r ? o = St(
      r.from || i,
      r.default,
      !0
      /* treat default function as factory */
    ) : o = St(r.from || i) : o = St(r), J(o) && s ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (c) => o.value = c
    }) : t[i] = o;
  }
}
function bs(e, t, n) {
  _e(D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function bi(e, t, n, s) {
  const i = s.includes(".") ? _i(n, s) : () => n[s];
  if (Q(e)) {
    const r = t[e];
    I(r) && an(i, r);
  } else if (I(e))
    an(i, e.bind(n));
  else if (z(e))
    if (D(e))
      e.forEach((r) => bi(r, t, n, s));
    else {
      const r = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(r) && an(i, r, e);
    }
}
function qn(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: i, optionsCache: r, config: { optionMergeStrategies: o } } = e.appContext, c = r.get(t);
  let f;
  return c ? f = c : !i.length && !n && !s ? f = t : (f = {}, i.length && i.forEach((u) => zt(f, u, o, !0)), zt(f, t, o)), z(t) && r.set(t, f), f;
}
function zt(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && zt(e, r, n, !0), i && i.forEach((o) => zt(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = po[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const po = {
  data: ys,
  props: $e,
  emits: $e,
  // objects
  methods: $e,
  computed: $e,
  // lifecycle
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  // assets
  components: $e,
  directives: $e,
  // watch
  watch: mo,
  // provide / inject
  provide: ys,
  inject: _o
};
function ys(e, t) {
  return t ? e ? function() {
    return Z(I(e) ? e.call(this, this) : e, I(t) ? t.call(this, this) : t);
  } : t : e;
}
function _o(e, t) {
  return $e(wn(e), wn(t));
}
function wn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $e(e, t) {
  return e ? Z(Z(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function mo(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Z(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = se(e[s], t[s]);
  return n;
}
function go(e, t, n, s = !1) {
  const i = {}, r = {};
  Bt(r, nn, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), yi(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : xr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function ho(e, t, n, s) {
  const { props: i, attrs: r, vnode: { patchFlag: o } } = e, c = F(i), [f] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const _ = e.vnode.dynamicProps;
      for (let b = 0; b < _.length; b++) {
        let y = _[b];
        if (Jt(e.emitsOptions, y))
          continue;
        const T = t[y];
        if (f)
          if (U(r, y))
            T !== r[y] && (r[y] = T, u = !0);
          else {
            const M = Ie(y);
            i[M] = Tn(
              f,
              c,
              M,
              T,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          T !== r[y] && (r[y] = T, u = !0);
      }
    }
  } else {
    yi(e, t, i, r) && (u = !0);
    let _;
    for (const b in c)
      (!t || // for camelCase
      !U(t, b) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = ge(b)) === b || !U(t, _))) && (f ? n && // for camelCase
      (n[b] !== void 0 || // for kebab-case
      n[_] !== void 0) && (i[b] = Tn(
        f,
        c,
        b,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[b]);
    if (r !== c)
      for (const b in r)
        (!t || !U(t, b)) && (delete r[b], u = !0);
  }
  u && Ne(e, "set", "$attrs");
}
function yi(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let f in t) {
      if (Ft(f))
        continue;
      const u = t[f];
      let _;
      i && U(i, _ = Ie(f)) ? !r || !r.includes(_) ? n[_] = u : (c || (c = {}))[_] = u : Jt(e.emitsOptions, f) || (!(f in s) || u !== s[f]) && (s[f] = u, o = !0);
    }
  if (r) {
    const f = F(n), u = c || B;
    for (let _ = 0; _ < r.length; _++) {
      const b = r[_];
      n[b] = Tn(i, f, b, u[b], e, !U(u, b));
    }
  }
  return o;
}
function Tn(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const c = U(o, "default");
    if (c && s === void 0) {
      const f = o.default;
      if (o.type !== Function && I(f)) {
        const { propsDefaults: u } = i;
        n in u ? s = u[n] : (at(i), s = u[n] = f.call(null, t), Ze());
      } else
        s = f;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (r && !c ? s = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === ge(n)) && (s = !0));
  }
  return s;
}
function ki(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, c = [];
  let f = !1;
  if (!I(e)) {
    const _ = (b) => {
      f = !0;
      const [y, T] = ki(b, t, !0);
      Z(o, y), T && c.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!r && !f)
    return z(e) && s.set(e, st), st;
  if (D(r))
    for (let _ = 0; _ < r.length; _++) {
      const b = Ie(r[_]);
      ks(b) && (o[b] = B);
    }
  else if (r)
    for (const _ in r) {
      const b = Ie(_);
      if (ks(b)) {
        const y = r[_], T = o[b] = D(y) || I(y) ? { type: y } : Object.assign({}, y);
        if (T) {
          const M = Cs(Boolean, T.type), O = Cs(String, T.type);
          T[
            0
            /* BooleanFlags.shouldCast */
          ] = M > -1, T[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = O < 0 || M < O, (M > -1 || U(T, "default")) && c.push(b);
        }
      }
    }
  const u = [o, c];
  return z(e) && s.set(e, u), u;
}
function ks(e) {
  return e[0] !== "$";
}
function Es(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function xs(e, t) {
  return Es(e) === Es(t);
}
function Cs(e, t) {
  return D(t) ? t.findIndex((n) => xs(n, e)) : I(t) && xs(t, e) ? 0 : -1;
}
const Ei = (e) => e[0] === "_" || e === "$stable", Gn = (e) => D(e) ? e.map(Te) : [Te(e)], vo = (e, t, n) => {
  if (t._n)
    return t;
  const s = Lr((...i) => Gn(t(...i)), n);
  return s._c = !1, s;
}, xi = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Ei(i))
      continue;
    const r = e[i];
    if (I(r))
      t[i] = vo(i, r, s);
    else if (r != null) {
      const o = Gn(r);
      t[i] = () => o;
    }
  }
}, Ci = (e, t) => {
  const n = Gn(t);
  e.slots.default = () => n;
}, bo = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = F(t), Bt(t, "_", n)) : xi(t, e.slots = {});
  } else
    e.slots = {}, t && Ci(e, t);
  Bt(e.slots, nn, 1);
}, yo = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = B;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? r = !1 : (Z(i, t), !n && c === 1 && delete i._) : (r = !t.$stable, xi(t, i)), o = t;
  } else
    t && (Ci(e, t), o = { default: 1 });
  if (r)
    for (const c in i)
      !Ei(c) && !(c in o) && delete i[c];
};
function wi() {
  return {
    app: null,
    config: {
      isNativeTag: Ki,
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
let ko = 0;
function Eo(e, t) {
  return function(s, i = null) {
    I(s) || (s = Object.assign({}, s)), i != null && !z(i) && (i = null);
    const r = wi(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const f = r.app = {
      _uid: ko++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Bo,
      get config() {
        return r.config;
      },
      set config(u) {
      },
      use(u, ..._) {
        return o.has(u) || (u && I(u.install) ? (o.add(u), u.install(f, ..._)) : I(u) && (o.add(u), u(f, ..._))), f;
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), f;
      },
      component(u, _) {
        return _ ? (r.components[u] = _, f) : r.components[u];
      },
      directive(u, _) {
        return _ ? (r.directives[u] = _, f) : r.directives[u];
      },
      mount(u, _, b) {
        if (!c) {
          const y = oe(s, i);
          return y.appContext = r, _ && t ? t(y, u) : e(y, u, b), c = !0, f._container = u, u.__vue_app__ = f, es(y.component) || y.component.proxy;
        }
      },
      unmount() {
        c && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, _) {
        return r.provides[u] = _, f;
      }
    };
    return f;
  };
}
function On(e, t, n, s, i = !1) {
  if (D(e)) {
    e.forEach((y, T) => On(y, t && (D(t) ? t[T] : t), n, s, i));
    return;
  }
  if (gt(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? es(s.component) || s.component.proxy : s.el, o = i ? null : r, { i: c, r: f } = e, u = t && t.r, _ = c.refs === B ? c.refs = {} : c.refs, b = c.setupState;
  if (u != null && u !== f && (Q(u) ? (_[u] = null, U(b, u) && (b[u] = null)) : J(u) && (u.value = null)), I(f))
    je(f, c, 12, [o, _]);
  else {
    const y = Q(f), T = J(f);
    if (y || T) {
      const M = () => {
        if (e.f) {
          const O = y ? U(b, f) ? b[f] : _[f] : f.value;
          i ? D(O) && Un(O, r) : D(O) ? O.includes(r) || O.push(r) : y ? (_[f] = [r], U(b, f) && (b[f] = _[f])) : (f.value = [r], e.k && (_[e.k] = f.value));
        } else
          y ? (_[f] = o, U(b, f) && (b[f] = o)) : T && (f.value = o, e.k && (_[e.k] = o));
      };
      o ? (M.id = -1, le(M, n)) : M();
    }
  }
}
const le = Wr;
function xo(e) {
  return Co(e);
}
function Co(e, t) {
  const n = qi();
  n.__VUE__ = !0;
  const { insert: s, remove: i, patchProp: r, createElement: o, createText: c, createComment: f, setText: u, setElementText: _, parentNode: b, nextSibling: y, setScopeId: T = ye, insertStaticContent: M } = e, O = (l, a, p, m = null, d = null, v = null, E = !1, h = null, k = !!a.dynamicChildren) => {
    if (l === a)
      return;
    l && !Xe(l, a) && (m = At(l), Ee(l, d, v, !0), l = null), a.patchFlag === -2 && (k = !1, a.dynamicChildren = null);
    const { type: g, ref: C, shapeFlag: x } = a;
    switch (g) {
      case tn:
        $(l, a, p, m);
        break;
      case de:
        L(l, a, p, m);
        break;
      case Lt:
        l == null && ue(a, p, m, E);
        break;
      case ie:
        ke(l, a, p, m, d, v, E, h, k);
        break;
      default:
        x & 1 ? ee(l, a, p, m, d, v, E, h, k) : x & 6 ? Ae(l, a, p, m, d, v, E, h, k) : (x & 64 || x & 128) && g.process(l, a, p, m, d, v, E, h, k, et);
    }
    C != null && d && On(C, l && l.ref, v, a || l, !a);
  }, $ = (l, a, p, m) => {
    if (l == null)
      s(a.el = c(a.children), p, m);
    else {
      const d = a.el = l.el;
      a.children !== l.children && u(d, a.children);
    }
  }, L = (l, a, p, m) => {
    l == null ? s(a.el = f(a.children || ""), p, m) : a.el = l.el;
  }, ue = (l, a, p, m) => {
    [l.el, l.anchor] = M(l.children, a, p, m, l.el, l.anchor);
  }, R = ({ el: l, anchor: a }, p, m) => {
    let d;
    for (; l && l !== a; )
      d = y(l), s(l, p, m), l = d;
    s(a, p, m);
  }, V = ({ el: l, anchor: a }) => {
    let p;
    for (; l && l !== a; )
      p = y(l), i(l), l = p;
    i(a);
  }, ee = (l, a, p, m, d, v, E, h, k) => {
    E = E || a.type === "svg", l == null ? Qe(a, p, m, d, v, E, h, k) : X(l, a, d, v, E, h, k);
  }, Qe = (l, a, p, m, d, v, E, h) => {
    let k, g;
    const { type: C, props: x, shapeFlag: w, transition: A, dirs: P } = l;
    if (k = l.el = o(l.type, v, x && x.is, x), w & 8 ? _(k, l.children) : w & 16 && N(l.children, k, null, m, d, v && C !== "foreignObject", E, h), P && We(l, null, m, "created"), x) {
      for (const S in x)
        S !== "value" && !Ft(S) && r(k, S, null, x[S], v, l.children, m, d, De);
      "value" in x && r(k, "value", null, x.value), (g = x.onVnodeBeforeMount) && Ce(g, m, l);
    }
    Ue(k, l, l.scopeId, E, m), P && We(l, null, m, "beforeMount");
    const H = (!d || d && !d.pendingBranch) && A && !A.persisted;
    H && A.beforeEnter(k), s(k, a, p), ((g = x && x.onVnodeMounted) || H || P) && le(() => {
      g && Ce(g, m, l), H && A.enter(k), P && We(l, null, m, "mounted");
    }, d);
  }, Ue = (l, a, p, m, d) => {
    if (p && T(l, p), m)
      for (let v = 0; v < m.length; v++)
        T(l, m[v]);
    if (d) {
      let v = d.subTree;
      if (a === v) {
        const E = d.vnode;
        Ue(l, E, E.scopeId, E.slotScopeIds, d.parent);
      }
    }
  }, N = (l, a, p, m, d, v, E, h, k = 0) => {
    for (let g = k; g < l.length; g++) {
      const C = l[g] = h ? Se(l[g]) : Te(l[g]);
      O(null, C, a, p, m, d, v, E, h);
    }
  }, X = (l, a, p, m, d, v, E) => {
    const h = a.el = l.el;
    let { patchFlag: k, dynamicChildren: g, dirs: C } = a;
    k |= l.patchFlag & 16;
    const x = l.props || B, w = a.props || B;
    let A;
    p && ze(p, !1), (A = w.onVnodeBeforeUpdate) && Ce(A, p, a, l), C && We(a, l, p, "beforeUpdate"), p && ze(p, !0);
    const P = d && a.type !== "foreignObject";
    if (g ? K(l.dynamicChildren, g, h, p, m, P, v) : E || j(l, a, h, null, p, m, P, v, !1), k > 0) {
      if (k & 16)
        ce(h, a, x, w, p, m, d);
      else if (k & 2 && x.class !== w.class && r(h, "class", null, w.class, d), k & 4 && r(h, "style", x.style, w.style, d), k & 8) {
        const H = a.dynamicProps;
        for (let S = 0; S < H.length; S++) {
          const Y = H[S], me = x[Y], tt = w[Y];
          (tt !== me || Y === "value") && r(h, Y, me, tt, d, l.children, p, m, De);
        }
      }
      k & 1 && l.children !== a.children && _(h, a.children);
    } else
      !E && g == null && ce(h, a, x, w, p, m, d);
    ((A = w.onVnodeUpdated) || C) && le(() => {
      A && Ce(A, p, a, l), C && We(a, l, p, "updated");
    }, m);
  }, K = (l, a, p, m, d, v, E) => {
    for (let h = 0; h < a.length; h++) {
      const k = l[h], g = a[h], C = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        k.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (k.type === ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Xe(k, g) || // - In the case of a component, it could contain anything.
        k.shapeFlag & 70) ? b(k.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      O(k, g, C, null, m, d, v, E, !0);
    }
  }, ce = (l, a, p, m, d, v, E) => {
    if (p !== m) {
      if (p !== B)
        for (const h in p)
          !Ft(h) && !(h in m) && r(l, h, p[h], null, E, a.children, d, v, De);
      for (const h in m) {
        if (Ft(h))
          continue;
        const k = m[h], g = p[h];
        k !== g && h !== "value" && r(l, h, g, k, E, a.children, d, v, De);
      }
      "value" in m && r(l, "value", p.value, m.value);
    }
  }, ke = (l, a, p, m, d, v, E, h, k) => {
    const g = a.el = l ? l.el : c(""), C = a.anchor = l ? l.anchor : c("");
    let { patchFlag: x, dynamicChildren: w, slotScopeIds: A } = a;
    A && (h = h ? h.concat(A) : A), l == null ? (s(g, p, m), s(C, p, m), N(a.children, p, C, d, v, E, h, k)) : x > 0 && x & 64 && w && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (K(l.dynamicChildren, w, p, d, v, E, h), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (a.key != null || d && a === d.subTree) && Ti(
      l,
      a,
      !0
      /* shallow */
    )) : j(l, a, p, C, d, v, E, h, k);
  }, Ae = (l, a, p, m, d, v, E, h, k) => {
    a.slotScopeIds = h, l == null ? a.shapeFlag & 512 ? d.ctx.activate(a, p, m, E, k) : pt(a, p, m, d, v, E, k) : ns(l, a, k);
  }, pt = (l, a, p, m, d, v, E) => {
    const h = l.component = No(l, m, d);
    if (Zt(l) && (h.ctx.renderer = et), Po(h), h.asyncDep) {
      if (d && d.registerDep(h, ne), !l.el) {
        const k = h.subTree = oe(de);
        L(null, k, a, p);
      }
      return;
    }
    ne(h, l, a, p, d, v, E);
  }, ns = (l, a, p) => {
    const m = a.component = l.component;
    if (Br(l, a, p))
      if (m.asyncDep && !m.asyncResolved) {
        W(m, a, p);
        return;
      } else
        m.next = a, Pr(m.update), m.update();
    else
      a.el = l.el, m.vnode = a;
  }, ne = (l, a, p, m, d, v, E) => {
    const h = () => {
      if (l.isMounted) {
        let { next: C, bu: x, u: w, parent: A, vnode: P } = l, H = C, S;
        ze(l, !1), C ? (C.el = P.el, W(l, C, E)) : C = P, x && ln(x), (S = C.props && C.props.onVnodeBeforeUpdate) && Ce(S, A, C, P), ze(l, !0);
        const Y = cn(l), me = l.subTree;
        l.subTree = Y, O(
          me,
          Y,
          // parent may have changed if it's in a teleport
          b(me.el),
          // anchor may have changed if it's in a fragment
          At(me),
          l,
          d,
          v
        ), C.el = Y.el, H === null && Vr(l, Y.el), w && le(w, d), (S = C.props && C.props.onVnodeUpdated) && le(() => Ce(S, A, C, P), d);
      } else {
        let C;
        const { el: x, props: w } = a, { bm: A, m: P, parent: H } = l, S = gt(a);
        if (ze(l, !1), A && ln(A), !S && (C = w && w.onVnodeBeforeMount) && Ce(C, H, a), ze(l, !0), x && rn) {
          const Y = () => {
            l.subTree = cn(l), rn(x, l.subTree, l, d, null);
          };
          S ? a.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && Y()
          ) : Y();
        } else {
          const Y = l.subTree = cn(l);
          O(null, Y, p, m, l, d, v), a.el = Y.el;
        }
        if (P && le(P, d), !S && (C = w && w.onVnodeMounted)) {
          const Y = a;
          le(() => Ce(C, H, Y), d);
        }
        (a.shapeFlag & 256 || H && gt(H.vnode) && H.vnode.shapeFlag & 256) && l.a && le(l.a, d), l.isMounted = !0, a = p = m = null;
      }
    }, k = l.effect = new jn(
      h,
      () => $n(g),
      l.scope
      // track it in component's effect scope
    ), g = l.update = () => k.run();
    g.id = l.uid, ze(l, !0), g();
  }, W = (l, a, p) => {
    a.component = l;
    const m = l.vnode.props;
    l.vnode = a, l.next = null, ho(l, a.props, m, p), yo(l, a.children, p), ft(), gs(), ut();
  }, j = (l, a, p, m, d, v, E, h, k = !1) => {
    const g = l && l.children, C = l ? l.shapeFlag : 0, x = a.children, { patchFlag: w, shapeFlag: A } = a;
    if (w > 0) {
      if (w & 128) {
        Ot(g, x, p, m, d, v, E, h, k);
        return;
      } else if (w & 256) {
        Ve(g, x, p, m, d, v, E, h, k);
        return;
      }
    }
    A & 8 ? (C & 16 && De(g, d, v), x !== g && _(p, x)) : C & 16 ? A & 16 ? Ot(g, x, p, m, d, v, E, h, k) : De(g, d, v, !0) : (C & 8 && _(p, ""), A & 16 && N(x, p, m, d, v, E, h, k));
  }, Ve = (l, a, p, m, d, v, E, h, k) => {
    l = l || st, a = a || st;
    const g = l.length, C = a.length, x = Math.min(g, C);
    let w;
    for (w = 0; w < x; w++) {
      const A = a[w] = k ? Se(a[w]) : Te(a[w]);
      O(l[w], A, p, null, d, v, E, h, k);
    }
    g > C ? De(l, d, v, !0, !1, x) : N(a, p, m, d, v, E, h, k, x);
  }, Ot = (l, a, p, m, d, v, E, h, k) => {
    let g = 0;
    const C = a.length;
    let x = l.length - 1, w = C - 1;
    for (; g <= x && g <= w; ) {
      const A = l[g], P = a[g] = k ? Se(a[g]) : Te(a[g]);
      if (Xe(A, P))
        O(A, P, p, null, d, v, E, h, k);
      else
        break;
      g++;
    }
    for (; g <= x && g <= w; ) {
      const A = l[x], P = a[w] = k ? Se(a[w]) : Te(a[w]);
      if (Xe(A, P))
        O(A, P, p, null, d, v, E, h, k);
      else
        break;
      x--, w--;
    }
    if (g > x) {
      if (g <= w) {
        const A = w + 1, P = A < C ? a[A].el : m;
        for (; g <= w; )
          O(null, a[g] = k ? Se(a[g]) : Te(a[g]), p, P, d, v, E, h, k), g++;
      }
    } else if (g > w)
      for (; g <= x; )
        Ee(l[g], d, v, !0), g++;
    else {
      const A = g, P = g, H = /* @__PURE__ */ new Map();
      for (g = P; g <= w; g++) {
        const ae = a[g] = k ? Se(a[g]) : Te(a[g]);
        ae.key != null && H.set(ae.key, g);
      }
      let S, Y = 0;
      const me = w - P + 1;
      let tt = !1, rs = 0;
      const _t = new Array(me);
      for (g = 0; g < me; g++)
        _t[g] = 0;
      for (g = A; g <= x; g++) {
        const ae = l[g];
        if (Y >= me) {
          Ee(ae, d, v, !0);
          continue;
        }
        let xe;
        if (ae.key != null)
          xe = H.get(ae.key);
        else
          for (S = P; S <= w; S++)
            if (_t[S - P] === 0 && Xe(ae, a[S])) {
              xe = S;
              break;
            }
        xe === void 0 ? Ee(ae, d, v, !0) : (_t[xe - P] = g + 1, xe >= rs ? rs = xe : tt = !0, O(ae, a[xe], p, null, d, v, E, h, k), Y++);
      }
      const os = tt ? wo(_t) : st;
      for (S = os.length - 1, g = me - 1; g >= 0; g--) {
        const ae = P + g, xe = a[ae], ls = ae + 1 < C ? a[ae + 1].el : m;
        _t[g] === 0 ? O(null, xe, p, ls, d, v, E, h, k) : tt && (S < 0 || g !== os[S] ? Ke(
          xe,
          p,
          ls,
          2
          /* MoveType.REORDER */
        ) : S--);
      }
    }
  }, Ke = (l, a, p, m, d = null) => {
    const { el: v, type: E, transition: h, children: k, shapeFlag: g } = l;
    if (g & 6) {
      Ke(l.component.subTree, a, p, m);
      return;
    }
    if (g & 128) {
      l.suspense.move(a, p, m);
      return;
    }
    if (g & 64) {
      E.move(l, a, p, et);
      return;
    }
    if (E === ie) {
      s(v, a, p);
      for (let x = 0; x < k.length; x++)
        Ke(k[x], a, p, m);
      s(l.anchor, a, p);
      return;
    }
    if (E === Lt) {
      R(l, a, p);
      return;
    }
    if (m !== 2 && g & 1 && h)
      if (m === 0)
        h.beforeEnter(v), s(v, a, p), le(() => h.enter(v), d);
      else {
        const { leave: x, delayLeave: w, afterLeave: A } = h, P = () => s(v, a, p), H = () => {
          x(v, () => {
            P(), A && A();
          });
        };
        w ? w(v, P, H) : H();
      }
    else
      s(v, a, p);
  }, Ee = (l, a, p, m = !1, d = !1) => {
    const { type: v, props: E, ref: h, children: k, dynamicChildren: g, shapeFlag: C, patchFlag: x, dirs: w } = l;
    if (h != null && On(h, null, p, l, !0), C & 256) {
      a.ctx.deactivate(l);
      return;
    }
    const A = C & 1 && w, P = !gt(l);
    let H;
    if (P && (H = E && E.onVnodeBeforeUnmount) && Ce(H, a, l), C & 6)
      Fi(l.component, p, m);
    else {
      if (C & 128) {
        l.suspense.unmount(p, m);
        return;
      }
      A && We(l, null, a, "beforeUnmount"), C & 64 ? l.type.remove(l, a, p, d, et, m) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== ie || x > 0 && x & 64) ? De(g, a, p, !1, !0) : (v === ie && x & 384 || !d && C & 16) && De(k, a, p), m && ss(l);
    }
    (P && (H = E && E.onVnodeUnmounted) || A) && le(() => {
      H && Ce(H, a, l), A && We(l, null, a, "unmounted");
    }, p);
  }, ss = (l) => {
    const { type: a, el: p, anchor: m, transition: d } = l;
    if (a === ie) {
      Ui(p, m);
      return;
    }
    if (a === Lt) {
      V(l);
      return;
    }
    const v = () => {
      i(p), d && !d.persisted && d.afterLeave && d.afterLeave();
    };
    if (l.shapeFlag & 1 && d && !d.persisted) {
      const { leave: E, delayLeave: h } = d, k = () => E(p, v);
      h ? h(l.el, v, k) : k();
    } else
      v();
  }, Ui = (l, a) => {
    let p;
    for (; l !== a; )
      p = y(l), i(l), l = p;
    i(a);
  }, Fi = (l, a, p) => {
    const { bum: m, scope: d, update: v, subTree: E, um: h } = l;
    m && ln(m), d.stop(), v && (v.active = !1, Ee(E, l, a, p)), h && le(h, a), le(() => {
      l.isUnmounted = !0;
    }, a), a && a.pendingBranch && !a.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === a.pendingId && (a.deps--, a.deps === 0 && a.resolve());
  }, De = (l, a, p, m = !1, d = !1, v = 0) => {
    for (let E = v; E < l.length; E++)
      Ee(l[E], a, p, m, d);
  }, At = (l) => l.shapeFlag & 6 ? At(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : y(l.anchor || l.el), is = (l, a, p) => {
    l == null ? a._vnode && Ee(a._vnode, null, null, !0) : O(a._vnode || null, l, a, null, null, null, p), gs(), ai(), a._vnode = l;
  }, et = {
    p: O,
    um: Ee,
    m: Ke,
    r: ss,
    mt: pt,
    mc: N,
    pc: j,
    pbc: K,
    n: At,
    o: e
  };
  let sn, rn;
  return t && ([sn, rn] = t(et)), {
    render: is,
    hydrate: sn,
    createApp: Eo(is, sn)
  };
}
function ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ti(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (D(s) && D(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let c = i[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = i[r] = Se(i[r]), c.el = o.el), n || Ti(o, c)), c.type === tn && (c.el = o.el);
    }
}
function wo(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, c;
  const f = e.length;
  for (s = 0; s < f; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        c = r + o >> 1, e[n[c]] < u ? r = c + 1 : o = c;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
const To = (e) => e.__isTeleport, ie = Symbol(void 0), tn = Symbol(void 0), de = Symbol(void 0), Lt = Symbol(void 0), vt = [];
let be = null;
function Me(e = !1) {
  vt.push(be = e ? null : []);
}
function Oo() {
  vt.pop(), be = vt[vt.length - 1] || null;
}
let Ct = 1;
function ws(e) {
  Ct += e;
}
function Oi(e) {
  return e.dynamicChildren = Ct > 0 ? be || st : null, Oo(), Ct > 0 && be && be.push(e), e;
}
function lt(e, t, n, s, i, r) {
  return Oi(q(
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
function Jn(e, t, n, s, i) {
  return Oi(oe(
    e,
    t,
    n,
    s,
    i,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Ai(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Xe(e, t) {
  return e.type === t.type && e.key === t.key;
}
const nn = "__vInternal", Di = ({ key: e }) => e ?? null, jt = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? Q(e) || J(e) || I(e) ? { i: re, r: e, k: t, f: !!n } : e : null;
function q(e, t = null, n = null, s = 0, i = null, r = e === ie ? 0 : 1, o = !1, c = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Di(t),
    ref: t && jt(t),
    scopeId: pi,
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
    ctx: re
  };
  return c ? (Qn(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= Q(n) ? 8 : 16), Ct > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && be.push(f), f;
}
const oe = Ao;
function Ao(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === lo) && (e = de), Ai(e)) {
    const c = Be(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Qn(c, n), Ct > 0 && !r && be && (c.shapeFlag & 6 ? be[be.indexOf(e)] = c : be.push(c)), c.patchFlag |= -2, c;
  }
  if (Lo(e) && (e = e.__vccOpts), t) {
    t = Do(t);
    let { class: c, style: f } = t;
    c && !Q(c) && (t.class = Nn(c)), z(f) && (ei(f) && !D(f) && (f = Z({}, f)), t.style = Mn(f));
  }
  const o = Q(e) ? 1 : Kr(e) ? 128 : To(e) ? 64 : z(e) ? 4 : I(e) ? 2 : 0;
  return q(e, t, n, s, i, o, r, !0);
}
function Do(e) {
  return e ? ei(e) || nn in e ? Z({}, e) : e : null;
}
function Be(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = e, c = t ? Ro(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Di(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? D(i) ? i.concat(jt(t)) : [i, jt(t)] : jt(t)
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
    patchFlag: t && e.type !== ie ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && Be(e.ssContent),
    ssFallback: e.ssFallback && Be(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function Zn(e = " ", t = 0) {
  return oe(tn, null, e, t);
}
function Ri(e = "", t = !1) {
  return t ? (Me(), Jn(de, null, e)) : oe(de, null, e);
}
function Te(e) {
  return e == null || typeof e == "boolean" ? oe(de) : D(e) ? oe(
    ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Se(e) : oe(tn, null, String(e));
}
function Se(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Be(e);
}
function Qn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (D(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Qn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(nn in t) ? t._ctx = re : i === 3 && re && (re.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    I(t) ? (t = { default: t, _ctx: re }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Zn(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ro(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Nn([t.class, s.class]));
      else if (i === "style")
        t.style = Mn([t.style, s.style]);
      else if ($t(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(D(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ce(e, t, n, s = null) {
  _e(e, t, 7, [
    n,
    s
  ]);
}
const Io = wi();
let Mo = 0;
function No(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Io, r = {
    uid: Mo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Gi(
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
    propsOptions: ki(s, i),
    emitsOptions: ui(s, i),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Sr.bind(null, r), e.ce && e.ce(r), r;
}
let G = null;
const Ii = () => G || re, at = (e) => {
  G = e, e.scope.on();
}, Ze = () => {
  G && G.scope.off(), G = null;
};
function Mi(e) {
  return e.vnode.shapeFlag & 4;
}
let wt = !1;
function Po(e, t = !1) {
  wt = t;
  const { props: n, children: s } = e.vnode, i = Mi(e);
  go(e, n, i, t), bo(e, s);
  const r = i ? Uo(e, t) : void 0;
  return wt = !1, r;
}
function Uo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ti(new Proxy(e.ctx, ao));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? So(e) : null;
    at(e), ft();
    const r = je(s, e, 0, [e.props, i]);
    if (ut(), Ze(), js(r)) {
      if (r.then(Ze, Ze), t)
        return r.then((o) => {
          Ts(e, o, t);
        }).catch((o) => {
          Gt(
            o,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = r;
    } else
      Ts(e, r, t);
  } else
    Ni(e, t);
}
function Ts(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : z(t) && (e.setupState = ii(t)), Ni(e, n);
}
let Os;
function Ni(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Os && !s.render) {
      const i = s.template || qn(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: f } = s, u = Z(Z({
          isCustomElement: r,
          delimiters: c
        }, o), f);
        s.render = Os(i, u);
      }
    }
    e.render = s.render || ye;
  }
  at(e), ft(), fo(e), ut(), Ze();
}
function Fo(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return fe(e, "get", "$attrs"), t[n];
    }
  });
}
function So(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Fo(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function es(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ii(ti(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ht)
          return ht[n](e);
      },
      has(t, n) {
        return n in t || n in ht;
      }
    }));
}
function Lo(e) {
  return I(e) && "__vccOpts" in e;
}
const bt = (e, t) => Ir(e, t, wt), jo = Symbol(""), Ho = () => St(jo), Bo = "3.2.45", Vo = "http://www.w3.org/2000/svg", qe = typeof document < "u" ? document : null, As = qe && /* @__PURE__ */ qe.createElement("template"), Ko = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? qe.createElementNS(Vo, e) : qe.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => qe.createTextNode(e),
  createComment: (e) => qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => qe.querySelector(e),
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
      As.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = As.content;
      if (s) {
        const f = c.firstChild;
        for (; f.firstChild; )
          c.appendChild(f.firstChild);
        c.removeChild(f);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Wo(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function zo(e, t, n) {
  const s = e.style, i = Q(n);
  if (n && !i) {
    for (const r in n)
      An(s, r, n[r]);
    if (t && !Q(t))
      for (const r in t)
        n[r] == null && An(s, r, "");
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const Ds = /\s*!important$/;
function An(e, t, n) {
  if (D(n))
    n.forEach((s) => An(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = $o(e, t);
    Ds.test(n) ? e.setProperty(ge(s), n.replace(Ds, ""), "important") : e[s] = n;
  }
}
const Rs = ["Webkit", "Moz", "ms"], pn = {};
function $o(e, t) {
  const n = pn[t];
  if (n)
    return n;
  let s = Ie(t);
  if (s !== "filter" && s in e)
    return pn[t] = s;
  s = Vs(s);
  for (let i = 0; i < Rs.length; i++) {
    const r = Rs[i] + s;
    if (r in e)
      return pn[t] = r;
  }
  return t;
}
const Is = "http://www.w3.org/1999/xlink";
function Yo(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Is, t.slice(6, t.length)) : e.setAttributeNS(Is, t, n);
  else {
    const r = Vi(t);
    n == null || r && !Fs(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Xo(e, t, n, s, i, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, i, r), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const f = n ?? "";
    (e.value !== f || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = Fs(n) : n == null && f === "string" ? (n = "", c = !0) : f === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function qo(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Go(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Jo(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [c, f] = Zo(t);
    if (s) {
      const u = r[t] = tl(s, i);
      qo(e, c, u, f);
    } else
      o && (Go(e, c, o, f), r[t] = void 0);
  }
}
const Ms = /(?:Once|Passive|Capture)$/;
function Zo(e) {
  let t;
  if (Ms.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ms); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ge(e.slice(2)), t];
}
let _n = 0;
const Qo = /* @__PURE__ */ Promise.resolve(), el = () => _n || (Qo.then(() => _n = 0), _n = Date.now());
function tl(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    _e(nl(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = el(), n;
}
function nl(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const Ns = /^on[a-z]/, sl = (e, t, n, s, i = !1, r, o, c, f) => {
  t === "class" ? Wo(e, s, i) : t === "style" ? zo(e, n, s) : $t(t) ? Pn(t) || Jo(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : il(e, t, s, i)) ? Xo(e, t, s, r, o, c, f) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Yo(e, t, s, i));
};
function il(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Ns.test(t) && I(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Ns.test(t) && Q(n) ? !1 : t in e;
}
function rl(e, t) {
  const n = Tt(e);
  class s extends ts {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const ol = typeof HTMLElement < "u" ? HTMLElement : class {
};
class ts extends ol {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, li(() => {
      this._connected || (Us(null, this.shadowRoot), this._instance = null);
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
      let c;
      if (r && !D(r))
        for (const f in r) {
          const u = r[f];
          (u === Number || u && u.type === Number) && (f in this._props && (this._props[f] = Vt(this._props[f])), (c || (c = /* @__PURE__ */ Object.create(null)))[Ie(f)] = !0);
        }
      this._numberProps = c, i && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = D(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of s.map(Ie))
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
    const s = Ie(t);
    this._numberProps && this._numberProps[s] && (n = Vt(n)), this._setProp(s, n, !1);
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
    n !== this._props[t] && (this._props[t] = n, i && this._instance && this._update(), s && (n === !0 ? this.setAttribute(ge(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ge(t), n + "") : n || this.removeAttribute(ge(t))));
  }
  _update() {
    Us(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = oe(this._def, Z({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, o) => {
        this.dispatchEvent(new CustomEvent(r, {
          detail: o
        }));
      };
      n.emit = (r, ...o) => {
        s(r, o), ge(r) !== r && s(ge(r), o);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof ts) {
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
function Pi(e) {
  const t = Ii();
  if (!t)
    return;
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((r) => Rn(r, i));
  }, s = () => {
    const i = e(t.proxy);
    Dn(t.subTree, i), n(i);
  };
  $r(s), en(() => {
    const i = new MutationObserver(s);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), Xn(() => i.disconnect());
  });
}
function Dn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      Dn(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Rn(e.el, t);
  else if (e.type === ie)
    e.children.forEach((n) => Dn(n, t));
  else if (e.type === Lt) {
    let { el: n, anchor: s } = e;
    for (; n && (Rn(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function Rn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t)
      n.setProperty(`--${s}`, t[s]);
  }
}
const ll = {
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
Gr.props;
const cl = /* @__PURE__ */ Z({ patchProp: sl }, Ko);
let Ps;
function al() {
  return Ps || (Ps = xo(cl));
}
const Us = (...e) => {
  al().render(...e);
}, fl = { key: 0 }, ul = {
  key: 0,
  class: "up",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 330 330",
  style: { "enable-background": "new 0 0 330 330" },
  "xml:space": "preserve"
}, pl = /* @__PURE__ */ q("path", { d: "m325.606 229.393-150.004-150a14.997 14.997 0 0 0-21.213.001l-149.996 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.393 139.397 139.393A14.953 14.953 0 0 0 315 255a14.95 14.95 0 0 0 10.607-4.394c5.857-5.858 5.857-15.355-.001-21.213z" }, null, -1), _l = [
  pl
], dl = {
  key: 1,
  class: "down",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 330 330",
  style: { "enable-background": "new 0 0 330 330" },
  "xml:space": "preserve"
}, ml = /* @__PURE__ */ q("path", { d: "M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z" }, null, -1), gl = [
  ml
], Ut = Je({}), hl = /* @__PURE__ */ Tt({
  __name: "arrow-check",
  props: {
    amount: null,
    name: null
  },
  setup(e) {
    const t = e, n = bn(!1), s = bn(!1);
    return n.value = t.amount > Ut[t.name], Ut[t.name] && t.amount !== Ut[t.name] && (s.value = !0), en(() => {
      Ut[t.name] = t.amount;
    }), (i, r) => s.value ? (Me(), lt("div", fl, [
      n.value ? (Me(), lt("svg", ul, _l)) : (Me(), lt("svg", dl, gl))
    ])) : Ri("", !0);
  }
}), vl = { class: "inner" }, bl = { class: "val-and-arrow" }, dn = /* @__PURE__ */ Tt({
  __name: "coin-check",
  props: {
    coin: null
  },
  setup(e) {
    const t = e, { coin: n } = Or(t);
    return (s, i) => (Me(), lt("div", {
      key: ve(n).formated
    }, [
      q("div", vl, [
        q("div", null, Ht(ve(n).name), 1),
        q("div", bl, [
          q("div", null, Ht(ve(n).formated), 1),
          oe(hl, {
            amount: ve(n).money ?? 0,
            name: ve(n).name ?? null
          }, null, 8, ["amount", "name"])
        ])
      ])
    ]));
  }
});
const yl = { class: "sub" }, kl = /* @__PURE__ */ Tt({
  __name: "coin-tracker",
  props: {
    pair: null,
    backround: null,
    complex: null
  },
  setup(e) {
    const t = e;
    Pi((y) => ({
      "7ccc8492": e.backround
    }));
    const n = bt(() => t.complex ?? null), s = "https://api.coinbase.com/v2/prices", i = bn(new Date()), r = "BTC-USD", o = "ETH-USD", c = Je({}), f = Je({}), u = Je({});
    async function _(y) {
      const M = await (await fetch(`${s}/${y}/spot`)).json();
      return {
        money: parseFloat(M.data.amount),
        formated: Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(M.data.amount),
        name: y.split("-")[0]
      };
    }
    async function b() {
      const y = await _(r), T = await _(o);
      if (console.log(y, T), f.formated = y.formated, f.money = y.money, f.name = y.name, u.formated = T.formated, u.money = T.money, u.name = T.name, i.value = new Date(), t.pair) {
        const M = await _(t.pair);
        c.formated = M.formated, c.money = M.money, c.name = M.name;
      }
    }
    return b(), setInterval(b, 5e3), (y, T) => (Me(), lt(ie, null, [
      q("section", null, [
        oe(dn, { coin: f }, null, 8, ["coin"]),
        oe(dn, { coin: u }, null, 8, ["coin"]),
        e.pair ? (Me(), Jn(dn, {
          key: 0,
          coin: c
        }, null, 8, ["coin"])) : Ri("", !0)
      ]),
      q("div", yl, [
        Zn(" Last Update: "),
        q("span", null, Ht(i.value), 1)
      ]),
      q("div", null, Ht(JSON.stringify(ve(n))), 1)
    ], 64));
  }
});
var mt = /* @__PURE__ */ ((e) => (e.CHANGE = "MARKET_CHANGE", e.UPDATE = "MARKET_UPDATE", e.SELECT = "MARKET_SELECT", e.ERROR = "MARKET_ERROR", e))(mt || {});
const El = /* @__PURE__ */ Tt({
  __name: "wc-cripto.ce",
  props: {
    backround: null,
    pair: null,
    complex: null
  },
  emits: ["market"],
  setup(e, { emit: t }) {
    const n = e;
    Pi((b) => ({
      "052ad99e": ve(i)
    }));
    const s = (b, y) => {
      t("market", { type: b, data: y });
    }, i = bt(() => n.backround), r = bt(() => n.pair), o = bt(() => n.complex ?? null);
    function c() {
      s(mt.CHANGE, 1);
    }
    function f() {
      s(mt.UPDATE, "update");
    }
    function u() {
      s(mt.SELECT, "select");
    }
    function _() {
      s(mt.ERROR, "error");
    }
    return (b, y) => (Me(), lt(ie, null, [
      co(b.$slots, "header", {}, () => [
        Zn("Default Text")
      ]),
      oe(kl, {
        backround: ve(i),
        pair: ve(r),
        complex: ve(o)
      }, null, 8, ["backround", "pair", "complex"]),
      q("div", { class: "btnHolder" }, [
        q("button", { onClick: c }, "Change"),
        q("button", { onClick: f }, "Update"),
        q("button", { onClick: u }, "Select"),
        q("button", { onClick: _ }, "Error")
      ])
    ], 64));
  }
}), xl = `.sub{font-size:14px;font-weight:700;display:flex;justify-content:center;margin-top:10px}section{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;font-size:2.5rem;margin:0 auto;gap:1rem}section>div{display:flex;justify-content:center;flex-direction:column;align-items:center;box-shadow:0 3px 10px #0003;border-radius:.5rem;width:20%;background-color:var(--052ad99e)}.inner{font-size:1.5rem;display:flex;justify-content:center;flex-direction:column;align-items:center}.val-and-arrow{display:flex;justify-content:center;align-items:center;flex-direction:row;gap:1rem;font-size:1rem}svg{width:30px}.up{fill:green}.down{fill:red}.price-info{display:flex;gap:1.2rem}
`, Cl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, wl = /* @__PURE__ */ Cl(El, [["styles", [xl]]]), Tl = rl(wl);
customElements.define("coin-tracker", Tl);

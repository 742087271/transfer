import { ref as k, reactive as z, computed as b, defineComponent as v, openBlock as h, createElementBlock as _, Fragment as O, renderList as V, toDisplayString as y, createElementVNode as f, normalizeClass as P, withDirectives as q, vModelCheckbox as J, watchEffect as K, nextTick as L, createVNode as g, unref as s, withModifiers as T, mergeProps as A, toHandlers as E } from "vue";
var i = /* @__PURE__ */ ((e) => (e.left = "left", e.right = "right", e))(i || {});
const Q = {
  rightTitle: {
    type: String,
    default: "\u5DF2\u9009\u62E9"
  },
  data: {
    type: Array,
    default: () => []
  }
};
function W(e) {
  const t = k(e);
  function a(l) {
    const o = l.target, n = parseInt(o.value);
    t.value = n;
  }
  return [t, a];
}
function X() {
  const e = z({
    left: [],
    right: []
  });
  function t(l, o) {
    switch (l) {
      case i.left:
        e.left.push(o);
        break;
      case i.right:
        e.right.push(o);
        break;
    }
  }
  function a(l, o) {
    switch (l) {
      case i.left:
        e.left = e.left.filter((n) => n.id !== o);
        break;
      case i.right:
        e.right = e.right.filter((n) => n.id !== o);
        break;
    }
  }
  return [e, t, a];
}
function Y(e, t) {
  const a = k(e);
  function l(n) {
    const r = a.value.map((c) => c.id), d = n.filter(
      (c) => !r.includes(c.id) && !c.disabled
    );
    a.value = [...a.value, ...d], n.forEach((c) => {
      c.checked = !1;
    }), t.left = [];
  }
  function o(n) {
    a.value = a.value.filter((r) => n.every((d) => d.id !== r.id)), n.forEach((r) => {
      r.checked = !1;
    }), t.right = [];
  }
  return [a, l, o];
}
function Z(e, t, a, l) {
  const o = b(() => e[t.value].title), n = b(() => {
    const { data: d } = e[t.value];
    return d.filter((c) => {
      if (!a.value.find(({ id: D }) => D === c.id))
        return c;
    });
  }), r = b(() => ({
    left: !l.right.length,
    right: !l.left.length
  }));
  return {
    leftTitle: o,
    leftListData: n,
    transferButtonDisabled: r
  };
}
function ee() {
  const e = k();
  function t(a) {
    e.value = a;
  }
  return [e, t];
}
const te = ["value"], ae = /* @__PURE__ */ v({
  __name: "Selector",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ["selectChange"],
  setup(e, { emit: t }) {
    const a = (l) => {
      t("selectChange", l);
    };
    return (l, o) => (h(), _("select", {
      onChange: o[0] || (o[0] = (n) => a(n))
    }, [
      (h(!0), _(O, null, V(e.data, (n, r) => (h(), _("option", {
        value: r,
        key: r
      }, y(n), 9, te))), 128))
    ], 32));
  }
}), m = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [l, o] of t)
    a[l] = o;
  return a;
}, ne = /* @__PURE__ */ m(ae, [["__file", "E:/project/transfer/src/modules/transfer/components/Selector.vue"]]), re = { class: "list-title" }, le = /* @__PURE__ */ v({
  __name: "ListTitle",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    return (t, a) => (h(), _("div", re, y(e.title), 1));
  }
});
const S = /* @__PURE__ */ m(le, [["__scopeId", "data-v-db7d5d98"], ["__file", "E:/project/transfer/src/modules/transfer/components/ListTitle.vue"]]), oe = { class: "box button-group" }, se = ["disabled"], ce = ["disabled"], de = /* @__PURE__ */ v({
  __name: "ButtonGroup",
  props: {
    rightButtonDisabled: {
      type: Boolean,
      default: !0
    },
    leftButtonDisabled: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["leftButtonClick", "rightButtonClick"],
  setup(e, { emit: t }) {
    const a = () => {
      t("leftButtonClick");
    }, l = () => {
      t("rightButtonClick");
    };
    return (o, n) => (h(), _("div", oe, [
      f("button", {
        disabled: e.leftButtonDisabled,
        class: "left",
        onClick: a
      }, " < ", 8, se),
      f("button", {
        disabled: e.rightButtonDisabled,
        class: "right",
        onClick: l
      }, " > ", 8, ce)
    ]));
  }
});
const ie = /* @__PURE__ */ m(de, [["__scopeId", "data-v-cee554fe"], ["__file", "E:/project/transfer/src/modules/transfer/components/ButtonGroup.vue"]]), ue = ["draggable", "onDragstart"], fe = ["id", "disabled", "onUpdate:modelValue", "onClick"], he = ["for"], _e = /* @__PURE__ */ v({
  __name: "ListItem",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    leftOrRight: {
      type: String,
      default: i.left,
      validator: (e) => [i.left, i.right].includes(e)
    }
  },
  emits: ["dragItem", "setCheckedData", "removeCheckedData"],
  setup(e, { emit: t }) {
    const a = (o, n, r) => {
      const c = o.target.checked;
      r.checked = c, c ? t("setCheckedData", n, r) : t("removeCheckedData", n, r.id);
    }, l = (o) => {
      t("dragItem", o);
    };
    return (o, n) => (h(!0), _(O, null, V(e.data, (r, d) => (h(), _("div", {
      key: r.id,
      class: P(["list-item", r.disabled ? "disabled" : ""]),
      draggable: !r.disabled,
      onDragstart: (c) => l(r)
    }, [
      q(f("input", {
        type: "checkbox",
        id: `__checkbox__${r.id}`,
        disabled: r.disabled,
        draggable: "true",
        "onUpdate:modelValue": (c) => r.checked = c,
        onClick: (c) => a(c, e.leftOrRight, r)
      }, null, 8, fe), [
        [J, r.checked]
      ]),
      f("label", {
        for: `__checkbox__${r.id}`
      }, y(r.name), 9, he)
    ], 42, ue))), 128));
  }
});
const j = /* @__PURE__ */ m(_e, [["__scopeId", "data-v-4cc3fad3"], ["__file", "E:/project/transfer/src/modules/transfer/components/ListItem.vue"]]), ge = { class: "checkeAll" }, pe = /* @__PURE__ */ v({
  __name: "CheckedAll",
  props: {
    leftOrRight: {
      type: String,
      default: i.left,
      validator: (e) => [i.left, i.right].includes(e)
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ["setCheckedData", "removeCheckedData"],
  setup(e, { emit: t }) {
    const a = e, l = k(null), o = (n) => {
      const { checked: r } = n.target;
      r ? a.data.forEach((d) => {
        d.checked = !0, t("setCheckedData", a.leftOrRight, d);
      }) : a.data.forEach((d) => {
        d.checked = !1, t("setCheckedData", a.leftOrRight, d);
      });
    };
    return K(() => {
      a.data.length && a.data.every((n) => n.checked) ? L(() => {
        console.log(l, "checkBoxRef"), l.value.checked = !0;
      }) : (console.log(l), L(() => {
        l.value.checked = !1;
      }));
    }), (n, r) => (h(), _("span", ge, [
      f("input", {
        ref_key: "checkBoxRef",
        ref: l,
        id: "checkAll",
        type: "checkbox",
        onClick: o
      }, null, 512)
    ]));
  }
});
const w = /* @__PURE__ */ m(pe, [["__scopeId", "data-v-75494384"], ["__file", "E:/project/transfer/src/modules/transfer/components/CheckedAll.vue"]]), ke = { class: "transfer" }, ve = { class: "list-header" }, me = { class: "list-header" }, De = /* @__PURE__ */ v({
  __name: "Transfer",
  props: Q,
  setup(e) {
    const t = e, a = t.data.map((p) => p.title), [l, o] = W(0), [n, r, d] = X(), [c, D, x] = Y(
      [],
      n
    ), F = t.data.map(({ data: p }) => p).flat();
    n.left = F.filter((p) => p.checked);
    const { leftTitle: H, leftListData: B, transferButtonDisabled: I } = Z(
      t.data,
      l,
      c,
      n
    ), [$, M] = ee(), R = {
      setCheckedData: r,
      removeCheckedData: d,
      dragItem: M
    }, N = k(), U = k();
    return (p, u) => (h(), _("div", null, [
      g(ne, {
        data: s(a),
        onSelectChange: s(o)
      }, null, 8, ["data", "onSelectChange"]),
      f("div", ke, [
        f("div", {
          class: "box left-list",
          onDragover: u[0] || (u[0] = T(() => {
          }, ["prevent"])),
          onDrop: u[1] || (u[1] = (C) => s(x)([s($)]))
        }, [
          f("div", ve, [
            g(w, {
              ref_key: "leftCheckAllRef",
              ref: N,
              "left-or-right": s(i).left,
              data: s(B),
              onSetCheckedData: s(r),
              onRemoveCheckedData: s(d)
            }, null, 8, ["left-or-right", "data", "onSetCheckedData", "onRemoveCheckedData"]),
            g(S, { title: s(H) }, null, 8, ["title"])
          ]),
          f("div", null, [
            g(j, A({
              data: s(B),
              "left-or-right": s(i).left
            }, E(R)), null, 16, ["data", "left-or-right"])
          ])
        ], 32),
        g(ie, {
          "left-button-disabled": s(I).left,
          "right-button-disabled": s(I).right,
          onLeftButtonClick: u[2] || (u[2] = (C) => s(x)(s(n).right)),
          onRightButtonClick: u[3] || (u[3] = (C) => s(D)(s(n).left))
        }, null, 8, ["left-button-disabled", "right-button-disabled"]),
        f("div", {
          class: "box right-list",
          onDragover: u[4] || (u[4] = T(() => {
          }, ["prevent"])),
          onDrop: u[5] || (u[5] = (C) => s(D)([s($)]))
        }, [
          f("div", me, [
            g(w, {
              ref_key: "rightCheckAllRef",
              ref: U,
              onSetCheckedData: s(r),
              onRemoveCheckedData: s(d),
              "left-or-right": s(i).right,
              data: s(c)
            }, null, 8, ["onSetCheckedData", "onRemoveCheckedData", "left-or-right", "data"]),
            g(S, { title: p.rightTitle }, null, 8, ["title"])
          ]),
          f("div", null, [
            g(j, A({
              data: s(c),
              "left-or-right": s(i).right
            }, E(R)), null, 16, ["data", "left-or-right"])
          ])
        ], 32)
      ])
    ]));
  }
});
const Ce = /* @__PURE__ */ m(De, [["__scopeId", "data-v-777fe02b"], ["__file", "E:/project/transfer/src/modules/transfer/Transfer.vue"]]), G = {
  Transfer: Ce
}, ye = {
  install(e) {
    for (let t in G)
      e.component(t, G[t]);
  }
};
export {
  ye as default
};

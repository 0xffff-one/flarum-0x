/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forum/components/AddPasskeyButton.tsx":
/*!***************************************************!*\
  !*** ./src/forum/components/AddPasskeyButton.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddPasskeyButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PasskeyButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PasskeyButton */ "./src/forum/components/PasskeyButton.tsx");
/* harmony import */ var _hooks_passkey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/passkey */ "./src/forum/hooks/passkey.ts");






var AddPasskeyButton = /*#__PURE__*/function (_PasskeyButton) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(AddPasskeyButton, _PasskeyButton);
  function AddPasskeyButton() {
    return _PasskeyButton.apply(this, arguments) || this;
  }
  AddPasskeyButton.initAttrs = function initAttrs(attrs) {
    _PasskeyButton.initAttrs.call(this, attrs);
    attrs.className = "Button";
    attrs.onclick = /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_hooks_passkey__WEBPACK_IMPORTED_MODULE_5__.createPasskeyCredential)();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
  };
  var _proto = AddPasskeyButton.prototype;
  _proto.view = function view(vnode) {
    // @ts-ignore
    var vdom = _PasskeyButton.prototype.view.call(this, vnode);
    vdom.text = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.add-new-passkey');
    return vdom;
  };
  return AddPasskeyButton;
}(_PasskeyButton__WEBPACK_IMPORTED_MODULE_4__["default"]);


/***/ }),

/***/ "./src/forum/components/LoginWithPasskeyButton.tsx":
/*!*********************************************************!*\
  !*** ./src/forum/components/LoginWithPasskeyButton.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginWithPasskeyButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PasskeyButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PasskeyButton */ "./src/forum/components/PasskeyButton.tsx");
/* harmony import */ var _hooks_passkey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/passkey */ "./src/forum/hooks/passkey.ts");






var LoginWithPasskeyButton = /*#__PURE__*/function (_PasskeyButton) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(LoginWithPasskeyButton, _PasskeyButton);
  function LoginWithPasskeyButton() {
    return _PasskeyButton.apply(this, arguments) || this;
  }
  LoginWithPasskeyButton.initAttrs = function initAttrs(attrs) {
    _PasskeyButton.initAttrs.call(this, attrs);
    attrs.className = "Button Button--primary Button--block LogInButton";
    attrs.onclick = /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_hooks_passkey__WEBPACK_IMPORTED_MODULE_5__.validatePasskeyCredential)();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
  };
  var _proto = LoginWithPasskeyButton.prototype;
  _proto.view = function view(vnode) {
    // @ts-ignore
    var vdom = _PasskeyButton.prototype.view.call(this, vnode);
    vdom.text = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('hikarilan-passkey-login.forum.login.with-passkey');
    return vdom;
  };
  return LoginWithPasskeyButton;
}(_PasskeyButton__WEBPACK_IMPORTED_MODULE_4__["default"]);


/***/ }),

/***/ "./src/forum/components/PasskeyAliasSetModal.tsx":
/*!*******************************************************!*\
  !*** ./src/forum/components/PasskeyAliasSetModal.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasskeyAliasSetModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);






var PasskeyAliasSetModal = /*#__PURE__*/function (_Modal) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PasskeyAliasSetModal, _Modal);
  function PasskeyAliasSetModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.state = {
      redraw: false
    };
    return _this;
  }
  var _proto = PasskeyAliasSetModal.prototype;
  _proto.className = function className() {
    return "passkey-alias-set-modal";
  };
  _proto.title = function title() {
    return m("p", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("hikarilan-passkey-login.forum.user.settings.alias-modal.title"));
  };
  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form Form--centered"
    }, m("p", {
      className: "helpText"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("hikarilan-passkey-login.forum.user.settings.alias-modal.label")), m("div", {
      className: "Form-group"
    }, m("input", {
      className: "FormControl",
      type: "text",
      name: "alias",
      required: true,
      minlength: "1",
      maxlength: "255",
      placeholder: window.navigator.platform,
      disabled: this.loading
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button Button--primary Button--block",
      type: "submit",
      loading: this.loading
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('core.forum.change_email.submit_button')))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var _elements$namedItem;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.loading = true;
            _context.prev = 2;
            _context.next = 5;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().store.find('passkeys', this.attrs.id);
          case 5:
            _context.next = 7;
            return _context.sent.save({
              alias: (_elements$namedItem = e.target.elements.namedItem('alias')) == null ? void 0 : _elements$namedItem.value
            });
          case 7:
            this.state.redraw = true;
            _context.next = 13;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            throw _context.t0;
          case 13:
            _context.prev = 13;
            this.loading = false;
            return _context.finish(13);
          case 16:
            _context.next = 18;
            return this.hide();
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[2, 10, 13, 16]]);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  _proto.hide = /*#__PURE__*/function () {
    var _hide = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _Modal.prototype.hide.call(this);
            if (this.state.redraw) {
              _context2.next = 6;
              break;
            }
            _context2.next = 5;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().store.find('passkeys', this.attrs.id);
          case 5:
            m.redraw();
          case 6:
            _context2.prev = 6;
            this.state.redraw = false;
            return _context2.finish(6);
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0,, 6, 9]]);
    }));
    function hide() {
      return _hide.apply(this, arguments);
    }
    return hide;
  }();
  return PasskeyAliasSetModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4___default()));


/***/ }),

/***/ "./src/forum/components/PasskeyButton.tsx":
/*!************************************************!*\
  !*** ./src/forum/components/PasskeyButton.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasskeyButton)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_passkey__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/passkey */ "./src/forum/hooks/passkey.ts");





var PasskeyButton = /*#__PURE__*/function (_Button) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PasskeyButton, _Button);
  function PasskeyButton() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Button.call.apply(_Button, [this].concat(args)) || this;
    _this.disabled = false;
    return _this;
  }
  var _proto = PasskeyButton.prototype;
  _proto.oncreate = /*#__PURE__*/function () {
    var _oncreate = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(vnode) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _Button.prototype.oncreate.call(this, vnode);
            _context.next = 3;
            return (0,_hooks_passkey__WEBPACK_IMPORTED_MODULE_4__.isAvailable)();
          case 3:
            this.disabled = !_context.sent;
            m.redraw();
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function oncreate(_x) {
      return _oncreate.apply(this, arguments);
    }
    return oncreate;
  }();
  _proto.view = function view(vnode) {
    var vdom = _Button.prototype.view.call(this, vnode);
    // @ts-ignore
    vdom.attrs.disabled = this.disabled;
    return vdom;
  };
  return PasskeyButton;
}((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/PasskeyElement.tsx":
/*!*************************************************!*\
  !*** ./src/forum/components/PasskeyElement.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasskeyElement)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_LabelValue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/LabelValue */ "flarum/common/components/LabelValue");
/* harmony import */ var flarum_common_components_LabelValue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LabelValue__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/helpers/humanTime */ "flarum/common/helpers/humanTime");
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8__);









var PasskeyElement = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PasskeyElement, _Component);
  function PasskeyElement() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = PasskeyElement.prototype;
  _proto.view = function view(vnode) {
    var _this$attrs$passkey$a,
      _this = this;
    if (!this.attrs.passkey.exists) return null;
    return m("div", {
      className: "PasskeysList-item"
    }, m("div", {
      className: "PasskeysList-item-icon"
    }, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default()('fas fa-key')), m("div", {
      className: "PasskeysList-item-info"
    }, m("div", {
      className: "PasskeysList-item-title"
    }, m("span", {
      className: "PasskeysList-item-title-main"
    }, (_this$attrs$passkey$a = this.attrs.passkey.alias()) != null && _this$attrs$passkey$a.length ? this.attrs.passkey.alias() : this.attrs.passkey.identifier())), m("div", {
      className: "PasskeysList-item-createdAt"
    }, m((flarum_common_components_LabelValue__WEBPACK_IMPORTED_MODULE_6___default()), {
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('core.forum.security.created'),
      value: flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_7___default()(this.attrs.passkey.createdAt())
    })), m("div", {
      className: "PasskeysList-item-lastSeenAt"
    }, m((flarum_common_components_LabelValue__WEBPACK_IMPORTED_MODULE_6___default()), {
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('core.forum.security.last_activity'),
      value: flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_7___default()(this.attrs.passkey.lastSeenAt())
    }))), m("div", {
      className: "PasskeysList-item-actions"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8___default()), {
      className: "Button Button--danger",
      onclick: function onclick() {
        return _this.revoke();
      }
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("hikarilan-passkey-login.forum.user.settings.item.revoke"))));
  };
  _proto.revoke = /*#__PURE__*/function () {
    var _revoke = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.attrs.passkey["delete"]();
          case 2:
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().alerts.show({
              type: 'success'
            }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("hikarilan-passkey-login.forum.user.settings.item.revoke_success", {
              count: 1
            }));
            m.redraw();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function revoke() {
      return _revoke.apply(this, arguments);
    }
    return revoke;
  }();
  return PasskeyElement;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default()));


/***/ }),

/***/ "./src/forum/components/PasskeySettings.tsx":
/*!**************************************************!*\
  !*** ./src/forum/components/PasskeySettings.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasskeySettings)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/FieldSet */ "flarum/common/components/FieldSet");
/* harmony import */ var flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _AddPasskeyButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AddPasskeyButton */ "./src/forum/components/AddPasskeyButton.tsx");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _PasskeyElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PasskeyElement */ "./src/forum/components/PasskeyElement.tsx");











var PasskeySettings = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PasskeySettings, _Component);
  function PasskeySettings() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      loading: true,
      error: false
    };
    return _this;
  }
  var _proto = PasskeySettings.prototype;
  _proto.oncreate = /*#__PURE__*/function () {
    var _oncreate = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(vnode) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _Component.prototype.oncreate.call(this, vnode);
            _context.next = 3;
            return this.loadPasskey();
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function oncreate(_x) {
      return _oncreate.apply(this, arguments);
    }
    return oncreate;
  }();
  _proto.view = function view(vnode) {
    var passkeys = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().store.all('passkeys');
    return m((flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_5___default()), {
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.title')
    }, m("span", {
      className: "helpText"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.label')), this.state.loading ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_7___default()), {
      containerClassName: "Passkeys-Loading"
    }) : this.state.error ? m("p", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('hikarilan-passkey-login.forum.user.settings.passkeys.error')) : !passkeys.length ? m("div", {
      className: "PasskeyList--empty"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('core.forum.security.empty_text')) : m("div", {
      className: "PasskeysList"
    }, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_8___default()(this.generatePasskeysList(passkeys).toArray(), 'div')), m(_AddPasskeyButton__WEBPACK_IMPORTED_MODULE_6__["default"], null));
  };
  _proto.loadPasskey = /*#__PURE__*/function () {
    var _loadPasskey = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().store.find('passkeys');
          case 3:
            m.redraw();
            _context2.next = 10;
            break;
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            this.state.error = true;
            throw _context2.t0;
          case 10:
            _context2.prev = 10;
            this.state.loading = false;
            return _context2.finish(10);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0, 6, 10, 13]]);
    }));
    function loadPasskey() {
      return _loadPasskey.apply(this, arguments);
    }
    return loadPasskey;
  }();
  _proto.generatePasskeysList = function generatePasskeysList(passkeys) {
    var items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_9___default())();
    passkeys.forEach(function (passkey) {
      items.add(passkey.identifier(), m(_PasskeyElement__WEBPACK_IMPORTED_MODULE_10__["default"], {
        passkey: passkey
      }));
    });
    return items;
  };
  return PasskeySettings;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default()));


/***/ }),

/***/ "./src/forum/extend.ts":
/*!*****************************!*\
  !*** ./src/forum/extend.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Passkey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Passkey */ "./src/forum/models/Passkey.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('passkeys', _models_Passkey__WEBPACK_IMPORTED_MODULE_1__["default"])]);

/***/ }),

/***/ "./src/forum/extenders/add_passkey_button.tsx":
/*!****************************************************!*\
  !*** ./src/forum/extenders/add_passkey_button.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addPasskeyButton)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/LogInButtons */ "flarum/forum/components/LogInButtons");
/* harmony import */ var flarum_forum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_LoginWithPasskeyButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/LoginWithPasskeyButton */ "./src/forum/components/LoginWithPasskeyButton.tsx");



function addPasskeyButton() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_forum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'items', function (items) {
    items.add("login-with-passkey", m(_components_LoginWithPasskeyButton__WEBPACK_IMPORTED_MODULE_2__["default"], null), 1);
  });
}

/***/ }),

/***/ "./src/forum/extenders/add_passkey_settings.tsx":
/*!******************************************************!*\
  !*** ./src/forum/extenders/add_passkey_settings.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addPasskeySettings)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_UserSecurityPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/UserSecurityPage */ "flarum/forum/components/UserSecurityPage");
/* harmony import */ var flarum_forum_components_UserSecurityPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserSecurityPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_PasskeySettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PasskeySettings */ "./src/forum/components/PasskeySettings.tsx");




function addPasskeySettings() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_UserSecurityPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'settingsItems', function (items) {
    if (this.user !== (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user) {
      return;
    }
    items.add('passkeys', m(_components_PasskeySettings__WEBPACK_IMPORTED_MODULE_3__["default"], null), 5);
  });
}

/***/ }),

/***/ "./src/forum/hooks/passkey.ts":
/*!************************************!*\
  !*** ./src/forum/hooks/passkey.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPasskeyCredential: () => (/* binding */ createPasskeyCredential),
/* harmony export */   isAvailable: () => (/* binding */ isAvailable),
/* harmony export */   validatePasskeyCredential: () => (/* binding */ validatePasskeyCredential)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _simplewebauthn_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @simplewebauthn/browser */ "./node_modules/@simplewebauthn/browser/dist/bundle/index.js");
/* harmony import */ var _components_PasskeyAliasSetModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PasskeyAliasSetModal */ "./src/forum/components/PasskeyAliasSetModal.tsx");





var isPlatformAuthenticatorIsAvailable = null;
function isAvailable() {
  return _isAvailable.apply(this, arguments);
}
function _isAvailable() {
  _isAvailable = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(isPlatformAuthenticatorIsAvailable === null)) {
            _context.next = 4;
            break;
          }
          _context.next = 3;
          return (0,_simplewebauthn_browser__WEBPACK_IMPORTED_MODULE_3__.platformAuthenticatorIsAvailable)();
        case 3:
          isPlatformAuthenticatorIsAvailable = _context.sent;
        case 4:
          return _context.abrupt("return", isPlatformAuthenticatorIsAvailable);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _isAvailable.apply(this, arguments);
}
function createPasskeyCredential() {
  return _createPasskeyCredential.apply(this, arguments);
}
function _createPasskeyCredential() {
  _createPasskeyCredential = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
    var resp, attResp, registrationResp;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
            url: "/authorization/passkey/registration/options",
            method: "GET"
          });
        case 2:
          resp = _context2.sent;
          _context2.next = 5;
          return (0,_simplewebauthn_browser__WEBPACK_IMPORTED_MODULE_3__.startRegistration)(resp);
        case 5:
          attResp = _context2.sent;
          _context2.next = 8;
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
            url: "/authorization/passkey/registration",
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: attResp
          });
        case 8:
          registrationResp = _context2.sent;
          _context2.next = 11;
          return requireSetAlias(registrationResp.id);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _createPasskeyCredential.apply(this, arguments);
}
function requireSetAlias(_x) {
  return _requireSetAlias.apply(this, arguments);
}
function _requireSetAlias() {
  _requireSetAlias = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(id) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // @ts-ignore
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_components_PasskeyAliasSetModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
            id: id
          });
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _requireSetAlias.apply(this, arguments);
}
function validatePasskeyCredential() {
  return _validatePasskeyCredential.apply(this, arguments);
}
function _validatePasskeyCredential() {
  _validatePasskeyCredential = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4() {
    var resp, asrResp;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
            url: "/authorization/passkey/assertion/options",
            method: "GET"
          });
        case 2:
          resp = _context4.sent;
          _context4.next = 5;
          return (0,_simplewebauthn_browser__WEBPACK_IMPORTED_MODULE_3__.startAuthentication)(resp);
        case 5:
          asrResp = _context4.sent;
          _context4.next = 8;
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
            url: "/authorization/passkey/assertion",
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: asrResp
          });
        case 8:
          window.location.reload();
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _validatePasskeyCredential.apply(this, arguments);
}

/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extenders_add_passkey_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extenders/add_passkey_button */ "./src/forum/extenders/add_passkey_button.tsx");
/* harmony import */ var _extenders_add_passkey_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extenders/add_passkey_settings */ "./src/forum/extenders/add_passkey_settings.tsx");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extend */ "./src/forum/extend.ts");




flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('hikarilan/flarum-passkey-login', function () {
  (0,_extenders_add_passkey_button__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_extenders_add_passkey_settings__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./src/forum/models/Passkey.ts":
/*!*************************************!*\
  !*** ./src/forum/models/Passkey.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Passkey)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var Passkey = /*#__PURE__*/function (_Model) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Passkey, _Model);
  function Passkey() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.identifier = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('id');
    _this.userId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('user_id');
    _this.alias = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('alias');
    _this.createdAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('created_at', function (o) {
      return flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate(o);
    });
    _this.lastSeenAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('last_seen_at', function (o) {
      return flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate(o);
    });
    return _this;
  }
  return Passkey;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/FieldSet":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/FieldSet']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/FieldSet'];

/***/ }),

/***/ "flarum/common/components/LabelValue":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LabelValue']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LabelValue'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/extenders":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/extenders']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extenders'];

/***/ }),

/***/ "flarum/common/helpers/humanTime":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/humanTime']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/humanTime'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/LogInButtons":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/LogInButtons']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/LogInButtons'];

/***/ }),

/***/ "flarum/forum/components/UserSecurityPage":
/*!**************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserSecurityPage']" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/UserSecurityPage'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/construct.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/construct.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _construct)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");


function _construct(Parent, args, Class) {
  if ((0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeFunction)
/* harmony export */ });
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _wrapNativeSuper)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNativeFunction.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js");
/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./construct.js */ "./node_modules/@babel/runtime/helpers/esm/construct.js");




function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !(0,_isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return (0,_construct_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Class, arguments, (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

/***/ }),

/***/ "./node_modules/@simplewebauthn/browser/dist/bundle/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@simplewebauthn/browser/dist/bundle/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebAuthnAbortService: () => (/* binding */ WebAuthnAbortService),
/* harmony export */   base64URLStringToBuffer: () => (/* binding */ base64URLStringToBuffer),
/* harmony export */   browserSupportsWebAuthn: () => (/* binding */ browserSupportsWebAuthn),
/* harmony export */   browserSupportsWebAuthnAutofill: () => (/* binding */ browserSupportsWebAuthnAutofill),
/* harmony export */   bufferToBase64URLString: () => (/* binding */ bufferToBase64URLString),
/* harmony export */   platformAuthenticatorIsAvailable: () => (/* binding */ platformAuthenticatorIsAvailable),
/* harmony export */   startAuthentication: () => (/* binding */ startAuthentication),
/* harmony export */   startRegistration: () => (/* binding */ startRegistration)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");





function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* [@simplewebauthn/browser@8.3.4] */
function utf8StringToBuffer(value) {
  return new TextEncoder().encode(value);
}
function bufferToBase64URLString(buffer) {
  var bytes = new Uint8Array(buffer);
  var str = '';
  for (var _iterator = _createForOfIteratorHelperLoose(bytes), _step; !(_step = _iterator()).done;) {
    var charCode = _step.value;
    str += String.fromCharCode(charCode);
  }
  var base64String = btoa(str);
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function base64URLStringToBuffer(base64URLString) {
  var base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/');
  var padLength = (4 - base64.length % 4) % 4;
  var padded = base64.padEnd(base64.length + padLength, '=');
  var binary = atob(padded);
  var buffer = new ArrayBuffer(binary.length);
  var bytes = new Uint8Array(buffer);
  for (var i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}
function browserSupportsWebAuthn() {
  var _window;
  return ((_window = window) == null ? void 0 : _window.PublicKeyCredential) !== undefined && typeof window.PublicKeyCredential === 'function';
}
function toPublicKeyCredentialDescriptor(descriptor) {
  var id = descriptor.id;
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, descriptor, {
    id: base64URLStringToBuffer(id),
    transports: descriptor.transports
  });
}
function isValidDomain(hostname) {
  return hostname === 'localhost' || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(hostname);
}
var WebAuthnError = /*#__PURE__*/function (_Error) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(WebAuthnError, _Error);
  function WebAuthnError(_ref) {
    var _this;
    var message = _ref.message,
      code = _ref.code,
      cause = _ref.cause,
      name = _ref.name;
    _this = _Error.call(this, message, {
      cause: cause
    }) || this;
    _this.name = name != null ? name : cause.name;
    _this.code = code;
    return _this;
  }
  return WebAuthnError;
}( /*#__PURE__*/(0,_babel_runtime_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_2__["default"])(Error));
function identifyRegistrationError(_ref2) {
  var error = _ref2.error,
    options = _ref2.options;
  var publicKey = options.publicKey;
  if (!publicKey) {
    throw Error('options was missing required publicKey property');
  }
  if (error.name === 'AbortError') {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: 'Registration ceremony was sent an abort signal',
        code: 'ERROR_CEREMONY_ABORTED',
        cause: error
      });
    }
  } else if (error.name === 'ConstraintError') {
    var _publicKey$authentica, _publicKey$authentica2;
    if (((_publicKey$authentica = publicKey.authenticatorSelection) == null ? void 0 : _publicKey$authentica.requireResidentKey) === true) {
      return new WebAuthnError({
        message: 'Discoverable credentials were required but no available authenticator supported it',
        code: 'ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT',
        cause: error
      });
    } else if (((_publicKey$authentica2 = publicKey.authenticatorSelection) == null ? void 0 : _publicKey$authentica2.userVerification) === 'required') {
      return new WebAuthnError({
        message: 'User verification was required but no available authenticator supported it',
        code: 'ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT',
        cause: error
      });
    }
  } else if (error.name === 'InvalidStateError') {
    return new WebAuthnError({
      message: 'The authenticator was previously registered',
      code: 'ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED',
      cause: error
    });
  } else if (error.name === 'NotAllowedError') {
    return new WebAuthnError({
      message: error.message,
      code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY',
      cause: error
    });
  } else if (error.name === 'NotSupportedError') {
    var validPubKeyCredParams = publicKey.pubKeyCredParams.filter(function (param) {
      return param.type === 'public-key';
    });
    if (validPubKeyCredParams.length === 0) {
      return new WebAuthnError({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: 'ERROR_MALFORMED_PUBKEYCREDPARAMS',
        cause: error
      });
    }
    return new WebAuthnError({
      message: 'No available authenticator supported any of the specified pubKeyCredParams algorithms',
      code: 'ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG',
      cause: error
    });
  } else if (error.name === 'SecurityError') {
    var effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: window.location.hostname + " is an invalid domain",
        code: 'ERROR_INVALID_DOMAIN',
        cause: error
      });
    } else if (publicKey.rp.id !== effectiveDomain) {
      return new WebAuthnError({
        message: "The RP ID \"" + publicKey.rp.id + "\" is invalid for this domain",
        code: 'ERROR_INVALID_RP_ID',
        cause: error
      });
    }
  } else if (error.name === 'TypeError') {
    if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) {
      return new WebAuthnError({
        message: 'User ID was not between 1 and 64 characters',
        code: 'ERROR_INVALID_USER_ID_LENGTH',
        cause: error
      });
    }
  } else if (error.name === 'UnknownError') {
    return new WebAuthnError({
      message: 'The authenticator was unable to process the specified options, or could not create a new credential',
      code: 'ERROR_AUTHENTICATOR_GENERAL_ERROR',
      cause: error
    });
  }
  return error;
}
var BaseWebAuthnAbortService = /*#__PURE__*/function () {
  function BaseWebAuthnAbortService() {}
  var _proto = BaseWebAuthnAbortService.prototype;
  _proto.createNewAbortSignal = function createNewAbortSignal() {
    if (this.controller) {
      var abortError = new Error('Cancelling existing WebAuthn API call for new one');
      abortError.name = 'AbortError';
      this.controller.abort(abortError);
    }
    var newController = new AbortController();
    this.controller = newController;
    return newController.signal;
  };
  _proto.cancelCeremony = function cancelCeremony() {
    if (this.controller) {
      var abortError = new Error('Manually cancelling existing WebAuthn API call');
      abortError.name = 'AbortError';
      this.controller.abort(abortError);
      this.controller = undefined;
    }
  };
  return BaseWebAuthnAbortService;
}();
var WebAuthnAbortService = new BaseWebAuthnAbortService();
var attachments = ['cross-platform', 'platform'];
function toAuthenticatorAttachment(attachment) {
  if (!attachment) {
    return;
  }
  if (attachments.indexOf(attachment) < 0) {
    return;
  }
  return attachment;
}
function startRegistration(_x) {
  return _startRegistration.apply(this, arguments);
}
function _startRegistration() {
  _startRegistration = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__.mark(function _callee(creationOptionsJSON) {
    var _creationOptionsJSON$;
    var publicKey, options, credential, _credential, id, rawId, response, type, transports, responsePublicKeyAlgorithm, responsePublicKey, _publicKey, responseAuthenticatorData;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (browserSupportsWebAuthn()) {
            _context.next = 2;
            break;
          }
          throw new Error('WebAuthn is not supported in this browser');
        case 2:
          publicKey = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, creationOptionsJSON, {
            challenge: base64URLStringToBuffer(creationOptionsJSON.challenge),
            user: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, creationOptionsJSON.user, {
              id: utf8StringToBuffer(creationOptionsJSON.user.id)
            }),
            excludeCredentials: (_creationOptionsJSON$ = creationOptionsJSON.excludeCredentials) == null ? void 0 : _creationOptionsJSON$.map(toPublicKeyCredentialDescriptor)
          });
          options = {
            publicKey: publicKey
          };
          options.signal = WebAuthnAbortService.createNewAbortSignal();
          _context.prev = 5;
          _context.next = 8;
          return navigator.credentials.create(options);
        case 8:
          credential = _context.sent;
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          throw identifyRegistrationError({
            error: _context.t0,
            options: options
          });
        case 14:
          if (credential) {
            _context.next = 16;
            break;
          }
          throw new Error('Registration was not completed');
        case 16:
          _credential = credential, id = _credential.id, rawId = _credential.rawId, response = _credential.response, type = _credential.type;
          transports = undefined;
          if (typeof response.getTransports === 'function') {
            transports = response.getTransports();
          }
          responsePublicKeyAlgorithm = undefined;
          if (typeof response.getPublicKeyAlgorithm === 'function') {
            try {
              responsePublicKeyAlgorithm = response.getPublicKeyAlgorithm();
            } catch (error) {
              warnOnBrokenImplementation('getPublicKeyAlgorithm()', error);
            }
          }
          responsePublicKey = undefined;
          if (typeof response.getPublicKey === 'function') {
            try {
              _publicKey = response.getPublicKey();
              if (_publicKey !== null) {
                responsePublicKey = bufferToBase64URLString(_publicKey);
              }
            } catch (error) {
              warnOnBrokenImplementation('getPublicKey()', error);
            }
          }
          if (typeof response.getAuthenticatorData === 'function') {
            try {
              responseAuthenticatorData = bufferToBase64URLString(response.getAuthenticatorData());
            } catch (error) {
              warnOnBrokenImplementation('getAuthenticatorData()', error);
            }
          }
          return _context.abrupt("return", {
            id: id,
            rawId: bufferToBase64URLString(rawId),
            response: {
              attestationObject: bufferToBase64URLString(response.attestationObject),
              clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
              transports: transports,
              publicKeyAlgorithm: responsePublicKeyAlgorithm,
              publicKey: responsePublicKey,
              authenticatorData: responseAuthenticatorData
            },
            type: type,
            clientExtensionResults: credential.getClientExtensionResults(),
            authenticatorAttachment: toAuthenticatorAttachment(credential.authenticatorAttachment)
          });
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 11]]);
  }));
  return _startRegistration.apply(this, arguments);
}
function warnOnBrokenImplementation(methodName, cause) {
  console.warn("The browser extension that intercepted this WebAuthn API call incorrectly implemented " + methodName + ". You should report this error to them.\n", cause);
}
function bufferToUTF8String(value) {
  return new TextDecoder('utf-8').decode(value);
}
function browserSupportsWebAuthnAutofill() {
  var globalPublicKeyCredential = window.PublicKeyCredential;
  if (globalPublicKeyCredential.isConditionalMediationAvailable === undefined) {
    return new Promise(function (resolve) {
      return resolve(false);
    });
  }
  return globalPublicKeyCredential.isConditionalMediationAvailable();
}
function identifyAuthenticationError(_ref3) {
  var error = _ref3.error,
    options = _ref3.options;
  var publicKey = options.publicKey;
  if (!publicKey) {
    throw Error('options was missing required publicKey property');
  }
  if (error.name === 'AbortError') {
    if (options.signal instanceof AbortSignal) {
      return new WebAuthnError({
        message: 'Authentication ceremony was sent an abort signal',
        code: 'ERROR_CEREMONY_ABORTED',
        cause: error
      });
    }
  } else if (error.name === 'NotAllowedError') {
    return new WebAuthnError({
      message: error.message,
      code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY',
      cause: error
    });
  } else if (error.name === 'SecurityError') {
    var effectiveDomain = window.location.hostname;
    if (!isValidDomain(effectiveDomain)) {
      return new WebAuthnError({
        message: window.location.hostname + " is an invalid domain",
        code: 'ERROR_INVALID_DOMAIN',
        cause: error
      });
    } else if (publicKey.rpId !== effectiveDomain) {
      return new WebAuthnError({
        message: "The RP ID \"" + publicKey.rpId + "\" is invalid for this domain",
        code: 'ERROR_INVALID_RP_ID',
        cause: error
      });
    }
  } else if (error.name === 'UnknownError') {
    return new WebAuthnError({
      message: 'The authenticator was unable to process the specified options, or could not create a new assertion signature',
      code: 'ERROR_AUTHENTICATOR_GENERAL_ERROR',
      cause: error
    });
  }
  return error;
}
function startAuthentication(_x2, _x3) {
  return _startAuthentication.apply(this, arguments);
}
function _startAuthentication() {
  _startAuthentication = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__.mark(function _callee2(requestOptionsJSON, useBrowserAutofill) {
    var _requestOptionsJSON$a;
    var allowCredentials, _requestOptionsJSON$a2, publicKey, options, eligibleInputs, credential, _credential2, id, rawId, response, type, userHandle;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (useBrowserAutofill === void 0) {
            useBrowserAutofill = false;
          }
          if (browserSupportsWebAuthn()) {
            _context2.next = 3;
            break;
          }
          throw new Error('WebAuthn is not supported in this browser');
        case 3:
          if (((_requestOptionsJSON$a = requestOptionsJSON.allowCredentials) == null ? void 0 : _requestOptionsJSON$a.length) !== 0) {
            allowCredentials = (_requestOptionsJSON$a2 = requestOptionsJSON.allowCredentials) == null ? void 0 : _requestOptionsJSON$a2.map(toPublicKeyCredentialDescriptor);
          }
          publicKey = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, requestOptionsJSON, {
            challenge: base64URLStringToBuffer(requestOptionsJSON.challenge),
            allowCredentials: allowCredentials
          });
          options = {};
          if (!useBrowserAutofill) {
            _context2.next = 16;
            break;
          }
          _context2.next = 9;
          return browserSupportsWebAuthnAutofill();
        case 9:
          if (_context2.sent) {
            _context2.next = 11;
            break;
          }
          throw Error('Browser does not support WebAuthn autofill');
        case 11:
          eligibleInputs = document.querySelectorAll('input[autocomplete$=\'webauthn\']');
          if (!(eligibleInputs.length < 1)) {
            _context2.next = 14;
            break;
          }
          throw Error('No <input> with "webauthn" as the only or last value in its `autocomplete` attribute was detected');
        case 14:
          options.mediation = 'conditional';
          publicKey.allowCredentials = [];
        case 16:
          options.publicKey = publicKey;
          options.signal = WebAuthnAbortService.createNewAbortSignal();
          _context2.prev = 18;
          _context2.next = 21;
          return navigator.credentials.get(options);
        case 21:
          credential = _context2.sent;
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](18);
          throw identifyAuthenticationError({
            error: _context2.t0,
            options: options
          });
        case 27:
          if (credential) {
            _context2.next = 29;
            break;
          }
          throw new Error('Authentication was not completed');
        case 29:
          _credential2 = credential, id = _credential2.id, rawId = _credential2.rawId, response = _credential2.response, type = _credential2.type;
          userHandle = undefined;
          if (response.userHandle) {
            userHandle = bufferToUTF8String(response.userHandle);
          }
          return _context2.abrupt("return", {
            id: id,
            rawId: bufferToBase64URLString(rawId),
            response: {
              authenticatorData: bufferToBase64URLString(response.authenticatorData),
              clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
              signature: bufferToBase64URLString(response.signature),
              userHandle: userHandle
            },
            type: type,
            clientExtensionResults: credential.getClientExtensionResults(),
            authenticatorAttachment: toAuthenticatorAttachment(credential.authenticatorAttachment)
          });
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[18, 24]]);
  }));
  return _startAuthentication.apply(this, arguments);
}
function platformAuthenticatorIsAvailable() {
  if (!browserSupportsWebAuthn()) {
    return new Promise(function (resolve) {
      return resolve(false);
    });
  }
  return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.extend)
/* harmony export */ });
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map
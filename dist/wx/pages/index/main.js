require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(11);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4bd51574_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(25);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4bd51574"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4bd51574_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4bd51574", Component.options)
  } else {
    hotAPI.reload("data-v-4bd51574", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_card__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mpvue_weui_src_button__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mpvue_weui_src_toast__ = __webpack_require__(21);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      lastTouchTime: 0,
      startTime: 0,
      finishTime: 0,
      dis1: false,
      dis2: true,
      intervalNum: '',
      showToast: false,
      showToastLogin: false,
      content: "60秒内不许再次打卡",
      contentLogin: '未登录',
      userInfo: 0,
      status: 1
    };
  },


  components: {
    card: __WEBPACK_IMPORTED_MODULE_0__components_card__["a" /* default */],
    mpButton: __WEBPACK_IMPORTED_MODULE_1_mpvue_weui_src_button__["a" /* default */],
    mpToast: __WEBPACK_IMPORTED_MODULE_2_mpvue_weui_src_toast__["a" /* default */]
  },

  methods: {
    GetOvertimeRecords: function GetOvertimeRecords() {
      if (this.userInfo == 0) {
        this.showToastLogin = true;
        return;
      }
      wx.navigateTo({
        url: '/pages/records/main?username=' + this.userInfo
      });
    },
    Send2Srv_Rest: function Send2Srv_Rest() {
      if (this.userInfo == 0) {
        this.showToastLogin = true;
        return;
      }
      this.finishTime = new Date().getTime();
      var that = this;

      // if(this.finishTime - this.lastTouchTime > 60000)
      // {
      //   this.lastTouchTime = this.finishTime;
      // }
      // else {
      //   this.showToast = true;
      //   return;
      // }


      wx.request({
        url: "https://gopher.imdo.co/ModifyRecord",
        //url: "http://127.0.0.1:12000/record",
        data: {
          'type': '0',
          'finish_time': this.finishTime.toString(),
          'name': this.userInfo
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function success(res) {
          console.log("success");
          clearInterval(that.intervalNum);
          wx.setStorage({
            key: 'status',
            data: 1
          });
          that.dis2 = true;
          that.dis1 = false;
        },

        fail: function fail(res) {
          console.log("fail");
          clearInterval(that.intervalNum);
          that.intervalNum = setInterval(that.Send2Srv_Rest, 30000);
        }
      });
    },
    Send2Srv_Work: function Send2Srv_Work() {
      if (this.userInfo == 0) {
        this.showToastLogin = true;
        return;
      }
      this.startTime = new Date().getTime();
      var that = this;

      // if(this.startTime - this.lastTouchTime > 60000)
      // {
      //   this.lastTouchTime = this.startTime;
      // }
      // else {
      //   this.showToast = true;
      //   return;
      // }

      wx.request({
        url: "https://gopher.imdo.co/AddRecord",
        //url: "http://127.0.0.1:12000/record",
        data: {
          'type': '1',
          'start_time': this.startTime.toString(),
          'name': this.userInfo,
          'description': 'test'
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function success(res) {
          console.log("success");
          clearInterval(that.intervalNum);
          wx.setStorage({
            key: 'status',
            data: 0
          });
          that.dis2 = false;
          that.dis1 = true;
        },

        fail: function fail(res) {
          console.log("fail");
          clearInterval(that.intervalNum);
          that.intervalNum = setInterval(that.Send2Srv_Work, 30000);
        }
      });
    },
    bindViewTap: function bindViewTap() {
      var url = '../logs/main';
      wx.navigateTo({ url: url });
    },
    getUserInfo: function getUserInfo() {
      var that = this;

      wx.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function success(data) {
                console.log(data.userInfo);
                that.userInfo = data.userInfo.nickName;
              }
            });
          } else {
            // 没有授权过的用户，跳转到自己写的授权提示页面
            wx.navigateTo({
              url: '/pages/getUserInfo/main'
            });
          }
        }
      });
    },
    clickHandle: function clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
    login: function login() {
      // 调用登录接口
      wx.login({
        success: function success() {
          console.log("login success");
        }
      });
    }
  },

  created: function created() {
    // 调用应用实例的方法获取全局数据
    this.login();
    this.getUserInfo();
  },
  onReady: function onReady() {
    var that = this;
    wx.getStorage({
      key: 'status',

      success: function success(res) {
        console.log(res.data);
        if (res.data == 0) {
          //上班打卡禁用，下班打卡有效
          that.dis1 = true;
          that.dis2 = false;
        } else if (res.data == 1) {
          that.dis2 = true;
          that.dis1 = false;
        }
        console.log("读取成功");
      },
      fail: function fail(res) {
        console.log("小程序首次运行");
        wx.setStorage({
          key: 'status',
          data: 1
        });
        that.dis2 = true;
        that.dis1 = false;
        console.log("初始化写入成功");
      }
    });
  }
});

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_9790d58e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(20);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9790d58e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_9790d58e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\mpvue-weui\\src\\button\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9790d58e", Component.options)
  } else {
    hotAPI.reload("data-v-9790d58e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    plain: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    openType: {
      type: String,
      default: ''
    },
    appParameter: {
      type: String,
      default: ''
    },
    hoverStartTime: {
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 70
    },
    lang: {
      type: String,
      default: 'en'
    },
    sessionFrom: {
      type: String,
      default: ''
    },
    sendMessageTitle: {
      type: String,
      default: ''
    },
    sendMessagePath: {
      type: String,
      default: ''
    },
    sendMessageImg: {
      type: String,
      default: ''
    },
    showMessageCard: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass: function buttonClass() {
      var buttonClass = 'weui-btn weui-btn-' + this.size + ' ' + this.btnClass;
      return buttonClass;
    }
  },
  methods: {
    click: function click(e) {
      this.$emit('click', e);
    },
    getuserinfo: function getuserinfo(e) {
      this.$emit('getuserinfo', e);
    },
    contact: function contact(e) {
      this.$emit('contact', e);
    },
    getphonenumber: function getphonenumber(e) {
      this.$emit('getphonenumber', e);
    },
    error: function error(e) {
      this.$emit('error', e);
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    class: _vm.buttonClass,
    attrs: {
      "type": _vm.type,
      "plain": _vm.plain,
      "disabled": _vm.disabled,
      "loading": _vm.loading,
      "open-type": _vm.openType,
      "app-parameter": _vm.appParameter,
      "hover-start-time": _vm.hoverStartTime,
      "hover-stay-time": _vm.hoverStayTime,
      "lang": _vm.lang,
      "session-from": _vm.sessionFrom,
      "send-message-title": _vm.sendMessageTitle,
      "send-message-path": _vm.sendMessagePath,
      "send-message-img": _vm.sendMessageImg,
      "show-message-card": _vm.showMessageCard,
      "eventid": '0'
    },
    on: {
      "click": _vm.click,
      "getuserinfo": _vm.getuserinfo,
      "contact": _vm.contact,
      "getphonenumber": _vm.getphonenumber,
      "error": _vm.error
    }
  }, [_vm._t("default", null, {
    mpcomid: '0'
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9790d58e", esExports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_66d504d4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(24);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-66d504d4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_66d504d4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\mpvue-weui\\src\\toast\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66d504d4", Component.options)
  } else {
    hotAPI.reload("data-v-66d504d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      showToast: this.value
    };
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    content: {
      type: [String, Number],
      default: ''
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  watch: {
    value: function value(val) {
      this.showToast = val;
    },
    showToast: function showToast(val) {
      var _this = this;

      if (val) {
        this.timer = setTimeout(function () {
          _this.showToast = false;
        }, this.duration);
      }
      this.$emit('input', val);
    }
  }
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showToast),
      expression: "showToast"
    }],
    staticClass: "weui-toast-content"
  }, [_c('div', {
    staticClass: "weui-toast-detail",
    class: _vm.type === 'default' ? '' : 'weui-toast-detail-icon'
  }, [(_vm.type != 'default') ? _c('div', {
    staticClass: "toast-icon"
  }, [(_vm.type === 'success') ? _c('icon', {
    attrs: {
      "type": "success",
      "size": "40"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.type === 'warn') ? _c('icon', {
    attrs: {
      "type": "warn",
      "size": "40",
      "color": "#FFBE00"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.type === 'error') ? _c('icon', {
    attrs: {
      "type": "cancel",
      "size": "40"
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "toast-text"
  }, [_vm._v(_vm._s(_vm.content))])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-66d504d4", esExports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('mp-button', {
    attrs: {
      "open-type": "getUserInfo",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "getuserinfo": _vm.getUserInfo
    }
  }, [_vm._v("用户授权")]), _vm._v(" "), _c('div', {
    staticClass: "userinfo",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.bindViewTap
    }
  }, [(_vm.userInfo.avatarUrl) ? _c('img', {
    staticClass: "userinfo-avatar",
    attrs: {
      "src": _vm.userInfo.avatarUrl,
      "background-size": "cover"
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "userinfo-nickname"
  }, [_c('card', {
    attrs: {
      "text": _vm.userInfo.nickName,
      "mpcomid": '1'
    }
  })], 1)]), _vm._v(" "), _c('mp-button', {
    attrs: {
      "type": "primary",
      "btnClass": "mb15",
      "disabled": _vm.dis1,
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "click": _vm.Send2Srv_Work
    }
  }, [_vm._v("加班打卡")]), _vm._v(" "), _c('mp-button', {
    attrs: {
      "type": "primary",
      "btnClass": "mb15",
      "disabled": _vm.dis2,
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.Send2Srv_Rest
    }
  }, [_vm._v("下班打卡")]), _vm._v(" "), _c('mp-button', {
    attrs: {
      "type": "primary",
      "btnClass": "mb15",
      "eventid": '4',
      "mpcomid": '4'
    },
    on: {
      "click": _vm.GetOvertimeRecords
    }
  }, [_vm._v("加班记录")]), _vm._v(" "), _c('mp-toast', {
    attrs: {
      "type": _vm.warn,
      "content": _vm.content,
      "duration": 2000,
      "eventid": '5',
      "mpcomid": '5'
    },
    model: {
      value: (_vm.showToast),
      callback: function($$v) {
        _vm.showToast = $$v
      },
      expression: "showToast"
    }
  }), _vm._v(" "), _c('mp-toast', {
    attrs: {
      "type": _vm.warn,
      "content": _vm.contentLogin,
      "duration": 2000,
      "eventid": '6',
      "mpcomid": '6'
    },
    model: {
      value: (_vm.showToastLogin),
      callback: function($$v) {
        _vm.showToastLogin = $$v
      },
      expression: "showToastLogin"
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4bd51574", esExports)
  }
}

/***/ })
],[10]);
//# sourceMappingURL=main.js.map
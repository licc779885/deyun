var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
  return typeof o;
} : function (o) {
  return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

App({
  data: {},
  globalData: {
    define_order_pay: 1,
    define_order_receiv: 5,
    define_order_check: 8,
    define_order_cancle: 9,
    define_order_comment: 10,
    define_order_recomment: 11,
    define_order_delete: 12,
    define_order_refund: 13,
    define_order_used: 14,
    userInfo: null,
    mid: 0,
    globaSession: null
  },
  _setMid: function (o) {
    this.globalData.mid = o;
  },
  _getNetWork: function (o) {
    var e, t = o.url, n = (o.data, o.success), s = o.fail, a = o.complete;
    e = "boolean" != typeof o.maskIn || o.maskIn;
    var i;
    i = "boolean" == typeof o.state && o.state;
    var c = !0;
    "boolean" == typeof o.showToastIn && (c = o.showToastIn);
    var l = this;
    c && wx.showToast({
      title: "请求中...",
      icon: "loading",
      duration: 1e4,
      mask: e
    }), this.getLoginState(function (e, c) {
      i || (t += "&app_type=wechat", t += "&3rd_session=" + e), console.log("_getNetWork请求中Url:", t, "_session:", e, "_wx_token:", c),
        wx.request({
          url: t,
          header: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: "PHPSESSID=" + c
          },
          success: function (e) {
            2 == e.data.result ? (console.log("res---------------------"), wx.removeStorage({
              key: "session",
              success: function (o) {
                console.log(o.data);
              }
            }), wx.removeStorage({
              key: "openid",
              success: function (o) {
                console.log(o.data);
              }
            }), wx.removeStorage({
              key: "wx_token",
              success: function (o) {
                console.log(o.data);
              }
            }), wx.removeStorage({
              key: "userInfo",
              success: function (e) {
                l._getNetWork(o);
              }
            })) : (wx.hideToast(), n(e));
          },
          fail: function (o) {
            s(o), wx.showToast({
              title: "数据获取失败",
              icon: "loading",
              duration: 2e3,
              mask: !0
            }), console.log("数据获取失败:", t, o), "function" == typeof s && s(o);
          },
          complete: function (o) {
            function e(e) {
              return o.apply(this, arguments);
            }
            return e.toString = function () {
              return o.toString();
            }, e;
          }(function (o) {
            "function" == typeof a && a(o);
          })
        });
    });
  },
  _postNetWork: function (e) {
    var t, n = e.url, s = e.data, a = e.success, i = e.fail;
    t = "boolean" != typeof e.maskIn || e.maskIn;
    ("boolean" != typeof e.showToastIn || e.showToastIn) && wx.showToast({
      title: "请求中...",
      icon: "loading",
      duration: 1e4,
      mask: t
    }), this.getLoginState(function (e, t) {
      n += "&app_type=wechat", n += "&3rd_session=" + e, console.log("_postNetWork请求中Url:", n, "_session:", e, "_wx_token:", t),
        wx.request({
          url: n,
          data: s,
          method:'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Cookie: "PHPSESSID=" + t
          },
          success: function (o) {
            wx.hideToast(), a(o), console.log("res---------------------", o);
          },
          fail: function (o) {
            i(o), wx.showToast({
              title: "数据获取失败",
              icon: "loading",
              duration: 2e3,
              mask: !0
            }), console.log("数据获取失败:", n, o), "function" == typeof i && i(o);
          },
          complete: function (o) {
            function e(e) {
              return o.apply(this, arguments);
            }
            return e.toString = function () {
              return o.toString();
            }, e;
          }(function (e) {
            console.log("complete", "undefined" == typeof complete ? "undefined" : o(complete)),
              "function" == typeof complete && complete(e);
          })
        });
    });
  },
  setLoginState: function (o) {
    var e, t, n = this;
    console.log("登录中..."), wx.login({
      success: function (s) {
        console.log("login登录成功，获取用户info"),
          //修正下  现在要判断用户是否授权过 而不能直接使用getUserInfo
            wx.getSetting({
                success: function(res){
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: function (a) {
                                s.code ? wx.request({
                                    url: n.getNetAddresss("member/Register/wx_app_login"),
                                    header: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json"
                                    },
                                    data: {
                                        code: s.code,
                                        info: a
                                    },
                                    success: function (n) {
                                        var s = n.data;
                                        console.log("登录接口", n.data), 1 == s.result ? (wx.setStorage({
                                            key: "session",
                                            data: s.data.session
                                        }), wx.setStorage({
                                            key: "openid",
                                            data: s.data.openid
                                        }), wx.setStorage({
                                            key: "wx_token",
                                            data: s.data.wx_token
                                        }), wx.setStorage({
                                            key: "userInfo",
                                            data: a
                                        }), wx.setStorage({
                                            key: "yz_uid",
                                            data: s.msg.uid
                                        }), console.log("_info", a), e = s.data.session, t = s.data.wx_token, console.log("key 存储成功，登录验证成功，请求数据中2"),
                                        "function" == typeof o && o(e, t)) : (console.log(s.msg), wx.showToast({
                                            title: s.msg,
                                            icon: "loading",
                                            duration: 2e3,
                                            mask: !0
                                        }), console.log("第三方登录数据错误" + n.errMsg));
                                    },
                                    fail: function (o) {
                                        console.log("第三方登录失败session、wx_token获取失败" + o.errMsg);
                                    }
                                }) : console.log("获取用户登录态失败！" + res.errMsg);
                            },
                            fail: function () {
                                //获取用户信息失败后。请跳转授权页面
                                wx.showModal({
                                    title: '警告',
                                    content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                                    success: function (res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定')
                                            wx.navigateTo({
                                                url: '/pages/tologin/tologin',
                                            })
                                        }
                                    }
                                })
                            }
                        });
                    }else{
                        wx.navigateTo({
                           url: '/pages/tologin/tologin',
                        })
                    }
                }
                });

      },
      fail: function (o) {
        console.log("登录失败，请求被拒绝！获取用户登录态失败！" + o);
      }
    });
  },
  getLoginState: function (o) {
    var e, t, n = this;
    wx.checkSession({
      success: function () {
        console.log("登录态未过期"), wx.getStorage({
          key: "session",
          success: function (s) {
            console.log("读取缓存session——key存在", s.data), e = s.data, wx.getStorage({
              key: "wx_token",
              success: function (n) {
                console.log("读取缓存wx_token——key存在", n.data), t = n.data, console.log("登录验证成功，请求数据中1"),
                  "function" == typeof o && o(e, t);
              },
              fail: function (e) {
                console.log("缓存wx_token——！！！！不存在", e), n.setLoginState(o);
              }
            });
          },
          fail: function (e) {
            console.log("缓存session——！！！！不存在", e), n.setLoginState(o);
          }
        });
      },
      fail: function (e) {
        console.log("登录态过期", e), n.setLoginState(o);
      }
    });
  },
  getHost: function () {
    return "https://666.dyun888.com/";
  },
  getNetAddresss: function (o) {
    var e = this.getHost() + "app_api.php?uniacid=137&pagetype=9&api=" + o;
    return this.globalData.mid && (e += "&mid=" + this.globalData.mid), e;
  },
  getEvaluate: function (o) {
    return {
      num: o,
      list: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0].slice(5 - o, 10 - o)
    };
  }
});
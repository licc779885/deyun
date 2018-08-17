function a(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a
}
var e, t = getApp();
Page({
  data: (e = {
    order_id: "",
    goodList: [],
    totalNum: 0,
    totalPrice: "",
    order_sn: "",
    orderData: null,
    balance: 0,
    payParams: "",
    info_form: {},
    money: "",
    buttons: [],
    pay_sn: "订单编号",
    order_pay_id: "",
    uid: "",
    shareTit: "",
    shareUrl: "",
    shareImg: "",
    shareContent: "",
    mid: "",
    payerImg: "",
    payerName: ""
  }, a(e, "order_pay_id", ""), a(e, "buttons", []), e),
  confirm: function (a) {
    var e = a.currentTarget.dataset.value,
      t = this;
    1 == e || 6 == e ? this.getWeChatPayParams() : 3 == e && t.balancePay()
  },
  balancePay: function () {
    var a = this,
      e = t.getNetAddresss("order.credit-merge-pay.credit2");
    e += "&order_pay_id=" + a.data.order_pay_id, t._getNetWork({
      url: e,
      success: function (e) {
        console.log("ressss::::", e), 1 == e.data.result ? wx.redirectTo({
          url: "../success/success?order_id=" + a.data.order_id
        }) : (wx.showToast({
          title: e.data.msg,
          icon: "success",
          duration: 2e3
        }), console.log("错误", e.data.msg))
      },
      fail: function (a) { }
    })
  },
  getWeChatPayParams: function () {
    var a = this,
      e = t.getNetAddresss("order.merge-pay.wechatPay");
    e += "&order_pay_id=" + a.data.order_pay_id, e += "&client_type=2", t._getNetWork({
      url: e,
      success: function (e) {
        var t = e.data.data.config;
        console.log("ressss::::", e);
        var s = {
          timeStamp: t.timestamp,
          nonceStr: t.nonceStr,
          package: t.package,
          signType: t.signType,
          paySign: t.paySign
        };
        console.log("payParams::::", s), a.WXPay(s)
      },
      fail: function (a) { }
    })
  },
  WXPay: function (a) {
    var e = this;
    wx.requestPayment({
      timeStamp: a.timeStamp,
      nonceStr: a.nonceStr,
      package: a.package,
      signType: "MD5",
      paySign: a.paySign,
      success: function (a) {
        wx.showToast({
          title: "支付成功",
          icon: "success",
          duration: 2e3,
          success: function () {
            wx.redirectTo({
              url: "../success/success?order_id=" + e.data.order_id
            })
          },
          fail: function () { }
        })
      },
      fail: function (a) {
        wx.showToast({
          title: "支付失败请稍后重试",
          icon: "success",
          duration: 2e3,
          success: function () { },
          fail: function () { }
        })
      }
    })
  },
  getPayerInfo: function () {
    var a = this,
      e = t.getNetAddresss("order.merge-pay.anotherPayOrder");
    e += "&order_ids=" + a.data.order_id + "&mid=" + a.data.mid, t._getNetWork({
      url: e,
      success: function (e) {
        if (console.log("ressss::::", e), 1 == e.data.result) {
          var t = e.data.data;
          a.setData({
            payerImg: t.member.avatar,
            payerName: t.member.nickname,
            order_pay_id: t.order_pay.id,
            buttons: t.buttons
          })
        } else wx.showToast({
          title: e.data.msg,
          icon: "success",
          duration: 2e3
        }), console.log("错误", e.data.msg)
      },
      fail: function (a) { }
    })
  },
  getOrderDetail: function () {
    var a = this,
      e = t.getNetAddresss("order.another-pay-detail");
    e += "&order_id=" + a.data.order_id + "&mid=" + a.data.mid, t._getNetWork({
      url: e,
      success: function (e) {
        if (console.log("ressss::::", e), 1 == e.data.result) {
          var t = 0;
          for (var s in e.data.data) for (var r in e.data.data[s].has_many_order_goods) t += parseFloat(e.data.data[s].has_many_order_goods[r].price);
          a.setData({
            goodList: e.data.data,
            totalPrice: t.toFixed(2)
          })
        } else wx.showToast({
          title: e.data.msg,
          icon: "success",
          duration: 2e3
        }), console.log("错误", e.data.msg)
      },
      fail: function (a) { }
    })
  },
  getShareInfo: function () {
    var a = this,
      e = t.getNetAddresss("member.member.anotherShare");
    e += "&order_ids=" + a.data.order_id, t._getNetWork({
      url: e,
      success: function (e) {
        console.log("ressss::::", e), 1 == e.data.result ? a.setData({
          shareTit: e.data.data.title,
          shareUrl: e.data.data.url,
          shareImg: e.data.data.img,
          shareContent: e.data.data.content
        }) : (wx.showToast({
          title: e.data.msg,
          icon: "success",
          duration: 2e3
        }), console.log("错误", e.data.msg))
      },
      fail: function (a) { }
    })
  },
  onLoad: function (a) {
    var e = this;
    console.log("options:", a), e.setData({
      order_id: a.order_id,
      mid: a.mid
    }), this.getPayerInfo(), this.getOrderDetail()
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { }
});
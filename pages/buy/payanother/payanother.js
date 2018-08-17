var a = getApp();
Page({
  data: {
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
    shareContent: ""
  },
  getOrderDetail: function () {
    var t = this,
      e = a.getNetAddresss("order.another-pay-detail");
    e += "&order_id=" + t.data.order_id, a._getNetWork({
      url: e,
      success: function (a) {
        if (console.log("ressss::::", a), 1 == a.data.result) {
          var e = 0;
          for (var o in a.data.data) for (var r in a.data.data[o].has_many_order_goods) e += parseFloat(a.data.data[o].has_many_order_goods[r].price);
          t.setData({
            goodList: a.data.data,
            totalPrice: e.toFixed(2)
          })
        } else wx.showToast({
          title: a.data.msg,
          icon: "success",
          duration: 2e3
        }), console.log("错误", a.data.msg)
      },
      fail: function (a) { }
    })
  },
  getShareInfo: function () {
    var t = this,
      e = a.getNetAddresss("member.member.anotherShare");
    e += "&order_ids=" + t.data.order_id, a._getNetWork({
      url: e,
      success: function (a) {
        console.log("ressss::::", a), 1 == a.data.result ? t.setData({
          shareTit: a.data.data.title,
          shareUrl: a.data.data.url,
          shareImg: a.data.data.img,
          shareContent: a.data.data.content
        }) : (wx.showToast({
          title: a.data.msg,
          icon: "success",
          duration: 2e3
        }), console.log("错误", a.data.msg))
      },
      fail: function (a) { }
    })
  },
  onShareAppMessage: function () {
    var a = wx.getStorageSync("yz_uid"),
      t = "";
    return a && (t = a), console.log("/pages/buy/payanotherDetail/payanotherDetail?order_id=" + this.data.order_id + "&mid=" + t), {
      title: this.data.shareTit,
      desc: this.data.shareContent,
      imageUrl: this.data.shareImg,
      path: "/pages/buy/payanotherDetail/payanotherDetail?order_id=" + this.data.order_id + "&mid=" + t
    }
  },
  onLoad: function (a) {
    var t = this;
    console.log("options:", a), t.setData({
      order_id: a.order_id
    }), this.getOrderDetail(), this.getShareInfo()
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { }
});
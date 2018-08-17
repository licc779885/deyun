var t, e, o = getApp();

Page({
    data: {
        order_id: "",
        orderData: null
    },
    onLoad: function(a) {
        var s = this, n = o.getNetAddresss("order/Operation");
        t = a.order_id, wx.getStorage({
            key: "openid",
            success: function(i) {
                e = i.data, console.log("openid:", i.data), n += "&orderid=" + t, n += "&openid=" + i.data;
                var c = "";
                c = void 0 !== a.button_id ? a.button_id : o.globalData.define_order_pay, n += "&button_id=" + c, 
                o._getNetWork({
                    url: n,
                    success: function(e) {
                        1 == e.data.result ? (s.setData({
                            orderData: e.data.data,
                            isShowCredit: e.data.data.credit.success,
                            isShowWexin: e.data.data.app_wechat.success,
                            order_id: t
                        }), console.log(e.data)) : console.log("错误", e);
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    wxPay: function() {
        var a = this, s = o.getNetAddresss("order/Pay");
        s += "&orderid=" + t, s += "&openid=" + e, s += "&type=weixin", console.log("order:", s), 
        wx.showModal({
            title: "提示",
            content: "确认金额: " + a.data.orderData.order.price + "元",
            success: function(t) {
                t.confirm && o._getNetWork({
                    url: s,
                    success: function(t) {
                        var e = t.data;
                        if (1 == e.result) {
                            var o = e.data.wechat;
                            wx.requestPayment({
                                timeStamp: o.timeStamp,
                                nonceStr: o.nonceStr,
                                package: o.package,
                                signType: "MD5",
                                paySign: o.paySign,
                                success: function(t) {
                                    wx.showToast({
                                        title: "支付成功",
                                        icon: "success",
                                        duration: 2e3,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../success/success?order_id=" + a.data.order_id
                                            });
                                        },
                                        fail: function() {}
                                    });
                                },
                                fail: function(t) {
                                    wx.showToast({
                                        title: "支付失败请稍后重试",
                                        icon: "success",
                                        duration: 2e3,
                                        success: function() {},
                                        fail: function() {}
                                    });
                                }
                            });
                        }
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "请求失败,请稍后重试",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    }
                });
            }
        });
    },
    creditPay: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定用余额支付么？",
            success: function(e) {
                if (e.confirm) {
                    var a = o.getNetAddresss("order/Pay/credit");
                    a += "&orderid=" + t.data.order_id, a += "&type=credit", console.log(a), o._getNetWork({
                        url: a,
                        success: function(e) {
                            1 == e.data.result ? wx.redirectTo({
                                url: "../success/success?order_id=" + t.data.order_id
                            }) : (wx.showToast({
                                title: e.data.msg,
                                icon: "success",
                                duration: 2e3
                            }), console.log("错误", e.data.msg));
                        },
                        fail: function(t) {}
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
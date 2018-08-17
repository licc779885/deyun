var e, n, t, i = getApp();

Page({
    data: {
        array1: [ "退款（仅退款不退货）", "退款（退货）", "退款" ],
        index1: null,
        array2: [ "不想要了", "卖家缺货", "拍错了/订单信息错误", "其他" ],
        index2: null,
        goodsprice: "",
        refund_money: ""
    },
    bindDateChange1: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index1: e.detail.value
        });
    },
    bindDateChange2: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index2: e.detail.value
        });
    },
    toRefund: function(t) {
      var o = t.detail.value.reason, s = t.detail.value.refund_money ;
        if ( parseInt(s) < 0) wx.showmodal({
            title: "\b退款金额不能小于0",
            icon: "success",
            duration: 1e3,
            mask: !0,
            success: function() {
                setTimeout(function() {}, 1e3);
            },
            fail: function() {},
            complete: function() {}
        }); else if (console.log(parseFloat(s) + 1, "--", parseFloat(this.data.refund_money) + 1), 
        parseFloat(s) > parseFloat(this.data.refund_money)) wx.showModal({
            title: "\b退款金额不能大于" + this.data.refund_money + "元",
            icon: "success",
            duration: 1e3,
            mask: !0,
            success: function() {
                setTimeout(function() {}, 1e3);
            },
            fail: function() {},
            complete: function() {}
        }); else {
            var a, c, u = this;
            if (null != u.data.index1) if (null != u.data.index2) {
                a = u.data.array1[u.data.index1], c = u.data.array2[u.data.index2];
                var d = JSON.stringify({
                    id: e,
                    button_id: n,
                    rtype: a,
                    price: s,
                    images: "",
                    reason: c,
                    content: o
                }), l = i.getNetAddresss("order/Refund/confirm");
                l += "&orderid=" + e, l += "&refunddata=" + d, i._getNetWork({
                    url: l,
                    success: function(e) {
                        1 == e.data.result ? wx.showModal({
                            title: "已经成功提交\b成为退款申请",
                            icon: "success",
                            duration: 1e3,
                            mask: !0,
                            success: function() {
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: "/pages/member/index/index"
                                    });
                                }, 1e3);
                            },
                            fail: function() {},
                            complete: function() {}
                        }) : wx.showModal({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "请求失败,请稍后重试",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    }
                });
            } else wx.showModal({
                title: "请选择退款原因",
                icon: "success",
                duration: 1e3,
                mask: !0,
                success: function() {
                    setTimeout(function() {}, 1e3);
                },
                fail: function() {},
                complete: function() {}
            }); else wx.showModal({
                title: "请选择处理方式",
                icon: "success",
                duration: 1e3,
                mask: !0,
                success: function() {
                    setTimeout(function() {}, 1e3);
                },
                fail: function() {},
                complete: function() {}
            });
        }
    },
    bindinput: function(e) {},
    onLoad: function(i) {
        e = i.order_id, t = i.money, n = i.button_id, this.setData({
            goodsprice: t,
            refund_money: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
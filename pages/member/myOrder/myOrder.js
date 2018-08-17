var t, e = getApp();

Page({
    data: {
        typeValue: [ {
            type: "all",
            title: "全部",
            status: ""
        }, {
            type: "waitPay",
            title: "待付款",
            status: 0
        }, {
            type: "waitSend",
            title: "待发货",
            status: 1
        }, {
            type: "waitCollec",
            title: "待收货",
            status: 2
        }, {
            type: "waitRefund",
            title: "待退款",
            status: 4
        }, {
            type: "complete",
            title: "已完成",
            status: 3
        } ],
        myOrderVoid: !1,
        typeData: [],
        orderData: []
    },
    onLoad: function(e) {
        console.log(e.type), this._setOrderType(e.type), t = e.type;
    },
    _setOrderData: function(t) {
        var o = this;
        console.log("status", t), e._getNetWork({
            url: e.getNetAddresss("order/Display") + "&status=" + t + "&order_id=",
            success: function(t) {
                var e = t.data;
                console.log("_data", e), 1 == e.result && (console.log(e.data.length), e.data.length > 0 ? o.setData({
                    myOrderVoid: !1
                }) : o.setData({
                    myOrderVoid: !0
                }), o.setData({
                    orderData: t.data.data
                }));
            },
            fail: function(t) {}
        });
    },
    _showSetOrderType: function() {
        for (var t = this, e = [], o = 0; o < this.data.typeValue.length; o++) e.splice(e.length, 1, this.data.typeValue[o].title);
        wx.showActionSheet({
            itemList: e,
            success: function(e) {
                e.cancel || t._setOrderType(t.data.typeValue[e.tapIndex].type);
            }
        });
    },
    gotoHome:function(){
      wx.switchTab({
        url: "/pages/index/index"
      });
    },
    _setOrderType: function(e) {
        t = e;
        var o, n = this;
        console.log("_type", e);
        for (var a = 0; a < n.data.typeValue.length; a++) e == n.data.typeValue[a].type && (o = n.data.typeValue[a]);
        this.setData({
            typeData: o
        }), this._setOrderData(o.status);
    },
    toDetail: function(t) {
        var e = t.currentTarget.dataset.item;
        console.log(0x6e55699c5fb0), console.log(e), wx.navigateTo({
            url: "../../member/myOrder/detail/detail?order_id=" + e.id,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    openQrCode: function(t) {
        e.getNetAddresss("order/Display");
    },
    submitFn: function(t) {
        var e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.type, n = t.currentTarget.dataset.id, a = t.currentTarget.dataset.order, s = this;
        "9" == o ? s.cancleOrder(n, o, a, e) : "12" == o ? s.deleteOrder(n, o, a, e) : "1" == o ? wx.navigateTo({
            url: "../../buy/orderPay/orderPay?order_id=" + n + "&button_id=" + o
        }) : 14 == o ? s.openQrCode(n) : 5 == o ? s.confrimOrder(a, n, o) : 13 == o ? wx.navigateTo({
            url: "../../member/myOrder/orderRefund/orderRefund?order_id=" + n + "&button_id=" + o + "&money=" + a.price,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        }) : 8 == o ? wx.navigateTo({
            url: "../../member/myOrder/view_logistics/view_logistics?order_id=" + n + "&button_id=" + o,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        }) : 10 == o ? wx.navigateTo({
            url: "../../member/myOrder/comment/comment?order_id=" + n + "&button_id=" + o + "&order=" + JSON.stringify(a),
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        }) : 11 == o && wx.navigateTo({
            url: "../../member/myOrder/comment/comment?order_id=" + n + "&button_id=" + o + "&order=" + JSON.stringify(a) + "&type=1",
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    deleteOrder: function(t, o, n, a) {
        var s = this;
        wx.showModal({
            title: "提示",
            content: "确认删除订单吗吗?",
            success: function(n) {
                if (n.confirm) {
                    var i = e.getNetAddresss("order/Operation");
                    i += "&orderid=" + t, i += "&button_id=" + o, e._getNetWork({
                        url: i,
                        success: function(t) {
                            var e = t.data;
                            if (console.log(t), 1 == e.result) {
                                var o = s.data.orderData;
                                o.splice(a, 1), s.setData({
                                    orderData: o
                                });
                            } else wx.showToast({
                                title: "数据错误",
                                icon: "success",
                                duration: 2e3,
                                success: function() {},
                                fail: function() {}
                            });
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
            }
        });
    },
    cancleOrder: function(t, o, n, a) {
        var s = this;
        wx.showActionSheet({
            itemList: [ "我不想买了", "信息填写错误，重新拍", "同城见面交易", "其他原因" ],
            success: function(n) {
                var i = e.getNetAddresss("order/Operation");
                i += "&orderid=" + t, i += "&button_id=" + o, e._getNetWork({
                    url: i,
                    success: function(t) {
                        if (1 == t.data.result) {
                            var e = s.data.orderData;
                            e.splice(a, 1), s.setData({
                                orderData: e
                            });
                        } else wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
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
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    confrimOrder: function(t, o, n) {
        var a = this, s = e.getNetAddresss("order/Operation");
        s += "&orderid=" + o + "&button_id=" + n, wx.showModal({
            title: "提示",
            content: "确认您已经收到货？",
            success: function(t) {
                t.confirm && e._getNetWork({
                    url: s,
                    success: function(t) {
                        1 == t.data.result ? a._setOrderData(a.data.typeData.type) : wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
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
    }
});
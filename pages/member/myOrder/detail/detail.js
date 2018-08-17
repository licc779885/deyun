var e, t, o = getApp();

Page({
    data: {
        order_status_str: "",
        order_number: "",
        order_practical: "",
        order_freight: "",
        order_dispatch: "",
        store_name: "",
        tel: "",
        address: "",
        _goods: [],
        button_list: [],
        realname: ""
    },
    onLoad: function(t) {
        e = t.order_id, console.log(e), this.getOrderInfo();
    },
    getOrderInfo: function() {
        var t = this, s = o.getNetAddresss("order/Detail");
        s += "&id=" + e, o._getNetWork({
            url: s,
            success: function(e) {
                var o = e.data;
                1 == o.result ? (console.log(o.data), t.showOrderInfo(o.data)) : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(e) {
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
    showOrderInfo: function(e) {
        var o = this;
        console.log(122321323), console.log(e.order), t = e.order, o.setData({
            _goods: e.goods,
            button_list: e.button_list,
            order_status_str: e.order_status_str,
            order_number: e.order.ordersn,
            order_practical: e.order.price,
            order_freight: e.order.olddispatchprice,
            order_dispatch: e.order.goodsprice,
            store_name: e.set.name
        }), 2 == e.address_block_list[0] ? o.setData({
            address: e.address.address,
            realname: e.address.realname,
            tel: e.address.mobile
        }) : o.setData({
            address: e.carrier.address,
            realname: e.carrier.carrier_realname,
            tel: e.carrier.carrier_mobile
        });
    },
    operationOrder: function(o) {
        var s = o.currentTarget.dataset.value, n = (o.currentTarget.dataset.name, this);
        if (9 == s) n.cancelOrder(e, s); else if (12 == s) n.deleteOrder(e, s); else if (1 == s) wx.navigateTo({
            url: "../../../buy/orderPay/orderPay?order_id=" + e + "&button_id=" + s
        }); else if (14 == s) ; else if (5 == s) n.confrimOrder(t, e, s); else if (13 == s) wx.navigateTo({
            url: "../orderRefund/orderRefund?order_id=" + e + "&button_id=" + s + "&money=" + t.goodsprice,
            success: function(e) {},
            fail: function() {},
            complete: function() {}
        }); else if (10 == s) wx.setStorage({
            key: "goods",
            data: n.data._goods
        }), wx.redirectTo({
            url: "../comment/comment?order_id=" + e + "&button_id=" + s + "&order=" + JSON.stringify(t) + "&detail=1",
            success: function(e) {},
            fail: function() {},
            complete: function() {}
        }); else if (11 == s) {
            try {
                wx.setStorageSync("goods", n.data._goods);
            } catch (o) {}
            wx.redirectTo({
                url: "../comment/comment?order_id=" + e + "&button_id=" + s + "&order=" + JSON.stringify(t) + "&type=1&detail=1",
                success: function(e) {},
                fail: function() {},
                complete: function() {}
            });
        } else 8 == s && wx.navigateTo({
            url: "../view_logistics/view_logistics?order_id=" + e + "&button_id=" + s,
            success: function(e) {},
            fail: function() {},
            complete: function() {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    deleteOrder: function(e, t, s) {
        wx.showModal({
            title: "提示",
            content: "确认删除订单吗吗?",
            success: function(s) {
                if (s.confirm) {
                    var n = o.getNetAddresss("order/Operation");
                    n += "&orderid=" + e, n += "&button_id=" + t, o._getNetWork({
                        url: n,
                        success: function(e) {
                            var t = e.data;
                            console.log(e), 1 == t.result ? wx.showToast({
                                title: "数据删除成功",
                                icon: "success",
                                duration: 2e3,
                                success: function() {
                                    setTimeout(function() {
                                        wx.navigateBack({});
                                    }, 1e3);
                                },
                                fail: function() {}
                            }) : wx.showToast({
                                title: "数据错误",
                                icon: "success",
                                duration: 2e3,
                                success: function() {},
                                fail: function() {}
                            });
                        },
                        fail: function(e) {
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
    cancleOrder: function(e, t, s, n) {
        wx.showActionSheet({
            itemList: [ "我不想买了", "信息填写错误，重新拍", "同城见面交易", "其他原因" ],
            success: function(s) {
                var n = o.getNetAddresss("order/Operation");
                n += "&orderid=" + e, n += "&button_id=" + t, o._getNetWork({
                    url: n,
                    success: function(e) {
                        1 == e.data.result ? wx.showToast({
                            title: "已经取消订单",
                            icon: "success",
                            duration: 2e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.navigateBack({});
                                }, 1e3);
                            },
                            fail: function() {}
                        }) : wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    },
                    fail: function(e) {
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
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    confrimOrder: function(e, t, s) {
        var n = o.getNetAddresss("order/Operation");
        n += "&orderid=" + t + "&button_id=" + s, wx.showModal({
            title: "提示",
            content: "确认您已经收到货？",
            success: function(e) {
                e.confirm && o._getNetWork({
                    url: n,
                    success: function(e) {
                        1 == e.data.result ? setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3) : wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    },
                    fail: function(e) {
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
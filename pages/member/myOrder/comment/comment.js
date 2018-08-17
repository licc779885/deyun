var t, o, e, n, s, i = getApp();

Page({
    data: {
        rate: i.getEvaluate(0),
        goods: [],
        isHidden: !1,
        comment_btn_title: "评价"
    },
    setEvaluate: function(t) {
        s = t.currentTarget.dataset.index, console.log(s), this.setData({
            rate: i.getEvaluate(s)
        });
    },
    toComment: function(o) {
        var e = [], n = o.detail.value.comment_content;
        if (0 != n.length && "" != n && null != n) {
            for (var a = 0; a < this.data.goods.length; a++) {
                var c = this.data.goods[a];
                e.push({
                    goodsid: c.goodsid,
                    level: s,
                    content: n,
                    images: c.thumb
                });
            }
            var u = i.getNetAddresss("order/Comment");
            u += "&orderid=" + t, u += "&comments=" + JSON.stringify(e), i._getNetWork({
                url: u,
                success: function(t) {
                    1 == t.data.result ? wx.showToast({
                        title: "评价成功",
                        icon: "success",
                        duration: 1e3,
                        mask: !0,
                        success: function() {
                            setTimeout(function() {
                                wx.navigateBack({});
                            }, 1e3);
                        },
                        fail: function() {},
                        complete: function() {}
                    }) : wx.showToast({
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
        } else wx.showToast({
            title: "评价内容不可为空",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        });
    },
    onLoad: function(s) {
        var i = this;
        1 == (n = s.type) ? (i.setData({
            isHidden: !0,
            comment_btn_title: "追加评价"
        }), wx.setNavigationBarTitle({
            title: "追加评价",
            success: function(t) {}
        })) : (i.setData({
            isHidden: !1,
            comment_btn_title: "评价"
        }), wx.setNavigationBarTitle({
            title: "评价",
            success: function(t) {}
        })), t = s.order_id, e = JSON.parse(s.order), o = s.button_id;
        try {
            var a = wx.getStorageSync("goods");
            console.log(1231312123123), console.log(a), a ? i.setData({
                goods: a
            }) : i.setData({
                goods: e.goods
            });
        } catch (t) {}
        try {
            wx.removeStorageSync("goods");
        } catch (t) {}
    },
    onReady: function() {},
    onShow: function() {
        s = 0;
    },
    onHide: function() {},
    onUnload: function() {}
});
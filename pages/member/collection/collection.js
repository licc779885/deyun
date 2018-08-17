var t = getApp();

Page({
    data: {
        goodsData: [],
        dataState: 0,
        showEdit: !1,
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 4e3,
        duration: 300
    },
    claerData: function() {
        var o = this, s = t.getNetAddresss("favorite/Remove");
        s += "&id=" + e.currentTarget.dataset.id, wx.showModal({
            title: "提示",
            content: "确定要删除么？此操作不可逆！",
            success: function(a) {
                a.confirm && (console.log("用户点击确定"), t._getNetWork({
                    url: s,
                    success: function(t) {
                        var s = t.data;
                        console.log("收货地址列表", s), 1 == s.result ? (o._getData(), wx.showToast({
                            title: s.msg,
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        })) : wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    },
                    fail: function(t) {}
                }));
            }
        });
    },
    openEdit: function() {
        wx.showToast({
            title: "加载中..",
            icon: "loading",
            duration: 1e3,
            mask: !0
        }), this.setData({
            showEdit: !0
        });
    },
    closeEdit: function() {
        wx.showToast({
            title: "加载中..",
            icon: "loading",
            duration: 1e3,
            mask: !0
        }), this.setData({
            showEdit: !1
        });
    },
    delData: function(o) {
        var s = this, a = t.getNetAddresss("favorite/Remove");
        a += "&goods_ids=" + o.currentTarget.dataset.goodsid, wx.showModal({
            title: "提示",
            content: "确定要取消收藏么？此操作不可逆！",
            success: function(o) {
                o.confirm && (console.log("用户点击确定"), t._getNetWork({
                    url: a,
                    success: function(t) {
                        var o = t.data;
                        console.log("_data", o), 1 == o.result ? (s._getData(), wx.showToast({
                            title: o.msg,
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        })) : wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    },
                    fail: function(t) {}
                }));
            }
        });
    },
    goDetail: function(t) {
        wx.navigateTo({
            url: "../../detail/detail?id=" + t.currentTarget.dataset.goodsid
        });
    },
    _getData: function() {
        var o = this;
        t._getNetWork({
            url: t.getNetAddresss("favorite/Display"),
            showToastIn: !1,
            success: function(t) {
                var s = t.data;
                if (console.log(s), 1 == s.result) {
                    var a;
                    a = s.data.list.length > 0 ? 2 : 1, o.setData({
                        goodsData: s.data.list,
                        dataState: a
                    });
                } else wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {}
        });
    },
    onLoad: function(t) {
        this._getData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
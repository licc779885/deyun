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
    delData: function(a) {
        var o = this, s = t.getNetAddresss("history/Remove");
        console.log(a.currentTarget.dataset.id), s += "&ids=" + a.currentTarget.dataset.id, 
        wx.showModal({
            title: "提示",
            content: "确定要删除足迹么？此操作不可逆！",
            success: function(a) {
                a.confirm && (console.log("用户点击确定"), t._getNetWork({
                    url: s,
                    success: function(t) {
                        var a = t.data;
                        console.log("_data", a), 1 == a.result ? (o._getData(), wx.showToast({
                            title: a.msg,
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
        var a = this;
        t._getNetWork({
            url: t.getNetAddresss("history/Display"),
            showToastIn: !1,
            success: function(t) {
                var o = t.data;
                if (console.log(o), 1 == o.result) {
                    var s;
                    s = o.data.list.length > 0 ? 2 : 1, a.setData({
                        goodsData: o.data.list,
                        dataState: s
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
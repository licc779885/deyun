var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

getApp();

Page({
    data: {},
    selectAddres: function(t) {
        console.log(t, t.currentTarget.dataset.id);
        for (var o = this, e = o.data.carrier_list, n = t.currentTarget.dataset.id, a = 0; a < e.length; a++) e[a].id == n && wx.setStorage({
            key: "ORDER_TAKEPLACE_SELECT_DATA",
            data: e[a]
        });
        wx.showToast({
            title: "成功",
            icon: "loading",
            duration: 1e3,
            mask: !0
        }), o.setData({
            takePlace_id: n
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3);
    },
    _getData: function(o) {
        console.log("自提typeof(options)", void 0 === o ? "undefined" : t(o), o);
        var e;
        "object" == (void 0 === o ? "undefined" : t(o)) ? (e = o.id, console.log("_id", e)) : e = null;
        var n = this;
        wx.getStorage({
            key: "carrier_list",
            success: function(t) {
                console.log("自提地点数据", t), n.setData({
                    takePlace_id: e,
                    carrier_list: t.data
                });
            }
        });
    },
    onLoad: function(t) {
        this._getData(t);
    },
    onReady: function() {},
    onShow: function(t) {},
    onHide: function() {},
    onUnload: function() {}
});
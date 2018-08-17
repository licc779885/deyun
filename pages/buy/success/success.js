var o = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var t = this, e = o.getNetAddresss("order/Pay/isPay");
        e += "&order_id=" + n.order_id, o._getNetWork({
            url: e,
            success: function(o) {
                console.log(o);
                var n = o.data.data;
                1 == o.data.result ? t.setData({
                  price: n.price
                }) : (console.log("错误", o), wx.showToast({
                    title: "系统错误",
                    icon: "success",
                    duration: 3e3
                }));
            },
            fail: function(o) {}
        });
    },
    goto1: function() {
        wx.switchTab({
            url: "/pages/member/index/index"
        });
    },
    goto2: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
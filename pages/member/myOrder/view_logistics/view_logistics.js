var s, o = getApp();

Page({
    data: {
        goods: [],
        express_name: "",
        express_number: "",
        goods_total: "",
        goods_price: "",
        myAddress: []
    },
    showOrderInfo: function(s, o) {
        this.setData({
            express_name: o.expresscom,
            express_number: o.expresssn,
            goods_total: o.goodstotal,
            goods_price: o.goodsprice,
            goods: s
        });
    },
    showAddress: function(s) {
        this.setData({
            myAddress: s
        });
    },
    getExpressInfo: function() {
        var e = this, t = o.getNetAddresss("order/Express");
        t += "&id=" + s, o._getNetWork({
            url: t,
            success: function(s) {
                var o = s.data;
                console.log("_data", o), 1 == o.result ? (e.showOrderInfo(o.data.goods, o.data.order), 
                e.showAddress(o.data.express_list)) : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(s) {
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
    onLoad: function(o) {
        var e = this;
        s = o.order_id, e.getExpressInfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
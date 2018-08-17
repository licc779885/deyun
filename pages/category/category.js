var t = getApp();

Page({
    data: {
        categoryData: []
    },
    onLoad: function(t) {
        this._getData();
    },
    _getData: function(a) {
        var n = this;
        t._getNetWork({
            url: t.getNetAddresss("category/Index"),
            success: function(t) {
                var o = t.data.data.category;
                console.log(o), n.setData({
                    categoryData: o
                }), void 0 != a && a(t);
            },
            fail: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
});
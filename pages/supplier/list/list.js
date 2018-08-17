var o = getApp();
Page({
    data: {
        goodsData: [],
        supplier_id: "",
        goodsVoid: !1,
        adding: !1,
        notHave: !1,
        scrollTop: 0,
        page: 1,
        historyKeywords: "",
        categoryId: "",
        supplier: []
    },
    onLoad: function(o) {
        "" != o.supplier_id && void 0 != o.supplier_id && this.setData({
            supplier_id: o.supplier_id
        }), console.log("options:::", o), this._getData()
    },
    _getData: function() {
        var t = this,
            i = o.getNetAddresss("plugin.supplier.frontend.goods.get-goods-list");
        i += "&sid=" + this.data.supplier_id, o._getNetWork({
            url: i,
            success: function(o) {
                var e = o.data.data;
                console.log("请求到的数据", e), console.log("请求到的商品数据", e.list.data), console.log("请求路径", i), t.setData({
                    goodsData: e.list.data,
                    supplier: e.supplier
                }), wx.setNavigationBarTitle({
                    title: e.supplier.realname
                })
            },
            fail: function(o) {}
        })
    },
    toTel: function() {
        var o = this;
        wx.makePhoneCall({
            phoneNumber: o.data.supplier.mobile
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
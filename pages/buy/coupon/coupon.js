var t = getApp();

Page({
    data: {
        dataList: "",
        options:'',
    },
    onLoad: function(options) {
        this.setData({options:options});
        this._getData();
    },
    selectCoupon: function(t) {
        console.log("选择优惠券ID", t, t.currentTarget.dataset.id);
        var supplier_uid=this.data.options.supplier_uid;
        for (var a = t.currentTarget.dataset.id, n = this, o = n.data.dataList, e = 0; e < o.length; e++)
            (o[e].id = a)&&(o[e].supplier_uid=supplier_uid)&& wx.setStorage({
                key: "ORDER_COUPON_SELECT_DATA",
                data: o[e],
            });

        wx.showToast({
            title: "成功",
            icon: "loading",
            duration: 1e3,
            mask: !0
        }), n.setData({
            addres_id: a
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3);
    },
    _getData: function() {
        var a = this, n = t.getNetAddresss("coupon/Util");
        t._postNetWork({
            url: n,
            data: a.data.options,
            success: function(t) {
                console.log("优惠券数据", t.data.data.coupons), a.setData({
                    dataList: t.data.data.coupons
                });
            },
            fail: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
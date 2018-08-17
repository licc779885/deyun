var t = getApp();

Page({
    data: {
        userInfo: {},
        order_count: [],
        other: [],
        info: {},
        show_bonus:'',
    },
    goBalance: function(t) {
        "余额" == t.currentTarget.dataset.url ? (console.log(""), wx.navigateTo({
            url: "../balance/balance"
        })) : "积分" == t.currentTarget.dataset.url ? console.log("积分") : "云币" == t.currentTarget.dataset.url ? console.log("云币") : "优惠券" == t.currentTarget.dataset.url ? (console.log("优惠券"), 
        wx.navigateTo({
            url: "../coupon/coupon"
        })) : console.log("未知类型，请在小程序中配置");
    },
    onLoad: function() {
        this._getData(!0);
    },
    onReady: function() {},
    onShow: function() {
        this._getData(!1);
    },
    _getData: function(o) {
        var e = this;
        t._getNetWork({
            showToastIn: o,
            url: t.getNetAddresss("member/Account"),
            success: function(t) {
                var o = t.data.data;
                for (var n = o.other, a = 0; a < n.length; a++) "余额" == n[a].text ? n[a].url = "余额" : "积分" == n[a].text ? n[a].url = "积分" : "云币" == n[a].text ? n[a].url = "云币" : "优惠券" == n[a].text && (n[a].url = "优惠券");
                console.log(n), e.setData({
                    order_count: o.order_count,
                    other: n,
                    info: o.info,
                    show_bonus: o.bonus,
                }), wx.getStorage({
                    key: "userInfo",
                    success: function(t) {
                        e.setData({
                            userInfo: t.data.userInfo,
                        });
                    },
                    fail: function(t) {}
                });
            },
            fail: function(t) {}
        });
    },
    onHide: function() {},
    onUnload: function() {}
});
var i = getApp(), o = "", a = 1, e = 1;

Page({
    data: {
        order_commission_all_active: !0,
        order_commission_wait_pay_active: !1,
        order_commission_already_pay_active: !1,
        order_commission_finish_active: !1,
        orders: []
    },
    order_commission_all_clicked: function() {
        var i = this;
        i.data.order_commission_all_active || (o = "", i.setTabView(0), console.log("order_commission_all_clicked"));
    },
    order_commission_wait_pay_clicked: function() {
        var i = this;
        i.data.order_commission_wait_pay_active || (o = "0", i.setTabView(1), console.log("order_commission_wait_pay_clicked"));
    },
    order_commission_already_pay_clicked: function() {
        var i = this;
        i.data.order_commission_already_pay_active || (o = "1", i.setTabView(2), console.log("order_commission_already_pay_clicked"));
    },
    order_commission_finish_clicked: function() {
        var i = this;
        i.data.order_commission_finish_active || (o = "3", i.setTabView(3), console.log("order_commission_finish_clicked"));
    },
    setTabView: function(i) {
        var o = this;
        o.setData({
            orders: []
        }), a = 1, e = 1, 0 == i ? o.setData({
            order_commission_all_active: !0,
            order_commission_wait_pay_active: !1,
            order_commission_already_pay_active: !1,
            order_commission_finish_active: !1
        }) : 1 == i ? o.setData({
            order_commission_all_active: !1,
            order_commission_wait_pay_active: !0,
            order_commission_already_pay_active: !1,
            order_commission_finish_active: !1
        }) : 2 == i ? o.setData({
            order_commission_all_active: !1,
            order_commission_wait_pay_active: !1,
            order_commission_already_pay_active: !0,
            order_commission_finish_active: !1
        }) : 3 == i && o.setData({
            order_commission_all_active: !1,
            order_commission_wait_pay_active: !1,
            order_commission_already_pay_active: !1,
            order_commission_finish_active: !0
        }), this._getData();
    },
    _getData: function() {
        var s = this;
        i._getNetWork({
            url: i.getNetAddresss("commission/Order") + "&page=" + a + "&status=" + o,
            success: function(i) {
                if (console.log(i), 200 == i.statusCode) {
                    var o = i.data;
                    console.log(o), 1 == o.result ? (console.log(o.data), e = o.data.json.pageno, o.data.json.list.length, 
                    1 == a && s.setData({
                        orders: o.data.json.list
                    })) : s.net_fail(o.msg);
                } else s.net_fail("访问失败");
            },
            fail: function(i) {
                s.net_fail("访问失败");
            }
        });
    },
    onLoad: function(i) {
        this._getData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
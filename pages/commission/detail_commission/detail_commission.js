var i = getApp(), a = "", t = "0";

Page({
    data: {
        detail_commission_all_active: !0,
        detail_commission_wait_examine_active: !1,
        detail_commission_wait_pay_active: !1,
        detail_commission_already_pay_active: !1,
        detail_commission_invalid_active: !1,
        commissionLogs: [],
        navs:'',
        state:0,
    },
    commission_clicked:function(e){
      var state = e.target.dataset.state>0 ? e.target.dataset.state:0;
      this.setTabView(state)
    },
    setTabView: function(i) {
        var a = this;
        a.setData({
            state: i,
            commissionLogs: []
        }), t = "0", 0 == i ? a.setData({
            detail_commission_all_active: !0,
            detail_commission_wait_examine_active: !1,
            detail_commission_wait_pay_active: !1,
            detail_commission_already_pay_active: !1,
            detail_commission_invalid_active: !1
        }) : 1 == i ? a.setData({
            detail_commission_all_active: !1,
            detail_commission_wait_examine_active: !0,
            detail_commission_wait_pay_active: !1,
            detail_commission_already_pay_active: !1,
            detail_commission_invalid_active: !1
        }) : 2 == i ? a.setData({
            detail_commission_all_active: !1,
            detail_commission_wait_examine_active: !1,
            detail_commission_wait_pay_active: !0,
            detail_commission_already_pay_active: !1,
            detail_commission_invalid_active: !1
        }) : 3 == i ? a.setData({
            detail_commission_all_active: !1,
            detail_commission_wait_examine_active: !1,
            detail_commission_wait_pay_active: !1,
            detail_commission_already_pay_active: !0,
            detail_commission_invalid_active: !1
        }) : 4 == i && a.setData({
            detail_commission_all_active: !1,
            detail_commission_wait_examine_active: !1,
            detail_commission_wait_pay_active: !1,
            detail_commission_already_pay_active: !1,
            detail_commission_invalid_active: !0
        }), this._getData();
    },
    _getData: function() {
        var e = this;
        var state = e.data.state > 0 ? e.data.state:'';
        i._getNetWork({
          url: i.getNetAddresss("commission/Log") + "&id=" + t + "&status=" + state,
            success: function(i) {
                if (console.log(i), 200 == i.statusCode) {
                    var a = i.data;
                    console.log(a), 1 == a.result ? (console.log(a.data), a.data.json.list.length, 0 == t && e.setData({
                        commissionLogs: a.data.json.list,
                        navs:a.data.json.navs,
                    })) : e.net_fail(a.msg);
                } else e.net_fail("访问失败");
            },
            fail: function(i) {
                e.net_fail("访问失败");
            }
        });
    },
    onLoad: function(i) {
        this._getData();
    },
    net_fail: function(i) {
        wx.showToast({
            title: i,
            icon: "success",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
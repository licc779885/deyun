var t = getApp();

Page({
    data: {
        commission_ok: 0,
        buttons: []
    },
    _getData: function() {
        var o = this;
        t._getNetWork({
            url: t.getNetAddresss("commission/Apply"),
            success: function(t) {
                if (console.log(t), 200 == t.statusCode) {
                    var n = t.data;
                    console.log(n), 1 == n.result ? (console.log(n.data), o.setDataView(n.data)) : o.net_fail(n.msg);
                } else o.net_fail("访问失败");
            },
            fail: function(t) {
                o.net_fail("访问失败");
            }
        });
    },
    goToWithdrawType: function(t) {
        var o = this, n = t.currentTarget.dataset.state;
        wx.showModal({
            title: "微信提示",
            content: "确认要申请？提现申请通过之后给您打款后会通知到您的微信。",
            success: function(t) {
                t.confirm && o.getWithdraw(n);
            }
        });
    },
    getWithdraw: function(o) {
        var n = this;
        t._getNetWork({
            url: t.getNetAddresss("commission/Apply") + "&type=" + o,
            success: function(t) {
                if (console.log(t), 200 == t.statusCode) {
                    var o = t.data;
                    console.log(o), 1 == o.result ? (console.log(o.data), wx.navigateBack({})) : n.net_fail(o.msg);
                } else n.net_fail("访问失败");
            },
            fail: function(t) {
                n.net_fail("访问失败");
            }
        });
    },
    setDataView: function(t) {
        this.setData({
            commission_ok: t.json.commission_ok,
            buttons: t.json.buttons
        });
    },
    onLoad: function(t) {
        this._getData();
    },
    net_fail: function(t) {
        wx.showModal({
            title: t,
            showCancel:false,
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {
      this._getData();
    },
    onHide: function() {},
    onUnload: function() {}
});
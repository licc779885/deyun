var o = getApp(), t = "0", e = o.getNetAddresss("commission/Customer");

Page({
    data: {
        customers: [],
        adding: !0,
        notHave: !1
    },
    _getData: function() {
        var n = this;
        o._getNetWork({
            url: e + "&id=" + t,
            success: function(o) {
                if (console.log(o), 200 == o.statusCode) {
                    var e = o.data;
                    if (console.log(e), 1 == e.result) {
                        if (console.log(e.data), 0 == e.data.json.list.length) 0 == t && n.setData({
                            customers: e.data.json.list,
                            adding: !1,
                            notHave: !1
                        }); else if (0 == t) n.setData({
                            customers: e.data.json.list,
                            adding: !1,
                            notHave: !1
                        }); else {
                            var s;
                            s = n.data.customers, console.log("length", e.data.json.list.length);
                            for (var l = 0; l < e.data.json.list.length; l++) s.push(e.data.json.list[l]);
                            n.setData({
                                customers: s
                            });
                        }
                        wx.stopPullDownRefresh({
                            complete: function(o) {
                                console.log("关闭下拉刷新", o, new Date());
                            }
                        });
                    } else n.net_fail(e.msg), wx.stopPullDownRefresh({
                        complete: function(o) {
                            console.log("关闭下拉刷新", o, new Date());
                        }
                    });
                } else n.net_fail("访问失败"), wx.stopPullDownRefresh({
                    complete: function(o) {
                        console.log("关闭下拉刷新", o, new Date());
                    }
                });
            },
            fail: function(o) {
                n.net_fail("访问失败"), wx.stopPullDownRefresh({
                    complete: function(o) {
                        console.log("关闭下拉刷新", o, new Date());
                    }
                });
            }
        });
    },
    onLoad: function(o) {
        this._getData();
    },
    net_fail: function(o) {
        wx.showToast({
            title: o,
            icon: "success",
            duration: 2e3
        });
    },
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh", new Date()), console.log("下拉了"), t = "0", this._getData(function() {
            wx.stopPullDownRefresh({
                complete: function(o) {
                    console.log(o, new Date());
                }
            });
        });
    },
    lower: function() {
        console.log("上拉了");
        var o = this;
        o.data.customers.length > 0 && (t = o.data.customers[length].id, this._getData());
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
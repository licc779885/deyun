var e = getApp();

Page({
    data: {
        goodsData: [],
        bannerData: [ {
            thumb: ""
        } ],
        memuData: [],
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 4e3,
        duration: 300,
        isApply: !1,
        shop: "",
        designerItem: [],
        isDesigner: !1,
        pageinfo: {}
    },
    onShareAppMessage: function() {
        var e = wx.getStorageSync("yz_uid"), t = "";
        return e && (t = e), console.log("url:::::", "/pages/index/index?mid=" + t), {
            title: "德云网络科技",
            desc: "德云网络科技商城",
            path: "/pages/index/index?mid=" + t
        };
    },
    selectAddressData: [ {
        name: "请选择",
        id: ""
    } ],
    onLoad: function(e) {
        this._getData();
    },
    _getData: function(t) {
        var a = this;
        e._getNetWork({
            url: e.getNetAddresss("index/Index"),
            success: function(e) {
                var o = e.data.data;
                if (console.log("index", e.data), e.data.type) {
                    for (var n = e.data, i = 0; i < n.data.length; i++) if ("menu" == n.data[i].temp) {
                        var s, d = 10, r = p = n.data[i].data, l = Math.ceil(p.length / d);
                        s = p.length <= 5 ? "in1" : "in2";
                        for (var c = new Array(), g = 0; g < l; g++) {
                            for (var u = new Array(), f = 0; f < d; f++) void 0 != (w = p[f]) && u.push(p[f]);
                            p = r = r.slice(d), c.push(u);
                        }
                        n.data[i].data = c, n.data[i].class = s;
                    }
                    a.setData({
                        isDesigner: !0,
                        designerItem: n.data
                    });
                } else {
                    var h, d = 8, p = o.category, r = p, l = Math.ceil(p.length / d);
                    p.length <= 4 ? (h = "in1", console.log("1", p.length)) : (h = "in2", console.log("2", p.length));
                    for (var D = new Array(), g = 0; g < l; g++) {
                        for (var v = new Array(), f = 0; f < d; f++) {
                            var w = p[f];
                            void 0 != w && v.push(p[f]);
                        }
                        p = r = r.slice(d), D.push(v);
                    }
                    console.log("dataArray", D), a.setData({
                        bannerData: o.ads,
                        goodsData: o.goods,
                        memuData: D,
                        menuHeightClass: h
                    }), void 0 != t && t(e), wx.stopPullDownRefresh({
                        complete: function(e) {
                            console.log("关闭下拉刷新", e, new Date());
                        }
                    });
                }
            },
            fail: function(e) {
                console.log("error"), wx.stopPullDownRefresh({
                    complete: function(e) {
                        console.log("关闭下拉刷新", e, new Date());
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    goToDetail: function(e) {
        var t = "../detail/detail?id=" + e.currentTarget.id;
        wx.navigateTo({
            url: t
        }), console.log(t);
    },
    goGoodsList: function(e) {
        var t, a = e.currentTarget.dataset.id, o = e.currentTarget.dataset.level;
        "1" == o ? t = "../buy/goodsList/goodsList?pcateid=" + a + "&ccateid=&tcateid=" : "2" == o ? t = "../buy/goodsList/goodsList?pcateid=&ccateid=" + a + "&tcateid=" : "3" == o && (t = "../buy/goodsList/goodsList?pcateid=&ccateid=&tcateid=" + a), 
        wx.navigateTo({
            url: t
        });
    },
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh", new Date()), console.log("下拉了"), this._getData(function() {
            wx.stopPullDownRefresh({
                complete: function(e) {
                    console.log(e, new Date());
                }
            });
        });
    }
});
var t = getApp(), e = t.getNetAddresss("goods/Display");

Page({
    data: {
        goodsData: [],
        listType: [ {
            type: "type1",
            title: "销量从高到低",
            strWhere: "&order=sales&by=desc"
        }, {
            type: "type2",
            title: "价格从低到高",
            strWhere: "&order=marketprice&by=asc"
        }, {
            type: "type3",
            title: "价格从高到低",
            strWhere: "&order=marketprice&by=desc"
        }, {
            type: "type4",
            title: "评价从高到低",
            strWhere: "&order=score&by=desc"
        } ],
        typeTitle: {
            type: "type1",
            title: "销量从高到低",
            strWhere: "&order=sales&by=desc"
        },
        page: 1,
        goodsVoid: !1,
        adding: !0,
        notHave: !1,
        scrollTop: 0
    },
    _getData: function() {
        var a = this, o = e, s = a.data.typeTitle.strWhere;
        o += s + "&page=" + a.data.page, t._getNetWork({
            url: o,
            success: function(t) {
                var e = t.data.data;
                if (console.log(e), e.page_total < a.data.page) a.setData({
                    notHave: !0,
                    adding: !1
                }); else {
                    if (e.page_total == a.data.page ? a.setData({
                        notHave: !0,
                        adding: !1
                    }) : a.setData({
                        notHave: !1,
                        adding: !0
                    }), console.log("urlStr", o), console.log("res.data.data", e), 1 != a.data.page) {
                        var s;
                        s = a.data.goodsData, console.log("length", e.goods.length);
                        for (var n = 0; n < e.goods.length; n++) s.push(e.goods[n]);
                        a.setData({
                            goodsData: s
                        });
                    } else a.setData({
                        goodsData: e.goods
                    });
                    e.goods.length <= 0 && (console.log("里面啥也没有"), a.setData({
                        goodsVoid: !0,
                        notHave: !1,
                        adding: !1
                    })), wx.stopPullDownRefresh({
                        complete: function(t) {
                            console.log("关闭下拉刷新", t, new Date());
                        }
                    });
                }
            },
            fail: function(t) {
                wx.stopPullDownRefresh({
                    complete: function(t) {
                        console.log("关闭下拉刷新", t, new Date());
                    }
                });
            }
        });
    },
    _showListType: function() {
        for (var t = this, e = [], a = 0; a < this.data.listType.length; a++) e.splice(e.length, 1, this.data.listType[a].title);
        wx.showActionSheet({
            itemList: e,
            success: function(e) {
                e.cancel || (t.setData({
                    typeTitle: t.data.listType[e.tapIndex],
                    page: 1
                }), t._getData(), t.setData({
                    scrollTop: 10
                }), t.setData({
                    scrollTop: 0
                }));
            }
        });
    },
    onLoad: function(t) {
        e += "&pcate=" + t.pcateid, e += "&ccate=" + t.ccateid, e += "&tcate=" + t.tcateid, 
        this._getData();
    },
    lower: function(t) {
        this._addData();
    },
    _addData: function() {
        console.log("+++");
        var t = this;
        0 == t.data.notHave && (t.setData({
            page: t.data.page + 1
        }), t._getData());
    },
    onPullDownRefresh: function() {
        this._getData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
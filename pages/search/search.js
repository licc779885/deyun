var o = getApp(), t = o.getNetAddresss("goods/Display");

Page({
    data: {
        goodsData: [],
        keywords: "",
        goodsVoid: !1,
        adding: !1,
        notHave: !1,
        scrollTop: 0,
        page: 1,
        historyKeywords: ""
    },
    bindSearch: function() {
        console.log("bindSearch"), console.log("当前", this.data.keywords, "历史", this.data.historyKeywords), 
        this._checkSame() || this._getData(), this.setData({
            page: 1
        });
    },
    bindKeyInput: function(o) {
        this.setData({
            keywords: o.detail.value
        });
    },
    lower: function(o) {
        this._addData();
    },
    onPullDownRefresh: function() {
        this._getData();
    },
    onLoad: function() {
        this.setData({
            keywords: "",
            goodsData: []
        });
    },
    _checkVoid: function() {
        return this.data.keywords.length <= 0;
    },
    _checkSame: function() {
        return this.data.keywords == this.data.historyKeywords && (console.log("两次搜索内容一样"), 
        !0);
    },
    _stateVoid: function() {
        this.setData({
            goodsData: [],
            goodsVoid: !0,
            notHave: !1,
            adding: !1
        }), console.log("搜索结果为空，里面啥也没有");
    },
    _stateMore: function() {
        this.setData({
            goodsVoid: !1,
            notHave: !1,
            adding: !0
        }), console.log("加载更多");
    },
    _stateNoMore: function() {
        this.setData({
            goodsVoid: !1,
            notHave: !0,
            adding: !1
        }), console.log("没有更多了");
    },
    _addData: function() {
        console.log("+++");
        var o = this;
        0 == o.data.notHave && (o.setData({
            page: o.data.page + 1
        }), o._getData()), console.log("追加更多数据事件");
    },
    _getData: function() {
        var a = this, e = t;
        e += "&keywords=" + this.data.keywords, e += "&page=" + this.data.page, o._getNetWork({
            url: e,
            success: function(o) {
                var t = o.data.data;
                if (console.log("请求到的数据", t), console.log("请求路径", e), a.setData({
                    historyKeywords: a.data.keywords
                }), t.goods.length <= 0) a._stateVoid(); else if (t.page_total < a.data.page) a._stateNoMore(); else if (t.page_total == a.data.page ? a._stateNoMore() : a._stateMore(), 
                1 != a.data.page) {
                    var s;
                    s = a.data.goodsData;
                    for (var d = 0; d < t.goods.length; d++) s.push(t.goods[d]);
                    a.setData({
                        goodsData: s
                    });
                } else a.setData({
                    goodsData: t.goods
                }), a.setData({
                    goodsVoid: !1
                });
            },
            fail: function(o) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
var t = getApp();

Page({
    data: {
        cartState: 0,
        goodsData: [],
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 4e3,
        duration: 300,
        countTotal: 0,
        selectGoodsNum: 0,
        allGoodsNum: 0
    },
    onLoad: function(t) {},
    _getData: function() {
        var a = this, o = 0;
        t._getNetWork({
            url: t.getNetAddresss("cart/Display"),
            success: function(t) {
                console.log("加载数据", t.data);
                for (var e = t.data.data, s = 0; s < e.list.length; s++) e.list[s].state = !1;
                console.log(e.list), o = e.list.length > 0 ? 2 : 1, a.setData({
                    goodsData: e.list,
                    cartState: o,
                    allGoodsNum: e.list.length
                }), a.countTotal();
            },
            fail: function(t) {
                o = 4, a.setData({
                    cartState: o
                });
            }
        });
    },
    countTotal: function() {
        for (var t = this, a = 0, o = 0, e = t.data.goodsData, s = 0; s < e.length; s++) e[s].state && (a += e[s].total * e[s].marketprice, 
        o += 1);
        a = parseFloat(a).toFixed(2), t.setData({
            countTotal: a,
            selectGoodsNum: o
        });
    },
    selectGoods: function(t) {
        var a = this, o = t.currentTarget.dataset.id;
        console.log(o);
        for (var e = a.data.goodsData, s = 0; s < e.length; s++) e[s].id == o && (e[s].state = !e[s].state);
        a.setData({
            goodsData: e
        }), a.countTotal();
    },
    allSelect: function() {
        var t = this, a = t.data.selectGoodsNum, o = t.data.allGoodsNum, e = !0;
        o == a ? (e = !1, a = 0) : (e = !0, a = o);
        for (var s = t.data.goodsData, n = 0; n < s.length; n++) s[n].state = e;
        t.setData({
            goodsData: s,
            selectGoodsNum: a
        }), t.countTotal();
    },
    removeGoodsNum: function(t) {
        var a = this, o = t.currentTarget.dataset.id, e = parseInt(t.currentTarget.dataset.total) - 1, s = t.currentTarget.dataset.optionid;
        e < 1 || a.goodsNum(o, -1, s);
    },
    addGoodsNum: function(t) {
        var a = this, o = t.currentTarget.dataset.id, e = t.currentTarget.dataset.optionid;
        a.goodsNum(o, 1, e);
    },
    inputGoodsNum: function(t) {
        var a = this, o = t.currentTarget.dataset.id, e = t.currentTarget.dataset.total, s = t.currentTarget.dataset.optionid;
        a.goodsNum(o, parseInt(t.detail.value) - parseInt(e), s);
    },
    goodsNum: function(a, o, e) {
        console.log("_id", a, "_num", o);
        var s = this, n = t.getNetAddresss("cart/Operation/add");
        n += "&id=" + a, n += "&total=" + o, n += "&optionid=" + e, t._getNetWork({
            maskIn: !0,
            url: n,
            success: function(t) {
                var a = t.data;
                console.log(a.msg);
                console.log("_data", a), 1 == a.result ? (console.log("提交数量", a), s._getData()) : wx.showToast({
                  title: a.msg.message,
                    icon: "success",
                    mask: !0,
                    duration: 2e3
                });
            },
            fail: function(t) {}
        });
    },
    goToDetail: function(t) {
        wx.navigateTo({
            url: "../../detail/detail?id=" + t.currentTarget.dataset.id
        });
    },
    deleteGoods: function(a) {
        var o = this, e = t.getNetAddresss("cart/Operation/remove");
        e += "&ids=" + a.currentTarget.dataset.id, t._getNetWork({
            url: e,
            success: function(t) {
                var a = t.data;
                console.log("_data", t), 1 == a.result ? (o._getData(), wx.showToast({
                    title: a.msg,
                    icon: "success",
                    mask: !1,
                    duration: 2e3
                })) : wx.showToast({
                    title: a.msg,
                    icon: "success",
                    mask: !1,
                    duration: 2e3
                });
            },
            fail: function(t) {}
        });
    },
    gotoConfirm: function() {
        var t = this, a = t.data.goodsData;
        if (t.data.selectGoodsNum > 0) {
            for (var o = "", e = 0; e < a.length; e++) a[e].state && (o += a[e].id + ",");
            o = o.substring(0, o.length - 1), console.log("ids", o), wx.navigateTo({
                url: "../../buy/myOrder/myOrder?cart_ids=" + o + "&goods_id=nul"
            });
        } else wx.showToast({
            title: "请选择商品",
            icon: "success",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {
        this._getData();
    },
    onHide: function() {
        console.log("页面关闭"), this.setData({
            cartState: 0
        });
    },
    onUnload: function() {},
    goHome: function(t) {
      wx.switchTab({
            url: "../../index/index"
        });
    },
});
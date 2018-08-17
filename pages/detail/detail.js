var t = getApp(), a = require("../../wxParse/wxParse.js");

Page({
  data: {
    submitTitle: {
      state: !1,
      title: "请选择"
    },
    params: null,
    id: "",
    buyNum: 1,
    stock: "",
    bannerData: [],
    price: 0,
    maxbuy: 0,
    goodscount:0,
    goodsData: [],
    storesData: [],
    homeImg: [],
    optionsState: !1,
    specsData: [],
    optionid: "",
    shop:'',
    specsDataNetwork: [],
    commentData: [],
    commentDataState: 0,
    showGoods: !0,
    showDetail: !1,
    showParameter: !1,
    showComment: !1,
    indicatorDots: !0,
    options: [],
    vertical: !1,
    autoplay: !0,
    interval: 4e3,
    duration: 300,
    isverify: !1,
    ready: !1,
    collection: !1,
    detailInfo: !1,
    notbuy:0,
    notbuyReason:'',
  },
  onShareAppMessage: function () {
    var t = wx.getStorageSync("yz_uid"), a = "";
    return t && (a = t), {
      title: this.data.goodsData.title,
      desc: this.data.goodsData.title,
      path: "/pages/detail/detail?id=" + this.data.id + "&mid=" + a
    };
  },
  openAddCart: function () {
    this.openDetailInfo("addCart");
  },
  openBuy: function () {
    this.openDetailInfo("buy");
  },
  toAddCart: function (a) {
    var o = this;
    if (a.currentTarget.dataset.disabled) {
      console.log("click");
      var e = t.getNetAddresss("cart/Operation/add");
      e += "&id=" + o.data.id, e += "&optionid=" + o.data.optionid, e += "&total=" + o.data.buyNum,
        console.log("提交地址", e), t._getNetWork({
          url: e,
          success: function (t) {
            var a = t.data;
            console.log(a), 1 == a.result ? (wx.showToast({
              title: "添加成功",
              icon: "success",
              mask: !1,
              duration: 2e3
            }), o.closeDetailInfo()) : wx.showToast({
              title: "最多购买" + o.data.goodsData.maxbuy + "件",
              icon: "success",
              mask: !1,
              duration: 2e3
            });
          },
          fail: function (t) { }
        });
    } else console.log("no");
  },
  toBuy: function (t) {
    var a = this;
    if (t.currentTarget.dataset.disabled) {
      console.log("click");
      var o = "../buy/myOrder/myOrder?";
      o += "goods_id=" + a.data.id, o += "&optionid=" + a.data.optionid, o += "&total=" + a.data.buyNum,
        console.log("提交地址", o), wx.navigateTo({
          url: o
        });
    } else console.log("no");
  },
  openDetailInfo: function (t) {
    this.setData({
      detailInfo: !0,
      buyType: t
    }), this.setSpecs();
  },
  closeDetailInfo: function () {
    this.setData({
      detailInfo: !1
    });
  },
  selectSpecs: function (t) {
    for (var a, o = this, e = t.currentTarget.dataset, s = o.data.specsData, i = 0; i < s.length; i++) if (e.id == s[i].id) {
      s[i].state = !0;
      for (var n = 0; n < s[i].items.length; n++) e.specid == s[i].items[n].id ? (s[i].items[n].state = !0,
        a = s[i].items[n].thumb) : s[i].items[n].state = !1;
    }
    o.setData({
      specsData: s,
      optionsState: !0,
      homeImg: a
    }), console.log("_specsData", s), o.setSpecs(), o.setGoodsNum();
  },
  setSpecs: function () {
    var t = this, a = t.data.specsData, o = a.length, e = "", s = 0, i = "", n = "";
    if (o <= 0) t.setData({
      "submitTitle.state": !0,
      "submitTitle.title": "确定"
    }); else {
      for (u = 0; u < o; u++) {
        for (var c = 0, d = 0; d < a[u].items.length; d++) a[u].items[d].state && (c += 1,
          i += a[u].items[d].id + "_");
        1 != c && (e += a[u].title + ","), s += c;
      }
      if (o != s) t.setData({
        "submitTitle.state": !1,
        "submitTitle.title": "请选择" + e
      }); else {
        for (var r = "", l = "", u = 0; u < t.data.options.length; u++) i == t.data.options[u].specs + "_" && (n = t.data.options[u].id,
          r = t.data.options[u].marketprice, l = t.data.options[u].stock);
        t.setData({
          "submitTitle.state": !0,
          "submitTitle.title": "确定",
          price: r,
          stock: l,
          optionid: n
        });
      }
    }
  },
  removeGoodsNum: function () {
    var t = this, a = parseInt(t.data.buyNum) - 1;
    t.goodsNum(a);
  },
  setGoodsNum: function () {
    var t = this;
    t.goodsNum(parseInt(t.data.buyNum));
  },
  addGoodsNum: function () {
    var t = this, a = parseInt(t.data.buyNum) + 1;
    t.goodsNum(a);
  },
  inputGoodsNum: function (t) {
    this.goodsNum(parseInt(t.detail.value));
  },
  goodsNum: function (t) {
    var a = this;
    console.log(a.data.stock);
    var o = "";
    t <= 0 ? (o = "购买数量不能为0", t = 1) : t > a.data.stock && (o = "超过购买限制", t = a.data.stock),
      o.length > 0 ? (wx.showToast({
        title: o,
        icon: "success",
        duration: 2e3
      }), a.setData({
        buyNum: t
      })) : a.setData({
        buyNum: t
      });
  },
  _getComment: function () {
    var a = this;
    t._getNetWork({
      showToastIn: !1,
      url: t.getNetAddresss("order/Comment/getList") + "&goodsid=" + a.data.id,
      success: function (o) {
        console.log("评价数据", o.data.data.list);
        for (var e = o.data.data.list, s = 0; s < e.length; s++) e[s].xingxing = t.getEvaluate(e[s].level);
        var i = 1;
        e.length > 0 && (i = 2), a.setData({
          commentData: e,
          commentDataState: i
        }), console.log("评价数据", e);
      },
      fail: function (t) { }
    });
  },
  _getData: function (o) {
    var e = this, s = t.getNetAddresss("goods/Detail");
    s += "&id=" + e.data.id, console.log("urlStr", s), t._getNetWork({
      showToastIn: !1,
      url: s,
      success: function (t) {
        var s = t.data.data;
        console.log(s);
        var i, n;
        n = 2 == s.isverify, i = s.specs.length > 0 ? "￥" + s.min_price + "——￥" + s.max_price : "￥" + s.goods.marketprice;
        var nothtml='';
          if( s.goods.canbuy){
              if(s.goods.userbuy=='0') {
                  nothtml = "您已超出购买上限~";
              } else {
                  if( s.goods.groupbuy=='0' || s.goods.levelbuy=='0'){
                      nothtml="您不能购买此商品,请联系客服";
                  } else {
                      if( s.goods.total==0){
                          nothtml="库存不足，无法购买";
                      } else {
                          if( s.goods.istime=='1'){
                              if( s.goods.timebuy=='1'){
                                  nothtml= "限时购活动已经结束，请下次再来~"
                              }else{//未开始倒计时或进行中
                                  nothtml= "限时购活动还未开始~"
                              }
                          }
                      }
                  }
              }
          }else {
              nothtml = "商品已下架";
          }
          e.setData({
              params: s.params,
              bannerData: s.pics,
              goodsData: s.goods,
              homeImg: s.pics[0],
              shop:s.detail,
              goodscount:s.goodscount,
              storesData: s.stores,
              specsDataNetwork: s.specs,
              specsData: s.specs,
              isverify: n,
              ready: !0,
              options: s.options,
              price: i,
              maxbuy: s.goods.maxbuy,
              collection: s.isfavorite,
              stock: s.goods.total,
              nothtml:nothtml,
              notbuy:nothtml?1:0,
          });
        var c = s.goods.content;
        a.wxParse("article", "html", c, e, 0), void 0 != o && o(t);
      },
      fail: function (t) { }
    });
  },
  onLoad: function (t) {
    this.setData({
      id: t.id
    }), this._getData(), this._getComment();
  },
  animateType: function (t) {
    var a = !1, o = !1, e = !1, s = !1;
    "showGoods" == t.currentTarget.dataset.type ? a = !0 : "showDetail" == t.currentTarget.dataset.type ? o = !0 : "showParameter" == t.currentTarget.dataset.type ? e = !0 : "showComment" == t.currentTarget.dataset.type && (s = !0),
      this.setData({
        showGoods: a,
        showDetail: o,
        showParameter: e,
        showComment: s
      });
  },
  goCart: function () {
    console.log("goCart"), wx.switchTab({
      url: "/pages/buy/cart/cart"
    });
  },
  setCollect: function () {
    var a = this;
    t._getNetWork({
      url: t.getNetAddresss("favorite/Set") + "&id=" + a.data.id,
      success: function (t) {
        a.data.collection ? (a.setData({
          collection: !1
        }), wx.showToast({
          title: "取消收藏",
          icon: "success",
          mask: !1,
          duration: 2e3
        })) : (a.setData({
          collection: !0
        }), wx.showToast({
          title: "已收藏",
          icon: "success",
          mask: !1,
          duration: 2e3
        }));
      },
      fail: function (t) { }
    });
  },
  onReady: function () { },
  onShow: function () {
    console.log("0", !0), console.log("false", !0), console.log("kong", !0);
  },
  onHide: function () { },
  onUnload: function () { }
});
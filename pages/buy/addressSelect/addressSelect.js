var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp();

Page({
    data: {
        addressListData: [],
        addres_id: null
    },
    _gotoAddressAdd: function(t) {
        wx.redirectTo({
            url: "../../member/addressAdd/addressAdd?type=add&from=addressSelect"
        });
    },
    _gotoAddressUpdata: function(t) {
        wx.redirectTo({
            url: "../../member/addressAdd/addressAdd?type=updata&from=addressSelect"
        });
    },
    editAddress: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../member/addressAdd/addressAdd?type=updata&from=addressSelect&id=" + e
        });
    },
    selectAddres: function(t) {
        console.log(t, t.currentTarget.dataset.id);
        for (var e = this, s = e.data.addressListData, d = t.currentTarget.dataset.id, o = 0; o < s.length; o++) s[o].id == d && wx.setStorage({
            key: "ORDER_ADDRESS_SELECT_DATA",
            data: s[o]
        });
        wx.showToast({
            title: "成功",
            icon: "loading",
            duration: 1e3,
            mask: !0
        }), e.setData({
            addres_id: d
        }), setTimeout(function() {
            wx.navigateBack();
        }, 1e3);
    },
    _getData: function(s) {
        console.log("typeof(options)", void 0 === s ? "undefined" : t(s));
        var d;
        "object" == (void 0 === s ? "undefined" : t(s)) ? (console.log("options", s), d = s.addres_id, 
        console.log("_addres_id", d)) : d = null;
        var o = this;
        e._getNetWork({
            url: e.getNetAddresss("address/Show"),
            success: function(t) {
                console.log("获取收货地址列表", t);
                var e = t.data;
                1 == e.result ? (o.setData({
                    addressListData: e.data.list,
                    addres_id: d
                }), console.log("收货地址列表", e.data.list)) : o._gotoAddressAdd();
            },
            fail: function(t) {}
        });
    },
    delAddress: function(t) {
        var s = this, d = e.getNetAddresss("address/Remove");
        d += "&id=" + t.currentTarget.dataset.id, s.data.addres_id != t.currentTarget.dataset.id ? wx.showModal({
            title: "提示",
            content: "确定要删除么？此操作不可逆！",
            success: function(t) {
                t.confirm && (console.log("用户点击确定"), e._getNetWork({
                    url: d,
                    success: function(t) {
                        var e = t.data;
                        console.log("收货地址列表", e), 1 == e.result ? (s._getData(), wx.showToast({
                            title: e.msg,
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        })) : wx.showToast({
                            title: "数据错误",
                            icon: "success",
                            duration: 2e3,
                            success: function() {},
                            fail: function() {}
                        });
                    },
                    fail: function(t) {}
                }));
            }
        }) : wx.showToast({
            title: "已选收货地址不可删除，",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        });
    },
    onLoad: function(t) {
        this._getData(t);
    },
    onReady: function() {},
    onShow: function(t) {},
    onHide: function() {},
    onUnload: function() {}
});
var t = getApp();

Page({
    data: {
        addressListData: [],
        state: 0
    },
    _getData: function() {
        var s = this;
        t._getNetWork({
            showToastIn: !1,
            url: t.getNetAddresss("address/Display"),
            success: function(t) {
                var e = t.data;
                if (1 == e.result) {
                    var a = 0;
                    a = e.data.list.length <= 0 ? 1 : 2, s.setData({
                        addressListData: e.data.list,
                        state: a
                    }), console.log("收货地址列表", e.data.list);
                } else wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {}
        });
    },
    defaultAddress: function(s) {
        var e = this, a = t.getNetAddresss("address/SetDefault");
        a += "&id=" + s.currentTarget.dataset.id, t._getNetWork({
            url: a,
            success: function(t) {
                var s = t.data;
                console.log("设置默认收货地址", t), 1 == s.result ? e._getData() : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {}
        });
    },
    editAddress: function(t) {
        var s = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../member/addressAdd/addressAdd?type=updata&from=addressList&id=" + s
        });
    },
    delAddress: function(s) {
        var e = this, a = t.getNetAddresss("address/Remove");
        a += "&id=" + s.currentTarget.dataset.id, wx.showModal({
            title: "提示",
            content: "确定要删除么？此操作不可逆！",
            success: function(s) {
                s.confirm && (console.log("用户点击确定"), t._getNetWork({
                    url: a,
                    success: function(t) {
                        var s = t.data;
                        console.log("收货地址列表", s), 1 == s.result ? (e._getData(), wx.showToast({
                            title: s.msg,
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
        });
    },
    _gotoAddressAdd: function(t) {
        wx.navigateTo({
            url: "../../member/addressAdd/addressAdd?type=add&from=addressList"
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this._getData();
    },
    onHide: function() {},
    onUnload: function() {}
});
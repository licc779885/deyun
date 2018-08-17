var e = getApp();

Page({
    data: {},
    onLoad: function(a) {
        e._getNetWork({
            url: e.getNetAddresss("channel/Af_channel/hasApplied"),
            success: function(e) {
                var a = e.data;
                console.log(a), 1 == a.result ? "1" == a.data.is_channel && wx.showModal({
                    title: "提示",
                    content: "您已申请渠道商，无需重复申请!",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.navigateBack();
                    }
                }) : wx.showToast({
                    title: "数据错误",
                    icon: "loading",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function(e) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    formSubmit: function(a) {
        if (console.log(a.detail.value.realname), "" != a.detail.value.realname && void 0 != a.detail.value.realname) if ("" != a.detail.value.mobile && void 0 != a.detail.value.mobile) if (/^1[34578]\d{9}$/.test(a.detail.value.mobile)) if ("" != a.detail.value.address && void 0 != a.detail.value.address) if ("" != a.detail.value.url && void 0 != a.detail.value.url) {
            var t = e.getNetAddresss("channel/Af_channel");
            t += "&realname=" + a.detail.value.realname, t += "&mobile=" + a.detail.value.mobile, 
            t += "&address=" + a.detail.value.address, t += "&url=" + a.detail.value.url, e._getNetWork({
                url: t,
                success: function(e) {
                    1 == e.data.result ? wx.showToast({
                        title: "成功提交渠道商申请",
                        icon: "success",
                        duration: 1e3,
                        mask: !0,
                        success: function() {
                            setTimeout(function() {
                                wx.navigateBack();
                            }, 1e3);
                        },
                        fail: function() {},
                        complete: function() {}
                    }) : wx.showToast({
                        title: "数据错误",
                        icon: "loading",
                        duration: 2e3,
                        mask: !0
                    });
                },
                fail: function(e) {}
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入授权地址",
            showCancel: !1,
            success: function(e) {}
        }); else wx.showModal({
            title: "提示",
            content: "请输入联系地址",
            showCancel: !1,
            success: function(e) {}
        }); else wx.showModal({
            title: "提示",
            content: "手机号码格式有误",
            showCancel: !1,
            success: function(e) {}
        }); else wx.showModal({
            title: "提示",
            content: "请输入联系电话",
            showCancel: !1,
            success: function(e) {}
        }); else wx.showModal({
            title: "提示",
            content: "请输入公司/个人",
            showCancel: !1,
            success: function(e) {}
        });
    }
});
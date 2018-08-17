var e = getApp();

Page({
    data: {
        username: "",
        psw: "",
        name: "",
        phone: "",
        wx: "",
        product: ""
    },
    formSubmit: function(t) {
        if (0 != t.detail.value.username.length) if (0 != t.detail.value.psw.length) if (0 != t.detail.value.name.length) if (0 != t.detail.value.phone.length && /^1[34578]\d{9}$/.test(t.detail.value.phone)) if (0 != t.detail.value.wx.length) if (0 != t.detail.value.product.length) {
            var s = e.getNetAddresss("supplier/Af_supplier");
            s += "&realname=" + t.detail.value.name, s += "&password=" + t.detail.value.psw, 
            s += "&username=" + t.detail.value.username, s += "&mobile=" + t.detail.value.phone, 
            s += "&weixin=" + t.detail.value.wx, s += "&productname=" + t.detail.value.product, 
            e._getNetWork({
                url: s,
                success: function(e) {
                    var t = e.data;
                    console.log("_data", t), 1 == t.result ? wx.showToast({
                        title: "已经成功提交\b成为供应商申请",
                        icon: "success",
                        duration: 1e3,
                        mask: !0,
                        success: function() {
                            setTimeout(function() {
                                wx.switchTab({
                                    url: "/pages/member/index/index"
                                });
                            }, 1e3);
                        },
                        fail: function() {},
                        complete: function() {}
                    }) : wx.showToast({
                        title: "数据错误",
                        icon: "success",
                        duration: 2e3,
                        success: function() {},
                        fail: function() {}
                    });
                },
                fail: function(e) {
                    wx.showToast({
                        title: "请求失败,请稍后重试",
                        icon: "success",
                        duration: 2e3,
                        success: function() {},
                        fail: function() {}
                    });
                }
            });
        } else wx.showToast({
            title: "商品名称不能为空",
            icon: "success",
            duration: 2e3
        }); else wx.showToast({
            title: "微信号码不能为空",
            icon: "success",
            duration: 2e3
        }); else wx.showToast({
            title: "手机号码有误,请确认再次填写",
            icon: "success",
            duration: 2e3
        }); else wx.showToast({
            title: "姓名不能为空",
            icon: "success",
            duration: 2e3
        }); else wx.showToast({
            title: "密码码不能为空",
            icon: "success",
            duration: 2e3
        }); else wx.showToast({
            title: "用户名码不能为空",
            icon: "success",
            duration: 2e3
        });
    },
    formReset: function() {
        this.setData({
            username: "",
            psw: ""
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
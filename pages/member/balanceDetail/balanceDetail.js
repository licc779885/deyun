var t, e = getApp();

Page({
    data: {
        type: "null",
        balance: "",
        openid: ""
    },
    createOrder: function() {
        var s = e.getNetAddresss("member/Recharge"),that =this;
        s += "&trigger=";
        e._getNetWork({
            url: s,
            success: function(e) {
                var s = e.data;
                1 == s.result ? (t = s.data.logid, console.log(s.data.openid), that.setData({ openid: s.data.openid})) : wx.showToast({
                    title: "数据有误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "请求失败,请稍后重试",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            }
        });
    },
    payCharge: function(s) {
        var n = this, i = s.detail.value.charge_money;
        if (0 == i.length || parseFloat(i) < 0) wx.showToast({
            title: "充值余额必须大于0",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        }); else {
            var c = e.getNetAddresss("member/Recharge"),openid=n.data.openid;
            c += "&trigger=post&openid=" + n.data.openid + "&money=" + i + "&type=weixin&logid=" + t, 
            wx.showModal({
                title: "提示",
                content: "确认金额: " + i + "元",
                success: function(t) {
                    t.confirm && e._getNetWork({
                        url: c,
                        success: function(t) {
                            var e = t.data;
                            if (1 == e.result) {
                                var s = e.data.json.wechat;
                                wx.requestPayment({
                                    timeStamp: s.timeStamp,
                                    nonceStr: s.nonceStr,
                                    package: s.package,
                                    signType: "MD5",
                                    paySign: s.paySign,
                                    success: function(t) {
                                        wx.showToast({
                                            title: "充值成功",
                                            icon: "success",
                                            duration: 2e3,
                                            success: function() {
                                                wx.navigateBack({});
                                            },
                                            fail: function() {}
                                        });
                                    },
                                    fail: function(t) {
                                        console.log("qqqqqqqqq"), console.log(t), wx.showToast({
                                            title: "充值失败请稍后重试",
                                            icon: "success",
                                            duration: 2e3,
                                            success: function() {},
                                            fail: function() {}
                                        });
                                    }
                                });
                            }
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: "请求失败,请稍后重试",
                                icon: "success",
                                duration: 2e3,
                                success: function() {},
                                fail: function() {}
                            });
                        }
                    });
                }
            });
        }
    },
    withdraw: function(t) {
        var s = this.data.balance, n = t.detail.value.withdraw_value;
        if (0 != s.length) if (parseFloat(n) > parseFloat(s)) wx.showToast({
            title: "提现金额不能大于账户\b余额",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        }); else if (parseFloat(n) <= 0) wx.showToast({
            title: "提现金额不能小于0",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        }); else {
            var i = e.getNetAddresss("member/Balance/withdraw");
            i += "&trigger=post&money=" + n, e._getNetWork({
                url: i,
                success: function(t) {
                  if(t.data.result==1){
                    wx.showToast({
                      title: "提现成功",
                      icon: "success",
                      duration: 2e3,
                      success: function () {
                        wx.navigateBack({}) 
                      },
                      fail: function () { }
                    });
                  }else{
                    wx.showModal({
                      title: t.data.msg[0],
                      icon: "success",
                      duration: 2e3,
                      success: function () { },
                      fail: function () { }
                    });
                  }

                },
                fail: function(t) {
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
            title: "提现金额不能为空",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        });
    },
    transfer: function(t) {
        var s = (c = this).data.balance, n = t.detail.value.transfer_money, i = t.detail.value.transfer_id;
        if (0 != n.length && 0 != i.length) if (parseFloat(n) > parseFloat(s)) wx.showToast({
            title: "转账金额不能大于账户\b余额",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        }); else if (parseFloat(n) <= 0) wx.showToast({
            title: "转账金额不能小于0",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        }); else {
            var c = this;
            wx.getStorage({
                key: "openid",
                success: function(t) {
                  console.log(t);
                    c.setData({
                        openid: t.data
                    });
                }
            });
            var o = e.getNetAddresss("/member/Balance/transfer");
            o += "&yunbi=0&trigger=get&money=" + n + "&assigns=" + i + "&openid=" + c.data.openid, 
            e._getNetWork({
                url: o,
                success: function(t) {
                    wx.showToast({
                        title: "提现成功",
                        icon: "success",
                        duration: 2e3,
                        success: function() {
                            var e = t.data;
                            1 == e.result ? wx.navigateBack({}) : wx.showToast({
                                title: e.msg,
                                icon: "success",
                                duration: 2e3,
                                success: function() {},
                                fail: function() {}
                            });
                        },
                        fail: function() {}
                    });
                },
                fail: function(t) {
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
            title: "转账金额不能为空或受让人ID不能为空",
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        });
    },
    onLoad: function(t) {
        t.type, this.setData({
            type: t.type,
            balance: t.balance
        });
        var e = "";
        "recharge" == t.type ? e = "充值" : "withdraw" == t.type ? e = "提现" : "transfer" == t.type && (e = "转账"), 
        console.log(e), wx.setNavigationBarTitle({
            title: e
        });
    },
    onReady: function() {},
    onShow: function() {
        this.createOrder();
    },
    onHide: function() {},
    onUnload: function() {}
});
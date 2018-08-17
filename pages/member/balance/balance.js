var a = getApp();

Page({
    data: {
        balance: "",
        recharge: {
            url: "../balanceDetail/balanceDetail?type=recharge",
            imageUrl: "icon_recharge.png",
            name: "充值",
            title: "",
            bindtap: ""
        },
        withdraw: {
            url: "../balanceDetail/balanceDetail?type=withdraw",
            imageUrl: "icon_withdraw.png",
            name: "提现",
            title: "",
            bindtap: ""
        },
        transfer: {
            url: "../balanceDetail/balanceDetail?type=transfer&balance=345",
            imageUrl: "icon_transfer.png",
            name: "转账",
            title: "",
            bindtap: ""
        },
        rechargeLog: {
            url: "../balanceLog/balanceLog?type=rechargeLog",
            imageUrl: "icon_rechargeLog.png",
            name: "充值记录",
            title: "",
            bindtap: ""
        },
        withdrawLog: {
            url: "../balanceLog/balanceLog?type=withdrawLog",
            imageUrl: "icon_withdrawLog.png",
            name: "提现记录",
            title: "",
            bindtap: ""
        },
        transferLog: {
            url: "../balanceLog/balanceLog?type=transferLog",
            imageUrl: "icon_transferLog.png",
            name: "转账记录",
            title: "",
            bindtap: ""
        }
    },
    getBalance: function() {
        var e = a.getNetAddresss("member/Balance/getBalance"), n = this;
        a._getNetWork({
            url: e,
            success: function(a) {
                var e = a.data;
                1 == e.result ? n.setData({
                    balance: e.data.money,
                    "recharge.url": "../balanceDetail/balanceDetail?type=recharge&balance=" + e.data.money,
                    "withdraw.url": "../balanceDetail/balanceDetail?type=withdraw&balance=" + e.data.money,
                    "transfer.url": "../balanceDetail/balanceDetail?type=transfer&balance=" + e.data.money
                }) : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(a) {
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
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        this.getBalance();
    },
    onHide: function() {},
    onUnload: function() {}
});
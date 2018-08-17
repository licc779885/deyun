var a = getApp();
Page({
    data: {
        isCheckAll: !1,
        checkAll: !1,
        checkList: [],
        allCheckList: [],
        unAllCheckList: [],
        datasource: [],
        withdrawToWechat: 0,
        withdrawToAlipay: 0,
        totalwithdrawal: 0,
        poundage: 0,
        servicetax: 0,
        balance_special: !1,
        independent_special: 0,
        independent_poundage: 0,
        isAlipay: !1,
        alipay: {},
        isWechat: !1,
        wechat: {},
        isBalance: !1,
        balance: {},
        isManual: !1,
        manual: {},
        isChecked: 0
    },
    getWithdrawType: function() {
        var t = this;
        a._getNetWork({
            url: a.getNetAddresss("finance.income.get-income-withdraw-mode"),
            success: function(a) {
                if (200 == a.statusCode) {
                    var e = a.data;
                    console.log(e), 1 == e.result ? t.initWithdrawType(e.data) : t.net_fail(e.msg)
                } else t.net_fail("访问失败")
            },
            fail: function(a) {
                t.net_fail("访问失败")
            }
        })
    },
    initWithdrawType: function(a) {
        this.initAlipay(a), this.initWechat(a), this.initBalance(a), this.initManual(a)
    },
    initAlipay: function(a) {
        null != a.alipay && void 0 != a.alipay && "" != a.alipay && this.setData({
            isAlipay: !0,
            alipay: a.alipay
        })
    },
    initWechat: function(a) {
        null != a.wechat && void 0 != a.wechat && "" != a.wechat && this.setData({
            isWechat: !0,
            wechat: a.wechat
        })
    },
    initBalance: function(a) {
        null != a.balance && void 0 != a.balance && "" != a.balance && this.setData({
            isBalance: !0,
            balance: a.balance
        })
    },
    initManual: function(a) {
        null != a.manual && void 0 != a.manual && "" != a.manual && this.setData({
            isManual: !0,
            manual: a.manual
        })
    },
    getData: function() {
        var t = this;
        a._getNetWork({
            url: a.getNetAddresss("finance.income-withdraw.get-withdraw"),
            success: function(a) {
                if (200 == a.statusCode) {
                    var e = a.data;
                    console.info(e), 1 == e.result ? t.setData({
                        balance_special: e.data.setting.balance_special,
                        datasource: e.data.data
                    }) : t.net_fail(e.msg)
                } else t.net_fail("访问失败")
            },
            fail: function(a) {
                t.net_fail("访问失败")
            }
        })
    },
    countTotalPrice: function() {
        this.setData({
            totalwithdrawal: 0,
            poundage: 0,
            servicetax: 0
        });
        for (var a = 0; a < this.data.datasource.length; a++) console.log("TotalPrice:::", this.data.datasource[a].checked), 1 == this.data.datasource[a].checked && this.setData({
            totalwithdrawal: this.floatAdd(this.data.totalwithdrawal, this.data.datasource[a].income),
            poundage: this.floatAdd(this.data.poundage, this.data.datasource[a].poundage),
            servicetax: this.floatAdd(this.data.servicetax, this.data.datasource[a].servicetax)
        }), this.data.balance_special && this.setData({
            independent_special: this.floatAdd(this.data.independent_special, this.data.datasource[a].special_service_tax),
            independent_poundage: this.floatAdd(this.data.independent_poundage, this.data.datasource[a].special_poundage)
        });
        this.setData({
            totalwithdrawal: Number(this.data.totalwithdrawal.toString().match(/^\d+(?:\.\d{0,2})?/)),
            poundage: Number(this.data.poundage.toString().match(/^\d+(?:\.\d{0,2})?/)),
            servicetax: Number(this.data.servicetax.toString().match(/^\d+(?:\.\d{0,2})?/))
        }), this.data.balance_special && this.setData({
            independent_special: Number(this.data.independent_special.toString().match(/^\d+(?:\.\d{0,2})?/)),
            independent_poundage: Number(this.data.independent_poundage.toString().match(/^\d+(?:\.\d{0,2})?/))
        })
    },
    floatAdd: function(a, t) {
        var e, i, n;
        try {
            e = a.split(".")[1].length
        } catch (a) {
            e = 0
        }
        try {
            i = t.split(".")[1].length
        } catch (a) {
            i = 0
        }
        return n = Math.pow(10, Math.max(e, i)), (a * n + t * n) / n
    },
    floatSub: function(a, t) {
        var e, i, n, s;
        try {
            e = a.split(".")[1].length
        } catch (a) {
            e = 0
        }
        try {
            i = t.split(".")[1].length
        } catch (a) {
            i = 0
        }
        return n = Math.pow(10, Math.max(e, i)), s = (e = i) ? e : i, ((a * n - t * n) / n).toFixed(s)
    },
    toRecord: function() {
        this.$router.push(this.fun.getUrl("presentationRecord"))
    },
    withdrawToBalance: function(t) {
        if (parseFloat(this.data.totalwithdrawal) <= 0 || null == this.data.totalwithdrawal) wx.showToast({
            title: "提现金额不能为0",
            icon: "success",
            duration: 2e3,
            mask: !0
        });
        else {
            for (var e = [], i = 0; i < this.data.datasource.length; i++) 1 == this.data.datasource[i].checked && e.push(this.data.datasource[i]);
            if (e.length > 0) {
                var n = {
                    total: {
                        amounts: this.data.totalwithdrawal,
                        poundage: this.data.poundage,
                        pay_way: t.currentTarget.dataset.value
                    },
                    withdrawal: e
                };
                console.log("Submit:::", n);
                var s = this;
                a._postNetWork({
                    url: a.getNetAddresss("finance.income.save-withdraw"),
                    data: {
                        data: n
                    },
                    success: function(a) {
                        if (200 == a.statusCode) {
                            var t = a.data;
                            1 == t.result ? wx.showToast({
                                title: t.msg,
                                icon: "success",
                                duration: 2e3
                            }) : s.net_fail(t.msg)
                        }
                    },
                    fail: function(a) {}
                })
            } else wx.showToast({
                title: response.msg,
                icon: "success",
                duration: 2e3
            })
        }
    },
    checkboxChange: function(a) {
        if (void 0 != a.detail.value[0]) for (var t = this.data.datasource, e = 0; e < t.length; e++) t[e].can && (t[e].checked = 1);
        else for (var t = this.data.datasource, e = 0; e < t.length; e++) t[e].can && (t[e].checked = !1);
        this.setData({
            datasource: t
        }), this.countTotalPrice()
    },
    allSelect: function(a) {
        if (void 0 != a.detail.value[0]) for (var t = this.data.datasource, e = 0; e < t.length; e++) t[e].can && (t[e].checked = 1);
        else for (var t = this.data.datasource, e = 0; e < t.length; e++) t[e].can && (t[e].checked = !1);
        this.setData({
            datasource: t
        }), console.log("ds:::", t), this.countTotalPrice(), console.log("AllSelect:::", a.detail.value[0])
    },
    onLoad: function(a) {
        this.setData({
            checkAll: !1,
            checkList: [],
            allCheckList: [],
            unAllCheckList: [],
            datasource: [],
            totalwithdrawal: "0.00",
            poundage: "0.00",
            balance_special: !1,
            independent_special: "0.00",
            independent_poundage: "0.00"
        }), this.getData(), this.getWithdrawType()
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
var e = getApp();

Page({
    data: {
        selectAddressData: [],
        provinceData: [],
        cityData: [],
        districtData: [],
        addressData: [],
        openDateLw: !1,
        addressIndex: 0,
        pickerValue: [ 0, 0, 0 ],
        color:'#a4de91',
        flag:1,
        selectTitle: {
            name: "请选择",
            id: ""
        },
        userData: "",
        mobile: "",
        codeDis: !1,
        phoneCode: "",
    },
    onLoad: function(e) {
        this.getNowFormatDate();
        this.setData({
            type: e.type,
            value: e.value
        }), "birthday" == this.data.type && this.setData({
            date: this.data.value
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    getNowFormatDate: function() {
        var e = new Date(), a = e.getFullYear(), t = e.getMonth() + 1, n = e.getDate();
        return t >= 1 && t <= 9 && (t = "0" + t), n >= 0 && n <= 9 && (n = "0" + n), a + "-" + t + "-" + n;
    },
    formSubmitUserData: function(a) {
        var t = this, n = e.getNetAddresss("member/SentCode/bindmobile"), l = t.data.type, i = "";
        "nickname" == l && (0 == a.detail.value.nickname.length ? i = "\b昵称能为空！" : n += "{nickname:" + a.detail.value.nickname + "}"),
        "mobile" == l && (0 == a.detail.value.mobile.length ? i = "手机号码不能为空！" : a.detail.value.mobile.length < 11 ? i = "手机号码太短！" : 0 == a.detail.value.code.length ? i = "请输入验证码" : /^1[34578]\d{9}$/.test(a.detail.value.mobile) ? (n += "&mobile=" + a.detail.value.mobile,
            n += "&code=" + a.detail.value.code) : i = "手机号码有误，请重填"),
        "realname" == l && (0 == a.detail.value.realname.length ? i = "姓名不能为空！" : a.detail.value.realname.length < 2 ? i = "姓名太短！" : n += "{realname:" + a.detail.value.realname + "}"),
        "weixin" == l && (0 == a.detail.value.weixin.length ? i = "\b微信不能为空！" : n += "{weixin:" + a.detail.value.weixin + "}"),
        "alipay" == l && (0 == a.detail.value.alipay.length ? i = "\b支付宝账号不能为空！" : n += "{alipay:" + a.detail.value.alipay + "}"),
        "alipayname" == l && (0 == a.detail.value.alipayname.length ? i = "\b支付宝账号姓名不能为空！" : n += "{alipayname:" + a.detail.value.alipayname + "}"),
        "gender" == l && (0 == a.detail.value.gender.length ? i = "\b性别不能为空！" : n += "{gender:" + a.detail.value.gender + "}"),
        "address" == l && (0 == a.detail.value.address.length ? i = "\b地址不能为空！" : n += "{province:1,city:3,area:4}"),
        "birthday" == l && ("" == t.data.date ? i = "\b生日不能为空！" : n += "{birthday:" + t.data.date + "}"),
            "" == i ? e._getNetWork({
                url: n,
                success: function(e) {
                    var a = e.data;
                    console.log("return:", a), 1 == a.result ? wx.showModal({
                        title: "提示",
                        content: "同步成功!",
                        showCancel: !1,
                        success: function(e) {
                          console.log(1);
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
            }) : wx.showModal({
                title: "提示",
                content: i,
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            });
    },
    phoneinput: function(e) {
        var a = e.detail.value;
        console.log(a), this.setData({
            mobile: a
        });
    },
    changeCode: function() {
        var a = this, t = this.data.mobile;
        if (11 != t.length || isNaN(t)) return wx.showModal({
            title: "请输入有效的手机号码",
            showCancel: !1,
            icon: "loading"
        }), void setTimeout(function() {
            wx.hideToast();
        }, 2000);
        this.setData({
            codeDis: !0,
        });
        if(!a.data.flag){
          return;
        }
        var n = e.getNetAddresss("member/SentCode/index");
        n += "&mobile=" + this.data.mobile, e._getNetWork({
            url: n,
            success: function(e) {
                var t = e.data;
                if ( "0" == t.result) {
                    a.setData({
                        codeDis: !1
                    });
                    wx.showModal({
                        content: t.msg,
                        showCancel: !1,
                        success: function (e) {
                            e.confirm && console.log("用户点击确定");
                        }
                    })
                } else {
                  wx.showToast({
                    title: '验证码已发送',
                    icon:'success',
                  })
                    a.setData({
                        phoneCode: 60,
                        color: 'gray',
                        flag:0,
                    });
                    var n = setInterval(function() {
                        var e = a.data.phoneCode;
                        e--, a.setData({
                            phoneCode: e
                        }), 0 == e && (clearInterval(n), a.setData({
                            phoneCode: "",
                            flag: !0,
                            color:'#a4de91'
                        }));
                    }, 1e3);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
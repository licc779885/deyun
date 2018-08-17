var a = getApp();

Page({
    data: {
        nickname: {
            url: "../userSetData/userSetData?type=nickname",
            imageUrl: "icon_erji.png",
            name: "昵称",
            title: "",
            bindtap: ""
        },
        mobile: {
            url: "../userSetData/userSetData?type=mobile",
            imageUrl: "icon_erji.png",
            name: "手机号",
            title: "",
            bindtap: ""
        },
        weixin: {
            url: "../userSetData/userSetData?type=weixin",
            imageUrl: "icon_erji.png",
            name: "微信号",
            title: "",
            bindtap: ""
        },
        alipay: {
            url: "../userSetData/userSetData?type=alipay",
            imageUrl: "icon_erji.png",
            name: "支付宝账号",
            title: "",
            bindtap: ""
        },
        alipayname: {
            url: "../userSetData/userSetData?type=alipayname",
            imageUrl: "icon_erji.png",
            name: "账号姓名",
            title: "",
            bindtap: ""
        },
        realname: {
            url: "../userSetData/userSetData?type=realname",
            imageUrl: "icon_erji.png",
            name: "真实姓名",
            title: "",
            bindtap: ""
        },
        gender: {
            url: "../userSetData/userSetData?type=gender",
            imageUrl: "icon_erji.png",
            name: "性别",
            title: "",
            bindtap: ""
        },
        address: {
            url: "../userSetData/userSetData?type=address",
            imageUrl: "icon_erji.png",
            name: "所在城市",
            title: "",
            bindtap: ""
        },
        birthday: {
            url: "../userSetData/userSetData?type=birthday",
            imageUrl: "icon_erji.png",
            name: "出生日期",
            title: "",
            bindtap: ""
        }
    },
    onLoad: function(a) {},
    _getData: function() {
        var e = this;
        a._getNetWork({
            url: a.getNetAddresss("member/Account/info"),
            success: function(a) {
                var t = a.data;
                if (1 == t.result) {
                    wx.setStorage({
                        key: "userSetData",
                        data: t.data
                    }), console.log(t.data);
                    var i = "" == t.data.nickname ? "未设置" : t.data.nickname, r = "" == t.data.mobile ? "未设置" : t.data.mobile, n = "" == t.data.weixin ? "未设置" : t.data.weixin, l = "" == t.data.alipay ? "未设置" : t.data.alipay, u = "" == t.data.alipayname ? "未设置" : t.data.alipayname, d = "" == t.data.realname ? "未设置" : t.data.realname, s = "" == t.data.gender ? "未设置" : t.data.gender, p = "" == t.data.province ? "未设置" : t.data.province + t.data.city + t.data.area, m = "" == t.data.birthday ? "未设置" : t.data.birthyear + t.data.birthmonth + t.data.birthday;
                    e.setData({
                        "nickname.title": i,
                        "nickname.url": "../userSetData/userSetData?type=nickname&value=" + i,
                        "mobile.title": r,
                        "mobile.url": "../userSetData/userSetData?type=mobile&value=" + r,
                        "weixin.title": n,
                        "weixin.url": "../userSetData/userSetData?type=weixin&value=" + n,
                        "alipay.title": l,
                        "alipay.url": "../userSetData/userSetData?type=alipay&value=" + l,
                        "alipayname.title": u,
                        "alipayname.url": "../userSetData/userSetData?type=alipayname&value=" + u,
                        "realname.title": d,
                        "realname.url": "../userSetData/userSetData?type=realname&value=" + d,
                        "gender.title": s,
                        "gender.url": "../userSetData/userSetData?type=gender&value=" + s,
                        "address.title": p,
                        "address.url": "../userSetData/userSetData?type=address&value=" + p,
                        "birthday.title": m,
                        "birthday.url": "../userSetData/userSetData?type=birthday&value=" + m
                    });
                } else wx.showToast({
                    title: "数据错误",
                    icon: "loading",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function(a) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        this._getData();
    },
    onHide: function() {},
    onUnload: function() {}
});
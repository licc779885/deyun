var o, s = getApp();

Page({
    data: {
        loadingState: !0,
        commission2_isShow: !1,
        commission1_isShow: !1,
        check_is_show: !1,
        apply_is_show: !1,
        become1_is_show: !1,
        become2_is_show: !1,
        become3_is_show: !1,
        become4_is_show: !1,
        commission_level: "",
        agenttime: "",
        commission_total: "0.00",
        commission_ok: "0.00",
        can_withdraw: !1,
        commissionMenus: [],
        mobile: "",
        realname: "",
        centent:"",
        weixin: "",
        json_centent_title: "",
        json_centent_desc: "",
        good_id: "",
        json_footer_title: "",
        json_footer_vshop: "",
        json_footer_vshop_desc: "",
        json_footer_commission: "",
        json_footer_vshop_commission: "",
        json_footer_centent: "",
        menuModes: [ "icon_yongjin.png", "icon_yongjin.png", "icon_order_commission.png", "icon_yongjindetail.png", "icon_team.png", "icon_customer.png", "icon_erweima.png", "icon_yongjin.png" ],
        commissionMenuItemUrls: [ "", "distribution_commission_state/distribution_commission_state", "order_commission/order_commission", "detail_commission/detail_commission", "team/team", "customer/customer", "wantDistribute/wantDistribute" ]
    },
    getCommissionInfoBase: function() {
        var e = this;
        s._getNetWork({
            showToastIn: !1,
            url: s.getNetAddresss("commission/Register"),
            success: function(s) {
                if (console.log(s), 200 == s.statusCode) {
                    var t = s.data;
                    console.log(t), 1 == t.result ? (console.log(t.data),
                        o = t.data.json.set.become, //
                    e.userInfoLevel(t.data.json.set.levelname),
                        e.userInfoView(t.data.json.member),
                    e.setBaseData(t.data.json.member),
                        e.setData({
                        loadingState: !1,
                        centent: t.data.json.centent,
                    })) : e.net_fail(t.msg);
                } else e.net_fail("访问失败");
            },
            fail: function(o) {
                e.net_fail("访问失败");
            }
        });
    },
    getCommissionInfo: function() {
        var o = this;
        s._getNetWork({
            showToastIn: !1,
            url: s.getNetAddresss("commission/Index"),
            success: function(s) {
                if (console.log(s), 200 == s.statusCode) {
                    var e = s.data;
                    if (console.log(e), 1 == e.result) {
                        console.log(e.data);
                        var t = e.data;
                        o.commissionInfoView1(t), o.commissionInfoView2(t.block_list);
                    } else o.net_fail(e.msg);
                } else o.net_fail("访问失败");
            },
            fail: function(s) {
                o.net_fail("访问失败");
            }
        });
    },
    getCommissionInfo2: function() {
        var o = this;
        s._getNetWork({
            showToastIn: !1,
            url: s.getNetAddresss("commission/Register"),
            success: function(s) {
                if (console.log(s), 200 == s.statusCode) {
                    var e = s.data;
                    console.log(e), 1 == e.result ? (console.log(e.data), o.setCommissionInfo2(e.data), 
                    o.setFooterViewData(e.data)) : o.net_fail(e.msg);
                } else o.net_fail("访问失败");
            },
            fail: function(s) {
                o.net_fail("访问失败");
            }
        });
    },
    setCommissionInfo2: function(o) {
        var s = this, e = o.json.set.become;
        1 == e ? s.setData({
            mobile: o.json.member.mobile,
            json_centent_title: o.json.centent.title,
            json_centent_desc: o.json.centent.desc
        }) : 2 == e ? s.setData({
            json_centent: o.json.centent,
            json_button: o.json.button
        }) : 3 == e ? s.setData({
            json_centent: o.json.centent,
            json_button: o.json.button
        }) : 4 == e && s.setData({
            json_centent: o.json.centent,
            json_button: o.json.button,
            good_id: o.json.goods.id
        });
    },
    setFooterViewData: function(o) {
        this.setData({
            json_footer_title: o.json.footer.title,
            json_footer_vshop: o.json.footer.vshop,
            json_footer_vshop_desc: o.json.footer.vshop_desc,
            json_footer_commission: o.json.footer.commission,
            json_footer_vshop_commission: o.json.footer.vshop_commission,
            json_footer_centent: o.json.footer.centent
        });
    },
    nagivatetoP:function(e){
        wx.navigateTo({
          url: this.data.commissionMenuItemUrls[e.currentTarget.dataset.id],
        })
    },
    bind_realname: function(o) {
        this.setData({
            realname: o.detail.value
        });
    },
    bind_mobile: function(o) {
        this.setData({
            mobile: o.detail.value
        });
    },
    bind_weixin: function(o) {
        this.setData({
            weixin: o.detail.value
        });
    },
    applyCommission: function() {
        var o = this, e = o.data.realname, t = o.data.mobile, n = o.data.weixin;
        "" != e && null != e && void 0 != e ? "" != t && null != t && void 0 != t ? /^1[34578]\d{9}$/.test(t) ? "" != n && null != n && void 0 != n ? s._getNetWork({
            url: s.getNetAddresss("commission/Register/post") + "&mobile=" + t + "&realname=" + e + "&weixin=" + n,
            success: function(s) {
                if (console.log(s), 200 == s.statusCode) {
                    var e = s.data;
                    console.log(e), 1 == e.result ? (console.log(e.data), o.setData({
                        check_is_show: !0,
                        apply_is_show: !1
                    })) : o.net_fail(e.msg);
                } else o.net_fail("访问失败");
            },
            fail: function(s) {
                o.net_fail("访问失败");
            }
        }) : o.net_fail("请输入微信号") : o.net_fail("手机号码有误，请重填") : o.net_fail("请输入手机号") : o.net_fail("请输入真实姓名");
    },
    become2Btn: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    goIncome:function (){
        wx.navigateTo({url:"/pages/commission/detail_commission/detail_commission"});
    },
    become3Btn: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    become4Btn: function() {
        var o = this;
        wx.navigateTo({
            url: "../detail/detail?id=" + o.data.good_id
        });
    },
    commissionInfoView1: function(o) {
      console.log(o);
        this.setData({
            agenttime: "加入时间:" + o.agenttime,
            commission_total: o.commission_total,
            commission_ok: o.commission_ok,
            can_withdraw: o.can_withdraw?o.can_withdraw:'0.00',
        });
    },
    commissionInfoView2: function(o) {
        this.setData({
            commissionMenus: o
        });
    },
    setBaseData: function(s) {
        var e = this;
        console.log(s), console.log(o),
            1 == s.isagent && 1 == s.status ? 0 == s.agentblack ? (e.setData({
            commission2_isShow: !0,
            commission1_isShow: !1 //
        }), e.userInfoView(s), e.getCommissionInfo()) : s.agentblack : 1 == s.isagent && 0 == s.status ? (e.setData({
            commission2_isShow: !1,
            commission1_isShow: !0
        }), 1 == o ? e.setData({
            become1_is_show: !0,
            become_1_info_2 :'',
            check_is_show: !0,
            apply_is_show: !1,
            become2_is_show: !1,
            become3_is_show: !1,
            become4_is_show: !1
        }) : 2 == o ? e.setData({
            become1_is_show: !1,
            become2_is_show: !0,
            become3_is_show: !1,
            become4_is_show: !1
        }) : 3 == o ? e.setData({
            become1_is_show: !1,
            become2_is_show: !1,
            become3_is_show: !0,
            become4_is_show: !1
        }) : 4 == o && e.setData({
            become1_is_show: !1,
            become2_is_show: !1,
            become3_is_show: !1,
            become4_is_show: !0
        }), e.getCommissionInfo2()) : 0 == s.isagent && (e.setData({
            commission2_isShow: !1,
            commission1_isShow: !0
        }), 1 == o ? e.setData({
            become1_is_show: !0,
            check_is_show: !1,
            apply_is_show: !0,
            become2_is_show: !1,
            become3_is_show: !1,
            become4_is_show: !1
        }) : 2 == o ? e.setData({
            become1_is_show: !1,
            become2_is_show: !0,
            become3_is_show: !1,
            become4_is_show: !1
        }) : 3 == o ? e.setData({
            become1_is_show: !1,
            become2_is_show: !1,
            become3_is_show: !0,
            become4_is_show: !1
        }) : 4 == o && e.setData({
            become1_is_show: !1,
            become2_is_show: !1,
            become3_is_show: !1,
            become4_is_show: !0
        }), e.getCommissionInfo2());
        console.log(this.data);
    },
    userInfoLevel: function(o) {
        this.setData({
            commission_level: "【" + o + "】"
        });
    },
    userInfoView: function(o) {
        var s = this;
        wx.getStorage({
            key: "userInfo",
            success: function(o) {
                s.setData({
                    userInfo: o.data.userInfo,
                });
            },
            fail: function(o) {}
        });
    },
    net_fail: function(o) {
        wx.showToast({
            title: o,
            icon: "success",
            duration: 2e3
        });
    },
    btnClicked: function(o) {
        o.currentTarget.dataset.state ? (console.log("ok"), wx.navigateTo({
            url: "balance/balance"
        })) : console.log("!ok");
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {
        this.getCommissionInfoBase();
    },
    onHide: function() {},
    onUnload: function() {}
});
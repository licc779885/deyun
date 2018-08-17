var o = getApp();

Page({
    data: {
        cansettle: !1,
        json_set_texts_commission_ok: "可提现",
        json_member_commission_ok: "0.00",
        goToCommissonDetail: "detail_commission",
        json_set_texts_commission_pay: "成功提现",
        json_member_commission_pay: "0.00",
        json_set_texts_commission_total: "累计佣金",
        json_member_commission_total: "0.00",
        json_set_texts_commission: "佣金",
        json_member_commission_apply: "0.00",
        json_set_texts_commission_apply: "已申请佣金",
        json_set_texts_commission_check: "待打款佣金",
        json_member_commission_check: "0.00",
        json_set_settledays_show: !1,
        json_set_texts_commission_lock: "结算期",
        json_member_commission_lock: "0.00",
        json_content_settledays_isShow: !1,
        json_content_withdraw_isShow: !1,
        json_content_consume_withdraw_isShow: !1,
        json_content_proportion_money_isShow: !1,
        json_content_settledays: "",
        json_content_withdraw: "",
        json_content_consume_withdraw: "",
        json_content_proportion_money: ""
    },
    _getData: function() {
        var s = this;
        o._getNetWork({
            url: o.getNetAddresss("commission/Withdraw"),
            success: function(o) {
                if (console.log(o), 200 == o.statusCode) {
                    var t = o.data;
                    console.log(t), 1 == t.result ? (console.log(t.data), s.setDataView(t.data)) : s.net_fail(t.msg);
                } else s.net_fail("访问失败");
            },
            fail: function(o) {
                s.net_fail("访问失败");
            }
        });
    },
    setDataView: function(o) {
        console.log(o);
        var s = this;
        s.setData({
            cansettle: o.json.cansettle,
            json_set_texts_commission_ok: o.json.set.texts.commission_ok,
            json_member_commission_ok: o.json.member.commission_ok,
            json_set_texts_commission_pay: o.json.set.texts.commission_pay,
            json_member_commission_pay: o.json.member.commission_pay,
            json_set_texts_commission_total: o.json.set.texts.commission_total,
            json_member_commission_total: o.json.member.commission_total,
            json_set_texts_commission: o.json.set.texts.commission,
            json_member_commission_apply: o.json.member.commission_apply,
            json_set_texts_commission_apply: o.json.set.texts.commission_apply,
            json_set_texts_commission_check: o.json.set.texts.commission_check,
            json_member_commission_check: o.json.member.commission_check
        }), o.json.set.settledays > 0 ? (s.setData({
            json_set_settledays_show: !0,
            json_set_texts_commission_lock: o.json.set.texts.commission_lock,
            json_member_commission_lock: o.json.member.commission_lock,
            json_set_texts_commission: o.json.set.texts.commission
        }), $scope.json_set_settledays_show = !0, $scope.json_set_texts_commission_lock = o.json.set.texts.commission_lock, 
        $scope.json_member_commission_lock = o.json.member.commission_lock, $scope.json_set_texts_commission = o.json.set.texts.commission) : s.setData({
            json_set_settledays_show: !1
        }), null == o.json.content.settledays || "" == o.json.content.settledays || void 0 == o.json.content.settledays ? s.setData({
            json_content_settledays_isShow: !1
        }) : s.setData({
            json_content_settledays_isShow: !0,
            json_content_settledays: o.json.content.settledays
        }), null == o.json.content.withdraw || "" == o.json.content.withdraw || void 0 == o.json.content.withdraw ? s.setData({
            json_content_proportion_money_isShow: !1
        }) : s.setData({
            json_content_proportion_money_isShow: !0,
            json_content_proportion_money: o.json.content.withdraw
        }), null == o.json.content.consume_withdraw || "" == o.json.content.consume_withdraw || void 0 == o.json.content.consume_withdraw ? s.setData({
            json_content_consume_withdraw_isShow: !1
        }) : s.setData({
            json_content_consume_withdraw_isShow: !0,
            json_content_consume_withdraw: o.json.content.consume_withdraw
        }), null == o.json.content.proportion_moneyk || "" == o.json.content.proportion_moneyk || void 0 == o.json.content.proportion_moneyk ? s.setData({
            json_content_consume_withdraw_isShow: !1
        }) : s.setData({
            json_content_consume_withdraw_isShow: !0,
            json_content_consume_withdraw: o.json.content.proportion_moneyk
        });
    },
    btnClicked: function(o) {
        o.currentTarget.dataset.state ? (console.log("ok"), wx.navigateTo({
          url: "/pages/commission/balance/balance"
        })) : console.log("!ok");
    },
    onLoad: function(o) {
        this._getData();
    },
    net_fail: function(o) {
        wx.showToast({
            title: o,
            icon: "success",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
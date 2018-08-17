var a = getApp(), t = "1", s = 1;

Page({
    data: {
        my_team_class_a_active: !0,
        my_team_class_b_active: !1,
        my_team_class_c_active: !1,
        teams: [],
        className1: "一级",
        className2: "二级",
        className3: "三级",
        json_set_texts_commission_team: "TA的佣金/成员"
    },
    my_team_class_a_clicked: function() {
        var a = this;
        a.data.my_team_class_a_active || (t = "1", a.setTabView(0), console.log("my_team_class_a_clicked"));
    },
    my_team_class_b_clicked: function() {
        var a = this;
        a.data.my_team_class_b_active || (t = "2", a.setTabView(1), console.log("my_team_class_b_clicked"));
    },
    my_team_class_c_clicked: function() {
        var a = this;
        a.data.my_team_class_c_active || (t = "3", a.setTabView(2), console.log("my_team_class_c_clicked"));
    },
    setTabView: function(a) {
        var t = this;
        t.setData({
            teams: []
        }), s = 1, 0 == a ? t.setData({
            my_team_class_a_active: !0,
            my_team_class_b_active: !1,
            my_team_class_c_active: !1
        }) : 1 == a ? t.setData({
            my_team_class_a_active: !1,
            my_team_class_b_active: !0,
            my_team_class_c_active: !1
        }) : 2 == a && t.setData({
            my_team_class_a_active: !1,
            my_team_class_b_active: !1,
            my_team_class_c_active: !0
        }), this._getData();
    },
    _getData: function() {
        var e = this;
        a._getNetWork({
            url: a.getNetAddresss("commission/Team") + "&page=" + s + "&level=" + t,
            success: function(a) {
                if (console.log(a), 200 == a.statusCode) {
                    var t = a.data;
                    console.log(t), 1 == t.result ? (console.log(t.data), e.setDataView(t.data), t.data.json.list.length, 
                    1 == s && e.setData({
                        teams: t.data.json.list
                    })) : e.net_fail(t.msg);
                } else e.net_fail("访问失败");
            },
            fail: function(a) {
                e.net_fail("访问失败");
            }
        });
    },
    setDataView: function(a) {
        this.setData({
            className1: a.json.set.texts.c1,
            className2: a.json.set.texts.c2,
            className3: a.json.set.texts.c3,
            json_set_texts_commission_team: a.json.set.texts.commission_team
        });
    },
    onLoad: function(a) {
        this._getData();
    },
    net_fail: function(a) {
        wx.showToast({
            title: a,
            icon: "success",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
var o = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {}
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../userSet/userSet"
        });
    },
    onLoad: function() {
        console.log("onLoad");
        var e = this;
        o.getUserInfo(function(o) {
            e.setData({
                userInfo: o
            });
        });
    },
    onPullDownRefresh: function() {
        console.log("member下拉了"), setTimeout(function() {
            wx.stopPullDownRefresh({
                complete: function(o) {
                    console.log(o, new Date());
                }
            }), console.log("member拉完了");
        }, 1e3);
    }
});
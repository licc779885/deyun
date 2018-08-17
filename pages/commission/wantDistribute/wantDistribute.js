var t, e = getApp();

Page({
    data: {
        src_image: "",
        json_share_title: "",
        contents: [],
        json_desc: ""
    },
    _getData: function() {
        var n = this;
        e._getNetWork({
            url: e.getNetAddresss("commission/Shares") + "&type=app",
            success: function(e) {
                if (console.log(e), 200 == e.statusCode) {
                    var s = e.data;
                    t = s.data.json.share, console.log(s), 1 == s.result ? (console.log(s.data), n.setDataView(s.data)) : n.net_fail(s.msg);
                } else n.net_fail("访问失败");
            },
            fail: function(t) {
                n.net_fail("访问失败");
            }
        });
    },
    setDataView: function(t) {
        this.setData({
            src_image: t.json.img,
            json_share_title: t.json.share_title,
            contents: t.json.content,
            json_desc: t.json.desc
        });
    },
    onShareAppMessage: function() {
        return {
            title: t.title,
            desc: t.content,
            path: t.webUrl
        };
    },
    onLoad: function(t) {
        this._getData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
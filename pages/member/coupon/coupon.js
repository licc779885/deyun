var t = getApp();

Page({
    data: {
        state: 0,
        couponState: "wait",
        dataList: ""
    },
    onLoad: function(t) {
        this._getData();
    },
    qhType: function(t) {
        var a = t.currentTarget.dataset.state;
        this.setData({
            couponState: a,
            state: 0
        }), this._getData();
    },
    _getData: function() {
        var a = this, o = t.getNetAddresss("coupon/My");
        console.log(a.data.couponState), "wait" == a.data.couponState ? console.log("未使用") : "used" == a.data.couponState ? (o += "&used=1", 
        console.log("已使用")) : "past" == a.data.couponState && (o += "&past=1", console.log("已过期")), 
        t._getNetWork({
            showToastIn: !1,
            url: o,
            success: function(t) {
                //console.log(t.data.data.list);
                if(t.data.result==0){
                    a.setData({state:1});
                    return
                }else{
                    var o = 1;
                    t.data.data.list.length > 0 && (o = 2), a.setData({
                        dataList: t.data.data.list,
                        state: o
                    });
                }

            },
            fail: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});
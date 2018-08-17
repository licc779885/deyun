var t = getApp();

Page({
    data: {
        type: "null",
        chargeData: [],
        withDrawData: [],
        transferData: [],
        getTransferData: [],
        searchLoading:0,
        searchLoadingComplete:1,
        hasMoreData:1,
        searchPageNum:1,
    },
    onLoad: function(t) {
        t.type, this.setData({
            type: t.type
        });
        var e = this, a = "";
        "rechargeLog" == t.type ? (a = "充值记录", e.getChargeLog(1)) : "withdrawLog" == t.type ? (a = "提现记录", 
        e.getWithDrawLog(1)) : "transferLog" == t.type && (a = "转账记录", e.getTransferLog(1)), 
        console.log(a), wx.setNavigationBarTitle({
            title: a
        });
    },
    getChargeLog: function(page) {
        var e = t.getNetAddresss("member/Log&type=0&page="+page), a = this;
        t._getNetWork({
            url: e,
            success: function(t) {
                var e = t.data;
                1 == e.result ? a.setData({
                  chargeData: a.data.chargeData ? a.data.chargeData.concat(e.data.json.list) :e.data.json.list,
                  hasMoreData: e.data.json.total <= e.data.json.pagesize*page ? 0 : 1,
                  searchLoading: 0,
                  searchLoadingComplete: 1,
                }) : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {
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
    getWithDrawLog: function(page) {
        var e = t.getNetAddresss("member/Log&type=1&page="+page), a = this;
        t._getNetWork({
            url: e,
            success: function(t) {
                var e = t.data;
                1 == e.result ? a.setData({
                  withDrawData:a.data.withDrawData?a.data.withDrawData.concat(e.data.json.list):e.data.json.list,
                  hasMoreData: e.data.json.total <= e.data.json.pagesize*page?0:1
                }) : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {
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
    getTransferLog: function(page) {
        var a = t.getNetAddresss("member/Transferlog&type=1&page=" + page), s = this;
        t._getNetWork({
            url: a,
            success: function(t) {
                var a = t.data;
                 1 == a.result ?s.setData({
                  transferData:s.data.transferData?s.data.transferData.concat(a.data.json.list):a.data.json.list,
                  hasMoreData: a.data.json.total <= a.data.json.pagesize*page ? 0 : 1
                }) : wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {
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
    switchToTransfer: function(t) {
        var e = this;
        e.setData({
            type: "transferLog"
        }), wx.setNavigationBarTitle({
            title: "转让记录"
        }), e.getTransferLog(1);
    },
    switchToGetTransfer: function(t) {
        var e = this;
        e.setData({
            type: "gettransferLog"
        }), wx.setNavigationBarTitle({
            title: "受让记录"
        }), e.getTransferLog(0);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
      //滚动到底部触发事件  
    onReachBottom: function () {
      let that = this;
      if (!that.data.searchLoading && that.data.searchLoadingComplete && that.data.hasMoreData) {
        that.setData({
          searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
          searchLoading: 1,  //触发到上拉事件，把isFromSearch设为为false  
          searchLoadingComplete:0,
        });
        that.fetchSearchList();
      }
    } ,
    fetchSearchList:function(){
      var e=this,logtype = e.data.type,page=e.data.searchPageNum,a = "";
      "rechargeLog" == logtype ? (a = "充值记录", e.getChargeLog(page)) : "withdrawLog" == logtype ? (a = "提现记录",
        e.getWithDrawLog(page)) : "transferLog" == logtype && (a = "转账记录", e.getTransferLog(page)),
            console.log(a), wx.setNavigationBarTitle({
            title: a
        });
    }
});
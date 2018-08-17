var t = getApp();

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
        selectTitle: {
            name: "请选择",
            id: ""
        },
        userData: ""
    },
    _getData: function() {
        var a = this, e = a.data.id;
        t._getNetWork({
            url: t.getNetAddresss("address/Display"),
            success: function(t) {
                var s = t.data;
                if (1 == s.result) {
                    for (var i = 0; i < s.data.list.length; i++) s.data.list[i].id == e && (console.log("user", s.data.list[i]), 
                    a.setData({
                        userData: s.data.list[i],
                        "addressData[0].name": s.data.list[i].province,
                        "addressData[1].name": s.data.list[i].city,
                        "addressData[2].name": s.data.list[i].area
                    }));
                    console.log("收货地址列表", s.data.list);
                } else wx.showToast({
                    title: "数据错误",
                    icon: "success",
                    duration: 2e3,
                    success: function() {},
                    fail: function() {}
                });
            },
            fail: function(t) {}
        });
    },
    onLoad: function(t) {
        this._newPage(t);
    },
    _newPage: function(t) {
        console.log("option", t), this.setData({
            type: t.type,
            from: t.from,
            id: t.id
        }), "add" == t.type ? (wx.setNavigationBarTitle({
            title: "新增收货地址"
        }), console.log("新增收货地址"), this.setData({
            "addressData[0].name": "选择收货地址"
        })) : "updata" == t.type ? (wx.setNavigationBarTitle({
            title: "修改收货地址"
        }), console.log("修改收货地址"), this._getData()) : console.log("参数错误"), this._getProvinceNetwordData();
    },
    formSubmit: function(a) {
        console.log(a.detail.value);
        var e = this, s = "";
        if (0 == a.detail.value.realname.length ? s = "姓名不能为空！" : a.detail.value.realname.length < 2 ? s = "姓名太短！" : 0 == a.detail.value.mobile.length ? s = "手机号码不能为空！" : a.detail.value.mobile.length < 11 ? s = "手机号码太短！" : /^1[34578]\d{9}$/.test(a.detail.value.mobile) ? 1 == this.data.addressData.length ? s = "请选择收货地址" : a.detail.value.address.length < 5 && (s = "详细收货地址描述不清晰！") : s = "手机号码有误，请重填", 
        0 != s.length) wx.showToast({
            title: s,
            icon: "success",
            duration: 2e3,
            success: function() {},
            fail: function() {}
        }); else {
            var i = t.getNetAddresss("address/Edit");
            this.data.id && this.data.id, i += "&realname=" + a.detail.value.realname, i += "&mobile=" + a.detail.value.mobile, 
            i += "&province=" + e.data.addressData[0].name, i += "&city=" + e.data.addressData[1].name, 
            i += "&area=" + e.data.addressData[2].name, i += "&address=" + a.detail.value.address, 
            "updata" == e.data.type && (i += "&id=" + e.data.id), t._getNetWork({
                url: i,
                success: function(t) {
                    var a = t.data;
                    console.log("_data", a), 1 == a.result ? wx.showToast({
                        title: "成功",
                        icon: "success",
                        duration: 1e3,
                        mask: !0,
                        success: function() {},
                        fail: function() {},
                        complete: function() {
                            setTimeout(function() {
                                "addressList" == e.data.from ? (console.log("addressList"), wx.redirectTo({
                                    url: "../../member/addressList/addressList"
                                })) : "addressSelect" == e.data.from && (console.log("addressSelect"), wx.redirectTo({
                                    url: "../../buy/addressSelect/addressSelect"
                                }));
                            }, 1e3);
                        }
                    }) : wx.showToast({
                        title: "数据错误",
                        icon: "success",
                        duration: 2e3,
                        success: function() {},
                        fail: function() {}
                    });
                },
                fail: function(t) {}
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    bindChange: function(t) {
        var a = t.detail.value;
        this.data.pickerValue[0] != a[0] && (a[1] = 0, a[2] = 0), this.data.pickerValue[1] != a[1] && (a[2] = 0), 
        this.setData({
            "pickerValue[0]": a[0],
            "pickerValue[1]": a[1],
            "pickerValue[2]": a[2]
        }), this._getProvinceData();
    },
    _getProvinceNetwordData: function() {
        var a = this;
        wx.getStorage({
            key: "provinceData",
            success: function(t) {
                console.log("省准备就绪"), a._getCityNetwordData();
            },
            fail: function(e) {
                console.log("省fail"), t._getNetWork({
                    url: t.getHost() + "/addons/dyun/static/js/dist/area/province.min.json",
                    success: function(t) {
                        var e = t.data;
                        wx.setStorage({
                            key: "provinceData",
                            data: e
                        }), a._getProvinceNetwordData();
                    },
                    fail: function(t) {},
                    state: !0
                });
            }
        });
    },
    _getCityNetwordData: function() {
        var a = this;
        wx.getStorage({
            key: "cityData",
            success: function(t) {
                a._getDistrictNetwordData(), console.log("城市就绪");
            },
            fail: function(e) {
                console.log("城市fail"), t._getNetWork({
                    url: t.getHost() + "/addons/dyun/static/js/dist/area/city.min.json",
                    success: function(t) {
                        var e = t.data;
                        wx.setStorage({
                            key: "cityData",
                            data: e
                        }), a._getCityNetwordData();
                    },
                    fail: function(t) {},
                    state: !0
                });
            }
        });
    },
    _getDistrictNetwordData: function() {
        var a = this;
        wx.getStorage({
            key: "districtData",
            success: function(t) {
                console.log("地区就绪"), a._getProvinceData();
            },
            fail: function(e) {
                console.log("fail"), t._getNetWork({
                    url: t.getHost() + "/addons/dyun/static/js/dist/area/district.min.json",
                    success: function(t) {
                        var e = t.data;
                        wx.setStorage({
                            key: "districtData",
                            data: e
                        }), a._getDistrictNetwordData();
                    },
                    fail: function(t) {},
                    state: !0
                });
            }
        });
    },
    _getProvinceData: function() {
        var t = this;
        wx.getStorage({
            key: "provinceData",
            success: function(a) {
                console.log("省读取成功", a.data), t.setData({
                    provinceData: a.data
                }), t.setData({
                    "selectAddressData[0].name": a.data[t.data.pickerValue[0]].name,
                    "selectAddressData[0].id": a.data[t.data.pickerValue[0]].id,
                    "selectAddressData[0].index": t.data.pickerValue[0]
                }), t._getCityData();
            }
        });
    },
    _getCityData: function() {
        var t = this.data.selectAddressData[0];
        console.log("城市", "_data", t);
        var a = this;
        wx.getStorage({
            key: "cityData",
            success: function(e) {
                console.log("城市读取成功");
                for (var s = [], i = 0; i < e.data.length; i++) e.data[i].pid == t.id && s.push(e.data[i]);
                console.log("城市数据筛选", s), a.setData({
                    cityData: s
                }), a.setData({
                    "selectAddressData[1].name": s[a.data.pickerValue[1]].name,
                    "selectAddressData[1].id": s[a.data.pickerValue[1]].city_id,
                    "selectAddressData[1].index": a.data.pickerValue[1]
                }), a._getDistrictData();
            }
        });
    },
    _getDistrictData: function() {
        var t = this.data.selectAddressData[1];
        console.log("地区", "_data", t), console.log(t);
        var a = this;
        wx.getStorage({
            key: "districtData",
            success: function(e) {
                console.log("地区读取成功");
                for (var s = [], i = 0; i < e.data.length; i++) e.data[i].pid == t.id && s.push(e.data[i]);
                console.log("地区数据筛选", s), a.setData({
                    districtData: s
                }), console.log("districtData", s), a.setData({
                    "selectAddressData[2].name": s[a.data.pickerValue[2]].name,
                    "selectAddressData[2].id": s[a.data.pickerValue[2]].county_id,
                    "selectAddressData[2].index": a.data.pickerValue[2]
                }), console.log("over", a.data.selectAddressData);
            }
        });
    },
    _okAddress: function() {
        this.setData({
            addressData: this.data.selectAddressData
        }), this._closeDateLw();
    },
    _openDateLw: function() {
        this.setData({
            openDateLw: !0
        });
    },
    _closeDateLw: function() {
        this.setData({
            openDateLw: !1
        });
    }
});
var a = getApp();

Page({
    radioChange: function(a) {
        console.log("radio发生change事件，携带value值为：", a.detail.value);
        var e = a.detail.value, t = !1;
        0 == e ? t = !1 : 1 == e && (t = !0), this.setData({
            dispatchtypeValue: e,
            tackShow: t
        });
        for (var d = this.data.radioItems, s = 0, o = d.length; s < o; ++s) d[s].checked = d[s].value == e;
        this.setData({
            radioItems: d
        });
    },
    gotoConfirm: function(e) {
        console.log(e.detail.value);
        var t = this, d = t.data.order_all, s = t.data.dataAll, o = [];
        for (var r in d) {
            var i;
            if ("" == s.address_block && void 0 == s.address_block || s.address && (i = t.data.address_id), 
            !t.data.is_show_dispatch_type_block && void 0 === t.data.address_id) return void wx.showToast({
                title: "请选择收货地址",
                icon: "success",
                duration: 2e3,
                mask: !0
            });
            var l = 0;
            if (t.data.is_show_dispatch_type_block) {
                if (0 == t.data.dispatchtypeValue && (s.dispatch && (l = s.dispatch.id), void 0 === t.data.address_id)) return void wx.showToast({
                    title: "请选择收货地址",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                });
                var c;
                if (t.data.tackShow) {
                    if (void 0 === t.data.takeplace) return void wx.showToast({
                        title: "请选择自提地点",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                    if (void 0 === e.detail.value.takeInput0) return void wx.showToast({
                        title: "请输入" + t.data.contacts_block[0].title,
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                    if (e.detail.value.takeInput0.length < 1) return void wx.showToast({
                        title: t.data.contacts_block[0].title + "过短",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                    if (void 0 === e.detail.value.takeInput1) return void wx.showToast({
                        title: "请输入" + t.data.contacts_block[1].title,
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                    if (!/^1[34578]\d{9}$/.test(e.detail.value.takeInput1)) return void wx.showToast({
                        title: t.data.contacts_block[1].title + "不合法",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                    if (e.detail.value.takeInput1.length < 11) return void wx.showToast({
                        title: t.data.contacts_block[1].title + "不合法",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                    c = s.cartids;
                    var n = {
                        carrier_realname: e.detail.value.takeInput0,
                        carrier_mobile: e.detail.value.takeInput1,
                        realname: t.data.takeplace.storename,
                        mobile: t.data.takeplace.tel,
                        address: t.data.takeplace.address
                    };
                }
            }
            var _ = 0;
            e.detail.value["deductcredit2" + r] && (_ = 1);
            var u = 0;
            e.detail.value["deductcredit" + r] && (u = 1);
            var p = {
                supplier_uid: d[r].supplier_uid,
                dispatchtype: t.data.dispatchtypeValue,
                remark: e.detail.value["msg" + r],
                deduct2: _,
                deduct: u,
                cartids: t.data.cartids,
                carrierid: c,
                goods: d[r].goods_data,
                couponid: d[r].couponId?d[r].couponId:0,
                addressid: i,
                id: t.data.goodid,
                dispatchid: l,
                carrier: n,
                fromcart: s.fromcart
            };
            o.splice(o.length, 1, p);
        }
        console.log("_confirmData", o);
        var k = a.getNetAddresss("order/Create");
        k += "&order=" + JSON.stringify(o), console.log(k), a._getNetWork({
            url: k,
            success: function(a) {
                console.log("res", a.data);
                var e = a.data, t = "../orderPay/orderPay?order_id=" + e.data.orderid;
                0 == e.result ? wx.showToast({
                    title: e.msg,
                    icon: "success",
                    duration: 2e3
                }) : e.result && wx.redirectTo({
                    url: t
                });
            },
            fail: function(a) {}
        });
    },
    switch2deductcredit2: function(a) {
        var e = this, t = parseInt(a.currentTarget.dataset.value), d = e.data.realprice_total, s = 0;
        a.detail.value ? d -= t : d += t, s = d <= 0 ? 0 : d, this.setData({
            realprice_total: d,
            realprice_totaler: s
        });
    },
    switch2deductcredit: function(a) {
        var e = this, t = parseInt(a.currentTarget.dataset.value), d = e.data.realprice_total, s = 0;
        a.detail.value ? d -= t : d += t, s = d <= 0 ? 0 : d, this.setData({
            realprice_total: d,
            realprice_totaler: s
        });
    },
    data: {
        takeplaceShow: !1,
        cartids: "",
        dispatchtypeValue: 0,
        dataAll: null,
        orderState: 0,
        is_show_dispatch_type_block: !1,
        contacts_block: null,
        address_blockShow: !1,
        address_block: null,
        showTopTips: !1,
        address: [],
        saleset:"",
        _coupon:[],
        takePlace_name: null,
        takePlace_mobile: null,
        takePlace_address: null,
        address_title_id: null,
        address_title: '收货人',
        address_name: null,
        address_mobile: null,
        address_address: null,
        radioItems: [ {
            name: "上门自提",
            value: "1"
        }, {
            name: "配送核销",
            value: "0",
            checked: !0
        } ],
        isAgree: !1,
        order_all: []
    },
    onLoad: function(a) {
        this._getData(a);
    },
    _getData: function(e) {
        wx.removeStorage({
            key: "ORDER_ADDRESS_SELECT_DATA",
            success: function(a) {
                console.log("清空收货地址选择缓存");
            }
        }), wx.removeStorage({
            key: "ORDER_COUPON_SELECT_DATA",
            success: function(a) {
                console.log("清空优惠券选择缓存");
            }
        }), wx.removeStorage({
            key: "ORDER_TAKEPLACE_SELECT_DATA",
            success: function(a) {
                console.log("清空自提地址选择缓存");
            }
        });
        var t = this, d = e.cart_ids, s = e.goods_id;
        a._postNetWork({
            url: a.getNetAddresss("cart/Confirm"),
            showToastIn: !1,
            data: {
                cart_ids: e.cart_ids,
                id: e.goods_id,
                optionid: e.optionid,
                total: e.total
            },
            success: function(a) {
                var e = a.data.data;
                console.log("我的订单", a);
                var o = e.is_show_dispatch_type_block, r = e.contacts_block, i = (e.address_block, 
                !1);
                if (e.address) {
                    i = !0;
                    t.setData({
                        address_id: e.address.id,
                        address_title: e.address_block.title ? e.address_block.title:'收货人',
                        address_name: e.address_block.name,
                        address_mobile: e.address_block.mobile,
                        address_address: e.address.province + e.address.city + e.address.area + e.address_block.address
                    });
                } else i = !1;
                var l = e.order_all;
                wx.setStorage({
                    key: "carrier_list",
                    data: e.carrier_list
                }), t.setData({
                    cartids: d,
                    goodid: s,
                    dataAll: e,
                    order_all: l,
                    is_show_dispatch_type_block: o,
                    contacts_block: r,
                    address_blockShow: i,
                    address: e.address,
                    realprice_total: e.realprice_total,
                    realprice_totaler: e.realprice_total,
                    orderState: 1,
                    saleset:e.saleset
                });
            },
            fail: function(a) {}
        });
    },
    _gotoAddressAdd: function(a) {
        wx.navigateTo({
            url: "../../member/addressAdd/addressAdd?type=add&from=addressSelect"
        });
    },
    _gotoAddressSelect: function(a) {
        wx.navigateTo({
            url: "../addressSelect/addressSelect?addres_id=" + a.currentTarget.dataset.id + "&type=add&from=addressSelect"
        });
    },
    _gotoTakeplaceSelect: function(a) {
        wx.navigateTo({
            url: "../takePlace/takePlace?id=" + a.currentTarget.dataset.id
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.getStorage({
            key: "ORDER_ADDRESS_SELECT_DATA",
            success: function(e) {
                console.log("ORDER_ADDRESS_SELECT_DATA", e), a.setData({
                    address_blockShow: !0,
                    address_id: e.data.id,
                    address_name: e.data.realname,
                    address_mobile: e.data.mobile,
                    address_address: e.data.province + e.data.city + e.data.area + e.data.address
                });
            }
        }),
            wx.getStorage({
            key: "ORDER_COUPON_SELECT_DATA",
            success: function(e) {
                console.log("ORDER_COUPON_SELECT_DATA", e)
                if(!!e.data.supplier_uid){
                    var obj={};
                    obj.supplier_uid=e.data.supplier_uid;
                    obj.couponID=e.data.id;
                    var _coupon= a.data._coupon;
                    var insert=true;
                    if(_coupon&&_coupon.length>0){
                        for(var i=0;i<_coupon.length;i++){
                            if(_coupon[i].supplier_uid==obj.supplier_uid){
                                insert=false;
                                break;
                            }
                        }

                    }
                    if(insert){
                        console.log('change');
                        _coupon.push(obj);
                        //如果选择了优惠券还是要处理下价格之类的
                        var  changeOrder=a.data.order_all[obj.supplier_uid];
                        changeOrder['couponId']=obj.couponID;
                        changeOrder['couponname']= e.data.couponname;
                        var coupon_deduct=0;
                        if(e.data.backtype==0){
                            //立减
                            coupon_deduct=parseFloat(e.data.deduct);
                        }else if(e.data.backtype==1){
                            //打折
                            coupon_deduct=parseFloat((10-parseFloat(e.data.discount))*parseFloat(changeOrder['realprice'])/10);
                        }else if(e.data.backtype==2){
                            //返利
                        }
                        console.log(coupon_deduct);
                        var  now=(changeOrder['realprice']-coupon_deduct).toFixed(2);
                        changeOrder['realprice']=now>0?now:0;
                        //需付
                        var now_total=parseFloat(a.data.realprice_totaler)-coupon_deduct;
                        var realprice_totaler=(now_total>0)?now_total.toFixed(2):0;
                        a.data.order_all[obj.supplier_uid]=changeOrder;
                        console.log(changeOrder);
                        a.setData({
                            _coupon: _coupon,
                            order_all: a.data.order_all,
                            realprice_totaler: realprice_totaler,
                        });
                    }
                }
            },
            fail:function(e){
                console.log("ORDER_COUPON_SELECT_DATA", e);
            }
        }), wx.getStorage({
            key: "ORDER_TAKEPLACE_SELECT_DATA",
            success: function(e) {
                console.log("ORDER_TAKEPLACE_SELECT_DATA", e), a.setData({
                    takeplace: e.data,
                    takeplaceShow: !0
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {}
});
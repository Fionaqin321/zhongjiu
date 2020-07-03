let baseUrl = "http://localhost/zhongjiu";

define(['jquery', 'cookie'], function($, cookie) {
    let id = location.search.split('=')[1];
    // console.log(id);
    return {
        render: function(callback) {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getItem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    // console.log(res);
                    let temp_preview = '',
                        temp_big = '',
                        temp_name = '',
                        temp_productDesc = '';
                    temp_preview = `<div id="preview">
                    <div class="jqzoom">
                        <div class="smallpic">
                            <img src="${JSON.parse(res.pic)[0]}" style="width:350px;height:350px"/>
                            <div class="movebox hide"></div>
                        </div>
                    </div>

                    <div id="spec-list">
                        <ul class="lh">
                            <li class="">
                                <a href="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/1.png" class="cloud-zoom-gallery" rel="useZoom: 'zoom1', smallImage: 'http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/1_350.png'"><img alt="42度天佑德青稞酒小黑125ml×4" title="42度天佑德青稞酒小黑125ml×4" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/1_50.png" width="50" height="50" onerror="javascript: this.src = '/Images/onerror.jpg';"></a>
                            </li>
                            <li class="on">
                                <a href="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/2.png" class="cloud-zoom-gallery" rel="useZoom: 'zoom1', smallImage: 'http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/2_350.png'"><img alt="42度天佑德青稞酒小黑125ml×4" title="42度天佑德青稞酒小黑125ml×4" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/2_50.png" width="50" height="50" onerror="javascript: this.src = '/Images/onerror.jpg';"></a>
                            </li>
                            <li class="">
                                <a href="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/3.png" class="cloud-zoom-gallery" rel="useZoom: 'zoom1', smallImage: 'http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/3_350.png'"><img alt="42度天佑德青稞酒小黑125ml×4" title="42度天佑德青稞酒小黑125ml×4" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/3_50.png" width="50" height="50" onerror="javascript: this.src = '/Images/onerror.jpg';"></a>
                            </li>
                            <li class="">
                                <a href="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/4.png" class="cloud-zoom-gallery" rel="useZoom: 'zoom1', smallImage: 'http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/4_350.png'"><img alt="42度天佑德青稞酒小黑125ml×4" title="42度天佑德青稞酒小黑125ml×4" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/4_50.png" width="50" height="50" onerror="javascript: this.src = '/Images/onerror.jpg';"></a>
                            </li>
                            <li class="">
                                <a href="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/5.png" class="cloud-zoom-gallery" rel="useZoom: 'zoom1', smallImage: 'http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/5_350.png'"><img alt="42度天佑德青稞酒小黑125ml×4" title="42度天佑德青稞酒小黑125ml×4" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/Shop/1/Products/95390/5_50.png" width="50" height="50" onerror="javascript: this.src = '/Images/onerror.jpg';"></a>
                            </li>
                        </ul>
                    </div>
                    <div class="attent-good" id="choose-btn-coll">
                        <a href="javascript:void(0);" class="btn-coll">收藏商品</a>
                    </div>
                    <span class="btn">
                      <span class='share'>分享到：</span>
                    <a class="qzone"><img src="../images/qzone.png"></a>
                    <a href="javascript:void(0);" title="分享到微信"><img src="../images/wx.png"></a>
                    </span>
                </div>`;

                    temp_big = `<div class="big">
                    <img src="../images/zoom1.png" alt="" class="bigpic">
                </div>`;

                    temp_name = `<div id="name">
                    <h1>${res.desc}</h1>
                    <strong></strong>
                </div>`

                    temp_productDesc = `<div class="cl product-desc">
                    <ul class="summary">
                        <li id="summary-price">
                            <div class="position-r">
                                <div class="dt dt01">价格</div>
                                <strong class="p-price brnone dt">￥ <b id="jd-price">${res.price}</b></strong>

                                <div class="qrcode-boxs">
                                    <div class="qrcode-bar">
                                        <img src="../images/icon-qrcode.png" alt="二维码">
                                        <span class="text">手机购买</span>
                                        <span class="qrcode-arrow-down"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="b-sale">
                                <div class="dt b-01">库存 &nbsp;&nbsp;<a id="saleCounts">${res.num}瓶</a></div>
                                <div class="dt b-01">评价 &nbsp;&nbsp;<a id="Comments" href="#comment">1842</a></div>
                                <div class="dt b-02">评分：</div>
                                <div class="dt summary-grade" style="margin-right:10px">
                                    <span class="star sa5"></span>
                                </div>
                            </div>
                        </li>
                        <li id="productFeight" style="display: block;">
                            <div class="dt fei">运费：</div>
                            <div class="dt">
                                <div id="feightPrice">￥ 0</div>
                            </div>
                        </li>
                        <li id="summary-promotion" style="display:block;">
                            <div class="dt l l01">促销</div>
                            <div class="promotion-l" style="float:left;width:440px;">
                                <div style="margin-bottom:5px; ">
                                    <em class="hl_red_bg">满免</em>
                                    <em class="hl_red">满<span>39.00</span>免运费</em></div>
                                <div id="buygift"></div>
                                <div id="fullgift"></div>
                                <div id="FullSubtraction"></div>
                                <div id="shopbonus"></div>
                            </div>
                        </li>
                        <li id="summary-service">
                            <div class="dt l">库存</div>
                            <div class="dd d03">
                                <span id="stockProductImage" style="float:left;">有货</span>
                                <b id="stockProduct" style=" display:none;">2212.000</b>
                            </div>
                        </li>
                        <li id="summary-service" style="width: 540px;">
                            <div class="dt l" style="line-height: 26px;">物流</div>
                            <div class="dd special">
                                <span>配送至</span> &nbsp; <a class="address-choose" id="addressChoose" data-select="642,643,648">北京 北京市 朝阳区</a><span id="isCashOnDelivery">&nbsp;|
                          &nbsp;支持货到付款</span>
                            </div>
                        </li>
                        <li id="service" style="width:540px;">
                            <div class="dt l" style="line-height: 26px;">服务</div>
                            <div class="dd d03">
                                <span style="float:left;">由 <a href="javascript:;" target="_blank" style="color: red;">中酒自营</a> 从北京发货，并提供售后服务</span>
                            </div>
                        </li>
                    </ul>
                    <!--summary end-->
                    <ul id="choose" class="choose">
                        <li id="choose-amount" style="line-height: 26px;">
                            <div class="dt l">数量</div>
                            <div class="dd">
                                <div class="wrap-input">
                                    <a class="btn-reduce" href="javascript:;">-</a>
                                    <a class="btn-add" href="javascript:;">+</a>
                                    <input class="text quantity-text" value="1" min="1" max="${res.num}">
                                </div>
                            </div>
                        </li>
                        <li id="choose-result">
                            <div class="dt"></div>
                            <div class="dd"><strong></strong><strong></strong></div>
                        </li>
                        <li id="choose-btns">
                            <div id="choose-btn-buy" class="btn">
                                <a class="btn-append btn-order-now" name="OrderNow" id="OrderNow">
                                    <img src="../images/liji_bg.png">立即购买
                                </a>
                            </div>
                            <div id="choose-btn-append" class="btn">
                                <a class = "btn-append" id = "InitCartUrl" style = "margin-left:40px;" href="${baseUrl}/src/html/shopcar.html">
                                    <img src="../images/gou.png">加入购物车
                                </a>
                            </div>
                        </li>
                    </ul>
                    <!--choose end-->
                    <span class="clr"></span>
                </div>`;
                    $('#product-intro').append(temp_preview);
                    $('#product-intro').append(temp_big);
                    $('#product-intro').append(temp_name);
                    $('#product-intro').append(temp_productDesc);

                    let num = $('.quantity-text').val();
                    $('.btn-add').on('click', function() {
                        num++;
                        if (num >= res.num) {
                            num = res.num;
                        }
                        $('.quantity-text').val(num);
                    })
                    $('.btn-reduce').on('click', function() {
                        num--;
                        if (num <= 1) {
                            num = 1;
                        }
                        $('.quantity-text').val(num);
                    })

                    $('.smallpic').hover(function() {
                            $('.big').addClass('show');
                            $('.movebox').addClass('show');
                            // 计算movebox的宽高
                            let _width = ($(this).width() * $('.big').width() / $('.bigpic').width());
                            let _height = ($(this).height() * $('.big').height() / $('.bigpic').height());
                            console.log(_width, _height);
                            $('.movebox').css({
                                width: _width,
                                height: _height
                            })

                        },
                        function() {
                            $('.big').removeClass('show');
                            $('.movebox').removeClass('show');

                        })

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            let product = {
                id: id,
                price: price,
                num: num
            };
            console.log(product);
            let shop = cookie.get('shop'); // 获取cookie中的购物车
            // 判断cookie中是否存入了购物车数据
            // 不存在 创建
            // 存在 修改
            if (shop) {
                shop = JSON.parse(shop); // 将字符串转成数组
                // cookie中已经存在商品id 只修改商品数量 而不是再存入一条数据
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = [];
                shop.push(product);
                console.log(shop);
            }
            cookie.set('shop', JSON.stringify(shop), 7);
        }
    };
});
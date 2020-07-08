let baseUrl = 'http://localhost/zhongjiu';
let totalNum = 0; // 商品总件数
let total = 0; // 商品总价 

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            // 获取cookie数据
            let shop = cookie.get('shop');
            if (shop) {
                shop = JSON.parse(shop);

                let idList = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shopcar.php`,
                    data: {
                        idList: idList
                    },
                    dataType: "json",
                    success: function(res) {
                        // 渲染页面
                        let temp = '';
                        res.forEach(elm => {
                            // 查找出cookie里面商品id 
                            let arr = shop.filter(item => item.id === elm.id);
                            temp += `<li class="item">
                            <input type="checkbox" class="checkBox" style="margin-top: 26px;" data-id="${elm.id}">
                                <div class="item-left">
                                  <div class="pro-pic">
                                    <img src="${JSON.parse(elm.pic)[0]}"
                                      alt="">
                                  </div>
                                  <div class="product">
                                    <ul class="text">
                                      <li>${elm.desc}</li>
                                      <li>
                                        商品货号：3219820002256
                                      </li>
                                    </ul>
                                    <img class="icon" src="../images/TimelyDelivery.jpg" alt="">
                                  </div>
                                </div>
                                
                                <div class="price">￥<span>${elm.price}<span></div>
                                <div class="num">
                                    <a class="btn-reduce" href="javascript:;">-</a>
                                    <input class="text quantity-text" value="${arr[0].num}" data-id="${elm.id}" max="${elm.num}">
                                    <a class="btn-add" href="javascript:;">+</a>
                                </div>
                                <div> <input type = "button" value = "删除" class="btn-delete" data-id="${elm.id}"> </div>
                              </li>`
                        });
                        $('.pro-list').append(temp);
                        $('.pro-list>li input[type="checkbox"]').prop('checked', true);
                        compute();

                        // 计算总数量和总价
                        function compute() {
                            if (cookie.get('shop')) {
                                let shopObj = JSON.parse(cookie.get('shop'));
                                totalNum = 0;
                                total = 0;
                                let checkedBoxs = $('.pro-list>li input[type="checkbox"]:checked');
                                if (checkedBoxs.length === shopObj.length) {
                                    $('#selectAll').prop('checked', true);
                                } else {
                                    $('#selectAll').prop('checked', false);
                                }
                                let idArr = checkedBoxs.map((index, item) => {
                                    return item.dataset.id;
                                });
                                idArr = Array.from(idArr); //将类数组转化为数组
                                shopObj.forEach((item, index) => {
                                    if (idArr.some(elm => elm == item.id)) {
                                        totalNum += parseInt(item.num);
                                        total += parseInt(item.num) * parseInt(item.price);
                                    }
                                })
                                $('.totalNum').html(totalNum);
                                $('.totalCount').text(total.toFixed(2));
                            }
                        }
                        // 采用事件委托为未来元素绑定事件
                        // 删除
                        $('.pro-list').on('click', '.btn-delete', function() {
                            let shop = JSON.parse(cookie.get('shop'));
                            let id = this.dataset.id;
                            shop.forEach((elm, index) => {
                                if (elm.id === id) {
                                    shop.splice(index, 1);
                                    let result = JSON.stringify(shop);
                                    cookie.set('shop', result, 7);
                                    location.reload();
                                }
                            });
                        });


                        // 点击”-“
                        $('.pro-list').on('click', '.btn-reduce', function() {
                            let shop = JSON.parse(cookie.get('shop'));
                            let num = $(this).next().val();
                            num--;
                            if (num <= 1) {
                                num = 1;
                            }
                            $(this).next().val(num);
                            let curId = $(this).next()[0].dataset.id;
                            shop.map((item, index) => {
                                if (item.id == curId) {
                                    item.num = num;
                                }
                            })
                            cookie.set('shop', JSON.stringify(shop), 7);
                            compute();
                        })

                        // 点击”+“
                        $('.pro-list').on('click', '.btn-add', function() {
                            let shop = JSON.parse(cookie.get('shop'));
                            let num = $(this).prev().val();
                            num++;
                            if (num >= $(this).prev()[0].max) {
                                num = $(this).prev()[0].max;
                            }
                            $(this).prev().val(num);
                            let curId = $(this).prev()[0].dataset.id;
                            shop.map(item => {
                                if (item.id === curId) {
                                    item.num = num;
                                    // console.log(item);
                                }
                            })
                            cookie.set('shop', JSON.stringify(shop), 7);
                            compute();
                        })

                        // checkbox的操作
                        $('.pro-list').on('click', '.checkBox', function() {
                            compute();
                        });

                        // 全选
                        $('#selectAll').on('click', function() {
                            let _checked = $(this).is(':checked'); // 获取全选按钮的选中状态
                            $('.pro-list>li input[type="checkbox"]').prop('checked', _checked);
                            compute();
                        });
                    }
                });
            }
        }
    }
})
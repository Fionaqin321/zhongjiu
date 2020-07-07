let baseUrl = 'http://localhost/zhongjiu';
let totalNum = 0; // 商品总件数
let total = 0; // 商品总价 

define(['jquery', 'cookie'], function($, cookie) {
    return {
        init: function() {
            if (cookie.get('shop')) {
                let shopObj = JSON.parse(cookie.get('shop'));
                console.log(shopObj);
                shopObj.forEach((item, index) => {
                    totalNum += parseInt(item.num);
                    total = parseInt(item.num) * parseInt(item.price);
                })
                $('.totalNum').html(totalNum);
                $('.totalCount').text(total.toFixed(2));
            }
        },
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
                                    <input class="text quantity-text" value="${arr[0].num}" min="1">
                                    <a class="btn-add" href="javascript:;">+</a>
                                </div>
                                <div> <input type = "button" value = "删除" class="btn-delete" data-id="${elm.id}"> </div>
                              </li>`
                        });
                        $('.pro-list').append(temp);

                        // 采用事件委托为未来元素绑定事件
                        // 删除
                        $('.pro-list').on('click', '.btn-delete', function() {
                            // console.log(this);
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

                        // checkbox的操作
                        $('.pro-list').on('click', '.checkBox', function() {
                            let oCheckBox = $('.pro-list input[type = "checkbox"]:checked'); // 获取ul中所有被选中的checkbox
                            let checkedLi = []; // 存放ul中所有被选中的li

                            oCheckBox.each((index, item) => {
                                checkedLi = [];
                                checkedLi.push($(item).parent());
                            });
                            console.log(checkedLi); //获取ul中所有被选中的li
                            checkedLi.forEach((item, index) => {
                                    totalNum += Number(item.find('.num>span').text());
                                    total += (Number(item.find('.num>span').text()) * Number(item.find('.price>span').text()));
                                })
                                // console.log(totalNum, total.toFixed(2));
                            $('.totalNum').html(totalNum);
                            $('.totalCount').text(total.toFixed(2));
                        });

                        // 全选
                        $('.selectAll>.checkbox').on('click', function() {
                            let _checked = $(this).is(':checked'); // 全选按钮的选中状态
                            $('.pro-list>li input[type="checkbox"]').attr('checked', _checked);
                            totalNum = 0;
                            total = 0;
                            if (_checked) {
                                $('.pro-list>li').each((index, item) => {
                                    totalNum += Number($(item).find('.num>span').text());
                                    total += Number($(item).find('.num>span').text()) * Number($(item).find('.price>span').text());
                                });
                            }
                            $('.totalNum').html(totalNum);
                            $('.totalCount').text(total.toFixed(2));
                        });
                    }
                });
            }
        }
    }
})
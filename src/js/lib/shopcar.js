let baseUrl = 'http://localhost/zhongjiu';

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
                            // console.log(arr);
                            temp += `<li class="item" data-id="${elm.id}">
                            <input type="checkbox" class="checkBox" style="margin-top: 26px;">
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
                                
                                <div>￥${elm.price}</div>
                                <div>x ${arr[0].num}</div>
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


                        // checkbox
                        $('.pro-list').on('click', '.checkBox', function() {
                            let shop = JSON.parse(cookie.get('shop'));
                            // console.log($(this).is(':checked'));
                            // console.log(this.dataset.id);
                            // 获取ul中所有被选中的checkbox
                            let oCheckBox = $('.pro-list input[type = "checkbox"]:checked');

                            let arr = [];
                            oCheckBox.map(elm => {
                                let curIndex = oCheckBox.parent()[0].dataset.id; //当前商品的ID
                                shop.forEach(item => {
                                    let curIndex = oCheckBox.parent()[0].dataset.id; //当前商品的ID
                                    if (item.id = curIndex) {
                                        console.log(item);
                                        arr.push({
                                            count: item.num,
                                            price: item.price
                                        })
                                    }
                                });
                            })
                            console.log(arr);
                        });
                    }
                });
            }
        }
    }
})
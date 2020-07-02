let baseUrl = 'http://localhost/zhongjiu';

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            // 获取cookie数据
            let shop = cookie.get('shop');
            if (shop) {
                shop = JSON.parse(shop);
                console.log(shop);

                let idList = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shopcar.php`,
                    data: {
                        idList: idList
                    },
                    dataType: "json",
                    success: function(res) {
                        console.log(res);
                        let temp = '';
                        res.forEach(elm => {
                            // 查找出cookie里面商品id 
                            let arr = shop.filter(item => item.id === elm.id);
                            console.log(arr);
                            temp += `<li class="item">
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
                                <div>￥${(elm.price*arr[0].num).toFixed(2)}</div>
                              </li>`
                        });
                        $('.pro-list').append(temp);
                    }
                });
            }
        }
    }
})
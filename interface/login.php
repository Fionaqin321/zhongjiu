<?php
// 1.连接数据库
include('./connection.php');

// 2.接收前端传递过来的值
$userName = $_POST['username'];
$passWord = $_POST['password'];

// 3.去数据库查询是否有
$sql = "SELECT * FROM `users` WHERE `user_name` = '$userName' AND `user_password`='$passWord'";
$result = $mysqli->query($sql);
$mysqli->close();


if($result->num_rows>0){
  echo '{"isLogin": true,"msg":"登录成功"}';
}else{
  echo '{"islogin": false,"msg":"用户名和密码不符，登录失败"}';
}
?>

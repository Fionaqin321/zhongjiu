<?php
  // 1.连接数据库
  include('../interface/connection.php');
  error_reporting(0); // 关闭php的提示 只适用于当前页
  // echo $json;
  // die;
  // 2.接收前端发过来的数据
  // echo $_POST['username'];
  $userName = $_POST['username'];
  $phone = $_POST['phone'];
  $passWord = $_POST['password'];
  // 3.验证数据
  $sql = "select * from users where user_name = '$userName' or user_phone = '$phone'";
  // var_dump($mysqli);
  // die;
  // 执行sql语句
  $result = $mysqli->query($sql);

  if($result->num_rows>0){
    echo '{"status": false,"msg": "用户名已存在或该手机号已被注册过"}';
    $mysqli->close();
    die;
  }

  // 4.根据验证的结果进行下一步
  $insertUser = "insert into users (user_name,user_password,user_phone) values ('$userName','$passWord','$phone')";
  // echo $insertUser;
  // die;

  $res = $mysqli->query($insertUser); // 返回布尔值
  $mysqli->close();

  if($res){
    echo '{"status": true,"msg": "注册成功"}';
  }
   
?>

<?php
  // 1.连接数据库
  include('./lib/connection.php');
  // echo $json;
  // die;
  // 2.接收前端发过来的数据
  // echo $_POST['username'];
  $userName = $_POST['username'];
  $passWord = $_POST['password'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $add = $_POST['add'];
  // 3.验证数据
  $sql = "select * from users where user_name = '$userName'";
  // var_dump($mysqli);
  // die;
  // 执行sql语句
  $result = $mysqli->query($sql);

  if($result->num_rows>0){
    echo "<script>alert('用户名已存在');</script>";
    echo "<script>location.href = './regist.html'</script>";
    $mysqli->close();
    die;
  }
  // 4.根据验证的结果进行下一步
  $insertUser = "insert into users (user_name,user_password,user_email,user_phone,user_add) values ('$userName','$passWord','$email','$phone','$add')";
  // echo $insertUser;
  // die;

  $res = $mysqli->query($insertUser); // 返回布尔值
  $mysqli->close();

  if($res){
    echo '<script>alert("注册成功")</script>';
    echo '<script>location.href="./login.html"</script>';
  }
   
?>

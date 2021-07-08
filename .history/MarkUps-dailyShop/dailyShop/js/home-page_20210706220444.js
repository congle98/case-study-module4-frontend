function login () {
    let userName = $('#userName').val();
    let passWord = $('#passWord').val();
    let userAccount = {
        userName : userName,
        passWord : passWord
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(userAccount),
        //tên API
        url: "http://localhost:8080/api/auth/signin",
       
        success: function (data){
            alert("đăng nhập thành công");
        
        },
        error:function(){
              alert("đăng nhập thất bại tài khoản hoặc mật khẩu sai");
        }
       
        
    });
    event.preventDefault();
}
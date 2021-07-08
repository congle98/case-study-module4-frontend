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
        error: alert("đăng nhập thất bại tài khoản hoặc mật khẩu sai")
        success: function (data){
            alert("đăng nhập thành công")
        
        }
        
    });
    event.preventDefault();
}
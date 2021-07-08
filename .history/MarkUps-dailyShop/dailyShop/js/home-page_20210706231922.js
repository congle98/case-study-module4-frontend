function Login () {
    let userName = $('#userName-login').val();
    let passWord = $('#passWord-login').val();
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
            localStorage.setItem(, value)
            let header = document.getElementsByClassName("aa-head-top-nav-right");
            for (let i = 0; i < header.length; i++) {
                header[i].innerHTML += "<li class=\"hidden-xs\"><a href=\"checkout.html\">Logout</a></li>";
              };
        
        },
        error:function(){
              alert("đăng nhập thất bại tài khoản hoặc mật khẩu sai");
        }
       
        
    });
    event.preventDefault();
};
function check_login_logout(){

};

function Register () {
    let userName = $('#userName-register').val();
    let passWord = $('#passWord-register').val();
    let email = $('#email-register').val();
    let userAccount = {
        userName : userName,
        passWord : passWord,
        email : email,
        role : ['user']
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(userAccount),
        //tên API
        url: "http://localhost:8080/api/auth/signup",
       
        success: function (data){
            alert("đăng ký thành công");
        
        },
        error:function(){
              alert("đăng ký thất bại, tài khoản đã tồn tại hoặc sai định dạng email");
        }
       
        
    });
    event.preventDefault();
}
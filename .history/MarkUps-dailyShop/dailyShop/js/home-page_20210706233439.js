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
            localStorage.setItem("userName", data.userName);
            window.location='index.html';
             alert("đăng nhập thành công");
        
        },
        error:function(){
              alert("đăng nhập thất bại tài khoản hoặc mật khẩu sai");
        }
       
        
    });
    event.preventDefault();
};
function check_login_logout(){
    if(localStorage.getItem("userName")!==null){
        let header = document.getElementsByClassName("aa-head-top-nav-right");
        for (let i = 0; i < header.length; i++) {
            header[i].innerHTML =
            "<p>Xin chào "+ localStorage.getItem("userName")+"</p>"+   
            "<li><a href=\"account.html\">My Account</a></li>"+
            "<li class=\"hidden-xs\"><a href=\"wishlist.html\">Wishlist</a></li>"
            "<li class=\"hidden-xs\"><a href=\"cart.html\">My Cart</a></li>"
            "<li class=\"hidden-xs\"><a href=\"checkout.html\">Checkout</a></li>"
            "<li class=\"hidden-xs\"><a href=\"javascript:Logout()\">Logout</a></li>";
          };
    }
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
};
function Logout(){
    localStorage.removeItem("userName")
    window.location='index.html';
}
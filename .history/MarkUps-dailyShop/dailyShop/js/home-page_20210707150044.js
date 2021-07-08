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
            if(data.message==)
            localStorage.setItem("userdata",JSON.stringify(data));
            console.log(data);
            if(data.roles[0]=="ROLE_ADMIN"){
                window.location='adminHome.html';
            }
            else{
                window.location='index.html';
            }
             alert("đăng nhập thành công");
        
        },
        error: function(){
            
            alert("đăng nhập thất bại sai tài khoản hoặc mật khẩu");
        
        }
       
        
    });
    event.preventDefault();
};
function check_login_logout(){
    if(localStorage.getItem("userdata")!==null){
        let header = document.getElementsByClassName("aa-head-top-nav-right");
        let userdata = JSON.parse(localStorage.getItem("userdata"));
        console.log(userdata);
        for (let i = 0; i < header.length; i++) {
            header[i].innerHTML =
            "<li>Xin chào "+ userdata.name + "!! "+"</li>"+
            "<li class=\"hidden-xs\"><a href=\"shop.html\">My Shop</a></li>"+   
            "<li class=\"hidden-xs\"><a href=\"cart.html\">My Cart</a></li>"+
            "<li class=\"hidden-xs\"><a href=\"checkout.html\">Checkout</a></li>"+
            "<li class=\"hidden-xs\"><a href=\"javascript:Logout()\">Logout</a></li>";
          };
        let headeradmin =  document.getElementsByClassName("aa-head-top-nav-right-admin");
        for (let i = 0; i < headeradmin.length; i++) {
            headeradmin[i].innerHTML =
            "<li>Xin chào Admin: "+ userdata.name + "!! "+"</li>"+
            "<li class=\"hidden-xs\"><a href=\"javascript:getAllUsers()\">Quản lý user</a></li>"+
            "<li class=\"hidden-xs\"><a href=\"javascript:Logout()\">Logout</a></li>";
          };
    }
};

function Register () {
    let userName = $('#userName-register').val();
    let passWord = $('#passWord-register').val();
    let email = $('#email-register').val();
    let name = $('#name-register').val();
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
    localStorage.removeItem("userdata")
    window.location='index.html';
};

function getAllUsers(){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/admin/users",
       
        success: function (data){
            console.log(data);
            let content = "<tr><th>tên tài khoản</th><th>địa chỉ</th><th>số điện thoại</th><th>trạng thái</th><th>Shop name</th></tr>";
            let tableusers = document.getElementById("table-user-manager");
            for (let i = 0; i < data.length; i++) {
               content += "<tr><td>"+data[i].name+"</td>"+"<td>"+data[i].address+"</td>"+"<td>"+data[i].phoneNumber+"</td>"+"<td>"+data[i].status+"</td>"+"<td>"+data[i].shopName+"</td></tr>"
              };
            tableusers.innerHTML += content;  
        

        
        },
        error:function(){
              
        }
       
        
    });
};

window.onload = function(){
    check_login_logout();

};


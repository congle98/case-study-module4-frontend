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
            if(data.message==null){
                localStorage.setItem("userdata",JSON.stringify(data));
        
            if(data.roles[0]=="ROLE_ADMIN"){
                window.location='adminHome.html';
            }
            else{
                window.location='index.html';
            }
             alert("đăng nhập thành công");
            }
            else{
                alert(data.message)
            }
            
        
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

        getOrderCartByUser(userdata.userName);
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
        name : name,
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
       
        success: function (){
            alert("đăng ký thành công");
        
        },
        error:function(){
              alert("đăng ký thất bại, tài khoản đã tồn tại hoặc sai định dạng email");
        }
       
        
    });
    event.preventDefault();
};
function Logout(){
    localStorage.removeItem("userdata");
    localStorage.removeItem("cartOrder");
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
            
        renderAllUser(data);

        
        },
        error:function(){
              
        }
       
        
    });
};
function renderAllUser(data){
    let content = "<tr><th>tên tài khoản</th><th>tên người dùng</th><th>địa chỉ</th><th>số điện thoại</th><th>trạng thái</th><th>Shop name</th><th>Khoá tài khoản</th></tr>";
    let tableusers = document.getElementById("table-user-manager");
    for (let i = 0; i < data.length; i++) {
       content += "<tr><td>"+data[i].userName+"</td>"+"<td>"+data[i].name+"</td>"+"<td>"+data[i].address+"</td>"+"<td>"+data[i].phoneNumber+"</td>"+"<td>"+
       data[i].status+"</td>"+"<td>"+data[i].shopName+"</td><td><button  onclick=\"changeStatusUser('"+data[i].userName+"')\"class=\"btn btn-warning\">"+data[i].status+"</button></td></tr>"
      };
    tableusers.innerHTML += content;  
}

function changeStatusUser(userName){
   
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: userName,
        //tên API
        url: "http://localhost:8080/api/admin/users",
       
        success: function (data){
            $('#table-user-manager').children().remove();
          renderAllUser(data);
        
        },
        
       
        
    });
    event.preventDefault();
}

// function finAllProductByCategory(categoryName){
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         type: "PUT",
//         //tên API
//         url: "http://localhost:8080/api/home/categories/finAllByCategory",
//         data : categoryName,
       
//         success: function (data){
//             console.log(data);
//             let content = "<div class=\"tab-pane fade in active\" id=\""+categoryName+"\">";
//             for (let i = 0; i < data.length; i++) {
//                content +=
//                "<ul class=\"aa-product-catg\">"+
//                "<li>"+
//                  "<figure>"+
//                   "<a class=\"aa-product-img\" href=\"#\"><img src=\"img/man/polo-shirt-2.png\" alt=\"polo shirt img\"></a>"+
//                    "<a class=\"aa-add-card-btn\"href=\"#\"><span class=\"fa fa-shopping-cart\"></span>Add To Cart</a>"+
//                      "<figcaption>"+
//                      "<h4 class=\"aa-product-title\"><a href=\"#\">"+data[i].name+"</a></h4>"+
//                      "<span class=\"aa-product-price\">"+data[i].salePrice+"</span><span class=\"aa-product-price\"><del>"+data[i].price+"</del></span>"+
//                    "</figcaption>"+
//                  "</figure>"+                        
//                  "<div class=\"aa-product-hvr-content\">"+
//                    "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add to Wishlist\"><span class=\"fa fa-heart-o\"></span></a>"+
//                    "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Compare\"><span class=\"fa fa-exchange\"></span></a>"+
//                    "<a href=\"#\" data-toggle2=\"tooltip\" data-placement=\"top\" title=\"Quick View\" data-toggle=\"modal\" data-target=\"#quick-view-modal\"><span class=\"fa fa-search\"></span></a>"+                         
//                  "</div>"+
//                  "<span class=\"aa-badge aa-sale\" href=\"#\">SALE!</span>"+
//                "</li>"+             
//              "</ul>"
//                };
//                content+= "<a class=\"aa-browse-btn\" href=\"#\">Browse all Product <span class=\"fa fa-long-arrow-right\"></span></a></div>"
//             if(categoryName=='men'){
//                 document.getElementById('men').innerHTML = content;
//             }
//             if(categoryName=='women'){

//             }
//             if(categoryName=='sport'){

//             }
//             if(categoryName=='electronics'){

//             }
            

        
//         },
//         error:function(){
              
//         }
//     });

// }

function finAllProductByCategory(){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/home/products/list",
       
        
       
        success: function (data){
            console.log(data);
            let mencontent ="<div class=\"tab-pane fade in active\" id=\"men\">"+
            "<ul class=\"aa-product-catg\">";
            let womencontent ="<div class=\"tab-pane fade in active\" id=\"women\">"+
            "<ul class=\"aa-product-catg\">";
            let sportcontent ="<div class=\"tab-pane fade in active\" id=\"sports\">"+
            "<ul class=\"aa-product-catg\">";
            let electronicscontent ="<div class=\"tab-pane fade in active\" id=\"electronics\">"+
            "<ul class=\"aa-product-catg\">";

            for (let i = 0; i < data.length; i++) {
                 let content = 
                 "<li>"+
                 "<figure>"+
                  "<a class=\"aa-product-img\" href=\"#\"><img src=\"img/man/polo-shirt-2.png\" alt=\"polo shirt img\"></a>"+
                   "<a class=\"aa-add-card-btn\"href=\"javascript:addToCard('"+data[i].id+"')\"><span class=\"fa fa-shopping-cart\"></span>Add To Cart</a>"+
                     "<figcaption>"+
                     "<h4 class=\"aa-product-title\"><a href=\"#\">"+data[i].name+"</a></h4>"+
                     "<span class=\"aa-product-price\">"+data[i].salePrice+"</span><span class=\"aa-product-price\"><del>"+data[i].price+"</del></span>"+
                   "</figcaption>"+
                 "</figure>"+                        
                 "<div class=\"aa-product-hvr-content\">"+
                   "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add to Wishlist\"><span class=\"fa fa-heart-o\"></span></a>"+
                   "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Compare\"><span class=\"fa fa-exchange\"></span></a>"+
                   "<a href=\"#\" data-toggle2=\"tooltip\" data-placement=\"top\" title=\"Quick View\" data-toggle=\"modal\" data-target=\"#quick-view-modal\"><span class=\"fa fa-search\"></span></a>"+                         
                 "</div>"+
                 "<span class=\"aa-badge aa-sale\" href=\"#\">SALE!</span>"+
               "</li>"          
                if(data[i].category.name=='men'){
                    mencontent +=  content
                }
                if(data[i].category.name=='women'){
                    womencontent += content
                }
                if(data[i].category.name=='sport'){
                    sportcontent += content
                }
                if(data[i].category.name=='electronics'){
                    electronicscontent += content
                }
               };
               let endcontent = "</ul><a class=\"aa-browse-btn\" href=\"#\">Browse all Product <span class=\"fa fa-long-arrow-right\"></span></a></div>";
               mencontent+= endcontent;
               womencontent+= endcontent;
               sportcontent+=endcontent;
               electronicscontent+= endcontent;

        
                document.getElementById('men').innerHTML = mencontent;
                document.getElementById('women').innerHTML = womencontent;
                document.getElementById('sports').innerHTML = sportcontent;
                document.getElementById('electronics').innerHTML = electronicscontent;
     
            

        
        },
        error:function(){
              
        }
    });

}
function addToCard(productid){

    if(localStorage.getItem("userdata")!=null){
        let userdata = JSON.parse(localStorage.getItem("userdata"));
        let userName = userdata.userName;
        let dataRequest = {
            userName: userName,
            productId: productid
        };
        $.ajax({
         headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(dataRequest),
        //tên API
        url: "http://localhost:8080/api/user/orderdetail/create",
       
        success: function (){
          
        
        },
        error:function(){
           
        }
      
       
        
    });
    getOrderCartByUser(userName);
    }
    else{
        window.location='account.html';
        alert("vui lòng đăng nhập trước")
    }

};
function getOrderCartByUser(userName) {
 $.ajax({
         headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
        },
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/user/findOrderByUser/"+userName,
       
        success: function (data){
          localStorage.setItem("cartOrder",JSON.stringify(data));
        //   console.log(localStorage.getItem("cartOrder"));
          renderCartOrder(data);
    
        
        },
        error:function(){
          
        }
   });
};

function renderCartOrder(orderDetails){
    let content = "<div class=\"aa-cartbox\">"+
    "<a class=\"aa-cart-link\" href=\"#\">"+
      "<span class=\"fa fa-shopping-basket\"></span>"+
      "<span class=\"aa-cart-title\">SHOPPING CART</span>"+
      "<span class=\"aa-cart-notify\">"+orderDetails.length+"</span></a>"+
    "<div class=\"aa-cartbox-summary\"><ul>";
    let priceTotal = 0;
    for (let i = 0; i <orderDetails.length;i++){
        priceTotal+=(orderDetails[i].quantity*orderDetails[i].product.salePrice);
        content +=  "<li><a class=\"aa-cartbox-img\" href=\"#\"><img src=\"img/woman-small-2.jpg\" alt=\"img\"></a>"+
        "<div class=\"aa-cartbox-info\">"+
          "<h4><a href=\"#\">"+orderDetails[i].product.name+"</a></h4>"+
          "<p>"+orderDetails[i].quantity+" x "+orderDetails[i].product.salePrice+"</p>"+
        "</div>"+
        "<a class=\"aa-remove-product\" href=\"javascript:deleteOrderDetail("+orderDetails[i].id+")\"><span class=\"fa fa-times\"></span></a></li>"
    };
    content += "<li><span class=\"aa-cartbox-total-title\">  Total"+
    "</span><span class=\"aa-cartbox-total-price\"> "+priceTotal+" đồng</span>"+
    "</li></ul><a class=\"aa-cartbox-checkout aa-primary-btn\" href=\"javascript:checkOutButton()\">Checkout</a></div></div>";

    let allDivCartBox = document.getElementsByClassName("aa-cartbox");
    allDivCartBox[0].innerHTML = content;
    // for (let j = 0; j <allDivCartBox.length;j++){
    // allDivCartBox[j].innerHTML=content;
    //  }




}
function deleteOrderDetail(orderDetailId){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "DELETE",
        //tên API
        url: "http://localhost:8080/api/user/orderdetail/delete/"+orderDetailId,
       
        success: function (data){
            let userdata = JSON.parse(localStorage.getItem("userdata"));
            getOrderCartByUser(userdata.userName);
        
        },
        
       
        
    });
    event.preventDefault();
}

function checkOutButton(){
    let orderDetails = JSON.parse(localStorage.getItem("cartOrder"));
    let content = "<div class=\"aa-order-summary-area\">"+
    "<table class=\"table table-responsive\">"+
      "<thead><tr><th>Product</th><th>Total</th></tr></thead><tbody>"
    let totalPrice = 0;  
    for (let i = 0; i < orderDetails.length; i++){
        totalPrice+=(orderDetails[i].quantity*orderDetails[i].product.salePrice);
        content += "<tr> <td>"+orderDetails[i].product.name+"<strong> x "+orderDetails[i].quantity+"  </strong></td><td>"+orderDetails[i].product.salePrice+"</td></tr>"
    }
    content +=  "</tbody><tfoot><tr><th>Subtotal</th><td>""</td></tfoot></table>"

}

window.onload = function(){
    finAllProductByCategory();
    check_login_logout();

};

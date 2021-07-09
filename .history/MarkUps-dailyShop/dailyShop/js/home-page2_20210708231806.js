function checkoutData(){
    let orderDetails = JSON.parse(localStorage.getItem("cartOrder"));
    let content = "<div class=\"aa-order-summary-area\">"+
    "<table class=\"table table-responsive\">"+
      "<thead><tr><th>Product</th><th>Total</th></tr></thead><tbody>"
    let totalPrice = 0;  
    for (let i = 0; i < orderDetails.orderDetailList.length; i++){
        totalPrice+=(orderDetails.orderDetailList[i].quantity*orderDetails.orderDetailList[i].product.salePrice);
        content += "<tr> <td>"+orderDetails.orderDetailList[i].product.name+"<strong> x "+orderDetails.orderDetailList[i].quantity+"  </strong></td><td>"+orderDetails.orderDetailList[i].product.salePrice+"</td></tr>"
    }
    content +=  "</tbody><tfoot><tr><th>Subtotal</th><td>"+totalPrice+"</td></tfoot></table>";
   let checkOutForm = document.getElementsByClassName('aa-order-summary-area');
   checkOutForm[0].innerHTML = content;
   let placeOrder = document.getElementsByClassName('aa-payment-method');
    // let placeOrderContent =    "<div class=\"aa-payment-method\">"+                       
    // "<img src=\"https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg\" border=\"0\" alt=\"PayPal Acceptance Mark\">"+    
    // "<button>Xác Nhận Mua</button></div>";
    // placeOrder[0].innerHTML = placeOrderContent;
  
}
function finAllOrderByUser() {
    let userdata = JSON.parse(localStorage.getItem("userdata"));
    let userName = userdata.userName;
    $.ajax({
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/user/findAllOrderByUser/"+userName,
       
        success: function (data){
            localStorage.setItem("allOrder",JSON.stringify(data));
            console.log(data);
            renderAllOrderByUser();
           

        
        },
    });
    event.preventDefault();

}
function renderAllOrderByUser(){
    let allOrder = JSON.parse(localStorage.getItem("allOrder"));
    let allOrderTable = document.getElementById("all-order-table");
    let content = "<table id=\"all-order-table\" class=\"table table-hover\">"+
    "<thead><tr> <th scope=\"col\">Mã đơn hàng</th>"+
        "<th scope=\"col\">Sản phẩm</th>"+
        "<th scope=\"col\">Tổng giá</th>"+
        "<th scope=\"col\">Xác thực thanh toán</th>"+
        "<th scope=\"col\">Huỷ đơn</th> </tr></thead><tbody></tbody>";
    for (var i = 0;i<allOrder.length; i++){
        content+= "<tr> <th scope=\"row\">"+allOrder[i].id+"</th>"+
        "<td>"+allOrder[i].orderDetailList[1].product.name+","+allOrder[i].orderDetailList[2].product.name+" ,,</td>"+
        "<td>"+getAllPriceOrderDetailList(allOrder[i])+"</td>"+
        "<td><button class=\"btn btn-warning\">Trạng thái</button></td>"+
        "<td><button class=\"btn btn-danger\">X</button></td> </tr>";
    }
    content += "</tbody></table>";
    allOrderTable.innerHTML = content;

}
function getAllPriceOrderDetailList(orderList){
    let price = 0;
    for (let i = 0; i < orderList.length; i++){
        price += orderList[i].quantity*orderList[i].product.salePrice;
    }
    return price;
}

window.onload = function(){
    
    finAllProductByCategory();
    check_login_logout();
    checkoutData();
    

};
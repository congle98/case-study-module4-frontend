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

window.onload = function(){
    
    checkoutData();
    

};
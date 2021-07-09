function renderInfoShop(){
    if(localStorage.getItem("shopOfUser")!=null){
            let content =   "<section id=\"aa-error\">"
    "<div class=\"container\">"
      "<div class=\"row\">"
        "<div class=\"col-md-12\">"
          "<div class=\"aa-error-area\">"
            "<h2>Chưa có shop</h2>"
            "<span>chưa có shop thì tạo đi thằng lìn</span>"
            
            "<a href=\"#\"> có shop rồi nha</a> </div> </div> </div></div></section>";
     let shopTable = document.getElementById("aa-error");
     shopTable.innerHTML = content;  
    }
}
window.onload = function(){

    finAllOrderByUser();
    finAllProductByCategory();
    check_login_logout();
    renderInfoShop();
    

};
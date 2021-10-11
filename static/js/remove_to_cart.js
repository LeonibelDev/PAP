$(".shopping-cart").click(function(e){
    e.preventDefault();

    console.log(e.currentTarget.id)
    
    $.ajax({
        url: "/add-to-car",
        type: 'POST',
        data: {
            id: e.currentTarget.id 
        },
        success: function(data){
            
            cart_alert(data.msg, data.icon)
            reload_car_length()
            //$(e.target).parent().remove()
            
        }, 
        
        timeout: 5000
    })
})

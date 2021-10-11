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
            console.log(data)
            cart_alert(data.msg, data.icon)
            reload_car_length()
        }, 
        
        timeout: 2000
    })
})

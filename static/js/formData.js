var $input = document.querySelector("#image1")
$input.addEventListener("change", function(){

    var $form = document.querySelector("#form")
    var $formData = new FormData($form)
    var img = $formData.get("image1")

    var blobImg = URL.createObjectURL(img)
    
    var $renderimg = document.querySelector("#img1")
    $renderimg.setAttribute("src", blobImg)

   
})

var $input2 = document.querySelector("#image2")
$input2.addEventListener("change", function(){

    var $form = document.querySelector("#form")
    var $formData = new FormData($form)
    var img = $formData.get("image2")

    var blobImg = URL.createObjectURL(img)
    
    var $renderimg = document.querySelector("#img2")
    $renderimg.setAttribute("src", blobImg)

   
})

var $input3 = document.querySelector("#image3")
$input3.addEventListener("change", function(){

    var $form = document.querySelector("#form")
    var $formData = new FormData($form)
    var img = $formData.get("image3")

    var blobImg = URL.createObjectURL(img)
    
    var $renderimg = document.querySelector("#img3")
    $renderimg.setAttribute("src", blobImg)

   
})

var $input4 = document.querySelector("#image4")
$input4.addEventListener("change", function(){

    var $form = document.querySelector("#form")
    var $formData = new FormData($form)
    var img = $formData.get("image4")

    var blobImg = URL.createObjectURL(img)
    
    var $renderimg = document.querySelector("#img4")
    $renderimg.setAttribute("src", blobImg)

   
})
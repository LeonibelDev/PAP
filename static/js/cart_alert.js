function cart_alert (msg, icon) {
	// body... 
	Swal.fire({
	  position: 'center',
	  icon: icon,
	  title: msg,
	  showConfirmButton: false,
	  timer: 2000
	})
}
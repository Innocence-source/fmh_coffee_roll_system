function addCookie(name, value, {path, domain, expires, maxAge}={}) {
	cookieString = name + "=" + value ;
	if (path != null) {
		cookieString += ";path=" + path ;
	}
	if (domain != null) {
		cookieString += ";domain=" + domain ;
	}
	if (expires != null) {
		cookieString += ";expires=" + expires ;
	}
	if (maxAge != null) {
		cookieString += ";max-age=" + maxAge ;
	}
	document.cookie = cookieString ;
}

function getCookie(name) {
	let cookies = document.cookie ;
	// a=1;b=2;c=3
	let array = cookies.split(";").map(entry => entry.trim().split("=")) ;
	// [ [a , 1], [b, 2] , [c , 3] ]
	let arr = array.find(arr => arr[0] === name) ; 
	return arr != null ? arr[1] : null ;
}


function removeCookie(name) {
	document.cookie = `${name}=;max-age=0` ;
}

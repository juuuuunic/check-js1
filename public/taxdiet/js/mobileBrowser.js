function getMobileBrowser(conUrl) {
	// Mobile Browser
	if (navigator.userAgent.match(/iPad/) == null && navigator.userAgent.match(/iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null
			|| conUrl.indexOf('m.taxdiet.co.kr') > -1 ) {
		return true;
	}

	// PC Browser
	return false;
}

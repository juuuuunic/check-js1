	var ImageNotExistProcess = {
		process: function(eleId) {
			
			try {
				var contentsArea = document.getElementById(eleId);	
				var contentsImages = contentsArea.getElementsByTagName("img");			
				for(var i = 0; i < contentsImages.length; i ++) {
					var id = "tempChangeImageId_" + i;
					if(contentsImages[i].id == null || contentsImages[i].id == "") {
						contentsImages[i].id = id;
					} else {
						id = contentsImages[i].id;
					}
					this.replaceProcess(document.getElementById(contentsImages[i].id));
				}
			
			} catch(e) {
				return false;
			}			
		},
		replaceProcess: function(original) {
			var img = new Image();
			img.id = original.id;
			img.src = original.src;
			img.onload = function(e) {};
			img.onerror = function() {
				original.src = "http://www.nicedata.co.kr/images/noimage.jpg";
				original.width = 200;
				original.height = 200;
			};
		},
		loadImage: function(e) {},
		showErrorImage: function(e) {
			var ev = e || window.event, target = ev.target || ev.srcElement, key;
			var target = ev.target;
			target.src = "http://www.nicedata.co.kr/images/noimage.jpg";
			target.width = 200;
			target.height = 200;
		}	
	};
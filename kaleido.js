
function kaleido_start(parent_div, image_path, config = {}){

	let zoom = config.hasOwnProperty('zoom') ? config.zoom : 1.6;
	let rotation = config.hasOwnProperty('start_angle') ? config.start_angle : 0;
	let speed = config.hasOwnProperty('speed') ? config.speed : 1;

	let horizontal_images = config.hasOwnProperty('horizontal_images') ? config.horizontal_images : 2;
	let vertical_images = config.hasOwnProperty('vertical_images') ? config.vertical_images : 2;
	let total_images = horizontal_images * vertical_images

	let canvas_width, canvas_height, imgScaledWidth;
	let canvasses = []
	let img = new Image();

	set_image(image_path);

	canvas_width = parent_div.getBoundingClientRect().width / horizontal_images
	canvas_height = parent_div.getBoundingClientRect().height / vertical_images

	create_canvases()
	start()

	function create_canvases(){
		holder = document.createElement('div');
		holder.style.width='100%';
		holder.style.height='100%';
		holder.style.display='flex';
		holder.style.flexWrap='wrap';
		parent_div.appendChild(holder);

		for (let a=0; a<total_images; a++){
			canvas = document.createElement('canvas')
			let context = canvas.getContext("2d")
			canvas.width = canvas_width
			canvas.height = canvas_height

			canvasses.push({canvas, context});
			holder.appendChild(canvas);
		}
	}

	function start(){
		setInterval(function(){
			rotation += speed/3000;
			window.requestAnimationFrame(draw_image);
		},
		1000/40);
	};

	function draw_image(){
		// looks at the canvasses position to decide how it gets flipped
		for (let a=0; a<total_images; a++){
			let left = a % horizontal_images % 2 == 0
			let top = Math.floor(a/horizontal_images) % 2 == 0

			draw_context(canvasses[a].context, left, top)
		}
	}

	// draws to an individual canvas
	function draw_context(context, left, top){
		context.setTransform(1, 0, 0, 1, 0, 0);		
		context.clearRect(0, 0, canvas_width, canvas_height);	

		if (left) {
			hor = -zoom;
			width_offset = canvas_width-(canvas_width-imgScaledWidth*zoom)/2;	
		}
		else {		
			hor = zoom;
			width_offset = (canvas_width-imgScaledWidth*zoom)/2;
		}

		if (top) {
			vert = zoom;		
			height_offset = (canvas_height-canvas_height*zoom)/2;
		}
		else {
			vert = -zoom;
			height_offset = canvas_height-(canvas_height-canvas_height*zoom)/2;
		}

		context.translate(width_offset, height_offset);
		context.scale(hor, vert);	
		
		context.translate(imgScaledWidth/2, canvas_height/2);
		context.rotate(rotation);			
		context.translate(-imgScaledWidth/2, -canvas_height/2);
		
		context.drawImage(img, 0, 0, imgScaledWidth, canvas_height);
	}

	// adds a new image to canvasses
	function set_image(url){
		img.src = url;
		img.onload = function () {
			// gets width of image when height is the height of the canvas, used to find center.
			imgScaledWidth = canvas_height * img.width / img.height;
		}
	}

}


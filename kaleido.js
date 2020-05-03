/* -----------------------------------------------
/* Author: Daniel Petersen  - danielpetersen.ca
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub: github.com/dpet
/* v1.0.0
/* ----------------------------------------------- */


function kaleido_start(parent_div, image_path, config = {}){

	let zoom = config.hasOwnProperty('zoom') ? parseFloat(config.zoom) : 1.6;
	let rotation = config.hasOwnProperty('start_angle') ? parseInt(config.start_angle) : 0;
	let speed = config.hasOwnProperty('speed') ? parseFloat(config.speed) : 1;

	let horizontal_num = config.hasOwnProperty('horizontal_num') ? parseInt(config.horizontal_num) : 4;
	let vertical_num = config.hasOwnProperty('vertical_num') ? parseInt(config.vertical_num) : 2;
	let total_images = horizontal_num * vertical_num

	let imgScaledWidth, holder, canvas_width, canvas_height;
	let canvasses = []
	let img = new Image();

	set_image(image_path);

	window.addEventListener('resize', set_canvas_sizes);

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

			canvasses.push({canvas, context});
			holder.appendChild(canvas);
		}

		set_canvas_sizes();
	}

	function set_canvas_sizes(){
		canvas_width = parent_div.getBoundingClientRect().width / horizontal_num
		canvas_height = parent_div.getBoundingClientRect().height / vertical_num

		for (let a=0; a<total_images; a++){
			canvasses[a].canvas.width = canvas_width
			canvasses[a].canvas.height = canvas_height
		}
	}

	function start(){
		window.requestAnimationFrame(draw_image);
	};

	function draw_image(timestamp){
		rotation += speed/3000;

		if(typeof start_time === 'undefined') start_time = timestamp;
  		var progress = timestamp - start_time;

  		start_time = timestamp;

		// looks at the canvasses position to decide how it gets flipped
		for (let a=0; a<total_images; a++){
			let left = a % horizontal_num % 2 == 0
			let top = Math.floor(a/horizontal_num) % 2 == 0

			draw_context(canvasses[a].context, left, top)
		}

		if (!holder.getAttribute('data-stop'))
			window.requestAnimationFrame(draw_image);
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


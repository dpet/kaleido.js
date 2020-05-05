/* -----------------------------------------------
/* Author: Daniel Petersen  - danielpetersen.ca
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub: github.com/dpet
/* v1.0.0
/* ----------------------------------------------- */


function kaleido_start(parent_div, image_path, config = {}){

	let zoom = config.hasOwnProperty('zoom') ? parseFloat(config.zoom) : 1.6;
	let applied_zoom = zoom;
	let pulse_counter = Math.PI; // cos used for pulse and PI lets it start at the bottom

	let rotation = config.hasOwnProperty('start_angle') ? parseInt(config.start_angle) : 0;
	let speed = config.hasOwnProperty('speed') ? parseFloat(config.speed) : 1;
	let pulse = config.hasOwnProperty('pulse') ? parseFloat(config.pulse) : 0;

	let horizontal_num = config.hasOwnProperty('horizontal_num') ? parseInt(config.horizontal_num) : 4;
	let vertical_num = config.hasOwnProperty('vertical_num') ? parseInt(config.vertical_num) : 2;
	let total_images = horizontal_num * vertical_num

	let imgScaledWidth, holder, canvas_width, canvas_height, last_timestamp;
	let canvasses = []
	let img = new Image();

	set_image(image_path);

	window.addEventListener('resize', set_canvas_sizes);

	let is_visible = true;
	let observer = new IntersectionObserver((entries)=>{is_visible = entries[0].isIntersecting});
	observer.observe(parent_div)

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
			canvas.style.flexGrow='2';

			canvasses.push({canvas, context});
			holder.appendChild(canvas);
		}

		set_canvas_sizes();
	}

	function set_canvas_sizes(){

		styling=getComputedStyle(parent_div, null);
		topBorder=styling.getPropertyValue('border-top-width');
		rightBorder=styling.getPropertyValue('border-right-width');
		bottomBorder=styling.getPropertyValue('border-bottom-width');
		leftBorder=styling.getPropertyValue('border-left-width');

		pWidth = parent_div.getBoundingClientRect().width - parseInt(rightBorder) - parseInt(leftBorder)
		pHeight = parent_div.getBoundingClientRect().height - parseInt(topBorder) - parseInt(bottomBorder)

		canvas_width = pWidth / horizontal_num
		canvas_height =  pHeight / vertical_num

		for (let a=0; a<total_images; a++){
			canvasses[a].canvas.width = canvas_width
			canvasses[a].canvas.height = canvas_height
		}
	}

	function start(){
		last_timestamp = 0;
		window.requestAnimationFrame(draw_image);
	};

	function draw_image(timestamp){

		if(is_visible && timestamp - last_timestamp > 20){
			rotation += speed/30;

			set_zoom();

			// looks at the canvasses position to decide how it gets flipped
			for (let a=0; a<total_images; a++){
				let left = a % horizontal_num % 2 == 0
				let top = Math.floor(a/horizontal_num) % 2 == 0

				draw_context(canvasses[a].context, left, top)
			}

			last_timestamp = timestamp;
		}

		

		if (!holder.getAttribute('data-stop'))
			window.requestAnimationFrame(draw_image);
	}

	// draws to an individual canvas
	function draw_context(context, left, top){
		context.setTransform(1, 0, 0, 1, 0, 0);		
		context.clearRect(0, 0, canvas_width, canvas_height);	

		if (left) {
			hor = -applied_zoom;
			width_offset = canvas_width-(canvas_width-imgScaledWidth*applied_zoom)/2;	
		}
		else {		
			hor = applied_zoom;
			width_offset = (canvas_width-imgScaledWidth*applied_zoom)/2;
		}

		if (top) {
			vert = applied_zoom;		
			height_offset = (canvas_height-canvas_height*applied_zoom)/2;
		}
		else {
			vert = -applied_zoom;
			height_offset = canvas_height-(canvas_height-canvas_height*applied_zoom)/2;
		}

		context.translate(width_offset, height_offset);
		context.scale(hor, vert);	
		
		context.translate(imgScaledWidth/2, canvas_height/2);
		context.rotate(rotation * Math.PI / 180);			
		context.translate(-imgScaledWidth/2, -canvas_height/2);
		
		context.drawImage(img, 0, 0, imgScaledWidth, canvas_height);
	}

	function set_zoom(){
		if (pulse != 0){
			applied_zoom = zoom * (1 + (1 + Math.cos(pulse_counter)) / 16)
			pulse_counter += pulse / 300;
		}
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


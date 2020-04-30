
const SIZE = 1.5;
let rotation = 0;
let speed = 1;

let horizontal_images = 4;
let vertical_images = 2;
let total_images = horizontal_images * vertical_images

let canvas_holder, canvas_width, canvas_height, imgScaledWidth;

let canvasses = []
let img = new Image();

window.addEventListener('DOMContentLoaded', (event) => {
	set_image("./images/transformation_square_500.jpg");

	canvas_holder = document.getElementById('canvasses')
	canvas_width = canvas_holder.getBoundingClientRect().width / horizontal_images
	canvas_height = canvas_holder.getBoundingClientRect().height / vertical_images

	create_canvases()
	start()
});

function create_canvases(){
	for (let a=0; a<total_images; a++){
		canvas = document.createElement('canvas')
		let context = canvas.getContext("2d")
		canvas.width = canvas_width
		canvas.height = canvas_height

		canvasses.push({canvas, context});
		canvas_holder.appendChild(canvas);
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
		hor = -SIZE;
		width_offset = canvas_width-(canvas_width-imgScaledWidth*SIZE)/2;	
	}
	else {		
		hor = SIZE;
		width_offset = (canvas_width-imgScaledWidth*SIZE)/2;
	}

	if (top) {
		vert = SIZE;		
		height_offset = (canvas_height-canvas_height*SIZE)/2;
	}
	else {
		vert = -SIZE;
		height_offset = canvas_height-(canvas_height-canvas_height*SIZE)/2;
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




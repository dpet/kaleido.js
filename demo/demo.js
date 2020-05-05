
let parent_div = document.getElementById('kaleido_1')
let parent_div_2 = document.getElementById('kaleido_2')
let used_parent_div = parent_div;

let image_select = document.getElementById('image_select')

let horizontal_num = document.getElementById('horizontal_num')
let vertical_num = document.getElementById('vertical_num')
let speed_input = document.getElementById('speed_input')
let zoom_input = document.getElementById('zoom_input')
let pulse_input = document.getElementById('pulse_input')
let start_angle = document.getElementById('start_angle')

let form = document.getElementById('control_form')
form.addEventListener('submit', apply_changes)
image_select.addEventListener('change', apply_changes)

let fullscreen_button = document.getElementById('fullscreen')
fullscreen_button.addEventListener('click', toggle_fullscreen)

let fullscreen = true;

let show_button = document.getElementById('dot')
show_button.addEventListener('click', toggle_control)

let apply_button = document.getElementById('apply_button')

apply_changes()

function apply_changes(event){
	if (event)
		event.preventDefault();
	let config = {}

	if (horizontal_num.value){
		if (horizontal_num.value > 25)
			horizontal_num.value = 25

		config.horizontal_num = horizontal_num.value
	}
	if (vertical_num.value){
		if (vertical_num.value > 20)
			vertical_num.value = 20

		config.vertical_num = vertical_num.value
	}
	if (zoom_input.value)
		config.zoom = zoom_input.value
	if (pulse_input.value)
		config.pulse = pulse_input.value
	if (speed_input.value)
		config.speed = speed_input.value
	if (start_angle.value)
		config.start_angle = start_angle.value

	let image_path = './images/' + image_select.value + '.jpeg'

	holder = used_parent_div.children[0]

	if (holder){
		holder.setAttribute('data-stop', 'true');
		holder.remove();
	}

	kaleido_start(used_parent_div, image_path, config)
}

function toggle_control(){
	if (getComputedStyle(form, null).display === 'flex'){
		form.style.display = 'none'
		show_button.style.opacity = '.5'
	}
	else{
		form.style.display = 'flex'
		show_button.style.opacity = '1'
	}
}

function toggle_fullscreen(e){
	e.preventDefault();

	if (fullscreen){
		parent_div.style.display = 'none'
		parent_div_2.style.display = 'block'
		used_parent_div = parent_div_2
		fullscreen_button.innerHTML = 'Inner'
	}
	else{
		parent_div.style.display = 'block'
		parent_div_2.style.display = 'none'
		used_parent_div = parent_div
		fullscreen_button.innerHTML = 'Fullscreen'
	}

	fullscreen = !fullscreen;
	apply_changes()
}
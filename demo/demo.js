
let parent_div = document.getElementById('kaleido_1')

let image_select = document.getElementById('image_select')

let horizontal_num = document.getElementById('horizontal_num')
let vertical_num = document.getElementById('vertical_num')
let speed_input = document.getElementById('speed_input')
let zoom_input = document.getElementById('zoom_input')
let start_angle = document.getElementById('start_angle')

let form = document.getElementById('control_form')
form.addEventListener('submit', apply_changes)
image_select.addEventListener('change', apply_changes)

let show_button = document.getElementById('dot')
show_button.addEventListener('click', toggle_control)

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
	if (speed_input.value)
		config.speed = speed_input.value
	if (start_angle.value)
		config.start_angle = start_angle.value

	let image_path = '../images/' + image_select.value + '.jpeg'

	let holder = parent_div.children[0]
	if (holder){
		holder.setAttribute('data-stop', 'true');
		holder.remove();
	}

	kaleido_start(parent_div, image_path, config)
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
# kaleido

This is a simple script that adds a kaleidoscope effect to a div. Just a pass the function a div, an image and a config object.

## use

```
<div id="kaleido_1" style="width:100%; height:100vh;"></div>

<script src="./kaleido.js"></script>
<script>
	window.addEventListener('DOMContentLoaded', (event) => {
		kaleido_start(document.getElementById('kaleido_1'), './flower2.jpeg', {
			zoom: 1.5,
			start_angle: 0,
			speed: 4,
			horizontal_num: 4,
			vertical_num: 2,
		})
	})
</script>
```

## notes

The image used should be square, the extra length of the longer side will be unused if not.

Smaller images are easier on the hosts computer, I scaled the demo images to 600px x 600px.

The animation continues to run when the div isn't on the screen, this should be optimized later.

There are no mobile fallbacks so you need to add your own, ie. put an image in the div instead of calling kaleido_start().


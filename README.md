# kaleido

This is a simple script that adds a kaleidoscope effect to a div. Just a pass the function a div, an image and a config object. All you need is the kaleido.js file.

## Use

```html
<div id="kaleido_1" style="width:100%; height:100vh;"></div>

<script src="./kaleido.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', (event) => {
    kaleido_start(document.getElementById('kaleido_1'), './flower2.jpeg', {
      zoom: 1.5,
      start_angle: 0,
      speed: 4,
      pulse: 2,
      horizontal_num: 4,
      vertical_num: 2,
    })
  })
</script>
```

## config

if the config object isn't passed or any of the properties aren't passed then defaults will be used;

- zoom
	- default: 1.6 
	- stretches the image so it covers the canvas when rotated. A zoom of 1 leaves the image at the size of the canvas so the background can be seen when it turns. How much the image should be zoomed depends on the shape of the canvas, if it is rectangle then the image may need to be zoomed more. If you zoom too much then the image will be pixelated.

- start_angle
	- default: 0
	- starts with image already rotated to a certain degree. Use 180 to have it upside down etc.

- speed
	- default: 1
	- how fast it rotates.
	- negative rotates the oposite way.

- pulse
	- default: 0
	- causes the image to zoom in and out smoothly. 1 is very subtle and 10 makes it very obvious.
	- the value changes the speed that it pulses, not the amount that it zooms in

- horizontal_num
	- default: 4
	- how many images are fit into a row.

- vertical_num
	- default: 2
	- how many images are fit into a column.

## links

See https://www.danielpetersen.ca/demo/kaleido for a demo project that lets you experiment with different arrangements. 

A simple page https://www.danielpetersen.ca/demo/flower

Another one https://www.danielpetersen.ca/demo/cloud

Another one https://www.danielpetersen.ca/demo/liquid

## Notes

The image used should be square, the extra length of the longer side will be unused if not. Width is used in some calculations so you may need to zoom more if the image is a rectangle.

Smaller images are easier on the hosts computer, I scaled the demo images to 600px x 600px.

The animation stops when the div is scrolled off screen or when a different tab is visible in the browser.

There are no mobile fallbacks so you need to add your own, ie. put an image in the div instead of calling kaleido_start().

Scrollbars can cause issues with the sizing so adding 'overflow: hidden' to the passed in div can help.



# kaleido

This is a simple script that adds a kaleidoscope effect to a div. Just a pass the function a div, an image and a config object.

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
      horizontal_num: 4,
      vertical_num: 2,
    })
  })
</script>
```

## links

See https://www.danielpetersen.ca/kaleido for a demo project that lets you experiment with different arrangements. 

A simple page https://www.danielpetersen.ca/flower

Another one https://www.danielpetersen.ca/cloud

Another one https://www.danielpetersen.ca/liquid

## Notes

The image used should be square, the extra length of the longer side will be unused if not.

Smaller images are easier on the hosts computer, I scaled the demo images to 600px x 600px.

The animation continues to run when the div isn't on the screen, this should be optimized later.

There are no mobile fallbacks so you need to add your own, ie. put an image in the div instead of calling kaleido_start().

The zoom property in the config object may be necessary to stretch the image over the full area of the canvas. If there is white space then increase the zoom. If you zoom too much ten the image will be pixelated. 


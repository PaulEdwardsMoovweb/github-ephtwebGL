/*
 * remix by Paul E.
 * based on:
 *
 *  http://www.html5rocks.com/en/tutorials/getusermedia/intro/
 *  https://github.com/jaysalvat/jquery.facedetection
 *
 * will only work on chrome unless i fix getUserMedia to be cross browser - modernizer?
 *
 *
 */

var ranOnce = false;
var localMediaStream;
var canvas;
var ctx;

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var errorCallback = function(e) {
	console.log('Reeeejected!', e);
};

$(document).ready(function() {
	if ($('.mw_error').length > 0 && !ranOnce) {
		ranOnce = true;

		var video = document.querySelector('video');
		var canvas = document.querySelector('canvas');
		var ctx = canvas.getContext('2d');
		var localMediaStream = null;

		function snapshot() {
			if (localMediaStream) {
				ctx.drawImage(video, 0, 0);
				// "image/webp" works in Chrome.
				// Other browsers will fall back to image/png.
				//console.log(canvas.toDataURL('image/webp'));
				$('canvas').width($('video').width());
				$('canvas').height($('video').height());
				
				$('#test').attr("src", canvas.toDataURL('image/png'));

				$('#test').width($('canvas').width());
				$('#test').height($('canvas').height());

				//now lets throw it through face detection
				//$(function() {
				var coords = $('#test1').faceDetection({
					complete : function() {
						console.log(coords);
					}
				});
			}
		}

		setInterval(function() {
			snapshot();
		}, 100)

		// Not showing vendor prefixes or code that works cross-browser.
		navigator.webkitGetUserMedia({
			video : true
		}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
			localMediaStream = stream;
		}, errorCallback);

	}
});


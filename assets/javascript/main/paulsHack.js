/*
 * remix by Paul E.
 * based on:
 *
 *  https://github.com/auduno/headtrackr
 *
 *
 */

var ranOnce = false;

$(document).ready(function() {
	if ($('.mw_error').length > 0 && !ranOnce) {
		ranOnce = true;
		var videoInput = document.getElementById('inputVideo');
		var canvasInput = document.getElementById('inputCanvas');

		var htracker = new headtrackr.Tracker();
		htracker.init(videoInput, canvasInput);
		htracker.start();

		document.addEventListener("facetrackingEvent", function(e) {
			
			//drawIdent(canvasCtx, e.x, e.y);
			//mouseX = e.x * 20;
			//mouseY = -e.y * 20;
			
			
// create a jQuery event
myEvent = $.Event('mousemove');

// set coordinates
myEvent.pageX = e.x * 10 - 1000;
myEvent.pageY = 0 - (e.y * 10) + 1500;
console.log('face track event fired: ' + myEvent.pageX + ',' + myEvent.pageY);
// trigger event - must trigger on document
$(document).trigger(myEvent);

		}, false);

//		document.addEventListener("headtrackingEvent", function(e) {
			//			mouseX = e.x * 20;
			//			mouseY = -e.y * 20;
	//	}, false);

	}
});


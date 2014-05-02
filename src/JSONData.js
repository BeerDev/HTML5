/*
 * BeerDev - HTML5 App
 * Initial version: 0.6
 * Christopher State
 */

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$.getJSON('../sortiment.json', function(data) {

var	gallery,
	el,
	i,
	page,
	dots = document.querySelectorAll('#nav li'),
	slides;

     var slides;

        for (var i in data) {
            slides = data;
        }

gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

// Load initial data
for (i=0; i<3; i++) {
	page = i==0 ? slides.length-1 : i-1;
	el = document.createElement('img');
	el.className = 'loading';
	el.src = slides[page].URL;
	el.onload = function () { this.className = ''; }
	gallery.masterPages[i].appendChild(el);

	el = document.createElement('div');
	el.className = "namn";
	el.innerHTML = slides[page].Artikelnamn;
	gallery.masterPages[i].appendChild(el)

	el = document.createElement('div');
	el.className = "pris";
	el.innerHTML = slides[page].Utpris;
	gallery.masterPages[i].appendChild(el);

	el = document.createElement('div');
	el.className = "info";
	el.innerHTML = slides[page].Info;
	gallery.masterPages[i].appendChild(el);
}

gallery.onFlip(function () {
	var el,
		upcoming,
		i;

	for (i=0; i<3; i++) {
		upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

		if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
			el = gallery.masterPages[i].querySelector('img');
			el.className = 'loading';
			el.src = slides[upcoming].URL;
			
			el = gallery.masterPages[i].querySelector('.namn');
			el.className = 'namn';
			el.innerHTML = slides[upcoming].Artikelnamn;

			el = gallery.masterPages[i].querySelector('.pris');
			el.className = 'pris';
			el.innerHTML = slides[upcoming].Utpris;

			el = gallery.masterPages[i].querySelector('.info');
			el.className = 'info';
			el.innerHTML = slides[upcoming].Info;
		}
	}
	
});

//setInterval(function () { gallery.next(); }, 10000);

gallery.onMoveOut(function () {
	gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
});

gallery.onMoveIn(function () {
	var className = gallery.masterPages[gallery.currentMasterPage].className;
	/(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
});

  });
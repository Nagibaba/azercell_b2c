'use strict';
////// POPUP

var popup = document.querySelector('.b-card--popup');
var fullContainer = document.querySelector('.full-container');
var showPopup = function showPopup() {
	popup.style.display = '';
	fullContainer.classList.add('blur');
};

(function () {

	var body = document.body;
	var burgerMenu = document.getElementsByClassName('b-menu')[0];
	var burgerContain = document.getElementsByClassName('b-burger')[0];
	var burgerNav = document.getElementsByClassName('b-nav')[0];
	// console.log([body, burgerContain, burgerNav])
	if (burgerContain) {
		burgerContain.addEventListener('click', function toggleClasses() {
			[body, burgerContain, burgerNav].forEach(function (el) {
				el.classList.toggle('open');
			});
		}, false);
	}

	//  hover img

	var imgs = document.getElementsByClassName('img-hover');
	Array.from(imgs).forEach(function (e) {
		e.parentNode.onmouseenter = function () {
			var src = e.src;
			e.src = e.getAttribute('hover-img');
			e.setAttribute('hover-img', src);
		};
		e.parentNode.onmouseleave = function () {
			var src = e.src;
			e.src = e.getAttribute('hover-img');
			e.setAttribute('hover-img', src);
		};
	});

	//show contacts
	var contacts = document.querySelector('.b-card__contacts');
	var contactButton = document.querySelector('.b-contact__button');

	if (contactButton) {
		contactButton.onclick = function (e) {
			contacts.style.display = 'block';
		};

		document.body.onclick = function (e) {
			// console.log()
			if (e.target.className.indexOf('b-contact__button') === -1 && getClosest(e.target, '.b-card__contacts') === null) contacts.style.display = 'none';

			if (e.target.className.indexOf('popup-button') === -1 && getClosest(e.target, '.b-card--popup') === null || e.target.className.indexOf('close-popup') > -1) {
				popup.style.display = 'none';
				fullContainer.classList.remove('blur');
			}
		};
	}

	var getClosest = function getClosest(elem, selector) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				    i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
		}

		// Get the closest matching element
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (elem.matches(selector)) return elem;
		}
		return null;
	};

	//Add contact to input
	var contact = document.querySelectorAll('.b-contact__item');
	// console.log(contact)

	NodeList.prototype.onclick = function (c) {

		Array.from(this).forEach(function (t) {
			t.onclick = function () {
				c(t);
			};
		});
	};

	contact.onclick(function (t) {
		var number = t.querySelector('.b-contact__item-number');
		number = number.innerText || number.textContent;
		number = number.substring(1);
		document.querySelector('.phone-number-area').value = number;
		contacts.style.display = 'none';
	});

	// show CRUD buttons

	var showIcons = document.querySelectorAll('.show-crud-icons');

	if (showIcons) {
		Array.from(showIcons).forEach(function (s) {
			var contactIcons = s.parentNode.querySelector('.b-contact__icons');
			s.addEventListener('click', function () {
				s.style.display = 'none';
				contactIcons.style.display = 'block';
			});
		});
	}

	// tabs

	var tabLinks = new Array();
	var contentDivs = new Array();

	function init() {

		// Grab the tab links and content divs from the page
		// let firstTab = document.querySelector('.tabs');
		// const tabs = document.querySelector('.tabs')
		var tabs = document.querySelectorAll('.tabs');

		// check if tabs  exist
		// if (tabs.length==0) return;

		Array.from(tabs).forEach(function (tab) {

			var tabListItems = tab.childNodes;
			for (var i = 0; i < tabListItems.length; i++) {
				if (tabListItems[i].nodeName == "A") {
					var tabLink = tabListItems[i];
					var id = getHash(tabLink.getAttribute('href'));
					tabLinks[id] = tabLink;
					contentDivs[id] = document.getElementById(id);
				}
			}

			// Assign onclick events to the tab links, and
			// highlight the first tab
			var i = 0;

			for (var id in tabLinks) {
				tabLinks[id].onclick = showTab;
				tabLinks[id].onfocus = function () {
					this.blur();
				};
				if (i == 0) tabLinks[id].classList.add('tab--active');
				i++;
			}

			// Hide all content divs except the first
			var i = 0;

			for (var id in contentDivs) {
				if (i != 0) contentDivs[id].classList.add('hide');
				i++;
			}
		});
	}

	function showTab(e) {
		e.preventDefault;
		var selectedId = getHash(this.getAttribute('href'));

		// Highlight the selected tab, and dim all others.
		// Also show the selected content div, and hide all others.
		for (var id in contentDivs) {
			if (id == selectedId) {
				tabLinks[id].classList.add('tab--active');
				contentDivs[id].classList.remove('hide');
			} else {
				tabLinks[id].classList.remove('tab--active');
				contentDivs[id].classList.add('hide');
			}
		}

		// Stop the browser following the link
		return false;
	}

	function getFirstChildWithTagName(element, tagName) {
		for (var i = 0; i < element.childNodes.length; i++) {
			if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
		}
	}

	function getHash(url) {
		var hashPos = url.lastIndexOf('#');
		return url.substring(hashPos + 1);
	}

	init();

	function clearSelection() {
		if (document.selection && document.selection.empty) {
			document.selection.empty();
		} else if (window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
		}
	}
	var toNodes = function toNodes(html) {
		return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
	};
	var expandCard = function expandCard(e) {
		e.preventDefault;
		clearSelection();
		this.style.display = 'none';
		var parentCard = getClosest(this, '.b-card');
		var cardTop = parentCard.querySelector('.b-card__top--right');
		if (cardTop) cardTop.style.display = 'block';
		parentCard.classList.toggle('b-card--shrink');
	};

	var expandCardIcon = toNodes('<img class="img img__icon pull-right no-margin expand-card-icon" src="./img/icons/code.svg" style="width:20px;height: auto">');
	var cardTop = document.querySelectorAll('.b-card__top:not(.no-expand)');
	var cardTopRight = document.querySelectorAll('.b-card__top--right');
	if (cardTop) {
		Array.from(cardTopRight).forEach(function (el) {
			el.style.display = 'none';
		});
		Array.from(cardTop).forEach(function (el) {
			// shrink inner side of card

			el.parentNode.classList.add('b-card--shrink');

			var expandCardIconClone = expandCardIcon.cloneNode();

			el.appendChild(expandCardIconClone);

			getClosest(expandCardIconClone, '.b-card__top').addEventListener('click', expandCard.bind(expandCardIconClone));
		});
	}
})();

///

window.onload = function () {
	var slider = document.querySelector('.b-card__slider');
	var sliderContents = document.querySelectorAll('.b-card__slider-content');
	var dotsDOM = document.querySelector('.b-card__dots');
	var currentSlider = 0;
	// HTMLCollection.prototype.removeClass = function(c){
	// 	Array.from(this).forEach(e=>{
	// 		e.classList.remove(c)
	// 	})
	// }

	if (slider) {
		var dotClick = function dotClick(num) {
			sliderContents[currentSlider].classList.remove('active'); // IE9+

			dots[currentSlider].classList.remove('active'); // IE9+
			this.classList.add('active');
			currentSlider = num;
			sliderContents[num].classList.add('active');
		};

		for (var i = 0; i < sliderContents.length; ++i) {

			var dot = document.createElement('span');
			dot.setAttribute('class', 'dot');
			dot.onclick = dotClick.bind(dot, i);
			dotsDOM.appendChild(dot);
		}

		var dots = dotsDOM.getElementsByClassName('dot');
		dots[0].className += ' active';
	}
};
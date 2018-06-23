'use strict';
////// POPUP
const popup = document.querySelector('.b-card--popup')
const fullContainer = document.querySelector('.full-container')
const showPopup = () => {
	popup.style.display = ''
	fullContainer.classList.add('blur')

}

(function() {
	

    
	var body = document.body;
	var burgerMenu = document.getElementsByClassName('b-menu')[0];
	var burgerContain = document.getElementsByClassName('b-burger')[0];
	var burgerNav = document.getElementsByClassName('b-nav')[0];
	// console.log([body, burgerContain, burgerNav])
	if(burgerContain){
		burgerContain.addEventListener('click', function toggleClasses() {
			[body, burgerContain, burgerNav].forEach(function (el) {
		  		el.classList.toggle('open');
			});
		}, false);
	}


	//  hover img

	const imgs = document.getElementsByClassName('img-hover')
	Array.from(imgs).forEach(e=>{
		e.parentNode.onmouseenter = ()=>{
			let src = e.src
			e.src = e.getAttribute('hover-img')
			e.setAttribute('hover-img', src)
		}
		e.parentNode.onmouseleave = ()=>{
			let src = e.src
			e.src = e.getAttribute('hover-img')
			e.setAttribute('hover-img', src)
		}
	})



	//show contacts
	const contacts = document.querySelector('.b-card__contacts')
	const contactButton = document.querySelector('.b-contact__button')

	if(contactButton){
		contactButton.onclick = e=>{
			contacts.style.display = 'block'
		}

		document.body.onclick = e=>{
			// console.log()
			if(e.target.className.indexOf('b-contact__button')===-1 && getClosest(e.target, '.b-card__contacts')===null ) contacts.style.display = 'none'

			if((e.target.className.indexOf('popup-button')===-1 && getClosest(e.target, '.b-card--popup')===null) || e.target.className.indexOf('close-popup')>-1) {
					popup.style.display = 'none'
					fullContainer.classList.remove('blur')
			}
		}

	}

	const getClosest = (elem, selector) => {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
		    Element.prototype.matches =
		        Element.prototype.matchesSelector ||
		        Element.prototype.mozMatchesSelector ||
		        Element.prototype.msMatchesSelector ||
		        Element.prototype.oMatchesSelector ||
		        Element.prototype.webkitMatchesSelector ||
		        function(s) {
		            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
		                i = matches.length;
		            while (--i >= 0 && matches.item(i) !== this) {}
		            return i > -1;
		        };
		}

		// Get the closest matching element
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}
		return null;

	};



	//Add contact to input
	const contact = document.querySelectorAll('.b-contact__item')
	// console.log(contact)

	NodeList.prototype.onclick = function(c){

		Array.from(this).forEach(t=>{
			t.onclick = ()=>{c(t)}
		})
		
	} 

	contact.onclick(
		(t)=>{
			let number = t.querySelector('.b-contact__item-number')
			number = number.innerText || number.textContent
			number = number.substring(1)
			document.querySelector('.phone-number-area').value = number
			contacts.style.display = 'none'
		}
			
	)



	
	// show CRUD buttons

	const showIcons = document.querySelectorAll('.show-crud-icons')
	

	if (showIcons) {
		Array.from(showIcons).forEach(s=>{
			const contactIcons = s.parentNode.querySelector('.b-contact__icons')
			s.addEventListener('click', ()=>{
				s.style.display = 'none'
				contactIcons.style.display = 'block'

			})
		})
		
	}

	// tabs

	var tabLinks = new Array();
	var contentDivs = new Array();

	function init() {

	  // Grab the tab links and content divs from the page
	  // let firstTab = document.querySelector('.tabs');
	  // const tabs = document.querySelector('.tabs')
	    const tabs = document.querySelectorAll('.tabs')

		// check if tabs  exist
		// if (tabs.length==0) return;

	    Array.from(tabs).forEach(tab=>{


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
		    tabLinks[id].onfocus = function() {
		      this.blur()
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

		})
	}

	function showTab(e) {
	  e.preventDefault
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
	    if(document.selection && document.selection.empty) {
	        document.selection.empty();
	    } else if(window.getSelection) {
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	    }
	}
	const toNodes = html => new DOMParser().parseFromString(html, 'text/html').body.childNodes[0]
	const expandCard = function(e) {
		e.preventDefault
		clearSelection()
		this.style.display = 'none'
		const parentCard = getClosest (this, '.b-card')
		const cardTop = parentCard.querySelector('.b-card__top--right')
		if(cardTop) cardTop.style.display = 'block'
		parentCard.classList.toggle('b-card--shrink')
	}

	const expandCardIcon= toNodes('<img class="img img__icon pull-right no-margin expand-card-icon" src="./img/icons/code.svg" style="width:20px;height: auto">')
	const cardTop = document.querySelectorAll('.b-card__top:not(.no-expand)')
	const cardTopRight = document.querySelectorAll('.b-card__top--right')
	if(cardTop){
		Array.from(cardTopRight).forEach(el=>{
			el.style.display = 'none'
		})
		Array.from(cardTop).forEach(el=>{
			// shrink inner side of card

			el.parentNode.classList.add('b-card--shrink')

			const expandCardIconClone = expandCardIcon.cloneNode();
			
			el.appendChild(expandCardIconClone)

			getClosest(expandCardIconClone, '.b-card__top').addEventListener('click', expandCard.bind(expandCardIconClone))
		})
	}

})();



///

window.onload = function(){
	const slider = document.querySelector('.b-card__slider')
	const sliderContents = document.querySelectorAll('.b-card__slider-content')
	const dotsDOM = document.querySelector('.b-card__dots')
	let currentSlider = 0
	// HTMLCollection.prototype.removeClass = function(c){
	// 	Array.from(this).forEach(e=>{
	// 		e.classList.remove(c)
	// 	})
	// }

	if(slider){
		for (let i = 0; i < sliderContents.length; ++i) {

			const dot = document.createElement('span')
			dot.setAttribute('class','dot')
			dot.onclick =  dotClick.bind(dot, i);
			dotsDOM.appendChild(dot)

		}

		const dots = dotsDOM.getElementsByClassName('dot')
		dots[0].className += ' active'

		function dotClick(num) {
			sliderContents[currentSlider].classList.remove('active') // IE9+
			
			dots[currentSlider].classList.remove('active') // IE9+
			this.classList.add('active')
			currentSlider = num
			sliderContents[num].classList.add('active')
		}
	}

	
}
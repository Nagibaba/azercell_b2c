import 'babel-polyfill'
'use strict'
////// POPUP


function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(function() {

	// Object.prototype.changeStyle = () => {
	// 	if(this) 
	// }

	const popupButton = document.querySelector('.popup-button')
	const popup = document.querySelector('.b-card--popup')
	const fullContainer = document.querySelector('.full-container')
	
	const showPopup = () => {
		if(popup) popup.style.display = ''
		if(fullContainer) fullContainer.classList.add('blur')

	}
	if(popupButton){
		popupButton.addEventListener('click', e=>{
			e.preventDefault()
			showPopup()
		})
	}
	

    
	var body = document.body
	var burgerMenu = document.getElementsByClassName('b-menu')[0]
	var burgerContain = document.getElementsByClassName('b-burger')[0]
	var burgerNav = document.getElementsByClassName('b-nav')[0]
	// console.log([body, burgerContain, burgerNav])
	if(burgerContain){
		burgerContain.addEventListener('click', function toggleClasses() {
			[body, burgerContain, burgerNav].forEach(function (el) {
		  		el.classList.toggle('open')
			})
		}, false)
	}


	//  hover img
	Element.prototype.appendAfter = function (element) {
	  element.parentNode.insertBefore(this, element.nextSibling)
	},false

	const imgs = document.getElementsByClassName('img-hover')
	Array.from(imgs).forEach(e=>{
		// const newImg = new Image
		// newImg.src = e.getAttribute('hover-img')
		const parent = e.parentNode
		const hiddenImg = e.cloneNode()
		hiddenImg.src = e.getAttribute('hover-img')
		hiddenImg.style.display = 'none'
		hiddenImg.appendAfter(e)
		parent.onmouseenter = ()=>{
			e.style.display = 'none'
			hiddenImg.style.display = ''
		}
		parent.onmouseleave = ()=>{		
			e.style.display = ''
			hiddenImg.style.display = 'none'
		}

		e.parentNode.onmouseenter()
		e.parentNode.onmouseleave()
	})



	//show contacts
	
	const allContacts = document.querySelectorAll('.b-card__contacts')
	const contactButton = document.querySelectorAll('.b-contact__button')
	
	// console.log(allDropdowns)
	if(contactButton.length>0){
		Array.from(contactButton).forEach(el=>{
			const contacts = el.parentNode.querySelector('.b-card__contacts')
			el.onclick = e=>{
				contacts.style.display = 'block'
			}
		})
	}

	// for every element that must lose blur by clicking others
	document.body.onclick = e=>{
		// console.log()

		// for contacts tooltip
		if(allContacts.length>0 
			&& e.target.className.indexOf('b-contact__button')===-1 
			&& getClosest(e.target, '.b-card__contacts')===null
		){ 
			Array.from(allContacts).forEach(c=>{
				c.style.display = 'none'
			})
		}


		// for blur effect
		if(	popup
			&& 
			(
				(e.target.className.indexOf('popup-button')===-1 
				&& getClosest(e.target, '.b-card--popup')===null
				) 
				|| e.target.className.indexOf('close-popup')>-1
			) 
		){

			popup.style.display = 'none'
			fullContainer.classList.remove('blur')
		}

		// for material selects
		const allDropdowns = document.querySelectorAll('.material-select__options--visible')
		if(allDropdowns.length>0 && e.target.nodeName!='SELECT'){
			Array.from(allDropdowns).forEach(d=>{
				d.classList.remove('material-select__options--visible')
			})
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
		                i = matches.length
		            while (--i >= 0 && matches.item(i) !== this) {}
		            return i > -1
		        }
		}

		// Get the closest matching element
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}
		return null;

	}



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
			getClosest(t,'.b-card__form-row').querySelector('.phone-number-area').value = number
			Array.from(allContacts).forEach(c=>{
				c.style.display = 'none'
			})
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

	var tabLinks = new Array()
	var contentDivs = new Array()

	function init() {

	  // Grab the tab links and content divs from the page
	  // let firstTab = document.querySelector('.tabs')
	  // const tabs = document.querySelector('.tabs')
	    const tabs = document.querySelectorAll('.tabs')

		// check if tabs  exist
		// if (tabs.length==0) return

	    Array.from(tabs).forEach(tab=>{


		  var tabListItems = tab.childNodes
		  for (let i = 0; i < tabListItems.length; i++) {
		    if (tabListItems[i].nodeName == "A") {
		      var tabLink = tabListItems[i]
		      var id = getHash(tabLink.getAttribute('href'))
		      tabLinks[id] = tabLink
		      contentDivs[id] = document.getElementById(id)
		    }
		  }

		  // Assign onclick events to the tab links, and
		  // highlight the first tab
		  let i = 0

		  for (let id in tabLinks) {
		    tabLinks[id].onclick = showTab
		    tabLinks[id].onfocus = function() {
		      this.blur()
		    }
		    if (i == 0) tabLinks[id].classList.add('tab--active');
		    i++
		  }

		  // Hide all content divs except the first
		  i = 0

		  for (let id in contentDivs) {
		    if (i != 0) contentDivs[id].classList.add('hide')
		    i++
		  }

		})
	}

	function showTab(e) {
	  e.preventDefault
	  var selectedId = getHash(this.getAttribute('href'))

	  // Highlight the selected tab, and dim all others.
	  // Also show the selected content div, and hide all others.
	  for (let id in contentDivs) {
	    if (id == selectedId) {
	      tabLinks[id].classList.add('tab--active')
	      contentDivs[id].classList.remove('hide')
	    } else {
	      tabLinks[id].classList.remove('tab--active')
	      contentDivs[id].classList.add('hide')
	    }
	  }

	  // Stop the browser following the link
	  return false
	}

	function getFirstChildWithTagName(element, tagName) {
	  for (var i = 0; i < element.childNodes.length; i++) {
	    if (element.childNodes[i].nodeName == tagName) return element.childNodes[i]
	  }
	}

	function getHash(url) {
	  var hashPos = url.lastIndexOf('#')
	  return url.substring(hashPos + 1)
	}

	init()

	function clearSelection() {
	    if(document.selection && document.selection.empty) {
	        document.selection.empty()
	    } else if(window.getSelection) {
	        var sel = window.getSelection()
	        sel.removeAllRanges()
	    }
	}
	function animate(from=0, to=100, ms=1000, continuingCb, endedCb) {
		// console.time()
		// console.log(ms)
		const animationInterval = Math.round(ms/(ms/1000*24))
		const changingRate = Math.round((to-from)/(ms/1000*24))
		let expanding
		if(from < to) {
        	expanding = true  // update parameters
        } else {
        	expanding = false  // update parameters
        }
	    function frame() {
	    	

	    	
	    	
	        if(expanding) {
	        	from += changingRate
	        } else {
	        	from += changingRate
	        }

	        continuingCb(from)

	        if ((expanding && from > to) 
	        || (!expanding && from < to)){  // check finish condition
	            clearInterval(id)
	        	// console.timeEnd()
	        	endedCb()

	    	}
	        
	         // show frame
	        
	    }
	    var id = setInterval(frame, animationInterval) // draw every * ms
	}
	const toNodes = html => new DOMParser().parseFromString(html, 'text/html').body.childNodes[0]
	const expandCard = function(inner, innerInitialHeight, e) {
		e.preventDefault
		clearSelection()

		// if (this.style.display!='none')
		// 	this.style.display = 'none'
		// else this.style.display = ''
		const parentCard = getClosest (this, '.b-card')
		// 
		
		// console.log(innerInitialHeight)

		if(parentCard.classList.contains('b-card--shrink')){

			animate(0, innerInitialHeight, 100,
				function(num){
					inner.style.maxHeight = num + 'px'
				},	
				function(){
					parentCard.classList.remove('b-card--shrink')
				}
			)

		} else {
			animate(innerInitialHeight, 0, 100,
				function(num){
					inner.style.maxHeight = num + 'px'
				},	
				function(){
					// parentCard.classList.remove('b-card--shrink')
					inner.style.maxHeight = 0
				}
			)
			parentCard.classList.add('b-card--shrink')

		}
			
		
		

		const cardTop = parentCard.querySelector('.b-card__top--right')
		if (cardTop) {
			if (this.style.display!='none'){
				this.style.display = 'none'
				cardTop.style.display = 'block'
			} else {
				this.style.display = ''
				cardTop.style.display = 'none'
			}
			
		}
	}

	 /// corrected expanding effect
	const expandCardIcon= toNodes('<img class="img img__icon pull-right no-margin rotate-90 expand-card-icon" src="./img/icons/code.svg" style="width:20px;height: auto">')
	const cardTop = document.querySelectorAll('.b-card__top:not(.no-expand)')
	const cardTopRight = document.querySelectorAll('.b-card__top--right')
	if(cardTop.length>0){

		// let ruleString = ''
		
		let addClickListenerToExpandCard


		(addClickListenerToExpandCard = function(){
			Array.from(cardTop).forEach((el, i)=>{
				// shrink inner side of card
				// adding max height for transition effect

				const parent = el.parentNode
				const inner = parent.querySelector('.b-card__inner')
				inner.style.maxHeight = 'fit-content'
				const innerInitialHeight = parent.querySelector('.b-card__inner').offsetHeight // we do it here to get the height before shrinking
				// if(innerHeight>higherInner) higherInner = innerHeight
				// console.log(elHeight)
				// ruleString += '.b-card__inner:nth-of-type(' + i + '){max-height: ' + elHeight + 'px}'
				// el.style.maxHeight = elHeight
				// console.log(innerInitialHeight)

				parent.classList.add('b-card--shrink')
				inner.style.maxHeight = 0

				const expandCardIconClone = expandCardIcon.cloneNode()
				
				el.appendChild(expandCardIconClone)

				const thisCardTop = getClosest(expandCardIconClone, '.b-card__top')
				
				// thisCardTop.removeEventListener('click', expandOrShrink)
				// thisCardTop.addEventListener('click', expandOrShrink)
				thisCardTop.onclick = expandCard.bind(expandCardIconClone, inner, innerInitialHeight)
			})

			Array.from(cardTopRight).forEach(el=>{
				el.style.display = 'none'
			})
		})()

		

		


		let resizeTimer
		window.onresize = function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {

				addClickListenerToExpandCard()
			        
			}, 250);
		}
	}


	const bNavHeader = document.querySelector('.b-nav__header')
	let bNavHeaderText = document.querySelector('b-nav__header')
	if(bNavHeader && bNavHeaderText){
		bNavHeaderText = bNavHeaderText.innerText || bNavHeaderText.textContent
		bNavHeader.innerText = bNavHeaderText
	}


	//  change page button
	// let page = 1
	// let url = window.location.href
	// let page = parseInt(url.substring(url.indexOf('.html')-1, url.indexOf('.html'))
	// console.log(page+1)
	// let newUrl = url.replace
	// console.log(url)
	// const changePageBtn = '<a href="">'

	const switchCards = document.querySelectorAll('.b-card__inner--switch')
	
	if (switchCards.length>0) {
		const checkInputsAndAddActiveClass = (e, input, switchText)=>{
			if(!input) return false
			if (input.checked) {
				e.classList.add('b-card__inner--switch--checked')
				switchText.innerText = 'AKTİVDİR'
				switchText.classList.add('green')
			} else {
				e.classList.remove('b-card__inner--switch--checked')
				switchText.innerText = 'DEAKTİVDİR'
				switchText.classList.remove('green')

			}
		}
		
		Array.from(switchCards).forEach((e)=>{
			const input = e.querySelector('.switch__checkbox')
			const switchText = e.querySelector('.switch__text')

			checkInputsAndAddActiveClass(e, input, switchText)
			e.addEventListener('change', ()=>{
				checkInputsAndAddActiveClass(e, input, switchText)
			})
		})
	}

	const switches = document.querySelectorAll('.switch')

	if(switches.length>0){
		const checkInputsAndAddActiveClass2 = (e, input, switchText)=>{
			if(!input) return false
			if (input.checked) {
				e.classList.add('switch--success')
				switchText.innerText = switchText.getAttribute('opened-text')
				switchText.classList.add('switch__header-text--success')
			} else {
				e.classList.remove('switch--success')
				switchText.innerText = switchText.getAttribute('closed-text')
				switchText.classList.remove('switch__header-text--success')

			}
		}
		Array.from(switches).forEach((e)=>{
			const input = e.querySelector('.switch__checkbox')
			const switchText = e.querySelector('.switch__header-text')

			checkInputsAndAddActiveClass2(e, input, switchText)
			e.addEventListener('change', ()=>{
				checkInputsAndAddActiveClass2(e, input, switchText)
			})

		})
	}

	const clientMessage = document.querySelector('.client-message')
	if (clientMessage) {
		let count, messageCount
		const limit = 148
		const parent = clientMessage.parentNode
		const currentChars = parent.querySelector('.current-chars')
		const messageCountDOM = parent.querySelector('.message-count')
		clientMessage.onkeyup = function(){
			count = this.value.length
			currentChars.innerText = count
			
			messageCount = Math.floor((count-1)/limit)+1
			messageCountDOM.innerText = messageCount
			
			// if(count<=limit) messageCountDOM.innerText = 1
		}
	}


	/// stick footer bottom
	let stickFooterToBottom
	(stickFooterToBottom = ()=>{
		const footer = document.querySelector('.footer')
		const fullContainerHeight = fullContainer.offsetHeight
		const windowHeight = window.innerHeight

		if(windowHeight>fullContainerHeight){
			footer.style.marginTop = (windowHeight-fullContainerHeight-footer.offsetHeight)+'px'
		}

		const rules = document.querySelector('.b-card__rules')
		if(rules){
			rules.addEventListener('scroll', (event) =>
			{
			    const element = event.target;
			    if (element.scrollHeight - Math.round(element.scrollTop) === element.clientHeight)
			    {
			    	const iAcceptButton = document.querySelector('.i-accept-button')
			        if(iAcceptButton){
			        	iAcceptButton.disabled = false
			        }
			    }
			});
			
		}
	})()
	window.onresize = ()=>{
		stickFooterToBottom()
	}

	const selects = document.querySelectorAll('.material-select')
	Array.from(selects).forEach((s)=>{
		// const wrapper = document.createElement('div')
		// wrapper.className = 'inline-block-wrapper'
		// wrapper.appendChild(s)
		const dropdown = document.createElement('div')
		dropdown.className = 'material-select__options'

		const options = s.querySelectorAll('option')
		Array.from(options).forEach(o=>{
			const p = document.createElement('p') 
			p.className = 'material-select__option'
			p.setAttribute('value', o.value)
			p.innerHTML = o.text
			dropdown.appendChild(p)
			dropdown.appendAfter(s)
			p.onclick = (e)=>{
				s.value = o.value
				dropdown.classList.remove('material-select__options--visible')
			}
		})
		s.onmousedown = (e)=>{
			e.preventDefault()
			dropdown.classList.toggle('material-select__options--visible')

		}
		

	})


	const showOwe = document.querySelectorAll('.showOwe')
	const owe = document.querySelector('.owe')

	Array.from(showOwe).forEach(s=>{
		s.onclick = ()=>{
			s.parentNode.parentNode.style.display = 'none'
			owe.style.display='block'
		}
	})
	 

}) // document ready



///

window.onload = function(){
	class Swipe {
	    constructor(element) {
	        this.xDown = null
	        this.yDown = null
	        this.element = typeof(element) === 'string' ? document.querySelector(element) : element

	        this.element.addEventListener('touchstart', function(evt) {
	            this.xDown = evt.touches[0].clientX
	            this.yDown = evt.touches[0].clientY
	        }.bind(this), false)

	    }

	    onLeft(callback) {
	        this.onLeft = callback

	        return this
	    }

	    onRight(callback) {
	        this.onRight = callback

	        return this
	    }

	    onUp(callback) {
	        this.onUp = callback

	        return this
	    }

	    onDown(callback) {
	        this.onDown = callback

	        return this
	    }

	    handleTouchMove(evt) {
	        if ( ! this.xDown || ! this.yDown ) {
	            return
	        }

	        var xUp = evt.touches[0].clientX
	        var yUp = evt.touches[0].clientY

	        this.xDiff = this.xDown - xUp
	        this.yDiff = this.yDown - yUp

	        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
	            if ( this.xDiff > 0 ) {
	                this.onLeft()
	            } else {
	                this.onRight()
	            }
	        } else {
	            if ( this.yDiff > 0 ) {
	                this.onUp()
	            } else {
	                this.onDown()
	            }
	        }

	        // Reset values.
	        this.xDown = null
	        this.yDown = null
	    }

	    run() {
	        this.element.addEventListener('touchmove', function(evt) {
	            this.handleTouchMove(evt)
	        }.bind(this), false)
	    }
	}

	

	const slider = document.querySelector('.b-card__slider')
	const sliderContents = document.querySelectorAll('.b-card__slider-content')
	const dotsDOM = document.querySelector('.b-card__dots')
	const sliderHeaderDOM = document.querySelector('.b-card__header')

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
		const prevSliderButton = document.querySelector('.prev-slider-button')
		const nextSliderButton = document.querySelector('.next-slider-button')
		let buttonChangedToMain = false

		

		function dotClick(num) {
			sliderContents[currentSlider].classList.remove('active') // IE9+
			
			dots[currentSlider].classList.remove('active') // IE9+
			this.classList.add('active')
			currentSlider = num
			sliderContents[num].classList.add('active')
			sliderHeaderDOM.innerText = sliderContents[currentSlider].querySelector('b-header').innerText || sliderContents[currentSlider].querySelector('b-header').textContent

			if (currentSlider==dots.length-1) { //slider ended
				nextSliderButton.classList.remove('btn__material--hollow')
				nextSliderButton.classList.add('btn__material--full')
				const buttonDefText = nextSliderButton.innerText
				nextSliderButton.innerText = nextSliderButton.getAttribute('end-text')
				nextSliderButton.setAttribute('end-text', buttonDefText)
				buttonChangedToMain = true
			} else if(buttonChangedToMain){ //slider ended returned to previous slides
				nextSliderButton.classList.add('btn__material--hollow')
				nextSliderButton.classList.remove('btn__material--full')
				const buttonDefText = nextSliderButton.innerText
				nextSliderButton.innerText = nextSliderButton.getAttribute('end-text')
				nextSliderButton.setAttribute('end-text', buttonDefText)
				buttonChangedToMain = false
			} 

			if(currentSlider==0) prevSliderButton.style.display = 'none'
			else prevSliderButton.style.display = ''

		}

		var swiper = new Swipe('.b-card__slider')
		swiper.onLeft(function() { goNextSlider() })
		swiper.onRight(function() { goPrevSlider() })
		swiper.run();

		prevSliderButton.addEventListener('click', (e)=>{
			e.preventDefault()
			goPrevSlider()
		})
		nextSliderButton.addEventListener('click', (e)=>{
			e.preventDefault()
			
			goNextSlider()

		})

		const goPrevSlider = ()=>{
			if (currentSlider==0) return false

			dots[currentSlider-1].click()
		}
		const goNextSlider = ()=>{
			dots[currentSlider+1].click()
		}
		
	}

	
}
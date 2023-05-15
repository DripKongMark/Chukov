$(document).ready(function() {
	const $cont = $('.cont');
	const $slider = $('.slider');
	const $nav = $('.nav');
	const winW = $(window).width();
	const animSpd = 750; // Change also in CSS
	const distOfLetGo = winW * 0.2;
	let curSlide = 1;
	let animation = false;
	let autoScrollVar = true;
	let diff = 0;
	
	// Generating slides
	let arrCities = ['Amsterdam', 'Rome', 'New—York', 'Singapore', 'Prague']; // Change number of slides in CSS also
	let numOfCities = arrCities.length;
	let arrCitiesDivided = [];

	arrCities.map((city) => {
		let length = city.length;
		let letters = Math.floor(length / 4);
		let exp = new RegExp(".{1," + letters + "}", "g");
		
		arrCitiesDivided.push(city.match(exp));
	});
	
	let generateSlide = function(city) {
		let frag1 = $(document.createDocumentFragment());
		let frag2 = $(document.createDocumentFragment());
		const numSlide = arrCities.indexOf(arrCities[city]) + 1;
		const firstLetter = arrCitiesDivided[city][0].charAt(0);

		const $slide =
					$(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>
							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
						</div>`);

		const letter = 
					$(`<div class="slide__letter slide--${numSlide}__letter">
							${firstLetter}
						</div>`);

		for (let i = 0, length = arrCitiesDivided[city].length; i < length; i++) {
			const text = 
						$(`<div class="slide__text slide__text--${i + 1}">
								${arrCitiesDivided[city][i]}
							</div>`);
			frag1.append(text);
		}

		const navSlide = $(`<li data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></li>`);
		frag2.append(navSlide);
		$nav.append(frag2);

		$slide.find(`.slide--${numSlide}__text-wrapper`).append(letter).append(frag1);
		$slider.append($slide);

		if (arrCities[city].length <= 4) {
			$('.slide--'+ numSlide).find('.slide__text').css("font-size", "12vw");
		}
	};

	for (let i = 0, length = numOfCities; i < length; i++) {
		generateSlide(i);
	}

	$('.nav__slide--1').addClass('nav-active');

	// Navigation
	function bullets(dir) {
		$('.nav__slide--' + curSlide).removeClass('nav-active');
		$('.nav__slide--' + dir).addClass('nav-active');
	}
	
	function timeout() {
		animation = false;
	}
	
	function pagination(direction) {
		animation = true;
		diff = 0;
		$slider.addClass('animation');
		$slider.css({
			'transform': 'translate3d(-' + ((curSlide - direction) * 100) + '%, 0, 0)'
		});
		
		$slider.find('.slide__darkbg').css({
				'transform': 'translate3d(' + ((curSlide - direction) * 50) + '%, 0, 0)'
		});
		
		$slider.find('.slide__letter').css({
				'transform': 'translate3d(0, 0, 0)',
		});
		
		$slider.find('.slide__text').css({
			'transform': 'translate3d(0, 0, 0)'
		});
	}
	
	function navigateRight() {
		if (!autoScrollVar) return;
		if (curSlide >= numOfCities) return;
		pagination(0);
		setTimeout(timeout, animSpd);
		bullets(curSlide + 1);
		curSlide++;
	}
	
	function navigateLeft() {
		if (curSlide <= 1) return;
		pagination(2);
		setTimeout(timeout, animSpd);
		bullets(curSlide - 1);
		curSlide--;
	}

	function toDefault() {
		pagination(1);
		setTimeout(timeout, animSpd);
	}
	
	// Events
	$(document).on('mousedown touchstart', '.slide', function(e) {
		if (animation) return;
		let target = +$(this).attr('data-target');
		let startX = e.pageX || e.originalEvent.touches[0].pageX;
		$slider.removeClass('animation');
		
		$(document).on('mousemove touchmove', function(e) {
			let x = e.pageX || e.originalEvent.touches[0].pageX;
			diff = startX - x;
			if (target === 1 && diff < 0 || target === numOfCities && diff > 0) return;
			
			$slider.css({
				'transform': 'translate3d(-' + ((curSlide - 1) * 100 + (diff / 30)) + '%, 0, 0)'
			});
			
			$slider.find('.slide__darkbg').css({
				'transform': 'translate3d(' + ((curSlide - 1) * 50 + (diff / 60)) + '%, 0, 0)'
			});
			
			$slider.find('.slide__letter').css({
				'transform': 'translate3d(' +  (diff / 60) + 'vw, 0, 0)',
			});
			
			$slider.find('.slide__text').css({
				'transform': 'translate3d(' + (diff / 15) + 'px, 0, 0)'
			});
		})	
	})
	
	$(document).on('mouseup touchend', function(e) {
		$(document).off('mousemove touchmove');
		
		if (animation) return;
		
		if (diff >= distOfLetGo) {
			navigateRight();
		} else if (diff <= -distOfLetGo) {
			navigateLeft();
		} else {
			toDefault();
		}
	});
	
	$(document).on('click', '.nav__slide:not(.nav-active)', function() {
		let target = +$(this).attr('data-target');
		bullets(target);
		curSlide = target;
		pagination(1);
	});	
	
	$(document).on('click', '.side-nav', function() {
		let target = $(this).attr('data-target');
		
		if (target === 'right') navigateRight();
		if (target === 'left') navigateLeft();
	});
	
	$(document).on('keydown', function(e) {
		if (e.which === 39) navigateRight();
		if (e.which === 37) navigateLeft();
	});
	
	$(document).on('mousewheel DOMMouseScroll', function(e) {
		if (animation) return;
    let delta = e.originalEvent.wheelDelta;
		
    if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
	 	if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
  });
});

const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden")
  } else {
    backToTopButton.classList.add("hidden")
  }
})


class ItcAccordion {
	constructor(target, config) {
	  this._el = typeof target === 'string' ? document.querySelector(target) : target;
	  const defaultConfig = {
		alwaysOpen: true,
		duration: 350
	  };
	  this._config = Object.assign(defaultConfig, config);
	  this.addEventListener();
	}
	addEventListener() {
	  this._el.addEventListener('click', (e) => {
		const elHeader = e.target.closest('.accordion__header');
		if (!elHeader) {
		  return;
		}
		if (!this._config.alwaysOpen) {
		  const elOpenItem = this._el.querySelector('.accordion__item_show');
		  if (elOpenItem) {
			elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
		  }
		}
		this.toggle(elHeader.parentElement);
	  });
	}
	show(el) {
	  const elBody = el.querySelector('.accordion__body');
	  if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
		return;
	  }
	  elBody.style['display'] = 'block';
	  const height = elBody.offsetHeight;
	  elBody.style['height'] = 0;
	  elBody.style['overflow'] = 'hidden';
	  elBody.style['transition'] = `height ${this._config.duration}ms ease`;
	  elBody.classList.add('collapsing');
	  el.classList.add('accordion__item_slidedown');
	  elBody.offsetHeight;
	  elBody.style['height'] = `${height}px`;
	  window.setTimeout(() => {
		elBody.classList.remove('collapsing');
		el.classList.remove('accordion__item_slidedown');
		elBody.classList.add('collapse');
		el.classList.add('accordion__item_show');
		elBody.style['display'] = '';
		elBody.style['height'] = '';
		elBody.style['transition'] = '';
		elBody.style['overflow'] = '';
	  }, this._config.duration);
	}
	hide(el) {
	  const elBody = el.querySelector('.accordion__body');
	  if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
		return;
	  }
	  elBody.style['height'] = `${elBody.offsetHeight}px`;
	  elBody.offsetHeight;
	  elBody.style['display'] = 'block';
	  elBody.style['height'] = 0;
	  elBody.style['overflow'] = 'hidden';
	  elBody.style['transition'] = `height ${this._config.duration}ms ease`;
	  elBody.classList.remove('collapse');
	  el.classList.remove('accordion__item_show');
	  elBody.classList.add('collapsing');
	  window.setTimeout(() => {
		elBody.classList.remove('collapsing');
		elBody.classList.add('collapse');
		elBody.style['display'] = '';
		elBody.style['height'] = '';
		elBody.style['transition'] = '';
		elBody.style['overflow'] = '';
	  }, this._config.duration);
	}
	toggle(el) {
	  el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
	}
  }
  

  //Burger-menu
  $(document).ready(function() {
	$('.burger-menu__inner').click(function(event) {
		$('.burger-menu__inner,.burger-menu,.navbar').toggleClass('active');
		$('body').toggleClass('lock')
	});
	$('.burger-menu__inner.active').click(function(event) {
		$('.burger-menu__inner').toggleClass('');
	});
  });

  $("#kboard").on("click", "button", function(){
	var Tc = this.textContent;
	if(Tc.length===1) $("textarea").get(0).value += Tc;
  });

  $("#nubex").on("click", "button", function(){
	var Tc = this.textContent;
	if(Tc.length===1) $("textarea").get(0).value += Tc;
  });

var button_1, button_2, button_3, button_4,button_5, button_6, button_7, button_8;

function number_1(){
	alert("Привет, я программа для сравнения чётности и нечётности чисел") //приветственное сообщение
	pervoechislo = +prompt('Введите первое целое число'); //Ввод первого числа
	vtoroechislo = +prompt('Введите второе целое число'); //Ввод второго числа
	pervoechislo = parseInt(pervoechislo); //перевод числа в integer
	vtoroechislo = parseInt(vtoroechislo); //перевод числа в integer
	if (pervoechislo% 2 != 0) { //если первое число чётное
		if (vtoroechislo% 2 != 0) { //если второе число чётное
			alert('TRUE') //вывод TRUE
		} else { //иначе
			alert('FALSE') //вывод FALSE
		}   
	}
	else {
		alert('FALSE')
	}
}

function number_2(){
	alert("Привет, я программа для вывода большего числа") //приветственное сообщение
	pervoechislo = +prompt('Введите первое целое число'); //Ввод первого числа
	vtoroechislo = +prompt('Введите второе целое число'); //Ввод второго числа
	pervoechislo = parseInt(pervoechislo); //перевод числа в integer
	vtoroechislo = parseInt(vtoroechislo); //перевод числа в integer
	if (pervoechislo <= vtoroechislo) { //если первое число большк второго
		if (vtoroechislo <= pervoechislo) { //если второе число больше первого
			alert(pervoechislo) //вывод TRUE
		} else { //иначе
			alert(vtoroechislo) //вывод FALSE
		}   
	}
	else {
		alert(pervoechislo)
	}
}

function number_3(){
	alert('Приветствую, я программа для решение математических выражений cos и sin')
	x = +prompt('Введите число');
	var a = 2.7;
	var b = -3.59;
	if (x > 2) {
		var y = Math.cos((a*x)**2)**3;
		alert(`При x > 2 Ответ: ` + y);
	}
		else if (x <= -1) {
			y = Math.sin(x+b/2)**2;
			alert(`При x <= -1 Ответ: ` + y);
	}
		else if (-1 < x <= 2) {
			y = Math.sqrt(2-x**2)**3;
			alert(`При -1 < x <= 2 Ответ: ` + y);
	}
}

function number_4(){
	alert('Приветствую, я программа для решение математических выражений cos и sin') //Приветственное сообщение
	var x = +prompt('Введите x ');
var y;
var a = 2.6;
var b = 4.2;
x = parseInt(x);
a = parseFloat(a);
b = parseFloat(b);

	switch (x) {
		case 3:
			y = Math.cos((a*x)**2)**3;
		break;

		case -1:
			y = Math.sin(x+b/2)**3;
		break;

		case 1:
			y = (2-x**2)**3;
		break;

		default:
			alert(x);
		y = 'oтсутствует';
		break;
	}
		alert(`Значение функции у(х) = ${y}`);
}

function number_5(){
	alert('Приветствую, пользователь, я программа для поиска чисел меньше исходного');
	var N = 0;
	N = +prompt('Введите длину массива');
	N = parseInt(N);
	var K = +prompt('Введите число');
	K = parseInt(K);
	var mass = [];
	U = 0;
	for (let i = 0; i < N; i++){
		let R = Math.floor(Math.random() * 20);
		mass.push(R);
	}
	alert('Ваш массив ' + mass);
	for (let i = 0; i < N; i++){
		if (mass[i] < K){
			U++
		}
	}
	if (U != 0){
		alert('True')
	} else{
		alert('False')
	}
}

function number_6(){
	alert('Приветствую, пользователь, я программа для сложения чисел необходимое вам количество раз, при этом каждый раз увеличивая второе слогаемое');
	var N = 0;
	N = +prompt('Введите сколько необходимо раз складывать');
	N = parseInt(N);
	var S = 0;
	S = parseInt(S);
	var Y = 1;
	Y = parseInt(Y);
	for (let i = 0; i < N; i++){
		S += 1 + Y;
		Y++;
	}
	alert('Итог сложения: ' + S);
}

function number_7(){
	alert('Приветствую, пользователь, я программа для вывода чётной позиции элементов вашего массива');
	var N = 0;
	N = +prompt('Введите массив чётной длины');
	N = parseInt(N);
	var A = [];
	for (let i = 0; i < N; i++){
		let R = Math.floor(Math.random() * 20);
		A.push(R);
	}
	alert('Ваш массив ' + A);
	var V = [];
	for (let i = 1; i < N; i += 2){
		V.push(A[i]);
	}
	alert('Чётные элементы массива: ' + V);
}

function number_8(){
	alert('Приветствую, пользователь, я программа для нахождения и замены местами минимального и максимального числа в массиве');
	var N = 0;
	N = +prompt('Введите длину массива');
	N = parseInt(N);
	var mass = [];
	for (let i = 0; i < N; i++){
		let R = Math.floor(Math.random() * 20);
		mass.push(R);
	}
	alert('Ваш массив ' + mass);
	var MN = mass[0];
	MN = parseInt(MN);
	var IMN = 0;
	IMN = parseInt(IMN);
	var MX = mass[0];
	MX = parseInt(MX);
	var IMX = 0;
	IMX = parseInt(IMX);
	for (let i = 0; i < N; i++){
		if (mass[i] < MN){
			MN = mass[i];
			IMN = i;
		}
		if (mass[i] > MX){
			MX = mass[i];
			IMX = i;
		}
	}
	alert('Найден максимальный элемент массива ' + MX);
	alert('Найден минимальный элемент массива ' + MN);
	mass[IMX] = MN;
	mass[IMN] = MX;
	alert('Вид массива после изменнений ' + mass);
}


button_1 = document.getElementById('number_1');
button_2 = document.getElementById('number_2');
button_3 = document.getElementById('number_3');
button_4 = document.getElementById('number_4');
button_5 = document.getElementById('number_5');
button_6 = document.getElementById('number_6');
button_7 = document.getElementById('number_7');
button_8 = document.getElementById('number_8');

function table_add() {
	var name = document.getElementById("fio_input"); // взяли html элемент по id
	var amount = document.getElementById("labi_input");
	var obl = document.getElementById("predmet_input");
	var table = document.getElementById("table");
	
	var name_txt = name.value; // выясили его значение
	var amount_numb = amount.value;
	var obl_txt = obl.value;
	var new_tr = document.createElement("tr"); // создали строку таблицы
	new_tr.innerHTML = (`<td>${name_txt}</td><td>${amount_numb}</td><td>${obl_txt}</td>`); // заполнили ёе
	table.appendChild(new_tr); // добавили строку в таблицу на странице
  }

//   var nick_txt = nick_in.value;
//   var amount_numb = amount.value;
//   if (amount_numb > 999999) {
//     alert('Количество работ слишком велико');
//   } else if (nick_txt == '') {
//     alert('Проверьте имя, оно не может быть пустым');
//   } else if (amount_numb == '') {
//     alert('Поле количество работ заполнено не корректо, проверьте его пожалуйста')
//   } else {
//     table_numb += 1;
//     var new_tr = document.createElement("tr");
//     new_tr.innerHTML = (`<td>${table_numb}</td><td>${nick_txt}</td><td>${amount_numb}</td>`);
//     table.appendChild(new_tr);


window.onscroll = function() {scrollFunction()};
// показывает кнопку вверх когда страница уходит на 20px вниз
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("skroll").style.display = "block";
    } else {
        document.getElementById("skroll").style.display = "none";
    }
}
//когда пользователь нажимает кнопку прокрутка до верха
function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}
// слайдер сайта
var slideIndex = 1;
showSlides(slideIndex);

// следуюшие и предидущие элементы управления
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
//функция чтобы слайдер листался и не зацикливался на последнем слайде 
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} // алгоритм для пролистывания слайдера
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) { //вводим изминения в css
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; // 
  dots[slideIndex-1].className += " active";
}
// бургер меню
// алгоритм для отоброжения бургер меню и записии изменения
let menuBurger = document.querySelector('.menu-burger');
let menu = document.querySelector('.menu');
// при нажатии на кнопку бургер меню у нас добовляеться класс active тем самым добовляем изминения в  css
menuBurger.addEventListener('click', function(){
	menuBurger.classList.toggle('active');
	menu.classList.toggle('active');
})
// Галерея
function openContainer() {
  document.getElementById("gallery-container").style.display = "block";
}
function closeContainer() {
  document.getElementById("gallery-container").style.display = "none";
}
function currentGallery(s) {
  showGallery(galleryIndex = s);
}
function showGallery(s) {
  var g;
  var gallery = document.getElementsByClassName("gallery-item");
  var drl = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  for (g = 0; g < gallery.length; g++) {
    gallery[g].style.display = "none";
  }
  gallery[galleryIndex-1].style.display = "block";
  drl[galleryIndex-1].className += " active";
}
//ввод с клавы
document.querySelector('.cancelbtn').addEventListener('click', shInput);
function shInput() {
  let a = document.querySelector('.ctrl').value;
  console.log(a);
  document.querySelector('.out').innerHTML = a
}
document.querySelector('.cancelbtn').addEventListener('click', lhInput);
function lhInput() {
  let b = document.querySelector('.cbkh').value;
  console.log(b);
  document.querySelector('.crl').innerHTML = b
}
//проверка 
var button = document.querySelectorAll('.cancelbtn');
var input = document.querySelector('.ctrl');
for (var i = 0; i < button.length; i++) {
  button[i].addEventListener('click', function() {
    if (input.value !== '') {
      alert('всё в порядке');
    }else{
    alert('заполните поля логин');
    }
  })
}

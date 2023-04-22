    let position = 0;
    const slidesToShow = 1; // сколько элиментов показывать
    const slidesToScroll = 1; // сколько скорллить
    const container = document.querySelector('.slider-container'); //контейнер где фоточки и страдание над ними 
    const track = document.querySelector('.slider-track'); //чекер того где картинка (по идеи)
    const btnPrev = document.querySelector('.btn-prev'); //кнопка сюда
    const btnNext = document.querySelector('.btn-next'); //кнопка туда
    const items = document.querySelectorAll('.slider-item'); //сами картиночки
    const itemsCount = items.length; // длина картинки
    const itemWidth = container.clientWidth / slidesToShow; //ширина штуки картинка
    const movePosition = slidesToScroll * itemWidth;

    //отыскание MinWidth
    items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px `;
    });

    //скролл вперёд
    btnNext.addEventListener('click' ,() =>{
        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

        setPosition();
        checkBtns();
    })
    
    //скролл назад
    btnPrev.addEventListener('click' ,() =>{
        const itemsLeft = Math.abs(position) / itemWidth;

        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

        setPosition();
        checkBtns();
    })

    const setPosition = () => {
        track.style.transform = `translateX(${position}px)`   
    };

    //просмотр на то дошла ли карусель до конца или нет
    const checkBtns = () => {
        // btnPrev.style.disabled = 
        btnPrev.disabled =  position === 0;
        btnNext.disabled =  position <= -(itemsCount - slidesToShow) * itemWidth;       
    };

    checkBtns();

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () =>
{
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInp = addForm.querySelector('.adding__input'),
        addCheck = addForm.querySelector('[type="checkbox"]');
    
    addForm.addEventListener('submit', event => {
        event.preventDefault();

        let newFilm = addInp.value;
        const favorite = addCheck.checked;

        if (favorite) {
            console.log("Вы добавили любимый фильм");
        }
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            movieDB.movies.push(newFilm);
            arrSort(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        
        event.target.reset();

    });

    const deleteAdv = () => {
        adv.forEach(item => {
            item.remove();
        });
    };
    
    const makeChange = () => {
        genre.textContent = 'Драма';
        poster.style.backgroundImage ='url("img/bg.jpg")';
    };
    
    const arrSort = arr => {
        arr.sort();
    };
    
    function createMovieList(films, parent){
        parent.innerHTML = "";
        arrSort(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item"> ${i + 1} ${film}
            <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }
    
    deleteAdv(adv);
    makeChange();
    createMovieList(movieDB.movies, movieList);
    
});
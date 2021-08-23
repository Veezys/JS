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
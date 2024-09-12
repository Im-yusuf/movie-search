const apiKey = '9d34daae9a0f47109150e527315df223';
// function  to fetch trending movies
function fetchTrendingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const container = document.getElementById('trendingMovies');
            container.innerHTML = '';

            movies.forEach(movie => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                const cardHtml = `
                    <div class="card" onclick="this.classList.toggle('flip')">
                        <div class="card-inner">
                            <div class="card-front">
                                <img src="${imageUrl}" class="card-img-top" alt="${movie.title} Poster">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text">Release Date: ${movie.release_date}</p>
                            </div>
                            <div class="card-back">
                                <p class="card-text">${movie.overview}</p>
                            </div>
                        </div>
                    </div>`;
                container.innerHTML += cardHtml;
            });
        })
}

// function for retrieving trending tv series
function fetchTrendingTVSeries() {
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const series = data.results;
            const container = document.getElementById('trendingTVSeries');
            container.innerHTML = ''; // clear content if any inside

            series.forEach(tvShow => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;
                const cardHtml = `
                    <div class="card" onclick="this.classList.toggle('flip')">
                        <div class="card-inner">
                            <div class="card-front">
                                <img src="${imageUrl}" class="card-img-top" alt="${tvShow.name} Poster">
                                <h5 class="card-title">${tvShow.name}</h5>
                                <p class="card-text">First Air Date: ${tvShow.first_air_date}</p>
                            </div>
                            <div class="card-back">
                                <p class="card-text">${tvShow.overview}</p>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });
        })
}

//scrolling for the moveis and tv shows
function scrollContentLeft(containerId) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: -500,
        behavior: 'smooth'
    });
}

function scrollContentRight(containerId) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: 500, 
        behavior: 'smooth'
    });
}
//call the content to be displayed
fetchTrendingMovies();
fetchTrendingTVSeries();
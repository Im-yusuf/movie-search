
const apiKey = '9d34daae9a0f47109150e527315df223';

// Fetch trending movies
function fetchTrendingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const container = document.getElementById('trendingMovies');
            container.innerHTML = ''; // Clear existing content

            movies.forEach(movie => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                const cardHtml = `
                    <div class="card">
                        <img src="${imageUrl}" class="card-img-top" alt="${movie.title} Poster">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">Release Date: ${movie.release_date}</p>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Error fetching trending movies:', error));
}

// Fetch trending TV series
function fetchTrendingTVSeries() {
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const series = data.results;
            const container = document.getElementById('trendingTVSeries');
            container.innerHTML = ''; // Clear existing content

            series.forEach(tvShow => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;
                const cardHtml = `
                    <div class="card">
                        <img src="${imageUrl}" class="card-img-top" alt="${tvShow.name} Poster">
                        <div class="card-body">
                            <h5 class="card-title">${tvShow.name}</h5>
                            <p class="card-text">First Air Date: ${tvShow.first_air_date}</p>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Error fetching trending TV series:', error));
}

// Scroll functions (renamed to avoid conflict with built-in scrollLeft property)
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

// Fetch trending movies and TV series on page load
fetchTrendingMovies();
fetchTrendingTVSeries();
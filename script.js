function fetchMovieInfo() {
    const movieName = document.getElementById('movieInput').value.trim();
    //check for movie name and birthdate inputs and give alert if not in
    if (!movieName) {
        alert('Please enter a movie name');
        return;
    }
    //using the tmdb api to get details about the movie such as its poster,title,release date exct
    //after getting these details, I then call the functions where this information is then displayed onto the website
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=9d34daae9a0f47109150e527315df223&query=${encodeURIComponent(movieName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const movie = data.results[0];
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                const title = movie.title;
                const releaseDate = new Date(movie.release_date);
                const overview = movie.overview;
                const voteAverage = movie.vote_average;
                const videos =movie.videos;

                renderMovieInfo(title, imageUrl, releaseDate, overview, voteAverage,videos);
                fetchTrailer(movie.id,movie.title);

            } else {
                alert('Could not find the movie:(');
            }
        })
}

//this function inserts the information into the appropriate parts of the page
function renderMovieInfo(title, imageUrl, releaseDate, overview, voteAverage,videos) {
    const html = `
        <h2>${title}</h2>
        <img src="${imageUrl}" alt="${title} Poster" class="img-fluid">
    `;
    const html2 =`
    <p><strong>Overview:</strong> ${overview}</p>
    <p><strong>Vote Average:</strong> ${voteAverage}</p>`
    ;
    const release =`<p><strong>Movie release date:</strong> ${releaseDate.toDateString()}</p>`;    
    document.getElementById('movieInfo').innerHTML = html;
    document.getElementById('movie_info').innerHTML =html2;
    document.getElementById('release_date').innerHTML=release;
}

//this function gets the trailer for the given movie
function fetchTrailer(movieId, movieName) {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=9d34daae9a0f47109150e527315df223`;

    fetch(trailerUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Trailer fetch response data:', data); // For debugging

            if (data.results && data.results.length > 0) {
                // Check if there is a trailer video
                const trailer = data.results.find(video => video.type === 'Trailer');
                
                if (trailer) {
                    const trailerKey = trailer.key;
                    const trailerEmbedUrl = `https://www.youtube.com/embed/${trailerKey}`;

                    const trailerHtml = `
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="${trailerEmbedUrl}" allowfullscreen></iframe>
                        </div>
                    `;
                    document.getElementById('trailer').innerHTML = trailerHtml;
                } else {
                    showYoutubeSearch(movieName);
                }
            } else {
                showYoutubeSearch(movieName);
            }
        })
        .catch(error => {
            console.error('Error fetching trailer information:', error);
            document.getElementById('trailer').innerHTML = '<p>Sorry, an error occurred while fetching the trailer.</p>';
        });
}
function showYoutubeSearch(movieName) {
    const searchQuery = encodeURIComponent(movieName + " trailer");
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

    document.getElementById('trailer').innerHTML = `
        <p>Sorry, couldn't find a trailer for this movie.</p>
        <a href="${youtubeSearchUrl}" target="_blank" class="btn btn-outline-danger">Search for trailer on youtube</a>
    `;
}
// Your API key
const apiKey = '9d34daae9a0f47109150e527315df223';

// Fetch the top 10 trending movies
function fetchTrendingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const trendingMovies = data.results.slice(0, 10); // Top 10 movies
            renderTrendingMovies(trendingMovies);
        })
        .catch(error => console.error('Error fetching trending movies:', error));
}

// Fetch the top 10 trending TV series
function fetchTrendingSeries() {
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const trendingSeries = data.results.slice(0, 10); // Top 10 series
            renderTrendingSeries(trendingSeries);
        })
        .catch(error => console.error('Error fetching trending series:', error));
}

// Render the top 10 trending movies
function renderTrendingMovies(movies) {
    const movieContainer = document.getElementById('trendingMovies');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieHTML = `
            <div class="col-12 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Release Date: ${new Date(movie.release_date).toDateString()}</p>
                    </div>
                </div>
            </div>
        `;
        movieContainer.innerHTML += movieHTML;
    });
}

// Render the top 10 trending series
function renderTrendingSeries(series) {
    const seriesContainer = document.getElementById('trendingSeries');
    seriesContainer.innerHTML = '';

    series.forEach(tv => {
        const seriesHTML = `
            <div class="col-12 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top" alt="${tv.name}">
                    <div class="card-body">
                        <h5 class="card-title">${tv.name}</h5>
                        <p class="card-text">First Air Date: ${new Date(tv.first_air_date).toDateString()}</p>
                    </div>
                </div>
            </div>
        `;
        seriesContainer.innerHTML += seriesHTML;
    });
}

// Call the functions to fetch trending movies and series when the page loads
fetchTrendingMovies();
fetchTrendingSeries();

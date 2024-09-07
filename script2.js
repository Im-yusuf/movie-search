
$(document).ready(function() {
    //set variables to be values inside the areas with the id's
    const reviewForm = $('#reviewForm');
    const thankYouMessage = $('#thankYouMessage');
    var slider = new Slider("#ex6");

    //listener for the slider to then update the slider value
    slider.on("slide", function(sliderValue) {
        document.getElementById("ex6SliderVal").textContent = sliderValue;
    });
    // ecvent listener for the form submission
    reviewForm.submit(function(event) {
        event.preventDefault();
        
        //getting the values and details of the film review
        const movieTitle = $('#movieTitle').val();
        const review = $('#review').val();
        const fname = $('#firstname').val();
        const lname = $('#lname').val();
        const slider_val =$('#ex6SliderVal').text();
        const mail = $('#mail').val();

        //making an array for review entries 
        const Reviews_array = JSON.parse(localStorage.getItem('reviews')) || [];
        Reviews_array.push({ movieTitle, review, fname, lname,slider_val, mail,});

        // Save the review data to localStorage
        localStorage.setItem('reviews', JSON.stringify(Reviews_array));
        //display the thank you message after allocation into the localstorage
        thankYouMessage.show();
        //reset the form for another submission 5 seconds later
        setTimeout(function() {
            reviewForm[0].reset();
        }, 5000); 
    });
});


//this part of the js is for getting the reviews and putting them onto the review page
$(document).ready(function(){

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsList = $('#review_List');
    //make a function to show the reviewss for modularity
    function show_reviews(){
    reviewsList.empty();
    if (reviews.length === 0) {
        reviewsList.append('<p>Please write a reveiw :)</p>');
    } else {
        reviews.forEach(review => {
        const reviewi = `
            <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${review.movieTitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${review.fname} ${review.lname}</h6>
                <p class="card-text">${review.review}</p>
                <p class="card-text">Rating: ${review.slider_val}</p>
            </div>
            </div>
        `;
        reviewsList.append(reviewi);
        });
    }
    }
    show_reviews();
    //function to clear the reviews list to reset it
    $('#Reviewreset').click(function(){
        localStorage.removeItem('reviews');
        reviews.length =0;
        show_reviews();
    });
});
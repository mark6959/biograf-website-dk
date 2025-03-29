document.addEventListener("DOMContentLoaded", () => {
    const moviesGrid = document.getElementById("movies-grid");
    const searchInput = document.getElementById("search-input");
    const filterButton = document.getElementById("filter-button");
    const filterPanel = document.getElementById("filter-panel");
    const applyFiltersButton = document.getElementById("apply-filters");

    let moviesData = []; // Store the fetched movies data

    // Fetch the JSON data
    fetch("json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            moviesData = data; // Save the data for later use
            displayMovies(moviesData); // Display all movies initially
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });

    // Function to display movies
    function displayMovies(movies) {
        moviesGrid.innerHTML = ""; // Clear the grid
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            // Add thumbnail or placeholder if missing
            const thumbnail = movie.thumbnail
                ? `<img src="${movie.thumbnail}" alt="${movie.title}">`
                : `<div style="width:100%;height:200px;background:#ccc;display:flex;align-items:center;justify-content:center;">No Image</div>`;

            // Add movie details
            movieCard.innerHTML = `
                <a href="movietemplate.html" style="text-decoration: none; color: inherit;">
                    ${thumbnail}
                    <h3>${movie.title}</h3>
                    <p><strong>Year:</strong> ${movie.year}</p>
                </a>
            `;

            // Store movie data in localStorage on click
            movieCard.addEventListener("click", () => {
                localStorage.setItem("selectedMovieId", movie.id); // Use "selectedMovieId" instead of "selectedMovie"
            });

            // Append the movie card to the grid
            moviesGrid.appendChild(movieCard);
        });
    }

    // Toggle filter panel
    filterButton.addEventListener("click", () => {
        filterPanel.style.display = filterPanel.style.display === "none" ? "block" : "none";
    });

    // Apply filters
    applyFiltersButton.addEventListener("click", () => {
        const selectedGenres = Array.from(document.querySelectorAll("#genre-filters input:checked")).map(input => input.value);
        const selectedAgeRatings = Array.from(document.querySelectorAll("#age-rating-filters input:checked")).map(input => input.value);
        const selectedYears = Array.from(document.querySelectorAll("#year-filters input:checked")).map(input => input.value);

        const filteredMovies = moviesData.filter(movie => {
            const matchesGenre = selectedGenres.length === 0 || movie.genres.some(genre => selectedGenres.includes(genre));
            const matchesAgeRating = selectedAgeRatings.length === 0 || selectedAgeRatings.includes(movie.age_rating);
            const matchesYear = selectedYears.length === 0 || selectedYears.includes(movie.year.toString());
            return matchesGenre && matchesAgeRating && matchesYear;
        });

        displayMovies(filteredMovies); // Display filtered movies
    });

    // Dynamic search functionality
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMovies = moviesData.filter(movie => {
            // Check if the search term matches the title, year, cast, or director
            const matchesTitle = movie.title.toLowerCase().includes(searchTerm);
            const matchesYear = movie.year.toString().includes(searchTerm);
            const matchesCast = movie.cast && movie.cast.some(castMember => castMember.toLowerCase().includes(searchTerm));
            const matchesDirector = Array.isArray(movie.director)
                ? movie.director.some(director => director.toLowerCase().includes(searchTerm))
                : movie.director.toLowerCase().includes(searchTerm);
            return matchesTitle || matchesYear || matchesCast || matchesDirector;
        });
        displayMovies(filteredMovies); // Display only the filtered movies
    });
});
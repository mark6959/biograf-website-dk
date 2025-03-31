document.addEventListener("DOMContentLoaded", () => {
    const moviesGrid = document.getElementById("movies-grid");
    const searchInput = document.getElementById("search-input");
    const filterButton = document.getElementById("filter-button");
    const filterPanel = document.getElementById("filter-panel");
    const applyFiltersButton = document.getElementById("apply-filters");

    let moviesData = []; // Gem data fra JSON-filen

    // Hent JSON-data
    fetch("json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunne ikke indlæse JSON-filen");
            }
            return response.json();
        })
        .then(data => {
            moviesData = data; // Gem data til senere brug
            displayMovies(moviesData); // Vis alle film som standard
        })
        .catch(error => {
            console.error("Fejl ved indlæsning af JSON:", error);
        });

    // Funktion til at vise film
    function displayMovies(movies) {
        moviesGrid.innerHTML = ""; // Ryd galleriet
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            // Tilføj miniaturebillede eller en pladsholder, hvis der mangler et billede
            const thumbnail = movie.thumbnail
                ? `<img src="${movie.thumbnail}" alt="${movie.title}">`
                : `<div style="width:100%;height:200px;background:#ccc;display:flex;align-items:center;justify-content:center;">Ingen billede</div>`;

            // Tilføj filmens detaljer
            movieCard.innerHTML = `
                <a href="movietemplate.html" style="text-decoration: none; color: inherit;">
                    ${thumbnail}
                    <h3>${movie.title}</h3>
                    <p><strong>År:</strong> ${movie.year}</p>
                </a>
            `;

            // Gem filmens ID i localStorage, når der klikkes
            movieCard.addEventListener("click", () => {
                localStorage.setItem("selectedMovieId", movie.id); // Gem ID'et for den valgte film
            });

            // Tilføj filmkortet til galleriet
            moviesGrid.appendChild(movieCard);
        });
    }

    // Skift visning af filterpanelet
    filterButton.addEventListener("click", () => {
        filterPanel.style.display = filterPanel.style.display === "none" ? "block" : "none";
    });

    // Anvend filtre
    applyFiltersButton.addEventListener("click", () => {
        const selectedGenres = Array.from(document.querySelectorAll("#genre-filters input:checked")).map(input => input.value);
        const selectedAgeRatings = Array.from(document.querySelectorAll("#age-rating-filters input:checked")).map(input => input.value);
        const selectedYears = Array.from(document.querySelectorAll("#year-filters input:checked")).map(input => input.value);

        const filteredMovies = moviesData.filter(movie => {
            // Tjek om filmen matcher de valgte genrer
            const matchesGenre = selectedGenres.length === 0 || movie.genres.some(genre => selectedGenres.includes(genre));

            // Tjek om filmen matcher de valgte aldersgrænser
            const matchesAgeRating = selectedAgeRatings.length === 0 || selectedAgeRatings.includes(movie.age_rating);

            // Tjek om filmen matcher de valgte årtier
            const matchesYear = selectedYears.length === 0 || selectedYears.some(decade => {
                const decadeStart = parseInt(decade, 10); // Konverter årti til et tal
                const decadeEnd = decadeStart + 9; // Beregn slutningen af årtiet
                return movie.year >= decadeStart && movie.year <= decadeEnd; // Tjek om filmens år er inden for årtiet
            });

            return matchesGenre && matchesAgeRating && matchesYear;
        });

        displayMovies(filteredMovies); // Vis de filtrerede film
    });

    // Dynamisk søgefunktion
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMovies = moviesData.filter(movie => {
            // Tjek om søgetermen matcher titel, år, skuespillere eller instruktør
            const matchesTitle = movie.title.toLowerCase().includes(searchTerm);
            const matchesYear = movie.year.toString().includes(searchTerm);
            const matchesCast = movie.cast && movie.cast.some(castMember => castMember.toLowerCase().includes(searchTerm));
            const matchesDirector = Array.isArray(movie.director)
                ? movie.director.some(director => director.toLowerCase().includes(searchTerm))
                : movie.director.toLowerCase().includes(searchTerm);
            return matchesTitle || matchesYear || matchesCast || matchesDirector;
        });
        displayMovies(filteredMovies); // Vis kun de filtrerede film
    });
});
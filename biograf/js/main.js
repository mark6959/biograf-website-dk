document.addEventListener("DOMContentLoaded", () => {
    const moviesGrid = document.getElementById("movies-grid");

    // Fetch the JSON data
    fetch("json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            // Loop through the movies and create movie cards
            data.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.className = "movie-card";

                // Add thumbnail or placeholder if missing
                const thumbnail = movie.thumbnail
                    ? `<img src="${movie.thumbnail}" alt="${movie.title}">`
                    : `<div style="width:100%;height:200px;background:#ccc;display:flex;align-items:center;justify-content:center;">No Image</div>`;

                // Add movie details
                movieCard.innerHTML = `
                    ${thumbnail}
                    <h3>${movie.title}</h3>
                    <p><strong>Year:</strong> ${movie.year}</p>
                `;

                // Append the movie card to the grid
                moviesGrid.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });
});
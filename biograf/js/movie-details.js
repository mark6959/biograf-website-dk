document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        alert("No movie selected!");
        return;
    }

    // Fetch the JSON data
    fetch("json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            // Find the movie by ID
            const movie = data.find(m => m.id == movieId);

            if (!movie) {
                alert("Movie not found!");
                return;
            }

            // Populate the movie details
            document.getElementById("movie-thumbnail").src = movie.thumbnail;
            document.getElementById("movie-title").textContent = movie.title;
            document.getElementById("movie-year").textContent = `Year: ${movie.year}`;
            document.getElementById("movie-description").textContent = movie.description;

            // Generate seat selection grid
            const seatsGrid = document.getElementById("seats-grid");
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 8; j++) {
                    const seat = document.createElement("div");
                    seat.className = "seat";
                    seat.textContent = `${i + 1}-${j + 1}`;
                    seatsGrid.appendChild(seat);
                }
            }
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });
});
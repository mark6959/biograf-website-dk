document.addEventListener("DOMContentLoaded", () => {
    const selectedId = localStorage.getItem("selectedMovieId");
    const ticket = document.getElementById("buytickets");

    fetch("json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            const movie = data.find(m => m.id == selectedId);
            if (!movie) {
                console.error("Movie not found.");
                return;
            }

            document.getElementById("sitetitle").textContent = movie.title;
            document.getElementById("thumbnail").src = movie.thumbnail;
            document.getElementById("beskrivelse").textContent = movie.description;
            document.getElementById("kategori").textContent = movie.genres;
            document.getElementById("skuespillere").textContent = movie.cast;
            document.getElementById("aldersgrænse").textContent = movie.age_rating;
            document.getElementById("varighed").textContent = movie.duration;
            document.getElementById("undertekster").textContent = movie.subtitles;
            document.getElementById("udgivelsesdato").textContent = movie.year;
            document.getElementById("sal").textContent = movie.hall;
            document.getElementById("dag").textContent = movie.day;
            document.getElementById("tidspunkt").textContent = movie.time;

            ticket.addEventListener("click", () => {
                localStorage.setItem("selectedHall", movie.hall);
            });

        }) 

});
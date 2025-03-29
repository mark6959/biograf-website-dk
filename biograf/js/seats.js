document.addEventListener("DOMContentLoaded", () => {
    const seatContainer = document.querySelector(".seat-container");
    const confirmBtn = document.getElementById("confirmSelection");

    // Switch statement til valg af sal-størrelse

    let rows = 5; // Antal rækker
    let cols = 8; // Antal sæder per række

    const hall = localStorage.getItem("selectedHall")
    
    if(hall == 1)
    {
        rows = 1;
        cols = 3;
    }
    else if (hall == 5)
    {
        rows = 7;
        cols = 10;
    }

    let selectedSeats = new Set();

    // Simuler nogle optagede sæder
    let bookedSeats = new Set(["1-3", "2-3"]); 

    // Hent tidligere valgte sæder fra LocalStorage
    const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    selectedSeats = new Set(savedSeats);

    // Opret sæderne
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            let seat = document.createElement("div");
            let seatId = `${row}-${col}`;
            seat.classList.add("seat");
            seat.dataset.seat = seatId;

            if (bookedSeats.has(seatId)) {
                seat.classList.add("booked");
            }

            // Marker tidligere valgte sæder fra LocalStorage
            if (selectedSeats.has(seatId)) {
                seat.classList.add("selected");
            }

            seat.addEventListener("click", () => {
                if (!seat.classList.contains("booked")) {
                    if (seat.classList.contains("selected")) {
                        seat.classList.remove("selected");
                        selectedSeats.delete(seatId);
                    } else {
                        seat.classList.add("selected");
                        selectedSeats.add(seatId);
                    }

                    localStorage.setItem("selectedSeats", JSON.stringify([...selectedSeats]));
                }
            });

            seatContainer.appendChild(seat);
        }
    }

    // Bekræft valg
    confirmBtn.addEventListener("click", () => {
        if (selectedSeats.size > 0) {
            alert(`Du har valgt sæder: ${[...selectedSeats].join(", ")}`);
        } else {
            alert("Vælg mindst ét sæde!");
        }
    });
});
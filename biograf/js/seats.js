document.addEventListener("DOMContentLoaded", () => {
    const seatContainer = document.querySelector(".seat-container");
    const confirmBtn = document.getElementById("confirmSelection");
    const ticketType = document.getElementById("ticketType");
    const totalPriceDisplay = document.getElementById("totalPrice");
    const snackInputs = document.querySelectorAll(".snack");

    const rows = 5;
    const cols = 8;
    let selectedSeats = new Set();
    let bookedSeats = new Set(["1-3", "3-6", "4-2"]);
    const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    selectedSeats = new Set(savedSeats);

    function updatePrice() {
        let ticketPrice = parseInt(ticketType.value);
        let seatCount = selectedSeats.size;
        let total = seatCount * ticketPrice;

        snackInputs.forEach(snack => {
            if (snack.checked) {
                total += parseInt(snack.value);
            }
        });

        totalPriceDisplay.textContent = total;
        return total;
    }

    // Opret sæder dynamisk
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            let seat = document.createElement("div");
            let seatId = `${row}-${col}`;
            seat.classList.add("seat");
            seat.dataset.seat = seatId;

            if (bookedSeats.has(seatId)) {
                seat.classList.add("booked");
            }

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
                    updatePrice();
                }
            });

            seatContainer.appendChild(seat);
        }
    }

    ticketType.addEventListener("change", updatePrice);
    snackInputs.forEach(snack => snack.addEventListener("change", updatePrice));

    confirmBtn.addEventListener("click", () => {
        let selectedSnacks = [];
        snackInputs.forEach(snack => {
            if (snack.checked) {
                selectedSnacks.push(snack.nextSibling.textContent.trim());
            }
        });

        let bookingData = {
            seats: [...selectedSeats],
            ticketPrice: parseInt(ticketType.value),
            total: updatePrice(),
            snacks: selectedSnacks
        };

        localStorage.setItem("bookingData", JSON.stringify(bookingData));
        window.location.href = "checkout.html";
    });

    updatePrice();
});
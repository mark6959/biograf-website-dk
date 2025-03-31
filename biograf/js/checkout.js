document.addEventListener("DOMContentLoaded", () => {
    const payButton = document.getElementById("pay-button");

    payButton.addEventListener("click", () => 
        {
        // Logik for at at felterne er skrevet i (altså ikke hele nødvendige logik i praksis).
        // trim bruges til at at fjeren mellemrum fra starten og slutningen af den value som er angivet
            const cardNumber = document.getElementById("card-number").value.trim();
            const expiryMonth = document.getElementById("expiry-month").value.trim();
            const expiryYear = document.getElementById("expiry-year").value.trim();
            const cvv = document.getElementById("cvv").value.trim();
            const cardHolder = document.getElementById("card-holder").value.trim();
            const email = document.getElementById("email").value.trim();

        if (!cardNumber || !expiryMonth || !expiryYear || !cvv || !cardHolder || !email) {
            alert("Udfyld venligst alle kortoplysninger.");
            return;
        }
        window.location.href = "confirmation.html";
    });
});
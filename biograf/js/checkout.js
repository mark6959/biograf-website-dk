document.addEventListener("DOMContentLoaded", function() {
    const cartItems = [
        { name: "Popkorn menu", price: 79 },
    ];

    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    let total = 0;
    cartItems.forEach(item => 
        {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ${item.price} kr`;
        cartList.appendChild(listItem);
        total += item.price;
        }
    );

    totalPriceElement.textContent = `${total} kr`;

    
    document.getElementById("pay-button").addEventListener("click", function() 
    {
        alert("Betaling gennemført! Tak for dit køb.");
        window.location.href = "confirmation.html";
    }
    );
}




);
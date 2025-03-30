document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    const newsletterForm = document.querySelector(".newsletter-form");
    const feedbackMessage = document.getElementById("feedback-message");
    const newsletterMessage = document.getElementById("newsletter-message");

    // Handle contact form submission
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Display the feedback success message
        feedbackMessage.style.display = "block";

        // Clear the form fields
        contactForm.reset();

        // Hide the message after 3 seconds
        setTimeout(() => {
            feedbackMessage.style.display = "none";
        }, 3000);
    });

    // Handle newsletter subscription form submission
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Display the newsletter success message
        newsletterMessage.style.display = "block";

        // Clear the form field
        newsletterForm.reset();

        // Hide the message after 3 seconds
        setTimeout(() => {
            newsletterMessage.style.display = "none";
        }, 5000);
    });
});
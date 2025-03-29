document.addEventListener("DOMContentLoaded", () => {

    fetch("json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }

            return response.json();
        })
        then(data => {
            
        }

}
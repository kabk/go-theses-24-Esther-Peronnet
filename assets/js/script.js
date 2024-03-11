document.addEventListener("DOMContentLoaded", function() {
    let keyPickedUp = false; // Flag to track if the key has been picked up
    let currentKeyImage = 1;

    const keys = document.querySelectorAll(".key");
    const toggleButtons = document.querySelectorAll(".toggle-button");
    const contentWrappers = document.querySelectorAll(".content_wrapper");

    keys.forEach((key) => {
        key.addEventListener("click", function(event) {
            if (!keyPickedUp) {
                keyPickedUp = true;
                key.classList.add("picked-up");
                updateCursorImage(); // Update cursor image when the key is picked up
            } else {
                keyPickedUp = false;
                key.classList.remove("picked-up");
                resetCursorImage(); // Reset cursor image when the key is dropped
            }
        });
    });

    toggleButtons.forEach((button) => {
        button.addEventListener("click", function() {
            if (keyPickedUp) {
                // Check if the key has been picked up
                const contentWrapper = this.closest(".content_wrapper");
                contentWrapper.classList.add("hidden");
                const nextContentWrapper = contentWrapper.nextElementSibling;
                if (nextContentWrapper) {
                    nextContentWrapper.classList.remove("hidden");
                }
                // Reset key state
                keys.forEach((key) => {
                    key.classList.remove("picked-up");
                });
                keyPickedUp = false;
                contentWrappers.forEach((wrapper) => {
                    wrapper.classList.remove("key-picked-up");
                });
                resetCursorImage(); // Reset cursor image when moving to the next chapter
            }
        });
    });

    function updateCursorImage() {
        currentKeyImage++; // Increment the current key image index
        if (currentKeyImage > 3) {
            currentKeyImage = 1; // Reset to the first key image if exceeded
        }
        const imageUrl = `assets/images/keys/key${currentKeyImage}.png`;
        document.body.style.cursor = `url("${imageUrl}"), auto`;
    }

    function resetCursorImage() {
        document.body.style.cursor = "auto";
    }
});
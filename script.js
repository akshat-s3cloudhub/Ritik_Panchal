function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";

    // Check if body height is smaller than the viewport
    if (document.body.scrollHeight <= window.innerHeight) {
        document.body.style.minHeight = "100vh";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("*"); // Select all elements
    elements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        if (computedStyle.overflow === "hidden" || computedStyle.overflowY === "hidden") {
            console.log("Hidden Overflow Detected:", el);
        }
    });
});
window.onload = function() {
    setTimeout(() => {
        window.scrollTo(0, 0); // Scroll to the top instead of bottom
    }, 1000);
};
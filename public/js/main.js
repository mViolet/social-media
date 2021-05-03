function storePagePosition() {
    const page_y = this.pageYOffset;
    localStorage.setItem("page_y", page_y); 
}
window.addEventListener("scroll", storePagePosition);

let currentPageY;

try {
    currentPageY = localStorage.getItem("page_y");
    if (currentPageY === undefined) {
        localStorage.setItem("page_y") = 0;
    }
    window.scrollTo(0, currentPageY);
} catch (e) {
    console.error(`localStorage is not available: ${e}`)
}
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameField = document.getElementById("name");
const name = nameField.value;

// Check if the name contains numbers
if (/\d/.test(name)) {
    alert("Numbers are not allowed in the Name field!");
    nameField.value = "";  // Clear the input field
    return; // Stop form submission
}
    const table = document.getElementById("table").value;
    const items = document.querySelectorAll('input[name="items"]:checked');
    const allQuantities = document.querySelectorAll('.qty');

    if (items.length === 0) {
        alert("Please select at least one item!");
        return;
    }

    let orderedItems = [];
    let totalPrice = 0;

    items.forEach((item) => {
        const [itemName, itemPrice] = item.value.split(",");
        const parentDiv = item.closest(".menu-item"); // Find the closest menu item div
        const quantityInput = parentDiv.querySelector(".qty"); // Get quantity input within that div
        const quantity = parseInt(quantityInput.value);

        if (quantity < 1) {
            alert("Quantity must be at least 1");
            return;
        }

        const price = parseInt(itemPrice) * quantity;

        orderedItems.push({ name: itemName, price: parseInt(itemPrice), quantity, total: price });
        totalPrice += price;
    });

    // Store data in Local Storage
    localStorage.setItem("name", name);
    localStorage.setItem("table", table);
    localStorage.setItem("items", JSON.stringify(orderedItems));
    localStorage.setItem("total", totalPrice);

    window.location.href = "bill.html"; // Redirect to bill page
});
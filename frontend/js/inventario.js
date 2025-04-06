document.addEventListener("DOMContentLoaded", function () {
    const inventoryData = [
        [1, "US0000001", "White Printed Shirt", "Men's Clothing", "Zomoe", 200, 20, 30],
        [2, "US0000002", "Pink High Neck Top", "Women's Clothing", "Azafa", 400, 15.89, 25.28],
        [3, "US0000003", "Black Leather Jacket", "Women's Clothing", "Radra", 250, 101.02, 130.21],
        [4, "US0000004", "Blue Polka Dot Socks", "Kid’s Clothing", "Jiny and gin", 120, 13.26, 18.92],
        [5, "US0000005", "White Hand Bag", "Women's Accessories", "Giva", 150, 59.78, 82.36],
        [6, "", "", "", "", "", "", ""],
        [7, "", "", "", "", "", "", ""],
        [8, "", "", "", "", "", "", ""],
        [9, "", "", "", "", "", "", ""],
        [10, "", "", "", "", "", "", ""]
    ];

    const tableBody = document.getElementById("inventory-body");
    inventoryData.forEach(rowData => {
        const row = document.createElement("tr");
        if (rowData[0] % 2 !== 0) {
            row.classList.add("red-bg");
        }
        rowData.forEach(cellData => {
            const cell = document.createElement("td");
            cell.textContent = cellData || "Add text here";
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
});

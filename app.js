const darkModeToggle = document.querySelector(".dark-mode-toggle");
const groceryForm = document.querySelector(".grocery-form");
const groceryInput = document.getElementById("grocery");
const groceryDateInput = document.getElementById("grocery-date");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const checkAllBtn = document.querySelector(".check-all-btn"); // Tombol Centang Semua Tugas
const currentDateElement = document.getElementById("current-date");

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = darkModeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

// Add Grocery Item
groceryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = groceryInput.value;
  const dateValue = groceryDateInput.value;

  // Cek apakah item sudah ada dalam daftar
  const existingItems = Array.from(groceryList.children);
  const itemExists = existingItems.some(
    (item) =>
      item.querySelector("span").textContent.toLowerCase() ===
      value.toLowerCase()
  );

  if (itemExists) {
    // Jika sudah ada, tampilkan pesan error
    alert("Item sudah ada dalam daftar!");
    groceryInput.value = ""; // Kosongkan input
    return;
  }

  if (value) {
    const li = document.createElement("li");
    li.classList.add("grocery-item");
    li.innerHTML = `
      <input type="checkbox" class="check-btn" />
      <span>${value}</span>
      <span class="date">${
        dateValue ? new Date(dateValue).toLocaleDateString() : "No date"
      }</span>
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    groceryList.appendChild(li);
    groceryContainer.classList.add("show-container");
    groceryInput.value = "";
    groceryDateInput.value = ""; // Reset input tanggal

    // Delete Item
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      if (groceryList.children.length === 0) {
        groceryContainer.classList.remove("show-container");
      }
    });

    // Edit Item
    li.querySelector(".edit-btn").addEventListener("click", () => {
      groceryInput.value = value;
      groceryDateInput.value = dateValue;
      li.remove();
    });

    // Toggle Checkbox for Completed Task
    li.querySelector(".check-btn").addEventListener("click", (e) => {
      const task = e.target.closest("li");
      task.classList.toggle("completed"); // Toggle class 'completed' to mark as done
    });
  }
});

// Clear All Items
clearBtn.addEventListener("click", () => {
  groceryList.innerHTML = "";
  groceryContainer.classList.remove("show-container");
});

// Centang Semua Item
checkAllBtn.addEventListener("click", () => {
  const allItems = Array.from(groceryList.children); // Ambil semua item dalam daftar
  allItems.forEach(item => {
    const checkbox = item.querySelector(".check-btn");
    if (!checkbox.checked) {
      checkbox.click(); // Jika checkbox belum dicentang, klik untuk mencentangnya
    }
  });
});

// Menampilkan tanggal saat ini
function displayCurrentDate() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateString = currentDate.toLocaleDateString("en-US", options);
  currentDateElement.textContent = `Today's Date: ${dateString}`;
}

// Panggil fungsi untuk menampilkan tanggal
displayCurrentDate();

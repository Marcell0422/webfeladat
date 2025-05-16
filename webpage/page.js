const form = document.getElementById("userForm");
const responseBox = document.getElementById("responseBox");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    };

    try {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    const data = await response.json();
    responseBox.textContent = `Sikeres POST művelet! \n\n${JSON.stringify(data, null, 2)}`;
    } catch (error) {
    responseBox.textContent = "Hiba történt: " + error.message;
    }
});
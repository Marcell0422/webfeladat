const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const URL = "https://jsonplaceholder.typicode.com/users";

// GET / – összes felhasználó
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Nem sikerült lekérni a felhasználókat." });
  }
});

// POST /users – új felhasználó (kézzel megadott id-vel)
app.post("/users", async (req, res) => {
  const newUser = req.body;
  if (!newUser.id) {
    return res.status(400).json({ error: "Az 'id' mező megadása kötelező." });
  }

  try {
    const response = await axios.post(URL, newUser);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Nem sikerült hozzáadni a felhasználót." });
  }
});

// PUT /users/:id – felhasználó módosítása
app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const response = await axios.put(`${URL}/${id}`, updatedData);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Nem sikerült módosítani a felhasználót." });
  }
});

// DELETE /users/:id – felhasználó törlése
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await axios.delete(`${URL}/${id}`);
    res.json({ message: `Felhasználó (${id}) törölve.` });
  } catch (err) {
    res.status(500).json({ error: "Nem sikerült törölni a felhasználót." });
  }
});

app.listen(PORT, () => {
  console.log(`A szerver fut a ${PORT} porton.`);
});
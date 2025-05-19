const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chrono_explorer",
  timezone: "Z",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL:", err);
  } else {
    console.log("Connecté à la base de données chrono_explorer");
  }
});

// GET all media
app.get("/media", (req, res) => {
  db.query("SELECT * FROM media", (err, results) => {
    if (err) res.status(500).send("Erreur serveur");
    else res.json(results);
  });
});

// GET single media
app.get("/media/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM media WHERE id = ?", [id], (err, results) => {
    if (err) res.status(500).send("Erreur serveur");
    else res.json(results[0]);
  });
});

// GET media image
app.get("/media/image/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT url FROM media WHERE type='image' and event_id = ?",
    [id],
    (err, results) => {
      if (err) res.status(500).send("Erreur serveur");
      else res.json(results[0]);
    }
  );
});

// POST new media
app.post("/media", (req, res) => {
  const { event_id, type, url } = req.body;
  db.query(
    "INSERT INTO media (event_id, type, url) VALUES (?, ?, ?)",
    [event_id, type, url],
    (err) => {
      if (err) res.status(500).send("Erreur serveur");
      else res.send("Média ajouté");
    }
  );
});

// PUT update media
app.put("/media/:id", (req, res) => {
  const id = req.params.id;
  const { event_id, type, url } = req.body;
  db.query(
    "UPDATE media SET event_id=?, type=?, url=? WHERE id=?",
    [event_id, type, url, id],
    (err) => {
      if (err) res.status(500).send("Erreur serveur");
      else res.send("Média mis à jour");
    }
  );
});

// DELETE media
app.delete("/media/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM media WHERE id = ?", [id], (err) => {
    if (err) res.status(500).send("Erreur serveur");
    else res.send("Média supprimé");
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Media Service démarré sur http://localhost:${PORT}`);
});

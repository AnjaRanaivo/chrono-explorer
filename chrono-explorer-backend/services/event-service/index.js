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

// GET all events
app.get("/events", (req, res) => {
  db.query(
    "SELECT e.id,e.civilisation,e.title as titre, e.date, e.theme,e.location as lieu, e.description, p.name as periode FROM events e join periods p on e.period_id=p.id order by e.date",
    (err, results) => {
      if (err) res.status(500).send("Erreur serveur " + err.message);
      else res.json(results);
    }
  );
});

// GET favorite events by user id
app.get("/events/fav/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT e.id,e.civilisation,e.title as titre, e.date, e.theme,e.location as lieu, e.description, p.name as periode FROM events e join periods p on e.period_id=p.id right join user_favorites f on f.event_id=e.id where f.user_id= ? order by e.date",
    [id],
    (err, results) => {
      if (err) res.status(500).send("Erreur serveur " + err.message);
      else res.json(results);
    }
  );
});

// GET single event
app.get("/events/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT e.id,e.civilisation,e.title as titre, e.date, e.theme,e.location as lieu, e.description, p.name as periode FROM events e join periods p on e.period_id=p.id WHERE e.id = ?",
    [id],
    (err, results) => {
      if (err) res.status(500).send("Erreur serveur");
      else res.json(results[0]);
    }
  );
});

// GET event comments
app.get("/events/comments/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT c.id,c.content, c.created_at,u.username from comments c join users u on c.user_id=u.id WHERE c.status = 'approved' and c.event_id = ?",
    [id],
    (err, results) => {
      if (err) res.status(500).send("Erreur serveur" + err.message);
      else res.json(results);
    }
  );
});

// GET comments pending
app.get("/comments/pending", (req, res) => {
  db.query(
    "SELECT c.id,e.title,c.content, c.created_at,u.username,c.event_id from comments c join users u on c.user_id=u.id join events e on e.id=c.event_id WHERE c.status = 'pending'",
    (err, results) => {
      if (err) res.status(500).send("Erreur serveur " + err.message);
      else res.json(results);
    }
  );
});

// POST a comment on an event by a user
app.post("/events/comments", (req, res) => {
  const { content, user_id, event_id } = req.body;

  if (!content || !user_id || !event_id) {
    return res.status(400).send("Champs requis manquants");
  }

  db.query(
    "INSERT INTO comments (content, user_id, event_id, status, created_at) VALUES (?, ?, ?, 'pending', NOW())",
    [content, user_id, event_id],
    (err, result) => {
      if (err) {
        res.status(500).send("Erreur serveur: " + err.message);
      } else {
        res.status(201).json({ message: "Commentaire soumis pour validation" });
      }
    }
  );
});

// POST new event
app.post("/events", (req, res) => {
  const { title, description, date, location, theme, period_id } = req.body;
  db.query(
    "INSERT INTO events (title, description, date, location, theme, period_id) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description, date, location, theme, period_id],
    (err) => {
      if (err) res.status(500).send("Erreur serveur");
      else res.send("Événement ajouté avec succès");
    }
  );
});

// PUT update event
app.put("/events/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, date, location, theme, period_id } = req.body;
  db.query(
    "UPDATE events SET title=?, description=?, date=?, location=?, theme=?, period_id=? WHERE id=?",
    [title, description, date, location, theme, period_id, id],
    (err) => {
      if (err) res.status(500).send("Erreur serveur");
      else res.send("Événement mis à jour");
    }
  );
});

// PUT update comment
app.put("/comment/:id/validate", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE comments SET status = 'approved' WHERE id=?",
    [id],
    (err) => {
      if (err) res.status(500).send("Erreur serveur" + err);
      else res.status(201).json({ message: "Commentaire validée" });
    }
  );
});

// DELETE comment
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM comments WHERE id = ?", [id], (err) => {
    if (err) res.status(500).send("Erreur serveur");
    else res.status(201).json({ message: "Commentaire supprimée" });
  });
});

// DELETE event
app.delete("/events/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM events WHERE id = ?", [id], (err) => {
    if (err) res.status(500).send("Erreur serveur");
    else res.send("Événement supprimé");
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Event Service démarré sur http://localhost:${PORT}`);
});

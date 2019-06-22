const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// ROOT GET ----------------------

// Récupération de l'ensemble des données

app.get("/api/atelierFil", (req, res) => {
  connection.query("SELECT * from atelierFil", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      res.json(results);
    }
  });
});

// Récupération des champs firstname

app.get("/api/atelierFil/name", (req, res) => {
  connection.query("SELECT firstname from atelierFil", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des noms.");
    } else {
      res.json(results);
    }
  });
});

// Récup avec filtre

app.get("/api/atelierFil/name/stephane", (req, res) => {
  connection.query(
    "SELECT firstname, comment from atelierFil WHERE firstname='stephane'",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des données.");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/api/atelierFil/name/j", (req, res) => {
  connection.query(
    "SELECT * from atelierFil WHERE firstname LIKE 'j%'",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des données.");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/api/atelierFil/name/sup", (req, res) => {
  connection.query(
    "SELECT * from atelierFil WHERE birthday > '2017-01-01'",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des données.");
      } else {
        res.json(results);
      }
    }
  );
});

// Tri par ordre alpha

app.get("/api/atelierFil/name/order", (req, res) => {
  connection.query(
    "SELECT * from atelierFil ORDER BY firstname ASC",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des données.");
      } else {
        res.json(results);
      }
    }
  );
});

// ------------------------------------------------

// ROOT POST

app.post("/api/atelierFil/post", (req, res) => {
  const formData = req.body;
  console.log(formData);

  connection.query("INSERT INTO atelierFil SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde.");
    } else {
      res.sendStatus(200);
    }
  });
});

// ------------------------------------------

// ROOT PUT

app.put("/api/atelierFil/:id", (req, res) => {
  const idPers = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE atelierFil SET ? WHERE id = ?",
    [formData, idPers],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification.");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put("/api/atelierFil/toggle/:id", (req, res) => {
  const idPers = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE atelierFil SET work=? WHERE id = ?",
    [formData, idPers],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification.");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// ---------------------------------------------

// ROOT DELETE

app.delete("/api/atelierFil/:id", (req, res) => {
  const idPers = req.params.id;

  connection.query("DELETE FROM atelierFil WHERE id = ?", [idPers], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression.");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete("/api/atelierFil/suppr", (req, res) => {
  connection.query(
    "DELETE FROM atelierFil WHERE work = false",

    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression.");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// -----------------------------------------

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});

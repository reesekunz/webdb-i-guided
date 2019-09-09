const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (request, response) => {
  // in SQL the translation is select * from posts
  db.select("*")
    // select('title', 'contents')
    .from("posts")
    .then(posts => {
      response.status(200).json(posts);
    })
    .catch(error => {
      response.json(error);
    });
});

router.get("/:id", (request, response) => {
  // in SQL the translation is select * from posts where id = 2
  const { id } = request.params;
  db("posts")
    .where({ id })
    // grabbing the first id so data isnt returned as an array
    .first()
    .then(posts => {
      response.status(200).json(posts);
      //   response.status(200).json(posts[0]); - another way to grab first id instead of using first
    })
    .catch(error => {
      response.json(error);
    });
});

router.post("/", (request, response) => {
  // in SQL the translation is insert into posts () values ()
  const postData = request.body;
  // be sure to validate the postData before inserting into the db (using custom middleware)
  db("posts")
    .insert(postData, "id")
    .then(posts => {
      response.status(200).json(posts);
      //   response.status(200).json(posts[0]); - another way to grab first id instead of using first
    })
    .catch(error => {
      response.json(error);
    });
});

router.put("/:id", (request, response) => {
  // in SQL the translation is update posts set ... where id = 123

  const changes = request.body;
  const { id } = request.params;

  db("posts")
    .where({ id })
    .update(changes)
    .then(count => {
      response.status(200).json({ message: `updated ${count} post` });
    })
    .catch(error => {
      response.json(error);
    });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  // in SQL the translation is delete from posts where ...
  db("posts")
    .where({ id })
    .delete()
    .then(count => {
      response.status(200).json({ message: `deleted ${count} post` });
    })
    .catch(error => {
      response.json(error);
    });
});

module.exports = router;

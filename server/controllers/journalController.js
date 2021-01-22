let express = require("express");
let router = express.Router();
const Journal = require("../db").import("../models/journal");
let validateSession = require("../middleware/validate-session");

router.get("/practice", validateSession, function(req, res) {
  res.send("This is a practice route.");
})

// CREATE

router.post("/create", validateSession, (req, res) => {
  const journalEntry = {
    title: req.body.journal.title,
    entry: req.body.journal.entry,
    date: req.body.journal.date,
    owner: req.user.id
  }
  Journal.create(journalEntry)
    .then(journal => res.status(200).json(journal))
    .catch(err => res.status(500).json({ error: err })) 
})

// GET ALL ENTRIES

router.get("/", (req, res) => {
  Journal.findAll()
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err }))
})

// GET BY USER

router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id
  Journal.findAll({
    where: { owner: userid }
  })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err }))
})

// GET BY TITLE

router.get("/:title", function (req, res) {
  let title = req.params.title;

  Journal.findAll({
    where: { title: title }
  })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err })) 
})

// PUT - UPDATE ENTRY

router.put("/update/:entryId", validateSession, function(req, res) {
  const updateJournalEntry = {
    title: req.body.journal.title,
    entry: req.body.journal.entry,
    date: req.body.journal.date
  }

  const query = { where: { id: req.params.entryId, owner: req.user.id }};

  Journal.update(updateJournalEntry, query)
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err })) 

})

// DELETE

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id }};

  Journal.destroy(query)
    .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
    .catch(err => res.status(500).json({ error: err })) 
})

module.exports = router;
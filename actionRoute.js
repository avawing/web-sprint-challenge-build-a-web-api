const express = require("express");
const actionsDb = require("./data/helpers/actionModel");
const actionRouter = express.Router();

function validateId(req, res, next) {
  actionsDb.Db.get(req.params.id)
    .then((result) => next())
    .catch((err) => res.status(404).json({ message: "Action not found" }))
    .end();
}

actionRouter.get("/:id", validateId, (req, res, next) => {
  actionsDb
    .get(req.params.id)
    .then((action) => res.status(200).json(action).end())
    .catch((err) => res.status(500).json({ message: "Server fucked up" }))
    .end();
});

actionRouter.put("/:id", validateId, (req, res, next) => {
  if (
    req.body.project_id === "" ||
    req.body.description === "" ||
    req.body.notes === ""
  ) {
    res.status(400).json({ message: "Please fill all fields" }).end();
  } else {
    actionsDb
      .update(req.params.id, req.body)
      .then((response) => res.status(200).json(response).end())
      .catch((err) =>
        res.status(500).json({ message: "Unable to update" }).end()
      );
  }
});

actionRouter.delete("/:id", (req, res, next) => {
  actionsDb.get(req.params.id).then((result) => {
    result
      ? actionsDb
          .remove(req.params.id)
          .then((result) =>
            result === 1
              ? res.status(204).json({ message: "Item removed" }).end()
              : res.status(500).json({ message: "Something went wrong" }).end()
          )
      : res.status(404).json({ message: "Not Found" }).end();
  });
});

module.exports = actionRouter;

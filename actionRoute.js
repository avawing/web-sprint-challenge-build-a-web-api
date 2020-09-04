const express = require("express");
const actionsDb = require("./data/helpers/actionModel");
const actionRouter = express.Router();

function validateId(req, res, next) {
  actionsDb
    .get(req.params.id)
    .then((result) => next(result))
    .catch((err) =>
      res.status(404).json({ message: "Action not found" }).end()
    );
  return;
}

actionRouter.get("/:id", validateId, (req, res, next) => {
  actionsDb
    .get(req.params.id)
    .then((action) => res.status(200).json(action).end())
    .catch((err) =>
      res.status(500).json({ message: "Server fucked up" }).end()
    );
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

actionRouter.delete("/:id", validateId, (req, res, next) => {
  actionsDb
    .remove(req.params.id)
    .then((result) => res.status(204).json({ message: "Item removed" }).end())
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong" }).end()
    );
});

module.exports = actionRouter;

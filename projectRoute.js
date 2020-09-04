const express = require("express");
const projectDb = require("./data/helpers/actionModel");
const actionsDb = require("./data/helpers/actionModel");
const projectRouter = express.Router();

function validateId(req, res, next) {
  projectDb
    .get(req.params.id)
    .then(next())
    .catch((e) => res.status(404).json({ message: "Not Found" }).end());
}

projectRouter.get("/:id", validateId, (req, res, next) => {
  projectDb
    .get(req.params.id)
    .then((result) => {
      res.status(200).json(result).end();
    })
    .catch((e) => res.status(500).json({ message: "something went wrong" }));
});

projectRouter.post("/", (req, res, next) => {
  projectDb
    .insert(req.body)
    .then((response) => res.status(201).json(response).end())
    .catch((e) =>
      res.status(500).json({ message: "There was an error" }).end()
    );
});

projectRouter.post("/:id/actions", validateId, (req, res, next) => {
  const actions = req.body;
  actions.project_id = req.params.id;
  actionsDb
    .insert(actions)
    .then((action) => res.status(201).json(action).end())
    .catch((e) =>
      res.status(500).json({ message: "There was a problem" }).end()
    );
});

projectRouter.put("/:id", validateId, (req, res, next) => {
  projectDb
    .update(req.params.id, req.body)
    .then((result) => res.status(201).json(result).end())
    .catch((e) =>
      res.status(500).json({ message: "Something went wrong" }).end()
    );
});

projectRouter.delete("/:id", validateId, (req, res, next) => {
  projectDb
    .remove(req.params.id)
    .then((result) => res.status(204).json({ message: "Item removed" }).end())
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong" }).end()
    );
});

module.exports = projectRouter;

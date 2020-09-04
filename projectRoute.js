const express = require("express")
const projectDb = require("./data/helpers/actionModel");
const actionsDb = require("./data/helpers/actionModel")
const projectRouter = express.Router()

projectRouter.get("/:id", (req, res, next) => {
    projectDb.get(req.params.id).then((result) => {
      result
        ? res.status(200).json(result).end()
        : res.status(404).json({ message: "Not Found" }).end();
    });
  });

  projectRouter.post("/", (req, res, next) => {
    projectDb
      .insert(req.body)
      .then((response) =>
        response
          ? res.status(201).json(response).end()
          : res.status(500).json({ message: "There was an error" }).end()
      );
  });
  projectRouter.post("/:id/actions", (req, res, next) => {
    const actions = req.body;
    actions.project_id = req.params.id;
    projectDb.get(req.params.p_id).then((project) => {
      project
        ? actionsDb
            .insert(actions)
            .then((action) =>
              action
                ? res.status(201).json(action).end()
                : res.status(500).json({ message: "There was a problem" }).end()
            )
        : res.status(404).json({ message: "Project not found" }).end();
    });
  });
  projectRouter.put("/:id", (req, res, next) => {
    projectDb.get(req.params.id).then((result) => {
      result
        ? projectDb
            .update(req.params.id, req.body)
            .then((result) =>
              result
                ? res.status(201).json(result).end()
                : res.status(500).json({ message: "Something went wrong" }).end()
            )
        : res.status(404).json({ message: "Not Found" }).end();
    });
  });

  projectRouter.delete('/:id',(req, res, next)=>{
    projectDb.get(req.params.id).then((result) => {
        result
          ? projectDb
              .remove(req.params.id)
              .then((result) =>
                result === 1
                  ? res.status(204).json({message: "Item removed"}).end()
                  : res.status(500).json({ message: "Something went wrong" }).end()
              )
          : res.status(404).json({ message: "Not Found" }).end();
      });
})
  

module.exports = projectRouter
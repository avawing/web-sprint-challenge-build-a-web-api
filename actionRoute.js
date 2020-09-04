const express = require("express")
const actionsDb = require("./data/helpers/actionModel");
const actionRouter = express.Router()



actionRouter.get("/:id", (req, res, next) => {
    actionsDb
      .get(req.params.id)
      .then((action) =>
        action
          ? res.status(200).json(action)
          : res.status(404).json({ message: "Action not found" }).end()
      );
  });

  actionRouter.put("/:id", (req, res, next) => {
    actionsDb.get(req.params.id).then((result) => {
      result
        ? actionsDb
            .update(req.params.id, req.body)
            .then((response) =>
              response
                ? res.status(200).json(response).end()
                : res.status(500).json({ message: "Unable to update" }).end()
            )
        : res.status(404).json({ message: "action not found" }).end();
    });
  });

  actionRouter.delete('/:id',(req, res, next)=>{
    actionsDb.get(req.params.id).then((result) => {
        result
          ? actionsDb
              .remove(req.params.id)
              .then((result) =>
                result === 1
                  ? res.status(204).json({message: "Item removed"}).end()
                  : res.status(500).json({ message: "Something went wrong" }).end()
              )
          : res.status(404).json({ message: "Not Found" }).end();
      });
})

module.exports = actionRouter;
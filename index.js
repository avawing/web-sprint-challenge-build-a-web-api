const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const projectDb = require("./data/helpers/projectModel");
const actionsDb = require("./data/helpers/actionModel");

const server = express();

server.use(express.json());
server.use("/", morgan("tiny"));
server.use("/", helmet());

server.get("/", (req, res, next) => {
  res.send("Hi");
});

server.get("/projects/:id", (req, res, next) => {
  projectDb.get(req.params.id).then((result) => {
    result
      ? res.status(200).json(result).end()
      : res.status(404).json({ message: "Not Found" }).end();
  });
});

server.get("actions/:id", (req, res, next) => {
  actionsDb
    .get(req.params.id)
    .then((action) =>
      action
        ? res.status(200).json(action)
        : res.status(404).json({ message: "Action not found" }).end()
    );
});

server.post("/projects", (req, res, next) => {
  projectDb
    .insert(req.body)
    .then((response) =>
      response
        ? res.status(201).json(response).end()
        : res.status(500).json({ message: "There was an error" }).end()
    );
});

server.post("/projects/:id/actions", (req, res, next) => {
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

server.put("/projects/:id", (req, res, next) => {
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

server.put("actions/:id", (req, res, next) => {
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

server.delete('/projects/:id',(req, res, next)=>{
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

server.delete('/actions/:id',(req, res, next)=>{
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
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server is listening on ${port}`));

/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const router = require("express").Router();
const { workout } = require("../models");

router.get("/api/workouts", async (req, res) => {
  workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration", },
      },
    },
  ])
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", ({body}, res) => {
  workout.create({body})
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({body}, res) => {

  workout.findByIdToUpdate( 
    req.params.id,
    { $push: { exercises: req.body}},
    { new: true, runValidators: true })
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", async (req, res) => {
  workout.aggregate([
    {
      $addFields: {
        totalDuration: 
        { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ _id: -1})
    .limit(7)
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.delete('/api/workouts',({ body }, res) =>{
  workout.findByIdToDelete(body.id)
  .then(() =>{
    res.json(true);
  })
  .catch((e) => {
    res.json(e);
  });
});


module.exports = router;

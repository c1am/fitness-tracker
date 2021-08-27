const router = require("express").Router();
const { Workout } = require("../models");

router.get("/api/workouts", async (req, res) => {
  Workout.aggregate([
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
  Workout.create({body})
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({body}, res) => {

  Workout.findByIdToUpdate( 
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
  Workout.aggregate([
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
  Workout.findByIdToDelete(body.id)
  .then(() =>{
    res.json(true);
  })
  .catch((e) => {
    res.json(e);
  });
});


module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now
  },

  exercises: [
    {
        type: {
            type: String,
            trim: true,
            required: "Enter the exercise type (resistance, cardio, etc.): "
        },

        name: {
            type: String,
            trim: true,
            required: "Enter the exercise name: "
        },  

        duration: {
            type: Number,
            required: "Enter the exercise duration (minutes): "
        },

        weight: {
            type: Number,
            required: [false, "Enter the weight of the exercise (if applicable and in pounds): "]
        },

        distance: {
            type: Number,
            required: [false, "Enter the distance (if applicable and in miles): "]
        },

        reps: {
            type: Number,
            required: [false, "Enter the number of reps completed: "]
        },

        sets: {
            type: Number,
            required: [false, "Enter the number of sets completed: "]
        }
  }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
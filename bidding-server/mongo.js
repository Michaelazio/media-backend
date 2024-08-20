import mongoose from "mongoose";

export const mongo = async() => await mongoose.connect('mongodb+srv://kunalmukherjee12:YBKghOwNraL6RUSc@bidding.td5we.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    folder: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

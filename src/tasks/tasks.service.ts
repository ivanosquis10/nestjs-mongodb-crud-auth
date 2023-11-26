import { type Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task } from '../schemas/task.schema'
import type { CreateTaskDto } from '../dto/create-task.dto'
import type { UpdateTaskDto } from '../dto/update-task.dto'

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(task: CreateTaskDto) {
    const newTask = new this.taskModel(task)

    // guaramos
    await newTask.save()

    // retornamos
    return newTask
  }

  async updatedTask(id: string, task: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true })
  }

  async deleteTask(id: string) {
    return this.taskModel.findByIdAndDelete(id)
  }

  async findAll() {
    return this.taskModel.find()
  }

  async findById(id: string) {
    return this.taskModel.findById(id)
  }
}

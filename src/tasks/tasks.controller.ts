import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, NotFoundException } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from 'src/dto/create-task.dto'
import { UpdateTaskDto } from 'src/dto/update-task.dto'

// Aqui se define la ruta
@Controller('tasks') // -> url/tasks
export class TasksController {
  constructor(private taskService: TasksService) {}

  // Crearemos las rutas

  // Get all tasks -> url/tasks
  @Get()
  async findAll() {
    try {
      return await this.taskService.findAll()
    } catch (error) {
      throw error
    }
  }

  // Get by id -> url/tasks/:id
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const taksById = await this.taskService.findById(id)

      if (!taksById) throw new NotFoundException('Task not found')

      return taksById
    } catch (error) {
      throw error
    }
  }

  // Create a taks -> url/tasks
  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    try {
      return await this.taskService.createTask(task)
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists')
      }
      throw error
    }
  }

  // Update a task -> url/tasks/:id
  @Put(':id')
  async updatedTask(@Param('id') id: string, @Body() newTask: UpdateTaskDto) {
    try {
      const task = await this.taskService.updatedTask(id, newTask)

      if (!task) throw new NotFoundException('Task not found')

      return {
        message: 'Task updated successfully',
        task
      }
    } catch (error) {
      throw error
    }
  }

  // Delete a task -> url/tasks/:id
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      const tasks = await this.taskService.deleteTask(id)

      if (!tasks) throw new NotFoundException('Task not found')

      return { message: 'Task deleted successfully' }
    } catch (error) {
      throw error
    }
  }
}

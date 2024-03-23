const { success, failed } = require('../../config/response');
const Modal = require('./model');

class TasksController {
  async getAllTask(_req, res) {
    try {
      const result = await Modal.getAllTask();
      success(res).ok(result);
    } catch (error) {
      failed(res).serverError(error);
    }
  }

  async createTask(req, res) {
    try {
      const result = await Modal.createTask(req.payload);
      success(res).ok(result, `Task has been created`);
    } catch (error) {
      failed(res).serverError(error);
    }
  }

  async getTask(req, res) {
    try {
      const result = await Modal.getTask(req.payload.id);
      success(res).ok(result);
    } catch (error) {
      failed(res).serverError(error);
    }
  }

  async updateTask(req, res) {
    try {
      const { id, ...content } = req.payload;
      const result = await Modal.updateTask(id, content);
      success(res).ok(result, `Task has been updated`);
    } catch (error) {
      failed(res).serverError(error);
    }
  }

  async deleteTask(req, res) {
    try {
      const result = await Modal.deleteTask(req.payload.id);
      success(res).ok(result, `Task has been deleted`);
    } catch (error) {
      failed(res).serverError(error);
    }
  }

  async checkTaskExist(req, res, next) {
    try {
      const isTaskExist = await Modal.checkTaskExist(req.payload.id);
      if (!isTaskExist) {
        return failed(res).clientError(
          null,
          `task id : ${req.payload.id} does not exist`
        );
      }
      next();
    } catch (error) {
      failed(res).serverError(error);
    }
  }
}

module.exports = new TasksController();

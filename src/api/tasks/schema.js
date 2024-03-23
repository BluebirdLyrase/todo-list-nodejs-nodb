const Joi = require('joi');
const dayjs = require(`dayjs`);

class TasksSchema {
  taskId = Joi.object().keys({
    id: Joi.string().required(),
  });
  taskProps = Joi.object().keys({
    title: Joi.string().default(``),
    detail: Joi.string().default(``),
    dueDate: Joi.date().default(() => dayjs().format('YYYY-MM-DD')),
    status: Joi.string().required().valid('TODO', 'DOING', 'DONE', 'BACKLOG'),
  });
}

module.exports = new TasksSchema();

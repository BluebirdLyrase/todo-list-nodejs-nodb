const { validateSchema } = require('../../middleware/validate-schema.js');
const Schema = require('./schema');
const Controller = require('./controller');
const router = require('express')['Router']();

router.get('', Controller.getAllTask);

router.post(
  '',
  validateSchema([{ schema: Schema.taskProps }]),
  Controller.createTask
);

router.get(
  '/:id',
  validateSchema([{ schema: Schema.taskId, key: `params` }]),
  Controller.checkTaskExist,
  Controller.getTask
);

router.patch(
  '/:id',
  validateSchema([
    { schema: Schema.taskId, key: `params` },
    { schema: Schema.taskProps },
  ]),
  Controller.checkTaskExist,
  Controller.updateTask
);

router.delete(
  '/:id',
  validateSchema([{ schema: Schema.taskId, key: `params` }]),
  Controller.checkTaskExist,
  Controller.deleteTask
);

module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const todoController = require('./controllers/todoController');
const calController = require('./controllers/calController');
const spaceController = require('./controllers/spaceController');

router.get('/todos', todoController.getTodoList);
router.post('/todos', todoController.postTodoList);
router.get('/cal', calController.getCalEvents);
router.post('/cal', calController.addCalEvent);
router.get('/space', spaceController.getCanvasCoordinates);
router.post('/update/space', spaceController.updateCanvasCoordinates);
router.post('/clear/space', spaceController.clearCanvasCoordinates);

module.exports = router;

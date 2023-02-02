const { task } = require('../../database/models');
const taskServices = require('../../src/services/taskServices');



describe('Task Services Testing', () => {
  describe('Get all task', () => {
    it('Should return an array of tasks', async () => {
      const mockResult = [
        {
          "id": 4,
          "title": "kajra re",
          "isCompleted": false,
          "createdAt": "2023-01-31T08:03:26.185Z",
          "updatedAt": "2023-01-31T08:03:26.185Z"
        },
        {
          "id": 11,
          "title": "kajra re",
          "isCompleted": false,
          "createdAt": "2023-02-02T04:32:56.307Z",
          "updatedAt": "2023-02-02T04:32:56.307Z"
        }
      ];
      jest.spyOn(task, 'findAll').mockResolvedValue(mockResult);
      const result = await taskServices.getAllTasks();
      expect(result).toBe(mockResult);
    })
  });
  describe('Get a task', () => {
    it('Should return a task', async () => {
      const mockResult = {
        "id": 4,
        "title": "kajra re",
        "isCompleted": false,
        "createdAt": "2023-01-31T08:03:26.185Z",
        "updatedAt": "2023-01-31T08:03:26.185Z"
      };
      jest.spyOn(task, 'findOne').mockResolvedValue(mockResult);
      const result = await taskServices.getTask(4);
      expect(result).toBe(mockResult);
    });
    it('SHould return null if task not found', async () => {
      jest.spyOn(task, 'findOne').mockResolvedValue(null);
      const result = await taskServices.getTask(4);
      expect(result).toBe(null);
    });
  });
  describe('Post a task', () => {
    it('Should return a task', async () => {
      const mockResult = {
        "id": 4,
        "title": "kajra re",
        "isCompleted": false,
        "createdAt": "2023-01-31T08:03:26.185Z",
        "updatedAt": "2023-01-31T08:03:26.185Z"
      };
      jest.spyOn(task, 'create').mockResolvedValue(mockResult);
      const result = await taskServices.postTask(mockResult);
      expect(result).toBe(mockResult);
    });
  });
  describe('Edit a task', () => {
    it('Should return a task', async () => {
      const mockResult = {
        "id": 4,
        "title": "kajra re",
        "isCompleted": false,
        "createdAt": "2023-01-31T08:03:26.185Z",
        "updatedAt": "2023-01-31T08:03:26.185Z",
        save: jest.fn()
      };
      jest.spyOn(task, 'findOne').mockResolvedValue(mockResult);
      const result = await taskServices.editTask(4, mockResult);
      expect(result).toBe(mockResult);
    });
    it('Should return null if task not found', async () => {
      jest.spyOn(task, 'findOne').mockResolvedValue(null);
      const result = await taskServices.editTask(4);
      expect(result).toBe(null);
    });
  });
  describe('Complete a task', () => {
    it('Should return a task', async () => {
      const mockResult = {
        "id": 4,
        "title": "kajra re",
        "isCompleted": false,
        "createdAt": "2023-01-31T08:03:26.185Z",
        "updatedAt": "2023-01-31T08:03:26.185Z",
        save: jest.fn()
      };
      jest.spyOn(task, 'findOne').mockResolvedValue(mockResult);

      const result = await taskServices.completeTask(4);
      expect(result).toBe(mockResult);
    });
    it('Should return null if task not found', async () => {
      jest.spyOn(task, 'findOne').mockResolvedValue(null);
      const result = await taskServices.completeTask(4);
      expect(result).toBe(null);
    });
  });
  describe('Delete a task', () => {
    it('Should delete and return the task', async () => {
      const mockResult = {
        "id": 4,
        "title": "kajra re",
        "isCompleted": false,
        "createdAt": "2023-01-31T08:03:26.185Z",
        "updatedAt": "2023-01-31T08:03:26.185Z",
        destroy: jest.fn(),
      };
      jest.spyOn(task, 'findOne').mockResolvedValue(mockResult);
      const result = await taskServices.deleteTask(4);
      expect(result).toBe(mockResult);
    });
    it('Should return null if task not found', async () => {
      jest.spyOn(task, 'findOne').mockResolvedValue(null);
      const result = await taskServices.deleteTask(4);
      expect(result).toBe(null);
    });
  });
  describe('Delete completed tasks', () => {
    it('Should return a task', async () => {
      const mockResult = [
        {
          "id": 4,
          "title": "kajra re",
          "isCompleted": false,
          "createdAt": "2023-01-31T08:03:26.185Z",
          "updatedAt": "2023-01-31T08:03:26.185Z"
        },
        {
          "id": 11,
          "title": "kajra re",
          "isCompleted": false,
          "createdAt": "2023-02-02T04:32:56.307Z",
          "updatedAt": "2023-02-02T04:32:56.307Z"
        }
      ];
      jest.spyOn(task, 'destroy').mockResolvedValue(mockResult);
      await taskServices.deleteCompletedTasks();
      expect().toBe(mockResult);
    });
  });
});

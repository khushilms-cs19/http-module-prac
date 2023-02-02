const taskServices = require('../../src/services/taskServices');
const taskController = require('../../src/controllers/taskController');
const taskMiddleware = require('../../src/middlewares/taskMiddlewares');

describe('Task Controller', () => {
  describe('Get all Tasks', () => {
    it('Should return all tasks', async () => {
      const mockResult = [{ id: 1, title: 'Task 1', isCompleted: false }];
      jest.spyOn(taskServices, 'getAllTasks').mockResolvedValue(mockResult);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.getAllTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
  });
  describe('Get a Task', () => {
    it('Should return a task', async () => {
      const mockResult = { id: 1, title: 'Task 1', isCompleted: false };
      jest.spyOn(taskServices, 'getTask').mockResolvedValue(mockResult);
      const mockReq = {
        params: {
          id: 1,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await taskController.getTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should return 404 error', async () => {
      jest.spyOn(taskServices, 'getTask').mockResolvedValue(null);
      const mockReq = {
        params: {
          id: 2,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await taskController.getTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Task not found' });
    });
    it('Should return 500 Error', async () => {
      jest.spyOn(taskServices, 'getTask').mockRejectedValue(null);
      const mockReq = {
        params: {
          id: 'jai mata di',
        }
      }
      const mockjson = jest.fn();
      const mockRes = {
        status: jest.fn(() => ({
          json: mockjson,
        }))
      }
      await taskController.getTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockjson).toBeCalledWith({ error: 'Something went wrong' });
    });
  });
  describe('Post a Task', () => {
    it('Should create and return the task', async () => {
      const mockBody = {
        title: 'something in the way',
      }
      const mockResult = {
        id: 1,
        title: 'something in the way',
        createdAt: '2023-02-01T07:42:06.973Z',
        updatedAt: '2023-02-01T07:42:06.973Z',
      };
      jest.spyOn(taskServices, 'postTask').mockResolvedValue(mockResult);
      const mockReq = {
        body: mockBody,
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.postTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should return 400 error', async () => {
      const mockBody = {
        title: 'k',
      }
      jest.spyOn(taskServices, 'postTask').mockRejectedValue(null);
      const mockReq = {
        body: mockBody,
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      taskMiddleware.bodyValidation(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.json).toBeCalledWith({ message: "\"title\" length must be at least 3 characters long" })
      // expect(mockRes.json).toBeCalledWith({message: 'Invalid input'});
    })
    it('Should return 500 error', async () => {
      const mockBody = {
        title: 'something in the way',
      }
      jest.spyOn(taskServices, 'postTask').mockRejectedValue(null);
      const mockReq = {
        body: mockBody,
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.postTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ error: 'Something went wrong' });
    });
  });

  describe('Edit a Task', () => {
    it('Should edit and return the task', async () => {
      const mockBody = {
        title: '2',
      }
      const mockResult = {
        id: 1,
        title: 'something in the way 2',
        createdAt: '2023-02-01T07:42:06.973Z',
        updatedAt: '2023-02-01T07:42:06.973Z',
      };
      jest.spyOn(taskServices, 'editTask').mockResolvedValue(mockResult);
      const mockReq = {
        body: mockBody,
        params: {
          id: 1,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.editTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    })
    it('Should return 404 error', async () => {
      const mockBody = {
        title: 'something in the way 2',
      }

      jest.spyOn(taskServices, 'editTask').mockResolvedValue(null);
      const mockReq = {
        body: mockBody,
        params: {
          id: 3,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.editTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ error: 'Task not found' });
    });
    it('Should return 500 error', async () => {
      const mockBody = {
        title: 'something in the way 2',
      }
      jest.spyOn(taskServices, 'editTask').mockRejectedValue(null);
      const mockReq = {
        body: mockBody,
        params: {
          id: 3,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.editTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ error: 'Something went wrong' });
    });
  });
  describe('Complete a task', () => {
    it('Should set task to complete and return', async () => {
      const mockResult = {
        id: 1,
        title: 'something in the way 2',
        createdAt: '2023-02-01T07:42:06.973Z',
        updatedAt: '2023-02-01T07:42:06.973Z',
      };
      jest.spyOn(taskServices, 'completeTask').mockResolvedValue(mockResult);
      const mockReq = {
        params: {
          id: 1,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.completeTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should give 404 error', async () => {
      jest.spyOn(taskServices, 'completeTask').mockResolvedValue(null);
      const mockReq = {
        params: {
          id: 3,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.completeTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ error: 'Task not found' });
    });
    it('Should return 500 error', async () => {
      const mockResult = {
        id: 1,
        title: 'something in the way 2',
        createdAt: '2023-02-01T07:42:06.973Z',
        updatedAt: '2023-02-01T07:42:06.973Z',
      };
      jest.spyOn(taskServices, 'completeTask').mockRejectedValue(null);
      const mockReq = {
        params: {
          id: 1,
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.completeTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ error: 'Something went wrong' });
    });
  });
  describe('Delete Completed Tasks', () => {
    it('Should return success message', async () => {
      jest.spyOn(taskServices, 'deleteCompletedTasks').mockResolvedValue(null);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.deleteCompletedTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'All completed tasks deleted' });
    });
    it('Should return 500 error', async () => {
      jest.spyOn(taskServices, 'deleteCompletedTasks').mockRejectedValue();
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.deleteCompletedTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ error: 'Something went wrong' });
    });
  });
  describe('Delete a task', () => {
    it('Should return a success message', async () => {
      const mockResult = {
        id: 10,
        title: 'Just the way you are',
        isCompleted: false,
        createdAt: '2023-02-01T15:36:36.390Z',
        updatedAt: '2023-02-01T15:36:36.390Z'
      };
      jest.spyOn(taskServices, 'deleteTask').mockResolvedValue(mockResult);
      const mockReq = {
        params: {
          id: 1,
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await taskController.deleteTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'Task deleted' })
    });

    it('Should return 404 error on invalid id', async () => {
      jest.spyOn(taskServices, 'deleteTask').mockResolvedValue(null);
      const mockReq = {
        params: {
          id: 1,
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.deleteTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ error: 'Task not found' });
    });

    it('Should return 500 error on function break', async () => {
      jest.spyOn(taskServices, 'deleteTask').mockRejectedValue(null);
      const mockReq = {
        params: {
          id: 1,
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.deleteTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ error: 'Something went wrong' });
    });
  })
});
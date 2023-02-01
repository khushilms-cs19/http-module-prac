const taskServices = require('../../src/services/taskServices');
const taskController = require('../../src/controllers/taskController');

describe('Task Controller', () => {
  it('Should return all tasks', async () => {
    const mockResult = [{ id: 1, title: 'Task 1', isCompleted: false }];
    jest.spyOn(taskServices, 'getAllTasks').mockResolvedValueOnce(mockResult);
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await taskController.getAllTasks(mockReq, mockRes);
    expect(mockReq.status).toBeCalledWith(200);
    expect(mockReq.send).toBeCalledWith(mockResult);
  });
});
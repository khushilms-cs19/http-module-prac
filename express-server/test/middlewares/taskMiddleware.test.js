const taskMiddleware = require('../../src/middlewares/taskMiddlewares');

describe('Body Validator', () => {
  it('Should return 400 error', async () => {
    const mockBody = {
      title: 'k',
    }
    // jest.spyOn(taskServices, 'postTask').mockRejectedValue(null);
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
  });
  it('Should return 500 error', async () => {
    const mockBody = {
      title: 'k',
    }
    // jest.spyOn(taskServices, 'postTask').mockRejectedValue(null);
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
  });
})
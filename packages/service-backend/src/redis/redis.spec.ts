// import RedisCacheService from './redis.service';

// describe('run', () => {
//   beforeEach(async () => {
//     jest.clearAllMocks();
//     await RedisCacheService.connect();
//   });
//   it('should send commands to the Redis server and return the result', async () => {
//     const mockSendCommand = jest.spyOn(RedisCacheService.client, 'sendCommand');
//     const mockData = 'result';

//     mockSendCommand.mockResolvedValue(mockData);

//     const result = await RedisCacheService.run('GET', 'key');

//     expect(mockSendCommand).toHaveBeenCalledTimes(1);
//     expect(mockSendCommand).toHaveBeenCalledWith(['GET', 'key']);
//     expect(result).toBe(mockData);
//   });

//   it('should automatically connect to the Redis server if not connected', async () => {
//     const mockConnect = jest.spyOn(RedisCacheService.client, 'connect');
//     const mockSendCommand = jest.spyOn(RedisCacheService.client, 'sendCommand');
//     const mockData = 'result';

//     mockConnect.mockClear();
//     mockSendCommand.mockResolvedValue(mockData);

//     const result = await RedisCacheService.run('GET', 'key');

//     expect(mockSendCommand).toHaveBeenCalledTimes(1);
//     expect(mockSendCommand).toHaveBeenCalledWith(['GET', 'key']);
//     expect(result).toBe(mockData);
//   });
// });

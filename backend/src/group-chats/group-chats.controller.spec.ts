import { Test, TestingModule } from '@nestjs/testing';
import { GroupChatsController } from './group-chats.controller';

describe('GroupChatsController', () => {
  let controller: GroupChatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupChatsController],
    }).compile();

    controller = module.get<GroupChatsController>(GroupChatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { MessageModel, type Message } from "./message.model.js";

export const messageRepository = {
  async create(data: Partial<Message>) {
    return MessageModel.create(data);
  },

  async updateById(id: string, data: Partial<Message>) {
    return MessageModel.findOneAndUpdate({ id }, data, { new: true }).lean();
  },

  async findById(id: string) {
    return MessageModel.findOne({ id }).lean();
  },

  async findByConversation(userId: string, designerId: string) {
    return MessageModel.find({
      userId,
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean();
  },

  async findLatest(userId: string, designerId: string, limit = 20) {
    return MessageModel.find({
      userId,
      designerId,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .then((messages) => messages.reverse());
  },

  async deleteByConversation(userId: string, designerId: string) {
    return MessageModel.deleteMany({
      userId,
      designerId,
    });
  },
};

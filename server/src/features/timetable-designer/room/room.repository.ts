import { RoomModel, type Room } from "./room.model.js";

export const roomRepository = {
  findById: async (designerId: string, id: string) => {
    return RoomModel.findOne({
      designerId,
      id,
    })
      .lean()
      .exec();
  },

  findAll: async (designerId: string) => {
    return RoomModel.find({ designerId }).sort({ roomNumber: 1 }).lean().exec();
  },

  findByRoomNumber: async (designerId: string, roomNumber: string) => {
    return RoomModel.findOne({
      designerId,
      roomNumber,
    })
      .lean()
      .exec();
  },

  create: async (data: Room) => {
    return RoomModel.create(data);
  },

  updateById: async (id: string, data: Partial<Room>) => {
    return RoomModel.findOneAndUpdate(
      {
        id,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .lean()
      .exec();
  },

  deleteById: async (id: string) => {
    return RoomModel.findOneAndDelete({
      id,
    }).exec();
  },
};

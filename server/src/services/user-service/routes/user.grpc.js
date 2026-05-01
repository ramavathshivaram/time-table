import userGrpcContoller from "../controllers/user.grpc.controller.js";

export const createUserGRPC = userGrpcContoller.createUser;

export const getUserIdByEmailGRPC = userGrpcContoller.getUserIdByEmail;

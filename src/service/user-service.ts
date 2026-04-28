import bcrypt from "bcrypt";
import type { FilterQuery, UpdateQuery } from "mongoose";
import userModel from "../model/user-model.js";
import type { UserRecord } from "../types/domain.js";

const getAll = async (): Promise<UserRecord[]> => {
  return await userModel.find({}, { _id: 0, __v: 0 }, { lean: true }).exec();
};

const getById = async (id: FilterQuery<UserRecord>): Promise<UserRecord | null> => {
  return await userModel.findOne(id, { _id: 0, __v: 0 }, { lean: true }).exec();
};

const updateOne = async (id: FilterQuery<UserRecord>, body: UpdateQuery<UserRecord>) => {
  return await userModel.updateOne(id, body).exec();
};

const deleteOne = async (id: FilterQuery<UserRecord>) => {
  return await userModel.deleteOne(id).exec();
};

const resetPassword = async (id: FilterQuery<UserRecord>, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await userModel.updateOne(id, { password: hashedPassword }).exec();
};

export default {
  getAll,
  getById,
  updateOne,
  deleteOne,
  resetPassword,
};
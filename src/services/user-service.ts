import bcrypt from "bcrypt";
import type { FilterQuery, UpdateQuery } from "mongoose";
import userModel from "../models/user-model.ts";
import type { UserRecord } from "../types/domain.ts";

// Create a new user
const create = async (data: UserRecord): Promise<UserRecord> => {
  const { password } = data;
  const defaultPassword = "password123";
  // hash password
  const hashedPassword = await bcrypt.hash(password || defaultPassword, 10);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  return await userModel.create(userData);
};

const getAll = async (): Promise<UserRecord[]> => {
  return userModel.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).lean().exec();
};

const getById = async (id: FilterQuery<UserRecord>): Promise<UserRecord | null> => {
  return await userModel.findOne(id, { _id: 0, __v: 0 }).lean().exec();
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
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
  resetPassword,
};
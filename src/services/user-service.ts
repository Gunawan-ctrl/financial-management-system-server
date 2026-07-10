import bcrypt from "../lib/bcrypt.ts";
import type { FilterQuery, UpdateQuery } from "mongoose";
import userRepository from "../repositories/user-repository.ts";
import type { UserRecord } from "../types/domain.ts";

// Create a new user
const create = async (data: UserRecord): Promise<UserRecord> => {

  return await userRepository.create(data);
};

const getAll = async (): Promise<UserRecord[]> => {
  return await userRepository.getAll();
};

const getById = async (id: FilterQuery<UserRecord>): Promise<UserRecord | null> => {
  return await userRepository.getById(id);
};

const updateOne = async (id: FilterQuery<UserRecord>, body: UpdateQuery<UserRecord>) => {
  return await userRepository.updateOne(id, body);
};

const deleteOne = async (id: FilterQuery<UserRecord>) => {
  return await userRepository.deleteOne(id);
};

const resetPassword = async (id: FilterQuery<UserRecord>, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await userRepository.resetPassword(id, hashedPassword);
};

export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
  resetPassword,
};
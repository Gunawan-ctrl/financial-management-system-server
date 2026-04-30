import type { FilterQuery, UpdateQuery } from "mongoose";
import transactionModel from "../models/transaction-model.ts";
import type { TransactionRecord } from "../types/domain.ts";

const create = async (data: TransactionRecord): Promise<TransactionRecord> => {
  return await transactionModel.create(data);
};

const getAll = async (): Promise<TransactionRecord[]> => {
  return await transactionModel.find({}, { _id: 0, __v: 0 }).lean().exec();
};

const getById = async (id: FilterQuery<TransactionRecord>): Promise<TransactionRecord | null> => {
  return await transactionModel.findOne(id, { _id: 0, __v: 0 }).lean().exec();
};

const updateOne = async (id: FilterQuery<TransactionRecord>, body: UpdateQuery<TransactionRecord>) => {
  return await transactionModel.updateOne(id, body, { new: true }).exec();
};

const deleteOne = async (id: FilterQuery<TransactionRecord>) => {
  return await transactionModel.deleteOne(id).exec();
};

export default {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne,
};
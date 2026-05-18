import type { FilterQuery, UpdateQuery } from "mongoose";
import categoryModel from "../models/category-model.ts";
import type { CategoryRecord } from "../types/domain.ts";

const create = async (data: CategoryRecord): Promise<CategoryRecord> => {
  return await categoryModel.create(data);
};

const getAll = async (): Promise<CategoryRecord[]> => {
  return await categoryModel.find({}, { _id: 0, __v: 0 }).lean().exec();
};

const getById = async (id: FilterQuery<CategoryRecord>): Promise<CategoryRecord | null> => {
  return await categoryModel.findOne(id, { _id: 0, __v: 0 }).lean().exec();
};

const updateOne = async (id: FilterQuery<CategoryRecord>, body: UpdateQuery<CategoryRecord>) => {
  return await categoryModel.updateOne(id, body, { new: true }).exec();
};

const deleteOne = async (id: FilterQuery<CategoryRecord>) => {
  return await categoryModel.deleteOne(id).exec();
};

export default {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne,
};
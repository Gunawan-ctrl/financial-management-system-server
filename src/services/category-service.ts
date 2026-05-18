import type { FilterQuery, UpdateQuery } from "mongoose";
import categoryRepository from "../repositories/category-repository.ts";
import type { CategoryRecord } from "../types/domain.ts";

const create = async (data: CategoryRecord): Promise<CategoryRecord> => {
  if (!data.name) {
    throw { status: 400, message: "Nama kategori wajib diisi" };
  }
  const validateUniqueName = await categoryRepository.getById({ name: data.name });
  if (validateUniqueName) {
    throw { status: 400, message: "Nama kategori sudah ada" };
  }
  return await categoryRepository.create(data);
};

const getAll = async (): Promise<CategoryRecord[]> => {
  const data = await categoryRepository.getAll();
  if (!data.length) {
    throw { status: 404, message: "Tidak ada kategori yang ditemukan" };
  }
  return data;
};

const getById = async (id: FilterQuery<CategoryRecord>): Promise<CategoryRecord | null> => {
  return await categoryRepository.getById(id);
};

const updateOne = async (id: FilterQuery<CategoryRecord>, body: UpdateQuery<CategoryRecord>) => {
  const data = await categoryRepository.updateOne(id, body);
  if (data.matchedCount === 0) {
    throw { status: 404, message: "Kategori tidak ditemukan" };
  }
  return data;
};

const deleteOne = async (id: FilterQuery<CategoryRecord>) => {
  const data = await categoryRepository.deleteOne(id);
  if (data.deletedCount === 0) {
    throw { status: 404, message: "Kategori tidak ditemukan" };
  }
  return data;
};

export default {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne,
};
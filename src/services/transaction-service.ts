import transactionRepository from "../repositories/transaction-repository.ts";
import type { TransactionRecord } from "../types/domain.ts";

const create = async (data: TransactionRecord): Promise<TransactionRecord> => {
  if (!data.name) {
    throw { status: 400, message: "Nama transaksi wajib diisi" };
  }
  const validateUniqueName = await transactionRepository.getById({ name: data.name });
  if (validateUniqueName) {
    throw { status: 400, message: "Nama transaksi sudah ada" };
  }

  return await transactionRepository.create(data);
}

const getAll = async (): Promise<TransactionRecord[]> => {
  const data = await transactionRepository.getAll();
  if (!data.length) {
    throw { status: 404, message: "Tidak ada transaksi yang ditemukan" };
  }
  return data;
};

const getById = async (id: Partial<TransactionRecord>): Promise<TransactionRecord | null> => {
  const data = await transactionRepository.getById(id);
  if (!data) {
    throw { status: 404, message: "Transaksi tidak ditemukan" };
  }
  return data;
};

const updateOne = async (id: Partial<TransactionRecord>, body: Partial<TransactionRecord>) => {
  const data = await transactionRepository.updateOne(id, body);
  if (data.matchedCount === 0) {
    throw { status: 404, message: "Transaksi tidak ditemukan" };
  }
  return data;
}

const deleteOne = async (id: Partial<TransactionRecord>) => {
  const data = await transactionRepository.deleteOne(id);
  if (data.deletedCount === 0) {
    throw { status: 404, message: "Transaksi tidak ditemukan" };
  }
  return data;
}

export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
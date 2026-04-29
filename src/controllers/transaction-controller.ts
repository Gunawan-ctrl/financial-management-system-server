import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import requestResponse from "../utils/response.ts";
import transactionService from "../services/transaction-service.ts";
import type { TransactionRecord, IdParams } from "../types/domain.ts";

type TransactionBody = Partial<TransactionRecord>;

const create = async (req: Request<unknown, unknown, TransactionBody>, res: Response) => {
  req.body.id = uuidv4();
  try {
    // validasi input
    if (!req.body.name) {
      return res.status(400).json(requestResponse.badRequest("Nama transaksi wajib diisi"));
    }
    // validasi nama unik
    const existingTransaction = await transactionService.getById({ name: req.body.name });
    if (existingTransaction) {
      return res.status(400).json(requestResponse.badRequest("Nama transaksi sudah ada"));
    }

    // buat transaksi baru
    const data = await transactionService.create(req.body as TransactionRecord);
    res.status(201).json(requestResponse.successWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.internalError());
  }
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await transactionService.getAll();

    // Jika data kosong, kembalikan respons dengan pesan khusus
    if (data.length === 0) {
      return res.json(requestResponse.notFound("Tidak ada transaksi yang ditemukan"));
    }

    // Jika data ditemukan, kembalikan dengan respons sukses
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    res.json(requestResponse.internalError());
  }
};

const getById = async (req: Request<IdParams>, res: Response) => {
  try {
    const data = await transactionService.getById({ id: req.params.id });
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.internalError());
  }
};

const updateOne = async (req: Request<IdParams, unknown, TransactionBody>, res: Response) => {
  try {
    const data = await transactionService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.success("Data berhasil diperbarui"));
  } catch (error) {
    res.status(500).json(requestResponse.internalError());
  }
};

const deleteOne = async (req: Request<IdParams>, res: Response) => {
  try {
    await transactionService.deleteOne({ id: req.params.id });
    res.json(requestResponse.success("Data berhasil dihapus"));
  } catch (error) {
    res.status(500).json(requestResponse.internalError());
  }
};

export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
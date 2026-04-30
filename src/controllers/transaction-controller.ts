import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import requestResponse from "../utils/response.ts";
import transactionService from "../services/transaction-service.ts";
import type { TransactionRecord, IdParams } from "../types/domain.ts";

type TransactionBody = Partial<TransactionRecord>;

const create = async (req: Request<unknown, unknown, TransactionBody>, res: Response, next: NextFunction) => {
  req.body.id = uuidv4();
  try {
    await transactionService.create(req.body as TransactionRecord);
    res.status(201).json(requestResponse.success("Transaksi berhasil dibuat"));
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await transactionService.getAll();
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    next(error)
  }
};

const getById = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    const data = await transactionService.getById({ id: req.params.id });
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    next(error)
  }
};

const updateOne = async (req: Request<IdParams, unknown, TransactionBody>, res: Response, next: NextFunction) => {
  try {
    await transactionService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.success("Data berhasil diperbarui"));
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    await transactionService.deleteOne({ id: req.params.id });
    res.json(requestResponse.success("Data berhasil dihapus"));
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
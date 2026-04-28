import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import requestResponse from "../config/response.ts";
import transactionService from "../service/transaction-service.ts";
import type { TransactionRecord, IdParams } from "../types/domain.ts";

type TransactionBody = Partial<TransactionRecord>;

const create = async (req: Request<unknown, unknown, TransactionBody>, res: Response) => {
  req.body.id = uuidv4();
  try {
    const data = await transactionService.create(req.body as TransactionRecord);
    res.status(201).json(requestResponse.berhasil("Data berhasil dibuat"));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await transactionService.getAll();
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.json(requestResponse.kesalahan());
  }
};

const getById = async (req: Request<IdParams>, res: Response) => {
  try {
    const data = await transactionService.getById({ id: req.params.id });
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

const updateOne = async (req: Request<IdParams, unknown, TransactionBody>, res: Response) => {
  try {
    const data = await transactionService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

const deleteOne = async (req: Request<IdParams>, res: Response) => {
  try {
    await transactionService.deleteOne({ id: req.params.id });
    res.json(requestResponse.berhasil("Data berhasil dihapus"));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import requestResponse from "../config/response.ts";
import categoryService from "../service/category-service.ts";
import type { CategoryRecord, IdParams } from "../types/domain.ts";

type CategoryBody = Partial<CategoryRecord>;

const create = async (req: Request<unknown, unknown, CategoryBody>, res: Response) => {
  req.body.id = uuidv4();
  try {
    const data = await categoryService.create(req.body as CategoryRecord);
    res.status(201).json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await categoryService.getAll();
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.json(requestResponse.kesalahan());
  }
};

const getById = async (req: Request<IdParams>, res: Response) => {
  try {
    const data = await categoryService.getById({ id: req.params.id });
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

const updateOne = async (req: Request<IdParams, unknown, CategoryBody>, res: Response) => {
  try {
    const data = await categoryService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan());
  }
};

const deleteOne = async (req: Request<IdParams>, res: Response) => {
  try {
    await categoryService.deleteOne({ id: req.params.id });
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
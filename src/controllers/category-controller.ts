import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import requestResponse from "../utils/response.ts";
import categoryService from "../services/category-service.ts";
import type { CategoryRecord, IdParams } from "../types/domain.ts";

type CategoryBody = Partial<CategoryRecord>;

const create = async (req: Request<unknown, unknown, CategoryBody>, res: Response, next: NextFunction) => {
  req.body.id = uuidv4();
  try {
    await categoryService.create(req.body as CategoryRecord);
    res.status(201).json(requestResponse.created());
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoryService.getAll();
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    const data = await categoryService.getById({ id: req.params.id });
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request<IdParams, unknown, CategoryBody>, res: Response, next: NextFunction) => {
  try {
    const data = await categoryService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.successWithData(data));
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  try {
    await categoryService.deleteOne({ id: req.params.id });
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
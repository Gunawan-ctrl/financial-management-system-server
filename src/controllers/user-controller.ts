import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/user-model.ts";
import userService from "../services/user-service.ts";
import requestResponse from "../utils/response.ts";
import type { IdParams, UserRecord } from "../types/domain.ts";

type UserBody = Partial<UserRecord>;

const create = async (req: Request<unknown, unknown, UserBody>, res: Response) => {
  req.body.id = uuidv4();
  const { email, password } = req.body;
  const defaultPassword = "password123";

  try {
    // validate email jika sudah ada
    const existingEmail = await userModel.findOne({ email,  }, { _id: 0, __v: 0 }, { lean: true }).exec();
    if (existingEmail) {
      return res.json(requestResponse.badRequest("email telah ada"));
    }

    // validate username jika sudah ada
    const existingUsername = await userModel.findOne({ username: req.body.username }, { _id: 0, __v: 0 }, { lean: true }).exec();
    if (existingUsername) {
      return res.json(requestResponse.badRequest("username telah ada"));
    }

    const hash = password
      ? await bcrypt.hash(password, 10)
      : await bcrypt.hash(defaultPassword, 10);

    await userModel.create({ ...req.body, password: hash });
    res.json(requestResponse.created({ email, password: defaultPassword }));
  } catch (error) {
    res.json(requestResponse.internalError());
  }
};

const login = async (req: Request<unknown, unknown, { email?: string; password?: string }>, res: Response) => {
  const { email, password = "" } = req.body;

  try {
    const user = await userModel.findOne({ email }, { _id: 0, __v: 0 }, { lean: true }).exec();
    if (!user) return res.json(requestResponse.notFound("email tidak terdaftar"));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json(requestResponse.badRequest("Password Salah"));

    const secret = process.env.JWT_SECRET || "development-secret-key";
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      { expiresIn: "1d" }
    );

    const { password: _hiddenPassword, ...safeUser } = user;

    res.json(requestResponse.successLogin({ token, user: safeUser }));
  } catch (error) {
    res.json(requestResponse.internalError());
    console.log(error);
  }
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAll();

    // Jika data kosong, kembalikan respons dengan pesan khusus
    if (users.length === 0) {
      return res.json(requestResponse.notFound("Tidak ada user yang ditemukan"));
    }

    // Jika data ditemukan, kembalikan dengan respons sukses
    res.json(requestResponse.successWithData(users));
  } catch (error) {
    res.json(requestResponse.internalError());
  }
};

const getById = async (req: Request<IdParams>, res: Response) => {
  try {
    const user = await userService.getById({ id: req.params.id });
    if (!user) {
      return res.json(requestResponse.badRequest("User tidak ditemukan"));
    }
    res.json(requestResponse.successWithData(user));
  } catch (error) {
    res.json(requestResponse.internalError());
  }
};

const updateOne = async (req: Request<IdParams, unknown, UserBody>, res: Response) => {
  try {
    const user = await userService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.successWithData(user));
  } catch (error) {
    res.json(requestResponse.internalError());
  }
};

const deleteOne = async (req: Request<IdParams>, res: Response) => {
  try {
    await userService.deleteOne({ id: req.params.id });
    res.json(requestResponse.success("Berhasil menghapus data"));
  } catch (error) {
    res.json(requestResponse.internalError());
  }
};

export default {
  create,
  login,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
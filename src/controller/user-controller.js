import userModel from "../model/user-model.js";
import userService from "../service/user-service.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import requestResponse from "../config/response.js";


const create = async (req, res) => {
  req.body.id = uuidv4();
  const { email, password, } = req.body;
  const defaultPassword = 'password123';
  try {
    const user = await userModel.findOne({ email }, { _id: 0, __v: 0 }, { lean: true });
    if (user) {
      return res.json(requestResponse.gagal("email telah ada"));
    }
    const hash = password ? await bcrypt.hash(password, 10) : await bcrypt.hash(defaultPassword, 10);
    await userModel.create({ ...req.body, password: hash, });
    res.json(requestResponse.berhasil("Berhasil Registrasi"));
  } catch (error) {
    res.json(requestResponse.kesalahan);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('email', req.body);
  try {
    const user = await userModel.findOne({ email }, { _id: 0, __v: 0 }, { lean: true });
    console.log('user', user);
    if (!user) return res.json(requestResponse.gagal("email tidak terdaftar"));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json(requestResponse.gagal("Password Salah"));

    res.json(requestResponse.suksesLogin(user));
  } catch (error) {
    res.json(requestResponse.kesalahan), console.log(error);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll({});
    res.json(requestResponse.suksesWithData(users));
  } catch (error) {
    res.json(requestResponse.kesalahan);
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getById({ id: req.params.id });
    if (!user) {
      return res.json(requestResponse.gagal("User tidak ditemukan"));
    }
    res.json(requestResponse.suksesWithData(user));
  } catch (error) {
    res.json(requestResponse.kesalahan);
  }
};

const updateOne = async (req, res) => {
  try {
    const user = await userService.updateOne({ id: req.params.id }, req.body, { new: true });
    res.json(requestResponse.suksesWithData(user));
  } catch (error) {
    res.json(requestResponse.kesalahan);
  }
};

const deleteOne = async (req, res) => {
  try {
    await userService.deleteOne({ id: req.params.id });
    res.json(requestResponse.berhasil("Berhasil menghapus data"));
  } catch (error) {
    res.json(requestResponse.kesalahan);
  }
};

export default {
  create,
  login,
  getAll,
  getById,
  updateOne,
  deleteOne
}
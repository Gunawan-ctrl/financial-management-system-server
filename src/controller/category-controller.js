import requestResponse from "../config/response.js";
import categoryService from "../service/category-service.js";
import { v4 as uuidv4 } from 'uuid';


// Create data
const create = async (req, res) => {
  req.body.id = uuidv4();
  try {
    const data = await categoryService.create(req.body);
    res.status(201).json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Get all data
const getAll = async (req, res) => {
  try {
    const data = await categoryService.getAll({});
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.json(requestResponse.kesalahan);
  }
};

// get by id
const getById = async (req, res) => {
  try {
    const data = await categoryService.getById({ id: req.params.id });
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Update data
const updateOne = async (req, res) => {
  try {
    const data = await categoryService.updateOne({ id: req.params.id }, req.body);
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Delete data
const deleteOne = async (req, res) => {
  try {
    await categoryService.deleteOne({ id: req.params.id });
    res.json(requestResponse.berhasil("Data berhasil dihapus"));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne
}
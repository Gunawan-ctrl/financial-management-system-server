import categoryModel from "../model/category-model.js";

const create = async (data) => {
  return await categoryModel.create(data)
}
const getAll = async () => {
  return await categoryModel.find({}, { _id: 0, __v: 0 }, { lean: true })
};
const getById = async (id) => {
  return await categoryModel.findOne(id, { _id: 0, __v: 0 }, { lean: true })
}
const updateOne = async (id, body) => {
  return await categoryModel.updateOne(id, body, { new: true })
}
const deleteOne = async (id) => {
  return await categoryModel.deleteOne(id)
}
export default {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne
}
import userModel from "../model/user-model.js";

const getAll = async () => {
  return await userModel.find({}, { _id: 0, __v: 0 }, { lean: true })
};
const getById = async (id) => {
  return await userModel.findOne(id, { _id: 0, __v: 0 }, { lean: true })
}
const updateOne = async (id, body) => {
  return await userModel.updateOne(id, body)
}
const deleteOne = async (id) => {
  return await userModel.deleteOne(id)
}

const resetPassword = async (id, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await userModel.updateOne(id, { password: hashedPassword });
}

export default {
  getAll,
  getById,
  updateOne,
  deleteOne,
  resetPassword
}
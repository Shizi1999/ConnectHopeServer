const Person = require("../models/Person");
const errorHandler = require("../exceptions/errorHandler");

class PersonController {
  async createPerson(req, res) {
    try {
      const user = req.user;
      const { avatarFile, imageFiles } = req.files;
      // Create a new person
      const newPerson = new Person({
        ...req.body,
        paymentMethod: JSON.parse(req.body?.paymentMethod) || [],
        author: user._id,
        avatar: Array.isArray(avatarFile) ? avatarFile.at(0)?.path : "",
        images: Array.isArray(imageFiles)
          ? imageFiles.map((file) => file?.path || "")
          : [],
      });
      // Save the person to the database
      await newPerson.save();
      res.status(201).json({
        success: true,
        message: "Person created successfully",
        person: newPerson,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async updatePerson(req, res) {
    try {
      const files = req.files;
      const {
        _id,
        fullname,
        avatar,
        birthday,
        address,
        phone,
        zalo,
        description,
        censored,
        paymentMethod,
        images,
      } = req.body;
      // Find the person by ID
      const person = await Person.findById(_id);
      const user = req.user;
      if (!person) {
        return res
          .status(404)
          .json({ success: false, message: "Person not found" });
      }
      // Update the person
      person.fullname = fullname;
      person.avatar = Array.isArray(files?.avatarFile)
        ? files.avatarFile.at(0)?.path
        : avatar;
      person.birthday = birthday;
      person.address = address;
      person.phone = phone;
      person.zalo = zalo;
      person.description = description;
      person.paymentMethod = JSON.parse(paymentMethod) || [];
      person.censored = user.role === "admin" ? censored : false;
      person.images = JSON.parse(images) || [];
      if (files?.imageFiles) {
        const newImages = Array.isArray(files?.imageFiles)
          ? files?.imageFiles
              .map((file) => file?.path || "")
              .filter((item) => !!item)
          : [];
        person.images = [...person.images, ...newImages];
      }
      // Save the updated person to the database
      await person.save();
      res.json({
        success: true,
        message: "Person updated successfully",
        person,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async deleteById(req, res) {
    try {
      const user = req.user;
      const { _id } = req.body;
      console.log(_id);
      const person = await Person.findById(_id);
      if (!person) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy cá nhân này",
        });
      }
      if (user.role !== "admin" && person.author !== user._id) {
        return res.status(404).json({
          success: false,
          message: "Bạn không có quyền xóa cá nhân này",
        });
      }
      await person.deleteOne({ _id });
      res.json({
        success: true,
        message: "Xóa thành công",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
}

module.exports = new PersonController();

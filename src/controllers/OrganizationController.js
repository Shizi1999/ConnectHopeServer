const Organization = require("../models/Organization");
const errorHandler = require("../exceptions/errorHandler");

class OrganizationController {
  async createOrganization(req, res) {
    try {
      const user = req.user;
      const { thumbnailFile, imageFiles } = req.files;
      console.log(req.files);
      const newOrganization = new Organization({
        ...req.body,
        paymentMethod: JSON.parse(req.body.paymentMethod) || [],
        author: user._id,
        thumbnail: Array.isArray(thumbnailFile)
          ? thumbnailFile.at(0)?.path
          : "",
        images: Array.isArray(imageFiles)
          ? imageFiles.map((file) => file?.path || "")
          : [],
      });
      await newOrganization.save();

      res.status(201).json({
        success: true,
        message: "Organization created successfully",
        data: newOrganization,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async updateOrganization(req, res) {
    try {
      const user = req.user;
      const files = req.files;
      const {
        name,
        address,
        phone,
        zalo,
        email,
        description,
        thumbnail,
        censored,
        website,
        images,
        paymentMethod,
        id,
      } = req.body;

      const organization = await Organization.findById(id);
      if (!organization) {
        return res.status(404).json({
          success: false,
          message: "Organization not found",
          data: undefined,
        });
      }
      if (user.role === "user" && user._id !== organization.author) {
        return res.status(403).json({
          success: false,
          message: "You have not permission",
          data: undefined,
        });
      }
      organization.name = name;
      organization.address = address;
      organization.phone = phone;
      organization.zalo = zalo;
      organization.email = email;
      organization.description = description;
      organization.thumbnail = Array.isArray(files?.thumbnailFile)
        ? files.thumbnailFile.at(0)?.path
        : thumbnail;
      organization.website = website;
      organization.paymentMethod = JSON.parse(paymentMethod) || [];
      organization.censored = user.role === "admin" ? censored : false;
      organization.images = JSON.parse(images) || [];
      if (files?.imageFiles) {
        const newImages = Array.isArray(files?.imageFiles)
          ? files?.imageFiles
              .map((file) => file?.path || "")
              .filter((item) => !!item)
          : [];
        organization.images = [...organization.images, ...newImages];
      }
      await organization.save();
      res.json({
        success: true,
        message: "Organization updated successfully",
        data: organization,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async deleteOrganization(req, res) {
    try {
      const user = req.user;
      const { _id } = req.body;
      const organization = await Organization.findById(_id);
      if (!organization) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy tổ chức",
          data: undefined,
        });
      }
      if (user.role === "user" && organization.author !== user._id) {
        return res.status(403).json({
          success: false,
          message: "Bạn không có quyền xóa tổ chức này",
          data: undefined,
        });
      }
      await organization.deleteOne({ _id });
      res.json({
        success: true,
        message: "Xóa thành công",
        data: undefined,
      });
    } catch (error) {
      errorHandler(err, res);
    }
  }
}

module.exports = new OrganizationController();

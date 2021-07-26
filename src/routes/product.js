const express = require("express");
// const { addCategory, getCategories } = require('../controller/category');
const { createProduct } = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
const path =require('path');
const shortid = require("shortid");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
    });

const upload=multer({ storage });

router.post("/product/create",requireSignin,adminMiddleware,upload.array("productPicture"),createProduct
);//only admin can log in

// router.get('/category/getcategory',getCategories);

module.exports = router;

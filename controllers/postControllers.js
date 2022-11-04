const Blog = require("../models/Post");

const APIFeatures = require("../utils/apiFeatures");

//Create new blog => /api/blog/new
exports.newBlogPost = async (req, res, next) => {
  //Id of the user who created the blog post
  req.body.user = req.user.id;

  // req.body.photo = req.file.path
  const blog = await Blog.create(req.body);

  res.status(200).json({
    success: true,
    blog,
  });
};

//Get all blog posts => /api/blogs?keyword=Java
exports.getBlogPosts = async (req, res, next) => {
  const apiFeatures = new APIFeatures(Blog.find(), req.query)
    .search() //call search method in the get all blog posts function
    .filter();

  const blogs = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: blogs.length,
    message: blogs,
  });
};

//Get single blog post details => /api/blog/:id
exports.getSingleBlogPost = async (req, res, next) => {
  const blog = await Blog.findById(req.params._id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    blog,
  });
};

//Update Product => /api/blog/:_id
exports.updateBlogPost = async (req, res, next) => {
  let blog = await Blog.findById(req.params._id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  product = await Blog.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    blog,
  });
};

//Delete Blog Post => /api/blog/:_id
exports.deleteBlogPost = async (req, res, next) => {
  const blog = await Blog.findById(req.params._id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Blog post successfully deleted.",
  });
};

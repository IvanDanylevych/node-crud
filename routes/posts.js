const controllers = require("../controllers/posts");
const router = require("express").Router();

//CRUD routers /posts

router.get("/", controllers.getPosts);
router.get("/:postId", controllers.getPost);
router.post("/", controllers.createPost);
router.put("/:postId", controllers.updatePost);
router.delete("/:postId", controllers.deletePost);

module.exports = router;

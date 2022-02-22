import Post from "../models/Post";


class PostController {

    static createPost = async (req, res) => {

        try {
            const newPost = new Post(req.body);
            const post = await newPost.save();
            res.status(200).json(post)
        } catch (error) {

            res.status(500).json(error);

        }
    };


    static updatePost = async (req, res) => {

        try {

            const post = await Post.findById(req.params.id);
            if (req.body.userName === post.userName) {
                try {

                    const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                    res.status(200).json(updatePost)

                } catch (error) {

                    res.status(500).json(error)

                }

            } else {

                res.status(401).json("You can update only your posts!!")

            }

        } catch (error) {

            res.status(500).json(error)

        }

    };
    static deletePost = async (req, res) => {

        try {

            const post = await Post.findById(req.params.id);
            if (req.body.userName === post.userName) {
                try {

                    await post.delete()
                    res.status(200).json("Post has been deleted!")

                } catch (error) {

                    res.status(500).json(error)

                }

            } else {

                res.status(401).json("You can delete only your posts!!")

            }

        } catch (error) {

            res.status(500).json(error)

        }


    };


    static getPost = async (req, res) => {
        try {

            const post = await Post.findById(req.params.id);
            res.status(200).json(post)

        } catch (error) {

            res.status(500).json(error)

        }

    };


    static getAllPost = async (req, res) => {
        const username = req.query.user;
        const catName = req.body.cat;
        try {
            let posts;

            if (username) {
                posts = await Post.find({ userName: username })
            } else if (catName) {
                posts = await Post.find({
                    categories: {
                        $in: [catName]
                    }
                })
            } else {
                posts = await Post.find({})

            }

            res.status(200).json(posts)

        } catch (error) {

            res.status(500).json(error)

        }

    };



};

export default PostController
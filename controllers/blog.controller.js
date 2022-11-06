const { Validator } = require("node-input-validator")
const Blog = require('./../models/blog.model')


// create a blog
exports.create= async (req, res) => {
    const v = new Validator(req.body, {
        title: 'required|minLength:5|maxLength:100',
        description: 'required|minLength:2|maxLength:100',
        author: 'required|maxLength:100',
        body: 'required'
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).send(v.errors)
    }

    try{
        const newBlog = new Blog({ 
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            state: req.body.state,
            body: req.body.body,
            tags: req.body.tags
        });

        let blogData = await newBlog.save();

        return res.status(201).send({
            message: 'Blog created successfully',
            data: blogData
        });

    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: err
        })
    }

}

// get all blogs
exports.list= async (req, res) => {

    try{
        let query={};

    if(req.query.keyword){
        query.$or=[
            { "title": {$regex: req.query.keyword, $options: 'i'}},
            { "state": {$regex: req.query.keyword, $options: 'i'}},
            { "author": {$regex: req.query.keyword, $options: 'i'}},
            { "tags": {$regex: req.query.keyword, $options: 'i'}}
        ]
    }

    let blogs = await Blog.find(query)
    .skip(0)
    .limit(20)
    .sort({
      createdAt: 1,
      createdAt: -1,
      reading_time: 1,
      reading_time: -1,
      read_count: 1,
      read_count: -1
    });

    return res.status(200).send({
        message: "Blogs successfully fetched",
        data: blogs
    })

    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: err
        })
    }
}

// get post by id
exports.getPostById = async(req,res)=> {
    try {
        const id = req.params.id
        const post = await Blog.findById(id)
        .where({state: {$eq: "published"}})
        .populate({path: "author", select: {__v: 0}})
        .select({__v: 0});

        // post count increment
        // post.read_count = post.read_count += 1
        // await post.save()

        return res.status(200).send({
            message: "Blog successfully fetched",
            data: post
        })
    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: err
        })
    }
}

// update blog
exports.update= async (req, res) => {
    const id = req.params.id
    
    try {
        const post = await Blog.findById(id);
        if(post.userId === req.body.id) {
            await Blog.updateOne({_id:id}, {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                state: req.body.state,
                body: req.body.body,
                tags: req.body.tags
            });
            
            const updatedBlog = await post.save()

            return res.status(200).send({
                message:'Blog successfully updated',
                data: updatedBlog
            })

        } else {
            return res.status(403).send({
                message: "You can only update your blog"
            })
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: err
        })
    }
}

// delete blog
exports.delete=async (req,res) =>{
    const id = req.params.id

    try {
        const post =  await Blog.findById(req.params.id);
        if (post.userId === req.body.id) {
            await Blog.deleteOne({_id:id})
            return res.status(200).send({
                message:'Blog successfully deleted'
            })
        } else {
            return res.status(403).send({
                message: "You can only delete your blog"
            })
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: err
        })
    }
}

// get user blogs
exports.getUserPosts = async (req, res) => {
    try{
        let query={};

    if(req.query.keyword){
        query.$or=[
            { "state": {$regex: req.query.keyword, $options: 'i'}},
        ]
    }

    let blogs = await Blog.find(query)
    .skip(0)
    .limit(20)

    return res.status(200).send({
        message: "Blogs successfully fetched",
        data: blogs
    })

    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: err
        })
    }
}

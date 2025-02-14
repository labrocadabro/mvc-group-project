const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(JSON.stringify(req.user))
        try{
            const tags = req.query.tags ? req.query.tags.split(',') : [];
            const todoItems = tags.length ?
                await Todo.find({
                    userId: req.user._id,
                    tags: {
                        $all: tags
                    }
                }) :
                await Todo.find({ userId: req.user._id });
            const complete = todoItems.filter(todo => todo.completed);
					const incomplete = todoItems.filter(todo => !todo.completed);
            res.render('todos.ejs', { complete, incomplete, user: req.user, filterTags: tags })
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
					await Todo.create({
						todo: req.body.todoItem,
						completed: false,
						userId: req.user._id,
						tags: req.body.tags,
						groupId: req.body.groupId
					})
            console.log('Todo has been added!')
					res.json('Todo created')
        }catch(err){
            console.log(err)
        }
	},
    markComplete: async (req, res)=>{
        try{
            const todo = await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                completed: true
            })
            console.log(todo)
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    changePriority: async (req, res) => {
        console.log(req.body)
        try {
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                priority: Number(req.body.priority)
            })
            res.json('Updated Priority')
        } catch (err) {
            console.log(err)
        }
    },
    addTag: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                $push: { tags: req.body.tag },
            })
            res.json('Added Tag');
        } catch (err) {
            console.log(err)
        }
    },
    deleteTag: async (req, res) => {
        console.log(req.body)
        try {
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                $pull: { tags: req.body.tag },
            })
        } catch (err) {
            console.log(err)
        }
        res.json(`Removed tag ${req.body.tag}`);
    },
}

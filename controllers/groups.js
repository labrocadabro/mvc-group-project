const Group = require('../models/Group')
const User = require('../models/User')
const Todo = require('../models/Todo')

module.exports = {
	getGroups: async (req, res) => {
        try {
					const groupItems = await Group.find({
						$in: {
							members: req.user._id
						}
					}).populate('admin');

					console.log(groupItems)
					res.render('group/index.ejs', { groupItems, user: req.user, groupNumber: groupItems.length, adminPage: req.originalUrl.includes('manageGroup') })
        } catch (err) {
            console.log(err)
        }
    },

	showCreateGroup: (req, res) => {
		res.render('group/create.ejs', { user: req.user })
	},
	createGroup: async (req, res) => {
		try {
			await Group.create({
				name: req.body.name,
				description: req.body.description,
				admin: req.user._id,
				members: [req.user._id]
			})
			res.redirect('/groups')
		} catch (err) {
			console.log(err)
		}
	},
	updateGroup: async (req, res) => {
		console.log(req.body)
		let obj = {
			name: req.body.name,
			description: req.body.description
		}
		try {
			await Group.findOneAndUpdate({ _id: req.body.id }, {
				$set: obj,
			})
			res.redirect('/groups');
		} catch (err) {
			console.log(err)
		}
	},
	editGroup: async (req, res) => {
		/* GET : look for a group the database and load it in the page for edition */
		const { id } = req.params;
		const groupItem = await Group.findOne({ _id: id });
		res.render('group/create.ejs', { group: groupItem, user: req.user })
	},
	// delete one group
	deleteGroup: async (req, res) => {
		try{
			await Group.findOneAndDelete({_id:req.body.groupIdFromJSFile})
		}catch(err){
			console.log(err)
		}
	},

	editMmebers: async (req, res) => {
		/* GET : look for a group the database and load it in the page for edition */
		const { id } = req.params;
		const groupItem = await Group.findOne({ _id: id }).populate('members').populate('admin'
		);
		res.render('group/members.ejs', { group: groupItem, user: req.user })
	},
	addMember: async (req, res) => {
		try {
			const member = await User.findOne({ email: req.body.memberEmail });
			await Group.findOneAndUpdate({ _id: req.body.id }, {
				$push: { members: member }
			});
			res.redirect(`/groups/editMembers/${req.body.id}`)
		} catch (err) {
			console.log(err)
		}
	},
	editTodos: async (req, res) => {
		/* GET : look for a group the database and load it in the page for edition */
		const { id } = req.params;
		const groupItem = await Group.findOne({ _id: id }).populate('admin');
		const todos = await Todo.find({ groupId: id });
		const complete = todos.filter(todo => todo.completed);
		const incomplete = todos.filter(todo => !todo.completed);
		res.render('group/todos.ejs', { group: groupItem, user: req.user, complete, incomplete, filterTags: [] })
	},
}

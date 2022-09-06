const Group = require('../models/Group')


module.exports = {
	getGroups: async (req, res) => {
        try {
					const groupItems = await Group.aggregate([{
						$lookup:
						{
							from: "users",
							localField: "createdBy",
							foreignField: "_id",
							as: "groupAdmin"
						}
            }])
					res.render('group/index.ejs', { groupItems, user: req.user, groupNumber: groupItems.length, adminPage: req.originalUrl.includes('manageGroup') })
        } catch (err) {
            console.log(err)
        }
    },

    createGroup: (req, res) => {
		res.render('group/create.ejs')
	},
    deleteGroup: (req, res) => {
			res.redirect('/groups')
    },

    editGroup: async (req, res) => {
        /* GET : look for a group the database and load it in the page for edition */
        const { id } = req.params;
			const groupItem = await Group.findOne({ _id: id });
			res.render('group/create.ejs', { group: groupItem })
    },

    addGroup: async (req, res) => {
        try {
            await Group.create({
                name: req.body.name,
                description: req.body.description,
                validate: false,
                adminId: req.user._id,
                createdBy: req.user._id,
                isPublic: req.body.isPublic === 'on' ? true : false,
                members: req.user.email
                // isCityBased: req.body.isCityBased === 'on' ? true : false,
                // city: req.body.city
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
}

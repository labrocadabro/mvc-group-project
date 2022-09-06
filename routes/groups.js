const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groups");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, groupsController.getGroups);

router.post("/createGroup", ensureAuth, groupsController.createGroup);

router.get("/createGroup", ensureAuth, groupsController.showCreateGroup);

router.post("/updateGroup", ensureAuth, groupsController.updateGroup);

router.get("/editGroup/:id", ensureAuth, groupsController.editGroup);

router.get("/members/:id", ensureAuth, groupsController.editMmebers);

router.get("/todos/:id", ensureAuth, groupsController.editTodos);

router.post("/addMember", ensureAuth, groupsController.addMember);

router.delete("/deleteGroup", ensureAuth, groupsController.deleteGroup);


module.exports = router;

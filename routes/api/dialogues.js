const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Dialogue = require("../../models/Dialogue");

// @route     DIALOGUE api/dialogue
// @desc      Create a dialogue
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("langPair", "Language pair is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newDialogue = new Dialogue({
        langPair: req.body.langPair,
        note: req.body.note,
        name: user.name,
        parts: req.body.parts,
        user: user.id
      });

      const dialogue = await newDialogue.save();
      res.json(dialogue);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

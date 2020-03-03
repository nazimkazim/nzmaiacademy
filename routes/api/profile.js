const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route     Get api/profile/me
// @desc      Get current users profile
// @access    Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server error");
  }
});

// @route     POST api/profile
// @desc      Create or update user's profile
// @access    Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(","),
      social: { youtube, twitter, facebook, linkedin, instagram }
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever error");
    }

    console.log(skills);
    res.send("Hello");
  }
);

// @route     GET api/profile
// @desc      Get all profiles
// @access    Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route     GET api/profile/user/:user_id
// @desc      Get profile by id
// @access    Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route     DELETE api/profile
// @desc      Delete profile, user, post
// @access    Private

router.delete("/", auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove profile
    await Profile.findOneAndRemove({
      user: req.user.id
    });

    // Remove user
    await User.findOneAndRemove({
      _id: req.user.id
    });

    res.json({ msg: "User deleted" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;

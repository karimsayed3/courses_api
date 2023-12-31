import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Mongoose } from "mongoose";
import User from "../models/user";
import ProjectError from "../helper/error";
import { ReturnResponse } from "../utils/interfaces";

const getUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;

  try {
    const userId = req.params.userId;

    if (req.userId != req.params.userId) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 401;
      err.data = { hi: "its error" };
      throw err;
    }
    const user = await User.findById(userId, { name: 1, email: 1 });
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    } else {
      resp = { status: "success", message: "User found", data: user };
      res.status(200).send(resp);
    }
  } catch (error: any) {
    next(error);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;
  try {
    if (req.userId != req.body._id) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 401;
      throw err;
    }

    const userId = req.body._id;
    const user = await User.findById(userId);
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    }

    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();

    resp = { status: "success", message: "User Updated", data: {} };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

const deactivateUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;
  try {
    if (req.userId != req.body._id) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 401;
      throw err;
    }

    const userId = req.body._id;
    const user = await User.findById(userId);
    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    }

    user.isDeactivated = true;
    await user.save();

    resp = { status: "success", message: "User deactivated!", data: {} };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

const activateUser: RequestHandler = async (req, res, next) => {
  let resp: ReturnResponse;
  try {
    //verify token sent
    let decodedToken;
    const token = req.params.token;
    decodedToken = <any>jwt.verify(token, "secretmyverysecretkey");

    if (!decodedToken) {
      const err = new ProjectError("Invalid link!");
      err.statusCode = 401;
      throw err;
    }

    const userId = decodedToken.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      const err = new ProjectError("User not found!");
      err.statusCode = 404;
      throw err;
    }

    user.isDeactivated = false;
    await user.save();

    resp = { status: "success", message: "Account activated!", data: {} };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

// localhost:3000/user/activate/:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2FhMTgzZWVjNGEwYjJlMDE0ZTA0NjEiLCJpYXQiOjE2NzI1NzMwMjIsImV4cCI6MTY3MjU3NjYyMn0.ocDtxERWUkAg2ASqRDfCIdxsITv_tpWloCHdp2cHY0c

const isActiveUser = async (userId: String) => {
  const user = await User.findById(userId);

  if (!user) {
    const err = new ProjectError("User not found!");
    err.statusCode = 404;
    throw err;
  }

  if (!!user.isDeactivated) {
    return false;
  }

  return true;
};

export { getUser, updateUser, activateUser, deactivateUser, isActiveUser };

const mongodb = require('../db/connect');
var ObjectId = require('mongodb').ObjectId;

// GET Requests

const getUser = async (req, res, next) => {
    const result = await mongodb.getDb().db('CSE341').collection('user').find();
  
    // console.log(result);
    result.toArray().then((items) => {
      res.setHeader('Content-Type', 'application/json');
      // console.log(items)
      res.status(200).json(items);
    });
  };

  // POST requests
const addUser = async (req, res, next) => {
    
    const user = {
      firstName: req.oidc.user.given_name,
      lastName: req.oidc.user.family_name,
    //   nick: req.oidc.user.nickname,
    //   picture: req.oidc.user.picture,
    //   update: req.oidc.user.updated_at,
    //   email: req.oidc.user.email,
    //   key: req.oidc.user.sub
    }
    
    try {
      const result = await mongodb.getDb().db('CSE341').collection('users').insertOne(user);
      res.setHeader(`Content-Type`, `application/json`);
      result
        ? res
            .status(201)  
            .json({ message: 'Document added successfully', docId: result.insertedId.toString() })
        : res.status(404).json({ message: 'Document not added' });
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
    getUser,
    addUser
  };
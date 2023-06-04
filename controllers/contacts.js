const mongodb = require('../db/connect');
var ObjectId = require('mongodb').ObjectId;

// GET Requests

const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db('CSE341').collection('contacts').find();

  // console.log(result);
  result.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    // console.log(items)
    res.status(200).json(items);
  });
};

const getSingle = async (req, res, next) => {
  var o_id = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('contacts').find({ _id: o_id });

  (await result.count()) > 0
    ? result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
      })
    : res.status(200).json({ message: `No document found.` });
};

const searchContact = async (req, res, next) => {
  var o_id = new ObjectId(req.query.id);
  const result = await mongodb.getDb().db('CSE341').collection('contacts').find({ _id: o_id });
  result.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });
};

// POST requests
const addContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }

  try {
    const result = await mongodb.getDb().db('CSE341').collection('contacts').insertOne(contact);
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

// PUT requests
const updateContact = async (req, res, next) => {
  const o_id = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .replaceOne({_id: o_id}, contact);
    
    if(response.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500),json(response.err || 'some error occured')
    }
  // try {
  //   const _ = await mongodb
  //     .getDb()
  //     .db('CSE341')
  //     .collection('contacts')
  //     .updateOne({ _id: o_id }, { $set: req.body })
  //     .then((result) => {
  //       res.setHeader(`Content-Type`, `application/json`);
  //       result.modifiedCount > 0
  //         ? res.status(204).send()
  //         : res.status(404).json({ message: `No document updated` });
  //     });
  // } catch (err) {
  //   console.log(err);
  // }
};

// DELETE requests
const deleteContact = async (req, res, next) => {
  try {
    const o_id = new ObjectId(req.params.id);
    const _ = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .deleteOne({ _id: o_id }, {})
      .then((result) => {
        result.deletedCount > 0
          ? res
              .status(200)
              .json({ message: `Document with ID: ${req.params.id} successfully deleted.` })
          : res.status(404).json({ message: 'No document deleted' });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getContacts,
  getSingle,
  searchContact,
  addContact,
  updateContact,
  deleteContact
};
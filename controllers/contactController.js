const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

// @desc get  contact 
// @route GET /contacts/:id
// @access private
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact || contact.user_id != req.user.id){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});
// @desc get all contacts
// @route GET /contacts
// @access private
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    if(!contacts){
        res.status(404);
        throw new Error("no contacts found")
    }
    res.status(200).json(contacts);
});
// @desc create new contacts
// @route POST /contacts
// @access private
const createContact = asyncHandler(async(req,res)=>{
    const {name,mobile,email} = req.body;
    if(!name || !mobile || !email){
        res.status(400);
        throw new Error("All Fields Are Mandatory create contact");
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        mobile
    });
    res.status(201).json(contact);
});
// @desc update contact
// @route PUT /contacts/:id
// @access private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact || contact.user_id != req.user.id){
        res.status(404);
        throw new Error("contact not found");
    }
    const {name,mobile,email} = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,{
        name,mobile,email
    },{new:true});

    res.status(200).json(updatedContact);
});
// @desc delete contact
// @route GET /contacts/:id
// @access private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact || contact.user_id != req.user.id){
        res.status(404);
        throw new Error("contact not found");
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if(!deletedContact){
        res.status(500);
        throw new Error("contact not deleted");
    }
    res.status(200).json(deletedContact);
});

module.exports = {getContact,getContacts,createContact,updateContact,deleteContact};

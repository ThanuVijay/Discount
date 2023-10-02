const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
const PORT = process.env.PORT || 8000;

// Schema
const schemaData = mongoose.Schema({
    name: String,
    description: String,
    expiredDate: String,
    status: String
}, {
    timestamps: true
});

const DiscountModel = mongoose.model('Discounts', schemaData);


mongoose.connect("mongodb+srv://thanushan:thanushan@e-smart.wl1g3bh.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("DB is Connected");
        app.listen(PORT, () => console.log('Server is running'));
    })
    .catch((err) => console.error(err));


// Routes

//get
app.get("/", async (req, res) => {
    const data = await DiscountModel.find({});
    res.json({ success: true, data: data });
});

//create 
app.post('/create', async (req, res) => {
    console.log(req.body);
    const data = new DiscountModel(req.body)
    await data.save()

    res.send({success:true, message:"Data saved Sucessfully", data: data})
});

//update 
app.put('/update', async(req,res)=>{
    console.log(req.body)
    const{id ,...rest} = req.body
    console.log(rest)
   const data = await DiscountModel.updateOne({_id: id}, rest)
    res.send({success: true, message:"Data Updated SuccessFully", data: data})
});

//delete 

app.delete('/delete/:id', async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await DiscountModel.deleteOne({_id: id})
    res.send({sucess:true, message: "Data Deleted Sucessfully", data: data})
});
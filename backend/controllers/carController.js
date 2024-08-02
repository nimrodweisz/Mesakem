const jwt = require("jsonwebtoken");
const carData = require('../models/cardatas')
const User = require('../models/users')
exports.getCars = async(req,res) =>{
    const { userIde } = req.body;
    const token = await req.cookies.jwt;
    const user = await User.login(userIde)
    
    if(!token){
        res.status(401);
    }
    else if(user === null) {
        res.status(401)
        return
    }
    else if(user.isManager === '0'){
        
        const cars = await carData.find({gdud : user.gdud})
        console.log(cars)
        res.send(cars)
    }
    else{

        const ManCars = await carData.find()
        res.send(ManCars)
    }

}
exports.forCarContext = async(req,res) => {
    const cars = await carData.find()
    res.send(cars)
}
exports.addCar = async(req,res) => {
    const {gdud,makat,kashir,carNumber}= req.body
    console.log(gdud, makat, kashir, carNumber);
    try {
        const newCar = new carData({ gdud, makat, kashir, carNumber });
        await newCar.save();
        res.status(200).json({ message: 'Car added successfully!' });
      } catch (error) {
        console.error('Error saving car:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    
}
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    pernr: String,
    gdud: String,
    isManager: String,
});

userSchema.statics.login =  function(pernr) {
    const usersCollection = mongoose.connection.db.collection('users'); 
    const user = usersCollection.findOne({pernr});
    if (user) {
        
            return user;
            
    }
    throw new Error('Incorrect pernr');
};

 const User = mongoose.model("User", userSchema);

userSchema.statics.fetchData = async function() {
    const result =   await User.find()
    console.log(result)
    return JSON.stringify(result)
     // Logs all users
}



module.exports = User


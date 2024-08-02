const User = require("../models/users");
const jwt = require("jsonwebtoken");




const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, "my_secret", {
    expiresIn: maxAge,
  });
};

module.exports.handleLogin = async (req, res) => {
  const { pernr } = req.body;
 
  try {
    const user = await User.login(pernr);
      const token = createToken(user._id);
      res.cookie('jwt',token,{maxAge:maxAge*1000})    
      res.json({ message: 'Logged in successfully' });
      
     res.status(201).json({user:user._id})
  } catch (err) {
   

    res.status(400).json();
  }

};
module.exports.dashboard = async (req, res) => {
  const token = req.cookies.jwt;
  const { userIde } = req.body;
  console.log(userIde);

  try {
  
    const user = await User.login(userIde);
    if (!user) {
      res.status(401)
      throw new Error('Invalid credentials');
    }
      

    jwt.verify(token, "my_secret", (err, decodedToken) => {
      if (err || user._id.toString() !== decodedToken.id) {
        console.log(err || 'Decoded token ID does not match user ID');
        res.status(401).send('better luck next time');
      } else {
        res.status(200).json({ message: 'Authenticated successfully' });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(401).send('Authentication failed');
  }
};
module.exports.getUsers = async (req, res) => {
  const token = req.cookies.jwt;
  const users = await User.find({pernr: { $ne: '8249032' }})
  jwt.verify(token, "my_secret", (err, decodedToken) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).send('Unauthorized');
    }

    const userId = decodedToken.id;

   
    console.log('88888888')
    console.log(userId)
    console.log('88888888')
    if (userId === '63864de46f9dafcd8b42aa22') {

      res.send(users)
      
    } else {
 
      res.status(403).send('Access denied');
    }
  });
};

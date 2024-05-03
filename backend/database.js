const express=require("express");
const app=express();
const mysql=require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    user:"root",
    host:"localhost",
    password:'',
    database:'brainop',
});

app.post('/',(req,res) => {
    const uname=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    const pic=req.body.profilePicture;
   
    console.log(req.body)

    db.query('INSERT INTO registeredusers (uname,email,password,name,pic)VALUES (?,?,?,?,?)',
    [uname,email,password,name,pic],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send();
        }

    }
    );
});

app.post('/validate',(req,res)=>{
    const username = req.body.username; 
    const password = req.body.password;

    db.query("SELECT * FROM registeredusers WHERE uname = ? AND password = ?",
    [username,password],
    (err,result)=>{
        if(err){
            res.send({err: err});
        }        
        else if(result.length>0 ) {
            res.send(result);
        } else{
            res.send({message: "Wrong username/password combination"});

        }
    });
});

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    username: user.username,
    password: user.password,
  };

  const options = {
    expiresIn: '1h', // Set expiration time
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user information to the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

  const verifyToken = require('verifyToken'); 

// Apply verifyToken middleware to protected routes
app.get('/protected-route', verifyToken, (req, res) => {
  // Access decoded user information from req.user
  const user = req.user;
  // Handle the request with authenticated user details
  res.json({ message: 'Welcome, authorized user!' });
});

app.get('/posts', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default limit of 10 posts
  
      const offset = (page - 1) * limit;
  
      const query = `
        SELECT * FROM posts
        ORDER BY created_at DESC
        LIMIT ?, ?
      `;
  
      const [rows] = await pool.execute(query, [offset, limit]);
  
      const totalPosts = await pool.execute('SELECT COUNT(*) AS total FROM posts');
  
      const totalPages = Math.ceil(totalPosts[0].total / limit);
  
      res.json({
        posts: rows,
        pagination: {
          page,
          limit,
          totalPages,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(3001,()=>{
    console.log("server is running on port 3001");
});
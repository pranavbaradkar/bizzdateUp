const path = require('path');
const express = require('express');
const userRouter = require('./routers/user');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('<h2>This is from index.js file</h2>');
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

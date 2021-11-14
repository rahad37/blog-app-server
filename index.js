const express = require('express');
const morgan = require('morgan');
const app = express();
const compression = require('compression');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const catRouter = require('./routers/categories');
const multer = require('multer');
const path = require('path');
dotenv.config();

app.use(express.json());
app.use(compression());
app.use(morgan('dev'));
app.use('/images', express.static(path.join(__dirname, '/images')));

mongoose.connect(process.env.MONGOOSE_URL)
.then(() => console.log('Mongodb is running perfectly'))
.catch((err) => console.log('Connection is failed'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File has been uploaded!')
})

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', catRouter);

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
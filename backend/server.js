import express from 'express'
import db from './db.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

//создаём экземпляр Express web-сервера
const app = express()

//middleware - разрешает запросы с доменных имен, кот-е отлич-ся от доменного имени веб-сервера
app.use(cors({
    origin: 'http://localhost:5173'
}))

//middleware для обработки JSON - данных
// теперь данные из тела  запроса будут доступны через req.body
app.use(express.json())


// простой middleware для логирования
app.use((req, _res, next) => {
    console.log(`new request: ${req.method} ${req.url}`)

    //next() передаёт управление следующему middleware или маршруту
    next()
})

//обработка маршрутов
app.get('/', (_req,res) => {
    res.send('Main Page')
})

//получение всех пользователей
app.get('/users', (_req,res,next) => {
    const sql = 'SELECT * FROM users'
    db.query(sql, (err, result) => {
        if(err){
            return next(err)
        }

        res.json({
            message: 'Список пользователей',
            data: result
        })
    })
})

//получение полльзователя по ID
//http:''localhost:3000/users/1
//req.params.id
app.get('/users/:id', (req, res, next) => {
    // Получаем параметр маршрута
    const userId = req.params.id;
    if (isNaN(userId)) {
        const err = new Error('Некорректный ID пользователя');
        err.status = 400;
        return next(err);
    }
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length === 0) {
            const err = new Error('Пользователь не найден');
            err.status = 404;
            return next(err);
        }
        // Отправляем в качестве ответа запись-объект пользователя, если id из параметра маршрута совпал с уникальным значением id из таблицы users
        res.json(result[0]);
    });
});

// Получаем пользователя по userName. userName передаем через параметры запроса (query)
app.get('/search', (req, res, next) => {
    // Получаем query-параметр
    const userName = req.query.userName;
    if (!userName) {
        return res.send('Передайте параметр name');
    }
    const sql = 'SELECT * FROM users WHERE name = ?';
    db.query(sql, [userName], (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length === 0) {
            const err = new Error(`Пользователи по имени "${userName}" не найдены`);
            err.status = 404;
            return next(err);
        }
        // Отправляем в качестве ответа массив объектов-пользователей, если userName из параметра запроса совпал со значением name из таблицы users
        res.json(result);
    });
});

//add new user
app.post('/user', (req,res,next) => {
    //получаем данные из тела запрос
    const {name, email} = req.body
    if(!name || !email){
        const err = new Error('name and email is required')
        err.status = 400

        return next(err)
    }
    
    const sql = `
    INSERT INTO users (name, email)
    VALUES(?, ?)
    `
    db.query(sql, [name, email], (err,result) => {
        if(err){
            return next(err)
        }
        res.status(201).json({
            message: 'User has been created',
            userId: result.insertId
        })
    })
})

// middleware для обработки ошибок
app.use((err,_req,res,_next) => {
    console.error('Error', err.message)
    res.status(err.status || 500).json({
        err: err.message || 'Server error'
    })
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
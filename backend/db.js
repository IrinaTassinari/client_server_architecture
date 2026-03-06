// Импортируем библиотеку mysql2,
// которая позволяет Node.js взаимодействовать с MySQL
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

/**
 * СОЗДАЕМ СОЕД-Е С БАЗОЙ ДАННЫХ
 */

const db = mysql.createConnection({
    //Адрес сервера базы данных
    host: process.env.DB_HOST,
    //user name
    user: process.env.DB_USER,
    //user password
    password: process.env.DB_PASS,
    //DB name
    database: process.env.DB_NAME,
})

//Подключаемся к БД с помощью метода connect()
db.connect((err) => {
    if(err){
        console.error('Connection mistake to MySQL', err)
        return
    }
    console.log('successfully connected to MySQL')
})

export default db
import db from './db.js';
// SQL-запрос для создания таблицы
// IF NOT EXISTS - означает "создать таблицу, если ее еще нет"
const sql = `
    CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
    )
`;
// Выполняем SQL-запрос
db.query(sql, (error, result) => {
    // Проверяем возникла ли ошибка
    if(error){
        console.error('Ошибка создания таблицы', error);
        return;
    }
    console.log('Таблица успешно создана. Результат создания таблицы: ', result);
    
    // Закрываем соединения
    db.end();
});
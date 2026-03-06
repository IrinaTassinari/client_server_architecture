//testApi.js
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000;
// Базовый адрес для API
const API_URL = `http://localhost:${PORT}`;
// Создание нового пользователя
async function createUser(name, email) {
    try {
        const response = await axios.post(`${API_URL}/user`, {
            name,
            email
        });
        console.log('Пользователь создан');
        console.log(response.data);
    } catch (error) {
        console.error('Ошибка создания пользователя:', error.response?.data || error.message);
    }
}


// const PORT = process.env.PORT || 3000
// //базовый адрес API
// const API_URL = `http://localhost:${PORT}`

// //creating new user
// async function createUser(name,email){
//     try{
//         const response = await axios.post(`${API_URL}/user`, {
//             name,
//             email
//         })

//         console.log('User is created')
//         console.log(response.data)
//     } catch(error){
//         console.error('Error by creating the user', error.response?.data || error.message)
//     }
// }
await createUser('Alexander', 'irinasmelova@gmail.com')
await createUser('John', 'john@gmail.com')
await createUser('Stephan', 'stephan@test.com');
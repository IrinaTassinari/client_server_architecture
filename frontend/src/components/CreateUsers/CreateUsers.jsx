import axios from 'axios'
import { useForm } from 'react-hook-form'

const API_URL = 'http://localhost:3000'

function CreateUserForm(){

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/user`, {
                name: data.name,
                email: data.email
            })

            console.log('User has been created', response.data)
            reset()
            alert('User has been created')

        } catch (error) {
            // need to write logic for duplicating email (use useState)
            console.error('Error by creating user:', error.response?.data || error.message)
            alert('Error by creating user')
        }
    }

    return (
        <div>
            <h2>Create User</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="userNameForm">Name</label>
                    <input
                        id="userNameForm"
                        type="text"
                        {...register('name', { required: 'Insert username' })}
                    />
                    {errors.name && (
                        <p style={{color: 'red'}}>{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="userEmailForm">Email</label>
                    <input
                        id="userEmailForm"
                        type="email"
                        {...register('email', { required: 'Insert email' })}
                    />
                    {errors.email && (
                        <p style={{color: 'red'}}>{errors.email.message}</p>
                    )}
                </div>

                <button type="submit">Create user</button>
            </form>
        </div>
    )
}

export default CreateUserForm
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateUsers.module.css'

const API_URL = 'http://localhost:3000'

function CreateUserForm(){
const [modal, setModal] = useState({ open: false, type: 'success', message: '' })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const closeModal = () => setModal({ open: false, type: 'success', message: '' })

    const getSubmitErrorMessage = (error) => {
        const backendMessage = error?.response?.data?.err || ''
        //Если нa backend есть Duplicate entry
        if (backendMessage.includes('Duplicate entry')) {
            return 'This email is already registered by another user'
        }
        //Для любых других ошибок возвращается общий текст
        return 'Error creating user'
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/user`, {
                name: data.name,
                email: data.email
            })

            console.log('User has been created', response.data)
            reset()
            setModal({ open: true, type: 'success', message: 'User has been created' })

        } catch (error) {
            // need to write logic for duplicating email (use useState)
            console.error('Error by creating user:', error.response?.data || error.message)
            setModal({ open: true, type: 'error', message: getSubmitErrorMessage(error) })
        }
    }

    return (
        <section className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Create User</h2>
                <p className={styles.subtitle}>Fill in user data and submit the form.</p>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="userNameForm">Name</label>
                        <input
                            className={styles.input}
                            id="userNameForm"
                            type="text"
                            {...register('name', { required: 'Insert username' })}
                        />
                        {errors.name && (
                            <p className={styles.error}>{errors.name.message}</p>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="userEmailForm">Email</label>
                        <input
                            className={styles.input}
                            id="userEmailForm"
                            type="email"
                            {...register('email', { required: 'Insert email' })}
                        />
                        {errors.email && (
                            <p className={styles.error}>{errors.email.message}</p>
                        )}
                    </div>

                    <button className={styles.button} type="submit">Create user</button>
                </form>
            </div>

        {modal.open && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              {modal.type === 'success' ? 'Success' : 'Error'}
            </h3>
            <p className={styles.modalText}>{modal.message}</p>
            <button
              className={modal.type === 'success' ? styles.modalBtnSuccess : styles.modalBtnError}
              onClick={closeModal}
              type="button"
            >
              OK
            </button>
          </div>
        </div>
      )}


        </section>
    )
}

export default CreateUserForm

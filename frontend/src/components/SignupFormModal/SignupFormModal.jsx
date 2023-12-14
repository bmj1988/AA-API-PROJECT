import { useState } from 'react'
import './SignupForm.css'
import { thunkCreateUser } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

const SignupFormModal = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return alert('The passwords you have entered do not match!')
        }
        else {
            const newUser = {
                email,
                password,
                username,
                firstName,
                lastName,
            }
            const res = await dispatch(thunkCreateUser(newUser))
            if (res.errors) {
                setErrors(res.errors)
                return
            }
            closeModal();
        }
    }

    return (
        <div className='signupDiv'>
            <h1 className='signupHeader'>New User Signup Form</h1>
            <form onSubmit={onSubmit} className="signupForm">
                {Object.values(errors).length > 0 && Object.values(errors).map(error => <p className={'errors'} key={error}>{error}</p>)}
                <input name='firstName' type='text' placeholder='First Name' className={`loginputs`} onChange={(e) => setFirstName(e.target.value)} />
                <input name='lastName' type='text' placeholder='Last Name' className={`loginputs`} onChange={(e) => setLastName(e.target.value)} />
                <input name='email' type='email' placeholder='Email' className={`loginputs`} onChange={(e) => setEmail(e.target.value)} />
                <input name='username' type='text' placeholder='Username' className={`loginputs`} onChange={(e) => setUsername(e.target.value)} />
                <input name='password' type='password' placeholder='Password' className={`loginputs`} onChange={(e) => setPassword(e.target.value)} />
                <input name='passwordConfirm' type='password' placeholder='Confirm Password' className={`loginputs`} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className='signupButton' disabled={password.length < 6 || confirmPassword.length < 6}>SIGN UP</button>

            </form>
        </div>
    )
}
export default SignupFormModal

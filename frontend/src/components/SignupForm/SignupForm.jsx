import { useState } from 'react'
import './SignupForm.css'
import { thunkCreateUser } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                console.log(res)
                setErrors(res.errors)
                return
            }
            console.log(res)
            navigate('/')
            return
        }
    }

    return (
        <>
            <h1>New User Signup Form</h1>
            <h2>Please enter your details below</h2>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor='firstName'>First Name: </label>
                    <input name='firstName' type='text' className={`loginputs`} onChange={(e) => setFirstName(e.target.value)} />
                    <br />
                    <label htmlFor='lastName'>Last Name:</label>
                    <input name='lastName' type='text' className={`loginputs`} onChange={(e) => setLastName(e.target.value)} />
                    <br />
                    <label htmlFor='email'>E-mail Address:</label>
                    <input name='email' type='email' className={`loginputs`} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor='username'>Desired username:</label>
                    <input name='username' type='text' onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor='password'>Password: </label>
                    <input name='password' type='password' className={`loginputs`} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <label htmlFor='password'>Repeat Password:</label>
                    <input name='passwordConfirm' type='password' className={`loginputs`} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button>Sign Up</button>
                    {Object.values(errors).length > 0 && Object.values(errors).map(error => <p className={'errors'} key={error}>{error}</p>)}
                </fieldset>
            </form>
        </>
    )
}
export default SignupForm

import { useState } from "react"
import { thunkLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';
import { useModal } from "../../context/Modal";


const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [credential, setCredential] = useState('');
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();


    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        const credentials = {
            password,
            credential
        }
        try {
            await dispatch(thunkLogin(credentials));
            setPassword('');
            setCredential('');
            closeModal()
        }
        catch (e) {
            const error = await e.json();
            setErrors(error.errors);
        }

    }

    const demoClick = (e) => {
        e.preventDefault();
        dispatch(thunkLogin({ password: 'password', credential: 'Demo-lition' }))
        closeModal()
    }

    return (
        <div className='loginDiv'>
            <h1>log in</h1>
            <form onSubmit={onSubmit}>
                <div className={'formDiv'}>
                    {Object.values(errors).length > 0 && Object.values(errors).map(error => <p key={error} className={'errors'}>{error}</p>)}
                    <input name='usernameOrEmail' type='text' placeholder='Username or Email' className={'loginPuts'} onChange={(e) => {
                        setCredential(e.target.value)
                        if (Object.values(errors).length) setErrors({})
                        return
                    }} />
                    <input name='password' type='password' placeholder='Password' className={'loginPuts'} onChange={(e) => {
                        setPassword(e.target.value)
                        if (Object.values(errors).length) setErrors({})
                        return
                    }} />
                    <p className='demouser' onClick={demoClick}>Demo User</p>
                    <button disabled={password.length < 6 || credential.length < 4 || Object.values(errors).length} className="loginButton"> LOGIN </button>

                </div>

            </form>

        </div>
    )
}
export default LoginFormModal;

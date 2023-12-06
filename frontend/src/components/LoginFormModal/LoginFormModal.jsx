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

    return (
        <>
        <h1>Log In</h1>
        <form onSubmit={onSubmit}>
            <fieldset className={'legend'}>
                <label htmlFor="usernameOrEmail">Username or Email Address: </label>
                <input name='usernameOrEmail' type='text' className={'loginPuts'} onChange={(e) => setCredential(e.target.value)} />
                <br />
                <label htmlFor='password'>Password:</label>
                <input name='password' type='password' className={'loginPuts'} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button> LOGIN </button>
                {Object.values(errors).length > 0 && Object.values(errors).map(error => <p key={error} className={'errors'}>{error}</p>)}
            </fieldset>
        </form>
        </>
    )
}
export default LoginFormModal;

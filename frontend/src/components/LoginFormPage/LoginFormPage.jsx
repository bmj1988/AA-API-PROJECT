import { useState } from "react"
import { thunkLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const LoginFormPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [credential, setCredential] = useState('');
    const [errors, setErrors] = useState({})
    const onSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            password,
            credential
        }
        try {
            await dispatch(thunkLogin(credentials));
            setPassword('');
            setCredential('');
            navigate('/')
        }
        catch (e) {
            const error = await e.json();
            setErrors(error);
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <label htmlFor="usernameOrEmail">Username or Email Address: </label>
                <input name='usernameOrEmail' type='text' onChange={(e) => setCredential(e.target.value)} />
                <label htmlFor='password'>Password:</label>
                <input name='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <button> LOGIN </button>
                {Object.values(errors).length > 0 && (<p>{errors.message}</p>)}
            </fieldset>
        </form>
    )
}
export default LoginFormPage;

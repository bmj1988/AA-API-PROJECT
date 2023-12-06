import { useState, useEffect } from "react"
import { thunkLogin } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';



const LoginFormPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.session.user)
    const [password, setPassword] = useState('');
    const [credential, setCredential] = useState('');
    const [errors, setErrors] = useState({})
    useEffect(() => {
        if (userSelector) {
            navigate('/')
        }
    }, [userSelector, navigate])

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
            setErrors(error.errors);
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset className={'legend'}>
                <label htmlFor="usernameOrEmail">Username or Email Address: </label>
                <input name='usernameOrEmail' type='text'  className={'loginPuts'} onChange={(e) => setCredential(e.target.value)} />
                <br/>
                <label htmlFor='password'>Password:</label>
                <input name='password' type='password' className={'loginPuts'} onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <button> LOGIN </button>
                {Object.values(errors).length > 0 && Object.values(errors).map(error => <p key={error} className={'errors'}>{error}</p>)}
            </fieldset>
        </form>
    )
}
export default LoginFormPage;

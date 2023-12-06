import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { thunkLogout } from '../../store/session'
import Icon from './ProfileButton'


const NavBar = ({ userFetched }) => {
    const dispatch = useDispatch();
    const sessionState = useSelector(state => state.session.user)
    const logout = async (e) => {
        e.preventDefault();
        const logoutReceived = await dispatch(thunkLogout);
        if (logoutReceived.message) {
            alert(logoutReceived.message);
        }
    }

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                {(sessionState.user === null && userFetched) && (
                    <>
                        <li>
                            <NavLink to='/signup'>Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink to='/login'> Login </NavLink>
                        </li>
                    </>
                )
                }
                {(sessionState.user !== null && userFetched) && (
                    <>
                        <li>
                            <Icon user={sessionState} />
                        </li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                )
                }
            </ul>
        </nav>
    )
}
export default NavBar;

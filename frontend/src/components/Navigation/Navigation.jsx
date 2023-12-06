import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Icon from './ProfileButton'
import './Navigation.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from '../SignupFormModal/SignupFormModal'

const NavBar = ({ userFetched }) => {
    const sessionState = useSelector(state => state.session.user)

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                {userFetched && (
                    <li>
                        <Icon user={sessionState} />
                    </li>
                )
                }
            </ul>
        </nav>
    )
}
export default NavBar;

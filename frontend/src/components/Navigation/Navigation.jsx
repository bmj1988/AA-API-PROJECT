import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserIcon from './ProfileButton'
import './Navigation.css'
import LogoButton from './LogoButton'
import SearchBar from './SearchBar'

const NavBar = ({ userFetched }) => {
    const sessionState = useSelector(state => state.session.user)

    return (
        <nav className='navBar'>

            <div className={'navItem'}>
                <NavLink to='/' style={{textDecoration: 'none', margin: '10px'}}><LogoButton/></NavLink>
            </div>
            <div>
                <SearchBar/>
            </div>
            {userFetched && (
                <div className={'navItem'}>
                    <UserIcon className='userIcon' user={sessionState} />
                </div>
            )
            }

        </nav>
    )
}
export default NavBar;

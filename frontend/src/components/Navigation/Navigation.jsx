import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserIcon from './ProfileButton'
import './Navigation.css'
import LogoButton from './LogoButton'
import SearchBar from './SearchBar'
import { useModal } from '../../context/Modal'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import SpotFormModal from '../SpotFormModal/SpotForm';

const NavBar = ({ userFetched }) => {
    const sessionState = useSelector(state => state.session.user)
    const { modalView, setModalView } = useModal();
    const navigate = useNavigate();

    const toggleModal = (e) => {
        e.preventDefault();
        setModalView(!modalView)
        return
    }


    return (
        <nav className='navBar'>

            <div className={'navItem'}>
                <NavLink to='/' style={{ textDecoration: 'none', margin: '10px' }}><LogoButton /></NavLink>
            </div>
            <div>
                <SearchBar />
            </div>
            {userFetched && (
                <div className={'navItem'}>
                    <div className='modalViewToggle'>
                        <i className={modalView ? "fa-solid fa-layer-group colormark larger" : "fa-solid fa-layer-group empty larger"} onClick={(e) => toggleModal(e)} style={{ cursor: 'pointer' }}> </i><p className='textmark'>Modal mode: {modalView ? 'On' : 'Off'}</p>
                    </div>
                    {modalView? <OpenModalButton buttonText={'Create a New Spot'} modalComponent={<SpotFormModal />}/> : <button onClick={() => navigate('/createSpot')}>Create a New Spot</button>}
                    <UserIcon className='userIcon' user={sessionState} />
                </div>
            )
            }

        </nav>
    )
}
export default NavBar;

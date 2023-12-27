import { useDispatch } from "react-redux";
import { thunkLogout } from "../../store/session";
import { useState, useEffect, useRef } from "react";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SpotFormModal from "../SpotFormModal/SpotForm";
import { NavLink, useNavigate } from "react-router-dom";
import './Navigation.css'
import { useModal } from "../../context/Modal";

const HomeIcon = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { modalView } = useModal();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();
    useEffect(() => {
        if (!showMenu) return

        const closeMenu = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const logout = async (e) => {
        e.preventDefault();
        setShowMenu(false);
        await dispatch(thunkLogout());
        navigate('/');
    }

    return (
        <div className='sessionContainer'>
            <button className='modalMenuItem' onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu)
            }}>
                <div style={{ color: "#1bcdd0", fontSize: "40px" }}>
                    <i className="fa-solid fa-user-gear"></i>
                </div>
            </button>
            <ul className={`profile-dropdown` + (showMenu ? '' : " hidden")} ref={menuRef}>
                {user && (
                    <>
                        <li>
                            {`Hello, ${user.firstName}!`}
                        </li>
                        <li>
                            {user.username}
                        </li>

                        <li className='dropDownElement'>
                            {user.email}
                        </li>

                        {modalView ? <OpenModalMenuItem itemText={'Create a new Spot'} onItemClick={() => setShowMenu(false)} modalComponent={<SpotFormModal />} /> : <li onClick={() => navigate('/createSpot')} style={{cursor: 'pointer'}}>Create a new Spot</li>}
                        <NavLink to="/current" className={'unstyled'}>Manage Spots</NavLink>
                        <NavLink to="/reviews" className={'unstyled'}>Manage Reviews</NavLink>
                        <NavLink to="/bookings" className={'unstyled'}>Manage Bookings</NavLink>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                )}
                {
                    !user && (
                        <>
                            <div style={{ display: 'block' }}>
                                <button className='modalMenuItem'><OpenModalMenuItem itemText={'Sign Up'} onItemClick={() => setShowMenu(false)} modalComponent={<SignupFormModal />} /></button>
                            </div>
                            <div style={{ display: 'block' }}>
                                <button className='modalMenuItem'><OpenModalMenuItem itemText={'Log In'} onItemClick={() => setShowMenu(false)} modalComponent={<LoginFormModal />} /></button>
                            </div>
                        </>

                    )
                }


            </ul>
        </div>
    )
}

export default HomeIcon;

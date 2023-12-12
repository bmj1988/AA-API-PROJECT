import { useDispatch } from "react-redux";
import { thunkLogout } from "../../store/session";
import { useState, useEffect, useRef } from "react";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SpotFormModal from "../SpotFormModal/SpotForm";
import { NavLink } from "react-router-dom";
import './Navigation.css'

const HomeIcon = ({ user }) => {
    const dispatch = useDispatch();
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
        const logoutReceived = await dispatch(thunkLogout());
        if (logoutReceived.message) {
            alert(logoutReceived.message);
        }
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
                            {user.username}
                        </li>
                        <li>
                            {`${user.firstName} ${user.lastName}`}
                        </li>
                        <li>
                            {user.email}
                        </li>

                        <OpenModalMenuItem itemText={'Create a new Spot'} onItemClick={() => setShowMenu(false)} modalComponent={<SpotFormModal/>}/>
                        <NavLink to="/current">Manage Spots</NavLink>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                )}
                {
                    !user && (
                        <div>
                            <button className='modalMenuItem'><OpenModalMenuItem itemText={'Sign Up'} onItemClick={() => setShowMenu(false)} modalComponent={<SignupFormModal />} /></button>
                            <button className='modalMenuItem'><OpenModalMenuItem itemText={'Log In'} onItemClick={() => setShowMenu(false)} modalComponent={<LoginFormModal />} /></button>
                        </div>
                    )
                }


            </ul>
        </div>
    )
}

export default HomeIcon;

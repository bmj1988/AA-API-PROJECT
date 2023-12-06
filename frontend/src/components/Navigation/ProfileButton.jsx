import { useDispatch } from "react-redux";
import { thunkLogout } from "../../store/session";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";

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
        <>
            <button onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu)
            }}>
                <div style={{ color: "blueviolet", fontSize: "40px" }}>
                    <i className="fa-solid fa-house-user"></i>
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
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                )}
                {
                    !user && (
                        <>
                            <li>
                                <OpenModalMenuItem itemText={'Sign Up'} onItemClick={() => setShowMenu(false)} modalComponent={<SignupFormModal />} />
                            </li>
                            <li>
                                <OpenModalMenuItem itemText={'Log In'} onItemClick={() => setShowMenu(false)} modalComponent={<LoginFormModal />} />
                            </li>
                        </>
                    )
                }


            </ul>
        </>
    )
}

export default HomeIcon;

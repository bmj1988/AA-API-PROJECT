import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { thunkRestoreUser } from './store/session';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupForm from './components/SignupForm/SignupForm';
import NavBar from './components/Navigation/Navigation'


const Layout = () => {
  const dispatch = useDispatch();
  const [userFetched, setUserFetched] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      await dispatch(thunkRestoreUser());
      setUserFetched(true)
    }
    getUser()
  }, [dispatch])

  return (
    <>
      <NavBar userFetched={userFetched}/>
      <main>
      {userFetched && <Outlet />}
      </main>
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignupForm/>
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Route, Routes } from 'react-router'
import { Slide, ToastContainer } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import './App.css'
import { AppLayout, CreatePost, Home, Posts } from './Components/index'
import ProtectRoute from './Components/ProtectRoute'
import Login from './pages/Login'
import { userState } from './store'

function App() {

  const user = useRecoilValue(userState);

  return (
    <>
      <Routes>
        {/* All the routes */}
        <Route path="/" element={<AppLayout />}>
          <Route path='/' index element={<Home />} />
          <Route path='posts' element={<ProtectRoute isAuthenticated={user.auth.isAuthenticated}><Posts /></ProtectRoute>} />
          <Route path='create' element={<ProtectRoute isAuthenticated={user.auth.isAuthenticated}><CreatePost /></ProtectRoute>} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Authentication/Login'
import Register from './Pages/Authentication/Register'
import Dashboard from './Pages/Admin/Dashboard/Dashboard'
import Main from './Components/Layouts Component/Main'
import { SkeletonTheme } from 'react-loading-skeleton'
import CreatePost from './Pages/Admin/Posts/CreatePost'
import Posts from './Pages/Admin/Posts/Posts'
import Chats from './Pages/Admin/Chats/Chats'

function App() {

  return (
    <>
      <SkeletonTheme baseColor="#f1eff1" highlightColor="#fffcfe">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<Main />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='posts' element={<Posts />} />
              <Route path='create' element={<CreatePost />} />
              <Route path='chats' element={<Chats />} />
              {/* <Route path='edit/:id' element={<UserEdit />} />
              <Route path='chats/:id' element={<Chats />} /> */}
            </Route>
          </Route>
        </Routes>
      </SkeletonTheme>
    </>
  )
}

export default App

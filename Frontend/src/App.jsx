import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Authentication/Login'
import Register from './Pages/Authentication/Register'

import Posts from './Pages/Posts/Posts'
import CreatePost from './Pages/Posts/CreatePost'
import Chats from './Pages/Chats/Chats'
import Profile from './Pages/Profiles/Profiles'

import Main from './Components/Layouts Component/Main'
import Timeline from './Pages/Timeline/Timeline'
import { SkeletonTheme } from 'react-loading-skeleton'
import Friends from './Pages/Friends/Friends'

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
            <Route path='/timeline' element={<Timeline />}>
              <Route path='posts' element={<Posts/>} />
              <Route path='create' element={<CreatePost />} />
              <Route path='chats' element={<Chats />} />
              <Route path='profile' element={<Profile />} />
              <Route path='friends' element={<Friends />} />
            </Route>
          </Route>
        </Routes>
      </SkeletonTheme>
    </>
  )
}

export default App

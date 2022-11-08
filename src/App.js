import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Styles
import './App.css'

// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FriendsBar from './components/FriendsBar'

// Pages
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import LoginM from './pages/loginM/LoginM'
import Signup from './pages/signup/Signup'
import ReactionDetails from './pages/reactionDetails/ReactionDetails'
import Reactions from './pages/reactions/Reaction'
import ReceivedReactions from './pages/receivedReactions/ReceivedReactions'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (

    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
              <Route path='/reactionDetails/:id' element={user ? <ReactionDetails /> : <Navigate to='/login' />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/loginM' element={!user ? <LoginM /> : <Navigate to='/' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
              <Route path='/reactions' element={user ? <Reactions /> : <Navigate to='/login' />} />
              <Route path='/receivedReactions' element={user ? <ReceivedReactions /> : <Navigate to='/login' />} />
            </Routes>
          </div>
          {user && <FriendsBar />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App

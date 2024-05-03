import SignupForm from './SignupForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListScreen from './PostListScreen';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="*" element={<SignupForm />} />
        <Route path="/posts" element={<PostListScreen />} />
        
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;

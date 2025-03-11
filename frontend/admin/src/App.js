import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './containers/auth/AdminLogin';
import AdminLayout from './containers/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/dashboard" element={<AdminLayout/>} />
      </Routes>
    </Router>
  );
}

export default App;

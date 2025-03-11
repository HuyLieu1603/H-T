import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dash-board/dashboard';
import AdminLogin from './containers/Auth/AdminLogin';
import AdminLayout from './containers/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<h1>users</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

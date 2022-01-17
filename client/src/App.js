import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import ProductList from './views/ProductList'
import CreateProduct from './views/CreateProduct'
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<ProductList/>}/>
          <Route path="/search/:keyword" element={<ProductList/>} exact/>
          <Route path="/search/:keyword/page/:pageNumber" element={<ProductList/>} />
          <Route path="/create/product" element={<CreateProduct/>} />
          
      </Routes>
    </Router>
  );
}

export default App;

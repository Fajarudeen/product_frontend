import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './components/ProductList'
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Header from './components/header';
import ViewProduct from './components/ViewProduct';


function App() {
  return (
    <>
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/Update/:id' element={<UpdateProduct/>} />
          <Route path='/view/:id' element={<ViewProduct/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}
export default App;

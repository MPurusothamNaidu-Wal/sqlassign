import logo from './logo.svg';
import './App.css';
import ProductContext from './ProductContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import AuthorApp from './AuthorApp';
import { useReducer } from 'react';
import ProductReducer from './ProductReducer';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import TodoApp from './TodoApp';
function App() {
  const myProduct = [];
  const [state, dispatch] = useReducer(ProductReducer, myProduct);
  const value = { state, dispatch };
  return (
    <div className='App'>
      {/* <ProductContext.Provider value={value}>
                <ProductForm />
                <ProductList />
            </ProductContext.Provider> */}

      <AuthorApp></AuthorApp>
      <TodoApp></TodoApp>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import HomePage from '../page/home/HomePage';
import ProductPage from '../page/product/ProductPage';

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
        </Routes>
    );
};

export default RouteConfig;

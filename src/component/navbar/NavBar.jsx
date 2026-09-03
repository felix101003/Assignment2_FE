// ============================================
// NAVBAR COMPONENT
// ============================================

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../cart/reducer/cartReduxReducer';

const Navbar = () => {

    const totalItems = useSelector(state => state.cart.totalItems);
    const dispatch = useDispatch();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold text-blue-600 no-underline">
                    Viet's Classical Recipes
                </Link>

                <div className="flex gap-6 items-center">
                    <Link to="/"
                        className="text-base text-gray-600 hover:text-blue-600 no-underline transition-colors">
                        Favorite
                    </Link>
                    <Link to="/products"
                        className="text-base text-gray-600 hover:text-blue-600 no-underline transition-colors">
                        Recipes
                    </Link>

                    <button
                        onClick={() => dispatch(toggleCart())}
                        className="relative bg-blue-600 text-white px-5 py-2.5 text-base rounded-lg
                                   hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        🛒 Cart
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white
                                            text-xs w-5 h-5 rounded-full flex items-center
                                            justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;

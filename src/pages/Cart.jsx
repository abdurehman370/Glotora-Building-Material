import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    return (
        <div className="cart-page section">
            <div className="container">
                <h2 className="section-title">Shopping Cart</h2>
                <div className="cart-empty-state">
                    <p>Your cart is currently empty.</p>
                    <Link to="/products" className="btn-primary">Return to Shop</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;

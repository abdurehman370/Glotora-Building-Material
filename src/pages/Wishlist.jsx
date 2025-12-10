import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
    return (
        <div className="wishlist-page section">
            <div className="container">
                <h2 className="section-title">My Wishlist</h2>
                <div className="wishlist-empty-state">
                    <p>Your wishlist is empty.</p>
                    <Link to="/products" className="btn-primary">Browse Products</Link>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from './Products';
import './Products.css';

const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => String(p.id) === id);

    if (!product) {
        return (
            <div className="products-page">
                <div className="container section">
                    <p>Product not found.</p>
                    <Link to="/products" className="btn-view" style={{ display: 'inline-block', marginTop: '1rem' }}>
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="products-page">
            <div className="page-header">
                <div className="container">
                    <h1>{product.name}</h1>
                    <p className="product-cat">{product.category}</p>
                </div>
            </div>

            <div className="container section product-detail">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-detail-info">
                    <h2>{product.name}</h2>
                    <p className="product-code">Code: {product.code}</p>
                    <p>Category: {product.category}</p>
                    <Link to="/products" className="btn-view">Back to Products</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;


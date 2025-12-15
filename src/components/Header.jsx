import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Search, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import './Header.css';
import { categories } from '../pages/Products';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="contact-info">
                        <a href="tel:065248224" className="contact-item"><Phone size={14} /> 065248224</a>
                        <a href="https://wa.me/971528053811" className="contact-item"><Phone size={14} /> 052 805 3811 (CALL/WA)</a>
                        <a href="mailto:sales@rgsgulf.com" className="contact-item"><Mail size={14} /> sales@rgsgulf.com</a>
                    </div>
                    <div className="address-info mobile-hidden">
                        <span className="contact-item"><MapPin size={14} /> SHARJAH, U.A.E.</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="main-header">
                <div className="container header-inner">
                    <div className="logo-wrapper">
                        <Link to="/" className="logo">
                            <img src="/images/logo.svg" alt="Glotra logo" className="logo-mark" />
                            <div className="logo-text">
                                <h1>GLOTRA</h1>
                                <span className="subtitle">BUILDING MATERIALS</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        <ul className="nav-list">
                            <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link></li>
                            <li><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>ABOUT US</Link></li>

                            <li className="nav-item-dropdown">
                                <Link to="/products" className={`nav-link ${location.pathname.includes('/products') ? 'active' : ''}`}>
                                    PRODUCTS <ChevronDown size={14} className="dropdown-arrow" />
                                </Link>
                                <div className="mega-menu">
                                    <div className="mega-content">
                                        <div className="mega-column">
                                            <h3>Categories</h3>
                                            <ul className="mega-links">
                                                {categories.filter(c => c !== 'All').map(cat => (
                                                    <li key={cat}>
                                                        <Link to={`/products?category=${encodeURIComponent(cat)}`}>
                                                            {cat}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mega-featured">
                                            <div className="featured-card">
                                                <h4>Featured Product</h4>
                                                <p>Explore our premium range of valves.</p>
                                                <Link to="/products?category=Valves" className="btn btn-primary btn-sm">View Collection</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li><Link to="/brands" className={`nav-link ${location.pathname === '/brands' ? 'active' : ''}`}>BRANDS</Link></li>
                        </ul>
                    </nav>

                    <div className="header-actions">
                        {/* Search goes to Products page where search box is available */}
                        <Link to="/products" className="icon-btn search-btn">
                            <Search size={22} />
                        </Link>
                        <Link to="/wishlist" className="icon-btn">
                            <Heart size={22} />
                            <span className="badge">0</span>
                        </Link>
                        <Link to="/cart" className="icon-btn">
                            <ShoppingCart size={22} />
                            <span className="badge">0</span>
                        </Link>
                        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    <Link to="/" className="mobile-link">HOME</Link>
                    <Link to="/about" className="mobile-link">ABOUT US</Link>
                    <div className="mobile-submenu">
                        <span className="mobile-link-header">PRODUCTS</span>
                        {categories.filter(c => c !== 'All').map(cat => (
                            <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="mobile-sublink">
                                {cat}
                            </Link>
                        ))}
                    </div>
                    <Link to="/brands" className="mobile-link">BRANDS</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;

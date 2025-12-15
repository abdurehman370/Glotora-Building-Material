import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            {/* Floating WhatsApp contact button */}
            <a
                href="https://wa.me/971528053811"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/images/whatsapp-icon.svg" alt="Chat on WhatsApp" />
            </a>
        </div>
    );
};

export default Layout;

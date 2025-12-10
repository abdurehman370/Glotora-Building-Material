import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="page-header">
                <div className="container">
                    <h1>About Us</h1>
                </div>
            </div>

            <section className="section">
                <div className="container about-content">
                    <div className="about-text">
                        <h2>Who We Are</h2>
                        <p>
                            Glotra Building Materials is a premier supplier of high-quality construction and industrial materials in the United Arab Emirates.
                            Established with a vision to support the growing infrastructure needs of the region, we have built a reputation for reliability,
                            quality, and exceptional customer service.
                        </p>
                        <p>
                            Our extensive product range serves various sectors including construction, oil & gas, engineering, and facilities management.
                            We partner with globally recognized brands to ensure that our clients receive only the best products the market has to offer.
                        </p>

                        <h3>Our Mission</h3>
                        <p>
                            To provide superior building solutions through high-quality products, competitive pricing, and timely delivery, ensuring total customer satisfaction.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Construction Site" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

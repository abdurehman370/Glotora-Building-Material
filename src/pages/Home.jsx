import React, { useEffect, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    // Scroll reveal animation
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const brandSlides = useMemo(() => {
        const size = 4;
        const slides = [];
        for (let i = 0; i < homeBrands.length; i += size) {
            slides.push(homeBrands.slice(i, i + size));
        }
        return slides;
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero reveal">
                <div className="container hero-content">
                    <h1>Quality Building Materials <br /> for Your Projects</h1>
                    <p>Leading supplier of construction and building materials in the UAE.</p>
                    <Link to="/products" className="btn btn-primary">View Products</Link>
                </div>
            </section>

            {/* About Summary */}
            <section className="section bg-light reveal">
                <div className="container text-center">
                    <h2 className="section-title">Welcome to Glotra Building Materials</h2>
                    <p className="section-desc">
                        We are dedicated to providing high-quality building materials to the construction industry.
                        With a focus on reliability and excellence, we serve clients across the UAE.
                    </p>
                    <Link to="/about" className="learn-more-link">Read More <ArrowRight size={16} /></Link>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="section reveal">
                <div className="container">
                    <h2 className="section-title text-center">Our Product Categories</h2>
                    <div className="categories-grid">
                        {categories.map((cat, index) => (
                            <Link key={index} to={`/products?category=${encodeURIComponent(cat.title)}`} className="category-card">
                                <div className="cat-img-container">
                                    <img src={cat.image} alt={cat.title} className="cat-img" />
                                </div>
                                <h3>{cat.title}</h3>
                                <span className="cat-link">View Details</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Brands */}
            <section className="section bg-light slide-up delay-200 reveal">
                <div className="container">
                    <h2 className="section-title text-center">Our Brands</h2>
                    <Carousel controls={false} indicators={false} interval={2000} pause={false} className="brands-carousel">
                        {brandSlides.map((slide, idx) => (
                            <Carousel.Item key={idx}>
                                <div className="home-brands-grid">
                                    {slide.map((brand, index) => (
                                        <div key={index} className="home-brand-item">
                                            <img src={brand.logo} alt={brand.name} />
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="text-center mt-2">
                        <Link to="/brands" className="btn btn-outline">View All Brands</Link>
                    </div>
                </div>
            </section>

            {/* Services/Highlights */}
            <section className="section highlights-section reveal">
                <div className="container highlights-grid">
                    <div className="highlight-item">
                        <h3>Premium Quality</h3>
                        <p>Sourced from top global manufacturers.</p>
                    </div>
                    <div className="highlight-item">
                        <h3>Fast Delivery</h3>
                        <p>Efficient logistics across the UAE.</p>
                    </div>
                    <div className="highlight-item">
                        <h3>Expert Support</h3>
                        <p>Technical guidance for your projects.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const categories = [
    { title: "Valves", image: "/images/products/angle-valve-76.jpg" },
    { title: "Compression Fittings", image: "/images/products/CompressionCoupling.jpeg" },
    { title: "Pipes And Fittings", image: "/images/products/Cosmoplastpipe.jpeg" },
    { title: "Plumbing And Drainage Solutions", image: "/images/products/Trap-Fitting.jpeg" },
    { title: "CP Sanitary Mixers", image: "/images/products/vado-mixer-tap.jpeg" },
    { title: "Kitchen Sinks", image: "/images/products/blankosink.jpeg" }
];
const homeBrands = [
    { name: "Pegler Yorkshire", logo: "/images/brands/pegler-yorkshire.svg" },
    { name: "Cosmoplast", logo: "/images/brands/cosmoplast.png" },
    { name: "PEX", logo: "/images/brands/pex.png" },
    { name: "Vado", logo: "/images/brands/vado.png" },
    { name: "MPI Atlas", logo: "/images/brands/mpi-atlas.svg" },
    { name: "Franke", logo: "/images/brands/franke.png" }
];

export default Home;

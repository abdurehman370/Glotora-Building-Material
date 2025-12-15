import React, { useState, useEffect } from 'react';
import { Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const initialSearch = searchParams.get('search') || '';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const categoryFiltered = activeCategory === 'All'
        ? productsData
        : productsData.filter(p => p.category === activeCategory);

    const filteredProducts = normalizedSearch
        ? categoryFiltered.filter(p =>
            p.name.toLowerCase().includes(normalizedSearch) ||
            p.code.toLowerCase().includes(normalizedSearch)
        )
        : categoryFiltered;

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to page 1 when category or search changes,
    // and keep URL in sync with current filters
    useEffect(() => {
        setCurrentPage(1);
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);

            if (activeCategory === 'All') {
                next.delete('category');
            } else {
                next.set('category', activeCategory);
            }

            if (!normalizedSearch) {
                next.delete('search');
            } else {
                next.set('search', normalizedSearch);
            }

            return next;
        });
    }, [activeCategory, normalizedSearch, setSearchParams]);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="products-page">
            <div className="page-header">
                <div className="container">
                    <h1>Our Products</h1>
                </div>
            </div>

            <div className="container section products-layout">
                {/* Sidebar */}
                <aside className="products-sidebar">
                    <div className="sidebar-header">
                        <Filter size={20} />
                        <h3>Categories</h3>
                    </div>
                    <ul className="category-list">
                        {categories.map(cat => (
                            <li
                                key={cat}
                                className={activeCategory === cat ? 'active' : ''}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Product Grid */}
                <div className="products-grid-container">
                    {/* Search bar */}
                    <div className="products-search">
                        <Search size={18} className="products-search-icon" />
                        <input
                            type="text"
                            placeholder="Search products by name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="products-search-clear"
                                onClick={() => setSearchTerm('')}
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <div className="products-grid">
                        {currentProducts.map(product => (
                            <Link key={product.id} to={`/products/${product.id}`} className="product-card">
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <span className="product-cat">{product.category}</span>
                                    <h4>{product.name}</h4>
                                    <p className="product-code">Code: {product.code}</p>
                                    <button className="btn-view">View Details</button>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>
                            
                            <div className="pagination-numbers">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* Results count */}
                    <div className="products-count">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                    </div>
                </div>
            </div>
        </div>
    );
};

export const categories = ['All', 'Plumbing', 'Valves', 'Compression Fittings', 'Pipes And Fittings', 'Plumbing And Drainage Solutions', 'CP Sanitary Mixers', 'Adhesives', 'Pipe Support Systems', 'Kitchen Sinks'];

export const productsData = [
    // Valves
    { id: 1, name: "Angle Valve 76", category: "Valves", code: "AV-076", image: "/images/products/angle-valve-76.jpg" },
    { id: 2, name: "Angle Valve 77", category: "Valves", code: "AV-077", image: "/images/products/angle-valve-77.jpg" },
    { id: 3, name: "Angle Valve 78", category: "Valves", code: "AV-078", image: "/images/products/angle-valve-78.jpg" },
    { id: 4, name: "Angle Valve 79", category: "Valves", code: "AV-079", image: "/images/products/angle-valve-79.jpg" },
    { id: 5, name: "Angle Valve PEX-225A-C/P", category: "Valves", code: "AV-PEX-225A", image: "/images/products/angle-valve-pex-225a-c-p.jpg" },
    { id: 6, name: "Angle Valve PEX-226A-C/P", category: "Valves", code: "AV-PEX-226A", image: "/images/products/angle-valve-pex-226a-c-p.jpg" },
    { id: 7, name: "Angle Valve PEX-228A-C/P", category: "Valves", code: "AV-PEX-228A", image: "/images/products/angle-valve-pex-228a-c-p.jpg" },
    { id: 8, name: "Angle Valve PEX-229FA-C/P", category: "Valves", code: "AV-PEX-229FA", image: "/images/products/angle-valve-pex-229fa-c-p.jpg" },
    { id: 9, name: "Angle Valve PEX-230-C/P", category: "Valves", code: "AV-PEX-230", image: "/images/products/angle-valve-pex-230-c-p.jpg" },
    { id: 10, name: "Automatic Air Vent P775", category: "Valves", code: "AAV-P775", image: "/images/products/automatic-air-vent-p775.jpg" },
    { id: 11, name: "Ball Float Valves", category: "Valves", code: "BFV-001", image: "/images/products/ball-float-valves.jpg" },
    
    // Plumbing Products
    { id: 12, name: "Gate Valve", category: "Plumbing", code: "GV-101", image: "/images/products/gate-valve.jpg" },
    { id: 13, name: "Ball Valve", category: "Plumbing", code: "BV-200", image: "/images/products/ball-valve.jpg" },
    { id: 14, name: "Pipe Fitting", category: "Plumbing", code: "PF-88", image: "/images/products/pipe-fitting.jpg" },
    { id: 15, name: "Check Valve", category: "Plumbing", code: "CV-201", image: "/images/products/check-valve.jpg" },
    { id: 16, name: "Pressure Reducing Valve", category: "Plumbing", code: "PRV-202", image: "/images/products/pressure-reducing-valve.jpg" },
    { id: 17, name: "Stop Valve", category: "Plumbing", code: "SV-203", image: "/images/products/stop-valve.jpg" },
    
    // Compression Fittings
    { id: 18, name: "Pegler Yorkshire Compression Fitting", category: "Compression Fittings", code: "CF-PY-001", image: "/images/products/PegglerYorkshire-compression.jpeg" },
    { id: 19, name: "PEX Compression Fitting", category: "Compression Fittings", code: "CF-PEX-001", image: "/images/products/PexCompression.jpeg" },
    { id: 20, name: "Compression Coupling", category: "Compression Fittings", code: "CF-CC-001", image: "/images/products/CompressionCoupling.jpeg" },
    { id: 21, name: "Compression Elbow", category: "Compression Fittings", code: "CF-CE-001", image: "/images/products/CompressionElbow.jpeg" },
    { id: 22, name: "Compression Tee", category: "Compression Fittings", code: "CF-CT-001", image: "/images/products/CompressionTe.jpeg" },
    
    // Pipes And Fittings
    { id: 23, name: "Cosmoplast Pipe", category: "Pipes And Fittings", code: "PF-CP-001", image: "/images/products/Cosmoplastpipe.jpeg" },
    { id: 24, name: "Wednesbury Pipe", category: "Pipes And Fittings", code: "PF-WB-001", image: "/images/products/WednesburyPipe.jpeg" },
    { id: 25, name: "Terrain Pipe", category: "Pipes And Fittings", code: "PF-TR-001", image: "/images/products/TerrainPipe.jpeg" },
    { id: 26, name: "Hepworth Pipe", category: "Pipes And Fittings", code: "PF-HW-001", image: "/images/products/Hepsworthpipe.jpeg" },
    { id: 27, name: "ATLAS Pipe", category: "Pipes And Fittings", code: "PF-AT-001", image: "/images/products/AtlasPipe.jpeg" },
    { id: 28, name: "Pipe Elbow Fitting", category: "Pipes And Fittings", code: "PF-EL-001", image: "/images/products/PipeElbow.jpeg" },
    { id: 29, name: "Pipe Reducer", category: "Pipes And Fittings", code: "PF-RD-001", image: "/images/products/pipeReducer.jpeg" },
    
    // Plumbing And Drainage Solutions
    { id: 30, name: "McAlpine Waste Fitting", category: "Plumbing And Drainage Solutions", code: "PDS-MC-001", image: "/images/products/McAlpineWaste.jpeg" },
    { id: 31, name: "Multikwik Drainage", category: "Plumbing And Drainage Solutions", code: "PDS-MK-001", image: "/images/products/MultiwikDrainage.jpeg" },
    { id: 32, name: "Floor Drain", category: "Plumbing And Drainage Solutions", code: "PDS-FD-001", image: "/images/products/FLoorDrain.jpeg" },
    { id: 33, name: "Trap Fitting", category: "Plumbing And Drainage Solutions", code: "PDS-TF-001", image: "/images/products/Trap-Fitting.jpeg" },
    { id: 34, name: "Drainage Pipe", category: "Plumbing And Drainage Solutions", code: "PDS-DP-001", image: "/images/products/DrainagePipe.jpeg" },
    
    // CP Sanitary Mixers
    { id: 35, name: "VADO Mixer Tap", category: "CP Sanitary Mixers", code: "CP-VA-001", image: "/images/products/vado-mixer-tap.jpeg" },
    { id: 36, name: "CLEVER Mixer", category: "CP Sanitary Mixers", code: "CP-CL-001", image: "/images/products/clever-mixer-tap.jpeg" },
    { id: 37, name: "PLUMBER Mixer", category: "CP Sanitary Mixers", code: "CP-PL-001", image: "/images/products/plumber-tap.jpeg" },
    { id: 38, name: "Bathroom Mixer Tap", category: "CP Sanitary Mixers", code: "CP-BM-001", image: "/images/products/bathroom-mixer-tap.jpeg" },
    { id: 39, name: "Kitchen Mixer Tap", category: "CP Sanitary Mixers", code: "CP-KM-001", image: "/images/products/kitchen-mixer-tap.jpeg" },
    
    // Kitchen Sinks
    { id: 46, name: "BLANCO Kitchen Sink", category: "Kitchen Sinks", code: "KS-BL-001", image: "/images/products/blankosink.jpeg" },
    { id: 47, name: "NIRALI Kitchen Sink", category: "Kitchen Sinks", code: "KS-NI-001", image: "/images/products/niralisink.jpeg" },
    { id: 48, name: "Stainless Steel Sink", category: "Kitchen Sinks", code: "KS-SS-001", image: "/images/products/stainlesssink.jpeg" },
    
    // Pipe Support Systems
    { id: 51, name: "GLOBE Pipe Support", category: "Pipe Support Systems", code: "PSS-GL-001", image: "/images/products/Globepipesupport.jpeg" },
    { id: 52, name: "TEMBO Seven Star Support", category: "Pipe Support Systems", code: "PSS-TS-001", image: "/images/products/tembosevenstar.avif" },
    { id: 53, name: "Pipe Clamp Support", category: "Pipe Support Systems", code: "PSS-PC-001", image: "/images/products/pipeclamp.jpeg" },
    
    // Adhesives
    { id: 62, name: "STRONGWELD Adhesive", category: "Adhesives", code: "AD-SW-001", image: "/images/products/strongweld-ad.jpeg" },
    { id: 63, name: "TANGIT Adhesive", category: "Adhesives", code: "AD-TA-001", image: "/images/products/Tangit-ad.jpeg" },
    { id: 64, name: "PARABOND Adhesive", category: "Adhesives", code: "AD-PA-001", image: "/images/products/parabound-ad.jpeg" },
    { id: 65, name: "Strong Fix Adhesive", category: "Adhesives", code: "AD-SF-001", image: "/images/products/strongfix-ad.jpeg" },
];

export default Products;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import ProductSkeleton from './ProductSkeleton';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';

const BestSeller = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (remove this in production)
        const loadData = async () => {
            setLoading(true);
            // In a real app, you might be waiting for an API call here
            if (products.length > 0) {
                setTimeout(() => {
                    const bestProducts = products.filter((item) => item.bestseller);
                    setBestSeller(bestProducts.slice(0, 10));
                    setLoading(false);
                }, 1500); // Simulating network delay
            }
        };
        
        loadData();
    }, [products]);

    const handleSeeMore = () => {
        navigate('/collection');
    };

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="h-px w-8 bg-amber-500"></div>
                            <div className="flex items-center">
                                <TrendingUp size={16} className="text-amber-600 mr-2" />
                                <span className="text-sm font-medium tracking-wider text-amber-600">CUSTOMER FAVORITES</span>
                            </div>
                            <div className="h-px w-8 bg-amber-500"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Best Sellers</h2>
                    </div>
                    <p className="max-w-2xl mx-auto text-gray-600 text-base leading-relaxed">
                        Discover our most sought-after timepieces, curated from the finest watchmakers around the world. 
                        Each best-selling piece represents exceptional craftsmanship and timeless design.
                    </p>
                </div>

                

                {/* Products Grid with Loading State */}
                {loading ? (
                    <ProductSkeleton count={5} />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
                        {bestSeller.map((item, index) => (
                            <ProductItem 
                                key={index} 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price} 
                                discount={item.discount || ''} 
                            />
                        ))}
                    </div>
                )}

                {/* See More Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleSeeMore}
                        className="group flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        <span className="font-medium">View All Best Sellers</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BestSeller;
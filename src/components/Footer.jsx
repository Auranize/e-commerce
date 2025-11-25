import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* About Section */}
                <div>
                    <p className="text-3xl font-bold mb-5 text-gray-800">WatchLab</p>
                    <p className="w-full md:w-2/3 text-gray-600">
                        At WatchLab, we are passionate about curating the finest timepieces that blend craftsmanship, innovation, and style.
                        Whether you're a seasoned collector or a first-time buyer, WatchLab brings you a collection that promises unmatched quality and timeless appeal.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <a target='_blank' href="https://tally.so/r/wMP6vA"> Submit Feedback</a>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <p className='text-xl font-medium mb-5'>OUR POLICIES</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><Link to="/payment-policy">Payment Policy</Link></li>
                        <li><Link to="/refund-policy">Refund Policy</Link></li>
                        <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/warranty-policy">Warranty policy</Link></li>
                        <li><Link to="/return-policy">Return policy</Link></li>
                        <li><Link to="/faqs">FAQ</Link></li>
                    </ul>
                </div>  

                {/* Contact Info */}
                <div>
                    <p className="text-xl font-semibold mb-5">Get in Touch (24/7)</p>
                    <ul className="flex flex-col gap-2 text-gray-700">
                        <li>📍 Malappuram, Kerala, India</li>
                        <li>
                            📧 <a>support@watchlab.in </a>
                        </li>
                        <li>
                            📞 <a href="tel:+918075725539" className="hover:underline">+91 8075725539</a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright Section */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 @ <a href="https://watchlab.in" className="font-medium text-gray-800">watchlab.in</a> - All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;

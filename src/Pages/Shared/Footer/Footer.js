import React from 'react';


const Footer = () => {
  return (
      <footer className="bg-gray-800 text-white py-6 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                      <h4 className="text-xl mb-4 font-semibold">GadgetTradeShop</h4>
                      <p className="text-sm">GadgetTradeHub is your one-stop destination for buying and selling high-quality second-hand gadgets.</p>
                  </div>
                  <div>
                      <h4 className="text-xl mb-4 font-semibold">Quick Links</h4>
                      <ul>
                          <li className="mb-2"><a href="/" className="text-sm hover:underline">Home</a></li>
                          <li className="mb-2"><a href="/" className="text-sm hover:underline">Products</a></li>
                          <li className="mb-2"><a href="/" className="text-sm hover:underline">Sell</a></li>
                          <li className="mb-2"><a href="/" className="text-sm hover:underline">About Us</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xl mb-4 font-semibold">Contact</h4>
                      <p className="text-sm">Email: contact@gadgettradehub.com</p>
                      <p className="text-sm">Phone: +1 (123) 456-7890</p>
                  </div>
                  <div>
                      <h4 className="text-xl mb-4 font-semibold">Follow Us</h4>
                      <div className="flex space-x-4">
                          <a href="/" className="text-white hover:text-gray-300 transition duration-300">
                              <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="/" className="text-white hover:text-gray-300 transition duration-300">
                              <i className="fab fa-twitter"></i>
                          </a>
                          <a href="/" className="text-white hover:text-gray-300 transition duration-300">
                              <i className="fab fa-instagram"></i>
                          </a>
                          <a href="/" className="text-white hover:text-gray-300 transition duration-300">
                              <i className="fab fa-linkedin-in"></i>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div className="mt-8 border-t border-gray-700 py-4 text-center">
              <p className="text-sm">&copy; 2023 GadgetTradeHub. All Rights Reserved.</p>
          </div>
      </footer>
  );
};

export default Footer;

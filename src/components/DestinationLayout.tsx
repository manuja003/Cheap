
import React from 'react';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;

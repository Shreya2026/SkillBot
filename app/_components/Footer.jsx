// components/Footer.jsx
"use client"
import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Jahnavi Yelishala. All rights reserved.</p>
        
        <div className="flex gap-4">
          <a
            href="https://github.com/JahnaviYelishala1/ai-course-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

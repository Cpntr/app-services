"use client"

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
  return (
    <footer className="text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="https://github.com/Cpntr" target='_blank' className="text-white hover:text-gray-400 md:text-gray-300 md:hover:text-gray-200">
            <FontAwesomeIcon icon={faGithub} className="mr-2 md:mr-4" />
          </a>
          <a href="https://www.linkedin.com/in/cpntr/" target='_blank' className="text-white hover:text-gray-400 md:text-gray-300 md:hover:text-gray-200">
            <FontAwesomeIcon icon={faLinkedin} className="mr-2 md:mr-4" />
          </a>
        </div>
        <p className="text-sm">&copy; 2023 CP.</p>
      </div>
    </footer>
  );
};



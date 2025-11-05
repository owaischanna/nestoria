"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import { ChevronDown } from "lucide-react"; 

const GOOG_TRANS_COOKIE = 'googtrans';
const langOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' }
]; 

// Define a style ID to ensure we only inject the CSS once
const HIDE_GT_STYLE_ID = 'google-translate-hide-css';


export default function LanguageSwitcher() {
    const [currentLang, setCurrentLang] = useState('en');
    const [isOpen, setIsOpen] = useState(false);

    // Function to hide Google Translate elements by injecting CSS
    const hideGoogleTranslateBar = () => {
        // Only inject the CSS once to avoid redundancy
        if (!document.getElementById(HIDE_GT_STYLE_ID)) {
            const style = document.createElement('style');
            style.id = HIDE_GT_STYLE_ID;
            
            // These selectors target the persistent bar, the language selection frame, and the icon/tooltip
            style.innerHTML = `
                /* Hide the main bar/frame */
                .goog-te-banner-frame { 
                    display: none !important; 
                    height: 0px !important; 
                    visibility: hidden !important; 
                    top: 0px !important;
                }
                
                /* Hide the floating icon/tooltip */
                #goog-gt-tt, 
                .goog-tooltip, 
                .goog-tooltip:hover {
                    display: none !important;
                    visibility: hidden !important;
                }
                
                /* Fix the body displacement caused by the hidden bar */
                body {
                    top: 0px !important;
                }
                
                /* Target the skiptranslate wrapper if it's the root of the bar/icon */
                .skiptranslate {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Use the initial DOM manipulation for immediate effect and fallback
        const elementsToHide = [
            '.goog-te-banner-frame',
            '.goog-te-menu-frame',
            '#goog-gt-tt',
            '.goog-tooltip',
            '.skiptranslate:not(body)', // Exclude body if it has skiptranslate class
        ];
        
        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                // Apply the necessary attributes directly
                element.style.setProperty('display', 'none', 'important');
                element.style.setProperty('visibility', 'hidden', 'important');
                element.style.setProperty('height', '0px', 'important');
                element.style.setProperty('top', '0px', 'important');
            }
        });
        
        // Ensure body top position is fixed (important for fixed navbars)
        document.body.style.setProperty('top', '0px', 'important');
    };

    useEffect(() => {
        // Read the current language from the cookie on mount
        const cookie = Cookies.get(GOOG_TRANS_COOKIE);
        if (cookie) {
            const parts = cookie.split('/');
            if (parts.length === 3 && parts[2]) {
                setCurrentLang(parts[2]);
            }
        }
        
        // Hide Google Translate bar aggressively on mount and after short delays
        hideGoogleTranslateBar();
        // Set a persistent interval to re-hide the elements, in case they are re-created
        const intervalId = setInterval(hideGoogleTranslateBar, 100); 

        return () => {
            clearInterval(intervalId); // Cleanup interval on component unmount
        };
    }, []);

    const getLangName = (code) => {
        return langOptions.find(l => l.code === code)?.name || code.toUpperCase();
    };

    const switchLanguage = (newLangCode) => {
        setIsOpen(false);

        const cookieDomain =
            window.location.hostname === 'localhost'
            ? undefined
            : window.location.hostname.includes('vercel.app')
            ? window.location.hostname // use exact hostname for vercel
            : '.' + window.location.hostname;

        // Remove both possible cookies first (Google sets in both cases)
        Cookies.remove(GOOG_TRANS_COOKIE, { path: '/', domain: cookieDomain });
        Cookies.remove(GOOG_TRANS_COOKIE, { path: '/' }); // fallback

        if (newLangCode !== 'en') {
            Cookies.set(GOOG_TRANS_COOKIE, `/en/${newLangCode}`, {
                path: '/',
                domain: cookieDomain,
                expires: 365,
                sameSite: 'Lax',
            });
        }

        setCurrentLang(newLangCode);
        hideGoogleTranslateBar();

        // Force clear translation from iframe before reload
        const iframe = document.querySelector('.goog-te-menu-frame');
        if (iframe) iframe.remove();

        // Force reload to apply the new translation state
        setTimeout(() => {
            window.location.href = window.location.origin; // ensures clean reload
        }, 200);
    };


    return (
        <div className="relative inline-block text-left z-[60]">
            {/* The actual Google Translate widget container must be here, hidden */}
            <div id="google_translate_element" className="hidden" />

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
            >
                {getLangName(currentLang)}
                <ChevronDown className="-mr-1 ml-2 h-4 w-4" />
            </button>

            {isOpen && (
                <div 
                    className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" 
                >
                    <div className="py-1" role="none">
                        {langOptions.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={(e) => {
                                    e.preventDefault();
                                    switchLanguage(lang.code);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                    currentLang === lang.code 
                                        ? 'bg-green-100 text-green-700 font-semibold' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                role="menuitem"
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
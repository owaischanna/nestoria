// translation.js
import Cookies from 'js-cookie'; // Assuming you used 'js-cookie' or similar

// The required cookie name for Google Translate
const GOOG_TRANS_COOKIE = 'googtrans';

function setLanguageCookie(currentLang, newLang) {
    // Format: /current_lang/new_lang (e.g., /en/es)
    const cookieValue = `/${currentLang}/${newLang}`; 
    
    // Set the cookie which Google Translator reads
    Cookies.set(GOOG_TRANS_COOKIE, cookieValue, { path: '/' }); 
}

function getLanguageCookie() {
    return Cookies.get(GOOG_TRANS_COOKIE);
}

// You would define other helper functions here for reading the current active language
// based on the 'googtrans' cookie value.
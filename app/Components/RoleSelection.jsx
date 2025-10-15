// RoleSelection.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaHome, FaCheck } from "react-icons/fa";
import { useTranslation } from 'next-i18next'; // Import useTranslation

const RoleSelection = ({ onClose }) => {
  const { t } = useTranslation('common'); // Use the 'common' namespace
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();
  // ... (handleRoleSelect and handleContinue logic remains the same)

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-auto overflow-y-auto max-h-[95vh]">
        {/* Header */}
        <div className="p-4 sm:p-8 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
            {t('role_modal_title')} {/* TRANSLATED */}
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            {t('role_modal_subtitle')} {/* TRANSLATED */}
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-6 text-center">
            {t('role_i_am_a')} {/* TRANSLATED */}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Renter Card */}
            <div
              // ... (styling/logic remains the same)
              onClick={() => handleRoleSelect("renter")}
            >
              {/* ... (Icon/Styling remains the same) ... */}

              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{t('role_renter')}</h3> {/* TRANSLATED */}
                <p className="text-gray-600 text-xs sm:text-sm">
                  {t('role_renter_desc')} {/* TRANSLATED */}
                </p>
              </div>

              {/* ... (Features/Perfect For sections would need translation of their lists/tags if desired) ... */}

              <button
                onClick={handleContinue}
                // ... (styling/logic remains the same)
              >
                {t('button_continue_renter')} {/* TRANSLATED */}
              </button>
            </div>

            {/* Host Card */}
            <div
              // ... (styling/logic remains the same)
              onClick={() => handleRoleSelect("host")}
            >
              {/* ... (Icon/Styling remains the same) ... */}

              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{t('role_host')}</h3> {/* TRANSLATED */}
                <p className="text-gray-600 text-xs sm:text-sm">
                  {t('role_host_desc')} {/* TRANSLATED */}
                </p>
              </div>

              {/* ... (Features/Perfect For sections would need translation of their lists/tags if desired) ... */}

              <button
                onClick={handleContinue}
                // ... (styling/logic remains the same)
              >
                {t('button_continue_host')} {/* TRANSLATED */}
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-start items-center mt-6 sm:mt-8">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
            >
              {t('button_back')} {/* TRANSLATED */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
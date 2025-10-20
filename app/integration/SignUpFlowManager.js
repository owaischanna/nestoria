// components/SignUpFlowManager.js
"use client";

import { useState } from "react";
import SignUpForm from "../Components/SignUpForm"; // Assuming you have this component
import PersonalInformationForm from "./PersonalInformationForm";
import RoleSelection from "./RoleSelection";

const SignUpFlowManager = ({ onClose }) => {
    const [step, setStep] = useState("signup"); // 'signup', 'personalInfo', 'roleSelection'
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        country: "",
        state: "",
        zip: "",
        phone: "",
        role: "",
    });

    const handleSignUpSubmit = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep("personalInfo");
    };

    const handlePersonalInfoSubmit = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep("roleSelection");
    };

    // Render the component for the current step
    switch (step) {
        case "signup":
            return <SignUpForm onNext={handleSignUpSubmit} onClose={onClose} />;
        case "personalInfo":
            return (
                <PersonalInformationForm
                    onContinue={handlePersonalInfoSubmit}
                    onClose={onClose}
                />
            );
        case "roleSelection":
            // Pass all the collected data to the final step
            return <RoleSelection userData={formData} onClose={onClose} />;
        default:
            return <SignUpForm onNext={handleSignUpSubmit} onClose={onClose} />;
    }
};

export default SignUpFlowManager;
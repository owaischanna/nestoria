"use client";

import React, { useState, useCallback, useRef } from 'react';
import {
    ChevronRight, ChevronLeft, Upload, CheckCircle, Image as ImageIcon,
    Plus, X, MapPin, DollarSign, Users, Rss, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Helper function to convert a File object to a Base64 string
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const PhotoUploadPlaceholder = ({ label, onFileSelect }) => {
    const fileInputRef = useRef(null);
    return (
        <div
            className="w-32 h-32 border border-gray-300 rounded-lg flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer hover:border-green-600 hover:text-green-600 transition p-2"
            onClick={() => fileInputRef.current.click()}
        >
            <Plus className="w-5 h-5 mb-1" />
            <p className="text-sm font-medium">Add Photo</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onFileSelect}
            />
        </div>
    );
};

const PhotoThumbnail = ({ file, onRemove, isCover }) => (
    <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 group">
        <img
            src={file.preview}
            alt="Uploaded Photo"
            className="w-full h-full object-cover"
        />
        <button
            onClick={onRemove}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition z-10"
        >
            <X className="w-4 h-4" />
        </button>
        {isCover && (
            <span className="absolute bottom-0 left-0 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-tr-lg">Cover</span>
        )}
    </div>
);

const AmenityTag = ({ label, icon: Icon, isIncluded = true }) => (
    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${isIncluded
        ? 'bg-green-50 text-green-700 border border-green-200'
        : 'bg-gray-100 text-gray-500 border border-gray-300 opacity-70'
        }`}>
        {Icon && <Icon className="w-3 h-3" />}
        <span>{label}</span>
    </div>
);

const ToggleButton = ({ name, value, label, isActive, onClick }) => (
    <button
        type="button"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-green-100 text-green-700 border border-green-700' : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
        onClick={onClick}
    >
        {label}
    </button>
);

// --- Step 1 Component (Updated for mobile) ---
const Step1BasicInfo = ({ formData, handleChange }) => {
    const { propertyType, listingTitle, description, address, roomSize, maxOccupancy, bathroomType, furnishingStatus } = formData;
    const commonAmenities = ['5min to Subway', 'Near Institution', 'Shopping Nearby', 'Great Food'];

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type*</label>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                    {['Private Room', 'Shared Room'].map(type => (
                        <ToggleButton key={type} label={type} isActive={propertyType === type} onClick={() => handleChange('propertyType', type)} />
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Listing Title *</label>
                    <input type="text" name="listingTitle" value={listingTitle} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea name="description" value={description} onChange={(e) => handleChange(e.target.name, e.target.value)} rows="4" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input type="text" name="address" value={address} onChange={(e) => handleChange(e.target.name, e.target.value)} placeholder="Address" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mb-2" />
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <input type="text" name="state" placeholder="State" onChange={(e) => handleChange(e.target.name, e.target.value)} className="sm:col-span-1 border border-gray-300 rounded-lg p-2.5 text-sm" />
                    <input type="text" name="town" placeholder="Town" onChange={(e) => handleChange(e.target.name, e.target.value)} className="sm:col-span-2 border border-gray-300 rounded-lg p-2.5 text-sm" />
                    <input type="text" name="zip" placeholder="Zip Code" onChange={(e) => handleChange(e.target.name, e.target.value)} className="sm:col-span-1 border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood Highlights</label>
                <div className="flex flex-wrap gap-2">
                    {commonAmenities.map(amenity => (
                        <ToggleButton key={amenity} label={amenity} isActive={true} onClick={() => { }} />
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Room Size (sq ft)</label><input type="number" name="roomSize" value={roomSize} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Max Occupancy</label><select name="maxOccupancy" value={maxOccupancy} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"><option>1 person</option><option>2 persons</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Bathroom Type</label><div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0"><ToggleButton label="Private" isActive={bathroomType === 'Private'} onClick={() => handleChange('bathroomType', 'Private')} /><ToggleButton label="Shared" isActive={bathroomType === 'Shared'} onClick={() => handleChange('bathroomType', 'Shared')} /></div></div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Status</label>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                    {['Fully Furnished', 'Partially Furnished', 'Unfurnished'].map(status => (
                        <ToggleButton key={status} label={status} isActive={furnishingStatus === status} onClick={() => handleChange('furnishingStatus', status)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Step 2 Component (Updated for mobile) ---
const Step2AddPhotos = ({ formData, handleChange }) => {
    const photos = formData.photos || { cover: null, room: [], common: [] };
    const coverInputRef = useRef(null);
    const roomInputRef = useRef(null);
    const commonInputRef = useRef(null);

    const handleFileSelect = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;
        file.preview = URL.createObjectURL(file);
        let newPhotos = { ...photos };
        if (type === 'cover') {
            if (photos.cover) URL.revokeObjectURL(photos.cover.preview);
            newPhotos.cover = file;
        } else if (type === 'room') {
            newPhotos.room = [...photos.room, file];
        } else if (type === 'common') {
            newPhotos.common = [...photos.common, file];
        }
        handleChange('photos', newPhotos);
        event.target.value = null;
    };

    const handleRemove = (type, fileToRemove) => {
        let newPhotos = { ...photos };
        URL.revokeObjectURL(fileToRemove.preview);
        if (type === 'cover') {
            newPhotos.cover = null;
        } else {
            newPhotos[type] = newPhotos[type].filter(file => file !== fileToRemove);
        }
        handleChange('photos', newPhotos);
    };

    const totalUploaded = (photos.cover ? 1 : 0) + photos.room.length + photos.common.length;
    const displayRoomPhotos = photos.room;
    const roomPhotosCount = photos.room.length;
    const commonPhotosCount = photos.common.length;

    return (
        <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg space-y-2">
                <div className="flex items-center space-x-2 font-semibold"><ImageIcon className="w-5 h-5 text-blue-600" /><span>Photo Guidelines</span></div>
                <ul className="text-sm list-disc pl-5 space-y-1 text-gray-700">
                    <li>Upload at least 5 high-quality photos (minimum 1920x1080px)</li>
                    <li>Include photos of the room, common areas, and exterior</li>
                    <li>Ensure good lighting and clean spaces for best results</li>
                    <li>The first photo will be your cover image</li>
                </ul>
            </div>

            <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">Cover Photo</h3>
                    <span className="text-sm font-medium text-red-600">Required</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">This will be the main photo potential renters see first</p>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-10 flex flex-col items-center justify-center text-center relative">
                        {photos.cover ? (
                            <div className="w-full h-48 relative">
                                <img src={photos.cover.preview} alt="Cover" className="w-full h-full object-contain rounded-lg" />
                                <button onClick={() => handleRemove('cover', photos.cover)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><X className="w-4 h-4" /></button>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-gray-400 mb-3" />
                                <p className="text-sm font-medium text-gray-700">Drag & drop your cover photo here</p>
                                <p className="text-xs text-gray-500 mb-4">or click to browse</p>

                                <button type="button" onClick={() => coverInputRef.current.click()} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                                    <Upload className="w-4 h-4" /><span>Choose Cover Photo</span>
                                </button>

                                <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP (max 10MB)</p>
                                <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'cover')} />
                            </>
                        )}
                    </div>

                    <div className="w-full lg:w-60 flex-shrink-0 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-semibold mb-2 text-gray-700">Cover Photo Tips:</h4>
                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                            <li>Show the room's best angle</li>
                            <li>Good natural lighting</li>
                            <li>Clean and organized space</li>
                            <li>Wide-angle view preferred</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Photos</h3>
                <p className="text-sm text-gray-500 mb-4">Add more photos to showcase different areas and angles</p>
                <p className="text-sm font-medium text-right text-gray-600 mb-4">{totalUploaded} of 20 photos uploaded</p>

                <h4 className="text-md font-semibold text-gray-700 mb-3">Room Photos ({roomPhotosCount})</h4>
                <div className="flex flex-wrap gap-4">
                    {displayRoomPhotos.map((file, i) => (
                        <PhotoThumbnail key={`room-${i}`} file={file} onRemove={() => handleRemove('room', file)} />
                    ))}
                    <PhotoUploadPlaceholder label="Room Detail" onFileSelect={(e) => handleFileSelect(e, 'room')} />
                </div>

                <h4 className="text-md font-semibold text-gray-700 mt-8 mb-3">Common Areas ({commonPhotosCount})</h4>
                <div className="flex flex-wrap gap-4">
                    {photos.common.map((file, i) => (
                        <PhotoThumbnail key={`common-${i}`} file={file} onRemove={() => handleRemove('common', file)} />
                    ))}
                    <PhotoUploadPlaceholder label="Kitchen" onFileSelect={(e) => handleFileSelect(e, 'common')} />
                </div>
            </div>
        </div>
    );
};

// --- Step 3 Component (Updated for mobile) ---
const Step3PricingAndAvailability = ({ formData, handleChange }) => {
    const { monthlyRent, utilities, securityDeposit, cleaningFee, houseRules, minDuration, maxDuration, monthToMonth } = formData;

    const UtilityButton = ({ label, isIncluded, onClick }) => (
        <button
            type="button"
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition ${isIncluded
                ? 'bg-green-100 text-green-700 border border-green-700'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
            onClick={onClick}
        >
            {isIncluded && <CheckCircle className="w-4 h-4" />}
            <span>{label}</span>
        </button>
    );

    const handleUtilityToggle = (utility) => {
        const newUtilities = utilities.includes(utility)
            ? utilities.filter(u => u !== utility)
            : [...utilities, utility];
        handleChange('utilities', newUtilities);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <label htmlFor="monthlyRent" className="block text-lg font-semibold text-gray-800 mb-2">Monthly Rent *</label>
                    <p className="text-sm text-gray-500 mb-2">Base Monthly Rent</p>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-lg text-gray-600">€</span>
                        <input type="number" id="monthlyRent" name="monthlyRent" value={monthlyRent} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 pl-8 text-lg font-bold" placeholder="750" />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Utilities & Additional Fees</h3>
                    <label className="block text-sm font-medium text-gray-700 mb-3">What's included in the rent?</label>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['Electricity', 'Water', 'Internet/WiFi', 'Heat', 'Gas', 'Cable TV'].map(util => (
                            <UtilityButton key={util} label={util} isIncluded={utilities.includes(util)} onClick={() => handleUtilityToggle(util)} />
                        ))}
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Add utilities/amenities not stated above</label>
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-6">
                        <input type="text" placeholder="e.g. Kitchen Supplies" className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm" />
                        <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">Add</button>
                    </div>

                    <h4 className="text-md font-medium text-gray-800 mb-3">Additional Fees (Optional)</h4>
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-3 rounded-lg border border-gray-200 gap-2">
                            <span className="text-sm font-medium text-gray-700">Security Deposit</span>
                            <div className="relative">
                                <span className="absolute left-2 top-1.5 text-sm text-gray-500">€</span>
                                <input type="number" name="securityDeposit" value={securityDeposit} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-24 border border-gray-300 rounded-lg p-1.5 pl-6 text-sm text-right" />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-3 rounded-lg border border-gray-200 gap-2">
                            <span className="text-sm font-medium text-gray-700">One-time Cleaning Fee</span>
                            <div className="relative">
                                <span className="absolute left-2 top-1.5 text-sm text-gray-500">€</span>
                                <input type="number" name="cleaningFee" value={cleaningFee} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-24 border border-gray-300 rounded-lg p-1.5 pl-6 text-sm text-right" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">House Rules</h3>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State the Do's and Don'ts of your apartment (Max 200 characters)</label>
                    <textarea name="houseRules" value={houseRules} onChange={(e) => handleChange(e.target.name, e.target.value)} rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" placeholder="Quiet hours: 10 PM - 8 AM" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Lease Terms</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stay Duration</label>
                            <select name="minDuration" value={minDuration} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"><option>3 months</option><option>6 months</option></select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Stay Duration</label>
                            <select name="maxDuration" value={maxDuration} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"><option>12 months</option><option>Indefinite</option></select>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <ToggleButton label="Month-to-Month Available" isActive={monthToMonth} onClick={() => handleChange('monthToMonth', !monthToMonth)} />
                        <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 cursor-not-allowed">
                            Early Termination Fee
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 lg:sticky lg:top-0">
                    <h4 className="font-bold text-gray-800 mb-4">Availability *</h4>
                    <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-2">Available Move-in Date</label>
                    <input type="date" id="moveInDate" name="moveInDate" value={formData.moveInDate} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>
            </div>
        </div>
    );
};

// --- Step 4 Component (Updated for mobile) ---
const Step4ReviewAndPublish = ({ formData }) => {
    const {
        listingTitle, description, address, propertyType, bathroomType, roomSize,
        monthlyRent, utilities, securityDeposit, cleaningFee, photos
    } = formData;

    const allPhotos = [
        photos.cover,
        ...photos.room,
        ...photos.common
    ].filter(Boolean);

    const totalPhotos = allPhotos.length;
    const isReady = totalPhotos >= 5 && monthlyRent && listingTitle;

    const amenityMapping = [
        { label: 'WiFi', icon: Rss, included: utilities.includes('Internet/WiFi') },
        { label: 'Kitchen Access', icon: CheckCircle, included: true },
        { label: 'Parking', icon: CheckCircle, included: true },
        { label: 'Laundry', icon: CheckCircle, included: true },
        { label: 'Pet Friendly', icon: CheckCircle, included: true },
    ];


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Listing Preview</h3>

                <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <div className="h-64 sm:h-96 w-full">
                        <img
                            src={allPhotos[0]?.preview || 'https://via.placeholder.com/800x400?text=Listing+Cover+Photo'}
                            alt="Listing Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute top-4 right-4 space-y-2">
                        {allPhotos.slice(1, 4).map((file, index) => (
                            <div key={index} className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-500 rounded-lg overflow-hidden border-2 border-white">
                                <img src={file.preview} alt={`Thumb ${index + 2}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        {totalPhotos > 4 && (
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 text-white rounded-lg flex items-center justify-center text-xs font-semibold">
                                +{totalPhotos - 4}
                            </div>
                        )}
                    </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{listingTitle}</h2>
                <p className="flex items-center text-gray-500 text-sm"><MapPin className="w-4 h-4 mr-1" /> {address}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-green-700">€{monthlyRent} <span className="text-sm font-normal text-gray-500">per month</span></span>
                    <div className="flex flex-wrap text-sm gap-3 text-gray-600">
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {propertyType}</span>
                        <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> {bathroomType} Bath</span>
                        <span className="flex items-center"><span className="font-bold">{roomSize}</span> sqft</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700 text-sm">{description}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                        {amenityMapping.map(amenity => (
                            <AmenityTag key={amenity.label} label={amenity.label} icon={amenity.icon} isIncluded={amenity.included} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-800">Review Checklist</h4>
                    </div>

                    <ul className="space-y-3 text-sm">
                        <li className="font-semibold text-gray-900">Basic Information</li>
                        <li className={`flex items-center space-x-2 ${listingTitle ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle className="w-4 h-4" /> <span>Property title and description</span></li>
                        <li className={`flex items-center space-x-2 ${address ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle className="w-4 h-4" /> <span>Complete address and location</span></li>

                        <li className="font-semibold text-gray-900 pt-3">Photos</li>
                        <li className={`flex items-center space-x-2 ${photos.cover ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle className="w-4 h-4" /> <span>Cover photo uploaded</span></li>
                        <li className={`flex items-center space-x-2 ${totalPhotos >= 5 ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle className="w-4 h-4" /> <span>At least 5 photos added</span></li>

                        <li className="font-semibold text-gray-900 pt-3">Pricing & Availability</li>
                        <li className={`flex items-center space-x-2 ${monthlyRent ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle className="w-4 h-4" /> <span>Monthly rent set</span></li>
                        <li className={`flex items-center space-x-2 ${formData.moveInDate ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle className="w-4 h-4" /> <span>Availability dates confirmed</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- Main Form Container (Updated for mobile) ---
const AddListingFormContainer = ({ onCancel, onSuccess }) => {

    const initialPhotos = {
        cover: null,
        room: [],
        common: [],
    };

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        propertyType: 'Private Room',
        listingTitle: '',
        description: '',
        address: '',
        state: '',
        town: '',
        zip: '',
        roomSize: 120,
        maxOccupancy: '1 person',
        bathroomType: 'Shared',
        furnishingStatus: 'Fully Furnished',
        photos: initialPhotos,
        monthlyRent: 750,
        utilities: ['Electricity', 'Water', 'Internet/WiFi'],
        securityDeposit: 750,
        cleaningFee: 50,
        houseRules: '',
        minDuration: '3 months',
        maxDuration: '12 months',
        monthToMonth: true,
        moveInDate: '2024-09-01',
    });
    const totalSteps = 4;

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePublish = async () => {
        setIsSubmitting(true);
        const loadingToastId = toast.loading('Publishing your listing...');

        // 1. Validation
        if (!formData.listingTitle || !formData.monthlyRent || !formData.photos.cover || !formData.address) {
            toast.error('Please fill in required fields: Title, Address, Rent, and Cover Photo.', { id: loadingToastId });
            setIsSubmitting(false);
            setStep(1); // Send user back to the first step
            return;
        }
        if (formData.photos.room.length + formData.photos.common.length < 4) {
            toast.error('Please upload at least 5 photos (1 cover + 4 additional).', { id: loadingToastId });
            setIsSubmitting(false);
            setStep(2); // Send user to photo step
            return;
        }

        try {
            // 2. Prepare Payload (Convert Files to Base64)
            const photosPayload = {
                cover: null,
                room: [],
                common: []
            };

            photosPayload.cover = await fileToBase64(formData.photos.cover);
            photosPayload.room = await Promise.all(formData.photos.room.map(file => fileToBase64(file)));
            photosPayload.common = await Promise.all(formData.photos.common.map(file => fileToBase64(file)));

            const submissionData = {
                ...formData,
                photos: photosPayload
            };

            // 3. API Call
            const response = await fetch('/api/listings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create listing.');
            }

            // 4. Success
            toast.success('Listing published successfully!', { id: loadingToastId });
            setIsSubmitting(false);

            if (onSuccess) {
                onSuccess(); // Tell the parent component we are done
            } else {
                // Fallback if onSuccess is not provided (optional)
                router.push('/hostdashboard');
            }

        } catch (error) {
            // 5. Error
            toast.error(`Error: ${error.message}`, { id: loadingToastId });
            setIsSubmitting(false);
        }
    };

    const getStepTitle = () => {
        switch (step) {
            case 1: return "Basic Information";
            case 2: return "Add Photos to Your Listing";
            case 3: return "Set Your Pricing & Availability";
            case 4: return "Review & Publish Your Listing";
            default: return "Add New Listing";
        }
    }

    const StepTracker = () => (
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            {[...Array(totalSteps)].map((_, index) => {
                const stepNum = index + 1;
                const isCurrent = stepNum === step;
                const isComplete = stepNum < step;

                return (
                    <div key={stepNum} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition duration-300 ${isCurrent ? 'bg-green-600' : isComplete ? 'bg-green-600' : 'bg-gray-300'
                            }`}>
                            {isComplete ? <CheckCircle className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className={`ml-2 text-sm ${isCurrent ? 'font-semibold text-green-700' : 'text-gray-500'}`}>
                            Step {stepNum} of {totalSteps}
                        </span>
                        {stepNum < totalSteps && <ChevronRight className="w-4 h-4 ml-4 text-gray-400 hidden sm:block" />}
                    </div>
                );
            })}
        </div>
    );

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <Step1BasicInfo formData={formData} handleChange={handleChange} />;
            case 2:
                return <Step2AddPhotos formData={formData} handleChange={handleChange} />;
            case 3:
                return <Step3PricingAndAvailability formData={formData} handleChange={handleChange} />;
            case 4:
                return <Step4ReviewAndPublish formData={formData} />;
            default:
                return <div>Error loading form step.</div>;
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Add New Listing - {getStepTitle()}</h1>
                    <StepTracker />
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                    <button
                        onClick={() => setStep(step > 1 ? step - 1 : 1)}
                        disabled={isSubmitting}
                        className="flex items-center space-x-1 text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed justify-center"
                    >
                        <ChevronLeft className='w-4 h-4' /> Back
                    </button>

                    <button
                        onClick={step < totalSteps ? () => setStep(step + 1) : handlePublish}
                        disabled={isSubmitting}
                        className={`flex items-center space-x-1 text-sm font-semibold text-white px-4 py-2 rounded transition ${step === totalSteps ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'
                            } disabled:bg-gray-400 disabled:cursor-not-allowed justify-center`}
                    >
                        {step === totalSteps
                            ? (isSubmitting ? 'Publishing...' : 'Publish Listing')
                            : 'Continue'}
                        {step !== totalSteps && <ChevronRight className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-md">
                {renderStepContent()}
            </div>
        </div>
    );
};

export default AddListingFormContainer;
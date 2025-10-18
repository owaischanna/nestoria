// MyApplicationsPage.jsx
import React from 'react';
import { 
    FileText, ChevronDown, CheckCircle, Clock 
} from 'lucide-react';

import DashboardLayout from './dashboardLayout';


// --- DATA MOCKUP ---
const applications = [
    {
        id: 1,
        status: 'Pending',
        title: 'Cozy Room Near NYU Campus',
        location: 'Greenwich Village, Manhattan',
        price: 750,
        available: 'Sep 1, 2024',
        type: 'Private Room',
        details: 'Shared',
        size: '120 sqft',
        image: 'data:image/jpeg;base64,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',
        timeline: [
            { stage: 'Application Submitted', date: 'August 15, 2024 at 2:30 PM', icon: CheckCircle, color: 'text-green-500' },
            { stage: 'Under Review by Host', info: 'Expected response within 2-3 business days', icon: Clock, color: 'text-yellow-500' },
            { stage: 'Host Decision Pending', info: 'Waiting for host response', icon: Clock, color: 'text-gray-400' },
        ]
    },
    {
        id: 2,
        status: 'Approved',
        title: 'Modern Studio in Brooklyn',
        location: 'Williamsburg, Brooklyn',
        price: 950,
        available: 'Sep 15, 2024',
        type: 'Studio',
        details: 'Private',
        size: '400 sqft',
        image: 'data:image/jpeg;base64,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',
        timeline: [
            { stage: 'Application Submitted', date: 'August 10, 2024 at 10:15 AM', icon: CheckCircle, color: 'text-green-500' },
            { stage: 'Application Deadline', date: 'August 10, 2025 at 10:15 AM', icon: CheckCircle, color: 'text-green-500' },
        ]
    },
];

// --- SUB-COMPONENT ---
const ApplicationCard = ({ application }) => {
    const isPending = application.status === 'Pending';
    const isApproved = application.status === 'Approved';

    return (
        <div className="border border-gray-200 rounded-xl p-6 mb-6 bg-white shadow-sm">
            <div className="flex space-x-6">
                
                {/* Image */}
                <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden">
                    <img 
                        src={application.image} 
                        alt={application.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Details and Timeline */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{application.title}</h3>
                            <p className="text-sm text-gray-500">{application.location}</p>
                            <p className="text-xl font-bold text-green-700 mt-1">${application.price}<span className="text-sm font-normal text-gray-600">/month</span></p>
                            <p className="text-xs text-gray-400 mt-1">Available Sep 1, 2024</p>
                        </div>
                        
                        {/* Status Tag */}
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            isPending ? 'bg-yellow-100 text-yellow-700' :
                            isApproved ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {application.status}
                        </span>
                    </div>

                    {/* Timeline */}
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Application Timeline</h4>
                        {application.timeline.map((item, index) => (
                            <div key={index} className="flex items-start mb-2 relative">
                                {index < application.timeline.length - 1 && (
                                    <div className="absolute top-4 left-[9px] w-px h-full bg-gray-300 z-0" />
                                )}
                                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 mr-3 z-10 ${item.color.replace('text-', 'bg-')}`} />
                                <div className="text-sm">
                                    <p className={`font-medium ${item.color}`}>{item.stage}</p>
                                    {item.date && <p className="text-xs text-gray-500">{item.date}</p>}
                                    {item.info && <p className="text-xs text-gray-500">{item.info}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end justify-between w-64 min-w-[150px]">
                    <div className="text-right space-y-1 mb-4 pt-2">
                        <div className="flex items-center justify-end text-sm text-gray-600">
                            <span className="font-medium mr-1">{application.type}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                            <span className="font-medium mr-1">{application.details}</span>
                        </div>
                        <div className="text-sm text-gray-500">{application.size}</div>
                        {isApproved && (
                             <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700`}>
                                APPROVED
                            </span>
                        )}
                    </div>
                    
                    <div className="space-y-2 w-full">
                        <button className="w-full text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 py-2 rounded-lg transition">
                            View Listing
                        </button>
                        {isPending && (
                            <>
                                <button className="w-full text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 py-2 rounded-lg transition">
                                    Message Host
                                </button>
                                <button className="w-full text-sm font-medium text-red-600 hover:text-red-700 py-1 transition">
                                    Withdraw
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- MAIN PAGE ---
const MyApplicationsPage = () => {
    const totalApplied = applications.length;
    const pending = applications.filter(a => a.status === 'Pending').length;
    const approved = applications.filter(a => a.status === 'Approved').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;

    return (
        <DashboardLayout>
            <div className="flex min-h-screen bg-gray-50">
                
       

                {/* Main Content Area */}
                <div className="flex-1 p-8">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                            <p className="text-gray-600">Track and manage your housing applications</p>
                        </div>
                        <button className="flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition">
                            <FileText className="w-4 h-4 mr-2" />
                            Application Tips
                        </button>
                    </div>

                    {/* Application Summary */}
                    <div className="mb-8">
                        <div className="flex space-x-6 border-b border-gray-200 pb-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900">{totalApplied}</p>
                                <p className="text-sm text-gray-500">Total Applied</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-yellow-600">{pending}</p>
                                <p className="text-sm text-gray-500">Pending</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-600">{approved}</p>
                                <p className="text-sm text-gray-500">Approved</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-red-600">{rejected}</p>
                                <p className="text-sm text-gray-500">Rejected</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-4">
                            <div className="flex items-center text-sm text-gray-600 border border-gray-300 px-3 py-1.5 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
                                All Status
                                <ChevronDown className="w-4 h-4 ml-1.5" />
                            </div>
                            <div className="flex items-center text-sm text-gray-600 border border-gray-300 px-3 py-1.5 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
                                Last 30 days
                                <ChevronDown className="w-4 h-4 ml-1.5" />
                            </div>
                        </div>
                    </div>

                    {/* Active Applications List */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Active Applications ({totalApplied})
                    </h2>
                    
                    {applications.map(app => (
                        <ApplicationCard key={app.id} application={app} />
                    ))}

                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyApplicationsPage;

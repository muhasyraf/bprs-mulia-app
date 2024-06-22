import React from "react";

const StatusBadge = ({ status }) => {
    switch (status) {
        case "pending":
            return (
                <div className="tail-bg-yellow-200 tail-text-yellow-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                    Pending
                </div>
            );
        case "approved":
            return (
                <div className="tail-bg-green-200 tail-text-green-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                    Approved
                </div>
            );
        case "rejected":
            return (
                <div className="tail-bg-red-200 tail-text-red-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                    Rejected
                </div>
            );
        default:
            return (
                <div className="tail-bg-gray-200 tail-text-gray-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                    Unknown
                </div>
            );
    }
};

export default StatusBadge;

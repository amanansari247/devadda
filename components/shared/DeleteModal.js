
import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white p-8 rounded-lg z-50">
                <h2 className="text-xl font-bold mb-4">Are you sure you want to delete?</h2>
                <div className="flex justify-end">
                    <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>
                        Yes, delete
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

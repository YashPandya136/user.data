import React from "react";

const MobileViewTable = ({ users }) => {

  return (
    <>
      {users?.payload && Array.isArray(users.payload) && users.payload.map((user) => (
        <div key={user?.id || Math.random()} className="bg-white mb-4 rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                user.isActive === true
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
             {user.isActive === true ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-4">Mobile:</span>
              <span className="text-gray-900">{user.mobileNo}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-4">Address:</span>
              <span className="text-gray-900">{user.address}</span>
            </div>
          </div>
          {/* <div className="mt-4 flex justify-end space-x-3">
            <button
              className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
              title="Edit"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div> */}
        </div>
      ))}
    </>
  );
};

export default MobileViewTable;

'use client';

import React from 'react';

const DashboardStep: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg p-6 border border-purple-500/30">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="ml-3 text-xl font-bold text-white">You're all set!</h3>
        </div>
        <p className="text-gray-300">
          Your community is now ready to launch. You can always make changes to your settings later.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Community Summary</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Community Name</p>
            <p className="text-white font-medium">My Awesome Community</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Privacy</p>
            <p className="text-white font-medium">Private</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Members</p>
            <p className="text-white font-medium">0 invited</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Admin</p>
            <p className="text-white font-medium">You</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Next Steps</h4>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-purple-600/20 border border-purple-600/50 flex items-center justify-center text-sm text-white mr-3 mt-0.5">
              1
            </div>
            <div>
              <p className="text-white font-medium">Customize your community</p>
              <p className="text-sm text-gray-400">Add a banner, customize colors, and set up your landing page</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-purple-600/20 border border-purple-600/50 flex items-center justify-center text-sm text-white mr-3 mt-0.5">
              2
            </div>
            <div>
              <p className="text-white font-medium">Create your first post</p>
              <p className="text-sm text-gray-400">Welcome your members with an introduction post</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-purple-600/20 border border-purple-600/50 flex items-center justify-center text-sm text-white mr-3 mt-0.5">
              3
            </div>
            <div>
              <p className="text-white font-medium">Invite more members</p>
              <p className="text-sm text-gray-400">Grow your community by inviting more people</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStep;

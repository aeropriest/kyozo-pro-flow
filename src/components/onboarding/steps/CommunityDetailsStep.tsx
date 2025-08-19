'use client';

import React, { useState } from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, label, type, placeholder, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
      />
    </div>
  );
};

const CommunityDetailsStep: React.FC = () => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [communityType, setCommunityType] = useState('public');

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          
          <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 shadow-lg hover:bg-purple-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-400">Upload a community logo</p>
      </div>

      <form className="space-y-6">
        <Input 
          id="communityName" 
          label="Community Name" 
          type="text" 
          placeholder="My Awesome Community" 
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
        />
        
        <div className="space-y-2">
          <label htmlFor="communityDescription" className="block text-sm font-medium text-gray-200">
            Community Description
          </label>
          <textarea
            id="communityDescription"
            rows={3}
            placeholder="Describe what your community is about..."
            value={communityDescription}
            onChange={(e) => setCommunityDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Community Type
          </label>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <input
                id="public"
                name="communityType"
                type="radio"
                checked={communityType === 'public'}
                onChange={() => setCommunityType('public')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
              />
              <label htmlFor="public" className="ml-3">
                <span className="block text-sm font-medium text-white">Public</span>
                <span className="block text-sm text-gray-400">Anyone can view, join, and participate</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="private"
                name="communityType"
                type="radio"
                checked={communityType === 'private'}
                onChange={() => setCommunityType('private')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
              />
              <label htmlFor="private" className="ml-3">
                <span className="block text-sm font-medium text-white">Private</span>
                <span className="block text-sm text-gray-400">Only members can view and participate</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="invite-only"
                name="communityType"
                type="radio"
                checked={communityType === 'invite-only'}
                onChange={() => setCommunityType('invite-only')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
              />
              <label htmlFor="invite-only" className="ml-3">
                <span className="block text-sm font-medium text-white">Invite Only</span>
                <span className="block text-sm text-gray-400">Members can join by invitation only</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommunityDetailsStep;

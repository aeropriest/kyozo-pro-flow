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

const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt="Profile avatar" 
              className="w-full h-full rounded-full object-cover border-2 border-purple-500"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 shadow-lg hover:bg-purple-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-400">Upload a profile picture</p>
      </div>

      <form className="space-y-6">
        <Input 
          id="name" 
          label="Full Name" 
          type="text" 
          placeholder="John Doe" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-200">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {['Technology', 'Design', 'Business', 'Marketing', 'Education'].map((interest) => (
              <button
                key={interest}
                type="button"
                className="px-4 py-2 bg-gray-800/70 hover:bg-purple-600/70 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white transition-colors"
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

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

const AddMembersStep: React.FC = () => {
  const [emails, setEmails] = useState('');
  const [importMethod, setImportMethod] = useState('manual');
  const [inviteMessage, setInviteMessage] = useState('');

  return (
    <div className="w-full space-y-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setImportMethod('manual')}
          className={`px-4 py-2 rounded-lg transition-colors ${importMethod === 'manual' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white bg-gray-800/50'}`}
        >
          Manual
        </button>
        <button
          onClick={() => setImportMethod('csv')}
          className={`px-4 py-2 rounded-lg transition-colors ${importMethod === 'csv' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white bg-gray-800/50'}`}
        >
          CSV Import
        </button>
        <button
          onClick={() => setImportMethod('eventbrite')}
          className={`px-4 py-2 rounded-lg transition-colors ${importMethod === 'eventbrite' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white bg-gray-800/50'}`}
        >
          Eventbrite
        </button>
      </div>

      {importMethod === 'manual' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="emails" className="block text-sm font-medium text-gray-200">
              Email Addresses
            </label>
            <textarea
              id="emails"
              rows={4}
              placeholder="Enter email addresses, one per line"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
            />
            <p className="text-xs text-gray-400">Separate multiple email addresses with a new line</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="inviteMessage" className="block text-sm font-medium text-gray-200">
              Invitation Message
            </label>
            <textarea
              id="inviteMessage"
              rows={3}
              placeholder="Add a personal message to your invitation..."
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>
      )}

      {importMethod === 'csv' && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-400">
              Drag and drop your CSV file here, or
              <button className="text-purple-400 hover:text-purple-300 ml-1">
                browse
              </button>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              CSV file should include columns for name and email
            </p>
          </div>
          
          <div className="flex items-center">
            <input
              id="send-invites"
              name="send-invites"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
            />
            <label htmlFor="send-invites" className="ml-2 block text-sm text-gray-300">
              Send invitation emails automatically
            </label>
          </div>
        </div>
      )}

      {importMethod === 'eventbrite' && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-800/70 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-300 mb-4">
              Connect your Eventbrite account to import attendees from your events.
            </p>
            <button className="w-full bg-[#f05537] hover:bg-[#d9472d] text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Connect Eventbrite
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Select Event
            </label>
            <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white">
              <option value="" disabled selected>Select an event</option>
              <option value="event1">Connect to Eventbrite first</option>
            </select>
          </div>
        </div>
      )}
      
      <div className="pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span className="font-medium">0</span> members will be invited
          </div>
          <button className="text-purple-400 hover:text-purple-300 text-sm">
            Preview List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersStep;

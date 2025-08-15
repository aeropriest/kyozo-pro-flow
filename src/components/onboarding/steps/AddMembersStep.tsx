'use client';

import React, { useState } from 'react';
import styles from './Steps.module.scss';
import { IoMdAdd, IoMdClose } from 'react-icons/io';

interface Member {
  email: string;
  role: 'admin' | 'moderator' | 'member';
}

const AddMembersStep: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'moderator' | 'member'>('member');
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = () => {
    if (email.trim() && !members.some(member => member.email === email.trim())) {
      setMembers([...members, { email: email.trim(), role }]);
      setEmail('');
    }
  };

  const handleRemoveMember = (emailToRemove: string) => {
    setMembers(members.filter(member => member.email !== emailToRemove));
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formContainer}>
        <div className={styles.addMemberForm}>
          <div className={styles.formGroup}>
            <label htmlFor="member-email">Email Address</label>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="member-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'moderator' | 'member')}
                className={styles.roleSelect}
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>
              <button 
                className={styles.addButton}
                onClick={handleAddMember}
                disabled={!email.trim()}
              >
                <IoMdAdd size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.membersList}>
          <h3>Invited Members</h3>
          {members.length === 0 ? (
            <p className={styles.emptyState}>No members added yet</p>
          ) : (
            <ul>
              {members.map((member, index) => (
                <li key={index} className={styles.memberItem}>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberEmail}>{member.email}</span>
                    <span className={styles.memberRole}>{member.role}</span>
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => handleRemoveMember(member.email)}
                  >
                    <IoMdClose size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className={styles.bulkInvite}>
          <p>Or invite members in bulk:</p>
          <button className={styles.uploadButton}>
            Upload CSV File
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersStep;

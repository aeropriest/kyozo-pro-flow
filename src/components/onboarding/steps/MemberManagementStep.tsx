'use client';

import React, { useState } from 'react';
import styles from './Steps.module.scss';
import { IoMdMore } from 'react-icons/io';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending' | 'inactive';
}

const MemberManagementStep: React.FC = () => {
  // Mock data for demonstration
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'member', status: 'pending' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'member', status: 'active' },
  ]);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const updateMemberRole = (id: string, newRole: 'admin' | 'moderator' | 'member') => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, role: newRole } : member
    ));
    setActiveDropdown(null);
  };

  const updateMemberStatus = (id: string, newStatus: 'active' | 'pending' | 'inactive') => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, status: newStatus } : member
    ));
    setActiveDropdown(null);
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.tableContainer}>
        <table className={styles.membersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[member.role]}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[member.status]}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className={styles.actionsDropdown}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => toggleDropdown(member.id)}
                    >
                      <IoMdMore size={20} />
                    </button>
                    {activeDropdown === member.id && (
                      <div className={styles.dropdownMenu}>
                        <div className={styles.dropdownSection}>
                          <span className={styles.dropdownLabel}>Change Role</span>
                          <button onClick={() => updateMemberRole(member.id, 'admin')}>Admin</button>
                          <button onClick={() => updateMemberRole(member.id, 'moderator')}>Moderator</button>
                          <button onClick={() => updateMemberRole(member.id, 'member')}>Member</button>
                        </div>
                        <div className={styles.dropdownDivider}></div>
                        <div className={styles.dropdownSection}>
                          <span className={styles.dropdownLabel}>Change Status</span>
                          <button onClick={() => updateMemberStatus(member.id, 'active')}>Activate</button>
                          <button onClick={() => updateMemberStatus(member.id, 'inactive')}>Deactivate</button>
                        </div>
                        <div className={styles.dropdownDivider}></div>
                        <button className={styles.removeButton}>Remove Member</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagementStep;

import { doc, setDoc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Message types
export type MessageType = 'text' | 'image' | 'file' | 'system';
export type MessageStatus = 'sent' | 'delivered' | 'read';

// User roles for messaging permissions
export type MessagingRole = 'super_user' | 'community_manager' | 'community_member';

export interface Message {
  id: string;
  communityId: string;
  tenantId: string;
  senderId: string;
  senderName: string;
  senderRole: MessagingRole;
  recipientId?: string; // For direct messages, null for community messages
  type: MessageType;
  content: string;
  attachments?: Array<{
    url: string;
    name: string;
    type: string;
    size: number;
  }>;
  status: MessageStatus;
  isPrivate: boolean; // True for private community messages (read-only for managers)
  createdAt: Timestamp;
  updatedAt: Timestamp;
  readBy: Array<{
    userId: string;
    readAt: Timestamp;
  }>;
}

export interface CommunityMessaging {
  communityId: string;
  tenantId: string;
  isPrivate: boolean;
  allowedRoles: MessagingRole[];
  managers: Array<{
    userId: string;
    role: MessagingRole;
    canRespond: boolean;
  }>;
  settings: {
    allowMemberToMember: boolean;
    allowAnonymous: boolean;
    moderationEnabled: boolean;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Send a message
export const sendMessage = async (
  communityId: string,
  tenantId: string,
  senderId: string,
  senderName: string,
  senderRole: MessagingRole,
  content: string,
  type: MessageType = 'text',
  recipientId?: string,
  attachments?: Array<any>
): Promise<string> => {
  try {
    // Check community messaging settings
    const communityMessaging = await getCommunityMessaging(communityId);
    if (!communityMessaging) {
      throw new Error('Community messaging not configured');
    }

    // Check permissions
    const canSend = await checkMessagingPermissions(
      communityId, 
      senderId, 
      senderRole, 
      'send'
    );
    
    if (!canSend) {
      throw new Error('Insufficient permissions to send messages');
    }

    const messageRef = doc(collection(db, 'messages'));
    const message: Omit<Message, 'id'> = {
      communityId,
      tenantId,
      senderId,
      senderName,
      senderRole,
      recipientId,
      type,
      content,
      attachments,
      status: 'sent',
      isPrivate: communityMessaging.isPrivate,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
      readBy: []
    };

    await setDoc(messageRef, message);
    return messageRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Get community messaging configuration
export const getCommunityMessaging = async (communityId: string): Promise<CommunityMessaging | null> => {
  try {
    const messagingRef = doc(db, 'community_messaging', communityId);
    const messagingSnap = await getDoc(messagingRef);
    
    if (messagingSnap.exists()) {
      return messagingSnap.data() as CommunityMessaging;
    }
    return null;
  } catch (error) {
    console.error('Error getting community messaging:', error);
    return null;
  }
};

// Setup community messaging
export const setupCommunityMessaging = async (
  communityId: string,
  tenantId: string,
  isPrivate: boolean,
  managers: Array<{ userId: string; role: MessagingRole; canRespond: boolean }>
): Promise<void> => {
  try {
    const messagingRef = doc(db, 'community_messaging', communityId);
    const communityMessaging: CommunityMessaging = {
      communityId,
      tenantId,
      isPrivate,
      allowedRoles: isPrivate 
        ? ['super_user', 'community_manager'] 
        : ['super_user', 'community_manager', 'community_member'],
      managers,
      settings: {
        allowMemberToMember: !isPrivate,
        allowAnonymous: false,
        moderationEnabled: true
      },
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
    };

    await setDoc(messagingRef, communityMessaging);
  } catch (error) {
    console.error('Error setting up community messaging:', error);
    throw error;
  }
};

// Check messaging permissions
export const checkMessagingPermissions = async (
  communityId: string,
  userId: string,
  userRole: MessagingRole,
  action: 'send' | 'read' | 'respond'
): Promise<boolean> => {
  try {
    const communityMessaging = await getCommunityMessaging(communityId);
    if (!communityMessaging) return false;

    // Super users can always perform all actions
    if (userRole === 'super_user') return true;

    // Check if user role is allowed
    if (!communityMessaging.allowedRoles.includes(userRole)) return false;

    // For private communities, check specific permissions
    if (communityMessaging.isPrivate) {
      const manager = communityMessaging.managers.find(m => m.userId === userId);
      
      if (action === 'respond') {
        return manager ? manager.canRespond : false;
      }
      
      if (action === 'send' && userRole === 'community_member') {
        return false; // Members can't send messages in private communities
      }
    }

    return true;
  } catch (error) {
    console.error('Error checking messaging permissions:', error);
    return false;
  }
};

// Get messages for a community
export const getCommunityMessages = (
  communityId: string,
  callback: (messages: Message[]) => void,
  limit: number = 50
) => {
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('communityId', '==', communityId),
    orderBy('createdAt', 'desc'),
    // limit(limit)
  );

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    callback(messages.reverse()); // Reverse to show oldest first
  });
};

// Mark message as read
export const markMessageAsRead = async (messageId: string, userId: string): Promise<void> => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    const messageSnap = await getDoc(messageRef);
    
    if (messageSnap.exists()) {
      const message = messageSnap.data() as Message;
      const readBy = message.readBy || [];
      
      // Check if user already marked as read
      const alreadyRead = readBy.some(r => r.userId === userId);
      if (!alreadyRead) {
        readBy.push({
          userId,
          readAt: serverTimestamp() as Timestamp
        });
        
        await updateDoc(messageRef, {
          readBy,
          status: 'read',
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

// Get direct messages between users
export const getDirectMessages = (
  senderId: string,
  recipientId: string,
  callback: (messages: Message[]) => void
) => {
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('senderId', 'in', [senderId, recipientId]),
    where('recipientId', 'in', [senderId, recipientId]),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    callback(messages);
  });
};

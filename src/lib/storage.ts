import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Upload image to Firebase Storage
export const uploadImage = async (
  file: File,
  path: string,
  tenantId: string,
  userId: string
): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
    
    // Create storage reference with tenant isolation
    const storageRef = ref(storage, `tenants/${tenantId}/${path}/${userId}/${fileName}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('🔵 Image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Upload avatar image
export const uploadAvatar = async (
  file: File,
  tenantId: string,
  userId: string
): Promise<string> => {
  return uploadImage(file, 'avatars', tenantId, userId);
};

// Upload community image
export const uploadCommunityImage = async (
  file: File,
  tenantId: string,
  userId: string,
  communityId?: string
): Promise<string> => {
  const path = communityId ? `communities/${communityId}` : 'communities';
  return uploadImage(file, path, tenantId, userId);
};

// Delete image from Firebase Storage
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log('🔵 Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

// Validate image file
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)'
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size must be less than 5MB'
    };
  }
  
  return { isValid: true };
};

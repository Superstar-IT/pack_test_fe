import { FileUploadResponse } from '../services/file.service';

// Helper to read object's properties as obj['name']
export type ObjectPropByName = Record<string, any>;

/**
 * Data for "Page Link" in SideBar adn other UI elements
 */
export type LinkToPage = {
  icon?: string; // Icon name to use as <AppIcon icon={icon} />
  path?: string; // URL to navigate to
  title?: string; // Title or primary text to display
  subtitle?: string; // Sub-title or secondary text to display
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photo: FileUploadResponse;
};

export type UserUpdateRequest = {
  photo?: FileUploadResponse;
  firstName?: string;
  lastName?: string;
  password?: string;
};

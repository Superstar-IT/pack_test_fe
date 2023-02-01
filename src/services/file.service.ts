import httpClient from '../utils/httpClient';

export type FileUploadResponse = {
  path: string;
  id: string;
};

export const FileService = {
  upload: async (file: any): Promise<FileUploadResponse> => {
    return await httpClient.post('/files/upload', file).then((response) => response.data);
  },
};
export default FileService;

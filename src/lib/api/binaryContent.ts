import { apiClient } from './client';
import type {
    ImagePresignedUrlRequest,
    ImagePresignedUrlResponse,
} from './types';

export const getBinaryContentPresignedUrl = async (
    request: ImagePresignedUrlRequest
): Promise<ImagePresignedUrlResponse> => {
    return apiClient.post<ImagePresignedUrlResponse>(
        '/api/binary-contents/images/presigned-url',
        request
    );
};

/*
 * 옷 이미지 업로드를 위한 presigned URL 요청
 */
export const getImagePresignedUrl = async (
    request: ImagePresignedUrlRequest
): Promise<ImagePresignedUrlResponse> => {
    return apiClient.post<ImagePresignedUrlResponse>(
        '/api/binary-contents/images/presigned-url',
        request
    );
};

/*
* presigned URL을 사용하여 이미지 업로드
*/
export const uploadImageToPresignedUrl = async (
    uploadUrl: string,
    image: File
): Promise<void> => {
    const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': image.type || 'application/octet-stream',
        },
        body: image,
    });

    if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
    }
};

/*
    업로드 성공 처리 - S3에 업로드된 이미지가 최종적으로 사용할 수 있도록 완료 처리 요청
*/
export const completeBinaryContentUpload = async (
    binaryContentId: string
): Promise<void> => {
    await apiClient.post<void>(`/api/binary-contents/${binaryContentId}/complete`);
};

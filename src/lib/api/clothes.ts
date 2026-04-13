import { apiClient } from './client';
import type {
  ClothesListParams,
  CursorResponse,
  ClothesDto,
  ClothesCreateRequest,
  ClothesUpdateRequest
} from './types';

/**
 * 옷 목록 조회
 */
export const getClothes = async (params: ClothesListParams): Promise<CursorResponse<ClothesDto>> => {
  return apiClient.get<CursorResponse<ClothesDto>>('/api/clothes', { params });
};

/**
 * 옷 등록
 */
export const createClothes = async (
  request: ClothesCreateRequest
): Promise<ClothesDto> => {
  return apiClient.post<ClothesDto>('/api/clothes', request);
};

/**
 * 옷 수정
 */
export const updateClothes = async (
  clothesId: string,
  request: ClothesUpdateRequest
): Promise<ClothesDto> => {
  return apiClient.patch<ClothesDto>(`/api/clothes/${clothesId}`, request);
};

/**
 * 옷 삭제
 */
export const deleteClothes = async (clothesId: string): Promise<void> => {
  await apiClient.delete<void>(`/api/clothes/${clothesId}`);
};

/**
 * 구매 링크로 옷 정보 불러오기
 */
export const extractByUrl = async (url: string): Promise<ClothesDto> => {
  return apiClient.get<ClothesDto>('/api/clothes/extractions', { params: { url } });
};
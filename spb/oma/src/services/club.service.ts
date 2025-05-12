import { GET_CLUB_BY_OWNER_PATH, UPDATE_CLUB_PATH } from '@/constants';
import { ResponseError } from '@/helpers/error';
import { apiFactory, ApiResponse } from '@/services/http';
import { ClubModel, ClubUpdateModel } from '@/types/model';

export interface IClubService {
  getClubByOwner: (
    ownerId: string
  ) => Promise<ApiResponse<ClubModel> | ResponseError>;

  updateClub: (
    club: ClubUpdateModel,
    clubId: string
  ) => Promise<ApiResponse<null> | ResponseError>;
}

class ClubService implements IClubService {
  getClubByOwner(
    ownerId: string
  ): Promise<ApiResponse<ClubModel> | ResponseError> {
    return apiFactory(GET_CLUB_BY_OWNER_PATH)
      .addPathParam(':owner_id', ownerId)
      .get<ClubModel>();
  }

  updateClub(
    club: ClubUpdateModel,
    clubId: string
  ): Promise<ApiResponse<null> | ResponseError> {
    return apiFactory(UPDATE_CLUB_PATH)
      .addPathParam(':id', clubId)
      .put<null>(club);
  }
}

const clubService = new ClubService();
export default clubService;

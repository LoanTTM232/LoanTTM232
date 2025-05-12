import {
  CREATE_UNIT_PATH, DELETE_UNIT_PATH, GET_CLUB_BY_OWNER_PATH, UPDATE_CLUB_PATH, UPDATE_UNIT_PATH
} from '@/constants';
import { ResponseError } from '@/helpers/error';
import { apiFactory, ApiResponse } from '@/services/http';
import { ClubModel, UnitModel } from '@/types/model';

export interface IClubService {
  getClubByOwner: (ownerId: string) => Promise<ApiResponse<ClubModel> | ResponseError>;

  updateClub: (
    club: ClubModel
  ) => Promise<ApiResponse<ClubModel> | ResponseError>;

  createUnit: (
    unit: UnitModel
  ) => Promise<ApiResponse<UnitModel> | ResponseError>;

  updateUnit: (
    unit: UnitModel
  ) => Promise<ApiResponse<UnitModel> | ResponseError>;

  deleteUnit: (unitId: string) => Promise<ApiResponse<null> | ResponseError>;
}

class ClubService implements IClubService {
  getClubByOwner(ownerId: string): Promise<ApiResponse<ClubModel> | ResponseError> {
    return apiFactory(GET_CLUB_BY_OWNER_PATH)
      .addPathParam(':owner_id', ownerId)
      .get<ClubModel>();
  }

  updateClub(club: ClubModel): Promise<ApiResponse<ClubModel> | ResponseError> {
    return apiFactory(UPDATE_CLUB_PATH).put<ClubModel>(club);
  }

  createUnit(unit: UnitModel): Promise<ApiResponse<UnitModel> | ResponseError> {
    return apiFactory(CREATE_UNIT_PATH).post<UnitModel>(unit);
  }

  updateUnit(unit: UnitModel): Promise<ApiResponse<UnitModel> | ResponseError> {
    return apiFactory(UPDATE_UNIT_PATH)
      .addPathParam(':id', unit.id)
      .put<UnitModel>(unit);
  }

  deleteUnit(unitId: string): Promise<ApiResponse<null> | ResponseError> {
    return apiFactory(DELETE_UNIT_PATH)
      .addPathParam(':id', unitId)
      .delete<null>();
  }
}

const clubService = new ClubService();
export default clubService;

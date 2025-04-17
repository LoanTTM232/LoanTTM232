import { SearchUnitQuery } from '@/services/types';

// &i = page items
// &p = page
// &b = order by
// &t = order type
// &q = query
// &st = sport type
// &pv = province
// &wd = ward
// &dt = district
// &lng = longitude
// &lat = latitude
// &r = radius
export const PARAMS = {
  pageItems: 'i',
  page: 'p',
  orderBy: 'b',
  orderType: 't',
  query: 'q',
  sportType: 'st',
  province: 'pv',
  ward: 'wd',
  district: 'dt',
  longitude: 'lng',
  latitude: 'lat',
  radius: 'r',
};

export class SearchUnitQueryBuilder {
  private query: SearchUnitQuery = {
    page: null,
    pageItems: null,
    orderBy: null,
    orderType: null,
    query: null,
    sportType: null,
    province: null,
    ward: null,
    district: null,
    longitude: null,
    latitude: null,
    radius: null,
  };

  setPage(page: number): this {
    this.query.page = page;
    return this;
  }

  setPageItems(items: number): this {
    this.query.pageItems = items;
    return this;
  }

  setOrderBy(orderBy: string): this {
    this.query.orderBy = orderBy;
    return this;
  }

  setOrderType(orderType: string): this {
    this.query.orderType = orderType;
    return this;
  }

  setQuery(text: string): this {
    this.query.query = text;
    return this;
  }

  setSportType(type: string): this {
    this.query.sportType = type;
    return this;
  }

  setProvince(province: string): this {
    this.query.province = province;
    return this;
  }

  setWard(ward: string): this {
    this.query.ward = ward;
    return this;
  }

  setDistrict(district: string): this {
    this.query.district = district;
    return this;
  }

  setLongitude(lng: number): this {
    this.query.longitude = lng;
    return this;
  }

  setLatitude(lat: number): this {
    this.query.latitude = lat;
    return this;
  }

  setRadius(radius: number): this {
    this.query.radius = radius;
    return this;
  }

  build(): SearchUnitQuery {
    return this.query;
  }
}

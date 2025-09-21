/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Coach data from /widgets/coach API
 */
export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  photo: string;
  gender: number;
  birthday: number;
  language: string;
  timezone: string;
  phoneData: {
    countryCode: string;
    number: string;
    isoCode: string;
  };
  scopeId: string;
  linkCode: string;
}

/**
 * Individual location item from /widgets/locations API
 */
export interface LocationItem {
  isOwn: boolean;
  id: string;
  archive: boolean;
  name: string;
  street: string;
  city: string;
  schedules: string[];
}

/**
 * Response from /widgets/locations API
 */
export interface LocationsResponse {
  items: LocationItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

/**
 * Individual service item from /widgets/services API
 */
export interface ServiceItem {
  isOwn: boolean;
  id: string;
  archive: boolean;
  name: string;
  duration: number;
  price: number;
}

/**
 * Response from /widgets/services API
 */
export interface ServicesResponse {
  items: ServiceItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

/**
 * Individual schedule day from /widgets/free-slots API
 */
export interface ScheduleDay {
  date: string;
  day: string;
  freeSlots: string[];
}

/**
 * Response from /widgets/free-slots API
 */
export interface FreeSlotsResponse {
  schedule: ScheduleDay[];
}

/**
 * Request body for POST /widgets/service-request API
 */
export interface ServiceRequest {
  locationId: string;
  serviceId: string;
  date: string;
  status: string;
  trType: number;
  duration: number;
  price: number;
  phone: string;
  linkCode: string;
}

/**
 * Client data in service request response
 */
export interface ClientData {
  isOwn: boolean;
  id: string;
  archive: boolean;
  firstName: string;
  lastName: string;
  patronymic: string;
  photo: string;
  gender: number;
  birthday: number;
  phoneData: {
    countryCode: string;
    number: string;
    isoCode: string;
  };
  description: string;
}

/**
 * Nearest slot data in service request response
 */
export interface NearestSlot {
  startTime: string;
  endTime: string;
  isOccupied: boolean;
  slotType: string;
  client: ClientData;
  location: LocationItem;
}

/**
 * Response from POST /widgets/service-request API
 */
export interface ServiceRequestResponse {
  id: string;
  locationId: string;
  serviceId: string;
  date: string;
  status: string;
  trType: number;
  duration: number;
  price: number;
  phone: string;
  linkCode: string;
  clientId: string;
  coachId: string;
  scopeId: string;
  client: ClientData;
  coach: Coach;
  location: LocationItem;
  service: ServiceItem;
  nearestSlots: NearestSlot[];
}

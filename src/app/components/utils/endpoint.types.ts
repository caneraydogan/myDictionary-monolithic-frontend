import {HttpHeaders, HttpParams} from '@angular/common/http';

export enum ResponseContentEnum {
  Text = 'text',
  Json = 'json',
  ArrayBuffer = 'arraybuffer',
  Blob = 'blob'
}


export class RequestBody<T> {
  public data?: T | any;
  public sortList?: any;
  public params?: any; // Should be a map
  public pageNumber?: number;
  public pageSize?: number;
  public firstResult?: number;
  public maxResults?: number;
}

export enum ResponseBodyStatus {
  OK = 'OK',
  FAIL = 'FAIL',
  UNKNOWN = 'UNKNOWN',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export class ResponseBody<T> {
  status: ResponseBodyStatus;
  data?: T;
  message?: string;
  errorCode: string;
}

export class SuccessResponse<T> extends ResponseBody<T> {
  type: number;
  body: ResponseBody<T>;
  headers: HttpHeaders;
  ok: boolean;
  statusText: string;
  url: string;
}

export class ErrorResponse<T> {
  error: ResponseBody<T>;
  errorCode: string;
  name: string;
  message: string;
  headers: HttpHeaders;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}

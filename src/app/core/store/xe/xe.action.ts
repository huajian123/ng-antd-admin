import { ActionType, createAction, props } from "@ngrx/store";
import { Xe } from '../../model/xe.model';

export const GET_XES = "@Xe/GetAll";
export const GET_XES_SUCEESS = "@Xe/GetAllSuccess";
export const GET_XES_FAILED = "@Xe/GetAllFailed";

export const GET_XE = "@Xe/Get";
export const GET_XE_SUCEESS = "@Xe/GetSuccess";
export const GET_XE_FAILED = "@Xe/GetFailed";

export const CREATE_XE = "@Xe/Create";
export const CREATE_XE_SUCEESS = "@Xe/CreateSuccess";
export const CREATE_XE_FAILED = "@Xe/CreateFailed";

export const UPDATE_XE = "@Xe/Update";
export const UPDATE_XE_SUCEESS = "@Xe/UpdateSuccess";
export const UPDATE_XE_FAILED = "@Xe/UpdateFailed";

export const DELETE_XE = "@Xe/Delete";
export const DELETE_XE_SUCEESS = "@Xe/DeleteSuccess";
export const DELETE_XE_FAILED = "@Xe/DeleteFailed";

export const DELETE_XES = "@Xe/DeleteAll";
export const DELETE_XES_SUCEESS = "@Xe/DeleteAllSuccess";
export const DELETE_XES_FAILED = "@Xe/DeleteAllFailed";

export const getXes = createAction(GET_XES);
export const getXesSucess = createAction(GET_XES_SUCEESS, props<{xes:Xe[]}>());
export const getXesFailed = createAction(GET_XES_FAILED, props<{error?:string}>());

export const getXe = createAction(GET_XE, props<{id:string}>());
export const getXeSucess = createAction(GET_XE_SUCEESS, props<{xe:Xe}>());
export const getXeFailed = createAction(GET_XE_FAILED, props<{error?:string}>());

export const createXe = createAction(CREATE_XE, props<{xe:Xe}>());
export const createXeSucess = createAction(CREATE_XE_SUCEESS, props<{code:number}>());
export const createXeFailed = createAction(CREATE_XE_FAILED, props<{error?:string}>());

export const updateXe = createAction(UPDATE_XE, props<{xe:Xe}>());
export const updateXeSucess = createAction(UPDATE_XE_SUCEESS, props<{code:number}>());
export const updateXeFailed = createAction(UPDATE_XE_FAILED, props<{error?:string}>());

export const deleteXe = createAction(DELETE_XE, props<{id:string}>());
export const deleteXeSucess = createAction(DELETE_XE_SUCEESS, props<{code:number}>());
export const deleteXeFailed = createAction(DELETE_XE_FAILED, props<{error?:string}>());

export const deleteXes = createAction(DELETE_XES);
export const deleteXesSucess = createAction(DELETE_XES_SUCEESS, props<{code:number}>());
export const deleteXesFailed = createAction(DELETE_XES_FAILED, props<{error?:string}>());

export type XeActions = 
  | ActionType<typeof getXes>
  | ActionType<typeof getXesSucess>
  | ActionType<typeof getXesFailed>

  | ActionType<typeof getXe>
  | ActionType<typeof getXeSucess>
  | ActionType<typeof getXeFailed>  

  | ActionType<typeof createXe>  
  | ActionType<typeof createXeSucess>  
  | ActionType<typeof createXeFailed>  

  | ActionType<typeof updateXe>  
  | ActionType<typeof updateXeSucess>  
  | ActionType<typeof updateXeFailed> 

  | ActionType<typeof deleteXe> 
  | ActionType<typeof deleteXeSucess> 
  | ActionType<typeof deleteXeFailed> 

  | ActionType<typeof deleteXes> 
  | ActionType<typeof deleteXesSucess> 
  | ActionType<typeof deleteXesFailed> 






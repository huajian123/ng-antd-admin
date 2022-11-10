import { createReducer, on} from '@ngrx/store'
import { XeState } from './xe.state';
import * as XeActions from './xe.action';

const initialState: XeState = {
    items: [],
    status: 'idle',
    error: '',
    currenItem: {}
}

export function xeReducer(
    state: XeState = initialState,
    action: XeActions.XeActions
): XeState {

    switch(action.type) {
        case XeActions.GET_XES: return {...state, status: 'loading'};
        case XeActions.GET_XES_SUCEESS: return {...state, status: 'idle',items: action.xes, error: ''};
        case XeActions.CREATE_XE_FAILED: return {...state,status: 'error', items:[],error: action.error};

        case XeActions.GET_XE: return {...state, status: 'loading'};
        case XeActions.GET_XE_SUCEESS: return {...state, status: "idle", currenItem: action.xe, error: ''};
        case XeActions.GET_XE_FAILED: return {...state, status: "error", currenItem: null, error: action.error}

        case XeActions.CREATE_XE: return {...state, status: 'loading'};
        case XeActions.CREATE_XE_SUCEESS: return {...state, status: 'idle', code:action.code, error: ''};
        case XeActions.CREATE_XE_FAILED: return {...state, status: 'error', error: action.error};

        case XeActions.UPDATE_XE: return {...state, status: 'loading'};
        case XeActions.CREATE_XE_SUCEESS: return {...state, status: 'idle', code: action.code, error: ''};
        case XeActions.CREATE_XE_FAILED: return {...state, status: 'error', error: action.error};

        case XeActions.DELETE_XE: return {...state, status: 'loading'};
        case XeActions.DELETE_XES_SUCEESS: return {...state, status: 'idle', code: action.code, error: ''};
        case XeActions.CREATE_XE_FAILED: return {...state, status: 'error', error: action.error};

        case XeActions.DELETE_XES: return {...state, status : 'loading'}
        case XeActions.DELETE_XES_SUCEESS: return {...state, status : 'idle', code: action.code, error : ''};
        case XeActions.DELETE_XES_FAILED: return {...state, status: 'error', error: ''};

    

        default: return state

    }
}




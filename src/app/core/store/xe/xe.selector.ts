import { createFeatureSelector, createSelector} from '@ngrx/store'

import { XeState } from './xe.state';

const featureXes = createFeatureSelector<XeState>('feature_xe');

export const xesSelector = createSelector(featureXes, state => state.items);
export const currentXeSelector = createSelector(featureXes, state => state.currenItem);
export const xeStatusSelector = createSelector(featureXes, state => state.status);
export const xeCodeSelector = createSelector(featureXes, state => state.code);
export const xeErrorSelector = createSelector(featureXes, state => state.error);



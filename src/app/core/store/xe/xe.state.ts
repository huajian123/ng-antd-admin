import { Xe } from "../../model/xe.model";

export interface XeState {
    items: Xe[];
    currenItem: any;
    code?: number;
    status: 'idle' | 'loading' | 'error';
    error?: string;
}
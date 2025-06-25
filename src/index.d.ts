export interface RadioDialogOptions {
    title: string;
    items: string[];
    selectedIndex?: number;
    cancelButtonText?: string;
    okButtonText?: string;
}

export interface RadioDialogResult {
    selectedIndex: number;
    selectedItem: string;
    cancelled: boolean;
}

export declare class RadioDialog {
    static show(options: RadioDialogOptions): Promise<RadioDialogResult>;
}

export { RadioDialogOptions, RadioDialogResult } from './nativescript-radio-dialog.common';

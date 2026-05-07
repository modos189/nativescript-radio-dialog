export interface RadioDialogOptions {
    title: string;
    items: string[];
    selectedIndex?: number;
    cancelButtonText?: string;
    okButtonText?: string;
    /** Called on item tap. On Android: dialog stays open, fires on every tap; on iOS: fires once together with Promise resolution */
    onItemSelect?: (result: { selectedIndex: number; selectedItem: string }) => void;
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

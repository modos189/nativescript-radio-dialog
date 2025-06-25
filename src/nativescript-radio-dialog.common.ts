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

export abstract class RadioDialogBase {
    static show(options: RadioDialogOptions): Promise<RadioDialogResult> {
        throw new Error('RadioDialog.show() must be implemented in platform-specific code');
    }
}

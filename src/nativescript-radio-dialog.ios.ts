import { RadioDialogBase, RadioDialogOptions, RadioDialogResult } from './nativescript-radio-dialog.common';

declare const RadioDialogHelper: any;

export class RadioDialog extends RadioDialogBase {
    static show(options: RadioDialogOptions): Promise<RadioDialogResult> {
        return new Promise<RadioDialogResult>((resolve, reject) => {
            try {
                RadioDialogHelper.showRadioDialogWithTitleMessageItemsSelectedIndexCancelButtonTextCompletion(
                    options.title,
                    null,
                    options.items,
                    options.selectedIndex !== undefined ? options.selectedIndex : -1,
                    options.cancelButtonText || 'Cancel',
                    (selectedIndex: number, selectedItem: string, cancelled: boolean) => {
                        resolve({
                            selectedIndex: selectedIndex,
                            selectedItem: selectedItem || '',
                            cancelled: cancelled
                        });
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }
}

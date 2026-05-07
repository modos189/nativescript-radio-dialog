import { Application, Utils } from '@nativescript/core';
import { RadioDialogBase, RadioDialogOptions, RadioDialogResult } from './nativescript-radio-dialog.common';

declare const org: any;
declare const java: any;
declare const Array: any;

export class RadioDialog extends RadioDialogBase {
    static show(options: RadioDialogOptions): Promise<RadioDialogResult> {
        return new Promise<RadioDialogResult>((resolve, reject) => {
            try {
                const activity = Application.android.foregroundActivity || Application.android.startActivity;
                
                if (!activity) {
                    reject(new Error('No Android activity found'));
                    return;
                }

                const items = options.items;

                const callback = new org.nativescript.radiodialog.RadioDialogHelper.RadioDialogCallback({
                    onResult(selectedIndex: number, selectedItem: string, cancelled: boolean) {
                        if (!cancelled && options.onItemSelect) {
                            options.onItemSelect({ selectedIndex, selectedItem: selectedItem || '' });
                        } else {
                            resolve({
                                selectedIndex: selectedIndex,
                                selectedItem: selectedItem || '',
                                cancelled: cancelled
                            });
                        }
                    }
                });

                org.nativescript.radiodialog.RadioDialogHelper.showRadioDialog(
                    activity,
                    options.title,
                    null,
                    items,
                    options.selectedIndex !== undefined ? options.selectedIndex : -1,
                    options.okButtonText || 'OK',
                    options.cancelButtonText || 'Cancel',
                    !!options.onItemSelect,
                    callback
                );
            } catch (error) {
                reject(error);
            }
        });
    }
}

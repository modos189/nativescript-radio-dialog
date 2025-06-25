import { Device } from '@nativescript/core';
import { RadioDialogOptions, RadioDialogResult } from './nativescript-radio-dialog.common';

let RadioDialog: any;

if (Device.os === 'Android') {
    RadioDialog = require('./nativescript-radio-dialog.android').RadioDialog;
} else if (Device.os === 'iOS') {
    RadioDialog = require('./nativescript-radio-dialog.ios').RadioDialog;
} else {
    throw new Error('Unsupported platform');
}

export { RadioDialog, RadioDialogOptions, RadioDialogResult };
export * from './nativescript-radio-dialog.common';
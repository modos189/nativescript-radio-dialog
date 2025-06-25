package org.nativescript.radiodialog;

import android.app.Activity;
import android.content.DialogInterface;
import androidx.appcompat.app.AlertDialog;

public class RadioDialogHelper {
    
    public interface RadioDialogCallback {
        void onResult(int selectedIndex, String selectedItem, boolean cancelled);
    }
    
    public static void showRadioDialog(
            Activity activity,
            String title,
            String message,
            String[] items,
            int selectedIndex,
            String okButtonText,
            String cancelButtonText,
            RadioDialogCallback callback) {
        
        if (activity == null || activity.isFinishing()) {
            callback.onResult(-1, null, true);
            return;
        }
        
        final int[] checkedItem = {selectedIndex >= 0 && selectedIndex < items.length ? selectedIndex : -1};
        
        AlertDialog.Builder builder = new AlertDialog.Builder(activity);
        builder.setTitle(title);
        
        builder.setSingleChoiceItems(items, checkedItem[0],
            new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    checkedItem[0] = which;
                }
            });
        
        builder.setPositiveButton(okButtonText != null ? okButtonText : "OK",
            new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    int selected = checkedItem[0];
                    if (selected >= 0 && selected < items.length) {
                        callback.onResult(selected, items[selected], false);
                    } else {
                        callback.onResult(-1, null, true);
                    }
                }
            });
        
        builder.setNegativeButton(cancelButtonText != null ? cancelButtonText : "Cancel",
            new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    callback.onResult(-1, null, true);
                }
            });
        
        builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                callback.onResult(-1, null, true);
            }
        });
        
        AlertDialog dialog = builder.create();
        dialog.show();
    }
}
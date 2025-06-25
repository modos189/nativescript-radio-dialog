package org.nativescript.radiodialog;

import android.app.Activity;
import android.content.DialogInterface;
import android.os.Build;
import androidx.appcompat.app.AlertDialog;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

public class RadioDialogHelper {

    public interface RadioDialogCallback {
        void onResult(
            int selectedIndex,
            String selectedItem,
            boolean cancelled
        );
    }

    private static AlertDialog.Builder createOptimalDialogBuilder(
        Activity activity
    ) {
        // Check if app is using Material 3 theme
        try {
            android.content.res.TypedArray a = activity
                .getTheme()
                .obtainStyledAttributes(
                    new int[] {
                        com.google.android.material.R.attr.isMaterial3Theme,
                    }
                );
            boolean isMaterial3 = a.getBoolean(0, false);
            a.recycle();

            if (isMaterial3 && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                // App uses Material 3 theme AND Android supports it
                return new MaterialAlertDialogBuilder(
                    activity,
                    com.google.android.material.R.style.ThemeOverlay_Material3_MaterialAlertDialog
                );
            } else if (isMaterial3) {
                // App wants Material 3 but Android version doesn't support it well
                // Use default Material 2 to avoid crashes
                return new MaterialAlertDialogBuilder(activity);
            }
        } catch (Exception e) {
            // Material 3 check failed, continue with fallback
        }

        // Fallback to Material Design 2
        return new MaterialAlertDialogBuilder(activity);
    }

    public static void showRadioDialog(
        Activity activity,
        String title,
        String message,
        String[] items,
        int selectedIndex,
        String okButtonText,
        String cancelButtonText,
        RadioDialogCallback callback
    ) {
        if (activity == null || activity.isFinishing()) {
            callback.onResult(-1, null, true);
            return;
        }

        final int[] checkedItem = {
            selectedIndex >= 0 && selectedIndex < items.length
                ? selectedIndex
                : -1,
        };

        AlertDialog.Builder builder = createOptimalDialogBuilder(activity);
        builder.setTitle(title);

        builder.setSingleChoiceItems(
            items,
            checkedItem[0],
            new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    checkedItem[0] = which;
                }
            }
        );

        builder.setPositiveButton(
            okButtonText != null ? okButtonText : "OK",
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
            }
        );

        builder.setNegativeButton(
            cancelButtonText != null ? cancelButtonText : "Cancel",
            new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    callback.onResult(-1, null, true);
                }
            }
        );

        builder.setOnCancelListener(
            new DialogInterface.OnCancelListener() {
                @Override
                public void onCancel(DialogInterface dialog) {
                    callback.onResult(-1, null, true);
                }
            }
        );

        AlertDialog dialog = builder.create();
        dialog.show();
    }
}

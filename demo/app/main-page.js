import { Observable } from "@nativescript/core";

let RadioDialog;
try {
  RadioDialog = require("nativescript-radio-dialog").RadioDialog;
} catch (error) {
  console.error("Failed to import RadioDialog:", error);
}

let viewModel;

export function onLoaded(args) {
  const page = args.object;
  viewModel = new Observable();
  viewModel.set("resultText", "Tap a button to test the radio dialog");
  page.bindingContext = viewModel;
}

export async function showBasicDialog() {
  try {
    const result = await RadioDialog.show({
      title: "Select Language",
      items: ["English", "Русский", "Español", "Français"],
    });

    if (!result.cancelled) {
      viewModel.set(
        "resultText",
        `Selected: ${result.selectedItem} (index: ${result.selectedIndex})`
      );
    } else {
      viewModel.set("resultText", "Dialog was cancelled");
    }
  } catch (error) {
    console.error("Error details:", error);
    viewModel.set("resultText", `Error: ${error.message || error}`);
  }
}

export async function showPreselectedDialog() {
  try {
    const result = await RadioDialog.show({
      title: "Update Frequency",
      items: ["Daily", "Weekly", "Monthly", "Never"],
      selectedIndex: 1,
    });

    if (!result.cancelled) {
      viewModel.set(
        "resultText",
        `Selected: ${result.selectedItem} (index: ${result.selectedIndex})`
      );
    } else {
      viewModel.set("resultText", "Dialog was cancelled");
    }
  } catch (error) {
    console.error("Error details:", error);
    viewModel.set("resultText", `Error: ${error.message || error}`);
  }
}

export async function showCustomButtonDialog() {
  try {
    const result = await RadioDialog.show({
      title: "Save Options",
      items: ["Save to Cloud", "Save Locally", "Don't Save"],
      selectedIndex: 0,
      okButtonText: "Apply",
      cancelButtonText: "Skip",
    });

    if (!result.cancelled) {
      viewModel.set(
        "resultText",
        `Selected: ${result.selectedItem} (index: ${result.selectedIndex})`
      );
    } else {
      viewModel.set("resultText", "Dialog was cancelled");
    }
  } catch (error) {
    console.error("Error details:", error);
    viewModel.set("resultText", `Error: ${error.message || error}`);
  }
}

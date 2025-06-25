import UIKit
import Foundation

@objc public class RadioDialogHelper: NSObject {
    
    @objc public static func showRadioDialog(
        title: String,
        message: String?,
        items: [String],
        selectedIndex: Int,
        cancelButtonText: String,
        completion: @escaping (Int, String?, Bool) -> Void
    ) {
        DispatchQueue.main.async {
            guard let presenter = UIApplication.shared.windows.first?.rootViewController else {
                completion(-1, nil, true)
                return
            }
            
            let alert = UIAlertController(
                title: title,
                message: message,
                preferredStyle: .actionSheet
            )
            
            for (index, item) in items.enumerated() {
                let action = UIAlertAction(title: item, style: .default) { _ in
                    completion(index, item, false)
                }
                
                if index == selectedIndex {
                    action.setValue(true, forKey: "checked")
                }
                
                alert.addAction(action)
            }
            
            let cancelAction = UIAlertAction(title: cancelButtonText, style: .cancel) { _ in
                completion(-1, nil, true)
            }
            alert.addAction(cancelAction)
            
            if let popover = alert.popoverPresentationController {
                popover.sourceView = presenter.view
                popover.sourceRect = CGRect(
                    x: presenter.view.bounds.midX,
                    y: presenter.view.bounds.midY,
                    width: 0,
                    height: 0
                )
                popover.permittedArrowDirections = []
            }
            
            presenter.present(alert, animated: true)
        }
    }
}
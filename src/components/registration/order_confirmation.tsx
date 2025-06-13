'use client'
const OrderConfirmation = ({ 
  customerName, 
  phoneNumber, 
  clothingTypeName, 
  dueDate,
  onReset
}: {
  customerName: string;
  phoneNumber: string;
  clothingTypeName: string;
  dueDate: Date | null;
  onReset: () => void;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
    <div className="text-green-500 text-5xl mb-4">✓</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Submitted!</h2>
    <p className="text-gray-600 mb-6">
      Your order for {clothingTypeName} has been successfully created.
    </p>
    <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-sm">Customer</p>
          <p className="font-medium">{customerName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="font-medium">{phoneNumber}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Clothing Type</p>
          <p className="font-medium">{clothingTypeName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Due Date</p>
          <p className="font-medium">
            {dueDate?.toLocaleDateString() || "Not set"}
          </p>
        </div>
      </div>
    </div>
    <button
      onClick={onReset}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
    >
      Create New Order
    </button>
  </div>
);

export default OrderConfirmation;

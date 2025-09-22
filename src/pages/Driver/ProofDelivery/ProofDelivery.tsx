import React, { useState, useRef } from "react";
import { Camera, CheckCircle, Clipboard, User, FileText } from "lucide-react";

const ProofOfDelivery = () => {
  const [recipientName, setRecipientName] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSignatureStart = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const handleSignatureDraw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleSignatureEnd = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save or submit the proof of delivery data
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
            <Clipboard className="mr-2" /> Proof of Delivery
          </h2>
          <p className="mt-2 text-gray-600">
            Confirm the delivery details and capture recipient information.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <User className="mr-2" /> Recipient Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Signature Pad */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <FileText className="mr-2" /> Recipient Signature
              </h3>
              <div className="border border-gray-300 rounded-md p-2 mb-4">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  className="w-full h-40 bg-white border border-gray-200 rounded-md cursor-crosshair"
                  onMouseDown={handleSignatureStart}
                  onMouseMove={handleSignatureDraw}
                  onMouseUp={handleSignatureEnd}
                  onMouseLeave={handleSignatureEnd}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleClearSignature}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Clear Signature
                </button>
              </div>
            </div>

            {/* Delivery Photos */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <Camera className="mr-2" /> Delivery Photos
              </h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Delivery ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <Camera className="mr-2" /> Upload Photos
              </button>
            </div>

            {/* Delivery Notes */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <FileText className="mr-2" /> Delivery Notes
              </h3>
              <textarea
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Add any notes about the delivery..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
              >
                <CheckCircle className="mr-2" /> Confirm Delivery
              </button>
            </div>
          </form>
        ) : (
          // Success Message
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Proof of Delivery Submitted!
            </h3>
            <p className="text-gray-600">
              The delivery has been confirmed and recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProofOfDelivery;

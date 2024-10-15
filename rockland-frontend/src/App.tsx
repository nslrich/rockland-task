// Imports
import axios from "axios";
import { useState } from "react";

// Components
import PrimaryButton from "./components/buttons/PrimaryButton";
import UploadButton from "./components/buttons/UploadButton";
import PdfModal from "./components/PdfModal/PdfModal";

// Main
export default function App() {

  // State
  const [file, setFile] = useState<File | null>(null);

  const [uploadError, setUploadError] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('null'); // Default to 'null' so page doesnt shift around

  // Modal
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Handle Submit
  const handleSubmit = () => {

    // Check for file
    if (file) {

      // Clear state
      setUploadError(false);
      setUploadMessage('null');

      // Setup form data with file
      const formData = new FormData();
      formData.append('File', file);
      formData.append('FileName', file.name);

      // Send file to backend
      axios.post('/api/upload', formData, { headers: { "Content-Type": 'multipart/form-data'}}).then((response) => {
        console.log(response);
        setUploadError(false);
        setUploadMessage(response.data);
      }).catch((error) => {
        console.log(error);
        setUploadError(true);
        setUploadMessage(error.response.data);
      });
    }
  }

  // Render
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-6 gap-4">
      <UploadButton setFile={setFile} />

      <div className="flex flex-row gap-2 text-sm">
        {file ? <strong>File:</strong> : null}
        {file ? file.name : 'No file selected.'}
      </div>

      <div className="flex flex-row gap-4">
        <PrimaryButton type='button' disabled={file ? false : true} onClick={() => handleSubmit()}>Submit</PrimaryButton>
        <PrimaryButton type='button' disabled={file ? false : true} onClick={() => setShowPdfModal(true)}>View PDF</PrimaryButton>
      </div>

      <span className={`text-sm font-medium ${uploadMessage == 'null' ? 'invisible' : 'visible'} ${uploadError ? 'text-red-500' : 'text-green-500'}`}>
        {uploadMessage}
      </span>

      <PdfModal show={showPdfModal} setShow={setShowPdfModal} pdf={file}/>
    </div>
  )
}
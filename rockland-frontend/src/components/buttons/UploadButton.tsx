// Imports

// Assets
import UploadSvg from '../../assets/upload.svg';

// Props
type Props = {
  setFile: Function
}

// Main
export default function UploadButton ({setFile}: Props) {

  // Handle click
  const handleClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  }

  // Handle on file upload
  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      if (files.length !== 0) {
        setFile(files[0]);
      }
    }
  }

  // Render
  return (
    <div
      className="flex flex-col justify-center items-center border border-neutral-300 rounded-lg shadow-lg hover:b w-48 py-4 cursor-pointer hover:bg-neutral-100"
      onClick={() => handleClick()}
    >
      <img src={UploadSvg} alt='Upload' className='w-10 mb-2'/>
      <span className='font-medium'>Upload File</span>
      <p className='text-grey-600 text-xs'>PDF's only.</p>

      <input id='file-input' type='file' className='hidden' accept='.pdf' onChange={(e) => handleFileUpload(e.target.files)}/>
    </div>
  )
}
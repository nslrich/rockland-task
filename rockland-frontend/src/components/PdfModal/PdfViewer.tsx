// Imports
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// React PDF Styles
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Props
type Props = {
  pdf: File | null
}

// Main 
export default function PdfViewer({ pdf }: Props) {

  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

  // State
  const [pdfData, setPdfData] = useState<string | undefined>();
  const [scale, setScale] = useState<number>()
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // Convert file to data URL
  useEffect(() => {
    if (pdf) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          setPdfData(e.target.result?.toString());
        }
      };
      reader.readAsDataURL(pdf);
    }
  }, [pdf]);

  // Handle resizing of the window
  useEffect(() => {

    function handleResize() {
      setScale(calcScale(window.innerHeight, window.innerWidth));
    }

    // Add listner
    window.addEventListener("resize", handleResize);
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  // Render
  return (
    <div className='flex flex-col items-center flex-grow'>
      <Document file={pdfData} className="flex items-center mb-2 flex-grow" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} scale={scale} className="border rounded"/>
      </Document>

      <div className='flex flex-row gap-4 py-1'>
        <button
          className='border-2 border-blue-700 hover:text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 p-2 focus:outline-none disabled:bg-neutral-400 disabled:border-neutral-400'
          disabled={pageNumber == 1}
          onClick={() => setPageNumber((page) => page - 1)}
        >Previous</button>
        <button 
          className='border-2 border-blue-700 hover:text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 p-2 focus:outline-none disabled:bg-neutral-400 disabled:border-neutral-400' 
          disabled={pageNumber == numPages}
          onClick={() => setPageNumber((page) => page + 1)}
        >Next</button>
      </div>
    </div>
  );
}

const calcScale = (height: number, width: number) => {
  const scale1 = 0.0010167464114833 * height - 0.12535885167464;
  const scale2 = 0.0011891891891892 * width - 0.0044324324324324;
  if (scale1 < scale2) {
    return scale1;
  } else {
    return scale2;
  }
}
// Imports

import PdfViewer from "./PdfViewer"

// Props
type Props = {
  show: boolean,
  setShow: Function,
  pdf: File | null
}

// Main
export default function PdfModal({ show, setShow, pdf }: Props) {
  return (
    <div className={`${show ? '' : 'hidden'} fixed top-0 right-0 left-0 z-10 w-sceen h-screen bg-neutral-400/50 flex flex-col items-center justify-center`}>

      {/* Main */}
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 w-[calc(100%-2rem)] md:w-[calc(100%-8rem)] max-w-[1000px] h-[calc(100vh-2rem)] md:h-[calc(100%-8rem)]">

        {/* Header */}
        <div className="flex justify-end pb-4 mb-4 border-b">
          <button
            className="border-2 border-blue-700 hover:text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 p-2 focus:outline-none shadow-lg"
            onClick={() => setShow(false)}
          >X</button>
        </div>

        <PdfViewer pdf={pdf}/>
      </div>
    </div>
  )
}

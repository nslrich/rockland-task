// Imports

// Props
type Props = {
  type: "submit" | "reset" | "button" | undefined,
  disabled: boolean,
  children: string,
  onClick: Function
}

// Main
export default function PrimaryButton({ type, disabled, onClick, children }: Props) {

  // Render
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none disabled:bg-neutral-400 w-28 shadow-lg"
      type={type}
      disabled={disabled}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  )
}
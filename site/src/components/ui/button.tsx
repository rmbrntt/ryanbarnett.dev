import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"
import { forwardRef } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#88d0f3] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none quantum-interactive",
  {
    variants: {
      variant: {
        default: "bg-[#88d0f3]/10 text-[#88d0f3] hover:bg-[#88d0f3]/20",
        ghost: "hover:bg-[#88d0f3]/10 hover:text-[#88d0f3]",
        outline: "border border-[#88d0f3] hover:bg-[#88d0f3]/10",
        secondary: "bg-[#c596fc]/10 text-[#c596fc] hover:bg-[#c596fc]/20",
        matrix: "bg-[#59a066]/10 text-[#59a066] hover:bg-[#59a066]/20",
        neural: "bg-[#d14554]/10 text-[#d14554] hover:bg-[#d14554]/20",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 
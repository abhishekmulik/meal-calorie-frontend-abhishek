import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ReactNode } from "react"

type SpinnerButtonProps = {
  isLoading?: boolean
  children: ReactNode
  loadingText?: string
} & React.ComponentProps<typeof Button>

export function SpinnerButton({
  isLoading,
  children,
  loadingText,
  disabled,
  ...props
}: SpinnerButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          {loadingText && <span>{loadingText}</span>}
          <Spinner data-icon="inline-start" />
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
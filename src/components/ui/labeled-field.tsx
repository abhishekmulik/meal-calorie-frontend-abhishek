import { FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { UseFormRegisterReturn } from "react-hook-form"

type LabeledFieldProps = {
  label: string
  placeholder?: string
  type?: string
  registration: UseFormRegisterReturn
  error?: { message?: string }
  isRequired?: boolean
}

export function LabeledField({
  label,
  placeholder,
  type = "text",
  registration,
  error,
  isRequired = true
}: LabeledFieldProps) {
  return (
    <div className="space-y-1">
      <FieldLabel><span>
        {label}{isRequired && <span className="text-red-500">*</span>}
      </span></FieldLabel>
      <Input
        type={type}
        required={isRequired}
        placeholder={placeholder}
        className={cn(error?.message && 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-1')}
        {...registration}
      />

      {(
        <p className="text-sm text-red-500 min-h-[20px]" >
          {error?.message || ''}
        </p>
      )}
    </div>
  )
}

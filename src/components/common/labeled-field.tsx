"use client"
import { FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type LabeledFieldProps = {
  label: string
  placeholder?: string
  type?: string
  registration: UseFormRegisterReturn
  error?: { message?: string }
  isRequired?: boolean
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function LabeledField({
  label,
  placeholder,
  type = "text",
  registration,
  error,
  isRequired = true,
  inputProps = {}
}: LabeledFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  return (
    <div className="space-y-1">
      <FieldLabel><span>
        {label}{isRequired && <span className="text-red-500">*</span>}
      </span></FieldLabel>
      <div className="relative">
        <Input
          type={isPassword ? showPassword ? 'text': 'password': type}
          required={isRequired}
          placeholder={placeholder}
          className={cn(error?.message && 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-1')}
          {...inputProps}
          {...registration}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>


      {(
        <p className="text-sm text-red-500 min-h-[20px]" >
          {error?.message || ''}
        </p>
      )}
    </div>
  )
}

// Healthcare Input components for MagicMeds
// Accessible form inputs with medical context validation

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const inputVariants = cva(
  'flex w-full rounded-lg border bg-white px-3 py-2 text-base transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-3 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-touch',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20',
        error: 'border-error-300 focus:border-error-500 focus:ring-error-500/20 bg-error-50/20',
        success: 'border-success-300 focus:border-success-500 focus:ring-success-500/20 bg-success-50/20',
        warning: 'border-warning-300 focus:border-warning-500 focus:ring-warning-500/20 bg-warning-50/20',
      },
      size: {
        sm: 'h-9 px-3 py-1.5 text-sm',
        md: 'h-11 px-4 py-2 text-base',
        lg: 'h-12 px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type = 'text',
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    
    // Determine variant based on validation state
    const currentVariant = error ? 'error' : success ? 'success' : variant;
    
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-600 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: currentVariant, size, className }),
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10'
            )}
            ref={ref}
            id={inputId}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : 
              success ? `${inputId}-success` : 
              helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {!isPassword && rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
          
          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-error-600">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
          
          {success && !rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-success-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-error-600 flex items-center space-x-1"
            role="alert"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </p>
        )}
        
        {success && !error && (
          <p
            id={`${inputId}-success`}
            className="text-sm text-success-600 flex items-center space-x-1"
          >
            <CheckCircle className="h-4 w-4" />
            <span>{success}</span>
          </p>
        )}
        
        {helperText && !error && !success && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Specialized Medical Inputs

interface PhoneInputProps extends Omit<InputProps, 'type'> {
  countryCode?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ countryCode = '+91', ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Format Indian phone number
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 10) {
        if (value.length > 5) {
          value = `${value.slice(0, 5)} ${value.slice(5)}`;
        }
        e.target.value = value;
        props.onChange?.(e);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="tel"
        placeholder="98765 43210"
        leftIcon={
          <span className="text-sm font-medium text-neutral-600">{countryCode}</span>
        }
        onChange={handleChange}
        maxLength={11} // 5 + 1 space + 5
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ 
  length = 6, 
  onComplete, 
  disabled = false 
}) => {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(''));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '')) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < length && !isNaN(Number(pastedData[i]))) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    if (newOtp.every(digit => digit !== '')) {
      onComplete?.(newOtp.join(''));
    }
  };

  return (
    <div className="flex space-x-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            'w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg',
            'focus:outline-none focus:ring-3 focus:ring-primary-500/20 focus:border-primary-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            digit ? 'border-primary-500 bg-primary-50/20' : 'border-neutral-200'
          )}
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
};

// Textarea component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, success, helperText, required, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || `textarea-${generatedId}`;
    const variant = error ? 'error' : success ? 'success' : 'default';

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-600 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <textarea
          className={cn(
            inputVariants({ variant, className }),
            'min-h-[80px] resize-none'
          )}
          ref={ref}
          id={textareaId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textareaId}-error` : 
            success ? `${textareaId}-success` : 
            helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-error-600 flex items-center space-x-1"
            role="alert"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </p>
        )}
        
        {success && !error && (
          <p
            id={`${textareaId}-success`}
            className="text-sm text-success-600 flex items-center space-x-1"
          >
            <CheckCircle className="h-4 w-4" />
            <span>{success}</span>
          </p>
        )}
        
        {helperText && !error && !success && (
          <p
            id={`${textareaId}-helper`}
            className="text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, PhoneInput, OTPInput, Textarea, inputVariants };
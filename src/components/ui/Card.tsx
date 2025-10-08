// Healthcare Card component for MagicMeds
// Accessible card design with medical context styling

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl border bg-white shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 hover:shadow-md',
        medical: 'border-primary-200 bg-primary-50/30',
        emergency: 'border-error-200 bg-error-50/30',
        success: 'border-success-200 bg-success-50/30',
        warning: 'border-warning-200 bg-warning-50/30',
        info: 'border-info-200 bg-info-50/30',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-primary-500/20',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, interactive, className }))}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold text-lg leading-none tracking-tight text-neutral-900', className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-600 leading-relaxed', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 border-t border-neutral-100', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

// Specialized Medical Cards

interface VitalSignsCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
  icon: React.ReactNode;
}

const VitalSignsCard: React.FC<VitalSignsCardProps> = ({
  title,
  value,
  unit,
  status,
  lastUpdated,
  icon,
}) => {
  const statusColors = {
    normal: 'text-success-600 bg-success-50',
    warning: 'text-warning-600 bg-warning-50',
    critical: 'text-error-600 bg-error-50',
  };

  return (
    <Card variant={status === 'critical' ? 'emergency' : 'medical'} className="relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn('p-2 rounded-lg', statusColors[status])}>
              {icon}
            </div>
            <div>
              <p className="text-sm text-neutral-600">{title}</p>
              <p className="text-2xl font-bold text-neutral-900">
                {value} <span className="text-sm font-normal text-neutral-500">{unit}</span>
              </p>
            </div>
          </div>
          <div className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[status])}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-2">Last updated: {lastUpdated}</p>
      </CardContent>
    </Card>
  );
};

interface SymptomCardProps {
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description?: string;
  onEdit?: () => void;
  onRemove?: () => void;
}

const SymptomCard: React.FC<SymptomCardProps> = ({
  symptom,
  severity,
  duration,
  description,
  onEdit,
  onRemove,
}) => {
  const severityColors = {
    mild: 'text-success-600 bg-success-50 border-success-200',
    moderate: 'text-warning-600 bg-warning-50 border-warning-200',
    severe: 'text-error-600 bg-error-50 border-error-200',
  };

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium text-neutral-900">{symptom}</h4>
              <span className={cn('px-2 py-1 rounded-full text-xs font-medium border', severityColors[severity])}>
                {severity}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mb-1">Duration: {duration}</p>
            {description && (
              <p className="text-sm text-neutral-600">{description}</p>
            )}
          </div>
          {(onEdit || onRemove) && (
            <div className="flex space-x-1 ml-4">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-1 text-neutral-400 hover:text-primary-600 transition-colors"
                  aria-label="Edit symptom"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="p-1 text-neutral-400 hover:text-error-600 transition-colors"
                  aria-label="Remove symptom"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  VitalSignsCard,
  SymptomCard,
  cardVariants 
};
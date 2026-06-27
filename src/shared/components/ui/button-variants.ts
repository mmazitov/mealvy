import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
				outline: 'border border-input bg-card hover:bg-muted',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm',
				ghost: 'hover:bg-muted',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2 pointer-coarse:h-11',
				sm: 'h-9 px-3 pointer-coarse:h-11 pointer-coarse:px-4',
				lg: 'h-12 px-8 text-base',
				icon: 'h-10 w-10 pointer-coarse:size-11',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

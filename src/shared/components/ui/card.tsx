import * as React from 'react';

import { cn } from '@/shared/lib/utils/cn';

const Card = ({
	className,
	ref,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
}) => (
	<div
		ref={ref}
		className={cn(
			'bg-card text-card-foreground rounded-lg border shadow-sm',
			className,
		)}
		{...props}
	/>
);
Card.displayName = 'Card';

const CardHeader = ({
	className,
	ref,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
}) => (
	<div
		ref={ref}
		className={cn('flex flex-col space-y-2 p-6', className)}
		{...props}
	/>
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	/** Heading level, so cards can slot into the page's heading hierarchy without skipping levels. */
	as?: 'h2' | 'h3' | 'h4';
	ref?: React.Ref<HTMLHeadingElement>;
}

const CardTitle = ({
	className,
	as: Comp = 'h3',
	ref,
	...props
}: CardTitleProps) => (
	<Comp
		ref={ref}
		className={cn(
			'text-2xl leading-tight font-semibold tracking-tight',
			className,
		)}
		{...props}
	/>
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({
	className,
	ref,
	...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ref?: React.Ref<HTMLParagraphElement>;
}) => (
	<p
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({
	className,
	ref,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
}) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
CardContent.displayName = 'CardContent';

const CardFooter = ({
	className,
	ref,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement>;
}) => (
	<div
		ref={ref}
		className={cn('flex items-center p-6 pt-0', className)}
		{...props}
	/>
);
CardFooter.displayName = 'CardFooter';

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};

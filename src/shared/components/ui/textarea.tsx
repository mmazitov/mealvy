import * as React from 'react';

import { cn } from '@/shared/lib/utils/cn';

/* eslint-disable react/prop-types */
const Textarea = ({
	className,
	placeholder,
	ref,
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	ref?: React.Ref<HTMLTextAreaElement>;
}) => {
	return (
		<textarea
			className={cn(
				'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring hover:border-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			placeholder={placeholder}
			ref={ref}
			{...props}
		/>
	);
};
Textarea.displayName = 'Textarea';

export { Textarea };

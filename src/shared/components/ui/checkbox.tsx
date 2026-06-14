import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import * as React from 'react';
import { PiCheckBold as Check } from 'react-icons/pi';

import { Label } from './label';

interface Props extends React.ComponentPropsWithoutRef<
	typeof CheckboxPrimitive.Root
> {
	label?: string;
	subLabel?: string;
}

const Checkbox = ({ label, subLabel, className, ...props }: Props) => {
	return (
		<label className="flex cursor-pointer items-center justify-between gap-2 select-none">
			<div className="flex flex-col">
				{label && <Label>{label}</Label>}{' '}
				{subLabel && (
					<p className="text-muted-foreground text-sm">{subLabel}</p>
				)}
			</div>
			<CheckboxPrimitive.Root
				className={clsx(
					'peer border-input bg-background h-5 min-w-5 rounded-sm border',
					'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
					'data-[state=unchecked]:bg-background',
					'focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
					className,
				)}
				{...props}
			>
				<CheckboxPrimitive.Indicator className="text-primary-foreground flex items-center justify-center">
					<Check size={16} strokeWidth={3} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		</label>
	);
};

export { Checkbox };

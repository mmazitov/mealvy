import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/shared/lib/utils/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = ({
	className,
	...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.List>) => (
	<TabsPrimitive.List
		className={cn(
			'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1',
			className,
		)}
		{...props}
	/>
);
TabsList.displayName = TabsPrimitive.List.displayName;

const defaultStyles =
	'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all';
const activeStyles =
	'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm';
const hoverStyles =
	'hover:bg-background hover:text-foreground hover:shadow-sm hover:cursor-pointer';
const focusStyles =
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50';

const TabsTrigger = ({
	className,
	...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) => (
	<TabsPrimitive.Trigger
		className={cn(
			defaultStyles,
			activeStyles,
			hoverStyles,
			focusStyles,
			disabledStyles,
			className,
		)}
		{...props}
	/>
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({
	className,
	...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Content>) => (
	<TabsPrimitive.Content
		className={cn(
			'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
			className,
		)}
		{...props}
	/>
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

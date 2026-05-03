import { Tabs, TabsList, TabsTrigger } from '@/shared/components';

interface Category {
	id: string | number;
	name: string;
	disabled?: boolean;
}

interface FilterProps {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	categories: Category[];
	tabListClassName?: string;
}

const Filter = ({
	selectedCategory,
	onCategoryChange,
	categories,
	tabListClassName,
}: FilterProps) => {
	return (
		<Tabs value={selectedCategory} onValueChange={onCategoryChange}>
			<TabsList
				className={`w-full justify-start overflow-x-auto ${tabListClassName}`}
			>
				{categories.map((category) => (
					<TabsTrigger
						key={category.id}
						value={category.name}
						disabled={category.disabled}
					>
						{category.name}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default Filter;

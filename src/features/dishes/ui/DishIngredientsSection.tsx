import { PiMinusBold as Minus, PiPlusBold as Plus } from 'react-icons/pi';

import { ProductFieldsFragment } from '@/shared/api/graphql';
import { FormInput } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select';
import { FormIngredient } from '@/shared/types';

interface DishIngredientsSectionProps {
	ingredients: FormIngredient[];
	ingredientIds: string[];
	addIngredient: () => void;
	removeIngredient: (index: number) => void;
	getSearchQuery: (index: number) => string;
	handleSearchChange: (index: number, value: string) => void;
	handleProductSelect: (index: number, value: string) => void;
	getFilteredProducts: (index: number) => ProductFieldsFragment[];
	updateIngredient: (index: number, updates: Partial<FormIngredient>) => void;
}

const DishIngredientsSection = ({
	ingredients,
	ingredientIds,
	addIngredient,
	removeIngredient,
	getSearchQuery,
	handleSearchChange,
	handleProductSelect,
	getFilteredProducts,
	updateIngredient,
}: DishIngredientsSectionProps) => {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label>Інгредієнти</Label>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={addIngredient}
					aria-label="Додати інгредієнт"
				>
					<Plus className="mr-1 h-4 w-4" aria-hidden="true" />
					Додати
				</Button>
			</div>
			{ingredients.map((ingredient: FormIngredient, index: number) => (
				<div
					key={ingredientIds[index]}
					className="grid gap-2"
					style={{
						gridTemplateColumns: '1fr 128px 40px',
					}}
				>
					<Select
						value={ingredient.name}
						onValueChange={(value) => handleProductSelect(index, value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Виберіть продукт" />
						</SelectTrigger>
						<SelectContent>
							<div className="px-2 pb-2">
								<Input
									placeholder="Пошук продукту..."
									value={getSearchQuery(index)}
									onChange={(e) => handleSearchChange(index, e.target.value)}
									className="h-8"
									onClick={(e) => e.stopPropagation()}
									onKeyDown={(e) => e.stopPropagation()}
									onKeyUp={(e) => e.stopPropagation()}
									autoFocus
									aria-label="Пошук продукту"
								/>
							</div>
							<div className="max-h-50 overflow-y-auto">
								{getFilteredProducts(index).length > 0 ? (
									getFilteredProducts(index).map(
										(product: ProductFieldsFragment) => (
											<SelectItem key={product.id} value={product.name}>
												{product.name}
											</SelectItem>
										),
									)
								) : (
									<div className="text-muted-foreground px-2 py-6 text-center text-sm">
										Продукт не знайдено
									</div>
								)}
							</div>
						</SelectContent>
					</Select>
					<FormInput
						id={`ingredient-amount-${index}`}
						inputProps={{
							placeholder: 'Кількість',
							value: ingredient.amount,
							onChange: (e) =>
								updateIngredient(index, { amount: e.target.value }),
							'aria-label': `Кількість інгредієнту ${index + 1}`,
						}}
					/>
					{ingredients.length > 1 ? (
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => removeIngredient(index)}
							aria-label={`Видалити інгредієнт ${index + 1}`}
						>
							<Minus className="h-4 w-4" aria-hidden="true" />
						</Button>
					) : (
						<div />
					)}
				</div>
			))}
		</div>
	);
};

export default DishIngredientsSection;

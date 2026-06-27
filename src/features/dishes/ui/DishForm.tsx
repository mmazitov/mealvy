import { useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import DishIngredientsSection from './DishIngredientsSection';
import DishInstructionsSection from './DishInstructionsSection';
import DishNutritionCard from './DishNutritionCard';
import { useAddDish, useEditDish } from '../hooks/useDish';

import { useProductSearch } from '@/features/products';
import {
	DishFieldsFragment,
	ProductFieldsFragment,
} from '@/shared/api/graphql';
import { FormInput } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select';
import { CATEGORIES_DISHES } from '@/shared/constants';
import {
	calculateNutrition,
	createProductsMap,
	parseIngredients,
} from '@/shared/lib/utils';
import { FormIngredient } from '@/shared/types';

interface DishFormProps {
	dish?: DishFieldsFragment | null;
	products: ProductFieldsFragment[];
	isEditMode?: boolean;
}

const DishForm = ({ dish, products, isEditMode = false }: DishFormProps) => {
	const productsByName = useMemo(() => createProductsMap(products), [products]);

	const existingIngredients = useMemo(() => {
		if (!dish?.ingredients) return undefined;
		return parseIngredients(dish.ingredients, productsByName);
	}, [dish?.ingredients, productsByName]);

	const existingInstructions = dish?.instructions;

	const addDishHook = useAddDish();
	const editDishHook = useEditDish(
		dish?.id || '',
		dish
			? {
					name: dish.name,
					category: dish.category || '',
					imageUrl: dish.imageUrl || '',
					calories: dish.calories || 0,
					protein: dish.protein || 0,
					fat: dish.fat || 0,
					carbs: dish.carbs || 0,
					prepTime: dish.prepTime || 0,
					servings: dish.servings || 0,
					description: dish.description || '',
				}
			: undefined,
		dish
			? {
					ingredients: existingIngredients,
					instructions: existingInstructions,
				}
			: undefined,
	);

	const {
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		loading,
		ingredientsList,
		instructionsList,
		setValue,
	} = isEditMode ? editDishHook : addDishHook;

	const {
		items: ingredients,
		ids: ingredientIds,
		addItem: addIngredient,
		removeItem: removeIngredient,
		updateItem: updateIngredient,
	} = ingredientsList;

	const {
		items: instructions,
		ids: instructionIds,
		addItem: addInstruction,
		removeItem: removeInstruction,
		updateItem: updateInstruction,
	} = instructionsList;

	const calculatedNutrition = useMemo(() => {
		const ingredientsWithNutrition = ingredients.map(
			(ingredient: FormIngredient) => {
				const product = productsByName.get(ingredient.name);
				return {
					amount: ingredient.amount,
					nutrition: product
						? {
								calories: product.calories ?? 0,
								protein: product.protein ?? 0,
								fat: product.fat ?? 0,
								carbs: product.carbs ?? 0,
							}
						: null,
				};
			},
		);

		return calculateNutrition(ingredientsWithNutrition);
	}, [ingredients, productsByName]);

	useEffect(() => {
		setValue('calories', calculatedNutrition.calories);
		setValue('protein', calculatedNutrition.protein);
		setValue('fat', calculatedNutrition.fat);
		setValue('carbs', calculatedNutrition.carbs);
	}, [calculatedNutrition, setValue]);

	const {
		handleSearchChange,
		getFilteredProducts,
		handleProductSelect,
		getSearchQuery,
	} = useProductSearch({
		products,
		updateIngredient,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-2 md:grid-cols-[1fr_260px_170px] md:grid-rows-[auto]">
				<FormInput
					id="name"
					label="Назва страви *"
					error={errors.name}
					registration={register('name')}
					className="col-span-2 md:col-span-1"
					inputProps={{
						placeholder: 'Наприклад: Вівсяна каша',
					}}
				/>

				<div className="space-y-2">
					<Label htmlFor="category">Категорія *</Label>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger
									id="category"
									aria-invalid={errors.category ? 'true' : 'false'}
									aria-describedby={
										errors.category ? 'category-error' : undefined
									}
								>
									<SelectValue placeholder="Виберіть категорію" />
								</SelectTrigger>
								<SelectContent>
									{CATEGORIES_DISHES.slice(1).map((category) => (
										<SelectItem key={category.id} value={category.name}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.category && (
						<p
							id="category-error"
							role="alert"
							className="text-destructive text-sm font-medium"
						>
							{errors.category.message}
						</p>
					)}
				</div>
				<FormInput
					id="prepTime"
					label="Час приготування (хв) *"
					error={errors.prepTime}
					registration={register('prepTime', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
						type: 'number',
					}}
				/>
			</div>

			<FormInput
				id="imageUrl"
				label="URL зображення"
				error={errors.imageUrl}
				registration={register('imageUrl')}
				inputProps={{
					placeholder: 'https://...',
					type: 'url',
				}}
			/>

			<FormInput
				itemType="textarea"
				id="description"
				label="Опис"
				error={errors.description}
				registration={register('description')}
				textareaProps={{
					placeholder: 'Короткий опис страви...',
				}}
			/>

			<DishNutritionCard nutrition={calculatedNutrition} />

			<DishIngredientsSection
				ingredients={ingredients}
				ingredientIds={ingredientIds}
				addIngredient={addIngredient}
				removeIngredient={removeIngredient}
				getSearchQuery={getSearchQuery}
				handleSearchChange={handleSearchChange}
				handleProductSelect={handleProductSelect}
				getFilteredProducts={getFilteredProducts}
				updateIngredient={updateIngredient}
			/>

			<DishInstructionsSection
				instructions={instructions}
				instructionIds={instructionIds}
				addInstruction={addInstruction}
				removeInstruction={removeInstruction}
				updateInstruction={updateInstruction}
			/>

			<div className="flex flex-col gap-2 md:flex-row">
				<Button type="submit" size="lg" className="w-full" disabled={loading}>
					{loading
						? isEditMode
							? 'Оновлення...'
							: 'Додавання...'
						: isEditMode
							? 'Оновити страву'
							: 'Додати страву'}
				</Button>
				<Link to="/dishes" className="w-full">
					<Button type="button" variant="outline" size="lg" className="w-full">
						Скасувати
					</Button>
				</Link>
			</div>
		</form>
	);
};

export default DishForm;

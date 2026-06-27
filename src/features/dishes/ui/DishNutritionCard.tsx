import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card';

interface DishNutrition {
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
}

interface DishNutritionCardProps {
	nutrition: DishNutrition;
}

const DishNutritionCard = ({ nutrition }: DishNutritionCardProps) => {
	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-base">
					Поживна цінність (розраховується автоматично)
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
					<div className="bg-muted rounded-lg p-3 text-center">
						<div className="text-primary text-2xl font-bold">
							{nutrition.calories}
						</div>
						<div className="text-muted-foreground text-xs">Калорії</div>
					</div>
					<div className="bg-muted rounded-lg p-3 text-center">
						<div className="text-secondary text-2xl font-bold">
							{nutrition.protein}г
						</div>
						<div className="text-muted-foreground text-xs">Білки</div>
					</div>
					<div className="bg-muted rounded-lg p-3 text-center">
						<div className="text-accent text-2xl font-bold">
							{nutrition.fat}г
						</div>
						<div className="text-muted-foreground text-xs">Жири</div>
					</div>
					<div className="bg-muted rounded-lg p-3 text-center">
						<div className="text-primary text-2xl font-bold">
							{nutrition.carbs}г
						</div>
						<div className="text-muted-foreground text-xs">Вуглеводи</div>
					</div>
				</div>
				<p className="text-muted-foreground mt-3 text-xs">
					💡 Підтримувані одиниці: г, шт, ст.л., ч.л., склянка, мл, кг
					(наприклад: 100г, 2 шт, 1 ст.л.)
				</p>
			</CardContent>
		</Card>
	);
};

export default DishNutritionCard;

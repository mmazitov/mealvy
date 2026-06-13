import {
	PiFireBold as Flame,
	PiForkKnifeBold as Utensils,
} from 'react-icons/pi';

interface StatsProps {
	totalDishes: number;
	totalCalories: number;
	totalProtein: number;
	totalFat: number;
	totalCarbs: number;
}

const Stats = ({
	totalDishes,
	totalCalories,
	totalProtein,
	totalFat,
	totalCarbs,
}: StatsProps) => {
	return (
		<div className="space-y-2">
			<div className="text-muted-foreground flex items-center gap-4 text-sm">
				<div className="flex items-center gap-1">
					<Utensils className="h-4 w-4" />
					<span>{totalDishes} страв</span>
				</div>
				<div className="flex items-center gap-1">
					<Flame className="h-4 w-4" />
					<span>{totalCalories.toLocaleString()} ккал</span>
				</div>
			</div>
			<div className="text-muted-foreground flex gap-3 text-xs">
				<span>Б: {totalProtein}г</span>
				<span>Ж: {totalFat}г</span>
				<span>В: {totalCarbs}г</span>
			</div>
		</div>
	);
};

export default Stats;

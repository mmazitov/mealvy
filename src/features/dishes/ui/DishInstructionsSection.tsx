import { PiXBold as X } from 'react-icons/pi';
import { PiPlusBold as Plus } from 'react-icons/pi';

import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';

interface DishInstructionsSectionProps {
	instructions: string[];
	instructionIds: string[];
	addInstruction: () => void;
	removeInstruction: (index: number) => void;
	updateInstruction: (index: number, value: string) => void;
}

const DishInstructionsSection = ({
	instructions,
	instructionIds,
	addInstruction,
	removeInstruction,
	updateInstruction,
}: DishInstructionsSectionProps) => {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label>Кроки приготування</Label>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={addInstruction}
					aria-label="Додати крок приготування"
				>
					<Plus className="mr-1 h-4 w-4" aria-hidden="true" />
					Додати крок
				</Button>
			</div>
			{instructions.map((instruction: string, index: number) => (
				<div key={instructionIds[index]} className="flex items-start gap-2">
					<span className="bg-primary text-primary-foreground mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
						{index + 1}
					</span>
					<Textarea
						placeholder="Опишіть крок приготування..."
						value={instruction}
						onChange={(e) => updateInstruction(index, e.target.value)}
						rows={2}
						className="flex-1"
						aria-label={`Крок ${index + 1}`}
					/>
					{instructions.length > 1 && (
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => removeInstruction(index)}
							className="mt-2"
							aria-label={`Видалити крок ${index + 1}`}
						>
							<X className="h-4 w-4" aria-hidden="true" />
						</Button>
					)}
				</div>
			))}
		</div>
	);
};

export default DishInstructionsSection;

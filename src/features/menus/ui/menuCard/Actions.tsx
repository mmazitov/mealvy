import {
	PiCopyBold as Copy,
	PiDotsThreeVerticalBold as EllipsisVertical,
	PiEyeBold as Eye,
	PiPencilSimpleBold as Pencil,
	PiTrashBold as Trash2,
} from 'react-icons/pi';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	FavoriteButton,
} from '@/shared/components';

interface ActionsProps {
	onView: () => void;
	onEdit: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
	onToggleFavorite: () => void;
	isFavorite: boolean;
	// Shared menus belong to a family member: only view, favorite and duplicate
	// (which copies into the current user's own menus) are allowed.
	isShared?: boolean;
}

const Actions = ({
	onView,
	onEdit,
	onDuplicate,
	onDelete,
	onToggleFavorite,
	isFavorite,
	isShared = false,
}: ActionsProps) => {
	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					className="flex-1"
					onClick={(e) => {
						e.preventDefault();
						onView();
					}}
					aria-label="Переглянути меню"
				>
					<Eye className="mr-1 h-4 w-4" />
					Переглянути
				</Button>
				<FavoriteButton
					isFavorite={isFavorite}
					onClick={onToggleFavorite}
					variant="inline"
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" aria-label="Більше дій">
						<EllipsisVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{!isShared && (
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault();
								onEdit();
							}}
						>
							<Pencil className="mr-2 h-4 w-4" />
							Редагувати
						</DropdownMenuItem>
					)}
					<DropdownMenuItem
						onClick={(e) => {
							e.preventDefault();
							onDuplicate();
						}}
					>
						<Copy className="mr-2 h-4 w-4" />
						Дублювати
					</DropdownMenuItem>
					{!isShared && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={(e) => {
									e.preventDefault();
									onDelete();
								}}
								className="text-destructive hover:text-(--color-destructive-foreground)"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Видалити
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Actions;

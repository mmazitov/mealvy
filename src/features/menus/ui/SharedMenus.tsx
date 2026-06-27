import { useMemo, useState } from 'react';
import { PiHeartBold as Heart, PiUsersBold as Users } from 'react-icons/pi';

import { useSavedMenuActions } from '../hooks/useSavedMenuActions';
import { useSharedMenus } from '../hooks/useSharedMenus';
import MenuCard from './menuCard/MenuCard';
import MenuCardSkeleton from './menuCard/MenuCardSkeleton';

import { Button } from '@/shared/components';
import { ITEMS_PER_PAGE } from '@/shared/constants';

const SharedMenus = () => {
	const { menus, loading } = useSharedMenus();
	const { handleDelete, handleDuplicate } = useSavedMenuActions();
	const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

	const filteredMenus = useMemo(
		() => (showOnlyFavorites ? menus.filter((menu) => menu.isFavorite) : menus),
		[menus, showOnlyFavorites],
	);

	if (loading) {
		return (
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
					<MenuCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (menus.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="bg-muted mb-4 rounded-full p-4">
					<Users className="text-muted-foreground h-8 w-8" />
				</div>
				<h3 className="mb-2 text-xl font-semibold">Немає спільних меню</h3>
				<p className="text-muted-foreground mb-4">
					{"Тут з'являться меню учасників вашої сім'ї"}
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="mb-6">
				<Button
					variant={showOnlyFavorites ? 'default' : 'outline'}
					onClick={() => setShowOnlyFavorites((prev) => !prev)}
					className="w-40"
				>
					<Heart />
					{showOnlyFavorites ? 'Показати всі' : 'Тільки обрані'}
				</Button>
			</div>

			{filteredMenus.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<div className="bg-muted mb-4 rounded-full p-4">
						<Heart className="text-muted-foreground h-8 w-8" />
					</div>
					<h3 className="mb-2 text-xl font-semibold">Немає обраних меню</h3>
					<p className="text-muted-foreground mb-4">
						Додайте меню до обраних, натиснувши на іконку серця
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{filteredMenus.map((menu) => (
						<MenuCard
							key={menu.id}
							menu={menu}
							onDelete={handleDelete}
							onDuplicate={handleDuplicate}
							isShared
						/>
					))}
				</div>
			)}
		</>
	);
};

export default SharedMenus;

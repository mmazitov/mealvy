import { useParams } from 'react-router-dom';

import { useSavedMenuQuery } from '@/shared/api/graphql';
import { Breadcrumb, MetaData, PageTitle } from '@/shared/components';
import { Loader } from '@/shared/components/loader';
import { METADATA_CONFIG } from '@/shared/lib/config';

const MenuDetail = () => {
	const { id } = useParams<{ id: string }>();

	const { data, loading, error } = useSavedMenuQuery({
		variables: { id: id! },
		skip: !id,
	});

	if (loading) {
		return <Loader />;
	}

	if (error || !data?.savedMenu) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Меню не знайдено
				</div>
			</div>
		);
	}

	const menu = data.savedMenu;

	const getWeekLabelFromNumber = (weekNum: number) => {
		if (weekNum === 0) return 'Поточний тиждень';
		if (weekNum > 0) return `Тиждень +${weekNum}`;
		return `Тиждень ${weekNum}`;
	};

	const breadcrumbItems = [
		{ name: 'Головна', url: '/' },
		{ name: 'Меню', url: '/menus' },
		{ name: menu.name, url: `/menus/${menu.id}` },
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={`${menu.name} | ${METADATA_CONFIG.titles.menu}`}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>

			<Breadcrumb items={breadcrumbItems} />

			<PageTitle
				title={menu.name}
				subtitle={`${getWeekLabelFromNumber(menu.weekNumber)} • ${menu.totalDishes} страв • ${menu.totalCalories.toLocaleString()} ккал`}
				buttonVisible={false}
			/>

			<div className="mt-6">
				<p className="text-muted-foreground">
					Детальний перегляд меню буде реалізовано в наступній ітерації
				</p>
			</div>
		</div>
	);
};

export default MenuDetail;

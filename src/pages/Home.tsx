import { FeaturedDishes } from '@/features/dishes';
import { Hero, MetaData, QuickActions, Stats } from '@/shared/components';
import { useOrganizationSchema } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Home = () => {
	useOrganizationSchema();

	return (
		<>
			<MetaData
				title={METADATA_CONFIG.titles.home}
				description={METADATA_CONFIG.descriptions.home}
				keywords={METADATA_CONFIG.keywords.home}
				type="website"
			/>
			<section
				className="relative overflow-hidden"
				style={{ background: 'var(--gradient-hero)' }}
			>
				<Hero />
			</section>

			<section className="container mx-auto px-4 py-12 md:py-16">
				<QuickActions />
			</section>

			<section className="container mx-auto px-4 py-12 md:py-16">
				<FeaturedDishes />
			</section>

			<section className="container mx-auto px-4 py-12 md:py-16">
				<Stats />
			</section>
		</>
	);
};

export default Home;

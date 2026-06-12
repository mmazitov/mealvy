const APP_VERSION = 'BUILD_HASH_PLACEHOLDER';
const DATA_VERSION = 'v1';

const CACHES = {
	APP_SHELL: `app-shell-${APP_VERSION}`,
	STATIC: `static-${APP_VERSION}`,
	DISHES: `dishes-${DATA_VERSION}`,
	PRODUCTS: `products-${DATA_VERSION}`,
	PLANS: `meal-plans-${DATA_VERSION}`,
	IMAGES: `images-${DATA_VERSION}`,
	QUEUE: `offline-queue-${DATA_VERSION}`,
};

// IMAGES is the only unbounded cache-first bucket — cap it so Cache Storage
// doesn't grow forever
const MAX_IMAGE_CACHE_ENTRIES = 100;

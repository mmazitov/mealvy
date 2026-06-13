import { useState } from 'react';
import { toast } from 'sonner';

import { useMeQuery, useUpdateProfileMutation } from '@/shared/api/graphql';
import { normalizePhone, phoneValidate } from '@/shared/lib/utils';
import { ProfileFormData } from '@/shared/types';

export const useProfile = () => {
	const { data, refetch } = useMeQuery();
	const [updateProfile, { loading: updating }] = useUpdateProfileMutation();
	const [isEditMode, setIsEditMode] = useState(false);
	const [formData, setFormData] = useState<ProfileFormData>({
		name: '',
		phone: '',
		diet: '',
		allergy: '',
		dislike: '',
	});

	const user = data?.me;

	const handleEdit = () => {
		setIsEditMode(true);
		setFormData({
			name: user?.name || '',
			phone: user?.phone || '',
			diet: user?.diet || '',
			allergy: user?.allergy?.join(', ') || '',
			dislike: user?.dislike?.join(', ') || '',
		});
	};

	const handleCancel = () => {
		setIsEditMode(false);
		setFormData({
			name: '',
			phone: '',
			diet: '',
			allergy: '',
			dislike: '',
		});
	};

	const handleSave = async () => {
		if (formData.phone && !phoneValidate(formData.phone)) {
			toast.error('Помилка валідації', {
				description: 'Введіть коректний український номер телефону',
			});
			return;
		}

		try {
			const normalizedPhone = formData.phone
				? normalizePhone(formData.phone)
				: undefined;

			const allergyArray =
				typeof formData.allergy === 'string'
					? formData.allergy
							.split(',')
							.map((item) => item.trim())
							.filter(Boolean)
					: formData.allergy || [];

			const dislikeArray =
				typeof formData.dislike === 'string'
					? formData.dislike
							.split(',')
							.map((item) => item.trim())
							.filter(Boolean)
					: formData.dislike || [];

			await updateProfile({
				variables: {
					name: formData.name || undefined,
					phone: normalizedPhone,
					diet: formData.diet || undefined,
					allergy: allergyArray.length > 0 ? allergyArray : undefined,
					dislike: dislikeArray.length > 0 ? dislikeArray : undefined,
				},
			});

			await refetch();

			toast.success('Профіль оновлено', {
				description: 'Ваші зміни успішно збережені',
			});

			setIsEditMode(false);
		} catch (error) {
			if (import.meta.env.DEV)
				console.error('Failed to update profile:', error);
			toast.error('Помилка', {
				description: 'Не вдалося оновити профіль',
			});
		}
	};

	const updateFormData = (field: keyof ProfileFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return {
		user,
		formData,
		isEditMode,
		updating,
		handleEdit,
		handleCancel,
		handleSave,
		updateFormData,
	};
};

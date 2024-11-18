import { messageFormatter } from '@/utils';

interface CreateFormattedOptionsProps<T> {
	data: T[];
	formatOptions: {
		templateShowFormat?: string;
		templateValueFormat?: Record<string, keyof T>;
	};
}

const createFormattedOptions = <T>({ data, formatOptions }: CreateFormattedOptionsProps<T>) => {
	const { templateShowFormat = '', templateValueFormat = {} } = formatOptions;

	return data.map((item) => {
		// Getting the formatted name from templateShowFormat.
		const formattedName = messageFormatter({
			template: templateShowFormat,
			data: item,
			options: {
				removeEmptyFields: true,
				trimWhitespace: true,
			},
		});

		// Getting formatted values by keys from templateValueFormat.
		const formattedValue = Object.keys(templateValueFormat).reduce(
			(valuesAcc, key) => {
				const fieldKey = templateValueFormat[key];

				if (item[fieldKey]) {
					valuesAcc[key] = item[fieldKey];
				} else {
					console.warn(`formatData: Missing key "${String(fieldKey)}" in item: ${JSON.stringify(item)}`);
				}

				return valuesAcc;
			},
			{} as Record<string, T[keyof T]>,
		);

		return {
			name: formattedName,
			value: formattedValue,
		};
	});
};

export default createFormattedOptions;

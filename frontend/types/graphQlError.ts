export interface GraphQlError {
	response: {
		errors: {
			message: string;
			locations: [
				{
					line: number;
					column: number;
				}
			];
			path: string[];
			extensions: {
				code: string;
				exception: {
					stacktrace: string[];
				};
			};
		}[];
		headers: {
			map: {
				[key: string]: string;
			};
		};
		status: number;
	};
}

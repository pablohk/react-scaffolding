import React from 'react';
export type TAction = {
	type: string;
	data: any;
};
export type TDispatch = (action: TAction) => void;

export type TState = {
	inactive: boolean;
	userProfiling: {
		radicalList: any[];
		radicalInvestment: string;
		radicalId: string;
		radicalCli: string;
		jurisdiction: string;
		descriptionName: string;
		nombre: string;
		apellido: string;
		tipges: string;
	};
};
export type TAppProviderProps = { children: React.ReactNode };

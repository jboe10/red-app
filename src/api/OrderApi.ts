import axios from 'axios';
import { Guid } from 'guid-typescript';
const BACKEND_URI = 'https://red-backend1.azurewebsites.net/api/Order';

const getOne = async (id: Guid) => {
	const odrer = await axios.get(`${BACKEND_URI}?guid=${id}`);
};

export const deleteOne = async (id: Guid) => {
	const response = await axios.delete(`${BACKEND_URI}/${id}`);
	return response;
};

export const getMany = async (type: OrderType | -1 = -1, name: string = '') => {
	try {
		console.log(type);
		if (type >= 0 && name != '') {
			const response = await axios.get(
				`${BACKEND_URI}?user=${name}&orderType=${type}`
			);
			return response.data;
		} else if (name != '') {
			const response = await axios.get(`${BACKEND_URI}?user=${name}`);
			return response.data;
		} else if (type >= 0) {
			const response = await axios.get(`${BACKEND_URI}?orderType=${type}`);
			return response.data;
		}
		const response = await axios.get(`${BACKEND_URI}`);
		return response.data;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const update = async (order: any) => {
	const result = await axios.put(BACKEND_URI, order);
	return result;
};
export const create = async (order: any) => {
	const result = await axios.post(BACKEND_URI, order);
	return result;
	console.log(result);
};

export enum OrderType {
	Standard,
	SaleOrder,
	PurchaseOrder,
	TransferOrder,
	ReturnOrder,
}
export interface Order {
	id: Guid;
	type: OrderType;
	customerName: string;
	createdByUsername: string;
	dateCreated: string;
}

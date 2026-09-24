import { toast } from "@tamagui/toast/v2";
import axios from "axios";

export const api = axios.create({
	baseURL: "/api",
});

// リクエスト
api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// レスポンス
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		error.message && toast.error(error.message);
		return Promise.reject(error);
	},
);

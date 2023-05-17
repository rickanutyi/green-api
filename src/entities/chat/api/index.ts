import { UserData } from "entities/user/types";
import { apiInstance } from "shared/api";
import endpoints from "shared/api/endpoints";
import { Message, MessageDTO } from "../types";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "shared/config";

export default {
    getMessages(data: UserData) {
        const url = endpoints.resiveNotification(data);
        return apiInstance.get<Message>(url);
    },
    deleteNotification(data: UserData & { receiptId: number }) {
        const url = endpoints.deleteNotification(data);
        return apiInstance.delete(url);
    },
    sendMessage(data: UserData, messageData: MessageDTO) {
        const url = endpoints.sendMessage(data);
        return apiInstance.post<{idMessage: string}>(url, messageData);
    },
    getInstance(data: UserData) {
        const url = endpoints.stateInstance(data)
        return apiInstance.get(url)
    }
};

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
    endpoints: (builder) => ({
        getNotification: builder.query<Message, UserData | null>({
            query: (data: UserData | null) => data ? endpoints.resiveNotification(data) : '',
        }),
    }),
});

export const { useGetNotificationQuery } = notificationApi
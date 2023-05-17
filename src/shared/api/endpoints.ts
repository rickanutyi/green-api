import { UserData } from "entities/user/types";


interface DeleteProps extends UserData {
  receiptId: number;
}

export default {
  sendMessage: ({ apiTokenInstance, idInstance }: UserData) =>
    `waInstance${idInstance}/SendMessage/${apiTokenInstance}`, //post

  resiveNotification: ({ apiTokenInstance, idInstance }: UserData) =>
    `waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`, //get

  deleteNotification: ({
    receiptId,
    apiTokenInstance,
    idInstance,
  }: DeleteProps) =>
    `waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`, //delete
  stateInstance: ({ apiTokenInstance, idInstance }: UserData) => `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
};

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const DeleteConfirmation = (dispatch: any, documentId: number) => {
  confirmAlert({
    title: "Подтверждение действия",
    message: "Вы уверены, что хотите удалить документ?",
    buttons: [
      {
        label: "Yes",
        onClick: () => dispatch(documentId),
      },
      {
        label: "No",
      },
    ],
  });
};

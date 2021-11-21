import apiClient from "src/services/api";

export const getFile = (idName, idValue, fileName, fileUrl) => {
  apiClient
    .get("/" + fileUrl, {
      params: { userID: localStorage.getItem("userID"), [idName]: idValue },
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const type = response?.headers["content-type"];
      const blob = new Blob([response?.data], {
        type: type,
        encoding: "UTF-8",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
};

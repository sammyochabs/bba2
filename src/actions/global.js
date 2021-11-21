// set active option on update
export const setActiveOption = (option, selectedOption) => {
  return selectedOption === option ? true : false;
};

// check values before update sending request
export const checkBeforeUpdate = (newValue, currentValue) => {
  return newValue === undefined ? currentValue : newValue;
};

// clear modal input
export const clearModalForm = (modalType, value) => {
  return modalType === "Add" ? "" : value;
};

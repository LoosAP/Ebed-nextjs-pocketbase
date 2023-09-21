import React from "react";

const OrderChecked = ({
  item,
  onRefresh,
  selected,
  setSelected,
  handleSelect,
}) => {
  return (
    <input
      type="checkbox"
      checked={selected.some((selectedItem) => selectedItem.id === item.id)}
      onChange={() => {
        handleSelect(item);
      }}
    ></input>
  );
};

export default OrderChecked;

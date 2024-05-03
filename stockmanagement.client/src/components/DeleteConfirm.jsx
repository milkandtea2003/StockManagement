import { DeleteFilled } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import axios from "axios";
import { API_DELETESTOCK } from "config/envConfig";
import React from "react";

const DeletePop = ({ record, actionRef }) => {
  const waitTime = (time = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const confirm = async () => {
    try {
      await waitTime(1000);
      const StockId = record.stock_ID;
      const response = await axios.delete(`${API_DELETESTOCK}?id=${StockId}`);
      message.success(response.data.message);

      actionRef?.current?.reload();
      return Promise.resolve({
        success: true,
      });
    } catch (error) {
      message.error("Failed to delete: " + error.message);
      return Promise.resolve({
        success: false,
      });
    }
  };

  const cancel = () => {};

  return (
    <Popconfirm
      title="Delete the stock"
      description="Are you sure to delete this Stock?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <DeleteFilled style={{ color: "#ff0000", fontSize : "1.1rem" }} />
    </Popconfirm>
  );
};

export default DeletePop;

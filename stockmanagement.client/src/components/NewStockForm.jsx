import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, message, Image } from "antd";
import axios from "axios";
import { API_NEWSTOCK } from "config/envConfig";
import React, { useState } from "react";

const NewStockForm = ({ actionRef }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const waitTime = (time = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      const {Stock_Image} = values

      var base64Images = Stock_Image[0].thumbUrl
      formData.append("Stock_Image", base64Images);
      for (const key in values) {
        if (key !== "Stock_Image") {
          formData.append(key, values[key]);
        }
      }

      const response = await axios.post(`${API_NEWSTOCK}`, formData);
      message.success(response.data.message);
      actionRef.current.reload();
      return true;
    } catch (error) {
      console.log(error);
      message.error("Failed to submit form");
      return false;
    }
};


  return (
    <ModalForm
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      title={
        <p style={{ justifyContent: "center", display: "flex" }}>新建表单</p>
      }
      onFinish={onFinish}
      trigger={<Button type="primary">新建表单</Button>}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Stock_Name"
          label="货物名称"
          placeholder="请输入货物"
          rules={[
            {
              required: true,
            },
          ]}
        ></ProFormText>
        <ProFormUploadButton
          label="上传照片"
          name="Stock_Image"
          title="上传照片"
          max={1}
          accept=".png,.jpg,.jpeg"
          fieldProps={{
            onPreview: handlePreview,
            listType: "picture-card",
            beforeUpload: () => false 
          }}
        />
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
        <ProFormSelect
          width="md"
          name="category"
          label="货物种类"
          placeholder="请选择种类"
          options={[
            {
              value: "Flower",
              label: "Flower",
            },
            {
              value: "Pot",
              label: "Pot",
            },
            {
              value: "Soil",
              label: "Soil",
            },
          ]}
          rules={[{ required: true }]}
        ></ProFormSelect>
        <ProFormDigit
          name="quantity"
          width="md"
          label="数量"
          placeholder="请输入数量"
          rules={[{ required: true, type: "number" }]}
        ></ProFormDigit>
        <ProFormMoney
          name="price"
          width="md"
          label="价钱"
          locale="ms-MY"
          placeholder="限制金额最小为0"
          rules={[
            {
              required: true,
              type: "number",
              message: "请输入不少过1的价钱",
              min: 1,
            },
          ]}
        ></ProFormMoney>
      </ProForm.Group>
    </ModalForm>
  );
};
export default NewStockForm;

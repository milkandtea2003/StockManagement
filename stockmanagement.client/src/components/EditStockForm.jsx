import { EditFilled } from "@ant-design/icons";
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, Image } from "antd";
import axios from "axios";
import { API_EDITSTOCK } from "config/envConfig";
import React, { useState } from "react";

const EditButton = ({ record, actionRef }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: `data:image/png;base64,${record.stock_Image}`,
    },
  ]);

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

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = async (values) => {
    // console.log(record.stock_Image)
    try {
      const formData = new FormData();
      // console.log(values);
      let base64Images;
      if (values.Stock_Image && values.Stock_Image.length > 0) {
        if (values.Stock_Image[0].thumbUrl !== record.stock_Image.url) {
          base64Images = values.Stock_Image[0].thumbUrl;
          // console.log("User selected a different image");
        } else {
          // console.log("User did not change the image");
          base64Images = `data:image/png;base64,${record.stock_Image}`;
        }
      } else {
        base64Images = `data:image/png;base64,${record.stock_Image}`;
      }

      // console.log(base64Images)
      formData.append("Stock_Image", base64Images);

      const StockId = record.stock_ID;
      for (const key in values) {
        if (key !== "Stock_Image") {
          formData.append(key, values[key]);
        }
      }
      const response = await axios.put(
        `${API_EDITSTOCK}?id=${StockId}`,
        formData
      );
      // console.log(response);
      message.success(response.data.message);
      actionRef.current.reload();
      return true;
    } catch (error) {
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
        <p style={{ justifyContent: "center", display: "flex" }}>编辑货物</p>
      }
      onFinish={onFinish}
      trigger={<EditFilled style={{ color: "#420be6", fontSize: "1.1rem" }} />}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Stock_Name"
          label="货物名称"
          placeholder="请输入货物"
          initialValue={record.stock_Name}
          rules={[{ required: true }]}
        ></ProFormText>
        <ProFormUploadButton
          label="上传照片"
          name="Stock_Image"
          title="上传照片"
          accept=".png,.jpg,.jpeg"
          max={1}
          initialValue={fileList}
          onChange={handleChange}
          fieldProps={{
            onPreview: handlePreview,
            listType: "picture-card",
            beforeUpload: () => false,
          }}
          rules={[{ required: true }]}
        ></ProFormUploadButton>
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
          initialValue={record.category}
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
          initialValue={record.quantity}
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
          initialValue={record.price}
          min={1}
        ></ProFormMoney>
      </ProForm.Group>
    </ModalForm>
  );
};

export default EditButton;

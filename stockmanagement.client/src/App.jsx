import { ProConfigProvider, ProTable } from "@ant-design/pro-components";
import { Image, ConfigProvider, Tag } from "antd";
import axios from "axios";
import DeletePop from "components/DeleteConfirm";
import EditButton from "components/EditStockForm";
import NewStockForm from "components/NewStockForm";
import { API_GETALLSTOCKS } from "config/envConfig";
import React, { useRef, useState } from "react";
import { CategoryColor } from "util/Color.util";
import "./shared/styles.css";

function App() {
  const CurrencyMY = "RM";

  const ref = useRef();

  return (
    <ConfigProvider
      theme={{
        components: {
          // Table: {
          //   headerBg: 'red',
          // }
        },
        token: {
          fontFamily: "Tahoma",
        },
      }}
    >
      <ProTable
        actionRef={ref}
        pagination={{ pageSize: 5 }}
        request={async (params, sorts, filters) => {
          try {
            const current = params.current;
            const pageSize = params.pageSize;
            let urlWithParams = `${API_GETALLSTOCKS}?page=${current}&pageSize=${pageSize}`;

            if (params.stock_Name) {
              urlWithParams += `&stockName=${params.stock_Name}`;
            }

            if (params.category) {
              urlWithParams += `&category=${params.category}`;
            }

            if (params.price) {
              const [minPrice, maxPrice] = params.price;

              if (minPrice !== null && minPrice !== undefined) {
                urlWithParams += `&startPriceValue=${minPrice}`;
              }

              if (maxPrice !== null && maxPrice !== undefined) {
                urlWithParams += `&endPriceValue=${maxPrice}`;
              }
            }

            const response = await axios.get(urlWithParams);
            // console.log(response);
            const stocks = response.data.stocks;
            const total = response.data.total;
            return Promise.resolve({
              success: true,
              total: total,
              data: stocks,
            });
          } catch (error) {
            return Promise.resolve({
              success: false,
            });
          }
        }}
        editable={{
          type: "multiple",
        }}
        toolBarRender={() => [<NewStockForm actionRef={ref} />]}
        columns={[
          {
            title: "ID",
            dataIndex: "stock_ID",
            key: "stock_ID",
            hideInSearch: true,
            hideInTable: true,
            width: "16.7%",
          },
          {
            title: "物品",
            dataIndex: "stock_Name",
            key: "stock_Name",
            width: "16.7%",
          },
          {
            title: "照片",
            dataIndex: "Stock_Image",
            key: "Stock_Image",
            width: "16.7%",
            valueType: "image",
            hideInSearch: true,
            render: (_, row) => (
              <div>
                <Image
                  src={`data:image/png;base64,${row.stock_Image}`}
                  alt="Stock Image"
                  style={{
                    width: "120px",
                    height: "120px",
                  }}
                />
              </div>
            ),
          },
          {
            title: "种类",
            dataIndex: "category",
            key: "category",
            filters: true,
            onFilter: true,
            width: "16.7%",
            valueType: "select",
            fieldProps: {
              options: [
                {
                  label: "Flower",
                  value: "Flower",
                },
                {
                  label: "Pot",
                  value: "Pot",
                },
                {
                  label: "Soil",
                  value: "Soil",
                },
              ],
            },
            render: (_, row, index) => (
              <Tag color={CategoryColor(row.category)} key={index}>
                {row.category}
              </Tag>
            ),
          },
          {
            title: "数量",
            dataIndex: "quantity",
            key: "quantity",
            width: "16.7%",
            hideInSearch: true,
            sorter: (a, b) => a.quantity - b.quantity,
          },
          {
            title: "价格",
            dataIndex: "price",
            key: "price",
            width: "16.7%",
            valueType: "digitRange",
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: "此项为必填项",
                },
              ],
            },
            sorter: (a, b) => a.price - b.price,
            render: (_, row) => `${CurrencyMY} ${Number(row.price).toFixed(2)}`,
          },
          {
            title: "总价格",
            dataIndex: "total_Value",
            key: "total_Value",
            width: "16.7%",
            hideInSearch: true,
            sorter: (a, b) => a.total_Value - b.total_Value,
            render: (_, row) =>
              `${CurrencyMY} ${Number(row.total_Value).toFixed(2)}`,
          },
          {
            title: "操作",
            valueType: "option",
            width: "16.7%",
            render: (text, record, _, action) => {
              return [
                <EditButton record={record} actionRef={ref} />,
                ,
                <DeletePop record={record} actionRef={ref} />,
              ];
            },
          },
        ]}
      />
    </ConfigProvider>
  );
}

export default App;

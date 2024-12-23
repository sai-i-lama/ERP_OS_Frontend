import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./product.css";

import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import { useEffect } from "react";

import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import getTotalProduct from "../../api/getAllApis/getTotalProduct";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import GenerateBarcodePopUp from "./generateBarcodePopUp";
import NotificationIcon from "../notification/NotificationIcon";

function CustomTable({ list, total, status }) {
  const dispatch = useDispatch();
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      align: "center",
      render: (imageUrl) => (
        <img style={{ maxWidth: "40px" }} alt="product" src={imageUrl} />
      )
    },
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   sorter: (a, b) => a.id - b.id,
    //   sortDirections: ["ascend", "descend"]
    // },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      align: "center",
      sorter: (a, b) => a.sku.localeCompare(b.sku),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name, { id }) => <Link to={`/product/${id}`}>{name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Fournisseur",
      dataIndex: "supplier",
      key: "supplier",
      align: "center",
      render: (supplier) => supplier?.name,
      sorter: (a, b) => a.supplier?.name.localeCompare(b.supplier?.name),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Quantité en Stock",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Coût de Production par unité",
      dataIndex: "purchase_price",
      key: "purchase_price",
      align: "center",
      responsive: ["md"],
      sorter: (a, b) => a.purchase_price - b.purchase_price,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Prix de vente",
      dataIndex: "sale_price",
      key: "sale_price",
      align: "center",
      responsive: ["md"],
      sorter: (a, b) => a.sale_price - b.sale_price,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Categorie",
      dataIndex: "product_category",
      key: "product_category",
      align: "center",
      render: (product_category) => product_category?.name,
      sorter: (a, b) =>
        a.product_category?.name.localeCompare(b.product_category?.name),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Unité de mésure",
      dataIndex: "unit_measurement",
      key: "unit_measurement",
      align: "center",
      sorter: (a, b) => a.unit_measurement.localeCompare(b.unit_measurement),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Type d'unité",
      dataIndex: "unit_type",
      key: "unit_type",
      align: "center",
      sorter: (a, b) => a.unit_type.localeCompare(b.unit_type),
      sortDirections: ["ascend", "descend"]
    },

    // {
    //   title: "Quantité Commandée",
    //   dataIndex: "reorder_quantity",
    //   key: "reorder_quantity",
    //   sorter: (a, b) => a.reorder_quantity - b.reorder_quantity,
    //   sortDirections: ["ascend", "descend"]
    // },
    {
      title: "Action",
      dataIndex: "sku",
      key: "sku",
      align: "center",
      render: (sku, quantity) => <GenerateBarcodePopUp sku={sku ? sku : 0} />
    }
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div>
      <div>
        {list && (
          <div style={{ marginBottom: "30px" }}>
            <Dropdown
              menu={
                <Menu onClick={colVisibilityClickHandler} items={columnItems} />
              }
              placement="bottomLeft"
            >
              <Button className="column-visibility">Column Visibility</Button>
            </Dropdown>
          </div>
        )}
      </div>
      <div>
        <Table
          scroll={{ x: true }}
          loading={!list}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,

            onChange: (page, limit) => {
              dispatch(loadProduct({ page, limit, status }));
            }
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
        />
      </div>
    </div>
  );
}

const GetAllProd = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.products.list);
  // console.log("list", list);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
  }, []);

  //TODO :IMPLEMENT TOTAL PROD info
  useEffect(() => {
    getTotalProduct().then((res) => setTotal(res));
  }, [list]);

  const [status, setStatus] = useState("true");
  const onChange = (value) => {
    setStatus(value);
    dispatch(loadProduct({ status: value, page: 1, limit: 10 }));
  };

  // Filtrer la liste des produits pour ne garder que ceux avec type_product === "Produit fini"
  const filteredList = list?.filter((product) => product.type_product === "Produit fini");

  const CSVlist = filteredList?.map((i) => ({
    ...i,
    product_category: i?.product_category?.name
  }));

  return (
    <div className="card column-design">
      <div className="card-body">
        <div className="d-flex">
          <div className="col-md-6"><h5>Liste des produits</h5></div>
          <div className="col-md-6 d-flex justify-content-end">
            <NotificationIcon list={filteredList} />
          </div>
        </div>
        {list && (
          <div className="card-title d-flex justify-content-end" style={{ marginTop:"10px" }}>
            <div className="me-2">
              <CSVLink
                data={CSVlist}
                style={{ margin: "5px" }}
                className="btn btn-dark btn-sm mb-1"
                filename="products"
              >
                Télécharger .CSV
              </CSVLink>
            </div>
            <div>
              <Segmented
                className="text-center rounded danger"
                size="middle"
                options={[
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-lines-fill"></i> Active
                      </span>
                    ),
                    value: "true"
                  },
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-dash-fill"></i> Inactive
                      </span>
                    ),
                    value: "false"
                  }
                ]}
                value={status}
                onChange={onChange}
              />
            </div>
          </div>
        )}

        <CustomTable list={filteredList} total={total} status={status} />
      </div>
    </div>
  );
};

export default GetAllProd;

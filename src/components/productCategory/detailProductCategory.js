import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteProductCategory } from "../../redux/actions/productCategory/deleteProductCategoryAction";
import { loadSingleProductCategory } from "../../redux/actions/productCategory/detailProductCategoryAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import GenerateBarcodePopUp from "../product/generateBarcodePopUp";

//PopUp

function CustomTable({ list, categoryName }) {
  const dispatch = useDispatch();
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (imageUrl) => (
        <img style={{ maxWidth: "40px" }} alt="product" src={imageUrl} />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      sorter: (a, b) => a.sku.localeCompare(b.sku),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/product/${id}`}>{name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Quantité",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Prix d'achat",
      dataIndex: "purchase_price",
      key: "purchase_price",
      responsive: ["md"],
      sorter: (a, b) => a.purchase_price - b.purchase_price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Prix de vente",
      dataIndex: "sale_price",
      key: "sale_price",
      responsive: ["md"],
      sorter: (a, b) => a.sale_price - b.sale_price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Format du produit",
      key: "unit_measurement_and_type",
      render: (text, record) => {
        return `${record.unit_measurement} ${record.unit_type}`;
      },
      sorter: (a, b) => {
        const measurementComparison = a.unit_measurement.localeCompare(b.unit_measurement);
        if (measurementComparison !== 0) {
          return measurementComparison;
        }
        return a.unit_type.localeCompare(b.unit_type);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Quantité commandée",
      dataIndex: "reorder_quantity",
      key: "reorder_quantity",
      sorter: (a, b) => a.reorder_quantity - b.reorder_quantity,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      dataIndex: "sku",
      key: "action",
      render: (sku) => <GenerateBarcodePopUp sku={sku ? sku : 0} />,
    },
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, [columns]);

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
      label: <span>{item.title}</span>,
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className="card card-custom border">
      <div className="card-body">
        <div className="card-title d-flex justify-content-between">
          <h5>Liste des Produits</h5>
          {list && (
            <div>
              <CSVLink
                data={list}
                className="btn btn-dark btn-sm mb-1"
                style={{ margin: "5px" }}
                filename={`category_${categoryName}`}
              >
                Télécharger .CSV
              </CSVLink>
            </div>
          )}
        </div>

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

        <Table
          scroll={{ x: true }}
          loading={!list}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}

const DetailProductCategory = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const category = useSelector((state) => state.productCategories.category);

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(DeleteProductCategory(id));

      setVisible(false);
      toast.warning(
        `la Catégorie : ${category.name} ne peux pas etre supprimée `
      );
      toast.warning(`Elle contient encore des produits`);
      return navigate("/product-category");
    } catch (error) {
      console.log(error.message);
    }
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    dispatch(loadSingleProductCategory(id));
  }, [dispatch, id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Retour " subtitle={`CATEGORY PRODUIT ${category?.id}`} />

      <div className="mr-top">
        {category ? (
          <Fragment key={category.id}>
            <Card bordered={false} className="card-custom">
              <div
                className="card-header d-flex justify-content-between"
                style={{ padding: 0 }}
              >
                <div className="w-50">
                  <h5>
                    <i className="bi bi-person-lines-fill"></i>
                    <span className="mr-left">
                      ID : {category.id} | {category.name}
                    </span>
                  </h5>
                </div>
                <div className="text-end w-50">
                  <Link
                    className="me-3 d-inline-block"
                    to={`/product-category/${category.id}/update`}
                    state={{ data: category }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    >
                      Renommer
                    </Button>
                  </Link>
                  <Popover
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Oui !
                        </Button>
                      </a>
                    }
                    title=" Voulez-vous vraiment supprimer?"
                    trigger="click"
                    open={visible}
                    onOpenChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      DetailProductCategory
                      shape="round"
                      icon={<DeleteOutlined />}
                    >
                      Supprimer
                    </Button>
                  </Popover>
                </div>
              </div>

              <div className="my-2 table-responsive">
                <h5 className="text-center mb-2">
                  {" "}
                  Produit Appartenant <strong>{category.name} </strong>
                </h5>

                <CustomTable
                  list={category?.product}
                  categoryName={category?.name}
                />
              </div>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailProductCategory;

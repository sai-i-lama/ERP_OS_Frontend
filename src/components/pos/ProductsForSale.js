import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTotalProduct from "../../api/getAllApis/getTotalProduct";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { loadPosProduct } from "../../redux/actions/product/getPosProductAction";
import { loadSingleProductCategory } from "../../redux/actions/productCategory/detailProductCategoryAction";
import { loadAllProductCategory } from "../../redux/actions/productCategory/getProductCategoryAction";
import "./pos.css";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
  Tag
} from "antd";

export default function ProductsForSale({ handleSelectedProds }) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.products.list);
  const category = useSelector((state) => state.productCategories?.list);
  const [loading, setLoading] = useState(false);
  const [finalCat, setFinalCat] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const categoryToGetAllProd = {
      id: 0,
      name: "all products"
    };
    if (category !== null) {
      setFinalCat([categoryToGetAllProd, ...category]);
    }
  }, [category]);

  const categoryProd = useSelector(
    (state) => state.productCategories?.category?.product
  );
  const [totalProd, setTotalProd] = useState(0);
  const [prodList, setProdList] = useState(null);

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
    dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
  }, []);

  useEffect(() => {
    if (list !== null) {
      let filteredList = list;
      filteredList = list.filter(
        (item) => item.type_product === "Produit fini"
      );
      setProdList(filteredList);
    }
  }, [list]);

  //TODO :IMPLEMENT TOTAL PROD info
  useEffect(() => {
    getTotalProduct().then((res) => setTotalProd(res));
  }, [list]);

  // Filtrer la liste des produits pour ne garder que ceux avec type_product === "Produit fini"
  const filteredList = list?.filter(
    (product) => product.type_product === "Produit fini"
  );
  const handleCatChange = (catId) => {
    if (catId === 0) {
      dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
      setProdList(filteredList);
    } else {
      dispatch(loadSingleProductCategory(catId));
      // Filtrer les produits de la catégorie sélectionnée pour "Produit fini"
      const categoryProducts = list.filter(
        (product) =>
          product.product_category_id === catId &&
          product.type_product === "Produit fini"
      );
      setProdList(categoryProducts);
    }
  };

  const [status, setStatus] = useState("true");

  const onShowSizeChange = (current, pageSize) => {};

  const Products = ({ item, index }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleOnClick = () => {
      handleSelectedProds(item);
      setIsSelected(!isSelected);
    };

    return (
      <Col span={24} sm={12} xl={8} key={index}>
        <Card
          onClick={handleOnClick}
          style={{ width: "100%", height: "100%" }}
          cover={
            <center>
              <img
                alt={`btq ${item.name}`}
                src={item.imageUrl}
                style={{
                  width: "50%",
                  height: "50%",
                  objectFit: "cover"
                }}
              />
            </center>
          }
          actions={[
            <p>
              Nom: <br />
              {item.name}
            </p>,
            <p>
              Prix Unitaire: <br /> {item.sale_price}
            </p>
          ]}
          hoverable
        >
          <center>
            <Tag>id : {item.sku}</Tag>
          </center>
        </Card>
      </Col>
    );
  };

  // Single Product Search Function
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await dispatch(loadPosProduct(values.s_id));
    if (values.s_id === undefined) {
      setLoading(false);
      dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
    }
    if (resp.status === "success") {
      setProdList(resp.data);
      form.resetFields();
      setLoading(false);
    }
  };

  
  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div class="d-flex justify-content-around">
        <div className="mt-2">
          <Form
            form={form}
            layout="inline"
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Rechercher" name="s_id">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16
              }}
            >
              <Button
                loading={loading}
                onClick={() => setLoading(true)}
                className="ant-btn-new"
                type="primary"
                size="small"
                htmlType="submit"
              >
                Rechercher
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-2">
          <Select
            name="product_category_id"
            loading={!category}
            showSearch
            style={{
              width: 200
            }}
            onChange={handleCatChange}
            placeholder="Selectionner une Catégorie"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {finalCat &&
              finalCat.map((cate) => (
                <Select.Option key={cate.id} value={cate.id}>
                  {cate.name}
                </Select.Option>
              ))}
          </Select>
        </div>
      </div>
      <Row className="mt-2" gutter={[20, 20]}>
        {prodList ? (
          prodList.map((item, index) => (
            <Products key={index} index={index} item={item} />
          ))
        ) : categoryProd ? (
          categoryProd.map((item, index) => (
            <Products key={index} index={index} item={item} />
          ))
        ) : (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Spin size="large" />
          </div>
        )}
      </Row>

      {totalProd > 0 && (
        <div className="mt-3">
          <Pagination
            showSizeChanger
            onChange={(page, limit) => {
              dispatch(loadProduct({ page, limit, status }));
            }}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalProd}
          />
        </div>
      )}
    </>
  );
}

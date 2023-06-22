import { Button, Card, DatePicker, Form, Input } from "antd";
import moment from "moment";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { loadSingleSale } from "../../redux/actions/sale/detailSaleAction";
import SaleProductListCard from "../Card/saleInvoice/SaleProductListCard";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import { addReturnSale } from "./returnSale.api";

const AddReturnSale = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [totalReturnAmount, setTotalReturnAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  // make a button click fucnciton to set loading to true
  const onClick = () => {
    setLoading(true);
  };

  //dispatch
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.sales.sale);
  const { singleSaleInvoice } = sale ? sale : {};
  const [list, setList] = useState([]);
  const [date, setDate] = useState(moment());

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(loadSingleSale(id));
  }, [id]);

  useEffect(() => {
    if (singleSaleInvoice) {
      setList(
        singleSaleInvoice.saleInvoiceProduct.map((item) => {
          return {
            ...item,
            return_quantity: 0,
            remain_quantithy: item.product_quantity,
          };
        })
      );
    }
  }, [singleSaleInvoice]);

  const submitHandler = useCallback(
    ({ note }) => {
      const payload = {
        saleInvoice_id: parseInt(id),
        note,
        date: date._d,

        returnSaleInvoiceProduct: Object.entries(formData).map(
          ([id, { value, price }]) => {
            return {
              product_id: parseInt(id),
              product_quantity: value,
              product_sale_price: price,
            };
          }
        ),
      };

      const resp = addReturnSale(payload);
      resp.then((res) => {
        if (res === "success") {
          setLoading(false);
          navigate(-1);
        } else {
          setLoading(false);
        }
      });
    },

    [formData]
  );

  const updateHandler = useCallback(
    ({ id, value, price }) => {
      const item = list.find((item) => item.product_id === id);
      if (item) {
        formData[id] = { value, price };
        item.return_quantity = value;
        item.remain_quantity = item.product_quantity - value;
        setList([...list]);
        setFormData({ ...formData });
      }
    },

    [list]
  );

  const totalReturnQuantity = () => {
    return list.reduce((acc, item) => {
      return acc + item.return_quantity * item.product_sale_price;
    }, 0);
  };

  // set total return amount to state from totalReturnQuantity
  useEffect(() => {
    setTotalReturnAmount(totalReturnQuantity());
  }, [list]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Back " />
      <div className="mr-top">
        {singleSaleInvoice ? (
          <Fragment key={singleSaleInvoice.id}>
            <Card bordered={false} className="criclebox h-full m-3">
              <div className="card-header d-flex justify-content-between ">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">ID : {singleSaleInvoice.id} |</span>
                </h5>
              </div>
              <div className="">
                <SaleProductListCard
                  formData={formData}
                  updateReturn={true}
                  returnOnChange={updateHandler}
                  list={list}
                />
                <div className="d-flex justify-content-between card-body">
                  <div className="mb-auto">
                    <p
                      className="mr-left"
                      style={{
                        backgroundColor: "#FDCCCC",
                        padding: "10px",
                        paddingRight: "20px",
                        borderRadius: "2px",
                      }}
                    >
                      Total Return Amount :
                      <strong>
                        {"  "}
                        {totalReturnAmount ? totalReturnAmount : 0}
                      </strong>
                    </p>
                  </div>
                  <div>
                    <Form
                      labelAlign="right"
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 26,
                      }}
                      form={form}
                      onFinish={submitHandler}
                      autoComplete="off"
                    >
                      <Form.Item name="date" label="Date" className="mb-2">
                        <DatePicker
                          defaultValue={moment(new Date())}
                          onChange={(date) => setDate(date._d)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item name="note" label="Note" className="mb-2">
                        <Input.TextArea placeholder="Note" />
                      </Form.Item>

                      <Form.Item style={{ marginTop: "20px" }} className="mb-2">
                        <Button
                          onClick={onClick}
                          htmlType="submit"
                          type="danger"
                          block
                          loading={loading}
                        >
                          Make A Return
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
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

export default AddReturnSale;

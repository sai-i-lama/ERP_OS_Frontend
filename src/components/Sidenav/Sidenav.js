import { useState, useEffect } from "react";
import {
  CheckOutlined,
  FileSyncOutlined,
  FundOutlined,
  HomeOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  SettingOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  SnippetsOutlined,
  UserSwitchOutlined,
  InboxOutlined,
  FileDoneOutlined,
  FileOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/sai-i-lama-logo.png";
import NotificationIcon from "../notification/NotificationIcon";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";
// import DueClientNotification from "../notification/DueClientNotification";
import getPermissions from "../../utils/getPermissions";
import moment from "moment";
// import ReadyCommandeNotification from "../notification/ReadyCommandeNotification";
// import styles from "./Sidenav.module.css";
const pdfFile = require("./help.pdf");

const Test = (props) => {
  const userRole = localStorage.getItem("role");
  const isProRole = userRole === "professionnel";
  const user_id = localStorage.getItem("id");

  const permissions = getPermissions();
  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };

  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [dueClientList, setDueClientList] = useState([]);

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
  }, []);
  useEffect(() => {
    dispatch(
      loadAllSale({
        status: "true",
        page: 1,
        limit: 100,
        startdate: moment().startOf("month"),
        enddate: moment().endOf("month"),
        user: ""
      })
    );
  }, []);

  const productsList = useSelector((state) => state.products.list);
  const Clientlist = useSelector((state) => state.sales.list);

  // const filteredList = dueClientList?.filter((item) => item.customer.name === user_id);

  useEffect(() => {
    setList(productsList);
    setDueClientList(Clientlist);
  }, [productsList, Clientlist]);

  const menu = [
    hasPermission("viewDashboard") && {
      label: (
        <NavLink to="/dashboard">
          <span>TABLEAU DE BORD</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />
    },
    !isProRole &&
      (hasPermission("createProduct") ||
        hasPermission("viewProduct") ||
        hasPermission("updateProduct") ||
        hasPermission("deleteProduct") ||
        hasPermission("createProductCategory") ||
        hasPermission("viewProductCategory") ||
        hasPermission("updateProductCategory") ||
        hasPermission("deleteProductCategory")) && {
        label: "MATIÈRE PREMIÈRE",
        key: "productmatière",
        icon: <PlusSquareOutlined />,
        children: [
          {
            label: (
              <NavLink to="/productMat">
                <span>Ajouter une Matière Première</span>
              </NavLink>
            ),
            key: "productmatière1",
            icon: <FileAddOutlined />
          },
          {
            label: (
              <NavLink to="/productMatlist">
                <span>Liste de Matières Premières</span>
              </NavLink>
            ),
            key: "listproductmatière2",
            icon: <UnorderedListOutlined />
          }
        ]
      },
    !isProRole &&
      (hasPermission("createProduct") ||
        hasPermission("viewProduct") ||
        hasPermission("updateProduct") ||
        hasPermission("deleteProduct") ||
        hasPermission("createProductCategory") ||
        hasPermission("viewProductCategory") ||
        hasPermission("updateProductCategory") ||
        hasPermission("deleteProductCategory")) && {
        label: "PRODUIT",
        key: "product",
        icon: <ShopOutlined />,
        children: [
          {
            label: (
              <NavLink to="/product">
                <span>Ajouter un produit</span>
              </NavLink>
            ),
            key: "products",
            icon: <FileAddOutlined />
          },
          {
            label: (
              <NavLink to="/productlist">
                <span>Liste des produits</span>
              </NavLink>
            ),
            key: "purchaseList",
            icon: <UnorderedListOutlined />
          }
        ]
      },
    !isProRole &&
      (hasPermission("createCustomer") ||
        hasPermission("viewCustomer") ||
        hasPermission("updateCustomer") ||
        hasPermission("deleteCustomer")) && {
        label: (
          <NavLink to="/customer">
            <span>CLIENT</span>
          </NavLink>
        ),
        key: "customers",
        icon: <UserOutlined />
      },
    // !isProRole &&
    //   (hasPermission("createSupplier") ||
    //     hasPermission("viewSupplier") ||
    //     hasPermission("updateSupplier") ||
    //     hasPermission("deleteSupplier") ||
    //     hasPermission("createPurchaseInvoice") ||
    //     hasPermission("viewPurchaseInvoice") ||
    //     hasPermission("updatePurchaseInvoice") ||
    //     hasPermission("deletePurchaseInvoice")) && {
    //     label: "APPROVISIONNEMENT",
    //     key: "purchaseSection",
    //     icon: <PlusSquareOutlined />,
    //     children: [
    //       {
    //         label: (
    //           <NavLink to="/purchase">
    //             <span>Facture</span>
    //           </NavLink>
    //         ),
    //         key: "newPurchase",
    //         icon: <SnippetsOutlined />
    //       }
    //     ]
    //   },
    !isProRole &&
      (hasPermission("createSaleInvoice") ||
        hasPermission("viewSaleInvoice") ||
        hasPermission("updateSaleInvoice") ||
        hasPermission("deleteSaleInvoice")) && {
        label: "VENTE",
        key: "saleSection",
        icon: <MinusSquareOutlined />,
        children: [
          {
            label: (
              <NavLink to="/sale">
                <span>SPA</span>
              </NavLink>
            ),
            key: "newSale",
            icon: <CheckOutlined />
          },
          hasPermission("createSaleInvoice") && {
            label: (
              <NavLink to="/pos">
                <span>Boutique</span>
              </NavLink>
            ),
            key: "pos",
            icon: <ShoppingCartOutlined />
          },
          hasPermission("viewSaleInvoice") && {
            label: (
              <NavLink to="/salelist">
                <span>Liste de vente</span>
              </NavLink>
            ),
            key: "saleList",
            icon: <UnorderedListOutlined />
          }
        ]
      },
    !isProRole &&
      (hasPermission("createUser") ||
        hasPermission("viewUser") ||
        hasPermission("updateUser") ||
        hasPermission("deleteUser") ||
        hasPermission("createRolePermission") ||
        hasPermission("viewRolePermission") ||
        hasPermission("updateRolePermission") ||
        hasPermission("deleteRolePermission") ||
        hasPermission("createDesignation") ||
        hasPermission("viewDesignation") ||
        hasPermission("updateDesignation") ||
        hasPermission("deleteDesignation")) && {
        label: "HR",
        key: "hrSection",
        icon: <UserOutlined />,
        children: [
          {
            label: (
              <NavLink to="/hr/staffs">
                <span>Personnel</span>
              </NavLink>
            ),
            key: "staffs",
            icon: <UsergroupAddOutlined />
          },
          {
            label: (
              <NavLink to="/role">
                <span>Rôle et autorisations</span>
              </NavLink>
            ),
            key: "roleAndPermissions",
            icon: <UserSwitchOutlined />
          },
          {
            label: (
              <NavLink to="/designation/">
                <span>Fonction</span>
              </NavLink>
            ),
            key: "designation",
            icon: <UserSwitchOutlined />
          }
        ]
      },
    !isProRole &&
      (hasPermission("updateSetting") || hasPermission("viewSetting")) && {
        label: "PARAMÈTRES",
        key: "settings",
        icon: <SettingOutlined />,
        children: [
          {
            label: (
              <NavLink to="/supplier">
                <span>Fournisseurs</span>
              </NavLink>
            ),
            key: "suppliers",
            icon: <UserOutlined />
          },
          {
            label: (
              <NavLink to="/product-category">
                <span>Catégorie de Produits</span>
              </NavLink>
            ),
            key: "productCategory",
            icon: <FolderAddOutlined />
          },
          {
            label: (
              <NavLink to="/invoice-setting">
                <span>Paramètres de facturation</span>
              </NavLink>
            ),
            key: "invoiceSetting",
            icon: <SettingOutlined />
          }
        ]
      },

    isProRole &&
      hasPermission("createSaleInvoice") && {
        label: (
          <NavLink to="/pos">
            <span>Boutique</span>
          </NavLink>
        ),
        key: "pos",
        icon: <ShoppingCartOutlined />
      },
    isProRole &&
      hasPermission("viewSaleInvoice") && {
        label: (
          <NavLink to="/salelist">
            <span>Liste des Achats</span>
          </NavLink>
        ),
        key: "saleList",
        icon: <UnorderedListOutlined />
      },
    {
      label: (
        <NavLink to={pdfFile} target="_blank">
          AIDE
        </NavLink>
      ),
      key: "help",
      icon: <QuestionCircleOutlined />
    }
  ];

  return (
    <div>
      <center>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "50%",
            height: "50%",
            objectFit: "cover"
          }}
        />
        <h4
          style={{
            width: "100%",
            height: "100%",
            color: "white",
            marginTop: "7%"
          }}
        >
          <b>Gestion de Stocks</b>
        </h4>

        <Menu
          theme="dark"
          mode="vertical"
          items={menu}
          className="sidenav-menu"
          // style={{ backgroundColor: "transparent" }}
        />
        {/* <Divider
          style={{
            borderColor: "#fff",
            borderWidth: "2px",
            borderRadius: "10px",
          }}
        >
          <small style={{ color: "#fff" }}>LIMITE STOCK</small>
        </Divider>
        <NotificationIcon list={list} /> */}

        {/* {isProRole && (
          <Divider
            style={{
              borderColor: "#fff",
              borderWidth: "2px",
              borderRadius: "10px"
            }}
          >
            <small style={{ color: "#fff" }}>MONTANT À PAYER</small>
          </Divider>
        )} */}
        {/* {isProRole && <ReadyCommandeNotification list={filteredList} />} */}
      </center>
    </div>
  );
};

export default Test;

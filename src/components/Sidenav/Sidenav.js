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
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/sai-i-lama-logo.png";
import NotificationIcon from "../notification/NotificationIcon";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";
import DueClientNotification from "../notification/DueClientNotification";
import moment from "moment";
// import styles from "./Sidenav.module.css";
const pdfFile = require('./help.pdf');

const Test = (props) => {
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
        user: "",
      })
    );
  }, []);

  const productsList = useSelector((state) => state.products.list);
  const Clientlist = useSelector((state) => state.sales.list);

  useEffect(() => {
    setList(productsList);
    setDueClientList(Clientlist);
  }, [productsList, Clientlist]);

  const menu = [
    {
      label: (
        <NavLink to="/dashboard">
          <span>TABLEAU DE BORD</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },
    // {
    //   label: "PRODUIT",
    //   key: "product",
    //   icon: <ShopOutlined />,
    //   children: [

    //   ],
    // },
    {
      label: (
        <NavLink to="/customer">
          <span>CLIENT</span>
        </NavLink>
      ),
      key: "customers",
      icon: <UserOutlined />,
    },

    {
      label: "APPROVISIONNEMENT",
      key: "purchaseSection",
      icon: <PlusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/supplier">
              <span>Fournisseurs</span>
            </NavLink>
          ),
          key: "suppliers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/product-category">
              <span>Catégorie de produit</span>
            </NavLink>
          ),
          key: "productCategory",
          icon: <FolderAddOutlined />,
        },
        {
          label: (
            <NavLink to="/product">
              <span>Approvisionnement</span>
            </NavLink>
          ),
          key: "products",
          icon: <FileAddOutlined />,
        },
        // {
        //   label: (
        //     <NavLink to="/purchase">
        //       <span>Facture</span>
        //     </NavLink>
        //   ),
        //   key: "newPurchase",
        //   icon: <SnippetsOutlined />,
        // },
        {
          label: (
            <NavLink to="/productlist">
              <span>Liste des produits</span>
            </NavLink>
          ),
          key: "purchaseList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "VENTE",
      key: "saleSection",
      icon: <MinusSquareOutlined />,
      children: [
        // {
        //   label: (
        //     <NavLink to="/customer">
        //       <span>Clientèle</span>
        //     </NavLink>
        //   ),
        //   key: "customers",
        //   icon: <UserOutlined />,
        // },
        {
          label: (
            <NavLink to="/sale">
              <span>SPA</span>
            </NavLink>
          ),
          key: "newSale",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/pos">
              <span>Boutique</span>
            </NavLink>
          ),
          key: "pos",
          icon: <ShoppingCartOutlined />,
        },
        {
          label: (
            <NavLink to="/salelist">
              <span>Liste de vente</span>
            </NavLink>
          ),
          key: "saleList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    // {
    //   label: "COMPTES",
    //   key: "accountSection",
    //   icon: <InboxOutlined />,
    //   children: [
    //     {
    //       label: (
    //         <NavLink to="/account/">
    //           <span>Compte</span>
    //         </NavLink>
    //       ),
    //       key: "accountList",
    //       icon: <UnorderedListOutlined />,
    //     },
    //     {
    //       label: (
    //         <NavLink to="/transaction/create">
    //           <span>Nouvelle transaction</span>
    //         </NavLink>
    //       ),
    //       key: "newTransaction",
    //       icon: <CheckOutlined />,
    //     },
    //     {
    //       label: (
    //         <NavLink to="/transaction/">
    //           <span>Liste des transactions</span>
    //         </NavLink>
    //       ),
    //       key: "transactionList",
    //       icon: <UnorderedListOutlined />,
    //     },
    //   ],
    // },
    {
      label: "RAPPORT",
      key: "reportSection",
      icon: <FundOutlined />,
      children: [
        // {
        //   label: (
        //     <NavLink to="/account/trial-balance">
        //       <span>Balance de vérification</span>
        //     </NavLink>
        //   ),
        //   key: "trialBalance",
        //   icon: <FileDoneOutlined />,
        // },
        // {
        //   label: (
        //     <NavLink to="/account/balance-sheet">
        //       <span>Bilan</span>
        //     </NavLink>
        //   ),
        //   key: "balanceSheet",
        //   icon: <FileOutlined />,
        // },
        {
          label: (
            <NavLink to="/account/income">
              <span>État des résultats</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    {
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
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/role">
              <span>Rôle et autorisations</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        {
          label: (
            <NavLink to="/designation/">
              <span>Fonction</span>
            </NavLink>
          ),
          key: "designation",
          icon: <UserSwitchOutlined />,
        },
      ],
    },
    {
      label: "PARAMÈTRES",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/invoice-setting">
              <span>Paramètres de facturation</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      label: <NavLink to={pdfFile} target="_blank" >AIDE</NavLink>,
      key: "help",
      icon: <QuestionCircleOutlined />,
    },
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
            objectFit: "cover",
          }}
        />

        <Menu
          theme="dark"
          mode="inline"
          items={menu}
          className="sidenav-menu"
          // style={{ backgroundColor: "transparent" }}
        />
        <Divider
          style={{
            borderColor: "#fff",
            borderWidth: "2px",
            borderRadius: "10px",
          }}
        >
          <small style={{ color: "#fff" }}>LIMITE STOCK</small>
        </Divider>
        <NotificationIcon list={list} />
        <Divider
          style={{
            borderColor: "#fff",
            borderWidth: "2px",
            borderRadius: "10px",
          }}
        >
          <small style={{ color: "#fff" }}>MONTANT À PAYER</small>
        </Divider>
        <DueClientNotification list={dueClientList} />
      </center>
    </div>
  );
};

export default Test;

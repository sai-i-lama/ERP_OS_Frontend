import { Spin } from "antd";
import React from "react";

function Loader(props) {
  return (
    <div className="text-center">
      <div className='loading'>
        <h5> Chargement Veuillez patienter ...</h5>
        <Spin size='large' />
      </div>
    </div>
  );
}

export default Loader;

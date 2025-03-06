const GetToken = () => {
  const token = localStorage.getItem("access-token");
  return token;
};

export default GetToken;

import axios from "axios";
const getData = async () => {
  const url = process.env.REACT_APP_API;
  try {
    const {
      data: { products },
    } = await axios.get(url);
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default getData;

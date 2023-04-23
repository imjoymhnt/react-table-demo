const makeTitleCase = (str) => {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

const getColumns = (obj) => {
  const columns = Object.keys(obj).map((key) => {
    const newKey = makeTitleCase(key);
    if (key === "thumbnail") {
      return {
        Header: newKey,
        accessor: key,
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.thumbnail}
            width={60}
            alt="Thumbnail"
          />
        ),
      };
    } else if (key === "images") {
      return {
        Header: newKey,
        accessor: key,
        Cell: (tableProps) => (
          <img src={tableProps.row.original.images} width={60} alt="Image" />
        ),
      };
    } else {
      return { Header: newKey, accessor: key };
    }
  });
  return columns;
};

export default getColumns;

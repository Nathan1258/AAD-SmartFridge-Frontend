import styled from "styled-components";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import { usePopup } from "../Popup/popupContext";
import { useNavigate } from "react-router-dom";
import Input from "../ReuseableComponents/Input";
import DropdownSelector from "../ReuseableComponents/DropdownSelector";
import Button from "../ReuseableComponents/Button";
import {
  addItemToOrder,
  changeUserAccess,
  getAllItems,
  getAllUsers,
  getExpiringProducts,
  registerUser,
} from "../API";
import Loading from "../ReuseableComponents/Loading";

const ExpiringWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: white;
`;
const SubTitle = styled.h3`
  margin: 0;
  color: white;
`;

const Table = styled.table`
  width: 100%;
  height: 50%;
  border-collapse: collapse;
  color: white;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 15px;

  th,
  td {
    padding: 8px;
    text-align: left;
  }

  th {
    background: #2c3f56;
    color: white;
    cursor: pointer;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .firstHeader {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .itemRow {
    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.5);
      color: black;
    }

    &.selectedRow {
      background-color: #cccccc;
      color: black;

      &:hover {
        background-color: #bfbfbf;
      }
    }
  }

  td {
    padding: 15px;
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const OrderOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoProducts = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function ExpiringProducts(
  products,
  isLoading,
  setSelectedProducts,
  selectedProducts,
) {
  const toggleProductSelection = (product) => {
    setSelectedProducts((currentSelectedProducts) => {
      const isProductSelected = currentSelectedProducts.some(
        (selectedProduct) => selectedProduct.itemID === product.itemID,
      );

      if (isProductSelected) {
        return currentSelectedProducts.filter(
          (selectedProduct) => selectedProduct.itemID !== product.itemID,
        );
      } else {
        return [...currentSelectedProducts, product];
      }
    });
  };

  const isProductSelected = (productID) => {
    return selectedProducts.some((product) => product.itemID === productID);
  };

  return (
    <>
      {isLoading ? (
        <Loading>Fetching Products...</Loading>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr className="header">
                <th className={"firstHeader"}>Name</th>
                <th>Quantity</th>
                <th>Expiring in</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className={
                    "itemRow" +
                    (isProductSelected(product.itemID) ? " selectedRow" : "")
                  }
                  key={product.itemID}
                  onClick={() => toggleProductSelection(product)}
                >
                  <td>{product.Name}</td>
                  <td>{product.quantity}</td>
                  <td
                    style={
                      daysUntil(product.expiryDate) === 0
                        ? { color: "red", fontWeight: "bold" }
                        : null
                    }
                  >
                    {daysUntil(product.expiryDate) === 0
                      ? "Expires tomorrow"
                      : daysUntil(product.expiryDate) === 1
                        ? daysUntil(product.expiryDate) + " day"
                        : daysUntil(product.expiryDate) + " days"}
                  </td>
                  <td>{formatDateToReadable(product.lastUpdated)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

const handleQuantityChange = (event, product, setSelectedProducts) => {
  const newQuantity = event.target.value;

  setSelectedProducts((currentSelectedProducts) => {
    return currentSelectedProducts.map((p) => {
      if (p.itemID === product.itemID) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
  });
};

function ProductsAddedToOrder(selectedProducts, setSelectedProducts) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr className="header">
            <th className={"firstHeader"}>Product Name</th>
            <th>Quantity to order</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.itemID}>
              <td>{product.Name}</td>
              <td>
                {
                  <DropdownSelector
                    options={[
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                      18, 19, 20,
                    ]}
                    selectedOption={product.quantity}
                    onChange={(event) =>
                      handleQuantityChange(event, product, setSelectedProducts)
                    }
                    width={"200px"}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

const addToOrder = (selectedProducts, triggerPopup) => {
  const convertedProducts = selectedProducts.map((product) => ({
    ...product,
    itemID: parseInt(product.itemID, 10),
    quantity: parseInt(product.quantity, 10),
  }));
  addItemToOrder(convertedProducts)
    .then((response) => {
      if (response.code == 200) {
        triggerPopup(
          "Item(s) ordered!",
          "Item(s) have been added to next week's order",
          "Okay",
          () => {
            window.location.reload();
          },
        );
      } else {
        triggerPopup(
          "Error",
          "Error ordering items, please try again later.",
          "Okay",
          () => {
            window.location.reload();
          },
        );
      }
    })
    .catch((error) => {
      triggerPopup(
        "Error",
        "Error ordering items, please try again later.",
        "Okay",
        () => {
          window.location.reload();
        },
      );
    });
};

export function Expiring(props) {
  const { userData } = useUser();
  const { triggerPopup } = usePopup();
  const [productsExpiringSoon, setProductsExpiringSoon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getExpiringProducts()
      .then((data) => {
        setProductsExpiringSoon(data);
        setIsLoading(false);
      })
      .catch((error) => {
        triggerPopup(
          "There was an error fetching products",
          "We ran into an error fetching expiring products. Please try again soon",
          "Okay",
          () => {
            window.location.reload();
          },
        );
      });
  }, []);

  return (
    <ExpiringWrapper>
      <Title>Products expiring soon</Title>
      <SubTitle>
        Items that are expiring soon. You can select each item to add to this
        week's order. Products that are already in this week's order will not be
        shown.
      </SubTitle>
      {productsExpiringSoon.length >= 1 ? (
        <>
          {ExpiringProducts(
            productsExpiringSoon,
            isLoading,
            setSelectedProducts,
            selectedProducts,
          )}
          <OrderOverviewWrapper>
            <Title>Order Overview</Title>
            {selectedProducts.length > 0 ? (
              <>
                <SubTitle>
                  You have selected {selectedProducts.length}{" "}
                  {selectedProducts.length === 1 ? "item" : "items"} to be added
                  to this week's order:
                </SubTitle>
                {ProductsAddedToOrder(selectedProducts, setSelectedProducts)}
                <Button
                  width={"250px"}
                  onClick={() => addToOrder(selectedProducts, triggerPopup)}
                >
                  Add to order
                </Button>
              </>
            ) : (
              <SubTitle>
                Select items above to add to this week's order
              </SubTitle>
            )}
          </OrderOverviewWrapper>
        </>
      ) : (
        <NoProducts>
          <Title>Good News!</Title>
          <SubTitle>
            There are no products expiring soon that aren't on this weeks order
          </SubTitle>
        </NoProducts>
      )}
    </ExpiringWrapper>
  );
}

function formatDateToReadable(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daySuffix = getDaySuffix(day);
  const formattedDate = `${day}${daySuffix}  ${months[monthIndex]}  ${year}`;
  return `${formattedDate}`;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function daysUntil(targetDate) {
  const endDate = new Date(targetDate);
  const startDate = new Date();
  const diffInMs = endDate - startDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
}

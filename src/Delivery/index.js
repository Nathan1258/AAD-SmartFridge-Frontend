import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllOrderedProducts,
  getDeliveryOrderItems,
  markAsDelivered,
  verifyDeliveryPIN,
} from "../API";
import { getAccessCode } from "../Utils";
import { usePopup } from "../Popup/popupContext";
import Loading from "../ReuseableComponents/Loading";
import { media } from "../Media";
import Button from "../ReuseableComponents/Button";
import Input from "../ReuseableComponents/Input";

const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  margin: 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  width: 100%;
`;

const LoadingTitle = styled.h1`
  margin: 20px;
  font-size: 2.5rem;
  color: white;

  @media ${media.mobile} {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-top: 15px;

  @media ${media.mobile} {
    width: 95%;
    text-align: center;
  }
`;

const DeliveryDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: auto;
  margin: 20px;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);

  @media ${media.mobile} {
    width: 80%;
  }

  @media ${media.tablet} {
    width: 60%;
  }

  @media ${media.desktop} {
    width: 40%;
  }
`;

const DeliveryDetailText = styled.h4`
  color: white;
  font-size: 20px;
  margin: 10px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  justify-content: center;

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

  @media ${media.mobile} {
    width: 100%;
  }

  @media ${media.tablet} {
    width: 60%;
  }

  @media ${media.desktop} {
    width: 40%;
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-top: 20px;
  padding-bottom: 20px;

  @media ${media.tablet} {
    display: flex;
    justify-content: center;
  }

  @media ${media.desktop} {
    display: flex;
    justify-content: center;
  }
`;

function OrderProducts({
  products,
  isLoading,
  setSelectedProducts,
  selectedProducts,
}) {
  console.log(products);
  const toggleProductSelection = (product) => {
    setSelectedProducts((currentSelectedProducts) => {
      const isProductSelected = currentSelectedProducts.some(
        (selectedProduct) => selectedProduct.productID === product.productID,
      );

      if (isProductSelected) {
        return currentSelectedProducts.filter(
          (selectedProduct) => selectedProduct.productID !== product.productID,
        );
      } else {
        return [...currentSelectedProducts, product];
      }
    });
  };

  const isProductSelected = (productID) => {
    return selectedProducts.some((product) => product.productID === productID);
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
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className={
                    "itemRow" +
                    (isProductSelected(product.productID) ? " selectedRow" : "")
                  }
                  key={product.productID}
                  onClick={() => toggleProductSelection(product)}
                >
                  <td>{product.Name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export function Delivery(props) {
  const navigate = useNavigate();
  const [deliveryData, setDeliveryData] = useState([]);
  const [itemsInOrder, setItemsInOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isItemsLoading, setIsItemsLoading] = useState(true);
  const { triggerPopup } = usePopup();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState("");

  useEffect(() => {
    verifyDeliveryPIN(getAccessCode())
      .then((data) => {
        setDeliveryData(data.data);
        getOrderItems(data.data.orderID);
        setIsLoading(false);
      })
      .catch((error) => {
        triggerPopup(
          "Error getting delivery",
          "We ran into an error fetching the delivery. Please try again later",
        );
        setIsLoading(false);
      });
  }, []);

  const getOrderItems = (orderID) => {
    getDeliveryOrderItems(getAccessCode(), orderID)
      .then((data) => {
        setItemsInOrder(data.data);
        setIsItemsLoading(false);
      })
      .catch((error) => {
        triggerPopup(
          "Error getting delivery",
          "We ran into an error fetching the items in the delivery. Please try again later",
          "Okay",
        );
      });
  };

  const exit = () => {
    document.cookie = `accessCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/clock-in");
  };

  const handleConfirm = () => {
    let deliveredItems = [];
    let undeliveredItems = [];
    deliveredItems = itemsInOrder.filter((orderItem) =>
      selectedProducts.some(
        (selectedItem) => selectedItem.productID === orderItem.productID,
      ),
    );
    undeliveredItems = itemsInOrder.filter(
      (orderItem) =>
        !selectedProducts.some(
          (selectedItem) => selectedItem.productID === orderItem.productID,
        ),
    );
    triggerPopup(
      "Are you sure?",
      `You confirm you have entered ${deliveredItems.length} of ${itemsInOrder.length} items into the fridge?`,
      "Yes",
      () => {
        markAsDelivered(
          getAccessCode(),
          deliveryData.deliveryID,
          deliveryData.orderID,
          deliveredItems,
          undeliveredItems,
          deliveryNotes,
        )
          .then((result) => {
            if (result.code === 200) {
              triggerPopup(
                "Thank you",
                "We have updated the fridge and notified the head chef.",
                "Okay",
                () => {
                  exit();
                },
              );
            } else {
              triggerPopup(
                "We ran into an error",
                "Unable to complete delivery at this time. Please try again later.",
                "Okay",
                () => {
                  exit();
                },
              );
            }
          })
          .catch((error) => {
            triggerPopup(
              "We ran into an error",
              "Unable to complete delivery at this time. Please try again later.",
              "Okay",
              () => {
                exit();
              },
            );
          });
      },
    );
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoadingWrapper>
            <Loading />
            <LoadingTitle>Fetching Delivery</LoadingTitle>
          </LoadingWrapper>
        </>
      ) : (
        <>
          <DeliveryWrapper>
            <Title>Delivery No. 0{deliveryData.orderID}</Title>
            <DeliveryDetailsWrapper>
              <DeliveryDetailText>
                Delivery ID: {deliveryData.deliveryID}
              </DeliveryDetailText>
              <DeliveryDetailText>
                Delivery Date: {formatDateToReadable(deliveryData.deliveryDate)}
              </DeliveryDetailText>
              <DeliveryDetailText>
                Items to deliver: {deliveryData.itemsToDeliver}
              </DeliveryDetailText>
              <DeliveryDetailText>
                Status: {deliveryData.status}
              </DeliveryDetailText>
              <DeliveryDetailText>
                Order Total: {deliveryData.totalCost}
              </DeliveryDetailText>
            </DeliveryDetailsWrapper>
            <DeliveryDetailsWrapper>
              <DeliveryDetailText>Notes:</DeliveryDetailText>
              <DeliveryDetailText>
                {deliveryData.deliveryNotes}
              </DeliveryDetailText>
            </DeliveryDetailsWrapper>
            <DeliveryDetailText>
              Please select the products you have inserted into the fridge:
            </DeliveryDetailText>
            <OrderProducts
              products={itemsInOrder}
              isLoading={isItemsLoading}
              setSelectedProducts={setSelectedProducts}
              selectedProducts={selectedProducts}
            />
            <Input
              placeholder={"Delivery notes (optional)"}
              setValue={setDeliveryNotes}
              value={deliveryNotes}
            ></Input>
            <Button
              backgroundcolor={selectedProducts.length == 0 ? "red" : "#3a506b"}
              color={"white"}
              height={"70px"}
              margin={"20px"}
              shadow={true}
              onClick={handleConfirm}
            >
              Confirm delivery of {selectedProducts.length} items
            </Button>
          </DeliveryWrapper>
        </>
      )}
    </>
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

import styled from "styled-components";
import Loading from "../ReuseableComponents/Loading";
import { useCallback, useEffect, useState } from "react";
import { usePopup } from "../Popup/popupContext";
import {
  editItemFromOrder,
  getAllItemsInDelivery,
  getAllOrderedProducts,
  getDeliveries,
  getDeliveryOrderItems,
  getExpiringProducts,
  getPastDeliveries,
  removeItemFromOrder,
} from "../API";
import { MdEdit } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import Counter from "../ReuseableComponents/Counter";
import { hover } from "@testing-library/user-event/dist/hover";
import Button from "../ReuseableComponents/Button";

const OrderManagementWrapper = styled.div`
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
  padding-top: 10px;
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

const EditModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

function onEdit(product, triggerPopup, getOrderedProducts) {
  let originalQuantity = product.quantity;
  let quantityLocal = product.quantity;

  const handleQuantityChange = (newQuantity) => {
    quantityLocal = newQuantity;
  };

  triggerPopup(
    `Edit the quantity of ${product.Name}`,
    <Counter value={originalQuantity} onValueChange={handleQuantityChange} />,
    originalQuantity === quantityLocal ? "Save" : "Save",
    () => {
      if (originalQuantity === quantityLocal) return;
      editItemFromOrder(product, quantityLocal)
        .then((response) => {
          if (response.code === 200) {
            triggerPopup(
              `${product.Name} has been saved`,
              `${product.Name} now has a new quantity of ${quantityLocal}.`,
              "Okay",
              () => {
                getOrderedProducts();
              },
            );
          } else {
            triggerPopup(
              `${product.Name} could not be saved`,
              `${product.Name} could not be saved. Please try again later.`,
              "Okay",
              () => {
                getOrderedProducts();
              },
            );
          }
        })
        .catch((error) => {
          triggerPopup(
            `${product.Name} could not be saved`,
            `${product.Name} could not be saved. Please try again later.`,
            "Okay",
            () => {
              getOrderedProducts();
            },
          );
        });
    },
  );
}

function onRemove(product, triggerPopup, getOrderedProducts) {
  removeItemFromOrder(product)
    .then((response) => {
      if (response.code !== 200) {
        triggerPopup(
          "Error removing product",
          `Unable to remove ${product.Name} from this week's order. Please try again.`,
          "Okay",
          () => {
            getOrderedProducts();
          },
        );
      }
      triggerPopup(
        "Product has been removed.",
        `${product.Name} has been removed from this week's order`,
        "Okay",
        () => {
          getOrderedProducts();
        },
      );
    })
    .catch((error) => {
      triggerPopup(
        "Error removing product",
        `Unable to remove ${product.Name} from this week's order. Please try again.`,
        "Okay",
        () => {
          getOrderedProducts();
        },
      );
    });
}

function OrderedProducts({
  orderedProducts,
  isLoading,
  triggerPopup,
  getOrderedProducts,
}) {
  return (
    <>
      {isLoading ? (
        <Loading>Fetching Products...</Loading>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr className="header">
                <th className={"firstHeader"}>Product Name</th>
                <th>Ordered Quantity</th>
                <th>Individual price</th>
                <th>Status</th>
                <th>Trigger Type</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {orderedProducts.map((product) => (
                <tr key={product.productID}>
                  <td>{product.Name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.Price}</td>
                  <td>{product.status}</td>
                  <td>{product.triggerType}</td>
                  <td>
                    <MdEdit
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() =>
                        onEdit(product, triggerPopup, getOrderedProducts)
                      }
                    />
                  </td>
                  <td>
                    <IoIosRemoveCircle
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() =>
                        onRemove(product, triggerPopup, getOrderedProducts)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

function PastDeliveries({
  pastDeliveries,
  isLoading,
  triggerPopup,
  getPastDeliveries,
  handleDeliveryClick,
}) {
  return (
    <>
      {isLoading ? (
        <Loading>Fetching Deliveries...</Loading>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr className="header">
                <th className={"firstHeader"}>Order ID</th>
                <th>Delivery Date</th>
                <th>Items to be delivered</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {pastDeliveries.map((delivery) => (
                <tr
                  className={"itemRow"}
                  key={delivery.orderID}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeliveryClick(delivery)}
                >
                  <td>{delivery.orderID}</td>
                  <td>{formatDateToReadable(delivery.deliveryDate)}</td>
                  <td>{delivery.itemsToDeliver}</td>
                  <td>{delivery.totalCost}</td>
                  <td
                    style={
                      delivery.status === "Delivered"
                        ? { color: "red", fontWeight: "bold" }
                        : null
                    }
                  >
                    {delivery.isDelivered === 1 && delivery.isChecked === 0
                      ? "Delivered - Action required"
                      : delivery.status}
                  </td>
                  <td>
                    {delivery.isDelivered && delivery.isChecked === 0
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

function ItemsInOrder({ itemsInDelivery, isLoading, setButtonDisabled }) {
  const checkAllBoxesChecked = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked,
    );
    setButtonDisabled(!allChecked);
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", checkAllBoxesChecked);
    });

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", checkAllBoxesChecked);
      });
    };
  }, [itemsInDelivery]);

  return (
    <>
      {isLoading ? (
        <Loading>Fetching items...</Loading>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr className="header">
                <th className={"firstHeader"}>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Correct</th>
              </tr>
            </thead>
            <tbody>
              {itemsInDelivery.map((item) => (
                <tr key={item.productID} style={{ color: "black" }}>
                  <td>{item.Name}</td>
                  <td>{item.quantity}</td>
                  <td
                    style={
                      item.status === "Undelivered"
                        ? { color: "red", fontWeight: "bold" }
                        : null
                    }
                  >
                    {item.status}
                  </td>
                  <td>
                    <input type={"checkbox"}></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

function Delivery({ delivery, triggerPopup }) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [itemsInDelivery, setItemsInDelivery] = useState([]);
  const [isItemsInDeliveryLoading, setItemsInDeliveryLoading] = useState(true);

  const DeliveryWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
  `;

  const DeliveryInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: auto;
    justify-content: space-between;
    margin: 0;
    background: rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(5px);
  `;

  const Title = styled.h1`
    margin: 0;
  `;

  const SubTitle = styled.h3`
    margin: 0;
  `;

  const Body = styled.p`
    margin-top: 10px;
    font-weight: bold;
  `;

  useEffect(() => {
    getAllItemsInDelivery(delivery.orderID)
      .then((data) => {
        setItemsInDelivery(data.data);
        setItemsInDeliveryLoading(false);
      })
      .catch(() => {
        triggerPopup(
          "There was an error",
          "We ran into an error fetching items in this delivery. Please try again soon",
          "Okay",
          () => {
            window.location.reload();
          },
        );
      });
  }, []);

  return (
    <>
      <DeliveryWrapper>
        <DeliveryInfo>
          <SubTitle style={{ marginTop: "5px" }}>Driver's Notes:</SubTitle>
          <Body>{delivery.deliveryNotes}</Body>
        </DeliveryInfo>
        {delivery.isChecked === 0 && delivery.itemsUndelivered >= 1 ? (
          <Body style={{ color: "red" }}>
            {delivery.itemsUndelivered === 1
              ? delivery.itemsUndelivered + " item was"
              : delivery.itemsUndelivered + " items were"}{" "}
            recorded as not delivered and needs attention
          </Body>
        ) : (
          <></>
        )}
        <ItemsInOrder
          itemsInDelivery={itemsInDelivery}
          isLoading={isItemsInDeliveryLoading}
          setButtonDisabled={setButtonDisabled}
        />
        <Button
          backgroundcolor={"black"}
          color={"white"}
          width={"150px"}
          isDisabled={buttonDisabled}
        >
          Submit
        </Button>
      </DeliveryWrapper>
    </>
  );
}

export function OrderManagement(props) {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [pastDeliveries, setPastDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPastDeliveriesLoading, setIsPastDeliveriesLoading] = useState(true);
  const { triggerPopup } = usePopup();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [totalCost, setTotalCost] = useState("");

  useEffect(() => {
    getOrderedProducts();
    getPastDeliveries();
  }, []);

  const getOrderedProducts = () => {
    getAllOrderedProducts()
      .then((data) => {
        setOrderedProducts(data.data);
        setIsLoading(false);
        calculatePrice(data.data);
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
  };

  const getPastDeliveries = () => {
    getDeliveries()
      .then((data) => {
        setPastDeliveries(data.data);
        setIsPastDeliveriesLoading(false);
      })
      .catch((error) => {
        triggerPopup(
          "There was an error fetching past deliveries",
          "We ran into an error fetching past deliveries. Please try again soon",
          "Okay",
          () => {
            window.location.reload();
          },
        );
      });
  };

  const [duration, setDuration] = useState("");
  const calculateDuration = () => {
    const now = new Date();
    const target = new Date(now);
    target.setHours(8, 0, 0, 0);
    target.setDate(target.getDate() + ((7 - target.getDay() + 1) % 7 || 7));

    const londonTimeOffset = target.getTimezoneOffset() < 0 ? 60 : 0;
    target.setMinutes(
      target.getMinutes() - target.getTimezoneOffset() + londonTimeOffset,
    );

    const diff = target - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      let durationString = "";
      if (days > 0) durationString += `${days} days `;
      if (hours > 0 || days > 0) durationString += `${hours} hours `;
      if (days === 0 && minutes > 0) durationString += `${minutes} minutes`;
      return durationString.trim();
    } else {
      return "Now";
    }
  };

  useEffect(() => {
    setDuration(calculateDuration());
    const interval = setInterval(() => {
      setDuration(calculateDuration());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculatePrice = (orderedProducts) => {
    let total = 0.0;
    orderedProducts.forEach((product) => {
      let productPrice = parseFloat(product.Price.slice(1));
      let productQuantity = product.quantity;
      total = total + productPrice * productQuantity;
    });
    setTotalCost(total.toFixed(2));
  };

  const handleDeliveryClick = (delivery) => {
    triggerPopup(
      `Delivery for week ${delivery.orderID.toString().charAt(0)}`,
      <Delivery delivery={delivery} triggerPopup={triggerPopup} />,
      "null",
    );
  };

  return (
    <OrderManagementWrapper>
      {isEditModalOpen && (
        <>
          <Overlay onClick={() => setIsEditModalOpen(false)} />
          <EditModal></EditModal>
        </>
      )}
      <Title>Order management</Title>
      <SubTitle>
        Manage order for week {getOrder()[0]} of {getOrder()[1]}
      </SubTitle>
      <SubTitle>You have {duration} left to edit this order.</SubTitle>
      <OrderedProducts
        orderedProducts={orderedProducts}
        isLoading={isLoading}
        triggerPopup={triggerPopup}
        getOrderedProducts={getOrderedProducts}
      />
      <SubTitle>Total cost of this order: £{totalCost}</SubTitle>
      <Title style={{ marginTop: "10px" }}>Past deliveries</Title>
      <PastDeliveries
        pastDeliveries={pastDeliveries}
        isLoading={isPastDeliveriesLoading}
        triggerPopup={triggerPopup}
        getPastDeliveries={getPastDeliveries}
        handleDeliveryClick={handleDeliveryClick}
      ></PastDeliveries>
    </OrderManagementWrapper>
  );
}

function getOrder() {
  let d = new Date();
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return [weekNo, d.getUTCFullYear()];
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

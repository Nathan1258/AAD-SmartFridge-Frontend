import styled from "styled-components";
import Loading from "../ReuseableComponents/Loading";
import { useEffect, useState } from "react";
import { usePopup } from "../Popup/popupContext";
import {
  editItemFromOrder,
  getAllOrderedProducts,
  getExpiringProducts,
  removeItemFromOrder,
} from "../API";
import { MdEdit } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import Counter from "../ReuseableComponents/Counter";

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

function onEdit(product, triggerPopup) {
  let originalQuantity = product.quantity;
  let quantityLocal = product.quantity;

  const handleQuantityChange = (newQuantity) => {
    quantityLocal = newQuantity;
  };

  triggerPopup(
    `Edit the quantity of ${product.Name}`,
    <Counter value={originalQuantity} onValueChange={handleQuantityChange} />,
    originalQuantity == quantityLocal ? "Save" : "Save",
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
                window.location.reload();
              },
            );
          } else {
            triggerPopup(
              `${product.Name} could not be saved`,
              `${product.Name} could not be saved. Please try again later.`,
              "Okay",
              () => {
                window.location.reload();
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
              window.location.reload();
            },
          );
        });
    },
  );
}

function onRemove(product, triggerPopup) {
  removeItemFromOrder(product)
    .then((response) => {
      if (response.code !== 200) {
        triggerPopup(
          "Error removing product",
          `Unable to remove ${product.Name} from this week's order. Please try again.`,
          "Okay",
          () => {
            window.location.reload();
          },
        );
      }
      triggerPopup(
        "Product has been removed.",
        `${product.Name} has been removed from this week's order`,
        "Okay",
        () => {
          window.location.reload();
        },
      );
    })
    .catch((error) => {
      triggerPopup(
        "Error removing product",
        `Unable to remove ${product.Name} from this week's order. Please try again.`,
        "Okay",
        () => {
          window.location.reload();
        },
      );
    });
}

function OrderedProducts(orderedProducts, isLoading, triggerPopup) {
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
                      onClick={() => onEdit(product, triggerPopup)}
                    />
                  </td>
                  <td>
                    <IoIosRemoveCircle
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() => onRemove(product, triggerPopup)}
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

export function OrderManagement(props) {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerPopup } = usePopup();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [totalCost, setTotalCost] = useState("");

  useEffect(() => {
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
  }, []);

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
      return "Time is up";
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
      {OrderedProducts(orderedProducts, isLoading, triggerPopup)}
      <SubTitle>Total cost of this order: £{totalCost}</SubTitle>
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

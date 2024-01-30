import styled from "styled-components";
import DashboardCard from "../ReuseableComponents/DashboardCard";
import { useState, useEffect } from "react";
import photo from "../Resources/fridgephoto_svg.svg";
import { getAllDeliveries } from "../API";

const DashboardWrapper = styled.div`
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

const SubTitle = styled.h4`
  margin: 0;
  padding-top: 10px;
  color: white;
`;

const CardsWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
`;

const Image = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 30px;
`;

const Table = styled.table`
  width: 80%;
  margin-top: 100px;
  border-collapse: collapse;
  color: white;
  max-height: 400px;
  overflow-y: auto;
  align-self: center;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

export function Dashboard(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    getAllDeliveries()
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>
      <SubTitle>Welcome Back to Your Fridge</SubTitle>
      <CardsWrapper>
        <DashboardCard
          width={"330px"}
          height={"220px"}
          color={"white"}
          page={"/fridge"}
        >
          <h1>Access Fridge</h1>
          <Image src={photo}></Image>
        </DashboardCard>
        <DashboardCard width={"330px"} height={"220px"}>
          <h1>Delivery</h1>
          <Image src={photo}></Image>
        </DashboardCard>
        <DashboardCard width={"330px"} height={"220px"}>
          <h1>Health and Saftey</h1>
          <Image src={photo}></Image>
        </DashboardCard>
      </CardsWrapper>
      <Table>
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Order ID</th>
            <th>Delivery Date</th>
            <th>Items to Deliver</th>
            <th>Access Code</th>
            <th>Items Undelivered</th>
            <th>Status</th>
            <th>Delivery Notes</th>
            <th>Received By</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.deliveryID}>
              <td>{item.deliveryID}</td>
              <td>{item.orderID}</td>
              <td>{item.deliveryDate}</td>
              <td>{item.itemsToDeliver}</td>
              <td>{item.accessCode}</td>
              <td>{item.itemsUndelivered}</td>
              <td>{item.status}</td>
              <td>{item.deliveryNotes}</td>
              <td>{item.receivedBy}</td>
              <td>{item.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardWrapper>
  );
}

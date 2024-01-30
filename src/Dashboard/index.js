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
  margin-top: 40px;
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
  width: 100%;
  margin-top: 50px;
  border-collapse: collapse;
  color: white;
  max-height: 400px;
  overflow-y: auto;
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
      <SubTitle style={{ marginTop: "30px" }}>Previous deliveries</SubTitle>
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
              <Td>{item.deliveryID}</Td>
              <Td>{item.orderID}</Td>
              <Td>{item.deliveryDate}</Td>
              <Td>{item.itemsToDeliver}</Td>
              <Td>{item.accessCode}</Td>
              <Td>{item.itemsUndelivered}</Td>
              <Td>{item.status}</Td>
              <Td>{item.deliveryNotes}</Td>
              <Td>{item.receivedBy}</Td>
              <Td>{item.totalCost}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardWrapper>
  );
}

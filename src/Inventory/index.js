import styled from "styled-components";
import {useEffect, useState} from "react";
import Loading from "../ReuseableComponents/Loading";
import {getAllItems} from "../API";
import {usePopup} from "../Popup/popupContext";
import Input from "../ReuseableComponents/Input";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";


const InventoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin: 0;
`
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

const MainContent = styled.div`
    display: flex;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    overflow: auto;
    padding-top: 25px;
`

const FilterOptions = styled.div`
    padding-top: 20px;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: white;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;


    th, td {
        padding: 8px;
        text-align: left;
    }

    th {
        background: rgba(255, 255, 255, 0.125);
        color: white;
        cursor: pointer;
    }
    
    .header{
        position: sticky;
        top: 0;
        z-index: 999;
    }
    
    .firstHeader{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .itemRow {
        &:hover {
            background: rgba(255, 255, 255, 0.5);
            color: black;
        }
    }
    td {
        padding: 15px;
    }
`;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
`;




export function Inventory(props){

    const {triggerPopup} = usePopup();
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [productSearchQuery, setProductSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [lastClickedHeader, setLastClickedHeader] = useState(null);

    useEffect(() => {
        getAllItems()
            .then(items => {
               setItems(items);
               console.log(items[0])
               setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                triggerPopup(":(", "We ran into an error fetching products. Please refresh the page and try again.", "Okay", () => {window.location.reload()});
            });
    }, []);

    useEffect(() => {
        setLastClickedHeader("name");
    }, []);

    useEffect(() => {
    const filtered = items.filter((item) =>
      item.Name.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    // Sort by Product Name
    const sortedByName = [...filtered].sort((a, b) => {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      if (sortOrder === "asc") return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });

    // Sort by Product Price
    const sortedByPrice = [...filtered].sort((a, b) => {
      const priceA = parseFloat(a.Price.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.Price.replace(/[^0-9.]/g, ""));
      if (sortOrder === "asc") return priceA - priceB;
      return priceB - priceA;
    });

    setFilteredItems(lastClickedHeader === "name" ? sortedByName : sortedByPrice);
  }, [productSearchQuery, items, sortOrder]);

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleHeaderClick = (header) => {
        setLastClickedHeader(header);
        toggleSortOrder();
  };

    return (
        <InventoryWrapper>
            <Title>Inventory</Title>
            <SubTitle>Manage and View Inventory Stock</SubTitle>

            <FilterOptions>
                <Input placeholder={"Search for a product"} value={productSearchQuery} setValue={setProductSearchQuery}></Input>
            </FilterOptions>

            <MainContent>
                {isLoading ? (
                  <Loading>Fetching Products...</Loading>
                ) : (
                  <>
                    {filteredItems.length === 0 ? (
                      <Title>No items match your search.</Title>
                    ) : (
                      <TableContainer>
                          <Table>
                              <thead>
                              <tr className="header">
                                  <th
                                      className={"firstHeader"}
                                      onClick={() => handleHeaderClick("name")}
                                  >
                                      Product Name {lastClickedHeader === "name" && sortOrder === "asc" ?
                                      <TiArrowSortedDown/> : <TiArrowSortedUp/>}
                                  </th>
                                  <th
                                      onClick={() => handleHeaderClick("price")}
                                  >
                                      Product Price {lastClickedHeader === "price" && sortOrder === "asc" ?
                                      <TiArrowSortedDown/> : <TiArrowSortedUp/>}
                                  </th>
                              </tr>
                              </thead>
                              <tbody>
                              {filteredItems.map((item) => (
                                  <tr className={"itemRow"} key={item.productID}>
                                      <td>{item.Name}</td>
                                      <td>{item.Price}</td>
                                  </tr>
                              ))}
                              </tbody>
                          </Table>
                      </TableContainer>
                    )}
                  </>
                )}
            </MainContent>
        </InventoryWrapper>
    )
}
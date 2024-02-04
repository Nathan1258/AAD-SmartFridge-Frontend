import styled from "styled-components";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import { usePopup } from "../Popup/popupContext";
import { useNavigate } from "react-router-dom";
import Input from "../ReuseableComponents/Input";
import DropdownSelector from "../ReuseableComponents/DropdownSelector";
import Button from "../ReuseableComponents/Button";
import {
  changeUserAccess,
  getAllItems,
  getAllUsers,
  registerUser,
} from "../API";
import Loading from "../ReuseableComponents/Loading";

const AdminWrapper = styled.div`
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
  color: white;
`;

const UserAccountsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: auto;
  justify-content: space-between;
  margin: 20px;
  background: rgba(255, 255, 255, 0.125);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const UserAccountsContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const CreateAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 250px;
  padding-right: 50px;
`;

const EditAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Table = styled.table`
  width: 100%;
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

function UsersTable({ users, isLoading, triggerPopup, refreshUsers }) {
  return (
    <>
      {isLoading ? (
        <Loading>Fetching Users...</Loading>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr className="header">
                <th className={"firstHeader"}>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className={"itemRow"} key={user.uid}>
                  <td>{user.uid}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    {
                      <DropdownSelector
                        uid={user.uid}
                        options={["normal", "admin", "health"]}
                        selectedOption={user.access}
                        onChange={(event) => {
                          handleUserAccessTableChange(
                            event,
                            user.uid,
                            triggerPopup,
                            refreshUsers,
                          );
                        }}
                        width={"200px"}
                      />
                    }
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

function handleUserAccessTableChange(event, uid, triggerPopup, refreshUsers) {
  const newAccess = event.target.value;
  changeUserAccess(uid, newAccess)
    .then((data) => {
      triggerPopup(
        "User's access updated",
        "User's access has successfully been updated.",
        "Okay",
        () => {
          refreshUsers();
        },
      );
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      triggerPopup(
        ":(",
        "We ran into an error saving new access for this user. Please refresh the page and try again.",
        "Okay",
        () => {
          window.location.reload();
        },
      );
    });
}

export function Admin(props) {
  const { userData } = useUser();
  const { triggerPopup } = usePopup();
  const navigate = useNavigate();
  const access = userData ? userData.access : "";

  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [accessSelection, setAccessSelection] = useState("admin");

  useEffect(() => {
    if (access != "admin" && !isUsersLoading) {
      triggerPopup(
        "You cannot access this page",
        "You do not have the right access to visit this page. Please contact your admin or head chef",
        "Okay",
        () => {
          navigate("/app/dashboard");
        },
      );
    }
  }, [isUsersLoading]);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    getAllUsers()
      .then((users) => {
        console.log(users);
        setUsers(users);
        setIsUsersLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        triggerPopup(
          ":(",
          "We ran into an error fetching all users. You may not have access to this page. Please refresh the page and try again.",
          "Okay",
          () => {
            navigate("/app/dashboard");
          },
        );
      });
  };

  const handleAccessChange = (event) => {
    console.log(event.target.value);
    setAccessSelection(event.target.value);
  };

  const handleUserCreation = () => {
    if (firstName == "" || lastName == "" || password == "") {
      triggerPopup(
        "One or more values are empty",
        "You need to fill in all details to create a user",
        "Okay",
      );
    } else {
      registerUser(firstName, lastName, password, accessSelection).then(
        (data) => {
          if (data.code != 200) {
            triggerPopup(
              "Could not create new user",
              "There was an error creating a new user: " +
                data.message +
                ".Please try again.",
              "Okay",
              () => {
                return null;
              },
            );
          }
          triggerPopup(
            "User created successfully",
            "Created new user with userID: " + data.uid,
            "Okay",
            () => {
              return null;
            },
          );
        },
      );
    }
  };

  return (
    <AdminWrapper>
      <Title>Admin tools</Title>
      <SubTitle>Manage stock and user accounts</SubTitle>
      <UserAccountsWrapper>
        <Title>User accounts</Title>
        <UserAccountsContent>
          <CreateAccountWrapper>
            <SubTitle>Create a new user</SubTitle>
            <Input
              placeholder={"First Name"}
              value={firstName}
              setValue={setFirstName}
              margin={"15px"}
            ></Input>
            <Input
              placeholder={"Last Name"}
              value={lastName}
              setValue={setLastName}
              margin={"15px"}
            ></Input>
            <Input
              placeholder={"Password"}
              value={password}
              setValue={setPassword}
              margin={"15px"}
            ></Input>
            <SubTitle style={{ padding: "15px" }}>
              Set their access type:
            </SubTitle>
            <DropdownSelector
              options={["Normal", "Admin", "Health"]}
              selectedOption={accessSelection}
              onChange={handleAccessChange}
              height={"50px"}
              width={"220px"}
              margin={"15px"}
            />
            <Button margin={"15px"} onClick={handleUserCreation}>
              Create user
            </Button>
          </CreateAccountWrapper>
          <EditAccountWrapper>
            <SubTitle>Edit current accounts</SubTitle>
            <UsersTable
              users={users}
              isLoading={isUsersLoading}
              triggerPopup={triggerPopup}
              refreshUsers={refreshUsers}
            />
          </EditAccountWrapper>
        </UserAccountsContent>
      </UserAccountsWrapper>
    </AdminWrapper>
  );
}

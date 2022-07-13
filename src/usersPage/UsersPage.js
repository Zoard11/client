import axios from "axios";
import React, { useState, useEffect } from "react";
import { ipAddress } from "../constants";
import { useBetween } from "use-between";
import { useShareableState } from "../informationPage/UseBetween";
import ModalResponse from "../informationPage/ModalResponse";
import { useCookies } from "react-cookie";

axios.defaults.baseURL = ipAddress;

const UsersPage = () => {
  const [cookies] = useCookies(["token"]);
  const {
    responseSuccesfull,
    setResponseSuccesfull,
    showResponse,
    setShowResponse,
    responseError,
    setResponseError,
    action,
    setAction,
  } = useBetween(useShareableState);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await axios
        .get("/api/users", {
          withCredentials: true,
          headers: {
            Authorization: cookies.token,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            setError(false);
            setUsers(resp.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setError(true);
        });
      setLoading(false);
    })();
  }, [reload]);

  const deleteUser = async (username) => {
    console.log("delete");
    await axios
      .delete(`/api/users/${username}`, {
        withCredentials: true,
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((resp) => {
        setAction("delete user");
        if (resp.status === 204) {
          setReload(!reload);
          setResponseSuccesfull(true);
          setShowResponse(true);
          setResponseError(false);
        }
      })
      .catch(function () {
        setAction("delete user");
        setResponseSuccesfull(false);
        setShowResponse(true);
        setResponseError(true);
      });
  };

  const promoteUser = async (username) => {
    await axios(`/api/users/${username}`, {
      method: "patch",
      data: {
        newRole: "admin",
      },
      withCredentials: true,
      headers: {
        Authorization: cookies.token,
      },
    })
      .then((resp) => {
        setAction("promote user");
        if (resp.status === 204) {
          setReload(!reload);
          setResponseSuccesfull(true);
          setShowResponse(true);
          setResponseError(false);
        }
      })
      .catch(function () {
        setAction("promote user");
        setResponseSuccesfull(false);
        setShowResponse(true);
        setResponseError(true);
      });
  };

  const demoteUser = async (username) => {
    await axios(`/api/users/${username}`, {
      method: "patch",
      data: {
        newRole: "user",
      },
      withCredentials: true,
      headers: {
        Authorization: cookies.token,
      },
    })
      .then((resp) => {
        setAction("demote user");
        if (resp.status === 204) {
          setReload(!reload);
          setResponseSuccesfull(true);
          setShowResponse(true);
          setResponseError(false);
        }
      })
      .catch(function () {
        setAction("demote user");
        setResponseSuccesfull(false);
        setShowResponse(true);
        setResponseError(true);
      });
  };

  if (loading === true) {
    return (
      <div>
        <h1>Change user roles</h1>
        <b>Loading...</b>
      </div>
    );
  }
  if (error === true) {
    return (
      <div>
        <h1>Change user roles</h1>
        <b>Error during loading data</b>
      </div>
    );
  }

  return (
    <div>
      <h1>Change user roles</h1>
      <div id="container">
        {users.map((user) => {
          if (user.Username !== localStorage.getItem("username")) {
            return (
              <div className="users" key={user.Username}>
                <div className="inner" key={user.Username}>
                  <p> Username: {user.Username}</p>
                  <p> User role: {user.UserGroupName} </p>

                  {user.UserGroupName !== "admin" ? (
                    <>
                      <button
                        className="btn btn-default"
                        onClick={() => promoteUser(user.Username)}
                      >
                        <i className="bi bi-arrow-up-square"></i>Give admin role
                      </button>
                      <button
                        className="btn btn-default"
                        onClick={() => deleteUser(user.Username)}
                      >
                        <i className="bi bi-trash3-fill"></i>Delete user
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-default"
                      onClick={() => demoteUser(user.Username)}
                    >
                      <i className="bi bi-arrow-down-square"></i>Demote user
                    </button>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
      <ModalResponse
        showSuccessfull={responseSuccesfull}
        showFailed={responseError}
        setShowFailed={setResponseError}
        setShowSuccessfull={setResponseSuccesfull}
        show={showResponse}
        setShow={setShowResponse}
        action={action}
      />
    </div>
  );
};

export default UsersPage;

import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactShareSocial from "react-share-social";

const Professional = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isEdit, setIsEdit] = useState(false);


  const getUsers = async () => {
    await Axios.get("https://dev.perfectprof.com/api/search").then(
      (response) => {
        setData(response.data.data);
      }
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();

    Axios.get(
      `https://dev.perfectprof.com/api/professional-profile?slug=${id}`
    ).then((res) => {
      setData1(res.data.data);
      setIsEdit({ isEdit: false });
    });
  };

  return (
    <div>
      <div>
        {isEdit ? (
          <div style={{ paddingLeft: "210px" }}>
            <div className="card mb-3" style={{ width: "11rem" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={
                      "https://dev.perfectprof.com/storage/app/" +
                      data1[`profile_pic`]
                    }
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8" style={{ paddingLeft: "298px" }}>
              <div>
                <h4 className="card-title">{data1.professional.id}</h4>
                <h4 className="card-title">{data1.professional.user_type}</h4>
                <h3 className="card-title">
                  {" "}
                  {data1.professional.first_name} {data1.professional.last_name}
                </h3>

                <p className="card-text">{data1.professional.status}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {data1.professional.gender}
                  </small>
                  <small className="text-muted">{data1.city}</small>
                </p>
              </div>

              <div className="card-body">
                <h4>{data1.professional.email}</h4>
                <h6>{data1.professional.ip}</h6>
                <h3>{data1["subject_names"]}</h3>

                <span>
                  <ReactShareSocial
                    url={  `https://alkurntech-reactjs.herokuapp.com/slug=${data1.id}`}
                    socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
                  />
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  className="btn btn-warning"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-inline-flex">
            {data.map((obj) => {
              return (
                <div className="card-group">
                  <div className="card">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src={
                          "https://dev.perfectprof.com/storage/app/" +
                          obj[`profile_pic`]
                        }
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {obj.professional["first_name"]}
                        </h5>
                        <p className="card-text">{obj["title"]}</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <h2>{obj["id"]}</h2>
                        </li>
                        <li className="list-group-item">
                          <h4>{obj["user_id"]}</h4>
                        </li>
                        <li className="list-group-item">
                          <h4>{obj["city"]}</h4>
                        </li>
                      </ul>

                      <button
                        className="card-link btn btn-info"
                        key={obj.id}
                        onClick={(e) => handleClick(e, obj["slug"])}
                      >
                        Click Here
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Professional;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Professinal_list = () => {
    const [data, setData] = useState([]);
    const getUsers = async () => {
        await axios.get("https://dev.perfectprof.com/api/search").then(
          (response) => {
            setData(response.data.data);
          }
        );
      };
    
      useEffect(() => {
        getUsers();
      }, []);

    return (
        <div>
        <div className="d-inline-flex">
            {data.map((obj) => {
              return (
                <div className="card-group">
                  <div className="card">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src={
                          "https://dev.perfectprof.com/storage/app/" +
                          obj.professional[`profile_pic`] 
                         } alt=''
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

                      <Link to={`/social/${obj['slug']}`}  className='btn btn-warning'>Click Here</Link>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            </div>
        )
        

};

export default Professinal_list;
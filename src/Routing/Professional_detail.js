import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";

const Professional_detail = (props) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);


  useEffect(() => {
    axios
      .get(`https://dev.perfectprof.com/api/professional-profile?slug=${props.match.params.id}`)
      .then((res) => {
        setData1(res.data.data.professional);
        setData2(res.data.data);
      });
  }, [props.match.params.id]);

  return (
    <div>
      
      <div style={{ paddingLeft: "210px" }}>
        <div className="card mb-3" style={{ width: "11rem" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={
                  "https://dev.perfectprof.com/storage/app/" +data1.profile_pic
                }
                alt="..." width='480px' height='390px'
              />
            </div>
          </div>
        </div>
        <div className="col-md-8" style={{ paddingLeft: "298px" }}>
          <div>
            <h4 className="card-title">{data1.id}</h4>
            <h4 className="card-title">{data2.user_type}</h4>
            <h3 className="card-title">
              {data1.first_name} {data1.last_name}
            </h3>

            <p className="card-text">{data1.status}</p>
            <p className="card-text">
              <small className="text-muted">{data1.gender}</small>
            </p>
          </div>
          <div className="card-body">
            <h4>{data1.email}</h4>
            <h6>{data1.ip}</h6>
            <h6>{data2.subject_names}</h6>
          </div>
        </div>
        <FacebookShareButton 
        url={`https://dev.perfectprof.com/storage/app/${data1.profile_pic}`}
        quote={`${data1.first_name} ${data1.last_name} 
								DESCRIPTION: ${data1.id}
								`}
								hashtag={`#Professor-${data1.status}`}>
        <FacebookIcon round={true} size='40px'/>
        </FacebookShareButton>

        <TwitterShareButton
								url={`https://dev.perfectprof.com/storage/app/${data1.profile_pic}`}
								title={`${data1.first_name} ${data1.last_name} 
								DESCRIPTION: ${data1.id}
								`}
								hashtag={`#Professor-${data1.status}`}
							>
              <TwitterIcon round={true} size='40px'/>
							</TwitterShareButton>
							

        <Link to="/" className="btn btn-warning">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Professional_detail;

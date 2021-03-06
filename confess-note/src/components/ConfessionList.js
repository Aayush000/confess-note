import React, { useEffect, useState } from "react";
import "../assets/css/ConfessionList.css";
import { database, ref, onValue } from "../config/firebase";
import Moment from "react-moment";
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const ConfessionList = () => {
  const [confessionList, setConfessionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    onValue(ref(database, "confession"), (snapshot) => {
      let _data = snapshot.val();
      let _confessionList = []; //kind of temporary list as we can not use hooks inside for loop

      for (let key in _data) {
        _confessionList.push(_data[key]);
      }

      setConfessionList(_confessionList);
      setIsLoading(false);
    });
  }, []);

  return (
    <center>
      <div className="confession-list">
        {isLoading ? (
          <div style={{ width: "65%" }}>
            <ShimmerSimpleGallery
              card
              imageHeight={300}
              row={2}
              col={2}
              caption
            />
            {/* to create
            loading effect like in facebook*/}
          </div>
        ) : confessionList ? (
          confessionList.map((confession, index) => {
            let _date = new Date(confession.createdAt); // to convert timestamp into actual date
            return (
              <div key={index} className="confession-card">
                <div>{`${_date.getFullYear()} ${
                  monthList[_date.getMonth()]
                } ${_date.getDate()}`}</div>
                <br />
                <br />
                {confession.note}

                <div className="time-ago">
                  <Moment fromNow>{confession.createdAt}</Moment>
                </div>
              </div>
            );
          })
        ) : (
          "No confession notes available!"
        )}
      </div>
    </center>
  );
};

export default ConfessionList;

import React, { useState } from "react";
import "../assets/css/AddConfessionPost.css";
import { FaLock } from "react-icons/fa";
import { database as db, set, ref, onValue } from "../config/firebase";
import { v4 as uuidv4 } from "uuid"; // unique id generator imported by using --> (yarn add uuid)
import { ToastContainer, toast } from "react-toast"; // yarn add react-toast

const AddConfessionPost = () => {
  const [text, setText] = useState("");

  const addConfession = () => {
    //query
    if (text) {
      set(ref(db, "confession/" + uuidv4()), {
        note: text,
        createdAt: Date.now(),
      }).then((err) => {
        if (!err) {
          toast.success("Confession Added");
          setText("");

          // check data
          onValue(ref(db, "confession"), (snapshot) => {
            let _data = snapshot.val();

            for (let key in _data) {
              let createdAt = new Date(_data[key].createdAt);
              createdAt.setDate(createdAt.getDate() + 1); //24 hrs

              if (new Date() >= createdAt) {
                set(ref(db, "confession/" + key), null);
                console.log(
                  "Execeded 24 hrs; it has to be deleted from database"
                );
              }
            }
          });
        } else {
          toast.error("Could not add Confession Note");
        }
      });
    }
  };

  return (
    <center>
      <div className="add-confession-post">
        <textarea
          rows="8"
          cols="55"
          placeholder="Write your Confession here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <br />

        <button className="confess-btn" onClick={() => addConfession()}>
          Confess
        </button>
      </div>

      <FaLock size="8" />
      <small style={{ fontSize: "10px", marginLeft: "5px" }}>
        Confessed Note will remain for 24 hours.
      </small>
      <ToastContainer delay={2500} />
    </center>
  );
};

export default AddConfessionPost;

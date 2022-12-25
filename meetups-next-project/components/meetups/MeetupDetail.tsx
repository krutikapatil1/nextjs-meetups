import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props: any) => {
  return (
    <section className={classes.title}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function CharCard(props) {

  return (
    <div className={styles.card}>
      <a href={props.link} target="_blank">
        <img src={props.image} alt="Avatar"></img>
        <h4><b>{props.name}</b></h4>
      </a>
    </div>
  )
}

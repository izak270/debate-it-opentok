import React, {useState} from "react";
import './App.css';

export default function Player(props) {
    const {css} = props
    const {image} = props
    const {name} = props
    const {profile} = props

    return (
        <div className={profile}>
            <img className={css} src={image}/>
            <p>{name}</p>
        </div>
    )
}
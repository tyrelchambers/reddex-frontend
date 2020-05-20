import React from 'react';
import './Headings.scss'

export const H1 = (props) => <h1 className={`text-4xl font-bold ${props.className ? props.className : ""}`}>{props.children}</h1>
export const H2 = (props) => <h2 className={`text-xl font-bold ${props.className ? props.className : ""}`}>{props.children}</h2>

export const H1Subtitle = props => <p className={`text-lg h1-subtitle ${props.className ? props.className : ""}`}>{props.children}</p>
export const H2Subtitle = props => <p className={`text-md h2-subtitle ${props.className ? props.className : ""}`}>{props.children}</p>
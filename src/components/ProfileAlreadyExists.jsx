import React from 'react'

export default class ProfileAlreadyExists extends React.Component {

    render() {
        return (

            <div style={{ paddingTop: "300px", paddingLeft: "600px", color: "green" }}><h1>Profile Already exists for provided contact number.Please try again with different number</h1></div>
        )
    }
}
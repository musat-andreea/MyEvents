import React from "react";
import Cookies from "js-cookie";
import apiConfig from "./apiConfig";

const notifications = {
    sendMailNotification: function sendMailNotification(receiver_email, subject, text_body, add_alert = false)
    {
        let request_body = {
            'receiver_email': receiver_email,
            'subject': subject,
            'text_body': text_body,
        }

        fetch(`${apiConfig.apiUrl}/sendMail`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request_body)
        })
            .then((response) => {
                if (response.status === 201)    {
                    if (add_alert === true) {
                        alert ("Notification sent");
                    }
                    console.log(response);
                }
            })
            .catch((error) => console.warn(error));
    }
}


export default notifications;

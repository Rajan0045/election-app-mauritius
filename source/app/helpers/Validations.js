import React from "react";
import sprintf from "sprintf-js";
// import AuthController from "../apis/controllers/auth.controller";

export default class Validation extends React.Component {
    constructor(props) {
        super(props);
        this.messages = {
            required: "This field is required",
            checked: "The terms and conditions field is required",
            email: "Please enter a valid email address",
            password:
                "Password requirements: min 8 characters long, alphanumeric, one uppercase, one lowercase and one special character",
            username:
                "Usernames can only use letters, numbers, underscores and periods.",
            decimel: "Please enter a valid number",
            alphabetic: "Please enter a valid alphabetic characters",
            alphanumeric: "Please enter a valid alphanumeric characters",
            alphanumeric2: "Please enter a valid alphanumeric characters",
            ukPostalCode: "Please enter a valid post code",
            numeric: "Please enter a valid number",
            min: "Minimum length should be %s digits",
            max: `Maximum length should be %s digits`,
            minmax: `Please enter minimum value of %s and maximum value of %s`,
            range: `Please enter numeric value within range of %s to %s`,
            maplink: "Please enter a valid link",
            match_value: "The entered input did not match.",
            image: "Please select an image",
            array: "This field is required",
            gst: "Please enter a valid GST number",
            adharWith4DigitsMessage: 'Please enter a valid Aadhar Number',
            url: "Please enter a valid link",
            youtube: "Please enter a valid link",
            validPhoneInput: 'Please enter a valid phone number',
        };
    }
    validateField(key, value) {
        let input = this.props[key];
        let error = input;
        if (input.rules && input.rules.length > 0) {
            for (let i = 0; i < input.rules.length; i++) {
                let element = input.rules[i];
                error = this.validateRule(element, value);
                error.rules = input.rules;
                if (!error.isValid) {
                    break;
                }
            }
        }
        return error;
    }

    validateRule(rule, value) {
        let error = {
            isValid: true,
            message: "",
        };

        rule = rule.split(":");
        if (rule.length > 0) {
            switch (rule[0]) {
                case "required":
                    if (
                        value === null ||
                        value === "" ||
                        (Array.isArray(value) && value.length <= 0)
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "checked":
                    if (value === null || value === "" || value === false) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "alphabetic":
                    if (value && !/^[a-zA-Z ]+$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "alphanumeric":
                    if (value && !/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9 ]+$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "alphanumeric2":
                    if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "numeric":
                    if (value && !/^[0-9]*$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "decimel":
                    if (value && !(/^[0-9]*$/.test(value) || value * 1 > 0)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "min":
                    if (value && value.length < rule[1]) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1]
                            ),
                        };
                    }
                    break;
                case "max":
                    if (value && value.length > rule[1]) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1]
                            ),
                        };
                    }
                    break;
                case "minmax":
                    if (
                        value &&
                        !(value.length > rule[1] && value.length < rule[2])
                    ) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1],
                                rule[2]
                            ),
                        };
                    }
                    break;
                case "range":
                    if (
                        value &&
                        !(value * 1 >= rule[1] && value * 1 <= rule[2])
                    ) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1],
                                rule[2]
                            ),
                        };
                    }
                    break;

                case "maplink":
                    if (value && !/^(https?:\/\/)?(www\.)?(goo\.gl\/maps\/[a-zA-Z0-9\-]+|google\.com\/maps\/place\/[^\s]+)/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "url":
                    let tested = value ? /^(ftp|http|https):\/\/[^ "]+$/.test(value) : true;
                    if (
                        value && !tested
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "youtube":
                    let youtubeURl = value ? /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.test(value) : true;
                    if (
                        value && !youtubeURl
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "image":
                    if (value && value.length < 1) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(this.messages[rule[0]]),
                        };
                    }
                    break;
                case "validPhoneInput":
                    if (value && value.length < 11 || value && value.length > 17) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(this.messages[rule[0]]),
                        };
                    }
                    break;
                case "ukPhoneNumber":
                    if (!/^\+\(?\d{2}\)?-\d{3}-\d{7}$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "email":
                    if (
                        !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(
                            value
                        )
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "gst":
                    let reg =
                        /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}[Zz][0-9A-Za-z]{1}$/;
                    if (value && !reg.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "adharWith4DigitsMessage":
                    if (value && value.length > 14 || value && value.length < 14) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "username":
                    if (
                        !/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(
                            value
                        )
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "array":
                    if (value && value.length <= 0) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(this.messages[rule[0]]),
                        };
                    }
                    break;
                case "password":
                    if (
                        value &&
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&-_]{8,}$/.test(
                            value
                        )
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
            }
        }

        return error;
    }

    isFormValid(values) {
        let allFields = this.props;
        let haveError = false;
        for (let i in allFields) {
            if (typeof values[i] !== "undefined") {
                let error = this.validateField(i, values[i]);
                allFields[i] = error;
                if (!error.isValid) {
                    haveError = true;
                }
            }
        }

        return {
            haveError: haveError,
            errors: allFields,
        };
    }

    render() {
        return null;
    }

    lessThan(key, aValue, bValue) {
        let node = this.props[key];
        if (
            aValue !== "" &&
            aValue !== null &&
            bValue !== "" &&
            bValue !== null &&
            aValue * 1 <= bValue * 1
        ) {
            node.isValid = false;
            node.message = this.messages["less_than"];
            return node;
        } else {
            node.isValid = true;
            node.message = "";
            return node;
        }
    }

    greaterThan(key, aValue, bValue) {
        let node = this.props[key];
        if (
            aValue !== "" &&
            aValue !== null &&
            bValue !== "" &&
            bValue !== null &&
            aValue * 1 >= bValue * 1
        ) {
            node.isValid = false;
            node.message = this.messages["less_than"];
            return node;
        } else {
            node.isValid = true;
            node.message = "";
            return node;
        }
    }

    matchValues(key, aValue, bValue, message) {
        let node = this.props[key];
        if (aValue !== bValue) {
            node.isValid = false;
            node.message = message ? message : this.messages["match_value"];
            return node;
        } else {
            node.isValid = true;
            node.message = "";
            return node;
        }
    }

    notMatchValues(key, aValue, bValue, message) {
        let node = this.props[key];
        if (aValue == bValue) {
            node.isValid = false;
            node.message = message ? message : this.messages["match_value"];
            return node;
        } else {
            node.isValid = true;
            node.message = "";
            return node;
        }
    }
};

// flow
import React, { Component } from "react";
import { Row, Col, Button, Label } from "reactstrap";
import {
    AvForm,
    AvField,
    AvGroup,
    AvInput
} from "availity-reactstrap-validation";
import { AvSelectField } from "@availity/reactstrap-validation-select";
import Notifications from "../../../../components/Notifications";
import Cards from "react-credit-cards";
import { fetchAuthJSON } from "../../../../helpers/api";

import "react-credit-cards/es/styles-compiled.css";
import "./styles.scss";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased"
        },
        invalid: {
            iconColor: "#ee2850",
            color: "#ee2850"
        }
    }
};

const CardField = ({ onChange }) => (
    <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
    <Button
        className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
        color="primary"
        type="submit"
        disabled={processing || disabled}
    >
        <i className="mdi mdi-truck-fast mr-1"></i>{" "}
        {processing ? "Processing..." : children}
    </Button>
);

const ErrorMessage = ({ children }) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#727cf5"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

const ResetButton = ({ onClick }) => (
    <button type="button" className="ResetButton" onClick={onClick}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <path
                fill="#727cf5"
                d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            />
        </svg>
    </button>
);

// Invite
class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            companyAddress: "",
            firstname: this.props.firstname,
            lastname: "",
            countries: [],
            state: "",
            city: "",
            zip: "",
            personalAddress: "",
            contactPhone: "",
            contactEmail: "",

            response: null,
            card: {
                cvc: "",
                expiry: "",
                focus: "",
                name: "",
                number: ""
            },
            error: null,
            cardComplete: false,
            processing: false,
            paymentMethod: null
        };

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        fetchAuthJSON("/profile/get_profile", {
            body: JSON.stringify({}),
            method: "POST"
        })
            .then(json => {
                this.setState({ ...json.profile });
            })
            .catch(error => {
                this.setState({ response: { ...error } });
            });
    }

    countryList(array) {
        const list = [];
        array.forEach(element => {
            list.push({ value: element.country, label: element.country });
        });
        if (array.length == list.length) {
            return this.setState({ countries: list });
        }
    }

    componentWillReceiveProps(nextProps) {
        fetchAuthJSON("/levels", {
            body: JSON.stringify({}),
            method: "POST"
        })
            .then(json => {
                if (json.countries.length) {
                    this.countryList(json.countries);
                }
            })
            .catch(error => {
                this.setState({ response: { ...error } });
            });
    }

    setError = error => {
        this.setState({ error });
    };
    setCardComplete = cardComplete => {
        this.setState({ cardComplete });
    };
    setProcessing = processing => {
        this.setState({ processing });
    };
    setPaymentMethod = paymentMethod => {
        this.setState({ paymentMethod });
    };

    /**
     * Handle the form submission
     */
    handleValidSubmit = async (e, values) => {
        const { error, cardComplete } = this.state;

        if (!this.props.stripe || !this.props.elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        if (error) {
            this.props.elements.getElement("card").focus();
            return;
        }

        if (cardComplete) {
            this.setProcessing(true);
        }

        const billingDetails = {
            email: values.contactEmail,
            phone: values.contactPhone,
            name: `${values.firstname} ${values.lastname}`
        };

        const payload = await this.props.stripe.createPaymentMethod({
            type: "card",
            card: this.props.elements.getElement(CardElement),
            billing_details: billingDetails
        });

        this.setProcessing(false);

        if (payload.error) {
            this.setError(payload.error);
        } else {
            this.setPaymentMethod(payload.paymentMethod);
            fetchAuthJSON("/profile/create", {
                body: JSON.stringify({
                    ...values,
                    paymentMethodId: payload.paymentMethod.id
                }),
                method: "POST"
            })
                .then(json => {
                    this.setState({ response: { ...json } });
                })
                .catch(error => {
                    this.setState({ response: { ...error } });
                });
        }
    };

    reset = () => {
        this.setError(null);
        this.setProcessing(false);
        this.setPaymentMethod(null);
    };

    render() {
        return this.state.paymentMethod ? (
            <div className="Result">
                <div className="ResultTitle" role="alert">
                    Payment successful
                </div>
                <ResetButton onClick={this.reset} />
            </div>
        ) : (
            <React.Fragment>
                <Row>
                    <Col>
                        <Notifications {...this.state.response} />

                        <AvForm onValidSubmit={this.handleValidSubmit}>
                            <h4 className="mt-2">Company info</h4>
                            <Row>
                                <Col md={12}>
                                    <AvField
                                        name="companyName"
                                        label="Company name"
                                        type="text"
                                        placeholder="Enter company name"
                                        value={this.state.companyName}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <AvField
                                        name="companyAddress"
                                        label="Company address"
                                        type="text"
                                        placeholder="Enter company address"
                                        value={this.state.companyAddress}
                                        required
                                    />
                                </Col>
                            </Row>
                            <h4 className="mt-2">Billing info</h4>
                            <Row>
                                <Col md={12}>
                                    <AvField
                                        name="firstname"
                                        label="First name"
                                        type="text"
                                        placeholder="Enter first name"
                                        value={this.state.firstname}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <AvField
                                        name="lastname"
                                        label="Last name"
                                        type="text"
                                        placeholder="Enter last name"
                                        value={this.state.lastname}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <AvSelectField
                                        name="country"
                                        label="Country"
                                        options={this.state.countries}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <AvField
                                        name="state"
                                        label="State"
                                        type="text"
                                        placeholder="State"
                                        value={this.state.state}
                                        required
                                    />
                                </Col>
                                <Col md={4}>
                                    <AvField
                                        name="city"
                                        label="City"
                                        type="text"
                                        placeholder="City"
                                        value={this.state.city}
                                        required
                                    />
                                </Col>
                                <Col md={4}>
                                    <AvField
                                        name="zip"
                                        label="Zip code"
                                        type="text"
                                        placeholder="Zip code"
                                        value={this.state.zip}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <AvField
                                        name="personalAddress"
                                        label="Address"
                                        type="text"
                                        placeholder="Address"
                                        value={this.state.personalAddress}
                                        required
                                    />
                                </Col>
                            </Row>
                            <h4 className="mt-2">Contact info</h4>
                            <Row>
                                <Col md={12}>
                                    <AvField
                                        name="contactPhone"
                                        label="Phone"
                                        type="tel"
                                        placeholder="Enter phone"
                                        value={this.state.contactPhone}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <AvField
                                        name="contactEmail"
                                        label="Email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        required
                                    />
                                </Col>
                            </Row>
                            <h4 className="mt-2">Credit card</h4>
                            <Notifications {...this.state.response} />
                            <Row className="credit-card-section">
                                <Col md={12}>
                                    <Cards
                                        cvc={this.state.card.cvc}
                                        expiry={this.state.card.expiry}
                                        focused={this.state.card.focus}
                                        name={this.state.card.name}
                                        number={this.state.card.number}
                                    />
                                </Col>
                            </Row>
                            <Row className="credit-card-section">
                                <Col md={12}>
                                    <CardField
                                        onChange={e => {
                                            this.setError(e.error);
                                            this.setCardComplete(e.complete);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    {this.state.error && (
                                        <ErrorMessage>
                                            {this.state.error.message}
                                        </ErrorMessage>
                                    )}
                                </Col>
                            </Row>
                            <AvGroup check>
                                <AvInput
                                    type="checkbox"
                                    name="checkItOut"
                                    required
                                />
                                <Label check for="checkItOut">
                                    I have read and agreed to the{" "}
                                    <a href="/terms">Terms and Conditions</a>{" "}
                                    and <a href="/privacy">Privacy Policy</a>
                                </Label>
                            </AvGroup>

                            <Row>
                                <Col sm={6}></Col>
                                <Col sm={6} className="text-sm-right">
                                    <SubmitButton
                                        processing={this.state.processing}
                                        error={this.state.error}
                                        disabled={!this.props.stripe}
                                    >
                                        Submit
                                    </SubmitButton>
                                </Col>
                            </Row>
                        </AvForm>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default () => {
    const stripe = useStripe();
    const elements = useElements();

    return <Onboarding stripe={stripe} elements={elements} />;
};

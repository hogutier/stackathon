import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import Card from 'material-ui/Card'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import SnackBar from 'material-ui/Snackbar'
import { Step, Stepper, StepLabel, StepContent, StepButton } from 'material-ui/stepper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
//import logo from './../../dist/assets/logo.svg'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      date: moment(),
      stepIndex: 0,
      finished: false,
      loading: true,
      navOpen: false,
      confirmationModalOpen: false,
      confirmationTextVisible: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      validEmail: false,
      validPhone: false,
      smallScreen: window.innerWidth < 768,
      confirmationSnackbarOpen: false
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
  }

  handleChangeDate = (_, date) => {
    this.setState({
      date,
      confirmationTextVisible: true
    })
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { finished, stepIndex, date } = this.state
    console.log("**DATE***", date)
    return (
      <div>
      <AppBar
        title="Appointment Scheduler" iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
           <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Choose available day for your appointment</StepLabel>
            <StepContent>
              <DatePicker
                style={{
                  marginTop: 10,
                  marginLeft: 10
                }}
                hintText="Select a date"
                name="date"
                onChange={this.handleChangeDate}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Choose an available time for your appointment</StepLabel>
            <StepContent>
              <SelectField value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={9} primaryText="09:00AM - 10:00AM" />
                <MenuItem value={10} primaryText="10:00AM - 11:00AM" />
                <MenuItem value={11} primaryText="11:00AM - 12:00PM" />
                <MenuItem value={13} primaryText="01:00PM - 02:00PM" />
                <MenuItem value={14} primaryText="02:00PM - 03:00PM" />
                <MenuItem value={15} primaryText="03:00PM - 04:00PM" />
                <MenuItem value={16} primaryText="04:00PM - 05:00PM" />
              </SelectField>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Share your contant information with us and we'll send you a reminder
            </StepLabel>
            <StepContent>
              <section>
                <TextField
                  style={{ display: 'block' }}
                  name="first_name"
                  hintText="First Name"
                  floatingLabelText="First Name"
                />
                <TextField
                  style={{ display: 'block' }}
                  name="last_name"
                  hintText="Last Name"
                  floatingLabelText="Last Name"
                />
                <TextField
                  style={{ display: 'block' }}
                  name="email"
                  hintText="name@mail.com"
                  floatingLabelText="Email"
                />
                <TextField
                  style={{ display: 'block' }}
                  name="phone"
                  hintText="(888) 888-8888"
                  floatingLabelText="Phone"
                  />
                <RaisedButton
                  label="Submit"
                  style={{ display: 'block' }}
                  labelPosition="before"
                  primary={true}
                  fullWidth={true}
                />
              </section>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>

      </div>
    )
  }
}


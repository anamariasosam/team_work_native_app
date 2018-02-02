import React, {Component} from 'react'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { KeyboardAvoidingView, View, Text, ActivityIndicator  } from 'react-native'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions'

class LoginForm extends Component {
  constructor(props) {
    super(props)


    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onButtonPress = this.onButtonPress.bind(this)
    this.renderError = this.renderError.bind(this)
    this.renderButton = this.renderButton.bind(this)
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(password) {
    this.props.passwordChanged(password)
  }

  onButtonPress() {
    const {email, password} = this.props

    this.props.loginUser({email, password})
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text>☠️ Error</Text>
          <Text>{this.props.error}</Text>
        </View>
      )
    }
  }

  renderButton() {
    if (this.props.loading) {
      return (<ActivityIndicator size="large" color="#0000ff" />)
    }

    return (
      <Button
        raised
        buttonStyle={{ backgroundColor: '#ff4f00'}}
        icon={{ name: 'accessibility', size: 24 }}
        title="Login"
        onPress={this.onButtonPress}
      />
    )
  }

  render() {
    return(
      <KeyboardAvoidingView>
        <FormLabel>E-mail</FormLabel>
        <FormInput
          placeholder="Email"
          onChangeText={this.onEmailChange}
          value={this.props.email}
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          placeholder="Password"
          onChangeText={this.onPasswordChange}
          value={this.props.password}
        />

        {this.renderButton()}

        {this.renderError()}
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({
  auth }) => {
  const { email, password, error, loading } = auth
  return {
    email,
    password,
    error,
    loading,
  }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
  })(LoginForm)

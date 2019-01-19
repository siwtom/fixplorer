import React from "react";
import Autosuggest from "react-autosuggest";
import "./inputstyle.css"

class InputField extends React.Component {

  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.items.filter(coll => coll
      .toLowerCase()
      .slice(0, inputLength) === inputValue);
  };
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.items.filter(coll => coll
      .toLowerCase()
      .slice(0, inputLength) === inputValue);
  };

  getSuggestionValue = suggestion => suggestion;

  renderSuggestion = suggestion => <div>{suggestion}</div>;

  render() {
    const { value, suggestions } = this.state;
    const { label, onSubmitted } = this.props;

    
    const inputProps = {
      placeholder: "",
      value,
      onChange: this.onChange
    };
    return (
      <form
        className="form-inline inputForm"
        onSubmit={ev => {
          ev.preventDefault();
          onSubmitted(ev, this.state.value);
        }}
      >
        <table className="sidemenu">
          <tbody>
            <tr>
              <td className="row-label sidemenu">
                <label>{label}</label>
              </td>
              <td className="row-input sidemenu">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps}
                />
              </td>
              <td className="row-button sidemenu">
                <input type="submit" className="btn btn-go" value="Go" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default InputField;

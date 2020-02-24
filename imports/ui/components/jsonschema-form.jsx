import React, {PureComponent} from 'react';
import {Button, Alert, Row, Col} from 'reactstrap';
import Form from 'react-jsonschema-form';

class JsonSchemaForm extends PureComponent {
  render = () => {
    // console.log('render this', this);
    const {showForm, successText, submitButtonText, submitErrorText, onCancel} = this.props;

    let content = <Alert color="primary">{successText}</Alert>;

    if (showForm) {
      const submitbutton = (
        <Button type="submit" block color="primary">
          {submitButtonText}
        </Button>
      );

      const submitAndCancelButtons = onCancel ? (
        <Row form>
          <Col md={6} style={{paddingBottom: '5px'}}>
            {submitbutton}
          </Col>
          <Col md={6}>
            <Button type="submit" block color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      ) : (
        submitbutton
      );

      let submiterror = null;
      if (submitErrorText.length > 0) submiterror = <Alert color="danger">{submitErrorText}</Alert>;

      content = (
        <Form showErrorList={false} {...this.props}>
          {submiterror}
          {submitAndCancelButtons}
        </Form>
      );
    }
    return content;
  };
}

export default JsonSchemaForm;

import * as styles from '@forgerock/ui-design';
import classNames from 'classnames';
import * as React from 'react';
import Form, { ISubmitEvent, IChangeEvent } from 'react-jsonschema-form';
import Alert from '../../components/alert';
import Card from '../../components/card';
import { schema, uiSchema } from '../../compositions/sign-in/schema';
import Submit from '../../compositions/submit';
import { transformErrors } from '../../forms/errors';
import { BaseInput } from '../../forms/widgets/input';

export interface Props {
  buttonLabel?: string;
  className?: string;
  error?: string;
  formData?: SignInModel;
  id?: string;
  logo?: JSX.Element;
  pending?: boolean;
  title?: string;
  onChange?: (formData: SignInModel) => void;
  onSubmit: (formData: SignInModel) => void;
}

export interface SignInModel {
  email: string;
  password?: string;
}

function SignIn(props: Props) {
  const {
    buttonLabel = 'Sign In',
    className,
    error,
    formData,
    id,
    logo,
    pending,
    title = 'Sign In',
    onChange,
    onSubmit,
  } = props;
  const headerClasses = classNames(
    styles.textCenter,
    styles.pt5,
    styles.pr5,
    styles.pb0,
    styles.pl5,
  );
  const bodyClasses = classNames(styles.pr5, styles.pb5, styles.pl5);
  const footerClasses = classNames(styles.textCenter, styles.mt4);
  return (
    <Card className={className} id={id} style={{ width: 420 }}>
      <Card.Header className={headerClasses}>
        {logo}
        <h2>{title}</h2>
      </Card.Header>
      <Card.Body className={bodyClasses}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form
          formData={formData}
          noHtml5Validate={true}
          schema={schema}
          showErrorList={false}
          transformErrors={transformErrors}
          uiSchema={uiSchema}
          widgets={{ BaseInput }}
          onChange={(e: IChangeEvent<SignInModel>) => onChange && onChange(e.formData)}
          onSubmit={(e: ISubmitEvent<SignInModel>) => onSubmit(e.formData)}
        >
          <Submit
            className={styles.w100}
            id="sign-in-submit"
            label="Sign In"
            pendingLabel="Signing In..."
            pending={pending}
          >
            {buttonLabel}
          </Submit>
        </Form>
        <div className={footerClasses}>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SignIn;

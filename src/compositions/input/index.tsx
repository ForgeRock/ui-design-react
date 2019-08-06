import * as React from 'react';
import classNames from 'classnames';
import * as styles from '@forgerock/ui-design';
import { FormControlProps, InputGroup, Spinner } from 'react-bootstrap';
import { Form, Button } from '../../index';

interface Props extends FormControlProps {
  autoFocus?: boolean;
  className?: string;
  inputRef?: React.RefObject<any>;
  isInvalid?: boolean;
  label: string;
  placeholder?: string;
}

function Input({
  autoComplete,
  disabled,
  id,
  isInvalid,
  label,
  inputRef,
  min,
  max,
  readOnly,
  type,
  value,
  onChange,
}: any) {
  return (
    <Form.LabelGroup>
      <Form.Control
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        isInvalid={isInvalid || false}
        min={min}
        max={max}
        placeholder={label}
        readOnly={readOnly}
        ref={inputRef}
        type={type}
        value={value as string}
        onChange={onChange}
      />
      <Form.Label htmlFor={id}>{label}</Form.Label>
    </Form.LabelGroup>
  );
}

interface InputSyncProps extends Props {
  isPending?: boolean;
  onButtonClick: () => void;
}

Input.Sync = ({ id, isPending, label, type, value, onChange, onButtonClick }: InputSyncProps) => {
  const buttonClasses = classNames(styles.btn, styles.btnOutlineSecondary);
  const iconClasses = classNames(styles.materialIcons, 'material-icons-outlined');
  return (
    <Form.Group>
      <Form.LabelGroup>
        <Form.LabelGroupInput>
          <Input
            disabled={true}
            id={id}
            isInvalid={false}
            label={label}
            placeholder={label}
            type={type}
            value={value as string}
            onChange={onChange}
          />
        </Form.LabelGroupInput>
        <InputGroup.Append>
          {!isPending ? (
            <Button className={buttonClasses} onClick={onButtonClick}>
              <i className={iconClasses}>sync</i>
            </Button>
          ) : (
            <Button className={buttonClasses} disabled={true} onClick={onButtonClick}>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </Button>
          )}
        </InputGroup.Append>
      </Form.LabelGroup>
    </Form.Group>
  );
};

Input.Copy = ({ id, label, type, value, onChange }: Props) => {
  const buttonClasses = classNames(styles.btn, styles.btnOutlineSecondary);
  const iconClasses = classNames(styles.materialIcons, 'material-icons-outlined');
  const ref: React.RefObject<HTMLInputElement> = React.createRef();
  return (
    <Form.Group>
      <Form.LabelGroup>
        <Form.LabelGroupInput>
          <Input
            className={styles.alignSelfStart}
            disabled={false}
            id={id}
            isInvalid={false}
            label={label}
            placeholder={label}
            readOnly={true}
            inputRef={ref}
            type={type}
            value={value as string}
            onChange={onChange}
          />
        </Form.LabelGroupInput>
        <InputGroup.Append>
          <Button
            className={buttonClasses}
            onClick={() => {
              ref.current.focus();
              ref.current.select();
              document.execCommand('copy');
            }}
          >
            <i className={iconClasses}>file_copy</i>
          </Button>
        </InputGroup.Append>
      </Form.LabelGroup>
    </Form.Group>
  );
};

Input.Password = ({ disabled, id, isInvalid, label, readOnly, value, onChange }: any) => {
  const [isHidden, setIsHidden] = React.useState(true);
  const buttonClasses = classNames(styles.btn, styles.btnOutlineSecondary);
  const iconClasses = classNames(styles.materialIcons, 'material-icons-outlined');
  return (
    <Form.LabelGroup className={styles.formLabelGroupPassword}>
      <Form.LabelGroupInput>
        <Input
          autoComplete="new-password"
          className={styles.alignSelfStart}
          disabled={disabled}
          id={id}
          isInvalid={isInvalid || false}
          label={label}
          placeholder={label}
          readOnly={readOnly}
          type={isHidden ? 'password' : 'text'}
          value={value as string}
          onChange={onChange}
        />
      </Form.LabelGroupInput>
      <InputGroup.Append>
        <Button className={buttonClasses} onClick={() => setIsHidden(!isHidden)}>
          <i className={iconClasses}>{isHidden ? 'visibility' : 'visibility_off'}</i>
        </Button>
      </InputGroup.Append>
    </Form.LabelGroup>
  );
};

Input.Preview = ({
  disabled,
  id,
  label,
  readOnly,
  type,
  value,
  onChange,
  onPreviewClick,
}: Props & { onPreviewClick: () => void }) => {
  const buttonClasses = classNames(styles.textNowrap);
  const iconClasses = classNames(styles.materialIcons, 'material-icons-outlined');
  const buttonId = `${id}_previewButton`;
  return (
    <Form.LabelGroup>
      <Form.LabelGroupInput>
        <Input
          className={styles.alignSelfStart}
          disabled={disabled}
          id={id}
          isInvalid={false}
          label={label}
          placeholder={label}
          readOnly={readOnly}
          type={type}
          value={value as string}
          onChange={onChange}
        />
      </Form.LabelGroupInput>
      <InputGroup.Append>
        <Button className={buttonClasses} onClick={onPreviewClick} id={buttonId}>
          <span className={styles.textNowrap}>
            <i className={iconClasses}>visibility</i>
            <span className={classNames(styles.dNone, styles.dMdInline, styles.ml3)}>Preview</span>
          </span>
        </Button>
      </InputGroup.Append>
    </Form.LabelGroup>
  );
};

export default Input;

import React, {
  Children,
  ReactNode,
  useMemo,
  cloneElement,
  isValidElement
} from 'react';
import Input, { InputProps } from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { InputGroup, Prepend, Append } from './InputGroup.styled';

export interface InputGroupProps extends InputProps {
  prepend?: ReactNode;
  append?: ReactNode;
  children?: ReactNode;
}

export default ({ prepend, append, children, ...props }: InputGroupProps) => {
  const { size } = useMemo(
    () =>
      Object.assign(
        {},
        ...Children.toArray(children).map(
          (result, child) => !result && isValidElement(child) && child.props
        )
      ),
    [children]
  );

  const renderAddOn = (children: ReactNode) =>
    Children.map(children, child => {
      if (isValidElement(child) && child.type === Button) {
        return cloneElement(child, {
          ...child.props,
          size
        });
      }

      return child;
    });

  return (
    <InputGroup hasPrepend={!!prepend} hasAppend={!!append} fullWidth>
      {prepend && <Prepend>{renderAddOn(prepend)}</Prepend>}
      {children || <Input {...props} />}
      {append && <Append>{renderAddOn(append)}</Append>}
    </InputGroup>
  );
};

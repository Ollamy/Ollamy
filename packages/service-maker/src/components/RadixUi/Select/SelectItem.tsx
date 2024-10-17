import React from 'react';
import { SelectItemProps } from '@radix-ui/react-select';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon } from '@radix-ui/react-icons';

export const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Select.Item
        className={classnames('SelectItem', className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

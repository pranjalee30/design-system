import * as React from 'react';
import Chip, { ChipProps } from '../chip/Chip';
import classNames from 'classnames';
import { BaseProps, extractBaseProps } from '@/utils/types';

export interface ChipGroupProps extends BaseProps {
  /**
   * Handler to be called when Chip is closed
   */
  onClose?: (item: ChipProps) => void;
  /**
   * Handler to be called when Chip is clicked
   */
  onClick?: (item: ChipProps) => void;
  /**
   * List of chips
   *
   * <pre className="DocPage-codeBlock">
   *  ChipProps: {
   *    label: string | React.ReactElement;
   *    icon?: string;
   *    clearButton?: boolean;
   *    disabled?: boolean;
   *    selected?: boolean;
   *    type: 'action' | 'selection' | 'input';
   *    onClose?: (name: number | string | object) => void;
   *    onClick?: (name: number | string | object) => void;
   *    name: number | string | object;
   *    iconVariations?: {
   *      fill?: number;
   *      weight?: number; Range: [100, 700]
   *      grade?: number; Range: [-25, 200]
   *      opticalSize?: number; Range: [20px, 48px]
   *    };
   *  }
   * </pre>
   */
  list: ChipProps[];
}

export const ChipGroup = (props: ChipGroupProps) => {
  const { list, onClick, onClose, className } = props;
  const baseProps = extractBaseProps(props);

  const onClickHandler = (item: ChipProps) => {
    if (onClick) onClick(item);
  };
  const onCloseHandler = (item: ChipProps) => {
    if (onClose) onClose(item);
  };

  const ChipGroupClass = classNames(
    {
      ['ChipGroup']: true,
    },
    className
  );

  return (
    <div data-test="DesignSystem-ChipGroup" {...baseProps} className={ChipGroupClass}>
      {list.map((item, ind) => {
        const { label = '', icon, type, disabled, selected, clearButton, name, iconVariations } = item;
        return (
          <span key={ind} className="ChipGroup-item">
            <Chip
              data-test="DesignSystem-ChipGroup--Chip"
              name={name}
              label={label}
              selected={selected}
              icon={icon}
              disabled={disabled}
              clearButton={clearButton}
              iconVariations={iconVariations}
              type={type}
              onClick={() => onClickHandler(item)}
              onClose={() => onCloseHandler(item)}
            />
          </span>
        );
      })}
    </div>
  );
};

ChipGroup.displayName = 'ChipGroup';

export default ChipGroup;

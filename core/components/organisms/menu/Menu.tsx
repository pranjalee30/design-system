import React from 'react';
import { BaseProps } from '@/utils/types';
import { Popover } from '@/index';
import { PopoverProps } from '@/index.type';
import { MenuGroup } from './MenuGroup';
import { MenuItem } from './MenuItem';
import { MenuList } from './MenuList';
import { MenuTrigger } from './trigger/MenuTrigger';
import SubMenu from './SubMenu';
import classNames from 'classnames';
import MenuContext from './MenuContext';
import { focusListItem } from './trigger/utils';

type ActionType = 'click' | 'hover';

export interface MenuProps extends BaseProps {
  /**
   * Element to be rendered inside `Menu`
   */
  children: React.ReactNode;
  /**
   * Controls open/close of `Menu`
   */
  open: boolean;
  /**
   * Defines position of `Menu`
   */
  position: PopoverProps['position'];
  /**
   * Defines trigger for the `Menu`
   */
  trigger?: React.ReactElement;
  /**
   * Specifies max height of `Menu`
   */
  maxHeight?: number;
  /**
   * Specifies min height of `Menu`
   */
  minHeight?: number;
  /**
   * Specifies width of `Menu`
   */
  width?: number;
  /**
   * Provide `ref` of the trigger element
   */
  triggerRef?: any;
  /**
   * Describe unique id to the `Menu`
   */
  menuID?: string;
  /**
   * Event triggering the `Menu`
   */
  on?: ActionType;
}

export const Menu = (props: MenuProps) => {
  const { children, width, minHeight, maxHeight, className, open, triggerRef, menuID } = props;
  const [openPopover, setOpenPopover] = React.useState(open);
  const [highlightFirstItem, setHighlightFirstItem] = React.useState<boolean>(false);
  const [highlightLastItem, setHighlightLastItem] = React.useState<boolean>(false);
  const [focusedOption, setFocusedOption] = React.useState<HTMLElement | undefined>();
  const listRef = React.createRef<HTMLDivElement>();
  const menuTriggerRef = React.useRef<HTMLButtonElement>();

  const popoverClassName = classNames(
    {
      'overflow-auto': true,
    },
    className
  );

  React.useEffect(() => {
    if (highlightFirstItem && openPopover) {
      requestAnimationFrame(() => focusListItem('down', setFocusedOption, listRef));
    }
  }, [highlightFirstItem]);

  React.useEffect(() => {
    if (highlightLastItem && openPopover) {
      requestAnimationFrame(() => focusListItem('up', setFocusedOption, listRef));
    }
  }, [highlightLastItem]);

  React.useEffect(() => {
    if (!openPopover) {
      setHighlightFirstItem(false);
      setHighlightLastItem(false);
    } else {
      setHighlightFirstItem(true);
    }
  }, [openPopover]);

  const onToggleHandler = (open: boolean) => {
    setOpenPopover(open);
  };

  const contextProp = {
    openPopover,
    setOpenPopover,
    setHighlightFirstItem,
    setHighlightLastItem,
    focusedOption,
    setFocusedOption,
    menuTriggerRef,
    listRef,
    triggerRef,
    menuID,
  };

  return (
    <MenuContext.Provider value={contextProp}>
      <Popover
        data-test="DesignSystem-Menu"
        name={menuID}
        offset="medium"
        {...props}
        open={openPopover}
        customStyle={{ width, minHeight, maxHeight }}
        className={popoverClassName}
        onToggle={onToggleHandler}
      >
        <div ref={listRef} data-test="DesignSystem-Menu-Wrapper" className="py-3">
          {children}
        </div>
      </Popover>
    </MenuContext.Provider>
  );
};

Menu.Group = MenuGroup;
Menu.Item = MenuItem;
Menu.List = MenuList;
Menu.Trigger = MenuTrigger;
Menu.SubMenu = SubMenu;

Menu.defaultProps = {
  width: 176,
  maxHeight: 256,
  position: 'bottom-start',
};

export default Menu;
